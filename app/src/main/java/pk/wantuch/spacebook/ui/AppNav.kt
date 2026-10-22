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
    const val OFFLINE = "offline"
    const val SUBJECT = "subject/{id}"
    const val READER = "reader/{id}/{chapter}/{page}"
    const val WEB = "web/{page}/{title}"

    fun subject(id: String) = "subject/${Uri.encode(id)}"
    fun reader(id: String, chapter: Int, page: Int = 0) = "reader/${Uri.encode(id)}/$chapter/$page"
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
fun AppNav(app: AppViewModel, nav: NavHostController = rememberNavController()) {
    val backStack by nav.currentBackStackEntryAsState()
    val route = backStack?.destination?.route
    val showBar = tabs.any { it.route == route }

    fun go(r: String) = nav.navigate(r) { launchSingleTop = true }
    val actions = HomeActions(
        openChapter = { subject, chapter, page -> go(Routes.reader(subject, chapter, page)) },
        openSubject = { go(Routes.subject(it)) },
        openPractice = { switchTab(nav, Routes.PRACTICE) },
        openPlan = { switchTab(nav, Routes.PLAN) },
        openGames = { switchTab(nav, Routes.LIBRARY) },
        openSearch = { go(Routes.SEARCH) },
        openProfile = { switchTab(nav, Routes.ME) },
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
                composable(Routes.ME) { MeScreen(app, onSignIn = { go(Routes.AUTH) }, onSaved = { go(Routes.SAVED) }, onSettings = { go(Routes.SETTINGS) }, onOffline = { go(Routes.OFFLINE) }) }
                composable(Routes.AUTH) { AuthScreen(onDone = { nav.popBackStack() }, onBack = { nav.popBackStack() }) }
                composable(Routes.SEARCH) {
                    SearchScreen(app, onBack = { nav.popBackStack() }, onOpen = { subject, chapter -> go(Routes.reader(subject, chapter)) })
                }
                composable(Routes.SAVED) { SavedScreen(app, onBack = { nav.popBackStack() }, onOpen = { s, c, p -> go(Routes.reader(s, c, p)) }) }
                composable(Routes.SETTINGS) { SettingsScreen(app, onBack = { nav.popBackStack() }) }
                composable(Routes.OFFLINE) { OfflineScreen(onBack = { nav.popBackStack() }) }
                composable(Routes.SUBJECT, listOf(navArgument("id") { type = NavType.StringType })) { e ->
                    val id = e.arguments?.getString("id").orEmpty()
                    SubjectScreen(app, id, onBack = { nav.popBackStack() }, onOpenChapter = { go(Routes.reader(id, it)) })
                }
                composable(
                    Routes.READER,
                    listOf(
                        navArgument("id") { type = NavType.StringType },
                        navArgument("chapter") { type = NavType.IntType },
                        navArgument("page") { type = NavType.IntType },
                    ),
                ) { e ->
                    ReaderScreen(
                        app, subjectId = e.arguments?.getString("id").orEmpty(),
                        startChapter = e.arguments?.getInt("chapter") ?: 0, startPage = e.arguments?.getInt("page") ?: 0,
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
