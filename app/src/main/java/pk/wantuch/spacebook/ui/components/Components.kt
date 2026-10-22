package pk.wantuch.spacebook.ui.components

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Favorite
import androidx.compose.material.icons.rounded.FavoriteBorder
import androidx.compose.material.icons.rounded.Star
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.ui.theme.Sb

/** A round avatar with the subject's emoji on the subject's own gradient. */
@Composable
fun SubjectAvatar(emoji: String, key: String, size: Dp = 46.dp, ring: Boolean = false) {
    Box(
        Modifier
            .size(size + if (ring) 8.dp else 0.dp)
            .then(if (ring) Modifier.background(Sb.Brand, CircleShape) else Modifier),
        contentAlignment = Alignment.Center,
    ) {
        Box(
            Modifier
                .size(size)
                .clip(CircleShape)
                .background(Sb.brushFor(key))
                .then(if (ring) Modifier.padding(0.dp) else Modifier),
            contentAlignment = Alignment.Center,
        ) { Text(emoji, fontSize = (size.value * 0.5f).sp) }
    }
}

/** The coin counter shown at the top of every main screen. */
@Composable
fun CoinChip(coins: Int, onClick: (() -> Unit)? = null) {
    Surface(
        shape = RoundedCornerShape(50),
        color = Sb.Gold.copy(alpha = 0.22f),
        border = BorderStroke(1.dp, Sb.Gold),
        modifier = Modifier
            .then(if (onClick != null) Modifier.clickable(role = Role.Button, onClick = onClick) else Modifier)
            .semantics { contentDescription = "$coins coins" },
    ) {
        Row(Modifier.padding(horizontal = 12.dp, vertical = 6.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Rounded.Star, null, tint = Color(0xFFE5A100), modifier = Modifier.size(20.dp))
            Spacer(Modifier.width(4.dp))
            Text("$coins", style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onSurface)
        }
    }
}

/**
 * The SpaceBook post: a rounded card with a header (who / where), a big colourful banner, a line of chips, and an action bar.
 * Every study surface (a chapter, a practice set, a plan day) is one of these, so the feed reads the same everywhere.
 */
@Composable
fun PostCard(
    avatarEmoji: String,
    avatarKey: String,
    title: String,
    subtitle: String,
    modifier: Modifier = Modifier,
    onClick: (() -> Unit)? = null,
    banner: @Composable (() -> Unit)? = null,
    chips: List<String> = emptyList(),
    actions: @Composable (() -> Unit)? = null,
) {
    Surface(
        shape = MaterialTheme.shapes.large,
        color = MaterialTheme.colorScheme.surface,
        shadowElevation = 3.dp,
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 12.dp, vertical = 7.dp),
    ) {
        Column {
            Row(
                Modifier
                    .then(if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier)
                    .padding(14.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                SubjectAvatar(avatarEmoji, avatarKey)
                Spacer(Modifier.width(12.dp))
                Column(Modifier.weight(1f)) {
                    Text(title, style = MaterialTheme.typography.titleMedium, maxLines = 1, overflow = TextOverflow.Ellipsis)
                    Text(
                        subtitle,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis,
                    )
                }
            }
            if (banner != null) {
                Box(Modifier.then(if (onClick != null) Modifier.clickable(onClick = onClick) else Modifier)) { banner() }
            }
            if (chips.isNotEmpty()) {
                Row(Modifier.padding(horizontal = 14.dp, vertical = 10.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    chips.forEach { Chip(it) }
                }
            }
            if (actions != null) {
                Row(
                    Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 6.dp, vertical = 2.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) { actions() }
            }
            Spacer(Modifier.height(4.dp))
        }
    }
}

@Composable
fun Chip(text: String) {
    Surface(shape = RoundedCornerShape(50), color = MaterialTheme.colorScheme.primaryContainer) {
        Text(
            text,
            Modifier.padding(horizontal = 12.dp, vertical = 5.dp),
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.onPrimaryContainer,
        )
    }
}

/** A big gradient banner with a number or emoji and the headline in large type; a book cover stands on its right when given. */
@Composable
fun GradientBanner(
    key: String,
    big: String,
    headline: String,
    caption: String = "",
    height: Dp = 150.dp,
    coverId: String? = null,
    coverEmoji: String = "📘",
) {
    Box(
        Modifier
            .fillMaxWidth()
            .height(height)
            .background(Sb.brushFor(key)),
    ) {
        if (coverId == null) {
            Text(
                big,
                Modifier
                    .align(Alignment.CenterEnd)
                    .padding(end = 14.dp),
                fontSize = 92.sp,
                fontWeight = FontWeight.Black,
                color = Color.White.copy(alpha = 0.22f),
            )
        } else {
            Text(
                big,
                Modifier
                    .align(Alignment.TopStart)
                    .padding(start = 16.dp, top = 4.dp),
                fontSize = 64.sp,
                fontWeight = FontWeight.Black,
                color = Color.White.copy(alpha = 0.2f),
            )
            BookCover(
                coverId, coverEmoji,
                Modifier
                    .align(Alignment.CenterEnd)
                    .padding(end = 20.dp, top = 14.dp, bottom = 14.dp)
                    .fillMaxHeight()
                    .shadow(10.dp, RoundedCornerShape(8.dp)),
                corner = 8.dp,
            )
        }
        Column(
            Modifier
                .align(Alignment.BottomStart)
                .padding(start = 16.dp, bottom = 16.dp, end = if (coverId != null) 130.dp else 16.dp),
        ) {
            if (caption.isNotBlank()) Text(caption, color = Color.White.copy(alpha = 0.9f), style = MaterialTheme.typography.labelMedium)
            Text(
                headline,
                color = Color.White,
                style = MaterialTheme.typography.titleLarge,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis,
            )
        }
    }
}

/** One button of a post's action bar: icon above a short label, 48dp tall for small fingers. */
@Composable
fun PostAction(icon: ImageVector, label: String, onClick: () -> Unit, tint: Color = MaterialTheme.colorScheme.onSurfaceVariant, active: Boolean = false) {
    val scale by animateFloatAsState(
        targetValue = if (active) 1.18f else 1f,
        animationSpec = spring(Spring.DampingRatioMediumBouncy, Spring.StiffnessMedium),
        label = "react",
    )
    Column(
        Modifier
            .clip(MaterialTheme.shapes.medium)
            .clickable(role = Role.Button, onClick = onClick)
            .padding(horizontal = 14.dp, vertical = 6.dp)
            .semantics { contentDescription = label },
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Icon(icon, null, tint = if (active) MaterialTheme.colorScheme.secondary else tint, modifier = Modifier.size(26.dp).scale(scale))
        Text(label, style = MaterialTheme.typography.labelMedium, color = tint)
    }
}

@Composable
fun LikeAction(liked: Boolean, onClick: () -> Unit) =
    PostAction(if (liked) Icons.Rounded.Favorite else Icons.Rounded.FavoriteBorder, if (liked) "Liked" else "Like", onClick, active = liked)

@Composable
fun SectionTitle(text: String, modifier: Modifier = Modifier) {
    Text(text, modifier.padding(horizontal = 16.dp, vertical = 8.dp), style = MaterialTheme.typography.titleMedium)
}

@Composable
fun EmptyState(emoji: String, title: String, message: String, modifier: Modifier = Modifier, action: @Composable (() -> Unit)? = null) {
    Column(modifier.fillMaxWidth().padding(32.dp), horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(emoji, fontSize = 56.sp)
        Text(title, style = MaterialTheme.typography.titleMedium)
        Text(message, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
        action?.invoke()
    }
}

val BrandBrush: Brush get() = Sb.Brand
