package pk.wantuch.spacebook.data.local

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.put

/** A bookmarked page. [tab] is the web page's tab ("Lessons", "Exercises" ...) without its emoji, the same text the website stores. */
data class Bookmark(
    val subjectId: String,
    val classId: String,
    val chapterIndex: Int,
    val tab: String,
    val page: Int,
    val title: String,
    val createdAt: Long,
)

/** A note, or (isHighlight) a highlighted sentence with an optional note. [id] is a uuid, the key the server stores it under. */
data class Note(
    val id: String,
    val subjectId: String,
    val classId: String,
    val chapterIndex: Int,
    val tab: String,
    val page: Int,
    val title: String,
    val text: String,
    val quote: String,
    val isHighlight: Boolean,
    val createdAt: Long,
)

/** Where the student stopped in a book: one per subject. */
data class ReadingPosition(
    val subjectId: String,
    val classId: String,
    val chapterIndex: Int,
    val chapterTitle: String,
    val page: Int,
    val pageCount: Int,
    val updatedAt: Long,
    val tab: String = "",
)

/**
 * Items <-> the values of api/lib/items.php. Field names and limits are the server's and the website's (js/sb_library.js):
 *   bm   key <subject>|<chapter>|<tab>|<page>   {c, s, ch, p, tb, t}
 *   note key <uuid>                             {c, s, ch, p, tb, t, x, q, k}
 *   pos  key <subject>                          {c, ch, p, tb, n, t}
 *   pref key class                              {id}
 */
object ItemCodec {
    const val BM = "bm"
    const val NOTE = "note"
    const val POS = "pos"
    const val PREF = "pref"
    const val CLASS_KEY = "class"

    /** The kinds this app keeps in its own database; the website keeps the others (marked words, game runs ...) in its page. */
    val KINDS = setOf(BM, NOTE, POS, PREF)

    /** The text of a tab as the website stores it: letters, digits, space, _ and - only (emojis go), at most 30 characters. */
    fun cleanTab(raw: String): String = raw.filter { it in 'A'..'Z' || it in 'a'..'z' || it in '0'..'9' || it == ' ' || it == '_' || it == '-' }.trim().take(30)

    fun bookmarkKey(subject: String, chapter: Int, tab: String, page: Int) = "$subject|$chapter|${cleanTab(tab)}|$page"

    fun bookmarkValue(b: Bookmark): JsonObject = buildJsonObject {
        put("c", b.classId); put("s", b.subjectId); put("ch", b.chapterIndex); put("p", b.page); put("tb", cleanTab(b.tab)); put("t", b.title.take(160))
    }

    fun noteValue(n: Note): JsonObject = buildJsonObject {
        put("c", n.classId); put("s", n.subjectId); put("ch", n.chapterIndex); put("p", n.page); put("tb", cleanTab(n.tab)); put("t", n.title.take(160))
        put("x", n.text.take(2000)); put("q", n.quote.take(500)); put("k", if (n.isHighlight) "hl" else "note")
    }

    fun positionValue(p: ReadingPosition): JsonObject = buildJsonObject {
        put("c", p.classId); put("ch", p.chapterIndex); put("p", p.page); put("tb", cleanTab(p.tab)); put("n", p.pageCount); put("t", p.chapterTitle.take(160))
    }

    private fun obj(json: Json, row: ItemRow): JsonObject? = runCatching { json.parseToJsonElement(row.valueJson) as? JsonObject }.getOrNull()
    private fun JsonObject.str(k: String) = (this[k] as? JsonPrimitive)?.contentOrNull.orEmpty()
    private fun JsonObject.int(k: String) = (this[k] as? JsonPrimitive)?.intOrNull ?: 0

    fun toBookmark(json: Json, row: ItemRow): Bookmark? {
        val v = obj(json, row) ?: return null
        if (row.kind != BM || v.str("s").isEmpty()) return null
        return Bookmark(v.str("s"), v.str("c"), v.int("ch"), v.str("tb"), v.int("p"), v.str("t"), row.at)
    }

    fun toNote(json: Json, row: ItemRow): Note? {
        val v = obj(json, row) ?: return null
        if (row.kind != NOTE || v.str("s").isEmpty()) return null
        return Note(row.itemKey, v.str("s"), v.str("c"), v.int("ch"), v.str("tb"), v.int("p"), v.str("t"), v.str("x"), v.str("q"), v.str("k") == "hl", row.at)
    }

    fun toPosition(json: Json, row: ItemRow): ReadingPosition? {
        val v = obj(json, row) ?: return null
        if (row.kind != POS) return null
        return ReadingPosition(row.itemKey, v.str("c"), v.int("ch"), v.str("t"), v.int("p"), v.int("n"), row.at, v.str("tb"))
    }

    fun classOf(json: Json, row: ItemRow): String? = obj(json, row)?.str("id")?.takeIf { row.kind == PREF && row.itemKey == CLASS_KEY && it.isNotEmpty() }
}
