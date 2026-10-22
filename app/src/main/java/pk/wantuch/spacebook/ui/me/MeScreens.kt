package pk.wantuch.spacebook.ui.me

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material.icons.automirrored.rounded.KeyboardArrowRight
import androidx.compose.material.icons.automirrored.rounded.Login
import androidx.compose.material.icons.automirrored.rounded.Logout
import androidx.compose.material.icons.rounded.Bookmark
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material.icons.rounded.Download
import androidx.compose.material.icons.rounded.Edit
import androidx.compose.material.icons.rounded.Settings
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.Slider
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import pk.wantuch.spacebook.BuildConfig
import pk.wantuch.spacebook.data.local.Bookmark
import pk.wantuch.spacebook.data.local.BookmarkDao
import pk.wantuch.spacebook.data.local.Note
import pk.wantuch.spacebook.data.local.NoteDao
import pk.wantuch.spacebook.data.splitTitle
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.components.CoinChip
import pk.wantuch.spacebook.ui.components.EmptyState
import pk.wantuch.spacebook.ui.components.SubjectAvatar
import pk.wantuch.spacebook.ui.theme.Sb
import javax.inject.Inject

@HiltViewModel
class SavedViewModel @Inject constructor(private val bookmarks: BookmarkDao, private val notes: NoteDao) : ViewModel() {
    val bookmarkList: StateFlow<List<Bookmark>> = bookmarks.all().stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
    val noteList: StateFlow<List<Note>> = notes.all().stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun removeBookmark(b: Bookmark) = viewModelScope.launch { bookmarks.remove(b.subjectId, b.chapterIndex, b.page) }
    fun removeNote(n: Note) = viewModelScope.launch { notes.remove(n.id) }
}

@Composable
fun MeScreen(app: AppViewModel, onSignIn: () -> Unit, onSaved: () -> Unit, onSettings: () -> Unit, onOffline: () -> Unit) {
    val state by app.state.collectAsStateWithLifecycle()
    val catalog by app.catalog.collectAsStateWithLifecycle()
    MeContent(state.user, state.coins, catalog?.classes.orEmpty(), state.classId, onPickClass = { app.setClass(it) }, onSignIn = onSignIn, onSignOut = { app.logout() }, onSaved = onSaved, onSettings = onSettings, onOffline = onOffline)
}

@Composable
internal fun MeContent(
    user: pk.wantuch.spacebook.data.remote.UserDto?,
    coins: Int,
    classes: List<pk.wantuch.spacebook.data.remote.ClassDto>,
    classId: String,
    onPickClass: (String) -> Unit,
    onSignIn: () -> Unit,
    onSignOut: () -> Unit,
    onSaved: () -> Unit,
    onSettings: () -> Unit,
    onOffline: () -> Unit,
) {
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(bottom = 24.dp)) {
        Text("Me", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.padding(start = 16.dp, top = 12.dp, bottom = 8.dp))
        Surface(shape = MaterialTheme.shapes.large, shadowElevation = 3.dp, modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp)) {
            Column {
                Box(Modifier.fillMaxWidth().background(Sb.Brand).padding(20.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(Modifier.size(64.dp).clip(CircleShape).background(Color.White.copy(alpha = 0.25f)), contentAlignment = Alignment.Center) {
                            Text(user?.name?.trim()?.firstOrNull()?.uppercase() ?: "👤", color = Color.White, style = MaterialTheme.typography.headlineSmall)
                        }
                        Spacer(Modifier.width(16.dp))
                        Column(Modifier.weight(1f)) {
                            Text(user?.name ?: "Guest", color = Color.White, style = MaterialTheme.typography.titleLarge)
                            Text(if (user != null) "${user.userType.replaceFirstChar { it.uppercase() }} · ${user.whatsapp}" else "Reading without an account", color = Color.White.copy(alpha = 0.9f), style = MaterialTheme.typography.bodyMedium)
                        }
                        CoinChip(coins)
                    }
                }
                Row(Modifier.padding(14.dp)) {
                    if (user == null) Button(onClick = onSignIn, modifier = Modifier.weight(1f).height(52.dp)) {
                        Icon(Icons.AutoMirrored.Rounded.Login, null); Spacer(Modifier.width(8.dp)); Text("Sign in or create account")
                    } else OutlinedButton(onClick = onSignOut, modifier = Modifier.weight(1f).height(52.dp)) {
                        Icon(Icons.AutoMirrored.Rounded.Logout, null); Spacer(Modifier.width(8.dp)); Text("Sign out")
                    }
                }
            }
        }
        Text("My class", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(start = 16.dp, top = 20.dp, bottom = 4.dp))
        LazyRow(contentPadding = PaddingValues(horizontal = 12.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            items(classes, key = { it.id }) { c ->
                FilterChip(classId == c.id, { onPickClass(c.id) }, label = { Text(c.name.removePrefix("Class "), Modifier.padding(horizontal = 6.dp, vertical = 8.dp)) })
            }
        }
        Spacer(Modifier.height(12.dp))
        MenuRow(Icons.Rounded.Download, "Books on this phone", "Download classes to read with no internet", onOffline)
        MenuRow(Icons.Rounded.Bookmark, "Saved pages and notes", "Bookmarks and notes on this phone", onSaved)
        MenuRow(Icons.Rounded.Settings, "Settings", "Dark mode, text size", onSettings)
        Text("SpaceBook ${BuildConfig.VERSION_NAME}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(16.dp))
    }
}

