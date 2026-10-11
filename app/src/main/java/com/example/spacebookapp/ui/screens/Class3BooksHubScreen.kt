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

enum class ActiveClass3Book {
    NONE,
    GK,
    ENGLISH,
    MATHS,
    DRAWING,
    ISLAMYAT,
    NAZIRA,
    PASHTO
}

data class Class3BookCardModel(
    val bookType: ActiveClass3Book,
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
fun Class3BooksHubScreen(
    onBackClick: () -> Unit
) {
    var selectedBook by remember { mutableStateOf(ActiveClass3Book.NONE) }

    BackHandler {
        if (selectedBook != ActiveClass3Book.NONE) {
            selectedBook = ActiveClass3Book.NONE
        } else {
            onBackClick()
        }
    }

    when (selectedBook) {
        ActiveClass3Book.GK -> {
            Class3GKScreen(
                onBackClick = { selectedBook = ActiveClass3Book.NONE }
            )
            return
        }
        ActiveClass3Book.ENGLISH -> {
            // Placeholder / Phase 2
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("English Class 3 coming soon")
            }
            return
        }
        ActiveClass3Book.MATHS -> {
            // Placeholder / Phase 2
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Maths Class 3 coming soon")
            }
            return
        }
        ActiveClass3Book.DRAWING -> {
            // Placeholder / Phase 2
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Drawing Class 3 coming soon")
            }
            return
        }
        ActiveClass3Book.ISLAMYAT -> {
            // Placeholder / Phase 2
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Islamyat Class 3 coming soon")
            }
            return
        }
        ActiveClass3Book.NAZIRA -> {
            // Placeholder / Phase 2
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Nazira Class 3 coming soon")
            }
            return
        }
        ActiveClass3Book.PASHTO -> {
            // Placeholder / Phase 2
            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text("Pashto Class 3 coming soon")
            }
            return
        }
        ActiveClass3Book.NONE -> {}
    }

    val books = remember {
        listOf(
            Class3BookCardModel(
                bookType = ActiveClass3Book.GK,
                titleEn = "General Knowledge",
                titleUr = "واقفیتِ عامہ جماعت سوم",
                titlePs = "عمومي معلومات درېیم ټولګی",
                subtitle = "16 Chapters • Pages 1–122",
                badgeText = "16 Stages • Voice",
                coverRes = R.drawable.cls3_gk_cover,
                accentColor = Color(0xFFD97706),
                gradientColors = listOf(Color(0xFF78350F), Color(0xFFD97706))
            ),
            Class3BookCardModel(
                bookType = ActiveClass3Book.ENGLISH,
                titleEn = "English Class 3",
                titleUr = "انگلش جماعت سوم",
                titlePs = "انګلیسي درېیم ټولګی",
                subtitle = "Units 1–12 • Complete Book",
                badgeText = "Interactive Lessons",
                coverRes = R.drawable.cls3_english_cover,
                accentColor = Color(0xFF1E88E5),
                gradientColors = listOf(Color(0xFF0F172A), Color(0xFF1E3A8A))
            ),
            Class3BookCardModel(
                bookType = ActiveClass3Book.MATHS,
                titleEn = "Maths Class 3",
                titleUr = "ریاضی جماعت سوم",
                titlePs = "ریاضي درېیم ټولګی",
                subtitle = "Numbers, Fractions & Geometry",
                badgeText = "KPK Curriculum",
                coverRes = R.drawable.cls3_maths_cover,
                accentColor = Color(0xFF00897B),
                gradientColors = listOf(Color(0xFF064E3B), Color(0xFF10B981))
            ),
            Class3BookCardModel(
                bookType = ActiveClass3Book.DRAWING,
                titleEn = "Drawing Class 3",
                titleUr = "ڈرائنگ جماعت سوم",
                titlePs = "رسامي درېیم ټولګی",
                subtitle = "Art Studio & Color Theory",
                badgeText = "Creative Studio",
                coverRes = R.drawable.cls3_drawing_cover,
                accentColor = Color(0xFFD81B60),
                gradientColors = listOf(Color(0xFF4A148C), Color(0xFFE91E63))
            ),
            Class3BookCardModel(
                bookType = ActiveClass3Book.ISLAMYAT,
                titleEn = "Islamyat Class 3",
                titleUr = "اسلامیات جماعت سوم",
                titlePs = "اسلامیات درېیم ټولګی",
                subtitle = "ایمانیات، عبادات اور اخلاق",
                badgeText = "Islamic Studies",
                coverRes = R.drawable.cls3_islamyat_cover,
                accentColor = Color(0xFF059669),
                gradientColors = listOf(Color(0xFF064E3B), Color(0xFF059669))
            ),
            Class3BookCardModel(
                bookType = ActiveClass3Book.NAZIRA,
                titleEn = "Nazira Quran Class 3",
                titleUr = "ناظرہ قرآن جماعت سوم",
                titlePs = "ناظره قرآن درېیم ټولګی",
                subtitle = "تجوید، سورتیں اور دعائیں",
                badgeText = "Quranic Learning",
                coverRes = R.drawable.cls3_nazira_cover,
                accentColor = Color(0xFF0D9488),
                gradientColors = listOf(Color(0xFF042F2E), Color(0xFF0D9488))
            ),
            Class3BookCardModel(
                bookType = ActiveClass3Book.PASHTO,
                titleEn = "Pashto Class 3",
                titleUr = "پشتو جماعت سوم",
                titlePs = "پښتو درېیم ټولګی",
                subtitle = "اسباق، نظمونه او ګرامر",
                badgeText = "Pashto Language",
                coverRes = R.drawable.cls3_pashto_cover,
                accentColor = Color(0xFF7C3AED),
                gradientColors = listOf(Color(0xFF3B0764), Color(0xFF7C3AED))
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
                            fontWeight = FontWeight.SemiBold
                        )
                        Text(
                            text = "Class 3 Books Hub • جماعت سوم",
                            color = Color.White,
                            fontSize = 18.sp,
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
                                tint = Color(0xFF78350F),
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(Modifier.width(4.dp))
                            Text(
                                text = "7 Books",
                                color = Color(0xFF0F172A),
                                fontWeight = FontWeight.Bold,
                                fontSize = 11.sp
                            )
                        }
                    }
                }

                Spacer(Modifier.height(10.dp))

                Text(
                    text = "All official Khyber Pakhtunkhwa textbook board books with trilingual voice explanations, games, and quizzes.",
                    color = Color(0xFFE2E8F0),
                    fontSize = 12.sp,
                    lineHeight = 16.sp
                )
            }
        }
    ) { innerPadding ->
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            contentPadding = PaddingValues(12.dp),
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF1F5F9))
                .padding(innerPadding)
        ) {
            items(books) { book ->
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    elevation = CardDefaults.cardElevation(defaultElevation = 3.dp),
                    border = BorderStroke(1.dp, book.accentColor.copy(alpha = 0.25f)),
                    modifier = Modifier
                        .fillMaxWidth()
                        .clickable { selectedBook = book.bookType }
                ) {
                    Column(modifier = Modifier.fillMaxWidth()) {
                        // Book Cover Image Container
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(160.dp)
                                .background(Brush.verticalGradient(book.gradientColors))
                        ) {
                            Image(
                                painter = painterResource(id = book.coverRes),
                                contentDescription = book.titleEn,
                                contentScale = ContentScale.Crop,
                                modifier = Modifier.fillMaxSize()
                            )
                            // Gradient shadow overlay
                            Box(
                                modifier = Modifier
                                    .fillMaxSize()
                                    .background(
                                        Brush.verticalGradient(
                                            listOf(Color.Transparent, Color(0xAA000000))
                                        )
                                    )
                            )
                            // Badge pill top-right
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = book.accentColor,
                                modifier = Modifier
                                    .align(Alignment.TopEnd)
                                    .padding(8.dp)
                            ) {
                                Text(
                                    text = book.badgeText,
                                    color = Color.White,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }

                        // Book Info Section
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(10.dp)
                        ) {
                            Text(
                                text = book.titleUr,
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF0F172A),
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                            Text(
                                text = book.titleEn,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Medium,
                                color = book.accentColor,
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                            Spacer(Modifier.height(4.dp))
                            Text(
                                text = book.subtitle,
                                fontSize = 11.sp,
                                color = Color(0xFF64748B),
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )
                            Spacer(Modifier.height(8.dp))

                            // Play Button
                            Button(
                                onClick = { selectedBook = book.bookType },
                                colors = ButtonDefaults.buttonColors(containerColor = book.accentColor),
                                shape = RoundedCornerShape(10.dp),
                                contentPadding = PaddingValues(vertical = 6.dp, horizontal = 10.dp),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Icon(
                                    Icons.Default.PlayArrow,
                                    contentDescription = null,
                                    tint = Color.White,
                                    modifier = Modifier.size(16.dp)
                                )
                                Spacer(Modifier.width(4.dp))
                                Text(
                                    text = "Start Learning",
                                    color = Color.White,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
