package pk.wantuch.spacebook.data.reminders

import android.Manifest
import android.annotation.SuppressLint
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import androidx.hilt.work.HiltWorker
import androidx.webkit.WebViewCompat
import androidx.webkit.WebViewFeature
import androidx.work.CoroutineWorker
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.ExistingWorkPolicy
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import androidx.work.workDataOf
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.withContext
import kotlinx.coroutines.withTimeoutOrNull
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import pk.wantuch.spacebook.MainActivity
import pk.wantuch.spacebook.R
import pk.wantuch.spacebook.data.Prefs
import pk.wantuch.spacebook.data.offline.SiteStore
import pk.wantuch.spacebook.data.remote.Endpoint
import java.io.ByteArrayInputStream
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton

/** One reminder, as the website's study plan makes it (js/sb_study_plan.js SBStudyPlan.reminders): [at] is in milliseconds. */
@Serializable
data class Reminder(val key: String, val at: Long, val title: String, val body: String, val planId: String = "", val sessionId: String = "")

/**
 * Study-plan reminders as phone notifications. A browser shows a reminder through the Notification API, which a WebView does not have, so the
 * app does it itself: it asks the website's own code (SBStudyPlan.reminders, in a page nobody sees) which reminders the student's plans want in
 * the next week, and schedules each one as a WorkManager job that posts a notification at its time. The words are the website's. Nothing is
 * sent anywhere. Android may delay a job by a few minutes when the phone is dozing; a daily refresh also covers a phone that was switched off.
 */
@Singleton
class ReminderScheduler @Inject constructor(
    @ApplicationContext private val context: Context,
    private val reader: ReminderReader,
    private val prefs: Prefs,
) {
    /** Reads the plans and replaces what is scheduled. Off: everything scheduled is cancelled. A page that could not be read leaves things as they were. */
    suspend fun refresh(): Int {
        val wm = WorkManager.getInstance(context)
        if (!prefs.state.first().remindersOn) { cancel(); return 0 }
        wm.enqueueUniquePeriodicWork(DAILY, ExistingPeriodicWorkPolicy.KEEP, PeriodicWorkRequestBuilder<ReminderRefreshWorker>(1, TimeUnit.DAYS).build())
        val list = reader.read() ?: return -1
        wm.cancelAllWorkByTag(TAG)
        val now = System.currentTimeMillis()
        for (r in list) {
            val wait = r.at - now
            if (wait <= 0) continue
            val req = OneTimeWorkRequestBuilder<ReminderWorker>()
                .setInitialDelay(wait, TimeUnit.MILLISECONDS).addTag(TAG)
                .setInputData(workDataOf("key" to r.key, "title" to r.title, "body" to r.body)).build()
            wm.enqueueUniqueWork("reminder:" + r.key, ExistingWorkPolicy.REPLACE, req)
        }
        return list.size
    }

    fun cancel() {
        val wm = WorkManager.getInstance(context)
        wm.cancelAllWorkByTag(TAG)
        wm.cancelUniqueWork(DAILY)
    }

    companion object {
        const val TAG = "study-reminder"
        const val DAILY = "study-reminder-refresh"
        const val CHANNEL = "study_reminders"

        fun canNotify(context: Context): Boolean =
            Build.VERSION.SDK_INT < 33 || ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED

        /** Posts one reminder now (a tap opens the app on the Plan tab). Silent when the phone has not allowed notifications. */
        fun notify(context: Context, key: String, title: String, body: String) {
            if (!canNotify(context)) return
            val nm = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(CHANNEL) == null) {
                nm.createNotificationChannel(NotificationChannel(CHANNEL, "Study reminders", NotificationManager.IMPORTANCE_HIGH).apply { description = "It is time for a session of your study plan" })
            }
            val open = PendingIntent.getActivity(
                context, key.hashCode(), Intent(context, MainActivity::class.java).putExtra(MainActivity.EXTRA_OPEN, "plan").addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
                PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
            )
            nm.notify(key.hashCode(), NotificationCompat.Builder(context, CHANNEL)
                .setSmallIcon(R.mipmap.ic_launcher).setContentTitle(title).setContentText(body.lineSequence().firstOrNull().orEmpty())
                .setStyle(NotificationCompat.BigTextStyle().bigText(body)).setContentIntent(open).setAutoCancel(true)
                .setCategory(NotificationCompat.CATEGORY_REMINDER).setPriority(NotificationCompat.PRIORITY_HIGH).build())
        }
    }
}

