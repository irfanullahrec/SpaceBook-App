package pk.wantuch.spacebook.ui.practice

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
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
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.KeyboardArrowRight
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.R

private val Navy = Color(0xFF0B2056)
private val Blue = Color(0xFF0785FF)
private val Green = Color(0xFF079F51)
private val Line = Color(0xFFD7E6F8)

/** What the Practice tab offers: each opens the website's own page inside the app (same tests, papers, games, coins and plans as on the web). */
private data class Tool(val page: String, val title: String, val line: String, val icon: Int, val chip: String, val tint: Color)

private val tiles = listOf(
    Tool("papers", "Papers", "Practice past papers and model papers by subject and year.", R.drawable.pr_papers, "Solved & Unsolved Papers", Blue),
    Tool("create-test", "Create Test", "Make your own test with MCQs, short or long questions.", R.drawable.pr_create, "Custom Practice, Your Way", Green),
    Tool("assistant", "Ask SpaceBook", "Get instant answers, explanations and step-by-step solutions.", R.drawable.pr_ask, "Your AI Study Assistant", Color(0xFF7A3FE0)),
    Tool("games", "Games", "Play and learn with fun quizzes and subject challenges.", R.drawable.pr_games, "Make Learning Fun", Color(0xFFE8700F)),
)

/** Practice tab (design 14): Start Practice hero, four tools and the study plan, all on one scrolling screen. */
@Composable
fun PracticeScreen(onOpen: (page: String, title: String) -> Unit) {
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 14.dp).padding(top = 8.dp, bottom = 20.dp)) {
        Image(painterResource(R.drawable.sb_logo), "SpaceBook", Modifier.width(150.dp), contentScale = ContentScale.FillWidth)
        Text("Practice Hub", fontSize = 34.sp, fontWeight = FontWeight.ExtraBold, color = Navy, letterSpacing = (-1).sp, modifier = Modifier.padding(top = 6.dp))
        Text("Build your skills and get ready for success!", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(bottom = 12.dp))
        Hero { onOpen("tests-preps", "Tests Preps") }
        Spacer(Modifier.height(12.dp))
        tiles.chunked(2).forEach { row ->
            Row(Modifier.fillMaxWidth().padding(bottom = 10.dp), horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                row.forEach { t -> Tile(t, Modifier.weight(1f)) { onOpen(t.page, t.title) } }
            }
        }
        PlanRow { onOpen("study-plan", "Study Plan") }
    }
}

@Composable
private fun Hero(onClick: () -> Unit) {
    Surface(
        Modifier.fillMaxWidth().clickable(role = Role.Button, onClick = onClick), shape = RoundedCornerShape(22.dp),
        color = Color.Transparent, border = BorderStroke(1.dp, Line),
    ) {
        Column(Modifier.background(Brush.linearGradient(listOf(Color(0xFFDDEEFF), Color(0xFFF4FAFF)))).padding(12.dp)) {
            Row(verticalAlignment = Alignment.Top) {
                Image(painterResource(R.drawable.pr_hero_left), null, Modifier.width(92.dp), contentScale = ContentScale.FillWidth)
                Column(Modifier.weight(1f).padding(start = 6.dp)) {
                    Text("TESTS PREP", color = Blue, fontWeight = FontWeight.ExtraBold, fontSize = 12.sp, letterSpacing = 1.sp)
                    Text(buildAnnotatedString { withStyle(SpanStyle(color = Navy)) { append("Start ") }; withStyle(SpanStyle(color = Green)) { append("Practice") } },
                        fontSize = 26.sp, fontWeight = FontWeight.ExtraBold, letterSpacing = (-0.5).sp)
                    Text("Practice MCQs, short questions and long questions from all subjects.", fontSize = 12.sp, lineHeight = 16.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                Image(painterResource(R.drawable.pr_hero_right), null, Modifier.width(62.dp), contentScale = ContentScale.FillWidth)
            }
            Spacer(Modifier.height(8.dp))
            Row(
                Modifier.fillMaxWidth(0.78f).height(46.dp).clip(RoundedCornerShape(16.dp))
                    .background(Brush.verticalGradient(listOf(Color(0xFF14A85F), Color(0xFF0A8A47)))).padding(horizontal = 10.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Box(Modifier.size(26.dp).clip(CircleShape).background(Color.White), contentAlignment = Alignment.Center) { Text("▶", color = Green, fontSize = 11.sp) }
                Text("Start Practice", color = Color.White, fontWeight = FontWeight.ExtraBold, fontSize = 17.sp, modifier = Modifier.weight(1f).padding(start = 12.dp))
                Icon(Icons.AutoMirrored.Rounded.KeyboardArrowRight, null, tint = Color.White)
            }
        }
    }
}

@Composable
private fun Tile(t: Tool, modifier: Modifier, onClick: () -> Unit) {
    Surface(
        modifier.clickable(role = Role.Button, onClick = onClick), shape = RoundedCornerShape(18.dp), color = MaterialTheme.colorScheme.surface,
        border = BorderStroke(1.dp, Line), shadowElevation = 1.dp,
    ) {
        Column(Modifier.padding(10.dp)) {
            Row(verticalAlignment = Alignment.Top) {
                Image(painterResource(t.icon), null, Modifier.size(52.dp))
                Column(Modifier.weight(1f).padding(start = 8.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(t.title, fontSize = 16.sp, fontWeight = FontWeight.ExtraBold, color = Navy, modifier = Modifier.weight(1f))
                        Icon(Icons.AutoMirrored.Rounded.KeyboardArrowRight, null, Modifier.size(18.dp), tint = Navy)
                    }
                    Text(t.line, fontSize = 11.sp, lineHeight = 14.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
            Spacer(Modifier.height(8.dp))
            Text(
                t.chip, color = t.tint, fontWeight = FontWeight.SemiBold, fontSize = 12.sp,
                modifier = Modifier.fillMaxWidth().clip(RoundedCornerShape(10.dp)).background(t.tint.copy(alpha = 0.10f)).padding(horizontal = 10.dp, vertical = 8.dp),
            )
        }
    }
}

@Composable
private fun PlanRow(onClick: () -> Unit) {
    Surface(
        Modifier.fillMaxWidth().clickable(role = Role.Button, onClick = onClick), shape = RoundedCornerShape(18.dp), color = MaterialTheme.colorScheme.surface,
        border = BorderStroke(1.dp, Line), shadowElevation = 1.dp,
    ) {
        Row(Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
            Image(painterResource(R.drawable.pr_plan), null, Modifier.size(58.dp))
            Column(Modifier.weight(1f).padding(horizontal = 10.dp)) {
                Text("My Study Plan", fontSize = 18.sp, fontWeight = FontWeight.ExtraBold, color = Navy)
                Text("Follow your plan, stay consistent and achieve your goals.", fontSize = 12.sp, lineHeight = 16.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Row(Modifier.clip(RoundedCornerShape(12.dp)).background(Color(0xFFE3F0FF)).padding(horizontal = 12.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                Text("View Plan", color = Blue, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                Icon(Icons.AutoMirrored.Rounded.KeyboardArrowRight, null, Modifier.size(16.dp), tint = Blue)
            }
        }
    }
}
