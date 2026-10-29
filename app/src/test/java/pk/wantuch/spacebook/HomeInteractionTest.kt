package pk.wantuch.spacebook

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.hasScrollToIndexAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.performScrollToNode
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode
import pk.wantuch.spacebook.data.prep.PrepSnapshot
import pk.wantuch.spacebook.data.prep.ProjectWords
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.ui.home.AccountInfo
import pk.wantuch.spacebook.ui.home.HomeActions
import pk.wantuch.spacebook.ui.home.HomeContent
import pk.wantuch.spacebook.ui.home.TAB_ACCOUNT
import pk.wantuch.spacebook.ui.home.TAB_PROJECT
import pk.wantuch.spacebook.ui.home.TAB_STATS
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme
import java.io.File

/** Taps on the real Home: the tabs, the buttons of the cards, and the delete question for a plan. */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [35], qualifiers = "w411dp-h2100dp-xxhdpi")
class HomeInteractionTest {
    @get:Rule val rule = createComposeRule()

    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }
    private val catalog: Catalog = json.decodeFromString(File("src/main/assets/app_catalog.json").readText())
    private val sample: PrepSnapshot = json.decodeFromString(File("src/test/resources/prep_sample.json").readText())   // plans: p2 (Weekend revision), then p1
    private val project: ProjectWords = ProjectWords.parse(File("src/main/assets/site/js/word_stats_summary.js").readText())!!

    private fun show(actions: HomeActions, tab: Int = TAB_STATS, onTab: (Int) -> Unit = {}, prep: PrepSnapshot = sample, account: AccountInfo = AccountInfo()) {
        rule.setContent {
            SpaceBookTheme(themeMode = 1, fontScalePercent = 100) {
                HomeContent(tab, onTab, prep, project, catalog, account, actions, nowMillis = 1_792_735_000_000L)
            }
        }
    }

    @Test fun deletingAPlanAsksFirstAndThenDeletesThatPlanOnly() {
        val deleted = mutableListOf<String>()
        show(HomeActions(deletePlan = { deleted += it }))
        rule.onAllNodesWithText("Delete plan")[0].performClick()
        rule.onNodeWithText("Delete this plan?").assertIsDisplayed()
        assertTrue("nothing is deleted before the student says yes", deleted.isEmpty())

        rule.onNodeWithText("Keep it").performClick()
        rule.onNodeWithText("Delete this plan?").assertDoesNotExist()
        assertTrue(deleted.isEmpty())

        rule.onAllNodesWithText("Delete plan")[1].performClick()                  // the second card: Class 6 term 1
        rule.onNodeWithText("Delete").performClick()
        assertEquals(listOf("p1"), deleted)
        rule.onNodeWithText("Delete this plan?").assertDoesNotExist()
    }

    @Test fun resettingTheVocabularyAsksFirstAndThenResetsOnce() {
        var reset = 0
        assertTrue("the sample has marked words", sample.words.total > 0)
        show(HomeActions(resetWords = { reset++ }))
        rule.onNode(hasScrollToIndexAction()).performScrollToNode(hasText("↺ Reset"))        // the vocabulary card is the last item of the list
        rule.onNodeWithText("↺ Reset").performClick()
        rule.onNodeWithText("Reset your vocabulary?").assertIsDisplayed()
        assertEquals("nothing is cleared before the student says yes", 0, reset)

        rule.onNodeWithText("Keep them").performClick()
        rule.onNodeWithText("Reset your vocabulary?").assertDoesNotExist()
        assertEquals(0, reset)

        rule.onNodeWithText("↺ Reset").performClick()
        rule.onNodeWithText("Reset").performClick()
        assertEquals(1, reset)
        rule.onNodeWithText("Reset your vocabulary?").assertDoesNotExist()
    }

    @Test fun noMarkedWordsMeansNothingToReset() {
        show(HomeActions(), prep = sample.copy(words = pk.wantuch.spacebook.data.prep.WordsDto()))
        assertTrue(rule.onAllNodesWithText("↺ Reset").fetchSemanticsNodes().isEmpty())
    }

    @Test fun everyPlanCardHasADeleteButton() {
        show(HomeActions())
        assertEquals(sample.plans.size, rule.onAllNodesWithText("Delete plan").fetchSemanticsNodes().size)
    }

    @Test fun everyPlanCardSaysHowManyTasksWereLearntAndChecked() {
        show(HomeActions())
        rule.onNodeWithText("🧠 1 of 8 tasks learnt and checked · 1 marked by you", useUnmergedTree = true).assertExists()     // Class 6 term 1: one passed the check, one was ticked by hand
        rule.onNodeWithText("🧠 0 of 1 task learnt and checked", useUnmergedTree = true).assertExists()                          // Weekend revision: nothing yet
    }

    @Test fun noPlansMeansNoDeleteButtonAndNoQuestion() {
        show(HomeActions(), prep = sample.copy(plans = emptyList()))
        assertTrue(rule.onAllNodesWithText("Delete plan").fetchSemanticsNodes().isEmpty())
    }

    @Test fun cardButtonsOpenThePracticeAndTheStatisticsOfThatTestOrPlan() {
        val opened = mutableListOf<String>()
        show(HomeActions(openTestPrep = { t, tab -> opened += "$t/$tab" }, openPlan = { opened += "plan/$it" }))
        rule.onAllNodesWithText("Practice")[1].performClick()                      // sst-gen is the most recent test, PST the next
        rule.onAllNodesWithText("Statistics")[2].performClick()                    // [0] is the heading of the overview, [1] SST General
        rule.onAllNodesWithText("Practise")[0].performClick()                      // Weekend revision has a task today
        assertEquals(listOf("pst/practice", "pst/stats", "plan/p2"), opened)
    }

    @Test fun theTabsTellTheScreenWhichOneWasTapped() {
        val tabs = mutableListOf<Int>()
        show(HomeActions(), onTab = { tabs += it })
        rule.onNodeWithContentDescription("Project Stats").performClick()          // the tabs are icons: each is found by its name
        rule.onNodeWithContentDescription("My Account").performClick()
        rule.onNodeWithContentDescription("My Stats").performClick()
        assertEquals(listOf(TAB_PROJECT, TAB_ACCOUNT, TAB_STATS), tabs)
    }

    @Test fun theAccountTabLetsAGuestSignInAndOpenTheProfile() {
        val went = mutableListOf<String>()
        show(HomeActions(signIn = { went += "signIn" }, openProfile = { went += "profile" }), tab = TAB_ACCOUNT)
        rule.onNodeWithText("Guest").assertIsDisplayed()
        rule.onNodeWithText("Sign in").performClick()
        rule.onNodeWithText("Profile & settings").performClick()
        rule.onNodeWithText("Free for everyone").assertIsDisplayed()       // the plans card (the old static Free / Premium cards are gone)
        assertEquals(listOf("signIn", "profile"), went)
    }

    @Test fun thePlansCardOpensTheWebsitePlansWindow() {
        val went = mutableListOf<String>()
        show(HomeActions(openPlans = { went += "plans" }), tab = TAB_ACCOUNT)
        rule.onNodeWithText("See plans").performClick()
        assertEquals(listOf("plans"), went)
    }

    @Test fun aSignedInStudentHasNoSignInButton() {
        show(HomeActions(), tab = TAB_ACCOUNT, account = AccountInfo(name = "Ayesha", subtitle = "Student", signedIn = true))
        assertTrue(rule.onAllNodesWithText("Sign in").fetchSemanticsNodes().isEmpty())
        rule.onNodeWithText("Ayesha").assertIsDisplayed()
    }
}
