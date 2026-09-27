package com.example.spacebookapp.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Functions
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Quiz
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRowDefaults
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.models.ChapterInfo
import com.example.spacebookapp.data.models.ClassInfo
import com.example.spacebookapp.data.models.MCQItem
import com.example.spacebookapp.data.models.QAItem
import com.example.spacebookapp.data.models.SubjectInfo
import com.example.spacebookapp.data.models.TopicInfo
import com.example.spacebookapp.data.repository.SpaceBookRepository
import com.example.spacebookapp.ui.components.FacebookBlue

@Composable
fun SubjectsUnitsScreen(
    onBackToHome: () -> Unit,
    modifier: Modifier = Modifier
) {
    var selectedClassId by remember { mutableStateOf("cls9") }
    var selectedSubjectId by remember { mutableStateOf("cls9-phy") }
    var activeChapter by remember { mutableStateOf<ChapterInfo?>(null) }

    val classes = SpaceBookRepository.classes
    val subjects = SpaceBookRepository.subjectsMap[selectedClassId] ?: emptyList()

    if (activeChapter != null) {
        ChapterDetailView(
            chapter = activeChapter!!,
            onBack = { activeChapter = null }
        )
    } else {
        Column(
            modifier = modifier
                .fillMaxSize()
                .background(Color(0xFFF8FAFC))
        ) {
            // Header Bar
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color.White)
                    .padding(horizontal = 14.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onBackToHome, modifier = Modifier.size(36.dp)) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Back",
                        tint = Color(0xFF0F172A)
                    )
                }
                Spacer(modifier = Modifier.width(8.dp))
                Column {
                    Text(
                        text = "Subjects & Units",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A)
                    )
                    Text(
                        text = "Khyber Pakhtunkhwa Curriculum",
                        fontSize = 11.sp,
                        color = Color(0xFF64748B)
                    )
                }
            }

            HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))

            // Class Tabs (Class 9, Class 10, Class 11, Class 12)
            LazyRow(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color.White)
                    .padding(vertical = 8.dp),
                contentPadding = PaddingValues(horizontal = 14.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(classes) { cls ->
                    val isSelected = selectedClassId == cls.id
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(20.dp))
                            .background(if (isSelected) FacebookBlue else Color(0xFFF1F5F9))
                            .clickable {
                                selectedClassId = cls.id
                                val newSubjects = SpaceBookRepository.subjectsMap[cls.id] ?: emptyList()
                                if (newSubjects.isNotEmpty()) {
                                    selectedSubjectId = newSubjects.first().id
                                }
                            }
                            .padding(horizontal = 16.dp, vertical = 8.dp)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(text = cls.emoji, fontSize = 14.sp)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = cls.name,
                                fontSize = 13.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.SemiBold,
                                color = if (isSelected) Color.White else Color(0xFF334155)
                            )
                        }
                    }
                }
            }

            HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))

            // Subject Selector Chips
            LazyRow(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 10.dp),
                contentPadding = PaddingValues(horizontal = 14.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(subjects) { subj ->
                    val isSelected = selectedSubjectId == subj.id
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(10.dp))
                            .background(if (isSelected) Color(subj.colorHex) else Color.White)
                            .border(
                                1.dp,
                                if (isSelected) Color.Transparent else Color(0xFFCBD5E1),
                                RoundedCornerShape(10.dp)
                            )
                            .clickable { selectedSubjectId = subj.id }
                            .padding(horizontal = 14.dp, vertical = 8.dp)
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(text = subj.emoji, fontSize = 14.sp)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                text = subj.name,
                                fontSize = 13.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                                color = if (isSelected) Color.White else Color(0xFF1E293B)
                            )
                        }
                    }
                }
            }

            // Chapters List for the selected subject
            val currentChapters = SpaceBookRepository.sampleChapters.filter {
                it.subjectId == selectedSubjectId
            }.ifEmpty {
                // Generate default chapter items if specific ones aren't populated
                listOf(
                    ChapterInfo(
                        num = 1,
                        subjectId = selectedSubjectId,
                        name = "Unit 1: Fundamentals & Conceptual Core",
                        pageRange = "1 – 24",
                        status = "Core Chapter",
                        slos = listOf("Understand core definitions", "Learn basic principles"),
                        topics = listOf(
                            TopicInfo("1.1", "Introduction & Scope", "Fundamental overview of the syllabus concepts.", "بنیادی تصورات کا تعارف", listOf("Key concept 1", "Key concept 2"))
                        ),
                        mcqs = listOf(
                            MCQItem("m-gen-1", "What is the primary foundation of this subject?", listOf("Hypothesis", "Observation & Law", "Speculation", "None"), 1, "Scientific study is grounded in systematic observation and laws.")
                        ),
                        shortQuestions = listOf(
                            QAItem("SQ 1", "Explain the primary importance of this unit.", "This unit lays down the foundational concepts and formulas essential for board exam preparation.")
                        ),
                        longQuestions = listOf(
                            QAItem("LQ 1", "Provide a comprehensive overview of the unit.", "Detailed explanation covering all textbook exercises, concepts, and derivations.")
                        )
                    ),
                    ChapterInfo(
                        num = 2,
                        subjectId = selectedSubjectId,
                        name = "Unit 2: Advanced Applications & Theories",
                        pageRange = "25 – 56",
                        status = "High Weightage",
                        slos = listOf("Apply formulas to complex problems", "Analyze graphical data"),
                        topics = emptyList(),
                        mcqs = emptyList(),
                        shortQuestions = emptyList(),
                        longQuestions = emptyList()
                    )
                )
            }

            LazyColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .padding(horizontal = 14.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                item {
                    Text(
                        text = "CHAPTERS & UNITS (${currentChapters.size})",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF64748B),
                        modifier = Modifier.padding(vertical = 4.dp)
                    )
                }

                items(currentChapters) { chapter ->
                    ChapterCard(
                        chapter = chapter,
                        onClick = { activeChapter = chapter }
                    )
                }

                item { Spacer(modifier = Modifier.height(16.dp)) }
            }
        }
    }
}

