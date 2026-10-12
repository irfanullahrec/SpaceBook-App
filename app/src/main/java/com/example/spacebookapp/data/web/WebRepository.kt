package com.example.spacebookapp.data.web

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject
import java.util.concurrent.ConcurrentHashMap

/**
 * Reads the JSON curriculum assets that were exported from SpaceBook Web and
 * converts them into the Kotlin models used by the Compose screens.
 *
 * Everything is parsed lazily on a background thread by the callers and then
 * memoised, so opening a subject twice is instant.
 */
object WebRepository {

    @Volatile
    private var appContext: Context? = null

    private val parsed = ConcurrentHashMap<String, Any>()

    fun init(context: Context) {
        appContext = context.applicationContext
    }

    // ------------------------------------------------------------ json helpers

    private fun readAsset(name: String): String {
        val ctx = appContext ?: error("WebRepository.init(context) must be called first")
        return ctx.assets.open("webdata/$name").bufferedReader(Charsets.UTF_8).use { it.readText() }
    }

    private fun load(name: String): Any =
        parsed.getOrPut(name) {
            when (name) {
                "data.json" -> JSONObject(readAsset(name))
                else -> JSONArray(readAsset(name))
            }
        }

    private fun JSONObject.str(key: String, def: String = ""): String =
        if (isNull(key)) def else optString(key, def)

    private fun JSONObject.intOrString(key: String, def: Int): Int = when {
        isNull(key) -> def
        opt(key) is Number -> optInt(key, def)
        else -> optString(key).toIntOrNull() ?: def
    }

    private fun JSONArray.stringList(): List<String> {
        val out = ArrayList<String>(length())
        for (i in 0 until length()) {
            val v = opt(i)
            out.add(v?.toString() ?: "")
        }
        return out
    }

    private fun JSONArray.stringMapList(): List<Map<String, String>> {
        val out = ArrayList<Map<String, String>>(length())
        for (i in 0 until length()) {
            val o = optJSONObject(i) ?: continue
            val m = LinkedHashMap<String, String>()
            val keys = o.keys()
            while (keys.hasNext()) {
                val k = keys.next()
                m[k] = o.opt(k)?.toString() ?: ""
            }
            out.add(m)
        }
        return out
    }

    private fun JSONArray.tableRows(): List<List<String>> {
        val out = ArrayList<List<String>>(length())
        for (i in 0 until length()) {
            val row = optJSONArray(i)
            if (row != null) out.add(row.stringList())
        }
        return out
    }

    private fun JSONArray.objects(): List<JSONObject> {
        val out = ArrayList<JSONObject>(length())
        for (i in 0 until length()) optJSONObject(i)?.let { out.add(it) }
        return out
    }

    // ------------------------------------------------------------ data.json access

    private fun data(): JSONObject = load("data.json") as JSONObject

    private val spaceBookWebClasses = listOf(
        WebClassRef("cls1", "Class 1", "✏️", 8),
        WebClassRef("cls2", "Class 2", "📖", 8),
        WebClassRef("cls3", "Class 3", "📚", 8),
        WebClassRef("cls4", "Class 4", "🎒", 6),
        WebClassRef("cls5", "Class 5", "🔬", 8),
        WebClassRef("cls6", "Class 6", "📐", 13),
        WebClassRef("cls7", "Class 7", "🧪", 13),
        WebClassRef("cls8", "Class 8", "⚛️", 13),
        WebClassRef("cls9", "Class 9", "🏫", 14),
        WebClassRef("cls10", "Class 10", "🏫", 14),
        WebClassRef("cls11", "Class 11", "🏛️", 5),
        WebClassRef("cls12", "Class 12", "🎓", 15)
    )

