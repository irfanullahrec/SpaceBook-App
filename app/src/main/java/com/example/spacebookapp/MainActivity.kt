package com.example.spacebookapp

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.HourglassBottom
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Nightlight
import androidx.compose.material.icons.filled.SelfImprovement
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.Icon
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.brain.BrainProgressManager
import com.example.spacebookapp.data.repository.SpaceBookRepository
import com.example.spacebookapp.data.web.WebRepository
import com.example.spacebookapp.ui.brain.BrainZoneHubScreen
import com.example.spacebookapp.ui.brain.QuickPlayFeedScreen
import com.example.spacebookapp.ui.components.BottomTab
import com.example.spacebookapp.ui.components.FacebookBottomNav
import com.example.spacebookapp.ui.drawer.DrawerDestination
import com.example.spacebookapp.ui.drawer.StudySidebarDrawer
import com.example.spacebookapp.ui.screens.Class1BooksHubScreen
import com.example.spacebookapp.ui.screens.Class3BooksHubScreen
import com.example.spacebookapp.ui.screens.Class7BooksHubScreen
import com.example.spacebookapp.ui.screens.ExamRoadmapScreen
import com.example.spacebookapp.ui.screens.KidsLearnBooksScreen
import com.example.spacebookapp.ui.screens.KidsProfileScreen
import com.example.spacebookapp.ui.screens.SpaceBookFeedScreen
import com.example.spacebookapp.ui.screens.StudyPlanScreen
import com.example.spacebookapp.ui.screens.SubjectsUnitsScreen
import com.example.spacebookapp.ui.screens.TextbooksScreen
import com.example.spacebookapp.ui.theme.SpaceBookAppTheme
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.util.Calendar

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WebRepository.init(applicationContext)
        enableEdgeToEdge()
        setContent {
            SpaceBookAppTheme {
                SpaceBookMainApp()
            }
        }
    }
}

