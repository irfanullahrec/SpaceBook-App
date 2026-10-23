package pk.wantuch.spacebook

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.security.Integrity

/** The certificate pin: only the owner's certificate passes, and an empty pin never matches by accident. */
class IntegrityTest {
    private val cert = "owner-release-certificate".toByteArray()
    private val hex = Integrity.sha256Hex(cert)

    @Test fun theOwnersCertificatePasses() = assertTrue(Integrity.matches(hex, listOf(cert)))

    @Test fun aColonSeparatedUppercasePinIsAccepted() =
        assertTrue(Integrity.matches(hex.uppercase().chunked(2).joinToString(":"), listOf(cert)))

    @Test fun anotherCertificateFails() = assertFalse(Integrity.matches(hex, listOf("somebody-else".toByteArray())))

    @Test fun aRepackagedAppWithNoCertificateFails() = assertFalse(Integrity.matches(hex, emptyList()))

    @Test fun anEmptyPinNeverMatches() {
        assertFalse(Integrity.matches("", listOf(cert)))
        assertEquals("", Integrity.normalise(":: ::"))
    }
}
