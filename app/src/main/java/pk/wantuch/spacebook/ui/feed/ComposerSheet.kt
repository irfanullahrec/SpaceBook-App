@file:OptIn(androidx.compose.foundation.layout.ExperimentalLayoutApi::class)

package pk.wantuch.spacebook.ui.feed

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.ArrowDropDown
import androidx.compose.material.icons.rounded.Close
import androidx.compose.material.icons.rounded.Public
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.style.TextDirection
import androidx.compose.ui.unit.dp
import kotlinx.serialization.json.JsonObject
import pk.wantuch.spacebook.data.feed.FeedCard
import pk.wantuch.spacebook.data.feed.FeedCardBuilder
import pk.wantuch.spacebook.data.prep.PlanDto
import pk.wantuch.spacebook.data.prep.PrepSnapshot
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.FeedAuthorDto
import pk.wantuch.spacebook.ui.home.planLabel
import pk.wantuch.spacebook.ui.theme.Sb

/** What a student can post. [id] is the `kind` the server knows. */
enum class ComposeKind(val id: String, val emoji: String, val label: String, val hint: String) {
    TEXT("text", "✏️", "Post", "What's on your mind?"),
    QUESTION("question", "❓", "Question", "Ask your question…"),
    STATS("stats", "📊", "My Stats", "Say something about your stats (optional)"),
    PROGRESS("progress", "🎯", "Today", "Say something about your day (optional)"),
    PLAN("plan", "📅", "Study plan", "Say something about your plan (optional)"),
}

internal const val POST_MAX = 1500

