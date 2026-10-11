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
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.Calculate
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.Functions
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Quiz
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

enum class Class7MathsTab {
    LESSON,
    QUIZ,
    FORMULA_LAB
}

@Composable
fun Class7MathsScreen(
    onBackClick: () -> Unit
) {
    val context = LocalContext.current
    val stages = Class7MathsRepository.stages

    var currentStageIndex by remember { mutableIntStateOf(0) }
    var selectedTab by remember { mutableStateOf(Class7MathsTab.LESSON) }
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

    fun speak(textEn: String, textUr: String, textPs: String) {
        val engine = tts ?: return
        when (selectedLang) {
            ExplainLang.ENGLISH -> {
                engine.language = Locale.US
                engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "c7_maths")
            }
            ExplainLang.URDU -> {
                engine.language = Locale("ur", "PK")
                engine.speak(textUr, TextToSpeech.QUEUE_FLUSH, null, "c7_maths")
            }
            ExplainLang.PASHTO -> {
                engine.language = Locale("ps", "AF")
                engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "c7_maths")
            }
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
                            listOf(Color(0xFF0F172A), stage.secondaryColor, stage.themeColor)
                        )
                    )
                    .padding(horizontal = 14.dp, vertical = 10.dp)
            ) {
                // Top Action Bar
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        IconButton(onClick = onBackClick) {
                            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
                        }
                        Spacer(Modifier.width(4.dp))
                        Column {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = "📐 Class 7 Mathematics",
                                    fontSize = 17.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color.White
                                )
                                Spacer(Modifier.width(6.dp))
                                Surface(
                                    shape = RoundedCornerShape(6.dp),
                                    color = Color.White.copy(alpha = 0.2f)
                                ) {
                                    Text(
                                        text = stage.pageRange,
                                        fontSize = 10.sp,
                                        color = Color(0xFFFDE68A),
                                        fontWeight = FontWeight.Bold,
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                    )
                                }
                            }
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> stage.titleEn
                                    ExplainLang.URDU -> stage.titleUr
                                    ExplainLang.PASHTO -> stage.titlePs
                                },
                                fontSize = 12.sp,
                                color = Color(0xFFE2E8F0)
                            )
                        }
                    }

                    Row(verticalAlignment = Alignment.CenterVertically) {
                        // Language Selector
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = Color.White.copy(alpha = 0.2f),
                            modifier = Modifier.clickable {
                                selectedLang = when (selectedLang) {
                                    ExplainLang.ENGLISH -> ExplainLang.URDU
                                    ExplainLang.URDU -> ExplainLang.PASHTO
                                    ExplainLang.PASHTO -> ExplainLang.ENGLISH
                                }
                            }
                        ) {
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> "🇬🇧 EN"
                                    ExplainLang.URDU -> "🇵🇰 اردو"
                                    ExplainLang.PASHTO -> "🇦🇫 پښتو"
                                },
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                                fontSize = 11.sp,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 5.dp)
                            )
                        }

                        Spacer(Modifier.width(6.dp))

                        IconButton(
                            onClick = {
                                speak(stage.summaryEn, stage.summaryUr, stage.summaryPs)
                            },
                            modifier = Modifier
                                .size(34.dp)
                                .clip(CircleShape)
                                .background(Color.White.copy(alpha = 0.25f))
                        ) {
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = "TTS", tint = Color.White, modifier = Modifier.size(18.dp))
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                // Unit Selector Carousel (Units 1 to 13)
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    items(stages) { stg ->
                        val isSelected = stg.id - 1 == currentStageIndex
                        Surface(
                            shape = RoundedCornerShape(14.dp),
                            color = if (isSelected) Color.White else Color.White.copy(alpha = 0.15f),
                            border = if (isSelected) BorderStroke(1.5.dp, Color(0xFFFBBF24)) else null,
                            modifier = Modifier.clickable { currentStageIndex = stg.id - 1 }
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "U${stg.id}",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = if (isSelected) Color(0xFF0F172A) else Color.White
                                )
                                Spacer(Modifier.width(4.dp))
                                Text(
                                    text = stg.titleEn.take(12) + "...",
                                    fontSize = 11.sp,
                                    color = if (isSelected) Color(0xFF0F172A) else Color(0xFFCBD5E1)
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
                .background(Color(0xFFF8FAFC))
                .padding(innerPadding)
        ) {
            // Mode Tabs: Lesson vs Quiz vs Formula Lab
            TabRow(
                selectedTabIndex = selectedTab.ordinal,
                containerColor = Color.White,
                contentColor = stage.themeColor
            ) {
                Tab(
                    selected = selectedTab == Class7MathsTab.LESSON,
                    onClick = { selectedTab = Class7MathsTab.LESSON },
                    text = {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.MenuBook, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text("Lesson & Rules", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        }
                    }
                )
                Tab(
                    selected = selectedTab == Class7MathsTab.QUIZ,
                    onClick = { selectedTab = Class7MathsTab.QUIZ },
                    text = {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Quiz, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text("Math Quiz (${stage.quizzes.size})", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        }
                    }
                )
                Tab(
                    selected = selectedTab == Class7MathsTab.FORMULA_LAB,
                    onClick = { selectedTab = Class7MathsTab.FORMULA_LAB },
                    text = {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Functions, contentDescription = null, modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text("Formula Lab", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        }
                    }
                )
            }

            when (selectedTab) {
                Class7MathsTab.LESSON -> {
                    MathsLessonTab(stage = stage, lang = selectedLang, onStartQuiz = { selectedTab = Class7MathsTab.QUIZ })
                }
                Class7MathsTab.QUIZ -> {
                    MathsQuizTab(stage = stage, lang = selectedLang)
                }
                Class7MathsTab.FORMULA_LAB -> {
                    MathsFormulaLabTab(stage = stage)
                }
            }
        }
    }
}

