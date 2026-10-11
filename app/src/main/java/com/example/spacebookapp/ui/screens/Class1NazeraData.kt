package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

enum class NazeraGameType {
    LETTER_MAKHRAJ_POP,       // Tap glowing Arabic letters in proper order / makhraj group
    HARKAAT_SOUND_BUILDER,    // Match Arabic letters with Zabar / Zer / Pesh / Standing Harkaat sounds
    JAZAM_SHADD_BRIDGE,       // Connect first letter to second letter with Jazam (ـْ) or Shadd (ـّ)
    MADDAH_LEEN_STRETCHER,    // Tap/Hold wave crystal to stretch Maddah (2 counts) or tap softly for Leen
    TANWEEN_GHUNNA_CATCHER,   // Match Do Zabar / Do Zer / Do Pesh / Ghunna words with their nasal sounds
    SURAH_AYAH_BUILDER        // Tap Ayahs of Last 4 Surahs in exact Quranic order
}

data class NazeraFlashCard(
    val arabicText: String,
    val transliteration: String,
    val meaningEn: String,
    val meaningUr: String,
    val meaningPs: String,
    val badgeColor: Color
)

data class NazeraQuizQuestion(
    val questionEn: String,
    val questionUr: String,
    val questionPs: String,
    val arabicPrompt: String,
    val options: List<String>,
    val correctIndex: Int
)

data class NazeraStageData(
    val id: Int,
    val lessonNumber: String,
    val pageRange: String,
    val titleArabic: String,
    val titleEn: String,
    val titleUr: String,
    val titlePs: String,
    val themeColor: Color,
    val secondaryColor: Color,
    val gameType: NazeraGameType,
    val ruleEn: String,
    val ruleUr: String,
    val rulePs: String,
    val gameInstructionEn: String,
    val gameInstructionUr: String,
    val gameInstructionPs: String,
    val cards: List<NazeraFlashCard>,
    val quizzes: List<NazeraQuizQuestion>
)

object Class1NazeraRepository {

