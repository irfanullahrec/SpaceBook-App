package com.example.spacebookapp.ui.screens

import android.speech.tts.TextToSpeech
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.scaleIn
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.VolumeUp
import androidx.compose.material.icons.filled.RecordVoiceOver
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import java.util.Locale

data class UrduGKCard(
    val mainTitle: String,
    val meaningUr: String,
    val meaningPs: String,
    val meaningEn: String,
    val color: Color
)

data class UrduGKStage(
    val id: Int,
    val unitTitle: String,
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
    val cards: List<UrduGKCard>,
    val quizzes: List<NazeraQuizQuestion>
)

object Class1UrduRepository {
    val stages: List<UrduGKStage> = listOf(
        UrduGKStage(
            id = 1,
            unitTitle = "سبق 1 • Lesson 1",
            titleUr = "حروفِ تہجی (ا تا ی) اور مصوتے",
            titlePs = "د اردو توري (ا تر ے) او غږونه",
            titleEn = "Urdu Alphabet (Alif to Yaa) & Vowels",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF075985),
            summaryUr = "اردو حروفِ تہجی الف (آ، ا) سے لے کر چھوٹی ی اور بڑی ے تک ہیں، اور چار مصوتے (ا، و، ی، ے) الفاظ بنانے میں مدد دیتے ہیں۔",
            summaryPs = "په دې لوست کې د اردو ژبې توري له الف څخه تر ے پورې او څلور مصوتې (ا، و، ی، ے) زده کوو.",
            summaryEn = "Learn the Urdu alphabet from Alif to Bari Ye and the 4 vowel letters (ا، و، ی، ے) used to build words.",
            promptUr = "اردو حروف اور الفاظ کو ان کے درست معنی سے ملائیں!",
            promptPs = "د اردو توري او کلیمې له سمې معنی سره وصل کړئ!",
            promptEn = "Match each Urdu letter group or word with its meaning!",
            cards = listOf(
                UrduGKCard("آ (آم) • ا (انار)", "آم اور انار (الف مد آ اور الف)", "ام او انار", "Mango & Pomegranate", Color(0xFF0284C7)),
                UrduGKCard("ب (بلی) • پ (پتنگ) • ت (تتلی)", "بے، پے اور تے کے الفاظ", "پشۍ، کاغذباد او پتنګ", "Cat, Kite & Butterfly", Color(0xFF059669)),
                UrduGKCard("ج (جوتا) • چ (چاند) • ح (حلوائی)", "جیم کے خاندان کے حروف", "بوټ، سپوږمۍ او حلوایي", "Shoe, Moon & Sweet-maker", Color(0xFF7C3AED)),
                UrduGKCard("مَصَوَّتَے: ا ، و ، ی ، ے", "با، بو، بی، بے (چار مصوتے)", "د اردو څلور مصوتې", "Four Urdu Vowel Letters", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Which word starts with 'آ' (Alif Madd Aa)?",
                    "ان میں سے کون سا لفظ 'آ' (الف مد آ) سے شروع ہوتا ہے؟",
                    "په لاندې کلیمو کې کومه یوه په 'آ' پیل کېږي؟",
                    "آ",
                    listOf("آم (Mango)", "بکری (Goat)", "کتاب (Book)"),
                    0
                )
            )
        ),
        UrduGKStage(
            id = 2,
            unitTitle = "سبق 2 • Lesson 2",
            titleUr = "حمد باری تعالیٰ اور نعتِ رسول مقبول ﷺ",
            titlePs = "حمد او د خوږ نبي ﷺ نعت",
            titleEn = "Hamd (Praise of Allah) & Naat ﷺ",
            themeColor = Color(0xFF059669),
            secondaryColor = Color(0xFF064E3B),
            summaryUr = "جس نظم میں اللہ تعالیٰ کی تعریف بیان ہو اسے حمد کہتے ہیں اور جس نظم میں حضرت محمد ﷺ کی تعریف ہو اسے نعت کہتے ہیں۔",
            summaryPs = "هغه نظم چې د الله تعالی ستاینه پکې وي حمد او هغه چې د حضرت محمد ﷺ ستاینه پکې وي نعت بلل کېږي.",
            summaryEn = "A poem praising Allah is called Hamd, and a poem praising Prophet Muhammad ﷺ is called Naat.",
            promptUr = "حمد اور نعت کے الفاظ کو درست معنی سے ملائیں!",
            promptPs = "د حمد او نعت کلیمې له سمې معنی سره وصل کړئ!",
            promptEn = "Match the Urdu words from Hamd and Naat!",
            cards = listOf(
                UrduGKCard("حَمْد (اللہ کی تعریف)", "پھول، تارے، چاند اور سورج سب اللہ نے بنائے", "د الله تعالی ستاینه", "Praise of Allah Almighty", Color(0xFF059669)),
                UrduGKCard("نَعْت (حضور ﷺ کی شان)", "ہمارے پیارے نبی حضرت محمد ﷺ سب سے اچھے ہیں", "د نبي کریم ﷺ ستاینه", "Praise of Prophet Muhammad ﷺ", Color(0xFF2563EB)),
                UrduGKCard("سچائی اور رحم دلی", "ہمیشہ سچ بولنا اور سب پر مہربانی کرنا", "رښتیا ویل او مهرباني کول", "Truthfulness & Kindness", Color(0xFF7C3AED)),
                UrduGKCard("دُعا (اے اللہ میرے علم میں اضافہ فرما)", "ربِّ زدنی علماً", "ای الله زما علم زیات کړه", "Prayer for Knowledge", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What do we call a poem in praise of Allah Almighty?",
                    "جس نظم میں اللہ تعالیٰ کی تعریف بیان کی جائے اسے کیا کہتے ہیں؟",
                    "هغه نظم چې د الله تعالی ستاینه پکې وي څه ورته وایي؟",
                    "اللہ کی تعریف",
                    listOf("حمد (Hamd)", "کہانی (Story)", "خط (Letter)"),
                    0
                )
            )
        ),
        UrduGKStage(
            id = 3,
            unitTitle = "سبق 3 • Lesson 3",
            titleUr = "میرا خاندان، میرا گھر اور میرا سکول",
            titlePs = "زما کورنۍ، زما کور او زما ښوونځی",
            titleEn = "My Family, My Home & My School",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            summaryUr = "میرا نام علی ہے۔ میرے گھر میں امی، ابو، دادا، دادی اور بہن بھائی پیار سے رہتے ہیں۔ ہم روزانہ صاف لباس پہن کر سکول جاتے ہیں۔",
            summaryPs = "په کور کې مور، پلار، نیکه، نیا او خویندې وروڼه په مینه ژوند کوي او هره ورځ ښوونځي ته ځي.",
            summaryEn = "Learn Urdu sentences about family members, keeping our home clean, and respecting teachers at school.",
            promptUr = "خاندان اور سکول کے الفاظ کو درست جملے سے ملائیں!",
            promptPs = "د کورنۍ او ښوونځي کلیمې له سم ځواب سره وصل کړئ!",
            promptEn = "Match the Urdu words about Family and School!",
            cards = listOf(
                UrduGKCard("اَمِّی اور اَبُّو", "والدین کا ادب کریں اور ان کا کہنا مانیں", "مور او پلار", "Mother and Father", Color(0xFF7C3AED)),
                UrduGKCard("مِیرا سَکُول", "سکول میں ہم پڑھنا لکھنا اور اچھی باتیں سیکھتے ہیں", "زما ښوونځی", "My School", Color(0xFF0284C7)),
                UrduGKCard("صَفَائی نِصْف اِیمَان ہے", "گھر، گلی اور کمرۂ جماعت کو صاف رکھیں", "صفایي نیم ایمان دی", "Cleanliness is Half of Faith", Color(0xFF059669)),
                UrduGKCard("اُستاد کا اِحتِرام", "استاد ہمیں علم سکھاتے ہیں، ان کو سلام کریں", "د استاد درناوی", "Respecting the Teacher", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Where do we go every morning to read, write, and learn?",
                    "ہم ہر روز صبح پڑھنے اور لکھنے کے لیے کہاں جاتے ہیں؟",
                    "موږ هر سهار د لوستلو او لیکلو لپاره چیرته ځو؟",
                    "📚 تعلیم",
                    listOf("سکول (School)", "بازار (Market)", "کھیل کا میدان"),
                    0
                )
            )
        ),
        UrduGKStage(
            id = 4,
            unitTitle = "سبق 4 • Lesson 4",
            titleUr = "پھل، سبزیاں، جانور اور پیارا وطن پاکستان",
            titlePs = "مېوې، سابه، څاروي او ګران هېواد پاکستان",
            titleEn = "Fruits, Vegetables, Animals & Beloved Pakistan",
            themeColor = Color(0xFF16A34A),
            secondaryColor = Color(0xFF14532D),
            summaryUr = "سیب، آم، کیلا اور مالٹا میٹھے پھل ہیں۔ ہمارے پیارے وطن کا نام پاکستان ہے اور اس کا جھنڈا سبز اور سفید ہے۔",
            summaryPs = "مڼه، ام او کېله خوږې مېوې دي. زمونږ د ګران هېواد نوم پاکستان دی او بیرغ یې شین او سپین دی.",
            summaryEn = "Learn Urdu names of fruits, animals, colours, and our beloved country Pakistan.",
            promptUr = "اردو الفاظ کو ان کی درست پہچان سے ملائیں!",
            promptPs = "د مېوو، څارویو او پاکستان کلیمې وصل کړئ!",
            promptEn = "Match the Urdu words with their meanings!",
            cards = listOf(
                UrduGKCard("سَیب ، آم ، کِیلا ، اَنار", "تازہ اور صحت بخش پھل", "تازه او خوږې مېوې", "Fresh & Healthy Fruits", Color(0xFFDC2626)),
                UrduGKCard("شَیر ، ہَاتھی ، بِلی ، بَکری", "جنگلی اور پالتو جانور", "وحشي او کورني څاروي", "Wild & Domestic Animals", Color(0xFFD97706)),
                UrduGKCard("مِیرا وَطَن پَاکِستَان", "پاکستان کا پرچم سبز اور سفید ہے", "زمونږ ګران هېواد پاکستان", "My Homeland Pakistan", Color(0xFF16A34A)),
                UrduGKCard("قَائِدِ اَعظَم مُحَمَّد عَلی جِنَاح", "پاکستان کے بانی (بابائے قوم)", "د پاکستان بنسټ ایښودونکی", "Founder of Pakistan", Color(0xFF0284C7))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What are the two colours of Pakistan's national flag?",
                    "پاکستان کے قومی جھنڈے میں کون سے دو رنگ ہیں؟",
                    "د پاکستان په ملي بیرغ کې کوم دوه رنګونه دي؟",
                    "🇵🇰 قومی پرچم",
                    listOf("سبز اور سفید (Green & White)", "سرخ اور پیلا", "نیلا اور کالا"),
                    0
                )
            )
        )
    )
}

