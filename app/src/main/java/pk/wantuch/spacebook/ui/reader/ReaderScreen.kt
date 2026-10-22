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
import androidx.compose.foundation.layout.navigationBarsPadding
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
import androidx.compose.material.icons.rounded.SportsEsports
import androidx.compose.material.icons.rounded.Stop
import androidx.compose.material3.AlertDialog
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
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
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
import pk.wantuch.spacebook.data.local.Note
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.splitTitle
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.components.EmptyState
import pk.wantuch.spacebook.ui.games.GamePage
import pk.wantuch.spacebook.ui.games.GamesPanel
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
            "start" -> if (chapter > 0) scope.launch {
                val r = snackbar.showSnackbar("Start of this chapter", "Previous chapter", duration = SnackbarDuration.Short)
                if (r == SnackbarResult.ActionPerformed) { chapter -= 1; pendingPage = 0 }
            }
        }
    }

    // open the chapter as soon as the page's bridge is ready, and again whenever the chapter changes
    LaunchedEffect(controller.ready, chapter, subject?.id) {
        if (controller.ready && subject != null && chapterDto != null && classDto != null) {
            val resume = if (pendingPage > 0) pendingPage else if (chapter == startChapter && startPage == 0) (vm.position(subjectId)?.takeIf { it.chapterIndex == chapter }?.page ?: 0) else 0
            controller.openChapter(classDto.id, subject.id, chapterDto.o, resume)
            pendingPage = 0
        }
    }
    // hand the app's sign-in to the page (rewards, plans and tests then belong to the same account)
    LaunchedEffect(controller.ready, state.user?.id, state.device?.id) {
        val u = state.user; val d = state.device
        if (controller.ready) { if (u != null && d != null) controller.signIn(u, d) }
    }
    // the book finished downloading while the "not on this phone" panel was up: open it
    val finishedDownload by vm.offline.progress.collectAsStateWithLifecycle()
    LaunchedEffect(finishedDownload?.finished, finishedDownload?.failed) {
        val d = finishedDownload
        if (d != null && d.finished && d.failed == 0 && d.label == subject?.name && controller.missing != null) controller.reload()
    }
    // remember where the student is
    LaunchedEffect(web.page, web.pages, chapter, controller.loading) {
        if (subject != null && classDto != null && chapterDto != null && web.ready && !controller.loading) {
            vm.savePosition(ReadingPosition(subject.id, classDto.id, chapter, chapterDto.t, web.page, web.pages, System.currentTimeMillis()))
        }
    }
    val bookmarked by vm.isBookmarked(subjectId, chapter, web.page).collectAsStateWithLifecycle(false)
    val notes by vm.notesFor(subjectId, chapter, web.page).collectAsStateWithLifecycle(emptyList())

    val speaker = rememberSpeaker()
    BackHandler(enabled = tab != ReaderTab.Read) { tab = ReaderTab.Read }

    val gamePage = GamePage(classDto?.id.orEmpty(), subjectId, subject?.name.orEmpty(), chapter, chapterDto?.t.orEmpty(), web.page, text = pageTextSnapshot(controller, web.page, tab))

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(title.primary.ifBlank { subject?.name.orEmpty() }, maxLines = 1, overflow = TextOverflow.Ellipsis, style = MaterialTheme.typography.titleMedium)
                        Text(
                            listOfNotNull(classDto?.name, subject?.name, "Page ${web.page + 1} of ${web.pages.coerceAtLeast(1)}").joinToString(" · "),
                            maxLines = 1, overflow = TextOverflow.Ellipsis, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.primary,
                            modifier = Modifier.clickable(onClickLabel = "Go to a page") { showJump = true },
                        )
                    }
                },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") } },
                actions = {
                    IconButton(onClick = {
                        if (speaker.speaking) speaker.stop() else controller.pageText { speaker.speak(it) }
                    }) { Icon(if (speaker.speaking) Icons.Rounded.Stop else Icons.AutoMirrored.Rounded.VolumeUp, if (speaker.speaking) "Stop reading" else "Read this page aloud") }
                    IconButton(onClick = {
                        if (subject != null && classDto != null) vm.setBookmark(!bookmarked, Bookmark(subject.id, classDto.id, chapter, web.page, title.primary, System.currentTimeMillis()))
                    }) { Icon(if (bookmarked) Icons.Rounded.Bookmark else Icons.Rounded.BookmarkBorder, if (bookmarked) "Remove bookmark" else "Bookmark this page", tint = if (bookmarked) Sb.Pink else MaterialTheme.colorScheme.onSurface) }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.surface),
            )
        },
        bottomBar = {
            // one line: previous page at the left corner, Read / Games / Notes in the middle, next page at the right corner
            Surface(color = MaterialTheme.colorScheme.surface, shadowElevation = 8.dp) {
                Row(Modifier.fillMaxWidth().navigationBarsPadding().height(64.dp), verticalAlignment = Alignment.CenterVertically) {
                    CornerArrow(left = true) { tab = ReaderTab.Read; controller.prev() }
                    Row(Modifier.weight(1f), horizontalArrangement = Arrangement.SpaceEvenly, verticalAlignment = Alignment.CenterVertically) {
                        TabButton(tab == ReaderTab.Read, "Read", Icons.AutoMirrored.Rounded.MenuBook) { tab = ReaderTab.Read }
                        TabButton(tab == ReaderTab.Games, "Games", Icons.Rounded.SportsEsports) { tab = ReaderTab.Games }
                        TabButton(tab == ReaderTab.Notes, if (notes.isNotEmpty()) "Notes ${notes.size}" else "Notes", Icons.Rounded.Edit) { tab = ReaderTab.Notes }
                    }
                    CornerArrow(left = false) { tab = ReaderTab.Read; controller.next() }
                }
            }
        },
        snackbarHost = { SnackbarHost(snackbar) },
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        Box(Modifier.fillMaxSize().padding(pad)) {
            // the page stays alive under the Games / Notes tabs so nothing reloads when the student comes back
            SbWebView(controller, textZoom = state.fontScale, modifier = Modifier.fillMaxSize())
            if (controller.loading || !controller.ready) {
                Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background), contentAlignment = Alignment.Center) {
                    if (controller.error == null) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("📖", style = MaterialTheme.typography.headlineLarge)
                            Text("Opening your book…", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 8.dp))
                        }
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
            AnimatedVisibility(tab == ReaderTab.Games, enter = fadeIn(), exit = fadeOut()) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    GamesPanel(gamePage, onStep = { g, step, total -> vm.gameStep(gamePage, g, step, total) })
                }
            }
            AnimatedVisibility(tab == ReaderTab.Notes, enter = fadeIn(), exit = fadeOut()) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    NotesPanel(notes, onAdd = { text ->
                        if (subject != null && classDto != null) vm.addNote(Note(subjectId = subject.id, classId = classDto.id, chapterIndex = chapter, page = web.page, title = title.primary, text = text, createdAt = System.currentTimeMillis()))
                    }, onDelete = vm::deleteNote)
                }
            }
        }
    }

    controller.meaning?.let { MeaningSheet(it, speaker, onDismiss = controller::dismissMeaning) }
    if (showJump) JumpDialog(web.page, web.pages, onDismiss = { showJump = false }, onGo = { controller.go(it); showJump = false })
}

