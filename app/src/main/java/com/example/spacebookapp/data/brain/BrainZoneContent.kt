package com.example.spacebookapp.data.brain

import com.example.spacebookapp.ui.screens.TrilingualText

data class DefenderQuestion(
    val id: String,
    val monsterEmoji: String,
    val characterName: String,
    val question: TrilingualText,
    val options: List<String>,
    val correctAnswer: String,
    val bookSource: String
)

data class FocusChallenge(
    val id: String,
    val type: FocusType,
    val title: TrilingualText,
    val instruction: TrilingualText,
    val items: List<String>,
    val targetItem: String,
    val correctIndex: Int = 0,
    val options: List<String> = emptyList()
)

enum class FocusType {
    MEMORY_CARDS,
    PATTERN_REPEAT,
    SPOT_DIFFERENCE,
    ODD_ONE_OUT,
    GO_NO_GO,
    FIND_IT_FAST
}

data class LogicIQChallenge(
    val id: String,
    val type: LogicType,
    val title: TrilingualText,
    val sequenceEmojis: List<String>,
    val options: List<String>,
    val correctAnswer: String,
    val hint: TrilingualText
)

enum class LogicType {
    WHAT_COMES_NEXT,
    ANALOGY,
    ODD_SHAPE_OUT,
    CLASSIFY_SORT,
    NUMBER_PUZZLE
}

data class CriticalThinkingChallenge(
    val id: String,
    val type: ThinkingType,
    val scenario: TrilingualText,
    val question: TrilingualText,
    val options: List<TrilingualText>,
    val correctIndex: Int,
    val whyExplain: TrilingualText,
    val bookChapter: String
)

enum class ThinkingType {
    WHY_REASON,
    CAUSE_AND_EFFECT,
    SEQUENCE_EVENTS,
    FACT_VS_OPINION,
    DETECTIVE_DEDUCTION,
    BEST_CHOICE
}

object BrainZoneContent {

