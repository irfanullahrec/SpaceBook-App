package com.example.spacebookapp.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.AutoStories
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Divider
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.data.models.BookStory

@Composable
fun StoriesSection(
    stories: List<BookStory>,
    onStoryClick: (BookStory) -> Unit,
    onCreateStoryClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    var activeTab by remember { mutableStateOf("Stories") }

    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(Color.White)
    ) {
        // Subtle divider from create post
        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE4E6EB))

        // Stories / Reels Tabs Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(44.dp)
        ) {
            // Stories Tab
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight()
                    .clickable { activeTab = "Stories" },
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "Stories",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (activeTab == "Stories") FacebookBlue else Color(0xFF65676B)
                )
                if (activeTab == "Stories") {
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .fillMaxWidth(0.85f)
                            .height(3.dp)
                            .background(FacebookBlue, RoundedCornerShape(topStart = 3.dp, topEnd = 3.dp))
                    )
                }
            }

            // Reels Tab
            Box(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxHeight()
                    .clickable { activeTab = "Reels" },
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "Reels & Notes",
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (activeTab == "Reels") FacebookBlue else Color(0xFF65676B)
                )
                if (activeTab == "Reels") {
                    Box(
                        modifier = Modifier
                            .align(Alignment.BottomCenter)
                            .fillMaxWidth(0.85f)
                            .height(3.dp)
                            .background(FacebookBlue, RoundedCornerShape(topStart = 3.dp, topEnd = 3.dp))
                    )
                }
            }
        }

        HorizontalDivider(thickness = 1.dp, color = Color(0xFFE4E6EB))

        // Horizontal Story Cards Carousel
        LazyRow(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 10.dp),
            contentPadding = PaddingValues(horizontal = 12.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(stories, key = { it.id }) { story ->
                if (story.isUserStory) {
                    CreateStoryCard(onClick = onCreateStoryClick)
                } else {
                    BookStoryCard(story = story, onClick = { onStoryClick(story) })
                }
            }
        }

        // Facebook gray thick divider between stories and feed
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp)
                .background(Color(0xFFF0F2F5))
        )
    }
}

@Composable
fun CreateStoryCard(
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .width(112.dp)
            .height(190.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(Color(0xFFF0F2F5))
            .border(1.dp, Color(0xFFE4E6EB), RoundedCornerShape(12.dp))
            .clickable { onClick() }
    ) {
        Column(modifier = Modifier.fillMaxSize()) {
            // Upper half: User Photo container
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(0.68f)
                    .background(Color(0xFF1E293B)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = null,
                    tint = Color.White,
                    modifier = Modifier.size(54.dp)
                )
            }

            // Lower half: White card background with label
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(0.32f)
                    .background(Color.White),
                contentAlignment = Alignment.BottomCenter
            ) {
                Text(
                    text = "Create story",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF050505),
                    modifier = Modifier.padding(bottom = 10.dp)
                )
            }
        }

        // Circular Blue "+" Button positioned between upper and lower halves
        Box(
            modifier = Modifier
                .align(Alignment.Center)
                .offset(y = 28.dp)
                .size(36.dp)
                .clip(CircleShape)
                .background(FacebookBlue)
                .border(3.dp, Color.White, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Add,
                contentDescription = "Add Story",
                tint = Color.White,
                modifier = Modifier.size(20.dp)
            )
        }
    }
}

@Composable
fun BookStoryCard(
    story: BookStory,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val brush = remember(story.previewGradient) {
        val colors = if (story.previewGradient.size >= 2) {
            story.previewGradient.map { Color(it) }
        } else {
            listOf(Color(0xFF1E3A8A), Color(0xFF3B82F6))
        }
        Brush.verticalGradient(colors)
    }

    Box(
        modifier = modifier
            .width(112.dp)
            .height(190.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(brush)
            .border(1.dp, Color(0x33FFFFFF), RoundedCornerShape(12.dp))
            .clickable { onClick() }
    ) {
        // Subtle decorative background icon for book feel
        Icon(
            imageVector = Icons.Default.MenuBook,
            contentDescription = null,
            tint = Color(0x22FFFFFF),
            modifier = Modifier
                .size(80.dp)
                .align(Alignment.Center)
        )

        // Subject Badge at top right
        Box(
            modifier = Modifier
                .align(Alignment.TopEnd)
                .padding(6.dp)
                .background(Color(0x66000000), RoundedCornerShape(6.dp))
                .padding(horizontal = 5.dp, vertical = 2.dp)
        ) {
            Text(
                text = story.subjectTag,
                fontSize = 9.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
        }

        // Top Left: User Avatar with Facebook Blue ring
        Box(
            modifier = Modifier
                .align(Alignment.TopStart)
                .padding(8.dp)
                .size(38.dp)
                .clip(CircleShape)
                .background(Color(0xFF1E293B))
                .border(2.5.dp, FacebookBlue, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Person,
                contentDescription = null,
                tint = Color.White,
                modifier = Modifier.size(22.dp)
            )
        }

        // Dark gradient scrim at bottom for text legibility
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(70.dp)
                .align(Alignment.BottomCenter)
                .background(
                    Brush.verticalGradient(
                        listOf(Color.Transparent, Color(0xDD000000))
                    )
                )
        )

        // Bottom text: Author Name and book title
        Column(
            modifier = Modifier
                .align(Alignment.BottomStart)
                .padding(horizontal = 8.dp, vertical = 8.dp)
        ) {
            Text(
                text = story.authorName,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = story.bookTitle,
                fontSize = 10.sp,
                fontWeight = FontWeight.Normal,
                color = Color(0xFFE2E8F0),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        }
    }
}
