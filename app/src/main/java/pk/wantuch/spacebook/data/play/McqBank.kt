package pk.wantuch.spacebook.data.play

import android.content.Context
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import javax.inject.Inject
import javax.inject.Singleton
import kotlin.random.Random

/** One multiple-choice question from the books (assets/mcq_bank.json, packed by tools/pack_mcq_bank.js). */
data class Mcq(
    val id: Int,
    val subjectId: String,
    val subject: String,
    val cls: Int,
    val category: String,
    val q: String,
    val options: List<String>,
    val answer: Int,
    /** why the answer is right, when the book says so */
    val explanation: String,
    /** the question in Urdu, shown under an English one when the book has it */
    val urdu: String,
    /** the question itself is in Urdu / Pashto / Arabic script */
    val rtl: Boolean,
)

class McqBank(val items: List<Mcq>) {
    /** The questions of [cls]; when a class has fewer than [min] the neighbouring classes are added until there are enough. */
    fun forClass(cls: Int, min: Int = 60): List<Mcq> {
        var spread = 0
        var out = items.filter { it.cls == cls }
        while (out.size < min && spread < 12) {
            spread++
            out = items.filter { kotlin.math.abs(it.cls - cls) <= spread }
        }
        return out
    }

    /**
     * [count] questions for [cls], shuffled with [random]: from several subjects (never more than a third of them from one), and
     * at most one in a different script, so a short quiz does not jump between languages.
     */
    fun pick(cls: Int, count: Int, random: Random, notIds: Set<Int> = emptySet()): List<Mcq> {
        val pool = forClass(cls).filter { it.id !in notIds }.shuffled(random)
        val perSubject = HashMap<String, Int>()
        val maxPerSubject = maxOf(1, (count + 2) / 3)
        val out = ArrayList<Mcq>(count)
        var rtl = 0
        for (m in pool) {
            if (out.size == count) break
            if (m.rtl && rtl >= 1) continue
            if ((perSubject[m.subjectId] ?: 0) >= maxPerSubject) continue
            out += m; perSubject.merge(m.subjectId, 1, Int::plus); if (m.rtl) rtl++
        }
        if (out.size < count) for (m in pool) { if (out.size == count) break; if (m !in out) out += m }   // too few subjects: relax
        return out
    }

    companion object {
        fun parse(text: String): McqBank {
            val root = Json.parseToJsonElement(text).jsonObject
            val subs = root.getValue("sub").jsonArray.map { it.jsonArray }
            val items = root.getValue("q").jsonArray.mapIndexed { i, el ->
                val r: JsonArray = el.jsonArray
                val s = subs[r[0].jsonPrimitive.int]
                Mcq(
                    id = i, subjectId = s[0].jsonPrimitive.content, subject = s[1].jsonPrimitive.content,
                    cls = s[2].jsonPrimitive.int, category = s[3].jsonPrimitive.content,
                    q = r[1].jsonPrimitive.content, options = r[2].jsonArray.map { it.jsonPrimitive.content },
                    answer = r[3].jsonPrimitive.int, explanation = r[4].jsonPrimitive.content,
                    urdu = r[5].jsonPrimitive.content, rtl = r[6].jsonPrimitive.int == 1,
                )
            }
            return McqBank(items)
        }
    }
}

/** Loads the bundled bank once, off the main thread, the first time a quiz or reel needs it. */
@Singleton
class McqBankSource @Inject constructor(@ApplicationContext private val context: Context) {
    private val lock = Mutex()
    @Volatile private var cached: McqBank? = null

    suspend fun bank(): McqBank = cached ?: lock.withLock {
        cached ?: withContext(Dispatchers.IO) {
            context.assets.open("mcq_bank.json").bufferedReader().use { McqBank.parse(it.readText()) }
        }.also { cached = it }
    }
}

/** "cls9" -> 9; 0 when the id has no number */
fun classNumber(classId: String): Int = classId.removePrefix("cls").toIntOrNull() ?: 0
