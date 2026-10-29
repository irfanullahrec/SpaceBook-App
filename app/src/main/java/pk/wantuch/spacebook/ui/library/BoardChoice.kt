package pk.wantuch.spacebook.ui.library

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.ClassDto
import pk.wantuch.spacebook.data.remote.SeriesDto
import pk.wantuch.spacebook.data.remote.SubjectDto

/**
 * Classes 1-8 ask "Government or Private?" before their books, as the website does (js/sb_private_books.js): two statistical cards, then for
 * Private a card per series ("Munawar"). A book of a series is a subject with `series` set; the Government list never shows it.
 */
internal val BoardClasses: Set<String> = (1..8).map { "cls$it" }.toSet()

internal fun isBoardClass(classId: String) = classId in BoardClasses
internal fun ClassDto.governmentBooks(): List<SubjectDto> = subjects.filter { it.series.isEmpty() }
internal fun ClassDto.seriesBooks(series: String): List<SubjectDto> = subjects.filter { it.series == series }
internal fun SubjectDto.shortName(): String = name.removePrefix("Kanz ")
internal fun Catalog.seriesName(id: String): String = series[id]?.name ?: id.replaceFirstChar { it.uppercase() }

/** What the Library keeps per class: "" = Government, otherwise a series id. Saved as "cls1:munawar" so it survives navigation. */
internal fun boardFor(saved: String, classId: String): String = if (saved.startsWith("$classId:")) saved.substringAfter(':') else ""
internal fun boardSaved(classId: String, series: String): String = if (series.isEmpty()) "" else "$classId:$series"

private val GovColors = Color(0xFF0F766E) to Color(0xFF115E59)
private val PrivColors = Color(0xFFB45309) to Color(0xFF92400E)
private val SeriesColors = Color(0xFFBE185D) to Color(0xFF9D174D)

