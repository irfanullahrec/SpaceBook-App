package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

data class PashtoWordCard(
    val pashtoWord: String,
    val meaningEn: String,
    val meaningUr: String,
    val meaningPs: String,
    val color: Color
)

data class PashtoStageData(
    val id: Int,
    val lessonRange: String,
    val pageRange: String,
    val titlePs: String,
    val titleUr: String,
    val titleEn: String,
    val themeColor: Color,
    val secondaryColor: Color,
    val summaryPs: String,
    val summaryUr: String,
    val summaryEn: String,
    val gamePromptPs: String,
    val gamePromptUr: String,
    val gamePromptEn: String,
    val words: List<PashtoWordCard>,
    val quizzes: List<NazeraQuizQuestion>
)

object Class1PashtoRepository {
    val stages: List<PashtoStageData> = listOf(
        // STAGE 1: Pashto Alphabet & Hamd / Naat (Lessons 1-2, Pages 1-8)
        PashtoStageData(
            id = 1,
            lessonRange = "لوست 1–2 • Lessons 1–2",
            pageRange = "Pages 01–08",
            titlePs = "پښتو توري، حمد او نعت",
            titleUr = "پشتو حروفِ تہجی، حمد اور نعت",
            titleEn = "Pashto Alphabet (Tori), Hamd & Naat",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF115E59),
            summaryPs = "په دې برخه کې د پښتو توري (ټ، ځ، څ، ډ، ړ، ږ، ښ، ګ، ڼ) او د الله تعالی حمد او د نبي کریم ﷺ نعت زده کوو.",
            summaryUr = "اس سبق میں پشتو کے خاص حروف (ټ، ځ، څ، ډ، ړ، ږ، ښ، ګ، ڼ)، اللہ تعالیٰ کی حمد اور حضور ﷺ کی نعت سیکھیں گے۔",
            summaryEn = "Learn the unique Pashto letters (ټ، ځ، څ، ډ، ړ، ږ، ښ، ګ، ڼ), Praise of Allah (Hamd), and Praise of the Prophet ﷺ (Naat).",
            gamePromptPs = "پښتو کلیمې له سمې معنی سره وصل کړئ!",
            gamePromptUr = "پشتو الفاظ کو ان کے درست معنی سے ملائیں!",
            gamePromptEn = "Match each Pashto letter or word from Hamd & Naat with its meaning!",
            words = listOf(
                PashtoWordCard("ټ ، ځ ، څ ، ډ ، ړ", "Pashto Special Letters 1", "پشتو کے خاص حروف (حصہ اوّل)", "د پښتو ځانګړي توري", Color(0xFF0D9488)),
                PashtoWordCard("ږ ، ښ ، ګ ، ڼ ، ی", "Pashto Special Letters 2", "پشتو کے خاص حروف (حصہ دوم)", "د پښتو نور ځانګړي توري", Color(0xFF0284C7)),
                PashtoWordCard("لوی الله (حمد)", "Great Allah (Hamd)", "بڑا اللہ (حمد — اللہ کی تعریف)", "لوی خدای پاک (د الله ستاینه)", Color(0xFF059669)),
                PashtoWordCard("خوږ نبي ﷺ (نعت)", "Beloved Prophet ﷺ (Naat)", "پیارے نبی ﷺ (نعت شریف)", "زمونږ خوږ پیغمبر حضرت محمد ﷺ", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Which of these is a special letter unique to the Pashto alphabet?",
                    "ان میں سے کون سا حرف پشتو زبان کا خاص حرف ہے؟",
                    "په لاندې تورو کې کوم یو د پښتو ژبې ځانګړی توری دی؟",
                    "پښتو توري",
                    listOf("ښ / ږ / ټ / ځ", "A / B", "1 / 2"),
                    0
                )
            )
        ),

