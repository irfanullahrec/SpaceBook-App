package pk.wantuch.spacebook.ui.web

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
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
import pk.wantuch.spacebook.ui.reader.ReaderViewModel

/**
 * One of the website's own sections (Tests Preps, Papers, Study Plan) shown full screen inside the app, with the
 * website's header and sidebar removed. Rewards, plans and test history are saved to the same account as on the web.
 * @param page the sidebar section: tests-preps | papers | study-plan | subjects | home
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FeatureScreen(app: AppViewModel, page: String, title: String, onBack: (() -> Unit)?, onSignIn: () -> Unit, onOpenOffline: () -> Unit, vm: ReaderViewModel = hiltViewModel()) {
    val state by app.state.collectAsStateWithLifecycle()
    val controller = remember(vm, page) { vm.newController() }
    val context = androidx.compose.ui.platform.LocalContext.current
    controller.onAction = { name, detail ->
        when (name) {
            "auth" -> onSignIn()
            // the account was deleted inside the page: the app forgets this phone's sign-in too
            "signedOut" -> if (page == "account") { app.logout(); android.widget.Toast.makeText(context, "You are signed out.", android.widget.Toast.LENGTH_SHORT).show(); onBack?.invoke() }
            // a job Home asked for (deleting a plan) is finished: say so and go back to Home
            "done" -> { android.widget.Toast.makeText(context, detail, android.widget.Toast.LENGTH_SHORT).show(); onBack?.invoke() }
            "error" -> if (page.startsWith("study-plan-delete")) { android.widget.Toast.makeText(context, detail, android.widget.Toast.LENGTH_LONG).show(); onBack?.invoke() }
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
    // the plans may have changed: schedule the reminders again when the student leaves them
    if (page.startsWith("study-plan")) DisposableEffect(Unit) { onDispose { app.refreshReminders() } }
    LaunchedEffect(controller.ready, state.user?.id, state.device?.id, state.syncOn) {
        val u = state.user; val d = state.device
        if (controller.ready && u != null && d != null) controller.signIn(u, d, state.syncOn)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(title) },
                navigationIcon = { if (onBack != null) IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.surface),
                // as a main tab the app already pads for the status bar; as a pushed page the bar does it itself
                windowInsets = if (onBack == null) androidx.compose.foundation.layout.WindowInsets(0) else TopAppBarDefaults.windowInsets,
            )
        },
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        Box(Modifier.fillMaxSize().padding(pad)) {
            SbWebView(controller, textZoom = state.fontScale, modifier = Modifier.fillMaxSize())
            if (controller.loading || !controller.ready) {
                Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background), contentAlignment = Alignment.Center) {
                    if (controller.error == null) Text(if (page.startsWith("study-plan-delete")) "Deleting the plan…" else "Opening $title…", style = MaterialTheme.typography.titleMedium)
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
