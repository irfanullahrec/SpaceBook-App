package com.example.spacebookapp.ui.subjects

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
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.web.ScienceChapter
import com.example.spacebookapp.data.web.WebActivity
import com.example.spacebookapp.data.web.WebDiagram
import com.example.spacebookapp.data.web.WebFigure
import com.example.spacebookapp.data.web.WebFormula
import com.example.spacebookapp.data.web.WebNumerical
import com.example.spacebookapp.data.web.WebRepository
import com.example.spacebookapp.data.web.WebSubTopic
import com.example.spacebookapp.data.web.WebTopic
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

private enum class PracticeKind { SQ, MCQ, LQ }

@Composable
fun ScienceSubjectView(
    classId: String,
    subjectId: String,
    subjectName: String,
    accent: Color,
    initialChapter: Int,
    onBack: () -> Unit,
    onOpenRoadmap: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    var chapters by remember { mutableStateOf<List<ScienceChapter>?>(null) }
    var selectedIndex by remember { mutableIntStateOf(initialChapter.coerceAtLeast(0)) }
    var selectedTab by remember { mutableStateOf("topics") }

    LaunchedEffect(subjectId) {
        chapters = withContext(Dispatchers.IO) { WebRepository.scienceChapters(subjectId) }
    }

    val list = chapters
    if (list == null) {
        LoadingBox("Loading science units�")
        return
    }
    if (list.isEmpty()) {
        ErrorBox("No authored content has been published for this subject yet.")
        return
    }

    val chapterIndex = selectedIndex.coerceIn(0, list.lastIndex)
    val chapter = list[chapterIndex]
    val gradeLabel = when (classId) {
        "cls9" -> "Grade 9"
        "cls10" -> "Grade 10"
        else -> classId
    }
    val emoji = when {
        subjectId.endsWith("-bio") -> "??"
        subjectId.endsWith("-chem") -> "??"
        subjectId.endsWith("-phy") -> "?"
        else -> "??"
    }

    val tabs = buildList<SubjectTab> {
        add(SubjectTab("topics", "Topics & Notes"))
        add(SubjectTab("exercises", "Textbook Exercises"))
        if (chapter.numericals.isNotEmpty()) {
            add(SubjectTab("numericals", "Solved Numericals (${chapter.numericals.size})"))
        }
        add(SubjectTab("slos", "SLOs & Definitions"))
        add(SubjectTab("activities", "Activities & Tables"))
        add(SubjectTab("checklist", "Study Checklist"))
    }
    val activeTab = if (tabs.any { it.id == selectedTab }) selectedTab else "topics"

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
    ) {
        SubjectTopBar(
            title = "$emoji $subjectName",
            subtitle = "KPK Textbook Board � $gradeLabel",
            onBack = onBack,
            accent = accent,
            actions = {
                TopBarChip(label = "?? Roadmap", background = Color(0xFF059669), onClick = onOpenRoadmap)
            }
        )
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))

        ChapterScroller(
            count = list.size,
            selectedIndex = chapterIndex,
            onSelect = { selectedIndex = it },
            accent = accent,
            title = { i -> "Unit ${list[i].num}" },
            subtitle = { i -> list[i].pageRange }
        )

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 14.dp, vertical = 8.dp)
        ) {
            ChapterHeaderBanner(
                title = "Unit ${chapter.num}: ${chapter.name}",
                meta = "${chapter.pageRange} � ${chapter.topics.size} Major Topics � " +
                    "${chapter.exercise.mcqs.size} MCQs � ${chapter.exercise.sq.size} Short Questions",
                accent = accent,
                rightText = chapterStatusLabel(chapter.status)
            )
        }

        PillTabBar(tabs = tabs, selectedId = activeTab, onSelect = { selectedTab = it }, accent = accent)

        Column(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            key(chapter.num) {
                when (activeTab) {
                    "topics" -> ScienceTopicsTab(chapter, accent)
                    "exercises" -> ScienceExercisesTab(chapter, accent)
                    "numericals" -> ScienceNumericalsTab(chapter, accent)
                    "slos" -> ScienceSlosTab(chapter, accent)
                    "activities" -> ScienceActivitiesTab(chapter, accent)
                    "checklist" -> ScienceChecklistTab(chapter, subjectId, accent)
                }
            }
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

private fun chapterStatusLabel(status: String): String = when (status) {
    "done", "ready" -> "? Ready"
    "progress" -> "?? In Progress"
    else -> "? Planned"
}

private fun hierarchyTree(topic: WebTopic): String = buildString {
    append(topic.num).append(' ').append(topic.title)
    topic.subtopics.forEachIndexed { i, sub ->
        append('\n')
        append(if (i == topic.subtopics.lastIndex) "+-- " else "+-- ")
        append(sub.num).append(' ').append(sub.name)
    }
}

private fun matchSqAnswer(sq: String, chapter: ScienceChapter): String {
    val key = sq.trim()
    chapter.exercise.sq.firstOrNull { it.q.trim() == key }?.let { return it.a }
    return chapter.exercise.sq.firstOrNull {
        it.q.trim().length >= 15 && key.contains(it.q.trim())
    }?.a ?: ""
}

// ---------------------------------------------------------------- topics tab

@Composable
private fun ScienceTopicsTab(chapter: ScienceChapter, accent: Color) {
    if (chapter.topics.isEmpty()) {
        EmptyHint("No topics have been authored for this unit yet.")
        return
    }
    chapter.topics.forEach { topic ->
        AccordionCard(
            title = "${topic.num}  ${topic.title}",
            accent = accent,
            badge = "${topic.subtopics.size} Sections"
        ) {
            LanguageSwitchCard(
                english = topic.summaryEn,
                urdu = topic.summaryUr,
                pashto = topic.summaryPs,
                accent = accent
            )

            AccordionCard(
                title = "?? Textbook Hierarchy",
                accent = accent,
                badge = "${topic.subtopics.size} Items in exact textbook sequence"
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xFFF8FAFC))
                        .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(8.dp))
                        .padding(12.dp)
                ) {
                    Text(
                        text = hierarchyTree(topic),
                        fontSize = 12.sp,
                        fontFamily = FontFamily.Monospace,
                        color = Color(0xFF0F172A),
                        lineHeight = 18.sp
                    )
                }
            }

            if (topic.subtopics.isEmpty()) {
                EmptyHint("No subtopics listed for this topic yet.")
            } else {
                SectionHeading("?? Separated Subtopic Blocks (KPK Textbook Board Sequence)", accent)
                topic.subtopics.forEach { sub ->
                    SubtopicCard(sub = sub, topicNum = topic.num, chapter = chapter, accent = accent)
                }
            }

            TopicPracticeRow(topic = topic, chapter = chapter, accent = accent)
        }
    }
}

