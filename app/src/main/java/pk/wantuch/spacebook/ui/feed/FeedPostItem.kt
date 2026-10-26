package pk.wantuch.spacebook.ui.feed

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.ChatBubbleOutline
import androidx.compose.material.icons.outlined.ThumbUpOffAlt
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material.icons.rounded.Flag
import androidx.compose.material.icons.rounded.MoreHoriz
import androidx.compose.material.icons.rounded.Public
import androidx.compose.material.icons.rounded.Share
import androidx.compose.material.icons.rounded.ThumbUp
import androidx.compose.material.icons.rounded.VisibilityOff
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
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
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDirection
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.data.feed.FeedCard
import pk.wantuch.spacebook.data.remote.FeedPostDto
import pk.wantuch.spacebook.data.remote.FeedSharedDto
import pk.wantuch.spacebook.ui.theme.Sb

/** What the student can do with one post. The screen shows the dialogs; the post only says what was asked. */
data class PostActions(
    val onLike: () -> Unit = {},
    val onComment: () -> Unit = {},
    val onShare: () -> Unit = {},
    val onDelete: () -> Unit = {},
    val onReport: () -> Unit = {},
    val onHide: () -> Unit = {},
    val onCopy: () -> Unit = {},
)

private val backgrounds = listOf(
    listOf(Color(0xFF6D5CFF), Color(0xFFFF5C8A)),
    listOf(Color(0xFF0EA5A5), Color(0xFF22C7A0)),
    listOf(Color(0xFF2F8CFF), Color(0xFF6D5CFF)),
    listOf(Color(0xFFF59E0B), Color(0xFFEF4444)),
    listOf(Color(0xFFB249F8), Color(0xFF3FA9FF)),
)

/** A short plain post is shown big on a colour, the way a feed does with a few words. */
internal fun isBigText(p: FeedPostDto): Boolean = (p.kind == "text") && p.card == null && p.body.length <= 90 && !p.body.contains('\n')

/** One post: who and when, the words, the attachment, the counts, and the Like / Comment / Share bar. */
@Composable
fun FeedPostItem(post: FeedPostDto, now: Long, actions: PostActions, modifier: Modifier = Modifier) {
    Surface(modifier.fillMaxWidth(), color = MaterialTheme.colorScheme.surface) {
        Column {
            PostHeader(post, now, actions)
            PostBody(post)
            if (post.kind == "share") SharedBox(post.shared, now)
            Spacer(Modifier.size(4.dp))
            CountsLine(post, actions)
            HorizontalDivider(Modifier.padding(horizontal = 12.dp), color = MaterialTheme.colorScheme.outline.copy(alpha = .35f))
            ActionBar(post, actions)
        }
    }
}