object Class1GKRepository {
    val stages: List<UrduGKStage> = listOf(
        UrduGKStage(
            id = 1,
            unitTitle = "Unit 1 • باب 1",
            titleUr = "میرا تعارف اور میرے جسم کے حصے",
            titlePs = "زما پېژندنه او زما د بدن غړي",
            titleEn = "Myself & Parts of My Body (5 Senses)",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF115E59),
            summaryUr = "اللہ تعالیٰ نے ہمیں آنکھیں دیکھنے کے لیے، کان سننے کے لیے، ناک سونگھنے کے لیے، زبان چکھنے کے لیے اور ہاتھ چھونے کے لیے دیے ہیں۔",
            summaryPs = "الله تعالی موږ ته سترګې د لیدلو، غوږونه د اورېدلو، پوزه د بویولو، ژبه د څکلو او لاسونه د کار لپاره راکړي دي.",
            summaryEn = "We have 5 senses: Eyes to see, Ears to hear, Nose to smell, Tongue to taste, and Skin/Hands to touch.",
            promptUr = "جسم کے حصوں اور ان کے کام کو آپس میں ملائیں!",
            promptPs = "د بدن غړي له خپلو دندو سره وصل کړئ!",
            promptEn = "Match each body part with its function!",
            cards = listOf(
                UrduGKCard("👀 Eyes (آنکھیں / سترګې)", "آنکھوں سے ہم دنیا کی خوبصورت چیزیں دیکھتے ہیں", "په سترګو موږ وینو", "We see with our eyes", Color(0xFF0D9488)),
                UrduGKCard("👂 Ears (کان / غوږونه)", "کانوں سے ہم آوازیں سنتے ہیں", "په غوږونو غږونه اورو", "We hear sounds with our ears", Color(0xFF2563EB)),
                UrduGKCard("👃 Nose (ناک / پوزه)", "ناک سے ہم سانس لیتے ہیں اور خوشبو سونگھتے ہیں", "په پوزه بوی حس کوو", "We breathe and smell with our nose", Color(0xFF7C3AED)),
                UrduGKCard("👅 Tongue & ✋ Hands", "زبان سے ذائقہ چکھتے ہیں اور ہاتھوں سے کام کرتے ہیں", "په ژبه خوند او په لاسونو کار کوو", "Taste with tongue & work with hands", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "How many senses do human beings have?",
                    "انسان کی کل کتنی حِسّیں (Senses) ہوتی ہیں؟",
                    "انسان ټول څو حواس لري؟",
                    "👀 👂 👃 👅 ✋",
                    listOf("5 Senses (پانچ حِسّیں)", "2 Senses", "10 Senses"),
                    0
                )
            )
        ),
        UrduGKStage(
            id = 2,
            unitTitle = "Unit 2 • باب 2",
            titleUr = "صفائی، اچھی خوراک اور صحت",
            titlePs = "پاکوالی، ښه خواړه او روغتیا",
            titleEn = "Keeping Clean, Healthy Food & Safety",
            themeColor = Color(0xFF2563EB),
            secondaryColor = Color(0xFF1E3A8A),
            summaryUr = "روزانہ دانت صاف کرنا، کھانے سے پہلے صابن سے ہاتھ دھونا، دودھ، پھل اور سبزیاں کھانا ہمیں صحت مند اور توانا رکھتا ہے۔",
            summaryPs = "هره ورځ غاښونه پاکول، له خوړو مخکې لاسونه مینځل، شیدې، مېوې او سابه خوړل موږ روغ ساتي.",
            summaryEn = "Brush your teeth twice a day, wash hands with soap before meals, and eat milk, fruits, and vegetables to stay healthy.",
            promptUr = "صحت اور صفائی کی عادتوں کو درست جواب سے ملائیں!",
            promptPs = "د روغتیا او پاکوالي عادتونه وصل کړئ!",
            promptEn = "Match each healthy habit with its benefit!",
            cards = listOf(
                UrduGKCard("🪥 Brushing Teeth (دانت صاف کرنا)", "صبح اور رات سونے سے پہلے مسواک یا برش کریں", "سهار او شپه غاښونه برس کړئ", "Brush teeth every morning and night", Color(0xFF2563EB)),
                UrduGKCard("🧼 Washing Hands (ہاتھ دھونا)", "کھانے سے پہلے اور بعد صابن سے ہاتھ دھوئیں", "له خوړو مخکې په صابون لاسونه ووینځئ", "Wash hands with soap to stop germs", Color(0xFF059669)),
                UrduGKCard("🥛🍎 Healthy Food (دودھ، پھل، سبزیاں)", "دودھ، انڈا، سیب اور سبزیاں طاقت دیتی ہیں", "شیدې، هګۍ او مېوې انرژي راکوي", "Milk, eggs, and fruits make us strong", Color(0xFFD97706)),
                UrduGKCard("🚦 Traffic Lights (ٹریفک کے اشارے)", "سرخ = رکو، پیلا = تیار، سبز = چلو", "سور = ودرېږئ، ژېړ = چمتو، شین = لاړ شئ", "Red = Stop, Yellow = Ready, Green = Go", Color(0xFFDC2626))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What does the GREEN traffic light mean?",
                    "ٹریفک کی سبز (ہری) بتی کا کیا مطلب ہوتا ہے؟",
                    "د ترافیکو شین څراغ څه معنی لري؟",
                    "🟢 Green Light",
                    listOf("Go (چلو)", "Stop (رکو)", "Sleep"),
                    0
                )
            )
        ),
        UrduGKStage(
            id = 3,
            unitTitle = "Unit 3 • باب 3",
            titleUr = "پودے، جانور اور جاندار و بے جان اشیاء",
            titlePs = "بوټي، څاروي، ژوندي او بې ساه شیان",
            titleEn = "Living & Non-Living Things, Plants & Animals",
            themeColor = Color(0xFF16A34A),
            secondaryColor = Color(0xFF14532D),
            summaryUr = "جاندار چیزیں (انسان، پودے، جانور) سانس لیتی ہیں اور بڑھتی ہیں۔ بے جان چیزیں (میز، کرسی، پتھر) سانس نہیں لیتیں۔",
            summaryPs = "ژوندي شیان (انسانان، بوټي، څاروي) ساه اخلي او غټېږي. بې ساه شیان (مېز، څوکۍ، ډبره) وده نه کوي.",
            summaryEn = "Living things (humans, plants, animals) breathe, eat, and grow. Non-living things (chair, book, rock) do not grow.",
            promptUr = "جاندار، بے جان اور پودوں کے حصوں کو ملائیں!",
            promptPs = "د بوټو او ژوندیو شیانو برخې وصل کړئ!",
            promptEn = "Match the Science & Nature facts!",
            cards = listOf(
                UrduGKCard("🌱 Living Things (جاندار اشیاء)", "انسان، پودے، پرندے اور جانور بڑھتے اور سانس لیتے ہیں", "انسانان، بوټي او څاروي ژوندي دي", "Humans, plants & animals grow and breathe", Color(0xFF16A34A)),
                UrduGKCard("🪑 Non-Living Things (بے جان اشیاء)", "کرسی، میز، پنسل اور پتھر بے جان ہیں", "څوکۍ، مېز او کاڼی بې ساه دي", "Chair, table, pencil & stone do not grow", Color(0xFF475569)),
                UrduGKCard("🌻 Parts of a Plant (پودے کے حصے)", "جڑ، تنا، پتے، پھول اور پھل", "ریښه، ډنډر، پاڼې، ګل او مېوه", "Roots, Stem, Leaves, Flower & Fruit", Color(0xFFD97706)),
                UrduGKCard("🐄 Domestic vs 🦁 Wild Animals", "گائے، بکری پالتو ہیں؛ شیر، ہاتھی جنگلی جانور ہیں", "کورني او ځنګلي څاروي", "Cow & goat are farm animals; Lion is wild", Color(0xFF0284C7))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "Which of the following is a LIVING thing that grows?",
                    "ان میں سے کون سی چیز جاندار ہے جو بڑھتی ہے؟",
                    "په لاندې شیانو کې کوم یو ژوندی دی چې وده کوي؟",
                    "🌱 vs 🪑",
                    listOf("Plant & Bird (پودا اور پرندہ)", "Plastic Chair", "Stone"),
                    0
                )
            )
        ),
        UrduGKStage(
            id = 4,
            unitTitle = "Unit 4 • باب 4",
            titleUr = "زمین، آسمان، موسم اور ہمارا پیارا پاکستان",
            titlePs = "ځمکه، اسمان، موسمونه او زمونږ پاکستان",
            titleEn = "Earth, Sky, Weather & Our Country Pakistan",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            summaryUr = "سورج دن کو روشنی اور حرارت دیتا ہے۔ رات کو چاند اور ستارے چمکتے ہیں۔ سال میں چار موسم ہوتے ہیں: بہار، گرمی، خزاں اور سردی۔",
            summaryPs = "لمر د ورځې رڼا او تودوخه راکوي. د شپې سپوږمۍ او ستوري ځلېږي. په کال کې څلور موسمونه دي.",
            summaryEn = "The Sun gives light and heat during the day. Moon and stars shine at night. There are 4 seasons in a year.",
            promptUr = "زمین، آسمان اور موسموں کے حقائق کو ملائیں!",
            promptPs = "د ځمکې، اسمان او موسمونو معلومات وصل کړئ!",
            promptEn = "Match each Earth, Sky & Season fact!",
            cards = listOf(
                UrduGKCard("☀️ The Sun (سورج / لمر)", "سورج مشرق سے نکلتا ہے اور ہمیں روشنی و گرمی دیتا ہے", "لمر موږ ته رڼا او تودوخه راکوي", "Gives us daylight and warmth", Color(0xFFEA580C)),
                UrduGKCard("🌙 Moon & ⭐ Stars (چاند اور تارے)", "رات کے وقت آسمان پر چاند اور تارے چمکتے ہیں", "د شپې په اسمان کې سپوږمۍ او ستوري ځلېږي", "Shine brightly in the night sky", Color(0xFF2563EB)),
                UrduGKCard("🌸☀️🍂❄️ Four Seasons (چار موسم)", "بہار، گرمی، خزاں اور سردی", "پسرلی، اوړی، منی او ژمی", "Spring, Summer, Autumn & Winter", Color(0xFF059669)),
                UrduGKCard("🇵🇰 Pakistan & Capital Islamabad", "پاکستان کا دارالحکومت اسلام آباد ہے", "د پاکستان پلازمېنه اسلام اباد ده", "Islamabad is the capital of Pakistan", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion(
                    "What gives us bright light and heat during the daytime?",
                    "دن کے وقت ہمیں روشنی اور حرارت کون دیتا ہے؟",
                    "د ورځې پر مهال موږ ته رڼا او تودوخه څه شی راکوي؟",
                    "☀️ Daytime",
                    listOf("The Sun (سورج)", "Candle", "Flashlight"),
                    0
                )
            )
        )
    )
}

