package pk.wantuch.spacebook.ui.feed

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.serialization.json.JsonObject
import pk.wantuch.spacebook.data.remote.ApiResult
import pk.wantuch.spacebook.data.remote.FeedCommentDto
import pk.wantuch.spacebook.data.remote.FeedPostDto
import pk.wantuch.spacebook.data.repo.FeedFilter
import pk.wantuch.spacebook.data.repo.FeedRepository
import javax.inject.Inject

data class FeedState(
    val posts: List<FeedPostDto> = emptyList(),
    val filter: FeedFilter = FeedFilter.ALL,
    /** the first page is on its way and there is nothing to show yet */
    val loading: Boolean = true,
    val refreshing: Boolean = false,
    val loadingMore: Boolean = false,
    /** the last page was reached */
    val end: Boolean = false,
    /** the posts shown are the ones saved on the phone: there is no connection */
    val offline: Boolean = false,
    /** the server does not know this phone: sign in (again) */
    val needSignIn: Boolean = false,
    /** the feed could not be loaded and there is nothing saved to show */
    val error: String? = null,
)

/** The comment sheet of one post. [post] is null while the sheet is closed. */
data class CommentsState(
    val post: FeedPostDto? = null,
    val comments: List<FeedCommentDto> = emptyList(),
    val loading: Boolean = false,
    val loadingMore: Boolean = false,
    val more: Boolean = false,
    val error: String? = null,
    val sending: Boolean = false,
    val replyTo: FeedCommentDto? = null,
)

