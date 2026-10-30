package pk.wantuch.spacebook.ui.library

import androidx.compose.foundation.background
import pk.wantuch.spacebook.R
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.graphics.Brush
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.border
import androidx.compose.foundation.Image
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
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material.icons.rounded.Close
import androidx.compose.material.icons.rounded.Search
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
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
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.repo.LibraryRepository
import pk.wantuch.spacebook.data.remote.ClassDto
import pk.wantuch.spacebook.data.remote.SubjectDto
import pk.wantuch.spacebook.data.splitTitle
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.components.BookCover
import pk.wantuch.spacebook.ui.components.ClassStrip
import pk.wantuch.spacebook.ui.components.EmptyState
import pk.wantuch.spacebook.ui.components.SubjectAvatar
import pk.wantuch.spacebook.ui.theme.Sb

@HiltViewModel
class LibraryViewModel @javax.inject.Inject constructor(library: LibraryRepository) : ViewModel() {
    /** subject id -> where the student stopped */
    val reading: StateFlow<Map<String, ReadingPosition>> = library.recentPositions(500)
        .map { list -> list.associateBy { it.subjectId } }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyMap())
}

/** Library tab: pick a class, then a book. */
@Composable
fun LibraryScreen(app: AppViewModel, onOpenSubject: (String) -> Unit, onSearch: () -> Unit, vm: LibraryViewModel = hiltViewModel()) {
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val state by app.state.collectAsStateWithLifecycle()
    val reading by vm.reading.collectAsStateWithLifecycle()
    val classes = catalog?.classes.orEmpty()
    var picked by remember(state.classId, classes.size) {
        mutableStateOf(classes.firstOrNull { it.id == state.classId }?.id ?: classes.firstOrNull()?.id.orEmpty())
    }
    LibraryContent(classes, picked, reading, onPick = { picked = it; app.setClass(it) }, onOpenSubject = onOpenSubject, onSearch = onSearch)
}

@Composable
internal fun LibraryContent(
    classes: List<ClassDto>,
    pickedId: String,
    reading: Map<String, ReadingPosition>,
    onPick: (String) -> Unit,
    onOpenSubject: (String) -> Unit,
    onSearch: () -> Unit,
) {
    val cls = classes.firstOrNull { it.id == pickedId }
    val navy = Color(0xFF0B2056)
    Column(Modifier.fillMaxSize()) {
        Image(painterResource(R.drawable.sb_logo), "SpaceBook", Modifier.padding(start = 14.dp, top = 8.dp).width(150.dp), contentScale = ContentScale.FillWidth)
        Text("Your Library", fontSize = 32.sp, fontWeight = FontWeight.ExtraBold, color = navy, letterSpacing = (-1).sp, modifier = Modifier.padding(start = 14.dp, top = 4.dp))
        Text("Access your textbooks and continue learning anytime.", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(start = 14.dp, bottom = 10.dp))
        Surface(
            Modifier.fillMaxWidth().padding(horizontal = 14.dp).height(46.dp).clickable(onClick = onSearch), shape = RoundedCornerShape(12.dp),
            color = MaterialTheme.colorScheme.surface, border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFCFE0F5)),
        ) {
            Row(Modifier.padding(horizontal = 12.dp), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Rounded.Search, null, tint = Color(0xFF4A5F8A))
                Text("Search books, subjects or topics...", Modifier.padding(start = 10.dp), color = Color(0xFF6B7C9C))
            }
        }
        val chipState = androidx.compose.foundation.lazy.rememberLazyListState()
        androidx.compose.runtime.LaunchedEffect(pickedId, classes.size) {
            val i = classes.indexOfFirst { it.id == pickedId }
            if (i > 2) chipState.animateScrollToItem(i - 2)
        }
        LazyRow(state = chipState, contentPadding = PaddingValues(horizontal = 14.dp, vertical = 10.dp), horizontalArrangement = Arrangement.spacedBy(7.dp)) {
            items(classes, key = { it.id }) { c ->
                val on = c.id == pickedId
                Box(
                    Modifier.size(width = 42.dp, height = 38.dp).clip(RoundedCornerShape(9.dp))
                        .background(if (on) Color(0xFF0785FF) else MaterialTheme.colorScheme.surface)
                        .border(1.dp, if (on) Color(0xFF0785FF) else Color(0xFFCFE0F5), RoundedCornerShape(9.dp)).clickable { onPick(c.id) },
                    contentAlignment = Alignment.Center,
                ) { Text(c.name.filter { it.isDigit() }.ifEmpty { c.name.take(2) }, color = if (on) Color.White else navy, fontWeight = FontWeight.SemiBold, fontSize = 15.sp) }
            }
        }
        if (cls == null) {
            EmptyState("📚", "Loading books…", "The list of classes is on its way.")
        } else {
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                contentPadding = PaddingValues(start = 14.dp, end = 14.dp, bottom = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
                modifier = Modifier.fillMaxSize(),
            ) {
                items(cls.subjects, key = { it.id }) { s -> SubjectTile(s, cls.name, reading[s.id], onClick = { onOpenSubject(s.id) }) }
            }
        }
    }
}