    private val spaceBookWebSubjects: Map<String, List<WebSubjectRef>> = mapOf(
        "cls1" to listOf(
            WebSubjectRef("cls1-eng", "English • انگریزی", "📖", 11),
            WebSubjectRef("cls1-math", "Mathematics • ریاضی", "📐", 6),
            WebSubjectRef("cls1-isl", "Islamyat • اسلامیات", "🕌", 10),
            WebSubjectRef("cls1-nazira", "Nazira Quran • ناظرہ قرآن", "📖", 17),
            WebSubjectRef("cls1-pashto", "Pashto • پښتو (لازمي)", "📚", 23),
            WebSubjectRef("cls1-drawing", "Drawing • تخلیقی فنون", "🎨", 32),
            WebSubjectRef("cls1-urdu", "Urdu • اردو لازمی", "📗", 12),
            WebSubjectRef("cls1-gk", "General Knowledge • واقفیتِ عامہ", "🌍", 10)
        ),
        "cls2" to listOf(
            WebSubjectRef("cls2-eng", "English • انگریزی", "📖", 12),
            WebSubjectRef("cls2-urdu", "Urdu • اردو لازمی", "📗", 22),
            WebSubjectRef("cls2-math", "Mathematics • ریاضی", "📐", 6),
            WebSubjectRef("cls2-gk", "General Knowledge • واقفیتِ عامہ", "🌍", 16),
            WebSubjectRef("cls2-isl", "Islamyat • اسلامیات", "🕌", 11),
            WebSubjectRef("cls2-nazira", "Nazira Quran • ناظرہ قرآن", "📖", 15),
            WebSubjectRef("cls2-pashto", "Pashto • پښتو (لازمي)", "📚", 28),
            WebSubjectRef("cls2-drawing", "Drawing • تخلیقی فنون", "🎨", 32)
        ),
        "cls3" to listOf(
            WebSubjectRef("cls3-eng", "English • انگریزی", "📖", 11),
            WebSubjectRef("cls3-math", "Mathematics • ریاضی", "📐", 7),
            WebSubjectRef("cls3-gk", "General Knowledge • واقفیتِ عامہ", "🌍", 16),
            WebSubjectRef("cls3-isl", "Islamyat • اسلامیات", "🕌", 18),
            WebSubjectRef("cls3-nazira", "Nazira Quran • ناظرہ قرآن", "📖", 16),
            WebSubjectRef("cls3-pashto", "Pashto • پښتو (لازمي)", "📚", 33),
            WebSubjectRef("cls3-drawing", "Drawing • تخلیقی فنون", "🎨", 32),
            WebSubjectRef("cls3-urdu", "Urdu • اردو لازمی", "📗", 14)
        ),
        "cls4" to listOf(
            WebSubjectRef("cls4-math", "Mathematics • ریاضی", "📐", 10),
            WebSubjectRef("cls4-eng", "English • انگریزی", "📖", 13),
            WebSubjectRef("cls4-sci", "General Science • جنرل سائنس", "🔬", 10),
            WebSubjectRef("cls4-sst", "Social Studies • معاشرتی علوم", "🗺️", 6),
            WebSubjectRef("cls4-isl", "Islamyat • اسلامیات", "🕌", 7),
            WebSubjectRef("cls4-pashto", "Pashto • پښتو لازمي", "📚", 18)
        ),
        "cls5" to listOf(
            WebSubjectRef("cls5-math", "Mathematics • ریاضی", "📐", 9),
            WebSubjectRef("cls5-sci", "General Science • جنرل سائنس", "🔬", 10),
            WebSubjectRef("cls5-eng", "English • انگریزی", "📖", 14),
            WebSubjectRef("cls5-urdu", "Urdu • اردو لازمی", "📗", 21),
            WebSubjectRef("cls5-isl", "Islamyat • اسلامیات لازمی", "🕌", 7),
            WebSubjectRef("cls5-sst", "Social Studies (EM)", "🗺️", 6),
            WebSubjectRef("cls5-sstum", "Social Studies (UM) • معاشرتی علوم", "🌍", 6),
            WebSubjectRef("cls5-pashto", "Pashto • پښتو لازمي", "📚", 28)
        ),
        "cls6" to listOf(
            WebSubjectRef("cls6-math", "Mathematics • ریاضی", "📐", 11),
            WebSubjectRef("cls6-sci", "General Science • جنرل سائنس", "🔬", 11),
            WebSubjectRef("cls6-eng", "English • انگریزی", "📖", 10),
            WebSubjectRef("cls6-urdu", "Urdu • اردو لازمی", "📗", 15),
            WebSubjectRef("cls6-isl", "Islamyat • اسلامیات", "🕌", 7),
            WebSubjectRef("cls6-comp", "Computer Education • کمپیوٹر", "💻", 6),
            WebSubjectRef("cls6-geo", "Geography • جغرافیہ", "🌍", 4),
            WebSubjectRef("cls6-hist", "History • تاریخ", "🏛️", 5),
            WebSubjectRef("cls6-hpe", "Health & Physical Education", "🏃", 6),
            WebSubjectRef("cls6-drawing", "Drawing / Art • ڈرائنگ", "🎨", 6),
            WebSubjectRef("cls6-arabic", "Arabic • عربی", "📜", 8),
            WebSubjectRef("cls6-quran", "Mutalia-e-Quran • مطالعہ قرآن", "📖", 8),
            WebSubjectRef("cls6-pashto", "Pashto • پښتو لازمي", "📚", 12)
        ),
        "cls7" to listOf(
            WebSubjectRef("cls7-eng", "English • انگریزی", "📖", 7),
            WebSubjectRef("cls7-urdu", "Urdu • اردو لازمی", "📗", 26),
            WebSubjectRef("cls7-math", "Mathematics • ریاضی", "📐", 13),
            WebSubjectRef("cls7-sci", "General Science • جنرل سائنس", "🔬", 12),
            WebSubjectRef("cls7-geo", "Geography • جغرافیہ", "🌍", 6),
            WebSubjectRef("cls7-hist", "History • تاریخ", "🏛️", 6),
            WebSubjectRef("cls7-hg", "History & Geography • تاریخ و جغرافیہ", "🌍", 12),
            WebSubjectRef("cls7-comp", "Computer Education • کمپیوٹر", "💻", 6),
            WebSubjectRef("cls7-isl", "Islamyat • اسلامیات", "🕌", 7),
            WebSubjectRef("cls7-quran", "Mutalia-e-Quran • مطالعہ قرآن", "📖", 22),
            WebSubjectRef("cls7-arabic", "Arabic • عربی", "📜", 25),
            WebSubjectRef("cls7-drawing", "Drawing / Art • ڈرائنگ", "🎨", 5),
            WebSubjectRef("cls7-hpe", "Health & Physical Education", "🏃", 12)
        ),
        "cls8" to listOf(
            WebSubjectRef("cls8-eng", "English • انگریزی", "📖", 8),
            WebSubjectRef("cls8-urdu", "Urdu • اردو لازمی", "📗", 25),
            WebSubjectRef("cls8-math", "Mathematics • ریاضی", "📐", 11),
            WebSubjectRef("cls8-sci", "General Science • جنرل سائنس", "🔬", 12),
            WebSubjectRef("cls8-geo", "Geography • جغرافیہ", "🌍", 6),
            WebSubjectRef("cls8-hist", "History • تاریخ", "🏛️", 6),
            WebSubjectRef("cls8-comp", "Computer Education • کمپیوٹر", "💻", 6),
            WebSubjectRef("cls8-isl", "Islamyat • اسلامیات", "🕌", 7),
            WebSubjectRef("cls8-quran", "Mutalia-e-Quran • مطالعہ قرآن", "📖", 24),
            WebSubjectRef("cls8-pashto", "Pashto • پښتو لازمي", "📚", 33),
            WebSubjectRef("cls8-arabic", "Arabic • عربی", "📜", 26),
            WebSubjectRef("cls8-drawing", "Drawing / Art • ڈرائنگ", "🎨", 6),
            WebSubjectRef("cls8-hpe", "Health & Physical Education", "🏃", 9)
        ),
        "cls9" to listOf(
            WebSubjectRef("cls9-math", "Mathematics • ریاضی", "📐", 17),
            WebSubjectRef("cls9-phy", "Physics • طبیعیات", "⚛️", 9),
            WebSubjectRef("cls9-chem", "Chemistry • کیمیا", "🧪", 8),
            WebSubjectRef("cls9-bio", "Biology • حیاتیات", "🧬", 9),
            WebSubjectRef("cls9-eng", "English • انگریزی", "📖", 15),
            WebSubjectRef("cls9-urdu", "Urdu • اردو لازمی", "📗", 19),
            WebSubjectRef("cls9-isl", "Islamyat • اسلامیات", "🕌", 15),
            WebSubjectRef("cls9-comp", "Computer Science • کمپیوٹر", "💻", 7),
            WebSubjectRef("cls9-pakstudy", "Pakistan Studies • مطالعہ پاکستان", "🇵🇰", 4),
            WebSubjectRef("cls9-sci", "General Science • جنرل سائنس", "🔬", 5),
            WebSubjectRef("cls9-hpe", "Health & Physical Education", "🏃", 8),
            WebSubjectRef("cls9-drawing", "Art & Model Drawing • ڈرائنگ", "🎨", 4),
            WebSubjectRef("cls9-islopt", "Islamiat Ikhtiari • اسلامیات اختیاری", "🕌", 7),
            WebSubjectRef("cls9-quran", "Mutalia-e-Quran • مطالعہ قرآن", "📖", 6)
        ),
        "cls10" to listOf(
            WebSubjectRef("cls10-math", "Mathematics • ریاضی", "📐", 13),
            WebSubjectRef("cls10-phy", "Physics • طبیعیات", "⚡", 9),
            WebSubjectRef("cls10-chem", "Chemistry • کیمیا", "🧪", 8),
            WebSubjectRef("cls10-bio", "Biology • حیاتیات", "🧬", 9),
            WebSubjectRef("cls10-eng", "English • انگریزی", "📖", 15),
            WebSubjectRef("cls10-pakstudy", "Pakistan Studies • مطالعہ پاکستان", "🇵🇰", 4),
            WebSubjectRef("cls10-isl", "Islamyat • اسلامیات", "🕌", 18),
            WebSubjectRef("cls10-urdu", "Urdu • اردو لازمی", "📗", 22),
            WebSubjectRef("cls10-comp", "Computer Science • کمپیوٹر", "💻", 7),
            WebSubjectRef("cls10-sci", "General Science • جنرل سائنس", "🔬", 6),
            WebSubjectRef("cls10-hpe", "Health & Physical Education", "🏃", 8),
            WebSubjectRef("cls10-drawing", "Art & Model Drawing • ڈرائنگ", "🎨", 4),
            WebSubjectRef("cls10-islopt", "Islamiat Ikhtiari • اسلامیات اختیاری", "🕌", 4),
            WebSubjectRef("cls10-quran", "Mutalia-e-Quran • مطالعہ قرآن", "📖", 8)
        ),
        "cls11" to listOf(
            WebSubjectRef("cls11-phy", "Physics • طبیعیات", "⚡", 10),
            WebSubjectRef("cls11-chem", "Chemistry • کیمیا", "🧪", 11),
            WebSubjectRef("cls11-math", "Mathematics • ریاضی", "📐", 14),
            WebSubjectRef("cls11-bio", "Biology • حیاتیات", "🧬", 10),
            WebSubjectRef("cls11-eng", "English • انگریزی", "📖", 9)
        ),
        "cls12" to listOf(
            WebSubjectRef("cls12-math", "Mathematics • ریاضی", "📐", 12),
            WebSubjectRef("cls12-phy", "Physics • طبیعیات", "⚡", 10),
            WebSubjectRef("cls12-chem", "Chemistry • کیمیا", "🧪", 12),
            WebSubjectRef("cls12-bio", "Biology • حیاتیات", "🧬", 14),
            WebSubjectRef("cls12-eng", "English • انگریزی لازمی", "📖", 19),
            WebSubjectRef("cls12-urdu", "Urdu • اردو لازمی", "📗", 22),
            WebSubjectRef("cls12-pak", "Pakistan Studies • مطالعہ پاکستان", "🇵🇰", 11),
            WebSubjectRef("cls12-comp", "Computer Science • کمپیوٹر سائنس", "💻", 9),
            WebSubjectRef("cls12-stat", "Statistics • شماریات", "📊", 9),
            WebSubjectRef("cls12-civics", "Civics • شہریت (سوکس)", "🏛️", 8),
            WebSubjectRef("cls12-econ", "Economics • معاشیات", "📈", 12),
            WebSubjectRef("cls12-hpe", "Health & Physical Education", "🏃", 6),
            WebSubjectRef("cls12-islopt", "Islamiat Ikhtiari • اسلامیات اختیاری", "🕌", 6),
            WebSubjectRef("cls12-islhist", "Islamic History • تاریخِ اسلام", "📜", 6),
            WebSubjectRef("cls12-quran", "Mutalia-e-Quran • ترجمۃ القرآن", "📖", 8)
        )
    )

