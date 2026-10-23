package pk.wantuch.spacebook.ui.practice

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowForward
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

/** What the Practice tab offers: each opens the website's own page inside the app (same tests, papers, games, coins and plans as on the web). */
private data class Tool(val page: String, val title: String, val line: String, val emoji: String, val colors: List<Color>)

private val tests = Tool("tests-preps", "Tests Preps", "MCQs from your books, practice or a timed mock test. See every mistake.", "📝", listOf(Color(0xFF5B4BFF), Color(0xFFB249F8)))
private val tiles = listOf(
    Tool("papers", "Papers", "Make an exam paper, Set A, B, C, and print it", "📄", listOf(Color(0xFF14B8A6), Color(0xFF5EEAD4))),
    Tool("games", "Games", "Arcade games from every page, earn coins", "🎮", listOf(Color(0xFFFF5C8A), Color(0xFFFF9A6B))),
    Tool("study-plan", "Study Plan", "A plan for every lesson before your exam", "📅", listOf(Color(0xFF2F8CFF), Color(0xFF63C6FF))),
)

/** Practice tab: one big start card and a grid of tools, all on one screen. */
@Composable
fun PracticeScreen(onOpen: (page: String, title: String) -> Unit) {
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 14.dp).padding(top = 10.dp, bottom = 20.dp)) {
        Text("Practice", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Black, modifier = Modifier.padding(start = 4.dp))
        Text(
            "Test yourself, then see how you are doing.", style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(start = 4.dp, bottom = 12.dp),
        )
        Hero(tests) { onOpen(tests.page, tests.title) }
        Spacer(Modifier.height(12.dp))
        tiles.chunked(2).forEach { row ->
            Row(Modifier.fillMaxWidth().padding(bottom = 12.dp), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                // a tile left alone in its row takes the whole row
                row.forEach { t -> Tile(t, if (row.size == 1) Modifier.weight(1f).height(118.dp) else Modifier.weight(1f)) { onOpen(t.page, t.title) } }
            }
        }
    }
}

@Composable
private fun Hero(t: Tool, onClick: () -> Unit) {
    Box(
        Modifier.fillMaxWidth().clip(RoundedCornerShape(26.dp)).background(Brush.linearGradient(t.colors)).clickable(role = Role.Button, onClick = onClick).padding(18.dp),
    ) {
        Text(t.emoji, fontSize = 92.sp, modifier = Modifier.align(Alignment.CenterEnd), color = Color.White.copy(alpha = 0.28f))
        Column(Modifier.fillMaxWidth(0.72f)) {
            Text(t.title, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Black, color = Color.White)
            Text(t.line, style = MaterialTheme.typography.bodyMedium, color = Color.White.copy(alpha = 0.92f), modifier = Modifier.padding(top = 4.dp, bottom = 14.dp))
            Row(
                Modifier.clip(CircleShape).background(Color.White).padding(start = 16.dp, end = 10.dp, top = 8.dp, bottom = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text("Start", color = Color(0xFF3B2FD1), fontWeight = FontWeight.ExtraBold)
                Icon(Icons.AutoMirrored.Rounded.ArrowForward, null, Modifier.padding(start = 6.dp).size(18.dp), tint = Color(0xFF3B2FD1))
            }
        }
    }
}

@Composable
private fun Tile(t: Tool, modifier: Modifier, onClick: () -> Unit) {
    Box(
        modifier.height(150.dp).clip(RoundedCornerShape(24.dp)).background(Brush.linearGradient(t.colors)).clickable(role = Role.Button, onClick = onClick).padding(14.dp),
    ) {
        Text(t.emoji, fontSize = 34.sp, modifier = Modifier.align(Alignment.TopStart))
        Box(Modifier.align(Alignment.TopEnd).size(30.dp).clip(CircleShape).background(Color.White.copy(alpha = 0.28f)), contentAlignment = Alignment.Center) {
            Icon(Icons.AutoMirrored.Rounded.ArrowForward, null, Modifier.size(18.dp), tint = Color.White)
        }
        Column(Modifier.align(Alignment.BottomStart)) {
            Text(t.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Black, color = Color.White)
            Text(t.line, style = MaterialTheme.typography.bodySmall, color = Color.White.copy(alpha = 0.92f), maxLines = 2, overflow = TextOverflow.Ellipsis)
        }
    }
}
