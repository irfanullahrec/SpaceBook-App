package com.example.spacebookapp.ui.screens

import android.speech.tts.TextToSpeech
import androidx.activity.compose.BackHandler
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.scaleIn
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.RecordVoiceOver
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
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

@Composable
fun Class3GKScreen(
    onBackClick: () -> Unit
) {
    val context = LocalContext.current
    var selectedLang by remember { mutableStateOf(ExplainLang.URDU) }
    var currentStageIndex by remember { mutableIntStateOf(0) }
    var selectedTab by remember { mutableIntStateOf(0) } // 0: Game, 1: Lesson, 2: Exercise Quiz
    var totalStars by remember { mutableIntStateOf(0) }
    var completedStages by remember { mutableStateOf(setOf<Int>()) }
    var showOverlay by remember { mutableStateOf(false) }

    val stages = Class3GKRepository.stages
    val stage = stages[currentStageIndex]

    // TextToSpeech setup
    var tts by remember { mutableStateOf<TextToSpeech?>(null) }
    DisposableEffect(context) {
        val speech = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                // Initialize default
            }
        }
        tts = speech
        onDispose {
            speech.stop()
            speech.shutdown()
        }
    }

    fun speak(text: String, lang: ExplainLang) {
        tts?.let { speech ->
            val locale = when (lang) {
                ExplainLang.ENGLISH -> Locale.US
                ExplainLang.URDU -> Locale("ur", "PK")
                ExplainLang.PASHTO -> Locale("ps", "AF")
            }
            speech.language = locale
            speech.speak(text, TextToSpeech.QUEUE_FLUSH, null, "Class3GKTTS")
        }
    }

    fun explainCurrentStage() {
        val text = when (selectedLang) {
            ExplainLang.ENGLISH -> "${stage.titleEn}. ${stage.summaryEn}"
            ExplainLang.URDU -> "${stage.titleUr}۔ ${stage.summaryUr}"
            ExplainLang.PASHTO -> "${stage.titlePs}۔ ${stage.summaryPs}"
        }
        speak(text, selectedLang)
    }

    BackHandler {
        onBackClick()
    }

    LaunchedEffect(showOverlay) {
        if (showOverlay) {
            val congrats = when (selectedLang) {
                ExplainLang.ENGLISH -> "Splendid work! Stage completed! Unlocking the next lesson."
                ExplainLang.URDU -> "شاباش! شاندار کارکردگی! اگلا سبق کھل گیا۔"
                ExplainLang.PASHTO -> "شاباش! ډېر ښه کار! بل لوست پرانیستل شو."
            }
            speak(congrats, selectedLang)
            delay(2200)
            showOverlay = false
            if (currentStageIndex < stages.lastIndex) {
                currentStageIndex++
                selectedTab = 0
            }
        }
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Brush.horizontalGradient(listOf(stage.secondaryColor, stage.themeColor)))
                    .statusBarsPadding()
                    .padding(horizontal = 12.dp, vertical = 10.dp)
            ) {
                // Header row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(
                        onClick = onBackClick,
                        modifier = Modifier
                            .size(38.dp)
                            .background(Color.White.copy(alpha = 0.2f), CircleShape)
                    ) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                    Spacer(Modifier.width(10.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "واقفیتِ عامہ جماعت سوم • Class 3 GK • ${stage.unitTitle}",
                            color = Color(0xFFFDE68A),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> stage.titleEn
                                ExplainLang.URDU -> stage.titleUr
                                ExplainLang.PASHTO -> stage.titlePs
                            },
                            color = Color.White,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            maxLines = 1
                        )
                    }
                    Surface(shape = RoundedCornerShape(14.dp), color = Color(0xFFFFD54F)) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.Default.Star, contentDescription = null, tint = Color(0xFFB45309), modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text("$totalStars", fontWeight = FontWeight.ExtraBold, color = Color(0xFF0F172A), fontSize = 13.sp)
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                // Chapter carousel (1 to 16) with unlock state
                LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    itemsIndexed(stages) { idx, item ->
                        val active = idx == currentStageIndex
                        val isDone = completedStages.contains(item.id)
                        // A stage is unlocked if it's the first stage, or if completed, or if previous is completed
                        val isUnlocked = idx == 0 || completedStages.contains(stages[idx - 1].id) || completedStages.contains(item.id)

                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = when {
                                active -> Color.White
                                isDone -> Color(0xFF10B981)
                                isUnlocked -> Color.White.copy(alpha = 0.25f)
                                else -> Color.Black.copy(alpha = 0.35f)
                            },
                            modifier = Modifier.clickable {
                                if (isUnlocked) {
                                    currentStageIndex = idx
                                    showOverlay = false
                                }
                            }
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                            ) {
                                if (!isUnlocked) {
                                    Icon(
                                        Icons.Default.Lock,
                                        contentDescription = "Locked",
                                        tint = Color.White.copy(alpha = 0.7f),
                                        modifier = Modifier.size(12.dp)
                                    )
                                    Spacer(Modifier.width(4.dp))
                                }
                                Text(
                                    text = if (isDone) "✓ Ch ${item.id}" else "Ch ${item.id}",
                                    color = if (active) stage.secondaryColor else Color.White,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                            }
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                // Language & TTS controls
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        ExplainLang.entries.forEach { lang ->
                            val active = selectedLang == lang
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (active) Color(0xFFFFD54F) else Color.White.copy(alpha = 0.2f),
                                modifier = Modifier.clickable {
                                    selectedLang = lang
                                    explainCurrentStage()
                                }
                            ) {
                                Text(
                                    text = lang.label,
                                    color = if (active) Color(0xFF0F172A) else Color.White,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                                )
                            }
                        }
                    }

                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = Color.White,
                        modifier = Modifier.clickable { explainCurrentStage() }
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = stage.secondaryColor, modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> "Voice"
                                    ExplainLang.URDU -> "آواز"
                                    ExplainLang.PASHTO -> "غږ"
                                },
                                color = stage.secondaryColor,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                // Tabs: 0 -> Game, 1 -> Lesson, 2 -> Exercise Quiz
                val tabLabels = listOf(
                    Triple("Game", "گیم", "لوبه"),
                    Triple("Lesson", "سبق", "لوست"),
                    Triple("Exercise", "مشق", "تمرین")
                )
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.Black.copy(alpha = 0.2f), RoundedCornerShape(12.dp))
                        .padding(4.dp),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    tabLabels.forEachIndexed { idx, triple ->
                        val active = selectedTab == idx
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = if (active) Color.White else Color.Transparent,
                            modifier = Modifier
                                .weight(1f)
                                .clickable { selectedTab = idx }
                        ) {
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> triple.first
                                    ExplainLang.URDU -> triple.second
                                    ExplainLang.PASHTO -> triple.third
                                },
                                textAlign = TextAlign.Center,
                                color = if (active) stage.secondaryColor else Color.White,
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 13.sp,
                                modifier = Modifier.padding(vertical = 7.dp)
                            )
                        }
                    }
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF8FAFC))
                .padding(innerPadding)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
                    .padding(14.dp)
            ) {
                // Header badge with page range
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color.White,
                    border = BorderStroke(1.5.dp, stage.themeColor.copy(alpha = 0.35f)),
                    shadowElevation = 2.dp,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> stage.titleEn
                                    ExplainLang.URDU -> stage.titleUr
                                    ExplainLang.PASHTO -> stage.titlePs
                                },
                                fontSize = 16.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = stage.secondaryColor,
                                modifier = Modifier.weight(1f)
                            )
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = stage.themeColor.copy(alpha = 0.15f)
                            ) {
                                Text(
                                    text = stage.pageRange,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = stage.secondaryColor,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                                )
                            }
                        }
                        Spacer(Modifier.height(6.dp))
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> stage.summaryEn
                                ExplainLang.URDU -> stage.summaryUr
                                ExplainLang.PASHTO -> stage.summaryPs
                            },
                            fontSize = 13.sp,
                            color = Color(0xFF334155),
                            lineHeight = 19.sp
                        )
                    }
                }

                Spacer(Modifier.height(14.dp))

                when (selectedTab) {
                    0 -> {
                        // ─── TAB 0: ARCADE MATCHING GAME (3rd-Class Level) ───
                        var roundIdx by remember(stage.id) { mutableIntStateOf(0) }
                        val cards = stage.cards
                        val target = cards[roundIdx.coerceAtMost(cards.lastIndex)]
                        val shuffled = remember(stage.id, roundIdx) { cards.shuffled() }

                        Card(
                            shape = RoundedCornerShape(20.dp),
                            colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                            border = BorderStroke(2.dp, stage.themeColor),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .clip(RoundedCornerShape(14.dp))
                                        .background(Brush.horizontalGradient(listOf(stage.secondaryColor, stage.themeColor)))
                                        .padding(14.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                        Text(
                                            text = "Round ${roundIdx + 1} / ${cards.size}",
                                            color = Color(0xFFFDE68A),
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                        Spacer(Modifier.height(4.dp))
                                        Text(
                                            text = target.mainTitle,
                                            color = Color.White,
                                            fontSize = 22.sp,
                                            fontWeight = FontWeight.ExtraBold,
                                            textAlign = TextAlign.Center
                                        )
                                        Spacer(Modifier.height(4.dp))
                                        Text(
                                            text = when (selectedLang) {
                                                ExplainLang.ENGLISH -> stage.promptEn
                                                ExplainLang.URDU -> stage.promptUr
                                                ExplainLang.PASHTO -> stage.promptPs
                                            },
                                            color = Color.White.copy(alpha = 0.9f),
                                            fontSize = 12.sp,
                                            textAlign = TextAlign.Center
                                        )
                                    }
                                }

                                Spacer(Modifier.height(14.dp))

                                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                                    shuffled.forEach { option ->
                                        val label = when (selectedLang) {
                                            ExplainLang.ENGLISH -> "${option.meaningEn} (${option.meaningUr})"
                                            ExplainLang.URDU -> option.meaningUr
                                            ExplainLang.PASHTO -> option.meaningPs
                                        }
                                        Surface(
                                            shape = RoundedCornerShape(16.dp),
                                            color = option.color.copy(alpha = 0.92f),
                                            border = BorderStroke(1.5.dp, Color.White.copy(alpha = 0.4f)),
                                            modifier = Modifier
                                                .fillMaxWidth()
                                                .clickable {
                                                    speak(label, selectedLang)
                                                    if (option == target) {
                                                        if (roundIdx + 1 >= cards.size) {
                                                            if (!completedStages.contains(stage.id)) {
                                                                completedStages = completedStages + stage.id
                                                                totalStars += 3
                                                            }
                                                            showOverlay = true
                                                        } else {
                                                            roundIdx++
                                                        }
                                                    }
                                                }
                                        ) {
                                            Text(
                                                text = label,
                                                color = Color.White,
                                                fontSize = 15.sp,
                                                fontWeight = FontWeight.Bold,
                                                textAlign = TextAlign.Center,
                                                modifier = Modifier.padding(14.dp)
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }

                    1 -> {
                        // ─── TAB 1: LESSON CARDS WITH TRILINGUAL AUDIO ───
                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            stage.cards.forEach { card ->
                                Card(
                                    shape = RoundedCornerShape(18.dp),
                                    colors = CardDefaults.cardColors(containerColor = Color.White),
                                    border = BorderStroke(2.dp, card.color.copy(alpha = 0.45f)),
                                    elevation = CardDefaults.cardElevation(3.dp),
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .clickable { speak(card.mainTitle, selectedLang) }
                                ) {
                                    Row(
                                        modifier = Modifier.padding(16.dp),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Column(modifier = Modifier.weight(1f)) {
                                            Text(
                                                text = card.mainTitle,
                                                fontSize = 18.sp,
                                                fontWeight = FontWeight.ExtraBold,
                                                color = card.color
                                            )
                                            Spacer(Modifier.height(4.dp))
                                            Text(
                                                text = "اردو: ${card.meaningUr}",
                                                fontSize = 13.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = Color(0xFF0F172A)
                                            )
                                            Text(
                                                text = "پښتو: ${card.meaningPs}  •  EN: ${card.meaningEn}",
                                                fontSize = 12.sp,
                                                color = Color(0xFF475569)
                                            )
                                        }
                                        FilledTonalIconButton(
                                            onClick = {
                                                val txt = when (selectedLang) {
                                                    ExplainLang.ENGLISH -> card.meaningEn
                                                    ExplainLang.URDU -> card.meaningUr
                                                    ExplainLang.PASHTO -> card.meaningPs
                                                }
                                                speak(txt, selectedLang)
                                            }
                                        ) {
                                            Icon(Icons.Default.RecordVoiceOver, contentDescription = "Voice")
                                        }
                                    }
                                }
                            }
                        }
                    }

                    2 -> {
                        // ─── TAB 2: EXERCISE QUIZ (KPK TEXTBOOK REAL EXERCISES) ───
                        var qIdx by remember(stage.id) { mutableIntStateOf(0) }
                        var chosen by remember(stage.id, qIdx) { mutableStateOf<Int?>(null) }
                        val quiz = stage.quizzes[qIdx.coerceAtMost(stage.quizzes.lastIndex)]
                        val qText = when (selectedLang) {
                            ExplainLang.ENGLISH -> quiz.questionEn
                            ExplainLang.URDU -> quiz.questionUr
                            ExplainLang.PASHTO -> quiz.questionPs
                        }

                        Card(
                            shape = RoundedCornerShape(20.dp),
                            colors = CardDefaults.cardColors(containerColor = Color.White),
                            border = BorderStroke(2.dp, stage.themeColor),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(18.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = "Question ${qIdx + 1} / ${stage.quizzes.size}",
                                        color = stage.themeColor,
                                        fontWeight = FontWeight.ExtraBold,
                                        fontSize = 14.sp
                                    )
                                    Surface(
                                        shape = RoundedCornerShape(8.dp),
                                        color = Color(0xFFFEF3C7)
                                    ) {
                                        Text(
                                            text = "Official Exercise",
                                            fontSize = 10.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = Color(0xFF92400E),
                                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                        )
                                    }
                                }
                                Spacer(Modifier.height(8.dp))
                                Text(qText, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                                Spacer(Modifier.height(14.dp))

                                quiz.options.forEachIndexed { idx, opt ->
                                    val isChosen = chosen == idx
                                    val isCorrect = idx == quiz.correctIndex
                                    Surface(
                                        shape = RoundedCornerShape(14.dp),
                                        color = when {
                                            !isChosen -> Color(0xFFF8FAFC)
                                            isCorrect -> Color(0xFFD1FAE5)
                                            else -> Color(0xFFFEE2E2)
                                        },
                                        border = BorderStroke(1.5.dp, when {
                                            !isChosen -> Color(0xFFCBD5E1)
                                            isCorrect -> Color(0xFF10B981)
                                            else -> Color(0xFFEF4444)
                                        }),
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .padding(vertical = 5.dp)
                                            .clickable {
                                                chosen = idx
                                                speak(opt, selectedLang)
                                                if (isCorrect) {
                                                    if (qIdx + 1 < stage.quizzes.size) {
                                                        qIdx++
                                                    } else {
                                                        if (!completedStages.contains(stage.id)) {
                                                            completedStages = completedStages + stage.id
                                                            totalStars += 3
                                                        }
                                                        showOverlay = true
                                                    }
                                                }
                                            }
                                    ) {
                                        Row(
                                            modifier = Modifier.padding(14.dp),
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            if (isChosen && isCorrect) {
                                                Icon(
                                                    Icons.Default.CheckCircle,
                                                    contentDescription = null,
                                                    tint = Color(0xFF059669),
                                                    modifier = Modifier.size(18.dp)
                                                )
                                                Spacer(Modifier.width(8.dp))
                                            }
                                            Text(
                                                text = opt,
                                                fontSize = 15.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = Color(0xFF0F172A)
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            AnimatedVisibility(
                visible = showOverlay,
                enter = fadeIn() + scaleIn(),
                modifier = Modifier.align(Alignment.Center)
            ) {
                Card(
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF064E3B)),
                    border = BorderStroke(3.dp, Color(0xFFFFD54F)),
                    elevation = CardDefaults.cardElevation(12.dp),
                    modifier = Modifier
                        .padding(28.dp)
                        .fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text("🌟 مبارک ہو • شاندار 🌟", fontSize = 24.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFFFFD54F))
                        Spacer(Modifier.height(8.dp))
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> "Stage Complete! +3 Stars Earned. Unlocking next lesson..."
                                ExplainLang.URDU -> "سبق مکمل! 3 ستارے حاصل ہوئے۔ اگلا سبق کھل رہا ہے..."
                                ExplainLang.PASHTO -> "لوست بشپړ شو! ۳ ستوري مو وګټل. بل لوست پرانیستل کېږي..."
                            },
                            color = Color.White,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            textAlign = TextAlign.Center
                        )
                    }
                }
            }
        }
    }
}