    fun classNames(): Map<String, String> =
        spaceBookWebClasses.associate { it.id to it.name }

    fun classes(): List<WebClassRef> = spaceBookWebClasses

    fun subjectsFor(classId: String): List<WebSubjectRef> =
        spaceBookWebSubjects[classId] ?: emptyList()

    private fun scienceKey(subjectId: String): String? = when (subjectId) {
        "cls9-bio" -> "bioChapters"
        "cls10-bio" -> "bio10Chapters"
        "cls9-chem" -> "chemChapters"
        "cls10-chem" -> "chem10Chapters"
        "cls9-phy" -> "physChapters"
        "cls10-phy" -> "phys10Chapters"
        else -> null
    }

    fun hasScienceData(subjectId: String): Boolean = scienceKey(subjectId) != null

    fun scienceChapters(subjectId: String): List<ScienceChapter> {
        val key = scienceKey(subjectId) ?: return emptyList()
        val cacheKey = "science:$key"
        @Suppress("UNCHECKED_CAST")
        parsed[cacheKey]?.let { return it as List<ScienceChapter> }
        val arr = data().optJSONArray(key) ?: return emptyList()
        val list = arr.objects().map { parseScienceChapter(it) }
        parsed[cacheKey] = list
        return list
    }

    // ------------------------------------------------------------ english

