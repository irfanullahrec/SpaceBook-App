package pk.wantuch.spacebook.ui.play

import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.BorderStroke
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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.scale
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.ui.theme.Sb
import kotlin.random.Random

/** The look of one answer button after the student has (or has not yet) chosen. */
enum class OptionState { Idle, Right, Wrong, Missed, Dimmed }

/** A big, friendly answer button: A/B/C/D badge on the left, colour and a mark after the answer. */
@Composable
fun OptionButton(index: Int, text: String, state: OptionState, rtl: Boolean, onClick: () -> Unit, onDark: Boolean = false) {
    val green = Color(0xFF1FB57A)
    val red = Color(0xFFE5484D)
    val container = when (state) {
        OptionState.Right -> green
        OptionState.Wrong -> red
        OptionState.Missed -> green.copy(alpha = .22f)
        else -> if (onDark) Color.White.copy(alpha = .16f) else MaterialTheme.colorScheme.surface
    }
    val content = when (state) {
        OptionState.Right, OptionState.Wrong -> Color.White
        else -> if (onDark) Color.White else MaterialTheme.colorScheme.onSurface
    }
    val scale by animateFloatAsState(if (state == OptionState.Right || state == OptionState.Wrong) 1.03f else 1f, spring(Spring.DampingRatioMediumBouncy), label = "pop")
    Surface(
        onClick = onClick, enabled = state == OptionState.Idle,
        shape = RoundedCornerShape(20.dp), color = container, contentColor = content,
        border = if (state == OptionState.Idle) BorderStroke(1.5.dp, if (onDark) Color.White.copy(alpha = .35f) else MaterialTheme.colorScheme.outline) else null,
        shadowElevation = if (onDark) 0.dp else 2.dp,
        modifier = Modifier.fillMaxWidth().scale(scale).alpha(if (state == OptionState.Dimmed) .55f else 1f),
    ) {
        Row(Modifier.padding(horizontal = 14.dp, vertical = 14.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                Modifier.size(34.dp).background(if (state == OptionState.Right || state == OptionState.Wrong) Color.White.copy(alpha = .25f) else Sb.Violet.copy(alpha = .18f), CircleShape),
                contentAlignment = Alignment.Center,
            ) {
                Text(
                    when (state) { OptionState.Right -> "✓"; OptionState.Wrong -> "✕"; else -> "ABCD"[index].toString() },
                    fontWeight = FontWeight.ExtraBold, fontSize = 16.sp,
                )
            }
            Spacer(Modifier.width(12.dp))
            Text(
                text, style = MaterialTheme.typography.titleSmall, modifier = Modifier.weight(1f),
                textAlign = if (rtl) TextAlign.End else TextAlign.Start,
            )
        }
    }
}

/** A ring that fills from 0 to [progress]; [content] is drawn in the middle. */
@Composable
fun ProgressRing(progress: Float, size: Dp, track: Color, color: Color, stroke: Dp = 10.dp, content: @Composable () -> Unit) {
    val shown by animateFloatAsState(progress.coerceIn(0f, 1f), tween(900), label = "ring")
    Box(Modifier.size(size), contentAlignment = Alignment.Center) {
        Canvas(Modifier.fillMaxSize()) {
            val s = stroke.toPx()
            val inset = s / 2
            val arc = Size(this.size.width - s, this.size.height - s)
            drawArc(track, 0f, 360f, false, topLeft = Offset(inset, inset), size = arc, style = Stroke(s, cap = StrokeCap.Round))
            if (shown > 0f) drawArc(color, -90f, 360f * shown, false, topLeft = Offset(inset, inset), size = arc, style = Stroke(s, cap = StrokeCap.Round))
        }
        content()
    }
}

/** A short burst of confetti (the same picture every time for the same [seed], so it can be tested). */
@Composable
fun Confetti(modifier: Modifier = Modifier, seed: Int = 7, pieces: Int = 46) {
    val t = remember { Animatable(0f) }
    LaunchedEffect(Unit) { t.animateTo(1f, tween(2600, easing = LinearEasing)) }
    val colors = listOf(Sb.Gold, Sb.Pink, Sb.Mint, Sb.Sky, Sb.Violet, Color.White)
    val parts = remember(seed) {
        val r = Random(seed)
        List(pieces) { Triple(r.nextFloat(), r.nextFloat(), r.nextFloat()) to (colors[r.nextInt(colors.size)] to r.nextFloat() * 360f) }
    }
    Canvas(modifier.fillMaxSize()) {
        parts.forEach { (p, style) ->
            val (x0, delay, speed) = p
            val (color, spin) = style
            val local = ((t.value - delay * .25f) / .75f).coerceIn(0f, 1f)
            if (local <= 0f) return@forEach
            val y = -40f + (size.height + 80f) * local * (.65f + speed * .6f)
            val x = x0 * size.width + kotlin.math.sin(local * 9f + spin) * 26f
            rotate(spin + local * 300f, Offset(x, y)) {
                drawRect(color.copy(alpha = (1f - local * .6f)), Offset(x - 7f, y - 4f), Size(14f, 8f))
            }
        }
    }
}

/** "🔥 4" style pill used in the Home header and in quizzes. */
@Composable
fun StatPill(emoji: String, text: String, container: Color, content: Color, modifier: Modifier = Modifier) {
    Surface(shape = RoundedCornerShape(50), color = container, contentColor = content, modifier = modifier) {
        Row(Modifier.padding(horizontal = 12.dp, vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
            Text(emoji, fontSize = 15.sp)
            Spacer(Modifier.width(5.dp))
            Text(text, style = MaterialTheme.typography.labelLarge)
        }
    }
}

/** The thin bar under a quiz: how far through the questions the student is. */
@Composable
fun StepBar(done: Int, total: Int, modifier: Modifier = Modifier, color: Color = Sb.Mint) {
    Row(modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
        repeat(total) { i ->
            Box(Modifier.weight(1f).height(8.dp).background(if (i < done) color else Color.White.copy(alpha = .25f), RoundedCornerShape(50)))
        }
    }
}

@Composable
fun Mascot(size: Dp = 56.dp, modifier: Modifier = Modifier) {
    Box(modifier.size(size).background(Brush.linearGradient(listOf(Color(0xFFFFE08A), Color(0xFFFFB400))), CircleShape), contentAlignment = Alignment.Center) {
        Text("🚀", fontSize = (size.value * .5f).sp)
    }
}