/**
 * "Create post": the words, and for a My Stats, Today or Study plan post the card made from the student's own records. Nothing on a card is
 * typed in, so nobody can post made-up scores. The sheet stays open, with the reason, when the server refuses the post.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ComposerSheet(
    me: FeedAuthorDto,
    startKind: ComposeKind,
    prep: PrepSnapshot?,
    coins: Int,
    catalog: Catalog?,
    classId: String,
    onDismiss: () -> Unit,
    onPost: (kind: String, body: String, card: JsonObject?, done: (String?) -> Unit) -> Unit,
) {
    var kind by remember { mutableStateOf(startKind) }
    var text by remember { mutableStateOf("") }
    var planId by remember { mutableStateOf(prep?.plans?.firstOrNull()?.id.orEmpty()) }
    var cls by remember { mutableStateOf(catalog?.cls(classId)?.id.orEmpty()) }
    var subject by remember { mutableStateOf("") }
    var busy by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }

    val today = remember(prep) { prep?.today.orEmpty() }
    val plan: PlanDto? = prep?.plans?.firstOrNull { it.id == planId }
    val card: JsonObject? = when (kind) {
        ComposeKind.STATS -> FeedCardBuilder.stats(prep)
        ComposeKind.PROGRESS -> FeedCardBuilder.progress(prep, coins, today)
        ComposeKind.PLAN -> plan?.let { FeedCardBuilder.plan(it, planLabel(it, catalog), planSubjects(it, catalog)) }
        ComposeKind.QUESTION -> FeedCardBuilder.question(catalog?.subject(subject)?.name.orEmpty(), catalog?.cls(cls)?.name.orEmpty())
        ComposeKind.TEXT -> null
    }
    val needsCard = kind == ComposeKind.STATS || kind == ComposeKind.PROGRESS || kind == ComposeKind.PLAN
    val canPost = !busy && text.length <= POST_MAX && (if (needsCard) card != null else text.trim().length >= 2)

    ModalBottomSheet(
        onDismissRequest = { if (!busy) onDismiss() },
        sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
        containerColor = MaterialTheme.colorScheme.surface,
    ) {
        Column(Modifier.fillMaxHeight(0.94f).imePadding()) {
            Row(Modifier.fillMaxWidth().padding(start = 4.dp, end = 12.dp), verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = { if (!busy) onDismiss() }) { Icon(Icons.Rounded.Close, "Close without posting") }
                Text("Create post", style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
                Button(
                    enabled = canPost,
                    onClick = {
                        busy = true; error = null
                        onPost(kind.id, text.trim(), card) { err -> busy = false; if (err == null) onDismiss() else error = err }
                    },
                ) {
                    if (busy) CircularProgressIndicator(Modifier.size(18.dp), strokeWidth = 2.dp, color = Color.White) else Text("Post")
                }
            }
            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = .35f))
            Column(Modifier.weight(1f).verticalScroll(rememberScrollState())) {
                Row(Modifier.padding(horizontal = 16.dp, vertical = 12.dp), verticalAlignment = Alignment.CenterVertically) {
                    FeedAvatar(me, 44.dp)
                    Spacer(Modifier.width(10.dp))
                    Column {
                        Text(me.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold)
                        Row(
                            Modifier.padding(top = 2.dp).clip(RoundedCornerShape(6.dp)).background(MaterialTheme.colorScheme.surfaceVariant).padding(horizontal = 8.dp, vertical = 2.dp),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Icon(Icons.Rounded.Public, null, modifier = Modifier.size(13.dp), tint = MaterialTheme.colorScheme.onSurfaceVariant)
                            Text(" Everyone on SpaceBook", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
                TextField(
                    value = text, onValueChange = { text = it; error = null },
                    placeholder = { Text(kind.hint, style = MaterialTheme.typography.titleMedium) },
                    modifier = Modifier.fillMaxWidth().heightIn(min = 120.dp),
                    textStyle = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Normal, textDirection = TextDirection.Content),
                    colors = TextFieldDefaults.colors(
                        focusedContainerColor = Color.Transparent, unfocusedContainerColor = Color.Transparent,
                        focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent,
                    ),
                    keyboardOptions = KeyboardOptions(capitalization = KeyboardCapitalization.Sentences),
                )
                if (text.length > POST_MAX - 300) {
                    Text("${text.length} / $POST_MAX", style = MaterialTheme.typography.labelMedium, color = if (text.length > POST_MAX) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(horizontal = 16.dp))
                }
                error?.let { Text(it, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)) }

                // what to add to the post
                Text("Add to your post", style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(start = 16.dp, top = 8.dp))
                Row(Modifier.horizontalScroll(rememberScrollState()).padding(horizontal = 12.dp, vertical = 6.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    ComposeKind.entries.forEach { k ->
                        FilterChip(selected = kind == k, onClick = { kind = k; error = null }, label = { Text("${k.emoji} ${k.label}") })
                    }
                }

                when (kind) {
                    ComposeKind.TEXT -> Text(
                        "Share something you learnt or a tip for exam day. Please do not put phone numbers, e-mail addresses or links in a post.",
                        style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                    )
                    ComposeKind.QUESTION -> QuestionPicker(catalog, cls, subject, { cls = it; subject = "" }, { subject = it })
                    ComposeKind.PLAN -> if (prep?.plans.isNullOrEmpty()) {
                        EmptyHint("You have no study plan yet. Make one in the Plan tab, then share it here.")
                    } else {
                        Row(Modifier.horizontalScroll(rememberScrollState()).padding(horizontal = 12.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            prep?.plans?.forEach { p -> FilterChip(selected = p.id == planId, onClick = { planId = p.id }, label = { Text(p.name.ifBlank { "Study plan" }) }) }
                        }
                    }
                    ComposeKind.STATS -> if (card == null) EmptyHint("There is nothing to show yet. Practise a test or study a plan first, then share your stats.")
                    ComposeKind.PROGRESS -> if (card == null) EmptyHint("You have not studied today yet. Answer some questions or finish a task of your plan, then share your day.")
                }
                if (card != null && kind != ComposeKind.QUESTION) {
                    FeedCard.parse(kind.id, card)?.let { FeedCardView(it) }
                }
                Spacer(Modifier.size(24.dp))
            }
        }
    }
}

@Composable
private fun EmptyHint(text: String) {
    Text(text, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp))
}

/** Class and subject of a question, both optional. */
@Composable
private fun QuestionPicker(catalog: Catalog?, cls: String, subject: String, onClass: (String) -> Unit, onSubject: (String) -> Unit) {
    val classes = catalog?.classes.orEmpty()
    val subjects = catalog?.cls(cls)?.subjects.orEmpty()
    Column(Modifier.padding(horizontal = 16.dp, vertical = 8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("Tell readers where this question comes from (optional)", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Picker("Class", catalog?.cls(cls)?.name.orEmpty(), classes.map { it.id to it.name }, onClass)
            if (subjects.isNotEmpty()) Picker("Subject", catalog?.subject(subject)?.name.orEmpty(), subjects.map { it.id to it.name }, onSubject)
        }
    }
}

@Composable
private fun Picker(label: String, current: String, options: List<Pair<String, String>>, onPick: (String) -> Unit) {
    var open by remember { mutableStateOf(false) }
    Box {
        OutlinedButton(onClick = { open = true }) {
            Text(current.ifBlank { label })
            Icon(Icons.Rounded.ArrowDropDown, null)
        }
        DropdownMenu(expanded = open, onDismissRequest = { open = false }, modifier = Modifier.heightIn(max = 360.dp)) {
            DropdownMenuItem(text = { Text("Any $label") }, onClick = { open = false; onPick("") })
            options.forEach { (id, name) -> DropdownMenuItem(text = { Text(name) }, onClick = { open = false; onPick(id) }) }
        }
    }
}

/** the names of a plan's subjects, from the catalog; a subject the catalog does not know is left out */
internal fun planSubjects(p: PlanDto, catalog: Catalog?): List<String> = p.subjects.mapNotNull { catalog?.subject(it.id)?.name }.distinct()

// ---------------------------------------------------------------------------- share, report, delete

/** Share a post: into the student's own feed (with a line of their own, if they want) or out of the app through the phone's share sheet. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ShareSheet(
    me: FeedAuthorDto,
    preview: String,
    onDismiss: () -> Unit,
    onShareNow: (String, (String?) -> Unit) -> Unit,
    onSendOut: () -> Unit,
) {
    var text by remember { mutableStateOf("") }
    var busy by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf<String?>(null) }
    ModalBottomSheet(onDismissRequest = { if (!busy) onDismiss() }, sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true), containerColor = MaterialTheme.colorScheme.surface) {
        Column(Modifier.fillMaxWidth().imePadding().navigationBarsPadding().padding(horizontal = 16.dp).padding(bottom = 16.dp)) {
            Text("Share", style = MaterialTheme.typography.titleMedium)
            Row(Modifier.padding(vertical = 12.dp), verticalAlignment = Alignment.CenterVertically) {
                FeedAvatar(me, 40.dp)
                Spacer(Modifier.width(10.dp))
                Text(me.name, style = MaterialTheme.typography.titleSmall)
            }
            TextField(
                value = text, onValueChange = { text = it.take(500); error = null },
                placeholder = { Text("Say something about this…") }, modifier = Modifier.fillMaxWidth(),
                colors = TextFieldDefaults.colors(focusedContainerColor = MaterialTheme.colorScheme.surfaceVariant, unfocusedContainerColor = MaterialTheme.colorScheme.surfaceVariant, focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent),
                shape = RoundedCornerShape(14.dp), minLines = 2,
            )
            if (preview.isNotBlank()) Text(preview, maxLines = 2, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(top = 8.dp), overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis)
            error?.let { Text(it, color = MaterialTheme.colorScheme.error, modifier = Modifier.padding(top = 6.dp)) }
            Button(
                onClick = { busy = true; error = null; onShareNow(text.trim()) { err -> busy = false; if (err == null) onDismiss() else error = err } },
                enabled = !busy, modifier = Modifier.fillMaxWidth().padding(top = 12.dp),
                colors = androidx.compose.material3.ButtonDefaults.buttonColors(containerColor = Sb.Violet),
            ) { if (busy) CircularProgressIndicator(Modifier.size(18.dp), strokeWidth = 2.dp, color = Color.White) else Text("Share now") }
            OutlinedButton(onClick = { onSendOut(); onDismiss() }, modifier = Modifier.fillMaxWidth().padding(top = 8.dp)) { Text("Send in another app…") }
        }
    }
}

/** The reasons a student can give when reporting a post or a comment. The server knows these five words. */
val REPORT_REASONS = listOf(
    "unkind" to "Unkind or bullying",
    "personal" to "Shares someone's personal details",
    "spam" to "Spam or advertising",
    "wrong" to "Wrong or misleading",
    "other" to "Something else",
)

@Composable
fun ReportDialog(what: String, onDismiss: () -> Unit, onReport: (String) -> Unit) {
    var reason by remember { mutableStateOf("") }
    androidx.compose.material3.AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Report this $what") },
        text = {
            Column {
                Text("Choose what is wrong. After a few reports a $what is hidden until a person from SpaceBook has looked at it.", style = MaterialTheme.typography.bodySmall)
                Spacer(Modifier.size(8.dp))
                REPORT_REASONS.forEach { (id, label) ->
                    Row(Modifier.fillMaxWidth().clickable { reason = id }.padding(vertical = 2.dp), verticalAlignment = Alignment.CenterVertically) {
                        androidx.compose.material3.RadioButton(selected = reason == id, onClick = { reason = id })
                        Text(label)
                    }
                }
            }
        },
        confirmButton = { TextButton(enabled = reason.isNotEmpty(), onClick = { onReport(reason) }) { Text("Report") } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}

@Composable
fun ConfirmDialog(title: String, text: String, action: String, onDismiss: () -> Unit, onConfirm: () -> Unit) {
    androidx.compose.material3.AlertDialog(
        onDismissRequest = onDismiss, title = { Text(title) }, text = { Text(text) },
        confirmButton = { TextButton(onClick = onConfirm) { Text(action, color = MaterialTheme.colorScheme.error) } },
        dismissButton = { TextButton(onClick = onDismiss) { Text("Cancel") } },
    )
}
