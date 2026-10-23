package pk.wantuch.spacebook

import android.app.Application
import androidx.hilt.work.HiltWorkerFactory
import androidx.work.Configuration
import dagger.hilt.android.HiltAndroidApp
import javax.inject.Inject

@HiltAndroidApp
class SpaceBookApp : Application(), Configuration.Provider {
    @Inject lateinit var workerFactory: HiltWorkerFactory
    @Inject lateinit var siteStore: pk.wantuch.spacebook.data.offline.SiteStore

    override fun onCreate() {
        super.onCreate()
        // books an older version left on the phone as plain files are encrypted now, quietly, in the background
        Thread({ runCatching { siteStore.migrate() } }, "vault-migrate").apply { priority = Thread.MIN_PRIORITY; isDaemon = true; start() }
    }

    override val workManagerConfiguration: Configuration
        get() = Configuration.Builder().setWorkerFactory(workerFactory).build()
}
