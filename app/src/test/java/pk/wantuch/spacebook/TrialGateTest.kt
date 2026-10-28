package pk.wantuch.spacebook

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.expiry.AccessGate
import pk.wantuch.spacebook.expiry.Contact
import pk.wantuch.spacebook.expiry.DefaultCode
import pk.wantuch.spacebook.expiry.LicenseCode
import pk.wantuch.spacebook.expiry.ExpiryGate
import pk.wantuch.spacebook.expiry.GateStore
import pk.wantuch.spacebook.expiry.LockState
import pk.wantuch.spacebook.expiry.TrialGate
import pk.wantuch.spacebook.expiry.TrialStore
import pk.wantuch.spacebook.expiry.UnlockResult
import java.security.KeyPair
import java.security.KeyPairGenerator
import java.security.Signature

/** The 1-month free trial: 30 days from the first start, then the lock; a code for this phone opens it; the clock cannot be moved back. */
class TrialGateTest {
    private class Store : TrialStore {
        override var start = 0L
        override var seen = 0L
        override var device = ""
        override var code = ""
        override var extendUntil = 0L
        override var failures = 0
        override var blockedUntil = 0L
    }

    private class PreviewStore : GateStore {
        override var lastSeen = 0L
        override var unlockToken = ""
        override var failures = 0
        override var blockedUntil = 0L
    }

    private val day = TrialGate.DAY
    private val t0 = 1_790_000_000_000L
    private var now = t0
    private val pair: KeyPair = KeyPairGenerator.getInstance("EC").apply { initialize(256) }.generateKeyPair()
    private val spki = java.util.Base64.getEncoder().encodeToString(pair.public.encoded)
    private val store = Store()
    // a default code made in node: pbkdf2Sync('Test@Default-1', salt 00..0f, 1000 rounds, 32 bytes, sha256), the same maths the app and the website do
    private val defaultSpec = DefaultCode.Spec(LicenseCode.decodeBase64("AAECAwQFBgcICQoLDA0ODw==")!!, 1000, LicenseCode.decodeBase64("Dp9/dT3pEOZRgblfpr821nkMG10WtQO++UR4KzgyRnI=")!!)
    private val defaultText = "Test@Default-1"
    private fun gate(days: Int = 30, s: TrialStore = store) = TrialGate(days, spki, s, { now }, { "ABCD-2345" }, defaultSpec)

    private fun b64u(b: ByteArray) = java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(b)

    /** a code made the way tools/license/make_code.js makes it: payload, ECDSA signature as r||s */
    private fun code(device: String, until: String = "0"): String {
        val payload = "SB1|$device|$until".toByteArray()
        val der = Signature.getInstance("SHA256withECDSA").run { initSign(pair.private); update(payload); sign() }
        var i = 2
        fun next(): ByteArray {
            val len = der[i + 1].toInt()
            val v = der.copyOfRange(i + 2, i + 2 + len)
            i += 2 + len
            val t = v.dropWhile { it == 0.toByte() }.toByteArray()
            return ByteArray(32 - t.size) + t
        }
        val raw = next() + next()
        return "SB1-" + b64u(payload) + "." + b64u(raw)
    }

    @Test fun theFirstStartBeginsThirtyDays() {
        val s = gate().check()
        assertEquals(LockState.Counting(t0 + 30 * day, 30, trial = true), s)
        assertEquals(t0, store.start)
        assertEquals("ABCD-2345", gate().deviceId)
    }

    @Test fun dayTwentyNineIsTheLastDay() {
        gate().check()
        now = t0 + 29 * day + 23 * 3_600_000L
        assertEquals(LockState.Counting(t0 + 30 * day, 1, trial = true), gate().check())
    }

    @Test fun afterThirtyDaysOnlyTheLockScreenIsLeft() {
        gate().check()
        now = t0 + 30 * day
        assertEquals(LockState.Locked(t0 + 30 * day, trial = true), gate().check())
        now = t0 + 400 * day
        assertEquals(LockState.Locked(t0 + 30 * day, trial = true), gate().check())
    }

    @Test fun movingTheClockBackDoesNotReopenIt() {
        gate().check()
        now = t0 + 31 * day
        assertTrue(gate().check() is LockState.Locked)
        now = t0 + 2 * day                                   // the person sets the date back
        assertTrue(gate().check() is LockState.Locked)
    }

