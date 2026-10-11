package com.example.spacebookapp.ui.brain

import android.media.AudioManager
import android.media.ToneGenerator
import android.speech.tts.TextToSpeech
import androidx.activity.compose.BackHandler
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.Animatable
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
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.pager.VerticalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.Celebration
import androidx.compose.material.icons.filled.LocalFireDepartment
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.VolumeMute
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
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
import com.example.spacebookapp.ui.screens.TrilingualText
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.util.Locale

data class QuickChallengeCard(
    val id: String,
    val emoji: String,
    val subjectTag: String,
    val question: TrilingualText,
    val options: List<String>,
    val correctIndex: Int,
    val encouragementEn: String = "Awesome job! ⭐",
    val encouragementUr: String = "شاباش! بہت خوب! ⭐",
    val encouragementPs: String = "ډېر ښه! افرین! ⭐"
)

object QuickPlayDeck {
    val CARDS = listOf(
        // Card 1: Class 3 GK - The Sun
        QuickChallengeCard(
            id = "qc-1",
            emoji = "☀️",
            subjectTag = "Class 3 GK • The Sun",
            question = TrilingualText(
                en = "In which direction does the Sun rise every morning?",
                ur = "سورج ہر صبح کس سمت سے طلوع ہوتا ہے؟",
                ps = "لمر هر سهار له کوم لوري راخېژي؟"
            ),
            options = listOf("East (مشرق)", "West (مغرب)", "South (جنوب)"),
            correctIndex = 0
        ),
        // Card 2: Brain Zone - Logic Pattern
        QuickChallengeCard(
            id = "qc-2",
            emoji = "🪐",
            subjectTag = "Logic IQ • What Comes Next?",
            question = TrilingualText(
                en = "What comes next in pattern: 🌕 🌖 🌗 ?",
                ur = "اگلی شکل کیا آئے گی: 🌕 🌖 🌗 ؟",
                ps = "وروسته به څه راشي: 🌕 🌖 🌗 ؟"
            ),
            options = listOf("🌘", "☀️", "⭐"),
            correctIndex = 0
        ),
        // Card 3: Class 3 GK - Natural Resources
        QuickChallengeCard(
            id = "qc-3",
            emoji = "💧",
            subjectTag = "Class 3 GK • Conservation",
            question = TrilingualText(
                en = "Why should we turn off the tap while brushing teeth?",
                ur = "دانت صاف کرتے وقت نل کیوں بند رکھنا چاہیے؟",
                ps = "د غاښونو مینځلو پر مهال نل ولې باید بند کړو؟"
            ),
            options = listOf("To Save Water (پانی بچانے کیلئے)", "To Make Noise", "For Fun"),
            correctIndex = 0
        ),
        // Card 4: Class 1 Maths - Counting
        QuickChallengeCard(
            id = "qc-4",
            emoji = "🍎",
            subjectTag = "Class 1 Maths • Count",
            question = TrilingualText(
                en = "How many apples are here? 🍎 🍎 🍎",
                ur = "یہاں کتنے سیب ہیں؟ 🍎 🍎 🍎",
                ps = "دلته څو مڼې دي؟ 🍎 🍎 🍎"
            ),
            options = listOf("2", "3", "5"),
            correctIndex = 1
        ),
        // Card 5: Class 3 GK - Quaid-e-Azam
        QuickChallengeCard(
            id = "qc-5",
            emoji = "🇵🇰",
            subjectTag = "Class 3 GK • Quaid-e-Azam",
            question = TrilingualText(
                en = "Who is the Founder of Pakistan?",
                ur = "پاکستان کے بانی کون ہیں؟",
                ps = "د پاکستان بنسټ ایښودونکی څوک دی؟"
            ),
            options = listOf("Quaid-e-Azam Muhammad Ali Jinnah", "Allama Iqbal", "Sir Syed"),
            correctIndex = 0
        ),
        // Card 6: Brain Zone - Odd One Out
        QuickChallengeCard(
            id = "qc-6",
            emoji = "🔍",
            subjectTag = "Focus • Odd One Out",
            question = TrilingualText(
                en = "Which one is different? 🚗 🚙 🚲 ✈️ (Find the flying one)",
                ur = "کونسی چیز سب سے مختلف ہے؟ 🚗 🚙 🚲 ✈️",
                ps = "کوم یو تر ټولو توپیر لري؟ 🚗 🚙 🚲 ✈️"
            ),
            options = listOf("🚗 Car", "🚲 Bike", "✈️ Airplane"),
            correctIndex = 2
        ),
        // Card 7: Class 3 GK - Matter
        QuickChallengeCard(
            id = "qc-7",
            emoji = "🧊",
            subjectTag = "Class 3 GK • Matter",
            question = TrilingualText(
                en = "Ice is water in which state?",
                ur = "برف پانی کی کونسی حالت ہے؟",
                ps = "واوره د اوبو کوم حالت دی؟"
            ),
            options = listOf("Solid (ٹھوس)", "Liquid (مائع)", "Gas (گیس)"),
            correctIndex = 0
        ),
        // Card 8: Class 1 English - Phonics
        QuickChallengeCard(
            id = "qc-8",
            emoji = "🐱",
            subjectTag = "Class 1 English • Words",
            question = TrilingualText(
                en = "Which word starts with letter C?",
                ur = "کونسا لفظ حرف C سے شروع ہوتا ہے؟",
                ps = "کومه کلمه په C توري پیل کیږي؟"
            ),
            options = listOf("Cat", "Dog", "Fish"),
            correctIndex = 0
        ),
        // Card 9: Critical Thinking - Safety
        QuickChallengeCard(
            id = "qc-9",
            emoji = "🚦",
            subjectTag = "Class 3 GK • Safety",
            question = TrilingualText(
                en = "What does the Red traffic light mean?",
                ur = "ٹریفک کا سرخ اشارہ کیا کہتا ہے؟",
                ps = "د ټرافیک سور څراغ څه معنی لري؟"
            ),
            options = listOf("Stop (رک جائیں)", "Go fast (تیز چلیں)", "Sleep (سو جائیں)"),
            correctIndex = 0
        ),
        // Card 10: Logic IQ - Analogy
        QuickChallengeCard(
            id = "qc-10",
            emoji = "🧠",
            subjectTag = "Logic IQ • Analogy",
            question = TrilingualText(
                en = "Bird is to Sky 🦅 as Fish is to ?",
                ur = "پرندے کا تعلق آسمان سے ہے تو مچھلی کا تعلق کس سے ہے؟",
                ps = "مرغۍ په هوا کې وي، نو کب په څه کې وي؟"
            ),
            options = listOf("Water 🌊 (پانی)", "Tree 🌳 (درخت)", "Car 🚗 (گاڑی)"),
            correctIndex = 0
        )
    )
}

