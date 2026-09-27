package com.example.spacebookapp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.Timer
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.models.ChartBarData
import com.example.spacebookapp.data.models.StatMediaData
import com.example.spacebookapp.data.models.StatMediaType

@Composable
fun StatMediaCard(
    statMedia: StatMediaData,
    modifier: Modifier = Modifier
) {
    val brush = Brush.verticalGradient(
        if (statMedia.gradientColors.size >= 2) {
            statMedia.gradientColors.map { Color(it) }
        } else {
            listOf(Color(0xFF1E3A8A), Color(0xFF2563EB))
        }
    )

    // Sized like a Facebook post media image (height ~230dp, full width)
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(230.dp)
            .background(brush)
            .padding(16.dp)
    ) {
        when (statMedia.type) {
            StatMediaType.STUDIED_QUESTIONS -> StudiedQuestionsCardContent(statMedia)
            StatMediaType.CORRECT_ANSWERS -> CorrectAnswersCardContent(statMedia)
            StatMediaType.INCORRECT_ANSWERS -> IncorrectAnswersCardContent(statMedia)
            StatMediaType.ACCURACY_RATE -> AccuracyRateCardContent(statMedia)
            StatMediaType.WEEKLY_ACTIVITY -> WeeklyActivityCardContent(statMedia)
            StatMediaType.DAILY_STREAK -> DailyStreakCardContent(statMedia)
            StatMediaType.DAILY_GOAL -> DailyGoalCardContent(statMedia)
            StatMediaType.CURRICULUM_COVERAGE -> CurriculumCoverageCardContent(statMedia)
        }
    }
}

// ─── 1. Studied Questions Content ───
@Composable
private fun StudiedQuestionsCardContent(stat: StatMediaData) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0x33FFFFFF))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "📝 REAL-TIME PRACTICE",
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = stat.badgeText,
                color = Color(0xFFBFDBFE),
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = stat.primaryValue,
                    fontSize = 52.sp,
                    fontWeight = FontWeight.ExtraBold,
                    fontFamily = FontFamily.SansSerif,
                    color = Color.White
                )
                Text(
                    text = stat.secondaryValue,
                    fontSize = 13.sp,
                    color = Color(0xFFE2E8F0),
                    fontWeight = FontWeight.Medium
                )
            }

            // Circular progress or graphic element
            Box(
                modifier = Modifier
                    .size(68.dp)
                    .clip(CircleShape)
                    .background(Color(0x33FFFFFF))
                    .border(3.dp, Color(0x66FFFFFF), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                        text = "+18",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Text(
                        text = "Today",
                        fontSize = 10.sp,
                        color = Color(0xFFBFDBFE)
                    )
                }
            }
        }

        // Breakdown pills
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            stat.pills.forEach { pill ->
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(Color(0x22000000))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = pill,
                        fontSize = 11.sp,
                        color = Color(0xFFF1F5F9),
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }
    }
}

// ─── 2. Correct Answers Content ───
@Composable
private fun CorrectAnswersCardContent(stat: StatMediaData) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0x33FFFFFF))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "✅ CONCEPTUAL CLARITY",
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = "🌟 High Retention",
                color = Color(0xFFA7F3D0),
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = stat.primaryValue,
                    fontSize = 52.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color.White
                )
                Text(
                    text = stat.secondaryValue,
                    fontSize = 13.sp,
                    color = Color(0xFFD1FAE5),
                    fontWeight = FontWeight.Medium
                )
            }

            Box(
                modifier = Modifier
                    .size(64.dp)
                    .clip(CircleShape)
                    .background(Color(0x33FFFFFF)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(42.dp)
                )
            }
        }

        // Subject Breakdown
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            stat.pills.forEach { pill ->
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(Color(0x2A000000))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = pill,
                        fontSize = 11.sp,
                        color = Color(0xFFECFDF5),
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }
    }
}

// ─── 3. Incorrect Answers & Revision Content ───
@Composable
private fun IncorrectAnswersCardContent(stat: StatMediaData) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0x33FFFFFF))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "❌ REVISION BANK",
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = "Targeted Review",
                color = Color(0xFFFECDD3),
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = stat.primaryValue,
                    fontSize = 52.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color.White
                )
                Text(
                    text = stat.secondaryValue,
                    fontSize = 13.sp,
                    color = Color(0xFFFFE4E6),
                    fontWeight = FontWeight.Medium
                )
            }

            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color.White)
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                contentAlignment = Alignment.Center
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Refresh,
                        contentDescription = null,
                        tint = Color(0xFFBE123C),
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "Practice Review",
                        color = Color(0xFFBE123C),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // Topics to review
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            stat.pills.forEach { pill ->
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(Color(0x2A000000))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = pill,
                        fontSize = 10.5.sp,
                        color = Color(0xFFFFF1F2),
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }
    }
}