    @Test fun theTimeAlreadySeenCountsEvenIfTheClockGoesBack() {
        gate().check()
        now = t0 + 29 * day
        gate().check()                                         // seen at day 29
        now = t0 + 1 * day                                     // back to day 1: still day 29 for the lock
        assertEquals(1, (gate().check() as LockState.Counting).daysLeft)
        now = t0 + 29 * day + 25 * 3_600_000L                  // a day and an hour later in real time
        assertTrue(gate().check() is LockState.Locked)
    }

    @Test fun theRightCodeOpensItAndThePhoneRemembersIt() {
        gate().check()
        now = t0 + 40 * day
        val g = gate()
        assertTrue(g.check() is LockState.Locked)
        assertEquals(UnlockResult.Ok, g.tryUnlock("  " + code("ABCD-2345") + "\n"))
        assertEquals(LockState.Open, g.check())
        assertEquals(LockState.Open, gate().check())           // a new start with the same store still knows
    }

    @Test fun aCodeForAnotherPhoneDoesNotOpenIt() {
        gate().check()
        now = t0 + 40 * day
        val g = gate()
        assertEquals(UnlockResult.Wrong(4), g.tryUnlock(code("WXYZ-9876")))
        assertTrue(g.check() is LockState.Locked)
    }

    @Test fun aCodeForEveryDeviceOpensAnyPhone() {
        gate().check()
        now = t0 + 40 * day
        val g = gate()
        assertEquals(UnlockResult.Ok, g.tryUnlock(code("*")))
        assertEquals(LockState.Open, g.check())
    }

    @Test fun aCodeWithAnEndDateLocksAgainWhenItEnds() {
        gate().check()
        now = t0 + 40 * day
        val fmt = java.text.SimpleDateFormat("yyyyMMdd", java.util.Locale.US).apply { timeZone = java.util.TimeZone.getTimeZone("UTC") }
        val ymd = fmt.format(java.util.Date(now + 10 * day))
        val g = gate()
        assertEquals(UnlockResult.Ok, g.tryUnlock(code("ABCD-2345", ymd)))
        assertEquals(LockState.Open, g.check())
        now += 11 * day
        assertTrue(g.check() is LockState.Locked)
    }

    @Test fun fiveWrongTriesBlockTheBoxForAMinute() {
        gate().check()
        now = t0 + 40 * day
        val g = gate()
        for (left in 4 downTo 1) assertEquals(UnlockResult.Wrong(left), g.tryUnlock("nope"))
        assertEquals(UnlockResult.Blocked(60), g.tryUnlock("nope"))
        assertTrue(g.tryUnlock(code("ABCD-2345")) is UnlockResult.Blocked)     // even the right code waits
        now += 61_000
        assertEquals(UnlockResult.Ok, g.tryUnlock(code("ABCD-2345")))
    }

    @Test fun zeroTrialDaysMeansNoTrialLock() {
        now = t0 + 5000 * day
        assertEquals(LockState.Open, gate(0).check())
    }

    @Test fun theContactIsTheDevelopersWhatsAppNumber() {
        assertEquals("0343 0155606", Contact.LOCAL)
        assertEquals("923430155606", Contact.WHATSAPP)
        val url = Contact.whatsappUrl("ABCD-2345")
        assertTrue(url, url.startsWith("https://wa.me/923430155606?text="))
        assertTrue(url, url.contains("ABCD-2345") && !url.contains(' ') && !url.contains('+'))
    }

    @Test fun randomDeviceIdsHaveTheRightShape() {
        val ids = (1..300).map { TrialGate.randomDeviceId() }
        assertTrue(ids.all { Regex("^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$").matches(it) })
        assertEquals(300, ids.toSet().size)
    }

    @Test fun theDefaultCodeMatchesTheHashMadeInNode() {
        assertTrue(DefaultCode.matches(defaultText, defaultSpec))
        assertTrue(!DefaultCode.matches("test@default-1", defaultSpec))      // case counts
        assertTrue(!DefaultCode.matches("Test@Default-2", defaultSpec))
        assertTrue(!DefaultCode.matches("", defaultSpec))
    }

    @Test fun theRealDefaultCodeIsOnlyAHash() {
        val s = DefaultCode.SPEC
        assertEquals(16, s.salt.size)
        assertEquals(32, s.hash.size)
        assertTrue(s.iterations >= 100_000)
        assertEquals(30, DefaultCode.GRANT_DAYS)
    }

