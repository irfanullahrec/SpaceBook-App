package pk.wantuch.spacebook.screenshots

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onRoot
import com.github.takahirom.roborazzi.captureRoboImage
import kotlinx.serialization.json.Json
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.ui.games.GamePage
import pk.wantuch.spacebook.ui.games.GamesPanel
import pk.wantuch.spacebook.ui.library.LibraryContent
import pk.wantuch.spacebook.ui.library.SubjectContent
import pk.wantuch.spacebook.ui.me.MeContent
import pk.wantuch.spacebook.ui.practice.PracticeScreen
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme
import java.io.File

/** Pictures of the other main screens, drawn on the PC with the real catalog (app/build/screenshots/). */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [35], qualifiers = "w411dp-h900dp-xxhdpi")
class ScreensScreenshotTest {
    @get:Rule val rule = createComposeRule()

    private val catalog: Catalog = Json { ignoreUnknownKeys = true }.decodeFromString(File("src/main/assets/app_catalog.json").readText())
    private val math5 = catalog.subject("cls5-math")!!
    private val reading = mapOf("cls5-math" to ReadingPosition("cls5-math", "cls5", 1, math5.chapters[1].t, 3, 9, 1L))

    private fun shot(name: String, dark: Boolean = false, content: @Composable () -> Unit) {
        rule.setContent {
            SpaceBookTheme(themeMode = if (dark) 2 else 1, fontScalePercent = 100) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) { content() }
            }
        }
        rule.onRoot().captureRoboImage("build/screenshots/$name.png")
        assertTrue(File("build/screenshots/$name.png").length() > 5_000)
    }

    @Test fun library() = shot("library") { LibraryContent(catalog.classes, "cls5", reading, {}, {}, {}) }

    @Test fun subject() = shot("subject") { SubjectContent(math5, catalog.cls("cls5"), reading["cls5-math"], {}, {}) }

    @Test fun practice() = shot("practice") { PracticeScreen { _, _ -> } }

    @Test fun meSignedIn() = shot("me-signed-in") {
        MeContent(UserDto(3, "Ayesha Khan", "Imran Khan", "student", "03001234567"), 128, catalog.classes, "cls5", {}, {}, {}, {}, {}, {})
    }

    @Test fun meGuestDark() = shot("me-guest-dark", dark = true) {
        MeContent(null, 4, catalog.classes, "", {}, {}, {}, {}, {}, {})
    }

    @Test fun gamesTabPlaceholder() = shot("games-tab") {
        GamesPanel(GamePage("cls5", "cls5-math", "Mathematics", 1, "2 HCF and LCM", 3, "some page text"), onStep = { _, _, _ -> })
    }
}
