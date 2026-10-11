package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

data class Class3GKCard(
    val mainTitle: String,
    val meaningUr: String,
    val meaningPs: String,
    val meaningEn: String,
    val color: Color
)

data class Class3GKStage(
    val id: Int,
    val unitTitle: String,
    val pageRange: String,
    val titleUr: String,
    val titlePs: String,
    val titleEn: String,
    val themeColor: Color,
    val secondaryColor: Color,
    val summaryUr: String,
    val summaryPs: String,
    val summaryEn: String,
    val promptUr: String,
    val promptPs: String,
    val promptEn: String,
    val cards: List<Class3GKCard>,
    val quizzes: List<NazeraQuizQuestion>
)

object Class3GKRepository {
    val stages: List<Class3GKStage> = listOf(
        // Stage 1: The Sun (p. 1-6)
        Class3GKStage(
            id = 1,
            unitTitle = "باب 1 • Chapter 1",
            pageRange = "Pages 1–6",
            titleUr = "سورج اور بنیادی سمتیں",
            titlePs = "لمر او بنسټیز لوري",
            titleEn = "The Sun & Cardinal Directions",
            themeColor = Color(0xFFD97706),
            secondaryColor = Color(0xFF78350F),
            summaryUr = "زمین 365 دنوں میں سورج کے گرد مدار میں چکر مکمل کرتی ہے جس سے موسم بدلتے ہیں، اور اپنے محور پر 24 گھنٹوں میں گردش سے دن اور رات بنتے ہیں۔ مشرق، مغرب، شمال اور جنوب چار بنیادی سمتیں ہیں۔ روشنی سیدھی لکیر میں سفر کرتی ہے، رکاوٹ سے سایہ بنتا ہے اور صبح و شام سائے لمبے ہوتے ہیں۔",
            summaryPs = "ځمکه په ۳۶۵ ورځو کې د لمر شاوخوا چورلي چې فصلونه رامنځته کوي، او پر خپل چورلیز په ۲۴ ساعتونو کې ګرځي چې شپه او ورځ جوړوي. څلور اصلي لوري ختیځ، لویدیځ، شمال او سویل دي. سیوری د رڼا مخې ته له خنډ څخه جوړیږي او په سهار او ماښام اوږد وي.",
            summaryEn = "The Earth completes its orbit around the Sun in 365 days causing seasons, and rotates on its axis causing day and night. The 4 cardinal directions are East, West, North, and South. Light travels in straight lines; opaque obstacles form shadows which are longest at morning and evening.",
            promptUr = "سورج اور سمتوں کے تصورات کو ان کے درست معنی سے ملائیں!",
            promptPs = "د لمر او لورو مفاهیم له خپلو سمو معناوو سره وصل کړئ!",
            promptEn = "Match Sun and Direction concepts with their correct definitions!",
            cards = listOf(
                Class3GKCard("East (مشرق)", "سورج کے طلوع ہونے کی سمت", "هغه لوری چې لمر ترې راخېژي", "Direction of sunrise", Color(0xFFD97706)),
                Class3GKCard("West (مغرب)", "سورج کے غروب ہونے کی سمت", "هغه لوری چې لمر پکې ډوبېږي", "Direction of sunset", Color(0xFFEA580C)),
                Class3GKCard("Shadow (سایہ)", "روشنی کے راستے میں رکاوٹ سے بنتا ہے", "د رڼا مخې ته له خنډ څخه جوړېږي", "Formed opposite to light source", Color(0xFF475569)),
                Class3GKCard("Earth Orbit (زمین کا مدار)", "سورج کے گرد 365 دن کا چکر (موسم)", "د لمر شاوخوا ۳۶۵ ورځنۍ دوره", "Earth's 365-day journey around the Sun", Color(0xFF2563EB)),
                Class3GKCard("Noon Shadow (دوپہر کا سایہ)", "دوپہر کو سایہ سب سے چھوٹا ہوتا ہے", "په غرمه کې سیوری تر ټولو لنډ وي", "Shortest shadow occurs at noon", Color(0xFF059669))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "In which direction does the Sun rise on Earth?",
                    questionUr = "زمین پر سورج کس سمت سے طلوع ہوتا ہے؟",
                    questionPs = "پر ځمکه لمر له کوم لوري راخېژي؟",
                    arabicPrompt = "Sunrise",
                    options = listOf("East (مشرق)", "West (مغرب)", "North (شمال)", "South (جنوب)"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "At what time of the day is a shadow the shortest?",
                    questionUr = "دن کے کس وقت سایہ سب سے چھوٹا ہوتا ہے؟",
                    questionPs = "د ورځې په کوم وخت کې سیوری تر ټولو لنډ وي؟",
                    arabicPrompt = "Shadow",
                    options = listOf("Morning (صبح)", "Noon (دوپہر)", "Evening (شام)", "Midnight (آدھی رات)"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "How long does Earth take to complete one revolution around the Sun?",
                    questionUr = "زمین سورج کے گرد اپنا چکر کتنے دنوں میں مکمل کرتی ہے؟",
                    questionPs = "ځمکه د لمر پر شاوخوا خپل چکر په څو ورځو کې بشپړوي؟",
                    arabicPrompt = "Earth Orbit",
                    options = listOf("30 days", "100 days", "365 days", "24 hours"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "True or False: Light travels in a straight line.",
                    questionUr = "روشنی ہمیشہ سیدھی لکیر میں سفر کرتی ہے: درست یا غلط؟",
                    questionPs = "رڼا تل په مستقیمه کرښه حرکت کوي: سمه ده که غلطه؟",
                    arabicPrompt = "Light",
                    options = listOf("Correct (درست)", "Wrong (غلط)", "Only at night", "None"),
                    correctIndex = 0
                )
            )
        ),

        // Stage 2: Resources and Their Types (p. 7-13)
        Class3GKStage(
            id = 2,
            unitTitle = "باب 2 • Chapter 2",
            pageRange = "Pages 7–13",
            titleUr = "وسائل اور ان کی اقسام",
            titlePs = "سرچینې او د هغوی ډولونه",
            titleEn = "Resources & Their Types",
            themeColor = Color(0xFF059669),
            secondaryColor = Color(0xFF064E3B),
            summaryUr = "وسائل تین اقسام کے ہوتے ہیں: قدرتی وسائل (پانی، ہوا، جنگلات، مٹی، معدنیات)، انسانی وسائل (استاد، ڈاکٹر، کسان، کاریگر)، اور سرمائے کے وسائل (فیکٹریاں، اوزار، مشینیں، گاڑیاں)۔ اشیاء و خدمات کی قلت اور قیمت کے باعث ہم معاشی انتخاب کرتے ہیں۔ خریدار (Buyer) اور بیچنے والا (Seller) باہمی انحصار رکھتے ہیں۔",
            summaryPs = "سرچینې په درې ډوله دي: طبیعي سرچینې (اوبه، هوا، ځنګلونه، خاوره)، بشري سرچینې (ښوونکی، ډاکټر، بزګر)، او مالي/پانګیزې سرچینې (فابریکې، ماشینونه، وسایل). د توکو کمښت موږ اقتصادي انتخاب ته اړ باسي. پلورونکی او پېرودونکی پر یو بل متکي دي.",
            summaryEn = "Resources are categorized into 3 types: Natural resources (water, forests, air, minerals), Human resources (teachers, doctors, farmers, workers), and Capital resources (tools, machines, factories). Scarcity forces economic choices between buyers and sellers who depend on each other.",
            promptUr = "وسائل کی اقسام اور معاشی اصطلاحات کو ملائیں!",
            promptPs = "د سرچینو ډولونه او اقتصادي اصطلاحات وصل کړئ!",
            promptEn = "Match resources and economic terms with their definitions!",
            cards = listOf(
                Class3GKCard("Natural Resources (قدرتی)", "پانی، ہوا، مٹی، جنگلات اور معدنیات", "اوبه، هوا، خاوره او ځنګلونه", "Water, air, soil, forests", Color(0xFF059669)),
                Class3GKCard("Human Resources (انسانی)", "ڈاکٹر، استاد، وکیل، سائنسدان، درزی", "ډاکټر، ښوونکی، انجنیر، بزګر", "Teachers, doctors, engineers", Color(0xFF2563EB)),
                Class3GKCard("Capital Resources (سرمایہ)", "فیکٹریاں، مشینیں، ٹریکٹر، اوزار", "فابریکې، ماشینونه او وسایل", "Factories, tools, machines", Color(0xFF7C3AED)),
                Class3GKCard("Scarcity (قلت)", "اشیاء اور خدمات کی مارکیٹ میں کمی", "په بازار کې د توکو او خدمتونو کمښت", "Shortage of goods or services", Color(0xFFDC2626)),
                Class3GKCard("Buyer & Seller (گاہک و دکاندار)", "اشیاء خریدنے اور بیچنے والے کا باہمی انحصار", "د پېرودونکي او پلورونکي متقابل تړاو", "Interdependence in trade", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "Which of the following is a Natural Resource?",
                    questionUr = "ان میں سے کون سا قدرتی وسیلہ ہے؟",
                    questionPs = "په لاندې توکو کې کومه یوه طبیعي سرچینه ده؟",
                    arabicPrompt = "Natural Resource",
                    options = listOf("Aeroplane (طیارہ)", "Forest & Water (جنگل اور پانی)", "Factory (فیکٹری)", "Bicycle (سائیکل)"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "A doctor treating patients is an example of which resource?",
                    questionUr = "ڈاکٹر کا مریضوں کا علاج کرنا کس وسیلے کی مثال ہے؟",
                    questionPs = "د ډاکټر لخوا د ناروغانو درملنه د کومې سرچینې بېلګه ده؟",
                    arabicPrompt = "Human Resource",
                    options = listOf("Capital Resource", "Human Resource (انسانی وسیلہ)", "Natural Resource", "Mineral Resource"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "What is a person called who purchases goods from a market?",
                    questionUr = "جو شخص بازار سے اشیاء خریدتا ہے اسے کیا کہتے ہیں؟",
                    questionPs = "هغه څوک چې له بازار څخه شیان اخلي څه بلل کېږي؟",
                    arabicPrompt = "Economics",
                    options = listOf("Buyer (خریدار)", "Seller (بیچنے والا)", "Manufacturer", "Producer"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "Tractors, factories, and machinery belong to which group?",
                    questionUr = "ٹریکٹر، فیکٹریاں اور مشینیں وسائل کے کس گروپ میں آتی ہیں؟",
                    questionPs = "ټراکټورونه، فابریکې او ماشینونه د کومو سرچینو برخه دي؟",
                    arabicPrompt = "Capital Resource",
                    options = listOf("Natural", "Human", "Capital Resources (سرمائے کے وسائل)", "Biological"),
                    correctIndex = 2
                )
            )
        ),

        // Stage 3: Conservation of Natural Resources (p. 14-21)
        Class3GKStage(
            id = 3,
            unitTitle = "باب 3 • Chapter 3",
            pageRange = "Pages 14–21",
            titleUr = "قدرتی وسائل کا تحفظ",
            titlePs = "د طبیعي سرچینو ژغورنه",
            titleEn = "Conservation of Natural Resources",
            themeColor = Color(0xFF16A34A),
            secondaryColor = Color(0xFF14532D),
            summaryUr = "قدرتی وسائل کے فضول استعمال سے گریز کرنا تحفظ کہلاتا ہے۔ درخت کاٹنے (Deforestation) اور آلودگی سے جنگلی حیات خطرے میں پڑتی ہے۔ ناپید جانور (Extinct) وہ ہیں جو دنیا میں ختم ہو چکے جیسے ڈوڈو پرندہ اور ڈائناسور؛ جبکہ معدومیت کے خطرے سے دوچار جانور (Endangered) مارخور، برفانی چیتا اور کستوری ہرن ہیں۔ 3Rs کا اصول: کم استعمال (Reduce)، دوبارہ استعمال (Reuse)، اور ری سائیکل (Recycle) ہے۔",
            summaryPs = "د طبیعي سرچینو بې ځایه نه لګول ژغورنه ده. د ځنګلونو وهل او ککړتیا د ژویو ژوند ګواښي. له منځه تللي ځناور (Extinct) لکه ډوډو مرغه او ډایناسور، او په خطر کې ژوي (Endangered) لکه مارخور او د واورې پړانګ دي. د 3R اصول: لږ کارول، بیا کارول، او بیا رغول.",
            summaryEn = "Conservation means protecting natural resources from waste. Deforestation and pollution harm habitats. Extinct animals (Dodo bird, Dinosaur) no longer exist; Endangered animals (Markhor, Snow Leopard) face risk of extinction. The 3R strategy is Reduce, Reuse, Recycle.",
            promptUr = "تحفظِ وسائل، ناپید اور خطرے سے دوچار جانوروں کو ملائیں!",
            promptPs = "د سرچینو د ژغورنې او ژوو اصطلاحات وصل کړئ!",
            promptEn = "Match conservation concepts and wildlife terms!",
            cards = listOf(
                Class3GKCard("Extinct Animals (ناپید جانور)", "ڈائناسور اور ڈوڈو پرندہ جو دنیا سے ختم ہو چکے", "ډایناسور او ډوډو مرغه چې نور شتون نه لري", "Dinosaurs and Dodo bird", Color(0xFFDC2626)),
                Class3GKCard("Endangered (خطرے سے دوچار)", "مارخور اور کستوری ہرن جن کی نسل خطرے میں ہے", "مارخور چې د نسل د ختمېدو له خطر سره مخ دی", "Markhor & Snow Leopard", Color(0xFFEA580C)),
                Class3GKCard("3R Principle (تین اصول)", "Reduce (کم کریں), Reuse (دوبارہ استعمال), Recycle", "لږ کارول، بیا کارول او بیا جوړول", "Reduce, Reuse, Recycle", Color(0xFF16A34A)),
                Class3GKCard("Deforestation (درختوں کی کٹائی)", "جنگلات کا صفایا مٹی اور ماحول کو برباد کرتا ہے", "د ځنګلونو بې باکه وهل چاپېریال خرابوي", "Cutting down trees harms climate", Color(0xFF78350F)),
                Class3GKCard("Water Saving (پانی کی بچت)", "نل بند رکھنا اور پانی کا ضیاع روکنا", "د نل بندول او د اوبو د ضایع کېدو مخنیوی", "Turn off taps to save freshwater", Color(0xFF0284C7))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "Which of these animals is completely EXTINCT (no longer lives on Earth)?",
                    questionUr = "ان میں سے کون سا جانور دنیا سے بالکل ناپید (Extinct) ہو چکا ہے؟",
                    questionPs = "په دې کې کوم ژوی په بشپړه توګه له منځه تللی (Extinct) دی؟",
                    arabicPrompt = "Extinct",
                    options = listOf("Markhor (مارخور)", "Cow (گائے)", "Dodo Bird & Dinosaur (ڈوڈو اور ڈائناسور)", "Rabbit (خرگوش)"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "Which animal is the national animal of Pakistan and is Endangered?",
                    questionUr = "پاکستان کا قومی جانور کون سا ہے جو خطرے سے دوچار (Endangered) ہے؟",
                    questionPs = "د پاکستان ملي ژوی کوم دی چې د خطر سره مخ دی؟",
                    arabicPrompt = "National Animal",
                    options = listOf("Markhor (مارخور)", "Lion (شیر)", "Pigeon (کبوتر)", "Horse (گھوڑا)"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "What does the 3R environmental formula stand for?",
                    questionUr = "ماحول کے تحفظ کا '3R' فارمولا کن الفاظ کا مخفف ہے؟",
                    questionPs = "د چاپیریال د ساتنې 3R فورمول د څه شی لنډیز دی؟",
                    arabicPrompt = "3R Rules",
                    options = listOf("Read, Run, Rest", "Reduce, Reuse, Recycle", "Rice, Roti, Roll", "Rain, River, Road"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "What happens if deforestation (cutting of forests) occurs continuously?",
                    questionUr = "اگر جنگلات کی مسلسل کٹائی جاری رہے تو کیا نقصان ہوگا؟",
                    questionPs = "که د ځنګلونو وهل دوام ومومي څه به پېښ شي؟",
                    arabicPrompt = "Deforestation",
                    options = listOf("Floods & soil erosion increase", "Air becomes cleaner", "Rainfall doubles", "Animals increase"),
                    correctIndex = 0
                )
            )
        ),

        // Stage 4: Quaid-e-Azam Muhammad Ali Jinnah (p. 22-25)
        Class3GKStage(
            id = 4,
            unitTitle = "باب 4 • Chapter 4",
            pageRange = "Pages 22–25",
            titleUr = "قائد اعظم محمد علی جناحؒ",
            titlePs = "قائد اعظم محمد علي جناح",
            titleEn = "Quaid-e-Azam Muhammad Ali Jinnah",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF075985),
            summaryUr = "قائد اعظم محمد علی جناحؒ 25 دسمبر 1876ء کو کراچی میں پیدا ہوئے۔ ابتدائی تعلیم کراچی اور اعلیٰ قانونی تعلیم انگلستان سے حاصل کی۔ آپ نے 1906ء میں سیاست کا آغاز کیا اور برصغیر کے مسلمانوں کے لیے 14 اگست 1947ء کو پاکستان حاصل کیا۔ آپ پاکستان کے پہلے گورنر جنرل بنے اور مزار کراچی میں ہے۔ آپ کا سنہری اصول: اتحاد، تنظیم، یقین محکم ہے۔",
            summaryPs = "قائد اعظم محمد علي جناح د ۱۸۷۶ ز کال د ډسمبر پر ۲۵ په کراچۍ کې زېږېدلی. لوړې زده کړې یې په انګلستان کې وکړې. په ۱۹۰۶ کې یې سیاست پیل کړ او د ۱۹۴۷ د اګست پر ۱۴ یې پاکستان جوړ کړ. هغه لومړی ګورنر جنرال و او مزار یې په کراچۍ کې دی. د هغه زرین اصول: یووالی، نظم، او ټینګ باور دي.",
            summaryEn = "Quaid-e-Azam Muhammad Ali Jinnah was born on 25th December 1876 in Karachi. He studied law in England, entered politics in 1906, and founded Pakistan on 14th August 1947. He served as Pakistan's 1st Governor General. His motto was Unity, Faith, Discipline.",
            promptUr = "قائد اعظمؒ کی زندگی کے اہم واقعات کو ملائیں!",
            promptPs = "د قائد اعظم د ژوند مهمې پېښې وصل کړئ!",
            promptEn = "Match key historical facts about Quaid-e-Azam!",
            cards = listOf(
                Class3GKCard("Date of Birth (تاریخ پیدائش)", "25 دسمبر 1876ء، کراچی", "د ۱۸۷۶ ډسمبر ۲۵، کراچۍ", "25th December 1876 in Karachi", Color(0xFF0284C7)),
                Class3GKCard("Higher Education (اعلیٰ تعلیم)", "انگلستان سے قانون (وکالت) کی ڈگری", "له انګلستان څخه د قانون لوړې زده کړې", "Law education from England", Color(0xFF7C3AED)),
                Class3GKCard("Governor General (گورنر جنرل)", "پاکستان کے پہلے گورنر جنرل", "د پاکستان لومړی ګورنر جنرال", "First Governor General of Pakistan", Color(0xFF059669)),
                Class3GKCard("Golden Motto (سنہری اصول)", "اتحاد، تنظیم اور یقینِ محکم", "یووالی، تنظیم او ټینګ باور", "Unity, Faith, Discipline", Color(0xFFD97706)),
                Class3GKCard("Mausoleum (مزارِ قائد)", "کراچی میں واقع ہے", "په کراچۍ ښار کې دی", "Mausoleum in Karachi", Color(0xFF0F172A))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "When was Quaid-e-Azam Muhammad Ali Jinnah born?",
                    questionUr = "قائد اعظم محمد علی جناحؒ کب پیدا ہوئے؟",
                    questionPs = "قائد اعظم کله زېږېدلی و؟",
                    arabicPrompt = "Quaid Birth",
                    options = listOf("25th December 1876", "14th August 1947", "9th November 1877", "23rd March 1940"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "From which country did Quaid-e-Azam receive his higher law education?",
                    questionUr = "قائد اعظم نے اپنی اعلیٰ قانونی تعلیم کس ملک سے حاصل کی؟",
                    questionPs = "قائد اعظم خپلې لوړې قانوني زده کړې له کوم هېواد څخه وکړې؟",
                    arabicPrompt = "Education",
                    options = listOf("Germany", "India", "England (انگلستان)", "France"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "Which high office did Quaid-e-Azam hold after the creation of Pakistan?",
                    questionUr = "قیامِ پاکستان کے بعد قائد اعظم کس عہدے پر فائز ہوئے؟",
                    questionPs = "له جوړېدو وروسته قائد اعظم کومه دنده درلوده؟",
                    arabicPrompt = "First Governor",
                    options = listOf("Prime Minister", "First Governor General (پہلے گورنر جنرل)", "Chief Justice", "President"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "In which city is the tomb of Quaid-e-Azam situated?",
                    questionUr = "قائد اعظم محمد علی جناحؒ کا مزار کس شہر میں واقع ہے؟",
                    questionPs = "د قائد اعظم مزار په کوم ښار کې دی؟",
                    arabicPrompt = "Mausoleum",
                    options = listOf("Lahore", "Peshawar", "Islamabad", "Karachi (کراچی)"),
                    correctIndex = 3
                )
            )
        ),

        // Stage 5: Allama Muhammad Iqbal (p. 26-29)
        Class3GKStage(
            id = 5,
            unitTitle = "باب 5 • Chapter 5",
            pageRange = "Pages 26–29",
            titleUr = "علامہ محمد اقبالؒ",
            titlePs = "علامه محمد اقبال",
            titleEn = "Allama Muhammad Iqbal",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            summaryUr = "علامہ محمد اقبالؒ 9 نومبر 1877ء کو سیالکوٹ میں پیدا ہوئے۔ آپ ہمارے قومی شاعر اور عظیم مفکر ہیں۔ آپ نے 1930ء میں الہ آباد کے خطبے میں مسلمانوں کے لیے الگ وطن کا تصور پیش کیا۔ آپ نے بچوں کے لیے مشہور نظمیں جیسے 'مکڑا اور مکھی'، 'پہاڑ اور گلہری'، 'ہمدردی' اور 'لب پہ آتی ہے دعا' لکھیں۔ آپ کا مزار بادشاہی مسجد لاہور کے قریب ہے۔",
            summaryPs = "علامه محمد اقبال د ۱۸۷۷ د نومبر پر ۹ په سیالکوټ کې زېږېدلی. هغه زموږ ملي شاعر او مفکر دی. په ۱۹۳۰ ز کال کې یې په خطبه اله‌آباد کې د جلا هیواد مفکوره ورکړه. د ماشومانو لپاره یې مشهور نظمونه لکه 'پروانه'، 'خواخوږي' او 'دعا' ولیکل. مزار یې په لاهور کې دی.",
            summaryEn = "Allama Muhammad Iqbal was born on 9th November 1877 in Sialkot. He is our national poet who presented the idea of a separate Muslim homeland in his 1930 Allahabad address. He wrote famous children's poems like 'A Spider and A Fly', 'Sympathy', and 'Lab Pe Aati Hai Dua'. His tomb is in Lahore.",
            promptUr = "علامہ اقبالؒ کی شاعری اور قومی خدمات کے سوالات حل کریں!",
            promptPs = "د علامه اقبال شاعري او ملي خدمتونه وڅېړئ!",
            promptEn = "Match facts about National Poet Allama Muhammad Iqbal!",
            cards = listOf(
                Class3GKCard("National Poet (قومی شاعر)", "پاکستان کے قومی شاعر اور مفکر", "د پاکستان ملي شاعر او مفکر", "National Poet & Thinker of Pakistan", Color(0xFF7C3AED)),
                Class3GKCard("Birthplace (جائے پیدائش)", "9 نومبر 1877ء، سیالکوٹ", "د ۱۸۷۷ ز د نومبر ۹ په سیالکوټ کې", "9th November 1877 in Sialkot", Color(0xFF0284C7)),
                Class3GKCard("Allahabad Address (خطبہ الہ آباد)", "1930ء میں الگ وطن کا تصور دیا", "په ۱۹۳۰ کې د جلا هېواد مفکوره", "Conceived Pakistan idea in 1930", Color(0xFF059669)),
                Class3GKCard("Children Poems (بچوں کی نظمیں)", "مکڑا اور مکھی، ہمدردی، لب پہ آتی ہے دعا", "د ماشومانو لپاره اخلاقي او روزنیز نظمونه", "Famous poems for children", Color(0xFFD97706)),
                Class3GKCard("Mausoleum (مزار)", "لاہور میں بادشاہی مسجد کے ساتھ", "په لاهور کې د بادشاهي جومات تر څنګ", "Tomb next to Badshahi Mosque Lahore", Color(0xFF0F172A))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "Where was Allama Muhammad Iqbal born?",
                    questionUr = "علامہ محمد اقبالؒ کس شہر میں پیدا ہوئے؟",
                    questionPs = "علامه محمد اقبال په کوم ښار کې زېږېدلی و؟",
                    arabicPrompt = "Birthplace",
                    options = listOf("Lahore", "Sialkot (سیالکوٹ)", "Karachi", "Peshawar"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "Who expounded the idea of a separate homeland for Indian Muslims in 1930?",
                    questionUr = "1930ء میں مسلمانوں کے لیے الگ وطن کا تصور کس نے پیش کیا؟",
                    questionPs = "په ۱۹۳۰ کې چا د مسلمانانو لپاره د جلا هیواد مفکوره وړاندې کړه؟",
                    arabicPrompt = "Idea of Pakistan",
                    options = listOf("Allama Muhammad Iqbal (علامہ اقبالؒ)", "Sir Syed Ahmad Khan", "Liaquat Ali Khan", "Fatima Jinnah"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "In which city is the tomb of Allama Muhammad Iqbal located?",
                    questionUr = "علامہ محمد اقبالؒ کا مزار کس شہر میں واقع ہے؟",
                    questionPs = "د علامه اقبال مزار په کوم ښار کې دی؟",
                    arabicPrompt = "Tomb",
                    options = listOf("Multan", "Islamabad", "Lahore (لاہور)", "Rawalpindi"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "Which of the following famous poems was written by Allama Iqbal for children?",
                    questionUr = "بچوں کے لیے ان میں سے کون سی مشہور نظم علامہ اقبال نے لکھی؟",
                    questionPs = "د ماشومانو لپاره لاندې کوم مشهور نظم اقبال لیکلی؟",
                    arabicPrompt = "Poem",
                    options = listOf("Lab Pe Aati Hai Dua (لب پہ آتی ہے دعا)", "Twinkle Twinkle", "Baa Baa Black Sheep", "Johnny Johnny"),
                    correctIndex = 0
                )
            )
        ),

        // Stage 6: Changes in Living Things (p. 30-34)
        Class3GKStage(
            id = 6,
            unitTitle = "باب 6 • Chapter 6",
            pageRange = "Pages 30–34",
            titleUr = "جانداروں میں تبدیلیاں اور دورِ حیات",
            titlePs = "په ژوندیو موجوداتو کې بدلونونه او ژوند دوره",
            titleEn = "Changes in Living Things & Life Cycles",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF115E59),
            summaryUr = "جاندار پیدائش سے موت تک تبدیلیوں کے مراحل سے گزرتے ہیں جسے دورِ حیات (Life Cycle) کہتے ہیں۔ کچھ جاندار پیدائش کے وقت والدین سے مشابہ ہوتے ہیں جیسے بلی کا بچہ (Kitten)، گائے کا بچھڑا، اور انسان؛ جبکہ تتلی (Butterfly) اور مینڈک چار مختلف مراحل سے گزرتے ہیں: انڈا (Egg)، لاروا/کیٹرپلر (Larva)، پیوپا (Pupa)، اور بالغ تتلی (Adult)۔ پودے بیج سے اگ کر پھول اور نئے بیج بناتے ہیں۔",
            summaryPs = "ژوي له زېږېدو تر مړینې پورې بېلابېل پړاوونه تېروي چې د ژوند دور (Life Cycle) بلل کېږي. ځینې بچي د زېږېدو پر مهال له مور او پلار سره ورته وي لکه د پیشو او غوا، خو تیتلۍ او چنګښه بېلابېل پړاوونه وهي: هګۍ، لاروا، پیوپا او لویه تیتلۍ.",
            summaryEn = "A life cycle shows the changes an organism goes through from birth to adult. Some babies resemble parents at birth (kitten, calf, human baby). Others undergo complete metamorphosis like a butterfly: Egg -> Caterpillar/Larva -> Pupa/Chrysalis -> Adult Butterfly. Plants grow from seeds to flower and produce seeds.",
            promptUr = "دورِ حیات اور جانداروں کے تبدیلی کے مراحل کو ملائیں!",
            promptPs = "د ژوندیو موجوداتو د ژوند پړاوونه وصل کړئ!",
            promptEn = "Match stages of life cycles of animals and plants!",
            cards = listOf(
                Class3GKCard("Butterfly Stages (تتلی کے 4 مراحل)", "انڈا، لاروا (کیٹرپلر)، پیوپا، بالغ تتلی", "هګۍ، لاروا، پیوپا، او لویه تیتلۍ", "Egg -> Larva -> Pupa -> Adult", Color(0xFF0D9488)),
                Class3GKCard("Resemble Parents (والدین سے مشابہ)", "بلی کا بچہ، گائے کا بچھڑا، چوزہ، انسان", "د پیشو او غوا بچي چې له پیله ورته وي", "Kitten, calf, puppy look like parents", Color(0xFF2563EB)),
                Class3GKCard("Frog Life Cycle (مینڈک کا دور)", "انڈے، ٹیڈپول (دم والا)، جوان مینڈک", "هګۍ، ټیډپول او بالاخره لویه چنګښه", "Egg -> Tadpole -> Adult Frog", Color(0xFF16A34A)),
                Class3GKCard("Plant Life Cycle (پودے کا دور)", "بیج، کونپل، چھوٹا پودا، پھول و پھل", "تخم، زرغونېدل، بوټی او نوي تخمونه", "Seed -> Seedling -> Mature Plant", Color(0xFFD97706)),
                Class3GKCard("Life Span (عمر / دورِ حیات)", "پیدائش، نمو، افزائش اور خاتمہ", "د هر ژوي د پیدایښت، ودې او ژوند موده", "Birth, growth, reproduction, death", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "What are the four correct stages in the life cycle of a butterfly?",
                    questionUr = "تتلی کے دورِ حیات کے چار درست مراحل کون سے ہیں؟",
                    questionPs = "د تیتلۍ د ژوند دورې څلور سم پړاوونه کوم دي؟",
                    arabicPrompt = "Butterfly",
                    options = listOf("Egg -> Larva -> Pupa -> Adult", "Adult -> Seed -> Leaf -> Fruit", "Egg -> Tadpole -> Frog", "Seed -> Root -> Stem -> Flower"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "Which animal baby looks like its parents right at the time of birth?",
                    questionUr = "ان میں سے کس جاندار کا بچہ پیدائش کے وقت والدین جیسا دکھائی دیتا ہے؟",
                    questionPs = "د کوم ژوي بچی د زېږېدو پر مهال له مور پلار سره ورته وي؟",
                    arabicPrompt = "Offspring",
                    options = listOf("Butterfly (تتلی)", "Kitten / Cat (بلی کا بچہ)", "Frog (مینڈک)", "Mosquito (مچھر)"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "What comes out of a butterfly egg first?",
                    questionUr = "تتلی کے انڈے سے سب سے پہلے کیا نکلتا ہے؟",
                    questionPs = "د تیتلۍ له هګۍ لومړی څه شی راوځي؟",
                    arabicPrompt = "Metamorphosis",
                    options = listOf("Flying Butterfly", "Pupa", "Larva / Caterpillar (سنڈی)", "Cocoon"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "What is the young swimming stage of a frog called?",
                    questionUr = "مینڈک کے بچے کے تیرنے والے ابتدائی مرحلے کو کیا کہتے ہیں؟",
                    questionPs = "د چنګښې د بچي لومړني لامبو وهونکي پړاو ته څه وایي؟",
                    arabicPrompt = "Frog",
                    options = listOf("Tadpole (ٹیڈپول)", "Pupa", "Cub", "Chick"),
                    correctIndex = 0
                )
            )
        ),

        // Stage 7: Habitat (p. 35-51)
        Class3GKStage(
            id = 7,
            unitTitle = "باب 7 • Chapter 7",
            pageRange = "Pages 35–51",
            titleUr = "مسکن اور جانداروں کا ماحول",
            titlePs = "مسکن او چاپېریال",
            titleEn = "Habitat & Ecosystems",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF0369A1),
            summaryUr = "وہ قدرتی جگہ جہاں کوئی جاندار رہتا ہے، خوراک اور پناہ حاصل کرتا ہے اس کا مسکن (Habitat) کہلاتی ہے۔ زمین پر چار بڑے مساکن ہیں: قطبی خطہ (Polar Region: شدید سردی، برف، پولر بیئر، پینگوئن)، صحرائی مسکن (Desert: شدید گرمی و خشکی، اونٹ، ناگ پھنی کاکٹس)، جنگلاتی مسکن (Forest: بارش، سرسبز درخت، بندر، شیر، پرندے)، اور آبی مسکن (Aquatic: سمندر، دریا، مچھلیاں، کنول کا پھول)۔ سمندر سب سے بڑا آبی مسکن ہے۔",
            summaryPs = "هغه طبیعي ځای چې ژوی پکې ژوند کوي، خواړه او سرپناه مومي مسکن بلل کېږي. څلور مهم مسکنونه: قطبي سیمې (واوره، قطبي ایږ، پینګوین)، صحرا (وچه او توده، اوښ، کاکټوس)، ځنګل (ونې، زمری، مرغان)، او اوبیز مسکن (سمندرونه، ویالې، کبان). سمندر تر ټولو لوی اوبیز مسکن دی.",
            summaryEn = "A habitat is a natural place where plants and animals live, find food, and shelter. The 4 major habitats are: Polar Region (extremely cold, ice, polar bear, penguin), Desert (hot and dry, camel, cactus), Forest (trees, rain, lion, monkey), and Aquatic (oceans, rivers, fish, water lily). Oceans are the largest water habitat.",
            promptUr = "جانداروں کو ان کے قدرتی مسکن کے ساتھ ملائیں!",
            promptPs = "ژوي له خپلو طبیعي مسکنونو سره وصل کړئ!",
            promptEn = "Match living organisms with their natural habitats!",
            cards = listOf(
                Class3GKCard("Polar Habitat (قطبی خطہ)", "برفانی ریچھ (Polar Bear) اور پینگوئن", "قطبي ایږ او پینګوین په واورو کې", "Polar Bear & Penguin in icy snow", Color(0xFF0284C7)),
                Class3GKCard("Desert Habitat (صحرا)", "اونٹ (صحرا کا جہاز) اور کاکٹس پودا", "اوښ او کاکټوس په ګرمه وچه دښته کې", "Camel and Cactus in dry sands", Color(0xFFD97706)),
                Class3GKCard("Forest Habitat (جنگل)", "شیر، بندر، ہرن اور گھنے درخت", "زمری، بيزو، هوسۍ او ګڼې ونې", "Lion, monkey, deer and thick trees", Color(0xFF16A34A)),
                Class3GKCard("Aquatic Habitat (آبی مسکن)", "مچھلیاں، وہیل اور کنول کا پھول (Lotus)", "کبان، ویل او په اوبو کې ګلان", "Fish, oceans, lakes and water lily", Color(0xFF0D9488)),
                Class3GKCard("Adaptation (موافقت)", "سفید کھال پولر بیئر کو دشمنوں سے چھپاتی ہے", "د ژوو ځانګړتیاوې چې په مسکن کې یې ساتي", "White fur camouflages polar bear in snow", Color(0xFF475569))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "What is the biggest water (aquatic) habitat on Earth?",
                    questionUr = "زمین پر سب سے بڑا آبی مسکن (Water habitat) کون سا ہے؟",
                    questionPs = "پر ځمکه تر ټولو لوی اوبیز مسکن کوم دی؟",
                    arabicPrompt = "Aquatic",
                    options = listOf("Pond (تالاب)", "River (دریا)", "Ocean / Sea (سمندر)", "Well (کنواں)"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "Which animal is specially adapted to live in a hot, dry desert?",
                    questionUr = "کون سا جانور گرم اور خشک صحرا میں رہنے کی خاص صلاحیت رکھتا ہے؟",
                    questionPs = "کوم ژوی په ګرمه او وچه دښته کې د اوسېدو وړتیا لري؟",
                    arabicPrompt = "Desert Animal",
                    options = listOf("Penguin", "Camel (اونٹ)", "Polar Bear", "Dolphin"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "Why does a polar bear have thick white fur?",
                    questionUr = "برفانی ریچھ کی کھال موٹی اور سفید کیوں ہوتی ہے؟",
                    questionPs = "د قطبي ایږ پوستکی ولې ډبل او سپین وي؟",
                    arabicPrompt = "Polar Bear",
                    options = listOf("For extreme cold & snow camouflage", "To swim fast", "To fly in air", "To climb trees"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "True or False: Any living organism can live in any habitat without problem.",
                    questionUr = "کوئی بھی جاندار کسی بھی مسکن میں بآسانی زندہ رہ سکتا ہے: درست یا غلط؟",
                    questionPs = "هر ژوی په هر مسکن کې په اسانۍ ژوند کولی شي: سمه ده که غلطه؟",
                    arabicPrompt = "Habitat Law",
                    options = listOf("Correct (درست)", "False / Wrong (غلط)", "Only in winter", "None"),
                    correctIndex = 1
                )
            )
        ),

        // Stage 8: Food (p. 52-62)
        Class3GKStage(
            id = 8,
            unitTitle = "باب 8 • Chapter 8",
            pageRange = "Pages 52–62",
            titleUr = "خوراک اور متوازن غذا",
            titlePs = "خوراک او متوازنه غذا",
            titleEn = "Food, Nutrition & Balanced Diet",
            themeColor = Color(0xFFEA580C),
            secondaryColor = Color(0xFF9A3412),
            summaryUr = "تمام جانداروں کو توانائی کے لیے خوراک کی ضرورت ہوتی ہے۔ پودے سورج کی روشنی میں اپنی خوراک خود تیار کرتے ہیں۔ جانور تین گروہوں میں تقسیم ہیں: پودے کھانے والے (Herbivores: گائے، بکری، ہرن)، گوشت خور (Carnivores: شیر، چیتا، بھیڑیا)، اور ہمہ خور (Omnivores: انسان، ریچھ، مرغی جو پودے اور گوشت دونوں کھائیں)۔ صحت کے لیے متوازن غذا (Balanced Diet) اور روزانہ ورزش ضروری ہے۔",
            summaryPs = "ټول ژوي د انرژۍ لپاره خواړو ته اړتیا لري. بوټي د لمر په رڼا کې خپل خواړه خپله جوړوي. ژوي په ۳ ډلو وېشل شوي: واښه خوړونکي (Herbivores: غوا، وزه)، غوښه خوړونکي (Carnivores: زمری، لیوه)، او هر څه خوړونکي (Omnivores: انسان، چرګه، ایږ). متوازنه غذا او تمرین روغتیا ساتي.",
            summaryEn = "Living things need energy from food. Plants make their own food using sunlight. Animals are divided into: Herbivores (plant eaters: cow, goat), Carnivores (meat eaters: lion, wolf), and Omnivores (eat both plants and meat: humans, bears, crows). A balanced diet contains all food groups in proper amounts.",
            promptUr = "خوراک کے گروہوں اور غذائی عادات کو درست معنی سے ملائیں!",
            promptPs = "د خواړو ګروپونه او غذایي عادتونه وصل کړئ!",
            promptEn = "Match animal food categories and nutritional concepts!",
            cards = listOf(
                Class3GKCard("Herbivores (سبزی خور)", "صرف گھاس اور پودے کھانے والے (گائے، بکری)", "هغه ژوي چې یوازې واښه خوري (غوا، وزه)", "Plant eaters like cows & goats", Color(0xFF16A34A)),
                Class3GKCard("Carnivores (گوشت خور)", "دوسرے جانوروں کا گوشت کھانے والے (شیر، بھیڑیا)", "هغه چې یوازې غوښه خوري (زمری، لیوه)", "Meat eaters like lions & wolves", Color(0xFFDC2626)),
                Class3GKCard("Omnivores (ہمہ خور)", "پودے اور گوشت دونوں کھانے والے (انسان، ریچھ)", "هغه چې واښه او غوښه دواړه خوري (انسان، ایږ)", "Eat both plants and meat", Color(0xFF7C3AED)),
                Class3GKCard("Balanced Diet (متوازن غذا)", "اناج، پھل، سبزیاں، دودھ اور گوشت کا متناسب استعمال", "هغه خواړه چې ټول ګټور غذایي توکي لري", "Diet containing all essential food groups", Color(0xFF059669)),
                Class3GKCard("Photosynthesis (پودوں کی خوراک)", "پودے سورج کی روشنی سے خوراک بناتے ہیں", "بوټي د لمر په رڼا کې خپل خواړه جوړوي", "Plants make food using sunlight", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "What do we call animals that eat ONLY plants and grass?",
                    questionUr = "صرف گھاس اور پودے کھانے والے جانوروں کو کیا کہتے ہیں؟",
                    questionPs = "هغو ژوو ته څه وایي چې یوازې واښه او بوټي خوري؟",
                    arabicPrompt = "Herbivore",
                    options = listOf("Carnivores", "Herbivores (سبزی خور)", "Omnivores", "Insects"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "Which of the following animals is an Omnivore (eats both plants and meat)?",
                    questionUr = "ان میں سے کون سا جاندار ہمہ خور (Omnivore) ہے جو پودے اور گوشت دونوں کھاتا ہے؟",
                    questionPs = "په لاندې ژوو کې کوم یو هر څه خوړونکی (Omnivore) دی؟",
                    arabicPrompt = "Omnivore",
                    options = listOf("Lion (شیر)", "Cow (گائے)", "Human / Bear (انسان اور ریچھ)", "Sheep (بھیڑ)"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "How do green plants make their own food?",
                    questionUr = "سبز پودے اپنی خوراک کیسے تیار کرتے ہیں؟",
                    questionPs = "شنه بوټي خپل خواړه څنګه جوړوي؟",
                    arabicPrompt = "Plant Food",
                    options = listOf("In presence of sunlight (سورج کی روشنی میں)", "By hunting other animals", "By buying from market", "At night only"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "What is a diet called that contains all necessary food groups in right proportions?",
                    questionUr = "وہ خوراک جس میں تمام غذائی اجزاء مناسب مقدار میں ہوں کیا کہلاتی ہے؟",
                    questionPs = "هغه خواړه چې د بدن ټولې اړتیاوې پوره کوي څه بلل کېږي؟",
                    arabicPrompt = "Diet",
                    options = listOf("Junk Food", "Sweet Diet", "Balanced Diet (متوازن غذا)", "Fast Food"),
                    correctIndex = 2
                )
            )
        ),

        // Stage 9: The Role of Government and Citizens (p. 63-70)
        Class3GKStage(
            id = 9,
            unitTitle = "باب 9 • Chapter 9",
            pageRange = "Pages 63–70",
            titleUr = "حکومت اور شہریوں کا کردار",
            titlePs = "د حکومت او وګړو رول",
            titleEn = "The Role of Government & Citizens",
            themeColor = Color(0xFF2563EB),
            secondaryColor = Color(0xFF1E3A8A),
            summaryUr = "معاشرے میں امن، قانون کی بالادستی اور بنیادی سہولیات کی فراہمی حکومت کی ذمہ داری ہے۔ بنیادی سہولیات میں تعلیم (سکول، کالج)، صحت (ہسپتال)، پینے کا صاف پانی، بجلی، پکی سڑکیں اور تحفظ (پولیس، عدالتیں) شامل ہیں۔ اچھے شہری اپنے فرائض نبھاتے ہیں: ٹیکس ادا کرنا، قوانین کی پابندی، صفائی کا خیال رکھنا، اور اپنی مدد آپ کے تحت محلے کی بہتری میں حصہ لینا۔",
            summaryPs = "په ټولنه کې د امن، قانون او لومړنیو اسانتیاوو برابرول د حکومت دنده ده. په اسانتیاوو کې ښوونځي، روغتونونه، پاکې اوبه، سړکونه او پولیس شامل دي. ښه وګړي قوانین مراعاتوي، مالیه ورکوي، چاپیریال پاک ساتي او د خپلو مرستو له لارې ټولنه ابادوي.",
            summaryEn = "A government maintains peace, establishes laws, and provides basic amenities: schools, hospitals, clean drinking water, electricity, carpeted roads, and security through police. Good citizens obey rules, respect public property, keep surroundings clean, and work on self-help basis.",
            promptUr = "حکومت کے فرائض اور شہریوں کی ذمہ داریوں کو ملائیں!",
            promptPs = "د حکومت دندې او د وګړو مسوولیتونه وصل کړئ!",
            promptEn = "Match government duties and civic responsibilities!",
            cards = listOf(
                Class3GKCard("Basic Facilities (بنیادی سہولیات)", "سکول، ہسپتال، پانی، بجلی اور سڑکیں", "ښوونځي، روغتونونه، اوبه او برېښنا", "Schools, hospitals, water, electricity", Color(0xFF2563EB)),
                Class3GKCard("Police & Security (پولیس و تحفظ)", "امن و امان اور شہریوں کی جان و مال کا تحفظ", "د امن ساتنه او د خلکو ژغورنه", "Law enforcement and public safety", Color(0xFF0F172A)),
                Class3GKCard("Citizen Duties (شہری کے فرائض)", "قوانین کی پاسداری اور صفائی کا خیال رکھنا", "د قوانینو درناوی او د پاکۍ ساتل", "Obeying laws and keeping city clean", Color(0xFF16A34A)),
                Class3GKCard("Self Help (اپنی مدد آپ)", "محلے کی صفائی اور پودے لگانے میں مل کر کام کرنا", "په کلي کې د ګډ کار او مرستې روحیه", "Community service on self-help basis", Color(0xFFD97706)),
                Class3GKCard("Tax & Public Funds (ٹیکس کا نظام)", "عوامی سہولیات اور ترقی کے لیے فنڈز", "د هېواد د پرمختګ لپاره مالیه", "Funds for public welfare and development", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "Why does the government establish educational institutions (schools & colleges)?",
                    questionUr = "حکومت تعلیمی ادارے (سکول اور کالج) کیوں قائم کرتی ہے؟",
                    questionPs = "حکومت ښوونځي او کالجونه د څه لپاره جوړوي؟",
                    arabicPrompt = "Education",
                    options = listOf("To educate citizens and build character (تعلیم و تربیت)", "Only for sports", "To pass free time", "None"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "Which department is primarily responsible for maintaining law and order in the city?",
                    questionUr = "شہر میں امن و امان اور قانون قائم رکھنا کس ادارے کی ذمہ داری ہے؟",
                    questionPs = "په ښار کې د قانون او امن ساتل د کومې ادارې دنده ده؟",
                    arabicPrompt = "Security",
                    options = listOf("Post Office", "Police Department (پولیس)", "Railway Station", "Zoo"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "What is an important duty of a responsible citizen?",
                    questionUr = "ایک ذمہ دار اور اچھے شہری کا اہم فرض کیا ہے؟",
                    questionPs = "د یو مسوول وګړي تر ټولو مهمه دنده څه ده؟",
                    arabicPrompt = "Citizen Duty",
                    options = listOf("Wasting electricity", "Throwing litter on roads", "Following laws & keeping city clean (قوانین پر عمل)", "Breaking traffic lights"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "What problems arise due to lack of a proper drainage and garbage disposal system?",
                    questionUr = "نکاسی آب اور کوڑا کرکٹ ٹھکانے لگانے کے مناسب نظام کے نہ ہونے سے کیا ہوتا ہے؟",
                    questionPs = "د اوبو ایستلو او کثافاتو د سم نظام نه شتون څه ستونزې راولاړوي؟",
                    arabicPrompt = "Sanitation",
                    options = listOf("Diseases spread & pollution increases", "Streets become beautiful", "Air becomes fresh", "None"),
                    correctIndex = 0
                )
            )
        ),

        // Stage 10: Working Out Disagreements (p. 71-79)
        Class3GKStage(
            id = 10,
            unitTitle = "باب 10 • Chapter 10",
            pageRange = "Pages 71–79",
            titleUr = "اختلافات کا پرامن حل",
            titlePs = "د شخړو او اختلافاتو سوله ییز حل",
            titleEn = "Working Out Disagreements Peacefully",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF134E4A),
            summaryUr = "انسانوں میں خیالات اور ترجیحات کے فرق سے اختلافات (Disagreements) پیدا ہو سکتے ہیں۔ غصے پر قابو پانا، دوسروں کا مؤقف غور سے سننا، غلطی پر معافی مانگنا اور دوسروں کو معاف کر دینا اعلیٰ اخلاق ہیں۔ اختلافات کو بات چیت اور بزرگوں، والدین یا اساتذہ کی مدد سے اچھے طریقے سے حل کرنا چاہیے تاکہ محبت اور امن قائم رہے۔",
            summaryPs = "په ژوند کې د نظرونو توپیر طبیعي دی چې شخړې رامنځته کوي. د غوسې کنټرولول، د بل خبرو ته غوږ نیول، د تېروتنې منل او بښنه کول د سولې او مینې سبب ګرځي. شخړې باید د خبرو اترو او د مشرانو یا ښوونکو په مرسته حل شي.",
            summaryEn = "Disagreements occur due to differing opinions. Resolving conflicts requires controlling anger, listening carefully, admitting mistakes, and forgiving others. Problems should be settled through peaceful dialogue and the guidance of parents, teachers, and elders.",
            promptUr = "اختلافات اور پرامن حل کے رویوں کو ملائیں!",
            promptPs = "د شخړو د هواري ښه چلندونه وصل کړئ!",
            promptEn = "Match conflict resolution behaviors and peaceful values!",
            cards = listOf(
                Class3GKCard("Anger Control (غصے پر قابو)", "غصہ ضبط کرنا اور پرسکون رہنا", "د غوسې زغمل او ارام پاتې کېدل", "Controlling anger in tense moments", Color(0xFF0D9488)),
                Class3GKCard("Listen Carefully (توجہ سے سننا)", "دوسرے کا نقطہ نظر احترام سے سننا", "د مقابل لوري خبرو ته په درناوي غوږ نیول", "Listening to other viewpoints respectfully", Color(0xFF2563EB)),
                Class3GKCard("Admit Mistake (غلطی تسلیم کرنا)", "اپنی غلطی کا احساس ہونے پر اعتراف کرنا", "کله چې تېروتنه وشي، په مړانه یې منل", "Admitting fault and saying sorry", Color(0xFF059669)),
                Class3GKCard("Forgiveness (معاف کر دینا)", "دوسروں کی خطاؤں کو درگزر کرنا", "د نورو تېروتنې بښل او سوله کول", "Forgiving others and making peace", Color(0xFFD97706)),
                Class3GKCard("Elder Advice (بزرگوں سے رہنمائی)", "اساتذہ اور والدین کی مدد سے صلح کرانا", "د مشرانو او ښوونکو په مرسته جوړجاړی", "Seeking guidance from elders/teachers", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "What should you do first when you realize that you were in the wrong during a dispute?",
                    questionUr = "جب آپ کو معلوم ہو جائے کہ آپ غلطی پر تھے تو آپ کو کیا کرنا چاہیے؟",
                    questionPs = "کله چې پوه شې ته په غلطه وې څه باید وکړې؟",
                    arabicPrompt = "Honesty",
                    options = listOf("Keep shouting", "Blame someone else", "Admit the mistake and apologize (غلطی مانیں)", "Fight more"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "What is the best way to resolve a disagreement between two classmates?",
                    questionUr = "دو ہم جماعت ساتھیوں کے درمیان جھگڑا سلجھانے کا سب سے بہترین طریقہ کیا ہے؟",
                    questionPs = "د دوو ټولګیوالو تر منځ د شخړې د حل غوره لاره څه ده؟",
                    arabicPrompt = "Peace",
                    options = listOf("Peaceful talk and teacher guidance (پرامن بات چیت)", "Punching each other", "Calling names", "Stopping talking forever"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "If someone makes an unintentional mistake against you, what should you practice?",
                    questionUr = "اگر کسی سے غیر ارادی غلطی ہو جائے تو آپ کو کس عمل کا مظاہرہ کرنا چاہیے؟",
                    questionPs = "که له چا بې اختیاره تېروتنه وشي، کوم اخلاق ښودل پکار دي؟",
                    arabicPrompt = "Forgiveness",
                    options = listOf("Take revenge", "Forgive them with kindness (معاف کر دینا)", "Insult them", "Break their pencil"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "What happens if community disagreements are left unresolved?",
                    questionUr = "اگر معاشرے میں اختلافات کو حل نہ کیا جائے تو کیا نقصان ہوتا ہے؟",
                    questionPs = "که په ټولنه کې شخړې حل نه شي نو څه به پېښ شي؟",
                    arabicPrompt = "Disagreement",
                    options = listOf("Hatred and bitterness increase (نفرت بڑھتی ہے)", "Peace flourishes", "Love spreads", "None"),
                    correctIndex = 0
                )
            )
        ),

        // Stage 11: Matter (p. 80-87)
        Class3GKStage(
            id = 11,
            unitTitle = "باب 11 • Chapter 11",
            pageRange = "Pages 80–87",
            titleUr = "مادہ اور اس کی حالتیں",
            titlePs = "ماده او د هغې حالتونه",
            titleEn = "Matter & Its Three States",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF0369A1),
            summaryUr = "ہر وہ چیز جو وزن رکھتی ہو اور جگہ گھیرتی ہو مادہ (Matter) کہلاتی ہے۔ مادے کی تین حالتیں ہیں: ٹھوس (Solid: مخصوص شکل اور حجم جیسے برف، کتاب، پتھر)، مائع (Liquid: مخصوص حجم لیکن شکل برتن کے مطابق جیسے پانی، دودھ، تیل)، اور گیس (Gas: نہ مخصوص شکل نہ حجم جیسے بھاپ، ہوا، آکسیجن)۔ حرارت دینے سے برف پانی بنتی ہے اور پانی بھاپ بن جاتا ہے۔",
            summaryPs = "هر هغه شی چې کتله او وزن لري او ځای نیسي ماده بلل کېږي. د مادې درې حالتونه دي: جامد (ټاکلی شکل او حجم لکه واوره، کتاب)، مایع (ټاکلی حجم خو بې شکله لکه اوبه، شیدې)، او ګاز (نه شکل لري نه حجم لکه بړاس، هوا). تودوخه واوره په اوبو او اوبه په بړاس بدلوي.",
            summaryEn = "Anything that has mass and occupies space is called Matter. Matter exists in 3 states: Solid (definite shape and volume, e.g., ice, stone), Liquid (definite volume, takes container's shape, e.g., water, milk), and Gas (no fixed shape or volume, e.g., steam, air). Heating changes ice into water and water into vapor.",
            promptUr = "مادے کی حالتوں اور ان کی خصوصیات کو ملائیں!",
            promptPs = "د مادې حالتونه او د هغوی ځانګړنې وصل کړئ!",
            promptEn = "Match states of matter with their properties and examples!",
            cards = listOf(
                Class3GKCard("Solid (ٹھوس)", "مخصوص شکل اور حجم (برف، کتاب، لکڑی، پتھر)", "ټاکلی شکل او حجم لري (واوره، کتاب)", "Definite shape and volume (ice, rock)", Color(0xFF0284C7)),
                Class3GKCard("Liquid (مائع)", "مخصوص حجم، برتن کی شکل اختیار کرتا ہے (پانی)", "ټاکلی حجم لري، د لوښي بڼه اخلي (اوبه)", "Fixed volume, flows (water, milk)", Color(0xFF059669)),
                Class3GKCard("Gas (گیس)", "نہ مخصوص شکل نہ حجم، فضا میں پھیل جاتی ہے (بھاپ)", "نه ټاکلی شکل لري نه حجم (بړاس، هوا)", "No fixed shape or volume (steam, air)", Color(0xFF7C3AED)),
                Class3GKCard("Melting (پگھلنا)", "حرارت سے برف کا پانی میں تبدیل ہونا", "د تودوخې له امله د واورې ویلې کېدل", "Ice turning into water with heat", Color(0xFFEA580C)),
                Class3GKCard("Evaporation (بخارات بننا)", "پانی کا ابل کر گیس (بھاپ) بننا", "د اوبو بړاس کېدل", "Water boiling into vapor gas", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "What is anything called that has mass and occupies space?",
                    questionUr = "ہر وہ چیز جو وزن رکھتی ہو اور جگہ گھیرتی ہو کیا کہلاتی ہے؟",
                    questionPs = "هر هغه شی چې وزن لري او ځای نیسي څه بلل کېږي؟",
                    arabicPrompt = "Matter Definition",
                    options = listOf("Energy", "Matter (مادہ)", "Vacuum", "Shadow"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "Water vapor and air are in which state of matter?",
                    questionUr = "پانی کی بھاپ (واٹر ویپر) اور ہوا مادے کی کس حالت میں ہیں؟",
                    questionPs = "د اوبو بړاس او هوا د مادې په کوم حالت کې دي؟",
                    arabicPrompt = "Vapor State",
                    options = listOf("Solid", "Liquid", "Gas (گیس)", "Plasma"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "Which state of matter has a fixed volume but takes the shape of its container?",
                    questionUr = "مادے کی کون سی حالت مخصوص حجم رکھتی ہے لیکن برتن کی شکل اختیار کرتی ہے؟",
                    questionPs = "د مادې کوم حالت ټاکلی حجم لري خو د لوښي بڼه اخلي؟",
                    arabicPrompt = "Liquid State",
                    options = listOf("Liquid (مائع)", "Solid", "Gas", "Vapor"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "What happens to ice when temperature increases (heat is added)?",
                    questionUr = "درجہ حرارت بڑھنے (گرمی دینے) پر برف کس چیز میں تبدیل ہو جاتی ہے؟",
                    questionPs = "د تودوخې په زیاتېدو سره واوره په څه بدلېږي؟",
                    arabicPrompt = "State Change",
                    options = listOf("Stone", "Water (پانی)", "Gas directly", "Wood"),
                    correctIndex = 1
                )
            )
        ),

        // Stage 12: Energy and Its Sources (p. 88-94)
        Class3GKStage(
            id = 12,
            unitTitle = "باب 12 • Chapter 12",
            pageRange = "Pages 88–94",
            titleUr = "توانائی اور اس کے ذرائع",
            titlePs = "انرژي او د هغې سرچینې",
            titleEn = "Energy & Its Sources",
            themeColor = Color(0xFFF59E0B),
            secondaryColor = Color(0xFFB45309),
            summaryUr = "کام کرنے کی صلاحیت کو توانائی (Energy) کہتے ہیں۔ سورج روشنی اور حرارت کا سب سے بڑا قدرتی ذریعہ ہے جس سے شمسی توانائی (Solar Energy) ملتی ہے۔ توانائی کے دیگر اہم ذرائع: پانی (ڈیم بنا کر بجلی)، قدرتی گیس (کھانا پکانا، گاڑیاں)، تیل اور پیٹرول (ٹرانسپورٹ)، اور کوئلہ ہیں۔ توانائی کے بیشتر قدرتی ذخائر محدود ہیں، اس لیے بجلی اور گیس کا محتاط استعمال ضروری ہے۔",
            summaryPs = "د کار کولو وړتیا ته انرژي وایي. لمر د رڼا او تودوخې تر ټولو لویه طبیعي سرچینه ده (لمریزه انرژي). نورې سرچینې: اوبه (ډیمونه او برېښنا)، طبیعي ګاز (پخلی، موټر)، تیل او ډبرسکاره دي. دا زېرمې محدودې دي نو باید په احتیاط وکارول شي.",
            summaryEn = "Energy is the ability to do work. The Sun is the greatest natural source of light and heat (Solar energy). Other major sources include Water (hydroelectricity from dams), Natural gas (cooking and heating), Oil/Petrol (transportation), and Coal. Energy resources are limited, so avoid wasting power.",
            promptUr = "توانائی کے ذرائع اور ان کے استعمال کو ملائیں!",
            promptPs = "د انرژۍ سرچینې او د کارولو برخې وصل کړئ!",
            promptEn = "Match energy sources with their domestic and industrial uses!",
            cards = listOf(
                Class3GKCard("The Sun (سورج)", "روشنی اور حرارت کا سب سے بڑا قدرتی ذریعہ", "د رڼا او تودوخې تر ټولو لویه سرچینه", "Greatest source of heat and light", Color(0xFFF59E0B)),
                Class3GKCard("Hydroelectricity (پن بجلی)", "دریاؤں پر ڈیم بنا کر پانی سے پیدا کی جاتی ہے", "پر سیندونو د بندونو په جوړولو برېښنا", "Generated by building dams on rivers", Color(0xFF0284C7)),
                Class3GKCard("Natural Gas (سوئی گیس)", "کھانا پکانے، ہیٹر اور گاڑیوں (سی این جی) کے لیے", "د پخلي، تودوخې او موټرو لپاره ګاز", "Used for cooking, heating, vehicles", Color(0xFF16A34A)),
                Class3GKCard("Petroleum & Oil (تیل)", "گاڑیوں، ہوائی جہازوں اور جنریٹروں کا ایندھن", "د موټرو او الوتکو لپاره تیل", "Fuel for transport and engines", Color(0xFF7C3AED)),
                Class3GKCard("Conservation (بچت)", "بجلی اور گیس کی غیر ضروری کھپت روکنا", "د برېښنا او ګاز له بې ځایه لګښت ډډه", "Conserving limited energy fuels", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "What is the greatest natural source of light and heat on Earth?",
                    questionUr = "زمین پر روشنی اور حرارت کا سب سے بڑا قدرتی ذریعہ کون سا ہے؟",
                    questionPs = "پر ځمکه د رڼا او تودوخې تر ټولو لویه طبیعي سرچینه څه ده؟",
                    arabicPrompt = "Greatest Source",
                    options = listOf("Moon", "The Sun (سورج)", "Candle", "Electric Bulb"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "How is hydroelectricity produced in Pakistan?",
                    questionUr = "پاکستان میں پن بجلی کیسے پیدا کی جاتی ہے؟",
                    questionPs = "په پاکستان کې د اوبو برېښنا څنګه تولیدیږي؟",
                    arabicPrompt = "Dams",
                    options = listOf("By building dams on rivers (دریاؤں پر ڈیم بنا کر)", "By burning plastic", "From deep caves", "Using wind alone"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "What do living things need to play, write, work, and move?",
                    questionUr = "جانداروں کو کھیلنے، لکھنے، کام کرنے اور حرکت کے لیے کس چیز کی ضرورت ہوتی ہے؟",
                    questionPs = "ژوي د کار، لوبې او حرکت لپاره څه شي ته اړتیا لري؟",
                    arabicPrompt = "Energy",
                    options = listOf("Shadow", "Energy (توانائی)", "Cold", "Darkness"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "Why must we use electricity and gas strictly according to need?",
                    questionUr = "ہمیں بجلی اور گیس صرف ضرورت کے مطابق کیوں استعمال کرنی چاہیے؟",
                    questionPs = "موږ ولې باید برېښنا او ګاز د اړتیا سره سم وکاروو؟",
                    arabicPrompt = "Conservation",
                    options = listOf("Because fuels are limited (وسائل محدود ہیں)", "Because they are bad", "They never finish", "None"),
                    correctIndex = 0
                )
            )
        ),

        // Stage 13: Changing World (p. 95-100)
        Class3GKStage(
            id = 13,
            unitTitle = "باب 13 • Chapter 13",
            pageRange = "Pages 95–100",
            titleUr = "بدلتی ہوئی دنیا",
            titlePs = "بدلېدونکې نړۍ",
            titleEn = "Changing World Over Time",
            themeColor = Color(0xFF059669),
            secondaryColor = Color(0xFF064E3B),
            summaryUr = "قدیم دور کے انسان کی زندگی آج سے بالکل مختلف اور مشکل تھی۔ قدیم لوگ غاروں میں رہتے تھے، پتھر کے اوزار بناتے تھے، اور جانوروں کی کھال پہنتے تھے۔ قدیم دور کی سب سے انقلابی ایجاد پہیہ (Wheel) تھی جس نے سفر اور بوجھ اٹھانا آسان کیا۔ قدیم دور کی معلومات اور نوادرات عجائب گھر (Museum) میں محفوظ کیے جاتے ہیں۔ آج اسکول، سواریاں اور مواصلات جدید ہو چکے ہیں۔",
            summaryPs = "په پخوانیو زمانو کې د انسان ژوند ډېر ستونزمن و. خلکو په غارونو کې ژوند کاوه، د ډبرو وسایل یې کارول او د ښکار پر غوښو پایېدل. د لرغونې زمانې تر ټولو ستر اختراع څرخ (Wheel) و چې بار وړل یې اسانه کړل. لرغوني توکي په موزیم کې ساتل کېږي.",
            summaryEn = "Ancient people lived in caves, used stone tools, wore animal skins, and led difficult lives. The most important invention of ancient times was the wheel, which revolutionized transport. Today, modern houses, schools, and transport exist. Artifacts of ancient times are preserved in Museums.",
            promptUr = "قدیم اور جدید دور کے فرق اور ایجادات کو ملائیں!",
            promptPs = "د پخوانۍ او اوسنۍ زمانې بدلونونه وصل کړئ!",
            promptEn = "Match ancient living conditions with modern developments!",
            cards = listOf(
                Class3GKCard("Ancient Shelter (قدیم رہائش)", "قدیم انسان غاروں (Caves) میں رہتے تھے", "پخوانیو خلکو په غارونو کې ژوند کاوه", "Living in natural caves", Color(0xFF78350F)),
                Class3GKCard("Invention of Wheel (پہیہ)", "قدیم دور کی سب سے عظیم ایجاد", "د لرغونې دورې تر ټولو مهمه اختراع", "Greatest ancient invention", Color(0xFFD97706)),
                Class3GKCard("Museum (عجائب گھر)", "قدیم نوادرات اور تاریخ کی معلومات کا ذریعہ", "د پخوانیو زمانو د اثارو د ساتنې ځای", "Best source of ancient information", Color(0xFF059669)),
                Class3GKCard("Stone Tools (پتھر کے اوزار)", "شکار اور دفاع کے لیے پتھر کے ہتھیار", "د ښکار لپاره د ډبرو وسایل", "Flint and stone hunting tools", Color(0xFF475569)),
                Class3GKCard("Modern Transport (جدید سواریاں)", "ٹرین، گاڑیاں، ہوائی جہاز", "اورګاډي، موټر او الوتکې", "High-speed trains, cars, airplanes", Color(0xFF2563EB))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "What is the best place to see historical artifacts and learn about ancient times?",
                    questionUr = "قدیم دور کے نوادرات دیکھنے اور معلومات حاصل کرنے کا بہترین ذریعہ کیا ہے؟",
                    questionPs = "د لرغونو زمانو د معلوماتو ترلاسه کولو تر ټولو غوره ځای کوم دی؟",
                    arabicPrompt = "Museum",
                    options = listOf("Market (بازار)", "Museum (عجائب گھر)", "Zoo (چڑیا گھر)", "Cinema"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "Where did ancient humans take shelter and live before houses were built?",
                    questionUr = "مکانات بننے سے پہلے قدیم دور کے انسان کہاں رہتے تھے؟",
                    questionPs = "د کورونو تر جوړېدو وړاندې لرغونو خلکو چېرته ژوند کاوه؟",
                    arabicPrompt = "Cave",
                    options = listOf("Cemented flats", "In caves (غاروں میں)", "Wooden castles", "Glass buildings"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "Which was the most revolutionary invention of ancient times?",
                    questionUr = "قدیم دور کی سب سے اہم اور انقلابی ایجاد کون سی تھی؟",
                    questionPs = "د لرغونې زمانې تر ټولو مهمه اختراع کومه وه؟",
                    arabicPrompt = "Wheel",
                    options = listOf("Train", "Computer", "Wheel (پہیہ)", "Smartphone"),
                    correctIndex = 2
                ),
                NazeraQuizQuestion(
                    questionEn = "How was the life of human beings in ancient times compared to today?",
                    questionUr = "آج کے مقابلے میں قدیم دور کے انسان کی زندگی کیسی تھی؟",
                    questionPs = "د نن ورځې په پرتله د لرغونو انسانانو ژوند څنګه و؟",
                    arabicPrompt = "Life",
                    options = listOf("Comfortable and luxurious", "Very difficult (سخت اور مشکل)", "Full of electricity", "Fast and easy"),
                    correctIndex = 1
                )
            )
        ),

        // Stage 14: Inventions (p. 101-106)
        Class3GKStage(
            id = 14,
            unitTitle = "باب 14 • Chapter 14",
            pageRange = "Pages 101–106",
            titleUr = "ایجادات اور انسانی ترقی",
            titlePs = "اختراعات او د ژوند اسانتیاوې",
            titleEn = "Inventions & Scientific Progress",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            summaryUr = "ایجاد (Invention) نئی چیز بنانے کو کہتے ہیں اور بنانے والے کو موجد (Inventor) کہتے ہیں۔ ایجادات نے انسانی زندگی کو بے حد آسان اور تیز رفتار بنا دیا ہے۔ کمپیوٹر اور انٹرنیٹ (Internet) سے پوری دنیا سے لمحوں میں معلومات حاصل ہوتی ہیں۔ ہوائی جہاز (Aeroplane) دنوں کے سفر کو گھنٹوں میں بدل دیتا ہے، اور موبائل فون سے دنیا کے کسی بھی کونے میں فوری رابطہ ممکن ہو گیا ہے۔",
            summaryPs = "د نوي شی جوړولو ته اختراع او جوړوونکي ته یې مخترع وایي. اختراعاتو د انسان ژوند اسانه کړی دی. کمپیوټر او انټرنېټ معلومات په شېبو کې رسوي. الوتکه د ورځو سفر په ساعتونو بدلوي او مبایل فون د نړۍ له هر ګوټ سره سملاسي اړیکه ټینګوي.",
            summaryEn = "An invention is a newly created device or method, and its creator is an inventor. Inventions have made life easier and faster. Computers and the Internet allow instant access to global information. Aeroplanes turn journeys of days into hours, and mobile phones enable worldwide real-time communication.",
            promptUr = "ایجادات اور ان کے فوائد کو درست جوڑوں سے ملائیں!",
            promptPs = "اختراعات او د هغوی ګټې سره وصل کړئ!",
            promptEn = "Match modern inventions with how they help humanity!",
            cards = listOf(
                Class3GKCard("Internet (انٹرنیٹ)", "گھر بیٹھے دنیا بھر کی معلومات کا فوری حصول", "په کور کې د نړۍ د ټولو معلوماتو سملاسي ترلاسه کول", "Instant global information at home", Color(0xFF7C3AED)),
                Class3GKCard("Aeroplane (ہوائی جہاز)", "دنوں اور مہینوں کے سفر گھنٹوں میں مکمل", "د ورځو او میاشتو سفر په ساعتونو کې", "Traveling in hours instead of days", Color(0xFF0284C7)),
                Class3GKCard("Mobile Phone (موبائل فون)", "دنیا بھر میں فوری صوتی و تصویری رابطہ", "له هر ځای سره سملاسي اړیکه", "Instant global communication anywhere", Color(0xFF059669)),
                Class3GKCard("Computer (کمپیوٹر)", "حساب کتاب، تعلیم اور ریکارڈ کا انتظام", "د معلوماتو او زده کړو پرمختللی ماشین", "High-speed data processing & learning", Color(0xFFD97706)),
                Class3GKCard("Inventor (موجد)", "وہ شخص جو نئی کارآمد چیز ایجاد کرے", "هغه څوک چې نوې ګټوره وسیله اختراع کړي", "Person who creates a new useful device", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "What is a person called who invents a new machine or device?",
                    questionUr = "وہ شخص کیا کہلاتا ہے جو کوئی نئی چیز ایجاد کرتا ہے؟",
                    questionPs = "هغه څوک چې نوی شی اختراع کوي څه بلل کېږي؟",
                    arabicPrompt = "Inventor",
                    options = listOf("Doctor", "Inventor (موجد)", "Driver", "Farmer"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "Which invention connects millions of computers and provides information on any topic?",
                    questionUr = "کون سی ایجاد دنیا بھر کو جوڑتی ہے اور کسی بھی موضوع پر معلومات دیتی ہے؟",
                    questionPs = "کومه اختراع ټوله نړۍ تړي او په هر موضوع معلومات ورکوي؟",
                    arabicPrompt = "Internet",
                    options = listOf("Internet (انٹرنیٹ)", "Bicycle", "Typewriter", "Lantern"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "Which modern transport invention completed long travel in hours instead of days?",
                    questionUr = "کس سواری نے طویل سفر دنوں کی بجائے گھنٹوں میں ممکن بنا دیا؟",
                    questionPs = "کومې ترانسپورتي اختراع اوږد سفر په ساعتونو کې شونی کړ؟",
                    arabicPrompt = "Aeroplane",
                    options = listOf("Bullock cart", "Aeroplane (ہوائی جہاز)", "Bicycle", "Rowboat"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "How has human life changed due to scientific inventions?",
                    questionUr = "سائنسی ایجادات کی بدولت انسانی زندگی کیسی ہو گئی ہے؟",
                    questionPs = "د علمي اختراعاتو له امله د انسان ژوند څنګه شوی؟",
                    arabicPrompt = "Progress",
                    options = listOf("Much easier and faster (آسان اور تیز رفتار)", "More dangerous and slow", "Impossible to live", "No change"),
                    correctIndex = 0
                )
            )
        ),

        // Stage 15: Force and Machines (p. 107-115)
        Class3GKStage(
            id = 15,
            unitTitle = "باب 15 • Chapter 15",
            pageRange = "Pages 107–115",
            titleUr = "قوت اور سادہ مشینیں",
            titlePs = "قوت او ساده ماشینونه",
            titleEn = "Force & Simple Machines",
            themeColor = Color(0xFFDC2626),
            secondaryColor = Color(0xFF991B1B),
            summaryUr = "قوت (Force) کھینچنے یا دھکیلنے کا عمل ہے جو چیزوں کو حرکت دیتی ہے یا روکتی ہے۔ اوزار اور سادہ مشینیں (Simple Machines) انسانی کام کو آسان، تیز اور محفوظ بناتی ہیں۔ سادہ مشینوں کی اقسام: لیور (Lever: راڈ جو وزن اٹھاتی ہے جیسے قینچی، سیسا)، ڈھلوان سطح (Inclined Plane: ڈھلوان تختہ جس پر بھاری وزن آسانی سے چڑھے)، گھرنی (Pulley: رسی اور پہیہ جس سے کنویں سے بالٹی یا وزن اوپر کھینچا جائے)، اور پہیہ و ایکسل (Wheel & Axle: گاڑی کا پہیہ)۔",
            summaryPs = "قوت د راښکلو یا ټېل وهلو عمل دی چې شیان خوځوي یا دروي. ساده ماشینونه کار اسانه کوي. ډولونه: لیور (راډ چې وزن پورته کوي)، کږه شوې تخته (Inclined Plane چې درانده شیان پرې خیژول کېږي)، څرخي یا پولي (Pulley د رسۍ او څرخ په مرسته د وزن پورته کول)، او څرخ او محور (Wheel & Axle).",
            summaryEn = "A force is a push or a pull that can move, stop, or change an object's direction. Tools and simple machines make work easier, faster, and safer. Forms of simple machines: Lever (a rigid rod to lift loads like a see-saw), Inclined Plane (a slanted slope to roll heavy loads), Pulley (grooved wheel and rope to lift buckets from wells), and Wheel & Axle.",
            promptUr = "سادہ مشینوں کی اقسام اور ان کے کام کو ملائیں!",
            promptPs = "د ساده ماشینونو ډولونه او د هغوی کار وصل کړئ!",
            promptEn = "Match types of simple machines with their real-world uses!",
            cards = listOf(
                Class3GKCard("Pulley (پُلی / گھرنی)", "پہیہ اور رسی جس سے کنویں سے پانی کا ڈول کھینچتے ہیں", "څرخ او رسۍ چې له څاه څخه پرې اوبه راکاږي", "Grooved wheel & rope lifting heavy loads", Color(0xFFDC2626)),
                Class3GKCard("Lever (لیور)", "مضبوط سلاخ جو بوجھ اٹھانے میں مدد دے (قینچی، سیسا)", "یو قوي راډ چې د بار په پورته کولو کې مرسته کوي", "Rigid rod pivoting on a point (see-saw)", Color(0xFF2563EB)),
                Class3GKCard("Inclined Plane (ڈھلوان سطح)", "ڈھلوان تختہ جس پر بھاری سامان گاڑی پر چڑھایا جائے", "کږه تخته چې درانه شیان پرې په اسانۍ خېژي", "Sloped surface for rolling heavy barrels", Color(0xFF16A34A)),
                Class3GKCard("Wheel & Axle (پہیہ و ایکسل)", "پہیے کے مرکز میں راڈ (گاڑی اور بائیسکل)", "د موټر او بایسکل څرخ او چورلیز", "Axle attached to a wheel (steering, cart)", Color(0xFFD97706)),
                Class3GKCard("Force: Push & Pull (دھکیلنا اور کھینچنا)", "قوت کسی جسم کو حرکت دیتی ہے یا روکتی ہے", "هغه زور چې شیان حرکت ته راولي", "Push or pull acting on an object", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "Which simple machine consists of a grooved wheel with a rope to lift heavy loads up and down?",
                    questionUr = "وہ کون سی سادہ مشین ہے جو رسی اور پہیے پر مشتمل ہوتی ہے اور بوجھ اوپر نیچے کرتی ہے؟",
                    questionPs = "کوم ساده ماشین له څرخ او رسۍ جوړ دی او بار پورته او ښکته کوي؟",
                    arabicPrompt = "Pulley",
                    options = listOf("Pulley (پلی / گھرنی)", "Screw", "Wedge", "Scissors"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "A rigid rod that turns around a fixed point to make lifting work easier is called:",
                    questionUr = "وہ سادہ مشین جو ایک راڈ پر مشتمل ہو اور بوجھ اٹھانے میں کام آئے کیا کہلاتی ہے؟",
                    questionPs = "هغه ساده ماشین چې له یو راډ څخه جوړ وي څه بلل کېږي؟",
                    arabicPrompt = "Lever",
                    options = listOf("Lever (لیور)", "Pulley", "Inclined Plane", "Wheel & Axle"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "What is used to easily load heavy oil drums into the back of a truck?",
                    questionUr = "بھاری ڈرم ٹرک میں آسانی سے چڑھانے کے لیے کس سادہ مشین کا تختہ استعمال ہوتا ہے؟",
                    questionPs = "په ټرک کې د درنو بېلرونو د بارولو لپاره کومه تخته کارول کېږي؟",
                    arabicPrompt = "Inclined Plane",
                    options = listOf("Inclined Plane (ڈھلوان سطح)", "Scissors", "Knife", "Hammer"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "What tools did early humans use in ancient times before metals were discovered?",
                    questionUr = "دھاتوں کی دریافت سے پہلے قدیم دور میں انسان کس چیز کے اوزار اور ہتھیار استعمال کرتا تھا؟",
                    questionPs = "د فلزاتو تر موندلو وړاندې لرغونو خلکو د څه شي وسایل کارول؟",
                    arabicPrompt = "Stone Tools",
                    options = listOf("Plastic", "Stone (پتھر کے اوزار)", "Copper", "Steel"),
                    correctIndex = 1
                )
            )
        ),

        // Stage 16: Safety (p. 116-122)
        Class3GKStage(
            id = 16,
            unitTitle = "باب 16 • Chapter 16",
            pageRange = "Pages 116–122",
            titleUr = "حفاظت اور احتیاطی تدابیر",
            titlePs = "خوندیتوب او احتیاطي تدابیر",
            titleEn = "Safety & Disaster Precautions",
            themeColor = Color(0xFFE11D48),
            secondaryColor = Color(0xFF9F1239),
            summaryUr = "ذاتی حفاظت (Personal Safety) ہر انسان کے لیے اولین ترجیح ہے۔ بجلی کے آلات ننگے پیر یا گیلے ہاتھوں سے مت چھوئیں۔ تیز دھار اوزار (چھری، قینچی) احتیاط سے استعمال کریں۔ ماچس اور آگ سے دور رہیں۔ قدرتی آفات (سیلاب، زلزلہ، آگ) انسان روک نہیں سکتا لیکن پیشگی تدابیر سے جانی نقصان بچایا جا سکتا ہے۔ زلزلے میں مضبوط میز کے نیچے جائیں اور کھڑکیوں سے دور رہیں۔ حادثات میں دوسروں کی مدد کریں۔",
            summaryPs = "شخصي خوندیتوب تر ټولو مهم دی. برېښنایي وسایل په لندو لاسونو مه لمسوئ. چاړه او تېره وسایل په احتیاط وکاروئ. له اوره لرې اوسئ. طبیعي پېښې لکه زلزله او سېلاب انسان نشي درولی خو د احتیاط له لارې ځان او نور ژغورلی شي. په زلزله کې د میز لاندې پټ شئ او په مصیبت کې د نورو مرسته وکړئ.",
            summaryEn = "Personal safety prevents accidents. Never touch electric switches with wet hands or bare feet. Handle sharp tools (knives, scissors) carefully. Humans cannot prevent natural disasters (earthquakes, floods, storms), but precaution saves lives: drop and cover under a sturdy table during tremors, move to safe high ground during floods, and help victims.",
            promptUr = "حفاظتی تدابیر اور ایمرجنسی اصولوں کو ملائیں!",
            promptPs = "د خوندیتوب او بېړنیو حالاتو اصول وصل کړئ!",
            promptEn = "Match personal safety rules and disaster precautions!",
            cards = listOf(
                Class3GKCard("Electrical Safety (بجلی سے بچاؤ)", "گیلے ہاتھوں یا ننگے پیر بجلی کے سوئچ مت چھوئیں", "په لندو لاسونو برېښنا مه لمسوئ", "Never touch switches with wet hands", Color(0xFFE11D48)),
                Class3GKCard("Earthquake Safety (زلزلے کے وقت)", "مضبوط میز کے نیچے پناہ لیں اور سر کو بچائیں", "د قوي میز لاندې کښېنئ او سر وساتئ", "Drop, cover, and hold under sturdy table", Color(0xFFD97706)),
                Class3GKCard("Sharp Tools (تیز دھار اوزار)", "چھری، قینچی اور شیشہ احتیاط سے استعمال کریں", "چاړه او تېره وسایل په احتیاط وکاروئ", "Handle knives, blades & glass safely", Color(0xFF475569)),
                Class3GKCard("Flood Safety (سیلاب سے بچاؤ)", "بلند اور محفوظ مقامات کی طرف منتقل ہوں", "لوړو او خوندي ځایونو ته ولاړ شئ", "Move to high, safe ground during floods", Color(0xFF0284C7)),
                Class3GKCard("Helping Others (دوسروں کی مدد)", "حادثات میں زخمیوں کو ریسکیو ٹیم تک پہنچانا", "په پېښو کې له نورو سره مرسته کول", "Assisting others and calling rescue team", Color(0xFF16A34A))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    questionEn = "Why must you never touch electrical appliances or switches with wet hands?",
                    questionUr = "گیلے ہاتھوں سے بجلی کے آلات یا سوئچ کیوں نہیں چھونے چاہئیں؟",
                    questionPs = "ولې باید په لندو لاسونو د برېښنا تڼۍ ونه لمسوئ؟",
                    arabicPrompt = "Electric Shock",
                    options = listOf("Risk of electric shock (بجلی کے کرنٹ کا خطرہ)", "Hands become dirty", "Switch breaks down", "None"),
                    correctIndex = 0
                ),
                NazeraQuizQuestion(
                    questionEn = "What is the best immediate action during an earthquake inside a classroom or home?",
                    questionUr = "کمرہ جماعت یا گھر کے اندر زلزلے کے دوران فوری طور پر کیا کرنا چاہیے؟",
                    questionPs = "د زلزلې پر مهال په خونه کې تر ټولو غوره کار څه دی؟",
                    arabicPrompt = "Earthquake",
                    options = listOf("Jump from roof", "Take cover under a sturdy table & protect head (میز کے نیچے پناہ لیں)", "Stand near glass window", "Turn on TV"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "Can human beings stop or prevent natural disasters like earthquakes and storms?",
                    questionUr = "کیا انسان زلزلے اور طوفان جیسی قدرتی آفات کو روک سکتا ہے؟",
                    questionPs = "ایا انسان د زلزلې او سېلاب په څېر طبیعي پېښې درولی شي؟",
                    arabicPrompt = "Disasters",
                    options = listOf("Yes easily", "No, humans can only take safety precautions (نہیں، صرف احتیاط کر سکتا ہے)", "Only in cities", "None"),
                    correctIndex = 1
                ),
                NazeraQuizQuestion(
                    questionEn = "What causes most domestic and road accidents?",
                    questionUr = "زیادہ تر گھریلو اور سڑک کے حادثات کس وجہ سے پیش آتے ہیں؟",
                    questionPs = "ډېری پېښې د څه شی له امله رامنځته کېږي؟",
                    arabicPrompt = "Carelessness",
                    options = listOf("Carelessness and negligence (لاپرواہی اور غلطیاں)", "Too much safety", "Following traffic rules", "None"),
                    correctIndex = 0
                )
            )
        )
    )
}
