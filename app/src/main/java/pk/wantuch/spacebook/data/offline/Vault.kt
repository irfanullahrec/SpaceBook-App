package pk.wantuch.spacebook.data.offline

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.Base64
import java.io.File
import java.io.FileInputStream
import java.io.IOException
import java.io.InputStream
import java.io.OutputStream
import java.security.GeneralSecurityException
import java.security.KeyStore
import java.security.SecureRandom
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.Mac
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec
import javax.inject.Inject
import javax.inject.Singleton

/**
 * What the books on the phone are protected with.
 *
 * Everything the app downloads (the books, their pictures, the page itself) is written to the phone's storage encrypted, so copying the
 * app's folder off the phone (a backup tool, a file manager on a rooted phone, a stolen storage chip) gives noise, not books. The
 * 256-bit data key is random, made on first start and kept only wrapped by a key of the Android Keystore (hardware-backed where the phone
 * has it, never leaves it), so the encrypted files cannot be read on another phone either.
 *
 * What this does NOT do (written down so nobody believes more than is true): the books are also public files of the website, so anyone
 * can fetch them there; and an attacker who controls the running app on an unlocked, rooted phone can ask the app for the text like the
 * reader does. This makes the stored copy useless to copy, it is not a lock against someone using the app itself.
 */
interface KeyProvider { fun dataKey(): ByteArray }

class FixedKeyProvider(private val key: ByteArray) : KeyProvider { override fun dataKey() = key }

/** The data key, wrapped by the Keystore. Where there is no Keystore (a test, a broken phone) the key is kept in a private no-backup file instead. */
class KeystoreKeyProvider(private val context: Context) : KeyProvider {
    private val file = File(context.noBackupFilesDir, "vault.key")
    private val key: ByteArray by lazy { load() }
    override fun dataKey(): ByteArray = key

    private fun wrapKey(): SecretKey? = try {
        val ks = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
        (ks.getKey(ALIAS, null) as? SecretKey) ?: KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore").run {
            init(
                KeyGenParameterSpec.Builder(ALIAS, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                    .setBlockModes(KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE).setKeySize(256).build(),
            )
            generateKey()
        }
    } catch (e: Exception) { null }

    private fun load(): ByteArray {
        val wrap = wrapKey()
        if (file.isFile) {
            val raw = runCatching { file.readBytes() }.getOrNull()
            if (raw != null) {
                val plain = if (raw.firstOrNull() == 'K'.code.toByte() && wrap != null) runCatching { unwrap(wrap, raw.copyOfRange(1, raw.size)) }.getOrNull()
                else if (raw.firstOrNull() == 'P'.code.toByte() && wrap == null) raw.copyOfRange(1, raw.size) else null
                if (plain != null && plain.size == 32) return plain
            }
            // the wrapping key is gone (a restore, a reset): the old encrypted files can never be read again, so they are removed and made again
            File(context.filesDir, "site").deleteRecursively()
        }
        val fresh = ByteArray(32).also { SecureRandom().nextBytes(it) }
        file.parentFile?.mkdirs()
        file.writeBytes(if (wrap != null) byteArrayOf('K'.code.toByte()) + wrapWith(wrap, fresh) else byteArrayOf('P'.code.toByte()) + fresh)
        return fresh
    }

    private fun wrapWith(k: SecretKey, data: ByteArray): ByteArray {
        val c = Cipher.getInstance("AES/GCM/NoPadding").apply { init(Cipher.ENCRYPT_MODE, k) }
        return c.iv + c.doFinal(data)
    }
    private fun unwrap(k: SecretKey, blob: ByteArray): ByteArray {
        val c = Cipher.getInstance("AES/GCM/NoPadding").apply { init(Cipher.DECRYPT_MODE, k, GCMParameterSpec(128, blob, 0, 12)) }
        return c.doFinal(blob, 12, blob.size - 12)
    }

