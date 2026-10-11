package com.example.spacebookapp.ui.screens

import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color

enum class DrawingArtworkType {
    PAGE1_TRIANGLE_CAT,
    PAGE2_TRIANGLE_OVAL,
    PAGE3_SQUARE_OCTAGON,
    PAGE4_RAINBOW,
    PAGE5_SPARROW_BIRD,
    PAGE6_SHIP,
    PAGE7_ANGRY_BIRD,
    PAGE8_HONEY_BEE,
    PAGE9_CAP,
    PAGE10_TULIP,
    PAGE11_ANT,
    PAGE12_GOAT,
    PAGE13_UMBRELLA,
    PAGE14_PURSE,
    PAGE15_PINEAPPLE,
    PAGE16_PARROT,
    PAGE17_WATERMELON,
    PAGE18_FROCK,
    PAGE19_GRAPES,
    PAGE20_CAMEL,
    PAGE21_DUCK,
    PAGE22_SCISSOR,
    PAGE23_DONKEY,
    PAGE24_LADYBUG,
    PAGE25_SCENERY,
    PAGE26_PUPPY,
    PAGE27_SUNGLASS,
    PAGE28_FLOWER,
    PAGE29_BANANAS,
    PAGE30_STEP_BEAR,
    PAGE31_STEP_HOUSE,
    PAGE32_ORIGAMI_CAT
}

data class DrawingColorZone(
    val labelEn: String,
    val labelUr: String,
    val labelPs: String,
    val targetColor: Color,
    val colorNameEn: String,
    val centerNorm: Offset // normalized 0f..1f position on canvas for tap badge
)

data class DrawingLessonCard(
    val titleEn: String,
    val subEn: String,
    val descUr: String,
    val descPs: String,
    val badgeColor: Color
)

data class DrawingQuizQuestion(
    val questionEn: String,
    val questionUr: String,
    val questionPs: String,
    val options: List<String>,
    val correctIndex: Int
)

data class DrawingBookStage(
    val id: Int,
    val pageNumber: String,
    val unitTitle: String,
    val titleEn: String,
    val titleUr: String,
    val titlePs: String,
    val instructionEn: String,
    val instructionUr: String,
    val instructionPs: String,
    val themeColor: Color,
    val artworkType: DrawingArtworkType,
    val dotPathNorm: List<Offset>, // normalized 0..1 waypoints for dot-joining trace
    val colorZones: List<DrawingColorZone>,
    val lessons: List<DrawingLessonCard>,
    val quizQuestions: List<DrawingQuizQuestion>
)

object Class1DrawingData {

    private fun circleDots(cx: Float, cy: Float, rx: Float, ry: Float, count: Int = 14): List<Offset> {
        return (0..count).map { i ->
            val angle = (i.toFloat() / count) * (2f * Math.PI.toFloat()) - (Math.PI.toFloat() / 2f)
            Offset(cx + rx * kotlin.math.cos(angle), cy + ry * kotlin.math.sin(angle))
        }
    }

    private fun polygonDots(points: List<Offset>, stepsPerEdge: Int = 3): List<Offset> {
        val result = mutableListOf<Offset>()
        for (i in 0 until points.size - 1) {
            val a = points[i]
            val b = points[i + 1]
            for (s in 0 until stepsPerEdge) {
                val t = s.toFloat() / stepsPerEdge
                result.add(Offset(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t))
            }
        }
        result.add(points.last())
        return result
    }

    val stages: List<DrawingBookStage> = listOf(
        // PAGE 1: Triangle Cat
        DrawingBookStage(
            id = 1,
            pageNumber = "Page 1",
            unitTitle = "Shapes & Dots",
            titleEn = "Triangle Cat Shapes",
            titleUr = "تکون بلی کی اشکال",
            titlePs = "د مثلث پیشو بڼې",
            instructionEn = "Step 1: Drag your finger along the glowing dots to draw the Triangle Cat! Step 2: Tap each color bucket and tap the cat to paint!",
            instructionUr = "پہلے چمکتے نقطوں کو ملا کر تکون بلی بنائیں، پھر رنگ منتخب کر کے بلی میں رنگ بھریں!",
            instructionPs = "لومړی ځلیدونکي ټکي سره ونښلوئ ترڅو پیشو رسم کړئ، بیا رنګ غوره کړئ او پیشو رنګ کړئ!",
            themeColor = Color(0xFFFF7043),
            artworkType = DrawingArtworkType.PAGE1_TRIANGLE_CAT,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.50f, 0.42f), Offset(0.35f, 0.22f), Offset(0.65f, 0.22f), Offset(0.50f, 0.42f),
                    Offset(0.26f, 0.84f), Offset(0.74f, 0.84f), Offset(0.50f, 0.42f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Green Head", "سبز سر", "شنه سر", Color(0xFF66BB6A), "Green", Offset(0.50f, 0.28f)),
                DrawingColorZone("Pink Ears", "گلابی کان", "ګلابي غوږونه", Color(0xFFEC407A), "Pink", Offset(0.40f, 0.16f)),
                DrawingColorZone("Orange Body", "نارنجی جسم", "نارنجي بدن", Color(0xFFFF7043), "Orange", Offset(0.50f, 0.65f)),
                DrawingColorZone("Blue Tail", "نیلی دم", "شین لکۍ", Color(0xFF29B6F6), "Blue", Offset(0.78f, 0.72f))
            ),
            lessons = listOf(
                DrawingLessonCard("Triangle Head & Body", "The cat's head, ears, body, and eyes are all made from triangles!", "بلی کا سر، کان، جسم اور آنکھیں سب تکون (Triangles) سے بنے ہیں!", "د پیشو سر، غوږونه، بدن او سترګې ټول له مثلثونو څخه جوړ شوي دي!", Color(0xFFFF7043)),
                DrawingLessonCard("Bright Colours", "Use Green for the face, Pink for the ears, Orange for the body, and Blue for the tail.", "چہرے کے لیے سبز، کانوں کے لیے گلابی، جسم کے لیے نارنجی اور دم کے لیے نیلا رنگ استعمال کریں۔", "د مخ لپاره شین، د غوږونو لپاره ګلابي، د بدن لپاره نارنجي او د لکۍ لپاره اسماني رنګ وکاروئ.", Color(0xFF66BB6A))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("Which shape makes the cat's body on Page 1?", "صفحہ 1 پر بلی کا جسم کس شکل سے بنا ہے؟", "په ۱ مخ کې د پیشو بدن له کوم شکل څخه جوړ شوی دی؟", listOf("Triangle 🔺", "Circle ⭕", "Square 🟦"), 0),
                DrawingQuizQuestion("What colour is the cat's triangle head?", "بلی کے تکون سر کا رنگ کیا ہے؟", "د پیشو د مثلث سر رنګ څه دی؟", listOf("Green 🟢", "Black ⚫", "Purple 🟣"), 0)
            )
        ),

        // PAGE 2: Triangle & Oval
        DrawingBookStage(
            id = 2,
            pageNumber = "Page 2",
            unitTitle = "Shapes & Dots",
            titleEn = "Triangle & Oval Friends",
            titleUr = "تکون اور بیضوی دوست",
            titlePs = "مثلث او هګۍ شکله ملګري",
            instructionEn = "Join the dots to trace the Triangle and Oval characters, then colour them Orange and Red!",
            instructionUr = "نقطوں کو ملا کر تکون اور بیضوی شکلیں بنائیں، پھر ان میں نارنجی اور سرخ رنگ بھریں!",
            instructionPs = "ټکي سره ونښلوئ ترڅو مثلث او هګۍ بڼې رسم کړئ، بیا یې نارنجي او سور رنګ کړئ!",
            themeColor = Color(0xFFEF5350),
            artworkType = DrawingArtworkType.PAGE2_TRIANGLE_OVAL,
            dotPathNorm = polygonDots(
                listOf(Offset(0.32f, 0.22f), Offset(0.14f, 0.72f), Offset(0.50f, 0.72f), Offset(0.32f, 0.22f)), 4
            ) + circleDots(0.72f, 0.50f, 0.16f, 0.22f, 10),
            colorZones = listOf(
                DrawingColorZone("Orange Triangle", "نارنجی تکون", "نارنجي مثلث", Color(0xFFFF9800), "Orange", Offset(0.32f, 0.55f)),
                DrawingColorZone("Red Oval", "سرخ بیضوی", "سور هګۍ شکل", Color(0xFFE53935), "Red", Offset(0.72f, 0.54f)),
                DrawingColorZone("Blue Cap", "نیلی ٹوپی", "شنه خولۍ", Color(0xFF1E88E5), "Blue", Offset(0.72f, 0.25f))
            ),
            lessons = listOf(
                DrawingLessonCard("Triangle (3 Corners)", "A triangle has 3 straight sides and 3 corners. Colour it bright Orange!", "تکون کے 3 سیدھے کنارے اور 3 کونے ہوتے ہیں۔ اس میں شوخ نارنجی رنگ بھریں!", "مثلث ۳ مستقیمې خواوې او ۳ کونجونه لري. دا روښانه نارنجي رنګ کړئ!", Color(0xFFFF9800)),
                DrawingLessonCard("Oval / Circle", "An oval is smooth and curved with 0 corners. Colour it Red with a Blue cap!", "بیضوی شکل گول اور ہموار ہوتی ہے جس کا کوئی کونہ نہیں ہوتا۔", "هګۍ بڼه ګرده او هواره ده او هیڅ کونج نه لري.", Color(0xFFE53935))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("How many sides does the Orange Triangle have?", "نارنجی تکون کے کتنے کنارے ہیں؟", "نارنجي مثلث څو خواوې لري؟", listOf("3", "4", "8"), 0),
                DrawingQuizQuestion("What colour is the Oval character on Page 2?", "صفحہ 2 پر بیضوی کردار کا رنگ کیا ہے؟", "په ۲ مخ کې د هګۍ شکله کرکټر رنګ څه دی؟", listOf("Red 🔴", "Green 🟢", "Yellow 🟡"), 0)
            )
        ),

        // PAGE 3: Square & Octagon
        DrawingBookStage(
            id = 3,
            pageNumber = "Page 3",
            unitTitle = "Shapes & Dots",
            titleEn = "Square & Octagon Shapes",
            titleUr = "مربع اور مثمن اشکال",
            titlePs = "مربع او اته ضلعي بڼې",
            instructionEn = "Trace the 4-sided Square and 8-sided Octagon, then paint them Green and Blue!",
            instructionUr = "چوکور (مربع) اور آٹھ کونوں والی شکل کے نقطے ملائیں اور سبز و نیلا رنگ بھریں!",
            instructionPs = "د مربع او اته ضلعي ټکي سره ونښلوئ او شین او اسماني رنګ ورکړئ!",
            themeColor = Color(0xFF43A047),
            artworkType = DrawingArtworkType.PAGE3_SQUARE_OCTAGON,
            dotPathNorm = polygonDots(
                listOf(Offset(0.14f, 0.28f), Offset(0.46f, 0.28f), Offset(0.46f, 0.72f), Offset(0.14f, 0.72f), Offset(0.14f, 0.28f)), 3
            ) + circleDots(0.73f, 0.50f, 0.17f, 0.21f, 8),
            colorZones = listOf(
                DrawingColorZone("Green Square", "سبز مربع", "شنه مربع", Color(0xFF43A047), "Green", Offset(0.30f, 0.50f)),
                DrawingColorZone("Blue Octagon", "نیلا مثمن", "اسماني اته ضلعي", Color(0xFF039BE5), "Blue", Offset(0.73f, 0.50f))
            ),
            lessons = listOf(
                DrawingLessonCard("Green Square", "A square has 4 equal sides and 4 corners.", "مربع کے 4 برابر کنارے اور 4 کونے ہوتے ہیں۔", "مربع ۴ مساوي خواوې او ۴ کونجونه لري.", Color(0xFF43A047)),
                DrawingLessonCard("Blue Octagon", "An octagon has 8 straight sides! Colour it sky blue.", "مثمن (Octagon) کے 8 سیدھے کنارے ہوتے ہیں! اس میں نیلا رنگ بھریں۔", "اته ضلعي (Octagon) ۸ مستقیمې خواوې لري! دا اسماني رنګ کړئ.", Color(0xFF039BE5))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour is the Square character on Page 3?", "صفحہ 3 پر مربع شکل کا رنگ کیا ہے؟", "په ۳ مخ کې د مربع رنګ څه دی؟", listOf("Green 🟩", "Red 🟥", "Orange 🟧"), 0),
                DrawingQuizQuestion("How many sides does the Blue Octagon have?", "نیلے مثمن (Octagon) کے کتنے کنارے ہوتے ہیں؟", "اسماني اته ضلعي څو خواوې لري؟", listOf("8", "3", "5"), 0)
            )
        ),

