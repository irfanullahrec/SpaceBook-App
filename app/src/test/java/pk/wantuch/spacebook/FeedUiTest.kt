package pk.wantuch.spacebook

import androidx.compose.material3.SnackbarHostState
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsSelected
import androidx.compose.ui.test.hasContentDescription
import androidx.compose.ui.test.hasScrollToIndexAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onAllNodesWithContentDescription
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollToNode
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
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
import pk.wantuch.spacebook.data.remote.FeedAuthorDto
import pk.wantuch.spacebook.data.remote.FeedPostDto
import pk.wantuch.spacebook.data.remote.FeedSharedDto
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.data.repo.FeedFilter
import pk.wantuch.spacebook.ui.feed.CommentsState
import pk.wantuch.spacebook.ui.feed.FeedCallbacks
import pk.wantuch.spacebook.ui.feed.FeedContent
import pk.wantuch.spacebook.ui.feed.FeedState
import pk.wantuch.spacebook.ui.home.AccountInfo
import pk.wantuch.spacebook.ui.home.HOME_TABS
import pk.wantuch.spacebook.ui.home.HomeActions
import pk.wantuch.spacebook.ui.home.HomeContent
import pk.wantuch.spacebook.ui.home.TAB_ACCOUNT
import pk.wantuch.spacebook.ui.home.TAB_FEED
import pk.wantuch.spacebook.ui.home.TAB_PROJECT
import pk.wantuch.spacebook.ui.home.TAB_STATS
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme
import java.io.File