    fun englishChapters(): List<EnglishChapter> {
        @Suppress("UNCHECKED_CAST")
        parsed["english"]?.let { return it as List<EnglishChapter> }
        val arr = load("english.json") as JSONArray
        val list = arr.objects().map { parseEnglishChapter(it) }
        parsed["english"] = list
        return list
    }

    // ------------------------------------------------------------ urdu

    fun urduChapters(): List<UrduChapter> {
        @Suppress("UNCHECKED_CAST")
        parsed["urdu"]?.let { return it as List<UrduChapter> }
        val arr = load("urdu.json") as JSONArray
        val list = arr.objects().map { parseUrduChapter(it) }
        parsed["urdu"] = list
        return list
    }

    // ------------------------------------------------------------ mathematics

    fun mathChapters(): List<MathChapter> {
        @Suppress("UNCHECKED_CAST")
        parsed["math"]?.let { return it as List<MathChapter> }
        val arr = load("math.json") as JSONArray
        val list = arr.objects().map { parseMathChapter(it) }
        parsed["math"] = list
        return list
    }

    // ------------------------------------------------------------ pakistan studies

    fun pakStudyChapters(): List<PakStudyChapter> {
        @Suppress("UNCHECKED_CAST")
        parsed["pakstudy"]?.let { return it as List<PakStudyChapter> }
        val arr = load("pakstudy.json") as JSONArray
        val list = arr.objects().map { parsePakStudyChapter(it) }
        parsed["pakstudy"] = list
        return list
    }

    // ------------------------------------------------------------ generic chapters

    fun genericChapters(subjectId: String): List<GenericChapter> {
        val arr = data().optJSONObject("chapters")?.optJSONArray(subjectId)
        if (arr != null) {
            return arr.objects().map {
                GenericChapter(
                    num = it.intOrString("num", 1),
                    name = it.str("name", it.str("title")),
                    topics = it.str("topics"),
                    status = it.str("status", "done")
                )
            }
        }
        var count = 8
        data().optJSONObject("subjects")?.let { subjects ->
            val keys = subjects.keys()
            while (keys.hasNext()) {
                val list = subjects.optJSONArray(keys.next()) ?: continue
                for (i in 0 until list.length()) {
                    val s = list.optJSONObject(i) ?: continue
                    if (s.str("id") == subjectId) {
                        count = s.intOrString("chapters", 8)
                        break
                    }
                }
            }
        }
        val statuses = listOf("done", "done", "progress", "upcoming")
        return (1..count).map { i ->
            GenericChapter(
                num = i,
                name = "Unit $i",
                topics = "${3 + (i % 3)} Topics",
                status = statuses[minOf(i - 1, statuses.lastIndex)]
            )
        }
    }

    fun studyPlan(): List<Map<String, String>> {
        val arr = data().optJSONArray("studyPlan") ?: return emptyList()
        return arr.stringMapList()
    }

    // ------------------------------------------------------------ hub chapter index

    /**
     * Chapter index used by the Subjects & Units hub. Authored views are listed first so the
     * card index always lines up with the chapter the subject view will open.
     */
    fun chapterRefsFor(classId: String, subjectId: String): List<ChapterRef> = when (subjectKindOf(subjectId)) {
        SubjectKind.SCIENCE -> scienceChapters(subjectId).map {
            ChapterRef(it.num, "Unit ${it.num}: ${it.name}", it.pageRange, it.status, "${it.topics.size} Topics")
        }
        SubjectKind.PAKSTUDY -> pakStudyChapters().map {
            ChapterRef(
                num = it.number,
                name = "Unit ${it.number}: ${it.titleEn}",
                subtitle = it.pageRange,
                status = it.status,
                topics = "${it.sections.size} Sections"
            )
        }
        SubjectKind.ENGLISH -> englishChapters().map {
            ChapterRef(
                num = it.number,
                name = englishChapterLabel(it),
                subtitle = it.titleUrdu.ifBlank { it.author },
                status = "done",
                topics = "${it.sections.size} Sections"
            )
        }
        SubjectKind.URDU -> urduChapters().map {
            ChapterRef(
                num = it.number,
                name = "Unit ${it.number}: ${it.titleEn}",
                subtitle = it.title,
                status = "done",
                topics = "${it.sections.size} Sections"
            )
        }
        SubjectKind.MATH -> mathChapters().map {
            ChapterRef(
                num = it.number,
                name = "Unit ${it.number}: ${it.title}",
                subtitle = it.pageRange,
                status = it.status,
                topics = "${it.sections.size} Sections"
            )
        }
        SubjectKind.GENERIC -> genericChapters(subjectId).map {
            ChapterRef(it.num, it.name, it.topics, it.status, it.topics)
        }
    }

    private fun englishChapterLabel(ch: EnglishChapter): String =
        if (ch.type == "poetry") "Poem: ${ch.title}" else "Unit ${ch.number}: ${ch.title}"

    // ------------------------------------------------------------ per-word meanings

    /**
     * English → Urdu glossary behind the tap-a-word reader. The curated lexicon ships as
     * `wordmeanings.json`; the textbook dictionary definitions back it up so every vocabulary
     * word the book teaches still answers.
     */
    private fun wordIndex(): Map<String, String> {
        @Suppress("UNCHECKED_CAST")
        (parsed["wordIndex"] as? Map<String, String>)?.let { return it }

        val map = HashMap<String, String>()
        try {
            JSONArray(readAsset("wordmeanings.json")).objects().forEach { o ->
                val w = o.str("w")
                if (w.isNotEmpty()) map[w.trim().lowercase()] = o.str("u")
            }
        } catch (_: Throwable) {
            // lexicon not bundled yet — fall through to the textbook dictionaries
        }
        try {
            englishChapters().forEach { ch ->
                (ch.exercise.dictionaryWords + ch.exercise.vocabulary).forEach { d ->
                    val w = d.word.trim().lowercase()
                    if (w.isNotEmpty() && map[w].isNullOrBlank()) map[w] = d.meaning
                }
            }
        } catch (_: Throwable) {
            // english.json unavailable
        }
        parsed["wordIndex"] = map
        return map
    }

