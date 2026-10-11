package com.example.spacebookapp.ui.screens

import android.speech.tts.TextToSpeech
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.*
import androidx.compose.animation.fadeIn
import androidx.compose.animation.scaleIn
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
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
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import java.util.Locale
import kotlin.math.cos
import kotlin.math.sin

private enum class NazeraTab(val titleEn: String, val titleUr: String, val titlePs: String) {
    GAME("Game", "تجوید گیم", "تجوید لوبه"),
    LESSON("Lesson", "سبق", "لوست"),
    EXERCISE("Exercise", "مشق", "تمرین")
}

@Composable
fun Class1NazeraScreen(
    onBackClick: () -> Unit
) {
    val stages = remember { Class1NazeraRepository.stages }
    var currentStageIndex by remember { mutableIntStateOf(0) }
    var selectedTab by remember { mutableStateOf(NazeraTab.GAME) }
    var selectedLang by remember { mutableStateOf(ExplainLang.URDU) }
    var completedStages by remember { mutableStateOf(setOf<Int>()) }
    var totalStars by remember { mutableIntStateOf(0) }
    var showStageCompleteOverlay by remember { mutableStateOf(false) }

    val stage = stages[currentStageIndex]
    val context = LocalContext.current

    var tts by remember { mutableStateOf<TextToSpeech?>(null) }
    DisposableEffect(context) {
        var engine: TextToSpeech? = null
        engine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                engine?.language = Locale("ur", "PK")
            }
        }
        tts = engine
        onDispose {
            engine?.stop()
            engine?.shutdown()
        }
    }

    fun speakText(text: String, lang: ExplainLang = selectedLang, isArabic: Boolean = false) {
        val engine = tts ?: return
        val locale = when {
            isArabic -> Locale("ar", "SA")
            lang == ExplainLang.ENGLISH -> Locale.US
            lang == ExplainLang.URDU -> Locale("ur", "PK")
            else -> Locale("ps", "AF")
        }
        val res = engine.setLanguage(locale)
        if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
            engine.setLanguage(Locale("ur", "PK"))
        }
        engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, "nazera_tts")
    }

    fun explainCurrentTab() {
        val text = when (selectedLang) {
            ExplainLang.ENGLISH -> "${stage.titleEn}. ${stage.ruleEn} ${stage.gameInstructionEn}"
            ExplainLang.URDU -> "${stage.titleUr}۔ ${stage.ruleUr} ${stage.gameInstructionUr}"
            ExplainLang.PASHTO -> "${stage.titlePs}۔ ${stage.rulePs} ${stage.gameInstructionPs}"
        }
        speakText(text, selectedLang)
    }

    // Auto-advance when stage game completes
    LaunchedEffect(showStageCompleteOverlay, currentStageIndex) {
        if (showStageCompleteOverlay) {
            val congrats = when (selectedLang) {
                ExplainLang.ENGLISH -> "MashaAllah! Lesson complete! Moving to next lesson."
                ExplainLang.URDU -> "ماشاء اللہ! سبق مکمل ہو گیا! اگلے سبق پر جا رہے ہیں۔"
                ExplainLang.PASHTO -> "ماشاء الله! لوست بشپړ شو! بل لوست ته ځو."
            }
            speakText(congrats, selectedLang)
            delay(2000)
            showStageCompleteOverlay = false
            if (currentStageIndex < stages.lastIndex) {
                currentStageIndex++
                selectedTab = NazeraTab.GAME
            }
        }
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.horizontalGradient(
                            listOf(stage.secondaryColor, stage.themeColor)
                        )
                    )
                    .statusBarsPadding()
                    .padding(horizontal = 12.dp, vertical = 10.dp)
            ) {
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
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = Color.White
                        )
                    }
                    Spacer(Modifier.width(10.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "ناظرہ قرآن جماعت اوّل • ${stage.lessonNumber} (${stage.pageRange})",
                            color = Color(0xFFFDE68A),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = stage.titleArabic,
                            color = Color.White,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                    }
                    Surface(
                        shape = RoundedCornerShape(14.dp),
                        color = Color(0xFFFFD54F)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                Icons.Default.Star,
                                contentDescription = null,
                                tint = Color(0xFFB45309),
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(Modifier.width(4.dp))
                            Text(
                                text = "$totalStars",
                                fontWeight = FontWeight.ExtraBold,
                                color = Color(0xFF0F172A),
                                fontSize = 13.sp
                            )
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                // Stage Selector Pills (Lessons 1..17)
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    itemsIndexed(stages) { index, item ->
                        val isSelected = index == currentStageIndex
                        val isDone = completedStages.contains(item.id)
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = when {
                                isSelected -> Color.White
                                isDone -> Color(0xFF10B981)
                                else -> Color.White.copy(alpha = 0.18f)
                            },
                            modifier = Modifier.clickable {
                                currentStageIndex = index
                                showStageCompleteOverlay = false
                            }
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = if (isDone) "✓ سبق ${item.id}" else "سبق ${item.id}",
                                    color = if (isSelected) stage.secondaryColor else Color.White,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                            }
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                // Language & Voice Bar (English / Urdu / Pashto + Voice button)
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        ExplainLang.entries.forEach { lang ->
                            val active = selectedLang == lang
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (active) Color(0xFFFFD54F) else Color.White.copy(alpha = 0.2f),
                                modifier = Modifier.clickable {
                                    selectedLang = lang
                                    explainCurrentTab()
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
                        modifier = Modifier.clickable { explainCurrentTab() }
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                Icons.AutoMirrored.Filled.VolumeUp,
                                contentDescription = "Speak",
                                tint = stage.secondaryColor,
                                modifier = Modifier.size(16.dp)
                            )
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

                // 3 Tabs: Game / Lesson / Exercise
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.Black.copy(alpha = 0.2f), RoundedCornerShape(12.dp))
                        .padding(4.dp),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    NazeraTab.entries.forEach { tab ->
                        val active = selectedTab == tab
                        val title = when (selectedLang) {
                            ExplainLang.ENGLISH -> tab.titleEn
                            ExplainLang.URDU -> tab.titleUr
                            ExplainLang.PASHTO -> tab.titlePs
                        }
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = if (active) Color.White else Color.Transparent,
                            modifier = Modifier
                                .weight(1f)
                                .clickable { selectedTab = tab }
                        ) {
                            Text(
                                text = title,
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
                // Trilingual Tajweed Rule Banner
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color.White,
                    border = BorderStroke(1.5.dp, stage.themeColor.copy(alpha = 0.4f)),
                    shadowElevation = 3.dp,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
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
                            IconButton(
                                onClick = { explainCurrentTab() },
                                modifier = Modifier
                                    .size(34.dp)
                                    .background(stage.themeColor.copy(alpha = 0.15f), CircleShape)
                            ) {
                                Icon(
                                    Icons.AutoMirrored.Filled.VolumeUp,
                                    contentDescription = "Listen",
                                    tint = stage.themeColor,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        }
                        Spacer(Modifier.height(4.dp))
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> stage.ruleEn
                                ExplainLang.URDU -> stage.ruleUr
                                ExplainLang.PASHTO -> stage.rulePs
                            },
                            fontSize = 13.sp,
                            color = Color(0xFF334155),
                            lineHeight = 19.sp
                        )
                    }
                }

                Spacer(Modifier.height(14.dp))

                when (selectedTab) {
                    NazeraTab.GAME -> {
                        NazeraInteractiveGameView(
                            stage = stage,
                            selectedLang = selectedLang,
                            onSpeakArabic = { ar -> speakText(ar, isArabic = true) },
                            onSpeakFeedback = { msg -> speakText(msg, selectedLang) },
                            onStageCompleted = {
                                if (!completedStages.contains(stage.id)) {
                                    completedStages = completedStages + stage.id
                                    totalStars += 3
                                }
                                showStageCompleteOverlay = true
                            }
                        )
                    }
                    NazeraTab.LESSON -> {
                        NazeraLessonTabView(
                            stage = stage,
                            selectedLang = selectedLang,
                            onSpeakArabic = { ar -> speakText(ar, isArabic = true) },
                            onSpeakExplanation = { txt -> speakText(txt, selectedLang) }
                        )
                    }
                    NazeraTab.EXERCISE -> {
                        NazeraExerciseTabView(
                            stage = stage,
                            selectedLang = selectedLang,
                            onSpeakText = { txt -> speakText(txt, selectedLang) },
                            onQuizFinished = {
                                if (!completedStages.contains(stage.id)) {
                                    completedStages = completedStages + stage.id
                                    totalStars += 3
                                }
                                showStageCompleteOverlay = true
                            }
                        )
                    }
                }
            }

            // Auto-advance celebration overlay
            AnimatedVisibility(
                visible = showStageCompleteOverlay,
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
                        Text("🌟 ماشاء اللہ 🌟", fontSize = 26.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFFFFD54F))
                        Spacer(Modifier.height(8.dp))
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> "Lesson ${stage.id} Completed! Moving to Lesson ${(stage.id % stages.size) + 1}..."
                                ExplainLang.URDU -> "سبق ${stage.id} مکمل! اگلے سبق پر جا رہے ہیں..."
                                ExplainLang.PASHTO -> "لوست ${stage.id} بشپړ شو! بل لوست ته ځو..."
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

