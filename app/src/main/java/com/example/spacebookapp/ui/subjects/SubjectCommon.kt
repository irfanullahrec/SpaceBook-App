package com.example.spacebookapp.ui.subjects

import android.content.Context
import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.gestures.detectTapGestures
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Stop
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRowDefaults
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextLayoutResult
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.runtime.CompositionLocalProvider
import com.example.spacebookapp.data.models.ChapterInfo
import com.example.spacebookapp.data.repository.SpaceBookRepository
import com.example.spacebookapp.ui.components.FacebookBlue
import java.util.Locale

// ============================================================ unified content types

data class QuizItem(
    val id: String,
    val question: String,
    val options: List<String>,
    val correctIndex: Int,
    val explanation: String
)

data class QaCardItem(
    val badge: String,
    val badgeColor: Color,
    val question: String,
    val answer: String,
    val meta: String = "",
    val answerLabel: String = "Exam-Ready Answer:"
)

// ============================================================ tabs

data class SubjectTab(val id: String, val label: String)

@Composable
fun PillTabBar(
    tabs: List<SubjectTab>,
    selectedId: String,
    onSelect: (String) -> Unit,
    accent: Color = FacebookBlue
) {
    if (tabs.isEmpty()) return
    val selectedIndex = tabs.indexOfFirst { it.id == selectedId }.coerceAtLeast(0)
    ScrollableTabRow(
        selectedTabIndex = selectedIndex,
        containerColor = Color.White,
        contentColor = accent,
        edgePadding = 12.dp,
        divider = { HorizontalDivider(thickness = 1.dp, color = Color(0xFFE2E8F0)) },
        indicator = { tabPositions ->
            TabRowDefaults.SecondaryIndicator(
                modifier = Modifier.tabIndicatorOffset(tabPositions[selectedIndex]),
                color = accent
            )
        }
    ) {
        tabs.forEach { tab ->
            Tab(
                selected = tab.id == selectedId,
                onClick = { onSelect(tab.id) },
                text = {
                    Text(
                        text = tab.label,
                        fontSize = 12.5.sp,
                        fontWeight = if (tab.id == selectedId) FontWeight.Bold else FontWeight.SemiBold,
                        color = if (tab.id == selectedId) accent else Color(0xFF64748B),
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            )
        }
    }
}

// ============================================================ screen chrome

@Composable
fun SubjectTopBar(
    title: String,
    subtitle: String,
    onBack: () -> Unit,
    accent: Color = FacebookBlue,
    actions: @Composable RowScope.() -> Unit = {}
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color.White)
            .padding(horizontal = 12.dp, vertical = 8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        IconButton(onClick = onBack, modifier = Modifier.size(36.dp)) {
            Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = Color(0xFF0F172A))
        }
        Spacer(modifier = Modifier.width(6.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = title,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF0F172A),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = subtitle,
                fontSize = 11.sp,
                color = Color(0xFF64748B),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        }
        actions()
    }
}

@Composable
fun TopBarChip(label: String, background: Color, onClick: () -> Unit) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(16.dp))
            .background(background)
            .clickable(onClick = onClick)
            .padding(horizontal = 12.dp, vertical = 7.dp)
    ) {
        Text(
            text = label,
            fontSize = 11.5.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )
    }
}

