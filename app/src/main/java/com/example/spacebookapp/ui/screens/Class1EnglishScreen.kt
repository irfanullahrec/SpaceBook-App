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
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.gestures.detectTapGestures
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
import androidx.compose.material.icons.filled.Refresh
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
import androidx.compose.runtime.mutableFloatStateOf
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
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
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
import kotlin.math.hypot
import kotlin.math.roundToInt
import kotlin.math.sin

@OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)
@Composable
fun Class1EnglishScreen(
    onBackClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var selectedTabIndex by remember { mutableIntStateOf(0) }
    val tabs = listOf("Game", "Lesson", "Exercise")

    var currentPageIndex by remember { mutableIntStateOf(0) }
    val completedPages = remember { mutableStateListOf<Int>() }
    val currentPageMeta = CLASS1_PAGES[currentPageIndex]
    val nextPageMeta = CLASS1_PAGES[(currentPageIndex + 1) % CLASS1_PAGES.size]

    var explainLang by remember { mutableStateOf(ExplainLang.ENGLISH) }
    var soundEnabled by remember { mutableStateOf(true) }

    val pillListState = rememberLazyListState()
    LaunchedEffect(currentPageIndex) {
        pillListState.animateScrollToItem(currentPageIndex)
    }

    // Arcade Sound Effects + TextToSpeech
    val toneGen = remember {
        runCatching { ToneGenerator(AudioManager.STREAM_MUSIC, 80) }.getOrNull()
    }
    var tts by remember { mutableStateOf<TextToSpeech?>(null) }

    DisposableEffect(context) {
        var instance: TextToSpeech? = null
        instance = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                instance?.language = Locale.US
                instance?.setSpeechRate(0.86f)
                instance?.setPitch(1.12f)
            }
        }
        tts = instance
        onDispose {
            instance?.stop()
            instance?.shutdown()
            runCatching { toneGen?.release() }
        }
    }

    fun playDing(isSuccess: Boolean) {
        if (!soundEnabled) return
        runCatching {
            if (isSuccess) {
                toneGen?.startTone(ToneGenerator.TONE_PROP_ACK, 140)
            } else {
                toneGen?.startTone(ToneGenerator.TONE_PROP_NACK, 180)
            }
        }
    }

    fun speakExplanation(englishWordOrTitle: String, trilingual: TrilingualText) {
        if (!soundEnabled) return
        val engine = tts ?: return
        when (explainLang) {
            ExplainLang.ENGLISH -> {
                engine.language = Locale.US
                engine.speak("$englishWordOrTitle. ${trilingual.en}", TextToSpeech.QUEUE_FLUSH, null, "tts_en")
            }
            ExplainLang.URDU -> {
                val urLocale = Locale.forLanguageTag("ur-PK")
                val res = engine.setLanguage(urLocale)
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    engine.language = Locale.US
                    engine.speak("$englishWordOrTitle. ${trilingual.en}", TextToSpeech.QUEUE_FLUSH, null, "tts_ur_fb")
                } else {
                    engine.speak("$englishWordOrTitle. ${trilingual.ur}", TextToSpeech.QUEUE_FLUSH, null, "tts_ur")
                }
            }
            ExplainLang.PASHTO -> {
                val psLocale = Locale.forLanguageTag("ps-AF")
                val res = engine.setLanguage(psLocale)
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    val urLocale = Locale.forLanguageTag("ur-PK")
                    val urRes = engine.setLanguage(urLocale)
                    if (urRes != TextToSpeech.LANG_MISSING_DATA && urRes != TextToSpeech.LANG_NOT_SUPPORTED) {
                        engine.speak("$englishWordOrTitle. ${trilingual.ps}", TextToSpeech.QUEUE_FLUSH, null, "tts_ps_ur")
                    } else {
                        engine.language = Locale.US
                        engine.speak("$englishWordOrTitle. ${trilingual.en}", TextToSpeech.QUEUE_FLUSH, null, "tts_ps_en")
                    }
                } else {
                    engine.speak("$englishWordOrTitle. ${trilingual.ps}", TextToSpeech.QUEUE_FLUSH, null, "tts_ps")
                }
            }
        }
    }

    fun onPageGameWon(pageNumber: Int) {
        playDing(true)
        if (!completedPages.contains(pageNumber)) {
            completedPages.add(pageNumber)
        }
        currentPageIndex = (currentPageIndex + 1) % CLASS1_PAGES.size
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFBAE6FD))
    ) {
        // ─── TOP COMPACT GAME BAR ───
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.horizontalGradient(
                        listOf(Color(0xFF1E3A8A), Color(0xFF0284C7))
                    )
                )
                .padding(horizontal = 10.dp, vertical = 6.dp)
        ) {
            IconButton(
                onClick = onBackClick,
                modifier = Modifier
                    .size(34.dp)
                    .clip(CircleShape)
                    .background(Color(0x33FFFFFF))
            ) {
                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
            }

            Spacer(modifier = Modifier.width(8.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "${currentPageMeta.mascotEmoji} ${currentPageMeta.pillLabel}",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color.White,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = "${completedPages.size}/${CLASS1_PAGES.size} Stages Won • ${currentPageMeta.pageRangeText}",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFFBAE6FD),
                    maxLines = 1
                )
            }

            // Language Switcher: English / اردو / پښتو
            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                ExplainLang.entries.forEach { lang ->
                    val selected = explainLang == lang
                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = if (selected) Color(0xFFFACC15) else Color(0x33FFFFFF),
                        modifier = Modifier.clickable {
                            explainLang = lang
                            speakExplanation(currentPageMeta.titleEn, currentPageMeta.subtitle)
                        }
                    ) {
                        Text(
                            text = lang.label,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = if (selected) Color(0xFF0F172A) else Color.White,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.width(6.dp))

            IconButton(
                onClick = {
                    soundEnabled = !soundEnabled
                    if (!soundEnabled) tts?.stop()
                },
                modifier = Modifier
                    .size(34.dp)
                    .clip(CircleShape)
                    .background(if (soundEnabled) Color(0xFF22C55E) else Color(0x55FFFFFF))
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.VolumeUp,
                    contentDescription = "Sound",
                    tint = Color.White,
                    modifier = Modifier.size(18.dp)
                )
            }
        }

        // ─── LEVEL MAP PILLS (WHOLE BOOK: PAGES 2 TO 120) ───
        LazyRow(
            state = pillListState,
            contentPadding = PaddingValues(horizontal = 10.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFFE0F2FE))
        ) {
            itemsIndexed(CLASS1_PAGES) { idx, page ->
                val isSelected = idx == currentPageIndex
                val isDone = completedPages.contains(page.pageNumber)
                Surface(
                    shape = RoundedCornerShape(18.dp),
                    color = when {
                        isSelected -> Color(0xFFF59E0B)
                        isDone -> Color(0xFF22C55E)
                        else -> Color.White
                    },
                    shadowElevation = if (isSelected) 4.dp else 1.dp,
                    modifier = Modifier.clickable { currentPageIndex = idx }
                ) {
                    Text(
                        text = if (isDone) "⭐ ${page.pillLabel}" else "${page.mascotEmoji} ${page.pillLabel}",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = if (isSelected || isDone) Color.White else Color(0xFF1E3A8A),
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 5.dp)
                    )
                }
            }
        }

        // ─── TABS: GAME, LESSON, EXERCISE ───
        SecondaryTabRow(
            selectedTabIndex = selectedTabIndex,
            containerColor = Color.White,
            contentColor = Color(0xFF1D4ED8)
        ) {
            tabs.forEachIndexed { index, title ->
                val icon = when (index) {
                    0 -> "🎮 "
                    1 -> "📖 "
                    else -> "✏️ "
                }
                Tab(
                    selected = selectedTabIndex == index,
                    onClick = { selectedTabIndex = index },
                    text = {
                        Text(
                            text = "$icon$title",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = if (selectedTabIndex == index) Color(0xFF1D4ED8) else Color(0xFF64748B)
                        )
                    }
                )
            }
        }

        // ─── MAIN ANIMATED WORLD STAGE ───
        Box(modifier = Modifier.fillMaxSize()) {
            AnimatedGameWorldBackdrop()

            key(currentPageMeta.pageNumber, selectedTabIndex) {
                when (selectedTabIndex) {
                    0 -> {
                        when (currentPageMeta.mechanic) {
                            ArcadeStageMechanic.PAGE2_OBJECT_BUBBLES -> SuperFunPage2Game(
                                explainLang = explainLang,
                                onSpeak = ::speakExplanation,
                                onDing = ::playDing,
                                onPageCompleted = { onPageGameWon(currentPageMeta.pageNumber) }
                            )
                            ArcadeStageMechanic.PAGE3_SKY_BALLOONS -> SuperFunPage3BalloonGame(
                                explainLang = explainLang,
                                onSpeak = ::speakExplanation,
                                onDing = ::playDing,
                                onPageCompleted = { onPageGameWon(currentPageMeta.pageNumber) }
                            )
                            ArcadeStageMechanic.PAGE4_LADYBUG_TRACE -> SuperFunPage4LadybugTraceGame(
                                explainLang = explainLang,
                                onSpeak = ::speakExplanation,
                                onDing = ::playDing,
                                onPageCompleted = { onPageGameWon(currentPageMeta.pageNumber) }
                            )
                            ArcadeStageMechanic.PAGE5_TRAIN_PAINTER -> SuperFunPage5TrainPaintGame(
                                explainLang = explainLang,
                                onSpeak = ::speakExplanation,
                                onDing = ::playDing,
                                onPageCompleted = { onPageGameWon(currentPageMeta.pageNumber) }
                            )
                            ArcadeStageMechanic.PAGE6_MAGIC_WRITER -> SuperFunPage6MagicLetterGame(
                                explainLang = explainLang,
                                onSpeak = ::speakExplanation,
                                onDing = ::playDing,
                                onPageCompleted = { onPageGameWon(currentPageMeta.pageNumber) }
                            )
                            ArcadeStageMechanic.PAGE7_CATERPILLAR_APPLES -> SuperFunPage7CaterpillarAppleGame(
                                explainLang = explainLang,
                                nextStageLabel = nextPageMeta.pillLabel,
                                onSpeak = ::speakExplanation,
                                onDing = ::playDing,
                                onPageCompleted = { onPageGameWon(currentPageMeta.pageNumber) }
                            )
                            ArcadeStageMechanic.ROCKET_SHOOTER,
                            ArcadeStageMechanic.MONKEY_FRUIT_CATCH,
                            ArcadeStageMechanic.FROG_LILYPAD_HOP,
                            ArcadeStageMechanic.TREASURE_CHEST_UNLOCK,
                            ArcadeStageMechanic.RACE_TRACK_TURBO,
                            ArcadeStageMechanic.RAINBOW_BRIDGE_BUILDER -> SuperFunUnitArcadeStageGame(
                                stageMeta = currentPageMeta,
                                nextStageLabel = nextPageMeta.pillLabel,
                                explainLang = explainLang,
                                onSpeak = ::speakExplanation,
                                onDing = ::playDing,
                                onStageCompleted = { onPageGameWon(currentPageMeta.pageNumber) }
                            )
                        }
                    }
                    1 -> SimpleLessonTab(
                        stageMeta = currentPageMeta,
                        explainLang = explainLang,
                        onSpeak = ::speakExplanation
                    )
                    2 -> SimpleExerciseTab(
                        stageMeta = currentPageMeta,
                        explainLang = explainLang,
                        onSpeak = ::speakExplanation,
                        onDing = ::playDing
                    )
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2D ANIMATED GAME WORLD BACKDROP + CONFETTI STAR BURST ENGINE
// ═══════════════════════════════════════════════════════════════════════════════
@Composable
private fun AnimatedGameWorldBackdrop() {
    val infinite = rememberInfiniteTransition(label = "world")
    val cloudOffset by infinite.animateFloat(
        initialValue = -60f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(tween(14000, easing = LinearEasing), RepeatMode.Restart),
        label = "cloud"
    )
    val sunPulse by infinite.animateFloat(
        initialValue = 0.92f,
        targetValue = 1.12f,
        animationSpec = infiniteRepeatable(tween(1200, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "sun"
    )

    Canvas(modifier = Modifier.fillMaxSize()) {
        val w = size.width
        val h = size.height

        drawRect(
            brush = Brush.verticalGradient(
                listOf(Color(0xFF7DD3FC), Color(0xFFE0F2FE), Color(0xFFDCFCE7))
            )
        )

        drawCircle(
            color = Color(0x55FACC15),
            radius = 58f * sunPulse,
            center = Offset(w * 0.88f, h * 0.10f)
        )
        drawCircle(
            color = Color(0xFFFACC15),
            radius = 38f,
            center = Offset(w * 0.88f, h * 0.10f)
        )

        val cx1 = (cloudOffset % (w + 120f))
        val cx2 = ((cloudOffset + w * 0.5f) % (w + 120f))
        drawCircle(Color.White.copy(alpha = 0.85f), radius = 34f, center = Offset(cx1, h * 0.12f))
        drawCircle(Color.White.copy(alpha = 0.85f), radius = 42f, center = Offset(cx1 + 30f, h * 0.11f))
        drawCircle(Color.White.copy(alpha = 0.85f), radius = 32f, center = Offset(cx1 + 60f, h * 0.12f))

        drawCircle(Color.White.copy(alpha = 0.75f), radius = 28f, center = Offset(cx2, h * 0.20f))
        drawCircle(Color.White.copy(alpha = 0.75f), radius = 36f, center = Offset(cx2 + 26f, h * 0.19f))

        drawCircle(
            color = Color(0xFF86EFAC),
            radius = w * 0.65f,
            center = Offset(w * 0.25f, h * 1.18f)
        )
        drawCircle(
            color = Color(0xFF4ADE80),
            radius = w * 0.70f,
            center = Offset(w * 0.80f, h * 1.20f)
        )
    }
}

@Composable
private fun StarBurstParticles(triggerKey: Int) {
    var burstProgress by remember { mutableFloatStateOf(1f) }
    LaunchedEffect(triggerKey) {
        if (triggerKey > 0) {
            burstProgress = 0f
            val steps = 20
            for (i in 1..steps) {
                burstProgress = i / steps.toFloat()
                delay(22)
            }
            burstProgress = 1f
        }
    }

    if (burstProgress < 1f) {
        val colors = listOf(
            Color(0xFFFACC15),
            Color(0xFFEF4444),
            Color(0xFF22C55E),
            Color(0xFF3B82F6),
            Color(0xFFEC4899),
            Color(0xFFA855F7)
        )
        Canvas(modifier = Modifier.fillMaxSize()) {
            val cx = size.width * 0.5f
            val cy = size.height * 0.45f
            val maxRadius = size.width * 0.48f
            for (i in 0 until 20) {
                val angle = (2.0 * PI * i) / 20.0
                val dist = maxRadius * burstProgress
                val px = cx + (cos(angle) * dist).toFloat()
                val py = cy + (sin(angle) * dist).toFloat()
                val r = (18f * (1f - burstProgress)).coerceAtLeast(2f)
                drawCircle(
                    color = colors[i % colors.size],
                    radius = r,
                    center = Offset(px, py)
                )
            }
        }
    }
}

@Composable
private fun KidGameTopBar(
    hearts: Int,
    stars: Int,
    stepDone: Int,
    stepTotal: Int,
    onSpeakClick: () -> Unit,
    onRestart: () -> Unit
) {
    val infinite = rememberInfiniteTransition(label = "hud")
    val starScale by infinite.animateFloat(
        initialValue = 0.9f,
        targetValue = 1.2f,
        animationSpec = infiniteRepeatable(tween(550), RepeatMode.Reverse),
        label = "starScale"
    )

    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween,
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 12.dp, vertical = 8.dp)
            .clip(RoundedCornerShape(24.dp))
            .background(Color.White.copy(alpha = 0.92f))
            .border(2.dp, Color(0xFF38BDF8), RoundedCornerShape(24.dp))
            .padding(horizontal = 14.dp, vertical = 8.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            repeat(3) { idx ->
                Icon(
                    imageVector = if (idx < hearts) Icons.Default.Favorite else Icons.Default.FavoriteBorder,
                    contentDescription = null,
                    tint = if (idx < hearts) Color(0xFFEF4444) else Color(0xFFCBD5E1),
                    modifier = Modifier.size(26.dp)
                )
            }
        }

        Row(horizontalArrangement = Arrangement.spacedBy(5.dp)) {
            repeat(stepTotal.coerceAtMost(8)) { idx ->
                Box(
                    modifier = Modifier
                        .size(if (idx < stepDone) 14.dp else 11.dp)
                        .clip(CircleShape)
                        .background(if (idx < stepDone) Color(0xFF22C55E) else Color(0xFFCBD5E1))
                )
            }
        }

        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(
                imageVector = Icons.Default.Star,
                contentDescription = null,
                tint = Color(0xFFF59E0B),
                modifier = Modifier
                    .size(26.dp)
                    .scale(starScale)
            )
            Text(
                text = "$stars",
                fontSize = 18.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFFB45309)
            )
            Spacer(modifier = Modifier.width(8.dp))
            IconButton(
                onClick = onSpeakClick,
                modifier = Modifier
                    .size(34.dp)
                    .clip(CircleShape)
                    .background(Color(0xFF2563EB))
            ) {
                Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color.White, modifier = Modifier.size(18.dp))
            }
            Spacer(modifier = Modifier.width(4.dp))
            IconButton(
                onClick = onRestart,
                modifier = Modifier
                    .size(34.dp)
                    .clip(CircleShape)
                    .background(Color(0xFFE0E7FF))
            ) {
                Icon(Icons.Default.Refresh, contentDescription = null, tint = Color(0xFF1D4ED8), modifier = Modifier.size(18.dp))
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GAME 1 (PAGE 2): "FEED & CATCH WITH BUSY BEE!" (3 BIG FLOATING BUBBLES + HAND)
// ═══════════════════════════════════════════════════════════════════════════════
@Composable
private fun SuperFunPage2Game(
    explainLang: ExplainLang,
    onSpeak: (String, TrilingualText) -> Unit,
    onDing: (Boolean) -> Unit,
    onPageCompleted: () -> Unit
) {
    var queue by remember { mutableStateOf(PAGE_2_OBJECTS.shuffled()) }
    var currentIdx by remember { mutableIntStateOf(0) }
    var hearts by remember { mutableIntStateOf(3) }
    var stars by remember { mutableIntStateOf(0) }
    var burstCount by remember { mutableIntStateOf(0) }
    var showGuideHand by remember { mutableStateOf(false) }

    val isWon = currentIdx >= queue.size
    val isLost = hearts <= 0 && !isWon
    val target = queue.getOrNull(currentIdx) ?: PAGE_2_OBJECTS.first()

    val threeBubbles = remember(currentIdx, queue) {
        val others = PAGE_2_OBJECTS.filter { it.id != target.id }.shuffled().take(2)
        (others + target).shuffled()
    }

    fun restart() {
        queue = PAGE_2_OBJECTS.shuffled()
        currentIdx = 0
        hearts = 3
        stars = 0
        showGuideHand = false
    }

    LaunchedEffect(currentIdx, explainLang) {
        if (!isWon && !isLost) {
            showGuideHand = false
            delay(200)
            onSpeak(target.word, target.explanation)
            delay(3500)
            showGuideHand = true
        }
    }

    LaunchedEffect(isWon) {
        if (isWon) {
            delay(1800)
            onPageCompleted()
        }
    }

    LaunchedEffect(isLost) {
        if (isLost) {
            delay(2000)
            restart()
        }
    }

    val infinite = rememberInfiniteTransition(label = "p2_bee")
    val beeFlyX by infinite.animateFloat(
        initialValue = -16f,
        targetValue = 16f,
        animationSpec = infiniteRepeatable(tween(1100, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "beeX"
    )
    val bubbleBob by infinite.animateFloat(
        initialValue = -10f,
        targetValue = 10f,
        animationSpec = infiniteRepeatable(tween(900, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "bob"
    )
    val handScale by infinite.animateFloat(
        initialValue = 0.9f,
        targetValue = 1.25f,
        animationSpec = infiniteRepeatable(tween(450), RepeatMode.Reverse),
        label = "hand"
    )

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxSize()
        ) {
            KidGameTopBar(
                hearts = hearts,
                stars = stars,
                stepDone = currentIdx,
                stepTotal = queue.size,
                onSpeakClick = { onSpeak(target.word, target.explanation) },
                onRestart = ::restart
            )

            if (isWon) {
                ArcadeVictoryOverlay(stageLabel = "Page 2", nextStageLabel = "Page 3", onNext = onPageCompleted)
            } else if (isLost) {
                ArcadeTryAgainOverlay(onRestart = ::restart)
            } else {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 6.dp)
                        .offset(x = beeFlyX.dp)
                        .clickable { onSpeak(target.word, target.explanation) }
                ) {
                    Text(text = "🐝", fontSize = 58.sp)
                    Spacer(modifier = Modifier.width(8.dp))
                    Card(
                        shape = RoundedCornerShape(30.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                        modifier = Modifier.border(4.dp, Color(0xFFF59E0B), RoundedCornerShape(30.dp))
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier.padding(horizontal = 24.dp, vertical = 12.dp)
                        ) {
                            Text(
                                text = "Tap: ${target.word.uppercase()}",
                                fontSize = 28.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Color(0xFF0F172A)
                            )
                            Text(
                                text = when (explainLang) {
                                    ExplainLang.ENGLISH -> "Starts with '${target.initialLetter}' (${target.phoneticSound})"
                                    ExplainLang.URDU -> "${target.meaningUr} • ${target.explanation.ur}"
                                    ExplainLang.PASHTO -> "${target.meaningPs} • ${target.explanation.ps}"
                                },
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFFB45309),
                                textAlign = TextAlign.Center
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(horizontal = 12.dp, vertical = 16.dp)
                ) {
                    threeBubbles.forEachIndexed { idx, item ->
                        val isTarget = item.id == target.id
                        val yOff = if (idx % 2 == 0) bubbleBob else -bubbleBob

                        Box(
                            contentAlignment = Alignment.Center,
                            modifier = Modifier
                                .weight(1f)
                                .offset(y = yOff.dp)
                        ) {
                            Card(
                                shape = RoundedCornerShape(32.dp),
                                colors = CardDefaults.cardColors(containerColor = Color(item.cardColorHex)),
                                elevation = CardDefaults.cardElevation(defaultElevation = 10.dp),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(220.dp)
                                    .border(
                                        width = if (isTarget && showGuideHand) 5.dp else 3.dp,
                                        color = if (isTarget && showGuideHand) Color(0xFF22C55E) else Color(item.accentColorHex),
                                        shape = RoundedCornerShape(32.dp)
                                    )
                                    .clickable {
                                        if (isTarget) {
                                            onDing(true)
                                            burstCount++
                                            stars += 20
                                            onSpeak(item.word, item.explanation)
                                            currentIdx++
                                        } else {
                                            onDing(false)
                                            hearts = (hearts - 1).coerceAtLeast(0)
                                            showGuideHand = true
                                            onSpeak(item.word, target.hint)
                                        }
                                    }
                            ) {
                                Column(
                                    horizontalAlignment = Alignment.CenterHorizontally,
                                    verticalArrangement = Arrangement.Center,
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .padding(8.dp)
                                ) {
                                    Text(text = item.emoji, fontSize = 72.sp)
                                    Spacer(modifier = Modifier.height(10.dp))
                                    Text(
                                        text = item.word,
                                        fontSize = 26.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = Color(0xFF0F172A)
                                    )
                                    Text(
                                        text = when (explainLang) {
                                            ExplainLang.ENGLISH -> item.initialLetter
                                            ExplainLang.URDU -> item.meaningUr
                                            ExplainLang.PASHTO -> item.meaningPs
                                        },
                                        fontSize = 15.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = Color(item.accentColorHex)
                                    )
                                }
                            }

                            if (isTarget && showGuideHand) {
                                Text(
                                    text = "👆",
                                    fontSize = 48.sp,
                                    modifier = Modifier
                                        .align(Alignment.BottomCenter)
                                        .offset(y = 24.dp)
                                        .scale(handScale)
                                )
                            }
                        }
                    }
                }
            }
        }

        StarBurstParticles(triggerKey = burstCount)
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GAME 2 (PAGE 3): "RISING SKY BALLOON POP!" (REAL RISING BALLOONS Aa–Zz)
// ═══════════════════════════════════════════════════════════════════════════════
@Composable
private fun SuperFunPage3BalloonGame(
    explainLang: ExplainLang,
    onSpeak: (String, TrilingualText) -> Unit,
    onDing: (Boolean) -> Unit,
    onPageCompleted: () -> Unit
) {
    val totalRounds = 7
    var roundTargets by remember { mutableStateOf(ALPHABET_26.shuffled().take(totalRounds)) }
    var currentRound by remember { mutableIntStateOf(0) }
    var hearts by remember { mutableIntStateOf(3) }
    var stars by remember { mutableIntStateOf(0) }
    var burstCount by remember { mutableIntStateOf(0) }

    val isWon = currentRound >= totalRounds
    val isLost = hearts <= 0 && !isWon
    val target = roundTargets.getOrNull(currentRound) ?: ALPHABET_26.first()

    val balloons = remember(currentRound, roundTargets) {
        val wrong = ALPHABET_26.filter { it.capital != target.capital }.shuffled().take(2)
        (wrong + target).shuffled()
    }

    fun restart() {
        roundTargets = ALPHABET_26.shuffled().take(totalRounds)
        currentRound = 0
        hearts = 3
        stars = 0
    }

    LaunchedEffect(currentRound, explainLang) {
        if (!isWon && !isLost) {
            delay(200)
            onSpeak(
                "${target.capital} ${target.small}",
                TrilingualText(
                    en = target.explain(ExplainLang.ENGLISH),
                    ur = target.explain(ExplainLang.URDU),
                    ps = target.explain(ExplainLang.PASHTO)
                )
            )
        }
    }

    LaunchedEffect(isWon) {
        if (isWon) {
            delay(1800)
            onPageCompleted()
        }
    }

    LaunchedEffect(isLost) {
        if (isLost) {
            delay(2000)
            restart()
        }
    }

    val infinite = rememberInfiniteTransition(label = "sky_balloons")
    val riseOffset by infinite.animateFloat(
        initialValue = 28f,
        targetValue = -28f,
        animationSpec = infiniteRepeatable(tween(1500, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "rise"
    )
    val swayOffset by infinite.animateFloat(
        initialValue = -8f,
        targetValue = 8f,
        animationSpec = infiniteRepeatable(tween(950, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "sway"
    )

    val colors = listOf(Color(0xFFEF4444), Color(0xFF3B82F6), Color(0xFF10B981))

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxSize()
        ) {
            KidGameTopBar(
                hearts = hearts,
                stars = stars,
                stepDone = currentRound,
                stepTotal = totalRounds,
                onSpeakClick = {
                    onSpeak(
                        "${target.capital} ${target.small}",
                        TrilingualText(
                            en = target.explain(ExplainLang.ENGLISH),
                            ur = target.explain(ExplainLang.URDU),
                            ps = target.explain(ExplainLang.PASHTO)
                        )
                    )
                },
                onRestart = ::restart
            )

            if (isWon) {
                ArcadeVictoryOverlay(stageLabel = "Page 3", nextStageLabel = "Page 4", onNext = onPageCompleted)
            } else if (isLost) {
                ArcadeTryAgainOverlay(onRestart = ::restart)
            } else {
                Card(
                    shape = RoundedCornerShape(32.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                    modifier = Modifier
                        .padding(vertical = 8.dp)
                        .border(4.dp, Color(0xFF0284C7), RoundedCornerShape(32.dp))
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(horizontal = 28.dp, vertical = 12.dp)
                    ) {
                        Text(
                            text = target.capital,
                            fontSize = 68.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF1E3A8A)
                        )
                        Spacer(modifier = Modifier.width(16.dp))
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(text = target.sampleEmoji, fontSize = 52.sp)
                            Text(
                                text = target.sampleWord,
                                fontSize = 18.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Color(0xFF0284C7)
                            )
                        }
                    }
                }

                Row(
                    horizontalArrangement = Arrangement.spacedBy(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(horizontal = 16.dp, vertical = 12.dp)
                ) {
                    balloons.forEachIndexed { idx, item ->
                        val isMatch = item.capital == target.capital
                        val yAnim = if (idx % 2 == 0) riseOffset else -riseOffset

                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier
                                .weight(1f)
                                .offset(x = swayOffset.dp, y = yAnim.dp)
                                .clickable {
                                    if (isMatch) {
                                        onDing(true)
                                        burstCount++
                                        stars += 20
                                        currentRound++
                                    } else {
                                        onDing(false)
                                        hearts = (hearts - 1).coerceAtLeast(0)
                                    }
                                }
                        ) {
                            Box(
                                contentAlignment = Alignment.Center,
                                modifier = Modifier
                                    .size(width = 100.dp, height = 132.dp)
                                    .clip(CircleShape)
                                    .background(colors[idx % colors.size])
                                    .border(4.dp, Color.White, CircleShape)
                            ) {
                                Text(
                                    text = item.small,
                                    fontSize = 58.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color.White
                                )
                            }
                            Text(text = "▲", fontSize = 14.sp, color = colors[idx % colors.size])
                            Box(
                                modifier = Modifier
                                    .width(3.dp)
                                    .height(36.dp)
                                    .background(Color(0xFF475569))
                            )
                            if (isMatch) {
                                Text(text = "👆", fontSize = 32.sp)
                            }
                        }
                    }
                }
            }
        }

        StarBurstParticles(triggerKey = burstCount)
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GAME 3 (PAGE 4): "LADYBUG TO FLOWER TRAIL TRACER!" (WITH MOVING GHOST HAND!)
// Traces along the exact direction of each dotted line (→, ↓, ↘, ↙, ⋀⋁, ∪, ◯)!
// ═══════════════════════════════════════════════════════════════════════════════
private fun buildWaypoints(patternId: String, width: Float, height: Float): List<Offset> {
    val pts = mutableListOf<Offset>()
    val steps = 36
    when (patternId) {
        "horizontal" -> {
            for (i in 0..steps) {
                val t = i / steps.toFloat()
                pts.add(Offset(width * (0.15f + 0.70f * t), height * 0.50f))
            }
        }
        "vertical" -> {
            for (i in 0..steps) {
                val t = i / steps.toFloat()
                pts.add(Offset(width * 0.50f, height * (0.14f + 0.72f * t)))
            }
        }
        "slant_right" -> {
            for (i in 0..steps) {
                val t = i / steps.toFloat()
                pts.add(Offset(width * (0.25f + 0.50f * t), height * (0.14f + 0.72f * t)))
            }
        }
        "slant_left" -> {
            for (i in 0..steps) {
                val t = i / steps.toFloat()
                pts.add(Offset(width * (0.75f - 0.50f * t), height * (0.14f + 0.72f * t)))
            }
        }
        "zigzag" -> {
            val v = listOf(
                Offset(width * 0.12f, height * 0.78f),
                Offset(width * 0.37f, height * 0.22f),
                Offset(width * 0.63f, height * 0.78f),
                Offset(width * 0.88f, height * 0.22f)
            )
            for (s in 0 until v.lastIndex) {
                val a = v[s]
                val b = v[s + 1]
                for (i in 0..12) {
                    val t = i / 12f
                    pts.add(Offset(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t))
                }
            }
        }
        "u_curve" -> {
            val cx = width * 0.50f
            val topY = height * 0.20f
            val rx = width * 0.28f
            val ry = height * 0.62f
            for (i in 0..steps) {
                val angle = PI * (1.0 - (i / steps.toFloat()))
                pts.add(Offset(cx + (rx * cos(angle)).toFloat(), topY + (ry * sin(angle)).toFloat()))
            }
        }
        "circle" -> {
            val cx = width * 0.50f
            val cy = height * 0.50f
            val r = minOf(width, height) * 0.34f
            for (i in 0..steps) {
                val angle = -PI / 2.0 + (2.0 * PI * (i / steps.toFloat()))
                pts.add(Offset(cx + (r * cos(angle)).toFloat(), cy + (r * sin(angle)).toFloat()))
            }
        }
    }
    return pts
}

@Composable
private fun SuperFunPage4LadybugTraceGame(
    explainLang: ExplainLang,
    onSpeak: (String, TrilingualText) -> Unit,
    onDing: (Boolean) -> Unit,
    onPageCompleted: () -> Unit
) {
    var activeLineIdx by remember { mutableIntStateOf(0) }
    var reachedWaypoint by remember { mutableIntStateOf(0) }
    var stars by remember { mutableIntStateOf(0) }
    var burstCount by remember { mutableIntStateOf(0) }

    val isWon = activeLineIdx >= PAGE_4_LINES.size
    val currentLine = PAGE_4_LINES.getOrNull(activeLineIdx) ?: PAGE_4_LINES.first()
    val currentFlower = PAGE_4_FLOWERS[activeLineIdx % PAGE_4_FLOWERS.size]

    fun restart() {
        activeLineIdx = 0
        reachedWaypoint = 0
        stars = 0
    }

    LaunchedEffect(activeLineIdx, explainLang) {
        if (!isWon) {
            reachedWaypoint = 0
            delay(200)
            onSpeak(currentLine.nameEn, currentLine.instruction)
        }
    }

    LaunchedEffect(isWon) {
        if (isWon) {
            delay(1800)
            onPageCompleted()
        }
    }

    val infinite = rememberInfiniteTransition(label = "ghost_hand")
    val ghostProgress by infinite.animateFloat(
        initialValue = 0f,
        targetValue = 1f,
        animationSpec = infiniteRepeatable(tween(2200, easing = LinearEasing), RepeatMode.Restart),
        label = "ghost"
    )

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxSize()
        ) {
            KidGameTopBar(
                hearts = 3,
                stars = stars,
                stepDone = activeLineIdx,
                stepTotal = PAGE_4_LINES.size,
                onSpeakClick = { onSpeak(currentLine.nameEn, currentLine.instruction) },
                onRestart = ::restart
            )

            if (isWon) {
                ArcadeVictoryOverlay(stageLabel = "Page 4", nextStageLabel = "Page 5", onNext = onPageCompleted)
            } else {
                Surface(
                    shape = RoundedCornerShape(24.dp),
                    color = Color.White,
                    shadowElevation = 6.dp,
                    modifier = Modifier
                        .padding(horizontal = 16.dp, vertical = 4.dp)
                        .border(3.dp, Color(currentFlower.borderColorHex), RoundedCornerShape(24.dp))
                        .clickable { onSpeak(currentFlower.letter, currentFlower.explain) }
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(horizontal = 20.dp, vertical = 8.dp)
                    ) {
                        Text(text = "🐞 ➔ 🌸 ${currentFlower.letter}", fontSize = 26.sp, fontWeight = FontWeight.ExtraBold)
                        Spacer(modifier = Modifier.width(12.dp))
                        Text(
                            text = currentLine.instruction.get(explainLang),
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF334155),
                            maxLines = 2
                        )
                    }
                }

                Card(
                    shape = RoundedCornerShape(30.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFFFFBEB)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(14.dp)
                        .border(4.dp, Color(0xFFF59E0B), RoundedCornerShape(30.dp))
                ) {
                    Box(modifier = Modifier.fillMaxSize()) {
                        var canvasSize by remember { mutableStateOf(Size.Zero) }

                        Canvas(
                            modifier = Modifier
                                .fillMaxSize()
                                .pointerInput(currentLine.id) {
                                    detectDragGestures(
                                        onDragStart = { pos ->
                                            val pts = buildWaypoints(currentLine.id, size.width.toFloat(), size.height.toFloat())
                                            val cur = pts.getOrNull(reachedWaypoint) ?: return@detectDragGestures
                                            if (hypot(pos.x - cur.x, pos.y - cur.y) < 150f) {
                                                reachedWaypoint = (reachedWaypoint + 1).coerceAtMost(pts.lastIndex)
                                            }
                                        },
                                        onDrag = { change, _ ->
                                            change.consume()
                                            val pts = buildWaypoints(currentLine.id, size.width.toFloat(), size.height.toFloat())
                                            val pos = change.position
                                            val lookAhead = (reachedWaypoint + 6).coerceAtMost(pts.lastIndex)
                                            for (idx in reachedWaypoint..lookAhead) {
                                                if (hypot(pos.x - pts[idx].x, pos.y - pts[idx].y) < 130f) {
                                                    if (idx > reachedWaypoint) {
                                                        reachedWaypoint = idx
                                                    }
                                                }
                                            }
                                            if (reachedWaypoint >= pts.lastIndex - 2) {
                                                onDing(true)
                                                burstCount++
                                                stars += 25
                                                onSpeak(currentFlower.letter, currentFlower.explain)
                                                activeLineIdx++
                                            }
                                        }
                                    )
                                }
                        ) {
                            canvasSize = size
                            val w = size.width
                            val h = size.height

                            listOf(h * 0.16f, h * 0.38f, h * 0.62f, h * 0.84f).forEachIndexed { idx, y ->
                                drawLine(
                                    color = if (idx == 0 || idx == 3) Color(0xFFFCA5A5) else Color(0xFF93C5FD),
                                    start = Offset(0f, y),
                                    end = Offset(w, y),
                                    strokeWidth = 3f
                                )
                            }

                            val pts = buildWaypoints(currentLine.id, w, h)
                            if (pts.size >= 2) {
                                val track = Path().apply {
                                    moveTo(pts.first().x, pts.first().y)
                                    for (i in 1 until pts.size) lineTo(pts[i].x, pts[i].y)
                                }
                                drawPath(
                                    path = track,
                                    color = Color(0xFF94A3B8),
                                    style = Stroke(
                                        width = 24f,
                                        cap = StrokeCap.Round,
                                        join = StrokeJoin.Round,
                                        pathEffect = PathEffect.dashPathEffect(floatArrayOf(28f, 22f), 0f)
                                    )
                                )

                                if (reachedWaypoint > 0) {
                                    val donePath = Path().apply {
                                        moveTo(pts.first().x, pts.first().y)
                                        for (i in 1..reachedWaypoint.coerceAtMost(pts.lastIndex)) {
                                            lineTo(pts[i].x, pts[i].y)
                                        }
                                    }
                                    drawPath(
                                        path = donePath,
                                        color = Color(0xFF22C55E),
                                        style = Stroke(width = 28f, cap = StrokeCap.Round, join = StrokeJoin.Round)
                                    )
                                }

                                val ghostIdx = (ghostProgress * pts.lastIndex).roundToInt().coerceIn(0, pts.lastIndex)
                                val ghostPt = pts[ghostIdx]
                                drawCircle(
                                    color = Color(0x66FACC15),
                                    radius = 28f,
                                    center = ghostPt
                                )

                                val endPt = pts.last()
                                drawCircle(Color(0xFFEC4899), radius = 30f, center = endPt)

                                val curPt = pts[reachedWaypoint.coerceIn(0, pts.lastIndex)]
                                drawCircle(Color(0xFFEF4444), radius = 32f, center = curPt)
                            }
                        }

                        if (canvasSize.width > 0f) {
                            val pts = buildWaypoints(currentLine.id, canvasSize.width, canvasSize.height)
                            if (pts.isNotEmpty()) {
                                val curPt = pts[reachedWaypoint.coerceIn(0, pts.lastIndex)]
                                val endPt = pts.last()
                                val ghostIdx = (ghostProgress * pts.lastIndex).roundToInt().coerceIn(0, pts.lastIndex)
                                val ghostPt = pts[ghostIdx]

                                Text(
                                    text = "🌸",
                                    fontSize = 36.sp,
                                    modifier = Modifier.offset {
                                        IntOffset((endPt.x - 36f).roundToInt(), (endPt.y - 40f).roundToInt())
                                    }
                                )

                                Text(
                                    text = "👆",
                                    fontSize = 32.sp,
                                    modifier = Modifier.offset {
                                        IntOffset((ghostPt.x - 20f).roundToInt(), (ghostPt.y - 10f).roundToInt())
                                    }
                                )

                                Text(
                                    text = "🐞",
                                    fontSize = 38.sp,
                                    modifier = Modifier.offset {
                                        IntOffset((curPt.x - 38f).roundToInt(), (curPt.y - 42f).roundToInt())
                                    }
                                )
                            }
                        }
                    }
                }
            }
        }

        StarBurstParticles(triggerKey = burstCount)
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GAME 4 (PAGE 5): "CHOO-CHOO MAGIC PAINT TRAIN!" (ANIMATED TRAIN + BUCKETS)
// ═══════════════════════════════════════════════════════════════════════════════
@Composable
private fun SuperFunPage5TrainPaintGame(
    explainLang: ExplainLang,
    onSpeak: (String, TrilingualText) -> Unit,
    onDing: (Boolean) -> Unit,
    onPageCompleted: () -> Unit
) {
    val coloredParts = remember { mutableStateMapOf<String, Long>() }
    var currentPartIdx by remember { mutableIntStateOf(0) }
    var stars by remember { mutableIntStateOf(0) }
    var burstCount by remember { mutableIntStateOf(0) }

    val isWon = coloredParts.size == PAGE_5_TRAIN_PARTS.size
    val activePart = PAGE_5_TRAIN_PARTS.getOrNull(currentPartIdx) ?: PAGE_5_TRAIN_PARTS.first()

    fun restart() {
        coloredParts.clear()
        currentPartIdx = 0
        stars = 0
    }

    LaunchedEffect(currentPartIdx, explainLang) {
        if (!isWon) {
            delay(200)
            onSpeak(activePart.nameEn, activePart.instruction)
        }
    }

    LaunchedEffect(isWon) {
        if (isWon) {
            delay(2000)
            onPageCompleted()
        }
    }

    val infinite = rememberInfiniteTransition(label = "train")
    val chugBounce by infinite.animateFloat(
        initialValue = -4f,
        targetValue = 4f,
        animationSpec = infiniteRepeatable(tween(380), RepeatMode.Reverse),
        label = "chug"
    )
    val glowPulse by infinite.animateFloat(
        initialValue = 0.35f,
        targetValue = 0.95f,
        animationSpec = infiniteRepeatable(tween(500), RepeatMode.Reverse),
        label = "glow"
    )

    fun paintCurrentPart() {
        val part = PAGE_5_TRAIN_PARTS[currentPartIdx]
        coloredParts[part.id] = part.targetColorHex
        onDing(true)
        burstCount++
        stars += 20
        val nextIdx = PAGE_5_TRAIN_PARTS.indexOfFirst { !coloredParts.containsKey(it.id) }
        if (nextIdx != -1) currentPartIdx = nextIdx
    }

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxSize()
        ) {
            KidGameTopBar(
                hearts = 3,
                stars = stars,
                stepDone = coloredParts.size,
                stepTotal = PAGE_5_TRAIN_PARTS.size,
                onSpeakClick = { onSpeak(activePart.nameEn, activePart.instruction) },
                onRestart = ::restart
            )

            if (isWon) {
                ArcadeVictoryOverlay(stageLabel = "Page 5", nextStageLabel = "Page 6", onNext = onPageCompleted)
            } else {
                Card(
                    shape = RoundedCornerShape(30.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f)
                        .padding(horizontal = 14.dp, vertical = 8.dp)
                        .border(4.dp, Color(activePart.targetColorHex), RoundedCornerShape(30.dp))
                        .pointerInput(currentPartIdx) {
                            detectTapGestures { paintCurrentPart() }
                        }
                ) {
                    Box(modifier = Modifier.fillMaxSize()) {
                        Canvas(
                            modifier = Modifier
                                .fillMaxSize()
                                .offset(y = chugBounce.dp)
                        ) {
                            val w = size.width
                            val h = size.height
                            val dash = Stroke(width = 6f, pathEffect = PathEffect.dashPathEffect(floatArrayOf(16f, 12f), 0f))

                            fun partFillColor(id: String, targetHex: Long): Color? {
                                val painted = coloredParts[id]
                                if (painted != null) return Color(painted)
                                if (activePart.id == id) return Color(targetHex).copy(alpha = glowPulse * 0.45f)
                                return null
                            }

                            val waveCol = coloredParts["waves"]?.let { Color(it) } ?: Color(0xFF64748B)
                            val wavePath = Path().apply {
                                moveTo(w * 0.16f, h * 0.22f)
                                for (i in 0..5) {
                                    val sx = w * 0.16f + i * (w * 0.11f)
                                    cubicTo(sx + w * 0.04f, h * 0.06f, sx + w * 0.07f, h * 0.36f, sx + w * 0.11f, h * 0.22f)
                                }
                            }
                            drawPath(
                                path = wavePath,
                                color = waveCol,
                                style = if (coloredParts.containsKey("waves")) Stroke(width = 14f, cap = StrokeCap.Round) else dash
                            )

                            partFillColor("engine_front", 0xFFEF4444)?.let { col ->
                                drawRoundRect(col, Offset(w * 0.06f, h * 0.54f), Size(w * 0.06f, h * 0.22f), CornerRadius(8f, 8f))
                                drawRoundRect(col, Offset(w * 0.15f, h * 0.34f), Size(w * 0.06f, h * 0.18f), CornerRadius(8f, 8f))
                            }
                            drawRoundRect(Color(0xFF1E293B), Offset(w * 0.06f, h * 0.54f), Size(w * 0.06f, h * 0.22f), style = dash)
                            drawRoundRect(Color(0xFF1E293B), Offset(w * 0.15f, h * 0.34f), Size(w * 0.06f, h * 0.18f), style = dash)

                            partFillColor("engine_body", 0xFF0284C7)?.let { col ->
                                drawRect(col, Offset(w * 0.12f, h * 0.50f), Size(w * 0.13f, h * 0.26f))
                            }
                            drawRect(Color(0xFF1E293B), Offset(w * 0.12f, h * 0.50f), Size(w * 0.13f, h * 0.26f), style = dash)

                            partFillColor("engine_cab", 0xFF7C3AED)?.let { col ->
                                drawRect(col, Offset(w * 0.25f, h * 0.38f), Size(w * 0.11f, h * 0.38f))
                            }
                            drawRect(Color(0xFF1E293B), Offset(w * 0.25f, h * 0.38f), Size(w * 0.11f, h * 0.38f), style = dash)

                            val bTargets = listOf("bogie_1" to 0xFF16A34A, "bogie_2" to 0xFFEA580C, "bogie_3" to 0xFF15803D)
                            bTargets.forEachIndexed { idx, (bId, hex) ->
                                val bx = w * (0.40f + idx * 0.19f)
                                partFillColor(bId, hex)?.let { col ->
                                    drawRect(col, Offset(bx, h * 0.48f), Size(w * 0.16f, h * 0.28f))
                                }
                                drawRect(Color(0xFF1E293B), Offset(bx, h * 0.48f), Size(w * 0.16f, h * 0.28f), style = dash)
                            }

                            val wheelXs = listOf(0.16f, 0.30f, 0.44f, 0.52f, 0.63f, 0.71f, 0.82f, 0.90f)
                            wheelXs.forEach { wx ->
                                partFillColor("wheels", 0xFF334155)?.let { col ->
                                    drawCircle(col, radius = h * 0.08f, center = Offset(w * wx, h * 0.84f))
                                }
                                drawCircle(Color(0xFF1E293B), radius = h * 0.08f, center = Offset(w * wx, h * 0.84f), style = dash)
                            }
                        }

                        Text(
                            text = "👆 Tap the Blinking Train Part to Paint!",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF0F172A),
                            modifier = Modifier
                                .align(Alignment.BottomCenter)
                                .padding(bottom = 10.dp)
                        )
                    }
                }

                Button(
                    onClick = { paintCurrentPart() },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(activePart.targetColorHex)),
                    shape = RoundedCornerShape(24.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 14.dp, vertical = 10.dp)
                        .height(66.dp)
                ) {
                    Text(
                        text = "🎨 Splash ${activePart.targetColorNameEn} on ${activePart.nameEn}! 👆",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                }
            }
        }

        StarBurstParticles(triggerKey = burstCount)
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GAME 5 (PAGE 6): "4-LINE MAGIC LETTER RUB & TRACE!" (Aa to Zz)
// ═══════════════════════════════════════════════════════════════════════════════
@Composable
private fun SuperFunPage6MagicLetterGame(
    explainLang: ExplainLang,
    onSpeak: (String, TrilingualText) -> Unit,
    onDing: (Boolean) -> Unit,
    onPageCompleted: () -> Unit
) {
    val totalRounds = 6
    var rounds by remember { mutableStateOf(ALPHABET_26.shuffled().take(totalRounds)) }
    var idx by remember { mutableIntStateOf(0) }
    var traceFill by remember { mutableFloatStateOf(0f) }
    var stars by remember { mutableIntStateOf(0) }
    var burstCount by remember { mutableIntStateOf(0) }

    val isWon = idx >= totalRounds
    val active = rounds.getOrNull(idx) ?: ALPHABET_26.first()

    fun restart() {
        rounds = ALPHABET_26.shuffled().take(totalRounds)
        idx = 0
        traceFill = 0f
        stars = 0
    }

    LaunchedEffect(idx, explainLang) {
        if (!isWon) {
            traceFill = 0f
            delay(200)
            onSpeak(
                active.pairText,
                TrilingualText(
                    en = active.explain(ExplainLang.ENGLISH),
                    ur = active.explain(ExplainLang.URDU),
                    ps = active.explain(ExplainLang.PASHTO)
                )
            )
        }
    }

    LaunchedEffect(isWon) {
        if (isWon) {
            delay(1800)
            onPageCompleted()
        }
    }

    val animatedScale by animateFloatAsState(
        targetValue = 1f + traceFill * 0.18f,
        animationSpec = spring(),
        label = "letterScale"
    )

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxSize()
        ) {
            KidGameTopBar(
                hearts = 3,
                stars = stars,
                stepDone = idx,
                stepTotal = totalRounds,
                onSpeakClick = {
                    onSpeak(
                        active.pairText,
                        TrilingualText(
                            en = active.explain(ExplainLang.ENGLISH),
                            ur = active.explain(ExplainLang.URDU),
                            ps = active.explain(ExplainLang.PASHTO)
                        )
                    )
                },
                onRestart = ::restart
            )

            if (isWon) {
                ArcadeVictoryOverlay(stageLabel = "Page 6", nextStageLabel = "Page 7", onNext = onPageCompleted)
            } else {
                Card(
                    shape = RoundedCornerShape(30.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f)
                        .padding(14.dp)
                        .border(4.dp, Color(0xFF2563EB), RoundedCornerShape(30.dp))
                        .pointerInput(idx) {
                            detectDragGestures { change, _ ->
                                change.consume()
                                traceFill = (traceFill + 0.06f).coerceAtMost(1f)
                                if (traceFill >= 1f) {
                                    onDing(true)
                                    burstCount++
                                    stars += 25
                                    idx++
                                }
                            }
                        }
                        .clickable {
                            traceFill = (traceFill + 0.35f).coerceAtMost(1f)
                            if (traceFill >= 1f) {
                                onDing(true)
                                burstCount++
                                stars += 25
                                idx++
                            }
                        }
                ) {
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier.fillMaxSize()
                    ) {
                        Canvas(modifier = Modifier.fillMaxSize()) {
                            val w = size.width
                            val h = size.height
                            listOf(h * 0.22f, h * 0.42f, h * 0.64f, h * 0.82f).forEachIndexed { lineIdx, y ->
                                drawLine(
                                    color = if (lineIdx == 0 || lineIdx == 3) Color(0xFFF87171) else Color(0xFF60A5FA),
                                    start = Offset(0f, y),
                                    end = Offset(w, y),
                                    strokeWidth = 4f
                                )
                            }
                        }

                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = "${active.capital}${active.small}",
                                fontSize = 112.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = if (traceFill > 0.5f) Color(0xFF16A34A) else Color(0xFF1E3A8A),
                                modifier = Modifier.scale(animatedScale)
                            )
                            Text(
                                text = "${active.sampleEmoji} ${active.sampleWord}",
                                fontSize = 26.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Color(0xFF0F172A)
                            )
                            Spacer(modifier = Modifier.height(8.dp))
                            Text(
                                text = "👆 Rub or Tap '${active.capital}${active.small}' to Trace! (${(traceFill * 100).toInt()}%)",
                                fontSize = 15.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Color(0xFF2563EB)
                            )
                        }
                    }
                }
            }
        }

        StarBurstParticles(triggerKey = burstCount)
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GAME 6 (PAGE 7): "HUNGRY CATERPILLAR & APPLE TREE!" (BEFORE / AFTER APPLES)
// ═══════════════════════════════════════════════════════════════════════════════
@Composable
private fun SuperFunPage7CaterpillarAppleGame(
    explainLang: ExplainLang,
    nextStageLabel: String,
    onSpeak: (String, TrilingualText) -> Unit,
    onDing: (Boolean) -> Unit,
    onPageCompleted: () -> Unit
) {
    var currentIdx by remember { mutableIntStateOf(0) }
    var hearts by remember { mutableIntStateOf(3) }
    var stars by remember { mutableIntStateOf(0) }
    var burstCount by remember { mutableIntStateOf(0) }

    val isWon = currentIdx >= PAGE_7_APPLE_PUZZLES.size
    val isLost = hearts <= 0 && !isWon
    val puzzle = PAGE_7_APPLE_PUZZLES.getOrNull(currentIdx) ?: PAGE_7_APPLE_PUZZLES.first()

    fun restart() {
        currentIdx = 0
        hearts = 3
        stars = 0
    }

    LaunchedEffect(currentIdx, explainLang) {
        if (!isWon && !isLost) {
            delay(200)
            onSpeak(puzzle.givenLetter, puzzle.explain)
        }
    }

    LaunchedEffect(isWon) {
        if (isWon) {
            delay(1800)
            onPageCompleted()
        }
    }

    LaunchedEffect(isLost) {
        if (isLost) {
            delay(2000)
            restart()
        }
    }

    val infinite = rememberInfiniteTransition(label = "apple")
    val pulse by infinite.animateFloat(
        initialValue = 0.94f,
        targetValue = 1.08f,
        animationSpec = infiniteRepeatable(tween(600), RepeatMode.Reverse),
        label = "pulse"
    )

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxSize()
        ) {
            KidGameTopBar(
                hearts = hearts,
                stars = stars,
                stepDone = currentIdx,
                stepTotal = PAGE_7_APPLE_PUZZLES.size,
                onSpeakClick = { onSpeak(puzzle.givenLetter, puzzle.explain) },
                onRestart = ::restart
            )

            if (isWon) {
                ArcadeVictoryOverlay(stageLabel = "Page 7", nextStageLabel = nextStageLabel, onNext = onPageCompleted)
            } else if (isLost) {
                ArcadeTryAgainOverlay(onRestart = ::restart)
            } else {
                Surface(
                    shape = RoundedCornerShape(24.dp),
                    color = Color.White,
                    shadowElevation = 6.dp,
                    modifier = Modifier
                        .padding(horizontal = 16.dp, vertical = 6.dp)
                        .border(3.dp, Color(0xFF16A34A), RoundedCornerShape(24.dp))
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(horizontal = 20.dp, vertical = 10.dp)
                    ) {
                        Text(text = "🐛", fontSize = 36.sp)
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            text = if (puzzle.isBefore) "Tap the letter BEFORE '${puzzle.givenLetter}'!" else "Tap the letter AFTER '${puzzle.givenLetter}'!",
                            fontSize = 19.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF0F172A)
                        )
                    }
                }

                Row(
                    horizontalArrangement = Arrangement.spacedBy(20.dp, Alignment.CenterHorizontally),
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f)
                        .padding(16.dp)
                ) {
                    val appleEmoji = if (puzzle.isRedApple) "🍎" else "🍏"
                    BigAppleBox(
                        emoji = appleEmoji,
                        text = if (puzzle.isBefore) "?" else puzzle.givenLetter,
                        isMystery = puzzle.isBefore,
                        scale = if (puzzle.isBefore) pulse else 1f
                    )
                    BigAppleBox(
                        emoji = appleEmoji,
                        text = if (puzzle.isBefore) puzzle.givenLetter else "?",
                        isMystery = !puzzle.isBefore,
                        scale = if (!puzzle.isBefore) pulse else 1f
                    )
                }

                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 14.dp, vertical = 14.dp)
                ) {
                    puzzle.options.forEach { opt ->
                        Button(
                            onClick = {
                                if (opt == puzzle.correctAnswer) {
                                    onDing(true)
                                    burstCount++
                                    stars += 25
                                    onSpeak(opt, puzzle.explain)
                                    currentIdx++
                                } else {
                                    onDing(false)
                                    hearts = (hearts - 1).coerceAtLeast(0)
                                }
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF16A34A)),
                            shape = RoundedCornerShape(22.dp),
                            modifier = Modifier
                                .weight(1f)
                                .height(74.dp)
                        ) {
                            Text(
                                text = opt,
                                fontSize = 30.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Color.White
                            )
                        }
                    }
                }
            }
        }

        StarBurstParticles(triggerKey = burstCount)
    }
}

