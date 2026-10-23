package pk.wantuch.spacebook.data.prep

import android.content.Context
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/** What the books hold of one language's grammar: topics, lessons (teaching text) and practice questions. */
@Serializable
data class GrammarTotals(val topics: Int = 0, val lessons: Int = 0, val exercises: Int = 0)

@Serializable
data class GrammarLang(val name: String = "", val native: String = "", val total: GrammarTotals = GrammarTotals())

/**
 * "Grammar Stats" on Project Stats: the numbers per language. They are the website's own (content/grammar/index.json, made by
 * tools/grammar/build_grammar.js), which the app carries inside its offline copy of the site; the lessons and questions behind them
 * are the website's Grammar Stats page, opened inside the app.
 */
@Serializable
data class GrammarSummary(val langs: Map<String, GrammarLang> = emptyMap()) {
    /** English, Urdu, Pashto, Arabic, in that order, then anything else the file may add */
    fun ordered(): List<Pair<String, GrammarLang>> {
        val first = listOf("en", "ur", "ps", "ar").mapNotNull { k -> langs[k]?.let { k to it } }
        return first + langs.filterKeys { it !in setOf("en", "ur", "ps", "ar") }.toList()
    }

    companion object {
        private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }

        fun parse(text: String): GrammarSummary? = runCatching { json.decodeFromString<GrammarSummary>(text) }.getOrNull()

        fun load(context: Context): GrammarSummary? =
            runCatching { context.assets.open("site/content/grammar/index.json").bufferedReader().use { it.readText() } }.getOrNull()?.let(::parse)
    }
}
