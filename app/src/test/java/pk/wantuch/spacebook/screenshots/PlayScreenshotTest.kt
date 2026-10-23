package pk.wantuch.spacebook.screenshots

import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onRoot
import com.github.takahirom.roborazzi.captureRoboImage
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode
import pk.wantuch.spacebook.data.play.McqBank
import pk.wantuch.spacebook.expiry.UnlockResult
import pk.wantuch.spacebook.ui.lock.LockScreen
import pk.wantuch.spacebook.ui.play.QuizContent
import pk.wantuch.spacebook.ui.play.QuizUi
import pk.wantuch.spacebook.ui.play.ReelCard
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme
import java.io.File
import kotlin.random.Random

/** The quiz, Swipe & Learn and the expiry lock drawn on the PC with the real question bank (pictures in app/build/screenshots/). */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [35], qualifiers = "w411dp-h900dp-xxhdpi")
class PlayScreenshotTest {
    @get:Rule val rule = createComposeRule()

    private val bank = McqBank.parse(File("src/main/assets/mcq_bank.json").readText())
    private val qs = bank.pick(6, 5, Random(11))

    private fun shot(name: String, dark: Boolean = false, content: @androidx.compose.runtime.Composable () -> Unit) {
        rule.setContent { SpaceBookTheme(themeMode = if (dark) 2 else 1, fontScalePercent = 100) { content() } }
        rule.onRoot().captureRoboImage("build/screenshots/$name.png")
        assertTrue(File("build/screenshots/$name.png").length() > 8_000)
    }

    @androidx.compose.runtime.Composable private fun quiz(ui: QuizUi) = QuizContent(ui, onPick = {}, onNext = {}, onAgain = {}, onBack = {}, onReels = {})

    @Test fun quizQuestion() = shot("quiz-question") { quiz(QuizUi(loading = false, questions = qs, index = 1, combo = 0, xpGained = 12)) }
    @Test fun quizRight() = shot("quiz-right") { quiz(QuizUi(loading = false, questions = qs, index = 2, picked = qs[2].answer, correct = 3, combo = 3, xpGained = 32)) }
    @Test fun quizWrong() = shot("quiz-wrong") { quiz(QuizUi(loading = false, questions = qs, index = 0, picked = (qs[0].answer + 1) % qs[0].options.size, xpGained = 2)) }
    @Test fun quizResult() = shot("quiz-result") { quiz(QuizUi(loading = false, questions = qs, index = 4, picked = 0, correct = 4, finished = true, xpGained = 62)) }
    @Test fun reelQuestion() = shot("reel-question") { ReelCard(qs[3], picked = null, page = 4, onPick = {}) }
    @Test fun reelAnswered() = shot("reel-answered") { ReelCard(qs[1], picked = (qs[1].answer + 1) % qs[1].options.size, page = 2, onPick = {}) }
    @Test fun lock() = shot("lock", dark = true) { LockScreen(expiredAt = 1_790_000_000_000L) { UnlockResult.Wrong(3) } }
}
