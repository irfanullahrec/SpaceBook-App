package pk.wantuch.spacebook

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.setMain
import kotlinx.coroutines.withTimeout
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.Dispatcher
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.RecordedRequest
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
import pk.wantuch.spacebook.data.remote.ApiService
import pk.wantuch.spacebook.data.remote.Endpoint
import pk.wantuch.spacebook.data.remote.SiteInterceptor
import pk.wantuch.spacebook.data.repo.FeedFilter
import pk.wantuch.spacebook.data.repo.FeedRepository
import pk.wantuch.spacebook.ui.feed.FeedViewModel
import retrofit2.Retrofit
import retrofit2.converter.kotlinx.serialization.asConverterFactory
import java.io.File

/**
 * The feed's brain against a fake server that speaks the real API: paging without doubles, a like that shows at once and is taken back
 * when the server says no, a post the server refuses (and why), comments and replies, shares, hiding by reports, the saved first page
 * for an offline phone, and the sign-in answer.
 */
@OptIn(ExperimentalCoroutinesApi::class)
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [35])
class FeedViewModelTest {
    private lateinit var server: MockWebServer
    private lateinit var context: Context
    private lateinit var repo: FeedRepository
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false; encodeDefaults = true }
    private val seen = mutableListOf<RecordedRequest>()

    // what the fake server answers; tests change these
    private var total = 45
    private var likeAnswer: () -> MockResponse = { MockResponse().setBody("""{"ok":true,"likes":5,"liked":true}""") }
    private var createAnswer: () -> MockResponse = { MockResponse().setResponseCode(201).setBody("""{"ok":true,"post":${post(900, body = "Brand new post", mine = true)}}""") }
    private var down = false
    private var status = 200
    private var statusIsPage = false          // the answer is a web page (a file the server does not have), not the feed's JSON

    private fun post(id: Int, kind: String = "text", body: String = "Post $id", mine: Boolean = false, likes: Int = 0, comments: Int = 0, shares: Int = 0, liked: Boolean = false, extra: String = "") =
        """{"id":$id,"kind":"$kind","author":{"name":"Ali K.","type":"student","initial":"A","hue":231},"mine":$mine,"body":"$body","card":null,"likes":$likes,"comments":$comments,"shares":$shares,"liked":$liked,"at":1793000000000$extra}"""

    private fun comment(id: Int, parent: Int = 0, body: String = "Comment $id", replies: String = "") =
        """{"id":$id,"post":1,"parent":$parent,"author":{"name":"Mrs N.","type":"teacher","initial":"M","hue":43},"mine":false,"body":"$body","likes":0,"liked":false,"at":1793000050000,"replies":[$replies]}"""

    private val dispatcher = object : Dispatcher() {
        override fun dispatch(request: RecordedRequest): MockResponse {
            seen += request
            if (status != 200 && statusIsPage) return MockResponse().setResponseCode(status).setBody("<html><body>Not Found</body></html>")
            if (status != 200) return MockResponse().setResponseCode(status).setBody("""{"ok":false,"error":"Sign in to see the News Feed"}""")
            val path = request.path.orEmpty()
            val q = path.substringAfter('?', "")
            fun arg(k: String) = q.split("&").firstOrNull { it.startsWith("$k=") }?.substringAfter('=').orEmpty()
            return when {
                path.contains("action=list") -> {
                    val before = arg("before").toIntOrNull() ?: 0
                    val top = if (before == 0) total + 1 else before
                    val ids = (top - 1 downTo maxOf(1, top - 20))
                    val next = if (ids.last() > 1) ids.last() else 0
                    val kind = arg("kind")
                    val posts = ids.map { post(it, kind = if (kind == "question") "question" else "text") }
                    MockResponse().setBody("""{"ok":true,"posts":[${posts.joinToString(",")}],"next":$next,"now":1793000200000}""")
                }
                path.contains("action=comments") -> MockResponse().setBody("""{"ok":true,"comments":[${comment(10, replies = comment(11, 10))},${comment(9)}],"next":0}""")
                path.contains("action=like") -> likeAnswer()
                path.contains("action=create") -> createAnswer()
                path.contains("action=share") -> MockResponse().setResponseCode(201).setBody("""{"ok":true,"post":${post(901, kind = "share", body = "Very true!", mine = true, extra = ""","shared":{"id":5,"kind":"text","author":{"name":"Ali K.","type":"student","initial":"A","hue":231},"body":"Post 5","card":null,"at":1793000000000}""")},"shares":3}""")
                path.contains("action=comment_delete") -> MockResponse().setBody("""{"ok":true,"count":1}""")
                path.contains("action=comment") -> MockResponse().setResponseCode(201).setBody("""{"ok":true,"comment":${comment(77, parent = if (request.body.peek().readUtf8().contains("\"parent\":10")) 10 else 0, body = "My new comment")},"count":6}""")
                path.contains("action=delete") -> MockResponse().setBody("""{"ok":true}""")
                path.contains("action=report") -> MockResponse().setBody("""{"ok":true,"hidden":${request.body.peek().readUtf8().contains("hide-me")}}""")
                else -> MockResponse().setResponseCode(404)
            }
        }
    }

    @Before fun setUp() {
        Dispatchers.setMain(UnconfinedTestDispatcher())
        context = ApplicationProvider.getApplicationContext()
        context.filesDir.listFiles { f -> f.name.startsWith("feed_cache_") }?.forEach { it.delete() }
        server = MockWebServer().also { it.dispatcher = dispatcher; it.start() }
        val endpoint = Endpoint()
        assertTrue(endpoint.override(server.url("/").toString()))
        val client = OkHttpClient.Builder().addInterceptor(SiteInterceptor(endpoint)).build()
        val api = Retrofit.Builder().baseUrl(Endpoint.DEFAULT).client(client).addConverterFactory(json.asConverterFactory("application/json".toMediaType())).build().create(ApiService::class.java)
        repo = FeedRepository(context, api, json)
    }

    @After fun tearDown() {
        scopes.forEach { it.cancel() }
        Dispatchers.resetMain()
        runCatching { server.shutdown() }
    }

    private fun until(what: String = "the state", cond: () -> Boolean) = runBlocking {
        try { withTimeout(8000) { while (!cond()) delay(15) } } catch (e: Exception) { throw AssertionError("timed out waiting for $what") }
    }

    private fun feed() = FeedViewModel(repo)

    private val scopes = mutableListOf<kotlinx.coroutines.CoroutineScope>()
    /** the one-line messages a student would see, collected as they come */
    private fun messagesOf(vm: FeedViewModel): MutableList<String> {
        val out = mutableListOf<String>()
        val scope = kotlinx.coroutines.CoroutineScope(Dispatchers.Unconfined).also { scopes += it }
        scope.launch { vm.messages.collect { out += it } }
        return out
    }

    @Test fun theFirstPageLoadsNewestFirstAndIsSavedForTheNextVisit() {
        val vm = feed()
        vm.start(7)
        until("the first page") { !vm.state.value.loading && vm.state.value.posts.isNotEmpty() }
        val s = vm.state.value
        assertEquals(20, s.posts.size)
        assertEquals(45L, s.posts.first().id)
        assertEquals(26L, s.posts.last().id)
        assertFalse(s.end)
        until("the page to be saved") { File(context.filesDir, "feed_cache_7.json").exists() }          // saved a moment after it is shown
        assertTrue(seen.first().path!!.contains("limit=20") && seen.first().path!!.contains("before=0"))
    }

    @Test fun anOfflinePhoneShowsTheSavedPostsAndSaysSo() {
        val first = feed(); first.start(7)
        until("the first page") { first.state.value.posts.size == 20 }
        server.shutdown()
        val second = feed()
        val messages = messagesOf(second)
        second.start(7)
        until("the saved posts") { second.state.value.offline }
        assertEquals(20, second.state.value.posts.size)
        assertNull("saved posts are not an error", second.state.value.error)
        until("the offline note") { messages.isNotEmpty() }
        assertTrue(messages[0], messages[0].contains("offline"))
    }

    @Test fun anotherAccountNeverSeesTheSavedPosts() {
        val a = feed(); a.start(7)
        until("the first page") { a.state.value.posts.size == 20 }
        server.shutdown()
        val b = feed(); b.start(8)
        until("the failure") { !b.state.value.loading }
        assertTrue(b.state.value.posts.isEmpty())
        assertNotNull("with nothing saved the student is told what happened", b.state.value.error)
    }

    @Test fun signingOutLeavesNothingOfTheFeedOnThePhone() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        vm.start(0)
        until("the file to go") { !File(context.filesDir, "feed_cache_7.json").exists() }
        assertTrue(vm.state.value.needSignIn); assertTrue(vm.state.value.posts.isEmpty())
    }

    @Test fun scrollingLoadsEachPageOnceWithoutDoubles() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        vm.loadMore(); vm.loadMore()                                    // a second call while one is running does nothing
        until("the second page") { vm.state.value.posts.size == 40 }
        vm.loadMore()
        until("the last page") { vm.state.value.end }
        val ids = vm.state.value.posts.map { it.id }
        assertEquals(45, ids.size)
        assertEquals("no post twice", ids.toSet().size, ids.size)
        assertEquals(ids.sortedDescending(), ids)
        assertEquals("two page requests after the first, no more", 3, seen.count { it.path!!.contains("action=list") })
        vm.loadMore()
        assertEquals("at the end nothing more is asked", 3, seen.count { it.path!!.contains("action=list") })
    }

    @Test fun theQuestionsFilterAsksForQuestionsOnly() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        vm.setFilter(FeedFilter.QUESTIONS)
        until("questions") { vm.state.value.filter == FeedFilter.QUESTIONS && vm.state.value.posts.isNotEmpty() && vm.state.value.posts.all { it.kind == "question" } }
        assertTrue(seen.last { it.path!!.contains("action=list") }.path!!.contains("kind=question"))
        vm.setFilter(FeedFilter.MINE)
        until("mine") { vm.state.value.filter == FeedFilter.MINE && !vm.state.value.loading }
        assertTrue(seen.last { it.path!!.contains("action=list") }.path!!.contains("mine=1"))
    }

    @Test fun aLikeShowsAtOnceAndTheServersCountWins() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        val p = vm.state.value.posts[0]
        vm.toggleLike(p)
        until("the server's count") { vm.state.value.posts[0].likes == 5 }
        assertTrue(vm.state.value.posts[0].liked)
        assertTrue(seen.last().body.readUtf8().contains("\"on\":true"))
        likeAnswer = { MockResponse().setBody("""{"ok":true,"likes":4,"liked":false}""") }
        vm.toggleLike(vm.state.value.posts[0])
        until("unliked") { !vm.state.value.posts[0].liked }
        assertEquals(4, vm.state.value.posts[0].likes)
    }

    @Test fun aLikeTheServerRefusesIsTakenBackWithAMessage() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        val messages = messagesOf(vm)
        likeAnswer = { MockResponse().setResponseCode(429).setBody("""{"ok":false,"error":"Too many likes for now. Try again a little later"}""") }
        vm.toggleLike(vm.state.value.posts[0])
        until("the message") { messages.isNotEmpty() }
        assertFalse(vm.state.value.posts[0].liked)
        assertEquals(0, vm.state.value.posts[0].likes)
        assertEquals("Too many likes for now. Try again a little later", messages[0])
    }

    @Test fun aNewPostGoesOnTopAndARefusedPostSaysWhy() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        var result: String? = "not called"
        vm.createPost("text", "Brand new post", null) { result = it }
        until("the answer") { result != "not called" }
        assertNull(result)
        assertEquals(900L, vm.state.value.posts[0].id)
        assertTrue(vm.state.value.posts[0].mine)
        assertEquals(21, vm.state.value.posts.size)

        createAnswer = { MockResponse().setResponseCode(422).setBody("""{"ok":false,"error":"Please do not put links in a post."}""") }
        var refused: String? = null
        vm.createPost("text", "see www.example.org", null) { refused = it }
        until("the refusal") { refused != null }
        assertEquals("Please do not put links in a post.", refused)
        assertEquals("a refused post is not added", 21, vm.state.value.posts.size)
    }

    @Test fun aQuestionDoesNotAppearInTheMyPostsOfOtherKindsButStaysInQuestions() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        vm.setFilter(FeedFilter.QUESTIONS)
        until("questions") { vm.state.value.posts.isNotEmpty() && vm.state.value.posts.all { it.kind == "question" } }
        val n = vm.state.value.posts.size
        var done = false
        vm.createPost("text", "a plain post made while Questions is open", null) { done = true }
        until("the post") { done }
        assertEquals("a plain post does not belong in the Questions list", n, vm.state.value.posts.size)
    }

    @Test fun commentsOpenWithTheirRepliesAndANewOneGoesInPlace() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        val p = vm.state.value.posts[0]
        vm.openComments(p)
        until("the comments") { !vm.comments.value.loading && vm.comments.value.comments.isNotEmpty() }
        assertEquals(p.id, vm.comments.value.post?.id)
        assertEquals(2, vm.comments.value.comments.size)
        assertEquals(1, vm.comments.value.comments[0].replies.size)

        var sent = false
        vm.sendComment("My new comment") { sent = true }
        until("the comment") { sent }
        assertEquals("a comment goes to the top", 77L, vm.comments.value.comments[0].id)
        assertEquals("and the post shows the server's count", 6, vm.state.value.posts[0].comments)

        vm.replyTo(vm.comments.value.comments[1])                       // the comment with id 10
        assertEquals(10L, vm.comments.value.replyTo?.id)
        sent = false
        vm.sendComment("My reply") { sent = true }
        until("the reply") { sent }
        assertNull("the reply box closes", vm.comments.value.replyTo)
        val top = vm.comments.value.comments.first { it.id == 10L }
        assertEquals("the reply sits under its comment", 2, top.replies.size)
        assertTrue(seen.last { it.path!!.contains("action=comment") && !it.path!!.contains("comments") }.path!!.isNotEmpty())
    }

    @Test fun deletingACommentUsesTheServersCountAndClosingEmptiesTheSheet() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        vm.openComments(vm.state.value.posts[0])
        until("the comments") { vm.comments.value.comments.size == 2 }
        vm.deleteComment(vm.comments.value.comments[0])
        until("the deletion") { vm.comments.value.comments.size == 1 }
        assertEquals(1, vm.state.value.posts[0].comments)
        vm.closeComments()
        assertNull(vm.comments.value.post)
        assertTrue(vm.comments.value.comments.isEmpty())
    }

    @Test fun aSharePutsTheNewPostOnTopAndCountsOnTheOriginal() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        val original = vm.state.value.posts.first { it.id == 40L }
        var result: String? = "waiting"
        vm.share(original, "Very true!") { result = it }
        until("the share") { result != "waiting" }
        assertNull(result)
        assertEquals("share", vm.state.value.posts[0].kind)
        assertEquals(5L, vm.state.value.posts[0].shared?.id)
        assertEquals(21, vm.state.value.posts.size)
    }

    @Test fun deletingMyPostRemovesItAndAReportThatHidesRemovesItToo() {
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        val gone = vm.state.value.posts[0]
        vm.delete(gone)
        until("the deletion") { vm.state.value.posts.none { it.id == gone.id } }
        assertEquals(19, vm.state.value.posts.size)
        val other = vm.state.value.posts[0]
        vm.reportPost(other, "spam")
        until("the report") { seen.any { it.path!!.contains("action=report") } }
        assertTrue("one report does not hide a post", vm.state.value.posts.any { it.id == other.id })
        vm.hideLocally(other)
        assertTrue(vm.state.value.posts.none { it.id == other.id })
    }

    @Test fun aPhoneTheServerDoesNotKnowIsAskedToSignIn() {
        status = 401
        val vm = feed(); vm.start(7)
        until("the answer") { !vm.state.value.loading }
        assertTrue(vm.state.value.needSignIn)
        assertNull("no scary error: just the sign-in card", vm.state.value.error)
    }

    @Test fun aServerWithoutTheFeedSaysSoInPlainWords() {
        status = 404; statusIsPage = true
        val vm = feed(); vm.start(7)
        until("the answer") { !vm.state.value.loading }
        assertEquals("The News Feed is not on the server yet. It starts working when the website is updated.", vm.state.value.error)
        var refused: String? = null
        vm.createPost("text", "a post", null) { refused = it }
        until("the refusal") { refused != null }
        assertEquals("posting says the same, not \"Something went wrong (404)\"", "The News Feed is not on the server yet. It starts working when the website is updated.", refused)
    }

    @Test fun aServerAnswerOf404FromTheFeedItselfKeepsItsOwnWords() {
        likeAnswer = { MockResponse().setResponseCode(404).setBody("""{"ok":false,"error":"That is no longer there"}""") }
        val vm = feed(); vm.start(7)
        until("the first page") { vm.state.value.posts.size == 20 }
        val messages = messagesOf(vm)
        vm.toggleLike(vm.state.value.posts[0])
        until("the message") { messages.isNotEmpty() }
        assertEquals("That is no longer there", messages[0])
    }

    @Test fun aBrokenServerSaysSoAndOffersAnotherTry() {
        status = 500
        val vm = feed(); vm.start(7)
        until("the answer") { !vm.state.value.loading }
        assertFalse(vm.state.value.needSignIn)
        assertNotNull(vm.state.value.error)
        status = 200
        vm.refresh()
        until("the recovery") { vm.state.value.posts.size == 20 }
        assertNull(vm.state.value.error)
    }
}
