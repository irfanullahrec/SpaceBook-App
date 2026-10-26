package pk.wantuch.spacebook.ui.feed

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.State
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.produceState
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LifecycleEventEffect
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import kotlinx.coroutines.delay
import pk.wantuch.spacebook.data.prep.PrepSnapshot
import kotlinx.serialization.json.JsonObject
import pk.wantuch.spacebook.data.remote.Catalog
import pk.wantuch.spacebook.data.remote.FeedCommentDto
import pk.wantuch.spacebook.data.remote.FeedPostDto
import pk.wantuch.spacebook.data.remote.UserDto
import pk.wantuch.spacebook.data.repo.FeedFilter
import pk.wantuch.spacebook.ui.theme.Sb

/** The page every post can be seen at, for "Send in another app". */
private const val SITE = "https://wantuch.pk/spacebook/"

/** The words that go with a post when it is sent out of the app. */
internal fun shareText(p: FeedPostDto): String {
    val source = p.shared?.takeIf { p.kind == "share" }
    val author = source?.author ?: p.author
    val body = (source?.body ?: p.body).trim().replace(Regex("\\s+"), " ")
    val kind = source?.kind ?: p.kind
    val what = body.ifBlank {
        when (kind) {
            "stats" -> "my study statistics"
            "progress" -> "my study today"
            "plan" -> "my study plan"
            else -> "a post"
        }
    }.take(240)
    return "${author.name} on SpaceBook: $what\n$SITE"
}

/** What the feed page can ask for. The view model answers them; the tests and the screenshot test answer with nothing. */
class FeedCallbacks(
    val setFilter: (FeedFilter) -> Unit = {},
    val loadMore: () -> Unit = {},
    val refresh: () -> Unit = {},
    val toggleLike: (FeedPostDto) -> Unit = {},
    val openComments: (FeedPostDto) -> Unit = {},
    val closeComments: () -> Unit = {},
    val sendComment: (String, () -> Unit) -> Unit = { _, _ -> },
    val replyTo: (FeedCommentDto?) -> Unit = {},
    val toggleCommentLike: (FeedCommentDto) -> Unit = {},
    val deleteComment: (FeedCommentDto) -> Unit = {},
    val reportComment: (FeedCommentDto, String) -> Unit = { _, _ -> },
    val loadMoreComments: () -> Unit = {},
    val createPost: (String, String, JsonObject?, (String?) -> Unit) -> Unit = { _, _, _, d -> d(null) },
    val share: (FeedPostDto, String, (String?) -> Unit) -> Unit = { _, _, d -> d(null) },
    val delete: (FeedPostDto) -> Unit = {},
    val reportPost: (FeedPostDto, String) -> Unit = { _, _ -> },
    val hide: (FeedPostDto) -> Unit = {},
    val signIn: () -> Unit = {},
)

/**
 * Home → News Feed: what students share with each other. A composer on top, then the posts newest first, with pull to refresh (done by
 * Home), more posts as the list is scrolled, and the saved posts when the phone is offline.
 */
@Composable
fun FeedTab(
    vm: FeedViewModel,
    user: UserDto?,
    prep: PrepSnapshot?,
    coins: Int,
    catalog: Catalog?,
    classId: String,
    onSignIn: () -> Unit,
) {
    val state by vm.state.collectAsStateWithLifecycle()
    val comments by vm.comments.collectAsStateWithLifecycle()
    val snackbar = remember { SnackbarHostState() }
    LaunchedEffect(user?.id) { vm.start(user?.id ?: 0) }
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) { vm.start(user?.id ?: 0) }
    LaunchedEffect(Unit) { vm.messages.collect { snackbar.showSnackbar(it) } }
    val callbacks = remember(vm, onSignIn) {
        FeedCallbacks(
            setFilter = vm::setFilter, loadMore = vm::loadMore, refresh = vm::refresh, toggleLike = vm::toggleLike,
            openComments = vm::openComments, closeComments = vm::closeComments, sendComment = vm::sendComment, replyTo = vm::replyTo,
            toggleCommentLike = vm::toggleCommentLike, deleteComment = vm::deleteComment, reportComment = vm::reportComment,
            loadMoreComments = vm::loadMoreComments, createPost = vm::createPost, share = vm::share, delete = vm::delete,
            reportPost = vm::reportPost, hide = vm::hideLocally, signIn = onSignIn,
        )
    }
    FeedContent(state, comments, user, prep, coins, catalog, classId, snackbar, callbacks)
}

