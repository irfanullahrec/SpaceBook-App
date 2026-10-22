package pk.wantuch.spacebook.ui.library

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
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import pk.wantuch.spacebook.data.local.ReadingDao
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.remote.Catalog
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
class LibraryViewModel @javax.inject.Inject constructor(readingDao: ReadingDao) : ViewModel() {
    /** subject id -> where the student stopped */
    val reading: StateFlow<Map<String, ReadingPosition>> = readingDao.recent(500)
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
    Column(Modifier.fillMaxSize()) {
        Row(Modifier.fillMaxWidth().padding(start = 16.dp, end = 8.dp, top = 12.dp), verticalAlignment = Alignment.CenterVertically) {
            Text("Library", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.weight(1f))
            IconButton(onClick = onSearch) { Icon(Icons.Rounded.Search, "Search books") }
        }
        ClassStrip(classes, pickedId, onPick, cardWidth = 128.dp)
        if (cls == null) {
            EmptyState("📚", "Loading books…", "The list of classes is on its way.")
        } else {
            LazyVerticalGrid(
                columns = GridCells.Adaptive(104.dp),
                contentPadding = PaddingValues(12.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize(),
            ) {
                items(cls.subjects, key = { it.id }) { s -> SubjectTile(s, reading[s.id], onClick = { onOpenSubject(s.id) }) }
            }
        }
    }
}

@Composable
private fun SubjectTile(s: SubjectDto, position: ReadingPosition?, onClick: () -> Unit) {
    Column(Modifier.fillMaxWidth().clickable(onClick = onClick), horizontalAlignment = Alignment.CenterHorizontally) {
        BookCover(s.id, s.emoji, Modifier.fillMaxWidth().shadow(5.dp, RoundedCornerShape(12.dp)))
        Text(
            s.name, style = MaterialTheme.typography.titleSmall, maxLines = 2, overflow = TextOverflow.Ellipsis,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center, modifier = Modifier.padding(top = 8.dp),
        )
        Text(
            if (position != null) "Continue · ch. ${position.chapterIndex + 1}" else "${s.chapters.size} chapters",
            style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.primary,
        )
    }
}

/** The chapters of one book, as a list of big tappable rows. */
@Composable
fun SubjectScreen(app: AppViewModel, subjectId: String, onBack: () -> Unit, onOpenChapter: (Int) -> Unit, vm: LibraryViewModel = hiltViewModel()) {
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val reading by vm.reading.collectAsStateWithLifecycle()
    SubjectContent(catalog?.subject(subjectId), catalog?.classOf(subjectId), reading[subjectId], onBack, onOpenChapter)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun SubjectContent(subject: SubjectDto?, cls: ClassDto?, position: ReadingPosition?, onBack: () -> Unit, onOpenChapter: (Int) -> Unit) {
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

/** Offline search over every chapter title of every book. */
@Composable
fun SearchScreen(app: AppViewModel, onBack: () -> Unit, onOpen: (subjectId: String, chapter: Int) -> Unit) {
    val catalog by app.catalog.collectAsStateWithLifecycle()
    var query by remember { mutableStateOf("") }
    val hits = remember(query, catalog) { search(catalog, query) }
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
            hits.isEmpty() -> EmptyState("🤔", "Nothing found", "Try a shorter word.")
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
            }
        }
    }
}
