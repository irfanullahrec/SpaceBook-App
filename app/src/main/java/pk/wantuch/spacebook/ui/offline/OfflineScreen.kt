package pk.wantuch.spacebook.ui.offline

import android.Manifest
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material.icons.rounded.Close
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material.icons.rounded.Download
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import pk.wantuch.spacebook.data.offline.DownloadProgress
import pk.wantuch.spacebook.data.offline.OfflineRepository
import pk.wantuch.spacebook.data.offline.OfflineStat
import pk.wantuch.spacebook.data.repo.CatalogRepository
import pk.wantuch.spacebook.ui.components.ClassCardImage
import javax.inject.Inject

data class OfflineClassRow(val classId: String, val name: String, val subjectIds: List<String>, val stat: OfflineStat)

data class OfflineUi(
    val rows: List<OfflineClassRow> = emptyList(),
    val total: OfflineStat = OfflineStat(0, 0, 0, 0),
    val usedBytes: Long = 0,
    val progress: DownloadProgress? = null,
    val loaded: Boolean = false,
)

@HiltViewModel
class OfflineViewModel @Inject constructor(
    private val offline: OfflineRepository,
    catalogRepo: CatalogRepository,
) : ViewModel() {

    val ui: StateFlow<OfflineUi> = combine(offline.revision, offline.progress, catalogRepo.catalog) { _, progress, catalog ->
        val map = offline.map()
        val classes = catalog?.classes.orEmpty()
        val rows = classes.mapNotNull { c ->
            val ids = offline.subjectIdsOfClass(map, c.id)
            if (ids.isEmpty()) null else OfflineClassRow(c.id, c.name, ids, offline.stat(map, ids))
        }
        val all = rows.flatMap { it.subjectIds }
        OfflineUi(rows, offline.stat(map, all), offline.usedBytes(), progress, loaded = true)
    }.flowOn(Dispatchers.Default).stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), OfflineUi())

    fun download(ids: List<String>, label: String) = offline.start(ids, label)
    fun cancel() = offline.cancel()
    fun remove(ids: List<String>) = viewModelScope.launch { offline.remove(offline.map(), ids) }
    fun refreshList() = viewModelScope.launch { offline.map(refresh = true); offline.touch() }
}

fun formatBytes(b: Long): String = when {
    b >= 1_000_000_000 -> "%.1f GB".format(b / 1e9)
    b >= 1_000_000 -> "%.0f MB".format(b / 1e6)
    b >= 1_000 -> "%.0f KB".format(b / 1e3)
    else -> "$b B"
}

