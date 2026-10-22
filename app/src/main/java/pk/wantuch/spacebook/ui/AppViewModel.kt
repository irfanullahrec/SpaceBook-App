package pk.wantuch.spacebook.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import pk.wantuch.spacebook.data.AppState
import pk.wantuch.spacebook.data.Prefs
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.Endpoint
import pk.wantuch.spacebook.data.remote.EntitlementsDto
import pk.wantuch.spacebook.data.repo.AuthRepository
import pk.wantuch.spacebook.data.repo.CatalogRepository
import pk.wantuch.spacebook.data.repo.EntitlementsRepository
import pk.wantuch.spacebook.data.repo.SyncRepository
import javax.inject.Inject

/** App-wide state shared by every screen: who is signed in, settings, the catalog, what the plan allows. */
@HiltViewModel
class AppViewModel @Inject constructor(
    private val prefs: Prefs,
    private val endpoint: Endpoint,
    private val catalogRepo: CatalogRepository,
    private val entitlementsRepo: EntitlementsRepository,
    private val sync: SyncRepository,
    private val auth: AuthRepository,
) : ViewModel() {

    val state: StateFlow<AppState> = prefs.state.stateIn(viewModelScope, SharingStarted.Eagerly, AppState())
    val catalog: StateFlow<Catalog?> = catalogRepo.catalog
    val entitlements: StateFlow<EntitlementsDto> =
        entitlementsRepo.current.stateIn(viewModelScope, SharingStarted.Eagerly, EntitlementsDto())

    /** false until the first stored settings are applied to the network layer (nothing is requested before that) */
    var started = false
        private set

    init {
        viewModelScope.launch {
            applyNetwork(prefs.state.first())
            started = true
            // the bundled catalog shows at once; the site's newer one replaces it when it arrives
            launch { catalogRepo.load() }
            launch { entitlementsRepo.refresh() }
            launch { sync.flush() }
            prefs.state.collect { applyNetwork(it) }
        }
    }

    private var lastBase: String? = null
    private fun applyNetwork(s: AppState) {
        endpoint.token = s.device?.token.orEmpty()
        if (lastBase != s.baseUrlOverride) {
            val first = lastBase == null
            lastBase = s.baseUrlOverride
            endpoint.override(s.baseUrlOverride)
            if (!first) viewModelScope.launch { catalogRepo.refresh(); entitlementsRepo.refresh() }
        }
    }

    fun refresh() {
        viewModelScope.launch {
            launch { catalogRepo.refresh() }
            launch { entitlementsRepo.refresh() }
            launch { sync.flush() }
        }
    }

    fun setClass(id: String) = viewModelScope.launch { prefs.setClass(id) }
    fun setTheme(mode: Int) = viewModelScope.launch { prefs.setTheme(mode) }
    fun setFontScale(percent: Int) = viewModelScope.launch { prefs.setFontScale(percent) }

    /** @return false when [raw] is not an address the app may use (https, or http to this PC only) */
    fun setBaseUrl(raw: String): Boolean {
        val ok = raw.isBlank() || Endpoint().override(raw)
        if (ok) viewModelScope.launch { prefs.setBaseUrl(raw.trim()) }
        return ok
    }

    fun logout() = viewModelScope.launch { auth.logout() }

    fun siteUrl(path: String): String = endpoint.absolute(path)
}
