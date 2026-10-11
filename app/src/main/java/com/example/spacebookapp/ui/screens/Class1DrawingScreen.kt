package com.example.spacebookapp.ui.screens

import android.speech.tts.TextToSpeech
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectDragGestures
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.Brush
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.SportsEsports
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
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
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import java.util.Locale
import kotlin.math.atan2
import kotlin.math.cos
import kotlin.math.hypot
import kotlin.math.sin

@Composable
fun Class1DrawingScreen(onBack: () -> Unit) {
    val context = LocalContext.current
    val stages = Class1DrawingData.stages
    var currentStageIndex by remember { mutableIntStateOf(0) }
    var selectedTab by remember { mutableIntStateOf(0) } // 0 = Game, 1 = Lesson, 2 = Exercise
    var explainLang by remember { mutableStateOf(ExplainLang.URDU) }
    var completedStageIds by remember { mutableStateOf(setOf<Int>()) }

    var tts by remember { mutableStateOf<TextToSpeech?>(null) }
    DisposableEffect(context) {
        var engine: TextToSpeech? = null
        engine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                engine?.language = Locale.US
                tts = engine
            }
        }
        onDispose { engine?.shutdown() }
    }

    fun speak(textEn: String, textUr: String = textEn, textPs: String = textUr) {
        val engine = tts ?: return
        when (explainLang) {
            ExplainLang.ENGLISH -> {
                engine.language = Locale.US
                engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "draw_tts")
            }
            ExplainLang.URDU -> {
                val urLocale = Locale.forLanguageTag("ur-PK")
                val res = engine.setLanguage(urLocale)
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    engine.language = Locale.US
                    engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "draw_tts")
                } else {
                    engine.speak(textUr, TextToSpeech.QUEUE_FLUSH, null, "draw_tts")
                }
            }
            ExplainLang.PASHTO -> {
                val psLocale = Locale.forLanguageTag("ps-AF")
                val res = engine.setLanguage(psLocale)
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    val urRes = engine.setLanguage(Locale.forLanguageTag("ur-PK"))
                    if (urRes == TextToSpeech.LANG_MISSING_DATA || urRes == TextToSpeech.LANG_NOT_SUPPORTED) {
                        engine.language = Locale.US
                        engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "draw_tts")
                    } else {
                        engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "draw_tts")
                    }
                } else {
                    engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "draw_tts")
                }
            }
        }
    }

    val stage = stages[currentStageIndex]

    LaunchedEffect(currentStageIndex, selectedTab, explainLang) {
        delay(250)
        if (selectedTab == 0) {
            speak(stage.instructionEn, stage.instructionUr, stage.instructionPs)
        }
    }

    fun onStageGameComplete() {
        completedStageIds = completedStageIds + stage.id
        speak(
            "Beautiful artwork! Moving to the next page!",
            "شاباش! بہت خوبصورت ڈرائنگ! اگلے صفحے پر جا رہے ہیں!",
            "آفرین! ډېر ښکلی رسم! بل مخ ته ځو!"
        )
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.horizontalGradient(
                            listOf(Color(0xFF311B92), stage.themeColor)
                        )
                    )
                    .statusBarsPadding()
                    .padding(bottom = 8.dp)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 10.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(
                        onClick = onBack,
                        modifier = Modifier
                            .size(36.dp)
                            .background(Color.White.copy(alpha = 0.18f), CircleShape)
                    ) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                    Spacer(Modifier.width(10.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "Drawing Class 1 • ${stage.pageNumber}",
                            color = Color(0xFFFFF59D),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = stage.titleEn,
                            color = Color.White,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            maxLines = 1
                        )
                    }

                    Row(
                        modifier = Modifier
                            .background(Color.Black.copy(alpha = 0.28f), RoundedCornerShape(16.dp))
                            .padding(2.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        ExplainLang.entries.forEach { lang ->
                            val selected = explainLang == lang
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(14.dp))
                                    .background(if (selected) Color(0xFFFFD54F) else Color.Transparent)
                                    .clickable { explainLang = lang }
                                    .padding(horizontal = 8.dp, vertical = 4.dp)
                            ) {
                                Text(
                                    text = lang.label,
                                    color = if (selected) Color(0xFF1E293B) else Color.White,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }

                // Horizontal Page Selector (Pages 1 to 32)
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState())
                        .padding(horizontal = 10.dp, vertical = 2.dp),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    stages.forEachIndexed { index, item ->
                        val isCurrent = index == currentStageIndex
                        val isDone = completedStageIds.contains(item.id)
                        Surface(
                            shape = RoundedCornerShape(14.dp),
                            color = when {
                                isCurrent -> Color.White
                                isDone -> Color(0xFF00E676).copy(alpha = 0.28f)
                                else -> Color.White.copy(alpha = 0.16f)
                            },
                            border = if (isCurrent) BorderStroke(2.dp, Color(0xFFFFD54F)) else null,
                            modifier = Modifier.clickable { currentStageIndex = index }
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                if (isDone) {
                                    Icon(
                                        Icons.Default.CheckCircle,
                                        contentDescription = null,
                                        tint = if (isCurrent) Color(0xFF2E7D32) else Color(0xFF69F0AE),
                                        modifier = Modifier.size(13.dp)
                                    )
                                    Spacer(Modifier.width(4.dp))
                                }
                                Text(
                                    text = "P${item.id}",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = if (isCurrent) Color(0xFF0F172A) else Color.White
                                )
                            }
                        }
                    }
                }

                Spacer(Modifier.height(6.dp))

                // 3-Tab Switcher
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 12.dp),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    val tabs = listOf(
                        Triple(0, "🎨 Art Game", Icons.Default.SportsEsports),
                        Triple(1, "📖 Lesson", Icons.Default.MenuBook),
                        Triple(2, "✏️ Exercise", Icons.Default.Quiz)
                    )
                    tabs.forEach { (idx, title, icon) ->
                        val active = selectedTab == idx
                        Surface(
                            shape = RoundedCornerShape(14.dp),
                            color = if (active) Color(0xFFFFD54F) else Color.White.copy(alpha = 0.16f),
                            modifier = Modifier
                                .weight(1f)
                                .clickable { selectedTab = idx }
                        ) {
                            Row(
                                modifier = Modifier.padding(vertical = 7.dp),
                                horizontalArrangement = Arrangement.Center,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    icon,
                                    contentDescription = title,
                                    tint = if (active) Color(0xFF1E293B) else Color.White,
                                    modifier = Modifier.size(15.dp)
                                )
                                Spacer(Modifier.width(4.dp))
                                Text(
                                    text = title,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = if (active) Color(0xFF1E293B) else Color.White
                                )
                            }
                        }
                    }
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFFDFBF7))
                .padding(innerPadding)
        ) {
            when (selectedTab) {
                0 -> DrawingInteractiveStudioTab(
                    stage = stage,
                    explainLang = explainLang,
                    onSpeak = ::speak,
                    onStageComplete = {
                        onStageGameComplete()
                        if (currentStageIndex < stages.lastIndex) {
                            currentStageIndex += 1
                        }
                    }
                )
                1 -> DrawingLessonTab(
                    stage = stage,
                    explainLang = explainLang,
                    onSpeak = ::speak
                )
                2 -> DrawingExerciseTab(
                    stage = stage,
                    explainLang = explainLang,
                    onSpeak = ::speak,
                    onNextStage = {
                        if (currentStageIndex < stages.lastIndex) {
                            currentStageIndex += 1
                            selectedTab = 0
                        }
                    }
                )
            }
        }
    }
}

@Composable
private fun DrawingLanguageBanner(
    stageTitleEn: String,
    stageTitleUr: String,
    stageTitlePs: String,
    instructionEn: String,
    instructionUr: String,
    instructionPs: String,
    explainLang: ExplainLang,
    themeColor: Color,
    onSpeak: (String, String, String) -> Unit
) {
    Surface(
        shape = RoundedCornerShape(18.dp),
        color = Color.White,
        border = BorderStroke(1.5.dp, themeColor.copy(alpha = 0.35f)),
        shadowElevation = 3.dp,
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                val title = when (explainLang) {
                    ExplainLang.ENGLISH -> stageTitleEn
                    ExplainLang.URDU -> "$stageTitleEn • $stageTitleUr"
                    ExplainLang.PASHTO -> "$stageTitleEn • $stageTitlePs"
                }
                val body = when (explainLang) {
                    ExplainLang.ENGLISH -> instructionEn
                    ExplainLang.URDU -> instructionUr
                    ExplainLang.PASHTO -> instructionPs
                }
                Text(
                    text = title,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = themeColor
                )
                Spacer(Modifier.height(3.dp))
                Text(
                    text = body,
                    fontSize = 13.sp,
                    color = Color(0xFF334155),
                    lineHeight = 18.sp,
                    fontWeight = FontWeight.Medium
                )
            }
            Spacer(Modifier.width(8.dp))
            IconButton(
                onClick = { onSpeak(instructionEn, instructionUr, instructionPs) },
                modifier = Modifier
                    .size(42.dp)
                    .background(themeColor.copy(alpha = 0.14f), CircleShape)
            ) {
                Icon(
                    Icons.AutoMirrored.Filled.VolumeUp,
                    contentDescription = "Speak",
                    tint = themeColor
                )
            }
        }
    }
}

