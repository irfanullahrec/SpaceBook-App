package com.example.spacebookapp.ui.subjects

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.key
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.web.UrduChapter
import com.example.spacebookapp.data.web.UrduSection
import com.example.spacebookapp.data.web.WebRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.util.Locale

private val UrduTabs = listOf(
    SubjectTab("lesson", "?? ???"),
    SubjectTab("ps-trans", "???? ?????"),
    SubjectTab("en-trans", "English Translation"),
    SubjectTab("video", "?? Video Lecture"),
    SubjectTab("ur-sum", "Urdu ?????"),
    SubjectTab("exercise", "Solved Exercises"),
    SubjectTab("slos", "Official SLOs")
)

@Composable
fun UrduSubjectView(
    classId: String,
    subjectName: String,
    accent: Color,
    initialChapter: Int,
    onBack: () -> Unit,
    onOpenRoadmap: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    var chapters by remember { mutableStateOf<List<UrduChapter>?>(null) }
    var selectedIndex by remember { mutableIntStateOf(initialChapter.coerceAtLeast(0)) }
    var selectedTab by remember { mutableStateOf("lesson") }
    val tts = rememberTts()

    LaunchedEffect(Unit) { tts.setLocale(Locale("ur")) }

    LaunchedEffect(classId) {
        chapters = withContext(Dispatchers.IO) { WebRepository.urduChapters() }
    }

    val list = chapters
    if (list == null) {
        LoadingBox("Loading Urdu lessons…")
        return
    }
    if (list.isEmpty()) {
        ErrorBox("No Urdu textbook content is available yet.")
        return
    }

    val index = selectedIndex.coerceIn(0, list.lastIndex)
    val chapter = list[index]

    LaunchedEffect(index) { tts.stop() }
    LaunchedEffect(selectedTab) { if (selectedTab != "lesson") tts.stop() }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
    ) {
        SubjectTopBar(
            title = "$subjectName • Grade 9",
            subtitle = "KPK Textbook Board, Peshawar • 15 Lessons & Poetry",
            onBack = onBack,
            accent = accent
        )
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))
        ChapterScroller(
            count = list.size,
            selectedIndex = index,
            onSelect = { selectedIndex = it },
            accent = accent,
            title = { i ->
                val ch = list[i]
                if (ch.type == "prose") "??? ${ch.number}" else "??? ${ch.number - 11}"
            },
            subtitle = { i -> list[i].title }
        )
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))
        ChapterBody(
            tabs = UrduTabs,
            selectedTab = selectedTab,
            onTabSelected = { selectedTab = it },
            accent = accent,
            modifier = Modifier.weight(1f),
            header = {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 14.dp, vertical = 10.dp)
                ) {
                    ChapterHeaderBanner(
                        rightText = if (chapter.type == "prose") {
                            "PROSE ${chapter.number}"
                        } else {
                            "POEM ${chapter.number - 11}"
                        },
                        title = chapter.title,
                        meta = "${chapter.titleEn} • ${chapter.author}",
                        accent = accent
                    )
                }
            }
        ) {
            key(chapter.id) {
                UrduTabContent(chapter = chapter, tab = selectedTab, accent = accent, tts = tts)
            }
        }
    }
}

@Composable
private fun UrduTabContent(
    chapter: UrduChapter,
    tab: String,
    accent: Color,
    tts: TtsController
) {
    when (tab) {
        "ps-trans" -> UrduPashtoTab(chapter, accent)
        "en-trans" -> UrduEnglishTab(chapter, accent)
        "video" -> UrduVideoTab(chapter, accent)
        "ur-sum" -> UrduSummaryTab(chapter, accent)
        "exercise" -> UrduExerciseTab(chapter, accent)
        "slos" -> UrduSlosTab(chapter, accent)
        else -> UrduLessonTab(chapter, accent, tts)
    }
}

// ---------------------------------------------------------------- lesson tab

