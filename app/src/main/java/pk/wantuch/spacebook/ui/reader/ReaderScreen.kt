package pk.wantuch.spacebook.ui.reader

import androidx.activity.compose.BackHandler
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material.icons.automirrored.rounded.KeyboardArrowLeft
import androidx.compose.material.icons.automirrored.rounded.KeyboardArrowRight
import androidx.compose.material.icons.automirrored.rounded.MenuBook
import androidx.compose.material.icons.automirrored.rounded.VolumeUp
import androidx.compose.material.icons.rounded.Bookmark
import androidx.compose.material.icons.rounded.BookmarkBorder
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material.icons.rounded.Edit
import androidx.compose.material.icons.rounded.FormatListNumbered
import androidx.compose.material.icons.rounded.MoreVert
import androidx.compose.material.icons.rounded.SportsEsports
import androidx.compose.material.icons.rounded.Stop
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.SnackbarResult
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.draw.clip
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import kotlinx.coroutines.launch
import pk.wantuch.spacebook.data.local.Bookmark
import pk.wantuch.spacebook.data.local.ItemCodec
import pk.wantuch.spacebook.data.local.Note
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.splitTitle
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.components.EmptyState
import pk.wantuch.spacebook.ui.components.LoadingPanel
import pk.wantuch.spacebook.ui.components.rememberLoadPercent
import pk.wantuch.spacebook.ui.offline.MissingBookPanel
import pk.wantuch.spacebook.ui.theme.Sb
import pk.wantuch.spacebook.ui.web.SbWebView

private enum class ReaderTab { Read, Games, Notes }