@Composable
fun ChapterCard(
    chapter: ChapterInfo,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Chapter Number badge
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(Color(0xFFEFF6FF)),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "${chapter.num}",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = FacebookBlue
                )
            }

            Spacer(modifier = Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = chapter.name,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A)
                    )
                }
                Spacer(modifier = Modifier.height(4.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = "Pages: ${chapter.pageRange}",
                        fontSize = 12.sp,
                        color = Color(0xFF64748B)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Box(
                        modifier = Modifier
                            .background(Color(0xFFECFDF5), RoundedCornerShape(4.dp))
                            .padding(horizontal = 6.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = chapter.status,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF059669)
                        )
                    }
                }
            }

            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = "Open Chapter",
                tint = Color(0xFF94A3B8),
                modifier = Modifier.size(20.dp)
            )
        }
    }
}

@Composable
fun ChapterDetailView(
    chapter: ChapterInfo,
    onBack: () -> Unit
) {
    val tabTitles = listOf("📖 Topics", "🎯 MCQs Quiz", "✏️ Short Qs", "📝 Long Qs", "📐 Formulas")
    var selectedTabIndex by remember { mutableIntStateOf(0) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
    ) {
        // Top Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White)
                .padding(horizontal = 14.dp, vertical = 10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack, modifier = Modifier.size(36.dp)) {
                Icon(
                    imageVector = Icons.Default.ArrowBack,
                    contentDescription = "Back",
                    tint = Color(0xFF0F172A)
                )
            }
            Spacer(modifier = Modifier.width(8.dp))
            Column {
                Text(
                    text = "Unit ${chapter.num}: ${chapter.name}",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A),
                    maxLines = 1
                )
                Text(
                    text = "Textbook Pages ${chapter.pageRange} • KPK Board",
                    fontSize = 11.sp,
                    color = Color(0xFF64748B)
                )
            }
        }

        // Sub Tabs
        ScrollableTabRow(
            selectedTabIndex = selectedTabIndex,
            containerColor = Color.White,
            contentColor = FacebookBlue,
            edgePadding = 12.dp,
            indicator = { tabPositions ->
                TabRowDefaults.SecondaryIndicator(
                    modifier = Modifier.tabIndicatorOffset(tabPositions[selectedTabIndex]),
                    color = FacebookBlue
                )
            }
        ) {
            tabTitles.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTabIndex == index,
                    onClick = { selectedTabIndex = index },
                    text = {
                        Text(
                            text = title,
                            fontSize = 13.sp,
                            fontWeight = if (selectedTabIndex == index) FontWeight.Bold else FontWeight.SemiBold,
                            color = if (selectedTabIndex == index) FacebookBlue else Color(0xFF64748B)
                        )
                    }
                )
            }
        }

        // Tab Content
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .padding(14.dp)
        ) {
            when (selectedTabIndex) {
                0 -> TopicsTabContent(topics = chapter.topics, slos = chapter.slos)
                1 -> MCQsQuizTabContent(mcqs = chapter.mcqs)
                2 -> QAListTabContent(items = chapter.shortQuestions, title = "Textbook Short Questions")
                3 -> QAListTabContent(items = chapter.longQuestions, title = "Comprehensive Long Questions")
                4 -> FormulasNumericalsTabContent(chapter = chapter)
            }
        }
    }
}