/** Everything the feed page draws, with no view model: the tests and the screenshot test draw it too. */
@Composable
internal fun FeedContent(
    state: FeedState,
    comments: CommentsState,
    user: UserDto?,
    prep: PrepSnapshot?,
    coins: Int,
    catalog: Catalog?,
    classId: String,
    snackbar: SnackbarHostState,
    cb: FeedCallbacks,
    nowMillis: Long? = null,
) {
    val me = remember(user) { feedAuthorOf(user) }
    val context = LocalContext.current
    val liveNow by rememberNow()
    val now = nowMillis ?: liveNow
    val listState = rememberLazyListState()
    val nearEnd by remember { derivedStateOf { listState.layoutInfo.let { (it.visibleItemsInfo.lastOrNull()?.index ?: 0) >= it.totalItemsCount - 4 } } }
    LaunchedEffect(nearEnd, state.posts.size) { if (nearEnd) cb.loadMore() }

    var composing by remember { mutableStateOf<ComposeKind?>(null) }
    var sharing by remember { mutableStateOf<FeedPostDto?>(null) }
    var reporting by remember { mutableStateOf<FeedPostDto?>(null) }
    var deleting by remember { mutableStateOf<FeedPostDto?>(null) }
    var reportingComment by remember { mutableStateOf<FeedCommentDto?>(null) }
    var deletingComment by remember { mutableStateOf<FeedCommentDto?>(null) }
    val signedIn = user != null
    fun compose(k: ComposeKind) { if (signedIn) composing = k else cb.signIn() }

    Box(Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background)) {
        LazyColumn(Modifier.fillMaxSize(), state = listState, contentPadding = PaddingValues(bottom = 24.dp)) {
            if (state.offline) item(key = "offline") {
                Text(
                    "You are offline. These are the posts saved on this phone.", style = MaterialTheme.typography.labelMedium,
                    modifier = Modifier.fillMaxWidth().background(MaterialTheme.colorScheme.tertiary.copy(alpha = .18f)).padding(horizontal = 16.dp, vertical = 8.dp),
                )
            }
            item(key = "composer") { ComposerCard(me, signedIn, onStart = ::compose) }
            if (signedIn) item(key = "filters") { FilterRow(state.filter, cb.setFilter) }
            item(key = "gap0") { Spacer(Modifier.height(8.dp)) }

            when {
                !signedIn || state.needSignIn -> item(key = "signin") { SignInCard(cb.signIn) }
                state.loading && state.posts.isEmpty() -> items(3, key = { "sk$it" }) { PostSkeleton(); Spacer(Modifier.height(8.dp)) }
                state.error != null && state.posts.isEmpty() -> item(key = "error") { ErrorCard(state.error.orEmpty(), cb.refresh) }
                state.posts.isEmpty() -> item(key = "empty") { EmptyCard(state.filter) { compose(if (state.filter == FeedFilter.QUESTIONS) ComposeKind.QUESTION else ComposeKind.TEXT) } }
                else -> {
                    items(state.posts, key = { it.id }) { p ->
                        FeedPostItem(
                            p, now,
                            PostActions(
                                onLike = { cb.toggleLike(p) },
                                onComment = { cb.openComments(p) },
                                onShare = { sharing = p },
                                onDelete = { deleting = p },
                                onReport = { reporting = p },
                                onHide = { cb.hide(p) },
                                onCopy = { copy(context, (p.shared?.takeIf { p.kind == "share" && p.body.isBlank() }?.body ?: p.body)) },
                            ),
                        )
                        Spacer(Modifier.height(8.dp))
                    }
                    item(key = "footer") {
                        Box(Modifier.fillMaxWidth().padding(16.dp), contentAlignment = Alignment.Center) {
                            when {
                                state.loadingMore -> CircularProgressIndicator(Modifier.size(24.dp), strokeWidth = 2.dp)
                                state.end -> Text("You're all caught up 🎉", color = MaterialTheme.colorScheme.onSurfaceVariant)
                                else -> Spacer(Modifier.height(1.dp))
                            }
                        }
                    }
                }
            }
        }
        SnackbarHost(snackbar, Modifier.align(Alignment.BottomCenter))
    }

    composing?.let { k ->
        ComposerSheet(me, k, prep, coins, catalog, classId, onDismiss = { composing = null }, onPost = cb.createPost)
    }
    sharing?.let { p ->
        ShareSheet(
            me, preview = (p.shared?.takeIf { p.kind == "share" }?.body ?: p.body), onDismiss = { sharing = null },
            onShareNow = { text, done -> cb.share(p, text, done) },
            onSendOut = { sendOut(context, shareText(p)) },
        )
    }
    if (comments.post != null) {
        CommentsSheet(
            comments, me, now, onDismiss = cb.closeComments,
            onSend = { text, done -> cb.sendComment(text, done) },
            onReply = cb.replyTo, onLike = cb.toggleCommentLike,
            onDelete = { deletingComment = it }, onReport = { reportingComment = it }, onMore = cb.loadMoreComments,
        )
    }
    reporting?.let { p -> ReportDialog("post", onDismiss = { reporting = null }, onReport = { cb.reportPost(p, it); reporting = null }) }
    reportingComment?.let { c -> ReportDialog("comment", onDismiss = { reportingComment = null }, onReport = { cb.reportComment(c, it); reportingComment = null }) }
    deleting?.let { p -> ConfirmDialog("Delete this post?", "It will be removed for everyone. This cannot be undone.", "Delete", { deleting = null }) { cb.delete(p); deleting = null } }
    deletingComment?.let { c -> ConfirmDialog("Delete this comment?", "It will be removed for everyone.", "Delete", { deletingComment = null }) { cb.deleteComment(c); deletingComment = null } }
}