@Composable
private fun MathsLessonTab(
    stage: Class7MathsStage,
    lang: ExplainLang,
    onStartQuiz: () -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Summary Card
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = stage.themeColor.copy(alpha = 0.15f)
                        ) {
                            Text(
                                text = "KPTBB CURRICULUM • ${stage.unitNumber}",
                                color = stage.themeColor,
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 11.sp,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                        Text(text = stage.pageRange, fontSize = 11.sp, color = Color(0xFF64748B), fontWeight = FontWeight.Bold)
                    }

                    Spacer(Modifier.height(10.dp))

                    Text(
                        text = when (lang) {
                            ExplainLang.ENGLISH -> stage.summaryEn
                            ExplainLang.URDU -> stage.summaryUr
                            ExplainLang.PASHTO -> stage.summaryPs
                        },
                        fontSize = 14.sp,
                        color = Color(0xFF1E293B),
                        lineHeight = 22.sp
                    )
                }
            }
        }

        // Key Formulas Box
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Calculate, contentDescription = null, tint = Color(0xFFFBBF24))
                        Spacer(Modifier.width(8.dp))
                        Text(
                            text = "Key Formulas & Standard Rules",
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp
                        )
                    }
                    Spacer(Modifier.height(10.dp))
                    stage.formulas.forEach { formula ->
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = Color(0xFF1E293B),
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp)
                        ) {
                            Text(
                                text = "• $formula",
                                color = Color(0xFF93C5FD),
                                fontSize = 13.sp,
                                fontWeight = FontWeight.SemiBold,
                                modifier = Modifier.padding(10.dp)
                            )
                        }
                    }
                }
            }
        }

        // Conceptual Flashcards
        item {
            Text(
                text = "Concept Breakdown & Definitions",
                fontWeight = FontWeight.ExtraBold,
                fontSize = 15.sp,
                color = Color(0xFF0F172A)
            )
        }

        items(stage.cards) { card ->
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, card.cardColor.copy(alpha = 0.3f)),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(46.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(card.cardColor.copy(alpha = 0.15f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("📐", fontSize = 22.sp)
                    }

                    Spacer(Modifier.width(12.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(card.title, fontWeight = FontWeight.ExtraBold, fontSize = 14.sp, color = Color(0xFF0F172A))
                            Text(card.formulaOrRule, fontWeight = FontWeight.Bold, fontSize = 12.sp, color = card.cardColor)
                        }
                        Spacer(Modifier.height(4.dp))
                        Text(
                            text = when (lang) {
                                ExplainLang.ENGLISH -> card.detailEn
                                ExplainLang.URDU -> card.detailUr
                                ExplainLang.PASHTO -> card.detailPs
                            },
                            fontSize = 12.sp,
                            color = Color(0xFF475569)
                        )
                    }
                }
            }
        }

        // Start Quiz CTA
        item {
            Button(
                onClick = onStartQuiz,
                colors = ButtonDefaults.buttonColors(containerColor = stage.themeColor),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.EmojiEvents, contentDescription = null, tint = Color.White)
                    Spacer(Modifier.width(8.dp))
                    Text("Start Unit ${stage.id} Math Quiz ➔", fontWeight = FontWeight.ExtraBold, fontSize = 15.sp)
                }
            }
        }

        item {
            Spacer(Modifier.height(20.dp))
        }
    }
}