@Composable
fun LoadingBox(label: String = "Loading textbook content�") {
    Box(
        modifier = Modifier.fillMaxSize().background(Color(0xFFF8FAFC)),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box(
                modifier = Modifier
                    .size(34.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(FacebookBlue.copy(alpha = 0.12f)),
                contentAlignment = Alignment.Center
            ) {
                Text("??", fontSize = 17.sp)
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(text = label, fontSize = 13.sp, color = Color(0xFF64748B))
        }
    }
}

@Composable
fun ErrorBox(message: String, onRetry: (() -> Unit)? = null) {
    Box(modifier = Modifier.fillMaxSize().padding(24.dp), contentAlignment = Alignment.Center) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text("??", fontSize = 28.sp)
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = message, fontSize = 13.sp, color = Color(0xFF64748B), lineHeight = 19.sp)
            if (onRetry != null) {
                Spacer(modifier = Modifier.height(12.dp))
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(8.dp))
                        .background(FacebookBlue)
                        .clickable { onRetry() }
                        .padding(horizontal = 18.dp, vertical = 9.dp)
                ) {
                    Text("Retry", color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
fun ChapterScroller(
    count: Int,
    selectedIndex: Int,
    onSelect: (Int) -> Unit,
    accent: Color = FacebookBlue,
    title: (Int) -> String,
    subtitle: (Int) -> String
) {
    LazyRow(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color.White)
            .padding(vertical = 8.dp),
        contentPadding = PaddingValues(horizontal = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items((0 until count).toList()) { index ->
            val selected = index == selectedIndex
            Column(
                modifier = Modifier
                    .width(160.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(if (selected) accent else Color(0xFFF8FAFC))
                    .border(
                        1.dp,
                        if (selected) Color.Transparent else Color(0xFFE2E8F0),
                        RoundedCornerShape(10.dp)
                    )
                    .clickable { onSelect(index) }
                    .padding(10.dp)
            ) {
                Text(
                    text = title(index),
                    fontSize = 12.5.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (selected) Color.White else Color(0xFF0F172A),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis,
                    lineHeight = 15.sp
                )
                Spacer(modifier = Modifier.height(3.dp))
                Text(
                    text = subtitle(index),
                    fontSize = 10.sp,
                    color = if (selected) Color.White.copy(alpha = 0.85f) else Color(0xFF64748B),
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
        }
    }
}

// ============================================================ statistical cards

/** Traffic-light tone for a status word taken from the web data (`done` / `progress` / …). */
data class StatusTone(val background: Color, val foreground: Color)

fun statusTone(status: String): StatusTone = when (status) {
    "done", "ready", "completed", "complete" -> StatusTone(Color(0xFFDCFCE7), Color(0xFF15803D))
    "progress", "in-progress" -> StatusTone(Color(0xFFFEF9C3), Color(0xFFA16207))
    else -> StatusTone(Color(0xFFF1F5F9), Color(0xFF64748B))
}

/**
 * The shared "statistical card" used for every level of the Subjects & Units hierarchy:
 * a class, a subject, a chapter, or a topic inside a chapter.
 */
@Composable
fun StatCard(
    emoji: String,
    title: String,
    subtitle: String = "",
    accent: Color = FacebookBlue,
    badge: String? = null,
    stats: List<Pair<Any, String>> = emptyList(),
    status: String? = null,
    chevron: Boolean = true,
    onClick: (() -> Unit)? = null,
    modifier: Modifier = Modifier
) {
    val tone = status?.let { statusTone(it) }
    Card(
        modifier = modifier
            .fillMaxWidth()
            .let { if (onClick != null) it.clickable { onClick() } else it },
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(13.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(accent.copy(alpha = 0.12f)),
                contentAlignment = Alignment.Center
            ) {
                Text(text = emoji, fontSize = 20.sp)
            }
            Spacer(modifier = Modifier.width(11.dp))
            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        text = title,
                        fontSize = 14.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF0F172A),
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis,
                        modifier = Modifier.weight(1f)
                    )
                    if (tone != null) {
                        Spacer(modifier = Modifier.width(6.dp))
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(99.dp))
                                .background(tone.background)
                                .padding(horizontal = 8.dp, vertical = 3.dp)
                        ) {
                            Text(
                                text = statusLabel(status ?: ""),
                                fontSize = 9.5.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = tone.foreground,
                                maxLines = 1
                            )
                        }
                    }
                }
                if (subtitle.isNotBlank()) {
                    Spacer(modifier = Modifier.height(3.dp))
                    Text(
                        text = subtitle,
                        fontSize = 11.sp,
                        color = Color(0xFF64748B),
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }
                if (stats.isNotEmpty() || badge != null) {
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(6.dp),
                        modifier = Modifier.horizontalScroll(rememberScrollState())
                    ) {
                        if (badge != null) StatChip(label = badge, tint = accent, filled = true)
                        stats.forEach { (value, label) ->
                            StatChip(
                                label = if (label.isBlank()) value.toString() else "$value $label",
                                tint = accent,
                                filled = false
                            )
                        }
                    }
                }
            }
            if (chevron && onClick != null) {
                Spacer(modifier = Modifier.width(6.dp))
                Text(text = "›", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = accent.copy(alpha = 0.55f))
            }
        }
    }
}

@Composable
private fun StatChip(label: String, tint: Color, filled: Boolean) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(99.dp))
            .background(if (filled) tint.copy(alpha = 0.14f) else Color(0xFFF1F5F9))
            .padding(horizontal = 8.dp, vertical = 3.dp)
    ) {
        Text(
            text = label,
            fontSize = 10.sp,
            fontWeight = FontWeight.Bold,
            color = if (filled) tint else Color(0xFF475569),
            maxLines = 1
        )
    }
}

fun statusLabel(status: String): String = when (status) {
    "done", "ready", "completed", "complete" -> "✓ Ready"
    "progress", "in-progress" -> "◐ In Progress"
    else -> "◌ Planned"
}

/** Round icon button used for the level-4 chapter screen's action row. */
@Composable
fun TopBarIcon(
    icon: ImageVector,
    contentDescription: String,
    accent: Color = FacebookBlue,
    active: Boolean = false,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .size(34.dp)
            .clip(CircleShape)
            .background(if (active) accent else accent.copy(alpha = 0.10f))
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Icon(
            imageVector = icon,
            contentDescription = contentDescription,
            tint = if (active) Color.White else accent,
            modifier = Modifier.size(18.dp)
        )
    }
}

/** One row of the unit picker dialog (the level-3 chapter list, reachable from level 4). */
data class UnitOption(val num: Int, val title: String, val subtitle: String, val status: String)

@Composable
fun UnitPickerDialog(
    title: String,
    options: List<UnitOption>,
    selectedIndex: Int,
    accent: Color = FacebookBlue,
    onSelect: (Int) -> Unit,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        containerColor = Color.White,
        title = {
            Text(
                text = title,
                fontSize = 15.sp,
                fontWeight = FontWeight.ExtraBold,
                color = Color(0xFF0F172A)
            )
        },
        text = {
            Column(
                modifier = Modifier
                    .heightIn(max = 420.dp)
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                options.forEachIndexed { i, option ->
                    StatCard(
                        emoji = option.num.toString(),
                        title = option.title,
                        subtitle = option.subtitle,
                        accent = accent,
                        status = option.status,
                        onClick = {
                            onSelect(i)
                            onDismiss()
                        },
                        modifier = if (i == selectedIndex) {
                            Modifier.border(2.dp, accent, RoundedCornerShape(14.dp))
                        } else {
                            Modifier
                        }
                    )
                }
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text(text = "Close", fontWeight = FontWeight.Bold, color = accent)
            }
        }
    )
}

// ============================================================ accordion / sections

