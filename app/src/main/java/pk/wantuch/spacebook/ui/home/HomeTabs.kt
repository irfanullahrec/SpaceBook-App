package pk.wantuch.spacebook.ui.home

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.data.prep.PrepSnapshot
import pk.wantuch.spacebook.data.prep.ProjectWords
import pk.wantuch.spacebook.data.prep.WordCounts
import pk.wantuch.spacebook.data.prep.WordsDto
import pk.wantuch.spacebook.data.prettyClass
import pk.wantuch.spacebook.data.remote.Catalog
import java.text.DateFormat
import java.text.NumberFormat
import java.util.Date
import java.util.Locale

/** The three tabs of Home, named as on the website. */
internal val HOME_TABS = listOf("📊 My Stats", "📚 Project Stats", "👤 My Account")
internal const val TAB_STATS = 0
internal const val TAB_PROJECT = 1
internal const val TAB_ACCOUNT = 2

@Composable
internal fun HomeTabRow(selected: Int, onSelect: (Int) -> Unit) {
    // scrollable, so a big text size or a small phone never cuts a name ("Project Stats") short
    ScrollableTabRow(selectedTabIndex = selected, containerColor = Color.Transparent, edgePadding = 8.dp, divider = {}) {
        HOME_TABS.forEachIndexed { i, label ->
            Tab(selected = selected == i, onClick = { onSelect(i) }, text = { Text(label, maxLines = 1, softWrap = false, style = MaterialTheme.typography.labelLarge) })
        }
    }
}

private val numbers = NumberFormat.getIntegerInstance(Locale.US)
internal fun fmt(n: Int): String = numbers.format(n)

internal fun sizeText(bytes: Long): String =
    if (bytes >= 1_048_576) "%.1f MB".format(Locale.US, bytes / 1_048_576.0) else "${maxOf(1L, bytes / 1024)} KB"

private val LANG_NAMES = listOf("en" to "English", "ur" to "اردو", "ps" to "پښتو", "ar" to "العربية")
private val WORD_BLUE = Color(0xFF0284C7)
private val WORD_GREEN = Color(0xFF059669)
private val WORD_VIOLET = Color(0xFF7C3AED)
private val WORD_AMBER = Color(0xFFD97706)
private val WORD_ROSE = Color(0xFFE11D48)

