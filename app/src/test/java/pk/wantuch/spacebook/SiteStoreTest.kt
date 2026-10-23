package pk.wantuch.spacebook

import android.net.Uri
import android.webkit.WebResourceRequest
import androidx.test.core.app.ApplicationProvider
import kotlinx.serialization.json.Json
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.Dispatcher
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.RecordedRequest
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import pk.wantuch.spacebook.data.offline.FixedKeyProvider
import pk.wantuch.spacebook.data.offline.SiteStore
import pk.wantuch.spacebook.data.offline.SiteVault
import pk.wantuch.spacebook.data.remote.Endpoint
import java.io.File
import java.security.MessageDigest
import java.util.concurrent.atomic.AtomicInteger

/** The phone's copy of the website: what it serves with no network, what it keeps, and what it refuses. */
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [35])
class SiteStoreTest {
    private lateinit var server: MockWebServer
    private lateinit var store: SiteStore
    private lateinit var endpoint: Endpoint
    private val hits = AtomicInteger()
    private val files = mutableMapOf<String, String>()

    private fun sha(s: String) = MessageDigest.getInstance("SHA-256").digest(s.toByteArray()).joinToString("") { "%02x".format(it) }

    @Before fun setUp() {
        File(ApplicationProvider.getApplicationContext<android.content.Context>().filesDir, "site").deleteRecursively()
        files.clear(); hits.set(0)
        server = MockWebServer()
        server.dispatcher = object : Dispatcher() {
            override fun dispatch(request: RecordedRequest): MockResponse {
                hits.incrementAndGet()
                val path = request.requestUrl!!.encodedPath.trimStart('/')
                return files[path]?.let { MockResponse().setBody(it) } ?: MockResponse().setResponseCode(404)
            }
        }
        server.start()
        endpoint = Endpoint()
        assertTrue(endpoint.override(server.url("/").toString()))
        store = SiteStore(ApplicationProvider.getApplicationContext(), endpoint, OkHttpClient(), Json { ignoreUnknownKeys = true }, SiteVault(FixedKeyProvider(ByteArray(32) { it.toByte() })))
    }

    @After fun tearDown() = runCatching { server.shutdown() }.let { }

    private fun req(path: String, method: String = "GET", headers: Map<String, String> = emptyMap()) = object : WebResourceRequest {
        override fun getUrl(): Uri = Uri.parse(server.url("/").toString() + path)
        override fun isForMainFrame() = false
        override fun isRedirect() = false
        override fun hasGesture() = false
        override fun getMethod() = method
        override fun getRequestHeaders() = headers
    }

    private fun WebResourceRequest.text(store: SiteStore) = store.intercept(this)?.data?.bufferedReader()?.readText()

    @Test fun downloadedFileIsKeptAndServedWithNoNetwork() {
        files["js/book_data.js"] = "window.BOOK=1;"
        assertTrue(store.download("js/book_data.js", "abc123def456", sha(files["js/book_data.js"]!!)))
        server.shutdown()                                     // from here on there is no site
        assertTrue(store.has("js/book_data.js", "abc123def456"))
        assertEquals("window.BOOK=1;", req("js/book_data.js?v=abc123def456").text(store))
    }

    @Test fun aWrongHashIsRejectedAndNothingIsKept() {
        files["js/book_data.js"] = "window.BOOK=1;"
        assertFalse(store.download("js/book_data.js", "abc123def456", sha256 = "0".repeat(64)))
        assertFalse(store.has("js/book_data.js", "abc123def456"))
    }

    @Test fun aFileTheSiteDoesNotHaveIsNotKept() {
        assertFalse(store.download("js/none.js", "abc123def456"))
        assertFalse(store.has("js/none.js", "abc123def456"))
    }

    @Test fun readThroughCacheFetchesOnceThenServesLocally() {
        files["js/lazy_book.js"] = "window.X=2;"
        assertEquals("window.X=2;", req("js/lazy_book.js?v=111111111111").text(store))
        val after = hits.get()
        assertEquals("window.X=2;", req("js/lazy_book.js?v=111111111111").text(store))
        assertEquals("the second read must not touch the site", after, hits.get())
    }

