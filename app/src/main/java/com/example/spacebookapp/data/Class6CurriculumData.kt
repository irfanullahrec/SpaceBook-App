package com.example.spacebookapp.data

import androidx.compose.ui.graphics.Color
import com.example.spacebookapp.ui.screens.Class4ConceptCard
import com.example.spacebookapp.ui.screens.NazeraQuizQuestion

enum class Class4Lang { EN, UR, PS }

data class Class4LessonItem(
    val emoji: String,
    val titleEn: String,
    val titleUr: String,
    val titlePs: String,
    val bodyEn: String,
    val bodyUr: String,
    val bodyPs: String
)

data class Class4Exercise(
    val questionEn: String,
    val questionUr: String,
    val questionPs: String,
    val options: List<String>,
    val correctIndex: Int,
    val explanationEn: String,
    val explanationUr: String
)

private val class6CardColors = listOf(
    Color(0xFF1D4ED8),
    Color(0xFF059669),
    Color(0xFF7C3AED),
    Color(0xFFD97706)
)

fun Class4StageData(
    stageNumber: Int,
    titleEn: String,
    titleUr: String,
    titlePs: String,
    subtitleEn: String,
    badgeEmoji: String,
    color: Color,
    lessons: List<Class4LessonItem>,
    exercises: List<Class4Exercise>
): com.example.spacebookapp.ui.screens.Class4StageData {
    val unitLabel = titleEn.substringBefore(":").trim().ifBlank { "Stage $stageNumber" }
    val pageRange = subtitleEn.substringBefore("•").trim().ifBlank { "Stage $stageNumber" }
    val summaryEn = lessons.joinToString(" • ") { "${it.titleEn}: ${it.bodyEn}" }
    val summaryUr = lessons.joinToString(" • ") { "${it.titleUr}: ${it.bodyUr}" }
    val summaryPs = lessons.joinToString(" • ") { "${it.titlePs}: ${it.bodyPs}" }

    val lessonCards = lessons.mapIndexed { idx, l ->
        Class4ConceptCard(
            heading = "${l.emoji} ${l.titleEn}",
            subHeading = l.titleUr,
            detailEn = l.bodyEn,
            detailUr = l.bodyUr,
            detailPs = l.bodyPs,
            badgeColor = class6CardColors[idx % class6CardColors.size]
        )
    }.toMutableList()

    if (lessonCards.size < 3) {
        exercises.forEach { ex ->
            if (lessonCards.size < 4) {
                val ans = ex.options.getOrElse(ex.correctIndex) { ex.options.firstOrNull().orEmpty() }
                lessonCards.add(
                    Class4ConceptCard(
                        heading = "$badgeEmoji ${ex.questionEn}",
                        subHeading = ans,
                        detailEn = ex.explanationEn,
                        detailUr = ex.explanationUr,
                        detailPs = ex.explanationUr,
                        badgeColor = class6CardColors[lessonCards.size % class6CardColors.size]
                    )
                )
            }
        }
    }

    val quizzes = exercises.map { ex ->
        NazeraQuizQuestion(
            ex.questionEn,
            ex.questionUr,
            ex.questionPs,
            badgeEmoji,
            ex.options,
            ex.correctIndex
        )
    }

    return com.example.spacebookapp.ui.screens.Class4StageData(
        id = stageNumber,
        unitLabel = unitLabel,
        pageRange = pageRange,
        titleEn = titleEn,
        titleUr = titleUr,
        titlePs = titlePs,
        summaryEn = summaryEn,
        summaryUr = summaryUr,
        summaryPs = summaryPs,
        gamePromptEn = "Match each concept of $unitLabel with its correct explanation!",
        gamePromptUr = "$unitLabel کے ہر تصور کو اس کی درست تفصیل سے ملائیں!",
        gamePromptPs = "د $unitLabel هر مفهوم له سم تفصیل سره وصل کړئ!",
        cards = lessonCards,
        quizzes = quizzes
    )
}

enum class Class6BookType(
    val id: String,
    val titleEn: String,
    val titleUr: String,
    val titlePs: String,
    val subtitleEn: String,
    val accentColor: Color,
    val secondaryColor: Color,
    val defaultLang: Class4Lang
) {
    ENGLISH(
        id = "class6_english",
        titleEn = "English Class 6",
        titleUr = "انگریزی ششم",
        titlePs = "انګلیسي شپږم",
        subtitleEn = "All 9 Units • Reading, Grammar & Exercises",
        accentColor = Color(0xFF00E5FF),
        secondaryColor = Color(0xFF2979FF),
        defaultLang = Class4Lang.EN
    ),
    MATHS(
        id = "class6_maths",
        titleEn = "Mathematics Class 6",
        titleUr = "ریاضی ششم",
        titlePs = "ریاضي شپږم",
        subtitleEn = "All 11 Units • Algebra, Geometry & Exercises",
        accentColor = Color(0xFFFF6D00),
        secondaryColor = Color(0xFFFFAB00),
        defaultLang = Class4Lang.EN
    ),
    SCIENCE(
        id = "class6_science",
        titleEn = "General Science Class 6",
        titleUr = "جنرل سائنس ششم",
        titlePs = "جنرل ساینس شپږم",
        subtitleEn = "All 12 Units • Cells, Matter, Energy & Solar System",
        accentColor = Color(0xFF00E676),
        secondaryColor = Color(0xFF00BFA5),
        defaultLang = Class4Lang.EN
    ),
    COMPUTER(
        id = "class6_computer",
        titleEn = "Computer Science Class 6",
        titleUr = "کمپیوٹر سائنس ششم",
        titlePs = "کمپیوټر ساینس شپږم",
        subtitleEn = "All 6 Units • ICT, Coding, Algorithms & Digital Skills",
        accentColor = Color(0xFF536DFE),
        secondaryColor = Color(0xFF304FFE),
        defaultLang = Class4Lang.EN
    ),
    GEOGRAPHY(
        id = "class6_geography",
        titleEn = "Geography Class 6",
        titleUr = "جغرافیہ ششم",
        titlePs = "جغرافیه شپږم",
        subtitleEn = "All 6 Units • Earth Structure, Rocks, Climate & Forests",
        accentColor = Color(0xFF26A69A),
        secondaryColor = Color(0xFF00897B),
        defaultLang = Class4Lang.EN
    ),
    HISTORY(
        id = "class6_history",
        titleEn = "History Class 6",
        titleUr = "تاریخ ششم",
        titlePs = "تاریخ شپږم",
        subtitleEn = "All 5 Units • Ancient Civilizations & Rise of Islam",
        accentColor = Color(0xFFD4AC0D),
        secondaryColor = Color(0xFFB7950B),
        defaultLang = Class4Lang.EN
    ),
    ISLAMIAT(
        id = "class6_islamiat",
        titleEn = "Islamiat Class 6",
        titleUr = "اسلامیات ششم",
        titlePs = "اسلامیات شپږم",
        subtitleEn = "All 29 Lessons (7 Babs) • Quran, Seerah & Akhlaq",
        accentColor = Color(0xFF1DE9B6),
        secondaryColor = Color(0xFF00B0FF),
        defaultLang = Class4Lang.UR
    ),
    MQ(
        id = "class6_mq",
        titleEn = "Mutala-e-Quran Class 6",
        titleUr = "مطالعہ قرآن حکیم ششم",
        titlePs = "د قرآن کریم مطالعه شپږم",
        subtitleEn = "All 20 Lessons • Surah Al-A'raf, Ash-Shu'ara, As-Saffat & Juz 30",
        accentColor = Color(0xFF00C853),
        secondaryColor = Color(0xFF009624),
        defaultLang = Class4Lang.UR
    ),
    URDU(
        id = "class6_urdu",
        titleEn = "Urdu Class 6",
        titleUr = "اردو جماعت ششم",
        titlePs = "اردو شپږم ټولګی",
        subtitleEn = "All 21 Lessons • Hamd, Naat, Iqbal, Saadi & Grammar",
        accentColor = Color(0xFFFF4081),
        secondaryColor = Color(0xFFF50057),
        defaultLang = Class4Lang.UR
    ),
    PASHTO(
        id = "class6_pashto",
        titleEn = "Pashto Class 6",
        titleUr = "پشتو جماعت ششم",
        titlePs = "پښتو شپږم ټولګی",
        subtitleEn = "All 31 Lessons • Poems, Heroes, History & Exercises",
        accentColor = Color(0xFFAA00FF),
        secondaryColor = Color(0xFF6200EA),
        defaultLang = Class4Lang.PS
    ),
    ARABIC(
        id = "class6_arabic",
        titleEn = "Arabic Class 6",
        titleUr = "عربی جماعت ششم",
        titlePs = "عربي شپږم ټولګی",
        subtitleEn = "All 13 Lessons • Dialogues, Vocabulary & Grammar",
        accentColor = Color(0xFF00B8D4),
        secondaryColor = Color(0xFF0091EA),
        defaultLang = Class4Lang.UR
    ),
    DRAWING(
        id = "class6_drawing",
        titleEn = "Drawing Class 6",
        titleUr = "ڈرائنگ ششم",
        titlePs = "انځورګري شپږم",
        subtitleEn = "All 6 Chapters • Instruments, Shading, Crafts & Exhibition",
        accentColor = Color(0xFFFFAB00),
        secondaryColor = Color(0xFFFF6D00),
        defaultLang = Class4Lang.EN
    ),
    HPE(
        id = "class6_hpe",
        titleEn = "Health & Physical Education 6",
        titleUr = "صحت و جسمانی تعلیم ششم",
        titlePs = "روغتیا او فزیکي زده کړه شپږم",
        subtitleEn = "All 9 Chapters • Health, Fitness, First Aid & Sports",
        accentColor = Color(0xFFFF5252),
        secondaryColor = Color(0xFFD50000),
        defaultLang = Class4Lang.UR
    )
}

object Class6CurriculumRepository {

    fun getStages(book: Class6BookType): List<com.example.spacebookapp.ui.screens.Class4StageData> = when (book) {
        Class6BookType.ENGLISH -> englishStages
        Class6BookType.MATHS -> mathsStages
        Class6BookType.SCIENCE -> scienceStages
        Class6BookType.COMPUTER -> computerStages
        Class6BookType.GEOGRAPHY -> Class6SocialIslamiatData.geographyStages
        Class6BookType.HISTORY -> Class6SocialIslamiatData.historyStages
        Class6BookType.ISLAMIAT -> Class6SocialIslamiatData.islamiatStages
        Class6BookType.MQ -> Class6SocialIslamiatData.mqStages
        Class6BookType.URDU -> Class6LanguagesData.urduStages
        Class6BookType.PASHTO -> Class6LanguagesData.pashtoStages
        Class6BookType.ARABIC -> Class6LanguagesData.arabicStages
        Class6BookType.DRAWING -> Class6SocialIslamiatData.drawingStages
        Class6BookType.HPE -> Class6SocialIslamiatData.hpeStages
    }