/** "Books on this phone": download a class (or everything) once, then read with no internet. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun OfflineScreen(onBack: () -> Unit, vm: OfflineViewModel = hiltViewModel()) {
    val ui by vm.ui.collectAsStateWithLifecycle()
    val running = ui.progress?.takeIf { !it.finished }
    var confirmAll by remember { mutableStateOf(false) }
    val askNotification = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { }
    fun start(ids: List<String>, label: String) {
        if (Build.VERSION.SDK_INT >= 33) askNotification.launch(Manifest.permission.POST_NOTIFICATIONS)
        vm.download(ids, label)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Books on this phone") },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background),
            )
        },
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        LazyColumn(Modifier.fillMaxSize().padding(pad), contentPadding = PaddingValues(12.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            item {
                Surface(shape = MaterialTheme.shapes.large, color = MaterialTheme.colorScheme.primaryContainer) {
                    Column(Modifier.padding(16.dp)) {
                        Text("Read with no internet", style = MaterialTheme.typography.titleLarge)
                        Text(
                            "Download a class once. Its books, pictures and exercises stay on this phone.",
                            style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp),
                        )
                        Spacer(Modifier.height(10.dp))
                        Text(
                            "On this phone: ${formatBytes(ui.usedBytes)}  ·  all books: ${formatBytes(ui.total.totalBytes)}  ·  ${(ui.total.fraction * 100).toInt()}%",
                            style = MaterialTheme.typography.labelLarge,
                        )
                        LinearProgressIndicator(progress = { ui.total.fraction }, modifier = Modifier.fillMaxWidth().padding(top = 8.dp))
                        Spacer(Modifier.height(12.dp))
                        if (running != null) {
                            RunningDownload(running, onCancel = vm::cancel)
                        } else if (ui.total.complete) {
                            Text("✅ Every book is on this phone.", style = MaterialTheme.typography.titleSmall)
                        } else {
                            Button(onClick = { confirmAll = true }, enabled = ui.loaded && ui.total.files > 0, modifier = Modifier.fillMaxWidth().height(52.dp)) {
                                Icon(Icons.Rounded.Download, null)
                                Spacer(Modifier.width(8.dp))
                                Text("Download all books (${formatBytes(ui.total.totalBytes - ui.total.doneBytes)})")
                            }
                        }
                        ui.progress?.takeIf { it.finished && it.failed > 0 }?.let {
                            Text("${it.failed} files could not be downloaded. Check the connection and try again.", color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 8.dp))
                        }
                    }
                }
            }
            if (ui.loaded && ui.rows.isEmpty()) item { Text("The list of books is not on this phone yet. Connect once and open this screen again.", style = MaterialTheme.typography.bodyLarge) }
            items(ui.rows, key = { it.classId }) { row ->
                ClassRow(row, busy = running != null, onDownload = { start(row.subjectIds, row.name) }, onRemove = { vm.remove(row.subjectIds) })
            }
            item { TextButton(onClick = { vm.refreshList() }) { Text("Check for new books") } }
        }
    }

    if (confirmAll) androidx.compose.material3.AlertDialog(
        onDismissRequest = { confirmAll = false },
        title = { Text("Download all books?") },
        text = { Text("This needs about ${formatBytes(ui.total.totalBytes - ui.total.doneBytes)}. Use Wi-Fi if you can. You can keep using the app while it downloads.") },
        confirmButton = { TextButton(onClick = { confirmAll = false; start(ui.rows.flatMap { it.subjectIds }, "All books") }) { Text("Download") } },
        dismissButton = { TextButton(onClick = { confirmAll = false }) { Text("Not now") } },
    )
}

@Composable
private fun RunningDownload(p: DownloadProgress, onCancel: () -> Unit) {
    Column {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text("Downloading ${p.label}…", style = MaterialTheme.typography.titleSmall)
                Text(
                    if (p.totalBytes > 0) "${(p.doneBytes * 100 / p.totalBytes).coerceIn(0, 100)}%  ·  ${formatBytes(p.doneBytes)} of ${formatBytes(p.totalBytes)}" else "Preparing…",
                    style = MaterialTheme.typography.bodySmall,
                )
            }
            IconButton(onClick = onCancel) { Icon(Icons.Rounded.Close, "Stop downloading") }
        }
        if (p.totalBytes > 0) LinearProgressIndicator(progress = { (p.doneBytes.toFloat() / p.totalBytes).coerceIn(0f, 1f) }, modifier = Modifier.fillMaxWidth().padding(top = 6.dp))
        else LinearProgressIndicator(modifier = Modifier.fillMaxWidth().padding(top = 6.dp))
    }
}

@Composable
private fun ClassRow(row: OfflineClassRow, busy: Boolean, onDownload: () -> Unit, onRemove: () -> Unit) {
    Surface(shape = MaterialTheme.shapes.large, shadowElevation = 2.dp) {
        Row(Modifier.fillMaxWidth().padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
            ClassCardImage(row.classId, row.name, selected = false, modifier = Modifier.width(100.dp)) {}
            Spacer(Modifier.width(14.dp))
            Column(Modifier.weight(1f)) {
                Text(row.name, style = MaterialTheme.typography.titleMedium)
                Text(
                    "${row.subjectIds.size} books · ${formatBytes(row.stat.totalBytes)}",
                    style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
                    maxLines = 1, overflow = TextOverflow.Ellipsis,
                )
                when {
                    row.stat.complete -> Text("✅ On this phone", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.tertiary)
                    row.stat.doneBytes > 0 -> {
                        Text("${(row.stat.fraction * 100).toInt()}% on this phone", style = MaterialTheme.typography.labelMedium)
                        LinearProgressIndicator(progress = { row.stat.fraction }, modifier = Modifier.fillMaxWidth().padding(top = 4.dp))
                    }
                    else -> Text("Not downloaded", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            Spacer(Modifier.width(8.dp))
            if (row.stat.complete) IconButton(onClick = onRemove) { Icon(Icons.Rounded.Delete, "Remove ${row.name} from this phone") }
            else OutlinedButton(onClick = onDownload, enabled = !busy) { Icon(Icons.Rounded.Download, null); Spacer(Modifier.width(4.dp)); Text("Get") }
        }
    }
}