@Composable
private fun SubtopicCard(
    sub: WebSubTopic,
    topicNum: String,
    chapter: ScienceChapter,
    accent: Color
) {
    val tags = listOfNotNull(
        if (!sub.sq.isNullOrBlank()) "SQ" else null,
        if (sub.mcq != null) "MCQ" else null
    ).joinToString("  ")

    AccordionCard(
        title = "${sub.num}  ${sub.name}",
        accent = accent,
        badge = tags.ifBlank { null }
    ) {
        SubtopicBody(sub = sub, topicNum = topicNum, chapter = chapter, accent = accent)
    }
}

@Composable
private fun SubtopicBody(
    sub: WebSubTopic,
    topicNum: String,
    chapter: ScienceChapter,
    accent: Color
) {
    if (sub.desc.isNotBlank()) {
        CalloutBlock(
            label = "Textbook Study Definition / Content:",
            text = sub.desc,
            background = Color(0xFFF8FAFC),
            border = Color(0xFFE2E8F0),
            labelColor = Color(0xFF334155),
            icon = "??"
        )
    }
    sub.sciNote?.takeIf { it.isNotBlank() }?.let {
        CalloutBlock(
            label = "Scientific Information",
            text = it,
            background = Color(0xFFEFF6FF),
            border = Color(0xFFBFDBFE),
            labelColor = Color(0xFF1D4ED8),
            icon = "??"
        )
    }
    sub.pointToRemember?.takeIf { it.isNotBlank() }?.let {
        CalloutBlock(
            label = "Point to Remember",
            text = it,
            background = Color(0xFFFFFBEB),
            border = Color(0xFFFDE68A),
            labelColor = Color(0xFFB45309),
            icon = "??"
        )
    }
    sub.sts?.takeIf { it.isNotBlank() }?.let {
        CalloutBlock(
            label = "Science, Technology and Society",
            text = it,
            background = Color(0xFFF5F3FF),
            border = Color(0xFFDDD6FE),
            labelColor = Color(0xFF6D28D9),
            icon = "??"
        )
    }
    sub.activity?.takeIf { it.isNotBlank() }?.let {
        CalloutBlock(
            label = "Textbook Investigation / Activity",
            text = it,
            background = Color(0xFFF0FDF4),
            border = Color(0xFFBBF7D0),
            labelColor = Color(0xFF15803D),
            icon = "??"
        )
    }
    sub.table?.let { tbl ->
        if (tbl.headers.isNotEmpty() || tbl.rows.isNotEmpty()) {
            DataTableBlock(tbl.title, tbl.headers, tbl.rows)
        }
    }
    sub.figure?.let { FigureCard(it) }
    sub.sq?.takeIf { it.isNotBlank() }?.let { sq ->
        RevealQaCard(
            QaCardItem(
                badge = "SQ",
                badgeColor = Color(0xFF059669),
                question = sq,
                answer = matchSqAnswer(sq, chapter),
                answerLabel = "Exam-Ready Answer:"
            )
        )
    }
    sub.mcq?.let { m ->
        McqQuizList(
            items = listOf(
                QuizItem(
                    id = "${chapter.num}-$topicNum-${sub.num}",
                    question = m.q,
                    options = m.opts,
                    correctIndex = m.ans,
                    explanation = m.exp
                )
            ),
            accent = accent
        )
    }
}