@Composable
private fun rememberNow(): State<Long> = produceState(System.currentTimeMillis()) {
    while (true) { delay(30_000); value = System.currentTimeMillis() }
}

private fun copy(context: Context, text: String) {
    runCatching {
        val cm = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        cm.setPrimaryClip(ClipData.newPlainText("SpaceBook post", text))
    }
}

private fun sendOut(context: Context, text: String) {
    val send = Intent(Intent.ACTION_SEND).apply { type = "text/plain"; putExtra(Intent.EXTRA_TEXT, text) }
    runCatching { context.startActivity(Intent.createChooser(send, "Send with").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)) }
}

// ---------------------------------------------------------------------------- the pieces of the page

/** "What's on your mind?" with the student's picture, and the things a post can be. */
@Composable
private fun ComposerCard(me: pk.wantuch.spacebook.data.remote.FeedAuthorDto, signedIn: Boolean, onStart: (ComposeKind) -> Unit) {
    Surface(Modifier.fillMaxWidth(), color = MaterialTheme.colorScheme.surface) {
        Column {
            Row(Modifier.padding(horizontal = 12.dp, vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
                FeedAvatar(me, 42.dp)
                Spacer(Modifier.width(10.dp))
                Box(
                    Modifier.weight(1f).height(44.dp).clip(RoundedCornerShape(22.dp)).background(MaterialTheme.colorScheme.surfaceVariant)
                        .clickable(role = Role.Button) { onStart(ComposeKind.TEXT) }.padding(horizontal = 16.dp)
                        .semantics { contentDescription = "Write a post" },
                    contentAlignment = Alignment.CenterStart,
                ) { Text(if (signedIn) "What's on your mind?" else "Sign in to post", color = MaterialTheme.colorScheme.onSurfaceVariant, style = MaterialTheme.typography.bodyLarge) }
            }
            HorizontalDivider(Modifier.padding(horizontal = 12.dp), color = MaterialTheme.colorScheme.outline.copy(alpha = .35f))
            Row(Modifier.fillMaxWidth().padding(vertical = 2.dp)) {
                QuickAction("❓", "Question", ComposeKind.QUESTION, onStart)
                QuickAction("📊", "My Stats", ComposeKind.STATS, onStart)
                QuickAction("🎯", "Today", ComposeKind.PROGRESS, onStart)
                QuickAction("📅", "Plan", ComposeKind.PLAN, onStart)
            }
        }
    }
}

@Composable
private fun androidx.compose.foundation.layout.RowScope.QuickAction(emoji: String, label: String, kind: ComposeKind, onStart: (ComposeKind) -> Unit) {
    Column(
        Modifier.weight(1f).clickable(role = Role.Button) { onStart(kind) }.padding(vertical = 8.dp).semantics { contentDescription = "Post: $label" },
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(emoji, style = MaterialTheme.typography.titleLarge)
        Text(label, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1)
    }
}

@Composable
private fun FilterRow(current: FeedFilter, onPick: (FeedFilter) -> Unit) {
    Row(Modifier.fillMaxWidth().background(MaterialTheme.colorScheme.surface).padding(horizontal = 12.dp, vertical = 6.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        listOf(FeedFilter.ALL to "All posts", FeedFilter.QUESTIONS to "❓ Questions", FeedFilter.MINE to "My posts").forEach { (f, label) ->
            FilterChip(selected = current == f, onClick = { onPick(f) }, label = { Text(label) })
        }
    }
}

@Composable
private fun SignInCard(onSignIn: () -> Unit) {
    Surface(Modifier.fillMaxWidth(), color = MaterialTheme.colorScheme.surface) {
        Column(Modifier.padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text("👋", style = MaterialTheme.typography.headlineLarge)
            Text("Join the News Feed", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 8.dp))
            Text(
                "Sign in to read what other students share, ask a question, post your study progress, like and comment.",
                textAlign = TextAlign.Center, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(vertical = 8.dp),
            )
            Button(onClick = onSignIn, colors = androidx.compose.material3.ButtonDefaults.buttonColors(containerColor = Sb.Violet)) { Text("Sign in") }
        }
    }
}

@Composable
private fun ErrorCard(message: String, onRetry: () -> Unit) {
    Surface(Modifier.fillMaxWidth(), color = MaterialTheme.colorScheme.surface) {
        Column(Modifier.padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text("📡", style = MaterialTheme.typography.headlineLarge)
            Text("The News Feed could not be loaded", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 8.dp))
            Text(message, textAlign = TextAlign.Center, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(vertical = 8.dp))
            OutlinedButton(onClick = onRetry) { Text("Try again") }
        }
    }
}

