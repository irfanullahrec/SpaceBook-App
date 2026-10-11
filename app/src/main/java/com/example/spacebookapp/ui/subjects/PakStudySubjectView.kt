package com.example.spacebookapp.ui.subjects

import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.material.icons.filled.MenuBook
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.web.PakStudyChapter
import com.example.spacebookapp.data.web.PakStudyQa
import com.example.spacebookapp.data.web.PakStudyQuestion
import com.example.spacebookapp.data.web.WebRepository
import java.util.Locale
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

private const val PAK_GREEN = 0xFF047857

@Composable
fun PakStudySubjectView(
    classId: String,
    subjectName: String,
    accent: Color,
    initialChapter: Int,
    onBack: () -> Unit,
    onOpenRoadmap: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    var chapters by remember { mutableStateOf<List<PakStudyChapter>?>(null) }
    var selectedIndex by remember { mutableIntStateOf(initialChapter.coerceAtLeast(0)) }
    var selectedTab by remember { mutableStateOf("sections") }
    var sloTab by remember { mutableStateOf("slo-mcqs") }
    var showUnits by remember { mutableStateOf(false) }
    val tts = rememberTts()

    LaunchedEffect(classId) {
        chapters = withContext(Dispatchers.IO) { WebRepository.pakStudyChapters() }
        tts.setLocale(Locale("ur"))
    }

    val list = chapters
    if (list == null) {
        LoadingBox("Loading Pakistan Studies units…")
        return
    }
    if (list.isEmpty()) {
        ErrorBox("No authored content has been published for this subject yet.")
        return
    }

    val index = selectedIndex.coerceIn(0, list.lastIndex)
    val chapter = list[index]
    val gradeLabel = if (classId == "cls9") "Grade 9" else classId

    val tabs = listOf(
        SubjectTab("sections", "Sections & Notes"),
        SubjectTab("summary", "Summary"),
        SubjectTab("exercise", "Textbook Exercise"),
        SubjectTab("slos", "SLOs & Assessment"),
        SubjectTab("timeline", "Timeline")
    )
    val activeTab = if (tabs.any { it.id == selectedTab }) selectedTab else "sections"

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
    ) {
        SubjectTopBar(
            title = "\uD83E\uDDDB $subjectName",
            subtitle = "KPK Textbook Board • $gradeLabel",
            onBack = onBack,
            accent = accent,
            actions = {
                TopBarIcon(
                    icon = Icons.Default.MenuBook,
                    contentDescription = "Switch unit",
                    accent = accent,
                    onClick = { showUnits = true }
                )
                Spacer(modifier = Modifier.width(6.dp))
                TopBarChip(label = "📈 Roadmap", background = Color(0xFF059669), onClick = onOpenRoadmap)
            }
        )
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 14.dp, vertical = 8.dp)
        ) {
            ChapterHeaderBanner(
                title = "Unit ${chapter.number}: ${chapter.titleEn}",
                meta = "${chapter.pageRange} • ${chapter.sections.size} Sections • " +
                    "${chapter.exerciseMcqs.size} MCQs • ${chapter.exerciseShort.size} Short Questions",
                accent = accent,
                rightText = statusLabel(chapter.status)
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
            key(chapter.id) {
                when (activeTab) {
                    "sections" -> PakSectionsTab(chapter, accent, tts)
                    "summary" -> PakSummaryTab(chapter, accent)
                    "exercise" -> PakExerciseTab(chapter, accent)
                    "slos" -> PakSloTab(chapter, accent, sloTab) { sloTab = it }
                    "timeline" -> PakTimelineTab(chapter, accent)
                }
            }
            Spacer(modifier = Modifier.height(24.dp))
        }
    }

    if (showUnits) {
        UnitPickerDialog(
            title = "$subjectName — Units",
            options = list.map {
                UnitOption(
                    num = it.number,
                    title = "Unit ${it.number}: ${it.titleEn}",
                    subtitle = it.pageRange,
                    status = it.status
                )
            },
            selectedIndex = index,
            accent = accent,
            onSelect = { selectedIndex = it; selectedTab = "sections"; sloTab = "slo-mcqs" },
            onDismiss = { showUnits = false }
        )
    }
}

// ---------------------------------------------------------------- sections

