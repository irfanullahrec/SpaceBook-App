package pk.wantuch.spacebook.ui.home

import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Person
import androidx.compose.material.icons.rounded.Search
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import pk.wantuch.spacebook.data.play.Badge
import pk.wantuch.spacebook.data.play.LEVEL_XP
import pk.wantuch.spacebook.data.play.MISSION_ANSWERS
import pk.wantuch.spacebook.data.play.PlayState
import pk.wantuch.spacebook.data.play.XP_MISSION
import pk.wantuch.spacebook.data.remote.ClassDto
import pk.wantuch.spacebook.ui.components.BookCover
import pk.wantuch.spacebook.ui.components.CoinChip
import pk.wantuch.spacebook.ui.play.Confetti
import pk.wantuch.spacebook.ui.play.Mascot
import pk.wantuch.spacebook.ui.play.ProgressRing
import pk.wantuch.spacebook.ui.play.StatPill
import pk.wantuch.spacebook.ui.theme.Sb

fun greetingFor(hour: Int) = when (hour) { in 5..11 -> "Good morning"; in 12..16 -> "Good afternoon"; in 17..20 -> "Good evening"; else -> "Hello" }

/** The top of Home: who is learning, the streak, the level, the coins. */
@Composable
internal fun HomeHeader(
    greeting: String, name: String?, className: String?, coins: Int, play: PlayState, today: Int,
    actions: HomeActions, onClass: () -> Unit,
) {
    val first = name?.trim()?.substringBefore(' ').orEmpty()
    Box(
        Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 8.dp).clip(RoundedCornerShape(30.dp))
            .background(Brush.linearGradient(listOf(Color(0xFF3B2FD1), Color(0xFF7A3DF0), Color(0xFFFF5C8A)))),
    ) {
        Column(Modifier.padding(18.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Mascot(52.dp)
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) {
                    Text(greeting, color = Color.White.copy(alpha = .85f), style = MaterialTheme.typography.labelLarge)
                    Text(if (first.isBlank()) "Explorer! 👋" else "$first! 👋", color = Color.White, style = MaterialTheme.typography.headlineSmall, maxLines = 1, overflow = TextOverflow.Ellipsis)
                }
                IconButton(onClick = actions.openSearch) { Icon(Icons.Rounded.Search, "Search books", tint = Color.White) }
                IconButton(onClick = actions.openProfile) {
                    if (first.isBlank()) Icon(Icons.Rounded.Person, "Sign in", tint = Color.White)
                    else Box(Modifier.size(34.dp).clip(CircleShape).background(Color.White.copy(alpha = .25f)), contentAlignment = Alignment.Center) {
                        Text(first.first().uppercase(), color = Color.White, fontWeight = FontWeight.Bold)
                    }
                }
            }
            Spacer(Modifier.height(14.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
                val streak = play.streakAt(today)
                StatPill("🔥", if (streak == 0) "Start a streak" else "$streak-day streak", Color.White.copy(alpha = .2f), Color.White)
                if (className != null) Surface(shape = RoundedCornerShape(50), color = Color.White.copy(alpha = .2f), contentColor = Color.White, modifier = Modifier.clickable(onClickLabel = "Change class", onClick = onClass)) {
                    Text("$className ▾", style = MaterialTheme.typography.labelLarge, modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp))
                }
                CoinChip(coins)
            }
            Spacer(Modifier.height(14.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("Level ${play.level}", color = Color.White, style = MaterialTheme.typography.labelLarge)
                Spacer(Modifier.width(10.dp))
                Box(Modifier.weight(1f).height(10.dp).clip(RoundedCornerShape(50)).background(Color.White.copy(alpha = .25f))) {
                    Box(Modifier.fillMaxWidth(play.levelProgress.coerceIn(0.02f, 1f)).height(10.dp).clip(RoundedCornerShape(50)).background(Sb.Gold))
                }
                Spacer(Modifier.width(10.dp))
                Text("${play.xp % LEVEL_XP}/$LEVEL_XP XP", color = Color.White.copy(alpha = .9f), style = MaterialTheme.typography.labelMedium)
            }
        }
    }
}

