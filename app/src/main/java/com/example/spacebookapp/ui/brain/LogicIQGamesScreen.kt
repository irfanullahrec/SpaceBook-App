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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.VolumeUp
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
import com.example.spacebookapp.ui.screens.ExplainLang
import java.util.Locale

@Composable
fun LogicIQGamesScreen(
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
                engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "iq_tts")
            }
            ExplainLang.URDU -> {
                val res = engine.setLanguage(Locale.forLanguageTag("ur-PK"))
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    engine.language = Locale.US
                    engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "iq_tts")
                } else {
                    engine.speak(textUr, TextToSpeech.QUEUE_FLUSH, null, "iq_tts")
                }
            }
            ExplainLang.PASHTO -> {
                val res = engine.setLanguage(Locale.forLanguageTag("ps-AF"))
                if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
                    val urRes = engine.setLanguage(Locale.forLanguageTag("ur-PK"))
                    if (urRes == TextToSpeech.LANG_MISSING_DATA || urRes == TextToSpeech.LANG_NOT_SUPPORTED) {
                        engine.language = Locale.US
                        engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "iq_tts")
                    } else {
                        engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "iq_tts")
                    }
                } else {
                    engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "iq_tts")
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

    val challenges = BrainZoneContent.IQ_CHALLENGES
    var currentIndex by remember { mutableIntStateOf(0) }
    var score by remember { mutableIntStateOf(0) }
    var isSuccess by remember { mutableStateOf(false) }

    val challenge = challenges.getOrElse(currentIndex) { challenges.first() }
    val isAllDone = currentIndex >= challenges.size

    LaunchedEffect(currentIndex) {
        isSuccess = false
        if (currentIndex < challenges.size) {
            speak(challenge.hint.en, challenge.hint.ur, challenge.hint.ps)
        }
    }

    fun handlePick(option: String) {
        if (option == challenge.correctAnswer) {
            playTone(true)
            score += 20
            isSuccess = true
            BrainProgressManager.addPoints(context, BrainCategory.IQ, 20, 1)
        } else {
            playTone(false)
        }
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Brush.horizontalGradient(listOf(Color(0xFF3B0764), Color(0xFF581C87), Color(0xFF7E22CE))))
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
                            text = "🧩 Logic & IQ",
                            fontSize = 17.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                        Text(
                            text = "Puzzle ${currentIndex + 1} of ${challenges.size}",
                            fontSize = 11.sp,
                            color = Color(0xFFE9D5FF),
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        ExplainLang.entries.forEach { lang ->
                            val sel = explainLang == lang
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (sel) Color(0xFFA855F7) else Color.White.copy(alpha = 0.15f),
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
                .background(Brush.verticalGradient(listOf(Color(0xFF0F172A), Color(0xFF2E1065), Color(0xFF3B0764))))
                .padding(16.dp)
        ) {
            if (isAllDone) {
                Card(
                    shape = RoundedCornerShape(26.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFFAF5FF)),
                    modifier = Modifier
                        .fillMaxWidth(0.9f)
                        .align(Alignment.Center)
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.padding(24.dp)
                    ) {
                        Text("🧩💡", fontSize = 52.sp)
                        Spacer(Modifier.height(8.dp))
                        Text("Logic Champion!", fontSize = 22.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFF6B21A8))
                        Spacer(Modifier.height(6.dp))
                        Text("All reasoning patterns solved! Total IQ Score: $score pts", textAlign = TextAlign.Center, color = Color(0xFF475569))
                        Spacer(Modifier.height(18.dp))
                        Button(
                            onClick = onBack,
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF7E22CE)),
                            shape = RoundedCornerShape(16.dp)
                        ) {
                            Text("Back to Hub ➔", fontWeight = FontWeight.Bold)
                        }
                    }
                }
            } else {
                Column(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    // Pattern Clue Card
                    Card(
                        shape = RoundedCornerShape(22.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.95f)),
                        elevation = CardDefaults.cardElevation(defaultElevation = 6.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            modifier = Modifier.padding(16.dp)
                        ) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Text(
                                    text = challenge.title.get(explainLang),
                                    fontSize = 17.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color(0xFF581C87)
                                )
                                IconButton(
                                    onClick = {
                                        speak(challenge.hint.en, challenge.hint.ur, challenge.hint.ps)
                                    },
                                    modifier = Modifier
                                        .size(34.dp)
                                        .clip(CircleShape)
                                        .background(Color(0xFF7E22CE))
                                ) {
                                    Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = Color.White, modifier = Modifier.size(18.dp))
                                }
                            }

                            Spacer(Modifier.height(14.dp))

                            // Sequence Display
                            Row(
                                horizontalArrangement = Arrangement.Center,
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                challenge.sequenceEmojis.forEach { item ->
                                    Surface(
                                        shape = RoundedCornerShape(16.dp),
                                        color = Color(0xFFF3E8FF),
                                        border = BorderStroke(2.dp, Color(0xFFC084FC)),
                                        modifier = Modifier.padding(horizontal = 4.dp)
                                    ) {
                                        Text(
                                            text = item,
                                            fontSize = 32.sp,
                                            fontWeight = FontWeight.ExtraBold,
                                            color = Color(0xFF4A044E),
                                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 8.dp)
                                        )
                                    }
                                }
                            }

                            Spacer(Modifier.height(10.dp))
                            Text(
                                text = challenge.hint.get(explainLang),
                                fontSize = 13.sp,
                                color = Color(0xFF6B7280),
                                textAlign = TextAlign.Center
                            )
                        }
                    }

                    // Options Area
                    Card(
                        shape = RoundedCornerShape(24.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.10f)),
                        border = BorderStroke(2.dp, Color(0xFFA855F7)),
                        modifier = Modifier
                            .fillMaxWidth()
                            .weight(1f)
                            .padding(vertical = 14.dp)
                    ) {
                        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.spacedBy(10.dp),
                                modifier = Modifier.padding(16.dp)
                            ) {
                                Text(
                                    text = "Tap the piece that fits:",
                                    color = Color(0xFFE9D5FF),
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 15.sp
                                )

                                challenge.options.forEach { opt ->
                                    Button(
                                        onClick = { handlePick(opt) },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF7E22CE)),
                                        shape = RoundedCornerShape(18.dp),
                                        modifier = Modifier
                                            .fillMaxWidth(0.85f)
                                            .height(52.dp)
                                    ) {
                                        Text(opt, fontSize = 22.sp, fontWeight = FontWeight.ExtraBold)
                                    }
                                }
                            }

                            // Success Overlay
                            if (isSuccess) {
                                Surface(
                                    shape = RoundedCornerShape(20.dp),
                                    color = Color(0xFF16A34A),
                                    border = BorderStroke(3.dp, Color.White),
                                    modifier = Modifier.padding(20.dp)
                                ) {
                                    Column(
                                        horizontalAlignment = Alignment.CenterHorizontally,
                                        modifier = Modifier.padding(20.dp)
                                    ) {
                                        Text("🌟 Brilliant Logic! +20 Pts! 🌟", color = Color.White, fontWeight = FontWeight.ExtraBold, fontSize = 16.sp)
                                        Spacer(Modifier.height(10.dp))
                                        Button(
                                            onClick = { currentIndex++ },
                                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF15803D)),
                                            shape = RoundedCornerShape(14.dp)
                                        ) {
                                            Text("Next Puzzle ➔", fontWeight = FontWeight.Bold)
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Score pill bottom
                    Surface(
                        shape = RoundedCornerShape(14.dp),
                        color = Color.White.copy(alpha = 0.12f),
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    ) {
                        Text(
                            text = "⭐ Current IQ Stars: $score",
                            color = Color(0xFFFDE68A),
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp)
                        )
                    }
                }
            }
        }
    }
}
