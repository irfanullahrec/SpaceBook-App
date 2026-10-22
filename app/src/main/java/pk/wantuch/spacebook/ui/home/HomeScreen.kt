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

/** Where a Home post can send the student. */
data class HomeActions(
    val openChapter: (subjectId: String, chapter: Int, page: Int) -> Unit,
    val openSubject: (subjectId: String) -> Unit,
    val openPractice: () -> Unit,
    val openPlan: () -> Unit,
    val openGames: () -> Unit,
    val openSearch: () -> Unit,
    val openProfile: () -> Unit,
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(app: AppViewModel, actions: HomeActions, vm: HomeViewModel = hiltViewModel()) {
    val state by app.state.collectAsStateWithLifecycle()
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val feed by vm.feed.collectAsStateWithLifecycle()
    val reactions by vm.reactions.collectAsStateWithLifecycle()
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
            actions = actions,
            onPickClass = { app.setClass(it) },
            onLike = vm::toggleLike,
            onSave = vm::toggleSave,
            onShare = { text -> share(context, text, app.siteUrl("")) },
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
    actions: HomeActions,
    onPickClass: (String) -> Unit,
    onLike: (String) -> Unit,
    onSave: (String) -> Unit,
    onShare: (String) -> Unit,
) {
    var pickingClass by remember { mutableStateOf(false) }
    if (pickingClass) ClassPickerDialog(allClasses, cls?.id.orEmpty(), onPick = onPickClass, onDismiss = { pickingClass = false })
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(bottom = 24.dp)) {
        item(key = "top") { TopBar(coins, userName, cls?.name, actions, onClass = { pickingClass = true }) }
        item(key = "composer") { ComposerBar(actions.openSearch) }
        if (firstRun && allClasses.isNotEmpty()) item(key = "classpick") { ClassPickerCard(allClasses, onPickClass) }
        if (cls != null) {
            item(key = "stories") {
                StoryRow(cls, hasContinue = feed.any { it is FeedPost.Continue }, actions = actions,
                    onContinue = { (feed.firstOrNull { it is FeedPost.Continue } as? FeedPost.Continue)?.let { c -> actions.openChapter(c.position.subjectId, c.position.chapterIndex, c.position.page) } })
            }
        } else {
            item(key = "loading") { Box(Modifier.fillMaxWidth().padding(40.dp), contentAlignment = Alignment.Center) { Text("Loading your books…", style = MaterialTheme.typography.bodyLarge) } }
        }
        items(feed, key = { it.id }) { post ->
            val r = reactions[post.id]
            when (post) {
                is FeedPost.Chapter -> ChapterPostCard(
                    post, liked = r?.liked == true, saved = r?.saved == true,
                    onLike = { onLike(post.id) },
                    onSave = { onSave(post.id) },
                    onRead = { actions.openChapter(post.subject.id, post.chapterIndex, 0) },
                    onShare = { onShare("${splitTitle(post.chapter.t).primary} - ${post.subject.name}, ${post.className}") },
                )
                is FeedPost.Continue -> ContinuePostCard(post) { actions.openChapter(post.position.subjectId, post.position.chapterIndex, post.position.page) }
                is FeedPost.Practice -> PromoPost("📝", "practice", "Test yourself", "Tests Preps, papers and board practice for your class", "Practise now", Icons.Rounded.Quiz, actions.openPractice)
                is FeedPost.Plan -> PromoPost("📅", "plan", "Make a study plan", "Pick your exam day and SpaceBook plans every lesson for you", "Plan my days", Icons.Rounded.CalendarMonth, actions.openPlan)
                is FeedPost.Games -> PromoPost("🎮", "games", "Play and earn coins", "Little games made from the page you are reading", "Let's play", Icons.Rounded.SportsEsports, actions.openGames)
            }
        }
    }
}