@Composable
fun AccordionCard(
    title: String,
    accent: Color = FacebookBlue,
    badge: String? = null,
    initiallyExpanded: Boolean = false,
    leading: (@Composable () -> Unit)? = null,
    content: @Composable ColumnScope.() -> Unit
) {
    var expanded by remember { mutableStateOf(initiallyExpanded) }
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(accent.copy(alpha = 0.07f))
                    .clickable { expanded = !expanded }
                    .padding(horizontal = 14.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                leading?.invoke()
                Spacer(modifier = Modifier.width(8.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = title,
                        fontSize = 13.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = accent,
                        lineHeight = 18.sp
                    )
                    if (badge != null) {
                        Text(text = badge, fontSize = 11.sp, color = Color(0xFF64748B))
                    }
                }
                Text(
                    text = if (expanded) "-" else "+",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = accent
                )
            }
            AnimatedVisibility(
                visible = expanded,
                enter = expandVertically() + fadeIn(),
                exit = shrinkVertically() + fadeOut()
            ) {
                Column(
                    modifier = Modifier.padding(14.dp),
                    content = content
                )
            }
        }
    }
}

@Composable
fun SectionHeading(text: String, accent: Color = FacebookBlue) {
    Text(
        text = text,
        fontSize = 12.sp,
        fontWeight = FontWeight.ExtraBold,
        color = accent,
        letterSpacing = 0.4.sp,
        modifier = Modifier.padding(vertical = 4.dp)
    )
}

@Composable
fun EmptyHint(text: String) {
    Box(modifier = Modifier.fillMaxWidth().padding(24.dp), contentAlignment = Alignment.Center) {
        Text(text = text, fontSize = 13.sp, color = Color(0xFF94A3B8))
    }
}

// ============================================================ callout blocks

@Composable
fun CalloutBlock(
    label: String,
    text: String,
    background: Color,
    border: Color,
    labelColor: Color,
    icon: String = "??"
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
            .clip(RoundedCornerShape(8.dp))
            .background(background)
            .border(1.dp, border, RoundedCornerShape(8.dp))
            .padding(12.dp)
    ) {
        Text(
            text = "$icon $label",
            fontSize = 11.sp,
            fontWeight = FontWeight.Bold,
            color = labelColor,
            letterSpacing = 0.3.sp
        )
        Spacer(modifier = Modifier.height(5.dp))
        Text(text = text, fontSize = 13.sp, lineHeight = 19.sp, color = Color(0xFF1E293B))
    }
}

// ============================================================ tables

@Composable
fun DataTableBlock(title: String, headers: List<String>, rows: List<List<String>>) {
    if (headers.isEmpty() && rows.isEmpty()) return
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp)
            .clip(RoundedCornerShape(10.dp))
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(10.dp))
            .background(Color.White)
            .padding(10.dp)
    ) {
        if (title.isNotBlank()) {
            Text(text = "?? $title", fontSize = 12.5.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
            Spacer(modifier = Modifier.height(8.dp))
        }
        Row(modifier = Modifier.horizontalScroll(rememberScrollState())) {
            Column {
                if (headers.isNotEmpty()) {
                    Row {
                        headers.forEach { h ->
                            Box(
                                modifier = Modifier
                                    .width(140.dp)
                                    .background(Color(0xFFF1F5F9))
                                    .border(1.dp, Color(0xFFCBD5E1))
                                    .padding(8.dp)
                            ) {
                                Text(h, fontSize = 11.5.sp, fontWeight = FontWeight.Bold, color = Color(0xFF334155))
                            }
                        }
                    }
                }
                rows.forEach { row ->
                    Row {
                        row.forEach { cell ->
                            Box(
                                modifier = Modifier
                                    .width(140.dp)
                                    .border(1.dp, Color(0xFFE2E8F0))
                                    .background(Color.White)
                                    .padding(8.dp)
                            ) {
                                Text(cell, fontSize = 11.5.sp, color = Color(0xFF334155), lineHeight = 15.sp)
                            }
                        }
                    }
                }
            }
        }
    }
}

// ============================================================ MCQ quiz

@Composable
fun McqQuizList(
    items: List<QuizItem>,
    accent: Color = FacebookBlue,
    showSource: Boolean = false
) {
    if (items.isEmpty()) {
        EmptyHint("No MCQs available for this section yet.")
        return
    }
    val answers = remember(items) { mutableStateMapOf<String, Int>() }
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        items.forEach { item -> McqCard(item, answers, accent, showSource) }
    }
}

