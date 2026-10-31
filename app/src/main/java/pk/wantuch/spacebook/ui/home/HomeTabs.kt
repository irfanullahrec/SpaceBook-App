package pk.wantuch.spacebook.ui.home

import androidx.compose.foundation.background
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.AccountCircle
import androidx.compose.material.icons.outlined.BarChart
import androidx.compose.material.icons.outlined.Newspaper
import androidx.compose.material.icons.outlined.Public
import androidx.compose.material.icons.rounded.AccountCircle
import androidx.compose.material.icons.rounded.BarChart
import androidx.compose.material.icons.rounded.Newspaper
import androidx.compose.material.icons.rounded.Public
import androidx.compose.material3.Icon
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.selected
import androidx.compose.ui.semantics.semantics
import androidx.compose.foundation.clickable
import pk.wantuch.spacebook.ui.theme.Sb
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
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.data.prep.GrammarSummary
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

/**
 * The tabs of Home: the News Feed (open when Home starts), then My Stats, Project Stats and My Account as on the website. The strip shows icons
 * only; every tab has its name as a content description so a screen reader (and the tests) can still find it.
 */
internal class HomeTab(val label: String, val icon: ImageVector, val iconOff: ImageVector)

internal val HOME_TABS = listOf(
    HomeTab("News Feed", Icons.Rounded.Newspaper, Icons.Outlined.Newspaper),
    HomeTab("My Stats", Icons.Rounded.BarChart, Icons.Outlined.BarChart),
    HomeTab("Project Stats", Icons.Rounded.Public, Icons.Outlined.Public),
    HomeTab("My Account", Icons.Rounded.AccountCircle, Icons.Outlined.AccountCircle),
)
internal const val TAB_FEED = 0
internal const val TAB_STATS = 1
internal const val TAB_PROJECT = 2
internal const val TAB_ACCOUNT = 3

/**
 * Four big icons in a row, like the tab bar of a social app. The open tab has a filled icon in the brand colour on a soft bubble and a
 * gradient bar underneath; the others are quiet outlines. Tapping a tab never changes what the other tabs hold.
 */
@Composable
internal fun HomeTabRow(selected: Int, onSelect: (Int) -> Unit) {
    Surface(color = MaterialTheme.colorScheme.surface, shadowElevation = 3.dp, modifier = Modifier.fillMaxWidth()) {
        Row(Modifier.fillMaxWidth().padding(horizontal = 6.dp), horizontalArrangement = Arrangement.SpaceEvenly) {
            HOME_TABS.forEachIndexed { i, t -> HomeTabButton(t, selected == i, Modifier.weight(1f)) { onSelect(i) } }
        }
    }
}