@Composable
fun TopicsTabContent(topics: List<TopicInfo>, slos: List<String>) {
    var selectedTopicIndex by remember { mutableIntStateOf(0) }
    val safeIndex = if (topics.isNotEmpty() && selectedTopicIndex in topics.indices) selectedTopicIndex else 0
    val activeTopic = topics.getOrNull(safeIndex)

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        if (topics.isNotEmpty()) {
            // Statistical Grid Section Header
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text(
                            text = "TOPICS STATISTICAL GRID (4 IN A ROW)",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF475569),
                            letterSpacing = 0.5.sp
                        )
                        Text(
                            text = "Tap any card to explore full theory, examples & exercises",
                            fontSize = 11.sp,
                            color = Color(0xFF64748B)
                        )
                    }
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(6.dp))
                            .background(Color(0xFFEFF6FF))
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    ) {
                        Text(
                            text = "${topics.size} Topics",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = FacebookBlue
                        )
                    }
                }
            }

            // Grid of Statistical Cards: EXACTLY 4 IN A ROW
            val rows = topics.chunked(4)
            items(rows.size) { rowIndex ->
                val rowTopics = rows[rowIndex]
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    for (colIndex in 0 until 4) {
                        if (colIndex < rowTopics.size) {
                            val topic = rowTopics[colIndex]
                            val globalIndex = rowIndex * 4 + colIndex
                            val isSelected = globalIndex == safeIndex
                            Box(modifier = Modifier.weight(1f)) {
                                StatisticalTopicCard(
                                    topic = topic,
                                    isSelected = isSelected,
                                    onClick = { selectedTopicIndex = globalIndex }
                                )
                            }
                        } else {
                            // Pad remaining cells to maintain exactly 4 equal columns in the row
                            Spacer(modifier = Modifier.weight(1f))
                        }
                    }
                }
            }
        }

        // Active Topic Detailed Study Card
        if (activeTopic != null) {
            item {
                ActiveTopicDetailCard(topic = activeTopic)
            }
        }

        // Chapter Student Learning Outcomes (SLOs)
        if (slos.isNotEmpty()) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFF0FDF4)),
                    border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFBBF7D0))
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(text = "🎯", fontSize = 16.sp)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Chapter Student Learning Outcomes (SLOs)",
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF166534)
                            )
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        slos.forEach { slo ->
                            Row(modifier = Modifier.padding(vertical = 3.dp)) {
                                Text("• ", color = Color(0xFF166534), fontWeight = FontWeight.Bold)
                                Text(slo, fontSize = 12.5.sp, color = Color(0xFF14532D), lineHeight = 17.sp)
                            }
                        }
                    }
                }
            }
        }

        item { Spacer(modifier = Modifier.height(16.dp)) }
    }
}

