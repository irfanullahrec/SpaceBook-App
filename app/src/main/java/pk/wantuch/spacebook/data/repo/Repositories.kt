package pk.wantuch.spacebook.data.repo

import android.content.Context
import android.webkit.CookieManager
import androidx.work.Constraints
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.withContext
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import pk.wantuch.spacebook.data.AppState
import pk.wantuch.spacebook.data.Prefs
import pk.wantuch.spacebook.data.local.OutboxDao
import pk.wantuch.spacebook.data.local.OutboxEvent
import pk.wantuch.spacebook.data.remote.ApiResult
import pk.wantuch.spacebook.data.remote.ApiService
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.EmptyBody
import pk.wantuch.spacebook.data.remote.Endpoint
import pk.wantuch.spacebook.data.remote.EntitlementsDto
import pk.wantuch.spacebook.data.remote.LoginBody
import pk.wantuch.spacebook.data.remote.RegisterBody
import pk.wantuch.spacebook.data.remote.SyncEventDto
import pk.wantuch.spacebook.data.remote.SyncPushBody
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.data.remote.apiCall
import pk.wantuch.spacebook.work.SyncWorker
import java.io.File
import java.util.UUID
import javax.inject.Inject
import javax.inject.Singleton

/** Classes, subjects and chapters. The copy shipped in the APK shows at once; the site's newer copy replaces it. */
@Singleton
class CatalogRepository @Inject constructor(
    @ApplicationContext private val context: Context,
    private val api: ApiService,
    private val json: Json,
) {
    private val _catalog = MutableStateFlow<Catalog?>(null)
    val catalog: StateFlow<Catalog?> = _catalog.asStateFlow()
    private val cacheFile get() = File(context.filesDir, "app_catalog.json")

    suspend fun load() {
        if (_catalog.value == null) {
            _catalog.value = withContext(Dispatchers.Default) {
                readCache() ?: readAsset()
            }
        }
        refresh()
    }

    suspend fun refresh(): Boolean {
        val r = apiCall(json) { api.catalog() }
        if (r !is ApiResult.Success || r.value.classes.isEmpty()) return false
        _catalog.value = r.value
        withContext(Dispatchers.IO) { runCatching { cacheFile.writeText(json.encodeToString(r.value)) } }
        return true
    }

    private fun readCache(): Catalog? = runCatching {
        if (cacheFile.exists()) json.decodeFromString<Catalog>(cacheFile.readText()) else null
    }.getOrNull()

    private fun readAsset(): Catalog? = runCatching {
        context.assets.open(ASSET).bufferedReader().use { json.decodeFromString<Catalog>(it.readText()) }
    }.getOrNull()

    companion object {
        const val ASSET = "app_catalog.json"
    }
}

/** Sign-in, registration and sign-out. The device token is the app's only credential. */
@Singleton
class AuthRepository @Inject constructor(
    private val api: ApiService,
    private val prefs: Prefs,
    private val endpoint: Endpoint,
    private val outbox: OutboxDao,
    private val json: Json,
) {
    suspend fun login(whatsapp: String, password: String): ApiResult<UserDto> =
        finish(apiCall(json) { api.login(LoginBody(whatsapp.trim(), password, deviceName = deviceName())) })

    suspend fun register(
        name: String,
        fatherName: String,
        userType: String,
        whatsapp: String,
        password: String,
    ): ApiResult<UserDto> = finish(
        apiCall(json) {
            api.register(RegisterBody(name.trim(), fatherName.trim(), userType, whatsapp.trim(), password, deviceName = deviceName()))
        },
    )

    private suspend fun deviceName() = "SpaceBook Android ${prefs.ensureInstallId().take(8)}"

    private suspend fun finish(r: ApiResult<pk.wantuch.spacebook.data.remote.AuthResponse>): ApiResult<UserDto> {
        if (r is ApiResult.Failure) return r
        val body = (r as ApiResult.Success).value
        val user = body.user
        val device = body.device
        if (!body.ok || user == null || device == null) return ApiResult.Failure(body.error ?: "Could not sign in")
        endpoint.token = device.token
        prefs.setSession(user, device)
        return ApiResult.Success(user)
    }

    /** Ends this phone's access on the server (best effort), then forgets it here. Unsent events stay on the phone. */
    suspend fun logout() {
        runCatching { apiCall(json) { api.logout(EmptyBody()) } }
        endpoint.token = ""
        prefs.setSession(null, null)
        prefs.setCursor(0)
        prefs.setCoins(0)
        withContext(Dispatchers.Main) {
            runCatching { CookieManager.getInstance().removeAllCookies(null) }
        }
    }

    suspend fun guestEventCount(): Int = outbox.guestCount()

    suspend fun adoptGuestEvents(userId: Int) = outbox.adoptGuest(userId)

    suspend fun keepGuestEventsOnDevice() = Unit
}

