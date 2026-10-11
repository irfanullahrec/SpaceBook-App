package com.example.spacebookapp.ui.screens

import android.media.AudioManager
import android.media.ToneGenerator
import android.speech.tts.TextToSpeech
import androidx.activity.compose.BackHandler
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.scaleIn
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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.Biotech
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.Timer
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
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
import kotlinx.coroutines.delay
import java.util.Locale

enum class Class7ScienceTab {
    LESSON,
    QUIZ,
    SCIENCE_LAB
}

@Composable
fun Class7ScienceScreen(
    onBackClick: () -> Unit
) {
    val context = LocalContext.current
    val stages = Class7ScienceRepository.stages

    var currentStageIndex by remember { mutableIntStateOf(0) }
    var selectedTab by remember { mutableStateOf(Class7ScienceTab.LESSON) }
    var selectedLang by remember { mutableStateOf(ExplainLang.ENGLISH) }

    val stage = stages[currentStageIndex]

    // TTS Setup
    var tts by remember { mutableStateOf<TextToSpeech?>(null) }
    DisposableEffect(Unit) {
        var speech: TextToSpeech? = null
        speech = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                speech?.language = Locale.US
            }
        }
        tts = speech
        onDispose {
            speech?.stop()
            speech?.shutdown()
        }
    }

    fun speakText(text: String, lang: ExplainLang) {
        tts?.let { engine ->
            engine.stop()
            when (lang) {
                ExplainLang.ENGLISH -> engine.language = Locale.US
                ExplainLang.URDU -> engine.language = Locale.forLanguageTag("ur")
                ExplainLang.PASHTO -> engine.language = Locale.forLanguageTag("ps")
            }
            engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, "cls7_sci_tts")
        }
    }

    BackHandler {
        onBackClick()
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.horizontalGradient(
                            listOf(Color(0xFF064E3B), Color(0xFF047857), Color(0xFF059669))
                        )
                    )
                    .padding(horizontal = 12.dp, vertical = 8.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        IconButton(onClick = onBackClick) {
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                                contentDescription = "Back",
                                tint = Color.White
                            )
                        }
                        Spacer(Modifier.width(4.dp))
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = "🔬 General Science",
                                    color = Color.White,
                                    fontSize = 17.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                                Spacer(Modifier.width(6.dp))
                                Surface(
                                    shape = RoundedCornerShape(8.dp),
                                    color = Color(0xFF10B981)
                                ) {
                                    Text(
                                        text = "GRADE 7",
                                        color = Color.White,
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                    )
                                }
                            }
                            Text(
                                text = "KPK Board • 12 Units • SNC 2022",
                                color = Color(0xFFA7F3D0),
                                fontSize = 11.sp
                            )
                        }
                    }

                    // Trilingual Switcher
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .background(Color.White.copy(alpha = 0.2f))
                            .padding(2.dp)
                    ) {
                        listOf(
                            Triple(ExplainLang.ENGLISH, "EN", "English"),
                            Triple(ExplainLang.URDU, "اردو", "Urdu"),
                            Triple(ExplainLang.PASHTO, "پښتو", "Pashto")
                        ).forEach { (lang, label, _) ->
                            val isSelected = selectedLang == lang
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(16.dp))
                                    .background(if (isSelected) Color.White else Color.Transparent)
                                    .clickable { selectedLang = lang }
                                    .padding(horizontal = 8.dp, vertical = 4.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = label,
                                    color = if (isSelected) Color(0xFF064E3B) else Color.White,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                // Units Carousel
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    items(stages.indices.toList()) { index ->
                        val itemStage = stages[index]
                        val isCurrent = index == currentStageIndex
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = if (isCurrent) Color.White else Color.White.copy(alpha = 0.15f),
                            border = BorderStroke(
                                1.dp,
                                if (isCurrent) Color(0xFF34D399) else Color.Transparent
                            ),
                            modifier = Modifier.clickable { currentStageIndex = index }
                        ) {
                            Column(
                                modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Text(
                                    text = "U${itemStage.id}",
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = if (isCurrent) Color(0xFF064E3B) else Color.White
                                )
                                Text(
                                    text = when (selectedLang) {
                                        ExplainLang.ENGLISH -> itemStage.titleEn.take(12) + ".."
                                        ExplainLang.URDU -> itemStage.titleUr.take(10)
                                        ExplainLang.PASHTO -> itemStage.titlePs.take(10)
                                    },
                                    fontSize = 9.sp,
                                    color = if (isCurrent) Color(0xFF047857) else Color(0xFFA7F3D0),
                                    maxLines = 1
                                )
                            }
                        }
                    }
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(Color(0xFFF0FDF4))
        ) {
            // Tab Selector
            TabRow(
                selectedTabIndex = selectedTab.ordinal,
                containerColor = Color.White,
                contentColor = Color(0xFF059669)
            ) {
                Tab(
                    selected = selectedTab == Class7ScienceTab.LESSON,
                    onClick = { selectedTab = Class7ScienceTab.LESSON },
                    text = {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.AutoMirrored.Filled.MenuBook, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text("Lesson & Concepts", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        }
                    }
                )
                Tab(
                    selected = selectedTab == Class7ScienceTab.SCIENCE_LAB,
                    onClick = { selectedTab = Class7ScienceTab.SCIENCE_LAB },
                    text = {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Biotech, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text("Science Lab", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        }
                    }
                )
                Tab(
                    selected = selectedTab == Class7ScienceTab.QUIZ,
                    onClick = { selectedTab = Class7ScienceTab.QUIZ },
                    text = {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Quiz, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text("Quiz Challenge", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        }
                    }
                )
            }

            when (selectedTab) {
                Class7ScienceTab.LESSON -> {
                    Class7ScienceLessonContent(
                        stage = stage,
                        lang = selectedLang,
                        onSpeak = { text -> speakText(text, selectedLang) },
                        onStartQuiz = { selectedTab = Class7ScienceTab.QUIZ }
                    )
                }
                Class7ScienceTab.SCIENCE_LAB -> {
                    Class7ScienceLabContent(
                        stage = stage,
                        lang = selectedLang
                    )
                }
                Class7ScienceTab.QUIZ -> {
                    Class7ScienceQuizContent(
                        stage = stage,
                        lang = selectedLang
                    )
                }
            }
        }
    }
}

