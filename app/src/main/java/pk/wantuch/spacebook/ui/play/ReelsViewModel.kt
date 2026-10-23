package pk.wantuch.spacebook.ui.play

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import pk.wantuch.spacebook.data.Prefs
import pk.wantuch.spacebook.data.play.Mcq
import pk.wantuch.spacebook.data.play.McqBankSource
import pk.wantuch.spacebook.data.play.PlayStore
import pk.wantuch.spacebook.data.play.XP_CORRECT
import pk.wantuch.spacebook.data.play.XP_TRY
import pk.wantuch.spacebook.data.play.classNumber
import javax.inject.Inject
import kotlin.random.Random

data class ReelsUi(
    val loading: Boolean = true,
    val items: List<Mcq> = emptyList(),
    /** page -> option chosen */
    val picks: Map<Int, Int> = emptyMap(),
    val inARow: Int = 0,
    val xp: Int = 0,
)

@HiltViewModel
class ReelsViewModel @Inject constructor(
    private val source: McqBankSource,
    private val play: PlayStore,
    private val prefs: Prefs,
) : ViewModel() {
    private val _ui = MutableStateFlow(ReelsUi())
    val ui: StateFlow<ReelsUi> = _ui
    private val random = Random(System.nanoTime())
    private var cls = 6
    private var loadingMore = false

    init {
        viewModelScope.launch {
            cls = classNumber(prefs.state.first().classId).let { if (it > 0) it else 6 }
            _ui.value = ReelsUi(loading = false, items = batch(emptySet()))
        }
    }

    private suspend fun batch(used: Set<Int>): List<Mcq> {
        val bank = source.bank()
        val fresh = bank.pick(cls, 30, random, notIds = used)
        return if (fresh.size >= 10) fresh else bank.pick(cls, 30, random)       // the bank is used up: begin again
    }

    /** more questions are added a few pages before the end, so the swiping never runs out */
    fun more() {
        if (loadingMore) return
        loadingMore = true
        viewModelScope.launch {
            val used = _ui.value.items.map { it.id }.toSet()
            val add = batch(used)
            _ui.update { it.copy(items = it.items + add) }
            loadingMore = false
        }
    }

    fun pick(page: Int, option: Int) {
        val s = _ui.value
        val q = s.items.getOrNull(page) ?: return
        if (s.picks.containsKey(page)) return
        val right = option == q.answer
        _ui.update { it.copy(picks = it.picks + (page to option), inARow = if (right) it.inARow + 1 else 0, xp = it.xp + if (right) XP_CORRECT else XP_TRY) }
        viewModelScope.launch { play.answer(right) }
    }
}
