package com.example.spacebookapp.ui.subjects

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
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
import com.example.spacebookapp.data.web.EngSection
import com.example.spacebookapp.data.web.EnglishChapter
import com.example.spacebookapp.data.web.GrammarGroup
import com.example.spacebookapp.data.web.WebRepository
import com.example.spacebookapp.data.web.WritingTask
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray

private val EngSubjectTabs = listOf(
    SubjectTab("lesson", "?? Textbook & Audio"),
    SubjectTab("urdu-trans", "???? Translation"),
    SubjectTab("pashto-trans", "???? Translation"),
    SubjectTab("video", "?? Video Lecture"),
    SubjectTab("en-sum", "English Summary"),
    SubjectTab("exercise", "Solved Exercises"),
    SubjectTab("slos", "Official SLOs")
)

private fun engUnitLabel(chapter: EnglishChapter): String =
    if (chapter.type.equals("poetry", ignoreCase = true)) "Poem ${chapter.number}"
    else "Unit ${chapter.number}"

private fun cleanGrammarValue(raw: String): String {
    val cleaned = raw.replace(Regex("<[^>]+>"), "").trim()
    if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
        val parsed = runCatching {
            val array = JSONArray(cleaned)
            (0 until array.length()).joinToString("  |  ") { array.optString(it) }
        }.getOrNull()
        if (parsed != null) return parsed
    }
    return cleaned
}

@Composable
fun EnglishSubjectView(
    classId: String,
    subjectName: String,
    accent: Color,
    initialChapter: Int,
    onBack: () -> Unit,
    onOpenRoadmap: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    var chapters by remember { mutableStateOf<List<EnglishChapter>?>(null) }
    var selectedIndex by remember { mutableIntStateOf(initialChapter.coerceAtLeast(0)) }
    var selectedTab by remember { mutableStateOf("lesson") }
    var sloTab by remember { mutableStateOf("slo-mcqs") }
    val tts = rememberTts()

    LaunchedEffect(classId) {
        chapters = withContext(Dispatchers.IO) { WebRepository.englishChapters() }
    }

    val list = chapters
    if (list == null) {
        LoadingBox("Loading English units…")
        return
    }
    if (list.isEmpty()) {
        ErrorBox("No English textbook units are available offline.")
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
            title = "$subjectName • Grade 9/10",
            subtitle = "KPK Textbook Board, Peshawar • 15 Complete Units",
            onBack = onBack,
            accent = accent
        )
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))

        ChapterScroller(
            count = list.size,
            selectedIndex = index,
            onSelect = { selectedIndex = it },
            accent = accent,
            title = { i -> engUnitLabel(list[i]) },
            subtitle = { i -> list[i].title }
        )

        ChapterBody(
            tabs = EngSubjectTabs,
            selectedTab = selectedTab,
            onTabSelected = { selectedTab = it },
            accent = accent,
            modifier = Modifier.weight(1f),
            header = {
                Column(modifier = Modifier.padding(horizontal = 14.dp, vertical = 10.dp)) {
                    ChapterHeaderBanner(
                        title = chapter.title,
                        meta = listOf(chapter.titleUrdu, chapter.author)
                            .filter { it.isNotBlank() }
                            .joinToString(" • "),
                        accent = accent,
                        rightText = engUnitLabel(chapter).uppercase()
                    )
                }
            },
            body = {
                key(chapter.number) {
                    EngTabBody(
                        chapter = chapter,
                        tabId = selectedTab,
                        sloTabId = sloTab,
                        onSloTab = { sloTab = it },
                        accent = accent,
                        tts = tts
                    )
                }
            }
        )
    }
}

@Composable
private fun EngTabBody(
    chapter: EnglishChapter,
    tabId: String,
    sloTabId: String,
    onSloTab: (String) -> Unit,
    accent: Color,
    tts: TtsController
) {
    when (tabId) {
        "urdu-trans" -> EngUrduTranslationTab(chapter, accent)
        "pashto-trans" -> EngPashtoTranslationTab(chapter, accent)
        "video" -> EngVideoTab(chapter, accent)
        "en-sum" -> EngSummaryTab(chapter, accent)
        "exercise" -> EngExerciseTab(chapter, accent)
        "slos" -> EngSloTab(chapter, sloTabId, onSloTab, accent)
        else -> EngLessonTab(chapter, accent, tts)
    }
}