/** A card that lists plain facts in two columns. */
@Composable
private fun Tile(value: String, label: String, color: Color, modifier: Modifier = Modifier) {
    Column(modifier.clip(RoundedCornerShape(18.dp)).background(color.copy(alpha = .12f)).padding(horizontal = 14.dp, vertical = 12.dp)) {
        Text(value, color = color, fontSize = 24.sp, fontWeight = FontWeight.ExtraBold, maxLines = 1)
        Text(label, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
private fun TileRows(tiles: List<Triple<String, String, Color>>) {
    tiles.chunked(2).forEach { row ->
        Row(Modifier.fillMaxWidth().padding(bottom = 8.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            row.forEach { (v, l, c) -> Tile(v, l, c, Modifier.weight(1f)) }
            if (row.size == 1) Spacer(Modifier.weight(1f))
        }
    }
}

@Composable
private fun Card(modifier: Modifier = Modifier, content: @Composable () -> Unit) {
    Surface(shape = RoundedCornerShape(24.dp), color = MaterialTheme.colorScheme.surface, shadowElevation = 2.dp, modifier = modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp)) {
        Column(Modifier.padding(16.dp)) { content() }
    }
}

// ───────────────────────────── My Stats: the student's own words ─────────────────────────────

/** "Words from Subjects & Units": what the student marked learnt or already known in the Word Stats of the subjects. */
@Composable
internal fun WordsCard(words: WordsDto, projectTotal: Int) {
    val pct = if (projectTotal > 0) minOf(100.0, words.total * 100.0 / projectTotal) else 0.0
    Card {
        Text("🧠 My Vocabulary", style = MaterialTheme.typography.titleMedium)
        Text("Words from Subjects & Units", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(Modifier.height(12.dp))
        TileRows(listOf(
            Triple(fmt(words.learnt), "✅ Words learnt", WORD_GREEN),
            Triple(fmt(words.knew), "⭐ Already knew", WORD_AMBER),
            Triple(fmt(words.today), "Learnt today", WORD_BLUE),
            Triple(fmt(words.week), "Learnt in 7 days", WORD_VIOLET),
        ))
        LANG_NAMES.forEach { (k, name) ->
            val m = words.byLang[k]
            Row(Modifier.fillMaxWidth().padding(vertical = 3.dp), verticalAlignment = Alignment.CenterVertically) {
                Text(name, style = MaterialTheme.typography.titleSmall, modifier = Modifier.width(72.dp))
                Text("${fmt((m?.learnt ?: 0) + (m?.knew ?: 0))}", style = MaterialTheme.typography.titleSmall, modifier = Modifier.width(52.dp))
                Text("${fmt(m?.learnt ?: 0)} learnt · ${fmt(m?.knew ?: 0)} knew", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
        Spacer(Modifier.height(8.dp))
        Box(Modifier.fillMaxWidth().height(8.dp).clip(RoundedCornerShape(50)).background(MaterialTheme.colorScheme.surfaceVariant)) {
            if (words.total > 0) Box(Modifier.fillMaxWidth(maxOf(pct / 100.0, .006).toFloat()).height(8.dp).clip(RoundedCornerShape(50)).background(WORD_GREEN))
        }
        Text(
            if (projectTotal > 0) "${fmt(words.total)} of ${fmt(projectTotal)} project words marked (${if (pct < 0.1 && words.total > 0) "under 0.1" else "%.1f".format(Locale.US, pct)}%). Tap ✅ Learnt or ⭐ Knew it next to a word in the Word Stats tab of any subject."
            else "${fmt(words.total)} words marked. Tap ✅ Learnt or ⭐ Knew it next to a word in the Word Stats tab of any subject.",
            style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 6.dp),
        )
    }
}

// ───────────────────────────── Project Stats ─────────────────────────────

/** How many distinct words the books hold, for the whole project and for each class. */
@Composable
internal fun ProjectStatsTab(words: ProjectWords?, catalog: Catalog?) {
    if (words == null) {
        Card { Text("The word counts of the books are not on this phone yet.", style = MaterialTheme.typography.bodyMedium) }
        return
    }
    val p = words.project
    Card {
        Text("📚 Project Vocabulary", style = MaterialTheme.typography.titleMedium)
        Text(
            "Distinct words in the book text · numbers, equations and symbols excluded" + if (words.generated.isNotBlank()) " · indexed ${words.generated}" else "",
            style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Spacer(Modifier.height(12.dp))
        TileRows(listOf(
            Triple(fmt(p.all), "Distinct words, all four languages", WORD_BLUE),
            Triple(fmt(p.en), "English words", WORD_GREEN),
            Triple(fmt(p.ur), "Urdu words", WORD_VIOLET),
            Triple(fmt(p.ps), "Pashto words", WORD_AMBER),
            Triple(fmt(p.ar), "Arabic words", WORD_ROSE),
        ))
    }
    Card {
        Text("Words per class", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(8.dp))
        ClassRow("Class", null, header = true)
        val ordered = words.classes.keys.sortedBy { id -> id.filter { it.isDigit() }.toIntOrNull() ?: Int.MAX_VALUE }
        ordered.forEach { id ->
            ClassRow(catalog?.cls(id)?.name ?: prettyClass(id), words.classes[id], header = false)
        }
    }
}

@Composable
private fun ClassRow(name: String, c: WordCounts?, header: Boolean) {
    val style = if (header) MaterialTheme.typography.labelMedium else MaterialTheme.typography.bodySmall
    val color = if (header) MaterialTheme.colorScheme.onSurfaceVariant else MaterialTheme.colorScheme.onSurface
    val weight = if (header) FontWeight.Bold else FontWeight.Normal
    Row(Modifier.fillMaxWidth().padding(vertical = 5.dp), verticalAlignment = Alignment.CenterVertically) {
        Text(name, style = style, color = color, fontWeight = if (header) FontWeight.Bold else FontWeight.Medium, maxLines = 1, modifier = Modifier.weight(1f))
        listOf(
            if (c == null) "All" else fmt(c.all), if (c == null) "En" else fmt(c.en), if (c == null) "Ur" else fmt(c.ur),
            if (c == null) "Ps" else fmt(c.ps), if (c == null) "Ar" else fmt(c.ar),
        ).forEachIndexed { i, t ->
            Text(t, style = style, color = color, fontWeight = weight, textAlign = TextAlign.End, maxLines = 1, modifier = Modifier.width(if (i == 0) 54.dp else 46.dp))
        }
    }
}

// ───────────────────────────── My Account ─────────────────────────────

/** What the Account page knows about this student and this phone. */
data class AccountInfo(
    val name: String? = null,
    val subtitle: String = "Reading without an account",
    val signedIn: Boolean = false,
    /** the server's plan id: "free" ... */
    val planId: String = "free",
    val coins: Int = 0,
    /** epoch millis when this preview build stops working, 0 = never */
    val previewEnds: Long = 0,
    val previewDaysLeft: Int = 0,
)

private fun planName(id: String) = id.ifBlank { "free" }.replaceFirstChar { it.uppercase() }

@Composable
internal fun AccountTab(info: AccountInfo, prep: PrepSnapshot?, actions: HomeActions) {
    val tests = prep?.tests?.tests.orEmpty()
    val mcqs = tests.sumOf { it.questions }
    val minutes = tests.sumOf { it.minutes }
    val name = planName(info.planId)

    // who
    Card {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.size(56.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primary.copy(alpha = .15f)), contentAlignment = Alignment.Center) {
                Text(info.name?.trim()?.firstOrNull()?.uppercase() ?: "👤", style = MaterialTheme.typography.titleLarge, color = MaterialTheme.colorScheme.primary)
            }
            Spacer(Modifier.width(14.dp))
            Column(Modifier.weight(1f)) {
                Text(info.name ?: "Guest", style = MaterialTheme.typography.titleMedium)
                Text(info.subtitle, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
        Spacer(Modifier.height(12.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            if (!info.signedIn) Button(onClick = actions.signIn, modifier = Modifier.weight(1f), shape = RoundedCornerShape(16.dp)) { Text("Sign in") }
            OutlinedButton(onClick = actions.openProfile, modifier = Modifier.weight(1f), shape = RoundedCornerShape(16.dp)) { Text("Profile & settings") }
        }
    }

    // subscription
    Card {
        Text("🧾 Subscription", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(10.dp))
        TileRows(listOf(
            Triple(name, "current plan", WORD_GREEN),
            Triple(if (info.previewEnds > 0) DateFormat.getDateInstance(DateFormat.MEDIUM).format(Date(info.previewEnds)) else "—", "valid until", WORD_BLUE),
            Triple(if (info.signedIn) "On" else "Off", "saving progress to your account", WORD_VIOLET),
            Triple(fmt(info.coins), "reward coins", WORD_AMBER),
        ))
        if (info.previewEnds > 0) {
            Text(
                "This is a preview build: it works for ${info.previewDaysLeft} more ${if (info.previewDaysLeft == 1) "day" else "days"}. After that it needs the unlock code from the SpaceBook team.",
                style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }

    // plans and pricing (the same two the website shows until the owner announces prices)
    Text("💳 Plans & pricing", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(start = 16.dp, top = 14.dp, end = 16.dp))
    PlanOffer(
        "Free", "Free", current = info.planId.equals("free", true), note = null,
        features = listOf("Every textbook, Class 1 to 12", "Word meanings and sentence meanings (offline)", "Animated solutions", "Test preparation MCQ bank", "Study plans and reminders", "Progress saved on this device"),
    )
    PlanOffer(
        "Premium", "Price to be announced", current = info.planId.equals("premium", true), note = "Coming soon",
        features = listOf("Progress saved in your account on every device", "More study plans and test papers", "Priority support"),
    )

    // usage
    Card {
        Text("📈 Usage", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(10.dp))
        TileRows(listOf(
            Triple(fmt(mcqs), "test MCQs answered", WORD_BLUE),
            Triple(fmt(prep?.usage?.studiedQuestions ?: 0), "questions practised (all drills)", WORD_GREEN),
            Triple(fmt(minutes), "minutes of test study", WORD_VIOLET),
            Triple(fmt(tests.size), "tests started", WORD_AMBER),
            Triple(fmt(prep?.plans?.size ?: 0), "study plans", WORD_ROSE),
            Triple(fmt(prep?.words?.total ?: 0), "words marked learnt / known", WORD_GREEN),
            Triple(fmt(info.coins), "reward coins", WORD_AMBER),
            Triple(sizeText(prep?.usage?.bytes ?: 0), "saved on this phone (${prep?.usage?.keys ?: 0} items)", WORD_BLUE),
        ))
        Text(
            "Usage is counted from what this phone has saved${if (info.signedIn) " and your account" else ""}. Nothing here is billed: every feature is currently free.",
            style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

@Composable
private fun PlanOffer(title: String, price: String, current: Boolean, note: String?, features: List<String>) {
    val accent = if (current) WORD_GREEN else MaterialTheme.colorScheme.onSurfaceVariant
    Surface(
        shape = RoundedCornerShape(24.dp), color = MaterialTheme.colorScheme.surface, shadowElevation = 2.dp,
        modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp),
    ) {
        Column {
            Box(Modifier.fillMaxWidth().height(5.dp).background(accent))
            Column(Modifier.padding(16.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f)) {
                        Text(title, style = MaterialTheme.typography.titleMedium)
                        Text(if (current) "✅ Your current plan" else note ?: "Available", style = MaterialTheme.typography.bodySmall, color = if (current) WORD_GREEN else MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Text(price, style = MaterialTheme.typography.titleSmall, color = accent, textAlign = TextAlign.End, modifier = Modifier.padding(start = 12.dp))
                }
                Spacer(Modifier.height(8.dp))
                features.forEach { Text("✔ $it", style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(vertical = 2.dp)) }
            }
        }
    }
}