@Composable
fun StatisticalTopicCard(
    topic: TopicInfo,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    val baseColor = Color(topic.statColorHex)
    val gradientBrush = Brush.verticalGradient(
        colors = listOf(
            baseColor,
            baseColor.copy(alpha = 0.82f)
        )
    )

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(118.dp)
            .clickable { onClick() }
            .then(
                if (isSelected) {
                    Modifier.border(2.dp, FacebookBlue, RoundedCornerShape(10.dp))
                } else {
                    Modifier.border(0.5.dp, Color(0xFFCBD5E1), RoundedCornerShape(10.dp))
                }
            ),
        shape = RoundedCornerShape(10.dp),
        colors = CardDefaults.cardColors(containerColor = Color.Transparent),
        elevation = CardDefaults.cardElevation(defaultElevation = if (isSelected) 4.dp else 1.dp)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(gradientBrush)
                .padding(6.dp)
        ) {
            Column(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.SpaceBetween
            ) {
                // Top Row: Number pill & Icon
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(4.dp))
                            .background(Color.White.copy(alpha = 0.28f))
                            .padding(horizontal = 4.dp, vertical = 2.dp)
                    ) {
                        Text(
                            text = topic.num,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                    }

                    Text(
                        text = topic.statIcon.ifBlank { "📐" },
                        fontSize = 13.sp
                    )
                }

                // Middle: Topic Title
                Text(
                    text = topic.title,
                    fontSize = 10.5.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                    lineHeight = 12.sp,
                    modifier = Modifier.padding(vertical = 2.dp)
                )

                // Bottom: Metric / Formula Pill
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(4.dp))
                        .background(Color.Black.copy(alpha = 0.28f))
                        .padding(horizontal = 4.dp, vertical = 2.dp),
                    contentAlignment = Alignment.Center
                ) {
                    val pillText = topic.statMetric.ifBlank { topic.statBadge.ifBlank { "Topic ${topic.num}" } }
                    Text(
                        text = pillText,
                        fontSize = 8.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            // Selection indicator badge
            if (isSelected) {
                Box(
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                        .size(14.dp)
                        .clip(CircleShape)
                        .background(Color.White),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "✓",
                        fontSize = 9.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = FacebookBlue
                    )
                }
            }
        }
    }
}