@Composable
private fun EmptyCard(filter: FeedFilter, onCreate: () -> Unit) {
    Surface(Modifier.fillMaxWidth(), color = MaterialTheme.colorScheme.surface) {
        Column(Modifier.padding(24.dp), horizontalAlignment = Alignment.CenterHorizontally) {
            Text(if (filter == FeedFilter.QUESTIONS) "❓" else "📰", style = MaterialTheme.typography.headlineLarge)
            Text(
                when (filter) {
                    FeedFilter.QUESTIONS -> "No questions yet"
                    FeedFilter.MINE -> "You have not posted yet"
                    FeedFilter.ALL -> "No posts yet"
                },
                style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 8.dp),
            )
            Text(
                "Be the first: ask a question, share your study progress or tell others about your plan.",
                textAlign = TextAlign.Center, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(vertical = 8.dp),
            )
            Button(onClick = onCreate, colors = androidx.compose.material3.ButtonDefaults.buttonColors(containerColor = Sb.Violet)) { Text("Create a post") }
        }
    }
}

/** A grey outline of a post while the first page is on its way. */
@Composable
private fun PostSkeleton() {
    val pulse by rememberInfiniteTransition(label = "skeleton").animateFloat(0.45f, 1f, infiniteRepeatable(tween(800), RepeatMode.Reverse), label = "alpha")
    val block = MaterialTheme.colorScheme.outline.copy(alpha = .45f)
    Surface(Modifier.fillMaxWidth().alpha(pulse).semantics { contentDescription = "Loading posts" }, color = MaterialTheme.colorScheme.surface) {
        Column(Modifier.padding(12.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(42.dp).clip(RoundedCornerShape(21.dp)).background(block))
                Spacer(Modifier.width(10.dp))
                Column {
                    Box(Modifier.width(130.dp).height(12.dp).clip(RoundedCornerShape(6.dp)).background(block))
                    Spacer(Modifier.height(6.dp))
                    Box(Modifier.width(70.dp).height(10.dp).clip(RoundedCornerShape(5.dp)).background(block))
                }
            }
            Spacer(Modifier.height(12.dp))
            Box(Modifier.fillMaxWidth().height(12.dp).clip(RoundedCornerShape(6.dp)).background(block))
            Spacer(Modifier.height(6.dp))
            Box(Modifier.fillMaxWidth(.8f).height(12.dp).clip(RoundedCornerShape(6.dp)).background(block))
            Spacer(Modifier.height(12.dp))
            Box(Modifier.fillMaxWidth().height(90.dp).clip(RoundedCornerShape(14.dp)).background(block))
        }
    }
}