@Composable
private fun Stat(value: String, label: String, tint: Color, ink: Color, modifier: Modifier = Modifier) {
    Column(modifier.clip(RoundedCornerShape(12.dp)).background(tint).padding(vertical = 8.dp, horizontal = 4.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Text(value, color = ink, fontSize = 20.sp, style = MaterialTheme.typography.titleLarge)
        Text(label, style = MaterialTheme.typography.labelSmall, textAlign = TextAlign.Center, maxLines = 2)
    }
}

/** One statistical card: a coloured head (icon, name, line), three numbers, an "open" row. */
@Composable
private fun BoardCard(
    tag: String, icon: @Composable () -> Unit, title: String, titleUr: String, line: String, colors: Pair<Color, Color>,
    stats: List<Pair<String, String>>, extra: String, open: String, a11y: String, onClick: () -> Unit,
) {
    Surface(
        shape = RoundedCornerShape(18.dp), color = MaterialTheme.colorScheme.surface, shadowElevation = 3.dp,
        modifier = Modifier.fillMaxWidth().testTag(tag).semantics { contentDescription = a11y }.clickable(onClick = onClick),
    ) {
        Column {
            Row(
                Modifier.fillMaxWidth().background(Brush.linearGradient(listOf(colors.first, colors.second))).padding(14.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Box(Modifier.size(46.dp).clip(RoundedCornerShape(14.dp)).background(Color.White.copy(alpha = 0.22f)), contentAlignment = Alignment.Center) { icon() }
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) {
                    Text(title, color = Color.White, style = MaterialTheme.typography.titleMedium)
                    if (titleUr.isNotBlank()) Text(titleUr, color = Color.White, style = MaterialTheme.typography.bodyMedium)
                    if (line.isNotBlank()) Text(line, color = Color.White.copy(alpha = 0.92f), style = MaterialTheme.typography.labelSmall, maxLines = 2, overflow = TextOverflow.Ellipsis)
                }
            }
            Row(Modifier.fillMaxWidth().padding(start = 12.dp, end = 12.dp, top = 12.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                stats.forEach { (v, l) -> Stat(v, l, colors.first.copy(alpha = 0.10f), colors.second, Modifier.weight(1f)) }
            }
            if (extra.isNotBlank()) Text(extra, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 3, overflow = TextOverflow.Ellipsis, modifier = Modifier.padding(start = 12.dp, end = 12.dp, top = 8.dp))
            Text("$open  →", color = colors.second, style = MaterialTheme.typography.labelLarge, modifier = Modifier.padding(12.dp))
        }
    }
}

/** First modal: "Government Books" and "Private Books". */
@Composable
internal fun BoardChoiceDialog(cls: ClassDto, catalog: Catalog?, onGovernment: () -> Unit, onPrivate: () -> Unit, onDismiss: () -> Unit) {
    val gov = cls.governmentBooks()
    val ids = catalog?.seriesIds().orEmpty()
    val priv = ids.flatMap { cls.seriesBooks(it) }
    AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = { TextButton(onClick = onDismiss) { Text("Close") } },
        title = {
            Column {
                Text(cls.name.uppercase(), style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Text("Which books do you want to open?", style = MaterialTheme.typography.titleLarge)
            }
        },
        text = {
            Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                BoardCard(
                    "board_government", { Text("🏛️", fontSize = 24.sp) }, "Government Books", "", "Khyber Pakhtunkhwa Textbook Board", GovColors,
                    listOf(gov.size.toString() to if (gov.size == 1) "book" else "books", gov.sumOf { it.chapters.size }.toString() to "chapters", "3" to "languages"),
                    "", "Open the board books", "Government Books, ${gov.size} books", onGovernment,
                )
                BoardCard(
                    "board_private", { Text("🏫", fontSize = 24.sp) }, "Private Books", "", "Books of private publishers", PrivColors,
                    listOf(ids.size.toString() to "series", priv.size.toString() to if (priv.size == 1) "book" else "books", priv.sumOf { it.chapters.size }.toString() to "chapters"),
                    "", "Choose a series", "Private Books, ${priv.size} books", onPrivate,
                )
            }
        },
    )
}

/** Second modal (after Private): one card per series. */
@Composable
internal fun SeriesChoiceDialog(cls: ClassDto, catalog: Catalog?, onSeries: (String) -> Unit, onBack: () -> Unit, onDismiss: () -> Unit) {
    val ids = catalog?.seriesIds().orEmpty()
    AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = { TextButton(onClick = onDismiss) { Text("Close") } },
        dismissButton = { TextButton(onClick = onBack) { Text("← Government or Private") } },
        title = {
            Column {
                Text("${cls.name} · PRIVATE BOOKS", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Text("Choose a series", style = MaterialTheme.typography.titleLarge)
            }
        },
        text = {
            Column(Modifier.verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                ids.forEach { id ->
                    val info: SeriesDto? = catalog?.series?.get(id)
                    val list = cls.seriesBooks(id)
                    val name = catalog?.seriesName(id) ?: id
                    BoardCard(
                        "series_$id", { Text("M", fontSize = 24.sp, color = Color.White, style = MaterialTheme.typography.titleLarge) }, name, info?.nameUrdu.orEmpty(),
                        listOfNotNull(info?.line?.takeIf { it.isNotBlank() }, info?.publisher?.takeIf { it.isNotBlank() }).joinToString(" · "), SeriesColors,
                        listOf(list.size.toString() to if (list.size == 1) "book" else "books", list.sumOf { it.chapters.size }.toString() to "chapters", (info?.classes?.size ?: 0).toString() to "classes"),
                        if (list.isNotEmpty()) list.joinToString(" · ") { it.shortName() } else "No $name books for ${cls.name} yet. ${info?.classes?.takeIf { it.isNotEmpty() }?.joinToString(", ") { "Class $it" }.orEmpty()} so far.",
                        if (list.isNotEmpty()) "Open $name books" else "See what is coming", "$name, ${list.size} books", { onSeries(id) },
                    )
                }
            }
        },
    )
}
