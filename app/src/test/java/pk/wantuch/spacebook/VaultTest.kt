package pk.wantuch.spacebook

import org.junit.Assert.assertArrayEquals
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotEquals
import org.junit.Assert.assertTrue
import org.junit.Assert.fail
import org.junit.Rule
import org.junit.Test
import org.junit.rules.TemporaryFolder
import pk.wantuch.spacebook.data.offline.FixedKeyProvider
import pk.wantuch.spacebook.data.offline.SiteVault
import java.io.File
import java.io.IOException
import java.util.Random

/** The phone's copy of the books is encrypted: it round-trips, it is not readable as it lies on the disk, and any change to it is noticed. */
class VaultTest {
    @get:Rule val tmp = TemporaryFolder()
    private val vault = SiteVault(FixedKeyProvider(ByteArray(32) { (it * 7).toByte() }))
    private val other = SiteVault(FixedKeyProvider(ByteArray(32) { (it * 11).toByte() }))

    private fun bytes(n: Int) = ByteArray(n).also { Random(n.toLong()).nextBytes(it) }
    private fun stored(data: ByteArray, v: SiteVault = vault): File = tmp.newFile().also { f -> v.encrypt(f.outputStream().buffered()).use { it.write(data) } }
    private fun read(f: File, v: SiteVault = vault) = v.open(f).use { it.readBytes() }

    @Test fun roundTripsEverySize() {
        for (n in listOf(0, 1, 15, 16, 17, 65535, 65536, 65537, 131072, 300_001)) {
            val d = bytes(n); val f = stored(d)
            assertArrayEquals("size $n", d, read(f))
            assertEquals("plain size $n", n.toLong(), vault.plainSize(f))
        }
    }

    @Test fun whatIsOnTheDiskIsNotTheText() {
        val d = "window.BOOK_DATA = {title: 'Fractions'};".repeat(2000).toByteArray()
        val f = stored(d)
        assertTrue(vault.isEncrypted(f))
        val raw = f.readBytes()
        assertFalse(String(raw, Charsets.ISO_8859_1).contains("Fractions"))
        assertNotEquals(d.size.toLong(), f.length())
    }

    @Test fun anotherKeyCannotReadIt() {
        val f = stored(bytes(1000))
        try { read(f, other); fail("a different key must not decrypt") } catch (e: IOException) { /* expected */ }
    }

    @Test fun aChangedByteIsNoticed() {
        val f = stored(bytes(200_000)); val raw = f.readBytes(); raw[raw.size / 2] = (raw[raw.size / 2].toInt() xor 1).toByte(); f.writeBytes(raw)
        try { read(f); fail("tampering must be detected") } catch (e: IOException) { /* expected */ }
    }

    @Test fun aCutOffFileIsNoticed() {
        val f = stored(bytes(200_000)); val raw = f.readBytes()
        f.writeBytes(raw.copyOf(raw.size - (200_000 - 3 * 65536 + 16)))      // exactly the last chunk is gone
        try { read(f); fail("a truncated file must be detected") } catch (e: IOException) { /* expected */ }
    }

    @Test fun twoFilesWithTheSameTextLookDifferent() {
        val d = bytes(5000)
        assertFalse(stored(d).readBytes().contentEquals(stored(d).readBytes()))
    }

    @Test fun anOlderPlainCopyIsStillServedAndThenEncrypted() {
        val f = tmp.newFile(); f.writeText("plain old book")
        assertFalse(vault.isEncrypted(f))
        assertEquals("plain old book", String(read(f)))
        assertTrue(vault.migrate(f))
        assertTrue(vault.isEncrypted(f))
        assertEquals("plain old book", String(read(f)))
        assertEquals(14L, vault.plainSize(f))
    }

    @Test fun smallWriteHelperAndEmptyFile() {
        val f = File(tmp.root, "x/lazy.html"); vault.write(f, "<html></html>".toByteArray())
        assertEquals("<html></html>", String(read(f)))
        val e = stored(ByteArray(0)); assertEquals(0, read(e).size)
    }
}
