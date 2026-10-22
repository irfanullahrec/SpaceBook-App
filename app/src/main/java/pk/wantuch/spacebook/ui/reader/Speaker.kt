package pk.wantuch.spacebook.ui.reader

import android.speech.tts.TextToSpeech
import android.speech.tts.UtteranceProgressListener
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import java.util.Locale

/** The languages SpaceBook shows meanings in, with the voice each is read with. */
object Lang {
    fun locale(code: String): Locale = when (code) {
        "ur" -> Locale("ur", "PK")
        "ps" -> Locale("ps", "AF")
        "ar" -> Locale("ar")
        else -> Locale.US
    }

    fun name(code: String) = when (code) {
        "ur" -> "Urdu"
        "ps" -> "Pashto"
        "ar" -> "Arabic"
        else -> "English"
    }

    /** the label printed on a meaning line */
    fun label(code: String) = when (code) {
        "ur" -> "اردو"
        "ps" -> "پښتو"
        "ar" -> "العربية"
        else -> "English"
    }

    fun rtl(code: String) = code == "ur" || code == "ps" || code == "ar"

    /** Which language a text is in, by its letters (enough to choose a voice). */
    fun guess(text: String): String {
        val arabic = text.count { it in '؀'..'ۿ' }
        if (arabic * 2 < text.count { it.isLetter() }) return "en"
        return when {
            text.any { it in "ټځڅډړږښګڼۍې" } -> "ps"
            text.any { it in "ٹڈڑںھہۂےۓ" } -> "ur"
            else -> "ur"
        }
    }
}

/** Reads text aloud with the phone's own voices; nothing is sent anywhere. */
class Speaker(private val tts: TextToSpeech?, val speaking: Boolean, private val setSpeaking: (Boolean) -> Unit) {
    /**
     * @param lang "en" | "ur" | "ps" | "ar" (guessed from the letters when null)
     * @return false when the phone has no voice for that language (the caller says so)
     */
    fun speak(text: String, lang: String? = null): Boolean {
        val t = tts ?: return false
        val clean = text.trim()
        if (clean.isEmpty()) return true
        val code = lang ?: Lang.guess(clean)
        val locale = Lang.locale(code)
        val avail = t.isLanguageAvailable(locale)
        if (avail < TextToSpeech.LANG_AVAILABLE) return false
        t.language = locale
        t.stop()
        clean.chunked(3500).forEachIndexed { i, part ->
            t.speak(part, if (i == 0) TextToSpeech.QUEUE_FLUSH else TextToSpeech.QUEUE_ADD, null, "sb-$i")
        }
        setSpeaking(true)
        return true
    }

    fun stop() {
        tts?.stop()
        setSpeaking(false)
    }
}

@Composable
fun rememberSpeaker(): Speaker {
    val context = LocalContext.current
    var speaking by remember { mutableStateOf(false) }
    var ready by remember { mutableStateOf(false) }
    val tts = remember { TextToSpeech(context.applicationContext) { status -> ready = status == TextToSpeech.SUCCESS } }
    DisposableEffect(tts) {
        tts.setOnUtteranceProgressListener(object : UtteranceProgressListener() {
            override fun onStart(utteranceId: String?) {}
            override fun onDone(utteranceId: String?) { speaking = false }
            @Deprecated("deprecated in API") override fun onError(utteranceId: String?) { speaking = false }
        })
        onDispose { tts.stop(); tts.shutdown() }
    }
    return remember(tts, ready, speaking) { Speaker(if (ready) tts else null, speaking) { speaking = it } }
}
