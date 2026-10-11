package com.example.spacebookapp.ui.screens

import android.media.AudioManager
import android.media.ToneGenerator
import android.speech.tts.TextToSpeech
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.SecondaryTabRow
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import java.util.Locale
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.roundToInt
import kotlin.math.sin

@OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)
@Composable
fun Class1MathsScreen(
    onBackClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var selectedTabIndex by remember { mutableIntStateOf(0) }
    val tabs = listOf("Game", "Lesson", "Exercise")

    var currentStageIndex by remember { mutableIntStateOf(0) }
    val completedStages = remember { mutableStateListOf<Int>() }
    val currentStageMeta = CLASS1_MATHS_STAGES[currentStageIndex]
    val nextStageMeta = CLASS1_MATHS_STAGES[(currentStageIndex + 1) % CLASS1_MATHS_STAGES.size]

    var explainLang by remember { mutableStateOf(ExplainLang.ENGLISH) }
    var soundEnabled by remember { mutableStateOf(true) }

    val pillListState = rememberLazyListState()
    LaunchedEffect(currentStageIndex) {
        pillListState.animateScrollToItem(currentStageIndex)
    }

    var tts by remember { mutableStateOf<TextToSpeech?>(null) }
    val toneGenerator = remember {
        try {
            ToneGenerator(AudioManager.STREAM_MUSIC, 85)
        } catch (_: Exception) {
            null
        }
    }

    DisposableEffect(context) {
        var engine: TextToSpeech? = null
        engine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                engine?.language = Locale.US
                engine?.setSpeechRate(0.88f)
                engine?.setPitch(1.1f)
            }
        }
        tts = engine
        onDispose {
            engine?.stop()
            engine?.shutdown()
            toneGenerator?.release()
        }
    }

    fun playTone(isSuccess: Boolean) {
        if (!soundEnabled) return
        try {
            if (isSuccess) {
                toneGenerator?.startTone(ToneGenerator.TONE_PROP_ACK, 180)
            } else {
                toneGenerator?.startTone(ToneGenerator.TONE_PROP_NACK, 220)
            }
        } catch (_: Exception) {}
    }

    fun speakSmart(text: TrilingualText, englishPhrase: String = "") {
        if (!soundEnabled) return
        val engine = tts ?: return
        when (explainLang) {
            ExplainLang.ENGLISH -> {
                engine.language = Locale.US
                val toSpeak = if (englishPhrase.isNotBlank()) "$englishPhrase. ${text.en}" else text.en
                engine.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null, "m_en_${System.currentTimeMillis()}")
            }
            ExplainLang.URDU -> {
                val urLocale = Locale("ur", "PK")
                val res = engine.isLanguageAvailable(urLocale)
                if (res >= TextToSpeech.LANG_AVAILABLE) {
                    engine.language = urLocale
                    engine.speak(text.ur, TextToSpeech.QUEUE_FLUSH, null, "m_ur_${System.currentTimeMillis()}")
                } else {
                    engine.language = Locale.US
                    val toSpeak = if (englishPhrase.isNotBlank()) "$englishPhrase. ${text.en}" else text.en
                    engine.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null, "m_urf_${System.currentTimeMillis()}")
                }
            }
            ExplainLang.PASHTO -> {
                val psLocale = Locale("ps", "AF")
                val urLocale = Locale("ur", "PK")
                when {
                    engine.isLanguageAvailable(psLocale) >= TextToSpeech.LANG_AVAILABLE -> {
                        engine.language = psLocale
                        engine.speak(text.ps, TextToSpeech.QUEUE_FLUSH, null, "m_ps_${System.currentTimeMillis()}")
                    }
                    engine.isLanguageAvailable(urLocale) >= TextToSpeech.LANG_AVAILABLE -> {
                        engine.language = urLocale
                        engine.speak(text.ps, TextToSpeech.QUEUE_FLUSH, null, "m_psu_${System.currentTimeMillis()}")
                    }
                    else -> {
                        engine.language = Locale.US
                        val toSpeak = if (englishPhrase.isNotBlank()) "$englishPhrase. ${text.en}" else text.en
                        engine.speak(toSpeak, TextToSpeech.QUEUE_FLUSH, null, "m_psf_${System.currentTimeMillis()}")
                    }
                }
            }
        }
    }

    fun speakEnglishWord(word: String) {
        if (!soundEnabled) return
        val engine = tts ?: return
        engine.language = Locale.US
        engine.speak(word, TextToSpeech.QUEUE_FLUSH, null, "m_word_${System.currentTimeMillis()}")
    }

    val advanceToNextStage: () -> Unit = {
        if (!completedStages.contains(currentStageMeta.stageNumber)) {
            completedStages.add(currentStageMeta.stageNumber)
        }
        currentStageIndex = (currentStageIndex + 1) % CLASS1_MATHS_STAGES.size
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFF0FDF4))
    ) {
        // ─── TOP BAR ───
        Surface(
            color = Color(0xFF065F46),
            shadowElevation = 6.dp
        ) {
            Column {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 8.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(onClick = onBackClick) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = Color.White
                        )
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "Class 1 Mathematics • KPTBB",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                        Text(
                            text = "${currentStageMeta.titleEn} (${currentStageMeta.pageRangeText})",
                            fontSize = 11.sp,
                            color = Color(0xFFA7F3D0),
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }

                    // Language Switcher Pills (English / اردو / پښتو)
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(18.dp))
                            .background(Color(0xFF047857))
                            .border(1.dp, Color(0xFF34D399), RoundedCornerShape(18.dp))
                            .padding(2.dp),
                        horizontalArrangement = Arrangement.spacedBy(2.dp)
                    ) {
                        ExplainLang.entries.forEach { lang ->
                            val isSelected = explainLang == lang
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(14.dp))
                                    .background(if (isSelected) Color(0xFFFBBF24) else Color.Transparent)
                                    .clickable {
                                        explainLang = lang
                                        speakSmart(currentStageMeta.subtitle, currentStageMeta.titleEn)
                                    }
                                    .padding(horizontal = 7.dp, vertical = 4.dp)
                            ) {
                                Text(
                                    text = lang.label,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = if (isSelected) Color(0xFF0F172A) else Color.White
                                )
                            }
                        }
                    }
                }

                // ─── STAGE SELECTOR CAROUSEL (All 13 Stages • Pages 1–139) ───
                LazyRow(
                    state = pillListState,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color(0xFF047857))
                        .padding(vertical = 6.dp),
                    contentPadding = PaddingValues(horizontal = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    itemsIndexed(CLASS1_MATHS_STAGES) { idx, stage ->
                        val isCurrent = idx == currentStageIndex
                        val isDone = completedStages.contains(stage.stageNumber)
                        Row(
                            modifier = Modifier
                                .clip(RoundedCornerShape(20.dp))
                                .background(
                                    when {
                                        isCurrent -> Color(0xFFFBBF24)
                                        isDone -> Color(0xFF10B981)
                                        else -> Color(0xFF065F46)
                                    }
                                )
                                .border(
                                    width = if (isCurrent) 2.dp else 1.dp,
                                    color = if (isCurrent) Color.White else Color(0x55FFFFFF),
                                    shape = RoundedCornerShape(20.dp)
                                )
                                .clickable { currentStageIndex = idx }
                                .padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(text = stage.mascotEmoji, fontSize = 13.sp)
                            Spacer(modifier = Modifier.width(4.dp))
                            Text(
                                text = stage.pillLabel,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = if (isCurrent) Color(0xFF0F172A) else Color.White
                            )
                            if (isDone) {
                                Spacer(modifier = Modifier.width(4.dp))
                                Text(text = "⭐", fontSize = 10.sp)
                            }
                        }
                    }
                }

                // ─── 3 TABS: GAME | LESSON | EXERCISE ───
                SecondaryTabRow(
                    selectedTabIndex = selectedTabIndex,
                    containerColor = Color(0xFF065F46),
                    contentColor = Color.White
                ) {
                    tabs.forEachIndexed { index, title ->
                        val selected = selectedTabIndex == index
                        Tab(
                            selected = selected,
                            onClick = { selectedTabIndex = index },
                            text = {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = when (index) {
                                            0 -> "🎮"
                                            1 -> "📖"
                                            else -> "✏️"
                                        },
                                        fontSize = 14.sp
                                    )
                                    Spacer(modifier = Modifier.width(5.dp))
                                    Text(
                                        text = title,
                                        fontWeight = if (selected) FontWeight.ExtraBold else FontWeight.Medium,
                                        fontSize = 14.sp,
                                        color = if (selected) Color(0xFFFBBF24) else Color(0xFFD1FAE5)
                                    )
                                }
                            }
                        )
                    }
                }
            }
        }

        // ─── TAB CONTENT ───
        Box(modifier = Modifier.fillMaxSize()) {
            when (selectedTabIndex) {
                0 -> key(currentStageMeta.stageNumber) {
                    MathsArcadeGameContainer(
                        stageMeta = currentStageMeta,
                        nextStageTitle = nextStageMeta.pillLabel,
                        explainLang = explainLang,
                        onSpeak = { trilingual, enPhrase -> speakSmart(trilingual, enPhrase) },
                        onSpeakWord = { word -> speakEnglishWord(word) },
                        onPlayTone = { ok -> playTone(ok) },
                        onStageWinAutoAdvance = advanceToNextStage
                    )
                }
                1 -> key(currentStageMeta.stageNumber) {
                    MathsLessonTabContent(
                        stageMeta = currentStageMeta,
                        explainLang = explainLang,
                        onSpeak = { trilingual, enPhrase -> speakSmart(trilingual, enPhrase) },
                        onNextStage = advanceToNextStage
                    )
                }
                2 -> key(currentStageMeta.stageNumber) {
                    MathsExerciseTabContent(
                        stageMeta = currentStageMeta,
                        explainLang = explainLang,
                        onSpeak = { trilingual, enPhrase -> speakSmart(trilingual, enPhrase) },
                        onPlayTone = { ok -> playTone(ok) },
                        onNextStage = advanceToNextStage
                    )
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 1: ANIMATED 2D MATHS ARCADE GAME CONTAINER
// ═══════════════════════════════════════════════════════════════════════════
@Composable
private fun MathsArcadeGameContainer(
    stageMeta: MathsStageMeta,
    nextStageTitle: String,
    explainLang: ExplainLang,
    onSpeak: (TrilingualText, String) -> Unit,
    onSpeakWord: (String) -> Unit,
    onPlayTone: (Boolean) -> Unit,
    onStageWinAutoAdvance: () -> Unit
) {
    var roundIndex by remember { mutableIntStateOf(0) }
    var score by remember { mutableIntStateOf(0) }
    var hearts by remember { mutableIntStateOf(3) }
    var selectedOption by remember { mutableStateOf<String?>(null) }
    var isCorrectAnswer by remember { mutableStateOf<Boolean?>(null) }
    var stageWon by remember { mutableStateOf(false) }
    val tappedToys = remember { mutableStateListOf<Int>() }

    val rounds = stageMeta.rounds
    val currentRound = rounds[roundIndex.coerceIn(0, rounds.lastIndex)]

    LaunchedEffect(roundIndex, explainLang) {
        tappedToys.clear()
        onSpeak(currentRound.voiceExplain, currentRound.promptTitle)
    }

    LaunchedEffect(selectedOption) {
        val chosen = selectedOption ?: return@LaunchedEffect
        if (chosen == currentRound.correctAnswer) {
            delay(1100)
            if (roundIndex < rounds.lastIndex) {
                roundIndex++
                selectedOption = null
                isCorrectAnswer = null
            } else {
                stageWon = true
            }
        } else {
            delay(950)
            selectedOption = null
            isCorrectAnswer = null
        }
    }

    LaunchedEffect(stageWon) {
        if (stageWon) {
            onPlayTone(true)
            onSpeak(
                TrilingualText(
                    en = "Stage Complete! Super Maths Champion! Moving to $nextStageTitle!",
                    ur = "شاباش! مرحلہ مکمل ہو گیا! اب اگلے مرحلے پر چلتے ہیں!",
                    ps = "آفرین! دا پړاو بشپړ شو! اوس بل پړاو ته ځو!"
                ),
                "Stage Complete!"
            )
            delay(2300)
            onStageWinAutoAdvance()
        }
    }

    val infiniteTransition = rememberInfiniteTransition(label = "maths_game_anim")
    val floatAnim by infiniteTransition.animateFloat(
        initialValue = -7f,
        targetValue = 7f,
        animationSpec = infiniteRepeatable(
            animation = tween(1100, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "floatAnim"
    )
    val pulseAnim by infiniteTransition.animateFloat(
        initialValue = 0.95f,
        targetValue = 1.07f,
        animationSpec = infiniteRepeatable(
            animation = tween(850, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "pulseAnim"
    )
    val wavePhase by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = (2 * PI).toFloat(),
        animationSpec = infiniteRepeatable(
            animation = tween(2600, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "wavePhase"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    listOf(Color(0xFF064E3B), Color(0xFF0F172A), Color(0xFF1E293B))
                )
            )
    ) {
        // Animated Floating Math Symbols in Background Canvas
        Canvas(modifier = Modifier.fillMaxSize()) {
            val symbols = listOf(0.15f to 0.12f, 0.85f to 0.18f, 0.25f to 0.45f, 0.78f to 0.52f, 0.5f to 0.28f)
            symbols.forEachIndexed { i, (rx, ry) ->
                val dy = sin(wavePhase + i) * 14f
                drawCircle(
                    color = Color(0x2234D399),
                    radius = 18f + (i * 4f),
                    center = Offset(size.width * rx, size.height * ry + dy)
                )
            }
        }

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // ─── GAME HUD BAR (Hearts, Progress, Score, Voice Button) ───
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color(0xFF1E293B))
                    .border(1.dp, Color(0xFF10B981), RoundedCornerShape(16.dp))
                    .padding(horizontal = 12.dp, vertical = 8.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    repeat(3) { idx ->
                        Icon(
                            imageVector = if (idx < hearts) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                            contentDescription = null,
                            tint = if (idx < hearts) Color(0xFFF43F5E) else Color(0xFF64748B),
                            modifier = Modifier.size(18.dp)
                        )
                    }
                }

                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .background(Color(0xFF065F46))
                        .padding(horizontal = 10.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = "${stageMeta.gameBadge} • Round ${roundIndex + 1}/${rounds.size}",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFFA7F3D0)
                    )
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.Star,
                        contentDescription = null,
                        tint = Color(0xFFFBBF24),
                        modifier = Modifier.size(18.dp)
                    )
                    Spacer(modifier = Modifier.width(3.dp))
                    Text(
                        text = "$score",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFFFBBF24)
                    )
                    Spacer(modifier = Modifier.width(6.dp))
                    IconButton(
                        onClick = { onSpeak(currentRound.voiceExplain, currentRound.promptTitle) },
                        modifier = Modifier
                            .size(30.dp)
                            .clip(CircleShape)
                            .background(Color(0xFF10B981))
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.VolumeUp,
                            contentDescription = "Speak",
                            tint = Color.White,
                            modifier = Modifier.size(17.dp)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            // ─── QUESTION & TRILINGUAL EXPLANATION CARD ───
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(1.5.dp, Color(0xFF34D399), RoundedCornerShape(18.dp))
                        .padding(12.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "${currentRound.promptEmoji}  ${currentRound.promptTitle}",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFFFBBF24),
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = currentRound.promptSub.get(explainLang),
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Medium,
                        color = Color(0xFFE2E8F0),
                        textAlign = TextAlign.Center
                    )
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            // ─── INTERACTIVE 2D ANIMATED MATHS STAGE ARENA ───
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .clip(RoundedCornerShape(22.dp))
                    .background(
                        Brush.verticalGradient(
                            listOf(Color(0xFF1E293B), Color(0xFF0F172A))
                        )
                    )
                    .border(2.dp, Color(0xFF38BDF8), RoundedCornerShape(22.dp))
                    .padding(12.dp),
                contentAlignment = Alignment.Center
            ) {
                when (stageMeta.mechanic) {
                    MathsMechanic.TOY_COUNTER_ARCADE -> ToyCounterArena(
                        round = currentRound,
                        tappedToys = tappedToys,
                        floatAnim = floatAnim,
                        onToyTap = { idx, countNow ->
                            if (!tappedToys.contains(idx)) tappedToys.add(idx)
                            onSpeakWord("$countNow")
                        }
                    )
                    MathsMechanic.NUMBER_LINE_HOP -> NumberLineHopArena(
                        round = currentRound,
                        floatAnim = floatAnim,
                        pulseAnim = pulseAnim
                    )
                    MathsMechanic.COMPARE_MONSTER_GATOR -> CompareGroupsArena(
                        round = currentRound,
                        floatAnim = floatAnim,
                        pulseAnim = pulseAnim
                    )
                    MathsMechanic.TENS_ONES_BUNDLE_BUILDER -> TensOnesBundleArena(
                        round = currentRound,
                        floatAnim = floatAnim,
                        onSpeakWord = onSpeakWord
                    )
                    MathsMechanic.ORDINAL_RACE_TRACK -> OrdinalRaceTrackArena(
                        round = currentRound,
                        floatAnim = floatAnim,
                        wavePhase = wavePhase
                    )
                    MathsMechanic.ADDITION_FRUIT_TREE -> AdditionFruitArena(
                        round = currentRound,
                        floatAnim = floatAnim,
                        pulseAnim = pulseAnim
                    )
                    MathsMechanic.SUBTRACTION_BALLOON_POP -> SubtractionPopArena(
                        round = currentRound,
                        floatAnim = floatAnim
                    )
                    MathsMechanic.SEESAW_MEASUREMENT_LAB -> SeesawMeasurementArena(
                        round = currentRound,
                        floatAnim = floatAnim
                    )
                    MathsMechanic.PAK_RUPEE_TOYSHOP -> PakRupeeToyshopArena(
                        round = currentRound,
                        floatAnim = floatAnim,
                        pulseAnim = pulseAnim
                    )
                    MathsMechanic.ANALOG_CLOCK_ARCADE -> AnalogClockArena(
                        round = currentRound,
                        pulseAnim = pulseAnim
                    )
                    MathsMechanic.CALENDAR_WHEEL_TRAIN -> CalendarTrainArena(
                        round = currentRound,
                        floatAnim = floatAnim
                    )
                    MathsMechanic.SHAPE_BUILDER_MONSTER -> ShapeLabArena(
                        round = currentRound,
                        pulseAnim = pulseAnim,
                        wavePhase = wavePhase
                    )
                    MathsMechanic.SPATIAL_RADAR_SCENE -> SpatialSceneArena(
                        round = currentRound,
                        floatAnim = floatAnim
                    )
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            // ─── ANIMATED ANSWER BUTTONS ───
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                currentRound.options.forEach { option ->
                    val isThisPicked = selectedOption == option
                    val bgColor = when {
                        isThisPicked && isCorrectAnswer == true -> Color(0xFF10B981)
                        isThisPicked && isCorrectAnswer == false -> Color(0xFFF43F5E)
                        else -> Color(0xFF2563EB)
                    }
                    val btnScale by animateFloatAsState(
                        targetValue = if (isThisPicked) 1.08f else 1f,
                        animationSpec = spring(),
                        label = "optScale"
                    )

                    Button(
                        onClick = {
                            if (selectedOption != null) return@Button
                            selectedOption = option
                            val right = option == currentRound.correctAnswer
                            isCorrectAnswer = right
                            onPlayTone(right)
                            if (right) {
                                score += 20
                                onSpeak(
                                    TrilingualText(
                                        en = "Awesome! $option is correct!",
                                        ur = "شاباش! بالکل درست جواب!",
                                        ps = "آفرین! بالکل سمه ځواب!"
                                    ),
                                    option
                                )
                            } else {
                                if (hearts > 1) hearts--
                                onSpeak(
                                    TrilingualText(
                                        en = "Try again! Count carefully!",
                                        ur = "دوبارہ کوشش کریں! دھیان سے گنیں!",
                                        ps = "بیا هڅه وکړئ! په غور سره وشمېرئ!"
                                    ),
                                    "Try again"
                                )
                            }
                        },
                        modifier = Modifier
                            .weight(1f)
                            .height(60.dp)
                            .scale(btnScale),
                        shape = RoundedCornerShape(18.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = bgColor),
                        elevation = ButtonDefaults.buttonElevation(defaultElevation = 6.dp)
                    ) {
                        Text(
                            text = option,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White,
                            textAlign = TextAlign.Center
                        )
                    }
                }
            }
        }

        // ─── CONFETTI CELEBRATION OVERLAY ON STAGE COMPLETE ───
        if (stageWon) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xDD0F172A)),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    modifier = Modifier
                        .padding(24.dp)
                        .clip(RoundedCornerShape(28.dp))
                        .background(Color(0xFF065F46))
                        .border(3.dp, Color(0xFFFBBF24), RoundedCornerShape(28.dp))
                        .padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = "🏆 🎉 ⭐", fontSize = 46.sp)
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = "Maths Stage Complete!",
                        fontSize = 24.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFFFBBF24)
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Score: $score pts • Auto-opening $nextStageTitle...",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        textAlign = TextAlign.Center
                    )
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 13 CUSTOM 2D ANIMATED MATHS STAGE ARENAS
// ═══════════════════════════════════════════════════════════════════════════

