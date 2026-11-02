package pk.wantuch.spacebook.ui.me

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.rounded.CalendarMonth
import androidx.compose.material.icons.rounded.Favorite
import androidx.compose.ui.unit.sp
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.graphics.Brush
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.rounded.ArrowBack
import androidx.compose.material.icons.automirrored.rounded.KeyboardArrowRight
import androidx.compose.material.icons.automirrored.rounded.Login
import androidx.compose.material.icons.automirrored.rounded.Logout
import androidx.compose.material.icons.rounded.Bookmark
import androidx.compose.material.icons.rounded.Feedback
import androidx.compose.material.icons.rounded.Delete
import androidx.compose.material.icons.rounded.Download
import androidx.compose.material.icons.rounded.Edit
import androidx.compose.material.icons.rounded.Person
import androidx.compose.material.icons.rounded.Settings
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.Slider
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import pk.wantuch.spacebook.BuildConfig
import pk.wantuch.spacebook.data.local.Bookmark
import pk.wantuch.spacebook.data.local.Note
import pk.wantuch.spacebook.data.repo.LibraryRepository
import pk.wantuch.spacebook.data.splitTitle
import pk.wantuch.spacebook.ui.AppViewModel
import pk.wantuch.spacebook.ui.components.CoinChip
import pk.wantuch.spacebook.ui.components.EmptyState
import pk.wantuch.spacebook.ui.components.SubjectAvatar
import pk.wantuch.spacebook.ui.theme.Sb
import javax.inject.Inject

@HiltViewModel
class SavedViewModel @Inject constructor(private val library: LibraryRepository, private val prefs: pk.wantuch.spacebook.data.Prefs) : ViewModel() {
    val bookmarkList: StateFlow<List<Bookmark>> = library.bookmarks().stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())
    val noteList: StateFlow<List<Note>> = library.notes().stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    /** bookmarks, notes and positions made on this phone before anybody signed in (shown only to a signed-in student) */
    val guestCount = kotlinx.coroutines.flow.MutableStateFlow(0)

    init { viewModelScope.launch { refreshGuest() } }

    private suspend fun refreshGuest() { guestCount.value = if (prefs.state.first().user != null) library.guestCount() else 0 }

    fun removeBookmark(b: Bookmark) = viewModelScope.launch { library.setBookmark(false, b) }
    fun removeNote(n: Note) = viewModelScope.launch { library.deleteNote(n.id) }
    fun addGuestItems() = viewModelScope.launch { prefs.state.first().user?.let { library.adoptGuest(it.id) }; refreshGuest() }
}

@Composable
fun MeScreen(app: AppViewModel, onSignIn: () -> Unit, onSaved: () -> Unit, onSettings: () -> Unit, onOffline: () -> Unit, onAccount: () -> Unit = {}, onPlans: () -> Unit = {}, onMyPlans: () -> Unit = {}, onKey: () -> Unit = {}, onFeedback: () -> Unit = {}) {
    val state by app.state.collectAsStateWithLifecycle()
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val entitlements by app.entitlements.collectAsStateWithLifecycle()
    MeContent(state.user, state.coins, catalog?.classes.orEmpty(), state.classId, onPickClass = { app.setClass(it) }, onSignIn = onSignIn, onSignOut = { app.logout() }, onSaved = onSaved, onSettings = onSettings, onOffline = onOffline, onAccount = onAccount,
        plans = if (state.user != null) entitlements.subscriptions else emptyList(), pendingPayments = if (state.user != null) entitlements.pendingPayments else 0, onPlans = onPlans, onMyPlans = onMyPlans, onKey = onKey, onFeedback = onFeedback)
}

