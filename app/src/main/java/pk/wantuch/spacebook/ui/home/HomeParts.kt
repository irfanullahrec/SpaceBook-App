package pk.wantuch.spacebook.ui.home

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.data.prep.PlanDto
import pk.wantuch.spacebook.data.prep.PrepSnapshot
import pk.wantuch.spacebook.data.prep.RecentDto
import pk.wantuch.spacebook.data.prep.TestDto
import pk.wantuch.spacebook.ui.components.SectionTitle
import pk.wantuch.spacebook.ui.play.ProgressRing
import pk.wantuch.spacebook.ui.theme.Sb

private fun hex(value: String, fallback: Color = Sb.Violet): Color =
    runCatching { Color(android.graphics.Color.parseColor(value)) }.getOrDefault(fallback)

/** "today", "yesterday", "3 days ago", "2 weeks ago" */
internal fun ago(ts: Long, now: Long): String {
    if (ts <= 0) return "not yet"
    val days = ((now - ts) / 86_400_000L).toInt()
    return when {
        now - ts < 3_600_000L -> "just now"
        days < 1 && (now - ts) < 86_400_000L -> "today"
        days < 2 -> "yesterday"
        days < 14 -> "$days days ago"
        else -> "${days / 7} weeks ago"
    }
}

@Composable
internal fun SectionHeader(title: String, action: String?, onAction: () -> Unit) {
    Row(Modifier.fillMaxWidth().padding(start = 16.dp, end = 8.dp, top = 18.dp), verticalAlignment = Alignment.CenterVertically) {
        Text(title, style = MaterialTheme.typography.titleLarge, modifier = Modifier.weight(1f))
        if (action != null) TextButton(onClick = onAction) { Text(action, style = MaterialTheme.typography.labelLarge) }
    }
}

/** Statistics of both kinds side by side: the Test Preps (questions, accuracy, minutes, streak) and the Study Plans (progress, today). */
@Composable
internal fun Overview(prep: PrepSnapshot) {
    val t = prep.tests.totals
    val plans = prep.plans
    Column(Modifier.padding(horizontal = 12.dp, vertical = 8.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Text("Statistics", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(horizontal = 4.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            StatCard(
                "Test Preps", listOf(Color(0xFF3B2FD1), Color(0xFF7A3DF0)), Modifier.weight(1f),
                big = if (t.questions > 0) "${t.accuracy}%" else "–", bigLabel = "accuracy",
                lines = listOf("${t.questions} questions", "${t.minutes} min studied", if (t.streak > 0) "🔥 ${t.streak}-day streak" else "${prep.tests.tests.size} started"),
            ) { MiniBars(prep.tests.week, Color.White) }
            val avg = if (plans.isEmpty()) 0 else plans.sumOf { it.pct } / plans.size
            val left = plans.sumOf { it.todayItemsLeft }
            val pending = plans.sumOf { it.pending }
            StatCard(
                "Study Plans", listOf(Color(0xFF0E9F8E), Color(0xFF3FB6E8)), Modifier.weight(1f),
                big = if (plans.isEmpty()) "–" else "$avg%", bigLabel = "average done",
                lines = listOf("${plans.size} plan${if (plans.size == 1) "" else "s"}", "$left to do today", if (pending > 0) "⚠ $pending from earlier" else "all up to date"),
            ) { MiniBars(plans.map { it.pct }.take(14), Color.White, max = 100) }
        }
    }
}

@Composable
private fun StatCard(title: String, colors: List<Color>, modifier: Modifier, big: String, bigLabel: String, lines: List<String>, chart: @Composable () -> Unit) {
    Column(modifier.clip(RoundedCornerShape(24.dp)).background(Brush.linearGradient(colors)).padding(16.dp)) {
        Text(title, color = Color.White.copy(alpha = .9f), style = MaterialTheme.typography.labelLarge)
        Row(verticalAlignment = Alignment.Bottom, modifier = Modifier.padding(top = 4.dp)) {
            Text(big, color = Color.White, fontSize = 38.sp, fontWeight = FontWeight.ExtraBold)
            Text(bigLabel, color = Color.White.copy(alpha = .85f), style = MaterialTheme.typography.labelMedium, modifier = Modifier.padding(start = 6.dp, bottom = 8.dp))
        }
        lines.forEach { Text(it, color = Color.White, style = MaterialTheme.typography.bodySmall) }
        Spacer(Modifier.height(10.dp))
        chart()
    }
}

/** Small bar chart: one bar per value (the last one is the latest day). */
@Composable
internal fun MiniBars(values: List<Int>, color: Color, max: Int = 0, modifier: Modifier = Modifier) {
    val data = values.ifEmpty { List(14) { 0 } }
    val top = (if (max > 0) max else data.max()).coerceAtLeast(1).toFloat()
    Canvas(modifier.fillMaxWidth().height(34.dp)) {
        val gap = 4.dp.toPx()
        val w = ((size.width - gap * (data.size - 1)) / data.size).coerceAtMost(22.dp.toPx())
        data.forEachIndexed { i, v ->
            val h = (size.height * (v / top)).coerceAtLeast(3.dp.toPx())
            drawRoundRect(
                color.copy(alpha = if (i == data.lastIndex) 1f else .55f), Offset(i * (w + gap), size.height - h), Size(w, h), CornerRadius(w / 3),
            )
        }
    }
}

@Composable
internal fun TestPrepCard(t: TestDto, now: Long, onPractice: () -> Unit, onStats: () -> Unit) {
    val color = hex(t.color)
    Surface(shape = RoundedCornerShape(24.dp), color = MaterialTheme.colorScheme.surface, shadowElevation = 2.dp, modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp)) {
        Column(Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(48.dp).clip(CircleShape).background(color.copy(alpha = .15f)), contentAlignment = Alignment.Center) { Text(t.emoji, fontSize = 24.sp) }
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) {
                    Text(t.title, style = MaterialTheme.typography.titleMedium, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    Text(t.fullName, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1, overflow = TextOverflow.Ellipsis)
                }
                ProgressRing(t.accuracy / 100f, 56.dp, track = color.copy(alpha = .15f), color = color, stroke = 6.dp) {
                    Text(if (t.questions > 0) "${t.accuracy}%" else "–", style = MaterialTheme.typography.labelLarge)
                }
            }
            Spacer(Modifier.height(12.dp))
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Fact("${t.questions}", "questions")
                Fact("${t.sessions}", "sessions")
                Fact("${t.minutes}m", "studied")
                Fact(if (t.bestMock >= 0) "${t.bestMock}%" else "–", "best mock")
            }
            Spacer(Modifier.height(10.dp))
            MiniBars(t.week, color)
            Text(
                (if (t.running) "A test is waiting to be finished · " else "") + "last practice ${ago(t.last, now)}",
                style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 6.dp),
            )
            Spacer(Modifier.height(10.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Button(onClick = onPractice, modifier = Modifier.weight(1f), shape = RoundedCornerShape(16.dp), colors = ButtonDefaults.buttonColors(containerColor = color)) {
                    Text(if (t.running) "Resume" else "Practice")
                }
                OutlinedButton(onClick = onStats, modifier = Modifier.weight(1f), shape = RoundedCornerShape(16.dp)) { Text("Statistics") }
            }
        }
    }
}

