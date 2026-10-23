package pk.wantuch.spacebook.ui.home

import android.content.Intent
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
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.MenuBook
import androidx.compose.material.icons.rounded.ArrowDropDown
import androidx.compose.material.icons.rounded.Bookmark
import androidx.compose.material.icons.rounded.BookmarkBorder
import androidx.compose.material.icons.rounded.CalendarMonth
import androidx.compose.material.icons.rounded.Person
import androidx.compose.material.icons.rounded.PlayArrow
import androidx.compose.material.icons.rounded.Quiz
import androidx.compose.material.icons.rounded.Search
import androidx.compose.material.icons.rounded.Share
import androidx.compose.material.icons.rounded.SportsEsports
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import androidx.compose.runtime.rememberCoroutineScope
import pk.wantuch.spacebook.data.play.PlayState
import pk.wantuch.spacebook.data.play.todayNumber
import pk.wantuch.spacebook.data.remote.ClassDto
import pk.wantuch.spacebook.data.splitTitle
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.components.ClassPickerDialog
import pk.wantuch.spacebook.ui.components.ClassStrip
import pk.wantuch.spacebook.ui.components.CoinChip
import pk.wantuch.spacebook.ui.components.GradientBanner
import pk.wantuch.spacebook.ui.components.LikeAction
import pk.wantuch.spacebook.ui.components.PostAction
import pk.wantuch.spacebook.ui.components.PostCard
import pk.wantuch.spacebook.ui.components.SubjectAvatar
import pk.wantuch.spacebook.ui.theme.Sb

/** Where Home can send the student. */
data class HomeActions(
    val openChapter: (subjectId: String, chapter: Int, page: Int) -> Unit,
    val openSubject: (subjectId: String) -> Unit,
    val openPractice: () -> Unit,
    val openPlan: () -> Unit,
    val openGames: () -> Unit,
    val openSearch: () -> Unit,
    val openProfile: () -> Unit,
    val openQuiz: () -> Unit = {},
    val openReels: () -> Unit = {},
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(app: AppViewModel, actions: HomeActions, vm: HomeViewModel = hiltViewModel()) {
    val state by app.state.collectAsStateWithLifecycle()
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val feed by vm.feed.collectAsStateWithLifecycle()
    val reactions by vm.reactions.collectAsStateWithLifecycle()
    val play by vm.play.collectAsStateWithLifecycle()
    val chestReward by vm.chestReward.collectAsStateWithLifecycle()
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var refreshing by remember { mutableStateOf(false) }
    val cls = catalog?.cls(vm.effectiveClass(state.classId, catalog))

    PullToRefreshBox(
        isRefreshing = refreshing,
        onRefresh = { scope.launch { refreshing = true; app.refresh(); delay(900); refreshing = false } },
        modifier = Modifier.fillMaxSize(),
    ) {
        HomeContent(
            coins = state.coins,
            userName = state.user?.name,
            allClasses = catalog?.classes.orEmpty(),
            firstRun = state.classId.isBlank(),
            cls = cls,
            feed = feed,
            reactions = reactions,
            play = play,
            today = remember { todayNumber() },
            greeting = remember { greetingFor(java.util.Calendar.getInstance().get(java.util.Calendar.HOUR_OF_DAY)) },
            chestReward = chestReward,
            actions = actions,
            onPickClass = { app.setClass(it) },
            onLike = vm::toggleLike,
            onSave = vm::toggleSave,
            onShare = { text -> share(context, text, app.siteUrl("")) },
            onOpenChest = vm::openChest,
            onCloseChest = vm::closeChest,
        )
    }
}

/** Everything Home draws, with no view model: the same composable is used by the screenshot tests. */
@Composable
internal fun HomeContent(
    coins: Int,
    userName: String?,
    allClasses: List<ClassDto>,
    /** no class chosen yet: show the "which class are you in?" cards */
    firstRun: Boolean,
    cls: ClassDto?,
    feed: List<FeedPost>,
    reactions: Map<String, pk.wantuch.spacebook.data.local.Reaction>,
    play: PlayState,
    today: Int,
    greeting: String,
    chestReward: Int?,
    actions: HomeActions,
    onPickClass: (String) -> Unit,
    onLike: (String) -> Unit,
    onSave: (String) -> Unit,
    onShare: (String) -> Unit,
    onOpenChest: () -> Unit,
    onCloseChest: () -> Unit,
) {
    var pickingClass by remember { mutableStateOf(false) }
    var chestOpen by remember { mutableStateOf(false) }
    if (pickingClass) ClassPickerDialog(allClasses, cls?.id.orEmpty(), onPick = onPickClass, onDismiss = { pickingClass = false })
    if (chestOpen) ChestDialog(chestReward, onOpen = onOpenChest, onClose = { chestOpen = false; onCloseChest() })
    val resume = feed.firstOrNull { it is FeedPost.Continue } as? FeedPost.Continue
    val firstLesson = feed.firstOrNull { it is FeedPost.Chapter } as? FeedPost.Chapter
    val openLesson = {
        when {
            resume != null -> actions.openChapter(resume.position.subjectId, resume.position.chapterIndex, resume.position.page)
            firstLesson != null -> actions.openChapter(firstLesson.subject.id, firstLesson.chapterIndex, 0)
            else -> actions.openSearch()
        }
    }
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(bottom = 24.dp)) {
        item(key = "header") { HomeHeader(greeting, userName, cls?.name, coins, play, today, actions, onClass = { pickingClass = true }) }
        if (firstRun && allClasses.isNotEmpty()) item(key = "classpick") { ClassPickerCard(allClasses, onPickClass) }
        item(key = "mission") { MissionCard(play, today, onQuiz = actions.openQuiz, onLesson = openLesson, onChest = { chestOpen = true }) }
        item(key = "play") { PlayShortcuts(actions.openQuiz, actions.openReels) }
        if (resume != null) item(key = "continue") { ContinuePostCard(resume) { actions.openChapter(resume.position.subjectId, resume.position.chapterIndex, resume.position.page) } }
        if (cls != null) item(key = "shelf") { BookShelf(cls, actions.openSubject) }
        else item(key = "loading") { Box(Modifier.fillMaxWidth().padding(40.dp), contentAlignment = Alignment.Center) { Text("Loading your books…", style = MaterialTheme.typography.bodyLarge) } }
        val lessons = feed.filterIsInstance<FeedPost.Chapter>().take(3)
        if (lessons.isNotEmpty()) item(key = "lessons-title") { Text("Today's lessons", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(start = 16.dp, end = 16.dp, top = 14.dp, bottom = 2.dp)) }
        items(lessons, key = { it.id }) { post ->
            val r = reactions[post.id]
            ChapterPostCard(
                post, liked = r?.liked == true, saved = r?.saved == true,
                onLike = { onLike(post.id) },
                onSave = { onSave(post.id) },
                onRead = { actions.openChapter(post.subject.id, post.chapterIndex, 0) },
                onShare = { onShare("${splitTitle(post.chapter.t).primary} - ${post.subject.name}, ${post.className}") },
            )
        }
        item(key = "badges") { BadgeRow(play) }
    }
}