// ─── 4. Accuracy Rate Content ───
@Composable
private fun AccuracyRateCardContent(stat: StatMediaData) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0x33FFFFFF))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "🎯 EXAM RATING",
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = "🌟 Distinction Tier",
                color = Color(0xFFDDD6FE),
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Column {
            Text(
                text = stat.primaryValue,
                fontSize = 50.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color.White
            )
            Text(
                text = stat.secondaryValue,
                fontSize = 13.5.sp,
                color = Color(0xFFEDE9FE),
                fontWeight = FontWeight.Medium
            )
        }

        // Progress Bar
        Column {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Pass (50%)", fontSize = 10.sp, color = Color(0xFFDDD6FE))
                Text("Good (75%)", fontSize = 10.sp, color = Color(0xFFDDD6FE))
                Text("Distinction (85%+)", fontSize = 10.sp, color = Color(0xFFFDE047), fontWeight = FontWeight.Bold)
            }
            Spacer(modifier = Modifier.height(4.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(10.dp)
                    .clip(RoundedCornerShape(5.dp))
                    .background(Color(0x33FFFFFF))
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(stat.progressPercent.coerceIn(0f, 1f))
                        .fillMaxHeight()
                        .clip(RoundedCornerShape(5.dp))
                        .background(
                            Brush.horizontalGradient(
                                listOf(Color(0xFF38BDF8), Color(0xFFFDE047))
                            )
                        )
                )
            }
        }

        Text(
            text = "KPK Board Target: Maintain 85%+ to secure top board position.",
            fontSize = 11.sp,
            color = Color(0xFFC4B5FD)
        )
    }
}

// ─── 5. Weekly Activity Content (Bar Chart) ───
@Composable
private fun WeeklyActivityCardContent(stat: StatMediaData) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0x33FFFFFF))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "📈 7-DAY PRACTICE ACTIVITY",
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = "Total: ${stat.primaryValue}",
                color = Color(0xFFBAE6FD),
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold
            )
        }

        // 7-day Bar Chart
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(120.dp)
                .padding(vertical = 4.dp),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.Bottom
        ) {
            val maxQuestions = stat.chartBars.maxOfOrNull { it.questions }?.coerceAtLeast(30) ?: 30

            stat.chartBars.forEach { bar ->
                val barFraction = (bar.questions.toFloat() / maxQuestions).coerceIn(0.12f, 1f)
                val barColor = if (bar.isActive) Color(0xFF10B981) else Color(0xFF38BDF8)

                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Bottom
                ) {
                    Text(
                        text = "${bar.questions}",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (bar.isActive) Color(0xFF6EE7B7) else Color(0xFFBAE6FD)
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Box(
                        modifier = Modifier
                            .width(22.dp)
                            .height((75 * barFraction).dp)
                            .clip(RoundedCornerShape(topStart = 4.dp, topEnd = 4.dp))
                            .background(barColor)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = bar.day,
                        fontSize = 10.sp,
                        fontWeight = if (bar.isActive) FontWeight.Bold else FontWeight.Normal,
                        color = Color.White
                    )
                }
            }
        }

        Text(
            text = "🟩 Active Day: Saturday • Consistent practice boosts retention",
            fontSize = 11.sp,
            color = Color(0xFFE0F2FE)
        )
    }
}