@Composable
private fun SubjectTile(s: SubjectDto, className: String, position: ReadingPosition?, onClick: () -> Unit) {
    val total = s.chapters.size.coerceAtLeast(1)
    val done = if (position != null) (position.chapterIndex + 1).coerceAtMost(total) else 0
    val pct = (100 * done / total)
    Surface(shape = RoundedCornerShape(16.dp), color = MaterialTheme.colorScheme.surface,
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFD7E6F8)), shadowElevation = 1.dp,
        modifier = Modifier.fillMaxWidth().clickable(onClick = onClick)) {
        Column(Modifier.padding(8.dp)) {
            Row(verticalAlignment = Alignment.Top) {
                BookCover(s.id, s.emoji, Modifier.width(62.dp), ratio = 1.4f, corner = 6.dp)
                Column(Modifier.weight(1f).padding(start = 8.dp)) {
                    Text(s.name, fontSize = 16.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFF0B2056), maxLines = 2, overflow = TextOverflow.Ellipsis, lineHeight = 18.sp)
                    Text("$className • Textbook", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1, overflow = TextOverflow.Ellipsis)
                }
            }
            Row(Modifier.padding(top = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.weight(1f).height(6.dp).clip(CircleShape).background(Color(0xFFDDE6F2))) {
                    Box(Modifier.fillMaxWidth(pct / 100f).height(6.dp).clip(CircleShape).background(Color(0xFF079F51)))
                }
                Text("$pct%", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0B2056), modifier = Modifier.padding(start = 6.dp))
            }
            Text("$done of ${s.chapters.size} chapters", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 2.dp, bottom = 6.dp))
            Row(Modifier.fillMaxWidth().height(38.dp).clip(RoundedCornerShape(10.dp)).background(Brush.verticalGradient(listOf(Color(0xFF1F7BF4), Color(0xFF0B5FD6)))), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.Center) {
                Text(if (position != null) "▶  Continue" else "▶  Open Book", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 14.sp)
            }
        }
    }
}

