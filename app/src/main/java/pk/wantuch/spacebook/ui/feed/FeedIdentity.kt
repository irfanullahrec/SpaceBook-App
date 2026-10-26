package pk.wantuch.spacebook.ui.feed

import pk.wantuch.spacebook.data.remote.FeedAuthorDto
import pk.wantuch.spacebook.data.remote.UserDto
import java.util.Locale
import java.util.zip.CRC32

/**
 * How the signed-in student looks to others in the feed. The server makes the same name (api/lib/feed.php, sb_feed_display_name) for
 * everybody else's posts; this copy is only for the student's own avatar before any post of theirs has come back. The rule: first name and
 * the first letter of the last word ("Ali Khan" -> "Ali K."), a school keeps its own name. No number and no father name, ever.
 */
fun feedDisplayName(name: String, type: String): String {
    val clean = name.trim().replace(Regex("\\s+"), " ")
    if (clean.isEmpty()) return "Student"
    if (type == "school") return clean.take(40)
    val parts = clean.split(" ")
    val first = parts[0].take(24)
    if (parts.size == 1) return first
    return first + " " + parts.last().take(1).uppercase(Locale.ROOT) + "."
}

/** the avatar colour: the same number the server makes with crc32("sbfeed" + id) % 360 */
fun feedHue(userId: Int): Int {
    val crc = CRC32().apply { update("sbfeed$userId".toByteArray(Charsets.UTF_8)) }
    return (crc.value % 360L).toInt()
}

fun feedAuthorOf(user: UserDto?): FeedAuthorDto {
    if (user == null) return FeedAuthorDto(name = "Guest", initial = "G", hue = 220)
    val name = feedDisplayName(user.name, user.userType)
    return FeedAuthorDto(name = name, type = user.userType, initial = name.take(1).uppercase(Locale.ROOT), hue = feedHue(user.id))
}
