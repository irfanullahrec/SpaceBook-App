package pk.wantuch.spacebook

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
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
import pk.wantuch.spacebook.data.local.ItemCodec
import pk.wantuch.spacebook.data.local.Note
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.local.SpaceBookDb
import pk.wantuch.spacebook.data.remote.DeviceDto
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.data.repo.LibraryRepository

/**
 * The website's contract (tests/parity/events_contract.json and locator_golden.json, copied here by tools/app/sync_app.js): what the app sends to
 * api/v2/sync.php has the same fields, with the same JSON types, as the examples the website's end-to-end test sends to the real server, and where a
 * page is (tab text, bookmark key) is written the same way. The examples are accepted by the real server (tests/php/items_tests.php, parity_e2e.js).
 */
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [35])
class EventContractTest {
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false; encodeDefaults = true }
    private val contract: JsonObject = json.parseToJsonElement(javaClass.getResource("/parity/events_contract.json")!!.readText()).jsonObject
    private val golden: JsonObject = json.parseToJsonElement(javaClass.getResource("/parity/locator_golden.json")!!.readText()).jsonObject
    private lateinit var db: SpaceBookDb
    private lateinit var prefs: Prefs
    private lateinit var lib: LibraryRepository

    @Before fun setUp() = runBlocking {
        val ctx = ApplicationProvider.getApplicationContext<Context>()
        db = Room.inMemoryDatabaseBuilder(ctx, SpaceBookDb::class.java).allowMainThreadQueries().build()
        prefs = Prefs(ctx, json)
        prefs.setSession(UserDto(id = 7, name = "Ayesha"), DeviceDto("11111111-2222-4333-8444-555555555555", "t".repeat(64)))
        prefs.setSyncOn(true)
        lib = LibraryRepository(ctx, db.items(), db.outbox(), prefs, json).also { it.onChanged = {} }
    }

    @After fun tearDown() = db.close()

    /** the names and JSON types of an object's fields, recursively: what a receiver depends on */
    private fun shape(e: JsonElement): Any? = when (e) {
        is JsonObject -> e.entries.sortedBy { it.key }.associate { it.key to shape(it.value) }
        is JsonArray -> "array"
        is JsonNull -> "null"
        is JsonPrimitive -> if (e.isString) "string" else if (e.booleanOrNull != null) "boolean" else "number"
    }

    private fun sentItem(kind: String): JsonObject = runBlocking {
        lib.sendPending()
        db.outbox().pending(7, 100).map { json.parseToJsonElement(it.payloadJson).jsonObject }.first { it["kind"]!!.jsonPrimitive.content == kind }
    }

    private fun contractItem(kind: String) = contract["events"]!!.jsonObject["item.put"]!!.jsonObject["payloads"]!!.jsonObject[kind]!!.jsonObject

    @Test fun aBookmarkHasTheContractsFieldsAndTypes() = runBlocking {
        lib.setBookmark(true, Bookmark("cls5-math", "cls5", 2, "Lessons", 3, "3 Fractions", 1))
        assertEquals(shape(contractItem("bm")), shape(sentItem("bm")))
        assertEquals(contractItem("bm")["key"], sentItem("bm")["key"])
        assertEquals(contractItem("bm")["value"], sentItem("bm")["value"])
    }

    @Test fun aNoteAndAHighlightHaveTheContractsFieldsAndTypes() = runBlocking {
        lib.saveNote(Note("11111111-2222-4333-8444-555555555555", "cls5-math", "cls5", 2, "Lessons", 3, "3 Fractions", "Add the numerators", "common denominator", false, 1))
        val sent = sentItem("note")
        assertEquals(shape(contractItem("note")), shape(sent))
        assertEquals(contractItem("note")["value"], sent["value"])
    }

    @Test fun aPositionAndTheClassHaveTheContractsFieldsAndTypes() = runBlocking {
        lib.savePosition(ReadingPosition("cls5-math", "cls5", 2, "3 Fractions", 4, 12, 1, "Lessons"))
        lib.setClass("cls5")
        assertEquals(shape(contractItem("pos")), shape(sentItem("pos")))
        assertEquals(contractItem("pos")["value"], sentItem("pos")["value"])
        assertEquals(shape(contractItem("pref")), shape(sentItem("pref")))
        assertEquals(contractItem("pref")["value"], sentItem("pref")["value"])
    }

    @Test fun aDeleteHasTheContractsFields() = runBlocking {
        val b = Bookmark("cls5-math", "cls5", 2, "Lessons", 3, "3 Fractions", 1)
        lib.setBookmark(true, b); lib.sendPending()
        lib.setBookmark(false, b); lib.sendPending()
        val del = db.outbox().pending(7, 100).last()
        assertEquals("item.del", del.type)
        assertEquals(shape(contract["events"]!!.jsonObject["item.del"]!!.jsonObject["payload"]!!), shape(json.parseToJsonElement(del.payloadJson)))
    }

    @Test fun everyEventTypeTheAppSendsIsInTheContract() {
        val emittedByApp = contract["events"]!!.jsonObject.filter { (_, v) -> v.jsonObject["emittedBy"]!!.jsonArray.any { it.jsonPrimitive.content == "app" } }.keys
        assertEquals(setOf("step", "item.put", "item.del"), emittedByApp)
    }

    @Test fun aStepHasTheContractsFields() = runBlocking {
        // the step event of SyncRepository.rewardStep: key, title, total, step
        val example = contract["events"]!!.jsonObject["step"]!!.jsonObject["payload"]!!.jsonObject
        assertEquals(setOf("key", "title", "total", "step"), example.keys)
        val key = pk.wantuch.spacebook.ui.games.GameKeys.rewardKey(pk.wantuch.spacebook.ui.games.GamePage("cls5", "cls5-math", "Mathematics", 2, "3 Fractions", 0, "text"), "blank-quest", 10)
        assertTrue("the app's reward keys have the server's shape (api/lib/rewards.php sb_reward_key_kind)", Regex("^[A-Za-z0-9_.:-]{1,40}\\|[A-Za-z0-9_.:-]{1,60}\\|u[A-Za-z0-9]{0,8}\\|(trace|count)\\|[a-z0-9]{1,10}\\|[0-9]{1,3}$").matches(key))
        assertTrue("and so do the website's (the contract example)", Regex("^[A-Za-z0-9_.:-]{1,40}\\|[A-Za-z0-9_.:-]{1,60}\\|u[A-Za-z0-9]{0,8}\\|(trace|count)\\|[a-z0-9]{1,10}\\|[0-9]{1,3}$").matches(example["key"]!!.jsonPrimitive.content))
    }

    @Test fun tabTextsAndBookmarkKeysAreWrittenAsTheWebsiteWritesThem() {
        for (pair in golden["tabs"]!!.jsonArray) assertEquals("tab ${pair.jsonArray[0]}", pair.jsonArray[1].jsonPrimitive.content, ItemCodec.cleanTab(pair.jsonArray[0].jsonPrimitive.content))
        for (k in golden["bookmarkKeys"]!!.jsonArray) {
            val a = k.jsonArray
            assertEquals(a[4].jsonPrimitive.content, ItemCodec.bookmarkKey(a[0].jsonPrimitive.content, a[1].jsonPrimitive.content.toInt(), a[2].jsonPrimitive.content, a[3].jsonPrimitive.content.toInt()))
        }
    }
}
