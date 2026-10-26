package pk.wantuch.spacebook.data.repo

import android.content.Context
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import pk.wantuch.spacebook.data.remote.ApiResult
import pk.wantuch.spacebook.data.remote.ApiService
import pk.wantuch.spacebook.data.remote.FeedCommentBody
import pk.wantuch.spacebook.data.remote.FeedCommentsResponse
import pk.wantuch.spacebook.data.remote.FeedCreateBody
import pk.wantuch.spacebook.data.remote.FeedIdBody
import pk.wantuch.spacebook.data.remote.FeedLikeBody
import pk.wantuch.spacebook.data.remote.FeedListResponse
import pk.wantuch.spacebook.data.remote.FeedPostDto
import pk.wantuch.spacebook.data.remote.FeedReportBody
import pk.wantuch.spacebook.data.remote.FeedShareBody
import pk.wantuch.spacebook.data.remote.apiCall
import java.io.File
import javax.inject.Inject
import javax.inject.Singleton

/** Which posts the feed lists. */
enum class FeedFilter(val kind: String?, val mine: Boolean) {
    ALL(null, false), QUESTIONS("question", false), MINE(null, true)
}

/**
 * The News Feed (api/feed.php). Every call needs the device token, so a student who is not signed in gets a "sign in" failure (401) and the
 * screen asks them to sign in. The newest page of the whole feed is kept on the phone (one file per student), so an offline phone still
 * shows the last posts it saw; writing (posting, liking, commenting) needs the connection and says so when it is missing.
 */
@Singleton
class FeedRepository @Inject constructor(
    @ApplicationContext private val context: Context,
    private val api: ApiService,
    private val json: Json,
) {
    suspend fun list(before: Long, filter: FeedFilter, limit: Int = PAGE): ApiResult<FeedListResponse> =
        apiCall(json) { api.feedList(before, limit, if (filter.mine) 1 else 0, filter.kind) }

    suspend fun comments(post: Long, before: Long = 0): ApiResult<FeedCommentsResponse> = apiCall(json) { api.feedComments(post, before) }

    suspend fun create(kind: String, body: String, card: JsonObject?) = apiCall(json) { api.feedCreate(FeedCreateBody(kind, body, card)) }

    suspend fun share(id: Long, body: String) = apiCall(json) { api.feedShare(FeedShareBody(id, body)) }

    suspend fun like(type: String, id: Long, on: Boolean) = apiCall(json) { api.feedLike(FeedLikeBody(type, id, on)) }

    suspend fun comment(post: Long, body: String, parent: Long) = apiCall(json) { api.feedComment(FeedCommentBody(post, body, parent)) }

    suspend fun delete(id: Long) = apiCall(json) { api.feedDelete(FeedIdBody(id)) }

    suspend fun deleteComment(id: Long) = apiCall(json) { api.feedCommentDelete(FeedIdBody(id)) }

    suspend fun report(type: String, id: Long, reason: String, note: String = "") = apiCall(json) { api.feedReport(FeedReportBody(type, id, reason, note)) }

    // ---- the newest page, kept for offline reading (one file per student: another account on this phone never sees it)

    private fun cacheFile(uid: Int) = File(context.filesDir, "feed_cache_$uid.json")

    suspend fun readCache(uid: Int): List<FeedPostDto> = withContext(Dispatchers.IO) {
        runCatching { json.decodeFromString<FeedListResponse>(cacheFile(uid).readText()).posts }.getOrDefault(emptyList())
    }

    suspend fun writeCache(uid: Int, posts: List<FeedPostDto>) = withContext(Dispatchers.IO) {
        runCatching { cacheFile(uid).writeText(json.encodeToString(FeedListResponse(ok = true, posts = posts.take(PAGE)))) }
        Unit
    }

    /** signing out: nothing of the feed stays on the phone */
    suspend fun clearCache() = withContext(Dispatchers.IO) {
        context.filesDir.listFiles { f -> f.name.startsWith("feed_cache_") }?.forEach { it.delete() }
        Unit
    }

    companion object {
        const val PAGE = 20
    }
}