@Composable
private fun TopicPracticeRow(
    topic: WebTopic,
    chapter: ScienceChapter,
    accent: Color
) {
    var openPractice by remember { mutableStateOf<PracticeKind?>(null) }

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        PracticeButton(
            text = "Section SQs (${topic.sqCount})",
            color = Color(0xFF059669),
            modifier = Modifier.weight(1f)
        ) { openPractice = PracticeKind.SQ }
        PracticeButton(
            text = "Section MCQs (${topic.mcqCount})",
            color = Color(0xFF0284C7),
            modifier = Modifier.weight(1f)
        ) { openPractice = PracticeKind.MCQ }
        PracticeButton(
            text = "Unit Detailed LQs (${chapter.exercise.lq.size})",
            color = Color(0xFF7C3AED),
            modifier = Modifier.weight(1f)
        ) { openPractice = PracticeKind.LQ }
    }

    val kind = openPractice ?: return
    AlertDialog(
        onDismissRequest = { openPractice = null },
        title = {
            Text(
                text = when (kind) {
                    PracticeKind.SQ -> "Section Short Questions"
                    PracticeKind.MCQ -> "Section MCQs"
                    PracticeKind.LQ -> "Unit Detailed LQs"
                },
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A)
            )
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                when (kind) {
                    PracticeKind.SQ -> QaList(items = topicPracticeSqs(topic, chapter))
                    PracticeKind.MCQ -> McqQuizList(items = topicMcqs(topic, chapter), accent = accent)
                    PracticeKind.LQ -> QaList(
                        items = chapter.exercise.lq.mapIndexed { i, qa ->
                            QaCardItem(
                                badge = "LQ ${i + 1}",
                                badgeColor = Color(0xFF7C3AED),
                                question = qa.q,
                                answer = qa.a,
                                answerLabel = "Structured Exam Answer & Outline:"
                            )
                        }
                    )
                }
            }
        },
        confirmButton = {
            TextButton(onClick = { openPractice = null }) {
                Text("Close", color = accent, fontWeight = FontWeight.Bold)
            }
        }
    )
}