// ─── 6. Daily Study Streak Content ───
@Composable
private fun DailyStreakCardContent(stat: StatMediaData) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0x33FFFFFF))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "🔥 STUDY STREAK",
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = "Keep up momentum!",
                color = Color(0xFFFED7AA),
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = stat.primaryValue,
                        fontSize = 50.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Icon(
                        imageVector = Icons.Default.LocalFireDepartment,
                        contentDescription = null,
                        tint = Color(0xFFFDE047),
                        modifier = Modifier.size(46.dp)
                    )
                }
                Text(
                    text = stat.secondaryValue,
                    fontSize = 13.sp,
                    color = Color(0xFFFFEDD5),
                    fontWeight = FontWeight.Medium
                )
            }
        }

        // Weekday dots
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            listOf("Mon" to true, "Tue" to true, "Wed" to true, "Thu" to true, "Fri" to true, "Sat" to true, "Sun" to false).forEach { (day, done) ->
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Box(
                        modifier = Modifier
                            .size(24.dp)
                            .clip(CircleShape)
                            .background(if (done) Color(0xFFFDE047) else Color(0x33FFFFFF)),
                        contentAlignment = Alignment.Center
                    ) {
                        if (done) {
                            Text("✓", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF78350F))
                        }
                    }
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(day, fontSize = 9.sp, color = Color(0xFFFFEDD5))
                }
            }
        }

        Text(
            text = "🏆 Next Goal: 7-Day Champion Badge (2 days remaining)",
            fontSize = 11.sp,
            color = Color(0xFFFEF3C7)
        )
    }
}

// ─── 7. Daily Goal & Focus Time Content ───
@Composable
private fun DailyGoalCardContent(stat: StatMediaData) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0x33FFFFFF))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "🎯 DAILY TARGET & TIME",
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = "Target: 25 Questions/Day",
                color = Color(0xFF99F6E4),
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = stat.primaryValue,
                    fontSize = 46.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color.White
                )
                Text(
                    text = stat.secondaryValue,
                    fontSize = 13.sp,
                    color = Color(0xFFCCFBF1),
                    fontWeight = FontWeight.Medium
                )
            }

            // Focus Time badge
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color(0x33FFFFFF))
                    .padding(horizontal = 12.dp, vertical = 8.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Timer,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    Text(
                        text = "45 Mins Focus",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                }
            }
        }

        // Progress bar
        Column {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Progress: 72% Completed", fontSize = 11.sp, color = Color(0xFF99F6E4), fontWeight = FontWeight.Bold)
                Text("7 Qs Remaining", fontSize = 11.sp, color = Color.White)
            }
            Spacer(modifier = Modifier.height(4.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(10.dp)
                    .clip(RoundedCornerShape(5.dp))
                    .background(Color(0x33FFFFFF))
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(stat.progressPercent.coerceIn(0f, 1f))
                        .fillMaxHeight()
                        .clip(RoundedCornerShape(5.dp))
                        .background(Color(0xFF34D399))
                )
            }
        }

        Text(
            text = "💡 Practice of 20+ questions daily improves exam retention by 80%",
            fontSize = 10.5.sp,
            color = Color(0xFFE6FFFA)
        )
    }
}

// ─── 8. Curriculum Coverage Content ───
@Composable
private fun CurriculumCoverageCardContent(stat: StatMediaData) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0x33FFFFFF))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "🏛️ KPK TEXTBOOK BOARD DATABASE",
                    color = Color.White,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = "Verified Coverage",
                color = Color(0xFFFDE68A),
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold
            )
        }

        // 4-Quadrant Grid
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            // Quadrant 1
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color(0x22FFFFFF))
                    .padding(8.dp)
            ) {
                Column {
                    Text("📚 10+", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    Text("Official Textbooks", fontSize = 10.sp, color = Color(0xFFCBD5E1))
                }
            }
            // Quadrant 2
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color(0x22FFFFFF))
                    .padding(8.dp)
            ) {
                Column {
                    Text("📑 60+", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color(0xFF6EE7B7))
                    Text("Curriculum Units", fontSize = 10.sp, color = Color(0xFFCBD5E1))
                }
            }
        }

        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            // Quadrant 3
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color(0x22FFFFFF))
                    .padding(8.dp)
            ) {
                Column {
                    Text("🎯 450+", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color(0xFF93C5FD))
                    Text("Solved MCQs", fontSize = 10.sp, color = Color(0xFFCBD5E1))
                }
            }
            // Quadrant 4
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(8.dp))
                    .background(Color(0x22FFFFFF))
                    .padding(8.dp)
            ) {
                Column {
                    Text("✏️ 280+", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color(0xFFFDE047))
                    Text("Short Questions", fontSize = 10.sp, color = Color(0xFFCBD5E1))
                }
            }
        }

        Text(
            text = "Peshawar • Mardan • Swat • Abbottabad • Kohat Board Standards",
            fontSize = 11.sp,
            color = Color(0xFF94A3B8)
        )
    }
}
