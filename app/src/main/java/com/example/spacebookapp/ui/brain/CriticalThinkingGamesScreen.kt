package com.example.spacebookapp.ui.brain

import android.media.AudioManager
import android.media.ToneGenerator
import android.speech.tts.TextToSpeech
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
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
import com.example.spacebookapp.data.brain.BrainCategory
import com.example.spacebookapp.data.brain.BrainProgressManager
import com.example.spacebookapp.data.brain.BrainZoneContent
import com.example.spacebookapp.data.brain.CriticalThinkingChallenge
import com.example.spacebookapp.ui.screens.ExplainLang
import java.util.Locale

@Composable
fun CriticalThinkingGamesScreen(
    onBack: () -> Unit
) {
    val context = LocalContext.current
    var explainLang by remember { mutableStateOf(ExplainLang.ENGLISH) }
    var soundEnabled by remember { mutableStateOf(true) }

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
                engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "think_tts")
            }
            ExplainLang.URDU -> {
                val res = engine.setLanguage(Locale.forLanguageTag("ur-PK"))
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    engine.language = Locale.US
                    engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "think_tts")
                } else {
                    engine.speak(textUr, TextToSpeech.QUEUE_FLUSH, null, "think_tts")
                }
            }
            ExplainLang.PASHTO -> {
                val res = engine.setLanguage(Locale.forLanguageTag("ps-AF"))
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    val urRes = engine.setLanguage(Locale.forLanguageTag("ur-PK"))
                    if (urRes == TextToSpeech.LANG_MISSING_DATA || urRes == TextToSpeech.LANG_NOT_SUPPORTED) {
                        engine.language = Locale.US
                        engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "think_tts")
                    } else {
                        engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "think_tts")
                    }
                } else {
                    engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "think_tts")
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
        onDispose { toneGen?.release() }
    }

    fun playTone(success: Boolean) {
        if (!soundEnabled) return
        try {
            if (success) toneGen?.startTone(ToneGenerator.TONE_PROP_BEEP2, 160)
            else toneGen?.startTone(ToneGenerator.TONE_PROP_NACK, 130)
        } catch (_: Exception) {}
    }

    val challenges = BrainZoneContent.THINKING_CHALLENGES
    var currentIndex by remember { mutableIntStateOf(0) }
    var score by remember { mutableIntStateOf(0) }
    var isSuccess by remember { mutableStateOf(false) }

    val challenge = challenges.getOrElse(currentIndex) { challenges.first() }
    val isAllDone = currentIndex >= challenges.size

    LaunchedEffect(currentIndex) {
        isSuccess = false
        if (currentIndex < challenges.size) {
            speak(challenge.question.en, challenge.question.ur, challenge.question.ps)
        }
    }

    fun handlePick(index: Int) {
        if (index == challenge.correctIndex) {
            playTone(true)
            score += 25
            isSuccess = true
            BrainProgressManager.addPoints(context, BrainCategory.THINKING, 25, 2)
            speak(challenge.whyExplain.en, challenge.whyExplain.ur, challenge.whyExplain.ps)
        } else {
            playTone(false)
        }
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Brush.horizontalGradient(listOf(Color(0xFF78350F), Color(0xFFB45309), Color(0xFFD97706))))
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
                            text = "💡 Deep Analysis & Why?",
                            fontSize = 17.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                        Text(
                            text = challenge.bookChapter,
                            fontSize = 11.sp,
                            color = Color(0xFFFEF08A),
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        ExplainLang.entries.forEach { lang ->
                            val sel = explainLang == lang
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (sel) Color(0xFFF59E0B) else Color.White.copy(alpha = 0.15f),
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
                .background(Brush.verticalGradient(listOf(Color(0xFF0F172A), Color(0xFF451A03), Color(0xFF78350F))))
                .padding(16.dp)
        ) {
            if (isAllDone) {
                Card(
                    shape = RoundedCornerShape(26.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFFEFCE8)),
                    modifier = Modifier
                        .fillMaxWidth(0.9f)
                        .align(Alignment.Center)
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.padding(24.dp)
                    ) {
                        Text("💡🎓", fontSize = 52.sp)
                        Spacer(Modifier.height(8.dp))
                        Text("Deep Thinker Master!", fontSize = 22.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFFB45309))
                        Spacer(Modifier.height(6.dp))
                        Text("You analyzed causes, effects, facts and reasons! Total Thinking Score: $score pts", textAlign = TextAlign.Center, color = Color(0xFF475569))
                        Spacer(Modifier.height(18.dp))
                        Button(
                            onClick = onBack,
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFD97706)),
                            shape = RoundedCornerShape(16.dp)
                        ) {
                            Text("Back to Hub ➔", fontWeight = FontWeight.Bold)
                        }
                    }
                }
            } else {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .verticalScroll(rememberScrollState()),
                    verticalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    // Scenario Box
                    Card(
                        shape = RoundedCornerShape(22.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = 6.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = "📖 Case Scenario",
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color(0xFFB45309)
                                )
                                IconButton(
                                    onClick = {
                                        speak(challenge.scenario.en, challenge.scenario.ur, challenge.scenario.ps)
                                    },
                                    modifier = Modifier
                                        .size(32.dp)
                                        .clip(CircleShape)
                                        .background(Color(0xFFD97706))
                                ) {
                                    Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color.White, modifier = Modifier.size(16.dp))
                                }
                            }
                            Spacer(Modifier.height(6.dp))
                            Text(
                                text = challenge.scenario.get(explainLang),
                                fontSize = 15.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = Color(0xFF1E293B)
                            )
                        }
                    }

                    // Question Card
                    Card(
                        shape = RoundedCornerShape(22.dp),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFFFEF3C7)),
                        border = BorderStroke(2.dp, Color(0xFFF59E0B)),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier.padding(16.dp)
                        ) {
                            Text(
                                text = challenge.question.get(explainLang),
                                fontSize = 16.sp,
                                fontWeight = FontWeight.ExtraBold,
                                textAlign = TextAlign.Center,
                                color = Color(0xFF78350F)
                            )
                        }
                    }

                    // Options
                    challenge.options.forEachIndexed { optIndex, optText ->
                        Card(
                            shape = RoundedCornerShape(18.dp),
                            colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.95f)),
                            modifier = Modifier
                                .fillMaxWidth()
                                .clickable { handlePick(optIndex) }
                        ) {
                            Row(
                                modifier = Modifier.padding(14.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Surface(
                                    shape = CircleShape,
                                    color = Color(0xFFD97706),
                                    modifier = Modifier.size(28.dp)
                                ) {
                                    Box(contentAlignment = Alignment.Center) {
                                        Text("${optIndex + 1}", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                    }
                                }
                                Spacer(Modifier.width(10.dp))
                                Text(
                                    text = optText.get(explainLang),
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFF0F172A)
                                )
                            }
                        }
                    }

                    // Why Explanation Overlay
                    AnimatedVisibility(
                        visible = isSuccess,
                        enter = fadeIn() + scaleIn()
                    ) {
                        Surface(
                            shape = RoundedCornerShape(20.dp),
                            color = Color(0xFF15803D),
                            border = BorderStroke(3.dp, Color(0xFF86EFAC)),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                modifier = Modifier.padding(18.dp)
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(Icons.Default.Lightbulb, contentDescription = null, tint = Color(0xFFFEF08A))
                                    Spacer(Modifier.width(6.dp))
                                    Text("WHY? (Deep Reasoning)", color = Color.White, fontWeight = FontWeight.ExtraBold, fontSize = 16.sp)
                                }
                                Spacer(Modifier.height(8.dp))
                                Text(
                                    text = challenge.whyExplain.get(explainLang),
                                    color = Color(0xFFF0FDF4),
                                    fontSize = 14.sp,
                                    textAlign = TextAlign.Center
                                )
                                Spacer(Modifier.height(14.dp))
                                Button(
                                    onClick = { currentIndex++ },
                                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF166534)),
                                    shape = RoundedCornerShape(14.dp)
                                ) {
                                    Text("Next Investigation ➔", fontWeight = FontWeight.Bold)
                                }
                            }
                        }
                    }

                    Spacer(Modifier.height(12.dp))
                }
            }
        }
    }
}
