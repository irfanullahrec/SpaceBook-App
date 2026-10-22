package pk.wantuch.spacebook.ui.web

import kotlinx.serialization.Serializable

/** What assets/reader_bridge.js sends when a sentence is tapped or a word is held. */
@Serializable
data class MeaningRowDto(val lang: String, val text: String = "", val pending: Boolean = false)

@Serializable
data class MeaningDto(val id: Int, val kind: String, val text: String, val src: String, val rows: List<MeaningRowDto> = emptyList())

/** A language that arrived later (the page did not hold it; the offline lexicon was asked). */
@Serializable
data class MeaningUpdateDto(val id: Int, val lang: String, val text: String = "", val approx: Boolean = false)

data class MeaningRow(val lang: String, val text: String, val pending: Boolean, val approx: Boolean = false)

/** The pop-up shown over the page. [kind] is "sentence" or "word"; [src] is the language of [text]. */
data class MeaningState(val id: Int, val kind: String, val text: String, val src: String, val rows: List<MeaningRow>) {
    val isWord get() = kind == "word"
}

fun MeaningDto.toState() = MeaningState(id, kind, text, src, rows.map { MeaningRow(it.lang, it.text, it.pending) })

fun MeaningState.apply(u: MeaningUpdateDto): MeaningState =
    if (u.id != id) this else copy(rows = rows.map { if (it.lang == u.lang) it.copy(text = u.text, pending = false, approx = u.approx) else it })
