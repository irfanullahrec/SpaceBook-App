package pk.wantuch.spacebook

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.data.prep.GrammarSummary
import java.io.File

/** Home's "Grammar Stats" card reads the website's content/grammar/index.json (bundled as assets/site/content/grammar/index.json). */
class GrammarSummaryTest {
    private val text = File("src/main/assets/site/content/grammar/index.json").readText()

    @Test fun theBundledIndexReadsIntoTheModel() {
        val g = GrammarSummary.parse(text)
        assertNotNull(g)
        assertEquals(listOf("en", "ur", "ps", "ar"), g!!.ordered().map { it.first })
        val en = g.langs.getValue("en")
        assertEquals("English", en.name)
        assertTrue("English has the most topics", en.total.topics >= 30 && en.total.topics > g.langs.getValue("ur").total.topics)
        assertTrue(en.total.lessons >= 200 && en.total.exercises >= 2000)
        assertTrue("Arabic is small and honest", g.langs.getValue("ar").total.lessons < 50)
        assertEquals("اردو", g.langs.getValue("ur").native)
    }

    @Test fun aSmallFileAndABrokenOne() {
        val g = GrammarSummary.parse("""{"schema":"x","langs":{"ps":{"name":"Pashto","native":"پښتو","total":{"topics":2,"lessons":3,"exercises":4},"topics":[]}}}""")
        assertEquals(1, g!!.langs.size)
        assertEquals(3, g.langs.getValue("ps").total.lessons)
        assertNull(GrammarSummary.parse("not json"))
        assertTrue(GrammarSummary.parse("{}")!!.langs.isEmpty())
    }
}
