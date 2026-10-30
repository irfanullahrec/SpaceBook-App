package pk.wantuch.spacebook.data

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import pk.wantuch.spacebook.data.offline.KeyProvider
import pk.wantuch.spacebook.data.offline.KeystoreKeyProvider
import pk.wantuch.spacebook.data.offline.Seal
import pk.wantuch.spacebook.data.remote.DeviceDto
import pk.wantuch.spacebook.data.remote.UserDto
import java.util.UUID
import javax.inject.Inject
import javax.inject.Singleton

private val Context.sbStore by preferencesDataStore(name = "spacebook")

/** Everything the app remembers between launches that is not a database row. */
data class AppState(
    val device: DeviceDto? = null,
    val user: UserDto? = null,
    val installId: String = "",
    val baseUrlOverride: String = "",
    val classId: String = "",
    /** 0 = follow the system, 1 = light, 2 = dark */
    val themeMode: Int = 0,
    /** percent, 100 = normal */
    val fontScale: Int = 100,
    val coins: Int = 0,
    val entitlementsJson: String = "",
    /** how far this phone has read the server's change log (api/v2/sync.php?since=) */
    val syncCursor: Long = 0,
    /** the owner's switch for client sync, as the server last published it (flags.syncV2 in entitlements, api/lib/flags.php); the website follows the same value */
    val syncOn: Boolean = false,
    /** study-plan reminders as phone notifications (data/reminders); the student switches them on in Settings */
    val remindersOn: Boolean = false,
    /** the owner's pass is on for this phone (access/OwnerPass.kt) */
    val ownerPass: Boolean = false,
) {
    val signedIn get() = user != null && device != null
}

@Singleton
class Prefs @Inject constructor(@ApplicationContext private val context: Context, private val json: Json) {
    private val keys: KeyProvider get() = KeystoreKeyProvider.of(context)
    private object K {
        val device = stringPreferencesKey("device")
        val user = stringPreferencesKey("user")
        val installId = stringPreferencesKey("installId")
        val baseUrl = stringPreferencesKey("baseUrl")
        val classId = stringPreferencesKey("classId")
        val theme = intPreferencesKey("theme")
        val fontScale = intPreferencesKey("fontScale")
        val coins = intPreferencesKey("coins")
        val entitlements = stringPreferencesKey("entitlements")
        val cursor = stringPreferencesKey("syncCursor")
        val syncOn = booleanPreferencesKey("syncOn")
        val remindersOn = booleanPreferencesKey("remindersOn")
        val ownerPass = booleanPreferencesKey("ownerPass")
    }

    val state: Flow<AppState> = context.sbStore.data.map { p ->
        AppState(
            device = p[K.device]?.let { stored -> Seal.open(keys, stored)?.let { runCatching { json.decodeFromString<DeviceDto>(it) }.getOrNull() } },
            user = p[K.user]?.let { runCatching { json.decodeFromString<UserDto>(it) }.getOrNull() },
            installId = p[K.installId].orEmpty(),
            baseUrlOverride = p[K.baseUrl].orEmpty(),
            classId = p[K.classId].orEmpty(),
            themeMode = p[K.theme] ?: 0,
            fontScale = p[K.fontScale] ?: 100,
            coins = p[K.coins] ?: 0,
            entitlementsJson = p[K.entitlements].orEmpty(),
            syncCursor = p[K.cursor]?.toLongOrNull() ?: 0L,
            syncOn = p[K.syncOn] ?: false,
            remindersOn = p[K.remindersOn] ?: false,
            ownerPass = p[K.ownerPass] ?: false,
        )
    }

    /** A random id for this installation; it is not personal data and is never sent anywhere else. */
    suspend fun ensureInstallId(): String {
        var id = ""
        context.sbStore.edit { p ->
            id = p[K.installId] ?: UUID.randomUUID().toString().also { p[K.installId] = it }
        }
        return id
    }

    suspend fun setSession(user: UserDto?, device: DeviceDto?) {
        context.sbStore.edit { p ->
            if (user == null || device == null) {
                p.remove(K.user)
                p.remove(K.device)
            } else {
                p[K.user] = json.encodeToString(user)
                p[K.device] = Seal.seal(keys, json.encodeToString(device))          // the device token is kept sealed with the vault key, never as plain text
            }
        }
    }

    suspend fun setBaseUrl(url: String) {
        context.sbStore.edit { if (url.isBlank()) it.remove(K.baseUrl) else it[K.baseUrl] = url }
    }

    suspend fun setClass(id: String) {
        context.sbStore.edit { it[K.classId] = id }
    }

    suspend fun setTheme(mode: Int) {
        context.sbStore.edit { it[K.theme] = mode }
    }

    suspend fun setFontScale(percent: Int) {
        context.sbStore.edit { it[K.fontScale] = percent.coerceIn(80, 160) }
    }

    suspend fun setCoins(n: Int) {
        context.sbStore.edit { it[K.coins] = n }
    }

    suspend fun addCoins(n: Int) {
        context.sbStore.edit { it[K.coins] = (it[K.coins] ?: 0) + n }
    }

    suspend fun setCursor(cursor: Long) {
        context.sbStore.edit { it[K.cursor] = cursor.toString() }
    }

    suspend fun setRemindersOn(on: Boolean) {
        context.sbStore.edit { it[K.remindersOn] = on }
    }

    suspend fun setOwnerPass(on: Boolean) {
        context.sbStore.edit { it[K.ownerPass] = on }
    }

    suspend fun setSyncOn(on: Boolean) {
        context.sbStore.edit { it[K.syncOn] = on }
    }

    suspend fun setEntitlements(raw: String) {
        context.sbStore.edit { it[K.entitlements] = raw }
    }
}
