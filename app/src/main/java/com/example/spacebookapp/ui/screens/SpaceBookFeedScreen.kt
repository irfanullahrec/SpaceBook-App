package com.example.spacebookapp.ui.screens

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.example.spacebookapp.data.models.BookStory
import com.example.spacebookapp.data.models.StudyPost
import com.example.spacebookapp.data.repository.SpaceBookRepository
import com.example.spacebookapp.ui.components.CommentsBottomSheet
import com.example.spacebookapp.ui.components.CreatePostBar
import com.example.spacebookapp.ui.components.CreatePostDialog
import com.example.spacebookapp.ui.components.FacebookTopBar
import com.example.spacebookapp.ui.components.PostCard
import com.example.spacebookapp.ui.components.StoriesSection
import com.example.spacebookapp.ui.components.StoryViewerDialog
import kotlinx.coroutines.launch

@Composable
fun SpaceBookFeedScreen(
    onHamburgerClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    val stories = SpaceBookRepository.stories
    val posts = SpaceBookRepository.posts

    var viewingStory by remember { mutableStateOf<BookStory?>(null) }
    var activeClass1StoryId by remember { mutableStateOf<String?>(null) }
    var activeCommentPost by remember { mutableStateOf<StudyPost?>(null) }
    var showCreatePostDialog by remember { mutableStateOf(false) }

    when (activeClass1StoryId) {
        "story-class1-hub" -> {
            Class1BooksHubScreen(onBackClick = { activeClass1StoryId = null })
            return
        }
        "story-class1-english" -> {
            Class1EnglishScreen(onBackClick = { activeClass1StoryId = null })
            return
        }
        "story-class1-maths" -> {
            Class1MathsScreen(onBackClick = { activeClass1StoryId = null })
            return
        }
        "story-class1-drawing" -> {
            Class1DrawingScreen(onBack = { activeClass1StoryId = null })
            return
        }
        "story-class1-nazera" -> {
            Class1NazeraScreen(onBackClick = { activeClass1StoryId = null })
            return
        }
        "story-class1-pashto" -> {
            Class1PashtoScreen(onBackClick = { activeClass1StoryId = null })
            return
        }
        "story-class1-urdu" -> {
            Class1UrduOrGKScreen(isUrduBook = true, onBackClick = { activeClass1StoryId = null })
            return
        }
        "story-class1-gk" -> {
            Class1UrduOrGKScreen(isUrduBook = false, onBackClick = { activeClass1StoryId = null })
            return
        }
        "story-class1-islamyat" -> {
            Class1IslamyatScreen(onBackClick = { activeClass1StoryId = null })
            return
        }
        "story-class3-hub" -> {
            Class3BooksHubScreen(onBackClick = { activeClass1StoryId = null })
            return
        }
        "story-class3-gk" -> {
            Class3GKScreen(onBackClick = { activeClass1StoryId = null })
            return
        }
    }

    Box(modifier = modifier.fillMaxSize()) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF0F2F5))
        ) {
            // Facebook Top Bar
            FacebookTopBar(
                onHamburgerClick = onHamburgerClick,
                onCreateClick = { showCreatePostDialog = true },
                onSearchClick = {
                    Toast.makeText(context, "Search Class 9-12 subjects, notes & past papers...", Toast.LENGTH_SHORT).show()
                },
                onMessengerClick = {
                    Toast.makeText(context, "Opening Study Discussion Messenger...", Toast.LENGTH_SHORT).show()
                },
                unreadMessages = 6
            )

            // Feed LazyColumn
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .background(Color(0xFFF0F2F5))
            ) {
                // 1. "What's on your mind?" Create Post Bar
                item {
                    CreatePostBar(
                        onBarClick = { showCreatePostDialog = true }
                    )
                }

                // 2. Stories Carousel
                item {
                    StoriesSection(
                        stories = stories,
                        onStoryClick = { story ->
                            when {
                                story.id.startsWith("story-class1-") -> activeClass1StoryId = story.id
                                story.id.startsWith("story-class3-") -> activeClass1StoryId = story.id
                                story.isClass1EnglishBook -> activeClass1StoryId = "story-class1-english"
                                story.isClass1MathsBook -> activeClass1StoryId = "story-class1-maths"
                                story.isClass1DrawingBook -> activeClass1StoryId = "story-class1-drawing"
                                else -> viewingStory = story
                            }
                        },
                        onCreateStoryClick = { showCreatePostDialog = true }
                    )
                }

                // 3. Posts Feed Items
                items(posts, key = { it.id }) { post ->
                    PostCard(
                        post = post,
                        onLikeClick = {
                            SpaceBookRepository.toggleLikePost(post.id)
                        },
                        onCommentClick = {
                            activeCommentPost = post
                        },
                        onShareClick = {
                            Toast.makeText(
                                context,
                                "Study note shared to your study circle & timeline!",
                                Toast.LENGTH_SHORT
                            ).show()
                        },
                        onDismissClick = {
                            posts.remove(post)
                            scope.launch {
                                snackbarHostState.showSnackbar("Post hidden from your feed")
                            }
                        }
                    )
                }

                item {
                    Spacer(modifier = Modifier.height(24.dp))
                }
            }
        }

        SnackbarHost(
            hostState = snackbarHostState,
            modifier = Modifier.align(androidx.compose.ui.Alignment.BottomCenter)
        )

        // Story Viewer Fullscreen Modal
        viewingStory?.let { story ->
            StoryViewerDialog(
                story = story,
                onDismiss = { viewingStory = null }
            )
        }

        // Create Post Modal Dialog
        if (showCreatePostDialog) {
            CreatePostDialog(
                onDismiss = { showCreatePostDialog = false },
                onPostCreated = { content, subject, formula, bookRef ->
                    SpaceBookRepository.addPost(content, subject, formula, bookRef)
                    Toast.makeText(context, "Study post published to feed!", Toast.LENGTH_SHORT).show()
                }
            )
        }

        // Comments Bottom Sheet
        activeCommentPost?.let { post ->
            // Fetch updated post instance from repository
            val currentPost = posts.find { it.id == post.id } ?: post
            CommentsBottomSheet(
                post = currentPost,
                onDismiss = { activeCommentPost = null },
                onAddComment = { commentText ->
                    SpaceBookRepository.addComment(post.id, commentText)
                }
            )
        }
    }
}
