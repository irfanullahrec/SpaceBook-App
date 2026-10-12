package com.example.spacebookapp.data.models

data class StorySlide(
    val title: String,
    val subtitle: String,
    val keyConcept: String,
    val quoteOrSummary: String,
    val subjectTag: String,
    val pageRef: String
)

data class BookStory(
    val id: String,
    val authorName: String,
    val authorRole: String,
    val bookTitle: String,
    val subjectTag: String,
    val previewGradient: List<Long>, // ARGB hex colors for gradient
    val isUserStory: Boolean = false,
    val coverDrawableRes: Int? = null,
    val isClass1EnglishBook: Boolean = false,
    val isClass1MathsBook: Boolean = false,
    val isClass1DrawingBook: Boolean = false,
    val webClassId: String? = null,
    val webSubjId: String? = null,
    val slides: List<StorySlide> = emptyList(),
    val hasUnseen: Boolean = true
)

data class Comment(
    val id: String,
    val authorName: String,
    val authorRole: String,
    val timestamp: String,
    val text: String,
    val likesCount: Int = 0
)

data class ChartBarData(
    val day: String,
    val questions: Int,
    val isActive: Boolean = false
)

enum class StatMediaType {
    STUDIED_QUESTIONS,
    CORRECT_ANSWERS,
    INCORRECT_ANSWERS,
    ACCURACY_RATE,
    WEEKLY_ACTIVITY,
    DAILY_STREAK,
    DAILY_GOAL,
    CURRICULUM_COVERAGE
}

data class StatMediaData(
    val type: StatMediaType,
    val primaryValue: String,
    val secondaryValue: String,
    val badgeText: String,
    val gradientColors: List<Long>,
    val pills: List<String> = emptyList(),
    val chartBars: List<ChartBarData> = emptyList(),
    val progressPercent: Float = 0f
)

data class StudyPost(
    val id: String,
    val authorName: String, // Stats Title e.g. "Studied Questions"
    val authorRole: String,
    val timestamp: String,
    val subjectTag: String,
    val bookReference: String,
    val contentText: String,
    val avatarEmoji: String? = null, // e.g. "📝", "✅", "❌", "🔥", "📈"
    val avatarRingColor: Long? = null,
    val statMedia: StatMediaData? = null, // Statistical card equal in size to facebook post media
    val formulaHighlight: String? = null,
    val keyTakeaway: String? = null,
    val diagramCaption: String? = null,
    val likesCount: Int = 0,
    val isLikedByMe: Boolean = false,
    val commentsCount: Int = 0,
    val sharesCount: Int = 0,
    val isBookmarked: Boolean = false,
    val comments: List<Comment> = emptyList()
)
