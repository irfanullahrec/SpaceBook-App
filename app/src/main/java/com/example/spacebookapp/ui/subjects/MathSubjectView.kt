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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.key
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
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.web.MathChapter
import com.example.spacebookapp.data.web.WebFormula
import com.example.spacebookapp.data.web.WebRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

@Composable
fun MathSubjectView(
    classId: String,
    subjectName: String,
    accent: Color,
    initialChapter: Int,
    onBack: () -> Unit,
    onOpenRoadmap: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    var chapters by remember { mutableStateOf<List<MathChapter>?>(null) }
    var selectedIndex by remember { mutableIntStateOf(initialChapter.coerceAtLeast(0)) }
    var selectedTab by remember { mutableStateOf("lesson") }

    LaunchedEffect(classId) {
        chapters = withContext(Dispatchers.IO) {
            try {
                WebRepository.mathChapters()
            } catch (e: Exception) {
                emptyList<MathChapter>()
            }
        }
    }

    val list = chapters
    if (list == null) {
        LoadingBox("Loading mathematics units…")
        return
    }
    if (list.isEmpty()) {
        ErrorBox("Mathematics units could not be loaded right now. Please try again.")
        return
    }

    val index = selectedIndex.coerceIn(0, list.size - 1)
    val chapter = list[index]

    Column(modifier = modifier.fillMaxSize().background(Color(0xFFF8FAFC))) {
        SubjectTopBar(
            title = "$subjectName • Grade 9",
            subtitle = "KPK Textbook Board, Peshawar • 17 Units & Complete Solved Exercises",
            onBack = onBack,
            accent = accent
        )
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))

        ChapterScroller(
            count = list.size,
            selectedIndex = index,
            onSelect = { selectedIndex = it },
            accent = accent,
            title = { list[it].number.toString() },
            subtitle = { list[it].title }
        )

        ChapterBody(
            tabs = listOf(
                SubjectTab("lesson", "📘 Lesson & Theory"),
                SubjectTab("examples", "💡 Worked Examples"),
                SubjectTab("exercises", "✏️ Solved Exercises"),
                SubjectTab("slos", "🎯 SLOs & Assessment"),
                SubjectTab("formulas", "📐 Formula Sheet")
            ),
            selectedTab = selectedTab,
            onTabSelected = { selectedTab = it },
            accent = accent,
            modifier = Modifier.weight(1f),
            header = {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 14.dp, vertical = 10.dp)
                ) {
                    ChapterHeaderBanner(
                        rightText = chapter.badge.ifBlank { "100% Complete" },
                        title = "Unit ${chapter.number}: ${chapter.title}",
                        meta = "${chapter.pageRange} • ${chapter.description}",
                        accent = accent
                    )
                    if (chapter.titleUrdu.isNotBlank()) {
                        Spacer(modifier = Modifier.height(6.dp))
                        RtlText(text = chapter.titleUrdu, fontSize = 15.sp, color = accent, bold = true)
                    }
                }
            },
            body = {
                key(chapter.number) {
                    when (selectedTab) {
                        "examples" -> ExamplesTab(chapter, accent)
                        "exercises" -> ExercisesTab(chapter, accent)
                        "slos" -> SlosTab(chapter, accent)
                        "formulas" -> FormulasTab(chapter, accent)
                        else -> LessonTab(chapter, accent)
                    }
                }
            }
        )
    }
}

// ---------------------------------------------------------------- lesson tab

