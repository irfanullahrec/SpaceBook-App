package pk.wantuch.spacebook.data.search

import android.annotation.SuppressLint
import android.content.Context
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.coroutines.withTimeoutOrNull
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.json.JSONArray
import org.json.JSONObject
import pk.wantuch.spacebook.data.offline.SiteStore
import pk.wantuch.spacebook.data.remote.Endpoint
import java.io.ByteArrayInputStream
import java.util.concurrent.ConcurrentHashMap
import javax.inject.Inject
import javax.inject.Singleton

/** A chapter whose text holds every word typed. [hits] is how many times the words occur in it. */
@Serializable
data class BookHit(val id: String, val chapter: Int, val title: String = "", val hits: Int = 0, val score: Double = 0.0)

/**
 * Search inside the books, offline: the website's own js/core/search.js (the same words, letter variants, ranking and index files as the
 * header search box on the web) runs in a WebView nobody sees. Its index files (content/search/<subject>.json) come through [SiteStore], so
 * a book that is on the phone is searchable with no internet. The results are exactly the website's; nothing is re-implemented here.
 *
 * Use [search] from the search screen and [close] when it goes away (the WebView is thrown away; the next search makes a new one).
 */
@Singleton
class BookSearch @Inject constructor(
    @ApplicationContext private val context: Context,
    private val endpoint: Endpoint,
    private val store: SiteStore,
    private val json: Json,
) {
    // the website's search module (bundled with the shell) and the app's one-line call into it (assets/search_bridge.js)
    private val searchJs by lazy {
        context.assets.open("site/js/core/search.js").bufferedReader().use { it.readText() } + "\n;\n" +
            context.assets.open("search_bridge.js").bufferedReader().use { it.readText() }
    }
    private var wv: WebView? = null
    private var loaded: CompletableDeferred<Boolean>? = null
    private val pending = ConcurrentHashMap<Int, CompletableDeferred<String>>()
    private var seq = 0

    inner class Host {
        @JavascriptInterface fun done(id: Int, raw: String) { pending.remove(id)?.complete(raw) }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun ensure(): CompletableDeferred<Boolean> {
        loaded?.let { return it }
        val ready = CompletableDeferred<Boolean>()
        loaded = ready
        val view = WebView(context)
        view.settings.javaScriptEnabled = true
        view.settings.allowFileAccess = false
        view.addJavascriptInterface(Host(), "SBSearchHost")
        view.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(v: WebView, request: WebResourceRequest): WebResourceResponse? {
                if (request.isForMainFrame && request.url.path?.endsWith(PAGE_PATH) == true) return WebResourceResponse("text/html", "utf-8", ByteArrayInputStream(PAGE_HTML.toByteArray()))
                return store.intercept(request) ?: WebResourceResponse("text/plain", "utf-8", 404, "Not found", emptyMap(), ByteArrayInputStream(ByteArray(0)))
            }

            override fun onPageFinished(v: WebView, url: String) {
                v.evaluateJavascript(searchJs, null)
                ready.complete(true)
            }
        }
        wv = view
        view.loadUrl(endpoint.absolute(PAGE_PATH.trimStart('/')))
        return ready
    }

    /** @param subjectIds the books to look in (the ones on the phone, or all of them) @return best first, at most ten, [] when nothing matches or the index is missing */
    suspend fun search(query: String, subjectIds: List<String>): List<BookHit> = withContext(Dispatchers.Main) {
        if (query.isBlank() || subjectIds.isEmpty()) return@withContext emptyList()
        if (withTimeoutOrNull(10_000) { ensure().await() } != true) return@withContext emptyList()
        val view = wv ?: return@withContext emptyList()
        val id = ++seq
        val answer = CompletableDeferred<String>()
        pending[id] = answer
        view.evaluateJavascript("SBAppSearch($id, ${JSONObject.quote(query)}, ${JSONArray(subjectIds)})", null)
        val raw = withTimeoutOrNull(25_000) { answer.await() }
        pending.remove(id)
        parse(raw.orEmpty())
    }

    fun parse(raw: String): List<BookHit> = runCatching { json.decodeFromString<List<BookHit>>(raw) }.getOrDefault(emptyList())

    fun close() {
        pending.values.forEach { it.complete("[]") }
        pending.clear()
        wv?.let { it.stopLoading(); it.removeJavascriptInterface("SBSearchHost"); it.destroy() }
        wv = null
        loaded = null
    }

    private companion object {
        const val PAGE_PATH = "/__sb_search.html"
        const val PAGE_HTML = "<!doctype html><meta charset=\"utf-8\"><title>SpaceBook search</title>"
    }
}