/** The chapters of one book, as a list of big tappable rows. */
@Composable
fun SubjectScreen(app: AppViewModel, subjectId: String, onBack: () -> Unit, onOpenChapter: (Int) -> Unit, vm: LibraryViewModel = hiltViewModel()) {
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val reading by vm.reading.collectAsStateWithLifecycle()
    val entitlements by app.entitlements.collectAsStateWithLifecycle()      // the lock marks follow the plans: bought, ended or suspended
    val appState by app.state.collectAsStateWithLifecycle()                  // and the owner's pass
    SubjectContent(catalog?.subject(subjectId), catalog?.classOf(subjectId), reading[subjectId], onBack, onOpenChapter, locked = { i -> entitlements.let { appState.ownerPass.let { !app.canRead(subjectId, i) } } })
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun SubjectContent(subject: SubjectDto?, cls: ClassDto?, position: ReadingPosition?, onBack: () -> Unit, onOpenChapter: (Int) -> Unit, locked: (Int) -> Boolean = { false }) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(subject?.name ?: "Book", maxLines = 1, overflow = TextOverflow.Ellipsis) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background),
            )
        },
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        if (subject == null) { EmptyState("📘", "Book not found", "Go back and pick another book.", Modifier.padding(pad)); return@Scaffold }
        LazyColumn(Modifier.fillMaxSize().padding(pad), contentPadding = PaddingValues(bottom = 24.dp)) {
            item {
                Box(Modifier.fillMaxWidth().padding(12.dp).clip(MaterialTheme.shapes.large).background(Sb.brushFor(subject.id)).padding(18.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        BookCover(subject.id, subject.emoji, Modifier.width(96.dp).shadow(8.dp, RoundedCornerShape(8.dp)), corner = 8.dp)
                        Spacer(Modifier.width(16.dp))
                        Column {
                            Text(subject.name, color = Color.White, style = MaterialTheme.typography.headlineSmall)
                            if (subject.ur.isNotBlank()) Text(subject.ur, color = Color.White, style = MaterialTheme.typography.titleMedium)
                            Text(listOfNotNull(cls?.name, "${subject.chapters.size} chapters").joinToString(" · "), color = Color.White.copy(alpha = 0.9f), style = MaterialTheme.typography.bodyMedium)
                        }
                    }
                }
            }
            if (position != null) item {
                Surface(
                    shape = MaterialTheme.shapes.large, color = MaterialTheme.colorScheme.primaryContainer,
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 4.dp).clickable { onOpenChapter(position.chapterIndex) },
                ) {
                    Column(Modifier.padding(16.dp)) {
                        Text("▶ Continue where you stopped", style = MaterialTheme.typography.titleSmall)
                        Text(splitTitle(position.chapterTitle).primary, style = MaterialTheme.typography.bodyMedium, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    }
                }
            }
            items(subject.chapters.size, key = { it }) { i ->
                val c = subject.chapters[i]
                val t = splitTitle(c.t)
                Surface(
                    shape = MaterialTheme.shapes.medium, color = MaterialTheme.colorScheme.surface, shadowElevation = 1.dp,
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 5.dp).clickable { onOpenChapter(i) },
                ) {
                    Row(Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
                        Box(Modifier.size(44.dp).clip(CircleShape).background(Sb.brushFor(subject.id)), contentAlignment = Alignment.Center) {
                            Text(t.number.ifBlank { "${i + 1}" }, color = Color.White, style = MaterialTheme.typography.titleSmall, maxLines = 1)
                        }
                        Spacer(Modifier.width(14.dp))
                        Column(Modifier.weight(1f)) {
                            Text(t.primary, style = MaterialTheme.typography.titleSmall, maxLines = 2, overflow = TextOverflow.Ellipsis)
                            if (t.local.isNotBlank()) Text(t.local, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1, overflow = TextOverflow.Ellipsis)
                        }
                        if (position?.chapterIndex == i) Text("📖", style = MaterialTheme.typography.titleMedium)
                        if (locked(i)) Text("🔒", style = MaterialTheme.typography.titleMedium, modifier = Modifier.semantics { contentDescription = "needs a plan" })
                    }
                }
            }
        }
    }
}

private data class Hit(val classDto: ClassDto, val subject: SubjectDto, val chapter: Int, val title: String)

private fun search(catalog: Catalog?, q: String): List<Hit> {
    val needle = q.trim().lowercase()
    if (needle.length < 2 || catalog == null) return emptyList()
    val out = ArrayList<Hit>()
    for (c in catalog.classes) for (s in c.subjects) {
        val subjectHit = s.name.lowercase().contains(needle) || s.ur.contains(needle)
        s.chapters.forEachIndexed { i, ch ->
            if (subjectHit || ch.t.lowercase().contains(needle)) out += Hit(c, s, i, ch.t)
        }
        if (out.size > 150) return out
    }
    return out
}

/** Words inside the books: the website's own search (data/search/BookSearch.kt) over the books on this phone, or over all of them on request. */
@HiltViewModel
class SearchViewModel @javax.inject.Inject constructor(
    private val books: pk.wantuch.spacebook.data.search.BookSearch,
    private val offline: pk.wantuch.spacebook.data.offline.OfflineRepository,
) : ViewModel() {
    var inBooks by mutableStateOf<List<pk.wantuch.spacebook.data.search.BookHit>>(emptyList())
        private set
    var searching by mutableStateOf(false)
        private set
    var note by mutableStateOf("")
        private set
    private var job: kotlinx.coroutines.Job? = null

    fun run(query: String, all: Boolean) {
        job?.cancel()
        if (query.trim().length < 3) { inBooks = emptyList(); note = ""; searching = false; return }
        job = viewModelScope.launch {
            kotlinx.coroutines.delay(300)
            searching = true
            val map = offline.map()
            val ids = if (all) map.subjects.filter { it.value.files.isNotEmpty() }.keys.toList()
            else offline.allSubjectIds(map).filter { offline.stat(map, listOf(it)).complete }
            note = when {
                all -> "Searched all ${ids.size} books."
                ids.isEmpty() -> "No book is on this phone yet. Download books in Me > Books on this phone to search inside them."
                else -> "Searched ${ids.size} ${if (ids.size == 1) "book" else "books"} on this phone."
            }
            inBooks = books.search(query, ids)
            searching = false
        }
    }

    override fun onCleared() { job?.cancel(); books.close() }
}