@Composable
fun Class7ScienceLessonContent(
    stage: Class7ScienceStage,
    lang: ExplainLang,
    onSpeak: (String) -> Unit,
    onStartQuiz: () -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Banner Card
        item {
            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            Brush.linearGradient(
                                listOf(stage.themeColor, stage.secondaryColor)
                            )
                        )
                        .padding(16.dp)
                ) {
                    Column {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = Color.White.copy(alpha = 0.25f)
                            ) {
                                Text(
                                    text = "${stage.unitNumber} • ${stage.pageRange}",
                                    color = Color.White,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }

                            IconButton(
                                onClick = {
                                    val summary = when (lang) {
                                        ExplainLang.ENGLISH -> stage.summaryEn
                                        ExplainLang.URDU -> stage.summaryUr
                                        ExplainLang.PASHTO -> stage.summaryPs
                                    }
                                    onSpeak(summary)
                                }
                            ) {
                                Icon(
                                    imageVector = Icons.AutoMirrored.Filled.VolumeUp,
                                    contentDescription = "Read Aloud",
                                    tint = Color.White
                                )
                            }
                        }

                        Spacer(Modifier.height(8.dp))

                        Text(
                            text = when (lang) {
                                ExplainLang.ENGLISH -> stage.titleEn
                                ExplainLang.URDU -> stage.titleUr
                                ExplainLang.PASHTO -> stage.titlePs
                            },
                            color = Color.White,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.ExtraBold
                        )

                        Spacer(Modifier.height(8.dp))

                        Text(
                            text = when (lang) {
                                ExplainLang.ENGLISH -> stage.summaryEn
                                ExplainLang.URDU -> stage.summaryUr
                                ExplainLang.PASHTO -> stage.summaryPs
                            },
                            color = Color.White.copy(alpha = 0.95f),
                            fontSize = 13.sp,
                            lineHeight = 19.sp
                        )
                    }
                }
            }
        }

        // Section Title: Core Concepts & Scientific Principles
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "🔬 Scientific Insights & Principles (${stage.cards.size} Cards)",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A)
                )
            }
        }

        // Concept Cards
        items(stage.cards) { card ->
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, Color(0xFFDCFCE7)),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(10.dp)
                                    .clip(CircleShape)
                                    .background(card.cardColor)
                            )
                            Spacer(Modifier.width(8.dp))
                            Text(
                                text = card.title,
                                fontWeight = FontWeight.Bold,
                                fontSize = 15.sp,
                                color = Color(0xFF1E293B)
                            )
                        }

                        IconButton(
                            onClick = {
                                val text = when (lang) {
                                    ExplainLang.ENGLISH -> "${card.title}. ${card.detailEn}"
                                    ExplainLang.URDU -> "${card.title}. ${card.detailUr}"
                                    ExplainLang.PASHTO -> "${card.title}. ${card.detailPs}"
                                }
                                onSpeak(text)
                            },
                            modifier = Modifier.size(32.dp)
                        ) {
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.VolumeUp,
                                contentDescription = "Read",
                                tint = card.cardColor,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }

                    Spacer(Modifier.height(6.dp))

                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = Color(0xFFECFDF5),
                        border = BorderStroke(1.dp, Color(0xFFA7F3D0)),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = "⚡ Principle: ${card.conceptOrLaw}",
                            color = Color(0xFF047857),
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                        )
                    }

                    Spacer(Modifier.height(8.dp))

                    Text(
                        text = when (lang) {
                            ExplainLang.ENGLISH -> card.detailEn
                            ExplainLang.URDU -> card.detailUr
                            ExplainLang.PASHTO -> card.detailPs
                        },
                        color = Color(0xFF334155),
                        fontSize = 13.sp,
                        lineHeight = 18.sp
                    )
                }
            }
        }

        // Start Quiz CTA
        item {
            Button(
                onClick = onStartQuiz,
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669)),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp)
            ) {
                Icon(Icons.Default.Quiz, contentDescription = null, tint = Color.White)
                Spacer(Modifier.width(8.dp))
                Text(
                    text = "Launch Unit Challenge (5 Multi-Step Questions)",
                    fontWeight = FontWeight.Bold,
                    fontSize = 14.sp,
                    color = Color.White
                )
            }
        }
    }
}