@Composable
private fun EngLessonTab(chapter: EnglishChapter, accent: Color, tts: TtsController) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        TtsControlBar(
            controller = tts,
            text = chapter.sections.joinToString("\n") { it.text },
            accent = accent
        )
        if (chapter.authorInfo.isNotBlank()) {
            CalloutBlock(
                label = "Pre-Reading & Thematic Mind Map / Author Info",
                text = chapter.authorInfo,
                background = Color(0xFFF0F9FF),
                border = Color(0xFFBAE6FD),
                labelColor = Color(0xFF0369A1),
                icon = "??"
            )
        }
        if (chapter.sections.isEmpty()) {
            EmptyHint("No textbook sections are available for this unit.")
        }
        chapter.sections.forEachIndexed { i, section ->
            EngSectionCard(section = section, index = i, accent = accent, tts = tts)
        }
    }
}

@Composable
private fun EngSectionCard(section: EngSection, index: Int, accent: Color, tts: TtsController) {
    AccordionCard(
        title = section.heading,
        accent = accent,
        badge = "Section ${index + 1}"
    ) {
        if (section.text.isNotBlank()) {
            ParsedBodyText(text = section.text)
        }
        section.paras.forEach { para ->
            if (para.isNotBlank()) {
                Spacer(modifier = Modifier.height(6.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xFFF8FAFC))
                        .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(8.dp))
                        .padding(10.dp)
                ) {
                    ParsedBodyText(text = para, fontSize = 13.5.sp, color = Color(0xFF1E293B))
                }
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
        Row(
            modifier = Modifier
                .clip(RoundedCornerShape(8.dp))
                .background(accent.copy(alpha = 0.08f))
                .clickable {
                    tts.speak(section.text.ifBlank { section.paras.joinToString("\n") })
                }
                .padding(horizontal = 12.dp, vertical = 7.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(text = "??", fontSize = 12.sp)
            Spacer(modifier = Modifier.width(6.dp))
            Text(
                text = "Listen to this section",
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold,
                color = accent
            )
        }
    }
}

@Composable
private fun EngUrduTranslationTab(chapter: EnglishChapter, accent: Color) {
    val sections = chapter.sections.filter { it.urdu.isNotBlank() }
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        if (sections.isEmpty()) {
            val note = if (chapter.englishTranslation.isNotBlank()) {
                "Section-wise Urdu translation is not bundled offline. Chapter English translation:\n\n${chapter.englishTranslation}"
            } else {
                "Section-wise Urdu translation is not bundled offline."
            }
            CalloutBlock(
                label = "Urdu Translation",
                text = note,
                background = Color(0xFFF0FDF4),
                border = Color(0xFFBBF7D0),
                labelColor = Color(0xFF15803D),
                icon = "??"
            )
        } else {
            sections.forEach { section ->
                ProseBlock(
                    title = section.headingUrdu,
                    body = section.urdu,
                    accent = accent,
                    rtl = true
                )
            }
        }
    }
}

@Composable
private fun EngPashtoTranslationTab(chapter: EnglishChapter, accent: Color) {
    val sections = chapter.sections.filter { it.pashto.isNotBlank() }
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        if (sections.isEmpty()) {
            val note = if (chapter.pashtoTranslation.isNotBlank()) {
                "Section-wise Pashto translation is not bundled offline. Chapter Pashto translation:\n\n${chapter.pashtoTranslation}"
            } else {
                "Section-wise Pashto translation is not bundled offline."
            }
            CalloutBlock(
                label = "Pashto Translation",
                text = note,
                background = Color(0xFFFEFCE8),
                border = Color(0xFFFEF08A),
                labelColor = Color(0xFF854D0E),
                icon = "??"
            )
        } else {
            sections.forEach { section ->
                ProseBlock(
                    title = section.headingPashto,
                    body = section.pashto,
                    accent = accent,
                    rtl = true
                )
            }
        }
    }
}