@Composable
private fun PakSectionsTab(chapter: PakStudyChapter, accent: Color, tts: TtsController) {
    if (chapter.intro.isNotEmpty()) {
        SectionHeading("📖 Qur'an & Hadith References", accent)
        chapter.intro.forEach { verse ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(14.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = verse.arabic,
                        fontSize = 19.sp,
                        color = Color(0xFF064E3B),
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                        lineHeight = 32.sp
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    RtlText(text = verse.translation, fontSize = 14.sp, color = Color(0xFF166534))
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "— ${verse.reference}",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = accent
                    )
                }
            }
        }
    }

    if (chapter.sections.isNotEmpty()) {
        SectionHeading("📑 Textbook Sections", accent)
        chapter.sections.forEach { section ->
            AccordionCard(
                title = "${section.id}  ${section.title}",
                accent = accent,
                initiallyExpanded = chapter.sections.size == 1
            ) {
                ReadAloudText(
                    text = section.content,
                    tts = tts,
                    accent = accent,
                    fontSize = 14.5.sp,
                    rtl = true
                )
            }
        }
    }

    if (chapter.keyPoints.isNotEmpty()) {
        SectionHeading("🔑 Key Points", accent)
        chapter.keyPoints.forEachIndexed { i, point ->
            KeyPointRow(number = i + 1, text = point, accent = accent)
        }
    }
}

@Composable
private fun KeyPointRow(number: Int, text: String, accent: Color) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(10.dp))
            .background(Color.White)
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(10.dp))
            .padding(12.dp),
        verticalAlignment = Alignment.Top
    ) {
        Box(
            modifier = Modifier
                .size(26.dp)
                .clip(CircleShape)
                .background(Color(0xFFDCFCE7)),
            contentAlignment = Alignment.Center
        ) {
            Text(text = number.toString(), fontSize = 12.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFF15803D))
        }
        Spacer(modifier = Modifier.width(10.dp))
        Box(modifier = Modifier.weight(1f)) {
            RtlText(text = text, fontSize = 14.sp, color = Color(0xFF1E293B))
        }
    }
}

// ---------------------------------------------------------------- summary

@Composable
private fun PakSummaryTab(chapter: PakStudyChapter, accent: Color) {
    if (chapter.description.isNotBlank()) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(12.dp))
                .background(Color(0xFFECFDF5))
                .border(1.dp, Color(0xFFA7F3D0), RoundedCornerShape(12.dp))
                .padding(14.dp)
        ) {
            Text(
                text = "📝 ${chapter.title}",
                fontSize = 14.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFF065F46)
            )
            Spacer(modifier = Modifier.height(8.dp))
            RtlText(text = chapter.description, fontSize = 14.5.sp, color = Color(0xFF166534))
        }
    }

    if (chapter.keyPoints.isNotEmpty()) {
        SectionHeading("⭐ High-Yield Summary Points", accent)
        chapter.keyPoints.forEachIndexed { i, point ->
            KeyPointRow(number = i + 1, text = point, accent = accent)
        }
    }

    if (chapter.sections.isNotEmpty()) {
        SectionHeading("📑 Section Headings", accent)
        chapter.sections.forEach { section ->
            StatCard(
                emoji = section.id,
                title = section.title,
                subtitle = "${section.content.length} characters of notes",
                accent = accent,
                onClick = null
            )
        }
    }
}

// ---------------------------------------------------------------- textbook exercise

@Composable
private fun PakExerciseTab(chapter: PakStudyChapter, accent: Color) {
    if (chapter.exerciseMcqs.isNotEmpty()) {
        SectionHeading("📝 Multiple Choice Questions", accent)
        McqQuizList(items = chapter.exerciseMcqs.toQuizItems(), accent = accent, showSource = true)
    }

    if (chapter.exerciseShort.isNotEmpty()) {
        SectionHeading("❓ Short Questions", accent)
        QaList(items = chapter.exerciseShort.toQaItems(badge = "SQ", color = Color(PAK_GREEN)))
    }

    if (chapter.exerciseLong.isNotEmpty()) {
        SectionHeading("📚 Long Questions", accent)
        QaList(items = chapter.exerciseLong.toQaItems(badge = "LQ", color = accent))
    }

    if (chapter.activities.isNotEmpty()) {
        SectionHeading("🎯 Activities", accent)
        chapter.activities.forEachIndexed { i, activity ->
            AccordionCard(title = "Activity ${i + 1}", accent = accent) {
                RtlText(text = activity, fontSize = 14.sp, color = Color(0xFF1E293B))
            }
        }
    }

    if (chapter.exerciseMcqs.isEmpty() &&
        chapter.exerciseShort.isEmpty() &&
        chapter.exerciseLong.isEmpty() &&
        chapter.activities.isEmpty()
    ) {
        EmptyHint("No textbook exercise has been authored for this unit yet.")
    }
}

