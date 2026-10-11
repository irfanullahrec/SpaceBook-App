package com.example.spacebookapp.ui.screens

enum class MathsMechanic {
    TOY_COUNTER_ARCADE,
    NUMBER_LINE_HOP,
    COMPARE_MONSTER_GATOR,
    TENS_ONES_BUNDLE_BUILDER,
    ORDINAL_RACE_TRACK,
    ADDITION_FRUIT_TREE,
    SUBTRACTION_BALLOON_POP,
    SEESAW_MEASUREMENT_LAB,
    PAK_RUPEE_TOYSHOP,
    ANALOG_CLOCK_ARCADE,
    CALENDAR_WHEEL_TRAIN,
    SHAPE_BUILDER_MONSTER,
    SPATIAL_RADAR_SCENE
}

data class MathsRoundItem(
    val promptEmoji: String,
    val promptTitle: String,
    val promptSub: TrilingualText,
    val correctAnswer: String,
    val options: List<String>,
    val voiceExplain: TrilingualText,
    // Visual parameters for the 2D interactive canvas/animations
    val visualCountA: Int = 0,
    val visualCountB: Int = 0,
    val visualEmojiA: String = "🧸",
    val visualEmojiB: String = "⚽",
    val visualTag: String = "" // e.g. "CLOCK:7", "SHAPE:TRIANGLE", "POS:ABOVE", "SEESAW:HEAVY_LEFT", "COIN:50"
)

data class MathsStageMeta(
    val stageNumber: Int,
    val pillLabel: String,
    val titleEn: String,
    val pageRangeText: String,
    val subtitle: TrilingualText,
    val gameBadge: String,
    val mechanic: MathsMechanic,
    val mascotEmoji: String,
    val rounds: List<MathsRoundItem>,
    val lessons: List<LessonCardItem>,
    val exercises: List<ExerciseQuizItem>
)

