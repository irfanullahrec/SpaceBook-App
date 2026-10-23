package pk.wantuch.spacebook.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import pk.wantuch.spacebook.data.Prefs
import pk.wantuch.spacebook.data.prep.PrepReader
import pk.wantuch.spacebook.data.prep.PrepSnapshot
import javax.inject.Inject

/** Home shows what the student has started: Test Preps (PST, CT, SST ...) and Study Plans, with practice and statistics. */
@HiltViewModel
class HomeViewModel @Inject constructor(
    private val reader: PrepReader,
    private val prefs: Prefs,
) : ViewModel() {

    /** null until the first read has finished */
    private val _prep = MutableStateFlow<PrepSnapshot?>(null)
    val prep: StateFlow<PrepSnapshot?> = _prep

    private val _refreshing = MutableStateFlow(false)
    val refreshing: StateFlow<Boolean> = _refreshing

    init { refresh() }

    /** read the website's records again: on every return to Home, after practising, and on pull-to-refresh */
    fun refresh() {
        viewModelScope.launch {
            _refreshing.value = true
            val user = prefs.state.first().user
            val hints = listOfNotNull(user?.id?.toString(), user?.name?.takeIf { it.isNotBlank() })
            reader.read(hints)?.let { _prep.value = it }
            if (_prep.value == null) _prep.value = PrepSnapshot()       // unreadable: show the empty Home rather than a spinner for ever
            _refreshing.value = false
        }
    }
}