@Composable
private fun Fact(value: String, label: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(value, style = MaterialTheme.typography.titleMedium)
        Text(label, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
    }
}

@Composable
internal fun PlanCard(p: PlanDto, label: String, onOpen: () -> Unit, onDelete: () -> Unit) {
    val brush = Sb.gradientFor(p.classId.ifBlank { p.id })
    Surface(shape = RoundedCornerShape(24.dp), color = MaterialTheme.colorScheme.surface, shadowElevation = 2.dp, modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp).clickable(onClick = onOpen)) {
        Column {
            Row(Modifier.fillMaxWidth().background(Brush.linearGradient(brush)).padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text(p.name, color = Color.White, style = MaterialTheme.typography.titleMedium, maxLines = 2, overflow = TextOverflow.Ellipsis)
                    Text(label, color = Color.White.copy(alpha = .92f), style = MaterialTheme.typography.bodySmall, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    Text("${shortDate(p.start)} – ${shortDate(p.end)}" + if (p.daysLeft > 0) " · ${p.daysLeft} days left" else "", color = Color.White.copy(alpha = .85f), style = MaterialTheme.typography.labelMedium)
                }
                ProgressRing(p.pct / 100f, 64.dp, track = Color.White.copy(alpha = .3f), color = Color.White, stroke = 7.dp) {
                    Text("${p.pct}%", color = Color.White, style = MaterialTheme.typography.titleSmall)
                }
            }
            Column(Modifier.padding(16.dp)) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Fact("${p.itemsDone}/${p.items}", "items done")
                    Fact("${p.sessionsDone}/${p.sessions}", "sessions")
                    Fact("${p.todayTasks}", "tasks today")
                    Fact(if (p.pending > 0) "${p.pending}" else "0", "from earlier")
                }
                Spacer(Modifier.height(10.dp))
                Text(todayLine(p), style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurface)
                if (p.tasks > 0) {
                    Spacer(Modifier.height(4.dp))
                    Text(checkedLine(p), style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                Spacer(Modifier.height(10.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    Button(onClick = onOpen, modifier = Modifier.weight(1f), shape = RoundedCornerShape(16.dp)) { Text(if (p.todayTasks > 0) "Practise" else "Open plan") }
                    OutlinedButton(onClick = onOpen, modifier = Modifier.weight(1f), shape = RoundedCornerShape(16.dp)) { Text("Statistics") }
                }
                TextButton(
                    onClick = onDelete, modifier = Modifier.align(Alignment.End),
                    colors = ButtonDefaults.textButtonColors(contentColor = MaterialTheme.colorScheme.error),
                ) { Icon(Icons.Rounded.Delete, null, Modifier.size(18.dp)); Spacer(Modifier.width(6.dp)); Text("Delete plan") }
            }
        }
    }
}

