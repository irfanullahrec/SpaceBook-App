package com.example.spacebookapp.ui.screens

enum class ExplainLang(val label: String, val badge: String) {
    ENGLISH("English", "🇬🇧 English"),
    URDU("اردو", "🇵🇰 اردو"),
    PASHTO("پښتو", "🏳️ پښتو")
}

data class TrilingualText(
    val en: String,
    val ur: String,
    val ps: String
) {
    fun get(lang: ExplainLang): String = when (lang) {
        ExplainLang.ENGLISH -> en
        ExplainLang.URDU -> ur
        ExplainLang.PASHTO -> ps
    }
}

enum class ArcadeStageMechanic {
    PAGE2_OBJECT_BUBBLES,
    PAGE3_SKY_BALLOONS,
    PAGE4_LADYBUG_TRACE,
    PAGE5_TRAIN_PAINTER,
    PAGE6_MAGIC_WRITER,
    PAGE7_CATERPILLAR_APPLES,
    ROCKET_SHOOTER,
    MONKEY_FRUIT_CATCH,
    FROG_LILYPAD_HOP,
    TREASURE_CHEST_UNLOCK,
    RACE_TRACK_TURBO,
    RAINBOW_BRIDGE_BUILDER
}

data class ArcadeRoundItem(
    val promptEmoji: String,
    val promptTitle: String,
    val promptSub: TrilingualText,
    val correctAnswer: String,
    val options: List<String>,
    val voiceExplain: TrilingualText
)

data class LessonCardItem(
    val emoji: String,
    val titleEn: String,
    val subtitleEn: String,
    val explain: TrilingualText
)

data class ExerciseQuizItem(
    val emoji: String,
    val question: TrilingualText,
    val correctAnswer: String,
    val options: List<String>,
    val explain: TrilingualText
)

data class BookPageMeta(
    val pageNumber: Int,
    val pillLabel: String,
    val titleEn: String,
    val pageRangeText: String,
    val subtitle: TrilingualText,
    val gameBadge: String,
    val mechanic: ArcadeStageMechanic,
    val mascotEmoji: String,
    val rounds: List<ArcadeRoundItem> = emptyList(),
    val lessons: List<LessonCardItem> = emptyList(),
    val exercises: List<ExerciseQuizItem> = emptyList()
)