@Composable
fun QuickPlayFeedScreen(
    onBack: () -> Unit
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val cards = QuickPlayDeck.CARDS
    val pagerState = rememberPagerState(pageCount = { cards.size })

    var explainLang by remember { mutableStateOf(ExplainLang.ENGLISH) }
    var soundEnabled by remember { mutableStateOf(true) }
    var scoreState by remember { mutableStateOf(BrainProgressManager.load(context)) }
    var showSwipeGuide by remember { mutableStateOf(true) }

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
                engine.speak(textEn, TextToSpeech.QUEUE_FLUSH, null, "feed_tts")
            }
            ExplainLang.URDU -> {
                engine.language = Locale("ur", "PK")
                engine.speak(textUr, TextToSpeech.QUEUE_FLUSH, null, "feed_tts")
            }
            ExplainLang.PASHTO -> {
                engine.language = Locale("ps", "AF")
                engine.speak(textPs, TextToSpeech.QUEUE_FLUSH, null, "feed_tts")
            }
        }
    }

    // Auto read when page changes
    LaunchedEffect(pagerState.currentPage, explainLang) {
        val currentCard = cards[pagerState.currentPage]
        speak(currentCard.question.en, currentCard.question.ur, currentCard.question.ps)
        if (pagerState.currentPage > 0) {
            showSwipeGuide = false
        }
    }

    BackHandler {
        onBack()
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0F172A))
    ) {
        // Vertical Pager (TikTok style swipe feed)
        VerticalPager(
            state = pagerState,
            modifier = Modifier.fillMaxSize()
        ) { page ->
            val card = cards[page]
            QuickCardItem(
                card = card,
                explainLang = explainLang,
                soundEnabled = soundEnabled,
                onAnswerSuccess = {
                    BrainProgressManager.addPoints(context, BrainCategory.FOCUS, points = 15, starsEarned = 1)
                    scoreState = BrainProgressManager.load(context)
                    // Auto-advance to next card smoothly after 1 second
                    scope.launch {
                        delay(1100)
                        if (page + 1 < cards.size) {
                            pagerState.animateScrollToPage(page + 1)
                        }
                    }
                },
                onSpeak = {
                    speak(card.question.en, card.question.ur, card.question.ps)
                }
            )
        }

        // Top Navigation Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 14.dp, vertical = 12.dp)
                .align(Alignment.TopCenter),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                IconButton(
                    onClick = onBack,
                    modifier = Modifier
                        .size(40.dp)
                        .clip(CircleShape)
                        .background(Color.Black.copy(alpha = 0.4f))
                ) {
                    Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
                }

                Spacer(Modifier.width(8.dp))

                // Star & Streak Badge
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color.Black.copy(alpha = 0.4f),
                    border = BorderStroke(1.dp, Color(0xFFF59E0B).copy(alpha = 0.5f))
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.Star, contentDescription = null, tint = Color(0xFFF59E0B), modifier = Modifier.size(16.dp))
                        Spacer(Modifier.width(4.dp))
                        Text("${scoreState.totalStars} Stars", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                }
            }

            Row(verticalAlignment = Alignment.CenterVertically) {
                // Language Switcher Pill
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color.Black.copy(alpha = 0.4f),
                    border = BorderStroke(1.dp, Color.White.copy(alpha = 0.3f)),
                    modifier = Modifier.clickable {
                        explainLang = when (explainLang) {
                            ExplainLang.ENGLISH -> ExplainLang.URDU
                            ExplainLang.URDU -> ExplainLang.PASHTO
                            ExplainLang.PASHTO -> ExplainLang.ENGLISH
                        }
                    }
                ) {
                    Text(
                        text = when (explainLang) {
                            ExplainLang.ENGLISH -> "🇬🇧 EN"
                            ExplainLang.URDU -> "🇵🇰 اردو"
                            ExplainLang.PASHTO -> "🇦🇫 پښتو"
                        },
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 12.sp,
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                    )
                }

                Spacer(Modifier.width(8.dp))

                // Sound Toggle
                IconButton(
                    onClick = { soundEnabled = !soundEnabled },
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(Color.Black.copy(alpha = 0.4f))
                ) {
                    Icon(
                        imageVector = if (soundEnabled) Icons.Default.VolumeUp else Icons.Default.VolumeMute,
                        contentDescription = "Sound",
                        tint = Color.White,
                        modifier = Modifier.size(18.dp)
                    )
                }
            }
        }

        // Animated Swipe Up Tutorial Hand Guide for first-time kids
        if (showSwipeGuide && pagerState.currentPage == 0) {
            val infiniteTransition = rememberInfiniteTransition(label = "hand_anim")
            val offsetY by infiniteTransition.animateFloat(
                initialValue = 0f,
                targetValue = -35f,
                animationSpec = infiniteRepeatable(
                    animation = tween(900, easing = FastOutSlowInEasing),
                    repeatMode = RepeatMode.Reverse
                ),
                label = "hand_offset"
            )

            Surface(
                shape = RoundedCornerShape(20.dp),
                color = Color.Black.copy(alpha = 0.75f),
                border = BorderStroke(1.5.dp, Color(0xFF38BDF8)),
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .offset(y = (-20).dp + offsetY.dp)
                    .padding(bottom = 20.dp)
                    .clickable { showSwipeGuide = false }
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 10.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = "👆", fontSize = 28.sp)
                    Spacer(Modifier.width(8.dp))
                    Text(
                        text = "Swipe UP for Next Challenge! 🚀",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp
                    )
                }
            }
        }
    }
}

