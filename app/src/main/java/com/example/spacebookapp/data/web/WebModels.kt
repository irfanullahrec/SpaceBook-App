package com.example.spacebookapp.data.web

/**
 * Kotlin mirrors of the structures shipped inside the SpaceBook Web assets
 * (data.json / english.json / urdu.json / math.json).
 */

// ---------------------------------------------------------------- science (bio / chem / phys)

data class WebMcq(
    val q: String,
    val opts: List<String>,
    val ans: Int,
    val exp: String
)

data class WebQA(
    val q: String,
    val a: String
)

data class WebTable(
    val title: String,
    val headers: List<String>,
    val rows: List<List<String>>
)

data class WebFigure(
    val name: String,
    val caption: String,
    val note: String
)

data class WebSubTopic(
    val num: String,
    val name: String,
    val desc: String,
    val sq: String?,
    val mcq: WebMcq?,
    val sciNote: String?,
    val pointToRemember: String?,
    val sts: String?,
    val activity: String?,
    val table: WebTable?,
    val figure: WebFigure?
)

data class WebTopic(
    val num: String,
    val title: String,
    val summaryEn: String,
    val summaryUr: String,
    val summaryPs: String,
    val subtopics: List<WebSubTopic>
) {
    val sqCount: Int get() = subtopics.count { !it.sq.isNullOrBlank() }
    val mcqCount: Int get() = subtopics.count { it.mcq != null }
}

data class WebExercise(
    val mcqs: List<WebMcq>,
    val sq: List<WebQA>,
    val lq: List<WebQA>
)

data class WebDefinition(val term: String, val def: String)

data class WebDifference(
    val title: String,
    val colA: String,
    val colB: String,
    val rows: List<List<String>>
)

data class WebDiagram(val name: String, val topic: String, val note: String)

data class WebActivity(val num: String, val name: String, val procedure: String)

data class WebNumerical(
    val num: String,
    val statement: String,
    val given: String,
    val required: String,
    val formula: String,
    val solution: String,
    val answer: String
)

/** Formula cards come in two flavours (physics detail sheets and math formula sheets). */
data class WebFormula(
    val name: String,
    val formula: String,
    val note: String,
    val unit: String,
    val symbols: String,
    val example: String,
    val category: String,
    val points: List<String>,
    val items: List<String>
)

data class ScienceChapter(
    val num: Int,
    val name: String,
    val pageRange: String,
    val status: String,
    val slos: List<String>,
    val topics: List<WebTopic>,
    val exercise: WebExercise,
    val definitions: List<WebDefinition>,
    val differences: List<WebDifference>,
    val diagrams: List<WebDiagram>,
    val activities: List<WebActivity>,
    val tables: List<WebTable>,
    val checklist: List<String>,
    val numericals: List<WebNumerical>,
    val formulas: List<WebFormula>
)

// ---------------------------------------------------------------- english

data class EngSection(
    val heading: String,
    val headingUrdu: String,
    val headingPashto: String,
    val text: String,
    val paras: List<String>,
    val urdu: String,
    val pashto: String
)

data class VideoLesson(
    val title: String,
    val youtubeId: String,
    val duration: String,
    val tutor: String,
    val concepts: List<String>
)

data class ChoiceMcq(
    val question: String,
    val options: List<String>,
    val correct: Int,
    val explanation: String,
    val cognitive: String
)

data class MarksQA(
    val question: String,
    val answer: String,
    val marks: String,
    val outline: String,
    val keyPoints: List<String>,
    val sloRef: String
)

data class DictWord(val word: String, val pos: String, val meaning: String, val example: String)

data class SynonymEntry(val word: String, val synonyms: String, val antonym: String)

data class GrammarGroup(val title: String, val entries: List<Map<String, String>>)

data class WritingTask(
    val task: String,
    val topicSentence: String,
    val content: String,
    val english: String,
    val urdu: String,
    val title: String
)

data class SpeakingActivity(val title: String, val prompt: String, val modelResponse: String)

data class EngExercise(
    val textbookMcqs: List<ChoiceMcq>,
    val comprehension: List<WebQA>,
    val dictionaryWords: List<DictWord>,
    val thesaurusSynonyms: List<SynonymEntry>,
    val vocabulary: List<DictWord>,
    val grammarGroups: List<GrammarGroup>,
    val writingTasks: List<WritingTask>,
    val speakingActivity: SpeakingActivity?
)

data class EnglishChapter(
    val number: Int,
    val title: String,
    val titleUrdu: String,
    val titlePashto: String,
    val type: String,
    val author: String,
    val authorInfo: String,
    val sections: List<EngSection>,
    val pashtoTranslation: String,
    val englishTranslation: String,
    val video: VideoLesson?,
    val englishSummary: String,
    val urduSummary: String,
    val pashtoSummary: String,
    val exercise: EngExercise,
    val slos: List<String>,
    val sloMcqs: List<ChoiceMcq>,
    val sloShort: List<MarksQA>,
    val sloLong: List<MarksQA>
)

// ---------------------------------------------------------------- urdu

data class UrduSection(
    val heading: String,
    val headingEn: String,
    val headingPs: String,
    val urdu: String,
    val paras: List<String>,
    val english: String,
    val pashto: String
)

data class UrduExercise(
    val rawExercise: List<String>,
    val shortQuestions: List<MarksQA>,
    val mcqs: List<ChoiceMcq>,
    val blanks: List<WebQA>,
    val grammar: List<GrammarGroup>,
    val vocabulary: List<DictWord>
)

