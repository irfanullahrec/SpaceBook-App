package com.example.spacebookapp.data.repository

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.example.spacebookapp.R
import com.example.spacebookapp.data.models.BookStory
import com.example.spacebookapp.data.models.ChapterInfo
import com.example.spacebookapp.data.models.ChartBarData
import com.example.spacebookapp.data.models.ClassInfo
import com.example.spacebookapp.data.models.Comment
import com.example.spacebookapp.data.models.FormulaItem
import com.example.spacebookapp.data.models.MCQItem
import com.example.spacebookapp.data.models.NumericalItem
import com.example.spacebookapp.data.models.QAItem
import com.example.spacebookapp.data.models.RoadmapPhase
import com.example.spacebookapp.data.models.StatMediaData
import com.example.spacebookapp.data.models.StatMediaType
import com.example.spacebookapp.data.models.StorySlide
import com.example.spacebookapp.data.models.StudyPost
import com.example.spacebookapp.data.models.StudyStats
import com.example.spacebookapp.data.models.StudyTask
import com.example.spacebookapp.data.models.SubjectInfo
import com.example.spacebookapp.data.models.TextbookItem
import com.example.spacebookapp.data.models.TopicInfo
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

object SpaceBookRepository {

    // ─── STUDY STATS STATE ───
    var studyStats by mutableStateOf(
        StudyStats(
            studiedQuestions = 152,
            correctAnswers = 131,
            incorrectAnswers = 21,
            streakDays = 5,
            todayMinutes = 45,
            todayQuestions = 18,
            dailyGoal = 25
        )
    )
        private set

    fun recordMCQAnswer(isCorrect: Boolean) {
        studyStats = studyStats.copy(
            studiedQuestions = studyStats.studiedQuestions + 1,
            correctAnswers = if (isCorrect) studyStats.correctAnswers + 1 else studyStats.correctAnswers,
            incorrectAnswers = if (!isCorrect) studyStats.incorrectAnswers + 1 else studyStats.incorrectAnswers,
            todayQuestions = studyStats.todayQuestions + 1
        )
        // Dynamically update the statistical post cards in the live feed
        val studiedIndex = posts.indexOfFirst { it.id == "stat-post-studied" }
        if (studiedIndex != -1) {
            val p = posts[studiedIndex]
            posts[studiedIndex] = p.copy(
                contentText = "Great study momentum! You have completed ${studyStats.studiedQuestions} questions across all subjects with ${studyStats.todayQuestions} questions solved in today's active session.",
                statMedia = p.statMedia?.copy(primaryValue = studyStats.studiedQuestions.toString())
            )
        }
        val correctIndex = posts.indexOfFirst { it.id == "stat-post-correct" }
        if (correctIndex != -1) {
            val p = posts[correctIndex]
            posts[correctIndex] = p.copy(
                statMedia = p.statMedia?.copy(primaryValue = studyStats.correctAnswers.toString())
            )
        }
        val incorrectIndex = posts.indexOfFirst { it.id == "stat-post-incorrect" }
        if (incorrectIndex != -1) {
            val p = posts[incorrectIndex]
            posts[incorrectIndex] = p.copy(
                statMedia = p.statMedia?.copy(primaryValue = studyStats.incorrectAnswers.toString())
            )
        }
        val accuracyIndex = posts.indexOfFirst { it.id == "stat-post-accuracy" }
        if (accuracyIndex != -1) {
            val p = posts[accuracyIndex]
            val pct = studyStats.accuracyPercentage
            posts[accuracyIndex] = p.copy(
                statMedia = p.statMedia?.copy(
                    primaryValue = "$pct%",
                    progressPercent = pct / 100f
                )
            )
        }
    }

    // ─── STORIES STATE ───
    val stories = mutableStateListOf<BookStory>(
        BookStory(
            id = "story-class-1",
            authorName = "Class 1",
            authorRole = "KPK Textbook Board",
            bookTitle = "3 Books • Tap to Open",
            subjectTag = "1st Class",
            previewGradient = listOf(0xFF0F172A, 0xFF1E3A8A),
            coverDrawableRes = R.drawable.cls1_english_cover,
            isClass1EnglishBook = true
        ),
        BookStory(
            id = "story-create",
            authorName = "Create story",
            authorRole = "You",
            bookTitle = "Share Notes",
            subjectTag = "All",
            previewGradient = listOf(0xFF2563EB, 0xFF1D4ED8),
            isUserStory = true
        ),
        BookStory(
            id = "story-2",
            authorName = "Dr. Ayesha",
            authorRole = "Biology Mentor",
            bookTitle = "Biology 10: Cell Division",
            subjectTag = "Biology",
            previewGradient = listOf(0xFF065F46, 0xFF10B981),
            slides = listOf(
                StorySlide(
                    title = "Stages of Mitosis (PMAT)",
                    subtitle = "Class 10 Biology • Chapter 5",
                    keyConcept = "Prophase → Metaphase → Anaphase → Telophase.",
                    quoteOrSummary = "In Metaphase, chromosomes align on the equatorial plate. In Anaphase, sister chromatids separate toward opposite poles.",
                    subjectTag = "Biology",
                    pageRef = "Pages 88-96"
                ),
                StorySlide(
                    title = "Significance of Meiosis",
                    subtitle = "Genetic Variation",
                    keyConcept = "Crossing over occurs during Prophase I (Pachytene sub-stage) creating recombinant chromosomes.",
                    quoteOrSummary = "Essential for maintaining chromosome number constant across generations in sexually reproducing organisms.",
                    subjectTag = "Biology",
                    pageRef = "Pages 97-104"
                )
            )
        ),
        BookStory(
            id = "story-3",
            authorName = "Seyed Qasim",
            authorRole = "Chemistry Lecturer",
            bookTitle = "Chemistry 9: Periodic Table",
            subjectTag = "Chemistry",
            previewGradient = listOf(0xFF831843, 0xFFEC4899),
            slides = listOf(
                StorySlide(
                    title = "Periodic Trends Decoded",
                    subtitle = "Electronegativity & Ionization Energy",
                    keyConcept = "Both increase across a period (left to right) and decrease down a group (top to bottom).",
                    quoteOrSummary = "Fluorine has the highest electronegativity (4.0 on Pauling Scale) due to small atomic size and high effective nuclear charge.",
                    subjectTag = "Chemistry",
                    pageRef = "Pages 45-56"
                )
            )
        ),
        BookStory(
            id = "story-4",
            authorName = "Tariq Jamil",
            authorRole = "Urdu & Islamic Scholar",
            bookTitle = "Urdu 10: Allama Iqbal",
            subjectTag = "Urdu",
            previewGradient = listOf(0xFF78350F, 0xFFF59E0B),
            slides = listOf(
                StorySlide(
                    title = "شکوہ اور جواب شکوہ — مرکزی خیال",
                    subtitle = "دسویں جماعت اردو • علامہ محمد اقبال",
                    keyConcept = "مسلمانوں کی عظمت رفتہ، پستی کے اسباب اور بیداری کا درس۔",
                    quoteOrSummary = "کی محمد سے وفا تو نے تو ہم تیرے ہیں • یہ جہاں چیز ہے کیا لوح و قلم تیرے ہیں",
                    subjectTag = "Urdu",
                    pageRef = "صفحات ۱۱۰-۱۱۸"
                )
            )
        ),
        BookStory(
            id = "story-5",
            authorName = "Eng. Hamza",
            authorRole = "Maths Topper",
            bookTitle = "Math 10: Quadratic Equations",
            subjectTag = "Maths",
            previewGradient = listOf(0xFF312E81, 0xFF6366F1),
            slides = listOf(
                StorySlide(
                    title = "The Nature of Roots",
                    subtitle = "Discriminant D = b² - 4ac",
                    keyConcept = "If D > 0 and perfect square: Real, rational & unequal. If D = 0: Real & equal. If D < 0: Imaginary/Complex.",
                    quoteOrSummary = "Always test discriminant before factoring to determine the fastest solution path!",
                    subjectTag = "Maths",
                    pageRef = "Pages 21-28"
                )
            )
        )
    )

    // ─── POSTS FEED STATE (Dashboard Study Statistics as Facebook Posts) ───
    val posts = mutableStateListOf<StudyPost>(
        // 1. Studied Questions Post
        StudyPost(
            id = "stat-post-studied",
            authorName = "Studied Questions",
            authorRole = "📊 Real-Time Practice Tracker",
            timestamp = "Just now • 🌐",
            subjectTag = "Practice Analytics",
            bookReference = "KPK Board Question Bank • Class 9 & 10",
            contentText = "Great study momentum! You have completed 152 questions across all subjects with 18 questions solved in today's active session. Consistent question drills provide optimal retention for upcoming board examinations.",
            avatarEmoji = "📝",
            avatarRingColor = 0xFF1877F2,
            statMedia = StatMediaData(
                type = StatMediaType.STUDIED_QUESTIONS,
                primaryValue = "152",
                secondaryValue = "🎯 Total Practiced across all subjects",
                badgeText = "Auto-saves on answer",
                gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF3B82F6),
                pills = listOf("96 MCQs", "36 Short Qs", "20 Long Qs")
            ),
            likesCount = 384,
            isLikedByMe = true,
            commentsCount = 28,
            sharesCount = 14,
            comments = listOf(
                Comment("c101", "Physics Master KPK", "Educator", "25m ago", "Excellent pace! Make sure to revisit the Kinematics numericals before tomorrow's quiz.", 8),
                Comment("c102", "Sara Khan", "Class 10 Pre-Medical", "10m ago", "I'm practicing the Biology Chapter 14 questions today too!", 4)
            )
        ),

        // 2. Correct Answers Post
        StudyPost(
            id = "stat-post-correct",
            authorName = "Correct Answers",
            authorRole = "✅ Conceptual Clarity Metric",
            timestamp = "1h • 🌐",
            subjectTag = "Accuracy",
            bookReference = "Concepts & Student Learning Outcomes (SLOs)",
            contentText = "Outstanding conceptual clarity! 131 questions correctly answered on first attempt. Your physics kinematics equations and biology cell reproduction concepts are remarkably sharp.",
            avatarEmoji = "✅",
            avatarRingColor = 0xFF10B981,
            statMedia = StatMediaData(
                type = StatMediaType.CORRECT_ANSWERS,
                primaryValue = "131",
                secondaryValue = "🌟 Strong conceptual clarity across units",
                badgeText = "High Mastery",
                gradientColors = listOf(0xFF065F46, 0xFF059669, 0xFF10B981),
                pills = listOf("Physics: 92%", "Biology: 88%", "Chemistry: 84%", "Math: 82%")
            ),
            likesCount = 295,
            isLikedByMe = false,
            commentsCount = 19,
            sharesCount = 8,
            comments = listOf(
                Comment("c103", "Dr. Usman Farooq", "Biology Faculty", "40m ago", "Your Mitosis vs Meiosis answers were 100% accurate. Keep it up!", 12)
            )
        ),

        // 3. Incorrect Answers & Revision Post
        StudyPost(
            id = "stat-post-incorrect",
            authorName = "Incorrect Answers (Revision Bank)",
            authorRole = "❌ Smart Error Log & Review",
            timestamp = "2h • 🌐",
            subjectTag = "Revision Bank",
            bookReference = "Targeted Board Exam Review Bank",
            contentText = "Every mistake is a learning opportunity! 21 questions are currently logged in your personal revision bank. Re-attempting flagged questions is proven to convert weak areas into top exam strengths.",
            avatarEmoji = "❌",
            avatarRingColor = 0xFFF43F5E,
            statMedia = StatMediaData(
                type = StatMediaType.INCORRECT_ANSWERS,
                primaryValue = "21",
                secondaryValue = "🔄 Logged for focused revision",
                badgeText = "Review Needed",
                gradientColors = listOf(0xFF881337, 0xFFBE123C, 0xFFE11D48),
                pills = listOf("Kinematics: -g signs", "Ionic lattice energy", "Direct-indirect speech")
            ),
            likesCount = 210,
            isLikedByMe = false,
            commentsCount = 34,
            sharesCount = 15,
            comments = listOf(
                Comment("c104", "Prof. Tariq Chemist", "Chemistry Specialist", "1h ago", "Review the polar vs non-polar solvent notes in Unit 4, and those 4 chemistry mistakes will vanish.", 6)
            )
        ),

        // 4. Accuracy Rate Post
        StudyPost(
            id = "stat-post-accuracy",
            authorName = "Accuracy Rate & Distinction Grade",
            authorRole = "🎯 Performance Grade Evaluation",
            timestamp = "3h • 🌐",
            subjectTag = "Grade A-1",
            bookReference = "Khyber Pakhtunkhwa Board Examination Standards",
            contentText = "Your overall accuracy rate across all solved exercises stands at 86.2%. In Peshawar, Mardan, and Swat BISE examinations, this score aligns directly with the Distinction tier (Grade A-1)!",
            avatarEmoji = "🎯",
            avatarRingColor = 0xFF8B5CF6,
            statMedia = StatMediaData(
                type = StatMediaType.ACCURACY_RATE,
                primaryValue = "86.2%",
                secondaryValue = "🌟 Distinction Tier (Grade A-1)",
                badgeText = "Distinction Tier",
                gradientColors = listOf(0xFF4C1D95, 0xFF6D28D9, 0xFF8B5CF6),
                progressPercent = 0.862f
            ),
            likesCount = 512,
            isLikedByMe = true,
            commentsCount = 43,
            sharesCount = 26,
            comments = listOf(
                Comment("c105", "KPK Board Topper's Circle", "Study Forum", "2h ago", "Maintaining >85% accuracy on textbook exercises is the benchmark of top 10 position holders!", 15)
            )
        ),

        // 5. 7-Day Study Practice & Activity Post
        StudyPost(
            id = "stat-post-weekly",
            authorName = "7-Day Study Practice Activity",
            authorRole = "📈 Weekly Consistency Histogram",
            timestamp = "4h • 🌐",
            subjectTag = "Weekly Activity",
            bookReference = "7-Day Practice Volume & Activity Breakdown",
            contentText = "Here is your 7-day study practice histogram. You have accumulated 148 questions studied this week, peaking on Thursday with 30 solved questions. Today (Saturday) is active with 26 questions recorded!",
            avatarEmoji = "📈",
            avatarRingColor = 0xFF0284C7,
            statMedia = StatMediaData(
                type = StatMediaType.WEEKLY_ACTIVITY,
                primaryValue = "148 Qs",
                secondaryValue = "Weekly Consistency",
                badgeText = "Peak: Thursday (30 Qs)",
                gradientColors = listOf(0xFF0C4A6E, 0xFF0284C7, 0xFF0EA5E9),
                chartBars = listOf(
                    ChartBarData("Mon", 18, false),
                    ChartBarData("Tue", 24, false),
                    ChartBarData("Wed", 22, false),
                    ChartBarData("Thu", 30, false),
                    ChartBarData("Fri", 28, false),
                    ChartBarData("Sat", 26, true),
                    ChartBarData("Sun", 0, false)
                )
            ),
            likesCount = 340,
            isLikedByMe = false,
            commentsCount = 22,
            sharesCount = 11,
            comments = listOf(
                Comment("c106", "Ali Raza", "Class 9 Student", "3h ago", "That histogram looks inspiring! I need to increase my Thursday study time too.", 5)
            )
        ),

        // 6. Daily Study Streak Post
        StudyPost(
            id = "stat-post-streak",
            authorName = "Daily Study Streak",
            authorRole = "🔥 Habit Tracker & Consistency",
            timestamp = "5h • 🌐",
            subjectTag = "Streak",
            bookReference = "Consecutive Active Days Record",
            contentText = "🔥 You are on a 5-Day Study Streak! Daily habit tracking reveals that studying 45 minutes every day produces 3x higher retention than cramming the night before an exam.",
            avatarEmoji = "🔥",
            avatarRingColor = 0xFFF59E0B,
            statMedia = StatMediaData(
                type = StatMediaType.DAILY_STREAK,
                primaryValue = "5 Days",
                secondaryValue = "🔥 Consecutive Active Study Days",
                badgeText = "Keep up the momentum",
                gradientColors = listOf(0xFF78350F, 0xFFD97706, 0xFFF59E0B)
            ),
            likesCount = 468,
            isLikedByMe = true,
            commentsCount = 38,
            sharesCount = 29,
            comments = listOf(
                Comment("c107", "Zeeshan Ali", "Student", "4h ago", "Let's reach 10 days! Good luck everyone.", 9)
            )
        ),

        // 7. Today's Study Goal & Focus Time Post
        StudyPost(
            id = "stat-post-goal",
            authorName = "Today's Study Goal & Focus Time",
            authorRole = "⏱️ Daily Target Progress",
            timestamp = "6h • 🌐",
            subjectTag = "Daily Target",
            bookReference = "Goal: Practice 25 Questions/Day",
            contentText = "Daily Target Status: You have answered 18 out of your 25 daily goal questions (72% completed) and spent 45 minutes in focused study. Just 7 questions remaining to hit today's 100% completion target!",
            avatarEmoji = "⏱️",
            avatarRingColor = 0xFF0D9488,
            statMedia = StatMediaData(
                type = StatMediaType.DAILY_GOAL,
                primaryValue = "18 / 25 Qs",
                secondaryValue = "72% of Daily Target Completed",
                badgeText = "7 Qs to 100%",
                gradientColors = listOf(0xFF134E4A, 0xFF0D9488, 0xFF14B8A6),
                progressPercent = 0.72f
            ),
            likesCount = 284,
            isLikedByMe = false,
            commentsCount = 16,
            sharesCount = 9
        ),

