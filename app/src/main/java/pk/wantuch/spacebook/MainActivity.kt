package pk.wantuch.spacebook

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import dagger.hilt.android.AndroidEntryPoint
import pk.wantuch.spacebook.expiry.ExpiryGate
import pk.wantuch.spacebook.expiry.LockState
import pk.wantuch.spacebook.ui.AppNav
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.lock.LockScreen
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private val app: AppViewModel by viewModels()
    private lateinit var gate: ExpiryGate
    private var lock: LockState by mutableStateOf(LockState.Open)
    /** a notification asked for a screen ("plan"): AppNav goes there once and clears it */
    private var openRequest: String? by mutableStateOf(null)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // a release build that is not the owner's (wrong certificate, debugger attached) does not start
        if (!pk.wantuch.spacebook.security.Integrity.ok(this)) { finishAndRemoveTask(); return }
        // no screenshots, screen recordings or app-switcher thumbnails of the books in a release build
        if (!pk.wantuch.spacebook.BuildConfig.DEBUG) window.setFlags(android.view.WindowManager.LayoutParams.FLAG_SECURE, android.view.WindowManager.LayoutParams.FLAG_SECURE)
        enableEdgeToEdge()
        gate = ExpiryGate.forApp(this)
        lock = gate.check()
        openRequest = intent?.getStringExtra(EXTRA_OPEN)
        setContent {
            val state by app.state.collectAsStateWithLifecycle()
            SpaceBookTheme(themeMode = state.themeMode, fontScalePercent = state.fontScale) {
                Surface(Modifier.fillMaxSize(), color = androidx.compose.material3.MaterialTheme.colorScheme.background) {
                    val locked = lock as? LockState.Locked
                    if (locked != null) LockScreen(locked.expiredAt) { code ->
                        gate.tryUnlock(code).also { lock = gate.check() }
                    } else AppNav(app, openRequest = openRequest, onOpenHandled = { openRequest = null })
                }
            }
        }
    }

    override fun onNewIntent(intent: android.content.Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        openRequest = intent.getStringExtra(EXTRA_OPEN)
    }

    companion object { const val EXTRA_OPEN = "open" }

    /** a phone left open for days must lock when the date passes, not only at the next cold start */
    override fun onResume() {
        super.onResume()
        lock = gate.check()
    }
}
