package com.example.spacebookapp.ui.screens

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
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
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
fun KidsLearnBooksScreen(
    onOpenClass7Hub: () -> Unit,
    onOpenClass3Hub: () -> Unit,
    onOpenClass1Hub: () -> Unit,
    onOpenTextbooks: () -> Unit,
    onOpenQuickPlay: () -> Unit,
    onOpenSocialFeed: () -> Unit,
    onHamburgerClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val scoreState = remember { BrainProgressManager.load(context) }
    var selectedLang by remember { mutableStateOf(ExplainLang.ENGLISH) }

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
                .padding(horizontal = 16.dp, vertical = 12.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    IconButton(onClick = onHamburgerClick) {
                        Icon(Icons.Default.Menu, contentDescription = "Menu", tint = Color.White)
                    }
                    Spacer(Modifier.width(6.dp))
                    Column {
                        Text(
                            text = "📚 SpaceBook Learn",
                            fontSize = 18.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                        Text(
                            text = "KPK Primary & High School Books",
                            fontSize = 11.sp,
                            color = Color(0xFF94A3B8)
                        )
                    }
                }

                // Stars Badge
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color(0x33F59E0B),
                    border = BorderStroke(1.dp, Color(0xFFF59E0B))
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.Star, contentDescription = null, tint = Color(0xFFF59E0B), modifier = Modifier.size(16.dp))
                        Spacer(Modifier.width(4.dp))
                        Text("${scoreState.totalStars} ⭐", color = Color(0xFFFDE68A), fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                }
            }
        }

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                Spacer(Modifier.height(4.dp))
            }

            // Big 1-Tap "CONTINUE PLAYING" Button
            item {
                Card(
                    shape = RoundedCornerShape(22.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.Transparent),
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { onOpenQuickPlay() }
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(
                                Brush.horizontalGradient(
                                    listOf(Color(0xFF4F46E5), Color(0xFF7C3AED), Color(0xFFEC4899))
                                )
                            )
                            .padding(18.dp)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Surface(
                                    shape = RoundedCornerShape(10.dp),
                                    color = Color.White.copy(alpha = 0.2f)
                                ) {
                                    Text(
                                        text = "⚡ 1-TAP RESUME",
                                        color = Color(0xFFFDE68A),
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                                    )
                                }
                                Spacer(Modifier.height(6.dp))
                                Text(
                                    text = "Continue Challenge! 🚀",
                                    color = Color.White,
                                    fontSize = 19.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                                Text(
                                    text = "Quick 15-second swipe games & quizzes",
                                    color = Color.White.copy(alpha = 0.85f),
                                    fontSize = 12.sp
                                )
                            }

                            Box(
                                modifier = Modifier
                                    .size(52.dp)
                                    .clip(CircleShape)
                                    .background(Color.White),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.PlayArrow, contentDescription = "Play", tint = Color(0xFF4F46E5), modifier = Modifier.size(34.dp))
                            }
                        }
                    }
                }
            }

            // Book Hub: Class 7 Books Hub
            item {
                LearnBookCard(
                    title = "Class 7 Books Hub",
                    subtitle = "12 Books • Mathematics, Science, English, CS & Quizzes",
                    badge = "12 BOOKS • GRADE 7",
                    badgeColor = Color(0xFF0284C7),
                    iconEmoji = "📐",
                    gradientColors = listOf(Color(0xFFF0F9FF), Color(0xFFE0F2FE)),
                    borderColor = Color(0xFF7DD3FC),
                    onClick = onOpenClass7Hub
                )
            }

            // Book Hub 1: Class 3 Books Hub
            item {
                LearnBookCard(
                    title = "Class 3 Books Hub",
                    subtitle = "16 GK Chapters • Matter, Sun, Resources, Iqbal & Safety",
                    badge = "7 BOOKS • GRADE 3",
                    badgeColor = Color(0xFFD97706),
                    iconEmoji = "📙",
                    gradientColors = listOf(Color(0xFFFFFBEB), Color(0xFFFEF3C7)),
                    borderColor = Color(0xFFFBBF24),
                    onClick = onOpenClass3Hub
                )
            }

            // Book Hub 2: Class 1 Books Hub
            item {
                LearnBookCard(
                    title = "Class 1 Books Hub",
                    subtitle = "8 Books • English ABC, Maths 123, Drawing, Urdu & Pashto",
                    badge = "8 BOOKS • GRADE 1",
                    badgeColor = Color(0xFF2563EB),
                    iconEmoji = "📘",
                    gradientColors = listOf(Color(0xFFEFF6FF), Color(0xFFDBEAFE)),
                    borderColor = Color(0xFF93C5FD),
                    onClick = onOpenClass1Hub
                )
            }

            // Digital Textbooks & Higher Curriculum
            item {
                LearnBookCard(
                    title = "KPK Board Digital Textbooks",
                    subtitle = "Class 9-12 • Topics, MCQs, Short & Long Qs",
                    badge = "SECONDARY • 9-12",
                    badgeColor = Color(0xFF0D9488),
                    iconEmoji = "📗",
                    gradientColors = listOf(Color(0xFFF0FDFA), Color(0xFFCCFBF1)),
                    borderColor = Color(0xFF5EEAD4),
                    onClick = onOpenTextbooks
                )
            }

            // Community Feed & Discussion
            item {
                LearnBookCard(
                    title = "Study Circle & Community Feed",
                    subtitle = "Facebook-style feed, notes & teacher questions",
                    badge = "SOCIAL STUDY",
                    badgeColor = Color(0xFF475569),
                    iconEmoji = "👥",
                    gradientColors = listOf(Color(0xFFF8FAFC), Color(0xFFF1F5F9)),
                    borderColor = Color(0xFFCBD5E1),
                    onClick = onOpenSocialFeed
                )
            }

            item {
                Spacer(Modifier.height(24.dp))
            }
        }
    }
}

@Composable
private fun LearnBookCard(
    title: String,
    subtitle: String,
    badge: String,
    badgeColor: Color,
    iconEmoji: String,
    gradientColors: List<Color>,
    borderColor: Color,
    onClick: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(20.dp),
        border = BorderStroke(1.5.dp, borderColor),
        colors = CardDefaults.cardColors(containerColor = Color.Transparent),
        elevation = CardDefaults.cardElevation(defaultElevation = 3.dp),
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Brush.horizontalGradient(gradientColors))
                .padding(16.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                Box(
                    modifier = Modifier
                        .size(54.dp)
                        .clip(RoundedCornerShape(16.dp))
                        .background(Color.White),
                    contentAlignment = Alignment.Center
                ) {
                    Text(text = iconEmoji, fontSize = 30.sp)
                }

                Spacer(Modifier.width(14.dp))

                Column(modifier = Modifier.weight(1f)) {
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = badgeColor.copy(alpha = 0.15f)
                    ) {
                        Text(
                            text = badge,
                            color = badgeColor,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 10.sp,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }

                    Spacer(Modifier.height(4.dp))

                    Text(
                        text = title,
                        fontSize = 16.5.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFF0F172A)
                    )

                    Text(
                        text = subtitle,
                        fontSize = 12.sp,
                        color = Color(0xFF475569),
                        lineHeight = 16.sp
                    )
                }
            }
        }
    }
}