private fun normalizeSq(text: String): String =
    text.lowercase().replace(Regex("\\s+"), " ").trim().trimEnd('.', '?', '!')

private fun topicPracticeSqs(topic: WebTopic, chapter: ScienceChapter): List<QaCardItem> {
    val seen = HashSet<String>()
    val fromTopics = topic.subtopics.mapIndexedNotNull { i, sub ->
        val sq = sub.sq?.takeIf { it.isNotBlank() } ?: return@mapIndexedNotNull null
        seen += normalizeSq(sq)
        QaCardItem(
            badge = "SQ ${i + 1}",
            badgeColor = Color(0xFF059669),
            question = sq,
            answer = matchSqAnswer(sq, chapter)
        )
    }
    val fromExercise = chapter.exercise.sq.mapIndexedNotNull { i, qa ->
        if (normalizeSq(qa.q) in seen) return@mapIndexedNotNull null
        QaCardItem(
            badge = "Unit SQ ${i + 1}",
            badgeColor = Color(0xFF0284C7),
            question = qa.q,
            answer = qa.a
        )
    }
    return fromTopics + fromExercise
}

private fun topicMcqs(topic: WebTopic, chapter: ScienceChapter): List<QuizItem> =
    topic.subtopics.mapIndexedNotNull { _, sub ->
        val mcq = sub.mcq ?: return@mapIndexedNotNull null
        QuizItem(
            id = "${chapter.num}-${topic.num}-${sub.num}",
            question = mcq.q,
            options = mcq.opts,
            correctIndex = mcq.ans,
            explanation = mcq.exp
        )
    }

@Composable
private fun PracticeButton(
    text: String,
    color: Color,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(8.dp))
            .background(color.copy(alpha = 0.10f))
            .border(1.dp, color.copy(alpha = 0.45f), RoundedCornerShape(8.dp))
            .clickable { onClick() }
            .padding(horizontal = 8.dp, vertical = 9.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = text,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = color,
            textAlign = TextAlign.Center,
            maxLines = 2,
            lineHeight = 14.sp
        )
    }
}

// ---------------------------------------------------------------- exercises tab

@Composable
private fun ScienceExercisesTab(chapter: ScienceChapter, accent: Color) {
    SectionHeading(
        "A. Encircle the Best Suitable Answers (${chapter.exercise.mcqs.size} Textbook MCQs)",
        accent
    )
    McqQuizList(
        items = chapter.exercise.mcqs.mapIndexed { i, m ->
            QuizItem(
                id = "${chapter.num}-ex-mcq-$i",
                question = m.q,
                options = m.opts,
                correctIndex = m.ans,
                explanation = m.exp
            )
        },
        accent = accent
    )

    SectionHeading(
        "B. Write Short Answers for the Following Questions (${chapter.exercise.sq.size} Textbook SQs)",
        accent
    )
    QaList(
        items = chapter.exercise.sq.mapIndexed { i, qa ->
            QaCardItem(
                badge = "SQ ${i + 1}",
                badgeColor = Color(0xFF0284C7),
                question = qa.q,
                answer = qa.a,
                answerLabel = "Exam-Ready Answer:"
            )
        }
    )

    SectionHeading(
        "C. Write Detailed / Long Answers (${chapter.exercise.lq.size} Textbook LQs)",
        accent
    )
    QaList(
        items = chapter.exercise.lq.mapIndexed { i, qa ->
            QaCardItem(
                badge = "LQ ${i + 1}",
                badgeColor = Color(0xFF7C3AED),
                question = qa.q,
                answer = qa.a,
                answerLabel = "Structured Exam Answer & Outline:"
            )
        }
    )
}