@Composable
private fun ToyCounterArena(
    round: MathsRoundItem,
    tappedToys: List<Int>,
    floatAnim: Float,
    onToyTap: (Int, Int) -> Unit
) {
    val count = round.visualCountA.coerceIn(1, 9)
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier.fillMaxSize()
    ) {
        Text(
            text = "Tap each ${round.visualEmojiA} to count! (Counted: ${tappedToys.size} / $count)",
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF38BDF8)
        )
        Spacer(modifier = Modifier.height(12.dp))

        // Arrange toys in 1 or 2 rows
        val perRow = if (count <= 5) count else (count + 1) / 2
        Column(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            val indices = (0 until count).toList().chunked(perRow)
            indices.forEach { rowIndices ->
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    rowIndices.forEach { idx ->
                        val isTapped = tappedToys.contains(idx)
                        val orderNum = tappedToys.indexOf(idx) + 1
                        Box(
                            modifier = Modifier
                                .offset { IntOffset(0, (floatAnim * (if (idx % 2 == 0) 1 else -1)).roundToInt()) }
                                .size(66.dp)
                                .clip(RoundedCornerShape(18.dp))
                                .background(if (isTapped) Color(0xFF10B981) else Color(0xFF334155))
                                .border(
                                    width = 2.dp,
                                    color = if (isTapped) Color(0xFFFBBF24) else Color(0xFF64748B),
                                    shape = RoundedCornerShape(18.dp)
                                )
                                .clickable { onToyTap(idx, if (isTapped) orderNum else tappedToys.size + 1) },
                            contentAlignment = Alignment.Center
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text(text = round.visualEmojiA, fontSize = 30.sp)
                                Text(
                                    text = if (isTapped) "#$orderNum" else "${idx + 1}",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color.White
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
private fun NumberLineHopArena(
    round: MathsRoundItem,
    floatAnim: Float,
    pulseAnim: Float
) {
    val activeNum = round.visualCountA.coerceIn(0, 9)
    val targetNum = round.visualCountB.coerceIn(0, 9)
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier.fillMaxSize()
    ) {
        Text(
            text = "🐸 Frog Number Line (0 to 9)",
            fontSize = 14.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFFA7F3D0)
        )
        Spacer(modifier = Modifier.height(18.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            (0..9).forEach { n ->
                val isStart = n == activeNum
                val isTarget = n == targetNum && round.visualTag != "HOP:0"
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    if (isStart) {
                        Text(
                            text = "🐸",
                            fontSize = 24.sp,
                            modifier = Modifier.offset { IntOffset(0, floatAnim.roundToInt()) }
                        )
                    } else if (isTarget) {
                        Text(
                            text = "⭐",
                            fontSize = 20.sp,
                            modifier = Modifier.scale(pulseAnim)
                        )
                    } else {
                        Spacer(modifier = Modifier.height(26.dp))
                    }
                    Box(
                        modifier = Modifier
                            .size(30.dp)
                            .clip(CircleShape)
                            .background(
                                when {
                                    isStart -> Color(0xFF10B981)
                                    isTarget -> Color(0xFFFBBF24)
                                    else -> Color(0xFF334155)
                                }
                            )
                            .border(1.5.dp, Color.White, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = if (isTarget) "?" else "$n",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = if (isTarget) Color(0xFF0F172A) else Color.White
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun CompareGroupsArena(
    round: MathsRoundItem,
    floatAnim: Float,
    pulseAnim: Float
) {
    Row(
        modifier = Modifier.fillMaxSize(),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Group A Plate
        Column(
            modifier = Modifier
                .weight(1f)
                .clip(RoundedCornerShape(18.dp))
                .background(Color(0xFF1E3A8A))
                .border(2.dp, Color(0xFF60A5FA), RoundedCornerShape(18.dp))
                .padding(10.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Group A (${round.visualCountA})",
                fontSize = 13.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFF93C5FD)
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = round.visualEmojiA.repeat(round.visualCountA.coerceAtMost(10)),
                fontSize = 22.sp,
                textAlign = TextAlign.Center
            )
        }

        // Center Comparator Badge
        Box(
            modifier = Modifier
                .padding(horizontal = 8.dp)
                .size(54.dp)
                .scale(pulseAnim)
                .clip(CircleShape)
                .background(Color(0xFFFBBF24)),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "🐊 ?",
                fontSize = 18.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFF0F172A)
            )
        }

        // Group B Plate
        Column(
            modifier = Modifier
                .weight(1f)
                .clip(RoundedCornerShape(18.dp))
                .background(Color(0xFF065F46))
                .border(2.dp, Color(0xFF34D399), RoundedCornerShape(18.dp))
                .padding(10.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Group B (${round.visualCountB})",
                fontSize = 13.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFFA7F3D0)
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = if (round.visualCountB == 0) "Empty (0)" else round.visualEmojiB.repeat(round.visualCountB.coerceAtMost(10)),
                fontSize = 22.sp,
                textAlign = TextAlign.Center,
                color = Color.White
            )
        }
    }
}

@Composable
private fun TensOnesBundleArena(
    round: MathsRoundItem,
    floatAnim: Float,
    onSpeakWord: (String) -> Unit
) {
    val tens = round.visualCountA
    val ones = round.visualCountB
    Row(
        modifier = Modifier.fillMaxSize(),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Tens Column
        Column(
            modifier = Modifier
                .weight(1f)
                .clip(RoundedCornerShape(18.dp))
                .background(Color(0xFF312E81))
                .border(2.dp, Color(0xFF818CF8), RoundedCornerShape(18.dp))
                .clickable { onSpeakWord("$tens Tens equal ${tens * 10}") }
                .padding(10.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "TENS (Bundles of 10)",
                fontSize = 12.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFFC7D2FE)
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = "📦🔟 ".repeat(tens.coerceAtMost(9)),
                fontSize = 18.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.offset { IntOffset(0, (floatAnim * 0.5f).roundToInt()) }
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "$tens Tens = ${tens * 10}",
                fontSize = 15.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFFFBBF24)
            )
        }

        Spacer(modifier = Modifier.width(10.dp))

        // Ones Column
        Column(
            modifier = Modifier
                .weight(1f)
                .clip(RoundedCornerShape(18.dp))
                .background(Color(0xFF065F46))
                .border(2.dp, Color(0xFF34D399), RoundedCornerShape(18.dp))
                .clickable { onSpeakWord("$ones Ones") }
                .padding(10.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "ONES (Single Sticks)",
                fontSize = 12.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFFA7F3D0)
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = if (ones == 0) "0 Ones" else "✏️".repeat(ones.coerceAtMost(9)),
                fontSize = 20.sp,
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "+ $ones Ones",
                fontSize = 15.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFFFBBF24)
            )
        }
    }
}

@Composable
private fun OrdinalRaceTrackArena(
    round: MathsRoundItem,
    floatAnim: Float,
    wavePhase: Float
) {
    val highlightPos = round.visualCountA.coerceIn(1, 10)
    val ordinals = listOf("1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th")
    val cars = listOf("🏎️", "🚓", "🚕", "🚙", "🚌", "🚎", "🚑", "🚒", "🚐", "🛻")

    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "🏁 Ordinal Number Race Track (1st to 10th) 🏁",
            fontSize = 13.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFFFBBF24)
        )
        Spacer(modifier = Modifier.height(10.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            (0 until 5).forEach { idx ->
                val isPicked = (idx + 1) == highlightPos
                Column(
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .background(if (isPicked) Color(0xFF10B981) else Color(0xFF334155))
                        .border(1.5.dp, if (isPicked) Color(0xFFFBBF24) else Color.Transparent, RoundedCornerShape(12.dp))
                        .padding(horizontal = 8.dp, vertical = 6.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = cars[idx],
                        fontSize = 24.sp,
                        modifier = Modifier.offset { IntOffset((sin(wavePhase + idx) * 4f).roundToInt(), 0) }
                    )
                    Text(
                        text = ordinals[idx],
                        fontSize = 12.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                }
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            (5 until 10).forEach { idx ->
                val isPicked = (idx + 1) == highlightPos
                Column(
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .background(if (isPicked) Color(0xFF10B981) else Color(0xFF334155))
                        .border(1.5.dp, if (isPicked) Color(0xFFFBBF24) else Color.Transparent, RoundedCornerShape(12.dp))
                        .padding(horizontal = 8.dp, vertical = 6.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(text = cars[idx], fontSize = 22.sp)
                    Text(
                        text = ordinals[idx],
                        fontSize = 12.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                }
            }
        }
    }
}

@Composable
private fun AdditionFruitArena(
    round: MathsRoundItem,
    floatAnim: Float,
    pulseAnim: Float
) {
    Row(
        modifier = Modifier.fillMaxSize(),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Left Basket
        Column(
            modifier = Modifier
                .weight(1f)
                .clip(RoundedCornerShape(16.dp))
                .background(Color(0xFF1E3A8A))
                .padding(10.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = round.visualEmojiA.repeat(round.visualCountA.coerceAtLeast(1)),
                fontSize = 26.sp,
                textAlign = TextAlign.Center,
                modifier = Modifier.offset { IntOffset(0, floatAnim.roundToInt()) }
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "${round.visualCountA}",
                fontSize = 20.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFFFBBF24)
            )
        }

        // Glowing Plus Sign
        Box(
            modifier = Modifier
                .padding(horizontal = 6.dp)
                .size(42.dp)
                .scale(pulseAnim)
                .clip(CircleShape)
                .background(Color(0xFF10B981)),
            contentAlignment = Alignment.Center
        ) {
            Text(text = "+", fontSize = 24.sp, fontWeight = FontWeight.ExtraBold, color = Color.White)
        }

        // Right Basket
        Column(
            modifier = Modifier
                .weight(1f)
                .clip(RoundedCornerShape(16.dp))
                .background(Color(0xFF065F46))
                .padding(10.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = if (round.visualCountB == 0) "∅ (Zero)" else round.visualEmojiB.repeat(round.visualCountB),
                fontSize = 24.sp,
                textAlign = TextAlign.Center,
                color = Color.White,
                modifier = Modifier.offset { IntOffset(0, (-floatAnim).roundToInt()) }
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "${round.visualCountB}",
                fontSize = 20.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFFFBBF24)
            )
        }
    }
}

@Composable
private fun SubtractionPopArena(
    round: MathsRoundItem,
    floatAnim: Float
) {
    val total = round.visualCountA.coerceIn(1, 9)
    val crossed = round.visualCountB.coerceIn(0, total)
    val remain = total - crossed

    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Total: $total   |   Crossed Out (✕): $crossed   |   Left: ?",
            fontSize = 13.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFFA7F3D0)
        )
        Spacer(modifier = Modifier.height(14.dp))
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            (0 until total).forEach { idx ->
                val isCrossed = idx >= remain
                Box(
                    modifier = Modifier
                        .offset { IntOffset(0, if (isCrossed) 0 else floatAnim.roundToInt()) }
                        .size(48.dp)
                        .clip(RoundedCornerShape(14.dp))
                        .background(if (isCrossed) Color(0xFF450A0A) else Color(0xFF065F46))
                        .border(2.dp, if (isCrossed) Color(0xFFF43F5E) else Color(0xFF34D399), RoundedCornerShape(14.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text(text = round.visualEmojiA, fontSize = 24.sp)
                    if (isCrossed) {
                        Text(
                            text = "✕",
                            fontSize = 28.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFFF43F5E)
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun SeesawMeasurementArena(
    round: MathsRoundItem,
    floatAnim: Float
) {
    val tag = round.visualTag
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        if (tag.startsWith("SEESAW")) {
            val tiltAngle = if (tag.endsWith("LEFT_HEAVY")) -14f else 14f
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(150.dp),
                contentAlignment = Alignment.Center
            ) {
                Canvas(modifier = Modifier.fillMaxSize()) {
                    val cx = size.width / 2f
                    val cy = size.height * 0.65f
                    // Pivot Triangle
                    val pivotPath = Path().apply {
                        moveTo(cx, cy)
                        lineTo(cx - 32f, cy + 45f)
                        lineTo(cx + 32f, cy + 45f)
                        close()
                    }
                    drawPath(pivotPath, color = Color(0xFFF59E0B))
                    // Tilting Plank
                    rotate(degrees = tiltAngle, pivot = Offset(cx, cy)) {
                        drawRoundRect(
                            color = Color(0xFF38BDF8),
                            topLeft = Offset(cx - 210f, cy - 10f),
                            size = Size(420f, 18f),
                            cornerRadius = CornerRadius(9f, 9f)
                        )
                    }
                }
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 36.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.offset(y = if (tiltAngle < 0) 20.dp else (-20).dp)
                    ) {
                        Text(text = round.visualEmojiA, fontSize = 44.sp)
                        Text(
                            text = if (tiltAngle < 0) "DOWN (Heavy)" else "UP (Light)",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFFFBBF24)
                        )
                    }
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.offset(y = if (tiltAngle > 0) 20.dp else (-20).dp)
                    ) {
                        Text(text = round.visualEmojiB, fontSize = 44.sp)
                        Text(
                            text = if (tiltAngle > 0) "DOWN (Heavy)" else "UP (Light)",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFFA7F3D0)
                        )
                    }
                }
            }
        } else {
            // Height / Length Ruler Comparison
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly,
                verticalAlignment = Alignment.Bottom
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(text = round.visualEmojiA, fontSize = 52.sp)
                    Box(
                        modifier = Modifier
                            .width(90.dp)
                            .height(64.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color(0xFF10B981)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("TALL / LONG", fontSize = 11.sp, fontWeight = FontWeight.ExtraBold, color = Color.White)
                    }
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(text = round.visualEmojiB, fontSize = 32.sp)
                    Box(
                        modifier = Modifier
                            .width(90.dp)
                            .height(28.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(Color(0xFF3B82F6)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("SHORT", fontSize = 11.sp, fontWeight = FontWeight.ExtraBold, color = Color.White)
                    }
                }
            }
        }
    }
}