@Composable
private fun LessonTab(chapter: MathChapter, accent: Color) {
    val expansion = remember { ExpansionState() }

    Column(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        ProseBlock(title = "Unit Overview", body = chapter.description, accent = accent)

        if (chapter.sections.isEmpty()) {
            EmptyHint("Detailed lesson reading for Unit ${chapter.number} will be available soon.")
        } else {
            ExpandAllBar(
                title = "Lesson Reading & Theory",
                titleColor = Color(0xFF1E3A8A),
                state = expansion,
                accent = accent
            )

            key(expansion.version) {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    chapter.sections.forEach { section ->
                        AccordionCard(
                            title = section.title,
                            badge = section.id,
                            accent = accent,
                            initiallyExpanded = expansion.expandAll
                        ) {
                            RenderTheory(section.theory)
                            RulesBlock(rules = section.rules, accent = accent)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun SmallToggleButton(label: String, accent: Color, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(Color.White)
            .border(1.dp, Color(0xFFCBD5E1), RoundedCornerShape(8.dp))
            .clickable(onClick = onClick)
            .padding(horizontal = 10.dp, vertical = 6.dp)
    ) {
        Text(text = label, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = accent)
    }
}

private class ExpansionState {
    var expandAll by mutableStateOf(true)
        private set
    var version by mutableIntStateOf(0)
        private set

    fun expand() {
        expandAll = true
        version++
    }

    fun collapse() {
        expandAll = false
        version++
    }
}

@Composable
private fun ExpandAllBar(
    title: String,
    titleColor: Color,
    state: ExpansionState,
    accent: Color,
    trailing: (@Composable () -> Unit)? = null
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(
            text = title,
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            color = titleColor,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            modifier = Modifier.weight(1f)
        )
        trailing?.invoke()
        Spacer(modifier = Modifier.width(6.dp))
        SmallToggleButton(label = "Expand All", accent = accent, onClick = state::expand)
        Spacer(modifier = Modifier.width(6.dp))
        SmallToggleButton(label = "Collapse All", accent = accent, onClick = state::collapse)
    }
}

@Composable
private fun RenderTheory(text: String) {
    if (text.isBlank()) return
    val chunks = remember(text) { splitTheory(text) }
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        chunks.forEach { chunk ->
            if (chunk.isTable) {
                DataTableBlock(title = "", headers = chunk.headers, rows = chunk.rows)
            } else {
                ParsedBodyText(text = chunk.prose, fontSize = 14.sp)
            }
        }
    }
}

private data class TheoryChunk(
    val isTable: Boolean,
    val prose: String = "",
    val headers: List<String> = emptyList(),
    val rows: List<List<String>> = emptyList()
)

private fun splitTheory(text: String): List<TheoryChunk> {
    val chunks = mutableListOf<TheoryChunk>()
    var prose = StringBuilder()
    var table: MutableList<String>? = null

    fun flushProse() {
        val body = prose.toString().trim()
        if (body.isNotEmpty()) chunks.add(TheoryChunk(isTable = false, prose = body))
        prose = StringBuilder()
    }

    fun flushTable() {
        val lines = table
        table = null
        if (lines == null) return
        if (lines.none { isTableSeparator(it) }) {
            prose.append(lines.joinToString("\n")).append('\n')
            return
        }
        val data = lines.filterNot { isTableSeparator(it) }
        if (data.isEmpty()) return
        chunks.add(
            TheoryChunk(
                isTable = true,
                headers = splitTableRow(data.first()),
                rows = data.drop(1).map { splitTableRow(it) }
            )
        )
    }

    for (raw in text.lines()) {
        val line = raw.trim()
        if (line.length > 1 && line.startsWith("|") && line.endsWith("|")) {
            flushProse()
            val current = table
            if (current == null) table = mutableListOf(line) else current.add(line)
        } else {
            flushTable()
            prose.append(raw).append('\n')
        }
    }
    flushTable()
    flushProse()
    return chunks
}

private fun isTableSeparator(line: String): Boolean =
    line.isNotEmpty() && line.all { it in "|:- \t" } && line.contains("---")

private fun splitTableRow(line: String): List<String> =
    line.trim()
        .removePrefix("|")
        .removeSuffix("|")
        .split("|")
        .map { it.trim().replace("**", "") }

@Composable
private fun RulesBlock(rules: List<String>, accent: Color) {
    if (rules.isEmpty()) return
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(8.dp))
            .background(Color(0xFFF0FDF4))
            .border(1.dp, Color(0xFFBBF7D0), RoundedCornerShape(8.dp))
            .padding(10.dp)
    ) {
        Text(
            text = "📌 Rules / Key Points",
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF15803D),
            letterSpacing = 0.3.sp
        )
        Spacer(modifier = Modifier.height(7.dp))
        rules.forEachIndexed { position, rule ->
            Row(
                modifier = Modifier.fillMaxWidth().padding(vertical = 3.dp),
                verticalAlignment = Alignment.Top
            ) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(5.dp))
                        .background(accent)
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                ) {
                    Text(
                        text = "${position + 1}",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                }
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = rule.replace("**", ""),
                    fontSize = 12.5.sp,
                    lineHeight = 17.sp,
                    color = Color(0xFF166534),
                    modifier = Modifier.weight(1f)
                )
            }
        }
    }
}

