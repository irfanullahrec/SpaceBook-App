package pk.wantuch.spacebook.data.remote

import android.webkit.CookieManager
import kotlinx.serialization.json.Json
import okhttp3.Cookie
import okhttp3.CookieJar
import okhttp3.HttpUrl
import okhttp3.HttpUrl.Companion.toHttpUrl
import okhttp3.HttpUrl.Companion.toHttpUrlOrNull
import okhttp3.Interceptor
import okhttp3.Response
import pk.wantuch.spacebook.BuildConfig
import retrofit2.Response as RetrofitResponse
import java.io.IOException
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Where the website lives, and who is signed in. Retrofit is built once against [DEFAULT]; every request is then
 * pointed at [url] (the developer override from Settings, otherwise the same address) and gets the device token.
 * The token is the only secret the app holds; no database credential is ever in the app.
 */
@Singleton
class Endpoint @Inject constructor() {
    @Volatile var url: HttpUrl = DEFAULT
        private set
    @Volatile var token: String = ""

    /** this install's random id (32 hex), sent as X-SB-Visitor: the server counts the free allowance of a person who has no account by it (api/lib/billing.php) */
    @Volatile var visitor: String = ""

    /** @return false (and keeps the current address) when [raw] is not a usable address. */
    fun override(raw: String): Boolean {
        if (raw.isBlank()) { url = DEFAULT; return true }
        val fixed = (if (raw.endsWith("/")) raw else "$raw/")
        val parsed = fixed.toHttpUrlOrNull() ?: return false
        // plain http only for the developer's own PC; the network security config enforces the same
        if (!parsed.isHttps && parsed.host !in LOCAL_HOSTS) return false
        url = parsed
        return true
    }

    /** Absolute address of a file on the site, for the WebView and for images. */
    fun absolute(path: String): String = url.resolve(path.trimStart('/'))?.toString() ?: (url.toString() + path.trimStart('/'))

    companion object {
        val DEFAULT: HttpUrl = BuildConfig.SITE_URL.toHttpUrl()
        val LOCAL_HOSTS = setOf("10.0.2.2", "localhost", "127.0.0.1")
    }
}

class SiteInterceptor(private val endpoint: Endpoint) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val req = chain.request()
        val rel = req.url.encodedPath.removePrefix(Endpoint.DEFAULT.encodedPath)
        val query = req.url.encodedQuery?.let { "?$it" }.orEmpty()
        val target = endpoint.url.resolve(rel + query) ?: throw IOException("Bad site address")
        val b = req.newBuilder().url(target)
        if (req.header("Accept") == null) b.header("Accept", "application/json")
        if (endpoint.token.isNotEmpty()) b.header("Authorization", "Bearer ${endpoint.token}")
        b.header("X-SB-Platform", "app")
        if (endpoint.visitor.isNotEmpty()) b.header("X-SB-Visitor", endpoint.visitor)
        return chain.proceed(b.build())
    }
}

/** Shares cookies with the in-app WebView, so signing in natively also signs the web pages in. */
class WebViewCookieJar : CookieJar {
    private val manager: CookieManager? get() = runCatching { CookieManager.getInstance() }.getOrNull()

    override fun saveFromResponse(url: HttpUrl, cookies: List<Cookie>) {
        val m = manager ?: return
        cookies.forEach { m.setCookie(url.toString(), it.toString()) }
        runCatching { m.flush() }
    }

    override fun loadForRequest(url: HttpUrl): List<Cookie> {
        val raw = manager?.getCookie(url.toString()) ?: return emptyList()
        return raw.split(";").mapNotNull { Cookie.parse(url, it.trim()) }
    }
}

/** What a call to the site came back as; screens show [Failure.message] and keep working offline. */
sealed interface ApiResult<out T> {
    data class Success<T>(val value: T) : ApiResult<T>
    data class Failure(val message: String, val code: Int = 0, val offline: Boolean = false) : ApiResult<Nothing>
}

suspend fun <T> apiCall(json: Json, block: suspend () -> RetrofitResponse<T>): ApiResult<T> {
    return try {
        val r = block()
        val body = r.body()
        if (r.isSuccessful && body != null) {
            ApiResult.Success(body)
        } else {
            val text = runCatching { r.errorBody()?.string() }.getOrNull().orEmpty()
            val msg = runCatching { json.decodeFromString<OkResponse>(text).error }.getOrNull()
            ApiResult.Failure(msg ?: "Something went wrong (${r.code()})", r.code())
        }
    } catch (e: IOException) {
        ApiResult.Failure("You are offline. Your work is saved on this phone.", 0, offline = true)
    } catch (e: Exception) {
        ApiResult.Failure(e.message ?: "Something went wrong")
    }
}
