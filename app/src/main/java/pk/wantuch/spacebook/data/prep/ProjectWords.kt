package pk.wantuch.spacebook.data.prep

import android.content.Context
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/** Distinct words in the book text, per language: en | ur | ps | ar, and all four together. */
@Serializable
data class WordCounts(val en: Int = 0, val ur: Int = 0, val ps: Int = 0, val ar: Int = 0, val all: Int = 0)

/**
 * "Project Stats": how many distinct words the books hold, for the whole project and for each class.
 * The counts are the website's own (js/word_stats_summary.js, made by tools/word_stats/build_word_stats.js), which the app already
 * carries inside its offline copy of the site, so nothing extra is downloaded or packed.
 */
@Serializable
data class ProjectWords(
    val generated: String = "",
    val project: WordCounts = WordCounts(),
    val classes: Map<String, WordCounts> = emptyMap(),
) {
    companion object {
        private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }

        /** The file is `window.SB_WORD_STATS_SUMMARY = {...};` — the object in the middle is plain JSON. */
        fun parse(script: String): ProjectWords? {
            val from = script.indexOf('{')
            val to = script.lastIndexOf('}')
            if (from < 0 || to <= from) return null
            return runCatching { json.decodeFromString<ProjectWords>(script.substring(from, to + 1)) }.getOrNull()
        }

        fun load(context: Context): ProjectWords? =
            runCatching { context.assets.open("site/js/word_stats_summary.js").bufferedReader().use { it.readText() } }.getOrNull()?.let(::parse)
    }
}
