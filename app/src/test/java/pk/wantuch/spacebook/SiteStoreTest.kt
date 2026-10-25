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
    /** the Last-Modified the test website answers with (by default far in the future: a website deployed after the app was built) */
    private val modified = mutableMapOf<String, String>()
    private val FUTURE = "Fri, 01 Jan 2100 00:00:00 GMT"
    private val LONG_AGO = "Mon, 01 Jan 2001 00:00:00 GMT"

    private fun sha(s: String) = MessageDigest.getInstance("SHA-256").digest(s.toByteArray()).joinToString("") { "%02x".format(it) }

    @Before fun setUp() {
        File(ApplicationProvider.getApplicationContext<android.content.Context>().filesDir, "site").deleteRecursively()
        files.clear(); modified.clear(); hits.set(0)
        files["lazy.html"] = "<html>website entry page</html>"      // the website's entry page: what the app asks about to learn whether the website is newer than its own copy
        server = MockWebServer()
        server.dispatcher = object : Dispatcher() {
            override fun dispatch(request: RecordedRequest): MockResponse {
                hits.incrementAndGet()
                val path = request.requestUrl!!.encodedPath.trimStart('/')
                return files[path]?.let { MockResponse().setBody(it).setHeader("Last-Modified", modified[path] ?: FUTURE) } ?: MockResponse().setResponseCode(404)
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

    // ------------------------------------------------------------------------------------------ the books that ship inside the app
    // These run when the APK was built with tools/app/pack_books.js (assets/books/); a build without it has nothing to check.

    private fun booksIndex(): Pair<Long, Map<String, String>>? = runCatching {
        val s = ApplicationProvider.getApplicationContext<android.content.Context>().assets.open("books/books-index.json").bufferedReader().use { it.readText() }
        val o = Json { ignoreUnknownKeys = true }.parseToJsonElement(s) as kotlinx.serialization.json.JsonObject
        val at = (o["builtAt"] as kotlinx.serialization.json.JsonPrimitive).content.toLong()
        val f = (o["files"] as kotlinx.serialization.json.JsonObject).mapValues { (it.value as kotlinx.serialization.json.JsonPrimitive).content }
        at to f
    }.getOrNull()

    @Test fun booksThatShipInsideTheAppAreServedWithNoNetworkAtAll() {
        val (_, idx) = booksIndex() ?: return
        server.shutdown()
        val (path, v) = idx.entries.first { it.value.isNotEmpty() }
        assertTrue(store.has(path, v))
        assertNotNull(store.open(path, v))
        assertTrue(req("$path?v=$v").text(store)!!.isNotEmpty())
        assertTrue("every book file the app lists is there", idx.entries.take(40).all { store.has(it.key, it.value.ifEmpty { null }) })
    }

    @Test fun aWebsiteDeployedBeforeTheAppWasBuiltDoesNotReplaceTheAppsEntryPage() {
        booksIndex() ?: return
        files["lazy.html"] = "<html>OLD WEBSITE</html>"; modified["lazy.html"] = LONG_AGO
        val page = req("lazy.html").text(store)!!
        assertFalse("an older website must not take the app back to older books", page.contains("OLD WEBSITE"))
        assertTrue(page.contains("<html", ignoreCase = true))
    }

    @Test fun aWebsiteDeployedAfterTheAppWasBuiltIsUsed() {
        booksIndex() ?: return
        files["lazy.html"] = "<html>NEW WEBSITE</html>"; modified["lazy.html"] = FUTURE
        assertTrue(req("lazy.html").text(store)!!.contains("NEW WEBSITE"))
    }

    @Test fun theListFilesOfAnOlderWebsiteAreNotKept() {
        booksIndex() ?: return
        files["lazy.html"] = "<html>OLD WEBSITE</html>"; modified["lazy.html"] = LONG_AGO
        files["content/offline_map.json"] = "{\"old\":true}"; modified["content/offline_map.json"] = LONG_AGO
        assertFalse(store.download("content/offline_map.json", null, force = true))
        assertFalse(req("content/offline_map.json").text(store)!!.contains("\"old\""))
    }
}