/** The real Home with its four icon tabs and the real News Feed page, tapped like a student does (no phone needed). */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [35], qualifiers = "w411dp-h2100dp-xxhdpi")
class FeedUiTest {
    @get:Rule val rule = createComposeRule()

    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }
    private val catalog: Catalog = json.decodeFromString(File("src/main/assets/app_catalog.json").readText())
    private val sample: PrepSnapshot = json.decodeFromString(File("src/test/resources/prep_sample.json").readText())
    private val project: ProjectWords = ProjectWords.parse(File("src/main/assets/site/js/word_stats_summary.js").readText())!!
    private val contract: JsonObject = json.parseToJsonElement(File("src/test/resources/parity/feed_contract.json").readText()).jsonObject
    private fun card(k: String) = contract["cards"]!!.jsonObject[k]!!.jsonObject

    private val now = 1_793_000_000_000L
    private val ali = FeedAuthorDto("Ali K.", "student", "A", 231)
    private val nasreen = FeedAuthorDto("Mrs N.", "teacher", "M", 43)
    private val user = UserDto(id = 1, name = "Ayesha Khan", fatherName = "Secret", userType = "student", whatsapp = "923001234567")

    private fun p(id: Long, kind: String = "text", body: String = "Post $id", author: FeedAuthorDto = ali, mine: Boolean = false, card: JsonObject? = null, likes: Int = 0, comments: Int = 0, shares: Int = 0, liked: Boolean = false, shared: FeedSharedDto? = null) =
        FeedPostDto(id, kind, author, mine, body, card, likes, comments, shares, liked, now - id * 60_000, shared)

    private val posts = listOf(
        p(1, body = "Which chapter of Biology is the hardest, and why? I find the nervous system chapter difficult.\n\nAny tips?", likes = 12, comments = 4, shares = 1),
        p(2, "question", "What is the chemical formula of water?", card = card("question")),
        p(3, "stats", "Seven days of practice", card = card("stats"), liked = true, likes = 3),
        p(4, "progress", "", card = card("progress")),
        p(5, "plan", "My plan for the exams", card = card("plan"), author = nasreen),
        p(6, body = "Revise a little every day.", author = nasreen, mine = false),
        p(7, "share", "Very true!", mine = true, shared = FeedSharedDto(6, "text", nasreen, "Revise a little every day.", null, now - 600_000)),
        p(8, "share", "Gone", mine = true, shared = null),
    )

    private fun showHome(tab: Int, onTab: (Int) -> Unit = {}, feed: @androidx.compose.runtime.Composable () -> Unit = {}) {
        rule.setContent {
            SpaceBookTheme(themeMode = 1, fontScalePercent = 100) {
                HomeContent(tab, onTab, sample, project, catalog, AccountInfo(), HomeActions(), nowMillis = now, feedContent = feed)
            }
        }
    }

    private fun showFeed(state: FeedState = FeedState(posts = posts, loading = false, end = true), user: UserDto? = this.user, cb: FeedCallbacks = FeedCallbacks(), comments: CommentsState = CommentsState()) {
        rule.setContent {
            SpaceBookTheme(themeMode = 1, fontScalePercent = 100) {
                androidx.compose.material3.Surface(color = androidx.compose.material3.MaterialTheme.colorScheme.background) {
                    FeedContent(state, comments, user, sample, 120, catalog, "cls6", SnackbarHostState(), cb, nowMillis = now)
                }
            }
        }
    }

    // ---------------------------------------------------------------- the four icon tabs

    @Test fun homeHasFourIconTabsAndTheNewsFeedIsTheFirstOne() {
        assertEquals(listOf("News Feed", "My Stats", "Project Stats", "My Account"), HOME_TABS.map { it.label })
        assertEquals("the News Feed opens first", 0, TAB_FEED)
        assertEquals(listOf(TAB_FEED, TAB_STATS, TAB_PROJECT, TAB_ACCOUNT), listOf(0, 1, 2, 3))
    }

    @Test fun theTabsAreIconsOnlyButEveryOneIsNamedForTheScreenReader() {
        showHome(TAB_STATS)
        HOME_TABS.forEach { rule.onNodeWithContentDescription(it.label).assertIsDisplayed() }
        val texts = listOf("News Feed", "📰 News Feed", "📊 My Stats", "📚 Project Stats", "👤 My Account", "My Stats", "Project Stats", "My Account")
        texts.forEach { assertTrue("the tab strip has no text title \"$it\"", rule.onAllNodesWithText(it, substring = false).fetchSemanticsNodes().isEmpty()) }
    }

    @Test fun theOldHeadingIsGone() {
        showHome(TAB_STATS)
        assertTrue(rule.onAllNodesWithText("My preparation").fetchSemanticsNodes().isEmpty())
        assertTrue(rule.onAllNodesWithText("Your test preps and study plans, with practice and statistics").fetchSemanticsNodes().isEmpty())
    }

    @Test fun theOpenTabIsMarkedAndTappingATabReportsIt() {
        val tabs = mutableListOf<Int>()
        showHome(TAB_ACCOUNT, onTab = { tabs += it })
        rule.onNodeWithContentDescription("My Account").assertIsSelected()
        rule.onNodeWithContentDescription("News Feed").performClick()
        rule.onNodeWithContentDescription("Project Stats").performClick()
        rule.onNodeWithContentDescription("My Stats").performClick()
        assertEquals(listOf(TAB_FEED, TAB_PROJECT, TAB_STATS), tabs)
    }

    @Test fun theFeedTabShowsTheFeedAndTheOtherTabsDoNot() {
        showHome(TAB_FEED, feed = { androidx.compose.material3.Text("THE FEED IS HERE") })
        rule.onNodeWithText("THE FEED IS HERE").assertIsDisplayed()
        rule.onNodeWithContentDescription("News Feed").assertIsSelected()
        assertTrue(rule.onAllNodesWithText("Statistics").fetchSemanticsNodes().isEmpty())
    }

    // ---------------------------------------------------------------- the page

    @Test fun theComposerAsksWhatIsOnTheirMindAndOffersTheKindsOfPost() {
        showFeed()
        rule.onNodeWithText("What's on your mind?").assertIsDisplayed()
        listOf("Question", "My Stats", "Today", "Plan").forEach { rule.onNodeWithText(it).assertIsDisplayed() }
        rule.onNodeWithContentDescription("Write a post").assertIsDisplayed()
    }

    @Test fun everyKindOfPostIsDrawnAsItsOwnCard() {
        showFeed()
        rule.onNodeWithText("📊 My Stats").assertExists()            // the card (the quick button says "My Stats" without the icon)
        val list = hasScrollToIndexAction()
        rule.onNode(list).performScrollToNode(hasText("🎯 My study today")); rule.onNodeWithText("🎯 My study today").assertExists()
        rule.onNode(list).performScrollToNode(hasText("📅 Class 9 Science")); rule.onNodeWithText("📅 Class 9 Science").assertExists()
        rule.onNode(list).performScrollToNode(hasText("This post isn't available")); rule.onNodeWithText("This post isn't available").assertExists()
        rule.onNode(list).performScrollToNode(hasText("Revise a little every day.", substring = true)); rule.onAllNodesWithText("Revise a little every day.").assertCountAtLeast(1)
    }

    private fun androidx.compose.ui.test.SemanticsNodeInteractionCollection.assertCountAtLeast(n: Int) = assertTrue(fetchSemanticsNodes().size >= n)

    @Test fun aPostShowsItsAuthorAgeCountsAndTheThreeButtons() {
        showFeed(FeedState(posts = listOf(posts[0]), loading = false, end = true))
        rule.onAllNodesWithText("Ali K.")[0].assertIsDisplayed()
        rule.onNodeWithText("1m", substring = true).assertExists()
        rule.onNodeWithText("12").assertIsDisplayed()
        rule.onNodeWithText("4 comments  ·  1 share").assertIsDisplayed()
        rule.onNodeWithContentDescription("Like this post").assertIsDisplayed()
        rule.onNodeWithContentDescription("Comment on this post").assertIsDisplayed()
        rule.onNodeWithContentDescription("Share this post").assertIsDisplayed()
        rule.onNodeWithText("Ali K.", substring = true).assertExists()
    }

    @Test fun likeCommentAndShareReachTheScreensCallbacks() {
        val log = mutableListOf<String>()
        showFeed(FeedState(posts = listOf(posts[0]), loading = false, end = true), cb = FeedCallbacks(toggleLike = { log += "like${it.id}" }, openComments = { log += "comments${it.id}" }))
        rule.onNodeWithContentDescription("Like this post").performClick()
        rule.onNodeWithContentDescription("Comment on this post").performClick()
        rule.onNodeWithText("4 comments  ·  1 share").performClick()
        rule.onNodeWithContentDescription("Share this post").performClick()
        rule.waitForIdle()
        assertEquals(listOf("like1", "comments1", "comments1"), log)
        rule.onNodeWithText("Share now").assertIsDisplayed()                      // the share sheet opened
    }

    @Test fun aLikedPostSaysLikedAndOffersToUnlike() {
        showFeed(FeedState(posts = listOf(posts[2]), loading = false, end = true))
        rule.onNodeWithContentDescription("Unlike this post").assertIsDisplayed()
        rule.onNodeWithText("Liked").assertIsDisplayed()
    }

    @Test fun myOwnPostCanBeDeletedAfterAskingAndSomebodyElsesCanBeReported() {
        val deleted = mutableListOf<Long>(); val reported = mutableListOf<String>()
        showFeed(FeedState(posts = listOf(posts[6], posts[0]), loading = false, end = true), cb = FeedCallbacks(delete = { deleted += it.id }, reportPost = { post, reason -> reported += "${post.id}:$reason" }))
        rule.onAllNodesWithContentDescription("More options")[0].performClick()
        rule.onNodeWithText("Delete post").performClick()
        rule.onNodeWithText("Delete this post?").assertIsDisplayed()
        assertTrue("nothing is deleted before the student says yes", deleted.isEmpty())
        rule.onNodeWithText("Cancel").performClick()
        assertTrue(deleted.isEmpty())
        rule.onAllNodesWithContentDescription("More options")[0].performClick()
        rule.onNodeWithText("Delete post").performClick()
        rule.onNodeWithText("Delete").performClick()
        assertEquals(listOf(7L), deleted)

        rule.onAllNodesWithContentDescription("More options")[1].performClick()
        assertTrue("another student's post has no delete", rule.onAllNodesWithText("Delete post").fetchSemanticsNodes().isEmpty())
        rule.onNodeWithText("Report post").performClick()
        rule.onNodeWithText("Report this post").assertIsDisplayed()
        rule.onNodeWithText("Spam or advertising").performClick()
        rule.onNodeWithText("Report").performClick()
        assertEquals(listOf("1:spam"), reported)
    }

    @Test fun aGuestIsAskedToSignInAndCannotWrite() {
        val log = mutableListOf<String>()
        showFeed(FeedState(loading = false), user = null, cb = FeedCallbacks(signIn = { log += "signIn" }))
        rule.onNodeWithText("Join the News Feed").assertIsDisplayed()
        rule.onNodeWithText("Sign in to post").performClick()
        rule.onAllNodesWithText("Sign in")[0].performClick()
        assertEquals(listOf("signIn", "signIn"), log)
        assertTrue("no filters before signing in", rule.onAllNodesWithText("All posts").fetchSemanticsNodes().isEmpty())
    }

    @Test fun anEmptyFeedInvitesTheFirstPost() {
        showFeed(FeedState(loading = false, end = true))
        rule.onNodeWithText("No posts yet").assertIsDisplayed()
        rule.onNodeWithText("Create a post").assertIsDisplayed()
    }

    @Test fun whileLoadingTheFirstPageGreyOutlinesShow() {
        showFeed(FeedState(loading = true))
        rule.onAllNodesWithContentDescription("Loading posts")[0].assertExists()
    }

    @Test fun aFailedLoadSaysSoAndCanBeRetried() {
        var tries = 0
        showFeed(FeedState(loading = false, error = "You are offline. Try again when you are connected."), cb = FeedCallbacks(refresh = { tries++ }))
        rule.onNodeWithText("The News Feed could not be loaded").assertIsDisplayed()
        rule.onNodeWithText("Try again").performClick()
        assertEquals(1, tries)
    }

    @Test fun savedPostsShowTheOfflineNote() {
        showFeed(FeedState(posts = posts, loading = false, offline = true))
        rule.onNodeWithText("You are offline. These are the posts saved on this phone.").assertIsDisplayed()
        rule.onAllNodesWithText("Ali K.")[0].assertExists()
    }

    @Test fun theFiltersAreAllQuestionsAndMine() {
        val picked = mutableListOf<FeedFilter>()
        showFeed(cb = FeedCallbacks(setFilter = { picked += it }))
        rule.onNodeWithText("❓ Questions").performClick()
        rule.onNodeWithText("My posts").performClick()
        rule.onNodeWithText("All posts").performClick()
        assertEquals(listOf(FeedFilter.QUESTIONS, FeedFilter.MINE, FeedFilter.ALL), picked)
    }

    @Test fun theEndOfTheFeedIsSaid() {
        showFeed(FeedState(posts = listOf(posts[0]), loading = false, end = true))
        rule.onNodeWithText("You're all caught up 🎉").assertIsDisplayed()
    }

    // ---------------------------------------------------------------- writing

    @Test fun theComposerSheetOpensWithTheKindTheStudentChose() {
        showFeed()
        rule.onNodeWithText("My Stats").performClick()                                // the quick button
        rule.onNodeWithText("Create post").assertIsDisplayed()
        rule.onNodeWithText("Say something about your stats (optional)").assertIsDisplayed()
        rule.onAllNodesWithText("📊 My Stats", substring = true).assertCountAtLeast(2)           // the chip and the card that will be posted
    }

    @Test fun aPostIsSentWithItsKindAndItsCard() {
        val sent = mutableListOf<Triple<String, String, JsonObject?>>()
        showFeed(cb = FeedCallbacks(createPost = { kind, body, c, done -> sent += Triple(kind, body, c); done(null) }))
        rule.onNodeWithText("My Stats").performClick()
        rule.onNodeWithText("Post").performClick()
        rule.waitForIdle()
        assertEquals(1, sent.size)
        assertEquals("stats", sent[0].first)
        assertEquals("a stats post may have no words of its own", "", sent[0].second)
        assertEquals(sample.tests.totals.questions, sent[0].third!!["questions"].toString().toInt())
        assertTrue("the sheet closes when the post is made", rule.onAllNodesWithText("Create post").fetchSemanticsNodes().isEmpty())
    }

    @Test fun aRefusedPostStaysOpenWithTheReason() {
        showFeed(cb = FeedCallbacks(createPost = { _, _, _, done -> done("Please do not put links in a post.") }))
        rule.onNodeWithText("My Stats").performClick()
        rule.onNodeWithText("Post").performClick()
        rule.onNodeWithText("Please do not put links in a post.").assertIsDisplayed()
        rule.onNodeWithText("Create post").assertIsDisplayed()
    }

    @Test fun aTextPostNeedsSomeWordsBeforeItCanBeSent() {
        showFeed()
        rule.onNodeWithContentDescription("Write a post").performClick()
        rule.onNode(hasText("Post") and androidx.compose.ui.test.isNotEnabled()).assertExists()          // nothing written yet: the Post button is off
    }

    @Test fun commentsOpenInASheetWithTheirReplies() {
        val replies = contract["comment"]!!.let { json.decodeFromJsonElement(pk.wantuch.spacebook.data.remote.FeedCommentDto.serializer(), it) }
        showFeed(
            FeedState(posts = listOf(posts[0].copy(comments = 2)), loading = false, end = true),
            comments = CommentsState(post = posts[0].copy(comments = 2), comments = listOf(replies)),
        )
        rule.onNodeWithText("2 comments").assertIsDisplayed()
        rule.onNodeWithText("The nervous system, for most students.").assertIsDisplayed()
        rule.onNodeWithText("Thank you madam!").assertIsDisplayed()
        rule.onNodeWithText("Write a comment…").assertIsDisplayed()
        rule.onAllNodesWithText("Reply")[0].assertIsDisplayed()
    }

    @Suppress("unused") private val keep = hasContentDescription("")
}