        // 8. KPK Textbooks & Curriculum Database Post
        StudyPost(
            id = "stat-post-curriculum",
            authorName = "KPK Textbooks & Curriculum Database",
            authorRole = "🏛️ Official Board Portal Statistics",
            timestamp = "7h • 🌐",
            subjectTag = "Curriculum",
            bookReference = "Official KPK Textbook Board Peshawar Standards",
            contentText = "All study units, SLO explanations, and practice questions in SpaceBook are strictly aligned with the Khyber Pakhtunkhwa Textbook Board curriculum. 10+ official textbooks, 60+ curriculum units, 450+ solved MCQs, and 280+ short questions are fully indexed and accessible.",
            avatarEmoji = "🏛️",
            avatarRingColor = 0xFF64748B,
            statMedia = StatMediaData(
                type = StatMediaType.CURRICULUM_COVERAGE,
                primaryValue = "Curriculum Verified",
                secondaryValue = "Official KPK Textbook Board Alignment",
                badgeText = "Official Syllabus",
                gradientColors = listOf(0xFF0F172A, 0xFF1E293B, 0xFF334155),
                pills = listOf("10+ Textbooks", "60+ Units", "450+ MCQs", "280+ SQs")
            ),
            likesCount = 620,
            isLikedByMe = true,
            commentsCount = 52,
            sharesCount = 41
        )
    )

    fun toggleLikePost(postId: String) {
        val index = posts.indexOfFirst { it.id == postId }
        if (index != -1) {
            val p = posts[index]
            val newLiked = !p.isLikedByMe
            val newCount = if (newLiked) p.likesCount + 1 else p.likesCount - 1
            posts[index] = p.copy(isLikedByMe = newLiked, likesCount = newCount)
        }
    }

    fun addComment(postId: String, text: String, authorName: String = "Student Scholar") {
        if (text.isBlank()) return
        val index = posts.indexOfFirst { it.id == postId }
        if (index != -1) {
            val p = posts[index]
            val newComment = Comment(
                id = "comm-${System.currentTimeMillis()}",
                authorName = authorName,
                authorRole = "Class 10 Pre-Medical",
                timestamp = "Just now",
                text = text.trim(),
                likesCount = 0
            )
            posts[index] = p.copy(
                commentsCount = p.commentsCount + 1,
                comments = listOf(newComment) + p.comments
            )
        }
    }

    fun addPost(contentText: String, subjectTag: String, formula: String? = null, bookRef: String = "Self Study Notes") {
        if (contentText.isBlank()) return
        val newPost = StudyPost(
            id = "post-${System.currentTimeMillis()}",
            authorName = "Student Scholar",
            authorRole = "Class 10 Pre-Medical • You",
            timestamp = "Just now • 🌐",
            subjectTag = subjectTag,
            bookReference = bookRef,
            contentText = contentText.trim(),
            formulaHighlight = formula?.ifBlank { null },
            likesCount = 1,
            isLikedByMe = true,
            commentsCount = 0,
            sharesCount = 0
        )
        posts.add(0, newPost)
    }

    // ─── CLASSES DATA ───
    val classes = listOf(
        ClassInfo("cls9", "Class 9", "🏫", 7, "Matriculation Part 1 • KPK Textbook Board"),
        ClassInfo("cls10", "Class 10", "🏫", 7, "Matriculation Part 2 • KPK Textbook Board"),
        ClassInfo("cls11", "Class 11", "🎓", 6, "Intermediate F.Sc Part 1 • Pre-Medical & Pre-Engineering"),
        ClassInfo("cls12", "Class 12", "🎓", 6, "Intermediate F.Sc Part 2 • Pre-Medical & Pre-Engineering")
    )

    // ─── SUBJECTS DATA ───
    val subjectsMap = mapOf(
        "cls9" to listOf(
            SubjectInfo("cls9-phy", "cls9", "Physics", "⚛️", 9, 0xFF1D4ED8, "Physical quantities, kinematics, dynamics, work & energy"),
            SubjectInfo("cls9-chem", "cls9", "Chemistry", "🧪", 8, 0xFF0D9488, "Fundamentals of chemistry, atomic structure, periodic table"),
            SubjectInfo("cls9-bio", "cls9", "Biology", "🧬", 9, 0xFF16A34A, "Introduction to biology, cells, enzymes, bioenergetics"),
            SubjectInfo("cls9-math", "cls9", "Mathematics", "📐", 11, 0xFFD97706, "Matrices, real & complex numbers, logarithms, algebraic expressions"),
            SubjectInfo("cls9-eng", "cls9", "English", "📖", 15, 0xFF7C3AED, "Reading comprehension, vocabulary, grammar, translation"),
            SubjectInfo("cls9-urdu", "cls9", "Urdu", "📗", 15, 0xFF059669, "نثر، نظمیں، غزلیں، قواعد و انشاء"),
            SubjectInfo("cls9-comp", "cls9", "Computer Science", "💻", 8, 0xFF475569, "Fundamentals of computer, hardware, software, networking")
        ),
        "cls10" to listOf(
            SubjectInfo("cls10-phy", "cls10", "Physics", "⚡", 9, 0xFF1D4ED8, "Simple harmonic motion, sound, geometrical optics, electrostatics"),
            SubjectInfo("cls10-chem", "cls10", "Chemistry", "🧪", 8, 0xFF0D9488, "Chemical equilibrium, acids, bases & salts, organic chemistry"),
            SubjectInfo("cls10-bio", "cls10", "Biology", "🔬", 9, 0xFF16A34A, "Gaseous exchange, homeostasis, coordination & control"),
            SubjectInfo("cls10-math", "cls10", "Mathematics", "📐", 13, 0xFFD97706, "Quadratic equations, theory of quadratic equations, variations"),
            SubjectInfo("cls10-eng", "cls10", "English", "📖", 14, 0xFF7C3AED, "Prose, poems, essays, direct & indirect, idioms"),
            SubjectInfo("cls10-urdu", "cls10", "Urdu", "📗", 14, 0xFF059669, "اسباق، نظمیں، غزلیں، مضامین اور تفہیم عبارت"),
            SubjectInfo("cls10-comp", "cls10", "Computer Science", "💻", 7, 0xFF475569, "Programming in C, loops, functions, logic gates")
        ),
        "cls11" to listOf(
            SubjectInfo("cls11-phy", "cls11", "Physics Part 1", "⚛️", 10, 0xFF1D4ED8, "Vectors, motion, circular motion, rotational dynamics, thermodynamics"),
            SubjectInfo("cls11-chem", "cls11", "Chemistry Part 1", "🧪", 12, 0xFF0D9488, "Stoichiometry, atomic structure, chemical bonding, gases, liquids"),
            SubjectInfo("cls11-bio", "cls11", "Biology Part 1", "🧬", 14, 0xFF16A34A, "Cell biology, biological molecules, enzymes, kingdom animalia"),
            SubjectInfo("cls11-math", "cls11", "Mathematics Part 1", "📐", 14, 0xFFD97706, "Complex numbers, matrices, sequences & series, trigonometry")
        ),
        "cls12" to listOf(
            SubjectInfo("cls12-phy", "cls12", "Physics Part 2", "⚡", 10, 0xFF1D4ED8, "Current electricity, electromagnetism, electronics, nuclear physics"),
            SubjectInfo("cls12-chem", "cls12", "Chemistry Part 2", "🧪", 12, 0xFF0D9488, "Periodic classification, d-block elements, hydrocarbons, polymers"),
            SubjectInfo("cls12-bio", "cls12", "Biology Part 2", "🔬", 13, 0xFF16A34A, "Respiration, nervous system, biotechnology, evolution"),
            SubjectInfo("cls12-math", "cls12", "Mathematics Part 2", "📐", 12, 0xFFD97706, "Functions & limits, differentiation, integration, vectors")
        )
    )

    // ─── CHAPTERS DATA (Comprehensive KPK Syllabus) ───
    val sampleChapters = listOf(
        ChapterInfo(
            num = 1,
            subjectId = "cls9-phy",
            name = "Physical Quantities and Measurement",
            pageRange = "1 – 28",
            status = "Core Chapter",
            slos = listOf(
                "Define physics and its main branches (Mechanics, Heat, Sound, Light, Electromagnetism, Nuclear, Plasma).",
                "Differentiate between base and derived physical quantities and their SI units.",
                "Describe the prefixes to powers of ten and express quantities in standard scientific notation.",
                "Explain the construction and least count of Vernier Calipers and Micrometer Screw Gauge.",
                "Calculate volume of irregular shaped solid using measuring cylinder and determine density."
            ),
            topics = listOf(
                TopicInfo(
                    num = "1.1",
                    title = "Introduction to Physics",
                    summaryEn = "Physics is the branch of science that deals with matter, energy, and the fundamental relationships between them. Key branches include Mechanics (study of motion), Thermodynamics (heat & temperature), Optics (light properties), and Electromagnetism (electric and magnetic phenomena).",
                    summaryUr = "طبیعیات سائنس کی وہ شاخ ہے جس میں مادے، توانائی اور ان کے باہمی تعلق کا مطالعہ کیا جاتا ہے۔",
                    keyPoints = listOf("Deals with universal laws of nature", "Provides mathematical foundation for engineering and technology"),
                    statIcon = "⚛️",
                    statMetric = "Matter & Energy",
                    statBadge = "Foundation",
                    statColorHex = 0xFF1D4ED8
                ),
                TopicInfo(
                    num = "1.2",
                    title = "Base & Derived Quantities",
                    summaryEn = "Physical quantities are measurable properties of matter. Base quantities are seven fundamental standards that cannot be defined in terms of other quantities. Derived quantities are formed through multiplication or division of base quantities.",
                    summaryUr = "وہ تمام طبعی مقداریں جن کی پیمائش ممکن ہو طبعی مقداریں کہلاتی ہیں۔ بنیادی مقداریں 7 ہیں جبکہ باقی سب ماخوذ مقداریں ہیں۔",
                    keyPoints = listOf("Base SI Units: m, kg, s, A, K, mol, cd", "Derived examples: Speed (m/s), Acceleration (m/s²), Force (N = kg·m/s²)"),
                    statIcon = "📏",
                    statMetric = "7 Base Units",
                    statBadge = "SI Standards",
                    statColorHex = 0xFF0D9488
                ),
                TopicInfo(
                    num = "1.3",
                    title = "Instruments & Precision",
                    summaryEn = "Meter rule (LC = 1 mm), Vernier Caliper (LC = 0.1 mm = 0.01 cm), Screw Gauge (LC = 0.01 mm = 0.001 cm). Zero error occurs when the zero marks of both scales do not align when jaws/studs are closed. Positive zero error is subtracted; negative zero error is added.",
                    summaryUr = "ورنیئر کیلیپرز کی لیسٹ کاؤنٹ 0.1 ملی میٹر ہے جبکہ سکریو گیج کی لیسٹ کاؤنٹ 0.01 ملی میٹر ہے۔",
                    keyPoints = listOf("Screw gauge has 10x higher precision than Vernier", "Correct reading = Observed Reading - (Zero Error)"),
                    statIcon = "🔬",
                    statMetric = "LC = 0.01 mm",
                    statBadge = "Precision",
                    statColorHex = 0xFFD97706
                )
            ),
            mcqs = listOf(
                MCQItem(
                    id = "m1",
                    question = "Which of the following is a base physical quantity in the International System of Units (SI)?",
                    options = listOf("Speed", "Electric Current", "Force", "Work"),
                    correctIndex = 1,
                    explanation = "Electric Current is one of the 7 fundamental SI base quantities (unit: Ampere). Speed, Force, and Work are derived quantities."
                ),
                MCQItem(
                    id = "m2",
                    question = "The least count of a standard Vernier Calipers having 10 divisions on vernier scale is:",
                    options = listOf("1 mm", "0.1 mm", "0.01 mm", "0.001 mm"),
                    correctIndex = 1,
                    explanation = "Least Count = Smallest main scale division / Number of vernier divisions = 1 mm / 10 = 0.1 mm (or 0.01 cm)."
                ),
                MCQItem(
                    id = "m3",
                    question = "An interval of 200 microseconds is equivalent to:",
                    options = listOf("0.2 s", "2 × 10⁻⁴ s", "2 × 10⁻⁶ s", "2 × 10⁻³ s"),
                    correctIndex = 1,
                    explanation = "200 μs = 200 × 10⁻⁶ s = 2 × 10² × 10⁻⁶ s = 2 × 10⁻⁴ s."
                ),
                MCQItem(
                    id = "m4",
                    question = "If the zero of the vernier scale lies to the right of the zero of main scale, the zero error is:",
                    options = listOf("Negative and added", "Positive and subtracted", "Zero", "Multiplied"),
                    correctIndex = 1,
                    explanation = "When the vernier zero lies to the right, it measures more than the true value, so the error is positive and must be subtracted."
                )
            ),
            shortQuestions = listOf(
                QAItem("SQ 1", "Why do we need a standard unit for physical measurements?", "A standard unit provides a universally accepted, reproducible reference point for measurements worldwide. Without standard units, trade, scientific cooperation, and precise engineering calculations would be impossible due to regional inconsistencies."),
                QAItem("SQ 2", "How is a screw gauge more precise than a vernier caliper?", "A screw gauge has a significantly smaller least count (0.01 mm) compared to a vernier caliper (0.1 mm). It can detect variations up to 1/100th of a millimeter, making it 10 times more sensitive and accurate for thin wires and small spheres."),
                QAItem("SQ 3", "Distinguish between base quantities and derived quantities with two examples each.", "Base quantities are fundamental physical quantities in terms of which other quantities are expressed (e.g., Length in meters, Mass in kilograms). Derived quantities are defined through algebraic combinations of base quantities (e.g., Velocity in m/s, Acceleration in m/s²).")
            ),
            longQuestions = listOf(
                QAItem("LQ 1", "Describe the construction, least count, zero error, and measurement procedure of Vernier Calipers with suitable diagrams.", "1. Construction: Consists of a main scale with mm markings and a sliding vernier scale with 10 divisions spanning 9 mm. It features external jaws for outer diameters, internal jaws for inner diameters, and a depth probe.\n2. Least Count: LC = 1 MSD - 1 VSD = 1 mm - 0.9 mm = 0.1 mm (0.01 cm).\n3. Zero Error: When jaws touch without object, if vernier 0 coincides with main scale 0, zero error is nil. If vernier 0 is to the right, error is positive; if to the left, negative.\n4. Measurement: Total reading = Main scale reading + (Coinciding vernier division × LC) - (Zero Error)."),
                QAItem("LQ 2", "Explain Significant Figures. State the rules for determining significant figures in scientific measurements with examples.", "Significant figures are all accurately known digits plus the first doubtful digit in a measured value.\nRules:\n1. All non-zero digits are significant (e.g., 238 has 3 s.f.).\n2. Zeros between non-zero digits are significant (e.g., 2008 has 4 s.f.).\n3. Leading zeros before the first non-zero digit are NOT significant (e.g., 0.0034 has 2 s.f.).\n4. Trailing zeros after decimal are significant (e.g., 2.500 has 4 s.f.).")
            ),
            formulas = listOf(
                FormulaItem("Least Count of Vernier", "LC = Smallest Main Div / Total Vernier Divs", "mm or cm"),
                FormulaItem("Least Count of Screw Gauge", "LC = Pitch / Total Circular Divs", "mm or cm"),
                FormulaItem("Density", "ρ = m / V", "kg/m³ or g/cm³")
            ),
            numericals = listOf(
                NumericalItem(
                    num = "Ex 1.1",
                    statement = "A screw gauge has 50 divisions on its circular scale. The pitch of the screw is 0.5 mm. What is its least count?",
                    given = "Pitch = 0.5 mm, Number of circular divisions = 50",
                    formula = "LC = Pitch / No. of divisions",
                    solution = "LC = 0.5 mm / 50 = 0.01 mm = 0.001 cm",
                    answer = "0.01 mm (0.001 cm)"
                ),
                NumericalItem(
                    num = "Ex 1.2",
                    statement = "Express 150000000 meters in scientific notation with proper prefixes.",
                    given = "Distance = 150,000,000 m",
                    formula = "Standard Form = M × 10ⁿ where 1 ≤ M < 10",
                    solution = "150,000,000 = 1.5 × 10⁸ m = 150 × 10⁶ m = 150 Mm (Megameters)",
                    answer = "1.5 × 10⁸ m (or 150 Mm)"
                )
            )
        ),
        ChapterInfo(
            num = 2,
            subjectId = "cls9-phy",
            name = "Kinematics",
            pageRange = "29 – 64",
            status = "High Weightage",
            slos = listOf(
                "Differentiate between rest and motion relative to observers.",
                "Classify types of motion: Translatory, Rotatory, and Vibratory.",
                "Differentiate scalar and vector quantities with examples.",
                "Derive the 3 Equations of Motion using velocity-time graphs.",
                "Solve numerical problems related to uniform acceleration and vertical motion under gravity."
            ),
            topics = listOf(
                TopicInfo(
                    num = "2.1",
                    title = "Rest & Types of Motion",
                    summaryEn = "A body is in rest if it does not change its position with respect to its surroundings. Motion is relative. Translatory motion: linear, circular, random. Rotatory: spinning around fixed axis. Vibratory: to-and-fro motion about mean position.",
                    summaryUr = "کوئی جسم اگر اپنے اردگرد کے لحاظ سے جگہ نہ بدلے تو وہ حالت سکون میں ہے۔",
                    keyPoints = listOf("Translatory: car moving straight or curved", "Rotatory: Earth spinning on axis, ceiling fan", "Vibratory: pendulum of clock"),
                    statIcon = "🚗",
                    statMetric = "3 Types Motion",
                    statBadge = "Translatory",
                    statColorHex = 0xFF1D4ED8
                ),
                TopicInfo(
                    num = "2.2",
                    title = "Vectors & 3 Equations",
                    summaryEn = "Scalars have only magnitude (Speed, Distance, Mass). Vectors have magnitude and direction (Velocity, Displacement, Force). Three equations of motion: vf = vi + at; S = vi·t + ½at²; 2aS = vf² - vi².",
                    summaryUr = "سکیلر مقداریں صرف مقدار رکھتی ہیں جبکہ ویکٹر مقداریں سمت بھی رکھتی ہیں۔",
                    keyPoints = listOf("Equations apply solely to constant acceleration", "For motion under gravity: a = g = 9.8 m/s²"),
                    statIcon = "📈",
                    statMetric = "2aS = vf² - vi²",
                    statBadge = "Core Mechanics",
                    statColorHex = 0xFF0D9488
                )
            ),
            mcqs = listOf(
                MCQItem(
                    id = "km1",
                    question = "A body has translatory motion if it moves along a:",
                    options = listOf("Straight line without rotating", "Line without any rotation", "Circle", "Curved path only"),
                    correctIndex = 1,
                    explanation = "In translatory motion, every point on the object moves through the same distance along parallel lines without rotating."
                ),
                MCQItem(
                    id = "km2",
                    question = "The area under a speed-time graph represents:",
                    options = listOf("Acceleration", "Distance traveled", "Speed", "Force"),
                    correctIndex = 1,
                    explanation = "Distance is speed × time, which is represented by the geometric area under the velocity-time graph curve."
                )
            ),
            shortQuestions = listOf(
                QAItem("SQ 1", "How can a body moving with constant speed have acceleration?", "When a body moves along a circular path with constant speed, its direction of motion changes continuously. Since acceleration is the rate of change of velocity (a vector), this change in direction produces centripetal acceleration.")
            ),
            longQuestions = listOf(
                QAItem("LQ 1", "Derive the second equation of motion S = vi·t + ½at² using a speed-time graph.", "Consider a body with initial velocity vi moving with uniform acceleration a for time t. The total distance S is the area of trapezoid OABD = Area of rectangle OACD (vi × t) + Area of triangle ABC (½ × base × height = ½ × t × at = ½at²). Hence, S = vi·t + ½at².")
            ),
            formulas = listOf(
                FormulaItem("First Equation", "vf = vi + at", "m/s"),
                FormulaItem("Second Equation", "S = vi·t + ½·a·t²", "meters"),
                FormulaItem("Third Equation", "2aS = vf² - vi²", "m²/s²")
            ),
            numericals = listOf(
                NumericalItem(
                    num = "Ex 2.1",
                    statement = "A train starts from rest with an acceleration of 0.5 m/s². Find its speed in km/h when it has moved through 100 m.",
                    given = "vi = 0, a = 0.5 m/s², S = 100 m",
                    formula = "2aS = vf² - vi²",
                    solution = "2 × 0.5 × 100 = vf² - 0  => vf² = 100  => vf = 10 m/s. In km/h: 10 × 3600 / 1000 = 36 km/h",
                    answer = "10 m/s (36 km/h)"
                )
            )
        ),
        ChapterInfo(
            num = 1,
            subjectId = "cls10-bio",
            name = "Gaseous Exchange",
            pageRange = "1 – 18",
            status = "Core Chapter",
            slos = listOf(
                "Describe gaseous exchange in plants through stomata and lenticels.",
                "Explain the human respiratory system: Air passageway and Lungs.",
                "Detail the mechanism of breathing: Inhalation and Exhalation.",
                "Discuss respiratory disorders: Bronchitis, Emphysema, Pneumonia, Lung Cancer."
            ),
            topics = listOf(
                TopicInfo(
                    num = "1.1",
                    title = "Gaseous Exchange in Plants & Humans",
                    summaryEn = "Plants have no specialized respiratory organs. Gas exchange occurs through stomata in leaves and green stems, and lenticels in woody bark. In humans, air enters nostrils → pharynx → larynx → trachea → bronchi → bronchioles → alveoli where gas exchange occurs with pulmonary capillaries.",
                    summaryUr = "پودوں میں گیسوں کا تبادلہ سٹومیٹا اور لینٹیسلز کے ذریعے ہوتا ہے جبکہ انسانوں میں پھیپھڑوں اور ایلویولائی کے ذریعے۔",
                    keyPoints = listOf("Alveoli provide huge surface area for O₂ and CO₂ diffusion", "Surfactant reduces surface tension in alveoli")
                )
            ),
            mcqs = listOf(
                MCQItem(
                    id = "bm1",
                    question = "The process of gaseous exchange in alveoli takes place by:",
                    options = listOf("Active transport", "Simple diffusion", "Osmosis", "Filtration"),
                    correctIndex = 1,
                    explanation = "Oxygen and carbon dioxide diffuse down their respective partial pressure gradients across the thin alveolar-capillary membrane."
                )
            ),
            shortQuestions = listOf(
                QAItem("SQ 1", "How do lenticels help in gaseous exchange in woody stems?", "Lenticels are permanent pore-like aerating openings in the cork layer of woody bark. Unlike stomata, they cannot close and allow continuous exchange of oxygen and carbon dioxide between internal living tissues and ambient air.")
            ),
            longQuestions = listOf(
                QAItem("LQ 1", "Explain the mechanics of inhalation and exhalation in humans with physiological changes in ribs and diaphragm.", "1. Inhalation (Inspiration): External intercostal muscles contract pulling ribs upward and outward; diaphragm contracts and flattens down. Thoracic volume increases, intrathoracic pressure drops below atmospheric pressure, and air rushes in.\n2. Exhalation (Expiration): Intercostal muscles relax, ribs move down and inward; diaphragm relaxes curving upward. Thoracic cavity volume decreases, internal pressure rises, pushing air out passively.")
            )
        ),
        ChapterInfo(
            num = 3,
            subjectId = "cls9-math",
            name = "Unit 3: Logarithm",
            pageRange = "75 – 96",
            status = "High Weightage • 13 MCQs",
            slos = listOf(
                "Express very large and very small numbers in scientific notation x = a × 10ⁿ where 1 ≤ a < 10.",
                "Define logarithm: aˣ = y ⇔ logₐ y = x (a > 0, a ≠ 1) and interchange exponential and logarithmic forms.",
                "Find the characteristic of common logarithms by inspection and mantissa from 4-figure tables.",
                "Define antilogarithm and find values from antilogarithm tables: x = antilog y.",
                "Differentiate between Common Logarithms (base 10, Briggs) and Natural Logarithms (base e ≈ 2.71828, Napier).",
                "State, prove, and apply the 4 Fundamental Laws of Logarithms.",
                "Apply logarithms to simplify complex multi-step computations of multiplication, division, and powers."
            ),
            topics = listOf(
                TopicInfo(
                    num = "3.1",
                    title = "Scientific Notation",
                    summaryEn = "While studying science, we frequently work with very large or very small numbers with many zeros. Scientific notation expresses any positive number x as x = a × 10ⁿ, where a is a real number such that 1 ≤ a < 10 and n is an integer. When x > 10, the decimal point moves left and n is positive. When 0 < x < 1, the decimal point moves right and n is negative.",
                    summaryUr = "سائنسی طریقہ اظہار (Scientific Notation) میں کسی بھی مثبت عدد x کو x = a × 10ⁿ کی صورت میں لکھا جاتا ہے جہاں 1 ≤ a < 10 اور n صحیح عدد ہے۔ جب x > 10 ہو تو اعشاریہ بائیں جانب حرکت کرتا ہے (n مثبت) اور جب 0 < x < 1 ہو تو دائیں جانب (n منفی)۔",
                    keyPoints = listOf(
                        "Standard Form: x = a × 10ⁿ where 1 ≤ a < 10 and n ∈ ℤ",
                        "x > 10: Move decimal left by n places ⇒ n is positive (+)",
                        "0 < x < 1: Move decimal right by n places ⇒ n is negative (-)",
                        "Scientific to standard: positive exponent moves decimal right; negative moves decimal left"
                    ),
                    statIcon = "🔬",
                    statMetric = "x = a × 10ⁿ",
                    statBadge = "1 ≤ a < 10",
                    statColorHex = 0xFF1D4ED8,
                    examples = listOf(
                        "Ex 1: Write 7800 in scientific notation: 7800 = 7.8 × 10³",
                        "Ex 2: Write 0.00729 in scientific notation: 0.00729 = 7.29 × 10⁻³",
                        "Ex 3: Write 674,000,000 in scientific notation: Decimal moves 8 places left ⇒ a = 6.74, n = +8 ⇒ 6.74 × 10⁸",
                        "Ex 4: Write 0.00000327 in scientific notation: Decimal moves 6 places right ⇒ a = 3.27, n = -6 ⇒ 3.27 × 10⁻⁶",
                        "Ex 5(i): 0.25 × 10⁻² = (2.5 × 10⁻¹) × 10⁻² = 2.5 × 10⁻³",
                        "Ex 5(ii): 42.5 × 10² = (4.25 × 10¹) × 10² = 4.25 × 10³",
                        "Ex 6(i): 4.56 × 10⁷ = 45,600,000 (decimal moved 7 places right)",
                        "Ex 6(ii): 8.92 × 10⁻⁵ = 0.0000892 (decimal moved 5 places left)",
                        "Ex 7 (Speed of Light): c = 1.86 × 10⁵ mi/s, 1 day = 8.64 × 10⁴ s ⇒ Distance S = vt = (1.86 × 10⁵) × (8.64 × 10⁴) = 1.60704 × 10¹⁰ miles"
                    ),
                    exercises = listOf(
                        "Ex 3.1 Q1(i): 405,000 = 4.05 × 10⁵",
                        "Ex 3.1 Q1(ii): 1,670,000 = 1.67 × 10⁶",
                        "Ex 3.1 Q1(iii): 0.00000039 = 3.9 × 10⁻⁷",
                        "Ex 3.1 Q1(iv): 0.00092 = 9.2 × 10⁻⁴",
                        "Ex 3.1 Q1(v): 234,600,000,000 = 2.346 × 10¹¹",
                        "Ex 3.1 Q2(i): 8.3 × 10⁻⁵ = 0.000083",
                        "Ex 3.1 Q2(ii): 4.1 × 10⁶ = 4,100,000",
                        "Ex 3.1 Q3: Sunlight time to Earth = (9.3 × 10⁷ mi) / (1.86 × 10⁵ mi/s) = 500 seconds (8 min 20 sec)"
                    )
                ),
                TopicInfo(
                    num = "3.2",
                    title = "Logarithm Definition",
                    summaryEn = "If a positive real number a (where a > 0, a ≠ 1) satisfies aˣ = y, then the exponent x is called the logarithm of y to base a, written as logₐ y = x. 'log' is the abbreviation of logarithm. The relation logₐ y = x ⇔ aˣ = y shows that logarithmic form and exponential form are two equivalent ways of expressing the same relationship. Here a is the base, x is the exponent/logarithm, and y is the argument.",
                    summaryUr = "اگر a ایک مثبت حقیقی عدد ہو (a > 0، a ≠ 1) اور aˣ = y ہو، تو قوت نما x کو اساس 'a' کے لحاظ سے y کا لوگارتھم کہتے ہیں، یعنی logₐ y = x۔ پس logₐ y = x ⇔ aˣ = y۔ قوت نمائی اور لوگارتھمی اشکال ایک ہی تعلق کے دو مختلف اظہار ہیں۔",
                    keyPoints = listOf(
                        "Definition: logₐ y = x ⇔ aˣ = y (a > 0, a ≠ 1, y > 0)",
                        "Exponential Form: aˣ = y (Base a, Exponent x, Result y)",
                        "Logarithmic Form: logₐ y = x (Base a, Argument y, Value x)",
                        "Logarithm of 1 to any base is 0: logₐ 1 = 0 because a⁰ = 1",
                        "Logarithm of base to itself is 1: logₐ a = 1 because a¹ = a"
                    ),
                    statIcon = "📐",
                    statMetric = "aˣ = y ⇔ logₐ y = x",
                    statBadge = "Base a > 0, ≠ 1",
                    statColorHex = 0xFF0D9488,
                    examples = listOf(
                        "Ex 8(i): 2⁴ = 16 in logarithmic form is log₂ 16 = 4",
                        "Ex 8(ii): 4⁻³ = 1/64 in logarithmic form is log₄ (1/64) = -3",
                        "Ex 9(i): log₈ 64 = 2 in exponential form is 8² = 64",
                        "Ex 9(ii): log₃ (1/9) = -2 in exponential form is 3⁻² = 1/9",
                        "Ex 10(i): Solve logₓ 100 = 2 ⇒ x² = 100 ⇒ x² = 10² ⇒ x = 10",
                        "Ex 10(ii): Solve log₁₂ (12³) = x ⇒ 12ˣ = 12³ ⇒ x = 3",
                        "Ex 10(iii): Solve logₓ (4/9) = 2 ⇒ x² = 4/9 = (2/3)² ⇒ x = 2/3"
                    ),
                    exercises = listOf(
                        "Ex 3.2 Q1(i): 4⁴ = 256 ⇒ log₄ 256 = 4",
                        "Ex 3.2 Q1(ii): 2⁻⁶ = 1/64 ⇒ log₂ (1/64) = -6",
                        "Ex 3.2 Q1(iii): 10⁰ = 1 ⇒ log₁₀ 1 = 0",
                        "Ex 3.2 Q2(i): logₐ 2 = 1/2 ⇒ a^(1/2) = 2 ⇒ a = 4",
                        "Ex 3.2 Q3(i): log₅ 125 = x ⇒ 5ˣ = 5³ ⇒ x = 3",
                        "Ex 3.2 Q3(ii): log₄ x = -3 ⇒ x = 4⁻³ = 1/64",
                        "Ex 3.2 Q3(iv): log₃ (5x + 1) = 2 ⇒ 5x + 1 = 3² = 9 ⇒ 5x = 8 ⇒ x = 8/5"
                    )
                ),
                TopicInfo(
                    num = "3.2.1",
                    title = "Char & Mantissa",
                    summaryEn = "Logarithms to base 10 are called Common Logarithms or Briggsian Logarithms, invented by British mathematician Prof. Henry Briggs (1560–1631). When base is omitted, base 10 is understood: log x = log₁₀ x. A common logarithm has two distinct components: (1) Characteristic: the integer part (can be positive, zero, or negative, written with a bar over it e.g. 2̄); (2) Mantissa: the decimal fraction part (always positive, obtained from 4-figure logarithm tables).",
                    summaryUr = "اساس 10 والے لوگارتھم کو عام لوگارتھم (Common Logarithm) یا برگز لوگارتھم کہتے ہیں جسے ہنری برگز نے ایجاد کیا۔ عام لوگارتھم کے دو اجزاء ہوتے ہیں: خاصہ (Characteristic) جو عدد کا صحیح حصہ ہے (مثبت، صفر یا منفی ہو سکتا ہے)، اور مینٹیسا (Mantissa) جو اعشاری حصہ ہے اور ہمیشہ مثبت ہوتا ہے (ٹیبل سے دیکھا جاتا ہے)۔",
                    keyPoints = listOf(
                        "Common Log Base = 10 (Henry Briggs, 1560–1631)",
                        "log x = Characteristic (Integer) + Mantissa (Decimal Fraction ≥ 0)",
                        "Rule 1 (x > 1): Characteristic = (Number of digits before decimal) - 1",
                        "Rule 2 (0 < x < 1): Characteristic = -[(Number of zeros immediately after decimal) + 1]",
                        "Negative characteristic n is written as n̄ (e.g., -1 is written as 1̄, -2 as 2̄)"
                    ),
                    statIcon = "🔢",
                    statMetric = "Char + Mantissa",
                    statBadge = "Base 10 (Briggs)",
                    statColorHex = 0xFFD97706,
                    examples = listOf(
                        "Ex 11(i): log 4350 has 4 digits before decimal ⇒ Characteristic = 4 - 1 = 3",
                        "Ex 11(ii): log 435 has 3 digits before decimal ⇒ Characteristic = 3 - 1 = 2",
                        "Ex 11(iii): log 43.5 has 2 digits before decimal ⇒ Characteristic = 2 - 1 = 1",
                        "Ex 11(iv): log 4.35 has 1 digit before decimal ⇒ Characteristic = 1 - 1 = 0",
                        "Ex 11(v): log 0.435 has 0 zeros after decimal ⇒ Characteristic = -(0 + 1) = -1 (or 1̄)",
                        "Ex 11(vi): log 0.0435 has 1 zero after decimal ⇒ Characteristic = -(1 + 1) = -2 (or 2̄)",
                        "Ex 11(vii): log 0.00435 has 2 zeros after decimal ⇒ Characteristic = -(2 + 1) = -3 (or 3̄)",
                        "Ex 11(viii): log 0.000435 has 3 zeros after decimal ⇒ Characteristic = -(3 + 1) = -4 (or 4̄)"
                    ),
                    exercises = listOf(
                        "Ex 3.3 Q1(i): Characteristic of log 57 (2 digits) = 2 - 1 = 1",
                        "Ex 3.3 Q1(ii): Characteristic of log 7.4 (1 digit) = 1 - 1 = 0",
                        "Ex 3.3 Q1(v): Characteristic of log 982.5 (3 digits) = 3 - 1 = 2",
                        "Ex 3.3 Q1(vi): Characteristic of log 7824 (4 digits) = 4 - 1 = 3",
                        "Ex 3.3 Q1(vii): Characteristic of log 186000 (6 digits) = 6 - 1 = 5",
                        "Ex 3.3 Q1(viii): Characteristic of log 0.71 (0 zeros) = -(0 + 1) = 1̄"
                    )
                ),
                TopicInfo(
                    num = "3.2.2",
                    title = "Log Tables",
                    summaryEn = "To find the logarithm of a number: (1) Find characteristic by inspection; (2) Find mantissa using the 4-figure logarithm tables ignoring the decimal point. The first two digits locate the row in the first column, the third digit locates the column (0–9), and the fourth digit gives the value in the Mean Difference columns (1–9) which is added to the previous reading.",
                    summaryUr = "لوگارتھم ٹیبل کے استعمال سے مینٹیسا معلوم کرنا: عدد کے اعشاریہ کو نظر انداز کر کے پہلے دو ہندسوں سے متعلقہ قطار تلاش کریں، تیسرے ہندسے کے نیچے کالم کا عدد نوٹ کریں اور چوتھے ہندسے سے اوسط فرق (Mean Difference) اسی قطار میں تلاش کر کے جمع کریں۔",
                    keyPoints = listOf(
                        "4-figure Log Table has 3 sections: Row (10–99), Columns (0–9), Mean Differences (1–9)",
                        "Mantissa is independent of decimal point position (depends only on digits)",
                        "Total Logarithm = Characteristic + Mantissa",
                        "Mean difference is always added to the main table reading"
                    ),
                    statIcon = "📜",
                    statMetric = "4-Figure Table",
                    statBadge = "Row + Col + Diff",
                    statColorHex = 0xFF7C3AED,
                    examples = listOf(
                        "Ex 12: Find log 763.5: Characteristic = 3 - 1 = 2. In row 76 under col 3 = 8825. Mean difference under col 5 = 3. Mantissa = .8825 + .0003 = .8828. Hence log 763.5 = 2.8828.",
                        "Reference log 7.529: Char = 0, row 75 under 2 = 8762 + mean diff 9 (5) = 8767 ⇒ log 7.529 = 0.8767.",
                        "Reference log 0.0077: Char = 3̄, row 77 under 0 = 8865 ⇒ log 0.0077 = 3̄.8865.",
                        "Reference log 0.7605: Char = 1̄, row 76 under 0 = 8808 + mean diff 5 (3) = 8811 ⇒ log 0.7605 = 1̄.8811."
                    ),
                    exercises = listOf(
                        "Ex 3.3 Q2(i): log 87.2 ⇒ Char = 1, row 87 under 2 = 9405 ⇒ log 87.2 = 1.9405",
                        "Ex 3.3 Q2(ii): log 37300 ⇒ Char = 4, row 37 under 3 = 5717 ⇒ log 37300 = 4.5717",
                        "Ex 3.3 Q2(iii): log 753 ⇒ Char = 2, row 75 under 3 = 8768 ⇒ log 753 = 2.8768",
                        "Ex 3.3 Q2(v): log 0.00159 ⇒ Char = 3̄, row 15 under 9 = 2014 ⇒ log 0.00159 = 3̄.2014",
                        "Ex 3.3 Q3(i): log 2476 ⇒ Char = 3, row 24 under 7 (3927) + diff 6 (11) = 3938 ⇒ log 2476 = 3.3938"
                    )
                ),
                TopicInfo(
                    num = "3.2.3",
                    title = "Anti-logarithm",
                    summaryEn = "If y = log₁₀ x, then x is called the antilogarithm of y to base 10, written as x = antilog y. The antilogarithm table provides the sequence of digits corresponding to the mantissa (ignoring the characteristic). The characteristic then determines the position of the decimal point: if characteristic is positive n, place the decimal after (n + 1) digits; if characteristic is negative n̄, place (n - 1) zeros after the decimal point before writing the significant digits.",
                    summaryUr = "اینٹی لوگارتھم (Anti-logarithm): اگر y = log₁₀ x ہو تو x کو y کا اینٹی لوگارتھم کہتے ہیں (x = antilog y)۔ اینٹی لوگارتھم ٹیبل سے مینٹیسا کے مطابق ہندسوں کی ترتیب معلوم کی جاتی ہے، اور خاصہ سے اعشاریہ کا مقام متعین ہوتا ہے: اگر خاصہ n مثبت ہو تو (n + 1) ہندسوں بعد اعشاریہ، اگر منفی n̄ ہو تو اعشاریہ کے فوراً بعد (n - 1) صفر لگائے جاتے ہیں۔",
                    keyPoints = listOf(
                        "Definition: y = log₁₀ x ⇔ x = antilog y",
                        "Mantissa determines the digit sequence from the Antilog table",
                        "Characteristic n ≥ 0: place decimal after (n + 1) digits from left",
                        "Characteristic n̄ < 0: place (|n| - 1) zeros after decimal point before first non-zero digit"
                    ),
                    statIcon = "⚡",
                    statMetric = "x = antilog y",
                    statBadge = "Inverse of Log",
                    statColorHex = 0xFFDC2626,
                    examples = listOf(
                        "Ex 13(i): Find antilog of 2.3456: Mantissa .34 in row under col 5 gives 2213 + mean diff 6 (3) = 2216. Characteristic is 2 ⇒ 2 + 1 = 3 digits before decimal ⇒ antilog 2.3456 = 221.6",
                        "Ex 13(ii): Find antilog of 2̄.1576: Mantissa .15 under col 7 gives 1435 + diff 6 (2) = 1437. Characteristic is -2 ⇒ 2 - 1 = 1 zero after decimal ⇒ antilog 2̄.1576 = 0.01437"
                    ),
                    exercises = listOf(
                        "Ex 3.4 Q1(i): antilog 1.2508: row .25 under 0 (1778) + diff 8 (3) = 1781, char 1 ⇒ 17.81",
                        "Ex 3.4 Q1(ii): antilog 0.8401: row .84 under 0 (6918) + diff 1 (2) = 6920, char 0 ⇒ 6.920",
                        "Ex 3.4 Q1(v): antilog 1̄.5463: row .54 under 6 (3516) + diff 3 (2) = 3518, char 1̄ ⇒ 0.3518",
                        "Ex 3.4 Q2(i): log x = 1.8401 ⇒ x = antilog 1.8401 = 69.20",
                        "Ex 3.4 Q2(ii): log x = 2.1931 ⇒ x = antilog 2.1931 = 156.0",
                        "Ex 3.4 Q2(iii): log x = 4.5911 ⇒ x = antilog 4.5911 = 39000"
                    )
                ),
                TopicInfo(
                    num = "3.3",
                    title = "Common & Natural",
                    summaryEn = "Every positive base a (a ≠ 1) defines a logarithm system. Two primary systems exist: (1) Common Logarithms: Base a = 10, invented by Prof. Henry Briggs. Denoted log x. (2) Natural Logarithms: Base a = e, where e = 2.71828... is Euler's irrational constant, developed by Scotsman John Napier (1550–1617). Denoted ln x = logₑ x. Relationship between Common and Natural Logarithms: log₁₀ x = (ln x) / (ln 10) = (1 / 2.30258) · ln x ≈ 0.4343 ln x.",
                    summaryUr = "لوگارتھم کے دو اہم ترین نظامات: (1) عام لوگارتھم (Common Logarithm): اساس 10، موجد ہنری برگز، علامت log x؛ (2) قدرتی لوگارتھم (Natural Logarithm): اساس e = 2.71828...، موجد جان نیپیئر، علامت ln x = logₑ x۔ باہمی تعلق: log₁₀ x = ln x / 2.30258۔",
                    keyPoints = listOf(
                        "Common Log: Base = 10 (Briggsian), written as log x",
                        "Natural Log: Base = e ≈ 2.71828 (Naperian), written as ln x",
                        "Euler's number e is irrational: e ≈ 2.71828...",
                        "Inter-conversion: log₁₀ x = (ln x) / (ln 10) = (ln x) / 2.30258 ≈ 0.4343 ln x",
                        "Natural Log inverse: ln x = y ⇔ eʸ = x"
                    ),
                    statIcon = "🧮",
                    statMetric = "log₁₀ x & ln x",
                    statBadge = "e ≈ 2.71828",
                    statColorHex = 0xFF059669,
                    examples = listOf(
                        "Example: If ln x = 1, then x = e¹ = 2.71828",
                        "Example: If log₁₀ 100 = 2, then ln 100 = 2 × ln 10 = 2 × 2.30258 = 4.60517",
                        "Example: Evaluate ln e⁵ = 5 ln e = 5(1) = 5",
                        "Example: Rewrite y = ln x in exponential form ⇒ eʸ = x"
                    ),
                    exercises = listOf(
                        "Q: Express log₁₀ x in terms of natural logarithm: log₁₀ x = (ln x) / (ln 10)",
                        "Q: Given ln 10 = 2.30258, find the multiplier to convert ln to log₁₀: 1 / 2.30258 ≈ 0.43429",
                        "Q: Evaluate log_e e = ln e: Since base equals argument, ln e = 1"
                    )
                ),
                TopicInfo(
                    num = "3.4",
                    title = "4 Laws of Log",
                    summaryEn = "There are 4 Fundamental Laws of Logarithms: (1) First Law (Product): logₐ (mn) = logₐ m + logₐ n; (2) Second Law (Quotient): logₐ (m/n) = logₐ m - logₐ n; (3) Third Law (Power): logₐ (mⁿ) = n logₐ m; (4) Fourth Law (Change of Base): logₐ m · logₘ n = logₐ n or logₘ n = (logₐ n) / (logₐ m). These laws convert multiplication to addition, division to subtraction, and exponentiation to multiplication.",
                    summaryUr = "لوگارتھم کے چار بنیادی قوانین: (1) ضرب کا قانون: logₐ (mn) = logₐ m + logₐ n؛ (2) تقسیم کا قانون: logₐ (m/n) = logₐ m - logₐ n؛ (3) قوت نمائی کا قانون: logₐ (mⁿ) = n logₐ m؛ (4) اساس کی تبدیلی کا قانون: logₘ n = (logₐ n) / (logₐ m)۔ یہ قوانین ضرب کو جمع، تقسیم کو تفریق اور قوت کو ضرب میں تبدیل کرتے ہیں۔",
                    keyPoints = listOf(
                        "Law 1: logₐ (mn) = logₐ m + logₐ n (Product Law)",
                        "Law 2: logₐ (m/n) = logₐ m - logₐ n (Quotient Law)",
                        "Law 3: logₐ (mⁿ) = n logₐ m (Power Law)",
                        "Law 4: logₘ n = (logₐ n) / (logₐ m) (Change of Base Law)",
                        "Note: logₐ(m + n) ≠ logₐ m + logₐ n; (log m)/(log n) ≠ log m - log n"
                    ),
                    statIcon = "📊",
                    statMetric = "4 Core Laws",
                    statBadge = "Product/Quot/Pwr",
                    statColorHex = 0xFF2563EB,
                    examples = listOf(
                        "Ex 14(i): log 2 + log 3 = log(2 × 3) = log 6",
                        "Ex 14(ii): log 6 - log 2 = log(6/2) = log 3",
                        "Ex 14(iii): -1 + log y = -log 10 + log y = log(1/10) + log y = log(0.10y)",
                        "Ex 14(iv): log₇ 3 - log₇ 5 = log₇ (3/5)",
                        "Ex 14(v): log₂ 8 + log₂ 32 = log₂(8 × 32) = log₂ 256 = 8",
                        "Ex 14(vi): log 3 + log 5 + log 6 - log 25 = log[(3 × 5 × 6) / 25] = log(90/25) = log(18/5)"
                    ),
                    exercises = listOf(
                        "Ex 3.5 Q1(i): log₇ √7 = log₇ (7^(1/2)) = (1/2) log₇ 7 = 1/2",
                        "Ex 3.5 Q1(ii): log₈ (1/2) = log₈ (8^(-1/3)) = -1/3",
                        "Ex 3.5 Q1(iii): log₁₀ √(1000) = log₁₀ (10³)^(1/2) = log₁₀ 10^(3/2) = 3/2",
                        "Ex 3.5 Q2(i): 3 log 2 - 4 log 3 = log 2³ - log 3⁴ = log(8/81)",
                        "Ex 3.5 Q2(iv): (1/2) log x - 2 log(2y) + 3 log z = log[(√x · z³) / (4y²)]",
                        "Ex 3.5 Q3(i): log₇ 6 + log₇ 7 = log₇ a ⇒ log₇ (42) = log₇ a ⇒ a = 42",
                        "Ex 3.5 Q3(ii): log a = log 5 + log 8 - log 2 = log[(5 × 8)/2] = log 20 ⇒ a = 20",
                        "Ex 3.5 Q4: log₂ 3 · log₃ 4 · log₄ 5 · log₅ 6 · log₆ 7 · log₇ 8 = log₂ 8 = 3"
                    )
                ),
                TopicInfo(
                    num = "3.5",
                    title = "Applications",
                    summaryEn = "Application of Logarithms in complex mathematical computations. Lengthy arithmetic processes of multiplication and division of very large and very small numbers are converted into simple additions and subtractions. Step-by-step method: (1) Let x equal the expression; (2) Take log on both sides and apply laws of logarithm; (3) Look up values in log table and perform addition/subtraction; (4) Apply antilogarithm on both sides to compute final value x.",
                    summaryUr = "حسابی مسائل میں لوگارتھم کا اطلاق: پیچیدہ ضرب، تقسیم اور جذر کے سوالات کو لوگارتھم کے قوانین کے ذریعے جمع اور تفریق میں تبدیل کر کے حل کرنا، اور آخر میں اینٹی لوگارتھم لے کر مطلوبہ جواب حاصل کرنا۔",
                    keyPoints = listOf(
                        "Convert multiplication to addition: log(ab) = log a + log b",
                        "Convert division to subtraction: log(a/b) = log a - log b",
                        "Convert powers and roots: log(aⁿ) = n log a; log(ⁿ√a) = (1/n) log a",
                        "Always adjust negative characteristics: add and subtract integer to ensure positive mantissa before antilog"
                    ),
                    statIcon = "💡",
                    statMetric = "Multiplication/Div",
                    statBadge = "Solve & Antilog",
                    statColorHex = 0xFF9333EA,
                    examples = listOf(
                        "Ex 15: Simplify (238.2)(9.506): Let x = (238.2)(9.506) ⇒ log x = log 238.2 + log 9.506 = 2.3770 + 0.9786 = 3.3556 ⇒ x = antilog(3.3556) = 2265",
                        "Ex 16: Simplify 2.83 / (6.52)²: Let x = 2.83 / (6.52)² ⇒ log x = log 2.83 - 2 log 6.52 = 0.4518 - 2(0.8142) = 0.4518 - 1.6284 = -1.1766. Add and subtract 2: log x = (-1.1766 + 2) - 2 = 0.8234 - 2 = 2̄.8234 ⇒ x = antilog(2̄.8234) = 0.06659"
                    ),
                    exercises = listOf(
                        "Ex 3.6 Q1(i): Simplify 3.81 × 43.4: log x = log 3.81 + log 43.4 = 0.5809 + 1.6375 = 2.2184 ⇒ x = antilog 2.2184 = 165.3",
                        "Ex 3.6 Q1(ii): 73.42 × 0.00462 × 0.5143: log x = 1.8658 + 3̄.6646 + 1̄.7112 = 1̄.2416 ⇒ x = antilog 1̄.2416 = 0.1744",
                        "Ex 3.6 Q1(iii): (784.6 × 0.0431) / 28.23: log x = (2.8946 + 2̄.6345) - 1.4507 = 0.0784 ⇒ x = antilog 0.0784 = 1.198",
                        "Ex 3.6 Q2: Given log 2=0.3010, log 3=0.4771, log 5=0.6990, log 7=0.8451: (i) log 105 = log(3×5×7) = 0.4771 + 0.6990 + 0.8451 = 2.0212; (ii) log 108 = log(2² × 3³) = 2(0.3010) + 3(0.4771) = 2.0333; (iii) log √72 = (1/2) log(2³ × 3²) = (1/2)[3(0.3010) + 2(0.4771)] = 0.9286"
                    )
                )
            ),
            mcqs = listOf(
                MCQItem(
                    id = "rev3-mcq-1",
                    question = "log₃ (1/81) = ?",
                    options = listOf("-1", "-2", "-4", "Does not exist"),
                    correctIndex = 2,
                    explanation = "3⁻⁴ = 1/3⁴ = 1/81. Therefore, by definition of logarithm, log₃(1/81) = -4."
                ),
                MCQItem(
                    id = "rev3-mcq-2",
                    question = "If log₂ 8 = x then x = ?",
                    options = listOf("64", "32", "3", "28"),
                    correctIndex = 2,
                    explanation = "In exponential form: 2ˣ = 8. Since 8 = 2³, comparing exponents gives x = 3."
                ),
                MCQItem(
                    id = "rev3-mcq-3",
                    question = "Base of common logarithm is:",
                    options = listOf("10", "e", "π", "5"),
                    correctIndex = 0,
                    explanation = "Common logarithms (invented by Henry Briggs) have base 10. When base is omitted, base 10 is understood."
                ),
                MCQItem(
                    id = "rev3-mcq-4",
                    question = "log √10 = ?",
                    options = listOf("-1", "1/2", "1", "2"),
                    correctIndex = 1,
                    explanation = "√10 = 10^(1/2). By the 3rd law of logarithms: log₁₀ 10^(1/2) = (1/2) log₁₀ 10 = (1/2)(1) = 1/2."
                ),
                MCQItem(
                    id = "rev3-mcq-5",
                    question = "For any non-zero value of x, x⁰ = ?",
                    options = listOf("2", "1", "0", "10"),
                    correctIndex = 1,
                    explanation = "By laws of exponents, any non-zero real number raised to the zero power equals 1 (x⁰ = 1)."
                ),
                MCQItem(
                    id = "rev3-mcq-6",
                    question = "Rewrite t = log_b m as an exponential equation:",
                    options = listOf("t = m^b", "b^m = t", "m = b^t", "m^t = b"),
                    correctIndex = 2,
                    explanation = "By definition of logarithm, log_b m = t is equivalent to base b raised to power t equals m (b^t = m, or m = b^t)."
                ),
                MCQItem(
                    id = "rev3-mcq-7",
                    question = "log₁₀ 10 = ?",
                    options = listOf("2", "3", "0", "1"),
                    correctIndex = 3,
                    explanation = "Logarithm of any base to the same base is always 1 because 10¹ = 10 (log_a a = 1)."
                ),
                MCQItem(
                    id = "rev3-mcq-8",
                    question = "Characteristic of log 0.000059 is:",
                    options = listOf("-5", "5", "-4", "4"),
                    correctIndex = 0,
                    explanation = "For a number x < 1, characteristic = -[(number of zeros immediately following decimal) + 1]. Here there are 4 zeros, so characteristic = -(4 + 1) = -5 (written as 5̄)."
                ),
                MCQItem(
                    id = "rev3-mcq-9",
                    question = "Evaluate log₉ (1/3):",
                    options = listOf("-1", "1/2", "-1/2", "2"),
                    correctIndex = 2,
                    explanation = "Let log₉(1/3) = x ⇒ 9ˣ = 1/3 ⇒ (3²)ˣ = 3⁻¹ ⇒ 3²ˣ = 3⁻¹ ⇒ 2x = -1 ⇒ x = -1/2."
                ),
                MCQItem(
                    id = "rev3-mcq-10",
                    question = "Base of natural logarithm is:",
                    options = listOf("10", "e", "π", "1"),
                    correctIndex = 1,
                    explanation = "Natural logarithm (invented by John Napier) has base e, where e ≈ 2.71828... It is denoted by ln x."
                ),
                MCQItem(
                    id = "rev3-mcq-11",
                    question = "log m + log n = ?",
                    options = listOf("log m · log n", "log m - log n", "log(mn)", "log(m/n)"),
                    correctIndex = 2,
                    explanation = "By the 1st Law of Logarithms (Product Rule), the sum of logarithms of two numbers equals the logarithm of their product: log m + log n = log(mn)."
                ),
                MCQItem(
                    id = "rev3-mcq-12",
                    question = "0.069 can be written in scientific notation as:",
                    options = listOf("6.9 × 10³", "6.9 × 10⁻²", "0.69 × 10³", "69 × 10⁻²"),
                    correctIndex = 1,
                    explanation = "Moving the decimal 2 places to the right gives a = 6.9 (1 ≤ 6.9 < 10) and exponent n = -2. Thus 0.069 = 6.9 × 10⁻²."
                ),
                MCQItem(
                    id = "rev3-mcq-13",
                    question = "ln x - 2 ln y = ?",
                    options = listOf("ln(x/y)", "ln(xy²)", "ln(x²/y)", "ln(x/y²)"),
                    correctIndex = 3,
                    explanation = "Using power rule: 2 ln y = ln(y²). Then using quotient rule: ln x - ln(y²) = ln(x / y²)."
                )
            ),
            shortQuestions = listOf(
                QAItem(
                    qNum = "SQ 2",
                    question = "Write 9473.2 in scientific notation.",
                    answer = "To write 9473.2 in scientific notation x = a × 10ⁿ:\nMove the decimal point 3 places to the left so that only one non-zero digit lies to its left:\na = 9.4732 (since 1 ≤ 9.4732 < 10)\nNumber of places moved = 3 to the left, so n = +3.\nTherefore, 9473.2 = 9.4732 × 10³."
                ),
                QAItem(
                    qNum = "SQ 3",
                    question = "Write 5.4 × 10⁶ in standard notation.",
                    answer = "Given 5.4 × 10⁶.\nThe exponent on 10 is positive 6, so we move the decimal point 6 places to the right, adding zeros as necessary:\n5.4 × 10⁶ = 5,400,000."
                ),
                QAItem(
                    qNum = "SQ 4",
                    question = "Write in logarithmic form: 3⁻³ = 1/27.",
                    answer = "We know the relationship between exponential and logarithmic form:\naˣ = y ⇔ logₐ y = x.\nHere base a = 3, exponent x = -3, and argument y = 1/27.\nTherefore, the logarithmic form is:\nlog₃ (1/27) = -3."
                ),
                QAItem(
                    qNum = "SQ 5",
                    question = "Write in exponential form: log₇ 1 = 0.",
                    answer = "We know the equivalence: logₐ y = x ⇔ aˣ = y.\nHere base a = 7, argument y = 1, and value x = 0.\nTherefore, the exponential form is:\n7⁰ = 1."
                ),
                QAItem(
                    qNum = "SQ 6",
                    question = "Solve for x: log₄ 16 = x.",
                    answer = "Convert to exponential form:\n4ˣ = 16\nExpress 16 as a power with base 4: 16 = 4²\n4ˣ = 4²\nComparing exponents on both sides:\nx = 2."
                ),
                QAItem(
                    qNum = "SQ 7",
                    question = "Find the characteristic of the common logarithm 0.0083.",
                    answer = "For a number x < 1:\nCharacteristic = -[(Number of zeros immediately following the decimal point) + 1]\nIn 0.0083, there are 2 zeros immediately after the decimal point.\nCharacteristic = -(2 + 1) = -3 (written as 3̄)."
                ),
                QAItem(
                    qNum = "SQ 8",
                    question = "Find log 12.4.",
                    answer = "1. Characteristic: 12.4 has 2 digits before the decimal point.\n   Characteristic = 2 - 1 = 1.\n2. Mantissa: In the 4-figure logarithm table, look up row 12 under column 4:\n   Table reading = 0934. Mantissa = .0934.\n3. Combine characteristic and mantissa:\n   log 12.4 = 1.0934."
                ),
                QAItem(
                    qNum = "SQ 9",
                    question = "Find the value of 'a' from: 3a = log_√5 9 + log_√5 2 - log_√5 3.",
                    answer = "Given: 3a = log_√5 9 + log_√5 2 - log_√5 3\nApply the 1st and 2nd Laws of Logarithms:\n3a = log_√5 [(9 × 2) / 3]\n3a = log_√5 [18 / 3]\n3a = log_√5 6\nDivide both sides by 3:\na = (1/3) log_√5 6  (or a = log_√5 ∛6)."
                )
            ),
            longQuestions = listOf(
                QAItem(
                    qNum = "LQ 1",
                    question = "State and prove the Four Fundamental Laws of Logarithms with detailed derivations.",
                    answer = "1. First Law (Product Law): logₐ (mn) = logₐ m + logₐ n\nProof: Let logₐ m = x ⇒ aˣ = m ... (i), and logₐ n = y ⇒ aʸ = n ... (ii).\nMultiplying: mn = aˣ × aʸ = aˣ⁺ʸ ⇒ aˣ⁺ʸ = mn.\nConverting to logarithmic form: logₐ (mn) = x + y.\nSubstituting values of x and y from (i) & (ii): logₐ (mn) = logₐ m + logₐ n. (Proved)\n\n2. Second Law (Quotient Law): logₐ (m/n) = logₐ m - logₐ n\nProof: From (i) & (ii): m/n = aˣ / aʸ = aˣ⁻ʸ ⇒ aˣ⁻ʸ = m/n.\nIn logarithmic form: logₐ (m/n) = x - y.\nSubstituting x and y: logₐ (m/n) = logₐ m - logₐ n. (Proved)\n\n3. Third Law (Power Law): logₐ (mⁿ) = n logₐ m\nProof: Let logₐ m = x ⇒ aˣ = m.\nTaking power n on both sides: (aˣ)ⁿ = mⁿ ⇒ aⁿˣ = mⁿ.\nIn logarithmic form: logₐ (mⁿ) = nx = n(logₐ m). (Proved)\n\n4. Fourth Law (Change of Base Law): logₐ m · logₘ n = logₐ n (or logₘ n = logₐ n / logₐ m)\nProof: Let logₐ m = x ⇒ aˣ = m ... (iii), and logₘ n = y ⇒ mʸ = n ... (iv).\nSubstitute m from (iii) into (iv): (aˣ)ʸ = n ⇒ aˣʸ = n.\nIn logarithmic form: logₐ n = xy.\nSubstituting x and y: logₐ n = (logₐ m) · (logₘ n). (Proved)"
                ),
                QAItem(
                    qNum = "LQ 2",
                    question = "Evaluate the following using logarithm tables: [(63.28) · (0.00843)² · (0.4623)] / [(412.3) · (2.184)⁵].",
                    answer = "Let x = [(63.28) · (0.00843)² · (0.4623)] / [(412.3) · (2.184)⁵]\nTaking log on both sides:\nlog x = log 63.28 + 2 log 0.00843 + log 0.4623 - [log 412.3 + 5 log 2.184]\n\nFinding log of each term from tables:\n1. log 63.28 = 1.8013\n2. log 0.00843 = 3̄.9258 = -3 + 0.9258 = -2.0742 ⇒ 2 log 0.00843 = 2(-2.0742) = -4.1484 = 5̄.8516\n3. log 0.4623 = 1̄.6649 = -1 + 0.6649 = -0.3351\nNumerator Sum = 1.8013 + (-4.1484) + (-0.3351) = -2.6822\n\nDenominator terms:\n4. log 412.3 = 2.6152\n5. log 2.184 = 0.3393 ⇒ 5 log 2.184 = 5(0.3393) = 1.6965\nDenominator Sum = 2.6152 + 1.6965 = 4.3117\n\nSubtract denominator from numerator:\nlog x = -2.6822 - 4.3117 = -6.9939\nMaking mantissa positive by adding and subtracting 7:\nlog x = (-6.9939 + 7) - 7 = 0.0061 - 7 = 7̄.0061\n\nTaking antilog on both sides:\nx = antilog(7̄.0061)\nFrom antilog table, mantissa .0061 corresponds to digits 1014.\nWith characteristic 7̄, place 6 zeros after decimal point:\nx = 0.0000001014 (or 1.014 × 10⁻⁷)."
                )
            ),
            formulas = listOf(
                FormulaItem("Scientific Notation", "x = a × 10ⁿ  (1 ≤ a < 10, n ∈ ℤ)", "Dimensionless"),
                FormulaItem("Logarithm Definition", "logₐ y = x  ⇔  aˣ = y  (a > 0, a ≠ 1)", "Dimensionless"),
                FormulaItem("1st Law (Product)", "logₐ (mn) = logₐ m + logₐ n", "Identity"),
                FormulaItem("2nd Law (Quotient)", "logₐ (m/n) = logₐ m - logₐ n", "Identity"),
                FormulaItem("3rd Law (Power)", "logₐ (mⁿ) = n · logₐ m", "Identity"),
                FormulaItem("4th Law (Change Base)", "logₘ n = logₐ n / logₐ m", "Identity"),
                FormulaItem("Common to Natural Log", "log₁₀ x = ln x / ln 10 = ln x / 2.30258", "Identity")
            ),
            numericals = listOf(
                NumericalItem(
                    num = "Science App 1",
                    statement = "How many miles does light travel in 1 day? The speed of light is 186,000 mi/sec. Express in scientific notation.",
                    given = "v = 186,000 = 1.86 × 10⁵ mi/s, t = 24 × 60 × 60 = 86,400 = 8.64 × 10⁴ s",
                    formula = "S = v × t",
                    solution = "S = (1.86 × 10⁵) × (8.64 × 10⁴) = (1.86 × 8.64) × 10⁵⁺⁴ = 16.0704 × 10⁹ = 1.60704 × 10¹⁰ miles",
                    answer = "1.60704 × 10¹⁰ miles"
                ),
                NumericalItem(
                    num = "Science App 2",
                    statement = "How long does it take light to travel to Earth from the Sun? Sun distance is 9.3 × 10⁷ miles, speed of light is 1.86 × 10⁵ mi/s.",
                    given = "Distance S = 9.3 × 10⁷ miles, Speed v = 1.86 × 10⁵ mi/s",
                    formula = "t = S / v",
                    solution = "t = (9.3 × 10⁷) / (1.86 × 10⁵) = (9.3 / 1.86) × 10⁷⁻⁵ = 5.0 × 10² = 500 seconds = 8 minutes 20 seconds",
                    answer = "500 seconds (8 min 20 s)"
                ),
                NumericalItem(
                    num = "Ex 3.15",
                    statement = "Simplify (238.2)(9.506) with the help of logarithm tables.",
                    given = "Expression: x = (238.2)(9.506)",
                    formula = "log x = log 238.2 + log 9.506",
                    solution = "log 238.2 = 2.3770; log 9.506 = 0.9786. log x = 2.3770 + 0.9786 = 3.3556. Taking antilog: x = antilog(3.3556) = 2265",
                    answer = "2265"
                ),
                NumericalItem(
                    num = "Ex 3.16",
                    statement = "Simplify 2.83 / (6.52)² with the help of logarithm tables.",
                    given = "Expression: x = 2.83 / (6.52)²",
                    formula = "log x = log 2.83 - 2 log 6.52",
                    solution = "log 2.83 = 0.4518; log 6.52 = 0.8142. log x = 0.4518 - 2(0.8142) = 0.4518 - 1.6284 = -1.1766. Add & subtract 2: log x = 2̄.8234. x = antilog(2̄.8234) = 0.06659",
                    answer = "0.06659"
                )
            )
        ),
        ChapterInfo(
            num = 4,
            subjectId = "cls9-math",
            name = "Unit 4: Algebraic Expressions & Formulas",
            pageRange = "97 – 125",
            status = "Core Chapter • High Weightage",
            slos = listOf(
                "Define rational expression p(x)/q(x) where p(x), q(x) are polynomials and q(x) ≠ 0.",
                "Examine whether an expression is a polynomial, rational expression, or in lowest terms.",
                "Perform basic operations (+, -, ×, ÷) on rational algebraic expressions.",
                "Evaluate algebraic expressions at particular real values.",
                "Apply basic identities: (a+b)² + (a-b)² = 2(a²+b²) and (a+b)² - (a-b)² = 4ab.",
                "Expand and apply trinomial square: (a+b+c)² = a²+b²+c²+2(ab+bc+ca).",
                "Apply cube formulas (a±b)³ and sum/diff of cubes a³±b³ = (a±b)(a²∓ab+b²).",
                "Define surds, classify their orders and types, and rationalize denominators using conjugates."
            ),
            topics = listOf(
                TopicInfo(
                    num = "4.1",
                    title = "Algebraic & Rational",
                    summaryEn = "When variables and constants are connected by algebraic operations (+, -, ×, ÷, roots, powers), the resulting statement is an algebraic expression. A rational expression is an expression of the form p(x)/q(x) where p(x) and q(x) are polynomials and q(x) ≠ 0. Every polynomial is a rational expression (as p(x)/1), but not every rational expression is a polynomial. It is in lowest terms if numerator and denominator share no common polynomial factors.",
                    summaryUr = "جب متغیرات (variables) اور مستقل مقداروں (constants) کو بنیادی حسابی علامتوں کے ذریعے ملایا جائے تو الجبری جملہ بنتا ہے۔ p(x)/q(x) کی شکل کا جملہ ناطق جملہ (Rational Expression) کہلاتا ہے بشرطیکہ q(x) ≠ 0 ہو۔ ہر کثیر رقمی ناطق جملہ ہوتی ہے لیکن ہر ناطق جملہ کثیر رقمی نہیں ہوتا۔",
                    keyPoints = listOf(
                        "Rational Expression: p(x)/q(x) with polynomials p(x), q(x) and q(x) ≠ 0",
                        "Lowest terms: p(x) and q(x) have integral coefficients and no common factor",
                        "Addition & Subtraction: require finding LCM of polynomial denominators",
                        "Multiplication & Division: factorize numerators/denominators and cancel common factors"
                    ),
                    statIcon = "➗",
                    statMetric = "p(x) / q(x)",
                    statBadge = "q(x) ≠ 0",
                    statColorHex = 0xFF2563EB,
                    examples = listOf(
                        "Ex 1: 9/(x-3) is in lowest terms (no common factor); (x²-1)/(x-1) = (x-1)(x+1)/(x-1) = x+1 (not in lowest terms)",
                        "Ex 2: Reduce (x²-b²)/((x+b)x²) = (x+b)(x-b)/((x+b)x²) = (x-b)/x²",
                        "Ex 3: Add (x+2)/(x+3) + (x+5)/(x+3) = (x+2+x+5)/(x+3) = (2x+7)/(x+3)",
                        "Ex 4: Add 4/(x-3) + 6/(x+3) = [4(x+3)+6(x-3)]/(x²-9) = (10x-6)/(x²-9)",
                        "Ex 7: Multiply [x/(x+2)] · [(x+3)/(x-3)] = (x²+3x)/(x²-x-6)",
                        "Ex 9: Divide (x²+x-2)/(3x²+9x+6) ÷ (x-1) = [(x+2)(x-1)]/[3(x+2)(x+1)] · 1/(x-1) = 1/[3(x+1)]"
                    ),
                    exercises = listOf(
                        "Ex 4.1 Q1: 1 - 5y + 8y² + 6y³ is a polynomial; x² - 4x + 1/√x is NOT a polynomial",
                        "Ex 4.1 Q2: (y-1)/(x²-9) is in lowest terms; (x+y)/(x²-y²) = 1/(x-y) is NOT in lowest terms",
                        "Ex 4.1 Q3: Reduce (x-5)/(x²-5x) = (x-5)/[x(x-5)] = 1/x",
                        "Ex 4.1 Q4: Add (4x²-5x-10) + (2x²+5x+10) = 6x²"
                    )
                ),
                TopicInfo(
                    num = "4.2",
                    title = "Evaluating Expressions",
                    summaryEn = "The value of a polynomial or rational expression for any real number x = c is obtained by substituting c in place of x. For a rational expression p(x)/q(x), the evaluation is valid for all real numbers except those where q(c) = 0 (which makes the expression undefined).",
                    summaryUr = "کسی الجبری یا ناطق جملے کی کسی حقیقی عدد x = c پر قیمت معلوم کرنے کے لیے متغیر x کی جگہ c درج کیا جاتا ہے، بشرطیکہ مخرج صفر نہ ہو۔",
                    keyPoints = listOf(
                        "Substitute variable values directly with proper parenthetical signs",
                        "For rational expressions: denominator must not equal 0",
                        "Take care of negative signs when raising to even or odd powers"
                    ),
                    statIcon = "🔢",
                    statMetric = "P(x) at x = c",
                    statBadge = "Substitution",
                    statColorHex = 0xFF0D9488,
                    examples = listOf(
                        "Ex 10(i): When x = -3, 2x² - 3x = 2(-3)² - 3(-3) = 2(9) + 9 = 27",
                        "Ex 10(ii): When x = -3, (3x)² - x² = (3(-3))² - (-3)² = (-9)² - 9 = 81 - 9 = 72",
                        "Ex 11(i): When x = 2, y = -3: x² - y² = 2² - (-3)² = 4 - 9 = -5",
                        "Ex 11(ii): (2x)² - (3y)² = (4)² - (-9)² = 16 - 81 = -65"
                    ),
                    exercises = listOf(
                        "Ex 4.2 Q1: When a=3, b=-1, c=2: 5a - 10 = 5(3) - 10 = 5; 3b + 5c = 3(-1) + 5(2) = 7",
                        "Ex 4.2 Q2: For x=-5, y=2: 7 - 3xy = 7 - 3(-5)(2) = 7 + 30 = 37",
                        "Ex 4.2 Q5: Heron's Formula: a=9, b=12, c=15 ⇒ S = (9+12+15)/2 = 18. √[S(S-a)(S-b)(S-c)] = √[18(9)(6)(3)] = 54"
                    )
                ),
                TopicInfo(
                    num = "4.3",
                    title = "Square Formulas",
                    summaryEn = "Two fundamental algebraic identities: (1) (a+b)² + (a-b)² = 2(a²+b²); (2) (a+b)² - (a-b)² = 4ab. These formulas allow finding a²+b² and ab directly whenever the sum (a+b) and difference (a-b) are known, without calculating individual values of a and b.",
                    summaryUr = "بنیادی مربعی کلیات: (1) (a+b)² + (a-b)² = 2(a²+b²)؛ (2) (a+b)² - (a-b)² = 4ab۔ ان کلیات کی مدد سے جب بھی a+b اور a-b معلوم ہوں تو a²+b² اور ab کی قیمتیں باآسانی معلوم کی جا سکتی ہیں۔",
                    keyPoints = listOf(
                        "Addition identity: (a+b)² + (a-b)² = 2(a² + b²)",
                        "Subtraction identity: (a+b)² - (a-b)² = 4ab",
                        "Finding a² + b²: a² + b² = [(a+b)² + (a-b)²] / 2",
                        "Finding ab: ab = [(a+b)² - (a-b)²] / 4"
                    ),
                    statIcon = "📐",
                    statMetric = "4ab & 2(a²+b²)",
                    statBadge = "Identities",
                    statColorHex = 0xFFD97706,
                    examples = listOf(
                        "Ex 12: Given a+b = 5 and a-b = 2: 2(a²+b²) = 5² + 2² = 25 + 4 = 29 ⇒ a²+b² = 29/2; 4ab = 5² - 2² = 25 - 4 = 21 ⇒ ab = 21/4"
                    ),
                    exercises = listOf(
                        "Ex 4.3 Q1(i): When x+y = 8 and x-y = 3: 2(x²+y²) = 8² + 3² = 64 + 9 = 73 ⇒ x²+y² = 73/2; 4xy = 64 - 9 = 55 ⇒ xy = 55/4",
                        "Ex 4.3 Q2(i): When a+b = 7 and a-b = 3: 2(a²+b²) = 49 + 9 = 58 ⇒ a²+b² = 29; 4ab = 49 - 9 = 40 ⇒ ab = 10",
                        "Ex 4.3 Q4: Find 4xy when x+y = 17 and x-y = 5: 4xy = 17² - 5² = 289 - 25 = 264",
                        "Ex 4.3 Q5: If x+y = 11, x-y = 3: 8xy(x²+y²) = 2[4xy][2(x²+y²)]/2 = [4xy][2(x²+y²)] = (11² - 3²)(11² + 3²) = (112)(130) = 14560"
                    )
                ),
                TopicInfo(
                    num = "4.4",
                    title = "(a+b+c)² Expansion",
                    summaryEn = "Expansion of square of a trinomial: (a+b+c)² = a² + b² + c² + 2ab + 2bc + 2ca = a² + b² + c² + 2(ab + bc + ca). In any problem involving these three entities [a+b+c, a²+b²+c², and ab+bc+ca], given any two, the third can be calculated immediately.",
                    summaryUr = "تین رکنی جملے کا مربع: (a+b+c)² = a² + b² + c² + 2(ab + bc + ca)۔ اس کلیے میں شامل تینوں مقداروں میں سے کوئی سی دو معلوم ہوں تو تیسری بآسانی معلوم کی جا سکتی ہے۔",
                    keyPoints = listOf(
                        "Trinomial Identity: (a+b+c)² = a² + b² + c² + 2(ab + bc + ca)",
                        "To find a²+b²+c²: a²+b²+c² = (a+b+c)² - 2(ab+bc+ca)",
                        "To find ab+bc+ca: ab+bc+ca = [(a+b+c)² - (a²+b²+c²)] / 2",
                        "To find a+b+c: a+b+c = ±√[a²+b²+c² + 2(ab+bc+ca)]"
                    ),
                    statIcon = "🔺",
                    statMetric = "(a+b+c)²",
                    statBadge = "3-Term Square",
                    statColorHex = 0xFF7C3AED,
                    examples = listOf(
                        "Ex 13: Given a+b+c = 9 and ab+bc+ca = 20: a²+b²+c² = 9² - 2(20) = 81 - 40 = 41",
                        "Ex 14: Given a²+b²+c² = 29 and ab+bc+ca = 26: (a+b+c)² = 29 + 2(26) = 29 + 52 = 81 ⇒ a+b+c = ±9",
                        "Ex 15: Given a+b+c = 14 and a²+b²+c² = 78: 2(ab+bc+ca) = 14² - 78 = 196 - 78 = 118 ⇒ ab+bc+ca = 59 (or with 12: 144 - 78 = 66 ⇒ 33)"
                    ),
                    exercises = listOf(
                        "Ex 4.4 Q1(i): a+b+c = 5, ab+bc+ca = -4 ⇒ a²+b²+c² = 5² - 2(-4) = 25 + 8 = 33",
                        "Ex 4.4 Q2(i): a²+b²+c² = 38, ab+bc+ca = -1 ⇒ (a+b+c)² = 38 + 2(-1) = 36 ⇒ a+b+c = ±6",
                        "Ex 4.4 Q3(i): a²+b²+c² = 56, a+b+c = 12 ⇒ 2(ab+bc+ca) = 12² - 56 = 144 - 56 = 88 ⇒ ab+bc+ca = 44"
                    )
                ),
                TopicInfo(
                    num = "4.5",
                    title = "(a±b)³ & x³±1/x³",
                    summaryEn = "Cube of binomials: (1) (a+b)³ = a³ + 3ab(a+b) + b³; (2) (a-b)³ = a³ - 3ab(a-b) - b³. Specialized reciprocal forms: (x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x) and (x - 1/x)³ = x³ - 1/x³ - 3(x - 1/x). Allows evaluating x³ ± 1/x³ given x ± 1/x.",
                    summaryUr = "مکعب کے کلیات: (a+b)³ = a³ + 3ab(a+b) + b³ اور (a-b)³ = a³ - 3ab(a-b) - b³۔ معکوس شکلیں: (x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x)۔ جب x ± 1/x معلوم ہو تو x³ ± 1/x³ کی قیمت بآسانی دریافت کی جا سکتی ہے۔",
                    keyPoints = listOf(
                        "Sum of cubes formula: a³ + b³ = (a+b)³ - 3ab(a+b)",
                        "Difference of cubes formula: a³ - b³ = (a-b)³ + 3ab(a-b)",
                        "Reciprocal form: x³ + 1/x³ = (x + 1/x)³ - 3(x + 1/x)",
                        "Reciprocal form: x³ - 1/x³ = (x - 1/x)³ + 3(x - 1/x)"
                    ),
                    statIcon = "🧊",
                    statMetric = "(a ± b)³",
                    statBadge = "Cube Formulas",
                    statColorHex = 0xFFDC2626,
                    examples = listOf(
                        "Ex 16: Given a+b = 5, ab = 10: a³+b³ = 5³ - 3(10)(5) = 125 - 150 = -25",
                        "Ex 17: Given a-b = 2, ab = 15: a³-b³ = 2³ + 3(15)(2) = 8 + 90 = 98",
                        "Ex 18: Given x + 1/x = 5: x³ + 1/x³ = 5³ - 3(5) = 125 - 15 = 110"
                    ),
                    exercises = listOf(
                        "Ex 4.5 Q1(i): a+b = 4, ab = 5 ⇒ a³+b³ = 4³ - 3(5)(4) = 64 - 60 = 4",
                        "Ex 4.5 Q2(ii): a-b = 2, ab = 15 ⇒ a³-b³ = 2³ + 3(15)(2) = 98",
                        "Ex 4.5 Q3(ii): x + 1/x = 2 ⇒ x³ + 1/x³ = 2³ - 3(2) = 8 - 6 = 2",
                        "Ex 4.5 Q5: 3a + 1/a = 4 ⇒ (3a + 1/a)³ = 27a³ + 1/a³ + 3(3)(4) ⇒ 64 = 27a³ + 1/a³ + 36 ⇒ 27a³ + 1/a³ = 28"
                    )
                ),
                TopicInfo(
                    num = "4.6",
                    title = "a³ ± b³ Factor Forms",
                    summaryEn = "Factorization of sum and difference of cubes: (1) a³ + b³ = (a+b)(a² - ab + b²); (2) a³ - b³ = (a-b)(a² + ab + b²). Also applied to continued products: (x+y)(x-y)(x²+xy+y²)(x²-xy+y²) = [(x+y)(x²-xy+y²)][(x-y)(x²+xy+y²)] = (x³+y³)(x³-y³) = x⁶ - y⁶.",
                    summaryUr = "مکعب کے اجزائے ضربی کی اشکال: a³ + b³ = (a+b)(a² - ab + b²) اور a³ - b³ = (a-b)(a² + ab + b²)۔ مسلسل حاصل ضرب کے سوالات میں ان کلیات سے ضرب x⁶ - y⁶ بن جاتی ہے۔",
                    keyPoints = listOf(
                        "Sum of Cubes: a³ + b³ = (a+b)(a² - ab + b²)",
                        "Difference of Cubes: a³ - b³ = (a-b)(a² + ab + b²)",
                        "Continued Product: (x+y)(x-y)(x²+xy+y²)(x²-xy+y²) = x⁶ - y⁶",
                        "Product (x - 1/x)(x² + 1 + 1/x²) = x³ - 1/x³"
                    ),
                    statIcon = "📦",
                    statMetric = "a³ ± b³ Factors",
                    statBadge = "Continued Prod",
                    statColorHex = 0xFF059669,
                    examples = listOf(
                        "Ex 19: a+b=4, ab=3: a³+b³ = (a+b)[(a+b)² - 3ab] = 4[4² - 3(3)] = 4[16 - 9] = 28",
                        "Ex 20: a-b=2, ab=10: a³-b³ = (a-b)[(a-b)² + 3ab] = 2[2² + 3(10)] = 2[34] = 68",
                        "Continued Product: (x+y)(x-y)(x²+xy+y²)(x²-xy+y²) = (x³+y³)(x³-y³) = x⁶ - y⁶"
                    ),
                    exercises = listOf(
                        "Ex 4.6 Q1(i): (a-1)(a²+a+1) = a³ - 1",
                        "Ex 4.6 Q1(ii): (3-b)(9+3b+b²) = 27 - b³",
                        "Ex 4.6 Q1(iv): (a+2)(a²-2a+4) = a³ + 8",
                        "Ex 4.6 Q3(i): (x²-y²)(x²-xy+y²)(x²+xy+y²) = (x³-y³)(x³+y³) = x⁶ - y⁶",
                        "Ex 4.6 Q4: (√x - √y)(x + √xy + y) = (√x)³ - (√y)³ = x√x - y√y"
                    )
                ),
                TopicInfo(
                    num = "4.7",
                    title = "Surds & Types",
                    summaryEn = "A surd is an irrational root of a positive rational number: ⁿ√a, where a is a positive rational number, n is the order/index (natural number > 1), and ⁿ√a is irrational. Classification: Quadratic (order 2 e.g. √3), Cubic (order 3 e.g. ∛7), Biquadratic (order 4). Monomial (one term √3), Binomial (two terms 5-√3), Trinomial. Conjugate surds: a√x + b√y and a√x - b√y differ only in sign connecting their terms, and their product is always rational: a²x - b²y.",
                    summaryUr = "جذر اصم (Surd): کسی مثبت ناطق عدد کا غیر ناطق جذر۔ درجہ 2 کا جذر مربع، درجہ 3 کا مکعب اور 4 کا چوتھا کہلاتا ہے۔ مترافق جذور (Conjugate Surds) وہ دو رقمی جذور ہیں جن کی درمیانی علامت مختلف ہو (جیسے 5+√3 اور 5-√3) اور ان کا حاصل ضرب ہمیشہ ناطق عدد ہوتا ہے۔",
                    keyPoints = listOf(
                        "Surd condition: Radicand a must be positive rational; root ⁿ√a must be irrational",
                        "Order of surd ⁿ√a is n: n=2 quadratic, n=3 cubic, n=4 biquadratic",
                        "Conjugate Surds: (a√x + b√y) and (a√x - b√y) are rationalizing factors of each other",
                        "Product of conjugates: (a√x + b√y)(a√x - b√y) = a²x - b²y (always rational)"
                    ),
                    statIcon = "√",
                    statMetric = "ⁿ√a Radical",
                    statBadge = "Irrational Root",
                    statColorHex = 0xFF4F46E5,
                    examples = listOf(
                        "√3 and √5 are surds (irrational root of rational number)",
                        "∛8 = 2 is NOT a surd because 2 is rational",
                        "√(-2) is NOT a surd because -2 is negative",
                        "Conjugate of 3 - √5 is 3 + √5; (3-√5)(3+√5) = 9 - 5 = 4"
                    ),
                    exercises = listOf(
                        "Ex 4.7 Q1: ∛81 = 3∛3 is a surd; π is NOT a surd (not a root of rational number)",
                        "Ex 4.7 Q2: √12 = √(4×3) = 2√3; √48 = √(16×3) = 4√3; √240 = √(16×15) = 4√15",
                        "Ex 4.7 Q3(iv): (3 - 2√3)(3 + 2√3) = 3² - (2√3)² = 9 - 12 = -3"
                    )
                ),
                TopicInfo(
                    num = "4.8",
                    title = "Rationalization",
                    summaryEn = "Rationalization is the procedure of removing radicals from the denominator of a fraction by multiplying both numerator and denominator by the conjugate of the denominator. Essential technique for simplifying expressions of form 1/(a + b√x) and finding x ± 1/x, x² + 1/x², and x⁴ + 1/x⁴ when x = a ± √b.",
                    summaryUr = "مخرج کو ناطق بنانا (Rationalization): کسر کے مخرج سے جذر ختم کرنے کے لیے شمار کنندہ اور مخرج دونوں کو مخرج کے مترافق (Conjugate) سے ضرب دی جاتی ہے۔",
                    keyPoints = listOf(
                        "Multiply numerator and denominator by conjugate of denominator",
                        "If x = 2 + √3, then 1/x = 2 - √3 ⇒ x + 1/x = 4, x² + 1/x² = 4² - 2 = 14",
                        "If x = √3 - √2, then 1/x = √3 + √2 ⇒ x - 1/x = -2√2, x² + 1/x² = (-2√2)² + 2 = 10"
                    ),
                    statIcon = "⚡",
                    statMetric = "Conjugate Factor",
                    statBadge = "x ± 1/x Solutions",
                    statColorHex = 0xFF9333EA,
                    examples = listOf(
                        "Ex 21: If x = 2+√3, then 1/x = 1/(2+√3) · (2-√3)/(2-√3) = 2-√3. x + 1/x = (2+√3) + (2-√3) = 4. Squaring: x² + 1/x² + 2 = 16 ⇒ x² + 1/x² = 14",
                        "Ex 22: If x = √3-√2, then 1/x = √3+√2. x - 1/x = (√3-√2) - (√3+√2) = -2√2. Squaring: x² + 1/x² - 2 = 8 ⇒ x² + 1/x² = 10"
                    ),
                    exercises = listOf(
                        "Ex 4.7 Q4(iii): Rationalize 1/(√2 - 1) = (√2 + 1)/(2 - 1) = √2 + 1",
                        "Ex 4.7 Q5: If x = √5 + 2, 1/x = √5 - 2 ⇒ x + 1/x = 2√5, x² + 1/x² = (2√5)² - 2 = 18",
                        "Ex 4.7 Q7: If x = 5 - 2√6, 1/x = 5 + 2√6 ⇒ x + 1/x = 10, x² + 1/x² = 10² - 2 = 98",
                        "Ex 4.7 Q10: If x = 2 - √3, x + 1/x = 4 ⇒ x² + 1/x² = 14 ⇒ x⁴ + 1/x⁴ = 14² - 2 = 194"
                    )
                )
            ),
            mcqs = listOf(
                MCQItem(
                    id = "rev4-mcq-1",
                    question = "mr² + 3mr² - 5mr² = ?",
                    options = listOf("-mr²", "-mr", "mr", "mr²"),
                    correctIndex = 0,
                    explanation = "(1 + 3 - 5)mr² = -1mr² = -mr²."
                ),
                MCQItem(
                    id = "rev4-mcq-2",
                    question = "(x³ y²)(x² y³) = ?",
                    options = listOf("x³ y⁵", "x⁵ y⁴", "x⁵ y⁵", "x⁴ y⁴"),
                    correctIndex = 2,
                    explanation = "By product law of exponents: x³⁺² · y²⁺³ = x⁵ y⁵."
                ),
                MCQItem(
                    id = "rev4-mcq-3",
                    question = "(4xy³)³ = ?",
                    options = listOf("64x³ y⁶", "64x³ y⁸", "64x³ y⁹", "64x³ y¹²"),
                    correctIndex = 2,
                    explanation = "4³ · x³ · (y³)³ = 64x³ y⁹."
                ),
                MCQItem(
                    id = "rev4-mcq-4",
                    question = "(7x + 4y) - (3x - 6y) = ?",
                    options = listOf("3x", "2x + 10y", "4x + y", "4x + 10y"),
                    correctIndex = 3,
                    explanation = "7x + 4y - 3x + 6y = (7-3)x + (4+6)y = 4x + 10y."
                ),
                MCQItem(
                    id = "rev4-mcq-5",
                    question = "(a+b)² - (a-b)² = ?",
                    options = listOf("4ab", "2(a²+b²)", "a² - 4ab + 2b²", "a⁴ - b⁴"),
                    correctIndex = 0,
                    explanation = "(a² + 2ab + b²) - (a² - 2ab + b²) = 4ab."
                ),
                MCQItem(
                    id = "rev4-mcq-6",
                    question = "(a + b + c)² = ?",
                    options = listOf(
                        "a² + b² + c²",
                        "a² + b² + c² + 2(a+b+c)",
                        "a² + b² + c² + 2(ab+bc+ca)",
                        "a + b + c + 2(ab+bc+ca)"
                    ),
                    correctIndex = 2,
                    explanation = "By trinomial expansion formula: (a+b+c)² = a² + b² + c² + 2(ab+bc+ca)."
                ),
                MCQItem(
                    id = "rev4-mcq-7",
                    question = "a³ + b³ = ?",
                    options = listOf(
                        "(a+b)³ - 2ab(a+b)",
                        "(a+b)(a² + ab + b²)",
                        "(a-b)(a² - ab + b²)",
                        "(a+b)(a² - ab + b²)"
                    ),
                    correctIndex = 3,
                    explanation = "By sum of cubes factor formula: a³ + b³ = (a+b)(a² - ab + b²)."
                ),
                MCQItem(
                    id = "rev4-mcq-8",
                    question = "Conjugate of 3 - √5 is:",
                    options = listOf("-3 - √5", "-3 + √5", "3 + √5", "√3 + √5"),
                    correctIndex = 2,
                    explanation = "The conjugate of a binomial surd (a - √b) is obtained by changing the sign connecting the terms: (a + √b) = 3 + √5."
                ),
                MCQItem(
                    id = "rev4-mcq-9",
                    question = "Which of the following is equivalent to (m² + 4)^(-1/2)?",
                    options = listOf("(m²+4)/2", "-√(m²+4)", "1 / √(m²+4)", "1 / (m+2)"),
                    correctIndex = 2,
                    explanation = "Negative exponent inverts the base and power 1/2 represents square root: (m²+4)^(-1/2) = 1 / (m²+4)^(1/2) = 1 / √(m²+4)."
                ),
                MCQItem(
                    id = "rev4-mcq-10",
                    question = "For which of the following expressions is (a + b) NOT a factor?",
                    options = listOf("a² - b²", "a² + b²", "a³ + b³", "a⁴ - b⁴"),
                    correctIndex = 1,
                    explanation = "a² - b² = (a+b)(a-b); a³ + b³ = (a+b)(a²-ab+b²); a⁴ - b⁴ = (a²+b²)(a+b)(a-b). But a² + b² cannot be factored over real numbers and does not contain (a+b) as a factor."
                )
            ),
            shortQuestions = listOf(
                QAItem(
                    qNum = "SQ 2",
                    question = "Simplify: (12x⁴y³ / 25a³b⁴) × (15a³b⁴ / 16x⁴y²).",
                    answer = "Cancel common terms:\nx⁴ cancels x⁴, a³ cancels a³, b⁴ cancels b⁴.\nRemaining: (12/25) × (15/16) × (y³/y²) = (12 × 15) / (25 × 16) × y = (3/5) × (3/4) × y = (9/20) y (or 3y/4 after reducing 180/400 = 9/20)."
                ),
                QAItem(
                    qNum = "SQ 3",
                    question = "Evaluate (2x - 3) / (x² - x + 1) for x = 2.",
                    answer = "Substitute x = 2 into numerator and denominator:\nNumerator: 2(2) - 3 = 4 - 3 = 1\nDenominator: 2² - 2 + 1 = 4 - 2 + 1 = 3\nValue = 1/3."
                ),
                QAItem(
                    qNum = "SQ 4",
                    question = "Find the values of x² + y² and xy when x+y = 7 and x-y = 3.",
                    answer = "1. 2(x² + y²) = (x+y)² + (x-y)² = 7² + 3² = 49 + 9 = 58 ⇒ x² + y² = 58/2 = 29.\n2. 4xy = (x+y)² - (x-y)² = 7² - 3² = 49 - 9 = 40 ⇒ xy = 40/4 = 10."
                ),
                QAItem(
                    qNum = "SQ 5",
                    question = "Find the value of a+b+c when a²+b²+c² = 43 and ab+bc+ca = 3.",
                    answer = "Formula: (a+b+c)² = a² + b² + c² + 2(ab+bc+ca)\n(a+b+c)² = 43 + 2(3) = 43 + 6 = 49\nTaking square root: a+b+c = ±√49 = ±7."
                ),
                QAItem(
                    qNum = "SQ 6",
                    question = "If a+b+c = 6 and a²+b²+c² = 24, find ab+bc+ca.",
                    answer = "Formula: (a+b+c)² = a² + b² + c² + 2(ab+bc+ca)\n6² = 24 + 2(ab+bc+ca)\n36 = 24 + 2(ab+bc+ca)\n2(ab+bc+ca) = 36 - 24 = 12\nab+bc+ca = 12/2 = 6."
                ),
                QAItem(
                    qNum = "SQ 7",
                    question = "If 2x - 3y = 8 and xy = 2, find the value of 8x³ - 27y³.",
                    answer = "Formula: (2x - 3y)³ = (2x)³ - (3y)³ - 3(2x)(3y)(2x - 3y)\n8³ = 8x³ - 27y³ - 18(xy)(2x - 3y)\n512 = 8x³ - 27y³ - 18(2)(8)\n512 = 8x³ - 27y³ - 288\n8x³ - 27y³ = 512 + 288 = 800."
                ),
                QAItem(
                    qNum = "SQ 8",
                    question = "If x + 1/x = 8, find the value of x³ + 1/x³.",
                    answer = "Formula: (x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x)\n8³ = x³ + 1/x³ + 3(8)\n512 = x³ + 1/x³ + 24\nx³ + 1/x³ = 512 - 24 = 488."
                ),
                QAItem(
                    qNum = "SQ 9",
                    question = "Find the product: (4/5 x - 5/4x)(16/25 x² + 25/16x² + 1).",
                    answer = "Let a = 4/5 x and b = 5/4x. Then ab = (4/5 x)(5/4x) = 1.\nThe expression is (a - b)(a² + b² + ab) which is the difference of cubes identity a³ - b³.\nTherefore: (4/5 x)³ - (5/4x)³ = (64/125) x³ - (125/64x³)."
                )
            ),
            longQuestions = listOf(
                QAItem(
                    qNum = "LQ 1",
                    question = "Derive the following algebraic formulas: (1) (a+b)² + (a-b)² = 2(a²+b²); (2) (a+b)² - (a-b)² = 4ab; (3) (a+b+c)² = a²+b²+c²+2(ab+bc+ca); (4) (a±b)³ = a³±3a²b+3ab²±b³.",
                    answer = "1. (a+b)² + (a-b)² = (a²+2ab+b²) + (a²-2ab+b²) = 2a² + 2b² = 2(a²+b²).\n2. (a+b)² - (a-b)² = (a²+2ab+b²) - (a²-2ab+b²) = 2ab + 2ab = 4ab.\n3. Let b+c = x. (a+x)² = a² + 2ax + x² = a² + 2a(b+c) + (b+c)² = a² + 2ab + 2ac + b² + 2bc + c² = a² + b² + c² + 2ab + 2bc + 2ca.\n4. (a+b)³ = (a+b)(a+b)² = (a+b)(a²+2ab+b²) = a(a²+2ab+b²) + b(a²+2ab+b²) = a³ + 2a²b + ab² + ba² + 2ab² + b³ = a³ + 3a²b + 3ab² + b³ = a³ + 3ab(a+b) + b³."
                ),
                QAItem(
                    qNum = "LQ 2",
                    question = "Simplify the algebraic fraction: [2x² / (x² - 16)] - [x / (x² - 4)] + [1 / (x + 2)].",
                    answer = "Factorize denominators:\nx² - 16 = (x - 4)(x + 4)\nx² - 4 = (x - 2)(x + 2)\nFirst combine the last two terms: -x/[(x-2)(x+2)] + 1/(x+2) = [-x + (x - 2)] / [(x-2)(x+2)] = -2 / [(x-2)(x+2)] = -2 / (x² - 4).\nNow combine with first term: 2x²/(x² - 16) - 2/(x² - 4) = 2[x²/(x² - 16) - 1/(x² - 4)] = 2[x²(x² - 4) - (x² - 16)] / [(x² - 16)(x² - 4)] = 2[x⁴ - 4x² - x² + 16] / [(x² - 16)(x² - 4)] = 2(x⁴ - 5x² + 16) / [(x² - 16)(x² - 4)]."
                )
            ),
            formulas = listOf(
                FormulaItem("Square Sum Identity", "(a+b)² + (a-b)² = 2(a² + b²)", "Identity"),
                FormulaItem("Square Diff Identity", "(a+b)² - (a-b)² = 4ab", "Identity"),
                FormulaItem("Trinomial Square", "(a+b+c)² = a²+b²+c²+2(ab+bc+ca)", "Identity"),
                FormulaItem("Binomial Cube (+)", "(a+b)³ = a³ + 3ab(a+b) + b³", "Identity"),
                FormulaItem("Binomial Cube (-)", "(a-b)³ = a³ - 3ab(a-b) - b³", "Identity"),
                FormulaItem("Sum of Cubes Factor", "a³ + b³ = (a+b)(a² - ab + b²)", "Identity"),
                FormulaItem("Diff of Cubes Factor", "a³ - b³ = (a-b)(a² + ab + b²)", "Identity"),
                FormulaItem("Conjugate Surds", "(a√x + b√y)(a√x - b√y) = a²x - b²y", "Identity")
            ),
            numericals = listOf(
                NumericalItem(
                    num = "Alg Num 1",
                    statement = "If x = 2 + √3, find the values of x + 1/x and x² + 1/x².",
                    given = "x = 2 + √3",
                    formula = "1/x = 1/(2+√3) = 2 - √3,  x² + 1/x² = (x + 1/x)² - 2",
                    solution = "x + 1/x = (2 + √3) + (2 - √3) = 4.  x² + 1/x² = 4² - 2 = 16 - 2 = 14",
                    answer = "x + 1/x = 4,  x² + 1/x² = 14"
                ),
                NumericalItem(
                    num = "Alg Num 2",
                    statement = "If x = √3 - √2, find the values of x - 1/x and x² + 1/x².",
                    given = "x = √3 - √2",
                    formula = "1/x = √3 + √2,  x² + 1/x² = (x - 1/x)² + 2",
                    solution = "x - 1/x = (√3 - √2) - (√3 + √2) = -2√2.  x² + 1/x² = (-2√2)² + 2 = 8 + 2 = 10",
                    answer = "x - 1/x = -2√2,  x² + 1/x² = 10"
                ),
                NumericalItem(
                    num = "Alg Num 3",
                    statement = "When a+b = 5 and a-b = 2, calculate a² + b² and ab.",
                    given = "a+b = 5, a-b = 2",
                    formula = "2(a²+b²) = (a+b)² + (a-b)²,  4ab = (a+b)² - (a-b)²",
                    solution = "2(a²+b²) = 25 + 4 = 29 ⇒ a²+b² = 29/2 = 14.5. 4ab = 25 - 4 = 21 ⇒ ab = 21/4 = 5.25",
                    answer = "a²+b² = 29/2,  ab = 21/4"
                ),
                NumericalItem(
                    num = "Alg Num 4",
                    statement = "If x + 1/x = 5, find the value of x³ + 1/x³.",
                    given = "x + 1/x = 5",
                    formula = "x³ + 1/x³ = (x + 1/x)³ - 3(x + 1/x)",
                    solution = "x³ + 1/x³ = 5³ - 3(5) = 125 - 15 = 110",
                    answer = "110"
                )
            )
        ),
        ChapterInfo(
            num = 5,
            subjectId = "cls9-math",
            name = "Unit 5: Factorization",
            pageRange = "126 – 158",
            status = "Core Chapter • High Weightage",
            slos = listOf(
                "Recall factorization types: ka+kb+kc, ac+ad+bc+bd, a²±2ab+b², a²-b², a²±2ab+b²-c².",
                "Factorize Type I: a⁴+a²b²+b⁴ or a⁴+4b⁴ by completing the square.",
                "Factorize Type II & III quadratic trinomials: x²+bx+c and ax²+bx+c using mid-term splitting.",
                "Factorize Type IV quartic polynomials: (ax²+bx+c)(ax²+bx+d)+k using substitution y = ax²+bx.",
                "Factorize Type V & VI: perfect cubes and sum/difference of cubes a³±b³.",
                "State, prove, and apply the Remainder Theorem: R = P(r).",
                "Define zeros of a polynomial and state/prove the Factor Theorem.",
                "Use the Factor Theorem to factorize cubic polynomials completely."
            ),
            topics = listOf(
                TopicInfo(
                    num = "5.1",
                    title = "Basic 5 Factor Types",
                    summaryEn = "Factorization is the reverse process of multiplication: expressing a polynomial as a product of two or more irreducible polynomials. Five foundational types: (1) Common factor ka+kb+kc = k(a+b+c); (2) Grouping ac+ad+bc+bd = a(c+d)+b(c+d) = (a+b)(c+d); (3) Perfect square a²±2ab+b² = (a±b)²; (4) Difference of squares a²-b² = (a+b)(a-b); (5) Combined a²±2ab+b²-c² = (a±b)² - c² = (a±b+c)(a±b-c).",
                    summaryUr = "تجزی (Factorization) ضرب کا الٹ عمل ہے جس میں کسی الجبری جملے کو دو یا دو سے زائد اجزائے ضربی کے حاصل ضرب کے طور پر لکھا جاتا ہے۔ پانچ بنیادی اقسام: (1) مشترک لینا؛ (2) گروپ بنانا؛ (3) کامل مربع بنانا؛ (4) دو مربعوں کا فرق؛ (5) مرکب مربع۔",
                    keyPoints = listOf(
                        "Factorization: expressing a polynomial as product of factors",
                        "Type 1: Take out highest common factor (HCF)",
                        "Type 2: Group terms in pairs sharing common binomials",
                        "Type 3: Check if 1st and last terms are perfect squares and middle is 2ab",
                        "Type 4: a² - b² = (a+b)(a-b)",
                        "Type 5: Group first three terms into perfect square, then apply a² - b²"
                    ),
                    statIcon = "🧩",
                    statMetric = "5 Basic Types",
                    statBadge = "Grouping & Sq",
                    statColorHex = 0xFF1D4ED8,
                    examples = listOf(
                        "Ex 1(a): 15 + 10x - 5x² = 5(3 + 2x - x²)",
                        "Ex 2: a² - ab - 3a + 3b = a(a-b) - 3(a-b) = (a-b)(a-3)",
                        "Ex 3(a): x² + 8x + 16 = x² + 2(x)(4) + 4² = (x+4)²",
                        "Ex 4(a): x² - 16 = x² - 4² = (x+4)(x-4)",
                        "Ex 5: a² + 4ab + 4b² - c² = (a+2b)² - c² = (a+2b+c)(a+2b-c)",
                        "Ex 6: a² - b² + 2b - 1 = a² - (b-1)² = (a+b-1)(a-b+1)"
                    ),
                    exercises = listOf(
                        "Ex 5.1 Q1: 9s³t + 15s²t³ - 3s²t² = 3s²t(3s + 5t² - t)",
                        "Ex 5.1 Q3: ax - a - x + 1 = a(x-1) - 1(x-1) = (x-1)(a-1)",
                        "Ex 5.1 Q5: 4x² + 4 + 1/x² = (2x)² + 2(2x)(1/x) + (1/x)² = (2x + 1/x)²",
                        "Ex 5.1 Q8: 2x² - 288 = 2(x² - 144) = 2(x+12)(x-12)",
                        "Ex 5.1 Q9: 1 + 2uv - u² - v² = 1 - (u-v)² = (1+u-v)(1-u+v)"
                    )
                ),
                TopicInfo(
                    num = "5.2",
                    title = "Type I: a⁴ + 4b⁴",
                    summaryEn = "Expressions of the form a⁴ + a²b² + b⁴ or a⁴ + 4b⁴ are neither perfect squares nor differences of squares initially. By adding and subtracting suitable terms, we convert them into the difference of two squares [A² - B² = (A+B)(A-B)]. For a⁴ + 4b⁴: add and subtract 4a²b² ⇒ (a² + 2b²)² - (2ab)² = (a² + 2b² + 2ab)(a² + 2b² - 2ab).",
                    summaryUr = "a⁴ + a²b² + b⁴ یا a⁴ + 4b⁴ کی قسم کے جملے: یہ بذات خود کامل مربع نہیں ہوتے، لیکن کسی مناسب رقم کو جمع اور تفریق کرنے سے انہیں دو مربعوں کے فرق A² - B² کی شکل میں تبدیل کر کے تجزی کی جاتی ہے۔",
                    keyPoints = listOf(
                        "Form a⁴ + 4b⁴: add and subtract 2(a²)(2b²) = 4a²b²",
                        "Form a⁴ + a²b² + b⁴: add and subtract a²b² ⇒ (a² + b²)² - (ab)²",
                        "Form x⁴ - 7x² + 1: add and subtract 2x² ⇒ (x² + 1)² - (3x)²"
                    ),
                    statIcon = "➕",
                    statMetric = "Complete Square",
                    statBadge = "Add & Subtract",
                    statColorHex = 0xFF0D9488,
                    examples = listOf(
                        "Ex 7: a⁴ + 4b⁴ = a⁴ + 4b⁴ + 4a²b² - 4a²b² = (a² + 2b²)² - (2ab)² = (a² + 2ab + 2b²)(a² - 2ab + 2b²)",
                        "Ex 8: a⁴ + a²b² + b⁴ = (a² + b²)² - (ab)² = (a² + ab + b²)(a² - ab + b²)",
                        "Ex 9: x⁴ - 7x² + 1 = (x⁴ + 2x² + 1) - 9x² = (x² + 1)² - (3x)² = (x² + 3x + 1)(x² - 3x + 1)"
                    ),
                    exercises = listOf(
                        "Ex 5.2 Q1: x⁴ + 64 = (x² + 8)² - (4x)² = (x² + 4x + 8)(x² - 4x + 8)",
                        "Ex 5.2 Q2: 4x⁴ + 81 = (2x² + 9)² - (6x)² = (2x² + 6x + 9)(2x² - 6x + 9)",
                        "Ex 5.2 Q3: a⁴ + a²b² + b⁴ = (a² + ab + b²)(a² - ab + b²)",
                        "Ex 5.2 Q5: x⁴ + x² + 1 = (x² + x + 1)(x² - x + 1)"
                    )
                ),
                TopicInfo(
                    num = "5.3",
                    title = "Mid-Term Splitting",
                    summaryEn = "Factorization of quadratic trinomials of the form x² + bx + c and ax² + bx + c. We find two numbers b₁ and b₂ such that b₁ · b₂ = ac and b₁ + b₂ = b. Then split the middle term: ax² + bx + c = ax² + b₁x + b₂x + c, and factorize by grouping.",
                    summaryUr = "دو درجی سہ رقمی جملوں کی تجزی (درمیانی رقم کو توڑنا): ax² + bx + c میں دو ایسے اعداد b₁ اور b₂ تلاش کیے جاتے ہیں جن کا حاصل ضرب ac اور حاصل جمع b ہو۔ پھر درمیانی رقم کو توڑ کر جوڑے بنا کر مشترک لیا جاتا ہے۔",
                    keyPoints = listOf(
                        "For x² + bx + c: find factors p, q such that pq = c and p + q = b ⇒ (x+p)(x+q)",
                        "For ax² + bx + c: find two numbers with product = ac and sum = b",
                        "If constant term c > 0, factors have same sign (matching sign of b)",
                        "If constant term c < 0, factors have opposite signs"
                    ),
                    statIcon = "✂️",
                    statMetric = "ax² + bx + c",
                    statBadge = "Trinomials",
                    statColorHex = 0xFFD97706,
                    examples = listOf(
                        "Ex 10: Factorize y² - 7y + 12: Product = 12, Sum = -7 ⇒ numbers are -3, -4 ⇒ (y - 3)(y - 4)",
                        "Ex 11: Factorize x² + 10x + 21: Product = 21, Sum = 10 ⇒ numbers are 3, 7 ⇒ (x + 3)(x + 7)",
                        "Ex 12: Rectangle Area = x² + 13x - 90 = (x + 18)(x - 5). Perimeter = 2(x+18) + 2(x-5) = 4x + 26",
                        "Ex 13: Factorize 2x² - 7x - 4: ac = 2(-4) = -8, b = -7 ⇒ numbers 1, -8 ⇒ 2x² + x - 8x - 4 = x(2x+1) - 4(2x+1) = (2x+1)(x-4)"
                    ),
                    exercises = listOf(
                        "Ex 5.3 Q1: x² - 7x + 12 = (x - 3)(x - 4)",
                        "Ex 5.3 Q2: x² + x - 12 = (x + 4)(x - 3)",
                        "Ex 5.3 Q4: 2y² - 7y + 3 = 2y² - 6y - y + 3 = 2y(y-3) - 1(y-3) = (2y-1)(y-3)",
                        "Ex 5.3 Q5: 4x² + 8x + 3 = 4x² + 6x + 2x + 3 = 2x(2x+3) + 1(2x+3) = (2x+1)(2x+3)"
                    )
                ),
                TopicInfo(
                    num = "5.4",
                    title = "Quartic by Substitution",
                    summaryEn = "Factorization of advanced 4th degree algebraic expressions of the forms: (1) (ax²+bx+c)(ax²+bx+d) + k; (2) (x+a)(x+b)(x+c)(x+d) + k; (3) (x+a)(x+b)(x+c)(x+d) + kx². By substituting y = ax² + bx, these quartic expressions reduce to simple quadratic equations in y, which are easily factored before substituting back.",
                    summaryUr = "چوتھے درجے کے پیچیدہ الجبری جملوں کی تجزی بذریعہ متبادل (Substitution): y = ax² + bx فرض کر کے چوتھے درجے کی مساوات کو دو درجی مساوات میں تبدیل کیا جاتا ہے، جس کی تجزی کے بعد y کی اصل قیمت واپس درج کر دی جاتی ہے۔",
                    keyPoints = listOf(
                        "Type (ax²+bx+c)(ax²+bx+d) + k: put y = ax² + bx",
                        "Type (x+a)(x+b)(x+c)(x+d) + k: pair binomials such that a + b = c + d",
                        "Type (x+a)(x+b)(x+c)(x+d) + kx²: pair binomials such that ab = cd"
                    ),
                    statIcon = "🔄",
                    statMetric = "y = ax² + bx",
                    statBadge = "Type IV Quartic",
                    statColorHex = 0xFF7C3AED,
                    examples = listOf(
                        "Ex 14: (x²+7x+10)(x²+7x+12) + 1: Put y = x²+7x ⇒ (y+10)(y+12)+1 = y²+22y+121 = (y+11)² = (x²+7x+11)²",
                        "Ex 15: (3x²+11x+2)(3x²+11x+3) - 12: Put y = 3x²+11x ⇒ (y+2)(y+3)-12 = y²+5y-6 = (y+6)(y-1) = (3x²+11x+6)(3x²+11x-1)",
                        "Ex 16: (x+1)(x+2)(x+3)(x+4) + 1: Pair (x+1)(x+4) and (x+2)(x+3) ⇒ (x²+5x+4)(x²+5x+6)+1 = (y+4)(y+6)+1 = y²+10y+25 = (y+5)² = (x²+5x+5)²"
                    ),
                    exercises = listOf(
                        "Ex 5.4 Q1: (4x²-16x+7)(4x²-16x+15) + 16: Put y = 4x²-16x ⇒ (y+7)(y+15)+16 = y²+22y+121 = (y+11)² = (4x²-16x+11)²",
                        "Ex 5.4 Q3: (x+2)(x+4)(x+6)(x+8) - 9: Pair (x+2)(x+8) and (x+4)(x+6) ⇒ (x²+10x+16)(x²+10x+24)-9",
                        "Ex 5.4 Q4: x(x+1)(x+2)(x+3) + 1 = (x²+3x)(x²+3x+2) + 1 = (x²+3x+1)²"
                    )
                ),
                TopicInfo(
                    num = "5.5",
                    title = "Cube Factorization",
                    summaryEn = "Factorization using cubic identities: (1) Perfect Cubes: a³ ± 3a²b + 3ab² ± b³ = (a ± b)³; (2) Sum and Difference of Two Cubes: a³ + b³ = (a+b)(a² - ab + b²) and a³ - b³ = (a-b)(a² + ab + b²). Also applies to expressions with numerical coefficients and fractional variables.",
                    summaryUr = "مکعب کے کلیات کی مدد سے تجزی: (1) کامل مکعب: a³ ± 3a²b + 3ab² ± b³ = (a ± b)³؛ (2) دو مکعبوں کا مجموعہ یا فرق: a³ ± b³ = (a ± b)(a² ∓ ab + b²)۔",
                    keyPoints = listOf(
                        "Perfect Cube (+): a³ + 3a²b + 3ab² + b³ = (a + b)³",
                        "Perfect Cube (-): a³ - 3a²b + 3ab² - b³ = (a - b)³",
                        "Sum of cubes: a³ + b³ = (a+b)(a² - ab + b²)",
                        "Difference of cubes: a³ - b³ = (a-b)(a² + ab + b²)"
                    ),
                    statIcon = "🧊",
                    statMetric = "(a ± b)³ & a³±b³",
                    statBadge = "Type V & VI",
                    statColorHex = 0xFFDC2626,
                    examples = listOf(
                        "Ex 18: 8a³ + 36a²b + 54ab² + 27b³ = (2a)³ + 3(2a)²(3b) + 3(2a)(3b)² + (3b)³ = (2a + 3b)³",
                        "Ex 19: 27x³ - 27x²y + 9xy² - y³ = (3x)³ - 3(3x)²(y) + 3(3x)(y)² - y³ = (3x - y)³",
                        "Ex 20: 2x³ + 16 = 2(x³ + 8) = 2(x³ + 2³) = 2(x + 2)(x² - 2x + 4)",
                        "Ex 21: a³ - 64b³ = (a)³ - (4b)³ = (a - 4b)(a² + 4ab + 16b²)"
                    ),
                    exercises = listOf(
                        "Ex 5.5 Q1: a³ - 27 = (a)³ - (3)³ = (a - 3)(a² + 3a + 9)",
                        "Ex 5.5 Q3: 24x³ + 3 = 3(8x³ + 1) = 3(2x + 1)(4x² - 2x + 1)",
                        "Ex 5.5 Q4: 1 - 27r³ = (1 - 3r)(1 + 3r + 9r²)",
                        "Ex 5.5 Q10: 27x³ - y³ = (3x - y)(9x² + 3xy + y²)"
                    )
                ),
                TopicInfo(
                    num = "5.6",
                    title = "Remainder Theorem",
                    summaryEn = "Statement: When a polynomial P(x) of degree n ≥ 1 is divided by a linear divisor (x - r), the remainder R obtained is equal to P(r). Proof: P(x) = (x - r)·Q(x) + R. Setting x = r gives P(r) = (r - r)·Q(r) + R = 0 + R ⇒ R = P(r). Allows calculating the algebraic remainder instantly without performing tedious long division.",
                    summaryUr = "مسئلہ باقی (Remainder Theorem): جب کسی کثیر رقمی P(x) کو یک درجی جملے (x - r) سے تقسیم کیا جائے تو حاصل ہونے والا باقی R برابر ہوتا ہے P(r) کے۔ ثبوت: P(x) = (x - r)·Q(x) + R۔ x = r درج کرنے سے R = P(r) ثابت ہو جاتا ہے۔ بغیر لمبی تقسیم کیے فوراً باقی معلوم ہو جاتا ہے۔",
                    keyPoints = listOf(
                        "Remainder Theorem: R = P(r) when dividing by (x - r)",
                        "Divisor (x + a) corresponds to r = -a ⇒ R = P(-a)",
                        "Divisor (ax - b) corresponds to r = b/a ⇒ R = P(b/a)",
                        "Condition for exact divisibility: Remainder R = P(r) = 0"
                    ),
                    statIcon = "🏷️",
                    statMetric = "R = P(r)",
                    statBadge = "No Division",
                    statColorHex = 0xFF059669,
                    examples = listOf(
                        "Ex 22: Divide P(x) = 3x³ - 7x² + 6x - 3 by x - 2: By Remainder Theorem: r = 2 ⇒ R = P(2) = 3(8) - 7(4) + 6(2) - 3 = 24 - 28 + 12 - 3 = 5 (matches actual division)",
                        "Ex 23: Remainder when 2x³ - 3x² + x - 2 is divided by x - 3: r = 3 ⇒ R = P(3) = 2(27) - 3(9) + 3 - 2 = 54 - 27 + 1 = 28",
                        "Ex 24: Find k if 3x³ + 9x² - (3k - 4)x + 2 is divisible by x - 1: R = P(1) = 0 ⇒ 3(1) + 9(1) - (3k-4) + 2 = 0 ⇒ 18 - 3k = 0 ⇒ k = 6"
                    ),
                    exercises = listOf(
                        "Q: Find remainder when x³ - 3x² + 4x - 5 is divided by x - 1: R = P(1) = 1 - 3 + 4 - 5 = -3",
                        "Q: Find remainder when 2x³ + x² - 5x - 2 is divided by x + 2: R = P(-2) = 2(-8) + 4 - 5(-2) - 2 = -16 + 4 + 10 - 2 = -4"
                    )
                ),
                TopicInfo(
                    num = "5.7",
                    title = "Factor Theorem",
                    summaryEn = "A real number r is a zero of a polynomial P(x) if P(r) = 0. Statement of Factor Theorem: A linear polynomial (x - r) is a factor of the polynomial P(x) if and only if r is a zero of P(x), i.e., P(r) = 0. Proof: By Remainder Theorem, P(x) = (x - r)·Q(x) + R where R = P(r). If (x - r) is a factor, R = 0 ⇒ P(r) = 0. Conversely, if P(r) = 0, R = 0 ⇒ P(x) = (x - r)·Q(x), meaning (x - r) is a factor.",
                    summaryUr = "مسئلہ تجزی (Factor Theorem): یک درجی جملہ (x - r) کثیر رقمی P(x) کا جزو ضربی ہوتا ہے اگر اور صرف اگر r کثیر رقمی کا صفر ہو یعنی P(r) = 0 ہو۔",
                    keyPoints = listOf(
                        "Zero of polynomial: any real value r where P(r) = 0",
                        "Factor Theorem: (x - r) is a factor of P(x) ⇔ P(r) = 0",
                        "Divisor (x + a) is a factor ⇔ P(-a) = 0",
                        "Divisor (ax - b) is a factor ⇔ P(b/a) = 0"
                    ),
                    statIcon = "🎯",
                    statMetric = "P(r) = 0 ⇔ Factor",
                    statBadge = "Factor Theorem",
                    statColorHex = 0xFF2563EB,
                    examples = listOf(
                        "Ex 25: For P(x) = x² - 4x + 3: P(1) = 1 - 4 + 3 = 0 ⇒ 1 is a zero and (x - 1) is a factor; P(3) = 9 - 12 + 3 = 0 ⇒ 3 is a zero and (x - 3) is a factor",
                        "Question: If y + 3 is a factor of 3y² + ky + 6, find k: P(-3) = 0 ⇒ 3(-3)² + k(-3) + 6 = 0 ⇒ 27 - 3k + 6 = 0 ⇒ 33 = 3k ⇒ k = 11"
                    ),
                    exercises = listOf(
                        "Q: Determine if x - 2 is a factor of x³ - 4x² + 5x - 2: P(2) = 8 - 16 + 10 - 2 = 0 ⇒ Yes, x - 2 is a factor",
                        "Q: Determine if x + 1 is a factor of x⁴ - 1: P(-1) = (-1)⁴ - 1 = 1 - 1 = 0 ⇒ Yes, x + 1 is a factor"
                    )
                ),
                TopicInfo(
                    num = "5.8",
                    title = "Cubic Polynomials",
                    summaryEn = "Factorization of cubic polynomials P(x) = ax³ + bx² + cx + d using the Factor Theorem: (1) Find the potential rational zeros among the factors of the constant term d; (2) Use Factor Theorem to test which value r gives P(r) = 0, identifying the first factor (x - r); (3) Divide P(x) by (x - r) using synthetic or polynomial division to find the quadratic quotient Q(x); (4) Factorize the quadratic quotient Q(x) into two linear factors to obtain the complete factorization.",
                    summaryUr = "تین درجی کثیر رقمی کی تجزی: (1) مستقل رقم کے اجزاء میں سے ممکنہ صفر تلاش کرنا؛ (2) مسئلہ تجزی سے پہلا جزو ضربی (x - r) معلوم کرنا؛ (3) تقسیم کے ذریعے دو درجی جملہ Q(x) حاصل کرنا؛ (4) دو درجی جملے کی تجزی کر کے تمام تینوں یک درجی اجزائے ضربی مکمل کرنا۔",
                    keyPoints = listOf(
                        "Test integer factors of constant term (±1, ±2, ±3, etc.)",
                        "If P(r) = 0, then (x - r) is the first factor",
                        "Divide P(x) / (x - r) to obtain quadratic quotient Q(x)",
                        "Factorize Q(x) by mid-term splitting to find all 3 linear factors"
                    ),
                    statIcon = "💡",
                    statMetric = "Cubic Factoring",
                    statBadge = "(x-r)·Q(x)",
                    statColorHex = 0xFF9333EA,
                    examples = listOf(
                        "Ex 26: Factorize P(x) = x³ - x² - 5x - 3: Test x = 3 ⇒ P(3) = 27 - 9 - 15 - 3 = 0 ⇒ (x - 3) is a factor. Dividing P(x) by (x - 3) gives Q(x) = x² + 2x + 1 = (x + 1)². Therefore x³ - x² - 5x - 3 = (x - 3)(x + 1)²"
                    ),
                    exercises = listOf(
                        "Q: Factorize x³ - 2x² - x + 2: P(1) = 1 - 2 - 1 + 2 = 0 ⇒ (x - 1) is a factor. Q(x) = x² - x - 2 = (x - 2)(x + 1). Factored form: (x - 1)(x - 2)(x + 1)",
                        "Q: Factorize x³ + x² - 4x - 4: x²(x + 1) - 4(x + 1) = (x + 1)(x² - 4) = (x + 1)(x - 2)(x + 2)"
                    )
                )
            ),
            mcqs = listOf(
                MCQItem(
                    id = "unit5-mcq-1",
                    question = "The factors of 5x + 10x² are:",
                    options = listOf("5(x + 2x²)", "5x(1 + 2x)", "x(5 + 10x)", "5x²(1 + 2)"),
                    correctIndex = 1,
                    explanation = "Taking out the highest common factor 5x from both terms: 5x(1 + 2x)."
                ),
                MCQItem(
                    id = "unit5-mcq-2",
                    question = "Factors of x² - 16 are:",
                    options = listOf("(x - 4)²", "(x + 4)²", "(x - 4)(x + 4)", "(x - 16)(x + 1)"),
                    correctIndex = 2,
                    explanation = "By difference of squares identity a² - b² = (a - b)(a + b): x² - 4² = (x - 4)(x + 4)."
                ),
                MCQItem(
                    id = "unit5-mcq-3",
                    question = "Factors of a⁴ + 4b⁴ are:",
                    options = listOf(
                        "(a² + 2b²)²",
                        "(a² + 2ab + 2b²)(a² - 2ab + 2b²)",
                        "(a² - 2b²)²",
                        "(a + 2b)⁴"
                    ),
                    correctIndex = 1,
                    explanation = "Adding and subtracting 4a²b²: (a² + 2b²)² - (2ab)² = (a² + 2ab + 2b²)(a² - 2ab + 2b²)."
                ),
                MCQItem(
                    id = "unit5-mcq-4",
                    question = "The factors of the quadratic trinomial x² - 7x + 12 are:",
                    options = listOf("(x - 2)(x - 6)", "(x - 3)(x - 4)", "(x + 3)(x + 4)", "(x - 1)(x - 12)"),
                    correctIndex = 1,
                    explanation = "Product is 12 and sum is -7: numbers are -3 and -4. Thus (x - 3)(x - 4)."
                ),
                MCQItem(
                    id = "unit5-mcq-5",
                    question = "Factors of 8a³ + 27b³ are:",
                    options = listOf(
                        "(2a + 3b)(4a² - 6ab + 9b²)",
                        "(2a + 3b)(4a² + 6ab + 9b²)",
                        "(2a - 3b)(4a² + 6ab + 9b²)",
                        "(2a + 3b)³"
                    ),
                    correctIndex = 0,
                    explanation = "By sum of cubes identity a³ + b³ = (a+b)(a² - ab + b²): (2a)³ + (3b)³ = (2a + 3b)(4a² - 6ab + 9b²)."
                ),
                MCQItem(
                    id = "unit5-mcq-6",
                    question = "When P(x) is divided by (x - r), the remainder according to Remainder Theorem is:",
                    options = listOf("P(-r)", "P(r)", "P(0)", "r"),
                    correctIndex = 1,
                    explanation = "By the Remainder Theorem, the remainder R equals the value of the polynomial evaluated at r: R = P(r)."
                ),
                MCQItem(
                    id = "unit5-mcq-7",
                    question = "(x - r) is a factor of the polynomial P(x) if and only if:",
                    options = listOf("P(r) = 1", "P(r) = 0", "P(-r) = 0", "P(r) = -1"),
                    correctIndex = 1,
                    explanation = "By the Factor Theorem, a linear polynomial (x - r) is a factor of P(x) if and only if P(r) = 0."
                ),
                MCQItem(
                    id = "unit5-mcq-8",
                    question = "If x - 1 is a factor of x³ - kx + 2, then the value of k is:",
                    options = listOf("1", "2", "3", "-3"),
                    correctIndex = 2,
                    explanation = "By Factor Theorem, P(1) = 0 ⇒ 1³ - k(1) + 2 = 0 ⇒ 1 - k + 2 = 0 ⇒ 3 - k = 0 ⇒ k = 3."
                )
            ),
            shortQuestions = listOf(
                QAItem(
                    qNum = "SQ 1",
                    question = "Define factorization of an algebraic expression with an example.",
                    answer = "Writing an algebraic expression as the product of two or more irreducible algebraic expressions (factors) is called factorization.\nExample: 5x + 10x² = 5x(1 + 2x), where 5x and (1 + 2x) are the factors of the polynomial."
                ),
                QAItem(
                    qNum = "SQ 2",
                    question = "Factorize: a² - ab - 3a + 3b.",
                    answer = "Group terms in pairs:\n= (a² - ab) - (3a - 3b)\n= a(a - b) - 3(a - b)\nTaking common binomial (a - b):\n= (a - b)(a - 3)."
                ),
                QAItem(
                    qNum = "SQ 3",
                    question = "Factorize: 25a²b² - 20abc + 4c² - 16d².",
                    answer = "First 3 terms form a perfect square: (5ab - 2c)²\n= (5ab - 2c)² - (4d)²\nApplying difference of squares a² - b² = (a+b)(a-b):\n= (5ab - 2c + 4d)(5ab - 2c - 4d)."
                ),
                QAItem(
                    qNum = "SQ 4",
                    question = "Factorize: 4x⁴ + 81.",
                    answer = "Add and subtract 2(2x²)(9) = 36x²:\n4x⁴ + 81 = (2x²)² + (9)² + 36x² - 36x²\n= (2x² + 9)² - (6x)²\n= (2x² + 6x + 9)(2x² - 6x + 9)."
                ),
                QAItem(
                    qNum = "SQ 5",
                    question = "Factorize: 2x² - 7x - 4.",
                    answer = "Product ac = 2(-4) = -8, Sum b = -7. Numbers are -8 and 1:\n= 2x² - 8x + x - 4\n= 2x(x - 4) + 1(x - 4)\n= (2x + 1)(x - 4)."
                ),
                QAItem(
                    qNum = "SQ 6",
                    question = "Without dividing, find the remainder when P(x) = 2x³ - 3x² + x - 2 is divided by (x - 3).",
                    answer = "By Remainder Theorem, r = 3:\nR = P(3) = 2(3)³ - 3(3)² + 3 - 2\n= 2(27) - 3(9) + 1\n= 54 - 27 + 1 = 28.\nRemainder = 28."
                ),
                QAItem(
                    qNum = "SQ 7",
                    question = "For what value of k is 3x³ + 9x² - (3k - 4)x + 2 exactly divisible by (x - 1)?",
                    answer = "Divisible means Remainder R = P(1) = 0:\n3(1)³ + 9(1)² - (3k - 4)(1) + 2 = 0\n3 + 9 - 3k + 4 + 2 = 0\n18 - 3k = 0 ⇒ 3k = 18 ⇒ k = 6."
                ),
                QAItem(
                    qNum = "SQ 8",
                    question = "State the Factor Theorem and explain its relation to the zeros of a polynomial.",
                    answer = "A linear polynomial (x - r) is a factor of polynomial P(x) if and only if P(r) = 0.\nA value r for which P(r) = 0 is called a zero of the polynomial. Thus, every real zero r of P(x) directly yields a linear factor (x - r)."
                )
            ),
            longQuestions = listOf(
                QAItem(
                    qNum = "LQ 1",
                    question = "State and prove the Remainder Theorem and Factor Theorem with complete mathematical derivations.",
                    answer = "1. Remainder Theorem: When a polynomial P(x) of degree n ≥ 1 is divided by (x - r), remainder R = P(r).\nProof: By division algorithm: Dividend = Divisor × Quotient + Remainder\nP(x) = (x - r)·Q(x) + R, where Q(x) is quotient and R is a constant remainder.\nSetting x = r:\nP(r) = (r - r)·Q(r) + R = 0·Q(r) + R = R.\nTherefore, R = P(r). (Proved)\n\n2. Factor Theorem: (x - r) is a factor of P(x) if and only if P(r) = 0.\nProof: (i) Forward: If (x - r) is a factor, division leaves remainder R = 0. By Remainder Theorem, R = P(r), hence P(r) = 0.\n(ii) Converse: If P(r) = 0, then by Remainder Theorem R = P(r) = 0. Substituting in P(x) = (x - r)·Q(x) + R gives P(x) = (x - r)·Q(x), proving (x - r) is a factor of P(x). (Proved)"
                ),
                QAItem(
                    qNum = "LQ 2",
                    question = "Use the Factor Theorem to factorize the cubic polynomial P(x) = x³ - x² - 5x - 3 completely.",
                    answer = "1. Find potential zeros from divisors of constant term -3: {±1, ±3}.\nTest x = 3:\nP(3) = 3³ - 3² - 5(3) - 3 = 27 - 9 - 15 - 3 = 0.\nSince P(3) = 0, by Factor Theorem (x - 3) is a factor.\n\n2. Divide P(x) by (x - 3):\n(x³ - x² - 5x - 3) ÷ (x - 3) = x² + 2x + 1.\n\n3. Factorize the quadratic quotient Q(x):\nx² + 2x + 1 = (x + 1)².\n\n4. Complete factorization:\nx³ - x² - 5x - 3 = (x - 3)(x + 1)²."
                )
            ),
            formulas = listOf(
                FormulaItem("Difference of Squares", "a² - b² = (a + b)(a - b)", "Identity"),
                FormulaItem("Quartic Completion", "a⁴ + 4b⁴ = (a² + 2ab + 2b²)(a² - 2ab + 2b²)", "Identity"),
                FormulaItem("Sum of Cubes", "a³ + b³ = (a + b)(a² - ab + b²)", "Identity"),
                FormulaItem("Difference of Cubes", "a³ - b³ = (a - b)(a² + ab + b²)", "Identity"),
                FormulaItem("Remainder Theorem", "R = P(r)  [when divisor is x - r]", "Theorem"),
                FormulaItem("Factor Theorem", "(x - r) is factor ⇔ P(r) = 0", "Theorem")
            ),
            numericals = listOf(
                NumericalItem(
                    num = "Fact Num 1",
                    statement = "Find an expression for the perimeter of a rectangle whose area is given by the trinomial x² + 13x - 90.",
                    given = "Area = x² + 13x - 90",
                    formula = "Area = Length × Width,  Perimeter = 2(Length + Width)",
                    solution = "Factorize area: x² + 13x - 90 = (x + 18)(x - 5). Length = x + 18, Width = x - 5. Perimeter = 2(x + 18) + 2(x - 5) = 2x + 36 + 2x - 10 = 4x + 26",
                    answer = "Perimeter = 4x + 26"
                ),
                NumericalItem(
                    num = "Fact Num 2",
                    statement = "Find an expression for the perimeter of a rectangle with area given by x² + 24x - 81.",
                    given = "Area = x² + 24x - 81",
                    formula = "Area = (x + p)(x - q),  Perimeter = 2(L + W)",
                    solution = "Numbers with product -81 and sum 24 are 27 and -3 ⇒ Area = (x + 27)(x - 3). Perimeter = 2(x + 27 + x - 3) = 2(2x + 24) = 4x + 48",
                    answer = "Perimeter = 4x + 48"
                ),
                NumericalItem(
                    num = "Fact Num 3",
                    statement = "Factorize the quartic expression (x+1)(x+2)(x+3)(x+4) + 1 completely.",
                    given = "Expression: (x+1)(x+2)(x+3)(x+4) + 1",
                    formula = "Group pairs with equal sum: (1+4 = 2+3 = 5)",
                    solution = "[(x+1)(x+4)][(x+2)(x+3)] + 1 = (x² + 5x + 4)(x² + 5x + 6) + 1. Put y = x² + 5x: (y+4)(y+6)+1 = y² + 10y + 25 = (y + 5)². Substitute back: (x² + 5x + 5)²",
                    answer = "(x² + 5x + 5)²"
                ),
                NumericalItem(
                    num = "Fact Num 4",
                    statement = "Factorize completely: (3x² + 11x + 2)(3x² + 11x + 3) - 12.",
                    given = "Expression: (3x² + 11x + 2)(3x² + 11x + 3) - 12",
                    formula = "Substitution y = 3x² + 11x",
                    solution = "(y+2)(y+3) - 12 = y² + 5y + 6 - 12 = y² + 5y - 6 = (y + 6)(y - 1). Substitute back: (3x² + 11x + 6)(3x² + 11x - 1). Factor first term: 3x² + 9x + 2x + 6 = (3x+2)(x+3). Complete factorization: (3x + 2)(x + 3)(3x² + 11x - 1)",
                    answer = "(3x + 2)(x + 3)(3x² + 11x - 1)"
                )
            )
        )
    )

    // ─── OFFICIAL TEXTBOOKS ───
    val textbooks = listOf(
        TextbookItem(
            id = "tb-phy9",
            title = "Physics for Class 9",
            subject = "Physics",
            grade = "Class 9",
            pages = 224,
            colorHex = 0xFF1D4ED8,
            chaptersList = listOf(
                "Unit 1: Physical Quantities & Measurement",
                "Unit 2: Kinematics",
                "Unit 3: Dynamics (Newton's Laws)",
                "Unit 4: Turning Effect of Forces",
                "Unit 5: Gravitation",
                "Unit 6: Work and Energy",
                "Unit 7: Properties of Matter",
                "Unit 8: Thermal Properties of Matter",
                "Unit 9: Transfer of Heat"
            ),
            sampleExcerpt = "The Khyber Pakhtunkhwa Textbook Board Peshawar proudly presents this curriculum-aligned textbook designed to cultivate scientific inquiry, quantitative analysis, and conceptual clarity according to modern Student Learning Outcomes (SLOs)."
        ),
        TextbookItem(
            id = "tb-chem9",
            title = "Chemistry for Class 9",
            subject = "Chemistry",
            grade = "Class 9",
            pages = 196,
            colorHex = 0xFF0D9488,
            chaptersList = listOf(
                "Unit 1: Fundamentals of Chemistry",
                "Unit 2: Structure of Atoms",
                "Unit 3: Periodic Table and Periodicity",
                "Unit 4: Structure of Molecules",
                "Unit 5: Physical States of Matter",
                "Unit 6: Solutions",
                "Unit 7: Electrochemistry",
                "Unit 8: Chemical Reactivity"
            ),
            sampleExcerpt = "Explore the microscopic architecture of atoms, chemical bonding principles, stoichiometry, and industrial applications relevant to Pakistan's natural resources and chemical manufacturing sector."
        ),
        TextbookItem(
            id = "tb-bio10",
            title = "Biology for Class 10",
            subject = "Biology",
            grade = "Class 10",
            pages = 210,
            colorHex = 0xFF16A34A,
            chaptersList = listOf(
                "Unit 10: Gaseous Exchange",
                "Unit 11: Homeostasis",
                "Unit 12: Coordination and Control",
                "Unit 13: Support and Movement",
                "Unit 14: Reproduction",
                "Unit 15: Inheritance",
                "Unit 16: Man and his Environment",
                "Unit 17: Biotechnology",
                "Unit 18: Pharmacology"
            ),
            sampleExcerpt = "Comprehensive exploration of human physiology, genetics, ecology, biotechnology, and health sciences prepared in alignment with Khyber Pakhtunkhwa secondary educational standards."
        ),
        TextbookItem(
            id = "tb-math10",
            title = "Mathematics for Class 10",
            subject = "Mathematics",
            grade = "Class 10",
            pages = 280,
            colorHex = 0xFFD97706,
            chaptersList = listOf(
                "Unit 1: Quadratic Equations",
                "Unit 2: Theory of Quadratic Equations",
                "Unit 3: Variations",
                "Unit 4: Partial Fractions",
                "Unit 5: Sets and Functions",
                "Unit 6: Basic Statistics",
                "Unit 7: Introduction to Trigonometry",
                "Unit 8: Projection of a Side of a Triangle",
                "Unit 9: Chords of a Circle",
                "Unit 10: Tangent to a Circle",
                "Unit 11: Chords and Arcs",
                "Unit 12: Angle in a Segment of a Circle",
                "Unit 13: Practical Geometry (Circles)"
            ),
            sampleExcerpt = "Master advanced algebraic manipulations, quadratic theory, trigonometric identities, and geometric theorem proofs to secure full marks in board examinations."
        )
    )

    // ─── EXAM ROADMAP ───
    val roadmapPhases = listOf(
        RoadmapPhase(
            phaseNumber = 1,
            title = "Phase 1: Syllabus Foundation & Concept Mastery",
            targetTimeframe = "Month 1 - Month 3 (September - November)",
            badge = "Foundation",
            description = "Complete first-pass study of all textbook chapters. Focus on understanding definitions, standard SLOs, and diagrams.",
            highYieldChapters = listOf("Physics Ch 1-4", "Chemistry Ch 1-3", "Biology Ch 1-4", "Math Ch 1-3"),
            strategyTip = "Never skip textbook solved examples and end-of-chapter summaries. They form 70% of board objective questions."
        ),
        RoadmapPhase(
            phaseNumber = 2,
            title = "Phase 2: Numerical & Derivation Drill",
            targetTimeframe = "Month 4 - Month 5 (December - January)",
            badge = "Core Practice",
            description = "Intensive practice of all textbook numericals, formula sheets, long-question derivations, and biology labeled diagrams.",
            highYieldChapters = listOf("Equations of Motion", "Newton's Second Law", "Gas Laws & Molarity", "Quadratic Formula"),
            strategyTip = "Write derivations with neat headings, statement, mathematical steps, and boxed final formulas for maximum paper presentation marks."
        ),
        RoadmapPhase(
            phaseNumber = 3,
            title = "Phase 3: 5-Year Past Papers & Model Papers",
            targetTimeframe = "Month 6 (February)",
            badge = "Revision & Tests",
            description = "Solve authentic KPK Board past papers (Peshawar, Mardan, Swat, Abbottabad, Kohat, Malakand, Bannu, DI Khan) under strict exam timer.",
            highYieldChapters = listOf("All Board Past MCQs", "Section B Short Questions Bank", "High-frequency Section C LQs"),
            strategyTip = "Time yourself: 20 minutes for MCQs, 1 hour 15 minutes for Section B, 1 hour for Section C."
        ),
        RoadmapPhase(
            phaseNumber = 4,
            title = "Phase 4: Final Sprint & High-Score Strategy",
            targetTimeframe = "Month 7 (March - Exam Week)",
            badge = "Exam Readiness",
            description = "Rapid revision notes, formula flashcards, MCQs testing, and mental wellness. Target 95%+ distinction score.",
            highYieldChapters = listOf("Quick Formula Cheat Sheets", "Key Definitions Booklets", "Exam Presentation Techniques"),
            strategyTip = "Use blue/black cut-markers (604/605) for main headings. Underline keywords to make your paper stand out to board examiners."
        )
    )

    // ─── STUDY PLAN TASKS ───
    val studyTasks = mutableStateListOf<StudyTask>(
        StudyTask("t1", "Review Physics Unit 2: 3 Equations of Motion Derivations", "Physics", 40, isCompleted = true, "High"),
        StudyTask("t2", "Practice 15 MCQs on Cell Division & Mitosis", "Biology", 25, isCompleted = true, "High"),
        StudyTask("t3", "Solve Chemistry Chapter 4 Textbook Short Questions", "Chemistry", 35, isCompleted = false, "Medium"),
        StudyTask("t4", "Memorize English Unit 3 Vocabulary & Active/Passive Voice", "English", 30, isCompleted = false, "Normal"),
        StudyTask("t5", "Solve 5 Quadratic Equations using Factorization & Formula", "Maths", 45, isCompleted = false, "High")
    )

    fun toggleTask(taskId: String) {
        val index = studyTasks.indexOfFirst { it.id == taskId }
        if (index != -1) {
            val t = studyTasks[index]
            studyTasks[index] = t.copy(isCompleted = !t.isCompleted)
        }
    }

    fun addTask(title: String, subject: String, duration: Int) {
        if (title.isBlank()) return
        studyTasks.add(
            StudyTask(
                id = "task-${System.currentTimeMillis()}",
                title = title.trim(),
                subject = subject,
                durationMin = duration,
                isCompleted = false,
                priority = "High"
            )
        )
    }
}