        // PAGE 4: Colour the Rainbow
        DrawingBookStage(
            id = 4,
            pageNumber = "Page 4",
            unitTitle = "Nature Colours",
            titleEn = "Colour the Rainbow",
            titleUr = "قوس قزح میں رنگ بھریں",
            titlePs = "د بوډۍ ټال رنګ کړئ",
            instructionEn = "Trace the sweeping Rainbow arch across the sky, then paint the Rainbow bands, Sun, and Trees!",
            instructionUr = "آسمان پر قوس قزح کی کمان بنائیں اور اس کی پٹیوں، سورج اور درختوں میں رنگ بھریں!",
            instructionPs = "په اسمان کې د بوډۍ ټال قوس رسم کړئ او د هغې پټۍ، لمر او ونې رنګ کړئ!",
            themeColor = Color(0xFF8E24AA),
            artworkType = DrawingArtworkType.PAGE4_RAINBOW,
            dotPathNorm = (0..14).map { i ->
                val t = i / 14f
                val angle = Math.PI.toFloat() * (1f - t)
                Offset(0.50f + 0.36f * kotlin.math.cos(angle), 0.72f - 0.44f * kotlin.math.sin(angle))
            },
            colorZones = listOf(
                DrawingColorZone("Red Outer Band", "سرخ پٹی", "سره پټۍ", Color(0xFFE53935), "Red", Offset(0.50f, 0.25f)),
                DrawingColorZone("Yellow Middle Band", "پیلی پٹی", "ژېړه پټۍ", Color(0xFFFDD835), "Yellow", Offset(0.50f, 0.36f)),
                DrawingColorZone("Blue/Violet Inner Band", "نیلی/جامنی پٹی", "شنه/ارغواني پټۍ", Color(0xFF5E35B1), "Violet", Offset(0.50f, 0.47f)),
                DrawingColorZone("Green Trees", "سبز درخت", "شنې ونې", Color(0xFF43A047), "Green", Offset(0.24f, 0.76f))
            ),
            lessons = listOf(
                DrawingLessonCard("7 Rainbow Colours (VIBGYOR)", "A rainbow shines in the sky after rain with Red, Orange, Yellow, Green, Blue, Indigo, and Violet!", "بارش کے بعد آسمان پر قوس قزح کے 7 خوبصورت رنگ چمکتے ہیں!", "له باران وروسته په اسمان کې د بوډۍ ټال ۷ ښکلي رنګونه ځلیږي!", Color(0xFFE53935)),
                DrawingLessonCard("Sun, Clouds & Trees", "Fluffy white/blue clouds and green trees complete the sunny nature scene.", "بادل، چمکتا سورج اور ہرے بھرے درخت قدرتی منظر کو مکمل کرتے ہیں۔", "ورېځې، ځلیدونکی لمر او شنې ونې طبیعي منظره بشپړوي.", Color(0xFF43A047))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("How many colours are in a Rainbow?", "قوس قزح میں کتنے رنگ ہوتے ہیں؟", "د بوډۍ ټال څو رنګونه لري؟", listOf("7", "3", "10"), 0),
                DrawingQuizQuestion("Which colour is at the top of the Rainbow arch?", "قوس قزح کی سب سے اوپر والی پٹی کا رنگ کیا ہے؟", "د بوډۍ ټال ترټولو پورتنۍ پټۍ کوم رنګ لري؟", listOf("Red 🔴", "Black ⚫", "Brown 🟤"), 0)
            )
        ),

        // PAGE 5: Sparrow Bird
        DrawingBookStage(
            id = 5,
            pageNumber = "Page 5",
            unitTitle = "Birds & Animals",
            titleEn = "Colour the Bird",
            titleUr = "چڑیا میں رنگ بھریں",
            titlePs = "مرغۍ رنګ کړئ",
            instructionEn = "Join the dots around the cute Sparrow bird and colour its feathers Brown and beak Yellow!",
            instructionUr = "نقطوں کو ملا کر پیاری چڑیا بنائیں اور اس کے پروں میں بھورا اور چونچ میں پیلا رنگ بھریں!",
            instructionPs = "ټکي سره ونښلوئ ترڅو مرغۍ رسم کړئ او بڼکې یې نسواري او مښوکه یې ژېړه رنګ کړئ!",
            themeColor = Color(0xFF8D6E63),
            artworkType = DrawingArtworkType.PAGE5_SPARROW_BIRD,
            dotPathNorm = circleDots(0.50f, 0.50f, 0.28f, 0.24f, 16),
            colorZones = listOf(
                DrawingColorZone("Light Brown Body", "ہلکا بھورا جسم", "روښانه نسواري بدن", Color(0xFFA1887F), "Light Brown", Offset(0.48f, 0.56f)),
                DrawingColorZone("Dark Brown Wing", "گہرا بھورا پر", "تیاره نسواري وزر", Color(0xFF6D4C41), "Dark Brown", Offset(0.56f, 0.48f)),
                DrawingColorZone("Yellow Beak", "پیلی چونچ", "ژېړه مښوکه", Color(0xFFFBC02D), "Yellow", Offset(0.20f, 0.42f))
            ),
            lessons = listOf(
                DrawingLessonCard("Curved Bird Outline", "Trace smoothly around the head, wing, tail, and tummy of the little bird.", "چڑیا کے سر، پر، دم اور پیٹ کے گرد نقطوں کو نرمی سے ملائیں۔", "د مرغۍ د سر، وزر، لکۍ او خېټې شاوخوا ټکي په نرمۍ سره ونښلوئ.", Color(0xFF8D6E63)),
                DrawingLessonCard("Natural Feather Shades", "Use light brown for the body, dark brown for the wings, and yellow for the beak.", "جسم کے لیے ہلکا بھورا، پروں کے لیے گہرا بھورا اور چونچ کے لیے پیلا رنگ استعمال کریں۔", "د بدن لپاره روښانه نسواري، د وزرونو لپاره تیاره نسواري او د مښوکې لپاره ژېړ رنګ وکاروئ.", Color(0xFFFBC02D))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour are the bird's feathers on Page 5?", "صفحہ 5 پر چڑیا کے پروں کا رنگ کیا ہے؟", "په ۵ مخ کې د مرغۍ د بڼکو رنګ څه دی؟", listOf("Brown 🟤", "Purple 🟣", "Pink 🩷"), 0),
                DrawingQuizQuestion("What part of the bird is coloured Yellow?", "چڑیا کے کس حصے میں پیلا رنگ بھرا گیا ہے؟", "د مرغۍ کومه برخه ژېړ رنګ شوې ده؟", listOf("Beak & Feet", "Wings", "Tail"), 0)
            )
        ),