@Composable
private fun McqCard(
    item: QuizItem,
    answers: androidx.compose.runtime.snapshots.SnapshotStateMap<String, Int>,
    accent: Color,
    showSource: Boolean
) {
    val chosen = answers[item.id]
    val answered = chosen != null

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            if (showSource) {
                Text(item.id, fontSize = 10.5.sp, fontWeight = FontWeight.Bold, color = accent)
                Spacer(modifier = Modifier.height(4.dp))
            }
            Text(
                text = item.question,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                lineHeight = 20.sp,
                color = Color(0xFF0F172A)
            )
            Spacer(modifier = Modifier.height(10.dp))

            item.options.forEachIndexed { index, option ->
                val correct = index == item.correctIndex
                val selected = chosen == index
                val bg = when {
                    !answered -> Color(0xFFF8FAFC)
                    correct -> Color(0xFFDCFCE7)
                    selected -> Color(0xFFFEE2E2)
                    else -> Color(0xFFF8FAFC)
                }
                val border = when {
                    !answered -> Color(0xFFE2E8F0)
                    correct -> Color(0xFF22C55E)
                    selected -> Color(0xFFEF4444)
                    else -> Color(0xFFE2E8F0)
                }
                val textColor = when {
                    !answered -> Color(0xFF1E293B)
                    correct -> Color(0xFF15803D)
                    selected -> Color(0xFFB91C1C)
                    else -> Color(0xFF94A3B8)
                }
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 3.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(bg)
                        .border(1.dp, border, RoundedCornerShape(8.dp))
                        .clickable(enabled = !answered) {
                            answers[item.id] = index
                            SpaceBookRepository.recordMCQAnswer(index == item.correctIndex)
                        }
                        .padding(horizontal = 12.dp, vertical = 9.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "${('A' + index)}.",
                        fontSize = 12.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = textColor
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = option,
                        fontSize = 13.sp,
                        color = textColor,
                        modifier = Modifier.weight(1f),
                        lineHeight = 17.sp
                    )
                    if (answered && correct) {
                        Icon(
                            Icons.Default.CheckCircle,
                            contentDescription = "Correct",
                            tint = Color(0xFF15803D),
                            modifier = Modifier.size(17.dp)
                        )
                    } else if (answered && selected) {
                        Icon(
                            Icons.Default.Close,
                            contentDescription = "Incorrect",
                            tint = Color(0xFFB91C1C),
                            modifier = Modifier.size(17.dp)
                        )
                    }
                }
            }

            if (answered && item.explanation.isNotBlank()) {
                Spacer(modifier = Modifier.height(9.dp))
                CalloutBlock(
                    label = "Explanation",
                    text = item.explanation,
                    background = Color(0xFFF0FDF4),
                    border = Color(0xFFBBF7D0),
                    labelColor = Color(0xFF15803D),
                    icon = "??"
                )
            }
        }
    }
}

// ============================================================ reveal Q / A cards

@Composable
fun RevealQaCard(item: QaCardItem) {
    var revealed by remember { mutableStateOf(false) }
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { revealed = !revealed },
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(modifier = Modifier.padding(14.dp)) {
            Row(verticalAlignment = Alignment.Top) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(5.dp))
                        .background(item.badgeColor)
                        .padding(horizontal = 7.dp, vertical = 3.dp)
                ) {
                    Text(
                        text = item.badge,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.ExtraBold,
                        color = Color.White
                    )
                }
                Spacer(modifier = Modifier.width(9.dp))
                Text(
                    text = item.question,
                    fontSize = 13.5.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = Color(0xFF0F172A),
                    lineHeight = 19.sp,
                    modifier = Modifier.weight(1f)
                )
            }
            if (item.meta.isNotBlank()) {
                Spacer(modifier = Modifier.height(5.dp))
                Text(text = item.meta, fontSize = 11.sp, color = item.badgeColor, fontWeight = FontWeight.Bold)
            }
            AnimatedVisibility(visible = revealed) {
                Column {
                    Spacer(modifier = Modifier.height(10.dp))
                    CalloutBlock(
                        label = item.answerLabel,
                        text = item.answer.ifBlank { "Answer available in the Textbook Exercises section." },
                        background = Color(0xFFF0FDF4),
                        border = Color(0xFFBBF7D0),
                        labelColor = Color(0xFF15803D),
                        icon = "?"
                    )
                }
            }
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = if (revealed) "Tap to hide answer" else "Tap to reveal exam-ready answer",
                fontSize = 11.sp,
                color = Color(0xFF94A3B8)
            )
        }
    }
}

@Composable
fun QaList(items: List<QaCardItem>) {
    if (items.isEmpty()) {
        EmptyHint("No questions listed for this section.")
        return
    }
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        items.forEach { RevealQaCard(it) }
    }
}

// ============================================================ trilingual summary

@Composable
fun LanguageSwitchCard(
    english: String,
    urdu: String,
    pashto: String,
    accent: Color = FacebookBlue,
    initialLang: String = "en"
) {
    var lang by remember { mutableStateOf(initialLang) }
    val labels = listOf("en" to "English", "ur" to "????", "ps" to "????")

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(10.dp))
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(10.dp))
            .background(Color(0xFFF8FAFC))
            .padding(12.dp)
    ) {
        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            labels.forEach { (key, label) ->
                val selected = lang == key
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (selected) accent else Color.White)
                        .border(1.dp, if (selected) accent else Color(0xFFCBD5E1), RoundedCornerShape(6.dp))
                        .clickable { lang = key }
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Text(
                        text = label,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (selected) Color.White else Color(0xFF475569)
                    )
                }
            }
        }
        Spacer(modifier = Modifier.height(10.dp))
        val text = when (lang) {
            "ur" -> urdu.ifBlank { english }
            "ps" -> pashto.ifBlank { english }
            else -> english
        }
        val rtl = lang != "en"
        CompositionLocalProvider(LocalLayoutDirection provides if (rtl) LayoutDirection.Rtl else LayoutDirection.Ltr) {
            Text(
                text = text,
                fontSize = 14.sp,
                lineHeight = 22.sp,
                color = Color(0xFF1E293B)
            )
        }
    }
}

// ============================================================ checklist

private const val CHECKLIST_PREFS = "spacebook_checklists"

