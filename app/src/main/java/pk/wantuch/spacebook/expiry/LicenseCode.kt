package pk.wantuch.spacebook.expiry

import java.io.ByteArrayOutputStream
import java.security.KeyFactory
import java.security.Signature
import java.security.spec.X509EncodedKeySpec
import java.util.Calendar
import java.util.TimeZone

/**
 * The unlock codes of the free-trial lock. A code is "SB1-<payload>.<signature>": the payload is "SB1|<device ID or *>|<YYYYMMDD or 0>",
 * the signature is ECDSA P-256 / SHA-256 (64 bytes, r then s) made on the developer's PC with a private key that is NOT in this
 * repository (tools/license/make_code.js of the website repository). Only the public key is here, so reading the app does not make a
 * code. The same codes work on the website (js/sb_license.js): the format and the key are the same.
 */
object LicenseCode {
    /** the PUBLIC half of the signing key: base64 SubjectPublicKeyInfo, ECDSA P-256 (the same string as CFG.publicKey in js/sb_license.js) */
    const val PUBLIC_KEY = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEQgQ/xK5Uu72UXOOTb34IM+xuTu8pxHV/wL5qA4zyyQ2XVod2Wjud4VreHLy6p772W1seDCjtgFA2XpG6ySQkNg=="

    private val PAYLOAD = Regex("^SB1\\|([A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}|\\*)\\|(0|\\d{8})$")
    private val SHAPE = Regex("^SB1-([A-Za-z0-9_-]+)\\.([A-Za-z0-9_-]+)$")
    private const val B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

    class Parsed(val bytes: ByteArray, val signature: ByteArray, val device: String, val until: String)

    sealed interface Result {
        data object Ok : Result

        /** [reason]: format | signature | device | expired | error */
        data class Refused(val reason: String) : Result
    }

    /** spaces, line breaks and the invisible marks WhatsApp adds are not part of a code */
    fun normalize(code: String): String =
        code.filter { !it.isWhitespace() && it.code !in 0x200b..0x200f && it.code !in 0x202a..0x202e && it.code != 0xfeff }

    /** standard and URL-safe base64, with or without "=" */
    fun decodeBase64(text: String): ByteArray? {
        val t = text.replace('-', '+').replace('_', '/').trimEnd('=')
        val out = ByteArrayOutputStream()
        var buf = 0
        var bits = 0
        for (c in t) {
            val v = B64.indexOf(c)
            if (v < 0) return null
            buf = (buf shl 6) or v
            bits += 6
            if (bits >= 8) {
                bits -= 8
                out.write((buf shr bits) and 0xff)
                buf = buf and ((1 shl bits) - 1)
            }
        }
        return out.toByteArray()
    }

    fun parse(code: String): Parsed? {
        val m = SHAPE.matchEntire(normalize(code)) ?: return null
        val bytes = decodeBase64(m.groupValues[1]) ?: return null
        val sig = decodeBase64(m.groupValues[2]) ?: return null
        val p = PAYLOAD.matchEntire(String(bytes, Charsets.ISO_8859_1)) ?: return null
        if (sig.size != 64) return null
        return Parsed(bytes, sig, p.groupValues[1], p.groupValues[2])
    }

    /** the last millisecond (UTC) of a YYYYMMDD date */
    fun endOfDay(ymd: String): Long {
        val c = Calendar.getInstance(TimeZone.getTimeZone("UTC"))
        c.clear()
        c.set(ymd.substring(0, 4).toInt(), ymd.substring(4, 6).toInt() - 1, ymd.substring(6, 8).toInt(), 23, 59, 59)
        c.set(Calendar.MILLISECOND, 999)
        return c.timeInMillis
    }

    /** Is this code made with the private key of [publicKey], for [deviceId], and not past its date at [nowMillis]? */
    fun verify(code: String, deviceId: String, nowMillis: Long, publicKey: String = PUBLIC_KEY): Result {
        val p = parse(code) ?: return Result.Refused("format")
        val ok = try {
            val key = KeyFactory.getInstance("EC").generatePublic(X509EncodedKeySpec(decodeBase64(publicKey) ?: return Result.Refused("error")))
            Signature.getInstance("SHA256withECDSA").run {
                initVerify(key)
                update(p.bytes)
                verify(toDer(p.signature))
            }
        } catch (e: Exception) {
            return Result.Refused("error")
        }
        if (!ok) return Result.Refused("signature")
        if (p.device != "*" && p.device != deviceId) return Result.Refused("device")
        if (p.until != "0" && nowMillis > endOfDay(p.until)) return Result.Refused("expired")
        return Result.Ok
    }

    /** the 64-byte r||s of the website and the tool -> the DER sequence java.security wants */
    internal fun toDer(sig: ByteArray): ByteArray {
        fun int(part: ByteArray): ByteArray {
            var i = 0
            while (i < part.size - 1 && part[i] == 0.toByte()) i++
            var v = part.copyOfRange(i, part.size)
            if (v[0] < 0) v = byteArrayOf(0) + v
            return byteArrayOf(0x02, v.size.toByte()) + v
        }
        val r = int(sig.copyOfRange(0, 32))
        val s = int(sig.copyOfRange(32, 64))
        return byteArrayOf(0x30, (r.size + s.size).toByte()) + r + s
    }
}
