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

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        gate = ExpiryGate.forApp(this)
        lock = gate.check()
        setContent {
            val state by app.state.collectAsStateWithLifecycle()
            SpaceBookTheme(themeMode = state.themeMode, fontScalePercent = state.fontScale) {
                Surface(Modifier.fillMaxSize(), color = androidx.compose.material3.MaterialTheme.colorScheme.background) {
                    val locked = lock as? LockState.Locked
                    if (locked != null) LockScreen(locked.expiredAt) { code ->
                        gate.tryUnlock(code).also { lock = gate.check() }
                    } else AppNav(app)
                }
            }
        }
    }

    /** a phone left open for days must lock when the date passes, not only at the next cold start */
    override fun onResume() {
        super.onResume()
        lock = gate.check()
    }
}