@Composable
private fun UrduLessonTab(chapter: UrduChapter, accent: Color, tts: TtsController) {
    TtsControlBar(
        controller = tts,
        text = chapter.urduText.ifBlank { chapter.sections.joinToString("\n") { it.urdu } },
        accent = accent,
        rtl = true
    )

    if (chapter.authorInfo.isNotBlank()) {
        ProseBlock(
            title = if (chapter.author.isNotBlank()) "???? ???? • ${chapter.author}" else "???? ????",
            body = chapter.authorInfo,
            accent = accent,
            rtl = true
        )
    }

    ProseBlock(title = "???? ???", body = chapter.urduText, accent = accent, rtl = true)

    if (chapter.urduSections.isNotEmpty()) {
        AccordionCard(
            title = "??? ?? ?????",
            badge = "${chapter.urduSections.size} ????????",
            accent = accent
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                chapter.urduSections.forEachIndexed { i, paragraph ->
                    RtlText(text = "${i + 1}. $paragraph", fontSize = 14.sp)
                }
            }
        }
    }

    if (chapter.sections.isEmpty()) {
        EmptyHint("No sections are available for this lesson yet.")
    } else {
        SectionHeading(text = "Sections (${chapter.sections.size})", accent = accent)
        chapter.sections.forEach { section ->
            UrduSectionCard(section = section, accent = accent)
        }
    }
}

@Composable
private fun UrduSectionCard(section: UrduSection, accent: Color) {
    AccordionCard(
        title = section.heading,
        badge = section.headingEn.takeIf { it.isNotBlank() },
        accent = accent
    ) {
        val body = section.urdu.ifBlank { section.paras.joinToString("\n\n") }
        if (body.isBlank()) {
            EmptyHint("No text is available for this section yet.")
        } else {
            RtlText(text = body, fontSize = 14.5.sp)
        }

        if (section.english.isNotBlank()) {
            Spacer(modifier = Modifier.height(10.dp))
            SectionHeading(text = "English Translation", accent = accent)
            ParsedBodyText(text = section.english, fontSize = 13.sp, color = Color(0xFF475569))
        }

        if (section.pashto.isNotBlank()) {
            Spacer(modifier = Modifier.height(10.dp))
            RtlText(text = "???? ?????", fontSize = 12.sp, color = accent, bold = true)
            Spacer(modifier = Modifier.height(4.dp))
            RtlText(text = section.pashto, fontSize = 13.5.sp, color = Color(0xFF475569))
        }
    }
}

// ---------------------------------------------------------------- translations

@Composable
private fun UrduPashtoTab(chapter: UrduChapter, accent: Color) {
    if (chapter.pashtoTranslation.isNotBlank()) {
        ProseBlock(
            title = "???? ?????",
            body = chapter.pashtoTranslation,
            accent = accent,
            rtl = true
        )
        return
    }

    val sections = chapter.sections.filter { it.pashto.isNotBlank() }
    if (sections.isEmpty()) {
        EmptyHint("Pashto translation is not available for this lesson yet.")
        return
    }

    RtlText(text = "???? ?????", fontSize = 12.sp, color = accent, bold = true)
    Spacer(modifier = Modifier.height(4.dp))
    sections.forEach { section ->
        AccordionCard(
            title = section.headingPs.ifBlank { section.heading },
            badge = section.heading.takeIf { it.isNotBlank() },
            accent = accent
        ) {
            RtlText(text = section.pashto, fontSize = 14.sp)
        }
    }
}

@Composable
private fun UrduEnglishTab(chapter: UrduChapter, accent: Color) {
    if (chapter.englishTranslation.isNotBlank()) {
        ProseBlock(
            title = "English Translation",
            body = chapter.englishTranslation,
            accent = accent
        )
        return
    }

    val sections = chapter.sections.filter { it.english.isNotBlank() }
    if (sections.isEmpty()) {
        EmptyHint("English translation is not available for this lesson yet.")
        return
    }

    SectionHeading(text = "English Translation", accent = accent)
    sections.forEach { section ->
        AccordionCard(
            title = section.headingEn.ifBlank { section.heading },
            badge = section.heading.takeIf { it.isNotBlank() },
            accent = accent
        ) {
            ParsedBodyText(text = section.english, fontSize = 14.sp, color = Color(0xFF334155))
        }
    }
}

// ---------------------------------------------------------------- video

