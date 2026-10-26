package pk.wantuch.spacebook.ui.feed

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Verified
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import pk.wantuch.spacebook.data.remote.FeedAuthorDto
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale

/** "Just now", "5m", "3h", "Yesterday", "3d", "Oct 24", "Oct 24, 2025" - the way a feed writes the age of a post. */
fun timeAgo(at: Long, now: Long, locale: Locale = Locale.getDefault()): String {
    if (at <= 0) return ""
    val diff = now - at
    if (diff < 60_000L) return "Just now"
    val minutes = diff / 60_000L
    if (minutes < 60) return "${minutes}m"
    val hours = minutes / 60
    if (hours < 24) return "${hours}h"
    val days = hours / 24
    if (days == 1L) return "Yesterday"
    if (days < 7) return "${days}d"
    val then = Calendar.getInstance().apply { timeInMillis = at }
    val today = Calendar.getInstance().apply { timeInMillis = now }
    val pattern = if (then.get(Calendar.YEAR) == today.get(Calendar.YEAR)) "MMM d" else "MMM d, yyyy"
    return SimpleDateFormat(pattern, locale).format(Date(at))
}

/** "1 like" / "12 likes"; a count in thousands is written 1.2K */
fun countText(n: Int, one: String, many: String = one + "s"): String = "${shortCount(n)} ${if (n == 1) one else many}"

fun shortCount(n: Int): String = when {
    n >= 1_000_000 -> "%.1fM".format(Locale.US, n / 1_000_000.0).replace(".0M", "M")
    n >= 10_000 -> "${n / 1000}K"
    n >= 1_000 -> "%.1fK".format(Locale.US, n / 1000.0).replace(".0K", "K")
    else -> n.toString()
}

/** The round picture of a person: the initial on a colour made from the person's number (the server sends the hue). */
@Composable
fun FeedAvatar(author: FeedAuthorDto, size: Dp = 40.dp, modifier: Modifier = Modifier) {
    val a = Color.hsv(author.hue.toFloat().coerceIn(0f, 359f), 0.62f, 0.92f)
    val b = Color.hsv(((author.hue + 38) % 360).toFloat(), 0.72f, 0.78f)
    Box(modifier.size(size).clip(CircleShape).background(Brush.linearGradient(listOf(a, b))), contentAlignment = Alignment.Center) {
        Text(author.initial.ifBlank { "?" }, color = Color.White, fontWeight = FontWeight.Bold, fontSize = (size.value * 0.44f).sp)
    }
}

/** The name of a person, with a tick for a teacher or a school. */
@Composable
fun AuthorName(author: FeedAuthorDto, modifier: Modifier = Modifier) {
    Row(modifier, verticalAlignment = Alignment.CenterVertically) {
        Text(author.name, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.Bold, maxLines = 1, overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis, modifier = Modifier.weight(1f, fill = false))
        if (author.type == "teacher" || author.type == "school") {
            Spacer(Modifier.width(4.dp))
            Icon(Icons.Rounded.Verified, if (author.type == "teacher") "Teacher" else "School", tint = Color(0xFF2F8CFF), modifier = Modifier.size(16.dp))
        }
    }
}

/** An icon with its words, side by side - the Like / Comment / Share button of a post. */
@Composable
fun RowScope.FeedAction(icon: ImageVector, label: String, tint: Color, description: String = label, onClick: () -> Unit) {
    Row(
        Modifier
            .weight(1f)
            .clickable(role = Role.Button, onClick = onClick)
            .padding(vertical = 10.dp)
            .semantics { contentDescription = description },
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Icon(icon, null, tint = tint, modifier = Modifier.size(22.dp))
        Spacer(Modifier.width(6.dp))
        Text(label, color = tint, style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.SemiBold)
    }
}

/** the dd MMM of a yyyy-mm-dd (for the "Today" label of a progress post) */
fun prettyDate(ymd: String, locale: Locale = Locale.getDefault()): String {
    val p = ymd.split("-").mapNotNull { it.toIntOrNull() }
    if (p.size != 3) return ymd
    val cal = Calendar.getInstance().apply { clear(); set(p[0], p[1] - 1, p[2]) }
    return DateFormat.getDateInstance(DateFormat.MEDIUM, locale).format(cal.time)
}
