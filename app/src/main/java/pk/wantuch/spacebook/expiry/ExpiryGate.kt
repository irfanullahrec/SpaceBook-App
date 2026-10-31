package pk.wantuch.spacebook.expiry

import android.content.Context
import pk.wantuch.spacebook.BuildConfig
import java.security.MessageDigest
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec

/** What the lock lets the person do right now. */
sealed interface LockState {
    /** this build never expires, or it was opened with the unlock code */
    data object Open : LockState

    /** a dated preview build, still working; [daysLeft] counts today */
    data class Counting(val expiresAt: Long, val daysLeft: Int) : LockState

    /** the dated preview period is over: only the unlock screen is shown */
    data class Locked(val expiredAt: Long) : LockState
}

sealed interface UnlockResult {
    data object Ok : UnlockResult
    data class Wrong(val triesLeft: Int) : UnlockResult
    data class Blocked(val seconds: Int) : UnlockResult
}

/** What the gate remembers on this phone (a few numbers; see [SharedPrefsGateStore]). */
interface GateStore {
    var lastSeen: Long
    var unlockToken: String
    var failures: Int
    var blockedUntil: Long
}

/**
 * The offline expiry lock of a preview build: after [expiresAt] the app shows only the unlock screen, on every phone, with no
 * network needed. A person who knows the unlock code can open it; only a salted PBKDF2 hash of the code is in the app.
 *
 * Moving the phone's clock back does not help: the latest time ever seen is remembered and never goes down.
 * What it cannot stop: someone who installs a fresh copy and sets the clock back before the first start, or who has a rooted
 * phone and edits the app's data. For hard enforcement the app would also have to ask the server.
 *
 * @param expiresAt epoch millis, 0 = this build never expires
 */
class ExpiryGate(
    private val expiresAt: Long,
    private val salt: ByteArray,
    private val hash: ByteArray,
    private val iterations: Int,
    private val store: GateStore,
    private val clock: () -> Long = System::currentTimeMillis,
) {
    /** call on every start and every return to the app */
    fun check(): LockState {
        if (expiresAt <= 0L) return LockState.Open
        val now = maxOf(clock(), store.lastSeen)
        if (now > store.lastSeen) store.lastSeen = now
        if (store.unlockToken.isNotEmpty() && constantTimeEquals(store.unlockToken, token())) return LockState.Open
        if (now >= expiresAt) return LockState.Locked(expiresAt)
        return LockState.Counting(expiresAt, ((expiresAt - now + DAY - 1) / DAY).toInt())
    }

    /** Five wrong tries block the lock for a minute, then two, four, ... up to an hour. */
    fun tryUnlock(code: String): UnlockResult {
        val now = clock()
        if (now < store.blockedUntil) return UnlockResult.Blocked(((store.blockedUntil - now + 999) / 1000).toInt())
        if (matches(code)) {
            store.unlockToken = token()
            store.failures = 0
            store.blockedUntil = 0
            return UnlockResult.Ok
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

    private fun matches(code: String): Boolean {
        val c = normalize(code)
        if (c.isEmpty()) return false
        return MessageDigest.isEqual(pbkdf2(c.toByteArray(Charsets.UTF_8), salt, iterations), hash)
    }

    /** proof, kept on the phone, that the right code was entered for this build */
    private fun token(): String {
        val sha = MessageDigest.getInstance("SHA-256")
        sha.update(hash); sha.update("unlocked:$expiresAt".toByteArray())
        return sha.digest().joinToString("") { "%02x".format(it) }
    }

    companion object {
        const val DAY = 86_400_000L
        const val FREE_TRIES = 5

        /** upper case, letters and digits only, so "sb-ab12 cd34" and "SBAB12CD34" are the same code */
        fun normalize(code: String): String = code.uppercase().filter { it.isLetterOrDigit() }

        /** PBKDF2 with HMAC-SHA-256, one 32-byte block (the same as node's crypto.pbkdf2Sync(..., 32, 'sha256')) */
        fun pbkdf2(password: ByteArray, salt: ByteArray, iterations: Int): ByteArray {
            val mac = Mac.getInstance("HmacSHA256")
            mac.init(SecretKeySpec(password, "HmacSHA256"))
            mac.update(salt)
            mac.update(byteArrayOf(0, 0, 0, 1))
            var u = mac.doFinal()
            val t = u.copyOf()
            for (i in 2..iterations) {
                u = mac.doFinal(u)
                for (j in t.indices) t[j] = (t[j].toInt() xor u[j].toInt()).toByte()
            }
            return t
        }

        private fun constantTimeEquals(a: String, b: String) = MessageDigest.isEqual(a.toByteArray(), b.toByteArray())

        private fun hex(s: String) = ByteArray(s.length / 2) { s.substring(it * 2, it * 2 + 2).toInt(16).toByte() }

        /** the gate of this build: its end date and unlock hash come from build.gradle.kts / unlock.properties */
        fun forApp(context: Context): ExpiryGate = ExpiryGate(
            BuildConfig.EXPIRES_AT_MILLIS, hex(BuildConfig.UNLOCK_SALT), hex(BuildConfig.UNLOCK_HASH), BuildConfig.UNLOCK_ITERATIONS,
            SharedPrefsGateStore(context.applicationContext),
        )
    }
}

/** Plain SharedPreferences: it is read synchronously at start, before anything else is drawn. */
class SharedPrefsGateStore(context: Context) : GateStore {
    private val p = context.getSharedPreferences("sb_gate", Context.MODE_PRIVATE)
    override var lastSeen: Long
        get() = p.getLong("seen", 0L)
        set(v) { p.edit().putLong("seen", v).apply() }
    override var unlockToken: String
        get() = p.getString("tok", "").orEmpty()
        set(v) { p.edit().putString("tok", v).apply() }
    override var failures: Int
        get() = p.getInt("fail", 0)
        set(v) { p.edit().putInt("fail", v).apply() }
    override var blockedUntil: Long
        get() = p.getLong("blk", 0L)
        set(v) { p.edit().putLong("blk", v).apply() }
}
