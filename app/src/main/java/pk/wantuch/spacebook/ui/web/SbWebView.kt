package pk.wantuch.spacebook.ui.web

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import android.widget.Toast
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceResponse
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.json.JSONObject
import pk.wantuch.spacebook.BuildConfig
import pk.wantuch.spacebook.data.offline.SiteStore
import pk.wantuch.spacebook.data.remote.DeviceDto
import pk.wantuch.spacebook.data.remote.Endpoint
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.ui.reader.Lang

/** What reader_bridge.js reports about the page on screen. */
@Serializable
data class WebPageState(
    val ready: Boolean = false,
    val pages: Int = 1,
    val page: Int = 0,
    val tab: String = "",
    val title: String = "",
    val mode: String = "",
)

/**
 * One WebView showing the SpaceBook website (the same renderer, books, meanings and animations as wantuch.pk/spacebook),
 * with the website's own header and sidebar removed and one page shown at a time. The Kotlin code reaches the page only
 * through window.SBApp (assets/reader_bridge.js).
 */
class WebController(
    private val appContext: Context,
    private val endpoint: Endpoint,
    private val json: Json,
    private val store: SiteStore,
) {
    var webView: WebView? = null
        private set
    var ready by mutableStateOf(false)
        private set
    var loading by mutableStateOf(true)
        private set
    var error by mutableStateOf<String?>(null)
        private set
    var state by mutableStateOf(WebPageState())
        private set

    /** the sentence or word the student tapped / held: shown by the app over the page */
    var meaning by mutableStateOf<MeaningState?>(null)
        private set

    fun dismissMeaning() { meaning = null }

    /** a book file the page asked for that is not on the phone and could not be downloaded (offline): the screen offers to download */
    var missing by mutableStateOf<String?>(null)
        private set

    /** called on the main thread: ("auth" | "end" | "start" | "error", detail) */
    var onAction: (String, String) -> Unit = { _, _ -> }

    private val main = Handler(Looper.getMainLooper())
    private var pendingAfterReady = mutableListOf<String>()
    private val css by lazy { appContext.assets.open("reader_mobile.css").bufferedReader().use { it.readText() } }
    private val bridgeJs by lazy { appContext.assets.open("reader_bridge.js").bufferedReader().use { it.readText() } }

    inner class Host {
        @JavascriptInterface fun onReady(@Suppress("UNUSED_PARAMETER") unused: String) = main.post {
            ready = true
            pendingAfterReady.forEach { run(it) }
            pendingAfterReady.clear()
        }

        @JavascriptInterface fun onState(raw: String) {
            val s = runCatching { json.decodeFromString<WebPageState>(raw) }.getOrNull() ?: return
            main.post { state = s; loading = false }
        }

        /** the page's speechSynthesis.speak (see reader_bridge.js): [lang] is "en" or "ur" */
        @JavascriptInterface fun speak(id: String, text: String, lang: String, rate: Float) { main.post { speakForPage(id, text, lang, rate) } }

        @JavascriptInterface fun stopSpeech(@Suppress("UNUSED_PARAMETER") unused: String) { main.post { tts?.stop() } }

        @JavascriptInterface fun onAction(name: String, detail: String) {
            when (name) {
                "meaning" -> runCatching { json.decodeFromString<MeaningDto>(detail).toState() }.getOrNull()?.let { m -> main.post { meaning = m } }
                "meaningUpdate" -> runCatching { json.decodeFromString<MeaningUpdateDto>(detail) }.getOrNull()?.let { u -> main.post { meaning = meaning?.apply(u) } }
                "haptic" -> main.post { webView?.performHapticFeedback(android.view.HapticFeedbackConstants.LONG_PRESS) }
                else -> main.post { onAction.invoke(name, detail) }
            }
        }
    }

    // ---- speech for the page (the Animate Solution voice): Android's own text-to-speech, nothing is sent anywhere ----
    private var tts: TextToSpeech? = null
    private var ttsReady = false
    private var afterTts: (() -> Unit)? = null

    private fun withTts(then: () -> Unit) {
        if (ttsReady && tts != null) { then(); return }
        afterTts = then
        if (tts != null) return
        tts = TextToSpeech(appContext) { status ->
            ttsReady = status == TextToSpeech.SUCCESS
            main.post { val job = afterTts; afterTts = null; job?.invoke() }
        }.also { t ->
            t.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
                override fun onStart(utteranceId: String?) {}
                override fun onDone(utteranceId: String?) = spoken(utteranceId, true)
                @Deprecated("deprecated in API") override fun onError(utteranceId: String?) = spoken(utteranceId, false)
                override fun onError(utteranceId: String?, errorCode: Int) = spoken(utteranceId, false)
            })
        }
    }

    private fun spoken(utteranceId: String?, ok: Boolean) {
        val id = utteranceId?.takeIf { it.startsWith("pg:") }?.removePrefix("pg:") ?: return      // only the last part of a long text reports
        pageSpeechDone(id, ok)
    }

    private fun pageSpeechDone(id: String, ok: Boolean) {
        main.post { webView?.evaluateJavascript("window.SBSpeechDone&&SBSpeechDone(${quote(id)},$ok)", null) }
    }

    private fun speakForPage(id: String, text: String, lang: String, rate: Float) = withTts {
        val t = tts
        val locale = Lang.locale(lang)
        if (t == null || !ttsReady) return@withTts pageSpeechDone(id, false)
        if (t.isLanguageAvailable(locale) < TextToSpeech.LANG_AVAILABLE) {
            Toast.makeText(appContext, "This phone has no ${Lang.name(lang)} voice. Add it in Settings > Text-to-speech.", Toast.LENGTH_LONG).show()
            return@withTts pageSpeechDone(id, false)
        }
        t.language = locale
        t.setSpeechRate(rate.coerceIn(0.5f, 2f))
        val parts = text.trim().chunked(3500)
        if (parts.isEmpty()) return@withTts pageSpeechDone(id, true)
        parts.forEachIndexed { i, part ->
            t.speak(part, if (i == 0) TextToSpeech.QUEUE_FLUSH else TextToSpeech.QUEUE_ADD, null, if (i == parts.lastIndex) "pg:$id" else "pg-part:$id:$i")
        }
    }

    /** Runs [js] now, or as soon as the page's bridge reports ready. */
    fun run(js: String) {
        val wv = webView
        if (wv == null || !ready) { pendingAfterReady.add(js); return }
        wv.evaluateJavascript(js, null)
    }

    private fun quote(s: String) = JSONObject.quote(s)

    fun openChapter(classId: String, subjectId: String, call: String, page: Int) {
        loading = true; missing = null; meaning = null
        run("SBApp.open(${quote(classId)},${quote(subjectId)},${quote(call)},$page)")
    }

    fun openPage(name: String) { loading = true; run("SBApp.openPage(${quote(name)})") }
    fun go(page: Int) = run("SBApp.go($page)")
    fun next() = run("SBApp.next()")
    fun prev() = run("SBApp.prev()")
    fun setMode(paginate: Boolean) = run("SBApp.setMode({paginate:$paginate})")
    fun clickTab(label: String) = run("SBApp.clickTab(${quote(label)})")
    fun signIn(user: UserDto, device: DeviceDto) =
        run("SBApp.setAuth(${json.encodeToString(UserDto.serializer(), user)},${json.encodeToString(DeviceDto.serializer(), device)})")
    fun signOut() = run("SBApp.clearAuth()")

    fun pageText(callback: (String) -> Unit) {
        val wv = webView ?: return callback("")
        wv.evaluateJavascript("SBApp.pageText()") { raw -> callback(runCatching { JSONObject("{\"v\":$raw}").getString("v") }.getOrDefault("")) }
    }

    fun selectedText(callback: (String) -> Unit) {
        val wv = webView ?: return callback("")
        wv.evaluateJavascript("SBApp.selectedText()") { raw -> callback(runCatching { JSONObject("{\"v\":$raw}").getString("v") }.getOrDefault("")) }
    }

    fun reload() {
        error = null; missing = null; ready = false; loading = true
        webView?.loadUrl(entryUrl())
    }

    fun entryUrl(): String = endpoint.absolute("lazy.html")

    @SuppressLint("SetJavaScriptEnabled")
    fun create(context: Context, textZoom: Int): WebView {
        webView?.let { return it }
        val wv = WebView(context)
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG)
        wv.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            allowFileAccess = false
            allowContentAccess = false
            mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            mediaPlaybackRequiresUserGesture = true
            setSupportZoom(false)
            builtInZoomControls = false
            this.textZoom = textZoom
            userAgentString = userAgentString + " SpaceBookApp/${BuildConfig.VERSION_NAME}"
        }
        wv.overScrollMode = WebView.OVER_SCROLL_NEVER
        wv.addJavascriptInterface(Host(), "SBHost")
        // pages, scripts and books come from the phone's own copy first (SiteStore); only the API and anything new goes to the network
        store.onMissing = { path -> main.post { missing = path; loading = false } }
        wv.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? = store.intercept(request)

            override fun onPageStarted(view: WebView, url: String, favicon: Bitmap?) {
                ready = false
            }

            override fun onPageFinished(view: WebView, url: String) {
                if (!isSite(url)) return
                view.evaluateJavascript(
                    "(function(){if(!document.getElementById('sbapp-css')){var s=document.createElement('style');s.id='sbapp-css';" +
                        "s.textContent=${quote(css)};document.head.appendChild(s);}document.documentElement.classList.add('sbapp');})();",
                    null,
                )
                view.evaluateJavascript(bridgeJs, null)
            }

            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val uri = request.url
                if (isSite(uri.toString())) return false
                // anything that is not the SpaceBook site (a textbook link, a video) opens in the phone's browser
                runCatching { context.startActivity(Intent(Intent.ACTION_VIEW, uri).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)) }
                return true
            }

            override fun onReceivedError(view: WebView, request: WebResourceRequest, err: WebResourceError) {
                if (request.isForMainFrame) {
                    error = "Could not reach SpaceBook. Check your internet and try again."
                    loading = false
                }
            }
        }
        wv.webChromeClient = object : WebChromeClient() {
            override fun onPermissionRequest(request: android.webkit.PermissionRequest) = request.deny()
        }
        webView = wv
        wv.loadUrl(entryUrl())
        return wv
    }

    fun destroy() {
        tts?.stop(); tts?.shutdown(); tts = null; ttsReady = false
        store.onMissing = {}
        webView?.apply { stopLoading(); removeJavascriptInterface("SBHost"); destroy() }
        webView = null
    }

    private fun isSite(url: String): Boolean {
        val u = Uri.parse(url)
        return u.host == endpoint.url.host
    }
}

@Composable
fun SbWebView(controller: WebController, textZoom: Int, modifier: Modifier = Modifier) {
    DisposableEffect(controller) { onDispose { controller.destroy() } }
    var created by remember { mutableStateOf(false) }
    AndroidView(
        modifier = modifier,
        factory = { ctx -> controller.create(ctx, textZoom).also { created = true } },
        update = { wv -> if (wv.settings.textZoom != textZoom) wv.settings.textZoom = textZoom },
    )
}