@Composable
private fun HomeTabButton(tab: HomeTab, on: Boolean, modifier: Modifier, onClick: () -> Unit) {
    val bubble by animateColorAsState(if (on) MaterialTheme.colorScheme.primaryContainer else Color.Transparent, label = "bubble")
    val tint by animateColorAsState(if (on) Sb.Violet else MaterialTheme.colorScheme.onSurfaceVariant, label = "tint")
    val bar by animateFloatAsState(if (on) 1f else 0f, spring(stiffness = Spring.StiffnessMediumLow), label = "bar")
    val pop by animateFloatAsState(if (on) 1.08f else 1f, spring(dampingRatio = Spring.DampingRatioMediumBouncy), label = "pop")
    Column(
        modifier
            .clickable(role = Role.Tab, onClick = onClick)
            .semantics { contentDescription = tab.label; selected = on },
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Spacer(Modifier.height(6.dp))
        Box(Modifier.size(width = 56.dp, height = 36.dp).scale(pop).clip(RoundedCornerShape(18.dp)).background(bubble), contentAlignment = Alignment.Center) {
            Icon(if (on) tab.icon else tab.iconOff, null, tint = tint, modifier = Modifier.size(26.dp))
        }
        Spacer(Modifier.height(5.dp))
        Box(Modifier.fillMaxWidth(.5f * bar).height(3.dp).clip(RoundedCornerShape(50)).background(Sb.Brand))
        Spacer(Modifier.height(if (on) 0.dp else 3.dp))
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
internal fun WordsCard(words: WordsDto, projectTotal: Int, onReset: () -> Unit = {}) {
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
        // like the Reset of a test or a plan on the website: every mark goes back to zero (Home asks the student first)
        if (words.total > 0) Row(Modifier.fillMaxWidth().padding(top = 6.dp), horizontalArrangement = Arrangement.End) {
            OutlinedButton(onClick = onReset, shape = RoundedCornerShape(16.dp)) { Text("↺ Reset") }
        }
    }
}

// ───────────────────────────── Project Stats ─────────────────────────────

/** How many distinct words the books hold, for the whole project and for each class. */
@Composable
internal fun ProjectStatsTab(words: ProjectWords?, catalog: Catalog?, grammar: GrammarSummary? = null, onOpenGrammar: (lang: String) -> Unit = {}) {
    if (words == null) {
        Card { Text("The word counts of the books are not on this phone yet.", style = MaterialTheme.typography.bodyMedium) }
        GrammarStatsCard(grammar, onOpenGrammar)
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
    GrammarStatsCard(grammar, onOpenGrammar)
}

/** "Grammar Stats": one row per language with what the books hold; tapping a language opens the website's Grammar Stats page (the lessons and practice) on it. */
@Composable
internal fun GrammarStatsCard(grammar: GrammarSummary?, onOpen: (lang: String) -> Unit) {
    if (grammar == null || grammar.langs.isEmpty()) return
    Card {
        Text("🧩 Grammar Stats", style = MaterialTheme.typography.titleMedium)
        Text(
            "Lessons and practice questions from the English, Urdu, Pashto and Arabic books, from easy to hard. Tap a language to learn it.",
            style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Spacer(Modifier.height(10.dp))
        grammar.ordered().forEach { (code, l) ->
            Surface(
                onClick = { onOpen(code) }, shape = RoundedCornerShape(14.dp), color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = .55f),
                modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
            ) {
                Row(Modifier.padding(horizontal = 14.dp, vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f)) {
                        Text(if (l.native.isNotBlank() && l.native != l.name) "${l.name}  ${l.native}" else l.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
                        Text(
                            "${fmt(l.total.topics)} topics · ${fmt(l.total.lessons)} lessons · ${fmt(l.total.exercises)} practice questions",
                            style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    }
                    Text("Learn ›", style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.primary, fontWeight = FontWeight.Bold)
                }
            }
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
    /** previewEnds is the end of the person's 1-month free trial, not of a dated preview build */
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

    // plans: the real ones are the website's window (js/sb_billing.js), the same prices and payment as on the website
    Text("💳 Plans & pricing", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(start = 16.dp, top = 14.dp, end = 16.dp))
    Card {
        Text(if (info.planId.equals("paid", true)) "✅ You have a paid plan" else "Free for everyone", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(6.dp))
        Text("Chapters 1 and 2 of every subject, 50 Test Preparation questions, 50 Study Plan questions and 1 paper are free.", style = MaterialTheme.typography.bodyMedium)
        Spacer(Modifier.height(6.dp))
        Text("Student plan (one class), Teacher plan (10 subjects, with papers) and the Test Preparation module: PKR 500 for one month each. Pay with Easypaisa; a plan starts when the payment is approved.",
            style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(Modifier.height(10.dp))
        Button(onClick = actions.openPlans, modifier = Modifier.fillMaxWidth()) { Text("See plans") }
        Spacer(Modifier.height(6.dp))
        OutlinedButton(onClick = actions.openKey, modifier = Modifier.fillMaxWidth()) { Text("Enter licence key") }
    }

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
            "Usage is counted from what this phone has saved${if (info.signedIn) " and your account" else ""}.",
            style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}
