package com.example.spacebookapp.data.models

data class ClassInfo(
    val id: String,
    val name: String,
    val emoji: String,
    val subjectsCount: Int,
    val description: String
)

data class SubjectInfo(
    val id: String,
    val classId: String,
    val name: String,
    val emoji: String,
    val chaptersCount: Int,
    val colorHex: Long,
    val description: String
)

data class TopicInfo(
    val num: String,
    val title: String,
    val summaryEn: String,
    val summaryUr: String = "",
    val keyPoints: List<String> = emptyList(),
    val statIcon: String = "📐",
    val statMetric: String = "",
    val statBadge: String = "",
    val statColorHex: Long = 0xFF1D4ED8,
    val examples: List<String> = emptyList(),
    val exercises: List<String> = emptyList()
)

data class MCQItem(
    val id: String,
    val question: String,
    val options: List<String>,
    val correctIndex: Int,
    val explanation: String
)

data class QAItem(
    val qNum: String,
    val question: String,
    val answer: String
)

data class NumericalItem(
    val num: String,
    val statement: String,
    val given: String,
    val formula: String,
    val solution: String,
    val answer: String
)

data class FormulaItem(
    val name: String,
    val formula: String,
    val unit: String
)

data class ChapterInfo(
    val num: Int,
    val subjectId: String,
    val name: String,
    val pageRange: String,
    val status: String,
    val slos: List<String>,
    val topics: List<TopicInfo>,
    val mcqs: List<MCQItem>,
    val shortQuestions: List<QAItem>,
    val longQuestions: List<QAItem>,
    val numericals: List<NumericalItem> = emptyList(),
    val formulas: List<FormulaItem> = emptyList()
)

data class TextbookItem(
    val id: String,
    val title: String,
    val subject: String,
    val grade: String,
    val publisher: String = "Khyber Pakhtunkhwa Textbook Board, Peshawar",
    val pages: Int,
    val colorHex: Long,
    val chaptersList: List<String>,
    val sampleExcerpt: String
)

data class RoadmapPhase(
    val phaseNumber: Int,
    val title: String,
    val targetTimeframe: String,
    val badge: String,
    val description: String,
    val highYieldChapters: List<String>,
    val strategyTip: String
)

data class StudyTask(
    val id: String,
    val title: String,
    val subject: String,
    val durationMin: Int,
    val isCompleted: Boolean = false,
    val priority: String = "High" // "High", "Medium", "Normal"
)

data class StudyStats(
    val studiedQuestions: Int = 148,
    val correctAnswers: Int = 126,
    val incorrectAnswers: Int = 22,
    val streakDays: Int = 5,
    val todayMinutes: Int = 45,
    val todayQuestions: Int = 16,
    val dailyGoal: Int = 20
) {
    val accuracyPercentage: Int
        get() = if (studiedQuestions > 0) ((correctAnswers.toDouble() / studiedQuestions) * 100).toInt() else 0
}
