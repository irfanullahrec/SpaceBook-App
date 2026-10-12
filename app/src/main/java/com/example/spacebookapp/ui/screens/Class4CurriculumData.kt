package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

enum class Class4BookType(
    val storyId: String,
    val titleEn: String,
    val titleUr: String,
    val titlePs: String,
    val subtitle: String,
    val accentColor: Color,
    val secondaryColor: Color
) {
    ENGLISH(
        storyId = "story-class4-english",
        titleEn = "English Class 4",
        titleUr = "انگلش جماعت چہارم",
        titlePs = "انګلیسي څلورم ټولګی",
        subtitle = "All 13 Units • Pages 1–140",
        accentColor = Color(0xFF1D4ED8),
        secondaryColor = Color(0xFF0F172A)
    ),
    MATHS(
        storyId = "story-class4-maths",
        titleEn = "Maths Class 4",
        titleUr = "ریاضی جماعت چہارم",
        titlePs = "ریاضي څلورم ټولګی",
        subtitle = "All 10 Units • Pages 1–186",
        accentColor = Color(0xFF0D9488),
        secondaryColor = Color(0xFF115E59)
    ),
    SCIENCE(
        storyId = "story-class4-science",
        titleEn = "Science Class 4",
        titleUr = "جنرل سائنس جماعت چہارم",
        titlePs = "جنرل ساینس څلورم ټولګی",
        subtitle = "All 10 Chapters • Pages 1–128",
        accentColor = Color(0xFF0284C7),
        secondaryColor = Color(0xFF075985)
    ),
    ISLAMIAT(
        storyId = "story-class4-islamiat",
        titleEn = "Islamiat Class 4",
        titleUr = "اسلامیات جماعت چہارم",
        titlePs = "اسلامیات څلورم ټولګی",
        subtitle = "All 20 Lessons (Babs 1–7) • Pages 1–103",
        accentColor = Color(0xFF059669),
        secondaryColor = Color(0xFF064E3B)
    ),
    PASHTO(
        storyId = "story-class4-pashto",
        titleEn = "Pashto Class 4",
        titleUr = "پشتو جماعت چہارم",
        titlePs = "پښتو څلورم ټولګی",
        subtitle = "All 32 Lessons • Pages 1–128",
        accentColor = Color(0xFF7C3AED),
        secondaryColor = Color(0xFF4C1D95)
    ),
    SOCIAL_STUDY(
        storyId = "story-class4-social",
        titleEn = "Social Study Class 4",
        titleUr = "معاشرتی علوم جماعت چہارم",
        titlePs = "ټولنیز علوم څلورم ټولګی",
        subtitle = "All 6 Chapters • Pages 1–124",
        accentColor = Color(0xFFEA580C),
        secondaryColor = Color(0xFF9A3412)
    ),
    URDU(
        storyId = "story-class4-urdu",
        titleEn = "Urdu Class 4",
        titleUr = "اردو جماعت چہارم",
        titlePs = "اردو څلورم ټولګی",
        subtitle = "تمام 23 اسباق • صفحات 1–150",
        accentColor = Color(0xFFDB2777),
        secondaryColor = Color(0xFF831843)
    )
}

enum class Class4MiniGameMode {
    MATCH_CARDS,       // Match concept/term with its meaning or answer
    SEQUENCE_ORDER     // Tap steps/items in their proper sequence
}

data class Class4ConceptCard(
    val heading: String,
    val subHeading: String,
    val detailEn: String,
    val detailUr: String,
    val detailPs: String,
    val badgeColor: Color
)

data class Class4StageData(
    val id: Int,
    val unitLabel: String,
    val pageRange: String,
    val titleEn: String,
    val titleUr: String,
    val titlePs: String,
    val summaryEn: String,
    val summaryUr: String,
    val summaryPs: String,
    val gamePromptEn: String,
    val gamePromptUr: String,
    val gamePromptPs: String,
    val gameMode: Class4MiniGameMode = Class4MiniGameMode.MATCH_CARDS,
    val sequenceItems: List<String> = emptyList(),
    val cards: List<Class4ConceptCard>,
    val quizzes: List<NazeraQuizQuestion>
)

object Class4CurriculumRepository {

    fun stagesFor(book: Class4BookType): List<Class4StageData> = when (book) {
        Class4BookType.ENGLISH -> englishStages
        Class4BookType.MATHS -> mathsStages
        Class4BookType.SCIENCE -> scienceStages
        Class4BookType.ISLAMIAT -> Class4IslamiatSocialData.islamiatStages
        Class4BookType.PASHTO -> Class4PashtoUrduData.pashtoStages
        Class4BookType.SOCIAL_STUDY -> Class4IslamiatSocialData.socialStages
        Class4BookType.URDU -> Class4PashtoUrduData.urduStages
    }

    private val colors = listOf(
        Color(0xFF1D4ED8), Color(0xFF059669), Color(0xFF7C3AED), Color(0xFFD97706)
    )

    private fun unitStage(
        id: Int,
        unitLabel: String,
        pageRange: String,
        titleEn: String,
        titleUr: String,
        titlePs: String,
        summaryEn: String,
        summaryUr: String,
        summaryPs: String,
        c1: Triple<String, String, String>,
        c2: Triple<String, String, String>,
        c3: Triple<String, String, String>,
        c4: Triple<String, String, String>,
        q1: NazeraQuizQuestion,
        q2: NazeraQuizQuestion
    ): Class4StageData = Class4StageData(
        id = id,
        unitLabel = unitLabel,
        pageRange = pageRange,
        titleEn = titleEn,
        titleUr = titleUr,
        titlePs = titlePs,
        summaryEn = summaryEn,
        summaryUr = summaryUr,
        summaryPs = summaryPs,
        gamePromptEn = "Match each concept of $unitLabel with its correct answer!",
        gamePromptUr = "$unitLabel کے تصورات کو ان کے درست جواب سے ملائیں!",
        gamePromptPs = "د $unitLabel مفهومونه له سم ځواب سره وصل کړئ!",
        cards = listOf(
            Class4ConceptCard(c1.first, c1.second, c1.third, c1.second, c1.third, colors[0]),
            Class4ConceptCard(c2.first, c2.second, c2.third, c2.second, c2.third, colors[1]),
            Class4ConceptCard(c3.first, c3.second, c3.third, c3.second, c3.third, colors[2]),
            Class4ConceptCard(c4.first, c4.second, c4.third, c4.second, c4.third, colors[3])
        ),
        quizzes = listOf(q1, q2)
    )

