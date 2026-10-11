package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

enum class IslamyatGameType {
    KALIMAH_DUA_BUILDER,    // Tap words/parts of Ta'awwuz, Tasmiyah, Kalimah Tayyibah, Duas in order
    PILLAR_STAR_MATCHER,    // Match Islamic beliefs/teachings (Tawheed, Risalat, Masjid, Azan)
    NAMAZ_SEQUENCE_QUEST,   // Tap the 5 Daily Prayers (Fajr, Zuhr, Asr, Maghrib, Isha) in order
    GOOD_DEED_SORTER        // Sort Seerat, Akhlaq, Salam & Prophets facts
}

data class IslamyatLessonCard(
    val headingArabicOrUrdu: String,
    val titleEn: String,
    val bodyEn: String,
    val bodyUr: String,
    val bodyPs: String,
    val badgeColor: Color
)

data class IslamyatStageData(
    val id: Int,
    val babTitle: String,
    val pageRange: String,
    val titleEn: String,
    val titleUr: String,
    val titlePs: String,
    val themeColor: Color,
    val secondaryColor: Color,
    val gameType: IslamyatGameType,
    val summaryEn: String,
    val summaryUr: String,
    val summaryPs: String,
    val gamePromptEn: String,
    val gamePromptUr: String,
    val gamePromptPs: String,
    val sequenceItems: List<String>,
    val matchPairs: List<Pair<String, String>>,
    val cards: List<IslamyatLessonCard>,
    val quizzes: List<NazeraQuizQuestion>
)

object Class1IslamyatRepository {
    val stages: List<IslamyatStageData> = listOf(
        // STAGE 1: Bab 1 (A & B) - Ta'awwuz, Tasmiyah, Surah Al-Ikhlas & Surah Al-Kawthar (Pages 1-2)
        IslamyatStageData(
            id = 1,
            babTitle = "باب اوّل (الف-ب) • Unit 1",
            pageRange = "Pages 01–02",
            titleEn = "Ta'awwuz, Tasmiyah, Surah Al-Ikhlas & Al-Kawthar",
            titleUr = "تعوذ، تسمیہ، سورۃ الاخلاص اور سورۃ الکوثر",
            titlePs = "تعوذ، تسمیه، سورة الاخلاص او سورة الکوثر",
            themeColor = Color(0xFF059669),
            secondaryColor = Color(0xFF064E3B),
            gameType = IslamyatGameType.KALIMAH_DUA_BUILDER,
            summaryEn = "Before starting any good work we say Tasmiyah (Bismillah). Before reciting the Quran we say Ta'awwuz and Tasmiyah.",
            summaryUr = "ہر اچھا کام شروع کرنے سے پہلے تسمیہ (بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ) پڑھتے ہیں اور تلاوت سے پہلے تعوذ پڑھتے ہیں۔",
            summaryPs = "د هر ښه کار پیلولو دمخه تسمیه (بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ) او د تلاوت دمخه تعوذ وایو.",
            gamePromptEn = "Tap the 4 parts of Tasmiyah in exact order from Right to Left!",
            gamePromptUr = "تسمیہ (بسم اللہ) کے الفاظ کو درست ترتیب سے ٹیپ کریں!",
            gamePromptPs = "د بسم الله مبارک توري په سم ترتیب سره ووهئ!",
            sequenceItems = listOf(
                "بِسْمِ",
                "اللّٰهِ",
                "الرَّحْمٰنِ",
                "الرَّحِيْمِ"
            ),
            matchPairs = emptyList(),
            cards = listOf(
                IslamyatLessonCard(
                    "أَعُوذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ",
                    "Ta'awwuz (Seeking Refuge)",
                    "I seek refuge with Allah from Satan, the accursed.",
                    "میں شیطان مردود سے اللہ کی پناہ مانگتا ہوں۔",
                    "زه له رټل شوي شیطان څخه په الله پناه غواړم.",
                    Color(0xFF059669)
                ),
                IslamyatLessonCard(
                    "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
                    "Tasmiyah (In the Name of Allah)",
                    "In the name of Allah, the Most Gracious, the Most Merciful.",
                    "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔",
                    "د الله په نوم پیل کوم چې ډېر بښونکی او مهربان دی.",
                    Color(0xFF0284C7)
                ),
                IslamyatLessonCard(
                    "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ ۝",
                    "Surah Al-Kawthar (3 Ayahs)",
                    "Indeed, We have granted you Al-Kawthar. So pray to your Lord and sacrifice.",
                    "بے شک ہم نے آپ ﷺ کو کوثر عطا فرمایا۔ پس اپنے رب کے لیے نماز پڑھیے اور قربانی کیجیے۔",
                    "بېشکه موږ تا ته کوثر درکړ. نو خپل رب ته لمونځ وکړه او قرباني وکړه.",
                    Color(0xFF7C3AED)
                )
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What do we recite before starting any good work?",
                    "ہر اچھا کام شروع کرنے سے پہلے کیا پڑھتے ہیں؟",
                    "د هر ښه کار پیلولو دمخه څه وایو؟",
                    "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
                    listOf("Tasmiyah (بِسْمِ اللّٰهِ...)", "Salam", "Azan"),
                    0
                ),
                NazeraQuizQuestion(
                    "Which is the shortest Surah of the Holy Quran (3 Ayahs)?",
                    "قرآن مجید کی سب سے چھوٹی سورت (3 آیات) کون سی ہے؟",
                    "د قرآن کریم تر ټولو لنډ سورت کوم دی؟",
                    "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
                    listOf("Surah Al-Kawthar (سورۃ الکوثر)", "Surah Al-Baqarah", "Surah Yaseen"),
                    0
                )
            )
        ),