    companion object {
        private const val ALIAS = "spacebook_vault_wrap"
        @Volatile private var shared: KeystoreKeyProvider? = null
        /** the one provider of the process, for code that is not built by Hilt (Prefs) */
        fun of(context: Context): KeystoreKeyProvider = shared ?: synchronized(this) { shared ?: KeystoreKeyProvider(context.applicationContext).also { shared = it } }
    }
}

/**
 * Encrypted files. Format: "SBV1" + 16-byte salt + chunks of 64 KiB, each AES-256-GCM sealed with its own key (HMAC(dataKey, salt)), a nonce
 * made from the chunk number and the "last chunk" flag as authenticated data: a flipped byte, a cut-off end, swapped chunks or a file moved
 * under another name all fail with an IOException instead of showing wrong text. Streams, so a 30 MB book is never held in memory at once.
 */
@Singleton
class SiteVault @Inject constructor(private val keys: KeyProvider) {
    fun isEncrypted(f: File): Boolean = runCatching { FileInputStream(f).use { s -> ByteArray(4).also { s.read(it) }.contentEquals(MAGIC) } }.getOrDefault(false)

    /** A stream of the plain bytes of [f]: decrypted when it is a vault file, as it is when it is an older plain copy. */
    fun open(f: File): InputStream {
        val input = FileInputStream(f).buffered(CHUNK + TAG)
        input.mark(4)
        val head = ByteArray(4); val n = readFully(input, head)
        if (n < 4 || !head.contentEquals(MAGIC)) { input.reset(); return input }
        val salt = ByteArray(SALT); if (readFully(input, salt) < SALT) throw IOException("vault file cut short")
        return VaultIn(input, fileKey(salt))
    }

    /** Wraps [out] so what is written to it is stored encrypted. Closing it finishes the file (the last chunk is the one that says it is last). */
    fun encrypt(out: OutputStream): OutputStream {
        val salt = ByteArray(SALT).also { SecureRandom().nextBytes(it) }
        out.write(MAGIC); out.write(salt)
        return VaultOut(out, fileKey(salt))
    }

    fun write(f: File, bytes: ByteArray) {
        f.parentFile?.mkdirs()
        val tmp = File(f.parentFile, f.name + ".tmp")
        encrypt(tmp.outputStream().buffered()).use { it.write(bytes) }
        if (!tmp.renameTo(f)) { tmp.copyTo(f, overwrite = true); tmp.delete() }
    }

    /** Encrypts an older plain copy in place. True when the file is a vault file afterwards. */
    fun migrate(f: File): Boolean {
        if (!f.isFile) return false
        if (isEncrypted(f)) return true
        return runCatching {
            val tmp = File(f.parentFile, f.name + ".mig")
            f.inputStream().use { src -> encrypt(tmp.outputStream().buffered()).use { dst -> src.copyTo(dst, 64 * 1024) } }
            f.delete(); tmp.renameTo(f) || run { tmp.copyTo(f, overwrite = true); tmp.delete(); true }
        }.getOrDefault(false)
    }

    /** What a file holds, in bytes of plain content (a vault file is a little longer than what it holds). */
    fun plainSize(f: File): Long {
        if (!isEncrypted(f)) return f.length()
        val body = f.length() - MAGIC.size - SALT
        val full = body / (CHUNK + TAG); val rem = body % (CHUNK + TAG)
        return full * CHUNK + if (rem >= TAG) rem - TAG else 0
    }

    private fun fileKey(salt: ByteArray): SecretKeySpec {
        val mac = Mac.getInstance("HmacSHA256").apply { init(SecretKeySpec(keys.dataKey(), "HmacSHA256")) }
        return SecretKeySpec(mac.doFinal(salt), "AES")
    }

    private class VaultOut(private val out: OutputStream, private val key: SecretKeySpec) : OutputStream() {
        private val buf = ByteArray(CHUNK)
        private var n = 0
        private var counter = 0L
        private var closed = false
        override fun write(b: Int) { write(byteArrayOf(b.toByte()), 0, 1) }
        override fun write(b: ByteArray, off: Int, len: Int) {
            var o = off; var left = len
            while (left > 0) {
                if (n == CHUNK) seal(false)                       // a full buffer is written only when more data arrives: the last chunk is always known
                val take = minOf(left, CHUNK - n)
                System.arraycopy(b, o, buf, n, take); n += take; o += take; left -= take
            }
        }
        private fun seal(last: Boolean) { out.write(crypt(Cipher.ENCRYPT_MODE, key, counter++, last, buf, 0, n)); n = 0 }
        override fun flush() { out.flush() }
        override fun close() { if (!closed) { closed = true; seal(true); out.close() } }
    }

