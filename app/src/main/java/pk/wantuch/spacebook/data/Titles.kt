package pk.wantuch.spacebook.data

/** A chapter title in the catalog looks like "2 My Family and I میرا خاندان اور میں": number, English, then Urdu/Pashto. */
data class ChapterTitle(val number: String, val english: String, val local: String) {
    /** the text to show first: the English part, or everything when there is no Latin text */
    val primary get() = english.ifBlank { local }
}

private fun isRtl(c: Char) = c in '֐'..'ࣿ' || c in 'ﭐ'..'﷿' || c in 'ﹰ'..'﻿'

fun splitTitle(raw: String): ChapterTitle {
    val t = raw.trim()
    if (t.isEmpty()) return ChapterTitle("", "", "")
    val firstSpace = t.indexOf(' ')
    val head = if (firstSpace > 0) t.substring(0, firstSpace) else ""
    // "2", "R1", "1.2", "Unit" are numbers/labels only when they are short and contain a digit
    val hasNumber = head.length in 1..5 && head.any { it.isDigit() }
    val number = if (hasNumber) head else ""
    val rest = if (hasNumber) t.substring(firstSpace + 1).trim() else t
    val cut = rest.indexOfFirst { isRtl(it) }
    return when {
        cut < 0 -> ChapterTitle(number, rest, "")
        cut == 0 -> ChapterTitle(number, "", rest)
        else -> ChapterTitle(number, rest.substring(0, cut).trim(), rest.substring(cut).trim())
    }
}

/** "cls5" -> "Class 5" fallback when a class has no name */
fun prettyClass(id: String) = id.removePrefix("cls").let { if (it.isNotEmpty() && it.all(Char::isDigit)) "Class $it" else id }