    // ─── A) ANSWER DEFENDER QUESTIONS (Curriculum derived from Class 1 & Class 3) ───
    val DEFENDER_QUESTIONS = listOf(
        DefenderQuestion(
            id = "def-1",
            monsterEmoji = "👾",
            characterName = "Sunny Bot",
            question = TrilingualText(
                en = "In which direction does the Sun rise?",
                ur = "سورج کس سمت سے طلوع ہوتا ہے؟",
                ps = "لمر له کوم لوري راخېژي؟"
            ),
            options = listOf("East (مشرق)", "West (مغرب)", "North (شمال)"),
            correctAnswer = "East (مشرق)",
            bookSource = "Class 3 GK • Chapter 1"
        ),
        DefenderQuestion(
            id = "def-2",
            monsterEmoji = "🤖",
            characterName = "Robo Quaid",
            question = TrilingualText(
                en = "When was Quaid-e-Azam Muhammad Ali Jinnah born?",
                ur = "قائد اعظمؒ کس تاریخ کو پیدا ہوئے؟",
                ps = "قائد اعظمؒ په کومه نېټه زېږېدلی و؟"
            ),
            options = listOf("25 Dec 1876", "14 Aug 1947", "23 Mar 1940"),
            correctAnswer = "25 Dec 1876",
            bookSource = "Class 3 GK • Chapter 4"
        ),
        DefenderQuestion(
            id = "def-3",
            monsterEmoji = "🛸",
            characterName = "Aero Alien",
            question = TrilingualText(
                en = "What are the three states of Matter?",
                ur = "مادے کی تین حالتیں کون سی ہیں؟",
                ps = "د مادې درې حالتونه کوم دي؟"
            ),
            options = listOf("Solid, Liquid, Gas", "Fire, Air, Water", "Wood, Iron, Sand"),
            correctAnswer = "Solid, Liquid, Gas",
            bookSource = "Class 3 GK • Chapter 11"
        ),
        DefenderQuestion(
            id = "def-4",
            monsterEmoji = "🎈",
            characterName = "Floaty Flo",
            question = TrilingualText(
                en = "When are shadows on Earth the shortest?",
                ur = "زمین پر سایہ سب سے چھوٹا کب ہوتا ہے؟",
                ps = "په ځمکه سیوری کله تر ټولو لنډ وي؟"
            ),
            options = listOf("At Noon (دوپہر)", "Morning (صبح)", "Evening (شام)"),
            correctAnswer = "At Noon (دوپہر)",
            bookSource = "Class 3 GK • Chapter 1"
        ),
        DefenderQuestion(
            id = "def-5",
            monsterEmoji = "🐻",
            characterName = "Habit Bear",
            question = TrilingualText(
                en = "Where do Camels and Cacti naturally live?",
                ur = "اونٹ اور ناگ پھنی کا قدرتی مسکن کیا ہے؟",
                ps = "اوښ او زقوم په کوم چاپېریال کې ژوند کوي؟"
            ),
            options = listOf("Desert (صحرا)", "Forest (جنگل)", "Ocean (سمندر)"),
            correctAnswer = "Desert (صحرا)",
            bookSource = "Class 3 GK • Chapter 7"
        ),
        DefenderQuestion(
            id = "def-6",
            monsterEmoji = "⚡",
            characterName = "Volt Spark",
            question = TrilingualText(
                en = "What is the main natural source of heat and light on Earth?",
                ur = "زمین پر حرارت اور روشنی کا سب سے بڑا قدرتی ذریعہ کیا ہے؟",
                ps = "په ځمکه د تودوخې او رڼا تر ټولو لویه طبیعي سرچینه څه ده؟"
            ),
            options = listOf("The Sun (سورج)", "Electricity (بجلی)", "Fire (آگ)"),
            correctAnswer = "The Sun (سورج)",
            bookSource = "Class 3 GK • Chapter 12"
        ),
        DefenderQuestion(
            id = "def-7",
            monsterEmoji = "🦁",
            characterName = "Lion King",
            question = TrilingualText(
                en = "Which of these is a Natural Resource?",
                ur = "ان میں سے کون سا قدرتی وسیلہ ہے؟",
                ps = "له دې څخه کوم یوه طبیعي سرچینه ده؟"
            ),
            options = listOf("Water & Trees", "Cars & Bikes", "Plastic & Glass"),
            correctAnswer = "Water & Trees",
            bookSource = "Class 3 GK • Chapter 2"
        ),
        DefenderQuestion(
            id = "def-8",
            monsterEmoji = "⚙️",
            characterName = "Gear Golem",
            question = TrilingualText(
                en = "Scissors and See-saws are examples of which Simple Machine?",
                ur = "قینچی اور سیسا کس سادہ مشین کی مثال ہیں؟",
                ps = "قیچي او سیسا د کوم ساده ماشین مثالونه دي؟"
            ),
            options = listOf("Lever (لیور)", "Pulley (چرخی)", "Screw (پیچ)"),
            correctAnswer = "Lever (لیور)",
            bookSource = "Class 3 GK • Chapter 15"
        )
    )

