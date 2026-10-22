package pk.wantuch.spacebook

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.ChapterDto
import pk.wantuch.spacebook.data.remote.ClassDto
import pk.wantuch.spacebook.data.remote.SubjectDto
import pk.wantuch.spacebook.data.splitTitle
import pk.wantuch.spacebook.ui.games.GameKeys
import pk.wantuch.spacebook.ui.games.GamePage
import pk.wantuch.spacebook.ui.home.FeedPost
import pk.wantuch.spacebook.ui.home.buildFeed

class TitlesAndFeedTest {

    @Test fun splitsNumberEnglishAndUrdu() {
        val t = splitTitle("2 My Family and I میرا خاندان اور میں")
        assertEquals("2", t.number)
        assertEquals("My Family and I", t.english)
        assertEquals("میرا خاندان اور میں", t.local)
    }

    @Test fun reviewLabelCountsAsNumber() {
        val t = splitTitle("R1 Review 1 جائزہ ۱")
        assertEquals("R1", t.number)
        assertEquals("Review 1", t.english)
    }

    @Test fun titleWithoutNumberOrUrdu() {
        val t = splitTitle("Introduction to Computers")
        assertEquals("", t.number)
        assertEquals("Introduction to Computers", t.english)
        assertEquals("", t.local)
    }

    @Test fun urduOnlyTitleUsesLocalAsPrimary() {
        val t = splitTitle("3 سائنس کا تعارف")
        assertEquals("3", t.number)
        assertEquals("", t.english)
        assertEquals("سائنس کا تعارف", t.primary)
    }

    @Test fun emptyTitle() {
        assertEquals("", splitTitle("  ").primary)
    }

    private fun catalog(): Catalog {
        fun subj(id: String, n: Int) = SubjectDto(id, id.uppercase(), chapters = List(n) { ChapterDto("${it + 1} Chapter $it", "call($it)") })
        return Catalog("x", listOf(
            ClassDto("cls5", "Class 5", listOf(subj("cls5-math", 8), subj("cls5-eng", 5), subj("cls5-sci", 6), subj("cls5-isl", 4), subj("cls5-empty", 0))),
        ))
    }

    @Test fun feedHasOneChapterPerSubjectAndExtras() {
        val feed = buildFeed(catalog(), "cls5", emptyList(), 100)
        val chapters = feed.filterIsInstance<FeedPost.Chapter>()
        assertEquals(4, chapters.size)                       // the empty subject is skipped
        assertTrue(feed.any { it is FeedPost.Practice })
        assertTrue(feed.any { it is FeedPost.Plan })
        assertTrue(feed.any { it is FeedPost.Games })
        assertEquals(feed.size, feed.map { it.id }.toSet().size)   // ids are unique, so likes attach to the right post
    }

    @Test fun feedChapterChangesWithTheDayButNotWithinIt() {
        val a = buildFeed(catalog(), "cls5", emptyList(), 100).filterIsInstance<FeedPost.Chapter>().map { it.chapterIndex }
        val b = buildFeed(catalog(), "cls5", emptyList(), 100).filterIsInstance<FeedPost.Chapter>().map { it.chapterIndex }
        val c = buildFeed(catalog(), "cls5", emptyList(), 101).filterIsInstance<FeedPost.Chapter>().map { it.chapterIndex }
        assertEquals(a, b)
        assertTrue(a != c)
    }

    @Test fun continueCardComesFirstForTheSameClassOnly() {
        val reading = listOf(
            ReadingPosition("cls5-math", "cls5", 2, "3 Fractions", 4, 9, 1L),
            ReadingPosition("cls9-bio", "cls9", 0, "1 Cell", 0, 3, 2L),
        )
        val feed = buildFeed(catalog(), "cls5", reading, 7)
        assertTrue(feed.first() is FeedPost.Continue)
        assertEquals(1, feed.filterIsInstance<FeedPost.Continue>().size)
    }

    @Test fun unknownClassGivesEmptyFeed() {
        assertTrue(buildFeed(catalog(), "cls99", emptyList(), 1).isEmpty())
    }

    // the same pattern api/lib/rewards.php uses for activity keys (sb_reward_key_kind)
    private val serverShape = Regex("^[A-Za-z0-9_.:-]{1,40}\\|[A-Za-z0-9_.:-]{1,60}\\|u[A-Za-z0-9]{0,8}\\|(trace|count)\\|[a-z0-9]{1,10}\\|[0-9]{1,3}$")

    @Test fun gameRewardKeysMatchTheServerShape() {
        val page = GamePage("cls5", "cls5-math", "Maths", 3, "4 Fractions", 2, "text")
        for (total in listOf(1, 3, 10, 199, 500, -4, 0)) {
            val key = GameKeys.rewardKey(page, "word-match", total)
            assertTrue(key, serverShape.matches(key))
            assertTrue(key.length <= 190)
        }
    }

    @Test fun oneKeyPerGameAndPageWhateverTheStep() {
        val a = GamePage("cls5", "cls5-math", "Maths", 3, "t", 2, "x")
        val b = a.copy(page = 3)
        assertEquals(GameKeys.rewardKey(a, "g", 5), GameKeys.rewardKey(a, "g", 5))
        assertTrue(GameKeys.rewardKey(a, "g", 5) != GameKeys.rewardKey(b, "g", 5))
        assertTrue(GameKeys.rewardKey(a, "g", 5) != GameKeys.rewardKey(a, "h", 5))
        assertTrue(GameKeys.rewardKey(a, "g", 5).endsWith("|5"))
    }
}