@Composable
fun Class1UrduOrGKScreen(
    isUrduBook: Boolean,
    onBackClick: () -> Unit
) {
    val stages = remember(isUrduBook) {
        if (isUrduBook) Class1UrduRepository.stages else Class1GKRepository.stages
    }
    var currentStageIndex by remember { mutableIntStateOf(0) }
    var selectedTab by remember { mutableStateOf(0) } // 0=Game, 1=Lesson, 2=Exercise
    var selectedLang by remember { mutableStateOf(ExplainLang.URDU) }
    var completedStages by remember { mutableStateOf(setOf<Int>()) }
    var totalStars by remember { mutableIntStateOf(0) }
    var showOverlay by remember { mutableStateOf(false) }

    val stage = stages[currentStageIndex]
    val context = LocalContext.current

    var tts by remember { mutableStateOf<TextToSpeech?>(null) }
    DisposableEffect(context) {
        var engine: TextToSpeech? = null
        engine = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                engine?.language = Locale("ur", "PK")
            }
        }
        tts = engine
        onDispose {
            engine?.stop()
            engine?.shutdown()
        }
    }

    fun speak(text: String, lang: ExplainLang = selectedLang) {
        val engine = tts ?: return
        val locale = when (lang) {
            ExplainLang.ENGLISH -> Locale.US
            ExplainLang.URDU -> Locale("ur", "PK")
            ExplainLang.PASHTO -> Locale("ps", "AF")
        }
        val res = engine.setLanguage(locale)
        if (res == TextToSpeech.LANG_MISSING_DATA || res == TextToSpeech.LANG_NOT_SUPPORTED) {
            engine.setLanguage(Locale("ur", "PK"))
        }
        engine.speak(text, TextToSpeech.QUEUE_FLUSH, null, "urdu_gk_tts")
    }

    fun explainCurrentStage() {
        val msg = when (selectedLang) {
            ExplainLang.ENGLISH -> "${stage.titleEn}. ${stage.summaryEn}"
            ExplainLang.URDU -> "${stage.titleUr}۔ ${stage.summaryUr}"
            ExplainLang.PASHTO -> "${stage.titlePs}۔ ${stage.summaryPs}"
        }
        speak(msg, selectedLang)
    }

    LaunchedEffect(showOverlay, currentStageIndex) {
        if (showOverlay) {
            val congrats = when (selectedLang) {
                ExplainLang.ENGLISH -> "Great job! Moving to the next lesson."
                ExplainLang.URDU -> "شاباش! سبق مکمل! اگلے سبق پر جا رہے ہیں۔"
                ExplainLang.PASHTO -> "شاباش! لوست بشپړ شو! بل لوست ته ځو."
            }
            speak(congrats, selectedLang)
            delay(2000)
            showOverlay = false
            if (currentStageIndex < stages.lastIndex) {
                currentStageIndex++
                selectedTab = 0
            }
        }
    }

    val headerBookTitle = if (isUrduBook) {
        "اردو جماعت اوّل • Urdu Class 1"
    } else {
        "واقفیتِ عامہ جماعت اوّل • General Knowledge Class 1"
    }

    Scaffold(
        topBar = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Brush.horizontalGradient(listOf(stage.secondaryColor, stage.themeColor)))
                    .statusBarsPadding()
                    .padding(horizontal = 12.dp, vertical = 10.dp)
            ) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(
                        onClick = onBackClick,
                        modifier = Modifier
                            .size(38.dp)
                            .background(Color.White.copy(alpha = 0.2f), CircleShape)
                    ) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back", tint = Color.White)
                    }
                    Spacer(Modifier.width(10.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(
                            text = "$headerBookTitle • ${stage.unitTitle}",
                            color = Color(0xFFFDE68A),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> stage.titleEn
                                ExplainLang.URDU -> stage.titleUr
                                ExplainLang.PASHTO -> stage.titlePs
                            },
                            color = Color.White,
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            maxLines = 1
                        )
                    }
                    Surface(shape = RoundedCornerShape(14.dp), color = Color(0xFFFFD54F)) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.Default.Star, contentDescription = null, tint = Color(0xFFB45309), modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text("$totalStars", fontWeight = FontWeight.ExtraBold, color = Color(0xFF0F172A), fontSize = 13.sp)
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    itemsIndexed(stages) { idx, item ->
                        val active = idx == currentStageIndex
                        val done = completedStages.contains(item.id)
                        Surface(
                            shape = RoundedCornerShape(12.dp),
                            color = when {
                                active -> Color.White
                                done -> Color(0xFF10B981)
                                else -> Color.White.copy(alpha = 0.2f)
                            },
                            modifier = Modifier.clickable {
                                currentStageIndex = idx
                                showOverlay = false
                            }
                        ) {
                            Text(
                                text = if (done) "✓ سبق ${item.id}" else "سبق ${item.id}",
                                color = if (active) stage.secondaryColor else Color.White,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.ExtraBold,
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                            )
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        ExplainLang.entries.forEach { lang ->
                            val active = selectedLang == lang
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = if (active) Color(0xFFFFD54F) else Color.White.copy(alpha = 0.2f),
                                modifier = Modifier.clickable {
                                    selectedLang = lang
                                    explainCurrentStage()
                                }
                            ) {
                                Text(
                                    text = lang.label,
                                    color = if (active) Color(0xFF0F172A) else Color.White,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.ExtraBold,
                                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                                )
                            }
                        }
                    }

                    Surface(
                        shape = RoundedCornerShape(12.dp),
                        color = Color.White,
                        modifier = Modifier.clickable { explainCurrentStage() }
                    ) {
                        Row(
                            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.AutoMirrored.Filled.VolumeUp, contentDescription = null, tint = stage.secondaryColor, modifier = Modifier.size(16.dp))
                            Spacer(Modifier.width(4.dp))
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> "Voice"
                                    ExplainLang.URDU -> "آواز"
                                    ExplainLang.PASHTO -> "غږ"
                                },
                                color = stage.secondaryColor,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.ExtraBold
                            )
                        }
                    }
                }

                Spacer(Modifier.height(8.dp))

                val tabLabels = listOf(
                    Triple("Game", "گیم", "لوبه"),
                    Triple("Lesson", "سبق", "لوست"),
                    Triple("Exercise", "مشق", "تمرین")
                )
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.Black.copy(alpha = 0.2f), RoundedCornerShape(12.dp))
                        .padding(4.dp),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    tabLabels.forEachIndexed { idx, triple ->
                        val active = selectedTab == idx
                        Surface(
                            shape = RoundedCornerShape(10.dp),
                            color = if (active) Color.White else Color.Transparent,
                            modifier = Modifier
                                .weight(1f)
                                .clickable { selectedTab = idx }
                        ) {
                            Text(
                                text = when (selectedLang) {
                                    ExplainLang.ENGLISH -> triple.first
                                    ExplainLang.URDU -> triple.second
                                    ExplainLang.PASHTO -> triple.third
                                },
                                textAlign = TextAlign.Center,
                                color = if (active) stage.secondaryColor else Color.White,
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 13.sp,
                                modifier = Modifier.padding(vertical = 7.dp)
                            )
                        }
                    }
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF8FAFC))
                .padding(innerPadding)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
                    .padding(14.dp)
            ) {
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = Color.White,
                    border = BorderStroke(1.5.dp, stage.themeColor.copy(alpha = 0.4f)),
                    shadowElevation = 2.dp,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> stage.titleEn
                                ExplainLang.URDU -> stage.titleUr
                                ExplainLang.PASHTO -> stage.titlePs
                            },
                            fontSize = 16.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = stage.secondaryColor
                        )
                        Spacer(Modifier.height(4.dp))
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> stage.summaryEn
                                ExplainLang.URDU -> stage.summaryUr
                                ExplainLang.PASHTO -> stage.summaryPs
                            },
                            fontSize = 13.sp,
                            color = Color(0xFF334155),
                            lineHeight = 19.sp
                        )
                    }
                }

                Spacer(Modifier.height(14.dp))

                when (selectedTab) {
                    0 -> {
                        var roundIdx by remember(stage.id) { mutableIntStateOf(0) }
                        val cards = stage.cards
                        val target = cards[roundIdx.coerceAtMost(cards.lastIndex)]
                        val shuffled = remember(stage.id, roundIdx) { cards.shuffled() }

                        Card(
                            shape = RoundedCornerShape(20.dp),
                            colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                            border = BorderStroke(2.dp, stage.themeColor),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .clip(RoundedCornerShape(14.dp))
                                        .background(Brush.horizontalGradient(listOf(stage.secondaryColor, stage.themeColor)))
                                        .padding(14.dp),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                        Text(
                                            text = "Round ${roundIdx + 1} / ${cards.size}",
                                            color = Color(0xFFFDE68A),
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.Bold
                                        )
                                        Spacer(Modifier.height(4.dp))
                                        Text(
                                            text = target.mainTitle,
                                            color = Color.White,
                                            fontSize = 24.sp,
                                            fontWeight = FontWeight.ExtraBold,
                                            textAlign = TextAlign.Center
                                        )
                                        Spacer(Modifier.height(4.dp))
                                        Text(
                                            text = when (selectedLang) {
                                                ExplainLang.ENGLISH -> stage.promptEn
                                                ExplainLang.URDU -> stage.promptUr
                                                ExplainLang.PASHTO -> stage.promptPs
                                            },
                                            color = Color.White.copy(alpha = 0.9f),
                                            fontSize = 12.sp,
                                            textAlign = TextAlign.Center
                                        )
                                    }
                                }

                                Spacer(Modifier.height(14.dp))

                                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                                    shuffled.forEach { option ->
                                        val label = when (selectedLang) {
                                            ExplainLang.ENGLISH -> "${option.meaningEn} (${option.meaningUr})"
                                            ExplainLang.URDU -> option.meaningUr
                                            ExplainLang.PASHTO -> option.meaningPs
                                        }
                                        Surface(
                                            shape = RoundedCornerShape(16.dp),
                                            color = option.color.copy(alpha = 0.88f),
                                            border = BorderStroke(1.5.dp, Color.White.copy(alpha = 0.4f)),
                                            modifier = Modifier
                                                .fillMaxWidth()
                                                .clickable {
                                                    speak(label, selectedLang)
                                                    if (option == target) {
                                                        if (roundIdx + 1 >= cards.size) {
                                                            if (!completedStages.contains(stage.id)) {
                                                                completedStages = completedStages + stage.id
                                                                totalStars += 3
                                                            }
                                                            showOverlay = true
                                                        } else {
                                                            roundIdx++
                                                        }
                                                    }
                                                }
                                        ) {
                                            Text(
                                                text = label,
                                                color = Color.White,
                                                fontSize = 15.sp,
                                                fontWeight = FontWeight.Bold,
                                                textAlign = TextAlign.Center,
                                                modifier = Modifier.padding(14.dp)
                                            )
                                        }
                                    }
                                }
                            }
                        }
                    }

                    1 -> {
                        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                            stage.cards.forEach { card ->
                                Card(
                                    shape = RoundedCornerShape(18.dp),
                                    colors = CardDefaults.cardColors(containerColor = Color.White),
                                    border = BorderStroke(2.dp, card.color.copy(alpha = 0.45f)),
                                    elevation = CardDefaults.cardElevation(3.dp),
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .clickable { speak(card.mainTitle, selectedLang) }
                                ) {
                                    Row(
                                        modifier = Modifier.padding(16.dp),
                                        horizontalArrangement = Arrangement.SpaceBetween,
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Column(modifier = Modifier.weight(1f)) {
                                            Text(
                                                text = card.mainTitle,
                                                fontSize = 20.sp,
                                                fontWeight = FontWeight.ExtraBold,
                                                color = card.color
                                            )
                                            Spacer(Modifier.height(4.dp))
                                            Text(
                                                text = "اردو: ${card.meaningUr}",
                                                fontSize = 13.sp,
                                                fontWeight = FontWeight.Bold,
                                                color = Color(0xFF0F172A)
                                            )
                                            Text(
                                                text = "پښتو: ${card.meaningPs}  •  EN: ${card.meaningEn}",
                                                fontSize = 12.sp,
                                                color = Color(0xFF475569)
                                            )
                                        }
                                        FilledTonalIconButton(
                                            onClick = {
                                                val txt = when (selectedLang) {
                                                    ExplainLang.ENGLISH -> card.meaningEn
                                                    ExplainLang.URDU -> card.meaningUr
                                                    ExplainLang.PASHTO -> card.meaningPs
                                                }
                                                speak(txt, selectedLang)
                                            }
                                        ) {
                                            Icon(Icons.Default.RecordVoiceOver, contentDescription = "Voice")
                                        }
                                    }
                                }
                            }
                        }
                    }

                    2 -> {
                        var qIdx by remember(stage.id) { mutableIntStateOf(0) }
                        var chosen by remember(stage.id, qIdx) { mutableStateOf<Int?>(null) }
                        val quiz = stage.quizzes[qIdx.coerceAtMost(stage.quizzes.lastIndex)]
                        val qText = when (selectedLang) {
                            ExplainLang.ENGLISH -> quiz.questionEn
                            ExplainLang.URDU -> quiz.questionUr
                            ExplainLang.PASHTO -> quiz.questionPs
                        }
                        Card(
                            shape = RoundedCornerShape(20.dp),
                            colors = CardDefaults.cardColors(containerColor = Color.White),
                            border = BorderStroke(2.dp, stage.themeColor),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(18.dp)) {
                                Text(
                                    text = "Question ${qIdx + 1} / ${stage.quizzes.size}",
                                    color = stage.themeColor,
                                    fontWeight = FontWeight.ExtraBold
                                )
                                Spacer(Modifier.height(8.dp))
                                Text(qText, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = Color(0xFF0F172A))
                                Spacer(Modifier.height(12.dp))
                                quiz.options.forEachIndexed { idx, opt ->
                                    val isChosen = chosen == idx
                                    val isCorrect = idx == quiz.correctIndex
                                    Surface(
                                        shape = RoundedCornerShape(14.dp),
                                        color = when {
                                            !isChosen -> Color(0xFFF8FAFC)
                                            isCorrect -> Color(0xFFD1FAE5)
                                            else -> Color(0xFFFEE2E2)
                                        },
                                        border = BorderStroke(1.5.dp, Color(0xFFCBD5E1)),
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .padding(vertical = 5.dp)
                                            .clickable {
                                                chosen = idx
                                                speak(opt, selectedLang)
                                                if (isCorrect) {
                                                    if (qIdx + 1 < stage.quizzes.size) {
                                                        qIdx++
                                                    } else {
                                                        if (!completedStages.contains(stage.id)) {
                                                            completedStages = completedStages + stage.id
                                                            totalStars += 3
                                                        }
                                                        showOverlay = true
                                                    }
                                                }
                                            }
                                    ) {
                                        Text(
                                            text = opt,
                                            fontSize = 15.sp,
                                            fontWeight = FontWeight.Bold,
                                            modifier = Modifier.padding(14.dp)
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }

            AnimatedVisibility(
                visible = showOverlay,
                enter = fadeIn() + scaleIn(),
                modifier = Modifier.align(Alignment.Center)
            ) {
                Card(
                    shape = RoundedCornerShape(24.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF064E3B)),
                    border = BorderStroke(3.dp, Color(0xFFFFD54F)),
                    elevation = CardDefaults.cardElevation(12.dp),
                    modifier = Modifier
                        .padding(28.dp)
                        .fillMaxWidth()
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text("🌟 شاباش / مبارک ہو 🌟", fontSize = 24.sp, fontWeight = FontWeight.ExtraBold, color = Color(0xFFFFD54F))
                        Spacer(Modifier.height(8.dp))
                        Text(
                            text = when (selectedLang) {
                                ExplainLang.ENGLISH -> "Stage Complete! Moving to next lesson..."
                                ExplainLang.URDU -> "سبق مکمل! اگلے سبق پر جا رہے ہیں..."
                                ExplainLang.PASHTO -> "لوست بشپړ شو! بل لوست ته ځو..."
                            },
                            color = Color.White,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            textAlign = TextAlign.Center
                        )
                    }
                }
            }
        }
    }
}