    // ─── B) FOCUS CHALLENGES ───
    val FOCUS_CHALLENGES = listOf(
        FocusChallenge(
            id = "foc-odd-1",
            type = FocusType.ODD_ONE_OUT,
            title = TrilingualText(en = "Spot Odd Animal", ur = "مختلف جانور تلاش کریں", ps = "بېل حیوان ومومئ"),
            instruction = TrilingualText(
                en = "Find the animal that lives in water, not on land!",
                ur = "وہ جانور چنیں جو خشکی پر نہیں بلکہ پانی میں رہتا ہے!",
                ps = "هغه حیوان وټاکئ چې په وچه نه بلکې په اوبو کې ژوند کوي!"
            ),
            items = listOf("🦁", "🐯", "🐬", "🦊"),
            targetItem = "🐬"
        ),
        FocusChallenge(
            id = "foc-odd-2",
            type = FocusType.ODD_ONE_OUT,
            title = TrilingualText(en = "Natural vs Man-made", ur = "قدرتی بمقابلہ انسان کا بنایا", ps = "طبیعي او انساني جوړښت"),
            instruction = TrilingualText(
                en = "One item is human-made; the others are natural gifts!",
                ur = "ایک چیز انسان کی بنائی ہوئی ہے، باقی سب قدرتی ہیں!",
                ps = "یو شی د انسان جوړ دی، پاتې نور ټول طبیعي دي!"
            ),
            items = listOf("🌲", "🌊", "🚗", "☀️"),
            targetItem = "🚗"
        ),
        FocusChallenge(
            id = "foc-find-1",
            type = FocusType.FIND_IT_FAST,
            title = TrilingualText(en = "Find the Rocket!", ur = "راکٹ ڈھونڈیں!", ps = "راکټ ومومئ!"),
            instruction = TrilingualText(
                en = "Tap the hidden rocket quickly before time runs out!",
                ur = "جلدی سے چھپا ہوا راکٹ تلاش کر کے ٹیپ کریں!",
                ps = "ژر تر ژره پټ شوی راکټ ومومئ او ټایپ پرې وکړئ!"
            ),
            items = listOf("⭐", "🌙", "⭐", "⭐", "🚀", "⭐", "☁️", "⭐", "⭐"),
            targetItem = "🚀"
        ),
        FocusChallenge(
            id = "foc-pattern-1",
            type = FocusType.PATTERN_REPEAT,
            title = TrilingualText(en = "Memory Sequence", ur = "ترتیب یاد رکھیں", ps = "ترتیب په یاد وساتئ"),
            instruction = TrilingualText(
                en = "Remember the fruits in order: Apple, Banana, Grapes!",
                ur = "ترتیب یاد رکھیں: سیب، کیلا، انگور!",
                ps = "ترتیب په یاد وساتئ: مڼه، کیله، انګور!"
            ),
            items = listOf("🍎", "🍌", "🍇"),
            targetItem = "🍎 🍌 🍇",
            options = listOf("🍎 🍌 🍇", "🍌 🍎 🍇", "🍇 🍌 🍎")
        )
    )

    // ─── C) IQ & LOGIC CHALLENGES ───
    val IQ_CHALLENGES = listOf(
        LogicIQChallenge(
            id = "iq-1",
            type = LogicType.WHAT_COMES_NEXT,
            title = TrilingualText(en = "What Comes Next?", ur = "اگلا کیا آئے گا؟", ps = "ورپسې څه راځي؟"),
            sequenceEmojis = listOf("🔴", "🔵", "🔴", "🔵", "🔴", "❓"),
            options = listOf("🔵", "🔴", "🟢"),
            correctAnswer = "🔵",
            hint = TrilingualText(en = "Red, Blue, Red, Blue... what follows?", ur = "سرخ، نیلا، سرخ، نیلا... اگلا رنگ کیا ہوگا؟", ps = "سور، شین، سور، شین... ورپسې څه راځي؟")
        ),
        LogicIQChallenge(
            id = "iq-2",
            type = LogicType.WHAT_COMES_NEXT,
            title = TrilingualText(en = "Growing Numbers", ur = "بڑھتی گنتی", ps = "زیاتېدونکي شمېرې"),
            sequenceEmojis = listOf("2", "4", "6", "8", "❓"),
            options = listOf("10", "9", "12"),
            correctAnswer = "10",
            hint = TrilingualText(en = "Add 2 each time!", ur = "ہر بار 2 جمع ہو رہے ہیں!", ps = "هر ځل ۲ ورزیاتیږي!")
        ),
        LogicIQChallenge(
            id = "iq-3",
            type = LogicType.ANALOGY,
            title = TrilingualText(en = "Picture Analogy", ur = "تصویری مماثلت", ps = "انځوریز ورته والی"),
            sequenceEmojis = listOf("🐦 is to 🪺", "as", "🦁 is to ❓"),
            options = listOf("Cave/Den 🕳️", "Nest 🪺", "Water 🌊"),
            correctAnswer = "Cave/Den 🕳️",
            hint = TrilingualText(en = "A bird lives in a nest; a lion lives in a...?", ur = "پرندہ گھونسلے میں رہتا ہے تو شیر کہاں رہتا ہے؟", ps = "مرغۍ په ځاله کې اوسي، زمری چیرته اوسي؟")
        ),
        LogicIQChallenge(
            id = "iq-4",
            type = LogicType.CLASSIFY_SORT,
            title = TrilingualText(en = "Classification", ur = "گروپ بندی", ps = "ډلبندي"),
            sequenceEmojis = listOf("☀️", "💡", "🕯️", "❓ (Gives light)"),
            options = listOf("🔦 Torch", "🪑 Chair", "👟 Shoe"),
            correctAnswer = "🔦 Torch",
            hint = TrilingualText(en = "All these things give light!", ur = "یہ تمام چیزیں روشنی دیتی ہیں!", ps = "دا ټول شیان رڼا ورکوي!")
        ),
        LogicIQChallenge(
            id = "iq-5",
            type = LogicType.WHAT_COMES_NEXT,
            title = TrilingualText(en = "Shape Rotation", ur = "شکلوں کی ترتیب", ps = "د شکلونو ترتیب"),
            sequenceEmojis = listOf("🔺", "🔻", "🔺", "🔻", "❓"),
            options = listOf("🔺", "🔻", "🔷"),
            correctAnswer = "🔺",
            hint = TrilingualText(en = "Up, down, up, down... next is?", ur = "اوپر، نیچے، اوپر، نیچے... اگلا رخ؟", ps = "پورته، ښکته، پورته، ښکته... ورپسې؟")
        )
    )