    fun wordMeaning(word: String): String? {
        val key = word.trim().lowercase()
        if (key.isEmpty()) return null
        return wordIndex()[key]?.takeIf { it.isNotBlank() }
    }

    fun knownWordCount(): Int = wordIndex().size

    // ------------------------------------------------------------ science parsing

    private fun parseMcq(o: JSONObject): WebMcq = WebMcq(
        q = o.str("q", o.str("question")),
        opts = (o.optJSONArray("opts") ?: o.optJSONArray("options"))?.stringList() ?: emptyList(),
        ans = o.intOrString("ans", o.intOrString("correct", 0)),
        exp = o.str("exp", o.str("explanation"))
    )

    private fun parseTable(o: JSONObject?): WebTable? {
        if (o == null) return null
        return WebTable(
            title = o.str("title"),
            headers = o.optJSONArray("headers")?.stringList() ?: emptyList(),
            rows = o.optJSONArray("rows")?.tableRows() ?: emptyList()
        )
    }

    private fun parseScienceChapter(o: JSONObject): ScienceChapter {
        val topics = o.optJSONArray("topics")?.objects()?.map { t ->
            val summary = t.optJSONObject("summary")
            WebTopic(
                num = t.str("num"),
                title = t.str("title", t.str("name")),
                summaryEn = summary?.str("en") ?: t.str("desc"),
                summaryUr = summary?.str("ur") ?: summary?.str("en") ?: "",
                summaryPs = summary?.str("ps") ?: summary?.str("en") ?: "",
                subtopics = t.optJSONArray("subtopics")?.objects()?.map { s ->
                    WebSubTopic(
                        num = s.str("num"),
                        name = s.str("name"),
                        desc = s.str("desc", s.str("description")),
                        sq = if (s.isNull("sq")) null else s.str("sq"),
                        mcq = s.optJSONObject("mcq")?.let { parseMcq(it) },
                        sciNote = if (s.isNull("sciNote")) null else s.str("sciNote"),
                        pointToRemember = if (s.isNull("pointToRemember")) null else s.str("pointToRemember"),
                        sts = if (s.isNull("sts")) null else s.str("sts"),
                        activity = if (s.isNull("activity")) null else s.str("activity"),
                        table = parseTable(s.optJSONObject("table")),
                        figure = s.optJSONObject("figure")?.let {
                            WebFigure(it.str("name"), it.str("caption"), it.str("note"))
                        }
                    )
                } ?: emptyList()
            )
        } ?: emptyList()

        val tex = o.optJSONObject("textbookExercise")
        val exercise = WebExercise(
            mcqs = tex?.optJSONArray("mcqs")?.objects()?.map { parseMcq(it) } ?: emptyList(),
            sq = tex?.optJSONArray("sq")?.objects()?.map { WebQA(it.str("q"), it.str("ans")) } ?: emptyList(),
            lq = tex?.optJSONArray("lq")?.objects()?.map { WebQA(it.str("q"), it.str("ans")) } ?: emptyList()
        )

        return ScienceChapter(
            num = o.intOrString("num", 1),
            name = o.str("name", o.str("title")),
            pageRange = o.str("pageRange"),
            status = o.str("status", "ready"),
            slos = o.optJSONArray("slos")?.stringList() ?: emptyList(),
            topics = topics,
            exercise = exercise,
            definitions = o.optJSONArray("definitions")?.objects()?.map {
                WebDefinition(it.str("term"), it.str("def"))
            } ?: emptyList(),
            differences = o.optJSONArray("differences")?.objects()?.map {
                WebDifference(
                    title = it.str("title"),
                    colA = it.str("colA"),
                    colB = it.str("colB"),
                    rows = it.optJSONArray("rows")?.tableRows() ?: emptyList()
                )
            } ?: emptyList(),
            diagrams = o.optJSONArray("diagrams")?.objects()?.map {
                WebDiagram(it.str("name"), it.str("topic"), it.str("note"))
            } ?: emptyList(),
            activities = o.optJSONArray("activities")?.objects()?.map {
                WebActivity(it.str("num"), it.str("name"), it.str("procedure"))
            } ?: emptyList(),
            tables = o.optJSONArray("tables")?.objects()?.mapNotNull { parseTable(it) } ?: emptyList(),
            checklist = o.optJSONArray("checklist")?.stringList() ?: emptyList(),
            numericals = o.optJSONArray("numericals")?.objects()?.map {
                WebNumerical(
                    num = it.str("num"),
                    statement = it.str("statement"),
                    given = it.str("given"),
                    required = it.str("required"),
                    formula = it.str("formula"),
                    solution = it.str("solution"),
                    answer = it.str("answer")
                )
            } ?: emptyList(),
            formulas = o.optJSONArray("formulas")?.objects()?.map { parseFormula(it) } ?: emptyList()
        )
    }

    private fun parseFormula(o: JSONObject): WebFormula = WebFormula(
        name = o.str("name", o.str("title")),
        formula = o.str("formula"),
        note = o.str("note"),
        unit = o.str("unit"),
        symbols = o.str("symbols"),
        example = o.str("example"),
        category = o.str("category"),
        points = o.optJSONArray("points")?.stringList() ?: emptyList(),
        items = o.optJSONArray("items")?.stringList() ?: emptyList()
    )

    // ------------------------------------------------------------ english parsing

    private fun parseVideo(o: JSONObject?): VideoLesson? {
        if (o == null) return null
        return VideoLesson(
            title = o.str("title"),
            youtubeId = o.str("youtubeId"),
            duration = o.str("duration"),
            tutor = o.str("tutor", o.str("instructor")),
            concepts = o.optJSONArray("concepts")?.stringList() ?: emptyList()
        )
    }

    private fun parseChoiceMcq(o: JSONObject): ChoiceMcq = ChoiceMcq(
        question = o.str("question", o.str("q")),
        options = o.optJSONArray("options")?.stringList() ?: emptyList(),
        correct = o.intOrString("correct", o.intOrString("ans", 0)),
        explanation = o.str("explanation", o.str("exp")),
        cognitive = o.str("cognitive")
    )

