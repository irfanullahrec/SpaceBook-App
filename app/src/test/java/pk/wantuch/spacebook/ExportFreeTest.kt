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

    /** selected book text: the system offers no Cut and no Paste on text that cannot be typed into */
    private fun bookTextBar(): RoboMenu {
        val m = RoboMenu(context)
        m.add(Menu.NONE, android.R.id.copy, 0, "Copy")
        m.add(Menu.NONE, android.R.id.shareText, 1, "Share")
        m.add(Menu.NONE, android.R.id.selectAll, 2, "Select all")
        m.add(Menu.NONE, 4242, 3, "Translate").intent = Intent(Intent.ACTION_PROCESS_TEXT)
        m.add(Menu.NONE, 4243, 4, "The app's own entry")
        return m
    }

    /** selected text in a typing field (notes, an answer, the report form) */
    private fun typingFieldBar(): RoboMenu {
        val m = RoboMenu(context)
        m.add(Menu.NONE, android.R.id.cut, 0, "Cut")
        m.add(Menu.NONE, android.R.id.copy, 1, "Copy")
        m.add(Menu.NONE, android.R.id.paste, 2, "Paste")
        m.add(Menu.NONE, android.R.id.pasteAsPlainText, 3, "Paste as plain text")
        m.add(Menu.NONE, android.R.id.selectAll, 4, "Select all")
        m.add(Menu.NONE, 4242, 5, "Translate").intent = Intent(Intent.ACTION_PROCESS_TEXT)
        return m
    }

    private fun titles(m: Menu) = (0 until m.size()).map { m.getItem(it).title.toString() }

    @Test fun `copy, share and other apps' process-text entries are taken out of the bar of book text, the rest stays`() {
        val menu = bookTextBar()
        ExportFree.strip(menu)
        assertEquals(listOf("Select all", "The app's own entry"), titles(menu))
    }

    @Test fun `a typing field keeps its whole bar, with Cut, Copy and Paste`() {
        val menu = typingFieldBar()
        ExportFree.strip(menu)
        assertEquals(listOf("Cut", "Copy", "Paste", "Paste as plain text", "Select all", "Translate"), titles(menu))
    }

    @Test fun `a cursor with nothing selected in a typing field keeps Paste`() {
        val m = RoboMenu(context)
        m.add(Menu.NONE, android.R.id.paste, 0, "Paste")
        m.add(Menu.NONE, android.R.id.selectAll, 1, "Select all")
        ExportFree.strip(m)
        assertEquals(listOf("Paste", "Select all"), titles(m))
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

    @Test fun `a wrapped callback leaves the bar of a typing field as the system made it`() {
        val inner = Inner { m -> m.add(Menu.NONE, android.R.id.cut, 0, "Cut"); m.add(Menu.NONE, android.R.id.copy, 1, "Copy"); m.add(Menu.NONE, android.R.id.paste, 2, "Paste") }
        val wrapped = ExportFree.wrap(inner)!!
        val menu = RoboMenu(context)
        assertTrue(wrapped.onCreateActionMode(null, menu))
        assertEquals(listOf("Cut", "Copy", "Paste"), titles(menu))
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
