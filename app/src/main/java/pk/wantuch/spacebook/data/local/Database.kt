package pk.wantuch.spacebook.data.local

import androidx.room.Dao
import androidx.room.Database
import androidx.room.Entity
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.PrimaryKey
import androidx.room.Query
import androidx.room.RoomDatabase
import kotlinx.coroutines.flow.Flow

/** A fact waiting to be sent to api/v2/sync.php (step, tp.answer, plan.save ...). Kept until the server accepts or rejects it. */
@Entity(tableName = "outbox")
data class OutboxEvent(
    @PrimaryKey val eventId: String,
    val type: String,
    val payloadJson: String,
    val clientTs: Long,
    /** user id the event was made for; 0 = guest (sent after sign-in only if the student agrees) */
    val userId: Int,
)

/** Where the student was in each book, for "continue where you left off". One row per subject. */
@Entity(tableName = "reading")
data class ReadingPosition(
    @PrimaryKey val subjectId: String,
    val classId: String,
    val chapterIndex: Int,
    val chapterTitle: String,
    val page: Int,
    val pageCount: Int,
    val updatedAt: Long,
)

@Entity(tableName = "bookmarks", primaryKeys = ["subjectId", "chapterIndex", "page"])
data class Bookmark(
    val subjectId: String,
    val classId: String,
    val chapterIndex: Int,
    val page: Int,
    val title: String,
    val createdAt: Long,
)

@Entity(tableName = "notes")
data class Note(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val subjectId: String,
    val classId: String,
    val chapterIndex: Int,
    val page: Int,
    val title: String,
    val text: String,
    val createdAt: Long,
)

/** Local reactions on feed cards (like / save), not shared with other students. */
@Entity(tableName = "reactions")
data class Reaction(@PrimaryKey val cardId: String, val liked: Boolean, val saved: Boolean)

@Dao
interface OutboxDao {
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun add(e: OutboxEvent)

    @Query("SELECT * FROM outbox WHERE userId = :userId ORDER BY clientTs LIMIT :limit")
    suspend fun pending(userId: Int, limit: Int): List<OutboxEvent>

    @Query("SELECT COUNT(*) FROM outbox WHERE userId = :userId")
    fun count(userId: Int): Flow<Int>

    @Query("SELECT COUNT(*) FROM outbox WHERE userId = 0")
    suspend fun guestCount(): Int

    @Query("DELETE FROM outbox WHERE eventId IN (:ids)")
    suspend fun remove(ids: List<String>)

    /** Guest events become the account's when the student says yes. */
    @Query("UPDATE outbox SET userId = :userId WHERE userId = 0")
    suspend fun adoptGuest(userId: Int)

    @Query("DELETE FROM outbox WHERE userId = 0")
    suspend fun dropGuest()
}

@Dao
interface ReadingDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun save(p: ReadingPosition)

    @Query("SELECT * FROM reading WHERE subjectId = :subjectId")
    suspend fun get(subjectId: String): ReadingPosition?

    @Query("SELECT * FROM reading ORDER BY updatedAt DESC LIMIT :limit")
    fun recent(limit: Int): Flow<List<ReadingPosition>>
}

@Dao
interface BookmarkDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun add(b: Bookmark)

    @Query("DELETE FROM bookmarks WHERE subjectId = :subjectId AND chapterIndex = :chapter AND page = :page")
    suspend fun remove(subjectId: String, chapter: Int, page: Int)

    @Query("SELECT COUNT(*) FROM bookmarks WHERE subjectId = :subjectId AND chapterIndex = :chapter AND page = :page")
    fun count(subjectId: String, chapter: Int, page: Int): Flow<Int>

    @Query("SELECT * FROM bookmarks ORDER BY createdAt DESC")
    fun all(): Flow<List<Bookmark>>
}

@Dao
interface NoteDao {
    @Insert
    suspend fun add(n: Note)

    @Query("DELETE FROM notes WHERE id = :id")
    suspend fun remove(id: Long)

    @Query("SELECT * FROM notes WHERE subjectId = :subjectId AND chapterIndex = :chapter AND page = :page ORDER BY createdAt DESC")
    fun forPage(subjectId: String, chapter: Int, page: Int): Flow<List<Note>>

    @Query("SELECT * FROM notes ORDER BY createdAt DESC")
    fun all(): Flow<List<Note>>
}

@Dao
interface ReactionDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun set(r: Reaction)

    @Query("SELECT * FROM reactions")
    fun all(): Flow<List<Reaction>>
}

@Database(
    entities = [OutboxEvent::class, ReadingPosition::class, Bookmark::class, Note::class, Reaction::class],
    version = 1,
    exportSchema = true,
)
abstract class SpaceBookDb : RoomDatabase() {
    abstract fun outbox(): OutboxDao
    abstract fun reading(): ReadingDao
    abstract fun bookmarks(): BookmarkDao
    abstract fun notes(): NoteDao
    abstract fun reactions(): ReactionDao
}