    // 1. CLASS 4 ENGLISH (All 13 Individual Units, Pages 1–140)
    private val englishStages = listOf(
        unitStage(
            1, "Unit 1", "Pages 01–12",
            "Great Caliphs of Islam",
            "اسلام کے عظیم خلفاء (خلفائے راشدین)",
            "د اسلام ستر خلیفه ګان (خلفای راشدین)",
            "Learn about the Four Rightly Guided Caliphs (Hazrat Abu Bakr, Umar, Usman, and Ali RA), sense of fair play, respect for elders, vowel sounds, routine greetings, and Collective/Countable/Uncountable Nouns.",
            "چاروں خلفائے راشدین کا عدل و انصاف اور رحم دلی، بڑوں کا احترام، روٹین کے سلام و آداب، واول آوازیں اور گرامر میں Collective، Countable اور Uncountable Nouns۔",
            "د څلورو خلیفه ګانو عدل او مهرباني، د مشرانو درناوی، د انګلیسي غږونه او نومونه.",
            Triple("The Four Rightly Guided Caliphs", "Hazrat Abu Bakr, Umar, Usman & Ali (RA)", "Role models of justice, truthfulness, generosity, and bravery."),
            Triple("Routine Greetings & Fair Play", "Assalamu Alaikum • Good Morning • How are you?", "Polite formulaic expressions used in daily conversation."),
            Triple("Collective Nouns", "A flock of birds • A herd of cattle • A bouquet of flowers", "A noun that names a group of people, animals, or things."),
            Triple("Countable & Uncountable Nouns", "Countable: Books, Pens • Uncountable: Water, Milk, Sand", "Countable nouns have plural forms; uncountable nouns cannot be counted one by one."),
            NazeraQuizQuestion("Which of these is a Collective Noun?", "ان میں سے کون سا لفظ Collective Noun (اسمِ جمع) ہے؟", "په لاندې تورو کې کوم یو Collective Noun دی؟", "Unit 1 Grammar", listOf("Flock / Herd (ریوڑ / جھنڈ)", "Water", "Quickly"), 0),
            NazeraQuizQuestion("Which of these is an Uncountable Noun?", "ان میں سے کون سا اسم Uncountable (نہ گنا جانے والا) ہے؟", "کوم نوم نه شمېرل کېدونکی (Uncountable) دی؟", "Countable vs Uncountable", listOf("Milk / Water (دودھ / پانی)", "Chair", "Pencil"), 0)
        ),
        unitStage(
            2, "Unit 2", "Pages 13–21",
            "Beauty of Nature (Poem)",
            "فطرت کی خوبصورتی (ماحول اور شجرکاری)",
            "د طبیعت ښکلا (چاپېریال او ونې کرل)",
            "Celebrate trees, rivers, and clean drinking water; understand climate change; pronounce Silent Letters (k in knee/knife, w in write/wrist, b in lamb/comb); and use Articles (a, an, the) and Adjectives.",
            "قدرتی ماحول کی خوبصورتی، صاف پانی، شجرکاری، موسمیاتی تبدیلی، Silent Letters (جیسے Knife میں K، Write میں W) اور Articles (a, an, the) کا استعمال۔",
            "د طبیعت ښکلا، پاکې اوبه، ونې کرل، غلي توري (Silent Letters) او Articles (a, an, the).",
            Triple("Planting Trees & Clean Water", "Trees give oxygen & shade • Save clean drinking water", "Protecting nature and planting trees helps fight climate change."),
            Triple("Silent Letters (k, w, b)", "Knife, Knee (Silent k) • Write, Wrong (Silent w) • Lamb, Comb (Silent b)", "Letters that are spelled in a word but not pronounced aloud."),
            Triple("Introducing Self & Others", "'Hello, my name is...' • 'Meet my friend...'", "Polite ways to introduce yourself and your classmates."),
            Triple("Articles: A, An, The", "An apple, An umbrella (Vowel sound) • A book, A tree (Consonant sound)", "Use 'an' before vowel sounds (a, e, i, o, u) and 'a' before consonant sounds."),
            NazeraQuizQuestion("Which letter is SILENT in the word 'WRITE'?", "لفظ 'WRITE' میں کون سا حرف خاموش (Silent) ہے؟", "د 'WRITE' په کلیمه کې کوم توری غلی (Silent) دی؟", "W R I T E", listOf("W", "R", "T"), 0),
            NazeraQuizQuestion("Which article comes before '___ honest boy' / '___ apple'?", "خالی جگہ میں کون سا Article آئے گا: '___ apple'؟", "له 'apple' مخکې کوم توری راځي؟", "Articles", listOf("An", "A", "They"), 0)
        ),
        unitStage(
            3, "Unit 3", "Pages 22–33",
            "The Journey of Chocolate + Review-1",
            "چاکلیٹ کا سفر (کوکو کے بیج سے چاکلیٹ تک) + جائزہ 1",
            "د چاکلېټ سفر (له کوکو دانو تر چاکلېټو) + بیاکتنه ۱",
            "Discover how cocoa pods are harvested, fermented, dried, roasted, and made into chocolate bars. Practice Diphthongs (oi/oy, ou/ow), expressing likes/dislikes, Action Verbs, and Present Continuous Tense.",
            "کوکو کے درخت کی پھلیوں سے مزیدار چاکلیٹ بننے کے مراحل، Diphthongs (دوہری واول آوازیں جیسے boy, cloud)، پسند و ناپسند کا اظہار اور فعل حال جاری۔",
            "له کوکو دانو څخه د چاکلېټ جوړولو پړاوونه، Diphthongs او د خوښې څرګندول.",
            Triple("Where Chocolate Comes From", "Cocoa tree pods ➔ Cocoa beans ➔ Roasting ➔ Mixing with milk & sugar", "Cocoa trees grow in warm tropical countries."),
            Triple("Diphthongs (Two Vowel Sounds)", "Oil, Coin, Boy (/oi/) • Cloud, House, Cow (/ou/)", "A diphthong is a glide from one vowel sound to another in the same syllable."),
            Triple("Expressing Likes & Dislikes", "'I like dark chocolate.' • 'I do not like junk food.'", "Sharing preferences politely in conversation."),
            Triple("Action Verbs & Mind Maps", "Harvest, Roast, Grind, Melt, Mould", "Using a mind map to summarize the steps of a process."),
            NazeraQuizQuestion("From which tree's beans is chocolate made?", "چاکلیٹ کس درخت کے بیجوں سے بنائی جاتی ہے؟", "چاکلېټ د کومې ونې له دانو څخه جوړېږي؟", "🍫 Chocolate", listOf("Cocoa Tree (کوکو کا درخت)", "Neem Tree", "Pine Tree"), 0),
            NazeraQuizQuestion("Which word contains a Diphthong sound (/oi/)?", "ان میں سے کس لفظ میں Diphthong آواز (/oi/) موجود ہے؟", "په کومه کلیمه کې د Diphthong (/oi/) غږ شته؟", "Diphthongs", listOf("Coin / Boy", "Cat", "Pen"), 0)
        ),
        unitStage(
            4, "Unit 4", "Pages 34–44",
            "The Pride of Pakistan",
            "فخرِ پاکستان (شہدائے وطن اور نشانِ حیدر)",
            "د پاکستان ویاړ (د وطن شهیدان او نشانِ حیدر)",
            "Honour the brave martyrs of Pakistan who received Nishan-e-Haider (Captain Raja Muhammad Sarwar Shaheed, Major Tufail, Major Aziz Bhatti, Pilot Rashid Minhas, Captain Karnal Sher Khan, Havildar Lalak Jan). Learn Degrees of Adjectives (Positive, Comparative, Superlative).",
            "پاکستان کا سب سے بڑا فوجی اعزاز 'نشانِ حیدر' پانے والے بہادر شہداء (کیپٹن سرور شہید، میجر عزیز بھٹی، راشد منہاس، کرنل شیر خان شہید) اور صفت کی تین ڈگریاں (Tall, Taller, Tallest)۔",
            "د پاکستان تر ټولو لوړه نظامي جایزه 'نشان حیدر' او د صفت درې درجې (Degrees of Adjectives).",
            Triple("Nishan-e-Haider", "Highest military gallantry award of Pakistan (meaning 'Mark of the Lion')", "Named after Hazrat Ali (RA), the Lion of Allah."),
            Triple("Heroes of KP & Pakistan", "Capt. Karnal Sher Khan Shaheed (Swabi) • Rashid Minhas • Major Aziz Bhatti", "Brave soldiers who sacrificed their lives defending our homeland."),
            Triple("Degrees of Regular Adjectives", "Brave ➔ Braver ➔ Bravest • High ➔ Higher ➔ Highest", "Positive (1), Comparative (-er for 2), Superlative (-est for 3 or more)."),
            Triple("Capitalization & Proper Nouns", "Pakistan, Nishan-e-Haider, Swabi, August", "Always begin proper nouns, holidays, and special events with a capital letter."),
            NazeraQuizQuestion("What is the Superlative degree of the adjective 'BRAVE'?", "صفت 'BRAVE' کی تیسری ڈگری (Superlative Degree) کیا ہے؟", "د 'BRAVE' صفت درېیمه درجه (Superlative) کومه ده؟", "Degrees of Adjective", listOf("Bravest", "Braver", "More brave"), 0),
            NazeraQuizQuestion("Which Nishan-e-Haider recipient belonged to Swabi, Khyber Pakhtunkhwa?", "نشانِ حیدر پانے والے کس شہید کا تعلق صوابی (خیبر پختونخوا) سے تھا؟", "د نشان حیدر ګټونکی کوم شهید د صوابۍ (خیبر پښتونخوا) و؟", "🇵🇰 Hero of KP", listOf("Captain Karnal Sher Khan Shaheed (کیپٹن کرنل شیر خان شہید)", "Vasco da Gama", "Marco Polo"), 0)
        ),
        unitStage(
            5, "Unit 5", "Pages 45–54",
            "Thank You, Lord (Poem)",
            "اے اللہ تیرا شکر ہے (نظم — شکر گزاری)",
            "ای الله ستا شکر دی (نظم — شکر ایستل)",
            "Poem thanking Almighty Allah for eyes to see, ears to hear, family, food, sunshine, and peace. Practice Initial & Final Consonant Clusters (str-, scr-, spl-, -pts, -lps, -mps), Homophones, and Compound Words.",
            "اللہ تعالیٰ کی نعمتوں (آنکھیں، کان، والدین، سورج، پھول) پر شکر گزاری کی نظم۔ گرامر میں Consonant Clusters (str-, spl-, -mps)، ہم آواز الفاظ (Homophones) اور Compound Words۔",
            "د الله تعالی د نعمتونو د شکر نظم، Consonant Clusters، همغږي توري (Homophones) او مرکب توري.",
            Triple("Gratitude to Allah", "Thanking Allah every morning for life, health, family & nature", "A grateful heart brings happiness and peace."),
            Triple("Consonant Clusters", "Initial: Straight (str-), Splash (spl-) • Final: Lamps (-mps), Helps (-lps)", "Two or three consonants blended together where each sound is heard."),
            Triple("Homophones (Same Sound)", "Sun / Son • Sea / See • Weak / Week • Right / Write", "Words that sound the same but have different spellings and meanings."),
            Triple("Compound Words", "Rain + Bow = Rainbow • Tooth + Brush = Toothbrush", "Two words joined together to form one new word."),
            NazeraQuizQuestion("Which word starts with the three-letter consonant cluster 'SPL-'?", "ان میں سے کون سا لفظ 'SPL-' کے Consonant Cluster سے شروع ہوتا ہے؟", "کومه کلیمه په 'SPL-' پیلېږي؟", "Consonant Cluster", listOf("Splash / Splendid", "Park", "Table"), 0),
            NazeraQuizQuestion("Which word is formed by joining 'SUN' + 'FLOWER'?", "'SUN' اور 'FLOWER' کو ملانے سے کون سا Compound Word بنتا ہے؟", "د 'SUN' او 'FLOWER' له یوځای کېدو کومه کلیمه جوړېږي؟", "🌻 Compound Word", listOf("Sunflower", "Raindrop", "Bookshop"), 0)
        ),
        unitStage(
            6, "Unit 6", "Pages 55–66",
            "Valuing Others + Review-2",
            "دوسروں کی قدر کرنا (ہمدردی اور احترام) + جائزہ 2",
            "د نورو قدر او درناوی کول + بیاکتنه ۲",
            "Learn empathy, kindness toward differently-abled people, and forgiving friends. Practice Use of 'the', Modal Verbs for permission and ability ('May I...?', 'Can / Cannot'), Personal & Possessive Pronouns.",
            "معذور اور خصوصی افراد کی مدد کرنا، سب کے ساتھ احترام سے پیش آنا، اجازت اور صلاحیت کے لیے Modal Verbs (May, Can, Cannot) اور Pronouns (ضمائر) کی مشق۔",
            "له ځانګړو او معذورو کسانو سره مرسته او مهرباني، او په ګرامر کې Modal Verbs (May, Can) او Pronouns.",
            Triple("Caring for Differently-Abled People", "Help blind or wheelchair-bound persons with respect, never mock anyone", "Every human being deserves dignity, kindness, and equal care."),
            Triple("Asking Permission ('May')", "'May I come in?' • 'May I borrow your pencil?'", "Use 'May' to ask for or give permission politely."),
            Triple("Showing Ability ('Can / Cannot')", "'I can swim.' • 'A penguin cannot fly.'", "Use 'can' for ability and 'cannot / can't' for inability."),
            Triple("Personal & Possessive Pronouns", "I ➔ My/Mine • We ➔ Our/Ours • He ➔ His • She ➔ Her/Hers • They ➔ Their", "Pronouns replace nouns to avoid repetition."),
            NazeraQuizQuestion("Which word is used to ask for permission politely: '___ I come in, Sir?'", "مودبانہ اجازت مانگنے کے لیے خالی جگہ میں کیا آئے گا: '___ I come in, Sir?'", "د مودبانه اجازې غوښتلو لپاره تش ځای ډک کړئ: '___ I come in, Sir?'", "Asking Permission", listOf("May", "Did", "Were"), 0),
            NazeraQuizQuestion("How should we treat differently-abled (disabled) people in our surroundings?", "ہمیں اپنے اردگرد خصوصی (معذور) افراد کے ساتھ کیسا برتاؤ کرنا چاہیے؟", "موږ باید له معذورو او ځانګړو کسانو سره څنګه چلند وکړو؟", "🤝 Valuing Others", listOf("Help and respect them kindly (ان کی مدد اور احترام کرنا چاہیے)", "Laugh at them", "Ignore them"), 0)
        ),
        unitStage(
            7, "Unit 7", "Pages 67–77",
            "Colours of Pakistan",
            "پاکستان کے رنگ (صوبوں کی ثقافت اور تہوار)",
            "د پاکستان رنګونه (د صوبو کلتور او مېلې)",
            "Explore the cultures, dresses, foods, and festivals of Khyber Pakhtunkhwa, Punjab, Sindh, Balochistan, Gilgit-Baltistan, and Azad Jammu & Kashmir. Practice Long Vowel Sounds, Prepositions of Place/Time, and Directions.",
            "خیبر پختونخوا، پنجاب، سندھ، بلوچستان، گلگت بلتستان اور آزاد کشمیر کی ثقافت، شندور پولو فیسٹیول، سبی میلہ، Long Vowel Sounds اور سمت و جگہ بتانے والے الفاظ۔",
            "د خیبر پښتونخوا، پنجاب، سندهـ، بلوچستان، ګلګت بلتستان او کشمیر کلتور او Long Vowel غږونه.",
            Triple("Festivals Across Pakistan", "Shandur Polo (Chitral/GB) • Sibi Mela (Balochistan) • Jashn-e-Baharan (Punjab)", "Cultural festivals showcase traditional sports, handicrafts, and unity."),
            Triple("Long Vowel Sounds", "Cake (a), Tree (e), Kite (i), Boat (o), Cube (u)", "When a vowel says its own alphabet name in a word."),
            Triple("Giving & Following Directions", "Turn left • Turn right • Go straight • Opposite the bank", "Clear phrases used to guide someone to a destination."),
            Triple("Prepositions of Position", "In, On, Under, Behind, Between, In front of", "Words that show where a person or object is located."),
            NazeraQuizQuestion("Where is the famous highest polo ground festival (Shandur Polo Festival) held?", "دنیا کے بلند ترین پولو گراؤنڈ کا مشہور 'شندور پولو فیسٹیول' کہاں منعقد ہوتا ہے؟", "د نړۍ تر ټولو لوړې پولو میدان مشهوره مېله (شندور) چیرې ترسره کېږي؟", "🐎 Colours of Pakistan", listOf("Chitral / Gilgit-Baltistan border (چترال / گلگت بلتستان)", "Karachi beach", "Thar desert"), 0),
            NazeraQuizQuestion("Which word has a LONG 'E' vowel sound (/ee/)?", "ان میں سے کس لفظ میں لمبی 'E' (Long Vowel) آواز ہے؟", "په کومه کلیمه کې اوږد 'E' غږ شته؟", "Long Vowel", listOf("Tree / Green", "Bed", "Pen"), 0)
        ),
        unitStage(
            8, "Unit 8", "Pages 78–86",
            "Good Study Habits",
            "مطالعے کی اچھی عادات (وقت کا نظام الاوقات)",
            "د مطالعې ښه عادتونه (د وخت مهالوېش)",
            "Develop effective study habits: making a daily timetable, listening attentively in class, taking notes, keeping books neat, and revising daily. Practice Short Vowel Sounds, expressing regret ('I am sorry'), Similes, and Adverbs.",
            "کامیاب طالب علم کی عادات: ٹائم ٹیبل بنانا، جماعت میں توجہ سے سننا، روزانہ کا کام روزانہ کرنا۔ گرامر میں Short Vowel Sounds، معذرت کرنا اور تشبیہات (Similes)۔",
            "د بریالي زده کوونکي عادتونه، مهالوېش جوړول، لنډ واول غږونه او تشبیهات (Similes).",
            Triple("Habits of a Successful Student", "Make a daily timetable • Listen to the teacher • Revise lessons daily", "Regular study prevents exam stress and builds deep understanding."),
            Triple("Short Vowel Sounds", "Cat (/a/), Bed (/e/), Pin (/i/), Pot (/o/), Sun (/u/)", "Quick, short vowel sounds in simple CVC words."),
            Triple("Similes (Comparisons with 'as')", "As busy as a bee • As brave as a lion • As white as snow • As slow as a tortoise", "A simile compares two things using 'as...as' or 'like'."),
            Triple("Expressing Regret Politely", "'I am sorry for being late.' • 'Excuse me, please.'", "Admitting a mistake politely is a sign of good character."),
            NazeraQuizQuestion("Complete the English simile: 'As brave as a ___'", "انگلش تشبیہ (Simile) مکمل کریں: 'As brave as a ___'", "تشبیه بشپړه کړئ: 'As brave as a ___'", "🦁 Simile", listOf("Lion (شیر)", "Mouse", "Leaf"), 0),
            NazeraQuizQuestion("What helps a student manage study time, homework, and play balanced every day?", "روزانہ پڑھائی، ہوم ورک اور کھیل کا وقت متوازن رکھنے میں کون سی چیز مدد دیتی ہے؟", "کوم شی زده کوونکي سره د وخت په تنظیم کې مرسته کوي؟", "📅 Good Study Habits", listOf("A Daily Study Timetable (روزانہ کا ٹائم ٹیبل)", "Watching TV all night", "Skipping school"), 0)
        ),
        unitStage(
            9, "Unit 9", "Pages 87–97",
            "Manners + Review-3",
            "اخلاق اور آداب (صحت و صفائی اور گفتگو کے آداب) + جائزہ 3",
            "ښه اخلاق او اداب (پاکوالی او خبرې اترې) + بیاکتنه ۳",
            "Practice good manners at home, school, and dining table; understand personal hygiene and safe medicine use; master the Three Sounds of '-ed' (/t/, /d/, /id/) in Simple Past Tense.",
            "گھر، اسکول اور کھانے کی میز کے آداب،’Please‘ اور ’Thank You‘ کہنا، ڈاکٹر کے مشورے کے بغیر دوا نہ کھانا، اور ماضی کے لاحقے '-ed' کی تین مختلف آوازیں (/t/, /d/, /id/)۔",
            "د کور، ښوونځي او خوراک اداب، له ډاکټر پرته دوا نه خوړل او د '-ed' درې غږونه.",
            Triple("Golden Words of Good Manners", "Please • Thank You • Excuse Me • You're Welcome", "Polite words spread kindness and respect everywhere."),
            Triple("Table & Hygiene Manners", "Wash hands before & after meals • Chew with mouth closed • Never take medicine without a doctor/parent", "Clean habits keep us healthy and safe."),
            Triple("Three Sounds of Past '-ed'", "1. /t/: Walked, Jumped • 2. /d/: Played, Cleaned • 3. /id/: Wanted, Planted", "Regular past verbs end in '-ed' but have three distinct ending sounds."),
            Triple("Simple Past Tense", "Subject + 2nd Form of Verb (She helped her mother yesterday)", "Used for actions completed in the past."),
            NazeraQuizQuestion("Which ending sound does '-ed' make in the word 'WANTED'?", "لفظ 'WANTED' میں '-ed' کی کون سی آواز نکلتی ہے؟", "د 'WANTED' په کلیمه کې '-ed' کوم غږ ورکوي؟", "-ed Sounds", listOf("/id/ sound", "/k/ sound", "/m/ sound"), 0),
            NazeraQuizQuestion("Should children ever take any medicine on their own without asking parents or a doctor?", "کیا بچوں کو والدین یا ڈاکٹر سے پوچھے بغیر خود کوئی دوا کھانی چاہیے؟", "ایا ماشومان باید له مور پلار یا ډاکټر پرته پخپله دوا وخوري؟", "💊 Medicine Safety", listOf("No, never! Always ask parents or a doctor (ہرگز نہیں! ہمیشہ والدین یا ڈاکٹر سے پوچھیں)", "Yes, anytime", "Only sweet syrups"), 0)
        ),
        unitStage(
            10, "Unit 10", "Pages 98–106",
            "Be Aware, Be Safe",
            "ہوشیار رہیں، محفوظ رہیں (اجنبیوں سے بچاؤ اور حفاظتی اصول)",
            "پوه اوسئ، خوندي اوسئ (له نااشنا خلکو او خطرونو ځان ساتل)",
            "Learn personal and emergency safety: never accept gifts, sweets, or rides from strangers; tell your parents immediately; know school fire/earthquake evacuation drills; practice Weak Forms of 'and, of, or, but' and Question Words (Wh- words).",
            "اجنبی لوگوں سے کوئی کھلونا یا مٹھائی نہ لینا اور فوراً والدین کو بتانا؛ اسکول اور کھیل کے میدان میں آگ یا ہنگامی صورتحال سے بچاؤ کی مشق؛ اور سوالیہ الفاظ (Who, What, Where, When, Why)۔",
            "له نااشنا خلکو څخه هیڅ شی نه اخیستل، مور او پلار خبرول، د اور وژنې او خوندیتوب اصول او سوالیه توري.",
            Triple("Stranger Safety Rule", "Never talk to, go with, or accept gifts/sweets from strangers", "In the unit story, Mother teaches Sara and Ahsan never to take a doll or gift from a stranger."),
            Triple("School & Playground Safety", "Know fire extinguishers, emergency exits & evacuation drills", "Walk calmly in a line during safety drills; never push others."),
            Triple("Weak Forms in Speech", "'and', 'of', 'or', 'but' (e.g., bread and butter, cup of tea)", "Connecting words pronounced softly in natural spoken English."),
            Triple("Wh- Question Words", "Who (person) • Where (place) • When (time) • Why (reason) • What (thing)", "Question sentences always end with a Question Mark (?)."),
            NazeraQuizQuestion("What should you do if a stranger offers you a toy, chocolate, or a ride?", "اگر کوئی اجنبی شخص آپ کو کھلونا، چاکلیٹ یا گاڑی میں بیٹھنے کی پیشکش کرے تو آپ کو کیا کرنا چاہیے؟", "که کوم نااشنا کس تاسو ته د لوبو شی یا چاکلېټ درکوي نو څه باید وکړئ؟", "🛡️ Be Aware, Be Safe", listOf("Refuse firmly, walk away & tell parents immediately (صاف انکار کریں اور فوراً والدین کو بتائیں)", "Take the toy secretly", "Go with the stranger"), 0),
            NazeraQuizQuestion("Which question word is used to ask about TIME?", "وقت (Time) کے بارے میں سوال پوچھنے کے لیے کون سا لفظ استعمال ہوتا ہے؟", "د وخت (Time) د پوښتنې لپاره کومه کلیمه کارول کېږي؟", "Wh- Questions", listOf("When (کب / کله)", "Who (کون)", "Where (کہاں)"), 0)
        ),
        unitStage(
            11, "Unit 11", "Pages 107–115",
            "The Fox and The Stork (Fable)",
            "لومڑی اور سارس (اخلاقی کہانی — جیسی کرنی ویسی بھرنی)",
            "ګیدړه او لک لک (اخلاقي کیسه)",
            "Read Aesop's famous fable of the cunning Fox who served soup in a flat plate to the long-beaked Stork, and how the Stork later served dinner in a narrow-necked jar. Moral: Treat others with respect. Practice Intonation, Polite Agreement/Disagreement, and Irregular Past Verbs.",
            "چالاک لومڑی اور لمبی چونچ والے سارس کی مشہور اخلاقی کہانی (Fable)۔ لومڑی نے چپٹی پلیٹ میں سوپ رکھا تو سارس نے اگلی دعوت میں لمبی گردن والی صراحی میں کھانا پیش کیا۔ اخلاقی سبق: دوسروں کے ساتھ ویسا سلوک کرو جیسا تم اپنے لیے پسند کرتے ہو۔",
            "د ګیدړې او لک لک مشهوره اخلاقي کیسه (Fable) چې راښیي له نورو سره باید درناوی او ښه چلند وکړو.",
            Triple("What is a Fable?", "A short story with animal characters that teaches a moral lesson", "In this fable, the characters are a Fox and a Stork."),
            Triple("The Flat Plate & The Narrow Jar", "Fox served soup in a flat dish • Stork served food in a tall, narrow-necked jar", "The Fox could not eat from the narrow jar with his snout and realized his mistake."),
            Triple("Moral of the Story", "Treat others as you wish to be treated; never make fun of guests", "True friendship requires mutual respect and kindness."),
            Triple("Irregular Past Verbs", "Go ➔ Went • Eat ➔ Ate • Make ➔ Made • Come ➔ Came • See ➔ Saw", "Verbs that do not add '-ed' in the past tense."),
            NazeraQuizQuestion("Why couldn't the Stork drink the soup at the Fox's house?", "سارس لومڑی کے گھر سوپ کیوں نہ پی سکا؟", "لک لک ولې د ګیدړې په کور کې شوروا ونه شوه څښلی؟", "🦊🦢 The Fox & The Stork", listOf("Because the soup was served in a flat plate and Stork had a long beak (کیونکہ سوپ چپٹی پلیٹ میں تھا اور سارس کی چونچ لمبی تھی)", "Because the soup was frozen", "Because there was no spoon"), 0),
            NazeraQuizQuestion("What is the past tense (2nd form) of the irregular verb 'GO'?", "فعل 'GO' کی دوسری فارم (Past Tense) کیا ہے؟", "د 'GO' فعل تېره زمانه (دوهم حالت) څه دی؟", "Irregular Verbs", listOf("Went", "Goed", "Going"), 0)
        ),
        unitStage(
            12, "Unit 12", "Pages 116–126",
            "Time to Think! (Traffic Rules & Citizenship)",
            "سوچنے کا وقت! (ٹریفک کے قوانین اور ذمہ دار شہریت)",
            "د فکر کولو وخت! (ترافیکي قوانین او مسوولیت منونکی ښاروند)",
            "Learn traffic safety signs, Zebra Crossing, Traffic Lights (Red = Stop, Yellow = Get Ready, Green = Go), wearing helmets and seatbelts, obeying laws, and respecting human rights. Practice Future Simple Tense ('will') and expressing feelings.",
            "ٹریفک قوانین، زیبرا کراسنگ، ٹریفک سگنل کی تین بتیاں (سرخ = رکیں، پیلی = تیار ہوں، سبز = چلیں)، ہیلمٹ اور سیٹ بیلٹ پہننا، انسانی حقوق کا احترام اور Future Tense (will)۔",
            "ترافیکي قوانین، زیبرا کراسنګ، ترافیکي څراغونه (سور = ودرېږئ، ژېړ = چمتو شئ، شین = ولاړ شئ) او د قانون درناوی.",
            Triple("Traffic Signal Lights", "Red = Stop • Yellow/Amber = Wait & Get Ready • Green = Go safely", "Traffic signals prevent accidents and keep roads orderly."),
            Triple("Pedestrian Safety (Zebra Crossing)", "Always look Right, then Left, then Right again before crossing on Zebra lines", "Never run or play on the road."),
            Triple("Participatory Citizenship", "Obey rules, queue in line, keep streets clean & respect others' rights", "Good citizens follow laws even when no policeman is watching."),
            Triple("Simple Future Tense ('Will')", "'We will obey traffic rules.' • 'I will wear a helmet.'", "Use 'will + 1st form of verb' to talk about future actions and promises."),
            NazeraQuizQuestion("What does the RED light on a traffic signal tell drivers to do?", "ٹریفک سگنل کی سرخ (لال) بتی ڈرائیور کو کیا حکم دیتی ہے؟", "د ترافیکي اشارې سور څراغ چلوونکو ته د څه کولو امر کوي؟", "🚦 Traffic Signal", listOf("STOP behind the line (رک جائیں)", "Drive faster", "Honk the horn"), 0),
            NazeraQuizQuestion("Where should pedestrians safely cross a busy road?", "پیدل چلنے والوں کو سڑک کہاں سے پار کرنی چاہیے؟", "پلي تلونکي باید سړک له کوم ځایه په خوندي توګه پورې باسي؟", "🚶 Road Safety", listOf("At the Zebra Crossing / Pedestrian Bridge (زیبرا کراسنگ سے)", "In the middle of fast traffic", "On a sharp turn"), 0)
        ),
        unitStage(
            13, "Unit 13", "Pages 127–140",
            "Little Things (Poem) + Review-4",
            "چھوٹی چھوٹی چیزیں (نظم — قطرے سے سمندر) + جائزہ 4",
            "واړه شیان (نظم — له څاڅکو سمندر جوړېږي) + بیاکتنه ۴",
            "Read Julia Carney's classic poem 'Little Things' ('Little drops of water, little grains of sand, make the mighty ocean and thebeauteous land; Little deeds of kindness, little words of love, make our earth an Eden, like the heaven above'). Practice Rhythm, Stress, Intonation, Punctuation, and Review-4.",
            "مشہور نظم 'Little Things' سکھاتی ہے کہ پانی کے ننھے قطرے مل کر بڑا سمندر بناتے ہیں، ریت کے ذرات مل کر خوبصورت زمین بناتے ہیں، اور پیار کے چھوٹے بول اور چھوٹی نیکیاں ہماری دنیا کو جنت کی طرح خوشحال بنا دیتی ہیں۔",
            "د 'Little Things' مشهور نظم راښیي چې د اوبو واړه څاڅکي لوی سمندر جوړوي او واړه نېک کارونه زموږ نړۍ د جنت په څېر ښکلې کوي.",
            Triple("Little Drops of Water", "Make the mighty ocean", "Small efforts combined together create great achievements."),
            Triple("Little Grains of Sand", "Make the pleasant / beauteous land", "Every tiny grain matters in building the vast earth."),
            Triple("Little Deeds of Kindness & Words of Love", "Make our earth happy like heaven above", "A smile, a kind word, or a small help makes the world peaceful."),
            Triple("Punctuation & Poetic Rhythm", "Capital letter, Comma (,), Full stop (.), Question mark (?), Exclamation mark (!)", "Reading poetry with proper rhythm, stress, intonation, and facial expressions."),
            NazeraQuizQuestion("According to the poem 'Little Things', what do 'little drops of water' make?", "نظم 'Little Things' کے مطابق پانی کے ننھے قطرے مل کر کیا بناتے ہیں؟", "د 'Little Things' نظم له مخې د اوبو واړه څاڅکي څه شی جوړوي؟", "🌊 Little Things", listOf("The mighty ocean (عظیم الشان سمندر)", "A desert", "A stone"), 0),
            NazeraQuizQuestion("What makes our earth happy like heaven above in the poem 'Little Things'?", "نظم کے مطابق کون سی چیزیں ہماری زمین کو جنت کی طرح خوشگوار بناتی ہیں؟", "د نظم له مخې کوم شیان زموږ ځمکه د جنت په څېر خوشحاله کوي؟", "💝 Kindness", listOf("Little deeds of kindness & little words of love (چھوٹی نیکیاں اور پیار کے بول)", "Fighting and anger", "Loud noise"), 0)
        )
    )

