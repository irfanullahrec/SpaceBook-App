package pk.wantuch.spacebook.ui

import android.net.Uri
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.MenuBook
import androidx.compose.material.icons.rounded.CalendarMonth
import androidx.compose.material.icons.rounded.Home
import androidx.compose.material.icons.rounded.Person
import androidx.compose.material.icons.rounded.Quiz
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import pk.wantuch.spacebook.ui.auth.AuthScreen
import pk.wantuch.spacebook.ui.home.HomeActions
import pk.wantuch.spacebook.ui.home.HomeScreen
import pk.wantuch.spacebook.ui.library.LibraryScreen
import pk.wantuch.spacebook.ui.library.SearchScreen
import pk.wantuch.spacebook.ui.library.SubjectScreen
import pk.wantuch.spacebook.ui.me.MeScreen
import pk.wantuch.spacebook.ui.me.SavedScreen
import pk.wantuch.spacebook.ui.me.SettingsScreen
import pk.wantuch.spacebook.ui.offline.OfflineScreen
import pk.wantuch.spacebook.ui.play.QuizScreen
import pk.wantuch.spacebook.ui.play.ReelsScreen
import pk.wantuch.spacebook.ui.practice.PracticeScreen
import pk.wantuch.spacebook.ui.reader.ReaderScreen
import pk.wantuch.spacebook.ui.web.FeatureScreen

object Routes {
    const val HOME = "home"
    const val LIBRARY = "library"
    const val PRACTICE = "practice"
    const val PLAN = "plan"
    const val ME = "me"
    const val AUTH = "auth"
    const val SEARCH = "search"
    const val SAVED = "saved"
    const val SETTINGS = "settings"
    const val QUIZ = "quiz"
    const val REELS = "reels"
    const val OFFLINE = "offline"
    const val SUBJECT = "subject/{id}"
    const val READER = "reader/{id}/{chapter}/{page}?tab={tab}"
    const val WEB = "web/{page}/{title}"

    fun subject(id: String) = "subject/${Uri.encode(id)}"
    fun reader(id: String, chapter: Int, page: Int = 0, tab: String = "") = "reader/${Uri.encode(id)}/$chapter/$page?tab=${Uri.encode(tab)}"
    fun web(page: String, title: String) = "web/${Uri.encode(page)}/${Uri.encode(title)}"
}

private data class Tab(val route: String, val label: String, val icon: ImageVector)

private val tabs = listOf(
    Tab(Routes.HOME, "Home", Icons.Rounded.Home),
    Tab(Routes.LIBRARY, "Library", Icons.AutoMirrored.Rounded.MenuBook),
    Tab(Routes.PRACTICE, "Practice", Icons.Rounded.Quiz),
    Tab(Routes.PLAN, "Plan", Icons.Rounded.CalendarMonth),
    Tab(Routes.ME, "Me", Icons.Rounded.Person),
)