@Composable
private fun BigAppleBox(
    emoji: String,
    text: String,
    isMystery: Boolean,
    scale: Float
) {
    Card(
        shape = RoundedCornerShape(30.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isMystery) Color(0xFFFEF08A) else Color.White
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 10.dp),
        modifier = Modifier
            .size(140.dp)
            .scale(scale)
            .border(
                width = 4.dp,
                color = if (isMystery) Color(0xFFF59E0B) else Color(0xFF16A34A),
                shape = RoundedCornerShape(30.dp)
            )
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxSize()
        ) {
            Text(text = emoji, fontSize = 40.sp)
            Text(
                text = text,
                fontSize = 48.sp,
                fontWeight = FontWeight.ExtraBold,
                color = if (isMystery) Color(0xFFDC2626) else Color(0xFF0F172A)
            )
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED 2D ARCADE GAMES FOR UNITS 2–11 & REVIEWS 1–4 (PAGES 8 TO 120)
// Includes: Rocket Shooter 🚀, Monkey Catch 🐒, Frog Lilypad Hop 🐸,
//           Treasure Chest Unlock 💎, Jungle/Turbo Race 🐢🏎️, Rainbow Bridge 🌈
// ═══════════════════════════════════════════════════════════════════════════════
@Composable
private fun SuperFunUnitArcadeStageGame(
    stageMeta: BookPageMeta,
    nextStageLabel: String,
    explainLang: ExplainLang,
    onSpeak: (String, TrilingualText) -> Unit,
    onDing: (Boolean) -> Unit,
    onStageCompleted: () -> Unit
) {
    val rounds = stageMeta.rounds
    var currentIdx by remember { mutableIntStateOf(0) }
    var hearts by remember { mutableIntStateOf(3) }
    var stars by remember { mutableIntStateOf(0) }
    var burstCount by remember { mutableIntStateOf(0) }
    var showGuideHand by remember { mutableStateOf(false) }

    val isWon = currentIdx >= rounds.size
    val isLost = hearts <= 0 && !isWon
    val activeRound = rounds.getOrNull(currentIdx) ?: rounds.first()

    val shuffledOptions = remember(currentIdx, stageMeta.pageNumber) {
        activeRound.options.shuffled()
    }

    fun restart() {
        currentIdx = 0
        hearts = 3
        stars = 0
        showGuideHand = false
    }

    LaunchedEffect(currentIdx, explainLang) {
        if (!isWon && !isLost) {
            showGuideHand = false
            delay(200)
            onSpeak(activeRound.promptTitle, activeRound.promptSub)
            delay(3600)
            showGuideHand = true
        }
    }

    LaunchedEffect(isWon) {
        if (isWon) {
            delay(1800)
            onStageCompleted()
        }
    }

    LaunchedEffect(isLost) {
        if (isLost) {
            delay(2000)
            restart()
        }
    }

    val infinite = rememberInfiniteTransition(label = "unit_arcade")
    val bounceY by infinite.animateFloat(
        initialValue = -10f,
        targetValue = 10f,
        animationSpec = infiniteRepeatable(tween(800, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "bounceY"
    )
    val swayX by infinite.animateFloat(
        initialValue = -12f,
        targetValue = 12f,
        animationSpec = infiniteRepeatable(tween(1050, easing = FastOutSlowInEasing), RepeatMode.Reverse),
        label = "swayX"
    )
    val handPulse by infinite.animateFloat(
        initialValue = 0.9f,
        targetValue = 1.25f,
        animationSpec = infiniteRepeatable(tween(450), RepeatMode.Reverse),
        label = "handPulse"
    )

    val progressFraction by animateFloatAsState(
        targetValue = if (rounds.isEmpty()) 0f else currentIdx.toFloat() / rounds.size.toFloat(),
        animationSpec = spring(),
        label = "progress"
    )

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.fillMaxSize()
        ) {
            KidGameTopBar(
                hearts = hearts,
                stars = stars,
                stepDone = currentIdx,
                stepTotal = rounds.size,
                onSpeakClick = { onSpeak(activeRound.promptTitle, activeRound.voiceExplain) },
                onRestart = ::restart
            )

            if (isWon) {
                ArcadeVictoryOverlay(
                    stageLabel = stageMeta.pillLabel,
                    nextStageLabel = nextStageLabel,
                    onNext = onStageCompleted
                )
            } else if (isLost) {
                ArcadeTryAgainOverlay(onRestart = ::restart)
            } else {
                // ─── 1. ANIMATED 2D GAME WORLD SCENE FOR THIS MECHANIC ───
                Card(
                    shape = RoundedCornerShape(28.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.94f)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 14.dp, vertical = 4.dp)
                        .border(4.dp, Color(0xFF0284C7), RoundedCornerShape(28.dp))
                        .clickable { onSpeak(activeRound.promptTitle, activeRound.voiceExplain) }
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 16.dp, vertical = 10.dp)
                    ) {
                        // Visual Animated Mini-Stage Strip (Rocket / Race / Frog / Rainbow / Chest / Monkey)
                        Box(
                            contentAlignment = Alignment.CenterStart,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(48.dp)
                                .clip(RoundedCornerShape(18.dp))
                                .background(
                                    when (stageMeta.mechanic) {
                                        ArcadeStageMechanic.ROCKET_SHOOTER -> Color(0xFF0F172A)
                                        ArcadeStageMechanic.FROG_LILYPAD_HOP -> Color(0xFFBAE6FD)
                                        ArcadeStageMechanic.RACE_TRACK_TURBO -> Color(0xFFDCFCE7)
                                        ArcadeStageMechanic.RAINBOW_BRIDGE_BUILDER -> Color(0xFFFDF4FF)
                                        ArcadeStageMechanic.TREASURE_CHEST_UNLOCK -> Color(0xFFFEF3C7)
                                        else -> Color(0xFFECFCCB)
                                    }
                                )
                                .padding(horizontal = 14.dp)
                        ) {
                            // Track line or rainbow stripes
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth(progressFraction.coerceIn(0.08f, 1f))
                                    .height(14.dp)
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(
                                        Brush.horizontalGradient(
                                            listOf(Color(0xFFEF4444), Color(0xFFF59E0B), Color(0xFF22C55E), Color(0xFF3B82F6))
                                        )
                                    )
                            )

                            Row(
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text(
                                    text = "${stageMeta.mascotEmoji} ${stageMeta.gameBadge}",
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = if (stageMeta.mechanic == ArcadeStageMechanic.ROCKET_SHOOTER) Color.White else Color(0xFF0F172A),
                                    modifier = Modifier.offset(x = (swayX * 0.4f).dp)
                                )
                                Text(
                                    text = when (stageMeta.mechanic) {
                                        ArcadeStageMechanic.ROCKET_SHOOTER -> "🪐 ⭐ 🌙"
                                        ArcadeStageMechanic.FROG_LILYPAD_HOP -> "🪷 🪷 👑"
                                        ArcadeStageMechanic.RACE_TRACK_TURBO -> "🌲 🏁 🏆"
                                        ArcadeStageMechanic.RAINBOW_BRIDGE_BUILDER -> "☁️ 🌈 🏰"
                                        ArcadeStageMechanic.TREASURE_CHEST_UNLOCK -> "🗝️ 💎 👑"
                                        else -> "🌴 🧺 ⭐"
                                    },
                                    fontSize = 18.sp
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        // Big Emoji + Question Prompt
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = activeRound.promptEmoji,
                                fontSize = 54.sp,
                                modifier = Modifier.offset(y = (bounceY * 0.5f).dp)
                            )
                            Spacer(modifier = Modifier.width(12.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = activeRound.promptTitle,
                                    fontSize = 20.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color(0xFF1E3A8A)
                                )
                                Text(
                                    text = activeRound.promptSub.get(explainLang),
                                    fontSize = 16.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF0F172A)
                                )
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(10.dp))

                // ─── 2. THREE GIANT ANIMATED TARGET CARDS TO TAP! ───
                val cardThemes = listOf(
                    Triple(Color(0xFFFFF7ED), Color(0xFFEA580C), "🟠"),
                    Triple(Color(0xFFEFF6FF), Color(0xFF2563EB), "🔵"),
                    Triple(Color(0xFFF0FDF4), Color(0xFF16A34A), "🟢")
                )

                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(horizontal = 12.dp, vertical = 10.dp)
                ) {
                    shuffledOptions.forEachIndexed { idx, optionText ->
                        val isCorrect = optionText == activeRound.correctAnswer
                        val (bgCol, borderCol, badgeIcon) = cardThemes[idx % cardThemes.size]
                        val yAnim = if (idx % 2 == 0) bounceY else -bounceY

                        Box(
                            contentAlignment = Alignment.Center,
                            modifier = Modifier
                                .weight(1f)
                                .offset(y = yAnim.dp)
                        ) {
                            Card(
                                shape = RoundedCornerShape(30.dp),
                                colors = CardDefaults.cardColors(containerColor = bgCol),
                                elevation = CardDefaults.cardElevation(defaultElevation = 10.dp),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(205.dp)
                                    .border(
                                        width = if (isCorrect && showGuideHand) 5.dp else 4.dp,
                                        color = if (isCorrect && showGuideHand) Color(0xFF22C55E) else borderCol,
                                        shape = RoundedCornerShape(30.dp)
                                    )
                                    .clickable {
                                        if (isCorrect) {
                                            onDing(true)
                                            burstCount++
                                            stars += 25
                                            onSpeak(optionText, activeRound.voiceExplain)
                                            currentIdx++
                                        } else {
                                            onDing(false)
                                            hearts = (hearts - 1).coerceAtLeast(0)
                                            showGuideHand = true
                                            onSpeak(activeRound.promptTitle, activeRound.voiceExplain)
                                        }
                                    }
                            ) {
                                Column(
                                    horizontalAlignment = Alignment.CenterHorizontally,
                                    verticalArrangement = Arrangement.Center,
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .padding(10.dp)
                                ) {
                                    Text(
                                        text = when (stageMeta.mechanic) {
                                            ArcadeStageMechanic.ROCKET_SHOOTER -> "⭐"
                                            ArcadeStageMechanic.MONKEY_FRUIT_CATCH -> "🍎"
                                            ArcadeStageMechanic.FROG_LILYPAD_HOP -> "🪷"
                                            ArcadeStageMechanic.TREASURE_CHEST_UNLOCK -> "🗝️"
                                            ArcadeStageMechanic.RACE_TRACK_TURBO -> "⚡"
                                            else -> badgeIcon
                                        },
                                        fontSize = 46.sp
                                    )
                                    Spacer(modifier = Modifier.height(10.dp))
                                    Text(
                                        text = optionText,
                                        fontSize = if (optionText.length > 12) 18.sp else 25.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = Color(0xFF0F172A),
                                        textAlign = TextAlign.Center
                                    )
                                }
                            }

                            if (isCorrect && showGuideHand) {
                                Text(
                                    text = "👆",
                                    fontSize = 48.sp,
                                    modifier = Modifier
                                        .align(Alignment.BottomCenter)
                                        .offset(y = 22.dp)
                                        .scale(handPulse)
                                )
                            }
                        }
                    }
                }
            }
        }

        StarBurstParticles(triggerKey = burstCount)
    }
}

