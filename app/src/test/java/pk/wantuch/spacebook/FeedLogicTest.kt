package pk.wantuch.spacebook

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.int
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.data.feed.FeedCard
import pk.wantuch.spacebook.data.feed.FeedCardBuilder
import pk.wantuch.spacebook.data.prep.PrepSnapshot
import pk.wantuch.spacebook.data.remote.FeedAuthorDto
import pk.wantuch.spacebook.data.remote.FeedCommentDto
import pk.wantuch.spacebook.data.remote.FeedCountResponse
import pk.wantuch.spacebook.data.remote.FeedLikeResponse
import pk.wantuch.spacebook.data.remote.FeedListResponse
import pk.wantuch.spacebook.data.remote.FeedPostDto
import pk.wantuch.spacebook.data.remote.FeedPostResponse
import pk.wantuch.spacebook.data.remote.FeedCommentResponse
import pk.wantuch.spacebook.data.remote.FeedCommentsResponse
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.ui.feed.countText
import pk.wantuch.spacebook.ui.feed.feedAuthorOf
import pk.wantuch.spacebook.ui.feed.feedDisplayName
import pk.wantuch.spacebook.ui.feed.feedHue
import pk.wantuch.spacebook.ui.feed.isBigText
import pk.wantuch.spacebook.ui.feed.shareText
import pk.wantuch.spacebook.ui.feed.shortCount
import pk.wantuch.spacebook.ui.feed.timeAgo
import java.io.File
import java.util.Locale

/**
 * The News Feed without a screen: how a post is told, who the author is to other students (the same rule as the server's), the four
 * cards built from the student's own records, and the website's golden file (tests/parity/feed_contract.json, copied here by
 * tools/app/sync_app.js) read with the app's own models.
 */
