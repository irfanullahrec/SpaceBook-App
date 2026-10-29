package pk.wantuch.spacebook.ui.web

import android.content.Context
import android.content.Intent
import android.graphics.Rect
import android.view.ActionMode
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.webkit.WebView

/**
 * The WebView of the reader. The website's page already switches off Ctrl+C, copy, cut and dragging for the book text (js/sb_rights.js); this adds the same for
 * the system's own selection menu, which is not a web page's: a long press that selects text opens a bar with Copy, Cut, Share and the "process text" entries
 * of other apps. Those entries are taken out (not for a typing field: notes, answers and the report form keep Cut, Copy and Paste). The text can still be selected: the website's word meanings, sentence translation, read aloud and the app's own
 * tools read the selection through the page, not through that menu.
 *
 * What this does NOT do: it is a courtesy and a deterrent. Screenshots, a photo of the screen, retyping, accessibility services that read the screen and other
 * software on the phone are not stopped (and nothing here sets FLAG_SECURE: the report dialog and support depend on screenshots). docs/launch/CONTENT_RIGHTS.md.
 */
class GuardedWebView(context: Context) : WebView(context) {
    override fun startActionMode(callback: ActionMode.Callback?): ActionMode? = super.startActionMode(ExportFree.wrap(callback))
    override fun startActionMode(callback: ActionMode.Callback?, type: Int): ActionMode? = super.startActionMode(ExportFree.wrap(callback), type)
}

object ExportFree {
    /** the ids of the system entries that put text on the clipboard or send it to another app */
    private val EXPORT_IDS = intArrayOf(android.R.id.copy, android.R.id.cut, android.R.id.shareText, android.R.id.paste, android.R.id.pasteAsPlainText)

    /** The system offers Cut and Paste only where text can be typed (a notes box, an answer box, the report form): that is the reader's own text, not the book's. */
    private val EDITING_IDS = intArrayOf(android.R.id.cut, android.R.id.paste, android.R.id.pasteAsPlainText)

    private fun isEditing(menu: Menu) = EDITING_IDS.any { menu.findItem(it) != null }

    /**
     * Removes the export entries (and the entries other apps add with ACTION_PROCESS_TEXT: Translate, Search, Share ...) from the selection menu of book text.
     * The menu of a typing field is left as the system made it, as the website's guard does (js/sb_rights.js leaves typing fields alone).
     */
    fun strip(menu: Menu) {
        if (isEditing(menu)) return
        EXPORT_IDS.forEach { menu.removeItem(it) }
        for (i in menu.size() - 1 downTo 0) {
            val item = menu.getItem(i)
            if (item.intent?.action == Intent.ACTION_PROCESS_TEXT) menu.removeItem(item.itemId)
        }
    }

    fun wrap(callback: ActionMode.Callback?): ActionMode.Callback? = when (callback) {
        null -> null
        is ActionMode.Callback2 -> Floating(callback)
        else -> Plain(callback)
    }

    private open class Plain(private val inner: ActionMode.Callback) : ActionMode.Callback {
        override fun onCreateActionMode(mode: ActionMode?, menu: Menu): Boolean = inner.onCreateActionMode(mode, menu).also { strip(menu) }
        override fun onPrepareActionMode(mode: ActionMode?, menu: Menu): Boolean = inner.onPrepareActionMode(mode, menu).also { strip(menu) }
        override fun onActionItemClicked(mode: ActionMode?, item: MenuItem): Boolean = inner.onActionItemClicked(mode, item)
        override fun onDestroyActionMode(mode: ActionMode?) = inner.onDestroyActionMode(mode)
    }

    /** the floating selection bar of newer Android versions also tells the system where the selection is */
    private class Floating(private val inner: ActionMode.Callback2) : ActionMode.Callback2() {
        private val plain = Plain(inner)
        override fun onCreateActionMode(mode: ActionMode?, menu: Menu): Boolean = plain.onCreateActionMode(mode, menu)
        override fun onPrepareActionMode(mode: ActionMode?, menu: Menu): Boolean = plain.onPrepareActionMode(mode, menu)
        override fun onActionItemClicked(mode: ActionMode?, item: MenuItem): Boolean = plain.onActionItemClicked(mode, item)
        override fun onDestroyActionMode(mode: ActionMode?) = plain.onDestroyActionMode(mode)
        override fun onGetContentRect(mode: ActionMode?, view: View, outRect: Rect) = inner.onGetContentRect(mode, view, outRect)
    }
}