/** The plans of the signed-in person (the same ones the website shows), what is waiting for approval, and the way to buy or renew. */
@Composable
internal fun PlansCard(plans: List<pk.wantuch.spacebook.data.remote.SubscriptionDto>, pending: Int, signedIn: Boolean, onPlans: () -> Unit, onMyPlans: () -> Unit, onKey: () -> Unit = {}) {
    Surface(shape = MaterialTheme.shapes.large, shadowElevation = 1.dp, modifier = Modifier.fillMaxWidth().padding(horizontal = 12.dp, vertical = 8.dp)) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text("My plans", style = MaterialTheme.typography.titleMedium)
            if (plans.isEmpty()) Text("Chapters 1 and 2 of every subject are free. Plans open the rest: from PKR 500 a month.", style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
            plans.forEach { p ->
                val state = when (p.status) { "active" -> "Active · ${p.daysLeft} day${if (p.daysLeft == 1) "" else "s"} left"; "suspended" -> "Suspended"; else -> "Ended" }
                Column {
                    Text(p.label, style = MaterialTheme.typography.titleSmall)
                    Text(listOfNotNull(state, p.expiresAt?.take(10)?.let { "ends $it" }).joinToString(" · "), style = MaterialTheme.typography.bodySmall,
                        color = if (p.status == "active") MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error)
                }
            }
            if (pending > 0) Text("⏳ $pending payment${if (pending == 1) " is" else "s are"} waiting to be checked (Pending Verification).", style = MaterialTheme.typography.bodyMedium)
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = onPlans, modifier = Modifier.weight(1f)) { Text(if (plans.isEmpty()) "See plans" else "Buy or renew") }
                if (signedIn) OutlinedButton(onClick = onMyPlans, modifier = Modifier.weight(1f)) { Text("Payments") }
            }
            OutlinedButton(onClick = onKey, modifier = Modifier.fillMaxWidth()) { Text("Enter licence key") }
        }
    }
}

