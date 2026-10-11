package com.example.spacebookapp.ui.screens

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
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
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.SportsEsports
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
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

enum class ActiveClass7Book {
    NONE,
    MATHS,
    SCIENCE,
    ENGLISH,
    CS,
    HISTORY,
    GEOGRAPHY,
    URDU,
    ISLAMIAT,
    DRAWING,
    HPE,
    MQ,
    ARABIC
}

data class Class7BookCardModel(
    val bookType: ActiveClass7Book,
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
fun Class7BooksHubScreen(
    onBackClick: () -> Unit
) {
    var selectedBook by remember { mutableStateOf(ActiveClass7Book.NONE) }
    var selectedLang by remember { mutableStateOf(ExplainLang.ENGLISH) }

    BackHandler {
        if (selectedBook != ActiveClass7Book.NONE) {
            selectedBook = ActiveClass7Book.NONE
        } else {
            onBackClick()
        }
    }

    when (selectedBook) {
        ActiveClass7Book.MATHS -> {
            Class7MathsScreen(
                onBackClick = { selectedBook = ActiveClass7Book.NONE }
            )
            return
        }
        ActiveClass7Book.SCIENCE -> {
            Class7ScienceScreen(
                onBackClick = { selectedBook = ActiveClass7Book.NONE }
            )
            return
        }
        ActiveClass7Book.ENGLISH -> {
            Class7EnglishScreen(
                onBackClick = { selectedBook = ActiveClass7Book.NONE }
            )
            return
        }
        ActiveClass7Book.CS -> {
            Class7CSScreen(
                onBackClick = { selectedBook = ActiveClass7Book.NONE }
            )
            return
        }
        else -> {
            // Display Hub grid below
        }
    }

    val books = remember {
        listOf(
            Class7BookCardModel(
                bookType = ActiveClass7Book.MATHS,
                titleEn = "Mathematics Class 7",
                titleUr = "ریاضی جماعت ہفتم",
                titlePs = "ریاضي اووم ټولګی",
                subtitle = "13 Units • Rational numbers, Algebra, Geometry & Data",
                badgeText = "13 Units • Quiz & Lab",
                coverRes = R.drawable.cls7_maths_cover,
                accentColor = Color(0xFF1E88E5),
                gradientColors = listOf(Color(0xFF0F172A), Color(0xFF1E3A8A))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.SCIENCE,
                titleEn = "General Science Class 7",
                titleUr = "جنرل سائنس جماعت ہفتم",
                titlePs = "عمومي ساینس اووم ټولګی",
                subtitle = "12 Units • Plant systems, Atom, Forces & Space",
                badgeText = "12 Units • Biology/Physics",
                coverRes = R.drawable.cls7_science_cover,
                accentColor = Color(0xFF059669),
                gradientColors = listOf(Color(0xFF064E3B), Color(0xFF059669))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.ENGLISH,
                titleEn = "English Class 7",
                titleUr = "انگلش جماعت ہفتم",
                titlePs = "انګلیسي اووم ټولګی",
                subtitle = "10 Units • Comprehension, Grammar, Vocabulary & Writing",
                badgeText = "10 Units • Single Curriculum",
                coverRes = R.drawable.cls7_english_cover,
                accentColor = Color(0xFF7C3AED),
                gradientColors = listOf(Color(0xFF3B0764), Color(0xFF7C3AED))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.CS,
                titleEn = "Computer Science Class 7",
                titleUr = "کمپیوٹر سائنس جماعت ہفتم",
                titlePs = "کمپیوټر ساینس اووم ټولګی",
                subtitle = "6 Units • ICT, Digital Skills, Algorithmic Thinking & Coding",
                badgeText = "6 Units • Digital Skills",
                coverRes = R.drawable.cls7_cs_cover,
                accentColor = Color(0xFF0284C7),
                gradientColors = listOf(Color(0xFF0C4A6E), Color(0xFF0284C7))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.HISTORY,
                titleEn = "History Class 7",
                titleUr = "تاریخ جماعت ہفتم",
                titlePs = "تاریخ اووم ټولګی",
                subtitle = "6 Units • Medieval Europe, Islam, Delhi Sultanate & Mughals",
                badgeText = "6 Units • World History",
                coverRes = R.drawable.cls7_history_cover,
                accentColor = Color(0xFFD97706),
                gradientColors = listOf(Color(0xFF78350F), Color(0xFFD97706))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.GEOGRAPHY,
                titleEn = "Geography Class 7",
                titleUr = "جغرافیہ جماعت ہفتم",
                titlePs = "جغرافیه اووم ټولګی",
                subtitle = "6 Units • Plains & Rivers, Settlements, Climate & Resources",
                badgeText = "6 Units • Earth Sciences",
                coverRes = R.drawable.cls7_geography_cover,
                accentColor = Color(0xFF0D9488),
                gradientColors = listOf(Color(0xFF134E4A), Color(0xFF0D9488))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.URDU,
                titleEn = "Urdu Class 7",
                titleUr = "اردو جماعت ہفتم",
                titlePs = "اردو اووم ټولګی",
                subtitle = "حمد، نعت، اسباق، کہانیاں، نظمیں، ڈرامے اور قواعد",
                badgeText = "KPTBB Urdu Literature",
                coverRes = R.drawable.cls7_urdu_cover,
                accentColor = Color(0xFFEA580C),
                gradientColors = listOf(Color(0xFF7C2D12), Color(0xFFEA580C))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.ISLAMIAT,
                titleEn = "Islamiat Class 7",
                titleUr = "اسلامیات جماعت ہفتم",
                titlePs = "اسلامیات اووم ټولګی",
                subtitle = "6 Babs • قرآن و حدیث، ایمانیات، سیرت، اخلاق و آداب",
                badgeText = "6 Babs • Islamic Studies",
                coverRes = R.drawable.cls7_islamiat_cover,
                accentColor = Color(0xFF10B981),
                gradientColors = listOf(Color(0xFF064E3B), Color(0xFF10B981))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.DRAWING,
                titleEn = "Drawing Class 7",
                titleUr = "ڈرائنگ جماعت ہفتم",
                titlePs = "رسامي اووم ټولګی",
                subtitle = "Art Studio, Perspective, Landscape, Color harmonies",
                badgeText = "Visual Arts Studio",
                coverRes = R.drawable.cls7_drawing_cover,
                accentColor = Color(0xFFEC4899),
                gradientColors = listOf(Color(0xFF831843), Color(0xFFEC4899))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.HPE,
                titleEn = "Physical Education Class 7",
                titleUr = "صحت و جسمانی تعلیم جماعت ہفتم",
                titlePs = "روغتیا او بدني روزنه",
                subtitle = "Physical fitness, track & field, health, nutrition & safety",
                badgeText = "Health & Athletics",
                coverRes = R.drawable.cls7_hpe_cover,
                accentColor = Color(0xFFF59E0B),
                gradientColors = listOf(Color(0xFF78350F), Color(0xFFF59E0B))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.MQ,
                titleEn = "Mutalae Quran Class 7",
                titleUr = "مطالعہ قرآن حکیم جماعت ہفتم",
                titlePs = "د قرآن کریم مطالعه",
                subtitle = "سورتیں، تجوید، با محاورہ ترجمہ اور اخلاقی تعلیمات",
                badgeText = "Quranic Studies",
                coverRes = R.drawable.cls7_mq_cover,
                accentColor = Color(0xFF047857),
                gradientColors = listOf(Color(0xFF064E3B), Color(0xFF047857))
            ),
            Class7BookCardModel(
                bookType = ActiveClass7Book.ARABIC,
                titleEn = "Arabic Class 7",
                titleUr = "عربی جماعت ہفتم",
                titlePs = "عربي ژبه اووم ټولګی",
                subtitle = "الدروس، المفردات، القواعد والتراكيب",
                badgeText = "Arabic Language",
                coverRes = R.drawable.cls7_arabic_cover,
                accentColor = Color(0xFF6366F1),
                gradientColors = listOf(Color(0xFF1E1B4B), Color(0xFF6366F1))
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
                            listOf(Color(0xFF0F172A), Color(0xFF1E293B), Color(0xFF2563EB))
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
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(Color.White.copy(alpha = 0.2f))
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = Color.White,
                            modifier = Modifier.size(20.dp)
                        )
                    }

                    Spacer(modifier = Modifier.width(12.dp))

                    Column(modifier = Modifier.weight(1f)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "🎓 Class 7 Books Hub",
                                fontSize = 19.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = Color.White
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = Color(0xFFF59E0B)
                            ) {
                                Text(
                                    text = "12 BOOKS",
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    color = Color(0xFF0F172A),
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }

                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> "Middle School (Grade 7) • Single National Curriculum"
                                ExplainLang.URDU -> "کلاس ہفتم کتب ہب • خیبر پختونخوا ٹیکسٹ بک بورڈ"
                                ExplainLang.PASHTO -> "اووم ټولګی د کتابونو مرکز • د خیبر پښتونخوا نصاب"
                            },
                            fontSize = 11.5.sp,
                            color = Color(0xFFCBD5E1)
                        )
                    }

                    // Language toggle pill
                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = Color.White.copy(alpha = 0.2f),
                        modifier = Modifier.clickable {
                            selectedLang = when (selectedLang) {
                                ExplainLang.ENGLISH -> ExplainLang.URDU
                                ExplainLang.URDU -> ExplainLang.PASHTO
                                ExplainLang.PASHTO -> ExplainLang.ENGLISH
                            }
                        }
                    ) {
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> "🇬🇧 EN"
                                ExplainLang.URDU -> "🇵🇰 اردو"
                                ExplainLang.PASHTO -> "🇦🇫 پښتو"
                            },
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            fontSize = 11.sp,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 5.dp)
                        )
                    }
                }
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
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp)
                                )
                            }
                        }

                        // Text details
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(10.dp)
                        ) {
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> book.titleEn
                                    ExplainLang.URDU -> book.titleUr
                                    ExplainLang.PASHTO -> book.titlePs
                                },
                                fontSize = 13.5.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color(0xFF0F172A),
                                maxLines = 1,
                                overflow = TextOverflow.Ellipsis
                            )

                            Spacer(modifier = Modifier.height(2.dp))

                            Text(
                                text = book.subtitle,
                                fontSize = 10.5.sp,
                                color = Color(0xFF64748B),
                                maxLines = 2,
                                overflow = TextOverflow.Ellipsis,
                                lineHeight = 13.sp
                            )

                            Spacer(modifier = Modifier.height(8.dp))

                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Icon(
                                        imageVector = Icons.Default.SportsEsports,
                                        contentDescription = null,
                                        tint = book.accentColor,
                                        modifier = Modifier.size(13.dp)
                                    )
                                    Spacer(modifier = Modifier.width(3.dp))
                                    Text(
                                        text = "Grade 7",
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.SemiBold,
                                        color = book.accentColor
                                    )
                                }

                                Surface(
                                    shape = CircleShape,
                                    color = book.accentColor.copy(alpha = 0.12f),
                                    modifier = Modifier.size(24.dp)
                                ) {
                                    Box(contentAlignment = Alignment.Center) {
                                        Icon(
                                            imageVector = Icons.Default.PlayArrow,
                                            contentDescription = "Open",
                                            tint = book.accentColor,
                                            modifier = Modifier.size(14.dp)
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
}