    @Test fun aNewVersionOfAFileIsAnotherFile() {
        files["js/lazy_book.js"] = "v1"
        assertEquals("v1", req("js/lazy_book.js?v=aaaaaaaaaaaa").text(store))
        files["js/lazy_book.js"] = "v2"
        assertEquals("v2", req("js/lazy_book.js?v=bbbbbbbbbbbb").text(store))
        assertEquals("v1", req("js/lazy_book.js?v=aaaaaaaaaaaa").text(store))     // the old hash still answers with what it was
    }

    @Test fun missingBookDataIsReportedAndAnswered404() {
        server.shutdown()
        var missing: String? = null
        store.onMissing = { missing = it }
        val r = store.intercept(req("js/not_downloaded_data.js?v=cccccccccccc"))
        assertNotNull(r)
        assertEquals(404, r!!.statusCode)
        assertEquals("js/not_downloaded_data.js", missing)
    }

    @Test fun theApiIsNeverAnsweredHere() {
        assertNull(store.intercept(req("api/v2/sync.php")))
        assertNull(store.intercept(req("api/auth.php?action=me")))
    }

    @Test fun onlyPlainGetsWithoutRangeAreHandled() {
        files["js/a.js"] = "1"
        assertNull(store.intercept(req("js/a.js", method = "POST")))
        assertNull(store.intercept(req("js/a.js", headers = mapOf("Range" to "bytes=0-10"))))
    }

    @Test fun theWebsitesServiceWorkerIsRefused() {
        files["sw.js"] = "self.addEventListener('fetch',()=>{})"
        assertEquals(404, store.intercept(req("sw.js"))!!.statusCode)
    }

    @Test fun pathsCannotEscapeTheStore() {
        assertEquals(404, store.intercept(req("js/../../secret.txt"))!!.statusCode)
        assertFalse(store.download("../outside.js", null))
        assertFalse(store.has("a/../b.js", null))
    }

    @Test fun otherSitesAreLeftToTheWebView() {
        val other = object : WebResourceRequest by req("x") {
            override fun getUrl(): Uri = Uri.parse("https://example.com/js/app.js")
        }
        assertNull(store.intercept(other))
    }

    @Test fun mimeTypesAreRightForTheWebView() {
        files["js/a.js"] = "1"; files["css/a.css"] = "a{}"; files["content/x.json"] = "{}"
        assertEquals("text/javascript", store.intercept(req("js/a.js?v=dddddddddddd"))!!.mimeType)
        assertEquals("text/css", store.intercept(req("css/a.css?v=dddddddddddd"))!!.mimeType)
        assertEquals("application/json", store.intercept(req("content/x.json"))!!.mimeType)
    }

    @Test fun theShellShippedInTheAppAnswersWithNoSite() {
        server.shutdown()
        val page = req("lazy.html").text(store)
        assertNotNull(page)
        assertTrue(page!!.contains("<html", ignoreCase = true))
        assertTrue(req("js/app.js").text(store)!!.isNotEmpty())    // any version: the shell has it
    }

    @Test fun theEntryPageIsRefreshedFromTheSiteWhenEverythingItNamesCanBeHad() {
        files["lazy.html"] = """<html><script src="js/new_shell.js?v=0123456789ab"></script></html>"""
        files["js/new_shell.js"] = "window.NEW=1;"
        assertTrue(req("lazy.html").text(store)!!.contains("new_shell.js"))
        server.shutdown()
        assertTrue("kept for next time", req("lazy.html").text(store)!!.contains("new_shell.js"))
        assertEquals("window.NEW=1;", req("js/new_shell.js?v=0123456789ab").text(store))
    }

    @Test fun aNewEntryPageWhoseFilesCannotBeHadIsNotKept() {
        files["lazy.html"] = """<html><script src="js/missing_shell.js?v=0123456789ab"></script></html>"""
        val page = req("lazy.html").text(store)
        assertFalse("the bundled page stays", page!!.contains("missing_shell.js"))
    }
}