@Composable
fun ActiveTopicDetailCard(topic: TopicInfo) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            // Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Box(
                    modifier = Modifier
                        .size(42.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(Color(topic.statColorHex).copy(alpha = 0.12f)),
                    contentAlignment = Alignment.Center
                ) {
                    Text(text = topic.statIcon.ifBlank { "📐" }, fontSize = 20.sp)
                }

                Spacer(modifier = Modifier.width(10.dp))

                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "Topic ${topic.num}: ${topic.title}",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A)
                    )
                    if (topic.statBadge.isNotBlank() || topic.statMetric.isNotBlank()) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "Formula/Metric: ",
                                fontSize = 11.sp,
                                color = Color(0xFF64748B)
                            )
                            Text(
                                text = topic.statMetric.ifBlank { topic.statBadge },
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(topic.statColorHex)
                            )
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))
            HorizontalDivider(thickness = 1.dp, color = Color(0xFFF1F5F9))
            Spacer(modifier = Modifier.height(12.dp))

            // English explanation
            Text(
                text = "📖 Textbook Concept & Theory",
                fontSize = 13.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF475569)
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = topic.summaryEn,
                fontSize = 13.5.sp,
                lineHeight = 20.sp,
                color = Color(0xFF1E293B)
            )

            // Urdu explanation
            if (topic.summaryUr.isNotBlank()) {
                Spacer(modifier = Modifier.height(10.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xFFF8FAFC))
                        .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(8.dp))
                        .padding(12.dp)
                ) {
                    Text(
                        text = topic.summaryUr,
                        fontSize = 13.5.sp,
                        lineHeight = 22.sp,
                        color = Color(0xFF0F172A)
                    )
                }
            }

            // Key Takeaways
            if (topic.keyPoints.isNotEmpty()) {
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = "🎯 Key Takeaways:",
                    fontSize = 12.5.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF475569)
                )
                Spacer(modifier = Modifier.height(6.dp))
                topic.keyPoints.forEach { pt ->
                    Row(
                        modifier = Modifier.padding(vertical = 2.dp),
                        verticalAlignment = Alignment.Top
                    ) {
                        Text("✔ ", fontSize = 12.sp, color = FacebookBlue, fontWeight = FontWeight.Bold)
                        Text(
                            text = pt,
                            fontSize = 12.5.sp,
                            color = Color(0xFF334155),
                            lineHeight = 18.sp
                        )
                    }
                }
            }

            // Solved Textbook Examples
            if (topic.examples.isNotEmpty()) {
                Spacer(modifier = Modifier.height(14.dp))
                Text(
                    text = "💡 Solved Textbook Examples (${topic.examples.size})",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFFB45309)
                )
                Spacer(modifier = Modifier.height(8.dp))
                topic.examples.forEach { example ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color(0xFFFFFBEB))
                            .border(1.dp, Color(0xFFFDE68A), RoundedCornerShape(8.dp))
                            .padding(10.dp)
                    ) {
                        Text(
                            text = example,
                            fontSize = 12.5.sp,
                            lineHeight = 18.sp,
                            fontWeight = FontWeight.Medium,
                            color = Color(0xFF92400E)
                        )
                    }
                }
            }

            // Solved Exercise Problems
            if (topic.exercises.isNotEmpty()) {
                Spacer(modifier = Modifier.height(14.dp))
                Text(
                    text = "📝 Solved Exercise Problems (${topic.exercises.size})",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF1E40AF)
                )
                Spacer(modifier = Modifier.height(8.dp))
                topic.exercises.forEach { ex ->
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color(0xFFEFF6FF))
                            .border(1.dp, Color(0xFFBFDBFE), RoundedCornerShape(8.dp))
                            .padding(10.dp)
                    ) {
                        Text(
                            text = ex,
                            fontSize = 12.5.sp,
                            lineHeight = 18.sp,
                            fontWeight = FontWeight.Medium,
                            color = Color(0xFF1E3A8A)
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun MCQsQuizTabContent(mcqs: List<MCQItem>) {
    val selectedAnswers = remember { mutableStateMapOf<String, Int>() }

    if (mcqs.isEmpty()) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("No MCQs loaded for this chapter.", color = Color(0xFF64748B))
        }
        return
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        items(mcqs, key = { it.id }) { mcq ->
            val chosen = selectedAnswers[mcq.id]
            val isAnswered = chosen != null

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = mcq.question,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        lineHeight = 21.sp,
                        color = Color(0xFF0F172A)
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    mcq.options.forEachIndexed { optIndex, optionText ->
                        val isCorrectOption = optIndex == mcq.correctIndex
                        val isSelectedOption = chosen == optIndex

                        val (bgOptColor, borderOptColor, textOptColor) = when {
                            !isAnswered -> Triple(Color(0xFFF8FAFC), Color(0xFFE2E8F0), Color(0xFF1E293B))
                            isCorrectOption -> Triple(Color(0xFFDCFCE7), Color(0xFF22C55E), Color(0xFF15803D))
                            isSelectedOption -> Triple(Color(0xFFFEE2E2), Color(0xFFEF4444), Color(0xFFB91C1C))
                            else -> Triple(Color(0xFFF8FAFC), Color(0xFFE2E8F0), Color(0xFF94A3B8))
                        }

                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .background(bgOptColor)
                                .border(1.dp, borderOptColor, RoundedCornerShape(8.dp))
                                .clickable(enabled = !isAnswered) {
                                    selectedAnswers[mcq.id] = optIndex
                                    SpaceBookRepository.recordMCQAnswer(optIndex == mcq.correctIndex)
                                }
                                .padding(horizontal = 14.dp, vertical = 10.dp)
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                val optionLetter = ('A' + optIndex).toString()
                                Text(
                                    text = "$optionLetter.",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 13.sp,
                                    color = textOptColor
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(
                                    text = optionText,
                                    fontSize = 13.5.sp,
                                    color = textOptColor,
                                    modifier = Modifier.weight(1f)
                                )
                                if (isAnswered && isCorrectOption) {
                                    Icon(
                                        imageVector = Icons.Default.CheckCircle,
                                        contentDescription = "Correct",
                                        tint = Color(0xFF15803D),
                                        modifier = Modifier.size(18.dp)
                                    )
                                } else if (isAnswered && isSelectedOption) {
                                    Icon(
                                        imageVector = Icons.Default.Close,
                                        contentDescription = "Incorrect",
                                        tint = Color(0xFFB91C1C),
                                        modifier = Modifier.size(18.dp)
                                    )
                                }
                            }
                        }
                    }

                    // Explanation Box
                    if (isAnswered) {
                        Spacer(modifier = Modifier.height(10.dp))
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .clip(RoundedCornerShape(8.dp))
                                .background(Color(0xFFF0FDF4))
                                .padding(10.dp)
                        ) {
                            Text(
                                text = "💡 Explanation: ${mcq.explanation}",
                                fontSize = 12.sp,
                                color = Color(0xFF166534)
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun QAListTabContent(items: List<QAItem>, title: String) {
    if (items.isEmpty()) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("No questions listed for this chapter.", color = Color(0xFF64748B))
        }
        return
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        items(items) { item ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "${item.qNum}: ${item.question}",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A)
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = item.answer,
                        fontSize = 14.sp,
                        lineHeight = 21.sp,
                        color = Color(0xFF334155)
                    )
                }
            }
        }
    }
}