        // STAGE 2: Bab 1 (C, D, E) - Kalimah Tayyibah, Hadith on Knowledge & Masnoon Duas (Pages 3-6)
        IslamyatStageData(
            id = 2,
            babTitle = "باب اوّل (ج-ہ) • Unit 1",
            pageRange = "Pages 03–06",
            titleEn = "First Kalimah, Hadith & Daily Duas",
            titleUr = "پہلا کلمہ طیبہ، حدیثِ نبوی ﷺ اور مسنون دعائیں",
            titlePs = "لومړۍ کلیمه طیبه، نبوي حدیث او مسنون دعاګانې",
            themeColor = Color(0xFF2563EB),
            secondaryColor = Color(0xFF1E3A8A),
            gameType = IslamyatGameType.KALIMAH_DUA_BUILDER,
            summaryEn = "First Kalimah Tayyibah declares that there is no deity worthy of worship except Allah and Muhammad (PBUH) is the Messenger of Allah. Dua for knowledge: Rabbi Zidni Ilma.",
            summaryUr = "پہلا کلمہ طیبہ: لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَّسُولُ اللّٰهِ (اللہ کے سوا کوئی معبود نہیں، محمد ﷺ اللہ کے رسول ہیں)۔ علم میں اضافے کی دعا: رَبِّ زِدْنِي عِلْمًا۔",
            summaryPs = "لومړۍ کلیمه طیبه: لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَّسُولُ اللّٰهِ. د علم زیاتوالي دعا: رَبِّ زِدْنِي عِلْمًا.",
            gamePromptEn = "Tap the blessed parts of First Kalimah Tayyibah in order!",
            gamePromptUr = "پہلے کلمہ طیبہ کے حصوں کو درست ترتیب سے ٹیپ کریں!",
            gamePromptPs = "د لومړۍ کلیمې طیبې برخې په سم ترتیب سره ووهئ!",
            sequenceItems = listOf(
                "لَا إِلٰهَ",
                "إِلَّا اللّٰهُ",
                "مُحَمَّدٌ",
                "رَّسُولُ اللّٰهِ"
            ),
            matchPairs = emptyList(),
            cards = listOf(
                IslamyatLessonCard(
                    "لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَّسُولُ اللّٰهِ",
                    "First Kalimah Tayyibah (پاکیزہ کلمہ)",
                    "There is no god but Allah, Muhammad (PBUH) is the Messenger of Allah.",
                    "اللہ کے سوا کوئی عبادت کے لائق نہیں، محمد ﷺ اللہ کے رسول ہیں۔",
                    "له الله پرته بل هیڅ معبود نشته، محمد ﷺ د الله رسول دی.",
                    Color(0xFF2563EB)
                ),
                IslamyatLessonCard(
                    "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلٰى كُلِّ مُسْلِمٍ",
                    "Hadith on Seeking Knowledge (حدیثِ مبارکہ)",
                    "Seeking knowledge is obligatory upon every Muslim.",
                    "علم حاصل کرنا ہر مسلمان (مرد اور عورت) پر فرض ہے۔",
                    "د علم زده کړه پر هر مسلمان فرض ده.",
                    Color(0xFF059669)
                ),
                IslamyatLessonCard(
                    "رَبِّ زِدْنِي عِلْمًا",
                    "Dua for Increase in Knowledge (علم کی دعا)",
                    "O my Lord! Increase me in knowledge.",
                    "اے میرے رب! میرے علم میں اضافہ فرما۔",
                    "ای زما ربه! زما په علم کې زیاتوالی راوله.",
                    Color(0xFF7C3AED)
                ),
                IslamyatLessonCard(
                    "بِسْمِ اللّٰهِ وَعَلٰى بَرَكَةِ اللّٰهِ  •  اَلْحَمْدُ لِلّٰهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ",
                    "Duas Before & After Eating (کھانے کی دعائیں)",
                    "Recite Bismillah before eating and Alhamdulillah after eating.",
                    "کھانے سے پہلے اور کھانے کے بعد کی مسنون دعائیں۔",
                    "له خوړو مخکې او وروسته مسنون دعاګانې.",
                    Color(0xFFD97706)
                )
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What is the meaning of 'رَبِّ زِدْنِي عِلْمًا'?",
                    "دعا 'رَبِّ زِدْنِي عِلْمًا' کا ترجمہ کیا ہے؟",
                    "د 'رَبِّ زِدْنِي عِلْمًا' دعا ژباړه څه ده؟",
                    "رَبِّ زِدْنِي عِلْمًا",
                    listOf("O my Lord! Increase me in knowledge (اے میرے رب! میرے علم میں اضافہ فرما)", "Before sleeping", "Entering Masjid"),
                    0
                )
            )
        ),

        // STAGE 3: Bab 2 (1) - Tawheed: Allah is One (توحید کا تعارف — Pages 9-13)
        IslamyatStageData(
            id = 3,
            babTitle = "باب دوم (1) • Unit 2",
            pageRange = "Pages 09–13",
            titleEn = "Tawheed: Allah is One & Creator",
            titleUr = "توحید کا تعارف (اللہ تعالیٰ ایک ہے)",
            titlePs = "د توحید پېژندنه (الله تعالی یو دی)",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF115E59),
            gameType = IslamyatGameType.PILLAR_STAR_MATCHER,
            summaryEn = "Tawheed means believing that Allah is One. He has no partner. He created the sun, moon, stars, trees, rivers, and all human beings.",
            summaryUr = "توحید کا مطلب ہے اللہ تعالیٰ کو ایک ماننا۔ اللہ تعالیٰ ہمارا خالق اور مالک ہے۔ سورج، چاند، ستارے، پہاڑ، دریا اور تمام مخلوقات اللہ نے پیدا کی ہیں۔",
            summaryPs = "توحید پدې معنی دی چې الله تعالی یو وګڼو. لمر، سپوږمۍ، ستوري، غرونه او ټول مخلوقات الله تعالی پیدا کړي دي.",
            gamePromptEn = "Match Allah's blessings and beliefs with their true meanings!",
            gamePromptUr = "اللہ تعالیٰ کی نعمتوں اور صفات کو درست جواب سے ملائیں!",
            gamePromptPs = "د الله تعالی نعمتونه او صفتونه له سم ځواب سره وصل کړئ!",
            sequenceItems = emptyList(),
            matchPairs = listOf(
                "اَللّٰهُ أَحَدٌ (Tawheed)" to "Allah is One (اللہ ایک ہے)",
                "اَلْخَالِقُ (Al-Khaliq)" to "The Creator of Everything (سب کا پیدا کرنے والا)",
                "☀️ 🌙 ⭐" to "Created by Allah (اللہ کی بنائی ہوئی نعمتیں)",
                "عبادت (Worship)" to "Only for Allah Alone (صرف اللہ کے لیے)"
            ),
            cards = listOf(
                IslamyatLessonCard(
                    "تَوْحِيد — اَللّٰهُ وَاحِدٌ لَا شَرِيْكَ لَهُ",
                    "Meaning of Tawheed (توحید کا مفہوم)",
                    "Allah is One. He has no father, no son, and no partner.",
                    "اللہ تعالیٰ ایک ہے، اس کا کوئی شریک نہیں۔ وہ ہمیشہ سے ہے اور ہمیشہ رہے گا۔",
                    "الله تعالی یو دی، هغه هیڅ شریک نلري.",
                    Color(0xFF0D9488)
                ),
                IslamyatLessonCard(
                    "خَالِق کَائِنَات (Creator of Universe)",
                    "Blessings of Allah (اللہ کی نعمتیں)",
                    "Sun, moon, sky, earth, water, fruits, and parents are all gifts from Allah.",
                    "آسمان، زمین، سورج، چاند، ہوا، پانی، پھل اور پھول سب اللہ تعالیٰ نے بنائے ہیں۔",
                    "اسمان، ځمکه، لمر، سپوږمۍ، اوبه او مېوې ټول الله پیدا کړي دي.",
                    Color(0xFF0284C7)
                )
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Who created the sky, earth, sun, and moon?",
                    "آسمان، زمین، سورج اور چاند کس نے پیدا کیے ہیں؟",
                    "اسمان، ځمکه، لمر او سپوږمۍ چا پیدا کړي دي؟",
                    "☀️ 🌙 🌍",
                    listOf("Allah Almighty (اللہ تعالیٰ نے)", "Humans", "Machines"),
                    0
                )
            )
        ),

        // STAGE 4: Bab 2 (2) - Prophethood / Risalat (نبوت و رسالت — Pages 14-17)
        IslamyatStageData(
            id = 4,
            babTitle = "باب دوم (2) • Unit 2",
            pageRange = "Pages 14–17",
            titleEn = "Prophethood (Nabuwwat & Risalat)",
            titleUr = "نبوت و رسالت کا تعارف",
            titlePs = "د نبوت او رسالت پېژندنه",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            gameType = IslamyatGameType.PILLAR_STAR_MATCHER,
            summaryEn = "Allah sent Prophets (Anbiya) to guide humanity to the straight path. Hazrat Adam (AS) was the first Prophet and Hazrat Muhammad (PBUH) is the Last Prophet (Khatam-un-Nabiyyin).",
            summaryUr = "انسانوں کی ہدایت کے لیے اللہ تعالیٰ نے انبیاء کرام علیہم السلام بھیجے۔ سب سے پہلے نبی حضرت آدم علیہ السلام اور سب سے آخری نبی حضرت محمد رسول اللہ خاتم النبیین ﷺ ہیں۔",
            summaryPs = "د انسانانو د لارښوونې لپاره الله تعالی پیغمبران رالېږلي دي. لومړی نبي حضرت آدم علیه السلام او وروستی نبي حضرت محمد ﷺ دی.",
            gamePromptEn = "Match each Prophethood fact with the right answer!",
            gamePromptUr = "نبوت و رسالت کے سوالات کو درست جواب سے ملائیں!",
            gamePromptPs = "د نبوت او رسالت پوښتنې له سم ځواب سره وصل کړئ!",
            sequenceItems = emptyList(),
            matchPairs = listOf(
                "حضرت آدم علیہ السلام" to "First Prophet (سب سے پہلے نبی)",
                "حضرت محمد ﷺ" to "Last Prophet • خاتم النبیین ﷺ",
                "قرآن مجید" to "Revealed to Prophet Muhammad ﷺ",
                "انبیاء کا پیغام" to "Worship Allah Alone (ایک اللہ کی عبادت)"
            ),
            cards = listOf(
                IslamyatLessonCard(
                    "رِسَالَت اور انبیاء کرام علیہم السلام",
                    "Why Allah sent Prophets?",
                    "Prophets taught people to worship Allah alone and live with truth and kindness.",
                    "نبی اور رسول اللہ کا پیغام انسانوں تک پہنچاتے ہیں اور سیدھا راستہ دکھاتے ہیں۔",
                    "پیغمبران خلکو ته د الله پیغام رسوي او سمه لاره ښیي.",
                    Color(0xFF7C3AED)
                ),
                IslamyatLessonCard(
                    "خَاتَمُ النَّبِيِّيْن حضرت محمد ﷺ",
                    "Finality of Prophethood (ختمِ نبوت)",
                    "Hazrat Muhammad (PBUH) is the last Prophet of Allah. No prophet will come after him.",
                    "حضرت محمد ﷺ اللہ کے آخری نبی اور رسول ہیں، آپ ﷺ کے بعد قیامت تک کوئی نیا نبی نہیں آئے گا۔",
                    "حضرت محمد ﷺ د الله وروستی نبي دی، له هغه وروسته هیڅ نوی نبي نه راځي.",
                    Color(0xFF059669)
                )
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Who is the Last Prophet of Allah (Khatam-un-Nabiyyin)?",
                    "اللہ تعالیٰ کے سب سے آخری نبی کون ہیں؟",
                    "د الله تعالی تر ټولو وروستی نبي څوک دی؟",
                    "خَاتَمُ النَّبِيِّيْن ﷺ",
                    listOf("Hazrat Muhammad ﷺ (حضرت محمد ﷺ)", "Hazrat Adam (AS)", "Hazrat Nuh (AS)"),
                    0
                )
            )
        ),

        // STAGE 5: Bab 2 (B) - Masjid, Azan & 5 Daily Prayers (مسجد، اذان اور نماز — Pages 18-29)
        IslamyatStageData(
            id = 5,
            babTitle = "باب دوم (ب) • Unit 2",
            pageRange = "Pages 18–29",
            titleEn = "Masjid, Azan & Five Daily Prayers (Namaz)",
            titleUr = "مسجد، اذان اور پانچ فرض نمازیں",
            titlePs = "جومات، اذان او پنځه فرض لمونځونه",
            themeColor = Color(0xFFEA580C),
            secondaryColor = Color(0xFF9A3412),
            gameType = IslamyatGameType.NAMAZ_SEQUENCE_QUEST,
            summaryEn = "Masjid is the House of Allah. The Mu'azzin calls Azan five times a day. Muslims offer 5 obligatory prayers daily: Fajr, Zuhr, Asr, Maghrib, and Isha.",
            summaryUr = "مسجد اللہ کا گھر ہے۔ مؤذن دن میں پانچ بار اذان دیتا ہے۔ مسلمان روزانہ پانچ فرض نمازیں پڑھتے ہیں: فجر، ظہر، عصر، مغرب اور عشاء۔",
            summaryPs = "جومات د الله کور دی. مسلمانان هره ورځ پنځه فرض لمونځونه کوي: سهار (فجر)، ماسپښین (ظهر)، مازدیګر (عصر)، ماښام (مغرب) او ماخستن (عشاء).",
            gamePromptEn = "Tap the 5 Daily Prayers (Namaz) in their daily time sequence from Dawn to Night!",
            gamePromptUr = "دن اور رات کی پانچوں نمازوں کو ان کے درست وقت کی ترتیب (فجر تا عشاء) سے ٹیپ کریں!",
            gamePromptPs = "پنځه لمونځونه په خپل ورځني ترتیب (له فجر څخه تر عشاء پورې) ووهئ!",
            sequenceItems = listOf(
                "1. فَجْر (Fajr)",
                "2. ظُهْر (Zuhr)",
                "3. عَصْر (Asr)",
                "4. مَغْرِب (Maghrib)",
                "5. عِشَاء (Isha)"
            ),
            matchPairs = emptyList(),
            cards = listOf(
                IslamyatLessonCard(
                    "مَسْجِد — اللّٰہ کا گھر",
                    "Etiquette of Masjid (مسجد کے آداب)",
                    "Enter Masjid with the right foot, keep it clean, and sit quietly with respect.",
                    "مسجد میں دائیں قدم سے داخل ہوں، صفائی کا خیال رکھیں اور شور نہ مچائیں۔",
                    "جومات ته په ښي پښه ننوځئ، پاک یې وساتئ او غلي کېنئ.",
                    Color(0xFF059669)
                ),
                IslamyatLessonCard(
                    "أَذَان — اَللّٰهُ أَكْبَرُ ، اَللّٰهُ أَكْبَرُ",
                    "The Call to Prayer (اذان کا تعارف)",
                    "Azan calls Muslims to the Masjid 5 times a day. Listen silently and reply to the words of Azan.",
                    "نماز کے لیے بلانے کو اذان کہتے ہیں اور اذان دینے والے کو مؤذن کہتے ہیں۔",
                    "لمانځه ته د بلنې غږ ته اذان او ویونکي ته یې مؤذن وایي.",
                    Color(0xFF2563EB)
                ),
                IslamyatLessonCard(
                    "فَجْر • ظُهْر • عَصْر • مَغْرِب • عِشَاء",
                    "Five Daily Prayers (پانچ نمازوں کے نام)",
                    "1. Fajr (before sunrise), 2. Zuhr (midday), 3. Asr (afternoon), 4. Maghrib (sunset), 5. Isha (night).",
                    "دن رات میں پانچ نمازیں فرض ہیں: فجر، ظہر، عصر، مغرب اور عشاء۔ نماز سے پہلے وضو کرتے ہیں۔",
                    "په شپه او ورځ کې پنځه لمونځونه فرض دي: فجر، ظهر، عصر، مغرب او عشاء.",
                    Color(0xFFEA580C)
                )
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How many obligatory prayers (Farz Namaz) are there in a day and night?",
                    "ایک دن اور رات میں کتنی نمازیں فرض ہیں؟",
                    "په یوه شپه او ورځ کې څو لمونځونه فرض دي؟",
                    "🕌 نماز",
                    listOf("5 Prayers (پانچ نمازیں)", "3 Prayers", "7 Prayers"),
                    0
                ),
                NazeraQuizQuestion(
                    "Which is the first prayer of the day offered before sunrise?",
                    "صبح سورج نکلنے سے پہلے کون سی نماز پڑھی جاتی ہے؟",
                    "سهار د لمر ختلو دمخه کوم لمونځ لوستل کېږي؟",
                    "🌅 1st Prayer",
                    listOf("Fajr (نمازِ فجر)", "Maghrib (مغرب)", "Isha (عشاء)"),
                    0
                )
            )
        ),

        // STAGE 6: Bab 3 - Seerat-e-Tayyibah: Life & Noble Character of Prophet Muhammad PBUH (Pages 30-38)
        IslamyatStageData(
            id = 6,
            babTitle = "باب سوم • Unit 3",
            pageRange = "Pages 30–38",
            titleEn = "Seerat-e-Tayyibah: Our Beloved Prophet ﷺ",
            titleUr = "ہمارے پیارے نبی حضرت محمد ﷺ اور اخلاقِ حسنہ",
            titlePs = "زمونږ خوږ نبي حضرت محمد ﷺ او غوره اخلاق",
            themeColor = Color(0xFF16A34A),
            secondaryColor = Color(0xFF14532D),
            gameType = IslamyatGameType.PILLAR_STAR_MATCHER,
            summaryEn = "Prophet Muhammad (PBUH) was born in Makkah on 12 Rabi-ul-Awwal. His father was Hazrat Abdullah, mother Hazrat Amina, grandfather Hazrat Abdul Muttalib. People called him As-Sadiq and Al-Amin.",
            summaryUr = "حضرت محمد ﷺ 12 ربیع الاوّل کو مکہ مکرمہ میں پیدا ہوئے۔ آپ ﷺ کے والد حضرت عبداللہ، والدہ حضرت آمنہ اور دادا حضرت عبدالمطلب تھے۔ آپ ﷺ ہمیشہ سچ بولتے تھے، لوگ آپ کو صادق اور امین کہتے تھے۔",
            summaryPs = "حضرت محمد ﷺ د ربیع الاول په ۱۲مه په مکه مکرمه کې زېږېدلی دی. پلار یې حضرت عبدالله، مور یې حضرت آمنه او نیکه یې حضرت عبدالمطلب و. خلکو ورته صادق او امین ویل.",
            gamePromptEn = "Match the blessed family & titles of Prophet Muhammad ﷺ!",
            gamePromptUr = "نبی کریم ﷺ کی سیرتِ طیبہ کے درست جوڑے ملائیں!",
            gamePromptPs = "د نبي کریم ﷺ د سیرت سمې جوړې وصل کړئ!",
            sequenceItems = emptyList(),
            matchPairs = listOf(
                "مکہ مکرمہ (12 ربیع الاوّل)" to "Birthplace & Date of Prophet ﷺ",
                "حضرت عبداللہ و حضرت آمنہ" to "Parents of Prophet ﷺ (والدین)",
                "حضرت عبدالمطلب" to "Grandfather (دادا جان)",
                "الصادق اور الامین" to "Truthful & Trustworthy (سچا اور امانت دار)"
            ),
            cards = listOf(
                IslamyatLessonCard(
                    "وِلَادَتِ بَاسَعَادَت — مکہ مکرمہ",
                    "Birth & Family of Prophet ﷺ",
                    "Born in Makkah (Banu Hashim tribe). Foster mother: Hazrat Halimah Sa'diyah. Uncle: Hazrat Abu Talib.",
                    "آپ ﷺ کا تعلق قریش کے خاندان بنو ہاشم سے تھا۔ حضرت حلیمہ سعدیہ نے آپ ﷺ کی پرورش کی۔",
                    "حضرت محمد ﷺ په مکه مکرمه کې د قریشو په بنو هاشم کورنۍ کې دنیا ته راغلی.",
                    Color(0xFF16A34A)
                ),
                IslamyatLessonCard(
                    "أَخْلَاقِ حَسَنَہ — الصادق اور الامین",
                    "Noble Character of Prophet ﷺ",
                    "He always spoke the truth, helped the poor, loved children, and forgave everyone.",
                    "آپ ﷺ ہمیشہ سچ بولتے، امانت کی حفاظت کرتے، بچوں سے شفقت اور بڑوں سے عزت کا سلوک فرماتے تھے۔",
                    "نبي کریم ﷺ تل رښتیا ویل، پر ماشومانو یې شفقت کاوه او له بېوزلو سره یې مرسته کوله.",
                    Color(0xFF0284C7)
                )
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "In which city was Prophet Muhammad ﷺ born?",
                    "ہمارے پیارے نبی حضرت محمد ﷺ کس شہر میں پیدا ہوئے؟",
                    "زمونږ خوږ نبي حضرت محمد ﷺ په کوم ښار کې زېږېدلی و؟",
                    "🕋 ولادتِ نبوی ﷺ",
                    listOf("Makkah Mukarramah (مکہ مکرمہ)", "Cairo", "Baghdad"),
                    0
                ),
                NazeraQuizQuestion(
                    "What titles did the people of Makkah give to Prophet Muhammad ﷺ?",
                    "مکہ کے لوگ حضور ﷺ کو کن القابات سے پکارتے تھے؟",
                    "د مکې خلکو حضرت محمد ﷺ ته کوم لقبونه ورکړي وو؟",
                    "سچا اور امانت دار",
                    listOf("As-Sadiq & Al-Amin (صادق اور امین)", "King", "Commander"),
                    0
                )
            )
        ),

        // STAGE 7: Bab 4 & Bab 5 - Good Manners, Salam & Introduction to Prophets (Pages 39-58)
        IslamyatStageData(
            id = 7,
            babTitle = "باب چہارم و پنجم • Units 4 & 5",
            pageRange = "Pages 39–58",
            titleEn = "Good Manners, Salam & Prophets of Allah",
            titleUr = "اچھے اخلاق، سلام کرنا اور انبیاء کرام کا تعارف",
            titlePs = "ښه اخلاق، سلام اچول او د انبیاء کرامو پېژندنه",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF075985),
            gameType = IslamyatGameType.PILLAR_STAR_MATCHER,
            summaryEn = "Always speak the truth, respect parents & teachers, keep clean, greet with 'Assalamu Alaikum' and reply with 'Wa Alaikumus Salam'. Learn about Hazrat Adam, Ibrahim, Musa, Isa, and Muhammad (PBUT).",
            summaryUr = "ہمیشہ سچ بولیں، والدین اور اساتذہ کا ادب کریں، ملاقات کے وقت 'السَّلَامُ عَلَيْكُمْ' کہیں اور جواب میں 'وَعَلَيْكُمُ السَّلَامُ' کہیں۔",
            summaryPs = "تل رښتیا ووایاست، د مور او پلار او استادانو درناوی وکړئ، او د لیدو پر مهال 'السَّلَامُ عَلَيْكُمْ' ووایاست.",
            gamePromptEn = "Match the Islamic manners, Salam greeting, and Prophets!",
            gamePromptUr = "اسلامی آداب، سلام اور انبیاء کرام کے درست جوڑے ملائیں!",
            gamePromptPs = "اسلامي آداب، سلام او د انبیاء کرامو سمې جوړې وصل کړئ!",
            sequenceItems = emptyList(),
            matchPairs = listOf(
                "السَّلَامُ عَلَيْكُمْ" to "Peace be upon you (سلام کی ابتدا)",
                "وَعَلَيْكُمُ السَّلَامُ" to "Reply to Salam (سلام کا جواب)",
                "اَلطُّهُورُ شَطْرُ الْإِيمَانِ" to "Cleanliness is half of faith (صفائی نصف ایمان ہے)",
                "حضرت ابراہیم، موسیٰ، عیسیٰ (ع)" to "Famous Prophets of Allah (مشہور انبیاء کرام)"
            ),
            cards = listOf(
                IslamyatLessonCard(
                    "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ وَبَرَكَاتُهُ",
                    "Greeting with Salam (سلام کرنے کے آداب)",
                    "Saying Salam increases love and earns 30 rewards (nekiyan). Reply with Wa Alaikumus Salam.",
                    "سلام کرنے سے آپس میں محبت بڑھتی ہے اور پورا سلام کرنے سے تیس (30) نیکیاں ملتی ہیں۔",
                    "په سلام اچولو سره مینه زیاتېږي او ۳۰ نېکۍ ترلاسه کېږي.",
                    Color(0xFF0284C7)
                ),
                IslamyatLessonCard(
                    "اچھے اخلاق — سچ بولنا، صفائی اور ادب",
                    "Good Manners (اچھے اخلاق)",
                    "Speak the truth, keep your body and school clean, respect elders, and share with friends.",
                    "سچ بولنا، وعدہ پورا کرنا، صفائی رکھنا، بڑوں کا ادب اور چھوٹوں سے پیار کرنا اچھے اخلاق ہیں۔",
                    "رښتیا ویل، پاکوالی ساتل او د مشرانو درناوی کول غوره اخلاق دي.",
                    Color(0xFF059669)
                ),
                IslamyatLessonCard(
                    "حضرت آدم (ع) • حضرت ابراہیم (ع) • حضرت موسیٰ (ع) • حضرت عیسیٰ (ع) • حضرت محمد ﷺ",
                    "Prophets of Islam (انبیاء کرام کا تعارف)",
                    "All Prophets called people to worship One Allah. We respect all Prophets of Allah.",
                    "تمام انبیاء کرام سچے تھے اور سب نے ایک اللہ کی عبادت کی دعوت دی۔",
                    "ټول انبیاء کرام رښتیني وو او خلک یې د یو الله عبادت ته رابلل.",
                    Color(0xFF7C3AED)
                )
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How do we reply when someone says 'Assalamu Alaikum'?",
                    "جب کوئی 'السَّلَامُ عَلَيْكُمْ' کہے تو کیا جواب دینا چاہیے؟",
                    "کله چې څوک 'السَّلَامُ عَلَيْكُمْ' ووایي، څه ځواب ورکول پکار دي؟",
                    "السَّلَامُ عَلَيْكُمْ",
                    listOf("وَعَلَيْكُمُ السَّلَامُ (Wa Alaikumus Salam)", "Goodbye", "Nothing"),
                    0
                )
            )
        )
    )
}
