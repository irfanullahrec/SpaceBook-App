package pk.wantuch.spacebook.data.play

import kotlinx.serialization.Serializable

const val LEVEL_XP = 150
const val XP_CORRECT = 10
const val XP_TRY = 2
const val XP_STAR = 5
const val XP_MISSION = 50
const val MISSION_ANSWERS = 5

/**
 * Everything the Home "play" side remembers on this phone: XP, the daily streak, today's mission, the daily chest.
 * Days are whole local days (see [todayNumber]). All the rules are the pure functions below, so they can be tested.
 */
@Serializable
data class PlayState(
    val xp: Int = 0,
    val streak: Int = 0,
    val bestStreak: Int = 0,
    /** the last day something was learned (an answer, a lesson, the chest) */
    val lastActiveDay: Int = -1,
    val countDay: Int = -1,
    val answeredToday: Int = 0,
    val correctToday: Int = 0,
    val lessonDay: Int = -1,
    val chestDay: Int = -1,
    val bonusDay: Int = -1,
    val totalAnswered: Int = 0,
    val totalCorrect: Int = 0,
    val quizzes: Int = 0,
    val chests: Int = 0,
) {
    val level get() = xp / LEVEL_XP + 1
    val levelProgress get() = (xp % LEVEL_XP) / LEVEL_XP.toFloat()

    /** The streak as the student sees it today: a streak that missed yesterday has ended. */
    fun streakAt(today: Int) = if (lastActiveDay >= today - 1) streak else 0

    fun answeredAt(today: Int) = if (countDay == today) answeredToday else 0
    fun correctAt(today: Int) = if (countDay == today) correctToday else 0

    fun answersDone(today: Int) = answeredAt(today) >= MISSION_ANSWERS
    fun lessonDone(today: Int) = lessonDay == today
    fun chestDone(today: Int) = chestDay == today
    fun missionDone(today: Int) = listOf(answersDone(today), lessonDone(today), chestDone(today)).count { it }
    fun chestReady(today: Int) = chestDay != today

    val badges: List<Badge> get() = Badge.entries.filter { it.earned(this) }
}

enum class Badge(val emoji: String, val title: String, val hint: String, val earned: (PlayState) -> Boolean) {
    FirstAnswer("🌱", "First step", "Answer a question", { it.totalAnswered >= 1 }),
    Sharp("🎯", "Sharp mind", "Get 25 answers right", { it.totalCorrect >= 25 }),
    Hundred("💯", "Hundred club", "Answer 100 questions", { it.totalAnswered >= 100 }),
    Streak3("🔥", "On fire", "Learn 3 days in a row", { it.bestStreak >= 3 }),
    Streak7("🏆", "Week champion", "Learn 7 days in a row", { it.bestStreak >= 7 }),
    Chest("🎁", "Treasure hunter", "Open 5 daily chests", { it.chests >= 5 }),
    Level5("🚀", "Level 5", "Reach level 5", { it.level >= 5 }),
}

/** Whole local days since 1970; changes at the phone's midnight. */
fun todayNumber(nowMillis: Long = System.currentTimeMillis(), zoneOffsetMillis: Int = java.util.TimeZone.getDefault().getOffset(nowMillis)): Int =
    ((nowMillis + zoneOffsetMillis) / 86_400_000L).toInt()

/** What the daily chest holds: more for a longer streak, a little different each day. */
fun chestReward(streak: Int, today: Int) = 25 + 5 * minOf(streak, 10) + (today % 5) * 3

private fun PlayState.active(today: Int): PlayState = when (lastActiveDay) {
    today -> this
    today - 1 -> copy(streak = streak + 1, bestStreak = maxOf(bestStreak, streak + 1), lastActiveDay = today)
    else -> copy(streak = 1, bestStreak = maxOf(bestStreak, 1), lastActiveDay = today)
}

private fun PlayState.rollDay(today: Int) = if (countDay == today) this else copy(countDay = today, answeredToday = 0, correctToday = 0)

/** the three mission tasks done on one day pay a bonus, once */
private fun PlayState.settle(today: Int) =
    if (missionDone(today) == 3 && bonusDay != today) copy(bonusDay = today, xp = xp + XP_MISSION) else this

fun PlayState.recordAnswer(correct: Boolean, today: Int): PlayState = rollDay(today).active(today).let {
    it.copy(
        xp = it.xp + if (correct) XP_CORRECT else XP_TRY,
        answeredToday = it.answeredToday + 1, correctToday = it.correctToday + if (correct) 1 else 0,
        totalAnswered = it.totalAnswered + 1, totalCorrect = it.totalCorrect + if (correct) 1 else 0,
    ).settle(today)
}

/** a finished Quick Quiz: a little XP for every right answer, a bonus when all were right */
fun PlayState.finishQuiz(correct: Int, total: Int, today: Int): PlayState =
    copy(quizzes = quizzes + 1, xp = xp + correct * XP_STAR + if (total > 0 && correct == total) 10 else 0).settle(today)

fun PlayState.openLesson(today: Int): PlayState = if (lessonDay == today) this else active(today).copy(lessonDay = today).settle(today)

/** @return the new state and the XP the chest held (0 when today's chest was already open) */
fun PlayState.openChest(today: Int): Pair<PlayState, Int> {
    if (chestDay == today) return this to 0
    val reward = chestReward(active(today).streak, today)
    return active(today).copy(chestDay = today, chests = chests + 1, xp = xp + reward).settle(today) to reward
}