@Composable
fun AppNav(app: AppViewModel, nav: NavHostController = rememberNavController(), openRequest: String? = null, onOpenHandled: () -> Unit = {}) {
    val backStack by nav.currentBackStackEntryAsState()
    val route = backStack?.destination?.route
    val showBar = tabs.any { it.route == route }

    fun go(r: String) = nav.navigate(r) { launchSingleTop = true }
    /** Chapter 1 of every subject is free; a later chapter without a plan opens the plans window (the website's, inside the app) instead of the reader. */
    fun openReader(id: String, chapter: Int, page: Int = 0, tab: String = "") {
        if (app.canRead(id, chapter)) go(Routes.reader(id, chapter, page, tab))
        else go(Routes.web("plans:${app.classOf(id)}:$id", "Plans"))
    }
    // a study reminder was tapped: the Plan tab
    androidx.compose.runtime.LaunchedEffect(openRequest) {
        if (openRequest == "plan") switchTab(nav, Routes.PLAN)
        if (openRequest != null) onOpenHandled()
    }
    val actions = HomeActions(
        openTestPrep = { test, tab -> go(Routes.web("tests-preps:$test:$tab", "Test Prep")) },
        openPlan = { plan -> go(Routes.web("study-plan:$plan", "Study Plan")) },
        deletePlan = { plan -> go(Routes.web("study-plan-delete:$plan", "Study Plan")) },
        resetWords = { go(Routes.web("words-reset", "My Vocabulary")) },
        startTestPrep = { switchTab(nav, Routes.PRACTICE) },
        newPlan = { switchTab(nav, Routes.PLAN) },
        signIn = { go(Routes.AUTH) },
        openProfile = { switchTab(nav, Routes.ME) },
        openGrammar = { lang -> go(Routes.web("grammar-stats:$lang", "Grammar Stats")) },
    )

    Scaffold(
        bottomBar = {
            if (showBar) NavigationBar(containerColor = MaterialTheme.colorScheme.surface) {
                tabs.forEach { t ->
                    NavigationBarItem(
                        selected = route == t.route,
                        onClick = { switchTab(nav, t.route) },
                        icon = { Icon(t.icon, null) },
                        label = { Text(t.label) },
                    )
                }
            }
        },
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        // the bar's padding applies only to the five main tabs; full-screen pages handle their own insets
        // Scaffold's padding already holds the status bar and the bottom bar for the five main tabs
        Box(Modifier.fillMaxSize().then(if (showBar) Modifier.padding(pad) else Modifier)) {
            NavHost(nav, startDestination = Routes.HOME) {
                composable(Routes.HOME) { HomeScreen(app, actions) }
                composable(Routes.LIBRARY) { LibraryScreen(app, onOpenSubject = { go(Routes.subject(it)) }, onSearch = { go(Routes.SEARCH) }) }
                composable(Routes.PRACTICE) { PracticeScreen(onOpen = { page, title -> go(Routes.web(page, title)) }) }
                composable(Routes.PLAN) { FeatureScreen(app, "study-plan", "Study Plan", onBack = null, onSignIn = { go(Routes.AUTH) }, onOpenOffline = { go(Routes.OFFLINE) }) }
                composable(Routes.ME) { MeScreen(app, onSignIn = { go(Routes.AUTH) }, onSaved = { go(Routes.SAVED) }, onSettings = { go(Routes.SETTINGS) }, onOffline = { go(Routes.OFFLINE) }, onAccount = { go(Routes.web("account", "My account")) }, onPlans = { go(Routes.web("plans", "Plans")) }, onMyPlans = { go(Routes.web("my-plans", "My plans")) }, onFeedback = { go(Routes.web("feedback", "Report a problem")) }) }
                composable(Routes.AUTH) { AuthScreen(onDone = { nav.popBackStack() }, onBack = { nav.popBackStack() }) }
                composable(Routes.SEARCH) {
                    SearchScreen(app, onBack = { nav.popBackStack() }, onOpen = { subject, chapter -> openReader(subject, chapter) })
                }
                composable(Routes.SAVED) { SavedScreen(app, onBack = { nav.popBackStack() }, onOpen = { s, c, p, t -> openReader(s, c, p, t) }) }
                composable(Routes.SETTINGS) { SettingsScreen(app, onBack = { nav.popBackStack() }) }
                composable(Routes.QUIZ) { QuizScreen(onBack = { nav.popBackStack() }, onReels = { nav.popBackStack(); go(Routes.REELS) }) }
                composable(Routes.REELS) { ReelsScreen(onBack = { nav.popBackStack() }) }
                composable(Routes.OFFLINE) { OfflineScreen(onBack = { nav.popBackStack() }) }
                composable(Routes.SUBJECT, listOf(navArgument("id") { type = NavType.StringType })) { e ->
                    val id = e.arguments?.getString("id").orEmpty()
                    SubjectScreen(app, id, onBack = { nav.popBackStack() }, onOpenChapter = { openReader(id, it) })
                }
                composable(
                    Routes.READER,
                    listOf(
                        navArgument("id") { type = NavType.StringType },
                        navArgument("chapter") { type = NavType.IntType },
                        navArgument("page") { type = NavType.IntType },
                        navArgument("tab") { type = NavType.StringType; defaultValue = "" },
                    ),
                ) { e ->
                    ReaderScreen(
                        app, subjectId = e.arguments?.getString("id").orEmpty(),
                        startChapter = e.arguments?.getInt("chapter") ?: 0, startPage = e.arguments?.getInt("page") ?: 0, startTab = e.arguments?.getString("tab").orEmpty(),
                        onBack = { nav.popBackStack() }, onSignIn = { go(Routes.AUTH) }, onOpenOffline = { go(Routes.OFFLINE) },
                    )
                }
                composable(Routes.WEB, listOf(navArgument("page") { type = NavType.StringType }, navArgument("title") { type = NavType.StringType })) { e ->
                    FeatureScreen(app, e.arguments?.getString("page").orEmpty(), e.arguments?.getString("title").orEmpty(), onBack = { nav.popBackStack() }, onSignIn = { go(Routes.AUTH) }, onOpenOffline = { go(Routes.OFFLINE) })
                }
            }
        }
    }
}

private fun switchTab(nav: NavHostController, route: String) {
    nav.navigate(route) {
        popUpTo(nav.graph.findStartDestination().id) { saveState = true }
        launchSingleTop = true
        restoreState = true
    }
}