    // =========================================================================
    // 1. ENGLISH CLASS 6 (All 9 Units: 1A, 1B, 2, 3, 4, 5, 6, 7, 8 — Pages 1–150)
    // =========================================================================
    val englishStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Unit 1A: Hazrat Muhammad ﷺ",
            titleUr = "یونٹ 1A: حضرت محمد ﷺ (خطبہ حجۃ الوداع)",
            titlePs = "یونټ 1A: حضرت محمد ﷺ (د حجة الوداع خطبه)",
            subtitleEn = "Pages 1–7 • The Last Sermon, Equality, Articles & Synonyms",
            badgeEmoji = "🕌",
            color = Color(0xFF00E5FF),
            lessons = listOf(
                Class4LessonItem("🕌", "The Last Sermon", "خطبہ حجۃ الوداع", "د حجة الوداع خطبه", "Rasoolullah ﷺ delivered the Last Sermon on the 9th of Dhul-Hijjah, 10 AH in the Uranah Valley of Mount Arafat.", "رسول اللہ ﷺ نے ۱۰ ہجری میں میدانِ عرفات میں خطبہ حجۃ الوداع ارشاد فرمایا۔", "رسول الله ﷺ په ۱۰ هجري کال کې د عرفات په میدان کې د حجة الوداع خطبه وویله."),
                Class4LessonItem("⚖️", "Universal Human Equality", "انسانی مساوات", "انساني مساوات", "An Arab has no superiority over a non-Arab, nor a white over a black, except by piety and good action (Taqwa).", "کسی عربی کو عجمی پر اور گورے کو کالے پر کوئی فوقیت نہیں سوائے تقویٰ کے۔", "هیڅ عربي پر عجمي او سپین پر تور غوره والی نه لري مګر د تقویٰ له مخې."),
                Class4LessonItem("📖", "Grammar: Definite & Indefinite Articles", "گرامر: آرٹیکلز (a, an, the)", "ګرامر: آرټیکلز (a, an, the)", "Use 'a' before consonant sounds, 'an' before vowel sounds, and 'the' for specific or unique nouns.", "'a' صحیح آوازوں سے پہلے، 'an' واول آوازوں سے پہلے اور 'the' خاص اسم سے پہلے آتا ہے۔", "'a' د غږیزو تورو مخکې، 'an' د واول غږونو مخکې او 'the' د ځانګړي نوم مخکې راځي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Where did Hazrat Muhammad ﷺ deliver his Last Sermon?",
                    questionUr = "حضرت محمد ﷺ نے اپنا آخری خطبہ کہاں ارشاد فرمایا؟",
                    questionPs = "حضرت محمد ﷺ خپله وروستۍ خطبه چیرته وویله؟",
                    options = listOf("Uranah Valley, Mount Arafat", "Mount Uhud", "Cave Hira", "Taif"),
                    correctIndex = 0,
                    explanationEn = "The Last Sermon was delivered in the Uranah Valley of Mount Arafat.",
                    explanationUr = "خطبہ حجۃ الوداع جبلِ عرفات کی وادی عرنہ میں دیا گیا۔"
                ),
                Class4Exercise(
                    questionEn = "According to the Last Sermon, superiority among humans is based only on:",
                    questionUr = "خطبہ حجۃ الوداع کے مطابق انسانوں میں فضیلت کا معیار کیا ہے؟",
                    questionPs = "د حجة الوداع خطبې له مخې د انسانانو ترمنځ غوره والی یوازې په څه کې دی؟",
                    options = listOf("Piety and good action (Taqwa)", "Wealth and gold", "Tribe and race", "Colour"),
                    correctIndex = 0,
                    explanationEn = "Superiority is only by piety and good action (Taqwa).",
                    explanationUr = "فضیلت کا معیار صرف تقویٰ اور نیک عمل ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Choose the correct article: 'He is ___ honest man.'",
                    questionUr = "درست آرٹیکل منتخب کریں: 'He is ___ honest man.'",
                    questionPs = "سمه کلیمه وټاکئ: 'He is ___ honest man.'",
                    options = listOf("an", "a", "none", "these"),
                    correctIndex = 0,
                    explanationEn = "'Honest' begins with a silent 'h' and a vowel sound, so we use 'an'.",
                    explanationUr = "'honest' میں 'h' خاموش ہے اور آواز واول سے شروع ہوتی ہے اس لیے 'an' آئے گا۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Unit 1B: Dedicated to Humanity",
            titleUr = "یونٹ 1B: انسانیت کی خدمت کے لیے وقف",
            titlePs = "یونټ 1B: د انسانیت خدمت ته وقف شوي",
            subtitleEn = "Pages 8–30 • Abdul Sattar Edhi, Mother Teresa, Helen Keller & Nouns/Pronouns",
            badgeEmoji = "🚑",
            color = Color(0xFF2979FF),
            lessons = listOf(
                Class4LessonItem("🚑", "Abdul Sattar Edhi", "عبدالستار ایدھی", "عبدالستار ایدھي", "Abdul Sattar Edhi founded the Edhi Foundation and the world's largest volunteer ambulance network to serve humanity.", "عبدالستار ایدھی نے انسانیت کی خدمت کے لیے ایدھی فاؤنڈیشن اور دنیا کی سب سے بڑی ایمبولینس سروس قائم کی۔", "عبدالستار ایدھي د انسانیت د خدمت لپاره ایدھي بنسټ او د نړۍ ترټولو لوی امبولانس خدمت جوړ کړ."),
                Class4LessonItem("🕊️", "Mother Teresa & Helen Keller", "مدر ٹریسا اور ہیلن کیلر", "مدر ټریسا او هیلن کیلر", "Mother Teresa served the poor and sick, while Helen Keller overcame blindness and deafness to inspire the world.", "مدر ٹریسا نے غریبوں کی خدمت کی اور ہیلن کیلر نے نابینا و بہرہ ہونے کے باوجود دنیا کو متاثر کیا۔", "مدر ټریسا د بې وزلو خدمت وکړ او هیلن کیلر د ړوندوالي او کوڼوالي سره سره نړۍ ته الهام ورکړ."),
                Class4LessonItem("🔤", "Grammar: Types of Nouns & Pronouns", "گرامر: اسم اور ضمیر کی اقسام", "ګرامر: د نوم او ضمیر ډولونه", "Regular/Irregular plural nouns (child → children), Reflexive pronouns (myself, himself), and Relative pronouns (who, which).", "جمع بنانے کے اصول اور ضمیرِ معکوس (myself, himself) کا استعمال۔", "د جمع نومونو قواعد او انعکاسي ضمیرونه (myself, himself).")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Who founded the world's largest volunteer ambulance service in Pakistan?",
                    questionUr = "پاکستان میں دنیا کی سب سے بڑی رضاکارانہ ایمبولینس سروس کس نے قائم کی؟",
                    questionPs = "په پاکستان کې د نړۍ ترټولو لوی رضاکار امبولانس خدمت چا جوړ کړ؟",
                    options = listOf("Abdul Sattar Edhi", "Galileo Galilei", "Helen Keller", "Ove"),
                    correctIndex = 0,
                    explanationEn = "Abdul Sattar Edhi established the Edhi Ambulance network.",
                    explanationUr = "عبدالستار ایدھی نے ایدھی ایمبولینس سروس قائم کی۔"
                ),
                Class4Exercise(
                    questionEn = "What is the irregular plural of 'tooth'?",
                    questionUr = "'tooth' کی جمع کیا ہے؟",
                    questionPs = "د 'tooth' جمع څه ده؟",
                    options = listOf("teeth", "tooths", "toothes", "teethes"),
                    correctIndex = 0,
                    explanationEn = "The irregular plural of tooth is teeth.",
                    explanationUr = "tooth کی بے قاعدہ جمع teeth ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Choose the reflexive pronoun: 'She completed the project ___.'",
                    questionUr = "ضمیر معکوس چنیں: 'She completed the project ___.'",
                    questionPs = "انعکاسي ضمیر وټاکئ: 'She completed the project ___.'",
                    options = listOf("herself", "himself", "myself", "themselves"),
                    correctIndex = 0,
                    explanationEn = "For 'She', the reflexive pronoun is 'herself'.",
                    explanationUr = "'She' کے لیے ضمیر معکوس 'herself' ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Unit 2: Stories of All Time",
            titleUr = "یونٹ 2: سدا بہار کہانیاں",
            titlePs = "یونټ 2: د هر وخت کیسې",
            subtitleEn = "Pages 31–53 • Fables, Town Mouse & Country Mouse, Island Adventure & Sentence Types",
            badgeEmoji = "🐭",
            color = Color(0xFF00B0FF),
            lessons = listOf(
                Class4LessonItem("🐭", "The Town Mouse and the Country Mouse", "شہری چوہا اور دیہاتی چوہا", "ښاري موږک او کلیوال موږک", "The Country Mouse prefers a simple life in peace and safety over rich food surrounded by danger in the town.", "دیہاتی چوہا خطرے میں بھرے شہری کھانوں پر اپنی سادہ اور پُرامن زندگی کو ترجیح دیتا ہے۔", "کلیوال موږک له خطرونو ډک ښاري خواړو په پرتله خپل ساده او سوله ییز ژوند غوره ګڼي."),
                Class4LessonItem("🏝️", "An Island Adventure", "جزیرے کی مہم جوئی", "د ټاپو سفر", "Teamwork, courage, and observation help young explorers survive and solve problems on an island.", "مشترکہ محنت، ہمت اور مشاہدہ جزیرے پر مشکلات حل کرنے میں مدد دیتے ہیں۔", "ګډ کار، زړورتیا او مشاهده په ټاپو کې د ستونزو په حل کې مرسته کوي."),
                Class4LessonItem("📝", "Prefixes, Suffixes & Sentence Types", "سابقے، لاحقے اور جملوں کی اقسام", "سابقې، لاحقې او د جملو ډولونه", "Declarative (statement), Interrogative (question), Imperative (command), and Exclamatory (strong feeling) sentences.", "بیانیہ، سوالیہ، حکمیہ اور استعجابی جملے۔", "بیانیه، پوښتنیزه، امریه او تعجبي جملې.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Why did the Country Mouse return to his country home?",
                    questionUr = "دیہاتی چوہا اپنے گاؤں کے گھر واپس کیوں چلا گیا؟",
                    questionPs = "کلیوال موږک ولې خپل کلي ته ستون شو؟",
                    options = listOf("He preferred peace and safety over danger", "There was no food in town", "He lost his way", "It was raining"),
                    correctIndex = 0,
                    explanationEn = "He realized a simple meal in safety is better than a feast in fear.",
                    explanationUr = "اس نے جان لیا کہ خوف میں عمدہ کھانے سے امن و سکون کی سادہ غذا بہتر ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which prefix makes the opposite of 'happy'?",
                    questionUr = "'happy' کا متضاد بنانے کے لیے کون سا سابقہ لگتا ہے؟",
                    questionPs = "د 'happy' ضد جوړولو لپاره کومه سابقه کارول کیږي؟",
                    options = listOf("un- (unhappy)", "dis- (dishappy)", "im- (imhappy)", "re- (rehappy)"),
                    correctIndex = 0,
                    explanationEn = "Adding the prefix 'un-' creates 'unhappy'.",
                    explanationUr = "'un-' لگانے سے 'unhappy' بنتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "What type of sentence is: 'What a beautiful island this is!'?",
                    questionUr = "'What a beautiful island this is!' کس قسم کا جملہ ہے؟",
                    questionPs = "'What a beautiful island this is!' کوم ډول جمله ده؟",
                    options = listOf("Exclamatory sentence", "Interrogative sentence", "Imperative sentence", "Negative sentence"),
                    correctIndex = 0,
                    explanationEn = "It expresses strong emotion and ends with an exclamation mark (!).",
                    explanationUr = "یہ حیرت و خوشی کا اظہار کرتا ہے، اس لیے استعجابی جملہ ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Unit 3: Health and Safety",
            titleUr = "یونٹ 3: صحت اور حفاظت",
            titlePs = "یونټ 3: روغتیا او خوندیتوب",
            subtitleEn = "Pages 54–71 • First Aid, CPR, Glittering Teeth (Poem), Modal Verbs & Adverbs",
            badgeEmoji = "🩺",
            color = Color(0xFF00E676),
            lessons = listOf(
                Class4LessonItem("🩹", "First Aid & CPR", "ابتدائی طبی امداد اور سی پی آر", "لومړنۍ طبي مرسته او سي پي آر", "First aid is immediate care given to an injured person before a doctor arrives. CPR helps restore breathing and heartbeat.", "حادثے کے فوراً بعد ڈاکٹر کے آنے سے پہلے دی جانے والی مدد ابتدائی طبی امداد کہلاتی ہے۔", "تر ډاکټر پورې د ټپي شوي کس سملاسي مرستې ته لومړنۍ طبي مرسته ویل کیږي."),
                Class4LessonItem("🦷", "Poem: Glittering Teeth", "نظم: چمکتے دانت", "نظم: ځلیدونکي غاښونه", "Brushing teeth twice a day and avoiding excess sweets keeps our teeth strong, clean, and glittering.", "دن میں دو بار برش کرنے اور زیادہ مٹھائی سے بچنے سے دانت چمکدار اور مضبوط رہتے ہیں۔", "په ورځ کې دوه ځله برس کول غاښونه پاک او پیاوړي ساتي."),
                Class4LessonItem("⚙️", "Modal Verbs & Adverbs", "ماڈل وربز اور متعلق فعل", "ماډل فعلونه او قیدونه", "Modal verbs (can, could, should, must, may) express ability, advice, or obligation. Adverbs describe how, when, or where an action happens.", "ماڈل وربز صلاحیت یا فرض ظاہر کرتے ہیں جبکہ ایڈورب فعل کی کیفیت بتاتا ہے۔", "ماډل فعلونه وړتیا یا مشوره ښیي او قید د فعل څرنګوالی بیانوي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "What is the immediate medical help given to an injured person called?",
                    questionUr = "زخمی شخص کو فوری طور پر دی جانے والی طبی مدد کیا کہلاتی ہے؟",
                    questionPs = "ټپي شوي کس ته سملاسي طبي مرسته څه بلل کیږي؟",
                    options = listOf("First Aid", "Surgery", "Vaccination", "X-Ray"),
                    correctIndex = 0,
                    explanationEn = "Immediate emergency care is called First Aid.",
                    explanationUr = "فوری ہنگامی طبی مدد کو فرسٹ ایڈ (ابتدائی طبی امداد) کہتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Choose the correct modal verb: 'You ___ brush your teeth twice a day.'",
                    questionUr = "درست لفظ چنیں: 'You ___ brush your teeth twice a day.'",
                    questionPs = "سم ماډل فعل وټاکئ: 'You ___ brush your teeth twice a day.'",
                    options = listOf("should", "might not", "could not", "never"),
                    correctIndex = 0,
                    explanationEn = "'Should' is used to give good health advice.",
                    explanationUr = "اچھی نصیحت کے لیے 'should' استعمال ہوتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Identify the adverb of manner in: 'The nurse bandaged the wound carefully.'",
                    questionUr = "اس جملے میں ایڈورب کون سا ہے: 'The nurse bandaged the wound carefully.'",
                    questionPs = "په دې جمله کې قید (Adverb) کوم دی: 'The nurse bandaged the wound carefully.'",
                    options = listOf("carefully", "nurse", "wound", "bandaged"),
                    correctIndex = 0,
                    explanationEn = "'Carefully' tells how the action was done.",
                    explanationUr = "'carefully' کام کرنے کا انداز بتاتا ہے اس لیے ایڈورب ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Unit 4: Sports and Games",
            titleUr = "یونٹ 4: کھیل اور مقابلے",
            titlePs = "یونټ 4: لوبې او سیالۍ",
            subtitleEn = "Pages 72–91 • Olympics, Paralympics, Skiing in Malam Jabba, Shandur Polo & Homophones",
            badgeEmoji = "🏅",
            color = Color(0xFFFFAB00),
            lessons = listOf(
                Class4LessonItem("🏅", "Olympics & Paralympics", "اولمپکس اور پیرا اولمپکس", "اولمپکس او پارا اولمپکس", "The Olympic Games bring athletes from around the world every four years. The Paralympics celebrate athletes with physical disabilities.", "اولمپک کھیل ہر چار سال بعد منعقد ہوتے ہیں اور پیرا اولمپکس معذور کھلاڑیوں کا عالمی مقابلہ ہے۔", "د اولمپیک لوبې هر څلور کاله وروسته ترسره کیږي او پارا اولمپکس د معلولو لوبغاړو سیالۍ دي."),
                Class4LessonItem("🎿", "Skiing in Pakistan & Shandur Polo", "پاکستان میں سکیئنگ اور شندور پولو", "په پاکستان کې سکیینګ او د شندور پولو", "Malam Jabba (Swat) and Naltar are famous for skiing, while Shandur Pass (Chitral-Gilgit) hosts the world's highest polo ground.", "مالم جبہ سکیئنگ کے لیے مشہور ہے جبکہ شندور دنیا کا بلند ترین پولو گراؤنڈ ہے۔", "مالم جبه د سکیینګ لپاره مشهوره ده او شندور د نړۍ ترټولو لوړ د پولو میدان دی."),
                Class4LessonItem("🔤", "Homophones & Prepositions", "ہم آواز الفاظ اور حروفِ جار", "هم غږي توري او د اړیکو توري", "Homophones sound the same but have different spellings and meanings (e.g., won/one, sea/see). Prepositions show position, time, or direction.", "ہم آواز الفاظ (won/one) کی آواز ایک مگر معنی مختلف ہوتے ہیں۔", "هم غږي توري (won/one) یو شان غږ لري خو مانا یې بېله وي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Where is the world's highest polo ground located in Pakistan?",
                    questionUr = "پاکستان میں دنیا کا بلند ترین پولو گراؤنڈ کہاں واقع ہے؟",
                    questionPs = "په پاکستان کې د نړۍ ترټولو لوړ د پولو میدان چیرته دی؟",
                    options = listOf("Shandur Pass", "Lahore", "Karachi", "Multan"),
                    correctIndex = 0,
                    explanationEn = "Shandur Pass hosts the highest polo festival in the world.",
                    explanationUr = "درہ شندور میں دنیا کا بلند ترین پولو گراؤنڈ واقع ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Choose the correct homophone: 'Our team ___ the polo match.'",
                    questionUr = "درست ہم آواز لفظ چنیں: 'Our team ___ the polo match.'",
                    questionPs = "سم توری وټاکئ: 'Our team ___ the polo match.'",
                    options = listOf("won", "one", "sun", "son"),
                    correctIndex = 0,
                    explanationEn = "'Won' is the past tense of win.",
                    explanationUr = "'won' جیتنے (win) کی ماضی کی شکل ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which famous ski resort is located in Swat, Khyber Pakhtunkhwa?",
                    questionUr = "خیبر پختونخوا کے ضلع سوات میں کون سا مشہور سکی ریزارٹ واقع ہے؟",
                    questionPs = "په سوات کې کوم مشهور د سکیینګ ځای شتون لري؟",
                    options = listOf("Malam Jabba", "Thar Desert", "Bolan Pass", "Khewra"),
                    correctIndex = 0,
                    explanationEn = "Malam Jabba is the premier ski resort in Swat, KP.",
                    explanationUr = "مالم جبہ سوات میں سکیئنگ کا مشہور مقام ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 6,
            titleEn = "Unit 5: Pride of Pakistan",
            titleUr = "یونٹ 5: فخرِ پاکستان",
            titlePs = "یونټ 5: د پاکستان ویاړ",
            subtitleEn = "Pages 92–103 • Mohtarma Fatima Jinnah, Amazing Pakistan, Silent Letters & Conjunctions",
            badgeEmoji = "🇵🇰",
            color = Color(0xFF00C853),
            lessons = listOf(
                Class4LessonItem("🇵🇰", "Mohtarma Fatima Jinnah (Madar-e-Millat)", "محترمہ فاطمہ جناح (مادرِ ملت)", "محترمه فاطمه جناح (مادر ملت)", "Mohtarma Fatima Jinnah was a dental surgeon who stood side by side with her brother Quaid-e-Azam in the Pakistan Movement.", "محترمہ فاطمہ جناح نے تحریکِ پاکستان میں اپنے بھائی قائدِ اعظم کا بھرپور ساتھ دیا اور مادرِ ملت کہلائیں۔", "محترمې فاطمه جناح د پاکستان په غورځنګ کې د خپل ورور قائداعظم بشپړ ملاتړ وکړ."),
                Class4LessonItem("🏔️", "Amazing Facts About Pakistan", "پاکستان کے حیرت انگیز حقائق", "د پاکستان په زړه پورې حقایق", "Pakistan is home to K2 (second highest peak), Khewra (second largest salt mine), and the Karakoram Highway.", "پاکستان میں کے-ٹو، کھیوڑہ نمک کی کان اور شاہراہِ قراقرم واقع ہیں۔", "په پاکستان کې د K2 څوکه، د کهیوړه مالګې کان او د قراقرم لویه لاره موقعیت لري."),
                Class4LessonItem("🔇", "Silent Letters & Conjunctions", "خاموش حروف اور حروفِ عطف", "خاموش توري او تړونکي توري", "Words like 'know' (silent k), 'write' (silent w), 'honest' (silent h). Coordinating conjunctions (FANBOYS: for, and, nor, but, or, yet, so).", "'know' میں k اور 'write' میں w خاموش (Silent) ہوتے ہیں۔", "په 'know' کې k او په 'write' کې w خاموش توري دي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "What title was given to Mohtarma Fatima Jinnah by the nation?",
                    questionUr = "قوم نے محترمہ فاطمہ جناح کو کون سا لقب دیا؟",
                    questionPs = "قوم محترمې فاطمه جناح ته کوم لقب ورکړ؟",
                    options = listOf("Madar-e-Millat (Mother of the Nation)", "Poet of the East", "Sword of Allah", "Lion of the Desert"),
                    correctIndex = 0,
                    explanationEn = "She is revered as Madar-e-Millat (Mother of the Nation).",
                    explanationUr = "آپ کو مادرِ ملت (قوم کی ماں) کا لقب دیا گیا۔"
                ),
                Class4Exercise(
                    questionEn = "Which letter is silent in the word 'Knowledge'?",
                    questionUr = "لفظ 'Knowledge' میں کون سا حرف خاموش (Silent) ہے؟",
                    questionPs = "په 'Knowledge' کلیمه کې کوم توری خاموش دی؟",
                    options = listOf("K", "N", "L", "G"),
                    correctIndex = 0,
                    explanationEn = "The initial 'K' before 'n' is silent in 'Knowledge'.",
                    explanationUr = "'Knowledge' کے شروع میں 'K' خاموش ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Choose the correct conjunction: 'He worked hard, ___ he succeeded.'",
                    questionUr = "درست حرفِ عطف چنیں: 'He worked hard, ___ he succeeded.'",
                    questionPs = "سم تړونکی توری وټاکئ: 'He worked hard, ___ he succeeded.'",
                    options = listOf("so", "or", "but", "nor"),
                    correctIndex = 0,
                    explanationEn = "'So' shows the result of working hard.",
                    explanationUr = "نتیجہ ظاہر کرنے کے لیے 'so' آتا ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 7,
            titleEn = "Unit 6: Professions & Dignity of Labour",
            titleUr = "یونٹ 6: پیشے اور محنت کی عظمت",
            titlePs = "یونټ 6: مسلکونه او د محنت عظمت",
            subtitleEn = "Pages 104–125 • Dignity of Labour, Poem 'The Work', Phrasal Verbs & Perfect Tenses",
            badgeEmoji = "🛠️",
            color = Color(0xFFFF6D00),
            lessons = listOf(
                Class4LessonItem("🛠️", "Dignity of Labour", "محنت کی عظمت", "د کار او محنت عظمت", "Every honest profession—whether farmer, carpenter, teacher, engineer, or cobbler—deserves respect.", "ہر حلال پیشہ اور محنت کش انسان عزت کے قابل ہے۔", "هر حلال مسلک او زیارکښ انسان د درناوي وړ دی."),
                Class4LessonItem("📜", "Poem: The Work", "نظم: کام اور محنت", "نظم: کار او زیار", "Hard work brings joy, self-reliance, and progress to society.", "محنت انسان کو خود کفیل، خوش اور معاشرے کو ترقی یافتہ بناتی ہے۔", "سخت کار انسان پر ځان بسیا کوي او ټولنې ته پرمختګ ورکوي."),
                Class4LessonItem("⏳", "Past Continuous & Present/Past Perfect", "فعل ماضی استمراری اور مکمل", "تېر دوامدار او بشپړ زمانې", "Past Continuous: was/were + V-ing. Present Perfect: has/have + V3. Past Perfect: had + V3.", "Present Perfect میں has/have + تیسری فارم اور Past Perfect میں had + تیسری فارم آتی ہے۔", "په Present Perfect کې has/have + V3 او په Past Perfect کې had + V3 کارول کیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "What does 'Dignity of Labour' mean?",
                    questionUr = "'محنت کی عظمت' (Dignity of Labour) سے کیا مراد ہے؟",
                    questionPs = "د 'محنت عظمت' څخه څه مراد دی؟",
                    options = listOf("Respecting all types of honest work equally", "Only respecting office jobs", "Avoiding physical work", "Working without rest"),
                    correctIndex = 0,
                    explanationEn = "Dignity of labour means all honest work is noble and worthy of respect.",
                    explanationUr = "تمام حلال کاموں اور محنت کشوں کی یکساں عزت کرنا۔"
                ),
                Class4Exercise(
                    questionEn = "Complete in Present Perfect Tense: 'The carpenter ___ made a wooden table.'",
                    questionUr = "فعل حال مکمل چنیں: 'The carpenter ___ made a wooden table.'",
                    questionPs = "تش ځای ډک کړئ: 'The carpenter ___ made a wooden table.'",
                    options = listOf("has", "have", "was", "is"),
                    correctIndex = 0,
                    explanationEn = "Singular subject 'The carpenter' takes 'has' + past participle 'made'.",
                    explanationUr = "واحد فاعل کے ساتھ Present Perfect میں 'has' آتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "What is the meaning of the phrasal verb 'give up'?",
                    questionUr = "فریزل ورب 'give up' کا کیا مطلب ہے؟",
                    questionPs = "د 'give up' مانا څه ده؟",
                    options = listOf("To stop trying / quit", "To climb up", "To distribute gifts", "To wake up early"),
                    correctIndex = 0,
                    explanationEn = "'Give up' means to quit or stop trying.",
                    explanationUr = "'give up' کا مطلب ہار ماننا یا کوشش ترک کرنا ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 8,
            titleEn = "Unit 7: Self, People and Places",
            titleUr = "یونٹ 7: ذات، لوگ اور مقامات",
            titlePs = "یونټ 7: ځان، خلک او ځایونه",
            subtitleEn = "Pages 126–135 • Daffodils (William Wordsworth), Galileo Galilei & Figures of Speech",
            badgeEmoji = "🌼",
            color = Color(0xFFAA00FF),
            lessons = listOf(
                Class4LessonItem("🌼", "Poem: The Daffodils", "نظم: آبی نرگس کے پھول (Daffodils)", "نظم: د نرګس ګلونه (Daffodils)", "Written by William Wordsworth: 'I wandered lonely as a cloud...' celebrating the beauty of golden daffodils beside the lake.", "ولیم ورڈزورتھ کی مشہور نظم جس میں جھیل کے کنارے سنہرے پھولوں کی خوبصورتی بیان کی گئی ہے۔", "د ویلیم ورډزورت مشهور نظم چې د جهیل غاړې ته د ژیړو ګلونو ښکلا ستایي."),
                Class4LessonItem("🔭", "Galileo Galilei", "گیلیلیو گیلیلی", "ګالیلیو ګالیلي", "Galileo improved the telescope and observed Jupiter's moons, proving that planets revolve around the Sun.", "گیلیلیو نے دوربین کو بہتر بنایا اور مشتری کے چاند دریافت کیے۔", "ګالیلیو تلسکوپ ته وده ورکړه او د مشتري سپوږمۍ یې کشف کړې."),
                Class4LessonItem("✨", "Figures of Speech: Simile & Personification", "تشبیہ اور تجسیم", "تشبیه او تجسیم", "Simile compares two things using 'like' or 'as' ('lonely as a cloud'). Personification gives human qualities to non-human things ('fluttering and dancing in the breeze').", "'like' یا 'as' سے موازنہ کرنا تشبیہ (Simile) کہلاتا ہے۔", "د 'like' یا 'as' په کارولو سره پرتله کول تشبیه (Simile) بلل کیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Who wrote the famous poem 'The Daffodils'?",
                    questionUr = "مشہور نظم 'The Daffodils' کے شاعر کون ہیں؟",
                    questionPs = "د 'The Daffodils' مشهور نظم چا لیکلی دی؟",
                    options = listOf("William Wordsworth", "Robert Frost", "John Keats", "William Shakespeare"),
                    correctIndex = 0,
                    explanationEn = "William Wordsworth wrote 'The Daffodils'.",
                    explanationUr = "یہ نظم ولیم ورڈزورتھ نے لکھی ہے۔"
                ),
                Class4Exercise(
                    questionEn = "What figure of speech is used in 'I wandered lonely as a cloud'?",
                    questionUr = "'I wandered lonely as a cloud' میں کون سی صنعت استعمال ہوئی ہے؟",
                    questionPs = "په 'I wandered lonely as a cloud' کې کوم ادبي صنعت کارول شوی دی؟",
                    options = listOf("Simile", "Antonym", "Homophone", "Imperative"),
                    correctIndex = 0,
                    explanationEn = "It compares the poet to a cloud using 'as', which is a Simile.",
                    explanationUr = "'as' کے ذریعے شاعر کو بادل سے تشبیہ دی گئی ہے، اسے Simile کہتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Which instrument did Galileo Galilei improve to study the night sky?",
                    questionUr = "گیلیلیو نے آسمان اور سیاروں کے مشاہدے کے لیے کس آلے کو بہتر بنایا؟",
                    questionPs = "ګالیلیو د اسمان د مطالعې لپاره کومه وسیله جوړه کړه؟",
                    options = listOf("Telescope", "Microscope", "Stethoscope", "Thermometer"),
                    correctIndex = 0,
                    explanationEn = "Galileo improved the telescope to observe celestial bodies.",
                    explanationUr = "گیلیلیو نے دوربین (Telescope) کو بہتر بنایا۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 9,
            titleEn = "Unit 8: Science and Technology",
            titleUr = "یونٹ 8: سائنس اور ٹیکنالوجی",
            titlePs = "یونټ 8: ساینس او ټیکنالوژي",
            subtitleEn = "Pages 136–150 • Computers, Space Tourism, Science Fiction & Email Writing",
            badgeEmoji = "🚀",
            color = Color(0xFF536DFE),
            lessons = listOf(
                Class4LessonItem("💻", "Miracles of Computers", "کمپیوٹر کے کرشمے", "د کمپیوټر معجزې", "Computers process data rapidly and are used in education, medicine, banking, space research, and communication.", "کمپیوٹر تعلیم، طب، بینکنگ اور خلائی تحقیق میں تیزی سے کام کرتا ہے۔", "کمپیوټر په زده کړه، طب، بانکدارۍ او فضایي څیړنو کې کارول کیږي."),
                Class4LessonItem("🚀", "Space Tourism", "خلائی سیاحت", "فضایي سیاحت", "Modern spacecraft are opening new frontiers for humans to travel into orbit and explore space.", "جدید خلائی جہاز انسانوں کے لیے خلا کے سفر کی نئی راہیں کھول رہے ہیں۔", "عصري فضایي بیړۍ انسانانو ته فضا ته د سفر نوې لارې پرانیزي."),
                Class4LessonItem("📧", "Email Writing & Informal Letters", "ای میل اور خط نویسی", "ایمیل او لیک لیکل", "An email includes the recipient's address (To), a clear Subject line, a polite greeting, body text, and sign-off.", "ای میل میں وصول کنندہ کا پتہ (To)، موضوع (Subject) اور واضح پیغام لکھا جاتا ہے۔", "په ایمیل کې د ترلاسه کوونکي پته (To)، موضوع (Subject) او پیغام لیکل کیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "In an email, which field briefly tells the reader what the email is about?",
                    questionUr = "ای میل میں کون سا خانہ بتاتا ہے کہ ای میل کس موضوع پر ہے؟",
                    questionPs = "په ایمیل کې کومه برخه ښیي چې ایمیل د څه په اړه دی؟",
                    options = listOf("Subject line", "Password", "Attachment", "Trash"),
                    correctIndex = 0,
                    explanationEn = "The Subject line summarizes the topic of the email.",
                    explanationUr = "Subject لائن ای میل کا موضوع مختصراً بتاتی ہے۔"
                ),
                Class4Exercise(
                    questionEn = "What is 'Space Tourism'?",
                    questionUr = "'خلائی سیاحت' (Space Tourism) کسے کہتے ہیں؟",
                    questionPs = "'فضایي سیاحت' (Space Tourism) څه ته وایي؟",
                    options = listOf("Human travel into space for recreational or exploration purposes", "Travelling by train", "Sailing across an ocean", "Hiking on hills"),
                    correctIndex = 0,
                    explanationEn = "Space tourism refers to civilians travelling into space.",
                    explanationUr = "سیاحت یا مشاہدے کے لیے خلا کا سفر کرنا خلائی سیاحت کہلاتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which device processes input data into meaningful information?",
                    questionUr = "کون سی مشین ڈیٹا کو پراسیس کر کے مفید معلومات میں بدلتی ہے؟",
                    questionPs = "کوم ماشین ډیټا پروسس کوي او په ګټورو معلوماتو یې بدلوي؟",
                    options = listOf("Computer", "Thermometer", "Barometer", "Compass"),
                    correctIndex = 0,
                    explanationEn = "A computer processes input data into output information.",
                    explanationUr = "کمپیوٹر ڈیٹا کو پراسیس کر کے معلومات فراہم کرتا ہے۔"
                )
            )
        )
    )

    // =========================================================================
    // 2. MATHEMATICS CLASS 6 (All 11 Units — Pages 1–237)
    // =========================================================================
    val mathsStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Unit 1: Multiples and Factors",
            titleUr = "یونٹ 1: اضعاف اور عاد",
            titlePs = "یونټ 1: مضربونه او عوامل",
            subtitleEn = "Pages 1–23 • Divisibility Rules, Prime Factorization, HCF & LCM",
            badgeEmoji = "🔢",
            color = Color(0xFFFF6D00),
            lessons = listOf(
                Class4LessonItem("➗", "Divisibility Tests (2, 3, 5, 9, 10)", "تقسیم پذیری کے اصول", "د وېشلو قواعد", "A number is divisible by 3 if the sum of its digits is divisible by 3; by 5 if it ends in 0 or 5.", "اگر کسی عدد کے ہندسوں کا مجموعہ 3 پر تقسیم ہو تو وہ عدد بھی 3 پر پورا تقسیم ہوتا ہے۔", "که د یوې عدد د شمېرو مجموعه په 3 د وېشلو وړ وي، نو هغه عدد هم په 3 وېشل کیږي."),
                Class4LessonItem("🌲", "Prime Factorization & Index Notation", "مفرد تجزی اور قوت نمائی شکل", "لومړني عوامل او طاقت بڼه", "Expressing a composite number as a product of prime numbers, e.g., 36 = 2² × 3².", "مربوط عدد کو مفرد اعداد کے حاصل ضرب کی صورت میں لکھنا جیسے 36 = 2² × 3²۔", "یو مرکب عدد د لومړنیو اعدادو د ضرب په توګه لیکل لکه 36 = 2² × 3²."),
                Class4LessonItem("🔗", "HCF and LCM", "عادِ اعظم اور ذواضعافِ اقل", "عاد اعظم (HCF) او ذواضعاف اقل (LCM)", "For any two numbers A and B: Product of numbers = HCF × LCM.", "دو اعداد کا حاصل ضرب ان کے عادِ اعظم اور ذواضعافِ اقل کے حاصل ضرب کے برابر ہوتا ہے۔", "د دوو اعدادو حاصل ضرب د هغوی د HCF او LCM د ضرب سره برابر دی.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "What is the Prime Factorization of 24 in index notation?",
                    questionUr = "24 کی مفرد تجزی قوت نمائی شکل میں کیا ہے؟",
                    questionPs = "د 24 لومړني عوامل په طاقت بڼه کې څه دي؟",
                    options = listOf("2³ × 3", "2² × 3²", "2 × 12", "4 × 6"),
                    correctIndex = 0,
                    explanationEn = "24 = 2 × 2 × 2 × 3 = 2³ × 3.",
                    explanationUr = "24 = 2 × 2 × 2 × 3 = 2³ × 3۔"
                ),
                Class4Exercise(
                    questionEn = "If the HCF of two numbers is 6 and their LCM is 36, and one number is 12, what is the other number?",
                    questionUr = "اگر دو اعداد کا عادِ اعظم 6 اور ذواضعافِ اقل 36 ہو اور ایک عدد 12 ہو تو دوسرا عدد کیا ہے؟",
                    questionPs = "که د دوو اعدادو HCF شپږ او LCM یې 36 وي او یو عدد 12 وي، بل عدد څو دی؟",
                    options = listOf("18", "24", "16", "30"),
                    correctIndex = 0,
                    explanationEn = "Other number = (HCF × LCM) / First number = (6 × 36) / 12 = 18.",
                    explanationUr = "دوسرا عدد = (6 × 36) ÷ 12 = 18۔"
                ),
                Class4Exercise(
                    questionEn = "Which of these numbers is divisible by both 3 and 5?",
                    questionUr = "ان میں سے کون سا عدد 3 اور 5 دونوں پر پورا تقسیم ہوتا ہے؟",
                    questionPs = "له دې اعدادو څخه کوم یو په 3 او 5 دواړو وېشل کیږي؟",
                    options = listOf("45", "35", "25", "32"),
                    correctIndex = 0,
                    explanationEn = "45 ends in 5 (divisible by 5) and 4+5=9 (divisible by 3).",
                    explanationUr = "45 کے آخر میں 5 ہے اور 4+5=9 ہے جو 3 پر تقسیم ہوتا ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Unit 2: Integers",
            titleUr = "یونٹ 2: صحیح اعداد (Integers)",
            titlePs = "یونټ 2: تام اعداد (Integers)",
            subtitleEn = "Pages 24–37 • Positive & Negative Integers, Number Line & Absolute Value",
            badgeEmoji = "➕",
            color = Color(0xFFFFAB00),
            lessons = listOf(
                Class4LessonItem("📏", "Positive and Negative Integers", "مثبت اور منفی صحیح اعداد", "مثبت او منفي تام اعداد", "Set of integers Z = {..., -3, -2, -1, 0, +1, +2, +3, ...}. Zero is neither positive nor negative.", "صحیح اعداد میں مثبت اعداد، منفی اعداد اور صفر شامل ہیں۔ صفر نہ مثبت ہے نہ منفی۔", "په تامو اعدادو کې مثبت، منفي او صفر شامل دي."),
                Class4LessonItem("🧭", "Ordering Integers on a Number Line", "عددی خط پر صحیح اعداد کی ترتیب", "په عددي کرښه د اعدادو ترتیب", "On a number line, numbers increase to the right and decrease to the left (-1 is greater than -5).", "عددی خط پر دائیں طرف جانے سے قیمت بڑھتی ہے، اس لیے -1، -5 سے بڑا ہے۔", "په عددي کرښه کې ښي خوا ته عدد لویږي، نو -1 له -5 څخه لوی دی."),
                Class4LessonItem("🛡️", "Absolute (Numerical) Value", "مطلق قیمت (Absolute Value)", "مطلق قیمت", "The distance of a number from 0 on the number line is always non-negative: |-7| = 7 and |+7| = 7.", "کسی عدد کی صفر سے دوری اس کی مطلق قیمت کہلاتی ہے، جیسے |-7| = 7۔", "له صفر څخه د عدد واټن ته مطلق قیمت وایي، لکه |-7| = 7.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Which integer is greater: -3 or -8?",
                    questionUr = "کون سا صحیح عدد بڑا ہے: -3 یا -8؟",
                    questionPs = "کوم تام عدد لوی دی: -3 که -8؟",
                    options = listOf("-3", "-8", "Both are equal", "-10"),
                    correctIndex = 0,
                    explanationEn = "-3 lies to the right of -8 on the number line, so -3 > -8.",
                    explanationUr = "عددی خط پر -3، -8 کے دائیں جانب ہے اس لیے -3 بڑا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "What is the absolute value of |-15|?",
                    questionUr = "|-15| کی مطلق قیمت کیا ہے؟",
                    questionPs = "د |-15| مطلق قیمت څو دی؟",
                    options = listOf("15", "-15", "0", "1"),
                    correctIndex = 0,
                    explanationEn = "Absolute value is always non-negative, so |-15| = 15.",
                    explanationUr = "مطلق قیمت ہمیشہ مثبت ہوتی ہے، اس لیے |-15| = 15۔"
                ),
                Class4Exercise(
                    questionEn = "Which integer is neither positive nor negative?",
                    questionUr = "کون سا صحیح عدد نہ مثبت ہے اور نہ منفی؟",
                    questionPs = "کوم تام عدد نه مثبت دی او نه منفي؟",
                    options = listOf("0", "+1", "-1", "10"),
                    correctIndex = 0,
                    explanationEn = "Zero (0) is neutral—neither positive nor negative.",
                    explanationUr = "صفر (0) نہ مثبت ہے اور نہ منفی۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Unit 3: Laws of Integers & BODMAS",
            titleUr = "یونٹ 3: صحیح اعداد کے قوانین اور BODMAS",
            titlePs = "یونټ 3: د تامو اعدادو قوانین او BODMAS",
            subtitleEn = "Pages 38–69 • Operations on Integers, Sign Rules & Order of Operations",
            badgeEmoji = "🧮",
            color = Color(0xFF00E5FF),
            lessons = listOf(
                Class4LessonItem("➕", "Addition & Subtraction of Integers", "صحیح اعداد کی جمع اور تفریق", "د تامو اعدادو جمع او تفریق", "Like signs add and keep the sign: (-4) + (-5) = -9. Unlike signs subtract and take the larger number's sign: (-8) + (+3) = -5.", "یکساں علامتیں جمع ہوتی ہیں اور مختلف علامتیں تفریق ہو کر بڑے عدد کی علامت لیتی ہیں۔", "ورته نښې جمع کیږي او مختلفې نښې تفریق کیږي."),
                Class4LessonItem("✖️", "Multiplication & Division Sign Rules", "ضرب اور تقسیم میں علامتوں کے اصول", "په ضرب او وېش کې د نښو اصول", "(+) × (+) = (+), (-) × (-) = (+), (+) × (-) = (-). Product of two negative integers is positive!", "دو منفی اعداد کا حاصل ضرب ہمیشہ مثبت ہوتا ہے: (-) × (-) = (+)۔", "د دوو منفي اعدادو ضرب تل مثبت وي: (-) × (-) = (+)."),
                Class4LessonItem("📐", "BODMAS Rule", "بوڈماس (BODMAS) کا اصول", "د BODMAS قاعده", "Brackets ( (), {}, [] ) → Of/Order → Division → Multiplication → Addition → Subtraction.", "پہلے بریکٹ، پھر تقسیم، ضرب، جمع اور آخر میں تفریق حل کی جاتی ہے۔", "لومړی قوسونه، بیا وېش، ضرب، جمع او په پای کې تفریق حل کیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "What is (-6) × (-4)?",
                    questionUr = "(-6) × (-4) کا جواب کیا ہے؟",
                    questionPs = "د (-6) × (-4) ځواب څو دی؟",
                    options = listOf("+24", "-24", "-10", "+10"),
                    correctIndex = 0,
                    explanationEn = "The product of two negative integers is positive: (-6) × (-4) = +24.",
                    explanationUr = "دو منفی اعداد کو ضرب دینے سے جواب مثبت آتا ہے: +24۔"
                ),
                Class4Exercise(
                    questionEn = "Solve using BODMAS: 10 + 12 ÷ 3 × 2",
                    questionUr = "BODMAS کے تحت حل کریں: 10 + 12 ÷ 3 × 2",
                    questionPs = "د BODMAS له مخې حل کړئ: 10 + 12 ÷ 3 × 2",
                    options = listOf("18", "14", "12", "20"),
                    correctIndex = 0,
                    explanationEn = "First divide: 12 ÷ 3 = 4. Then multiply: 4 × 2 = 8. Finally add: 10 + 8 = 18.",
                    explanationUr = "پہلے تقسیم (12÷3=4)، پھر ضرب (4×2=8)، پھر جمع (10+8=18)۔"
                ),
                Class4Exercise(
                    questionEn = "Evaluate: (-15) + (+9)",
                    questionUr = "حل کریں: (-15) + (+9)",
                    questionPs = "حل کړئ: (-15) + (+9)",
                    options = listOf("-6", "+6", "-24", "+24"),
                    correctIndex = 0,
                    explanationEn = "15 - 9 = 6, and since 15 has a negative sign, the answer is -6.",
                    explanationUr = "15 میں سے 9 نکالیں تو 6 اور بڑے عدد کی منفی علامت سے -6 آئے گا۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Unit 4: Rate, Ratio and Percentage",
            titleUr = "یونٹ 4: شرح، نسبت اور فیصد",
            titlePs = "یونټ 4: نرخ، نسبت او سلنه",
            subtitleEn = "Pages 70–92 • Ratio a:b, Rate, Percentage, Profit & Loss",
            badgeEmoji = "📊",
            color = Color(0xFF00E676),
            lessons = listOf(
                Class4LessonItem("⚖️", "Ratio and Simplest Form", "نسبت اور سادہ ترین شکل", "نسبت او ساده بڼه", "A ratio compares two quantities of the same kind (a : b). It has no unit.", "دو ہم جنس مقداروں کے موازنے کو نسبت (a : b) کہتے ہیں۔ نسبت کی کوئی اکائی نہیں ہوتی۔", "د دوو یو شان مقدارونو پرتله کولو ته نسبت وایي."),
                Class4LessonItem("💯", "Percentage (%)", "فیصد (Percentage)", "سلنه (Percentage)", "Percent means 'out of 100'. To convert a fraction to percentage, multiply by 100%.", "فیصد کا مطلب 'سو میں سے' ہے۔ کسر کو فیصد میں بدلنے کے لیے 100 سے ضرب دیتے ہیں۔", "سلنه یعنې له سلو څخه؛ کسر په سلنه بدلولو لپاره په 100 ضربوو."),
                Class4LessonItem("💰", "Profit and Loss", "نفع اور نقصان", "ګټه او تاوان", "Profit = Selling Price (SP) - Cost Price (CP). Profit % = (Profit / CP) × 100.", "قیمتِ فروخت قیمتِ خرید سے زیادہ ہو تو نفع ہوتا ہے: نفع = قیمتِ فروخت - قیمتِ خرید۔", "ګټه = د پلور بیه - د پیرود بیه.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "What is the simplest form of the ratio 20 : 35?",
                    questionUr = "نسبت 20 : 35 کی سادہ ترین شکل کیا ہے؟",
                    questionPs = "د 20 : 35 نسبت ساده بڼه کومه ده؟",
                    options = listOf("4 : 7", "2 : 3", "5 : 7", "4 : 5"),
                    correctIndex = 0,
                    explanationEn = "Divide both terms by their HCF 5: 20÷5 : 35÷5 = 4 : 7.",
                    explanationUr = "دونوں کو 5 پر تقسیم کرنے سے 4 : 7 حاصل ہوتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "What is 25% of 200?",
                    questionUr = "200 کا 25 فیصد کتنا ہوتا ہے؟",
                    questionPs = "د 200 پنځه ویشت سلنه (25%) څو کیږي؟",
                    options = listOf("50", "25", "75", "100"),
                    correctIndex = 0,
                    explanationEn = "(25 / 100) × 200 = 50.",
                    explanationUr = "(25 ÷ 100) × 200 = 50۔"
                ),
                Class4Exercise(
                    questionEn = "Ali bought a book for Rs. 400 and sold it for Rs. 480. What is his profit percentage?",
                    questionUr = "علی نے 400 روپے کی کتاب خرید کر 480 روپے میں بیچی۔ نفع فیصد کیا ہے؟",
                    questionPs = "علي یو کتاب په 400 روپیو واخیست او په 480 یې وپلوره. د ګټې سلنه څو ده؟",
                    options = listOf("20%", "80%", "15%", "10%"),
                    correctIndex = 0,
                    explanationEn = "Profit = 80. Profit % = (80 / 400) × 100 = 20%.",
                    explanationUr = "نفع = 80 روپے۔ نفع فیصد = (80 ÷ 400) × 100 = 20%۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Unit 5: Sets",
            titleUr = "یونٹ 5: سیٹ (Sets)",
            titlePs = "یونټ 5: سیټونه (Sets)",
            subtitleEn = "Pages 93–105 • Set Notation, Forms of Sets, Finite/Infinite, Empty & Equal Sets",
            badgeEmoji = "🗂️",
            color = Color(0xFFAA00FF),
            lessons = listOf(
                Class4LessonItem("🗂️", "What is a Set?", "سیٹ کی تعریف", "د سیټ تعریف", "A set is a collection of well-defined and distinct objects. Each object is called an element (∈).", "واضح اور مختلف اشیاء کے اجتماع کو سیٹ کہتے ہیں۔", "د واضح او جلا شیانو ټولګې ته سیٹ ویل کیږي."),
                Class4LessonItem("📝", "Descriptive and Tabular Forms", "بیانیہ اور اندراجی طریقہ", "بیانیه او جدول بڼه", "Descriptive: 'The set of vowels in English'. Tabular: A = {a, e, i, o, u}.", "بیانیہ طریقے میں الفاظ میں اور اندراجی طریقے میں بریکٹ { } کے اندر عناصر لکھے جاتے ہیں۔", "په جدول بڼه کې عناصر د { } قوسونو دننه لیکل کیږي."),
                Class4LessonItem("⭕", "Empty, Singleton, Finite & Infinite Sets", "خالی، یک رکنی، متناہی اور غیر متناہی سیٹ", "تش، یو عنصري، محدود او نامحدود سیټونه", "An empty (null) set has no elements and is denoted by { } or φ.", "خالی سیٹ میں کوئی رکن نہیں ہوتا اور اسے { } یا φ سے ظاہر کرتے ہیں۔", "تش سیٹ هیڅ عنصر نه لري او په { } یا φ ښودل کیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Which of the following is a well-defined set?",
                    questionUr = "درج ذیل میں سے کون سا اجتماع ایک مکمل سیٹ ہے؟",
                    questionPs = "له لاندې څخه کوم یو واضح سیٹ دی؟",
                    options = listOf("The set of odd numbers less than 10", "Some tall boys", "A few tasty fruits", "Clever students"),
                    correctIndex = 0,
                    explanationEn = "'Odd numbers less than 10' = {1, 3, 5, 7, 9} is well-defined and distinct.",
                    explanationUr = "10 سے چھوٹے طاق اعداد کا سیٹ واضح (Well-defined) ہے۔"
                ),
                Class4Exercise(
                    questionEn = "How many elements are in the set of letters of the word 'BOOK'?",
                    questionUr = "لفظ 'BOOK' کے حروف کے سیٹ میں کتنے ارکان ہوں گے؟",
                    questionPs = "د 'BOOK' کلیمې د تورو په سیٹ کې څو عناصر دي؟",
                    options = listOf("3 ({B, O, K})", "4", "2", "5"),
                    correctIndex = 0,
                    explanationEn = "Elements in a set are distinct (not repeated), so {B, O, K} has 3 elements.",
                    explanationUr = "سیٹ میں کوئی رکن دہرایا نہیں جاتا، اس لیے {B, O, K} میں 3 ارکان ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Which symbol represents 'is an element of'?",
                    questionUr = "کون سی علامت 'رکن ہے' کے لیے استعمال ہوتی ہے؟",
                    questionPs = "کومه نښه د 'عنصر دی' لپاره کارول کیږي؟",
                    options = listOf("∈", "∉", "φ", "≠"),
                    correctIndex = 0,
                    explanationEn = "The symbol ∈ means 'belongs to' or 'is an element of'.",
                    explanationUr = "علامت ∈ کا مطلب 'کا رکن ہے'۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 6,
            titleEn = "Unit 6: Patterns & Algebraic Expressions",
            titleUr = "یونٹ 6: تسلسل اور الجبرائی جملے",
            titlePs = "یونټ 6: ترتیبونه او الجبري افادې",
            subtitleEn = "Pages 106–124 • Number Patterns, Variables, Constants, Terms, Addition & Subtraction",
            badgeEmoji = "🔤",
            color = Color(0xFF2979FF),
            lessons = listOf(
                Class4LessonItem("🔢", "Number Patterns & Rules", "عددی تسلسل", "عددي ترتیبونه", "In the sequence 3, 7, 11, 15, ..., the term-to-term rule is 'Add 4'.", "تسلسل 3, 7, 11, 15 میں ہر اگلا عدد 4 جمع کرنے سے آتا ہے۔", "په 3, 7, 11, 15 لړۍ کې هر راتلونکی عدد د 4 په جمع کولو سره لاسته راځي."),
                Class4LessonItem("🔤", "Variables, Coefficients & Constants", "متغیر، عددی سر اور مستقل مقدار", "متغیر، ضریب او ثابت عدد", "In 5x + 7, 'x' is the variable, '5' is the coefficient of x, and '7' is the constant.", "5x + 7 میں x متغیر، 5 عددی سر (Coefficient) اور 7 مستقل ہے۔", "په 5x + 7 کې x متغیر، 5 ضریب او 7 ثابت عدد دی."),
                Class4LessonItem("➕", "Adding & Subtracting Like Terms", "یکساں رقوم کی جمع و تفریق", "د ورته جملو جمع او تفریق", "Only like terms can be combined: 4a + 3b + 2a = 6a + 3b.", "صرف ہم جنس (Like) رقوم ہی آپس میں جمع یا تفریق ہو سکتی ہیں۔", "یوازې ورته الجبري جملې سره جمع او تفریق کیدی شي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "In the algebraic expression 8y - 5, what is the coefficient of y?",
                    questionUr = "الجبرائی جملے 8y - 5 میں y کا عددی سر (Coefficient) کیا ہے؟",
                    questionPs = "په 8y - 5 الجبري افاده کې د y ضریب څو دی؟",
                    options = listOf("8", "-5", "y", "3"),
                    correctIndex = 0,
                    explanationEn = "The number multiplied by the variable y is 8.",
                    explanationUr = "متغیر y کے ساتھ ضرب ہونے والا عدد 8 اس کا عددی سر ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Simplify: 5x + 3y + 2x - y",
                    questionUr = "مختصر کریں: 5x + 3y + 2x - y",
                    questionPs = "ساده کړئ: 5x + 3y + 2x - y",
                    options = listOf("7x + 2y", "9xy", "7x + 4y", "3x + 2y"),
                    correctIndex = 0,
                    explanationEn = "(5x + 2x) + (3y - y) = 7x + 2y.",
                    explanationUr = "5x + 2x = 7x اور 3y - y = 2y، پس جواب 7x + 2y ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Find the value of 3a + 4 when a = 5.",
                    questionUr = "اگر a = 5 ہو تو 3a + 4 کی قیمت معلوم کریں۔",
                    questionPs = "که a = 5 وي، د 3a + 4 قیمت پیدا کړئ.",
                    options = listOf("19", "12", "15", "27"),
                    correctIndex = 0,
                    explanationEn = "3(5) + 4 = 15 + 4 = 19.",
                    explanationUr = "3(5) + 4 = 15 + 4 = 19۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 7,
            titleEn = "Unit 7: Linear Expressions & Equations",
            titleUr = "یونٹ 7: یک درجی مساواتیں",
            titlePs = "یونټ 7: خطي معادلې",
            subtitleEn = "Pages 125–138 • Constructing & Solving Linear Equations in One Variable",
            badgeEmoji = "⚖️",
            color = Color(0xFF1DE9B6),
            lessons = listOf(
                Class4LessonItem("⚖️", "What is a Linear Equation?", "یک درجی مساوات", "خطي معادله", "An equation in which the highest power of the variable is 1, e.g., 2x + 5 = 13.", "ایسی مساوات جس میں متغیر کی سب سے بڑی قوت 1 ہو، یک درجی مساوات کہلاتی ہے۔", "هغه معادله چې د متغیر لوړ طاقت پکې 1 وي، خطي معادله بلل کیږي."),
                Class4LessonItem("🔑", "Solving Linear Equations", "مساوات کا حل", "د معادلې حل", "Perform the same inverse operation on both sides to isolate the variable x.", "مساوات کے دونوں اطراف یکساں عمل کر کے متغیر x کی قیمت نکالی جاتی ہے۔", "د مساواتو په دواړو خواوو کې مساوي عمل ترسره کولو سره د x قیمت پیدا کیږي."),
                Class4LessonItem("📝", "Word Problems with Equations", "عبارتی سوالات", "عبارتي پوښتنې", "'A number increased by 7 gives 19' translates to x + 7 = 19 → x = 12.", "'کسی عدد میں 7 جمع کرنے سے 19 آتا ہے': x + 7 = 19، پس x = 12۔", "که له یو عدد سره 7 جمع شي او 19 ترلاسه شي: x + 7 = 19 → x = 12.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Solve for x: 2x + 5 = 17",
                    questionUr = "حل کریں: 2x + 5 = 17",
                    questionPs = "حل کړئ: 2x + 5 = 17",
                    options = listOf("x = 6", "x = 11", "x = 5", "x = 12"),
                    correctIndex = 0,
                    explanationEn = "2x = 17 - 5 = 12 → x = 12 / 2 = 6.",
                    explanationUr = "2x = 12 اور x = 6۔"
                ),
                Class4Exercise(
                    questionEn = "Solve for y: y / 4 = 9",
                    questionUr = "حل کریں: y ÷ 4 = 9",
                    questionPs = "حل کړئ: y / 4 = 9",
                    options = listOf("y = 36", "y = 13", "y = 5", "y = 20"),
                    correctIndex = 0,
                    explanationEn = "Multiply both sides by 4: y = 9 × 4 = 36.",
                    explanationUr = "دونوں طرف 4 سے ضرب دینے سے y = 36۔"
                ),
                Class4Exercise(
                    questionEn = "Which algebraic equation represents: 'Three times a number minus 4 equals 11'?",
                    questionUr = "'کسی عدد کے تین گنا میں سے 4 کم کریں تو 11 آتا ہے' کی مساوات کیا ہے؟",
                    questionPs = "د 'یو عدد درې چنده منفي 4 مساوي 11' معادله کومه ده؟",
                    options = listOf("3x - 4 = 11", "4x - 3 = 11", "3x + 4 = 11", "x + 3 = 11"),
                    correctIndex = 0,
                    explanationEn = "Three times a number (3x) minus 4 (- 4) equals 11 (= 11).",
                    explanationUr = "تین گنا (3x) منفی 4 برابر 11 یعنی 3x - 4 = 11۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 8,
            titleEn = "Unit 8: Surface Area and Volume",
            titleUr = "یونٹ 8: سطح کا رقبہ اور حجم",
            titlePs = "یونټ 8: د سطحې مساحت او حجم",
            subtitleEn = "Pages 139–169 • Area of Triangle, Parallelogram, Trapezium, Cube & Cuboid Volume",
            badgeEmoji = "📦",
            color = Color(0xFFFF4081),
            lessons = listOf(
                Class4LessonItem("📐", "Area of Triangle & Parallelogram", "مثلث اور متوازی الاضلاع کا رقبہ", "د مثلث او متوازي الاضلاع مساحت", "Area of Triangle = ½ × base × height. Area of Parallelogram = base × height.", "مثلث کا رقبہ = ½ × قاعدہ × ارتفاع۔ متوازی الاضلاع کا رقبہ = قاعدہ × ارتفاع۔", "د مثلث مساحت = ½ × قاعده × لوړوالی."),
                Class4LessonItem("📦", "Volume of Cube and Cuboid", "مکعب اور مکعب نما کا حجم", "د مکعب او مکعب نما حجم", "Volume of Cube = l³. Volume of Cuboid = length × width × height.", "مکعب کا حجم = l³ اور مکعب نما کا حجم = لمبائی × چوڑائی × اونچائی۔", "د مکعب نما حجم = اوږدوالی × سور × لوړوالی."),
                Class4LessonItem("🎁", "Total Surface Area", "کل سطحی رقبہ", "ټول سطحي مساحت", "Surface Area of Cube = 6l². Surface Area of Cuboid = 2(lw + wh + hl).", "مکعب کی 6 برابر سطحیں ہوتی ہیں، اس لیے کل سطحی رقبہ = 6l²۔", "د مکعب سطحي مساحت = 6l².")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Find the area of a triangle with base 10 cm and height 6 cm.",
                    questionUr = "اس مثلث کا رقبہ معلوم کریں جس کا قاعدہ 10 سم اور ارتفاع 6 سم ہے۔",
                    questionPs = "د هغه مثلث مساحت پیدا کړئ چې قاعده یې 10 cm او لوړوالی یې 6 cm وي.",
                    options = listOf("30 cm²", "60 cm²", "16 cm²", "20 cm²"),
                    correctIndex = 0,
                    explanationEn = "Area = ½ × 10 × 6 = 30 cm².",
                    explanationUr = "رقبہ = ½ × 10 × 6 = 30 مربع سنٹی میٹر۔"
                ),
                Class4Exercise(
                    questionEn = "What is the volume of a cube whose side length is 4 cm?",
                    questionUr = "4 سم ضلع والے مکعب (Cube) کا حجم کیا ہوگا؟",
                    questionPs = "د 4 cm ضلعې لرونکي مکعب حجم څو دی؟",
                    options = listOf("64 cm³", "16 cm³", "24 cm³", "96 cm³"),
                    correctIndex = 0,
                    explanationEn = "Volume = l³ = 4 × 4 × 4 = 64 cm³.",
                    explanationUr = "حجم = 4 × 4 × 4 = 64 مکعب سنٹی میٹر۔"
                ),
                Class4Exercise(
                    questionEn = "What is the total surface area of a cube of side 5 cm?",
                    questionUr = "5 سم ضلع والے مکعب کا کل سطحی رقبہ کیا ہے؟",
                    questionPs = "د 5 cm ضلعې لرونکي مکعب ټول سطحي مساحت څو دی؟",
                    options = listOf("150 cm²", "125 cm²", "25 cm²", "100 cm²"),
                    correctIndex = 0,
                    explanationEn = "Surface Area = 6 × l² = 6 × 25 = 150 cm².",
                    explanationUr = "سطحی رقبہ = 6 × 5² = 6 × 25 = 150 مربع سم۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 9,
            titleEn = "Unit 9: Lines, Angles and Symmetry",
            titleUr = "یونٹ 9: خطوط، زاویے اور تشاکل (Symmetry)",
            titlePs = "یونټ 9: کرښې، زاویې او تناظر (Symmetry)",
            subtitleEn = "Pages 170–188 • Parallel Lines, Complementary/Supplementary Angles & Symmetry",
            badgeEmoji = "📐",
            color = Color(0xFF536DFE),
            lessons = listOf(
                Class4LessonItem("📐", "Complementary & Supplementary Angles", "متمم اور مکرم زاویے", "متمم او مکمله زاویې", "Two angles are Complementary if their sum is 90°, and Supplementary if their sum is 180°.", "جن دو زاویوں کا مجموعہ 90° ہو وہ متمم (Complementary) اور جن کا مجموعہ 180° ہو وہ مکرم (Supplementary) کہلاتے ہیں۔", "دوه زاویې چې مجموعه یې 90° وي متمم او که 180° وي مکمله بلل کیږي."),
                Class4LessonItem("✖️", "Vertically Opposite Angles", "راساً متقابلہ زاویے", "مخامخ زاویې", "When two straight lines intersect, the vertically opposite angles are always equal.", "جب دو خطوط ایک دوسرے کو قطع کریں تو آمنے سامنے کے زاویے برابر ہوتے ہیں۔", "کله چې دوه کرښې یو بل قطع کړي، مخامخ زاویې تل مساوي وي."),
                Class4LessonItem("🦋", "Line & Rotational Symmetry", "خطِ تشاکل اور گردشی تشاکل", "د تناظر کرښه او څرخیدونکی تناظر", "A square has 4 lines of symmetry and rotational symmetry of order 4.", "مربع میں 4 خطوطِ تشاکل (Lines of symmetry) ہوتے ہیں۔", "مربع د تناظر 4 کرښې لري.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "What is the complement of a 35° angle?",
                    questionUr = "35° زاویے کا متمم زاویہ (Complement) کیا ہے؟",
                    questionPs = "د 35° زاویې متمم زاویه څو ده؟",
                    options = listOf("55°", "145°", "65°", "45°"),
                    correctIndex = 0,
                    explanationEn = "Complementary angles add up to 90°: 90° - 35° = 55°.",
                    explanationUr = "90° - 35° = 55°۔"
                ),
                Class4Exercise(
                    questionEn = "What is the supplement of a 110° angle?",
                    questionUr = "110° زاویے کا مکرم زاویہ (Supplement) کیا ہے؟",
                    questionPs = "د 110° زاویې مکمله زاویه څو ده؟",
                    options = listOf("70°", "80°", "90°", "20°"),
                    correctIndex = 0,
                    explanationEn = "Supplementary angles add up to 180°: 180° - 110° = 70°.",
                    explanationUr = "180° - 110° = 70°۔"
                ),
                Class4Exercise(
                    questionEn = "How many lines of symmetry does an equilateral triangle have?",
                    questionUr = "مساوی الاضلاع مثلث میں کتنے خطوطِ تشاکل ہوتے ہیں؟",
                    questionPs = "مساوي الاضلاع مثلث د تناظر څو کرښې لري؟",
                    options = listOf("3", "1", "2", "4"),
                    correctIndex = 0,
                    explanationEn = "An equilateral triangle has 3 equal sides and 3 lines of symmetry.",
                    explanationUr = "مساوی الاضلاع مثلث میں 3 خطوطِ تشاکل ہوتے ہیں۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 10,
            titleEn = "Unit 10: Geometrical Constructions",
            titleUr = "یونٹ 10: عملی جیومیٹری",
            titlePs = "یونټ 10: هندسي رسمونه",
            subtitleEn = "Pages 189–203 • Perpendicular Bisector, Angle Bisector & Compass Angles (60°, 90°, 120°)",
            badgeEmoji = "🧭",
            color = Color(0xFF26A69A),
            lessons = listOf(
                Class4LessonItem("📏", "Perpendicular Bisector of a Line Segment", "قطعہ خط کا عمودی ناصف", "د خط عمودي ناصف", "A perpendicular bisector divides a line segment into two equal parts at a 90° angle.", "عمودی ناصف کسی قطعہ خط کو 90 درجے کے زاویے پر دو برابر حصوں میں تقسیم کرتا ہے۔", "عمودي ناصف یوه کرښه په 90 درجو کې په دوو مساوي برخو ویشي."),
                Class4LessonItem("🧭", "Constructing Angles with a Compass", "پرکار کی مدد سے زاویے بنانا", "د پرکار په مرسته زاویې جوړول", "Using a compass and ruler, we can construct 60°, 120°, 90°, 45°, and 30° angles accurately.", "پرکار اور فٹے کی مدد سے 60°, 90°, 120°, 30° اور 45° کے زاویے بنائے جاتے ہیں۔", "د پرکار او خط کش په مرسته د 60°, 90°, 120° او 45° زاویې جوړیږي."),
                Class4LessonItem("✂️", "Angle Bisector", "زاویے کا ناصف", "د زاویې ناصف", "An angle bisector divides an angle into two equal angles (e.g., bisecting 60° gives two 30° angles).", "زاویے کا ناصف اسے دو برابر زاویوں میں تقسیم کرتا ہے (جیسے 60° کا ناصف 30° بناتا ہے)۔", "د زاویې ناصف یوه زاویه په دوو مساوي برخو ویشي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "If you bisect an angle of 90°, what is the measure of each new angle?",
                    questionUr = "اگر 90° کے زاویے کی تنصیف کی جائے تو ہر نیا زاویہ کتنے درجے کا ہوگا؟",
                    questionPs = "که د 90° زاویه دوه نیمه شي، هره نوې زاویه به څو درجې وي؟",
                    options = listOf("45°", "30°", "60°", "50°"),
                    correctIndex = 0,
                    explanationEn = "90° ÷ 2 = 45°.",
                    explanationUr = "90° کو دو برابر حصوں میں بانٹنے سے 45° کا زاویہ بنتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "At what angle does a perpendicular bisector intersect a line segment?",
                    questionUr = "عمودی ناصف قطعہ خط کو کتنے درجے کے زاویے پر قطع کرتا ہے؟",
                    questionPs = "عمودي ناصف کرښه په څو درجو زاویه قطع کوي؟",
                    options = listOf("90°", "45°", "60°", "180°"),
                    correctIndex = 0,
                    explanationEn = "'Perpendicular' always means at a right angle (90°).",
                    explanationUr = "عمود ہمیشہ 90° کا زاویہ بناتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which instrument is used to draw arcs and circles in geometrical construction?",
                    questionUr = "عملی جیومیٹری میں قوس اور دائرہ لگانے کے لیے کون سا آلہ استعمال ہوتا ہے؟",
                    questionPs = "په هندسه کې د قوس او دایرې رسمولو لپاره کومه اله کارول کیږي؟",
                    options = listOf("Pair of Compasses", "Protractor", "Set Square", "Divider"),
                    correctIndex = 0,
                    explanationEn = "A pair of compasses is used to draw circles and arcs.",
                    explanationUr = "قوس اور دائرہ لگانے کے لیے پرکار (Compass) استعمال ہوتی ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 11,
            titleEn = "Unit 11: Data Management & Probability",
            titleUr = "یونٹ 11: ڈیٹا کی تنظیم اور احتمال",
            titlePs = "یونټ 11: د معلوماتو مدیریت او احتمال",
            subtitleEn = "Pages 204–237 • Bar Graph, Pie Chart, Mean, Median, Mode & Probability",
            badgeEmoji = "📈",
            color = Color(0xFFD4AC0D),
            lessons = listOf(
                Class4LessonItem("📊", "Bar Graph & Pie Chart", "بار گراف اور پائی چارٹ", "بار ګراف او پای چارټ", "A pie chart represents data as sectors of a circle (total angle = 360°).", "پائی چارٹ میں ڈیٹا کو دائرے کے حصوں (مجموعی زاویہ 360°) میں ظاہر کیا جاتا ہے۔", "په پای چارټ کې معلومات د دایرې د برخو (360°) په توګه ښودل کیږي."),
                Class4LessonItem("🧮", "Mean, Median and Mode", "اوسط، وسطانیہ اور عادہ", "اوسط، منځنی او مود", "Mean = Sum / Count. Median = middle value of ordered data. Mode = most frequent value.", "اوسط (Mean) = مجموعہ ÷ تعداد۔ سب سے زیادہ بار آنے والی قیمت عادہ (Mode) کہلاتی ہے۔", "اوسط = مجموعه ÷ شمېر. ترټولو زیات تکرار شوی عدد Mode بلل کیږي."),
                Class4LessonItem("🎲", "Probability", "احتمال (Probability)", "احتمال (Probability)", "Probability of an event = Favourable outcomes / Total possible outcomes (between 0 and 1).", "کسی واقعے کا احتمال 0 اور 1 کے درمیان ہوتا ہے۔", "د یوې پیښې احتمال د 0 او 1 ترمنځ وي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "What is the total central angle of a Pie Chart?",
                    questionUr = "پائی چارٹ (Pie Chart) کے تمام مرکزی زاویوں کا مجموعہ کتنا ہوتا ہے؟",
                    questionPs = "د پای چارټ (Pie Chart) د ټولو مرکزي زاویو مجموعه څو درجې ده؟",
                    options = listOf("360°", "180°", "90°", "100°"),
                    correctIndex = 0,
                    explanationEn = "A full circle has 360°.",
                    explanationUr = "مکمل دائرے کا زاویہ 360° ہوتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Find the Mode of the data: 4, 7, 5, 7, 9, 7, 3",
                    questionUr = "مواد 4, 7, 5, 7, 9, 7, 3 کا عادہ (Mode) معلوم کریں۔",
                    questionPs = "د 4, 7, 5, 7, 9, 7, 3 معلوماتو موډ (Mode) پیدا کړئ.",
                    options = listOf("7", "5", "4", "9"),
                    correctIndex = 0,
                    explanationEn = "7 appears the most times (3 times), so the mode is 7.",
                    explanationUr = "7 سب سے زیادہ (3 بار) آیا ہے اس لیے عادہ 7 ہے۔"
                ),
                Class4Exercise(
                    questionEn = "When a fair coin is tossed once, what is the probability of getting Heads?",
                    questionUr = "ایک سکہ اچھالنے پر چِت (Head) آنے کا احتمال کیا ہے؟",
                    questionPs = "د یوې سکې په اچولو کې د شیر (Head) راتللو احتمال څومره دی؟",
                    options = listOf("1/2", "1/4", "1", "0"),
                    correctIndex = 0,
                    explanationEn = "There is 1 Head out of 2 possible outcomes (H, T), so P(Head) = 1/2.",
                    explanationUr = "دو ممکنہ نتائج میں سے ایک چِت ہے، اس لیے احتمال 1/2 ہے۔"
                )
            )
        )
    )

    // =========================================================================
    // 3. GENERAL SCIENCE CLASS 6 (All 12 Units — Pages 1–162)
    // =========================================================================
    val scienceStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Unit 1: Cellular Organization",
            titleUr = "یونٹ 1: خلوی تنظیم",
            titlePs = "یونټ 1: حجروي تنظیم",
            subtitleEn = "Pages 1–12 • Microscope, Animal & Plant Cells, Tissues, Organs & Systems",
            badgeEmoji = "🔬",
            color = Color(0xFF00E676),
            lessons = listOf(
                Class4LessonItem("🔬", "Cell: The Basic Unit of Life", "خلیہ (Cell): زندگی کی بنیادی اکائی", "حجره (Cell): د ژوند بنسټیز واحد", "All living organisms are made of cells. The nucleus acts as the control centre ('brain') of the cell.", "تمام جاندار خلیوں (Cells) سے مل کر بنے ہیں۔ نیوکلیس خلیے کے تمام افعال کو کنٹرول کرتا ہے۔", "ټول ژوندي موجودات له حجرو جوړ دي. هسته (Nucleus) د حجرې فعالیتونه کنټرولوي."),
                Class4LessonItem("🌿", "Plant Cell vs Animal Cell", "پودے اور جانور کے خلیے میں فرق", "د بوټو او حیواناتو د حجرې توپیر", "Plant cells have a rigid Cell Wall, Chloroplasts (for photosynthesis), and a large central vacuole, which animal cells lack.", "پودے کے خلیے میں سیل وال اور کلوروپلاسٹ ہوتے ہیں جو جانور کے خلیے میں نہیں ہوتے۔", "د بوټو حجرې دیوال (Cell Wall) او کلوروپلاسټ لري چې د حیواناتو حجرې یې نه لري."),
                Class4LessonItem("🧬", "Levels of Organization", "خلوی تنظیم کے مدارج", "د حجروي تنظیم درجې", "Cells → Tissues → Organs → Organ Systems → Organism.", "خلیے مل کر بافت (Tissue)، بافتیں عضو (Organ) اور اعضا مل کر نظام بناتے ہیں۔", "حجرې نسجونه، نسجونه غړي او غړي سیستمونه جوړوي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Which organelle is present in a plant cell but absent in an animal cell?",
                    questionUr = "کون سا حصہ پودے کے خلیے میں ہوتا ہے مگر جانور کے خلیے میں نہیں؟",
                    questionPs = "کومه برخه د بوټي په حجره کې وي خو د حیوان په حجره کې نه وي؟",
                    options = listOf("Cell Wall & Chloroplast", "Nucleus", "Cell Membrane", "Cytoplasm"),
                    correctIndex = 0,
                    explanationEn = "Plant cells have a Cell Wall and Chloroplasts.",
                    explanationUr = "پودے کے خلیے میں سیل وال اور کلوروپلاسٹ ہوتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Which part of the cell is called the 'powerhouse of the cell'?",
                    questionUr = "خلیے کے کس حصے کو 'پاور ہاؤس' (توانائی کا مرکز) کہا جاتا ہے؟",
                    questionPs = "د حجرې کومې برخې ته د حجرې 'پاور هاوس' ویل کیږي؟",
                    options = listOf("Mitochondria", "Vacuole", "Cell Wall", "Ribosome"),
                    correctIndex = 0,
                    explanationEn = "Mitochondria produce energy for the cell.",
                    explanationUr = "مائٹوکونڈریا خلیے کے لیے توانائی پیدا کرتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "A group of similar cells performing a specific function forms a:",
                    questionUr = "ایک جیسے خلیوں کا گروہ جو مخصوص کام کرے کیا بناتا ہے؟",
                    questionPs = "د ورته حجرو ډله چې ځانګړی کار کوي څه جوړوي؟",
                    options = listOf("Tissue", "Atom", "Molecule", "Planet"),
                    correctIndex = 0,
                    explanationEn = "Similar cells group together to form a tissue.",
                    explanationUr = "ایک جیسے خلیے مل کر بافت (Tissue) بناتے ہیں۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Unit 2: Reproduction in Plants",
            titleUr = "یونٹ 2: پودوں میں افزائشِ نسل",
            titlePs = "یونټ 2: په بوټو کې تکثیر",
            subtitleEn = "Pages 13–22 • Sexual & Asexual Reproduction, Pollination, Fertilization & Vegetative Propagation",
            badgeEmoji = "🌺",
            color = Color(0xFF00BFA5),
            lessons = listOf(
                Class4LessonItem("🌺", "Pollination: Self & Cross", "زیرگی (Pollination) کی اقسام", "ګرده افشاني (Pollination)", "Transfer of pollen grains from anther to stigma is pollination. It is carried out by insects, wind, or water.", "پولن گرینز کا اینتھر سے سٹگما تک منتقل ہونا زیرگی کہلاتا ہے۔", "له انتر څخه سټیګما ته د ګردې لیږدولو ته ګرده افشاني وایي."),
                Class4LessonItem("🌱", "Fertilization: Seed & Fruit", "بارآوری، بیج اور پھل بننا", "القاح، تخم او میوه", "After fertilization, the ovule develops into a seed and the ovary ripens into a fruit.", "بارآوری کے بعد بیضہ (Ovule) بیج بنتا ہے اور بیضہ دانی (Ovary) پھل بن جاتی ہے۔", "له القاح وروسته تخمه په تخم او تخمدان په میوه بدلیږي."),
                Class4LessonItem("🥔", "Asexual / Vegetative Propagation", "غیر جنسی افزائش (قلم لگانا، تنے اور جڑیں)", "غیر جنسي تکثیر", "New plants grow from tubers (potato), bulbs (onion), runners (strawberry), or stem cuttings (rose).", "آلو، پیاز اور گلاب کی قلم سے بغیر بیج کے نیا پودا اگایا جا سکتا ہے۔", "کچالو، پیاز او د ګلاب قلمې پرته له تخم څخه نوي بوټي تولیدوي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "After fertilization in a flower, what does the ovary develop into?",
                    questionUr = "پھول میں بارآوری کے بعد بیضہ دانی (Ovary) کس چیز میں تبدیل ہوتی ہے؟",
                    questionPs = "په ګل کې له القاح وروسته تخمدان (Ovary) په څه بدلیږي؟",
                    options = listOf("Fruit", "Leaf", "Root", "Petal"),
                    correctIndex = 0,
                    explanationEn = "The ovary ripens into a fruit while ovules become seeds.",
                    explanationUr = "اووری پھل میں اور اوویول بیج میں تبدیل ہو جاتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Potato reproduces asexually through underground stem tubers that have buds called:",
                    questionUr = "آلو کے زیرِ زمین تنے پر موجود کلیاں جن سے نیا پودا اگتا ہے کیا کہلاتی ہیں؟",
                    questionPs = "په کچالو کې هغه غوټۍ چې نوی بوټی ترې شنه کیږي څه بلل کیږي؟",
                    options = listOf("Eyes", "Ears", "Wings", "Thorns"),
                    correctIndex = 0,
                    explanationEn = "Potato tubers have buds commonly called 'eyes'.",
                    explanationUr = "آلو کے اوپر موجود کلیوں کو 'آنکھیں' (Eyes) کہتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Which method is commonly used to grow new rose plants?",
                    questionUr = "گلاب کے نئے پودے لگانے کے لیے کون سا طریقہ عام طور پر استعمال ہوتا ہے؟",
                    questionPs = "د ګلاب نوي بوټي د کرلو لپاره کومه طریقه کارول کیږي؟",
                    options = listOf("Stem cutting", "Spores", "Bulb", "Runners"),
                    correctIndex = 0,
                    explanationEn = "Rose plants are commonly grown by stem cutting.",
                    explanationUr = "گلاب کا نیا پودا قلم لگانے (Stem cutting) سے اگایا جاتا ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Unit 3: Balanced Diet",
            titleUr = "یونٹ 3: متوازن غذا",
            titlePs = "یونټ 3: متوازن خواړه",
            subtitleEn = "Pages 23–36 • Carbohydrates, Proteins, Fats, Vitamins, Minerals & Deficiency Diseases",
            badgeEmoji = "🥗",
            color = Color(0xFFFFAB00),
            lessons = listOf(
                Class4LessonItem("🍞", "Energy & Body-Building Nutrients", "توانائی اور نشوونما کے اجزا", "د انرژۍ او ودې غذايي مواد", "Carbohydrates and fats provide energy, while proteins (meat, eggs, pulses) build and repair body tissues.", "کاربوہائیڈریٹس اور چکنائی توانائی دیتے ہیں جبکہ پروٹین جسم کی نشوونما اور مرمت کرتے ہیں۔", "کاربوهایډریټ او غوړ انرژي ورکوي او پروټین د بدن وده او رغونه کوي."),
                Class4LessonItem("🍊", "Vitamins & Minerals", "وٹامنز اور معدنی نمکیات", "ویټامینونه او منرالونه", "Vitamin A keeps eyes healthy, Vitamin C heals gums, Vitamin D & Calcium strengthen bones, and Iron makes haemoglobin.", "وٹامن اے نظر، وٹامن سی مسوڑھوں، وٹامن ڈی ہڈیوں اور آئرن خون کے لیے ضروری ہے۔", "ویټامین A د سترګو، ویټامین C د غاښونو، ویټامین D د هډوکو او اوسپنه د وینې لپاره اړینه ده."),
                Class4LessonItem("⚠️", "Deficiency Diseases", "غذائی کمی کی بیماریاں", "د غذايي کمښت ناروغۍ", "Lack of protein causes Kwashiorkor, lack of Vitamin C causes Scurvy, lack of Vitamin D causes Rickets, and lack of Iodine causes Goitre.", "پروٹین کی کمی سے کواشیورکور، وٹامن ڈی سے رکٹس اور آئیوڈین کی کمی سے گلہڑ (Goitre) ہوتا ہے۔", "د ویټامین D کمښت ریکټس او د آیوډین کمښت جاغور (Goitre) پیدا کوي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Which nutrient is primarily responsible for growth and repair of body tissues?",
                    questionUr = "جسم کی نشوونما اور خلیوں کی مرمت کے لیے کون سا غذائی جزو سب سے اہم ہے؟",
                    questionPs = "د بدن د ودې او حجرو د رغولو لپاره کوم غذايي مواد ترټولو مهم دي؟",
                    options = listOf("Proteins", "Water", "Fibre", "Salt"),
                    correctIndex = 0,
                    explanationEn = "Proteins are body-building nutrients essential for growth and tissue repair.",
                    explanationUr = "پروٹین جسم کی تعمیر اور نشوونما کا کام کرتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Deficiency of Vitamin D in children causes weak and bent bones known as:",
                    questionUr = "بچوں میں وٹامن ڈی کی کمی سے ہڈیاں کمزور اور ٹیڑھی ہونے کی بیماری کیا کہلاتی ہے؟",
                    questionPs = "په ماشومانو کې د ویټامین D کمښت کومه د هډوکو ناروغي پیدا کوي؟",
                    options = listOf("Rickets", "Scurvy", "Night blindness", "Goitre"),
                    correctIndex = 0,
                    explanationEn = "Lack of Vitamin D causes Rickets.",
                    explanationUr = "وٹامن ڈی کی کمی سے رکٹس (Rickets) کی بیماری ہوتی ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Deficiency of which mineral causes Anaemia (low haemoglobin in blood)?",
                    questionUr = "کس معدنی نمک کی کمی سے خون کی کمی (Anaemia) ہوتی ہے؟",
                    questionPs = "د کوم منرال کمښت د وینې کمښت (Anaemia) رامنځته کوي؟",
                    options = listOf("Iron", "Sodium", "Potassium", "Fluorine"),
                    correctIndex = 0,
                    explanationEn = "Iron is needed to make haemoglobin in red blood cells.",
                    explanationUr = "فولاد (Iron) خون کے سرخ خلیات میں ہیموگلوبن بناتا ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Unit 4: Human Digestive System",
            titleUr = "یونٹ 4: انسانی نظامِ انہضام",
            titlePs = "یونټ 4: د انسان د هاضمې سیستم",
            subtitleEn = "Pages 37–44 • Alimentary Canal, Enzymes, Liver, Pancreas & Digestive Health",
            badgeEmoji = "🍎",
            color = Color(0xFFFF6D00),
            lessons = listOf(
                Class4LessonItem("👄", "Mouth, Oesophagus & Stomach", "منہ، خوراک کی نالی اور معدہ", "خوله، د خوړو نل او معده", "Digestion begins in the mouth with saliva. The stomach churns food with gastric juice and hydrochloric acid.", "ہاضمے کا آغاز منہ سے ہوتا ہے۔ معدہ گیسٹرک جوس کی مدد سے خوراک کو ہضم کرتا ہے۔", "هاضمه له خولې پیل کیږي او معده خواړه د تیزابو او انزایمونو په مرسته هضموي."),
                Class4LessonItem("🧬", "Small Intestine, Liver & Pancreas", "چھوٹی آنت، جگر اور لبلبہ", "کولمې، ځیګر او پانقراس", "The liver secretes bile (stored in the gall bladder) to emulsify fats. Complete digestion and absorption occur in the small intestine via villi.", "جگر صفرا (Bile) بناتا ہے اور چھوٹی آنت میں ولائی (Villi) کے ذریعے ہضم شدہ خوراک خون میں جذب ہوتی ہے۔", "ځیګر صفرا تولیدوي او په وړو کولمو کې خواړه وینې ته جذبیږي."),
                Class4LessonItem("💧", "Large Intestine & Healthy Habits", "بڑی آنت اور صحت مند عادات", "غټې کولمې او صحي عادتونه", "The large intestine absorbs water from undigested food. Eating fibre and drinking plenty of water prevents constipation.", "بڑی آنت پانی جذب کرتی ہے۔ ریشہ دار غذا اور پانی قبض سے بچاتے ہیں۔", "غټې کولمې اوبه جذبوي او فایبر لرونکي خواړه له قبضیت څخه مخنیوی کوي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Where does the chemical digestion of starch begin?",
                    questionUr = "نشاستے (Starch) کے کیمیائی ہاضمے کا آغاز کہاں سے ہوتا ہے؟",
                    questionPs = "د نشایستې کیمیاوي هاضمه له کوم ځایه پیل کیږي؟",
                    options = listOf("Mouth (by saliva)", "Large intestine", "Kidneys", "Lungs"),
                    correctIndex = 0,
                    explanationEn = "Saliva in the mouth contains amylase enzyme that begins digesting starch.",
                    explanationUr = "منہ میں موجود لعابِ دہن نشاستے کو ہضم کرنا شروع کر دیتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which organ produces Bile to help break down fats?",
                    questionUr = "چکنائی کو ہضم کرنے میں مدد دینے والا مادہ بائل (صفرا) کون سا عضو بناتا ہے؟",
                    questionPs = "کوم غړی د غوړو د هضمولو لپاره صفرا (Bile) تولیدوي؟",
                    options = listOf("Liver", "Heart", "Lungs", "Brain"),
                    correctIndex = 0,
                    explanationEn = "The liver produces bile, which is stored in the gall bladder.",
                    explanationUr = "جگر (Liver) صفرا پیدا کرتا ہے جو پتے میں جمع ہوتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Tiny finger-like projections in the small intestine that absorb digested food are called:",
                    questionUr = "چھوٹی آنت میں انگلی نما ابھار جو ہضم شدہ خوراک جذب کرتے ہیں کیا کہلاتے ہیں؟",
                    questionPs = "په وړو کولمو کې د ګوتو په څیر وړې برخې چې خواړه جذبوي څه بلل کیږي؟",
                    options = listOf("Villi", "Alveoli", "Nephrons", "Neurons"),
                    correctIndex = 0,
                    explanationEn = "Villi increase the surface area for absorption in the small intestine.",
                    explanationUr = "ولائی (Villi) ہضم شدہ خوراک کو خون میں جذب کرتے ہیں۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Unit 5: Matter as Particles",
            titleUr = "یونٹ 5: مادہ بطور ذرات",
            titlePs = "یونټ 5: ماده د ذراتو په توګه",
            subtitleEn = "Pages 45–60 • Particle Model of Solids, Liquids & Gases, Diffusion & Changes of State",
            badgeEmoji = "🧊",
            color = Color(0xFF00E5FF),
            lessons = listOf(
                Class4LessonItem("🧊", "Particle Arrangement in States of Matter", "ٹھوس، مائع اور گیس میں ذرات کی ترتیب", "په جامد، مایع او ګاز کې د ذراتو ترتیب", "In solids, particles are tightly packed; in liquids, they slide past each other; in gases, they move freely at high speed.", "ٹھوس میں ذرات مضبوطی سے جڑے ہوتے ہیں، مائع میں پھسل سکتے ہیں اور گیس میں آزادانہ حرکت کرتے ہیں۔", "په جامد کې ذرات کلک نښتي وي، په مایع کې ښویېږي او په ګاز کې ازاد حرکت کوي."),
                Class4LessonItem("♨️", "Melting, Boiling, Sublimation & Condensation", "پگھلنا، ابلنا، تصعید اور تکثیف", "ویلي کیدل، جوش کیدل، تصعید او تکثیف", "Sublimation is when a solid changes directly into a gas without becoming liquid (e.g., dry ice, camphor, naphthalene).", "ٹھوس کا مائع بنے بغیر براہِ راست گیس میں بدلنا تصعید (Sublimation) کہلاتا ہے۔", "د جامد مستقیم په ګاز بدلیدو ته تصعید (Sublimation) وایي."),
                Class4LessonItem("🌸", "Diffusion", "نفوذ (Diffusion)", "نفوذ (Diffusion)", "Movement of particles from an area of higher concentration to lower concentration (e.g., smell of perfume spreading in a room).", "ذرات کا زیادہ ارتکاز سے کم ارتکاز کی طرف پھیلنا نفوذ کہلاتا ہے، جیسے خوشبو کا پھیلنا۔", "له لوړ غلظت څخه ټیټ غلظت ته د ذراتو خپریدل نفوذ بلل کیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "In which state of matter are particles farthest apart and have the weakest forces of attraction?",
                    questionUr = "مادے کی کس حالت میں ذرات ایک دوسرے سے سب سے زیادہ دور ہوتے ہیں؟",
                    questionPs = "د مادې په کوم حالت کې ذرات له یو بل څخه ترټولو لرې وي؟",
                    options = listOf("Gas", "Solid", "Liquid", "Ice"),
                    correctIndex = 0,
                    explanationEn = "Gas particles are far apart with negligible forces of attraction.",
                    explanationUr = "گیس کے ذرات ایک دوسرے سے بہت دور ہوتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "The direct change of a solid into vapour without melting is called:",
                    questionUr = "ٹھوس کا پگھلے بغیر براہِ راست بخارات (گیس) میں تبدیل ہونا کیا کہلاتا ہے؟",
                    questionPs = "پرته له ویلي کیدو د جامد مستقیم په ګاز بدلیدل څه بلل کیږي؟",
                    options = listOf("Sublimation", "Freezing", "Condensation", "Melting"),
                    correctIndex = 0,
                    explanationEn = "Sublimation is the direct solid-to-gas phase change.",
                    explanationUr = "اس عمل کو تصعید (Sublimation) کہتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Why can you smell perfume across a room soon after the bottle is opened?",
                    questionUr = "عطر کی شیشی کھولنے پر خوشبو پورے کمرے میں کس عمل کی وجہ سے پھیل جاتی ہے؟",
                    questionPs = "د عطر بوتل له خلاصولو وروسته بوی د کومې پروسې له امله په خونه کې خپریږي؟",
                    options = listOf("Diffusion of gas particles", "Freezing", "Filtration", "Gravity"),
                    correctIndex = 0,
                    explanationEn = "Perfume vapour spreads through air by diffusion.",
                    explanationUr = "خوشبو کے ذرات نفوذ (Diffusion) کے ذریعے ہوا میں پھیلتے ہیں۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 6,
            titleEn = "Unit 6: Elements and Compounds",
            titleUr = "یونٹ 6: عناصر اور مرکبات",
            titlePs = "یونټ 6: عناصر او مرکبات",
            subtitleEn = "Pages 61–74 • Atoms, Elements, Symbols, Metals vs Non-Metals & Compounds",
            badgeEmoji = "⚗️",
            color = Color(0xFF2979FF),
            lessons = listOf(
                Class4LessonItem("⚛️", "Elements and Chemical Symbols", "عناصر اور کیمیائی علامات", "عناصر او کیمیاوي نښې", "An element is a pure substance made of only one kind of atom: Hydrogen (H), Carbon (C), Oxygen (O), Sodium (Na), Iron (Fe), Gold (Au).", "عنصر ایک ہی قسم کے ایٹموں سے مل کر بنتا ہے، جیسے آکسیجن (O)، سوڈیم (Na)، لوہا (Fe)۔", "عنصر له یو ډول اټومونو جوړ دی، لکه اکسیجن (O)، اوسپنه (Fe) او سره زر (Au)."),
                Class4LessonItem("🪙", "Metals and Non-Metals", "دھاتیں اور غیر دھاتیں", "فلزات او غیر فلزات", "Metals are lustrous, malleable, ductile, and good conductors of heat and electricity. Non-metals are dull and poor conductors.", "دھاتیں چمکدار اور حرارت و بجلی کی اچھی موصل ہوتی ہیں، جبکہ غیر دھاتیں غیر موصل ہوتی ہیں۔", "فلزات ځلیدونکي او د تودوخې او برېښنا هادي دي."),
                Class4LessonItem("💧", "Compounds", "مرکبات (Compounds)", "مرکبات (Compounds)", "A compound is formed when two or more elements combine chemically in a fixed ratio, e.g., Water (H₂O) and Carbon dioxide (CO₂).", "دو یا زیادہ عناصر کے متعین نسبت سے کیمیائی ملاپ سے مرکب بنتا ہے جیسے پانی (H₂O)۔", "د دوو یا ډیرو عناصرو له کیمیاوي یوځای کیدو څخه مرکب جوړیږي لکه اوبه (H₂O).")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "What is the chemical symbol for the element Sodium?",
                    questionUr = "عنصر سوڈیم (Sodium) کی کیمیائی علامت کیا ہے؟",
                    questionPs = "د سودیم (Sodium) عنصر کیمیاوي نښه کومه ده؟",
                    options = listOf("Na", "So", "Sd", "S"),
                    correctIndex = 0,
                    explanationEn = "Sodium's symbol 'Na' comes from its Latin name Natrium.",
                    explanationUr = "سوڈیم کی علامت لاطینی نام Natrium سے 'Na' ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which of the following is a Compound?",
                    questionUr = "درج ذیل میں سے کون سی شے ایک مرکب (Compound) ہے؟",
                    questionPs = "له لاندې څخه کوم یو مرکب (Compound) دی؟",
                    options = listOf("Water (H₂O)", "Oxygen (O₂)", "Iron (Fe)", "Gold (Au)"),
                    correctIndex = 0,
                    explanationEn = "Water (H₂O) is a compound of Hydrogen and Oxygen chemically combined.",
                    explanationUr = "پانی (H₂O) ہائیڈروجن اور آکسیجن کا کیمیائی مرکب ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which metal is a liquid at room temperature?",
                    questionUr = "کمرے کے درجہ حرارت پر کون سی دھات مائع حالت میں پائی جاتی ہے؟",
                    questionPs = "کوم فلز د خونې په تودوخه کې په مایع حالت کې وي؟",
                    options = listOf("Mercury (Hg)", "Iron", "Copper", "Aluminium"),
                    correctIndex = 0,
                    explanationEn = "Mercury is the only metal that is liquid at room temperature.",
                    explanationUr = "پارہ (Mercury) واحد دھات ہے جو عام درجہ حرارت پر مائع ہوتی ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 7,
            titleEn = "Unit 7: Mixtures",
            titleUr = "یونٹ 7: آمیزے (Mixtures)",
            titlePs = "یونټ 7: مخلوطونه (Mixtures)",
            subtitleEn = "Pages 75–90 • Homogeneous & Heterogeneous Mixtures, Solutions, Filtration, Distillation & Chromatography",
            badgeEmoji = "🧪",
            color = Color(0xFFAA00FF),
            lessons = listOf(
                Class4LessonItem("空氣", "Mixtures & Alloys", "آمیزے اور بھرت (Alloys)", "مخلوطونه او الیاژونه", "In a mixture, substances are physically mixed without chemical bonds. Air is a mixture of gases; Brass and Steel are alloys.", "آمیزے میں اجزا کیمیائی تعامل کے بغیر ملتے ہیں۔ ہوا گیسوں کا آمیزہ ہے اور اسٹیل دھاتوں کا آمیزہ ہے۔", "په مخلوط کې مواد پرته له کیمیاوي تعامل څخه ګډیږي. هوا د ګازونو مخلوط دی."),
                Class4LessonItem("🧂", "Solution: Solute & Solvent", "محلول، منحل اور محلل", "محلول، حل کیدونکی او محلل", "Solute (e.g., salt) dissolves in a Solvent (e.g., water) to form a homogeneous Solution.", "نمک (منحل) پانی (محلل) میں حل ہو کر محلول (Solution) بناتا ہے۔", "مالګه په اوبو کې حل کیږي او محلول جوړوي."),
                Class4LessonItem("🔬", "Separation Techniques", "آمیزے کے اجزا الگ کرنے کے طریقے", "د مخلوط د جلا کولو طریقې", "Filtration separates insoluble solids; Evaporation recovers salt from water; Distillation recovers pure water; Chromatography separates ink dyes.", "عملِ تقطیر، تبخیر، کشید (Distillation) اور کرومیٹوگرافی سے اجزا الگ کیے جاتے ہیں۔", "فلټریشن، تبخیر، تقطیر او کروماتوګرافي د مخلوط اجزا جلا کوي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Which method is used to separate different coloured dyes present in black ink?",
                    questionUr = "روشنائی (سیاہی) میں موجود مختلف رنگوں کو الگ کرنے کے لیے کون سا طریقہ استعمال ہوتا ہے؟",
                    questionPs = "په رنګ (سیاهي) کې د مختلفو رنګونو د جلا کولو لپاره کومه طریقه کارول کیږي؟",
                    options = listOf("Paper Chromatography", "Sieving", "Magnetic separation", "Sublimation"),
                    correctIndex = 0,
                    explanationEn = "Chromatography separates soluble dyes based on how fast they travel on paper.",
                    explanationUr = "پیپر کرومیٹوگرافی سے سیاہی کے مختلف رنگ الگ کیے جاتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "In a salt-water solution, water acts as the:",
                    questionUr = "نمک اور پانی کے محلول میں پانی کیا کہلاتا ہے؟",
                    questionPs = "د مالګې او اوبو په محلول کې اوبه څه بلل کیږي؟",
                    options = listOf("Solvent", "Solute", "Precipitate", "Residue"),
                    correctIndex = 0,
                    explanationEn = "Water dissolves the salt, so water is the solvent.",
                    explanationUr = "پانی اپنے اندر نمک کو حل کرتا ہے اس لیے پانی محلل (Solvent) ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which gas makes up about 78% of Earth's atmosphere (air)?",
                    questionUr = "ہوا میں تقریباً 78 فیصد کون سی گیس پائی جاتی ہے؟",
                    questionPs = "په هوا کې شاوخوا 78 سلنه کوم ګاز شتون لري؟",
                    options = listOf("Nitrogen", "Oxygen", "Carbon dioxide", "Argon"),
                    correctIndex = 0,
                    explanationEn = "Air contains about 78% Nitrogen and 21% Oxygen.",
                    explanationUr = "ہوا میں 78 فیصد نائٹروجن اور 21 فیصد آکسیجن ہوتی ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 8,
            titleEn = "Unit 8: Energy",
            titleUr = "یونٹ 8: توانائی (Energy)",
            titlePs = "یونټ 8: انرژي (Energy)",
            subtitleEn = "Pages 91–106 • Kinetic & Potential Energy, Conservation of Energy & Renewable Sources",
            badgeEmoji = "⚡",
            color = Color(0xFFFF4081),
            lessons = listOf(
                Class4LessonItem("🏃", "Kinetic & Potential Energy", "حرکی اور مخفی توانائی", "حرکي او پټه انرژي", "Kinetic Energy is energy due to motion. Potential Energy is stored energy due to position or elastic stretch.", "حرکت کی وجہ سے توانائی حرکی (Kinetic) اور پوزیشن کی وجہ سے ذخیرہ شدہ توانائی مخفی (Potential) کہلاتی ہے۔", "د حرکت له امله انرژي حرکي او د موقعیت له امله زیرمه شوې انرژي پټه انرژي ده."),
                Class4LessonItem("🔄", "Law of Conservation of Energy", "بقائے توانائی کا قانون", "د انرژۍ د پایښت قانون", "Energy can neither be created nor destroyed; it only changes from one form to another.", "توانائی نہ پیدا کی جا سکتی ہے اور نہ فنا، بلکہ ایک شکل سے دوسری شکل میں بدلتی ہے۔", "انرژي نه پیدا کیږي او نه له منځه ځي، بلکې له یوې بڼې بلې ته بدلیږي."),
                Class4LessonItem("☀️", "Renewable vs Non-Renewable Sources", "قابلِ تجدید اور ناقابلِ تجدید ذرائع", "تجدید کیدونکې او نه تجدید کیدونکې سرچینې", "Solar, wind, and hydro energy are clean renewable sources; coal, oil, and natural gas are non-renewable fossil fuels.", "سورج، ہوا اور پانی قابلِ تجدید ذرائع ہیں جبکہ کوئلہ، تیل اور گیس ناقابلِ تجدید ہیں۔", "لمر، باد او اوبه تجدید کیدونکې سرچینې دي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Water stored high behind a dam possesses which form of energy?",
                    questionUr = "ڈیم میں بلندی پر ذخیرہ شدہ پانی میں کون سی توانائی ہوتی ہے؟",
                    questionPs = "په بند (ډیم) کې په لوړه سطحه زیرمه شوي اوبه کومه انرژي لري؟",
                    options = listOf("Gravitational Potential Energy", "Sound Energy", "Chemical Energy", "Nuclear Energy"),
                    correctIndex = 0,
                    explanationEn = "Water at a height has stored gravitational potential energy.",
                    explanationUr = "بلندی پر موجود پانی میں تجاذبی مخفی توانائی (Potential Energy) ہوتی ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which of the following is a Renewable source of energy?",
                    questionUr = "ان میں سے کون سا توانائی کا قابلِ تجدید ذریعہ ہے؟",
                    questionPs = "له لاندې څخه کومه یوه د انرژۍ تجدید کیدونکې سرچینه ده؟",
                    options = listOf("Solar and Wind Energy", "Coal", "Crude Oil", "Natural Gas"),
                    correctIndex = 0,
                    explanationEn = "Solar and wind energy are naturally replenished and renewable.",
                    explanationUr = "شمسی اور ہوائی توانائی قابلِ تجدید ذرائع ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "A solar panel converts light energy directly into:",
                    questionUr = "سولر پینل روشنی کی توانائی کو کس توانائی میں تبدیل کرتا ہے؟",
                    questionPs = "سولر پینل د رڼا انرژي په کومه انرژي بدلوي؟",
                    options = listOf("Electrical energy", "Sound energy", "Muscular energy", "Magnetic energy"),
                    correctIndex = 0,
                    explanationEn = "Solar cells convert sunlight into electrical energy.",
                    explanationUr = "سولر پینل دھوپ کو برقی توانائی (بجلی) میں بدلتا ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 9,
            titleEn = "Unit 9: Electricity",
            titleUr = "یونٹ 9: برق (Electricity)",
            titlePs = "یونټ 9: برېښنا (Electricity)",
            subtitleEn = "Pages 107–122 • Static & Current Electricity, Series vs Parallel Circuits",
            badgeEmoji = "💡",
            color = Color(0xFFFFAB00),
            lessons = listOf(
                Class4LessonItem("🎈", "Static Electricity", "سکونی برق", "ساکنه برېښنا", "Like charges repel each other (+ and +), while opposite charges attract (+ and -). Lightning is a giant static discharge.", "ایک جیسے چارج ایک دوسرے کو دفع اور مخالف چارج کشش کرتے ہیں۔ آسمانی بجلی سکونی برق کی مثال ہے۔", "ورته چارجونه یو بل دفع کوي او مخالف چارجونه یو بل جذبوي."),
                Class4LessonItem("💡", "Series Circuit", "سلسلے وار (Series) سرکٹ", "پرله پسې (Series) سرکټ", "In a series circuit, current has only one path. If one bulb fuses, all other bulbs go out.", "سیریز سرکٹ میں کرنٹ کے گزرنے کا ایک ہی راستہ ہوتا ہے؛ ایک بلب خراب ہو تو سب بند ہو جاتے ہیں۔", "په سیریز سرکټ کې برېښنا یوازې یوه لاره لري."),
                Class4LessonItem("🏠", "Parallel Circuit", "متوازی (Parallel) سرکٹ", "موازي (Parallel) سرکټ", "In a parallel circuit, each appliance has its own branch. Home wiring uses parallel circuits so switches work independently.", "گھروں کی وائرنگ متوازی سرکٹ میں ہوتی ہے تاکہ ہر بلب اور پنکھا الگ سوئچ سے چل سکے۔", "د کورونو وائرینګ په موازي سرکټ کې وي ترڅو هر څراغ جلا کار وکړي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Why are household appliances connected in Parallel circuits?",
                    questionUr = "گھروں میں بجلی کے آلات متوازی (Parallel) سرکٹ میں کیوں لگائے جاتے ہیں؟",
                    questionPs = "په کورونو کې برقي وسایل ولې په موازي (Parallel) سرکټ کې تړل کیږي؟",
                    options = listOf("So each appliance works independently with full voltage", "So all turn off together", "To waste electricity", "To make bulbs dimmer"),
                    correctIndex = 0,
                    explanationEn = "In a parallel circuit, if one bulb turns off, others keep working normally.",
                    explanationUr = "تاکہ ایک بلب بند کرنے سے باقی آلات بند نہ ہوں۔"
                ),
                Class4Exercise(
                    questionEn = "What happens when two positively charged objects are brought close to each other?",
                    questionUr = "جب دو مثبت چارج شدہ اجسام کو ایک دوسرے کے قریب لایا جائے تو کیا ہوتا ہے؟",
                    questionPs = "کله چې دوه مثبت چارج شوي شیان یو بل ته نږدې شي څه پیښیږي؟",
                    options = listOf("They repel each other", "They attract each other", "They melt", "Nothing happens"),
                    correctIndex = 0,
                    explanationEn = "Like charges repel each other.",
                    explanationUr = "ہم جنس چارج ایک دوسرے کو دفع (Repel) کرتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Which component is used to open or close an electric circuit?",
                    questionUr = "برقی سرکٹ کو کھولنے یا بند کرنے کے لیے کون سا پرزہ استعمال ہوتا ہے؟",
                    questionPs = "د برقي سرکټ د خلاصولو یا بندولو لپاره کومه برخه کارول کیږي؟",
                    options = listOf("Switch", "Bulb", "Plastic ruler", "Wooden block"),
                    correctIndex = 0,
                    explanationEn = "A switch controls the flow of current by opening or closing the circuit.",
                    explanationUr = "سوئچ (Switch) سرکٹ کو آن یا آف کرتا ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 10,
            titleEn = "Unit 10: Magnetism",
            titleUr = "یونٹ 10: مقناطیسیت (Magnetism)",
            titlePs = "یونټ 10: مقناطیسیت (Magnetism)",
            subtitleEn = "Pages 123–132 • Magnetic Field Lines, Earth as a Magnet & Electromagnets",
            badgeEmoji = "🧲",
            color = Color(0xFF536DFE),
            lessons = listOf(
                Class4LessonItem("🧲", "Magnetic Poles & Field Lines", "مقناطیسی قطب اور میدان", "مقناطیسي قطبونه او ساحه", "Magnetic field lines emerge from the North Pole and enter the South Pole. Like poles repel; unlike poles attract.", "مقناطیسی خطوط شمالی قطب (N) سے نکل کر جنوبی قطب (S) میں داخل ہوتے ہیں۔", "مقناطیسي کرښې له شمالي قطب څخه وځي او جنوبي قطب ته ننوځي."),
                Class4LessonItem("🧭", "Earth as a Giant Magnet", "زمین بطور مقناطیس اور قطب نما", "ځمکه د مقناطیس په توګه", "A freely suspended magnet always points North-South because Earth itself acts like a giant magnet.", "آزاد لٹکایا گیا مقناطیس ہمیشہ شمالاً جنوباً ٹھہرتا ہے جس کی مدد سے قطب نما (Compass) سمت بتاتا ہے۔", "ازاد ځړول شوی مقناطیس تل شمال او جنوب ته ودریږي."),
                Class4LessonItem("🔔", "Electromagnets", "برقی مقناطیس (Electromagnet)", "برقي مقناطیس", "Winding an insulated wire around an iron nail and passing current creates an electromagnet, used in electric bells, cranes, and speakers.", "لوہے کی کیل کے گرد تار لپیٹ کر کرنٹ گزارنے سے برقی مقناطیس بنتا ہے جو گھنٹی اور کرین میں استعمال ہوتا ہے۔", "د اوسپنې میخ شاوخوا ته د تار تاوولو او برېښنا تیرولو سره برقي مقناطیس جوړیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Outside a bar magnet, magnetic field lines always travel from:",
                    questionUr = "مقناطیس کے باہر مقناطیسی خطوطِ قوت ہمیشہ کس طرف جاتے ہیں؟",
                    questionPs = "د مقناطیس بهر مقناطیسي کرښې تل له کومې خوا کومې خوا ته ځي؟",
                    options = listOf("North Pole to South Pole", "South Pole to North Pole", "Centre to edges", "East to West"),
                    correctIndex = 0,
                    explanationEn = "Magnetic field lines go from the North pole to the South pole outside the magnet.",
                    explanationUr = "مقناطیسی خطوط شمالی قطب سے جنوبی قطب کی طرف جاتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "How can you increase the strength of an electromagnet?",
                    questionUr = "برقی مقناطیس (Electromagnet) کی طاقت کیسے بڑھائی جا سکتی ہے؟",
                    questionPs = "د برقي مقناطیس ځواک څنګه زیاتیدی شي؟",
                    options = listOf("Increase the number of turns in the coil and electric current", "Use a plastic core", "Switch off the battery", "Use fewer turns"),
                    correctIndex = 0,
                    explanationEn = "More coil turns and higher current make the electromagnet stronger.",
                    explanationUr = "تار کے چکروں کی تعداد اور کرنٹ بڑھانے سے برقی مقناطیس طاقتور ہو جاتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which of these metals is strongly attracted by a magnet?",
                    questionUr = "ان میں سے کون سی دھات کو مقناطیس اپنی طرف کھینچتا ہے؟",
                    questionPs = "له دې فلزاتو څخه کوم یو مقناطیس ځان ته راکاږي؟",
                    options = listOf("Iron, Nickel, and Cobalt", "Gold and Silver", "Copper and Aluminium", "Lead and Zinc"),
                    correctIndex = 0,
                    explanationEn = "Iron, Nickel, and Cobalt are magnetic materials.",
                    explanationUr = "لوہا، نکل اور کوبالٹ مقناطیسی مادے ہیں۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 11,
            titleEn = "Unit 11: Technology in Everyday Life",
            titleUr = "یونٹ 11: روزمرہ زندگی میں ٹیکنالوجی",
            titlePs = "یونټ 11: په ورځني ژوند کې ټیکنالوژي",
            subtitleEn = "Pages 133–150 • Drip Irrigation, Yogurt & Cheese Making, Solar Oven & Simple Circuit",
            badgeEmoji = "🛠️",
            color = Color(0xFF1DE9B6),
            lessons = listOf(
                Class4LessonItem("🌱", "Growing Plants & Drip Irrigation", "پودوں کی کاشت اور ڈرپ ایریگیشن", "د بوټو کرل او څاڅکي اوبه خور", "Drip and sprinkler irrigation conserve water by delivering water directly to plant roots.", "ڈرپ ایریگیشن سے پانی ضائع ہوئے بغیر قطرہ قطرہ پودوں کی جڑوں تک پہنچتا ہے۔", "د څاڅکو اوبه خور سیسټم اوبه سپموي او مستقیم د بوټو ریښو ته رسیږي."),
                Class4LessonItem("🥛", "Making Yogurt and Cheese", "دہی اور پنیر بنانا", "مستې او پنیر جوړول", "Beneficial bacteria (Lactobacillus) ferment warm milk into nutritious yogurt.", "مفید بیکٹیریا نیم گرم دودھ کو جما کر صحت بخش دہی میں تبدیل کرتے ہیں۔", "ګټور باکتریا توده شیدې په مستو بدلوي."),
                Class4LessonItem("☀️", "Solar Oven & DIY Projects", "سولر اوون اور سائنسی ماڈلز", "سولر تنور او ساینسي ماډلونه", "A solar oven uses aluminum foil reflectors and black paper to trap solar heat and cook food.", "سولر اوون ایلومینیم فوائل اور سیاہ سطح کی مدد سے سورج کی حرارت جمع کر کے کھانا پکاتا ہے۔", "سولر تنور د لمر تودوخه راټولوي او خواړه پخوي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Why is the inside base of a Solar Oven painted black?",
                    questionUr = "سولر اوون کے اندرونی پیندے کو کالا رنگ کیوں کیا جاتا ہے؟",
                    questionPs = "د سولر تنور دننه برخه ولې توره رنګول کیږي؟",
                    options = listOf("Black surfaces absorb maximum heat energy", "Black reflects all light", "Black cools the oven", "Just for decoration"),
                    correctIndex = 0,
                    explanationEn = "Dark/black surfaces are excellent absorbers of heat radiation.",
                    explanationUr = "سیاہ سطح سورج کی حرارت کو سب سے زیادہ جذب کرتی ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which beneficial microorganisms convert milk into yogurt?",
                    questionUr = "کون سے مفید خوردبینی جاندار دودھ کو دہی میں تبدیل کرتے ہیں؟",
                    questionPs = "کوم ګټور مایکرو اورګانیزمونه شیدې په مستو بدلوي؟",
                    options = listOf("Helpful Bacteria (Lactobacillus)", "Viruses", "Mosquitoes", "Algae"),
                    correctIndex = 0,
                    explanationEn = "Lactic acid bacteria ferment milk into yogurt.",
                    explanationUr = "مفید بیکٹیریا دودھ کو دہی میں بدلتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Which irrigation method saves maximum water in dry areas?",
                    questionUr = "خشک علاقوں میں پانی بچانے کا سب سے بہترین طریقہِ آبپاشی کون سا ہے؟",
                    questionPs = "په وچو سیمو کې د اوبو سپمولو غوره طریقه کومه ده؟",
                    options = listOf("Drip Irrigation", "Flooding fields", "Open canals", "Bucket pouring"),
                    correctIndex = 0,
                    explanationEn = "Drip irrigation delivers water drop by drop directly to the roots.",
                    explanationUr = "ڈرپ ایریگیشن سے پانی براہِ راست جڑوں کو ملتا ہے اور ضائع نہیں ہوتا۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 12,
            titleEn = "Unit 12: Solar System",
            titleUr = "یونٹ 12: نظامِ شمسی (Solar System)",
            titlePs = "یونټ 12: لمریز نظام (Solar System)",
            subtitleEn = "Pages 151–162 • Sun, 8 Planets, Asteroids, Comets, Meteors & Artificial Satellites",
            badgeEmoji = "🪐",
            color = Color(0xFF00B8D4),
            lessons = listOf(
                Class4LessonItem("☀️", "The Sun & 8 Planets", "سورج اور آٹھ سیارے", "لمر او اته سیارې", "Order from Sun: Mercury, Venus, Earth, Mars (Inner/Rocky), Jupiter, Saturn, Uranus, Neptune (Outer/Gas Giants).", "سورج کے گرد چکر لگانے والے 8 سیارے: عطارد، زہرہ، زمین، مریخ، مشتری، زحل، یورینس اور نیپچون۔", "د لمر شاوخوا 8 سیارې: عطارد، زهره، ځمکه، مریخ، مشتري، زحل، یورینس او نیپچون."),
                Class4LessonItem("☄️", "Asteroids, Comets & Meteors", "سیارچے، دمدار تارے اور شہابِ ثاقب", "کوچنۍ سیارې، لکۍ لرونکي ستوري او شهاب", "The Asteroid Belt lies between Mars and Jupiter. Comets are icy bodies that form a glowing tail near the Sun.", "مریخ اور مشتری کے درمیان سیارچوں کی پٹی (Asteroid Belt) ہے۔ دمدار تارے برف اور گرد سے بنے ہوتے ہیں۔", "د مریخ او مشتري ترمنځ د کوچنیو سیارو کمربند دی."),
                Class4LessonItem("🛰️", "Natural & Artificial Satellites", "قدرتی اور مصنوعی سیارچے", "طبیعي او مصنوعي سپوږمکۍ", "The Moon is Earth's natural satellite. Artificial satellites (like PakTES-1A, PRSS-1) help in GPS, weather forecasting, and communication.", "چاند زمین کا قدرتی سیارچہ ہے جبکہ مصنوعی سیارچے موسم، جی پی ایس اور مواصلات میں کام آتے ہیں۔", "سپوږمۍ د ځمکې طبیعي سپوږمکۍ ده او مصنوعي سپوږمکۍ په مخابراتو او هوا پیژندنه کې مرسته کوي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Which is the largest planet in our Solar System?",
                    questionUr = "ہمارے نظامِ شمسی کا سب سے بڑا سیارہ کون سا ہے؟",
                    questionPs = "زموږ په لمریز نظام کې ترټولو لویه سیاره کومه ده؟",
                    options = listOf("Jupiter", "Mercury", "Mars", "Earth"),
                    correctIndex = 0,
                    explanationEn = "Jupiter is the largest planet in the Solar System.",
                    explanationUr = "مشتری (Jupiter) نظامِ شمسی کا سب سے بڑا سیارہ ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Between which two planets does the Asteroid Belt lie?",
                    questionUr = "سیارچوں کی پٹی (Asteroid Belt) کن دو سیاروں کے درمیان واقع ہے؟",
                    questionPs = "د کوچنیو سیارو کمربند (Asteroid Belt) د کومو دوو سیارو ترمنځ دی؟",
                    options = listOf("Mars and Jupiter", "Earth and Venus", "Mercury and Venus", "Saturn and Uranus"),
                    correctIndex = 0,
                    explanationEn = "The asteroid belt orbits between Mars and Jupiter.",
                    explanationUr = "سیارچوں کی پٹی مریخ اور مشتری کے درمیان واقع ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which celestial object develops a bright glowing tail when it passes close to the Sun?",
                    questionUr = "سورج کے قریب سے گزرتے وقت کس فلکی جسم کی چمکدار دم بن جاتی ہے؟",
                    questionPs = "کله چې لمر ته نږدې تیریږي د کوم اسماني جسم روښانه لکۍ جوړیږي؟",
                    options = listOf("Comet", "Moon", "Asteroid", "Artificial Satellite"),
                    correctIndex = 0,
                    explanationEn = "A comet's ice vaporizes near the Sun, forming a glowing tail pointing away from the Sun.",
                    explanationUr = "دمدار تارے (Comet) کی برف سورج کی گرمی سے پگھل کر چمکدار دم بناتی ہے۔"
                )
            )
        )
    )

    // =========================================================================
    // 4. COMPUTER SCIENCE CLASS 6 (All 6 Units — Pages 1–94)
    // =========================================================================
    val computerStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Unit 1: ICT Fundamentals",
            titleUr = "یونٹ 1: آئی سی ٹی کے بنیادی اصول",
            titlePs = "یونټ 1: د معلوماتي ټیکنالوژۍ اساسات",
            subtitleEn = "Pages 1–17 • Hardware, Software, System vs Application Software & Input/Output Devices",
            badgeEmoji = "💻",
            color = Color(0xFF536DFE),
            lessons = listOf(
                Class4LessonItem("🖥️", "ICT, Hardware & Software", "آئی سی ٹی، ہارڈویئر اور سافٹ ویئر", "هارډویر او سافټویر", "Hardware refers to physical parts you can touch (CPU, Monitor, Keyboard). Software is a set of instructions that tells hardware what to do.", "جن حصوں کو ہم چھو سکتے ہیں وہ ہارڈویئر اور پروگرامز کے مجموعے کو سافٹ ویئر کہتے ہیں۔", "فزیکي برخې هارډویر او پروګرامونه سافټویر بلل کیږي."),
                Class4LessonItem("⚙️", "System vs Application Software", "سسٹم اور ایپلی کیشن سافٹ ویئر", "سیستم او اپلیکیشن سافټویر", "System software (Windows, Android, Linux) manages the computer. Application software (MS Word, Paint, Scratch) helps users perform specific tasks.", "ونڈوز اور اینڈرائیڈ سسٹم سافٹ ویئر ہیں جبکہ ایم ایس ورڈ اور پینٹ ایپلی کیشن سافٹ ویئر ہیں۔", "وینډوز او انډرایډ سیستم سافټویر دي او ایم ایس ورډ اپلیکیشن سافټویر دی."),
                Class4LessonItem("🖨️", "Input, Processing, Storage & Output", "ان پٹ، پراسیسنگ، اسٹوریج اور آؤٹ پٹ", "ان پټ، پروسسنګ، ذخیره او آوټ پټ", "Input (Keyboard, Mouse, Scanner, Mic) → CPU (Processor) → Output (Monitor, Printer, Speakers) & Storage (SSD, Hard Disk, USB).", "کی بورڈ ان پٹ دیتا ہے، سی پی یو پراسیس کرتا ہے اور مانیٹر/پرنٹر آؤٹ پٹ دکھاتے ہیں۔", "کیبورډ معلومات داخلوي، CPU یې پروسس کوي او مانیټر یې ښیي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Which of the following is an example of System Software?",
                    questionUr = "درج ذیل میں سے کون سا سسٹم سافٹ ویئر کی مثال ہے؟",
                    questionPs = "له لاندې څخه کوم یو د سیستم سافټویر بیلګه ده؟",
                    options = listOf("Operating System (Windows / Android)", "MS Paint", "Calculator App", "Video Game"),
                    correctIndex = 0,
                    explanationEn = "An Operating System is system software that manages computer hardware.",
                    explanationUr = "آپریٹنگ سسٹم (ونڈوز/اینڈرائیڈ) سسٹم سافٹ ویئر ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which device is known as the 'Brain of the Computer'?",
                    questionUr = "کمپیوٹر کا دماغ کس پرزے کو کہا جاتا ہے؟",
                    questionPs = "د کمپیوټر دماغ کومې برخې ته ویل کیږي؟",
                    options = listOf("CPU (Central Processing Unit)", "Mouse", "Printer", "Speaker"),
                    correctIndex = 0,
                    explanationEn = "The CPU performs all calculations and processing.",
                    explanationUr = "سی پی یو (CPU) کو کمپیوٹر کا دماغ کہا جاتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which of these is an Input device?",
                    questionUr = "ان میں سے کون سا آلہ ان پٹ ڈیوائس ہے؟",
                    questionPs = "له دې څخه کومه وسیله د ان پټ (Input) وسیله ده؟",
                    options = listOf("Scanner & Microphone", "Printer", "Monitor", "Headphones"),
                    correctIndex = 0,
                    explanationEn = "Scanners and microphones send data into the computer.",
                    explanationUr = "اسکینر اور مائیکروفون کمپیوٹر میں ڈیٹا داخل کرنے والے ان پٹ آلات ہیں۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Unit 2: Digital Skills",
            titleUr = "یونٹ 2: ڈیجیٹل مہارتیں",
            titlePs = "یونټ 2: ډیجیټل مهارتونه",
            subtitleEn = "Pages 18–50 • File Management, MS Paint 3D, Word Processing (MS Word) & Internet Search",
            badgeEmoji = "📝",
            color = Color(0xFF00E5FF),
            lessons = listOf(
                Class4LessonItem("📁", "Files, Folders & Shortcuts", "فائلز، فولڈرز اور شارٹ کٹس", "فایلونه، فولډرونه او لنډلارې", "Ctrl+C copies, Ctrl+X cuts, Ctrl+V pastes, Ctrl+Z undoes, and Ctrl+S saves your document.", "Ctrl+C کاپی، Ctrl+V پیسٹ اور Ctrl+S فائل محفوظ کرنے کے لیے استعمال ہوتے ہیں۔", "Ctrl+C د کاپي، Ctrl+V د پیسټ او Ctrl+S د فایل خوندي کولو لپاره کارول کیږي."),
                Class4LessonItem("🎨", "Image Editing & Paint 3D", "پینٹ اور تھری ڈی ماڈلنگ", "پینټ او 3D انځورګري", "Paint 3D allows cropping, rotating, adding text, 2D shapes, and 3D objects.", "پینٹ تھری ڈی میں تصاویر کو کراپ کرنے اور تھری ڈی اشکال بنانے کی سہولت ہوتی ہے۔", "په Paint 3D کې انځورونه او درې اړخیز شکلونه جوړیږي."),
                Class4LessonItem("📄", "Word Processing (MS Word)", "ایم ایس ورڈ میں ٹائپنگ اور فارمیٹنگ", "په MS Word کې لیکل او فارمیټ کول", "Formatting text: Bold (Ctrl+B), Italic (Ctrl+I), Underline (Ctrl+U), bullet lists, tables, and page alignment.", "ٹیکسٹ کو موٹا کرنے کے لیے Ctrl+B اور ترچھا کرنے کے لیے Ctrl+I دباتے ہیں۔", "د لیکلو غټولو لپاره Ctrl+B او کوږولو لپاره Ctrl+I کارول کیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Which keyboard shortcut is used to Copy selected text or files?",
                    questionUr = "منتخب شدہ ٹیکسٹ یا فائل کو کاپی (Copy) کرنے کی شارٹ کٹ کی کیا ہے؟",
                    questionPs = "د غوره شوي متن یا فایل د کاپي کولو لنډلاره کومه ده؟",
                    options = listOf("Ctrl + C", "Ctrl + V", "Ctrl + P", "Ctrl + Z"),
                    correctIndex = 0,
                    explanationEn = "Ctrl + C copies and Ctrl + V pastes.",
                    explanationUr = "Ctrl + C کاپی کرنے کی شارٹ کٹ ہے۔"
                ),
                Class4Exercise(
                    questionEn = "In MS Word, which shortcut makes the selected text Bold?",
                    questionUr = "ایم ایس ورڈ میں الفاظ کو نمایاں/موٹا (Bold) کرنے کی شارٹ کٹ کیا ہے؟",
                    questionPs = "په MS Word کې د تورو د غټولو (Bold) لنډلاره کومه ده؟",
                    options = listOf("Ctrl + B", "Ctrl + I", "Ctrl + U", "Ctrl + S"),
                    correctIndex = 0,
                    explanationEn = "Ctrl + B applies Bold formatting.",
                    explanationUr = "Ctrl + B سے تحریر بولڈ ہو جاتی ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which software is a Web Browser used to visit websites?",
                    questionUr = "ویب سائٹس کھولنے کے لیے کون سا ویب براؤزر استعمال ہوتا ہے؟",
                    questionPs = "د ویب پاڼو د کتلو لپاره کوم ویب براوزر کارول کیږي؟",
                    options = listOf("Google Chrome / Microsoft Edge", "MS Paint", "Notepad", "Calculator"),
                    correctIndex = 0,
                    explanationEn = "Google Chrome and Microsoft Edge are web browsers.",
                    explanationUr = "گوگل کروم اور مائیکروسافٹ ایج ویب براؤزر ہیں۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Unit 3: Algorithmic Thinking & Problem Solving",
            titleUr = "یونٹ 3: الگورتھمک سوچ اور مسائل کا حل",
            titlePs = "یونټ 3: الګوریتمي فکر او د ستونزو حل",
            subtitleEn = "Pages 51–62 • Problem Analysis, Algorithms, Sequence, Selection (If-Else) & Loops",
            badgeEmoji = "🧩",
            color = Color(0xFF00E676),
            lessons = listOf(
                Class4LessonItem("🪜", "What is an Algorithm?", "الگورتھم کیا ہے؟", "الګوریتم څه شی دی؟", "An algorithm is a finite, step-by-step set of clear instructions to solve a problem.", "کسی مسئلے کو حل کرنے کے مرحلہ وار اور واضح اقدامات کو الگورتھم کہتے ہیں۔", "د یوې ستونزې د حل لپاره ګام په ګام لارښوونو ته الګوریتم وایي."),
                Class4LessonItem("🔀", "Sequence and Conditional Statements (If-Else)", "ترتیب اور شرطیہ بیانات", "ترتیب او شرطي بیانونه", "Sequence executes steps in order. Selection (If-Then-Else) makes decisions based on a condition.", "شرطیہ بیان (If-Else) میں شرط درست یا غلط ہونے کی بنیاد پر فیصلہ کیا جاتا ہے۔", "په شرطي بیان (If-Else) کې د شرط پر بنسټ پریکړه کیږي."),
                Class4LessonItem("🔁", "Repetition / Loops", "تکرار (Loops)", "تکرار (Loops)", "A loop repeats a block of instructions multiple times (finite loop) or forever (infinite loop).", "ایک ہی عمل کو بار بار دہرانے کے لیے لوپ (Loop) استعمال کیا جاتا ہے۔", "د یو کار د تکرار لپاره لوپ (Loop) کارول کیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "A step-by-step procedure written to solve a specific problem is called an:",
                    questionUr = "کسی مسئلے کو حل کرنے کے لیے لکھے گئے مرحلہ وار طریقہ کار کو کیا کہتے ہیں؟",
                    questionPs = "د یوې ستونزې د حل لپاره ګام په ګام طرزالعمل ته څه ویل کیږي؟",
                    options = listOf("Algorithm", "Hardware", "Virus", "Monitor"),
                    correctIndex = 0,
                    explanationEn = "An algorithm is a step-by-step problem-solving procedure.",
                    explanationUr = "مرحلہ وار طریقہ کار کو الگورتھم کہتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "Which construct is used when an algorithm needs to choose between two actions based on a condition?",
                    questionUr = "جب کسی شرط کی بنیاد پر دو راستوں میں سے ایک کا انتخاب کرنا ہو تو کیا استعمال ہوتا ہے؟",
                    questionPs = "کله چې د شرط پر بنسټ پریکړه کیږي کوم جوړښت کارول کیږي؟",
                    options = listOf("Conditional statement (If-Then-Else)", "Printer", "Scanner", "Speaker"),
                    correctIndex = 0,
                    explanationEn = "If-Then-Else is a conditional selection statement.",
                    explanationUr = "فیصلہ سازی کے لیے If-Then-Else استعمال ہوتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Repeating a set of instructions 10 times is an example of a:",
                    questionUr = "ہدایات کے ایک سیٹ کو 10 بار دہرانا کس کی مثال ہے؟",
                    questionPs = "د لارښوونو 10 ځله تکرارول د څه بیلګه ده؟",
                    options = listOf("Finite Loop (Repetition)", "Syntax Error", "Hardware failure", "Shut down"),
                    correctIndex = 0,
                    explanationEn = "A loop with a fixed number of repetitions is a finite loop.",
                    explanationUr = "مقررہ تعداد تک دہرانے کو متناہی لوپ (Finite Loop) کہتے ہیں۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Unit 4: Programming (Scratch)",
            titleUr = "یونٹ 4: پروگرامنگ (Scratch)",
            titlePs = "یونټ 4: پروګرامینګ (Scratch)",
            subtitleEn = "Pages 63–73 • Block Coding in Scratch, Sprites, Motion, Looks, Events, Variables & Debugging",
            badgeEmoji = "🐱",
            color = Color(0xFFFF6D00),
            lessons = listOf(
                Class4LessonItem("🐱", "Scratch Interface: Stage, Sprite & Blocks", "اسکریچ انٹرفیس، اسپرائٹ اور بلاکس", "د سکریچ انټرفیس، سپرایټ او بلاکونه", "In Scratch, characters/objects are called Sprites, and the background area where action happens is the Stage.", "اسکریچ میں کردار کو اسپرائٹ (Sprite) اور پس منظر کو اسٹیج (Stage) کہتے ہیں۔", "په سکریچ کې کرکټر ته Sprite او شالید ته Stage ویل کیږي."),
                Class4LessonItem("🧱", "Motion, Looks, Sound & Control Blocks", "موشن، لکس، ساؤنڈ اور کنٹرول بلاکس", "د حرکت، غږ او کنټرول بلاکونه", "'Move 10 steps' is a Motion block; 'Say Hello' is a Looks block; 'When green flag clicked' is an Events block.", "'When green flag clicked' پروگرام شروع کرتا ہے اور 'Move 10 steps' اسپرائٹ کو حرکت دیتا ہے۔", "'When green flag clicked' پروګرام پیلوي او 'Move 10 steps' حرکت ورکوي."),
                Class4LessonItem("🐞", "Variables & Debugging", "متغیر اور ڈی بگنگ (غلطی دور کرنا)", "متغیر او ډیبګینګ", "A variable stores changing values like Score or Timer. Debugging means finding and fixing errors (bugs) in a program.", "پروگرام میں اسکور رکھنے کے لیے Variable اور غلطیاں درست کرنے کے عمل کو Debugging کہتے ہیں۔", "په پروګرام کې د تیروتنو موندلو او سمولو ته Debugging وایي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "In Scratch, what is a character or object that performs actions on the Stage called?",
                    questionUr = "اسکریچ (Scratch) میں اسٹیج پر حرکت کرنے والے کردار کو کیا کہتے ہیں؟",
                    questionPs = "په سکریچ کې هغه کرکټر چې په سټیج کې عمل ترسره کوي څه بلل کیږي؟",
                    options = listOf("Sprite", "Browser", "Folder", "Modem"),
                    correctIndex = 0,
                    explanationEn = "Characters in Scratch are called Sprites (the default sprite is the Scratch Cat).",
                    explanationUr = "اسکریچ کے کردار کو اسپرائٹ (Sprite) کہتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "What is the process of finding and removing errors from a computer program called?",
                    questionUr = "کمپیوٹر پروگرام میں سے غلطیاں تلاش کر کے دور کرنے کے عمل کو کیا کہتے ہیں؟",
                    questionPs = "په کمپیوټر پروګرام کې د تیروتنو موندلو او لرې کولو ته څه ویل کیږي؟",
                    options = listOf("Debugging", "Formatting", "Booting", "Printing"),
                    correctIndex = 0,
                    explanationEn = "Errors in code are called bugs, and fixing them is called debugging.",
                    explanationUr = "پروگرام کی غلطی (Bug) کو ٹھیک کرنا Debugging کہلاتا ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which block category in Scratch contains 'When Green Flag Clicked'?",
                    questionUr = "'When Green Flag Clicked' بلاک کس کیٹیگری میں ہوتا ہے؟",
                    questionPs = "'When Green Flag Clicked' بلاک په کومه کټګورۍ کې دی؟",
                    options = listOf("Events", "Motion", "Sound", "Pen"),
                    correctIndex = 0,
                    explanationEn = "'When Green Flag Clicked' is an Events block that triggers scripts.",
                    explanationUr = "یہ بلاک Events کیٹیگری میں پایا جاتا ہے۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Unit 5: Digital Citizenship",
            titleUr = "یونٹ 5: ڈیجیٹل شہریت اور آن لائن حفاظت",
            titlePs = "یونټ 5: ډیجیټل تابعیت او آنلاین خوندیتوب",
            subtitleEn = "Pages 74–84 • Digital Ethics, Cyberbullying, Strong Passwords, Plagiarism & Ergonomics",
            badgeEmoji = "🛡️",
            color = Color(0xFFAA00FF),
            lessons = listOf(
                Class4LessonItem("🔐", "Online Safety & Strong Passwords", "آن لائن حفاظت اور مضبوط پاس ورڈ", "آنلاین خوندیتوب او قوي پاسورډ", "Never share your password or personal address with strangers online. Use strong passwords mixing letters, numbers, and symbols.", "اپنا پاس ورڈ اور ذاتی معلومات کبھی اجنبیوں کو نہ بتائیں۔ مضبوط پاس ورڈ میں حروف، اعداد اور علامات شامل کریں۔", "خپل پاسورډ او شخصي معلومات هیڅکله له پردیو سره مه شریکوئ."),
                Class4LessonItem("🤝", "Cyber Ethics & Anti-Plagiarism", "سائبر اخلاقیات اور سرقہ سے بچاؤ", "سایبر اخلاق او له غلا څخه مخنیوی", "Be polite online, avoid cyberbullying, and always give credit to the original author instead of copying (plagiarism).", "آن لائن گفتگو میں شائستگی اختیار کریں اور کسی کا کام اپنے نام سے پیش (Plagiarism) نہ کریں۔", "آنلاین درناوی وکړئ او د نورو کار په خپل نوم مه خپروئ."),
                Class4LessonItem("🪑", "Health & Computer Ergonomics", "کمپیوٹر استعمال کرتے وقت صحت کے اصول", "د کمپیوٹر کارولو روغتیایي اصول", "Sit with a straight back, keep the monitor at eye level, and take regular breaks (20-20-20 rule) to protect your eyes.", "کمپیوٹر استعمال کرتے وقت کمر سیدھی رکھیں اور آنکھوں کو آرام کے لیے وقفہ دیں۔", "د کمپیوټر کارولو پر مهال ملا نیغه ونیسئ او سترګو ته دمه ورکړئ.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Copying someone else's work or text from the internet and presenting it as your own is called:",
                    questionUr = "انٹرنیٹ سے کسی دوسرے کی تحریر یا کام چرا کر اپنے نام سے پیش کرنا کیا کہلاتا ہے؟",
                    questionPs = "د بل چا کار یا لیکنه کاپي کول او په خپل نوم ښودل څه بلل کیږي؟",
                    options = listOf("Plagiarism", "Debugging", "Programming", "Animation"),
                    correctIndex = 0,
                    explanationEn = "Plagiarism is stealing and passing off another's work as one's own.",
                    explanationUr = "اسے علمی سرقہ (Plagiarism) کہتے ہیں جو غیر اخلاقی عمل ہے۔"
                ),
                Class4Exercise(
                    questionEn = "Which of the following is the strongest password?",
                    questionUr = "ان میں سے کون سا پاس ورڈ سب سے زیادہ محفوظ اور مضبوط ہے؟",
                    questionPs = "له لاندې څخه کوم پاسورډ ترټولو قوي او خوندي دی؟",
                    options = listOf("Kp#2026@Bk9", "123456", "password", "abcdef"),
                    correctIndex = 0,
                    explanationEn = "A strong password combines uppercase, lowercase, numbers, and special symbols.",
                    explanationUr = "مضبوط پاس ورڈ میں بڑے اور چھوٹے حروف، ہندسے اور خاص علامات ہوتی ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "What should you do if someone bullies or threatens you online?",
                    questionUr = "اگر کوئی آن لائن آپ کو تنگ کرے یا دھمکی دے تو آپ کو کیا کرنا چاہیے؟",
                    questionPs = "که څوک تاسو آنلاین وځوروي نو تاسو باید څه وکړئ؟",
                    options = listOf("Immediately inform your parents or teacher and block/report the user", "Share your home address", "Send your password", "Keep it secret"),
                    correctIndex = 0,
                    explanationEn = "Always tell a trusted adult (parents/teachers) and block the bully.",
                    explanationUr = "فوراً اپنے والدین یا استاد کو بتائیں اور اس اکاؤنٹ کو بلاک کریں۔"
                )
            )
        ),
        Class4StageData(
            stageNumber = 6,
            titleEn = "Unit 6: Entrepreneurship in Digital Age",
            titleUr = "یونٹ 6: ڈیجیٹل دور میں کاروبار (Entrepreneurship)",
            titlePs = "یونټ 6: په ډیجیټل دوره کې متشبثیت او سوداګري",
            subtitleEn = "Pages 85–94 • Entrepreneurs, E-Commerce, Digital Marketing & Online Payments",
            badgeEmoji = "🚀",
            color = Color(0xFFFFAB00),
            lessons = listOf(
                Class4LessonItem("💡", "Who is an Entrepreneur?", "انٹرپرینیور (کاروباری اختراع کار) کون ہے؟", "متشبث (Entrepreneur) څوک دی؟", "An entrepreneur identifies a need or problem and starts a business offering innovative products or services.", "جو شخص نئے خیال کے ساتھ کاروبار شروع کرے اور مسائل کا حل پیش کرے اسے انٹرپرینیور کہتے ہیں۔", "هغه څوک چې په نوي فکر سوداګري پیلوي متشبث بلل کیږي."),
                Class4LessonItem("🛒", "Digital Entrepreneurship & E-Commerce", "ڈیجیٹل کاروبار اور ای کامرس", "ډیجیټل سوداګري او اي کامرس", "Buying and selling goods or services over the internet using websites and mobile apps is called E-Commerce.", "انٹرنیٹ، ویب سائٹس اور موبائل ایپس کے ذریعے خرید و فروخت کو ای کامرس کہتے ہیں۔", "د انټرنیټ له لارې پیر او پلور ته E-Commerce ویل کیږي."),
                Class4LessonItem("💳", "Digital Marketing & Online Payments", "ڈیجیٹل مارکیٹنگ اور آن لائن ادائیگی", "ډیجیټل بازارموندنه او آنلاین تادیات", "Businesses reach customers through social media, search engines, and mobile wallets / bank transfers.", "ڈیجیٹل مارکیٹنگ سے مصنوعات پوری دنیا کے گاہکوں تک پہنچائی جاتی ہیں۔", "د ډیجیټل بازارموندنې له لارې محصولات پیرودونکو ته ورپیژندل کیږي.")
            ),
            exercises = listOf(
                Class4Exercise(
                    questionEn = "Buying and selling products or services over the internet is known as:",
                    questionUr = "انٹرنیٹ کے ذریعے اشیاء اور خدمات کی خرید و فروخت کیا کہلاتی ہے؟",
                    questionPs = "د انټرنیټ له لارې د توکو او خدماتو پیر او پلور ته څه ویل کیږي؟",
                    options = listOf("E-Commerce (Electronic Commerce)", "Hardware repair", "Formatting", "Debugging"),
                    correctIndex = 0,
                    explanationEn = "E-Commerce stands for Electronic Commerce.",
                    explanationUr = "انٹرنیٹ پر کاروبار کو ای کامرس (Electronic Commerce) کہتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "A person who creates and runs a new business to solve problems is called an:",
                    questionUr = "نیا کاروبار شروع کرنے اور چلانے والے شخص کو کیا کہتے ہیں؟",
                    questionPs = "هغه کس چې نوې سوداګري پیلوي او پرمخ یې وړي څه بلل کیږي؟",
                    options = listOf("Entrepreneur", "Compiler", "Browser", "Router"),
                    correctIndex = 0,
                    explanationEn = "An entrepreneur innovates and builds a business.",
                    explanationUr = "ایسے شخص کو انٹرپرینیور (Entrepreneur) کہتے ہیں۔"
                ),
                Class4Exercise(
                    questionEn = "What is a major advantage of a digital business over a traditional shop?",
                    questionUr = "روایتی دکان کے مقابلے میں ڈیجیٹل کاروبار کا سب سے بڑا فائدہ کیا ہے؟",
                    questionPs = "دودیز دوکان په پرتله د ډیجیټل سوداګرۍ لویه ګټه څه ده؟",
                    options = listOf("It can reach customers anywhere 24/7", "It closes every hour", "It cannot show pictures", "Only one neighbour can buy"),
                    correctIndex = 0,
                    explanationEn = "Online stores are accessible 24/7 to customers across the country and world.",
                    explanationUr = "آن لائن کاروبار چوبیس گھنٹے اور ہر جگہ کے گاہکوں کے لیے کھلا رہتا ہے۔"
                )
            )
        )
    )
}