/**
 * A chapter, one page at a time. The page itself is the website's own renderer (same fonts, boxes, diagrams, maths, word and
 * sentence meanings, worked solutions and animations) inside a WebView; everything around it is native.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ReaderScreen(
    app: AppViewModel,
    subjectId: String,
    startChapter: Int,
    startPage: Int,
    startTab: String,
    onBack: () -> Unit,
    onSignIn: () -> Unit,
    onOpenOffline: () -> Unit,
    vm: ReaderViewModel = hiltViewModel(),
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val state by app.state.collectAsStateWithLifecycle()
    val subject = catalog?.subject(subjectId)
    val classDto = catalog?.classOf(subjectId)

    val controller = remember(vm) { vm.newController() }
    var chapter by remember { mutableIntStateOf(startChapter) }
    var pendingPage by remember { mutableIntStateOf(startPage) }
    var tab by remember { mutableStateOf(ReaderTab.Read) }
    var showJump by remember { mutableStateOf(false) }
    val snackbar = remember { SnackbarHostState() }
    val web = controller.state
    val chapterDto = subject?.chapters?.getOrNull(chapter)
    val title = splitTitle(chapterDto?.t.orEmpty())

    controller.onAction = { name, detail ->
        when (name) {
            "auth" -> onSignIn()
            "error" -> scope.launch { snackbar.showSnackbar(detail.ifBlank { "Something went wrong" }) }
            "end" -> if (subject != null && chapter < subject.chapters.lastIndex) scope.launch {
                val r = snackbar.showSnackbar("End of this chapter", "Next chapter", duration = SnackbarDuration.Short)
                if (r == SnackbarResult.ActionPerformed) { chapter += 1; pendingPage = 0 }
            }
            "gamesClosed" -> tab = ReaderTab.Read
            "start" -> if (chapter > 0) scope.launch {
                val r = snackbar.showSnackbar("Start of this chapter", "Previous chapter", duration = SnackbarDuration.Short)
                if (r == SnackbarResult.ActionPerformed) { chapter -= 1; pendingPage = 0 }
            }
        }
    }

    // open the chapter as soon as the page's bridge is ready, and again whenever the chapter changes
    LaunchedEffect(controller.ready, chapter, subject?.id) {
        if (controller.ready && subject != null && chapterDto != null && classDto != null) {
            val saved = vm.position(subjectId)?.takeIf { it.chapterIndex == chapter }
            val resume = if (pendingPage > 0) pendingPage else if (chapter == startChapter && startPage == 0) (saved?.page ?: 0) else 0
            val tabToOpen = if (chapter == startChapter && startTab.isNotBlank()) startTab else if (chapter == startChapter && startPage == 0) saved?.tab.orEmpty() else ""
            controller.openChapter(classDto.id, subject.id, chapterDto.o, resume, tabToOpen)
            pendingPage = 0
        }
    }
    // hand the app's sign-in to the page (rewards, plans and tests then belong to the same account)
    LaunchedEffect(controller.ready, state.user?.id, state.device?.id, state.syncOn) {
        val u = state.user; val d = state.device
        if (controller.ready) { if (u != null && d != null) controller.signIn(u, d, state.syncOn) }
    }
    // the book finished downloading while the "not on this phone" panel was up: open it
    val finishedDownload by vm.offline.progress.collectAsStateWithLifecycle()
    LaunchedEffect(finishedDownload?.finished, finishedDownload?.failed) {
        val d = finishedDownload
        if (d != null && d.finished && d.failed == 0 && d.label == subject?.name && controller.missing != null) controller.reload()
    }
    // remember where the student is
    val tabName = ItemCodec.cleanTab(web.tab)           // "Lessons", "Exercises" ...: the same text the website stores
    LaunchedEffect(web.page, web.pages, web.tab, chapter, controller.loading) {
        if (subject != null && classDto != null && chapterDto != null && web.ready && !controller.loading) {
            vm.savePosition(ReadingPosition(subject.id, classDto.id, chapter, chapterDto.t, web.page, web.pages, System.currentTimeMillis(), tabName))
        }
    }
    val bookmarked by vm.isBookmarked(subjectId, chapter, tabName, web.page).collectAsStateWithLifecycle(false)
    val notes by vm.notesFor(subjectId, chapter, tabName, web.page).collectAsStateWithLifecycle(emptyList())

    val speaker = rememberSpeaker()
    // Games are the website's arcade (js/sb_arcade.js) opened over the page: the same fifteen games and coins as on the web, made from this page's text
    LaunchedEffect(tab, controller.ready) {
        if (!controller.ready) return@LaunchedEffect
        if (tab == ReaderTab.Games) controller.openGames() else controller.closeGames()
    }
    BackHandler(enabled = tab != ReaderTab.Read) { if (tab == ReaderTab.Games) controller.gamesBack() else tab = ReaderTab.Read }

    var menuOpen by remember { mutableStateOf(false) }
    val pageLine = listOfNotNull(classDto?.name, subject?.name, title.primary.takeIf { it.isNotBlank() }).joinToString(" · ")

    // The page comes first: no title bar. Back, bookmark, read aloud and "go to page" live in the footer's menu, so the page starts
    // right under the status bar and uses the whole width.
    Scaffold(
        bottomBar = {
            Surface(color = MaterialTheme.colorScheme.surface, shadowElevation = 6.dp) {
                Row(Modifier.fillMaxWidth().navigationBarsPadding().height(48.dp), verticalAlignment = Alignment.CenterVertically) {
                    CornerArrow(left = true) { tab = ReaderTab.Read; controller.prev() }
                    Text(
                        "${web.page + 1}/${web.pages.coerceAtLeast(1)}", style = MaterialTheme.typography.labelLarge, maxLines = 1,
                        color = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.clip(RoundedCornerShape(12.dp)).clickable(onClickLabel = "Go to a page") { showJump = true }.padding(horizontal = 8.dp, vertical = 8.dp),
                    )
                    Row(Modifier.weight(1f), horizontalArrangement = Arrangement.SpaceEvenly, verticalAlignment = Alignment.CenterVertically) {
                        TabButton(tab == ReaderTab.Read, "Read", Icons.AutoMirrored.Rounded.MenuBook) { tab = ReaderTab.Read }
                        TabButton(tab == ReaderTab.Games, "Games", Icons.Rounded.SportsEsports) { tab = ReaderTab.Games }
                        TabButton(tab == ReaderTab.Notes, if (notes.isNotEmpty()) "Notes ${notes.size}" else "Notes", Icons.Rounded.Edit) { tab = ReaderTab.Notes }
                    }
                    Box {
                        IconButton(onClick = { menuOpen = true }, modifier = Modifier.size(44.dp)) { Icon(Icons.Rounded.MoreVert, "More") }
                        DropdownMenu(expanded = menuOpen, onDismissRequest = { menuOpen = false }) {
                            if (pageLine.isNotBlank()) {
                                Text(pageLine, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 2, overflow = TextOverflow.Ellipsis,
                                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp).width(220.dp))
                            }
                            DropdownMenuItem(
                                text = { Text(if (bookmarked) "Remove bookmark" else "Bookmark this page") },
                                leadingIcon = { Icon(if (bookmarked) Icons.Rounded.Bookmark else Icons.Rounded.BookmarkBorder, null, tint = if (bookmarked) Sb.Pink else MaterialTheme.colorScheme.onSurface) },
                                onClick = {
                                    menuOpen = false
                                    if (subject != null && classDto != null) vm.setBookmark(!bookmarked, Bookmark(subject.id, classDto.id, chapter, tabName, web.page, title.primary, System.currentTimeMillis()))
                                },
                            )
                            DropdownMenuItem(
                                text = { Text(if (speaker.speaking) "Stop reading" else "Read this page aloud") },
                                leadingIcon = { Icon(if (speaker.speaking) Icons.Rounded.Stop else Icons.AutoMirrored.Rounded.VolumeUp, null) },
                                onClick = { menuOpen = false; if (speaker.speaking) speaker.stop() else controller.pageText { speaker.speak(it) } },
                            )
                            DropdownMenuItem(
                                text = { Text("Go to page…") },
                                leadingIcon = { Icon(Icons.Rounded.FormatListNumbered, null) },
                                onClick = { menuOpen = false; showJump = true },
                            )
                            DropdownMenuItem(
                                text = { Text("Back to the chapters") },
                                leadingIcon = { Icon(Icons.AutoMirrored.Rounded.ArrowBack, null) },
                                onClick = { menuOpen = false; onBack() },
                            )
                        }
                    }
                    CornerArrow(left = false) { tab = ReaderTab.Read; controller.next() }
                }
            }
        },
        snackbarHost = { SnackbarHost(snackbar) },
        containerColor = MaterialTheme.colorScheme.background,
        contentWindowInsets = WindowInsets(0),
    ) { pad ->
        Box(Modifier.fillMaxSize().padding(pad).statusBarsPadding()) {
            // the page stays alive under the Games / Notes tabs so nothing reloads when the student comes back
            SbWebView(controller, textZoom = state.fontScale, modifier = Modifier.fillMaxSize())
            if (controller.loading || !controller.ready) {
                Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background), contentAlignment = Alignment.Center) {
                    if (controller.error == null && controller.missing == null) {
                        val pct by rememberLoadPercent(true, controller.pageProgress, controller.ready)
                        LoadingPanel("Opening your book…", pct)
                    }
                }
            }
            if (controller.missing != null && controller.error == null) {
                val dl by vm.offline.progress.collectAsStateWithLifecycle()
                var need by remember { mutableStateOf<Long?>(null) }
                LaunchedEffect(subjectId, controller.missing) { need = vm.missingBytes(subjectId) }
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    MissingBookPanel(
                        bookName = subject?.name, bytesNeeded = need, progress = dl?.takeIf { it.label == subject?.name },
                        onDownload = { subject?.let { vm.downloadBook(it.id, it.name) } }, onOpenOffline = onOpenOffline,
                    )
                }
            }
            controller.error?.let { msg ->
                Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
                    EmptyState("📡", "No connection", msg) { Button(onClick = controller::reload) { Text("Try again") } }
                }
            }
            AnimatedVisibility(tab == ReaderTab.Notes, enter = fadeIn(), exit = fadeOut()) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    NotesPanel(notes, onAdd = { text ->
                        if (subject != null && classDto != null) vm.saveNote(Note("", subject.id, classDto.id, chapter, tabName, web.page, title.primary, text, "", false, System.currentTimeMillis()))
                    }, onDelete = vm::deleteNote)
                }
            }
        }
    }

    controller.meaning?.let { m ->
        MeaningSheet(
            m, speaker, onDismiss = controller::dismissMeaning,
            // a sentence can be kept as a highlight: the same item the website's Highlight button saves
            onHighlight = if (m.isWord || subject == null || classDto == null) null else ({
                vm.saveNote(Note("", subject.id, classDto.id, chapter, tabName, web.page, title.primary, "", m.text.take(500), true, System.currentTimeMillis()))
                scope.launch { snackbar.showSnackbar("Highlight saved") }
                controller.dismissMeaning()
            }),
        )
    }
    if (showJump) JumpDialog(web.page, web.pages, onDismiss = { showJump = false }, onGo = { controller.go(it); showJump = false })
}

/** A page-turn button in a corner of the footer. */
@Composable
private fun CornerArrow(left: Boolean, onClick: () -> Unit) {
    IconButton(onClick = onClick, modifier = Modifier.size(48.dp).semantics { contentDescription = if (left) "Previous page" else "Next page" }) {
        Icon(
            if (left) Icons.AutoMirrored.Rounded.KeyboardArrowLeft else Icons.AutoMirrored.Rounded.KeyboardArrowRight,
            null, Modifier.size(34.dp), tint = MaterialTheme.colorScheme.primary,
        )
    }
}

