package pk.wantuch.spacebook.work

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.pm.ServiceInfo
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.hilt.work.HiltWorker
import androidx.work.CoroutineWorker
import androidx.work.ForegroundInfo
import androidx.work.WorkerParameters
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.ensureActive
import kotlinx.coroutines.sync.Semaphore
import kotlinx.coroutines.sync.withPermit
import kotlinx.coroutines.withContext
import pk.wantuch.spacebook.data.offline.DownloadProgress
import pk.wantuch.spacebook.data.offline.OfflineRepository
import pk.wantuch.spacebook.data.offline.SiteStore
import java.util.concurrent.atomic.AtomicInteger
import java.util.concurrent.atomic.AtomicLong

/**
 * Downloads books onto the phone (the files listed in offline_map.json for the chosen books), three at a time, each checked against
 * its hash. Runs as a foreground job with a progress notification so a big download survives the screen turning off.
 */
@HiltWorker
class DownloadWorker @AssistedInject constructor(
    @Assisted context: Context,
    @Assisted params: WorkerParameters,
    private val offline: OfflineRepository,
    private val store: SiteStore,
) : CoroutineWorker(context, params) {

    override suspend fun getForegroundInfo(): ForegroundInfo = info("Downloading books", 0, 0)

    private fun info(text: String, done: Long, total: Long): ForegroundInfo {
        val nm = applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(CHANNEL) == null) {
            nm.createNotificationChannel(NotificationChannel(CHANNEL, "Book downloads", NotificationManager.IMPORTANCE_LOW))
        }
        val n = NotificationCompat.Builder(applicationContext, CHANNEL)
            .setSmallIcon(android.R.drawable.stat_sys_download)
            .setContentTitle("SpaceBook")
            .setContentText(text)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .setProgress(if (total > 0) 1000 else 0, if (total > 0) (done * 1000 / total).toInt() else 0, total <= 0)
            .build()
        return if (Build.VERSION.SDK_INT >= 29) ForegroundInfo(NOTIFICATION_ID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC)
        else ForegroundInfo(NOTIFICATION_ID, n)
    }

    override suspend fun doWork(): Result {
        if (pk.wantuch.spacebook.expiry.ExpiryGate.forApp(applicationContext).check() is pk.wantuch.spacebook.expiry.LockState.Locked) return Result.success()
        val label = inputData.getString(KEY_LABEL) ?: "books"
        val ids = inputData.getString(KEY_SUBJECTS).orEmpty().split(',').filter { it.isNotEmpty() }
        runCatching { setForeground(info("Preparing $label…", 0, 0)) }

        val map = offline.map(refresh = true)
        val wanted = offline.items(map, ids)
        val todo = wanted.filter { !store.has(it.path, it.v) }
        val total = todo.sumOf { it.bytes }
        if (todo.isEmpty()) {
            offline.report(DownloadProgress(label, total, total, finished = true))
            offline.touch()
            return Result.success()
        }

        val done = AtomicLong(0)
        val failed = AtomicInteger(0)
        var lastShown = 0L
        fun publish(force: Boolean = false) {
            val now = System.currentTimeMillis()
            if (!force && now - lastShown < 700) return
            lastShown = now
            offline.report(DownloadProgress(label, done.get(), total, failed.get()))
        }
        publish(true)

        coroutineScope {
            val gate = Semaphore(3)
            todo.map { item ->
                async(Dispatchers.IO) {
                    gate.withPermit {
                        ensureActive()
                        var ok = false
                        var added = 0L
                        for (attempt in 1..3) {
                            added = 0
                            ok = store.download(item.path, item.v, item.sha256) { n -> added += n; done.addAndGet(n); publish() }
                            if (ok) break
                            done.addAndGet(-added)
                            kotlinx.coroutines.delay(400L * attempt)
                        }
                        if (!ok) failed.incrementAndGet()
                        // a file's size in the map is its true size; keep the bar honest even if the count of bytes differs
                        if (ok && added == 0L) done.addAndGet(item.bytes)
                        publish()
                    }
                }
            }.awaitAll()
        }
        setProgressSafe(done.get(), total, label)
        offline.report(DownloadProgress(label, done.get().coerceAtMost(total), total, failed.get(), finished = true))
        offline.touch()
        return if (failed.get() == 0) Result.success() else Result.failure()
    }

    private suspend fun setProgressSafe(done: Long, total: Long, label: String) {
        runCatching { setForeground(info("$label ready", done, total)) }
        withContext(Dispatchers.Default) { }
    }

    companion object {
        const val KEY_SUBJECTS = "subjects"
        const val KEY_LABEL = "label"
        private const val CHANNEL = "downloads"
        private const val NOTIFICATION_ID = 4101
    }
}