@HiltViewModel
class FeedViewModel @Inject constructor(
    private val repo: FeedRepository,
) : ViewModel() {

    private val _state = MutableStateFlow(FeedState())
    val state: StateFlow<FeedState> = _state.asStateFlow()

    private val _comments = MutableStateFlow(CommentsState())
    val comments: StateFlow<CommentsState> = _comments.asStateFlow()

    private val _messages = MutableSharedFlow<String>(extraBufferCapacity = 8)
    /** one-line answers for a snackbar ("Posted", "You are offline ...") */
    val messages: SharedFlow<String> = _messages.asSharedFlow()

    private var uid = 0
    private var nextBefore = 0L
    private var lastLoaded = 0L
    private var loadJob: kotlinx.coroutines.Job? = null

    /** Opens the feed for the signed-in student (id 0 = nobody). Loads again when the account changed or the posts are older than a minute. */
    fun start(userId: Int) {
        if (userId != uid) {
            uid = userId
            _state.value = FeedState(loading = userId != 0, needSignIn = userId == 0)
            _comments.value = CommentsState()
            lastLoaded = 0
            if (userId == 0) { viewModelScope.launch { repo.clearCache() }; return }
            viewModelScope.launch {
                // the saved page shows at once; the fresh one is fetched after it, so an offline phone keeps what it showed
                val saved = repo.readCache(userId)
                if (uid == userId && saved.isNotEmpty() && _state.value.posts.isEmpty()) _state.update { it.copy(posts = saved, loading = false) }
                if (uid == userId) load(userPull = false)
            }
            return
        }
        if (userId == 0) return
        if (System.currentTimeMillis() - lastLoaded > STALE_MS) load(userPull = false)
    }

    /** the student pulled the page down */
    fun refresh() { if (uid != 0) load(userPull = true) }

    fun setFilter(f: FeedFilter) {
        if (f == _state.value.filter) return
        _state.update { it.copy(filter = f, posts = emptyList(), loading = true, end = false, error = null, offline = false) }
        load(userPull = false)
    }

    private fun load(userPull: Boolean) {
        loadJob?.cancel()
        val filter = _state.value.filter
        _state.update { it.copy(refreshing = userPull, loading = it.posts.isEmpty(), error = null) }
        loadJob = viewModelScope.launch {
            when (val r = repo.list(0, filter)) {
                is ApiResult.Success -> {
                    lastLoaded = System.currentTimeMillis()
                    nextBefore = r.value.next
                    _state.update { it.copy(posts = r.value.posts, loading = false, refreshing = false, end = r.value.next == 0L, offline = false, needSignIn = false, error = null) }
                    if (filter == FeedFilter.ALL) repo.writeCache(uid, r.value.posts)
                }
                is ApiResult.Failure -> {
                    val signIn = r.code == 401
                    _state.update {
                        it.copy(
                            loading = false, refreshing = false, needSignIn = signIn, offline = r.offline && it.posts.isNotEmpty(),
                            error = if (it.posts.isEmpty() && !signIn) friendly(r) else null,
                        )
                    }
                    if (r.offline && _state.value.posts.isNotEmpty()) _messages.tryEmit("You are offline. These are the posts saved on this phone.")
                }
            }
        }
    }

    fun loadMore() {
        val s = _state.value
        if (s.loading || s.refreshing || s.loadingMore || s.end || s.offline || nextBefore <= 0L || s.posts.isEmpty()) return
        _state.update { it.copy(loadingMore = true) }
        viewModelScope.launch {
            when (val r = repo.list(nextBefore, s.filter)) {
                is ApiResult.Success -> {
                    nextBefore = r.value.next
                    _state.update { cur ->
                        val have = cur.posts.map { it.id }.toSet()
                        cur.copy(posts = cur.posts + r.value.posts.filter { it.id !in have }, loadingMore = false, end = r.value.next == 0L)
                    }
                }
                is ApiResult.Failure -> {
                    _state.update { it.copy(loadingMore = false) }
                    _messages.tryEmit(friendly(r))
                }
            }
        }
    }

    // ---------------------------------------------------------------- posts

    private fun changePost(id: Long, f: (FeedPostDto) -> FeedPostDto) {
        _state.update { s -> s.copy(posts = s.posts.map { if (it.id == id) f(it) else it }) }
        _comments.update { c -> if (c.post?.id == id) c.copy(post = f(c.post)) else c }
    }

    fun toggleLike(post: FeedPostDto) {
        val on = !post.liked
        changePost(post.id) { it.copy(liked = on, likes = maxOf(0, it.likes + if (on) 1 else -1)) }
        viewModelScope.launch {
            when (val r = repo.like("post", post.id, on)) {
                is ApiResult.Success -> changePost(post.id) { it.copy(liked = r.value.liked, likes = r.value.likes) }
                is ApiResult.Failure -> {
                    changePost(post.id) { it.copy(liked = post.liked, likes = post.likes) }
                    _messages.tryEmit(friendly(r))
                }
            }
        }
    }

    /** @param done called with null when the post was made (the composer closes) or with the reason it was refused (the composer shows it) */
    fun createPost(kind: String, body: String, card: JsonObject?, done: (String?) -> Unit) {
        viewModelScope.launch {
            when (val r = repo.create(kind, body, card)) {
                is ApiResult.Success -> {
                    val p = r.value.post
                    if (p != null) _state.update { s ->
                        val fits = s.filter == FeedFilter.ALL || s.filter == FeedFilter.MINE || (s.filter == FeedFilter.QUESTIONS && p.kind == "question")
                        if (fits) s.copy(posts = listOf(p) + s.posts.filter { it.id != p.id }, error = null, end = s.end && s.posts.isNotEmpty()) else s
                    }
                    _messages.tryEmit("Posted")
                    done(null)
                }
                is ApiResult.Failure -> done(friendly(r))
            }
        }
    }

    fun share(post: FeedPostDto, text: String, done: (String?) -> Unit = {}) {
        val original = post.shared?.id?.takeIf { post.kind == "share" } ?: post.id
        viewModelScope.launch {
            when (val r = repo.share(original, text)) {
                is ApiResult.Success -> {
                    val p = r.value.post
                    if (p != null) _state.update { s ->
                        val bumped = s.posts.map { if (it.id == original) it.copy(shares = r.value.shares) else it }
                        s.copy(posts = if (s.filter == FeedFilter.QUESTIONS) bumped else listOf(p) + bumped)
                    }
                    _messages.tryEmit("Shared to your feed")
                    done(null)
                }
                is ApiResult.Failure -> done(friendly(r))
            }
        }
    }

    fun delete(post: FeedPostDto) {
        viewModelScope.launch {
            when (val r = repo.delete(post.id)) {
                is ApiResult.Success -> {
                    _state.update { s -> s.copy(posts = s.posts.filter { it.id != post.id }) }
                    _comments.update { if (it.post?.id == post.id) CommentsState() else it }
                    _messages.tryEmit("Post deleted")
                }
                is ApiResult.Failure -> _messages.tryEmit(friendly(r))
            }
        }
    }

    fun reportPost(post: FeedPostDto, reason: String) {
        viewModelScope.launch {
            when (val r = repo.report("post", post.id, reason)) {
                is ApiResult.Success -> {
                    if (r.value.hidden) _state.update { s -> s.copy(posts = s.posts.filter { it.id != post.id }) }
                    _messages.tryEmit("Thank you. We will look at this post.")
                }
                is ApiResult.Failure -> _messages.tryEmit(friendly(r))
            }
        }
    }

    /** "Hide this post": it leaves this phone's list at once (the report is what the server keeps) */
    fun hideLocally(post: FeedPostDto) = _state.update { s -> s.copy(posts = s.posts.filter { it.id != post.id }) }

    // ---------------------------------------------------------------- comments

    fun openComments(post: FeedPostDto) {
        _comments.value = CommentsState(post = post, loading = true)
        loadComments(post.id, before = 0)
    }

    fun closeComments() { _comments.value = CommentsState() }

    private fun loadComments(post: Long, before: Long) {
        viewModelScope.launch {
            when (val r = repo.comments(post, before)) {
                is ApiResult.Success -> _comments.update { c ->
                    if (c.post?.id != post) c
                    else c.copy(comments = if (before == 0L) r.value.comments else c.comments + r.value.comments, loading = false, loadingMore = false, more = r.value.next > 0, error = null)
                }
                is ApiResult.Failure -> _comments.update { c -> if (c.post?.id != post) c else c.copy(loading = false, loadingMore = false, error = friendly(r)) }
            }
        }
    }

    fun loadMoreComments() {
        val c = _comments.value
        val post = c.post ?: return
        val last = c.comments.lastOrNull() ?: return
        if (c.loading || c.loadingMore || !c.more) return
        _comments.update { it.copy(loadingMore = true) }
        loadComments(post.id, last.id)
    }

    fun replyTo(c: FeedCommentDto?) = _comments.update { it.copy(replyTo = c) }

    fun sendComment(text: String, done: () -> Unit) {
        val c = _comments.value
        val post = c.post ?: return
        if (c.sending) return
        _comments.update { it.copy(sending = true) }
        viewModelScope.launch {
            when (val r = repo.comment(post.id, text, c.replyTo?.id ?: 0)) {
                is ApiResult.Success -> {
                    val made = r.value.comment
                    _comments.update { cur ->
                        if (cur.post?.id != post.id || made == null) cur.copy(sending = false)
                        else cur.copy(sending = false, replyTo = null, comments = addComment(cur.comments, made))
                    }
                    changePost(post.id) { it.copy(comments = r.value.count) }
                    done()
                }
                is ApiResult.Failure -> {
                    _comments.update { it.copy(sending = false) }
                    _messages.tryEmit(friendly(r))
                }
            }
        }
    }

    private fun addComment(list: List<FeedCommentDto>, made: FeedCommentDto): List<FeedCommentDto> =
        if (made.parent == 0L) listOf(made) + list
        else list.map { if (it.id == made.parent) it.copy(replies = it.replies + made) else it }

    fun toggleCommentLike(c: FeedCommentDto) {
        val on = !c.liked
        fun apply(f: (FeedCommentDto) -> FeedCommentDto) = _comments.update { cur -> cur.copy(comments = cur.comments.map { top -> mapComment(top, c.id, f) }) }
        apply { it.copy(liked = on, likes = maxOf(0, it.likes + if (on) 1 else -1)) }
        viewModelScope.launch {
            when (val r = repo.like("comment", c.id, on)) {
                is ApiResult.Success -> apply { it.copy(liked = r.value.liked, likes = r.value.likes) }
                is ApiResult.Failure -> { apply { it.copy(liked = c.liked, likes = c.likes) }; _messages.tryEmit(friendly(r)) }
            }
        }
    }

    private fun mapComment(top: FeedCommentDto, id: Long, f: (FeedCommentDto) -> FeedCommentDto): FeedCommentDto =
        if (top.id == id) f(top) else top.copy(replies = top.replies.map { if (it.id == id) f(it) else it })

    fun deleteComment(c: FeedCommentDto) {
        val post = _comments.value.post ?: return
        viewModelScope.launch {
            when (val r = repo.deleteComment(c.id)) {
                is ApiResult.Success -> {
                    _comments.update { cur ->
                        cur.copy(comments = if (c.parent == 0L) cur.comments.filter { it.id != c.id } else cur.comments.map { top -> top.copy(replies = top.replies.filter { it.id != c.id }) })
                    }
                    changePost(post.id) { it.copy(comments = r.value.count) }
                }
                is ApiResult.Failure -> _messages.tryEmit(friendly(r))
            }
        }
    }

    fun reportComment(c: FeedCommentDto, reason: String) {
        viewModelScope.launch {
            when (val r = repo.report("comment", c.id, reason)) {
                is ApiResult.Success -> {
                    if (r.value.hidden) _comments.update { cur -> cur.copy(comments = cur.comments.filter { it.id != c.id }.map { top -> top.copy(replies = top.replies.filter { it.id != c.id }) }) }
                    _messages.tryEmit("Thank you. We will look at this comment.")
                }
                is ApiResult.Failure -> _messages.tryEmit(friendly(r))
            }
        }
    }

    private fun friendly(f: ApiResult.Failure): String = when {
        f.offline -> "You are offline. Try again when you are connected."
        f.code == 401 -> "Please sign in to use the News Feed."
        f.code == 429 -> f.message
        else -> f.message
    }

    companion object {
        /** the saved posts are shown at once; the feed is fetched again when they are older than this */
        const val STALE_MS = 60_000L
    }
}
