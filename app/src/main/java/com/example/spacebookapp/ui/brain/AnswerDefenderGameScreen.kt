package com.example.spacebookapp.ui.brain

import android.media.AudioManager
import android.media.ToneGenerator
import android.speech.tts.TextToSpeech
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.FastOutSlowInEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.FavoriteBorder
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
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
import com.example.spacebookapp.data.brain.BrainCategory
import com.example.spacebookapp.data.brain.BrainProgressManager
import com.example.spacebookapp.data.brain.BrainZoneContent
import com.example.spacebookapp.data.brain.DefenderQuestion
import com.example.spacebookapp.ui.screens.ExplainLang
import kotlinx.coroutines.delay
import java.util.Locale
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

/**
 * Arcade pressure without typing & without violence:
 * Friendly characters float gently from top to bottom carrying questions.
 * Kids tap the correct answer before the character touches base.
 * Correct: pops into stars and points.
 * Too slow: character giggles and restarts (never scary, no violence).
 */
@Composable
fun AnswerDefenderGameScreen(
    onBack: () -> Unit
) {
    val context = LocalContext.current
    var explainLang by remember { mutableStateOf(ExplainLang.ENGLISH) }
    var soundEnabled by remember { mutableStateOf(true) }

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
        if (!soundEnabled) return
        val engine = tts ?: return
        when (explainLang) {
            ExplainLang.ENGLISH -> {
                engine.language = Locale.US
                engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "def_tts")
            }
            ExplainLang.URDU -> {
                val res = engine.setLanguage(Locale.forLanguageTag("ur-PK"))
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    engine.language = Locale.US
                    engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "def_tts")
                } else {
                    engine.speak(textUr, TextToSpeech.QUEUE_FLUSH, null, "def_tts")
                }
            }
            ExplainLang.PASHTO -> {
                val res = engine.setLanguage(Locale.forLanguageTag("ps-AF"))
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    val urRes = engine.setLanguage(Locale.forLanguageTag("ur-PK"))
                    if (urRes == TextToSpeech.LANG_MISSING_DATA || urRes == TextToSpeech.LANG_NOT_SUPPORTED) {
                        engine.language = Locale.US
                        engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "def_tts")
                    } else {
                        engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "def_tts")
                    }
                } else {
                    engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "def_tts")
                }
            }
        }
    }

    var toneGen by remember { mutableStateOf<ToneGenerator?>(null) }
    LaunchedEffect(Unit) {
        try {
            toneGen = ToneGenerator(AudioManager.STREAM_MUSIC, 70)
        } catch (_: Exception) {}
    }
    DisposableEffect(Unit) {
        onDispose {
            toneGen?.release()
        }
    }

    fun playTone(success: Boolean) {
        if (!soundEnabled) return
        try {
            if (success) {
                toneGen?.startTone(ToneGenerator.TONE_PROP_BEEP2, 180)
            } else {
                toneGen?.startTone(ToneGenerator.TONE_PROP_NACK, 140)
            }
        } catch (_: Exception) {}
    }

    val questions = remember { BrainZoneContent.DEFENDER_QUESTIONS.shuffled() }
    var currentQIndex by remember { mutableIntStateOf(0) }
    var score by remember { mutableIntStateOf(0) }
    var hearts by remember { mutableIntStateOf(3) }
    var burstTrigger by remember { mutableIntStateOf(0) }
    var showSuccessMessage by remember { mutableStateOf(false) }
    var showGiggleMessage by remember { mutableStateOf(false) }

    val currentQ = questions.getOrElse(currentQIndex) { questions.first() }
    val isGameWon = currentQIndex >= questions.size

    // Character vertical progress (0.0f at top, 1.0f at danger line)
    var charProgress by remember { mutableFloatStateOf(0f) }
    var isPaused by remember { mutableStateOf(false) }

    LaunchedEffect(currentQIndex, isPaused) {
        charProgress = 0f
        showSuccessMessage = false
        showGiggleMessage = false
        if (currentQIndex < questions.size && !isPaused) {
            speak(currentQ.question.en, currentQ.question.ur, currentQ.question.ps)
            // Gently descend over 14 seconds (ample time for 6-9 year olds)
            val totalSteps = 280
            for (i in 0..totalSteps) {
                if (isPaused) break
                charProgress = i / totalSteps.toFloat()
                delay(50)
            }
            if (charProgress >= 1f && !isPaused) {
                // Character reached the bottom: giggles and gentle try-again
                showGiggleMessage = true
                playTone(false)
                delay(1200)
                charProgress = 0f
                showGiggleMessage = false
            }
        }
    }

    fun handleAnswer(chosen: String) {
        if (chosen == currentQ.correctAnswer) {
            playTone(true)
            burstTrigger++
            score += 15
            showSuccessMessage = true
            BrainProgressManager.addPoints(context, BrainCategory.DEFENDER, 15, 1)
            // Pop away character and go to next
            currentQIndex++
        } else {
            playTone(false)
            showGiggleMessage = true
        }
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.horizontalGradient(
                            listOf(Color(0xFF0F172A), Color(0xFF1E293B), Color(0xFF0F766E))
                        )
                    )
                    .padding(horizontal = 14.dp, vertical = 8.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    IconButton(onClick = onBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }

                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = "🛡️ Answer Defender",
                            fontSize = 17.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                        Text(
                            text = currentQ.bookSource,
                            fontSize = 11.sp,
                            color = Color(0xFF5EEAD4),
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        ExplainLang.entries.forEach { lang ->
                            val sel = explainLang == lang
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (sel) Color(0xFF14B8A6) else Color.White.copy(alpha = 0.15f),
                                modifier = Modifier.clickable { explainLang = lang }
                            ) {
                                Text(
                                    text = lang.label,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 4.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    ) { pad ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(pad)
                .background(
                    Brush.verticalGradient(
                        listOf(Color(0xFF0F172A), Color(0xFF1E293B), Color(0xFF064E3B))
                    )
                )
        ) {
            // Star Burst Particles
            DefenderStarBurst(triggerKey = burstTrigger)

            if (isGameWon) {
                // Victory Screen
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Card(
                        shape = RoundedCornerShape(28.dp),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFFF0FDF4)),
                        border = BorderStroke(3.dp, Color(0xFF22C55E)),
                        modifier = Modifier
                            .fillMaxWidth(0.88f)
                            .padding(16.dp)
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier.padding(24.dp)
                        ) {
                            Text(text = "🏆🎉", fontSize = 54.sp)
                            Spacer(Modifier.height(8.dp))
                            Text(
                                text = "Defender Champion!",
                                fontSize = 22.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Color(0xFF15803D)
                            )
                            Spacer(Modifier.height(6.dp))
                            Text(
                                text = "You saved all the questions and earned $score points!",
                                fontSize = 14.sp,
                                textAlign = TextAlign.Center,
                                color = Color(0xFF334155)
                            )
                            Spacer(Modifier.height(18.dp))
                            Button(
                                onClick = onBack,
                                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF16A34A)),
                                shape = RoundedCornerShape(16.dp)
                            ) {
                                Text("Back to Brain Zone ➔", fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            } else {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(horizontal = 16.dp, vertical = 8.dp),
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    // HUD Bar
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Surface(
                            shape = RoundedCornerShape(16.dp),
                            color = Color(0xFFF59E0B).copy(alpha = 0.2f),
                            border = BorderStroke(1.dp, Color(0xFFF59E0B))
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(Icons.Default.Star, contentDescription = null, tint = Color(0xFFF59E0B), modifier = Modifier.size(18.dp))
                                Spacer(Modifier.width(4.dp))
                                Text("$score pts", color = Color(0xFFFDE68A), fontWeight = FontWeight.ExtraBold)
                            }
                        }

                        // Progress counter
                        Text(
                            text = "Question ${currentQIndex + 1} / ${questions.size}",
                            color = Color(0xFF94A3B8),
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp
                        )

                        IconButton(
                            onClick = {
                                speak(currentQ.question.en, currentQ.question.ur, currentQ.question.ps)
                            },
                            modifier = Modifier
                                .size(36.dp)
                                .clip(CircleShape)
                                .background(Color(0xFF0D9488))
                        ) {
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = "Read", tint = Color.White, modifier = Modifier.size(18.dp))
                        }
                    }

                    // ARENA: Floating character descending toward defense barrier
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f)
                            .padding(vertical = 8.dp)
                    ) {
                        // Character floating down based on charProgress
                        val charOffsetY = (charProgress * 220).dp
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier
                                .align(Alignment.TopCenter)
                                .offset(y = charOffsetY)
                        ) {
                            // Cute Floating Monster
                            Text(text = currentQ.monsterEmoji, fontSize = 54.sp)
                            Text(
                                text = currentQ.characterName,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF99F6E4)
                            )
                        }

                        // Friendly message when giggled or correct
                        if (showSuccessMessage) {
                            Surface(
                                shape = RoundedCornerShape(16.dp),
                                color = Color(0xFF16A34A),
                                border = BorderStroke(2.dp, Color.White),
                                modifier = Modifier.align(Alignment.Center)
                            ) {
                                Text(
                                    text = "✨ Defended! +15 Pts! ✨",
                                    color = Color.White,
                                    fontWeight = FontWeight.ExtraBold,
                                    fontSize = 16.sp,
                                    modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp)
                                )
                            }
                        }

                        if (showGiggleMessage) {
                            Surface(
                                shape = RoundedCornerShape(16.dp),
                                color = Color(0xFF38BDF8),
                                border = BorderStroke(2.dp, Color.White),
                                modifier = Modifier.align(Alignment.Center)
                            ) {
                                Text(
                                    text = "Giggly Monster Floated Away! Next one! 🎈",
                                    color = Color.White,
                                    fontWeight = FontWeight.ExtraBold,
                                    fontSize = 15.sp,
                                    modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp)
                                )
                            }
                        }

                        // Defense Base Line
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(4.dp)
                                .align(Alignment.BottomCenter)
                                .background(
                                    Brush.horizontalGradient(
                                        listOf(Color(0xFF14B8A6), Color(0xFF38BDF8), Color(0xFF14B8A6))
                                    )
                                )
                        )
                    }

                    // QUESTION CARD
                    Card(
                        shape = RoundedCornerShape(22.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.95f)),
                        elevation = CardDefaults.cardElevation(defaultElevation = 6.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 10.dp)
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier.padding(14.dp)
                        ) {
                            Text(
                                text = currentQ.question.get(explainLang),
                                fontSize = 16.sp,
                                fontWeight = FontWeight.ExtraBold,
                                textAlign = TextAlign.Center,
                                color = Color(0xFF0F172A)
                            )

                            Spacer(Modifier.height(12.dp))

                            // 3 BIG ANSWER BUTTONS
                            currentQ.options.forEach { option ->
                                Button(
                                    onClick = { handleAnswer(option) },
                                    colors = ButtonDefaults.buttonColors(
                                        containerColor = Color(0xFF0D9488)
                                    ),
                                    shape = RoundedCornerShape(16.dp),
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(vertical = 4.dp)
                                        .height(48.dp)
                                ) {
                                    Text(
                                        text = option,
                                        fontSize = 15.sp,
                                        fontWeight = FontWeight.Bold,
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
}

@Composable
private fun DefenderStarBurst(triggerKey: Int) {
    var burstProgress by remember { mutableFloatStateOf(1f) }
    LaunchedEffect(triggerKey) {
        if (triggerKey > 0) {
            burstProgress = 0f
            val steps = 18
            for (i in 1..steps) {
                burstProgress = i / steps.toFloat()
                delay(20)
            }
            burstProgress = 1f
        }
    }

    if (burstProgress < 1f) {
        val colors = listOf(Color(0xFFFDE047), Color(0xFF38BDF8), Color(0xFF4ADE80), Color(0xFFF472B6))
        Canvas(modifier = Modifier.fillMaxSize()) {
            val cx = size.width * 0.5f
            val cy = size.height * 0.4f
            val maxRadius = size.width * 0.42f
            for (i in 0 until 16) {
                val angle = (2.0 * PI * i) / 16.0
                val dist = maxRadius * burstProgress
                val px = cx + (cos(angle) * dist).toFloat()
                val py = cy + (sin(angle) * dist).toFloat()
                val r = (16f * (1f - burstProgress)).coerceAtLeast(3f)
                drawCircle(color = colors[i % colors.size], radius = r, center = Offset(px, py))
            }
        }
    }
}
