package com.example.spacebookapp

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Scaffold
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import com.example.spacebookapp.data.repository.SpaceBookRepository
import com.example.spacebookapp.ui.components.BottomTab
import com.example.spacebookapp.ui.components.FacebookBottomNav
import com.example.spacebookapp.ui.drawer.DrawerDestination
import com.example.spacebookapp.ui.drawer.StudySidebarDrawer
import com.example.spacebookapp.ui.screens.ExamRoadmapScreen
import com.example.spacebookapp.ui.screens.SpaceBookFeedScreen
import com.example.spacebookapp.ui.screens.StudyPlanScreen
import com.example.spacebookapp.ui.screens.SubjectsUnitsScreen
import com.example.spacebookapp.ui.screens.TextbooksScreen
import com.example.spacebookapp.ui.theme.SpaceBookAppTheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
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
    var selectedBottomTab by remember { mutableStateOf(BottomTab.HOME) }

    // Intercept back button if drawer is open or user is in subpage
    BackHandler(enabled = drawerState.isOpen || currentDestination != DrawerDestination.HOME) {
        if (drawerState.isOpen) {
            scope.launch { drawerState.close() }
        } else if (currentDestination != DrawerDestination.HOME) {
            currentDestination = DrawerDestination.HOME
            selectedBottomTab = BottomTab.HOME
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
                            DrawerDestination.HOME -> selectedBottomTab = BottomTab.HOME
                            DrawerDestination.TEXTBOOKS -> selectedBottomTab = BottomTab.LIBRARY
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
                // Facebook-style bottom navigation bar
                FacebookBottomNav(
                    selectedTab = selectedBottomTab,
                    onTabSelected = { tab ->
                        selectedBottomTab = tab
                        when (tab) {
                            BottomTab.HOME -> currentDestination = DrawerDestination.HOME
                            BottomTab.LIBRARY -> currentDestination = DrawerDestination.TEXTBOOKS
                            BottomTab.REELS -> {
                                Toast.makeText(context, "Micro Video Lessons & Book Summaries", Toast.LENGTH_SHORT).show()
                            }
                            BottomTab.GROUPS -> {
                                Toast.makeText(context, "Joined: Class 10 Pre-Medical Study Circle (14.2k students)", Toast.LENGTH_SHORT).show()
                            }
                            BottomTab.NOTIFICATIONS -> {
                                Toast.makeText(context, "9 new study notifications: New numerical solved, 3 teachers responded", Toast.LENGTH_SHORT).show()
                            }
                            BottomTab.PROFILE -> {
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
                when (currentDestination) {
                    DrawerDestination.HOME -> {
                        SpaceBookFeedScreen(
                            onHamburgerClick = {
                                scope.launch { drawerState.open() }
                            }
                        )
                    }

                    DrawerDestination.SUBJECTS_UNITS -> {
                        SubjectsUnitsScreen(
                            onBackToHome = {
                                currentDestination = DrawerDestination.HOME
                                selectedBottomTab = BottomTab.HOME
                            }
                        )
                    }

                    DrawerDestination.TEXTBOOKS -> {
                        TextbooksScreen(
                            onBackToHome = {
                                currentDestination = DrawerDestination.HOME
                                selectedBottomTab = BottomTab.HOME
                            }
                        )
                    }

                    DrawerDestination.EXAM_ROADMAPS -> {
                        ExamRoadmapScreen(
                            onBackToHome = {
                                currentDestination = DrawerDestination.HOME
                                selectedBottomTab = BottomTab.HOME
                            }
                        )
                    }

                    DrawerDestination.STUDY_PLAN -> {
                        StudyPlanScreen(
                            onBackToHome = {
                                currentDestination = DrawerDestination.HOME
                                selectedBottomTab = BottomTab.HOME
                            }
                        )
                    }
                }
            }
        }
    }
}