@Composable
private fun EngVideoTab(chapter: EnglishChapter, accent: Color) {
    val context = LocalContext.current
    val video = chapter.video
    if (video == null) {
        EmptyHint("No video lecture is bundled for this unit yet.")
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
                text = "?? ${video.title.ifBlank { "${chapter.title} — Video Lecture" }}",
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF1E40AF),
                lineHeight = 20.sp
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Instructor: ${video.tutor.ifBlank { "Senior Subject Specialist" }}",
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color(0xFF1E293B)
            )
            Text(
                text = "Duration: ${video.duration.ifBlank { "Not listed" }}",
                fontSize = 12.sp,
                color = Color(0xFF64748B)
            )
            Text(
                text = "Quality: 1080p HD",
                fontSize = 12.sp,
                color = Color(0xFF64748B)
            )

            if (video.concepts.isNotEmpty()) {
                Spacer(modifier = Modifier.height(10.dp))
                SectionHeading("Key Concepts Covered", accent)
                EngConceptFlow(concepts = video.concepts, accent = accent)
            }

            Spacer(modifier = Modifier.height(12.dp))
            EngYouTubeButton(videoId = video.youtubeId, accent = accent, context = context)
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun EngConceptFlow(concepts: List<String>, accent: Color) {
    FlowRow(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(6.dp),
        verticalArrangement = Arrangement.spacedBy(6.dp)
    ) {
        concepts.forEach { concept ->
            Box(
                modifier = Modifier
                    .widthIn(max = 280.dp)
                    .clip(RoundedCornerShape(99.dp))
                    .background(accent.copy(alpha = 0.10f))
                    .border(1.dp, accent.copy(alpha = 0.30f), RoundedCornerShape(99.dp))
                    .padding(horizontal = 10.dp, vertical = 6.dp)
            ) {
                Text(
                    text = concept,
                    fontSize = 11.5.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = accent,
                    lineHeight = 15.sp
                )
            }
        }
    }
}

@Composable
private fun EngYouTubeButton(videoId: String, accent: Color, context: Context) {
    val valid = videoId.matches(Regex("[A-Za-z0-9_-]{11}"))
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(if (valid) accent else Color(0xFFF1F5F9))
            .border(1.dp, if (valid) accent else Color(0xFFCBD5E1), RoundedCornerShape(8.dp))
            .clickable(enabled = valid) {
                runCatching {
                    val intent = Intent(
                        Intent.ACTION_VIEW,
                        Uri.parse("https://www.youtube.com/watch?v=$videoId")
                    )
                    context.startActivity(intent)
                }
            }
            .padding(horizontal = 16.dp, vertical = 10.dp)
    ) {
        Text(
            text = if (valid) "? Open on YouTube" else "Video lecture ID not configured offline",
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            color = if (valid) Color.White else Color(0xFF94A3B8)
        )
    }
}

@Composable
private fun EngSummaryTab(chapter: EnglishChapter, accent: Color) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        if (chapter.englishSummary.isNotBlank()) {
            ProseBlock(title = "English Summary", body = chapter.englishSummary, accent = accent)
        } else {
            EmptyHint("No English summary is available for this unit.")
        }
        LanguageSwitchCard(
            english = chapter.englishSummary,
            urdu = chapter.urduSummary,
            pashto = chapter.pashtoSummary,
            accent = accent,
            initialLang = "ur"
        )
    }
}