/** Events the app makes (a game step, a finished test...) are stored first and sent when there is a network. */
@Singleton
class SyncRepository @Inject constructor(
    @ApplicationContext private val context: Context,
    private val api: ApiService,
    private val outbox: OutboxDao,
    private val prefs: Prefs,
    private val json: Json,
) {
    suspend fun emit(type: String, payload: JsonObject) {
        val state = prefs.state.first()
        outbox.add(
            OutboxEvent(
                eventId = UUID.randomUUID().toString(),
                type = type,
                payloadJson = json.encodeToString(JsonElement.serializer(), payload),
                clientTs = System.currentTimeMillis(),
                userId = state.user?.id ?: 0,
            ),
        )
        if (state.signedIn) schedule(context)
    }

    /** One reward step, in the shape api/lib/rewards.php accepts: class|subject|u<unit>|count|<hash>|<n>. */
    suspend fun rewardStep(key: String, title: String, total: Int, step: Int) {
        emit("step", buildJsonObject {
            put("key", key)
            put("title", title.take(120))
            put("total", total)
            put("step", step)
        })
        // a guest sees coins at once with the same rule the server uses (+1 per step); a signed-in phone waits for the server's count
        if (!prefs.state.first().signedIn) prefs.addCoins(1)
    }

    /** @return true when nothing is left to send (or there is nobody to send for). */
    suspend fun flush(): Boolean {
        val state = prefs.state.first()
        val uid = state.user?.id ?: return true
        if (state.device == null) return true
        while (true) {
            val batch = outbox.pending(uid, BATCH)
            if (batch.isEmpty()) break
            val body = SyncPushBody(batch.map {
                SyncEventDto(it.eventId, it.type, json.parseToJsonElement(it.payloadJson), it.clientTs)
            })
            when (val r = apiCall(json) { api.push(body) }) {
                is ApiResult.Failure -> return false         // offline, 401, 429, 5xx: everything stays queued
                is ApiResult.Success -> {
                    // accepted events are done; rejected ones are permanently invalid and would never succeed
                    outbox.remove(r.value.accepted + r.value.rejected.map { it.eventId })
                    if (r.value.coins > 0) prefs.setCoins(r.value.coins)
                    if (r.value.accepted.isEmpty() && r.value.rejected.isEmpty()) return false
                }
            }
        }
        pull()
        return true
    }

    /** Brings the coin total (and the cursor) up to date from other devices and the website. */
    suspend fun pull() {
        val state = prefs.state.first()
        if (!state.signedIn) return
        val r = apiCall(json) { api.pull(state.syncCursor) }
        if (r is ApiResult.Success && r.value.ok) {
            prefs.setCursor(r.value.cursor)
            prefs.setCoins(r.value.coins)
        }
    }

    fun pendingCount(userId: Int): Flow<Int> = outbox.count(userId)

    companion object {
        const val BATCH = 200

        fun schedule(context: Context) {
            val req = OneTimeWorkRequestBuilder<SyncWorker>()
                .setConstraints(Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build())
                .build()
            WorkManager.getInstance(context).enqueueUniqueWork("sync", ExistingWorkPolicy.KEEP, req)
        }
    }
}

/** What the signed-in (or guest) student may use, from api/v2/entitlements.php. Everything is open if the server cannot be asked. */
@Singleton
class EntitlementsRepository @Inject constructor(
    private val api: ApiService,
    private val prefs: Prefs,
    private val json: Json,
) {
    val current: Flow<EntitlementsDto> = prefs.state.map { s ->
        runCatching { json.decodeFromString<EntitlementsDto>(s.entitlementsJson) }.getOrDefault(EntitlementsDto())
    }.distinctUntilChanged()

    suspend fun refresh() {
        val r = apiCall(json) { api.entitlements() }
        if (r is ApiResult.Success && r.value.ok) prefs.setEntitlements(json.encodeToString(r.value))
    }

    companion object {
        /** A feature is allowed unless the server says false for it. */
        fun EntitlementsDto.allows(feature: String): Boolean = unlocked || features[feature] != false
    }
}