@Composable
fun ChecklistCard(
    storageKey: String,
    title: String,
    items: List<String>,
    accent: Color = FacebookBlue
) {
    val context = LocalContext.current
    val prefs = remember { context.getSharedPreferences(CHECKLIST_PREFS, Context.MODE_PRIVATE) }
    val checked = remember {
        mutableStateMapOf<String, Boolean>().apply {
            items.forEachIndexed { i, item -> put(item, prefs.getBoolean("$storageKey#$i", false)) }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(12.dp))
            .background(Color.White)
            .padding(14.dp)
    ) {
        val done = items.count { checked[it] == true }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(text = "? $title", fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
            Spacer(modifier = Modifier.weight(1f))
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(99.dp))
                    .background(accent.copy(alpha = 0.12f))
                    .padding(horizontal = 9.dp, vertical = 4.dp)
            ) {
                Text(
                    text = "$done/${items.size}",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = accent
                )
            }
        }
        Spacer(modifier = Modifier.height(10.dp))
        items.forEachIndexed { index, item ->
            val isChecked = checked[item] == true
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(if (isChecked) Color(0xFFF0FDF4) else Color(0xFFF8FAFC))
                    .clickable {
                        val next = !isChecked
                        checked[item] = next
                        prefs.edit().putBoolean("$storageKey#$index", next).apply()
                    }
                    .padding(horizontal = 10.dp, vertical = 8.dp),
                verticalAlignment = Alignment.Top
            ) {
                Box(
                    modifier = Modifier
                        .size(18.dp)
                        .clip(CircleShape)
                        .background(if (isChecked) Color(0xFF16A34A) else Color.White)
                        .border(1.5.dp, if (isChecked) Color(0xFF16A34A) else Color(0xFFCBD5E1), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    if (isChecked) {
                        Text("?", fontSize = 11.sp, color = Color.White, fontWeight = FontWeight.Bold)
                    }
                }
                Spacer(modifier = Modifier.width(9.dp))
                Text(
                    text = item,
                    fontSize = 12.5.sp,
                    lineHeight = 17.sp,
                    color = if (isChecked) Color(0xFF166534) else Color(0xFF334155)
                )
            }
        }
    }
}

// ============================================================ text to speech

class TtsController(context: Context) : TextToSpeech.OnInitListener {
    private var tts: TextToSpeech? = null
    var ready by mutableStateOf(false)
        private set
    var speaking by mutableStateOf(false)
        private set
    var paused by mutableStateOf(false)
        private set
    var rate by mutableFloatStateOf(1.0f)
        private set
    var progress by mutableIntStateOf(0)
        private set
    var gender by mutableStateOf("male")
        private set

    /** Index of the sentence currently being read, so the view can highlight it. */
    var currentSentence by mutableIntStateOf(-1)
        private set

    /** Character range of the word being spoken inside [currentSentence] (`-1` when unknown). */
    var wordStart by mutableIntStateOf(-1)
        private set
    var wordEnd by mutableIntStateOf(-1)
        private set

    private var sentences: List<String> = emptyList()
    private var cursor = 0
    private var locale: Locale = Locale.ENGLISH
    private var restoreAfter: Locale? = null
    private var token = 0

    init {
        tts = TextToSpeech(context.applicationContext) { status -> onInit(status) }
    }

    override fun onInit(status: Int) {
        ready = status == TextToSpeech.SUCCESS
        tts?.language = locale
        tts?.setPitch(pitchFor(gender))
        tts?.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(utteranceId: String?) = Unit

            override fun onDone(utteranceId: String?) {
                if (isCurrent(utteranceId)) advance()
            }

            @Deprecated("Deprecated in Java")
            override fun onError(utteranceId: String?) {
                if (isCurrent(utteranceId)) advance()
            }

            override fun onRangeStart(utteranceId: String?, start: Int, end: Int, frame: Int) {
                if (!isCurrent(utteranceId)) return
                wordStart = start
                wordEnd = end
            }
        })
    }

    private fun isCurrent(utteranceId: String?): Boolean =
        utteranceId != null && utteranceId.startsWith("sb-$token-")

    private fun advance() {
        if (!speaking || paused) return
        speakNext()
    }

    fun setLocale(value: Locale) {
        locale = value
        tts?.language = value
    }

    fun applyGender(value: String) {
        gender = value
        tts?.setPitch(pitchFor(value))
    }

    private fun pitchFor(value: String): Float = if (value == "female") 1.18f else 0.92f

    fun applyRate(value: Float) {
        rate = value.coerceIn(0.5f, 2.0f)
        tts?.setSpeechRate(rate)
        if (speaking && !paused) restartCurrent()
    }

    /** Splits a passage into the same sentence units [speak] uses. */
    fun splitSentences(text: String): List<String> {
        val parts = text
            .split(Regex("(?<=[.!?۔])\\s+|\\n+"))
            .map { it.trim() }
            .filter { it.length > 1 }
        return if (parts.isEmpty()) listOf(text) else parts
    }

    fun speak(text: String) = speakFrom(text, 0)

    /**
     * Speaks [text] with [target] for just this utterance, then drops back to the passage's
     * own locale. Used for tap-a-word meanings that switch between English and Urdu.
     */
    fun speakWithLocale(text: String, target: Locale) {
        if (!ready) return
        restoreAfter = locale
        tts?.language = target
        speak(text)
    }

    /** Starts reading [text] from sentence [startIndex] (used by per-sentence play buttons). */
    fun speakFrom(text: String, startIndex: Int) {
        if (!ready) return
        sentences = splitSentences(text)
        begin(startIndex.coerceIn(0, sentences.lastIndex.coerceAtLeast(0)))
    }

    private fun begin(startIndex: Int) {
        token++
        cursor = startIndex
        speaking = true
        paused = false
        tts?.setSpeechRate(rate)
        speakNext()
    }

    private fun speakNext() {
        val sentence = sentences.getOrNull(cursor) ?: run {
            stop()
            return
        }
        progress = ((cursor + 1) * 100) / sentences.size
        currentSentence = cursor
        wordStart = -1
        wordEnd = -1
        tts?.speak(sentence, TextToSpeech.QUEUE_FLUSH, null, "sb-$token-$cursor")
        cursor++
    }

    private fun restartCurrent() {
        val from = currentSentence.coerceAtLeast(0)
        begin(from)
    }

    fun togglePause() {
        if (!speaking) return
        if (paused) {
            paused = false
            restartCurrent()
        } else {
            paused = true
            tts?.stop()
        }
    }

    fun stop() {
        token++
        speaking = false
        paused = false
        cursor = 0
        progress = 0
        currentSentence = -1
        wordStart = -1
        wordEnd = -1
        tts?.stop()
        restoreAfter?.let {
            tts?.language = locale
            restoreAfter = null
        }
    }

    fun shutdown() {
        stop()
        tts?.stop()
        tts?.shutdown()
        tts = null
    }
}