// ---------------------------------------------------------------- worked examples tab

@Composable
private fun ExamplesTab(chapter: MathChapter, accent: Color) {
    val expansion = remember { ExpansionState() }
    Column(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        if (chapter.workedExamples.isEmpty()) {
            EmptyHint("Step-by-step examples for Unit ${chapter.number} will be loaded here.")
            return@Column
        }

        ExpandAllBar(
            title = "💡 Prerequisite Worked Examples",
            titleColor = Color(0xFF0369A1),
            state = expansion,
            accent = accent
        ) {
            StatusPill(
                text = "${chapter.workedExamples.size} Solved",
                background = accent.copy(alpha = 0.12f),
                foreground = accent
            )
        }

        key(expansion.version) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                chapter.workedExamples.forEachIndexed { position, example ->
                    WorkedExampleCard(example, position, accent)
                }
            }
        }
    }
}

@Composable
private fun WorkedExampleCard(
    example: com.example.spacebookapp.data.web.WorkedExample,
    position: Int,
    accent: Color
) {
    val answerText = example.answer.ifBlank { "See the textbook solution" }
    AccordionCard(
        title = example.title,
        badge = example.section.ifBlank { "Worked Solution" },
        accent = accent,
        initiallyExpanded = position == 0
    ) {
                CalloutBlock(
                    label = "Problem",
                    text = example.problem,
                    background = Color(0xFFF8FAFC),
                    border = Color(0xFFE2E8F0),
                    labelColor = Color(0xFF1E293B),
                    icon = "❓"
                )

                if (example.given.isNotBlank()) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color(0xFFF1F5F9))
                            .padding(horizontal = 10.dp, vertical = 8.dp),
                        verticalAlignment = Alignment.Top
                    ) {
                        Text(
                            text = "Given:",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF334155)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = example.given,
                            fontSize = 12.5.sp,
                            lineHeight = 17.sp,
                            color = Color(0xFF334155),
                            modifier = Modifier.weight(1f)
                        )
                    }
                }

                if (example.method.isNotBlank()) {
                    CalloutBlock(
                        label = "Method",
                        text = example.method,
                        background = Color(0xFFEFF6FF),
                        border = Color(0xFFBFDBFE),
                        labelColor = Color(0xFF1D4ED8),
                        icon = "🧭"
                    )
                }

                if (example.steps.isNotEmpty()) {
                    Text(
                        text = "Detailed Step-by-Step Execution",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0369A1)
                    )
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        example.steps.forEachIndexed { stepIndex, step ->
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(Color(0xFFF8FAFC))
                                    .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(8.dp))
                                    .padding(10.dp),
                                verticalAlignment = Alignment.Top
                            ) {
                                Box(
                                    modifier = Modifier
                                        .clip(RoundedCornerShape(5.dp))
                                        .background(accent)
                                        .padding(horizontal = 6.dp, vertical = 2.dp)
                                ) {
                                    Text(
                                        text = "${stepIndex + 1}",
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.ExtraBold,
                                        color = Color.White
                                    )
                                }
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = step,
                                    fontSize = 12.5.sp,
                                    lineHeight = 17.sp,
                                    color = Color(0xFF334155),
                                    modifier = Modifier.weight(1f)
                                )
                            }
                        }
                    }
                }

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(99.dp))
                        .background(Color(0xFFDCFCE7))
                        .padding(horizontal = 12.dp, vertical = 9.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "✅ Answer: $answerText",
                        fontSize = 12.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF15803D),
                        lineHeight = 17.sp,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
}

