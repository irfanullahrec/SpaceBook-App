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
import pk.wantuch.spacebook.data.play.McqBankSource
import pk.wantuch.spacebook.data.play.Mcq
import pk.wantuch.spacebook.data.play.PlayStore
import pk.wantuch.spacebook.data.play.XP_CORRECT
import pk.wantuch.spacebook.data.play.XP_STAR
import pk.wantuch.spacebook.data.play.XP_TRY
import pk.wantuch.spacebook.data.play.classNumber
import javax.inject.Inject
import kotlin.random.Random

/** Everything the Quick Quiz screen shows. */
data class QuizUi(
    val loading: Boolean = true,
    val questions: List<Mcq> = emptyList(),
    val index: Int = 0,
    /** the option chosen for the current question, null before the student answers */
    val picked: Int? = null,
    val correct: Int = 0,
    val combo: Int = 0,
    val finished: Boolean = false,
    val xpGained: Int = 0,
)

const val QUIZ_LENGTH = 5

@HiltViewModel
class QuizViewModel @Inject constructor(
    private val source: McqBankSource,
    private val play: PlayStore,
    private val prefs: Prefs,
) : ViewModel() {

    private val _ui = MutableStateFlow(QuizUi())
    val ui: StateFlow<QuizUi> = _ui

    private var seen = emptySet<Int>()

    init { start() }

    /** a new quiz of [QUIZ_LENGTH] questions from the student's class (new ones each time while the bank lasts) */
    fun start() {
        viewModelScope.launch {
            _ui.value = QuizUi()
            val cls = classNumber(prefs.state.first().classId).let { if (it > 0) it else 6 }
            val qs = source.bank().pick(cls, QUIZ_LENGTH, Random(System.nanoTime()), notIds = seen)
            seen = seen + qs.map { it.id }
            if (seen.size > 120) seen = qs.map { it.id }.toSet()
            _ui.value = QuizUi(loading = false, questions = qs)
        }
    }

    fun pick(option: Int) {
        val s = _ui.value
        val q = s.questions.getOrNull(s.index) ?: return
        if (s.picked != null || s.finished) return
        val right = option == q.answer
        _ui.update { it.copy(picked = option, correct = it.correct + if (right) 1 else 0, combo = if (right) it.combo + 1 else 0, xpGained = it.xpGained + if (right) XP_CORRECT else XP_TRY) }
        viewModelScope.launch { play.answer(right) }
    }

    fun next() {
        val s = _ui.value
        if (s.picked == null) return
        if (s.index >= s.questions.lastIndex) {
            val bonus = s.correct * XP_STAR + if (s.questions.isNotEmpty() && s.correct == s.questions.size) 10 else 0
            _ui.update { it.copy(finished = true, xpGained = it.xpGained + bonus) }
            viewModelScope.launch { play.finishQuiz(s.correct, s.questions.size) }
        } else {
            _ui.update { it.copy(index = it.index + 1, picked = null) }
        }
    }
}