// ---------------------------------------------------------------- numericals tab

@Composable
private fun ScienceNumericalsTab(chapter: ScienceChapter, accent: Color) {
    if (chapter.numericals.isEmpty()) {
        EmptyHint("No numericals recorded for this unit yet.")
    } else {
        CalloutBlock(
            label = "${chapter.numericals.size} Numerical Problems",
            text = "Each problem below lists the given data, required quantity, formula, full working and the final answer.",
            background = Color(0xFFF3E8FF),
            border = Color(0xFFD8B4FE),
            labelColor = Color(0xFF7C3AED),
            icon = "??"
        )
        chapter.numericals.forEach { NumericalCard(it, accent) }
    }

    if (chapter.formulas.isNotEmpty()) {
        SectionHeading("?? Formula Sheet � Unit ${chapter.num}", accent)
        chapter.formulas.forEach { FormulaCard(it, accent) }
    }
}

@Composable
private fun NumericalCard(n: WebNumerical, accent: Color) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(verticalAlignment = Alignment.Top) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(5.dp))
                        .background(accent)
                        .padding(horizontal = 7.dp, vertical = 3.dp)
                ) {
                    Text(
                        text = "N${n.num}",
                        fontSize = 10.5.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                }
                Spacer(modifier = Modifier.width(9.dp))
                Text(
                    text = n.statement,
                    fontSize = 13.5.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A),
                    lineHeight = 19.sp,
                    modifier = Modifier.weight(1f)
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
            NumericalField("Given:", n.given, accent, mono = false)
            NumericalField("Required:", n.required, accent, mono = false)
            NumericalField("Formula:", n.formula, accent, mono = true)
            NumericalField("Solution:", n.solution, accent, mono = false)
            if (n.answer.isNotBlank()) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xFFDCFCE7))
                        .border(1.dp, Color(0xFFBBF7D0), RoundedCornerShape(8.dp))
                        .padding(horizontal = 12.dp, vertical = 9.dp)
                ) {
                    Text(
                        text = "Answer: ${n.answer}",
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF14532D)
                    )
                }
            }
        }
    }
}

@Composable
private fun NumericalField(label: String, value: String, accent: Color, mono: Boolean) {
    if (value.isBlank()) return
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 8.dp)
    ) {
        Text(
            text = label,
            fontSize = 11.sp,
            fontWeight = FontWeight.ExtraBold,
            color = accent,
            letterSpacing = 0.4.sp
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = value,
            fontSize = if (mono) 14.sp else 13.sp,
            fontFamily = if (mono) FontFamily.Monospace else FontFamily.Default,
            fontWeight = if (mono) FontWeight.Bold else FontWeight.Normal,
            color = if (mono) accent else Color(0xFF1E293B),
            lineHeight = 19.sp
        )
    }
}

@Composable
private fun FormulaCard(f: WebFormula, accent: Color) {
    if (f.name.isBlank() && f.formula.isBlank()) return
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(10.dp))
            .background(Color.White)
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(10.dp))
            .padding(13.dp)
    ) {
        if (f.name.isNotBlank()) {
            Text(
                text = f.name,
                fontSize = 13.5.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A),
                lineHeight = 18.sp
            )
        }
        if (f.formula.isNotBlank()) {
            Spacer(modifier = Modifier.height(5.dp))
            Text(
                text = f.formula,
                fontSize = 14.sp,
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                color = accent,
                lineHeight = 20.sp
            )
        }
        if (f.note.isNotBlank()) FormulaInfoRow("Note", f.note)
        if (f.unit.isNotBlank()) FormulaInfoRow("Unit", f.unit)
        if (f.symbols.isNotBlank()) FormulaInfoRow("Symbols", f.symbols)
        if (f.example.isNotBlank()) FormulaInfoRow("Example", f.example)
    }
}