    @Test fun theDefaultCodeOpensTheLockForThirtyDaysFromThatMoment() {
        gate().check()
        now = t0 + 40 * day
        val g = gate()
        assertTrue(g.check() is LockState.Locked)
        assertEquals(UnlockResult.Ok, g.tryUnlock("  $defaultText  "))
        assertEquals(LockState.Counting(now + 30 * day, 30, trial = true), g.check())
        assertEquals(LockState.Counting(now + 30 * day, 30, trial = true), gate().check())      // remembered across a restart
        now += 29 * day + 3_600_000L
        assertEquals(1, (g.check() as LockState.Counting).daysLeft)
        now += 23 * 3_600_000L                                                                  // 30 days after it was typed
        assertTrue(g.check() is LockState.Locked)
    }

    @Test fun theDefaultCodeCanBeTypedAgainForTheNextMonth() {
        gate().check()
        now = t0 + 40 * day
        val g = gate()
        assertEquals(UnlockResult.Ok, g.tryUnlock(defaultText))
        now += 31 * day
        assertTrue(g.check() is LockState.Locked)
        assertEquals(UnlockResult.Ok, g.tryUnlock(defaultText))
        assertEquals(LockState.Counting(now + 30 * day, 30, trial = true), g.check())
    }

    @Test fun theDefaultCodeTypedInsideTheTrialAddsUpToAMonthFromNow() {
        gate().check()
        now = t0 + 5 * day
        val g = gate()
        assertEquals(UnlockResult.Ok, g.tryUnlock(defaultText))
        assertEquals(LockState.Counting(t0 + 35 * day, 30, trial = true), g.check())            // later than the trial's own end (day 30)
    }

    @Test fun aWrongTextIsAWrongTryAndTheDefaultCodeNeedsTheExactCase() {
        gate().check()
        now = t0 + 40 * day
        val g = gate()
        assertEquals(UnlockResult.Wrong(4), g.tryUnlock("Test@Default-2"))
        assertEquals(UnlockResult.Wrong(3), g.tryUnlock("test@default-1"))
        assertTrue(g.check() is LockState.Locked)
        assertEquals(UnlockResult.Ok, g.tryUnlock(defaultText))
    }

    @Test fun withoutADefaultCodeOnlySignedCodesWork() {
        val g = TrialGate(30, spki, store, { now }, { "ABCD-2345" }, null)
        g.check()
        now = t0 + 40 * day
        assertEquals(UnlockResult.Wrong(4), g.tryUnlock(defaultText))
    }

    // ---- both locks together: the dated preview lock of a build and the person's free trial
    private val salt = ByteArray(16) { it.toByte() }
    private val legacyCode = "SB-7K4Q-9XMD-2WTH-5RPN"
    private val legacyHash = ExpiryGate.pbkdf2(ExpiryGate.normalize(legacyCode).toByteArray(), salt, 1000)
    private fun both(previewEnds: Long, trialDays: Int = 30) = AccessGate(ExpiryGate(previewEnds, salt, legacyHash, 1000, PreviewStore()) { now }, gate(trialDays))

    @Test fun aDatedPreviewThatHasEndedLocksEvenInsideTheTrial() {
        val g = both(previewEnds = t0 + 5 * day)
        assertTrue(g.check() is LockState.Counting)
        now = t0 + 6 * day
        assertEquals(LockState.Locked(t0 + 5 * day, trial = false), g.check())
    }

    @Test fun aSignedCodeForThisPhoneOpensADatedPreviewToo() {
        val g = both(previewEnds = t0 + 5 * day)
        now = t0 + 6 * day
        assertTrue(g.check() is LockState.Locked)
        assertEquals(UnlockResult.Ok, g.tryUnlock(code("ABCD-2345")))
        assertEquals(LockState.Open, g.check())
    }

    @Test fun theOldBuildCodeStillOpensADatedPreview() {
        val g = both(previewEnds = t0 + 5 * day)
        g.check()                                              // the first start, as MainActivity does: the trial begins here
        now = t0 + 6 * day
        assertEquals(UnlockResult.Ok, g.tryUnlock(legacyCode))
        assertEquals(LockState.Counting(t0 + 30 * day, 24, trial = true), g.check())   // the preview lock is open; the person's trial still counts
    }

    @Test fun withoutAnEndDateTheTrialIsTheOnlyLock() {
        val g = both(previewEnds = 0)
        assertEquals(LockState.Counting(t0 + 30 * day, 30, trial = true), g.check())
        now = t0 + 31 * day
        assertEquals(LockState.Locked(t0 + 30 * day, trial = true), g.check())
    }
}