class FeedLogicTest {
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false; encodeDefaults = true }
    private val contract: JsonObject = json.parseToJsonElement(File("src/test/resources/parity/feed_contract.json").readText()).jsonObject
    private val sample: PrepSnapshot = json.decodeFromString(File("src/test/resources/prep_sample.json").readText())

    private fun <T> decode(key: String, d: kotlinx.serialization.DeserializationStrategy<T>): T = json.decodeFromJsonElement(d, contract[key]!!)

    // ---------------------------------------------------------------- time and counts

    @Test fun postsAreDatedTheWayAFeedDoesIt() {
        val now = 1_793_000_000_000L
        assertEquals("Just now", timeAgo(now - 20_000, now))
        assertEquals("5m", timeAgo(now - 5 * 60_000, now))
        assertEquals("59m", timeAgo(now - 59 * 60_000 - 30_000, now))
        assertEquals("3h", timeAgo(now - 3 * 3_600_000L - 5, now))
        assertEquals("Yesterday", timeAgo(now - 30 * 3_600_000L, now))
        assertEquals("3d", timeAgo(now - 3 * 86_400_000L, now))
        assertEquals("", timeAgo(0, now))
        val old = timeAgo(now - 40 * 86_400_000L, now, Locale.US)
        assertTrue("an older post gets a calendar date: $old", Regex("[A-Z][a-z]{2} \\d{1,2}").matches(old))
        val ancient = timeAgo(now - 800 * 86_400_000L, now, Locale.US)
        assertTrue("a post of another year says the year: $ancient", Regex("[A-Z][a-z]{2} \\d{1,2}, \\d{4}").matches(ancient))
    }

    @Test fun countsAreShortAndSingularWhenThereIsOne() {
        assertEquals("1 like", countText(1, "like"))
        assertEquals("2 likes", countText(2, "like"))
        assertEquals("1 comment", countText(1, "comment"))
        assertEquals("12 shares", countText(12, "share"))
        assertEquals("999", shortCount(999))
        assertEquals("1.2K", shortCount(1_200))
        assertEquals("1K", shortCount(1_000))
        assertEquals("15K", shortCount(15_300))
        assertEquals("1.5M", shortCount(1_500_000))
    }

    // ---------------------------------------------------------------- who the author is

    @Test fun theAuthorIsFirstNameAndTheInitialOfTheLastWordOnly() {
        assertEquals("Ali K.", feedDisplayName("Ali Khan", "student"))
        assertEquals("Sara Y.", feedDisplayName("Sara Bibi Yousafzai", "student"))
        assertEquals("Mrs N.", feedDisplayName("Mrs Nasreen", "teacher"))
        assertEquals("Ali", feedDisplayName("  Ali  ", "student"))
        assertEquals("Student", feedDisplayName("   ", "student"))
        assertEquals("علی خ.", feedDisplayName("علی خان", "student"))
        assertEquals("Government High School Mingora", feedDisplayName("Government High School Mingora", "school"))
        assertEquals("a school keeps its own name but never more than 40 characters", 40, feedDisplayName("S".repeat(80), "school").length)
        assertEquals("a long first name is cut", 24, feedDisplayName("A".repeat(40) + " Khan", "student").substringBefore(' ').length)
    }

    @Test fun theAvatarColourIsTheServersColour() {
        // made with PHP: crc32("sbfeed" . $id) % 360
        assertEquals(231, feedHue(1))
        assertEquals(45, feedHue(2))
        assertEquals(43, feedHue(3))
        assertEquals(100, feedHue(17))
        assertEquals(99, feedHue(250))
    }

    @Test fun theStudentsOwnAvatarMatchesWhatOthersSee() {
        val a = feedAuthorOf(UserDto(id = 1, name = "Ayesha Khan", fatherName = "Secret", userType = "student", whatsapp = "923001234567"))
        assertEquals(FeedAuthorDto(name = "Ayesha K.", type = "student", initial = "A", hue = 231), a)
        assertFalse("no number or father name in what is shown", a.toString().contains("923001234567") || a.toString().contains("Secret"))
        assertEquals("a guest has a neutral avatar", "G", feedAuthorOf(null).initial)
    }

    // ---------------------------------------------------------------- the website's golden file

    @Test fun theAppsModelsReadTheServersAnswers() {
        val post = decode("post", FeedPostDto.serializer())
        assertEquals(12L, post.id); assertEquals("text", post.kind); assertTrue(post.liked); assertEquals(3, post.likes); assertEquals(2, post.comments); assertEquals(1, post.shares)
        assertEquals("Ali K.", post.author.name); assertEquals(231, post.author.hue); assertNull(post.card)

        val share = decode("share", FeedPostDto.serializer())
        assertEquals("share", share.kind); assertTrue(share.mine)
        assertEquals(12L, share.shared?.id); assertEquals("Ali K.", share.shared?.author?.name)

        val comment = decode("comment", FeedCommentDto.serializer())
        assertEquals(0L, comment.parent); assertEquals(1, comment.replies.size); assertEquals(5L, comment.replies[0].parent); assertTrue(comment.replies[0].mine)

        val answers = contract["answers"]!!.jsonObject
        fun answer(k: String) = answers[k]!!
        assertEquals(1793000200000L, json.decodeFromJsonElement(FeedListResponse.serializer(), answer("list")).now)
        assertTrue(json.decodeFromJsonElement(FeedPostResponse.serializer(), answer("share")).ok)
        assertEquals(2, json.decodeFromJsonElement(FeedPostResponse.serializer(), answer("share")).shares)
        assertEquals(3, json.decodeFromJsonElement(FeedLikeResponse.serializer(), answer("like")).likes)
        assertEquals(3, json.decodeFromJsonElement(FeedCommentResponse.serializer(), answer("comment")).count)
        assertEquals(2, json.decodeFromJsonElement(FeedCountResponse.serializer(), answer("commentDelete")).count)
        assertFalse(json.decodeFromJsonElement(FeedCountResponse.serializer(), answer("report")).hidden)
        assertEquals(0L, json.decodeFromJsonElement(FeedCommentsResponse.serializer(), answer("comments")).next)
        val err = json.decodeFromJsonElement(FeedListResponse.serializer(), answer("error"))
        assertFalse(err.ok); assertEquals("Please do not put links in a post.", err.error)
    }

    @Test fun theFourCardsAreReadFromTheGoldenShapes() {
        val cards = contract["cards"]!!.jsonObject
        val stats = FeedCard.parse("stats", cards["stats"]!!.jsonObject) as FeedCard.Stats
        assertEquals(340, stats.questions); assertEquals(82, stats.accuracy); assertEquals(7, stats.streak); assertEquals("PST", stats.tests[0].title); assertEquals(85, stats.tests[0].acc)
        val progress = FeedCard.parse("progress", cards["progress"]!!.jsonObject) as FeedCard.Progress
        assertEquals(24, progress.questions); assertEquals(100, progress.percent); assertEquals(3, progress.tasksDone)
        val plan = FeedCard.parse("plan", cards["plan"]!!.jsonObject) as FeedCard.Plan
        assertEquals("Class 9 Science", plan.name); assertEquals(listOf("Physics", "Chemistry", "Biology"), plan.subjects); assertEquals(45, plan.pct)
        val question = FeedCard.parse("question", cards["question"]!!.jsonObject) as FeedCard.Question
        assertEquals("Chemistry", question.subject); assertEquals("Class 9", question.cls)
        assertNull("a kind with no card", FeedCard.parse("text", null))
        assertNull("an unknown kind", FeedCard.parse("video", cards["stats"]!!.jsonObject))
    }

    @Test fun theProgressRingNeverPassesAHundred() {
        val p = FeedCard.Progress("2026-10-26", questions = 50, correct = 40, minutes = 30, goal = 20, coins = 0, streak = 0, tasksDone = 0, tasksTotal = 0)
        assertEquals(100, p.percent)
        assertEquals(50, p.copy(questions = 10).percent)
        assertEquals("without a goal the plan's tasks decide", 50, p.copy(goal = 0, tasksDone = 1, tasksTotal = 2).percent)
        assertEquals(0, p.copy(goal = 0, tasksTotal = 0).percent)
    }

    @Test fun whatTheAppSendsHasTheGoldenFieldsAndTypes() {
        val sent = FeedCardBuilder.stats(sample)!!
        val golden = contract["cards"]!!.jsonObject["stats"]!!.jsonObject
        assertEquals("the stats card has the golden fields", golden.keys, sent.keys)
        val progress = FeedCardBuilder.progress(sample, coins = 38, today = "2026-10-23")!!
        assertEquals(contract["cards"]!!.jsonObject["progress"]!!.jsonObject.keys, progress.keys)
        val plan = FeedCardBuilder.plan(sample.plans[0], "Class 6 · all subjects", listOf("Mathematics"))
        assertEquals("the server adds pct, the app does not send it", contract["cards"]!!.jsonObject["plan"]!!.jsonObject.keys - "pct", plan.keys)
        val q = FeedCardBuilder.question("Chemistry", "Class 9")!!
        assertEquals(contract["cards"]!!.jsonObject["question"]!!.jsonObject.keys, q.keys)
        val limits = contract["limits"]!!.jsonObject
        assertEquals(20, limits["page"]!!.jsonPrimitive.int)
        assertEquals(20, pk.wantuch.spacebook.data.repo.FeedRepository.PAGE)
        assertEquals(1500, limits["post"]!!.jsonPrimitive.int)
        assertEquals(1500, pk.wantuch.spacebook.ui.feed.POST_MAX)
        val reasons = contract["reasons"]!!.toString().replace("\"", "").trim('[', ']').split(",")
        assertEquals("the app offers the five reasons the server knows", reasons.toSet(), pk.wantuch.spacebook.ui.feed.REPORT_REASONS.map { it.first }.toSet())
    }

    // ---------------------------------------------------------------- the cards are made from the student's own records

    @Test fun aStatsCardCarriesTheNumbersOfMyStats() {
        val c = FeedCardBuilder.stats(sample)!!
        assertEquals(sample.tests.totals.questions, c["questions"]!!.jsonPrimitive.int)
        assertEquals(sample.tests.totals.accuracy, c["accuracy"]!!.jsonPrimitive.int)
        assertEquals(sample.tests.totals.minutes, c["minutes"]!!.jsonPrimitive.int)
        assertEquals(sample.tests.totals.streak, c["streak"]!!.jsonPrimitive.int)
        assertEquals(sample.words.total, c["words"]!!.jsonPrimitive.int)
        assertEquals(sample.plans.size, c["plans"]!!.jsonPrimitive.int)
        assertTrue(c["tests"].toString().contains(sample.tests.tests[0].title))
        assertNull("nothing to share before anything was done", FeedCardBuilder.stats(PrepSnapshot()))
        assertNull(FeedCardBuilder.stats(null))
    }

    @Test fun aStatsCardKeepsAtMostSixTestsAndOnlyThoseWithAnswers() {
        val many = sample.copy(tests = sample.tests.copy(tests = List(9) { i -> sample.tests.tests[0].copy(id = "t$i", title = "T$i", questions = if (i == 8) 0 else 10 + i, correct = 5) }))
        val tests = FeedCardBuilder.stats(many)!!["tests"].toString()
        assertEquals(6, Regex("\"title\"").findAll(tests).count())
        assertFalse("a test with no answers is left out", tests.contains("T8"))
    }

    @Test fun theDayCardCarriesTodaysStudyAndTheTasksOfThePlans() {
        val c = FeedCardBuilder.progress(sample, coins = 120, today = sample.today)!!
        assertEquals(sample.tests.totals.todayQuestions, c["questions"]!!.jsonPrimitive.int)
        assertEquals(sample.tests.totals.todayCorrect, c["correct"]!!.jsonPrimitive.int)
        assertEquals(sample.tests.week.last(), c["minutes"]!!.jsonPrimitive.int)
        assertEquals(sample.plans.sumOf { it.todayTasks }, c["tasksTotal"]!!.jsonPrimitive.int)
        assertEquals(120, c["coins"]!!.jsonPrimitive.int)
        assertEquals(FeedCardBuilder.DAILY_GOAL, c["goal"]!!.jsonPrimitive.int)
        assertEquals(sample.today, c["date"]!!.jsonPrimitive.content)
        val idle = sample.copy(tests = sample.tests.copy(week = List(14) { 0 }, totals = sample.tests.totals.copy(todayQuestions = 0, todayCorrect = 0)), plans = emptyList())
        assertNull("nothing studied today means nothing to share", FeedCardBuilder.progress(idle, 5, "2026-10-23"))
    }

    @Test fun aPlanCardKnowsItsDaysAndItsProgress() {
        val p = sample.plans[0].copy(start = "2026-10-20", end = "2026-10-29", items = 40, itemsDone = 10)
        val c = FeedCardBuilder.plan(p, "Class 6 · all subjects", listOf("Mathematics", "English"))
        assertEquals(10, c["days"]!!.jsonPrimitive.int)
        assertEquals(40, c["tasks"]!!.jsonPrimitive.int)
        assertEquals(10, c["done"]!!.jsonPrimitive.int)
        assertTrue(c["subjects"].toString().contains("English"))
        assertEquals(0, FeedCardBuilder.plan(p.copy(start = "", end = ""), "x")["days"]!!.jsonPrimitive.int)
        assertEquals("a plan that ends before it starts has no days", 0, FeedCardBuilder.plan(p.copy(start = "2026-10-29", end = "2026-10-20"), "x")["days"]!!.jsonPrimitive.int)
    }

    @Test fun aQuestionNeedsSomeTagOrNoCardAtAll() {
        assertNull(FeedCardBuilder.question("", "", ""))
        assertNull(FeedCardBuilder.question("  ", " ", ""))
        assertNotNull(FeedCardBuilder.question("", "Class 9", ""))
        assertEquals(60, FeedCardBuilder.question("S".repeat(100), "")!!["subject"]!!.jsonPrimitive.content.length)
    }

    // ---------------------------------------------------------------- the words of a post

    @Test fun aFewWordsAreBigAndLongTextsAreNot() {
        fun post(body: String, kind: String = "text", card: JsonObject? = null) = FeedPostDto(id = 1, kind = kind, body = body, card = card)
        assertTrue(isBigText(post("Revise a little every day.")))
        assertFalse(isBigText(post("x".repeat(91))))
        assertFalse(isBigText(post("two\nlines")))
        assertFalse("a question is never shown big", isBigText(post("Why?", kind = "question")))
        assertFalse(isBigText(post("My stats", kind = "stats", card = contract["cards"]!!.jsonObject["stats"]!!.jsonObject)))
    }

    @Test fun sendingAPostOutOfTheAppNamesTheAuthorAndTheSite() {
        val a = FeedAuthorDto("Ali K.", "student", "A", 1)
        val text = shareText(FeedPostDto(id = 1, author = a, body = "Which chapter  is\nthe hardest?"))
        assertEquals("Ali K. on SpaceBook: Which chapter is the hardest?\nhttps://wantuch.pk/spacebook/", text)
        val card = shareText(FeedPostDto(id = 2, kind = "stats", author = a, body = ""))
        assertTrue(card, card.startsWith("Ali K. on SpaceBook: my study statistics"))
        val shared = shareText(FeedPostDto(id = 3, kind = "share", author = FeedAuthorDto("Sara Y.", "student", "S", 2), body = "Very true!", shared = pk.wantuch.spacebook.data.remote.FeedSharedDto(id = 1, author = a, body = "Original words")))
        assertTrue("a share sends the original, by its own author: $shared", shared.startsWith("Ali K. on SpaceBook: Original words"))
        assertTrue("never longer than a short message", shareText(FeedPostDto(id = 4, author = a, body = "w".repeat(2000))).length < 300)
    }

}
