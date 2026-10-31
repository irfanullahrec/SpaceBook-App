package pk.wantuch.spacebook

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.data.prep.PrepSnapshot
import pk.wantuch.spacebook.data.prep.ProjectWords
import pk.wantuch.spacebook.data.prep.TestMeta
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.expiry.LockState
import pk.wantuch.spacebook.ui.home.accountInfo
import pk.wantuch.spacebook.ui.home.ago
import pk.wantuch.spacebook.ui.home.fmt
import pk.wantuch.spacebook.ui.home.planLabel
import pk.wantuch.spacebook.ui.home.shortDate
import pk.wantuch.spacebook.ui.home.sizeText
import java.io.File

/** The summary assets/prep_summary.js makes (tools/test_prep_summary.js --sample writes the file) must read into the Kotlin models. */
class PrepModelsTest {
    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }
    private val snap: PrepSnapshot = json.decodeFromString(File("src/test/resources/prep_sample.json").readText())
    private val catalog: Catalog = json.decodeFromString(File("src/main/assets/app_catalog.json").readText())

    @Test fun theJavaScriptSummaryReadsIntoTheModels() {
        assertEquals(listOf("sst-gen", "pst", "ct"), snap.tests.tests.map { it.id })
        val pst = snap.tests.tests.first { it.id == "pst" }
        assertEquals("PST", pst.title)
        assertEquals(70, pst.questions); assertEquals(49, pst.correct); assertEquals(70, pst.accuracy)
        assertEquals(70, pst.bestMock); assertEquals(14, pst.week.size)
        assertTrue(snap.tests.tests.first { it.id == "ct" }.running)
        assertEquals(80, snap.tests.totals.questions); assertEquals(2, snap.tests.totals.streak)
        assertEquals(3, snap.tests.recent.size)
        assertEquals(listOf("p2", "p1"), snap.plans.map { it.id })
        val p = snap.plans.first { it.id == "p1" }
        assertEquals(48, p.pct); assertEquals(3, p.pending); assertEquals(13, p.todayItemsLeft)
        assertEquals("17:00", p.nextFrom)
        assertEquals(listOf(8, 1, 1), listOf(p.tasks, p.checked, p.selfMarked))
        assertEquals("🧠 1 of 8 tasks learnt and checked · 1 marked by you", pk.wantuch.spacebook.ui.home.checkedLine(p))
        assertEquals("🧠 0 of 1 task learnt and checked", pk.wantuch.spacebook.ui.home.checkedLine(snap.plans.first { it.id == "p2" }))
        assertFalse(snap.isEmpty)
        assertTrue(PrepSnapshot().isEmpty)
    }

    @Test fun wordsAndUsageReadIntoTheModels() {
        val w = snap.words
        assertEquals(listOf(4, 2, 6, 1, 3), listOf(w.learnt, w.knew, w.total, w.today, w.week))
        assertEquals(2, w.byLang.getValue("en").learnt); assertEquals(1, w.byLang.getValue("ur").knew)
        assertEquals(42, snap.usage.studiedQuestions); assertTrue(snap.usage.keys > 0 && snap.usage.bytes > 0)
        // words alone never make Home "started": only a test or a plan does
        assertTrue(PrepSnapshot(words = w).isEmpty)
    }

    @Test fun projectWordCountsComeFromTheBundledSite() {
        val p = ProjectWords.parse(File("src/main/assets/site/js/word_stats_summary.js").readText())!!
        assertTrue(p.project.all > 100_000)
        assertTrue(p.classes.values.all { it.all in 1..p.project.all })           // the whole project is never smaller than one class
        assertTrue(p.classes.keys.containsAll(listOf("cls1", "cls6", "cls12")))
        assertEquals(null, ProjectWords.parse("window.x = nothing;"))
        assertEquals("2026-10-21", ProjectWords.parse("/* c */ window.S = {\"generated\":\"2026-10-21\",\"project\":{\"en\":1,\"all\":2},\"classes\":{},\"subjects\":{}};")!!.generated)
        assertEquals("1,234", fmt(1234)); assertEquals("0", fmt(0))
        assertEquals("1 KB", sizeText(10)); assertEquals("3.0 MB", sizeText(3 * 1_048_576L))
    }

    @Test fun theAccountSaysWhoTheStudentIsAndWhenThePreviewEnds() {
        val guest = accountInfo(null, 5, "free", LockState.Open)
        assertEquals(listOf(null, false, 0L), listOf(guest.name, guest.signedIn, guest.previewEnds))
        val user = UserDto(id = 7, name = "Ayesha", userType = "student", whatsapp = "0300")
        val a = accountInfo(user, 9, "free", LockState.Counting(expiresAt = 1_000L, daysLeft = 3))
        assertEquals(listOf("Ayesha", "0300", true, 1_000L, 3, 9), listOf(a.name, a.subtitle, a.signedIn, a.previewEnds, a.previewDaysLeft, a.coins))
        assertEquals("Student", accountInfo(user.copy(name = " "), 0, "free", LockState.Open).name)
        assertEquals(0L, accountInfo(user, 0, "free", LockState.Locked(1L)).previewEnds)
    }

    @Test fun everyTestTheWebsiteKnowsHasANameAnEmojiAndAColour() {
        val tests: List<TestMeta> = json.decodeFromString(File("src/main/assets/prep_tests.json").readText())
        assertTrue(tests.size >= 25)
        listOf("pst", "ct", "sst-bio", "sst-math", "sst-gen").forEach { id -> assertTrue(id, tests.any { it.id == id }) }
        tests.forEach { assertTrue(it.id, it.title.isNotBlank() && it.emoji.isNotBlank() && it.color.startsWith("#")) }
    }

    @Test fun aPlanIsNamedLikeTheWebsiteNamesIt() {
        val six = catalog.cls("cls6")!!
        val allSubjects = snap.plans[1].copy(classId = "cls6", subjects = six.subjects.map { pk.wantuch.spacebook.data.prep.PlanSubject(it.id, it.chapters.size) })
        assertEquals("Class 6 · all subjects", planLabel(allSubjects, catalog))
        val math = six.subjects.first { it.id == "cls6-math" }
        assertEquals("Class 6 · Mathematics", planLabel(allSubjects.copy(subjects = listOf(pk.wantuch.spacebook.data.prep.PlanSubject(math.id, math.chapters.size))), catalog))
        assertEquals("Class 6 · Mathematics · 3 chapters", planLabel(allSubjects.copy(subjects = listOf(pk.wantuch.spacebook.data.prep.PlanSubject(math.id, 3))), catalog))
        assertEquals("Class 6 · 2 subjects", planLabel(allSubjects.copy(subjects = allSubjects.subjects.take(2)), catalog))
    }

    @Test fun datesAndAgesAreShortAndPlain() {
        assertEquals("23 Oct", shortDate("2026-10-23"))
        assertEquals("1 Jan", shortDate("2026-01-01"))
        val now = 1_000_000_000_000L
        assertEquals("just now", ago(now - 60_000, now))
        assertEquals("today", ago(now - 5 * 3_600_000L, now))
        assertEquals("yesterday", ago(now - 30 * 3_600_000L, now))
        assertEquals("3 days ago", ago(now - 3 * 86_400_000L - 1000, now))
        assertEquals("3 weeks ago", ago(now - 21 * 86_400_000L, now))
        assertEquals("not yet", ago(0, now))
    }
}
