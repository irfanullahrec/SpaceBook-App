package pk.wantuch.spacebook.data.offline

import android.content.Context
import android.net.Uri
import android.webkit.MimeTypeMap
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.HttpUrl.Companion.toHttpUrlOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.ByteArrayInputStream
import java.io.File
import java.io.IOException
import java.io.InputStream
import java.security.MessageDigest
import java.util.UUID
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton
import pk.wantuch.spacebook.data.remote.Endpoint

@Serializable
private data class ShellIndex(val files: Map<String, String> = emptyMap())

/**
 * The phone's copy of the website. The page (lazy.html and its scripts) and the books are plain files; the WebView asks for them
 * by address and [intercept] answers from here, so reading never needs the internet once a file is on the phone:
 *
 *   1. downloaded or already-read files in `filesDir/site/<version>/<path>`
 *   2. the shell that ships inside the app (`assets/site/`, built by tools/app/pack_shell.js)
 *   3. the website itself; whatever it returns is kept in (1) for next time ("read-through cache")
 *
 * Files are immutable per `?v=<hash>` (the site names every script and book file by its content hash), so a copy is never stale.
 * `api/...` calls are never answered here: they go to the real server (and fail quietly when offline; the page keeps its own queue).
 */
@Singleton
class SiteStore @Inject constructor(
    @ApplicationContext private val context: Context,
    private val endpoint: Endpoint,
    http: OkHttpClient,
    private val json: Json,
) {
    private val root = File(context.filesDir, "site")
    private val tmp = File(context.filesDir, "site-tmp")
    private val client: OkHttpClient = http.newBuilder().callTimeout(120, TimeUnit.SECONDS).build()
    private val quick: OkHttpClient = http.newBuilder().callTimeout(3, TimeUnit.SECONDS).connectTimeout(2, TimeUnit.SECONDS).build()

    /** path -> the ?v= hash the bundled copy belongs to ("" = unversioned) */
    private val bundled: Map<String, String> by lazy {
        runCatching {
            context.assets.open("site/site-index.json").bufferedReader().use { json.decodeFromString<ShellIndex>(it.readText()).files }
        }.getOrDefault(emptyMap())
    }

    /** Called (on a WebView thread) when a file the page asked for is not on the phone and could not be fetched. */
    @Volatile var onMissing: (path: String) -> Unit = {}

    private fun diskFile(path: String, v: String?) = File(root, "${v?.takeIf { it.isNotEmpty() } ?: "-"}/$path")

    private fun safe(path: String) = path.isNotEmpty() && path.split('/').none { it == ".." || it == "." } && !path.startsWith("/")

    fun has(path: String, v: String?): Boolean =
        safe(path) && (diskFile(path, v).isFile || bundled[path]?.let { v.isNullOrEmpty() || it == v } == true)

    /** A stream of the file if the phone has it (downloaded, cached or bundled), otherwise null. */
    fun open(path: String, v: String?): InputStream? {
        if (!safe(path)) return null
        val f = diskFile(path, v)
        if (f.isFile) return runCatching { f.inputStream() }.getOrNull()
        val b = bundled[path]
        if (b != null && (v.isNullOrEmpty() || b == v)) return runCatching { context.assets.open("site/$path") }.getOrNull()
        return null
    }

    fun size(path: String, v: String?): Long = diskFile(path, v).takeIf { it.isFile }?.length() ?: 0

    private fun target(path: String, v: String?) =
        endpoint.url.resolve(path.split('/').joinToString("/") { Uri.encode(it) } + if (v.isNullOrEmpty()) "" else "?v=$v")

    /**
     * Downloads [path] from the site into the phone's store.
     * @param sha256 when given, the file is kept only if it hashes to this (a half-sent or changed file is rejected)
     * @return true when the file is now on the phone
     */
    fun download(path: String, v: String?, sha256: String? = null, quickTimeout: Boolean = false, force: Boolean = false, onBytes: (Long) -> Unit = {}): Boolean {
        if (!safe(path)) return false
        val dest = diskFile(path, v)
        if (dest.isFile && !force) return true
        val url = target(path, v) ?: return false
        tmp.mkdirs()
        val part = File(tmp, UUID.randomUUID().toString())
        return try {
            (if (quickTimeout) quick else client).newCall(Request.Builder().url(url).header("Accept", "*/*").build()).execute().use { r ->
                if (!r.isSuccessful) return false
                val body = r.body
                val md = if (sha256 != null) MessageDigest.getInstance("SHA-256") else null
                part.outputStream().use { out ->
                    val buf = ByteArray(64 * 1024)
                    body.byteStream().use { input ->
                        while (true) {
                            val n = input.read(buf)
                            if (n < 0) break
                            out.write(buf, 0, n)
                            md?.update(buf, 0, n)
                            onBytes(n.toLong())
                        }
                    }
                }
                if (md != null) {
                    val got = md.digest().joinToString("") { "%02x".format(it) }
                    if (!got.equals(sha256, ignoreCase = true)) return false
                }
                dest.parentFile?.mkdirs()
                if (force) dest.delete()
                part.renameTo(dest) || run { part.copyTo(dest, overwrite = true); true }
            }
        } catch (e: IOException) {
            false
        } finally {
            part.delete()
        }
    }

    /** Bytes the downloaded books and cached files take on the phone. */
    fun usedBytes(): Long = root.walkTopDown().filter { it.isFile }.sumOf { it.length() }

    fun delete(path: String, v: String?) { diskFile(path, v).delete() }

    // ---------------------------------------------------------------------------------------------------------------- WebView

    /**
     * Answers a WebView request from the phone's store, or returns null to let the WebView do it itself (the API, ranged media, other sites).
     */
    fun intercept(request: WebResourceRequest): WebResourceResponse? {
        if (request.method != "GET") return null
        val url = request.url.toString().toHttpUrlOrNull() ?: return null
        val site = endpoint.url
        if (url.host != site.host || url.port != site.port) return null
        var rel = Uri.decode(url.encodedPath.removePrefix(site.encodedPath)).trimStart('/')
        if (rel.isEmpty()) rel = "lazy.html"
        if (rel.startsWith("api/")) return null
        if (request.requestHeaders.keys.any { it.equals("Range", ignoreCase = true) }) return null
        // the website's service worker would fight this store: the app is its own offline layer
        if (rel == "sw.js") return notFound()
        if (!safe(rel)) return notFound()
        val v = url.queryParameter("v")

        // the entry page and the list files change when the site is redeployed: ask the site first (briefly) and keep what it says
        val networkFirst = rel == "lazy.html" || (rel.startsWith("content/") && v == null)
        if (networkFirst) {
            val fresh = if (rel == "lazy.html") refreshEntry() else download(rel, null, quickTimeout = true, force = true)
            if (fresh) diskFile(rel, null).takeIf { it.isFile }?.let { return respond(rel, it.inputStream()) }
        }
        open(rel, v)?.let { return respond(rel, it) }
        if (!networkFirst && download(rel, v)) {
            open(rel, v)?.let { return respond(rel, it) }
        }
        if (isBookData(rel)) onMissing(rel)
        return notFound()
    }

    /**
     * Fetches the site's current lazy.html and keeps it only when every script and stylesheet it names (by hash) is on the phone or
     * can be downloaded now, so the phone never holds a page whose files it lacks. False = offline or the site is not serving it.
     */
    private fun refreshEntry(): Boolean {
        val url = target("lazy.html", null) ?: return false
        val html = try {
            quick.newCall(Request.Builder().url(url).header("Accept", "text/html").build()).execute().use { r ->
                if (!r.isSuccessful) return false
                r.body.string()
            }
        } catch (e: IOException) {
            return false
        }
        if (!html.contains("<html", ignoreCase = true)) return false
        val refs = ENTRY_REF.findAll(html).map { it.groupValues[1] to it.groupValues[2] }.filter { !it.first.contains("://") }.toSet()
        for ((p, v) in refs) if (!has(p, v) && !download(p, v)) return false
        val dest = diskFile("lazy.html", null)
        dest.parentFile?.mkdirs()
        dest.writeText(html)
        return true
    }

    private fun isBookData(rel: String) = rel.startsWith("js/") || rel.startsWith("content/")

    private fun respond(rel: String, stream: InputStream): WebResourceResponse {
        val ext = rel.substringAfterLast('.', "").lowercase()
        val mime = MIME[ext] ?: MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext) ?: "application/octet-stream"
        val text = mime.startsWith("text/") || mime == "application/json" || mime == "image/svg+xml" || mime == "application/manifest+json"
        return WebResourceResponse(mime, if (text) "utf-8" else null, 200, "OK", mapOf("Cache-Control" to "no-cache"), stream)
    }

    private fun notFound() = WebResourceResponse(
        "text/plain", "utf-8", 404, "Not Found", mapOf("Cache-Control" to "no-store"),
        ByteArrayInputStream("Not on this phone yet.".toByteArray()),
    )

    companion object {
        private val ENTRY_REF = Regex("""(?:src|href)="([^"?#]+)\?v=([0-9a-f]{6,})"""")
        private val MIME = mapOf(
            "html" to "text/html", "htm" to "text/html", "js" to "text/javascript", "mjs" to "text/javascript", "css" to "text/css",
            "json" to "application/json", "webmanifest" to "application/manifest+json", "svg" to "image/svg+xml",
            "png" to "image/png", "jpg" to "image/jpeg", "jpeg" to "image/jpeg", "jfif" to "image/jpeg", "webp" to "image/webp",
            "gif" to "image/gif", "ico" to "image/x-icon", "woff2" to "font/woff2", "woff" to "font/woff", "ttf" to "font/ttf",
            "txt" to "text/plain",
        )
    }
}