@Composable
fun rememberTts(): TtsController {
    val context = LocalContext.current
    val controller = remember { TtsController(context) }
    DisposableEffect(Unit) {
        onDispose { controller.shutdown() }
    }
    return controller
}

@Composable
fun TtsControlBar(
    controller: TtsController,
    text: String,
    accent: Color = FacebookBlue,
    rtl: Boolean = false
) {
    if (!controller.ready) return
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(10.dp))
            .background(accent.copy(alpha = 0.06f))
            .border(1.dp, accent.copy(alpha = 0.25f), RoundedCornerShape(10.dp))
            .padding(10.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(
                onClick = {
                    if (controller.speaking) controller.stop() else controller.speak(text)
                },
                modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(accent)
            ) {
                Icon(
                    imageVector = if (controller.speaking) Icons.Default.Stop else Icons.Default.PlayArrow,
                    contentDescription = "Read aloud",
                    tint = Color.White,
                    modifier = Modifier.size(19.dp)
                )
            }
            if (controller.speaking) {
                IconButton(onClick = { controller.togglePause() }) {
                    Icon(
                        imageVector = if (controller.paused) Icons.Default.PlayArrow else Icons.Default.Pause,
                        contentDescription = "Pause",
                        tint = accent
                    )
                }
            }
            Spacer(modifier = Modifier.width(8.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = if (!controller.speaking) "Listen to this lesson"
                    else if (controller.paused) "Paused � tap play to continue"
                    else "Reading aloud� ${controller.progress}%",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = accent
                )
                if (controller.speaking) {
                    Spacer(modifier = Modifier.height(5.dp))
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(5.dp)
                            .clip(RoundedCornerShape(99.dp))
                            .background(Color.White)
                    ) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth(controller.progress / 100f)
                                .height(5.dp)
                                .clip(RoundedCornerShape(99.dp))
                                .background(accent)
                        )
                    }
                }
            }
            Spacer(modifier = Modifier.width(6.dp))
            listOf(0.75f, 1.0f, 1.5f).forEach { r ->
                val active = kotlin.math.abs(controller.rate - r) < 0.01f
                Box(
                    modifier = Modifier
                        .padding(start = 4.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (active) accent else Color.White)
                        .border(1.dp, if (active) accent else Color(0xFFCBD5E1), RoundedCornerShape(6.dp))
                        .clickable { controller.applyRate(r) }
                        .padding(horizontal = 7.dp, vertical = 5.dp)
                ) {
                    Text(
                        text = "${r}x",
                        fontSize = 10.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (active) Color.White else Color(0xFF475569)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(
                text = "Voice",
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = accent,
                modifier = Modifier.weight(1f)
            )
            listOf("male" to "?? Male", "female" to "?? Female").forEach { (id, label) ->
                val active = controller.gender == id
                Box(
                    modifier = Modifier
                        .padding(start = 6.dp)
                        .clip(RoundedCornerShape(6.dp))
                        .background(if (active) accent else Color.White)
                        .border(1.dp, if (active) accent else Color(0xFFCBD5E1), RoundedCornerShape(6.dp))
                        .clickable { controller.applyGender(id) }
                        .padding(horizontal = 10.dp, vertical = 5.dp)
                ) {
                    Text(
                        text = label,
                        fontSize = 10.5.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (active) Color.White else Color(0xFF475569)
                    )
                }
            }
        }
    }
}

// ============================================================ sentence reader

private fun isUrduScript(text: String): Boolean = text.any { it in '\u0600'..'\u06FF' }

private fun sentenceAnnotated(
    sentence: String,
    active: Boolean,
    wordStart: Int,
    wordEnd: Int,
    rtl: Boolean,
    accent: Color
): AnnotatedString = buildAnnotatedString {
    append(sentence)
    if (!active) return@buildAnnotatedString
    val start: Int
    val end: Int
    if (rtl || wordStart < 0 || wordEnd <= wordStart) {
        start = 0
        end = sentence.length
    } else {
        start = wordStart.coerceIn(0, sentence.length)
        end = wordEnd.coerceIn(start, sentence.length)
    }
    if (end > start) {
        addStyle(
            SpanStyle(
                background = accent.copy(alpha = 0.22f),
                color = accent,
                fontWeight = FontWeight.Bold
            ),
            start,
            end
        )
    }
}

/**
 * Renders a passage one sentence per line with its own play button, and paints the word
 * currently being spoken (reported by [TtsController] through `onRangeStart`).
 */