@Composable
private fun MathsQuizTab(
    stage: Class7MathsStage,
    lang: ExplainLang
) {
    val questions = stage.quizzes
    var currentQIndex by remember { mutableIntStateOf(0) }
    var selectedOption by remember { mutableStateOf<Int?>(null) }
    var hasAnswered by remember { mutableStateOf(false) }
    var score by remember { mutableIntStateOf(0) }
    var isQuizCompleted by remember { mutableStateOf(false) }

    // Optional 45-second timer per question
    var timerSeconds by remember { mutableIntStateOf(45) }
    LaunchedEffect(currentQIndex, hasAnswered) {
        if (!hasAnswered && !isQuizCompleted) {
            timerSeconds = 45
            while (timerSeconds > 0 && !hasAnswered) {
                delay(1000)
                timerSeconds--
            }
        }
    }

    val currentQ = questions.getOrNull(currentQIndex)

    fun playSound(success: Boolean) {
        try {
            val tone = ToneGenerator(AudioManager.STREAM_MUSIC, 70)
            if (success) tone.startTone(ToneGenerator.TONE_PROP_BEEP2, 150)
            else tone.startTone(ToneGenerator.TONE_PROP_NACK, 120)
        } catch (_: Exception) {}
    }

    if (isQuizCompleted || currentQ == null) {
        // Victory Summary Card
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(20.dp),
            contentAlignment = Alignment.Center
        ) {
            Card(
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 6.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text("🏆", fontSize = 64.sp)
                    Spacer(Modifier.height(10.dp))
                    Text(
                        text = "Unit ${stage.id} Complete!",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 20.sp,
                        color = Color(0xFF0F172A)
                    )
                    Spacer(Modifier.height(6.dp))
                    Text(
                        text = "Score: $score / ${questions.size * 20} Points",
                        color = stage.themeColor,
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp
                    )

                    Spacer(Modifier.height(14.dp))
                    Row {
                        repeat(3) {
                            Text("⭐", fontSize = 28.sp)
                        }
                    }

                    Spacer(Modifier.height(20.dp))
                    Button(
                        onClick = {
                            currentQIndex = 0
                            selectedOption = null
                            hasAnswered = false
                            score = 0
                            isQuizCompleted = false
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = stage.themeColor),
                        shape = RoundedCornerShape(14.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Retake Quiz", fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
        return
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // HUD Bar
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Question ${currentQIndex + 1} of ${questions.size}",
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    color = Color(0xFF64748B)
                )

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Timer, contentDescription = null, tint = if (timerSeconds < 10) Color(0xFFDC2626) else Color(0xFF475569), modifier = Modifier.size(16.dp))
                    Spacer(Modifier.width(4.dp))
                    Text(
                        text = "${timerSeconds}s",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp,
                        color = if (timerSeconds < 10) Color(0xFFDC2626) else Color(0xFF475569)
                    )
                }

                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = Color(0x33F59E0B)
                ) {
                    Text(
                        text = "⭐ $score pts",
                        color = Color(0xFFD97706),
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    )
                }
            }
        }

        // Progress Bar
        item {
            LinearProgressIndicator(
                progress = { (currentQIndex + 1).toFloat() / questions.size },
                color = stage.themeColor,
                trackColor = Color(0xFFE2E8F0),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .clip(RoundedCornerShape(3.dp))
            )
        }

        // Question Card
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    if (currentQ.formulaOrStep.isNotEmpty()) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = Color(0xFF0F172A),
                            modifier = Modifier.padding(bottom = 8.dp)
                        ) {
                            Text(
                                text = "Formula: ${currentQ.formulaOrStep}",
                                color = Color(0xFF93C5FD),
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                            )
                        }
                    }

                    Text(
                        text = when (lang) {
                            ExplainLang.ENGLISH -> currentQ.questionEn
                            ExplainLang.URDU -> currentQ.questionUr
                            ExplainLang.PASHTO -> currentQ.questionPs
                        },
                        fontSize = 16.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFF0F172A),
                        lineHeight = 23.sp
                    )
                }
            }
        }

        // Answer Options
        items(currentQ.options.indices.toList()) { index ->
            val optionText = currentQ.options[index]
            val isSelected = selectedOption == index
            val isCorrect = index == currentQ.correctIndex

            val cardBg = when {
                !hasAnswered && isSelected -> stage.themeColor.copy(alpha = 0.15f)
                hasAnswered && isCorrect -> Color(0xFFDCFCE7)
                hasAnswered && isSelected && !isCorrect -> Color(0xFFFEF2F2)
                else -> Color.White
            }

            val borderColor = when {
                !hasAnswered && isSelected -> stage.themeColor
                hasAnswered && isCorrect -> Color(0xFF16A34A)
                hasAnswered && isSelected && !isCorrect -> Color(0xFFDC2626)
                else -> Color(0xFFE2E8F0)
            }

            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = cardBg),
                border = BorderStroke(1.5.dp, borderColor),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable(enabled = !hasAnswered) {
                        selectedOption = index
                        hasAnswered = true
                        val correct = index == currentQ.correctIndex
                        playSound(correct)
                        if (correct) {
                            score += 20
                        }
                    }
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(32.dp)
                            .clip(CircleShape)
                            .background(if (isSelected || (hasAnswered && isCorrect)) borderColor else Color(0xFFF1F5F9)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "${('A'.code + index).toChar()}",
                            fontWeight = FontWeight.Bold,
                            color = if (isSelected || (hasAnswered && isCorrect)) Color.White else Color(0xFF64748B),
                            fontSize = 13.sp
                        )
                    }

                    Spacer(Modifier.width(12.dp))

                    Text(
                        text = optionText,
                        fontSize = 14.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A),
                        modifier = Modifier.weight(1f)
                    )

                    if (hasAnswered && isCorrect) {
                        Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF16A34A), modifier = Modifier.size(20.dp))
                    }
                }
            }
        }

        // ─── WHY EXPLANATION BOX (Essential 7th-class learning) ───
        if (hasAnswered) {
            item {
                Card(
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFF0FDF4)),
                    border = BorderStroke(1.5.dp, Color(0xFF86EFAC)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Lightbulb, contentDescription = null, tint = Color(0xFF15803D), modifier = Modifier.size(18.dp))
                            Spacer(Modifier.width(6.dp))
                            Text(
                                text = "WHY THIS IS CORRECT (Worked Steps)",
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 13.sp,
                                color = Color(0xFF166534)
                            )
                        }

                        Spacer(Modifier.height(8.dp))

                        Text(
                            text = when (lang) {
                                ExplainLang.ENGLISH -> currentQ.whyExplanationEn
                                ExplainLang.URDU -> currentQ.whyExplanationUr
                                ExplainLang.PASHTO -> currentQ.whyExplanationPs
                            },
                            fontSize = 13.sp,
                            color = Color(0xFF14532D),
                            lineHeight = 19.sp
                        )

                        Spacer(Modifier.height(14.dp))

                        Button(
                            onClick = {
                                if (currentQIndex + 1 < questions.size) {
                                    currentQIndex++
                                    selectedOption = null
                                    hasAnswered = false
                                } else {
                                    isQuizCompleted = true
                                }
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = stage.themeColor),
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = if (currentQIndex + 1 < questions.size) "Next Question ➔" else "View Results 🏆",
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }
                }
            }
        }

        item {
            Spacer(Modifier.height(24.dp))
        }
    }
}

@Composable
private fun MathsFormulaLabTab(
    stage: Class7MathsStage
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1E1B4B)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Functions, contentDescription = null, tint = Color(0xFFC7D2FE))
                        Spacer(Modifier.width(8.dp))
                        Text(
                            text = "Interactive Formula Lab • ${stage.unitNumber}",
                            color = Color.White,
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 16.sp
                        )
                    }

                    Spacer(Modifier.height(10.dp))
                    Text(
                        text = "Master the core mathematical relationships of ${stage.titleEn} with formula derivation and worked checks.",
                        color = Color(0xFFE0E7FF),
                        fontSize = 13.sp
                    )
                }
            }
        }

        items(stage.formulas) { formula ->
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, Color(0xFFE2E8F0)),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = formula,
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 14.5.sp,
                        color = Color(0xFF1E3A8A)
                    )
                    Spacer(Modifier.height(4.dp))
                    Text(
                        text = "Standard mathematical rule applied in Grade 7 KPTBB Curriculum.",
                        fontSize = 11.5.sp,
                        color = Color(0xFF64748B)
                    )
                }
            }
        }

        item {
            Spacer(Modifier.height(20.dp))
        }
    }
}
