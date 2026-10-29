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
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.ui.library.LibraryContent
import pk.wantuch.spacebook.ui.theme.SpaceBookTheme
import java.io.File

/** The Library with the Munawar series chosen, drawn with the real catalog (app/build/screenshots/library-munawar*.png). */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [35], qualifiers = "w411dp-h900dp-xxhdpi")
class BoardScreenshotTest {
    @get:Rule val rule = createComposeRule()

    private val catalog: Catalog = Json { ignoreUnknownKeys = true }.decodeFromString(File("src/main/assets/app_catalog.json").readText())

    private fun shot(name: String, content: @Composable () -> Unit) {
        rule.setContent {
            SpaceBookTheme(themeMode = 1, fontScalePercent = 100) {
                Surface(Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) { content() }
            }
        }
        rule.onRoot().captureRoboImage("build/screenshots/$name.png")
        assertTrue(File("build/screenshots/$name.png").length() > 5_000)
    }

    @Test fun theCatalogCarriesTheSeriesAndItsBooks() {
        assertTrue(catalog.seriesIds().contains("munawar"))
        assertTrue(catalog.cls("cls1")!!.subjects.count { it.series == "munawar" } == 11)
        assertTrue(catalog.cls("cls2")!!.subjects.count { it.series == "munawar" } == 10)
        assertTrue(catalog.cls("cls4")!!.subjects.count { it.series == "munawar" } == 10)
        assertTrue(catalog.cls("cls5")!!.subjects.none { it.series.isNotEmpty() })
        assertTrue(catalog.subject("cls1-mun-math")!!.chapters.size == 6)
    }

    @Test fun libraryMunawar() = shot("library-munawar") {
        LibraryContent(catalog.classes, "cls1", emptyMap(), {}, {}, {}, series = "munawar", seriesName = "Munawar")
    }

    @Test fun libraryGovernmentWithTheBoardBar() = shot("library-government-board-bar") {
        LibraryContent(catalog.classes, "cls3", emptyMap(), {}, {}, {})
    }
}
