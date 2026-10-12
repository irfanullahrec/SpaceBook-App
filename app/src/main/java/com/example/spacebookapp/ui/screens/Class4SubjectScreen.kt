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

private enum class Class4Tab(val titleEn: String, val titleUr: String, val titlePs: String) {
    GAME("Game", "گیم", "لوبه"),
    LESSON("Lesson", "سبق", "لوست"),
    EXERCISE("Exercise", "مشق", "تمرین")
}

@Composable
fun Class4SubjectScreen(
    bookType: Class4BookType,
    onBackClick: () -> Unit
) {
    val stages = remember(bookType) { Class4CurriculumRepository.stagesFor(bookType) }
    val defaultLang = when (bookType) {
        Class4BookType.PASHTO -> ExplainLang.PASHTO
        Class4BookType.ISLAMIAT, Class4BookType.URDU -> ExplainLang.URDU
        else -> ExplainLang.ENGLISH
    }
    CurriculumSubjectScreenContent(
        screenKey = bookType.storyId,
        bookTitleEn = bookType.titleEn,
        accentColor = bookType.accentColor,
        secondaryColor = bookType.secondaryColor,
        defaultLang = defaultLang,
        stages = stages,
        onBackClick = onBackClick
    )
}

@Composable
fun Class5SubjectScreen(
    bookType: Class5BookType,
    onBackClick: () -> Unit
) {
    val stages = remember(bookType) { Class5CurriculumRepository.stagesFor(bookType) }
    val defaultLang = when (bookType) {
        Class5BookType.PASHTO -> ExplainLang.PASHTO
        Class5BookType.ISLAMIAT, Class5BookType.URDU -> ExplainLang.URDU
        else -> ExplainLang.ENGLISH
    }
    CurriculumSubjectScreenContent(
        screenKey = bookType.storyId,
        bookTitleEn = bookType.titleEn,
        accentColor = bookType.accentColor,
        secondaryColor = bookType.secondaryColor,
        defaultLang = defaultLang,
        stages = stages,
        onBackClick = onBackClick
    )
}

@Composable
fun Class6SubjectScreen(
    bookType: com.example.spacebookapp.data.Class6BookType,
    onBackClick: () -> Unit
) {
    val stages = remember(bookType) { com.example.spacebookapp.data.Class6CurriculumRepository.getStages(bookType) }
    val defaultLang = when (bookType.defaultLang) {
        com.example.spacebookapp.data.Class4Lang.PS -> ExplainLang.PASHTO
        com.example.spacebookapp.data.Class4Lang.UR -> ExplainLang.URDU
        com.example.spacebookapp.data.Class4Lang.EN -> ExplainLang.ENGLISH
    }
    CurriculumSubjectScreenContent(
        screenKey = bookType.id,
        bookTitleEn = bookType.titleEn,
        accentColor = bookType.accentColor,
        secondaryColor = bookType.secondaryColor,
        defaultLang = defaultLang,
        stages = stages,
        onBackClick = onBackClick
    )
}

