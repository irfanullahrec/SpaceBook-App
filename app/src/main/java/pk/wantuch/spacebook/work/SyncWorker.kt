package pk.wantuch.spacebook.work

import android.content.Context
import androidx.hilt.work.HiltWorker
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import pk.wantuch.spacebook.data.repo.SyncRepository
import pk.wantuch.spacebook.expiry.AccessGate
import pk.wantuch.spacebook.expiry.LockState

/** Sends waiting events to the site. WorkManager retries with back-off while the answer is "not yet". */
@HiltWorker
class SyncWorker @AssistedInject constructor(
    @Assisted context: Context,
    @Assisted params: WorkerParameters,
    private val sync: SyncRepository,
) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result =
        if (AccessGate.forApp(applicationContext).check() is LockState.Locked) Result.success()   // a locked app (trial over, or an expired preview) does nothing in the background
        else if (sync.flush()) Result.success() else if (runAttemptCount < 8) Result.retry() else Result.failure()
}