@Composable
private fun ArcadeVictoryOverlay(
    stageLabel: String,
    nextStageLabel: String,
    onNext: () -> Unit
) {
    val infinite = rememberInfiniteTransition(label = "win")
    val trophyScale by infinite.animateFloat(
        initialValue = 0.9f,
        targetValue = 1.18f,
        animationSpec = infiniteRepeatable(tween(550), RepeatMode.Reverse),
        label = "trophy"
    )

    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp)
    ) {
        Card(
            shape = RoundedCornerShape(30.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFFEFCE8)),
            elevation = CardDefaults.cardElevation(defaultElevation = 12.dp),
            modifier = Modifier
                .fillMaxWidth()
                .border(4.dp, Color(0xFFF59E0B), RoundedCornerShape(30.dp))
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.EmojiEvents,
                    contentDescription = null,
                    tint = Color(0xFFF59E0B),
                    modifier = Modifier
                        .size(88.dp)
                        .scale(trophyScale)
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "🎉 SUPER STAR! $stageLabel WON! 🎉",
                    fontSize = 22.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color(0xFFB45309),
                    textAlign = TextAlign.Center
                )
                Spacer(modifier = Modifier.height(14.dp))
                Button(
                    onClick = onNext,
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF16A34A)),
                    shape = RoundedCornerShape(20.dp),
                    modifier = Modifier.height(56.dp)
                ) {
                    Text(
                        text = "Next Stage ($nextStageLabel) ➔",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.ExtraBold
                    )
                }
            }
        }
    }
}

