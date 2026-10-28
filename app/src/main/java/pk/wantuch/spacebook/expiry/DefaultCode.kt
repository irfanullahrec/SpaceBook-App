package pk.wantuch.spacebook.expiry

import java.security.MessageDigest

/**
 * The DEFAULT unlock code of the free-trial lock: one code the owner types that opens the lock for [GRANT_DAYS] days from that moment (then
 * the lock comes back and the code is typed again). Only a salted PBKDF2-HMAC-SHA256 hash of it is here, never the code; it is made with
 * tools/license/make_default.js of the website repository (which also checks that this file and js/sb_license.js hold the same code).
 *
 * The repository is public, so the hash can be attacked offline: the code should be long and unusual. For one device only, or for longer, the
 * developer makes a signed code ([LicenseCode]) instead.
 */
object DefaultCode {
    const val SALT = "FFmYR8H5Gtxhgr9GspRu5w=="
    const val ITERATIONS = 100000
    const val HASH = "pcgFL/pbnUwRUBM8CqBAojgl4HDF7np0f4DFACPueGg="

    /** how long the default code opens the lock, counted from the moment it is typed */
    const val GRANT_DAYS = 30

    class Spec(val salt: ByteArray, val iterations: Int, val hash: ByteArray)

    val SPEC: Spec by lazy { Spec(LicenseCode.decodeBase64(SALT)!!, ITERATIONS, LicenseCode.decodeBase64(HASH)!!) }

    /** spaces and the invisible marks WhatsApp adds around a pasted code are not part of it; inside it everything counts, upper and lower case too */
    fun trim(code: String): String =
        code.trim { it.isWhitespace() || it.code in 0x200b..0x200f || it.code in 0x202a..0x202e || it.code == 0xfeff }

    fun matches(code: String, spec: Spec = SPEC): Boolean {
        if (code.isEmpty()) return false
        val got = ExpiryGate.pbkdf2(code.toByteArray(Charsets.UTF_8), spec.salt, spec.iterations)
        return MessageDigest.isEqual(got, spec.hash)
    }
}
