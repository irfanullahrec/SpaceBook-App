package pk.wantuch.spacebook.security

import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import pk.wantuch.spacebook.BuildConfig
import java.security.MessageDigest

/**
 * Is this the app the owner built? A release build refuses to run when a debugger is attached, or when its signing certificate is not the one
 * the owner pinned (`-Pspacebook.certSha256=<sha-256 of the release certificate>` at build time; empty = not pinned yet). A copy that somebody
 * unpacked, changed and signed with their own key has another certificate and stops at the first screen.
 *
 * Honest limits: code that runs on the phone can be changed by someone who controls the phone, so this stops casual repackaging, not a
 * determined reverse engineer. The strong protection of the content is that it is encrypted on the phone ([pk.wantuch.spacebook.data.offline.SiteVault])
 * and that accounts, coins and plans live on the server.
 */
object Integrity {
    fun ok(context: Context): Boolean {
        if (BuildConfig.DEBUG) return true
        if (android.os.Debug.isDebuggerConnected()) return false
        val want = normalise(BuildConfig.CERT_SHA256)
        if (want.isEmpty()) return true
        return matches(want, certificates(context))
    }

    internal fun normalise(hex: String) = hex.lowercase().filter { it in "0123456789abcdef" }

    internal fun matches(wantedHex: String, certs: List<ByteArray>): Boolean {
        val want = normalise(wantedHex)
        return want.isNotEmpty() && certs.any { sha256Hex(it) == want }
    }

    internal fun sha256Hex(b: ByteArray) = MessageDigest.getInstance("SHA-256").digest(b).joinToString("") { "%02x".format(it) }

    @Suppress("DEPRECATION")
    private fun certificates(context: Context): List<ByteArray> = runCatching {
        if (Build.VERSION.SDK_INT >= 28) {
            val info = context.packageManager.getPackageInfo(context.packageName, PackageManager.GET_SIGNING_CERTIFICATES)
            info.signingInfo?.apkContentsSigners?.map { it.toByteArray() }.orEmpty()
        } else {
            context.packageManager.getPackageInfo(context.packageName, PackageManager.GET_SIGNATURES).signatures?.map { it.toByteArray() }.orEmpty()
        }
    }.getOrDefault(emptyList())
}
