package pk.wantuch.spacebook.ui.home

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LifecycleEventEffect
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import pk.wantuch.spacebook.data.prep.GrammarSummary
import pk.wantuch.spacebook.data.prep.PlanDto
import pk.wantuch.spacebook.data.prep.PrepSnapshot
import pk.wantuch.spacebook.data.prep.ProjectWords
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.expiry.ExpiryGate
import pk.wantuch.spacebook.expiry.LockState
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.components.LoadingPanel
import pk.wantuch.spacebook.ui.components.rememberTimedPercent

/** Where Home can send the student. */
data class HomeActions(
    /** open a test (PST, CT ...) on its tab: "practice" | "mock" | "mistakes" | "history" | "stats" */
    val openTestPrep: (testId: String, tab: String) -> Unit = { _, _ -> },
    val openPlan: (planId: String) -> Unit = {},
    /** delete a plan (Home has already asked the student to confirm) */
    val deletePlan: (planId: String) -> Unit = {},
    /** set the student's word marks (My Vocabulary) back to zero (Home has already asked the student to confirm) */
    val resetWords: () -> Unit = {},
    /** the list of tests to start preparing for another one */
    val startTestPrep: () -> Unit = {},
    val newPlan: () -> Unit = {},
    val signIn: () -> Unit = {},
    /** the Me tab: class, saved pages, settings */
    val openProfile: () -> Unit = {},
    /** the website's Grammar Stats page on one language: "en" | "ur" | "ps" | "ar" */
    val openGrammar: (lang: String) -> Unit = {},
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(app: AppViewModel, actions: HomeActions, vm: HomeViewModel = hiltViewModel()) {
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val state by app.state.collectAsStateWithLifecycle()
    val entitlements by app.entitlements.collectAsStateWithLifecycle()
    val prep by vm.prep.collectAsStateWithLifecycle()
    val refreshing by vm.refreshing.collectAsStateWithLifecycle()
    val context = LocalContext.current
    val projectWords = remember { ProjectWords.load(context) }
    val grammar = remember { GrammarSummary.load(context) }
    var tab by rememberSaveable { mutableIntStateOf(TAB_STATS) }
    var gate by remember { mutableStateOf(ExpiryGate.forApp(context).check()) }
    // what was practised on the website while Home was away shows the moment the student comes back
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) { vm.refresh(); gate = ExpiryGate.forApp(context).check() }
    PullToRefreshBox(isRefreshing = refreshing, onRefresh = vm::refresh, modifier = Modifier.fillMaxSize()) {
        HomeContent(
            tab, { tab = it }, prep, projectWords, catalog, accountInfo(state.user, state.coins, entitlements.plan, gate), actions,
            nowMillis = System.currentTimeMillis(), grammar = grammar,
        )
    }
}

/** Who the student is, what plan the server says they are on, and when this preview build stops. */
internal fun accountInfo(user: UserDto?, coins: Int, plan: String, gate: LockState): AccountInfo {
    val counting = gate as? LockState.Counting
    return AccountInfo(
        name = user?.name?.takeIf { it.isNotBlank() } ?: if (user != null) "Student" else null,
        subtitle = if (user != null) listOf(user.userType.replaceFirstChar { it.uppercase() }, user.whatsapp).filter { it.isNotBlank() }.joinToString(" · ")
        else "Reading without an account: progress stays on this phone",
        signedIn = user != null, planId = plan, coins = coins,
        previewEnds = counting?.expiresAt ?: 0, previewDaysLeft = counting?.daysLeft ?: 0,
    )
}

/** Everything Home draws, with no view model: the screenshot tests draw it too. */
@Composable
internal fun HomeContent(
    tab: Int, onTab: (Int) -> Unit,
    prep: PrepSnapshot?, projectWords: ProjectWords?, catalog: Catalog?, account: AccountInfo, actions: HomeActions, nowMillis: Long,
    grammar: GrammarSummary? = null,
) {
    var toDelete by remember { mutableStateOf<PlanDto?>(null) }
    var toResetWords by remember { mutableStateOf(false) }
    Column(Modifier.fillMaxSize()) {
        HomeTitle()
        HomeTabRow(tab, onTab)
        when (tab) {
            TAB_PROJECT -> Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(top = 6.dp, bottom = 24.dp)) { ProjectStatsTab(projectWords, catalog, grammar, actions.openGrammar) }
            TAB_ACCOUNT -> Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(top = 6.dp, bottom = 24.dp)) { AccountTab(account, prep, actions) }
            else -> MyStatsTab(prep, projectWords, catalog, actions, nowMillis, onDelete = { toDelete = it }, onResetWords = { toResetWords = true })
        }
    }
    if (toResetWords) {
        val marked = prep?.words?.total ?: 0
        AlertDialog(
            onDismissRequest = { toResetWords = false },
            title = { Text("Reset your vocabulary?") },
            text = { Text("The $marked words you marked Learnt or Knew it will be cleared, and the counts for today, the last 7 days and each language go back to zero. The books and their word lists stay. This cannot be undone.") },
            confirmButton = { TextButton(onClick = { toResetWords = false; actions.resetWords() }) { Text("Reset", color = MaterialTheme.colorScheme.error) } },
            dismissButton = { TextButton(onClick = { toResetWords = false }) { Text("Keep them") } },
        )
    }
    toDelete?.let { p ->
        AlertDialog(
            onDismissRequest = { toDelete = null },
            title = { Text("Delete this plan?") },
            text = { Text("“${p.name}” and its progress will be removed. This cannot be undone.") },
            confirmButton = { TextButton(onClick = { toDelete = null; actions.deletePlan(p.id) }) { Text("Delete", color = MaterialTheme.colorScheme.error) } },
            dismissButton = { TextButton(onClick = { toDelete = null }) { Text("Keep it") } },
        )
    }
}