@Composable
fun ReadAloudText(
    text: String,
    tts: TtsController,
    accent: Color = FacebookBlue,
    fontSize: TextUnit = 14.sp,
    rtl: Boolean = false,
    modifier: Modifier = Modifier
) {
    val sentences = remember(text) { tts.splitSentences(text) }
    Column(modifier = modifier.fillMaxWidth(), verticalArrangement = Arrangement.spacedBy(3.dp)) {
        sentences.forEachIndexed { index, sentence ->
            val active = tts.speaking && !tts.paused && tts.currentSentence == index
            Row(verticalAlignment = Alignment.Top) {
                IconButton(
                    onClick = { if (active) tts.stop() else tts.speakFrom(text, index) },
                    modifier = Modifier.size(26.dp)
                ) {
                    Icon(
                        imageVector = if (active) Icons.Default.Stop else Icons.Default.PlayArrow,
                        contentDescription = if (active) "Stop reading" else "Read this sentence",
                        tint = if (active) accent else accent.copy(alpha = 0.65f),
                        modifier = Modifier.size(15.dp)
                    )
                }
                val body: @Composable () -> Unit = {
                    Text(
                        text = sentenceAnnotated(
                            sentence = sentence,
                            active = active,
                            wordStart = tts.wordStart,
                            wordEnd = tts.wordEnd,
                            rtl = rtl,
                            accent = accent
                        ),
                        fontSize = fontSize,
                        lineHeight = (fontSize.value * 1.62f).sp,
                        color = if (active) Color(0xFF0F172A) else Color(0xFF334155),
                        fontWeight = if (active) FontWeight.SemiBold else FontWeight.Normal
                    )
                }
                if (rtl) {
                    CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
                        Box(modifier = Modifier.weight(1f)) { body() }
                    }
                } else {
                    Box(modifier = Modifier.weight(1f)) { body() }
                }
            }
        }
    }
}

/**
 * Tap-to-lookup reader: touching a word pops up its meaning (English → Urdu glossary first,
 * textbook definition as the fallback) and speaks it aloud.
 */
@Composable
fun WordTapText(
    text: String,
    lookup: (String) -> String?,
    accent: Color = FacebookBlue,
    fontSize: TextUnit = 14.5.sp,
    tts: TtsController? = null,
    modifier: Modifier = Modifier
) {
    var layout by remember { mutableStateOf<TextLayoutResult?>(null) }
    var selection by remember { mutableStateOf<Pair<String, String>?>(null) }

    Column(modifier = modifier.fillMaxWidth()) {
        Text(
            text = text,
            fontSize = fontSize,
            lineHeight = (fontSize.value * 1.62f).sp,
            color = Color(0xFF334155),
            onTextLayout = { layout = it },
            modifier = Modifier
                .fillMaxWidth()
                .pointerInput(text) {
                    detectTapGestures { offset ->
                        val l = layout ?: return@detectTapGestures
                        if (offset.x < 0 || offset.y < 0 ||
                            offset.x > l.size.width || offset.y > l.size.height
                        ) return@detectTapGestures
                        val hit = l.getOffsetForPosition(offset)
                        val (s, e) = wordBounds(text, hit)
                        if (e <= s) return@detectTapGestures
                        val word = text.substring(s, e).trim(' ', '.', ',', ';', ':', '!', '?', '"', '(', ')')
                        val meaning = if (word.isBlank()) null else lookup(word)
                        selection = if (meaning == null) null else word to meaning
                        if (meaning != null && tts != null) {
                            speakMeaning(tts, meaning)
                        }
                    }
                }
        )

        val picked = selection
        if (picked != null) {
            Spacer(modifier = Modifier.height(8.dp))
            MeaningCard(
                word = picked.first,
                meaning = picked.second,
                accent = accent,
                tts = tts,
                onClose = { selection = null }
            )
        }
    }
}

/** Speaks a meaning with whichever voice matches its script. */
private fun speakMeaning(tts: TtsController, meaning: String) {
    val target = if (isUrduScript(meaning)) Locale("ur") else Locale.ENGLISH
    tts.speakWithLocale(meaning, target)
}

private fun wordBounds(text: String, offset: Int): Pair<Int, Int> {
    if (text.isEmpty()) return 0 to 0
    fun isWordChar(c: Char) = c.isLetterOrDigit() || c == '\'' || c == '-' || c == '’'
    var start = offset.coerceIn(0, text.lastIndex)
    var end = start
    while (start > 0 && isWordChar(text[start - 1])) start--
    while (end < text.length && isWordChar(text[end])) end++
    if (end <= start) {
        // landed on a separator — snap to the nearest word
        val nearest = text.indexOfFirst { isWordChar(it) }
        if (nearest < 0) return 0 to 0
        var s = nearest
        var e = s
        while (e < text.length && isWordChar(text[e])) e++
        return s to e
    }
    return start to end
}

@Composable
private fun MeaningCard(
    word: String,
    meaning: String,
    accent: Color,
    tts: TtsController?,
    onClose: () -> Unit
) {
    val rtl = isUrduScript(meaning)
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = accent.copy(alpha = 0.07f)),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(12.dp),
            verticalAlignment = Alignment.Top
        ) {
            if (tts != null) {
                IconButton(
                    onClick = { speakMeaning(tts, meaning) },
                    modifier = Modifier
                        .size(34.dp)
                        .clip(CircleShape)
                        .background(accent)
                ) {
                    Icon(
                        imageVector = Icons.Default.PlayArrow,
                        contentDescription = "Say the meaning",
                        tint = Color.White,
                        modifier = Modifier.size(18.dp)
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
            }
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = word,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = accent
                )
                Spacer(modifier = Modifier.height(3.dp))
                if (rtl) {
                    RtlText(text = meaning, fontSize = 14.sp, color = Color(0xFF1E293B))
                } else {
                    Text(text = meaning, fontSize = 13.sp, color = Color(0xFF334155), lineHeight = 19.sp)
                }
            }
            IconButton(onClick = onClose, modifier = Modifier.size(28.dp)) {
                Icon(
                    imageVector = Icons.Default.Close,
                    contentDescription = "Dismiss",
                    tint = Color(0xFF94A3B8),
                    modifier = Modifier.size(16.dp)
                )
            }
        }
    }
}

