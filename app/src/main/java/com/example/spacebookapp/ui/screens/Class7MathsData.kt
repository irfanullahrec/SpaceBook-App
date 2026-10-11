package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

data class Class7MathsCard(
    val title: String,
    val formulaOrRule: String,
    val detailEn: String,
    val detailUr: String,
    val detailPs: String,
    val cardColor: Color
)

data class Class7QuizQuestion(
    val questionEn: String,
    val questionUr: String,
    val questionPs: String,
    val options: List<String>,
    val correctIndex: Int,
    val whyExplanationEn: String,
    val whyExplanationUr: String,
    val whyExplanationPs: String,
    val formulaOrStep: String = "",
    val difficulty: Int = 1 // 1=Medium, 2=Hard, 3=Challenge
)

data class Class7MathsStage(
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
    val formulas: List<String>,
    val cards: List<Class7MathsCard>,
    val quizzes: List<Class7QuizQuestion>
)

object Class7MathsRepository {
    val stages: List<Class7MathsStage> = listOf(
        // ─── UNIT 1: RATIONAL NUMBERS (p. 1–23) ───
        Class7MathsStage(
            id = 1,
            unitNumber = "Unit 1",
            pageRange = "Pages 1–23",
            titleEn = "Rational Numbers",
            titleUr = "اعدادِ ناطق",
            titlePs = "ناطق عددونه",
            themeColor = Color(0xFF1E88E5),
            secondaryColor = Color(0xFF0D47A1),
            summaryEn = "A rational number is any number that can be expressed in the form p/q, where p and q are integers and q ≠ 0. All integers, fractions, and terminating or repeating decimals are rational numbers. Integers have absolute values |x| representing distance from 0 on the number line.",
            summaryUr = "ناطق عدد وہ عدد ہے جسے p/q کی شکل میں لکھا جا سکے، جہاں p اور q صحیح اعداد ہوں اور q صفر نہ ہو۔ تمام صحیح اعداد، کسریں اور متناہی یا متوالی اعشاریے ناطق اعداد ہیں۔ کسی عدد کی مطلق قیمت |x| عددی خط پر صفر سے اس کا فاصلہ ظاہر کرتی ہے۔",
            summaryPs = "ناطق عدد هغه عدد دی چې د p/q په بڼه لیکل کیدی شي، چې p او q پوره عددونه وي او q صفر نه وي. ټول تام عددونه او کسرونه ناطق دي. د یوه عدد مطلق قیمت |x| پر عددي کرښه له صفر څخه د هغه واټن ښيي.",
            formulas = listOf(
                "Definition: p/q, where p, q ∈ ℤ and q ≠ 0",
                "Absolute value: |-a| = a, |a| = a",
                "Rounding: Look at the digit to the right (≥5 round up, <5 round down)"
            ),
            cards = listOf(
                Class7MathsCard("Rational Definition", "p/q (q ≠ 0)", "Any number written as fraction of two integers.", "دو صحیح اعداد کے تناسب سے بننے والا عدد۔", "هغه عدد چې د دوو تامو عددونو په تناسب لیکل کېږي.", Color(0xFF1E88E5)),
                Class7MathsCard("Absolute Value", "|x| ≥ 0", "The distance of a number from zero on number line without sign.", "عددی خط پر صفر سے فاصلہ، علامت کے بغیر۔", "پر عددي کرښه له صفر څخه فاصله بې له علامې.", Color(0xFF0284C7)),
                Class7MathsCard("Ordering Rational", "a/b < c/d ⇔ ad < bc", "Cross-multiplication rule to compare two fractions.", "کسروں کے موازنے کیلئے ضربِ چلیپا کا اصول۔", "د کسرونو د پرتله کولو لپاره د ضرب اصول.", Color(0xFF0369A1)),
                Class7MathsCard("Decimal Conversion", "3/8 = 0.375", "Terminating and non-terminating repeating decimals are rational.", "متناہی اور متوالی کسرِ اعشاریہ ناطق ہوتی ہیں۔", "پای لرونکي او تکراري اعشاري عددونه ناطق دي.", Color(0xFF0284C7)),
                Class7MathsCard("Rounding Rule", "3 decimal places", "Examine 4th decimal: if ≥5, increase 3rd digit by 1.", "اگر چوتھا ہندسہ 5 یا بڑا ہو تو تیسرے میں 1 بڑھائیں۔", "که څلورم عدد ۵ یا زیات وي، درېیم ته ۱ ورزیات کړئ.", Color(0xFF0369A1))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Which of the following is NOT a rational number?",
                    questionUr = "مندرجہ ذیل میں سے کونسا عدد ناطق عدد نہیں ہے؟",
                    questionPs = "په لاندې عددونو کې کوم یو ناطق عدد نه دی؟",
                    options = listOf("3/4", "-7", "√2", "0.25"),
                    correctIndex = 2,
                    whyExplanationEn = "√2 is an irrational number because it cannot be expressed as a fraction p/q of two integers; its decimal expansion is non-terminating and non-repeating.",
                    whyExplanationUr = "جزر 2 (√2) غیر ناطق عدد ہے کیونکہ اسے دو صحیح اعداد کے کسر p/q کی صورت میں نہیں لکھا جا سکتا۔",
                    whyExplanationPs = "د ۲ جذر (√2) غیر ناطق دی ځکه چې د دوو تامو عددونو په کسر p/q نه شي لیکل کېدای.",
                    formulaOrStep = "√2 ≈ 1.41421... (non-terminating, non-repeating)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the absolute value of -17/4, i.e., |-17/4|?",
                    questionUr = "عدد 17/4- کی مطلق قیمت |-17/4| کیا ہوگی؟",
                    questionPs = "د 17/4- مطلق قیمت |-17/4| څه شی دی؟",
                    options = listOf("-17/4", "17/4", "4/17", "0"),
                    correctIndex = 1,
                    whyExplanationEn = "The absolute value of any real number is its non-negative distance from zero on the number line: |-x| = x.",
                    whyExplanationUr = "کسی بھی عدد کی مطلق قیمت عددی خط پر صفر سے مثبت فاصلہ ہوتی ہے، لہٰذا |-17/4| = 17/4۔",
                    whyExplanationPs = "د هر عدد مطلق قیمت پر عددي کرښه له صفر څخه مثبت واټن دی: |-x| = x.",
                    formulaOrStep = "|-a| = a",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Round off 4.7865 to 3 decimal places:",
                    questionUr = "عدد 4.7865 کو 3 اعشاریائی مقامات تک درست کریں:",
                    questionPs = "عدد 4.7865 تر درېیو اعشاري ځایونو پورې پوره کړئ:",
                    options = listOf("4.786", "4.787", "4.780", "4.790"),
                    correctIndex = 1,
                    whyExplanationEn = "The 4th decimal digit is 5. According to the rounding rule, since it is ≥ 5, we increase the 3rd decimal digit (6) by 1 to get 4.787.",
                    whyExplanationUr = "چوتھا ہندسہ 5 ہے، چونکہ یہ 5 کے برابر ہے اس لیے تیسرے ہندسے 6 میں 1 کا اضافہ کر کے 4.787 بنائیں گے۔",
                    whyExplanationPs = "څلورم عدد ۵ دی نو د قاعدې له مخې درېیم عدد ۶ ته ۱ ورزیاتیږي چې 4.787 کېږي.",
                    formulaOrStep = "4th digit is 5 ≥ 5 ⇒ 6 + 1 = 7 ⇒ 4.787",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Which fraction is greater: 5/6 or 7/9?",
                    questionUr = "5/6 اور 7/9 میں سے کونسی کسر بڑی ہے؟",
                    questionPs = "د 5/6 او 7/9 ترمنځ کوم کسر لوی دی؟",
                    options = listOf("5/6", "7/9", "Both are equal", "Cannot be determined"),
                    correctIndex = 0,
                    whyExplanationEn = "Cross-multiplication: 5 × 9 = 45 and 6 × 7 = 42. Since 45 > 42, 5/6 is greater than 7/9.",
                    whyExplanationUr = "چلیپا ضرب: 5 × 9 = 45 اور 6 × 7 = 42۔ چونکہ 45 بڑا ہے 42 سے، اس لیے 5/6 بڑی کسر ہے۔",
                    whyExplanationPs = "د چلیپا ضرب له مخې: ۵ × ۹ = ۴۵ او ۶ × ۷ = ۴۲. څرنګه چې ۴۵ > ۴۲ نو 5/6 لوی دی.",
                    formulaOrStep = "5/6 vs 7/9 ⇒ 5×9 (45) > 6×7 (42)",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Hamid bought a house for Rs 4,297,160. Round this amount to the nearest thousand:",
                    questionUr = "حامد نے 4,297,160 روپے کا مکان خریدا۔ اس رقم کو قریب ترین ہزار تک درست کریں:",
                    questionPs = "حامد یو کور په 4,297,160 روپۍ واخیست. دا تر نږدې زرو پورې پوره کړئ:",
                    options = listOf("Rs 4,297,000", "Rs 4,298,000", "Rs 4,300,000", "Rs 4,290,000"),
                    correctIndex = 0,
                    whyExplanationEn = "Look at the hundreds digit: it is 1 (< 5). Therefore, we round down to Rs 4,297,000.",
                    whyExplanationUr = "سینکڑے کا ہندسہ 1 ہے جو 5 سے چھوٹا ہے، اس لیے نیچے گول کر کے 4,297,000 لکھیں گے۔",
                    whyExplanationPs = "د سلیزې عدد ۱ دی چې له ۵ کم دی، نو ښکته راګردېږي او 4,297,000 جوړیږي.",
                    formulaOrStep = "Hundreds digit = 1 < 5 ⇒ Rs 4,297,000",
                    difficulty = 3
                )
            )
        ),