@Composable
private fun PakRupeeToyshopArena(
    round: MathsRoundItem,
    floatAnim: Float,
    pulseAnim: Float
) {
    val valA = round.visualCountA
    val valB = round.visualCountB
    val isCoins = round.visualTag.contains("COIN")

    Row(
        modifier = Modifier.fillMaxSize(),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // First Coin or Note
        PakCurrencyBadge(amount = valA, isCoin = isCoins, floatOffset = floatAnim)
        Text(
            text = "+",
            fontSize = 28.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFFFBBF24),
            modifier = Modifier.scale(pulseAnim)
        )
        // Second Coin or Note
        PakCurrencyBadge(amount = valB, isCoin = isCoins, floatOffset = -floatAnim)
        Text(
            text = "= Rs ?",
            fontSize = 22.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFFA7F3D0)
        )
    }
}

@Composable
private fun PakCurrencyBadge(amount: Int, isCoin: Boolean, floatOffset: Float) {
    if (isCoin) {
        Box(
            modifier = Modifier
                .offset { IntOffset(0, floatOffset.roundToInt()) }
                .size(84.dp)
                .clip(CircleShape)
                .background(
                    Brush.radialGradient(
                        listOf(Color(0xFFFDE047), Color(0xFFD97706))
                    )
                )
                .border(3.dp, Color(0xFFFEF08A), CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("🇵🇰 COIN", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = Color(0xFF451A03))
                Text("Rs $amount", fontSize = 18.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFF451A03))
            }
        }
    } else {
        val noteColor = when (amount) {
            10 -> Color(0xFF16A34A)
            20 -> Color(0xFFD97706)
            50 -> Color(0xFF7C3AED)
            else -> Color(0xFFDC2626)
        }
        Box(
            modifier = Modifier
                .offset { IntOffset(0, floatOffset.roundToInt()) }
                .width(108.dp)
                .height(64.dp)
                .clip(RoundedCornerShape(10.dp))
                .background(noteColor)
                .border(2.5.dp, Color(0xFFFEF08A), RoundedCornerShape(10.dp)),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("🇵🇰 STATE BANK", fontSize = 9.sp, fontWeight = FontWeight.Bold, color = Color.White)
                Text("Rs $amount", fontSize = 20.sp, fontWeight = FontWeight.ExtraBold, color = Color.White)
            }
        }
    }
}

