package pk.wantuch.spacebook.work

import android.content.Context
import androidx.hilt.work.HiltWorker
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import dagger.assisted.Assisted
import dagger.assisted.AssistedInject
import pk.wantuch.spacebook.data.repo.SyncRepository

/** Sends waiting events to the site. WorkManager retries with back-off while the answer is "not yet". */
@HiltWorker
class SyncWorker @AssistedInject constructor(
    @Assisted context: Context,
    @Assisted params: WorkerParameters,
    private val sync: SyncRepository,
) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result =
        if (sync.flush()) Result.success() else if (runAttemptCount < 8) Result.retry() else Result.failure()
}
