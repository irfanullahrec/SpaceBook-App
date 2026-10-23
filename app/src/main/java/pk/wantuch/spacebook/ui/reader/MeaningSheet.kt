package pk.wantuch.spacebook.ui.reader

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.background
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.VolumeUp
import androidx.compose.material.icons.rounded.Stop
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.layout.Box
import pk.wantuch.spacebook.ui.theme.Sb
import pk.wantuch.spacebook.ui.web.MeaningRow
import pk.wantuch.spacebook.ui.web.MeaningState

/**
 * The meaning of a tapped sentence or a held word, over the page (the page itself does not change). Every line has its own speaker;
 * the speaker at the top reads the original. Voices are the phone's own, so reading works with no internet.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MeaningSheet(m: MeaningState, speaker: Speaker, onDismiss: () -> Unit, onHighlight: (() -> Unit)? = null) {
    var note by remember(m.id) { mutableStateOf<String?>(null) }
    var playing by remember(m.id) { mutableStateOf<String?>(null) }     // which line is being read: "src" or a language code
    fun say(text: String, lang: String, key: String) {
        if (playing == key && speaker.speaking) { speaker.stop(); playing = null; return }
        val ok = speaker.speak(text, lang)
        note = if (ok) null else "This phone has no ${Lang.name(lang)} voice. Install one in the phone's text-to-speech settings."
        playing = if (ok) key else null
    }

    ModalBottomSheet(
        onDismissRequest = { speaker.stop(); onDismiss() },
        sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
        containerColor = MaterialTheme.colorScheme.surface,
    ) {
        Column(
            Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .navigationBarsPadding()
                .padding(horizontal = 20.dp)
                .padding(bottom = 20.dp),
        ) {
            Surface(shape = RoundedCornerShape(50), color = MaterialTheme.colorScheme.primaryContainer) {
                Text(
                    if (m.isWord) "Word" else "Sentence",
                    Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                    style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onPrimaryContainer,
                )
            }
            Spacer(Modifier.height(10.dp))
            // the original, with the speaker that reads it
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.weight(1f)) {
                    Direction(m.src) {
                        Text(
                            m.text,
                            Modifier.fillMaxWidth(),
                            style = if (m.isWord) MaterialTheme.typography.headlineMedium else MaterialTheme.typography.titleLarge,
                            textAlign = TextAlign.Start,
                        )
                    }
                }
                Spacer(Modifier.width(8.dp))
                SpeakerButton(active = playing == "src" && speaker.speaking, big = true, label = "Read the ${if (m.isWord) "word" else "sentence"} aloud") { say(m.text, m.src, "src") }
            }
            Spacer(Modifier.height(12.dp))
            HorizontalDivider()
            m.rows.filter { it.lang != m.src }.forEach { row ->
                MeaningLine(row, active = playing == row.lang && speaker.speaking) { say(row.text, row.lang, row.lang) }
            }
            note?.let { Text(it, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall, modifier = Modifier.padding(top = 8.dp)) }
            if (onHighlight != null) androidx.compose.material3.OutlinedButton(onClick = onHighlight, modifier = Modifier.padding(top = 12.dp)) { Text("🖍 Keep as a highlight") }
            if (m.rows.any { it.approx }) {
                Text(
                    "≈ is a computer or word-by-word meaning. Check it with your teacher.",
                    style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 10.dp),
                )
            }
        }
    }
}

@Composable
private fun MeaningLine(row: MeaningRow, active: Boolean, onSpeak: () -> Unit) {
    Row(Modifier.fillMaxWidth().padding(top = 14.dp), verticalAlignment = Alignment.Top) {
        Column(Modifier.weight(1f)) {
            Text(Lang.label(row.lang), style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.primary)
            Direction(row.lang) {
                when {
                    row.pending -> Row(Modifier.padding(top = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                        CircularProgressIndicator(Modifier.size(18.dp), strokeWidth = 2.dp)
                        Spacer(Modifier.width(10.dp))
                        Text("Looking it up…", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    row.text.isBlank() -> Text(
                        "No stored meaning yet.", style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 4.dp),
                    )
                    else -> Text(
                        (if (row.approx) "≈ " else "") + row.text,
                        style = MaterialTheme.typography.titleMedium.copy(lineHeight = 30.sp), textAlign = TextAlign.Start,
                        modifier = Modifier.padding(top = 2.dp).fillMaxWidth(),
                    )
                }
            }
        }
        if (!row.pending && row.text.isNotBlank()) {
            Spacer(Modifier.width(8.dp))
            SpeakerButton(active = active, big = false, label = "Read the ${Lang.name(row.lang)} line aloud", onClick = onSpeak)
        }
    }
}

@Composable
private fun SpeakerButton(active: Boolean, big: Boolean, label: String, onClick: () -> Unit) {
    Surface(
        shape = CircleShape,
        color = if (active) Sb.Pink else MaterialTheme.colorScheme.primaryContainer,
        modifier = Modifier.size(if (big) 54.dp else 46.dp).semantics { contentDescription = label },
    ) {
        IconButton(onClick = onClick) {
            Icon(
                if (active) Icons.Rounded.Stop else Icons.AutoMirrored.Rounded.VolumeUp, null,
                tint = if (active) androidx.compose.ui.graphics.Color.White else MaterialTheme.colorScheme.onPrimaryContainer,
                modifier = Modifier.size(if (big) 28.dp else 24.dp),
            )
        }
    }
}

/** Lays [content] out right-to-left for Urdu, Pashto and Arabic, so the text starts at the right edge like the book. */
@Composable
private fun Direction(lang: String, content: @Composable () -> Unit) {
    CompositionLocalProvider(LocalLayoutDirection provides if (Lang.rtl(lang)) LayoutDirection.Rtl else LayoutDirection.Ltr) { content() }
}