/** The page text for games: only read when the Games tab is open, so reading does not pay for it. */
@Composable
private fun pageTextSnapshot(controller: pk.wantuch.spacebook.ui.web.WebController, page: Int, tab: ReaderTab): String {
    var text by remember { mutableStateOf("") }
    LaunchedEffect(page, tab, controller.ready) {
        if (tab == ReaderTab.Games && controller.ready) controller.pageText { text = it }
    }
    return text
}

/** A page-turn button in a corner of the footer. */
@Composable
private fun CornerArrow(left: Boolean, onClick: () -> Unit) {
    IconButton(onClick = onClick, modifier = Modifier.size(60.dp).semantics { contentDescription = if (left) "Previous page" else "Next page" }) {
        Icon(
            if (left) Icons.AutoMirrored.Rounded.KeyboardArrowLeft else Icons.AutoMirrored.Rounded.KeyboardArrowRight,
            null, Modifier.size(38.dp), tint = MaterialTheme.colorScheme.primary,
        )
    }
}

/** Read / Games / Notes: an icon over a short label, 56dp tall. */
@Composable
private fun TabButton(selected: Boolean, label: String, icon: androidx.compose.ui.graphics.vector.ImageVector, onClick: () -> Unit) {
    Column(
        Modifier
            .clip(RoundedCornerShape(16.dp))
            .background(if (selected) MaterialTheme.colorScheme.primaryContainer else androidx.compose.ui.graphics.Color.Transparent)
            .clickable(onClick = onClick)
            .padding(horizontal = 14.dp, vertical = 6.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Icon(icon, null, Modifier.size(24.dp), tint = if (selected) MaterialTheme.colorScheme.onPrimaryContainer else MaterialTheme.colorScheme.onSurfaceVariant)
        Text(
            label, style = MaterialTheme.typography.labelMedium, maxLines = 1,
            color = if (selected) MaterialTheme.colorScheme.onPrimaryContainer else MaterialTheme.colorScheme.onSurfaceVariant,
        )
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
private fun NotesPanel(notes: List<Note>, onAdd: (String) -> Unit, onDelete: (Long) -> Unit) {
    var text by remember { mutableStateOf("") }
    Column(Modifier.fillMaxSize().padding(12.dp)) {
        Text("Notes for this page", style = MaterialTheme.typography.titleMedium)
        Row(Modifier.padding(vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
            OutlinedTextField(text, { text = it }, Modifier.weight(1f), placeholder = { Text("Write what you want to remember") }, minLines = 1, maxLines = 4)
            Spacer(Modifier.width(8.dp))
            Button(onClick = { if (text.isNotBlank()) { onAdd(text.trim()); text = "" } }, enabled = text.isNotBlank()) { Text("Save") }
        }
        if (notes.isEmpty()) EmptyState("📝", "No notes yet", "Your notes stay on this phone.")
        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            items(notes, key = { it.id }) { n ->
                Surface(shape = MaterialTheme.shapes.medium, color = MaterialTheme.colorScheme.surfaceVariant) {
                    Row(Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                        Text(n.text, Modifier.weight(1f), style = MaterialTheme.typography.bodyLarge)
                        IconButton(onClick = { onDelete(n.id) }) { Icon(Icons.Rounded.Delete, "Delete note") }
                    }
                }
            }
        }
    }
}