/** Read / Games / Notes: an icon in a pill; the chosen one shows its word beside the icon. */
@Composable
private fun TabButton(selected: Boolean, label: String, icon: androidx.compose.ui.graphics.vector.ImageVector, onClick: () -> Unit) {
    val tint = if (selected) MaterialTheme.colorScheme.onPrimaryContainer else MaterialTheme.colorScheme.onSurfaceVariant
    Row(
        Modifier
            .clip(RoundedCornerShape(18.dp))
            .background(if (selected) MaterialTheme.colorScheme.primaryContainer else androidx.compose.ui.graphics.Color.Transparent)
            .clickable(onClick = onClick)
            .semantics { contentDescription = label }
            .padding(horizontal = if (selected) 12.dp else 10.dp, vertical = 7.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Icon(icon, null, Modifier.size(22.dp), tint = tint)
        if (selected) Text(label, style = MaterialTheme.typography.labelMedium, maxLines = 1, color = tint, modifier = Modifier.padding(start = 5.dp))
    }
}

@Composable
private fun JumpDialog(page: Int, pages: Int, onDismiss: () -> Unit, onGo: (Int) -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = { TextButton(onClick = onDismiss) { Text("Close") } },
        title = { Text("Go to page") },
        text = {
            LazyColumn(Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                items(pages.coerceAtLeast(1), key = { it }) { i ->
                    Text(
                        "Page ${i + 1}", style = MaterialTheme.typography.titleSmall,
                        color = if (i == page) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurface,
                        modifier = Modifier.fillMaxWidth().clickable { onGo(i) }.padding(vertical = 12.dp, horizontal = 8.dp),
                    )
                }
            }
        },
    )
}

