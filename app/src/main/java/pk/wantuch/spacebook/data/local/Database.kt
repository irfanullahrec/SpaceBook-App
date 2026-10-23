package pk.wantuch.spacebook.data.local

import androidx.room.Dao
import androidx.room.Database
import androidx.room.Entity
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.PrimaryKey
import androidx.room.Query
import androidx.room.RoomDatabase
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import kotlinx.coroutines.flow.Flow
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import java.util.UUID

/** A fact waiting to be sent to api/v2/sync.php (step, tp.answer, plan.save, item.put ...). Kept until the server accepts or rejects it. */
@Entity(tableName = "outbox")
data class OutboxEvent(
    @PrimaryKey val eventId: String,
    val type: String,
    val payloadJson: String,
    val clientTs: Long,
    /** user id the event was made for; 0 = guest (sent after sign-in only if the student agrees) */
    val userId: Int,
)

/**
 * One thing the student keeps: a bookmark, a note or highlight, where they stopped reading, the class they chose. The same kinds, keys and
 * values as the website's SBItems and the server's user_items table (api/lib/items.php), so both platforms read and write the same data.
 *
 * userId 0 = made while nobody was signed in (offered to the account at the next sign-in, never merged silently).
 * [sent] is true once an item.put / item.del for this version is in the outbox; a change sets it false again.
 * A deleted item stays as a tombstone ([deleted]) so an older copy arriving late cannot bring it back.
 */
@Entity(tableName = "items", primaryKeys = ["userId", "kind", "itemKey"])
data class ItemRow(
    val userId: Int,
    val kind: String,
    val itemKey: String,
    val valueJson: String,
    val at: Long,
    val deleted: Boolean,
    val sent: Boolean,
)

/** Local likes / saves on feed cards. The feed cards are not shown any more (Home is My Stats / Project Stats / My Account); kept as it was. */
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
interface ItemDao {
    @Query("SELECT * FROM items WHERE userId = :userId AND kind = :kind AND deleted = 0 ORDER BY at DESC")
    fun observe(userId: Int, kind: String): Flow<List<ItemRow>>

    @Query("SELECT * FROM items WHERE userId = :userId AND kind = :kind AND deleted = 0 ORDER BY at DESC LIMIT :limit")
    fun observeRecent(userId: Int, kind: String, limit: Int): Flow<List<ItemRow>>

    @Query("SELECT * FROM items WHERE userId = :userId AND kind = :kind AND itemKey = :key")
    fun observeOne(userId: Int, kind: String, key: String): Flow<ItemRow?>

    @Query("SELECT * FROM items WHERE userId = :userId AND kind = :kind AND itemKey = :key")
    suspend fun get(userId: Int, kind: String, key: String): ItemRow?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(row: ItemRow)

    @Query("SELECT * FROM items WHERE userId = :userId AND sent = 0")
    suspend fun unsent(userId: Int): List<ItemRow>

    /** Only the version that was sent: a change made meanwhile (a later [at]) stays unsent. */
    @Query("UPDATE items SET sent = 1 WHERE userId = :userId AND kind = :kind AND itemKey = :key AND at = :at")
    suspend fun markSent(userId: Int, kind: String, key: String, at: Long)

    @Query("SELECT COUNT(*) FROM items WHERE userId = 0 AND deleted = 0")
    suspend fun guestCount(): Int

    @Query("SELECT * FROM items WHERE userId = 0")
    suspend fun guestRows(): List<ItemRow>

    @Query("DELETE FROM items WHERE userId = 0")
    suspend fun dropGuest()
}

@Dao
interface ReactionDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun set(r: Reaction)

    @Query("SELECT * FROM reactions")
    fun all(): Flow<List<Reaction>>
}

@Database(
    entities = [OutboxEvent::class, ItemRow::class, Reaction::class],
    version = 2,
    exportSchema = true,
)
abstract class SpaceBookDb : RoomDatabase() {
    abstract fun outbox(): OutboxDao
    abstract fun items(): ItemDao
    abstract fun reactions(): ReactionDao
}

