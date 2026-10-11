package com.example.spacebookapp.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.SportsEsports
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.spacebookapp.R

private enum class ActiveClass1Book {
    NONE,
    ENGLISH,
    MATHS,
    DRAWING
}

private data class Class1BookCardModel(
    val bookType: ActiveClass1Book,
    val titleEn: String,
    val titleUr: String,
    val titlePs: String,
    val subtitle: String,
    val badgeText: String,
    val coverRes: Int,
    val accentColor: Color,
    val gradientColors: List<Color>
)

@Composable
fun Class1BooksHubScreen(
    onBackClick: () -> Unit
) {
    var selectedBook by remember { mutableStateOf(ActiveClass1Book.NONE) }

    BackHandler {
        if (selectedBook != ActiveClass1Book.NONE) {
            selectedBook = ActiveClass1Book.NONE
        } else {
            onBackClick()
        }
    }

    when (selectedBook) {
        ActiveClass1Book.ENGLISH -> {
            Class1EnglishScreen(
                onBackClick = { selectedBook = ActiveClass1Book.NONE }
            )
            return
        }
        ActiveClass1Book.MATHS -> {
            Class1MathsScreen(
                onBackClick = { selectedBook = ActiveClass1Book.NONE }
            )
            return
        }
        ActiveClass1Book.DRAWING -> {
            Class1DrawingScreen(
                onBack = { selectedBook = ActiveClass1Book.NONE }
            )
            return
        }
        ActiveClass1Book.NONE -> {}
    }

    val books = remember {
        listOf(
            Class1BookCardModel(
                bookType = ActiveClass1Book.ENGLISH,
                titleEn = "English Grade 1",
                titleUr = "انگلش جماعت اول",
                titlePs = "انګلیسي لومړی ټولګی",
                subtitle = "Units 1–11 • Pages 2–120",
                badgeText = "20 Games • Voice",
                coverRes = R.drawable.cls1_english_cover,
                accentColor = Color(0xFF1E88E5),
                gradientColors = listOf(Color(0xFF0F172A), Color(0xFF1E3A8A))
            ),
            Class1BookCardModel(
                bookType = ActiveClass1Book.MATHS,
                titleEn = "Mathematics Grade 1",
                titleUr = "ریاضی جماعت اول",
                titlePs = "ریاضي لومړی ټولګی",
                subtitle = "Units 1–6 • Pages 1–139",
                badgeText = "13 Games • Voice",
                coverRes = R.drawable.cls1_maths_cover,
                accentColor = Color(0xFF00897B),
                gradientColors = listOf(Color(0xFF064E3B), Color(0xFF10B981))
            ),
            Class1BookCardModel(
                bookType = ActiveClass1Book.DRAWING,
                titleEn = "Drawing Grade 1",
                titleUr = "ڈرائنگ جماعت اول",
                titlePs = "رسامي لومړی ټولګی",
                subtitle = "Pages 1–32 • Full Book",
                badgeText = "32 Art Games",
                coverRes = R.drawable.cls1_drawing_cover,
                accentColor = Color(0xFFD81B60),
                gradientColors = listOf(Color(0xFF4A148C), Color(0xFFE91E63))
            )
        )
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Brush.horizontalGradient(
                            listOf(Color(0xFF0F172A), Color(0xFF1E3A8A), Color(0xFF2563EB))
                        )
                    )
                    .statusBarsPadding()
                    .padding(horizontal = 14.dp, vertical = 12.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(
                        onClick = onBackClick,
                        modifier = Modifier
                            .size(40.dp)
                            .background(Color.White.copy(alpha = 0.18f), CircleShape)
                    ) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = Color.White
                        )
                    }
                    Spacer(Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "KPK Textbook Board • Peshawar",
                            color = Color(0xFF93C5FD),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Class 1 Books (جماعت اول)",
                            color = Color.White,
                            fontSize = 19.sp,
                            fontWeight = FontWeight.ExtraBold
                        )
                    }
                    Surface(
                        shape = RoundedCornerShape(14.dp),
                        color = Color(0xFFFFD54F)
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                Icons.Default.SportsEsports,
                                contentDescription = null,
                                tint = Color(0xFF0F172A),
                                modifier = Modifier.size(15.dp)
                            )
                            Spacer(Modifier.width(4.dp))
                            Text(
                                text = "${books.size} Books",
                                fontSize = 12.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Color(0xFF0F172A)
                            )
                        }
                    }
                }
            }
        }
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF1F5F9))
                .padding(innerPadding)
                .padding(14.dp)
        ) {
            Surface(
                shape = RoundedCornerShape(16.dp),
                color = Color.White,
                border = BorderStroke(1.5.dp, Color(0xFFBFDBFE)),
                shadowElevation = 2.dp,
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "📚",
                        fontSize = 26.sp
                    )
                    Spacer(Modifier.width(10.dp))
                    Column {
                        Text(
                            text = "Select a Class 1 Book to Play & Learn",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color(0xFF0F172A)
                        )
                        Text(
                            text = "اپنی پسندیدہ کتاب منتخب کریں • د خپلې خوښې کتاب وټاکئ (English / اردو / پښتو)",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Medium,
                            color = Color(0xFF475569)
                        )
                    }
                }
            }

            Spacer(Modifier.height(14.dp))

            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(books) { book ->
                    Card(
                        shape = RoundedCornerShape(20.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = 5.dp),
                        border = BorderStroke(2.dp, book.accentColor.copy(alpha = 0.45f)),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { selectedBook = book.bookType }
                    ) {
                        Column(modifier = Modifier.fillMaxWidth()) {
                            // Book Cover Image Banner
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(195.dp)
                                    .background(Brush.verticalGradient(book.gradientColors))
                            ) {
                                Image(
                                    painter = painterResource(id = book.coverRes),
                                    contentDescription = book.titleEn,
                                    contentScale = ContentScale.Crop,
                                    modifier = Modifier.fillMaxSize()
                                )

                                // Top-right badge
                                Box(
                                    modifier = Modifier
                                        .align(Alignment.TopEnd)
                                        .padding(8.dp)
                                        .background(Color(0xCC0F172A), RoundedCornerShape(10.dp))
                                        .padding(horizontal = 8.dp, vertical = 3.dp)
                                ) {
                                    Text(
                                        text = book.badgeText,
                                        color = Color(0xFFFFD54F),
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.ExtraBold
                                    )
                                }
                            }

                            // Book Info & Play Button
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(12.dp)
                            ) {
                                Text(
                                    text = book.titleEn,
                                    fontSize = 15.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color(0xFF0F172A),
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Text(
                                    text = "${book.titleUr} • ${book.titlePs}",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = book.accentColor,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                                Spacer(Modifier.height(3.dp))
                                Text(
                                    text = book.subtitle,
                                    fontSize = 11.sp,
                                    color = Color(0xFF64748B),
                                    maxLines = 1
                                )
                                Spacer(Modifier.height(8.dp))
                                Button(
                                    onClick = { selectedBook = book.bookType },
                                    colors = ButtonDefaults.buttonColors(containerColor = book.accentColor),
                                    shape = RoundedCornerShape(12.dp),
                                    contentPadding = PaddingValues(horizontal = 10.dp, vertical = 6.dp),
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(34.dp)
                                ) {
                                    Icon(
                                        Icons.Default.PlayArrow,
                                        contentDescription = null,
                                        modifier = Modifier.size(16.dp)
                                    )
                                    Spacer(Modifier.width(4.dp))
                                    Text(
                                        text = "Open Book",
                                        fontSize = 12.sp,
                                        fontWeight = FontWeight.ExtraBold
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