@Composable
private fun AnalogClockArena(
    round: MathsRoundItem,
    pulseAnim: Float
) {
    val hour = round.visualCountA.coerceIn(1, 12)
    val digitalStr = "${hour.toString().padStart(2, '0')}:00"

    Row(
        modifier = Modifier.fillMaxSize(),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // 2D Drawn Analog Clock with Hour & Minute Hands
        Box(
            modifier = Modifier.size(152.dp),
            contentAlignment = Alignment.Center
        ) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                val radius = size.minDimension / 2f - 8f
                val center = Offset(size.width / 2f, size.height / 2f)

                // Outer rim & clock face
                drawCircle(color = Color(0xFFFBBF24), radius = radius + 6f, center = center)
                drawCircle(color = Color(0xFFFFFBEB), radius = radius, center = center)

                // 12 Hour tick marks
                for (m in 1..12) {
                    val angleRad = ((m * 30) - 90) * (PI / 180.0)
                    val innerR = radius * 0.78f
                    val outerR = radius * 0.92f
                    drawLine(
                        color = if (m == hour || m == 12) Color(0xFFDC2626) else Color(0xFF1E293B),
                        start = Offset(
                            center.x + (innerR * cos(angleRad)).toFloat(),
                            center.y + (innerR * sin(angleRad)).toFloat()
                        ),
                        end = Offset(
                            center.x + (outerR * cos(angleRad)).toFloat(),
                            center.y + (outerR * sin(angleRad)).toFloat()
                        ),
                        strokeWidth = if (m % 3 == 0) 5f else 3f,
                        cap = StrokeCap.Round
                    )
                }

                // Long Blue Minute Hand pointing straight up to 12
                drawLine(
                    color = Color(0xFF2563EB),
                    start = center,
                    end = Offset(center.x, center.y - radius * 0.72f),
                    strokeWidth = 7f,
                    cap = StrokeCap.Round
                )

                // Short Red Hour Hand pointing to `hour`
                val hourAngleRad = ((hour * 30) - 90) * (PI / 180.0)
                drawLine(
                    color = Color(0xFFDC2626),
                    start = center,
                    end = Offset(
                        center.x + (radius * 0.50f * cos(hourAngleRad)).toFloat(),
                        center.y + (radius * 0.50f * sin(hourAngleRad)).toFloat()
                    ),
                    strokeWidth = 10f,
                    cap = StrokeCap.Round
                )

                // Center pin
                drawCircle(color = Color(0xFF0F172A), radius = 7f, center = center)
            }
        }

        // Legend & Digital Display Preview
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(
                modifier = Modifier
                    .scale(pulseAnim)
                    .clip(RoundedCornerShape(14.dp))
                    .background(Color(0xFF0F172A))
                    .border(2.dp, Color(0xFF10B981), RoundedCornerShape(14.dp))
                    .padding(horizontal = 16.dp, vertical = 10.dp)
            ) {
                Text(
                    text = "🕒 ?:00",
                    fontSize = 22.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color(0xFF34D399)
                )
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text("🔴 Short Hand = Hour ($hour)", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFFFCA5A5))
            Text("🔵 Long Hand = Minute (12)", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color(0xFF93C5FD))
        }
    }
}

