package pk.wantuch.spacebook

import android.content.Context
import androidx.room.Room
import androidx.sqlite.db.SupportSQLiteDatabase
import androidx.sqlite.db.SupportSQLiteOpenHelper
import androidx.sqlite.db.framework.FrameworkSQLiteOpenHelperFactory
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
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
import pk.wantuch.spacebook.data.Prefs
import pk.wantuch.spacebook.data.local.Bookmark
import pk.wantuch.spacebook.data.local.ItemCodec
import pk.wantuch.spacebook.data.local.MIGRATION_1_2
import pk.wantuch.spacebook.data.local.Note
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.local.SpaceBookDb
import pk.wantuch.spacebook.data.remote.DeviceDto
import pk.wantuch.spacebook.data.remote.ItemDto
import pk.wantuch.spacebook.data.remote.ItemGoneDto
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.data.repo.LibraryRepository

/**
 * The phone's bookmarks, notes, highlights, reading position and chosen class (data/repo/LibraryRepository.kt) against a real Room database
 * on the PC: the rules are the website's (js/core/items.js) and the server's (api/lib/items.php). The request shapes it queues are the ones
 * tests/php/items_tests.php and tests/sync/items.js send to the real server.
 */
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [35])
class LibraryRepositoryTest {
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false; encodeDefaults = true }
    private lateinit var db: SpaceBookDb
    private lateinit var prefs: Prefs
    private lateinit var lib: LibraryRepository
    private var changes = 0

    private val student = UserDto(id = 7, name = "Ayesha", whatsapp = "923001234567")
    private val device = DeviceDto("11111111-2222-4333-8444-555555555555", "t".repeat(64))

    @Before fun setUp() = runBlocking {
        val ctx = ApplicationProvider.getApplicationContext<Context>()
        db = Room.inMemoryDatabaseBuilder(ctx, SpaceBookDb::class.java).allowMainThreadQueries().build()
        prefs = Prefs(ctx, json)
        prefs.setSession(null, null); prefs.setSyncOn(false); prefs.setClass("")
        lib = LibraryRepository(ctx, db.items(), db.outbox(), prefs, json)
        lib.onChanged = { changes++ }
        changes = 0
    }

    @After fun tearDown() = db.close()

    private fun signIn(syncOn: Boolean = true) = runBlocking { prefs.setSession(student, device); prefs.setSyncOn(syncOn) }
    private fun bm(page: Int = 3, tab: String = "Lessons") = Bookmark("cls5-math", "cls5", 2, tab, page, "3 Fractions", 1000)
    private fun note(text: String = "Add the numerators", quote: String = "", hl: Boolean = false) = Note("", "cls5-math", "cls5", 2, "Lessons", 3, "3 Fractions", text, quote, hl, 1000)

    @Test fun aBookmarkIsKeptOnThePhoneAtOnceAndToggles() = runBlocking {
        lib.setBookmark(true, bm())
        assertEquals(1, lib.bookmarks().first().size)
        assertTrue(lib.isBookmarked("cls5-math", 2, "Lessons", 3).first())
        assertFalse(lib.isBookmarked("cls5-math", 2, "Lessons", 4).first())
        assertFalse("another tab is another place", lib.isBookmarked("cls5-math", 2, "Exercises", 3).first())
        lib.setBookmark(false, bm())
        assertTrue(lib.bookmarks().first().isEmpty())
        assertFalse(lib.isBookmarked("cls5-math", 2, "Lessons", 3).first())
        assertTrue("every change asks for a sync", changes >= 2)
    }

    @Test fun theTabIsWrittenLikeTheWebsiteWritesIt() {
        assertEquals("Lessons", ItemCodec.cleanTab("📖 Lessons"))
        assertEquals("Summary  Formulas", ItemCodec.cleanTab("📐 Summary & Formulas"))      // like the website: the & goes, both spaces stay
        assertEquals("cls5-math|2|Lessons|3", ItemCodec.bookmarkKey("cls5-math", 2, "📖 Lessons", 3))
        assertEquals(30, ItemCodec.cleanTab("x".repeat(80)).length)
    }

    @Test fun notesAndHighlightsAreForThePageTheyWereMadeOn() = runBlocking {
        val id = lib.saveNote(note())
        lib.saveNote(note(text = "", quote = "common denominator", hl = true))
        lib.saveNote(note("elsewhere").copy(page = 5))
        assertEquals(3, lib.notes().first().size)
        val here = lib.notesFor("cls5-math", 2, "📖 Lessons", 3).first()
        assertEquals(2, here.size)
        assertTrue(here.any { it.id == id && it.text == "Add the numerators" && !it.isHighlight })
        assertTrue(here.any { it.isHighlight && it.quote == "common denominator" && it.text.isEmpty() })
        assertTrue("the id is a uuid the server accepts as a key", Regex("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$").matches(id))
        lib.deleteNote(id)
        assertEquals(2, lib.notes().first().size)
    }

    @Test fun theLastPlaceIsKeptPerSubjectAndTheSameAgainIsNotAChange() = runBlocking {
        val p = ReadingPosition("cls5-math", "cls5", 2, "3 Fractions", 4, 12, 1, "Lessons")
        lib.savePosition(p)
        assertEquals(1, changes)
        lib.savePosition(p.copy(updatedAt = 99))
        assertEquals("the same place again changes nothing", 1, changes)
        lib.savePosition(p.copy(page = 5))
        assertEquals(2, changes)
        val got = lib.position("cls5-math")!!
        assertEquals(5, got.page); assertEquals(12, got.pageCount); assertEquals("Lessons", got.tab); assertEquals("3 Fractions", got.chapterTitle)
        assertNull(lib.position("cls5-eng"))
        assertEquals(listOf("cls5-math"), lib.recentPositions(10).first().map { it.subjectId })
    }

    @Test fun nothingIsQueuedForTheServerUntilSignedInAndTheOwnersSwitchIsOn() = runBlocking {
        lib.setBookmark(true, bm())
        assertEquals("a guest sends nothing", 0, lib.sendPending())
        signIn(syncOn = false)
        assertEquals("the switch is off: nothing is queued", 0, lib.sendPending())
        assertEquals(0, db.outbox().pending(7, 10).size)
        prefs.setSyncOn(true)
        assertEquals("what was saved while signed out is not sent as the account's", 0, db.outbox().pending(7, 10).size)
    }

    @Test fun whatIsQueuedIsExactlyWhatTheServerAccepts() = runBlocking {
        signIn()
        lib.setBookmark(true, bm())
        val nid = lib.saveNote(note(quote = "common denominator", hl = true))
        lib.savePosition(ReadingPosition("cls5-math", "cls5", 2, "3 Fractions", 4, 12, 1, "Lessons"))
        lib.setClass("cls5")
        assertEquals(4, lib.sendPending())
        val ev = db.outbox().pending(7, 50)
        assertEquals(4, ev.size)
        assertTrue(ev.all { it.type == "item.put" && Regex("^[0-9a-f-]{36}$").matches(it.eventId) && it.userId == 7 })
        fun payload(kind: String) = json.parseToJsonElement(ev.first { json.parseToJsonElement(it.payloadJson).let { p -> (p as JsonObject)["kind"].toString() == "\"$kind\"" } }.payloadJson) as JsonObject
        val b = payload("bm")
        assertEquals("\"cls5-math|2|Lessons|3\"", b["key"].toString())
        assertEquals("""{"c":"cls5","s":"cls5-math","ch":2,"p":3,"tb":"Lessons","t":"3 Fractions"}""", b["value"].toString())
        val n = payload("note")
        assertEquals("\"$nid\"", n["key"].toString())
        assertEquals("\"hl\"", (n["value"] as JsonObject)["k"].toString())
        assertEquals("\"common denominator\"", (n["value"] as JsonObject)["q"].toString())
        assertEquals("""{"c":"cls5","ch":2,"p":4,"tb":"Lessons","n":12,"t":"3 Fractions"}""", payload("pos")["value"].toString())
        assertEquals("""{"id":"cls5"}""", payload("pref")["value"].toString())
        assertTrue(ev.all { (json.parseToJsonElement(it.payloadJson) as JsonObject)["at"].toString().toLong() > 0 })
        assertEquals("sent once: nothing more is queued", 0, lib.sendPending())
        lib.setBookmark(false, bm())
        assertEquals(1, lib.sendPending())
        val del = db.outbox().pending(7, 50).last()
        assertEquals("item.del", del.type)
        assertFalse("a delete carries no value", del.payloadJson.contains("\"value\""))
    }

    @Test fun aPositionChangedManyTimesIsQueuedOnceWithTheLatestValue() = runBlocking {
        signIn()
        for (page in 0..9) lib.savePosition(ReadingPosition("cls5-math", "cls5", 2, "3 Fractions", page, 12, 1, "Lessons"))
        assertEquals(1, lib.sendPending())
        assertTrue(db.outbox().pending(7, 10).single().payloadJson.contains("\"p\":9"))
    }

    // ---- the merge rule of js/core/items.js, row by row
    private fun item(kind: String, key: String, value: JsonObject, at: Long) = ItemDto(kind, key, value, at)
    private fun place(page: Int, title: String = "T") = buildJsonObject { put("c", "cls5"); put("s", "cls5-math"); put("ch", 2); put("p", page); put("tb", "Lessons"); put("t", title) }

    @Test fun theLaterTimeWinsAndEqualTimesGoToTheServer() = runBlocking {
        signIn()
        val key = "cls5-math|2|Lessons|3"
        lib.setBookmark(true, bm())                                                         // local, at = now
        val localAt = db.items().get(7, "bm", key)!!.at
        lib.merge(listOf(item("bm", key, place(3, "older server copy"), localAt - 10)), emptyList())
        assertEquals("older remote copy is ignored", "3 Fractions", lib.bookmarks().first().single().title)
        lib.merge(listOf(item("bm", key, place(3, "newer server copy"), localAt + 10)), emptyList())
        assertEquals("newer remote copy wins", "newer server copy", lib.bookmarks().first().single().title)
        lib.merge(listOf(item("bm", "cls5-math|2|Lessons|9", place(9), 5)), emptyList())
        assertEquals("a new one from another device arrives", 2, lib.bookmarks().first().size)
    }

    @Test fun aDeleteFromAnotherDeviceRemovesAndAnOlderSaveCannotBringItBack() = runBlocking {
        signIn()
        val key = "cls5-math|2|Lessons|3"
        lib.merge(listOf(item("bm", key, place(3), 100)), emptyList())
        assertEquals(1, lib.bookmarks().first().size)
        lib.merge(emptyList(), listOf(ItemGoneDto("bm", key, 200)))
        assertTrue(lib.bookmarks().first().isEmpty())
        lib.merge(listOf(item("bm", key, place(3), 150)), emptyList())
        assertTrue("a save older than the delete stays deleted", lib.bookmarks().first().isEmpty())
        lib.merge(listOf(item("bm", key, place(3), 300)), emptyList())
        assertEquals("a save after the delete counts", 1, lib.bookmarks().first().size)
    }

    @Test fun myClassFromTheWebsiteBecomesThePhonesClass() = runBlocking {
        signIn()
        lib.merge(listOf(item("pref", "class", buildJsonObject { put("id", "cls8") }, 50)), emptyList())
        assertEquals("cls8", prefs.state.first().classId)
        lib.setClass("cls6")
        assertEquals("cls6", prefs.state.first().classId)
        assertEquals("cls6", ItemCodec.classOf(json, db.items().get(7, "pref", "class")!!))
    }

    @Test fun kindsThePageKeepsItselfAreNotStoredHere() = runBlocking {
        signIn()
        lib.merge(listOf(item("word", "en:fraction", buildJsonObject { put("s", "l") }, 5), item("gbest", "k", buildJsonObject { put("b", 1) }, 5)), emptyList())
        assertEquals(0, db.items().unsent(7).size)
        assertNull(db.items().get(7, "word", "en:fraction"))
    }

    // ---- the guest rule
    @Test fun whatWasSavedBeforeSigningInIsOfferedAndKeptIfTheAnswerIsNo() = runBlocking {
        lib.setBookmark(true, bm())
        lib.saveNote(note())
        assertEquals(2, lib.guestCount())
        signIn()
        assertTrue("the account starts with nothing of the guest's", lib.bookmarks().first().isEmpty())
        assertEquals("and the guest items wait for the answer", 2, lib.guestCount())
        lib.adoptGuest(7)
        assertEquals(1, lib.bookmarks().first().size); assertEquals(1, lib.notes().first().size)
        assertEquals(0, lib.guestCount())
        assertEquals("adopted items are sent as the account's", 2, lib.sendPending())
    }

    @Test fun signingOutShowsTheGuestsItemsAgainNotTheAccounts() = runBlocking {
        signIn()
        lib.setBookmark(true, bm(page = 1))
        assertEquals(1, lib.bookmarks().first().size)
        prefs.setSession(null, null)
        assertTrue("another person's phone shows none of the account's bookmarks", lib.bookmarks().first().isEmpty())
    }

    // ---- version 1 -> 2: the old tables become items of a guest, nothing is lost
    @Test fun theOldBookmarksNotesAndPlacesSurviveTheUpgradeAsGuestItems() {
        val ctx = ApplicationProvider.getApplicationContext<Context>()
        val name = "migration-test.db"
        ctx.deleteDatabase(name)
        val schema1 = org.json.JSONObject(java.io.File("schemas/pk.wantuch.spacebook.data.local.SpaceBookDb/1.json").readText())
        val entities = schema1.getJSONObject("database").getJSONArray("entities")
        val cb = object : SupportSQLiteOpenHelper.Callback(1) {
            override fun onCreate(db: SupportSQLiteDatabase) {
                for (i in 0 until entities.length()) {
                    val e = entities.getJSONObject(i)
                    db.execSQL(e.getString("createSql").replace("\${TABLE_NAME}", e.getString("tableName")))
                }
                db.execSQL("INSERT INTO bookmarks VALUES ('cls5-math', 'cls5', 2, 3, '3 Fractions', 1111)")
                db.execSQL("INSERT INTO notes (subjectId, classId, chapterIndex, page, title, text, createdAt) VALUES ('cls5-math', 'cls5', 2, 3, '3 Fractions', 'Add the numerators', 2222)")
                db.execSQL("INSERT INTO reading VALUES ('cls5-math', 'cls5', 2, '3 Fractions', 4, 12, 3333)")
                db.execSQL("INSERT INTO reactions VALUES ('card1', 1, 0)")
            }
            override fun onUpgrade(db: SupportSQLiteDatabase, oldVersion: Int, newVersion: Int) {}
        }
        FrameworkSQLiteOpenHelperFactory().create(SupportSQLiteOpenHelper.Configuration.builder(ctx).name(name).callback(cb).build()).writableDatabase.close()

        val upgraded = Room.databaseBuilder(ctx, SpaceBookDb::class.java, name).addMigrations(MIGRATION_1_2).allowMainThreadQueries().build()
        try {
            val l = LibraryRepository(ctx, upgraded.items(), upgraded.outbox(), prefs, json)
            runBlocking {
                prefs.setSession(null, null)
                assertEquals(3, l.guestCount())
                val b = l.bookmarks().first().single()
                assertEquals("cls5-math", b.subjectId); assertEquals(2, b.chapterIndex); assertEquals(3, b.page); assertEquals("3 Fractions", b.title); assertEquals(1111, b.createdAt); assertEquals("", b.tab)
                val n = l.notes().first().single()
                assertEquals("Add the numerators", n.text); assertEquals(2222, n.createdAt)
                assertTrue(Regex("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$").matches(n.id))
                val p = l.position("cls5-math")!!
                assertEquals(4, p.page); assertEquals(12, p.pageCount); assertEquals("3 Fractions", p.chapterTitle)
                assertEquals("their keys are the website's", "cls5-math|2||3", upgraded.items().get(0, "bm", "cls5-math|2||3")?.itemKey)
                assertTrue("the like on a feed card was not touched", upgraded.reactions().all().first().single().liked)
                val tables = mutableListOf<String>()
                upgraded.openHelper.readableDatabase.query("SELECT name FROM sqlite_master WHERE type = 'table'").use { while (it.moveToNext()) tables += it.getString(0) }
                assertFalse("the old tables are gone", tables.any { it == "bookmarks" || it == "notes" || it == "reading" })
            }
        } finally {
            upgraded.close(); ctx.deleteDatabase(name)
        }
    }
}