    private class VaultIn(private val src: InputStream, private val key: SecretKeySpec) : InputStream() {
        private var counter = 0L
        private var plain = ByteArray(0)
        private var pos = 0
        private var pending: ByteArray? = chunk()
        private fun chunk(): ByteArray? {
            val b = ByteArray(CHUNK + TAG); val n = readFully(src, b)
            return if (n <= 0) null else b.copyOf(n)
        }
        private fun advance(): Boolean {
            val cur = pending ?: return false
            pending = chunk()
            if (cur.size < TAG) throw IOException("vault file cut short")
            plain = crypt(Cipher.DECRYPT_MODE, key, counter++, pending == null, cur, 0, cur.size); pos = 0
            return true
        }
        override fun read(): Int { val one = ByteArray(1); return if (read(one, 0, 1) < 0) -1 else one[0].toInt() and 0xff }
        override fun read(b: ByteArray, off: Int, len: Int): Int {
            if (len == 0) return 0
            while (pos >= plain.size) if (!advance()) return -1
            val take = minOf(len, plain.size - pos)
            System.arraycopy(plain, pos, b, off, take); pos += take
            return take
        }
        override fun available() = plain.size - pos
        override fun close() { src.close() }
    }

    companion object {
        private val MAGIC = "SBV1".toByteArray()
        private const val SALT = 16
        private const val CHUNK = 64 * 1024
        private const val TAG = 16

        private fun readFully(s: InputStream, b: ByteArray): Int {
            var n = 0
            while (n < b.size) { val r = s.read(b, n, b.size - n); if (r < 0) break; n += r }
            return n
        }

        private fun crypt(mode: Int, key: SecretKeySpec, counter: Long, last: Boolean, data: ByteArray, off: Int, len: Int): ByteArray {
            val nonce = ByteArray(12); for (i in 0 until 8) nonce[i] = (counter ushr (56 - 8 * i)).toByte()
            return try {
                Cipher.getInstance("AES/GCM/NoPadding").run {
                    init(mode, key, GCMParameterSpec(128, nonce)); updateAAD(byteArrayOf(if (last) 1 else 0)); doFinal(data, off, len)
                }
            } catch (e: GeneralSecurityException) { throw IOException("vault file is damaged or was changed", e) }
        }
    }
}

/** Short secrets (the device token) sealed with the same key; text that is not sealed (kept by an older version) is read as it is. */
object Seal {
    private const val PREFIX = "s1:"
    private fun key(provider: KeyProvider): SecretKeySpec = SecretKeySpec(Mac.getInstance("HmacSHA256").apply { init(SecretKeySpec(provider.dataKey(), "HmacSHA256")) }.doFinal("seal".toByteArray()), "AES")

    fun seal(provider: KeyProvider, text: String): String = runCatching {
        val c = Cipher.getInstance("AES/GCM/NoPadding").apply { init(Cipher.ENCRYPT_MODE, key(provider)) }
        PREFIX + Base64.encodeToString(c.iv + c.doFinal(text.toByteArray()), Base64.NO_WRAP)
    }.getOrDefault(text)

    fun open(provider: KeyProvider, stored: String): String? {
        if (!stored.startsWith(PREFIX)) return stored
        return runCatching {
            val raw = Base64.decode(stored.removePrefix(PREFIX), Base64.NO_WRAP)
            val c = Cipher.getInstance("AES/GCM/NoPadding").apply { init(Cipher.DECRYPT_MODE, key(provider), GCMParameterSpec(128, raw, 0, 12)) }
            String(c.doFinal(raw, 12, raw.size - 12))
        }.getOrNull()
    }
}
