package pk.wantuch.spacebook

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import dagger.hilt.android.AndroidEntryPoint
import pk.wantuch.spacebook.ui.AppNav
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private val app: AppViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val state by app.state.collectAsStateWithLifecycle()
            SpaceBookTheme(themeMode = state.themeMode, fontScalePercent = state.fontScale) {
                Surface(Modifier.fillMaxSize(), color = androidx.compose.material3.MaterialTheme.colorScheme.background) {
                    AppNav(app)
                }
            }
        }
    }
}