        // STAGE 2: Our Prophet ﷺ, Good Habits & Mother Poem (Lessons 3-5, Pages 9-20)
        PashtoStageData(
            id = 2,
            lessonRange = "لوست 3–5 • Lessons 3–5",
            pageRange = "Pages 09–20",
            titlePs = "زمونږ پیغمبر ﷺ، ښه عادتونه او مور (نظم)",
            titleUr = "ہمارے پیغمبر ﷺ، اچھی عادتیں اور ماں (نظم)",
            titleEn = "Our Prophet ﷺ, Good Habits & Mother (Poem)",
            themeColor = Color(0xFF2563EB),
            secondaryColor = Color(0xFF1E3A8A),
            summaryPs = "حضرت محمد ﷺ زمونږ پیغمبر دی. سهار وختي پاڅېدل، رښتیا ویل او د مور او پلار خبره منل ښه عادتونه دي.",
            summaryUr = "حضرت محمد ﷺ ہمارے پیغمبر ہیں۔ صبح سویرے اٹھنا، سچ بولنا اور ماں باپ کا کہنا ماننا اچھی عادتیں ہیں۔",
            summaryEn = "Hazrat Muhammad ﷺ is our Prophet. Waking up early, speaking the truth, and loving our Mother (Mor) are great habits.",
            gamePromptPs = "د لوست کلیمې له سمې معنی سره وصل کړئ!",
            gamePromptUr = "سبق کے پشتو الفاظ کو ان کے معنی سے ملائیں!",
            gamePromptEn = "Match the Pashto words about Good Habits and Mother with their meanings!",
            words = listOf(
                PashtoWordCard("مور (Mor)", "Mother", "ماں / والدہ", "مور جانه — ډېره مهربانه ده", Color(0xFF2563EB)),
                PashtoWordCard("ښه عادتونه", "Good Habits", "اچھی عادتیں", "نېک خویونه او ښه کارونه", Color(0xFF059669)),
                PashtoWordCard("رښتیا ویل", "Speaking Truth", "سچ بولنا", "تل رښتیا خبرې کول", Color(0xFF7C3AED)),
                PashtoWordCard("سهار وختي", "Early Morning", "صبح سویرے", "سهار وختي له خوبه پاڅېدل", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What does the Pashto word 'مور' (Mor) mean?",
                    "پشتو لفظ 'مور' کا کیا معنی ہے؟",
                    "د 'مور' کلیمې معنی څه ده؟",
                    "مور",
                    listOf("Mother (ماں)", "School (مکتب)", "Book (کتاب)"),
                    0
                )
            )
        ),

        // STAGE 3: Three Fish Story, Cleanliness & Etiquette of Speaking (Lessons 6-8, Pages 21-32)
        PashtoStageData(
            id = 3,
            lessonRange = "لوست 6–8 • Lessons 6–8",
            pageRange = "Pages 21–32",
            titlePs = "درې کبان، صفایي او د خبرو اترو اداب",
            titleUr = "تین مچھلیاں، صفائی اور گفتگو کے آداب",
            titleEn = "Three Fish (Story), Cleanliness & Speaking Manners",
            themeColor = Color(0xFF059669),
            secondaryColor = Color(0xFF064E3B),
            summaryPs = "د درې ماهیانو کیسه موږ ته هوښیارتیا راښیي. صفایي د ایمان نیمه برخه ده او په نرمه ژبه خبرې کول ادب دی.",
            summaryUr = "تین مچھلیوں کی کہانی ہمیں عقلمندی سکھاتی ہے۔ صفائی نصف ایمان ہے اور نرمی سے بات کرنا گفتگو کا ادب ہے۔",
            summaryEn = "The story of Three Fish teaches wisdom. Cleanliness is half of faith, and speaking gently is good manners.",
            gamePromptPs = "د کیسې او صفایۍ کلیمې له سم ځواب سره وصل کړئ!",
            gamePromptUr = "تین مچھلیاں اور صفائی کے الفاظ کو درست معنی سے ملائیں!",
            gamePromptEn = "Match the Pashto words from Lessons 6–8 with their meanings!",
            words = listOf(
                PashtoWordCard("درې ماهیان (کبان)", "Three Fish", "تین مچھلیاں", "په اوبو کې درې ماهیان", Color(0xFF059669)),
                PashtoWordCard("صفایي او پاکوالی", "Cleanliness", "صفائی اور پاکیزگی", "خپل ځان، جامې او کور پاک ساتل", Color(0xFF0284C7)),
                PashtoWordCard("د خبرو اترو اداب", "Manners of Talking", "بات چیت کے آداب", "په نرمه او خوږه ژبه خبرې کول", Color(0xFF7C3AED)),
                PashtoWordCard("اوبه (Oba)", "Water", "پانی", "پاکې او رڼې اوبه", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What does 'درې ماهیان' mean?",
                    "پشتو میں 'درې ماهیان' کسے کہتے ہیں؟",
                    "'درې ماهیان' څه معنی لري؟",
                    "درې ماهیان",
                    listOf("Three Fish (تین مچھلیاں)", "Three Birds", "Three Trees"),
                    0
                )
            )
        ),