    val stages: List<NazeraStageData> = listOf(
        // LESSON 1 (Page 06-07): Arabic Alphabets (عربی حروفِ تہجی)
        NazeraStageData(
            id = 1,
            lessonNumber = "سبق 1 • Lesson 1",
            pageRange = "Pages 06–07",
            titleArabic = "عَرَبِی حُرُوفِ تَہَجِّی",
            titleEn = "Arabic Alphabets (29 Huruf)",
            titleUr = "عربی حروفِ تہجی (مخارج کے ساتھ)",
            titlePs = "عربي توري (د مخارجو سره)",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF115E59),
            gameType = NazeraGameType.LETTER_MAKHRAJ_POP,
            ruleEn = "There are 29 Arabic letters from Alif (ا) to Yaa (ی). Read each letter from its proper Makhraj (articulation point in throat, tongue, or lips).",
            ruleUr = "عربی زبان میں 29 حروفِ تہجی ہیں، الف (ا) سے لے کر یا (ی) تک۔ ہر حرف کو اس کے درست مخرج (گلے، زبان یا ہونٹوں) سے ادا کریں۔",
            rulePs = "په عربي ژبه کې ۲۹ توري دي، له الف (ا) څخه تر یا (ی) پورې. هر توری له خپل سم مخرج (ستوني، ژبې یا شونډو) څخه ولولئ.",
            gameInstructionEn = "Tap the glowing Arabic letters in exact order from Right to Left to pop the golden lanterns!",
            gameInstructionUr = "سنہری قندیل روشن کرنے کے لیے عربی حروف کو دائیں سے بائیں ترتیب وار ٹیپ کریں!",
            gameInstructionPs = "د طلایي څراغونو روښانه کولو لپاره عربي توري له ښي څخه کیڼ ته په ترتیب سره ووهئ!",
            cards = listOf(
                NazeraFlashCard("ا  ب  ت  ث", "Alif • Baa • Taa • Thaa", "Lips & Tip of Tongue", "ہونٹ اور زبان کی نوک", "شونډې او د ژبې څوکه", Color(0xFF0D9488)),
                NazeraFlashCard("ج  ح  خ", "Jeem • Haa • Khaa", "Mid Tongue & Throat Letters", "وسطِ زبان اور حلقی حروف", "د ژبې منځ او د ستوني توري", Color(0xFF0284C7)),
                NazeraFlashCard("د  ذ  ر  ز", "Daal • Zaal • Raa • Zaa", "Tip of Tongue Letters", "زبان کی نوک سے ادا ہونے والے حروف", "د ژبې له څوکې څخه ادا کېدونکي توري", Color(0xFF7C3AED)),
                NazeraFlashCard("س  ش  ص  ض", "Seen • Sheen • Saad • Daad", "Whistling & Heavy Letters", "سیٹی والے اور پر (موٹے) حروف", "د شپېلۍ او درانه توري", Color(0xFFD97706)),
                NazeraFlashCard("ط  ظ  ع  غ", "Taa • Zaa • Ain • Ghain", "Heavy & Throat Letters", "موٹے اور گلے کے حروف", "درانه او د ستوني توري", Color(0xFFDC2626)),
                NazeraFlashCard("ف  ق  ک  ل  م  ن  و  ہ  ء  ی", "Faa to Yaa", "Remaining Huruf-e-Tahajji", "باقی حروفِ تہجی (ف تا ی)", "پاتې توري (له ف څخه تر ی)", Color(0xFF059669))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How many total letters are in the Arabic Alphabet?",
                    "عربی حروفِ تہجی کل کتنے ہیں؟",
                    "په عربي الفبا کې ټول څو توري دي؟",
                    "ا ب ت ث ... ی",
                    listOf("29", "26", "37"),
                    0
                ),
                NazeraQuizQuestion(
                    "Which letter comes right after 'ب' (Baa)?",
                    "حرف 'ب' کے فوراً بعد کون سا حرف آتا ہے؟",
                    "د 'ب' توري وروسته کوم توری راځي؟",
                    "ا ، ب ، ؟",
                    listOf("ت (Taa)", "ج (Jeem)", "د (Daal)"),
                    0
                )
            )
        ),

        // LESSON 2 (Page 08-12): Zabar (زبر ـَ)
        NazeraStageData(
            id = 2,
            lessonNumber = "سبق 2 • Lesson 2",
            pageRange = "Pages 08–12",
            titleArabic = "حَرَکَات: زَبَر ( ـَ )",
            titleEn = "Fatha / Zabar ( ـَ )",
            titleUr = "زبر ( ـَ ) کی پہچان اور مشق",
            titlePs = "زور / زبر ( ـَ ) پېژندنه او مشق",
            themeColor = Color(0xFF2563EB),
            secondaryColor = Color(0xFF1E3A8A),
            gameType = NazeraGameType.HARKAAT_SOUND_BUILDER,
            ruleEn = "Zabar ( ـَ ) is placed ABOVE a letter. Read it quickly by opening the mouth slightly without stretching (e.g., Ba, Ta, Da-Ra-Sa).",
            ruleUr = "زبر ( ـَ ) حرف کے اوپر ہوتا ہے۔ اسے منہ کھول کر بغیر کھینچے جلدی سے پڑھا جاتا ہے، جیسے: بَ، تَ، دَرَسَ۔",
            rulePs = "زبر ( ـَ ) د توري دپاسه وي. دا د خولې په خلاصولو سره پرته له اوږدولو ژر لوستل کېږي، لکه: بَ، تَ، دَرَسَ.",
            gameInstructionEn = "Listen or read the target sound and tap the matching Arabic letter/word with Zabar ( ـَ )!",
            gameInstructionUr = "آواز سنیں اور زبر ( ـَ ) والے درست عربی حرف یا لفظ کو ٹیپ کریں!",
            gameInstructionPs = "غږ واورئ او د زبر ( ـَ ) لرونکی سم عربي توری یا کلیمه ووهئ!",
            cards = listOf(
                NazeraFlashCard("بَ   تَ   ثَ", "Ba • Ta • Tha", "Single letters with Zabar above", "مفرد حروف زبر کے ساتھ", "مفرد توري د زبر سره", Color(0xFF2563EB)),
                NazeraFlashCard("جَ   حَ   خَ", "Ja • Ha • Kha", "Read softly without stretching", "بغیر کھینچے نرمی سے پڑھیں", "پرته له اوږدولو یې ولولئ", Color(0xFF0891B2)),
                NazeraFlashCard("دَرَسَ", "Da - Ra - Sa", "He studied (3 Zabar letters)", "اس نے پڑھا (تین زبر والے حروف)", "هغه درس ووایه (درې زبر توري)", Color(0xFF059669)),
                NazeraFlashCard("کَتَبَ", "Ka - Ta - Ba", "He wrote (Joined Zabar word)", "اس نے لکھا (ملا کر پڑھنے کی مشق)", "هغه ولیکل (یوځای لوستل)", Color(0xFF7C3AED)),
                NazeraFlashCard("خَلَقَ", "Kha - La - Qa", "He created", "اس نے پیدا کیا", "هغه پیدا کړ", Color(0xFFD97706)),
                NazeraFlashCard("عَبَدَ", "A - Ba - Da", "He worshipped", "اس نے عبادت کی", "هغه عبادت وکړ", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Where is Zabar ( ـَ ) placed on an Arabic letter?",
                    "زبر ( ـَ ) حرف کے کس حصے پر آتا ہے؟",
                    "زبر ( ـَ ) د توري په کومه برخه کې راځي؟",
                    "بَ",
                    listOf("Above the letter (حرف کے اوپر)", "Below the letter (حرف کے نیچے)", "Inside the letter"),
                    0
                ),
                NazeraQuizQuestion(
                    "How do we pronounce 'کَتَبَ'?",
                    "لفظ 'کَتَبَ' کو کیسے پڑھا جائے گا؟",
                    "د 'کَتَبَ' کلیمه څنګه لوستل کېږي؟",
                    "کَتَبَ",
                    listOf("Ka-Ta-Ba", "Ki-Ti-Bi", "Ku-Tu-Bu"),
                    0
                )
            )
        ),

        // LESSON 3 (Page 13-16): Zer (زیر ـِ)
        NazeraStageData(
            id = 3,
            lessonNumber = "سبق 3 • Lesson 3",
            pageRange = "Pages 13–16",
            titleArabic = "حَرَکَات: زِیر ( ـِ )",
            titleEn = "Kasra / Zer ( ـِ )",
            titleUr = "زیر ( ـِ ) کی پہچان اور مشق",
            titlePs = "زېر ( ـِ ) پېژندنه او مشق",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            gameType = NazeraGameType.HARKAAT_SOUND_BUILDER,
            ruleEn = "Zer ( ـِ ) is placed BELOW a letter. It gives a short 'i' sound (Bi, Ti, ই) without stretching.",
            ruleUr = "زیر ( ـِ ) حرف کے نیچے ہوتا ہے۔ اسے آواز نیچے گرا کر بغیر کھینچے جلدی سے پڑھتے ہیں، جیسے: بِ، تِ، اِبِلِ۔",
            rulePs = "زېر ( ـِ ) د توري لاندې وي. دا پرته له اوږدولو ژر لوستل کېږي، لکه: بِ، تِ، اِبِلِ.",
            gameInstructionEn = "Tap the Arabic letter or word that matches the Zer ( ـِ ) pronunciation!",
            gameInstructionUr = "زیر ( ـِ ) کی درست آواز والے عربی حرف یا لفظ کو منتخب کریں!",
            gameInstructionPs = "د زېر ( ـِ ) سم غږ لرونکی عربي توری یا کلیمه وټاکئ!",
            cards = listOf(
                NazeraFlashCard("بِ   تِ   ثِ", "Bi • Ti • Thi", "Zer is written below the letter", "زیر حرف کے نیچے لکھی جاتی ہے", "زېر د توري لاندې لیکل کېږي", Color(0xFF7C3AED)),
                NazeraFlashCard("اِبِلِ", "I - Bi - Li", "Camels (All 3 letters with Zer)", "اونٹ (تینوں حروف زیر والے)", "اوښان (درې واړه توري د زېر سره)", Color(0xFF2563EB)),
                NazeraFlashCard("سَمِعَ", "Sa - Mi - A", "He heard (Zabar + Zer + Zabar)", "اس نے سنا (زبر اور زیر کی مشق)", "هغه واورېدل (زبر او زېر مشق)", Color(0xFF059669)),
                NazeraFlashCard("عَلِمَ", "A - Li - Ma", "He knew", "اس نے جانا", "هغه پوه شو", Color(0xFFD97706)),
                NazeraFlashCard("حَمِدَ", "Ha - Mi - Da", "He praised", "اس نے تعریف کی", "هغه ستاینه وکړه", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Where is Zer ( ـِ ) placed on a letter?",
                    "زیر ( ـِ ) حرف کے کہاں لکھی جاتی ہے؟",
                    "زېر ( ـِ ) د توري چیرته لیکل کېږي؟",
                    "بِ",
                    listOf("Below the letter (حرف کے نیچے)", "Above the letter (حرف کے اوپر)", "After the letter"),
                    0
                ),
                NazeraQuizQuestion(
                    "Read the word 'سَمِعَ' correctly:",
                    "لفظ 'سَمِعَ' کا درست تلفظ کون سا ہے؟",
                    "د 'سَمِعَ' سم تلفظ کوم دی؟",
                    "سَمِعَ",
                    listOf("Sa - Mi - A", "Sa - Ma - A", "Si - Mi - I"),
                    0
                )
            )
        ),

        // LESSON 4 (Page 17-20): Pesh (پیش ـُ)
        NazeraStageData(
            id = 4,
            lessonNumber = "سبق 4 • Lesson 4",
            pageRange = "Pages 17–20",
            titleArabic = "حَرَکَات: پِیش ( ـُ )",
            titleEn = "Damma / Pesh ( ـُ )",
            titleUr = "پیش ( ـُ ) کی پہچان اور مشق",
            titlePs = "پېښ ( ـُ ) پېژندنه او مشق",
            themeColor = Color(0xFFEA580C),
            secondaryColor = Color(0xFF9A3412),
            gameType = NazeraGameType.HARKAAT_SOUND_BUILDER,
            ruleEn = "Pesh ( ـُ ) is placed ABOVE a letter like a tiny Waw. Read it by rounding both lips quickly (Bu, Tu, Ru-Su-Lu).",
            ruleUr = "پیش ( ـُ ) حرف کے اوپر چھوٹے واؤ کی طرح ہوتا ہے۔ اسے دونوں ہونٹ گول کر کے بغیر کھینچے پڑھتے ہیں، جیسے: بُ، تُ، رُسُلُ۔",
            rulePs = "پېښ ( ـُ ) د توري دپاسه وي. دا د دواړو شونډو په ګردولو سره پرته له اوږدولو لوستل کېږي، لکه: بُ، تُ، رُسُلُ.",
            gameInstructionEn = "Round your lips! Match the Pesh ( ـُ ) sound with the glowing Arabic word!",
            gameInstructionUr = "ہونٹ گول کر کے پڑھیں! پیش ( ـُ ) کی آواز کو درست عربی لفظ سے ملائیں!",
            gameInstructionPs = "شونډې ګردې کړئ! د پېښ ( ـُ ) غږ له سمې عربي کلیمې سره وصل کړئ!",
            cards = listOf(
                NazeraFlashCard("بُ   تُ   ثُ", "Bu • Tu • Thu", "Round lips for Pesh sound", "پیش کو ہونٹ گول کر کے پڑھیں", "پېښ د شونډو په ګردولو ولولئ", Color(0xFFEA580C)),
                NazeraFlashCard("رُسُلُ", "Ru - Su - Lu", "Messengers (All Pesh letters)", "رسول جمع (تینوں حروف پر پیش)", "رسولان (درې واړه توري د پېښ سره)", Color(0xFF2563EB)),
                NazeraFlashCard("کُتِبَ", "Ku - Ti - Ba", "It was written (Pesh + Zer + Zabar)", "لکھا گیا (پیش، زیر اور زبر)", "ولیکل شو (پېښ، زېر او زبر)", Color(0xFF059669)),
                NazeraFlashCard("خُلِقَ", "Khu - Li - Qa", "He was created", "وہ پیدا کیا گیا", "هغه پیدا کړل شو", Color(0xFF7C3AED)),
                NazeraFlashCard("قُرِئَ", "Qu - Ri - A", "It was recited", "پڑھا گیا", "ولوستل شو", Color(0xFF0D9488))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How should your lips move when reading Pesh ( ـُ )?",
                    "پیش ( ـُ ) پڑھتے وقت ہونٹوں کی شکل کیسی ہونی چاہیے؟",
                    "د پېښ ( ـُ ) لوستلو پر مهال شونډې باید څنګه وي؟",
                    "بُ  تُ  رُسُلُ",
                    listOf("Rounded (دونوں ہونٹ گول)", "Spread wide", "Closed tight"),
                    0
                ),
                NazeraQuizQuestion(
                    "Which word has Pesh, Zer, and Zabar in order: Ku - Ti - Ba?",
                    "کون سے لفظ میں ترتیب سے پیش، زیر اور زبر (Ku-Ti-Ba) ہے؟",
                    "په کومه کلیمه کې په ترتیب سره پېښ، زېر او زبر دی؟",
                    "Ku - Ti - Ba",
                    listOf("کُتِبَ", "کَتَبَ", "رُسُلُ"),
                    0
                )
            )
        ),

        // LESSON 5 (Page 21-25): Jazam / Sukoon (جزم / سکون ـْ)
        NazeraStageData(
            id = 5,
            lessonNumber = "سبق 5 • Lesson 5",
            pageRange = "Pages 21–25",
            titleArabic = "جَزَم / سُکُون ( ـْ )",
            titleEn = "Jazam / Sukoon ( ـْ )",
            titleUr = "جزم / سکون ( ـْ ) — دو حروف کو ملانا",
            titlePs = "جزم / سکون ( ـْ ) — دوه توري یوځای کول",
            themeColor = Color(0xFF059669),
            secondaryColor = Color(0xFF065F46),
            gameType = NazeraGameType.JAZAM_SHADD_BRIDGE,
            ruleEn = "A letter with Jazam ( ـْ ) is called 'Sakin'. It cannot be read alone; it joins with the moving letter before it (e.g., أَبْ = Ab, مَنْ = Man).",
            ruleUr = "جس حرف پر جزم ( ـْ ) ہو اسے 'ساکن' کہتے ہیں۔ ساکن حرف اکیلا نہیں پڑھا جاتا بلکہ اپنے سے پہلے والے متحرک حرف سے مل کر پڑھا جاتا ہے، جیسے: اَبْ، مَنْ۔",
            rulePs = "هغه توری چې جزم ( ـْ ) پرې وي 'ساکن' بلل کېږي. ساکن توری یوازې نه لوستل کېږي بلکې له مخکیني متحرک توري سره یوځای لوستل کېږي، لکه: اَبْ، مَنْ.",
            gameInstructionEn = "Build the Jazam Bridge! Tap the first letter, then tap the Sakin ( ـْ ) letter to join them!",
            gameInstructionUr = "جزم کا پل بنائیں! پہلے متحرک حرف اور پھر جزم ( ـْ ) والے ساکن حرف کو ٹیپ کر کے ملائیں!",
            gameInstructionPs = "د جزم پل جوړ کړئ! لومړی متحرک توری او بیا د جزم ( ـْ ) لرونکی ساکن توری ووهئ!",
            cards = listOf(
                NazeraFlashCard("اَبْ   اِذْ   اُفْ", "Ab • Iz • Uf", "Joining Alif with Sakin letter", "ہمزہ کو ساکن حرف سے ملا کر پڑھیں", "همزه له ساکن توري سره یوځای ولولئ", Color(0xFF059669)),
                NazeraFlashCard("مَنْ   عَنْ   لَمْ", "Man • An • Lam", "Two-letter Quranic words with Jazam", "جزم والے دو حرفی قرآنی الفاظ", "د جزم لرونکې دوه توري قرآني کلیمې", Color(0xFF0284C7)),
                NazeraFlashCard("قُلْ   بَلْ   ھَلْ", "Qul • Bal • Hal", "Joining with Laam Sakin (لْ)", "لام ساکن (لْ) کے ساتھ ملا کر پڑھنا", "له لام ساکن (لْ) سره یوځای لوستل", Color(0xFF7C3AED)),
                NazeraFlashCard("یَخْلُقُ", "Yakh - Lu - Qu", "Word with Jazam in the middle", "درمیان میں جزم والا قرآنی لفظ", "په منځ کې د جزم لرونکې کلیمه", Color(0xFFD97706)),
                NazeraFlashCard("اَلْحَمْدُ", "Al - Ham - Du", "All praise (2 Jazam letters)", "الحمد (دو جزموں کی مشق)", "الحمد (د دوو جزمونو مشق)", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What is a letter with Jazam ( ـْ ) called?",
                    "جس حرف پر جزم ( ـْ ) ہو اسے کیا کہتے ہیں؟",
                    "هغه توری چې جزم ( ـْ ) پرې وي څه ورته ویل کېږي؟",
                    "بْ ، نْ ، لْ",
                    listOf("Sakin (ساکن)", "Mushaddad (مشدد)", "Tanween (تنوین)"),
                    0
                ),
                NazeraQuizQuestion(
                    "How do you read 'قُ' joined with 'لْ'?",
                    "جب 'قُ' کو 'لْ' سے ملائیں تو کیا بنے گا؟",
                    "کله چې 'قُ' له 'لْ' سره یوځای شي څه ترې جوړېږي؟",
                    "قُ + لْ = قُلْ",
                    listOf("Qul (قُلْ)", "Qa-La", "Qu-Lu"),
                    0
                )
            )
        ),

        // LESSON 6 (Page 26-27): Shadd / Tashdeed (شد / تشدید ـّ)
        NazeraStageData(
            id = 6,
            lessonNumber = "سبق 6 • Lesson 6",
            pageRange = "Pages 26–27",
            titleArabic = "شَدّ / تَشْدِید ( ـّ )",
            titleEn = "Shadd / Tashdeed ( ـّ )",
            titleUr = "شد / تشدید ( ـّ ) — حرف کو دو بار پڑھنا",
            titlePs = "شد / تشدید ( ـّ ) — توری دوه ځله لوستل",
            themeColor = Color(0xFFDC2626),
            secondaryColor = Color(0xFF991B1B),
            gameType = NazeraGameType.JAZAM_SHADD_BRIDGE,
            ruleEn = "A letter with Shadd ( ـّ ) is called 'Mushaddad'. It is read TWICE: first joined with the previous letter, and second with its own Harkat with firmness (e.g., رَبَّ = Rab-ba).",
            ruleUr = "جس حرف پر شد ( ـّ ) ہو اسے 'مشدّد' کہتے ہیں۔ مشدد حرف دو بار پڑھا جاتا ہے: پہلی بار پچھلے حرف سے ملا کر اور دوسری بار اپنی حرکت کے ساتھ جماؤ سے، جیسے: رَبَّ (رَبْ + بَ)۔",
            rulePs = "هغه توری چې شد ( ـّ ) پرې وي 'مشدد' بلل کېږي. مشدد توری دوه ځله لوستل کېږي: لومړی له مخکیني توري سره او دوهم ځل له خپل حرکت سره په کلکه، لکه: رَبَّ (رَبْ + بَ).",
            gameInstructionEn = "Power up the Shadd ( ـّ ) Bridge! Join the first letter and double-tap the Mushaddad letter!",
            gameInstructionUr = "شد ( ـّ ) کا پل بنائیں! پہلے حرف کو مشدد حرف کے ساتھ ملا کر دوہری آواز بنائیں!",
            gameInstructionPs = "د شد ( ـّ ) پل جوړ کړئ! لومړی توری له مشدد توري سره یوځای کړئ!",
            cards = listOf(
                NazeraFlashCard("اَبَّ   اِنَّ   اُمَّ", "Ab-ba • In-na • Um-ma", "Read the Shadd letter twice strongly", "شد والے حرف کو دو بار مضبوطی سے پڑھیں", "د شد توری دوه ځله په کلکه ولولئ", Color(0xFFDC2626)),
                NazeraFlashCard("رَبِّ", "Rab - bi", "My Lord (Ra joined with doubled Baa)", "اے میرے رب (راء کو مشدد باء سے ملائیں)", "ای زما ربه (راء له مشدد باء سره)", Color(0xFF2563EB)),
                NazeraFlashCard("حَقُّ", "Haq - qu", "Truth (Doubled Qaaf with Pesh)", "سچ / حق (قاف مشدد پیش کے ساتھ)", "حق / رښتیا (قاف مشدد د پېښ سره)", Color(0xFF059669)),
                NazeraFlashCard("ثُمَّ", "Thum - ma", "Then (Meem Mushaddad with Ghunna)", "پھر (میم مشدد غنہ کے ساتھ)", "بیا (میم مشدد له غنې سره)", Color(0xFF7C3AED)),
                NazeraFlashCard("قَدَّرَ", "Qad - da - ra", "He ordained (3-letter Shadd verb)", "اس نے اندازہ مقرر کیا", "هغه اندازه مقرر کړه", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How many times is a letter with Shadd ( ـّ ) pronounced?",
                    "شد ( ـّ ) والا حرف کتنی بار پڑھا جاتا ہے؟",
                    "د شد ( ـّ ) لرونکی توری څو ځله لوستل کېږي؟",
                    "رَبَّ = رَبْ + بَ",
                    listOf("Twice (دو بار)", "Once (ایک بار)", "Silent (خاموش)"),
                    0
                ),
                NazeraQuizQuestion(
                    "How is 'رَبِّ' pronounced?",
                    "لفظ 'رَبِّ' کا درست تلفظ کیا ہے؟",
                    "د 'رَبِّ' سم تلفظ څه دی؟",
                    "رَبِّ",
                    listOf("Rab - bi", "Ra - bi", "Ru - bi"),
                    0
                )
            )
        ),

        // LESSON 7 (Page 28-29): Khari Zabar, Khari Zer, Ulta Pesh (کھڑی حرکات)
        NazeraStageData(
            id = 7,
            lessonNumber = "سبق 7 • Lesson 7",
            pageRange = "Pages 28–29",
            titleArabic = "کھڑی زبر (ـٰ) • کھڑی زیر (ـٖ) • الٹا پیش (ـٗ)",
            titleEn = "Standing Harkaat (Khari Zabar, Zer, Ulta Pesh)",
            titleUr = "کھڑی زبر، کھڑی زیر اور الٹا پیش",
            titlePs = "ولاړ زبر، ولاړ زېر او سرچپه پېښ",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF075985),
            gameType = NazeraGameType.HARKAAT_SOUND_BUILDER,
            ruleEn = "Khari Zabar (ـٰ), Khari Zer (ـٖ), and Ulta Pesh (ـٗ) are stretched equal to ONE Alif (2 counts), just like Maddah letters!",
            ruleUr = "کھڑی زبر (ـٰ)، کھڑی زیر (ـٖ) اور الٹا پیش (ـٗ) کو ایک الف کے برابر کھینچ کر پڑھا جاتا ہے، جیسے: آدَمَ، ہٰذَا، لَہٗ۔",
            rulePs = "ولاړ زبر (ـٰ)، ولاړ زېر (ـٖ) او سرچپه پېښ (ـٗ) د یو الف په اندازه اوږد لوستل کېږي، لکه: آدَمَ، ہٰذَا، لَہٗ.",
            gameInstructionEn = "Stretch for 1 Alif! Tap the word that matches the Standing Harkat sound!",
            gameInstructionUr = "ایک الف کے برابر کھینچ کر پڑھیں! درست کھڑی حرکت والے لفظ کو ٹیپ کریں!",
            gameInstructionPs = "د یو الف په اندازه یې اوږد کړئ! سمه کلیمه ووهئ!",
            cards = listOf(
                NazeraFlashCard("بٰ   تٰ   ثٰ", "Baa • Taa • Thaa", "Khari Zabar = Stretch 1 Alif", "کھڑی زبر کو ایک الف کے برابر کھینچیں", "ولاړ زبر د یو الف په اندازه اوږد کړئ", Color(0xFF0284C7)),
                NazeraFlashCard("ہٰذَا", "Haa - Zaa", "This (Haa with Khari Zabar)", "یہ (ہا پر کھڑی زبر)", "دا (په ها باندې ولاړ زبر)", Color(0xFF059669)),
                NazeraFlashCard("ذٰلِکَ", "Zaa - Li - Ka", "That (Zaal with Khari Zabar)", "وہ (ذال پر کھڑی زبر)", "هغه (په ذال باندې ولاړ زبر)", Color(0xFF7C3AED)),
                NazeraFlashCard("بِہٖ", "Bi - Hii", "With him (Haa with Khari Zer)", "اس کے ساتھ (ہا کے نیچے کھڑی زیر)", "له هغه سره (په ها لاندې ولاړ زېر)", Color(0xFFD97706)),
                NazeraFlashCard("لَہٗ", "La - Huu", "For him (Haa with Ulta Pesh)", "اس کے لیے (ہا پر الٹا پیش)", "د هغه لپاره (په ها باندې سرچپه پېښ)", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How much do we stretch Khari Zabar (ـٰ) or Ulta Pesh (ـٗ)?",
                    "کھڑی زبر، کھڑی زیر اور الٹا پیش کو کتنا کھینچ کر پڑھتے ہیں؟",
                    "ولاړ زبر، ولاړ زېر او سرچپه پېښ څومره اوږد لوستل کېږي؟",
                    "ہٰذَا • بِہٖ • لَہٗ",
                    listOf("Equal to 1 Alif (ایک الف کے برابر)", "Do not stretch at all", "Stretch 5 Alifs"),
                    0
                )
            )
        ),

        // LESSON 8 (Page 30-31): Alif Maddah (الف مدہ)
        NazeraStageData(
            id = 8,
            lessonNumber = "سبق 8 • Lesson 8",
            pageRange = "Pages 30–31",
            titleArabic = "حُرُوفِ مَدَّہ: اَلِف مَدَّہ ( ـَا )",
            titleEn = "Alif Maddah ( ـَا )",
            titleUr = "الف مدّہ (زبر کے بعد خالی الف)",
            titlePs = "الف مده (له زبر وروسته تش الف)",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF115E59),
            gameType = NazeraGameType.MADDAH_LEEN_STRETCHER,
            ruleEn = "When an empty Alif (ا) comes after a Zabar (ـَ), it is called 'Alif Maddah'. Stretch the sound smoothly for 1 Alif (e.g., بَا، تَا، قَالَ).",
            ruleUr = "جب خالی الف (ا) سے پہلے والے حرف پر زبر (ـَ) ہو تو اسے 'الف مدّہ' کہتے ہیں۔ اسے ایک الف کی مقدار کھینچ کر پڑھتے ہیں، جیسے: بَا، قَالَ، کَانَ۔",
            rulePs = "کله چې له تش الف (ا) څخه مخکې توري باندې زبر (ـَ) وي، هغې ته 'الف مده' وایي. دا د یو الف په اندازه اوږد لوستل کېږي، لکه: بَا، قَالَ، کَانَ.",
            gameInstructionEn = "Tap the glowing Wave Orbs to stretch the Alif Maddah words for 1 Alif!",
            gameInstructionUr = "الف مدّہ کے الفاظ کو ایک الف کے برابر کھینچ کر پڑھنے کے لیے روشن دائروں کو ٹیپ کریں!",
            gameInstructionPs = "د الف مده کلیمو د اوږد لوستلو لپاره روښانه دایرې ووهئ!",
            cards = listOf(
                NazeraFlashCard("بَا   تَا   ثَا", "Baa • Taa • Thaa", "Zabar + Empty Alif = Alif Maddah", "زبر کے بعد الف = الف مدہ", "له زبر وروسته الف = الف مده", Color(0xFF0D9488)),
                NazeraFlashCard("قَالَ", "Qaa - La", "He said (Stretch Qaa for 1 Alif)", "اس نے کہا (قا کو ایک الف کھینچیں)", "هغه وویل (قا د یو الف په اندازه اوږد کړئ)", Color(0xFF2563EB)),
                NazeraFlashCard("کَانَ", "Kaa - Na", "He was", "وہ تھا", "هغه و", Color(0xFF7C3AED)),
                NazeraFlashCard("خَافَ", "Khaa - Fa", "He feared", "وہ ڈرا", "هغه ووېرېد", Color(0xFFD97706)),
                NazeraFlashCard("نَارٌ", "Naa - Run", "Fire", "آگ", "اور", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "When does Alif become 'Alif Maddah'?",
                    "الف 'الف مدّہ' کب بنتا ہے؟",
                    "الف کله 'الف مده' کېږي؟",
                    "قَالَ • کَانَ",
                    listOf("When Zabar comes before empty Alif (زبر کے بعد الف ہو)", "When Zer comes before Alif", "When Pesh comes before Alif"),
                    0
                )
            )
        ),

        // LESSON 9 (Page 32-33): Yaa Maddah (یائے مدہ)
        NazeraStageData(
            id = 9,
            lessonNumber = "سبق 9 • Lesson 9",
            pageRange = "Pages 32–33",
            titleArabic = "حُرُوفِ مَدَّہ: یَائے مَدَّہ ( ـِیْ )",
            titleEn = "Yaa Maddah ( ـِیْ )",
            titleUr = "یائے مدّہ (زیر کے بعد یا ساکن)",
            titlePs = "یای مده (له زېر وروسته یا ساکن)",
            themeColor = Color(0xFF6366F1),
            secondaryColor = Color(0xFF3730A3),
            gameType = NazeraGameType.MADDAH_LEEN_STRETCHER,
            ruleEn = "When Yaa Sakin (یْ) comes after a Zer (ـِ), it is called 'Yaa Maddah'. Stretch it equal to 1 Alif (e.g., بِیْ، فِیْ، دِیْنِ).",
            ruleUr = "جب یا ساکن (یْ) سے پہلے حرف کے نیچے زیر (ـِ) ہو تو اسے 'یائے مدّہ' کہتے ہیں۔ اسے ایک الف کے برابر کھینچ کر پڑھتے ہیں، جیسے: بِیْ، فِیْ، دِیْنِ۔",
            rulePs = "کله چې له یا ساکن (یْ) څخه مخکې توري لاندې زېر (ـِ) وي، هغې ته 'یای مده' وایي. دا د یو الف په اندازه اوږد لوستل کېږي، لکه: بِیْ، فِیْ، دِیْنِ.",
            gameInstructionEn = "Tap the glowing Wave Orbs to stretch each Yaa Maddah word (Bii, Fii, Diini)!",
            gameInstructionUr = "یائے مدّہ والے الفاظ کو ایک الف کھینچ کر پڑھنے کے لیے موج کے دائروں کو ٹیپ کریں!",
            gameInstructionPs = "د یای مده کلیمو د لوستلو لپاره روښانه دایرې ووهئ!",
            cards = listOf(
                NazeraFlashCard("بِیْ   تِیْ   ثِیْ", "Bii • Tii • Thii", "Zer + Yaa Sakin = Yaa Maddah", "زیر کے بعد یا ساکن = یائے مدہ", "له زېر وروسته یا ساکن = یای مده", Color(0xFF6366F1)),
                NazeraFlashCard("فِیْ", "Fii", "In (Stretch Fii for 1 Alif)", "میں (فِیْ کو ایک الف کھینچیں)", "کې (فِیْ د یو الف په اندازه اوږد کړئ)", Color(0xFF0284C7)),
                NazeraFlashCard("دِیْنِ", "Dii - Ni", "Religion / Judgment", "دین / بدلے کا دن", "دین / د بدلې ورځ", Color(0xFF059669)),
                NazeraFlashCard("قِیْلَ", "Qii - La", "It was said", "کہا گیا", "وویل شول", Color(0xFFD97706)),
                NazeraFlashCard("سَبِیْلِ", "Sa - Bii - Li", "Path / Way", "راستہ", "لاره", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What comes before Yaa Sakin (یْ) in Yaa Maddah?",
                    "یائے مدّہ میں یا ساکن (یْ) سے پہلے کون سی حرکت آتی ہے؟",
                    "په یای مده کې له یا ساکن (یْ) څخه مخکې کوم حرکت راځي؟",
                    "بِیْ • دِیْنِ",
                    listOf("Zer (زیر ـِ)", "Zabar (زبر ـَ)", "Pesh (پیش ـُ)"),
                    0
                )
            )
        ),

        // LESSON 10 (Page 34-35): Waw Maddah (واؤ مدہ)
        NazeraStageData(
            id = 10,
            lessonNumber = "سبق 10 • Lesson 10",
            pageRange = "Pages 34–35",
            titleArabic = "حُرُوفِ مَدَّہ: وَاؤ مَدَّہ ( ـُوْ )",
            titleEn = "Waw Maddah ( ـُوْ )",
            titleUr = "واؤ مدّہ (پیش کے بعد واؤ ساکن)",
            titlePs = "واو مده (له پېښ وروسته واو ساکن)",
            themeColor = Color(0xFF0891B2),
            secondaryColor = Color(0xFF155E75),
            gameType = NazeraGameType.MADDAH_LEEN_STRETCHER,
            ruleEn = "When Waw Sakin (وْ) comes after a Pesh (ـُ), it is called 'Waw Maddah'. Stretch it equal to 1 Alif with rounded lips (e.g., بُوْ، نُوْحِیْہَا، یَقُوْلُ).",
            ruleUr = "جب واؤ ساکن (وْ) سے پہلے حرف پر پیش (ـُ) ہو تو اسے 'واؤ مدّہ' کہتے ہیں۔ اسے ہونٹ گول کر کے ایک الف کے برابر کھینچ کر پڑھتے ہیں، جیسے: بُوْ، یَقُوْلُ، تُوْبُوْا۔",
            rulePs = "کله چې له واو ساکن (وْ) څخه مخکې توري باندې پېښ (ـُ) وي، هغې ته 'واو مده' وایي. دا د یو الف په اندازه اوږد لوستل کېږي، لکه: بُوْ، یَقُوْلُ.",
            gameInstructionEn = "Tap the glowing Wave Orbs to practice Waw Maddah (Buu, Tuu, Yaquulu)!",
            gameInstructionUr = "واؤ مدّہ کے الفاظ کو ہونٹ گول کر کے ایک الف کھینچ کر پڑھنے کے لیے ٹیپ کریں!",
            gameInstructionPs = "د واو مده کلیمو د لوستلو لپاره روښانه دایرې ووهئ!",
            cards = listOf(
                NazeraFlashCard("بُوْ   تُوْ   ثُوْ", "Buu • Tuu • Thuu", "Pesh + Waw Sakin = Waw Maddah", "پیش کے بعد واؤ ساکن = واؤ مدہ", "له پېښ وروسته واو ساکن = واو مده", Color(0xFF0891B2)),
                NazeraFlashCard("نُوْرٌ", "Nuu - Run", "Light", "روشنی / نور", "رڼا / نور", Color(0xFF059669)),
                NazeraFlashCard("یَقُوْلُ", "Ya - Quu - Lu", "He says", "وہ کہتا ہے", "هغه وایي", Color(0xFF7C3AED)),
                NazeraFlashCard("سُوْرَۃٌ", "Suu - Ra - Tun", "Chapter of Quran", "قرآن کی سورت", "د قرآن سورت", Color(0xFFD97706)),
                NazeraFlashCard("نُوْحِیْہَا", "Nuu - Hii - Haa", "All 3 Maddah letters in 1 word!", "ایک لفظ میں تینوں حروفِ مدّہ (واؤ، یا، الف)!", "په یوه کلیمه کې درې واړه حروف مده!", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Which famous Quranic word gathers all three Maddah letters (Waw, Yaa, Alif)?",
                    "کس مشہور قرآنی لفظ میں تینوں حروفِ مدّہ (واؤ، یا، الف) جمع ہیں؟",
                    "په کومه مشهوره قرآني کلیمه کې درې واړه حروف مده راغلي دي؟",
                    "ـُوْ + ـِیْ + ـَا",
                    listOf("نُوْحِیْہَا (Nuu-Hii-Haa)", "کَتَبَ (Ka-Ta-Ba)", "قُلْ (Qul)"),
                    0
                )
            )
        ),

        // LESSON 11 (Page 36-37): Waw Leen (واؤ لین)
        NazeraStageData(
            id = 11,
            lessonNumber = "سبق 11 • Lesson 11",
            pageRange = "Pages 36–37",
            titleArabic = "حُرُوفِ لِین: وَاؤ لِین ( ـَوْ )",
            titleEn = "Waw Leen ( ـَوْ )",
            titleUr = "واؤ لین (زبر کے بعد واؤ ساکن)",
            titlePs = "واو لین (له زبر وروسته واو ساکن)",
            themeColor = Color(0xFFD97706),
            secondaryColor = Color(0xFF92400E),
            gameType = NazeraGameType.MADDAH_LEEN_STRETCHER,
            ruleEn = "When Waw Sakin (وْ) comes after a Zabar (ـَ), it is called 'Waw Leen'. Read it SOFTLY and quickly without stretching (e.g., بَوْ، خَوْفٌ، یَوْمَ).",
            ruleUr = "جب واؤ ساکن (وْ) سے پہلے حرف پر زبر (ـَ) ہو تو اسے 'واؤ لین' کہتے ہیں۔ اسے بغیر کھینچے نرمی اور آسانی سے ادا کیا جاتا ہے، جیسے: بَوْ، خَوْفٌ، یَوْمَ۔",
            rulePs = "کله چې له واو ساکن (وْ) څخه مخکې توري باندې زبر (ـَ) وي، هغې ته 'واو لین' وایي. دا پرته له اوږدولو په نرمۍ سره لوستل کېږي، لکه: بَوْ، خَوْفٌ، یَوْمَ.",
            gameInstructionEn = "Soft Sound! Tap the feather crystals to pronounce Waw Leen softly (Baw, Yawma, Khawfun)!",
            gameInstructionUr = "نرم آواز! واؤ لین کے الفاظ کو بغیر کھینچے نرمی سے پڑھنے کے لیے ٹیپ کریں!",
            gameInstructionPs = "نرم غږ! د واو لین کلیمې په نرمۍ سره د لوستلو لپاره ووهئ!",
            cards = listOf(
                NazeraFlashCard("بَوْ   تَوْ   ثَوْ", "Baw • Taw • Thaw", "Zabar + Waw Sakin = Waw Leen (Soft)", "زبر کے بعد واؤ ساکن = واؤ لین (نرمی سے)", "له زبر وروسته واو ساکن = واو لین", Color(0xFFD97706)),
                NazeraFlashCard("یَوْمَ", "Yaw - Ma", "Day (as in Yawmid-Deen)", "دن (جیسے یَوْمِ الدِّیْن)", "ورځ (لکه یَوْمِ الدِّیْن)", Color(0xFF2563EB)),
                NazeraFlashCard("خَوْفٌ", "Khaw - Fun", "Fear (Surah Quraish)", "خوف / ڈر", "وېره / خوف", Color(0xFF059669)),
                NazeraFlashCard("قَوْمٌ", "Qaw - Mun", "Nation / People", "قوم", "قوم / خلک", Color(0xFF7C3AED)),
                NazeraFlashCard("فَوْقَ", "Faw - Qa", "Above", "اوپر", "پورته / دپاسه", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How is Waw Leen (ـَوْ) pronounced?",
                    "واؤ لین (ـَوْ) کو کیسے پڑھا جاتا ہے؟",
                    "واو لین (ـَوْ) څنګه لوستل کېږي؟",
                    "یَوْمَ • خَوْفٌ",
                    listOf("Softly without stretching (نرمی سے بغیر کھینچے)", "Stretched for 4 Alifs", "With nasal Ghunna"),
                    0
                )
            )
        ),

        // LESSON 12 (Page 38-39): Yaa Leen (یائے لین)
        NazeraStageData(
            id = 12,
            lessonNumber = "سبق 12 • Lesson 12",
            pageRange = "Pages 38–39",
            titleArabic = "حُرُوفِ لِین: یَائے لِین ( ـَیْ )",
            titleEn = "Yaa Leen ( ـَیْ )",
            titleUr = "یائے لین (زبر کے بعد یا ساکن)",
            titlePs = "یای لین (له زبر وروسته یا ساکن)",
            themeColor = Color(0xFF9333EA),
            secondaryColor = Color(0xFF581C87),
            gameType = NazeraGameType.MADDAH_LEEN_STRETCHER,
            ruleEn = "When Yaa Sakin (یْ) comes after a Zabar (ـَ), it is called 'Yaa Leen'. Read it softly without stretching (e.g., بَیْ، بَیْتٌ، قُرَیْشٍ).",
            ruleUr = "جب یا ساکن (یْ) سے پہلے حرف پر زبر (ـَ) ہو تو اسے 'یائے لین' کہتے ہیں۔ اسے بغیر کھینچے نرمی سے پڑھا جاتا ہے، جیسے: بَیْ، بَیْتٌ، قُرَیْشٍ، صَیْفٍ۔",
            rulePs = "کله چې له یا ساکن (یْ) څخه مخکې توري باندې زبر (ـَ) وي، هغې ته 'یای لین' وایي. دا پرته له اوږدولو په نرمۍ سره لوستل کېږي، لکه: بَیْ، بَیْتٌ، قُرَیْشٍ.",
            gameInstructionEn = "Tap the soft feather badges to pronounce Yaa Leen words (Baytun, Qurayshin, Sayfin)!",
            gameInstructionUr = "یائے لین والے الفاظ کو نرمی سے ادا کرنے کے لیے کارڈز کو ٹیپ کریں!",
            gameInstructionPs = "د یای لین کلیمې په نرمۍ سره د لوستلو لپاره ووهئ!",
            cards = listOf(
                NazeraFlashCard("بَیْ   تَیْ   ثَیْ", "Bay • Tay • Thay", "Zabar + Yaa Sakin = Yaa Leen", "زبر کے بعد یا ساکن = یائے لین", "له زبر وروسته یا ساکن = یای لین", Color(0xFF9333EA)),
                NazeraFlashCard("بَیْتٌ", "Bay - Tun", "House (House of Allah)", "گھر (بیت اللہ)", "کور (بیت الله)", Color(0xFF0284C7)),
                NazeraFlashCard("قُرَیْشٍ", "Qu - Ray - Shin", "Tribe of Quraish", "قبیلہ قریش", "د قریشو قبیله", Color(0xFF059669)),
                NazeraFlashCard("صَیْفٍ", "Say - Fin", "Summer", "گرمی کا موسم", "د اوړي موسم", Color(0xFFD97706)),
                NazeraFlashCard("عَیْنٌ", "Ay - Nun", "Eye / Spring", "آنکھ / چشمہ", "سترګه / چینه", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What is the difference between Yaa Maddah (بِیْ) and Yaa Leen (بَیْ)?",
                    "یائے مدّہ (بِیْ) اور یائے لین (بَیْ) میں کیا فرق ہے؟",
                    "د یای مده (بِیْ) او یای لین (بَیْ) ترمنځ څه توپیر دی؟",
                    "بِیْ  vs  بَیْ",
                    listOf("Yaa Leen has Zabar before یْ; Yaa Maddah has Zer", "Both have Pesh", "There is no difference"),
                    0
                )
            )
        ),

        // LESSON 13 (Page 40-41): Tanween Do Zabar (دو زبر ـً)
        NazeraStageData(
            id = 13,
            lessonNumber = "سبق 13 • Lesson 13",
            pageRange = "Pages 40–41",
            titleArabic = "تَنْوِین: دُو زَبَر ( ـً )",
            titleEn = "Tanween: Do Zabar ( ـً )",
            titleUr = "تنوین: دو زبر ( ـً )",
            titlePs = "تنوین: دوه زبره ( ـً )",
            themeColor = Color(0xFF16A34A),
            secondaryColor = Color(0xFF14532D),
            gameType = NazeraGameType.TANWEEN_GHUNNA_CATCHER,
            ruleEn = "Do Zabar (ـً), Do Zer (ـٍ), and Do Pesh (ـٌ) are called 'Tanween'. Tanween produces a hidden Noon Sakin (نْ) sound at the end (e.g., بًا = Ban, اَحَدًا = Ahadan).",
            ruleUr = "دو زبر (ـً)، دو زیر (ـٍ) اور دو پیش (ـٌ) کو 'تنوین' کہتے ہیں۔ تنوین میں نون ساکن (نْ) کی آواز چھپی ہوتی ہے، جیسے: بًا = بَنْ، اَحَدًا = اَحَدَنْ۔",
            rulePs = "دوه زبره (ـً)، دوه زېره (ـٍ) او دوه پېښه (ـٌ) ته 'تنوین' ویل کېږي. په تنوین کې د نون ساکن (نْ) غږ پټ وي، لکه: بًا = بَنْ، اَحَدًا.",
            gameInstructionEn = "Catch the Tanween! Match the Do Zabar ( ـً ) Arabic word with its '-an' sound!",
            gameInstructionUr = "تنوین پکڑیں! دو زبر ( ـً ) والے عربی لفظ کو اس کی درست 'ـَنْ' آواز سے ملائیں!",
            gameInstructionPs = "تنوین ونیسئ! د دوه زبره ( ـً ) عربي کلیمه له سم غږ سره وصل کړئ!",
            cards = listOf(
                NazeraFlashCard("بًا   تًا   ثًا", "Ban • Tan • Than", "Do Zabar gives '-an' sound", "دو زبر میں نون ساکن (ـَنْ) کی آواز ہے", "په دوه زبره کې د نون ساکن غږ دی", Color(0xFF16A34A)),
                NazeraFlashCard("اَبَدًا", "A - Ba - Dan", "Forever", "ہمیشہ", "تل / همېشه", Color(0xFF0284C7)),
                NazeraFlashCard("اَحَدًا", "A - Ha - Dan", "Anyone / One", "کوئی ایک", "یو څوک", Color(0xFF7C3AED)),
                NazeraFlashCard("عَمَلًا", "A - Ma - Lan", "Deed / Work", "عمل / کام", "عمل / کار", Color(0xFFD97706)),
                NazeraFlashCard("حَسَنًا", "Ha - Sa - Nan", "Good / Beautiful", "اچھا / بہترین", "ښه / ښکلی", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Which hidden letter's sound is heard inside Tanween (ـً ـٍ ـٌ)?",
                    "تنوین (دو زبر، دو زیر، دو پیش) میں کس حرف کی آواز چھپی ہوتی ہے؟",
                    "په تنوین کې د کوم توري غږ پټ وي؟",
                    "بًا = بَنْ",
                    listOf("Noon Sakin (نون ساکن نْ)", "Meem Sakin (مْ)", "Laam Sakin (لْ)"),
                    0
                )
            )
        ),

        // LESSON 14 (Page 42-43): Tanween Do Zer (دو زیر ـٍ)
        NazeraStageData(
            id = 14,
            lessonNumber = "سبق 14 • Lesson 14",
            pageRange = "Pages 42–43",
            titleArabic = "تَنْوِین: دُو زِیر ( ـٍ )",
            titleEn = "Tanween: Do Zer ( ـٍ )",
            titleUr = "تنوین: دو زیر ( ـٍ )",
            titlePs = "تنوین: دوه زېره ( ـٍ )",
            themeColor = Color(0xFF2563EB),
            secondaryColor = Color(0xFF1E3A8A),
            gameType = NazeraGameType.TANWEEN_GHUNNA_CATCHER,
            ruleEn = "Do Zer ( ـٍ ) is placed below the last letter of a word and gives an '-in' sound (e.g., بٍ = Bin, لَہَبٍ = Lahabin, مَسَدٍ = Masadin).",
            ruleUr = "دو زیر ( ـٍ ) حرف کے نیچے آتی ہے اور اس کی آواز 'ـِنْ' نکلتی ہے، جیسے: بٍ = بِنْ، لَہَبٍ، مَسَدٍ، غَاسِقٍ۔",
            rulePs = "دوه زېره ( ـٍ ) د توري لاندې راځي او د 'ـِنْ' غږ ورکوي، لکه: بٍ = بِنْ، لَہَبٍ، مَسَدٍ.",
            gameInstructionEn = "Match each Do Zer ( ـٍ ) word with its '-in' pronunciation!",
            gameInstructionUr = "دو زیر ( ـٍ ) والے الفاظ کو ان کے درست تلفظ سے ملائیں!",
            gameInstructionPs = "د دوه زېره ( ـٍ ) کلیمې له سم تلفظ سره وصل کړئ!",
            cards = listOf(
                NazeraFlashCard("بٍ   تٍ   ثٍ", "Bin • Tin • Thin", "Do Zer gives '-in' sound", "دو زیر کی آواز: بِنْ، تِنْ، ثِنْ", "د دوه زېره غږ: بِنْ، تِنْ، ثِنْ", Color(0xFF2563EB)),
                NazeraFlashCard("لَہَبٍ", "La - Ha - Bin", "Flame (Surah Al-Lahab)", "شعلہ / آگ کا لپٹا", "د اور لمبه", Color(0xFFDC2626)),
                NazeraFlashCard("مَسَدٍ", "Ma - Sa - Din", "Twisted fiber / rope", "بٹی ہوئی رسی", "تاو شوی پړی", Color(0xFFD97706)),
                NazeraFlashCard("غَاسِقٍ", "Ghaa - Si - Qin", "Darkness of night (Surah Al-Falaq)", "اندھیری رات", "تیاره شپه", Color(0xFF7C3AED)),
                NazeraFlashCard("حَاسِدٍ", "Haa - Si - Din", "Envious person (Surah Al-Falaq)", "حسد کرنے والا", "حسد کوونکی", Color(0xFF059669))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How is the word 'مَسَدٍ' pronounced?",
                    "لفظ 'مَسَدٍ' کو کیسے پڑھیں گے؟",
                    "د 'مَسَدٍ' کلیمه څنګه لوستل کېږي؟",
                    "مَسَدٍ",
                    listOf("Ma - Sa - Din", "Ma - Sa - Dan", "Ma - Sa - Dun"),
                    0
                )
            )
        ),

        // LESSON 15 (Page 44-45): Tanween Do Pesh (دو پیش ـٌ)
        NazeraStageData(
            id = 15,
            lessonNumber = "سبق 15 • Lesson 15",
            pageRange = "Pages 44–45",
            titleArabic = "تَنْوِین: دُو پِیش ( ـٌ )",
            titleEn = "Tanween: Do Pesh ( ـٌ )",
            titleUr = "تنوین: دو پیش ( ـٌ )",
            titlePs = "تنوین: دوه پېښه ( ـٌ )",
            themeColor = Color(0xFFEA580C),
            secondaryColor = Color(0xFF9A3412),
            gameType = NazeraGameType.TANWEEN_GHUNNA_CATCHER,
            ruleEn = "Do Pesh ( ـٌ ) is placed above the letter and gives an '-un' sound with rounded lips (e.g., بٌ = Bun, اَحَدٌ = Ahadun, کُتُبٌ = Kutubun).",
            ruleUr = "دو پیش ( ـٌ ) حرف کے اوپر آتی ہے اور ہونٹ گول کر کے 'ـُنْ' کی آواز دیتی ہے، جیسے: بٌ = بُنْ، اَحَدٌ، کُتُبٌ۔",
            rulePs = "دوه پېښه ( ـٌ ) د توري دپاسه راځي او د 'ـُنْ' غږ ورکوي، لکه: بٌ = بُنْ، اَحَدٌ، کُتُبٌ.",
            gameInstructionEn = "Match each Do Pesh ( ـٌ ) word with its '-un' sound!",
            gameInstructionUr = "دو پیش ( ـٌ ) والے الفاظ کو ان کے درست تلفظ 'ـُنْ' سے ملائیں!",
            gameInstructionPs = "د دوه پېښه ( ـٌ ) کلیمې له سم غږ سره وصل کړئ!",
            cards = listOf(
                NazeraFlashCard("بٌ   تٌ   ثٌ", "Bun • Tun • Thun", "Do Pesh gives '-un' sound", "دو پیش کی آواز: بُنْ، تُنْ، ثُنْ", "د دوه پېښه غږ: بُنْ، تُنْ، ثُنْ", Color(0xFFEA580C)),
                NazeraFlashCard("اَحَدٌ", "A - Ha - Dun", "One (Qul Huwallahu Ahadun)", "ایک (سورۃ الاخلاص)", "یو (سورة الاخلاص)", Color(0xFF059669)),
                NazeraFlashCard("کُتُبٌ", "Ku - Tu - Bun", "Books", "کتابیں", "کتابونه", Color(0xFF2563EB)),
                NazeraFlashCard("رَسُوْلٌ", "Ra - Suu - Lun", "Messenger", "پیغمبر / رسول", "پیغمبر / رسول", Color(0xFF7C3AED)),
                NazeraFlashCard("عَلِیْمٌ", "A - Lii - Mun", "All-Knowing", "سب کچھ جاننے والا", "په هر څه پوه", Color(0xFF0D9488))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How is 'اَحَدٌ' pronounced when joining with the next Ayah?",
                    "لفظ 'اَحَدٌ' کو دو پیش کے ساتھ کیسے پڑھتے ہیں؟",
                    "د 'اَحَدٌ' کلیمه له دوه پېښه سره څنګه لوستل کېږي؟",
                    "اَحَدٌ",
                    listOf("A - Ha - Dun", "A - Ha - Dan", "A - Ha - Din"),
                    0
                )
            )
        ),

        // LESSON 16 (Page 46-55): Ghunna (غنّہ — نّ اور مّ)
        NazeraStageData(
            id = 16,
            lessonNumber = "سبق 16 • Lesson 16",
            pageRange = "Pages 46–55",
            titleArabic = "غُنَّہ ( نّ  اور  مّ )",
            titleEn = "Ghunna (Nasal Sound on نّ & مّ)",
            titleUr = "غنّہ (ناک میں آواز لے کر جانا — نّ، مّ)",
            titlePs = "غنه (په پوزه کې غږ وړل — نّ او مّ)",
            themeColor = Color(0xFFDB2777),
            secondaryColor = Color(0xFF831843),
            gameType = NazeraGameType.TANWEEN_GHUNNA_CATCHER,
            ruleEn = "Taking the sound into the nose is called 'Ghunna'. When Noon (نّ) or Meem (مّ) has a Shadd (ـّ), it is wajib (mandatory) to hold the nasal sound for 1 Alif!",
            ruleUr = "آواز کو ناک کے بانسے میں لے جانے کو 'غنّہ' کہتے ہیں۔ جب نون (نّ) یا میم (مّ) پر شد (ـّ) ہو تو ایک الف کی مقدار ناک میں آواز ٹھہرا کر غنّہ کرنا واجب ہے، جیسے: اِنَّ، عَمَّ، النَّاسِ۔",
            rulePs = "پوزه کې د غږ وړلو ته 'غنه' ویل کېږي. کله چې په نون (نّ) یا میم (مّ) باندې شد (ـّ) وي، د یو الف په اندازه غنه کول واجب دي، لکه: اِنَّ، عَمَّ، النَّاسِ.",
            gameInstructionEn = "Nasal Sound Challenge! Tap the word with Noon Mushaddad (نّ) or Meem Mushaddad (مّ) to perform Ghunna!",
            gameInstructionUr = "غنّہ چیلنج! نون مشدّد (نّ) اور میم مشدّد (مّ) والے الفاظ کو ان کے درست تلفظ سے ملائیں!",
            gameInstructionPs = "د غنې لوبه! د نون مشدد (نّ) او میم مشدد (مّ) کلیمې له سم غږ سره وصل کړئ!",
            cards = listOf(
                NazeraFlashCard("اِنَّ   اَنَّ", "In - na • An - na", "Noon Mushaddad (نّ) = Hold Ghunna", "نون مشدد (نّ) پر غنہ کریں", "په نون مشدد (نّ) باندې غنه وکړئ", Color(0xFFDB2777)),
                NazeraFlashCard("عَمَّ   ثُمَّ", "Am - ma • Thum - ma", "Meem Mushaddad (مّ) = Hold Ghunna", "میم مشدد (مّ) پر غنہ کریں", "په میم مشدد (مّ) باندې غنه وکړئ", Color(0xFF7C3AED)),
                NazeraFlashCard("جَنَّۃٌ", "Jan - na - tun", "Garden / Paradise", "جنت / باغ", "جنت / بڼ", Color(0xFF059669)),
                NazeraFlashCard("النَّاسِ", "An - Naa - Si", "Mankind (Surah An-Nas)", "لوگ / انسان (سورۃ الناس)", "خلک / انسانان (سورة الناس)", Color(0xFF0284C7)),
                NazeraFlashCard("اُمِّہٖ", "Um - mi - hii", "His mother", "اس کی ماں", "د هغه مور", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What does 'Ghunna' mean in Tajweed?",
                    "تجوید میں 'غنّہ' کسے کہتے ہیں؟",
                    "په تجوید کې 'غنه' څه ته وایي؟",
                    "نّ • مّ",
                    listOf("Taking the sound into the nose (ناک میں آواز لے جانا)", "Opening the mouth wide", "Reading silently"),
                    0
                ),
                NazeraQuizQuestion(
                    "On which two Mushaddad letters is Ghunna mandatory?",
                    "کن دو مشدّد حروف پر ہمیشہ غنّہ کیا جاتا ہے؟",
                    "په کومو دوو مشددو تورو باندې غنه واجب ده؟",
                    "اِنَّ • عَمَّ",
                    listOf("Noon (نّ) and Meem (مّ)", "Baa (بّ) and Taa (تّ)", "Ra (رّ) and Laam (لّ)"),
                    0
                )
            )
        ),

        // LESSON 17 (Page 56-62): Last 4 Surahs of the Holy Quran (قرآن مجید کی آخری سورتیں)
        NazeraStageData(
            id = 17,
            lessonNumber = "سبق 17 • Lesson 17",
            pageRange = "Pages 56–62",
            titleArabic = "قُرْآنِ مَجِید کِی آخِرِی سُورَتِیں",
            titleEn = "Last Surahs (Al-Lahab, Al-Ikhlas, Al-Falaq, An-Nas)",
            titleUr = "سورۃ اللہب، سورۃ الاخلاص، سورۃ الفلق، سورۃ الناس",
            titlePs = "د قرآن کریم وروستي سورتونه (اللهب، الاخلاص، الفلق، الناس)",
            themeColor = Color(0xFF059669),
            secondaryColor = Color(0xFF064E3B),
            gameType = NazeraGameType.SURAH_AYAH_BUILDER,
            ruleEn = "Recite the last Surahs of the Holy Quran with Tarteel, applying all Tajweed rules: Qalqalah, Maddah, Shadd, Tanween, and Ghunna on نّ/مّ.",
            ruleUr = "قرآن مجید کی آخری سورتوں (سورۃ اللہب، سورۃ الاخلاص، سورۃ الفلق اور سورۃ الناس) کو تمام قواعدِ تجوید (حرکات، مدہ، قلقلہ، شد اور غنہ) کے ساتھ ترتیل سے پڑھیں۔",
            rulePs = "د قرآن کریم وروستي سورتونه (سورة اللهب، سورة الاخلاص، سورة الفلق او سورة الناس) د تجوید له ټولو اصولو سره په ترتیل ولولئ.",
            gameInstructionEn = "Tap the blessed Ayahs of Surah Al-Ikhlas in the exact Quranic sequence from 1 to 4!",
            gameInstructionUr = "سورۃ الاخلاص کی مبارک آیات کو نمبر 1 سے 4 تک درست قرآنی ترتیب سے ٹیپ کریں!",
            gameInstructionPs = "د سورة الاخلاص مبارک آیتونه له ۱ څخه تر ۴ پورې په سم ترتیب سره ووهئ!",
            cards = listOf(
                NazeraFlashCard(
                    "قُلْ هُوَ اللّٰهُ أَحَدٌ ۝ اللّٰهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَّهُ كُفُوًا أَحَدٌ ۝",
                    "Surah Al-Ikhlas (4 Ayahs)",
                    "Say: He is Allah, the One. Allah, the Eternal Refuge...",
                    "سورۃ الاخلاص: کہو وہ اللہ ایک ہے، اللہ بے نیاز ہے...",
                    "سورة الاخلاص: ووایه هغه الله یو دی، الله بې نیازه دی...",
                    Color(0xFF059669)
                ),
                NazeraFlashCard(
                    "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ ۝",
                    "Surah Al-Falaq (5 Ayahs)",
                    "Say: I seek refuge in the Lord of daybreak...",
                    "سورۃ الفلق: کہو میں صبح کے رب کی پناہ مانگتا ہوں...",
                    "سورة الفلق: ووایه زه د سباوون د رب پناه غواړم...",
                    Color(0xFF0284C7)
                ),
                NazeraFlashCard(
                    "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ ۝",
                    "Surah An-Nas (6 Ayahs)",
                    "Say: I seek refuge in the Lord of mankind, the King of mankind...",
                    "سورۃ الناس: کہو میں انسانوں کے رب کی پناہ مانگتا ہوں (نّ پر غنہ کریں)...",
                    "سورة الناس: ووایه زه د انسانانو د رب پناه غواړم (په نّ باندې غنه وکړئ)...",
                    Color(0xFF7C3AED)
                ),
                NazeraFlashCard(
                    "تَبَّتْ يَدَا أَبِي لَهَبٍ وَّتَبَّ ۝ مَا أَغْنٰى عَنْهُ مَالُهُ وَمَا كَسَبَ ۝ سَيَصْلٰى نَارًا ذَاتَ لَهَبٍ ۝ وَّامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ ۝ فِي جِيدِهَا حَبْلٌ مِّنْ مَّسَدٍ ۝",
                    "Surah Al-Lahab (5 Ayahs)",
                    "Perished are the hands of Abu Lahab, and perished is he...",
                    "سورۃ اللہب (مکّی، 5 آیات) — شد اور تنوین کی بہترین مشق",
                    "سورة اللهب (مکي، ۵ آیتونه) — د شد او تنوین غوره مشق",
                    Color(0xFFD97706)
                )
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How many Ayahs are in Surah Al-Ikhlas?",
                    "سورۃ الاخلاص میں کل کتنی آیات ہیں؟",
                    "په سورة الاخلاص کې ټول څو آیتونه دي؟",
                    "قُلْ هُوَ اللّٰهُ أَحَدٌ ...",
                    listOf("4 Ayahs (4 آیات)", "5 Ayahs", "6 Ayahs"),
                    0
                ),
                NazeraQuizQuestion(
                    "In Surah An-Nas ('بِرَبِّ النَّاسِ'), which Tajweed rule applies on 'النَّاسِ'?",
                    "سورۃ الناس کے لفظ 'النَّاسِ' میں نون مشدّد (نّ) پر کون سا قاعدہ لاگو ہوتا ہے؟",
                    "د سورة الناس په 'النَّاسِ' کلیمه کې په نون مشدد (نّ) کومه قاعده ده؟",
                    "بِرَبِّ النَّاسِ",
                    listOf("Ghunna + Alif Maddah (غنّہ اور الف مدّہ)", "Waw Leen", "Khari Zer"),
                    0
                )
            )
        )
    )
}