@Composable
private fun ClassPickerCard(classes: List<ClassDto>, onPick: (String) -> Unit) {
    Surface(shape = MaterialTheme.shapes.large, color = MaterialTheme.colorScheme.primaryContainer, modifier = Modifier.fillMaxWidth().padding(12.dp)) {
        Column(Modifier.padding(vertical = 16.dp)) {
            Text("Welcome to SpaceBook! 👋", style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(horizontal = 16.dp))
            Text("Which class are you in?", style = MaterialTheme.typography.bodyLarge, modifier = Modifier.padding(start = 16.dp, end = 16.dp, top = 4.dp))
            ClassStrip(classes, selected = "", onPick = onPick, cardWidth = 150.dp)
        }
    }
}

@Composable
private fun ChapterPostCard(
    post: FeedPost.Chapter, liked: Boolean, saved: Boolean,
    onLike: () -> Unit, onSave: () -> Unit, onRead: () -> Unit, onShare: () -> Unit,
) {
    val t = splitTitle(post.chapter.t)
    PostCard(
        avatarEmoji = post.subject.emoji, avatarKey = post.subject.id,
        title = post.subject.name + if (post.subject.ur.isNotBlank()) " · ${post.subject.ur}" else "",
        subtitle = "${post.className} · Today's lesson",
        onClick = onRead,
        banner = { GradientBanner(post.subject.id, t.number.ifBlank { post.subject.emoji }, t.primary, caption = if (t.number.isNotBlank()) "Chapter ${t.number}" else "", height = 170.dp, coverId = post.subject.id, coverEmoji = post.subject.emoji) },
        chips = buildList {
            add("Read")
            if (post.chapter.n > 0) add("${post.chapter.n} questions")
            if (t.local.isNotBlank()) add(t.local.take(18))
        },
        actions = {
            LikeAction(liked, onLike)
            PostAction(Icons.AutoMirrored.Rounded.MenuBook, "Read", onRead, tint = MaterialTheme.colorScheme.primary)
            PostAction(if (saved) Icons.Rounded.Bookmark else Icons.Rounded.BookmarkBorder, if (saved) "Saved" else "Save", onSave, active = saved)
            PostAction(Icons.Rounded.Share, "Share", onShare)
        },
    )
}

@Composable
private fun ContinuePostCard(post: FeedPost.Continue, onOpen: () -> Unit) {
    val s = post.subject
    val t = splitTitle(post.position.chapterTitle)
    PostCard(
        avatarEmoji = s?.emoji ?: "📘", avatarKey = post.position.subjectId,
        title = "Continue: ${s?.name ?: "your book"}",
        subtitle = "${post.className} · page ${post.position.page + 1} of ${post.position.pageCount.coerceAtLeast(1)}",
        onClick = onOpen,
        banner = { GradientBanner(post.position.subjectId, "▶", t.primary, caption = "Where you stopped", height = 140.dp, coverId = post.position.subjectId, coverEmoji = s?.emoji ?: "📘") },
        actions = { PostAction(Icons.Rounded.PlayArrow, "Continue reading", onOpen, tint = MaterialTheme.colorScheme.primary) },
    )
}

private fun share(context: android.content.Context, text: String, url: String) {
    val send = Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, "$text\n$url")
    context.startActivity(Intent.createChooser(send, "Share").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
}