/** Today's mission: three small things that keep a student coming back, with a ring that fills as they are done. */
@Composable
internal fun MissionCard(play: PlayState, today: Int, onQuiz: () -> Unit, onLesson: () -> Unit, onChest: () -> Unit) {
    val done = play.missionDone(today)
    Surface(shape = RoundedCornerShape(28.dp), color = MaterialTheme.colorScheme.surface, shadowElevation = 4.dp, modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp)) {
        Column(Modifier.padding(18.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                ProgressRing(done / 3f, 84.dp, track = MaterialTheme.colorScheme.surfaceVariant, color = if (done == 3) Sb.Mint else Sb.Violet, stroke = 10.dp) {
                    Text(if (done == 3) "🎉" else "$done/3", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.ExtraBold)
                }
                Spacer(Modifier.width(16.dp))
                Column {
                    Text("Today's mission", style = MaterialTheme.typography.titleLarge)
                    Text(
                        if (done == 3) "All done! +$XP_MISSION XP earned. See you tomorrow." else "Finish all 3 to earn +$XP_MISSION XP",
                        style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
            Spacer(Modifier.height(12.dp))
            val answered = play.answeredAt(today).coerceAtMost(MISSION_ANSWERS)
            MissionRow("⚡", "Answer $MISSION_ANSWERS questions", if (play.answersDone(today)) "done" else "$answered/$MISSION_ANSWERS", play.answersDone(today), onQuiz)
            MissionRow("📖", "Read a lesson", if (play.lessonDone(today)) "done" else "Go", play.lessonDone(today), onLesson)
            MissionRow("🎁", "Open your daily chest", if (play.chestDone(today)) "done" else "Ready!", play.chestDone(today), onChest, highlight = !play.chestDone(today))
        }
    }
}

@Composable
private fun MissionRow(emoji: String, label: String, status: String, done: Boolean, onClick: () -> Unit, highlight: Boolean = false) {
    val pulse = rememberInfiniteTransition(label = "pulse").animateFloat(1f, 0.55f, infiniteRepeatable(tween(800), RepeatMode.Reverse), label = "p")
    Row(
        Modifier.fillMaxWidth().padding(vertical = 3.dp).clip(RoundedCornerShape(16.dp)).clickable(onClick = onClick)
            .background(if (done) Sb.Mint.copy(alpha = .12f) else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = .6f)).padding(horizontal = 12.dp, vertical = 10.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(Modifier.size(38.dp).clip(CircleShape).background(if (done) Sb.Mint else Sb.Violet.copy(alpha = .15f)), contentAlignment = Alignment.Center) {
            Text(if (done) "✓" else emoji, fontSize = 18.sp, color = if (done) Color.White else Color.Unspecified, fontWeight = FontWeight.Bold)
        }
        Spacer(Modifier.width(12.dp))
        Text(label, style = MaterialTheme.typography.titleSmall, modifier = Modifier.weight(1f))
        Text(
            status, style = MaterialTheme.typography.labelLarge,
            color = if (done) Sb.Mint else if (highlight) Sb.Pink else MaterialTheme.colorScheme.primary,
            modifier = if (highlight) Modifier.alpha(pulse.value) else Modifier,
        )
    }
}

/** Two big doors into the play side: a five-question quiz and an endless swipe feed. */
@Composable
internal fun PlayShortcuts(onQuiz: () -> Unit, onReels: () -> Unit) {
    Row(Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
        ShortcutCard("⚡", "Quick Quiz", "5 questions, earn XP", listOf(Color(0xFFFF9A3D), Color(0xFFFF5C5C)), Modifier.weight(1f), onQuiz)
        ShortcutCard("🎬", "Swipe & Learn", "One at a time, never ends", listOf(Color(0xFF2F8CFF), Color(0xFF8B5CFF)), Modifier.weight(1f), onReels)
    }
}

@Composable
private fun ShortcutCard(emoji: String, title: String, text: String, colors: List<Color>, modifier: Modifier, onClick: () -> Unit) {
    Box(modifier.height(150.dp).clip(RoundedCornerShape(26.dp)).background(Brush.linearGradient(colors)).clickable(onClick = onClick)) {
        Text(emoji, fontSize = 56.sp, modifier = Modifier.align(Alignment.BottomEnd).padding(8.dp).alpha(.9f))
        Column(Modifier.padding(16.dp)) {
            Text(title, color = Color.White, style = MaterialTheme.typography.titleLarge)
            Text(text, color = Color.White.copy(alpha = .92f), style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp, end = 52.dp))
        }
        Surface(shape = RoundedCornerShape(50), color = Color.White, modifier = Modifier.align(Alignment.BottomStart).padding(14.dp)) {
            Text("Play", color = Sb.VioletDeep, style = MaterialTheme.typography.labelLarge, modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp))
        }
    }
}

