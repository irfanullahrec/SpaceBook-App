package pk.wantuch.spacebook.ui.play

import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.pager.VerticalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Close
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.compositeOver
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import pk.wantuch.spacebook.data.play.Mcq
import pk.wantuch.spacebook.ui.theme.Sb

/** Swipe & Learn: one question per screen, swipe up for the next, as long as the student likes. */
@Composable
fun ReelsScreen(onBack: () -> Unit, vm: ReelsViewModel = hiltViewModel()) {
    val ui by vm.ui.collectAsStateWithLifecycle()
    val pager = rememberPagerState { ui.items.size }
    LaunchedEffect(pager.currentPage, ui.items.size) { if (ui.items.isNotEmpty() && pager.currentPage >= ui.items.size - 6) vm.more() }
    Box(Modifier.fillMaxSize().background(Color(0xFF0F0D1E))) {
        if (ui.loading) Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator(color = Color.White) }
        else VerticalPager(pager, Modifier.fillMaxSize()) { page ->
            ReelCard(ui.items[page], picked = ui.picks[page], page = page + 1, onPick = { vm.pick(page, it) })
        }
        ReelsTopBar(ui, onBack)
    }
}

@Composable
internal fun ReelsTopBar(ui: ReelsUi, onBack: () -> Unit) {
    Row(Modifier.fillMaxWidth().statusBarsPadding().padding(start = 4.dp, end = 14.dp, top = 4.dp), verticalAlignment = Alignment.CenterVertically) {
        IconButton(onClick = onBack) { Icon(Icons.Rounded.Close, "Close", tint = Color.White) }
        Text("🎬 Swipe & Learn", style = MaterialTheme.typography.titleMedium, color = Color.White, modifier = Modifier.weight(1f))
        if (ui.inARow >= 2) StatPill("🔥", "${ui.inARow}", Sb.Gold, Sb.Ink, Modifier.padding(end = 6.dp))
        StatPill("⭐", "${ui.xp} XP", Color.White.copy(alpha = .18f), Color.White)
    }
}

/** One full-screen question. Stateless: [picked] is the option chosen so far, if any. */
@Composable
fun ReelCard(q: Mcq, picked: Int?, page: Int, onPick: (Int) -> Unit) {
    val haptic = LocalHapticFeedback.current
    val colors = Sb.gradientFor(q.subjectId)
    val answered = picked != null
    Box(Modifier.fillMaxSize().background(Brush.verticalGradient(listOf(colors[0], colors[1].copy(alpha = .75f).compositeOver(Color(0xFF1A1735)), Color(0xFF14102F))))) {
        Column(
            Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding().verticalScroll(rememberScrollState()).padding(start = 20.dp, end = 20.dp, top = 64.dp, bottom = 16.dp),
            verticalArrangement = Arrangement.Center,
        ) {
            Surface(shape = RoundedCornerShape(50), color = Color.Black.copy(alpha = .25f), contentColor = Color.White) {
                Text("${q.subject} · Class ${q.cls}", style = MaterialTheme.typography.labelMedium, modifier = Modifier.padding(horizontal = 12.dp, vertical = 5.dp))
            }
            Spacer(Modifier.height(14.dp))
            Text(
                q.q, color = Color.White, fontSize = if (q.q.length > 90) 23.sp else 28.sp, lineHeight = if (q.q.length > 90) 30.sp else 36.sp,
                style = MaterialTheme.typography.headlineSmall, textAlign = if (q.rtl) TextAlign.End else TextAlign.Start, modifier = Modifier.fillMaxWidth(),
            )
            if (q.urdu.isNotBlank()) Text(q.urdu, color = Color.White.copy(alpha = .8f), style = MaterialTheme.typography.bodyMedium, textAlign = TextAlign.End, modifier = Modifier.fillMaxWidth().padding(top = 6.dp))
            Spacer(Modifier.height(18.dp))
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                q.options.forEachIndexed { i, text ->
                    val st = when {
                        !answered -> OptionState.Idle
                        i == q.answer && i == picked -> OptionState.Right
                        i == picked -> OptionState.Wrong
                        i == q.answer -> OptionState.Missed
                        else -> OptionState.Dimmed
                    }
                    OptionButton(i, text, st, rtl = q.rtl, onDark = true, onClick = { haptic.performHapticFeedback(HapticFeedbackType.LongPress); onPick(i) })
                }
            }
            Spacer(Modifier.height(14.dp))
            if (answered) {
                val right = picked == q.answer
                Surface(shape = RoundedCornerShape(18.dp), color = Color.Black.copy(alpha = .3f), contentColor = Color.White) {
                    Column(Modifier.padding(14.dp).fillMaxWidth()) {
                        Text(if (right) "🎉 Correct!  +10 XP" else "Right answer: ${q.options[q.answer]}  (+2 XP)", style = MaterialTheme.typography.titleSmall)
                        if (q.explanation.isNotBlank()) Text(q.explanation, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp))
                    }
                }
                SwipeHint()
            } else {
                Text("Pick an answer", color = Color.White.copy(alpha = .7f), style = MaterialTheme.typography.labelMedium, textAlign = TextAlign.Center, modifier = Modifier.fillMaxWidth())
            }
        }
        Text("#$page", color = Color.White.copy(alpha = .5f), style = MaterialTheme.typography.labelMedium, modifier = Modifier.align(Alignment.BottomEnd).navigationBarsPadding().padding(16.dp))
    }
}

@Composable
private fun SwipeHint() {
    val t = rememberInfiniteTransition(label = "hint")
    val a by t.animateFloat(.35f, 1f, infiniteRepeatable(tween(900), RepeatMode.Reverse), label = "a")
    Text("⬆  Swipe up for the next one", color = Color.White, style = MaterialTheme.typography.titleSmall, textAlign = TextAlign.Center,
        modifier = Modifier.fillMaxWidth().padding(top = 16.dp).alpha(a))
}
