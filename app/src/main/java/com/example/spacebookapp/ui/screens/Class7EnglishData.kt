package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

data class Class7EnglishCard(
    val title: String,
    val ruleOrConcept: String,
    val detailEn: String,
    val detailUr: String,
    val detailPs: String,
    val cardColor: Color
)

data class Class7EnglishStage(
    val id: Int,
    val unitNumber: String,
    val pageRange: String,
    val titleEn: String,
    val titleUr: String,
    val titlePs: String,
    val themeColor: Color,
    val secondaryColor: Color,
    val summaryEn: String,
    val summaryUr: String,
    val summaryPs: String,
    val keyRules: List<String>,
    val cards: List<Class7EnglishCard>,
    val quizzes: List<Class7QuizQuestion>
)

object Class7EnglishRepository {
    val stages: List<Class7EnglishStage> = listOf(
        // ─── UNIT 1: THE LAST SERMON OF HAZRAT MUHAMMAD (PBUH) (p. 1–14) ───
        Class7EnglishStage(
            id = 1,
            unitNumber = "Unit 1",
            pageRange = "Pages 1–14",
            titleEn = "The Last Sermon of Hazrat Muhammad (PBUH)",
            titleUr = "خطبہ حجتہ الوداع",
            titlePs = "د حجة الوداع خطبه",
            themeColor = Color(0xFF1E3A8A),
            secondaryColor = Color(0xFF0F172A),
            summaryEn = "Delivered on Mount Arafat (9th Dhu al-Hijjah, 10 AH), the Farewell Sermon established universal human rights, racial equality (no Arab is superior to a non-Arab except by piety), the sanctity of human life and property, abolition of usury (Riba) and blood feuds, and compassionate treatment of women. The Holy Quran and Sunnah remain mankind's eternal guidance.",
            summaryUr = "9 ذوالحجہ 10 ہجری کو میدانِ عرفات میں دیا گیا خطبہ حجتہ الوداع انسانی حقوق کا عالمگیر چارٹر ہے۔ اس نے نسلی برابری (کسی عربی کو عجمی پر تقویٰ کے سوا فضیلت نہیں)، جان و مال کے تقدس، سود اور جاہلیت کے بدلے کے خاتمے اور خواتین کے ساتھ حسن سلوک کی بنیاد رکھی۔ قرآن اور سنت ابدی رہنمائی ہیں۔",
            summaryPs = "د عرفات په غره کې د حجة الوداع خطبه د بشري حقونو لومړنی نړیوال منشور دی چې د توکمپالنې ختمول، د انسان د ژوند او مال سپېڅلتیا، د سود ختمول، او له ښځو سره نېک چلند بیانوي. قرآن او سنت تلپاتې لارښوونې دي.",
            keyRules = listOf(
                "Grammar - Articles: Indefinite (a / an) for singular countable non-specific nouns; Definite (the) for specific nouns or unique entities (the Sun, the Holy Quran)",
                "Countable vs Uncountable: Countable nouns have plurals (sermon/sermons); Uncountable nouns do not (piety, guidance, water) and take 'much/little' not 'many'",
                "Writing Skill: Expository paragraph structure - Topic sentence, supporting textual evidence, concluding clincher"
            ),
            cards = listOf(
                Class7EnglishCard(
                    title = "Universal Human Equality",
                    ruleOrConcept = "Charter of Human Rights",
                    detailEn = "The Prophet declared: 'An Arab has no superiority over a non-Arab nor a non-Arab has any superiority over an Arab; also a white has no superiority over a black, nor a black has any superiority over a white, except by piety and good action.'",
                    detailUr = "نبی کریم ﷺ نے فرمایا: 'کسی عربی کو کسی عجمی پر اور کسی عجمی کو کسی عربی پر، نہ کسی گورے کو کالے پر اور نہ کسی کالے کو گورے پر کوئی فضیلت حاصل ہے سوائے تقویٰ اور اچھے اعمال کے۔'",
                    detailPs = "رسول الله ﷺ وفرمایل: 'هېڅ عرب پر عجم او هېڅ عجم پر عرب، هېڅ سپین پر تور او هېڅ تور پر سپین برتري نه لري پرته له تقوی او ښو عملونو.'",
                    cardColor = Color(0xFF1E3A8A)
                ),
                Class7EnglishCard(
                    title = "Use of Articles (A, An, The)",
                    ruleOrConcept = "Phonetic Vowel Sounds",
                    detailEn = "Use 'an' before vowel SOUNDS, not letters (e.g. an honest man, an hour, an umbrella, but a university, a European). Use 'the' before specific references, rivers, oceans, holy books, and superlatives (the highest mountain).",
                    detailUr = "آرٹیکل 'an' واول آوازوں سے پہلے آتا ہے نہ کہ صرف حروف سے (جیسے an honest man، an hour، لیکن a university)۔ 'the' مخصوص اسمائے معرفہ، دریاؤں، مقدس کتابوں اور سپرلیٹو ڈگری سے پہلے لگتا ہے۔",
                    detailPs = "د 'an' کارول د غږیزو تورو په تلفظ پورې اړه لري (لکه an hour خو a university). او 'the' د ځانګړو پېژندل شوو نومونو، کتابونو او سیندونو مخکې راځي.",
                    cardColor = Color(0xFF2563EB)
                ),
                Class7EnglishCard(
                    title = "Countable vs Uncountable",
                    ruleOrConcept = "Quantifier Agreement",
                    detailEn = "Countable nouns can be counted individually and have plural forms (message/messages, believer/believers). Uncountable nouns cannot be counted in plural and take singular verbs (advice, information, Taqwa, blood). Use 'many' with countable and 'much' with uncountable.",
                    detailUr = "کاؤنٹ ایبل اسم جمع بن سکتے ہیں (book/books) اور ان کے ساتھ 'many' لگتا ہے۔ ان کاؤنٹ ایبل اسم کی جمع نہیں ہوتی (advice, water) اور ان کے ساتھ 'much' یا 'a lot of' لگتا ہے، کبھی بھی 'an advice' نہیں کہا جاتا۔",
                    detailPs = "شمېرل کېدونکي نومونه جمع لري او many ورسره راځي. نه شمېرل کېدونکي جمع نه لري او much ورسره کارول کیږي (لکه اوبه، مالومات، تقوی).",
                    cardColor = Color(0xFF1D4ED8)
                ),
                Class7EnglishCard(
                    title = "Sanctity of Life & Women's Rights",
                    ruleOrConcept = "Protection of the Vulnerable",
                    detailEn = "The sermon established that a Muslim's life, property, and honor are as sacred as the sacred month and sacred city of Makkah. It commanded men to treat women with kindness, respect, and fairness, affirming mutual reciprocal obligations.",
                    detailUr = "خطبے میں واضح کیا گیا کہ مسلمان کی جان، مال اور عزت ایک دوسرے پر اتنی ہی حرام اور مقدس ہے جتنا یہ مقدس مہینہ اور مکہ کا مقدس شہر۔ مردوں کو خواتین کے حقوق کی حفاظت اور نرمی برتنے کی تاکیدی ہدایت فرمائی گئی۔",
                    detailPs = "په خطبه کې د مسلمانانو مال او عزت سپېڅلی وګڼل شو او نارینه وو ته امر وشو چې له ښځو سره په پوره مهربانۍ، انصاف او درناوي چلند وکړي.",
                    cardColor = Color(0xFF0F172A)
                ),
                Class7EnglishCard(
                    title = "Contextual Vocabulary",
                    ruleOrConcept = "Piety, Sacred, Usury, Reciprocal",
                    detailEn = "Key textbook vocabulary: Piety (devotion to God, righteousness); Sacred (holy, inviolable); Usury/Riba (unlawful interest); Reciprocal (mutual, shared action between two parties); Transgression (violating a boundary or law).",
                    detailUr = "اہم الفاظ: Piety (تقویٰ، نیکی)؛ Sacred (مقدس)؛ Usury (سود)؛ Reciprocal (باہمی، دوطرفہ)؛ Transgression (حد سے تجاوز، نافرمانی)۔",
                    detailPs = "مهم لغات: Piety (تقوی او پرهیزګاري)؛ Sacred (سپېڅلی)؛ Usury (سود)؛ Reciprocal (دوه اړخیزه)؛ Transgression (تېری او سرغړونه).",
                    cardColor = Color(0xFF3B82F6)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Choose the grammatically correct sentence regarding the use of indefinite and definite articles:",
                    questionUr = "آرٹیکلز کے درست استعمال کے لحاظ سے گرامر کے مطابق درست جملہ منتخب کریں:",
                    questionPs = "د آرټیکلونو د سم کارونې له مخې ګرامري پلوه سمه جمله وټاکئ:",
                    options = listOf(
                        "The Holy Prophet delivered an inspiring sermon to a large gathering on Mount Arafat.",
                        "A Holy Prophet delivered a inspiring sermon to the large gathering on Mount Arafat.",
                        "The Holy Prophet delivered a inspiring sermon to an large gathering on Mount Arafat.",
                        "Holy Prophet delivered an inspiring sermon to a large gathering on the Mount Arafat."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'The Holy Prophet' takes the definite article 'The' because he is uniquely identified. 'An inspiring' correctly uses 'an' before the vowel sound /ɪ/ in inspiring. 'A large' correctly uses 'a' before the consonant sound /l/.",
                    whyExplanationUr = "نبی کریم ﷺ کے لیے مخصوص آرٹیکل 'The' آتا ہے۔ 'inspiring' واول آواز سے شروع ہوتا ہے اس لیے اس سے پہلے 'an' آئے گا، اور 'large' کانسوننٹ آواز ہے اس لیے 'a' آئے گا۔",
                    whyExplanationPs = "د حضرت محمد ﷺ مخکې 'The' ځکه راځي چې ځانګړی دی. د 'inspiring' مخکې د غږیز توري له امله 'an' او د 'large' مخکې 'a' راځي.",
                    formulaOrStep = "The (Unique title) + an inspiring (vowel sound) + a large (consonant sound)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following contains ONLY uncountable abstract nouns that cannot take plural '-s' endings?",
                    questionUr = "درج ذیل میں سے کس آپشن میں صرف ان کاؤنٹ ایبل اسمائے تجرید (ابسٹریکٹ ناؤنز) شامل ہیں جن کی جمع نہیں بنتی؟",
                    questionPs = "په لاندې کوم انتخاب کې یوازې نه شمېرل کېدونکي معنوي نومونه دي چې د جمعې 's' نه اخلي؟",
                    options = listOf(
                        "Piety, guidance, advice, knowledge",
                        "Sermon, pilgrim, camel, valley",
                        "Message, companion, right, duty",
                        "Nation, leader, law, constitution"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Piety, guidance, advice, and knowledge are uncountable abstract entities. They represent continuous concepts rather than discrete units, take singular verbs, and cannot be pluralized (one cannot say 'advices' or 'knowledges').",
                    whyExplanationUr = "تقویٰ (Piety)، رہنمائی (guidance)، نصیحت (advice) اور علم (knowledge) ان کاؤنٹ ایبل اسم ہیں جن کی کوئی جمع نہیں ہوتی اور ان سے پہلے 'a' یا 'an' براہ راست نہیں لگتا۔",
                    whyExplanationPs = "تقوی، لارښوونه، مشوره او پوهه داسې نومونه دي چې شمېرل کیږي نه او هېڅکله جمع نه جوړوي.",
                    formulaOrStep = "Abstract Concepts = Uncountable nouns ➔ No plural form",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What fundamental social principle of universal equality was promulgated in the Farewell Sermon regarding race and nationality?",
                    questionUr = "خطبہ حجتہ الوداع میں نسل اور قومیت کے بارے میں عالمگیر برابری کا کون سا بنیادی اصول بیان فرمایا گیا؟",
                    questionPs = "د حجة الوداع په خطبه کې د نژاد او قومیت په اړه د نړیوال مساوات کوم بنسټیز اصل اعلان شو؟",
                    options = listOf(
                        "No race or nationality is superior to another; the sole criterion of nobility and honour is Taqwa (piety and righteousness)",
                        "Tribal lineage and inherited wealth determine social supremacy",
                        "Arabs have automatic superiority over all non-Arab citizens",
                        "White skin possesses inherent privilege over black skin"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The Last Sermon dismantled all tribal, racial, and nationalist prejudices over 1,400 years ago, declaring that physical ethnicity is irrelevant before Allah and that righteousness (Taqwa) is the only standard of human merit.",
                    whyExplanationUr = "خطبہ حجتہ الوداع نے رنگ، نسل اور قبیلے کی بنیاد پر تمام برتریوں کو کالعدم قرار دے کر واضح کیا کہ اللہ کے ہاں عزت کا واحد معیار صرف اور صرف تقویٰ اور نیکی ہے۔",
                    whyExplanationPs = "خطبې اعلان وکړ چې هېڅ قوم یا رنګ پر بل غوره نه دی او د انسان د فضیلت یوازینی معیار یوازې تقوی او نېک عمل دی.",
                    formulaOrStep = "Universal Equality: Arab = Non-Arab, White = Black; Merited solely by Taqwa",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Identify the sentence that correctly uses the quantifier 'much' versus 'many':",
                    questionUr = "کوانٹیفائر 'much' اور 'many' کے درست استعمال والا جملہ پہچانیں:",
                    questionPs = "هغه جمله وپېژنئ چې د 'much' او 'many' سمه کارونه پکې شوې وي:",
                    options = listOf(
                        "Many pilgrims gathered on Mount Arafat, receiving much divine guidance from the sermon.",
                        "Much pilgrims gathered on Mount Arafat, receiving many divine guidance from the sermon.",
                        "Many guidance was given to much pilgrims on Mount Arafat.",
                        "Pilgrims did not have many knowledge about the much journeys."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'Pilgrims' is a plural countable noun, requiring 'many'. 'Guidance' is an uncountable abstract noun, requiring 'much'. Therefore, 'Many pilgrims... much guidance' is the only grammatically correct structure.",
                    whyExplanationUr = "'pilgrims' چونکہ کاؤنٹ ایبل جمع ہے اس لیے اس کے ساتھ 'many' آئے گا۔ 'guidance' ان کاؤنٹ ایبل ہے اس لیے اس کے ساتھ 'much' آئے گا۔",
                    whyExplanationPs = "د حاجیانو (pilgrims) د شمېرنې وړ نوم سره 'many' او د لارښوونې (guidance) د نه شمېرنې وړ نوم سره 'much' راځي.",
                    formulaOrStep = "Many + Plural Countable (Pilgrims) ; Much + Uncountable (Guidance)",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the antonym of the vocabulary word 'Inviolable' as used in the context of the sanctity of human life?",
                    questionUr = "انسانی جان کے تقدس کے تناظر میں استعمال ہونے والے لفظ 'Inviolable' (ناقابلِ تنسیخ/مقدس) کا متضاد (Antonym) کیا ہے؟",
                    questionPs = "د انسان د ژوند د سپېڅلتیا په تړاو د 'Inviolable' (نه ماتېدونکی) متضاد (ضد) لفظ کوم دی؟",
                    options = listOf(
                        "Vulnerable / Breach-able",
                        "Sacred / Holy",
                        "Permanent / Enduring",
                        "Divine / Eternal"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'Inviolable' means secure from violation or destruction, sacred and untouchable. Its true antonym is 'vulnerable', 'breach-able', or 'defenseless'.",
                    whyExplanationUr = "'Inviolable' کا مطلب ہے مقدس اور جس کی پامالی نہ کی جا سکے۔ اس کا متضاد لفظ 'vulnerable' (آسیب پذیر، جو پامال کیا جا سکے) ہے۔",
                    whyExplanationPs = "د Inviolable مانا خوندي او سپېڅلی دی. د هغې متضاد لفظ Vulnerable (زیان منونکی او ماتېدونکی) دی.",
                    formulaOrStep = "Inviolable (unbreakable/sacred) ⟷ Vulnerable (capable of being harmed)",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 2: NATURE AND NATURAL WONDERS (p. 15–30) ───
        Class7EnglishStage(
            id = 2,
            unitNumber = "Unit 2",
            pageRange = "Pages 15–30",
            titleEn = "Nature & Natural Wonders",
            titleUr = "قدرت اور قدرتی عجائبات",
            titlePs = "طبیعت او طبیعي ښکلاوې",
            themeColor = Color(0xFF047857),
            secondaryColor = Color(0xFF064E3B),
            summaryEn = "Explores the breath-taking natural wonders of Pakistan and the globe: the ancient Khewra Salt Mines, the majestic Trango Granite Towers in Gilgit-Baltistan, and deep forest ecosystems. Focuses on descriptive sensory imagery, denotative (literal) vs connotative (associative) word meanings, degrees of adjectives, similes, metaphors, and Haiku poetry structure (5-7-5 syllables).",
            summaryUr = "پاکستان اور دنیا کے قدرتی عجائبات کا تعارف: کھیوڑہ سالٹ مائنز، گلگت بلتستان کے ٹرانگو ٹاورز اور سرسبز جنگلات۔ اس یونٹ میں لفظی (ڈینوٹیٹو) اور تاثراتی (کونوٹیٹو) معانی، صفت کے درجات، تشبیہات (سملیز)، استعارے (میٹافورز) اور ہائیکو شاعری (5-7-5 سلیبلز) پر توجہ دی گئی ہے۔",
            summaryPs = "د پاکستان او نړۍ د ښکلو طبیعي سیمو ستاینه لکه د خېوړې د مالګې کان او د ګلګت د ټرانګو لوړې څوکې. د لغاتو اصلي او احساساتي ماناګانې، صفتونه، تشبیه، استعاره، او د هایکو شعر جوړښت (۵-۷-۵ څپې) زده کیږي.",
            keyRules = listOf(
                "Denotation vs Connotation: Denotation is literal dictionary definition (home = a building where someone lives); Connotation is emotional feeling (home = warmth, safety, family)",
                "Figures of Speech: Simile compares two things using 'like' or 'as' (as sturdy as an oak); Metaphor asserts direct identity without 'like/as' (time is a thief)",
                "Degrees of Adjectives: Positive (deep), Comparative (deeper - comparing 2), Superlative (deepest - comparing 3 or more with 'the')"
            ),
            cards = listOf(
                Class7EnglishCard(
                    title = "Khewra Salt Mines & Trango Towers",
                    ruleOrConcept = "Pakistan's Natural Marvels",
                    detailEn = "Khewra in Jhelum is the world's second largest salt mine, discovered when Alexander the Great's horses licked the rocks in 326 BC. Trango Towers in Baltistan are the world's greatest vertical rock granite cliffs, rising over 6,200 meters into the Karakoram sky.",
                    detailUr = "جہلم میں کھیوڑہ نمک کی کان دنیا کی دوسری بڑی نمک کی کان ہے، جسے 326 قبل مسیح میں سکندر اعظم کے گھوڑوں نے نمک چاٹ کر دریافت کیا تھا۔ بلتستان کے ٹرانگو ٹاورز قراقرم میں دنیا کی بلند ترین عمودی چٹانیں ہیں۔",
                    detailPs = "په جهلم کې د خېوړې کان د نړۍ دویم ستر د مالګې کان دی چې سکندر اعظم آسونو وموند. د بلتستان ټرانګو ټاورز د نړۍ تر ټولو لوړې عمودي تیږینې څوکې دي.",
                    cardColor = Color(0xFF047857)
                ),
                Class7EnglishCard(
                    title = "Denotation vs Connotation",
                    ruleOrConcept = "Literal vs Emotional Tone",
                    detailEn = "Denotation is objective dictionary definition. Connotation is cultural/emotional shade: 'Shrewd' vs 'Clever' vs 'Cunning'. While 'thrifty' has positive connotation (wise with money), 'stingy' has negative connotation (miserly).",
                    detailUr = "ڈینوٹیشن لفظ کے لغوی معنی ہیں۔ کونوٹیشن اس کے ساتھ وابستہ مثبت یا منفی تاثر ہے۔ مثلاً 'thrifty' (سمجھداری سے خرچ کرنے والا) مثبت تاثر رکھتا ہے، جبکہ 'stingy' (کنجوس) منفی تاثر رکھتا ہے۔",
                    detailPs = "ډینوټیشن د کلمې لغوي مانا ده. کونوټیشن هغه احساساتي اغېز دی چې کلمه یې لري، لکه د هوښیار او مکار ترمنځ توپیر.",
                    cardColor = Color(0xFF059669)
                ),
                Class7EnglishCard(
                    title = "Simile vs Metaphor",
                    ruleOrConcept = "Figurative Language",
                    detailEn = "Simile compares using 'like' or 'as': 'The salt crystals sparkled like scattered diamonds.' Metaphor states that one thing IS another: 'The Karakoram range is a jagged spine of ice.'",
                    detailUr = "تشبیہ (Simile) میں 'like' یا 'as' کا لفظ استعمال ہوتا ہے (ہیرے کی طرح چمکتا ہوا)۔ استعارہ (Metaphor) میں براہ راست مشابہت دی جاتی ہے بغیر 'like' یا 'as' کے (وقت بہتا ہوا دریا ہے)۔",
                    detailPs = "تشبیه (Simile) د like یا as په وسیله دوه شیان پرتله کوي؛ استعاره (Metaphor) پرته له دې ټکو یو شی بل ته منسوبوي.",
                    cardColor = Color(0xFF10B981)
                ),
                Class7EnglishCard(
                    title = "Compound Adjectives",
                    ruleOrConcept = "Hyphenated Modifiers",
                    detailEn = "Formed when two words combine before a noun to modify it: snow-capped mountains, sun-drenched valleys, crystal-clear streams, awe-inspiring cliffs, world-renowned heritage.",
                    detailUr = "کمپاؤنڈ ایڈجیکٹو وہ ہوتا ہے جس میں دو الفاظ ہائفن (-) کے ساتھ مل کر اسم کی صفت بیان کرتے ہیں: snow-capped (برف پوش)، crystal-clear (شفاف)، awe-inspiring (پُر ہیبت)۔",
                    detailPs = "مرکب صفتونه هغه دي چې دوه توري په ګډه یو اسم توصیفوي، لکه په واوره پوښلي غرونه (snow-capped).",
                    cardColor = Color(0xFF065F46)
                ),
                Class7EnglishCard(
                    title = "Haiku Poetry Structure",
                    ruleOrConcept = "Traditional 5-7-5 Syllables",
                    detailEn = "A Japanese poetic form focusing on nature: Line 1 has 5 syllables; Line 2 has 7 syllables; Line 3 has 5 syllables (total 17 syllables). Example: 'Green leaves in the breeze (5) / Dancing under summer sun (7) / Whispering of life (5)'.",
                    detailUr = "ہائیکو روایتی جاپانی شاعری کی صنف ہے جس میں 3 سطریں اور کل 17 سلیبلز ہوتے ہیں: پہلی سطر میں 5 سلیبلز، دوسری میں 7 سلیبلز، اور تیسری میں 5 سلیبلز ہوتے ہیں۔",
                    detailPs = "هایکو د جاپاني شعر هغه بڼه ده چې ۳ کرښې لري: لومړۍ کرښه ۵ څپې، دویمه ۷ څپې او درېیمه ۵ څپې لري (ټولټال ۱۷ څپې).",
                    cardColor = Color(0xFF064E3B)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "In the sentence: 'The fog was a thick grey blanket that wrapped around the sleeping valley', what literary device is used?",
                    questionUr = "جملے: 'دھند ایک موٹا سرمئی کمبل تھی جس نے سوئی ہوئی وادی کو لپیٹ رکھا تھا' میں کون سی ادبی صنعت (فگر آف اسپیچ) استعمال ہوئی ہے؟",
                    questionPs = "په دې جمله کې: 'لړه یو پنډ خړ کمبل و چې ویده دره یې نغښتې وه'، کوم ادبي صنعت کارول شوی؟",
                    options = listOf(
                        "A Metaphor, directly equating the fog to a blanket without using 'like' or 'as'",
                        "A Simile, because it uses the comparative conjunction 'like'",
                        "An Alliteration of hard vowel sounds",
                        "An Onomatopoeia of falling water"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "A metaphor asserts an imaginative identity between two unlike things directly ('the fog was a blanket') without using comparative bridge words like 'as' or 'like'.",
                    whyExplanationUr = "یہ ایک استعارہ (Metaphor) ہے کیونکہ دھند کو براہ راست بغیر 'like' یا 'as' کے کمبل کہا گیا ہے۔ اگر 'like a blanket' ہوتا تو یہ تشبیہ (Simile) ہوتی۔",
                    whyExplanationPs = "دا استعاره ده، ځکه لړه مستقیماً بې له 'like' یا 'as' کمبل ته ورته شوې ده.",
                    formulaOrStep = "Direct Equivalence (A was B) without 'like/as' = Metaphor",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following word pairs demonstrates a positive connotation versus a negative connotation for the same denotative meaning?",
                    questionUr = "درج ذیل میں سے کون سا جوڑا ایک جیسے لغوی معنی کے لیے مثبت تاثر (پازیٹو کونوٹیشن) بمقابلہ منفی تاثر ظاہر کرتا ہے؟",
                    questionPs = "کومه جوړه کلمې د یوه لغوي مفهوم لپاره مثبت او منفي احساساتي تاثر (کونوټیشن) ښيي؟",
                    options = listOf(
                        "'Economical' (positive) versus 'Cheap' (negative) when describing a product's price",
                        "'Tall' versus 'Short' when measuring height",
                        "'Hot' versus 'Cold' when describing temperature",
                        "'Salt' versus 'Sugar' when cooking meals"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Both 'economical' and 'cheap' denotatively mean low in monetary cost. However, 'economical' has a positive connotation of smart budgeting, while 'cheap' connotes shoddy, poor quality or stinginess.",
                    whyExplanationUr = "'Economical' اور 'Cheap' دونوں کے لغوی معنی کم قیمت ہونا ہے۔ لیکن 'economical' مثبت تاثر دیتا ہے (بچت والا)، جبکہ 'cheap' منفی تاثر دیتا ہے (گھٹیا معیار والا)۔",
                    whyExplanationPs = "دواړه د کمې بیې مانا لري، خو 'economical' د سپما مثبت احساس لري او 'cheap' د بې کیفیته او بد شی منفي احساس ورکوي.",
                    formulaOrStep = "Denotation = Low cost ➔ Connotation: Economical (+) vs Cheap (-)",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Select the sentence that correctly follows the rules for forming comparative and superlative degrees of adjectives:",
                    questionUr = "صفت کے کمپیریٹو اور سپرلیٹو درجات کے درست قواعد پر مبنی جملہ منتخب کریں:",
                    questionPs = "د صفتونو د درجو (Comparative او Superlative) د اصولو له مخې سم انتخاب وټاکئ:",
                    options = listOf(
                        "Trango Tower has the steepest vertical rock wall in the Karakoram range, steeper than any cliff in Europe.",
                        "Trango Tower has the most steepest vertical rock wall in the Karakoram range, more steep than any cliff.",
                        "Trango Tower is more steeper than any cliff in Europe, having the steepest wall.",
                        "Trango Tower has the steepiest cliff, being steeperer than all others."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'Steep' is a one-syllable adjective. Its comparative is formed by adding -er ('steeper'), and its superlative by adding 'the' + -est ('the steepest'). Double comparatives ('more steeper' or 'most steepest') are strictly ungrammatical.",
                    whyExplanationUr = "ایک سلیبل والے صفت جیسے 'steep' کے ساتھ کمپیریٹو میں -er (steeper) اور سپرلیٹو میں 'the' کے ساتھ -est (the steepest) لگتا ہے۔ 'more steeper' کہنا گرامر کے خلاف ہے۔",
                    whyExplanationPs = "د یوې څپې لرونکی صفت (steep) په دویمه درجه کې steeper او درېیمه کې the steepest اخلي، د more او most اضافه کول تېروتنه ده.",
                    formulaOrStep = "Positive: steep ➔ Comparative: steeper ➔ Superlative: the steepest",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the mandatory syllable pattern required to compose an authentic Haiku poem?",
                    questionUr = "ایک مستند ہائیکو نظم تخلیق کرنے کے لیے سلیبلز (آواز کی اکائیوں) کی لازمی ترتیب کیا ہوتی ہے؟",
                    questionPs = "د یوه دودیز هایکو شعر د لیکلو لپاره د څپو (Syllables) لازمي جوړښت څه دی؟",
                    options = listOf(
                        "Line 1: 5 syllables; Line 2: 7 syllables; Line 3: 5 syllables (Total 17 syllables)",
                        "Line 1: 7 syllables; Line 2: 5 syllables; Line 3: 7 syllables",
                        "4 lines with 10 syllables each (Iambic pentameter)",
                        "2 lines of rhyming couplets with 12 syllables"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "A traditional Haiku consists of exactly three unrhymed lines following the strict 5-7-5 phonetic syllable metric, capturing a brief evocative observation of nature.",
                    whyExplanationUr = "روایتی ہائیکو میں بالکل تین سطریں ہوتی ہیں جن کا وزن 5-7-5 سلیبلز ہوتا ہے (پہلی میں 5، دوسری میں 7، تیسری میں 5)۔",
                    whyExplanationPs = "دودیز هایکو تل ۳ کرښې لري چې لومړۍ ۵، دویمه ۷ او درېیمه ۵ څپې وي چې ټولټال ۱۷ څپې جوړوي.",
                    formulaOrStep = "Haiku Structure: 5 syllables ➔ 7 syllables ➔ 5 syllables",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following hyphenated compound adjectives is punctuated and utilized correctly in modifying a noun?",
                    questionUr = "اسم کی صفت بیان کرنے کے لیے درج ذیل میں سے کون سا ہائفن والا کمپاؤنڈ ایڈجیکٹو درست استعمال ہوا ہے؟",
                    questionPs = "له لاندې مواردو څخه کوم مرکب صفت (Compound Adjective) د یوه اسم په تشریح کې سم کارول شوی؟",
                    options = listOf(
                        "The tourists embarked on a breathtaking, snow-capped mountain expedition.",
                        "The tourists embarked on an expedition that was snow-capped mountain.",
                        "The mountain was snow-capped-summit in winter.",
                        "The tourists loved the snow capped-mountain."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "When a compound adjective directly precedes the noun it modifies, it must be hyphenated to function as a unified adjective unit: 'snow-capped mountain'.",
                    whyExplanationUr = "جب دو الفاظ مل کر اسم سے پہلے اس کی صفت بنتے ہیں تو ان کے درمیان ہائفن لگتا ہے جیسے 'snow-capped mountain'۔",
                    whyExplanationPs = "کله چې دوه کلمې د یوه اسم مخکې د صفت په توګه راشي، ترمنځ یې نښلوونکی خط (-) راځي لکه snow-capped mountain.",
                    formulaOrStep = "Compound Adjective + Noun ➔ Hyphen required (snow-capped mountain)",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 3: TRAVEL, TRANSPORT & FUTURE TECHNOLOGY (p. 31–49) ───
        Class7EnglishStage(
            id = 3,
            unitNumber = "Unit 3",
            pageRange = "Pages 31–49",
            titleEn = "Travel, Transport & Technology",
            titleUr = "سفر، ذرائع نقل و حمل اور ٹیکنالوجی",
            titlePs = "سفر، ترانسپورت او نوې ټیکنالوژي",
            themeColor = Color(0xFFD97706),
            secondaryColor = Color(0xFF78350F),
            summaryEn = "Traces the evolution of transportation from historical steam locomotives to cutting-edge solar-powered flight (Solar Impulse) and magnetic levitation (Maglev) bullet trains. Highlights Robert Louis Stevenson's rhythmic poem 'From a Railway Carriage'. Focuses on silent letters, homographs/homophones, adverbs and sentence connectives, modal auxiliary verbs (must, should, ought to), and formal letter writing.",
            summaryUr = "بھاپ کے پرانے انجنوں سے لے کر شمسی توانائی سے اڑنے والے ہوائی جہازوں (سولر امپلس) اور مقناطیسی میگلیو ٹرینوں تک نقل و حمل کا ارتقا۔ رابرٹ لوئس سٹیونسن کی نظم 'From a Railway Carriage'۔ اس یونٹ میں خاموش حروف (سائلنٹ لیٹرز)، ہوموگرافس، ایڈوربس، کنیکٹیو الفاظ اور موڈل وربز شامل ہیں۔",
            summaryPs = "د بخار له زړو اورګاډو څخه نیولې تر لمریزو الوتکو او تیزو میګلیو ټرینونو پورې د ترانسپورت تاریخ او راتلونکی. پټ توري (Silent letters)، قیدونه، او مرستیال فعلونه (must, should) زده کیږي.",
            keyRules = listOf(
                "Silent Letters: Letters written in spelling but not pronounced (k in knight, b in doubt/climb, w in sword/write, l in half/calm, g in sign)",
                "Modal Auxiliaries: Express obligation (must = strict requirement; should/ought to = moral recommendation; can/could = ability/possibility)",
                "Sentence Connectives: Transition devices linking ideas logically (Cause: therefore, consequently; Contrast: however, on the contrary; Addition: furthermore, moreover)"
            ),
            cards = listOf(
                Class7EnglishCard(
                    title = "Silent Letter Patterns",
                    ruleOrConcept = "Phonetic Rules in English",
                    detailEn = "Historical changes left English with silent consonants: Silent 'k' before 'n' (knee, knock, knot); Silent 'b' after 'm' or before 't' (comb, thumb, doubt, debt); Silent 'w' before 'r' (wrap, wrist, wrong); Silent 'h' after 'g' (ghost).",
                    detailUr = "انگریزی میں کئی حروف لکھے جاتے ہیں مگر بولے نہیں جاتے: n سے پہلے k سائلنٹ ہوتا ہے (knee, know)؛ m کے بعد b سائلنٹ ہوتا ہے (comb, thumb)؛ r سے پہلے w سائلنٹ ہوتا ہے (write, wrong)۔",
                    detailPs = "په انګلیسي کې ځینې توري نه تلفظ کیږي: له n مخکې k (knee)، له m وروسته b (thumb)، او له r مخکې w (write) پټ وي.",
                    cardColor = Color(0xFFB45309)
                ),
                Class7EnglishCard(
                    title = "Homophones vs Homographs",
                    ruleOrConcept = "Same Sound vs Same Spelling",
                    detailEn = "Homophones sound identical but differ in spelling and meaning: fare/fair, brake/break, steel/steal, plane/plain. Homographs share identical spelling but differ in meaning/pronunciation: lead (metal) vs lead (guide); tear (crying) vs tear (rip).",
                    detailUr = "ہوموفونز (Homophones) کی آواز ایک جیسی مگر ہجے اور معنی الگ ہوتے ہیں: brake (گاڑی کی بریک) / break (توڑنا)۔ ہوموگرافس (Homographs) کے ہجے ایک جیسے مگر معنی مختلف ہوتے ہیں: train (ریل گاڑی) / train (تربیت دینا)۔",
                    detailPs = "هوموفون هغه دي چې غږ یې یو خو لیکل یې جلا وي (brake / break). هوموګراف هغه دي چې لیکل یې یو خو مانا یې جلا وي.",
                    cardColor = Color(0xFFD97706)
                ),
                Class7EnglishCard(
                    title = "Modal Auxiliary Verbs",
                    ruleOrConcept = "Must, Should, Can, Ought To",
                    detailEn = "'Must' indicates imperative obligation or law ('Passengers must wear seatbelts'). 'Should / Ought to' conveys moral advice or recommendation ('We should switch to electric trains'). 'Can' denotes capability ('Solar airplanes can fly without fuel').",
                    detailUr = "'Must' لازمی قانون یا حکم ظاہر کرتا ہے (مسافروں کو سیٹ بیلٹ ضرور باندھنا چاہیے)۔ 'Should' مشورہ یا نصیحت ظاہر کرتا ہے (ہمیں ماحول دوست گاڑیاں استعمال کرنی چاہئیں)۔ 'Can' صلاحیت بتاتا ہے۔",
                    detailPs = "'Must' حتمي او لازمي امر ښيي. 'Should' اخلاقي مشوره او سپارښتنه ښيي. او 'Can' توانايي او وړتیا څرګندوي.",
                    cardColor = Color(0xFF92400E)
                ),
                Class7EnglishCard(
                    title = "Sentence Connectives",
                    ruleOrConcept = "Cohesion & Transition",
                    detailEn = "Connectives weld ideas: Addition (moreover, furthermore, in addition); Contrast (however, nevertheless, on the other hand); Cause & Effect (consequently, therefore, as a result); Sequence (firstly, subsequently, finally).",
                    detailUr = "کنیکٹیو الفاظ جملوں کو منطقی طور پر جوڑتے ہیں: اضافے کے لیے (moreover, furthermore)، تضاد کے لیے (however, nevertheless)، اور نتیجے کے لیے (therefore, consequently)۔",
                    detailPs = "نښلوونکي کلمات جملې سره تړي: د زیاتوالي لپاره (moreover)، د مخالفت لپاره (however)، او د پایلې لپاره (therefore).",
                    cardColor = Color(0xFF78350F)
                ),
                Class7EnglishCard(
                    title = "Robert Louis Stevenson's Train Poem",
                    ruleOrConcept = "Rhythm & Sensory Rhyme",
                    detailEn = "'From a Railway Carriage' uses galloping trochaic and dactylic meter mimicking a speeding train: 'Faster than fairies, faster than witches, / Bridges and houses, hedges and ditches; / And charging along like troops in a battle...' A masterclass in rhythm.",
                    detailUr = "سٹیونسن کی مشہور نظم 'From a Railway Carriage' تیز رفتار ٹرین کی چھک چھک کے تال پر لکھی گئی ہے جس میں شاعر تیزی سے بدلتے ہوئے دیہی مناظر کا خوبصورت سماں باندھتا ہے۔",
                    detailPs = "د سٹیونسن دا شعر د تېز اورګاډي د حرکت په تال لیکل شوی چې د کړکۍ بهر تېرېدونکې منظرې په ښکلي انداز انځوروي.",
                    cardColor = Color(0xFFF59E0B)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "In the sentence: 'The driver stepped firmly on the car's ________ to prevent a sudden crash and not ________ any bones', choose the correct homophone pair:",
                    questionUr = "جملے میں خالی جگہوں کو پر کرنے کے لیے درست ہوموفون جوڑا منتخب کریں:",
                    questionPs = "په جمله کې د تشو ځایونو لپاره سم هوموفون (ورته غږ لرونکي) توري وټاکئ:",
                    options = listOf(
                        "brake / break",
                        "break / brake",
                        "brake / brake",
                        "break / break"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'Brake' is the mechanical device used to decelerate or stop a vehicle. 'Break' is a verb meaning to fracture or damage. Therefore, 'stepped on the brake' and 'not break any bones' is correct.",
                    whyExplanationUr = "گاڑی کو روکنے والا آلہ 'brake' کہلاتا ہے، جبکہ ہڈی ٹوٹنے کے لیے 'break' استعمال ہوتا ہے۔ اس لیے 'brake / break' درست جواب ہے۔",
                    whyExplanationPs = "د موټر ودرولو آله 'brake' ده، او د ماتېدو فعل 'break' دی. نو سمه جوړه 'brake / break' ده.",
                    formulaOrStep = "Mechanical stopper = Brake ; Fracture = Break",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following words contains a silent letter that is written but not pronounced phonetically?",
                    questionUr = "درج ذیل میں سے کس لفظ میں ایک ایسا سائلنٹ لیٹر موجود ہے جو بولا نہیں جاتا؟",
                    questionPs = "په لاندې کوم لفظ کې یو پټ توری (Silent letter) شته چې نه تلفظ کیږي؟",
                    options = listOf(
                        "Doubt (the letter 'b' is completely silent)",
                        "Motor",
                        "Travel",
                        "Train"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In the word 'doubt', the letter 'b' is silent (pronounced /daʊt/). The other words ('motor', 'travel', 'train') have all their constituent letters pronounced phonetically.",
                    whyExplanationUr = "لفظ 'doubt' میں 'b' سائلنٹ ہے اور اسے 'ڈاؤٹ' پڑھا جاتا ہے۔ باقی تمام الفاظ میں تمام حروف ادا ہوتے ہیں۔",
                    whyExplanationPs = "په 'doubt' کلمه کې د 'b' توری نه ویل کیږي او غلی (سائلنټ) پاتې کیږي.",
                    formulaOrStep = "Doubt ➔ pronounced /d-a-u-t/, silent 'b'",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Choose the correct modal auxiliary to complete the traffic safety law: 'All drivers ________ obey the red light signal; it is a compulsory legal requirement.'",
                    questionUr = "ٹریفک کے قانونی حکم کو مکمل کرنے کے لیے درست موڈل ورب منتخب کریں:",
                    questionPs = "د ترافیکي قانون د بشپړولو لپاره سم مرستیال فعل وټاکئ:",
                    options = listOf(
                        "must",
                        "might",
                        "could",
                        "should perhaps"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'Must' denotes non-negotiable legal obligation and mandatory commands. 'Might' and 'could' only express weak possibility, while 'should' expresses advisory guidance rather than strict law.",
                    whyExplanationUr = "قانونی اور لازمی حکم کے لیے 'must' استعمال ہوتا ہے جس کی خلاف ورزی جرم ہوتی ہے۔ 'might' یا 'could' صرف امکان ظاہر کرتے ہیں۔",
                    whyExplanationPs = "'Must' د قانوني او لازمي حکم لپاره کارول کیږي چې پلي کول یې حتمي وي.",
                    formulaOrStep = "Mandatory legal obligation = 'must'",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which sentence connective best fills the blank to express logical consequence: 'High-speed electric trains emit zero direct exhaust fumes; ________, they substantially reduce urban carbon emissions.'",
                    questionUr = "منطقی نتیجے کے اظہار کے لیے کون سا کنیکٹیو لفظ سب سے موزوں ہے؟",
                    questionPs = "د یوې منطقي پایلې د ښودلو لپاره کوم نښلوونکی توری غوره دی؟",
                    options = listOf(
                        "consequently / therefore",
                        "on the contrary",
                        "nevertheless",
                        "however"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'Consequently' and 'therefore' indicate a direct cause-and-effect logical outcome. Emitting zero fumes directly results in reduced carbon emissions. 'However' or 'nevertheless' indicate contradiction.",
                    whyExplanationUr = "'Consequently' اور 'therefore' نتیجے کے لیے استعمال ہوتے ہیں، کیونکہ دھواں نہ چھوڑنا براہ راست آلودگی میں کمی کا سبب بنتا ہے۔ 'however' تضاد کے لیے آتا ہے۔",
                    whyExplanationPs = "'Consequently' (په پایله کې) د لامل او پایلې نښلوونکی دی ځکه بې لوګي اورګاډي د ککړتیا کمېدو لامل ګرځي.",
                    formulaOrStep = "Cause: Zero fumes ➔ Result: Consequently / Therefore carbon drops",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "In Robert Louis Stevenson's poem 'From a Railway Carriage', what literary technique creates the exhilarating sensation of traveling on a fast express train?",
                    questionUr = "سٹیونسن کی نظم 'From a Railway Carriage' میں تیز رفتار ٹرین پر سفر کا سنسنی خیز احساس پیدا کرنے کے لیے کون سی تکنیک استعمال کی گئی ہے؟",
                    questionPs = "د رابرټ لوئس په شعر کې د تېز اورګاډي د خوځښت احساس د کومې ادبي تګلارې له لارې رامنځته شوی؟",
                    options = listOf(
                        "Rapid galloping rhyming rhythm and dynamic verbs that mimic the clattering speed of railway wheels",
                        "A slow, mournful elegy meter with long pauses",
                        "Using scientific chemistry formulas inside stanzas",
                        "Writing backwards from right to left"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Stevenson employs a galloping rhythm with rhyming couplets ('witches / ditches', 'battle / cattle') and rapid verbal images to physically recreate the fast clatter of a steam locomotive.",
                    whyExplanationUr = "شاعر نے تیز تال، قافیہ بندی اور متحرک الفاظ استعمال کیے ہیں جو ریل گاڑی کے پہیوں کی چھک چھک اور تیز رفتاری کی نقل کرتے ہیں۔",
                    whyExplanationPs = "شاعر د شعر ګړندی تال او قافیې داسې جوړې کړي چې د اورګاډي د څرخونو تېز غږ او تګ ذهن ته راولي.",
                    formulaOrStep = "Galloping meter + Rapid rhyming pairs = Kinesthetic mimicry of speed",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 4: REGIONAL AND GLOBAL FESTIVALS (p. 50–64) ───
        Class7EnglishStage(
            id = 4,
            unitNumber = "Unit 4",
            pageRange = "Pages 50–64",
            titleEn = "Regional & Global Festivals",
            titleUr = "علاقائی اور عالمی تہوار",
            titlePs = "سیمه ییز او نړیوال جشنونه",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            summaryEn = "Celebrates cultural unity through diversity: Pakistan's colourful regional festivals (Shandur Polo Tournament at 3,700m in Chitral, Lok Virsa Cultural Festival in Islamabad, Sibi Historical Mela, Eid celebrations) alongside world festivities (Chinese Spring Festival, Lantern Festival). Highlights multi-syllable word stress, collocations, compound prepositions, coordinating vs subordinating conjunctions, and descriptive writing.",
            summaryUr = "ثقافتی تنوع اور یگانگت کا جشن: پاکستان کے علاقائی تہوار (چترال میں شندور پولو فیسٹیول، اسلام آباد کا لوک ورثہ، سبی میلہ، عیدین) اور دنیا بھر کے تہوار (چینی نیا سال وغیرہ)۔ اس یونٹ میں کثیر سلیبل الفاظ، کولوکیشنز، مرکب حروفِ جار (پریپوزیشنز)، اور کنجنکشنز شامل ہیں۔",
            summaryPs = "د کلتوري یووالي نمانځنه: د پاکستان سیمه ییز جشنونه لکه د چترال د شندور پولو مېله، لوک ورثه او اخترونه، او د نړۍ کلتورونه. د کلمو څپې، مرکب توري، او نښلوونکي (Conjunctions) زده کیږي.",
            keyRules = listOf(
                "Coordinating Conjunctions (FANBOYS): Connect independent grammatical elements of equal rank (For, And, Nor, But, Or, Yet, So)",
                "Subordinating Conjunctions: Link a dependent adverbial clause to an independent clause (although, because, since, whereas, unless, while)",
                "Collocations: Natural word partnerships that frequently co-occur (e.g. make an effort, pay attention, take part, heavy rain, warm welcome)"
            ),
            cards = listOf(
                Class7EnglishCard(
                    title = "Shandur Polo Tournament",
                    ruleOrConcept = "Roof of the World Festival",
                    detailEn = "Held annually in July at Shandur Pass (3,700 meters above sea level) between Chitral and Gilgit. It is known as the 'Highest Polo Ground in the World' where teams play traditional freestyle polo without referees, accompanied by folk music and dancing.",
                    detailUr = "ہر سال جولائی میں چترال اور گلگت کے درمیان شندور پاس پر 3700 میٹر کی بلندی پر منعقد ہوتا ہے۔ یہ 'دنیا کا بلند ترین پولو گراؤنڈ' ہے جہاں روایتی پولو بغیر ریفری کے کھیلی جاتی ہے۔",
                    detailPs = "هر کال په جولای کې د چترال او ګلګت ترمنځ په شندور کې ترسره کیږي. دا د نړۍ تر ټولو لوړ د پولو میدان دی چې له ریفری پرته دودیزه لوبه پکې کیږي.",
                    cardColor = Color(0xFF6D28D9)
                ),
                Class7EnglishCard(
                    title = "FANBOYS Coordinating Conjunctions",
                    ruleOrConcept = "Seven Equal Connectors",
                    detailEn = "Use comma + FANBOYS to join two independent clauses: For (reason), And (addition), Nor (negative alternative), But (contrast), Or (choice), Yet (concession), So (result). Example: 'The polo match was intense, yet the players displayed great sportsmanship.'",
                    detailUr = "کوآرڈینیٹنگ کنجنکشنز دو آزاد جملوں کو ملاتے ہیں: For, And, Nor, But, Or, Yet, So۔ مثال: کھیل سخت تھا، پھر بھی (yet) کھلاڑیوں نے کھیل کا بہترین جذبہ دکھایا۔",
                    detailPs = "دا اووه توري (FANBOYS) دوه بشپړې خپلواکې جملې سره تړي، لکه but د تضاد او so د پایلې لپاره.",
                    cardColor = Color(0xFF7C3AED)
                ),
                Class7EnglishCard(
                    title = "Subordinating Conjunctions",
                    ruleOrConcept = "Independent + Dependent Clauses",
                    detailEn = "Create complex sentences by showing dependence: 'Although it rained heavily, the festival proceeded.' Subordinating words: although, because, since, before, after, unless, while, whereas. When the dependent clause comes first, use a comma.",
                    detailUr = "سب آرڈینیٹنگ کنجنکشنز ماتحت جملوں کو اصل جملے سے جوڑتے ہیں (although, because, unless)۔ جب ماتحت جملہ شروع میں آئے تو کوما (,) لگانا ضروری ہوتا ہے۔",
                    detailPs = "دا کلمات یوه تړلې جمله له اصلي جملې سره نښلوي، لکه Although (که څه هم)، Because (ځکه چې)، Unless (تر څو چې).",
                    cardColor = Color(0xFF5B21B6)
                ),
                Class7EnglishCard(
                    title = "English Collocations",
                    ruleOrConcept = "Natural Word Pairings",
                    detailEn = "Collocations sound right to native speakers: 'make a reservation' (NOT 'do a reservation'); 'pay a visit' (NOT 'give a visit'); 'take part in festivities'; 'fast food' (NOT 'quick food'); 'heavy traffic' (NOT 'thick traffic').",
                    detailUr = "کولوکیشنز وہ الفاظ ہیں جو قدرتی طور پر ایک ساتھ بولے جاتے ہیں: جیسے 'make an effort' (نہ کہ do an effort)، 'pay attention' (نہ کہ give attention)۔",
                    detailPs = "کولوکیشنز هغه کلمې دي چې تل یوځای راځي، لکه make an effort (هڅه کول) نه دا چې do an effort وویل شي.",
                    cardColor = Color(0xFF8B5CF6)
                ),
                Class7EnglishCard(
                    title = "Compound Prepositions",
                    ruleOrConcept = "Multi-word Prepositional Phrases",
                    detailEn = "Prepositions composed of two or more words: in front of, on behalf of, in accordance with, by means of, with reference to, in spite of. Example: 'In spite of the high altitude, tourists gathered enthusiastically.'",
                    detailUr = "مرکب پریپوزیشنز دو یا تین الفاظ سے مل کر بنتے ہیں: in spite of (باوجود)، in front of (کے سامنے)، on behalf of (کی جانب سے)۔",
                    detailPs = "مرکب اضافي توري له دوو یا ډېرو کلمو جوړ وي، لکه in spite of (سره له دې چې) او in front of (مخې ته).",
                    cardColor = Color(0xFF4C1D95)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Identify the sentence that correctly uses a Coordinating Conjunction (FANBOYS) with proper punctuation:",
                    questionUr = "مناسب اوقاف (پنکچو ایشن) کے ساتھ کوآرڈینیٹنگ کنجنکشن (FANBOYS) کا درست استعمال کرنے والا جملہ پہچانیں:",
                    questionPs = "هغه جمله وټاکئ چې کوارډینېټینګ نښلوونکی (FANBOYS) پکې له سمې نښې سره کارول شوی وي:",
                    options = listOf(
                        "The Shandur polo pitch is situated at a freezing altitude, but thousands of cheering spectators arrived warmly dressed.",
                        "The Shandur polo pitch is situated at a freezing altitude although thousands of spectators arrived.",
                        "Because the polo pitch is freezing so thousands of spectators arrived.",
                        "The polo match was exciting, since the horses ran fast."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'But' is a coordinating conjunction linking two complete independent clauses, preceded correctly by a comma. 'Although' and 'because' are subordinating conjunctions.",
                    whyExplanationUr = "'But' ایک کوآرڈینیٹنگ کنجنکشن ہے جو دو آزاد جملوں کو جوڑ رہا ہے اور اس سے پہلے کوما (,) لگا ہوا ہے، اس لیے یہ بالکل درست ہے۔",
                    whyExplanationPs = "دلته 'but' د دوو خپلواکو جملو ترمنځ د تضاد ښودلو لپاره له کوما سره په سمه توګه کارول شوی دی.",
                    formulaOrStep = "Independent Clause + comma + but + Independent Clause",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following phrases represents a natural, idiomatic English Collocation?",
                    questionUr = "درج ذیل میں سے کون سا فقرہ قدرتی اور مستند انگریزی کولوکیشن (Collocation) کی نمائندگی کرتا ہے؟",
                    questionPs = "له لاندې مواردو څخه کومه یوه سمه او دود انګلیسي جوړه (Collocation) ده؟",
                    options = listOf(
                        "To pay a visit / To take part",
                        "To give a visit / To make part",
                        "To do a visit / To hold part",
                        "To run a visit / To push part"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In English, the verb 'pay' naturally collocates with 'visit' ('pay a visit' = visit someone), and 'take' collocates with 'part' ('take part' = participate). Substitutions like 'give a visit' or 'make part' are unidiomatic.",
                    whyExplanationUr = "انگریزی میں 'visit' کے ساتھ 'pay' (pay a visit) اور 'part' کے ساتھ 'take' (take part) قدرتی جوڑ بناتے ہیں۔ 'give a visit' کہنا غلط ہے۔",
                    whyExplanationPs = "په انګلیسي ژبه کې د visit سره 'pay' او د part سره 'take' طبیعي او سمه ملګرتیا لري.",
                    formulaOrStep = "Pay + a visit ; Take + part in",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Select the sentence with the correctly punctuated Subordinating Conjunction clause positioned at the beginning:",
                    questionUr = "جملے کے آغاز میں سب آرڈینیٹنگ کلاز کے درست اوقاف (کوما) والا جملہ منتخب کریں:",
                    questionPs = "هغه جمله وټاکئ چې په پیل کې د سبارډینېټینګ کلاز سره سم کوما کارول شوې وي:",
                    options = listOf(
                        "Although the winter wind blew fiercely across Shandur Pass, the festive crowd danced to traditional drums.",
                        "Although the winter wind blew fiercely across Shandur Pass the festive crowd danced to traditional drums.",
                        "The festive crowd danced to traditional drums, although the winter wind blew fiercely.",
                        "Although, the winter wind blew fiercely across Shandur Pass the crowd danced."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "When a complex sentence begins with a dependent subordinating adverbial clause ('Although the winter wind blew fiercely across Shandur Pass'), it MUST be followed by a comma before the main clause begins.",
                    whyExplanationUr = "جب کوئی جملہ 'Although' جیسی سب آرڈینیٹنگ کلاز سے شروع ہو تو اس کلاز کے اختتام پر لازمی طور پر کوما (,) لگایا جاتا ہے۔",
                    whyExplanationPs = "کله چې جمله په تړلې برخه (Although...) پیل شي، نو د هغې په پای کې حتماً کوما ایښودل کیږي.",
                    formulaOrStep = "Subordinating Clause (at start) + COMMA + Independent Clause",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which compound preposition correctly completes the sentence: 'The team won the championship ________ endless hours of rigorous practice'?",
                    questionUr = "جملے کو مکمل کرنے کے لیے کون سا مرکب پریپوزیشن موزوں ترین ہے؟",
                    questionPs = "د جملې د بشپړولو لپاره کوم سم مرکب اضافي توری (Compound preposition) پکار دی؟",
                    options = listOf(
                        "by means of / as a result of",
                        "in spite of / contrary to",
                        "in front of / instead of",
                        "with reference to / across from"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'By means of' or 'as a result of' indicates the instrumental mechanism or causal reason through which an achievement occurred. Rigorous practice directly caused the championship victory.",
                    whyExplanationUr = "'as a result of' یا 'by means of' کا مطلب ہے 'کی بدولت'۔ محنت کی بدولت چیمپئن شپ جیتی گئی، اس لیے یہ درست ہے۔",
                    whyExplanationPs = "'as a result of' (د پایلې په توګه) یا 'by means of' (په وسیله) د بریا اصلي لامل په ګوته کوي.",
                    formulaOrStep = "Cause / Agency = By means of / As a result of",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the geographical and cultural significance of the Shandur Polo Festival in Pakistan?",
                    questionUr = "پاکستان میں شندور پولو فیسٹیول کی جغرافیائی اور ثقافتی اہمیت کیا ہے؟",
                    questionPs = "په پاکستان کې د شندور د پولو مېلې جغرافیایي او کلتوري اهمیت څه دی؟",
                    options = listOf(
                        "It is played at 3,700 meters altitude (the highest polo ground in the world) under traditional freestyle rules without referees between Chitral and Gilgit",
                        "It is an indoor table-tennis championship played in Karachi",
                        "It is an Olympic swimming gala held on the Arabian Sea",
                        "It is a cricket tournament played during December snowfalls"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Shandur is famous worldwide as the 'Roof of the World' polo ground at 3,700m elevation. It preserves the ancient, rugged freestyle version of polo between historical rival mountain regions of Chitral and Gilgit.",
                    whyExplanationUr = "شندور 3700 میٹر کی بلندی پر دنیا کا بلند ترین پولو گراؤنڈ ہے جہاں چترال اور گلگت کی ٹیمیں بغیر ریفری کے روایتی فری سٹائل پولو کھیلتی ہیں۔",
                    whyExplanationPs = "شندور په ۳۷۰۰ متره لوړوالي کې د نړۍ تر ټولو لوړ میدان دی چیرې چې چترال او ګلګت بې له ریفری دودیزه لوبه کوي.",
                    formulaOrStep = "Shandur = 3,700m Altitude + Freestyle Rules + Chitral vs Gilgit",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 5: ENVIRONMENTAL EDUCATION & WILDLIFE (p. 65–89) ───
        Class7EnglishStage(
            id = 5,
            unitNumber = "Unit 5",
            pageRange = "Pages 65–89",
            titleEn = "Environmental Education & Wildlife",
            titleUr = "ماحولیاتی تعلیم اور جنگلی حیات",
            titlePs = "د چاپېریال پوهنه او وحشي ژوي",
            themeColor = Color(0xFF15803D),
            secondaryColor = Color(0xFF14532D),
            summaryEn = "Spotlights Pakistan's unique biodiversity and conservation imperatives: Endangered species including the Markhor (national animal with spiral horns), the elusive Snow Leopard of the northern ranges, and the Indus River Blind Dolphin. Addresses extreme climate disasters, plastic pollution, and waste-free green cities. Explores Transitive vs Intransitive verbs, Active vs Passive voice, Present & Past Perfect tenses, and formal complaint letter writing.",
            summaryUr = "پاکستان کی نایاب جنگلی حیات کا تحفظ: مارخور (قومی جانور)، برفانی چیتا اور دریائے سندھ کی اندھی ڈولفن۔ موسمیاتی تبدیلیاں اور ماحولیاتی آلودگی۔ اس یونٹ میں متعدی اور لازم افعال (ٹرانزیٹو اور ان ٹرانزیٹو وربز)، ایکٹو اور پیسو وائس، پرفیکٹ ٹینسز، اور رسمی شکایتی خطوط کا طریقہ شامل ہے۔",
            summaryPs = "د پاکستان د نایابه وحشي ژوو ژغورنه: مارخور (ملي ژوی)، واورین پړانګ، او د اباسین ړنده ډالفن. متعدي او لازمي فعلونه (Transitive / Intransitive)، معروف او مجهول (Active / Passive)، او رسمي شکایت لیکونه زده کیږي.",
            keyRules = listOf(
                "Transitive vs Intransitive: Transitive verbs require a direct object to complete their meaning (The warden protected the Markhor); Intransitive verbs do not take an object (The dolphin leaped gracefully)",
                "Active vs Passive Voice: Active focuses on the doer (Poachers hunt leopards); Passive focuses on the receiver/result (Leopards are hunted by poachers)",
                "Present Perfect vs Past Simple: Present Perfect (has/have + V3) connects past action to present consequence; Past Simple specifies a completed finished time"
            ),
            cards = listOf(
                Class7EnglishCard(
                    title = "Endangered Species of Pakistan",
                    ruleOrConcept = "Markhor, Snow Leopard & Indus Dolphin",
                    detailEn = "The Markhor (Capra falconeri) is Pakistan's national animal, famed for majestic flared spiral horns. The Snow Leopard is a solitary apex predator in the glaciated Karakoram. The Indus Dolphin (Bhulan) is a freshwater mammal that navigated by echolocation after losing eyesight in muddy river silt.",
                    detailUr = "مارخور پاکستان کا قومی جانور ہے جو اپنے خوبصورت پیچ دار سینگوں کی وجہ سے جانا جاتا ہے۔ برفانی چیتا شمالی پہاڑوں کا نایاب شکاری ہے۔ دریائے سندھ کی بلائنڈ ڈولفن (بھولن) مٹیالے پانی کی وجہ سے اندھی ہو چکی ہے اور آواز کی لہروں (ایکو لوکیشن) سے راستہ تلاش کرتی ہے۔",
                    detailPs = "مارخور د پاکستان ملي ژوی دی چې تاو تاو ښکرونه لري. واورین پړانګ په شمالي غرونو کې اوسیږي. او د اباسین سیند ړنده ډالفن د غږ د څپو په مرسته په خړو اوبو کې خپله لاره مومي.",
                    cardColor = Color(0xFF15803D)
                ),
                Class7EnglishCard(
                    title = "Transitive vs Intransitive Verbs",
                    ruleOrConcept = "Object Requirement",
                    detailEn = "Transitive verbs transfer action to a direct object: 'The ranger rescued [what?] the injured bird.' Intransitive verbs express action that does NOT transfer to an object: 'The eagle soared majestically' (no object). Only transitive verbs can be transformed into passive voice.",
                    detailUr = "فعل متعدی (Transitive) کو مفعول (Object) کی ضرورت ہوتی ہے (The hunter saw the leopard)۔ فعل لازم (Intransitive) مفعول کے بغیر مکمل معنی دیتا ہے (The river flows)۔ صرف فعل متعدی کا پیسو وائس بن سکتا ہے۔",
                    detailPs = "متعدي فعل مفعول (Object) غواړي چې مانا پوره کړي. لازمي فعل بې له مفعوله پوره مانا ورکوي او مجهول (Passive) نه جوړوي.",
                    cardColor = Color(0xFF16A34A)
                ),
                Class7EnglishCard(
                    title = "Active vs Passive Voice",
                    ruleOrConcept = "Subject-Object Transposition",
                    detailEn = "Active: Subject performs the action ('Volunteers planted one thousand pine trees'). Passive: Subject receives action ('One thousand pine trees were planted by volunteers'). Use passive when the action is more significant than the agent.",
                    detailUr = "معروف (Active): کام کرنے والا فاعل پہلے آتا ہے۔ مجهول (Passive): مفعول پہلے آ جاتا ہے اور کام پر زیادہ زور دیا جاتا ہے ('ایک ہزار درخت رضاکاروں نے لگائے' کے بجائے 'ایک ہزار درخت لگائے گئے')۔",
                    detailPs = "معروف (Active) کې فاعل مخکې وي؛ مجهول (Passive) کې مفعول ته لومړیتوب ورکول کیږي او د عمل پایله مهمه وي.",
                    cardColor = Color(0xFF047857)
                ),
                Class7EnglishCard(
                    title = "Present Perfect Tense",
                    ruleOrConcept = "has/have + Past Participle (V3)",
                    detailEn = "Formed using has/have + third verb form (V3). Expresses actions completed at an unspecified past time that have direct relevance to now: 'Pakistan has established new national parks to preserve the Snow Leopard.'",
                    detailUr = "پرفیکٹ ٹینس میں has/have کے ساتھ فعل کی تیسری فارم (V3) لگتی ہے۔ یہ ظاہر کرتا ہے کہ کام ماضی میں مکمل ہوا مگر اس کا اثر موجودہ وقت پر ہے (پاکستان نے نئے نیشنل پارکس قائم کیے ہیں)۔",
                    detailPs = "دا زمانه د has/have او د فعل درېیم شکل سره جوړیږي او هغه کار ښيي چې اغېز یې اوس هم پر ځای وي.",
                    cardColor = Color(0xFF059669)
                ),
                Class7EnglishCard(
                    title = "Writing Formal Complaint Letters",
                    ruleOrConcept = "Professional Tone & Structure",
                    detailEn = "Structure of a civic complaint letter: 1) Sender address & Date; 2) Recipient designation (The Municipal Officer); 3) Formal Subject line; 4) Salutation; 5) Body paragraphs stating problem, impact, and proposed remedy; 6) Polite closing (Yours faithfully).",
                    detailUr = "رسمی شکایتی خط کا ڈھانچہ: اوپر پتہ اور تاریخ، متعلقہ افسر کا عہدہ، عنوان (Subject)، شائستہ سلام، مسئلہ اور اس کا حل بتانے والے پیراگراف، اور باوقار اختتام (Yours faithfully)۔",
                    detailPs = "د رسمي شکایت لیک بڼه: پته او نېټه، د چارواکي نوم او مقام، موضوع، د ستونزې تفصیل او د حل لار، او په درناوي پای ته رسول.",
                    cardColor = Color(0xFF14532D)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "In which of the following sentences is the underlined verb used INTRANSITIVELY (without taking a direct object)?",
                    questionUr = "درج ذیل میں سے کس جملے میں فعل کو فعلِ لازم (Intransitive Verb) کے طور پر بغیر مفعول کے استعمال کیا گیا ہے؟",
                    questionPs = "په لاندې کومه جمله کې فعل د لازمي فعل (Intransitive) په توګه بې له مفعوله کارول شوی دی؟",
                    options = listOf(
                        "The rare Indus dolphin surfaced briefly in the muddy river waters.",
                        "Wildlife wardens protected the endangered Markhor in Chitral.",
                        "Local school children planted twenty pine saplings.",
                        "The conservation team tagged the wild leopard."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In 'surfaced briefly', the verb 'surfaced' has no direct object answering 'what?' or 'whom?'. 'Briefly' is an adverb of manner, and 'in the muddy river' is a prepositional phrase of place. The verb is intransitive.",
                    whyExplanationUr = "'surfaced' (سطح پر ابھری) ایک فعلِ لازم ہے کیونکہ اس کے بعد کوئی مفعول نہیں ہے۔ باقی تمام جملوں میں مفعول موجود ہے (Markhor, saplings, leopard)۔",
                    whyExplanationPs = "په لومړۍ جمله کې فعل (surfaced) هېڅ مفعول نه لري او لازمي دی، خو نورو جملو کې مفعول شتون لري.",
                    formulaOrStep = "Surfaced + Adverb (briefly) + Prepositional phrase = Intransitive Verb (No object)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Transform the active sentence into the correct passive voice: 'The wildlife ranger successfully released the rehabilitated Snow Leopard.'",
                    questionUr = "ایکٹو جملے کو درست پیسو وائس میں تبدیل کریں: 'The wildlife ranger successfully released the rehabilitated Snow Leopard.'",
                    questionPs = "دا معروفه جمله په سم مجهول (Passive) واړوئ:",
                    options = listOf(
                        "The rehabilitated Snow Leopard was successfully released by the wildlife ranger.",
                        "The rehabilitated Snow Leopard is successfully released by the wildlife ranger.",
                        "The rehabilitated Snow Leopard has been successfully releasing the ranger.",
                        "The wildlife ranger was released by the rehabilitated Snow Leopard."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The original sentence is in the Past Simple tense ('released'). In passive voice, Past Simple takes 'was/were + past participle': 'The rehabilitated Snow Leopard was successfully released by the wildlife ranger.'",
                    whyExplanationUr = "چونکہ جملہ پاسٹ سمپل میں ہے اس لیے پیسو وائس میں 'was' کے ساتھ فعل کی تیسری فارم (was released) آئے گی اور مفعول شروع میں آ جائے گا۔",
                    whyExplanationPs = "دا تېره ساده زمانه ده نو په مجهول کې 'was released' کیږي او مفعول مخکې راځي.",
                    formulaOrStep = "Active (Past Simple: V2) ➔ Passive: was/were + V3 (was released)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Choose the sentence that correctly uses the Present Perfect tense to denote an achievement with current relevance:",
                    questionUr = "موجودہ دور میں اہم کامیابی ظاہر کرنے کے لیے پریزنٹ پرفیکٹ ٹینس کا درست استعمال کرنے والا جملہ منتخب کریں:",
                    questionPs = "هغه جمله وټاکئ چې د Present Perfect زمانې سمه کارونه پکې شوې وي:",
                    options = listOf(
                        "The conservation society has preserved several endangered Markhor habitats this decade.",
                        "The conservation society have preserved several endangered Markhor habitats.",
                        "The conservation society has preserving several endangered Markhor habitats.",
                        "The conservation society is preserved several endangered Markhor habitats."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'The conservation society' is a singular collective noun, requiring the singular auxiliary 'has' + past participle 'preserved' (has preserved). Using 'have' is a subject-verb agreement error.",
                    whyExplanationUr = "'society' واحد اسم ہے اس لیے اس کے ساتھ 'has' آئے گا اور فعل کی تیسری فارم 'preserved' لگے گی (has preserved)۔",
                    whyExplanationPs = "د ټولنې (society) مفرد نوم سره 'has' او درېیم شکل 'preserved' راځي.",
                    formulaOrStep = "Singular Subject + has + Past Participle (has preserved)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What biological adaptation allows the Indus River Dolphin (Bhulan) to navigate and hunt despite being functionally blind?",
                    questionUr = "دریائے سندھ کی اندھی ڈولفن (بھولن) آنکھوں کی بینائی نہ ہونے کے باوجود کس حیاتیاتی صلاحیت سے راستہ تلاش اور شکار کرتی ہے؟",
                    questionPs = "د اباسین ړنده ډالفن څنګه د لیدلو له وړتیا پرته په اوبو کې خپله لاره او ښکار مومي؟",
                    options = listOf(
                        "Echolocation, emitting clicking sound waves and analyzing returning echoes to map muddy waters",
                        "Growing microscopic eyes on its dorsal fin",
                        "Smelling water currents through specialized gills",
                        "Following sunlight reflecting off the river bottom"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Living in murky, silt-laden river waters for millennia, the Indus dolphin evolved to rely on echolocation (biosonar), sending out high-frequency sound clicks and sensing reflected echoes to detect fish and obstacles.",
                    whyExplanationUr = "دریائے سندھ کے مٹیالے پانی کی وجہ سے ڈولفن کی بینائی ختم ہو چکی ہے۔ وہ آواز کی لہریں (ایکو لوکیشن) خارج کرتی ہے اور ان کے ٹکرا کر واپس آنے سے مچھلیوں اور رکاوٹوں کا پتہ لگاتی ہے۔",
                    whyExplanationPs = "دا ډالفن په خړو اوبو کې د لوړو غږیزو څپو (ایکو لوکیشن) په مټ د انعکاس له لارې خپل ښکار او لار مومي.",
                    formulaOrStep = "Biosonar (Echolocation): High-frequency sound clicks ➔ Echo mapping",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "In a formal civic complaint letter to the municipal administration, which phrase is the most appropriate and professional in tone?",
                    questionUr = "میونسپل انتظامیہ کو لکھے گئے رسمی شکایتی خط میں کون سا فقرہ سب سے مناسب اور پیشہ ورانہ انداز کا حامل ہے؟",
                    questionPs = "په یوه رسمي شکایت لیک کې کومه جمله تر ټولو باادبه او مسلکي ده؟",
                    options = listOf(
                        "I am writing to draw your urgent attention to the mounting uncollected plastic waste in our locality.",
                        "Hey guys, come clean up the garbage right now because it stinks badly.",
                        "You must throw the trash away immediately or I will be very angry.",
                        "Trash is sitting on the street so do your job quickly."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Formal letters require respectful, objective, and polite language ('I am writing to draw your urgent attention to...'). Slang, colloquialisms, and rude imperatives are unacceptable in professional civic correspondence.",
                    whyExplanationUr = "رسمی خطوط میں شائستہ اور باوقار زبان استعمال کی جاتی ہے (جیسے 'I am writing to draw your urgent attention to...')۔ غیر رسمی یا غصے والے الفاظ سرکاری خطوط میں نہیں لکھے جاتے۔",
                    whyExplanationPs = "رسمي لیکونه لوړ ادب او درناوی غواړي لکه: 'زه دا لیک د دې لپاره لیکم چې ستاسو پام دې ستونزې ته راواړوم...'.",
                    formulaOrStep = "Formal Civic Tone: Objective, polite, and precise problem statement",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 6: LITERATURE, NOVELS & POETRY (p. 90–110) ───
        Class7EnglishStage(
            id = 6,
            unitNumber = "Unit 6",
            pageRange = "Pages 90–110",
            titleEn = "Literature, Novels & Poetry",
            titleUr = "ادب، ناولز اور شاعری",
            titlePs = "ادبیات، ناولونه او شعرونه",
            themeColor = Color(0xFF9333EA),
            secondaryColor = Color(0xFF581C87),
            summaryEn = "Explores world literary classics: Leo Tolstoy's parable 'The Three Questions' (the most important time is NOW, the most important person is the one you are with, the most important pursuit is doing good), Jonathan Swift's 'Gulliver's Travels', Daniel Defoe's 'Robinson Crusoe', and Anna Sewell's 'Black Beauty'. Analyzes Robert Frost's timeless poem 'Stopping by Woods on a Snowy Evening'. Covers relative pronouns (who, which, that), complex sentences, imagery, and journal writing.",
            summaryUr = "عالمی شاہکار ادب کا مطالعہ: لیو ٹالسٹائی کی کہانی 'تین سوالات' (سب سے اہم وقت حال ہے، سب سے اہم شخص وہ ہے جو اس وقت ساتھ ہے، اور سب سے اہم کام بھلائی کرنا ہے)، گلیورز ٹریولز اور رابنسن کروسو۔ رابرٹ فراسٹ کی نظم 'Stopping by Woods on a Snowy Evening'۔ ریلیٹو پروناونس اور کلازز۔",
            summaryPs = "د نړۍ ستر ادبي شاهکارونه: د ټالسټای درې پوښتنې (تر ټولو مهم وخت اوس دی، تر ټولو مهم کس هغه دی چې درسره دی، او تر ټولو مهم کار نېکي ده)، د ګلیور سفرونه، او د رابرټ فراسټ واورین شعر. موصولي ضمیرونه (Who, Which, That) زده کیږي.",
            keyRules = listOf(
                "Relative Pronouns: 'Who' for persons (The hermit who lived in the forest); 'Which' for animals/things (The book which I borrowed); 'That' for persons/things in restrictive clauses",
                "Theme Analysis in Fiction: Identifying the underlying moral truth or universal human lesson embedded in narrative conflicts",
                "Poetic Imagery: Sensory language invoking sight, sound, touch, and atmosphere (e.g. 'The only other sound's the sweep / Of easy wind and downy flake')"
            ),
            cards = listOf(
                Class7EnglishCard(
                    title = "Tolstoy's 'The Three Questions'",
                    ruleOrConcept = "The Golden Truth of Life",
                    detailEn = "A king sought answers: 1) What is the right time to begin everything? ➔ The only important time is NOW; 2) Who is the most important person? ➔ The one you are with at this moment; 3) What is the most important thing to do? ➔ To do good to that person.",
                    detailUr = "ٹالسٹائی کے تین سوالات کے جوابات: 1) سب سے اہم وقت کون سا ہے؟ ➔ حال کا وقت (NOW)؛ 2) سب سے اہم شخص کون ہے؟ ➔ وہ جس کے ساتھ آپ اس وقت موجود ہیں؛ 3) سب سے اہم کام کون سا ہے؟ ➔ اس شخص کے ساتھ بھلائی کرنا۔",
                    detailPs = "د ټالسټای د ۳ پوښتنو ځوابونه: ۱) تر ټولو مهم وخت: همدا اوس؛ ۲) تر ټولو مهم کس: هغه چې اوس درسره مخامخ دی؛ ۳) تر ټولو مهم کار: له هغه چا سره ښېګڼه کول.",
                    cardColor = Color(0xFF7E22CE)
                ),
                Class7EnglishCard(
                    title = "Relative Pronouns Explained",
                    ruleOrConcept = "Who, Whom, Whose, Which, That",
                    detailEn = "'Who' replaces subject pronouns for people ('The king saw the hermit who was digging'); 'Whom' replaces object pronouns; 'Whose' shows possession ('The man whose wound was bleeding'); 'Which' modifies non-humans and objects ('The boat which wrecked').",
                    detailUr = "ریلیٹو پروناؤنز: انسانوں کے لیے فاعل کے طور پر 'who' آتا ہے؛ مفعول کے طور پر 'whom'؛ ملکیت کے لیے 'whose'؛ اور بے جان اشیاء یا جانوروں کے لیے 'which' یا 'that' آتا ہے۔",
                    detailPs = "موصولي ضمیرونه: د انسانانو لپاره 'who'، د ملکیت لپاره 'whose'، او د بې ساه شیانو او حیواناتو لپاره 'which' کارول کیږي.",
                    cardColor = Color(0xFF9333EA)
                ),
                Class7EnglishCard(
                    title = "Robert Frost's Masterpiece",
                    ruleOrConcept = "Stopping by Woods on a Snowy Evening",
                    detailEn = "The traveler halts by dark woods on winter solstice, captivated by stillness. His horse shakes harness bells. The iconic closing lines symbolize moral duty over passive escape: 'The woods are lovely, dark and deep, / But I have promises to keep, / And miles to go before I sleep.'",
                    detailUr = "رابرٹ فراسٹ کا مشہور شعر: سفر کرنے والا سرد رات میں خاموش جنگل کی خوبصورتی پر رکتا ہے۔ لیکن اسے اپنی ذمہ داریاں یاد آتی ہیں: 'جنگل خوبصورت اور گہرا ہے، لیکن مجھے اپنے وعدے نبھانے ہیں اور سونے سے پہلے میلوں سفر طے کرنا ہے۔'",
                    detailPs = "د رابرټ فراسټ مشهور شعر دا بیانوي چې انسان که څه هم له ارام سره مینه لري، خو د ژوند ژمنې او مسؤلیتونه باید مخکې له مرګه پوره کړي.",
                    cardColor = Color(0xFFA855F7)
                ),
                Class7EnglishCard(
                    title = "Classic English Novels Excerpts",
                    ruleOrConcept = "Gulliver, Crusoe & Black Beauty",
                    detailEn = "Gulliver awakes bound by tiny 6-inch Lilliputians (satirizing petty politics). Robinson Crusoe survives on a deserted island through self-reliance and engineering. Black Beauty tells a horse's life story, advocating humane treatment of animals.",
                    detailUr = "گلیور کا 6 انچ کے بونوں کے جزیرے للی پٹ میں جاگنا؛ رابنسن کروسو کا ویران جزیرے پر ہمت اور محنت سے تنہا زندہ رہنا؛ اور بلیک بیوٹی میں گھوڑے کی زبانی جانوروں کے ساتھ ہمدردی کا سبق۔",
                    detailPs = "د ګلیور په نریو خلکو کې بند پاتې کېدل، د کروسو په ناپېژندل شوي ټاپو کې د همت ژوند، او د آس له نظره د څارویو سره د رحم کیسه.",
                    cardColor = Color(0xFF6B21A8)
                ),
                Class7EnglishCard(
                    title = "Personal Journal / Diary Writing",
                    ruleOrConcept = "First-Person Introspective Voice",
                    detailEn = "Diary writing conventions: Date & Day; Informal/intimate tone; First-person point of view ('I felt bewildered...'); Chronological progression; Honest reflection on personal growth, feelings, and dilemmas.",
                    detailUr = "ڈائری لکھنے کا طریقہ: اوپر تاریخ اور دن؛ پہلا صیغہ متکلم ('میں نے محسوس کیا...')؛ سچے جذبات کا اظہار؛ اور دن کے واقعات اور خیالات کا تسلسل۔",
                    detailPs = "د ورځنیو یادښتونو (ډایري) لیکلو اصول: نېټه او ورځ، لومړی کس ('ما احساس کړه...')، او د خپلو زړه رازونو او هیلو ثبتول.",
                    cardColor = Color(0xFF581C87)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "In Leo Tolstoy's parable 'The Three Questions', what is the profound answer to the question: 'What is the most important time?'",
                    questionUr = "لیو ٹالسٹائی کی کہانی 'تین سوالات' میں اس سوال کا سب سے گہرا جواب کیا ہے کہ 'سب سے اہم وقت کون سا ہے؟'",
                    questionPs = "د ټالسټای په کیسه کې تر ټولو مهم وخت کوم یو بلل شوی دی؟",
                    options = listOf(
                        "The present moment (NOW), because it is the only time over which we possess any real power or control",
                        "The distant future, because of our retirement plans",
                        "Yesterday, because past history cannot be altered",
                        "Midnight, when everyone is asleep"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The hermit explains to the king that the only time that truly matters is NOW (the present moment), because the present is the only time in which a human being has any agency, choice, and power to act.",
                    whyExplanationUr = "درویش نے بادشاہ کو سمجھایا کہ سب سے اہم وقت صرف 'حال' (NOW) ہے، کیونکہ یہی وہ واحد وقت ہے جس میں انسان کو عمل کرنے کا اختیار اور طاقت حاصل ہوتی ہے۔",
                    whyExplanationPs = "دروېش وویل چې تر ټولو مهم وخت همدا 'اوس' دی، ځکه همدا یوازینی وخت دی چې انسان پر خپلو کړنو واک او اختیار لري.",
                    formulaOrStep = "Most Important Time = NOW (The Present Moment of Action)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Select the sentence that uses the Relative Pronoun 'who' versus 'which' correctly:",
                    questionUr = "ریلیٹو پروناؤن 'who' اور 'which' کا درست استعمال کرنے والا جملہ منتخب کریں:",
                    questionPs = "هغه جمله وټاکئ چې موصولي ضمیرونه 'who' او 'which' پکې په سمه توګه کارول شوي وي:",
                    options = listOf(
                        "The wise hermit who lived in the forest tended the wounded man with remedies which he gathered from herbs.",
                        "The wise hermit which lived in the forest tended the wounded man with remedies who he gathered from herbs.",
                        "The hermit that lived in forest tended herbs who were green.",
                        "The wounded man which came from the woods saw the remedies who were hot."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'Who' is strictly required for persons ('hermit who lived'), while 'which' is required for inanimate objects, substances, or non-human entities ('remedies which he gathered').",
                    whyExplanationUr = "انسانوں کے لیے 'who' آتا ہے (hermit who lived) اور جڑی بوٹیوں یا بے جان چیزوں کے لیے 'which' آتا ہے (remedies which he gathered)۔",
                    whyExplanationPs = "د انسان (hermit) لپاره 'who' او د بې ساه شیانو (remedies) لپاره 'which' کارول کیږي.",
                    formulaOrStep = "Person ➔ Who ; Non-Person/Object ➔ Which",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "In Robert Frost's poem 'Stopping by Woods on a Snowy Evening', what do the famous lines 'And miles to go before I sleep' allegorically represent?",
                    questionUr = "رابرٹ فراسٹ کی نظم کی مشہور سطر 'And miles to go before I sleep' علامتی طور پر کس چیز کی نمائندگی کرتی ہے؟",
                    questionPs = "د رابرټ فراسټ په شعر کې د 'And miles to go before I sleep' تمثیلي مانا څه ده؟",
                    options = listOf(
                        "The long journey of earthly life and moral duties that must be fulfilled before the final sleep of death",
                        "That the traveler's car ran out of gasoline on the highway",
                        "That horses need to run 100 miles before eating dinner",
                        "A literal complaint about hotel room prices"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In literature, 'sleep' is a universal metaphor for death. Frost's repetition of 'miles to go before I sleep' signifies that an individual must persevere in fulfilling life's ethical duties and promises before mortal demise.",
                    whyExplanationUr = "ادب میں 'sleep' موت کا استعارہ ہے۔ شاعر کا مطلب ہے کہ زندگی کے فرائض اور وعدوں کو موت کی ابدی نیند سونے سے پہلے پورا کرنا لازم ہے۔",
                    whyExplanationPs = "دلته خوب د مرګ استعاره ده. مانا دا ده چې انسان باید له مرګه مخکې د ژوند ټولې ژمنې او مسؤلیتونه بشپړ کړي.",
                    formulaOrStep = "Miles to go = Life's duties ➔ Sleep = Metaphor for death",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Which classic novel by Jonathan Swift satirizes human pettiness and political arrogance through a shipwrecked sailor tied down by miniature six-inch citizens?",
                    questionUr = "جوناتھن سوئفٹ کا کون سا کلاسیکی ناول ایک ملاح کے جہاز ٹوٹنے اور 6 انچ کے بونوں کے ہاتھوں باندھے جانے کے ذریعے انسانی تکبر پر طنز کرتا ہے؟",
                    questionPs = "د جوناتن سویفټ کوم مشهور ناول د کوچنیو شپږ انچه خلکو په وسیله پر انساني غرور او بې ځایه جګړو طنز کوي؟",
                    options = listOf(
                        "Gulliver's Travels",
                        "Robinson Crusoe",
                        "Black Beauty",
                        "The Jungle Book"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Jonathan Swift's masterpiece 'Gulliver's Travels' (1726) features Lemuel Gulliver awakening washed ashore in Lilliput, restrained by tiny citizens whose petty wars satirize European court politics.",
                    whyExplanationUr = "جوناتھن سوئفٹ کا ناول 'گلیورز ٹریولز' (Gulliver's Travels) ہے جس میں گلیور للی پٹ کے 6 انچ کے بونوں کے جزیرے پر جاگتا ہے۔",
                    whyExplanationPs = "د جوناتن سویفټ مشهور ناول 'د ګلیور سفرونه' (Gulliver's Travels) دی چیرې چې ګلیور د وړو انسانانو په منځ کې راویښیږي.",
                    formulaOrStep = "Shipwreck + 6-inch Lilliputians = Gulliver's Travels",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "In personal diary/journal writing, which grammatical person perspective and tone are conventionally employed?",
                    questionUr = "ذاتی ڈائری یا جرنل لکھتے وقت روایتی طور پر کون سا صیغہ (پرسن) اور انداز اپنایا جاتا ہے؟",
                    questionPs = "په شخصي ډایري یا یادښتونو کې کوم ګرامري لیدلوری او ژبه کارول کیږي؟",
                    options = listOf(
                        "First-person singular ('I', 'my') with an intimate, candid, introspective tone",
                        "Third-person objective ('he', 'they') with an official legal tone",
                        "Second-person imperative ('you must') with an instructional tone",
                        "Passive impersonal voice without any pronouns"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Diaries are private, introspective records written in the first person ('I felt', 'today I realized') reflecting honest interior thoughts, emotions, and personal growth.",
                    whyExplanationUr = "ڈائری ہمیشہ پہلے صیغہ متکلم ('میں'، 'میرا') میں لکھی جاتی ہے جس میں انسان اپنے سچے اور نجی خیالات و جذبات قلمبند کرتا ہے۔",
                    whyExplanationPs = "ډایري تل په لومړي کس ('زه'، 'زما') کې لیکل کیږي او د انسان خپل شخصي احساسات او ازموینې څرګندوي.",
                    formulaOrStep = "Diary = First Person ('I') + Intimate / Introspective reflection",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 7: SCIENCE AND TECHNOLOGY (INVENTIONS & BRIDGES) (p. 111–141) ───
        Class7EnglishStage(
            id = 7,
            unitNumber = "Unit 7",
            pageRange = "Pages 111–141",
            titleEn = "Science & Technology",
            titleUr = "سائنس اور ٹیکنالوجی",
            titlePs = "ساینس او ټیکنالوژي",
            themeColor = Color(0xFF0369A1),
            secondaryColor = Color(0xFF0C4A6E),
            summaryEn = "Spotlights marvels of modern engineering: 'Buildings and Bridges' (suspension, arch, viaducts), 'Telephone - Then and Now' (from Alexander Graham Bell's 1876 harmonic telegraph to modern satellite 5G smartphones), and 'Inventions by Kids' (Braille alphabet slate, ear-muffs, trampoline). Focuses on prefixes and suffixes, Latin/Greek roots, phrasal verbs, future tense forms (Simple Future, Future Continuous, Future Perfect), and technical expository essays.",
            summaryUr = "جدید انجینئرنگ کے شاہکار: عمارات اور پُل (معلق پُل، محرابی پُل)، ٹیلی فون کی تاریخ (1876 کے بیل کے فون سے 5G اسمارٹ فون تک)، اور بچوں کی ایجادات (بریل سلیٹ، ٹریمپولین)۔ اس یونٹ میں سابقے اور لاحقے (پریفکسز/سفکسز)، فریزل وربز، فیوچر ٹینسز اور سائنسی مضامین شامل ہیں۔",
            summaryPs = "د نوې انجینرۍ بریاوې: ودانۍ او پلونه، د ټیلیفون تاریخ (له ګراهام بیل څخه تر ۵ جي ځیرک ټیلیفونونو)، او د ماشومانو اختراعات. مختاړي او روستاړي (Prefix/Suffix)، فعلي جملې (Phrasal verbs) او راتلونکې زمانې زده کیږي.",
            keyRules = listOf(
                "Prefixes & Suffixes: Prefixes alter meaning (tele- = distant, micro- = small, auto- = self, bio- = life); Suffixes alter grammatical class (-tion forms noun, -able forms adjective, -ly forms adverb)",
                "Phrasal Verbs: Verb + preposition/adverb with idiomatic meaning (carry out = execute; break down = fail mechanically; give up = surrender; look into = investigate)",
                "Future Tenses: Simple Future (will + V1 for predictions); Future Continuous (will be + V-ing for ongoing future action); Future Perfect (will have + V3 for action finished before a future deadline)"
            ),
            cards = listOf(
                Class7EnglishCard(
                    title = "Bridges & Modern Engineering",
                    ruleOrConcept = "Arch, Beam, Suspension & Viaducts",
                    detailEn = "Suspension bridges (e.g. Golden Gate) use high-tensile steel cables draped over towers to span vast bodies of water. Viaducts carry highways and rail tracks across deep mountain valleys. Engineering balances compression forces (pushing together) and tension forces (pulling apart).",
                    detailUr = "معلق پُل (سسپنشن برجز) سٹیل کی موٹی تاروں کے سہارے سمندروں پر تنے ہوتے ہیں۔ وایاڈکٹ پُل اونچی پہاڑی وادیوں کے درمیان ٹرین اور گاڑیوں کے راستے بناتے ہیں، جن میں کھچاؤ (ٹینشن) اور دباؤ (کمپریشن) کو متوازن رکھا جاتا ہے۔",
                    detailPs = "ځوړند پلونه د فولادي تارونو په مرسته پر اوبو جوړیږي. وایاډکټ پلونه د غرو په ژورو درو کې سړکونه تېروي او د کشش او فشار توازن ساتي.",
                    cardColor = Color(0xFF0284C7)
                ),
                Class7EnglishCard(
                    title = "Evolution of the Telephone",
                    ruleOrConcept = "From Bell (1876) to 5G Smartphones",
                    detailEn = "Alexander Graham Bell transmitted the first human voice on March 10, 1876: 'Mr. Watson, come here, I want to see you.' Over 150 years, the telephone evolved from analog copper wire telegraphs to digital packet-switched wireless satellite computing devices.",
                    detailUr = "10 مارچ 1876 کو گراہم بیل نے پہلی بار تار پر انسانی آواز بھیجی: 'مسٹر واٹسن، یہاں آؤ، مجھے تم سے کام ہے'۔ آج یہ تاروں سے نکل کر سیٹلائٹ اور 5G اسمارٹ فونز میں بدل چکا ہے۔",
                    detailPs = "ګراهام بیل په ۱۸۷۶ کې د لومړي ځل لپاره انساني غږ په تار ولېږه. نن ورځ ټیلیفون له مسي تارونو څخه تر سپوږمکیو او ۵ جي ځیرکو کمپیوټرونو پورې رسېدلی دی.",
                    cardColor = Color(0xFF0369A1)
                ),
                Class7EnglishCard(
                    title = "Inventions by Kids",
                    ruleOrConcept = "Louis Braille & Everyday Ingenuity",
                    detailEn = "Louis Braille was blinded as a child and at age 15 invented the 6-dot tactile Braille reading system in 1824. Chester Greenwood invented earmuffs at age 15 in 1873. George Nissen invented the trampoline at age 16 in 1930.",
                    detailUr = "لوئی بریل نے بچپن میں بینائی جانے کے بعد 15 سال کی عمر میں 1824 میں نابینا افراد کے لیے بریل رسم الخط ایجاد کیا۔ چیسٹر گرین ووڈ نے 15 سال کی عمر میں کانوں کے مفلر (earmuffs) ایجاد کیے۔",
                    detailPs = "لویس بریل په ۱۵ کلنۍ کې د ړندو لپاره د ۶ ټکو خط جوړ کړ. چیسټر په ۱۵ کلنۍ کې غوږ پټوونکي او نیسن په ۱۶ کلنۍ کې ټرامپولین اختراع کړل.",
                    cardColor = Color(0xFF075985)
                ),
                Class7EnglishCard(
                    title = "Greek & Latin Etymology",
                    ruleOrConcept = "Prefixes & Roots in Science",
                    detailEn = "Tele- (far/distant: telephone, telescope, television); Phon- (sound: telephone, phonetics); Bio- (life: biology, biofuel); Graph- (write/draw: telegraph, autograph); Micro- (small: microscope, microchip); Struct- (build: structure, construct).",
                    detailUr = "یونانی اور لاطینی جڑیں: Tele (دور)؛ Phon (آواز)؛ Bio (زندگی)؛ Graph (لکھنا)؛ Micro (چھوٹا)؛ Struct (تعمیر کرنا)۔ ان سے سینکڑوں سائنسی الفاظ بنتے ہیں۔",
                    detailPs = "یوناني او لاتیني ریښې: Tele (لرې)، Phon (غږ)، Bio (ژوند)، Graph (لیکل)، Micro (کوچنی). دا د نویو علمي کلمو بنسټ دی.",
                    cardColor = Color(0xFF0EA5E9)
                ),
                Class7EnglishCard(
                    title = "Phrasal Verbs in Technology",
                    ruleOrConcept = "Idiomatic Combinations",
                    detailEn = "Phrasal verbs have meanings distinct from their base verbs: 'carry out' (perform an experiment); 'break down' (fail to function); 'set up' (install equipment); 'look into' (investigate an error); 'turn down' (reject an offer or decrease volume).",
                    detailUr = "فریزل وربز ورب اور پریپوزیشن کا مجموعہ ہوتے ہیں جن کے خاص معنی ہوتے ہیں: carry out (تجربہ کرنا)؛ break down (مشین خراب ہونا)؛ set up (سسٹم انسٹال کرنا)؛ look into (تحقیقات کرنا)۔",
                    detailPs = "فعلي اصطلاحات (Phrasal verbs) ځانګړې مانا لري: carry out (عملي کول)، break down (خرابېدل)، set up (درول او نصب کول).",
                    cardColor = Color(0xFF0C4A6E)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Which phrasal verb correctly completes the sentence: 'Engineers must ________ thorough safety inspections before opening the new suspension bridge to traffic'?",
                    questionUr = "جملے کو مکمل کرنے کے لیے کون سا فریزل ورب درست ہے؟",
                    questionPs = "د جملې د بشپړولو لپاره سم فعلي اصطلاح (Phrasal verb) کومه ده؟",
                    options = listOf(
                        "carry out (meaning to execute or perform)",
                        "break down (meaning to fail mechanically)",
                        "give up (meaning to abandon effort)",
                        "look down (meaning to despise)"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'Carry out' is the standard phrasal verb meaning to conduct, perform, or execute an investigation, experiment, or safety check.",
                    whyExplanationUr = "'Carry out' کا مطلب ہے 'انجام دینا یا عمل میں لانا'۔ انجینئرز کو حفاظتی معائنہ مکمل طور پر انجام دینا چاہیے (carry out)۔",
                    whyExplanationPs = "'Carry out' مانا 'ترسره کول او عملي کول' دي، نو د خوندیتوب پلټنې ترسره کول 'carry out inspections' کیږي.",
                    formulaOrStep = "Carry out = Execute / Conduct / Perform a task",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Based on Greek etymology roots, what does the word 'Telephone' literally translate to?",
                    questionUr = "یونانی زبان کی جڑوں کے مطابق، لفظ 'Telephone' کا لفظی ترجمہ کیا بنتا ہے؟",
                    questionPs = "د یوناني ریښو له مخې د 'Telephone' لغوي مانا څه ده؟",
                    options = listOf(
                        "'Distant sound' (Tele = distant + Phone = sound/voice)",
                        "'Fast picture' (Tele = fast + Phone = vision)",
                        "'Small book' (Tele = small + Phone = text)",
                        "'Electric wire' (Tele = electric + Phone = metal)"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In Greek, 'Tele' means distant or far off, and 'Phone' means voice or sound. Thus, 'telephone' literally translates to 'transmitting sound across distance'.",
                    whyExplanationUr = "یونانی میں 'Tele' کا مطلب ہے دور (distant) اور 'Phone' کا مطلب ہے آواز (sound)۔ لہٰذا ٹیلی فون کا لفظی مطلب ہے 'دور کی آواز'۔",
                    whyExplanationPs = "په یوناني کې Tele د لرې واټن او Phone د غږ مانا لري، نو ٹیلیفون د 'لرې واټن غږ' مانا ورکوي.",
                    formulaOrStep = "Tele (Distant) + Phone (Sound / Voice) = Telephone",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Identify the sentence that correctly employs the Future Perfect tense (will have + past participle) to denote a completed action before a future time:",
                    questionUr = "مستقبل میں کسی مقررہ وقت سے پہلے کام مکمل ہونے کو ظاہر کرنے کے لیے فیوچر پرفیکٹ ٹینس کا درست جملہ منتخب کریں:",
                    questionPs = "هغه جمله وټاکئ چې د Future Perfect زمانې (will have + V3) سمه کارونه پکې شوې وي:",
                    options = listOf(
                        "By next December, the architectural team will have completed the new suspension viaduct.",
                        "By next December, the architectural team will completing the new suspension viaduct.",
                        "By next December, the architectural team will has completed the new suspension viaduct.",
                        "By next December, the architectural team was completed the new suspension viaduct."
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Future Perfect requires the construction: 'will have + past participle (V3)'. It expresses an event that will be completed prior to a designated point in the future ('By next December, will have completed'). Note that 'will has' is always grammatically incorrect.",
                    whyExplanationUr = "فیوچر پرفیکٹ ٹینس کا قاعدہ ہے: will have + فعل کی تیسری فارم (will have completed)۔ یہ ظاہر کرتا ہے کہ آئندہ دسمبر تک پُل کی تعمیر مکمل ہو چکی ہوگی۔ 'will has' کبھی نہیں ہوتا۔",
                    whyExplanationPs = "د Future Perfect جوړښت 'will have + V3' دی او دا ښيي چې کار به د راتلونکي تر ټاکلي وخت مخکې بشپړ شوی وي.",
                    formulaOrStep = "Future Perfect = will have + Past Participle (will have completed)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What historic communication achievement occurred on March 10, 1876 in Alexander Graham Bell's laboratory?",
                    questionUr = "10 مارچ 1876 کو الیگزینڈر گراہم بیل کی لیبارٹری میں مواصلات کا کون سا تاریخی واقعہ پیش آیا؟",
                    questionPs = "د ۱۸۷۶ کال د مارچ په لسمه د ګراهام بیل په لابراتوار کې کومه تاریخي پیښه وشوه؟",
                    options = listOf(
                        "The first intelligible human sentence was transmitted over a wire: 'Mr. Watson, come here, I want to see you.'",
                        "The first television broadcast of a soccer game",
                        "The launch of the first 4G broadband smartphone",
                        "The invention of the steam locomotive railway engine"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "On March 10, 1876, Bell spoke the famous first words over an electrical telephone transmitter to his assistant Thomas Watson in the next room: 'Mr. Watson, come here, I want to see you.'",
                    whyExplanationUr = "10 مارچ 1876 کو گراہم بیل نے اپنے معاون کو تاریخ کا پہلا ٹیلی فون پیغام بھیجا: 'مسٹر واٹسن، یہاں آؤ، مجھے تم سے کام ہے۔'",
                    whyExplanationPs = "ګراهام بیل خپل همکار واټسن ته د لومړي ځل لپاره پر ټیلیفون غږ وکړ چې 'واټسن دلته راشه، کار درته لرم'.",
                    formulaOrStep = "March 10, 1876: First successful telephone voice transmission",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What was the landmark invention created by 15-year-old Louis Braille in 1824 that revolutionized literacy for visually impaired people worldwide?",
                    questionUr = "1824 میں 15 سالہ لوئی بریل کی وہ کون سی تاریخی ایجاد تھی جس نے دنیا بھر کے نابینا افراد کے لیے تعلیم کے دروازے کھولے؟",
                    questionPs = "په ۱۸۲۴ کې د ۱۵ کلن لویس بریل کومه ستره اختراع وه چې د ړندو کسانو زده کړه یې بدله کړه؟",
                    options = listOf(
                        "A tactile alphabet system using embossed patterns of raised six-dot cells readable by touch",
                        "Audio cassette tapes played on portable walkmans",
                        "Electronic glasses with digital screens",
                        "A wooden typewriter that printed ink on paper"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Louis Braille devised a tactile six-dot code representing letters, numbers, and musical symbols, enabling blind and visually impaired people to read and write fluently using fingertip touch.",
                    whyExplanationUr = "لوئی بریل نے 6 ابھرے ہوئے نقطوں پر مشتمل ایک لمسی رسم الخط ایجاد کیا جس پر انگلیاں پھیر کر نابینا افراد آسانی سے پڑھ اور لکھ سکتے ہیں۔",
                    whyExplanationPs = "لویس بریل د ۶ وتلو ټکو پر بنسټ یو داسې خط جوړ کړ چې ړانده کسان د ګوتو په لمس سره هر کتاب لوستلی شي.",
                    formulaOrStep = "Louis Braille (Age 15, 1824) = 6-Dot Raised Tactile Code",
                    difficulty = 1
                )
            )
        )
    )
}