/** The class's books, as real covers. */
@Composable
internal fun BookShelf(cls: ClassDto, onOpen: (String) -> Unit) {
    Column(Modifier.padding(top = 10.dp)) {
        Text("Your books", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp))
        LazyRow(contentPadding = PaddingValues(horizontal = 12.dp), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            items(cls.subjects, key = { it.id }) { s ->
                Column(Modifier.width(104.dp).clickable { onOpen(s.id) }) {
                    BookCover(s.id, s.emoji, Modifier.fillMaxWidth(), ratio = .7f, corner = 12.dp)
                    Text(s.name, style = MaterialTheme.typography.labelMedium, maxLines = 2, overflow = TextOverflow.Ellipsis, textAlign = TextAlign.Center, modifier = Modifier.fillMaxWidth().padding(top = 4.dp))
                }
            }
        }
    }
}

/** Collectable badges: the ones earned are bright, the others show what to do. */
@Composable
internal fun BadgeRow(play: PlayState) {
    Column(Modifier.padding(top = 14.dp)) {
        Text("Badges", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp))
        LazyRow(contentPadding = PaddingValues(horizontal = 12.dp), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            items(Badge.entries.toList(), key = { it.name }) { b ->
                val got = b.earned(play)
                Column(Modifier.width(92.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        Modifier.size(64.dp).clip(CircleShape).background(if (got) Brush.linearGradient(listOf(Color(0xFFFFE08A), Color(0xFFFFB400))) else Brush.linearGradient(listOf(MaterialTheme.colorScheme.surfaceVariant, MaterialTheme.colorScheme.surfaceVariant))),
                        contentAlignment = Alignment.Center,
                    ) { Text(b.emoji, fontSize = 30.sp, modifier = Modifier.alpha(if (got) 1f else .3f)) }
                    Text(b.title, style = MaterialTheme.typography.labelMedium, maxLines = 1, textAlign = TextAlign.Center, modifier = Modifier.padding(top = 4.dp))
                    Text(if (got) "Earned!" else b.hint, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, textAlign = TextAlign.Center, maxLines = 2, fontSize = 11.sp, lineHeight = 14.sp)
                }
            }
        }
    }
}

/** The daily chest: a shaking gift to tap, then the reward. */
@Composable
internal fun ChestDialog(reward: Int?, onOpen: () -> Unit, onClose: () -> Unit) {
    Dialog(onDismissRequest = onClose) {
        Box(Modifier.clip(RoundedCornerShape(32.dp)).background(Brush.verticalGradient(listOf(Color(0xFF3B2FD1), Color(0xFF8B3DFF)))).fillMaxWidth()) {
            Column(Modifier.padding(28.dp).fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
                if (reward == null) {
                    val shake by rememberInfiniteTransition(label = "shake").animateFloat(-9f, 9f, infiniteRepeatable(tween(260), RepeatMode.Reverse), label = "r")
                    Text("🎁", fontSize = 110.sp, modifier = Modifier.rotate(shake).clickable(onClick = onOpen))
                    Text("Your daily chest", style = MaterialTheme.typography.headlineSmall, color = Color.White)
                    Text("Tap it to see what is inside!", style = MaterialTheme.typography.bodyMedium, color = Color.White.copy(alpha = .85f), modifier = Modifier.padding(top = 4.dp))
                    Spacer(Modifier.height(18.dp))
                    Button(onClick = onOpen, colors = ButtonDefaults.buttonColors(containerColor = Sb.Gold, contentColor = Sb.Ink), shape = RoundedCornerShape(18.dp)) { Text("Open", style = MaterialTheme.typography.titleSmall) }
                } else {
                    Text(if (reward > 0) "🎉" else "🎁", fontSize = 90.sp)
                    Text(if (reward > 0) "+$reward XP" else "Already opened", style = MaterialTheme.typography.displaySmall, color = Sb.Gold, fontWeight = FontWeight.ExtraBold)
                    Text(if (reward > 0) "Come back tomorrow for a new chest!" else "Come back tomorrow for a new chest.", style = MaterialTheme.typography.bodyMedium, color = Color.White.copy(alpha = .9f), textAlign = TextAlign.Center, modifier = Modifier.padding(top = 4.dp))
                    Spacer(Modifier.height(18.dp))
                    Button(onClick = onClose, colors = ButtonDefaults.buttonColors(containerColor = Color.White, contentColor = Sb.VioletDeep), shape = RoundedCornerShape(18.dp)) { Text("Awesome", style = MaterialTheme.typography.titleSmall) }
                }
            }
            if (reward != null && reward > 0) Box(Modifier.matchParentSize()) { Confetti(Modifier.fillMaxSize()) }
        }
    }
}
