package pk.wantuch.spacebook.ui.reader

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json
import pk.wantuch.spacebook.data.local.Bookmark
import pk.wantuch.spacebook.data.local.BookmarkDao
import pk.wantuch.spacebook.data.local.Note
import pk.wantuch.spacebook.data.local.NoteDao
import pk.wantuch.spacebook.data.local.ReadingDao
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.offline.OfflineRepository
import pk.wantuch.spacebook.data.offline.SiteStore
import pk.wantuch.spacebook.data.remote.Endpoint
import pk.wantuch.spacebook.data.repo.SyncRepository
import pk.wantuch.spacebook.ui.games.GameKeys
import pk.wantuch.spacebook.ui.games.GamePage
import pk.wantuch.spacebook.ui.games.PageGame
import pk.wantuch.spacebook.ui.web.WebController
import javax.inject.Inject

@HiltViewModel
class ReaderViewModel @Inject constructor(
    @ApplicationContext private val context: Context,
    private val endpoint: Endpoint,
    private val json: Json,
    private val reading: ReadingDao,
    private val bookmarks: BookmarkDao,
    private val notes: NoteDao,
    private val sync: SyncRepository,
    private val store: SiteStore,
    val offline: OfflineRepository,
) : ViewModel() {

    fun newController() = WebController(context, endpoint, json, store)

    /** (bytes of this book's files still missing from the phone, or null when the book list is unknown) */
    suspend fun missingBytes(subjectId: String): Long? {
        val map = offline.map()
        if (map.subjects[subjectId] == null) return null
        val st = offline.stat(map, listOf(subjectId))
        return st.totalBytes - st.doneBytes
    }

    fun downloadBook(subjectId: String, name: String) = offline.start(listOf(subjectId), name)

    suspend fun position(subjectId: String): ReadingPosition? = reading.get(subjectId)

    fun savePosition(p: ReadingPosition) = viewModelScope.launch { reading.save(p) }

    fun isBookmarked(subjectId: String, chapter: Int, page: Int): Flow<Boolean> =
        bookmarks.count(subjectId, chapter, page).map { it > 0 }

    fun setBookmark(on: Boolean, b: Bookmark) = viewModelScope.launch {
        if (on) bookmarks.add(b) else bookmarks.remove(b.subjectId, b.chapterIndex, b.page)
    }

    fun notesFor(subjectId: String, chapter: Int, page: Int): Flow<List<Note>> = notes.forPage(subjectId, chapter, page)

    fun addNote(n: Note) = viewModelScope.launch { notes.add(n) }
    fun deleteNote(id: Long) = viewModelScope.launch { notes.remove(id) }

    /** A game step done on [page]: stored now, sent when there is a network, coins decided by the server. */
    fun gameStep(page: GamePage, game: PageGame, step: Int, total: Int) = viewModelScope.launch {
        sync.rewardStep(GameKeys.rewardKey(page, game.id, total), "${game.title}: ${page.chapterTitle}", total, step)
    }
}