@Composable
private fun UrduVideoTab(chapter: UrduChapter, accent: Color) {
    val context = LocalContext.current
    val video = chapter.video
    if (video == null) {
        EmptyHint("Video lecture is not available for this lesson yet.")
        return
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Text(
                text = "?? ${video.title}",
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A),
                lineHeight = 21.sp
            )
            Spacer(modifier = Modifier.height(10.dp))
            VideoMetaRow(label = "Educator", value = video.tutor.ifBlank { "—" })
            VideoMetaRow(label = "Duration", value = video.duration.ifBlank { "—" })
            VideoMetaRow(label = "Board", value = "KPK Board Peshawar Official Syllabus")

            if (video.concepts.isNotEmpty()) {
                Spacer(modifier = Modifier.height(10.dp))
                SectionHeading(text = "Key Concepts Covered in Lecture", accent = accent)
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    video.concepts.forEach { concept ->
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(99.dp))
                                .background(accent.copy(alpha = 0.10f))
                                .border(1.dp, accent.copy(alpha = 0.30f), RoundedCornerShape(99.dp))
                                .padding(horizontal = 10.dp, vertical = 6.dp)
                        ) {
                            Text(
                                text = concept,
                                fontSize = 11.5.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = accent
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))
            val videoId = video.youtubeId
            if (videoId.matches(Regex("[A-Za-z0-9_-]{11}"))) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(8.dp))
                        .background(accent)
                        .clickable {
                            runCatching {
                                context.startActivity(
                                    Intent(
                                        Intent.ACTION_VIEW,
                                        Uri.parse("https://www.youtube.com/watch?v=$videoId")
                                    )
                                )
                            }
                        }
                        .padding(horizontal = 16.dp, vertical = 10.dp)
                ) {
                    Text(
                        text = "Open on YouTube",
                        color = Color.White,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            } else {
                Text(
                    text = "Video ID not configured for offline use",
                    fontSize = 12.sp,
                    color = Color(0xFF94A3B8)
                )
            }
        }
    }
}

@Composable
private fun VideoMetaRow(label: String, value: String) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 3.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = label,
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF64748B),
            modifier = Modifier.width(84.dp)
        )
        Text(
            text = value,
            fontSize = 12.5.sp,
            color = Color(0xFF334155),
            lineHeight = 17.sp,
            modifier = Modifier.weight(1f)
        )
    }
}

// ---------------------------------------------------------------- summary

@Composable
private fun UrduSummaryTab(chapter: UrduChapter, accent: Color) {
    ProseBlock(title = "???? ?????", body = chapter.urduSummary, accent = accent, rtl = true)

    val hasSummary = chapter.englishSummary.isNotBlank() ||
        chapter.urduSummary.isNotBlank() ||
        chapter.pashtoSummary.isNotBlank()

    if (hasSummary) {
        LanguageSwitchCard(
            english = chapter.englishSummary,
            urdu = chapter.urduSummary,
            pashto = chapter.pashtoSummary,
            accent = accent
        )
    } else {
        EmptyHint("Summary for this lesson is not available yet.")
    }
}

// ---------------------------------------------------------------- exercise

