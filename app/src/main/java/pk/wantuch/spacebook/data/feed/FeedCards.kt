package pk.wantuch.spacebook.data.feed

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.put
import pk.wantuch.spacebook.data.prep.PlanDto
import pk.wantuch.spacebook.data.prep.PrepSnapshot

/**
 * The structured attachment of a feed post. The server stores it as a small JSON object that it rebuilds from a whitelist of fields
 * (api/lib/feed.php, sb_feed_attach_clean), so the shapes here and there are the same, and the website draws the same four cards
 * (js/sb_feed.js). The numbers always come from the student's own records on this phone; nothing is typed in.
 */
sealed interface FeedCard {
    data class TestLine(val title: String, val mcqs: Int, val acc: Int)

    data class Stats(
        val questions: Int, val accuracy: Int, val minutes: Int, val streak: Int, val sessions: Int, val words: Int, val plans: Int,
        val tests: List<TestLine>,
    ) : FeedCard

    data class Progress(
        val date: String, val questions: Int, val correct: Int, val minutes: Int, val goal: Int, val coins: Int, val streak: Int,
        val tasksDone: Int, val tasksTotal: Int,
    ) : FeedCard {
        /** share of today's goal, 0..100 (the goal is questions); without a goal the share of the plan's tasks */
        val percent: Int get() = when {
            goal > 0 -> minOf(100, questions * 100 / goal)
            tasksTotal > 0 -> tasksDone * 100 / tasksTotal
            else -> 0
        }
    }

    data class Plan(val name: String, val label: String, val subjects: List<String>, val days: Int, val tasks: Int, val done: Int, val pct: Int) : FeedCard

    data class Question(val subject: String, val cls: String, val chapter: String) : FeedCard

    companion object {
        fun parse(kind: String, o: JsonObject?): FeedCard? {
            if (o == null) return null
            return when (kind) {
                "stats" -> Stats(
                    o.int("questions"), o.int("accuracy"), o.int("minutes"), o.int("streak"), o.int("sessions"), o.int("words"), o.int("plans"),
                    (o["tests"] as? JsonArray).orEmpty().mapNotNull { (it as? JsonObject)?.let { t -> TestLine(t.str("title"), t.int("mcqs"), t.int("acc")) } },
                )
                "progress" -> Progress(
                    o.str("date"), o.int("questions"), o.int("correct"), o.int("minutes"), o.int("goal"), o.int("coins"), o.int("streak"),
                    o.int("tasksDone"), o.int("tasksTotal"),
                )
                "plan" -> Plan(
                    o.str("name"), o.str("label"), (o["subjects"] as? JsonArray).orEmpty().mapNotNull { (it as? JsonPrimitive)?.contentOrNull },
                    o.int("days"), o.int("tasks"), o.int("done"), o.int("pct"),
                )
                "question" -> Question(o.str("subject"), o.str("cls"), o.str("chapter"))
                else -> null
            }
        }
    }
}

private fun JsonObject.int(k: String): Int = (this[k] as? JsonPrimitive)?.intOrNull ?: 0
private fun JsonObject.str(k: String): String = (this[k] as? JsonPrimitive)?.contentOrNull.orEmpty()

/** Builds the cards from what the student has done. A function returns null when there is nothing worth sharing yet. */
object FeedCardBuilder {
    /** the daily question goal shown on the website's My Stats ("Target: 20 Qs") */
    const val DAILY_GOAL = 20

    fun stats(prep: PrepSnapshot?): JsonObject? {
        if (prep == null) return null
        val t = prep.tests.totals
        val tests = prep.tests.tests.filter { it.questions > 0 }.take(6)
        if (t.questions == 0 && t.minutes == 0 && prep.words.total == 0 && prep.plans.isEmpty() && tests.isEmpty()) return null
        return buildJsonObject {
            put("v", 1)
            put("questions", t.questions)
            put("accuracy", t.accuracy)
            put("minutes", t.minutes)
            put("streak", t.streak)
            put("sessions", t.sessions)
            put("words", prep.words.total)
            put("plans", prep.plans.size)
            put("tests", buildJsonArray {
                tests.forEach { test -> add(buildJsonObject { put("title", test.title); put("mcqs", test.questions); put("acc", test.accuracy) }) }
            })
        }
    }

    /** today's study: questions and minutes from the Tests Preps, the plan's tasks of today, the streak and the coins */
    fun progress(prep: PrepSnapshot?, coins: Int, today: String): JsonObject? {
        if (prep == null) return null
        val t = prep.tests.totals
        val minutes = prep.tests.week.lastOrNull() ?: 0
        val tasksTotal = prep.plans.sumOf { it.todayTasks }
        val tasksDone = prep.plans.sumOf { it.todayTasksDone }
        if (t.todayQuestions == 0 && minutes == 0 && tasksTotal == 0) return null
        return buildJsonObject {
            put("v", 1)
            put("date", today.ifBlank { prep.today })
            put("questions", t.todayQuestions)
            put("correct", t.todayCorrect)
            put("minutes", minutes)
            put("goal", DAILY_GOAL)
            put("coins", coins)
            put("streak", t.streak)
            put("tasksDone", tasksDone)
            put("tasksTotal", tasksTotal)
        }
    }

    fun plan(p: PlanDto, label: String): JsonObject = buildJsonObject {
        put("v", 1)
        put("name", p.name)
        put("label", label)
        put("subjects", buildJsonArray { })
        put("days", daysBetween(p.start, p.end))
        put("tasks", p.items)
        put("done", p.itemsDone)
    }

    /** the same card with the names of the plan's subjects filled in (the catalog knows them) */
    fun plan(p: PlanDto, label: String, subjectNames: List<String>): JsonObject {
        val base = plan(p, label)
        return JsonObject(base + ("subjects" to buildJsonArray { subjectNames.take(8).forEach { add(JsonPrimitive(it)) } }))
    }

    fun question(subject: String, cls: String, chapter: String = ""): JsonObject? {
        if (subject.isBlank() && cls.isBlank() && chapter.isBlank()) return null
        return buildJsonObject {
            put("v", 1)
            put("subject", subject.trim().take(60))
            put("cls", cls.trim().take(40))
            put("chapter", chapter.trim().take(80))
        }
    }

    /** whole days from [start] to [end] (both yyyy-mm-dd), inclusive; 0 when either is missing */
    internal fun daysBetween(start: String, end: String): Int {
        fun day(s: String): Long? {
            val p = s.split("-").mapNotNull { it.toIntOrNull() }
            if (p.size != 3) return null
            // UTC midnight of the date: java.time needs API 26 and the app supports 24
            return java.util.GregorianCalendar(java.util.TimeZone.getTimeZone("UTC")).apply { clear(); set(p[0], p[1] - 1, p[2]) }.timeInMillis / 86_400_000L
        }
        return runCatching {
            val a = day(start) ?: return 0
            val b = day(end) ?: return 0
            maxOf(0L, b - a + 1).toInt()
        }.getOrDefault(0)
    }
}
