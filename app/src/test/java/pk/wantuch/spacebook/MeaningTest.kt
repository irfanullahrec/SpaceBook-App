package pk.wantuch.spacebook

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.ui.reader.Lang
import pk.wantuch.spacebook.ui.web.MeaningDto
import pk.wantuch.spacebook.ui.web.MeaningUpdateDto
import pk.wantuch.spacebook.ui.web.apply
import pk.wantuch.spacebook.ui.web.toState

/** The messages assets/reader_bridge.js sends when a sentence is tapped or a word is held, and how the app reads them. */
class MeaningTest {
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false }

    // these two strings are what the page script produced for the website's Class 5 Maths page (checked in a browser)
    private val sentence = """{"id":1,"kind":"sentence","text":"By the end of this unit you will be able to:","src":"en","rows":[{"lang":"en","text":"By the end of this unit you will be able to:","pending":false},{"lang":"ur","text":"اس اکائی کے آخر تک آپ اس قابل ہو جائیں گے کہ:","pending":false},{"lang":"ps","text":"د دې څپرکي په پای کې به تاسو وکولی شئ چې:","pending":false}]}"""
    private val word = """{"id":2,"kind":"word","text":"numbers","src":"en","rows":[{"lang":"en","text":"numbers","pending":false},{"lang":"ur","text":"اعداد","pending":false},{"lang":"ps","text":"عددونه","pending":false},{"lang":"ar","text":"","pending":true}]}"""

    @Test fun sentenceMessageBecomesAPopupState() {
        val m = json.decodeFromString<MeaningDto>(sentence).toState()
        assertFalse(m.isWord)
        assertEquals("en", m.src)
        assertEquals(listOf("en", "ur", "ps"), m.rows.map { it.lang })
        assertTrue(m.rows.none { it.pending })
    }

    @Test fun wordMessageWaitsForArabicThenFillsItIn() {
        val m = json.decodeFromString<MeaningDto>(word).toState()
        assertTrue(m.isWord)
        assertTrue(m.rows.first { it.lang == "ar" }.pending)
        val done = m.apply(json.decodeFromString<MeaningUpdateDto>("""{"id":2,"lang":"ar","text":"أعداد","approx":false}"""))
        val ar = done.rows.first { it.lang == "ar" }
        assertFalse(ar.pending)
        assertEquals("أعداد", ar.text)
        assertEquals("the others are untouched", "اعداد", done.rows.first { it.lang == "ur" }.text)
    }

    @Test fun anUpdateForAnotherPopupIsIgnored() {
        val m = json.decodeFromString<MeaningDto>(word).toState()
        val same = m.apply(MeaningUpdateDto(id = 99, lang = "ar", text = "x"))
        assertEquals(m, same)
    }

    @Test fun approximateMeaningsAreMarked() {
        val m = json.decodeFromString<MeaningDto>(word).toState()
        val done = m.apply(MeaningUpdateDto(2, "ar", "أعداد", approx = true))
        assertTrue(done.rows.first { it.lang == "ar" }.approx)
    }

    @Test fun languageIsGuessedFromTheLettersToChooseAVoice() {
        assertEquals("en", Lang.guess("numbers"))
        assertEquals("ur", Lang.guess("اس اکائی کے آخر تک"))
        assertEquals("ps", Lang.guess("د دې څپرکي په پای کې"))
    }

    @Test fun rightToLeftLanguages() {
        assertTrue(Lang.rtl("ur") && Lang.rtl("ps") && Lang.rtl("ar"))
        assertFalse(Lang.rtl("en"))
        assertEquals("اردو", Lang.label("ur"))
        assertEquals("Pashto", Lang.name("ps"))
    }
}