@Composable
internal fun MeContent(
    user: pk.wantuch.spacebook.data.remote.UserDto?,
    coins: Int,
    classes: List<pk.wantuch.spacebook.data.remote.ClassDto>,
    classId: String,
    onPickClass: (String) -> Unit,
    onSignIn: () -> Unit,
    onSignOut: () -> Unit,
    onSaved: () -> Unit,
    onSettings: () -> Unit,
    onOffline: () -> Unit,
    onAccount: () -> Unit = {},
    onFeedback: () -> Unit = {},
    plans: List<pk.wantuch.spacebook.data.remote.SubscriptionDto> = emptyList(),
    pendingPayments: Int = 0,
    onPlans: () -> Unit = {},
    onMyPlans: () -> Unit = {},
    onKey: () -> Unit = {},
) {
    val navy = Color(0xFF0B2056)
    val line = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFD7E6F8))
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 12.dp).padding(bottom = 24.dp)) {
        // who the student is: avatar, name, class and coins
        Surface(shape = RoundedCornerShape(18.dp), color = MaterialTheme.colorScheme.surface, border = line, shadowElevation = 1.dp, modifier = Modifier.fillMaxWidth()) {
            Row(Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(84.dp).clip(CircleShape).background(Brush.linearGradient(listOf(Color(0xFFBFD9FF), Color(0xFF5AAEFF)))), contentAlignment = Alignment.Center) {
                    Text(user?.name?.trim()?.firstOrNull()?.uppercase() ?: "👤", color = Color.White, fontSize = 34.sp, fontWeight = FontWeight.ExtraBold)
                }
                Column(Modifier.weight(1f).padding(start = 14.dp)) {
                    Text(user?.name ?: "Guest", fontSize = 20.sp, fontWeight = FontWeight.ExtraBold, color = navy, maxLines = 2)
                    Text(if (user != null) user.whatsapp else "Reading without an account", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    classes.firstOrNull { it.id == classId }?.let { c ->
                        Text(c.name, color = Color(0xFF0785FF), fontWeight = FontWeight.SemiBold, fontSize = 13.sp,
                            modifier = Modifier.padding(top = 6.dp).clip(RoundedCornerShape(10.dp)).background(Color(0xFFE3F0FF)).padding(horizontal = 12.dp, vertical = 6.dp))
                    }
                }
                Column(horizontalAlignment = Alignment.Start) {
                    Text("🪙 $coins", fontSize = 22.sp, fontWeight = FontWeight.ExtraBold, color = navy)
                    Text("Coins", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
        Spacer(Modifier.height(10.dp))
        if (user == null) Button(onClick = onSignIn, modifier = Modifier.fillMaxWidth().height(52.dp)) {
            Icon(Icons.AutoMirrored.Rounded.Login, null); Spacer(Modifier.width(8.dp)); Text("Sign in or create account")
        }
        // the plans the person has bought (same as the website's My Plans)
        PlansCard(plans, pendingPayments, user != null, onPlans, onMyPlans, onKey)
        // my classes
        Surface(shape = RoundedCornerShape(18.dp), color = MaterialTheme.colorScheme.surface, border = line, shadowElevation = 1.dp, modifier = Modifier.fillMaxWidth().padding(top = 4.dp)) {
            Column(Modifier.padding(14.dp)) {
                Text("My Classes", fontSize = 18.sp, fontWeight = FontWeight.ExtraBold, color = navy)
                val chipState = androidx.compose.foundation.lazy.rememberLazyListState()
                androidx.compose.runtime.LaunchedEffect(classId, classes.size) { val k = classes.indexOfFirst { it.id == classId }; if (k > 1) chipState.scrollToItem(k - 1) }
                LazyRow(Modifier.padding(top = 10.dp), state = chipState, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    items(classes, key = { it.id }) { c ->
                        val on = classId == c.id
                        Text(c.name, color = if (on) Color(0xFF0785FF) else navy, fontWeight = if (on) FontWeight.Bold else FontWeight.Normal,
                            modifier = Modifier.clip(RoundedCornerShape(10.dp)).background(if (on) Color.White else Color(0xFFEAF1FA))
                                .border(if (on) 1.5.dp else 0.dp, if (on) Color(0xFF0785FF) else Color.Transparent, RoundedCornerShape(10.dp))
                                .clickable { onPickClass(c.id) }.padding(horizontal = 16.dp, vertical = 11.dp))
                    }
                }
            }
        }
        // the menu: one card, coloured icon squares, thin dividers
        Surface(shape = RoundedCornerShape(18.dp), color = MaterialTheme.colorScheme.surface, border = line, shadowElevation = 1.dp, modifier = Modifier.fillMaxWidth().padding(top = 10.dp)) {
            Column {
                if (user != null) MenuRow(Icons.Rounded.Person, "My Account", Color(0xFF0785FF), onAccount)
                MenuRow(Icons.Rounded.Favorite, "Saved", Color(0xFFE8304F), onSaved)
                MenuRow(Icons.Rounded.Download, "Books on this phone", Color(0xFF7A3FE0), onOffline)
                MenuRow(Icons.Rounded.Feedback, "Suggestions and problems", Color(0xFF14A5A5), onFeedback)
                MenuRow(Icons.Rounded.CalendarMonth, "My Plans", Color(0xFF12A05C), onMyPlans)
                MenuRow(Icons.Rounded.Settings, "Settings", Color(0xFFF58220), onSettings, last = user == null)
                if (user != null) MenuRow(Icons.AutoMirrored.Rounded.Logout, "Sign Out", Color(0xFFE8304F), onSignOut, last = true)
            }
        }
        Text("SpaceBook ${BuildConfig.VERSION_NAME}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, modifier = Modifier.padding(16.dp))
    }
}

@Composable
private fun MenuRow(icon: ImageVector, title: String, tint: Color, onClick: () -> Unit, last: Boolean = false) {
    Column(Modifier.clickable(onClick = onClick)) {
        Row(Modifier.padding(horizontal = 14.dp, vertical = 10.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.size(40.dp).clip(RoundedCornerShape(11.dp)).background(tint), contentAlignment = Alignment.Center) { Icon(icon, null, tint = Color.White, modifier = Modifier.size(24.dp)) }
            Text(title, Modifier.weight(1f).padding(start = 14.dp), fontSize = 16.sp, fontWeight = FontWeight.SemiBold, color = Color(0xFF0B2056))
            Icon(Icons.AutoMirrored.Rounded.KeyboardArrowRight, null, tint = Color(0xFF0B2056))
        }
        if (!last) androidx.compose.material3.HorizontalDivider(Modifier.padding(start = 68.dp), color = Color(0xFFE3ECF7))
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SavedScreen(app: AppViewModel, onBack: () -> Unit, onOpen: (subjectId: String, chapter: Int, page: Int, tab: String) -> Unit, vm: SavedViewModel = hiltViewModel()) {
    val catalog by app.catalog.collectAsStateWithLifecycle()
    val marks by vm.bookmarkList.collectAsStateWithLifecycle()
    val notes by vm.noteList.collectAsStateWithLifecycle()
    val guest by vm.guestCount.collectAsStateWithLifecycle()
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Saved") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background))
        },
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        if (marks.isEmpty() && notes.isEmpty() && guest == 0) {
            EmptyState("🔖", "Nothing saved yet", "Tap the bookmark while reading a page, or write a note, and it shows up here.", Modifier.padding(pad))
        } else LazyColumn(Modifier.fillMaxSize().padding(pad), contentPadding = PaddingValues(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            if (guest > 0) item(key = "guest") {
                Surface(shape = MaterialTheme.shapes.medium, color = MaterialTheme.colorScheme.secondaryContainer, modifier = Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(12.dp)) {
                        Text("$guest saved ${if (guest == 1) "item was" else "items were"} made on this phone before you signed in. Add ${if (guest == 1) "it" else "them"} to your account?", style = MaterialTheme.typography.bodyMedium)
                        TextButton(onClick = vm::addGuestItems) { Text("Yes, add to my account") }
                    }
                }
            }
            if (marks.isNotEmpty()) item { Text("Bookmarks", style = MaterialTheme.typography.titleMedium) }
            items(marks, key = { "b${it.subjectId}:${it.chapterIndex}:${it.tab}:${it.page}" }) { b ->
                val s = catalog?.subject(b.subjectId)
                Surface(shape = MaterialTheme.shapes.medium, shadowElevation = 1.dp, modifier = Modifier.fillMaxWidth().clickable { onOpen(b.subjectId, b.chapterIndex, b.page, b.tab) }) {
                    Row(Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                        SubjectAvatar(s?.emoji ?: "📘", b.subjectId, size = 40.dp)
                        Spacer(Modifier.width(12.dp))
                        Column(Modifier.weight(1f)) {
                            Text(b.title, style = MaterialTheme.typography.titleSmall, maxLines = 2, overflow = TextOverflow.Ellipsis)
                            Text("${s?.name ?: ""} · ${if (b.tab.isNotBlank()) b.tab + " · " else ""}page ${b.page + 1}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                        IconButton(onClick = { vm.removeBookmark(b) }) { Icon(Icons.Rounded.Delete, "Remove bookmark") }
                    }
                }
            }
            if (notes.isNotEmpty()) item { Text("Notes and highlights", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 8.dp)) }
            items(notes, key = { "n${it.id}" }) { n ->
                Surface(shape = MaterialTheme.shapes.medium, color = MaterialTheme.colorScheme.surfaceVariant, modifier = Modifier.fillMaxWidth().clickable { onOpen(n.subjectId, n.chapterIndex, n.page, n.tab) }) {
                    Row(Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) {
                            if (n.quote.isNotBlank()) Text("“${n.quote}”", style = MaterialTheme.typography.bodyMedium, fontStyle = androidx.compose.ui.text.font.FontStyle.Italic)
                            if (n.text.isNotBlank()) Text(n.text, style = MaterialTheme.typography.bodyLarge)
                            Text("${n.title} · ${if (n.tab.isNotBlank()) n.tab + " · " else ""}page ${n.page + 1}", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1, overflow = TextOverflow.Ellipsis)
                        }
                        IconButton(onClick = { vm.removeNote(n) }) { Icon(Icons.Rounded.Delete, "Delete note") }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(app: AppViewModel, onBack: () -> Unit) {
    val state by app.state.collectAsStateWithLifecycle()
    var site by remember(state.baseUrlOverride) { mutableStateOf(state.baseUrlOverride) }
    var siteError by remember { mutableStateOf(false) }
    var scale by remember(state.fontScale) { mutableStateOf(state.fontScale.toFloat()) }
    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Settings") }, navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.AutoMirrored.Rounded.ArrowBack, "Back") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background))
        },
        containerColor = MaterialTheme.colorScheme.background,
    ) { pad ->
        Column(Modifier.fillMaxSize().padding(pad).verticalScroll(rememberScrollState()).padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Look", style = MaterialTheme.typography.titleMedium)
            val modes = listOf("Phone" to 0, "Light" to 1, "Dark" to 2)
            SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                modes.forEachIndexed { i, (label, v) ->
                    SegmentedButton(state.themeMode == v, { app.setTheme(v) }, SegmentedButtonDefaults.itemShape(i, modes.size)) { Text(label) }
                }
            }
            Text("Text size: ${scale.toInt()}%", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 12.dp))
            Slider(scale, { scale = it }, valueRange = 80f..160f, steps = 7, onValueChangeFinished = { app.setFontScale(scale.toInt()) })
            Text("Books and the app both get bigger. Small children may like 130%.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)

            val ctx = androidx.compose.ui.platform.LocalContext.current
            val askNotifications = androidx.activity.compose.rememberLauncherForActivityResult(androidx.activity.result.contract.ActivityResultContracts.RequestPermission()) { granted ->
                app.setReminders(granted)
                if (!granted) android.widget.Toast.makeText(ctx, "Reminders need permission to show notifications. You can allow it in the phone's settings.", android.widget.Toast.LENGTH_LONG).show()
            }
            Row(Modifier.fillMaxWidth().padding(top = 20.dp), verticalAlignment = Alignment.CenterVertically) {
                Column(Modifier.weight(1f)) {
                    Text("Study reminders", style = MaterialTheme.typography.titleMedium)
                    Text("A notification when a session of your study plan starts, with what to study.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                androidx.compose.material3.Switch(checked = state.remindersOn, onCheckedChange = { on ->
                    if (on && !pk.wantuch.spacebook.data.reminders.ReminderScheduler.canNotify(ctx)) askNotifications.launch(android.Manifest.permission.POST_NOTIFICATIONS)
                    else app.setReminders(on)
                })
            }

            Text("Server (for developers)", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
            Text("Leave empty to use wantuch.pk/spacebook. On the emulator, http://10.0.2.2:8790/ reaches the PHP server on your PC.", style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            OutlinedTextField(site, { site = it; siteError = false }, Modifier.fillMaxWidth(), singleLine = true, label = { Text("Site address") }, isError = siteError,
                supportingText = { if (siteError) Text("Use https://… (or http:// only for 10.0.2.2 / localhost)") })
            Button(onClick = { siteError = !app.setBaseUrl(site.trim()) }) { Text("Use this address") }

            val context = androidx.compose.ui.platform.LocalContext.current
            val gate = remember { pk.wantuch.spacebook.expiry.ExpiryGate.forApp(context).check() }
            if (gate is pk.wantuch.spacebook.expiry.LockState.Counting) {
                val date = java.text.DateFormat.getDateInstance(java.text.DateFormat.LONG).format(java.util.Date(gate.expiresAt))
                Text("Preview build", style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 20.dp))
                Text("This preview works until $date (${gate.daysLeft} ${if (gate.daysLeft == 1) "day" else "days"} left). After that it needs the unlock code from the SpaceBook team.",
                    style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}
