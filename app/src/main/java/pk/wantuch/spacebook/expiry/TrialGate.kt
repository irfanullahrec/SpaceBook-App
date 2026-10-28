package pk.wantuch.spacebook.expiry

import android.content.Context
import java.security.SecureRandom

/** What the trial lock remembers on this phone (a few values; see [SharedPrefsTrialStore]). */
interface TrialStore {
    /** epoch millis of the first start, 0 = not started yet */
    var start: Long
    /** the latest time ever seen: time never goes below it, so moving the clock back does not reopen the app */
    var seen: Long
    /** the random ID the person sends to the developer, "ABCD-EFGH" */
    var device: String
    /** the unlock code that was accepted ("" = none) */
    var code: String
    /** the end of the month the default code opened (0 = never typed); the lock ends at the later of this and start + trial days */
    var extendUntil: Long
    var failures: Int
    var blockedUntil: Long
}

/**
 * The free-trial lock: [trialDays] (30) days from the first start of the app on this phone, then only the lock screen, which asks the
 * person to contact the developer on WhatsApp ([Contact]) or to type an unlock code ([LicenseCode]). Nothing is needed from the network.
 * The website has the same rule (js/sb_license.js) and the same codes.
 *
 * Honest limit: the rule lives on the phone. Moving the clock back is stopped ([TrialStore.seen]); clearing the app's data, installing again,
 * or editing the data of a rooted phone gives a new month. For a lock that cannot be bypassed the server would have to be asked as well.
 *
 * @param trialDays 0 = no trial lock at all (a build for the developer: -Pspacebook.trialDays=0)
 */
class TrialGate(
    private val trialDays: Int,
    private val publicKey: String,
    private val store: TrialStore,
    private val clock: () -> Long = System::currentTimeMillis,
    private val newId: () -> String = ::randomDeviceId,
    /** the default unlock code (a salted hash); null = there is none, only signed codes work */
    private val defaultCode: DefaultCode.Spec? = null,
    private val grantDays: Int = DefaultCode.GRANT_DAYS,
) {
    val enabled: Boolean get() = trialDays > 0

    /** the ID shown on the lock screen and sent to the developer; made once and kept */
    val deviceId: String
        get() {
            if (store.device.isEmpty()) store.device = newId()
            return store.device
        }

    /** call on every start and every return to the app */
    fun check(): LockState {
        if (!enabled) return LockState.Open
        val now = now()
        if (store.start == 0L) store.start = now
        if (hasLicense(now)) return LockState.Open
        val ends = maxOf(store.start + trialDays * DAY, store.extendUntil)
        if (now >= ends) return LockState.Locked(ends, trial = true)
        return LockState.Counting(ends, ((ends - now + DAY - 1) / DAY).toInt(), trial = true)
    }

    /** a valid code for this phone is stored (and its end date, if it has one, has not passed) */
    fun hasLicense(now: Long = now()): Boolean =
        store.code.isNotEmpty() && LicenseCode.verify(store.code, deviceId, now, publicKey) == LicenseCode.Result.Ok

    /**
     * A signed code for this phone ([LicenseCode]) opens it for good (or to its end date). Text that is not shaped like a signed code is tried as the
     * default code: it opens the lock for [grantDays] days from now. Five wrong tries block the box for a minute, then two, four, ... up to an hour.
     */
    fun tryUnlock(code: String): UnlockResult {
        val now = now()
        if (now < store.blockedUntil) return UnlockResult.Blocked(((store.blockedUntil - now + 999) / 1000).toInt())
        val clean = LicenseCode.normalize(code)
        if (clean.isNotEmpty()) {
            val r = LicenseCode.verify(clean, deviceId, now, publicKey)
            if (r == LicenseCode.Result.Ok) {
                store.code = clean
                store.failures = 0
                store.blockedUntil = 0
                return UnlockResult.Ok
            }
            if (r is LicenseCode.Result.Refused && r.reason == "format" && defaultCode != null && DefaultCode.matches(DefaultCode.trim(code), defaultCode)) {
                store.extendUntil = maxOf(store.extendUntil, now + grantDays * DAY)
                store.failures = 0
                store.blockedUntil = 0
                return UnlockResult.Ok
            }
        }
        store.failures += 1
        val over = store.failures - FREE_TRIES
        if (over >= 0) {
            val wait = minOf(3_600_000L, 60_000L shl minOf(over, 6))
            store.blockedUntil = now + wait
            return UnlockResult.Blocked((wait / 1000).toInt())
        }
        return UnlockResult.Wrong(FREE_TRIES - store.failures)
    }

    /** the clock, never below the latest time seen; remembers the new latest */
    private fun now(): Long {
        val t = maxOf(clock(), store.seen)
        if (t > store.seen) store.seen = t
        return t
    }

    companion object {
        const val DAY = 86_400_000L
        const val FREE_TRIES = 5
        private const val ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"   // no 0 O 1 I: an ID is read aloud and typed

        /** "ABCD-EFGH" from 32 symbols (no modulo bias) */
        fun randomDeviceId(): String {
            val r = SecureRandom()
            val s = CharArray(8) { ALPHABET[r.nextInt(32)] }
            return String(s, 0, 4) + "-" + String(s, 4, 4)
        }
    }
}

/** Plain SharedPreferences, read synchronously at start, before anything else is drawn. */
class SharedPrefsTrialStore(context: Context) : TrialStore {
    private val p = context.getSharedPreferences("sb_trial", Context.MODE_PRIVATE)
    override var start: Long
        get() = p.getLong("start", 0L)
        set(v) { p.edit().putLong("start", v).apply() }
    override var seen: Long
        get() = p.getLong("seen", 0L)
        set(v) { p.edit().putLong("seen", v).apply() }
    override var device: String
        get() = p.getString("dev", "").orEmpty()
        set(v) { p.edit().putString("dev", v).apply() }
    override var code: String
        get() = p.getString("code", "").orEmpty()
        set(v) { p.edit().putString("code", v).apply() }
    override var extendUntil: Long
        get() = p.getLong("ext", 0L)
        set(v) { p.edit().putLong("ext", v).apply() }
    override var failures: Int
        get() = p.getInt("fail", 0)
        set(v) { p.edit().putInt("fail", v).apply() }
    override var blockedUntil: Long
        get() = p.getLong("blk", 0L)
        set(v) { p.edit().putLong("blk", v).apply() }
}
