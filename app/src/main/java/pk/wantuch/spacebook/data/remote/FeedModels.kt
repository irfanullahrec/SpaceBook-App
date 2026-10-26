package pk.wantuch.spacebook.data.remote

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject

// The News Feed API (api/feed.php, rules in api/lib/feed.php). The server decides what another student may know about an author:
// a display name ("Ali K."), the kind of account, the initial and a colour. Never a number, a father name or an account id.

@Serializable
data class FeedAuthorDto(
    val name: String = "",
    /** student | teacher | school */
    val type: String = "student",
    val initial: String = "",
    /** 0..359, the colour of the avatar */
    val hue: Int = 0,
)

/** The post a share points at (a small copy; null on the share itself when the original is gone). */
@Serializable
data class FeedSharedDto(
    val id: Long = 0,
    val kind: String = "text",
    val author: FeedAuthorDto = FeedAuthorDto(),
    val body: String = "",
    val card: JsonObject? = null,
    val at: Long = 0,
)

@Serializable
data class FeedPostDto(
    val id: Long,
    /** text | question | stats | progress | plan | share */
    val kind: String = "text",
    val author: FeedAuthorDto = FeedAuthorDto(),
    val mine: Boolean = false,
    val body: String = "",
    /** the structured attachment of a stats / progress / plan / question post (see FeedCard) */
    val card: JsonObject? = null,
    val likes: Int = 0,
    val comments: Int = 0,
    val shares: Int = 0,
    val liked: Boolean = false,
    /** epoch milliseconds */
    val at: Long = 0,
    val shared: FeedSharedDto? = null,
)

@Serializable
data class FeedCommentDto(
    val id: Long,
    val post: Long = 0,
    /** 0 for a comment on the post, otherwise the comment this is a reply to */
    val parent: Long = 0,
    val author: FeedAuthorDto = FeedAuthorDto(),
    val mine: Boolean = false,
    val body: String = "",
    val likes: Int = 0,
    val liked: Boolean = false,
    val at: Long = 0,
    val replies: List<FeedCommentDto> = emptyList(),
)

@Serializable
data class FeedListResponse(
    val ok: Boolean = false,
    val posts: List<FeedPostDto> = emptyList(),
    /** the id to ask for the next page with, 0 when there are no more */
    val next: Long = 0,
    val now: Long = 0,
    val error: String? = null,
)

@Serializable
data class FeedPostResponse(val ok: Boolean = false, val post: FeedPostDto? = null, val shares: Int = 0, val error: String? = null)

@Serializable
data class FeedCommentsResponse(val ok: Boolean = false, val comments: List<FeedCommentDto> = emptyList(), val next: Long = 0, val error: String? = null)

@Serializable
data class FeedCommentResponse(val ok: Boolean = false, val comment: FeedCommentDto? = null, val count: Int = 0, val error: String? = null)

@Serializable
data class FeedLikeResponse(val ok: Boolean = false, val likes: Int = 0, val liked: Boolean = false, val error: String? = null)

@Serializable
data class FeedCountResponse(val ok: Boolean = false, val count: Int = 0, val hidden: Boolean = false, val error: String? = null)

@Serializable
data class FeedCreateBody(val kind: String, val body: String, val card: JsonObject? = null)

@Serializable
data class FeedShareBody(val id: Long, val body: String = "")

@Serializable
data class FeedLikeBody(val type: String, val id: Long, val on: Boolean)

@Serializable
data class FeedCommentBody(val post: Long, val body: String, val parent: Long = 0)

@Serializable
data class FeedIdBody(val id: Long)

@Serializable
data class FeedReportBody(val type: String, val id: Long, val reason: String, val note: String = "")
