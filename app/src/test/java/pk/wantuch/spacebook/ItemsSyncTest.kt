package pk.wantuch.spacebook

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.Dispatcher
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.RecordedRequest
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import pk.wantuch.spacebook.data.Prefs
import pk.wantuch.spacebook.data.local.Bookmark
import pk.wantuch.spacebook.data.local.SpaceBookDb
import pk.wantuch.spacebook.data.remote.ApiService
import pk.wantuch.spacebook.data.remote.DeviceDto
import pk.wantuch.spacebook.data.remote.Endpoint
import pk.wantuch.spacebook.data.remote.SiteInterceptor
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.data.repo.LibraryRepository
import pk.wantuch.spacebook.data.repo.SyncRepository
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory

/**
 * The phone's saved items against a mock of api/v2/sync.php whose answers have exactly the shape the real server gives (tests/php/items_tests.php
 * and tests/sync/items.js run the same events against the real PHP + MySQL): what the phone sends, and what it does with a pull.
 */
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [35])
class ItemsSyncTest {
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false; encodeDefaults = true }
    private lateinit var server: MockWebServer
    private lateinit var db: SpaceBookDb
    private lateinit var prefs: Prefs
    private lateinit var lib: LibraryRepository
    private lateinit var sync: SyncRepository
    private val posted = mutableListOf<JsonObject>()
    private var pullBody = """{"ok":true,"cursor":9,"more":false,"coins":4,"progress":{},"plans":[],"plansDeleted":[],"tp":{"q":{},"days":{},"sessions":[]},"items":[],"itemsDeleted":[]}"""
    private val gets = mutableListOf<String>()

    @Before fun setUp() = runBlocking {
        val ctx = ApplicationProvider.getApplicationContext<Context>()
        server = MockWebServer().also { s ->
            s.dispatcher = object : Dispatcher() {
                override fun dispatch(request: RecordedRequest): MockResponse {
                    if (request.method == "POST") {
                        val body = json.parseToJsonElement(request.body.readUtf8()).jsonObject
                        posted += body
                        val ids = body["events"]!!.jsonArray.joinToString(",") { "\"" + it.jsonObject["eventId"]!!.jsonPrimitive.content + "\"" }
                        return MockResponse().setBody("""{"ok":true,"accepted":[$ids],"rejected":[],"cursor":5,"coins":0}""")
                    }
                    gets += request.path.orEmpty()
                    return MockResponse().setBody(pullBody)
                }
            }
            s.start()
        }
        val endpoint = Endpoint()
        assertTrue(endpoint.override(server.url("/").toString()))
        endpoint.token = "t".repeat(64)
        val api = Retrofit.Builder().baseUrl(Endpoint.DEFAULT).client(OkHttpClient.Builder().addInterceptor(SiteInterceptor(endpoint)).build())
            .addConverterFactory(json.asConverterFactory("application/json".toMediaType())).build().create(ApiService::class.java)
        db = Room.inMemoryDatabaseBuilder(ctx, SpaceBookDb::class.java).allowMainThreadQueries().build()
        prefs = Prefs(ctx, json)
        prefs.setSession(UserDto(id = 7, name = "Ayesha"), DeviceDto("11111111-2222-4333-8444-555555555555", "t".repeat(64)))
        prefs.setSyncOn(true); prefs.setCursor(0); prefs.setClass("")
        lib = LibraryRepository(ctx, db.items(), db.outbox(), prefs, json).also { it.onChanged = {} }
        sync = SyncRepository(ctx, api, db.outbox(), lib, prefs, json)
    }

    @After fun tearDown() { db.close(); server.shutdown() }

    @Test fun aBookmarkAndAPositionLeaveThePhoneAsItemEvents() = runBlocking {
        lib.setBookmark(true, Bookmark("cls5-math", "cls5", 2, "Lessons", 3, "3 Fractions", 1))
        lib.savePosition(pk.wantuch.spacebook.data.local.ReadingPosition("cls5-math", "cls5", 2, "3 Fractions", 4, 12, 1, "Lessons"))
        assertTrue(sync.flush())
        assertEquals(1, posted.size)
        val events = posted.single()["events"]!!.jsonArray
        assertEquals(setOf("bm", "pos"), events.map { it.jsonObject["payload"]!!.jsonObject["kind"]!!.jsonPrimitive.content }.toSet())
        assertTrue(events.all { it.jsonObject["type"]!!.jsonPrimitive.content == "item.put" && it.jsonObject["schema"]!!.jsonPrimitive.content == "1" })
        val bm = events.map { it.jsonObject["payload"]!!.jsonObject }.first { it["kind"]!!.jsonPrimitive.content == "bm" }
        assertEquals("cls5-math|2|Lessons|3", bm["key"]!!.jsonPrimitive.content)
        assertEquals(0, db.outbox().pending(7, 10).size)
        assertTrue("then it pulls from the cursor the app had", gets.single().endsWith("since=0"))
        assertEquals(9, prefs.state.first().syncCursor)
        assertEquals(4, prefs.state.first().coins)
    }

    @Test fun whatTheServerKnowsComesIntoTheLibrary() = runBlocking {
        pullBody = """{"ok":true,"cursor":12,"more":false,"coins":0,"progress":{},"plans":[],"plansDeleted":[],"tp":{"q":{},"days":{},"sessions":[]},
            "items":[
              {"kind":"bm","key":"cls9-phy|1|Lessons|0","value":{"c":"cls9","s":"cls9-phy","ch":1,"p":0,"tb":"Lessons","t":"2 Kinematics"},"at":1700000000000},
              {"kind":"note","key":"11111111-2222-4333-8444-555555555555","value":{"c":"cls9","s":"cls9-phy","ch":1,"p":0,"tb":"Lessons","t":"2 Kinematics","x":"","q":"velocity is a vector","k":"hl"},"at":1700000000001},
              {"kind":"pos","key":"cls9-phy","value":{"c":"cls9","ch":1,"p":2,"tb":"Lessons","n":8,"t":"2 Kinematics"},"at":1700000000002},
              {"kind":"pref","key":"class","value":{"id":"cls9"},"at":1700000000003},
              {"kind":"word","key":"en:velocity","value":{"s":"l"},"at":1700000000004}
            ],
            "itemsDeleted":[]}"""
        assertTrue(sync.flush())
        val b = lib.bookmarks().first().single()
        assertEquals("cls9-phy", b.subjectId); assertEquals(1, b.chapterIndex); assertEquals("Lessons", b.tab); assertEquals("2 Kinematics", b.title)
        val n = lib.notes().first().single()
        assertTrue(n.isHighlight); assertEquals("velocity is a vector", n.quote)
        assertEquals(2, lib.position("cls9-phy")!!.page)
        assertEquals("the website's 'my class' becomes the phone's", "cls9", prefs.state.first().classId)
        assertEquals("a marked word is the page's business, not stored here", null, db.items().get(7, "word", "en:velocity"))
        assertEquals(12, prefs.state.first().syncCursor)
        assertEquals("nothing that came from the server is sent back", 0, db.outbox().pending(7, 10).size)
    }

    @Test fun aDeleteMadeOnThePhoneIsSentAsItemDelWithNoValue() = runBlocking {
        val b = Bookmark("cls5-math", "cls5", 2, "Lessons", 3, "3 Fractions", 1)
        lib.setBookmark(true, b)
        sync.flush()
        posted.clear()
        lib.setBookmark(false, b)
        sync.flush()
        val ev = posted.single()["events"]!!.jsonArray.single().jsonObject
        assertEquals("item.del", ev["type"]!!.jsonPrimitive.content)
        assertTrue(ev["payload"]!!.jsonObject["value"] == null)
        assertEquals("cls5-math|2|Lessons|3", ev["payload"]!!.jsonObject["key"]!!.jsonPrimitive.content)
    }

    @Test fun withTheOwnersSwitchOffNothingIsSentAndPagesOfThePullAreFollowed() = runBlocking {
        prefs.setSyncOn(false)
        lib.setBookmark(true, Bookmark("cls5-math", "cls5", 2, "Lessons", 3, "3 Fractions", 1))
        sync.flush()
        assertEquals("items wait while the switch is off", 0, posted.size)
        assertEquals(1, db.items().unsent(7).size)
        prefs.setSyncOn(true)
        pullBody = """{"ok":true,"cursor":5,"more":true,"coins":0,"items":[],"itemsDeleted":[]}"""
        sync.pull()
        assertTrue("a pull with more=true asks again from the cursor the answer gave (5)", gets.any { it.endsWith("since=5") })
    }

    @Test fun twoPhonesAndTheWebsiteAgreeOnWhoWins() = runBlocking {
        // the phone saved a bookmark title at time T; the server holds an older one (ignored) and then a newer one (taken)
        val b = Bookmark("cls5-math", "cls5", 2, "Lessons", 3, "mine", 1)
        lib.setBookmark(true, b)
        val localAt = db.items().get(7, "bm", "cls5-math|2|Lessons|3")!!.at
        pullBody = """{"ok":true,"cursor":6,"more":false,"coins":0,"items":[{"kind":"bm","key":"cls5-math|2|Lessons|3","value":{"c":"cls5","s":"cls5-math","ch":2,"p":3,"tb":"Lessons","t":"older"},"at":${localAt - 5}}],"itemsDeleted":[]}"""
        sync.flush()
        assertEquals("mine", lib.bookmarks().first().single().title)
        pullBody = """{"ok":true,"cursor":7,"more":false,"coins":0,"items":[{"kind":"bm","key":"cls5-math|2|Lessons|3","value":{"c":"cls5","s":"cls5-math","ch":2,"p":3,"tb":"Lessons","t":"newer"},"at":${localAt + 5}}],"itemsDeleted":[]}"""
        sync.pull()
        assertEquals("newer", lib.bookmarks().first().single().title)
    }
}
