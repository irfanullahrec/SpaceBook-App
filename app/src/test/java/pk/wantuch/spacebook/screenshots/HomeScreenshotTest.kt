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
import pk.wantuch.spacebook.data.local.Reaction
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.play.PlayState
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.ui.home.FeedPost
import pk.wantuch.spacebook.ui.home.HomeActions
import pk.wantuch.spacebook.ui.home.HomeContent
import pk.wantuch.spacebook.ui.home.buildFeed
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme
import java.io.File

/**
 * Draws the real Home screen on the PC (no phone needed) with the real bundled catalog, so the look can be checked and
 * compared between versions. Pictures are written to app/build/screenshots/.
 * Fonts and emoji are the test machine's, not a phone's: use these for layout, spacing and colour, not for final type.
 */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [35], qualifiers = "w411dp-h1700dp-xxhdpi")
class HomeScreenshotTest {
    @get:Rule val rule = createComposeRule()

    private val json = Json { ignoreUnknownKeys = true }
    private val catalog: Catalog = json.decodeFromString(File("src/main/assets/app_catalog.json").readText())
    private val actions = HomeActions({ _, _, _ -> }, {}, {}, {}, {}, {}, {})

    private fun render(name: String, dark: Boolean, signedIn: Boolean, liked: Boolean, play: PlayState) {
        val cls = catalog.cls("cls5")!!
        val reading = listOf(ReadingPosition("cls5-math", "cls5", 1, cls.subjects.first { it.id == "cls5-math" }.chapters[1].t, 4, 9, 1L))
        val feed = buildFeed(catalog, "cls5", reading, daySeed = 20_000)
        val reactions = if (liked) feed.filterIsInstance<FeedPost.Chapter>().take(1).associate { it.id to Reaction(it.id, liked = true, saved = true) } else emptyMap()
        rule.setContent {
            SpaceBookTheme(themeMode = if (dark) 2 else 1, fontScalePercent = 100) {
              androidx.compose.material3.Surface(color = androidx.compose.material3.MaterialTheme.colorScheme.background) {
                HomeContent(
                    coins = 128, userName = if (signedIn) "Ayesha Khan" else null, allClasses = catalog.classes, firstRun = false, cls = cls, feed = feed,
                    reactions = reactions, play = play, today = TODAY, greeting = "Good evening", chestReward = null, actions = actions,
                    onPickClass = {}, onLike = {}, onSave = {}, onShare = {}, onOpenChest = {}, onCloseChest = {},
                )
              }
            }
        }
        rule.onRoot().captureRoboImage("build/screenshots/$name.png")
        assertTrue(File("build/screenshots/$name.png").length() > 10_000)
    }

    private val TODAY = 20_000
    /** a student part-way through the day: 4-day streak, 3 of 5 answers, lesson read, chest still closed */
    private val busy = PlayState(xp = 320, streak = 4, bestStreak = 4, lastActiveDay = TODAY, countDay = TODAY, answeredToday = 3, correctToday = 2, lessonDay = TODAY,
        totalAnswered = 40, totalCorrect = 30, chests = 2)

    @Test fun homeLight() = render("home-light", dark = false, signedIn = true, liked = true, play = busy)
    @Test fun homeDark() = render("home-dark", dark = true, signedIn = false, liked = false, play = PlayState())
}