@Composable
private fun ArcadeTryAgainOverlay(onRestart: () -> Unit) {
    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp)
    ) {
        Card(
            shape = RoundedCornerShape(30.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFFEF2F2)),
            modifier = Modifier
                .fillMaxWidth()
                .border(4.dp, Color(0xFFEF4444), RoundedCornerShape(30.dp))
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp)
            ) {
                Text(text = "🐝💪", fontSize = 58.sp)
                Text(
                    text = "Let's Try Again!",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Color(0xFFB91C1C)
                )
                Spacer(modifier = Modifier.height(12.dp))
                Button(
                    onClick = onRestart,
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFDC2626)),
                    shape = RoundedCornerShape(20.dp)
                ) {
                    Text("Play Again", fontSize = 18.sp, fontWeight = FontWeight.ExtraBold)
                }
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LESSON & EXERCISE TABS (FOR ALL PAGES & UNITS, WITH URDU & PASHTO VOICE)
// ═══════════════════════════════════════════════════════════════════════════════
@Composable
private fun SimpleLessonTab(
    stageMeta: BookPageMeta,
    explainLang: ExplainLang,
    onSpeak: (String, TrilingualText) -> Unit
) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        // Stage Banner Header
        item {
            Card(
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFF1E3A8A)),
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { onSpeak(stageMeta.titleEn, stageMeta.subtitle) }
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text(text = stageMeta.mascotEmoji, fontSize = 42.sp)
                    Spacer(modifier = Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = stageMeta.titleEn,
                            fontSize = 18.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(
                            text = stageMeta.subtitle.get(explainLang),
                            fontSize = 14.sp,
                            color = Color(0xFFBAE6FD)
                        )
                    }
                    Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color(0xFFFACC15))
                }
            }
        }

        when (stageMeta.pageNumber) {
            2 -> {
                itemsIndexed(PAGE_2_OBJECTS) { _, item ->
                    Card(
                        shape = RoundedCornerShape(20.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSpeak(item.word, item.explanation) }
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(14.dp)
                        ) {
                            Text(text = item.emoji, fontSize = 48.sp)
                            Spacer(modifier = Modifier.width(12.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(text = item.word.uppercase(), fontSize = 22.sp, fontWeight = FontWeight.ExtraBold)
                                Text(text = item.explanation.get(explainLang), fontSize = 14.sp, color = Color(0xFF334155))
                            }
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color(0xFF2563EB))
                        }
                    }
                }
            }
            3, 6 -> {
                itemsIndexed(ALPHABET_26) { _, item ->
                    val trilingual = TrilingualText(
                        en = item.explain(ExplainLang.ENGLISH),
                        ur = item.explain(ExplainLang.URDU),
                        ps = item.explain(ExplainLang.PASHTO)
                    )
                    Card(
                        shape = RoundedCornerShape(18.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSpeak(item.pairText, trilingual) }
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(14.dp)
                        ) {
                            Text(
                                text = item.pairText,
                                fontSize = 30.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Color(0xFF1E3A8A)
                            )
                            Spacer(modifier = Modifier.width(14.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(text = "${item.sampleEmoji} ${item.sampleWord}", fontSize = 17.sp, fontWeight = FontWeight.ExtraBold)
                                Text(text = trilingual.get(explainLang), fontSize = 13.sp, color = Color(0xFF475569))
                            }
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color(0xFF2563EB))
                        }
                    }
                }
            }
            4 -> {
                itemsIndexed(PAGE_4_FLOWERS) { _, flower ->
                    Card(
                        shape = RoundedCornerShape(18.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSpeak(flower.letter, flower.explain) }
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(14.dp)
                        ) {
                            Text(text = "🌸 ${flower.letter}", fontSize = 30.sp, fontWeight = FontWeight.ExtraBold)
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = flower.explain.get(explainLang),
                                fontSize = 14.sp,
                                modifier = Modifier.weight(1f)
                            )
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color(0xFF2563EB))
                        }
                    }
                }
            }
            5 -> {
                itemsIndexed(PAGE_5_TRAIN_PARTS) { _, part ->
                    Card(
                        shape = RoundedCornerShape(18.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSpeak(part.nameEn, part.instruction) }
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(14.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(34.dp)
                                    .clip(CircleShape)
                                    .background(Color(part.targetColorHex))
                            )
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = part.instruction.get(explainLang),
                                fontSize = 14.sp,
                                modifier = Modifier.weight(1f)
                            )
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color(0xFF2563EB))
                        }
                    }
                }
            }
            7 -> {
                itemsIndexed(PAGE_7_APPLE_PUZZLES) { _, puzzle ->
                    Card(
                        shape = RoundedCornerShape(18.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSpeak(puzzle.correctAnswer, puzzle.explain) }
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(14.dp)
                        ) {
                            Text(text = "🍎 ${puzzle.correctAnswer}", fontSize = 28.sp, fontWeight = FontWeight.ExtraBold)
                            Spacer(modifier = Modifier.width(12.dp))
                            Text(
                                text = puzzle.explain.get(explainLang),
                                fontSize = 14.sp,
                                modifier = Modifier.weight(1f)
                            )
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color(0xFF2563EB))
                        }
                    }
                }
            }
            else -> {
                itemsIndexed(stageMeta.lessons) { _, lesson ->
                    Card(
                        shape = RoundedCornerShape(20.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSpeak(lesson.titleEn, lesson.explain) }
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(16.dp)
                        ) {
                            Text(text = lesson.emoji, fontSize = 46.sp)
                            Spacer(modifier = Modifier.width(14.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = lesson.titleEn,
                                    fontSize = 19.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color(0xFF1E3A8A)
                                )
                                Spacer(modifier = Modifier.height(2.dp))
                                Text(
                                    text = lesson.subtitleEn,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF0284C7)
                                )
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(
                                    text = lesson.explain.get(explainLang),
                                    fontSize = 14.sp,
                                    color = Color(0xFF334155)
                                )
                            }
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color(0xFF2563EB))
                        }
                    }
                }

                itemsIndexed(stageMeta.rounds) { _, r ->
                    Card(
                        shape = RoundedCornerShape(18.dp),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC)),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onSpeak(r.correctAnswer, r.voiceExplain) }
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(14.dp)
                        ) {
                            Text(text = r.promptEmoji, fontSize = 36.sp)
                            Spacer(modifier = Modifier.width(12.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = "${r.promptTitle}: ${r.correctAnswer}",
                                    fontSize = 17.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color(0xFF0F172A)
                                )
                                Text(
                                    text = r.voiceExplain.get(explainLang),
                                    fontSize = 13.sp,
                                    color = Color(0xFF475569)
                                )
                            }
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color(0xFF16A34A))
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun SimpleExerciseTab(
    stageMeta: BookPageMeta,
    explainLang: ExplainLang,
    onSpeak: (String, TrilingualText) -> Unit,
    onDing: (Boolean) -> Unit
) {
    val chosen = remember(stageMeta.pageNumber) { mutableStateMapOf<Int, String>() }

    val quizItems = remember(stageMeta.pageNumber) {
        if (stageMeta.exercises.isNotEmpty() || stageMeta.rounds.isNotEmpty()) {
            val fromRounds = stageMeta.rounds.map { r ->
                ExerciseQuizItem(
                    emoji = r.promptEmoji,
                    question = r.promptSub,
                    correctAnswer = r.correctAnswer,
                    options = r.options,
                    explain = r.voiceExplain
                )
            }
            (stageMeta.exercises + fromRounds).distinctBy { it.question.en }
        } else {
            PAGE_2_OBJECTS.take(5).map { obj ->
                ExerciseQuizItem(
                    emoji = obj.emoji,
                    question = obj.explanation,
                    correctAnswer = obj.word,
                    options = listOf(obj.word, "sun", "bed", "top").distinct().take(3),
                    explain = obj.explanation
                )
            }
        }
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(14.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        itemsIndexed(quizItems) { idx, q ->
            val picked = chosen[idx]
            Card(
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(text = q.emoji, fontSize = 42.sp)
                        Spacer(modifier = Modifier.width(10.dp))
                        Text(
                            text = q.question.get(explainLang),
                            fontSize = 15.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF0F172A),
                            modifier = Modifier.weight(1f)
                        )
                        IconButton(onClick = { onSpeak(q.correctAnswer, q.explain) }) {
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color(0xFF2563EB))
                        }
                    }
                    Spacer(modifier = Modifier.height(10.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        q.options.forEach { opt ->
                            val isSelected = picked == opt
                            val isRight = opt == q.correctAnswer
                            Surface(
                                shape = RoundedCornerShape(16.dp),
                                color = when {
                                    isSelected && isRight -> Color(0xFF22C55E)
                                    isSelected && !isRight -> Color(0xFFEF4444)
                                    else -> Color(0xFFF1F5F9)
                                },
                                modifier = Modifier
                                    .weight(1f)
                                    .clickable {
                                        chosen[idx] = opt
                                        onDing(isRight)
                                        onSpeak(opt, q.explain)
                                    }
                            ) {
                                Box(
                                    contentAlignment = Alignment.Center,
                                    modifier = Modifier.padding(vertical = 12.dp, horizontal = 6.dp)
                                ) {
                                    Text(
                                        text = opt,
                                        fontSize = 16.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = if (isSelected) Color.White else Color(0xFF0F172A),
                                        textAlign = TextAlign.Center
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
