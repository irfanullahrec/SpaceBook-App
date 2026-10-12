package com.example.spacebookapp.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.web.ChapterRef
import com.example.spacebookapp.data.web.SearchHit
import com.example.spacebookapp.data.web.SubjectKind
import com.example.spacebookapp.data.web.WebClassRef
import com.example.spacebookapp.data.web.WebRepository
import com.example.spacebookapp.data.web.WebSubjectRef
import com.example.spacebookapp.data.web.subjectAccent
import com.example.spacebookapp.data.web.subjectKindOf
import com.example.spacebookapp.ui.components.FacebookBlue
import com.example.spacebookapp.ui.subjects.EnglishSubjectView
import com.example.spacebookapp.ui.subjects.GenericSubjectView
import com.example.spacebookapp.ui.subjects.LoadingBox
import com.example.spacebookapp.ui.subjects.MathSubjectView
import com.example.spacebookapp.ui.subjects.PakStudySubjectView
import com.example.spacebookapp.ui.subjects.ScienceSubjectView
import com.example.spacebookapp.ui.subjects.SearchField
import com.example.spacebookapp.ui.subjects.StatCard
import com.example.spacebookapp.ui.subjects.SubjectTopBar
import com.example.spacebookapp.ui.subjects.UrduSubjectView
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

data class SubjectRoute(
    val classId: String,
    val subjectId: String,
    val subjectName: String,
    val emoji: String,
    val initialChapter: Int = 0
)

/** Level 1 → 2 → 3 of the statistical-card hierarchy. Level 4 is the subject view itself. */
private enum class HubLevel { CLASSES, SUBJECTS, CHAPTERS }

