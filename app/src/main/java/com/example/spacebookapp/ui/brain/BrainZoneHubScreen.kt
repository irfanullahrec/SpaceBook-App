package com.example.spacebookapp.ui.brain

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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.brain.BrainCategory
import com.example.spacebookapp.data.brain.BrainProgressManager
import com.example.spacebookapp.data.brain.BrainScoreState
import com.example.spacebookapp.ui.screens.ExplainLang

enum class BrainSubScreen {
    HUB,
    DEFENDER,
    FOCUS,
    IQ,
    THINKING
}

@Composable
fun BrainZoneHubScreen(
    onBack: () -> Unit
) {
    val context = LocalContext.current
    var subScreen by remember { mutableStateOf(BrainSubScreen.HUB) }
    var scoreState by remember { mutableStateOf(BrainProgressManager.load(context)) }
    var explainLang by remember { mutableStateOf(ExplainLang.ENGLISH) }

    // Parent Corner Dialog State
    var showParentGate by remember { mutableStateOf(false) }
    var parentGateAnswer by remember { mutableStateOf("") }
    var showParentSettings by remember { mutableStateOf(false) }

    LaunchedEffect(subScreen) {
        scoreState = BrainProgressManager.load(context)
    }

    when (subScreen) {
        BrainSubScreen.DEFENDER -> {
            AnswerDefenderGameScreen(onBack = { subScreen = BrainSubScreen.HUB })
            return
        }
        BrainSubScreen.FOCUS -> {
            FocusGamesScreen(onBack = { subScreen = BrainSubScreen.HUB })
            return
        }
        BrainSubScreen.IQ -> {
            LogicIQGamesScreen(onBack = { subScreen = BrainSubScreen.HUB })
            return
        }
        BrainSubScreen.THINKING -> {
            CriticalThinkingGamesScreen(onBack = { subScreen = BrainSubScreen.HUB })
            return
        }
        BrainSubScreen.HUB -> {
            // Display Main Hub Below
        }
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.horizontalGradient(
                            listOf(Color(0xFF0F172A), Color(0xFF1E1B4B), Color(0xFF312E81))
                        )
                    )
                    .padding(horizontal = 14.dp, vertical = 10.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }

                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = "🧠 Brain Zone",
                            fontSize = 20.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                        Text(
                            text = "Focus • Logic • Critical Thinking",
                            fontSize = 12.sp,
                            color = Color(0xFFA5B4FC),
                            fontWeight = FontWeight.SemiBold
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        ExplainLang.entries.forEach { lang ->
                            val sel = explainLang == lang
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (sel) Color(0xFF6366F1) else Color.White.copy(alpha = 0.15f),
                                modifier = Modifier.clickable { explainLang = lang }
                            ) {
                                Text(
                                    text = lang.label,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 4.dp)
                                )
                            }
                        }

                        IconButton(
                            onClick = { showParentGate = true },
                            modifier = Modifier
                                .size(32.dp)
                                .clip(CircleShape)
                                .background(Color.White.copy(alpha = 0.15f))
                        ) {
                            Icon(Icons.Default.Lock, contentDescription = "Parent Corner", tint = Color.White, modifier = Modifier.size(16.dp))
                        }
                    }
                }
            }
        }
    ) { pad ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(pad)
                .background(Brush.verticalGradient(listOf(Color(0xFF0F172A), Color(0xFF1E293B), Color(0xFF0F172A))))
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                Spacer(Modifier.height(8.dp))
                // Kid Skill Progress Dashboard
                Card(
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.95f)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 6.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text("⭐", fontSize = 28.sp)
                                Spacer(Modifier.width(8.dp))
                                Column {
                                    Text("Brain Stars", fontWeight = FontWeight.Bold, fontSize = 12.sp, color = Color(0xFF64748B))
                                    Text("${scoreState.totalStars} Stars Won", fontWeight = FontWeight.ExtraBold, fontSize = 18.sp, color = Color(0xFFD97706))
                                }
                            }

                            Surface(
                                shape = RoundedCornerShape(12.dp),
                                color = Color(0xFFFEF3C7)
                            ) {
                                Text(
                                    text = "🎖️ Brain Badge Active",
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color(0xFFB45309),
                                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                                )
                            }
                        }

                        Spacer(Modifier.height(14.dp))

                        // 3 Skill Progress Bars
                        SkillProgressRow("🎯 Focus & Attention", scoreState.focusScore, Color(0xFF4F46E5))
                        Spacer(Modifier.height(8.dp))
                        SkillProgressRow("🧩 Logic & Reasoning", scoreState.iqScore, Color(0xFF7E22CE))
                        Spacer(Modifier.height(8.dp))
                        SkillProgressRow("💡 Deep Analysis & Why?", scoreState.thinkingScore, Color(0xFFD97706))
                    }
                }
            }

            // Quick Play Big CTA (TikTok-easy 1 tap start)
            item {
                Button(
                    onClick = { subScreen = BrainSubScreen.DEFENDER },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0D9488)),
                    shape = RoundedCornerShape(20.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(60.dp)
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Text("🚀 Quick Play: Answer Defender ➔", fontSize = 17.sp, fontWeight = FontWeight.ExtraBold)
                    }
                }
            }

            // Game Hub Cards (4 Families)
            item {
                BrainHubCard(
                    emoji = "🛡️",
                    title = "Answer Defender (Arcade)",
                    subtitle = "Catch questions before cute aliens reach base!",
                    color1 = Color(0xFF0F766E),
                    color2 = Color(0xFF0D9488),
                    onClick = { subScreen = BrainSubScreen.DEFENDER }
                )
            }

            item {
                BrainHubCard(
                    emoji = "🎯",
                    title = "Focus & Attention Lab",
                    subtitle = "Odd one out, hidden search & memory patterns!",
                    color1 = Color(0xFF312E81),
                    color2 = Color(0xFF4338CA),
                    onClick = { subScreen = BrainSubScreen.FOCUS }
                )
            }

            item {
                BrainHubCard(
                    emoji = "🧩",
                    title = "Logic & IQ Reasoning",
                    subtitle = "Number puzzles, what comes next & analogies!",
                    color1 = Color(0xFF581C87),
                    color2 = Color(0xFF7E22CE),
                    onClick = { subScreen = BrainSubScreen.IQ }
                )
            }

            item {
                BrainHubCard(
                    emoji = "💡",
                    title = "Critical Thinking & Deep Analysis",
                    subtitle = "Why reasons, cause & effect, and detective deduction!",
                    color1 = Color(0xFF78350F),
                    color2 = Color(0xFFD97706),
                    onClick = { subScreen = BrainSubScreen.THINKING }
                )
            }

            item { Spacer(Modifier.height(20.dp)) }
        }
    }

    // Parent Gate Dialog (Simple math question: 7 + 5 = 12)
    if (showParentGate) {
        AlertDialog(
            onDismissRequest = { showParentGate = false },
            title = { Text("Parent Gate (والدین کے لیے)") },
            text = {
                Column {
                    Text("Please solve this math question to enter parent settings:")
                    Spacer(Modifier.height(8.dp))
                    Text("7 + 5 = ?", fontWeight = FontWeight.Bold, fontSize = 20.sp)
                    Spacer(Modifier.height(8.dp))
                    OutlinedTextField(
                        value = parentGateAnswer,
                        onValueChange = { parentGateAnswer = it },
                        label = { Text("Answer") }
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (parentGateAnswer.trim() == "12") {
                            showParentGate = false
                            showParentSettings = true
                            parentGateAnswer = ""
                        }
                    }
                ) {
                    Text("Unlock")
                }
            },
            dismissButton = {
                TextButton(onClick = { showParentGate = false }) {
                    Text("Cancel")
                }
            }
        )
    }

    // Parent Settings Dialog (Healthy limits: screen time & progress)
    if (showParentSettings) {
        var screenMinutes by remember { mutableIntStateOf(scoreState.screenLimitMinutes) }
        var soundToggle by remember { mutableStateOf(scoreState.soundEnabled) }

        AlertDialog(
            onDismissRequest = { showParentSettings = false },
            title = { Text("🛡️ Healthy Play Settings") },
            text = {
                Column {
                    Text("Daily Screen Time Reminder: $screenMinutes minutes", fontWeight = FontWeight.Bold)
                    Slider(
                        value = screenMinutes.toFloat(),
                        onValueChange = { screenMinutes = it.toInt() },
                        valueRange = 10f..60f,
                        steps = 4
                    )
                    Spacer(Modifier.height(8.dp))
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Game Sounds & Tones")
                        Switch(
                            checked = soundToggle,
                            onCheckedChange = { soundToggle = it }
                        )
                    }
                    Spacer(Modifier.height(8.dp))
                    Text("Child Stats Today:", fontWeight = FontWeight.Bold)
                    Text("• Focus Score: ${scoreState.focusScore} pts")
                    Text("• IQ Logic Score: ${scoreState.iqScore} pts")
                    Text("• Critical Thinking: ${scoreState.thinkingScore} pts")
                    Text("• Total Stars: ${scoreState.totalStars}")
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        BrainProgressManager.setLimitMinutes(context, screenMinutes)
                        BrainProgressManager.setSoundEnabled(context, soundToggle)
                        scoreState = BrainProgressManager.load(context)
                        showParentSettings = false
                    }
                ) {
                    Text("Save")
                }
            }
        )
    }
}