// ============================================================ misc helpers

@Composable
fun ParsedBodyText(
    text: String,
    fontSize: androidx.compose.ui.unit.TextUnit = 14.sp,
    color: Color = Color(0xFF334155),
    fontFamily: FontFamily = FontFamily.Default
) {
    // Content is authored as markdown-ish plain text (tables use pipes, bold uses **).
    val cleaned = remember(text) {
        text.replace("**", "")
            .replace(Regex("(?m)^\\|\\s*:?-{3,}:?\\s*(\\|\\s*:?-{3,}:?\\s*)*\\|?$"), "")
    }
    Text(
        text = cleaned,
        fontSize = fontSize,
        lineHeight = (fontSize.value * 1.55f).sp,
        color = color,
        fontFamily = fontFamily
    )
}

@Composable
fun ChapterHeaderBanner(
    title: String,
    meta: String,
    accent: Color,
    rightText: String? = null
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(Brush.horizontalGradient(listOf(accent, accent.copy(alpha = 0.78f))))
            .padding(16.dp)
    ) {
        if (rightText != null) {
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(99.dp))
                    .background(Color.White.copy(alpha = 0.2f))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(text = rightText, fontSize = 10.5.sp, fontWeight = FontWeight.Bold, color = Color.White)
            }
            Spacer(modifier = Modifier.height(9.dp))
        }
        Text(
            text = title,
            fontSize = 18.sp,
            fontWeight = FontWeight.ExtraBold,
            color = Color.White,
            lineHeight = 23.sp
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(text = meta, fontSize = 11.5.sp, color = Color.White.copy(alpha = 0.88f), lineHeight = 16.sp)
    }
}

@Composable
fun SearchField(
    value: String,
    onValueChange: (String) -> Unit,
    placeholder: String,
    accent: Color = FacebookBlue
) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = Modifier.fillMaxWidth(),
        singleLine = true,
        shape = RoundedCornerShape(10.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = accent,
            unfocusedBorderColor = Color(0xFFCBD5E1),
            focusedContainerColor = Color.White,
            unfocusedContainerColor = Color.White
        ),
        placeholder = { Text(placeholder, fontSize = 13.sp, color = Color(0xFF94A3B8)) }
    )
}

@Composable
fun StatusPill(text: String, background: Color, foreground: Color) {
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(5.dp))
            .background(background)
            .padding(horizontal = 7.dp, vertical = 3.dp)
    ) {
        Text(text = text, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = foreground)
    }
}

/** Right-to-left body text used for Urdu / Pashto passages. */
@Composable
fun RtlText(
    text: String,
    fontSize: androidx.compose.ui.unit.TextUnit = 15.sp,
    color: Color = Color(0xFF1E293B),
    bold: Boolean = false
) {
    CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
        Text(
            text = text,
            fontSize = fontSize,
            lineHeight = (fontSize.value * 1.7f).sp,
            color = color,
            fontWeight = if (bold) FontWeight.Bold else FontWeight.Normal
        )
    }
}

/** Horizontal pill selector (TuitionHub's `.slo-btn` / `.slo-tab-pill` rows). */
@Composable
fun PillSelector(
    options: List<Pair<String, String>>,
    selectedId: String?,
    onSelect: (String) -> Unit,
    accent: Color = FacebookBlue
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .horizontalScroll(rememberScrollState()),
        horizontalArrangement = Arrangement.spacedBy(7.dp)
    ) {
        options.forEach { (id, label) ->
            val selected = id == selectedId
            Row(
                modifier = Modifier
                    .clip(RoundedCornerShape(99.dp))
                    .background(if (selected) accent else Color.White)
                    .border(
                        1.dp,
                        if (selected) accent else Color(0xFFCBD5E1),
                        RoundedCornerShape(99.dp)
                    )
                    .clickable { onSelect(id) }
                    .padding(horizontal = 13.dp, vertical = 7.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = label,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (selected) Color.White else Color(0xFF475569)
                )
            }
        }
    }
}

/** A single labelled paragraph block used for theory / translation bodies. */
@Composable
fun ProseBlock(
    title: String,
    body: String,
    accent: Color = FacebookBlue,
    rtl: Boolean = false,
    background: Color = Color.White
) {
    if (body.isBlank()) return
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .border(1.dp, Color(0xFFE2E8F0), RoundedCornerShape(12.dp))
            .background(background)
            .padding(14.dp)
    ) {
        if (title.isNotBlank()) {
            Text(text = title, fontSize = 13.sp, fontWeight = FontWeight.Bold, color = accent)
            Spacer(modifier = Modifier.height(8.dp))
        }
        if (rtl) RtlText(text = body, fontSize = 14.5.sp)
        else ParsedBodyText(text = body, fontSize = 14.sp, color = Color(0xFF334155))
    }
}

@Composable
fun LazyScreenColumn(content: androidx.compose.foundation.lazy.LazyListScope.() -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
        content = content
    )
}

/** Wraps the shared chapter detail chrome (banner + tabs + scrollable body). */
@Composable
fun ChapterBody(
    tabs: List<SubjectTab>,
    selectedTab: String,
    onTabSelected: (String) -> Unit,
    accent: Color,
    modifier: Modifier = Modifier,
    header: (@Composable () -> Unit)? = null,
    body: @Composable () -> Unit
) {
    Column(modifier = modifier.fillMaxWidth().background(Color(0xFFF8FAFC))) {
        header?.invoke()
        PillTabBar(tabs = tabs, selectedId = selectedTab, onSelect = onTabSelected, accent = accent)
        Column(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            body()
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}
