package pk.wantuch.spacebook.screenshots

import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onRoot
import com.github.takahirom.roborazzi.captureRoboImage
import kotlinx.serialization.json.Json
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

/**
 * Draws the real Home screen on the PC (no phone needed): its three tabs (My Stats, Project Stats, My Account), for a student with
 * several tests and plans started (read from the same JSON the JavaScript side makes), one with only a plan, one with nothing, and
 * one with nothing read yet. Pictures are written to app/build/screenshots/. Fonts and emoji are the test machine's, not a phone's.
 */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [35], qualifiers = "w411dp-h2100dp-xxhdpi")
class HomeScreenshotTest {
    @get:Rule val rule = createComposeRule()

    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }
    private val catalog: Catalog = json.decodeFromString(File("src/main/assets/app_catalog.json").readText())
    private val sample: PrepSnapshot = json.decodeFromString(File("src/test/resources/prep_sample.json").readText())
    private val project: ProjectWords = ProjectWords.parse(File("src/main/assets/site/js/word_stats_summary.js").readText())!!
    private val now = 1_792_735_000_000L                                    // the moment the sample was made

    private val guest = AccountInfo()
    private val student = AccountInfo(
        name = "Ayesha Khan", subtitle = "Student · 0300 1234567", signedIn = true, planId = "free", coins = 1280,
        previewEnds = now + 24 * 86_400_000L, previewDaysLeft = 24,
    )

    private fun render(name: String, dark: Boolean, prep: PrepSnapshot?, tab: Int = TAB_STATS, account: AccountInfo = student) {
        rule.setContent {
            SpaceBookTheme(themeMode = if (dark) 2 else 1, fontScalePercent = 100) {
                androidx.compose.material3.Surface(color = androidx.compose.material3.MaterialTheme.colorScheme.background) {
                    HomeContent(tab, {}, prep, project, catalog, account, HomeActions(), nowMillis = now)
                }
            }
        }
        rule.onRoot().captureRoboImage("build/screenshots/$name.png")
        assertTrue(File("build/screenshots/$name.png").length() > 10_000)
    }

    @Test fun homeLight() = render("home-light", dark = false, prep = sample)
    @Test fun homeDark() = render("home-dark", dark = true, prep = sample)
    @Test fun homeOnlyPlans() = render("home-plans-only", dark = false, prep = sample.copy(tests = sample.tests.copy(tests = emptyList(), recent = emptyList())))
    @Test fun homeNothingStarted() = render("home-empty", dark = false, prep = PrepSnapshot(words = sample.words))       // no test, no plan, but some words marked
    @Test fun homeLoading() = render("home-loading", dark = false, prep = null)

    @Test fun projectStats() = render("home-project-stats", dark = false, prep = sample, tab = TAB_PROJECT)
    @Test fun projectStatsDark() = render("home-project-stats-dark", dark = true, prep = sample, tab = TAB_PROJECT)
    @Test fun accountStudent() = render("home-account", dark = false, prep = sample, tab = TAB_ACCOUNT)
    @Test fun accountStudentDark() = render("home-account-dark", dark = true, prep = sample, tab = TAB_ACCOUNT)
    @Test fun accountGuest() = render("home-account-guest", dark = false, prep = PrepSnapshot(), tab = TAB_ACCOUNT, account = guest)
}
