package pk.wantuch.spacebook.ui.play

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
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Close
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import pk.wantuch.spacebook.data.play.Mcq
import pk.wantuch.spacebook.ui.theme.Sb

@Composable
fun QuizScreen(onBack: () -> Unit, onReels: () -> Unit, vm: QuizViewModel = hiltViewModel()) {
    val ui by vm.ui.collectAsStateWithLifecycle()
    QuizContent(ui, onPick = vm::pick, onNext = vm::next, onAgain = vm::start, onBack = onBack, onReels = onReels)
}

/** The whole Quick Quiz, with no view model (the screenshot tests draw it too). */
@Composable
fun QuizContent(ui: QuizUi, onPick: (Int) -> Unit, onNext: () -> Unit, onAgain: () -> Unit, onBack: () -> Unit, onReels: () -> Unit) {
    val q = ui.questions.getOrNull(ui.index)
    val brush = Brush.verticalGradient(listOf(Color(0xFF241A7A), Color(0xFF4B2BC4)))
    Box(Modifier.fillMaxSize().background(brush)) {
        Column(Modifier.fillMaxSize().statusBarsPadding().navigationBarsPadding()) {
            Row(Modifier.fillMaxWidth().padding(start = 4.dp, end = 16.dp, top = 6.dp), verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = onBack) { Icon(Icons.Rounded.Close, "Close quiz", tint = Color.White) }
                Text("⚡ Quick Quiz", style = MaterialTheme.typography.titleMedium, color = Color.White, modifier = Modifier.weight(1f))
                StatPill("⭐", "${ui.xpGained} XP", Color.White.copy(alpha = .18f), Color.White)
            }
            when {
                ui.loading -> Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator(color = Color.White) }
                ui.finished -> QuizResult(ui, onAgain, onReels, onBack)
                q != null -> QuizQuestion(ui, q, onPick, onNext)
            }
        }
        if (ui.finished && ui.correct * 2 >= ui.questions.size) Confetti()
    }
}

@Composable
private fun QuizQuestion(ui: QuizUi, q: Mcq, onPick: (Int) -> Unit, onNext: () -> Unit) {
    val haptic = LocalHapticFeedback.current
    val answered = ui.picked != null
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 18.dp, vertical = 8.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        StepBar(done = ui.index + if (answered) 1 else 0, total = ui.questions.size)
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Question ${ui.index + 1} of ${ui.questions.size}", color = Color.White.copy(alpha = .8f), style = MaterialTheme.typography.labelMedium, modifier = Modifier.weight(1f))
            if (ui.combo >= 2) StatPill("🔥", "${ui.combo} in a row", Sb.Gold, Sb.Ink)
        }
        Surface(shape = RoundedCornerShape(50), color = Color.White.copy(alpha = .16f), contentColor = Color.White) {
            Text("${q.subject} · Class ${q.cls}", style = MaterialTheme.typography.labelMedium, modifier = Modifier.padding(horizontal = 12.dp, vertical = 5.dp))
        }
        Surface(shape = RoundedCornerShape(26.dp), color = MaterialTheme.colorScheme.surface, shadowElevation = 6.dp, modifier = Modifier.fillMaxWidth()) {
            Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(q.q, style = MaterialTheme.typography.titleLarge, textAlign = if (q.rtl) TextAlign.End else TextAlign.Start, modifier = Modifier.fillMaxWidth())
                if (q.urdu.isNotBlank()) Text(q.urdu, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, textAlign = TextAlign.End, modifier = Modifier.fillMaxWidth())
            }
        }
        q.options.forEachIndexed { i, text ->
            val st = when {
                !answered -> OptionState.Idle
                i == q.answer && i == ui.picked -> OptionState.Right
                i == ui.picked -> OptionState.Wrong
                i == q.answer -> OptionState.Missed
                else -> OptionState.Dimmed
            }
            OptionButton(i, text, st, rtl = q.rtl, onDark = true, onClick = { haptic.performHapticFeedback(HapticFeedbackType.LongPress); onPick(i) })
        }
        if (answered) {
            val right = ui.picked == q.answer
            Surface(shape = RoundedCornerShape(20.dp), color = if (right) Color(0xFF1FB57A).copy(alpha = .22f) else Color(0xFFE5484D).copy(alpha = .22f), contentColor = Color.White) {
                Column(Modifier.padding(14.dp).fillMaxWidth()) {
                    Text(if (right) "🎉 Correct! +10 XP" else "Not this time. +2 XP for trying", style = MaterialTheme.typography.titleSmall)
                    if (!right) Text("Right answer: ${q.options[q.answer]}", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 2.dp))
                    if (q.explanation.isNotBlank()) Text(q.explanation, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 4.dp), color = Color.White.copy(alpha = .9f))
                }
            }
            Button(
                onClick = onNext, modifier = Modifier.fillMaxWidth().height(54.dp), shape = RoundedCornerShape(18.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Sb.Gold, contentColor = Sb.Ink),
            ) { Text(if (ui.index == ui.questions.lastIndex) "See my result" else "Next question", style = MaterialTheme.typography.titleSmall) }
        }
        Spacer(Modifier.height(12.dp))
    }
}

@Composable
private fun QuizResult(ui: QuizUi, onAgain: () -> Unit, onReels: () -> Unit, onBack: () -> Unit) {
    val total = ui.questions.size.coerceAtLeast(1)
    val stars = when { ui.correct == total -> 3; ui.correct * 2 >= total -> 2; ui.correct >= 1 -> 1; else -> 0 }
    Column(Modifier.fillMaxSize().padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
        Text(when (stars) { 3 -> "🏆"; 2 -> "🎉"; else -> "💪" }, fontSize = 72.sp)
        Text(when (stars) { 3 -> "Perfect!"; 2 -> "Well done!"; else -> "Good try!" }, style = MaterialTheme.typography.headlineMedium, color = Color.White)
        Text("You got ${ui.correct} of $total right", style = MaterialTheme.typography.titleMedium, color = Color.White.copy(alpha = .85f), modifier = Modifier.padding(top = 4.dp))
        Row(Modifier.padding(vertical = 16.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            repeat(3) { Text(if (it < stars) "⭐" else "☆", fontSize = 40.sp, color = Color.White.copy(alpha = if (it < stars) 1f else .5f)) }
        }
        StatPill("⭐", "+${ui.xpGained} XP earned", Sb.Gold, Sb.Ink)
        Spacer(Modifier.height(28.dp))
        Button(onClick = onAgain, modifier = Modifier.fillMaxWidth().height(54.dp), shape = RoundedCornerShape(18.dp), colors = ButtonDefaults.buttonColors(containerColor = Sb.Gold, contentColor = Sb.Ink)) {
            Text("Play again with new questions", style = MaterialTheme.typography.titleSmall)
        }
        Spacer(Modifier.height(10.dp))
        OutlinedButton(onClick = onReels, modifier = Modifier.fillMaxWidth().height(50.dp), shape = RoundedCornerShape(18.dp), colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White)) {
            Text("🎬 Swipe & Learn more", style = MaterialTheme.typography.titleSmall)
        }
        Spacer(Modifier.height(6.dp))
        OutlinedButton(onClick = onBack, modifier = Modifier.fillMaxWidth().height(50.dp), shape = RoundedCornerShape(18.dp), colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White)) {
            Text("Back to Home", style = MaterialTheme.typography.titleSmall)
        }
    }
}