@Composable
private fun FormulaInfoRow(label: String, value: String) {
    Spacer(modifier = Modifier.height(7.dp))
    Row {
        Text(text = "$label:", fontSize = 11.5.sp, fontWeight = FontWeight.Bold, color = Color(0xFF64748B))
        Spacer(modifier = Modifier.width(6.dp))
        Text(
            text = value,
            fontSize = 12.5.sp,
            color = Color(0xFF334155),
            lineHeight = 17.sp,
            modifier = Modifier.weight(1f)
        )
    }
}

// ---------------------------------------------------------------- slos tab

@Composable
private fun ScienceSlosTab(chapter: ScienceChapter, accent: Color) {
    SectionHeading("?? Official Student Learning Outcomes (SLOs)", accent)
    if (chapter.slos.isEmpty()) {
        EmptyHint("No official SLOs listed for this unit yet.")
    } else {
        chapter.slos.forEachIndexed { i, slo ->
            Row(
                modifier = Modifier.fillMaxWidth().padding(vertical = 3.dp),
                verticalAlignment = Alignment.Top
            ) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(5.dp))
                        .background(accent.copy(alpha = 0.12f))
                        .padding(horizontal = 7.dp, vertical = 3.dp)
                ) {
                    Text("SLO ${i + 1}", fontSize = 10.sp, fontWeight = FontWeight.ExtraBold, color = accent)
                }
                Spacer(modifier = Modifier.width(9.dp))
                Text(
                    text = slo,
                    fontSize = 13.sp,
                    color = Color(0xFF334155),
                    lineHeight = 18.sp,
                    modifier = Modifier.weight(1f)
                )
            }
        }
    }

    SectionHeading("?? Key Definitions from Unit ${chapter.num}", accent)
    if (chapter.definitions.isEmpty()) {
        EmptyHint("No key definitions listed for this unit yet.")
    } else {
        chapter.definitions.forEach { def ->
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(10.dp))
                    .background(Color.White)
                    .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(10.dp))
                    .padding(13.dp)
            ) {
                Text(def.term, fontSize = 13.sp, fontWeight = FontWeight.Bold, color = accent)
                Spacer(modifier = Modifier.height(5.dp))
                Text(
                    text = def.def,
                    fontSize = 13.sp,
                    color = Color(0xFF334155),
                    lineHeight = 19.sp
                )
            }
        }
    }

    SectionHeading("?? Important Concept Differences", accent)
    if (chapter.differences.isEmpty()) {
        EmptyHint("No concept comparison tables listed for this unit yet.")
    } else {
        chapter.differences.forEach { diff ->
            Text(
                text = diff.title,
                fontSize = 13.5.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A),
                lineHeight = 18.sp
            )
            DataTableBlock(
                title = "",
                headers = listOf("Feature", diff.colA, diff.colB),
                rows = diff.rows
            )
        }
    }

    SectionHeading("??? Essential Textbook Diagrams to Practice", accent)
    if (chapter.diagrams.isEmpty()) {
        EmptyHint("No diagrams listed for this unit yet.")
    } else {
        chapter.diagrams.forEach { DiagramCard(it) }
    }
}

@Composable
private fun DiagramCard(d: WebDiagram) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(10.dp))
            .background(Color.White)
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(10.dp))
            .padding(13.dp)
    ) {
        Text(
            text = "??? ${d.name}",
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF0F172A),
            lineHeight = 18.sp
        )
        Spacer(modifier = Modifier.height(6.dp))
        Text(
            text = "Topic: ${d.topic}",
            fontSize = 12.sp,
            fontWeight = FontWeight.SemiBold,
            color = Color(0xFF475569),
            lineHeight = 17.sp
        )
        Spacer(modifier = Modifier.height(3.dp))
        Text(
            text = "Study Guide: ${d.note}",
            fontSize = 12.sp,
            color = Color(0xFF64748B),
            lineHeight = 17.sp
        )
    }
}