@Composable
private fun PostHeader(post: FeedPostDto, now: Long, actions: PostActions) {
    var menu by remember { mutableStateOf(false) }
    Row(Modifier.fillMaxWidth().padding(start = 12.dp, end = 2.dp, top = 10.dp, bottom = 6.dp), verticalAlignment = Alignment.CenterVertically) {
        FeedAvatar(post.author, 42.dp)
        Spacer(Modifier.width(10.dp))
        Column(Modifier.weight(1f)) {
            AuthorName(post.author)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    buildString {
                        append(timeAgo(post.at, now))
                        if (post.kind == "share") append(" · shared a post")
                    },
                    style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                Text(" · ", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                Icon(Icons.Rounded.Public, "Everyone on SpaceBook", tint = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.size(13.dp))
                if (post.kind == "question") { Spacer(Modifier.width(8.dp)); QuestionBadge() }
            }
        }
        Box {
            IconButton(onClick = { menu = true }, modifier = Modifier.semantics { contentDescription = "More options" }) {
                Icon(Icons.Rounded.MoreHoriz, null, tint = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            DropdownMenu(expanded = menu, onDismissRequest = { menu = false }) {
                if (post.body.isNotBlank()) DropdownMenuItem(text = { Text("Copy text") }, onClick = { menu = false; actions.onCopy() })
                if (post.mine) {
                    DropdownMenuItem(text = { Text("Delete post", color = MaterialTheme.colorScheme.error) }, leadingIcon = { Icon(Icons.Rounded.Delete, null, tint = MaterialTheme.colorScheme.error) }, onClick = { menu = false; actions.onDelete() })
                } else {
                    DropdownMenuItem(text = { Text("Report post") }, leadingIcon = { Icon(Icons.Rounded.Flag, null) }, onClick = { menu = false; actions.onReport() })
                    DropdownMenuItem(text = { Text("Hide post") }, leadingIcon = { Icon(Icons.Rounded.VisibilityOff, null) }, onClick = { menu = false; actions.onHide() })
                }
            }
        }
    }
}

@Composable
private fun PostBody(post: FeedPostDto) {
    if (isBigText(post)) {
        val colors = backgrounds[(post.id % backgrounds.size).toInt()]
        Box(
            Modifier.fillMaxWidth().heightIn(min = 190.dp).background(Brush.linearGradient(colors)).padding(24.dp),
            contentAlignment = Alignment.Center,
        ) {
            Text(
                post.body, color = Color.White, fontSize = 25.sp, lineHeight = 33.sp, fontWeight = FontWeight.Bold, textAlign = TextAlign.Center,
                style = MaterialTheme.typography.bodyLarge.copy(textDirection = TextDirection.Content),
            )
        }
        return
    }
    if (post.body.isNotBlank()) ExpandableText(post.body, Modifier.padding(horizontal = 12.dp, vertical = 4.dp))
    val card = FeedCard.parse(post.kind, post.card)
    if (card != null) FeedCardView(card)
}

/** The text of a post, cut after six lines with "See more", as a feed does. */
@Composable
private fun ExpandableText(text: String, modifier: Modifier = Modifier) {
    var expanded by remember(text) { mutableStateOf(false) }
    var overflow by remember(text) { mutableStateOf(false) }
    Column(modifier) {
        Text(
            text,
            maxLines = if (expanded) Int.MAX_VALUE else 6,
            overflow = TextOverflow.Ellipsis,
            onTextLayout = { if (!expanded) overflow = it.hasVisualOverflow },
            style = MaterialTheme.typography.bodyLarge.copy(textDirection = TextDirection.Content),
        )
        if (overflow && !expanded) {
            Text(
                "See more", color = MaterialTheme.colorScheme.onSurfaceVariant, fontWeight = FontWeight.Bold,
                modifier = Modifier.clickable { expanded = true }.padding(vertical = 4.dp),
            )
        }
    }
}

/** The post that a share points at, in a frame; "not available" when its author deleted it. */
@Composable
private fun SharedBox(s: FeedSharedDto?, now: Long) {
    Surface(
        shape = RoundedCornerShape(14.dp), border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = .6f)),
        color = MaterialTheme.colorScheme.surface, modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp),
    ) {
        if (s == null) {
            Column(Modifier.padding(16.dp)) {
                Text("This post isn't available", fontWeight = FontWeight.Bold)
                Text("It may have been deleted by the person who wrote it.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        } else {
            Column(Modifier.padding(bottom = 8.dp)) {
                Row(Modifier.padding(start = 10.dp, end = 10.dp, top = 10.dp, bottom = 4.dp), verticalAlignment = Alignment.CenterVertically) {
                    FeedAvatar(s.author, 32.dp)
                    Spacer(Modifier.width(8.dp))
                    Column {
                        AuthorName(s.author)
                        Text(timeAgo(s.at, now), style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
                if (s.body.isNotBlank()) ExpandableText(s.body, Modifier.padding(horizontal = 10.dp, vertical = 2.dp))
                FeedCard.parse(s.kind, s.card)?.let { FeedCardView(it) }
            }
        }
    }
}

@Composable
private fun CountsLine(post: FeedPostDto, actions: PostActions) {
    if (post.likes == 0 && post.comments == 0 && post.shares == 0) return
    Row(Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
        if (post.likes > 0) {
            Box(Modifier.size(20.dp).clip(CircleShape).background(Sb.Violet), contentAlignment = Alignment.Center) {
                Icon(Icons.Rounded.ThumbUp, null, tint = Color.White, modifier = Modifier.size(12.dp))
            }
            Spacer(Modifier.width(6.dp))
            Text(shortCount(post.likes), style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.semantics { contentDescription = countText(post.likes, "like") })
        }
        Spacer(Modifier.weight(1f))
        val right = listOfNotNull(
            if (post.comments > 0) countText(post.comments, "comment") else null,
            if (post.shares > 0) countText(post.shares, "share") else null,
        ).joinToString("  ·  ")
        if (right.isNotEmpty()) Text(right, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.clickable(onClick = actions.onComment))
    }
}

@Composable
private fun ActionBar(post: FeedPostDto, actions: PostActions) {
    val grey = MaterialTheme.colorScheme.onSurfaceVariant
    // a small bounce when the student likes the post (not when a liked post first appears)
    val pop = remember { Animatable(1f) }
    var first by remember { mutableStateOf(true) }
    LaunchedEffect(post.liked) {
        if (first) { first = false; return@LaunchedEffect }
        if (post.liked) { pop.animateTo(1.22f, tween(90)); pop.animateTo(1f, spring(dampingRatio = Spring.DampingRatioMediumBouncy)) }
    }
    Row(Modifier.fillMaxWidth().padding(horizontal = 4.dp), horizontalArrangement = Arrangement.SpaceEvenly) {
        Row(Modifier.weight(1f).scale(pop.value)) {
            FeedAction(
                if (post.liked) Icons.Rounded.ThumbUp else Icons.Outlined.ThumbUpOffAlt, if (post.liked) "Liked" else "Like",
                if (post.liked) Sb.Violet else grey, description = if (post.liked) "Unlike this post" else "Like this post", onClick = actions.onLike,
            )
        }
        FeedAction(Icons.Outlined.ChatBubbleOutline, "Comment", grey, description = "Comment on this post", onClick = actions.onComment)
        FeedAction(Icons.Rounded.Share, "Share", grey, description = "Share this post", onClick = actions.onShare)
    }
}
