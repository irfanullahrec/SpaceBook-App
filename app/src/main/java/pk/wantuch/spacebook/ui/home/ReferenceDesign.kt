package pk.wantuch.spacebook.ui.home

import androidx.compose.foundation.BorderStroke
import pk.wantuch.spacebook.R
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.layout.ContentScale
import androidx.compose.foundation.Image
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.MenuBook
import androidx.compose.material.icons.rounded.Search
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.data.prep.PrepSnapshot

private val Blue = Color(0xFF0785FF)
private val Green = Color(0xFF079F51)
private val Navy = Color(0xFF0B2056)

@Composable
fun ReferenceBrandHeader(name: String, coins: Int, onSearch: () -> Unit, onProfile: () -> Unit) {
    Surface(color = Color.Transparent) {
        Row(Modifier.fillMaxWidth().statusBarsPadding().padding(horizontal = 14.dp, vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
            Image(painterResource(R.drawable.sb_logo), "SpaceBook", Modifier.width(128.dp), contentScale = ContentScale.FillWidth)
            Surface(
                modifier = Modifier.weight(1f).padding(horizontal = 10.dp).height(40.dp).clickable(onClick = onSearch), shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.surface, border = BorderStroke(1.dp, Color(0xFFCFE0F5)),
            ) {
                Row(Modifier.padding(horizontal = 10.dp), verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Rounded.Search, "Search books", tint = Navy, modifier = Modifier.size(20.dp))
                    Text("Search…", color = Color(0xFF6B7C9C), fontSize = 13.sp, modifier = Modifier.padding(start = 6.dp))
                }
            }
            Surface(shape = RoundedCornerShape(20.dp), color = Color(0xFFFFF9E8), border = BorderStroke(1.dp, Color(0xFFF3D376))) {
                Text("◉ $coins", color = Color(0xFF946400), fontWeight = FontWeight.Bold, fontSize = 12.sp, modifier = Modifier.padding(horizontal = 9.dp, vertical = 5.dp))
            }
            Surface(shape = RoundedCornerShape(30.dp), color = Blue, modifier = Modifier.padding(start = 8.dp).size(34.dp).clickable(onClick = onProfile)) {
                Box(contentAlignment = Alignment.Center) { Text(name.firstOrNull()?.uppercase() ?: "S", color = Color.White, fontWeight = FontWeight.Bold) }
            }
        }
    }
}

@Composable
private fun ReferenceCard(title: String, modifier: Modifier = Modifier, content: @Composable ColumnScope.() -> Unit) {
    Surface(modifier = modifier, shape = RoundedCornerShape(14.dp), color = MaterialTheme.colorScheme.surface,
        border = BorderStroke(1.dp, Color(0xFFD7E6F8)), shadowElevation = 1.dp) {
        Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(7.dp)) {
            Text(title, style = MaterialTheme.typography.titleSmall, color = MaterialTheme.colorScheme.onSurface, fontWeight = FontWeight.Bold)
            content()
        }
    }
}

/** The reference's study-bank composition, using the same real progress snapshot as the existing cards. */
@Composable
internal fun ReferenceStudyBank(prep: PrepSnapshot) {
    val langs = listOf(Triple("en", "English", Blue), Triple("ur", "Urdu", Green), Triple("ps", "Pashto", Color(0xFF8A22EF)), Triple("ar", "Arabic", Color(0xFFEF8300)))
    val total = prep.tests.totals
    Column(Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 10.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Column(Modifier.weight(1f)) {
                Text("My Study Bank", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.ExtraBold)
                Text("Track what you know and what is next.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Text("This Month", color = Blue, fontSize = 10.sp, modifier = Modifier.background(Color(0xFFF1F7FF), RoundedCornerShape(5.dp)).padding(7.dp))
        }
        ReferenceCard("Vocabulary Progress", Modifier.fillMaxWidth()) {
            Text("Words you know in each language", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            langs.chunked(2).forEach { pair ->
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    pair.forEach { (key, title, color) ->
                        val marks = prep.words.byLang[key]
                        val known = (marks?.learnt ?: 0) + (marks?.knew ?: 0)
                        Surface(modifier = Modifier.weight(1f), shape = RoundedCornerShape(9.dp), color = color.copy(alpha = .06f), border = BorderStroke(1.dp, color.copy(alpha = .15f))) {
                            Column(Modifier.padding(10.dp)) {
                                Text(title, color = color, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                                Text(fmt(known), color = MaterialTheme.colorScheme.onSurface, fontSize = 25.sp, fontWeight = FontWeight.ExtraBold)
                                Text("Known words", fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                LinearProgressIndicator(progress = { if (prep.words.total > 0) known.toFloat() / prep.words.total else 0f }, color = Green, trackColor = Color(0xFFDCE5F1), modifier = Modifier.fillMaxWidth().padding(vertical = 6.dp).height(5.dp))
                                Text("${marks?.learnt ?: 0} learnt · ${marks?.knew ?: 0} already knew", fontSize = 9.sp, color = color)
                            }
                        }
                    }
                }
            }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.height(IntrinsicSize.Min)) {
            ReferenceCard("Questions Practice", Modifier.weight(1f).fillMaxHeight()) {
                Text("${fmt(total.questions)} MCQs attempted", fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Box(Modifier.fillMaxWidth().height(94.dp), contentAlignment = Alignment.Center) {
                    Canvas(Modifier.size(86.dp)) {
                        drawArc(Color(0xFFE0EBF5), -90f, 360f, false, style = Stroke(8.dp.toPx()))
                        drawArc(Green, -90f, total.accuracy * 3.6f, false, style = Stroke(8.dp.toPx(), cap = StrokeCap.Round))
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("${total.accuracy}%", fontSize = 23.sp, fontWeight = FontWeight.ExtraBold)
                        Text("Accuracy", fontSize = 10.sp)
                    }
                }
            }
            ReferenceCard("Study Time", Modifier.weight(1f).fillMaxHeight()) {
                Text("${total.minutes / 60}h ${total.minutes % 60}m", fontSize = 25.sp, fontWeight = FontWeight.ExtraBold)
                Text("Recorded test study", fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                val values = prep.tests.week.takeLast(7).let { if (it.isEmpty()) List(7) { 0 } else it }
                Canvas(Modifier.fillMaxWidth().height(63.dp).padding(top = 4.dp)) {
                    val max = values.maxOrNull()?.coerceAtLeast(1)?.toFloat() ?: 1f
                    val width = size.width / values.size
                    values.forEachIndexed { i, value ->
                        val height = (value / max * size.height).coerceAtLeast(2.dp.toPx())
                        drawRoundRect(Green.copy(alpha = .65f), Offset(i * width + 2.dp.toPx(), size.height - height), Size(width - 4.dp.toPx(), height), CornerRadius(3.dp.toPx()))
                    }
                }
                Text("Last 7 days", fontSize = 9.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
        ReferenceCard("Your Learning Progress", Modifier.fillMaxWidth()) {
            val average = if (prep.plans.isEmpty()) 0 else prep.plans.sumOf { it.pct } / prep.plans.size
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text("${prep.tests.tests.size} test preparations · ${prep.plans.size} study plans", fontSize = 11.sp)
                Text("$average%", color = Green, fontWeight = FontWeight.Bold, fontSize = 13.sp)
            }
            LinearProgressIndicator(progress = { average / 100f }, color = Green, trackColor = Color(0xFFE0EBF5), modifier = Modifier.fillMaxWidth().height(6.dp))
        }
    }
}