        // PAGE 6: Ship
        DrawingBookStage(
            id = 6,
            pageNumber = "Page 6",
            unitTitle = "Vehicles & Sea",
            titleEn = "Colour the Ship",
            titleUr = "بحری جہاز میں رنگ بھریں",
            titlePs = "کښتۍ رنګ کړئ",
            instructionEn = "Join the dots to draw the Sailboat Ship on the waves, then colour the sails, boat, and blue sea!",
            instructionUr = "نقطوں کو ملا کر بحری جہاز بنائیں، پھر بادبان، کشتی اور نیلے سمندر میں رنگ بھریں!",
            instructionPs = "ټکي سره ونښلوئ ترڅو کښتۍ رسم کړئ، بیا بادبان، کښتۍ او شین سمندر رنګ کړئ!",
            themeColor = Color(0xFF0288D1),
            artworkType = DrawingArtworkType.PAGE6_SHIP,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.48f, 0.14f), Offset(0.22f, 0.60f), Offset(0.76f, 0.60f), Offset(0.48f, 0.14f),
                    Offset(0.48f, 0.62f), Offset(0.18f, 0.62f), Offset(0.28f, 0.80f), Offset(0.72f, 0.80f), Offset(0.82f, 0.62f)
                ), 2
            ),
            colorZones = listOf(
                DrawingColorZone("Green Left Sail", "سبز بادبان", "شنه بادبان", Color(0xFF66BB6A), "Green", Offset(0.35f, 0.44f)),
                DrawingColorZone("Rainbow Striped Sail", "رنگین بادبان", "رنګین بادبان", Color(0xFFFF7043), "Orange/Red", Offset(0.60f, 0.44f)),
                DrawingColorZone("Brown Boat Hull", "بھوری کشتی", "نسواري کښتۍ", Color(0xFF8D6E63), "Brown", Offset(0.50f, 0.70f)),
                DrawingColorZone("Blue Ocean Waves", "نیلی لہریں", "شنې څپې", Color(0xFF29B6F6), "Blue", Offset(0.50f, 0.84f))
            ),
            lessons = listOf(
                DrawingLessonCard("Triangle Sails", "The ship's sails are shaped like tall triangles that catch the wind.", "جہاز کے بادبان لمبے تکون کی طرح ہیں جو ہوا کو پکڑتے ہیں۔", "د کښتۍ بادبانونه د لوړو مثلثونو په څېر دي چې باد نیسي.", Color(0xFF66BB6A)),
                DrawingLessonCard("Hull & Waves", "Colour the wooden hull brown and the ocean waves bright blue!", "کشتی کے نچلے حصے میں بھورا اور سمندر کی لہروں میں نیلا رنگ بھریں!", "د کښتۍ لاندینۍ برخه نسواري او د سمندر څپې اسماني رنګ کړئ!", Color(0xFF0288D1))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("Where does the Ship sail?", "بحری جہاز کہاں چلتا ہے؟", "کښتۍ چیرته ځي؟", listOf("On Blue Water 🌊", "On a Tree 🌳", "In a Cave 🪨"), 0),
                DrawingQuizQuestion("What shape are the sails of the ship?", "جہاز کے بادبان کس شکل کے ہیں؟", "د کښتۍ بادبانونه کوم شکل لري؟", listOf("Triangles 🔺", "Circles ⭕", "Stars ⭐"), 0)
            )
        ),

        // PAGE 7: Angry Bird
        DrawingBookStage(
            id = 7,
            pageNumber = "Page 7",
            unitTitle = "Fun Characters",
            titleEn = "Colour the Angry Bird",
            titleUr = "سرخ پرندے میں رنگ بھریں",
            titlePs = "سره مرغۍ رنګ کړئ",
            instructionEn = "Trace the round dotted body of the Angry Bird, then paint it bright Red with a Yellow beak!",
            instructionUr = "گول نقطوں کو ملا کر سرخ پرندہ بنائیں، پھر اس میں شوخ سرخ اور چونچ میں پیلا رنگ بھریں!",
            instructionPs = "ګرد ټکي سره ونښلوئ ترڅو سره مرغۍ رسم کړئ، بیا یې سور او مښوکه یې ژېړه رنګ کړئ!",
            themeColor = Color(0xFFD32F2F),
            artworkType = DrawingArtworkType.PAGE7_ANGRY_BIRD,
            dotPathNorm = circleDots(0.50f, 0.54f, 0.28f, 0.28f, 16),
            colorZones = listOf(
                DrawingColorZone("Red Body", "سرخ جسم", "سور بدن", Color(0xFFE53935), "Red", Offset(0.46f, 0.50f)),
                DrawingColorZone("Yellow Beak", "پیلی چونچ", "ژېړه مښوکه", Color(0xFFFDD835), "Yellow", Offset(0.58f, 0.58f)),
                DrawingColorZone("Dark Tail & Brows", "سیاہ بھنویں اور دم", "تورې وروځې او لکۍ", Color(0xFF37474F), "Black", Offset(0.20f, 0.52f))
            ),
            lessons = listOf(
                DrawingLessonCard("Round Circle Body", "This cartoon bird has a big round circle body with two feathers on top.", "اس کارٹون پرندے کا جسم بڑا اور گول ہے جس کے اوپر دو پر ہیں۔", "دا کارټوني مرغۍ لوی ګرد بدن لري او په سر یې دوه بڼکې دي.", Color(0xFFE53935)),
                DrawingLessonCard("Expressive Eyebrows", "Thick V-shaped black eyebrows and a sharp yellow beak give it a bold look!", "موٹی سیاہ بھنویں اور نوکیلی پیلی چونچ اسے منفرد بناتی ہیں!", "پنډې تورې وروځې او تېره ژېړه مښوکه ورته ځانګړې بڼه ورکوي!", Color(0xFFFDD835))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What is the main colour of the Angry Bird on Page 7?", "صفحہ 7 پر پرندے کا بنیادی رنگ کیا ہے؟", "په ۷ مخ کې د مرغۍ اصلي رنګ څه دی؟", listOf("Red 🔴", "Blue 🔵", "Green 🟢"), 0),
                DrawingQuizQuestion("What colour is its sharp beak?", "اس کی نوکیلی چونچ کا رنگ کیا ہے؟", "د هغې د تېرې مښوکې رنګ څه دی؟", listOf("Yellow 🟡", "Pink 🩷", "Purple 🟣"), 0)
            )
        ),

        // PAGE 8: Honey Bee
        DrawingBookStage(
            id = 8,
            pageNumber = "Page 8",
            unitTitle = "Insects & Nature",
            titleEn = "Colour the Honey Bee",
            titleUr = "شہد کی مکھی میں رنگ بھریں",
            titlePs = "د شاتو مچۍ رنګ کړئ",
            instructionEn = "Trace the buzzing Honey Bee and colour its wings Orange and body stripes Yellow & Brown!",
            instructionUr = "شہد کی مکھی کے نقطے ملائیں اور اس کے پروں میں نارنجی اور جسم کی دھاریوں میں پیلا اور بھورا رنگ بھریں!",
            instructionPs = "د شاتو مچۍ ټکي سره ونښلوئ او وزرونه یې نارنجي او د بدن کرښې یې ژېړې او نسواري رنګ کړئ!",
            themeColor = Color(0xFFFBC02D),
            artworkType = DrawingArtworkType.PAGE8_HONEY_BEE,
            dotPathNorm = circleDots(0.50f, 0.54f, 0.30f, 0.22f, 16),
            colorZones = listOf(
                DrawingColorZone("Yellow Stripes", "پیلی دھاریاں", "ژېړې کرښې", Color(0xFFFDD835), "Yellow", Offset(0.50f, 0.56f)),
                DrawingColorZone("Brown Stripes", "بھوری دھاریاں", "نسواري کرښې", Color(0xFF6D4C41), "Brown", Offset(0.62f, 0.56f)),
                DrawingColorZone("Orange Wings", "نارنجی پر", "نارنجي وزرونه", Color(0xFFFF9800), "Orange", Offset(0.52f, 0.30f))
            ),
            lessons = listOf(
                DrawingLessonCard("Striped Bee Body", "Honey bees have alternating yellow and dark brown stripes on their oval tummy.", "شہد کی مکھی کے بیضوی جسم پر پیلی اور گہری بھوری دھاریاں ہوتی ہیں۔", "د شاتو مچۍ په هګۍ شکله بدن باندې ژېړې او نسواري کرښې وي.", Color(0xFFFBC02D)),
                DrawingLessonCard("Sweet Honeycomb Hive", "Honey bees collect nectar from flowers and make sweet honey in their hive!", "شہد کی مکھیاں پھولوں سے رس چوستی ہیں اور چھتے میں میٹھا شہد بناتی ہیں!", "د شاتو مچۍ له ګلونو څخه شیره راټولوي او په ځاله کې خواږه شات جوړوي!", Color(0xFFFF9800))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What sweet food does the Honey Bee make?", "شہد کی مکھی کون سی میٹھی چیز بناتی ہے؟", "د شاتو مچۍ کوم خواږه خواړه جوړوي؟", listOf("Honey 🍯", "Milk 🥛", "Bread 🍞"), 0),
                DrawingQuizQuestion("What colours are the stripes on the Honey Bee?", "شہد کی مکھی کی دھاریاں کن رنگوں کی ہیں؟", "د شاتو مچۍ کرښې کوم رنګونه لري؟", listOf("Yellow & Brown", "Blue & White", "Pink & Green"), 0)
            )
        ),

        // PAGE 9: Cap
        DrawingBookStage(
            id = 9,
            pageNumber = "Page 9",
            unitTitle = "Everyday Objects",
            titleEn = "Colour the Cap",
            titleUr = "ٹوپی میں رنگ بھریں",
            titlePs = "خولۍ رنګ کړئ",
            instructionEn = "Join the dots to draw the cool Cap, then colour the cap Green and the star Yellow!",
            instructionUr = "نقطوں کو ملا کر ٹوپی بنائیں، پھر ٹوپی میں سبز اور ستارے میں پیلا رنگ بھریں!",
            instructionPs = "ټکي سره ونښلوئ ترڅو خولۍ رسم کړئ، بیا خولۍ شنه او ستوری ژېړ رنګ کړئ!",
            themeColor = Color(0xFF43A047),
            artworkType = DrawingArtworkType.PAGE9_CAP,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.24f, 0.56f), Offset(0.32f, 0.28f), Offset(0.56f, 0.24f),
                    Offset(0.76f, 0.48f), Offset(0.84f, 0.64f), Offset(0.50f, 0.68f), Offset(0.24f, 0.56f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Green Cap Dome", "سبز ٹوپی", "شنه خولۍ", Color(0xFF66BB6A), "Green", Offset(0.48f, 0.44f)),
                DrawingColorZone("Yellow Star", "پیلا ستارہ", "ژېړ ستوری", Color(0xFFFDD835), "Yellow", Offset(0.54f, 0.40f)),
                DrawingColorZone("Green Visor Brim", "ٹوپی کا اگلا حصہ", "د خولۍ مخکینۍ برخه", Color(0xFF2E7D32), "Dark Green", Offset(0.68f, 0.60f))
            ),
            lessons = listOf(
                DrawingLessonCard("Curved Dome & Visor", "A cap has a round dome for your head and a curved visor to shade your eyes from the sun.", "ٹوپی کا اوپری حصہ گول ہوتا ہے اور اگلا حصہ دھوپ سے آنکھوں کو بچاتا ہے۔", "د خولۍ پورتنۍ برخه ګرده ده او مخکینۍ برخه یې سترګې له لمر څخه ساتي.", Color(0xFF43A047)),
                DrawingLessonCard("Yellow Star Badge", "Colour the 5-pointed star in the middle bright yellow!", "درمیان میں بنے پانچ کونوں والے ستارے میں چمکدار پیلا رنگ بھریں!", "په منځ کې پنځه کونجه ستوری روښانه ژېړ رنګ کړئ!", Color(0xFFFDD835))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour is the Cap on Page 9?", "صفحہ 9 پر ٹوپی کا رنگ کیا ہے؟", "په ۹ مخ کې د خولۍ رنګ څه دی؟", listOf("Green 🟢", "Red 🔴", "Purple 🟣"), 0),
                DrawingQuizQuestion("What shape is on the front of the Cap?", "ٹوپی کے سامنے کون سی شکل بنی ہے؟", "د خولۍ په مخ کې کوم شکل دی؟", listOf("Yellow Star ⭐", "Blue Moon 🌙", "Red Heart ❤️"), 0)
            )
        ),

        // PAGE 10: Tulip
        DrawingBookStage(
            id = 10,
            pageNumber = "Page 10",
            unitTitle = "Flowers & Plants",
            titleEn = "Colour the Tulip",
            titleUr = "لالہ کے پھول میں رنگ بھریں",
            titlePs = "د غاټول ګل رنګ کړئ",
            instructionEn = "Trace the Tulip petals, stem, and leaves, then paint the flower Red and leaves Green!",
            instructionUr = "پھول کی پتیوں اور ڈنڈی کے نقطے ملائیں، پھر پھول میں سرخ اور پتوں میں سبز رنگ بھریں!",
            instructionPs = "د غاټول ګل پاڼې او ډنډر رسم کړئ، بیا ګل سور او پاڼې شنې رنګ کړئ!",
            themeColor = Color(0xFFE53935),
            artworkType = DrawingArtworkType.PAGE10_TULIP,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.34f, 0.24f), Offset(0.44f, 0.34f), Offset(0.50f, 0.20f),
                    Offset(0.56f, 0.34f), Offset(0.66f, 0.24f), Offset(0.62f, 0.48f),
                    Offset(0.50f, 0.52f), Offset(0.38f, 0.48f), Offset(0.34f, 0.24f),
                    Offset(0.50f, 0.52f), Offset(0.50f, 0.84f)
                ), 2
            ),
            colorZones = listOf(
                DrawingColorZone("Red Tulip Petals", "سرخ پنکھڑیاں", "سرې ګل پاڼې", Color(0xFFE53935), "Red", Offset(0.50f, 0.36f)),
                DrawingColorZone("Green Stem & Leaves", "سبز ڈنڈی اور پتے", "شین ډنډر او پاڼې", Color(0xFF43A047), "Green", Offset(0.50f, 0.70f))
            ),
            lessons = listOf(
                DrawingLessonCard("Cup-Shaped Tulip", "Tulip petals curve upward like a cup with three pointed tips at the top.", "لالہ (Tulip) کے پھول کی پنکھڑیاں پیالے کی طرح ہوتی ہیں جن کے اوپر تین نوکیں ہوتی ہیں۔", "د غاټول ګل پاڼې د پیالې په څېر دي چې په سر کې درې څوکې لري.", Color(0xFFE53935)),
                DrawingLessonCard("Green Stem & Leaves", "The long stem and broad leaves are coloured fresh green.", "لمبی ڈنڈی اور چوڑے پتوں میں تازہ سبز رنگ بھرا جاتا ہے۔", "اوږد ډنډر او پراخې پاڼې تازه شین رنګ کیږي.", Color(0xFF43A047))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour are the Tulip petals on Page 10?", "صفحہ 10 پر ٹیولپ پھول کی پنکھڑیوں کا رنگ کیا ہے؟", "په ۱۰ مخ کې د غاټول ګل پاڼو رنګ څه دی؟", listOf("Red 🌷", "Blue 🔵", "Black ⚫"), 0),
                DrawingQuizQuestion("What colour are the Tulip's leaves and stem?", "پھول کے پتوں اور ڈنڈی کا رنگ کیا ہے؟", "د ګل د پاڼو او ډنډر رنګ څه دی؟", listOf("Green 🌿", "Yellow 🟡", "Orange 🟠"), 0)
            )
        ),

        // PAGE 11: Ant
        DrawingBookStage(
            id = 11,
            pageNumber = "Page 11",
            unitTitle = "Insects & Nature",
            titleEn = "Colour the Ant",
            titleUr = "چیونٹی میں رنگ بھریں",
            titlePs = "مېږی رنګ کړئ",
            instructionEn = "Trace the 3 body parts of the hardworking Ant and colour it bright Orange-Red!",
            instructionUr = "محنتی چیونٹی کے تین حصوں کے نقطے ملائیں اور اس میں سرخی مائل نارنجی رنگ بھریں!",
            instructionPs = "د زیارکښ مېږي درې برخې رسم کړئ او سوربخن نارنجي رنګ ورکړئ!",
            themeColor = Color(0xFFF4511E),
            artworkType = DrawingArtworkType.PAGE11_ANT,
            dotPathNorm = circleDots(0.28f, 0.45f, 0.10f, 0.09f, 6) +
                circleDots(0.48f, 0.50f, 0.09f, 0.07f, 6) +
                circleDots(0.70f, 0.52f, 0.14f, 0.11f, 8),
            colorZones = listOf(
                DrawingColorZone("Red-Orange Head", "سرخ نارنجی سر", "سور نارنجي سر", Color(0xFFF4511E), "Red-Orange", Offset(0.28f, 0.45f)),
                DrawingColorZone("Middle Thorax", "درمیانی حصہ", "منځنۍ برخه", Color(0xFFFF7043), "Orange", Offset(0.48f, 0.50f)),
                DrawingColorZone("Back Abdomen", "پچھلا حصہ", "شاته برخه", Color(0xFFD84315), "Dark Orange", Offset(0.70f, 0.52f))
            ),
            lessons = listOf(
                DrawingLessonCard("3 Oval Body Segments", "An ant's body is made of 3 connected ovals: head, thorax, and abdomen, plus 6 legs!", "چیونٹی کا جسم 3 بیضوی حصوں سے مل کر بنتا ہے اور اس کی 6 ٹانگیں ہوتی ہیں!", "د مېږي بدن له ۳ هګۍ شکله برخو څخه جوړ دی او ۶ پښې لري!", Color(0xFFF4511E)),
                DrawingLessonCard("Hardworking Insect", "Ants work together in teams to carry food to their anthill.", "چیونٹیاں مل جل کر خوراک اپنے بل تک لے جاتی ہیں۔", "مېږیان په ګډه کار کوي ترڅو خواړه خپلې ځالې ته یوسي.", Color(0xFF8D6E63))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("How many main body segments does the Ant have?", "چیونٹی کے جسم کے کتنے بڑے حصے ہوتے ہیں؟", "د مېږي بدن څو اصلي برخې لري؟", listOf("3", "1", "8"), 0),
                DrawingQuizQuestion("What colour is the Ant on Page 11?", "صفحہ 11 پر چیونٹی کا رنگ کیا ہے؟", "په ۱۱ مخ کې د مېږي رنګ څه دی؟", listOf("Red / Orange 🐜", "Blue 🔵", "Green 🟢"), 0)
            )
        ),

        // PAGE 12: Goat
        DrawingBookStage(
            id = 12,
            pageNumber = "Page 12",
            unitTitle = "Birds & Animals",
            titleEn = "Colour the Goat",
            titleUr = "بکری میں رنگ بھریں",
            titlePs = "وزې ته رنګ ورکړئ",
            instructionEn = "Join the dots around the Goat, its horns, and legs, then paint it warm Brown!",
            instructionUr = "بکری، اس کے سینگوں اور ٹانگوں کے نقطے ملائیں اور اس میں بھورا رنگ بھریں!",
            instructionPs = "د وزې، ښکرونو او پښو ټکي سره ونښلوئ او نسواري رنګ ورکړئ!",
            themeColor = Color(0xFF795548),
            artworkType = DrawingArtworkType.PAGE12_GOAT,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.24f, 0.30f), Offset(0.34f, 0.20f), Offset(0.38f, 0.42f),
                    Offset(0.72f, 0.44f), Offset(0.76f, 0.78f), Offset(0.64f, 0.58f),
                    Offset(0.42f, 0.58f), Offset(0.34f, 0.78f), Offset(0.24f, 0.30f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Light Brown Coat", "ہلکا بھورا جسم", "روښانه نسواري بدن", Color(0xFFA1887F), "Light Brown", Offset(0.54f, 0.50f)),
                DrawingColorZone("Dark Brown Horns & Back", "گہرے بھورے سینگ", "تیاره نسواري ښکرونه", Color(0xFF5D4037), "Dark Brown", Offset(0.32f, 0.26f))
            ),
            lessons = listOf(
                DrawingLessonCard("Horns, Beard & Hooves", "Notice the goat's curved horns on its head, little chin beard, and 4 legs.", "بکری کے مڑے ہوئے سینگ، چھوٹی داڑھی اور چار ٹانگوں کو غور سے دیکھیں۔", "د وزې کږو ښکرونو، وړې ږیرې او څلورو پښو ته پام وکړئ.", Color(0xFF795548)),
                DrawingLessonCard("Two Shades of Brown", "Use light brown for the body and dark brown for the horns, hooves, and back.", "جسم کے لیے ہلکا بھورا اور سینگوں و کھروں کے لیے گہرا بھورا رنگ استعمال کریں۔", "د بدن لپاره روښانه نسواري او د ښکرونو او پښو لپاره تیاره نسواري رنګ وکاروئ.", Color(0xFF5D4037))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour is the Goat on Page 12?", "صفحہ 12 پر بکری کا رنگ کیا ہے؟", "په ۱۲ مخ کې د وزې رنګ څه دی؟", listOf("Brown 🐐", "Pink 🩷", "Blue 🔵"), 0),
                DrawingQuizQuestion("How many legs does the Goat have?", "بکری کی کتنی ٹانگیں ہوتی ہیں؟", "وزه څو پښې لري؟", listOf("4", "2", "6"), 0)
            )
        ),

        // PAGE 13: Umbrella
        DrawingBookStage(
            id = 13,
            pageNumber = "Page 13",
            unitTitle = "Everyday Objects",
            titleEn = "Colour the Umbrella",
            titleUr = "چھتری میں رنگ بھریں",
            titlePs = "چترۍ رنګ کړئ",
            instructionEn = "Trace the smiling Umbrella dome and J-shaped handle, then paint it bright Green!",
            instructionUr = "مسکراتی ہوئی چھتری اور اس کے دستے کے نقطے ملائیں، پھر اس میں سبز رنگ بھریں!",
            instructionPs = "د موسکا کوونکې چترۍ او لاستي ټکي سره ونښلوئ او شین رنګ ورکړئ!",
            themeColor = Color(0xFF43A047),
            artworkType = DrawingArtworkType.PAGE13_UMBRELLA,
            dotPathNorm = (0..10).map { i ->
                val angle = Math.PI.toFloat() * (1f - i / 10f)
                Offset(0.50f + 0.34f * kotlin.math.cos(angle), 0.52f - 0.28f * kotlin.math.sin(angle))
            } + listOf(Offset(0.50f, 0.52f), Offset(0.50f, 0.80f), Offset(0.42f, 0.84f)),
            colorZones = listOf(
                DrawingColorZone("Green Canopy", "سبز چھتری", "شنه چترۍ", Color(0xFF66BB6A), "Green", Offset(0.50f, 0.38f)),
                DrawingColorZone("Red Smiling Mouth", "سرخ مسکراتا منہ", "سره موسکا خوله", Color(0xFFE53935), "Red", Offset(0.50f, 0.46f)),
                DrawingColorZone("Orange Handle", "نارنجی دستہ", "نارنجي لاستی", Color(0xFFFF7043), "Orange", Offset(0.48f, 0.78f))
            ),
            lessons = listOf(
                DrawingLessonCard("Rainy Day Umbrella", "An umbrella keeps us dry when raindrops fall from the clouds!", "جب بادلوں سے بارش برستی ہے تو چھتری ہمیں بھیگنے سے بچاتی ہے!", "کله چې له ورېځو باران اوري نو چترۍ موږ وچ ساتي!", Color(0xFF43A047)),
                DrawingLessonCard("Happy Face Canopy", "This cute green umbrella has big eyes and a happy red smile!", "اس پیاری سبز چھتری کی بڑی آنکھیں اور سرخ مسکراہٹ ہے!", "دا ښکلې شنه چترۍ لویې سترګې او سره موسکا لري!", Color(0xFFE53935))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("When do we use an Umbrella?", "ہم چھتری کب استعمال کرتے ہیں؟", "موږ چترۍ کله کاروو؟", listOf("In the Rain ☔", "Under Water 🐟", "In Bed 🛏️"), 0),
                DrawingQuizQuestion("What colour is the Umbrella on Page 13?", "صفحہ 13 پر چھتری کا رنگ کیا ہے؟", "په ۱۳ مخ کې د چترۍ رنګ څه دی؟", listOf("Green 🟢", "Black ⚫", "Grey ⚪"), 0)
            )
        ),

        // PAGE 14: Purse
        DrawingBookStage(
            id = 14,
            pageNumber = "Page 14",
            unitTitle = "Everyday Objects",
            titleEn = "Colour the Purse",
            titleUr = "پرس (بیگ) میں رنگ بھریں",
            titlePs = "بکس/بټوه رنګ کړئ",
            instructionEn = "Join the dots to draw the stylish Purse and handles, then colour it Red and Blue!",
            instructionUr = "نقطوں کو ملا کر خوبصورت پرس بنائیں اور اس میں سرخ اور نیلا رنگ بھریں!",
            instructionPs = "ټکي سره ونښلوئ ترڅو ښکلې بټوه رسم کړئ او سور او شین رنګ ورکړئ!",
            themeColor = Color(0xFFD81B60),
            artworkType = DrawingArtworkType.PAGE14_PURSE,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.36f, 0.38f), Offset(0.50f, 0.16f), Offset(0.64f, 0.38f),
                    Offset(0.76f, 0.40f), Offset(0.72f, 0.78f), Offset(0.28f, 0.78f),
                    Offset(0.24f, 0.40f), Offset(0.36f, 0.38f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Red Centre & Handles", "سرخ درمیانی حصہ", "سره منځنۍ برخه", Color(0xFFE53935), "Red", Offset(0.50f, 0.56f)),
                DrawingColorZone("Blue Side Panels", "نیلے کنارے", "شین اړخونه", Color(0xFF1E88E5), "Blue", Offset(0.32f, 0.60f)),
                DrawingColorZone("Yellow Clasp", "پیلا بٹن", "ژېړه تڼۍ", Color(0xFFFDD835), "Yellow", Offset(0.50f, 0.44f))
            ),
            lessons = listOf(
                DrawingLessonCard("Handbag Straps & Pockets", "Trace the curved top handles and the neat rectangular body of the purse.", "پرس کے گول دستوں اور چوکور جسم کے نقطوں کو ملائیں۔", "د بټوې ګرد لاستي او چهارضلعې بدن ټکي سره ونښلوئ.", Color(0xFFE53935)),
                DrawingLessonCard("Red & Blue Contrast", "Red and Blue are primary colours that look bright and bold together!", "سرخ اور نیلا بنیادی رنگ ہیں جو ایک ساتھ بہت چمکدار لگتے ہیں!", "سور او شین بنسټیز رنګونه دي چې یوځای ډېر ښکلي ښکاري!", Color(0xFF1E88E5))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("Which two main colours are used on the Purse on Page 14?", "صفحہ 14 پر پرس میں کون سے دو بڑے رنگ بھرے گئے ہیں؟", "په ۱۴ مخ کې په بټوه کې کوم دوه اصلي رنګونه کارول شوي دي؟", listOf("Red & Blue 🔴🔵", "Green & Brown 🟢🟤", "Black & Grey ⚫⚪"), 0),
                DrawingQuizQuestion("What do we carry things in?", "ہم چیزیں رکھنے کے لیے کیا استعمال کرتے ہیں؟", "موږ د شیانو وړلو لپاره څه کاروو؟", listOf("A Purse / Bag 👜", "A Shoe 👟", "A Spoon 🥄"), 0)
            )
        ),

        // PAGE 15: Pineapple
        DrawingBookStage(
            id = 15,
            pageNumber = "Page 15",
            unitTitle = "Fruits",
            titleEn = "Colour the Pineapple",
            titleUr = "انناس میں رنگ بھریں",
            titlePs = "انناس رنګ کړئ",
            instructionEn = "Trace the spiky crown and oval Pineapple fruit, then paint it Golden Yellow and Green!",
            instructionUr = "انناس کے تاج اور بیضوی پھل کے نقطے ملائیں، پھر سنہری پیلا اور سبز رنگ بھریں!",
            instructionPs = "د انناس پاڼې او میوه رسم کړئ، بیا یې طلایي ژېړ او شین رنګ کړئ!",
            themeColor = Color(0xFFFFB300),
            artworkType = DrawingArtworkType.PAGE15_PINEAPPLE,
            dotPathNorm = polygonDots(
                listOf(Offset(0.38f, 0.34f), Offset(0.44f, 0.16f), Offset(0.50f, 0.30f), Offset(0.58f, 0.16f), Offset(0.62f, 0.34f)), 2
            ) + circleDots(0.50f, 0.60f, 0.20f, 0.24f, 12),
            colorZones = listOf(
                DrawingColorZone("Green Crown Leaves", "سبز پتے", "شنې پاڼې", Color(0xFF43A047), "Green", Offset(0.50f, 0.24f)),
                DrawingColorZone("Golden Orange Pineapple", "سنہری پیلا انناس", "ژېړ/نارنجي انناس", Color(0xFFFFB300), "Golden Yellow", Offset(0.50f, 0.60f))
            ),
            lessons = listOf(
                DrawingLessonCard("Diamond Pattern Skin", "A pineapple has criss-cross diamond segments on its golden orange body.", "انناس کے سنہری جسم پر ترچھی لکیروں سے ہیرے (Diamond) کے نشان بنے ہوتے ہیں۔", "د انناس په طلایي بدن باندې د الماس په څېر نښې وي.", Color(0xFFFFB300)),
                DrawingLessonCard("Leafy Green Crown", "On top of the pineapple sits a crown of pointed green leaves!", "انناس کے سر پر نوکیلے سبز پتوں کا تاج ہوتا ہے!", "د انناس په سر باندې د شنو پاڼو تاج وي!", Color(0xFF43A047))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour is the crown of leaves on top of the Pineapple?", "انناس کے اوپر پتوں کے تاج کا رنگ کیا ہے؟", "د انناس په سر د پاڼو رنګ څه دی؟", listOf("Green 🌿", "Red 🔴", "Blue 🔵"), 0),
                DrawingQuizQuestion("What colour is the ripe Pineapple body?", "پکے ہوئے انناس کا رنگ کیا ہوتا ہے؟", "د پاخه انناس رنګ څه دی؟", listOf("Yellow / Orange 🍍", "Purple 🟣", "Black ⚫"), 0)
            )
        ),

        // PAGE 16: Parrot
        DrawingBookStage(
            id = 16,
            pageNumber = "Page 16",
            unitTitle = "Birds & Animals",
            titleEn = "Colour the Parrot",
            titleUr = "طوطے میں رنگ بھریں",
            titlePs = "طوطي رنګ کړئ",
            instructionEn = "Trace the Parrot from head to long tail, then colour its feathers Green and beak Red!",
            instructionUr = "طوطے کے سر سے لمبی دم تک نقطے ملائیں، پھر پروں میں سبز اور چونچ میں سرخ رنگ بھریں!",
            instructionPs = "د طوطي له سر څخه تر اوږدې لکۍ پورې ټکي ونښلوئ، بیا بڼکې شنې او مښوکه سره رنګ کړئ!",
            themeColor = Color(0xFF43A047),
            artworkType = DrawingArtworkType.PAGE16_PARROT,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.32f, 0.24f), Offset(0.46f, 0.18f), Offset(0.58f, 0.38f),
                    Offset(0.76f, 0.84f), Offset(0.52f, 0.68f), Offset(0.38f, 0.46f), Offset(0.32f, 0.24f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Green Feathers", "سبز پر", "شنې بڼکې", Color(0xFF66BB6A), "Green", Offset(0.46f, 0.42f)),
                DrawingColorZone("Red Curved Beak", "سرخ مڑی ہوئی چونچ", "سره کږه مښوکه", Color(0xFFE53935), "Red", Offset(0.28f, 0.28f)),
                DrawingColorZone("Red Wing Tips", "سرخ پر کے کنارے", "د وزر سرې څوکې", Color(0xFFD32F2F), "Crimson Red", Offset(0.58f, 0.56f))
            ),
            lessons = listOf(
                DrawingLessonCard("Green Parrot & Red Beak", "Parrots have bright green feathers, a red ring on the neck, and a curved red beak.", "طوطے کے پر شوخ سبز ہوتے ہیں اور اس کی چونچ مڑی ہوئی سرخ ہوتی ہے۔", "طوطي روښانه شنې بڼکې او کږه سره مښوکه لري.", Color(0xFF43A047)),
                DrawingLessonCard("Long Tail Feathers", "Follow the long dotted lines down to draw the parrot's graceful tail!", "طوطے کی لمبی خوبصورت دم بنانے کے لیے نیچے تک نقطوں کو ملائیں!", "د طوطي د اوږدې لکۍ رسمولو لپاره لاندې ټکي سره ونښلوئ!", Color(0xFFE53935))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour is the Parrot's body?", "طوطے کے جسم کا رنگ کیا ہوتا ہے؟", "د طوطي د بدن رنګ څه دی؟", listOf("Green 🦜", "Brown 🟤", "White ⚪"), 0),
                DrawingQuizQuestion("What colour is the Parrot's curved beak?", "طوطے کی مڑی ہوئی چونچ کا رنگ کیا ہے؟", "د طوطي د کږې مښوکې رنګ څه دی؟", listOf("Red 🔴", "Blue 🔵", "Green 🟢"), 0)
            )
        ),

        // PAGE 17: Watermelon
        DrawingBookStage(
            id = 17,
            pageNumber = "Page 17",
            unitTitle = "Fruits",
            titleEn = "Colour the Watermelon",
            titleUr = "تربوز میں رنگ بھریں",
            titlePs = "هندواڼه رنګ کړئ",
            instructionEn = "Trace the round Watermelon and juicy slice, then paint the rind Green and the inside Red!",
            instructionUr = "گول تربوز اور اس کی قاش کے نقطے ملائیں، پھر چھلکے میں سبز اور اندر سرخ رنگ بھریں!",
            instructionPs = "ګرده هندواڼه او د هغې ټوټه رسم کړئ، بیا پوټکی شین او منځ یې سور رنګ کړئ!",
            themeColor = Color(0xFFE53935),
            artworkType = DrawingArtworkType.PAGE17_WATERMELON,
            dotPathNorm = circleDots(0.42f, 0.46f, 0.24f, 0.24f, 12) +
                polygonDots(listOf(Offset(0.32f, 0.68f), Offset(0.78f, 0.68f), Offset(0.55f, 0.84f), Offset(0.32f, 0.68f)), 3),
            colorZones = listOf(
                DrawingColorZone("Green Striped Rind", "سبز چھلکا", "شین پوټکی", Color(0xFF43A047), "Green", Offset(0.42f, 0.42f)),
                DrawingColorZone("Juicy Red Slice", "سرخ رسیلا گودا", "سره خوږه برخه", Color(0xFFE53935), "Red", Offset(0.55f, 0.74f))
            ),
            lessons = listOf(
                DrawingLessonCard("Green Outside, Red Inside", "A watermelon has a striped dark-and-light green skin outside and sweet red flesh inside!", "تربوز باہر سے دھاری دار سبز اور اندر سے میٹھا سرخ ہوتا ہے!", "هندواڼه له بهر څخه شنه او له دننه څخه خوږه سره وي!", Color(0xFF43A047)),
                DrawingLessonCard("Little Black Seeds", "Inside the red watermelon slice are tiny black seeds.", "سرخ تربوز کی قاش کے اندر چھوٹے کالے بیج ہوتے ہیں۔", "د سرې هندواڼې په ټوټه کې واړه تور زړي وي.", Color(0xFFE53935))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour is the inside of a ripe Watermelon?", "پکے ہوئے تربوز کے اندر کا رنگ کیا ہوتا ہے؟", "د پخې هندواڼې دننه کوم رنګ وي؟", listOf("Red 🍉", "Blue 🔵", "Purple 🟣"), 0),
                DrawingQuizQuestion("What colour is the outside skin of the Watermelon?", "تربوز کے بیرونی چھلکے کا رنگ کیا ہے؟", "د هندواڼې د بهرني پوټکي رنګ څه دی؟", listOf("Green 🟢", "Pink 🩷", "Red 🔴"), 0)
            )
        ),

        // PAGE 18: Frock
        DrawingBookStage(
            id = 18,
            pageNumber = "Page 18",
            unitTitle = "Clothes & Fashion",
            titleEn = "Colour the Frock",
            titleUr = "فراک میں رنگ بھریں",
            titlePs = "فراک (کالي) رنګ کړئ",
            instructionEn = "Join the dots around the pretty Frock dress, then colour it Pink, Red, and Yellow!",
            instructionUr = "پیاری فراک کے نقطے ملائیں اور اس میں گلابی، سرخ اور پیلا رنگ بھریں!",
            instructionPs = "د ښکلي فراک ټکي سره ونښلوئ او ګلابي، سور او ژېړ رنګ ورکړئ!",
            themeColor = Color(0xFFEC407A),
            artworkType = DrawingArtworkType.PAGE18_FROCK,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.36f, 0.18f), Offset(0.64f, 0.18f), Offset(0.60f, 0.44f),
                    Offset(0.80f, 0.78f), Offset(0.20f, 0.78f), Offset(0.40f, 0.44f), Offset(0.36f, 0.18f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Pink Top & Skirt", "گلابی فراک", "ګلابي فراک", Color(0xFFF48FB1), "Pink", Offset(0.50f, 0.62f)),
                DrawingColorZone("Red Belt & Frills", "سرخ پٹی اور جھالر", "سره پټۍ او لمن", Color(0xFFE53935), "Red", Offset(0.50f, 0.78f)),
                DrawingColorZone("Yellow Star", "پیلا ستارہ", "ژېړ ستوری", Color(0xFFFDD835), "Yellow", Offset(0.50f, 0.32f))
            ),
            lessons = listOf(
                DrawingLessonCard("Flared Skirt & Collar", "Trace the round collar, waist bow, and wavy frills at the bottom of the frock.", "فراک کے گول گلے، کمر کی گرہ اور نیچے کی لہر دار جھالر کے نقطے ملائیں۔", "د فراک ګرد غاړه، د ملا تړونی او لاندینۍ څپېداره لمن رسم کړئ.", Color(0xFFEC407A)),
                DrawingLessonCard("Star on the Bodice", "Paint the centre star bright yellow and the frills ruby red!", "درمیانی ستارے میں پیلا اور جھالر میں سرخ رنگ بھریں!", "منځنی ستوری ژېړ او لمن یې سره رنګ کړئ!", Color(0xFFFDD835))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour is the Frock on Page 18?", "صفحہ 18 پر فراک کا رنگ کیا ہے؟", "په ۱۸ مخ کې د فراک رنګ څه دی؟", listOf("Pink & Red 👗", "Black & Grey", "Brown & Green"), 0),
                DrawingQuizQuestion("What shape is on the top of the Frock?", "فراک کے اوپری حصے پر کون سی شکل بنی ہے؟", "د فراک په پورتنۍ برخه کې کوم شکل دی؟", listOf("Yellow Star ⭐", "Square 🟦", "Moon 🌙"), 0)
            )
        ),

        // PAGE 19: Grapes
        DrawingBookStage(
            id = 19,
            pageNumber = "Page 19",
            unitTitle = "Fruits",
            titleEn = "Colour the Grapes",
            titleUr = "انگوروں میں رنگ بھریں",
            titlePs = "انګور رنګ کړئ",
            instructionEn = "Trace the bunch of round Grapes and leaf, then paint them Green and Purple!",
            instructionUr = "گول انگوروں کے گچھے اور پتے کے نقطے ملائیں، پھر سبز اور جامنی رنگ بھریں!",
            instructionPs = "د ګردو انګورو وږی او پاڼه رسم کړئ، بیا یې شین او ارغواني رنګ کړئ!",
            themeColor = Color(0xFF8E24AA),
            artworkType = DrawingArtworkType.PAGE19_GRAPES,
            dotPathNorm = circleDots(0.50f, 0.54f, 0.24f, 0.28f, 16),
            colorZones = listOf(
                DrawingColorZone("Light Green Grapes", "ہلکے سبز انگور", "روښانه شنه انګور", Color(0xFF9CCC65), "Light Green", Offset(0.46f, 0.52f)),
                DrawingColorZone("Purple Grapes", "جامنی انگور", "ارغواني انګور", Color(0xFF8E24AA), "Purple", Offset(0.62f, 0.58f)),
                DrawingColorZone("Dark Green Leaf", "گہرا سبز پتہ", "تیاره شنه پاڼه", Color(0xFF2E7D32), "Dark Green", Offset(0.44f, 0.24f))
            ),
            lessons = listOf(
                DrawingLessonCard("Circles Make a Bunch", "Many small round circles clustered together make a juicy bunch of grapes!", "بہت سے چھوٹے گول دائرے مل کر رسیلے انگوروں کا گچھا بناتے ہیں!", "ډېرې وړې ګردې دایرې یوځای د خوږو انګورو وږی جوړوي!", Color(0xFF9CCC65)),
                DrawingLessonCard("Green & Purple Grapes", "Grapes come in both sweet light green and rich purple colours!", "انگور ہلکے سبز اور گہرے جامنی دونوں رنگوں میں ہوتے ہیں!", "انګور په روښانه شنه او ارغواني دواړو رنګونو کې وي!", Color(0xFF8E24AA))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What shape is each single Grape in the bunch?", "گچھے میں ہر ایک انگور کس شکل کا ہوتا ہے؟", "په وږي کې هره دانه انګور کوم شکل لري؟", listOf("Round / Circle 🟢", "Square 🟦", "Triangle 🔺"), 0),
                DrawingQuizQuestion("Which two colours of Grapes are shown on Page 19?", "صفحہ 19 پر انگوروں کے کون سے دو رنگ دکھائے گئے ہیں؟", "په ۱۹ مخ کې د انګورو کوم دوه رنګونه ښودل شوي دي؟", listOf("Green & Purple 🍇", "Red & Black", "Blue & White"), 0)
            )
        ),

        // PAGE 20: Camel
        DrawingBookStage(
            id = 20,
            pageNumber = "Page 20",
            unitTitle = "Birds & Animals",
            titleEn = "Colour the Camel",
            titleUr = "اونٹ میں رنگ بھریں",
            titlePs = "اوښ رنګ کړئ",
            instructionEn = "Trace the tall Desert Camel with its long neck and hump, then colour it Golden Brown!",
            instructionUr = "لمبی گردن اور کوہان والے صحرائی اونٹ کے نقطے ملائیں اور سنہری بھورا رنگ بھریں!",
            instructionPs = "د اوږدې غاړې او کوهان لرونکي اوښ ټکي سره ونښلوئ او طلایي نسواري رنګ ورکړئ!",
            themeColor = Color(0xFFD4A359),
            artworkType = DrawingArtworkType.PAGE20_CAMEL,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.20f, 0.24f), Offset(0.28f, 0.46f), Offset(0.50f, 0.26f),
                    Offset(0.72f, 0.44f), Offset(0.72f, 0.82f), Offset(0.58f, 0.58f),
                    Offset(0.36f, 0.58f), Offset(0.32f, 0.82f), Offset(0.20f, 0.24f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Sandy Golden Body", "سنہری بھورا جسم", "طلایي نسواري بدن", Color(0xFFD4A359), "Sandy Brown", Offset(0.52f, 0.46f)),
                DrawingColorZone("Dark Brown Hump & Tail", "گہرا بھورا کوہان", "تیاره نسواري کوهان", Color(0xFF795548), "Dark Brown", Offset(0.54f, 0.30f))
            ),
            lessons = listOf(
                DrawingLessonCard("Ship of the Desert", "The camel has a tall hump on its back, a curved neck, and long legs for walking on sand.", "اونٹ کی پیٹھ پر اونچا کوہان، مڑی ہوئی گردن اور ریت پر چلنے کے لیے لمبی ٹانگیں ہوتی ہیں۔", "اوښ په شا باندې لوړ کوهان، کږه غاړه او په شګو د تګ لپاره اوږدې پښې لري.", Color(0xFFD4A359)),
                DrawingLessonCard("Sandy Brown Shades", "Colour the camel sandy golden brown with dark brown fur on its hump.", "اونٹ میں ریت جیسا سنہری بھورا اور کوہان پر گہرا بھورا رنگ بھریں۔", "اوښ ته طلایي نسواري او کوهان ته یې تیاره نسواري رنګ ورکړئ.", Color(0xFF795548))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("Which animal is called the 'Ship of the Desert'?", "کس جانور کو صحرا کا جہاز کہا جاتا ہے؟", "کوم حیوان ته د صحرا کښتۍ ویل کیږي؟", listOf("Camel 🐪", "Duck 🦆", "Puppy 🐶"), 0),
                DrawingQuizQuestion("What does the Camel have on its back?", "اونٹ کی پیٹھ پر کیا ہوتا ہے؟", "د اوښ په شا باندې څه شی دی؟", listOf("A Hump", "Wings", "Fins"), 0)
            )
        ),

        // PAGE 21: Duck
        DrawingBookStage(
            id = 21,
            pageNumber = "Page 21",
            unitTitle = "Birds & Animals",
            titleEn = "Colour the Duck",
            titleUr = "بطخ میں رنگ بھریں",
            titlePs = "بطخه رنګ کړئ",
            instructionEn = "Join the dots around the swimming Duck and little ducklings, then colour them Blue, Brown, and Yellow!",
            instructionUr = "پانی میں تیرتی بطخ کے نقطے ملائیں اور اس میں نیلا، بھورا اور پیلا رنگ بھریں!",
            instructionPs = "په اوبو کې د لامبو وهونکې بطخې ټکي ونښلوئ او شین، نسواري او ژېړ رنګ ورکړئ!",
            themeColor = Color(0xFF039BE5),
            artworkType = DrawingArtworkType.PAGE21_DUCK,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.32f, 0.24f), Offset(0.44f, 0.24f), Offset(0.46f, 0.46f),
                    Offset(0.76f, 0.48f), Offset(0.68f, 0.72f), Offset(0.28f, 0.72f), Offset(0.32f, 0.24f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Blue Head & Wing", "نیلا سر اور پر", "شین سر او وزر", Color(0xFF29B6F6), "Blue", Offset(0.48f, 0.54f)),
                DrawingColorZone("Brown Breast & Tail", "بھورا سینہ اور دم", "نسواري سینه او لکۍ", Color(0xFF8D6E63), "Brown", Offset(0.36f, 0.58f)),
                DrawingColorZone("Yellow Beak & Duckling", "پیلی چونچ اور بچہ", "ژېړه مښوکه او چوچه", Color(0xFFFDD835), "Yellow", Offset(0.24f, 0.30f))
            ),
            lessons = listOf(
                DrawingLessonCard("Mother Duck & Ducklings", "Ducks love swimming in ponds with their cute yellow baby ducklings!", "بطخیں اپنے پیارے پیلے بچوں کے ساتھ تالاب میں تیرنا پسند کرتی ہیں!", "بطخې له خپلو ښکلو ژېړو بچو سره په ډنډ کې لامبو خوښوي!", Color(0xFF29B6F6)),
                DrawingLessonCard("Colourful Feathers", "Paint the duck's bill yellow, wings sky blue, and chest warm brown.", "بطخ کی چونچ میں پیلا، پروں میں نیلا اور سینے میں بھورا رنگ بھریں۔", "د بطخې مښوکه ژېړه، وزرونه اسماني او سینه نسواري رنګ کړئ.", Color(0xFFFDD835))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What sound does a Duck make?", "بطخ کیسی آواز نکالتی ہے؟", "بطخه څنګه غږ کوي؟", listOf("Quack Quack 🦆", "Meow 🐱", "Roar 🦁"), 0),
                DrawingQuizQuestion("What colour are the baby ducklings on Page 21?", "صفحہ 21 پر بطخ کے چھوٹے بچوں کا رنگ کیا ہے؟", "په ۲۱ مخ کې د بطخې د وړو بچو رنګ څه دی؟", listOf("Yellow 🐤", "Purple 🟣", "Black ⚫"), 0)
            )
        ),

        // PAGE 22: Scissor
        DrawingBookStage(
            id = 22,
            pageNumber = "Page 22",
            unitTitle = "Craft Tools",
            titleEn = "Colour the Scissor",
            titleUr = "قینچی میں رنگ بھریں",
            titlePs = "قیچي رنګ کړئ",
            instructionEn = "Trace the handles and crossed blades of the Scissors, then paint the handles Orange and blades Blue!",
            instructionUr = "قینچی کے دستوں اور پھل کے نقطے ملائیں، پھر دستوں میں نارنجی اور پھل میں نیلا رنگ بھریں!",
            instructionPs = "د قیچي لاستی او تیغونه رسم کړئ، بیا لاستی نارنجي او تیغونه اسماني رنګ کړئ!",
            themeColor = Color(0xFFFF7043),
            artworkType = DrawingArtworkType.PAGE22_SCISSOR,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.24f, 0.34f), Offset(0.50f, 0.50f), Offset(0.80f, 0.30f),
                    Offset(0.50f, 0.50f), Offset(0.80f, 0.70f), Offset(0.50f, 0.50f),
                    Offset(0.24f, 0.66f), Offset(0.24f, 0.34f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Orange Finger Loops", "نارنجی دستے", "نارنجي لاستی", Color(0xFFFF7043), "Orange", Offset(0.28f, 0.36f)),
                DrawingColorZone("Blue Metal Blades", "نیلے پھل (بلیڈ)", "اسماني تیغونه", Color(0xFF42A5F5), "Blue", Offset(0.68f, 0.38f))
            ),
            lessons = listOf(
                DrawingLessonCard("Craft Scissors", "Scissors have two oval finger loops and two blades that cross in the middle.", "قینچی میں انگلیوں کے لیے دو گول کڑے اور دو بلیڈ ہوتے ہیں جو درمیان میں ملتے ہیں۔", "قیچي د ګوتو لپاره دوه ګردې کړۍ او دوه تیغونه لري چې په منځ کې سره اوړي.", Color(0xFFFF7043)),
                DrawingLessonCard("Safety First!", "Always use child-safe craft scissors carefully with your teacher or parents.", "کاغذ کاٹتے وقت ہمیشہ بڑوں یا استاد کی موجودگی میں احتیاط سے قینچی استعمال کریں۔", "د کاغذ پرې کولو پر مهال تل د مشرانو یا ښوونکي په شتون کې له قیچي څخه په احتیاط کار واخلئ.", Color(0xFF42A5F5))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What do we use Scissors for in art class?", "ہم آرٹ کی کلاس میں قینچی کس لیے استعمال کرتے ہیں؟", "موږ د هنر په ټولګي کې قیچي د څه لپاره کاروو؟", listOf("Cutting Paper ✂️", "Painting Walls 🖌️", "Drinking Water 🥤"), 0),
                DrawingQuizQuestion("What colour are the scissor handles on Page 22?", "صفحہ 22 پر قینچی کے دستوں کا رنگ کیا ہے؟", "په ۲۲ مخ کې د قیچي د لاستي رنګ څه دی؟", listOf("Orange 🟠", "Green 🟢", "Pink 🩷"), 0)
            )
        ),

        // PAGE 23: Donkey
        DrawingBookStage(
            id = 23,
            pageNumber = "Page 23",
            unitTitle = "Birds & Animals",
            titleEn = "Colour the Donkey",
            titleUr = "گدھے میں رنگ بھریں",
            titlePs = "خر رنګ کړئ",
            instructionEn = "Trace the hardworking Donkey with its tall ears and mane, then colour it Grey-Brown!",
            instructionUr = "لمبے کانوں والے محنتی گدھے کے نقطے ملائیں اور اس میں سلیٹی بھورا رنگ بھریں!",
            instructionPs = "د اوږدو غوږونو لرونکي خره ټکي سره ونښلوئ او خړ نسواري رنګ ورکړئ!",
            themeColor = Color(0xFF8D6E63),
            artworkType = DrawingArtworkType.PAGE23_DONKEY,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.24f, 0.18f), Offset(0.36f, 0.38f), Offset(0.72f, 0.44f),
                    Offset(0.74f, 0.80f), Offset(0.58f, 0.60f), Offset(0.36f, 0.60f),
                    Offset(0.32f, 0.80f), Offset(0.20f, 0.36f), Offset(0.24f, 0.18f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Grey-Brown Coat", "سلیٹی بھورا جسم", "خړ نسواري بدن", Color(0xFFA1887F), "Grey-Brown", Offset(0.52f, 0.50f)),
                DrawingColorZone("Dark Mane & Hooves", "گہرے بال اور کھر", "تور ویښتان او پښې", Color(0xFF4E342E), "Dark Brown", Offset(0.38f, 0.32f))
            ),
            lessons = listOf(
                DrawingLessonCard("Long Ears & Mane", "A donkey has two tall pointed ears, a short upright mane, and four strong hooves.", "گدھے کے دو لمبے کان، گردن پر چھوٹے کھڑے بال اور چار مضبوط کھر ہوتے ہیں۔", "خر دوه اوږده غوږونه، په غاړه لنډ ویښتان او څلور قوي پښې لري.", Color(0xFFA1887F)),
                DrawingLessonCard("Helpful Farm Animal", "Donkeys help farmers carry heavy loads quietly and patiently.", "گدھا کسانوں کی بھاری بوجھ اٹھانے میں مدد کرتا ہے۔", "خر له بزګرانو سره د درنو بارونو په وړلو کې مرسته کوي.", Color(0xFF4E342E))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("Which feature on the Donkey's head is tall and pointed?", "گدھے کے سر پر کون سی چیز لمبی ہوتی ہے؟", "د خره په سر کوم شی اوږد وي؟", listOf("Two Long Ears 🫏", "Antlers 🦌", "Feathers 🪶"), 0),
                DrawingQuizQuestion("What colour is the Donkey on Page 23?", "صفحہ 23 پر گدھے کا رنگ کیا ہے؟", "په ۲۳ مخ کې د خره رنګ څه دی؟", listOf("Grey / Brown 🟤", "Red 🔴", "Yellow 🟡"), 0)
            )
        ),

        // PAGE 24: Ladybug
        DrawingBookStage(
            id = 24,
            pageNumber = "Page 24",
            unitTitle = "Insects & Nature",
            titleEn = "Colour the Ladybug",
            titleUr = "لیڈی بگ میں رنگ بھریں",
            titlePs = "سور ګونګټه رنګ کړئ",
            instructionEn = "Trace the round spotted Ladybug beetle, then paint its shell bright Red and spots Black!",
            instructionUr = "گول نقطوں والی لیڈی بگ بنائیں اور اس کے خول میں سرخ اور دھبوں میں کالا رنگ بھریں!",
            instructionPs = "ګرده خالداره ګونګټه رسم کړئ او شا یې سره او خالونه یې تور رنګ کړئ!",
            themeColor = Color(0xFFE53935),
            artworkType = DrawingArtworkType.PAGE24_LADYBUG,
            dotPathNorm = circleDots(0.52f, 0.54f, 0.28f, 0.24f, 16),
            colorZones = listOf(
                DrawingColorZone("Bright Red Shell", "چمکدار سرخ خول", "روښانه سره شا", Color(0xFFE53935), "Red", Offset(0.56f, 0.50f)),
                DrawingColorZone("Black Head & Spots", "سیاہ سر اور دھبے", "تور سر او خالونه", Color(0xFF263238), "Black", Offset(0.28f, 0.50f))
            ),
            lessons = listOf(
                DrawingLessonCard("Red Dome with Black Spots", "A ladybug has a shiny red dome back decorated with round black polka dots!", "لیڈی بگ کی پیٹھ چمکدار سرخ ہوتی ہے جس پر گول کالے دھبے ہوتے ہیں!", "د دې ګونګټې شا روښانه سره ده چې ګرد تور خالونه لري!", Color(0xFFE53935)),
                DrawingLessonCard("Garden Friend", "Ladybugs live on green leaves and help keep garden plants healthy.", "لیڈی بگ ہرے پتوں پر رہتی ہے اور پودوں کی حفاظت کرتی ہے۔", "دا ګونګټه په شنو پاڼو کې اوسیږي او بوټي ساتي.", Color(0xFF43A047))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour is the Ladybug's back shell?", "لیڈی بگ کی پیٹھ کا رنگ کیا ہوتا ہے؟", "د دې ګونګټې د شا رنګ څه دی؟", listOf("Red 🔴", "Blue 🔵", "Green 🟢"), 0),
                DrawingQuizQuestion("What colour are the round spots on the Ladybug?", "لیڈی بگ کے گول دھبوں کا رنگ کیا ہے؟", "د ګونګټې د ګردو خالونو رنګ څه دی؟", listOf("Black ⚫", "White ⚪", "Pink 🩷"), 0)
            )
        ),

        // PAGE 25: Scenery
        DrawingBookStage(
            id = 25,
            pageNumber = "Page 25",
            unitTitle = "Nature & Places",
            titleEn = "Colour the Scenery",
            titleUr = "خوبصورت منظر میں رنگ بھریں",
            titlePs = "ښکلې منظره رنګ کړئ",
            instructionEn = "Trace the cottage roof, walls, and trees, then paint the Roof Red, Walls Yellow, Door Blue, and Trees Green!",
            instructionUr = "گھر کی چھت، دیواروں اور درختوں کے نقطے ملائیں، پھر چھت سرخ، دیواریں پیلی اور درخت سبز رنگیں!",
            instructionPs = "د کور چت، دیوالونه او ونې رسم کړئ، بیا چت سور، دیوالونه ژېړ او ونې شنې رنګ کړئ!",
            themeColor = Color(0xFF43A047),
            artworkType = DrawingArtworkType.PAGE25_SCENERY,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.30f, 0.44f), Offset(0.52f, 0.20f), Offset(0.78f, 0.44f),
                    Offset(0.74f, 0.78f), Offset(0.34f, 0.78f), Offset(0.30f, 0.44f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Red House Roof", "سرخ چھت", "سور چت", Color(0xFFE53935), "Red", Offset(0.54f, 0.34f)),
                DrawingColorZone("Yellow House Walls", "پیلی دیواریں", "ژېړ دیوالونه", Color(0xFFFDD835), "Yellow", Offset(0.46f, 0.60f)),
                DrawingColorZone("Blue Door & Window", "نیلا دروازہ اور کھڑکی", "شنه دروازه او کړکۍ", Color(0xFF29B6F6), "Blue", Offset(0.62f, 0.64f)),
                DrawingColorZone("Green Trees & Bushes", "سبز درخت اور جھاڑیاں", "شنې ونې او بوټي", Color(0xFF43A047), "Green", Offset(0.20f, 0.56f))
            ),
            lessons = listOf(
                DrawingLessonCard("Shapes in a Scenery", "A house uses a Triangle/Trapezoid roof, Rectangle walls and door, and Square windows!", "گھر بنانے میں تکون چھت، مستطیل دیواریں اور چوکور کھڑکی استعمال ہوتی ہے!", "د کور په جوړولو کې مثلث چت، مستطیل دیوالونه او مربع کړکۍ کارول کیږي!", Color(0xFFE53935)),
                DrawingLessonCard("Green Trees Around", "Fluffy green trees and bushes make the home scenery fresh and peaceful.", "چاروں طرف ہرے بھرے درخت اور جھاڑیاں گھر کے منظر کو خوبصورت بناتی ہیں۔", "شاوخوا شنې ونې او بوټي د کور منظره ښکلې کوي.", Color(0xFF43A047))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour is the roof of the house on Page 25?", "صفحہ 25 پر گھر کی چھت کا رنگ کیا ہے؟", "په ۲۵ مخ کې د کور د چت رنګ څه دی؟", listOf("Red 🏠", "Black ⚫", "Purple 🟣"), 0),
                DrawingQuizQuestion("What colour are the trees and bushes around the house?", "گھر کے گرد درختوں اور جھاڑیوں کا رنگ کیا ہے؟", "د کور شاوخوا د ونو او بوټو رنګ څه دی؟", listOf("Green 🌳", "Pink 🩷", "Red 🔴"), 0)
            )
        ),

        // PAGE 26: Puppy
        DrawingBookStage(
            id = 26,
            pageNumber = "Page 26",
            unitTitle = "Birds & Animals",
            titleEn = "Colour the Puppy",
            titleUr = "کتے کے بچے (پپی) میں رنگ بھریں",
            titlePs = "کوچنی سپی رنګ کړئ",
            instructionEn = "Join the dots around the cute sitting Puppy and colour its fur Light and Dark Brown!",
            instructionUr = "نقطوں کو ملا کر پیارا پپی بنائیں اور اس میں ہلکا اور گہرا بھورا رنگ بھریں!",
            instructionPs = "ټکي سره ونښلوئ ترڅو ښکلی کوچنی سپی رسم کړئ او روښانه او تیاره نسواري رنګ ورکړئ!",
            themeColor = Color(0xFF8D6E63),
            artworkType = DrawingArtworkType.PAGE26_PUPPY,
            dotPathNorm = circleDots(0.50f, 0.50f, 0.24f, 0.28f, 16),
            colorZones = listOf(
                DrawingColorZone("Light Brown Fur", "ہلکا بھورا جسم", "روښانه نسواري بدن", Color(0xFFD7CCC8), "Light Tan", Offset(0.50f, 0.56f)),
                DrawingColorZone("Dark Brown Ears & Spots", "گہرے بھورے کان اور دھبے", "تیاره نسواري غوږونه او خالونه", Color(0xFF6D4C41), "Dark Brown", Offset(0.34f, 0.30f))
            ),
            lessons = listOf(
                DrawingLessonCard("Floppy Ears & Wagging Tail", "This friendly puppy has soft floppy ears, big round eyes, and brown spots on its back.", "اس پیارے پپی کے نرم لٹکتے کان، بڑی گول آنکھیں اور پیٹھ پر بھورے دھبے ہیں۔", "دا ښکلی کوچنی سپی نرم غوږونه، لویې ګردې سترګې او په شا نسواري خالونه لري.", Color(0xFF8D6E63)),
                DrawingLessonCard("Two-Tone Brown Fur", "Use light cream-brown for the puppy's body and rich chocolate brown for its ears and spots.", "پپی کے جسم کے لیے ہلکا بادامی اور کانوں و دھبوں کے لیے چاکلیٹی بھورا رنگ استعمال کریں۔", "د سپي د بدن لپاره روښانه نسواري او د غوږونو او خالونو لپاره تیاره نسواري رنګ وکاروئ.", Color(0xFF6D4C41))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What is a baby dog called?", "کتے کے چھوٹے بچے کو انگلش میں کیا کہتے ہیں؟", "د سپي وړوکي بچي ته په انګلیسي کې څه وایي؟", listOf("Puppy 🐶", "Kitten 🐱", "Duckling 🐤"), 0),
                DrawingQuizQuestion("What colour are the Puppy's ears and spots on Page 26?", "صفحہ 26 پر پپی کے کانوں اور دھبوں کا رنگ کیا ہے؟", "په ۲۶ مخ کې د کوچني سپي د غوږونو او خالونو رنګ څه دی؟", listOf("Brown 🟤", "Blue 🔵", "Green 🟢"), 0)
            )
        ),

        // PAGE 27: Sunglass
        DrawingBookStage(
            id = 27,
            pageNumber = "Page 27",
            unitTitle = "Everyday Objects",
            titleEn = "Colour the Sunglass",
            titleUr = "دھوپ کی عینک میں رنگ بھریں",
            titlePs = "د لمر عینکې رنګ کړئ",
            instructionEn = "Trace the cool Sunglasses frame and lenses, then paint the Frame Blue and Lenses Purple!",
            instructionUr = "دھوپ کی عینک کے فریم اور شیشوں کے نقطے ملائیں، پھر فریم میں نیلا اور شیشوں میں جامنی رنگ بھریں!",
            instructionPs = "د لمر عینکو چوکاټ او ښیښې رسم کړئ، بیا چوکاټ اسماني او ښیښې ارغواني رنګ کړئ!",
            themeColor = Color(0xFF5E35B1),
            artworkType = DrawingArtworkType.PAGE27_SUNGLASS,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.18f, 0.48f), Offset(0.38f, 0.26f), Offset(0.82f, 0.48f),
                    Offset(0.76f, 0.68f), Offset(0.50f, 0.58f), Offset(0.24f, 0.68f), Offset(0.18f, 0.48f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Blue Frame & Arms", "نیلا فریم", "اسماني چوکاټ", Color(0xFF29B6F6), "Sky Blue", Offset(0.50f, 0.44f)),
                DrawingColorZone("Purple Tinted Lenses", "جامنی شیشے", "ارغواني ښیښې", Color(0xFF7E57C2), "Purple", Offset(0.34f, 0.58f))
            ),
            lessons = listOf(
                DrawingLessonCard("Two Lenses & Ear Arms", "Sunglasses have two matching lenses joined by a nose bridge and two arms that rest on your ears.", "عینک میں دو شیشے ہوتے ہیں جو ناک کے اوپر جڑے ہوتے ہیں اور دو ڈنڈیاں کانوں پر ٹکتی ہیں۔", "عینکې دوه ښیښې لري چې د پوزې پر سر نښتې وي او دوه لاستي لري چې پر غوږونو ایښودل کیږي.", Color(0xFF29B6F6)),
                DrawingLessonCard("Sun Protection", "Tinted purple lenses protect our eyes on bright sunny days!", "جامنی رنگ کے شیشے تیز دھوپ میں ہماری آنکھوں کی حفاظت کرتے ہیں!", "ارغواني ښیښې په تېز لمر کې زموږ سترګې ساتي!", Color(0xFF7E57C2))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("Which part of the body do Sunglasses protect?", "دھوپ کی عینک جسم کے کس حصے کی حفاظت کرتی ہے؟", "د لمر عینکې د بدن کومه برخه ساتي؟", listOf("Our Eyes 😎", "Our Hands  hands", "Our Feet 🦶"), 0),
                DrawingQuizQuestion("What colours are the Sunglasses on Page 27?", "صفحہ 27 پر عینک میں کون سے رنگ بھرے گئے ہیں؟", "په ۲۷ مخ کې عینکو ته کوم رنګونه ورکړل شوي دي؟", listOf("Blue & Purple 💙💜", "Red & Yellow", "Brown & Black"), 0)
            )
        ),

        // PAGE 28: Flower
        DrawingBookStage(
            id = 28,
            pageNumber = "Page 28",
            unitTitle = "Flowers & Plants",
            titleEn = "Colour the Flower",
            titleUr = "پھول میں رنگ بھریں",
            titlePs = "ګل رنګ کړئ",
            instructionEn = "Trace the 6 round petals, center circle, stem, and leaf, then paint them Red, Yellow, and Green!",
            instructionUr = "پھول کی 6 گول پنکھڑیوں، درمیانی دائرے اور پتے کے نقطے ملائیں اور سرخ، پیلا اور سبز رنگ بھریں!",
            instructionPs = "د ګل ۶ ګردې پاڼې، منځنۍ دایره او شنه پاڼه رسم کړئ او سور، ژېړ او شین رنګ ورکړئ!",
            themeColor = Color(0xFFE53935),
            artworkType = DrawingArtworkType.PAGE28_FLOWER,
            dotPathNorm = circleDots(0.50f, 0.38f, 0.22f, 0.22f, 14) +
                listOf(Offset(0.50f, 0.60f), Offset(0.50f, 0.84f), Offset(0.68f, 0.72f)),
            colorZones = listOf(
                DrawingColorZone("Red Petals", "سرخ پنکھڑیاں", "سرې ګل پاڼې", Color(0xFFE53935), "Red", Offset(0.50f, 0.22f)),
                DrawingColorZone("Yellow Centre", "پیلا درمیانی دائرہ", "ژېړ منځ", Color(0xFFFDD835), "Yellow", Offset(0.50f, 0.38f)),
                DrawingColorZone("Green Stem & Leaf", "سبز ڈنڈی اور پتہ", "شین ډنډر او پاڼه", Color(0xFF43A047), "Green", Offset(0.64f, 0.72f))
            ),
            lessons = listOf(
                DrawingLessonCard("6 Petals Around a Circle", "Start with a yellow circle in the centre and surround it with 6 bright red petals!", "درمیان میں پیلا دائرہ بنائیں اور اس کے گرد 6 شوخ سرخ پنکھڑیاں بنائیں!", "په منځ کې ژېړه دایره رسم کړئ او شاوخوا یې ۶ سرې پاڼې جوړې کړئ!", Color(0xFFE53935)),
                DrawingLessonCard("Green Stem & Leaf", "Add a green stem and leaf at the bottom so the flower can grow tall.", "نیچے سبز ڈنڈی اور پتہ بنائیں جس پر پھول کھلتا ہے۔", "لاندې شین ډنډر او پاڼه رسم کړئ چې ګل پرې ولاړ وي.", Color(0xFF43A047))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("How many red petals does the Flower on Page 28 have?", "صفحہ 28 پر پھول کی کتنی سرخ پنکھڑیاں ہیں؟", "په ۲۸ مخ کې ګل څو سرې پاڼې لري؟", listOf("6", "2", "10"), 0),
                DrawingQuizQuestion("What colour is the round centre of the Flower?", "پھول کے درمیانی دائرے کا رنگ کیا ہے؟", "د ګل د منځنۍ دایرې رنګ څه دی؟", listOf("Yellow 🟡", "Black ⚫", "Blue 🔵"), 0)
            )
        ),

        // PAGE 29: Bananas & Clay Model
        DrawingBookStage(
            id = 29,
            pageNumber = "Page 29",
            unitTitle = "Fruits & Clay Craft",
            titleEn = "Colour the Bananas",
            titleUr = "کیلوں میں رنگ بھریں",
            titlePs = "کېلې رنګ کړئ",
            instructionEn = "Trace the curved bunch of 3 Bananas and paint them bright Sunny Yellow!",
            instructionUr = "تین مڑے ہوئے کیلوں کے گچھے کے نقطے ملائیں اور ان میں چمکدار پیلا رنگ بھریں!",
            instructionPs = "د دریو کږو کېلو وږی رسم کړئ او روښانه ژېړ رنګ ورکړئ!",
            themeColor = Color(0xFFFBC02D),
            artworkType = DrawingArtworkType.PAGE29_BANANAS,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.30f, 0.24f), Offset(0.24f, 0.56f), Offset(0.54f, 0.78f),
                    Offset(0.76f, 0.62f), Offset(0.56f, 0.42f), Offset(0.34f, 0.24f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Sunny Yellow Bananas", "پیلے کیلے", "ژېړې کېلې", Color(0xFFFDD835), "Yellow", Offset(0.48f, 0.56f)),
                DrawingColorZone("Golden Banana Tips", "سنہری سرے", "طلایي څوکې", Color(0xFFF57F17), "Golden Tip", Offset(0.32f, 0.24f))
            ),
            lessons = listOf(
                DrawingLessonCard("Curved Yellow Bananas", "Bananas have a smooth crescent curve and turn bright yellow when ripe.", "کیلے ہلال کی طرح مڑے ہوئے ہوتے ہیں اور پکنے پر چمکدار پیلے ہو جاتے ہیں۔", "کېلې د میاشتې په څېر کږې وي او کله چې پخې شي روښانه ژېړې شي.", Color(0xFFFBC02D)),
                DrawingLessonCard("Clay / Plaster Activity", "Teacher Activity: Roll soft clay or plaster of Paris in your palms to sculpt a 3D banana model!", "سرگرمی: چکنی مٹی یا پلاسٹر آف پیرس کو ہاتھوں سے رول کر کے کیلے کا ماڈل بنائیں!", "فعالیت: له خټې یا پلاستیکي اوړو څخه په لاسونو د کېلې ماډل جوړ کړئ!", Color(0xFF8D6E63))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What colour are ripe Bananas?", "پکے ہوئے کیلوں کا رنگ کیا ہوتا ہے؟", "د پخو کېلو رنګ څه دی؟", listOf("Yellow 🍌", "Blue 🔵", "Purple 🟣"), 0),
                DrawingQuizQuestion("How many Bananas are in the bunch on Page 29?", "صفحہ 29 پر گچھے میں کتنے کیلے ہیں؟", "په ۲۹ مخ کې په وږي کې څو کېلې دي؟", listOf("3", "1", "7"), 0)
            )
        ),

        // PAGE 30: Step-by-Step Bear Face
        DrawingBookStage(
            id = 30,
            pageNumber = "Page 30",
            unitTitle = "Step-by-Step Drawing",
            titleEn = "Step-by-Step Bear Face",
            titleUr = "مرحلہ وار ریچھ کا چہرہ بنائیں",
            titlePs = "په ۴ ګامونو کې د یږ مخ رسم کړئ",
            instructionEn = "Follow Steps 1 to 4: Trace the Circle head, round Ears, Eyes & Nose, then paint your Bear Brown!",
            instructionUr = "4 مراحل مکمل کریں: گول چہرہ، کان، آنکھیں اور ناک بنائیں، پھر ریچھ میں بھورا رنگ بھریں!",
            instructionPs = "۴ ګامونه بشپړ کړئ: ګرد سر، غوږونه، سترګې او پوزه رسم کړئ، بیا یږ نسواري رنګ کړئ!",
            themeColor = Color(0xFF6D4C41),
            artworkType = DrawingArtworkType.PAGE30_STEP_BEAR,
            dotPathNorm = circleDots(0.50f, 0.54f, 0.24f, 0.24f, 14),
            colorZones = listOf(
                DrawingColorZone("Brown Bear Face", "بھورا چہرہ", "نسواري مخ", Color(0xFF795548), "Brown", Offset(0.50f, 0.44f)),
                DrawingColorZone("Light Brown Muzzle & Ears", "ہلکا بھورا دہانہ اور کان", "روښانه نسواري خوله او غوږونه", Color(0xFFA1887F), "Light Brown", Offset(0.50f, 0.66f))
            ),
            lessons = listOf(
                DrawingLessonCard("Step 1 & Step 2: Circle + Ears", "Step 1: Draw a big circle with a curved chin line. Step 2: Add two half-circle ears on top!", "مرحلہ 1: ایک بڑا گول دائرہ بنائیں۔ مرحلہ 2: اوپر دو گول کان بنائیں!", "لومړی ګام: یوه لویه دایره رسم کړئ. دوهم ګام: په سر یې دوه ګرد غوږونه اضافه کړئ!", Color(0xFF8D6E63)),
                DrawingLessonCard("Step 3 & Step 4: Face + Colour", "Step 3: Add two round eyes, a nose, and a smile. Step 4: Colour the bear face warm brown!", "مرحلہ 3: دو گول آنکھیں، ناک اور مسکراہٹ بنائیں۔ مرحلہ 4: ریچھ کے چہرے میں بھورا رنگ بھریں!", "دریم ګام: دوه سترګې، پوزه او خوله جوړه کړئ. څلورم ګام: د یږ مخ نسواري رنګ کړئ!", Color(0xFF5D4037))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What is Step 1 when drawing the Bear Face on Page 30?", "صفحہ 30 پر ریچھ کا چہرہ بنانے کا پہلا مرحلہ کیا ہے؟", "په ۳۰ مخ کې د یږ د مخ رسمولو لومړی ګام څه دی؟", listOf("Draw a Circle ⭕", "Draw a Square 🟦", "Draw a Star ⭐"), 0),
                DrawingQuizQuestion("What do we add in Step 2 of the Bear Face?", "دوسرے مرحلے میں ریچھ کے سر پر کیا بنایا جاتا ہے؟", "په دوهم ګام کې د یږ په سر څه اضافه کیږي؟", listOf("Two Round Ears 🐻", "Wings 🪽", "Horns 🐐"), 0)
            )
        ),

        // PAGE 31: Step-by-Step House
        DrawingBookStage(
            id = 31,
            pageNumber = "Page 31",
            unitTitle = "Step-by-Step Drawing",
            titleEn = "Step-by-Step House",
            titleUr = "مرحلہ وار گھر بنائیں",
            titlePs = "په ۴ ګامونو کې کور رسم کړئ",
            instructionEn = "Follow Steps 1 to 4: Trace the Triangle roof, Square wall + Chimney, Door + Window, then colour your House!",
            instructionUr = "4 مراحل مکمل کریں: تکون چھت، چوکور دیوار، چمنی، دروازہ اور کھڑکی بنائیں اور رنگ بھریں!",
            instructionPs = "۴ ګامونه بشپړ کړئ: مثلث چت، مربع دیوال، دودکش، دروازه او کړکۍ رسم کړئ او رنګ ورکړئ!",
            themeColor = Color(0xFF1E88E5),
            artworkType = DrawingArtworkType.PAGE31_STEP_HOUSE,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.50f, 0.18f), Offset(0.24f, 0.44f), Offset(0.76f, 0.44f), Offset(0.50f, 0.18f),
                    Offset(0.72f, 0.44f), Offset(0.72f, 0.80f), Offset(0.28f, 0.80f), Offset(0.28f, 0.44f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Brown Triangle Roof", "بھوری تکون چھت", "نسواري مثلث چت", Color(0xFF6D4C41), "Brown", Offset(0.50f, 0.34f)),
                DrawingColorZone("Red Chimney", "سرخ چمنی", "سور دودکش", Color(0xFFE53935), "Red", Offset(0.34f, 0.24f)),
                DrawingColorZone("Yellow House Wall", "پیلی دیوار", "ژېړ دیوال", Color(0xFFE6CE6A), "Warm Yellow", Offset(0.42f, 0.62f)),
                DrawingColorZone("Blue Door & Window", "نیلا دروازہ اور کھڑکی", "شنه دروازه او کړکۍ", Color(0xFF29B6F6), "Blue", Offset(0.60f, 0.66f))
            ),
            lessons = listOf(
                DrawingLessonCard("Step 1 & Step 2: Roof + Wall", "Step 1: Draw a big Triangle roof. Step 2: Add a Square wall underneath and a chimney on top!", "مرحلہ 1: ایک تکون چھت بنائیں۔ مرحلہ 2: نیچے چوکور دیوار اور اوپر چمنی بنائیں!", "لومړی ګام: مثلث چت رسم کړئ. دوهم ګام: لاندې مربع دیوال او پورته دودکش اضافه کړئ!", Color(0xFF6D4C41)),
                DrawingLessonCard("Step 3 & Step 4: Door, Window & Colour", "Step 3: Draw a rectangle door and a square window. Step 4: Colour the roof brown, wall yellow, and door blue!", "مرحلہ 3: دروازہ اور کھڑکی بنائیں۔ مرحلہ 4: چھت میں بھورا، دیوار میں پیلا اور دروازے میں نیلا رنگ بھریں!", "دریم ګام: دروازه او کړکۍ رسم کړئ. څلورم ګام: چت نسواري، دیوال ژېړ او دروازه اسماني رنګ کړئ!", Color(0xFF29B6F6))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What shape is drawn in Step 1 to make the House roof?", "گھر کی چھت بنانے کے لیے پہلے مرحلے میں کون سی شکل بنائی جاتی ہے؟", "د کور د چت جوړولو لپاره په لومړي ګام کې کوم شکل رسم کیږي؟", listOf("Triangle 🔺", "Circle ⭕", "Oval 🥚"), 0),
                DrawingQuizQuestion("What colour are the Door and Window of the House on Page 31?", "صفحہ 31 پر گھر کے دروازے اور کھڑکی کا رنگ کیا ہے؟", "په ۳۱ مخ کې د کور د دروازې او کړکۍ رنګ څه دی؟", listOf("Blue 🟦", "Pink 🩷", "Black ⚫"), 0)
            )
        ),

        // PAGE 32: Origami Making Cat Face
        DrawingBookStage(
            id = 32,
            pageNumber = "Page 32",
            unitTitle = "Paper Folding Craft",
            titleEn = "Origami Paper Cat Face",
            titleUr = "کاغذ تہہ کر کے بلی کا چہرہ بنائیں",
            titlePs = "له کاغذ څخه د پیشو مخ جوړول",
            instructionEn = "Trace the Origami fold lines to fold a Square paper into a cute Cat Face, then colour it Golden Yellow!",
            instructionUr = "چوکور کاغذ کو تہہ کرنے کی لکیروں کے نقطے ملائیں اور کاغذ کی پیاری بلی بنائیں!",
            instructionPs = "د کاغذ قاتولو کرښې رسم کړئ ترڅو له مربع کاغذ څخه د پیشو مخ جوړ کړئ!",
            themeColor = Color(0xFFFFB300),
            artworkType = DrawingArtworkType.PAGE32_ORIGAMI_CAT,
            dotPathNorm = polygonDots(
                listOf(
                    Offset(0.32f, 0.24f), Offset(0.42f, 0.36f), Offset(0.58f, 0.36f), Offset(0.68f, 0.24f),
                    Offset(0.74f, 0.56f), Offset(0.50f, 0.80f), Offset(0.26f, 0.56f), Offset(0.32f, 0.24f)
                ), 3
            ),
            colorZones = listOf(
                DrawingColorZone("Golden Paper Face", "سنہری کاغذی چہرہ", "طلایي کاغذي مخ", Color(0xFFFFCA28), "Golden Yellow", Offset(0.50f, 0.56f)),
                DrawingColorZone("Folded Cat Ears", "مڑے ہوئے کان", "قات شوي غوږونه", Color(0xFFFFA000), "Amber Gold", Offset(0.34f, 0.34f))
            ),
            lessons = listOf(
                DrawingLessonCard("Steps 1 to 3: Fold Square into Triangle", "Start with a square diamond paper, fold it in half into a triangle, then fold the left and right corners up to make cat ears!", "چوکور کاغذ کو آدھا موڑ کر تکون بنائیں، پھر دونوں کونوں کو اوپر موڑ کر بلی کے کان بنائیں!", "مربع کاغذ نیم قات کړئ ترڅو مثلث شي، بیا دواړه کونجونه پورته قات کړئ ترڅو د پیشو غوږونه جوړ شي!", Color(0xFFFFB300)),
                DrawingLessonCard("Steps 4 to 6: Fold Top Tip & Draw Whiskers", "Fold the top corner down, flip the paper over, and draw cute eyes, nose, and whiskers!", "اوپر والا کونہ نیچے موڑیں، کاغذ پلٹیں اور بلی کی آنکھیں، ناک اور مونچھیں بنائیں!", "پورتنۍ څوکه ښکته قات کړئ، کاغذ واړوئ او د پیشو سترګې، پوزه او بریتونه رسم کړئ!", Color(0xFF6D4C41))
            ),
            quizQuestions = listOf(
                DrawingQuizQuestion("What shape of paper do we start with to fold the Origami Cat Face?", "کاغذ کی بلی بنانے کے لیے ہم کس شکل کے کاغذ سے شروعات کرتے ہیں؟", "د کاغذي پیشو جوړولو لپاره موږ له کوم شکل کاغذ څخه پیل کوو؟", listOf("Square Paper 🟨", "Round Ball ⚽", "Stick 🪵"), 0),
                DrawingQuizQuestion("What do we draw on the finished paper Cat Face in Step 6?", "آخری مرحلے میں کاغذ کی بلی کے چہرے پر کیا بنایا جاتا ہے؟", "په شپږم ګام کې د کاغذي پیشو پر مخ څه رسم کیږي؟", listOf("Eyes, Nose & Whiskers 🐱", "Wheels 🛞", "Leaves 🌿"), 0)
            )
        )
    )
}