@Composable
private fun EngExerciseTab(chapter: EnglishChapter, accent: Color) {
    val exercise = chapter.exercise
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        AccordionCard(
            title = "A. Choose the Correct Answer (Textbook MCQs)",
            accent = accent,
            badge = "${exercise.textbookMcqs.size} questions",
            initiallyExpanded = true
        ) {
            McqQuizList(
                items = exercise.textbookMcqs.mapIndexed { i, mcq ->
                    QuizItem(
                        id = "tb-$i",
                        question = mcq.question,
                        options = mcq.options,
                        correctIndex = mcq.correct,
                        explanation = mcq.explanation
                    )
                },
                accent = accent
            )
        }

        AccordionCard(
            title = "Reading Comprehension & Textual Questions (${exercise.comprehension.size})",
            accent = accent,
            initiallyExpanded = true
        ) {
            QaList(
                items = exercise.comprehension.mapIndexed { i, qa ->
                    QaCardItem(
                        badge = "Q${i + 1}",
                        badgeColor = accent,
                        question = qa.q,
                        answer = qa.a,
                        answerLabel = "Model Answer:"
                    )
                }
            )
        }

        AccordionCard(
            title = "B. Vocabulary, Dictionary & Thesaurus Activities",
            accent = accent,
            initiallyExpanded = true
        ) {
            if (exercise.dictionaryWords.isNotEmpty()) {
                DataTableBlock(
                    title = "Dictionary Meanings & Parts of Speech",
                    headers = listOf("Word", "POS", "Meaning", "Example"),
                    rows = exercise.dictionaryWords.map {
                        listOf(it.word, it.pos, it.meaning, it.example)
                    }
                )
            }
            if (exercise.thesaurusSynonyms.isNotEmpty()) {
                DataTableBlock(
                    title = "Thesaurus Synonyms & Antonyms",
                    headers = listOf("Word", "Synonyms", "Antonym"),
                    rows = exercise.thesaurusSynonyms.map {
                        listOf(it.word, it.synonyms, it.antonym)
                    }
                )
            }
            if (exercise.vocabulary.isNotEmpty()) {
                DataTableBlock(
                    title = "Vocabulary in Context",
                    headers = listOf("Word", "POS", "Meaning", "Sentence"),
                    rows = exercise.vocabulary.map {
                        listOf(it.word, it.pos, it.meaning, it.example)
                    }
                )
            }
            if (exercise.dictionaryWords.isEmpty() &&
                exercise.thesaurusSynonyms.isEmpty() &&
                exercise.vocabulary.isEmpty()
            ) {
                EmptyHint("No vocabulary activities are available for this unit.")
            }
        }

        AccordionCard(
            title = "C. Grammar: Nouns, Number, Forms & Phrases",
            accent = accent,
            initiallyExpanded = true
        ) {
            if (exercise.grammarGroups.isEmpty()) {
                EmptyHint("No grammar activities are available for this unit.")
            } else {
                exercise.grammarGroups.forEach { group ->
                    EngGrammarGroupCard(group = group, accent = accent)
                }
            }
        }

        AccordionCard(
            title = "D. Composition, Writing Tasks & Translation",
            accent = accent,
            initiallyExpanded = true
        ) {
            if (exercise.writingTasks.isEmpty()) {
                EmptyHint("No writing tasks are available for this unit.")
            } else {
                exercise.writingTasks.forEach { task ->
                    EngWritingTaskCard(task = task, accent = accent)
                }
            }
        }

        AccordionCard(
            title = "E. Listening & Speaking Classroom Activity",
            accent = accent,
            initiallyExpanded = true
        ) {
            val activity = exercise.speakingActivity
            if (activity == null) {
                EmptyHint("No listening & speaking activity is available for this unit.")
            } else {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(10.dp))
                        .border(1.dp, Color(0xFFCCFBF1), RoundedCornerShape(10.dp))
                        .background(Color.White)
                        .padding(12.dp)
                ) {
                    Text(
                        text = "?? ${activity.title}",
                        fontSize = 13.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F766E),
                        lineHeight = 18.sp
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Task Prompt: \"${activity.prompt}\"",
                        fontSize = 12.5.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color(0xFF475569),
                        lineHeight = 17.sp
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    CalloutBlock(
                        label = "Suggested Model Classroom Sharing",
                        text = activity.modelResponse,
                        background = Color(0xFFF0FDFA),
                        border = Color(0xFFCCFBF1),
                        labelColor = Color(0xFF0F766E),
                        icon = "???"
                    )
                }
            }
        }
    }
}

@Composable
private fun EngGrammarGroupCard(group: GrammarGroup, accent: Color) {
    AccordionCard(title = group.title, accent = accent) {
        if (group.entries.isEmpty()) {
            EmptyHint("No items are listed in this activity.")
        }
        group.entries.forEach { entry ->
            val pairs = entry.entries.map { it.key to it.value }
            val first = pairs.firstOrNull()
            if (first != null) {
                SectionHeading(
                    text = "${first.first}: ${cleanGrammarValue(first.second)}",
                    accent = accent
                )
            }
            pairs.drop(1).forEach { (key, value) ->
                Text(
                    text = "$key ? ${cleanGrammarValue(value)}",
                    fontSize = 12.5.sp,
                    lineHeight = 17.sp,
                    color = Color(0xFF334155),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 2.dp)
                )
            }
            Spacer(modifier = Modifier.height(6.dp))
        }
    }
}