@Composable
private fun NazeraInteractiveGameView(
    stage: NazeraStageData,
    selectedLang: ExplainLang,
    onSpeakArabic: (String) -> Unit,
    onSpeakFeedback: (String) -> Unit,
    onStageCompleted: () -> Unit
) {
    val infiniteTransition = rememberInfiniteTransition(label = "nazera_anim")
    val floatOffset by infiniteTransition.animateFloat(
        initialValue = -6f,
        targetValue = 6f,
        animationSpec = infiniteRepeatable(tween(1500, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "float"
    )
    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 0.96f,
        targetValue = 1.05f,
        animationSpec = infiniteRepeatable(tween(950, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "pulse"
    )

    Card(
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
        border = BorderStroke(2.dp, stage.themeColor),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            // Animated Islamic Geometric & Lantern Banner Canvas
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(92.dp)
                    .clip(RoundedCornerShape(14.dp))
                    .background(
                        Brush.horizontalGradient(
                            listOf(Color(0xFF042F2E), stage.secondaryColor, Color(0xFF0F172A))
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Canvas(modifier = Modifier.fillMaxSize()) {
                    val w = size.width
                    val h = size.height
                    for (i in 0..7) {
                        val cx = (w / 8f) * i + 25f
                        val cy = (h / 2f) + sin(i + floatOffset * 0.2f) * 10f
                        drawCircle(
                            color = Color(0xFFFFD54F).copy(alpha = 0.22f),
                            radius = 18f,
                            center = Offset(cx, cy)
                        )
                        drawCircle(
                            color = Color(0xFFFFD54F),
                            radius = 4f,
                            center = Offset(cx, cy)
                        )
                    }
                    // Crescent moon on left
                    drawCircle(
                        color = Color(0xFFFFD54F),
                        radius = 22f,
                        center = Offset(42f, h / 2f + floatOffset * 0.6f)
                    )
                    drawCircle(
                        color = Color(0xFF042F2E),
                        radius = 18f,
                        center = Offset(50f, h / 2f - 4f + floatOffset * 0.6f)
                    )
                }
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(horizontal = 48.dp)
                ) {
                    Text(
                        text = stage.titleArabic,
                        color = Color(0xFFFFD54F),
                        fontSize = 20.sp,
                        fontWeight = FontWeight.ExtraBold,
                        textAlign = TextAlign.Center
                    )
                    Spacer(Modifier.height(4.dp))
                    Text(
                        text = when (selectedLang) {
                            ExplainLang.ENGLISH -> stage.gameInstructionEn
                            ExplainLang.URDU -> stage.gameInstructionUr
                            ExplainLang.PASHTO -> stage.gameInstructionPs
                        },
                        color = Color.White,
                        fontSize = 12.sp,
                        textAlign = TextAlign.Center
                    )
                }
            }

            Spacer(Modifier.height(14.dp))

            when (stage.gameType) {
                NazeraGameType.LETTER_MAKHRAJ_POP -> {
                    val letters = remember(stage.id) {
                        listOf("ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س")
                    }
                    var nextIndex by remember(stage.id) { mutableIntStateOf(0) }
                    val shuffled = remember(stage.id) { letters.shuffled() }

                    Text(
                        text = "Target Huruf: ${letters.getOrElse(nextIndex) { "✓" }}  (${nextIndex}/${letters.size})",
                        color = Color(0xFFFFD54F),
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 16.sp,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                    Spacer(Modifier.height(12.dp))

                    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        shuffled.chunked(4).forEach { rowItems ->
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                rowItems.forEach { letter ->
                                    val letterOrder = letters.indexOf(letter)
                                    val isPopped = letterOrder < nextIndex
                                    val isTarget = letterOrder == nextIndex
                                    Surface(
                                        shape = RoundedCornerShape(16.dp),
                                        color = when {
                                            isPopped -> Color(0xFF10B981)
                                            isTarget -> stage.themeColor
                                            else -> Color(0xFF1E293B)
                                        },
                                        border = BorderStroke(
                                            2.dp,
                                            if (isTarget) Color(0xFFFFD54F) else Color.White.copy(alpha = 0.25f)
                                        ),
                                        modifier = Modifier
                                            .weight(1f)
                                            .height(74.dp)
                                            .scale(if (isTarget) pulseScale else 1f)
                                            .clickable(enabled = !isPopped) {
                                                onSpeakArabic(letter)
                                                if (isTarget) {
                                                    val updated = nextIndex + 1
                                                    nextIndex = updated
                                                    if (updated >= letters.size) {
                                                        onStageCompleted()
                                                    }
                                                } else {
                                                    onSpeakFeedback("Try finding ${letters[nextIndex]}")
                                                }
                                            }
                                    ) {
                                        Box(contentAlignment = Alignment.Center) {
                                            Text(
                                                text = if (isPopped) "✓ $letter" else letter,
                                                color = Color.White,
                                                fontSize = 26.sp,
                                                fontWeight = FontWeight.ExtraBold
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                NazeraGameType.HARKAAT_SOUND_BUILDER,
                NazeraGameType.TANWEEN_GHUNNA_CATCHER -> {
                    var stepIndex by remember(stage.id) { mutableIntStateOf(0) }
                    val cards = stage.cards
                    val targetCard = cards[stepIndex.coerceAtMost(cards.lastIndex)]
                    val options = remember(stage.id, stepIndex) {
                        cards.shuffled()
                    }

                    Surface(
                        shape = RoundedCornerShape(16.dp),
                        color = Color(0xFF1E293B),
                        border = BorderStroke(1.5.dp, Color(0xFFFFD54F)),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSpeakArabic(targetCard.arabicText) }
                    ) {
                        Column(
                            modifier = Modifier.padding(14.dp),
                            horizontalAlignment = Alignment.CenterHorizontally
                        ) {
                            Text(
                                text = "Round ${stepIndex + 1} of ${cards.size} • Tap to Listen 🔊",
                                color = Color(0xFF93C5FD),
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Spacer(Modifier.height(6.dp))
                            Text(
                                text = "Find:  \"${targetCard.transliteration}\"",
                                color = Color(0xFFFFD54F),
                                fontSize = 20.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                            Spacer(Modifier.height(4.dp))
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> targetCard.meaningEn
                                    ExplainLang.URDU -> targetCard.meaningUr
                                    ExplainLang.PASHTO -> targetCard.meaningPs
                                },
                                color = Color.White,
                                fontSize = 13.sp
                            )
                        }
                    }

                    Spacer(Modifier.height(12.dp))

                    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        options.forEach { option ->
                            Surface(
                                shape = RoundedCornerShape(16.dp),
                                color = option.badgeColor.copy(alpha = 0.88f),
                                border = BorderStroke(2.dp, Color.White.copy(alpha = 0.4f)),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable {
                                        onSpeakArabic(option.arabicText)
                                        if (option == targetCard) {
                                            if (stepIndex + 1 >= cards.size) {
                                                onStageCompleted()
                                            } else {
                                                stepIndex++
                                            }
                                        }
                                    }
                            ) {
                                Row(
                                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 14.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(
                                        text = option.transliteration,
                                        color = Color(0xFFFFFBEB),
                                        fontSize = 13.sp,
                                        fontWeight = FontWeight.Bold
                                    )
                                    Text(
                                        text = option.arabicText,
                                        color = Color.White,
                                        fontSize = 26.sp,
                                        fontWeight = FontWeight.ExtraBold
                                    )
                                }
                            }
                        }
                    }
                }

                NazeraGameType.JAZAM_SHADD_BRIDGE -> {
                    val pairs = remember(stage.id) {
                        if (stage.id == 5) {
                            listOf(
                                Triple("اَ", "بْ", "اَبْ (Ab)"),
                                Triple("مَ", "نْ", "مَنْ (Man)"),
                                Triple("قُ", "لْ", "قُلْ (Qul)"),
                                Triple("لَ", "مْ", "لَمْ (Lam)")
                            )
                        } else {
                            listOf(
                                Triple("رَ", "بِّ", "رَبِّ (Rab-bi)"),
                                Triple("اِ", "نَّ", "اِنَّ (In-na)"),
                                Triple("حَ", "قُّ", "حَقُّ (Haq-qu)"),
                                Triple("ثُ", "مَّ", "ثُمَّ (Thum-ma)")
                            )
                        }
                    }
                    var pairIdx by remember(stage.id) { mutableIntStateOf(0) }
                    var firstTapped by remember(stage.id, pairIdx) { mutableStateOf(false) }
                    var secondTapped by remember(stage.id, pairIdx) { mutableStateOf(false) }

                    val currentPair = pairs[pairIdx.coerceAtMost(pairs.lastIndex)]

                    Text(
                        text = "Bridge ${pairIdx + 1} / ${pairs.size}: Tap Right Letter ➔ Then Left Letter!",
                        color = Color(0xFFFFD54F),
                        fontSize = 14.sp,
                        fontWeight = FontWeight.ExtraBold,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                    Spacer(Modifier.height(14.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Second letter (Left in RTL)
                        Surface(
                            shape = CircleShape,
                            color = if (secondTapped) Color(0xFF10B981) else Color(0xFF334155),
                            border = BorderStroke(3.dp, Color(0xFFFFD54F)),
                            modifier = Modifier
                                .size(92.dp)
                                .scale(if (firstTapped && !secondTapped) pulseScale else 1f)
                                .clickable {
                                    if (firstTapped) {
                                        secondTapped = true
                                        onSpeakArabic(currentPair.third.substringBefore(" "))
                                        if (pairIdx + 1 >= pairs.size) {
                                            onStageCompleted()
                                        } else {
                                            pairIdx++
                                        }
                                    }
                                }
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text(
                                    text = currentPair.second,
                                    color = Color.White,
                                    fontSize = 34.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                            }
                        }

                        Text(
                            text = "⬅️ +",
                            fontSize = 24.sp,
                            color = Color(0xFFFFD54F),
                            fontWeight = FontWeight.ExtraBold
                        )

                        // First letter (Right in RTL)
                        Surface(
                            shape = CircleShape,
                            color = if (firstTapped) Color(0xFF10B981) else stage.themeColor,
                            border = BorderStroke(3.dp, Color.White),
                            modifier = Modifier
                                .size(92.dp)
                                .scale(if (!firstTapped) pulseScale else 1f)
                                .clickable {
                                    firstTapped = true
                                    onSpeakArabic(currentPair.first)
                                }
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text(
                                    text = currentPair.first,
                                    color = Color.White,
                                    fontSize = 34.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                            }
                        }
                    }

                    Spacer(Modifier.height(14.dp))
                    Surface(
                        shape = RoundedCornerShape(14.dp),
                        color = Color(0xFF1E293B),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = "Joined Word:  ${currentPair.third}",
                            color = Color(0xFF38BDF8),
                            fontSize = 22.sp,
                            fontWeight = FontWeight.ExtraBold,
                            textAlign = TextAlign.Center,
                            modifier = Modifier.padding(12.dp)
                        )
                    }
                }

                NazeraGameType.MADDAH_LEEN_STRETCHER -> {
                    var completedSet by remember(stage.id) { mutableStateOf(setOf<Int>()) }
                    Text(
                        text = "Practiced Words: ${completedSet.size} / ${stage.cards.size}",
                        color = Color(0xFFFFD54F),
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 15.sp,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                    Spacer(Modifier.height(10.dp))

                    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        stage.cards.forEachIndexed { idx, card ->
                            val isDone = completedSet.contains(idx)
                            Surface(
                                shape = RoundedCornerShape(18.dp),
                                color = if (isDone) Color(0xFF065F46) else Color(0xFF1E293B),
                                border = BorderStroke(
                                    2.dp,
                                    if (isDone) Color(0xFF34D399) else card.badgeColor
                                ),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable {
                                        onSpeakArabic(card.arabicText)
                                        val updated = completedSet + idx
                                        completedSet = updated
                                        if (updated.size >= stage.cards.size) {
                                            onStageCompleted()
                                        }
                                    }
                            ) {
                                Row(
                                    modifier = Modifier.padding(14.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(
                                            text = if (isDone) "✓ ${card.transliteration}" else "🌊 ${card.transliteration}",
                                            color = Color(0xFFFFD54F),
                                            fontWeight = FontWeight.ExtraBold,
                                            fontSize = 15.sp
                                        )
                                        Text(
                                            text = when (selectedLang) {
                                                ExplainLang.ENGLISH -> card.meaningEn
                                                ExplainLang.URDU -> card.meaningUr
                                                ExplainLang.PASHTO -> card.meaningPs
                                            },
                                            color = Color.White.copy(alpha = 0.85f),
                                            fontSize = 12.sp
                                        )
                                    }
                                    Text(
                                        text = card.arabicText,
                                        color = Color.White,
                                        fontSize = 28.sp,
                                        fontWeight = FontWeight.ExtraBold
                                    )
                                }
                            }
                        }
                    }
                }

                NazeraGameType.SURAH_AYAH_BUILDER -> {
                    val ayahs = remember {
                        listOf(
                            "قُلْ هُوَ اللّٰهُ أَحَدٌ ۝١",
                            "اللّٰهُ الصَّمَدُ ۝٢",
                            "لَمْ يَلِدْ وَلَمْ يُولَدْ ۝٣",
                            "وَلَمْ يَكُنْ لَّهُ كُفُوًا أَحَدٌ ۝٤"
                        )
                    }
                    val shuffledAyahs = remember(stage.id) { ayahs.shuffled() }
                    var currentAyahStep by remember(stage.id) { mutableIntStateOf(0) }

                    Text(
                        text = "Surah Al-Ikhlas Ayah Order: ${currentAyahStep} / ${ayahs.size}",
                        color = Color(0xFFFFD54F),
                        fontSize = 15.sp,
                        fontWeight = FontWeight.ExtraBold,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                    Spacer(Modifier.height(10.dp))

                    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        shuffledAyahs.forEach { ayah ->
                            val ayahIdx = ayahs.indexOf(ayah)
                            val isDone = ayahIdx < currentAyahStep
                            val isNext = ayahIdx == currentAyahStep
                            Surface(
                                shape = RoundedCornerShape(16.dp),
                                color = when {
                                    isDone -> Color(0xFF065F46)
                                    else -> Color(0xFF1E293B)
                                },
                                border = BorderStroke(
                                    2.dp,
                                    if (isDone) Color(0xFF34D399) else Color(0xFFFFD54F).copy(alpha = 0.6f)
                                ),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .scale(if (isNext) pulseScale else 1f)
                                    .clickable(enabled = !isDone) {
                                        onSpeakArabic(ayah)
                                        if (isNext) {
                                            val next = currentAyahStep + 1
                                            currentAyahStep = next
                                            if (next >= ayahs.size) {
                                                onStageCompleted()
                                            }
                                        }
                                    }
                            ) {
                                Text(
                                    text = if (isDone) "✓  $ayah" else ayah,
                                    color = Color.White,
                                    fontSize = 22.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    textAlign = TextAlign.Center,
                                    modifier = Modifier.padding(14.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun NazeraLessonTabView(
    stage: NazeraStageData,
    selectedLang: ExplainLang,
    onSpeakArabic: (String) -> Unit,
    onSpeakExplanation: (String) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        stage.cards.forEach { card ->
            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(2.dp, card.badgeColor.copy(alpha = 0.45f)),
                elevation = CardDefaults.cardElevation(3.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onSpeakArabic(card.arabicText) }
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(card.badgeColor.copy(alpha = 0.12f), RoundedCornerShape(14.dp))
                            .padding(vertical = 14.dp, horizontal = 12.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = card.arabicText,
                            fontSize = 30.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF0F172A),
                            textAlign = TextAlign.Center,
                            lineHeight = 40.sp
                        )
                    }
                    Spacer(Modifier.height(10.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = card.transliteration,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = card.badgeColor
                            )
                            val meaning = when (selectedLang) {
                                ExplainLang.ENGLISH -> card.meaningEn
                                ExplainLang.URDU -> card.meaningUr
                                ExplainLang.PASHTO -> card.meaningPs
                            }
                            Text(
                                text = meaning,
                                fontSize = 13.sp,
                                color = Color(0xFF334155)
                            )
                        }
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            FilledTonalIconButton(
                                onClick = { onSpeakArabic(card.arabicText) }
                            ) {
                                Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = "Arabic Audio")
                            }
                            FilledTonalIconButton(
                                onClick = {
                                    val msg = when (selectedLang) {
                                        ExplainLang.ENGLISH -> "${card.transliteration}. ${card.meaningEn}"
                                        ExplainLang.URDU -> card.meaningUr
                                        ExplainLang.PASHTO -> card.meaningPs
                                    }
                                    onSpeakExplanation(msg)
                                }
                            ) {
                                Icon(Icons.Default.RecordVoiceOver, contentDescription = "Explain")
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun NazeraExerciseTabView(
    stage: NazeraStageData,
    selectedLang: ExplainLang,
    onSpeakText: (String) -> Unit,
    onQuizFinished: () -> Unit
) {
    var qIndex by remember(stage.id) { mutableIntStateOf(0) }
    var selectedOpt by remember(stage.id, qIndex) { mutableStateOf<Int?>(null) }
    val quiz = stage.quizzes[qIndex.coerceAtMost(stage.quizzes.lastIndex)]

    val questionText = when (selectedLang) {
        ExplainLang.ENGLISH -> quiz.questionEn
        ExplainLang.URDU -> quiz.questionUr
        ExplainLang.PASHTO -> quiz.questionPs
    }

    Card(
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        border = BorderStroke(2.dp, stage.themeColor),
        elevation = CardDefaults.cardElevation(4.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(18.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Question ${qIndex + 1} / ${stage.quizzes.size}",
                    fontWeight = FontWeight.ExtraBold,
                    color = stage.themeColor,
                    fontSize = 14.sp
                )
                IconButton(onClick = { onSpeakText(questionText) }) {
                    Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = "Speak Question", tint = stage.themeColor)
                }
            }

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFFF1F5F9), RoundedCornerShape(14.dp))
                    .padding(14.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = quiz.arabicPrompt,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color(0xFF0F172A)
                )
            }

            Spacer(Modifier.height(10.dp))
            Text(
                text = questionText,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1E293B)
            )
            Spacer(Modifier.height(12.dp))

            quiz.options.forEachIndexed { idx, opt ->
                val isChosen = selectedOpt == idx
                val isCorrect = idx == quiz.correctIndex
                val bgColor = when {
                    !isChosen -> Color(0xFFF8FAFC)
                    isCorrect -> Color(0xFFD1FAE5)
                    else -> Color(0xFFFEE2E2)
                }
                Surface(
                    shape = RoundedCornerShape(14.dp),
                    color = bgColor,
                    border = BorderStroke(
                        1.5.dp,
                        if (isChosen && isCorrect) Color(0xFF10B981) else Color(0xFFCBD5E1)
                    ),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 5.dp)
                        .clickable {
                            selectedOpt = idx
                            onSpeakText(opt)
                            if (isCorrect) {
                                if (qIndex + 1 < stage.quizzes.size) {
                                    qIndex++
                                } else {
                                    onQuizFinished()
                                }
                            }
                        }
                ) {
                    Text(
                        text = opt,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A),
                        modifier = Modifier.padding(14.dp)
                    )
                }
            }
        }
    }
}