@Composable
private fun CurriculumSubjectScreenContent(
    screenKey: String,
    bookTitleEn: String,
    accentColor: Color,
    secondaryColor: Color,
    defaultLang: ExplainLang,
    stages: List<Class4StageData>,
    onBackClick: () -> Unit
) {
    var currentStageIndex by remember(screenKey) { mutableIntStateOf(0) }
    var selectedTab by remember(screenKey) { mutableStateOf(Class4Tab.GAME) }
    var selectedLang by remember(screenKey) { mutableStateOf(defaultLang) }
    var completedStages by remember(screenKey) { mutableStateOf(setOf<Int>()) }
    var totalStars by remember(screenKey) { mutableIntStateOf(0) }
    var showOverlay by remember(screenKey) { mutableStateOf(false) }

    val stage = stages[currentStageIndex]
    val context = LocalContext.current

    var tts by remember { mutableStateOf<TextToSpeech?>(null) }
    DisposableEffect(context) {
        var engine: TextToSpeech? = null
        engine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                engine?.language = Locale.US
            }
        }
        tts = engine
        onDispose {
            engine?.stop()
            engine?.shutdown()
        }
    }

    fun speak(text: String, lang: ExplainLang = selectedLang) {
        val engine = tts ?: return
        val locale = when (lang) {
            ExplainLang.ENGLISH -> Locale.US
            ExplainLang.URDU -> Locale.forLanguageTag("ur-PK")
            ExplainLang.PASHTO -> Locale.forLanguageTag("ps-AF")
        }
        val res = engine.setLanguage(locale)
        if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
            engine.setLanguage(Locale.forLanguageTag("ur-PK"))
        }
        engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, "cls_tts")
    }

    fun explainCurrentStage() {
        val msg = when (selectedLang) {
            ExplainLang.ENGLISH -> "${stage.titleEn}. ${stage.summaryEn}"
            ExplainLang.URDU -> "${stage.titleUr}۔ ${stage.summaryUr}"
            ExplainLang.PASHTO -> "${stage.titlePs}۔ ${stage.summaryPs}"
        }
        speak(msg, selectedLang)
    }

    LaunchedEffect(showOverlay, currentStageIndex) {
        if (showOverlay) {
            val congrats = when (selectedLang) {
                ExplainLang.ENGLISH -> "Awesome! Stage complete! Moving to the next unit."
                ExplainLang.URDU -> "ماشاء اللہ! سبق مکمل! اگلے یونٹ پر جا رہے ہیں۔"
                ExplainLang.PASHTO -> "شاباش! لوست بشپړ شو! بل یونټ ته ځو."
            }
            speak(congrats, selectedLang)
            delay(2000)
            showOverlay = false
            if (currentStageIndex < stages.lastIndex) {
                currentStageIndex++
                selectedTab = Class4Tab.GAME
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
                            listOf(secondaryColor, accentColor)
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
                            text = "$bookTitleEn • ${stage.unitLabel} (${stage.pageRange})",
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
                                showOverlay = false
                            }
                        ) {
                            Text(
                                text = if (done) "✓ ${item.unitLabel}" else item.unitLabel,
                                color = if (active) secondaryColor else Color.White,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.ExtraBold,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                            )
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

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
                            Icon(
                                Icons.AutoMirrored.Filled.VolumeUp,
                                contentDescription = null,
                                tint = secondaryColor,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(Modifier.width(4.dp))
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> "Voice"
                                    ExplainLang.URDU -> "آواز"
                                    ExplainLang.PASHTO -> "غږ"
                                },
                                color = secondaryColor,
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
                    Class4Tab.entries.forEach { tab ->
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
                                color = if (active) secondaryColor else Color.White,
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
                    border = BorderStroke(1.5.dp, accentColor.copy(alpha = 0.4f)),
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
                            color = secondaryColor
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
                    Class4Tab.GAME -> {
                        val infiniteTransition = rememberInfiniteTransition(label = "cls4_anim")
                        val pulse by infiniteTransition.animateFloat(
                            initialValue = 0.96f,
                            targetValue = 1.05f,
                            animationSpec = infiniteRepeatable(tween(900), RepeatMode.Reverse),
                            label = "pulse"
                        )

                        Card(
                            shape = RoundedCornerShape(20.dp),
                            colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                            border = BorderStroke(2.dp, accentColor),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(82.dp)
                                        .clip(RoundedCornerShape(14.dp))
                                        .background(
                                            Brush.horizontalGradient(
                                                listOf(secondaryColor, accentColor)
                                            )
                                        ),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Canvas(modifier = Modifier.fillMaxSize()) {
                                        for (i in 0..6) {
                                            drawCircle(
                                                color = Color.White.copy(alpha = 0.14f),
                                                radius = 15f,
                                                center = Offset((size.width / 6f) * i, size.height / 2f + sin(i.toFloat()) * 10f)
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
                                        modifier = Modifier.padding(horizontal = 12.dp)
                                    )
                                }

                                Spacer(Modifier.height(14.dp))

                                if (stage.gameMode == Class4MiniGameMode.SEQUENCE_ORDER && stage.sequenceItems.isNotEmpty()) {
                                    val items = stage.sequenceItems
                                    val shuffled = remember(screenKey, stage.id) { items.shuffled() }
                                    var step by remember(screenKey, stage.id) { mutableIntStateOf(0) }

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
                                                    isTarget -> accentColor
                                                    else -> Color(0xFF1E293B)
                                                },
                                                border = BorderStroke(
                                                    2.dp,
                                                    if (isTarget) Color(0xFFFFD54F) else Color.White.copy(alpha = 0.3f)
                                                ),
                                                modifier = Modifier
                                                    .fillMaxWidth()
                                                    .scale(if (isTarget) pulse else 1f)
                                                    .clickable(enabled = !isDone) {
                                                        speak(item, selectedLang)
                                                        if (isTarget) {
                                                            val next = step + 1
                                                            step = next
                                                            if (next >= items.size) {
                                                                if (!completedStages.contains(stage.id)) {
                                                                    completedStages = completedStages + stage.id
                                                                    totalStars += 3
                                                                }
                                                                showOverlay = true
                                                            }
                                                        }
                                                    }
                                            ) {
                                                Text(
                                                    text = if (isDone) "✓  $item" else item,
                                                    color = Color.White,
                                                    fontSize = 17.sp,
                                                    fontWeight = FontWeight.ExtraBold,
                                                    textAlign = TextAlign.Center,
                                                    modifier = Modifier.padding(14.dp)
                                                )
                                            }
                                        }
                                    }
                                } else {
                                    var roundIdx by remember(screenKey, stage.id) { mutableIntStateOf(0) }
                                    val cards = stage.cards
                                    val target = cards[roundIdx.coerceAtMost(cards.lastIndex)]
                                    val options = remember(screenKey, stage.id, roundIdx) { cards.shuffled() }

                                    Surface(
                                        shape = RoundedCornerShape(16.dp),
                                        color = Color(0xFF1E293B),
                                        border = BorderStroke(1.5.dp, Color(0xFFFFD54F)),
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .clickable { speak(target.heading, selectedLang) }
                                    ) {
                                        Column(
                                            modifier = Modifier.padding(14.dp),
                                            horizontalAlignment = Alignment.CenterHorizontally
                                        ) {
                                            Text(
                                                text = "Challenge ${roundIdx + 1} / ${cards.size} • Tap to Listen 🔊",
                                                color = Color(0xFF93C5FD),
                                                fontSize = 12.sp,
                                                fontWeight = FontWeight.Bold
                                            )
                                            Spacer(Modifier.height(6.dp))
                                            Text(
                                                text = target.heading,
                                                color = Color(0xFFFFD54F),
                                                fontSize = 20.sp,
                                                fontWeight = FontWeight.ExtraBold,
                                                textAlign = TextAlign.Center
                                            )
                                        }
                                    }

                                    Spacer(Modifier.height(12.dp))

                                    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                                        options.forEach { opt ->
                                            val label = when (selectedLang) {
                                                ExplainLang.ENGLISH -> "${opt.subHeading}\n${opt.detailEn}"
                                                ExplainLang.URDU -> "${opt.subHeading}\n${opt.detailUr}"
                                                ExplainLang.PASHTO -> "${opt.subHeading}\n${opt.detailPs}"
                                            }
                                            Surface(
                                                shape = RoundedCornerShape(16.dp),
                                                color = opt.badgeColor.copy(alpha = 0.88f),
                                                border = BorderStroke(1.5.dp, Color.White.copy(alpha = 0.4f)),
                                                modifier = Modifier
                                                    .fillMaxWidth()
                                                    .clickable {
                                                        speak(opt.subHeading, selectedLang)
                                                        if (opt == target) {
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
                                                    fontSize = 14.sp,
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

                    Class4Tab.LESSON -> {
                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            stage.cards.forEach { card ->
                                Card(
                                    shape = RoundedCornerShape(18.dp),
                                    colors = CardDefaults.cardColors(containerColor = Color.White),
                                    border = BorderStroke(2.dp, card.badgeColor.copy(alpha = 0.45f)),
                                    elevation = CardDefaults.cardElevation(3.dp),
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .clickable {
                                            val msg = when (selectedLang) {
                                                ExplainLang.ENGLISH -> "${card.heading}. ${card.detailEn}"
                                                ExplainLang.URDU -> "${card.heading}۔ ${card.detailUr}"
                                                ExplainLang.PASHTO -> "${card.heading}۔ ${card.detailPs}"
                                            }
                                            speak(msg, selectedLang)
                                        }
                                ) {
                                    Column(modifier = Modifier.padding(16.dp)) {
                                        Row(
                                            modifier = Modifier.fillMaxWidth(),
                                            horizontalArrangement = Arrangement.SpaceBetween,
                                            verticalAlignment = Alignment.CenterVertically
                                        ) {
                                            Column(modifier = Modifier.weight(1f)) {
                                                Text(
                                                    text = card.heading,
                                                    fontSize = 18.sp,
                                                    fontWeight = FontWeight.ExtraBold,
                                                    color = card.badgeColor
                                                )
                                                Text(
                                                    text = card.subHeading,
                                                    fontSize = 13.sp,
                                                    fontWeight = FontWeight.Bold,
                                                    color = Color(0xFF0F172A)
                                                )
                                            }
                                            FilledTonalIconButton(
                                                onClick = {
                                                    val msg = when (selectedLang) {
                                                        ExplainLang.ENGLISH -> card.detailEn
                                                        ExplainLang.URDU -> card.detailUr
                                                        ExplainLang.PASHTO -> card.detailPs
                                                    }
                                                    speak(msg, selectedLang)
                                                }
                                            ) {
                                                Icon(Icons.Default.RecordVoiceOver, contentDescription = "Voice")
                                            }
                                        }
                                        Spacer(Modifier.height(8.dp))
                                        Text(
                                            text = when (selectedLang) {
                                                ExplainLang.ENGLISH -> card.detailEn
                                                ExplainLang.URDU -> card.detailUr
                                                ExplainLang.PASHTO -> card.detailPs
                                            },
                                            fontSize = 13.sp,
                                            color = Color(0xFF334155),
                                            lineHeight = 19.sp
                                        )
                                    }
                                }
                            }
                        }
                    }

                    Class4Tab.EXERCISE -> {
                        var qIdx by remember(screenKey, stage.id) { mutableIntStateOf(0) }
                        var chosen by remember(screenKey, stage.id, qIdx) { mutableStateOf<Int?>(null) }
                        val quiz = stage.quizzes[qIdx.coerceAtMost(stage.quizzes.lastIndex)]
                        val qText = when (selectedLang) {
                            ExplainLang.ENGLISH -> quiz.questionEn
                            ExplainLang.URDU -> quiz.questionUr
                            ExplainLang.PASHTO -> quiz.questionPs
                        }

                        Card(
                            shape = RoundedCornerShape(20.dp),
                            colors = CardDefaults.cardColors(containerColor = Color.White),
                            border = BorderStroke(2.dp, accentColor),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(18.dp)) {
                                Text(
                                    text = "Question ${qIdx + 1} / ${stage.quizzes.size}",
                                    color = accentColor,
                                    fontWeight = FontWeight.ExtraBold
                                )
                                Spacer(Modifier.height(8.dp))
                                Text(
                                    text = qText,
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF0F172A)
                                )
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
                                                        showOverlay = true
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
                        Text(
                            text = "🌟 ماشاء اللہ / شاباش 🌟",
                            fontSize = 24.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFFFFD54F)
                        )
                        Spacer(Modifier.height(8.dp))
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> "Unit Completed! Advancing to next unit..."
                                ExplainLang.URDU -> "یونٹ مکمل! اگلے یونٹ پر جا رہے ہیں..."
                                ExplainLang.PASHTO -> "یونټ بشپړ شو! بل یونټ ته ځو..."
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