@Composable
fun SpaceBookMainApp() {
    val context = LocalContext.current
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()

    var currentDestination by remember { mutableStateOf(DrawerDestination.HOME) }
    var selectedBottomTab by remember { mutableStateOf(BottomTab.LEARN) }

    // ─── Screen Time & Safety Controls ───
    var elapsedSeconds by remember { mutableIntStateOf(0) }
    var showBreakReminder by remember { mutableStateOf(false) }
    var breakCountdownSeconds by remember { mutableIntStateOf(60) }
    var showParentBreakDismiss by remember { mutableStateOf(false) }
    var parentBreakAnswer by remember { mutableStateOf("") }

    val brainSettings = remember { BrainProgressManager.load(context) }
    var isBedtimeLocked by remember { mutableStateOf(false) }

    // Continuous timer for break reminder
    LaunchedEffect(Unit) {
        // Bedtime check: between 8 PM (20) and 7 AM (7)
        val currentHour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
        if (currentHour >= 20 || currentHour < 7) {
            // Can be dismissed by parent
            isBedtimeLocked = true
        }

        while (true) {
            delay(1000)
            elapsedSeconds++
            val limitSecs = brainSettings.screenLimitMinutes * 60
            if (elapsedSeconds > 0 && elapsedSeconds % limitSecs == 0) {
                showBreakReminder = true
                breakCountdownSeconds = 60
            }
        }
    }

    // Countdown for break reminder
    LaunchedEffect(showBreakReminder) {
        if (showBreakReminder) {
            while (breakCountdownSeconds > 0) {
                delay(1000)
                breakCountdownSeconds--
            }
            showBreakReminder = false
        }
    }

    // Intercept back button if drawer is open or user is in subpage
    BackHandler(enabled = drawerState.isOpen || selectedBottomTab != BottomTab.LEARN || currentDestination != DrawerDestination.HOME) {
        if (drawerState.isOpen) {
            scope.launch { drawerState.close() }
        } else if (currentDestination != DrawerDestination.HOME) {
            currentDestination = DrawerDestination.HOME
            selectedBottomTab = BottomTab.LEARN
        } else if (selectedBottomTab != BottomTab.LEARN) {
            selectedBottomTab = BottomTab.LEARN
        }
    }

    ModalNavigationDrawer(
        drawerState = drawerState,
        drawerContent = {
            ModalDrawerSheet(
                drawerContainerColor = Color.White
            ) {
                StudySidebarDrawer(
                    currentDestination = currentDestination,
                    onDestinationSelected = { destination ->
                        currentDestination = destination
                        when (destination) {
                            DrawerDestination.HOME -> selectedBottomTab = BottomTab.LEARN
                            DrawerDestination.CLASS1_HUB, DrawerDestination.CLASS3_HUB, DrawerDestination.CLASS7_HUB, DrawerDestination.TEXTBOOKS -> selectedBottomTab = BottomTab.LEARN
                            DrawerDestination.BRAIN_ZONE -> selectedBottomTab = BottomTab.BRAIN
                            DrawerDestination.QUICK_PLAY -> selectedBottomTab = BottomTab.PLAY
                            DrawerDestination.STUDY_PLAN -> selectedBottomTab = BottomTab.ME
                            else -> {}
                        }
                        scope.launch { drawerState.close() }
                    },
                    stats = SpaceBookRepository.studyStats
                )
            }
        }
    ) {
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            bottomBar = {
                // Kid-friendly 4-tab bottom navigation
                FacebookBottomNav(
                    selectedTab = selectedBottomTab,
                    onTabSelected = { tab ->
                        selectedBottomTab = tab
                        when (tab) {
                            BottomTab.LEARN -> {
                                currentDestination = DrawerDestination.HOME
                            }
                            BottomTab.PLAY -> {
                                currentDestination = DrawerDestination.QUICK_PLAY
                            }
                            BottomTab.BRAIN -> {
                                currentDestination = DrawerDestination.BRAIN_ZONE
                            }
                            BottomTab.ME -> {
                                currentDestination = DrawerDestination.STUDY_PLAN
                            }
                        }
                    }
                )
            }
        ) { innerPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding)
            ) {
                when (selectedBottomTab) {
                    BottomTab.LEARN -> {
                        when (currentDestination) {
                            DrawerDestination.CLASS1_HUB -> {
                                Class1BooksHubScreen(
                                    onBackClick = { currentDestination = DrawerDestination.HOME }
                                )
                            }
                            DrawerDestination.CLASS3_HUB -> {
                                Class3BooksHubScreen(
                                    onBackClick = { currentDestination = DrawerDestination.HOME }
                                )
                            }
                            DrawerDestination.CLASS7_HUB -> {
                                Class7BooksHubScreen(
                                    onBackClick = { currentDestination = DrawerDestination.HOME }
                                )
                            }
                            DrawerDestination.TEXTBOOKS -> {
                                TextbooksScreen(
                                    onBackToHome = { currentDestination = DrawerDestination.HOME }
                                )
                            }
                            DrawerDestination.SUBJECTS_UNITS -> {
                                SubjectsUnitsScreen(
                                    onBackToHome = { currentDestination = DrawerDestination.HOME },
                                    onOpenRoadmap = { currentDestination = DrawerDestination.EXAM_ROADMAPS }
                                )
                            }
                            DrawerDestination.EXAM_ROADMAPS -> {
                                ExamRoadmapScreen(
                                    onBackToHome = { currentDestination = DrawerDestination.HOME }
                                )
                            }
                            DrawerDestination.BRAIN_ZONE -> {
                                BrainZoneHubScreen(
                                    onBack = { currentDestination = DrawerDestination.HOME }
                                )
                            }
                            DrawerDestination.QUICK_PLAY -> {
                                QuickPlayFeedScreen(
                                    onBack = { currentDestination = DrawerDestination.HOME }
                                )
                            }
                            else -> {
                                // Default Hub for Learn Tab
                                KidsLearnBooksScreen(
                                    onOpenClass7Hub = { currentDestination = DrawerDestination.CLASS7_HUB },
                                    onOpenClass3Hub = { currentDestination = DrawerDestination.CLASS3_HUB },
                                    onOpenClass1Hub = { currentDestination = DrawerDestination.CLASS1_HUB },
                                    onOpenTextbooks = { currentDestination = DrawerDestination.TEXTBOOKS },
                                    onOpenQuickPlay = { selectedBottomTab = BottomTab.PLAY },
                                    onOpenSocialFeed = {
                                        // Open Facebook Feed
                                        currentDestination = DrawerDestination.HOME
                                    },
                                    onHamburgerClick = {
                                        scope.launch { drawerState.open() }
                                    }
                                )
                            }
                        }
                    }

                    BottomTab.PLAY -> {
                        QuickPlayFeedScreen(
                            onBack = {
                                selectedBottomTab = BottomTab.LEARN
                                currentDestination = DrawerDestination.HOME
                            }
                        )
                    }

                    BottomTab.BRAIN -> {
                        BrainZoneHubScreen(
                            onBack = {
                                selectedBottomTab = BottomTab.LEARN
                                currentDestination = DrawerDestination.HOME
                            }
                        )
                    }

                    BottomTab.ME -> {
                        KidsProfileScreen()
                    }
                }
            }
        }
    }

    // ─── Break Reminder Overlay (20 minutes healthy screen limit) ───
    if (showBreakReminder) {
        AlertDialog(
            onDismissRequest = { /* Must rest or enter parent pin */ },
            title = {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text("🌿", fontSize = 26.sp)
                    Spacer(Modifier.width(8.dp))
                    Text("Time for Eye Rest!", fontWeight = FontWeight.ExtraBold)
                }
            },
            text = {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("🦉", fontSize = 56.sp)
                    Spacer(Modifier.height(10.dp))
                    Text(
                        text = "Great job learning! Time to stretch and rest your eyes. Look at something green outside! 🌱 👀",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.SemiBold,
                        textAlign = TextAlign.Center
                    )
                    Spacer(Modifier.height(16.dp))
                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = Color(0xFF10B981).copy(alpha = 0.15f)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 14.dp, vertical = 8.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.Default.HourglassBottom, contentDescription = null, tint = Color(0xFF10B981))
                            Spacer(Modifier.width(6.dp))
                            Text(
                                text = "Rest timer: $breakCountdownSeconds sec",
                                color = Color(0xFF047857),
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp
                            )
                        }
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { showParentBreakDismiss = true }) {
                    Text("Parent Unlock", color = Color(0xFF64748B), fontSize = 12.sp)
                }
            }
        )
    }

    // Parent Break Dismiss Gate
    if (showParentBreakDismiss) {
        AlertDialog(
            onDismissRequest = { showParentBreakDismiss = false },
            title = { Text("Parent Gate") },
            text = {
                Column {
                    Text("Parents: Solve 6 × 7 = ? to resume now:")
                    Spacer(Modifier.height(8.dp))
                    OutlinedTextField(
                        value = parentBreakAnswer,
                        onValueChange = { parentBreakAnswer = it },
                        label = { Text("Answer") }
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (parentBreakAnswer.trim() == "42") {
                            showBreakReminder = false
                            showParentBreakDismiss = false
                            parentBreakAnswer = ""
                        }
                    }
                ) {
                    Text("Resume Play")
                }
            },
            dismissButton = {
                TextButton(onClick = { showParentBreakDismiss = false }) {
                    Text("Cancel")
                }
            }
        )
    }

    // ─── Bedtime Lock Overlay (8 PM - 7 AM) ───
    if (isBedtimeLocked) {
        AlertDialog(
            onDismissRequest = { /* Bedtime lock */ },
            title = {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Nightlight, contentDescription = null, tint = Color(0xFF818CF8))
                    Spacer(Modifier.width(8.dp))
                    Text("Good Night, Scholar! 🌙", fontWeight = FontWeight.Bold)
                }
            },
            text = {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("⭐ 🌙 🛌", fontSize = 42.sp)
                    Spacer(Modifier.height(10.dp))
                    Text(
                        text = "It's bedtime! Great learners need healthy sleep to wake up smart and energized. See you tomorrow morning! ☀️",
                        fontSize = 14.sp,
                        textAlign = TextAlign.Center
                    )
                }
            },
            confirmButton = {
                TextButton(onClick = { isBedtimeLocked = false }) {
                    Text("Parent Dismiss", color = Color(0xFF94A3B8), fontSize = 11.sp)
                }
            }
        )
    }
}