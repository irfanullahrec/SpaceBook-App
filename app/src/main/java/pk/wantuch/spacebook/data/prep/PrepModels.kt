package pk.wantuch.spacebook.data.prep

import kotlinx.serialization.Serializable

/**
 * What the student has started on the website's Tests Preps and Study Plans, as summarised by assets/prep_summary.js.
 * Everything here is read from the phone's own storage; nothing is invented.
 */
@Serializable
data class PrepSnapshot(
    val today: String = "",
    val tests: TestsDto = TestsDto(),
    val plans: List<PlanDto> = emptyList(),
    /** words the student marked learnt / already known while studying a subject */
    val words: WordsDto = WordsDto(),
    val usage: UsageDto = UsageDto(),
) {
    /** nothing started: no test and no plan (the words are shown on their own) */
    val isEmpty get() = tests.tests.isEmpty() && plans.isEmpty()
}

@Serializable
data class LangMarks(val learnt: Int = 0, val knew: Int = 0)

/** The student's own word progress, from the Word Stats tab of the subjects. [byLang] is keyed en | ur | ps | ar. */
@Serializable
data class WordsDto(
    val learnt: Int = 0,
    val knew: Int = 0,
    val today: Int = 0,
    val week: Int = 0,
    val total: Int = 0,
    val byLang: Map<String, LangMarks> = emptyMap(),
)

/** What this phone has saved for the student, for the Account page. */
@Serializable
data class UsageDto(val studiedQuestions: Int = 0, val bytes: Long = 0, val keys: Int = 0)

@Serializable
data class TestsDto(
    val key: String = "",
    /** the tests the student has started (PST, CT, SST ...), the most recently used first */
    val tests: List<TestDto> = emptyList(),
    val recent: List<RecentDto> = emptyList(),
    val totals: TotalsDto = TotalsDto(),
    /** minutes studied on each of the last 14 days, oldest first */
    val week: List<Int> = emptyList(),
)

@Serializable
data class TestDto(
    val id: String,
    val title: String = "",
    val fullName: String = "",
    val emoji: String = "📝",
    val color: String = "#5b4bff",
    val sessions: Int = 0,
    val practice: Int = 0,
    val mock: Int = 0,
    val questions: Int = 0,
    val correct: Int = 0,
    val minutes: Int = 0,
    val last: Long = 0,
    /** best mock-test score in percent, -1 when there was no mock test yet */
    val bestMock: Int = -1,
    val week: List<Int> = emptyList(),
    /** a test was left half way and can be resumed */
    val running: Boolean = false,
) {
    val accuracy get() = if (questions > 0) Math.round(100f * correct / questions) else 0
}

@Serializable
data class RecentDto(val track: String, val title: String = "", val mode: String = "practice", val ts: Long = 0, val n: Int = 0, val c: Int = 0) {
    val percent get() = if (n > 0) Math.round(100f * c / n) else 0
}

@Serializable
data class TotalsDto(
    val questions: Int = 0,
    val correct: Int = 0,
    val minutes: Int = 0,
    val sessions: Int = 0,
    val studyDays: Int = 0,
    val streak: Int = 0,
    /** questions answered and right today in the Tests Preps (for the News Feed's "my study today" post) */
    val todayQuestions: Int = 0,
    val todayCorrect: Int = 0,
) {
    val accuracy get() = if (questions > 0) Math.round(100f * correct / questions) else 0
}

@Serializable
data class PlanSubject(val id: String, val chapters: Int = 0)

@Serializable
data class CatDto(val n: Int = 0, val done: Int = 0)

@Serializable
data class PlanDto(
    val id: String,
    val name: String = "",
    val classId: String = "",
    val start: String = "",
    val end: String = "",
    val subjects: List<PlanSubject> = emptyList(),
    /** share of the planned study time that is done */
    val pct: Int = 0,
    val items: Int = 0,
    val itemsDone: Int = 0,
    val todayTasks: Int = 0,
    /** of those tasks, the ones whose items are all done */
    val todayTasksDone: Int = 0,
    val todayMinutes: Int = 0,
    val todayItemsLeft: Int = 0,
    /** items of sessions that are over but not finished */
    val pending: Int = 0,
    val nextDate: String = "",
    val nextFrom: String = "",
    val nextTo: String = "",
    val daysLeft: Int = 0,
    val sessions: Int = 0,
    val sessionsDone: Int = 0,
    val byCat: Map<String, CatDto> = emptyMap(),
    val updatedAt: Long = 0,
)

/** The competitive tests the app knows (assets/prep_tests.json, from the website). */
@Serializable
data class TestMeta(val id: String, val title: String = "", val fullName: String = "", val scale: String = "", val emoji: String = "📝", val color: String = "#5b4bff")
