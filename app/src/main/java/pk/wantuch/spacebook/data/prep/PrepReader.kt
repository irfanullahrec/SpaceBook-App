package pk.wantuch.spacebook.data.prep

import android.annotation.SuppressLint
import android.content.Context
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import kotlinx.coroutines.withTimeoutOrNull
import kotlinx.serialization.json.Json
import org.json.JSONArray
import org.json.JSONObject
import pk.wantuch.spacebook.data.remote.Endpoint
import java.io.ByteArrayInputStream
import javax.inject.Inject
import javax.inject.Singleton
import kotlin.coroutines.resume

/**
 * Reads the student's Tests Preps and Study Plans.
 *
 * The website keeps them in the browser's own storage, which only a page of the website's address can open. So a tiny, empty
 * page of that address is loaded in a WebView nobody sees (it comes from the app itself, nothing is downloaded), assets/prep_summary.js
 * runs in it and returns the summary, and the WebView is thrown away. Takes a fraction of a second.
 */
@Singleton
class PrepReader @Inject constructor(
    @ApplicationContext private val context: Context,
    private val endpoint: Endpoint,
    private val json: Json,
) {
    private val summaryJs by lazy { context.assets.open("prep_summary.js").bufferedReader().use { it.readText() } }
    private val testsJson by lazy { context.assets.open("prep_tests.json").bufferedReader().use { it.readText() } }

    /** the tests PST, CT, SST ... (also used to name a test the student started) */
    val tests: List<TestMeta> by lazy { runCatching { json.decodeFromString<List<TestMeta>>(testsJson) }.getOrDefault(emptyList()) }

    /** @param hints how the student may be named in the test record (id, name), most likely first
     *  @return null when the page could not be read (the caller keeps what it showed before) */
    @SuppressLint("SetJavaScriptEnabled")
    suspend fun read(hints: List<String>): PrepSnapshot? = withContext(Dispatchers.Main) {
        withTimeoutOrNull(10_000) {
            suspendCancellableCoroutine { cont ->
                val wv = WebView(context)
                fun finish(value: PrepSnapshot?) {
                    if (cont.isActive) cont.resume(value)
                    wv.stopLoading(); wv.destroy()
                }
                cont.invokeOnCancellation { wv.post { wv.stopLoading(); wv.destroy() } }
                wv.settings.javaScriptEnabled = true
                wv.settings.domStorageEnabled = true
                wv.settings.allowFileAccess = false
                wv.webViewClient = object : WebViewClient() {
                    override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? =
                        if (request.url.path?.endsWith(PAGE_PATH) == true && request.isForMainFrame)
                            WebResourceResponse("text/html", "utf-8", ByteArrayInputStream(PAGE_HTML.toByteArray()))
                        else WebResourceResponse("text/plain", "utf-8", 404, "Not found", emptyMap(), ByteArrayInputStream(ByteArray(0)))

                    override fun onPageFinished(view: WebView, url: String) {
                        val hintArray = JSONArray(hints.map { it.lowercase() })
                        val call = "$summaryJs\n;SBPrepSummary($hintArray, $testsJson, ${System.currentTimeMillis()})"
                        view.evaluateJavascript(call) { raw ->
                            val parsed = runCatching {
                                val text = JSONObject("{\"v\":$raw}").getString("v")
                                json.decodeFromString<PrepSnapshot>(text)
                            }.getOrNull()
                            finish(parsed)
                        }
                    }
                }
                wv.loadUrl(endpoint.absolute(PAGE_PATH.trimStart('/')))
            }
        }
    }

    private companion object {
        const val PAGE_PATH = "/__sb_prep.html"
        const val PAGE_HTML = "<!doctype html><meta charset=\"utf-8\"><title>SpaceBook</title>"
    }
}
