package pk.wantuch.spacebook

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.ui.library.BoardChoiceDialog
import pk.wantuch.spacebook.ui.library.LibraryContent
import pk.wantuch.spacebook.ui.library.SeriesChoiceDialog
import pk.wantuch.spacebook.ui.library.boardFor
import pk.wantuch.spacebook.ui.library.boardSaved
import pk.wantuch.spacebook.ui.library.governmentBooks
import pk.wantuch.spacebook.ui.library.isBoardClass
import pk.wantuch.spacebook.ui.library.seriesBooks
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme

/** Government / Private / Series: the choice a student makes for Classes 1-8, as on the website (js/sb_private_books.js). */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [35], qualifiers = "w411dp-h900dp-xxhdpi")
class BoardChoiceTest {
    @get:Rule val rule = createComposeRule()

    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }
    private val catalog: Catalog = json.decodeFromString(
        """{"schema":"spacebook.app-catalog/1","classes":[
          {"id":"cls1","name":"Class 1","subjects":[
            {"id":"cls1-math","name":"Mathematics","chapters":[{"t":"1 Numbers"},{"t":"2 Add"}]},
            {"id":"cls1-eng","name":"English","chapters":[{"t":"1 Hello"}]},
            {"id":"cls1-mun-math","name":"Kanz Mathematics","series":"munawar","chapters":[{"t":"1 Whole Numbers"},{"t":"2 Number Operations"},{"t":"3 Money"}]},
            {"id":"cls1-mun-eng","name":"Kanz English","series":"munawar","chapters":[{"t":"1 Reading"}]}]},
          {"id":"cls5","name":"Class 5","subjects":[{"id":"cls5-math","name":"Mathematics","chapters":[{"t":"1 Numbers"}]}]},
          {"id":"cls9","name":"Class 9","subjects":[{"id":"cls9-math","name":"Mathematics"}]}],
         "series":{"munawar":{"name":"Munawar","nameUrdu":"منور","line":"Kanz Series","publisher":"Munawar Publisher","classes":[1,2,3,4]}}}""",
    )

    @Test fun anOldCatalogWithoutSeriesStillReads() {
        val old: Catalog = json.decodeFromString("""{"schema":"x","classes":[{"id":"cls1","name":"Class 1","subjects":[{"id":"cls1-math","name":"Mathematics"}]}]}""")
        assertTrue(old.seriesIds().isEmpty())
        assertEquals("", old.subject("cls1-math")!!.series)
        assertEquals(1, old.cls("cls1")!!.governmentBooks().size)
    }

    @Test fun governmentAndSeriesBooksAreSeparate() {
        val c1 = catalog.cls("cls1")!!
        assertEquals(listOf("cls1-math", "cls1-eng"), c1.governmentBooks().map { it.id })
        assertEquals(listOf("cls1-mun-math", "cls1-mun-eng"), c1.seriesBooks("munawar").map { it.id })
        assertTrue(catalog.cls("cls5")!!.seriesBooks("munawar").isEmpty())
        assertEquals(listOf("munawar"), catalog.seriesIds())
    }

    @Test fun onlyClasses1To8Ask() {
        assertTrue((1..8).all { isBoardClass("cls$it") })
        assertFalse(isBoardClass("cls9"))
        assertFalse(isBoardClass("cls12"))
    }

    @Test fun theChoiceIsKeptPerClass() {
        assertEquals("munawar", boardFor(boardSaved("cls1", "munawar"), "cls1"))
        assertEquals("", boardFor(boardSaved("cls1", "munawar"), "cls4"))   // another class starts on Government
        assertEquals("", boardFor(boardSaved("cls1", ""), "cls1"))
    }

    private fun themed(content: @androidx.compose.runtime.Composable () -> Unit) = rule.setContent {
        SpaceBookTheme(themeMode = 1, fontScalePercent = 100) { Surface(color = MaterialTheme.colorScheme.background) { content() } }
    }

    @Test fun theFirstModalHasTwoCardsWithTheClassNumbers() {
        var picked = ""
        themed { BoardChoiceDialog(catalog.cls("cls1")!!, catalog, onGovernment = { picked = "gov" }, onPrivate = { picked = "priv" }, onDismiss = {}) }
        rule.onNodeWithText("Which books do you want to open?").assertIsDisplayed()
        rule.onNodeWithTag("board_government").assertIsDisplayed()
        rule.onNodeWithTag("board_private").assertIsDisplayed()
        rule.onNodeWithTag("board_private").performClick()
        assertEquals("priv", picked)
        rule.onNodeWithTag("board_government").performClick()
        assertEquals("gov", picked)
    }

    @Test fun theSecondModalListsTheSeriesAndItsBooks() {
        var series = ""
        themed { SeriesChoiceDialog(catalog.cls("cls1")!!, catalog, onSeries = { series = it }, onBack = {}, onDismiss = {}) }
        rule.onNodeWithText("Choose a series").assertIsDisplayed()
        rule.onNodeWithText("Munawar").assertIsDisplayed()
        rule.onNodeWithText("Mathematics · English").assertIsDisplayed()     // the "Kanz " prefix is dropped in the book list
        rule.onNodeWithTag("series_munawar").performClick()
        assertEquals("munawar", series)
    }

    @Test fun aClassWithoutThatSeriesSaysSoAndStillOpens() {
        var series = ""
        themed { SeriesChoiceDialog(catalog.cls("cls5")!!, catalog, onSeries = { series = it }, onBack = {}, onDismiss = {}) }
        rule.onNodeWithText("See what is coming", substring = true).assertIsDisplayed()      // the row reads "See what is coming  →"
        rule.onNodeWithTag("series_munawar").performClick()
        assertEquals("munawar", series)
    }

    @Test fun theLibraryShowsOnlyTheChosenBoardsBooks() {
        themed { LibraryContent(catalog.classes, "cls1", emptyMap(), {}, {}, {}, series = "munawar", seriesName = "Munawar") }
        rule.onNodeWithText("Kanz Mathematics").assertIsDisplayed()
        rule.onNodeWithText("Kanz English").assertIsDisplayed()
        rule.onNodeWithText("🏫 Private · Munawar").assertIsDisplayed()
    }

    @Test fun theLibraryOnGovernmentHidesThePrivateBooks() {
        themed { LibraryContent(catalog.classes, "cls1", emptyMap(), {}, {}, {}) }
        rule.onNodeWithText("Mathematics").assertIsDisplayed()
        rule.onNodeWithText("🏛️ Government books").assertIsDisplayed()
        assertTrue(rule.onAllNodesWithTextCount("Kanz Mathematics") == 0)
    }

    private fun androidx.compose.ui.test.junit4.ComposeContentTestRule.onAllNodesWithTextCount(t: String) =
        onAllNodes(androidx.compose.ui.test.hasText(t)).fetchSemanticsNodes().size
}
