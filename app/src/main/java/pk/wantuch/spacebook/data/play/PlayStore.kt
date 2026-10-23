package pk.wantuch.spacebook.data.play

import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import javax.inject.Inject
import javax.inject.Singleton

private val Context.playDataStore by preferencesDataStore(name = "play")

/** Keeps [PlayState] on this phone (no account needed, nothing is sent anywhere). */
@Singleton
class PlayStore @Inject constructor(@ApplicationContext private val context: Context, private val json: Json) {
    private val key = stringPreferencesKey("state")

    val state: Flow<PlayState> = context.playDataStore.data.map { p ->
        p[key]?.let { runCatching { json.decodeFromString<PlayState>(it) }.getOrNull() } ?: PlayState()
    }

    suspend fun update(change: (PlayState) -> PlayState) {
        context.playDataStore.edit { p ->
            val now = p[key]?.let { runCatching { json.decodeFromString<PlayState>(it) }.getOrNull() } ?: PlayState()
            p[key] = json.encodeToString(change(now))
        }
    }

    suspend fun answer(correct: Boolean) = update { it.recordAnswer(correct, todayNumber()) }
    suspend fun finishQuiz(correct: Int, total: Int) = update { it.finishQuiz(correct, total, todayNumber()) }
    suspend fun openLesson() = update { it.openLesson(todayNumber()) }

    /** @return the XP the chest held (0 when it was already open today) */
    suspend fun openChest(): Int {
        var reward = 0
        update { val (s, r) = it.openChest(todayNumber()); reward = r; s }
        return reward
    }
}
