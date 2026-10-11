package com.example.spacebookapp.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
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
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.OutlinedTextField
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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.brain.BrainProgressManager

@Composable
fun KidsProfileScreen(
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var scoreState by remember { mutableStateOf(BrainProgressManager.load(context)) }

    // Parent Corner Dialog State
    var showParentGate by remember { mutableStateOf(false) }
    var parentGateAnswer by remember { mutableStateOf("") }
    var showParentSettings by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        scoreState = BrainProgressManager.load(context)
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
    ) {
        // Top Header
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.horizontalGradient(
                        listOf(Color(0xFF0F172A), Color(0xFF1E293B), Color(0xFF334155))
                    )
                )
                .padding(20.dp)
        ) {
            Column {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(54.dp)
                            .clip(CircleShape)
                            .background(Color(0xFF3B82F6)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Person,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(32.dp)
                        )
                    }

                    Spacer(Modifier.width(14.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "Little Scholar 🌟",
                            color = Color.White,
                            fontSize = 19.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                        Text(
                            text = "Class 3 • SpaceBook Explorer",
                            color = Color(0xFF94A3B8),
                            fontSize = 12.sp
                        )
                    }
                }

                Spacer(Modifier.height(14.dp))

                // Stars and Streak Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Surface(
                        shape = RoundedCornerShape(14.dp),
                        color = Color(0x33F59E0B),
                        border = BorderStroke(1.dp, Color(0xFFF59E0B)),
                        modifier = Modifier.weight(1f)
                    ) {
                        Row(
                            modifier = Modifier.padding(10.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("⭐", fontSize = 22.sp)
                            Spacer(Modifier.width(8.dp))
                            Column {
                                Text("Total Stars", fontSize = 11.sp, color = Color(0xFFFDE68A))
                                Text("${scoreState.totalStars}", fontSize = 16.sp, fontWeight = FontWeight.ExtraBold, color = Color.White)
                            }
                        }
                    }

                    Surface(
                        shape = RoundedCornerShape(14.dp),
                        color = Color(0x3310B981),
                        border = BorderStroke(1.dp, Color(0xFF10B981)),
                        modifier = Modifier.weight(1f)
                    ) {
                        Row(
                            modifier = Modifier.padding(10.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text("🔥", fontSize = 22.sp)
                            Spacer(Modifier.width(8.dp))
                            Column {
                                Text("Daily Streak", fontSize = 11.sp, color = Color(0xFFA7F3D0))
                                Text("${scoreState.streakDays} Days", fontSize = 16.sp, fontWeight = FontWeight.ExtraBold, color = Color.White)
                            }
                        }
                    }
                }
            }
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            // Brain Zone Skills Card
            item {
                Card(
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = "🧠 Brain Zone Mastery",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF0F172A)
                        )
                        Spacer(Modifier.height(12.dp))

                        SkillProgressBar(label = "🎯 Focus & Attention", score = scoreState.focusScore, color = Color(0xFF3B82F6))
                        Spacer(Modifier.height(10.dp))
                        SkillProgressBar(label = "🧩 Logic & IQ", score = scoreState.iqScore, color = Color(0xFF8B5CF6))
                        Spacer(Modifier.height(10.dp))
                        SkillProgressBar(label = "💡 Critical Thinking", score = scoreState.thinkingScore, color = Color(0xFF10B981))
                    }
                }
            }

            // Parent Corner Section
            item {
                Card(
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFEFF6FF)),
                    border = BorderStroke(1.5.dp, Color(0xFFBFDBFE)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Default.Lock, contentDescription = null, tint = Color(0xFF1D4ED8), modifier = Modifier.size(20.dp))
                                Spacer(Modifier.width(8.dp))
                                Column {
                                    Text(
                                        text = "Parent Corner",
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 15.sp,
                                        color = Color(0xFF1E3A8A)
                                    )
                                    Text(
                                        text = "Screen time limit & bedtime lock",
                                        fontSize = 11.sp,
                                        color = Color(0xFF3B82F6)
                                    )
                                }
                            }

                            Button(
                                onClick = { showParentGate = true },
                                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB)),
                                shape = RoundedCornerShape(12.dp)
                            ) {
                                Text("Open", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                            }
                        }
                    }
                }
            }

            // KPK Curriculum Badge
            item {
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color.White,
                    border = BorderStroke(1.dp, Color(0xFFE2E8F0)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("🏛️", fontSize = 24.sp)
                        Spacer(Modifier.width(12.dp))
                        Column {
                            Text(
                                text = "Khyber Pakhtunkhwa Textbook Board",
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp,
                                color = Color(0xFF0F172A)
                            )
                            Text(
                                text = "Grade 1 & 3 Curriculum Aligned • 2026",
                                fontSize = 11.sp,
                                color = Color(0xFF64748B)
                            )
                        }
                    }
                }
            }

            item {
                Spacer(Modifier.height(30.dp))
            }
        }
    }

    // ─── Parent Gate Dialog ───
    if (showParentGate) {
        val num1 = 7
        val num2 = 8
        AlertDialog(
            onDismissRequest = { showParentGate = false },
            title = {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Lock, contentDescription = null, tint = Color(0xFFD97706))
                    Spacer(Modifier.width(8.dp))
                    Text("Parents Only", fontWeight = FontWeight.Bold)
                }
            },
            text = {
                Column {
                    Text("Please solve this to open Parent Controls:")
                    Spacer(Modifier.height(8.dp))
                    Text(
                        text = "$num1 × $num2 = ?",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 20.sp,
                        color = Color(0xFF1E293B)
                    )
                    Spacer(Modifier.height(10.dp))
                    OutlinedTextField(
                        value = parentGateAnswer,
                        onValueChange = { parentGateAnswer = it },
                        label = { Text("Answer") },
                        singleLine = true
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (parentGateAnswer.trim() == "56") {
                            showParentGate = false
                            parentGateAnswer = ""
                            showParentSettings = true
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

    // ─── Parent Settings Dialog ───
    if (showParentSettings) {
        var limitSlider by remember { mutableIntStateOf(scoreState.screenLimitMinutes) }
        var soundToggle by remember { mutableStateOf(scoreState.soundEnabled) }

        AlertDialog(
            onDismissRequest = { showParentSettings = false },
            title = {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Settings, contentDescription = null, tint = Color(0xFF4F46E5))
                    Spacer(Modifier.width(8.dp))
                    Text("Parent Controls", fontWeight = FontWeight.Bold)
                }
            },
            text = {
                Column {
                    Text("Daily Screen Time Limit: $limitSlider mins", fontWeight = FontWeight.Bold)
                    Slider(
                        value = limitSlider.toFloat(),
                        onValueChange = { limitSlider = it.toInt() },
                        valueRange = 15f..60f,
                        steps = 2
                    )
                    Text("Options: 15 / 30 / 45 / 60 minutes", fontSize = 11.sp, color = Color(0xFF64748B))

                    Spacer(Modifier.height(16.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Game Sounds & Voice", fontWeight = FontWeight.SemiBold)
                        Switch(
                            checked = soundToggle,
                            onCheckedChange = { soundToggle = it }
                        )
                    }

                    Spacer(Modifier.height(8.dp))
                    Text("🌙 Bedtime Lock: 8:00 PM - 7:00 AM (Auto Rest)", fontSize = 12.sp, color = Color(0xFF475569))
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        BrainProgressManager.setLimitMinutes(context, limitSlider)
                        BrainProgressManager.setSoundEnabled(context, soundToggle)
                        scoreState = BrainProgressManager.load(context)
                        showParentSettings = false
                    }
                ) {
                    Text("Save Settings")
                }
            },
            dismissButton = {
                TextButton(onClick = { showParentSettings = false }) {
                    Text("Close")
                }
            }
        )
    }
}

@Composable
private fun SkillProgressBar(
    label: String,
    score: Int,
    color: Color
) {
    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(label, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF334155))
            Text("$score XP", fontSize = 12.sp, fontWeight = FontWeight.ExtraBold, color = color)
        }
        Spacer(Modifier.height(4.dp))
        LinearProgressIndicator(
            progress = { (score % 100) / 100f },
            color = color,
            trackColor = color.copy(alpha = 0.15f),
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .clip(RoundedCornerShape(4.dp))
        )
    }
}