        // STAGE 4: Workers, Hawk & Rooster, Rahman Baba & Respect for Elders (Lessons 9-12, Pages 33-46)
        PashtoStageData(
            id = 4,
            lessonRange = "لوست 9–12 • Lessons 9–12",
            pageRange = "Pages 33–46",
            titlePs = "کار او کارکوونکي، باز او چرګ، عبدالرحمان بابا او د مشرانو درناوی",
            titleUr = "محنت کش، باز اور مرغا، عبدالرحمان بابا اور بڑوں کا ادب",
            titleEn = "Workers, Hawk & Rooster, Rahman Baba & Respecting Elders",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            summaryPs = "دهقان، ترکاڼ، موچي او استاد ټول خدمت کوي. عبدالرحمان بابا د پښتو لوی صوفي شاعر و. د مشرانو عزت او درناوی پر موږ لازم دی.",
            summaryUr = "کسان، بڑھئی اور استاد سب محنت کش ہیں۔ عبدالرحمان بابا پشتو کے عظیم صوفی شاعر تھے۔ بڑوں کا ادب ہم سب پر لازم ہے۔",
            summaryEn = "Farmers, carpenters, and teachers work hard. Rahman Baba is the great Sufi poet of Pashto. Always respect elders.",
            gamePromptPs = "د لوست کلیمې له سم ځواب سره وصل کړئ!",
            gamePromptUr = "محنت کش، رحمان بابا اور بڑوں کے ادب کے الفاظ ملائیں!",
            gamePromptEn = "Match the Pashto words from Lessons 9–12 with their meanings!",
            words = listOf(
                PashtoWordCard("کار کوونکي (محنت کش)", "Hard Workers", "محنت کرنے والے لوگ", "دهقان، ترکاڼ، معمار او استاد", Color(0xFF7C3AED)),
                PashtoWordCard("باز او چرګ", "Hawk and Rooster", "باز اور مرغا (کہانی)", "د باز او چرګ خوندوره کیسه", Color(0xFFD97706)),
                PashtoWordCard("عبدالرحمان بابا", "Great Pashto Sufi Poet", "پشتو کے عظیم صوفی شاعر", "د پښتو ژبې نامتو صوفي شاعر", Color(0xFF059669)),
                PashtoWordCard("د مشرانو درناوی", "Respect for Elders", "بڑوں کا ادب و احترام", "د مور، پلار او مشرانو عزت کول", Color(0xFF0284C7))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Who was Abdul Rahman Baba (رحمتہ اللہ علیہ)?",
                    "عبدالرحمان بابا کون تھے؟",
                    "عبدالرحمان بابا رحمتہ الله علیه څوک و؟",
                    "عبدالرحمان بابا",
                    listOf("Famous Sufi Poet of Pashto (پشتو کے مشہور صوفی شاعر)", "Astronaut", "Pilot"),
                    0
                )
            )
        ),

        // STAGE 5: Time, My Home, Our School, Flag & Mobile Phone (Lessons 13-17, Pages 47-67)
        PashtoStageData(
            id = 5,
            lessonRange = "لوست 13–17 • Lessons 13–17",
            pageRange = "Pages 47–67",
            titlePs = "وخت، زما کور، زمونږ ښوونځی، جنډه او موبایل فون",
            titleUr = "وقت، میرا گھر، ہمارا سکول، قومی پرچم اور موبائل فون",
            titleEn = "Time, My Home, Our School, National Flag & Mobile Phone",
            themeColor = Color(0xFFEA580C),
            secondaryColor = Color(0xFF9A3412),
            summaryPs = "وخت ډېر قیمتي دی. زما کور او زمونږ ښوونځی پاک دي. زمونږ د ګران هېواد پاکستان جنډه شنه او سپینه ده.",
            summaryUr = "وقت بہت قیمتی ہے۔ میرا گھر اور ہمارا سکول صاف ستھرا ہے۔ ہمارے پیارے وطن پاکستان کا پرچم سبز اور سفید ہے۔",
            summaryEn = "Time (Wakht) is precious. We love our Home (Kor) and School (Shoonzai). Pakistan's Flag (Janda) is green and white.",
            gamePromptPs = "د کور، ښوونځي او جنډې کلیمې له سمې معنی سره وصل کړئ!",
            gamePromptUr = "گھر، سکول، وقت اور پرچم کے پشتو الفاظ کو معنی سے ملائیں!",
            gamePromptEn = "Match the Pashto words from Lessons 13–17 with their meanings!",
            words = listOf(
                PashtoWordCard("زما کور (Zama Kor)", "My Home", "میرا گھر", "زمونږ خوږ او پاک کور", Color(0xFFEA580C)),
                PashtoWordCard("زمونږ ښوونځی", "Our School", "ہمارا سکول / مدرسہ", "په ښوونځي کې علم او پوهه زده کوو", Color(0xFF2563EB)),
                PashtoWordCard("زمونږ جنډه (پرچم)", "Our National Flag", "ہمارا قومی جھنڈا", "شنه او سپینه د پاکستان جنډه", Color(0xFF16A34A)),
                PashtoWordCard("وخت او موبایل فون", "Time & Mobile Phone", "وقت کی قدر اور موبائل فون", "وخت قیمتي دی — موبایل په احتیاط کاروئ", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What does 'زمونږ ښوونځی' mean in English and Urdu?",
                    "پشتو لفظ 'زمونږ ښوونځی' کا اردو اور انگلش میں کیا مطلب ہے؟",
                    "'زمونږ ښوونځی' څه ته وایي؟",
                    "زمونږ ښوونځی",
                    listOf("Our School (ہمارا سکول)", "Our Hospital", "Our Market"),
                    0
                )
            )
        ),

        // STAGE 6: Hujra, Greedy Dog, Seasons, Computer, Eid & Dua (Lessons 18-23, Pages 68-88)
        PashtoStageData(
            id = 6,
            lessonRange = "لوست 18–23 • Lessons 18–23",
            pageRange = "Pages 68–88",
            titlePs = "حجره، طمعجن سپی، موسمونه، کمپیوټر، اختر او دعا",
            titleUr = "حجرہ، لالچی کتا، موسم، کمپیوٹر، عید اور دعا",
            titleEn = "Hujra, Greedy Dog, 4 Seasons, Computer, Eid & Dua",
            themeColor = Color(0xFFDB2777),
            secondaryColor = Color(0xFF831843),
            summaryPs = "حجره د پښتنو د مېلمه پالنې او جرګې ځای دی. کال کې څلور موسمونه دي (پسرلی، اوړی، منی، ژمی). د کتاب په پای کې خوږه دعا ده.",
            summaryUr = "حجرہ پشتون ثقافت میں مہمان نوازی اور جرگے کی جگہ ہے۔ سال میں چار موسم ہوتے ہیں: بہار (پسرلی)، گرمی (اوړی)، خزاں (منی) اور سردی (ژمی)۔",
            summaryEn = "Hujra is the traditional Pashtun guesthouse. A year has 4 seasons (Psarlai, Orai, Manai, Zhamai). We celebrate Eid (Akhtar) and make Dua.",
            gamePromptPs = "د حجرې، موسمونو، کمپیوټر او اختر کلیمې وصل کړئ!",
            gamePromptUr = "حجرہ، چار موسم، کمپیوٹر، عید اور دعا کے الفاظ کو ملائیں!",
            gamePromptEn = "Match the Pashto words from Lessons 18–23 with their meanings!",
            words = listOf(
                PashtoWordCard("حجره (Hujra)", "Traditional Guest House", "حجرہ (مہمان خانہ و جرگہ)", "د مېلمنو د درناوي او جرګې ځای", Color(0xFFDB2777)),
                PashtoWordCard("څلور موسمونه (پسرلی، اوړی، منی، ژمی)", "Four Seasons of the Year", "سال کے چار موسم (بہار، گرمی، خزاں، سردی)", "د کال څلور ښکلي موسمونه", Color(0xFF059669)),
                PashtoWordCard("کمپیوټر (Computer)", "Computer Machine", "کمپیوٹر کی مشین", "د پوهې او حساب عصري ماشین", Color(0xFF0284C7)),
                PashtoWordCard("اختر او دعا (Eid & Dua)", "Eid Festival & Prayer", "عید کی خوشیاں اور دعا", "د اختر مبارکي او د پای دعا", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What do we call the season of Spring in Pashto?",
                    "بہار کے موسم کو پشتو میں کیا کہتے ہیں؟",
                    "په پښتو کې د بهار موسم ته څه وایي؟",
                    "🌸 Spring",
                    listOf("پسرلی (Psarlai)", "ژمی (Winter)", "اوړی (Summer)"),
                    0
                ),
                NazeraQuizQuestion(
                    "What is 'اختر' (Akhtar) in English/Urdu?",
                    "پشتو میں 'اختر' کس تہوار کو کہتے ہیں؟",
                    "'اختر' کومې ورځې ته ویل کېږي؟",
                    "🌙 اختر مو مبارک شه",
                    listOf("Eid (عید)", "School Day", "Rainy Day"),
                    0
                )
            )
        )
    )
}