@Composable
private fun DrawingInteractiveStudioTab(
    stage: DrawingBookStage,
    explainLang: ExplainLang,
    onSpeak: (String, String, String) -> Unit,
    onStageComplete: () -> Unit
) {
    // State per page
    var tracedDotIndex by remember(stage.id) { mutableIntStateOf(0) }
    var selectedPaletteIndex by remember(stage.id) { mutableIntStateOf(0) }
    var paintedZones by remember(stage.id) { mutableStateOf(setOf<Int>()) }
    var showWinBanner by remember(stage.id) { mutableStateOf(false) }

    val totalDots = stage.dotPathNorm.size
    val isDotsDone = tracedDotIndex >= totalDots - 1
    val isAllPainted = paintedZones.size >= stage.colorZones.size

    val infiniteTransition = rememberInfiniteTransition(label = "drawing_anim")
    val pulse by infiniteTransition.animateFloat(
        initialValue = 0.90f,
        targetValue = 1.14f,
        animationSpec = infiniteRepeatable(tween(650), RepeatMode.Reverse),
        label = "pulse"
    )
    val floatOffset by infiniteTransition.animateFloat(
        initialValue = -5f,
        targetValue = 5f,
        animationSpec = infiniteRepeatable(tween(1100), RepeatMode.Reverse),
        label = "float"
    )

    LaunchedEffect(isDotsDone, isAllPainted) {
        if (isDotsDone && isAllPainted && !showWinBanner) {
            showWinBanner = true
            delay(1700)
            onStageComplete()
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(12.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        DrawingLanguageBanner(
            stageTitleEn = "${stage.pageNumber}: ${stage.titleEn}",
            stageTitleUr = stage.titleUr,
            stageTitlePs = stage.titlePs,
            instructionEn = stage.instructionEn,
            instructionUr = stage.instructionUr,
            instructionPs = stage.instructionPs,
            explainLang = explainLang,
            themeColor = stage.themeColor,
            onSpeak = onSpeak
        )

        Spacer(Modifier.height(8.dp))

        // Step Progress Bar (Step 1: Join Dots -> Step 2: Colour Picture)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                shape = RoundedCornerShape(12.dp),
                color = if (!isDotsDone) stage.themeColor else Color(0xFF2E7D32),
                modifier = Modifier.weight(1f)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 7.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(
                        if (isDotsDone) Icons.Default.CheckCircle else Icons.Default.Brush,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(Modifier.width(6.dp))
                    Text(
                        text = if (isDotsDone) "1. Dots Joined! ✓" else "1. Join Dots (${tracedDotIndex + 1}/$totalDots)",
                        color = Color.White,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.ExtraBold
                    )
                }
            }

            Surface(
                shape = RoundedCornerShape(12.dp),
                color = when {
                    isAllPainted -> Color(0xFF2E7D32)
                    isDotsDone -> stage.themeColor
                    else -> Color(0xFFCBD5E1)
                },
                modifier = Modifier.weight(1f)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 7.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(
                        if (isAllPainted) Icons.Default.CheckCircle else Icons.Default.Palette,
                        contentDescription = null,
                        tint = Color.White,
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(Modifier.width(6.dp))
                    Text(
                        text = "2. Colour (${paintedZones.size}/${stage.colorZones.size})",
                        color = Color.White,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.ExtraBold
                    )
                }
            }

            IconButton(
                onClick = {
                    tracedDotIndex = 0
                    paintedZones = emptySet()
                    selectedPaletteIndex = 0
                    showWinBanner = false
                },
                modifier = Modifier
                    .size(36.dp)
                    .background(Color(0xFFE2E8F0), CircleShape)
            ) {
                Icon(Icons.Default.Refresh, contentDescription = "Reset", tint = Color(0xFF334155))
            }
        }

        Spacer(Modifier.height(10.dp))

        // celebratory win banner
        AnimatedVisibility(visible = showWinBanner) {
            Surface(
                shape = RoundedCornerShape(20.dp),
                color = Color(0xFF00C853),
                shadowElevation = 8.dp,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 10.dp)
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.Center
                ) {
                    Icon(
                        Icons.Default.EmojiEvents,
                        contentDescription = null,
                        tint = Color(0xFFFFD54F),
                        modifier = Modifier
                            .size(34.dp)
                            .scale(pulse)
                    )
                    Spacer(Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "Awesome Masterpiece! 🎨✨",
                            color = Color.White,
                            fontSize = 17.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                        Text(
                            text = "Opening next drawing page automatically...",
                            color = Color.White.copy(alpha = 0.92f),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        // 2D Interactive Drawing & Colouring Canvas
        Surface(
            shape = RoundedCornerShape(24.dp),
            color = Color.White,
            border = BorderStroke(3.dp, stage.themeColor.copy(alpha = 0.45f)),
            shadowElevation = 6.dp,
            modifier = Modifier
                .fillMaxWidth()
                .height(320.dp)
        ) {
            BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
                val canvasW = constraints.maxWidth.toFloat()
                val canvasH = constraints.maxHeight.toFloat()

                Canvas(
                    modifier = Modifier
                        .fillMaxSize()
                        .pointerInput(stage.id, isDotsDone, selectedPaletteIndex, paintedZones) {
                            detectTapGestures { tapOffset ->
                                if (!isDotsDone) {
                                    // Allow tapping next dot or nearby dot to advance smoothly
                                    val nextIdx = (tracedDotIndex + 1).coerceAtMost(totalDots - 1)
                                    val targetPt = Offset(
                                        stage.dotPathNorm[nextIdx].x * size.width,
                                        stage.dotPathNorm[nextIdx].y * size.height
                                    )
                                    if (hypot(tapOffset.x - targetPt.x, tapOffset.y - targetPt.y) < size.width * 0.22f) {
                                        tracedDotIndex = (tracedDotIndex + 2).coerceAtMost(totalDots - 1)
                                        if (tracedDotIndex >= totalDots - 1) {
                                            onSpeak(
                                                "Dots joined! Now tap a colour below and tap the picture to paint!",
                                                "نقطے مل گئے! اب نیچے سے رنگ منتخب کریں اور تصویر میں رنگ بھریں!",
                                                "ټکي سره ونښتل! اوس لاندې رنګ غوره کړئ او انځور رنګ کړئ!"
                                            )
                                        }
                                    }
                                } else {
                                    // Step 2: Check if user tapped any color zone (or paint currently selected zone)
                                    var hitZone = -1
                                    var bestDist = Float.MAX_VALUE
                                    stage.colorZones.forEachIndexed { idx, zone ->
                                        val zx = zone.centerNorm.x * size.width
                                        val zy = zone.centerNorm.y * size.height
                                        val d = hypot(tapOffset.x - zx, tapOffset.y - zy)
                                        if (d < bestDist && d < size.width * 0.28f) {
                                            bestDist = d
                                            hitZone = idx
                                        }
                                    }
                                    val targetZone = if (hitZone != -1) hitZone else selectedPaletteIndex
                                    if (targetZone in stage.colorZones.indices && !paintedZones.contains(targetZone)) {
                                        paintedZones = paintedZones + targetZone
                                        val z = stage.colorZones[targetZone]
                                        onSpeak(
                                            "${z.labelEn} painted ${z.colorNameEn}!",
                                            "${z.labelUr} مکمل!",
                                            "${z.labelPs} رنګ شو!"
                                        )
                                        // Advance selected palette to next unpainted zone
                                        val nextUnpainted = stage.colorZones.indices.firstOrNull {
                                            it != targetZone && !paintedZones.contains(it)
                                        }
                                        if (nextUnpainted != null) {
                                            selectedPaletteIndex = nextUnpainted
                                        }
                                    }
                                }
                            }
                        }
                        .pointerInput(stage.id, isDotsDone) {
                            detectDragGestures { change, _ ->
                                change.consume()
                                if (!isDotsDone) {
                                    val pos = change.position
                                    // Check up to 3 dots ahead so smooth finger dragging follows the curve
                                    for (lookAhead in 1..3) {
                                        val candidate = (tracedDotIndex + lookAhead).coerceAtMost(totalDots - 1)
                                        val pt = Offset(
                                            stage.dotPathNorm[candidate].x * size.width,
                                            stage.dotPathNorm[candidate].y * size.height
                                        )
                                        if (hypot(pos.x - pt.x, pos.y - pt.y) < size.width * 0.16f) {
                                            tracedDotIndex = candidate
                                            if (tracedDotIndex >= totalDots - 1) {
                                                onSpeak(
                                                    "Outline complete! Now tap the picture to fill colours!",
                                                    "خاکہ مکمل ہو گیا! اب تصویر پر ٹیپ کر کے رنگ بھریں!",
                                                    "خاکه بشپړه شوه! اوس په انځور کلیک وکړئ او رنګونه ډک کړئ!"
                                                )
                                            }
                                            break
                                        }
                                    }
                                }
                            }
                        }
                ) {
                    // Subtle notebook grid background
                    val gridStep = 28.dp.toPx()
                    var gx = gridStep
                    while (gx < size.width) {
                        drawLine(
                            color = Color(0xFFF1F5F9),
                            start = Offset(gx, 0f),
                            end = Offset(gx, size.height),
                            strokeWidth = 1f
                        )
                        gx += gridStep
                    }
                    var gy = gridStep
                    while (gy < size.height) {
                        drawLine(
                            color = Color(0xFFF1F5F9),
                            start = Offset(0f, gy),
                            end = Offset(size.width, gy),
                            strokeWidth = 1f
                        )
                        gy += gridStep
                    }

                    // Draw the custom 2D vector artwork for this page
                    drawPageArtwork(
                        artworkType = stage.artworkType,
                        colorZones = stage.colorZones,
                        paintedZones = paintedZones,
                        isDotsDone = isDotsDone,
                        floatOffset = floatOffset
                    )

                    // Draw the interactive Dot-Joining Layer
                    val pts = stage.dotPathNorm.map { Offset(it.x * size.width, it.y * size.height) }

                    // 1. Untraced guide dashed path
                    if (pts.size > 1) {
                        val fullGuidePath = Path().apply {
                            moveTo(pts.first().x, pts.first().y)
                            for (i in 1 until pts.size) {
                                lineTo(pts[i].x, pts[i].y)
                            }
                        }
                        drawPath(
                            path = fullGuidePath,
                            color = if (isDotsDone) Color(0xFF1E293B) else Color(0xFF94A3B8),
                            style = Stroke(
                                width = if (isDotsDone) 6f else 4f,
                                cap = StrokeCap.Round,
                                join = StrokeJoin.Round,
                                pathEffect = if (isDotsDone) null else PathEffect.dashPathEffect(floatArrayOf(10f, 12f), 0f)
                            )
                        )
                    }

                    // 2. Traced neon solid path so far
                    if (tracedDotIndex > 0 && pts.size > 1) {
                        val tracedPath = Path().apply {
                            moveTo(pts[0].x, pts[0].y)
                            for (i in 1..tracedDotIndex.coerceAtMost(pts.lastIndex)) {
                                lineTo(pts[i].x, pts[i].y)
                            }
                        }
                        drawPath(
                            path = tracedPath,
                            color = stage.themeColor,
                            style = Stroke(width = 8f, cap = StrokeCap.Round, join = StrokeJoin.Round)
                        )
                    }

                    // 3. Individual dots & directional arrow while tracing
                    if (!isDotsDone) {
                        pts.forEachIndexed { idx, pt ->
                            val isDone = idx <= tracedDotIndex
                            val isNext = idx == tracedDotIndex + 1
                            drawCircle(
                                color = when {
                                    isDone -> Color(0xFF00C853)
                                    isNext -> Color(0xFFFFD600)
                                    else -> Color(0xFF475569)
                                },
                                radius = when {
                                    isNext -> 13f * pulse
                                    isDone -> 8f
                                    else -> 6f
                                },
                                center = pt
                            )
                            if (isNext) {
                                drawCircle(
                                    color = Color(0xFFD50000),
                                    radius = 16f * pulse,
                                    center = pt,
                                    style = Stroke(width = 3f)
                                )
                            }
                        }

                        // Draw directional arrow from current dot to next dot
                        val curPt = pts[tracedDotIndex]
                        val nextPt = pts[(tracedDotIndex + 1).coerceAtMost(pts.lastIndex)]
                        val angle = atan2(nextPt.y - curPt.y, nextPt.x - curPt.x)
                        val mid = Offset((curPt.x + nextPt.x) / 2f, (curPt.y + nextPt.y) / 2f)
                        val arrowLen = 14f
                        val p1 = Offset(
                            mid.x - arrowLen * cos(angle - 0.55f),
                            mid.y - arrowLen * sin(angle - 0.55f)
                        )
                        val p2 = Offset(
                            mid.x - arrowLen * cos(angle + 0.55f),
                            mid.y - arrowLen * sin(angle + 0.55f)
                        )
                        drawLine(Color(0xFFD50000), mid, p1, strokeWidth = 4f, cap = StrokeCap.Round)
                        drawLine(Color(0xFFD50000), mid, p2, strokeWidth = 4f, cap = StrokeCap.Round)
                    } else {
                        // In Colour Fill Mode: draw pulsing target badges on unpainted zones
                        stage.colorZones.forEachIndexed { idx, zone ->
                            val center = Offset(zone.centerNorm.x * size.width, zone.centerNorm.y * size.height)
                            val painted = paintedZones.contains(idx)
                            if (!painted) {
                                val isSelectedZone = idx == selectedPaletteIndex
                                drawCircle(
                                    color = Color.White,
                                    radius = if (isSelectedZone) 20f * pulse else 15f,
                                    center = center
                                )
                                drawCircle(
                                    color = zone.targetColor,
                                    radius = if (isSelectedZone) 15f * pulse else 11f,
                                    center = center
                                )
                                drawCircle(
                                    color = Color(0xFF0F172A),
                                    radius = if (isSelectedZone) 20f * pulse else 15f,
                                    center = center,
                                    style = Stroke(width = 3f)
                                )
                            }
                        }
                    }
                }

                // Helper floating badge at top-right of canvas
                Box(
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .padding(10.dp)
                ) {
                    if (!isDotsDone) {
                        Button(
                            onClick = {
                                tracedDotIndex = totalDots - 1
                                onSpeak(
                                    "Dots joined! Now tap the colour zones to paint!",
                                    "نقطے مل گئے! اب رنگ بھریں!",
                                    "ټکي ونښتل! اوس رنګ ورکړئ!"
                                )
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = stage.themeColor),
                            contentPadding = PaddingValues(horizontal = 12.dp, vertical = 4.dp),
                            shape = RoundedCornerShape(14.dp),
                            modifier = Modifier.height(32.dp)
                        ) {
                            Text("Auto-Trace ✏️", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }
        }

        Spacer(Modifier.height(10.dp))

        // Interactive Paint Bucket Palette & Quick Fill Buttons
        Surface(
            shape = RoundedCornerShape(20.dp),
            color = Color.White,
            border = BorderStroke(1.5.dp, Color(0xFFE2E8F0)),
            shadowElevation = 3.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = if (!isDotsDone) {
                            "✏️ Drag finger on the dots (or tap Auto-Trace)!"
                        } else {
                            "🎨 Tap a colour bucket below or tap the canvas to paint!"
                        },
                        fontSize = 12.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFF1E293B)
                    )
                }

                Spacer(Modifier.height(8.dp))

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    stage.colorZones.forEachIndexed { idx, zone ->
                        val isPainted = paintedZones.contains(idx)
                        val isSelected = selectedPaletteIndex == idx
                        val label = when (explainLang) {
                            ExplainLang.ENGLISH -> zone.labelEn
                            ExplainLang.URDU -> zone.labelUr
                            ExplainLang.PASHTO -> zone.labelPs
                        }

                        Surface(
                            shape = RoundedCornerShape(16.dp),
                            color = if (isPainted) zone.targetColor.copy(alpha = 0.18f) else Color(0xFFF8FAFC),
                            border = BorderStroke(
                                width = if (isSelected && !isPainted) 2.5.dp else 1.5.dp,
                                color = if (isPainted) Color(0xFF00C853) else zone.targetColor
                            ),
                            modifier = Modifier.clickable {
                                selectedPaletteIndex = idx
                                if (!isDotsDone) {
                                    tracedDotIndex = totalDots - 1
                                }
                                if (!paintedZones.contains(idx)) {
                                    paintedZones = paintedZones + idx
                                    onSpeak(
                                        "${zone.labelEn} painted ${zone.colorNameEn}!",
                                        "${zone.labelUr} میں رنگ بھر دیا گیا!",
                                        "${zone.labelPs} رنګ شو!"
                                    )
                                }
                            }
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(22.dp)
                                        .background(zone.targetColor, CircleShape)
                                        .border(1.5.dp, Color(0xFF1E293B), CircleShape),
                                    contentAlignment = Alignment.Center
                                ) {
                                    if (isPainted) {
                                        Icon(
                                            Icons.Default.CheckCircle,
                                            contentDescription = null,
                                            tint = Color.White,
                                            modifier = Modifier.size(15.dp)
                                        )
                                    }
                                }
                                Spacer(Modifier.width(8.dp))
                                Column {
                                    Text(
                                        text = label,
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = Color(0xFF0F172A)
                                    )
                                    Text(
                                        text = if (isPainted) "Painted ✓" else "Tap to Paint",
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = if (isPainted) Color(0xFF2E7D32) else Color(0xFF64748B)
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

private fun DrawScope.zoneFillColor(
    colorZones: List<DrawingColorZone>,
    paintedZones: Set<Int>,
    zoneIndex: Int
): Color {
    val idx = zoneIndex.coerceIn(0, (colorZones.size - 1).coerceAtLeast(0))
    return if (paintedZones.contains(idx) && colorZones.isNotEmpty()) {
        colorZones[idx].targetColor
    } else {
        Color(0xFFF1F5F9)
    }
}

private fun DrawScope.drawFilledAndStrokedPath(
    path: Path,
    fillColor: Color,
    strokeColor: Color = Color(0xFF1E293B),
    strokeWidth: Float = 5f
) {
    drawPath(path = path, color = fillColor)
    drawPath(
        path = path,
        color = strokeColor,
        style = Stroke(width = strokeWidth, cap = StrokeCap.Round, join = StrokeJoin.Round)
    )
}

private fun DrawScope.drawEyesAndSmile(
    cx: Float,
    cy: Float,
    eyeSpread: Float,
    smileRadius: Float
) {
    drawCircle(Color.White, radius = 9f, center = Offset(cx - eyeSpread, cy))
    drawCircle(Color.White, radius = 9f, center = Offset(cx + eyeSpread, cy))
    drawCircle(Color(0xFF0F172A), radius = 5f, center = Offset(cx - eyeSpread, cy))
    drawCircle(Color(0xFF0F172A), radius = 5f, center = Offset(cx + eyeSpread, cy))
    drawArc(
        color = Color(0xFF0F172A),
        startAngle = 20f,
        sweepAngle = 140f,
        useCenter = false,
        topLeft = Offset(cx - smileRadius, cy + 2f),
        size = Size(smileRadius * 2f, smileRadius * 1.4f),
        style = Stroke(width = 4f, cap = StrokeCap.Round)
    )
}

private fun DrawScope.drawPageArtwork(
    artworkType: DrawingArtworkType,
    colorZones: List<DrawingColorZone>,
    paintedZones: Set<Int>,
    isDotsDone: Boolean,
    floatOffset: Float
) {
    val w = size.width
    val h = size.height
    val dy = if (paintedZones.size >= colorZones.size) floatOffset else 0f

    when (artworkType) {
        DrawingArtworkType.PAGE1_TRIANGLE_CAT -> {
            // Tail (zone 3)
            val tail = Path().apply {
                moveTo(w * 0.72f, h * 0.78f + dy)
                lineTo(w * 0.84f, h * 0.68f + dy)
                lineTo(w * 0.76f, h * 0.56f + dy)
                lineTo(w * 0.70f, h * 0.62f + dy)
                close()
            }
            drawFilledAndStrokedPath(tail, zoneFillColor(colorZones, paintedZones, 3))

            // Body triangle (zone 2)
            val body = Path().apply {
                moveTo(w * 0.50f, h * 0.42f + dy)
                lineTo(w * 0.26f, h * 0.84f + dy)
                lineTo(w * 0.74f, h * 0.84f + dy)
                close()
            }
            drawFilledAndStrokedPath(body, zoneFillColor(colorZones, paintedZones, 2))

            // Pink ears (zone 1)
            val leftEar = Path().apply {
                moveTo(w * 0.36f, h * 0.22f + dy)
                lineTo(w * 0.40f, h * 0.10f + dy)
                lineTo(w * 0.46f, h * 0.22f + dy)
                close()
            }
            val rightEar = Path().apply {
                moveTo(w * 0.54f, h * 0.22f + dy)
                lineTo(w * 0.60f, h * 0.10f + dy)
                lineTo(w * 0.64f, h * 0.22f + dy)
                close()
            }
            drawFilledAndStrokedPath(leftEar, zoneFillColor(colorZones, paintedZones, 1))
            drawFilledAndStrokedPath(rightEar, zoneFillColor(colorZones, paintedZones, 1))

            // Green head inverted triangle (zone 0)
            val head = Path().apply {
                moveTo(w * 0.34f, h * 0.22f + dy)
                lineTo(w * 0.66f, h * 0.22f + dy)
                lineTo(w * 0.50f, h * 0.44f + dy)
                close()
            }
            drawFilledAndStrokedPath(head, zoneFillColor(colorZones, paintedZones, 0))
            drawCircle(Color(0xFFFDD835), radius = 7f, center = Offset(w * 0.45f, h * 0.29f + dy))
            drawCircle(Color(0xFFFDD835), radius = 7f, center = Offset(w * 0.55f, h * 0.29f + dy))
        }

        DrawingArtworkType.PAGE2_TRIANGLE_OVAL -> {
            // Left Orange Triangle (zone 0)
            val tri = Path().apply {
                moveTo(w * 0.32f, h * 0.22f + dy)
                lineTo(w * 0.14f, h * 0.72f + dy)
                lineTo(w * 0.50f, h * 0.72f + dy)
                close()
            }
            drawFilledAndStrokedPath(tri, zoneFillColor(colorZones, paintedZones, 0))
            drawEyesAndSmile(w * 0.32f, h * 0.54f + dy, 16f, 14f)

            // Right Red Oval (zone 1)
            drawOval(
                color = zoneFillColor(colorZones, paintedZones, 1),
                topLeft = Offset(w * 0.56f, h * 0.28f + dy),
                size = Size(w * 0.32f, h * 0.44f)
            )
            drawOval(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.56f, h * 0.28f + dy),
                size = Size(w * 0.32f, h * 0.44f),
                style = Stroke(width = 5f)
            )
            drawEyesAndSmile(w * 0.72f, h * 0.50f + dy, 18f, 16f)

            // Blue Cap on Oval (zone 2)
            drawArc(
                color = zoneFillColor(colorZones, paintedZones, 2),
                startAngle = 180f,
                sweepAngle = 180f,
                useCenter = true,
                topLeft = Offset(w * 0.60f, h * 0.18f + dy),
                size = Size(w * 0.24f, h * 0.20f)
            )
            drawArc(
                color = Color(0xFF1E293B),
                startAngle = 180f,
                sweepAngle = 180f,
                useCenter = true,
                topLeft = Offset(w * 0.60f, h * 0.18f + dy),
                size = Size(w * 0.24f, h * 0.20f),
                style = Stroke(width = 4f)
            )
        }

        DrawingArtworkType.PAGE3_SQUARE_OCTAGON -> {
            // Left Green Square (zone 0)
            drawRoundRect(
                color = zoneFillColor(colorZones, paintedZones, 0),
                topLeft = Offset(w * 0.14f, h * 0.28f + dy),
                size = Size(w * 0.32f, h * 0.44f),
                cornerRadius = CornerRadius(12f, 12f)
            )
            drawRoundRect(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.14f, h * 0.28f + dy),
                size = Size(w * 0.32f, h * 0.44f),
                cornerRadius = CornerRadius(12f, 12f),
                style = Stroke(width = 5f)
            )
            drawEyesAndSmile(w * 0.30f, h * 0.48f + dy, 18f, 16f)

            // Right Blue Octagon (zone 1)
            val oct = Path().apply {
                for (i in 0..7) {
                    val a = (i * 45f + 22.5f) * (Math.PI.toFloat() / 180f)
                    val px = w * 0.73f + w * 0.17f * cos(a)
                    val py = h * 0.50f + dy + h * 0.22f * sin(a)
                    if (i == 0) moveTo(px, py) else lineTo(px, py)
                }
                close()
            }
            drawFilledAndStrokedPath(oct, zoneFillColor(colorZones, paintedZones, 1))
            drawEyesAndSmile(w * 0.73f, h * 0.48f + dy, 18f, 16f)
        }

        DrawingArtworkType.PAGE4_RAINBOW -> {
            // Sun in top-left
            drawCircle(Color(0xFFFFD54F), radius = 26f, center = Offset(w * 0.16f, h * 0.20f + dy))
            // Rainbow arches (zones 0, 1, 2)
            val bands = listOf(
                Triple(0, 0.38f, 22f),
                Triple(1, 0.31f, 22f),
                Triple(2, 0.24f, 22f)
            )
            bands.forEach { (zIdx, radiusFactor, strokeW) ->
                drawArc(
                    color = zoneFillColor(colorZones, paintedZones, zIdx),
                    startAngle = 180f,
                    sweepAngle = 180f,
                    useCenter = false,
                    topLeft = Offset(w * (0.50f - radiusFactor), h * (0.72f - radiusFactor * 1.15f) + dy),
                    size = Size(w * radiusFactor * 2f, h * radiusFactor * 2.3f),
                    style = Stroke(width = strokeW, cap = StrokeCap.Round)
                )
            }
            // Green Trees at bottom (zone 3)
            drawRect(Color(0xFF6D4C41), topLeft = Offset(w * 0.22f, h * 0.76f), size = Size(14f, 34f))
            drawCircle(zoneFillColor(colorZones, paintedZones, 3), radius = 32f, center = Offset(w * 0.24f, h * 0.72f))
            drawCircle(Color(0xFF1E293B), radius = 32f, center = Offset(w * 0.24f, h * 0.72f), style = Stroke(width = 4f))
        }

        DrawingArtworkType.PAGE5_SPARROW_BIRD -> {
            // Beak (zone 2)
            val beak = Path().apply {
                moveTo(w * 0.24f, h * 0.38f + dy)
                lineTo(w * 0.14f, h * 0.43f + dy)
                lineTo(w * 0.24f, h * 0.47f + dy)
                close()
            }
            drawFilledAndStrokedPath(beak, zoneFillColor(colorZones, paintedZones, 2))
            // Body (zone 0)
            drawOval(
                color = zoneFillColor(colorZones, paintedZones, 0),
                topLeft = Offset(w * 0.28f, h * 0.34f + dy),
                size = Size(w * 0.44f, h * 0.36f)
            )
            drawOval(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.28f, h * 0.34f + dy),
                size = Size(w * 0.44f, h * 0.36f),
                style = Stroke(width = 5f)
            )
            // Head
            drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = h * 0.14f, center = Offset(w * 0.34f, h * 0.38f + dy))
            drawCircle(Color(0xFF1E293B), radius = h * 0.14f, center = Offset(w * 0.34f, h * 0.38f + dy), style = Stroke(width = 5f))
            // Wing (zone 1)
            drawOval(
                color = zoneFillColor(colorZones, paintedZones, 1),
                topLeft = Offset(w * 0.44f, h * 0.42f + dy),
                size = Size(w * 0.24f, h * 0.18f)
            )
            drawOval(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.44f, h * 0.42f + dy),
                size = Size(w * 0.24f, h * 0.18f),
                style = Stroke(width = 4f)
            )
            drawCircle(Color(0xFF0F172A), radius = 6f, center = Offset(w * 0.30f, h * 0.36f + dy))
        }

        DrawingArtworkType.PAGE6_SHIP -> {
            // Left sail (zone 0)
            val leftSail = Path().apply {
                moveTo(w * 0.47f, h * 0.16f + dy)
                lineTo(w * 0.22f, h * 0.58f + dy)
                lineTo(w * 0.47f, h * 0.58f + dy)
                close()
            }
            drawFilledAndStrokedPath(leftSail, zoneFillColor(colorZones, paintedZones, 0))
            // Right sail (zone 1)
            val rightSail = Path().apply {
                moveTo(w * 0.50f, h * 0.18f + dy)
                lineTo(w * 0.78f, h * 0.58f + dy)
                lineTo(w * 0.50f, h * 0.58f + dy)
                close()
            }
            drawFilledAndStrokedPath(rightSail, zoneFillColor(colorZones, paintedZones, 1))
            // Boat Hull (zone 2)
            val hull = Path().apply {
                moveTo(w * 0.18f, h * 0.62f + dy)
                lineTo(w * 0.82f, h * 0.62f + dy)
                lineTo(w * 0.70f, h * 0.78f + dy)
                lineTo(w * 0.30f, h * 0.78f + dy)
                close()
            }
            drawFilledAndStrokedPath(hull, zoneFillColor(colorZones, paintedZones, 2))
            // Blue waves (zone 3)
            drawRoundRect(
                color = zoneFillColor(colorZones, paintedZones, 3),
                topLeft = Offset(w * 0.14f, h * 0.78f),
                size = Size(w * 0.72f, h * 0.10f),
                cornerRadius = CornerRadius(18f, 18f)
            )
        }

        DrawingArtworkType.PAGE7_ANGRY_BIRD -> {
            // Tail (zone 2)
            drawRect(zoneFillColor(colorZones, paintedZones, 2), topLeft = Offset(w * 0.16f, h * 0.48f + dy), size = Size(28f, 16f))
            // Red round body (zone 0)
            drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = h * 0.28f, center = Offset(w * 0.50f, h * 0.54f + dy))
            drawCircle(Color(0xFF1E293B), radius = h * 0.28f, center = Offset(w * 0.50f, h * 0.54f + dy), style = Stroke(width = 5f))
            // Eyes & angry brows
            drawCircle(Color.White, radius = 14f, center = Offset(w * 0.46f, h * 0.48f + dy))
            drawCircle(Color.White, radius = 14f, center = Offset(w * 0.58f, h * 0.48f + dy))
            drawCircle(Color.Black, radius = 6f, center = Offset(w * 0.46f, h * 0.48f + dy))
            drawCircle(Color.Black, radius = 6f, center = Offset(w * 0.58f, h * 0.48f + dy))
            drawLine(Color.Black, Offset(w * 0.38f, h * 0.40f + dy), Offset(w * 0.52f, h * 0.45f + dy), strokeWidth = 8f)
            drawLine(Color.Black, Offset(w * 0.66f, h * 0.40f + dy), Offset(w * 0.52f, h * 0.45f + dy), strokeWidth = 8f)
            // Yellow beak (zone 1)
            val beak = Path().apply {
                moveTo(w * 0.52f, h * 0.52f + dy)
                lineTo(w * 0.68f, h * 0.58f + dy)
                lineTo(w * 0.52f, h * 0.64f + dy)
                close()
            }
            drawFilledAndStrokedPath(beak, zoneFillColor(colorZones, paintedZones, 1))
        }

        DrawingArtworkType.PAGE8_HONEY_BEE -> {
            // Orange wings (zone 2)
            drawOval(
                color = zoneFillColor(colorZones, paintedZones, 2),
                topLeft = Offset(w * 0.42f, h * 0.20f + dy),
                size = Size(w * 0.20f, h * 0.24f)
            )
            drawOval(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.42f, h * 0.20f + dy),
                size = Size(w * 0.20f, h * 0.24f),
                style = Stroke(width = 4f)
            )
            // Bee Body (zone 0)
            drawOval(
                color = zoneFillColor(colorZones, paintedZones, 0),
                topLeft = Offset(w * 0.24f, h * 0.38f + dy),
                size = Size(w * 0.52f, h * 0.34f)
            )
            // Brown stripes (zone 1)
            drawRect(
                color = zoneFillColor(colorZones, paintedZones, 1),
                topLeft = Offset(w * 0.48f, h * 0.40f + dy),
                size = Size(w * 0.07f, h * 0.30f)
            )
            drawRect(
                color = zoneFillColor(colorZones, paintedZones, 1),
                topLeft = Offset(w * 0.60f, h * 0.42f + dy),
                size = Size(w * 0.07f, h * 0.26f)
            )
            drawOval(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.24f, h * 0.38f + dy),
                size = Size(w * 0.52f, h * 0.34f),
                style = Stroke(width = 5f)
            )
            drawEyesAndSmile(w * 0.34f, h * 0.52f + dy, 12f, 12f)
        }

        DrawingArtworkType.PAGE9_CAP -> {
            // Visor brim (zone 2)
            val brim = Path().apply {
                moveTo(w * 0.52f, h * 0.52f + dy)
                lineTo(w * 0.84f, h * 0.60f + dy)
                lineTo(w * 0.56f, h * 0.68f + dy)
                close()
            }
            drawFilledAndStrokedPath(brim, zoneFillColor(colorZones, paintedZones, 2))
            // Cap dome (zone 0)
            drawArc(
                color = zoneFillColor(colorZones, paintedZones, 0),
                startAngle = 180f,
                sweepAngle = 180f,
                useCenter = true,
                topLeft = Offset(w * 0.22f, h * 0.24f + dy),
                size = Size(w * 0.52f, h * 0.60f)
            )
            drawArc(
                color = Color(0xFF1E293B),
                startAngle = 180f,
                sweepAngle = 180f,
                useCenter = true,
                topLeft = Offset(w * 0.22f, h * 0.24f + dy),
                size = Size(w * 0.52f, h * 0.60f),
                style = Stroke(width = 5f)
            )
            // Yellow star (zone 1)
            drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = 18f, center = Offset(w * 0.52f, h * 0.40f + dy))
            drawCircle(Color(0xFF1E293B), radius = 18f, center = Offset(w * 0.52f, h * 0.40f + dy), style = Stroke(width = 3f))
        }

        DrawingArtworkType.PAGE10_TULIP -> {
            // Stem & leaves (zone 1)
            drawLine(zoneFillColor(colorZones, paintedZones, 1), Offset(w * 0.50f, h * 0.50f), Offset(w * 0.50f, h * 0.86f), strokeWidth = 14f)
            drawOval(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.32f, h * 0.62f), size = Size(w * 0.18f, h * 0.14f))
            drawOval(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.50f, h * 0.62f), size = Size(w * 0.18f, h * 0.14f))
            // Tulip flower cup (zone 0)
            val tulip = Path().apply {
                moveTo(w * 0.34f, h * 0.24f + dy)
                lineTo(w * 0.44f, h * 0.34f + dy)
                lineTo(w * 0.50f, h * 0.20f + dy)
                lineTo(w * 0.56f, h * 0.34f + dy)
                lineTo(w * 0.66f, h * 0.24f + dy)
                lineTo(w * 0.62f, h * 0.50f + dy)
                lineTo(w * 0.38f, h * 0.50f + dy)
                close()
            }
            drawFilledAndStrokedPath(tulip, zoneFillColor(colorZones, paintedZones, 0))
        }

        DrawingArtworkType.PAGE11_ANT -> {
            // Legs
            for (lx in listOf(0.42f, 0.50f, 0.58f)) {
                drawLine(Color(0xFF1E293B), Offset(w * lx, h * 0.52f + dy), Offset(w * (lx - 0.05f), h * 0.74f + dy), strokeWidth = 5f)
            }
            // Head (zone 0), Thorax (zone 1), Abdomen (zone 2)
            drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = h * 0.11f, center = Offset(w * 0.28f, h * 0.45f + dy))
            drawCircle(Color(0xFF1E293B), radius = h * 0.11f, center = Offset(w * 0.28f, h * 0.45f + dy), style = Stroke(width = 5f))
            drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = h * 0.09f, center = Offset(w * 0.48f, h * 0.50f + dy))
            drawCircle(Color(0xFF1E293B), radius = h * 0.09f, center = Offset(w * 0.48f, h * 0.50f + dy), style = Stroke(width = 5f))
            drawCircle(zoneFillColor(colorZones, paintedZones, 2), radius = h * 0.14f, center = Offset(w * 0.70f, h * 0.52f + dy))
            drawCircle(Color(0xFF1E293B), radius = h * 0.14f, center = Offset(w * 0.70f, h * 0.52f + dy), style = Stroke(width = 5f))
            drawEyesAndSmile(w * 0.26f, h * 0.44f + dy, 10f, 10f)
        }

        DrawingArtworkType.PAGE12_GOAT,
        DrawingArtworkType.PAGE20_CAMEL,
        DrawingArtworkType.PAGE23_DONKEY,
        DrawingArtworkType.PAGE26_PUPPY -> {
            // Legs
            drawRect(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.34f, h * 0.58f + dy), size = Size(16f, h * 0.22f))
            drawRect(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.64f, h * 0.58f + dy), size = Size(16f, h * 0.22f))
            // Hump/Ears/Horns (zone 1)
            if (artworkType == DrawingArtworkType.PAGE20_CAMEL) {
                drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = h * 0.14f, center = Offset(w * 0.54f, h * 0.34f + dy))
                drawCircle(Color(0xFF1E293B), radius = h * 0.14f, center = Offset(w * 0.54f, h * 0.34f + dy), style = Stroke(width = 5f))
            } else {
                drawOval(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.26f, h * 0.18f + dy), size = Size(24f, 48f))
                drawOval(Color(0xFF1E293B), topLeft = Offset(w * 0.26f, h * 0.18f + dy), size = Size(24f, 48f), style = Stroke(width = 4f))
            }
            // Body & Head (zone 0)
            drawOval(
                color = zoneFillColor(colorZones, paintedZones, 0),
                topLeft = Offset(w * 0.32f, h * 0.38f + dy),
                size = Size(w * 0.42f, h * 0.26f)
            )
            drawOval(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.32f, h * 0.38f + dy),
                size = Size(w * 0.42f, h * 0.26f),
                style = Stroke(width = 5f)
            )
            drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = h * 0.12f, center = Offset(w * 0.30f, h * 0.36f + dy))
            drawCircle(Color(0xFF1E293B), radius = h * 0.12f, center = Offset(w * 0.30f, h * 0.36f + dy), style = Stroke(width = 5f))
            drawEyesAndSmile(w * 0.28f, h * 0.35f + dy, 10f, 10f)
        }

        DrawingArtworkType.PAGE13_UMBRELLA -> {
            // Handle (zone 2)
            drawLine(zoneFillColor(colorZones, paintedZones, 2), Offset(w * 0.50f, h * 0.50f), Offset(w * 0.50f, h * 0.80f), strokeWidth = 12f)
            // Canopy (zone 0)
            drawArc(
                color = zoneFillColor(colorZones, paintedZones, 0),
                startAngle = 180f,
                sweepAngle = 180f,
                useCenter = true,
                topLeft = Offset(w * 0.18f, h * 0.22f + dy),
                size = Size(w * 0.64f, h * 0.58f)
            )
            drawArc(
                color = Color(0xFF1E293B),
                startAngle = 180f,
                sweepAngle = 180f,
                useCenter = true,
                topLeft = Offset(w * 0.18f, h * 0.22f + dy),
                size = Size(w * 0.64f, h * 0.58f),
                style = Stroke(width = 5f)
            )
            // Smiling mouth (zone 1)
            drawEyesAndSmile(w * 0.50f, h * 0.38f + dy, 22f, 18f)
            drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = 12f, center = Offset(w * 0.50f, h * 0.46f + dy))
        }

        DrawingArtworkType.PAGE14_PURSE -> {
            // Handles
            drawArc(
                color = zoneFillColor(colorZones, paintedZones, 0),
                startAngle = 180f,
                sweepAngle = 180f,
                useCenter = false,
                topLeft = Offset(w * 0.36f, h * 0.18f + dy),
                size = Size(w * 0.28f, h * 0.36f),
                style = Stroke(width = 10f)
            )
            // Blue side panels (zone 1)
            drawRoundRect(
                color = zoneFillColor(colorZones, paintedZones, 1),
                topLeft = Offset(w * 0.24f, h * 0.38f + dy),
                size = Size(w * 0.52f, h * 0.40f),
                cornerRadius = CornerRadius(20f, 20f)
            )
            // Red centre panel (zone 0)
            drawRoundRect(
                color = zoneFillColor(colorZones, paintedZones, 0),
                topLeft = Offset(w * 0.36f, h * 0.38f + dy),
                size = Size(w * 0.28f, h * 0.40f),
                cornerRadius = CornerRadius(12f, 12f)
            )
            drawRoundRect(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.24f, h * 0.38f + dy),
                size = Size(w * 0.52f, h * 0.40f),
                cornerRadius = CornerRadius(20f, 20f),
                style = Stroke(width = 5f)
            )
            // Clasp (zone 2)
            drawCircle(zoneFillColor(colorZones, paintedZones, 2), radius = 12f, center = Offset(w * 0.50f, h * 0.46f + dy))
        }

        DrawingArtworkType.PAGE15_PINEAPPLE -> {
            // Crown leaves (zone 0)
            val crown = Path().apply {
                moveTo(w * 0.38f, h * 0.38f + dy)
                lineTo(w * 0.42f, h * 0.16f + dy)
                lineTo(w * 0.50f, h * 0.30f + dy)
                lineTo(w * 0.58f, h * 0.16f + dy)
                lineTo(w * 0.62f, h * 0.38f + dy)
                close()
            }
            drawFilledAndStrokedPath(crown, zoneFillColor(colorZones, paintedZones, 0))
            // Pineapple body (zone 1)
            drawOval(
                color = zoneFillColor(colorZones, paintedZones, 1),
                topLeft = Offset(w * 0.30f, h * 0.34f + dy),
                size = Size(w * 0.40f, h * 0.50f)
            )
            drawOval(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.30f, h * 0.34f + dy),
                size = Size(w * 0.40f, h * 0.50f),
                style = Stroke(width = 5f)
            )
        }

        DrawingArtworkType.PAGE16_PARROT -> {
            // Red Beak (zone 1)
            drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = 18f, center = Offset(w * 0.28f, h * 0.28f + dy))
            // Green body (zone 0)
            drawOval(
                color = zoneFillColor(colorZones, paintedZones, 0),
                topLeft = Offset(w * 0.32f, h * 0.20f + dy),
                size = Size(w * 0.30f, h * 0.50f)
            )
            drawOval(
                color = Color(0xFF1E293B),
                topLeft = Offset(w * 0.32f, h * 0.20f + dy),
                size = Size(w * 0.30f, h * 0.50f),
                style = Stroke(width = 5f)
            )
            // Wing tip (zone 2)
            drawOval(
                color = zoneFillColor(colorZones, paintedZones, 2),
                topLeft = Offset(w * 0.48f, h * 0.42f + dy),
                size = Size(w * 0.16f, h * 0.28f)
            )
            drawCircle(Color.Black, radius = 5f, center = Offset(w * 0.38f, h * 0.26f + dy))
        }

        DrawingArtworkType.PAGE17_WATERMELON -> {
            // Green whole watermelon (zone 0)
            drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = h * 0.24f, center = Offset(w * 0.42f, h * 0.44f + dy))
            drawCircle(Color(0xFF1E293B), radius = h * 0.24f, center = Offset(w * 0.42f, h * 0.44f + dy), style = Stroke(width = 5f))
            // Red slice (zone 1)
            drawArc(
                color = zoneFillColor(colorZones, paintedZones, 1),
                startAngle = 0f,
                sweepAngle = 180f,
                useCenter = true,
                topLeft = Offset(w * 0.32f, h * 0.52f + dy),
                size = Size(w * 0.46f, h * 0.34f)
            )
            drawArc(
                color = Color(0xFF1E293B),
                startAngle = 0f,
                sweepAngle = 180f,
                useCenter = true,
                topLeft = Offset(w * 0.32f, h * 0.52f + dy),
                size = Size(w * 0.46f, h * 0.34f),
                style = Stroke(width = 5f)
            )
        }

        DrawingArtworkType.PAGE18_FROCK -> {
            // Pink Frock body (zone 0)
            val frock = Path().apply {
                moveTo(w * 0.36f, h * 0.18f + dy)
                lineTo(w * 0.64f, h * 0.18f + dy)
                lineTo(w * 0.60f, h * 0.44f + dy)
                lineTo(w * 0.80f, h * 0.76f + dy)
                lineTo(w * 0.20f, h * 0.76f + dy)
                lineTo(w * 0.40f, h * 0.44f + dy)
                close()
            }
            drawFilledAndStrokedPath(frock, zoneFillColor(colorZones, paintedZones, 0))
            // Red bottom frill (zone 1)
            drawRect(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.20f, h * 0.74f + dy), size = Size(w * 0.60f, 18f))
            // Yellow star (zone 2)
            drawCircle(zoneFillColor(colorZones, paintedZones, 2), radius = 16f, center = Offset(w * 0.50f, h * 0.32f + dy))
        }

        DrawingArtworkType.PAGE19_GRAPES -> {
            // Leaf (zone 2)
            drawOval(zoneFillColor(colorZones, paintedZones, 2), topLeft = Offset(w * 0.38f, h * 0.18f + dy), size = Size(w * 0.24f, h * 0.12f))
            // Green grapes (zone 0)
            val greenCenters = listOf(
                Offset(0.40f, 0.40f), Offset(0.50f, 0.40f),
                Offset(0.36f, 0.52f), Offset(0.46f, 0.52f),
                Offset(0.42f, 0.64f), Offset(0.48f, 0.74f)
            )
            greenCenters.forEach { c ->
                drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = 22f, center = Offset(w * c.x, h * c.y + dy))
                drawCircle(Color(0xFF1E293B), radius = 22f, center = Offset(w * c.x, h * c.y + dy), style = Stroke(width = 3f))
            }
            // Purple grapes (zone 1)
            val purpleCenters = listOf(
                Offset(0.60f, 0.44f), Offset(0.58f, 0.56f), Offset(0.66f, 0.58f), Offset(0.56f, 0.68f)
            )
            purpleCenters.forEach { c ->
                drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = 22f, center = Offset(w * c.x, h * c.y + dy))
                drawCircle(Color(0xFF1E293B), radius = 22f, center = Offset(w * c.x, h * c.y + dy), style = Stroke(width = 3f))
            }
        }

        DrawingArtworkType.PAGE21_DUCK -> {
            // Beak & baby duckling (zone 2)
            drawOval(zoneFillColor(colorZones, paintedZones, 2), topLeft = Offset(w * 0.18f, h * 0.26f + dy), size = Size(34f, 20f))
            // Brown breast (zone 1)
            drawOval(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.28f, h * 0.44f + dy), size = Size(w * 0.46f, h * 0.28f))
            drawOval(Color(0xFF1E293B), topLeft = Offset(w * 0.28f, h * 0.44f + dy), size = Size(w * 0.46f, h * 0.28f), style = Stroke(width = 5f))
            // Blue head & wing (zone 0)
            drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = h * 0.12f, center = Offset(w * 0.34f, h * 0.30f + dy))
            drawCircle(Color(0xFF1E293B), radius = h * 0.12f, center = Offset(w * 0.34f, h * 0.30f + dy), style = Stroke(width = 5f))
            drawOval(zoneFillColor(colorZones, paintedZones, 0), topLeft = Offset(w * 0.42f, h * 0.48f + dy), size = Size(w * 0.24f, h * 0.16f))
        }

        DrawingArtworkType.PAGE22_SCISSOR -> {
            // Blades (zone 1)
            drawLine(zoneFillColor(colorZones, paintedZones, 1), Offset(w * 0.34f, h * 0.40f + dy), Offset(w * 0.80f, h * 0.68f + dy), strokeWidth = 18f, cap = StrokeCap.Round)
            drawLine(zoneFillColor(colorZones, paintedZones, 1), Offset(w * 0.34f, h * 0.60f + dy), Offset(w * 0.80f, h * 0.32f + dy), strokeWidth = 18f, cap = StrokeCap.Round)
            // Handles (zone 0)
            drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = 32f, center = Offset(w * 0.28f, h * 0.36f + dy))
            drawCircle(Color(0xFF1E293B), radius = 32f, center = Offset(w * 0.28f, h * 0.36f + dy), style = Stroke(width = 5f))
            drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = 32f, center = Offset(w * 0.28f, h * 0.64f + dy))
            drawCircle(Color(0xFF1E293B), radius = 32f, center = Offset(w * 0.28f, h * 0.64f + dy), style = Stroke(width = 5f))
        }

        DrawingArtworkType.PAGE24_LADYBUG -> {
            // Black head (zone 1)
            drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = h * 0.14f, center = Offset(w * 0.28f, h * 0.52f + dy))
            // Red shell (zone 0)
            drawOval(zoneFillColor(colorZones, paintedZones, 0), topLeft = Offset(w * 0.32f, h * 0.30f + dy), size = Size(w * 0.46f, h * 0.46f))
            drawOval(Color(0xFF1E293B), topLeft = Offset(w * 0.32f, h * 0.30f + dy), size = Size(w * 0.46f, h * 0.46f), style = Stroke(width = 5f))
            // Black spots (zone 1)
            for (spot in listOf(Offset(0.46f, 0.42f), Offset(0.62f, 0.44f), Offset(0.52f, 0.60f), Offset(0.66f, 0.60f))) {
                drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = 14f, center = Offset(w * spot.x, h * spot.y + dy))
            }
        }

        DrawingArtworkType.PAGE25_SCENERY,
        DrawingArtworkType.PAGE31_STEP_HOUSE -> {
            val isStepHouse = artworkType == DrawingArtworkType.PAGE31_STEP_HOUSE
            // Chimney for Page 31 (zone 1)
            if (isStepHouse) {
                drawRect(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.30f, h * 0.20f + dy), size = Size(28f, 46f))
                drawRect(Color(0xFF1E293B), topLeft = Offset(w * 0.30f, h * 0.20f + dy), size = Size(28f, 46f), style = Stroke(width = 4f))
            } else {
                // Trees for Page 25 (zone 3)
                drawCircle(zoneFillColor(colorZones, paintedZones, 3), radius = 38f, center = Offset(w * 0.20f, h * 0.56f + dy))
                drawCircle(Color(0xFF1E293B), radius = 38f, center = Offset(w * 0.20f, h * 0.56f + dy), style = Stroke(width = 4f))
            }
            // House walls
            val wallZone = if (isStepHouse) 2 else 1
            drawRect(zoneFillColor(colorZones, paintedZones, wallZone), topLeft = Offset(w * 0.30f, h * 0.44f + dy), size = Size(w * 0.42f, h * 0.36f))
            drawRect(Color(0xFF1E293B), topLeft = Offset(w * 0.30f, h * 0.44f + dy), size = Size(w * 0.42f, h * 0.36f), style = Stroke(width = 5f))
            // Roof (zone 0)
            val roof = Path().apply {
                moveTo(w * 0.51f, h * 0.18f + dy)
                lineTo(w * 0.24f, h * 0.44f + dy)
                lineTo(w * 0.78f, h * 0.44f + dy)
                close()
            }
            drawFilledAndStrokedPath(roof, zoneFillColor(colorZones, paintedZones, 0))
            // Door & Window
            val doorZone = if (isStepHouse) 3 else 2
            drawRect(zoneFillColor(colorZones, paintedZones, doorZone), topLeft = Offset(w * 0.56f, h * 0.56f + dy), size = Size(w * 0.10f, h * 0.24f))
            drawRect(zoneFillColor(colorZones, paintedZones, doorZone), topLeft = Offset(w * 0.36f, h * 0.52f + dy), size = Size(w * 0.10f, h * 0.10f))
        }

        DrawingArtworkType.PAGE27_SUNGLASS -> {
            // Frame (zone 0)
            drawRoundRect(zoneFillColor(colorZones, paintedZones, 0), topLeft = Offset(w * 0.18f, h * 0.44f + dy), size = Size(w * 0.64f, h * 0.26f), cornerRadius = CornerRadius(18f, 18f))
            drawRoundRect(Color(0xFF1E293B), topLeft = Offset(w * 0.18f, h * 0.44f + dy), size = Size(w * 0.64f, h * 0.26f), cornerRadius = CornerRadius(18f, 18f), style = Stroke(width = 5f))
            // Purple lenses (zone 1)
            drawRoundRect(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.22f, h * 0.48f + dy), size = Size(w * 0.24f, h * 0.18f), cornerRadius = CornerRadius(14f, 14f))
            drawRoundRect(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.54f, h * 0.48f + dy), size = Size(w * 0.24f, h * 0.18f), cornerRadius = CornerRadius(14f, 14f))
        }

        DrawingArtworkType.PAGE28_FLOWER -> {
            // Stem & Leaf (zone 2)
            drawLine(zoneFillColor(colorZones, paintedZones, 2), Offset(w * 0.50f, h * 0.46f), Offset(w * 0.50f, h * 0.86f), strokeWidth = 12f)
            drawOval(zoneFillColor(colorZones, paintedZones, 2), topLeft = Offset(w * 0.52f, h * 0.64f), size = Size(w * 0.20f, h * 0.12f))
            // 6 Red Petals (zone 0)
            for (i in 0..5) {
                val a = i * 60f * (Math.PI.toFloat() / 180f)
                val px = w * 0.50f + 46f * cos(a)
                val py = h * 0.38f + dy + 46f * sin(a)
                drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = 28f, center = Offset(px, py))
                drawCircle(Color(0xFF1E293B), radius = 28f, center = Offset(px, py), style = Stroke(width = 4f))
            }
            // Yellow centre (zone 1)
            drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = 24f, center = Offset(w * 0.50f, h * 0.38f + dy))
            drawCircle(Color(0xFF1E293B), radius = 24f, center = Offset(w * 0.50f, h * 0.38f + dy), style = Stroke(width = 4f))
        }

        DrawingArtworkType.PAGE29_BANANAS -> {
            // 3 curved bananas (zone 0)
            for (offsetIdx in 0..2) {
                val shiftX = offsetIdx * 24f
                val shiftY = offsetIdx * 12f
                drawArc(
                    color = zoneFillColor(colorZones, paintedZones, 0),
                    startAngle = 25f,
                    sweepAngle = 145f,
                    useCenter = false,
                    topLeft = Offset(w * 0.24f + shiftX, h * 0.22f + shiftY + dy),
                    size = Size(w * 0.42f, h * 0.48f),
                    style = Stroke(width = 28f, cap = StrokeCap.Round)
                )
            }
            // Top stem (zone 1)
            drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = 16f, center = Offset(w * 0.32f, h * 0.26f + dy))
        }

        DrawingArtworkType.PAGE30_STEP_BEAR -> {
            // Ears (zone 1)
            drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = 30f, center = Offset(w * 0.34f, h * 0.30f + dy))
            drawCircle(Color(0xFF1E293B), radius = 30f, center = Offset(w * 0.34f, h * 0.30f + dy), style = Stroke(width = 5f))
            drawCircle(zoneFillColor(colorZones, paintedZones, 1), radius = 30f, center = Offset(w * 0.66f, h * 0.30f + dy))
            drawCircle(Color(0xFF1E293B), radius = 30f, center = Offset(w * 0.66f, h * 0.30f + dy), style = Stroke(width = 5f))
            // Bear Head (zone 0)
            drawCircle(zoneFillColor(colorZones, paintedZones, 0), radius = h * 0.26f, center = Offset(w * 0.50f, h * 0.52f + dy))
            drawCircle(Color(0xFF1E293B), radius = h * 0.26f, center = Offset(w * 0.50f, h * 0.52f + dy), style = Stroke(width = 5f))
            // Muzzle chin (zone 1)
            drawOval(zoneFillColor(colorZones, paintedZones, 1), topLeft = Offset(w * 0.38f, h * 0.56f + dy), size = Size(w * 0.24f, h * 0.18f))
            drawEyesAndSmile(w * 0.50f, h * 0.48f + dy, 24f, 18f)
        }

        DrawingArtworkType.PAGE32_ORIGAMI_CAT -> {
            // Origami ears (zone 1)
            val leftEar = Path().apply {
                moveTo(w * 0.28f, h * 0.52f + dy)
                lineTo(w * 0.32f, h * 0.22f + dy)
                lineTo(w * 0.44f, h * 0.36f + dy)
                close()
            }
            val rightEar = Path().apply {
                moveTo(w * 0.72f, h * 0.52f + dy)
                lineTo(w * 0.68f, h * 0.22f + dy)
                lineTo(w * 0.56f, h * 0.36f + dy)
                close()
            }
            drawFilledAndStrokedPath(leftEar, zoneFillColor(colorZones, paintedZones, 1))
            drawFilledAndStrokedPath(rightEar, zoneFillColor(colorZones, paintedZones, 1))
            // Origami folded diamond face (zone 0)
            val face = Path().apply {
                moveTo(w * 0.36f, h * 0.36f + dy)
                lineTo(w * 0.64f, h * 0.36f + dy)
                lineTo(w * 0.72f, h * 0.54f + dy)
                lineTo(w * 0.50f, h * 0.80f + dy)
                lineTo(w * 0.28f, h * 0.54f + dy)
                close()
            }
            drawFilledAndStrokedPath(face, zoneFillColor(colorZones, paintedZones, 0))
            drawEyesAndSmile(w * 0.50f, h * 0.54f + dy, 22f, 16f)
        }
    }
}