    // 2. CLASS 4 MATHEMATICS (All 10 Individual Units/Sections from TOC, Pages 1–186)
    private val mathsStages = listOf(
        unitStage(
            1, "Unit 1A", "Pages 01–12",
            "Whole Numbers up to 100,000",
            "مکمل اعداد (ایک لاکھ 100,000 تک مقامی قیمت اور موازنہ)",
            "بشپړ عددونه (تر ۱۰۰،۰۰۰ پورې ځایي ارزښت او پرتله)",
            "Read and write numbers up to One Hundred Thousand (100,000) in numerals and words; identify Place Values (Ones, Tens, Hundreds, Thousands, Ten-Thousands, Hundred-Thousands); compare numbers using <, >, =; and arrange in Ascending & Descending order.",
            "ایک لاکھ (100,000) تک اعداد کو ہندسوں اور لفظوں میں پڑھنا اور لکھنا، ہر ہندسے کی مقامی قیمت (Place Value) معلوم کرنا، اعداد کا موازنہ (<, >, =) اور سعودی و نزولی ترتیب (Ascending & Descending Order)۔",
            "تر سل زرو (۱۰۰،۰۰۰) پورې عددونه لوستل او لیکل، ځایي ارزښت (Place Value) او ختونکی/کوزېدونکی ترتیب.",
            Triple("Place Value Chart up to 100,000", "H.Th (100,000) | T.Th (10,000) | Th (1,000) | H (100) | T (10) | O (1)", "In 39,916: 3 is Ten-Thousands (30,000), 9 is Thousands (9,000), 9 is Hundreds (900), 1 is Tens (10), 6 is Ones."),
            Triple("Expanded Form", "45,678 = 40,000 + 5,000 + 600 + 70 + 8", "Writing a number as the sum of the place values of its digits."),
            Triple("Comparing 5-Digit Numbers", "54,321 > 45,321  •  18,200 < 18,900", "Compare digits from left to right starting at the highest place value."),
            Triple("Ascending & Descending Order", "Ascending = Smallest to Largest • Descending = Largest to Smallest", "Ordering numbers step by step."),
            NazeraQuizQuestion("How do we write 'Thirty-nine thousand, nine hundred and sixteen' in numerals?", "'Thirty-nine thousand, nine hundred and sixteen' کو ہندسوں میں کیسے لکھیں گے؟", "'نهه دېرش زره، نهه سوه او شپاړس' په عددونو کې څنګه لیکل کېږي؟", "🐅 Page 1 Tiger Question", listOf("39,916", "30,960", "93,619"), 0),
            NazeraQuizQuestion("What is the place value of 8 in the number 84,520?", "عدد 84,520 میں ہندسہ 8 کی مقامی قیمت (Place Value) کیا ہے؟", "په 84,520 عدد کې د 8 ځایي ارزښت څو دی؟", "84,520", listOf("80,000 (اسّی ہزار / اتیا زره)", "800", "8,000"), 0)
        ),
        unitStage(
            2, "Unit 1B", "Pages 13–21",
            "Addition and Subtraction (5-Digit Numbers)",
            "جمع اور تفریق (پانچ ہندسوں تک کے اعداد)",
            "جمع او تفریق (تر پنځو رقمونو پورې عددونه)",
            "Add and subtract numbers up to 5 digits with and without carrying/borrowing, and solve real-life word problems involving money, population, and distances.",
            "پانچ ہندسوں تک کے اعداد کی حاصل والی اور بغیر حاصل والی جمع (Addition) اور تفریق (Subtraction) اور روزمرہ زندگی کے عبارت والے سوالات۔",
            "تر پنځو رقمونو پورې د عددونو جمع او تفریق او د ورځني ژوند عبارتي پوښتنې.",
            Triple("5-Digit Addition (+)", "34,250 + 15,750 = 50,000", "Add column by column from right (Ones) to left (Ten-Thousands), carrying over when sum ≥ 10."),
            Triple("5-Digit Subtraction (−)", "65,400 − 25,100 = 40,300", "Subtract from right to left; borrow 1 ten from the next column when top digit is smaller."),
            Triple("Checking Subtraction by Addition", "Difference + Subtrahend = Minuend", "You can verify any subtraction answer by adding the result back."),
            Triple("Word Problems Key Words", "'Total / Altogether / Sum' ➔ Add (+) • 'Left / Remaining / Difference' ➔ Subtract (−)", "Identify key words to choose the right operation."),
            NazeraQuizQuestion("What is 24,500 + 15,500?", "24,500 + 15,500 کا مجموعہ کیا ہے؟", "د 24,500 + 15,500 مجموعه څو ده؟", "24,500 + 15,500", listOf("40,000", "30,000", "39,000"), 0),
            NazeraQuizQuestion("A library has 45,800 books. If 12,300 books are issued, how many remain?", "ایک لائبریری میں 45,800 کتابیں ہیں، اگر 12,300 جاری کر دی جائیں تو باقی کتنی بچیں گی؟", "په کتابتون کې له 45,800 کتابونو څخه 12,300 ورکړل شول، څو پاتې شول؟", "45,800 − 12,300", listOf("33,500", "58,100", "23,500"), 0)
        ),
        unitStage(
            3, "Unit 1C", "Pages 22–35",
            "Multiplication and Division",
            "ضرب اور تقسیم (پانچ ہندسوں تک کے اعداد)",
            "ضرب او وېش (تقسیم)",
            "Multiply numbers up to 4 and 5 digits by 1-digit, 2-digit, and 3-digit numbers; divide up to 4-digit numbers by 1-digit and 2-digit divisors; and apply the rule Dividend = Divisor × Quotient + Remainder.",
            "چار اور پانچ ہندسوں والے اعداد کو 1، 2 اور 3 ہندسوں والے اعداد سے ضرب دینا؛ تقسیم کے سوالات حل کرنا اور کلیہ (مقسوم = مقسوم علیہ × حاصلِ قسمت + باقی)۔",
            "د څلور او پنځه رقمي عددونو ضرب او وېش (مقسوم = مقسوم علیه × خارج قسمت + پاتې).",
            Triple("Multiplying by 10, 100, 1000", "45 × 10 = 450 • 45 × 100 = 4,500 • 45 × 1000 = 45,000", "Simply attach one, two, or three zeros to the right of the number."),
            Triple("Multi-Digit Multiplication (×)", "250 × 12 = 3,000", "Multiply by the ones digit first, then by the tens digit (placing a 0 in ones place), and add both partial products."),
            Triple("Long Division (÷)", "848 ÷ 4 = 212 (Remainder = 0)", "Steps: Divide ➔ Multiply ➔ Subtract ➔ Bring down next digit."),
            Triple("Division Verification Formula", "Dividend = (Divisor × Quotient) + Remainder", "The remainder must always be smaller than the divisor."),
            NazeraQuizQuestion("What is 36 × 100?", "36 × 100 کا حاصلِ ضرب کیا ہے؟", "د 36 × 100 ځواب څو دی؟", "36 × 100", listOf("3,600", "360", "36,000"), 0),
            NazeraQuizQuestion("If 840 is divided equally by 4 (840 ÷ 4), what is the Quotient?", "اگر 840 کو 4 پر تقسیم کیا جائے (840 ÷ 4) تو حاصلِ قسمت کیا ہوگا؟", "که 840 پر 4 ووېشل شي (840 ÷ 4) نو ځواب څو دی؟", "840 ÷ 4", listOf("210", "120", "420"), 0)
        ),
        unitStage(
            4, "Unit 2", "Pages 36–49",
            "Factors and Multiples",
            "عاد اور اضعاف (مفرد و مرکب اعداد اور تقسیمی قواعد)",
            "اجزا او مضربونه (مفرد او مرکب عددونه)",
            "Learn Divisibility Rules for 2, 3, 5, and 10; distinguish Prime Numbers (only 2 factors) from Composite Numbers (more than 2 factors); find Prime Factorization (Factor Tree); and find Common Factors & Common Multiples.",
            "2، 3، 5 اور 10 پر تقسیم ہونے کے قواعد؛ مفرد اعداد (Prime Numbers) اور مرکب اعداد (Composite Numbers) میں فرق؛ مفرد تجزی (Prime Factorization)؛ مشترک عاد اور مشترک اضعاف۔",
            "پر ۲، ۳، ۵ او ۱۰ د وېشلو قواعد، مفرد او مرکب عددونه، تجزیه او مشترک مضربونه.",
            Triple("Divisibility Rules (2, 3, 5, 10)", "By 2: Even (0,2,4,6,8) • By 5: Ends in 0 or 5 • By 10: Ends in 0 • By 3: Sum of digits divisible by 3", "E.g., 45 is divisible by 3 (4+5=9) and by 5 (ends in 5)."),
            Triple("Prime vs Composite Numbers", "Prime: 2, 3, 5, 7, 11, 13, 17, 19... • Composite: 4, 6, 8, 9, 10, 12...", "1 is neither prime nor composite; 2 is the only even prime number."),
            Triple("Prime Factorization", "24 = 2 × 2 × 2 × 3  •  18 = 2 × 3 × 3", "Expressing a composite number as a product of prime numbers only."),
            Triple("Factors vs Multiples", "Factors of 12: 1, 2, 3, 4, 6, 12 • Multiples of 12: 12, 24, 36, 48...", "Factors divide a number exactly; Multiples are its multiplication table."),
            NazeraQuizQuestion("Which of these numbers is divisible by BOTH 2 and 5?", "ان میں سے کون سا عدد 2 اور 5 دونوں پر پورا تقسیم ہوتا ہے؟", "کوم عدد پر 2 او 5 دواړو پوره وېشل کېږي؟", "Divisibility Rule", listOf("30 (کیونکہ آخر میں 0 ہے)", "25", "14"), 0),
            NazeraQuizQuestion("What is the Prime Factorization (مفرد تجزی) of 12?", "عدد 12 کی مفرد تجزی (Prime Factorization) کیا ہے؟", "د 12 عدد مفرده تجزیه کومه ده؟", "12 = ?", listOf("2 × 2 × 3", "4 × 3", "6 × 2"), 0)
        ),
        unitStage(
            5, "Unit 3", "Pages 50–70",
            "Fractions (+, −, ×, ÷)",
            "کسورِ عامہ (ہم مخرج، مختلف مخرج، واجب، غیر واجب اور مخلوط کسر)",
            "کسرونه (عام، غیر واجب او مخلوط کسرونه)",
            "Identify Like & Unlike Fractions, Unit Fractions, Proper, Improper, and Mixed Fractions; convert Improper↔Mixed; reduce to Lowest Form; and Add, Subtract, Multiply, and Divide Fractions.",
            "ہم مخرج اور مختلف مخرج کسور، اکائی کسر، واجب، غیر واجب اور مخلوط اعداد کی تبدیلی، کسر کو مختصر ترین شکل میں لکھنا اور کسور کی جمع، تفریق، ضرب اور تقسیم۔",
            "هم مخرجه او بېل مخرجه کسرونه، واجب، غیر واجب او مخلوط کسرونه او د هغوی جمع، تفریق، ضرب او وېش.",
            Triple("Types of Fractions", "Proper (3/5: Num < Den) • Improper (7/4: Num ≥ Den) • Mixed (1 ¾)", "7/4 converts to Mixed number 1 ¾ (since 7 ÷ 4 = 1 remainder 3)."),
            Triple("Equivalent & Lowest Form", "2/4 = 3/6 = 1/2 (Divide top & bottom by common factor)", "Multiplying or dividing numerator and denominator by the same non-zero number gives an equivalent fraction."),
            Triple("Adding & Subtracting Fractions", "Like: 2/7 + 3/7 = 5/7 • Unlike: 1/2 + 1/4 = 2/4 + 1/4 = 3/4", "Make denominators equal before adding or subtracting numerators."),
            Triple("Multiplying & Dividing Fractions", "Multiply: (2/3) × (4/5) = 8/15 • Divide: Multiply by Reciprocal!", "To divide by a fraction, multiply by its reciprocal (flip numerator & denominator)."),
            NazeraQuizQuestion("Convert the improper fraction 7/4 into a Mixed Number (مخلوط عدد):", "غیر واجب کسر 7/4 کو مخلوط عدد (Mixed Fraction) میں تبدیل کریں:", "غیر واجب کسر 7/4 په مخلوط عدد واړوئ:", "7/4 = ?", listOf("1 ¾ (ایک صحیح تین بٹا چار)", "2 ¼", "3 ½"), 0),
            NazeraQuizQuestion("What is (2/5) + (2/5)?", "کسر (2/5) + (2/5) کا جواب کیا ہے؟", "د (2/5) + (2/5) ځواب څو دی؟", "2/5 + 2/5", listOf("4/5", "4/10", "2/10"), 0)
        ),
        unitStage(
            6, "Unit 4", "Pages 71–93",
            "Decimals & Rounding Off",
            "اعشاریہ (دسواں، سوواں، ہزارواں حصہ اور راؤنڈ آف کرنا)",
            "اعشاریه (لسمه، سلمه او زرمه برخه)",
            "Understand Decimals (Tenths 0.1, Hundredths 0.01, Thousandths 0.001); convert Fractions↔Decimals; add, subtract, multiply, and divide decimals by 10, 100, 1000; and Round Off numbers to nearest 10, 100, and whole number.",
            "اعشاریہ کا تصور (دسواں 1/10، سوواں 1/100، ہزارواں 1/1000 حصہ)، کسرِ عام کو اعشاریہ میں بدلنا، اعشاریہ کی جمع، تفریق، ضرب و تقسیم اور اعداد کو قریبی 10، 100 تک راؤنڈ آف (تخمینہ) کرنا۔",
            "د اعشاریې مفهوم، کسر په اعشاریه اړول، د اعشاریې جمع، تفریق، ضرب او Rounding Off.",
            Triple("Decimal Place Values", "0.1 = 1/10 (Tenths) • 0.01 = 1/100 (Hundredths) • 0.001 = 1/1000 (Thousandths)", "In 12.345: 3 is tenths, 4 is hundredths, 5 is thousandths."),
            Triple("Fractions ↔ Decimals", "1/2 = 0.5 • 1/4 = 0.25 • 3/4 = 0.75 • 7/10 = 0.7", "Make denominator 10, 100, or 1000 to write easily as a decimal."),
            Triple("Adding & Multiplying Decimals", "2.4 + 1.5 = 3.9 • 3.25 × 10 = 32.5 • 3.25 × 100 = 325", "Line up decimal points vertically when adding/subtracting; shift point right when multiplying by 10, 100."),
            Triple("Rounding Off (تخمینہ)", "Digit ≥ 5 ➔ Round UP • Digit < 5 ➔ Keep same (e.g., 47 rounds to 50; 3.8 rounds to 4)", "Used for quick estimation."),
            NazeraQuizQuestion("How is the fraction 25/100 written as a Decimal?", "کسر 25/100 کو اعشاریہ (Decimal) میں کیسے لکھتے ہیں؟", "کسر 25/100 په اعشاریه کې څنګه لیکل کېږي؟", "25/100", listOf("0.25", "2.5", "0.025"), 0),
            NazeraQuizQuestion("What do we get when we round off 68 to the nearest 10?", "عدد 68 کو قریبی دس (Nearest 10) تک راؤنڈ آف کرنے سے کیا حاصل ہوگا؟", "که 68 عدد نږدې لسیزې (10) ته راونډ اف کړو څو کېږي؟", "Rounding 68", listOf("70", "60", "100"), 0)
        ),
        unitStage(
            7, "Unit 5A", "Pages 94–112",
            "Measurements (Length, Mass & Capacity)",
            "پیمائش (لمبائی، وزن/کمیت اور گنجائش کی اکائیاں)",
            "اندازه کول (اوږدوالی، وزن او ظرفیت)",
            "Convert and add/subtract metric units of Length (km ↔ m ↔ cm ↔ mm), Mass/Weight (kg ↔ g ↔ mg), and Capacity/Volume (L ↔ mL).",
            "لمبائی کی اکائیاں (کلومیٹر، میٹر، سینٹی میٹر، ملی میٹر)، کمیت/وزن کی اکائیاں (کلوگرام، گرام، ملی گرام) اور گنجائش کی اکائیاں (لیٹر، ملی لیٹر) کی تبدیلی اور جمع و تفریق۔",
            "د اوږدوالي (km, m, cm)، وزن (kg, g) او ظرفیت (L, mL) واحدونه اړول او جمع/تفریق کول.",
            Triple("Length Conversions (لمبائی)", "1 km = 1,000 m • 1 m = 100 cm • 1 cm = 10 mm", "To convert km to m, multiply by 1,000 (e.g., 5 km = 5,000 m)."),
            Triple("Mass / Weight Conversions (وزن)", "1 kg = 1,000 g • 1 g = 1,000 mg", "Half a kilogram (½ kg) = 500 grams."),
            Triple("Capacity / Volume Conversions (گنجائش)", "1 Litre (L) = 1,000 Millilitres (mL)", "Liquids like milk, water, and oil are measured in Litres and Millilitres."),
            Triple("Adding & Subtracting Measurements", "3 km 400 m + 2 km 500 m = 5 km 900 m", "Add or subtract same units together (m with m, km with km)."),
            NazeraQuizQuestion("How many metres (m) are there in 3.5 kilometres (3 km 500 m)?", "3 کلومیٹر اور 500 میٹر میں کل کتنے میٹر ہوتے ہیں؟", "په 3 کیلومتره او 500 متره کې ټول څو متره وي؟", "3 km 500 m = ? m", listOf("3,500 m", "350 m", "35,000 m"), 0),
            NazeraQuizQuestion("In which unit is the capacity of a milk or water bottle measured?", "دودھ یا پانی کی بوتل کی گنجائش (Capacity) کس اکائی میں ماپی جاتی ہے؟", "د شیدو یا اوبو د بوتل ظرفیت په کوم واحد اندازه کېږي؟", "🥛 Capacity", listOf("Litres & Millilitres (لیٹر اور ملی لیٹر)", "Kilometres", "Degrees"), 0)
        ),
        unitStage(
            8, "Unit 5B", "Pages 113–129",
            "Time (12/24-Hour Clock & Calendar)",
            "وقت (12 اور 24 گھنٹے کی گھڑی، گھنٹے، منٹ، سیکنڈ اور کیلنڈر)",
            "وخت (۱۲ او ۲۴ ساعته ساعت، دقیقې، ثانیې او جنتري)",
            "Read time in hours, minutes, and seconds; convert between 12-hour (a.m. / p.m.) and 24-hour clock time; convert Years ↔ Months ↔ Weeks ↔ Days; and add/subtract time durations.",
            "گھڑی پر گھنٹے، منٹ اور سیکنڈ پڑھنا؛ a.m. اور p.m. اور 24 گھنٹے کی گھڑی میں وقت لکھنا؛ سال، مہینے، ہفتے اور دن کی اکائیوں کی تبدیلی اور وقت کی جمع و تفریق۔",
            "په ۱۲ او ۲۴ ساعته ساعت کې وخت لوستل، کال، میاشتې، اوونۍ او ورځې اړول.",
            Triple("a.m. vs p.m. & 24-Hour Clock", "Midnight to Noon = a.m. • Noon to Midnight = p.m. • 2:00 p.m. = 14:00 hours", "Add 12 to p.m. hours (1 p.m. to 11 p.m.) to get 24-hour time."),
            Triple("Hours, Minutes & Seconds", "1 Hour = 60 Minutes • 1 Minute = 60 Seconds • 1 Day = 24 Hours", "Multiply by 60 to convert hours to minutes or minutes to seconds."),
            Triple("Calendar Conversions", "1 Year = 12 Months = 52 Weeks = 365 Days • 1 Week = 7 Days", "A leap year has 366 days (February has 29 days)."),
            Triple("Adding & Subtracting Time", "2 hr 40 min + 1 hr 30 min = 4 hr 10 min (since 70 min = 1 hr 10 min)", "Remember to carry 60 minutes as 1 full hour!"),
            NazeraQuizQuestion("How is '3:00 p.m.' written in the 24-hour clock format?", "سہ پہر '3:00 p.m.' کو 24 گھنٹے کی گھڑی میں کیسے لکھا جاتا ہے؟", "'3:00 p.m.' په ۲۴ ساعته ساعت کې څنګه لیکل کېږي؟", "🕒 24-Hour Clock", listOf("15:00 hours (3 + 12 = 15)", "03:00 hours", "23:00 hours"), 0),
            NazeraQuizQuestion("How many minutes are there in 2 Hours?", "دو گھنٹے (2 Hours) میں کل کتنے منٹ ہوتے ہیں؟", "په دوو ساعتونو (2 Hours) کې ټولې څو دقیقې وي؟", "2 Hours = ? min", listOf("120 Minutes (120 منٹ)", "60 Minutes", "200 Minutes"), 0)
        ),
        unitStage(
            9, "Unit 6", "Pages 130–163",
            "Geometry (Lines, Angles, Perimeter, Area, Symmetry & 3D Shapes)",
            "جیومیٹری (متوازی و عمودی خطوط، زاویے، احاطہ و رقبہ اور متشاکل اشکال)",
            "جیومیټري (کرښې، زاویې، احاطه، مساحت او تناظر)",
            "Identify Horizontal, Vertical, Parallel, and Perpendicular lines; measure and draw Angles with a Protractor (Acute <90°, Right =90°, Obtuse >90°, Straight =180°); calculate Perimeter & Area of Squares and Rectangles; find Lines of Symmetry; and explore 3D solids (Cube, Cuboid, Sphere, Cylinder, Cone).",
            "افقی، عمودی، متوازی (Parallel) اور غیر متوازی خطوط؛ پروٹریکٹر (ڈی) کی مدد سے زاویوں کی پیمائش (حادہ، قائمہ 90°، منفرجہ، مستقیم 180°)؛ مربع اور مستطیل کا احاطہ (Perimeter) اور رقبہ (Area)؛ خطِ تشاکل (Symmetry) اور سہ البعادی اشکال۔",
            "متوازي او عمودي کرښې، په نقاله (Protractor) د زاویو اندازه کول، احاطه او مساحت، او درې بعدي شکلونه.",
            Triple("Lines: Parallel & Perpendicular", "Parallel (||): Never meet (Railway tracks) • Perpendicular (⊥): Meet at 90°", "Horizontal goes left-right; Vertical goes up-down."),
            Triple("Angles & Protractor", "Acute (< 90°) • Right (= 90°) • Obtuse (90° to 180°) • Straight (= 180°)", "A Protractor has inner and outer scales from 0° to 180°."),
            Triple("Perimeter & Area Formulas", "Rectangle Perimeter = 2(L + W), Area = L × W • Square Perimeter = 4 × Side, Area = Side × Side", "Perimeter is measured in cm/m; Area in square units (cm² / m²)."),
            Triple("Symmetry & 3D Solids", "Symmetry: Folds into two identical halves • 3D: Cube (6 square faces), Sphere, Cylinder, Cone", "A square has 4 lines of symmetry; a rectangle has 2."),
            NazeraQuizQuestion("What is the Area of a rectangle with Length = 6 cm and Width = 4 cm?", "ایک مستطیل جس کی لمبائی 6 سم اور چوڑائی 4 سم ہو، اس کا رقبہ (Area = L × W) کیا ہوگا؟", "د هغې مستطیل مساحت څو دی چې اوږدوالی یې 6 cm او سور یې 4 cm وي؟", "Area = 6 × 4", listOf("24 cm²", "10 cm²", "20 cm²"), 0),
            NazeraQuizQuestion("What do we call an angle that is greater than 90° but less than 180°?", "وہ زاویہ جو 90° سے بڑا اور 180° سے چھوٹا ہو کیا کہلاتا ہے؟", "هغه زاویه چې له 90° لویه او له 180° کوچنۍ وي څه بلل کېږي؟", "📐 Angles", listOf("Obtuse Angle (منفرجہ زاویہ)", "Acute Angle (حادہ زاویہ)", "Right Angle (قائمہ زاویہ)"), 0)
        ),
        unitStage(
            10, "Unit 7", "Pages 164–186",
            "Data Handling (Bar Graphs, Line Graphs & Pie Charts)",
            "معلومات کا انتظام (کالمی بار گراف، خطی گراف اور پائی چارٹ)",
            "د معلوماتو جدول او ګرافونه (Bar Graph, Line Graph & Pie Chart)",
            "Read and interpret Horizontal & Vertical Bar Graphs, Line Graphs, and Circle/Pie Charts to answer real-world data questions, followed by Textbook Answers & Glossary.",
            "اعداد و شمار کو ترتیب دینا اور عمودی و افقی بار گراف (Bar Graph)، خطی گراف (Line Graph) اور دائروی پائی چارٹ (Pie Chart) کو پڑھ کر سوالات کے جوابات دینا۔",
            "د بار ګراف، خطي ګراف او پای چارټ لوستل او د پوښتنو ځوابول.",
            Triple("Bar Graph (کالمی گراف)", "Uses vertical or horizontal rectangular bars of equal width", "The height/length of each bar shows the quantity or frequency."),
            Triple("Line Graph (خطی گراف)", "Uses points connected by straight line segments over time", "Great for showing changes in temperature, growth, or scores over days/months."),
            Triple("Pie Chart (دائروی گراف)", "A circle divided into slices/sectors representing fractions of a whole", "The largest slice represents the category with the highest value."),
            Triple("Reading Scales (X-axis & Y-axis)", "Horizontal axis (X-axis) shows categories • Vertical axis (Y-axis) shows scale numbers", "Always check the scale (e.g., 1 box = 5 or 10 units) before reading a graph."),
            NazeraQuizQuestion("Which type of graph uses a CIRCLE divided into sectors/slices to show data?", "کون سا گراف دائرے کے مختلف حصوں (Slices) کے ذریعے معلومات ظاہر کرتا ہے؟", "کوم ګراف د دایرې د برخو په وسیله معلومات ښیي؟", "📊 Graphs", listOf("Pie Chart / Circle Graph (پائی چارٹ)", "Line Graph", "Tally Mark"), 0),
            NazeraQuizQuestion("In a Bar Graph, what does the tallest bar represent?", "بار گراف (Bar Graph) میں سب سے لمبا ستون کیا ظاہر کرتا ہے؟", "په بار ګراف کې تر ټولو لوړه ستنه څه ښیي؟", "📊 Bar Graph", listOf("The highest / greatest quantity (سب سے زیادہ تعداد یا مقدار)", "Zero value", "The smallest number"), 0)
        )
    )

