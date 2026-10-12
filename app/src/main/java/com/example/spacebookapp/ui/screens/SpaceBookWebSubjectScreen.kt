package com.example.spacebookapp.ui.screens

import android.annotation.SuppressLint
import android.os.Handler
import android.os.Looper
import android.speech.tts.TextToSpeech
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.scaleIn
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowLeft
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.MenuBook
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
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.compose.ui.window.Dialog
import androidx.compose.ui.window.DialogProperties
import kotlinx.coroutines.delay
import org.json.JSONObject
import java.util.Locale
import kotlin.math.sin

data class WebChapterMeta(
    val index: Int,
    val number: String,
    val title: String,
    val subtitle: String
)

data class WebTabMeta(
    val id: String,
    val label: String,
    val active: Boolean
)

private const val GAME_TAB_ID = "__interactive_game__"

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun SpaceBookWebSubjectScreen(
    classId: String,
    subjId: String,
    subjectTitle: String,
    subjectSubtitle: String = "KPK Textbook Board",
    accentColor: Color = Color(0xFF0284C7),
    secondaryColor: Color = Color(0xFF0F172A),
    initialChapter: Int = 0,
    gameStages: List<Class4StageData>? = null,
    defaultGameLang: ExplainLang = ExplainLang.ENGLISH,
    onBackClick: () -> Unit
) {
    val context = LocalContext.current
    val mainHandler = remember { Handler(Looper.getMainLooper()) }

    var chapters by remember(classId, subjId) { mutableStateOf<List<WebChapterMeta>>(emptyList()) }
    var webTabs by remember(classId, subjId) { mutableStateOf<List<WebTabMeta>>(emptyList()) }
    var activeChapterIndex by remember(classId, subjId) { mutableIntStateOf(initialChapter) }
    var activeTabId by remember(classId, subjId) { mutableStateOf("") }
    var isLoaded by remember(classId, subjId) { mutableStateOf(false) }
    var showUnitsPicker by remember { mutableStateOf(false) }

    var webViewRef by remember { mutableStateOf<WebView?>(null) }

    // Native Android TTS for both WebView Read Aloud & optional Game tab
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

    fun speakText(text: String, langTag: String) {
        val engine = tts ?: return
        val locale = when {
            langTag.startsWith("ur", ignoreCase = true) -> Locale.forLanguageTag("ur-PK")
            langTag.startsWith("ps", ignoreCase = true) -> Locale.forLanguageTag("ps-AF")
            langTag.startsWith("ar", ignoreCase = true) -> Locale.forLanguageTag("ar-SA")
            else -> Locale.US
        }
        val res = engine.setLanguage(locale)
        if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
            engine.setLanguage(Locale.forLanguageTag("ur-PK"))
        }
        engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, "spacebook_web_tts")
    }

    fun selectChapterInWeb(index: Int) {
        val coerced = if (chapters.isNotEmpty()) index.coerceIn(0, chapters.lastIndex) else index.coerceAtLeast(0)
        activeChapterIndex = coerced
        webViewRef?.scrollTo(0, 0)
        webViewRef?.evaluateJavascript("window.mobileSelectChapter && window.mobileSelectChapter($coerced);", null)
    }

    fun selectTabInWeb(tabId: String) {
        activeTabId = tabId
        if (tabId != GAME_TAB_ID) {
            val escaped = tabId.replace("'", "\\'")
            webViewRef?.scrollTo(0, 0)
            webViewRef?.evaluateJavascript("window.mobileSelectTab && window.mobileSelectTab('$escaped');", null)
        }
    }

    val unitRowState = rememberLazyListState()
    LaunchedEffect(activeChapterIndex, chapters.size) {
        if (chapters.isNotEmpty() && activeChapterIndex in chapters.indices) {
            unitRowState.animateScrollToItem(activeChapterIndex)
        }
    }

    BackHandler {
        if (showUnitsPicker) {
            showUnitsPicker = false
        } else {
            onBackClick()
        }
    }

    val hasGames = !gameStages.isNullOrEmpty()
    val allTabs = remember(webTabs, hasGames) {
        if (hasGames) {
            webTabs + WebTabMeta(id = GAME_TAB_ID, label = "🎮 Interactive Game", active = false)
        } else {
            webTabs
        }
    }

    val currentChapter = chapters.getOrNull(activeChapterIndex)

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
                    .padding(top = 8.dp, bottom = 8.dp)
            ) {
                // 1. Mobile Header Row: Back Button + Subject/Unit Title + "All Units" BottomSheet Button
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(
                        onClick = onBackClick,
                        modifier = Modifier
                            .size(36.dp)
                            .background(Color.White.copy(alpha = 0.18f), CircleShape)
                    ) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = Color.White,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                    Spacer(Modifier.width(10.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = subjectTitle,
                            color = Color.White,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.ExtraBold,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                        Text(
                            text = if (currentChapter != null) {
                                "Unit ${currentChapter.number}: ${currentChapter.title}"
                            } else {
                                subjectSubtitle
                            },
                            color = Color(0xFFFDE68A),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.SemiBold,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                    if (chapters.isNotEmpty()) {
                        Spacer(Modifier.width(8.dp))
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = Color.White,
                            modifier = Modifier.clickable { showUnitsPicker = true }
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(
                                    Icons.Default.MenuBook,
                                    contentDescription = "All Units",
                                    tint = secondaryColor,
                                    modifier = Modifier.size(15.dp)
                                )
                                Spacer(Modifier.width(4.dp))
                                Text(
                                    text = "Units (${chapters.size})",
                                    color = secondaryColor,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                            }
                        }
                    }
                }

                // 2. Horizontal Scrollable Unit Selector Bar with Prev/Next Quick Buttons
                if (chapters.isNotEmpty()) {
                    Spacer(Modifier.height(8.dp))
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 8.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        IconButton(
                            onClick = {
                                if (activeChapterIndex > 0) {
                                    selectChapterInWeb(activeChapterIndex - 1)
                                }
                            },
                            enabled = activeChapterIndex > 0,
                            modifier = Modifier.size(28.dp)
                        ) {
                            Icon(
                                Icons.AutoMirrored.Filled.KeyboardArrowLeft,
                                contentDescription = "Previous Unit",
                                tint = if (activeChapterIndex > 0) Color.White else Color.White.copy(alpha = 0.35f)
                            )
                        }

                        LazyRow(
                            state = unitRowState,
                            modifier = Modifier.weight(1f),
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            contentPadding = PaddingValues(horizontal = 4.dp)
                        ) {
                            itemsIndexed(chapters) { idx, ch ->
                                val isSelected = idx == activeChapterIndex
                                Surface(
                                    shape = RoundedCornerShape(10.dp),
                                    color = if (isSelected) Color(0xFFFFD54F) else Color.White.copy(alpha = 0.16f),
                                    border = if (isSelected) BorderStroke(1.5.dp, Color.White) else null,
                                    modifier = Modifier.clickable { selectChapterInWeb(idx) }
                                ) {
                                    Row(
                                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Text(
                                            text = "Unit ${ch.number}",
                                            color = if (isSelected) Color(0xFF0F172A) else Color.White,
                                            fontSize = 11.sp,
                                            fontWeight = FontWeight.ExtraBold
                                        )
                                        if (isSelected && ch.title.isNotBlank()) {
                                            Spacer(Modifier.width(5.dp))
                                            Text(
                                                text = "• ${ch.title}",
                                                color = Color(0xFF0F172A),
                                                fontSize = 11.sp,
                                                fontWeight = FontWeight.Bold,
                                                maxLines = 1,
                                                overflow = TextOverflow.Ellipsis,
                                                modifier = Modifier.widthIn(max = 150.dp)
                                            )
                                        }
                                    }
                                }
                            }
                        }

                        IconButton(
                            onClick = {
                                if (activeChapterIndex < chapters.lastIndex) {
                                    selectChapterInWeb(activeChapterIndex + 1)
                                }
                            },
                            enabled = activeChapterIndex < chapters.lastIndex,
                            modifier = Modifier.size(28.dp)
                        ) {
                            Icon(
                                Icons.AutoMirrored.Filled.KeyboardArrowRight,
                                contentDescription = "Next Unit",
                                tint = if (activeChapterIndex < chapters.lastIndex) Color.White else Color.White.copy(alpha = 0.35f)
                            )
                        }
                    }
                }

                // 3. Subject-Specific Tabs Bar (directly mirroring SpaceBook Web tabs for this subject)
                if (allTabs.isNotEmpty()) {
                    Spacer(Modifier.height(8.dp))
                    LazyRow(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(6.dp),
                        contentPadding = PaddingValues(horizontal = 12.dp)
                    ) {
                        itemsIndexed(allTabs) { _, tab ->
                            val isSelected = tab.id == activeTabId
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (isSelected) Color.White else Color.Black.copy(alpha = 0.24f),
                                border = if (isSelected) BorderStroke(1.5.dp, Color(0xFFFFD54F)) else BorderStroke(1.dp, Color.White.copy(alpha = 0.22f)),
                                modifier = Modifier.clickable { selectTabInWeb(tab.id) }
                            ) {
                                Text(
                                    text = tab.label,
                                    color = if (isSelected) secondaryColor else Color.White,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
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
                .background(Color(0xFFF8FAFC))
                .padding(innerPadding)
        ) {
            // Keep WebView alive underneath so switching to/from Game tab is instant
            AndroidView(
                modifier = Modifier.fillMaxSize(),
                factory = { ctx ->
                    object : WebView(ctx) {
                        @SuppressLint("ClickableViewAccessibility")
                        override fun onTouchEvent(event: MotionEvent?): Boolean {
                            when (event?.actionMasked) {
                                MotionEvent.ACTION_DOWN,
                                MotionEvent.ACTION_MOVE -> {
                                    parent?.requestDisallowInterceptTouchEvent(true)
                                }
                            }
                            return super.onTouchEvent(event)
                        }
                    }.apply {
                        layoutParams = ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT
                        )
                        isVerticalScrollBarEnabled = true
                        isHorizontalScrollBarEnabled = false
                        overScrollMode = View.OVER_SCROLL_ALWAYS
                        isFocusable = true
                        isFocusableInTouchMode = true
                        settings.apply {
                            javaScriptEnabled = true
                            domStorageEnabled = true
                            allowFileAccess = true
                            allowContentAccess = true
                            allowFileAccessFromFileURLs = true
                            allowUniversalAccessFromFileURLs = true
                            loadsImagesAutomatically = true
                            builtInZoomControls = false
                            displayZoomControls = false
                            useWideViewPort = false
                            loadWithOverviewMode = false
                            textZoom = 100
                            cacheMode = WebSettings.LOAD_NO_CACHE
                            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                        }
                        webChromeClient = WebChromeClient()
                        webViewClient = object : WebViewClient() {
                            override fun onPageFinished(view: WebView?, url: String?) {
                                super.onPageFinished(view, url)
                                isLoaded = true
                            }
                        }
                        addJavascriptInterface(
                            object {
                                @JavascriptInterface
                                fun onMetadataReady(jsonStr: String) {
                                    try {
                                        val root = JSONObject(jsonStr)
                                        val chArr = root.optJSONArray("chapters")
                                        val parsedChapters = mutableListOf<WebChapterMeta>()
                                        if (chArr != null) {
                                            for (i in 0 until chArr.length()) {
                                                val o = chArr.optJSONObject(i) ?: continue
                                                parsedChapters.add(
                                                    WebChapterMeta(
                                                        index = o.optInt("index", i),
                                                        number = o.optString("number", (i + 1).toString()),
                                                        title = o.optString("title", "Unit ${i + 1}"),
                                                        subtitle = o.optString("subtitle", "")
                                                    )
                                                )
                                            }
                                        }
                                        val tabArr = root.optJSONArray("tabs")
                                        val parsedTabs = mutableListOf<WebTabMeta>()
                                        if (tabArr != null) {
                                            for (i in 0 until tabArr.length()) {
                                                val o = tabArr.optJSONObject(i) ?: continue
                                                parsedTabs.add(
                                                    WebTabMeta(
                                                        id = o.optString("id", ""),
                                                        label = o.optString("label", ""),
                                                        active = o.optBoolean("active", false)
                                                    )
                                                )
                                            }
                                        }
                                        val actCh = root.optInt("activeChapter", 0)
                                        val actTab = root.optString("activeTab", "")

                                        mainHandler.post {
                                            if (parsedChapters.isNotEmpty()) {
                                                chapters = parsedChapters
                                            }
                                            if (parsedTabs.isNotEmpty()) {
                                                webTabs = parsedTabs
                                            }
                                            activeChapterIndex = actCh
                                            if (activeTabId != GAME_TAB_ID && actTab.isNotBlank()) {
                                                activeTabId = actTab
                                            } else if (activeTabId.isBlank() && parsedTabs.isNotEmpty()) {
                                                activeTabId = parsedTabs.first().id
                                            }
                                            isLoaded = true
                                        }
                                    } catch (e: Exception) {
                                        e.printStackTrace()
                                    }
                                }

                                @JavascriptInterface
                                fun speak(text: String, lang: String) {
                                    mainHandler.post {
                                        speakText(text, lang)
                                    }
                                }

                                @JavascriptInterface
                                fun stopSpeaking() {
                                    mainHandler.post {
                                        tts?.stop()
                                    }
                                }
                            },
                            "AndroidBridge"
                        )
                        val url = "file:///android_asset/spacebook_web/mobile_reader.html?classId=$classId&subjId=$subjId&initCh=$initialChapter"
                        loadUrl(url)
                        webViewRef = this
                    }
                },
                update = { view ->
                    webViewRef = view
                }
            )

            // Optional Interactive Game Tab Overlay (when subject has interactive games)
            if (activeTabId == GAME_TAB_ID && !gameStages.isNullOrEmpty()) {
                val stageIndex = activeChapterIndex.coerceIn(0, gameStages.lastIndex)
                val stage = gameStages[stageIndex]
                InteractiveMiniGamePanel(
                    screenKey = "$classId-$subjId",
                    stage = stage,
                    accentColor = accentColor,
                    secondaryColor = secondaryColor,
                    defaultLang = defaultGameLang,
                    onSpeak = { txt, lang ->
                        val tag = when (lang) {
                            ExplainLang.ENGLISH -> "en-US"
                            ExplainLang.URDU -> "ur-PK"
                            ExplainLang.PASHTO -> "ps-AF"
                        }
                        speakText(txt, tag)
                    },
                    onStageCompleted = {
                        if (activeChapterIndex < chapters.lastIndex) {
                            selectChapterInWeb(activeChapterIndex + 1)
                        }
                    }
                )
            }

            if (!isLoaded) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color(0xFFF8FAFC)),
                    contentAlignment = Alignment.Center
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        CircularProgressIndicator(color = accentColor)
                        Spacer(Modifier.height(12.dp))
                        Text(
                            text = "Loading $subjectTitle…",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF334155)
                        )
                    }
                }
            }
        }
    }

    // All Units Picker Dialog / BottomSheet Modal
    if (showUnitsPicker && chapters.isNotEmpty()) {
        Dialog(
            onDismissRequest = { showUnitsPicker = false },
            properties = DialogProperties(usePlatformDefaultWidth = false)
        ) {
            Surface(
                shape = RoundedCornerShape(24.dp),
                color = Color.White,
                modifier = Modifier
                    .fillMaxWidth(0.94f)
                    .fillMaxHeight(0.82f)
            ) {
                Column(modifier = Modifier.fillMaxSize()) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(
                                Brush.horizontalGradient(
                                    listOf(secondaryColor, accentColor)
                                )
                            )
                            .padding(horizontal = 18.dp, vertical = 14.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = "$subjectTitle • All Units",
                                color = Color.White,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                            Text(
                                text = "Select any chapter or unit (${chapters.size} total)",
                                color = Color(0xFFFDE68A),
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Medium
                            )
                        }
                        IconButton(
                            onClick = { showUnitsPicker = false },
                            modifier = Modifier
                                .size(34.dp)
                                .background(Color.White.copy(alpha = 0.2f), CircleShape)
                        ) {
                            Icon(
                                Icons.Default.Close,
                                contentDescription = "Close",
                                tint = Color.White,
                                modifier = Modifier.size(18.dp)
                            )
                        }
                    }

                    LazyColumn(
                        modifier = Modifier.fillMaxSize(),
                        contentPadding = PaddingValues(14.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        itemsIndexed(chapters) { idx, ch ->
                            val isSelected = idx == activeChapterIndex
                            Surface(
                                shape = RoundedCornerShape(14.dp),
                                color = if (isSelected) accentColor.copy(alpha = 0.12f) else Color(0xFFF8FAFC),
                                border = BorderStroke(
                                    width = if (isSelected) 2.dp else 1.dp,
                                    color = if (isSelected) accentColor else Color(0xFFE2E8F0)
                                ),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable {
                                        selectChapterInWeb(idx)
                                        showUnitsPicker = false
                                    }
                            ) {
                                Row(
                                    modifier = Modifier.padding(14.dp),
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .size(40.dp)
                                            .clip(RoundedCornerShape(10.dp))
                                            .background(if (isSelected) accentColor else secondaryColor),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Text(
                                            text = ch.number,
                                            color = Color.White,
                                            fontSize = 14.sp,
                                            fontWeight = FontWeight.ExtraBold
                                        )
                                    }
                                    Spacer(Modifier.width(12.dp))
                                    Column(modifier = Modifier.weight(1f)) {
                                        Text(
                                            text = ch.title,
                                            color = Color(0xFF0F172A),
                                            fontSize = 14.sp,
                                            fontWeight = FontWeight.ExtraBold
                                        )
                                        if (ch.subtitle.isNotBlank()) {
                                            Spacer(Modifier.height(2.dp))
                                            Text(
                                                text = ch.subtitle,
                                                color = Color(0xFF475569),
                                                fontSize = 12.sp,
                                                fontWeight = FontWeight.Medium
                                            )
                                        }
                                    }
                                    if (isSelected) {
                                        Surface(
                                            shape = RoundedCornerShape(8.dp),
                                            color = accentColor
                                        ) {
                                            Text(
                                                text = "Active",
                                                color = Color.White,
                                                fontSize = 11.sp,
                                                fontWeight = FontWeight.Bold,
                                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
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
    }
}

@Composable
private fun InteractiveMiniGamePanel(
    screenKey: String,
    stage: Class4StageData,
    accentColor: Color,
    secondaryColor: Color,
    defaultLang: ExplainLang,
    onSpeak: (String, ExplainLang) -> Unit,
    onStageCompleted: () -> Unit
) {
    var selectedLang by remember(screenKey) { mutableStateOf(defaultLang) }
    var showOverlay by remember(screenKey, stage.id) { mutableStateOf(false) }

    LaunchedEffect(showOverlay) {
        if (showOverlay) {
            val congrats = when (selectedLang) {
                ExplainLang.ENGLISH -> "Awesome! Stage complete!"
                ExplainLang.URDU -> "ماشاء اللہ! مرحلہ مکمل!"
                ExplainLang.PASHTO -> "شاباش! مرحله بشپړه شوه!"
            }
            onSpeak(congrats, selectedLang)
            delay(1800)
            showOverlay = false
            onStageCompleted()
        }
    }

    val infiniteTransition = rememberInfiniteTransition(label = "game_pulse")
    val pulse by infiniteTransition.animateFloat(
        initialValue = 0.96f,
        targetValue = 1.04f,
        animationSpec = infiniteRepeatable(tween(900), RepeatMode.Reverse),
        label = "pulse"
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(14.dp)
        ) {
            // Language selector for voice explanation
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "🎮 Interactive Learning Game",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = secondaryColor
                )
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    ExplainLang.entries.forEach { lang ->
                        val active = selectedLang == lang
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = if (active) accentColor else Color(0xFFE2E8F0),
                            modifier = Modifier.clickable {
                                selectedLang = lang
                            }
                        ) {
                            Text(
                                text = lang.label,
                                color = if (active) Color.White else Color(0xFF1E293B),
                                fontSize = 11.sp,
                                fontWeight = FontWeight.ExtraBold,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                            )
                        }
                    }
                }
            }

            Spacer(Modifier.height(10.dp))

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
                                            onSpeak(item, selectedLang)
                                            if (isTarget) {
                                                val next = step + 1
                                                step = next
                                                if (next >= items.size) {
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
                    } else if (stage.cards.isNotEmpty()) {
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
                                .clickable { onSpeak(target.heading, selectedLang) }
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
                                            onSpeak(opt.subHeading, selectedLang)
                                            if (opt == target) {
                                                if (roundIdx + 1 >= cards.size) {
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
                        text = "Stage Completed!",
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
