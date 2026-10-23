package pk.wantuch.spacebook.ui.components

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.State
import androidx.compose.runtime.getValue
import androidx.compose.runtime.produceState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import kotlin.math.exp

/**
 * How far along a page of the website is, as a number the student can watch, so a slow phone never looks hung.
 * The first 60 % is real (the WebView reports how much of the page it has loaded); the rest is the page drawing the chapter, which the WebView
 * cannot count, so it is an estimate that slows down as it nears the end and never shows 100 before the page really is open.
 */
object LoadProgress {
    fun percent(pageProgress: Int, ready: Boolean, msSinceReady: Long): Int {
        if (!ready) return (pageProgress.coerceIn(0, 100) * 0.6).toInt()
        val t = msSinceReady.coerceAtLeast(0) / 1500.0
        return (60 + 38 * (1 - exp(-t))).toInt().coerceIn(60, 98)
    }
}

/** A percent that follows [LoadProgress] while [active]; read it in a composable to redraw about ten times a second. */
@Composable
fun rememberLoadPercent(active: Boolean, pageProgress: Int, ready: Boolean): State<Int> =
    produceState(0, active, ready) {
        val from = System.currentTimeMillis()
        while (active) {
            value = LoadProgress.percent(pageProgress, ready, System.currentTimeMillis() - from)
            delay(100)
        }
    }

/** A percent for work that cannot be counted: it climbs quickly, slows down near the end and stops at 98 until the work is done. */
@Composable
fun rememberTimedPercent(active: Boolean, seconds: Double = 2.0): State<Int> =
    produceState(0, active) {
        val from = System.currentTimeMillis()
        while (active) {
            value = (98 * (1 - exp(-(System.currentTimeMillis() - from) / 1000.0 / seconds))).toInt().coerceIn(0, 98)
            delay(100)
        }
    }

/** The loading screen: what is being opened, a bar and its percent. */
@Composable
fun LoadingPanel(label: String, percent: Int, modifier: Modifier = Modifier, emoji: String = "📖") {
    Column(
        modifier.padding(24.dp).widthIn(max = 360.dp),
        horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Text(emoji, style = MaterialTheme.typography.displaySmall)
        Text(label, style = MaterialTheme.typography.titleMedium)
        LinearProgressIndicator(
            progress = { percent.coerceIn(0, 100) / 100f },
            modifier = Modifier.fillMaxWidth().semantics { contentDescription = "$label $percent percent" },
        )
        Text("$percent%", style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
    }
}
