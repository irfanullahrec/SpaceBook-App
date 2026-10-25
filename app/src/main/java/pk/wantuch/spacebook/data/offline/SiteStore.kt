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

/** assets/books/books-index.json (made by tools/app/pack_books.js on the machine that builds the APK): every book file the app carries, with the ?v= hash it belongs to. */
@Serializable
private data class BooksIndex(
    val schema: String = "",
    val builtAt: Long = 0,
    val source: String = "",
    val files: Map<String, String> = emptyMap(),
    val assets: List<String> = emptyList(),
)

/**
 * The phone's copy of the website. The page (lazy.html and its scripts) and the books are plain files; the WebView asks for them
 * by address and [intercept] answers from here, so reading never needs the internet once a file is on the phone:
 *
 *   1. downloaded or already-read files in `filesDir/site/<version>/<path>`
 *   2. the shell that ships inside the app (`assets/site/`, built by tools/app/pack_shell.js) and the books that ship inside it
 *      (`assets/books/`, built by tools/app/pack_books.js: every book of the website as it was when the app was built, so reading works with
 *      no internet from the first start)
 *   3. the website itself; whatever it returns is kept in (1) for next time ("read-through cache")
 *
 * The app's own copy of the site has a build time ([bundleStamp]). The entry page and the list files (`lazy.html` and the json lists under `content/`) are
 * asked of the website first, but only when the website's page is NEWER than the app's copy ([siteIsNewer]: its Last-Modified): a website
 * that was deployed before the app was built must not take the app back to older books. Offline, the app's copy is the answer.
 *
 * Files are immutable per `?v=<hash>` (the site names every script and book file by its content hash), so a copy is never stale.
 * `api/...` calls are never answered here: they go to the real server (and fail quietly when offline; the page keeps its own queue).
 *
 * Everything on the phone's disk is encrypted ([SiteVault]); copies kept by an older version are plain and are encrypted by [migrate]
 * (until then they are still served). The shell inside the app (`assets/site/`) is the website's own public files, it is not secret.
 */
@Singleton
class SiteStore @Inject constructor(
    @ApplicationContext private val context: Context,
    private val endpoint: Endpoint,
    http: OkHttpClient,
    private val json: Json,
    private val vault: SiteVault,
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

    /** the books that ship inside the app ([BooksIndex]); empty in a build made without tools/app/pack_books.js */
    private val books: BooksIndex by lazy {
        runCatching {
            context.assets.open("books/books-index.json").bufferedReader().use { json.decodeFromString<BooksIndex>(it.readText()) }
        }.getOrDefault(BooksIndex())
    }
    private val bookAssets: Set<String> by lazy { books.assets.toHashSet() }

    /** When the app's own copy of the site was made (epoch ms); 0 = the app carries no books. */
    val bundleStamp: Long get() = books.builtAt

    private fun inBooks(path: String, v: String?): Boolean =
        books.files[path]?.let { v.isNullOrEmpty() || it.isEmpty() || it == v } == true || (v.isNullOrEmpty() && path in bookAssets)

    @Volatile private var siteCheckedAt = 0L
    @Volatile private var siteNewer = true

    /**
     * True when the website's entry page was changed after the app's own copy was made (or when the app carries no copy), so the website is the
     * newer source. False when the website is older, cannot be reached, or does not say: the app then answers from what it carries. The answer
     * is kept for five minutes (twenty seconds when the website could not be asked).
     */
    private fun siteIsNewer(): Boolean {
        val stamp = books.builtAt
        if (stamp <= 0) return true
        val now = System.currentTimeMillis()
        if (now - siteCheckedAt < (if (siteNewer) 300_000L else 20_000L)) return siteNewer
        val url = target("lazy.html", null)
        // -2 = could not be asked (offline), -1 = answered without a usable date, otherwise the page's Last-Modified (epoch ms)
        val modified: Long = if (url == null) -2L else try {
            // a plain GET whose body is never read (some servers answer HEAD badly); the headers are all that is needed
            quick.newCall(Request.Builder().url(url).header("Accept", "text/html").build()).execute().use { r ->
                if (r.isSuccessful) (r.headers.getDate("Last-Modified")?.time ?: -1L) else -1L
            }
        } catch (e: IOException) {
            -2L
        }
        val newer = modified > stamp
        siteNewer = newer
        siteCheckedAt = if (modified == -2L) now - 280_000L else now
        return newer
    }

    /** Called (on a WebView thread) when a file the page asked for is not on the phone and could not be fetched. */
    @Volatile var onMissing: (path: String) -> Unit = {}

    private fun diskFile(path: String, v: String?) = File(root, "${v?.takeIf { it.isNotEmpty() } ?: "-"}/$path")

    private fun safe(path: String) = path.isNotEmpty() && path.split('/').none { it == ".." || it == "." } && !path.startsWith("/")

    fun has(path: String, v: String?): Boolean =
        safe(path) && (diskFile(path, v).isFile || bundled[path]?.let { v.isNullOrEmpty() || it == v } == true || inBooks(path, v))

    /** A stream of the file if the phone has it (downloaded, cached or bundled), otherwise null. */
    fun open(path: String, v: String?): InputStream? {
        if (!safe(path)) return null
        val f = diskFile(path, v)
        val b = bundled[path]
        val hasShell = b != null && (v.isNullOrEmpty() || b == v)
        // a list file (no ?v=) kept from an older visit, from before this app's copy of the site was made, is older than the copy that ships inside the app
        val older = v.isNullOrEmpty() && books.builtAt > 0 && f.isFile && f.lastModified() < books.builtAt && (hasShell || inBooks(path, v))
        if (f.isFile && !older) return runCatching { vault.open(f) }.getOrNull()
        if (hasShell) return runCatching { context.assets.open("site/$path") }.getOrNull()
        if (inBooks(path, v)) return runCatching { context.assets.open("books/$path") }.getOrNull()
        return null
    }

    fun size(path: String, v: String?): Long = diskFile(path, v).takeIf { it.isFile }?.let { vault.plainSize(it) } ?: 0

    private fun target(path: String, v: String?) =
        endpoint.url.resolve(path.split('/').joinToString("/") { Uri.encode(it) } + if (v.isNullOrEmpty()) "" else "?v=$v")

    /**
     * Downloads [path] from the site into the phone's store.
     * @param sha256 when given, the file is kept only if it hashes to this (a half-sent or changed file is rejected)
     * @return true when the file is now on the phone
     */
    fun download(path: String, v: String?, sha256: String? = null, quickTimeout: Boolean = false, force: Boolean = false, onBytes: (Long) -> Unit = {}): Boolean {
        if (!safe(path)) return false
        // a list file (no ?v=) of a website that is older than this app's own copy of the site is not wanted: the app answers from what it carries
        if (v.isNullOrEmpty() && books.builtAt > 0 && !siteIsNewer()) return false
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
                vault.encrypt(part.outputStream().buffered()).use { out ->
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

    /** Encrypts the plain copies an older version of the app left on the phone (a few at a time is fine: called from a background thread). Returns how many were done. */
    fun migrate(limit: Int = Int.MAX_VALUE): Int {
        var n = 0
        for (f in root.walkTopDown()) {
            if (n >= limit) break
            if (f.isFile && !vault.isEncrypted(f) && vault.migrate(f)) n++
        }
        return n
    }

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
            if (fresh) diskFile(rel, null).takeIf { it.isFile }?.let { f -> runCatching { vault.open(f) }.getOrNull()?.let { return respond(rel, it) } }
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
        if (!siteIsNewer()) return false
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
        vault.write(diskFile("lazy.html", null), html.toByteArray())
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