@Composable
private fun QuickCardItem(
    card: QuickChallengeCard,
    explainLang: ExplainLang,
    soundEnabled: Boolean,
    onAnswerSuccess: () -> Unit,
    onSpeak: () -> Unit
) {
    var selectedOption by remember { mutableStateOf<Int?>(null) }
    var isCorrect by remember { mutableStateOf(false) }
    var showGiggle by remember { mutableStateOf(false) }

    fun playTone(success: Boolean) {
        if (!soundEnabled) return
        try {
            val tone = ToneGenerator(AudioManager.STREAM_MUSIC, 80)
            if (success) {
                tone.startTone(ToneGenerator.TONE_PROP_BEEP2, 180)
            } else {
                tone.startTone(ToneGenerator.TONE_PROP_NACK, 140)
            }
        } catch (_: Exception) {}
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    listOf(Color(0xFF1E1B4B), Color(0xFF0F172A), Color(0xFF020617))
                )
            )
            .padding(horizontal = 20.dp, vertical = 70.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Subject Pill & Audio Button
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Surface(
                    shape = RoundedCornerShape(14.dp),
                    color = Color(0xFF312E81).copy(alpha = 0.8f),
                    border = BorderStroke(1.dp, Color(0xFF818CF8))
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(card.subjectTag, color = Color(0xFFC7D2FE), fontWeight = FontWeight.Bold, fontSize = 12.sp)
                        Spacer(Modifier.width(6.dp))
                        IconButton(onClick = onSpeak, modifier = Modifier.size(24.dp)) {
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = "Listen", tint = Color.White, modifier = Modifier.size(16.dp))
                        }
                    }
                }
            }

            // Big Mascot / Emoji in a glowing bubble
            Box(
                modifier = Modifier
                    .size(130.dp)
                    .clip(CircleShape)
                    .background(
                        Brush.radialGradient(
                            listOf(Color(0xFF6366F1).copy(alpha = 0.4f), Color.Transparent)
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(text = card.emoji, fontSize = 80.sp)
            }

            // Big Question Text
            Card(
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.95f)),
                elevation = CardDefaults.cardElevation(defaultElevation = 8.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.padding(18.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = card.question.get(explainLang),
                        fontSize = 19.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color(0xFF0F172A),
                        textAlign = TextAlign.Center,
                        lineHeight = 26.sp
                    )
                }
            }

            Spacer(Modifier.height(10.dp))

            // Big Kid-Friendly 1-Thumb Options
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                card.options.forEachIndexed { index, option ->
                    val isThisSelected = selectedOption == index
                    val btnBg = when {
                        isThisSelected && isCorrect -> Color(0xFF16A34A)
                        isThisSelected && !isCorrect -> Color(0xFFEAB308)
                        else -> Color(0xFF1E293B)
                    }

                    Surface(
                        shape = RoundedCornerShape(18.dp),
                        color = btnBg,
                        border = BorderStroke(
                            2.dp,
                            if (isThisSelected && isCorrect) Color(0xFF86EFAC) else Color(0xFF475569)
                        ),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(60.dp)
                            .clickable {
                                selectedOption = index
                                if (index == card.correctIndex) {
                                    isCorrect = true
                                    showGiggle = false
                                    playTone(true)
                                    onAnswerSuccess()
                                } else {
                                    isCorrect = false
                                    showGiggle = true
                                    playTone(false)
                                }
                            }
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxSize()
                                .padding(horizontal = 16.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = option,
                                color = Color.White,
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 16.sp,
                                modifier = Modifier.weight(1f)
                            )

                            if (isThisSelected && isCorrect) {
                                Text("⭐", fontSize = 22.sp)
                            } else if (isThisSelected && !isCorrect) {
                                Text("🌸", fontSize = 22.sp)
                            }
                        }
                    }
                }
            }

            // Gentle encouraging feedback bar
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(44.dp),
                contentAlignment = Alignment.Center
            ) {
                if (isCorrect) {
                    Surface(
                        shape = RoundedCornerShape(16.dp),
                        color = Color(0xFF22C55E),
                        border = BorderStroke(2.dp, Color.White)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.Default.Celebration, contentDescription = null, tint = Color.White, modifier = Modifier.size(18.dp))
                            Spacer(Modifier.width(6.dp))
                            Text(
                                text = when (explainLang) {
                                    ExplainLang.ENGLISH -> card.encouragementEn
                                    ExplainLang.URDU -> card.encouragementUr
                                    ExplainLang.PASHTO -> card.encouragementPs
                                },
                                color = Color.White,
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 14.sp
                            )
                        }
                    }
                } else if (showGiggle) {
                    Surface(
                        shape = RoundedCornerShape(16.dp),
                        color = Color(0xFF0284C7),
                        border = BorderStroke(2.dp, Color.White)
                    ) {
                        Text(
                            text = "Almost! Try another option, champ! 🌸",
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                        )
                    }
                }
            }
        }
    }
}
