package com.example.spacebookapp.data.brain

import android.content.Context
import android.content.SharedPreferences

enum class BrainCategory(val id: String, val titleEn: String, val titleUr: String, val titlePs: String, val emoji: String) {
    DEFENDER("defender", "Answer Defender", "جواب کا دفاع", "د ځواب دفاع", "🛡️"),
    FOCUS("focus", "Focus & Attention", "توجہ اور یادداشت", "پاملرنه او حافظه", "🎯"),
    IQ("iq", "Logic & IQ", "منطق اور ذہانت", "منطق او پوهه", "🧩"),
    THINKING("thinking", "Critical Thinking", "گہری سوچ اور تجزیہ", "ژور فکر او تحلیل", "💡")
}

enum class BrainDifficulty(val labelEn: String, val labelUr: String, val labelPs: String) {
    EASY("Easy", "آسان", "اسانه"),
    MEDIUM("Medium", "درمیانہ", "منځنی"),
    HARD("Hard", "مشکل", "سخت")
}

data class BrainScoreState(
    val focusScore: Int = 0,
    val iqScore: Int = 0,
    val thinkingScore: Int = 0,
    val totalStars: Int = 0,
    val dailyChallengesDone: Int = 0,
    val streakDays: Int = 1,
    val soundEnabled: Boolean = true,
    val screenLimitMinutes: Int = 20,
    val elapsedMinutesToday: Int = 0
)

object BrainProgressManager {
    private const val PREFS_NAME = "spacebook_brain_zone_prefs"
    private const val KEY_FOCUS = "score_focus"
    private const val KEY_IQ = "score_iq"
    private const val KEY_THINKING = "score_thinking"
    private const val KEY_STARS = "score_stars"
    private const val KEY_CHALLENGES = "challenges_today"
    private const val KEY_SOUND = "sound_enabled"
    private const val KEY_LIMIT_MIN = "limit_minutes"
    private const val KEY_LAST_DATE = "last_date_key"

    fun load(context: Context): BrainScoreState {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        return BrainScoreState(
            focusScore = prefs.getInt(KEY_FOCUS, 25),
            iqScore = prefs.getInt(KEY_IQ, 25),
            thinkingScore = prefs.getInt(KEY_THINKING, 25),
            totalStars = prefs.getInt(KEY_STARS, 12),
            dailyChallengesDone = prefs.getInt(KEY_CHALLENGES, 0),
            soundEnabled = prefs.getBoolean(KEY_SOUND, true),
            screenLimitMinutes = prefs.getInt(KEY_LIMIT_MIN, 20)
        )
    }

    fun addPoints(context: Context, category: BrainCategory, points: Int, starsEarned: Int) {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        val editor = prefs.edit()
        when (category) {
            BrainCategory.DEFENDER, BrainCategory.FOCUS -> {
                val current = prefs.getInt(KEY_FOCUS, 25)
                editor.putInt(KEY_FOCUS, (current + points).coerceAtLeast(0))
            }
            BrainCategory.IQ -> {
                val current = prefs.getInt(KEY_IQ, 25)
                editor.putInt(KEY_IQ, (current + points).coerceAtLeast(0))
            }
            BrainCategory.THINKING -> {
                val current = prefs.getInt(KEY_THINKING, 25)
                editor.putInt(KEY_THINKING, (current + points).coerceAtLeast(0))
            }
        }
        val currentStars = prefs.getInt(KEY_STARS, 12)
        editor.putInt(KEY_STARS, currentStars + starsEarned)
        val challenges = prefs.getInt(KEY_CHALLENGES, 0)
        editor.putInt(KEY_CHALLENGES, challenges + 1)
        editor.apply()
    }

    fun setSoundEnabled(context: Context, enabled: Boolean) {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        prefs.edit().putBoolean(KEY_SOUND, enabled).apply()
    }

    fun setLimitMinutes(context: Context, minutes: Int) {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        prefs.edit().putInt(KEY_LIMIT_MIN, minutes).apply()
    }
}