    // 3. CLASS 4 GENERAL SCIENCE (All 10 Individual Chapters, Pages 1–128)
    private val scienceStages = listOf(
        unitStage(
            1, "Chapter 1", "Pages 01–19",
            "Characteristics and Life Processes of Organisms",
            "جانداروں کی خصوصیات اور حیاتیاتی افعال",
            "د ژوندیو موجوداتو ځانګړتیاوې او ژوندۍ پروسې",
            "Compare plants and animals; classify Vertebrates (Fish, Amphibians, Reptiles, Birds, Mammals) and Invertebrates; classify Flowering & Non-flowering plants; understand Biodiversity; study major Human Body Organs (Brain, Heart, Lungs, Stomach, Bones, Muscles, Teeth); and learn functions of Plant Parts (Root, Stem, Leaf, Flower, Seed).",
            "جانوروں کی دو بڑی اقسام (فقاریہ اور غیر فقاریہ)، پودوں کی اقسام (پھولدار اور غیر پھولدار)، حیاتیاتی تنوع، انسانی جسم کے اہم اعضاء (دانت، ہڈیاں، پٹھے، دماغ، پھیپھڑے، دل، معدہ) اور پودے کے حصے۔",
            "د ملا تیر لرونکي او بې ملا تیره ژوي، ګل لرونکي او بې ګله بوټي، د انسان د بدن غړي او د بوټو برخې.",
            Triple("Vertebrates vs Invertebrates", "Vertebrates (Backbone): Fish, Frog, Lizard, Bird, Lion • Invertebrates: Ant, Butterfly, Worm, Starfish", "Animals with a backbone are Vertebrates; those without are Invertebrates."),
            Triple("Flowering vs Non-Flowering Plants", "Flowering: Rose, Mango, Wheat, Apple • Non-Flowering: Pine (Conifer), Fern, Moss", "Flowering plants produce flowers and seeds inside fruits; pine produces cones."),
            Triple("Major Human Organs", "Brain (Controls) • Heart (Pumps blood) • Lungs (Breathing) • Stomach (Digestion) • Bones & Muscles (Movement)", "Four types of teeth: Incisors (cutting), Canines (tearing), Premolars & Molars (grinding)."),
            Triple("Parts of a Plant", "Roots (Absorb water) • Stem (Transports) • Leaf (Makes food by Photosynthesis) • Flower (Makes seeds)", "Leaves are the food factory of a green plant."),
            NazeraQuizQuestion("Which part of a green plant makes food in the presence of sunlight?", "پودے کا کون سا حصہ سورج کی روشنی میں خوراک تیار کرتا ہے؟", "د بوټي کومه برخه د لمر په رڼا کې خواړه جوړوي؟", "🌿 Plant Parts", listOf("Leaf (پتا / پاڼه)", "Root (جڑ)", "Thorn (کانٹا)"), 0),
            NazeraQuizQuestion("Which of these is a Non-Flowering plant that produces cones?", "ان میں سے کون سا پودا غیر پھولدار (Non-flowering) ہے؟", "په لاندې بوټو کې کوم یو بې ګله (Non-flowering) بوټی دی؟", "🌲 Plants", listOf("Pine / Conifer (چیڑ کا درخت)", "Rose (گلاب)", "Mango (آم)"), 0)
        ),
        unitStage(
            2, "Chapter 2", "Pages 20–31",
            "Ecosystem",
            "ماحولیاتی نظام (جاندار و بے جان اجزاء اور غذائی زنجیر)",
            "ایکوسیستم (ژوندي او بې ساه اجزا او غذایي ځنځیر)",
            "Understand an Ecosystem and its Biotic (living: Producers, Consumers, Decomposers) and Abiotic (non-living: Sunlight, Air, Water, Soil, Temperature) components; construct Food Chains (Grass ➔ Deer ➔ Lion); compare Herbivores, Carnivores, and Omnivores; and protect coral reefs and forests.",
            "ماحولیاتی نظام (Ecosystem) کے حیاتیاتی (پیدا کار، صارفین، تحلیل کار) اور غیر حیاتیاتی اجزاء (ہوا، پانی، مٹی، روشنی)؛ خورندوں کی اقسام (سبزی خور، گوشت خور، ہمہ خور) اور غذائی زنجیر (Food Chain)۔",
            "ایکوسیستم، ژوندي او بې ساه اجزا، بوټي خوړونکي، غوښه خوړونکي او غذایي ځنځیر (Food Chain).",
            Triple("Biotic & Abiotic Components", "Biotic (Living): Plants, Animals, Bacteria/Fungi • Abiotic (Non-living): Air, Water, Sunlight, Soil", "Living and non-living things interact together in an ecosystem (forest, desert, pond)."),
            Triple("Producers, Consumers & Decomposers", "Producers: Green Plants • Consumers: Animals • Decomposers: Bacteria & Fungi", "Producers make food using sunlight; Decomposers break down dead matter into soil nutrients."),
            Triple("Herbivores, Carnivores & Omnivores", "Herbivore (Plants): Cow, Goat • Carnivore (Meat): Lion, Eagle • Omnivore (Both): Human, Bear, Crow", "Classified by what they eat."),
            Triple("Food Chain (غذائی زنجیر)", "Sun ➔ Grass (Producer) ➔ Grasshopper ➔ Frog ➔ Snake ➔ Eagle", "Every food chain starts with the Sun and a green plant (Producer)."),
            NazeraQuizQuestion("What are animals that eat BOTH plants and meat (like humans, bears, and crows) called?", "پودے اور گوشت دونوں کھانے والے جانداروں کو کیا کہتے ہیں؟", "هغه ژوي چې هم بوټي او هم غوښه خوري څه بلل کېږي؟", "🐻 Diet Types", listOf("Omnivores (ہمہ خور)", "Herbivores (سبزی خور)", "Producers"), 0),
            NazeraQuizQuestion("With what does every Food Chain on Earth begin?", "ہر غذائی زنجیر (Food Chain) کی شروعات کس جاندار سے ہوتی ہے؟", "هر غذایي ځنځیر له کوم شي پیلېږي؟", "🌱➔🦌➔🦁", listOf("Producers / Green Plants (پودے / پیدا کار)", "Lions", "Rocks"), 0)
        ),
        unitStage(
            3, "Chapter 3", "Pages 32–43",
            "Human Health",
            "انسانی صحت (بیماریاں، متوازن غذا اور صاف پانی)",
            "انساني روغتیا (ناروغۍ، متوازن خواړه او پاکې اوبه)",
            "Distinguish Contagious diseases (Flu, COVID-19, Polio, TB, Hepatitis — spread from person to person) from Non-contagious diseases (Diabetes, Cancer); learn Vaccination & Hygiene; study the Food Groups of a Balanced Diet; and purify water by Boiling and Filtration.",
            "متعدی بیماریاں (فلو، پولیو، ٹی بی، ہیپاٹائٹس جو ایک سے دوسرے کو لگتی ہیں) اور غیر متعدی بیماریاں (شوگر، کینسر)؛ ویکسینیشن؛ متوازن غذا کے اجزاء اور پانی صاف کرنے کے طریقے (ابالنا اور فلٹر کرنا)۔",
            "ساري او غیر ساري ناروغۍ، واکسین، متوازن خواړه (پروټین، ویټامینونه، کاربوهایډرېټ) او د اوبو پاکول.",
            Triple("Contagious vs Non-Contagious Diseases", "Contagious (Spread): Flu, COVID-19, Polio, TB • Non-Contagious: Diabetes, Cancer", "Washing hands, wearing masks, and vaccination prevent contagious diseases."),
            Triple("Balanced Diet Food Groups", "Carbohydrates (Energy) • Proteins (Growth/Meat, Pulses, Milk) • Fats • Vitamins & Minerals (Fruits/Veg)", "Milk is considered a complete diet for growing children."),
            Triple("Maintaining Good Health", "Balanced diet + Drinking 8 glasses of clean water + Daily exercise + 8 hours of sleep", "Healthy habits strengthen our body's immunity."),
            Triple("Purifying Water", "Boiling (kills germs) • Filtration (removes dirt) • Chlorination", "Boiling water for 5–10 minutes kills harmful disease-causing germs."),
            NazeraQuizQuestion("Which of these is a Contagious Disease (متعدی بیماری) that spreads from one person to another?", "ان میں سے کون سی بیماری متعدی (Contagious) ہے جو ایک شخص سے دوسرے کو لگ سکتی ہے؟", "په لاندې ناروغیو کې کومه یوه ساري (Contagious) ده؟", "😷 Health", listOf("Flu / Polio / COVID-19 (زکام / پولیو)", "Broken bone", "Diabetes (شوگر)"), 0),
            NazeraQuizQuestion("Which nutrient group is essential for body growth and repairing muscles (found in meat, eggs, pulses, milk)?", "گوشت، انڈے، دالوں اور دودھ میں پایا جانے والا کون سا غذائی جزو جسمانی نشوونما کے لیے ضروری ہے؟", "په غوښه، هګیو او شیدو کې کومه غذایي برخه ده چې د بدن د ودې لپاره اړینه ده؟", "🥚🥛 Nutrition", listOf("Proteins (پروٹین / لحمیات)", "Dust", "Smoke"), 0)
        ),
        unitStage(
            4, "Chapter 4", "Pages 44–55",
            "Matter and its Characteristics",
            "مادہ اور اس کی خصوصیات (ٹھوس، مائع، گیس اور دھاتیں)",
            "ماده او د هغې ځانګړتیاوې (جامد، مایع، ګاز او فلزات)",
            "Define Matter (anything that has mass and occupies space/volume); compare Solid, Liquid, and Gas based on particle arrangement; classify materials by density (floating vs sinking), solubility, and heat/electrical conductivity; and study properties of Metals (shiny, malleable, conductors).",
            "مادہ کی تعریف (ہر وہ چیز جو کمیت رکھتی ہو اور جگہ گھیرتی ہو)؛ ٹھوس، مائع اور گیس کے ذرات کی ترتیب؛ پانی میں تیرنے اور ڈوبنے والی اشیاء؛ موصل (Conductors) اور غیر موصل (Insulators) اور دھاتوں کی خصوصیات۔",
            "د مادې درې حالتونه (جامد، مایع، ګاز)، د ذراتو ترتیب، هادي (Conductors) او عایق (Insulators) او فلزات.",
            Triple("Three States of Matter", "Solid (Fixed shape & volume) • Liquid (Fixed volume, no fixed shape) • Gas (No fixed shape or volume)", "In solids, particles are tightly packed; in gases, particles move freely far apart."),
            Triple("Physical Properties of Matter", "Mass (measured by balance) • Volume (space occupied) • Density (Wood floats, Iron coin sinks)", "Less dense objects float on water; denser objects sink."),
            Triple("Conductors vs Insulators", "Conductors (Metals: Copper, Iron, Aluminium) • Insulators (Wood, Plastic, Rubber)", "Conductors allow heat and electricity to pass through; insulators block them."),
            Triple("Properties of Metals", "Shiny (Lustrous), Hard, High density, Good conductors of heat & electricity", "Cooking pots are made of metal with plastic/wooden handles (insulator)."),
            NazeraQuizQuestion("In which state of matter are particles packed VERY tightly together with a fixed shape?", "مادہ کی کس حالت میں ذرات ایک دوسرے کے بہت قریب اور مضبوطی سے جڑے ہوتے ہیں اور شکل مقرر ہوتی ہے؟", "د مادې په کوم حالت کې ذرات ډېر نږدې وي او ټاکلی شکل لري؟", "🧊 Matter", listOf("Solid (ٹھوس / جامد)", "Gas (گیس)", "Steam (بھاپ)"), 0),
            NazeraQuizQuestion("Why are the handles of metal cooking pans made of wood or plastic?", "دھاتی پتیلیوں اور فرائی پین کے دستے لکڑی یا پلاسٹک کے کیوں بنائے جاتے ہیں؟", "ولې د پخلي د فلزي لوښو لاستي له لرګي یا پلاستیک څخه جوړېږي؟", "🍳 Conductors & Insulators", listOf("Because wood and plastic are Insulators and do not get hot (کیونکہ لکڑی اور پلاسٹک غیر موصل ہیں اور ہاتھ نہیں جلتا)", "Because wood melts easily", "Because metal is soft"), 0)
        ),
        unitStage(
            5, "Chapter 5", "Pages 56–66",
            "Forms of Energy and Energy Transfer",
            "توانائی کی اقسام اور توانائی کی منتقلی (روشنی، حرارت، آواز، بجلی)",
            "د انرژۍ ډولونه او د انرژۍ لېږد (رڼا، تودوخه، غږ، برېښنا)",
            "Explore sources and forms of Energy; learn how Light travels in straight lines, Reflection, Rainbow (7 colours via prism), Shadow, and Periscope; understand Sound vibrations and Echo; measure Thermal Energy/Temperature with a Thermometer; and build a simple Electric Circuit.",
            "توانائی کے ذرائع، توانائی کی منتقلی، روشنی کا انعکاس (Reflection)، قوسِ قزح کے 7 رنگ، پیری سکوپ، آواز کا ارتعاش (Vibration) اور گونج (Echo)، حرارت اور تھرمامیٹر، اور سادہ برقی سرکٹ۔",
            "د انرژۍ سرچینې، د رڼا انعکاس، د شنه زرغون (Rainbow) اووه رنګونه، غږ، تودوخه (ترمامیتر) او برقي سرکټ.",
            Triple("Light Energy: Reflection & Rainbow", "Light travels in straight lines • Bouncing off a mirror = Reflection • Sunlight splits into 7 Rainbow colours", "A Periscope uses mirrors to see objects above obstacles (like from a submarine)."),
            Triple("Sound Energy (آواز کی توانائی)", "Produced by Vibrations (back-and-forth movement) • Needs a medium (air, water, solid) to travel", "Sound cannot travel in a vacuum (empty space); bouncing back of sound is called Echo (گونج)."),
            Triple("Heat / Thermal Energy & Thermometer", "Heat flows from hotter objects to colder objects • Thermometer measures Temperature (°C or °F)", "Normal human body temperature is 37°C or 98.6°F."),
            Triple("Electrical Energy & Simple Circuit", "Battery (Cell) + Wire + Switch + Bulb = Complete Closed Circuit", "When the switch is ON (closed circuit), electric current flows and lights the bulb."),
            NazeraQuizQuestion("How many colours are there in a Rainbow (قوسِ قزح) when white sunlight passes through raindrops or a prism?", "جب سورج کی سفید روشنی بارش کے قطروں یا منشور (Prism) سے گزرتی ہے تو قوسِ قزح میں کتنے رنگ نظر آتے ہیں؟", "په شنه زرغون (Rainbow) کې څو رنګونه وي؟", "🌈 Rainbow", listOf("7 Colours (سات رنگ — VIBGYOR)", "2 Colours", "15 Colours"), 0),
            NazeraQuizQuestion("How is Sound (آواز) produced?", "آواز کیسے پیدا ہوتی ہے؟", "غږ (Sound) څنګه پیدا کېږي؟", "🔔 Sound Energy", listOf("By vibrating objects (چیزوں کے تھرتھرانے / ارتعاش سے)", "By freezing ice", "In complete vacuum"), 0)
        ),
        unitStage(
            6, "Chapter 6", "Pages 67–80",
            "Force and Motion",
            "قوت اور حرکت (کششِ ثقل، رگڑ اور سادہ مشینیں)",
            "قوه او حرکت (جاذبه، اصطکاک او ساده ماشینونه)",
            "Define Force as a push or pull that can start, stop, speed up, slow down, or change the direction/shape of an object; understand Gravity (Earth's downward pull) and Friction (force opposing motion across surfaces); and study Simple Machines (Lever, Pulley, Inclined Plane, Wheel & Axle, Wedge, Screw).",
            "قوت (دھکیلنا یا کھینچنا) اور حرکت؛ قوت کے اثرات؛ زمین کی کششِ ثقل (Gravity)؛ رگڑ کی قوت (Friction — فوائد اور نقصانات)؛ اور سادہ مشینیں (لیور، پلی، ڈھلوان سطح، پہیہ اور ایکسل)۔",
            "قوه (ټېله کول یا راکاږل)، د جاذبې قوه، د اصطکاک قوه (Friction) او ساده ماشینونه (لېور، څرخۍ، مايله سطحه).",
            Triple("Force (Push or Pull) & Its Effects", "Starts/stops motion • Changes speed • Changes direction • Changes shape", "A footballer kicking a ball changes its speed and direction."),
            Triple("Gravity (کششِ ثقل)", "Earth's invisible force that pulls all objects downward toward its center", "Because of gravity, a ball thrown up always falls back down to the ground."),
            Triple("Friction (رگڑ کی قوت)", "Force that opposes motion when two surfaces rub against each other", "Rough surfaces have MORE friction; smooth/oily/icy surfaces have LESS friction."),
            Triple("Simple Machines (سادہ مشینیں)", "Lever (Scissors, Seesaw) • Pulley (Flagpole, Well) • Inclined Plane (Ramp) • Wheel & Axle", "Simple machines make work easier by reducing or changing the direction of force."),
            NazeraQuizQuestion("Which simple machine uses a grooved wheel and a rope to lift water from a well or raise a flag?", "کنویں سے پانی کھینچنے یا جھنڈا لہرائے جانے کے لیے رسی اور پہیے والی کون سی سادہ مشین استعمال ہوتی ہے؟", "له څاه څخه د اوبو راایستلو یا د بیرغ پورته کولو لپاره کوم ساده ماشین کارول کېږي؟", "⚙️ Simple Machines", listOf("Pulley (پلی / چرخی)", "Thermometer", "Magnet"), 0),
            NazeraQuizQuestion("Which surface produces MORE friction?", "کس قسم کی سطح پر رگڑ (Friction) زیادہ پیدا ہوتی ہے؟", "په کوم ډول سطحه باندې اصطکاک (Friction) زیات وي؟", "👟 Friction", listOf("Rough surface like carpet or road (کھردری سطح)", "Wet ice", "Oily glass"), 0)
        ),
        unitStage(
            7, "Chapter 7", "Pages 81–92",
            "The Earth and its Resources",
            "زمین اور اس کے قدرتی وسائل (پانی، ہوا، مٹی، جنگلات، معدنیات اور 3Rs)",
            "ځمکه او د هغې طبیعي زېرمې (اوبه، هوا، خاوره، ځنګلونه او 3Rs)",
            "Learn how Earth's surface is ~71% water and ~29% land; study Natural Resources (Water, Air, Soil, Forests, Minerals, Fossil Fuels: Coal, Oil, Natural Gas); compare Renewable vs Non-renewable resources; and practice Conservation using the 3Rs (Reduce, Reuse, Recycle).",
            "زمین کی سطح (71 فیصد پانی اور 29 فیصد خشکی)؛ قدرتی وسائل (پانی، ہوا، مٹی، جنگلات، معدنیات، کوئلہ، تیل اور قدرتی گیس)؛ قابلِ تجدید اور ناقابلِ تجدید وسائل؛ اور ماحول کے تحفظ کے تین اصول (Reduce, Reuse, Recycle)۔",
            "د ځمکې طبیعي زېرمې، د نوي کېدو وړ او نه نوي کېدو وړ زېرمې او د ساتنې درې اصول (Reduce, Reuse, Recycle).",
            Triple("Earth's Surface & Natural Resources", "71% Water (Mostly salty oceans) & 29% Land • Air, Soil, Forests & Minerals", "Only about 3% of Earth's water is fresh water (glaciers, rivers, groundwater)."),
            Triple("Renewable Resources", "Sunlight (Solar), Wind, Water, Trees — replenished naturally", "Resources that do not run out if used wisely."),
            Triple("Non-Renewable Resources (Fossil Fuels)", "Coal, Crude Oil (Petroleum), Natural Gas & Minerals", "Take millions of years to form underground; once burnt, they cannot be replaced quickly."),
            Triple("The 3Rs of Conservation", "1. Reduce (Use less) • 2. Reuse (Use again) • 3. Recycle (Make new items from old paper/plastic/glass)", "Practicing the 3Rs saves resources and reduces pollution."),
            NazeraQuizQuestion("Which of these is a NON-RENEWABLE resource (ناقابلِ تجدید وسیلہ) that can run out?", "ان میں سے کون سا وسیلہ ناقابلِ تجدید (Non-renewable) ہے جو ختم ہو سکتا ہے؟", "په لاندې زېرمو کې کومه یوه د نه نوي کېدو وړ (Non-renewable) ده؟", "⛽ Earth's Resources", listOf("Coal, Petrol & Natural Gas (کوئلہ، پٹرول اور گیس)", "Sunlight (سورج کی روشنی)", "Wind (ہوا)"), 0),
            NazeraQuizQuestion("What do the '3Rs' stand for in conserving Earth's resources?", "قدرتی وسائل کی بچت میں '3Rs' کن تین الفاظ کا مخفف ہے؟", "د طبیعي زېرمو په ساتنه کې '3Rs' د کومو دریو تورو لنډیز دی؟", "♻️ 3Rs", listOf("Reduce, Reuse, Recycle", "Run, Read, Rest", "Red, Rose, Ring"), 0)
        ),
        unitStage(
            8, "Chapter 8", "Pages 93–99",
            "Earth's Weather and Climates",
            "زمین کا موسم اور آب و ہوا (تین بڑے موسمی خطے)",
            "د ځمکې هوا او اقلیم (درې لویې اقلیمي سیمې)",
            "Differentiate between Weather (day-to-day atmospheric conditions) and Climate (average weather over a long period); learn how distance from the Equator and altitude affect climate; and compare the 3 Climate Zones of Earth: Tropical Zone, Temperate Zone, and Polar/Frigid Zone.",
            "موسم (روزمرہ کی تبدیلی) اور آب و ہوا (طویل عرصے کا اوسط موسم) میں فرق؛ خطِ استوا (Equator) اور بلندی کا اثر؛ اور زمین کے تین بڑے موسمی خطے: منطقہ حارہ (Tropical)، منطقہ معتدلہ (Temperate) اور منطقہ باردہ (Polar Zone)۔",
            "د هوا (Weather) او اقلیم (Climate) توپیر او د ځمکې درې اقلیمي سیمې (استوایي/Tropical، معتدله/Temperate او قطبي/Polar).",
            Triple("Weather vs Climate", "Weather changes hour by hour (sunny, rainy, windy) • Climate is long-term average weather", "Temperature, humidity, wind, clouds, and rainfall are elements of weather."),
            Triple("Tropical Zone (منطقہ حارہ)", "Near the Equator • Direct sunlight • Hot and humid/rainy all year", "Dense tropical rainforests grow in this warm zone."),
            Triple("Temperate Zone (منطقہ معتدلہ)", "Between Tropical and Polar zones • Moderate climate with 4 distinct seasons", "Neither extremely hot nor freezing all year; ideal for agriculture and living."),
            Triple("Polar / Frigid Zone (منطقہ باردہ / قطبی خطہ)", "Around North Pole & South Pole • Slanting sunrays • Covered in ice and snow", "Polar bears and penguins live in these freezing regions."),
            NazeraQuizQuestion("Which climate zone around the North and South Poles remains freezing cold and covered with snow?", "شمالی اور جنوبی قطب کے گرد کون سا موسمی خطہ سارا سال برف سے ڈھکا اور شدید سرد رہتا ہے؟", "د شمالي او سویلي قطب شاوخوا کومه سیمه تل په واورو پټه او سخته سړه وي؟", "❄️ Climate Zones", listOf("Polar Zone (قطبی خطہ / منطقہ باردہ)", "Tropical Zone", "Desert"), 0),
            NazeraQuizQuestion("What do we call the day-to-day change in temperature, clouds, wind, and rain of a place?", "کسی جگہ کے درجہ حرارت، بادل، ہوا اور بارش کی روزمرہ تبدیلی کو کیا کہتے ہیں؟", "د یوه ځای د هوا، باران او تودوخې ورځني بدلون ته څه وایي؟", "🌦️ Atmosphere", listOf("Weather (موسم / هوا)", "Continent", "Gravity"), 0)
        ),
        unitStage(
            9, "Chapter 9", "Pages 100–111",
            "Earth in the Solar System",
            "نظامِ شمسی میں زمین (سورج، 8 سیارے، دن رات، موسم اور گرہن)",
            "په لمریز نظام کې ځمکه (لمر، ۸ سیارې، شپه او ورځ او کسوف/خسوف)",
            "Explore the Solar System (Sun + 8 Planets in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune), Asteroids & Comets; understand Earth's axial tilt (23.5°), Rotation (24 hrs ➔ Day & Night) and Revolution (365¼ days ➔ Seasons); phases of the Moon; and Solar & Lunar Eclipses.",
            "نظامِ شمسی (سورج اور 8 سیارے ترتیب وار)، زمین کا محوری جھکاؤ (23.5°)، محوری گردش (24 گھنٹے ➔ دن اور رات)، مداری گردش (365¼ دن ➔ سال اور موسم)، چاند کی اشکال اور سورج گرہن و چاند گرہن۔",
            "لمریز نظام او ۸ سیارې، د ځمکې محوري حرکت (۲۴ ساعته: شپه او ورځ) او مداري حرکت (۳۶۵ ورځې: کال او موسمونه)، او لمر/سپوږمۍ تندر نیول.",
            Triple("The Sun & 8 Planets in Order", "Mercury, Venus, Earth, Mars, Jupiter (Largest), Saturn (Rings), Uranus, Neptune", "Mercury is closest to the Sun; Earth is the 3rd planet; Jupiter is the largest."),
            Triple("Earth's Rotation (محوری گردش)", "Earth spins on its tilted axis (23.5°) once every 24 hours", "The side facing the Sun has Day; the side away from the Sun has Night."),
            Triple("Earth's Revolution (مداری گردش)", "Earth orbits around the Sun in 365¼ days (1 Year)", "Earth's revolution + 23.5° axial tilt causes the changing Seasons (Summer, Winter, Spring, Autumn)."),
            Triple("Solar & Lunar Eclipses (گرہن)", "Solar Eclipse: Moon comes between Sun & Earth • Lunar Eclipse: Earth comes between Sun & Moon", "The Moon is Earth's natural satellite and completes one orbit around Earth in ~29.5 days."),
            NazeraQuizQuestion("When the Moon comes directly between the Sun and the Earth, blocking sunlight, what occurs?", "جب چاند، سورج اور زمین کے درمیان آ جائے اور سورج کی روشنی رک جائے تو کیا واقع ہوتا ہے؟", "کله چې سپوږمۍ د لمر او ځمکې تر منځ راشي نو څه پېښېږي؟", "🌑☀️🌍 Eclipse", listOf("Solar Eclipse (سورج گرہن)", "Lunar Eclipse (چاند گرہن)", "Rainbow"), 0),
            NazeraQuizQuestion("Which is the LARGEST planet in our Solar System?", "ہمارے نظامِ شمسی کا سب سے بڑا سیارہ کون سا ہے؟", "په لمریز نظام کې تر ټولو لویه سیاره کومه ده؟", "🪐 Solar System", listOf("Jupiter (مشتری)", "Mercury (عطارد)", "Mars (مریخ)"), 0)
        ),
        unitStage(
            10, "Chapter 10", "Pages 112–128",
            "Technology in Everyday Life",
            "روزمرہ زندگی میں ٹیکنالوجی (موبائل، فرسٹ ایڈ، بلڈ پریشر، شاقول اور ماڈل سازی)",
            "په ورځني ژوند کې ټیکنالوژي (لومړنۍ طبي مرستې، د وینې فشار او وسیلې)",
            "Learn basic technical skills: folding/cutting paper and clay modelling; using a Plumb Line (vertical check) and Spirit Level (horizontal check); operating a Mobile Phone (torch, clock, camera); First Aid Box items; checking body temperature with a Clinical Thermometer (37°C / 98.6°F); and measuring Blood Pressure (120/80 mmHg).",
            "کاغذ اور مٹی سے ماڈل بنانا؛ دیوار کا عمودی پن چیک کرنے کے لیے شاقول (Plumb Line) اور افقی سطح کے لیے سپرٹ لیول (Spirit Level)؛ فرسٹ ایڈ باکس کا استعمال؛ کلینیکل تھرمامیٹر سے بخار چیک کرنا (98.6°F / 37°C) اور بلڈ پریشر ماپنا۔",
            "د شاقول (Plumb Line) او سپرټ لیول کارول، د لومړنیو طبي مرستو بکس (First Aid)، د تبې ترمامیتر (37°C) او د وینې فشار اله.",
            Triple("Plumb Line & Spirit Level", "Plumb Line (شاقول): Checks if a wall is vertical • Spirit Level: Checks if a surface is horizontal", "Masons and carpenters use these tools to build straight walls and level tables."),
            Triple("First Aid Box (ابتدائی طبی امداد کا بکس)", "Bandages, Cotton, Antiseptic (Pyodine/Dettol), Scissors, Painkiller & Thermometer", "Immediate medical care given to an injured person before reaching the hospital."),
            Triple("Clinical Thermometer", "Normal Human Body Temperature = 37°C or 98.6°F", "Placed under the tongue or armpit to check for fever."),
            Triple("Blood Pressure (Sphygmomanometer)", "Normal adult Blood Pressure = 120 / 80 mmHg", "Measured by wrapping an inflatable cuff around the upper arm."),
            NazeraQuizQuestion("What is the normal body temperature of a healthy human being?", "ایک صحت مند انسان کے جسم کا نارمل درجہ حرارت کتنا ہوتا ہے؟", "د یوه روغ انسان د بدن عادي تودوخه څو درجې ده؟", "🌡️ Clinical Thermometer", listOf("37°C or 98.6°F", "100°C", "0°C"), 0),
            NazeraQuizQuestion("Which tool is used by masons to check whether a wall is vertically straight?", "دیوار بالکل سیدھی (عمودی) بنی ہے یا نہیں، یہ چیک کرنے کے لیے معمار کون سا آلہ استعمال کرتے ہیں؟", "خټګر د دېوال د عمودي والي د کتلو لپاره کومه وسیله کاروي؟", "🧱 Building Tools", listOf("Plumb Line (شاقول / سال)", "Thermometer", "Stethoscope"), 0)
        )
    )
}
