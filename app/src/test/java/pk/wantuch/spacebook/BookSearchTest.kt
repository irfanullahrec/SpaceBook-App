package pk.wantuch.spacebook

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.data.search.BookHit

/** What the website's search module hands to the app (assets/search_bridge.js; tools/parity/app_pages.js runs the JavaScript half in Chrome). */
class BookSearchTest {
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false; encodeDefaults = true }

    @Test fun theWebsitesAnswerIsReadWithTitleHitsAndScore() {
        val raw = """[{"id":"cls5-math","chapter":2,"score":4.58,"hits":14,"title":"3 Fractions کسور"},{"id":"cls5-eng","chapter":0,"score":1.58,"hits":2,"title":""}]"""
        val hits = json.decodeFromString<List<BookHit>>(raw)
        assertEquals(2, hits.size)
        assertEquals("cls5-math", hits[0].id); assertEquals(2, hits[0].chapter); assertEquals(14, hits[0].hits); assertEquals("3 Fractions کسور", hits[0].title)
        assertTrue(hits[0].score > hits[1].score)
    }

    @Test fun nothingFoundIsAnEmptyList() {
        assertEquals(emptyList<BookHit>(), json.decodeFromString<List<BookHit>>("[]"))
    }

    @Test fun aFieldTheWebsiteAddsLaterDoesNotBreakTheApp() {
        val hits = json.decodeFromString<List<BookHit>>("""[{"id":"x","chapter":1,"title":"t","hits":1,"score":1.0,"snippet":"later"}]""")
        assertEquals(1, hits.size)
    }
}
