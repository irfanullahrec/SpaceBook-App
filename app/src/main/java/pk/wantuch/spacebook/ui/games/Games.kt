package pk.wantuch.spacebook.ui.games

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.clickable
import pk.wantuch.spacebook.ui.components.EmptyState

/** The page a game is made from: which book page, and its text so a game can build questions from it. */
data class GamePage(
    val classId: String,
    val subjectId: String,
    val subjectName: String,
    val chapterIndex: Int,
    val chapterTitle: String,
    val page: Int,
    val text: String,
) {
    /** stable id of this page across sessions, e.g. "cls5-math:1:3" */
    val pageId: String get() = "$subjectId:$chapterIndex:$page"
}

/**
 * A small game tied to one page of a book. The student plays it, learns the page, and earns coins.
 * To add a game: implement this, then add the object to [GameRegistry.games]. Nothing else changes: every page's
 * Games tab lists the games that [supports] it, and [Play] reports coin steps through [onStep].
 */
interface PageGame {
    val id: String
    val title: String
    val emoji: String
    val blurb: String

    /** false when the page cannot make this game (no text, no numbers ...) */
    fun supports(page: GamePage): Boolean = page.text.isNotBlank()

    /**
     * @param onStep call once each time the student completes step [step] (0-based) of [total]; the app turns it into a
     *   reward event the same way the website does (+1 coin per new step, +5 for finishing, decided by the server)
     */
    @Composable
    fun Play(page: GamePage, onStep: (step: Int, total: Int) -> Unit)
}

object GameRegistry {
    val games: MutableList<PageGame> = mutableListOf(BlankQuest, WordBuilder)

    fun forPage(page: GamePage): List<PageGame> = games.filter { it.supports(page) }
}

/**
 * The reward key of a game activity: one key per game and page, with the number of steps at the end (the server's
 * activity key is `<class>|<game>|u<chapter>|count|<page hash>|<number of steps>`, see api/lib/rewards.php). Each step is then
 * reported as `step {key, total, step}`, and the server pays +1 for each new step and +5 for finishing.
 */
object GameKeys {
    private fun clean(s: String, max: Int) = s.filter { it.isLetterOrDigit() || it in "_.:-" }.take(max).ifEmpty { "x" }

    fun rewardKey(page: GamePage, gameId: String, total: Int): String {
        val hash = Integer.toString(page.pageId.hashCode() and 0x7fffffff, 36).take(10).lowercase()
        return "${clean(page.classId, 40)}|g-${clean(gameId, 56)}|u${page.chapterIndex.toString().take(8)}|count|$hash|${total.coerceIn(1, 199)}"
    }
}

/** The Games tab of a page. */
@Composable
fun GamesPanel(page: GamePage, onStep: (game: PageGame, step: Int, total: Int) -> Unit, modifier: Modifier = Modifier) {
    val games = remember(page.pageId, page.text.length) { GameRegistry.forPage(page) }
    var playing by remember(page.pageId) { mutableStateOf<PageGame?>(null) }
    val current = playing
    Column(modifier.fillMaxSize().padding(8.dp)) {
        when {
            games.isEmpty() -> EmptyState(
                "🎮", "Games are coming",
                "Soon every page will have a little game made from it. You will learn the page, have fun and earn coins.",
            )
            current != null -> {
                Text(current.title, style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(8.dp))
                current.Play(page) { step, total -> onStep(current, step, total) }
            }
            else -> LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                items(games, key = { it.id }) { g ->
                    Surface(
                        shape = MaterialTheme.shapes.large, shadowElevation = 2.dp,
                        modifier = Modifier.fillMaxWidth().clickable { playing = g },
                    ) {
                        Column(Modifier.padding(16.dp)) {
                            Text("${g.emoji}  ${g.title}", style = MaterialTheme.typography.titleMedium)
                            Text(g.blurb, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            }
        }
    }
}
