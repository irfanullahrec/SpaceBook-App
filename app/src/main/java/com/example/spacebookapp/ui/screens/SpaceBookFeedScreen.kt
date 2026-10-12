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

    val stories = SpaceBookRepository.getFilteredStories()
    val posts = SpaceBookRepository.posts

    var viewingStory by remember { mutableStateOf<BookStory?>(null) }
    var activeBookStory by remember { mutableStateOf<BookStory?>(null) }
    var activeCommentPost by remember { mutableStateOf<StudyPost?>(null) }
    var showCreatePostDialog by remember { mutableStateOf(false) }

    activeBookStory?.let { story ->
        val cid = story.webClassId
        val sid = story.webSubjId
        if (cid != null && sid != null) {
            val secondaryHex = story.previewGradient.firstOrNull() ?: 0xFF0F172AL
            val accentHex = story.previewGradient.getOrNull(1) ?: 0xFF0284C7L
            val gameStages: List<Class4StageData>? = remember(sid) {
                when (sid) {
                    "cls4-eng" -> Class4CurriculumRepository.stagesFor(Class4BookType.ENGLISH)
                    "cls4-math" -> Class4CurriculumRepository.stagesFor(Class4BookType.MATHS)
                    "cls4-sci" -> Class4CurriculumRepository.stagesFor(Class4BookType.SCIENCE)
                    "cls4-isl" -> Class4CurriculumRepository.stagesFor(Class4BookType.ISLAMIAT)
                    "cls4-pashto" -> Class4CurriculumRepository.stagesFor(Class4BookType.PASHTO)
                    "cls4-sst" -> Class4CurriculumRepository.stagesFor(Class4BookType.SOCIAL_STUDY)
                    "cls5-eng" -> Class5CurriculumRepository.stagesFor(Class5BookType.ENGLISH)
                    "cls5-math" -> Class5CurriculumRepository.stagesFor(Class5BookType.MATHS)
                    "cls5-sci" -> Class5CurriculumRepository.stagesFor(Class5BookType.SCIENCE)
                    "cls5-isl" -> Class5CurriculumRepository.stagesFor(Class5BookType.ISLAMIAT)
                    "cls5-pashto" -> Class5CurriculumRepository.stagesFor(Class5BookType.PASHTO)
                    "cls5-sst", "cls5-sstum" -> Class5CurriculumRepository.stagesFor(Class5BookType.SOCIAL_STUDY)
                    "cls5-urdu" -> Class5CurriculumRepository.stagesFor(Class5BookType.URDU)
                    "cls6-eng" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.ENGLISH)
                    "cls6-math" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.MATHS)
                    "cls6-sci" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.SCIENCE)
                    "cls6-comp" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.COMPUTER)
                    "cls6-geo" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.GEOGRAPHY)
                    "cls6-hist" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.HISTORY)
                    "cls6-isl" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.ISLAMIAT)
                    "cls6-quran" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.MQ)
                    "cls6-urdu" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.URDU)
                    "cls6-pashto" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.PASHTO)
                    "cls6-arabic" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.ARABIC)
                    "cls6-drawing" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.DRAWING)
                    "cls6-hpe" -> com.example.spacebookapp.data.Class6CurriculumRepository.getStages(com.example.spacebookapp.data.Class6BookType.HPE)
                    else -> null
                }
            }
            val defaultLang = when {
                sid.endsWith("-pashto") -> ExplainLang.PASHTO
                sid.endsWith("-urdu") || sid.endsWith("-isl") || sid.endsWith("-quran") -> ExplainLang.URDU
                else -> ExplainLang.ENGLISH
            }
            SpaceBookWebSubjectScreen(
                classId = cid,
                subjId = sid,
                subjectTitle = story.authorName,
                subjectSubtitle = story.bookTitle,
                accentColor = Color(accentHex),
                secondaryColor = Color(secondaryHex),
                gameStages = gameStages,
                defaultGameLang = defaultLang,
                onBackClick = { activeBookStory = null }
            )
            return
        }
        when (story.id) {
            "story-class1-urdu" -> {
                Class1UrduOrGKScreen(isUrduBook = true, onBackClick = { activeBookStory = null })
                return
            }
            "story-class1-gk" -> {
                Class1UrduOrGKScreen(isUrduBook = false, onBackClick = { activeBookStory = null })
                return
            }
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
                    Toast.makeText(context, "Search Class 1-12 subjects, notes & past papers...", Toast.LENGTH_SHORT).show()
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
                                story.webClassId != null && story.webSubjId != null -> activeBookStory = story
                                story.id == "story-class1-urdu" || story.id == "story-class1-gk" -> activeBookStory = story
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