@Composable
private fun DrawingLessonTab(
    stage: DrawingBookStage,
    explainLang: ExplainLang,
    onSpeak: (String, String, String) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        DrawingLanguageBanner(
            stageTitleEn = "${stage.pageNumber} Lesson: ${stage.titleEn}",
            stageTitleUr = stage.titleUr,
            stageTitlePs = stage.titlePs,
            instructionEn = stage.instructionEn,
            instructionUr = stage.instructionUr,
            instructionPs = stage.instructionPs,
            explainLang = explainLang,
            themeColor = stage.themeColor,
            onSpeak = onSpeak
        )

        // Colour Guide Card
        Surface(
            shape = RoundedCornerShape(18.dp),
            color = Color.White,
            border = BorderStroke(1.5.dp, stage.themeColor.copy(alpha = 0.3f)),
            shadowElevation = 3.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(14.dp)) {
                Text(
                    text = "🎨 Colours Used on ${stage.pageNumber}",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = stage.themeColor
                )
                Spacer(Modifier.height(8.dp))
                stage.colorZones.forEach { zone ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .clickable {
                                onSpeak(
                                    "${zone.labelEn}: ${zone.colorNameEn}",
                                    zone.labelUr,
                                    zone.labelPs
                                )
                            },
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(24.dp)
                                .background(zone.targetColor, CircleShape)
                                .border(1.5.dp, Color(0xFF1E293B), CircleShape)
                        )
                        Spacer(Modifier.width(10.dp))
                        Text(
                            text = when (explainLang) {
                                ExplainLang.ENGLISH -> "${zone.labelEn} (${zone.colorNameEn})"
                                ExplainLang.URDU -> "${zone.labelEn} • ${zone.labelUr}"
                                ExplainLang.PASHTO -> "${zone.labelEn} • ${zone.labelPs}"
                            },
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF1E293B),
                            modifier = Modifier.weight(1f)
                        )
                        Icon(
                            Icons.AutoMirrored.Filled.VolumeUp,
                            contentDescription = "Listen",
                            tint = stage.themeColor,
                            modifier = Modifier.size(18.dp)
                        )
                    }
                }
            }
        }

        // Lesson Cards
        stage.lessons.forEach { card ->
            Surface(
                shape = RoundedCornerShape(18.dp),
                color = Color.White,
                border = BorderStroke(1.5.dp, card.badgeColor.copy(alpha = 0.35f)),
                shadowElevation = 3.dp,
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable {
                        onSpeak("${card.titleEn}. ${card.subEn}", card.descUr, card.descPs)
                    }
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .background(card.badgeColor.copy(alpha = 0.16f), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Star, contentDescription = null, tint = card.badgeColor)
                    }
                    Spacer(Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = card.titleEn,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF0F172A)
                        )
                        Spacer(Modifier.height(3.dp))
                        Text(
                            text = card.subEn,
                            fontSize = 13.sp,
                            color = Color(0xFF334155)
                        )
                        if (explainLang != ExplainLang.ENGLISH) {
                            Spacer(Modifier.height(4.dp))
                            Text(
                                text = if (explainLang == ExplainLang.URDU) card.descUr else card.descPs,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = card.badgeColor
                            )
                        }
                    }
                    IconButton(onClick = { onSpeak("${card.titleEn}. ${card.subEn}", card.descUr, card.descPs) }) {
                        Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = "Speak", tint = card.badgeColor)
                    }
                }
            }
        }
    }
}