// ---------------------------------------------------------------- SLOs

@Composable
private fun PakSloTab(
    chapter: PakStudyChapter,
    accent: Color,
    selected: String,
    onSelect: (String) -> Unit
) {
    PillSelector(
        options = listOf(
            "slo-mcqs" to "SLO MCQs (${chapter.bankMcqs.size})",
            "slo-sq" to "Short Questions (${chapter.bankShort.size})",
            "slo-lq" to "Long Questions (${chapter.bankLong.size})"
        ),
        selectedId = selected,
        onSelect = onSelect,
        accent = accent
    )

    when (selected) {
        "slo-sq" -> QaList(items = chapter.bankShort.toQaItems(badge = "SQ", color = Color(PAK_GREEN)))
        "slo-lq" -> QaList(items = chapter.bankLong.toQaItems(badge = "LQ", color = accent))
        else -> McqQuizList(items = chapter.bankMcqs.toQuizItems(), accent = accent, showSource = false)
    }

    SectionHeading("📚 Textbook Assessment Bank", accent)
    val assessMcqs = chapter.sloMcqs.size
    val assessShort = chapter.sloShort.size
    val assessLong = chapter.sloLong.size
    StatCard(
        emoji = "🎓",
        title = "Official SLO Assessments",
        subtitle = "Board-pattern assessment for this unit",
        accent = accent,
        badge = "$assessMcqs MCQs",
        stats = listOf(
            assessShort to "Short Qs",
            assessLong to "Long Qs"
        ),
        onClick = null
    )
}

// ---------------------------------------------------------------- timeline

@Composable
private fun PakTimelineTab(chapter: PakStudyChapter, accent: Color) {
    if (chapter.timeline.isEmpty()) {
        EmptyHint("No timeline events have been authored for this unit yet.")
        return
    }
    SectionHeading("🕰️ Timeline of Events", accent)
    chapter.timeline.forEachIndexed { i, item ->
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.Top
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(accent),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = (i + 1).toString(),
                        fontSize = 12.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                }
                if (i < chapter.timeline.lastIndex) {
                    Box(
                        modifier = Modifier
                            .width(2.dp)
                            .height(18.dp)
                            .background(Color(0xFFCBD5E1))
                    )
                }
            }
            Spacer(modifier = Modifier.width(10.dp))
            Card(
                modifier = Modifier
                    .weight(1f)
                    .padding(bottom = 8.dp),
                shape = RoundedCornerShape(10.dp)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(99.dp))
                            .background(Color(0xFFECFDF5))
                            .border(1.dp, Color(0xFFA7F3D0), RoundedCornerShape(99.dp))
                            .padding(horizontal = 9.dp, vertical = 3.dp)
                    ) {
                        Text(
                            text = item.year,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = accent
                        )
                    }
                    Spacer(modifier = Modifier.height(7.dp))
                    RtlText(text = item.event, fontSize = 14.sp, color = Color(0xFF1E293B))
                }
            }
        }
    }
}

// ---------------------------------------------------------------- mappings

private fun List<PakStudyQuestion>.toQuizItems(): List<QuizItem> = mapIndexed { i, m ->
    QuizItem(
        id = m.id.ifBlank { "MCQ ${i + 1}" },
        question = m.question,
        options = m.options,
        correctIndex = m.correct.coerceIn(0, (m.options.size - 1).coerceAtLeast(0)),
        explanation = m.explanation
    )
}

private fun List<PakStudyQa>.toQaItems(badge: String, color: Color): List<QaCardItem> =
    mapIndexed { i, q ->
        QaCardItem(
            badge = q.qNo.ifBlank { "$badge ${i + 1}" },
            badgeColor = color,
            question = q.question,
            answer = q.answer
        )
    }