@Composable
fun Class7ScienceLabContent(
    stage: Class7ScienceStage,
    lang: ExplainLang
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF064E3B)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Biotech, contentDescription = null, tint = Color(0xFF34D399), modifier = Modifier.size(28.dp))
                        Spacer(Modifier.width(8.dp))
                        Text(
                            text = "🔬 Science Formula & Law Vault",
                            color = Color.White,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 17.sp
                        )
                    }
                    Spacer(Modifier.height(6.dp))
                    Text(
                        text = "Official equations, scientific laws, and chemical reactions for ${stage.unitNumber}",
                        color = Color(0xFFA7F3D0),
                        fontSize = 12.sp
                    )
                }
            }
        }

        items(stage.equationsAndLaws) { equation ->
            Card(
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, Color(0xFF6EE7B7)),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(CircleShape)
                            .background(Color(0xFFD1FAE5)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Science, contentDescription = null, tint = Color(0xFF059669), modifier = Modifier.size(20.dp))
                    }
                    Spacer(Modifier.width(12.dp))
                    Text(
                        text = equation,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A),
                        lineHeight = 18.sp
                    )
                }
            }
        }

        item {
            Card(
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFFEF3C7)),
                border = BorderStroke(1.dp, Color(0xFFFCD34D)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.Top
                ) {
                    Text("💡", fontSize = 24.sp)
                    Spacer(Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "Lab Experiment Safety Rule",
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            color = Color(0xFF92400E)
                        )
                        Spacer(Modifier.height(4.dp))
                        Text(
                            text = "Always wear protective goggles when heating chemicals or using acids/bases. Never smell gases directly; gently waft fumes towards your nose with your hand.",
                            fontSize = 12.sp,
                            color = Color(0xFF78350F)
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun Class7ScienceQuizContent(
    stage: Class7ScienceStage,
    lang: ExplainLang
) {
    var questionIndex by remember { mutableIntStateOf(0) }
    var selectedOption by remember { mutableStateOf<Int?>(null) }
    var isSubmitted by remember { mutableStateOf(false) }
    var score by remember { mutableIntStateOf(0) }
    var isQuizCompleted by remember { mutableStateOf(false) }

    // 45s Countdown Timer
    var remainingSeconds by remember { mutableIntStateOf(45) }

    val currentQ = stage.quizzes.getOrNull(questionIndex)

    LaunchedEffect(questionIndex, isQuizCompleted) {
        if (!isQuizCompleted && !isSubmitted) {
            remainingSeconds = 45
            while (remainingSeconds > 0 && !isSubmitted) {
                delay(1000)
                remainingSeconds--
            }
            if (remainingSeconds == 0 && !isSubmitted) {
                // Auto-submit timeout
                isSubmitted = true
            }
        }
    }

    if (isQuizCompleted || currentQ == null) {
        // Results View
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                imageVector = Icons.Default.EmojiEvents,
                contentDescription = "Trophy",
                tint = Color(0xFFF59E0B),
                modifier = Modifier.size(72.dp)
            )

            Spacer(Modifier.height(12.dp))

            Text(
                text = "Unit Assessment Complete! 🎉",
                fontSize = 20.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFF064E3B)
            )

            Spacer(Modifier.height(6.dp))

            Text(
                text = "Score: $score / ${stage.quizzes.size}",
                fontSize = 28.sp,
                fontWeight = FontWeight.Black,
                color = Color(0xFF059669)
            )

            Spacer(Modifier.height(12.dp))

            Row {
                val stars = when {
                    score == stage.quizzes.size -> 3
                    score >= 3 -> 2
                    score >= 1 -> 1
                    else -> 0
                }
                repeat(3) { i ->
                    Icon(
                        imageVector = Icons.Default.Star,
                        contentDescription = null,
                        tint = if (i < stars) Color(0xFFF59E0B) else Color(0xFFCBD5E1),
                        modifier = Modifier.size(36.dp)
                    )
                }
            }

            Spacer(Modifier.height(20.dp))

            Button(
                onClick = {
                    questionIndex = 0
                    selectedOption = null
                    isSubmitted = false
                    score = 0
                    isQuizCompleted = false
                },
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669)),
                modifier = Modifier.fillMaxWidth(0.7f)
            ) {
                Text("Retry Quiz 🔄", fontWeight = FontWeight.Bold, color = Color.White)
            }
        }
        return
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // Progress Bar & Timer
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Question ${questionIndex + 1} of ${stage.quizzes.size}",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF64748B)
                )

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Timer,
                        contentDescription = null,
                        tint = if (remainingSeconds <= 10) Color(0xFFDC2626) else Color(0xFF059669),
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(Modifier.width(4.dp))
                    Text(
                        text = "${remainingSeconds}s",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 13.sp,
                        color = if (remainingSeconds <= 10) Color(0xFFDC2626) else Color(0xFF059669)
                    )
                }
            }

            Spacer(Modifier.height(4.dp))

            LinearProgressIndicator(
                progress = { (questionIndex + 1).toFloat() / stage.quizzes.size },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .clip(RoundedCornerShape(3.dp)),
                color = Color(0xFF059669),
                trackColor = Color(0xFFE2E8F0)
            )
        }

        // Question Card
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = when (lang) {
                            ExplainLang.ENGLISH -> currentQ.questionEn
                            ExplainLang.URDU -> currentQ.questionUr
                            ExplainLang.PASHTO -> currentQ.questionPs
                        },
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A),
                        lineHeight = 22.sp
                    )

                    if (currentQ.formulaOrStep.isNotBlank()) {
                        Spacer(Modifier.height(8.dp))
                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = Color(0xFFF1F5F9),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = "💡 Hint: ${currentQ.formulaOrStep}",
                                fontSize = 11.sp,
                                color = Color(0xFF475569),
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                    }
                }
            }
        }

        // Options List
        items(currentQ.options.indices.toList()) { optIdx ->
            val optText = currentQ.options[optIdx]
            val isSelected = selectedOption == optIdx
            val isCorrect = optIdx == currentQ.correctIndex

            val backgroundColor = when {
                !isSubmitted && isSelected -> Color(0xFFD1FAE5)
                isSubmitted && isCorrect -> Color(0xFFDCFCE7)
                isSubmitted && isSelected && !isCorrect -> Color(0xFFFEE2E2)
                else -> Color.White
            }

            val borderColor = when {
                !isSubmitted && isSelected -> Color(0xFF059669)
                isSubmitted && isCorrect -> Color(0xFF16A34A)
                isSubmitted && isSelected && !isCorrect -> Color(0xFFDC2626)
                else -> Color(0xFFE2E8F0)
            }

            Card(
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = backgroundColor),
                border = BorderStroke(1.5.dp, borderColor),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable(enabled = !isSubmitted) {
                        selectedOption = optIdx
                    }
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(28.dp)
                            .clip(CircleShape)
                            .background(
                                when {
                                    isSubmitted && isCorrect -> Color(0xFF16A34A)
                                    isSubmitted && isSelected && !isCorrect -> Color(0xFFDC2626)
                                    isSelected -> Color(0xFF059669)
                                    else -> Color(0xFFF1F5F9)
                                }
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = ('A' + optIdx).toString(),
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            color = if (isSelected || (isSubmitted && isCorrect)) Color.White else Color(0xFF475569)
                        )
                    }

                    Spacer(Modifier.width(12.dp))

                    Text(
                        text = optText,
                        fontSize = 13.sp,
                        fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                        color = Color(0xFF1E293B),
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        // Submit / Next Actions
        item {
            if (!isSubmitted) {
                Button(
                    onClick = {
                        if (selectedOption != null) {
                            isSubmitted = true
                            if (selectedOption == currentQ.correctIndex) {
                                score++
                                try {
                                    val tone = ToneGenerator(AudioManager.STREAM_MUSIC, 100)
                                    tone.startTone(ToneGenerator.TONE_PROP_BEEP, 150)
                                } catch (_: Exception) {}
                            }
                        }
                    },
                    enabled = selectedOption != null,
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669)),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                ) {
                    Text("Submit Answer", fontWeight = FontWeight.Bold, color = Color.White)
                }
            } else {
                // WHY Explanation Box
                Card(
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(
                        containerColor = if (selectedOption == currentQ.correctIndex) Color(0xFFECFDF5) else Color(0xFFFEF2F2)
                    ),
                    border = BorderStroke(
                        1.dp,
                        if (selectedOption == currentQ.correctIndex) Color(0xFF34D399) else Color(0xFFFCA5A5)
                    ),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = if (selectedOption == currentQ.correctIndex) "✅ Correct!" else "❌ Incorrect",
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 15.sp,
                                color = if (selectedOption == currentQ.correctIndex) Color(0xFF047857) else Color(0xFFB91C1C)
                            )
                        }

                        Spacer(Modifier.height(6.dp))

                        Text(
                            text = "🧠 Scientific Reason (WHY):",
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            color = Color(0xFF334155)
                        )

                        Spacer(Modifier.height(4.dp))

                        Text(
                            text = when (lang) {
                                ExplainLang.ENGLISH -> currentQ.whyExplanationEn
                                ExplainLang.URDU -> currentQ.whyExplanationUr
                                ExplainLang.PASHTO -> currentQ.whyExplanationPs
                            },
                            fontSize = 13.sp,
                            lineHeight = 18.sp,
                            color = Color(0xFF1E293B)
                        )
                    }
                }

                Spacer(Modifier.height(6.dp))

                Button(
                    onClick = {
                        if (questionIndex + 1 < stage.quizzes.size) {
                            questionIndex++
                            selectedOption = null
                            isSubmitted = false
                        } else {
                            isQuizCompleted = true
                        }
                    },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF047857)),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                ) {
                    Text(
                        text = if (questionIndex + 1 < stage.quizzes.size) "Next Question ➔" else "View Results 🏆",
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                }
            }
        }
    }
}
