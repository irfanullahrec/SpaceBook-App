package pk.wantuch.spacebook.data.offline

import android.content.Context
import androidx.work.Constraints
import androidx.work.Data
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.OutOfQuotaPolicy
import androidx.work.WorkManager
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import pk.wantuch.spacebook.work.DownloadWorker
import javax.inject.Inject
import javax.inject.Singleton

/** content/offline_map.json (built by tools/build/make_offline.js): every file a book needs, with its hash and size. */
@Serializable
data class OfflineMap(
    val schema: String = "",
    val files: Map<String, OffFile> = emptyMap(),
    val assets: Map<String, OffAsset> = emptyMap(),
    val subjects: Map<String, OffSubject> = emptyMap(),
)

@Serializable
data class OffFile(val v: String = "", val bytes: Long = 0, val sha256: String = "")

@Serializable
data class OffAsset(val bytes: Long = 0)

@Serializable
data class OffSubject(
    val classId: String = "",
    val name: String = "",
    val files: List<String> = emptyList(),
    val assets: List<String> = emptyList(),
    val bytes: Long = 0,
)

/** One file to have on the phone. */
data class DownloadItem(val path: String, val v: String?, val sha256: String?, val bytes: Long)

/** What a class or a book needs, and how much of it is already here. */
data class OfflineStat(val totalBytes: Long, val doneBytes: Long, val files: Int, val missingFiles: Int) {
    val complete get() = files > 0 && missingFiles == 0
    val fraction get() = if (totalBytes <= 0) 0f else (doneBytes.toFloat() / totalBytes).coerceIn(0f, 1f)
}

data class DownloadProgress(
    val label: String,
    val doneBytes: Long,
    val totalBytes: Long,
    val failed: Int = 0,
    val finished: Boolean = false,
)

@Singleton
class OfflineRepository @Inject constructor(
    @ApplicationContext private val context: Context,
    private val store: SiteStore,
    private val json: Json,
) {
    @Volatile private var cached: OfflineMap? = null

    private val _progress = MutableStateFlow<DownloadProgress?>(null)
    /** the running (or just finished) download; null when none has run since the app started */
    val progress: StateFlow<DownloadProgress?> = _progress.asStateFlow()
    fun report(p: DownloadProgress?) { _progress.value = p }

    private val _revision = MutableStateFlow(0)
    /** bumps whenever files were added or removed, so screens re-count what is on the phone */
    val revision: StateFlow<Int> = _revision.asStateFlow()
    fun touch() { _revision.value += 1 }

    /** The map of books: the site's current one when it can be reached, else the copy on the phone (shipped in the app at first). */
    suspend fun map(refresh: Boolean = false): OfflineMap = withContext(Dispatchers.IO) {
        if (refresh) store.download("content/offline_map.json", null, quickTimeout = true, force = true)
        cached?.takeIf { !refresh } ?: run {
            val parsed = store.open("content/offline_map.json", null)?.use { runCatching { json.decodeFromString<OfflineMap>(it.bufferedReader().readText()) }.getOrNull() }
            (parsed ?: OfflineMap()).also { cached = it }
        }
    }

    /** Everything the given books need (their files and pictures), once each, in a stable order. */
    fun items(map: OfflineMap, subjectIds: Collection<String>): List<DownloadItem> {
        val out = LinkedHashMap<String, DownloadItem>()
        for (id in subjectIds) {
            val s = map.subjects[id] ?: continue
            for (src in s.files) {
                val f = map.files[src] ?: continue
                out.putIfAbsent(src, DownloadItem(src, f.v.ifEmpty { null }, f.sha256.ifEmpty { null }, f.bytes))
            }
            for (a in s.assets) out.putIfAbsent(a, DownloadItem(a, null, null, map.assets[a]?.bytes ?: 0))
        }
        return out.values.toList()
    }

    fun subjectIdsOfClass(map: OfflineMap, classId: String): List<String> =
        map.subjects.filter { it.value.classId == classId && (it.value.files.isNotEmpty()) }.keys.toList()

    fun allSubjectIds(map: OfflineMap): List<String> = map.subjects.filter { it.value.files.isNotEmpty() }.keys.toList()

    fun stat(map: OfflineMap, subjectIds: Collection<String>): OfflineStat {
        val items = items(map, subjectIds)
        var total = 0L; var done = 0L; var missing = 0
        for (i in items) {
            total += i.bytes
            if (store.has(i.path, i.v)) done += i.bytes else missing++
        }
        return OfflineStat(total, done, items.size, missing)
    }

    /** Removes the books of [subjectIds] from the phone (not the shell, and not files another book still needs). */
    suspend fun remove(map: OfflineMap, subjectIds: Collection<String>) = withContext(Dispatchers.IO) {
        val keep = map.subjects.filterKeys { it !in subjectIds }.keys
        val stillNeeded = items(map, keep).map { it.path }.toHashSet()
        items(map, subjectIds).filter { it.path !in stillNeeded }.forEach { store.delete(it.path, it.v) }
        touch()
    }

    /** Starts (or joins) the background download of [subjectIds]; progress shows in [progress] and in a notification. */
    fun start(subjectIds: Collection<String>, label: String) {
        val data = Data.Builder()
            .putString(DownloadWorker.KEY_SUBJECTS, subjectIds.joinToString(","))
            .putString(DownloadWorker.KEY_LABEL, label)
            .build()
        val req = OneTimeWorkRequestBuilder<DownloadWorker>()
            .setInputData(data)
            .setConstraints(Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build())
            .setExpedited(OutOfQuotaPolicy.RUN_AS_NON_EXPEDITED_WORK_REQUEST)
            .build()
        _progress.value = DownloadProgress(label, 0, 0)
        WorkManager.getInstance(context).enqueueUniqueWork("offline-download", ExistingWorkPolicy.KEEP, req)
    }

    fun cancel() {
        WorkManager.getInstance(context).cancelUniqueWork("offline-download")
        _progress.value = null
    }

    fun usedBytes(): Long = store.usedBytes()
}