/** Only what the student has started: every test preparation and every study plan, each with practice and statistics. */
@Composable
private fun MyStatsTab(
    prep: PrepSnapshot?, projectWords: ProjectWords?, catalog: Catalog?, actions: HomeActions, nowMillis: Long, onDelete: (PlanDto) -> Unit,
    onResetWords: () -> Unit = {},
) {
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(top = 6.dp, bottom = 24.dp)) {
        when {
            prep == null -> item(key = "loading") {
                Box(Modifier.fillMaxWidth().padding(24.dp), contentAlignment = Alignment.Center) {
                    val pct by rememberTimedPercent(true)
                    LoadingPanel("Loading your progress…", pct, emoji = "📊")
                }
            }
            else -> {
                if (prep.isEmpty) item(key = "empty") { EmptyPrep(actions) }
                else {
                    item(key = "overview") { Overview(prep) }

                    item(key = "tests-title") { SectionHeader("Test Preps", "＋ Another test", actions.startTestPrep) }
                    if (prep.tests.tests.isEmpty()) item(key = "tests-none") { NothingYet("📝", "No test started yet", "Pick PST, CT, SST or another test and practise MCQs from your books.", "Start a test prep", actions.startTestPrep) }
                    items(prep.tests.tests, key = { "t-" + it.id }) { t ->
                        TestPrepCard(t, nowMillis, onPractice = { actions.openTestPrep(t.id, "practice") }, onStats = { actions.openTestPrep(t.id, "stats") })
                    }

                    item(key = "plans-title") { SectionHeader("Study Plans", "＋ New plan", actions.newPlan) }
                    if (prep.plans.isEmpty()) item(key = "plans-none") { NothingYet("📅", "No study plan yet", "Make a plan for a class, some subjects or a few chapters, and SpaceBook tells you what to study each day.", "Make a plan", actions.newPlan) }
                    items(prep.plans, key = { "p-" + it.id }) { p ->
                        PlanCard(p, planLabel(p, catalog), onOpen = { actions.openPlan(p.id) }, onDelete = { onDelete(p) })
                    }

                    if (prep.tests.recent.isNotEmpty()) {
                        item(key = "recent-title") { SectionHeader("Recent practice", null, {}) }
                        item(key = "recent") { RecentPractice(prep.tests.recent, nowMillis, onOpen = { actions.openTestPrep(it, "history") }) }
                    }
                }
                item(key = "words") { WordsCard(prep.words, projectWords?.project?.all ?: 0, onReset = onResetWords) }
            }
        }
    }
}

@Composable
private fun HomeTitle() {
    Column(Modifier.padding(start = 16.dp, end = 16.dp, top = 14.dp, bottom = 4.dp)) {
        Text("My preparation", style = MaterialTheme.typography.headlineMedium)
        Text("Your test preps and study plans, with practice and statistics", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

/** "Class 6 · all subjects" / "Class 6 · Mathematics · 3 chapters" / "Class 9 · 2 subjects", like the website's own label. */
internal fun planLabel(p: pk.wantuch.spacebook.data.prep.PlanDto, catalog: Catalog?): String {
    val cls = catalog?.cls(p.classId)
    val className = cls?.name ?: pk.wantuch.spacebook.data.prettyClass(p.classId)
    if (p.subjects.isEmpty()) return className
    val allSubjects = cls != null && p.subjects.size == cls.subjects.size &&
        p.subjects.all { sc -> cls.subjects.firstOrNull { it.id == sc.id }?.let { it.chapters.size == sc.chapters } == true }
    return when {
        allSubjects -> "$className · all subjects"
        p.subjects.size == 1 -> {
            val s = cls?.subjects?.firstOrNull { it.id == p.subjects[0].id }
            val ch = p.subjects[0].chapters
            "$className · ${s?.name ?: p.subjects[0].id}" + if (s != null && ch == s.chapters.size) "" else " · $ch chapter${if (ch == 1) "" else "s"}"
        }
        else -> "$className · ${p.subjects.size} subjects"
    }
}