@Composable
private fun SkillProgressRow(title: String, score: Int, color: Color) {
    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(title, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF1E293B))
            Text("$score / 100", fontSize = 12.sp, fontWeight = FontWeight.ExtraBold, color = color)
        }
        Spacer(Modifier.height(4.dp))
        LinearProgressIndicator(
            progress = { (score % 100) / 100f },
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(RoundedCornerShape(4.dp)),
            color = color,
            trackColor = color.copy(alpha = 0.15f)
        )
    }
}

@Composable
private fun BrainHubCard(
    emoji: String,
    title: String,
    subtitle: String,
    color1: Color,
    color2: Color,
    onClick: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(containerColor = Color.Transparent),
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Brush.horizontalGradient(listOf(color1, color2)))
                .padding(18.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                Surface(
                    shape = CircleShape,
                    color = Color.White.copy(alpha = 0.2f),
                    modifier = Modifier.size(54.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Text(text = emoji, fontSize = 32.sp)
                    }
                }
                Spacer(Modifier.width(14.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = title,
                        fontSize = 17.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                    Spacer(Modifier.height(3.dp))
                    Text(
                        text = subtitle,
                        fontSize = 12.sp,
                        color = Color.White.copy(alpha = 0.85f),
                        lineHeight = 16.sp
                    )
                }
                Icon(Icons.Default.PlayArrow, contentDescription = null, tint = Color.White, modifier = Modifier.size(24.dp))
            }
        }
    }
}
