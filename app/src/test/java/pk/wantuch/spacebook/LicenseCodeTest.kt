package pk.wantuch.spacebook

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.expiry.LicenseCode
import java.security.KeyPairGenerator
import java.security.Signature

/** The unlock codes of the free-trial lock: made in node (the same format tools/license/make_code.js writes), checked here in Kotlin. */
class LicenseCodeTest {
    // Made in node with a throw-away key (the real private key is in no repository)
    private val spki = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEjQc6TU/yvlpQ66GRFfCPmc0XloHhKiEAHxzOWhk3qeQbk10h/B/1ZeEbqaqIVWBXZW2nDkuxBR12IinJbgpjlA=="
    private val forDevice = "SB1-U0IxfEFCQ0QtMjM0NXww.dSLK-EPZyG1cQqRQiqCZEXqveNRNIIP-DW_hCedoyARmOP7EqTBd-v9YXKIf-k5MAO7IEFdWRc_v6NDgOkoBCQ"
    private val forAny = "SB1-U0IxfCp8MA.PKa7qkOG0MRWFY-IKWNBVc0Fw0B4-oUQzpVyZeCYe6HYeES25BvqZPyXYLsOBx_WQO5WLK0vFu5lh0QImQpaxg"
    private val dated = "SB1-U0IxfEFCQ0QtMjM0NXwyMDI2MTAyOA.3JdZom4AZoLHTLdGubj_evSUWRLdYePtGk-jcDLhCTUnahOmUOBFBm9CM-zN0H7mHoIXtEWNimjiw2hkHWaTIw"
    private val forOther = "SB1-U0IxfFdYWVotOTg3Nnww.TjdTPZb0jvwUR5Jy4OyCjcundFqTCWoBHmjKAYA6WBZtdZBvsSrkmQ4exGc57VzOMZLEf3cUV04_BdX_hK4DaA"
    private val now = 1_793_000_000_000L

    private fun verify(code: String, device: String = "ABCD-2345", at: Long = now, key: String = spki) = LicenseCode.verify(code, device, at, key)

    @Test fun aCodeMadeInNodeIsAcceptedForItsDevice() {
        assertEquals(LicenseCode.Result.Ok, verify(forDevice))
    }

    @Test fun theSameCodeOnAnotherDeviceIsRefused() {
        assertEquals(LicenseCode.Result.Refused("device"), verify(forDevice, device = "WXYZ-9876"))
        assertEquals(LicenseCode.Result.Refused("device"), verify(forOther))
    }

    @Test fun aCodeForEveryDeviceWorksOnAnyDevice() {
        assertEquals(LicenseCode.Result.Ok, verify(forAny, device = "QQQQ-2222"))
    }

    @Test fun aCodeSignedWithAnotherKeyIsRefused() {
        val other = KeyPairGenerator.getInstance("EC").apply { initialize(256) }.generateKeyPair()
        val otherSpki = java.util.Base64.getEncoder().encodeToString(other.public.encoded)
        assertEquals(LicenseCode.Result.Refused("signature"), verify(forDevice, key = otherSpki))
    }

    @Test fun changingTheDeviceInsideACodeBreaksTheSignature() {
        // the payload of forOther (WXYZ-9876) with the signature of forDevice
        val tampered = forOther.substringBefore('.') + "." + forDevice.substringAfter('.')
        assertEquals(LicenseCode.Result.Refused("signature"), verify(tampered, device = "WXYZ-9876"))
    }

    @Test fun aCodeWithAnEndDateWorksUntilTheLastMillisecondOfThatDayUtc() {
        val last = LicenseCode.endOfDay("20261028")
        assertEquals(1_793_231_999_999L, last)
        assertEquals(LicenseCode.Result.Ok, verify(dated, at = last))
        assertEquals(LicenseCode.Result.Refused("expired"), verify(dated, at = last + 1))
    }

    @Test fun thingsThatAreNotCodesAreRefusedAsFormat() {
        for (bad in listOf("", "hello", "SB2-" + forDevice.substring(4), forDevice.substringBefore('.'), forDevice.substringBefore('.') + ".AAAA", "SB1-!!!.???")) {
            assertEquals("'$bad'", LicenseCode.Result.Refused("format"), verify(bad))
        }
    }

    @Test fun spacesLineBreaksAndInvisibleMarksFromWhatsAppAreIgnored() {
        val pasted = "  " + forDevice.substring(0, 20) + "\r\n  " + forDevice.substring(20) + " ‎"
        assertEquals(LicenseCode.Result.Ok, verify(pasted))
    }

    @Test fun parseReadsTheDeviceAndTheEndDate() {
        val p = LicenseCode.parse(dated)!!
        assertEquals("ABCD-2345", p.device)
        assertEquals("20261028", p.until)
        assertEquals(64, p.signature.size)
        assertNull(LicenseCode.parse("SB1-QUJD.QUJD"))
    }

    @Test fun aCodeSignedInKotlinIsAcceptedToo() {
        // java.security writes DER; the codes carry r||s (64 bytes): convert with a fresh key pair
        val pair = KeyPairGenerator.getInstance("EC").apply { initialize(256) }.generateKeyPair()
        val payload = "SB1|ABCD-2345|0".toByteArray()
        val der = Signature.getInstance("SHA256withECDSA").run { initSign(pair.private); update(payload); sign() }
        val code = "SB1-" + b64u(payload) + "." + b64u(derToRaw(der))
        val key = java.util.Base64.getEncoder().encodeToString(pair.public.encoded)
        assertEquals(LicenseCode.Result.Ok, verify(code, key = key))
    }

    @Test fun theRealPublicKeyIsAValidEcKey() {
        val k = java.security.KeyFactory.getInstance("EC").generatePublic(java.security.spec.X509EncodedKeySpec(LicenseCode.decodeBase64(LicenseCode.PUBLIC_KEY)!!))
        assertEquals("EC", k.algorithm)
        assertTrue(LicenseCode.PUBLIC_KEY.startsWith("MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE"))
    }

    private fun b64u(b: ByteArray) = java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(b)

    /** DER (30 len 02 rl r 02 sl s) -> r||s, each 32 bytes */
    private fun derToRaw(der: ByteArray): ByteArray {
        var i = 2
        fun next(): ByteArray {
            require(der[i] == 0x02.toByte())
            val len = der[i + 1].toInt()
            val v = der.copyOfRange(i + 2, i + 2 + len)
            i += 2 + len
            val t = v.dropWhile { it == 0.toByte() }.toByteArray()
            return ByteArray(32 - t.size) + t
        }
        return next() + next()
    }
}