@Composable
private fun MenuRow(icon: ImageVector, title: String, subtitle: String, onClick: () -> Unit) {
    Surface(shape = MaterialTheme.shapes.medium, color = MaterialTheme.colorScheme.surface, shadowElevation = 1.dp, modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 5.dp).clickable(onClick = onClick)) {
        Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(icon, null, tint = MaterialTheme.colorScheme.primary)
            Spacer(Modifier.width(14.dp))
            Column(Modifier.weight(1f)) {
                Text(title, style = MaterialTheme.typography.titleSmall)
                Text(subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Icon(Icons.AutoMirrored.Rounded.KeyboardArrowRight, null)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SavedScreen(app: AppViewModel, onBack: () -> Unit, onOpen: (subjectId: String, chapter: Int, page: Int) -> Unit, vm: SavedViewModel = hiltViewModel()) {
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val marks by vm.bookmarkList.collectAsStateWithLifecycle()
    val notes by vm.noteList.collectAsStateWithLifecycle()
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Saved") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background))
        },
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        if (marks.isEmpty() && notes.isEmpty()) {
            EmptyState("🔖", "Nothing saved yet", "Tap the bookmark while reading a page, or write a note, and it shows up here.", Modifier.padding(pad))
        } else LazyColumn(Modifier.fillMaxSize().padding(pad), contentPadding = PaddingValues(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            if (marks.isNotEmpty()) item { Text("Bookmarks", style = MaterialTheme.typography.titleMedium) }
            items(marks, key = { "b${it.subjectId}:${it.chapterIndex}:${it.page}" }) { b ->
                val s = catalog?.subject(b.subjectId)
                Surface(shape = MaterialTheme.shapes.medium, shadowElevation = 1.dp, modifier = Modifier.fillMaxWidth().clickable { onOpen(b.subjectId, b.chapterIndex, b.page) }) {
                    Row(Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                        SubjectAvatar(s?.emoji ?: "📘", b.subjectId, size = 40.dp)
                        Spacer(Modifier.width(12.dp))
                        Column(Modifier.weight(1f)) {
                            Text(b.title, style = MaterialTheme.typography.titleSmall, maxLines = 2, overflow = TextOverflow.Ellipsis)
                            Text("${s?.name ?: ""} · page ${b.page + 1}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        IconButton(onClick = { vm.removeBookmark(b) }) { Icon(Icons.Rounded.Delete, "Remove bookmark") }
                    }
                }
            }
            if (notes.isNotEmpty()) item { Text("Notes", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 8.dp)) }
            items(notes, key = { "n${it.id}" }) { n ->
                Surface(shape = MaterialTheme.shapes.medium, color = MaterialTheme.colorScheme.surfaceVariant, modifier = Modifier.fillMaxWidth().clickable { onOpen(n.subjectId, n.chapterIndex, n.page) }) {
                    Row(Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) {
                            Text(n.text, style = MaterialTheme.typography.bodyLarge)
                            Text("${n.title} · page ${n.page + 1}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1, overflow = TextOverflow.Ellipsis)
                        }
                        IconButton(onClick = { vm.removeNote(n) }) { Icon(Icons.Rounded.Delete, "Delete note") }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(app: AppViewModel, onBack: () -> Unit) {
    val state by app.state.collectAsStateWithLifecycle()
    var site by remember(state.baseUrlOverride) { mutableStateOf(state.baseUrlOverride) }
    var siteError by remember { mutableStateOf(false) }
    var scale by remember(state.fontScale) { mutableStateOf(state.fontScale.toFloat()) }
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Settings") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background))
        },
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        Column(Modifier.fillMaxSize().padding(pad).verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Look", style = MaterialTheme.typography.titleMedium)
            val modes = listOf("Phone" to 0, "Light" to 1, "Dark" to 2)
            SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                modes.forEachIndexed { i, (label, v) ->
                    SegmentedButton(state.themeMode == v, { app.setTheme(v) }, SegmentedButtonDefaults.itemShape(i, modes.size)) { Text(label) }
                }
            }
            Text("Text size: ${scale.toInt()}%", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 12.dp))
            Slider(scale, { scale = it }, valueRange = 80f..160f, steps = 7, onValueChangeFinished = { app.setFontScale(scale.toInt()) })
            Text("Books and the app both get bigger. Small children may like 130%.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

            Text("Server (for developers)", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
            Text("Leave empty to use wantuch.pk/spacebook. On the emulator, http://10.0.2.2:8790/ reaches the PHP server on your PC.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            OutlinedTextField(site, { site = it; siteError = false }, Modifier.fillMaxWidth(), singleLine = true, label = { Text("Site address") }, isError = siteError,
                supportingText = { if (siteError) Text("Use https://… (or http:// only for 10.0.2.2 / localhost)") })
            Button(onClick = { siteError = !app.setBaseUrl(site.trim()) }) { Text("Use this address") }
        }
    }
}