@HiltWorker
class ReminderWorker @AssistedInject constructor(@Assisted context: Context, @Assisted params: WorkerParameters) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result {
        ReminderScheduler.notify(applicationContext, inputData.getString("key").orEmpty(), inputData.getString("title").orEmpty(), inputData.getString("body").orEmpty())
        return Result.success()
    }
}

/** Once a day: read the plans again (plans change, the phone may have been off) and schedule the coming week. */
@HiltWorker
class ReminderRefreshWorker @AssistedInject constructor(@Assisted context: Context, @Assisted params: WorkerParameters, private val scheduler: ReminderScheduler) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result { scheduler.refresh(); return Result.success() }
}

/**
 * Asks the website's study plan which reminders are due in the next week. The website's start page (lazy.html, a few seconds of the phone's
 * time, no book data) is loaded in a WebView nobody sees, with `window.SB_BACKGROUND_READ` set so the page shows and marks nothing, and every
 * request to the server's API is refused so nothing is sent or changed. The page's own plans come from the same browser storage the Plan tab
 * writes to.
 */
@Singleton
class ReminderReader @Inject constructor(
    @ApplicationContext private val context: Context,
    private val endpoint: Endpoint,
    private val store: SiteStore,
    private val json: Json,
) {
    @SuppressLint("SetJavaScriptEnabled")
    suspend fun read(): List<Reminder>? = withContext(Dispatchers.Main) {
        val loaded = CompletableDeferred<Boolean>()
        val wv = WebView(context)
        try {
            wv.settings.javaScriptEnabled = true
            wv.settings.domStorageEnabled = true
            wv.settings.allowFileAccess = false
            val flag = "window.SB_BACKGROUND_READ = true;"
            if (WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) WebViewCompat.addDocumentStartJavaScript(wv, flag, setOf("*"))
            wv.webViewClient = object : WebViewClient() {
                override fun onPageStarted(view: WebView, url: String, favicon: android.graphics.Bitmap?) { view.evaluateJavascript(flag, null) }
                override fun onPageFinished(view: WebView, url: String) { loaded.complete(true) }
                override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? {
                    if (request.url.path?.contains("/api/") == true) return WebResourceResponse("application/json", "utf-8", 503, "Not here", emptyMap(), ByteArrayInputStream("{}".toByteArray()))
                    return store.intercept(request)
                }
            }
            wv.loadUrl(endpoint.absolute("lazy.html"))
            if (withTimeoutOrNull(20_000) { loaded.await() } != true) return@withContext null
            // the page's scripts run after it finishes loading: wait for the study plan to be there
            var raw: String? = null
            val deadline = System.currentTimeMillis() + 15_000
            while (raw == null && System.currentTimeMillis() < deadline) {
                val got = CompletableDeferred<String?>()
                wv.evaluateJavascript("(function(){return (window.SBStudyPlan&&SBStudyPlan.reminders)?JSON.stringify(SBStudyPlan.reminders(7)):null})()") { got.complete(it) }
                val v = got.await()
                if (v != null && v != "null") raw = v else delay(400)
            }
            parse(raw ?: return@withContext null)
        } finally {
            wv.stopLoading(); wv.destroy()
        }
    }

    fun parse(literal: String): List<Reminder>? = ReminderCodec.parse(json, literal)
}

object ReminderCodec {
    /** What evaluateJavascript hands back for JSON.stringify(...): a JSON string literal holding the list. "null" and anything else is no answer. */
    fun parse(json: Json, literal: String): List<Reminder>? = runCatching {
        val inner = json.decodeFromString<String>(literal)
        json.decodeFromString<List<Reminder>>(inner)
    }.getOrNull()
}