/** Search over every chapter title of every book (offline), and over the words inside the books on this phone. */
@Composable
fun SearchScreen(app: AppViewModel, onBack: () -> Unit, onOpen: (subjectId: String, chapter: Int) -> Unit, vm: SearchViewModel = hiltViewModel()) {
    val catalog by app.catalog.collectAsStateWithLifecycle()
    var query by remember { mutableStateOf("") }
    val hits = remember(query, catalog) { search(catalog, query) }
    var all by remember { mutableStateOf(false) }
    androidx.compose.runtime.LaunchedEffect(query, all) { vm.run(query, all) }
    val focus = remember { FocusRequester() }
    androidx.compose.runtime.LaunchedEffect(Unit) { runCatching { focus.requestFocus() } }
    Column(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
        Row(Modifier.fillMaxWidth().padding(8.dp), verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") }
            OutlinedTextField(
                value = query, onValueChange = { query = it }, singleLine = true,
                placeholder = { Text("Search chapters and books") },
                trailingIcon = { if (query.isNotEmpty()) IconButton(onClick = { query = "" }) { Icon(Icons.Rounded.Close, "Clear") } },
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
                shape = RoundedCornerShape(50),
                modifier = Modifier.weight(1f).focusRequester(focus),
            )
        }
        when {
            query.trim().length < 2 -> EmptyState("🔎", "Find any lesson", "Type a chapter or a subject name, like “fractions” or “Urdu”.")
            hits.isEmpty() && vm.inBooks.isEmpty() && !vm.searching && vm.note.isEmpty() -> EmptyState("🤔", "Nothing found", "Try a shorter word.")
            else -> LazyColumn(contentPadding = PaddingValues(bottom = 24.dp)) {
                items(hits, key = { "${it.subject.id}:${it.chapter}" }) { h ->
                    val t = splitTitle(h.title)
                    Row(Modifier.fillMaxWidth().clickable { onOpen(h.subject.id, h.chapter) }.padding(horizontal = 16.dp, vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
                        SubjectAvatar(h.subject.emoji, h.subject.id, size = 40.dp)
                        Spacer(Modifier.width(12.dp))
                        Column {
                            Text(t.primary, style = MaterialTheme.typography.titleSmall, maxLines = 2, overflow = TextOverflow.Ellipsis)
                            Text("${h.classDto.name} · ${h.subject.name}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
                if (query.trim().length >= 3) {
                    item(key = "inbooks") {
                        Text("IN THE BOOKS", style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.primary, modifier = Modifier.padding(start = 16.dp, top = 16.dp, bottom = 4.dp))
                        if (vm.searching) Text("Searching…", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp))
                    }
                    items(vm.inBooks, key = { "b${it.id}:${it.chapter}" }) { b ->
                        val subj = catalog?.subject(b.id)
                        val cls = catalog?.classOf(b.id)
                        Row(Modifier.fillMaxWidth().clickable { onOpen(b.id, b.chapter) }.padding(horizontal = 16.dp, vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
                            SubjectAvatar(subj?.emoji ?: "📘", b.id, size = 40.dp)
                            Spacer(Modifier.width(12.dp))
                            Column {
                                Text(splitTitle(b.title).primary.ifBlank { subj?.name.orEmpty() }, style = MaterialTheme.typography.titleSmall, maxLines = 2, overflow = TextOverflow.Ellipsis)
                                Text("${cls?.name.orEmpty()} · ${subj?.name.orEmpty()} · ${b.hits} ${if (b.hits == 1) "match" else "matches"}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                        }
                    }
                    item(key = "inbooksnote") {
                        if (!vm.searching && vm.note.isNotEmpty()) Text(vm.note, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp))
                        if (!vm.searching && !all) androidx.compose.material3.TextButton(onClick = { all = true }, modifier = Modifier.padding(horizontal = 8.dp)) { Text("Search all classes") }
                    }
                }
            }
        }
    }
}