/**
 * Version 1 kept bookmarks, notes and the reading position in three tables of their own, on this phone only. Version 2 keeps them as items
 * (the kinds the server knows), so they can follow the student's account. Every row is carried over as an item of "nobody signed in"
 * (userId 0, not yet sent): the next sign-in asks "Add your progress to your account?", exactly as for study steps. Nothing is lost,
 * and the three old tables are dropped only after their rows are copied (the whole migration is one transaction).
 */
val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(db: SupportSQLiteDatabase) {
        db.execSQL(
            "CREATE TABLE IF NOT EXISTS `items` (`userId` INTEGER NOT NULL, `kind` TEXT NOT NULL, `itemKey` TEXT NOT NULL, `valueJson` TEXT NOT NULL, " +
                "`at` INTEGER NOT NULL, `deleted` INTEGER NOT NULL, `sent` INTEGER NOT NULL, PRIMARY KEY(`userId`, `kind`, `itemKey`))",
        )
        fun put(kind: String, key: String, value: JsonObject, at: Long) {
            db.execSQL(
                "INSERT OR REPLACE INTO items (userId, kind, itemKey, valueJson, at, deleted, sent) VALUES (0, ?, ?, ?, ?, 0, 0)",
                arrayOf<Any?>(kind, key, value.toString(), at),
            )
        }
        if (hasTable(db, "bookmarks")) db.query("SELECT subjectId, classId, chapterIndex, page, title, createdAt FROM bookmarks").use { c ->
            while (c.moveToNext()) {
                val s = c.getString(0); val ch = c.getInt(2); val p = c.getInt(3)
                put("bm", LegacyKeys.bookmark(s, ch, "", p), LegacyKeys.place(c.getString(1), s, ch, "", p, c.getString(4)), c.getLong(5))
            }
        }
        if (hasTable(db, "notes")) db.query("SELECT subjectId, classId, chapterIndex, page, title, text, createdAt FROM notes").use { c ->
            while (c.moveToNext()) {
                put("note", UUID.randomUUID().toString(), LegacyKeys.note(c.getString(1), c.getString(0), c.getInt(2), c.getInt(3), c.getString(4), c.getString(5)), c.getLong(6))
            }
        }
        if (hasTable(db, "reading")) db.query("SELECT subjectId, classId, chapterIndex, chapterTitle, page, pageCount, updatedAt FROM reading").use { c ->
            while (c.moveToNext()) {
                put("pos", c.getString(0), LegacyKeys.position(c.getString(1), c.getInt(2), c.getInt(4), c.getInt(5), c.getString(3)), c.getLong(6))
            }
        }
        db.execSQL("DROP TABLE IF EXISTS bookmarks")
        db.execSQL("DROP TABLE IF EXISTS notes")
        db.execSQL("DROP TABLE IF EXISTS reading")
    }

    private fun hasTable(db: SupportSQLiteDatabase, name: String): Boolean =
        db.query("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?", arrayOf(name)).use { it.moveToFirst() }
}

/** Keys and values of the migration, kept apart so a unit test can check them against the server's rules without a database. */
object LegacyKeys {
    fun bookmark(subject: String, chapter: Int, tab: String, page: Int) = "$subject|$chapter|$tab|$page"

    fun place(classId: String, subject: String, chapter: Int, tab: String, page: Int, title: String): JsonObject = buildJsonObject {
        put("c", classId); put("s", subject); put("ch", chapter); put("p", page); put("tb", tab); put("t", title.take(160))
    }

    fun note(classId: String, subject: String, chapter: Int, page: Int, title: String, text: String): JsonObject = buildJsonObject {
        put("c", classId); put("s", subject); put("ch", chapter); put("p", page); put("tb", ""); put("t", title.take(160))
        put("x", text.take(2000)); put("q", ""); put("k", "note")
    }

    fun position(classId: String, chapter: Int, page: Int, pages: Int, title: String): JsonObject = buildJsonObject {
        put("c", classId); put("ch", chapter); put("p", page); put("tb", ""); put("n", pages); put("t", title.take(160))
    }
}