@Composable
private fun TopBar(coins: Int, name: String?, className: String?, actions: HomeActions, onClass: () -> Unit) {
    Row(Modifier.fillMaxWidth().padding(start = 16.dp, end = 8.dp, top = 12.dp, bottom = 4.dp), verticalAlignment = Alignment.CenterVertically) {
        Text(
            "SpaceBook",
            style = MaterialTheme.typography.headlineMedium.copy(brush = Sb.Brand),
            modifier = Modifier.weight(1f),
        )
        if (className != null) {
            Surface(
                shape = RoundedCornerShape(50), color = MaterialTheme.colorScheme.primaryContainer,
                modifier = Modifier.padding(end = 6.dp).clickable(onClickLabel = "Change class", onClick = onClass),
            ) {
                Row(Modifier.padding(start = 12.dp, end = 6.dp, top = 6.dp, bottom = 6.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text(className, style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.onPrimaryContainer)
                    Icon(Icons.Rounded.ArrowDropDown, "Change class", tint = MaterialTheme.colorScheme.onPrimaryContainer)
                }
            }
        }
        CoinChip(coins)
        IconButton(onClick = actions.openSearch) { Icon(Icons.Rounded.Search, "Search books") }
        IconButton(onClick = actions.openProfile) {
            if (name.isNullOrBlank()) Icon(Icons.Rounded.Person, "Sign in")
            else Box(Modifier.size(34.dp).clip(CircleShape).background(Sb.Brand), contentAlignment = Alignment.Center) {
                Text(name.trim().first().uppercase(), color = Color.White, fontWeight = FontWeight.Bold)
            }
        }
    }
}

/** Like Facebook's "What's on your mind?" bar, but for studying. */
@Composable
private fun ComposerBar(onClick: () -> Unit) {
    Surface(
        shape = RoundedCornerShape(50), color = MaterialTheme.colorScheme.surface, shadowElevation = 2.dp,
        modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 6.dp).clickable(onClick = onClick),
    ) {
        Row(Modifier.padding(horizontal = 18.dp, vertical = 14.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Rounded.Search, null, tint = MaterialTheme.colorScheme.primary)
            Spacer(Modifier.width(10.dp))
            Text("What do you want to study today?", color = MaterialTheme.colorScheme.onSurfaceVariant, style = MaterialTheme.typography.bodyLarge)
        }
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

/** Story circles: your class's books, and "Continue" first when you were in the middle of one. */
@Composable
private fun StoryRow(cls: ClassDto, hasContinue: Boolean, actions: HomeActions, onContinue: () -> Unit) {
    LazyRow(contentPadding = PaddingValues(horizontal = 12.dp, vertical = 8.dp), horizontalArrangement = Arrangement.spacedBy(14.dp)) {
        if (hasContinue) item(key = "continue") {
            Column(Modifier.width(80.dp).clickable(onClick = onContinue), horizontalAlignment = Alignment.CenterHorizontally) {
                SubjectAvatar("▶", "continue", size = 58.dp, ring = true)
                Text("Continue", style = MaterialTheme.typography.labelMedium, maxLines = 1)
            }
        }
        items(cls.subjects, key = { it.id }) { s ->
            Column(Modifier.width(80.dp).clickable { actions.openSubject(s.id) }, horizontalAlignment = Alignment.CenterHorizontally) {
                SubjectAvatar(s.emoji, s.id, size = 58.dp, ring = true)
                Text(s.name, style = MaterialTheme.typography.labelMedium.copy(fontSize = 12.sp), maxLines = 2, textAlign = TextAlign.Center, overflow = TextOverflow.Ellipsis)
            }
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

@Composable
private fun PromoPost(emoji: String, key: String, title: String, text: String, cta: String, icon: androidx.compose.ui.graphics.vector.ImageVector, onClick: () -> Unit) {
    PostCard(
        avatarEmoji = emoji, avatarKey = key, title = title, subtitle = "SpaceBook", onClick = onClick,
        banner = {
            Box(Modifier.fillMaxWidth().background(Sb.brushFor(key)).padding(20.dp)) {
                Column {
                    Text(text, color = Color.White, style = MaterialTheme.typography.titleMedium)
                    Spacer(Modifier.height(12.dp))
                    Surface(shape = RoundedCornerShape(50), color = Color.White) {
                        Row(Modifier.padding(horizontal = 18.dp, vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
                            Icon(icon, null, tint = Sb.Violet)
                            Spacer(Modifier.width(8.dp))
                            Text(cta, color = Sb.VioletDeep, style = MaterialTheme.typography.labelLarge)
                        }
                    }
                }
            }
        },
    )
}

private fun share(context: android.content.Context, text: String, url: String) {
    val send = Intent(Intent.ACTION_SEND).setType("text/plain").putExtra(Intent.EXTRA_TEXT, "$text\n$url")
    context.startActivity(Intent.createChooser(send, "Share").addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
}