// ---------------------------------------------------------------- solved exercises tab

@Composable
private fun ExercisesTab(chapter: MathChapter, accent: Color) {
    val questionCount = chapter.exercises.sumOf { it.problems.size }
    var selectedExercise by remember(chapter.number) {
        mutableStateOf(chapter.exercises.firstOrNull()?.exercise.orEmpty())
    }
    val active = chapter.exercises.firstOrNull { it.exercise == selectedExercise }
        ?: chapter.exercises.firstOrNull()

    if (active == null) {
        EmptyHint("Textbook exercises for Unit ${chapter.number} will be displayed here.")
        return
    }

    Column(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(
                text = "✏️ Solved Exercises",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
                modifier = Modifier.weight(1f)
            )
            StatusPill(
                text = "$questionCount Questions",
                background = accent.copy(alpha = 0.12f),
                foreground = accent
            )
        }

        if (chapter.exercises.size > 1) {
            PillSelector(
                options = chapter.exercises.map { it.exercise to "${it.problems.size} Qs" },
                selectedId = active.exercise,
                onSelect = { selectedExercise = it },
                accent = accent
            )
        }

        AccordionCard(
            title = active.title,
            badge = "Exercise ${active.exercise}",
            accent = accent,
            initiallyExpanded = true
        ) {
            if (active.description.isNotBlank()) {
                ParsedBodyText(text = active.description, fontSize = 13.sp)
                Spacer(modifier = Modifier.height(6.dp))
            }
            if (active.problems.isEmpty()) {
                EmptyHint("No solved questions are available for this exercise yet.")
            } else {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    active.problems.forEach { problem ->
                        RevealQaCard(
                            QaCardItem(
                                badge = problem.qNo,
                                badgeColor = accent,
                                question = problem.question,
                                answer = problem.solution + "\n\nAnswer: " + problem.answer,
                                answerLabel = "Step-by-step Solution:"
                            )
                        )
                    }
                }
            }
        }
    }
}

// ---------------------------------------------------------------- SLOs tab

