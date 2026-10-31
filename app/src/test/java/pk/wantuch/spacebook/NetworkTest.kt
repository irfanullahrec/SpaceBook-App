package pk.wantuch.spacebook

import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import pk.wantuch.spacebook.data.remote.ApiResult
import pk.wantuch.spacebook.data.remote.ApiService
import pk.wantuch.spacebook.data.remote.Endpoint
import pk.wantuch.spacebook.data.remote.LoginBody
import pk.wantuch.spacebook.data.remote.SiteInterceptor
import pk.wantuch.spacebook.data.remote.apiCall
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory
import okhttp3.MediaType.Companion.toMediaType

class NetworkTest {
    private lateinit var server: MockWebServer
    private lateinit var endpoint: Endpoint
    private lateinit var api: ApiService
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false; encodeDefaults = true }

    @Before fun setUp() {
        server = MockWebServer().also { it.start() }
        endpoint = Endpoint()
        // MockWebServer listens on localhost over plain http, which Endpoint allows for the developer's own PC only
        assertTrue(endpoint.override(server.url("/").toString()))
        val client = OkHttpClient.Builder().addInterceptor(SiteInterceptor(endpoint)).build()
        api = Retrofit.Builder().baseUrl(Endpoint.DEFAULT).client(client)
            .addConverterFactory(json.asConverterFactory("application/json".toMediaType())).build().create(ApiService::class.java)
    }

    @After fun tearDown() = server.shutdown()

    @Test fun requestsGoToTheConfiguredSiteWithPathAndQueryKept() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"ok":true,"cursor":5,"coins":12,"more":false}"""))
        val r = apiCall(json) { api.pull(7) }
        assertTrue(r is ApiResult.Success)
        val req = server.takeRequest()
        assertEquals("/api/v2/sync.php?since=7", req.path)
        assertEquals(12, (r as ApiResult.Success).value.coins)
    }

    @Test fun deviceTokenIsSentAsBearerOnlyWhenSignedIn() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"ok":true,"plan":"free","unlocked":true}"""))
        apiCall(json) { api.entitlements() }
        assertEquals(null, server.takeRequest().getHeader("Authorization"))

        endpoint.token = "a".repeat(64)
        server.enqueue(MockResponse().setBody("""{"ok":true,"plan":"free","unlocked":true}"""))
        apiCall(json) { api.entitlements() }
        assertEquals("Bearer " + "a".repeat(64), server.takeRequest().getHeader("Authorization"))
    }

    @Test fun everyRequestSaysItIsTheAppAndCarriesTheVisitorId() = runBlocking {
        endpoint.visitor = "c".repeat(32)
        server.enqueue(MockResponse().setBody("""{"ok":true,"plan":"free"}"""))
        apiCall(json) { api.entitlements() }
        val req = server.takeRequest()
        assertEquals("app", req.getHeader("X-SB-Platform"))
        assertEquals("c".repeat(32), req.getHeader("X-SB-Visitor"))
    }

    @Test fun serverErrorMessageIsShownToTheStudent() = runBlocking {
        server.enqueue(MockResponse().setResponseCode(401).setBody("""{"ok":false,"error":"Wrong WhatsApp number or password"}"""))
        val r = apiCall(json) { api.login(LoginBody("0300", "x")) }
        assertTrue(r is ApiResult.Failure)
        r as ApiResult.Failure
        assertEquals("Wrong WhatsApp number or password", r.message)
        assertEquals(401, r.code)
        assertFalse(r.offline)
    }

    @Test fun noConnectionIsReportedAsOffline() = runBlocking {
        server.shutdown()
        val r = apiCall(json) { api.pull(0) }
        assertTrue(r is ApiResult.Failure && r.offline)
    }

    @Test fun loginSendsTheFieldsTheServerExpects() = runBlocking {
        server.enqueue(MockResponse().setBody("""{"ok":true,"user":{"id":3,"name":"Ali","father_name":"Khan","user_type":"student","whatsapp":"03001234567"},"device":{"id":"d1","token":"${"b".repeat(64)}"}}"""))
        val r = apiCall(json) { api.login(LoginBody("03001234567", "secret1")) }
        val req = server.takeRequest()
        assertEquals("/api/auth.php?action=login", req.path)
        val body = req.body.readUtf8()
        assertTrue(body, body.contains("\"whatsapp\":\"03001234567\""))
        assertTrue(body, body.contains("\"want_device\":true"))
        val ok = (r as ApiResult.Success).value
        assertEquals("Ali", ok.user?.name)
        assertEquals("b".repeat(64), ok.device?.token)
    }

    @Test fun plainHttpIsRefusedForARealSite() {
        val e = Endpoint()
        assertFalse(e.override("http://example.com/spacebook/"))
        assertTrue(e.override("https://example.com/spacebook/"))
        assertTrue(e.override("http://10.0.2.2:8790"))
        assertEquals("http://10.0.2.2:8790/", e.url.toString())
        assertTrue(e.override(""))
        assertEquals(Endpoint.DEFAULT, e.url)
    }
}
