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
    controller.onAction = { name, _ -> if (name == "auth") onSignIn() }

    LaunchedEffect(controller.ready, page) {
        if (controller.ready) {
            controller.setMode(false)
            controller.openPage(page)
        }
    }
    LaunchedEffect(controller.ready, state.user?.id, state.device?.id) {
        val u = state.user; val d = state.device
        if (controller.ready && u != null && d != null) controller.signIn(u, d)
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
                    if (controller.error == null) Text("Opening $title…", style = MaterialTheme.typography.titleMedium)
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