@Composable
private fun NotesPanel(notes: List<Note>, onAdd: (String) -> Unit, onDelete: (String) -> Unit) {
    var text by remember { mutableStateOf("") }
    Column(Modifier.fillMaxSize().padding(12.dp)) {
        Text("Notes for this page", style = MaterialTheme.typography.titleMedium)
        Row(Modifier.padding(vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedTextField(text, { text = it }, Modifier.weight(1f), placeholder = { Text("Write what you want to remember") }, minLines = 1, maxLines = 4)
            Spacer(Modifier.width(8.dp))
            Button(onClick = { if (text.isNotBlank()) { onAdd(text.trim()); text = "" } }, enabled = text.isNotBlank()) { Text("Save") }
        }
        if (notes.isEmpty()) EmptyState("📝", "No notes yet", "Your notes and highlights follow your account to the website and your other phone.")
        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(notes, key = { it.id }) { n ->
                Surface(shape = MaterialTheme.shapes.medium, color = MaterialTheme.colorScheme.surfaceVariant) {
                    Row(Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) {
                            if (n.quote.isNotBlank()) Text("“${n.quote}”", style = MaterialTheme.typography.bodyMedium, fontStyle = androidx.compose.ui.text.font.FontStyle.Italic, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            if (n.text.isNotBlank()) Text(n.text, style = MaterialTheme.typography.bodyLarge)
                        }
                        IconButton(onClick = { onDelete(n.id) }) { Icon(Icons.Rounded.Delete, if (n.isHighlight && n.text.isBlank()) "Delete highlight" else "Delete note") }
                    }
                }
            }
        }
    }
}