@Composable
private fun UrduExerciseTab(chapter: UrduChapter, accent: Color) {
    val exercise = chapter.exercise

    RtlText(text = "??? (Textbook Exercise)", fontSize = 12.sp, color = accent, bold = true)
    Spacer(modifier = Modifier.height(4.dp))
    if (exercise.rawExercise.isEmpty()) {
        EmptyHint("Textbook exercise is not available for this lesson yet.")
    } else {
        AccordionCard(
            title = "??? (Textbook Exercise)",
            badge = "${exercise.rawExercise.size} lines",
            accent = accent,
            initiallyExpanded = true
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(7.dp)) {
                exercise.rawExercise.forEach { line ->
                    RtlText(text = line, fontSize = 14.sp)
                }
            }
        }
    }

    SectionHeading(text = "Short Questions (${exercise.shortQuestions.size})", accent = accent)
    QaList(
        items = exercise.shortQuestions.mapIndexed { i, q ->
            QaCardItem(
                badge = "SQ ${i + 1}",
                badgeColor = Color(0xFF059669),
                question = q.question,
                answer = q.answer,
                meta = q.sloRef
            )
        }
    )

    SectionHeading(text = "MCQs (${exercise.mcqs.size})", accent = accent)
    McqQuizList(
        items = exercise.mcqs.mapIndexed { i, m ->
            QuizItem("ex-$i", m.question, m.options, m.correct, m.explanation)
        },
        accent = accent
    )

    SectionHeading(text = "Fill in the Blanks (${exercise.blanks.size})", accent = accent)
    QaList(
        items = exercise.blanks.mapIndexed { i, b ->
            QaCardItem(
                badge = "BLANK ${i + 1}",
                badgeColor = Color(0xFFD97706),
                question = b.q,
                answer = b.a,
                answerLabel = "Correct Word:"
            )
        }
    )

    RtlText(text = "Grammar / ??? ? ???", fontSize = 12.sp, color = accent, bold = true)
    Spacer(modifier = Modifier.height(4.dp))
    if (exercise.grammar.isEmpty()) {
        EmptyHint("No grammar notes are available for this lesson yet.")
    } else {
        exercise.grammar.forEach { group ->
            AccordionCard(title = group.title, accent = accent) {
                if (group.entries.isEmpty()) {
                    EmptyHint("No entries are available for this topic yet.")
                } else {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        group.entries.forEach { entry ->
                            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                entry.forEach { (key, value) ->
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                                    ) {
                                        Text(
                                            text = key,
                                            fontSize = 11.5.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = Color(0xFF64748B),
                                            modifier = Modifier.width(96.dp)
                                        )
                                        Box(modifier = Modifier.weight(1f)) {
                                            RtlText(
                                                text = value,
                                                fontSize = 13.5.sp,
                                                color = Color(0xFF334155)
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

    SectionHeading(text = "Vocabulary (${exercise.vocabulary.size})", accent = accent)
    if (exercise.vocabulary.isEmpty()) {
        EmptyHint("No vocabulary entries are available for this lesson yet.")
    } else {
        DataTableBlock(
            title = "??? ? ?????",
            headers = listOf("Word", "Meaning", "Sentence"),
            rows = exercise.vocabulary.map { listOf(it.word, it.meaning, it.example) }
        )
    }
}

// ---------------------------------------------------------------- SLOs

@Composable
private fun UrduSlosTab(chapter: UrduChapter, accent: Color) {
    var selected by remember(chapter.id) { mutableStateOf<String?>("slo-mcqs") }

    if (chapter.slos.isEmpty()) {
        EmptyHint("Official SLOs are not listed for this lesson yet.")
    } else {
        SectionHeading(text = "Official Student Learning Outcomes (SLOs)", accent = accent)
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            chapter.slos.forEachIndexed { i, slo ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .background(Color.White)
                        .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(10.dp))
                        .padding(12.dp),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(26.dp)
                            .clip(RoundedCornerShape(99.dp))
                            .background(accent),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = "${i + 1}",
                            color = Color.White,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                    Box(modifier = Modifier.weight(1f)) {
                        RtlText(text = slo, fontSize = 14.sp)
                    }
                }
            }
        }
    }

    Spacer(modifier = Modifier.height(4.dp))
    PillSelector(
        options = listOf(
            "slo-mcqs" to "MCQs (${chapter.sloMcqs.size})",
            "slo-sq" to "Short Qs (${chapter.sloShort.size})",
            "slo-lq" to "Long Qs (${chapter.sloLong.size})"
        ),
        selectedId = selected,
        onSelect = { selected = if (selected == it) null else it },
        accent = accent
    )

    when (selected) {
        "slo-mcqs" -> McqQuizList(
            items = chapter.sloMcqs.mapIndexed { i, m ->
                QuizItem("slo-$i", m.question, m.options, m.correct, m.explanation)
            },
            accent = accent
        )
        "slo-sq" -> QaList(
            items = chapter.sloShort.mapIndexed { i, q ->
                QaCardItem(
                    badge = q.sloRef.ifBlank { "SQ ${i + 1}" },
                    badgeColor = accent,
                    question = q.question,
                    answer = q.answer
                )
            }
        )
        "slo-lq" -> QaList(
            items = chapter.sloLong.mapIndexed { i, q ->
                QaCardItem(
                    badge = "LQ ${i + 1}",
                    badgeColor = Color(0xFF7C3AED),
                    question = q.question,
                    answer = q.answer + q.keyPoints.joinToString("") { "\n• $it" }
                )
            }
        )
        else -> EmptyHint("Select a question type…")
    }
}
