package pk.wantuch.spacebook

import android.content.Intent
import android.graphics.Rect
import android.view.ActionMode
import android.view.Menu
import android.view.MenuItem
import android.view.View
import androidx.test.core.app.ApplicationProvider
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.fakes.RoboMenu
import pk.wantuch.spacebook.ui.web.ExportFree

/** The reader's selection bar must not offer Copy, Cut, Share, Paste or other apps' "process text" entries (ui/web/GuardedWebView.kt). */
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [35])
class ExportFreeTest {
    private val context get() = ApplicationProvider.getApplicationContext<android.content.Context>()

    private fun systemBar(): RoboMenu {
        val m = RoboMenu(context)
        m.add(Menu.NONE, android.R.id.copy, 0, "Copy")
        m.add(Menu.NONE, android.R.id.cut, 1, "Cut")
        m.add(Menu.NONE, android.R.id.shareText, 2, "Share")
        m.add(Menu.NONE, android.R.id.paste, 3, "Paste")
        m.add(Menu.NONE, android.R.id.pasteAsPlainText, 4, "Paste as plain text")
        m.add(Menu.NONE, android.R.id.selectAll, 5, "Select all")
        m.add(Menu.NONE, 4242, 6, "Translate").intent = Intent(Intent.ACTION_PROCESS_TEXT)
        m.add(Menu.NONE, 4243, 7, "The app's own entry")
        return m
    }

    private fun titles(m: Menu) = (0 until m.size()).map { m.getItem(it).title.toString() }

    @Test fun `copy, cut, share, paste and other apps' process-text entries are taken out, the rest stays`() {
        val menu = systemBar()
        ExportFree.strip(menu)
        assertEquals(listOf("Select all", "The app's own entry"), titles(menu))
    }

    private class Inner(val add: (Menu) -> Unit) : ActionMode.Callback {
        var created = 0; var clicked = 0; var destroyed = 0
        override fun onCreateActionMode(mode: ActionMode?, menu: Menu): Boolean { created++; add(menu); return true }
        override fun onPrepareActionMode(mode: ActionMode?, menu: Menu): Boolean { add(menu); return true }
        override fun onActionItemClicked(mode: ActionMode?, item: MenuItem): Boolean { clicked++; return true }
        override fun onDestroyActionMode(mode: ActionMode?) { destroyed++ }
    }

    @Test fun `a wrapped callback strips what the system adds, on create and on prepare, and still delegates`() {
        val inner = Inner { m -> m.add(Menu.NONE, android.R.id.copy, 0, "Copy"); m.add(Menu.NONE, 7, 1, "Keep") }
        val wrapped = ExportFree.wrap(inner)!!
        val menu = RoboMenu(context)
        assertTrue(wrapped.onCreateActionMode(null, menu))
        assertEquals(listOf("Keep"), titles(menu))
        wrapped.onPrepareActionMode(null, menu)
        assertEquals(listOf("Keep"), titles(menu).distinct())
        wrapped.onActionItemClicked(null, menu.getItem(0))
        wrapped.onDestroyActionMode(null)
        assertEquals(listOf(1, 1, 1), listOf(inner.created, inner.clicked, inner.destroyed))
    }

    @Test fun `the floating bar keeps telling the system where the selection is`() {
        var asked = 0
        val inner = object : ActionMode.Callback2() {
            override fun onCreateActionMode(mode: ActionMode?, menu: Menu) = true
            override fun onPrepareActionMode(mode: ActionMode?, menu: Menu) = true
            override fun onActionItemClicked(mode: ActionMode?, item: MenuItem) = true
            override fun onDestroyActionMode(mode: ActionMode?) {}
            override fun onGetContentRect(mode: ActionMode?, view: View, outRect: Rect) { asked++; outRect.set(1, 2, 3, 4) }
        }
        val wrapped = ExportFree.wrap(inner)
        assertTrue(wrapped is ActionMode.Callback2)
        val r = Rect()
        (wrapped as ActionMode.Callback2).onGetContentRect(null, View(context), r)
        assertEquals(1, asked)
        assertEquals(Rect(1, 2, 3, 4), r)
    }

    @Test fun `no callback stays no callback`() {
        assertNull(ExportFree.wrap(null))
    }
}