    private fun parseMarksQA(o: JSONObject): MarksQA = MarksQA(
        question = o.str("question", o.str("q")),
        answer = o.str("answer", o.str("sol", o.str("solution"))),
        marks = when {
            o.has("marks") && o.opt("marks") is Number -> "${o.optInt("marks")} Marks"
            else -> o.str("marks")
        },
        outline = o.str("outline", o.str("rubric")),
        keyPoints = o.optJSONArray("keyPoints")?.stringList() ?: emptyList(),
        sloRef = o.str("sloRef")
    )

    private fun parseDictWord(o: JSONObject): DictWord = DictWord(
        word = o.str("word"),
        pos = o.str("pos"),
        meaning = o.str("meaning"),
        example = o.str("example", o.str("sentence"))
    )

    private fun parseEnglishChapter(o: JSONObject): EnglishChapter {
        val ex = o.optJSONObject("exercise") ?: JSONObject()
        val grammar = ex.optJSONObject("grammarActivities")
        val groups = ArrayList<GrammarGroup>()
        if (grammar != null) {
            val titles = mapOf(
                "singularPluralSentences" to "1. Singular to Plural Sentence Conversion",
                "concreteAbstractNouns" to "2. Concrete vs Abstract Nouns",
                "countableUncountableNouns" to "3. Countable vs Uncountable Nouns",
                "fillInBlanksNouns" to "4. Fill in the Blanks with Given Nouns",
                "collectiveNouns" to "5. Sentences with Collective Nouns",
                "nounsChangingMeaningPlural" to "6. Nouns that Change Meaning in Plural",
                "nounPhrases" to "7. Identification of Noun Phrases"
            )
            titles.forEach { (key, title) ->
                val arr = grammar.optJSONArray(key) ?: return@forEach
                groups.add(GrammarGroup(title, arr.stringMapList()))
            }
        }
        ex.optJSONArray("grammar")?.let {
            it.stringMapList().forEach { g -> groups.add(GrammarGroup(g["topic"] ?: "Grammar", listOf(g))) }
        }

        val slo = o.optJSONObject("sloQuestions") ?: JSONObject()
        return EnglishChapter(
            number = o.intOrString("number", 1),
            title = o.str("title"),
            titleUrdu = o.str("titleUrdu"),
            titlePashto = o.str("titlePashto"),
            type = o.str("type", "prose"),
            author = o.str("author"),
            authorInfo = o.str("authorInfo"),
            sections = o.optJSONArray("sections")?.objects()?.map {
                EngSection(
                    heading = it.str("heading"),
                    headingUrdu = it.str("headingUrdu"),
                    headingPashto = it.str("headingPashto"),
                    text = it.str("text"),
                    paras = it.optJSONArray("paras")?.stringList() ?: emptyList(),
                    urdu = it.str("urdu"),
                    pashto = it.str("pashto")
                )
            } ?: emptyList(),
            pashtoTranslation = o.str("pashtoTranslation"),
            englishTranslation = o.str("englishTranslation"),
            video = parseVideo(o.optJSONObject("video")),
            englishSummary = o.str("englishSummary"),
            urduSummary = o.str("urduSummary"),
            pashtoSummary = o.str("pashtoSummary"),
            exercise = EngExercise(
                textbookMcqs = ex.optJSONArray("textbookMcqs")?.objects()?.map { parseChoiceMcq(it) } ?: emptyList(),
                comprehension = ex.optJSONArray("comprehension")?.objects()?.map {
                    WebQA(it.str("question"), it.str("answer"))
                } ?: emptyList(),
                dictionaryWords = ex.optJSONArray("dictionaryWords")?.objects()?.map { parseDictWord(it) } ?: emptyList(),
                thesaurusSynonyms = ex.optJSONArray("thesaurusSynonyms")?.objects()?.map {
                    SynonymEntry(it.str("word"), it.str("synonyms"), it.str("antonym"))
                } ?: emptyList(),
                vocabulary = ex.optJSONArray("vocabulary")?.objects()?.map { parseDictWord(it) } ?: emptyList(),
                grammarGroups = groups,
                writingTasks = ex.optJSONArray("writingTasks")?.objects()?.map {
                    WritingTask(
                        task = it.str("task", it.str("title")),
                        topicSentence = it.str("topicSentence"),
                        content = it.str("content"),
                        english = it.str("english"),
                        urdu = it.str("urdu"),
                        title = it.str("title")
                    )
                } ?: emptyList(),
                speakingActivity = ex.optJSONObject("speakingActivity")?.let {
                    SpeakingActivity(it.str("title"), it.str("prompt"), it.str("modelResponse"))
                }
            ),
            slos = o.optJSONArray("slos")?.stringList() ?: emptyList(),
            sloMcqs = slo.optJSONArray("mcqs")?.objects()?.map { parseChoiceMcq(it) } ?: emptyList(),
            sloShort = slo.optJSONArray("shortQuestions")?.objects()?.map { parseMarksQA(it) } ?: emptyList(),
            sloLong = slo.optJSONArray("longQuestions")?.objects()?.map { parseMarksQA(it) } ?: emptyList()
        )
    }

    // ------------------------------------------------------------ urdu parsing