// ─── COMPLETE KPTBB GRADE 1 ENGLISH BOOK (20 STAGES: PAGES 2 TO 120) ───
val CLASS1_PAGES = listOf(
    // 1. Page 2 (Unit 1)
    BookPageMeta(
        pageNumber = 2,
        pillLabel = "U1 • Page 2",
        titleEn = "Unit 1 • Page 2: Getting Started",
        pageRangeText = "Page 2",
        subtitle = TrilingualText(
            en = "Look and say the names (cat, hen, hat, pot, net, sun, top, bed)",
            ur = "تصاویر دیکھیں اور ان کے نام بولیں (بلی، مرغی، ٹوپی، برتن، جال، سورج، لٹو، پلنگ)",
            ps = "انځورونو ته وګورئ او نومونه یې ووایاست (پیشو، چرګه، خولۍ، لوښی، جال، لمر، لاټو، کټ)"
        ),
        gameBadge = "🐝 Object Bubbles",
        mechanic = ArcadeStageMechanic.PAGE2_OBJECT_BUBBLES,
        mascotEmoji = "🐝"
    ),
    // 2. Page 3 (Unit 1)
    BookPageMeta(
        pageNumber = 3,
        pillLabel = "U1 • Page 3",
        titleEn = "Unit 1 • Page 3: Alphabet Sounds (Aa–Zz)",
        pageRangeText = "Page 3",
        subtitle = TrilingualText(
            en = "Read aloud the given letters and say their sounds (Aa to Zz)",
            ur = "دیے گئے حروف (Aa سے Zz تک) اونچی آواز میں پڑھیں اور ان کی آوازیں نکالیں",
            ps = "ورکړل شوي توري (Aa نه تر Zz پورې) په لوړ غږ ولولئ او غږونه یې ووایاست"
        ),
        gameBadge = "🎈 Balloon Pop",
        mechanic = ArcadeStageMechanic.PAGE3_SKY_BALLOONS,
        mascotEmoji = "🎈"
    ),
    // 3. Page 4 (Unit 1)
    BookPageMeta(
        pageNumber = 4,
        pillLabel = "U1 • Page 4",
        titleEn = "Unit 1 • Page 4: Flower Sounds & Line Tracing",
        pageRangeText = "Page 4",
        subtitle = TrilingualText(
            en = "Say the sounds of (z, d, h, t, l, n) & Trace the dotted lines in direction",
            ur = "پھولوں والے حروف کی آوازیں بولیں اور نقطے دار لکیروں کی سمت میں ہاتھ پھیریں",
            ps = "د ګلونو تورو غږونه ووایاست او په نقطو والو کرښو باندې د هغوی په لوري ګوته تېره کړئ"
        ),
        gameBadge = "🐞✏️ Ladybug Trace",
        mechanic = ArcadeStageMechanic.PAGE4_LADYBUG_TRACE,
        mascotEmoji = "🐞"
    ),
    // 4. Page 5 (Unit 1)
    BookPageMeta(
        pageNumber = 5,
        pillLabel = "U1 • Page 5",
        titleEn = "Unit 1 • Page 5: Wave Lines & Colour Train",
        pageRangeText = "Page 5",
        subtitle = TrilingualText(
            en = "Trace the wave lines and trace & colour the chugging train picture",
            ur = "لہر والی لکیروں پر ہاتھ پھیریں اور ریل گاڑی میں پیارے رنگ بھریں",
            ps = "څپو والو کرښو باندې لاس تېر کړئ او اورګاډی رنګ کړئ"
        ),
        gameBadge = "🚂🎨 Train Painter",
        mechanic = ArcadeStageMechanic.PAGE5_TRAIN_PAINTER,
        mascotEmoji = "🚂"
    ),
    // 5. Page 6 (Unit 1)
    BookPageMeta(
        pageNumber = 6,
        pillLabel = "U1 • Page 6",
        titleEn = "Unit 1 • Page 6: Trace & Copy Aa to Zz",
        pageRangeText = "Page 6",
        subtitle = TrilingualText(
            en = "Trace and copy the capital and small letters on 4-line notebook rows",
            ur = "چار لکیروں پر بڑے (Capital) اور چھوٹے (Small) حروف لکھنے کی مشق کریں",
            ps = "په څلورو کرښو کې غټ (Capital) او واړه (Small) توري ولیکئ"
        ),
        gameBadge = "✍️ Magic Writer",
        mechanic = ArcadeStageMechanic.PAGE6_MAGIC_WRITER,
        mascotEmoji = "✍️"
    ),
    // 6. Page 7 (Unit 1)
    BookPageMeta(
        pageNumber = 7,
        pillLabel = "U1 • Page 7",
        titleEn = "Unit 1 • Page 7: Alphabet Order & Before/After",
        pageRangeText = "Page 7",
        subtitle = TrilingualText(
            en = "Write A–Z in alphabetical order & Find letters before or after",
            ur = "حروف تہجی (A سے Z) ترتیب سے لکھیں اور پہلے یا بعد والا حرف بتائیں",
            ps = "غټ توري (A-Z) په ترتیب ولیکئ او مخکینی یا وروستنی توری وښایاست"
        ),
        gameBadge = "🍎🐛 Apple Tree",
        mechanic = ArcadeStageMechanic.PAGE7_CATERPILLAR_APPLES,
        mascotEmoji = "🐛"
    ),

    // 7. Unit 2: My Family and I (Pages 8–18)
    BookPageMeta(
        pageNumber = 8,
        pillLabel = "Unit 2 • Family",
        titleEn = "Unit 2 (Pages 8–18): My Family and I",
        pageRangeText = "Pages 8–18",
        subtitle = TrilingualText(
            en = "Meet Saad's family, Number words (one–ten), Nouns & Pronouns (He, She, It, They)",
            ur = "سعد کے خاندان سے ملیں، گنتی کے الفاظ (one سے ten)، اسم (Nouns) اور ضمیر (He, She, It, They) سیکھیں",
            ps = "د سعد له کورنۍ سره وګورئ، د شمېرو توري (one-ten)، نومونه (Nouns) او ضمیرونه زده کړئ"
        ),
        gameBadge = "🚀 Family Rocket",
        mechanic = ArcadeStageMechanic.ROCKET_SHOOTER,
        mascotEmoji = "🚀",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "👦⚽",
                promptTitle = "Saad's Age",
                promptSub = TrilingualText(
                    en = "How many years old is Saad in Class 1?",
                    ur = "پہلی جماعت میں پڑھنے والا سعد کتنے سال کا ہے؟",
                    ps = "سعد په لومړي ټولګي کې د څو کلونو دی؟"
                ),
                correctAnswer = "six (6)",
                options = listOf("six (6)", "four (4)", "ten (10)"),
                voiceExplain = TrilingualText(
                    en = "Saad says: I am six years old and I read in Class One!",
                    ur = "سعد کہتا ہے: میری عمر چھ (six) سال ہے اور میں پہلی جماعت میں پڑھتا ہوں!",
                    ps = "سعد وایي: زه د شپږو (six) کلونو یم او په لومړي ټولګي کې لولم!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👵📖",
                promptTitle = "Bedtime Stories",
                promptSub = TrilingualText(
                    en = "Who tells Saad bedtime stories at night?",
                    ur = "رات کو سوتے وقت سعد کو کہانیاں کون سناتا ہے؟",
                    ps = "د شپې سعد ته کیسې څوک کوي؟"
                ),
                correctAnswer = "Granny",
                options = listOf("Granny", "Brother", "Doctor"),
                voiceExplain = TrilingualText(
                    en = "Saad's Granny tells wonderful bedtime stories!",
                    ur = "سعد کی دادی اماں (Granny) رات کو مزے دار کہانیاں سناتی ہیں!",
                    ps = "د سعد نیا (Granny) د شپې خوندورې کیسې کوي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🦜💚",
                promptTitle = "Pronoun for Mithu",
                promptSub = TrilingualText(
                    en = "Mithu is a parrot. ___ is green.",
                    ur = "مٹھو ایک طوطا ہے۔ ___ سبز رنگ کا ہے۔",
                    ps = "میتو یو طوطي دی. ___ شین رنګ لري."
                ),
                correctAnswer = "It",
                options = listOf("It", "She", "We"),
                voiceExplain = TrilingualText(
                    en = "We use the pronoun 'It' for animals and things! It is green.",
                    ur = "جانوروں، پرندوں اور بے جان چیزوں کے لیے 'It' استعمال ہوتا ہے!",
                    ps = "د مرغانو، څارویو او شیانو لپاره 'It' کارول کیږي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👧🎒",
                promptTitle = "Pronoun for Sidra",
                promptSub = TrilingualText(
                    en = "Sidra is a girl. ___ is my friend.",
                    ur = "سدرہ ایک لڑکی ہے۔ ___ میری دوست ہے۔",
                    ps = "سدره یوه نجلۍ ده. ___ زما ملګرې ده."
                ),
                correctAnswer = "She",
                options = listOf("She", "He", "They"),
                voiceExplain = TrilingualText(
                    en = "We use 'She' for a girl or woman! She is my friend.",
                    ur = "لڑکی کے لیے 'She' استعمال ہوتا ہے! She is my friend.",
                    ps = "د نجلۍ لپاره 'She' کارول کیږي! She is my friend."
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🚂🛤️",
                promptTitle = "Missing Letter",
                promptSub = TrilingualText(
                    en = "Complete the word: t r _ i n",
                    ur = "خالی جگہ پر کر کے لفظ مکمل کریں: t r _ i n (ریل گاڑی)",
                    ps = "تش ځای ډک کړئ: t r _ i n (اورګاډی)"
                ),
                correctAnswer = "train",
                options = listOf("train", "truin", "troin"),
                voiceExplain = TrilingualText(
                    en = "T - R - A - I - N spells train!",
                    ur = "T - R - A - I - N سے بنتا ہے Train یعنی ریل گاڑی!",
                    ps = "T - R - A - I - N نه جوړیږي Train یعنی اورګاډی!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🔢7️⃣",
                promptTitle = "Number Word 7",
                promptSub = TrilingualText(
                    en = "How do we spell the number 7 in words?",
                    ur = "نمبر 7 کو انگریزی الفاظ میں کیسے لکھتے ہیں؟",
                    ps = "د 7 شمېره په انګلیسي تورو کې څنګه لیکل کیږي؟"
                ),
                correctAnswer = "seven",
                options = listOf("seven", "six", "nine"),
                voiceExplain = TrilingualText(
                    en = "S - E - V - E - N spells seven (7)!",
                    ur = "S - E - V - E - N سے بنتا ہے Seven یعنی سات (7)!",
                    ps = "S - E - V - E - N نه جوړیږي Seven یعنی اووه (7)!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "👨‍👩‍👧‍👦",
                titleEn = "Saad's Family Story",
                subtitleEn = "My name is Saad. I am six years old. I read in Class 1.",
                explain = TrilingualText(
                    en = "Saad lives in a village with his father, mother, grandpa, granny, two brothers and a sister.",
                    ur = "سعد ایک گاؤں میں اپنے ابو، امی، دادا، دادی، دو بھائیوں اور ایک بہن کے ساتھ رہتا ہے۔",
                    ps = "سعد په یوه کلي کې له خپل پلار، مور، نیکه، نیا، دوه وروڼو او یوې خور سره اوسیږي."
                )
            ),
            LessonCardItem(
                emoji = "🔢",
                titleEn = "Number Words (1 to 10)",
                subtitleEn = "one, two, three, four, five, six, seven, eight, nine, ten",
                explain = TrilingualText(
                    en = "Learn to count and spell from one (1) to ten (10)!",
                    ur = "ایک (one) سے دس (ten) تک انگریزی میں گنتی اور ہجے یاد کریں!",
                    ps = "له یو (one) نه تر لسو (ten) پورې په انګلیسي کې شمېرل زده کړئ!"
                )
            ),
            LessonCardItem(
                emoji = "🏷️",
                titleEn = "Nouns (Naming Words)",
                subtitleEn = "boy, girl, cow, ball, elephant, banana",
                explain = TrilingualText(
                    en = "Nouns are the names of people, animals, places, and things.",
                    ur = "کسی شخص، جانور، جگہ یا چیز کے نام کو Noun (اسم) کہتے ہیں، جیسے لڑکا، گائے، گیند۔",
                    ps = "د انسان، څاروي، ځای یا شي نوم ته Noun (نوم) ویل کیږي، لکه هلک، غوا، توپ."
                )
            ),
            LessonCardItem(
                emoji = "👉",
                titleEn = "Pronouns (Substitution Words)",
                subtitleEn = "I, You, He, She, It, We, They",
                explain = TrilingualText(
                    en = "Pronouns take the place of nouns: He (boy), She (girl), It (animal/thing), They (many).",
                    ur = "جو الفاظ نام کی جگہ بولے جائیں انہیں Pronoun کہتے ہیں: He (لڑکا)، She (لڑکی)، It (بے جان/جانور)۔",
                    ps = "هغه توري چې د نوم پر ځای راځي Pronoun بلل کیږي: He (هلک)، She (نجلۍ)، It (شی/څاروی)."
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "👨‍🏫",
                question = TrilingualText(
                    en = "Who helps Saad with his homework?",
                    ur = "ہوم ورک کرنے میں سعد کی مدد کون کرتا ہے؟",
                    ps = "د کورنۍ دندې په کولو کې له سعد سره څوک مرسته کوي؟"
                ),
                correctAnswer = "Father",
                options = listOf("Father", "Sister", "Doctor"),
                explain = TrilingualText(
                    en = "Saad's father is a teacher and helps him with his homework!",
                    ur = "سعد کے ابو استاد ہیں اور ہوم ورک میں اس کی مدد کرتے ہیں!",
                    ps = "د سعد پلار ښوونکی دی او په کورنۍ دنده کې ورسره مرسته کوي!"
                )
            ),
            ExerciseQuizItem(
                emoji = "👦",
                question = TrilingualText(
                    en = "Haris is a boy. ___ is my brother.",
                    ur = "حارث ایک لڑکا ہے۔ ___ میرا بھائی ہے۔",
                    ps = "حارث یو هلک دی. ___ زما ورور دی."
                ),
                correctAnswer = "He",
                options = listOf("He", "She", "It"),
                explain = TrilingualText(
                    en = "He is used for a boy!",
                    ur = "لڑکے کے لیے 'He' استعمال ہوتا ہے!",
                    ps = "د هلک لپاره 'He' کارول کیږي!"
                )
            ),
            ExerciseQuizItem(
                emoji = "❓",
                question = TrilingualText(
                    en = "Which mark goes at the end of: 'Are you Saad___'",
                    ur = "سوالیہ جملے 'Are you Saad' کے آخر میں کون سی علامت آئے گی؟",
                    ps = "د 'Are you Saad' پوښتنې په پای کې کومه نښه راځي؟"
                ),
                correctAnswer = "?",
                options = listOf("?", ".", ","),
                explain = TrilingualText(
                    en = "A Question Mark (?) goes at the end of every question!",
                    ur = "ہر سوال کے آخر میں سوالیہ نشان (?) آتا ہے!",
                    ps = "د هرې پوښتنې په پای کې د پوښتنې نښه (?) راځي!"
                )
            )
        )
    ),

    // 8. Unit 3: Cobbler, Cobbler (Pages 19–27)
    BookPageMeta(
        pageNumber = 19,
        pillLabel = "Unit 3 • Cobbler",
        titleEn = "Unit 3 (Pages 19–27): Cobbler, Cobbler",
        pageRangeText = "Pages 19–27",
        subtitle = TrilingualText(
            en = "Poem 'Cobbler, Cobbler, Mend My Shoe', Consonant Blends (cl, bl, dr, br) & Action Words",
            ur = "نظم 'موچی موچی میرا جوتا گانٹھ دو'، مرکب آوازیں (cl, bl, dr, br) اور کام والے الفاظ (Verbs)",
            ps = "نظم 'موچي موچي زما بوټ وګنډه'، غبرګ غږونه (cl, bl, dr, br) او د کار توري (Action Words)"
        ),
        gameBadge = "🐸 Lilypad Hop",
        mechanic = ArcadeStageMechanic.FROG_LILYPAD_HOP,
        mascotEmoji = "🐸",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "👞🪡",
                promptTitle = "Cobbler Poem",
                promptSub = TrilingualText(
                    en = "Cobbler, Cobbler, mend my ___!",
                    ur = "موچی، موچی، میرا ___ مرمت کر دو (سی دو)!",
                    ps = "موچي، موچي، زما ___ وګنډه!"
                ),
                correctAnswer = "shoe",
                options = listOf("shoe", "hat", "car"),
                voiceExplain = TrilingualText(
                    en = "Cobbler, Cobbler, mend my shoe! Get it done by half past two!",
                    ur = "موچی جوتے (shoe) گانٹھتا اور مرمت کرتا ہے!",
                    ps = "موچي بوټونه (shoe) ګنډي او جوړوي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👏🎵",
                promptTitle = "Consonant Blend 'cl'",
                promptSub = TrilingualText(
                    en = "Which blend starts the word: __ap (👏) & __ock (🕒)?",
                    ur = "تالی (clap) اور گھڑی (clock) کن دو حروف سے شروع ہوتے ہیں؟",
                    ps = "چکچکې (clap) او ساعت (clock) په کومو دوو تورو پیل کیږي؟"
                ),
                correctAnswer = "cl",
                options = listOf("cl", "br", "dr"),
                voiceExplain = TrilingualText(
                    en = "C-L makes the blend /cl/ as in clap, class, and clock!",
                    ur = "C اور L مل کر 'کلَ' کی آواز دیتے ہیں، جیسے clap (تالی) اور clock (گھڑی)!",
                    ps = "C او L یو ځای د 'کلَ' غږ ورکوي، لکه clap او clock!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🧹🤎",
                promptTitle = "Consonant Blend 'br'",
                promptSub = TrilingualText(
                    en = "Which blend starts: __oom (🧹) & __own (🤎)?",
                    ur = "جھاڑو (broom) اور بھورا رنگ (brown) کن حروف سے شروع ہوتے ہیں؟",
                    ps = "جارو (broom) او نصواري رنګ (brown) په کومو تورو پیل کیږي؟"
                ),
                correctAnswer = "br",
                options = listOf("br", "bl", "cl"),
                voiceExplain = TrilingualText(
                    en = "B-R makes the blend /br/ as in broom, brown, and branch!",
                    ur = "B اور R مل کر 'برَ' کی آواز دیتے ہیں، جیسے broom (جھاڑو) اور brown (بھورا)!",
                    ps = "B او R یو ځای د 'برَ' غږ ورکوي، لکه broom (جارو) او brown!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🥤💧",
                promptTitle = "Consonant Blend 'dr'",
                promptSub = TrilingualText(
                    en = "Which blend starts: __ink (🥤) & __eam (💭)?",
                    ur = "پینا (drink) اور خواب (dream) کن حروف سے شروع ہوتے ہیں؟",
                    ps = "څښل (drink) او خوب (dream) په کومو تورو پیل کیږي؟"
                ),
                correctAnswer = "dr",
                options = listOf("dr", "cl", "bl"),
                voiceExplain = TrilingualText(
                    en = "D-R makes the blend /dr/ as in drink, dry, and dream!",
                    ur = "D اور R مل کر 'ڈرَ' کی آواز دیتے ہیں، جیسے drink (پینا)!",
                    ps = "D او R یو ځای د 'ډرَ' غږ ورکوي، لکه drink (څښل)!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🔵🖤",
                promptTitle = "Consonant Blend 'bl'",
                promptSub = TrilingualText(
                    en = "Which blend starts: __ue (🔵) & __ack (🖤)?",
                    ur = "نیلا (blue) اور کالا (black) کن حروف سے شروع ہوتے ہیں؟",
                    ps = "شین/اسماني (blue) او تور (black) په کومو تورو پیل کیږي؟"
                ),
                correctAnswer = "bl",
                options = listOf("bl", "br", "dr"),
                voiceExplain = TrilingualText(
                    en = "B-L makes the blend /bl/ as in blue and black!",
                    ur = "B اور L مل کر 'بلَ' کی آواز دیتے ہیں، جیسے blue (نیلا) اور black (کالا)!",
                    ps = "B او L یو ځای د 'بلَ' غږ ورکوي، لکه blue او black!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🏃‍♂️💨",
                promptTitle = "Action Word (Verb)",
                promptSub = TrilingualText(
                    en = "Which word is an ACTION word (something you do)?",
                    ur = "ان میں سے کون سا لفظ کام (Action Word) کو ظاہر کرتا ہے؟",
                    ps = "په دې کې کوم توری د کار یا عمل (Action Word) ښودنه کوي؟"
                ),
                correctAnswer = "jump",
                options = listOf("jump", "table", "shoe"),
                voiceExplain = TrilingualText(
                    en = "Jump, run, read, and eat are Action Words (Verbs)!",
                    ur = "چھلانگ لگانا (jump)، دوڑنا (run) اور پڑھنا (read) کام والے الفاظ (Action Words) ہیں!",
                    ps = "ټوپ وهل (jump)، منډه وهل (run) او لوستل (read) د عمل توري دي!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "👞",
                titleEn = "Poem: Cobbler, Cobbler",
                subtitleEn = "Cobbler, Cobbler, mend my shoe. Get it done by half past two.",
                explain = TrilingualText(
                    en = "A cobbler mends and stitches our shoes. We respect all professions!",
                    ur = "موچی ہمارے جوتے سیتا اور مرمت کرتا ہے۔ ہمیں ہر پیشے اور محنت کرنے والے کی عزت کرنی چاہیے!",
                    ps = "موچي زموږ بوټونه ګنډي او جوړوي. موږ باید د هر مسلک او کسبګر درناوی وکړو!"
                )
            ),
            LessonCardItem(
                emoji = "🔤",
                titleEn = "Consonant Blends (cl, bl, dr, br)",
                subtitleEn = "cl (clap, class) • bl (blue, black) • dr (drink, dry) • br (brown, broom)",
                explain = TrilingualText(
                    en = "In a consonant blend, two consonants come together and each keeps its sound!",
                    ur = "جب دو حروف صحیح (Consonants) اکٹھے آئیں تو دونوں کی آواز ملا کر پڑھی جاتی ہے!",
                    ps = "کله چې دوه بې غږه توري یو ځای راشي نو د دواړو غږونه یو ځای لوستل کیږي!"
                )
            ),
            LessonCardItem(
                emoji = "🏃",
                titleEn = "Naming vs. Action Words",
                subtitleEn = "Naming: boy, book, rabbit • Action: run, read, jump",
                explain = TrilingualText(
                    en = "Naming words name things; Action words tell what someone does!",
                    ur = "چیزوں کے نام کو Naming Words اور کام کو Action Words (فعل) کہتے ہیں!",
                    ps = "د شیانو نومونو ته Naming Words او کار یا عمل ته Action Words وایي!"
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "👞",
                question = TrilingualText(
                    en = "What does a cobbler mend?",
                    ur = "موچی کیا چیز مرمت کرتا ہے؟",
                    ps = "موچي څه شی جوړوي او ګنډي؟"
                ),
                correctAnswer = "Shoes",
                options = listOf("Shoes", "Cars", "Teeth"),
                explain = TrilingualText(
                    en = "A cobbler mends and stitches shoes!",
                    ur = "موچی جوتے (Shoes) مرمت کرتا ہے!",
                    ps = "موچي بوټونه (Shoes) ګنډي!"
                )
            ),
            ExerciseQuizItem(
                emoji = "🐇",
                question = TrilingualText(
                    en = "In 'The rabbit jumps', which is the action word?",
                    ur = "'The rabbit jumps' (خرگوش چھلانگ لگاتا ہے) میں کام والا لفظ کون سا ہے؟",
                    ps = "په 'The rabbit jumps' کې د کار توری کوم دی؟"
                ),
                correctAnswer = "jumps",
                options = listOf("jumps", "rabbit", "The"),
                explain = TrilingualText(
                    en = "'jumps' is the action word because it tells what the rabbit does!",
                    ur = "'jumps' (چھلانگ لگانا) کام والا لفظ (Action Word) ہے!",
                    ps = "'jumps' (ټوپ وهل) د عمل یا کار توری دی!"
                )
            )
        )
    ),

    // 9. Review 1 (Pages 28–30)
    BookPageMeta(
        pageNumber = 28,
        pillLabel = "Review 1",
        titleEn = "Review 1 (Pages 28–30): Units 1–3 Checkpoint",
        pageRangeText = "Pages 28–30",
        subtitle = TrilingualText(
            en = "Review Consonant Blends, Naming & Action Words, and Pronouns",
            ur = "یونٹ 1 سے 3 کی دہرائی: مرکب آوازیں، اسم، فعل اور ضمیر کا خزانہ کھولیں",
            ps = "د ۱ نه تر ۳ یونټونو تکرار: غبرګ غږونه، نومونه، فعلونه او ضمیرونه"
        ),
        gameBadge = "💎 Treasure Unlock",
        mechanic = ArcadeStageMechanic.TREASURE_CHEST_UNLOCK,
        mascotEmoji = "💎",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🧱🟦",
                promptTitle = "Blend in 'block'",
                promptSub = TrilingualText(
                    en = "What consonant blend is at the start of 'block' and 'blue'?",
                    ur = "لفظ 'block' اور 'blue' کے شروع میں کون سا Blend ہے؟",
                    ps = "د 'block' او 'blue' په پیل کې کوم غبرګ توري دي؟"
                ),
                correctAnswer = "bl",
                options = listOf("bl", "cl", "dr"),
                voiceExplain = TrilingualText(
                    en = "'bl' is the consonant blend in block and blue!",
                    ur = "'block' اور 'blue' کے شروع میں 'bl' آتا ہے!",
                    ps = "د 'block' او 'blue' په پیل کې 'bl' راځي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👭🎈",
                promptTitle = "Pronoun for Friends",
                promptSub = TrilingualText(
                    en = "Hira and Asma are playing. ___ are good friends.",
                    ur = "حرا اور اسماء کھیل رہی ہیں۔ ___ اچھی سہیلیاں ہیں۔",
                    ps = "حرا او اسما لوبې کوي. ___ ښې ملګرې دي."
                ),
                correctAnswer = "They",
                options = listOf("They", "He", "It"),
                voiceExplain = TrilingualText(
                    en = "When talking about two or more people, we use 'They'!",
                    ur = "دو یا زیادہ لوگوں کے لیے 'They' (وہ سب) استعمال ہوتا ہے!",
                    ps = "د دوو یا زیاتو کسانو لپاره 'They' کارول کیږي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🇵🇰❤️",
                promptTitle = "Action Word",
                promptSub = TrilingualText(
                    en = "In 'I love my country', which is the noun (place)?",
                    ur = "جملے 'I love my country' میں جگہ کا نام (Noun) کون سا ہے؟",
                    ps = "په 'I love my country' جمله کې د ځای نوم (Noun) کوم دی؟"
                ),
                correctAnswer = "country",
                options = listOf("country", "love", "my"),
                voiceExplain = TrilingualText(
                    en = "'country' is a naming word (noun), and 'love' is the action word!",
                    ur = "'country' (ملک) اسم ہے اور 'love' (محبت کرنا) فعل ہے!",
                    ps = "'country' (هېواد) نوم دی او 'love' فعل دی!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🪡👞",
                promptTitle = "Meaning of 'stitch'",
                promptSub = TrilingualText(
                    en = "What does the word 'stitch' mean?",
                    ur = "لفظ 'stitch' کا کیا مطلب ہے؟",
                    ps = "د 'stitch' توري مانا څه ده؟"
                ),
                correctAnswer = "to sew",
                options = listOf("to sew", "to sleep", "to jump"),
                voiceExplain = TrilingualText(
                    en = "Stitch means to sew or mend with a needle and thread!",
                    ur = "Stitch کا مطلب سوئی دھاگے سے سینا یا ٹانکا لگانا ہے!",
                    ps = "Stitch مانا په ستن او تار سره ګنډل دي!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "🏆",
                titleEn = "Review 1 Vocabulary",
                subtitleEn = "cobbler (person who mends shoes) • complete (finish) • stitch (sew)",
                explain = TrilingualText(
                    en = "You have mastered Alphabet sounds, Blends, Nouns, Action words, and Pronouns!",
                    ur = "شاباش! آپ نے حروف کی آوازیں، Blends، اسم، فعل اور ضمیر سیکھ لیے ہیں!",
                    ps = "آفرین! تاسو د تورو غږونه، Blends، نومونه، فعلونه او ضمیرونه زده کړل!"
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "👦",
                question = TrilingualText(
                    en = "Vicky is a boy. ___ is a good student.",
                    ur = "وکی ایک لڑکا ہے۔ ___ ایک اچھا طالب علم ہے۔",
                    ps = "وکي یو هلک دی. ___ یو ښه زده کوونکی دی."
                ),
                correctAnswer = "He",
                options = listOf("He", "She", "They"),
                explain = TrilingualText(
                    en = "He is a good student!",
                    ur = "لڑکے کے لیے He آتا ہے!",
                    ps = "د هلک لپاره He راځي!"
                )
            )
        )
    ),

    // 10. Unit 4: Let's have Fun! (Pages 31–41)
    BookPageMeta(
        pageNumber = 31,
        pillLabel = "Unit 4 • Fun",
        titleEn = "Unit 4 (Pages 31–41): Let's have Fun!",
        pageRangeText = "Pages 31–41",
        subtitle = TrilingualText(
            en = "Pencil Shavings Craft, Digraphs (ch, ph, th), Singular/Plural (+s), This/That & A/An",
            ur = "پنسل کے چھلکوں سے پھول بنانا، Digraphs (ch, ph, th)، واحد جمع، This/That اور A/An",
            ps = "د پنسل له پوستکو ګلونه جوړول، Digraphs (ch, ph, th)، واحد جمع، This/That او A/An"
        ),
        gameBadge = "🐒 Monkey Catch",
        mechanic = ArcadeStageMechanic.MONKEY_FRUIT_CATCH,
        mascotEmoji = "🐒",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🪑🧀",
                promptTitle = "Digraph 'ch'",
                promptSub = TrilingualText(
                    en = "Which two letters make the /ch/ sound in __air & __eese?",
                    ur = "کرسی (chair) اور پنیر (cheese) کے شروع میں 'چَ' کی آواز کن حروف سے بنتی ہے؟",
                    ps = "د چوکۍ (chair) او پنیر (cheese) په پیل کې د 'چ' غږ له کومو تورو جوړیږي؟"
                ),
                correctAnswer = "ch",
                options = listOf("ch", "ph", "th"),
                voiceExplain = TrilingualText(
                    en = "C and H together make the digraph /ch/ as in chair, chin, and cheese!",
                    ur = "C اور H مل کر 'چَ' (ch) کی آواز بناتے ہیں، جیسے chair (کرسی)!",
                    ps = "C او H یو ځای د 'چ' (ch) غږ جوړوي، لکه chair (چوکۍ)!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "📱🐘",
                promptTitle = "Digraph 'ph'",
                promptSub = TrilingualText(
                    en = "Which digraph makes the /f/ sound in __one & __oto?",
                    ur = "فون (phone) اور تصویر (photo) میں 'فَ' کی آواز کن دو حروف سے بنتی ہے؟",
                    ps = "په فون (phone) او عکس (photo) کې د 'ف' غږ له کومو دوو تورو جوړیږي؟"
                ),
                correctAnswer = "ph",
                options = listOf("ph", "ch", "th"),
                voiceExplain = TrilingualText(
                    en = "P and H together make the /f/ sound in phone and photo!",
                    ur = "P اور H مل کر 'فَ' (ph) کی آواز دیتے ہیں، جیسے phone اور photo!",
                    ps = "P او H یو ځای د 'ف' (ph) غږ ورکوي، لکه phone او photo!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👍3️⃣",
                promptTitle = "Digraph 'th'",
                promptSub = TrilingualText(
                    en = "Which digraph starts __umb (👍) & __ree (3)?",
                    ur = "انگوٹھا (thumb) اور تین (three) کن دو حروف سے شروع ہوتے ہیں؟",
                    ps = "بټه ګوته (thumb) او درې (three) په کومو دوو تورو پیل کیږي؟"
                ),
                correctAnswer = "th",
                options = listOf("th", "ph", "ch"),
                voiceExplain = TrilingualText(
                    en = "T and H together make the digraph /th/ as in thumb, three, and think!",
                    ur = "T اور H مل کر 'تھ' (th) کی آواز دیتے ہیں، جیسے thumb اور three!",
                    ps = "T او H یو ځای د 'تهـ' (th) غږ ورکوي، لکه thumb او three!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🍎☂️",
                promptTitle = "Article 'a' or 'an'",
                promptSub = TrilingualText(
                    en = "What comes before a vowel sound: ___ apple / ___ umbrella?",
                    ur = "واول حروف (a, e, i, o, u) سے شروع ہونے والے لفظ سے پہلے کیا آتا ہے: ___ apple؟",
                    ps = "له غږیزو تورو (a, e, i, o, u) مخکې څه راځي: ___ apple؟"
                ),
                correctAnswer = "an",
                options = listOf("an", "a", "two"),
                voiceExplain = TrilingualText(
                    en = "We use 'an' before words starting with vowel sounds (a, e, i, o, u): an apple, an umbrella!",
                    ur = "جن الفاظ کے شروع میں a, e, i, o, u ہو ان سے پہلے 'an' لگاتے ہیں، جیسے an apple!",
                    ps = "له هغو تورو مخکې چې په a, e, i, o, u پیل کیږي 'an' راځي، لکه an apple!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "📚✏️",
                promptTitle = "Singular to Plural",
                promptSub = TrilingualText(
                    en = "One book ➔ Two ___?",
                    ur = "ایک کتاب (book) تو دو کیا ہوں گی؟",
                    ps = "یو کتاب (book) نو دوه به څه وي؟"
                ),
                correctAnswer = "books",
                options = listOf("books", "book", "bookes"),
                voiceExplain = TrilingualText(
                    en = "We add 's' to make a singular noun plural: one book, two books!",
                    ur = "ایک سے زیادہ چیزوں (جمع) کے لیے آخر میں 's' لگاتے ہیں: book سے books!",
                    ps = "د جمع کولو لپاره په پای کې 's' زیاتوو: له book نه books!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "🌸",
                titleEn = "Huma & Hina's Pencil Craft",
                subtitleEn = "1. Sharpen pencils ➔ 2. Collect shavings ➔ 3. Draw flowers ➔ 4. Paste with glue!",
                explain = TrilingualText(
                    en = "Huma helps her sister Hina make pretty flowers using pencil shavings and glue.",
                    ur = "ہما اپنی بہن حنا کی مدد کرتی ہے اور پنسل کے چھلکوں سے کاغذ پر خوبصورت پھول بناتی ہے۔",
                    ps = "هما له خپلې خور حنا سره مرسته کوي او د پنسل له پوستکو ښکلي ګلونه جوړوي."
                )
            ),
            LessonCardItem(
                emoji = "🔊",
                titleEn = "Consonant Digraphs (ch, ph, th)",
                subtitleEn = "ch (chair, chin) • ph (phone, photo) • th (thumb, three)",
                explain = TrilingualText(
                    en = "A digraph is two letters that join together to make ONE single sound!",
                    ur = "جب دو حروف مل کر ایک نئی آواز بنائیں تو اسے Digraph کہتے ہیں (جیسے ch سے چ، ph سے ف)!",
                    ps = "کله چې دوه توري یو ځای شي او یو نوی غږ جوړ کړي هغې ته Digraph وایي!"
                )
            ),
            LessonCardItem(
                emoji = "👉",
                titleEn = "This / That & A / An",
                subtitleEn = "This (near) • That (far) • 'an' with vowels (a,e,i,o,u) • 'a' with consonants",
                explain = TrilingualText(
                    en = "Use 'This' for something near you, and 'That' for something far away!",
                    ur = "قریب کی ایک چیز کے لیے 'This' اور دور کی چیز کے لیے 'That' استعمال کرتے ہیں!",
                    ps = "د نږدې شي لپاره 'This' او د لرې شي لپاره 'That' کارول کیږي!"
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "🍊",
                question = TrilingualText(
                    en = "Umair is eating ___ orange.",
                    ur = "عمیر ایک مالٹا کھا رہا ہے: Umair is eating ___ orange.",
                    ps = "عمیر یو نارنج خوري: Umair is eating ___ orange."
                ),
                correctAnswer = "an",
                options = listOf("an", "a", "the"),
                explain = TrilingualText(
                    en = "Orange starts with the vowel 'o', so we say 'an orange'!",
                    ur = "Orange واول 'o' سے شروع ہوتا ہے اس لیے 'an orange' آئے گا!",
                    ps = "Orange په غږیز توري 'o' پیل کیږي نو ځکه 'an orange' راځي!"
                )
            )
        )
    ),

    // 11. Unit 5: Sharing is Caring (Pages 42–52)
    BookPageMeta(
        pageNumber = 42,
        pillLabel = "Unit 5 • Sharing",
        titleEn = "Unit 5 (Pages 42–52): Sharing is Caring",
        pageRangeText = "Pages 42–52",
        subtitle = TrilingualText(
            en = "Poem 'Let Others Share', Rhyming Words, Digraphs (sh, ch, th), Gender & These/Those",
            ur = "نظم 'دوسروں کے ساتھ بانٹیں'، ہم قافیہ الفاظ، مذکر مؤنث اور These/Those کا استعمال",
            ps = "نظم 'له نورو سره شریک کړئ'، هم غږي توري، نارینه او ښځینه نومونه او These/Those"
        ),
        gameBadge = "🌈 Rainbow Bridge",
        mechanic = ArcadeStageMechanic.RAINBOW_BRIDGE_BUILDER,
        mascotEmoji = "🌈",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🧸👦",
                promptTitle = "Poem Rhyming Word",
                promptSub = TrilingualText(
                    en = "Let others share your toys, my son / Do not insist on all the ___!",
                    ur = "نظم مکمل کریں: اپنے کھلونے دوسروں کے ساتھ بانٹیں میرے بیٹے (son)، سارا ___ اکیلے نہ چاہیں!",
                    ps = "نظم بشپړ کړئ: خپلې لوبتکې له نورو سره شریکې کړئ زویه (son)، له، کوم توری له son سره هم غږی دی؟"
                ),
                correctAnswer = "fun",
                options = listOf("fun", "cat", "bed"),
                voiceExplain = TrilingualText(
                    en = "'son' and 'fun' are rhyming words! Sharing toys with friends is great fun!",
                    ur = "'son' اور 'fun' ہم قافیہ (Rhyming) الفاظ ہیں! کھلونے بانٹ کر کھیلنے میں مزہ آتا ہے!",
                    ps = "'son' او 'fun' هم غږي (Rhyming) توري دي! لوبتکې شریکول ډېر خوند کوي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👟🐟",
                promptTitle = "Digraph 'sh'",
                promptSub = TrilingualText(
                    en = "Which two letters make the /sh/ sound in __oes & fi__?",
                    ur = "جوتے (shoes) اور مچھلی (fish) میں 'ش' کی آواز کن دو حروف سے بنتی ہے؟",
                    ps = "په بوټانو (shoes) او کب (fish) کې د 'ش' غږ له کومو دوو تورو جوړیږي؟"
                ),
                correctAnswer = "sh",
                options = listOf("sh", "ch", "ph"),
                voiceExplain = TrilingualText(
                    en = "S and H together make the /sh/ sound in shoes, ship, and fish!",
                    ur = "S اور H مل کر 'ش' (sh) کی آواز دیتے ہیں، جیسے shoes اور fish!",
                    ps = "S او H یو ځای د 'ش' (sh) غږ ورکوي، لکه shoes او fish!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👑👦➔👧",
                promptTitle = "Masculine & Feminine",
                promptSub = TrilingualText(
                    en = "What is the feminine (girl) word for 'boy'?",
                    ur = "لڑکا (boy) کا مؤنث کیا ہے؟",
                    ps = "د هلک (boy) ښځینه نوم څه دی؟"
                ),
                correctAnswer = "girl",
                options = listOf("girl", "uncle", "bull"),
                voiceExplain = TrilingualText(
                    en = "Boy is masculine and Girl is feminine! Man ➔ Woman, Uncle ➔ Aunt!",
                    ur = "Boy (لڑکا) مذکر ہے اور اس کا مؤنث Girl (لڑکی) ہے!",
                    ps = "Boy (هلک) نارینه دی او ښځینه یې Girl (نجلۍ) ده!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🐄🐂",
                promptTitle = "Gender of 'bull'",
                promptSub = TrilingualText(
                    en = "What is the feminine gender of 'bull'?",
                    ur = "بیل (bull) کا مؤنث کیا ہے؟",
                    ps = "د غويي (bull) ښځینه نوم څه دی؟"
                ),
                correctAnswer = "cow",
                options = listOf("cow", "horse", "hen"),
                voiceExplain = TrilingualText(
                    en = "Bull is masculine and Cow is feminine!",
                    ur = "Bull (بیل) مذکر ہے اور Cow (گائے) مؤنث ہے!",
                    ps = "Bull (غویی) نارینه دی او Cow (غوا) ښځینه ده!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🍎🍎👈",
                promptTitle = "These vs. Those",
                promptSub = TrilingualText(
                    en = "Which word points to many things NEAR you: ___ are my toys?",
                    ur = "قریب پڑی ہوئی بہت سی چیزوں کی طرف اشارہ کرنے کے لیے کیا کہتے ہیں؟",
                    ps = "نږدې پرتو ډېرو شیانو ته د اشارې لپاره کوم توری کارول کیږي؟"
                ),
                correctAnswer = "These",
                options = listOf("These", "This", "That"),
                voiceExplain = TrilingualText(
                    en = "We use 'These' for plural things near us, and 'Those' for plural things far away!",
                    ur = "قریب کی جمع چیزوں کے لیے 'These' اور دور کی جمع چیزوں کے لیے 'Those' آتا ہے!",
                    ps = "د نږدې جمع شیانو لپاره 'These' او د لرې جمع شیانو لپاره 'Those' راځي!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "🤝",
                titleEn = "Poem: Let Others Share",
                subtitleEn = "Let others share your toys, my son, Do not insist on all the fun.",
                explain = TrilingualText(
                    en = "Sharing our toys, books, and lunch with siblings and friends is a wonderful habit!",
                    ur = "اپنے کھلونے، کتابیں اور کھانا بہن بھائیوں اور دوستوں کے ساتھ بانٹنا بہت اچھی عادت ہے!",
                    ps = "خپلې لوبتکې، کتابونه او خواړه له وروڼو، خویندو او ملګرو سره شریکول ډېر ښه عادت دی!"
                )
            ),
            LessonCardItem(
                emoji = "👫",
                titleEn = "Gender (Masculine & Feminine)",
                subtitleEn = "boy ➔ girl • man ➔ woman • uncle ➔ aunt • bull ➔ cow • horse ➔ mare",
                explain = TrilingualText(
                    en = "Masculine nouns are for males and Feminine nouns are for females.",
                    ur = "نر کے لیے مذکر (Masculine) اور مادہ کے لیے مؤنث (Feminine) الفاظ استعمال ہوتے ہیں۔",
                    ps = "د نارینه لپاره Masculine او د ښځینه لپاره Feminine توري کارول کیږي."
                )
            ),
            LessonCardItem(
                emoji = "🎨",
                titleEn = "Colours & Shapes",
                subtitleEn = "Red, Blue, Yellow, Green • Circle, Square, Triangle, Rectangle",
                explain = TrilingualText(
                    en = "Every object around us has a colour and a shape!",
                    ur = "ہمارے اردگرد ہر چیز کا کوئی نہ کوئی رنگ اور شکل (گول، چوکور، تکون) ہوتی ہے!",
                    ps = "زموږ شاوخوا هر شی رنګ او بڼه (ګرد، څلورګونی، درې ګونی) لري!"
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "🎩",
                question = TrilingualText(
                    en = "Which word rhymes with 'hat' and 'cat'?",
                    ur = "'hat' اور 'cat' کا ہم قافیہ (Rhyming) لفظ کون سا ہے؟",
                    ps = "له 'hat' او 'cat' سره هم غږی توری کوم دی؟"
                ),
                correctAnswer = "mat",
                options = listOf("mat", "pen", "sun"),
                explain = TrilingualText(
                    en = "Hat, cat, and mat all end with '-at' and rhyme together!",
                    ur = "Hat، cat اور mat کی آخری آواز ایک جیسی ہے!",
                    ps = "د Hat، cat او mat وروستی غږ یو شان دی!"
                )
            )
        )
    ),

    // 12. Review 2 (Pages 53–55)
    BookPageMeta(
        pageNumber = 53,
        pillLabel = "Review 2",
        titleEn = "Review 2 (Pages 53–55): Units 4–5 Checkpoint",
        pageRangeText = "Pages 53–55",
        subtitle = TrilingualText(
            en = "Review Digraphs (ph, sh, th, ch), Plurals, Articles (a/an), and Masculine/Feminine",
            ur = "یونٹ 4 اور 5 کی دہرائی: Digraphs، واحد جمع، A/An اور مذکر مؤنث کا مقابلہ",
            ps = "د ۴ او ۵ یونټونو تکرار: Digraphs، واحد جمع، A/An او نارینه/ښځینه"
        ),
        gameBadge = "🏎️ Turbo Race",
        mechanic = ArcadeStageMechanic.RACE_TRACK_TURBO,
        mascotEmoji = "🏎️",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🦷🪥",
                promptTitle = "Ending Digraph in 'tooth'",
                promptSub = TrilingualText(
                    en = "Which digraph is at the end of 'too__' (🦷)?",
                    ur = "دانت (tooth) کے آخر میں کون سا Digraph آتا ہے؟",
                    ps = "د غاښ (tooth) په پای کې کوم غبرګ توري راځي؟"
                ),
                correctAnswer = "th",
                options = listOf("th", "sh", "ch"),
                voiceExplain = TrilingualText(
                    en = "'tooth' ends with the digraph 'th'!",
                    ur = "لفظ 'tooth' کے آخر میں 'th' آتا ہے!",
                    ps = "د 'tooth' په پای کې 'th' راځي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "☂️🌧️",
                promptTitle = "Article before 'umbrella'",
                promptSub = TrilingualText(
                    en = "He bought ___ umbrella.",
                    ur = "اس نے ایک چھتری خریدی: He bought ___ umbrella.",
                    ps = "هغه یوه چترۍ واخیسته: He bought ___ umbrella."
                ),
                correctAnswer = "an",
                options = listOf("an", "a", "those"),
                voiceExplain = TrilingualText(
                    en = "Umbrella begins with the vowel 'u', so we use 'an umbrella'!",
                    ur = "Umbrella واول 'u' سے شروع ہوتا ہے، اس لیے 'an umbrella' آتا ہے!",
                    ps = "Umbrella په غږیز توري 'u' پیل کیږي، نو 'an umbrella' راځي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🧔➔👩",
                promptTitle = "Feminine of 'uncle'",
                promptSub = TrilingualText(
                    en = "What is the feminine gender of 'uncle'?",
                    ur = "چچا/ماموں (uncle) کا مؤنث کیا ہے؟",
                    ps = "د تره/ماما (uncle) ښځینه نوم څه دی؟"
                ),
                correctAnswer = "aunt",
                options = listOf("aunt", "sister", "queen"),
                voiceExplain = TrilingualText(
                    en = "The feminine of uncle is aunt!",
                    ur = "Uncle کا مؤنث Aunt (چچی/خالہ/پھوپھی) ہے!",
                    ps = "د Uncle ښځینه نوم Aunt (ترور/مامي) ده!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🐦🐦",
                promptTitle = "Plural of 'bird'",
                promptSub = TrilingualText(
                    en = "What is the plural of 'bird'?",
                    ur = "پرندہ (bird) کی جمع کیا ہے؟",
                    ps = "د مرغه (bird) جمع څه ده؟"
                ),
                correctAnswer = "birds",
                options = listOf("birds", "bird", "birdes"),
                voiceExplain = TrilingualText(
                    en = "One bird, many birds!",
                    ur = "ایک پرندہ bird، اور بہت سے پرندے birds!",
                    ps = "یو مرغه bird، او ډېر مرغان birds!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "⭐",
                titleEn = "Review 2 Key Words",
                subtitleEn = "phone, shoes, tooth, cheese, graph • healthy, collect",
                explain = TrilingualText(
                    en = "Great job reviewing digraphs, singular/plural nouns, a/an, and gender!",
                    ur = "بہت خوب! آپ نے Digraphs، واحد جمع، a/an اور مذکر مؤنث کی دہرائی مکمل کر لی!",
                    ps = "ډېر ښه! تاسو د Digraphs، واحد جمع، a/an او نارینه/ښځینه تکرار بشپړ کړ!"
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "🐴",
                question = TrilingualText(
                    en = "What is the feminine gender of 'horse'?",
                    ur = "گھوڑا (horse) کا مؤنث کیا ہے؟",
                    ps = "د آس (horse) ښځینه نوم څه دی؟"
                ),
                correctAnswer = "mare",
                options = listOf("mare", "cow", "hen"),
                explain = TrilingualText(
                    en = "The feminine of horse is mare!",
                    ur = "گھوڑے (horse) کا مؤنث گھوڑی (mare) ہے!",
                    ps = "د آس (horse) ښځینه مادیانه (mare) ده!"
                )
            )
        )
    ),

    // 13. Unit 6: Blessings of Allah (Pages 56–65)
    BookPageMeta(
        pageNumber = 56,
        pillLabel = "Unit 6 • Blessings",
        titleEn = "Unit 6 (Pages 56–65): Blessings of Allah",
        pageRangeText = "Pages 56–65",
        subtitle = TrilingualText(
            en = "Red Carrot, Yellow Mango & Juicy Apple Story, Emotions, Proper Nouns & Wh-Questions",
            ur = "سرخ گاجر، پیلے آم اور رسیلے سیب کی کہانی، جذبات، اسم معرفہ (Proper Nouns) اور سوالیہ الفاظ",
            ps = "د سرې ګازرې، ژېړ ام او خوږې مڼې کیسه، احساسات، ځانګړي نومونه او پوښتنې"
        ),
        gameBadge = "🐒 Basket Catch",
        mechanic = ArcadeStageMechanic.MONKEY_FRUIT_CATCH,
        mascotEmoji = "🥕",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🥕😢",
                promptTitle = "Fruit Basket Story",
                promptSub = TrilingualText(
                    en = "Who was sitting quietly and feeling sad in the corner?",
                    ur = "ٹوکري کے کونے میں کون خاموشی سے اداس بیٹھا تھا؟",
                    ps = "د ټوکرۍ په کونج کې څوک غلی او خفه ناست و؟"
                ),
                correctAnswer = "Red Carrot",
                options = listOf("Red Carrot", "Yellow Mango", "Banana"),
                voiceExplain = TrilingualText(
                    en = "Red Carrot was sad because Juicy Apple fought with her, until Yellow Mango made peace!",
                    ur = "سرخ گاجر (Red Carrot) اداس تھی کیونکہ سیب نے اس کا مذاق اڑایا تھا، پھر آم نے صلح کرائی!",
                    ps = "سره ګازره (Red Carrot) خفه وه ځکه چې مڼې ورپورې خندلي وو، بیا ام پخلا کړل!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "😊🎉",
                promptTitle = "Spot the Emotion",
                promptSub = TrilingualText(
                    en = "Look at the smiling face 😊! How is the child feeling?",
                    ur = "مسکراتے ہوئے چہرے 😊 کو دیکھ کر بتائیں بچہ کیسا محسوس کر رہا ہے؟",
                    ps = "دې مسکۍ څېرې 😊 ته وګورئ، ماشوم څنګه احساس کوي؟"
                ),
                correctAnswer = "happy",
                options = listOf("happy", "sad", "angry"),
                voiceExplain = TrilingualText(
                    en = "A smiling face shows we are happy! Thank Allah for all blessings!",
                    ur = "مسکراتا چہرہ خوشی (happy) ظاہر کرتا ہے! اللہ کی نعمتوں کا شکر ادا کریں!",
                    ps = "مسکۍ څېره خوښي (happy) ښیي! د الله د نعمتونو شکر وباسئ!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🕌🇵🇰",
                promptTitle = "Proper Noun Capital Letter",
                promptSub = TrilingualText(
                    en = "Special names like 'Pakistan' and 'Ali' always start with a ___ letter!",
                    ur = "خاص نام (جیسے Pakistan اور Ali) ہمیشہ کس طرح کے حرف سے شروع ہوتے ہیں؟",
                    ps = "ځانګړي نومونه (لکه Pakistan او Ali) تل په څنګه توري پیل کیږي؟"
                ),
                correctAnswer = "Capital",
                options = listOf("Capital", "Small", "Number"),
                voiceExplain = TrilingualText(
                    en = "Proper nouns (special names of people and places) always start with a Capital letter!",
                    ur = "خاص ناموں (Proper Nouns) کا پہلا حرف ہمیشہ بڑا (Capital) لکھا جاتا ہے!",
                    ps = "د ځانګړو نومونو (Proper Nouns) لومړی توری تل غټ (Capital) لیکل کیږي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🕵️‍♂️👤",
                promptTitle = "Question Word 'Who'",
                promptSub = TrilingualText(
                    en = "___ is your best friend? (What, Who, Where)",
                    ur = "انسان کے بارے میں پوچھنے کے لیے کون سا لفظ آتا ہے: ___ is your best friend?",
                    ps = "د انسان په اړه د پوښتنې لپاره کوم توری راځي: ___ is your best friend?"
                ),
                correctAnswer = "Who",
                options = listOf("Who", "Where", "What"),
                voiceExplain = TrilingualText(
                    en = "We use 'Who' to ask about a person, 'Where' for a place, and 'What' for a thing!",
                    ur = "شخص کے لیے 'Who' (کون)، جگہ کے لیے 'Where' (کہاں) اور چیز کے لیے 'What' (کیا) آتا ہے!",
                    ps = "د شخص لپاره 'Who' (څوک)، د ځای لپاره 'Where' (چېرته) او د شي لپاره 'What' (څه) راځي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🍎🥕",
                promptTitle = "Fruits vs. Vegetables",
                promptSub = TrilingualText(
                    en = "Which one of these is a sweet FRUIT?",
                    ur = "ان میں سے کون سا ایک میٹھا پھل (Fruit) ہے؟",
                    ps = "په دې کې کوم یو خوږه مېوه (Fruit) ده؟"
                ),
                correctAnswer = "Mango",
                options = listOf("Mango", "Potato", "Onion"),
                voiceExplain = TrilingualText(
                    en = "Mango, Apple, and Banana are fruits! Carrot, Potato, and Onion are vegetables!",
                    ur = "آم (Mango)، سیب اور کیلا پھل ہیں، جبکہ آلو، پیاز اور گاجر سبزیاں ہیں!",
                    ps = "ام (Mango)، مڼه او کېله مېوې دي، او کچالو، پیاز او ګازره سابه دي!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "🥭",
                titleEn = "Story: Blessings of Allah",
                subtitleEn = "Red Carrot, Yellow Mango, and Juicy Apple become friends in the basket!",
                explain = TrilingualText(
                    en = "Allah has created delicious fruits and vegetables to keep us healthy and strong.",
                    ur = "اللہ تعالیٰ نے ہمارے لیے مزیدار پھل اور سبزیاں پیدا کی ہیں جو ہمیں صحت مند رکھتی ہیں۔",
                    ps = "الله تعالی زموږ لپاره خوندورې مېوې او سابه پیدا کړي چې موږ روغ او پیاوړي ساتي."
                )
            ),
            LessonCardItem(
                emoji = "😊",
                titleEn = "Expressing Emotions",
                subtitleEn = "Happy 😊 • Sad 😢 • Angry 😠 • Surprised 😮",
                explain = TrilingualText(
                    en = "We should be kind to friends so everyone feels happy and nobody feels sad!",
                    ur = "ہمیں دوستوں سے پیار سے پیش آنا چاہیے تاکہ سب خوش (Happy) رہیں!",
                    ps = "موږ باید له ملګرو سره په مینه چلند وکړو ترڅو ټول خوشحاله (Happy) اووسي!"
                )
            ),
            LessonCardItem(
                emoji = "❓",
                titleEn = "Question Words: What, Who, Where",
                subtitleEn = "What (things) • Who (people) • Where (places)",
                explain = TrilingualText(
                    en = "What is your name? Who is your teacher? Where is your school?",
                    ur = "What (کیا - چیز کے لیے)، Who (کون - انسان کے لیے)، Where (کہاں - جگہ کے لیے)۔",
                    ps = "What (څه - د شي لپاره)، Who (څوک - د انسان لپاره)، Where (چېرته - د ځای لپاره)."
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "🍎",
                question = TrilingualText(
                    en = "Who said sorry to Red Carrot?",
                    ur = "سرخ گاجر سے کس نے معافی (Sorry) مانگی؟",
                    ps = "له سرې ګازرې نه چا بښنه (Sorry) وغوښته؟"
                ),
                correctAnswer = "Juicy Apple",
                options = listOf("Juicy Apple", "Potato", "Cat"),
                explain = TrilingualText(
                    en = "Juicy Apple said sorry to Red Carrot and they became good friends again!",
                    ur = "رسیلے سیب (Juicy Apple) نے گاجر سے معافی مانگی اور وہ پھر سے دوست بن گئے!",
                    ps = "خوږې مڼې (Juicy Apple) له ګازرې بښنه وغوښته او بېرته ملګري شول!"
                )
            )
        )
    ),

    // 14. Unit 7: Classroom Manners (Pages 66–76)
    BookPageMeta(
        pageNumber = 66,
        pillLabel = "Unit 7 • Manners",
        titleEn = "Unit 7 (Pages 66–76): Classroom Manners",
        pageRangeText = "Pages 66–76",
        subtitle = TrilingualText(
            en = "Zara's First Day, Polite Words (Please/Thank you), Rhyming Words, Is/Am/Are & Size Adjectives",
            ur = "زارا کا پہلا دن، کمرہ جماعت کے آداب، ہم قافیہ الفاظ، Is/Am/Are اور چھوٹے بڑے کی صفت",
            ps = "د زارا لومړۍ ورځ، د ټولګي ادبونه، هم غږي توري، Is/Am/Are او د اندازې صفتونه"
        ),
        gameBadge = "🚀 Manners Rocket",
        mechanic = ArcadeStageMechanic.ROCKET_SHOOTER,
        mascotEmoji = "🏫",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🙋‍♀️✨",
                promptTitle = "Polite Magic Word",
                promptSub = TrilingualText(
                    en = "What polite word do we say when asking for something?",
                    ur = "جب ہم کسی سے کوئی چیز مانگیں تو کون سا باادب لفظ بولتے ہیں؟",
                    ps = "کله چې له چا نه کوم شی غواړو نو کوم د ادب توری وایو؟"
                ),
                correctAnswer = "Please",
                options = listOf("Please", "Give now", "Go away"),
                voiceExplain = TrilingualText(
                    en = "We always use polite words like 'Please' and 'Thank you' in our classroom!",
                    ur = "ہم ہمیشہ 'Please' (براہ کرم) اور 'Thank you' (شکریہ) جیسے پیارے الفاظ بولتے ہیں!",
                    ps = "موږ تل د 'Please' (مهرباني وکړئ) او 'Thank you' (مننه) په څېر ښکلي توري کاروو!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🪭🚐",
                promptTitle = "Rhyming Word with 'fan'",
                promptSub = TrilingualText(
                    en = "Change the first letter of 'fan' to make a rhyming word!",
                    ur = "'fan' (پنکھا) کا ہم قافیہ لفظ کون سا ہے؟",
                    ps = "له 'fan' (پکه) سره هم غږی توری کوم دی؟"
                ),
                correctAnswer = "van",
                options = listOf("van", "cup", "bed"),
                voiceExplain = TrilingualText(
                    en = "Fan, van, ran, and man all rhyme with each other!",
                    ur = "Fan، van، ran اور man سب ہم قافیہ الفاظ ہیں!",
                    ps = "Fan، van، ran او man ټول هم غږي توري دي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🙋‍♂️🎒",
                promptTitle = "Use of 'am', 'is', 'are'",
                promptSub = TrilingualText(
                    en = "I ___ a good student in Class 1.",
                    ur = "خالی جگہ پر کریں: I ___ a good student.",
                    ps = "تش ځای ډک کړئ: I ___ a good student."
                ),
                correctAnswer = "am",
                options = listOf("am", "is", "are"),
                voiceExplain = TrilingualText(
                    en = "We always use 'am' with 'I': I am a student!",
                    ur = "'I' کے ساتھ ہمیشہ 'am' آتا ہے: I am a good student!",
                    ps = "له 'I' سره تل 'am' راځي: I am a good student!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🐘🐜",
                promptTitle = "Adjective of Size",
                promptSub = TrilingualText(
                    en = "An elephant is ___, and an ant is small!",
                    ur = "ہاتھی ___ ہوتا ہے اور چیونٹی چھوٹی (small) ہوتی ہے!",
                    ps = "فیل ___ وي او مېږی وړوکی (small) وي!"
                ),
                correctAnswer = "big",
                options = listOf("big", "tiny", "short"),
                voiceExplain = TrilingualText(
                    en = "Big, small, tall, and short are describing words showing size!",
                    ur = "Big (بڑا) اور Small (چھوٹا) سائز بتانے والی صفات (Adjectives) ہیں!",
                    ps = "Big (لوی) او Small (وړوکی) د اندازې ښودلو صفتونه دي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🚮🧹",
                promptTitle = "Good Classroom Habit",
                promptSub = TrilingualText(
                    en = "How should we keep our classroom?",
                    ur = "ہمیں اپنی کلاس کو کیسا رکھنا چاہیے؟",
                    ps = "موږ باید خپل ټولګی څنګه وساتو؟"
                ),
                correctAnswer = "Clean",
                options = listOf("Clean", "Dirty", "Noisy"),
                voiceExplain = TrilingualText(
                    en = "We keep our classroom clean, listen to our teachers, and wait for our turn!",
                    ur = "ہم اپنی کلاس صاف رکھتے ہیں، استاد کی بات غور سے سنتے ہیں اور اپنی باری کا انتظار کرتے ہیں!",
                    ps = "موږ خپل ټولګی پاک ساتو، د ښوونکي خبرې په غور اورو او خپل وار ته انتظار باسو!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "🏫",
                titleEn = "Zara's Classroom Manners",
                subtitleEn = "1. Keep classroom clean • 2. Share things • 3. Respect teachers • 4. Wait for your turn",
                explain = TrilingualText(
                    en = "Miss Anum and the students welcome Zara and share golden classroom rules!",
                    ur = "مس انعم اور بچے زارا کو خوش آمدید کہتے ہیں اور کلاس کے سنہری اصول بتاتے ہیں!",
                    ps = "آغلې انعم او زده کوونکي زارا ته ښه راغلاست وایي او د ټولګي طلایي اصول ورته ښیي!"
                )
            ),
            LessonCardItem(
                emoji = "🔗",
                titleEn = "Grammar: Use of 'is', 'am', 'are'",
                subtitleEn = "I am • He/She/It is • We/You/They are",
                explain = TrilingualText(
                    en = "Use 'am' with I, 'is' with singular (he, she, it), and 'are' with plural (we, you, they).",
                    ur = "I کے ساتھ am، واحد (He, She, It) کے ساتھ is، اور جمع (We, You, They) کے ساتھ are آتا ہے۔",
                    ps = "له I سره am، له مفرد (He, She, It) سره is، او له جمع (We, You, They) سره are راځي."
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "👩‍🏫",
                question = TrilingualText(
                    en = "Miss Anum ___ our Grade 1 English teacher.",
                    ur = "مس انعم ہماری پہلی جماعت کی انگریزی کی استانی ہیں: Miss Anum ___ our teacher.",
                    ps = "آغلې انعم زموږ د لومړي ټولګي ښوونکې ده: Miss Anum ___ our teacher."
                ),
                correctAnswer = "is",
                options = listOf("is", "am", "are"),
                explain = TrilingualText(
                    en = "Miss Anum is one person (singular), so we use 'is'!",
                    ur = "مس انعم واحد ہیں اس لیے 'is' آئے گا!",
                    ps = "آغلې انعم یو شخص (مفرد) ده نو ځکه 'is' راځي!"
                )
            )
        )
    ),

    // 15. Unit 8: Nature is Beautiful (Pages 77–85)
    BookPageMeta(
        pageNumber = 77,
        pillLabel = "Unit 8 • Nature",
        titleEn = "Unit 8 (Pages 77–85): Nature is Beautiful",
        pageRangeText = "Pages 77–85",
        subtitle = TrilingualText(
            en = "Poem 'It's Spring', Seasons & Weather, Alphabetical Order, Parts of Body & Adjectives",
            ur = "نظم 'بہار آ گئی ہے'، موسم، حروف تہجی کی ترتیب، جسم کے حصے اور صفت کے الفاظ",
            ps = "نظم 'پسرلی دی'، موسمونه، د الفبا ترتیب، د بدن غړي او صفتونه"
        ),
        gameBadge = "🐸 Spring Hop",
        mechanic = ArcadeStageMechanic.FROG_LILYPAD_HOP,
        mascotEmoji = "🌺",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "❄️➔🌸",
                promptTitle = "Poem: It's Spring!",
                promptSub = TrilingualText(
                    en = "Good-bye, snow! Good-bye, ice! Now it is a fine ___ day!",
                    ur = "برف کو الوداع! سردی کو الوداع! اب کون سا سہانا موسم آ گیا ہے؟",
                    ps = "واورې ته دې خدای پامان وي! اوس کوم ښکلی موسم راغلی دی؟"
                ),
                correctAnswer = "spring",
                options = listOf("spring", "winter", "night"),
                voiceExplain = TrilingualText(
                    en = "When winter snow goes away, beautiful flowers bloom in Spring!",
                    ur = "جب سردی ختم ہوتی ہے تو بہار (Spring) کا خوبصورت موسم آتا ہے اور پھول کھلتے ہیں!",
                    ps = "کله چې ژمی ختم شي نو د پسرلي (Spring) ښکلی موسم راځي او ګلونه غوړیږي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👀👃",
                promptTitle = "Parts of the Body",
                promptSub = TrilingualText(
                    en = "Which part of the body do we use to smell flowers?",
                    ur = "ہم پھولوں کی خوشبو سونگھنے کے لیے جسم کا کون سا حصہ استعمال کرتے ہیں؟",
                    ps = "موږ د ګلونو د بویولو لپاره د بدن کوم غړی کاروو؟"
                ),
                correctAnswer = "nose",
                options = listOf("nose", "ear", "foot"),
                voiceExplain = TrilingualText(
                    en = "We smell with our nose, see with our eyes, and hear with our ears!",
                    ur = "ہم ناک (nose) سے سونگھتے ہیں، آنکھوں (eyes) سے دیکھتے ہیں اور کانوں (ears) سے سنتے ہیں!",
                    ps = "موږ په پوزه (nose) بویوو، په سترګو (eyes) وینو او په غوږونو (ears) اورو!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🔤📋",
                promptTitle = "Alphabetical Order",
                promptSub = TrilingualText(
                    en = "Which word comes FIRST in ABC alphabetical order?",
                    ur = "حروف تہجی (ABC) کی ترتیب میں کون سا لفظ سب سے پہلے آئے گا؟",
                    ps = "د الفبا (ABC) په ترتیب کې کوم توری تر ټولو مخکې راځي؟"
                ),
                correctAnswer = "apple",
                options = listOf("apple", "mango", "zebra"),
                voiceExplain = TrilingualText(
                    en = "'apple' starts with A, so it comes first before mango (M) and zebra (Z)!",
                    ur = "'apple' حرف A سے شروع ہوتا ہے اس لیے M اور Z سے پہلے آتا ہے!",
                    ps = "'apple' په A پیل کیږي نو ځکه له M او Z نه مخکې راځي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "☀️🔥",
                promptTitle = "Riddle in the Poem",
                promptSub = TrilingualText(
                    en = "My heat warms the air and shines in the sky. What am I?",
                    ur = "میری حرارت ہوا کو گرم کرتی ہے اور میں آسمان پر چمکتا ہوں۔ بتائیں میں کون ہوں؟",
                    ps = "زما تودوخه هوا ګرموي او په اسمان کې ځلېږم. زه څوک یم؟"
                ),
                correctAnswer = "The Sun",
                options = listOf("The Sun", "The Moon", "Ice"),
                voiceExplain = TrilingualText(
                    en = "The bright Sun warms the air and brings sunny weather!",
                    ur = "سورج (The Sun) ہوا کو گرم کرتا ہے اور دھوپ دیتا ہے!",
                    ps = "لمر (The Sun) هوا تودوي او رڼا ورکوي!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "🌷",
                titleEn = "Poem: It's Spring (by Winnifred Mott)",
                subtitleEn = "Good-bye, snow! Good-bye, ice! I'm so glad because it's spring!",
                explain = TrilingualText(
                    en = "The four seasons (Spring, Summer, Autumn, Winter) are blessings of Allah.",
                    ur = "چاروں موسم (بہار، گرمی، خزاں، سردی) اللہ تعالیٰ کی پیاری نعمتیں ہیں۔",
                    ps = "څلور واړه موسمونه (پسرلی، اوړی، منی، ژمی) د الله تعالی نعمتونه دي."
                )
            ),
            LessonCardItem(
                emoji = "🖐️",
                titleEn = "Parts of the Body & Adjectives",
                subtitleEn = "eyes, nose, ears, hands, feet • soft, cold, green, bright",
                explain = TrilingualText(
                    en = "Adjectives of quality and colour describe nouns, like 'fine spring day' and 'green grass'.",
                    ur = "کسی چیز کی خوبی، رنگ یا کیفیت بتانے والے الفاظ کو Adjectives کہتے ہیں، جیسے سبز گھاس!",
                    ps = "د یوه شي د ښه والي یا رنګ ښودونکو تورو ته Adjectives وایي، لکه شنه واښه!"
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "❄️",
                question = TrilingualText(
                    en = "Which word rhymes with 'snow'?",
                    ur = "'snow' کا ہم قافیہ لفظ کون سا ہے؟",
                    ps = "له 'snow' سره هم غږی توری کوم دی؟"
                ),
                correctAnswer = "glow",
                options = listOf("glow", "ice", "sun"),
                explain = TrilingualText(
                    en = "Snow and glow end with the same sound!",
                    ur = "Snow اور glow ہم قافیہ الفاظ ہیں!",
                    ps = "Snow او glow هم غږي توري دي!"
                )
            )
        )
    ),

    // 16. Unit 9: A Greeting Card (Pages 86–95)
    BookPageMeta(
        pageNumber = 86,
        pillLabel = "Unit 9 • Eid Card",
        titleEn = "Unit 9 (Pages 86–95): A Greeting Card",
        pageRangeText = "Pages 86–95",
        subtitle = TrilingualText(
            en = "Ayyan & Maham's Eid Card, Ordinal Numbers (1st, 2nd, 3rd), Colour Adjectives & Polite Requests",
            ur = "ایان اور ماہم کا عید کارڈ، ترتیبی گنتی (First, Second, Third)، رنگوں کی صفت اور التجا",
            ps = "د ایان او ماهم د اختر کارټ، ترتیبي شمېرې (First, Second, Third) او د رنګونو صفتونه"
        ),
        gameBadge = "🌈 Card Builder",
        mechanic = ArcadeStageMechanic.RAINBOW_BRIDGE_BUILDER,
        mascotEmoji = "💌",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "💌🌙",
                promptTitle = "Ayyan & Maham's Card",
                promptSub = TrilingualText(
                    en = "What festival greeting do Maham and Ayyan write on the card?",
                    ur = "ماہم اور ایان کارڈ پر کون سی مبارکباد لکھتے ہیں؟",
                    ps = "ماهم او ایان په کارټ باندې کومه مبارکي لیکي؟"
                ),
                correctAnswer = "Eid Mubarak",
                options = listOf("Eid Mubarak", "Good Night", "Sorry"),
                voiceExplain = TrilingualText(
                    en = "Maham writes 'Eid Mubarak' on the card for their cousin Asma!",
                    ur = "ماہم اور ایان اپنی کزن اسماء کے لیے کارڈ پر 'Eid Mubarak' لکھتے ہیں!",
                    ps = "ماهم او ایان د خپلې ترور لور اسما لپاره په کارټ 'Eid Mubarak' لیکي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🥇🥈🥉",
                promptTitle = "Ordinal Numbers",
                promptSub = TrilingualText(
                    en = "First (1st), Second (2nd), and what comes next (3rd)?",
                    ur = "پہلا (First)، دوسرا (Second)، اور تیسرا (3rd) کو انگریزی میں کیا کہتے ہیں؟",
                    ps = "لومړی (First)، دویم (Second)، او درېیم (3rd) ته په انګلیسي کې څه وایي؟"
                ),
                correctAnswer = "Third",
                options = listOf("Third", "Three", "Ten"),
                voiceExplain = TrilingualText(
                    en = "First (1st), Second (2nd), Third (3rd) are Ordinal Numbers that show order!",
                    ur = "ترتیب بتانے کے لیے First (پہلا)، Second (دوسرا) اور Third (تیسرا) استعمال ہوتے ہیں!",
                    ps = "د ترتیب ښودلو لپاره First (لومړی)، Second (دویم) او Third (درېیم) کارول کیږي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🧼🚰",
                promptTitle = "Cleanliness Habit",
                promptSub = TrilingualText(
                    en = "What did Ayyan and Maham do with soap and water after finishing their craft?",
                    ur = "کام ختم کرنے کے بعد ایان اور ماہم نے صابن اور پانی سے کیا کیا؟",
                    ps = "د کار له بشپړولو وروسته ایان او ماهم په صابون او اوبو څه وکړل؟"
                ),
                correctAnswer = "Washed hands",
                options = listOf("Washed hands", "Slept", "Ran away"),
                voiceExplain = TrilingualText(
                    en = "They cleaned the table and washed their hands with soap and water!",
                    ur = "انہوں نے میز صاف کی اور صابن اور پانی سے اپنے ہاتھ دھوئے!",
                    ps = "هغوی مېز پاک کړ او خپل لاسونه یې په صابون او اوبو پرېمنځل!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🌹❤️",
                promptTitle = "Adjective of Colour",
                promptSub = TrilingualText(
                    en = "In 'She drew a red flower', which word is the Adjective of Colour?",
                    ur = "جملے 'She drew a red flower' میں رنگ بتانے والا لفظ (Adjective) کون سا ہے؟",
                    ps = "په 'She drew a red flower' جمله کې د رنګ ښودونکی توری کوم دی؟"
                ),
                correctAnswer = "red",
                options = listOf("red", "flower", "drew"),
                voiceExplain = TrilingualText(
                    en = "'red' is an adjective of colour because it tells the colour of the flower!",
                    ur = "'red' (سرخ) رنگ کی صفت ہے کیونکہ یہ پھول کا رنگ بتاتا ہے!",
                    ps = "'red' (سور) د رنګ صفت دی ځکه چې د ګل رنګ ښیي!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "💌",
                titleEn = "How to Make a Greeting Card (3 Steps)",
                subtitleEn = "First: Fold paper in half • Second: Draw & colour flowers • Third: Write Eid Mubarak!",
                explain = TrilingualText(
                    en = "Ayyan and Maham share their colour pencils, make an Eid card, and clean their table afterwards.",
                    ur = "ایان اور ماہم آپس میں کلر پنسلیں بانٹتے ہیں، عید کارڈ بناتے ہیں اور بعد میں میز صاف کرتے ہیں۔",
                    ps = "ایان او ماهم خپل رنګه پنسلونه شریکوي، د اختر کارټ جوړوي او وروسته مېز پاکوي."
                )
            ),
            LessonCardItem(
                emoji = "🥇",
                titleEn = "Ordinal Numbers (1st to 5th)",
                subtitleEn = "1st = First • 2nd = Second • 3rd = Third • 4th = Fourth • 5th = Fifth",
                explain = TrilingualText(
                    en = "Ordinal numbers tell the position or step in order!",
                    ur = "پوزیشن یا مرحلہ بتانے والے نمبروں کو Ordinal Numbers کہتے ہیں!",
                    ps = "هغو شمېرو ته چې درجه یا پړاو ښیي Ordinal Numbers وایي!"
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "🌸",
                question = TrilingualText(
                    en = "For whom did Ayyan and Maham make the Eid card?",
                    ur = "ایان اور ماہم نے کس کے لیے عید کارڈ بنایا؟",
                    ps = "ایان او ماهم د چا لپاره د اختر کارټ جوړ کړ؟"
                ),
                correctAnswer = "Cousin Asma",
                options = listOf("Cousin Asma", "Granny", "Cobbler"),
                explain = TrilingualText(
                    en = "They wrote 'Dear Asma, Eid Mubarak!' for their cousin Asma!",
                    ur = "انہوں نے اپنی کزن اسماء کے لیے عید کارڈ بنایا!",
                    ps = "هغوی د خپلې ترور لور اسما لپاره د اختر کارټ جوړ کړ!"
                )
            )
        )
    ),

    // 17. Review 3 (Pages 96–98)
    BookPageMeta(
        pageNumber = 96,
        pillLabel = "Review 3",
        titleEn = "Review 3 (Pages 96–98): Units 6–9 Checkpoint",
        pageRangeText = "Pages 96–98",
        subtitle = TrilingualText(
            en = "Review Rhyming Words (swing/ring, tall/fall), Alphabetical Order, Sight Words & Vocabulary",
            ur = "یونٹ 6 سے 9 کی دہرائی: ہم قافیہ الفاظ، حروف تہجی کی ترتیب اور الفاظ کے معانی",
            ps = "د ۶ نه تر ۹ یونټونو تکرار: هم غږي توري، د الفبا ترتیب او د تورو ماناوې"
        ),
        gameBadge = "💎 Review 3 Chest",
        mechanic = ArcadeStageMechanic.TREASURE_CHEST_UNLOCK,
        mascotEmoji = "🗝️",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🔔🎠",
                promptTitle = "Rhyme Match: 'swing'",
                promptSub = TrilingualText(
                    en = "Which word rhymes with 'swing'?",
                    ur = "لفظ 'swing' (جھولا) کا ہم قافیہ لفظ کون سا ہے؟",
                    ps = "له 'swing' (زغلنده) سره هم غږی توری کوم دی؟"
                ),
                correctAnswer = "ring",
                options = listOf("ring", "fall", "sleep"),
                voiceExplain = TrilingualText(
                    en = "Swing and ring rhyme together! Tall rhymes with fall, and keep rhymes with sleep!",
                    ur = "Swing اور ring ہم قافیہ ہیں! اسی طرح tall/fall اور keep/sleep ہم قافیہ ہیں!",
                    ps = "Swing او ring هم غږي دي! همدارنګه tall/fall او keep/sleep هم غږي دي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🚌🐪🔑",
                promptTitle = "ABC Order Challenge",
                promptSub = TrilingualText(
                    en = "Between 'bus', 'camel', and 'key', which comes FIRST in ABC order?",
                    ur = "'bus'، 'camel' اور 'key' میں سے ABC کی ترتیب میں سب سے پہلے کون سا لفظ آتا ہے؟",
                    ps = "په 'bus'، 'camel' او 'key' کې د ABC په ترتیب لومړی کوم توری راځي؟"
                ),
                correctAnswer = "bus",
                options = listOf("bus", "camel", "key"),
                voiceExplain = TrilingualText(
                    en = "'bus' starts with B, so it comes first: 1. bus, 2. camel, 3. key!",
                    ur = "'bus' حرف B سے شروع ہوتا ہے اس لیے سب سے پہلے آتا ہے!",
                    ps = "'bus' په B پیل کیږي نو ځکه تر ټولو مخکې راځي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🛌💤",
                promptTitle = "Rhyme Match: 'keep'",
                promptSub = TrilingualText(
                    en = "Which word rhymes with 'keep'?",
                    ur = "'keep' کا ہم قافیہ لفظ کون سا ہے؟",
                    ps = "له 'keep' سره هم غږی توری کوم دی؟"
                ),
                correctAnswer = "sleep",
                options = listOf("sleep", "ring", "tall"),
                voiceExplain = TrilingualText(
                    en = "Keep and sleep rhyme with each other!",
                    ur = "Keep اور sleep کی آخری آواز ایک جیسی ہے!",
                    ps = "د Keep او sleep وروستی غږ یو شان دی!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🤝🎁",
                promptTitle = "Vocabulary: 'share'",
                promptSub = TrilingualText(
                    en = "What does 'share' mean?",
                    ur = "لفظ 'share' کا کیا مطلب ہے؟",
                    ps = "د 'share' توري مانا څه ده؟"
                ),
                correctAnswer = "give a part to others",
                options = listOf("give a part to others", "fight with others", "hide things"),
                voiceExplain = TrilingualText(
                    en = "Share means to give a part of what we have to others!",
                    ur = "Share کا مطلب اپنی چیزوں میں دوسروں کو شریک کرنا یا بانٹنا ہے!",
                    ps = "Share مانا له نورو سره خپل شیان شریکول دي!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "🏅",
                titleEn = "Review 3 Summary",
                subtitleEn = "Rhymes: swing-ring, tall-fall, keep-sleep • ABC Order: bus, camel, key, nose, rain, zoo",
                explain = TrilingualText(
                    en = "You completed Units 6 to 9! Let's review rhyming words and alphabetical order.",
                    ur = "شاباش! آپ نے یونٹ 6 سے 9 مکمل کر لیے۔ ہم قافیہ الفاظ اور ABC ترتیب یاد رکھیں۔",
                    ps = "آفرین! تاسو له ۶ نه تر ۹ یونټونه بشپړ کړل. هم غږي توري او د ABC ترتیب په یاد ولرئ."
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "🌲",
                question = TrilingualText(
                    en = "Which word rhymes with 'tall'?",
                    ur = "'tall' کا ہم قافیہ لفظ کون سا ہے؟",
                    ps = "له 'tall' سره هم غږی توری کوم دی؟"
                ),
                correctAnswer = "fall",
                options = listOf("fall", "ring", "sleep"),
                explain = TrilingualText(
                    en = "Tall and fall are rhyming words!",
                    ur = "Tall اور fall ہم قافیہ الفاظ ہیں!",
                    ps = "Tall او fall هم غږي توري دي!"
                )
            )
        )
    ),

    // 18. Unit 10: The Hare and the Tortoise (Pages 99–107)
    BookPageMeta(
        pageNumber = 99,
        pillLabel = "Unit 10 • Hare & Tortoise",
        titleEn = "Unit 10 (Pages 99–107): The Hare and the Tortoise",
        pageRangeText = "Pages 99–107",
        subtitle = TrilingualText(
            en = "The Famous Jungle Race Story, Possessive Words (my, your, our), Commands & Speech Bubbles",
            ur = "خرگوش اور کچھوے کی دوڑ کی کہانی، ملکیت والے الفاظ (my, your, our) اور حکمیہ جملے",
            ps = "د سوی او شمشتۍ د منډې کیسه، د ملکیت توري (my, your, our) او امرونه"
        ),
        gameBadge = "🐢🐇 Jungle Race",
        mechanic = ArcadeStageMechanic.RACE_TRACK_TURBO,
        mascotEmoji = "🐢",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🐇🌳💤",
                promptTitle = "Why the Hare Lost",
                promptSub = TrilingualText(
                    en = "What did the proud hare do under the tree during the race?",
                    ur = "دوڑ کے دوران مغرور خرگوش نے درخت کے نیچے کیا کیا؟",
                    ps = "د منډې پر مهال مغرور سوی د ونې لاندې څه وکړل؟"
                ),
                correctAnswer = "He slept",
                options = listOf("He slept", "He studied", "He swam"),
                voiceExplain = TrilingualText(
                    en = "The hare thought he had plenty of time and slept under a tree!",
                    ur = "خرگوش نے سوچا اس کے پاس بہت وقت ہے اور وہ درخت کے نیچے سو گیا (He slept)!",
                    ps = "سوی فکر وکړ چې ډېر وخت لري او د ونې لاندې ویده شو (He slept)!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🐢🏁🏆",
                promptTitle = "Winner of the Race",
                promptSub = TrilingualText(
                    en = "Who walked slowly without stopping and WON the race?",
                    ur = "کون بغیر رکے آہستہ آہستہ چلتا رہا اور دوڑ جیت گیا؟",
                    ps = "څوک بې له درېدو ورو ورو روان و او سیالي یې وګټله؟"
                ),
                correctAnswer = "The Tortoise",
                options = listOf("The Tortoise", "The Hare", "The Lion"),
                voiceExplain = TrilingualText(
                    en = "Slow and steady wins the race! The Tortoise won the race!",
                    ur = "کچھوا (The Tortoise) مسلسل چلتا رہا اور دوڑ جیت گیا! مستقل مزاجی سے کامیابی ملتی ہے!",
                    ps = "شمشتۍ (The Tortoise) پرله پسې روانه وه او سیالي یې وګټله!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🎒👦",
                promptTitle = "Possessive Word: 'my'",
                promptSub = TrilingualText(
                    en = "I am Ali. This is ___ school bag. (my, your, our)",
                    ur = "میں علی ہوں۔ یہ ___ اسکول بیگ ہے۔",
                    ps = "زه علي یم. دا ___ د ښوونځي بکس دی."
                ),
                correctAnswer = "my",
                options = listOf("my", "your", "they"),
                voiceExplain = TrilingualText(
                    en = "'my', 'your', and 'our' are words showing possession (belonging)!",
                    ur = "'my' (میرا)، 'your' (تمہارا) اور 'our' (ہمارا) ملکیت ظاہر کرنے والے الفاظ ہیں!",
                    ps = "'my' (زما)، 'your' (ستا) او 'our' (زموږ) د ملکیت ښودلو توري دي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🏫👨‍👩‍👧‍👦",
                promptTitle = "Possessive Word: 'our'",
                promptSub = TrilingualText(
                    en = "We read in Grade 1. This is ___ classroom!",
                    ur = "ہم پہلی جماعت میں پڑھتے ہیں۔ یہ ___ کمرہ جماعت ہے!",
                    ps = "موږ په لومړي ټولګي کې لولو. دا ___ ټولګی دی!"
                ),
                correctAnswer = "our",
                options = listOf("our", "he", "she"),
                voiceExplain = TrilingualText(
                    en = "With 'We', we use 'our' to show something belongs to all of us!",
                    ur = "'We' (ہم) کے ساتھ 'our' (ہمارا) استعمال ہوتا ہے!",
                    ps = "له 'We' (موږ) سره 'our' (زموږ) کارول کیږي!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "🐢",
                titleEn = "Story: The Hare and the Tortoise",
                subtitleEn = "The proud hare slept under a tree, while the steady tortoise reached the finish line and won!",
                explain = TrilingualText(
                    en = "Never make fun of others! Slow and steady effort always wins.",
                    ur = "کبھی کسی کا مذاق نہیں اڑانا چاہیے! محنت اور مستقل مزاجی ہمیشہ جیتتی ہے۔",
                    ps = "هیڅکله په چا پورې مه خاندئ! پرله پسې هڅه او زیار تل بریالی کیږي."
                )
            ),
            LessonCardItem(
                emoji = "🤝",
                titleEn = "Possessive Words: my, your, our",
                subtitleEn = "my book • your pencil • our school",
                explain = TrilingualText(
                    en = "Possessive words tell who owns something: my (mine), your (yours), our (ours).",
                    ur = "یہ الفاظ بتاتے ہیں کہ کوئی چیز کس کی ہے: my (میری)، your (تمہاری)، our (ہماری)۔",
                    ps = "دا توري ښیي چې یو شی د چا دی: my (زما)، your (ستا)، our (زموږ)."
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "🐇",
                question = TrilingualText(
                    en = "How did the hare feel at the end of the race?",
                    ur = "دوڑ ہارنے کے بعد آخر میں خرگوش کو کیسا محسوس ہوا؟",
                    ps = "د سیالۍ په پای کې سوی څنګه احساس وکړ؟"
                ),
                correctAnswer = "Ashamed",
                options = listOf("Ashamed", "Proud", "Sleepy"),
                explain = TrilingualText(
                    en = "The hare felt ashamed for making fun of the tortoise!",
                    ur = "خرگوش کچھوے کا مذاق اڑانے پر شرمندہ (Ashamed) ہوا!",
                    ps = "سوی په شمشتۍ پورې د خندلو له امله شرمنده (Ashamed) شو!"
                )
            )
        )
    ),

    // 19. Unit 11: Love Animals (Pages 108–115)
    BookPageMeta(
        pageNumber = 108,
        pillLabel = "Unit 11 • Pets",
        titleEn = "Unit 11 (Pages 108–115): Love Animals",
        pageRangeText = "Pages 108–115",
        subtitle = TrilingualText(
            en = "Poem 'My Kitty Cat', Plural /s/ & /z/ Sounds, Possessives (his, her, their), Calendar & Comma",
            ur = "نظم 'میری پیاری بلی'، جمع کی آوازیں (/s/ اور /z/)، his/her/their، کیلنڈر اور کوما (,)",
            ps = "نظم 'زما ګرانه پیشو'، د جمع غږونه (/s/ او /z/)، his/her/their، کلیزه او کامه (,)"
        ),
        gameBadge = "🐱 Kitty Jump",
        mechanic = ArcadeStageMechanic.FROG_LILYPAD_HOP,
        mascotEmoji = "🐱",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🐱🖤🤍",
                promptTitle = "My Kitty Cat Poem",
                promptSub = TrilingualText(
                    en = "My kitty cat is black and white / She sleeps all day and plays all ___!",
                    ur = "نظم مکمل کریں: میری بلی کالی اور سفید ہے، وہ سارا دن سوتی ہے اور ساری ___ کھیلتی ہے!",
                    ps = "نظم بشپړ کړئ: زما پیشو توره او سپینه ده، ټوله ورځ ویده وي او ټوله ___ لوبې کوي!"
                ),
                correctAnswer = "night",
                options = listOf("night", "morning", "week"),
                voiceExplain = TrilingualText(
                    en = "'white' and 'night' rhyme! My kitty cat sleeps all day and plays all night!",
                    ur = "'white' اور 'night' ہم قافیہ ہیں! بلی دن میں آرام کرتی ہے اور رات کو کھیلتی ہے!",
                    ps = "'white' او 'night' هم غږي دي! پیشو د ورځې ویده وي او د شپې لوبې کوي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👧🐱",
                promptTitle = "Possessive: his, her, their",
                promptSub = TrilingualText(
                    en = "Sana is a girl. This is ___ cat.",
                    ur = "ثناء ایک لڑکی ہے۔ یہ ___ بلی ہے۔ (his, her, their)",
                    ps = "ثنا یوه نجلۍ ده. دا د ___ پیشو ده. (his, her, their)"
                ),
                correctAnswer = "her",
                options = listOf("her", "his", "their"),
                voiceExplain = TrilingualText(
                    en = "We use 'her' for a girl, 'his' for a boy, and 'their' for more than one person!",
                    ur = "لڑکی کی چیز کے لیے 'her'، لڑکے کے لیے 'his' اور زیادہ لوگوں کے لیے 'their' آتا ہے!",
                    ps = "د نجلۍ لپاره 'her'، د هلک لپاره 'his' او د ډېرو کسانو لپاره 'their' راځي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "👦🚗",
                promptTitle = "Possessive for a Boy",
                promptSub = TrilingualText(
                    en = "Ahmed is a boy. This is ___ toy car.",
                    ur = "احمد ایک لڑکا ہے۔ یہ ___ کھلونا گاڑی ہے۔",
                    ps = "احمد یو هلک دی. دا د ___ لوبتکه موټر دی."
                ),
                correctAnswer = "his",
                options = listOf("his", "her", "my"),
                voiceExplain = TrilingualText(
                    en = "Ahmed is a boy, so we say 'This is his car'!",
                    ur = "احمد لڑکا ہے، اس لیے 'his car' (اس کی گاڑی) کہیں گے!",
                    ps = "احمد هلک دی، نو ځکه 'his car' (د هغه موټر) وایو!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🦆📚",
                promptTitle = "Plural /s/ vs /z/ Sound",
                promptSub = TrilingualText(
                    en = "Which plural word ends with a buzzing /z/ sound?",
                    ur = "ان میں سے کس جمع لفظ کے آخر میں 'ز' (/z/) کی آواز آتی ہے؟",
                    ps = "په دې جمع تورو کې د کوم یوه په پای کې د 'ز' (/z/) غږ راځي؟"
                ),
                correctAnswer = "beds",
                options = listOf("beds", "ducks", "books"),
                voiceExplain = TrilingualText(
                    en = "'ducks' and 'books' end with /s/, while 'beds' and 'hens' end with a /z/ sound!",
                    ur = "ducks اور books کے آخر میں 'س' (/s/) جبکہ beds اور hens کے آخر میں 'ز' (/z/) کی آواز آتی ہے!",
                    ps = "د ducks او books په پای کې '/s/' او د beds او hens په پای کې د '/z/' غږ راځي!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "🐾",
                titleEn = "Poem: My Kitty Cat",
                subtitleEn = "My kitty cat is black and white, She sleeps all day and plays all night.",
                explain = TrilingualText(
                    en = "We should love animals, feed them on time, and never keep birds or animals locked in cages.",
                    ur = "ہمیں جانوروں سے پیار کرنا چاہیے، انہیں وقت پر کھانا دینا چاہیے اور پنجرے میں قید نہیں کرنا چاہیے۔",
                    ps = "موږ باید له څارویو سره مینه وکړو، خواړه ورکړو او په قفس کې یې بند نه کړو."
                )
            ),
            LessonCardItem(
                emoji = "📅",
                titleEn = "His, Her, Their & The Comma (,)",
                subtitleEn = "his (boy) • her (girl) • their (plural) • Comma separates items: red, black and green",
                explain = TrilingualText(
                    en = "Use commas (,) to separate items in a list: apples, mangoes, and bananas.",
                    ur = "فہرست میں چیزوں کو الگ کرنے کے لیے کوما (,) لگاتے ہیں، جیسے: red, black and green۔",
                    ps = "په نوملړ کې د شیانو جلا کولو لپاره کامه (,) کارول کیږي، لکه: red, black and green."
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "👦👦",
                question = TrilingualText(
                    en = "Nawab and Ibrar are brothers. Mr. Asif is ___ uncle.",
                    ur = "نواب اور ابرار بھائی ہیں۔ مسٹر آصف ___ چچا ہیں۔",
                    ps = "نواب او ابرار وروڼه دي. ښاغلی اصف د ___ تره دی."
                ),
                correctAnswer = "their",
                options = listOf("their", "his", "her"),
                explain = TrilingualText(
                    en = "For two or more people (Nawab and Ibrar), we use 'their'!",
                    ur = "نواب اور ابرار دو ہیں، اس لیے 'their' (ان کے) آئے گا!",
                    ps = "نواب او ابرار دوه کسان دي، نو ځکه 'their' (د هغوی) راځي!"
                )
            )
        )
    ),

    // 20. Review 4 (Pages 116–120): Grand Finale
    BookPageMeta(
        pageNumber = 116,
        pillLabel = "Review 4 • Finale",
        titleEn = "Review 4 (Pages 116–120): Grand Book Finale!",
        pageRangeText = "Pages 116–120",
        subtitle = TrilingualText(
            en = "Complete Class 1 English Championship: Plurals, Capitalisation, Punctuation, Possessives & Commands",
            ur = "پہلی جماعت کی انگریزی کتاب کا گرینڈ فائنل: جمع، بڑے حروف، رموز اوقاف اور گرامر چیمپئن شپ!",
            ps = "د لومړي ټولګي د انګلیسي کتاب وروستۍ برخه: جمع، غټ توري، نښې او د ګرامر اتلولي!"
        ),
        gameBadge = "🏆 Grand Finale",
        mechanic = ArcadeStageMechanic.TREASURE_CHEST_UNLOCK,
        mascotEmoji = "👑",
        rounds = listOf(
            ArcadeRoundItem(
                promptEmoji = "🌅🐓",
                promptTitle = "Vocabulary: 'dawn'",
                promptSub = TrilingualText(
                    en = "In 'At dawn she knows when to be fed', what does 'dawn' mean?",
                    ur = "لفظ 'dawn' کا کیا مطلب ہے؟",
                    ps = "د 'dawn' توري مانا څه ده؟"
                ),
                correctAnswer = "Early morning",
                options = listOf("Early morning", "Late night", "Afternoon"),
                voiceExplain = TrilingualText(
                    en = "Dawn means early morning when the sun first rises!",
                    ur = "Dawn کا مطلب صبح سویرے (فجر/طلوع آفتاب کا وقت) ہے!",
                    ps = "Dawn مانا سهار وختي (سباؤن) دی!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "✍️❓",
                promptTitle = "Capital Letter & Question Mark",
                promptSub = TrilingualText(
                    en = "Fix the sentence: 'where are you going'",
                    ur = "جملے کو درست کریں: 'where are you going'",
                    ps = "دا جمله سمه کړئ: 'where are you going'"
                ),
                correctAnswer = "Where are you going?",
                options = listOf("Where are you going?", "where are you going.", "Where are you going,"),
                voiceExplain = TrilingualText(
                    en = "Start with a Capital 'W' and end the question with a Question Mark '?'!",
                    ur = "شروع میں بڑا 'W' اور سوال کے آخر میں سوالیہ نشان '?' لگائیں!",
                    ps = "په پیل کې غټ 'W' او د پوښتنې په پای کې د پوښتنې نښه '?' کېږدئ!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🎨📝",
                promptTitle = "Adding the Comma (,)",
                promptSub = TrilingualText(
                    en = "Where does the comma go in: 'red ___ black and green'?",
                    ur = "'red ___ black and green' میں کوما کہاں آئے گا؟",
                    ps = "په 'red ___ black and green' کې کامه چېرته راځي؟"
                ),
                correctAnswer = "red, black and green.",
                options = listOf("red, black and green.", "red black, and green", "red black and, green"),
                voiceExplain = TrilingualText(
                    en = "We put a comma between red and black: My favourite colours are red, black and green.",
                    ur = "پہلے دو رنگوں (red, black) کے درمیان کوما آتا ہے!",
                    ps = "د لومړیو دوو رنګونو (red, black) ترمنځ کامه راځي!"
                )
            ),
            ArcadeRoundItem(
                promptEmoji = "🗣️👆",
                promptTitle = "Spot the Command",
                promptSub = TrilingualText(
                    en = "Which sentence is a COMMAND (telling someone to do something)?",
                    ur = "ان میں سے کون سا جملہ حکمیہ (Command) ہے؟",
                    ps = "په دې کې کومه جمله امر (Command) دی؟"
                ),
                correctAnswer = "Open your book.",
                options = listOf("Open your book.", "I am six.", "She is happy."),
                voiceExplain = TrilingualText(
                    en = "'Open your book.' and 'Keep quiet.' are commands! Congratulations on finishing the whole book!",
                    ur = "'Open your book.' (اپنی کتاب کھولو) ایک حکمیہ جملہ ہے! پوری کتاب مکمل کرنے پر مبارک ہو!",
                    ps = "'Open your book.' (خپل کتاب پرانیزه) یوه امریه جمله ده! د ټول کتاب د بشپړولو مبارکي درکوم!"
                )
            )
        ),
        lessons = listOf(
            LessonCardItem(
                emoji = "👑",
                titleEn = "Congratulations! Grade 1 English Complete!",
                subtitleEn = "You mastered Units 1 to 11 and all 4 Reviews of KPTBB English Grade 1!",
                explain = TrilingualText(
                    en = "You learned Alphabet sounds, Blends, Digraphs, Nouns, Pronouns, Plurals, Adjectives, Possessives, and Punctuation!",
                    ur = "مبارک ہو! آپ نے پہلی جماعت کی مکمل انگریزی کتاب (تمام 11 یونٹس اور 4 ریویوز) کامیابی سے سیکھ لی ہے!",
                    ps = "مبارک شه! تاسو د لومړي ټولګي بشپړ انګلیسي کتاب (ټول ۱۱ یونټونه او ۴ تکرارونه) په بریالیتوب سره زده کړل!"
                )
            )
        ),
        exercises = listOf(
            ExerciseQuizItem(
                emoji = "📘",
                question = TrilingualText(
                    en = "Which word in 'my favourite subject is english' needs a Capital 'E'?",
                    ur = "'my favourite subject is english' میں کس لفظ کا پہلا حرف بڑا 'E' ہونا چاہیے؟",
                    ps = "په 'my favourite subject is english' کې د کوم توري لومړی توری باید غټ 'E' وي؟"
                ),
                correctAnswer = "English",
                options = listOf("English", "subject", "favourite"),
                explain = TrilingualText(
                    en = "'English' is a Proper Noun (name of a language/subject), so it always starts with a Capital E!",
                    ur = "'English' ایک زبان اور مضمون کا خاص نام ہے، اس لیے ہمیشہ بڑے 'E' سے لکھا جاتا ہے!",
                    ps = "'English' د ژبې او مضمون ځانګړی نوم دی، نو تل په غټ 'E' لیکل کیږي!"
                )
            )
        )
    )
)

// ─── PAGE 2 DATA: 8 OBJECTS ───
data class Page2ObjectItem(
    val id: String,
    val word: String,
    val emoji: String,
    val initialLetter: String,
    val phoneticSound: String,
    val meaningUr: String,
    val meaningPs: String,
    val explanation: TrilingualText,
    val hint: TrilingualText,
    val cardColorHex: Long,
    val accentColorHex: Long
)

val PAGE_2_OBJECTS = listOf(
    Page2ObjectItem(
        id = "cat",
        word = "cat",
        emoji = "🐱",
        initialLetter = "C",
        phoneticSound = "/k/ (کَ)",
        meaningUr = "بلی",
        meaningPs = "پیشو",
        explanation = TrilingualText(
            en = "C says Kuh. C - A - T spells cat! The cute cat says meow.",
            ur = "C کی آواز 'کَ' ہے۔ C - A - T سے بنتا ہے Cat یعنی بلی!",
            ps = "د C غږ 'کَ' دی. C - A - T نه جوړیږي Cat یعنی پیشو!"
        ),
        hint = TrilingualText(
            en = "It says Meow, drinks milk, and starts with C!",
            ur = "یہ میاؤں کرتی ہے، دودھ پیتی ہے اور C سے شروع ہوتی ہے (بلی)!",
            ps = "دا میاو کوي، شیدې څښي او په C پیل کیږي (پیشو)!"
        ),
        cardColorHex = 0xFFFFF7ED,
        accentColorHex = 0xFFEA580C
    ),
    Page2ObjectItem(
        id = "hen",
        word = "hen",
        emoji = "🐔",
        initialLetter = "H",
        phoneticSound = "/h/ (ہَ)",
        meaningUr = "مرغی",
        meaningPs = "چرګه",
        explanation = TrilingualText(
            en = "H says Huh. H - E - N spells hen! The brown hen lays eggs.",
            ur = "H کی آواز 'ہَ' ہے۔ H - E - N سے بنتا ہے Hen یعنی مرغی!",
            ps = "د H غږ 'هَ' دی. H - E - N نه جوړیږي Hen یعنی چرګه!"
        ),
        hint = TrilingualText(
            en = "It is a farm bird that lays eggs and starts with H!",
            ur = "یہ انڈے دیتی ہے اور H سے شروع ہوتی ہے (مرغی)!",
            ps = "دا هګۍ اچوي او په H پیل کیږي (چرګه)!"
        ),
        cardColorHex = 0xFFFEF2F2,
        accentColorHex = 0xFFDC2626
    ),
    Page2ObjectItem(
        id = "hat",
        word = "hat",
        emoji = "👒",
        initialLetter = "H",
        phoneticSound = "/h/ (ہَ)",
        meaningUr = "ٹوپی",
        meaningPs = "خولۍ",
        explanation = TrilingualText(
            en = "H says Huh. H - A - T spells hat! We wear a hat on our head.",
            ur = "H کی آواز 'ہَ' ہے۔ H - A - T سے بنتا ہے Hat یعنی ٹوپی!",
            ps = "د H غږ 'هَ' دی. H - A - T نه جوړیږي Hat یعنی خولۍ!"
        ),
        hint = TrilingualText(
            en = "You wear it on your head in the sun!",
            ur = "اسے دھوپ میں سر پر پہنتے ہیں (ٹوپی)!",
            ps = "دا په سر باندې په لمر کې اچول کیږي (خولۍ)!"
        ),
        cardColorHex = 0xFFFEFCE8,
        accentColorHex = 0xFFCA8A04
    ),
    Page2ObjectItem(
        id = "pot",
        word = "pot",
        emoji = "🏺",
        initialLetter = "P",
        phoneticSound = "/p/ (پَ)",
        meaningUr = "مٹکا / برتن",
        meaningPs = "لوښی / منګی",
        explanation = TrilingualText(
            en = "P says Puh. P - O - T spells pot! A clay pot holds water.",
            ur = "P کی آواز 'پَ' ہے۔ P - O - T سے بنتا ہے Pot یعنی مٹی کا برتن یا مٹکا!",
            ps = "د P غږ 'پَ' دی. P - O - T نه جوړیږي Pot یعنی لوښی یا منګی!"
        ),
        hint = TrilingualText(
            en = "A brown clay vessel for water or cooking, starting with P!",
            ur = "مٹی کا برتن جس میں پانی یا کھانا رکھتے ہیں، P سے شروع ہوتا ہے!",
            ps = "د خاورو لوښی چې اوبه پکې ساتل کیږي او په P پیل کیږي!"
        ),
        cardColorHex = 0xFFFDF4FF,
        accentColorHex = 0xFF9333EA
    ),
    Page2ObjectItem(
        id = "net",
        word = "net",
        emoji = "🥅",
        initialLetter = "N",
        phoneticSound = "/n/ (نَ)",
        meaningUr = "جال",
        meaningPs = "جال",
        explanation = TrilingualText(
            en = "N says Nuh. N - E - T spells net! A net catches fish or butterflies.",
            ur = "N کی آواز 'نَ' ہے۔ N - E - T سے بنتا ہے Net یعنی جال!",
            ps = "د N غږ 'نَ' دی. N - E - T نه جوړیږي Net یعنی جال!"
        ),
        hint = TrilingualText(
            en = "Used to catch butterflies or fish, starting with N!",
            ur = "مچھلی یا تتلی پکڑنے والا جال جو N سے شروع ہوتا ہے!",
            ps = "د کبانو یا پتنګانو نیولو جال چې په N پیل کیږي!"
        ),
        cardColorHex = 0xFFF0FDF4,
        accentColorHex = 0xFF16A34A
    ),
    Page2ObjectItem(
        id = "sun",
        word = "sun",
        emoji = "☀️",
        initialLetter = "S",
        phoneticSound = "/s/ (سَ)",
        meaningUr = "سورج",
        meaningPs = "لمر",
        explanation = TrilingualText(
            en = "S says Suh. S - U - N spells sun! The bright sun shines in the sky.",
            ur = "S کی آواز 'سَ' ہے۔ S - U - N سے بنتا ہے Sun یعنی چمکتا ہوا سورج!",
            ps = "د S غږ 'سَ' دی. S - U - N نه جوړیږي Sun یعنی ځلیدونکی لمر!"
        ),
        hint = TrilingualText(
            en = "It shines bright and yellow in the sky, starting with S!",
            ur = "آسمان پر چمکتا ہے اور روشنی دیتا ہے (سورج)!",
            ps = "په اسمان کې ځلیږي او رڼا ورکوي (لمر)!"
        ),
        cardColorHex = 0xFFFFFBEB,
        accentColorHex = 0xFFD97706
    ),
    Page2ObjectItem(
        id = "top",
        word = "top",
        emoji = "🪀",
        initialLetter = "T",
        phoneticSound = "/t/ (ٹَ)",
        meaningUr = "لٹو (کھلونا)",
        meaningPs = "لاټو (لوبتکه)",
        explanation = TrilingualText(
            en = "T says Tuh. T - O - P spells top! My toy top spins round and round.",
            ur = "T کی آواز 'ٹَ' ہے۔ T - O - P سے بنتا ہے Top یعنی گھومنے والا لٹو!",
            ps = "د T غږ 'ټَ' دی. T - O - P نه جوړیږي Top یعنی تاویدونکی لاټو!"
        ),
        hint = TrilingualText(
            en = "A colorful spinning toy that starts with T!",
            ur = "گول گول گھومنے والا رنگین کھلونا (لٹو) جو T سے شروع ہوتا ہے!",
            ps = "یو رنګین تاویدونکی لاټو چې په T پیل کیږي!"
        ),
        cardColorHex = 0xFFEFF6FF,
        accentColorHex = 0xFF2563EB
    ),
    Page2ObjectItem(
        id = "bed",
        word = "bed",
        emoji = "🛏️",
        initialLetter = "B",
        phoneticSound = "/b/ (بَ)",
        meaningUr = "بستر / پلنگ",
        meaningPs = "کټ / بستر",
        explanation = TrilingualText(
            en = "B says Buh. B - E - D spells bed! We sleep on a soft bed at night.",
            ur = "B کی آواز 'بَ' ہے۔ B - E - D سے بنتا ہے Bed یعنی بستر یا پلنگ!",
            ps = "د B غږ 'بَ' دی. B - E - D نه جوړیږي Bed یعنی کټ یا بستر!"
        ),
        hint = TrilingualText(
            en = "You sleep on it at night with a pillow, starting with B!",
            ur = "رات کو جس پر تکیہ رکھ کر سوتے ہیں (پلنگ / بستر)!",
            ps = "د شپې پرې ویده کیږو او په B پیل کیږي (کټ)!"
        ),
        cardColorHex = 0xFFF0FDFA,
        accentColorHex = 0xFF0D9488
    )
)

// ─── PAGE 3 DATA: 26 ALPHABET LETTERS (Aa - Zz) ───
data class AlphabetPairItem(
    val capital: String,
    val small: String,
    val soundEn: String,
    val soundUrPs: String,
    val sampleWord: String,
    val sampleEmoji: String,
    val sampleUr: String,
    val samplePs: String,
    val skyGrassRoot: String
) {
    val pairText: String get() = "$capital$small"
    fun explain(lang: ExplainLang): String = when (lang) {
        ExplainLang.ENGLISH -> "$capital $small makes the sound $soundEn as in $sampleWord!"
        ExplainLang.URDU -> "حرف $capital $small کی آواز '$soundUrPs' ہے، جیسے $sampleWord ($sampleUr)!"
        ExplainLang.PASHTO -> "د $capital $small توري غږ '$soundUrPs' دی، لکه $sampleWord ($samplePs)!"
    }
}

val ALPHABET_26 = listOf(
    AlphabetPairItem("A", "a", "/æ/ (Ah)", "اَے", "Apple", "🍎", "سیب", "مڼه", "Grass"),
    AlphabetPairItem("B", "b", "/b/ (Buh)", "بَ", "Bed", "🛏️", "پلنگ", "کټ", "Sky"),
    AlphabetPairItem("C", "c", "/k/ (Kuh)", "کَ", "Cat", "🐱", "بلی", "پیشو", "Grass"),
    AlphabetPairItem("D", "d", "/d/ (Duh)", "ڈَ", "Duck", "🦆", "بطخ", "هیلۍ", "Sky"),
    AlphabetPairItem("E", "e", "/e/ (Eh)", "اے", "Egg", "🥚", "انڈہ", "هګۍ", "Grass"),
    AlphabetPairItem("F", "f", "/f/ (Fuh)", "فَ", "Fish", "🐟", "مچھلی", "کب", "Sky"),
    AlphabetPairItem("G", "g", "/g/ (Guh)", "گَ", "Goat", "🐐", "بکری", "وزه", "Root"),
    AlphabetPairItem("H", "h", "/h/ (Huh)", "ہَ", "Hen", "🐔", "مرغی", "چرګه", "Sky"),
    AlphabetPairItem("I", "i", "/ɪ/ (Ih)", "اِ", "Ink", "🖋️", "سیاہی", "رنګ", "Grass"),
    AlphabetPairItem("J", "j", "/dʒ/ (Juh)", "جَ", "Jug", "🏺", "جگ", "جګ", "Root"),
    AlphabetPairItem("K", "k", "/k/ (Kuh)", "کَ", "Kite", "🪁", "پتنگ", "کاغذباد", "Sky"),
    AlphabetPairItem("L", "l", "/l/ (Luh)", "لَ", "Lion", "🦁", "شیر", "زمری", "Sky"),
    AlphabetPairItem("M", "m", "/m/ (Muh)", "مَ", "Mango", "🥭", "آم", "ام", "Grass"),
    AlphabetPairItem("N", "n", "/n/ (Nuh)", "نَ", "Net", "🥅", "جال", "جال", "Grass"),
    AlphabetPairItem("O", "o", "/ɒ/ (Aw)", "آ", "Orange", "🍊", "مالٹا", "نارنج", "Grass"),
    AlphabetPairItem("P", "p", "/p/ (Puh)", "پَ", "Pot", "🏺", "برتن", "لوښی", "Root"),
    AlphabetPairItem("Q", "q", "/kw/ (Kwuh)", "کوَ", "Queen", "👑", "ملکہ", "ملکه", "Root"),
    AlphabetPairItem("R", "r", "/r/ (Ruh)", "رَ", "Rose", "🌹", "گلاب", "ګلاب", "Grass"),
    AlphabetPairItem("S", "s", "/s/ (Suh)", "سَ", "Sun", "☀️", "سورج", "لمر", "Grass"),
    AlphabetPairItem("T", "t", "/t/ (Tuh)", "ٹَ", "Top", "🪀", "لٹو", "لاټو", "Sky"),
    AlphabetPairItem("U", "u", "/ʌ/ (Uh)", "اَ", "Umbrella", "☂️", "چھتری", "چترۍ", "Grass"),
    AlphabetPairItem("V", "v", "/v/ (Vuh)", "وَ", "Van", "🚐", "گاڑی", "موټر", "Grass"),
    AlphabetPairItem("W", "w", "/w/ (Wuh)", "وَ", "Watch", "⌚", "گھڑی", "ساعت", "Grass"),
    AlphabetPairItem("X", "x", "/ks/ (Ksuh)", "کسَ", "Xylophone", "🎹", "زائلوفون", "زایلوفون", "Grass"),
    AlphabetPairItem("Y", "y", "/j/ (Yuh)", "یَ", "Yo-yo", "🪀", "یو یو", "یو یو", "Root"),
    AlphabetPairItem("Z", "z", "/z/ (Zuh)", "زَ", "Zebra", "🦓", "زیبرا", "زیبرا", "Grass")
)

// ─── PAGE 4 DATA: 6 FLOWER LETTERS & 7 LINE STROKES ───
data class FlowerSoundItem(
    val letter: String,
    val soundEn: String,
    val soundUrPs: String,
    val exampleWord: String,
    val emoji: String,
    val petalColorHex: Long,
    val borderColorHex: Long,
    val explain: TrilingualText
)

val PAGE_4_FLOWERS = listOf(
    FlowerSoundItem(
        letter = "z",
        soundEn = "/z/ (Zzz)",
        soundUrPs = "زَ",
        exampleWord = "zebra",
        emoji = "🦓",
        petalColorHex = 0xFFDCFCE7,
        borderColorHex = 0xFF16A34A,
        explain = TrilingualText(
            en = "Flower 'z' makes the buzzing sound /z/ like a bee and zebra!",
            ur = "پھول 'z' کی آواز 'زَ' ہے، جیسے زیبرا اور شہد کی مکھی کی بھنبھناہٹ!",
            ps = "د 'z' ګل غږ 'زَ' دی، لکه زیبرا او د مچۍ غږ!"
        )
    ),
    FlowerSoundItem(
        letter = "d",
        soundEn = "/d/ (Duh)",
        soundUrPs = "ڈَ",
        exampleWord = "duck",
        emoji = "🦆",
        petalColorHex = 0xFFE0F2FE,
        borderColorHex = 0xFF0284C7,
        explain = TrilingualText(
            en = "Flower 'd' makes the sound /d/ as in duck and door!",
            ur = "پھول 'd' کی آواز 'ڈَ' ہے، جیسے Duck (بطخ) اور Door (دروازہ)!",
            ps = "د 'd' ګل غږ 'ډَ' دی، لکه Duck (هیلۍ) او Door (دروازه)!"
        )
    ),
    FlowerSoundItem(
        letter = "h",
        soundEn = "/h/ (Huh)",
        soundUrPs = "ہَ",
        exampleWord = "hen & hat",
        emoji = "🐔",
        petalColorHex = 0xFFFFEDD5,
        borderColorHex = 0xFFEA580C,
        explain = TrilingualText(
            en = "Flower 'h' makes the gentle breath sound /h/ as in hen and hat!",
            ur = "پھول 'h' کی آواز 'ہَ' ہے، جیسے Hen (مرغی) اور Hat (ٹوپی)!",
            ps = "د 'h' ګل غږ 'هَ' دی، لکه Hen (چرګه) او Hat (خولۍ)!"
        )
    ),
    FlowerSoundItem(
        letter = "t",
        soundEn = "/t/ (Tuh)",
        soundUrPs = "ٹَ",
        exampleWord = "top",
        emoji = "🪀",
        petalColorHex = 0xFFFCE7F3,
        borderColorHex = 0xFFDB2777,
        explain = TrilingualText(
            en = "Flower 't' makes the tapping sound /t/ as in top and tree!",
            ur = "پھول 't' کی آواز 'ٹَ' ہے، جیسے Top (لٹو) اور Tree (درخت)!",
            ps = "د 't' ګل غږ 'ټَ' دی، لکه Top (لاټو) او Tree (ونه)!"
        )
    ),
    FlowerSoundItem(
        letter = "l",
        soundEn = "/l/ (Lll)",
        soundUrPs = "لَ",
        exampleWord = "lion",
        emoji = "🦁",
        petalColorHex = 0xFFFEE2E2,
        borderColorHex = 0xFFDC2626,
        explain = TrilingualText(
            en = "Flower 'l' makes the singing sound /l/ as in lion and leaf!",
            ur = "پھول 'l' کی آواز 'لَ' ہے، جیسے Lion (شیر) اور Leaf (پتہ)!",
            ps = "د 'l' ګل غږ 'لَ' دی، لکه Lion (زمری) او Leaf (پاڼه)!"
        )
    ),
    FlowerSoundItem(
        letter = "n",
        soundEn = "/n/ (Nnn)",
        soundUrPs = "نَ",
        exampleWord = "net",
        emoji = "🥅",
        petalColorHex = 0xFFCCFBF1,
        borderColorHex = 0xFF0D9488,
        explain = TrilingualText(
            en = "Flower 'n' makes the sound /n/ as in net and nest!",
            ur = "پھول 'n' کی آواز 'نَ' ہے، جیسے Net (جال) اور Nest (گھونسلہ)!",
            ps = "د 'n' ګل غږ 'نَ' دی، لکه Net (جال) او Nest (ځاله)!"
        )
    )
)

data class LineTracePattern(
    val id: String,
    val nameEn: String,
    val symbolPreview: String,
    val instruction: TrilingualText
)

val PAGE_4_LINES = listOf(
    LineTracePattern(
        id = "horizontal",
        nameEn = "Sleeping Line (Horizontal →)",
        symbolPreview = "🔴 ⎯⎯⎯⎯⎯ ➔",
        instruction = TrilingualText(
            en = "Trace the sleeping line from the red dot on the left to the right.",
            ur = "بائیں طرف سرخ نقطے سے دائیں طرف سیدھی (لیٹی ہوئی) لکیر کھینچیں۔",
            ps = "له چپې سرې نقطې نه ښي لوري ته مستقیمه پرته کرښه وباسئ."
        )
    ),
    LineTracePattern(
        id = "vertical",
        nameEn = "Standing Line (Vertical ↓)",
        symbolPreview = "🔴 ┃ ↓ ┃ ↓ ┃",
        instruction = TrilingualText(
            en = "Trace the standing line straight down from top to bottom.",
            ur = "اوپر سرخ نقطے سے نیچے کی طرف سیدھی کھڑی لکیر کھینچیں۔",
            ps = "له پورتنۍ سرې نقطې نه ښکته لوري ته ولاړه کرښه وباسئ."
        )
    ),
    LineTracePattern(
        id = "slant_right",
        nameEn = "Right Slanting Line (↘)",
        symbolPreview = "🔴 ╲ ↘ ╲ ↘ ╲",
        instruction = TrilingualText(
            en = "Trace the slanting line diagonally down to the right.",
            ur = "اوپر سے دائیں جانب ترچھی لکیر (╲) پر انگلی پھیریں۔",
            ps = "له پورته نه ښي لوري ته کږه کرښه (╲) وباسئ."
        )
    ),
    LineTracePattern(
        id = "slant_left",
        nameEn = "Left Slanting Line (↙)",
        symbolPreview = "🔴 ╱ ↙ ╱ ↙ ╱",
        instruction = TrilingualText(
            en = "Trace the slanting line diagonally down to the left.",
            ur = "اوپر سے بائیں جانب ترچھی لکیر (╱) پر انگلی پھیریں۔",
            ps = "له پورته نه چپ لوري ته کږه کرښه (╱) وباسئ."
        )
    ),
    LineTracePattern(
        id = "zigzag",
        nameEn = "Zigzag Mountain Line (⋀⋁⋀⋁)",
        symbolPreview = "🔴 ⋀⋁⋀⋁⋀⋁",
        instruction = TrilingualText(
            en = "Trace the up-and-down zigzag peaks like mountains!",
            ur = "پہاڑوں کی طرح اوپر نیچے زگ زیگ (⋀⋁⋀⋁) لکیر پر ہاتھ پھیریں!",
            ps = "د غرونو په څېر پورته او ښکته زیګزاګ (⋀⋁⋀⋁) کرښه وباسئ!"
        )
    ),
    LineTracePattern(
        id = "u_curve",
        nameEn = "Upward Cup Curve (∪ ∪ ∪)",
        symbolPreview = "🔴 ∪ ∪ ∪ ∪",
        instruction = TrilingualText(
            en = "Trace the smooth U-shaped cup curves from the red dot.",
            ur = "پیالے کی شکل کی گول لکیروں (∪ ∪) پر سرخ نقطے سے ہاتھ پھیریں۔",
            ps = "د پیالې په شکل ګردو کرښو (∪ ∪) باندې له سرې نقطې لاس تېر کړئ."
        )
    ),
    LineTracePattern(
        id = "circle",
        nameEn = "Round Circle (◯ ◯ ◯)",
        symbolPreview = "🔴 ◯ ◯ ◯ ◯",
        instruction = TrilingualText(
            en = "Trace all the way around to form a neat circle!",
            ur = "سرخ نقطے سے گھومتے ہوئے پورا گول دائرہ (◯) بنائیں!",
            ps = "له سرې نقطې نه ګرد چاپېره بشپړه دایره (◯) جوړه کړئ!"
        )
    )
)

// ─── PAGE 5 DATA: TRAIN COLORING PARTS ───
data class TrainPartItem(
    val id: String,
    val nameEn: String,
    val targetColorHex: Long,
    val targetColorNameEn: String,
    val instruction: TrilingualText
)

val PAGE_5_TRAIN_PARTS = listOf(
    TrainPartItem(
        id = "waves",
        nameEn = "3 Smoke Wave Lines (〰️)",
        targetColorHex = 0xFF64748B,
        targetColorNameEn = "Smoke Gray",
        instruction = TrilingualText(
            en = "First, trace the wavy smoke lines above the train!",
            ur = "سب سے پہلے ریل گاڑی کے دھوئیں والی لہر دار لکیروں پر ہاتھ پھیریں!",
            ps = "تر ټولو مخکې د اورګاډي د لوګي څپو والو کرښو باندې لاس تېر کړئ!"
        )
    ),
    TrainPartItem(
        id = "engine_front",
        nameEn = "Engine Nose & Chimney",
        targetColorHex = 0xFFEF4444,
        targetColorNameEn = "Bright Red",
        instruction = TrilingualText(
            en = "Colour the front bumper and chimney of the engine Red!",
            ur = "انجن کے اگلے حصے اور چمنی میں سرخ (Red) رنگ بھریں!",
            ps = "د انجن مخکینۍ برخه او چمني سور (Red) رنګ کړئ!"
        )
    ),
    TrainPartItem(
        id = "engine_body",
        nameEn = "Engine Boiler Body",
        targetColorHex = 0xFF0284C7,
        targetColorNameEn = "Sky Blue",
        instruction = TrilingualText(
            en = "Colour the main engine body Sky Blue!",
            ur = "انجن کے درمیانی حصے میں نیلا (Blue) رنگ بھریں!",
            ps = "د انجن منځنۍ برخه شنه/اسماني (Blue) رنګ کړئ!"
        )
    ),
    TrainPartItem(
        id = "engine_cab",
        nameEn = "Driver's Cabin",
        targetColorHex = 0xFF7C3AED,
        targetColorNameEn = "Royal Purple",
        instruction = TrilingualText(
            en = "Colour the driver's tall cabin Purple!",
            ur = "ڈرائیور کے کیبن میں جامنی (Purple) رنگ بھریں!",
            ps = "د ډریور خونه بنفشي (Purple) رنګ کړئ!"
        )
    ),
    TrainPartItem(
        id = "bogie_1",
        nameEn = "First Train Car (Bogie 1)",
        targetColorHex = 0xFF16A34A,
        targetColorNameEn = "Leaf Green",
        instruction = TrilingualText(
            en = "Colour the first passenger car Green!",
            ur = "پہلے ڈبے میں سبز (Green) رنگ بھریں!",
            ps = "لومړۍ ډبه شنه (Green) رنګ کړئ!"
        )
    ),
    TrainPartItem(
        id = "bogie_2",
        nameEn = "Second Train Car (Bogie 2)",
        targetColorHex = 0xFFEA580C,
        targetColorNameEn = "Warm Orange",
        instruction = TrilingualText(
            en = "Colour the middle passenger car Orange!",
            ur = "درمیانی ڈبے میں مالٹا (Orange) رنگ بھریں!",
            ps = "منځنۍ ډبه نارنجي (Orange) رنګ کړئ!"
        )
    ),
    TrainPartItem(
        id = "bogie_3",
        nameEn = "Third Train Car (Bogie 3)",
        targetColorHex = 0xFF15803D,
        targetColorNameEn = "Forest Green",
        instruction = TrilingualText(
            en = "Colour the last passenger car Green!",
            ur = "آخری ڈبے میں سبز (Green) رنگ بھریں!",
            ps = "وروستۍ ډبه شنه (Green) رنګ کړئ!"
        )
    ),
    TrainPartItem(
        id = "wheels",
        nameEn = "8 Round Train Wheels",
        targetColorHex = 0xFF334155,
        targetColorNameEn = "Charcoal Dark",
        instruction = TrilingualText(
            en = "Trace and colour all 8 round wheels beneath the train!",
            ur = "ریل گاڑی کے نیچے آٹھ گول پہیوں کو گہرا سرمئی/کالا رنگ کریں!",
            ps = "د اورګاډي لاندې اته ګردې اربې تور/خړ رنګ کړئ!"
        )
    )
)

// ─── PAGE 7 DATA: BEFORE / AFTER APPLE PUZZLES ───
data class AppleNeighborPuzzle(
    val id: Int,
    val givenLetter: String,
    val isBefore: Boolean,
    val correctAnswer: String,
    val options: List<String>,
    val isRedApple: Boolean,
    val explain: TrilingualText
)

val PAGE_7_APPLE_PUZZLES = listOf(
    AppleNeighborPuzzle(
        id = 1,
        givenLetter = "M",
        isBefore = true,
        correctAnswer = "L",
        options = listOf("L", "N", "K", "O"),
        isRedApple = true,
        explain = TrilingualText(
            en = "L comes right BEFORE M in the alphabet (K, L, M)!",
            ur = "انگریزی حروف میں M سے بالکل پہلے L آتا ہے (L, M)!",
            ps = "په تورو کې له M نه مخکې L راځي (L, M)!"
        )
    ),
    AppleNeighborPuzzle(
        id = 2,
        givenLetter = "B",
        isBefore = true,
        correctAnswer = "A",
        options = listOf("A", "C", "D", "E"),
        isRedApple = false,
        explain = TrilingualText(
            en = "A comes right BEFORE B at the start of the alphabet (A, B)!",
            ur = "حروف تہجی کے شروع میں B سے پہلے A آتا ہے (A, B)!",
            ps = "د الفبا په پیل کې له B نه مخکې A راځي (A, B)!"
        )
    ),
    AppleNeighborPuzzle(
        id = 3,
        givenLetter = "E",
        isBefore = false,
        correctAnswer = "F",
        options = listOf("F", "D", "G", "H"),
        isRedApple = false,
        explain = TrilingualText(
            en = "F comes right AFTER E in the alphabet (E, F)!",
            ur = "انگریزی حروف میں E کے فوراً بعد F آتا ہے (E, F)!",
            ps = "په الفبا کې له E نه وروسته F راځي (E, F)!"
        )
    ),
    AppleNeighborPuzzle(
        id = 4,
        givenLetter = "Y",
        isBefore = false,
        correctAnswer = "Z",
        options = listOf("Z", "X", "W", "V"),
        isRedApple = true,
        explain = TrilingualText(
            en = "Z comes right AFTER Y at the end of the alphabet (Y, Z)!",
            ur = "حروف تہجی کے آخر میں Y کے بعد Z آتا ہے (Y, Z)!",
            ps = "د الفبا په پای کې له Y نه وروسته Z راځي (Y, Z)!"
        )
    ),
    AppleNeighborPuzzle(
        id = 5,
        givenLetter = "H",
        isBefore = true,
        correctAnswer = "G",
        options = listOf("G", "I", "F", "J"),
        isRedApple = true,
        explain = TrilingualText(
            en = "G comes right BEFORE H in the alphabet (G, H)!",
            ur = "H سے بالکل پہلے G آتا ہے (G, H)!",
            ps = "له H نه مخکې G راځي (G, H)!"
        )
    ),
    AppleNeighborPuzzle(
        id = 6,
        givenLetter = "P",
        isBefore = false,
        correctAnswer = "Q",
        options = listOf("Q", "O", "R", "S"),
        isRedApple = false,
        explain = TrilingualText(
            en = "Q comes right AFTER P in the alphabet (P, Q)!",
            ur = "P کے فوراً بعد Q آتا ہے (P, Q)!",
            ps = "له P نه وروسته Q راځي (P, Q)!"
        )
    )
)