@Composable
private fun EngWritingTaskCard(task: WritingTask, accent: Color) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(10.dp))
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(10.dp))
            .background(Color.White)
            .padding(12.dp)
    ) {
        Text(
            text = task.task.ifBlank { task.title }.ifBlank { "Writing Task" },
            fontSize = 13.5.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF9D174D),
            lineHeight = 18.sp
        )
        if (task.topicSentence.isNotBlank()) {
            Spacer(modifier = Modifier.height(8.dp))
            CalloutBlock(
                label = "Identified Topic Sentence",
                text = "\"${task.topicSentence}\"",
                background = Color(0xFFFDF2F8),
                border = Color(0xFFFBCFE8),
                labelColor = Color(0xFF9D174D),
                icon = "??"
            )
        }
        if (task.content.isNotBlank()) {
            Spacer(modifier = Modifier.height(8.dp))
            ParsedBodyText(text = task.content, fontSize = 13.5.sp)
        }
        if (task.english.isNotBlank() && task.urdu.isNotBlank()) {
            Spacer(modifier = Modifier.height(10.dp))
            Row(modifier = Modifier.fillMaxWidth()) {
                Column(
                    modifier = Modifier
                        .weight(1f)
                        .padding(end = 8.dp)
                ) {
                    Text(
                        text = "English Passage",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = accent
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    ParsedBodyText(text = task.english, fontSize = 13.sp)
                }
                Column(
                    modifier = Modifier
                        .weight(1f)
                        .padding(start = 8.dp)
                ) {
                    Text(
                        text = "???? ?????",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF15803D)
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    RtlText(text = task.urdu, fontSize = 14.sp)
                }
            }
        }
    }
}

@Composable
private fun EngSloTab(
    chapter: EnglishChapter,
    sloTabId: String,
    onSloTab: (String) -> Unit,
    accent: Color
) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(12.dp))
                .background(Color.White)
                .padding(14.dp)
        ) {
            Text(
                text = "?? Student Learning Outcomes (SLOs)",
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A)
            )
            Spacer(modifier = Modifier.height(3.dp))
            Text(
                text = "Official Khyber Pakhtunkhwa Textbook Board Competencies for Unit ${chapter.number}",
                fontSize = 11.5.sp,
                color = Color(0xFF64748B),
                lineHeight = 16.sp
            )
            Spacer(modifier = Modifier.height(8.dp))
            if (chapter.slos.isEmpty()) {
                EmptyHint("No official SLOs are listed for this unit.")
            } else {
                chapter.slos.forEachIndexed { i, slo ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                    ) {
                        Text(
                            text = "${i + 1}.",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = accent,
                            modifier = Modifier.width(26.dp)
                        )
                        Text(
                            text = slo,
                            fontSize = 13.sp,
                            lineHeight = 18.sp,
                            color = Color(0xFF1E293B),
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        }

        Text(
            text = "?? KPK Board Exam SLO Assessment Suite",
            fontSize = 14.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFF0F172A)
        )

        PillSelector(
            options = listOf(
                "slo-mcqs" to "MCQs (${chapter.sloMcqs.size})",
                "slo-sqs" to "Short Qs (3M) (${chapter.sloShort.size})",
                "slo-lqs" to "Long Qs (8M) (${chapter.sloLong.size})"
            ),
            selectedId = sloTabId,
            onSelect = onSloTab,
            accent = accent
        )

        when (sloTabId) {
            "slo-sqs" -> QaList(
                items = chapter.sloShort.map { q ->
                    QaCardItem(
                        badge = "3M",
                        badgeColor = accent,
                        question = q.question,
                        answer = q.answer,
                        meta = q.marks
                    )
                }
            )
            "slo-lqs" -> QaList(
                items = chapter.sloLong.map { q ->
                    QaCardItem(
                        badge = "8M",
                        badgeColor = Color(0xFF7C3AED),
                        question = q.question,
                        answer = buildString {
                            append(q.answer)
                            if (q.outline.isNotBlank()) {
                                append("\n\nOutline:\n")
                                append(q.outline)
                            }
                            q.keyPoints.forEach {
                                append("\n• ")
                                append(it)
                            }
                        },
                        meta = q.marks
                    )
                }
            )
            else -> McqQuizList(
                items = chapter.sloMcqs.mapIndexed { i, mcq ->
                    QuizItem(
                        id = "slo-$i",
                        question = mcq.question,
                        options = mcq.options,
                        correctIndex = mcq.correct,
                        explanation = mcq.explanation
                    )
                },
                accent = accent
            )
        }
    }
}