@Composable
private fun DrawingExerciseTab(
    stage: DrawingBookStage,
    explainLang: ExplainLang,
    onSpeak: (String, String, String) -> Unit,
    onNextStage: () -> Unit
) {
    var qIndex by remember(stage.id) { mutableIntStateOf(0) }
    var selectedOption by remember(stage.id, qIndex) { mutableIntStateOf(-1) }
    var score by remember(stage.id) { mutableIntStateOf(0) }
    var quizFinished by remember(stage.id) { mutableStateOf(false) }

    val questions = stage.quizQuestions
    val q = questions[qIndex]

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(14.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        if (quizFinished) {
            Surface(
                shape = RoundedCornerShape(24.dp),
                color = Color.White,
                border = BorderStroke(2.dp, Color(0xFF00C853)),
                shadowElevation = 6.dp,
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(
                        Icons.Default.EmojiEvents,
                        contentDescription = null,
                        tint = Color(0xFFFFB300),
                        modifier = Modifier.size(64.dp)
                    )
                    Spacer(Modifier.height(10.dp))
                    Text(
                        text = "${stage.pageNumber} Exercise Complete!",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFF0F172A),
                        textAlign = TextAlign.Center
                    )
                    Spacer(Modifier.height(6.dp))
                    Text(
                        text = "Score: $score / ${questions.size}",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF2E7D32)
                    )
                    Spacer(Modifier.height(16.dp))
                    Button(
                        onClick = onNextStage,
                        colors = ButtonDefaults.buttonColors(containerColor = stage.themeColor),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Text("Next Page Game ➡️", fontWeight = FontWeight.ExtraBold)
                    }
                }
            }
        } else {
            DrawingLanguageBanner(
                stageTitleEn = "Question ${qIndex + 1} of ${questions.size}",
                stageTitleUr = "سوال ${qIndex + 1}",
                stageTitlePs = "پوښتنه ${qIndex + 1}",
                instructionEn = q.questionEn,
                instructionUr = q.questionUr,
                instructionPs = q.questionPs,
                explainLang = explainLang,
                themeColor = stage.themeColor,
                onSpeak = onSpeak
            )

            Spacer(Modifier.height(14.dp))

            q.options.forEachIndexed { idx, opt ->
                val isSelected = selectedOption == idx
                val isCorrect = idx == q.correctIndex
                val bgColor = when {
                    !isSelected -> Color.White
                    isCorrect -> Color(0xFFE8F5E9)
                    else -> Color(0xFFFFEBEE)
                }
                val borderColor = when {
                    !isSelected -> Color(0xFFCBD5E1)
                    isCorrect -> Color(0xFF00C853)
                    else -> Color(0xFFD50000)
                }

                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = bgColor,
                    border = BorderStroke(2.dp, borderColor),
                    shadowElevation = 2.dp,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 5.dp)
                        .clickable {
                            selectedOption = idx
                            if (isCorrect) {
                                score += 1
                                onSpeak("Correct! $opt", "بالکل درست!", "سم ځواب!")
                            } else {
                                onSpeak("Try again!", "دوبارہ کوشش کریں!", "بیا هڅه وکړئ!")
                            }
                        }
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = opt,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF0F172A),
                            modifier = Modifier.weight(1f)
                        )
                        if (isSelected && isCorrect) {
                            Icon(Icons.Default.CheckCircle, contentDescription = null, tint = Color(0xFF00C853))
                        }
                    }
                }
            }

            if (selectedOption == q.correctIndex) {
                Spacer(Modifier.height(14.dp))
                Button(
                    onClick = {
                        if (qIndex < questions.lastIndex) {
                            qIndex += 1
                        } else {
                            quizFinished = true
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = stage.themeColor),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        text = if (qIndex < questions.lastIndex) "Next Question ➡️" else "Finish Exercise 🏆",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 15.sp
                    )
                }
            }
        }
    }
}