    // ─── D) CRITICAL THINKING & DEEP ANALYSIS ───
    val THINKING_CHALLENGES = listOf(
        CriticalThinkingChallenge(
            id = "think-1",
            type = ThinkingType.WHY_REASON,
            scenario = TrilingualText(
                en = "At 12:00 PM noon, Ali noticed his shadow on the playground was very short.",
                ur = "دوپہر بارہ بجے علی نے دیکھا کہ گراؤنڈ میں اس کا سایہ بہت چھوٹا ہے۔",
                ps = "د غرمې په دولسو بجو علي ولیدل چې د لوبې په میدان کې یې سیوری ډېر لنډ دی."
            ),
            question = TrilingualText(
                en = "WHY was the shadow so short?",
                ur = "سایہ اتنا چھوٹا کیوں تھا؟ (اصل وجہ کیا تھی؟)",
                ps = "سیوری ولې دومره لنډ و؟ (اصلي لامل یې څه و؟)"
            ),
            options = listOf(
                TrilingualText(
                    en = "Because the Sun was directly overhead in the sky",
                    ur = "کیونکہ سورج آسمان میں بالکل اوپر (سر پر) تھا",
                    ps = "ځکه چې لمر په اسمان کې بالکل سر ته پورته و"
                ),
                TrilingualText(
                    en = "Because Ali was running very fast",
                    ur = "کیونکہ علی بہت تیز دوڑ رہا تھا",
                    ps = "ځکه چې علي ډېر په چټکۍ منډه وهله"
                ),
                TrilingualText(
                    en = "Because clouds blocked all light",
                    ur = "کیونکہ بادلوں نے روشنی روک دی تھی",
                    ps = "ځکه چې ورېځو رڼا بنده کړې وه"
                )
            ),
            correctIndex = 0,
            whyExplain = TrilingualText(
                en = "When light comes from straight above, shadows cast directly below the body, making them shortest!",
                ur = "جب روشنی بالکل اوپر سے پڑے تو سایہ سیدھا پاؤں تلے بنتا ہے اور سب سے چھوٹا ہوتا ہے!",
                ps = "کله چې رڼا نېغه له پورته څخه راشي، سیوری تر ټولو لنډ راځي!"
            ),
            bookChapter = "Class 3 GK • Chapter 1 (The Sun)"
        ),
        CriticalThinkingChallenge(
            id = "think-2",
            type = ThinkingType.CAUSE_AND_EFFECT,
            scenario = TrilingualText(
                en = "A factory dumps plastic and chemical dirty water into a nearby river.",
                ur = "ایک فیکٹری نے اپنا کیمیکل والا گندا پانی اور پلاسٹک قریبی دریا میں بہا دیا۔",
                ps = "یوې فابریکې خپل چټلې کیمیاوي اوبه او پلاستیک نږدې سیند ته ورخوشې کړل."
            ),
            question = TrilingualText(
                en = "What is the direct harmful EFFECT of this action?",
                ur = "اس کا برا نتیجہ (اثر) کیا ہوگا؟",
                ps = "د دې ناوړه پایله (اثر) به څه وي؟"
            ),
            options = listOf(
                TrilingualText(
                    en = "Fish and river life will get poisoned and water becomes unsafe",
                    ur = "مچھلیاں اور آبی حیات مر جائیں گی اور پانی پینے کے قابل نہیں رہے گا",
                    ps = "کبان او د سیند ژوي به زیانمن شي او اوبه به ناپاکه شي"
                ),
                TrilingualText(
                    en = "The river will turn into clean drinking juice",
                    ur = "دریا میٹھے جوس میں بدل جائے گا",
                    ps = "سیند به په خوږو اوبو بدل شي"
                ),
                TrilingualText(
                    en = "Trees around the river will grow golden leaves",
                    ur = "درختوں پر سونے کے پتے اگ آئیں گے",
                    ps = "د ونو پاڼې به زرینې شي"
                )
            ),
            correctIndex = 0,
            whyExplain = TrilingualText(
                en = "Conserving clean water protects living organisms from toxic pollution.",
                ur = "پانی کا تحفظ تمام جانداروں کو بیماریوں اور آلودگی سے بچاتا ہے۔",
                ps = "د پاکو اوبو ژغورنه ټول ژوندي موجودات له ککړتیا ژغوري."
            ),
            bookChapter = "Class 3 GK • Chapter 3 (Conservation of Resources)"
        ),
        CriticalThinkingChallenge(
            id = "think-3",
            type = ThinkingType.SEQUENCE_EVENTS,
            scenario = TrilingualText(
                en = "How does water turn from liquid into rain?",
                ur = "پانی بخارات بن کر بارش کیسے بنتا ہے؟ (پانی کا چکر)",
                ps = "اوبه څنګه تبخیر کیږي او باران جوړیږي؟"
            ),
            question = TrilingualText(
                en = "Which sequence correctly describes the water cycle?",
                ur = "کون سی ترتیب بالکل درست ہے؟",
                ps = "کوم ترتیب سم دی؟"
            ),
            options = listOf(
                TrilingualText(
                    en = "Sun warms water ➔ Vapour rises ➔ Clouds form ➔ Rain falls",
                    ur = "سورج گرمی دیتا ہے ➔ بخارات بنتے ہیں ➔ بادل بنتے ہیں ➔ بارش برستی ہے",
                    ps = "لمر اوبه ګرموي ➔ بخار پورته کیږي ➔ ورېځې جوړیږي ➔ باران ورېږي"
                ),
                TrilingualText(
                    en = "Rain falls ➔ Clouds form ➔ Sun disappears ➔ Vapour rises",
                    ur = "بارش برستی ہے ➔ بادل بنتے ہیں ➔ سورج چھپ جاتا ہے ➔ بخارات بنتے ہیں",
                    ps = "باران ورېږي ➔ ورېځې جوړیږي ➔ لمر پټیږي ➔ بخار پورته کیږي"
                ),
                TrilingualText(
                    en = "Clouds fall down ➔ Sun freezes ➔ Water burns",
                    ur = "بادل گرتے ہیں ➔ سورج جم جاتا ہے ➔ پانی جلتا ہے",
                    ps = "ورېځې لوېږي ➔ لمر کنګل کیږي ➔ اوبه سوځي"
                )
            ),
            correctIndex = 0,
            whyExplain = TrilingualText(
                en = "Thermal energy evaporates water into the air where condensation forms rain clouds.",
                ur = "سورج کی حرارت پانی کو بھاپ بناتی ہے جو فضا میں ٹھنڈی ہو کر بادل اور بارش بنتی ہے۔",
                ps = "د لمر تودوخه اوبه بخار کوي او پورته ورېځې او باران ترې جوړیږي."
            ),
            bookChapter = "Class 3 GK • Chapter 12 (Energy and Its Sources)"
        ),
        CriticalThinkingChallenge(
            id = "think-4",
            type = ThinkingType.FACT_VS_OPINION,
            scenario = TrilingualText(
                en = "Two children are discussing the Sun.",
                ur = "دو بچے سورج کے بارے میں بات کر رہے ہیں۔",
                ps = "دوه ماشومان د لمر په اړه خبرې کوي."
            ),
            question = TrilingualText(
                en = "Which statement is a PROVEN SCIENTIFIC FACT?",
                ur = "کون سی بات ایک ثابت شدہ سائنسی حقیقت (Fact) ہے؟",
                ps = "کومه خبره یوه ثابته شوې ساینسي حقیقت (Fact) ده؟"
            ),
            options = listOf(
                TrilingualText(
                    en = "Earth takes 365 days to complete one orbit around the Sun",
                    ur = "زمین سورج کے گرد ایک چکر 365 دنوں میں مکمل کرتی ہے",
                    ps = "ځمکه د لمر شاوخوا خپل چکر په ۳۶۵ ورځو کې بشپړوي"
                ),
                TrilingualText(
                    en = "Sunny days are always more fun than rainy days",
                    ur = "دھوپ والے دن بارش کے دنوں سے زیادہ اچھے ہوتے ہیں",
                    ps = "لمریزې ورځې تر باراني ورځو ډېرې خوندورې دي"
                ),
                TrilingualText(
                    en = "Yellow is the prettiest colour in the universe",
                    ur = "پیلا رنگ کائنات کا سب سے خوبصورت رنگ ہے",
                    ps = "ژېړ رنګ د نړۍ تر ټولو ښکلی رنګ دی"
                )
            ),
            correctIndex = 0,
            whyExplain = TrilingualText(
                en = "A fact can be scientifically measured and verified everywhere; personal feelings are opinions.",
                ur = "حقیقت کو سائنسی مشاہدے سے ثابت کیا جا سکتا ہے، جبکہ پسند یا ناپسند انسان کی ذاتی رائے ہوتی ہے۔",
                ps = "حقیقت په ساینس ثابت کیدی شي، خو خوند او خوښه شخصي نظر دی."
            ),
            bookChapter = "Class 3 GK • Chapter 1"
        ),
        CriticalThinkingChallenge(
            id = "think-5",
            type = ThinkingType.DETECTIVE_DEDUCTION,
            scenario = TrilingualText(
                en = "Clue 1: I have no fixed shape. Clue 2: I take the shape of my container. Clue 3: I can flow like water and milk.",
                ur = "اشارہ 1: میری کوئی مخصوص شکل نہیں۔ اشارہ 2: میں برتن کی شکل لے لیتا ہوں۔ اشارہ 3: میں پانی اور دودھ کی طرح بہتا ہوں۔",
                ps = "نښه ۱: زه کومه ټاکلې بڼه نه لرم. نښه ۲: د لوښي بڼه غوره کوم. نښه ۳: د اوبو او شیدو په څېر بهیږم."
            ),
            question = TrilingualText(
                en = "Detective, what state of matter am I?",
                ur = "اے ننھے جاسوس! میں مادے کی کون سی حالت ہوں؟",
                ps = "کوچني څارګره! زه د مادې کوم حالت یم؟"
            ),
            options = listOf(
                TrilingualText(en = "Liquid (مائع)", ur = "مائع (جیسے پانی، تیل)", ps = "مائع (لکه اوبه، تېل)"),
                TrilingualText(en = "Solid (ٹھوس)", ur = "ٹھوس (جیسے پتھر، لکڑی)", ps = "جامد (لکه تیږه، لرګی)"),
                TrilingualText(en = "Gas (گیس)", ur = "گیس (جیسے ہوا)", ps = "ګاز (لکه هوا)")
            ),
            correctIndex = 0,
            whyExplain = TrilingualText(
                en = "Liquids have definite volume but indefinite shape; they flow and adapt to containers.",
                ur = "مائع کا حجم تو ہوتا ہے لیکن شکل برتن جیسی بن جاتی ہے اور یہ بہتا ہے!",
                ps = "مایعات ټاکلی حجم لري خو بڼه یې د لوښي په څېر وي او بهیږي!"
            ),
            bookChapter = "Class 3 GK • Chapter 11 (Matter)"
        )
    )
}
