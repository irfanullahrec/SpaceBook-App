package pk.wantuch.spacebook.ui.games

import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import kotlin.math.abs
import kotlin.random.Random

/* ---------- making questions out of a page's own text ---------- */

/** A sentence from the page with one important word taken out. */
internal data class Cloze(val blanked: String, val answer: String, val sentence: String, val pool: List<String>)

internal object PageText {
    private val splitter = Regex("(?<=[.!?۔؟])\\s+|\\n+")
    private val letters = Regex("\\p{L}+")
    private val stop = setOf(
        "this", "that", "these", "those", "with", "which", "their", "there", "from", "have", "were", "they", "them", "then",
        "than", "been", "would", "could", "should", "about", "into", "also", "such", "some", "when", "what", "where", "will",
        "your", "more", "most", "other", "only", "each", "very", "much", "many", "because",
    )

    fun sentences(text: String): List<String> = text.split(splitter)
        .map { it.replace(Regex("\\s+"), " ").trim() }
        .filter { s -> letters.findAll(s).count() in 6..28 && s.length <= 220 }
        .distinct()

    fun pool(text: String): List<String> =
        letters.findAll(text).map { it.value.lowercase() }.filter { it.length >= 4 }.distinct().toList()

    /** up to [count] cloze items whose answer word has a length in [lens]; sentences in [used] are skipped */
    fun clozes(text: String, lens: IntRange, count: Int, minPool: Int, used: MutableSet<String>, rnd: Random): List<Cloze> {
        val pool = pool(text)
        val out = mutableListOf<Cloze>()
        for (s in sentences(text).shuffled(rnd)) {
            if (out.size >= count) break
            if (s in used) continue
            val lower = s.lowercase()
            val words = letters.findAll(s).map { it.value }
                .filter { it.length in lens && it.lowercase() !in stop && Regex("(?<!\\p{L})${Regex.escape(it)}(?!\\p{L})").findAll(s).count() == 1 }
                .toList()
            val ans = words.randomOrNull(rnd) ?: continue
            val wrong = pool.filter { it != ans.lowercase() && it !in lower }
            if (wrong.size < minPool - 1) continue
            val blanked = s.replace(Regex("(?<!\\p{L})${Regex.escape(ans)}(?!\\p{L})"), "_____")
            used += s
            out += Cloze(blanked, ans, s, wrong)
        }
        return out
    }

    /** same as [clozes], widening the allowed word lengths until the level has something to ask */
    fun clozesWide(text: String, lens: IntRange, count: Int, minPool: Int, used: MutableSet<String>, rnd: Random): List<Cloze> {
        var r = lens
        while (true) {
            val got = clozes(text, r, count, minPool, used, rnd)
            if (got.isNotEmpty() || (r.first <= 4 && r.last >= 14)) return got
            r = maxOf(4, r.first - 1)..(r.last + 1)
        }
    }
}

/* ---------- a level-by-level frame shared by the games ---------- */

internal data class Level<T>(val title: String, val blurb: String, val items: List<T>)

private enum class Phase { Intro, Play, Cleared, Done }

