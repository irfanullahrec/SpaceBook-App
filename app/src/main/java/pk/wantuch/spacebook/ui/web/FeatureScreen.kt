package pk.wantuch.spacebook.ui.web

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.components.EmptyState
import pk.wantuch.spacebook.ui.components.LoadingPanel
import pk.wantuch.spacebook.ui.components.rememberLoadPercent
import pk.wantuch.spacebook.ui.reader.ReaderViewModel

/**
 * One of the website's own sections (Tests Preps, Papers, Study Plan) shown full screen inside the app, with the
 * website's header and sidebar removed. Rewards, plans and test history are saved to the same account as on the web.
 * @param page the sidebar section: tests-preps | papers | study-plan | subjects | home
 */
@Composable
fun FeatureScreen(app: AppViewModel, page: String, title: String, onBack: (() -> Unit)?, onSignIn: () -> Unit, onOpenOffline: () -> Unit, vm: ReaderViewModel = hiltViewModel()) {
    val state by app.state.collectAsStateWithLifecycle()
    val controller = remember(vm, page) { vm.newController() }
    val context = androidx.compose.ui.platform.LocalContext.current
    controller.onAction = { name, detail ->
        when (name) {
            "auth" -> onSignIn()
            // the plans window (or My plans) was closed: nothing is behind it in the app, so go back
            "plansClosed" -> if (page.startsWith("plans") || page == "my-plans") onBack?.invoke()
            // the account was deleted inside the page: the app forgets this phone's sign-in too
            "signedOut" -> if (page == "account") { app.logout(); android.widget.Toast.makeText(context, "You are signed out.", android.widget.Toast.LENGTH_SHORT).show(); onBack?.invoke() }
            // a job Home asked for (deleting a plan) is finished: say so and go back to Home
            "done" -> { android.widget.Toast.makeText(context, detail, android.widget.Toast.LENGTH_SHORT).show(); onBack?.invoke() }
            "error" -> if (page.startsWith("study-plan-delete") || page == "words-reset") { android.widget.Toast.makeText(context, detail, android.widget.Toast.LENGTH_LONG).show(); onBack?.invoke() }
        }
    }

    LaunchedEffect(controller.ready, page) {
        if (controller.ready) {
            controller.setMode(false)
            controller.openFeature(page)
        }
    }
    // the dialog can rename the student: ask the server who is signed in again when leaving it
    if (page == "account") DisposableEffect(Unit) { onDispose { app.refreshUser() } }
    // a payment may have been submitted, or a plan approved meanwhile: ask the server what this person may use now when the plans window is left
    if (page.startsWith("plans") || page == "my-plans") DisposableEffect(Unit) { onDispose { app.refresh() } }
    // the plans may have changed: schedule the reminders again when the student leaves them
    if (page.startsWith("study-plan")) DisposableEffect(Unit) { onDispose { app.refreshReminders() } }
    LaunchedEffect(controller.ready, state.user?.id, state.device?.id, state.syncOn) {
        val u = state.user; val d = state.device
        if (controller.ready && u != null && d != null) controller.signIn(u, d, state.syncOn)
    }

    // The page comes first: a main tab (Plan) has no bar at all, a pushed page (Papers, Tests Preps, Games) only a slim line with Back and its name.
    Scaffold(
        topBar = {
            if (onBack != null) Row(
                Modifier.fillMaxWidth().statusBarsPadding().height(40.dp).background(MaterialTheme.colorScheme.surface),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                IconButton(onClick = onBack, modifier = Modifier.size(40.dp)) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") }
                Text(title, style = MaterialTheme.typography.titleSmall, maxLines = 1)
            }
        },
        contentWindowInsets = WindowInsets(0),
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        Box(Modifier.fillMaxSize().padding(pad).then(if (onBack == null) Modifier.statusBarsPadding() else Modifier)) {
            SbWebView(controller, textZoom = state.fontScale, modifier = Modifier.fillMaxSize())
            if (controller.loading || !controller.ready) {
                Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background), contentAlignment = Alignment.Center) {
                    if (controller.error == null && controller.missing == null) {
                        val pct by rememberLoadPercent(true, controller.pageProgress, controller.ready)
                        LoadingPanel(if (page.startsWith("study-plan-delete")) "Deleting the plan…" else if (page == "words-reset") "Resetting your vocabulary…" else "Opening $title…", pct, emoji = if (page.startsWith("study-plan")) "📅" else if (page == "words-reset") "🧠" else "📝")
                    }
                }
            }
            if (controller.missing != null && controller.error == null) {
                Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
                    pk.wantuch.spacebook.ui.offline.MissingBookPanel(bookName = null, bytesNeeded = null, progress = null, onDownload = null, onOpenOffline = onOpenOffline)
                }
            }
            controller.error?.let { msg ->
                Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
                    EmptyState("📡", "No connection", msg) { Button(onClick = controller::reload) { Text("Try again") } }
                }
            }
        }
    }
}