    private fun parseUrduChapter(o: JSONObject): UrduChapter {
        val ex = o.optJSONObject("exercise") ?: JSONObject()
        val slo = o.optJSONObject("sloQuestions") ?: JSONObject()
        return UrduChapter(
            id = o.str("id"),
            number = o.intOrString("number", 1),
            type = o.str("type", "prose"),
            title = o.str("title"),
            titleEn = o.str("titleEn"),
            titlePs = o.str("titlePs"),
            author = o.str("author"),
            authorInfo = o.str("authorInfo"),
            urduText = o.str("urduText"),
            urduSections = o.optJSONArray("urduSections")?.stringList() ?: emptyList(),
            sections = o.optJSONArray("sections")?.objects()?.map {
                UrduSection(
                    heading = it.str("heading"),
                    headingEn = it.str("headingEn"),
                    headingPs = it.str("headingPs"),
                    urdu = it.str("urdu"),
                    paras = it.optJSONArray("paras")?.stringList() ?: emptyList(),
                    english = it.str("english"),
                    pashto = it.str("pashto")
                )
            } ?: emptyList(),
            pashtoTranslation = o.str("pashtoTranslation"),
            englishTranslation = o.str("englishTranslation"),
            video = parseVideo(o.optJSONObject("video")),
            englishSummary = o.str("englishSummary"),
            urduSummary = o.str("urduSummary"),
            pashtoSummary = o.str("pashtoSummary"),
            exercise = UrduExercise(
                rawExercise = ex.optJSONArray("rawExercise")?.stringList() ?: emptyList(),
                shortQuestions = ex.optJSONArray("shortQuestions")?.objects()?.map { parseMarksQA(it) } ?: emptyList(),
                mcqs = ex.optJSONArray("mcqs")?.objects()?.map { parseChoiceMcq(it) } ?: emptyList(),
                blanks = ex.optJSONArray("blanks")?.objects()?.map {
                    WebQA(it.str("statement"), it.str("answer"))
                } ?: emptyList(),
                grammar = ex.optJSONArray("grammar")?.objects()?.map {
                    GrammarGroup(
                        it.str("topic"),
                        listOf(mapOf("explanation" to it.str("explanation")) + (it.optJSONArray("examples")?.stringList()
                            ?.mapIndexed { i, s -> "example${i + 1}" to s }?.toMap() ?: emptyMap()))
                    )
                } ?: emptyList(),
                vocabulary = ex.optJSONArray("vocabulary")?.objects()?.map { parseDictWord(it) } ?: emptyList()
            ),
            slos = o.optJSONArray("slos")?.stringList() ?: emptyList(),
            sloMcqs = slo.optJSONArray("mcqs")?.objects()?.map { parseChoiceMcq(it) } ?: emptyList(),
            sloShort = slo.optJSONArray("shortQuestions")?.objects()?.map { parseMarksQA(it) } ?: emptyList(),
            sloLong = slo.optJSONArray("longQuestions")?.objects()?.map { parseMarksQA(it) } ?: emptyList()
        )
    }

    // ------------------------------------------------------------ math parsing

    private fun parseMathChapter(o: JSONObject): MathChapter {
        val slos = o.optJSONObject("slos") ?: JSONObject()
        return MathChapter(
            number = o.intOrString("number", 1),
            id = o.str("id"),
            title = o.str("title"),
            titleUrdu = o.str("titleUrdu"),
            status = o.str("status", "ready"),
            badge = o.str("badge"),
            pageRange = o.str("pageRange"),
            description = o.str("description"),
            sections = o.optJSONArray("sections")?.objects()?.map {
                MathSection(
                    id = it.str("id"),
                    title = it.str("title"),
                    theory = it.str("theory"),
                    rules = it.optJSONArray("rules")?.stringList() ?: emptyList()
                )
            } ?: emptyList(),
            workedExamples = o.optJSONArray("workedExamples")?.objects()?.map {
                WorkedExample(
                    id = it.str("id"),
                    title = it.str("title"),
                    problem = it.str("problem"),
                    given = it.str("given"),
                    method = it.str("method"),
                    steps = it.optJSONArray("steps")?.stringList() ?: emptyList(),
                    answer = it.str("answer"),
                    section = it.str("section")
                )
            } ?: emptyList(),
            exercises = o.optJSONArray("exercises")?.objects()?.map { e ->
                MathExercise(
                    exercise = e.str("exercise"),
                    title = e.str("title"),
                    description = e.str("description"),
                    problems = e.optJSONArray("problems")?.objects()?.map {
                        MathProblem(
                            qNo = it.str("qNo"),
                            question = it.str("question"),
                            solution = it.str("solution"),
                            answer = it.str("answer")
                        )
                    } ?: emptyList()
                )
            } ?: emptyList(),
            sloMcqs = slos.optJSONArray("mcqs")?.objects()?.map {
                MathSloMcq(
                    q = it.str("q", it.str("question")),
                    options = it.optJSONArray("options")?.stringList() ?: emptyList(),
                    correct = it.intOrString("correct", it.intOrString("ans", 0)),
                    exp = it.str("exp", it.str("explanation"))
                )
            } ?: emptyList(),
            sloShort = slos.optJSONArray("shortQuestions")?.objects()?.map {
                MathSloQA(
                    q = it.str("q", it.str("question")),
                    marks = it.intOrString("marks", 3),
                    sol = it.str("sol", it.str("solution")),
                    rubric = it.str("rubric")
                )
            } ?: emptyList(),
            sloLong = slos.optJSONArray("longQuestions")?.objects()?.map {
                MathSloQA(
                    q = it.str("q", it.str("question")),
                    marks = it.intOrString("marks", 8),
                    sol = it.str("sol", it.str("solution")),
                    rubric = it.str("rubric")
                )
            } ?: emptyList(),
            sloList = o.optJSONArray("slos")?.stringList() ?: emptyList(),
            formulaSheet = o.optJSONArray("formulaSheet")?.objects()?.map { parseFormula(it) } ?: emptyList()
        )
    }

    // ------------------------------------------------------------ pakistan studies parsing

    private fun parsePakMcq(o: JSONObject): PakStudyQuestion = PakStudyQuestion(
        id = o.str("id"),
        question = o.str("question"),
        options = o.optJSONArray("options")?.stringList() ?: emptyList(),
        correct = o.intOrString("correct", 0),
        answer = o.str("answer"),
        explanation = o.str("explanation")
    )

    private fun parsePakQa(o: JSONObject): PakStudyQa = PakStudyQa(
        qNo = o.str("qNo"),
        question = o.str("question", o.str("q")),
        answer = o.str("answer", o.str("sol", o.str("solution")))
    )

