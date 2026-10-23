package pk.wantuch.spacebook

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.data.play.Badge
import pk.wantuch.spacebook.data.play.McqBank
import pk.wantuch.spacebook.data.play.PlayState
import pk.wantuch.spacebook.data.play.XP_CORRECT
import pk.wantuch.spacebook.data.play.XP_MISSION
import pk.wantuch.spacebook.data.play.XP_TRY
import pk.wantuch.spacebook.data.play.chestReward
import pk.wantuch.spacebook.data.play.classNumber
import pk.wantuch.spacebook.data.play.finishQuiz
import pk.wantuch.spacebook.data.play.openChest
import pk.wantuch.spacebook.data.play.openLesson
import pk.wantuch.spacebook.data.play.recordAnswer
import pk.wantuch.spacebook.data.play.todayNumber
import java.io.File
import kotlin.random.Random

class PlayRulesTest {
    private val d = 20_000

    @Test fun anAnswerGivesXpAndStartsTheStreak() {
        val s = PlayState().recordAnswer(true, d)
        assertEquals(XP_CORRECT, s.xp)
        assertEquals(1, s.streakAt(d))
        assertEquals(1, s.answeredAt(d))
        assertEquals(XP_CORRECT + XP_TRY, s.recordAnswer(false, d).xp)
    }

    @Test fun theStreakGrowsDayByDayAndBreaksAfterAMissedDay() {
        var s = PlayState().recordAnswer(true, d)
        s = s.recordAnswer(true, d + 1)
        s = s.recordAnswer(true, d + 2)
        assertEquals(3, s.streakAt(d + 2))
        assertEquals(3, s.bestStreak)
        assertEquals(3, s.streakAt(d + 3))                     // not learned yet today, but yesterday counted
        assertEquals(0, s.streakAt(d + 4))                     // a whole day missed
        assertEquals(1, s.recordAnswer(true, d + 4).streakAt(d + 4))
        assertEquals(3, s.recordAnswer(true, d + 4).bestStreak)
    }

    @Test fun theDayCountersStartAgainAtMidnight() {
        val s = (1..4).fold(PlayState()) { a, _ -> a.recordAnswer(true, d) }
        assertEquals(4, s.answeredAt(d))
        assertEquals(0, s.answeredAt(d + 1))
        assertEquals(1, s.recordAnswer(true, d + 1).answeredAt(d + 1))
    }

    @Test fun threeTasksPayTheMissionBonusOnlyOnce() {
        var s = (1..5).fold(PlayState()) { a, _ -> a.recordAnswer(true, d) }
        assertEquals(1, s.missionDone(d))
        s = s.openLesson(d)
        assertEquals(2, s.missionDone(d))
        val before = s.xp
        val (opened, reward) = s.openChest(d)
        assertEquals(3, opened.missionDone(d))
        assertEquals(before + reward + XP_MISSION, opened.xp)
        // doing more the same day pays nothing extra for the mission
        assertEquals(opened.xp + XP_CORRECT, opened.recordAnswer(true, d).xp)
        assertEquals(0, opened.openChest(d).second)
    }

    @Test fun theChestIsOncePerDayAndPaysMoreForALongerStreak() {
        val (a, r1) = PlayState().openChest(d)
        assertTrue(r1 > 0)
        assertFalse(a.chestReady(d))
        assertTrue(a.chestReady(d + 1))
        assertTrue(chestReward(10, d) > chestReward(1, d))
        assertEquals(chestReward(1, d) , r1)
    }

    @Test fun levelsComeEvery150Xp() {
        assertEquals(1, PlayState(xp = 149).level)
        assertEquals(2, PlayState(xp = 150).level)
        assertEquals(0.5f, PlayState(xp = 75).levelProgress, 0.001f)
    }

    @Test fun aFinishedQuizPaysStarsAndAPerfectBonus() {
        assertEquals(15, PlayState().finishQuiz(3, 5, d).xp)
        assertEquals(35, PlayState().finishQuiz(5, 5, d).xp)
        assertEquals(1, PlayState().finishQuiz(0, 5, d).quizzes)
    }

    @Test fun badgesAreEarnedFromTheNumbers() {
        assertTrue(PlayState().badges.isEmpty())
        val s = PlayState(totalAnswered = 120, totalCorrect = 60, bestStreak = 7, chests = 5, xp = 700)
        assertEquals(Badge.entries.toSet(), s.badges.toSet())
    }

    @Test fun todayChangesAtLocalMidnight() {
        val noon = 20_000L * 86_400_000L + 12 * 3_600_000L
        assertEquals(20_000, todayNumber(noon, 0))
        assertEquals(20_000, todayNumber(noon, 5 * 3_600_000))        // 17:00 in Pakistan: still the same day
        assertEquals(20_001, todayNumber(noon, 13 * 3_600_000))
    }

    @Test fun classIdsBecomeNumbers() {
        assertEquals(9, classNumber("cls9"))
        assertEquals(0, classNumber(""))
    }

    // ---- the question bank
    private val bank: McqBank by lazy { McqBank.parse(File("src/main/assets/mcq_bank.json").readText()) }

    @Test fun theBundledBankLoadsAndEveryQuestionIsPlayable() {
        assertTrue(bank.items.size > 5000)
        bank.items.forEach {
            assertTrue(it.id.toString(), it.options.size in 2..4 && it.answer in it.options.indices && it.q.isNotBlank())
            assertEquals(it.options.size, it.options.map { o -> o.lowercase() }.toSet().size)
        }
    }

    @Test fun noQuestionShowsRawLatex() {
        val bs = 92.toChar()                                  // a backslash
        bank.items.forEach { m ->
            val all = listOf(m.q, m.explanation, m.urdu) + m.options
            assertTrue("question ${m.id}: ${m.q}", all.none { it.contains(bs) || it.contains('$') })
        }
    }

    @Test fun everyClassGetsAFullQuiz() {
        for (cls in 1..12) {
            val qs = bank.pick(cls, 5, Random(cls))
            assertEquals("class $cls", 5, qs.size)
            assertEquals(5, qs.map { it.id }.toSet().size)
        }
    }

    @Test fun aQuizMixesSubjectsAndKeepsToOneScriptMostly() {
        repeat(20) { n ->
            val qs = bank.pick(9, 5, Random(n))
            assertTrue(qs.map { it.subjectId }.groupingBy { it }.eachCount().values.max() <= 2)
            assertTrue(qs.count { it.rtl } <= 1)
        }
    }

    @Test fun questionsAlreadySeenAreLeftOutWhileTheBankLasts() {
        val first = bank.pick(6, 5, Random(1))
        val next = bank.pick(6, 5, Random(2), notIds = first.map { it.id }.toSet())
        assertTrue(first.map { it.id }.intersect(next.map { it.id }.toSet()).isEmpty())
    }
}
