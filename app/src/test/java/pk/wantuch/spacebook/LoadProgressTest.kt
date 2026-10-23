package pk.wantuch.spacebook

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import pk.wantuch.spacebook.ui.components.LoadProgress

/** The percent on the loading screens only goes up, uses the real page progress first, and never says 100 before the page is open. */
class LoadProgressTest {
    @Test fun theFirstSixtyPercentIsTheRealPageLoad() {
        assertEquals(0, LoadProgress.percent(0, false, 0))
        assertEquals(30, LoadProgress.percent(50, false, 0))
        assertEquals(60, LoadProgress.percent(100, false, 0))
    }

    @Test fun afterwardsItClimbsAndSlowsDownButNeverReaches100() {
        var last = 0
        for (ms in listOf(0L, 300, 1000, 2000, 5000, 20_000, 600_000)) {
            val p = LoadProgress.percent(100, true, ms)
            assertTrue("$ms ms: $p after $last", p >= last)
            assertTrue(p in 60..98)
            last = p
        }
        assertEquals(98, LoadProgress.percent(100, true, 600_000))
    }

    @Test fun badInputIsClamped() {
        assertEquals(0, LoadProgress.percent(-5, false, 0))
        assertEquals(60, LoadProgress.percent(250, false, 0))
        assertEquals(60, LoadProgress.percent(100, true, -100))
    }
}