data class UrduChapter(
    val id: String,
    val number: Int,
    val type: String,
    val title: String,
    val titleEn: String,
    val titlePs: String,
    val author: String,
    val authorInfo: String,
    val urduText: String,
    val urduSections: List<String>,
    val sections: List<UrduSection>,
    val pashtoTranslation: String,
    val englishTranslation: String,
    val video: VideoLesson?,
    val englishSummary: String,
    val urduSummary: String,
    val pashtoSummary: String,
    val exercise: UrduExercise,
    val slos: List<String>,
    val sloMcqs: List<ChoiceMcq>,
    val sloShort: List<MarksQA>,
    val sloLong: List<MarksQA>
)

// ---------------------------------------------------------------- mathematics

data class MathSection(val id: String, val title: String, val theory: String, val rules: List<String>)

data class WorkedExample(
    val id: String,
    val title: String,
    val problem: String,
    val given: String,
    val method: String,
    val steps: List<String>,
    val answer: String,
    val section: String
)

data class MathProblem(val qNo: String, val question: String, val solution: String, val answer: String)

data class MathExercise(
    val exercise: String,
    val title: String,
    val description: String,
    val problems: List<MathProblem>
)

data class MathSloMcq(val q: String, val options: List<String>, val correct: Int, val exp: String)

data class MathSloQA(
    val q: String,
    val marks: Int,
    val sol: String,
    val rubric: String
)

data class MathChapter(
    val number: Int,
    val id: String,
    val title: String,
    val titleUrdu: String,
    val status: String,
    val badge: String,
    val pageRange: String,
    val description: String,
    val sections: List<MathSection>,
    val workedExamples: List<WorkedExample>,
    val exercises: List<MathExercise>,
    val sloMcqs: List<MathSloMcq>,
    val sloShort: List<MathSloQA>,
    val sloLong: List<MathSloQA>,
    val sloList: List<String>,
    val formulaSheet: List<WebFormula>
)

// ---------------------------------------------------------------- pakistan studies

data class PakStudyQuestion(
    val id: String,
    val question: String,
    val options: List<String>,
    val correct: Int,
    val answer: String,
    val explanation: String
)

data class PakStudyQa(val qNo: String, val question: String, val answer: String)

data class PakStudyVerse(val arabic: String, val translation: String, val reference: String)

data class PakStudySection(val id: String, val title: String, val content: String)

data class PakStudyTimeline(val year: String, val event: String)

data class PakStudyChapter(
    val number: Int,
    val id: String,
    val title: String,
    val titleEn: String,
    val pageRange: String,
    val badge: String,
    val status: String,
    val description: String,
    val intro: List<PakStudyVerse>,
    val sections: List<PakStudySection>,
    val keyPoints: List<String>,
    val timeline: List<PakStudyTimeline>,
    val exerciseMcqs: List<PakStudyQuestion>,
    val exerciseShort: List<PakStudyQa>,
    val exerciseLong: List<PakStudyQa>,
    val activities: List<String>,
    val sloMcqs: List<PakStudyQuestion>,
    val sloShort: List<PakStudyQa>,
    val sloLong: List<PakStudyQa>,
    val bankMcqs: List<PakStudyQuestion>,
    val bankShort: List<PakStudyQa>,
    val bankLong: List<PakStudyQa>
)

// ---------------------------------------------------------------- generic (non completed) chapters

data class GenericChapter(
    val num: Int,
    val name: String,
    val topics: String,
    val status: String
)

// ---------------------------------------------------------------- catalogue

data class WebClassRef(val id: String, val name: String, val emoji: String, val subjects: Int)

data class WebSubjectRef(val id: String, val name: String, val emoji: String, val chapters: Int)

/** One row of the hub's chapter level: the stat card shown before the subject view opens. */
data class ChapterRef(
    val num: Int,
    val name: String,
    val subtitle: String,
    val status: String,
    val topics: String
)

/** The authored views TuitionHub ships, plus the generic fallback. */
enum class SubjectKind { SCIENCE, ENGLISH, URDU, MATH, PAKSTUDY, GENERIC }

fun subjectKindOf(subjectId: String): SubjectKind = when (subjectId) {
    "cls9-bio", "cls10-bio", "cls9-chem", "cls10-chem", "cls9-phy", "cls10-phy" -> SubjectKind.SCIENCE
    "cls9-eng", "cls10-eng" -> SubjectKind.ENGLISH
    "cls9-urdu" -> SubjectKind.URDU
    "cls9-math" -> SubjectKind.MATH
    "cls9-pakstudy" -> SubjectKind.PAKSTUDY
    else -> SubjectKind.GENERIC
}

fun subjectAccent(subjectId: String): Long = when (subjectKindOf(subjectId)) {
    SubjectKind.SCIENCE -> when {
        subjectId.endsWith("-bio") -> 0xFF059669
        subjectId.endsWith("-chem") -> 0xFF0284C7
        else -> 0xFF7C3AED
    }
    SubjectKind.ENGLISH -> 0xFF0284C7
    SubjectKind.URDU -> 0xFF059669
    SubjectKind.MATH -> 0xFF312E81
    SubjectKind.PAKSTUDY -> 0xFFB45309
    SubjectKind.GENERIC -> 0xFF475569
}

// ---------------------------------------------------------------- search

data class SearchHit(
    val classId: String,
    val className: String,
    val subjectId: String,
    val subjectName: String,
    val chapterIndex: Int,
    val chapterTitle: String,
    val snippet: String
)
