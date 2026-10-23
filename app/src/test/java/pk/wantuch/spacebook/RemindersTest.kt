package pk.wantuch.spacebook

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.data.reminders.Reminder
import pk.wantuch.spacebook.data.reminders.ReminderCodec

/** The app reads reminders from the website's own code (SBStudyPlan.reminders, tests/plan/reminders.js): this is what it makes of the answer. */
class RemindersTest {
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true; explicitNulls = false; encodeDefaults = true }

    // exactly what WebView.evaluateJavascript returns for JSON.stringify(SBStudyPlan.reminders(7)): a JSON string literal, quotes escaped
    private val answer = "\"[{\\\"key\\\":\\\"plan_a|s1|soon\\\",\\\"at\\\":1792750500000,\\\"title\\\":\\\"Study time in 5 minutes · 4:00 PM–5:00 PM\\\"," +
        "\\\"body\\\":\\\"Mathematics: Read lesson parts 1–4 (4)\\n+ 1 unfinished task from earlier\\\",\\\"planId\\\":\\\"plan_a\\\",\\\"sessionId\\\":\\\"s1\\\"}," +
        "{\\\"key\\\":\\\"plan_a|s1\\\",\\\"at\\\":1792750800000,\\\"title\\\":\\\"Study time now · 4:00 PM–5:00 PM\\\",\\\"body\\\":\\\"Open your plan\\\",\\\"planId\\\":\\\"plan_a\\\",\\\"sessionId\\\":\\\"s1\\\"}]\""

    @Test fun theListTheWebsiteMakesIsReadWithItsWordsAndTimes() {
        val list = ReminderCodec.parse(json, answer)!!
        assertEquals(2, list.size)
        assertEquals("plan_a|s1|soon", list[0].key)
        assertEquals(1792750500000L, list[0].at)
        assertEquals(300_000L, list[1].at - list[0].at)
        assertEquals("Study time in 5 minutes · 4:00 PM–5:00 PM", list[0].title)
        assertEquals("Mathematics: Read lesson parts 1–4 (4)\n+ 1 unfinished task from earlier", list[0].body)
        assertEquals("plan_a", list[1].planId)
    }

    @Test fun noAnswerIsNotAnEmptyList() {
        assertNull("the page was not ready: keep the reminders already scheduled", ReminderCodec.parse(json, "null"))
        assertNull(ReminderCodec.parse(json, ""))
        assertNull(ReminderCodec.parse(json, "\"not json\""))
        assertEquals("a student with no plans really has no reminders", emptyList<Reminder>(), ReminderCodec.parse(json, "\"[]\""))
    }

    @Test fun aReminderSurvivesTheRoundTrip() {
        val r = Reminder("k", 5, "t", "b\nc", "p", "s")
        assertEquals(listOf(r), json.decodeFromString<List<Reminder>>(json.encodeToString(listOf(r))))
    }
}
