package pk.wantuch.spacebook.ui.feed

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.Send
import androidx.compose.material.icons.rounded.Close
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material.icons.rounded.Flag
import androidx.compose.material.icons.rounded.MoreHoriz
import androidx.compose.material.icons.rounded.ThumbUp
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.rememberModalBottomSheetState
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
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardCapitalization
import androidx.compose.ui.text.style.TextDirection
import androidx.compose.ui.unit.dp
import pk.wantuch.spacebook.data.remote.FeedAuthorDto
import pk.wantuch.spacebook.data.remote.FeedCommentDto
import pk.wantuch.spacebook.ui.theme.Sb

/** The comments of one post in a sheet that comes up from the bottom, with the box to write one at its foot. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CommentsSheet(
    state: CommentsState,
    me: FeedAuthorDto,
    now: Long,
    onDismiss: () -> Unit,
    onSend: (String, () -> Unit) -> Unit,
    onReply: (FeedCommentDto?) -> Unit,
    onLike: (FeedCommentDto) -> Unit,
    onDelete: (FeedCommentDto) -> Unit,
    onReport: (FeedCommentDto) -> Unit,
    onMore: () -> Unit,
) {
    val post = state.post ?: return
    var text by remember(post.id) { mutableStateOf("") }
    val list = rememberLazyListState()
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
        containerColor = MaterialTheme.colorScheme.surface,
    ) {
        Column(Modifier.fillMaxHeight(0.92f).imePadding()) {
            Row(Modifier.fillMaxWidth().padding(start = 16.dp, end = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                Text(if (post.comments == 0) "Comments" else countText(post.comments, "comment"), style = MaterialTheme.typography.titleMedium, modifier = Modifier.weight(1f))
                IconButton(onClick = onDismiss) { Icon(Icons.Rounded.Close, "Close comments") }
            }
            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = .35f))
            Box(Modifier.weight(1f).fillMaxWidth()) {
                when {
                    state.loading -> Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
                    state.error != null && state.comments.isEmpty() -> Box(Modifier.fillMaxSize().padding(24.dp), contentAlignment = Alignment.Center) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(state.error, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            TextButton(onClick = onDismiss) { Text("Close") }
                        }
                    }
                    state.comments.isEmpty() -> Box(Modifier.fillMaxSize().padding(24.dp), contentAlignment = Alignment.Center) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("💬", style = MaterialTheme.typography.headlineLarge)
                            Text("No comments yet", style = MaterialTheme.typography.titleSmall)
                            Text("Be the first to comment.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                    else -> LazyColumn(Modifier.fillMaxSize(), state = list, contentPadding = androidx.compose.foundation.layout.PaddingValues(vertical = 8.dp)) {
                        items(state.comments, key = { it.id }) { c ->
                            CommentRow(c, now, isReply = false, onReply = { onReply(c) }, onLike = onLike, onDelete = onDelete, onReport = onReport)
                            c.replies.forEach { r ->
                                CommentRow(r, now, isReply = true, onReply = { onReply(c) }, onLike = onLike, onDelete = onDelete, onReport = onReport)
                            }
                        }
                        if (state.more) item(key = "more") {
                            LaunchedEffect(state.comments.size) { onMore() }
                            Box(Modifier.fillMaxWidth().padding(12.dp), contentAlignment = Alignment.Center) {
                                if (state.loadingMore) CircularProgressIndicator(Modifier.size(24.dp), strokeWidth = 2.dp)
                                else TextButton(onClick = onMore) { Text("View more comments") }
                            }
                        }
                    }
                }
            }
            HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = .35f))
            state.replyTo?.let { r ->
                Row(Modifier.fillMaxWidth().background(MaterialTheme.colorScheme.surfaceVariant).padding(start = 16.dp, end = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text("Replying to ${r.author.name}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.weight(1f))
                    IconButton(onClick = { onReply(null) }, modifier = Modifier.size(36.dp)) { Icon(Icons.Rounded.Close, "Cancel the reply", modifier = Modifier.size(18.dp)) }
                }
            }
            Row(Modifier.fillMaxWidth().navigationBarsPadding().padding(horizontal = 12.dp, vertical = 8.dp), verticalAlignment = Alignment.CenterVertically) {
                FeedAvatar(me, 36.dp)
                Spacer(Modifier.width(8.dp))
                TextField(
                    value = text, onValueChange = { text = it.take(500) },
                    placeholder = { Text(if (state.replyTo != null) "Write a reply…" else "Write a comment…") },
                    modifier = Modifier.weight(1f).clip(RoundedCornerShape(24.dp)),
                    colors = TextFieldDefaults.colors(
                        focusedIndicatorColor = Color.Transparent, unfocusedIndicatorColor = Color.Transparent, disabledIndicatorColor = Color.Transparent,
                        focusedContainerColor = MaterialTheme.colorScheme.surfaceVariant, unfocusedContainerColor = MaterialTheme.colorScheme.surfaceVariant,
                    ),
                    keyboardOptions = KeyboardOptions(capitalization = KeyboardCapitalization.Sentences, imeAction = ImeAction.Send),
                    keyboardActions = KeyboardActions(onSend = { if (text.isNotBlank()) onSend(text) { text = "" } }),
                    maxLines = 4,
                )
                IconButton(
                    onClick = { onSend(text) { text = "" } }, enabled = text.isNotBlank() && !state.sending,
                    modifier = Modifier.semantics { contentDescription = "Send the comment" },
                ) {
                    if (state.sending) CircularProgressIndicator(Modifier.size(22.dp), strokeWidth = 2.dp)
                    else Icon(Icons.AutoMirrored.Rounded.Send, null, tint = if (text.isNotBlank()) Sb.Violet else MaterialTheme.colorScheme.outline)
                }
            }
        }
    }
}

@Composable
private fun CommentRow(
    c: FeedCommentDto, now: Long, isReply: Boolean,
    onReply: () -> Unit, onLike: (FeedCommentDto) -> Unit, onDelete: (FeedCommentDto) -> Unit, onReport: (FeedCommentDto) -> Unit,
) {
    var menu by remember { mutableStateOf(false) }
    Row(Modifier.fillMaxWidth().padding(start = if (isReply) 56.dp else 12.dp, end = 8.dp, top = 6.dp, bottom = 2.dp)) {
        FeedAvatar(c.author, if (isReply) 28.dp else 36.dp)
        Spacer(Modifier.width(8.dp))
        Column(Modifier.weight(1f)) {
            Box {
                Column(
                    Modifier.clip(RoundedCornerShape(18.dp)).background(MaterialTheme.colorScheme.surfaceVariant).clickable { menu = true }.padding(horizontal = 12.dp, vertical = 8.dp),
                ) {
                    AuthorName(c.author)
                    Text(c.body, style = MaterialTheme.typography.bodyMedium.copy(textDirection = TextDirection.Content))
                }
                DropdownMenu(expanded = menu, onDismissRequest = { menu = false }) {
                    if (c.mine) DropdownMenuItem(text = { Text("Delete comment", color = MaterialTheme.colorScheme.error) }, leadingIcon = { Icon(Icons.Rounded.Delete, null, tint = MaterialTheme.colorScheme.error) }, onClick = { menu = false; onDelete(c) })
                    else DropdownMenuItem(text = { Text("Report comment") }, leadingIcon = { Icon(Icons.Rounded.Flag, null) }, onClick = { menu = false; onReport(c) })
                }
            }
            Row(Modifier.padding(start = 12.dp, top = 2.dp), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                Text(timeAgo(c.at, now), style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Text(
                    if (c.liked) "Liked" else "Like", style = MaterialTheme.typography.labelMedium,
                    color = if (c.liked) Sb.Violet else MaterialTheme.colorScheme.onSurfaceVariant, fontWeight = FontWeight.Bold,
                    modifier = Modifier.clickable { onLike(c) }.padding(vertical = 4.dp),
                )
                Text("Reply", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, fontWeight = FontWeight.Bold, modifier = Modifier.clickable(onClick = onReply).padding(vertical = 4.dp))
                if (c.likes > 0) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(Modifier.size(16.dp).clip(CircleShape).background(Sb.Violet), contentAlignment = Alignment.Center) {
                            Icon(Icons.Rounded.ThumbUp, null, tint = Color.White, modifier = Modifier.size(10.dp))
                        }
                        Text(" ${c.likes}", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
        }
    }
}
