package pk.wantuch.spacebook.data.repo

import android.content.Context
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.map
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import pk.wantuch.spacebook.data.Prefs
import pk.wantuch.spacebook.data.local.Bookmark
import pk.wantuch.spacebook.data.local.ItemCodec
import pk.wantuch.spacebook.data.local.ItemDao
import pk.wantuch.spacebook.data.local.ItemRow
import pk.wantuch.spacebook.data.local.Note
import pk.wantuch.spacebook.data.local.OutboxDao
import pk.wantuch.spacebook.data.local.OutboxEvent
import pk.wantuch.spacebook.data.local.ReadingPosition
import pk.wantuch.spacebook.data.remote.ItemDto
import pk.wantuch.spacebook.data.remote.ItemGoneDto
import java.util.UUID
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Bookmarks, notes and highlights, where the student stopped reading, "my class": the same items, with the same keys, values and merge rule, as the
 * website's SBItems (js/core/items.js) and the server's user_items table (api/lib/items.php). Local first: a change is written to this phone at
 * once and marked unsent; [sendPending] turns unsent rows into item.put / item.del events in the sync outbox (signed in, and only while the owner's
 * sync switch is on), and [merge] folds in what the server returns. The later `at` wins, the server's copy at equal times, a delete is a tombstone.
 *
 * What was saved while nobody was signed in belongs to userId 0: the next sign-in asks whether to add it to the account ([adoptGuest]), and the
 * answer "no" leaves it on the phone, as on the website.
 */
