@file:OptIn(androidx.compose.foundation.layout.ExperimentalLayoutApi::class)

package pk.wantuch.spacebook.ui.feed

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.data.feed.FeedCard
import pk.wantuch.spacebook.ui.theme.Sb

private val Orange = Color(0xFFF59E0B)
private val Green = Color(0xFF16A34A)
private val Blue = Color(0xFF2F8CFF)

/** The attachment of a post, drawn as a card. */
@Composable
fun FeedCardView(card: FeedCard, modifier: Modifier = Modifier) {
    when (card) {
        is FeedCard.Stats -> StatsCardView(card, modifier)
        is FeedCard.Progress -> ProgressCardView(card, modifier)
        is FeedCard.Plan -> PlanCardView(card, modifier)
        is FeedCard.Question -> QuestionTags(card, modifier)
    }
}

/** the line that tells what the card is: coloured band at the top of a stats / progress / plan card */
@Composable
private fun CardBand(title: String, subtitle: String, colors: List<Color>) {
    Column(Modifier.fillMaxWidth().background(Brush.linearGradient(colors)).padding(horizontal = 16.dp, vertical = 14.dp)) {
        Text(title, color = Color.White, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.ExtraBold)
        if (subtitle.isNotBlank()) Text(subtitle, color = Color.White.copy(alpha = .85f), style = MaterialTheme.typography.bodySmall)
    }
}

@Composable
private fun Tile(value: String, label: String, color: Color, modifier: Modifier = Modifier) {
    Column(
        modifier.clip(RoundedCornerShape(14.dp)).background(color.copy(alpha = .12f)).padding(horizontal = 10.dp, vertical = 10.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(value, color = color, fontSize = 22.sp, fontWeight = FontWeight.ExtraBold, maxLines = 1)
        Text(label, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1, textAlign = TextAlign.Center)
    }
}

@Composable
private fun CardFrame(modifier: Modifier, content: @Composable () -> Unit) {
    Column(modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 8.dp).clip(RoundedCornerShape(18.dp)).background(MaterialTheme.colorScheme.surfaceVariant.copy(alpha = .55f))) { content() }
}

@Composable
private fun StatsCardView(c: FeedCard.Stats, modifier: Modifier) {
    CardFrame(modifier.semantics { contentDescription = "My Stats: ${c.questions} questions, ${c.accuracy} percent right" }) {
        CardBand("📊 My Stats", "Questions, time and words so far", listOf(Sb.Violet, Color(0xFF8B5CF6)))
        Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Tile(shortCount(c.questions), "Questions", Sb.Violet, Modifier.weight(1f))
                Tile("${c.accuracy}%", "Right", Green, Modifier.weight(1f))
                Tile(shortCount(c.minutes), "Minutes", Blue, Modifier.weight(1f))
                Tile("${c.streak}🔥", "Day streak", Orange, Modifier.weight(1f))
            }
            if (c.words > 0 || c.sessions > 0 || c.plans > 0) {
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    if (c.words > 0) SmallChip("🧠 ${shortCount(c.words)} words")
                    if (c.sessions > 0) SmallChip("🎯 ${c.sessions} sessions")
                    if (c.plans > 0) SmallChip("📅 ${c.plans} ${if (c.plans == 1) "plan" else "plans"}")
                }
            }
            c.tests.forEach { t ->
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(t.title, style = MaterialTheme.typography.labelLarge, modifier = Modifier.width(64.dp), maxLines = 1)
                    Box(Modifier.weight(1f).height(8.dp).clip(RoundedCornerShape(50)).background(MaterialTheme.colorScheme.outline.copy(alpha = .35f))) {
                        Box(Modifier.fillMaxWidth(t.acc.coerceIn(0, 100) / 100f).height(8.dp).clip(RoundedCornerShape(50)).background(Green))
                    }
                    Text("${t.acc}%  ·  ${shortCount(t.mcqs)} Qs", style = MaterialTheme.typography.labelMedium, modifier = Modifier.padding(start = 8.dp), color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}

@Composable
private fun SmallChip(text: String) {
    Text(
        text, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onPrimaryContainer,
        modifier = Modifier.clip(RoundedCornerShape(50)).background(MaterialTheme.colorScheme.primaryContainer).padding(horizontal = 10.dp, vertical = 4.dp),
    )
}

@Composable
private fun ProgressCardView(c: FeedCard.Progress, modifier: Modifier) {
    CardFrame(modifier.semantics { contentDescription = "Study today: ${c.questions} questions, ${c.minutes} minutes" }) {
        CardBand("🎯 My study today", prettyDate(c.date), listOf(Color(0xFF0EA5A5), Color(0xFF22C7A0)))
        Row(Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
            Ring(c.percent, size = 92.dp, label = if (c.goal > 0) "of the goal" else "of the plan")
            Spacer(Modifier.width(14.dp))
            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Tile(if (c.goal > 0) "${c.questions}/${c.goal}" else "${c.questions}", "Questions", Sb.Violet, Modifier.weight(1f))
                    Tile("${c.correct}", "Right", Green, Modifier.weight(1f))
                    Tile("${c.minutes}", "Minutes", Blue, Modifier.weight(1f))
                }
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    if (c.tasksTotal > 0) SmallChip("📋 ${c.tasksDone}/${c.tasksTotal} tasks done")
                    if (c.streak > 0) SmallChip("🔥 ${c.streak}-day streak")
                    if (c.coins > 0) SmallChip("⭐ ${shortCount(c.coins)} coins")
                }
            }
        }
    }
}

