package pk.wantuch.spacebook.screenshots

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onRoot
import com.github.takahirom.roborazzi.captureRoboImage
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
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
import pk.wantuch.spacebook.data.remote.FeedAuthorDto
import pk.wantuch.spacebook.data.remote.FeedPostDto
import pk.wantuch.spacebook.data.remote.FeedSharedDto
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.ui.feed.CommentsState
import pk.wantuch.spacebook.ui.feed.FeedCallbacks
import pk.wantuch.spacebook.ui.feed.FeedContent
import pk.wantuch.spacebook.ui.feed.FeedState
import pk.wantuch.spacebook.ui.home.AccountInfo
import pk.wantuch.spacebook.ui.home.HomeActions
import pk.wantuch.spacebook.ui.home.HomeContent
import pk.wantuch.spacebook.ui.home.TAB_FEED
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme
import java.io.File

/**
 * Draws the real Home with its four icon tabs and the News Feed open, the way a phone shows it (pictures in app/build/screenshots/):
 * light and dark, a signed-out student, the first load, an empty feed. Fonts and emoji are the test machine's, not a phone's.
 */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [35], qualifiers = "w411dp-h2100dp-xxhdpi")
class FeedScreenshotTest {
    @get:Rule val rule = createComposeRule()

    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }
    private val catalog: Catalog = json.decodeFromString(File("src/main/assets/app_catalog.json").readText())
    private val sample: PrepSnapshot = json.decodeFromString(File("src/test/resources/prep_sample.json").readText())
    private val project: ProjectWords = ProjectWords.parse(File("src/main/assets/site/js/word_stats_summary.js").readText())!!
    private val contract: JsonObject = json.parseToJsonElement(File("src/test/resources/parity/feed_contract.json").readText()).jsonObject
    private fun card(k: String) = contract["cards"]!!.jsonObject[k]!!.jsonObject

    private val now = 1_793_000_000_000L
    private val ali = FeedAuthorDto("Ali K.", "student", "A", 231)
    private val sara = FeedAuthorDto("Sara Y.", "student", "S", 45)
    private val nasreen = FeedAuthorDto("Mrs N.", "teacher", "M", 43)
    private val user = UserDto(id = 1, name = "Ayesha Khan", fatherName = "x", userType = "student", whatsapp = "923001234567")

    private fun p(id: Long, kind: String = "text", body: String, author: FeedAuthorDto = ali, mine: Boolean = false, card: JsonObject? = null, likes: Int = 0, comments: Int = 0, shares: Int = 0, liked: Boolean = false, shared: FeedSharedDto? = null, minutes: Long = id) =
        FeedPostDto(id, kind, author, mine, body, card, likes, comments, shares, liked, now - minutes * 60_000, shared)

    private val posts = listOf(
        p(1, body = "Revise a little every day.", author = nasreen, likes = 24, comments = 3, shares = 2, minutes = 4),
        p(2, "question", "What is the chemical formula of water, and why is it a polar molecule?", sara, card = card("question"), likes = 5, comments = 3, minutes = 38),
        p(3, "stats", "Seven days of practice, my best week yet!", ali, card = card("stats"), liked = true, likes = 12, comments = 2, minutes = 190),
        p(4, "progress", "", ali, card = card("progress"), likes = 4, minutes = 400),
        p(5, "plan", "My plan for the Class 9 exams. Join me!", sara, card = card("plan"), likes = 8, shares = 1, comments = 1, minutes = 1500),
        p(6, body = "Which chapter of Biology is the hardest, and why? I find the nervous system chapter really difficult.\n\nAny tips for remembering the parts of the brain? I have a test on Monday and I keep mixing them up.\n\nThank you!", author = ali, mine = false, likes = 2, comments = 9, minutes = 2900),
        p(7, "share", "So true!", sara, mine = false, shared = FeedSharedDto(1, "text", nasreen, "Revise a little every day.", null, now - 4 * 60_000), likes = 1, minutes = 5000),
        p(8, body = "کل کا ٹیسٹ بہت اچھا ہوا، سب کو شکریہ", author = sara, likes = 6, minutes = 9000),
    )

    private fun render(name: String, dark: Boolean, state: FeedState = FeedState(posts = posts, loading = false, end = true), user: UserDto? = this.user, comments: CommentsState = CommentsState()) {
        rule.setContent {
            SpaceBookTheme(themeMode = if (dark) 2 else 1, fontScalePercent = 100) {
                Surface(color = MaterialTheme.colorScheme.background) {
                    HomeContent(
                        TAB_FEED, {}, sample, project, catalog, AccountInfo(), HomeActions(), nowMillis = now,
                        feedContent = { FeedContent(state, comments, user, sample, 120, catalog, "cls6", SnackbarHostState(), FeedCallbacks(), nowMillis = now) },
                    )
                }
            }
        }
        rule.onRoot().captureRoboImage("build/screenshots/$name.png")
        assertTrue(File("build/screenshots/$name.png").length() > 10_000)
    }

    @Test fun feedLight() = render("feed-light", dark = false)
    @Test fun feedDark() = render("feed-dark", dark = true)
    @Test fun feedSignedOut() = render("feed-signed-out", dark = false, state = FeedState(loading = false), user = null)
    @Test fun feedLoading() = render("feed-loading", dark = false, state = FeedState(loading = true))
    @Test fun feedEmpty() = render("feed-empty", dark = false, state = FeedState(loading = false, end = true))
    @Test fun feedOffline() = render("feed-offline", dark = false, state = FeedState(posts = posts.take(3), loading = false, offline = true))
    @Test fun feedCouldNotLoad() = render("feed-error", dark = false, state = FeedState(loading = false, error = "You are offline. Try again when you are connected."))

}
