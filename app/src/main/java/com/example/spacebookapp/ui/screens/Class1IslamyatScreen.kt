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
import androidx.compose.material.icons.filled.RecordVoiceOver
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import java.util.Locale
import kotlin.math.sin

private enum class IslamyatTab(val titleEn: String, val titleUr: String, val titlePs: String) {
    GAME("Game", "اسلامی گیم", "اسلامي لوبه"),
    LESSON("Lesson", "سبق", "لوست"),
    EXERCISE("Exercise", "مشق", "تمرین")
}

@Composable
fun Class1IslamyatScreen(
    onBackClick: () -> Unit
) {
    val stages = remember { Class1IslamyatRepository.stages }
    var currentStageIndex by remember { mutableIntStateOf(0) }
    var selectedTab by remember { mutableStateOf(IslamyatTab.GAME) }
    var selectedLang by remember { mutableStateOf(ExplainLang.URDU) }
    var completedStages by remember { mutableStateOf(setOf<Int>()) }
    var totalStars by remember { mutableIntStateOf(0) }
    var showCompleteOverlay by remember { mutableStateOf(false) }

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

    fun speak(text: String, lang: ExplainLang = selectedLang, isArabic: Boolean = false) {
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
        engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, "islamyat_tts")
    }

    fun explainCurrentStage() {
        val msg = when (selectedLang) {
            ExplainLang.ENGLISH -> "${stage.titleEn}. ${stage.summaryEn} ${stage.gamePromptEn}"
            ExplainLang.URDU -> "${stage.titleUr}۔ ${stage.summaryUr} ${stage.gamePromptUr}"
            ExplainLang.PASHTO -> "${stage.titlePs}۔ ${stage.summaryPs} ${stage.gamePromptPs}"
        }
        speak(msg, selectedLang)
    }

    LaunchedEffect(showCompleteOverlay, currentStageIndex) {
        if (showCompleteOverlay) {
            val congrats = when (selectedLang) {
                ExplainLang.ENGLISH -> "SubhanAllah! Unit complete! Moving to next unit."
                ExplainLang.URDU -> "سبحان اللہ! سبق مکمل ہو گیا! اگلے سبق پر جا رہے ہیں۔"
                ExplainLang.PASHTO -> "سبحان الله! لوست بشپړ شو! بل لوست ته ځو."
            }
            speak(congrats, selectedLang)
            delay(2000)
            showCompleteOverlay = false
            if (currentStageIndex < stages.lastIndex) {
                currentStageIndex++
                selectedTab = IslamyatTab.GAME
            }
        }
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.horizontalGradient(listOf(stage.secondaryColor, stage.themeColor))
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
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                    Spacer(Modifier.width(10.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "اسلامیات جماعت اوّل • ${stage.babTitle} (${stage.pageRange})",
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

                LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    itemsIndexed(stages) { idx, item ->
                        val active = idx == currentStageIndex
                        val done = completedStages.contains(item.id)
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = when {
                                active -> Color.White
                                done -> Color(0xFF10B981)
                                else -> Color.White.copy(alpha = 0.2f)
                            },
                            modifier = Modifier.clickable {
                                currentStageIndex = idx
                                showCompleteOverlay = false
                            }
                        ) {
                            Text(
                                text = if (done) "✓ سبق ${item.id}" else "سبق ${item.id}",
                                color = if (active) stage.secondaryColor else Color.White,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.ExtraBold,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                            )
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                // Language & Voice Selector
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

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.Black.copy(alpha = 0.2f), RoundedCornerShape(12.dp))
                        .padding(4.dp),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    IslamyatTab.entries.forEach { tab ->
                        val active = selectedTab == tab
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = if (active) Color.White else Color.Transparent,
                            modifier = Modifier
                                .weight(1f)
                                .clickable { selectedTab = tab }
                        ) {
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> tab.titleEn
                                    ExplainLang.URDU -> tab.titleUr
                                    ExplainLang.PASHTO -> tab.titlePs
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
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color.White,
                    border = BorderStroke(1.5.dp, stage.themeColor.copy(alpha = 0.4f)),
                    shadowElevation = 2.dp,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> stage.titleEn
                                ExplainLang.URDU -> stage.titleUr
                                ExplainLang.PASHTO -> stage.titlePs
                            },
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = stage.secondaryColor
                        )
                        Spacer(Modifier.height(4.dp))
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
                    IslamyatTab.GAME -> {
                        IslamyatInteractiveGameCard(
                            stage = stage,
                            selectedLang = selectedLang,
                            onSpeak = { txt, isAr -> speak(txt, selectedLang, isAr) },
                            onStageCompleted = {
                                if (!completedStages.contains(stage.id)) {
                                    completedStages = completedStages + stage.id
                                    totalStars += 3
                                }
                                showCompleteOverlay = true
                            }
                        )
                    }
                    IslamyatTab.LESSON -> {
                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            stage.cards.forEach { card ->
                                Card(
                                    shape = RoundedCornerShape(18.dp),
                                    colors = CardDefaults.cardColors(containerColor = Color.White),
                                    border = BorderStroke(2.dp, card.badgeColor.copy(alpha = 0.4f)),
                                    elevation = CardDefaults.cardElevation(3.dp),
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .clickable { speak(card.headingArabicOrUrdu, isArabic = true) }
                                ) {
                                    Column(modifier = Modifier.padding(16.dp)) {
                                        Box(
                                            modifier = Modifier
                                                .fillMaxWidth()
                                                .background(card.badgeColor.copy(alpha = 0.12f), RoundedCornerShape(14.dp))
                                                .padding(14.dp),
                                            contentAlignment = Alignment.Center
                                        ) {
                                            Text(
                                                text = card.headingArabicOrUrdu,
                                                fontSize = 22.sp,
                                                fontWeight = FontWeight.ExtraBold,
                                                color = Color(0xFF0F172A),
                                                textAlign = TextAlign.Center
                                            )
                                        }
                                        Spacer(Modifier.height(8.dp))
                                        Row(
                                            modifier = Modifier.fillMaxWidth(),
                                            horizontalArrangement = Arrangement.SpaceBetween,
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            Column(modifier = Modifier.weight(1f)) {
                                                Text(card.titleEn, fontWeight = FontWeight.ExtraBold, color = card.badgeColor, fontSize = 14.sp)
                                                Spacer(Modifier.height(4.dp))
                                                Text(
                                                    text = when (selectedLang) {
                                                        ExplainLang.ENGLISH -> card.bodyEn
                                                        ExplainLang.URDU -> card.bodyUr
                                                        ExplainLang.PASHTO -> card.bodyPs
                                                    },
                                                    fontSize = 13.sp,
                                                    color = Color(0xFF334155)
                                                )
                                            }
                                            FilledTonalIconButton(
                                                onClick = {
                                                    val body = when (selectedLang) {
                                                        ExplainLang.ENGLISH -> card.bodyEn
                                                        ExplainLang.URDU -> card.bodyUr
                                                        ExplainLang.PASHTO -> card.bodyPs
                                                    }
                                                    speak(body, selectedLang)
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
                    IslamyatTab.EXERCISE -> {
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
                                Text(
                                    text = "Question ${qIdx + 1} / ${stage.quizzes.size}",
                                    color = stage.themeColor,
                                    fontWeight = FontWeight.ExtraBold,
                                    fontSize = 14.sp
                                )
                                Spacer(Modifier.height(8.dp))
                                Text(qText, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                                Spacer(Modifier.height(12.dp))
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
                                        border = BorderStroke(1.5.dp, Color(0xFFCBD5E1)),
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
                                                        showCompleteOverlay = true
                                                    }
                                                }
                                            }
                                    ) {
                                        Text(
                                            text = opt,
                                            fontSize = 15.sp,
                                            fontWeight = FontWeight.Bold,
                                            modifier = Modifier.padding(14.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }

            AnimatedVisibility(
                visible = showCompleteOverlay,
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
                        Text("🕌 سبحان اللہ 🕌", fontSize = 26.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFFFFD54F))
                        Spacer(Modifier.height(8.dp))
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> "Unit Completed! Advancing to next lesson..."
                                ExplainLang.URDU -> "سبق مکمل ہو گیا! اگلے سبق پر جا رہے ہیں..."
                                ExplainLang.PASHTO -> "لوست بشپړ شو! بل لوست ته ځو..."
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
private fun IslamyatInteractiveGameCard(
    stage: IslamyatStageData,
    selectedLang: ExplainLang,
    onSpeak: (String, Boolean) -> Unit,
    onStageCompleted: () -> Unit
) {
    val infiniteTransition = rememberInfiniteTransition(label = "islamyat_game")
    val pulse by infiniteTransition.animateFloat(
        initialValue = 0.96f,
        targetValue = 1.05f,
        animationSpec = infiniteRepeatable(tween(900, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "pulse"
    )

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
                    .height(84.dp)
                    .clip(RoundedCornerShape(14.dp))
                    .background(Brush.horizontalGradient(listOf(stage.secondaryColor, stage.themeColor))),
                contentAlignment = Alignment.Center
            ) {
                Canvas(modifier = Modifier.fillMaxSize()) {
                    for (i in 0..6) {
                        drawCircle(
                            color = Color.White.copy(alpha = 0.14f),
                            radius = 16f,
                            center = Offset((size.width / 6f) * i, size.height / 2f + sin(i.toFloat()) * 12f)
                        )
                    }
                }
                Text(
                    text = when (selectedLang) {
                        ExplainLang.ENGLISH -> stage.gamePromptEn
                        ExplainLang.URDU -> stage.gamePromptUr
                        ExplainLang.PASHTO -> stage.gamePromptPs
                    },
                    color = Color.White,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.ExtraBold,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.padding(horizontal = 14.dp)
                )
            }

            Spacer(Modifier.height(14.dp))

            if (stage.sequenceItems.isNotEmpty()) {
                val items = stage.sequenceItems
                val shuffled = remember(stage.id) { items.shuffled() }
                var step by remember(stage.id) { mutableIntStateOf(0) }

                Text(
                    text = "Progress: $step / ${items.size}",
                    color = Color(0xFFFFD54F),
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 15.sp,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
                Spacer(Modifier.height(10.dp))

                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    shuffled.forEach { item ->
                        val orderIdx = items.indexOf(item)
                        val isDone = orderIdx < step
                        val isTarget = orderIdx == step
                        Surface(
                            shape = RoundedCornerShape(16.dp),
                            color = when {
                                isDone -> Color(0xFF059669)
                                isTarget -> stage.themeColor
                                else -> Color(0xFF1E293B)
                            },
                            border = BorderStroke(2.dp, if (isTarget) Color(0xFFFFD54F) else Color.White.copy(alpha = 0.3f)),
                            modifier = Modifier
                                .fillMaxWidth()
                                .scale(if (isTarget) pulse else 1f)
                                .clickable(enabled = !isDone) {
                                    onSpeak(item, true)
                                    if (isTarget) {
                                        val next = step + 1
                                        step = next
                                        if (next >= items.size) {
                                            onStageCompleted()
                                        }
                                    }
                                }
                        ) {
                            Text(
                                text = if (isDone) "✓  $item" else item,
                                color = Color.White,
                                fontSize = 22.sp,
                                fontWeight = FontWeight.ExtraBold,
                                textAlign = TextAlign.Center,
                                modifier = Modifier.padding(14.dp)
                            )
                        }
                    }
                }
            } else {
                val pairs = stage.matchPairs
                var pairIdx by remember(stage.id) { mutableIntStateOf(0) }
                val currentPair = pairs[pairIdx.coerceAtMost(pairs.lastIndex)]
                val options = remember(stage.id, pairIdx) { pairs.map { it.second }.shuffled() }

                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color(0xFF1E293B),
                    border = BorderStroke(1.5.dp, Color(0xFFFFD54F)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(14.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "Match ${pairIdx + 1} of ${pairs.size}",
                            color = Color(0xFF93C5FD),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(Modifier.height(6.dp))
                        Text(
                            text = currentPair.first,
                            color = Color(0xFFFFD54F),
                            fontSize = 22.sp,
                            fontWeight = FontWeight.ExtraBold,
                            textAlign = TextAlign.Center
                        )
                    }
                }

                Spacer(Modifier.height(12.dp))

                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    options.forEach { opt ->
                        Surface(
                            shape = RoundedCornerShape(16.dp),
                            color = stage.themeColor.copy(alpha = 0.85f),
                            border = BorderStroke(1.5.dp, Color.White.copy(alpha = 0.4f)),
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable {
                                    onSpeak(opt, false)
                                    if (opt == currentPair.second) {
                                        if (pairIdx + 1 >= pairs.size) {
                                            onStageCompleted()
                                        } else {
                                            pairIdx++
                                        }
                                    }
                                }
                        ) {
                            Text(
                                text = opt,
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
}