@Singleton
class LibraryRepository @Inject constructor(
    @ApplicationContext private val context: Context,
    private val dao: ItemDao,
    private val outbox: OutboxDao,
    private val prefs: Prefs,
    private val json: Json,
) {
    /** What to do after a change so it is sent soon (WorkManager runs the sync); a test replaces it. */
    var onChanged: () -> Unit = { SyncRepository.schedule(context) }

    private val me: Flow<Int> = prefs.state.map { it.user?.id ?: 0 }.distinctUntilChanged()
    private var lastAt = 0L

    private fun tick(): Long = synchronized(this) { lastAt = maxOf(System.currentTimeMillis(), lastAt + 1); lastAt }

    private suspend fun uid(): Int = prefs.state.first().user?.id ?: 0

    private fun enc(v: JsonObject) = json.encodeToString(JsonObject.serializer(), v)

    // ---- bookmarks
    @OptIn(ExperimentalCoroutinesApi::class)
    fun bookmarks(): Flow<List<Bookmark>> =
        me.flatMapLatest { dao.observe(it, ItemCodec.BM) }.map { rows -> rows.mapNotNull { ItemCodec.toBookmark(json, it) } }

    @OptIn(ExperimentalCoroutinesApi::class)
    fun isBookmarked(subject: String, chapter: Int, tab: String, page: Int): Flow<Boolean> =
        me.flatMapLatest { dao.observeOne(it, ItemCodec.BM, ItemCodec.bookmarkKey(subject, chapter, tab, page)) }.map { it != null && !it.deleted }

    suspend fun setBookmark(on: Boolean, b: Bookmark) {
        val key = ItemCodec.bookmarkKey(b.subjectId, b.chapterIndex, b.tab, b.page)
        if (on) put(ItemCodec.BM, key, ItemCodec.bookmarkValue(b)) else delete(ItemCodec.BM, key)
    }

    // ---- notes and highlights
    @OptIn(ExperimentalCoroutinesApi::class)
    fun notes(): Flow<List<Note>> =
        me.flatMapLatest { dao.observe(it, ItemCodec.NOTE) }.map { rows -> rows.mapNotNull { ItemCodec.toNote(json, it) } }

    fun notesFor(subject: String, chapter: Int, tab: String, page: Int): Flow<List<Note>> {
        val t = ItemCodec.cleanTab(tab)
        return notes().map { list -> list.filter { it.subjectId == subject && it.chapterIndex == chapter && it.page == page && ItemCodec.cleanTab(it.tab) == t } }
    }

    /** @return the id of the saved note */
    suspend fun saveNote(n: Note): String {
        val id = n.id.ifBlank { UUID.randomUUID().toString() }
        put(ItemCodec.NOTE, id, ItemCodec.noteValue(n.copy(id = id)))
        return id
    }

    suspend fun deleteNote(id: String) = delete(ItemCodec.NOTE, id)

    // ---- where the student stopped
    suspend fun position(subjectId: String): ReadingPosition? =
        dao.get(uid(), ItemCodec.POS, subjectId)?.takeIf { !it.deleted }?.let { ItemCodec.toPosition(json, it) }

    @OptIn(ExperimentalCoroutinesApi::class)
    fun recentPositions(limit: Int): Flow<List<ReadingPosition>> =
        me.flatMapLatest { dao.observeRecent(it, ItemCodec.POS, limit) }.map { rows -> rows.mapNotNull { ItemCodec.toPosition(json, it) } }

    suspend fun savePosition(p: ReadingPosition) {
        val value = ItemCodec.positionValue(p)
        val old = dao.get(uid(), ItemCodec.POS, p.subjectId)
        if (old != null && !old.deleted && old.valueJson == enc(value)) return          // the same place again: nothing to send
        put(ItemCodec.POS, p.subjectId, value)
    }

    // ---- "my class"
    suspend fun setClass(id: String) {
        prefs.setClass(id)
        if (id.isNotBlank()) put(ItemCodec.PREF, ItemCodec.CLASS_KEY, buildJsonObject { put("id", id) })
    }

    // ---- change, delete
    private suspend fun put(kind: String, key: String, value: JsonObject) {
        dao.upsert(ItemRow(uid(), kind, key, enc(value), tick(), deleted = false, sent = false))
        onChanged()
    }

    private suspend fun delete(kind: String, key: String) {
        val u = uid()
        val old = dao.get(u, kind, key)
        if (old != null && old.deleted) return
        dao.upsert(ItemRow(u, kind, key, "{}", tick(), deleted = true, sent = false))
        onChanged()
    }

    // ---- sending
    /** Queues item.put / item.del for what has not been sent yet. @return how many events were queued (0 when signed out or the switch is off) */
    suspend fun sendPending(): Int {
        val s = prefs.state.first()
        val u = s.user?.id ?: return 0
        if (!s.syncOn || s.device == null) return 0
        var n = 0
        for (r in dao.unsent(u)) {
            val payload = buildJsonObject {
                put("kind", r.kind); put("key", r.itemKey)
                if (!r.deleted) put("value", json.parseToJsonElement(r.valueJson))
                put("at", r.at)
            }
            outbox.add(OutboxEvent(UUID.randomUUID().toString(), if (r.deleted) "item.del" else "item.put", enc(payload), r.at, u))
            dao.markSent(u, r.kind, r.itemKey, r.at)
            n++
        }
        return n
    }

    // ---- receiving: the same rule as js/core/items.js merge()
    suspend fun merge(items: List<ItemDto>, gone: List<ItemGoneDto>): Int {
        val u = prefs.state.first().user?.id ?: return 0
        var changed = 0
        for (r in items) {
            if (r.kind !in ItemCodec.KINDS) continue
            val l = dao.get(u, r.kind, r.key)
            val value = enc(r.value)
            val take = when {
                l == null -> true
                r.at > l.at -> true
                r.at == l.at && l.deleted -> true
                r.at == l.at && l.sent && l.valueJson != value -> true
                else -> false
            }
            if (take) {
                dao.upsert(ItemRow(u, r.kind, r.key, value, r.at, deleted = false, sent = true)); changed++
                if (r.kind == ItemCodec.PREF && r.key == ItemCodec.CLASS_KEY) (r.value["id"] as? JsonPrimitive)?.content?.takeIf { it.isNotEmpty() }?.let { prefs.setClass(it) }
            }
        }
        for (g in gone) {
            if (g.kind !in ItemCodec.KINDS) continue
            val l = dao.get(u, g.kind, g.key)
            if (l != null && l.deleted) { if (g.at > l.at) dao.upsert(l.copy(at = g.at, sent = true)); continue }
            if (l != null && l.at > g.at) continue                       // our save is newer than that delete
            dao.upsert(ItemRow(u, g.kind, g.key, "{}", g.at, deleted = true, sent = true))
            if (l != null) changed++
        }
        return changed
    }

    // ---- the guest rule
    suspend fun guestCount(): Int = dao.guestCount()

    /** The student said yes: what was saved while signed out becomes the account's (and is sent). */
    suspend fun adoptGuest(userId: Int) {
        for (g in dao.guestRows()) {
            val mine = dao.get(userId, g.kind, g.itemKey)
            if (mine == null || g.at > mine.at) dao.upsert(g.copy(userId = userId, sent = false))
        }
        dao.dropGuest()
        onChanged()
    }
}