@Composable
fun SubjectsUnitsScreen(
    onBackToHome: () -> Unit,
    onOpenRoadmap: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    var level by remember { mutableStateOf(HubLevel.CLASSES) }
    var selectedClass by remember { mutableStateOf<WebClassRef?>(null) }
    var selectedSubject by remember { mutableStateOf<WebSubjectRef?>(null) }
    var route by remember { mutableStateOf<SubjectRoute?>(null) }
    var query by remember { mutableStateOf("") }

    var classes by remember { mutableStateOf(emptyList<WebClassRef>()) }
    var subjects by remember { mutableStateOf(emptyList<WebSubjectRef>()) }
    var chapters by remember { mutableStateOf(emptyList<ChapterRef>()) }
    var hits by remember { mutableStateOf(emptyList<SearchHit>()) }
    var subjectCounts by remember { mutableStateOf(mapOf<String, Int>()) }
    var loaded by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        val (cls, counts) = withContext(Dispatchers.IO) {
            val c = WebRepository.classes()
            val m = c.associate { it.id to WebRepository.subjectsFor(it.id).size }
            Pair(c, m)
        }
        classes = cls
        subjectCounts = counts
        selectedClass = cls.firstOrNull { it.id == "cls9" } ?: cls.firstOrNull()
        loaded = true
    }

    LaunchedEffect(selectedClass) {
        val id = selectedClass?.id ?: return@LaunchedEffect
        subjects = withContext(Dispatchers.IO) { WebRepository.subjectsFor(id) }
    }

    LaunchedEffect(selectedSubject, selectedClass) {
        val cls = selectedClass ?: return@LaunchedEffect
        val subj = selectedSubject ?: return@LaunchedEffect
        chapters = withContext(Dispatchers.IO) {
            WebRepository.chapterRefsFor(cls.id, subj.id)
        }
    }

    LaunchedEffect(query) {
        hits = withContext(Dispatchers.IO) { WebRepository.search(query) }
    }

    val activeRoute = route
    if (activeRoute != null) {
        SubjectRouteHost(route = activeRoute, onBack = { route = null }, onOpenRoadmap = onOpenRoadmap)
        return
    }

    if (!loaded) {
        LoadingBox("Preparing KPK curriculum…")
        return
    }

    val searching = query.trim().length >= 2

    fun goUp() {
        when {
            searching -> query = ""
            level == HubLevel.CHAPTERS -> {
                level = HubLevel.SUBJECTS
                selectedSubject = null
            }
            level == HubLevel.SUBJECTS -> {
                level = HubLevel.CLASSES
            }
            else -> onBackToHome()
        }
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
    ) {
        SubjectTopBar(
            title = when {
                searching -> "Search"
                level == HubLevel.CLASSES -> "Subjects & Units"
                level == HubLevel.SUBJECTS -> selectedClass?.name ?: "Subjects"
                else -> selectedSubject?.name ?: "Units"
            },
            subtitle = when {
                searching -> "Results across classes, subjects and units"
                level == HubLevel.CLASSES -> "Choose a class • Khyber Pakhtunkhwa Textbook Board"
                level == HubLevel.SUBJECTS -> "Click a subject to explore its units"
                else -> "Pick a unit to open its study screen"
            },
            onBack = ::goUp
        )
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))

        if (searching) {
            SearchResultsList(
                hits = hits,
                onOpen = { hit ->
                    query = ""
                    level = HubLevel.CHAPTERS
                    route = SubjectRoute(hit.classId, hit.subjectId, hit.subjectName, "", hit.chapterIndex)
                }
            )
        } else {
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(bottom = 28.dp)
            ) {
                item {
                    Column(modifier = Modifier.padding(14.dp)) {
                        SearchField(
                            value = query,
                            onValueChange = { query = it },
                            placeholder = "Search Class 9-12 subjects, units, chapters…"
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        Breadcrumbs(
                            level = level,
                            className = selectedClass?.name,
                            subjectName = selectedSubject?.name,
                            onClasses = {
                                level = HubLevel.CLASSES
                                selectedSubject = null
                            },
                            onClass = {
                                level = HubLevel.SUBJECTS
                                selectedSubject = null
                            }
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        SectionLabel(
                            when (level) {
                                HubLevel.CLASSES -> "SELECT A CLASS"
                                HubLevel.SUBJECTS -> "SUBJECTS IN ${selectedClass?.name.orEmpty()}".uppercase()
                                HubLevel.CHAPTERS -> "UNITS IN ${selectedSubject?.name.orEmpty()}".uppercase()
                            }
                        )
                    }
                }

                when (level) {
                    HubLevel.CLASSES -> cardGrid(classes.size) { i ->
                        val cls = classes[i]
                        val realCount = subjectCounts[cls.id] ?: cls.subjects
                        StatCard(
                            emoji = cls.emoji,
                            title = cls.name,
                            subtitle = "KPK Textbook Board",
                            accent = FacebookBlue,
                            badge = "KPK Board",
                            stats = listOf(realCount to "Subjects"),
                            status = "ready",
                            onClick = {
                                selectedClass = cls
                                level = HubLevel.SUBJECTS
                            },
                            modifier = Modifier.padding(horizontal = 14.dp, vertical = 5.dp)
                        )
                    }

                    HubLevel.SUBJECTS -> {
                        val list = subjects
                        val cls = selectedClass
                        cardGrid(list.size) { i ->
                            val subj = list[i]
                            StatCard(
                                emoji = subj.emoji,
                                title = subj.name,
                                subtitle = "Verified KPK Textbook Volume",
                                accent = Color(subjectAccent(subj.id)),
                                badge = "Verified",
                                stats = listOf(subj.chapters to "Units"),
                                status = "ready",
                                onClick = {
                                    if (cls != null) {
                                        route = SubjectRoute(
                                            classId = cls.id,
                                            subjectId = subj.id,
                                            subjectName = subj.name,
                                            emoji = subj.emoji,
                                            initialChapter = 0
                                        )
                                    }
                                },
                                modifier = Modifier.padding(horizontal = 14.dp, vertical = 5.dp)
                            )
                        }
                    }

                    HubLevel.CHAPTERS -> {
                        val list = chapters
                        if (list.isEmpty()) {
                            item {
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(30.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(
                                        text = "No units are published for this subject yet.",
                                        fontSize = 13.sp,
                                        color = Color(0xFF94A3B8)
                                    )
                                }
                            }
                        } else {
                            cardGrid(list.size) { i ->
                                val ref = list[i]
                                val cls = selectedClass
                                val subj = selectedSubject
                                StatCard(
                                    emoji = ref.num.toString(),
                                    title = ref.name,
                                    subtitle = ref.subtitle,
                                    accent = if (subj != null) Color(subjectAccent(subj.id)) else FacebookBlue,
                                    badge = ref.topics,
                                    stats = listOf(ref.num to "Unit"),
                                    status = ref.status,
                                    onClick = {
                                        if (cls != null && subj != null) {
                                            route = SubjectRoute(
                                                classId = cls.id,
                                                subjectId = subj.id,
                                                subjectName = subj.name,
                                                emoji = subj.emoji,
                                                initialChapter = i
                                            )
                                        }
                                    },
                                    modifier = Modifier.padding(horizontal = 14.dp, vertical = 5.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

/** 2-up grid of statistical cards rendered inside a LazyColumn. */
private fun androidx.compose.foundation.lazy.LazyListScope.cardGrid(
    count: Int,
    card: @Composable (Int) -> Unit
) {
    val rows = (count + 1) / 2
    items(rows) { row ->
        val first = row * 2
        Row(modifier = Modifier.fillMaxWidth()) {
            Box(modifier = Modifier.weight(1f)) { card(first) }
            if (first + 1 < count) {
                Box(modifier = Modifier.weight(1f)) { card(first + 1) }
            } else {
                Spacer(modifier = Modifier.weight(1f))
            }
        }
    }
}

@Composable
private fun SectionLabel(text: String) {
    Text(
        text = text,
        fontSize = 11.sp,
        fontWeight = FontWeight.ExtraBold,
        color = Color(0xFF64748B),
        letterSpacing = 0.6.sp
    )
}

@Composable
private fun Breadcrumbs(
    level: HubLevel,
    className: String?,
    subjectName: String?,
    onClasses: () -> Unit,
    onClass: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .horizontalScroll(rememberScrollState()),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Crumb(text = "Home › Subjects", active = level == HubLevel.CLASSES, onClick = onClasses)
        if (level != HubLevel.CLASSES && className != null) {
            Crumb(text = "› $className", active = level == HubLevel.SUBJECTS, onClick = onClass)
        }
        if (level == HubLevel.CHAPTERS && subjectName != null) {
            Crumb(text = "› $subjectName", active = true, onClick = null)
        }
    }
}

@Composable
private fun Crumb(text: String, active: Boolean, onClick: (() -> Unit)?) {
    Box(
        modifier = Modifier
            .padding(end = 6.dp)
            .clip(RoundedCornerShape(99.dp))
            .background(if (active) FacebookBlue.copy(alpha = 0.12f) else Color.White)
            .let { if (onClick != null) it.clickable { onClick() } else it }
            .padding(horizontal = 11.dp, vertical = 6.dp)
    ) {
        Text(
            text = text,
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = if (active) FacebookBlue else Color(0xFF475569),
            maxLines = 1,
            overflow = TextOverflow.Ellipsis
        )
    }
}

@Composable
private fun SearchResultsList(
    hits: List<SearchHit>,
    onOpen: (SearchHit) -> Unit
) {
    if (hits.isEmpty()) {
        Box(
            modifier = Modifier.fillMaxSize().padding(24.dp),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = "No matching class, subject or unit found.",
                fontSize = 13.sp,
                color = Color(0xFF94A3B8)
            )
        }
        return
    }
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(14.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(hits) { hit ->
            StatCard(
                emoji = "🔎",
                title = hit.chapterTitle,
                subtitle = "${hit.className} • ${hit.subjectName} • ${hit.snippet}",
                accent = Color(subjectAccent(hit.subjectId)),
                onClick = { onOpen(hit) }
            )
        }
    }
}

@Composable
private fun SubjectRouteHost(
    route: SubjectRoute,
    onBack: () -> Unit,
    @Suppress("UNUSED_PARAMETER") onOpenRoadmap: () -> Unit = {}
) {
    val accent = Color(subjectAccent(route.subjectId))
    SpaceBookWebSubjectScreen(
        classId = route.classId,
        subjId = route.subjectId,
        subjectTitle = route.subjectName,
        subjectSubtitle = "KPK Textbook Board",
        accentColor = accent,
        initialChapter = route.initialChapter,
        onBackClick = onBack
    )
}