/** A ring that fills to [percent]. */
@Composable
private fun Ring(percent: Int, size: Dp, label: String) {
    val track = MaterialTheme.colorScheme.outline.copy(alpha = .4f)
    Box(Modifier.size(size), contentAlignment = Alignment.Center) {
        Canvas(Modifier.size(size)) {
            val stroke = 11.dp.toPx()
            val inset = stroke / 2
            val arc = Size(this.size.width - stroke, this.size.height - stroke)
            drawArc(track, 0f, 360f, false, topLeft = Offset(inset, inset), size = arc, style = Stroke(stroke))
            drawArc(
                Brush.sweepGradient(listOf(Color(0xFF22C7A0), Color(0xFF3FA9FF), Sb.Violet)),
                -90f, 360f * percent.coerceIn(0, 100) / 100f, false, topLeft = Offset(inset, inset), size = arc, style = Stroke(stroke, cap = StrokeCap.Round),
            )
        }
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text("$percent%", fontSize = 20.sp, fontWeight = FontWeight.ExtraBold)
            Text(label, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, fontSize = 10.sp)
        }
    }
}

@Composable
private fun PlanCardView(c: FeedCard.Plan, modifier: Modifier) {
    CardFrame(modifier.semantics { contentDescription = "Study plan ${c.name}: ${c.pct} percent done" }) {
        CardBand("📅 ${c.name}", c.label, listOf(Color(0xFFFF5C8A), Color(0xFFFF9A6B)))
        Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.weight(1f).height(10.dp).clip(RoundedCornerShape(50)).background(MaterialTheme.colorScheme.outline.copy(alpha = .35f))) {
                    Box(Modifier.fillMaxWidth(c.pct.coerceIn(0, 100) / 100f).height(10.dp).clip(RoundedCornerShape(50)).background(Brush.horizontalGradient(listOf(Color(0xFFFF5C8A), Color(0xFFFF9A6B)))))
                }
                Text("${c.pct}%", fontWeight = FontWeight.ExtraBold, modifier = Modifier.padding(start = 10.dp))
            }
            Text(
                listOfNotNull(
                    if (c.tasks > 0) "${c.done} of ${c.tasks} tasks done" else null,
                    if (c.days > 0) "${c.days} days" else null,
                ).joinToString("  ·  "),
                style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            if (c.subjects.isNotEmpty()) {
                FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) { c.subjects.forEach { SmallChip(it) } }
            }
        }
    }
}

/** The little tags under the text of a question: where it comes from. */
@Composable
private fun QuestionTags(c: FeedCard.Question, modifier: Modifier) {
    val tags = listOf(c.cls, c.subject, c.chapter).filter { it.isNotBlank() }
    if (tags.isEmpty()) return
    FlowRow(modifier.padding(horizontal = 14.dp, vertical = 4.dp), horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
        tags.forEach { SmallChip(it) }
    }
}

/** the small header chip of a question post ("Question") */
@Composable
fun QuestionBadge() {
    Text(
        "❓ Question", style = MaterialTheme.typography.labelMedium, color = Color.White, fontWeight = FontWeight.Bold,
        modifier = Modifier.clip(RoundedCornerShape(50)).background(Brush.horizontalGradient(listOf(Sb.Violet, Sb.Pink))).padding(horizontal = 10.dp, vertical = 3.dp),
    )
}