@Composable
private fun <T> LevelFlow(
    levels: List<Level<T>>,
    onStep: (step: Int, total: Int) -> Unit,
    onReplay: () -> Unit,
    item: @Composable (item: T, solved: () -> Unit, next: () -> Unit) -> Unit,
) {
    var lv by remember { mutableIntStateOf(0) }
    var idx by remember { mutableIntStateOf(0) }
    var phase by remember { mutableStateOf(Phase.Intro) }
    val total = levels.sumOf { it.items.size }
    val offset = levels.take(lv).sumOf { it.items.size }
    val level = levels[lv]

    Column(Modifier.fillMaxWidth().verticalScroll(rememberScrollState()).padding(8.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        val done = if (phase == Phase.Done) total else offset + if (phase == Phase.Play) idx else if (phase == Phase.Cleared) level.items.size else 0
        Text("Level ${lv + 1} of ${levels.size}  ·  $done / $total answered", style = MaterialTheme.typography.labelLarge)
        LinearProgressIndicator(progress = { if (total == 0) 0f else done / total.toFloat() }, modifier = Modifier.fillMaxWidth())
        when (phase) {
            Phase.Intro -> {
                Text("🎯  ${level.title}", style = MaterialTheme.typography.headlineSmall)
                Text(level.blurb, style = MaterialTheme.typography.bodyLarge)
                Text("Every new right answer earns a coin, and finishing the whole quest earns 5 more.", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Button(onClick = { idx = 0; phase = Phase.Play }, Modifier.fillMaxWidth()) { Text("Start level ${lv + 1}") }
            }
            Phase.Play -> key(lv, idx) {
                item(
                    level.items[idx],
                    { onStep(offset + idx, total) },
                    { if (idx + 1 < level.items.size) idx++ else phase = if (lv + 1 < levels.size) Phase.Cleared else Phase.Done },
                )
            }
            Phase.Cleared -> {
                Text("⭐  Level ${lv + 1} cleared!", style = MaterialTheme.typography.headlineSmall)
                Text("Next up: ${levels[lv + 1].title}. It gets a little harder.", style = MaterialTheme.typography.bodyLarge)
                Button(onClick = { lv++; idx = 0; phase = Phase.Intro }, Modifier.fillMaxWidth()) { Text("Next level") }
            }
            Phase.Done -> {
                Text("🏆  Quest complete!", style = MaterialTheme.typography.headlineSmall)
                Text("You answered every question on this page. Play again for a fresh set; coins are only paid once for each answer.", style = MaterialTheme.typography.bodyLarge)
                Button(onClick = onReplay, Modifier.fillMaxWidth()) { Text("Play again") }
            }
        }
    }
}

private val RightGreen = Color(0xFF2E9E5B)
private val WrongRed = Color(0xFFD64550)

/* ---------- game 1: Blank Quest ---------- */

private data class BlankQ(val blanked: String, val answer: String, val sentence: String, val options: List<String>)

private fun blankLevels(text: String, rnd: Random): List<Level<BlankQ>> {
    val used = mutableSetOf<String>()
    val specs = listOf(Triple("Warm-up", "Pick the missing word. Three choices.", 4..7 to 3), Triple("Sharper eyes", "Four choices and longer words.", 5..9 to 4), Triple("Page master", "Five choices and the hardest words.", 7..14 to 5))
    return specs.mapNotNull { (title, blurb, cfg) ->
        val (lens, n) = cfg
        val qs = PageText.clozesWide(text, lens, 4, n, used, rnd).map { c ->
            val cap = c.answer.first().isUpperCase()
            val wrong = c.pool.shuffled(rnd).sortedBy { abs(it.length - c.answer.length) }.take(n - 1)
                .map { if (cap) it.replaceFirstChar { ch -> ch.uppercase() } else it }
            BlankQ(c.blanked, c.answer, c.sentence, (wrong + c.answer).shuffled(rnd))
        }
        if (qs.isEmpty()) null else Level(title, blurb, qs)
    }
}

object BlankQuest : PageGame {
    override val id = "blank-quest"
    override val title = "Blank Quest"
    override val emoji = "🧩"
    override val blurb = "Fill in the missing word from this page. 3 levels, getting harder."

    override fun supports(page: GamePage) = page.text.isNotBlank() && blankLevels(page.text, Random(1)).sumOf { it.items.size } >= 3

    @Composable
    override fun Play(page: GamePage, onStep: (step: Int, total: Int) -> Unit) {
        var round by remember(page.pageId) { mutableIntStateOf(0) }
        key(round) {
            val levels = remember(page.pageId) { blankLevels(page.text, Random(System.nanoTime())) }
            LevelFlow(levels, onStep, onReplay = { round++ }) { q, solved, next ->
                var tried by remember { mutableStateOf(setOf<String>()) }
                var right by remember { mutableStateOf(false) }
                Text(q.blanked, style = MaterialTheme.typography.titleMedium)
                q.options.forEach { o ->
                    val wrong = o in tried
                    val isRight = right && o == q.answer
                    OutlinedButton(
                        onClick = { if (o == q.answer) { right = true; solved() } else tried = tried + o },
                        enabled = !right && !wrong,
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.outlinedButtonColors(
                            disabledContentColor = if (isRight) RightGreen else if (wrong) WrongRed else MaterialTheme.colorScheme.onSurface.copy(alpha = 0.5f),
                        ),
                    ) { Text(if (isRight) "✔  $o" else if (wrong) "✖  $o" else o) }
                }
                if (right) {
                    Text("Correct! ${q.sentence}", style = MaterialTheme.typography.bodyMedium, color = RightGreen)
                    Button(onClick = next, Modifier.fillMaxWidth()) { Text("Continue") }
                } else if (tried.isNotEmpty()) {
                    Text("Not that one. Look at the page and try again.", style = MaterialTheme.typography.bodyMedium, color = WrongRed)
                }
            }
        }
    }
}

/* ---------- game 2: Word Builder ---------- */

private data class ScrambleQ(val blanked: String, val answer: String, val sentence: String, val letters: List<Char>)

private fun scrambleLevels(text: String, rnd: Random): List<Level<ScrambleQ>> {
    val used = mutableSetOf<String>()
    val specs = listOf(Triple("Short words", "Put the letters in order. Words of 4 to 5 letters.", 4..5), Triple("Medium words", "Words of 6 to 7 letters.", 6..7), Triple("Long words", "Words of 8 letters or more.", 8..14))
    return specs.mapNotNull { (title, blurb, lens) ->
        val qs = PageText.clozesWide(text, lens, 4, 1, used, rnd).map { c ->
            var l = c.answer.toList().shuffled(rnd)
            var tries = 0
            while (l.joinToString("") == c.answer && tries++ < 10) l = l.shuffled(rnd)
            ScrambleQ(c.blanked, c.answer, c.sentence, l)
        }
        if (qs.isEmpty()) null else Level(title, blurb, qs)
    }
}

@OptIn(ExperimentalLayoutApi::class)
object WordBuilder : PageGame {
    override val id = "word-builder"
    override val title = "Word Builder"
    override val emoji = "🔤"
    override val blurb = "Unscramble key words from this page. Short, medium, then long words."

    override fun supports(page: GamePage) = page.text.isNotBlank() && scrambleLevels(page.text, Random(1)).sumOf { it.items.size } >= 3

    @Composable
    override fun Play(page: GamePage, onStep: (step: Int, total: Int) -> Unit) {
        var round by remember(page.pageId) { mutableIntStateOf(0) }
        key(round) {
            val levels = remember(page.pageId) { scrambleLevels(page.text, Random(System.nanoTime())) }
            LevelFlow(levels, onStep, onReplay = { round++ }) { q, solved, next ->
                var chosen by remember { mutableStateOf(listOf<Int>()) }
                var right by remember { mutableStateOf(false) }
                var miss by remember { mutableStateOf(false) }
                Text(q.blanked, style = MaterialTheme.typography.titleMedium)
                Text(
                    chosen.joinToString(" ") { q.letters[it].uppercase() }.ifEmpty { "Tap the letters in order" },
                    style = MaterialTheme.typography.headlineSmall,
                    color = if (right) RightGreen else if (miss) WrongRed else MaterialTheme.colorScheme.onSurface,
                )
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    q.letters.forEachIndexed { i, ch ->
                        OutlinedButton(
                            onClick = {
                                val next2 = chosen + i
                                miss = false
                                if (next2.size == q.letters.size) {
                                    if (next2.map { q.letters[it] }.joinToString("").equals(q.answer, ignoreCase = true)) { chosen = next2; right = true; solved() }
                                    else { chosen = emptyList(); miss = true }
                                } else chosen = next2
                            },
                            enabled = !right && i !in chosen,
                        ) { Text(ch.uppercase()) }
                    }
                }
                if (!right) {
                    Row { OutlinedButton(onClick = { chosen = emptyList(); miss = false }, enabled = chosen.isNotEmpty()) { Text("Clear") } }
                    if (miss) Text("Not quite. Try the letters again.", style = MaterialTheme.typography.bodyMedium, color = WrongRed)
                } else {
                    Text("Correct! ${q.sentence}", style = MaterialTheme.typography.bodyMedium, color = RightGreen)
                    Button(onClick = next, Modifier.fillMaxWidth()) { Text("Continue") }
                }
                Spacer(Modifier.height(4.dp))
            }
        }
    }
}