@Composable
private fun CalendarTrainArena(
    round: MathsRoundItem,
    floatAnim: Float
) {
    val days = listOf("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "🚂 7 Days of the Week & 12 Solar / Islamic Months",
            fontSize = 13.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFFFBBF24)
        )
        Spacer(modifier = Modifier.height(12.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            days.forEachIndexed { idx, d ->
                val isFri = idx == 4
                Box(
                    modifier = Modifier
                        .offset { IntOffset(0, (floatAnim * (if (idx % 2 == 0) 0.6f else -0.6f)).roundToInt()) }
                        .clip(RoundedCornerShape(10.dp))
                        .background(if (isFri) Color(0xFF10B981) else Color(0xFF1E3A8A))
                        .border(1.5.dp, Color.White, RoundedCornerShape(10.dp))
                        .padding(horizontal = 7.dp, vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("${idx + 1}", fontSize = 10.sp, color = Color(0xFFFBBF24), fontWeight = FontWeight.Bold)
                        Text(d, fontSize = 12.sp, color = Color.White, fontWeight = FontWeight.ExtraBold)
                    }
                }
            }
        }
    }
}

@Composable
private fun ShapeLabArena(
    round: MathsRoundItem,
    pulseAnim: Float,
    wavePhase: Float
) {
    val tag = round.visualTag
    Row(
        modifier = Modifier.fillMaxSize(),
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (tag == "SHAPE:PATTERN") {
            Row(
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                listOf("🟡", "🔺", "🟡", "🔺", "❓").forEach { item ->
                    Box(
                        modifier = Modifier
                            .size(54.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(Color(0xFF334155))
                            .border(2.dp, Color(0xFFFBBF24), RoundedCornerShape(14.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(text = item, fontSize = 26.sp)
                    }
                }
            }
        } else {
            // Custom 2D Canvas Drawing of Circle, Triangle, Square, or Rectangle with glowing corner dots
            Box(
                modifier = Modifier
                    .size(140.dp)
                    .scale(pulseAnim),
                contentAlignment = Alignment.Center
            ) {
                Canvas(modifier = Modifier.fillMaxSize()) {
                    val w = size.width
                    val h = size.height
                    when (tag) {
                        "SHAPE:CIRCLE" -> {
                            drawCircle(
                                color = Color(0xFFFBBF24),
                                radius = w * 0.38f,
                                style = Stroke(width = 12f)
                            )
                        }
                        "SHAPE:TRIANGLE" -> {
                            val p1 = Offset(w * 0.5f, h * 0.15f)
                            val p2 = Offset(w * 0.15f, h * 0.82f)
                            val p3 = Offset(w * 0.85f, h * 0.82f)
                            val path = Path().apply {
                                moveTo(p1.x, p1.y)
                                lineTo(p2.x, p2.y)
                                lineTo(p3.x, p3.y)
                                close()
                            }
                            drawPath(path, color = Color(0xFFF43F5E), style = Stroke(width = 12f, join = StrokeJoin.Round))
                            listOf(p1, p2, p3).forEach { pt ->
                                drawCircle(color = Color(0xFFFBBF24), radius = 10f, center = pt)
                            }
                        }
                        "SHAPE:SQUARE" -> {
                            val topL = Offset(w * 0.2f, h * 0.2f)
                            val side = w * 0.6f
                            drawRect(
                                color = Color(0xFF38BDF8),
                                topLeft = topL,
                                size = Size(side, side),
                                style = Stroke(width = 12f)
                            )
                            listOf(
                                topL,
                                Offset(topL.x + side, topL.y),
                                Offset(topL.x, topL.y + side),
                                Offset(topL.x + side, topL.y + side)
                            ).forEach { pt ->
                                drawCircle(color = Color(0xFFFBBF24), radius = 10f, center = pt)
                            }
                        }
                        else -> { // RECTANGLE
                            val topL = Offset(w * 0.1f, h * 0.28f)
                            val rw = w * 0.8f
                            val rh = h * 0.44f
                            drawRect(
                                color = Color(0xFF10B981),
                                topLeft = topL,
                                size = Size(rw, rh),
                                style = Stroke(width = 12f)
                            )
                            listOf(
                                topL,
                                Offset(topL.x + rw, topL.y),
                                Offset(topL.x, topL.y + rh),
                                Offset(topL.x + rw, topL.y + rh)
                            ).forEach { pt ->
                                drawCircle(color = Color(0xFFFBBF24), radius = 10f, center = pt)
                            }
                        }
                    }
                }
            }

            Column(horizontalAlignment = Alignment.Start) {
                Text(
                    text = "Sides: ${round.visualCountA}",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color(0xFFFBBF24)
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "Corners (🟡): ${round.visualCountA}",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFFA7F3D0)
                )
            }
        }
    }
}

@Composable
private fun SpatialSceneArena(
    round: MathsRoundItem,
    floatAnim: Float
) {
    val tag = round.visualTag
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        when (tag) {
            "POS:ABOVE" -> {
                Text(
                    text = "✈️  ← Airplane (HIGH UP)",
                    fontSize = 26.sp,
                    color = Color(0xFFFBBF24),
                    fontWeight = FontWeight.ExtraBold,
                    modifier = Modifier.offset { IntOffset(floatAnim.roundToInt(), 0) }
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(text = "☁️   ☁️   ☁️   ☁️", fontSize = 28.sp)
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "🐦  🐦  ← Birds (LOWER)",
                    fontSize = 20.sp,
                    color = Color(0xFFA7F3D0),
                    fontWeight = FontWeight.Bold
                )
            }
            "POS:INSIDE" -> {
                Box(
                    modifier = Modifier
                        .size(110.dp)
                        .clip(CircleShape)
                        .background(Color(0xFF0284C7))
                        .border(4.dp, Color(0xFFBAE6FD), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "🐠",
                        fontSize = 44.sp,
                        modifier = Modifier.offset { IntOffset(floatAnim.roundToInt(), 0) }
                    )
                }
                Spacer(modifier = Modifier.height(6.dp))
                Text("Goldfish in the Water Bowl", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color.White)
            }
            "POS:UNDER" -> {
                Box(
                    modifier = Modifier
                        .width(180.dp)
                        .height(18.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(Color(0xFFD97706)),
                    contentAlignment = Alignment.Center
                ) {
                    Text("WOODEN TABLE TOP", fontSize = 10.sp, fontWeight = FontWeight.ExtraBold, color = Color.White)
                }
                Spacer(modifier = Modifier.height(10.dp))
                Text(
                    text = "🐱",
                    fontSize = 44.sp,
                    modifier = Modifier.offset { IntOffset(0, (floatAnim * 0.5f).roundToInt()) }
                )
            }
            else -> {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceEvenly,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("🏠 🪴", fontSize = 42.sp)
                        Text("Pot right next to House", fontSize = 12.sp, color = Color(0xFFFBBF24), fontWeight = FontWeight.Bold)
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("🏔️", fontSize = 24.sp)
                        Text("Distant Mountains", fontSize = 11.sp, color = Color(0xFF94A3B8))
                    }
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 2: TRILINGUAL INTERACTIVE MATHS LESSON TAB
// ═══════════════════════════════════════════════════════════════════════════
@Composable
private fun MathsLessonTabContent(
    stageMeta: MathsStageMeta,
    explainLang: ExplainLang,
    onSpeak: (TrilingualText, String) -> Unit,
    onNextStage: () -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF0FDF4)),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF065F46))
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = stageMeta.mascotEmoji, fontSize = 38.sp)
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = stageMeta.titleEn,
                            fontSize = 17.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFFFBBF24)
                        )
                        Text(
                            text = stageMeta.subtitle.get(explainLang),
                            fontSize = 13.sp,
                            color = Color.White
                        )
                    }
                    IconButton(
                        onClick = { onSpeak(stageMeta.subtitle, stageMeta.titleEn) },
                        modifier = Modifier
                            .clip(CircleShape)
                            .background(Color(0xFF10B981))
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.VolumeUp,
                            contentDescription = "Speak",
                            tint = Color.White
                        )
                    }
                }
            }
        }

        itemsIndexed(stageMeta.lessons) { _, lesson ->
            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 3.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onSpeak(lesson.explain, lesson.titleEn) }
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(54.dp)
                            .clip(RoundedCornerShape(14.dp))
                            .background(Color(0xFFD1FAE5)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(text = lesson.emoji, fontSize = 28.sp)
                    }
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = lesson.titleEn,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF065F46)
                        )
                        Text(
                            text = lesson.subtitleEn,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF059669)
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = lesson.explain.get(explainLang),
                            fontSize = 13.sp,
                            color = Color(0xFF1E293B)
                        )
                    }
                    IconButton(
                        onClick = { onSpeak(lesson.explain, lesson.titleEn) }
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.VolumeUp,
                            contentDescription = "Listen",
                            tint = Color(0xFF059669)
                        )
                    }
                }
            }
        }

        item {
            Button(
                onClick = onNextStage,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(54.dp),
                shape = RoundedCornerShape(16.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669))
            ) {
                Text(
                    text = "Next Maths Unit / Stage →",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color.White
                )
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// TAB 3: TRILINGUAL INTERACTIVE MATHS EXERCISE TAB
// ═══════════════════════════════════════════════════════════════════════════
@Composable
private fun MathsExerciseTabContent(
    stageMeta: MathsStageMeta,
    explainLang: ExplainLang,
    onSpeak: (TrilingualText, String) -> Unit,
    onPlayTone: (Boolean) -> Unit,
    onNextStage: () -> Unit
) {
    val selectedAnswers = remember { mutableStateMapOf<Int, String>() }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF0FDF4)),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        itemsIndexed(stageMeta.exercises) { idx, quiz ->
            val picked = selectedAnswers[idx]
            val isRight = picked == quiz.correctAnswer

            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 3.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(text = quiz.emoji, fontSize = 28.sp)
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            text = quiz.question.get(explainLang),
                            fontSize = 15.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF0F172A),
                            modifier = Modifier.weight(1f)
                        )
                        IconButton(onClick = { onSpeak(quiz.question, "") }) {
                            Icon(
                                imageVector = Icons.AutoMirrored.Filled.VolumeUp,
                                contentDescription = "Speak Question",
                                tint = Color(0xFF059669)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(10.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        quiz.options.forEach { opt ->
                            val isChosen = picked == opt
                            val btnColor = when {
                                isChosen && opt == quiz.correctAnswer -> Color(0xFF10B981)
                                isChosen && opt != quiz.correctAnswer -> Color(0xFFF43F5E)
                                else -> Color(0xFF065F46)
                            }
                            Button(
                                onClick = {
                                    selectedAnswers[idx] = opt
                                    val ok = opt == quiz.correctAnswer
                                    onPlayTone(ok)
                                    if (ok) {
                                        onSpeak(quiz.explain, opt)
                                    }
                                },
                                modifier = Modifier.weight(1f),
                                shape = RoundedCornerShape(12.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = btnColor)
                            ) {
                                Text(
                                    text = opt,
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                            }
                        }
                    }

                    if (picked != null) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = if (isRight) "✅ ${quiz.explain.get(explainLang)}" else "❌ Try again!",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            color = if (isRight) Color(0xFF059669) else Color(0xFFE11D48)
                        )
                    }
                }
            }
        }

        item {
            Button(
                onClick = onNextStage,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(54.dp),
                shape = RoundedCornerShape(16.dp),
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF059669))
            ) {
                Icon(imageVector = Icons.Default.EmojiEvents, contentDescription = null, tint = Color(0xFFFBBF24))
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Complete & Go to Next Stage →",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color.White
                )
            }
        }
    }
}