/** "🧠 3 of 12 tasks learnt and checked" - a task counts after the student passed the questions of the book on it; ticked-by-hand ones are named apart */
internal fun checkedLine(p: PlanDto): String =
    "🧠 ${p.checked} of ${p.tasks} task${if (p.tasks == 1) "" else "s"} learnt and checked" + if (p.selfMarked > 0) " · ${p.selfMarked} marked by you" else ""

private fun todayLine(p: PlanDto): String = when {
    p.todayTasks > 0 && p.todayItemsLeft > 0 -> "Today: ${p.todayItemsLeft} item${if (p.todayItemsLeft == 1) "" else "s"} left · about ${p.todayMinutes} min"
    p.todayTasks > 0 -> "Today's work is done. Well done!"
    p.nextDate.isNotBlank() -> "Next study session: ${shortDate(p.nextDate)}, ${p.nextFrom}–${p.nextTo}"
    p.pct >= 100 -> "This plan is finished."
    else -> "No more sessions planned."
}

/** "2026-10-23" -> "23 Oct" */
internal fun shortDate(ymd: String): String {
    val p = ymd.split('-')
    if (p.size != 3) return ymd
    val months = listOf("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
    return "${p[2].toIntOrNull() ?: p[2]} ${months.getOrElse((p[1].toIntOrNull() ?: 1) - 1) { p[1] }}"
}

@Composable
internal fun RecentPractice(rows: List<RecentDto>, now: Long, onOpen: (String) -> Unit) {
    Surface(shape = RoundedCornerShape(24.dp), color = MaterialTheme.colorScheme.surface, shadowElevation = 2.dp, modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp)) {
        Column(Modifier.padding(vertical = 6.dp)) {
            rows.forEach { r ->
                Row(Modifier.fillMaxWidth().clickable { onOpen(r.track) }.padding(horizontal = 16.dp, vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f)) {
                        Text("${r.title} · ${if (r.mode == "mock") "Mock test" else "Practice"}", style = MaterialTheme.typography.titleSmall)
                        Text(ago(r.ts, now), style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Text("${r.c}/${r.n}", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(end = 10.dp))
                    Text("${r.percent}%", style = MaterialTheme.typography.titleSmall, color = when { r.percent >= 70 -> Sb.Mint; r.percent >= 40 -> Color(0xFFF59E0B); else -> Color(0xFFE5484D) })
                }
            }
        }
    }
}

/** Shown when nothing has been started at all: the two ways in. */
@Composable
internal fun EmptyPrep(actions: HomeActions) {
    Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        BigStart("📝", "Prepare for a test", "PST, CT, SST, lecturer and more. Practise MCQs from your books, take mock tests and see your statistics.", "Start a test prep", listOf(Color(0xFF3B2FD1), Color(0xFF7A3DF0)), actions.startTestPrep)
        BigStart("📅", "Make a study plan", "Choose a class, some subjects or a few chapters and your dates. SpaceBook plans what to study every day.", "Make a plan", listOf(Color(0xFF0E9F8E), Color(0xFF3FB6E8)), actions.newPlan)
        Text("You can start as many tests and plans as you like. They all appear here.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, textAlign = TextAlign.Center, modifier = Modifier.fillMaxWidth())
    }
}

@Composable
private fun BigStart(emoji: String, title: String, text: String, cta: String, colors: List<Color>, onClick: () -> Unit) {
    Box(Modifier.fillMaxWidth().clip(RoundedCornerShape(28.dp)).background(Brush.linearGradient(colors)).clickable(onClick = onClick).padding(20.dp)) {
        Text(emoji, fontSize = 64.sp, modifier = Modifier.align(Alignment.TopEnd).padding(4.dp))
        Column {
            Text(title, color = Color.White, style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(end = 90.dp))
            Text(text, color = Color.White.copy(alpha = .92f), style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 6.dp, bottom = 14.dp, end = 90.dp))
            Surface(shape = RoundedCornerShape(50), color = Color.White) { Text(cta, color = Sb.VioletDeep, style = MaterialTheme.typography.labelLarge, modifier = Modifier.padding(horizontal = 18.dp, vertical = 9.dp)) }
        }
    }
}

/** A line inside a section that has nothing yet, with the way to start. */
@Composable
internal fun NothingYet(emoji: String, title: String, text: String, cta: String, onClick: () -> Unit) {
    Surface(shape = RoundedCornerShape(24.dp), color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = .6f), modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp)) {
        Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Text(emoji, fontSize = 34.sp)
            Spacer(Modifier.width(12.dp))
            Column(Modifier.weight(1f)) {
                Text(title, style = MaterialTheme.typography.titleSmall)
                Text(text, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                TextButton(onClick = onClick, contentPadding = androidx.compose.foundation.layout.PaddingValues(0.dp)) { Text(cta) }
            }
        }
    }
}

@Suppress("unused") private val unusedTitle: (@Composable (String) -> Unit) = { SectionTitle(it) }
