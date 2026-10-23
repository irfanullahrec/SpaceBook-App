package pk.wantuch.spacebook

import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.expiry.ExpiryGate
import pk.wantuch.spacebook.expiry.GateStore
import pk.wantuch.spacebook.expiry.LockState
import pk.wantuch.spacebook.expiry.UnlockResult

class ExpiryGateTest {
    private class MemoryStore : GateStore {
        override var lastSeen = 0L
        override var unlockToken = ""
        override var failures = 0
        override var blockedUntil = 0L
    }

    private val day = ExpiryGate.DAY
    private val salt = ByteArray(16) { it.toByte() }
    private val code = "SB-7K4Q-9XMD-2WTH-5RPN"
    private val hash = ExpiryGate.pbkdf2(ExpiryGate.normalize(code).toByteArray(), salt, 1000)

    private var now = 1_000_000_000_000L
    private val store = MemoryStore()
    private fun gate(expiresAt: Long) = ExpiryGate(expiresAt, salt, hash, 1000, store) { now }

    @Test fun pbkdf2MatchesTheStandardVectors() {
        // RFC 7914 / widely published PBKDF2-HMAC-SHA256 vectors: the app and tools/make_unlock.js (node) must agree
        fun hex(b: ByteArray) = b.joinToString("") { "%02x".format(it) }
        assertEquals("120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b", hex(ExpiryGate.pbkdf2("password".toByteArray(), "salt".toByteArray(), 1)))
        assertEquals("ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43", hex(ExpiryGate.pbkdf2("password".toByteArray(), "salt".toByteArray(), 2)))
    }

    @Test fun aBuildWithoutAnEndDateNeverLocks() {
        now += 5000 * day
        assertEquals(LockState.Open, gate(0).check())
    }

    @Test fun countsTheDaysThenLocks() {
        val ends = now + 30 * day
        assertEquals(LockState.Counting(ends, 30), gate(ends).check())
        now += 29 * day + 1
        assertEquals(LockState.Counting(ends, 1), gate(ends).check())
        now = ends
        assertEquals(LockState.Locked(ends), gate(ends).check())
        now += 400 * day
        assertEquals(LockState.Locked(ends), gate(ends).check())
    }

    @Test fun movingTheClockBackDoesNotReopenIt() {
        val ends = now + 30 * day
        now = ends + day
        assertTrue(gate(ends).check() is LockState.Locked)
        now = ends - 10 * day                                  // the clock is set back
        assertTrue(gate(ends).check() is LockState.Locked)
    }

    @Test fun theRightCodeOpensItForGoodAndWhateverTheSpacingOrCase() {
        val ends = now + day
        now = ends + 1
        val g = gate(ends)
        assertTrue(g.check() is LockState.Locked)
        assertEquals(UnlockResult.Ok, g.tryUnlock("  sb-7k4q 9xmd-2wth 5rpn "))
        assertEquals(LockState.Open, g.check())
        now += 900 * day
        assertEquals(LockState.Open, gate(ends).check())       // a fresh start still knows
    }

    @Test fun aWrongOrEmptyCodeDoesNotOpenIt() {
        val ends = now - 1
        val g = gate(ends)
        assertEquals(UnlockResult.Wrong(4), g.tryUnlock("SB-0000-0000-0000-0000"))
        assertEquals(UnlockResult.Wrong(3), g.tryUnlock(""))
        assertTrue(g.check() is LockState.Locked)
    }

    @Test fun tooManyWrongTriesBlockEvenTheRightCodeForAWhile() {
        val g = gate(now - 1)
        repeat(4) { g.tryUnlock("WRONG$it") }
        assertEquals(UnlockResult.Blocked(60), g.tryUnlock("WRONG"))     // the fifth
        assertTrue(g.tryUnlock(code) is UnlockResult.Blocked)
        now += 61_000
        assertEquals(UnlockResult.Ok, g.tryUnlock(code))
    }

    @Test fun aCodeFromAnotherBuildIsNotAccepted() {
        val other = ExpiryGate.pbkdf2(ExpiryGate.normalize("SB-AAAA-BBBB-CCCC-DDDD").toByteArray(), salt, 1000)
        val g = ExpiryGate(now - 1, salt, other, 1000, MemoryStore()) { now }
        assertTrue(g.tryUnlock(code) is UnlockResult.Wrong)
        assertArrayEquals(hash, ExpiryGate.pbkdf2(ExpiryGate.normalize(code).toByteArray(), salt, 1000))
    }
}