        // ─── UNIT 2: LAWS OF OPERATIONS (p. 24–40) ───
        Class7MathsStage(
            id = 2,
            unitNumber = "Unit 2",
            pageRange = "Pages 24–40",
            titleEn = "Laws of Operations",
            titleUr = "عملیات کے قوانین",
            titlePs = "د عملیاتو قوانین",
            themeColor = Color(0xFF00897B),
            secondaryColor = Color(0xFF004D40),
            summaryEn = "Rational numbers follow Commutative law (a + b = b + a), Associative law (a + (b + c) = (a + b) + c), and Distributive law of multiplication over addition (a × (b + c) = a×b + a×c). Expressions must follow the BODMAS order of operations: Brackets, Orders/Powers, Division & Multiplication, Addition & Subtraction.",
            summaryUr = "ناطق اعداد قانونِ مبادلہ (a + b = b + a)، قانونِ تلازم (a + (b + c) = (a + b) + c) اور قانونِ تقسیم بر جمع (a × (b + c) = a×b + a×c) کی پابندی کرتے ہیں۔ حسابی جملے حل کرتے وقت BODMAS اصول (قوسین، قوت نما، تقسیم، ضرب، جمع، تفریق) پر عمل کیا جاتا ہے۔",
            summaryPs = "ناطق عددونه د بدلون قانون (a + b = b + a)، د یووالي قانون او د ضرب پر جمع د وېش قانون مني. په محاسبو کې د BODMAS ترتیب (قوسونه، توانونه، تقسیم، ضرب، جمع، تفریق) عملي کېږي.",
            formulas = listOf(
                "Commutative: a + b = b + a, a × b = b × a",
                "Associative: (a + b) + c = a + (b + c)",
                "Distributive: a(b + c) = ab + ac",
                "BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction"
            ),
            cards = listOf(
                Class7MathsCard("Commutative Law", "a + b = b + a", "Changing the order of addends or factors does not change the result.", "اعداد کی ترتیب بدلنے سے حاصل جمع یا حاصل ضرب نہیں بدلتا۔", "د عددونو د ترتیب په بدلولو سره حاصل نه بدلېږي.", Color(0xFF00897B)),
                Class7MathsCard("Associative Law", "(a + b) + c = a + (b + c)", "Grouping of numbers does not affect the sum or product.", "اعداد کے گروہ بنانے سے حاصل پر فرق نہیں پڑتا۔", "د عددونو ګروپ کول پر حاصل اغېز نه کوي.", Color(0xFF0D9488)),
                Class7MathsCard("Distributive Law", "a(b + c) = ab + ac", "Multiplying a sum by a number gives same as multiplying each addend.", "کسی مجموعے کو عدد سے ضرب دینا ہر رکن کو الگ ضرب دینے کے برابر ہے۔", "د یوې مجموعې ضرب له هر غړي سره د جلا ضرب مساوي دی.", Color(0xFF00897B)),
                Class7MathsCard("BODMAS Rule", "B-O-D-M-A-S", "Standard hierarchy for evaluating complex mathematical expressions.", "ریاضیاتی جملوں کو حل کرنے کی عالمی ترتیب۔", "د پېچلو ریاضيکي عبارتونو د حل نړیوال ترتیب.", Color(0xFF0D9488)),
                Class7MathsCard("Additive Inverse", "a + (-a) = 0", "Adding a number to its negative gives the additive identity (0).", "کسی عدد اور اس کے منفی کا حاصل جمع ہمیشہ صفر ہوتا ہے۔", "د یوه عدد او د هغه د منفي جمع تل صفر کېږي.", Color(0xFF00897B))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Which property is demonstrated by: 3/5 + 2/7 = 2/7 + 3/5?",
                    questionUr = "مساوات 3/5 + 2/7 = 2/7 + 3/5 کس قانون کی مثال ہے؟",
                    questionPs = "مساوات 3/5 + 2/7 = 2/7 + 3/5 د کوم قانون بېلګه ده؟",
                    options = listOf("Commutative Property of Addition", "Associative Property", "Distributive Property", "Identity Property"),
                    correctIndex = 0,
                    whyExplanationEn = "The Commutative Property of Addition states that order does not affect the sum: a + b = b + a.",
                    whyExplanationUr = "قانونِ مبادلہ برائے جمع کے مطابق ترتیب بدلنے سے حاصل جمع نہیں بدلتا: a + b = b + a۔",
                    whyExplanationPs = "د جمع د بدلون قانون ښيي چې ترتیب د جمعې حاصل نه بدلوي: a + b = b + a.",
                    formulaOrStep = "a + b = b + a",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Evaluate using BODMAS: 15 + 6 × (8 - 3) ÷ 5",
                    questionUr = "BODMAS کے اصول کے تحت قیمت معلوم کریں: 5 ÷ (3 - 8) × 6 + 15",
                    questionPs = "د BODMAS په مرسته حل کړئ: 5 ÷ (3 - 8) × 6 + 15",
                    options = listOf("21", "18", "25", "30"),
                    correctIndex = 0,
                    whyExplanationEn = "Step 1 (Bracket): (8 - 3) = 5. Step 2 (Mult/Div left-to-right): 6 × 5 ÷ 5 = 30 ÷ 5 = 6. Step 3 (Addition): 15 + 6 = 21.",
                    whyExplanationUr = "پہلے قوسین حل کریں: 8 - 3 = 5۔ پھر ضرب و تقسیم: 6 × 5 ÷ 5 = 6۔ آخر میں جمع: 15 + 6 = 21۔",
                    whyExplanationPs = "لومړی قوسین: ۸ - ۳ = ۵. بیا ضرب او وېش: ۶ × ۵ ÷ ۵ = ۶. په پای کې جمع: ۱۵ + ۶ = ۲۱.",
                    formulaOrStep = "15 + (6 × 5) ÷ 5 = 15 + 30 ÷ 5 = 15 + 6 = 21",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Using distributive law, simplify: 4 × (25 + 7)",
                    questionUr = "قانونِ تقسیم کے تحت حل کریں: (7 + 25) × 4",
                    questionPs = "د وېش د قانون په کارولو سره حل کړئ: (7 + 25) × 4",
                    options = listOf("128", "100", "132", "118"),
                    correctIndex = 0,
                    whyExplanationEn = "4 × (25 + 7) = (4 × 25) + (4 × 7) = 100 + 28 = 128.",
                    whyExplanationUr = "(4 × 25) + (4 × 7) = 100 + 28 = 128۔",
                    whyExplanationPs = "(۴ × ۲۵) + (۴ × ۷) = ۱۰۰ + ۲۸ = ۱۲۸.",
                    formulaOrStep = "a(b + c) = ab + ac ⇒ 4×25 + 4×7 = 128",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the multiplicative inverse (reciprocal) of -5/9?",
                    questionUr = "عدد 5/9- کا ضربی معکوس کیا ہوگا؟",
                    questionPs = "د 5/9- ضربي معکوس څه شی دی؟",
                    options = listOf("5/9", "-9/5", "9/5", "-5/9"),
                    correctIndex = 1,
                    whyExplanationEn = "The multiplicative inverse of a fraction p/q is q/p such that their product equals 1: (-5/9) × (-9/5) = 1.",
                    whyExplanationUr = "کسی کسر p/q کا ضربی معکوس q/p ہوتا ہے تاکہ ان کا حاصل ضرب 1 ہو: (5/9-) × (9/5-) = 1۔",
                    whyExplanationPs = "د کسر ضربي معکوس داسې معکوس دی چې حاصل ضرب یې ۱ راشي: (-5/9) × (-9/5) = 1.",
                    formulaOrStep = "(p/q) × (q/p) = 1",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "A silver chain is 2/5 m long and a gold chain is 3/4 m long. What is their combined total length?",
                    questionUr = "چاندی کی زنجیر 2/5 میٹر اور سونے کی زنجیر 3/4 میٹر لمبی ہے۔ دونوں کی کل لمبائی کیا ہوگی؟",
                    questionPs = "د سپینو زرو ځنځیر 2/5 متر او د سرو زرو ځنځیر 3/4 متر دی. د دواړو ټوله اوږدوالی څومره دی؟",
                    options = listOf("23/20 m (1.15 m)", "5/9 m", "7/20 m", "1 m"),
                    correctIndex = 0,
                    whyExplanationEn = "Common denominator is 20: 2/5 = 8/20 and 3/4 = 15/20. Total length = 8/20 + 15/20 = 23/20 m = 1.15 m.",
                    whyExplanationUr = "مشترک مخرج 20 ہے: 8/20 + 15/20 = 23/20 میٹر (1.15 میٹر)۔",
                    whyExplanationPs = "ګډ مخرج ۲۰ دی: ۸/۲۰ + ۱۵/۲۰ = ۲۳/۲۰ متر.",
                    formulaOrStep = "2/5 + 3/4 = (8 + 15)/20 = 23/20 m",
                    difficulty = 3
                )
            )
        ),

        // ─── UNIT 3: SQUARE AND SQUARE ROOT (p. 41–56) ───
        Class7MathsStage(
            id = 3,
            unitNumber = "Unit 3",
            pageRange = "Pages 41–56",
            titleEn = "Square and Square Root",
            titleUr = "مربع اور جزر المربع",
            titlePs = "مربع او د مربع جذر",
            themeColor = Color(0xFFD97706),
            secondaryColor = Color(0xFF78350F),
            summaryEn = "A square of a number is obtained by multiplying the number by itself (x² = x × x). A square root of a number y (written as √y) is the value that, when multiplied by itself, gives y. Methods to find square roots include Prime Factorization and Division Method. Perfect squares end only in 0, 1, 4, 5, 6, or 9.",
            summaryUr = "کسی عدد کو اپنے آپ سے ضرب دینے سے مربع حاصل ہوتا ہے (x² = x × x)۔ کسی عدد کا جزر المربع وہ قیمت ہے جسے اپنے آپ سے ضرب دینے پر اصل عدد بنے (√y)۔ جزر معلوم کرنے کے طریقوں میں مفرد تجزی اور بذریعہ تقسیم شامل ہیں۔ کامل مربع صرف 0، 1، 4، 5، 6 یا 9 پر ختم ہوتے ہیں۔",
            summaryPs = "د یوه عدد مربع هغه وخت ترلاسه کېږي چې عدد له ځان سره ضرب شي. د یوه عدد جذر هغه عدد دی چې که له ځان سره ضرب شي نو اصلي عدد جوړوي. کامل مربع یوازې په ۰، ۱، ۴، ۵، ۶، یا ۹ پای ته رسېږي.",
            formulas = listOf(
                "Square: x² = x × x",
                "Square Root: √(x²) = x",
                "Area of square = s² ⇒ side s = √Area",
                "Prime factorization: pair identical prime factors"
            ),
            cards = listOf(
                Class7MathsCard("Square Concept", "x² = x × x", "25² = 625, 16² = 256.", "عدد کو اسی سے ضرب دینے سے مربع حاصل ہوتا ہے۔", "د عدد په خپله ځان سره ضرب کول مربع جوړوي.", Color(0xFFD97706)),
                Class7MathsCard("Square Root", "√y", "Inverse operation of squaring: √64 = 8.", "مربع کا الٹ عمل: جزر 64 = 8۔", "د مربع معکوس عمل: د ۶۴ جذر ۸ کېږي.", Color(0xFFB45309)),
                Class7MathsCard("Prime Factorization", "784 = 2⁴ × 7²", "√784 = √(2² × 2² × 7²) = 2 × 2 × 7 = 28.", "مفرد اجزائے ضربی کے جوڑوں سے جزر نکالنا۔", "د مفردو ضربي اجزاو له جوړو څخه جذر ایستل.", Color(0xFFD97706)),
                Class7MathsCard("Division Method", "Pair from right", "Long division algorithm for finding large square roots.", "بڑے اعداد کے جزر کیلئے دائیں سے جوڑے بنا کر تقسیم کرنا۔", "د لویو عددونو د جذر لپاره د تقسیم میتود کارول.", Color(0xFFB45309)),
                Class7MathsCard("Geometric Area", "Area = s²", "If a square garden has area 784 m², side is √784 = 28 m.", "اگر مربع باغ کا رقبہ 784 ہو تو ضلع √784 = 28 میٹر ہوگا۔", "که د مربع باغ مساحت ۷۸۴ وي، اړخ یې ۲۸ متر دی.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "What is the square root of 784, as mentioned in the textbook garden problem?",
                    questionUr = "درسی کتاب کے باغ والے مسئلے کے مطابق 784 کا جزر المربع کیا ہے؟",
                    questionPs = "د کتاب د باغ د مسالې سره سم د ۷۸۴ جذر څه دی؟",
                    options = listOf("26", "28", "32", "24"),
                    correctIndex = 1,
                    whyExplanationEn = "Prime factorization of 784 is 2 × 2 × 2 × 2 × 7 × 7 = 2⁴ × 7². Taking one factor from each pair: 2 × 2 × 7 = 28. (28 × 28 = 784).",
                    whyExplanationUr = "784 کے مفرد اجزاء: 2 × 2 × 2 × 2 × 7 × 7۔ جوڑے بنا کر: 2 × 2 × 7 = 28 (28 × 28 = 784)۔",
                    whyExplanationPs = "د ۷۸۴ مفرد عوامل: ۲×۲×۲×۲×۷×۷. له هرې جوړې یو عدد: ۲×۲×۷ = ۲۸.",
                    formulaOrStep = "√784 = √(2⁴ × 7²) = 2² × 7 = 28",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "If a square garden has an area of 784 m², what is its perimeter (boundary wall length)?",
                    questionUr = "اگر ایک مربع باغ کا رقبہ 784 مربع میٹر ہو تو اس کی چاردیواری (احاطہ) کی لمبائی کیا ہوگی؟",
                    questionPs = "که د یوه مربع باغ مساحت ۷۸۴ متر مربع وي، د هغې د احاطې اوږدوالی به څومره وي؟",
                    options = listOf("112 m", "108 m", "124 m", "56 m"),
                    correctIndex = 0,
                    whyExplanationEn = "Side of square s = √784 = 28 m. Perimeter of square = 4 × s = 4 × 28 = 112 m.",
                    whyExplanationUr = "مربع کا ضلع = √784 = 28 میٹر۔ چاردیواری کا احاطہ = 4 × ضلع = 4 × 28 = 112 میٹر۔",
                    whyExplanationPs = "د مربع اړخ = √۷۸۴ = ۲۸ متر. د احاطې اوږدوالی = ۴ × ۲۸ = ۱۱۲ متر.",
                    formulaOrStep = "Perimeter = 4 × s = 4 × 28 m = 112 m",
                    difficulty = 3
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following numbers cannot be a perfect square based on its unit digit?",
                    questionUr = "اکائی کے ہندسے کی بنیاد پر مندرجہ ذیل میں سے کونسا عدد کامل مربع نہیں ہو سکتا؟",
                    questionPs = "د یوه ځای د عدد له مخې کوم یو کامل مربع نه شي کېدای؟",
                    options = listOf("625", "1024", "458", "1296"),
                    correctIndex = 2,
                    whyExplanationEn = "A perfect square never ends in 2, 3, 7, or 8. Since 458 ends in 8, it cannot be a perfect square.",
                    whyExplanationUr = "کسی بھی کامل مربع کے آخر میں 2، 3، 7 یا 8 نہیں آ سکتا۔ چونکہ 458 کے آخر میں 8 ہے لہٰذا یہ کامل مربع نہیں ہو سکتا۔",
                    whyExplanationPs = "کامل مربع هېڅکله په ۲، ۳، ۷ یا ۸ نه پای ته رسېږي. څرنګه چې ۴۵۸ په ۸ ختمېږي نو کامل مربع نه دی.",
                    formulaOrStep = "Perfect squares end in 0, 1, 4, 5, 6, 9 only",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Find the HCF of 20, 35, and 60 (as solved in Chapter 3 rope example):",
                    questionUr = "باب 3 کی رسی والی مثال کے مطابق 20، 35 اور 60 کا عادِ اعظم (HCF) معلوم کریں:",
                    questionPs = "د کتاب د رسۍ د بېلګې له مخې د ۲۰، ۳۵ او ۶۰ عاد اعظم (HCF) ومومئ:",
                    options = listOf("5 m", "10 m", "7 m", "12 m"),
                    correctIndex = 0,
                    whyExplanationEn = "Factors: 20 = 2² × 5; 35 = 5 × 7; 60 = 2² × 3 × 5. The only common prime factor in all three numbers is 5.",
                    whyExplanationUr = "20 = 2² × 5، 35 = 5 × 7، 60 = 2² × 3 × 5۔ تینوں میں مشترک عدد صرف 5 ہے، لہٰذا HCF = 5 میٹر۔",
                    whyExplanationPs = "د درې واړو عددونو ترمنځ یوازینی ګډ مفرد عامل ۵ دی، نو HCF = ۵ متر.",
                    formulaOrStep = "Common factor = 5",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Calculate √(144/225):",
                    questionUr = "کسر 144/225 کا جزر المربع معلوم کریں:",
                    questionPs = "د کسر √(144/225) قیمت ومومئ:",
                    options = listOf("12/15 = 4/5", "11/15", "14/25", "12/25"),
                    correctIndex = 0,
                    whyExplanationEn = "√(144/225) = √144 / √225 = 12/15 = 4/5.",
                    whyExplanationUr = "144 کا جزر 12 ہے اور 225 کا جزر 15 ہے۔ 12/15 کو مختصر کرنے پر 4/5 حاصل ہوتا ہے۔",
                    whyExplanationPs = "د ۱۴۴ جذر ۱۲ دی او د ۲۲۵ جذر ۱۵ دی. ۱۲/۱۵ = ۴/۵.",
                    formulaOrStep = "√(a/b) = √a / √b ⇒ 12/15 = 4/5",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 4: RATIO, RATE AND PROPORTION (p. 57–76) ───
        Class7MathsStage(
            id = 4,
            unitNumber = "Unit 4",
            pageRange = "Pages 57–76",
            titleEn = "Ratio, Rate and Proportion",
            titleUr = "نسبت، شرح اور تناسب",
            titlePs = "نسبت، کچه او تناسب",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            summaryEn = "A ratio compares quantities of the same kind. A rate compares quantities of different kinds with different units (e.g. speed in km/h, unit price in Rs/kg). Direct proportion means when one quantity increases, the other increases at the same rate (x/y = k). Inverse proportion means when one quantity increases, the other decreases such that their product is constant (x × y = k).",
            summaryUr = "نسبت ایک جیسی اکائیوں کے مابین موازنہ ہے۔ شرح مختلف اکائیوں والی مقداروں کا موازنہ ہے (جیسے کلومیٹر فی گھنٹہ یا روپے فی کلو)۔ راست تناسب میں ایک مقدار کے بڑھنے سے دوسری بھی اسی نسبت سے بڑھتی ہے (x/y = k)۔ معکوس تناسب میں ایک مقدار کے بڑھنے سے دوسری گھٹتی ہے (x × y = k)۔",
            summaryPs = "نسبت د ورته واحدونو لرونکو مقدارونو پرتله ده. کچه (Rate) د بېلابېلو واحدونو پرتله ده لکه کیلومتر پر ساعت. مستقیم تناسب کې د یوې په زیاتېدو بله زیاتېږي، او معکوس تناسب کې د یوې په زیاتېدو بله کمېږي.",
            formulas = listOf(
                "Rate = Quantity 1 / Quantity 2 (with units)",
                "Direct proportion: y ∝ x ⇒ y₁/x₁ = y₂/x₂",
                "Inverse proportion: y ∝ 1/x ⇒ x₁y₁ = x₂y₂",
                "Product of extremes = Product of means: a/b = c/d ⇒ ad = bc"
            ),
            cards = listOf(
                Class7MathsCard("Rate Concept", "Rs/kg or km/h", "Comparison of quantities with different units.", "مختلف اکائیوں والی مقداروں کا موازنہ۔", "د بېلابېلو واحدونو لرونکو مقدارونو پرتله کول.", Color(0xFF7C3AED)),
                Class7MathsCard("Unit Rate", "1 unit cost", "Example: Rs 192 for 12 cupcakes = Rs 16 per cupcake.", "12 کیک 192 روپے کے ہیں تو 1 کیک کی شرح 16 روپے فی کیک ہوئی۔", "د ۱۲ کیکونو بیه ۱۹۲ وي، نو د یوه کیک بیه ۱۶ روپۍ ده.", Color(0xFF6D28D9)),
                Class7MathsCard("Direct Proportion", "y₁/x₁ = y₂/x₂", "More workers produce more output; more books cost more.", "زیادہ اشیاء کی قیمت بھی زیادہ ہوتی ہے۔", "ډېر شیان ډېره بیه لري.", Color(0xFF7C3AED)),
                Class7MathsCard("Inverse Proportion", "x₁y₁ = x₂y₂", "More workers take less time to complete same construction job.", "زیادہ مزدور کام کو کم وقت میں مکمل کرتے ہیں۔", "ډېر کارګران یو کار په لږ وخت کې سرته رسوي.", Color(0xFF6D28D9)),
                Class7MathsCard("Continued Ratio", "a : b : c", "Connecting two ratios a:b and b:c through common term b.", "دو نسبتوں کو مشترک رکن کے ذریعے جوڑنا۔", "دوه نسبتونه د ګډ غړي له لارې سره نښلول.", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "If 12 cupcakes cost Rs 192, what is the cost of 20 cupcakes (Example 1 in book)?",
                    questionUr = "کتاب کی مثال 1 کے مطابق اگر 12 کیکوں کی قیمت 192 روپے ہو تو 20 کیکوں کی قیمت کیا ہوگی؟",
                    questionPs = "که ۱۲ کیکونه په ۱۹۲ روپۍ وي، د ۲۰ کیکونو بیه به څومره وي؟",
                    options = listOf("Rs 320", "Rs 300", "Rs 280", "Rs 340"),
                    correctIndex = 0,
                    whyExplanationEn = "Unit rate = Rs 192 ÷ 12 = Rs 16 per cupcake. Cost of 20 cupcakes = 20 × Rs 16 = Rs 320.",
                    whyExplanationUr = "ایک کیک کی شرح = 192 ÷ 12 = 16 روپے فی کیک۔ 20 کیکوں کی قیمت = 20 × 16 = 320 روپے۔",
                    whyExplanationPs = "د یوه کیک بیه = ۱۹۲ ÷ ۱۲ = ۱۶ روپۍ. د ۲۰ کیکونو بیه = ۲۰ × ۱۶ = ۳۲۰ روپۍ.",
                    formulaOrStep = "Unit rate = 192/12 = 16 ⇒ 20 × 16 = Rs 320",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "If 8 workers can paint a school building in 15 days, how many days will 12 workers take?",
                    questionUr = "اگر 8 مزدور ایک سکول کی عمارت 15 دنوں میں رنگ کرتے ہیں تو 12 مزدور کتنے دنوں میں کریں گے؟",
                    questionPs = "که ۸ کارګران یو ښوونځی په ۱۵ ورځو کې رنګ کړي، ۱۲ کارګران به یې په څو ورځو کې رنګ کړي؟",
                    options = listOf("10 days", "12 days", "8 days", "14 days"),
                    correctIndex = 0,
                    whyExplanationEn = "This is inverse proportion (more workers = fewer days): x₁y₁ = x₂y₂ ⇒ 8 × 15 = 12 × y₂ ⇒ 120 = 12y₂ ⇒ y₂ = 10 days.",
                    whyExplanationUr = "یہ معکوس تناسب ہے: 8 × 15 = 12 × روز ⇒ 120 = 12 × روز ⇒ روز = 10 دن۔",
                    whyExplanationPs = "دا معکوس تناسب دی: ۸ × ۱۵ = ۱۲ × y ⇒ ۱۲۰ = ۱۲y ⇒ y = ۱۰ ورځې.",
                    formulaOrStep = "x₁y₁ = x₂y₂ ⇒ 8 × 15 = 12 × d ⇒ d = 10",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Find the value of x in the proportion: 4 : 7 = 20 : x",
                    questionUr = "تناسب 4 : 7 = 20 : x میں x کی قیمت معلوم کریں:",
                    questionPs = "په تناسب 4 : 7 = 20 : x کې د x قیمت ومومئ:",
                    options = listOf("35", "28", "42", "30"),
                    correctIndex = 0,
                    whyExplanationEn = "Product of extremes = Product of means: 4 × x = 7 × 20 ⇒ 4x = 140 ⇒ x = 140 ÷ 4 = 35.",
                    whyExplanationUr = "طرفین کا حاصل ضرب = وسطین کا حاصل ضرب: 4 × x = 7 × 20 ⇒ 4x = 140 ⇒ x = 35۔",
                    whyExplanationPs = "د طرفینو ضرب = د وسطینو ضرب: ۴ × x = ۷ × ۲۰ ⇒ ۴x = ۱۴۰ ⇒ x = ۳۵.",
                    formulaOrStep = "4 × x = 7 × 20 ⇒ x = 140/4 = 35",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "A car travels 240 km in 3 hours at constant speed. How far will it travel in 5 hours?",
                    questionUr = "ایک گاڑی یکساں رفتار سے 3 گھنٹوں میں 240 کلومیٹر فاصلہ طے کرتی ہے۔ وہ 5 گھنٹوں میں کتنا فاصلہ طے کرے گی؟",
                    questionPs = "یو موټر په ۳ ساعتونو کې ۲۴۰ کیلومتره ځي. په ۵ ساعتونو کې به څومره واټن ووهي؟",
                    options = listOf("400 km", "360 km", "450 km", "380 km"),
                    correctIndex = 0,
                    whyExplanationEn = "Speed = 240 km ÷ 3 h = 80 km/h. Distance in 5 h = 80 km/h × 5 h = 400 km.",
                    whyExplanationUr = "رفتار = 240 ÷ 3 = 80 کلومیٹر فی گھنٹہ۔ 5 گھنٹوں میں فاصلہ = 80 × 5 = 400 کلومیٹر۔",
                    whyExplanationPs = "سرعت = ۲۴۰ ÷ ۳ = ۸۰ کیلو متر/ساعت. په ۵ ساعتونو کې واټن = ۸۰ × ۵ = ۴۰۰ کیلومتره.",
                    formulaOrStep = "Speed = 80 km/h ⇒ Distance = 80 × 5 = 400 km",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "In a bookshop, 85 books were sold on Monday and 60 books on Tuesday. What is the simplified ratio of Monday sales to Tuesday sales?",
                    questionUr = "کتابوں کی دکان پر پیر کو 85 اور منگل کو 60 کتابیں فروخت ہوئیں۔ ان کی آسان ترین نسبت کیا ہے؟",
                    questionPs = "د کتابونو په پلورنځي کې د دوشنبې په ورځ ۸۵ او د سه شنبې په ورځ ۶۰ کتابونه وپلورل شول. ساده نسبت یې څه دی؟",
                    options = listOf("17 : 12", "15 : 12", "17 : 10", "19 : 12"),
                    correctIndex = 0,
                    whyExplanationEn = "Ratio = 85 : 60. Dividing both terms by their common factor 5: 85 ÷ 5 = 17, and 60 ÷ 5 = 12. Simplified ratio = 17 : 12.",
                    whyExplanationUr = "نسبت 85 : 60۔ دونوں کو 5 پر تقسیم کرنے سے: 85 ÷ 5 = 17 اور 60 ÷ 5 = 12، یعنی 17 : 12۔",
                    whyExplanationPs = "نسبت = ۸۵ : ۶۰. دواړه پر ۵ ووېشئ: ۱۷ : ۱۲.",
                    formulaOrStep = "85/5 : 60/5 = 17 : 12",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 5: FINANCIAL ARITHMETIC (p. 77–88) ───
        Class7MathsStage(
            id = 5,
            unitNumber = "Unit 5",
            pageRange = "Pages 77–88",
            titleEn = "Financial Arithmetic",
            titleUr = "مالیاتی ریاضی",
            titlePs = "مالي حساب او سوداګري",
            themeColor = Color(0xFF059669),
            secondaryColor = Color(0xFF064E3B),
            summaryEn = "Financial arithmetic deals with commerce and financial obligations. Profit = S.P - C.P; Loss = C.P - S.P. Profit % = (Profit/C.P) × 100%. Discount is reduction on Marked Price (M.P). In Islamic finance: Zakat is payable at 2.5% (1/40) on wealth above Nisab held for one lunar year. Ushr is payable on agricultural produce: 10% on naturally irrigated land (rain/river) and 5% on artificially irrigated land (tube-wells).",
            summaryUr = "مالیاتی ریاضی میں نفع = قیمتِ فروخت - قیمتِ خرید؛ نقصان = قیمتِ خرید - قیمتِ فروخت ہوتا ہے۔ نفع فیصد = (نفع / قیمتِ خرید) × 100۔ رعایت اصل قیمت (درج شدہ قیمت) پر دی جاتی ہے۔ اسلامی مالیات میں زکوٰۃ نصاب پر 2.5 فیصد (چالیسواں حصہ) واجب ہے۔ عشر زرعی پیداوار پر قدرتی پانی (بارش) کی صورت میں 10 فیصد اور مصنوعی پانی (ٹیوب ویل) کی صورت میں 5 فیصد ادا کیا جاتا ہے۔",
            summaryPs = "په مالي حساب کې ګټه = د پلور بیه - د پېرلو بیه؛ تاوان = د پېرلو بیه - د پلور بیه. زکات پر شتمنۍ ۲.۵٪ (څلوېښتمه برخه) دی. عشر پر کرنیزو حاصلاتو که په باران وي ۱۰٪ او که په مصنوعي اوبو لکه ټیوب ویل وي ۵٪ دی.",
            formulas = listOf(
                "Profit = S.P - C.P, Loss = C.P - S.P",
                "Profit % = (Profit / C.P) × 100%",
                "Discount % = (Discount / M.P) × 100%",
                "Zakat = 2.5% = 1/40 of total wealth",
                "Ushr: 10% (Natural irrigation), 5% (Artificial/Tube-well)"
            ),
            cards = listOf(
                Class7MathsCard("Cost & Selling Price", "C.P & S.P", "Purchasing price is Cost Price; Selling price is revenue received.", "خریداری کی قیمت C.P اور بیچنے کی قیمت S.P کہلاتی ہے۔", "د اخیستلو بیه C.P او د پلورلو بیه S.P بلل کېږي.", Color(0xFF059669)),
                Class7MathsCard("Profit & Loss %", "Based on C.P", "Percentage profit or loss is always calculated over original Cost Price.", "نفع یا نقصان کا فیصد ہمیشہ قیمتِ خرید پر ناپا جاتا ہے۔", "د ګټې یا تاوان فیصدي تل پر اصلي بیه محاسبه کېږي.", Color(0xFF047857)),
                Class7MathsCard("Discount", "M.P - Sale Price", "Deduction given from the marked price on an item.", "درج شدہ قیمت پر دی جانے والی رعایت۔", "پر لیکل شوې بیه ورکړل شوې تخفیف.", Color(0xFF059669)),
                Class7MathsCard("Zakat Calculation", "2.5% = 1/40", "Applicable on savings held for one whole lunar year.", "سال بھر بچت کی صورت میں کل رقم کا 2.5 فیصد۔", "د ټول کال د سپما ۲.۵ فیصده زکات ورکول کېږي.", Color(0xFF047857)),
                Class7MathsCard("Ushr Rules", "10% or 5%", "10% on rain-fed crops, 5% on tube-well irrigated crops.", "بارانی زمین پر 10 فیصد اور ٹیوب ویل پر 5 فیصد عشر۔", "پر باراني ځمکه ۱۰٪ او پر ټیوب ویل ۵٪ عشر دی.", Color(0xFF059669))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Umar bought a car for Rs 1,260,000 and sold it at 16% profit (Book Problem). What was the selling price?",
                    questionUr = "عمر نے 1,260,000 روپے کی کار خریدی اور 16 فیصد نفع پر بیچی۔ فروخت کی قیمت کیا تھی؟",
                    questionPs = "عمر یو موټر په 1,260,000 روپۍ واخیست او په ۱۶٪ ګټه یې وپلوره. د پلور بیه څومره شوه؟",
                    options = listOf("Rs 1,461,600", "Rs 1,450,000", "Rs 1,380,000", "Rs 1,500,000"),
                    correctIndex = 0,
                    whyExplanationEn = "Profit amount = 16% of 1,260,000 = (16/100) × 1,260,000 = Rs 201,600. Selling Price = C.P + Profit = 1,260,000 + 201,600 = Rs 1,461,600.",
                    whyExplanationUr = "نفع = (16 ÷ 100) × 1,260,000 = 201,600 روپے۔ قیمتِ فروخت = 1,260,000 + 201,600 = 1,461,600 روپے۔",
                    whyExplanationPs = "ګټه = ۱۶٪ د ۱۲۶۰۰۰۰ = ۲۰۱۶۰۰ روپۍ. د پلور بیه = ۱۲۶۰۰۰۰ + ۲۰۱۶۰۰ = ۱۴۶۱۶۰۰ روپۍ.",
                    formulaOrStep = "S.P = C.P × (1 + 0.16) = Rs 1,461,600",
                    difficulty = 3
                ),
                Class7QuizQuestion(
                    questionEn = "What is the Zakat payable on cash savings of Rs 800,000 held for one full year?",
                    questionUr = "ایک سال تک جمع شدہ 800,000 روپے کی بچت پر زکوٰۃ کتنی ادا ہوگی؟",
                    questionPs = "پر ۸۰۰،۰۰۰ روپۍ سپما چې یو کال پوره پرې تېر شوی وي، څومره زکات واجبېږي؟",
                    options = listOf("Rs 20,000", "Rs 25,000", "Rs 16,000", "Rs 40,000"),
                    correctIndex = 0,
                    whyExplanationEn = "Zakat rate is 2.5% (or 1/40). Zakat = 800,000 × (2.5 / 100) = Rs 20,000.",
                    whyExplanationUr = "زکوٰۃ کی شرح 2.5 فیصد (یا 1/40) ہے: 800,000 ÷ 40 = 20,000 روپے۔",
                    whyExplanationPs = "زکات ۲.۵٪ یا څلوېښتمه برخه ده: ۸۰۰،۰۰۰ ÷ ۴۰ = ۲۰،۰۰۰ روپۍ.",
                    formulaOrStep = "Zakat = 800,000 × 0.025 = Rs 20,000",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "A farmer harvested wheat worth Rs 600,000 from naturally rain-fed land. What is the Ushr payable?",
                    questionUr = "ایک کسان نے بارانی زمین سے 600,000 روپے کی گندم حاصل کی۔ واجب الادا عشر کتنا ہوگا؟",
                    questionPs = "یوه بزګر له باراني ځمکې څخه د ۶۰۰،۰۰۰ روپیو غنم ترلاسه کړل. عشر به یې څومره وي؟",
                    options = listOf("Rs 60,000 (10%)", "Rs 30,000 (5%)", "Rs 15,000 (2.5%)", "Rs 120,000 (20%)"),
                    correctIndex = 0,
                    whyExplanationEn = "For crops grown with natural water resources (rain/rivers), Ushr is charged at 10%: 10% of 600,000 = Rs 60,000.",
                    whyExplanationUr = "بارانی (قدرتی پانی والی) پیداوار پر عشر 10 فیصد ہوتا ہے: (10 ÷ 100) × 600,000 = 60,000 روپے۔",
                    whyExplanationPs = "پر باراني ځمکه عشر ۱۰٪ دی: ۱۰٪ د ۶۰۰،۰۰۰ = ۶۰،۰۰۰ روپۍ.",
                    formulaOrStep = "Ushr (Rain-fed) = 10% of 600,000 = Rs 60,000",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "An item marked at Rs 2,500 is sold with a 12% discount. What is the customer's sale price?",
                    questionUr = "2,500 روپے درج شدہ قیمت والی چیز 12 فیصد رعایت پر بیچی گئی۔ گاہک کیلئے قیمتِ فروخت کیا ہوگی؟",
                    questionPs = "یو شی چې بیه یې ۲۵۰۰ روپۍ لیکل شوې په ۱۲٪ تخفیف پلورل کېږي. د پېرودونکي لپاره بیه څه ده؟",
                    options = listOf("Rs 2,200", "Rs 2,300", "Rs 2,150", "Rs 2,250"),
                    correctIndex = 0,
                    whyExplanationEn = "Discount = 12% of 2,500 = Rs 300. Sale Price = 2,500 - 300 = Rs 2,200.",
                    whyExplanationUr = "رعایت = (12 ÷ 100) × 2,500 = 300 روپے۔ قیمتِ فروخت = 2,500 - 300 = 2,200 روپے۔",
                    whyExplanationPs = "تخفیف = ۱۲٪ د ۲۵۰۰ = ۳۰۰ روپۍ. د پلور بیه = ۲۵۰۰ - ۳۰۰ = ۲۲۰۰ روپۍ.",
                    formulaOrStep = "Sale Price = 2500 × (1 - 0.12) = Rs 2,200",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "A shopkeeper bought a table for Rs 4,000 and sold it for Rs 3,400. What is the loss percentage?",
                    questionUr = "ایک دکاندار نے میز 4,000 روپے میں خریدی اور 3,400 میں بیچی۔ نقصان کا فیصد کیا ہوگا؟",
                    questionPs = "یو هټیوال یو مېز په ۴۰۰۰ واخیست او په ۳۴۰۰ یې وپلوره. د تاوان فیصدي به څومره وي؟",
                    options = listOf("15%", "12%", "18%", "20%"),
                    correctIndex = 0,
                    whyExplanationEn = "Loss = C.P - S.P = 4,000 - 3,400 = Rs 600. Loss % = (600 / 4,000) × 100% = 15%.",
                    whyExplanationUr = "نقصان = 4,000 - 3,400 = 600 روپے۔ نقصان % = (600 ÷ 4,000) × 100 = 15 فیصد۔",
                    whyExplanationPs = "تاوان = ۴۰۰۰ - ۳۴۰۰ = ۶۰۰ روپۍ. د تاوان فیصدي = (۶۰۰ ÷ ۴۰۰۰) × ۱۰۰ = ۱۵٪.",
                    formulaOrStep = "Loss % = (600 / 4000) × 100% = 15%",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 6: SETS (p. 89–103) ───
        Class7MathsStage(
            id = 6,
            unitNumber = "Unit 6",
            pageRange = "Pages 89–103",
            titleEn = "Sets",
            titleUr = "سیٹس",
            titlePs = "سیټونه",
            themeColor = Color(0xFF2563EB),
            secondaryColor = Color(0xFF1E3A8A),
            summaryEn = "A set is a well-defined collection of distinct objects. Operations on sets include Union (A ∪ B: elements in A or B or both), Intersection (A ∩ B: common elements), Difference (A - B: elements in A but not in B), and Complement (A' = U - A). De Morgan's laws state: (A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B'.",
            summaryUr = "سیٹ واضح اور منفرد اشیاء کا مجموعہ ہے۔ سیٹس کے بنیادی عملیات میں اجتماع (A ∪ B)، تقاطع (A ∩ B: مشترک ارکان)، فرق (A - B) اور تکملہ (A' = U - A) شامل ہیں۔ ڈی مورگن کے قوانین: (A ∪ B)' = A' ∩ B' اور (A ∩ B)' = A' ∪ B' ہیں۔",
            summaryPs = "سیټ د جلا او مشخصو شیانو ټولګه ده. پر سیټونو عملیات: اتحاد (A ∪ B)، تقاطع (A ∩ B)، تفریق (A - B) او متمم (A' = U - A) دي. د ډي مورګن قوانین: (A ∪ B)' = A' ∩ B' او (A ∩ B)' = A' ∪ B' دي.",
            formulas = listOf(
                "Union: A ∪ B = {x : x ∈ A or x ∈ B}",
                "Intersection: A ∩ B = {x : x ∈ A and x ∈ B}",
                "Difference: A - B = {x : x ∈ A and x ∉ B}",
                "Complement: A' = U - A",
                "De Morgan's Laws: (A ∪ B)' = A' ∩ B' and (A ∩ B)' = A' ∪ B'"
            ),
            cards = listOf(
                Class7MathsCard("Universal Set (U)", "Entire scope", "Set containing all possible elements under discussion.", "مجموعہ جس میں زیرِ بحث تمام ارکان موجود ہوں۔", "هغه سیټ چې تر بحث لاندې ټول غړي لري.", Color(0xFF2563EB)),
                Class7MathsCard("Union (∪)", "A ∪ B", "Combines all elements of both sets without repetition.", "دونوں سیٹوں کے تمام ارکان بغیر تکرار کے۔", "د دواړو سیټونو ټول غړي بې له تکراره.", Color(0xFF1D4ED8)),
                Class7MathsCard("Intersection (∩)", "A ∩ B", "Contains only common elements belonging to both sets.", "صرف وہ ارکان جو دونوں سیٹوں میں مشترک ہوں۔", "یوازې هغه غړي چې په دواړو سیټونو کې ګډ وي.", Color(0xFF2563EB)),
                Class7MathsCard("Complement (A')", "U - A", "Elements in Universal set that do not belong to set A.", "یونیورسل سیٹ کے وہ ارکان جو A میں نہ ہوں۔", "د یونیورسل سیټ هغه غړي چې په A کې نه وي.", Color(0xFF1D4ED8)),
                Class7MathsCard("De Morgan's Laws", "(A ∪ B)' = A' ∩ B'", "Complement of union equals intersection of complements.", "اجتماع کا تکملہ تقاطع کے تکملوں کے برابر ہوتا ہے۔", "د اتحاد متمم د متممونو له تقاطع سره مساوي دی.", Color(0xFF2563EB))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "If U = {1, 2, 3, 4, 5, 6, 7, 8}, A = {2, 4, 6, 8}, and B = {1, 2, 3, 4}, what is A ∩ B?",
                    questionUr = "اگر U={1..8}، A={2, 4, 6, 8} اور B={1, 2, 3, 4} ہوں تو A ∩ B کیا ہوگا؟",
                    questionPs = "که U={1..8}، A={2, 4, 6, 8} او B={1, 2, 3, 4} وي، نو A ∩ B څه شی دی؟",
                    options = listOf("{2, 4}", "{1, 2, 3, 4, 6, 8}", "{6, 8}", "{1, 3}"),
                    correctIndex = 0,
                    whyExplanationEn = "Intersection (∩) takes only the elements present in both sets A and B: {2, 4}.",
                    whyExplanationUr = "تقاطع میں صرف دونوں سیٹوں کے مشترک ارکان لیے جاتے ہیں: {2, 4}۔",
                    whyExplanationPs = "په تقاطع (∩) کې یوازې هغه غړي راځي چې په دواړو سیټونو کې ګډ وي: {2, 4}.",
                    formulaOrStep = "Common elements of A and B = {2, 4}",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the complement A' of set A = {2, 4, 6, 8} with Universal set U = {1, 2, 3, 4, 5, 6, 7, 8}?",
                    questionUr = "مجموعی سیٹ U={1..8} میں سیٹ A={2, 4, 6, 8} کا تکملہ A' کیا ہوگا؟",
                    questionPs = "د سیټ A={2, 4, 6, 8} متمم A' په یونیورسل سیټ U={1..8} کې څه شی دی؟",
                    options = listOf("{1, 3, 5, 7}", "{2, 4, 6, 8}", "{1, 2, 3, 4}", "∅ (Empty set)"),
                    correctIndex = 0,
                    whyExplanationEn = "A' = U - A. Removing all elements of A from U leaves the odd numbers: {1, 3, 5, 7}.",
                    whyExplanationUr = "A' = U - A۔ U میں سے A کے ارکان نکالنے پر طاق اعداد باقی بچتے ہیں: {1, 3, 5, 7}۔",
                    whyExplanationPs = "A' = U - A. له U څخه د A د غړو په لیرې کولو سره جفت نه بلکې طاق عددونه پاتې کېږي: {1, 3, 5, 7}.",
                    formulaOrStep = "A' = U - A = {1, 3, 5, 7}",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "According to De Morgan's First Law, what is (A ∪ B)' equal to?",
                    questionUr = "ڈی مورگن کے پہلے قانون کے مطابق (A ∪ B)' کس کے برابر ہے؟",
                    questionPs = "د ډي مورګن د لومړي قانون له مخې (A ∪ B)' د څه شي مساوي دی؟",
                    options = listOf("A' ∩ B'", "A' ∪ B'", "A ∩ B", "(A ∩ B)'"),
                    correctIndex = 0,
                    whyExplanationEn = "De Morgan's First Law states that the complement of the union of two sets is the intersection of their individual complements: (A ∪ B)' = A' ∩ B'.",
                    whyExplanationUr = "ڈی مورگن کے پہلے قانون کے مطابق: (A ∪ B)' = A' ∩ B' ہوتا ہے۔",
                    whyExplanationPs = "د ډي مورګن د لومړي قانون له مخې د اتحاد متمم د هغوی د متممونو له تقاطع سره مساوي دی: (A ∪ B)' = A' ∩ B'.",
                    formulaOrStep = "(A ∪ B)' = A' ∩ B'",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "If Set P = {x : x is a prime number < 10}, write P in tabular form:",
                    questionUr = "اگر سیٹ P دس سے چھوٹے مفرد اعداد پر مشتمل ہو، تو اسے اندراجی شکل میں لکھیں:",
                    questionPs = "که سیټ P تر ۱۰ کوچني مفرد عددونه وي، په جدوليزه بڼه یې ولیکئ:",
                    options = listOf("{2, 3, 5, 7}", "{1, 2, 3, 5, 7}", "{3, 5, 7, 9}", "{2, 4, 6, 8}"),
                    correctIndex = 0,
                    whyExplanationEn = "Prime numbers less than 10 are numbers with only two factors (1 and itself): 2, 3, 5, 7. Note that 1 is not a prime number.",
                    whyExplanationUr = "10 سے چھوٹے مفرد اعداد 2، 3، 5 اور 7 ہیں۔ واضح رہے کہ 1 مفرد عدد نہیں ہے۔",
                    whyExplanationPs = "تر ۱۰ کوچني مفرد عددونه ۲، ۳، ۵، او ۷ دي. پام مو وي چې ۱ مفرد عدد نه دی.",
                    formulaOrStep = "P = {2, 3, 5, 7}",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "If A = {a, b, c} and B = {c, d, e}, what is the set difference A - B?",
                    questionUr = "اگر A = {a, b, c} اور B = {c, d, e} ہوں تو سیٹ فرق A - B کیا ہوگا؟",
                    questionPs = "که A = {a, b, c} او B = {c, d, e} وي، نو د سیټونو تفریق A - B څه شی دی؟",
                    options = listOf("{a, b}", "{d, e}", "{a, b, d, e}", "{c}"),
                    correctIndex = 0,
                    whyExplanationEn = "A - B contains all elements that are in A but NOT in B. Element 'c' is in B, so removing it leaves {a, b}.",
                    whyExplanationUr = "A - B کا مطلب ہے وہ ارکان جو A میں ہوں لیکن B میں نہ ہوں: {a, b}۔",
                    whyExplanationPs = "A - B هغه غړي دي چې په A کې وي خو په B کې نه وي: {a, b}.",
                    formulaOrStep = "A - B = {a, b}",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 7: ALGEBRAIC EXPRESSIONS (p. 104–129) ───
        Class7MathsStage(
            id = 7,
            unitNumber = "Unit 7",
            pageRange = "Pages 104–129",
            titleEn = "Algebraic Expressions",
            titleUr = "الجبری جملے اور کلیات",
            titlePs = "الجبري عبارتونه او فارمولې",
            themeColor = Color(0xFFDC2626),
            secondaryColor = Color(0xFF7F1D1D),
            summaryEn = "Algebra was founded systematically by Muhammad ibn Musa al-Khwarizmi. Polynomials are algebraic expressions with non-negative integer powers of variables (monomial: 1 term, binomial: 2 terms, trinomial: 3 terms). Key algebraic identities: (a + b)² = a² + 2ab + b², (a - b)² = a² - 2ab + b², and (a + b)(a - b) = a² - b².",
            summaryUr = "الجبرا کے بانی محمد بن موسیٰ الخوارزمی ہیں۔ کثیر رقمی (پولینومیل) میں متغیرات کی طاقتیں مکمل اعداد ہوتی ہیں (یک رقمی، دو رقمی، سہ رقمی)۔ بنیادی الجبری کلیات: (a + b)² = a² + 2ab + b²، (a - b)² = a² - 2ab + b²، اور (a + b)(a - b) = a² - b² ہیں۔",
            summaryPs = "د الجبر بنسټ ایښودونکی محمد بن موسی الخوارزمي و. الجبري فارمولې: (a + b)² = a² + 2ab + b² او a² - b² = (a - b)(a + b) دي.",
            formulas = listOf(
                "Square of sum: (a + b)² = a² + 2ab + b²",
                "Square of difference: (a - b)² = a² - 2ab + b²",
                "Difference of squares: (a + b)(a - b) = a² - b²",
                "Degree of polynomial = Highest power of variable"
            ),
            cards = listOf(
                Class7MathsCard("Al-Khwarizmi", "Father of Algebra", "Muslim mathematician author of Kitab al-Jabr wa'l-Muqabala.", "کتاب الجبر والمقابلہ کے مصنف اور الجبرا کے بانی۔", "د الجبر بنسټ ایښودونکی مسلمان ریاضي پوه.", Color(0xFFDC2626)),
                Class7MathsCard("Polynomial Types", "1, 2, or 3 terms", "Monomial (3x²), Binomial (2x + 5), Trinomial (x² + 3x + 2).", "یک رقمی، دو رقمی اور سہ رقمی الجبری جملے۔", "یو غړیز، دوه غړیز او درې غړیز الجبري افادې.", Color(0xFFB91C1C)),
                Class7MathsCard("Identity 1", "(a + b)²", "a² + 2ab + b²: Expand squares of binomial sums.", "دو رقمی کے مجموعے کا مربع: a² + 2ab + b²۔", "د مجموعې مربع: a² + 2ab + b².", Color(0xFFDC2626)),
                Class7MathsCard("Identity 2", "(a - b)²", "a² - 2ab + b²: Expand squares of binomial differences.", "دو رقمی کے فرق کا مربع: a² - 2ab + b²۔", "د تفریق مربع: a² - 2ab + b².", Color(0xFFB91C1C)),
                Class7MathsCard("Difference of Squares", "a² - b²", "(a + b)(a - b): Factors of difference of two squares.", "دو مربعوں کے فرق کی فیکٹرائزیشن: (a + b)(a - b)۔", "د دوو مربع ګانو د تفریق تجزیه.", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Expand using identity: (3x + 4)²",
                    questionUr = "الجبری کلیہ لگا کر قیمت نکالیں: ²(3x + 4)",
                    questionPs = "د الجبري فارمولې په کارولو سره حل کړئ: ²(3x + 4)",
                    options = listOf("9x² + 24x + 16", "9x² + 16", "9x² + 12x + 16", "6x² + 24x + 8"),
                    correctIndex = 0,
                    whyExplanationEn = "Apply (a + b)² = a² + 2ab + b² where a = 3x and b = 4: (3x)² + 2(3x)(4) + (4)² = 9x² + 24x + 16.",
                    whyExplanationUr = "کلیہ (a + b)² = a² + 2ab + b²: (3x)² + 2(3x)(4) + 4² = 9x² + 24x + 16۔",
                    whyExplanationPs = "(3x)² + 2(3x)(4) + 4² = 9x² + 24x + 16.",
                    formulaOrStep = "(3x)² + 2(3x)(4) + 4² = 9x² + 24x + 16",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Evaluate 98² using algebraic identity (a - b)²:",
                    questionUr = "الجبری کلیہ ²(a - b) کی مدد سے 98² کی قیمت نکالیں:",
                    questionPs = "د الجبري فارمولې په مرسته د 98² قیمت ومومئ:",
                    options = listOf("9,604", "9,800", "9,404", "9,600"),
                    correctIndex = 0,
                    whyExplanationEn = "98² = (100 - 2)² = 100² - 2(100)(2) + 2² = 10,000 - 400 + 4 = 9,604.",
                    whyExplanationUr = "(100 - 2)² = 10,000 - 400 + 4 = 9,604۔",
                    whyExplanationPs = "(۱۰۰ - ۲)² = ۱۰۰۰۰ - ۴۰۰ + ۴ = ۹۶۰۴.",
                    formulaOrStep = "(100 - 2)² = 10000 - 400 + 4 = 9,604",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the degree of the polynomial: 5x⁴ - 3x² + 7x - 9?",
                    questionUr = "کثیر رقمی 5x⁴ - 3x² + 7x - 9 کا درجہ (Degree) کیا ہے؟",
                    questionPs = "د دې کثیرالحدي درجه څه ده: 5x⁴ - 3x² + 7x - 9؟",
                    options = listOf("4", "2", "1", "5"),
                    correctIndex = 0,
                    whyExplanationEn = "The degree of a polynomial is the highest exponent of the variable x, which is 4.",
                    whyExplanationUr = "کثیر رقمی کا درجہ متغیر کی سب سے بڑی طاقت ہوتا ہے، جو کہ 4 ہے۔",
                    whyExplanationPs = "د کثیرالحدي درجه د متحول تر ټولو لوړ توان دی چې دلته ۴ دی.",
                    formulaOrStep = "Highest power of x = 4",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Multiply the binomials: (x + 5)(x - 5)",
                    questionUr = "حاصل ضرب معلوم کریں: (x + 5)(x - 5)",
                    questionPs = "د ضرب حاصل ومومئ: (x + 5)(x - 5)",
                    options = listOf("x² - 25", "x² + 25", "x² - 10x - 25", "x² + 10x - 25"),
                    correctIndex = 0,
                    whyExplanationEn = "Using the difference of squares identity (a + b)(a - b) = a² - b²: (x + 5)(x - 5) = x² - 5² = x² - 25.",
                    whyExplanationUr = "کلیہ (a + b)(a - b) = a² - b²: (x)² - (5)² = x² - 25۔",
                    whyExplanationPs = "د فارمولې له مخې: (a + b)(a - b) = a² - b² ⇒ x² - 25.",
                    formulaOrStep = "(a + b)(a - b) = a² - b² ⇒ x² - 25",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Who is known as the founding father of Algebra mentioned in the textbook?",
                    questionUr = "درسی کتاب میں الجبرا کا بانی کن مسلمان ریاضی دان کو قرار دیا گیا ہے؟",
                    questionPs = "په درسي کتاب کې د الجبر بنسټ ایښودونکی څوک یاد شوی دی؟",
                    options = listOf("Muhammad ibn Musa al-Khwarizmi", "Ibn al-Haytham", "Al-Biruni", "Omar Khayyam"),
                    correctIndex = 0,
                    whyExplanationEn = "Muhammad ibn Musa al-Khwarizmi (780–850 CE) wrote 'Kitab al-Jabr wa'l-Muqabala', from which the word 'Algebra' is derived.",
                    whyExplanationUr = "محمد بن موسیٰ الخوارزمی نے 'کتاب الجبر والمقابلہ' لکھی جس سے لفظ الجبرا اخذ کیا گیا۔",
                    whyExplanationPs = "محمد بن موسی الخوارزمي د الجبر پلار ګڼل کېږي.",
                    formulaOrStep = "Al-Khwarizmi: Kitab al-Jabr wa'l-Muqabala",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 8: LINEAR EQUATIONS (p. 130–160) ───
        Class7MathsStage(
            id = 8,
            unitNumber = "Unit 8",
            pageRange = "Pages 130–160",
            titleEn = "Linear Equations & Coordinates",
            titleUr = "یک درجی مساوات اور نقاطی نظام",
            titlePs = "یک درجې مساوات او کارټیزین کرښې",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF0C4A6E),
            summaryEn = "A linear equation in one variable has the general form ax + b = 0 (a ≠ 0). Solving means isolating the variable using properties of equality. A linear equation in two variables has the form ax + by = c. In the Cartesian coordinate system, points are plotted as ordered pairs (x, y) on perpendicular X and Y axes meeting at the origin (0, 0).",
            summaryUr = "یک درجی مساوات کی عمومی شکل ax + b = 0 ہوتی ہے۔ حل معلوم کرنے کا مطلب برابری کے اصولوں کے تحت متغیر کو الگ کرنا ہے۔ دو متغیر والی مساوات ax + by = c ہوتی ہے۔ کارتیسی نقاطی نظام میں نقاط کو (x, y) کی صورت میں X اور Y محوروں پر کھینچا جاتا ہے۔",
            summaryPs = "د یو متحول لرونکې خطي مساوات عمومي بڼه ax + b = 0 ده. د حل لپاره متحول یوازې کېږي. د دوو متحولینو خطي مساوات ax + by = c ده. پر کارټیزین مستوي نقاط د (x, y) جوړې په بڼه ښودل کېږي.",
            formulas = listOf(
                "Linear equation in 1 variable: ax + b = 0",
                "Linear equation in 2 variables: ax + by = c",
                "Addition/Subtraction property of equality: a = b ⇒ a ± c = b ± c",
                "Cartesian plane: Origin (0, 0), x-coordinate (abscissa), y-coordinate (ordinate)"
            ),
            cards = listOf(
                Class7MathsCard("Isolating Variable", "Collect x on one side", "Add, subtract, multiply, or divide both sides by same non-zero number.", "مساوات کے دونوں طرف ایک ہی عدد کا عمل کر کے متغیر الگ کرنا۔", "د مساوات دواړو خواوو ته د یوه عمل په کولو سره متحول جلا کول.", Color(0xFF0284C7)),
                Class7MathsCard("Cartesian Plane", "(x, y)", "Plane defined by horizontal X-axis and vertical Y-axis.", "افقی X اور عمودی Y محوروں سے بننے والا نظام۔", "د افقي X او عمودي Y محورونو جوړه شوې مستوي.", Color(0xFF0369A1)),
                Class7MathsCard("Origin Point", "(0, 0)", "The intersection point of X and Y axes.", "دونوں محوروں کا نقطۂ تقاطع۔", "د دواړو محورونو د یو ځای کېدو نقطه.", Color(0xFF0284C7)),
                Class7MathsCard("Horizontal Line", "y = c", "Line parallel to X-axis with constant y value.", "X محور کے متوازی خط جس پر y کی قیمت مستقل ہو۔", "د X محور موازي خط چې د y قیمت پکې ثابت وي.", Color(0xFF0369A1)),
                Class7MathsCard("Vertical Line", "x = c", "Line parallel to Y-axis with constant x value.", "Y محور کے متوازی خط جس پر x کی قیمت مستقل ہو۔", "د Y محور موازي خط چې د x قیمت پکې ثابت وي.", Color(0xFF0284C7))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Solve for x: 3x - 7 = 14",
                    questionUr = "مساوات حل کریں: 14 = 7 - 3x",
                    questionPs = "مساوات حل کړئ: 3x - 7 = 14",
                    options = listOf("x = 7", "x = 5", "x = 21", "x = 8"),
                    correctIndex = 0,
                    whyExplanationEn = "Add 7 to both sides: 3x = 14 + 7 = 21. Divide by 3: x = 21 ÷ 3 = 7.",
                    whyExplanationUr = "دونوں طرف 7 جمع کریں: 3x = 21۔ 3 پر تقسیم کریں: x = 7۔",
                    whyExplanationPs = "دواړو خواوو ته ۷ ورزیات کړئ: 3x = ۲۱. پر ۳ یې ووېشئ: x = ۷.",
                    formulaOrStep = "3x - 7 = 14 ⇒ 3x = 21 ⇒ x = 7",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "The total price of a stapler and notebook is Rs 1,055. The notebook price is 1/4 the stapler price (Book Problem). Find the stapler price:",
                    questionUr = "سٹیپلر اور کاپی کی کل قیمت 1,055 روپے ہے۔ اگر کاپی کی قیمت سٹیپلر کا چوتھائی ہو تو سٹیپلر کی قیمت کیا ہے؟",
                    questionPs = "د سټیپلر او کتابچې ټوله بیه ۱۰۵۵ روپۍ ده. که کتابچه د سټیپلر ۱/۴ وي، د سټیپلر بیه څومره ده؟",
                    options = listOf("Rs 844", "Rs 800", "Rs 820", "Rs 850"),
                    correctIndex = 0,
                    whyExplanationEn = "Let stapler price = s. Notebook = s/4. s + s/4 = 1055 ⇒ (5s)/4 = 1055 ⇒ 5s = 4220 ⇒ s = Rs 844. (Notebook = 844/4 = 211).",
                    whyExplanationUr = "فرض کریں سٹیپلر s ہے تو کاپی s/4 ہوئی۔ s + s/4 = 1055 ⇒ 5s/4 = 1055 ⇒ s = (1055 × 4) ÷ 5 = 844 روپے۔",
                    whyExplanationPs = "د سټیپلر بیه s فرض کړئ: s + s/4 = ۱۰۵۵ ⇒ ۵s/۴ = ۱۰۵۵ ⇒ s = ۸۴۴ روپۍ.",
                    formulaOrStep = "5s / 4 = 1055 ⇒ s = (1055 × 4) / 5 = Rs 844",
                    difficulty = 3
                ),
                Class7QuizQuestion(
                    questionEn = "In which quadrant of the Cartesian plane does the point (-4, 5) lie?",
                    questionUr = "کارتیسی نقاطی نظام میں نقطہ (5 ,4-) کس ربع (Quadrant) میں واقع ہے؟",
                    questionPs = "نقطه (-4, 5) د کارټیزین مستوي په کومه ربع (Quadrant) کې واقع ده؟",
                    options = listOf("Quadrant II (دوسرا ربع)", "Quadrant I", "Quadrant III", "Quadrant IV"),
                    correctIndex = 0,
                    whyExplanationEn = "In Quadrant II, x-coordinates are negative (x < 0) and y-coordinates are positive (y > 0).",
                    whyExplanationUr = "دوسرے ربع میں x منفی اور y مثبت ہوتا ہے، لہٰذا (-4, 5) دوسرے ربع میں ہے۔",
                    whyExplanationPs = "په دویمه ربع کې x منفي او y مثبت وي.",
                    formulaOrStep = "x < 0 and y > 0 ⇒ Quadrant II",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the graph of the equation y = 5?",
                    questionUr = "مساوات y = 5 کا گراف کیسا ہوگا؟",
                    questionPs = "د مساوات y = 5 ګراف به څنګه وي؟",
                    options = listOf("Horizontal line parallel to X-axis", "Vertical line parallel to Y-axis", "Line passing through origin", "A circle"),
                    correctIndex = 0,
                    whyExplanationEn = "The equation y = 5 means every point has y-coordinate 5 regardless of x, which forms a horizontal line parallel to the X-axis at distance 5.",
                    whyExplanationUr = "مساوات y = 5 ایک افقی خط ہے جو X محور کے متوازی 5 یونٹ کے فاصلے پر ہے۔",
                    whyExplanationPs = "y = 5 یوه افقي کرښه ده چې د X محور موازي ده.",
                    formulaOrStep = "y = constant ⇒ Horizontal line || X-axis",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Solve for x: 5x + 3 = 2x + 18",
                    questionUr = "مساوات حل کریں: 18 + 2x = 3 + 5x",
                    questionPs = "مساوات حل کړئ: 5x + 3 = 2x + 18",
                    options = listOf("x = 5", "x = 7", "x = 6", "x = 4"),
                    correctIndex = 0,
                    whyExplanationEn = "Subtract 2x from both sides: 3x + 3 = 18. Subtract 3: 3x = 15. Divide by 3: x = 5.",
                    whyExplanationUr = "دونوں طرف سے 2x گھٹائیں: 3x + 3 = 18۔ 3 گھٹائیں: 3x = 15۔ x = 5۔",
                    whyExplanationPs = "5x - 2x = 18 - 3 ⇒ 3x = 15 ⇒ x = 5.",
                    formulaOrStep = "5x - 2x = 18 - 3 ⇒ 3x = 15 ⇒ x = 5",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 9: SURFACE, AREA AND VOLUME (p. 161–181) ───
        Class7MathsStage(
            id = 9,
            unitNumber = "Unit 9",
            pageRange = "Pages 161–181",
            titleEn = "Surface Area & Volume",
            titleUr = "سطحی رقبہ اور حجم",
            titlePs = "مساحت او حجم",
            themeColor = Color(0xFFEA580C),
            secondaryColor = Color(0xFF9A3412),
            summaryEn = "Composite shapes combine multiple geometric figures. A circle has circumference C = 2πr and area A = πr² (where π ≈ 22/7 or 3.142). A cylinder of radius r and height h has total surface area A = 2πr(r + h) and volume V = πr²h. Right prisms have Volume = Base Area × Height.",
            summaryUr = "مرکب اشکال کئی جیومیٹریائی اشکال کا مجموعہ ہوتی ہیں۔ دائرے کا محیط C = 2πr اور رقبہ A = πr² ہوتا ہے۔ r رداس اور h اونچائی والے سلنڈر کا کل سطحی رقبہ 2πr(r + h) اور حجم V = πr²h ہوتا ہے۔ سیدھے منشور کا حجم = بنیاد کا رقبہ × اونچائی ہوتا ہے۔",
            summaryPs = "د دایرې محیط C = 2πr او مساحت A = πr² دی. د استوانې (Cylinder) مساحت 2πr(r + h) او حجم V = πr²h دی.",
            formulas = listOf(
                "Circle Circumference = 2πr = πd",
                "Circle Area = πr²",
                "Cylinder Volume = πr²h",
                "Cylinder Total Surface Area = 2πrh + 2πr² = 2πr(r + h)",
                "Prism Volume = Base Area × Height"
            ),
            cards = listOf(
                Class7MathsCard("Circumference", "C = 2πr", "The boundary perimeter of a circle.", "دائرے کا بیرونی محیط۔", "د دایرې د کرښې اوږدوالی (محیط).", Color(0xFFEA580C)),
                Class7MathsCard("Circle Area", "A = πr²", "Space enclosed by circle: π ≈ 22/7.", "دائرے کے اندر کا کل رقبہ۔", "د دایرې مساحت.", Color(0xFFC2410C)),
                Class7MathsCard("Cylinder Volume", "V = πr²h", "Capacity of a cylinder: base area πr² times height h.", "سلنڈر کا حجم: بنیاد کا رقبہ ضرب اونچائی۔", "د استوانې حجم = د قاعدې مساحت ضرب لوړوالی.", Color(0xFFEA580C)),
                Class7MathsCard("Cylinder Surface", "2πr(r + h)", "Curved surface area 2πrh plus two circular bases 2πr².", "خمدار سطح اور دونوں سروں کا مجموعی رقبہ۔", "د استوانې د ټولې سطحې مساحت.", Color(0xFFC2410C)),
                Class7MathsCard("Composite Area", "Sum of regions", "Break compound shapes into rectangles, triangles, and circles.", "پیچیدہ شکلوں کو آسان ٹکڑوں میں تقسیم کر کے رقبہ نکالنا۔", "پېچلې بڼې په اسانو برخو وېشل.", Color(0xFFEA580C))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Find the area of a circle with radius r = 7 cm (take π = 22/7):",
                    questionUr = "7 سینٹی میٹر رداس والے دائرے کا رقبہ معلوم کریں (π = 22/7):",
                    questionPs = "د هغې دایرې مساحت ومومئ چې شعاع یې r = 7 cm ده (π = 22/7):",
                    options = listOf("154 cm²", "44 cm²", "308 cm²", "88 cm²"),
                    correctIndex = 0,
                    whyExplanationEn = "Area = πr² = (22/7) × 7 × 7 = 22 × 7 = 154 cm².",
                    whyExplanationUr = "رقبہ = πr² = (22 ÷ 7) × 7 × 7 = 154 مربع سینٹی میٹر۔",
                    whyExplanationPs = "مساحت = πr² = (۲۲/۷) × ۷ × ۷ = ۱۵۴ cm².",
                    formulaOrStep = "A = (22/7) × 7² = 154 cm²",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Find the volume of a cylinder with base radius r = 7 cm and height h = 10 cm:",
                    questionUr = "ایک سلنڈر کا حجم معلوم کریں جس کا رداس 7 سینٹی میٹر اور اونچائی 10 سینٹی میٹر ہو:",
                    questionPs = "د یوې استوانې حجم ومومئ چې شعاع یې ۷ cm او لوړوالی یې ۱۰ cm وي:",
                    options = listOf("1,540 cm³", "1,440 cm³", "770 cm³", "3,080 cm³"),
                    correctIndex = 0,
                    whyExplanationEn = "Volume = πr²h = (22/7) × 7² × 10 = 154 × 10 = 1,540 cm³.",
                    whyExplanationUr = "حجم = πr²h = (22/7) × 49 × 10 = 154 × 10 = 1,540 مکعب سینٹی میٹر۔",
                    whyExplanationPs = "حجم = πr²h = ۱۵۴ × ۱۰ = ۱۵۴۰ cm³.",
                    formulaOrStep = "V = πr²h = 154 × 10 = 1,540 cm³",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the circumference of a bicycle wheel with diameter d = 70 cm?",
                    questionUr = "70 سینٹی میٹر قطر والے سائیکل کے پہیے کا محیط کیا ہوگا؟",
                    questionPs = "د یو بایسکل د څرخ محیط څه دی چې قطر یې d = 70 cm دی؟",
                    options = listOf("220 cm", "440 cm", "110 cm", "154 cm"),
                    correctIndex = 0,
                    whyExplanationEn = "Circumference C = πd = (22/7) × 70 = 22 × 10 = 220 cm.",
                    whyExplanationUr = "محیط = πd = (22/7) × 70 = 220 سینٹی میٹر۔",
                    whyExplanationPs = "محیط = πd = (۲۲/۷) × ۷۰ = ۲۲۰ cm.",
                    formulaOrStep = "C = π × d = (22/7) × 70 = 220 cm",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Convert 5 m² into square centimetres (cm²):",
                    questionUr = "5 مربع میٹر کو مربع سینٹی میٹر (cm²) میں تبدیل کریں:",
                    questionPs = "۵ متر مربع په سانتي متر مربع (cm²) بدل کړئ:",
                    options = listOf("50,000 cm²", "500 cm²", "5,000 cm²", "500,000 cm²"),
                    correctIndex = 0,
                    whyExplanationEn = "Since 1 m = 100 cm, 1 m² = 100 × 100 = 10,000 cm². Therefore, 5 m² = 5 × 10,000 = 50,000 cm².",
                    whyExplanationUr = "چونکہ 1 میٹر = 100 سینٹی میٹر، اس لیے 1 مربع میٹر = 10,000 مربع سینٹی میٹر۔ 5 مربع میٹر = 50,000 cm²۔",
                    whyExplanationPs = "۱ متر مربع = ۱۰،۰۰۰ cm² دی، نو ۵ متر مربع = ۵۰،۰۰۰ cm² کېږي.",
                    formulaOrStep = "1 m² = 10,000 cm² ⇒ 5 × 10,000 = 50,000 cm²",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "A right prism has a triangular base of area 24 cm² and a height of 15 cm. What is its volume?",
                    questionUr = "ایک منشور کی مثلثی بنیاد کا رقبہ 24 مربع سینٹی میٹر اور اونچائی 15 سینٹی میٹر ہے۔ اس کا حجم کیا ہوگا؟",
                    questionPs = "د یوه منشور د قاعدې مساحت ۲۴ cm² او لوړوالی یې ۱۵ cm دی. حجم یې ومومئ:",
                    options = listOf("360 cm³", "180 cm³", "240 cm³", "480 cm³"),
                    correctIndex = 0,
                    whyExplanationEn = "Volume of prism = Base Area × Height = 24 cm² × 15 cm = 360 cm³.",
                    whyExplanationUr = "منشور کا حجم = بنیاد کا رقبہ × اونچائی = 24 × 15 = 360 مکعب سینٹی میٹر۔",
                    whyExplanationPs = "د منشور حجم = د قاعدې مساحت × لوړوالی = ۲۴ × ۱۵ = ۳۶۰ cm³.",
                    formulaOrStep = "V = Base Area × Height = 24 × 15 = 360 cm³",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 10: DISTANCE, TIME AND SPEED (p. 182–197) ───
        Class7MathsStage(
            id = 10,
            unitNumber = "Unit 10",
            pageRange = "Pages 182–197",
            titleEn = "Distance, Time and Speed",
            titleUr = "فاصلہ، وقت اور رفتار",
            titlePs = "واټن، وخت او سرعت",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF115E59),
            summaryEn = "Speed is the rate of distance covered per unit time: Speed = Distance / Time. Distance = Speed × Time, and Time = Distance / Speed. Converting speed: 1 km/h = 1000m / 3600s = 5/18 m/s. In 24-hour clock time, times after 12:00 noon have 12 added to hours (e.g. 10:20 p.m. = 22:20).",
            summaryUr = "رفتار فی اکائی وقت میں طے کردہ فاصلہ ہے: رفتار = فاصلہ / وقت۔ فاصلہ = رفتار × وقت، اور وقت = فاصلہ / رفتار۔ کلومیٹر فی گھنٹہ کو میٹر فی سیکنڈ میں بدلنے کیلئے 5/18 سے ضرب دیتے ہیں۔ 24 گھنٹوں والی گھڑی میں دوپہر کے بعد کے وقت میں 12 جمع کرتے ہیں (مثلاً 10:20 شام = 22:20)۔",
            summaryPs = "سرعت د وخت په هر واحد کې وهل شوی واټن دی: سرعت = واټن / وخت. د km/h نه m/s ته بدلولو لپاره په 5/18 ضربېږي. په ۲۴ ساعته ساعت کې د غرمې نه وروسته ساعت ته ۱۲ ورزیاتیږي.",
            formulas = listOf(
                "Speed = Distance / Time",
                "Distance = Speed × Time",
                "Time = Distance / Speed",
                "km/h to m/s: multiply by 5/18 (e.g. 72 km/h = 72 × 5/18 = 20 m/s)",
                "Average Speed = Total Distance / Total Time"
            ),
            cards = listOf(
                Class7MathsCard("Speed Formula", "S = D / T", "Measurement of how fast an object moves.", "کسی چیز کی حرکت کی تیزی کا پیمانہ۔", "د حرکت د تېزوالي کچه.", Color(0xFF0D9488)),
                Class7MathsCard("Distance", "D = S × T", "Product of speed and time travelled.", "رفتار اور وقت کا حاصل ضرب۔", "د سرعت او وخت حاصل ضرب.", Color(0xFF0F766E)),
                Class7MathsCard("Time Conversion", "1h = 3600s", "1 hour = 60 minutes = 3600 seconds.", "ایک گھنٹہ = 60 منٹ = 3600 سیکنڈ۔", "یو ساعت = ۶۰ دقیقې = ۳۶۰۰ ثانیې.", Color(0xFF0D9488)),
                Class7MathsCard("km/h to m/s", "× 5/18", "Multiply by 5/18 to convert km/h to m/s.", "کلومیٹر فی گھنٹہ کو میٹر فی سیکنڈ میں بدلنے کا فارمولا۔", "له کیلومتر/ساعت څخه متر/ثانیې ته اړول.", Color(0xFF0F766E)),
                Class7MathsCard("24-Hour Clock", "p.m. + 12:00", "12:40 p.m. = 12:40; 10:20 p.m. = 22:20.", "شام کے اوقات میں بارہ گھنٹے کا اضافہ۔", "د ماښام وختونو ته د ۱۲ ورزیاتول.", Color(0xFF0D9488))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "A plane took off from City A at 10:20 a.m. and reached City B at 12:40 p.m. (Book Problem). What was the journey time?",
                    questionUr = "کتاب کے مسئلے کے مطابق ایک جہاز صبح 10:20 پر اڑا اور 12:40 دوپہر پہنچا۔ سفر کا کل وقت کتنا تھا؟",
                    questionPs = "یوه الوتکه په ۱۰:۲۰ سهار پرواز کوي او ۱۲:۴۰ غرمه رسیږي. د سفر وخت څومره دی؟",
                    options = listOf("2 hours 20 minutes", "2 hours 40 minutes", "1 hour 50 minutes", "3 hours"),
                    correctIndex = 0,
                    whyExplanationEn = "From 10:20 a.m. to 12:20 p.m. is 2 hours. From 12:20 p.m. to 12:40 p.m. is 20 minutes. Total time = 2 h 20 min.",
                    whyExplanationUr = "صبح 10:20 سے دوپہر 12:20 تک 2 گھنٹے اور مزید 20 منٹ، یعنی کل 2 گھنٹے 20 منٹ۔",
                    whyExplanationPs = "له ۱۰:۲۰ نه تر ۱۲:۲۰ پورې ۲ ساعته او نور ۲۰ دقیقې: ۲ ساعته او ۲۰ دقیقې.",
                    formulaOrStep = "12:40 - 10:20 = 2 hours 20 minutes",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Convert a speed of 72 km/h into metres per second (m/s):",
                    questionUr = "72 کلومیٹر فی گھنٹہ کی رفتار کو میٹر فی سیکنڈ (m/s) میں تبدیل کریں:",
                    questionPs = "د ۷۲ کیلومتر/ساعت سرعت په متر/ثانیه (m/s) بدل کړئ:",
                    options = listOf("20 m/s", "25 m/s", "15 m/s", "18 m/s"),
                    correctIndex = 0,
                    whyExplanationEn = "To convert km/h to m/s, multiply by 5/18: 72 × (5/18) = 4 × 5 = 20 m/s.",
                    whyExplanationUr = "72 × (5/18) = 4 × 5 = 20 میٹر فی سیکنڈ۔",
                    whyExplanationPs = "۷۲ × (۵/۱۸) = ۴ × ۵ = ۲۰ m/s.",
                    formulaOrStep = "72 × (1000 / 3600) = 72 × (5/18) = 20 m/s",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "A train travels at an average speed of 90 km/h for 3 hours 30 minutes. What distance did it cover?",
                    questionUr = "ایک ٹرین 90 کلومیٹر فی گھنٹہ کی اوسط رفتار سے 3 گھنٹے 30 منٹ چلی۔ اس نے کتنا فاصلہ طے کیا؟",
                    questionPs = "یو ریل ګاډی په ۹۰ کیلومتر/ساعت سرعت سره ۳ ساعته او ۳۰ دقیقې روان و. څومره واټن یې وواهه؟",
                    options = listOf("315 km", "270 km", "300 km", "340 km"),
                    correctIndex = 0,
                    whyExplanationEn = "Time = 3.5 hours. Distance = Speed × Time = 90 km/h × 3.5 h = 315 km.",
                    whyExplanationUr = "وقت = 3.5 گھنٹے۔ فاصلہ = 90 × 3.5 = 315 کلومیٹر۔",
                    whyExplanationPs = "واټن = سرعت × وخت = ۹۰ × ۳.۵ = ۳۱۵ کیلومتره.",
                    formulaOrStep = "Distance = 90 × 3.5 = 315 km",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Convert 21:45 in 24-hour clock to 12-hour clock format:",
                    questionUr = "24 گھنٹے کے وقت 21:45 کو 12 گھنٹے والے فارمیٹ میں تبدیل کریں:",
                    questionPs = "د ۲۴ ساعته ۲۱:۴۵ وخت په ۱۲ ساعته فارمټ بدل کړئ:",
                    options = listOf("9:45 p.m.", "9:45 a.m.", "8:45 p.m.", "10:45 p.m."),
                    correctIndex = 0,
                    whyExplanationEn = "Subtract 12 from hours for times past 12:00: 21 - 12 = 9. So 21:45 = 9:45 p.m.",
                    whyExplanationUr = "21 میں سے 12 تفریق کریں: 21 - 12 = 9۔ یعنی رات 9:45 (9:45 p.m.)۔",
                    whyExplanationPs = "۲۱ - ۱۲ = ۹، نو د شپې ۹:۴۵ (9:45 p.m.) کېږي.",
                    formulaOrStep = "21 - 12 = 9 ⇒ 9:45 p.m.",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "How long does a car take to travel 180 km at a uniform speed of 60 km/h?",
                    questionUr = "ایک کار 60 کلومیٹر فی گھنٹہ کی یکساں رفتار سے 180 کلومیٹر فاصلہ کتنے وقت میں طے کرے گی؟",
                    questionPs = "یو موټر په ۶۰ کیلومتر/ساعت سرعت سره ۱۸۰ کیلومتره واټن په څومره وخت کې وهلی شي؟",
                    options = listOf("3 hours", "2.5 hours", "3.5 hours", "4 hours"),
                    correctIndex = 0,
                    whyExplanationEn = "Time = Distance ÷ Speed = 180 km ÷ 60 km/h = 3 hours.",
                    whyExplanationUr = "وقت = فاصلہ ÷ رفتار = 180 ÷ 60 = 3 گھنٹے۔",
                    whyExplanationPs = "وخت = واټن ÷ سرعت = ۱۸۰ ÷ ۶۰ = ۳ ساعته.",
                    formulaOrStep = "Time = 180 / 60 = 3 h",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 11: QUADRILATERALS, POLYGONS AND CIRCLES (p. 198–219) ───
        Class7MathsStage(
            id = 11,
            unitNumber = "Unit 11",
            pageRange = "Pages 198–219",
            titleEn = "Quadrilaterals & Polygons",
            titleUr = "چوکور اور کثیر الاضلاع",
            titlePs = "څلور ضلعي او پولیګونونه",
            themeColor = Color(0xFF4F46E5),
            secondaryColor = Color(0xFF312E81),
            summaryEn = "A quadrilateral has 4 sides and the sum of its interior angles is 360°. Types include square, rectangle, parallelogram, rhombus, trapezium, and kite. For any n-sided polygon, the sum of interior angles is (n - 2) × 180°. A circle features center, radius, diameter (d = 2r), chord, arc, sector, and segment.",
            summaryUr = "چوکور چار اضلاع پر مشتمل بند شکل ہے جس کے اندرونی زاویوں کا مجموعہ 360 درجہ ہوتا ہے (مربع، مستطیل، متوازی الاضلاع، معین، ذوزنقہ، پتنگ)۔ کسی n اضلاع والی کثیر الاضلاع کے اندرونی زاویوں کا مجموعہ (n - 2) × 180 درجہ ہوتا ہے۔ دائرے میں مرکز، رداس، وتر، قوس، قطعہ اور قطاع پائے جاتے ہیں۔",
            summaryPs = "څلور ضلعي ۴ اړخونه لري او د داخلي زاویو مجموع یې ۳۶۰ درجې ده. د n اړخیز پولیګون د داخلي زاویو مجموعه (n - 2) × 180° ده.",
            formulas = listOf(
                "Sum of quadrilateral angles = 360°",
                "Sum of interior angles of n-gon = (n - 2) × 180°",
                "Each interior angle of regular n-gon = [(n - 2) × 180°] / n",
                "Sum of exterior angles of any polygon = 360°",
                "Circle: Diameter d = 2r"
            ),
            cards = listOf(
                Class7MathsCard("Quadrilateral Sum", "360°", "Sum of all four interior angles is always 360°.", "چاروں اندرونی زاویوں کا مجموعہ 360 درجہ ہوتا ہے۔", "د څلور واړو داخلي زاویو مجموعه ۳۶۰ درجې وي.", Color(0xFF4F46E5)),
                Class7MathsCard("Parallelogram", "Opposite sides parallel", "Opposite sides and opposite angles are equal.", "مخالف اضلاع اور مخالف زاویے برابر ہوتے ہیں۔", "مخامخ اړخونه او زاویې مساوي دي.", Color(0xFF4338CA)),
                Class7MathsCard("Polygon Angle Sum", "(n - 2) × 180°", "Formula for total interior angles of any n-sided polygon.", "کثیر الاضلاع کے اندرونی زاویوں کے مجموعے کا کلیہ۔", "د پولیګون د داخلي زاویو د مجموعې فارمول.", Color(0xFF4F46E5)),
                Class7MathsCard("Trapezium", "1 pair parallel sides", "Quadrilateral with exactly one pair of parallel opposite sides.", "چوکور جس کے صرف دو مخالف اضلاع متوازی ہوں۔", "هغه څلور ضلعي چې یوازې دوه اړخونه یې موازي وي.", Color(0xFF4338CA)),
                Class7MathsCard("Circle Chord", "Connects two points", "Line segment joining any two points on circumference (diameter is longest).", "دائرے کے دو نقاط کو ملانے والی لکیر (قطر سب سے لمبا وتر ہے)۔", "هغه خط چې د دایرې دوه ټکي سره نښلوي.", Color(0xFF4F46E5))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "What is the sum of the interior angles of a hexagon (6-sided polygon)?",
                    questionUr = "چھ اضلاع والی کثیر الاضلاع (مسدس) کے اندرونی زاویوں کا مجموعہ کیا ہوگا؟",
                    questionPs = "د یوه ۶ اړخیز پولیګون د داخلي زاویو مجموعه څومره ده؟",
                    options = listOf("720°", "540°", "360°", "900°"),
                    correctIndex = 0,
                    whyExplanationEn = "Formula: (n - 2) × 180°. For a hexagon, n = 6: (6 - 2) × 180° = 4 × 180° = 720°.",
                    whyExplanationUr = "کلیہ: (n - 2) × 180 درجہ۔ مسدس کیلئے n = 6: (6 - 2) × 180 = 4 × 180 = 720 درجہ۔",
                    whyExplanationPs = "(n - 2) × 180° ⇒ (۶ - ۲) × ۱۸۰° = ۴ × ۱۸۰° = ۷۲۰°.",
                    formulaOrStep = "(6 - 2) × 180° = 4 × 180° = 720°",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "In a quadrilateral, three angles are 85°, 110°, and 95°. What is the fourth unknown angle?",
                    questionUr = "ایک چوکور کے تین زاویے 85، 110 اور 95 درجے ہیں۔ چوتھا نامعلوم زاویہ کیا ہوگا؟",
                    questionPs = "په یوه څلور ضلعي کې درې زاویې 85°، 110° او 95° دي. څلورمه ناڅرګنده زاویه څو ده؟",
                    options = listOf("70°", "75°", "80°", "65°"),
                    correctIndex = 0,
                    whyExplanationEn = "Sum of quadrilateral angles is 360°: 85° + 110° + 95° = 290°. Fourth angle = 360° - 290° = 70°.",
                    whyExplanationUr = "چوکور کا مجموعہ 360 ہوتا ہے: 85 + 110 + 95 = 290۔ چوتھا زاویہ = 360 - 290 = 70 درجہ۔",
                    whyExplanationPs = "د څلور ضلعي مجموعه ۳۶۰ ده: ۳۶۰ - ۲۹۰ = ۷۰ درجې.",
                    formulaOrStep = "360° - (85° + 110° + 95°) = 360° - 290° = 70°",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the longest chord in any circle called?",
                    questionUr = "کسی دائرے میں سب سے لمبا وتر (Chord) کیا کہلاتا ہے؟",
                    questionPs = "په دایره کې تر ټولو اوږد وتر څه بلل کېږي؟",
                    options = listOf("Diameter (قطر)", "Radius (رداس)", "Arc (قوس)", "Tangent (مماس)"),
                    correctIndex = 0,
                    whyExplanationEn = "The diameter passes through the center of the circle and connects two points on the circumference; it is the longest possible chord.",
                    whyExplanationUr = "قطر دائرے کے مرکز سے گزرتا ہے اور یہ دائرے کا سب سے لمبا وتر ہوتا ہے۔",
                    whyExplanationPs = "قطر د دایرې له مرکز څخه تېرېږي او تر ټولو اوږد وتر دی.",
                    formulaOrStep = "Diameter = 2 × Radius (longest chord)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is each interior angle of a regular pentagon (5 sides)?",
                    questionUr = "پانچ برابر اضلاع والی کثیر الاضلاع (مخمس) کا ہر اندرونی زاویہ کتنا ہوتا ہے؟",
                    questionPs = "د یوه منظم ۵ اړخیز پولیګون هره داخلي زاویه څو درجې ده؟",
                    options = listOf("108°", "120°", "90°", "72°"),
                    correctIndex = 0,
                    whyExplanationEn = "Total angle sum = (5 - 2) × 180° = 540°. Each angle = 540° ÷ 5 = 108°.",
                    whyExplanationUr = "کل مجموعہ = (5 - 2) × 180 = 540 درجہ۔ ہر زاویہ = 540 ÷ 5 = 108 درجہ۔",
                    whyExplanationPs = "مجموعه = (۵ - ۲) × ۱۸۰ = ۵۴۰°. هره زاویه = ۵۴۰ ÷ ۵ = ۱۰۸ درجې.",
                    formulaOrStep = "[(5 - 2) × 180°] / 5 = 540° / 5 = 108°",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Which quadrilateral has all 4 sides equal, but opposite angles are equal (not 90°)?",
                    questionUr = "کس چوکور کے چاروں اضلاع برابر ہوتے ہیں لیکن زاویے 90 کے بجائے صرف مخالف زاویے برابر ہوتے ہیں؟",
                    questionPs = "کومه څلور ضلعي څلور واړه مساوي اړخونه لري خو زاویې یې ۹۰ نه وي؟",
                    options = listOf("Rhombus (معین)", "Square", "Rectangle", "Trapezium"),
                    correctIndex = 0,
                    whyExplanationEn = "A rhombus has four equal sides and opposite angles equal. (A square has four right angles of 90°).",
                    whyExplanationUr = "معین کے چاروں اضلاع برابر ہوتے ہیں جبکہ اس کے مخالف زاویے برابر ہوتے ہیں (90 کے نہیں)۔",
                    whyExplanationPs = "معین ۴ مساوي اړخونه لري خو زاویې یې ۹۰ درجې نه وي.",
                    formulaOrStep = "Rhombus: 4 equal sides, opposite angles equal",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 12: ANGLES AND TRANSFORMATIONS (p. 220–240) ───
        Class7MathsStage(
            id = 12,
            unitNumber = "Unit 12",
            pageRange = "Pages 220–240",
            titleEn = "Angles & Transformations",
            titleUr = "زاویے اور تغیرات",
            titlePs = "زاویې او بدلونونه",
            themeColor = Color(0xFF9333EA),
            secondaryColor = Color(0xFF581C87),
            summaryEn = "Transformations change the position or orientation of shapes. Translation slides a shape without rotating or flipping it. Reflection flips a shape across a line of symmetry. Rotation turns a shape around a center of rotation by an angle. Triangles have interior angles summing to 180°.",
            summaryUr = "تغیرات کسی شکل کی پوزیشن یا رخ بدلتے ہیں۔ منتقلی (Translation) شکل کو بغیر گھمائے سرکانا ہے۔ انعکاس (Reflection) خطِ تناظر کے پار عکسی عکس بناتا ہے۔ گردش (Rotation) کسی مرکز کے گرد شکل کو مخصوص زاویے پر گھمانا ہے۔ مثلث کے اندرونی زاویوں کا مجموعہ 180 درجہ ہوتا ہے۔",
            summaryPs = "بدلونونه (Transformations) د شیانو موقعیت بدلوي: انتقال، انعکاس او دوران. د مثلث د داخلي زاویو مجموعه ۱۸۰ درجې ده.",
            formulas = listOf(
                "Triangle angle sum = 180°",
                "Exterior angle of triangle = Sum of two opposite interior angles",
                "Order of rotational symmetry = Number of times shape matches itself in 360° turn",
                "Translation: (x, y) → (x + a, y + b)"
            ),
            cards = listOf(
                Class7MathsCard("Translation", "Slide without turn", "Moving a shape along straight path without altering orientation.", "شکل کو بغیر رخ بدلے ایک جگہ سے دوسری جگہ سرکانا۔", "د شکل بې له څرخولو لېږدول.", Color(0xFF9333EA)),
                Class7MathsCard("Reflection", "Mirror image", "Flipping shape across mirror line of symmetry.", "آئینے کی طرح خطِ تناظر کے پار الٹنا۔", "د هېندارې غوندې انعکاس کول.", Color(0xFF7E22CE)),
                Class7MathsCard("Rotation", "Turn around center", "Turning an object about fixed point by angle θ.", "کسی مرکز کے گرد مخصوص زاویے پر گھمانا۔", "د مرکز په شاوخوا څرخول.", Color(0xFF9333EA)),
                Class7MathsCard("Rotational Symmetry", "Order n in 360°", "Square has rotational symmetry order 4; rectangle has order 2.", "مربع کی گردشی ہم آہنگی کا درجہ 4 ہے۔", "مربع د دوراني تقارن ۴ درجې لري.", Color(0xFF7E22CE)),
                Class7MathsCard("Triangle Angle Sum", "180°", "Sum of angles A + B + C in any triangle equals 180°.", "مثلث کے تینوں زاویوں کا مجموعہ ہمیشہ 180 درجہ ہوتا ہے۔", "د مثلث د ټولو زاویو مجموعه تل ۱۸۰ درجې ده.", Color(0xFF9333EA))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "In a right-angled triangle, one acute angle is 38°. What is the other acute angle?",
                    questionUr = "قائمۃ الزاویہ مثلث میں ایک حادہ زاویہ 38 درجہ ہے۔ دوسرا حادہ زاویہ کیا ہوگا؟",
                    questionPs = "په یوه قائمه زاویه لرونکي مثلث کې یوه حاده زاویه ۳۸ درجې ده. بله حاده زاویه څو ده؟",
                    options = listOf("52°", "42°", "62°", "48°"),
                    correctIndex = 0,
                    whyExplanationEn = "In a right triangle, the two acute angles sum to 90°: 90° - 38° = 52°.",
                    whyExplanationUr = "قائمۃ الزاویہ مثلث کے دو حادہ زاویوں کا مجموعہ 90 ہوتا ہے: 90 - 38 = 52 درجہ۔",
                    whyExplanationPs = "په قائمه زاویه مثلث کې: ۹۰ - ۳۸ = ۵۲ درجې.",
                    formulaOrStep = "90° - 38° = 52°",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the order of rotational symmetry of an equilateral triangle?",
                    questionUr = "مساوی الاضلاع مثلث کی گردشی ہم آہنگی (Rotational Symmetry) کا درجہ کیا ہے؟",
                    questionPs = "د یوه متساوي الاضلاع مثلث د دوراني تقارن درجه څو ده؟",
                    options = listOf("3", "2", "6", "1"),
                    correctIndex = 0,
                    whyExplanationEn = "An equilateral triangle matches its original outline at 120°, 240°, and 360° (3 times in a full turn).",
                    whyExplanationUr = "مساوی الاضلاع مثلث 360 درجے کے مکمل چکر میں 3 بار اپنی اصل شکل سے ملتی ہے: 120، 240 اور 360۔",
                    whyExplanationPs = "متساوي الاضلاع مثلث په ۳۶۰ درجو څرخ کې ۳ ځله خپل ځان سره برابریږي.",
                    formulaOrStep = "360° / 120° = 3",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Moving a wall clock from one spot to another without rotating or flipping it (Book Intro) is an example of:",
                    questionUr = "دیواری گھڑی کو بغیر گھمائے یا الٹے نئی جگہ پر لے جانا (کتاب کا تعارف) کس کی مثال ہے؟",
                    questionPs = "د دیوال ساعت بې له څرخولو له یوه ځایه بل ځای ته وړل د کوم بدلون بېلګه ده؟",
                    options = listOf("Translation (منتقلی)", "Reflection", "Rotation", "Dilation"),
                    correctIndex = 0,
                    whyExplanationEn = "Translation slides an object to a new location in a straight direction without altering its orientation.",
                    whyExplanationUr = "منتقلی (Translation) کسی چیز کو رخ بدلے بغیر نئی جگہ سرکانے کو کہتے ہیں۔",
                    whyExplanationPs = "انتقال (Translation) د شی د مخ له بدلولو پرته یوازې هغه بل ځای ته وړل دي.",
                    formulaOrStep = "Slide without orientation change = Translation",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "In an isosceles triangle, the angle between the two equal sides is 80°. What are the base angles?",
                    questionUr = "ایک متساوی الساقین مثلث میں دو برابر اضلاع کے درمیان کا زاویہ 80 درجہ ہے۔ قاعدے کے زاویے کیا ہوں گے؟",
                    questionPs = "په یوه متساوي الساقین مثلث کې د دوو مساوي اړخونو منځنۍ زاویه ۸۰ ده. د قاعدې زاویې څو دي؟",
                    options = listOf("50° each", "60° each", "40° each", "55° each"),
                    correctIndex = 0,
                    whyExplanationEn = "Total angles = 180°. Remaining for base angles = 180° - 80° = 100°. Since base angles are equal: 100° ÷ 2 = 50° each.",
                    whyExplanationUr = "باقی زاویے = 180 - 80 = 100 درجہ۔ چونکہ دونوں برابر ہیں اس لیے 100 ÷ 2 = 50 درجہ ہر ایک۔",
                    whyExplanationPs = "پاتې زاویې = ۱۸۰ - ۸۰ = ۱۰۰. څرنګه چې مساوي دي: ۱۰۰ ÷ ۲ = ۵۰ درجې هر یو.",
                    formulaOrStep = "(180° - 80°) / 2 = 100° / 2 = 50°",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "The exterior angle of a triangle is 115°, and one opposite interior angle is 45°. What is the second opposite interior angle?",
                    questionUr = "مثلث کا بیرونی زاویہ 115 درجہ ہے اور ایک اندرونی مخالف زاویہ 45 درجہ ہے۔ دوسرا اندرونی زاویہ کیا ہوگا؟",
                    questionPs = "د مثلث بهرنۍ زاویه ۱۱۵ درجې او یوه داخلي مخالفه زاویه ۴۵ ده. دویمه داخلي زاویه څو ده؟",
                    options = listOf("70°", "65°", "80°", "60°"),
                    correctIndex = 0,
                    whyExplanationEn = "An exterior angle equals the sum of the two opposite interior angles: Exterior = Interior 1 + Interior 2 ⇒ 115° = 45° + x ⇒ x = 115° - 45° = 70°.",
                    whyExplanationUr = "بیرونی زاویہ دو اندرونی مخالف زاویوں کے مجموعے کے برابر ہوتا ہے: 115 - 45 = 70 درجہ۔",
                    whyExplanationPs = "بهرنۍ زاویه د دوو داخلي مخامخ زاویو له مجموعې سره مساوي ده: ۱۱۵ - ۴۵ = ۷۰ درجې.",
                    formulaOrStep = "Exterior angle = 45° + x ⇒ x = 115° - 45° = 70°",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 13: DATA MANAGEMENT AND PROBABILITY (p. 241–269) ───
        Class7MathsStage(
            id = 13,
            unitNumber = "Unit 13",
            pageRange = "Pages 241–269",
            titleEn = "Data Management & Probability",
            titleUr = "شماراتی معلومات اور احتمال",
            titlePs = "د معلوماتو مدیریت او احتمال",
            themeColor = Color(0xFF0F766E),
            secondaryColor = Color(0xFF134E4A),
            summaryEn = "Data can be discrete or continuous, grouped or ungrouped. Measures of central tendency: Mean (average = sum of values / count), Median (middle value when arranged in order), and Mode (most frequent value). Probability of event E is P(E) = Number of favorable outcomes / Total possible outcomes. The complement rule states: P(not E) = 1 - P(E).",
            summaryUr = "اعداد و شمار متفرد یا مسلسل، اور گروہی یا غیر گروہی ہو سکتے ہیں۔ مرکزی رجحان کے پیمانے: حسابی اوسط (Mean = مجموعہ / تعداد)، وسطانیہ (Median: ترتیبی درمیانی قیمت)، اور اعادہ (Mode: سب سے زیادہ دہرائی گئی قیمت)۔ احتمال P(E) = سازگار نتائج / کل ممکنہ نتائج۔ اور P(not E) = 1 - P(E) ہوتا ہے۔",
            summaryPs = "معلومات (Data) وېشل کېږي. منځنی حد (Mean)، منځپانګه (Median)، او فېشن (Mode) مهم شاخصونه دي. د یوه واقعې احتمال P(E) = د مطلوبو پېښو شمېر / ټول امکانات.",
            formulas = listOf(
                "Mean = (Σx) / n",
                "Median = Middle value in sorted list (or average of two middle values)",
                "Mode = Value occurring most frequently",
                "Probability: P(E) = n(E) / n(S)",
                "Complement Rule: P(E') = 1 - P(E)"
            ),
            cards = listOf(
                Class7MathsCard("Mean (حسابی اوسط)", "Σx / n", "Average found by summing all values and dividing by count.", "تمام اعداد جمع کر کے کل تعداد پر تقسیم کرنا۔", "ټول عددونه جمع او پر تعداد یې وېشل.", Color(0xFF0F766E)),
                Class7MathsCard("Median (وسطانیہ)", "Middle in order", "Value that splits ordered data into two equal halves.", "ترتیب شدہ فہرست میں سب سے درمیانی قیمت۔", "په منظم شوي لیست کې منځنی عدد.", Color(0xFF115E59)),
                Class7MathsCard("Mode (اعادہ)", "Most frequent", "Number that appears with the highest frequency.", "اعداد و شمار میں سب سے زیادہ دہرائی جانے والی قیمت۔", "هغه عدد چې تر ټولو زیات تکرار شوی وي.", Color(0xFF0F766E)),
                Class7MathsCard("Probability", "P(E) = n(E)/n(S)", "Number between 0 (impossible) and 1 (certain).", "صفر (ناممکن) اور ایک (یقینی) کے درمیان احتمال۔", "د پېښېدو چانس چې له ۰ تر ۱ پورې وي.", Color(0xFF115E59)),
                Class7MathsCard("Complement of Event", "P(not E) = 1 - P(E)", "Probability of an event NOT happening.", "کسی واقعے کے رونما نہ ہونے کا احتمال۔", "د پېښې د نه واقع کېدو احتمال.", Color(0xFF0F766E))
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Weather forecast says there is a 67% chance of rain tomorrow (Book Intro). What is the probability that it will NOT rain?",
                    questionUr = "کتاب کے تعارف کے مطابق کل بارش کا 67 فیصد امکان ہے۔ بارش نہ ہونے کا کیا احتمال ہوگا؟",
                    questionPs = "د کتاب د تعارف له مخې سبا د باران ۶۷٪ چانس شته. د باران د نه ورېدو احتمال به څومره وي؟",
                    options = listOf("33% (0.33)", "67%", "23%", "50%"),
                    correctIndex = 0,
                    whyExplanationEn = "Complement rule: P(Not Rain) = 100% - P(Rain) = 100% - 67% = 33% (or 1 - 0.67 = 0.33).",
                    whyExplanationUr = "تکملہ اصول کے تحت: 100 فیصد - 67 فیصد = 33 فیصد (یا 0.33)۔",
                    whyExplanationPs = "د متمم قانون له مخې: ۱۰۰٪ - ۶۷٪ = ۳۳٪.",
                    formulaOrStep = "P(not E) = 1 - 0.67 = 0.33 (33%)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Find the Mean of the numbers: 12, 18, 15, 25, 20",
                    questionUr = "اعداد 12، 18، 15، 25 اور 20 کا حسابی اوسط (Mean) معلوم کریں:",
                    questionPs = "د ۱۲، ۱۸، ۱۵، ۲۵، او ۲۰ حسابي اوسط (Mean) ومومئ:",
                    options = listOf("18", "16", "20", "15"),
                    correctIndex = 0,
                    whyExplanationEn = "Sum = 12 + 18 + 15 + 25 + 20 = 90. Count n = 5. Mean = 90 ÷ 5 = 18.",
                    whyExplanationUr = "مجموعہ = 12 + 18 + 15 + 25 + 20 = 90۔ تعداد = 5۔ اوسط = 90 ÷ 5 = 18۔",
                    whyExplanationPs = "مجموعه = ۹۰. تعداد = ۵. اوسط = ۹۰ ÷ ۵ = ۱۸.",
                    formulaOrStep = "Mean = 90 / 5 = 18",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Find the Median of the set: 7, 3, 9, 12, 5, 8, 14",
                    questionUr = "اعداد 7، 3، 9، 12، 5، 8 اور 14 کا وسطانیہ (Median) معلوم کریں:",
                    questionPs = "د ۷، ۳، ۹، ۱۲، ۵، ۸، ۱۴ منځپانګه (Median) ومومئ:",
                    options = listOf("8", "7", "9", "5"),
                    correctIndex = 0,
                    whyExplanationEn = "First, sort numbers in ascending order: 3, 5, 7, 8, 9, 12, 14. The 4th middle value is 8.",
                    whyExplanationUr = "پہلے ترتیبی ترتیب میں رکھیں: 3، 5، 7، 8، 9، 12، 14۔ درمیانی چوتھا ہندسہ 8 ہے۔",
                    whyExplanationPs = "لومړی یې ترتیب کړئ: ۳، ۵، ۷، ۸، ۹، ۱۲، ۱۴. منځنی عدد ۸ دی.",
                    formulaOrStep = "Sorted: 3, 5, 7, [8], 9, 12, 14 ⇒ Median = 8",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "A standard fair 6-sided die is rolled. What is the probability of rolling a prime number?",
                    questionUr = "ایک چھ رخی لڈو کا دانہ پھینکا گیا۔ مفرد عدد (Prime number) آنے کا کیا احتمال ہے؟",
                    questionPs = "د دانې په غورځولو سره د مفرد عدد د راتلو احتمال څومره دی؟",
                    options = listOf("3/6 = 1/2", "2/6 = 1/3", "4/6 = 2/3", "1/6"),
                    correctIndex = 0,
                    whyExplanationEn = "Sample space S = {1, 2, 3, 4, 5, 6} (6 outcomes). Prime numbers are {2, 3, 5} (3 outcomes). P(Prime) = 3/6 = 1/2.",
                    whyExplanationUr = "کل نتائج = 6۔ مفرد اعداد {2, 3, 5} یعنی 3 ہیں۔ احتمال = 3/6 = 1/2۔",
                    whyExplanationPs = "ټول حالات = ۶. مفرد عددونه ۲، ۳، ۵ (۳ حالات). احتمال = ۳/۶ = ۱/۲.",
                    formulaOrStep = "P(Prime) = 3 / 6 = 1/2",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the Mode of the dataset: 4, 8, 5, 8, 9, 8, 7, 5, 4?",
                    questionUr = "اعداد 4, 8, 5, 8, 9, 8, 7, 5, 4 کا اعادہ (Mode) کیا ہے؟",
                    questionPs = "په دې ارقامو کې فېشن (Mode) کوم دی: 4, 8, 5, 8, 9, 8, 7, 5, 4؟",
                    options = listOf("8", "5", "4", "9"),
                    correctIndex = 0,
                    whyExplanationEn = "Number 8 appears 3 times, which is more frequent than any other number in the set.",
                    whyExplanationUr = "عدد 8 تین بار آیا ہے جو کہ باقی تمام اعداد سے زیادہ مرتبہ ہے، لہٰذا اعادہ 8 ہے۔",
                    whyExplanationPs = "۸ عدد تر ټولو زیات (۳ ځله) راغلی، نو فېشن ۸ دی.",
                    formulaOrStep = "Frequency of 8 = 3 (highest)",
                    difficulty = 1
                )
            )
        )
    )
}