val CLASS1_MATHS_STAGES = listOf(
    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 1: UNIT 1 (Pages 1–9) — Counting Objects 1 to 9
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 1,
        pillLabel = "Unit 1 • P.1–9",
        titleEn = "Unit 1: Counting Numbers 1 to 9",
        pageRangeText = "Pages 1–9 • Whole Numbers (1 to 9)",
        subtitle = TrilingualText(
            en = "Tap the bouncing toys to count them aloud, then pick the matching number!",
            ur = "چھلانگ لگاتے کھلونوں کو گننے کے لیے ان پر ٹیپ کریں اور صحیح نمبر چنیں!",
            ps = "ټوپ وهونکو لوبتوکو باندې ټایپ وکړئ ترڅو یې وشمېرئ او سمه شمېره وټاکئ!"
        ),
        gameBadge = "🧸 Toy Counter (1–9)",
        mechanic = MathsMechanic.TOY_COUNTER_ARCADE,
        mascotEmoji = "🧸",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🧸",
                promptTitle = "Count the Teddy Bear!",
                promptSub = TrilingualText(
                    en = "How many teddy bears do you see? Tap it and choose the number!",
                    ur = "آپ کو کتنے ٹیڈی بیئر نظر آ رہے ہیں؟ گنیں اور نمبر چنیں!",
                    ps = "تاسو څومره ټیډي بیر وینئ؟ ویې شمېرئ او شمېره وټاکئ!"
                ),
                correctAnswer = "1 (One)",
                options = listOf("1 (One)", "2 (Two)", "3 (Three)"),
                voiceExplain = TrilingualText(
                    en = "Count the teddy bear. There is 1 teddy bear!",
                    ur = "ٹیڈی بیئر گنیں۔ یہاں ایک ٹیڈی بیئر ہے!",
                    ps = "ټیډي بیر وشمېرئ. دلته یو ټیډي بیر دی!"
                ),
                visualCountA = 1,
                visualEmojiA = "🧸"
            ),
            MathsRoundItem(
                promptEmoji = "✈️",
                promptTitle = "Count the Airplanes!",
                promptSub = TrilingualText(
                    en = "Count the flying airplanes on the screen!",
                    ur = "سکرین پر اڑتے ہوئے ہوائی جہاز گنیں!",
                    ps = "په سکرین باندې الوتونکې الوتکې وشمېرئ!"
                ),
                correctAnswer = "2 (Two)",
                options = listOf("2 (Two)", "4 (Four)", "1 (One)"),
                voiceExplain = TrilingualText(
                    en = "One, two! How many airplanes? Pick the matching number!",
                    ur = "ایک، دو! کل کتنے ہوائی جہاز ہیں؟ صحیح نمبر چنیں!",
                    ps = "یو، دوه! ټولې څو الوتکې دي؟ سمه شمېره وټاکئ!"
                ),
                visualCountA = 2,
                visualEmojiA = "✈️"
            ),
            MathsRoundItem(
                promptEmoji = "🚗",
                promptTitle = "Count the Toy Cars!",
                promptSub = TrilingualText(
                    en = "Tap the racing toy cars to count them all!",
                    ur = "کھلونا گاڑیوں پر ٹیپ کر کے انہیں گنیں!",
                    ps = "د لوبو موټرو باندې ټایپ وکړئ او ټول وشمېرئ!"
                ),
                correctAnswer = "4 (Four)",
                options = listOf("4 (Four)", "3 (Three)", "5 (Five)"),
                voiceExplain = TrilingualText(
                    en = "Count all the red toy cars carefully!",
                    ur = "تمام سرخ کھلونا گاڑیوں کو دھیان سے گنیں!",
                    ps = "ټول سره موټرونه په غور سره وشمېرئ!"
                ),
                visualCountA = 4,
                visualEmojiA = "🚗"
            ),
            MathsRoundItem(
                promptEmoji = "🪆",
                promptTitle = "Count the Colorful Dolls!",
                promptSub = TrilingualText(
                    en = "Count every doll in the toy box!",
                    ur = "کھلونا باکس میں موجود تمام گڑیاں گنیں!",
                    ps = "په بکس کې ټولې ناوکیانې وشمېرئ!"
                ),
                correctAnswer = "6 (Six)",
                options = listOf("6 (Six)", "5 (Five)", "7 (Seven)"),
                voiceExplain = TrilingualText(
                    en = "Count the dolls one by one from one to six!",
                    ur = "ایک سے چھ تک ایک ایک کر کے گڑیاں گنیں!",
                    ps = "له یو څخه تر شپږو پورې ناوکیانې یوه یوه وشمېرئ!"
                ),
                visualCountA = 6,
                visualEmojiA = "🪆"
            ),
            MathsRoundItem(
                promptEmoji = "⚽",
                promptTitle = "Count the Footballs!",
                promptSub = TrilingualText(
                    en = "Count all the bouncing footballs!",
                    ur = "تمام اچھلتی ہوئی فٹبالز کو گنیں!",
                    ps = "ټول ټوپ وهونکي فوټبالونه وشمېرئ!"
                ),
                correctAnswer = "8 (Eight)",
                options = listOf("8 (Eight)", "7 (Seven)", "9 (Nine)"),
                voiceExplain = TrilingualText(
                    en = "How many footballs are bouncing? Count them carefully!",
                    ur = "کتنی فٹبالز اچھل رہی ہیں؟ دھیان سے گنیں!",
                    ps = "څومره فوټبالونه ټوپ وهي؟ په غور سره یې وشمېرئ!"
                ),
                visualCountA = 8,
                visualEmojiA = "⚽"
            ),
            MathsRoundItem(
                promptEmoji = "🚚",
                promptTitle = "Count the Toy Trucks!",
                promptSub = TrilingualText(
                    en = "Count all the big toy trucks on the shelf!",
                    ur = "شیلف پر موجود تمام بڑے کھلونا ٹرک گنیں!",
                    ps = "په المارۍ کې ټول لوی ټرکونه وشمېرئ!"
                ),
                correctAnswer = "9 (Nine)",
                options = listOf("9 (Nine)", "8 (Eight)", "6 (Six)"),
                voiceExplain = TrilingualText(
                    en = "Count the big trucks all the way up to 9!",
                    ur = "بڑے ٹرکوں کو نو تک گنیں!",
                    ps = "لوی ټرکونه تر نهو پورې وشمېرئ!"
                ),
                visualCountA = 9,
                visualEmojiA = "🚚"
            )
        ),
        lessons = listOf(
            LessonCardItem("1️⃣", "1 — One (Teddy Bear 🧸)", "1 Finger • O-N-E", TrilingualText("1 means a single object, like 1 Teddy Bear or 1 Sun.", "1 کا مطلب ایک چیز ہے، جیسے 1 ٹیڈی بیئر یا 1 سورج۔", "1 معنی یو شی، لکه 1 ټیډي بیر یا 1 لمر.")),
            LessonCardItem("2️⃣", "2 — Two (Airplanes ✈️✈️)", "2 Fingers • T-W-O", TrilingualText("2 comes after 1. We have 2 eyes and 2 hands.", "2، 1 کے بعد آتا ہے۔ ہماری 2 آنکھیں اور 2 ہاتھ ہیں۔", "2 له 1 وروسته راځي. موږ 2 سترګې او 2 لاسونه لرو.")),
            LessonCardItem("3️⃣", "3 — Three (Blocks 🧱🧱🧱)", "3 Fingers • T-H-R-E-E", TrilingualText("3 comes after 2. A tricycle has 3 wheels.", "3، 2 کے بعد آتا ہے۔ تین پہیوں والی سائیکل کے 3 پہیے ہوتے ہیں۔", "3 له 2 وروسته راځي. درې څرخه بایسکل 3 ټایرونه لري.")),
            LessonCardItem("4️⃣", "4 — Four (Cars 🚗🚗🚗🚗)", "4 Fingers • F-O-U-R", TrilingualText("4 comes after 3. A car has 4 wheels.", "4، 3 کے بعد آتا ہے۔ ایک کار کے 4 پہیے ہوتے ہیں۔", "4 له 3 وروسته راځي. یو موټر 4 ټایرونه لري.")),
            LessonCardItem("5️⃣", "5 — Five (Rattles 🪇)", "5 Fingers on 1 Hand • F-I-V-E", TrilingualText("5 comes after 4. One hand has 5 fingers!", "5، 4 کے بعد آتا ہے۔ ایک ہاتھ میں 5 انگلیاں ہوتی ہیں!", "5 له 4 وروسته راځي. یو لاس 5 ګوتې لري!")),
            LessonCardItem("6️⃣", "6 to 9 — Six, Seven, Eight, Nine", "6 Dolls • 7 Rings • 8 Balls • 9 Trucks", TrilingualText("6 (Six), 7 (Seven), 8 (Eight), and 9 (Nine) are the biggest 1-digit numbers.", "6 (چھ)، 7 (سات)، 8 (آٹھ) اور 9 (نو) ایک ہندسے کے بڑے اعداد ہیں۔", "6 (شپږ)، 7 (اووه)، 8 (اته) او 9 (نهه) د یوې عددې لویې شمېرې دي."))
        ),
        exercises = listOf(
            ExerciseQuizItem("🖐️", TrilingualText("How many fingers do you have on ONE hand?", "آپ کے ایک ہاتھ میں کتنی انگلیاں ہیں؟", "ستاسو په یوه لاس کې څو ګوتې دي؟"), "5 (Five)", listOf("5 (Five)", "4 (Four)", "8 (Eight)"), TrilingualText("Correct! One hand has 5 fingers.", "درست! ایک ہاتھ میں 5 انگلیاں ہوتی ہیں۔", "سمه ده! په یوه لاس کې 5 ګوتې وي.")),
            ExerciseQuizItem("🚗", TrilingualText("Count the cars: 🚗 🚗 🚗 🚗. How many are there?", "گاڑیاں گنیں: 🚗 🚗 🚗 🚗۔ یہ کتنی ہیں؟", "موټرونه وشمېرئ: 🚗 🚗 🚗 🚗. دا څو دي؟"), "4 (Four)", listOf("4 (Four)", "3 (Three)", "6 (Six)"), TrilingualText("Great job! There are 4 cars.", "شاباش! یہاں 4 گاڑیاں ہیں۔", "آفرین! دلته 4 موټرونه دي.")),
            ExerciseQuizItem("9️⃣", TrilingualText("Which is the largest 1-digit number from 1 to 9?", "1 سے 9 تک سب سے بڑا ایک ہندسی نمبر کون سا ہے؟", "له 1 څخه تر 9 پورې ترټولو لویه یوه عددي شمېره کومه ده؟"), "9 (Nine)", listOf("9 (Nine)", "7 (Seven)", "5 (Five)"), TrilingualText("Awesome! 9 (Nine) is the largest 1-digit number.", "بہترین! 9 سب سے بڑا ایک ہندسی نمبر ہے۔", "ډېر ښه! 9 ترټولو لویه یوه عددي شمېره ده."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 2: UNIT 1 (Pages 10–14) — Zero (0) & Forward/Backward Number Line
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 2,
        pillLabel = "Unit 1 • P.10–14",
        titleEn = "Unit 1: Concept of Zero (0) & Number Line",
        pageRangeText = "Pages 10–14 • Zero (0), Forward & Backward (0–9)",
        subtitle = TrilingualText(
            en = "Watch the frog hop on the number line from 0 to 9! Find Zero, Before, After, and Between!",
            ur = "مینڈک کو 0 سے 9 تک نمبر لائن پر چھلانگ لگاتے دیکھیں! صفر، پہلے، بعد اور درمیان والا نمبر بتائیں!",
            ps = "چنګښه وګورئ چې له 0 څخه تر 9 پورې په شمیرو ټوپ وهي! صفر، مخکې، وروسته او منځنۍ شمېره ومومئ!"
        ),
        gameBadge = "🐸 Number Line Hop (0–9)",
        mechanic = MathsMechanic.NUMBER_LINE_HOP,
        mascotEmoji = "🐸",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🧺",
                promptTitle = "Empty Basket = ?",
                promptSub = TrilingualText(
                    en = "3 birds were on a branch and all 3 flew away! How many birds are left?",
                    ur = "شاخ پر 3 چڑیاں تھیں اور تینوں اڑ گئیں! اب کتنی چڑیاں باقی ہیں؟",
                    ps = "په څانګه 3 مرغۍ وې او درې واړه والوتلې! اوس څو مرغۍ پاتې دي؟"
                ),
                correctAnswer = "0 (Zero)",
                options = listOf("0 (Zero)", "3 (Three)", "1 (One)"),
                voiceExplain = TrilingualText(
                    en = "When nothing is left, we write Zero!",
                    ur = "جب کچھ بھی باقی نہ رہے تو ہم صفر لکھتے ہیں!",
                    ps = "کله چې هیڅ پاتې نشي، موږ صفر لیکو!"
                ),
                visualCountA = 0,
                visualTag = "HOP:0"
            ),
            MathsRoundItem(
                promptEmoji = "🐸",
                promptTitle = "What Comes AFTER 5?",
                promptSub = TrilingualText(
                    en = "The frog is at 5 and hops 1 step FORWARD! Where does it land?",
                    ur = "مینڈک 5 پر ہے اور 1 قدم آگے چھلانگ لگاتا ہے! وہ کس نمبر پر پہنچے گا؟",
                    ps = "چنګښه په 5 ولاړه ده او 1 ګام مخکې ټوپ وهي! کومې شمېرې ته رسیږي؟"
                ),
                correctAnswer = "6",
                options = listOf("6", "4", "7"),
                voiceExplain = TrilingualText(
                    en = "Counting forward from 5, which number comes next?",
                    ur = "پانچ سے آگے گنتے ہوئے اگلا نمبر کون سا آتا ہے؟",
                    ps = "له پنځو څخه مخکې شمېرلو سره بله شمېره کومه راځي؟"
                ),
                visualCountA = 5,
                visualCountB = 6,
                visualTag = "HOP:6"
            ),
            MathsRoundItem(
                promptEmoji = "🐸",
                promptTitle = "What Comes BEFORE 8?",
                promptSub = TrilingualText(
                    en = "The frog is at 8 and hops 1 step BACKWARD! Which number is before 8?",
                    ur = "مینڈک 8 سے 1 قدم پیچھے چھلانگ لگاتا ہے! 8 سے پہلے کون سا نمبر آتا ہے؟",
                    ps = "چنګښه له 8 څخه 1 ګام شاته ټوپ وهي! له 8 مخکې کومه شمېره راځي؟"
                ),
                correctAnswer = "7",
                options = listOf("7", "9", "6"),
                voiceExplain = TrilingualText(
                    en = "Hop backward one step from 8! What comes before 8?",
                    ur = "آٹھ سے ایک قدم پیچھے جائیں! آٹھ سے پہلے کیا آتا ہے؟",
                    ps = "له اتو څخه یو ګام شاته لاړ شئ! له اتو مخکې څه راځي؟"
                ),
                visualCountA = 8,
                visualCountB = 7,
                visualTag = "HOP:7"
            ),
            MathsRoundItem(
                promptEmoji = "🌉",
                promptTitle = "What is BETWEEN 3 and 5?",
                promptSub = TrilingualText(
                    en = "Look at the number line: 3 , [ ? ] , 5. Which number sits in the middle?",
                    ur = "نمبر لائن دیکھیں: 3 ، [ ؟ ] ، 5۔ درمیان میں کون سا نمبر ہے؟",
                    ps = "د شمېرو کرښې ته وګورئ: 3 ، [ ؟ ] ، 5. په منځ کې کومه شمېره ده؟"
                ),
                correctAnswer = "4",
                options = listOf("4", "2", "6"),
                voiceExplain = TrilingualText(
                    en = "Which number is right between 3 and 5 on the number line?",
                    ur = "نمبر لائن پر 3 اور 5 کے بالکل درمیان کون سا نمبر ہے؟",
                    ps = "د شمېرو په کرښه کې د 3 او 5 ترمنځ کومه شمېره ده؟"
                ),
                visualCountA = 3,
                visualCountB = 4,
                visualTag = "HOP:4"
            ),
            MathsRoundItem(
                promptEmoji = "⏪",
                promptTitle = "Backward Counting: 9, 8, 7, [ ? ]",
                promptSub = TrilingualText(
                    en = "Count backward from 9: 9 → 8 → 7 → ?",
                    ur = "9 سے الٹی گنتی گنیں: 9 ← 8 ← 7 ← ؟",
                    ps = "له 9 څخه سرچپه شمېرنه وکړئ: 9 ← 8 ← 7 ← ؟"
                ),
                correctAnswer = "6",
                options = listOf("6", "8", "5"),
                voiceExplain = TrilingualText(
                    en = "Count backward: nine, eight, seven... what comes next?",
                    ur = "الٹی گنتی گنیں: نو، آٹھ، سات... آگے کیا آئے گا؟",
                    ps = "سرچپه وشمېرئ: نهه، اته، اووه... وروسته څه راځي؟"
                ),
                visualCountA = 7,
                visualCountB = 6,
                visualTag = "HOP:6"
            )
        ),
        lessons = listOf(
            LessonCardItem("0️⃣", "Concept of Zero (0)", "Nothing Left = 0 (Z-E-R-O)", TrilingualText("When a plate has 2 apples and we eat both, 0 apples are left. Zero means nothing!", "جب پلیٹ میں 2 سیب ہوں اور ہم دونوں کھا لیں تو 0 سیب بچتے ہیں۔ صفر کا مطلب کچھ نہیں!", "کله چې په قاب کې 2 مڼې وي او دواړه وخورو، 0 مڼې پاتې کیږي. صفر معنی هیڅ شی نشته!")),
            LessonCardItem("⏩", "Forward Counting (0 to 9)", "0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9", TrilingualText("Forward counting goes from smallest to biggest by adding 1 each step.", "سیدھی گنتی چھوٹے سے بڑے نمبر کی طرف جاتی ہے۔", "مخکې شمېرنه له کوچنۍ څخه لویې شمېرې ته ځي.")),
            LessonCardItem("⏪", "Backward Counting (9 to 0)", "9 → 8 → 7 → 6 → 5 → 4 → 3 → 2 → 1 → 0", TrilingualText("Backward counting steps down from 9 back to 0 like a rocket countdown!", "الٹی گنتی راکٹ کاؤنٹ ڈاؤن کی طرح 9 سے واپس 0 تک آتی ہے!", "سرچپه شمېرنه له 9 څخه بېرته 0 ته راکښته کیږي!")),
            LessonCardItem("↔️", "Before, Between & After", "4 is Before 5 • 5 is Between 4 & 6 • 6 is After 5", TrilingualText("On the number line: 4 comes BEFORE 5, 6 comes AFTER 5, and 5 is BETWEEN 4 and 6.", "نمبر لائن پر: 4، 5 سے پہلے آتا ہے، 6، 5 کے بعد آتا ہے، اور 5، 4 اور 6 کے درمیان ہے۔", "د شمېرو په کرښه کې: 4 له 5 مخکې راځي، 6 له 5 وروسته راځي، او 5 د 4 او 6 ترمنځ دی."))
        ),
        exercises = listOf(
            ExerciseQuizItem("0️⃣", TrilingualText("There are no mangoes in the basket. Which number shows this?", "ٹوکری میں کوئی آم نہیں ہے۔ یہ کون سا نمبر ظاہر کرتا ہے؟", "په ټوکرۍ کې هیڅ ام نشته. کومه شمېره دا ښیي؟"), "0 (Zero)", listOf("0 (Zero)", "1 (One)", "9 (Nine)"), TrilingualText("Correct! 0 (Zero) means no objects.", "درست! 0 (صفر) کا مطلب کوئی چیز نہیں۔", "سمه ده! 0 (صفر) معنی هیڅ شی نشته.")),
            ExerciseQuizItem("⏩", TrilingualText("Which number comes right AFTER 0?", "0 کے فوراً بعد کون سا نمبر آتا ہے؟", "له 0 څخه سمدستي وروسته کومه شمېره راځي؟"), "1", listOf("1", "2", "9"), TrilingualText("Spot on! 1 comes right after 0.", "شاباش! 0 کے فوراً بعد 1 آتا ہے۔", "آفرین! له 0 وروسته 1 راځي.")),
            ExerciseQuizItem("↔️", TrilingualText("Which number comes BETWEEN 6 and 8?", "6 اور 8 کے درمیان کون سا نمبر آتا ہے؟", "د 6 او 8 ترمنځ کومه شمېره راځي؟"), "7", listOf("7", "5", "9"), TrilingualText("Great job! 7 is between 6 and 8.", "بہترین! 6 اور 8 کے درمیان 7 ہے۔", "ډېر ښه! 7 د 6 او 8 ترمنځ دی."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 3: UNIT 1 (Pages 15–18) — Number 10 & Comparing (More / Less)
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 3,
        pillLabel = "Unit 1 • P.15–18",
        titleEn = "Unit 1: Number 10 & Comparing (More / Less)",
        pageRangeText = "Pages 15–18 • Number 10, More Than & Less Than",
        subtitle = TrilingualText(
            en = "Compare the two groups of items and build the first 2-digit number: 10!",
            ur = "دونوں گروپوں کا موازنہ کریں (زیادہ یا کم) اور پہلا دو ہندسی نمبر 10 بنائیں!",
            ps = "دوه ډلې سره پرتله کړئ (ډېر یا کم) او لومړۍ دوه عددي شمېره 10 جوړه کړئ!"
        ),
        gameBadge = "🐊 Compare & Make 10",
        mechanic = MathsMechanic.COMPARE_MONSTER_GATOR,
        mascotEmoji = "🔟",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🔟",
                promptTitle = "9 Pencils + 1 More Pencil = ?",
                promptSub = TrilingualText(
                    en = "When we add 1 more to 9, we get the smallest 2-digit number!",
                    ur = "جب ہم 9 میں 1 اور ملاتے ہیں تو ہمیں سب سے چھوٹا دو ہندسی نمبر ملتا ہے!",
                    ps = "کله چې موږ له 9 سره 1 بل یوځای کړو، موږ ترټولو کوچنۍ دوه عددي شمېره ترلاسه کوو!"
                ),
                correctAnswer = "10 (Ten)",
                options = listOf("10 (Ten)", "8 (Eight)", "9 (Nine)"),
                voiceExplain = TrilingualText(
                    en = "Nine and one more make Ten! 10 has 1 Ten and 0 Ones!",
                    ur = "نو اور ایک مل کر دس بنتے ہیں! 10 میں 1 دہائی اور 0 اکائی ہے!",
                    ps = "نهه او یو بل لس جوړوي! 10 کې 1 لسیزه او 0 یوونه دي!"
                ),
                visualCountA = 9,
                visualCountB = 1,
                visualEmojiA = "✏️",
                visualEmojiB = "✏️"
            ),
            MathsRoundItem(
                promptEmoji = "🧁",
                promptTitle = "Compare: 7 Cupcakes vs 4 Cupcakes",
                promptSub = TrilingualText(
                    en = "Left plate has 7 cupcakes. Right plate has 4 cupcakes. Therefore, 7 is ___ than 4!",
                    ur = "بائیں پلیٹ میں 7 کپ کیک ہیں اور دائیں میں 4۔ اس لیے 7، 4 سے ___ ہے!",
                    ps = "کیڼ قاب کې 7 کیکونه دي او ښي کې 4. نو 7 له 4 څخه ___ دی!"
                ),
                correctAnswer = "More than (>)",
                options = listOf("More than (>)", "Less than (<)", "Equal to (=)"),
                voiceExplain = TrilingualText(
                    en = "Look at the two plates! Is 7 more than 4, or less than 4?",
                    ur = "دونوں پلیٹوں کو دیکھیں! کیا 7، 4 سے زیادہ ہے یا کم؟",
                    ps = "دواړو قابونو ته وګورئ! ایا 7 له 4 څخه ډېر دی که کم؟"
                ),
                visualCountA = 7,
                visualCountB = 4,
                visualEmojiA = "🧁",
                visualEmojiB = "🧁"
            ),
            MathsRoundItem(
                promptEmoji = "🥭",
                promptTitle = "Compare: 3 Mangoes vs 8 Mangoes",
                promptSub = TrilingualText(
                    en = "Left basket has 3 mangoes. Right basket has 8 mangoes. So 3 is ___ than 8!",
                    ur = "بائیں ٹوکری میں 3 آم ہیں اور دائیں میں 8 آم۔ تو 3، 8 سے ___ ہے!",
                    ps = "کیڼه ټوکرۍ کې 3 امونه دي او ښۍ کې 8 امونه. نو 3 له 8 څخه ___ دی!"
                ),
                correctAnswer = "Less than (<)",
                options = listOf("Less than (<)", "More than (>)", "Equal to (=)"),
                voiceExplain = TrilingualText(
                    en = "3 mangoes are fewer than 8 mangoes! Choose Less than!",
                    ur = "3 آم 8 آموں سے کم ہیں! کم (Less than) چنیں!",
                    ps = "3 امونه له 8 امونو څخه کم دي! کم (Less than) وټاکئ!"
                ),
                visualCountA = 3,
                visualCountB = 8,
                visualEmojiA = "🥭",
                visualEmojiB = "🥭"
            ),
            MathsRoundItem(
                promptEmoji = "🎈",
                promptTitle = "Place Value of 10",
                promptSub = TrilingualText(
                    en = "In the 2-digit number 10, how many Tens and how many Ones are there?",
                    ur = "دو ہندسی نمبر 10 میں کتنی دہائیاں (Tens) اور کتنی اکائیاں (Ones) ہیں؟",
                    ps = "په 10 شمېره کې څو لسیزې (Tens) او څو یوونه (Ones) دي؟"
                ),
                correctAnswer = "1 Ten, 0 Ones",
                options = listOf("1 Ten, 0 Ones", "0 Tens, 1 One", "10 Tens, 1 One"),
                voiceExplain = TrilingualText(
                    en = "10 is a bundle of 1 Ten and 0 Ones!",
                    ur = "10 کا مطلب 1 دہائی اور 0 اکائی کا بنڈل ہے!",
                    ps = "10 د 1 لسیزې او 0 یوونو بنډل دی!"
                ),
                visualCountA = 10,
                visualCountB = 0,
                visualEmojiA = "🎈",
                visualEmojiB = "🎈"
            )
        ),
        lessons = listOf(
            LessonCardItem("🔟", "Introducing 10 (T-E-N)", "9 + 1 = 10 • Smallest 2-Digit Number", TrilingualText("10 has two digits: '1' in the Tens place and '0' in the Ones place (1 Ten, 0 Ones).", "10 میں دو ہندسے ہیں: دہائی کی جگہ 1 اور اکائی کی جگہ 0 (1 دہائی، 0 اکائی)۔", "10 دوه عددونه لري: د لسیزو په ځای کې 1 او د یوونو په ځای کې 0 (1 لسیزه، 0 یوونه).")),
            LessonCardItem("🐊", "More Than (>)", "7 is More Than 4", TrilingualText("When Group A has more items than Group B, we say A is MORE THAN B.", "جب پہلے گروپ میں چیزیں دوسرے سے زیادہ ہوں تو ہم کہتے ہیں More than (زیادہ)۔", "کله چې په لومړۍ ډله کې شیان له دویمې ډېر وي، موږ وایو More than (ډېر).")),
            LessonCardItem("🐣", "Less Than (<)", "3 is Less Than 8", TrilingualText("When Group A has fewer items than Group B, we say A is LESS THAN B.", "جب پہلے گروپ میں چیزیں دوسرے سے کم ہوں تو ہم کہتے ہیں Less than (کم)۔", "کله چې په لومړۍ ډله کې شیان له دویمې کم وي، موږ وایو Less than (کم)."))
        ),
        exercises = listOf(
            ExerciseQuizItem("🔟", TrilingualText("Which is the smallest 2-digit number?", "سب سے چھوٹا دو ہندسی نمبر کون سا ہے؟", "ترټولو کوچنۍ دوه عددي شمېره کومه ده؟"), "10", listOf("10", "9", "1"), TrilingualText("Correct! 10 is the smallest 2-digit number.", "درست! 10 سب سے چھوٹا دو ہندسی نمبر ہے۔", "سمه ده! 10 ترټولو کوچنۍ دوه عددي شمېره ده.")),
            ExerciseQuizItem("🍎", TrilingualText("6 apples are ___ than 9 apples.", "6 سیب 9 سیبوں سے ___ ہیں۔", "6 مڼې له 9 مڼو څخه ___ دي."), "Less", listOf("Less", "More", "Equal"), TrilingualText("Yes! 6 is less than 9.", "شاباش! 6، 9 سے کم (Less) ہے۔", "آفرین! 6 له 9 څخه کم (Less) دی."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 4: UNIT 1 (Pages 19–32) — Tens & Ones Place Value (11 to 99)
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 4,
        pillLabel = "Unit 1 • P.19–32",
        titleEn = "Unit 1: Tens & Ones Bundles (11 to 99)",
        pageRangeText = "Pages 19–32 • Place Value: Tens & Ones up to 99",
        subtitle = TrilingualText(
            en = "Count the Bundles of 10 (Tens) and loose sticks (Ones) to build numbers from 11 to 99!",
            ur = "10 کے بنڈل (دہائیاں) اور کھلی پنسلیں (اکائیاں) گن کر 11 سے 99 تک نمبر بنائیں!",
            ps = "د 10 بنډلونه (لسیزې) او خلاص پنسلونه (یوونه) وشمېرئ او له 11 تر 99 شمېرې جوړې کړئ!"
        ),
        gameBadge = "📦 Tens & Ones Builder",
        mechanic = MathsMechanic.TENS_ONES_BUNDLE_BUILDER,
        mascotEmoji = "🧮",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "📦",
                promptTitle = "1 Ten + 4 Ones = ?",
                promptSub = TrilingualText(
                    en = "Count 1 Bundle of Ten (10) and 4 loose Ones (4). What number does it make?",
                    ur = "1 دس کا بنڈل (10) اور 4 کھلی اکائیاں (4)۔ یہ کون سا نمبر بنتا ہے؟",
                    ps = "1 د لسو بنډل (10) او 4 خلاص یوونه (4). دا کومه شمېره جوړوي؟"
                ),
                correctAnswer = "14 (Fourteen)",
                options = listOf("14 (Fourteen)", "41 (Forty-one)", "15 (Fifteen)"),
                voiceExplain = TrilingualText(
                    en = "1 Ten and 4 Ones make 14! Fourteen!",
                    ur = "1 دہائی اور 4 اکائیاں مل کر 14 (چودہ) بناتی ہیں!",
                    ps = "1 لسیزه او 4 یوونه 14 (څوارلس) جوړوي!"
                ),
                visualCountA = 1, // 1 Ten
                visualCountB = 4  // 4 Ones
            ),
            MathsRoundItem(
                promptEmoji = "📦",
                promptTitle = "2 Tens + 3 Ones = ?",
                promptSub = TrilingualText(
                    en = "See 2 Bundles of Ten (20) and 3 loose Ones (3). Pick the number!",
                    ur = "2 دس کے بنڈل (20) اور 3 کھلی اکائیاں (3) دیکھیں۔ صحیح نمبر چنیں!",
                    ps = "2 د لسو بنډلونه (20) او 3 خلاص یوونه (3) وګورئ. سمه شمېره وټاکئ!"
                ),
                correctAnswer = "23 (Twenty-three)",
                options = listOf("23 (Twenty-three)", "32 (Thirty-two)", "20 (Twenty)"),
                voiceExplain = TrilingualText(
                    en = "2 Tens are 20, plus 3 Ones make 23!",
                    ur = "2 دہائیاں 20 ہیں، اور 3 اکائیاں ملا کر 23 بنتے ہیں!",
                    ps = "2 لسیزې 20 دي، او 3 یوونه ورسره 23 جوړوي!"
                ),
                visualCountA = 2,
                visualCountB = 3
            ),
            MathsRoundItem(
                promptEmoji = "📦",
                promptTitle = "4 Tens + 7 Ones = ?",
                promptSub = TrilingualText(
                    en = "Count 4 Bundles of Ten (40) and 7 Ones (7)!",
                    ur = "4 دس کے بنڈل (40) اور 7 اکائیاں (7) گنیں!",
                    ps = "4 د لسو بنډلونه (40) او 7 یوونه (7) وشمېرئ!"
                ),
                correctAnswer = "47 (Forty-seven)",
                options = listOf("47 (Forty-seven)", "74 (Seventy-four)", "40 (Forty)"),
                voiceExplain = TrilingualText(
                    en = "4 Tens and 7 Ones make 47!",
                    ur = "4 دہائیاں اور 7 اکائیاں مل کر 47 بناتی ہیں!",
                    ps = "4 لسیزې او 7 یوونه 47 جوړوي!"
                ),
                visualCountA = 4,
                visualCountB = 7
            ),
            MathsRoundItem(
                promptEmoji = "📦",
                promptTitle = "6 Tens + 5 Ones = ?",
                promptSub = TrilingualText(
                    en = "Count 6 Bundles of Ten (60) and 5 Ones (5)!",
                    ur = "6 دس کے بنڈل (60) اور 5 اکائیاں (5) گنیں!",
                    ps = "6 د لسو بنډلونه (60) او 5 یوونه (5) وشمېرئ!"
                ),
                correctAnswer = "65 (Sixty-five)",
                options = listOf("65 (Sixty-five)", "56 (Fifty-six)", "60 (Sixty)"),
                voiceExplain = TrilingualText(
                    en = "6 Tens and 5 Ones make 65!",
                    ur = "6 دہائیاں اور 5 اکائیاں مل کر 65 بناتی ہیں!",
                    ps = "6 لسیزې او 5 یوونه 65 جوړوي!"
                ),
                visualCountA = 6,
                visualCountB = 5
            ),
            MathsRoundItem(
                promptEmoji = "📦",
                promptTitle = "9 Tens + 9 Ones = ?",
                promptSub = TrilingualText(
                    en = "9 Bundles of Ten (90) and 9 Ones (9) make the largest 2-digit number!",
                    ur = "9 دس کے بنڈل (90) اور 9 اکائیاں (9) سب سے بڑا دو ہندسی نمبر بناتے ہیں!",
                    ps = "9 د لسو بنډلونه (90) او 9 یوونه (9) ترټولو لویه دوه عددي شمېره جوړوي!"
                ),
                correctAnswer = "99 (Ninety-nine)",
                options = listOf("99 (Ninety-nine)", "90 (Ninety)", "89 (Eighty-nine)"),
                voiceExplain = TrilingualText(
                    en = "9 Tens and 9 Ones make 99, the greatest 2-digit number!",
                    ur = "9 دہائیاں اور 9 اکائیاں مل کر 99 بناتی ہیں، جو سب سے بڑا دو ہندسی نمبر ہے!",
                    ps = "9 لسیزې او 9 یوونه 99 جوړوي، چې ترټولو لویه دوه عددي شمېره ده!"
                ),
                visualCountA = 9,
                visualCountB = 9
            )
        ),
        lessons = listOf(
            LessonCardItem("🔟", "Numbers 11 to 20", "1 Ten + Ones • Eleven to Twenty", TrilingualText("11 = 1 Ten 1 One, 12 = 1 Ten 2 Ones ... 19 = 1 Ten 9 Ones, and 20 = 2 Tens 0 Ones!", "11 میں 1 دہائی 1 اکائی ہے، 12 میں 1 دہائی 2 اکائیاں ... اور 20 میں 2 دہائیاں ہیں!", "11 کې 1 لسیزه 1 یو دی، 12 کې 1 لسیزه 2 یوونه ... او 20 کې 2 لسیزې دي!")),
            LessonCardItem("🧮", "Place Value: Tens (T) & Ones (O)", "Left Digit = Tens • Right Digit = Ones", TrilingualText("In a 2-digit number like 36, the left digit 3 is in the Tens place (30) and the right digit 6 is in the Ones place (6).", "36 جیسے دو ہندسی نمبر میں بایاں ہندسہ 3 دہائی (30) ہے اور دایاں ہندسہ 6 اکائی (6) ہے۔", "په 36 غوندې دوه عددي شمېره کې کیڼ عدد 3 لسیزه (30) او ښی عدد 6 یوونه (6) دي.")),
            LessonCardItem("🌟", "Tens Family: 10 to 90", "10, 20, 30, 40, 50, 60, 70, 80, 90", TrilingualText("1 Ten = 10, 2 Tens = 20, 3 Tens = 30, 4 Tens = 40, 5 Tens = 50, 6 Tens = 60, 7 Tens = 70, 8 Tens = 80, 9 Tens = 90.", "1 دہائی = 10، 2 دہائیاں = 20، 3 دہائیاں = 30 ... 9 دہائیاں = 90۔", "1 لسیزه = 10، 2 لسیزې = 20، 3 لسیزې = 30 ... 9 لسیزې = 90."))
        ),
        exercises = listOf(
            ExerciseQuizItem("🧮", TrilingualText("In the number 58, how many TENS are there?", "نمبر 58 میں کتنی دہائیاں (Tens) ہیں؟", "په 58 شمېره کې څو لسیزې (Tens) دي؟"), "5 Tens", listOf("5 Tens", "8 Tens", "58 Tens"), TrilingualText("Correct! 58 has 5 Tens and 8 Ones.", "درست! 58 میں 5 دہائیاں اور 8 اکائیاں ہیں۔", "سمه ده! 58 کې 5 لسیزې او 8 یوونه دي.")),
            ExerciseQuizItem("📦", TrilingualText("What number do 3 Tens and 0 Ones make?", "3 دہائیاں اور 0 اکائیاں کون سا نمبر بناتی ہیں؟", "3 لسیزې او 0 یوونه کومه شمېره جوړوي؟"), "30", listOf("30", "3", "13"), TrilingualText("Awesome! 3 Tens and 0 Ones make 30 (Thirty).", "شاباش! 3 دہائیاں اور 0 اکائیاں 30 بناتی ہیں۔", "آفرین! 3 لسیزې او 0 یوونه 30 جوړوي."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 5: UNIT 1 (Pages 33–42) — Number 100, Order & Ordinals (1st–10th)
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 5,
        pillLabel = "Unit 1 • P.33–42",
        titleEn = "Unit 1: Number 100, Ordering & Ordinal Numbers",
        pageRangeText = "Pages 33–42 • 100, Ascending/Descending & 1st to 10th",
        subtitle = TrilingualText(
            en = "Watch the Race Cars finish 1st to 10th, build 100, and order numbers!",
            ur = "ریس کاروں کو پہلی (1st) سے دسویں (10th) پوزیشن پر آتے دیکھیں، 100 بنائیں اور ترتیب سیکھیں!",
            ps = "د سیالۍ موټرونه له لومړي (1st) څخه تر لسم (10th) مقام پورې وګورئ، 100 جوړ کړئ او ترتیب زده کړئ!"
        ),
        gameBadge = "🏎️ Ordinal Race & 100",
        mechanic = MathsMechanic.ORDINAL_RACE_TRACK,
        mascotEmoji = "🏎️",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "💯",
                promptTitle = "99 + 1 More = ?",
                promptSub = TrilingualText(
                    en = "9 Tens and 10 Ones make 10 Tens! What is the first 3-digit number?",
                    ur = "99 میں 1 اور ملائیں تو 10 دہائیاں بنتی ہیں! پہلا تین ہندسی نمبر کون سا ہے؟",
                    ps = "له 99 سره 1 بل یوځای کړئ نو 10 لسیزې جوړیږي! لومړۍ درې عددي شمېره کومه ده؟"
                ),
                correctAnswer = "100 (One Hundred)",
                options = listOf("100 (One Hundred)", "90 (Ninety)", "99 (Ninety-nine)"),
                voiceExplain = TrilingualText(
                    en = "10 Tens make 100! One Hundred has 3 digits!",
                    ur = "10 دہائیاں مل کر 100 (ایک سو) بناتی ہیں! 100 میں تین ہندسے ہیں!",
                    ps = "10 لسیزې 100 (یو سل) جوړوي! 100 درې عددونه لري!"
                ),
                visualCountA = 1,
                visualTag = "RACE:1"
            ),
            MathsRoundItem(
                promptEmoji = "🥇",
                promptTitle = "Who Wins the Gold Trophy at Position #1?",
                promptSub = TrilingualText(
                    en = "The red race car crossed the finish line at number 1! What is its ordinal position?",
                    ur = "سرخ ریس کار سب سے پہلے نمبر 1 پر پہنچی! اس کی پوزیشن کو کیا کہتے ہیں؟",
                    ps = "سور موټر تر ټولو مخکې په 1 لمبر ورسېد! د هغه مقام ته څه ویل کیږي؟"
                ),
                correctAnswer = "1st (First)",
                options = listOf("1st (First)", "2nd (Second)", "3rd (Third)"),
                voiceExplain = TrilingualText(
                    en = "Position number 1 is called 1st — First!",
                    ur = "پوزیشن نمبر 1 کو First (پہلا - 1st) کہتے ہیں!",
                    ps = "لومړي مقام ته First (لومړی - 1st) ویل کیږي!"
                ),
                visualCountA = 1,
                visualTag = "RACE:1"
            ),
            MathsRoundItem(
                promptEmoji = "🥉",
                promptTitle = "Position #3 on the Race Track?",
                promptSub = TrilingualText(
                    en = "1st is First, 2nd is Second. What do we call position number 3?",
                    ur = "1st پہلا ہے، 2nd دوسرا ہے۔ پوزیشن نمبر 3 کو کیا کہتے ہیں؟",
                    ps = "1st لومړی دی، 2nd دویم دی. درېیم مقام ته څه ویل کیږي؟"
                ),
                correctAnswer = "3rd (Third)",
                options = listOf("3rd (Third)", "4th (Fourth)", "5th (Fifth)"),
                voiceExplain = TrilingualText(
                    en = "Position number 3 is called 3rd — Third!",
                    ur = "پوزیشن نمبر 3 کو Third (تیسرا - 3rd) کہتے ہیں!",
                    ps = "درېیم مقام ته Third (درېیم - 3rd) ویل کیږي!"
                ),
                visualCountA = 3,
                visualTag = "RACE:3"
            ),
            MathsRoundItem(
                promptEmoji = "📈",
                promptTitle = "Ascending Order (Smallest → Greatest)",
                promptSub = TrilingualText(
                    en = "Arrange the numbers 25, 12, 48 from SMALLEST to GREATEST!",
                    ur = "نمبروں 25، 12، 48 کو چھوٹے سے بڑے (صعودی ترتیب) میں لکھیں!",
                    ps = "شمېرې 25، 12، 48 له کوچنۍ څخه لویې (ختونکي ترتیب) ته واچوئ!"
                ),
                correctAnswer = "12 → 25 → 48",
                options = listOf("12 → 25 → 48", "48 → 25 → 12", "25 → 12 → 48"),
                voiceExplain = TrilingualText(
                    en = "Ascending order goes from smallest to greatest: 12, then 25, then 48!",
                    ur = "صعودی ترتیب چھوٹے سے بڑے کی طرف جاتی ہے: 12، پھر 25، پھر 48!",
                    ps = "ختونکی ترتیب له کوچنۍ څخه لویې ته ځي: 12، بیا 25، بیا 48!"
                ),
                visualCountA = 5,
                visualTag = "RACE:5"
            ),
            MathsRoundItem(
                promptEmoji = "📉",
                promptTitle = "Descending Order (Greatest → Smallest)",
                promptSub = TrilingualText(
                    en = "Arrange 15, 80, 42 from GREATEST to SMALLEST!",
                    ur = "15، 80، 42 کو بڑے سے چھوٹے (نزولی ترتیب) میں لگائیں!",
                    ps = "15، 80، 42 له لویې څخه کوچنۍ (کوزېدونکي ترتیب) ته واچوئ!"
                ),
                correctAnswer = "80 → 42 → 15",
                options = listOf("80 → 42 → 15", "15 → 42 → 80", "42 → 80 → 15"),
                voiceExplain = TrilingualText(
                    en = "Descending order starts with the biggest number 80 down to 15!",
                    ur = "نزولی ترتیب سب سے بڑے نمبر 80 سے شروع ہو کر 15 تک آتی ہے!",
                    ps = "کوزېدونکی ترتیب له لویې شمېرې 80 څخه تر 15 پورې راکښته کیږي!"
                ),
                visualCountA = 10,
                visualTag = "RACE:10"
            )
        ),
        lessons = listOf(
            LessonCardItem("💯", "Introducing 100 (One Hundred)", "10 Tens = 1 Hundred • Smallest 3-Digit Number", TrilingualText("99 + 1 = 100. In 100, there is 1 Hundred, 0 Tens, and 0 Ones.", "99 + 1 = 100۔ 100 میں 1 سینکڑہ، 0 دہائی اور 0 اکائی ہے۔", "99 + 1 = 100. په 100 کې 1 سلګونه، 0 لسیزې او 0 یوونه دي.")),
            LessonCardItem("🏆", "Ordinal Numbers (1st to 10th)", "1st First • 2nd Second • 3rd Third ... 10th Tenth", TrilingualText("Ordinal numbers tell position: 1st (First), 2nd (Second), 3rd (Third), 4th (Fourth), 5th (Fifth), 6th (Sixth), 7th (Seventh), 8th (Eighth), 9th (Ninth), 10th (Tenth).", "ترتیبی اعداد پوزیشن بتاتے ہیں: 1st پہلا، 2nd دوسرا، 3rd تیسرا ... 10th دسواں۔", "ترتیبي شمېرې مقام ښیي: 1st لومړی، 2nd دویم، 3rd درېیم ... 10th لسم.")),
            LessonCardItem("📊", "Ascending & Descending Order", "Ascending (Up ↑) • Descending (Down ↓)", TrilingualText("Ascending order arranges numbers from smallest to greatest (10, 20, 30). Descending order arranges from greatest to smallest (30, 20, 10).", "صعودی ترتیب (Ascending) چھوٹے سے بڑے کی طرف اور نزولی ترتیب (Descending) بڑے سے چھوٹے کی طرف ہوتی ہے۔", "ختونکی ترتیب (Ascending) له کوچنۍ څخه لویې ته او کوزېدونکی (Descending) له لویې څخه کوچنۍ ته وي."))
        ),
        exercises = listOf(
            ExerciseQuizItem("💯", TrilingualText("How many Tens make 100?", "کتنی دہائیاں مل کر 100 بناتی ہیں؟", "څو لسیزې 100 جوړوي؟"), "10 Tens", listOf("10 Tens", "9 Tens", "1 Ten"), TrilingualText("Correct! 10 Tens make 100.", "درست! 10 دہائیاں مل کر 100 بناتی ہیں۔", "سمه ده! 10 لسیزې 100 جوړوي.")),
            ExerciseQuizItem("🏅", TrilingualText("What is the word for 2nd?", "2nd کو الفاظ میں کیا کہتے ہیں؟", "2nd ته په تورو کې څه ویل کیږي؟"), "Second", listOf("Second", "First", "Third"), TrilingualText("Great job! 2nd is Second.", "شاباش! 2nd کو Second (دوسرا) کہتے ہیں۔", "آفرین! 2nd ته Second (دویم) ویل کیږي."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 6: UNIT 2 (Pages 43–58) — Addition (+) Stories & Number Bonds
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 6,
        pillLabel = "Unit 2 • P.43–58",
        titleEn = "Unit 2: Addition (+) — Putting Together",
        pageRangeText = "Pages 43–58 • Addition (+ and =) up to 20 & 2-Digit",
        subtitle = TrilingualText(
            en = "Watch the two fruit baskets combine together with '+' and count the total!",
            ur = "دونوں ٹوکریوں کے پھلوں کو '+' کے ساتھ ملتے ہوئے دیکھیں اور کل تعداد گنیں!",
            ps = "د دواړو ټوکریو مېوې د '+' سره یوځای کېدو کې وګورئ او ټولې وشمېرئ!"
        ),
        gameBadge = "🍎 Addition Tree (+)",
        mechanic = MathsMechanic.ADDITION_FRUIT_TREE,
        mascotEmoji = "➕",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🍎",
                promptTitle = "Solve: 3 + 2 = ?",
                promptSub = TrilingualText(
                    en = "Harris has 3 red apples and Hareem gives him 2 more apples. How many altogether?",
                    ur = "حارث کے پاس 3 سیب ہیں اور حریم نے اسے 2 اور سیب دیے۔ کل کتنے سیب ہوئے؟",
                    ps = "حارث 3 مڼې لري او حریم هغه ته 2 نورې مڼې ورکړې. ټولې څو مڼې شوې؟"
                ),
                correctAnswer = "5",
                options = listOf("5", "4", "6"),
                voiceExplain = TrilingualText(
                    en = "Count 3 apples plus 2 apples altogether!",
                    ur = "3 سیب جمع 2 سیب کل ملا کر گنیں!",
                    ps = "3 مڼې جمع 2 مڼې ټولې یوځای وشمېرئ!"
                ),
                visualCountA = 3,
                visualCountB = 2,
                visualEmojiA = "🍎",
                visualEmojiB = "🍎"
            ),
            MathsRoundItem(
                promptEmoji = "🍊",
                promptTitle = "Solve: 4 + 4 = ?",
                promptSub = TrilingualText(
                    en = "4 sweet oranges in the left basket + 4 oranges in the right basket!",
                    ur = "بائیں ٹوکری میں 4 مالٹے + دائیں ٹوکری میں 4 مالٹے!",
                    ps = "په کیڼه ټوکرۍ کې 4 مالټې + په ښۍ ټوکرۍ کې 4 مالټې!"
                ),
                correctAnswer = "8",
                options = listOf("8", "7", "9"),
                voiceExplain = TrilingualText(
                    en = "4 oranges plus 4 oranges equals how many?",
                    ur = "4 مالٹے جمع 4 مالٹے کتنے ہوتے ہیں؟",
                    ps = "4 مالټې جمع 4 مالټې څو کیږي؟"
                ),
                visualCountA = 4,
                visualCountB = 4,
                visualEmojiA = "🍊",
                visualEmojiB = "🍊"
            ),
            MathsRoundItem(
                promptEmoji = "🍓",
                promptTitle = "Adding Zero: 6 + 0 = ?",
                promptSub = TrilingualText(
                    en = "6 strawberries in a bowl + 0 strawberries in an empty bowl = ?",
                    ur = "ایک پیالے میں 6 اسٹرابیریز + خالی پیالے میں 0 اسٹرابیریز = ؟",
                    ps = "په یوه کاسه کې 6 سټرابري + په تشه کاسه کې 0 سټرابري = ؟"
                ),
                correctAnswer = "6",
                options = listOf("6", "0", "7"),
                voiceExplain = TrilingualText(
                    en = "When we add 0 to any number, the number stays the same!",
                    ur = "جب ہم کسی بھی نمبر میں صفر جمع کرتے ہیں تو وہی نمبر رہتا ہے!",
                    ps = "کله چې موږ له هرې شمېرې سره صفر جمع کړو، شمېره هماغسې پاتې کیږي!"
                ),
                visualCountA = 6,
                visualCountB = 0,
                visualEmojiA = "🍓",
                visualEmojiB = "🍓"
            ),
            MathsRoundItem(
                promptEmoji = "🧩",
                promptTitle = "Missing Number: 3 + [ ? ] = 7",
                promptSub = TrilingualText(
                    en = "We have 3 stars. How many MORE stars do we need to make 7?",
                    ur = "ہمارے پاس 3 ستارے ہیں۔ 7 بنانے کے لیے مزید کتنے ستارے چاہئیں؟",
                    ps = "موږ 3 ستوري لرو. د 7 جوړولو لپاره څو نورو ستورو ته اړتیا لرو؟"
                ),
                correctAnswer = "4",
                options = listOf("4", "3", "5"),
                voiceExplain = TrilingualText(
                    en = "Count up from 3 to 7: 4, 5, 6, 7! How many steps is that?",
                    ur = "3 سے 7 تک آگے گنیں: 4، 5، 6، 7! یہ کتنے قدم ہیں؟",
                    ps = "له 3 څخه تر 7 پورې وشمېرئ: 4، 5، 6، 7! دا څو ګامونه دي؟"
                ),
                visualCountA = 3,
                visualCountB = 4,
                visualEmojiA = "⭐",
                visualEmojiB = "🌟"
            ),
            MathsRoundItem(
                promptEmoji = "🍬",
                promptTitle = "2-Digit Addition: 12 + 5 = ?",
                promptSub = TrilingualText(
                    en = "Add Ones first (2 + 5 = 7) and keep 1 Ten (10)! What is 12 + 5?",
                    ur = "پہلے اکائیاں جمع کریں (2 + 5 = 7) اور 1 دہائی ساتھ رکھیں! 12 + 5 کیا ہے؟",
                    ps = "لومړی یوونه جمع کړئ (2 + 5 = 7) او 1 لسیزه ورسره کېږدئ! 12 + 5 څو کیږي؟"
                ),
                correctAnswer = "17",
                options = listOf("17", "16", "18"),
                voiceExplain = TrilingualText(
                    en = "12 plus 5 equals 17!",
                    ur = "12 جمع 5 برابر ہے 17 کے!",
                    ps = "12 جمع 5 مساوي دي له 17 سره!"
                ),
                visualCountA = 5,
                visualCountB = 2,
                visualEmojiA = "🍬",
                visualEmojiB = "🍬"
            )
        ),
        lessons = listOf(
            LessonCardItem("➕", "Addition Symbol (+) & Equals (=)", "3 + 2 = 5 • Putting Together", TrilingualText("'+' is the Plus sign for Addition (putting together). '=' is the Equals sign showing the total altogether.", "'+' جمع کا نشان ہے جس کا مطلب چیزوں کو ملانا ہے۔ '=' برابر کا نشان ہے جو کل تعداد بتاتا ہے۔", "'+' د جمعې نښه ده چې معنی یې یوځای کول دي. '=' د مساوي نښه ده چې ټول شمېر ښیي.")),
            LessonCardItem("0️⃣", "Adding Zero (0)", "5 + 0 = 5 • 0 + 8 = 8", TrilingualText("Adding zero to a number does not change it! 5 + 0 = 5.", "کسی نمبر میں صفر جمع کرنے سے نمبر تبدیل نہیں ہوتا! 5 + 0 = 5۔", "له یوې شمېرې سره د صفر جمع کول هغه نه بدلوي! 5 + 0 = 5.")),
            LessonCardItem("🧮", "2-Digit Vertical Addition", "Add Ones (O) first, then Tens (T)", TrilingualText("To add 23 + 14: First add Ones (3 + 4 = 7), then add Tens (2 + 1 = 3) to get 37!", "23 + 14 جمع کرنے کے لیے: پہلے اکائیاں جمع کریں (3 + 4 = 7)، پھر دہائیاں (2 + 1 = 3)، جواب 37!", "د 23 + 14 جمع کولو لپاره: لومړی یوونه جمع کړئ (3 + 4 = 7)، بیا لسیزې (2 + 1 = 3)، ځواب 37!"))
        ),
        exercises = listOf(
            ExerciseQuizItem("➕", TrilingualText("What is 5 + 3?", "5 + 3 کیا ہوتا ہے؟", "5 + 3 څو کیږي؟"), "8", listOf("8", "7", "9"), TrilingualText("Correct! 5 + 3 = 8.", "درست! 5 + 3 = 8۔", "سمه ده! 5 + 3 = 8.")),
            ExerciseQuizItem("0️⃣", TrilingualText("What is 9 + 0?", "9 + 0 کیا ہوتا ہے؟", "9 + 0 څو کیږي؟"), "9", listOf("9", "0", "10"), TrilingualText("Spot on! Adding 0 keeps 9 the same.", "شاباش! 0 جمع کرنے سے 9 وہی رہتا ہے۔", "آفرین! د 0 جمع کولو سره 9 هماغسې پاتې کیږي."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 7: UNIT 2 (Pages 59–74) — Subtraction (-) Take-Away Arcade
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 7,
        pillLabel = "Unit 2 • P.59–74",
        titleEn = "Unit 2: Subtraction (–) — Taking Away",
        pageRangeText = "Pages 59–74 • Subtraction (– and =) & Crossing Out",
        subtitle = TrilingualText(
            en = "Watch the crossed-out items pop with '✕' and count how many are LEFT!",
            ur = "کاٹے گئے غباروں کو '✕' کے ساتھ پھٹتے دیکھیں اور گنیں کہ کتنے باقی بچے ہیں!",
            ps = "په '✕' سره چاودېدونکې پوکاڼۍ وګورئ او وشمېرئ چې څومره پاتې دي!"
        ),
        gameBadge = "🎈 Balloon Pop (–)",
        mechanic = MathsMechanic.SUBTRACTION_BALLOON_POP,
        mascotEmoji = "➖",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🎈",
                promptTitle = "Solve: 5 – 2 = ?",
                promptSub = TrilingualText(
                    en = "There are 5 balloons. 2 balloons POP (✕)! How many balloons are left?",
                    ur = "کل 5 غبارے ہیں۔ 2 غبارے پھٹ گئے (✕)! اب کتنے غبارے باقی بچے؟",
                    ps = "ټولې 5 پوکاڼۍ دي. 2 پوکاڼۍ وچاودېدې (✕)! اوس څو پوکاڼۍ پاتې شوې؟"
                ),
                correctAnswer = "3",
                options = listOf("3", "2", "4"),
                voiceExplain = TrilingualText(
                    en = "5 balloons take away 2 popped balloons leaves how many?",
                    ur = "5 غباروں میں سے 2 نکال دیں تو کتنے بچتے ہیں؟",
                    ps = "له 5 پوکاڼیو څخه 2 وباسئ نو څو پاتې کیږي؟"
                ),
                visualCountA = 5, // Total
                visualCountB = 2, // Crossed out
                visualEmojiA = "🎈"
            ),
            MathsRoundItem(
                promptEmoji = "🧁",
                promptTitle = "Solve: 7 – 3 = ?",
                promptSub = TrilingualText(
                    en = "7 cupcakes on the table. We eat 3 cupcakes (✕)! How many are left?",
                    ur = "میز پر 7 کپ کیک ہیں۔ ہم نے 3 کھا لیے (✕)! کتنے باقی بچے؟",
                    ps = "په مېز 7 کیکونه دي. موږ 3 وخوړل (✕)! څو پاتې شول؟"
                ),
                correctAnswer = "4",
                options = listOf("4", "5", "3"),
                voiceExplain = TrilingualText(
                    en = "Count the cupcakes that are NOT crossed out!",
                    ur = "وہ کپ کیک گنیں جن پر کاٹے کا نشان نہیں ہے!",
                    ps = "هغه کیکونه وشمېرئ چې چلیپا شوي نه دي!"
                ),
                visualCountA = 7,
                visualCountB = 3,
                visualEmojiA = "🧁"
            ),
            MathsRoundItem(
                promptEmoji = "🐸",
                promptTitle = "Subtracting All: 4 – 4 = ?",
                promptSub = TrilingualText(
                    en = "4 frogs were on a log and all 4 jumped into the pond (✕)!",
                    ur = "لکڑی پر 4 مینڈک تھے اور چاروں تالاب میں کود گئے (✕)!",
                    ps = "په لرګي 4 چنګښې وې او څلور واړه حوض ته ټوپ کړل (✕)!"
                ),
                correctAnswer = "0",
                options = listOf("0", "4", "1"),
                voiceExplain = TrilingualText(
                    en = "When we subtract a number from itself, 4 minus 4 leaves Zero!",
                    ur = "جب ہم کسی نمبر میں سے وہی نمبر تفریق کرتے ہیں تو 0 بچتا ہے!",
                    ps = "کله چې موږ له یوې شمېرې څخه هماغه شمېره منفي کړو، 0 پاتې کیږي!"
                ),
                visualCountA = 4,
                visualCountB = 4,
                visualEmojiA = "🐸"
            ),
            MathsRoundItem(
                promptEmoji = "🦆",
                promptTitle = "Solve: 9 – 4 = ?",
                promptSub = TrilingualText(
                    en = "9 ducks swimming, 4 ducks fly away (✕). How many ducks remain?",
                    ur = "9 بطخیں تیر رہی ہیں، 4 اڑ گئیں (✕)۔ کتنی بطخیں باقی رہیں؟",
                    ps = "9 هیلۍ لامبو وهي، 4 والوتلې (✕). څو هیلۍ پاتې شوې؟"
                ),
                correctAnswer = "5",
                options = listOf("5", "6", "4"),
                voiceExplain = TrilingualText(
                    en = "9 minus 4 leaves 5 ducks!",
                    ur = "9 تفریق 4 برابر ہے 5 کے!",
                    ps = "9 منفي 4 مساوي دي له 5 سره!"
                ),
                visualCountA = 9,
                visualCountB = 4,
                visualEmojiA = "🦆"
            ),
            MathsRoundItem(
                promptEmoji = "✏️",
                promptTitle = "2-Digit Subtraction: 16 – 4 = ?",
                promptSub = TrilingualText(
                    en = "Subtract Ones (6 – 4 = 2) and keep 1 Ten (10)! What is 16 – 4?",
                    ur = "اکائیوں کو تفریق کریں (6 – 4 = 2) اور 1 دہائی ساتھ رکھیں! 16 – 4 کیا ہے؟",
                    ps = "یوونه منفي کړئ (6 – 4 = 2) او 1 لسیزه ورسره کېږدئ! 16 – 4 څو کیږي؟"
                ),
                correctAnswer = "12",
                options = listOf("12", "11", "14"),
                voiceExplain = TrilingualText(
                    en = "16 minus 4 equals 12!",
                    ur = "16 میں سے 4 نکالیں تو 12 بچتے ہیں!",
                    ps = "له 16 څخه 4 وباسئ نو 12 پاتې کیږي!"
                ),
                visualCountA = 8,
                visualCountB = 4,
                visualEmojiA = "✏️"
            )
        ),
        lessons = listOf(
            LessonCardItem("➖", "Subtraction Symbol (–)", "5 – 2 = 3 • Taking Away / Left Over", TrilingualText("'–' is the Minus sign for Subtraction. We use it to find how many are LEFT when some are taken away.", "'–' تفریق (منفی) کا نشان ہے۔ یہ بتاتا ہے کہ کچھ چیزیں نکالنے کے بعد کتنی باقی بچی ہیں۔", "'–' د منفي نښه ده. دا ښیي چې د ځینو شیانو ایستلو وروسته څومره پاتې دي.")),
            LessonCardItem("0️⃣", "Subtracting Zero & Subtracting Itself", "6 – 0 = 6 • 6 – 6 = 0", TrilingualText("Subtracting 0 leaves the number unchanged (6 – 0 = 6). Subtracting a number from itself gives 0 (6 – 6 = 0).", "صفر تفریق کرنے سے نمبر نہیں بدلتا (6 – 0 = 6)۔ نمبر سے وہی نمبر نکالیں تو 0 بچتا ہے (6 – 6 = 0)۔", "د صفر منفي کولو سره شمېره نه بدلیږي (6 – 0 = 6). له شمېرې څخه خپله شمېره منفي کول 0 ورکوي (6 – 6 = 0).")),
            LessonCardItem("🧮", "2-Digit Subtraction", "Subtract Ones first, then Tens", TrilingualText("To solve 48 – 23: Subtract Ones (8 – 3 = 5), then subtract Tens (4 – 2 = 2) = 25!", "48 – 23 حل کرنے کے لیے: پہلے اکائیاں گھٹائیں (8 – 3 = 5)، پھر دہائیاں (4 – 2 = 2) = 25!", "د 48 – 23 حل کولو لپاره: لومړی یوونه منفي کړئ (8 – 3 = 5)، بیا لسیزې (4 – 2 = 2) = 25!"))
        ),
        exercises = listOf(
            ExerciseQuizItem("➖", TrilingualText("What is 8 – 3?", "8 – 3 کیا ہوتا ہے؟", "8 – 3 څو کیږي؟"), "5", listOf("5", "6", "4"), TrilingualText("Correct! 8 minus 3 is 5.", "درست! 8 میں سے 3 نکالیں تو 5 بچتے ہیں۔", "سمه ده! له 8 څخه 3 منفي کول 5 کیږي.")),
            ExerciseQuizItem("0️⃣", TrilingualText("What is 7 – 7?", "7 – 7 کیا ہوتا ہے؟", "7 – 7 څو کیږي؟"), "0", listOf("0", "7", "1"), TrilingualText("Great job! Any number minus itself equals 0.", "شاباش! کسی نمبر سے وہی نمبر تفریق کریں تو 0 آتا ہے۔", "آفرین! له هرې شمېرې څخه خپله شمېره منفي کول 0 کیږي."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 8: UNIT 3 (Pages 75–86) — Measurement: Length, Height & Mass
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 8,
        pillLabel = "Unit 3 • P.75–86",
        titleEn = "Unit 3: Measurement — Length & Mass",
        pageRangeText = "Pages 75–86 • Long/Short, Tall/Short & Heavy/Light",
        subtitle = TrilingualText(
            en = "Watch the 2D Seesaw tilt for Heavy & Light, and compare Tall, Short, and Long!",
            ur = "بھاری اور ہلکی چیزوں کے لیے سی سا (ترازو) کو جھکتے دیکھیں، اور لمبے/چھوٹے کا موازنہ کریں!",
            ps = "د درنو او سپکو شیانو لپاره تله وګورئ، او اوږد، لنډ او لوړ سره پرتله کړئ!"
        ),
        gameBadge = "⚖️ Seesaw & Ruler Lab",
        mechanic = MathsMechanic.SEESAW_MEASUREMENT_LAB,
        mascotEmoji = "⚖️",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🐘",
                promptTitle = "Heavy vs Light: Elephant vs Rabbit",
                promptSub = TrilingualText(
                    en = "Look at the Seesaw! The Elephant pushes the left side DOWN. The Elephant is ___ than the Rabbit!",
                    ur = "سی سا (ترازو) کو دیکھیں! ہاتھی نے بائیں طرف کو نیچے جھکا دیا۔ ہاتھی خرگوش سے ___ ہے!",
                    ps = "تلې ته وګورئ! فیل کیڼه خوا ښکته کړه. فیل له سوی څخه ___ دی!"
                ),
                correctAnswer = "Heavier",
                options = listOf("Heavier", "Lighter", "Shorter"),
                voiceExplain = TrilingualText(
                    en = "The elephant weighs much more, so it goes down on the seesaw! Is it Heavier or Lighter?",
                    ur = "ہاتھی کا وزن بہت زیادہ ہے اس لیے ترازو نیچے جھک گیا! وہ بھاری (Heavier) ہے یا ہلکا؟",
                    ps = "د فیل وزن ډېر زیات دی نو ځکه تله ښکته شوه! هغه دروند (Heavier) دی که سپک؟"
                ),
                visualEmojiA = "🐘",
                visualEmojiB = "🐇",
                visualTag = "SEESAW:LEFT_HEAVY"
            ),
            MathsRoundItem(
                promptEmoji = "🪶",
                promptTitle = "Feather vs Watermelon",
                promptSub = TrilingualText(
                    en = "On the balance scale, the Feather goes UP and the Watermelon goes DOWN. The Feather is ___!",
                    ur = "ترازو میں پر (Feather) اوپر جاتا ہے اور تربوز نیچے۔ پر کیا ہے؟",
                    ps = "په تله کې بڼکه پورته ځي او هندواڼه ښکته. بڼکه څنګه ده؟"
                ),
                correctAnswer = "Lighter",
                options = listOf("Lighter", "Heavier", "Taller"),
                voiceExplain = TrilingualText(
                    en = "A feather is very light! It goes up on the seesaw!",
                    ur = "پر بہت ہلکا ہوتا ہے! اس لیے ترازو میں اوپر رہتا ہے!",
                    ps = "بڼکه ډېره سپکه ده! نو په تله کې پورته ځي!"
                ),
                visualEmojiA = "🪶",
                visualEmojiB = "🍉",
                visualTag = "SEESAW:RIGHT_HEAVY"
            ),
            MathsRoundItem(
                promptEmoji = "🦒",
                promptTitle = "Giraffe vs Cat: Who is TALLER?",
                promptSub = TrilingualText(
                    en = "Look at the height bars! The Giraffe reaches high into the tree. The Giraffe is ___ than the Cat!",
                    ur = "قد کی پٹیوں کو دیکھیں! زرافہ درخت تک اونچا ہے۔ زرافہ بلی سے ___ ہے!",
                    ps = "د قد پټیو ته وګورئ! زرافه تر ونې پورې لوړه ده. زرافه له پیشو څخه ___ ده!"
                ),
                correctAnswer = "Taller",
                options = listOf("Taller", "Shorter", "Lighter"),
                voiceExplain = TrilingualText(
                    en = "Compare the heights of the giraffe and the cat!",
                    ur = "زرافے اور بلی کے قد کا موازنہ کریں!",
                    ps = "د زرافې او پیشو قدونه سره پرتله کړئ!"
                ),
                visualEmojiA = "🦒",
                visualEmojiB = "🐱",
                visualTag = "HEIGHT:LEFT_TALL"
            ),
            MathsRoundItem(
                promptEmoji = "🚆",
                promptTitle = "Train vs Bicycle: Which is LONGER?",
                promptSub = TrilingualText(
                    en = "Look at the horizontal length! A Train has many bogies. The Train is ___ than the Bicycle!",
                    ur = "لمبائی دیکھیں! ریل گاڑی کے بہت سے ڈبے ہوتے ہیں۔ ریل گاڑی سائیکل سے ___ ہے!",
                    ps = "اوږدوالي ته وګورئ! اورګاډی ډېرې ډبې لري. اورګاډی له بایسکل څخه ___ دی!"
                ),
                correctAnswer = "Longer",
                options = listOf("Longer", "Shorter", "Smaller"),
                voiceExplain = TrilingualText(
                    en = "Compare the length of the train and the bicycle!",
                    ur = "ریل گاڑی اور سائیکل کی لمبائی کا موازنہ کریں!",
                    ps = "د اورګاډي او بایسکل اوږدوالی سره پرتله کړئ!"
                ),
                visualEmojiA = "🚆",
                visualEmojiB = "🚲",
                visualTag = "LENGTH:LEFT_LONG"
            )
        ),
        lessons = listOf(
            LessonCardItem("📏", "Length: Long, Longer, Longest & Short, Shorter, Shortest", "Comparing Horizontal Length", TrilingualText("We use Long and Short to compare lengths of pencils, snakes, caterpillars, and trains.", "ہم پنسل، سانپ اور ریل گاڑی کی لمبائی کے موازنے کے لیے Long (لمبا) اور Short (چھوٹا) استعمال کرتے ہیں۔", "موږ د پنسل، مار او اورګاډي د اوږدوالي پرتله کولو لپاره Long (اوږد) او Short (لنډ) کاروو.")),
            LessonCardItem("🦒", "Height: Tall, Taller, Tallest & High, Higher, Highest", "Comparing Vertical Height", TrilingualText("We use Tall and Short for standing objects like giraffes, trees, and buildings.", "کھڑی چیزوں جیسے زرافے، درخت اور عمارت کے قد کے لیے Tall (لمبا/اونچا) اور Short (چھوٹا) استعمال ہوتا ہے۔", "د ولاړو شیانو لکه زرافې، ونې او ودانۍ د قد لپاره Tall (لوړ) او Short (ټیټ) کارول کیږي.")),
            LessonCardItem("⚖️", "Mass: Heavy, Heavier, Heaviest & Light, Lighter, Lightest", "Comparing Weight on a Balance", TrilingualText("Heavy objects (like an elephant) push the balance pan down. Light objects (like a rabbit or feather) go up.", "بھاری چیزیں (Heavy) ترازو کے پلڑے کو نیچے جھکا دیتی ہیں جبکہ ہلکی چیزیں (Light) اوپر جاتی ہیں۔", "درانه شیان (Heavy) د تلې پله ښکته کوي او سپک شیان (Light) پورته ځي."))
        ),
        exercises = listOf(
            ExerciseQuizItem("🐘", TrilingualText("Which animal is the HEAVIEST: Mouse, Cat, or Elephant?", "ان میں سے سب سے بھاری (Heaviest) جانور کون سا ہے: چوہا، بلی یا ہاتھی؟", "په دې کې ترټولو دروند (Heaviest) حیوان کوم دی: موږک، پیشو که فیل؟"), "Elephant", listOf("Elephant", "Cat", "Mouse"), TrilingualText("Correct! The Elephant is the heaviest.", "درست! ہاتھی سب سے بھاری ہے۔", "سمه ده! فیل ترټولو دروند دی.")),
            ExerciseQuizItem("🦒", TrilingualText("Which animal is TALLER: a Giraffe or a Hen?", "کون سا جانور زیادہ لمبا (Taller) ہے: زرافہ یا مرغی؟", "کوم حیوان ډېر لوړ (Taller) دی: زرافه که چرګه؟"), "Giraffe", listOf("Giraffe", "Hen", "Both equal"), TrilingualText("Spot on! A Giraffe is much taller than a hen.", "شاباش! زرافہ مرغی سے بہت اونچا ہے۔", "آفرین! زرافه له چرګې څخه ډېره لوړه ده."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 9: UNIT 4 (Pages 87–100) — Money (Pakistani Coins & Notes)
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 9,
        pillLabel = "Unit 4 • P.87–100",
        titleEn = "Unit 4: Money — Pakistani Coins & Notes",
        pageRangeText = "Pages 87–100 • Rs 1, 2, 5, 10 Coins & Rs 10, 20, 50, 100 Notes",
        subtitle = TrilingualText(
            en = "Welcome to the Pakistani Toyshop! Count the Rupee Coins & Notes to buy toys!",
            ur = "پاکستانی ٹوائے شاپ میں خوش آمدید! کھلونے خریدنے کے لیے روپے کے سکے اور نوٹ گنیں!",
            ps = "پاکستاني د لوبتوکو دوکان ته ښه راغلاست! د لوبتوکو اخیستلو لپاره د روپیو سکې او نوټونه وشمېرئ!"
        ),
        gameBadge = "🪙 Pak Rupee Toyshop",
        mechanic = MathsMechanic.PAK_RUPEE_TOYSHOP,
        mascotEmoji = "🪙",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🪙",
                promptTitle = "Pay for the Candy: Rs 5 + Rs 2 = ?",
                promptSub = TrilingualText(
                    en = "You give the shopkeeper one Rs 5 coin and one Rs 2 coin. How much money is that?",
                    ur = "آپ دکاندار کو ایک 5 روپے کا سکہ اور ایک 2 روپے کا سکہ دیتے ہیں۔ یہ کل کتنے روپے ہیں؟",
                    ps = "تاسو دوکاندار ته یوه د 5 روپیو سکه او یوه د 2 روپیو سکه ورکوئ. دا ټولې څو روپۍ شوې؟"
                ),
                correctAnswer = "Rs 7",
                options = listOf("Rs 7", "Rs 6", "Rs 8"),
                voiceExplain = TrilingualText(
                    en = "Add the Rs 5 coin and Rs 2 coin together!",
                    ur = "5 روپے کے سکے اور 2 روپے کے سکے کو جمع کریں!",
                    ps = "د 5 روپیو سکه او د 2 روپیو سکه سره جمع کړئ!"
                ),
                visualCountA = 5,
                visualCountB = 2,
                visualTag = "MONEY:COIN_5_2"
            ),
            MathsRoundItem(
                promptEmoji = "💵",
                promptTitle = "Buy a Toy Car: Rs 20 + Rs 10 = ?",
                promptSub = TrilingualText(
                    en = "A toy car costs Rs 20 note + Rs 10 note! What is the total price?",
                    ur = "ایک کھلونا کار کی قیمت 20 روپے کا نوٹ + 10 روپے کا نوٹ ہے! کل قیمت کیا ہے؟",
                    ps = "د یوه موټر بیه د 20 روپیو نوټ + د 10 روپیو نوټ ده! ټوله بیه څومره ده؟"
                ),
                correctAnswer = "Rs 30",
                options = listOf("Rs 30", "Rs 25", "Rs 40"),
                voiceExplain = TrilingualText(
                    en = "20 Rupees plus 10 Rupees equals 30 Rupees!",
                    ur = "20 روپے جمع 10 روپے مل کر 30 روپے بنتے ہیں!",
                    ps = "20 روپۍ جمع 10 روپۍ 30 روپۍ کیږي!"
                ),
                visualCountA = 20,
                visualCountB = 10,
                visualTag = "MONEY:NOTE_20_10"
            ),
            MathsRoundItem(
                promptEmoji = "🧸",
                promptTitle = "Buy a Teddy Bear: Rs 50 + Rs 20 = ?",
                promptSub = TrilingualText(
                    en = "Combine one purple Rs 50 note and one Rs 20 note!",
                    ur = "ایک 50 روپے کا نوٹ اور ایک 20 روپے کا نوٹ ملائیں!",
                    ps = "یو د 50 روپیو نوټ او یو د 20 روپیو نوټ سره یوځای کړئ!"
                ),
                correctAnswer = "Rs 70",
                options = listOf("Rs 70", "Rs 60", "Rs 80"),
                voiceExplain = TrilingualText(
                    en = "50 Rupees plus 20 Rupees makes 70 Rupees!",
                    ur = "50 روپے جمع 20 روپے مل کر 70 روپے بنتے ہیں!",
                    ps = "50 روپۍ جمع 20 روپۍ 70 روپۍ کیږي!"
                ),
                visualCountA = 50,
                visualCountB = 20,
                visualTag = "MONEY:NOTE_50_20"
            ),
            MathsRoundItem(
                promptEmoji = "⚽",
                promptTitle = "Two Rs 50 Notes = ?",
                promptSub = TrilingualText(
                    en = "A football costs Rs 100. If you pay with Rs 50 + Rs 50, how much is that?",
                    ur = "فٹبال کی قیمت 100 روپے ہے۔50 روپے + 50 روپے کے دو نوٹ کتنے بنتے ہیں؟",
                    ps = "د فوټبال بیه 100 روپۍ ده. د 50 + 50 روپیو دوه نوټونه څومره کیږي؟"
                ),
                correctAnswer = "Rs 100",
                options = listOf("Rs 100", "Rs 90", "Rs 55"),
                voiceExplain = TrilingualText(
                    en = "Two 50 Rupee notes make 100 Rupees!",
                    ur = "پچاس روپے کے دو نوٹ مل کر 100 روپے بناتے ہیں!",
                    ps = "د پنځوسو روپیو دوه نوټونه 100 روپۍ جوړوي!"
                ),
                visualCountA = 50,
                visualCountB = 50,
                visualTag = "MONEY:NOTE_50_50"
            )
        ),
        lessons = listOf(
            LessonCardItem("🪙", "Pakistani Coins (Made of Metal)", "Rs 1 • Rs 2 • Rs 5 • Rs 10", TrilingualText("In Pakistan, coins are round and made of metal. Current coins are Rs 1, Rs 2, Rs 5, and Rs 10.", "پاکستان میں سکے دھات (Metal) سے بنے ہوتے ہیں۔ موجودہ سکے 1، 2، 5 اور 10 روپے کے ہیں۔", "په پاکستان کې سکې له فلز څخه جوړې دي. اوسنۍ سکې د 1، 2، 5 او 10 روپیو دي.")),
            LessonCardItem("💵", "Pakistani Currency Notes (Made of Paper)", "Rs 10 • Rs 20 • Rs 50 • Rs 100", TrilingualText("Currency notes are rectangular and made of special paper with Quaid-e-Azam's portrait: Rs 10 (Green), Rs 20, Rs 50 (Purple), and Rs 100 (Red).", "کرنسی نوٹ خاص کاغذ سے بنے ہوتے ہیں جن پر قائد اعظم کی تصویر ہوتی ہے: 10، 20، 50 اور 100 روپے۔", "د پیسو نوټونه له ځانګړي کاغذ څخه جوړ دي چې د قائد اعظم عکس پرې دی: 10، 20، 50 او 100 روپۍ.")),
            LessonCardItem("🛒", "Shopping & Making Change", "Adding Coins & Notes to Pay Exact Price", TrilingualText("To buy an item for Rs 15, we can give one Rs 10 note and one Rs 5 coin (10 + 5 = 15).", "15 روپے کی چیز خریدنے کے لیے ہم 10 روپے کا نوٹ اور 5 روپے کا سکہ دے سکتے ہیں (10 + 5 = 15)۔", "د 15 روپیو شي اخیستلو لپاره موږ د 10 روپیو نوټ او د 5 روپیو سکه ورکولی شو (10 + 5 = 15)."))
        ),
        exercises = listOf(
            ExerciseQuizItem("🪙", TrilingualText("What are coins made of?", "سکے کس چیز سے بنے ہوتے ہیں؟", "سکې له څه شي څخه جوړې دي؟"), "Metal", listOf("Metal", "Paper", "Wood"), TrilingualText("Correct! Coins are made of metal.", "درست! سکے دھات (Metal) سے بنے ہوتے ہیں۔", "سمه ده! سکې له فلز (Metal) څخه جوړې دي.")),
            ExerciseQuizItem("💵", TrilingualText("How many Rs 10 notes make Rs 20?", "10 روپے کے کتنے نوٹ مل کر 20 روپے بناتے ہیں؟", "د 10 روپیو څو نوټونه 20 روپۍ جوړوي؟"), "2 Notes", listOf("2 Notes", "5 Notes", "1 Note"), TrilingualText("Great job! Two Rs 10 notes (10 + 10) equal Rs 20.", "شاباش! 10 روپے کے 2 نوٹ مل کر 20 روپے بناتے ہیں۔", "آفرین! د 10 روپیو 2 نوټونه 20 روپۍ جوړوي."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 10: UNIT 5 (Pages 101–107) — Time: Analog & Digital Clocks
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 10,
        pillLabel = "Unit 5 • P.101–107",
        titleEn = "Unit 5: Reading Analog & Digital Clocks",
        pageRangeText = "Pages 101–107 • Hour Hand, Minute Hand & O'Clock",
        subtitle = TrilingualText(
            en = "Look at the live 2D Analog Clock! Check where the red Short Hour Hand points!",
            ur = "لائیو 2D گھڑی کو دیکھیں! دیکھیں کہ چھوٹی سرخ سوئی (گھنٹے والی سوئی) کس نمبر پر ہے!",
            ps = "ژوندۍ 2D ساعت ته وګورئ! وګورئ چې سور لنډ ستن (د ساعت ستن) کومې شمېرې ته اشاره کوي!"
        ),
        gameBadge = "⏰ Tick-Tock Clock",
        mechanic = MathsMechanic.ANALOG_CLOCK_ARCADE,
        mascotEmoji = "⏰",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🕖",
                promptTitle = "Hour Hand on 7, Minute Hand on 12",
                promptSub = TrilingualText(
                    en = "Look at the clock! The short red Hour Hand points to 7 and the long blue Minute Hand points to 12!",
                    ur = "گھڑی دیکھیں! چھوٹی سرخ سوئی 7 پر ہے اور لمبی نیلی سوئی 12 پر ہے! کیا وقت ہوا ہے؟",
                    ps = "ساعت ته وګورئ! لنډه سره ستن په 7 او اوږده شنه ستن په 12 ده! څو بجې دي؟"
                ),
                correctAnswer = "7 o'clock (07:00)",
                options = listOf("7 o'clock (07:00)", "12 o'clock (12:00)", "5 o'clock (05:00)"),
                voiceExplain = TrilingualText(
                    en = "When the minute hand is on 12 and the hour hand is on 7, what time is it?",
                    ur = "جب منٹ والی سوئی 12 پر اور گھنٹے والی سوئی 7 پر ہو تو کیا وقت ہوتا ہے؟",
                    ps = "کله چې د دقیقو ستن په 12 او د ساعت ستن په 7 وي، څو بجې وي؟"
                ),
                visualCountA = 7,
                visualTag = "CLOCK:7"
            ),
            MathsRoundItem(
                promptEmoji = "🕒",
                promptTitle = "Hour Hand on 3, Minute Hand on 12",
                promptSub = TrilingualText(
                    en = "The short red Hour Hand points to 3 and the long Minute Hand points to 12!",
                    ur = "چھوٹی سرخ سوئی 3 پر ہے اور لمبی سوئی 12 پر ہے!",
                    ps = "لنډه سره ستن په 3 او اوږده ستن په 12 ده!"
                ),
                correctAnswer = "3 o'clock (03:00)",
                options = listOf("3 o'clock (03:00)", "6 o'clock (06:00)", "9 o'clock (09:00)"),
                voiceExplain = TrilingualText(
                    en = "The short hour hand points to 3! Pick the matching digital time!",
                    ur = "گھنٹے والی چھوٹی سوئی 3 پر ہے! صحیح وقت چنیں!",
                    ps = "د ساعت لنډه ستن په 3 ده! سم وخت وټاکئ!"
                ),
                visualCountA = 3,
                visualTag = "CLOCK:3"
            ),
            MathsRoundItem(
                promptEmoji = "🕘",
                promptTitle = "Hour Hand on 9, Minute Hand on 12",
                promptSub = TrilingualText(
                    en = "Bedtime! The short Hour Hand points to 9 and the long Minute Hand is at 12!",
                    ur = "سونے کا وقت! گھنٹے والی چھوٹی سوئی 9 پر ہے اور لمبی سوئی 12 پر!",
                    ps = "د ویده کېدو وخت! د ساعت لنډه ستن په 9 او اوږده ستن په 12 ده!"
                ),
                correctAnswer = "9 o'clock (09:00)",
                options = listOf("9 o'clock (09:00)", "8 o'clock (08:00)", "10 o'clock (10:00)"),
                voiceExplain = TrilingualText(
                    en = "Hour hand at 9 and minute hand at 12 shows 9 o'clock!",
                    ur = "گھنٹے والی سوئی 9 پر اور منٹ والی 12 پر 9 بجے دکھاتی ہے!",
                    ps = "د ساعت ستن په 9 او د دقیقو ستن په 12 نهه بجې ښیي!"
                ),
                visualCountA = 9,
                visualTag = "CLOCK:9"
            ),
            MathsRoundItem(
                promptEmoji = "🕛",
                promptTitle = "Both Hands Pointing Straight Up at 12!",
                promptSub = TrilingualText(
                    en = "Both the Hour Hand and the Minute Hand point to 12! What time is it?",
                    ur = "گھنٹے اور منٹ دونوں کی سوئیاں 12 پر ہیں! کیا وقت ہوا ہے؟",
                    ps = "د ساعت او دقیقو دواړه ستنې په 12 دي! څو بجې دي؟"
                ),
                correctAnswer = "12 o'clock (12:00)",
                options = listOf("12 o'clock (12:00)", "6 o'clock (06:00)", "1 o'clock (01:00)"),
                voiceExplain = TrilingualText(
                    en = "When both hands point to 12, it is 12 o'clock!",
                    ur = "جب دونوں سوئیاں 12 پر ہوں تو 12 بجے ہوتے ہیں!",
                    ps = "کله چې دواړه ستنې په 12 وي، دولس بجې دي!"
                ),
                visualCountA = 12,
                visualTag = "CLOCK:12"
            )
        ),
        lessons = listOf(
            LessonCardItem("🕰️", "The Face of an Analog Clock", "Numbers 1 to 12 • Short & Long Hands", TrilingualText("An analog clock has numbers from 1 to 12 around its face. The SHORT hand tells the HOUR, and the LONG hand tells the MINUTES.", "اینالاگ گھڑی پر 1 سے 12 تک نمبر ہوتے ہیں۔ چھوٹی سوئی گھنٹہ (Hour) بتاتی ہے اور لمبی سوئی منٹ (Minute) بتاتی ہے۔", "په ساعت باندې له 1 څخه تر 12 پورې شمېرې وي. لنډه ستن ساعت (Hour) او اوږده ستن دقیقې (Minute) ښیي.")),
            LessonCardItem("デジタル", "Digital Clock (07:00)", "Hours : Minutes separated by Two Dots (:)", TrilingualText("A digital clock shows time with digits like 07:00. The digits before ':' show Hours (07) and '00' shows exact o'clock.", "ڈیجیٹل گھڑی ہندسوں میں وقت دکھاتی ہے جیسے 07:00۔ دو نقطوں (:) سے پہلے گھنٹے اور بعد میں منٹ ہوتے ہیں۔", "ډیجیټل ساعت په شمېرو وخت ښیي لکه 07:00. له دوو ټکو (:) مخکې ساعتونه او وروسته دقیقې وي."))
        ),
        exercises = listOf(
            ExerciseQuizItem("⏰", TrilingualText("Which hand on the clock shows the HOUR?", "گھڑی کی کون سی سوئی گھنٹہ (Hour) بتاتی ہے؟", "د ساعت کومه ستن ساعت (Hour) ښیي؟"), "Short Hand", listOf("Short Hand", "Long Hand", "Numbers"), TrilingualText("Correct! The Short Hand is the Hour Hand.", "درست! چھوٹی سوئی گھنٹے والی سوئی ہے۔", "سمه ده! لنډه ستن د ساعت ستن ده.")),
            ExerciseQuizItem("🕗", TrilingualText("How do we write 8 o'clock on a digital clock?", "ڈیجیٹل گھڑی پر 8 بجے کیسے لکھے جاتے ہیں؟", "په ډیجیټل ساعت کې 8 بجې څنګه لیکل کیږي؟"), "08:00", listOf("08:00", "00:08", "12:08"), TrilingualText("Great job! 08:00 means 8 o'clock.", "شاباش! 08:00 کا مطلب 8 بجے ہے۔", "آفرین! 08:00 معنی 8 بجې دي."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 11: UNIT 5 (Pages 108–113) — Calendar: 7 Days, Solar & Islamic Months
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 11,
        pillLabel = "Unit 5 • P.108–113",
        titleEn = "Unit 5: Days of the Week & Solar/Islamic Months",
        pageRangeText = "Pages 108–113 • 7 Days, 12 Solar & 12 Islamic Months",
        subtitle = TrilingualText(
            en = "Ride the Weekly Calendar Train! Learn the 7 Days, 12 Solar Months, and 12 Islamic Months!",
            ur = "ہفتے کی کیلنڈر ٹرین کی سواری کریں! ہفتے کے 7 دن، 12 شمسی مہینے اور 12 اسلامی مہینے سیکھیں!",
            ps = "د اونۍ جنتري اورګاډي کې سفر وکړئ! د اونۍ 7 ورځې، 12 لمریزې او 12 اسلامي میاشتې زده کړئ!"
        ),
        gameBadge = "📅 Calendar Train",
        mechanic = MathsMechanic.CALENDAR_WHEEL_TRAIN,
        mascotEmoji = "📅",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🚂",
                promptTitle = "How Many Days Are in 1 Week?",
                promptSub = TrilingualText(
                    en = "Count the bogies of the Week Train from Monday to Sunday!",
                    ur = "پیر سے اتوار تک ہفتے کی ٹرین کے ڈبے گنیں!",
                    ps = "له دوشنبې څخه تر یکشنبې پورې د اونۍ اورګاډي ډبې وشمېرئ!"
                ),
                correctAnswer = "7 Days",
                options = listOf("7 Days", "5 Days", "12 Days"),
                voiceExplain = TrilingualText(
                    en = "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday! How many days in a week?",
                    ur = "پیر، منگل، بدھ، جمعرات، جمعہ، ہفتہ، اتوار! ایک ہفتے میں کتنے دن ہوتے ہیں؟",
                    ps = "دوشنبه، سې شنبه، چهارشنبه، پنجشنبه، جمعه، شنبه، یکشنبه! په یوه اونۍ کې څو ورځې دي؟"
                ),
                visualCountA = 7,
                visualTag = "CAL:WEEK"
            ),
            MathsRoundItem(
                promptEmoji = "🕌",
                promptTitle = "Which Day Comes After Thursday?",
                promptSub = TrilingualText(
                    en = "Monday → Tuesday → Wednesday → Thursday → [ ? ] (Jummah Day!)",
                    ur = "پیر ← منگل ← بدھ ← جمعرات ← [ ؟ ] (جمعہ کا مبارک دن!)",
                    ps = "دوشنبه ← سې شنبه ← چهارشنبه ← پنجشنبه ← [ ؟ ] (د جمعې مبارکه ورځ!)"
                ),
                correctAnswer = "Friday",
                options = listOf("Friday", "Sunday", "Tuesday"),
                voiceExplain = TrilingualText(
                    en = "Which day of the week comes right after Thursday?",
                    ur = "جمعرات کے فوراً بعد کون سا دن آتا ہے؟",
                    ps = "له پنجشنبې سمدستي وروسته کومه ورځ راځي؟"
                ),
                visualCountA = 5,
                visualTag = "CAL:FRI"
            ),
            MathsRoundItem(
                promptEmoji = "☀️",
                promptTitle = "First & Last Solar Months of the Year?",
                promptSub = TrilingualText(
                    en = "There are 12 Solar Months in a year. It starts with January and ends with ___!",
                    ur = "سال میں 12 شمسی مہینے ہوتے ہیں۔ پہلا مہینہ جنوری ہے اور آخری مہینہ ___ ہے!",
                    ps = "په کال کې 12 لمریزې میاشتې دي. لومړۍ میاشت جنوري ده او وروستۍ میاشت ___ ده!"
                ),
                correctAnswer = "December",
                options = listOf("December", "August", "March"),
                voiceExplain = TrilingualText(
                    en = "January is the 1st month and which month is the 12th and last month of the year?",
                    ur = "جنوری پہلا مہینہ ہے اور سال کا بارہواں اور آخری مہینہ کون سا ہے؟",
                    ps = "جنوري لومړۍ میاشت ده او د کال دولسمه او وروستۍ میاشت کومه ده؟"
                ),
                visualCountA = 12,
                visualTag = "CAL:SOLAR"
            ),
            MathsRoundItem(
                promptEmoji = "🌙",
                promptTitle = "First Month of the Islamic (Lunar) Calendar?",
                promptSub = TrilingualText(
                    en = "There are 12 Islamic Months. Which is the 1st Islamic month?",
                    ur = "اسلامی سال میں 12 قمری مہینے ہوتے ہیں۔ پہلا اسلامی مہینہ کون سا ہے؟",
                    ps = "په اسلامي کال کې 12 سپوږمیزې میاشتې دي. لومړۍ اسلامي میاشت کومه ده؟"
                ),
                correctAnswer = "Muharram",
                options = listOf("Muharram", "Ramadan", "Shawal"),
                voiceExplain = TrilingualText(
                    en = "The Islamic calendar begins with Muharram and ends with Zil-Hajj!",
                    ur = "اسلامی کیلنڈر کا آغاز محرم الحرام سے ہوتا ہے اور ذوالحج پر ختم ہوتا ہے!",
                    ps = "اسلامي جنتري له محرم الحرام څخه پیل کیږي او په ذوالحج پای ته رسیږي!"
                ),
                visualCountA = 1,
                visualTag = "CAL:ISLAMIC"
            )
        ),
        lessons = listOf(
            LessonCardItem("📅", "7 Days of the Week", "Mon • Tue • Wed • Thu • Fri • Sat • Sun", TrilingualText("1. Monday, 2. Tuesday, 3. Wednesday, 4. Thursday, 5. Friday, 6. Saturday, 7. Sunday (Holiday!).", "1. پیر (Monday)، 2. منگل (Tuesday)، 3. بدھ (Wednesday)، 4. جمعرات (Thursday)، 5. جمعہ (Friday)، 6. ہفتہ (Saturday)، 7. اتوار (Sunday)۔", "1. دوشنبه، 2. سې شنبه، 3. چهارشنبه، 4. پنجشنبه، 5. جمعه، 6. شنبه، 7. یکشنبه.")),
            LessonCardItem("☀️", "12 Solar Months", "January (1st) to December (12th)", TrilingualText("1. January, 2. February, 3. March, 4. April, 5. May, 6. June, 7. July, 8. August, 9. September, 10. October, 11. November, 12. December.", "شمسی سال کے 12 مہینے ہیں: جنوری، فروری، مارچ، اپریل، مئی، جون، جولائی، اگست، ستمبر، اکتوبر، نومبر، دسمبر۔", "د لمریز کال 12 میاشتې دي: جنوري، فبروري، مارچ، اپریل، مۍ، جون، جولای، اګست، سپتمبر، اکتوبر، نومبر، دسمبر.")),
            LessonCardItem("🌙", "12 Islamic (Lunar) Months", "Muharram (1st) • Ramadan (9th) • Zil-Hajj (12th)", TrilingualText("1. Muharram, 2. Safar, 3. Rabi-ul-Awal, 4. Rabi-us-Sani, 5. Jamadi-ul-Awal, 6. Jamadi-us-Sani, 7. Rajab, 8. Shaban, 9. Ramadan (Fasting!), 10. Shawal (Eid-ul-Fitr!), 11. Zil-Qad, 12. Zil-Hajj (Hajj & Eid-ul-Azha!).", "اسلامی مہینے 12 ہیں: محرم پہلا مہینہ ہے، رمضان المبارک نوواں (روزوں کا مہینہ)، شوال دسواں اور ذوالحج بارہواں مہینہ ہے۔", "اسلامي میاشتې 12 دي: محرم لومړۍ میاشت ده، رمضان نهمه (د روژې میاشت)، شوال لسمه او ذوالحج دولسمه میاشت ده."))
        ),
        exercises = listOf(
            ExerciseQuizItem("📅", TrilingualText("Which day comes BETWEEN Monday and Wednesday?", "پیر (Monday) اور بدھ (Wednesday) کے درمیان کون سا دن آتا ہے؟", "د دوشنبې او چهارشنبې ترمنځ کومه ورځ راځي؟"), "Tuesday", listOf("Tuesday", "Friday", "Sunday"), TrilingualText("Correct! Tuesday comes between Monday and Wednesday.", "درست! منگل (Tuesday) پیر اور بدھ کے درمیان آتا ہے۔", "سمه ده! سې شنبه د دوشنبې او چهارشنبې ترمنځ راځي.")),
            ExerciseQuizItem("🌙", TrilingualText("In which Islamic month do Muslims fast?", "مسلمان کس اسلامی مہینے میں روزے رکھتے ہیں؟", "مسلمانان په کومه اسلامي میاشت کې روژه نیسي؟"), "Ramadan", listOf("Ramadan", "Safar", "Rajab"), TrilingualText("MashaAllah! Muslims fast in the 9th Islamic month, Ramadan.", "ماشاءاللہ! مسلمان نوویں اسلامی مہینے رمضان المبارک میں روزے رکھتے ہیں۔", "ماشاءالله! مسلمانان په نهمه اسلامي میاشت رمضان کې روژه نیسي."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 12: UNIT 6 (Pages 114–126) — Geometry: Basic 2-D Shapes & Patterns
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 12,
        pillLabel = "Unit 6 • P.114–126",
        titleEn = "Unit 6: Basic 2-D Shapes & Patterns",
        pageRangeText = "Pages 114–126 • Circle, Triangle, Square, Rectangle & Patterns",
        subtitle = TrilingualText(
            en = "Count the glowing Sides and Corners on the 2D Canvas Shapes and complete the Pattern!",
            ur = "2D اشکال کے چمکتے ہوئے کونے (Corners) اور اضلاع (Sides) گنیں اور پیٹرن مکمل کریں!",
            ps = "د 2D شکلونو ځلېدونکي کونجونه (Corners) او خواوې (Sides) وشمېرئ او نمونه بشپړه کړئ!"
        ),
        gameBadge = "🔺 2-D Shape Lab",
        mechanic = MathsMechanic.SHAPE_BUILDER_MONSTER,
        mascotEmoji = "🔺",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "🟡",
                promptTitle = "Round Shape with 0 Sides & 0 Corners!",
                promptSub = TrilingualText(
                    en = "Look at the round golden wheel! It has NO straight sides and NO corners. What shape is it?",
                    ur = "اس گول شکل کو دیکھیں! اس کا کوئی سیدھا ضلع نہیں اور کوئی کونہ نہیں۔ یہ کون سی شکل ہے؟",
                    ps = "دې ګرد شکل ته وګورئ! دا هیڅ سیده خوا او هیڅ کونج نه لري. دا کوم شکل دی؟"
                ),
                correctAnswer = "Circle",
                options = listOf("Circle", "Triangle", "Square"),
                voiceExplain = TrilingualText(
                    en = "A round shape with 0 sides and 0 corners is a Circle!",
                    ur = "0 اضلاع اور 0 کونوں والی گول شکل کو دائرہ (Circle) کہتے ہیں!",
                    ps = "د 0 خواوو او 0 کونجونو سره ګرد شکل ته دایره (Circle) ویل کیږي!"
                ),
                visualCountA = 0,
                visualTag = "SHAPE:CIRCLE"
            ),
            MathsRoundItem(
                promptEmoji = "🔺",
                promptTitle = "3 Straight Sides & 3 Corners!",
                promptSub = TrilingualText(
                    en = "Count the glowing dots on the shape: 1, 2, 3 corners and 3 straight sides!",
                    ur = "اس شکل کے چمکتے نقطے گنیں: 1، 2، 3 کونے اور 3 سیدھے اضلاع!",
                    ps = "د دې شکل ځلېدونکي ټکي وشمېرئ: 1، 2، 3 کونجونه او 3 سیده خواوې!"
                ),
                correctAnswer = "Triangle",
                options = listOf("Triangle", "Square", "Circle"),
                voiceExplain = TrilingualText(
                    en = "Which shape has 3 straight sides and 3 corners?",
                    ur = "کس شکل کے 3 سیدھے اضلاع اور 3 کونے ہوتے ہیں؟",
                    ps = "کوم شکل 3 سیده خواوې او 3 کونجونه لري؟"
                ),
                visualCountA = 3,
                visualTag = "SHAPE:TRIANGLE"
            ),
            MathsRoundItem(
                promptEmoji = "🟦",
                promptTitle = "4 EQUAL Sides & 4 Corners!",
                promptSub = TrilingualText(
                    en = "All 4 straight sides have the EXACT SAME length, with 4 corners!",
                    ur = "اس شکل کے چاروں اضلاع (4 sides) بالکل برابر ہیں اور 4 کونے ہیں!",
                    ps = "د دې شکل څلور واړه خواوې بالکل مساوي دي او 4 کونجونه لري!"
                ),
                correctAnswer = "Square",
                options = listOf("Square", "Triangle", "Circle"),
                voiceExplain = TrilingualText(
                    en = "A shape with 4 equal sides and 4 corners is a Square!",
                    ur = "4 برابر اضلاع اور 4 کونوں والی شکل کو مربع (Square) کہتے ہیں!",
                    ps = "د 4 مساوي خواوو او 4 کونجونو شکل ته مربع (Square) ویل کیږي!"
                ),
                visualCountA = 4,
                visualTag = "SHAPE:SQUARE"
            ),
            MathsRoundItem(
                promptEmoji = "🟩",
                promptTitle = "4 Sides (Opposite Sides Equal) & 4 Corners!",
                promptSub = TrilingualText(
                    en = "Like a door or textbook cover: 2 long opposite sides and 2 short opposite sides!",
                    ur = "دروازے یا کتاب کی طرح: آمنے سامنے کے 2 لمبے اور 2 چھوٹے اضلاع برابر ہیں!",
                    ps = "د دروازې یا کتاب په څېر: مخامخ 2 اوږدې او 2 لنډې خواوې یې مساوي دي!"
                ),
                correctAnswer = "Rectangle",
                options = listOf("Rectangle", "Circle", "Triangle"),
                voiceExplain = TrilingualText(
                    en = "Opposite sides are equal and it has 4 corners! It is a Rectangle!",
                    ur = "آمنے سامنے کے اضلاع برابر ہیں اور 4 کونے ہیں! یہ مستطیل (Rectangle) ہے!",
                    ps = "مخامخ خواوې یې مساوي دي او 4 کونجونه لري! دا مستطیل (Rectangle) دی!"
                ),
                visualCountA = 4,
                visualTag = "SHAPE:RECTANGLE"
            ),
            MathsRoundItem(
                promptEmoji = "🎨",
                promptTitle = "Complete the Pattern: 🟡 🔺 🟡 🔺 [ ? ]",
                promptSub = TrilingualText(
                    en = "Circle → Triangle → Circle → Triangle → What comes next?",
                    ur = "دائرہ ← تکون ← دائرہ ← تکون ← آگے کیا آئے گا؟",
                    ps = "دایره ← مثلث ← دایره ← مثلث ← وروسته څه راځي؟"
                ),
                correctAnswer = "🟡 Circle",
                options = listOf("🟡 Circle", "🟦 Square", "🔺 Triangle"),
                voiceExplain = TrilingualText(
                    en = "Look at the repeating pattern: Circle, Triangle, Circle, Triangle... what comes next?",
                    ur = "بار بار آنے والا پیٹرن دیکھیں: دائرہ، تکون، دائرہ، تکون... آگے کیا آئے گا؟",
                    ps = "تکرارېدونکې نمونه وګورئ: دایره، مثلث، دایره، مثلث... وروسته څه راځي؟"
                ),
                visualCountA = 0,
                visualTag = "SHAPE:PATTERN"
            )
        ),
        lessons = listOf(
            LessonCardItem("🟡", "Circle (0 Sides, 0 Corners)", "Round Edge • Coin, Sun, Wheel, Bangle", TrilingualText("A Circle is round. It has 0 straight sides and 0 corners.", "دائرہ (Circle) گول ہوتا ہے۔ اس کے 0 اضلاع اور 0 کونے ہوتے ہیں۔", "دایره (Circle) ګرده ده. دا 0 سیده خواوې او 0 کونجونه لري.")),
            LessonCardItem("🔺", "Triangle (3 Sides, 3 Corners)", "3 Straight Lines • Samosa, Traffic Sign, Hanger", TrilingualText("A Triangle has 3 straight sides and 3 corners.", "مثلث/تکون (Triangle) کے 3 سیدھے اضلاع اور 3 کونے ہوتے ہیں۔", "مثلث (Triangle) 3 سیده خواوې او 3 کونجونه لري.")),
            LessonCardItem("🟦", "Square & Rectangle (4 Sides, 4 Corners)", "Square = All 4 Sides Equal • Rectangle = Opposite Sides Equal", TrilingualText("Both Square and Rectangle have 4 sides and 4 corners. In a Square all 4 sides are equal; in a Rectangle opposite sides are equal.", "مربع (Square) کے چاروں اضلاع برابر ہوتے ہیں، جبکہ مستطیل (Rectangle) کے آمنے سامنے والے اضلاع برابر ہوتے ہیں۔", "د مربع (Square) څلور واړه خواوې مساوي وي، او د مستطیل (Rectangle) مخامخ خواوې مساوي وي."))
        ),
        exercises = listOf(
            ExerciseQuizItem("🔺", TrilingualText("How many corners does a Triangle have?", "مثلث (Triangle) کے کتنے کونے ہوتے ہیں؟", "مثلث (Triangle) څو کونجونه لري؟"), "3 Corners", listOf("3 Corners", "4 Corners", "0 Corners"), TrilingualText("Correct! A Triangle has 3 sides and 3 corners.", "درست! مثلث کے 3 اضلاع اور 3 کونے ہوتے ہیں۔", "سمه ده! مثلث 3 خواوې او 3 کونجونه لري.")),
            ExerciseQuizItem("🟡", TrilingualText("Which shape has NO corners at all?", "کس شکل کا کوئی کونہ نہیں ہوتا؟", "کوم شکل هیڅ کونج نه لري؟"), "Circle", listOf("Circle", "Square", "Rectangle"), TrilingualText("Great job! A Circle has 0 corners.", "شاباش! دائرے کا کوئی کونہ نہیں ہوتا۔", "آفرین! دایره هیڅ کونج نه لري."))
        )
    ),

    // ═══════════════════════════════════════════════════════════════════════
    // STAGE 13: UNIT 6 (Pages 127–139) — Spatial Position (Above/Below, Inside/Outside, etc.)
    // ═══════════════════════════════════════════════════════════════════════
    MathsStageMeta(
        stageNumber = 13,
        pillLabel = "Unit 6 • P.127–139",
        titleEn = "Unit 6: Position — Above/Below, Inside/Outside, Left/Right",
        pageRangeText = "Pages 127–139 • Spatial Positions (End of Book!)",
        subtitle = TrilingualText(
            en = "Explore the animated Sky & Room Scene! Spot Above/Below, Inside/Outside, Over/Under, and Near/Far!",
            ur = "متحرک آسمان اور کمرے کا منظر دیکھیں! اوپر/نیچے، اندر/باہر، اور قریب/دور کی پہچان کریں!",
            ps = "د اسمان او خونې صحنه وګورئ! پورته/ښکته، دننه/بهر، او نږدې/لرې وپېژنئ!"
        ),
        gameBadge = "✈️ Position Radar",
        mechanic = MathsMechanic.SPATIAL_RADAR_SCENE,
        mascotEmoji = "✈️",
        rounds = listOf(
            MathsRoundItem(
                promptEmoji = "✈️",
                promptTitle = "Airplane & Clouds: Above or Below?",
                promptSub = TrilingualText(
                    en = "Look at the sky scene! The Airplane ✈️ is flying high ___ the white clouds ☁️!",
                    ur = "آسمان کا منظر دیکھیں! ہوائی جہاز ✈️ سفید بادلوں ☁️ کے ___ اڑ رہا ہے!",
                    ps = "د اسمان صحنې ته وګورئ! الوتکه ✈️ له سپینو ورېځو ☁️ څخه ___ الوزي!"
                ),
                correctAnswer = "Above",
                options = listOf("Above", "Below", "Inside"),
                voiceExplain = TrilingualText(
                    en = "The airplane is higher than the clouds, while the birds are below! Is the airplane Above or Below?",
                    ur = "ہوائی جہاز بادلوں سے اوپر ہے جبکہ پرندے نیچے ہیں! جہاز Above ہے یا Below؟",
                    ps = "الوتکه له ورېځو پورته ده او مرغۍ ښکته دي! الوتکه Above ده که Below؟"
                ),
                visualTag = "POS:ABOVE"
            ),
            MathsRoundItem(
                promptEmoji = "🐠",
                promptTitle = "Goldfish in the Bowl: Inside or Outside?",
                promptSub = TrilingualText(
                    en = "Look at the glass fishbowl! The swimming goldfish 🐠 is ___ the water bowl!",
                    ur = "شیشے کے برتن کو دیکھیں! تیرتی ہوئی مچھلی 🐠 پانی کے برتن کے ___ ہے!",
                    ps = "د ښیښې کاسې ته وګورئ! لامبو وهونکی کب 🐠 د اوبو کاسې ___ دی!"
                ),
                correctAnswer = "Inside",
                options = listOf("Inside", "Outside", "Under"),
                voiceExplain = TrilingualText(
                    en = "The fish is swimming inside the water bowl!",
                    ur = "مچھلی پانی کے برتن کے اندر (Inside) تیر رہی ہے!",
                    ps = "کب د اوبو په کاسه کې دننه (Inside) لامبو وهي!"
                ),
                visualTag = "POS:INSIDE"
            ),
            MathsRoundItem(
                promptEmoji = "🐱",
                promptTitle = "Cat & Table: Over or Under?",
                promptSub = TrilingualText(
                    en = "The sleepy cat 🐱 is sitting on the floor right ___ the wooden table!",
                    ur = "بلی 🐱 فرش پر لکڑی کی میز کے بالکل ___ بیٹھی ہے!",
                    ps = "پیشو 🐱 په فرش باندې د لرګي مېز لاندې (___) ناسته ده!"
                ),
                correctAnswer = "Under",
                options = listOf("Under", "Over", "Inside"),
                voiceExplain = TrilingualText(
                    en = "The cat is sitting under the table!",
                    ur = "بلی میز کے نیچے (Under) بیٹھی ہے!",
                    ps = "پیشو د مېز لاندې (Under) ناسته ده!"
                ),
                visualTag = "POS:UNDER"
            ),
            MathsRoundItem(
                promptEmoji = "🏠",
                promptTitle = "Tree vs Distant Mountains: Near or Far?",
                promptSub = TrilingualText(
                    en = "The flower pot is right next to the house door, so it is ___ to the house!",
                    ur = "پھولوں کا گملا گھر کے دروازے کے بالکل پاس ہے، اس لیے وہ گھر کے ___ ہے!",
                    ps = "د ګلونو لوښی د کور دروازې ته بالکل نږدې دی، نو هغه کور ته ___ دی!"
                ),
                correctAnswer = "Near",
                options = listOf("Near", "Far", "Under"),
                voiceExplain = TrilingualText(
                    en = "Close to the house is Near, and high mountains way back are Far!",
                    ur = "گھر کے پاس ہونے کو Near (قریب) اور دور پہاڑوں کو Far (دور) کہتے ہیں!",
                    ps = "کور ته نږدې ته Near (نږدې) او لرې غرونو ته Far (لرې) ویل کیږي!"
                ),
                visualTag = "POS:NEAR"
            )
        ),
        lessons = listOf(
            LessonCardItem("☁️", "Above & Below", "Airplane is Above Clouds • Birds are Below Clouds", TrilingualText("Above means at a higher level (like a wall clock above a sofa). Below means at a lower level.", "Above کا مطلب اوپر کی سطح پر ہونا (جیسے صوفے کے اوپر گھڑی) اور Below کا مطلب نیچے ہونا۔", "Above معنی په لوړه کچه (لکه د کوچ پورته ساعت) او Below معنی ښکته.")),
            LessonCardItem("🐟", "Inside & Outside", "Fish Inside the Bowl • Cat Outside the Box", TrilingualText("Inside means within something (apples inside a basket). Outside means out of it.", "Inside کا مطلب کسی چیز کے اندر ہونا اور Outside کا مطلب باہر ہونا ہے۔", "Inside معنی د یو شي دننه او Outside معنی بهر.")),
            LessonCardItem("🌉", "Over/Under, Before/After, Near/Far & Left/Right", "Everyday Spatial Directions", TrilingualText("Over/Under (bridge over river, boat under bridge), Near/Far (close vs distant), and Left/Right hands help us describe exact positions!", "Over/Under (پل کے اوپر/نیچے)، Near/Far (قریب/دور) اور Left/Right (بایاں/دایاں) ہمیں کسی چیز کی درست جگہ بتاتے ہیں!", "Over/Under (د پله دپاسه/لاندې)، Near/Far (نږدې/لرې) او Left/Right (کیڼ/ښی) موږ ته د شیانو دقیق ځای راښیي!"))
        ),
        exercises = listOf(
            ExerciseQuizItem("✈️", TrilingualText("An airplane flies ___ the clouds, and birds fly ___ the clouds.", "ہوائی جہاز بادلوں کے ___ اڑتا ہے اور پرندے بادلوں کے ___ اڑتے ہیں۔", "الوتکه له ورېځو ___ الوزي او مرغۍ له ورېځو ___ الوزي."), "Above, Below", listOf("Above, Below", "Inside, Outside", "Under, Over"), TrilingualText("Correct! The plane is Above the clouds and birds are Below.", "درست! جہاز بادلوں کے اوپر (Above) اور پرندے نیچے (Below) ہیں۔", "سمه ده! الوتکه له ورېځو پورته (Above) او مرغۍ ښکته (Below) دي.")),
            ExerciseQuizItem("🎒", TrilingualText("Your books are kept ___ your school bag.", "آپ کی کتابیں آپ کے سکول بیگ کے ___ رکھی جاتی ہیں۔", "ستاسو کتابونه ستاسو د ښوونځي بکس ___ ایښودل کیږي."), "Inside", listOf("Inside", "Outside", "Above"), TrilingualText("Awesome! Books are kept Inside the school bag.", "شاباش! کتابیں سکول بیگ کے اندر (Inside) رکھی جاتی ہیں۔", "آفرین! کتابونه د بکس دننه (Inside) ایښودل کیږي."))
        )
    )
)
