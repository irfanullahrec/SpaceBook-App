package pk.wantuch.spacebook.ui.practice

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.PlayArrow
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import pk.wantuch.spacebook.ui.components.GradientBanner
import pk.wantuch.spacebook.ui.components.PostAction
import pk.wantuch.spacebook.ui.components.PostCard

/** Practice tab: the website's test tools and games, as big posts. Each opens the website's own page inside the app. */
@Composable
fun PracticeScreen(onOpen: (page: String, title: String) -> Unit) {
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(bottom = 24.dp)) {
        Text("Practice", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.padding(start = 16.dp, top = 12.dp, bottom = 4.dp))
        Text("Test yourself, then see how you are doing.", style = MaterialTheme.typography.bodyLarge, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(start = 16.dp, bottom = 8.dp))
        PostCard(
            "📝", "tests", "Tests Preps", "Questions from your books · practice or mock test",
            onClick = { onOpen("tests-preps", "Tests Preps") },
            banner = { GradientBanner("tests", "📝", "Practise MCQs by subject and chapter", "Instant feedback · see your mistakes", 130.dp) },
            actions = { PostAction(Icons.Rounded.PlayArrow, "Start", { onOpen("tests-preps", "Tests Preps") }, tint = MaterialTheme.colorScheme.primary) },
        )
        PostCard(
            "📄", "papers", "Papers", "Make an exam paper · Set A, B and C",
            onClick = { onOpen("papers", "Papers") },
            banner = { GradientBanner("papers", "📄", "Build a paper from your textbook", "Choose chapters · print or practise", 130.dp) },
            actions = { PostAction(Icons.Rounded.PlayArrow, "Open", { onOpen("papers", "Papers") }, tint = MaterialTheme.colorScheme.primary) },
        )
        PostCard(
            "🎮", "games", "Games", "Six games, ten levels each · earn coins",
            onClick = { onOpen("games", "Games") },
            banner = { GradientBanner("games", "🎮", "Play your way up the levels", "The same games and coins as on the website", 130.dp) },
            actions = { PostAction(Icons.Rounded.PlayArrow, "Play", { onOpen("games", "Games") }, tint = MaterialTheme.colorScheme.primary) },
        )
        PostCard(
            "📅", "plan", "Study Plan", "Plan every lesson before your exam",
            onClick = { onOpen("study-plan", "Study Plan") },
            banner = { GradientBanner("plan", "📅", "A plan that fits your days", "Daily tasks · reminders · progress", 130.dp) },
            actions = { PostAction(Icons.Rounded.PlayArrow, "Plan", { onOpen("study-plan", "Study Plan") }, tint = MaterialTheme.colorScheme.primary) },
        )
        Spacer(Modifier.height(8.dp))
    }
}