@Composable
fun FormulasNumericalsTabContent(chapter: ChapterInfo) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        if (chapter.formulas.isNotEmpty()) {
            item {
                Text(
                    text = "KEY FORMULAS & UNITS",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF64748B)
                )
            }
            items(chapter.formulas) { form ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(10.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(14.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                text = form.name,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF0F172A)
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = form.formula,
                                fontSize = 15.sp,
                                fontFamily = FontFamily.Monospace,
                                fontWeight = FontWeight.Bold,
                                color = FacebookBlue
                            )
                        }
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(Color(0xFFF1F5F9))
                                .padding(horizontal = 8.dp, vertical = 4.dp)
                        ) {
                            Text(text = form.unit, fontSize = 11.sp, color = Color(0xFF475569))
                        }
                    }
                }
            }
        }

        if (chapter.numericals.isNotEmpty()) {
            item {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "SOLVED TEXTBOOK NUMERICALS",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF64748B)
                )
            }
            items(chapter.numericals) { num ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = "${num.num}: ${num.statement}",
                            fontSize = 14.5.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color(0xFF0F172A)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(text = "Given: ${num.given}", fontSize = 13.sp, color = Color(0xFF475569))
                        Text(text = "Formula: ${num.formula}", fontSize = 13.sp, color = FacebookBlue, fontWeight = FontWeight.SemiBold)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(text = "Solution: ${num.solution}", fontSize = 13.sp, color = Color(0xFF334155))
                        Spacer(modifier = Modifier.height(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(6.dp))
                                .background(Color(0xFFECFDF5))
                                .padding(horizontal = 10.dp, vertical = 4.dp)
                        ) {
                            Text(
                                text = "Answer: ${num.answer}",
                                fontSize = 13.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF059669)
                            )
                        }
                    }
                }
            }
        }
    }
}
