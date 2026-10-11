package com.example.spacebookapp.ui.subjects

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
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
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
import com.example.spacebookapp.data.web.GenericChapter
import com.example.spacebookapp.data.web.WebRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import androidx.compose.runtime.LaunchedEffect

/**
 * TuitionHub's `goToChapters` + `openGenericChapterDetails` flow, used for every
 * subject that does not yet ship a fully authored textbook volume (Computer
 * Science, Class 10-12 subjects, ...).
 */
@Composable
fun GenericSubjectView(
    classId: String,
    subjectId: String,
    subjectName: String,
    emoji: String,
    initialChapter: Int,
    onBack: () -> Unit,
    onOpenRoadmap: () -> Unit = {},
    modifier: Modifier = Modifier
) {
    var chapters by remember { mutableStateOf<List<GenericChapter>?>(null) }
    var selectedIndex by remember { mutableIntStateOf(initialChapter.coerceAtLeast(0)) }

    LaunchedEffect(subjectId) {
        chapters = withContext(Dispatchers.IO) { WebRepository.genericChapters(subjectId) }
    }

    val list = chapters
    if (list == null) {
        LoadingBox("Loading unitsâ€¦")
        return
    }

    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
    ) {
        SubjectTopBar(
            title = "$emoji $subjectName",
            subtitle = "Units â€¢ KPK Textbook Board",
            onBack = onBack,
            accent = Color(0xFF475569)
        )
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0))

        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(14.dp),
            verticalArrangement = Arrangement.spacedBy(9.dp)
        ) {
            item {
                Text(
                    text = "${list.size} Units in the official syllabus",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF64748B)
                )
            }

            items(list) { chapter ->
                val index = list.indexOf(chapter)
                GenericChapterCard(
                    chapter = chapter,
                    isSelected = index == selectedIndex,
                    onClick = {
                        selectedIndex = index
                    }
                )
            }

            list.getOrNull(selectedIndex)?.let { chapter ->
                item {
                    Spacer(modifier = Modifier.height(4.dp))
                    GenericChapterDetail(chapter = chapter, subjectName = subjectName, className = classId)
                }
            }
        }
    }
}

@Composable
private fun GenericChapterCard(
    chapter: GenericChapter,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    val (statusLabel, statusBg, statusFg) = when (chapter.status) {
        "done", "ready" -> Triple("Completed", Color(0xFFDCFCE7), Color(0xFF15803D))
        "progress" -> Triple("In Progress", Color(0xFFFEF9C3), Color(0xFFA16207))
        else -> Triple("Upcoming", Color(0xFFF1F5F9), Color(0xFF64748B))
    }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) Color(0xFFEFF6FF) else Color.White
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = if (isSelected) 3.dp else 1.dp)
    ) {
        Row(
            modifier = Modifier.padding(13.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(42.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(if (isSelected) Color(0xFF475569) else Color(0xFFF1F5F9)),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "${chapter.num}",
                    fontSize = 17.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = if (isSelected) Color.White else Color(0xFF475569)
                )
            }
            Spacer(modifier = Modifier.width(12.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = chapter.name,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F172A),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                Spacer(modifier = Modifier.height(3.dp))
                Text(
                    text = "${chapter.topics} â€¢ Click to view syllabus & competencies",
                    fontSize = 11.sp,
                    color = Color(0xFF64748B)
                )
            }
            Spacer(modifier = Modifier.width(8.dp))
            StatusPill(statusLabel, statusBg, statusFg)
            Icon(
                imageVector = Icons.Default.ChevronRight,
                contentDescription = null,
                tint = Color(0xFF94A3B8),
                modifier = Modifier.size(18.dp)
            )
        }
    }
}

@Composable
private fun GenericChapterDetail(
    chapter: GenericChapter,
    subjectName: String,
    className: String
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(Color.White)
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(14.dp))
            .padding(16.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .background(Color(0xFFE0F2FE))
                    .padding(horizontal = 8.dp, vertical = 4.dp)
            ) {
                Text(text = className.uppercase(), fontSize = 10.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0369A1))
            }
            Spacer(modifier = Modifier.width(6.dp))
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(6.dp))
                    .background(Color(0xFFEDE9FE))
                    .padding(horizontal = 8.dp, vertical = 4.dp)
            ) {
                Text(text = "Unit ${chapter.num}", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = Color(0xFF6D28D9))
            }
        }
        Spacer(modifier = Modifier.height(10.dp))
        Text(
            text = chapter.name,
            fontSize = 16.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color(0xFF0F172A)
        )
        Text(
            text = "Official Curriculum Framework â€¢ Khyber Pakhtunkhwa Textbook Board",
            fontSize = 11.sp,
            color = Color(0xFF64748B)
        )
        Spacer(modifier = Modifier.height(12.dp))
        CalloutBlock(
            label = "Core Topics & Syllabus Competencies",
            text = "â€¢ Fundamental concepts, physical laws and theoretical foundations of ${chapter.name}\n" +
                "â€¢ Mathematical derivations, formulas and quantitative relationships\n" +
                "â€¢ Board exam focal points: short questions, long descriptive topics and conceptual reasoning\n" +
                "â€¢ Practical laboratory applications, industrial relevance and real-world technology links",
            background = Color(0xFFF8FAFC),
            border = Color(0xFFE2E8F0),
            labelColor = Color(0xFF1E293B),
            icon = "ðŸ“˜"
        )
        Spacer(modifier = Modifier.height(10.dp))
        Text(
            text = "The complete verified, line-by-line textbook solutions for $subjectName â€“ ${chapter.name} will populate here as soon as the official KPK textbook volume is added to the app, exactly as TuitionHub does for Class 12 chapters.",
            fontSize = 12.sp,
            lineHeight = 17.sp,
            color = Color(0xFF64748B)
        )
    }
}