// ---------------------------------------------------------------- activities tab

@Composable
private fun ScienceActivitiesTab(chapter: ScienceChapter, accent: Color) {
    SectionHeading(
        "?? Official Laboratory Activities & Investigations (${chapter.activities.size})",
        accent
    )
    if (chapter.activities.isEmpty()) {
        EmptyHint("No standalone laboratory activities listed for this unit. Check individual topics for integrated experiments.")
    } else {
        chapter.activities.forEach { ActivityCard(it, accent) }
    }

    SectionHeading("?? Official Textbook Reference Tables (${chapter.tables.size})", accent)
    if (chapter.tables.isEmpty()) {
        EmptyHint("No reference tables listed for this unit.")
    } else {
        chapter.tables.forEach { tbl -> DataTableBlock(tbl.title, tbl.headers, tbl.rows) }
    }

    SectionHeading("??? Essential Textbook Diagrams & Figures (${chapter.diagrams.size})", accent)
    if (chapter.diagrams.isEmpty()) {
        EmptyHint("No textbook diagrams listed for this unit yet.")
    } else {
        chapter.diagrams.forEach { DiagramCard(it) }
    }
}

@Composable
private fun ActivityCard(a: WebActivity, accent: Color) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(10.dp))
            .background(Color.White)
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(10.dp))
            .padding(13.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(5.dp))
                    .background(accent)
                    .padding(horizontal = 8.dp, vertical = 3.dp)
            ) {
                Text(a.num, fontSize = 11.sp, fontWeight = FontWeight.ExtraBold, color = Color.White)
            }
            Spacer(modifier = Modifier.width(9.dp))
            Text(
                text = a.name,
                fontSize = 13.5.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A),
                lineHeight = 18.sp,
                modifier = Modifier.weight(1f)
            )
        }
        Spacer(modifier = Modifier.height(10.dp))
        Text(
            text = "?? Experimental Procedure & Practical Investigation:",
            fontSize = 11.sp,
            fontWeight = FontWeight.ExtraBold,
            color = accent,
            letterSpacing = 0.3.sp
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = a.procedure,
            fontSize = 13.sp,
            color = Color(0xFF334155),
            lineHeight = 19.sp
        )
    }
}

// ---------------------------------------------------------------- checklist tab

@Composable
private fun ScienceChecklistTab(chapter: ScienceChapter, subjectId: String, accent: Color) {
    if (chapter.checklist.isEmpty()) {
        EmptyHint("No checklist items have been authored for this unit yet.")
        return
    }
    Text(
        text = "Check off every item as you finish revising Unit ${chapter.num}. Your progress is saved on this device.",
        fontSize = 12.5.sp,
        color = Color(0xFF64748B),
        lineHeight = 18.sp
    )
    ChecklistCard(
        storageKey = "$subjectId-${chapter.num}",
        title = "Unit ${chapter.num} Mastery Checklist",
        items = chapter.checklist,
        accent = accent
    )
}

// ---------------------------------------------------------------- subtopic figure

@Composable
private fun FigureCard(fig: WebFigure) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
            .clip(RoundedCornerShape(8.dp))
            .background(Color.White)
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(8.dp))
            .padding(12.dp)
    ) {
        Text(
            text = "??? ${fig.name}",
            fontSize = 12.5.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF0F172A),
            lineHeight = 17.sp
        )
        if (fig.caption.isNotBlank()) {
            Spacer(modifier = Modifier.height(5.dp))
            Text(
                text = fig.caption,
                fontSize = 12.5.sp,
                color = Color(0xFF334155),
                lineHeight = 17.sp
            )
        }
        if (fig.note.isNotBlank()) {
            Spacer(modifier = Modifier.height(5.dp))
            Text(
                text = "Study Guide: ${fig.note}",
                fontSize = 11.5.sp,
                color = Color(0xFF64748B),
                lineHeight = 16.sp
            )
        }
    }
}
