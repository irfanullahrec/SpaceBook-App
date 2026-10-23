package pk.wantuch.spacebook.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import pk.wantuch.spacebook.data.Prefs
import pk.wantuch.spacebook.data.local.Reaction
import pk.wantuch.spacebook.data.local.ReactionDao
import pk.wantuch.spacebook.data.local.ReadingDao
import pk.wantuch.spacebook.data.play.PlayState
import pk.wantuch.spacebook.data.play.PlayStore
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.repo.CatalogRepository
import javax.inject.Inject

@HiltViewModel
class HomeViewModel @Inject constructor(
    catalogRepo: CatalogRepository,
    prefs: Prefs,
    readingDao: ReadingDao,
    private val reactionDao: ReactionDao,
    private val playStore: PlayStore,
) : ViewModel() {

    private val classId = prefs.state.map { it.classId }.distinctUntilChanged()

    val feed: StateFlow<List<FeedPost>> = combine(catalogRepo.catalog, classId, readingDao.recent(4)) { catalog, cls, reading ->
        buildFeed(catalog, effectiveClass(cls, catalog), reading, (System.currentTimeMillis() / 86_400_000L).toInt())
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    val reactions: StateFlow<Map<String, Reaction>> = reactionDao.all()
        .map { list -> list.associateBy { it.cardId } }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyMap())

    /** XP, streak and today's mission (kept on this phone) */
    val play: StateFlow<PlayState> = playStore.state.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), PlayState())

    /** the XP in the daily chest once it has been opened, null while the chest is still closed */
    private val _chestReward = MutableStateFlow<Int?>(null)
    val chestReward: StateFlow<Int?> = _chestReward

    fun openChest() { viewModelScope.launch { _chestReward.value = playStore.openChest() } }
    fun closeChest() { _chestReward.value = null }

    /** Until the student picks a class, the feed shows the first one so Home is never empty. */
    fun effectiveClass(chosen: String, catalog: Catalog?): String =
        if (chosen.isNotBlank() && catalog?.cls(chosen) != null) chosen else catalog?.classes?.firstOrNull()?.id.orEmpty()

    fun toggleLike(id: String) = viewModelScope.launch {
        val r = reactions.value[id] ?: Reaction(id, liked = false, saved = false)
        reactionDao.set(r.copy(liked = !r.liked))
    }

    fun toggleSave(id: String) = viewModelScope.launch {
        val r = reactions.value[id] ?: Reaction(id, liked = false, saved = false)
        reactionDao.set(r.copy(saved = !r.saved))
    }
}