    private fun parsePakStudyChapter(o: JSONObject): PakStudyChapter {
        val ex = o.optJSONObject("exercise") ?: JSONObject()
        val assess = o.optJSONObject("sloAssessments") ?: JSONObject()
        val bank = o.optJSONObject("sloBank") ?: JSONObject()

        fun mcqs(src: JSONObject, key: String): List<PakStudyQuestion> =
            src.optJSONArray(key)?.objects()?.map { parsePakMcq(it) } ?: emptyList()

        fun qas(src: JSONObject, key: String): List<PakStudyQa> =
            src.optJSONArray(key)?.objects()?.map { parsePakQa(it) } ?: emptyList()

        return PakStudyChapter(
            number = o.intOrString("number", 1),
            id = o.str("id"),
            title = o.str("title"),
            titleEn = o.str("titleEn"),
            pageRange = o.str("pageRange"),
            badge = o.str("badge"),
            status = o.str("status", "done"),
            description = o.str("description"),
            intro = o.optJSONArray("introQuranHadith")?.objects()?.map {
                PakStudyVerse(arabic = it.str("arabic"), translation = it.str("translation"), reference = it.str("reference"))
            } ?: emptyList(),
            sections = o.optJSONArray("sections")?.objects()?.map {
                PakStudySection(id = it.str("id"), title = it.str("title"), content = it.str("content"))
            } ?: emptyList(),
            keyPoints = o.optJSONArray("keyPoints")?.stringList() ?: emptyList(),
            timeline = o.optJSONArray("timeline")?.objects()?.map {
                PakStudyTimeline(year = it.str("year"), event = it.str("event"))
            } ?: emptyList(),
            exerciseMcqs = mcqs(ex, "mcqs"),
            exerciseShort = qas(ex, "shortQuestions"),
            exerciseLong = qas(ex, "longQuestions"),
            activities = ex.optJSONArray("activities")?.stringList() ?: emptyList(),
            sloMcqs = mcqs(assess, "mcqs"),
            sloShort = qas(assess, "shortQuestions"),
            sloLong = qas(assess, "longQuestions"),
            bankMcqs = mcqs(bank, "mcqs"),
            bankShort = qas(bank, "shortQuestions"),
            bankLong = qas(bank, "longQuestions")
        )
    }

    // ------------------------------------------------------------ global search

    /**
     * Mirrors TuitionHub's `handleGlobalSearch`: looks through every class,
     * subject, chapter title and question bank.
     */
    fun search(query: String, limit: Int = 40): List<SearchHit> {
        val q = query.trim().lowercase()
        if (q.length < 2) return emptyList()
        val classes = classNames()
        val subjectsByClass = data().optJSONObject("subjects") ?: return emptyList()
        val hits = ArrayList<SearchHit>()

        fun subjectLabel(subjectId: String): String {
            val keys = subjectsByClass.keys()
            while (keys.hasNext()) {
                val arr = subjectsByClass.optJSONArray(keys.next()) ?: continue
                for (i in 0 until arr.length()) {
                    val s = arr.optJSONObject(i) ?: continue
                    if (s.str("id") == subjectId) return s.str("name")
                }
            }
            return subjectId
        }

        fun add(classId: String, subjectId: String, index: Int, title: String, snippet: String) {
            if (hits.size >= limit) return
            hits.add(
                SearchHit(
                    classId = classId,
                    className = classes[classId] ?: classId,
                    subjectId = subjectId,
                    subjectName = subjectLabel(subjectId),
                    chapterIndex = index,
                    chapterTitle = title,
                    snippet = snippet
                )
            )
        }

        // Fully authored subjects -------------------------------------------------
        scienceChapters("cls9-bio").forEachIndexed { i, ch ->
            if (ch.name.lowercase().contains(q)) add("cls9", "cls9-bio", i, ch.name, ch.pageRange)
        }
        scienceChapters("cls10-bio").forEachIndexed { i, ch ->
            if (ch.name.lowercase().contains(q)) add("cls10", "cls10-bio", i, ch.name, ch.pageRange)
        }
        scienceChapters("cls9-chem").forEachIndexed { i, ch ->
            if (ch.name.lowercase().contains(q)) add("cls9", "cls9-chem", i, ch.name, ch.pageRange)
        }
        scienceChapters("cls10-chem").forEachIndexed { i, ch ->
            if (ch.name.lowercase().contains(q)) add("cls10", "cls10-chem", i, ch.name, ch.pageRange)
        }
        scienceChapters("cls9-phy").forEachIndexed { i, ch ->
            if (ch.name.lowercase().contains(q)) add("cls9", "cls9-phy", i, ch.name, ch.pageRange)
        }
        scienceChapters("cls10-phy").forEachIndexed { i, ch ->
            if (ch.name.lowercase().contains(q)) add("cls10", "cls10-phy", i, ch.name, ch.pageRange)
        }
        englishChapters().forEachIndexed { i, ch ->
            if (ch.title.lowercase().contains(q)) add("cls9", "cls9-eng", i, ch.title, ch.author)
        }
        urduChapters().forEachIndexed { i, ch ->
            if (ch.title.lowercase().contains(q) || ch.titleEn.lowercase().contains(q)) {
                add("cls9", "cls9-urdu", i, ch.title, ch.titleEn)
            }
        }
        mathChapters().forEachIndexed { i, ch ->
            if (ch.title.lowercase().contains(q) || ch.titleUrdu.contains(query.trim())) {
                add("cls9", "cls9-math", i, ch.title, ch.pageRange)
            }
        }

        // Remaining classes fall back to their generic unit list -------------------
        val classIds = listOf("cls9", "cls10", "cls11", "cls12")
        val authored = setOf(
            "cls9-bio", "cls10-bio", "cls9-chem", "cls10-chem",
            "cls9-phy", "cls10-phy", "cls9-eng", "cls9-urdu", "cls9-math"
        )
        for (classId in classIds) {
            val arr = subjectsByClass.optJSONArray(classId) ?: continue
            for (i in 0 until arr.length()) {
                val s = arr.optJSONObject(i) ?: continue
                val subjectId = s.str("id")
                if (subjectId in authored) continue
                if (!s.str("name").lowercase().contains(q)) continue
                genericChapters(subjectId).forEachIndexed { idx, ch ->
                    if (ch.name.lowercase().contains(q) || ch.name == "Unit $idx") {
                        add(classId, subjectId, idx, ch.name, s.str("name"))
                    }
                }
            }
        }
        return hits.distinctBy { it.classId + it.subjectId + it.chapterIndex }.take(limit)
    }
}