@Composable
private fun SlosTab(chapter: MathChapter, accent: Color) {
    Column(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        SectionHeading("Official Student Learning Outcomes", accent)
        Text(
            text = "Outcomes published by the KPK Textbook Board for this unit, assessed through MCQs, short and long questions.",
            fontSize = 11.5.sp,
            lineHeight = 16.sp,
            color = Color(0xFF64748B)
        )

        if (chapter.sloList.isNotEmpty()) {
            chapter.sloList.forEachIndexed { index, slo ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.Top
                ) {
                    Text(
                        text = "${index + 1}.",
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

        if (chapter.sloMcqs.isNotEmpty()) {
            SectionHeading("SLO MCQs", accent)
            McqQuizList(
                items = chapter.sloMcqs.mapIndexed { position, mcq ->
                    QuizItem("slo-$position", mcq.q, mcq.options, mcq.correct, mcq.exp)
                },
                accent = accent
            )
        }

        if (chapter.sloShort.isNotEmpty()) {
            SectionHeading("Short Questions (3 Marks)", accent)
            QaList(
                items = chapter.sloShort.mapIndexed { _, question ->
                    QaCardItem(
                        badge = "${question.marks}M",
                        badgeColor = Color(0xFF0D9488),
                        question = question.q,
                        answer = question.sol,
                        answerLabel = "Model Solution:"
                    )
                }
            )
        }

        if (chapter.sloLong.isNotEmpty()) {
            SectionHeading("Long Questions (8 Marks)", accent)
            QaList(
                items = chapter.sloLong.mapIndexed { _, question ->
                    QaCardItem(
                        badge = "${question.marks}M",
                        badgeColor = Color(0xFF7C3AED),
                        question = question.q,
                        answer = (if (question.rubric.isNotBlank()) "Marking Rubric: ${question.rubric}\n\n" else "") +
                            question.sol,
                        answerLabel = "Structured Answer:"
                    )
                }
            )
        }

        if (chapter.sloList.isEmpty() &&
            chapter.sloMcqs.isEmpty() &&
            chapter.sloShort.isEmpty() &&
            chapter.sloLong.isEmpty()
        ) {
            EmptyHint("The board has not published SLO assessment items for this unit yet.")
        }
    }
}

// ---------------------------------------------------------------- formula sheet tab

@Composable
private fun FormulasTab(chapter: MathChapter, accent: Color) {
    Column(modifier = Modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        if (chapter.formulaSheet.isEmpty()) {
            EmptyHint("Formula sheet for Unit ${chapter.number} will be provided here.")
            return@Column
        }

        SectionHeading("KEY FORMULAS & UNITS", accent)

        if (chapter.formulaSheet.any { it.category.isNotBlank() }) {
            chapter.formulaSheet.groupBy { it.category }.forEach { (category, formulas) ->
                SectionHeading(if (category.isBlank()) "General Formulas" else category, accent)
                formulas.forEach { FormulaCard(it, accent) }
            }
        } else {
            chapter.formulaSheet.forEach { FormulaCard(it, accent) }
        }
    }
}

@Composable
private fun FormulaCard(formula: WebFormula, accent: Color) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Text(
                text = formula.name,
                fontSize = 12.sp,
                fontWeight = FontWeight.ExtraBold,
                color = accent,
                letterSpacing = 0.4.sp
            )

            if (formula.formula.isNotBlank()) {
                Spacer(modifier = Modifier.height(7.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xFFF8FAFC))
                        .border(1.dp, Color(0xFFCBD5E1), RoundedCornerShape(8.dp))
                        .padding(horizontal = 10.dp, vertical = 8.dp)
                ) {
                    Text(
                        text = formula.formula,
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        fontFamily = FontFamily.Monospace,
                        color = accent
                    )
                }
            }

            FormulaMetaRow(label = "Note", value = formula.note)
            FormulaMetaRow(label = "Unit", value = formula.unit)
            FormulaMetaRow(label = "Symbols", value = formula.symbols)
            FormulaMetaRow(label = "Example", value = formula.example)
            FormulaMetaRow(label = "Category", value = formula.category)

            if (formula.points.isNotEmpty()) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Key Points",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF64748B)
                )
                formula.points.forEach { point ->
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(top = 3.dp),
                        verticalAlignment = Alignment.Top
                    ) {
                        Text(text = "•", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = accent)
                        Spacer(modifier = Modifier.width(7.dp))
                        Text(
                            text = point,
                            fontSize = 12.5.sp,
                            lineHeight = 17.sp,
                            color = Color(0xFF334155),
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }

            if (formula.items.isNotEmpty()) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Rules & Steps",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF64748B)
                )
                formula.items.forEachIndexed { position, item ->
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(top = 3.dp),
                        verticalAlignment = Alignment.Top
                    ) {
                        Text(
                            text = "${position + 1}.",
                            fontSize = 12.5.sp,
                            fontWeight = FontWeight.Bold,
                            color = accent,
                            modifier = Modifier.width(24.dp)
                        )
                        Text(
                            text = item,
                            fontSize = 12.5.sp,
                            lineHeight = 17.sp,
                            color = Color(0xFF334155),
                            modifier = Modifier.weight(1f)
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun FormulaMetaRow(label: String, value: String) {
    if (value.isBlank()) return
    Spacer(modifier = Modifier.height(6.dp))
    Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.Top) {
        Text(
            text = label,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF64748B),
            modifier = Modifier.width(68.dp)
        )
        Text(
            text = value,
            fontSize = 12.5.sp,
            lineHeight = 17.sp,
            color = Color(0xFF334155),
            modifier = Modifier.weight(1f)
        )
    }
}
