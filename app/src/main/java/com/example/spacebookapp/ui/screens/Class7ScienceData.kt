package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

data class Class7ScienceCard(
    val title: String,
    val conceptOrLaw: String,
    val detailEn: String,
    val detailUr: String,
    val detailPs: String,
    val cardColor: Color
)

data class Class7ScienceStage(
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
    val equationsAndLaws: List<String>,
    val cards: List<Class7ScienceCard>,
    val quizzes: List<Class7QuizQuestion>
)

object Class7ScienceRepository {
    val stages: List<Class7ScienceStage> = listOf(
        // ─── UNIT 1: PLANT SYSTEMS (p. 1–14) ───
        Class7ScienceStage(
            id = 1,
            unitNumber = "Unit 1",
            pageRange = "Pages 1–14",
            titleEn = "Plant Systems",
            titleUr = "پودوں کے نظام",
            titlePs = "د بوټو نظامونه",
            themeColor = Color(0xFF16A34A),
            secondaryColor = Color(0xFF14532D),
            summaryEn = "Plants possess two vital organ systems: the root system (anchorage and water/mineral absorption via root hairs) and the shoot system (stem, leaves, flowers, fruit). Vascular bundles containing xylem (transports water/minerals upward and forms wood) and phloem (transports dissolved sugars bi-directionally) form the transport system. Leaves perform photosynthesis in mesophyll cells, regulated by stomata guard cells.",
            summaryUr = "پودوں کے دو بنیادی نظام ہیں: جڑوں کا نظام (جو پودے کو زمین میں جمائے رکھتا ہے اور روٹ ہائیرز کے ذریعے پانی اور معدنیات جذب کرتا ہے) اور شاخوں کا نظام (تنا، پتے، پھول اور پھل)۔ ٹرانسپورٹ سسٹم زائلم (جو پانی اوپر لے جاتا ہے اور لکڑی بناتا ہے) اور فلوئم (جو تیار خوراک اوپر نیچے لے جاتا ہے) پر مشتمل ہوتا ہے۔ پتوں کے میزوفل خلیوں میں ضیائی تالیف ہوتی ہے۔",
            summaryPs = "بوټي دوه بنسټیز غونډالونه لري: د ریښې غونډال (چې بوټی په خاوره کې ټینګ ساتي او د ریښې وېښتانو له لارې اوبه او منرالونه جذبوي) او د ښاخونو غونډال (ډنډر، پاڼې، ګلان او مېوې). د انتقال غونډال د زایلم (چې اوبه پورته وړي) او فلویم (چې جوړ شوی خواړه هر لوري ته لېږدوي) څخه جوړ شوی دی.",
            equationsAndLaws = listOf(
                "Photosynthesis: Carbon Dioxide + Water ➔ Glucose + Oxygen (in presence of Sunlight & Chlorophyll)",
                "Respiration: Glucose + Oxygen ➔ Carbon Dioxide + Water + Energy (ATP)",
                "Transpiration Pull: Evaporation of water from stomata draws water continuously upward through xylem"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Root & Shoot Systems",
                    conceptOrLaw = "Taproots vs Fibrous Roots",
                    detailEn = "Taproots consist of a thick primary root with secondary/tertiary branches (e.g. carrots, trees). Fibrous roots spread as thin threads from the stem base (e.g. wheat, grass). Root hairs provide huge surface area for water absorption by diffusion.",
                    detailUr = "ٹیپ روٹ ایک موٹی مرکزی جڑ پر مشتمل ہوتی ہے جس سے ثانوی جڑیں نکلتی ہیں (جیسے گاجر، درخت)۔ ریشہ دار (فائبرس) جڑیں تنے کے نچلے حصے سے دھاگہ نما پھیلتی ہیں (جیسے گندم، گھاس)۔ روٹ ہائیرز نفوذ (ڈفیوژن) کے ذریعے پانی جذب کرنے کے لیے وسیع رقبہ فراہم کرتے ہیں۔",
                    detailPs = "ټيپ روټ یو اصلي غټ ریښه لري چې فرعي ریښې ترې وځي (لکه ګازره، ونې). فایبرس ریښې د ډنډر له بیخه د تارونو په څېر خپریږي (لکه غنم، واښه). د ریښې وېښتان د ډیفیوژن له لارې د اوبو د جذب پراخه کچه رامنځته کوي.",
                    cardColor = Color(0xFF15803D)
                ),
                Class7ScienceCard(
                    title = "Vascular Tissues",
                    conceptOrLaw = "Xylem (Upward) & Phloem (Both Ways)",
                    detailEn = "Xylem is composed of thick-walled dead cells that transport water and dissolved minerals upwards from roots to leaves and form tree rings. Phloem is composed of living sieve cells that transport dissolved sucrose up and down simultaneously.",
                    detailUr = "زائلم مردہ خلیات کی موٹی نالیوں پر مشتمل ہے جو جڑوں سے پتوں تک پانی اور معدنیات صرف اوپر لے جاتی ہیں اور درخت کے تنے میں لکڑی کے چھلے بناتی ہیں۔ فلوئم زندہ خلیات پر مشتمل ہے جو گلوکوز کی خوراک بیک وقت اوپر اور نیچے دونوں طرف پہنچاتا ہے۔",
                    detailPs = "زایلم د مړو حجرو نلۍ دي چې اوبه او منرالونه له ریښو پاڼو ته یوازې پورته وړي او لرګی جوړوي. فلویم ژوندي حجرې لري چې خواړه په یو وخت پورته او ښکته لېږدوي.",
                    cardColor = Color(0xFF16A34A)
                ),
                Class7ScienceCard(
                    title = "Leaf Adaptations",
                    conceptOrLaw = "Stomata, Cuticle & Mesophyll",
                    detailEn = "Broad, flat leaves maximize sunlight capture. The waxy cuticle prevents excessive water evaporation. Stomata in lower epidermis open during sunlight when guard cells become turgid, and close at night to conserve water.",
                    detailUr = "چوڑا اور چپٹا پتہ زیادہ سے زیادہ سورج کی روشنی جذب کرتا ہے۔ مومی کیوٹیکل ضرورت سے زیادہ پانی کے بخارات بننے کو روکتی ہے۔ نچلی ایپی ڈرمس میں موجود سٹوماٹا دن کو گارڈ سیلز کے پھولنے پر کھلتے ہیں اور رات کو پانی بچانے کے لیے بند ہو جاتے ہیں۔",
                    detailPs = "پلنې پاڼې ډېره لمریزه رڼا جذبوي. مومي کیوټیکل د اوبو د بې ځایه تبخیر مخه نیسي. سټوماټا د ورځې د ساتونکو حجرو د پړسوب پر مهال پرانیستل کیږي او د شپې د اوبو ساتلو لپاره تړل کیږي.",
                    cardColor = Color(0xFF047857)
                ),
                Class7ScienceCard(
                    title = "Transpiration",
                    conceptOrLaw = "Transpiration Pull & Environmental Factors",
                    detailEn = "Evaporation of water through stomata creates tension in xylem vessels, pulling water and minerals from soil to high treetops. Higher temperature, bright light, and wind increase transpiration; high humidity decreases it.",
                    detailUr = "سٹوماٹا سے پانی کے بخارات بن کر اڑنے سے زائلم میں کھچاؤ پیدا ہوتا ہے جسے ٹرانسپیریشن پل کہتے ہیں، جو پانی کو بلند درختوں کی چوٹی تک کھینچتا ہے۔ تیز ہوا، زیادہ درجہ حرارت اور تیز روشنی بخارات بڑھاتے ہیں، جبکہ نمی اسے کم کرتی ہے۔",
                    detailPs = "له سټوماټا څخه د اوبو بخار کېدل په زایلم کې کشش رامنځته کوي چې د لوړو ونو تر سر پورې اوبه راکاږي. تودوخه، رڼا او باد تبخیر زیاتوي، خو لوړ رطوبت یې کموي.",
                    cardColor = Color(0xFF0D9488)
                ),
                Class7ScienceCard(
                    title = "Mineral Nutrition",
                    conceptOrLaw = "Magnesium (Chlorophyll) & Nitrates (Proteins)",
                    detailEn = "Plants absorb dissolved minerals through roots: Magnesium is essential for forming chlorophyll molecules (deficiency turns leaves yellow - chlorosis); Nitrates are required to synthesize amino acids and proteins for growth.",
                    detailUr = "پودے جڑوں سے معدنیات حاصل کرتے ہیں: میگنیشیم کلوروفل بنانے کے لیے لازمی ہے (اس کی کمی سے پتے پیلے ہو جاتے ہیں یعنی کلوروسس)؛ جبکہ نائٹریٹس نشوونما کے لیے امائنو ایسڈز اور پروٹینز بنانے کے لیے درکار ہوتے ہیں۔",
                    detailPs = "بوټي له خاورې منرالونه اخلي: مګنیزیم د کلوروفیل جوړولو لپاره اړین دی (کمښت یې پاڼې ژېړوي)؛ او نایټریټس د ودې او پروټین جوړولو لپاره اړین دي.",
                    cardColor = Color(0xFF059669)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Why do leaves appear yellow (chlorosis) when a plant grows in soil severely deficient in Magnesium?",
                    questionUr = "جب پودا میگنیشیم کی شدید کمی والی مٹی میں اگتا ہے تو اس کے پتے پیلے (کلوروسس) کیوں ہو جاتے ہیں؟",
                    questionPs = "کله چې یو بوټی په داسې خاوره کې شنه شي چې مګنیزیم پکې نه وي، نو پاڼې یې ولې ژېړې (کلوروسس) کیږي؟",
                    options = listOf(
                        "Magnesium is the central mineral atom needed to synthesize green chlorophyll",
                        "Magnesium is required to make root hairs absorb water",
                        "Magnesium converts glucose into sucrose in phloem",
                        "Magnesium prevents stomata from closing at night"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Magnesium is the essential core element of the chlorophyll pigment molecule. Without sufficient magnesium, plant cells cannot synthesize green chlorophyll, revealing yellow carotenoid pigments (chlorosis).",
                    whyExplanationUr = "میگنیشیم سبز کلوروفل مالیکیول کا بنیادی جزو ہے۔ میگنیشیم کے بغیر پودا کلوروفل تیار نہیں کر سکتا، جس کی وجہ سے پتے سبز رہنے کے بجائے پیلے پڑ جاتے ہیں جسے کلوروسس کہا جاتا ہے۔",
                    whyExplanationPs = "مګنیزیم د شین رنګه کلوروفیل د مالیکول اصلي مرکزي برخه ده. له مګنیزیم پرته بوټی کلوروفیل نشي جوړولی، نو ځکه پاڼې ژېړې کیږي.",
                    formulaOrStep = "Mg deficiency ➔ Chlorophyll failure ➔ Chlorosis (Yellow leaves)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which vascular tissue transports dissolved sugars bidirectionally, and what state are its cells in?",
                    questionUr = "کون سا عروقی بافت (ٹشو) تیار خوراک کو اوپر نیچے دونوں سمتوں میں لے جاتا ہے، اور اس کے خلیات کس حالت میں ہوتے ہیں؟",
                    questionPs = "کوم عصبي نسج جوړ شوی خواړه په دوه اړخیزه توګه لېږدوي، او حجرې یې په کوم حالت کې وي؟",
                    options = listOf(
                        "Xylem, consisting of dead lignified hollow vessels",
                        "Phloem, consisting of living sieve tube and companion cells",
                        "Epidermis, consisting of waxy protective cells",
                        "Cortex, consisting of storage pith cells"
                    ),
                    correctIndex = 1,
                    whyExplanationEn = "Phloem consists of living sieve tube cells and companion cells that use energy (translocation) to transport dissolved sucrose both upwards to growing shoots and downwards to roots and storage organs.",
                    whyExplanationUr = "فلوئم زندہ سیو ٹیوب اور ساتھی خلیات پر مشتمل ہوتا ہے، جو توانائی کے ذریعے تیار شدہ شکر کو بیک وقت اوپر شاخوں اور نیچے جڑوں اور پھلوں تک دونوں سمتوں میں پہنچاتا ہے۔",
                    whyExplanationPs = "فلویم ژوندي حجرې لري چې خواړه د ترانسلوکیشن له لارې په یو وخت کې هم پورته او هم ښکته ریښو ته رسوي.",
                    formulaOrStep = "Phloem = Living cells, Transports sucrose up & down",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "On a very hot, windy, and dry afternoon, what will happen to the rate of transpiration, and why might the plant wilt?",
                    questionUr = "انتہائی گرم، ہوا دار اور خشک دوپہر کے وقت بخارات کے اخراج (ٹرانسپیریشن) کی شرح کیا ہوگی، اور پودا مرجھا کیوں سکتا ہے؟",
                    questionPs = "په یوه ډېره توده، بادي او وچه غرمه کې، د ترانسپایریشن کچه څه کیږي او بوټی ولې مړاوی کیږي؟",
                    options = listOf(
                        "Transpiration stops completely because wind blocks stomata",
                        "Transpiration rate surges; if water loss exceeds root intake, cells lose turgor and wilt",
                        "Transpiration decreases because heat solidifies xylem water",
                        "Transpiration only occurs if air humidity is 100%"
                    ),
                    correctIndex = 1,
                    whyExplanationEn = "High temperature increases water evaporation, dry air steepens the concentration gradient, and wind rapidly removes humid air from leaf surfaces. If water loss exceeds the rate roots can absorb it, cells lose turgor pressure and the plant wilts.",
                    whyExplanationUr = "زیادہ درجہ حرارت اور ہوا پتوں کی سطح سے بخارات بننے کی رفتار بہت تیز کر دیتے ہیں۔ اگر پانی کا اخراج جڑوں کے پانی جذب کرنے کی رفتار سے زیادہ ہو جائے تو خلیات کا تناؤ (ٹرگر) ختم ہو جاتا ہے اور پودا مرجھا جاتا ہے۔",
                    whyExplanationPs = "لوړه تودوخه او باد د تبخیر کچه بې حده لوړوي. که له پاڼو د اوبو وتل له ریښو د جذب پرتله زیات شي، حجرې خپل توازن له لاسه ورکوي او بوټی مړاوی کیږي.",
                    formulaOrStep = "Rate factors: Temp ↑, Wind ↑, Humidity ↓ ➔ Transpiration ↑↑",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "In a leaf cross-section, which tissue contains the highest concentration of chloroplasts for maximum photosynthesis?",
                    questionUr = "پتے کے اندرونی تراشے میں، زیادہ سے زیادہ ضیائی تالیف (فوٹوسنتھیسز) کے لیے کلوروپلاسٹس کی سب سے زیادہ مقدار کس حصے میں ہوتی ہے؟",
                    questionPs = "د پاڼې په داخلي جوړښت کې، د ډېرې فوتوسنتز لپاره د کلوروپلاسټ تر ټولو ډېره برخه په کوم نسج کې وي؟",
                    options = listOf(
                        "Palisade mesophyll layer just beneath upper epidermis",
                        "Waxy cuticle layer on outer surface",
                        "Lower epidermal cells lacking stomata",
                        "Central vascular pith tissue"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Palisade mesophyll cells are vertically arranged near the upper surface of the leaf where sunlight is most intense, and they are packed with the maximum number of chloroplasts for photosynthesis.",
                    whyExplanationUr = "پیلیسائیڈ میزوفل خلیات پتے کی اوپری سطح کے بالکل نیچے سیدھے کالموں میں ترتیب پائے ہوتے ہیں جہاں سورج کی روشنی سب سے زیادہ پڑتی ہے، اور ان میں کلوروپلاسٹس کی سب سے زیادہ تعداد ہوتی ہے۔",
                    whyExplanationPs = "پیلیسایډ میسوفیل حجرې د پاڼې د پورته مخ لاندې ځای پر ځای دي چې لمریزه رڼا مستقیمه پرې لګیږي او تر ټولو ډېر کلوروپلاسټونه لري.",
                    formulaOrStep = "Upper epidermis ➔ Palisade mesophyll (Dense chloroplasts)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the primary physical mechanism behind the 'Transpiration Pull' that lifts water in 50-meter-tall forest trees?",
                    questionUr = "وہ کون سا بنیادی طبعی عمل ہے جس کی وجہ سے پیدا ہونے والا 'ٹرانسپیریشن پل' 50 میٹر اونچے جنگلی درختوں میں پانی اوپر کھینچتا ہے؟",
                    questionPs = "هغه کوم اصلي فزیکي میکانیزم دی چې د ۵۰ متره لوړو ونو تر سر پورې اوبه راکاږي؟",
                    options = listOf(
                        "Continuous water evaporation from stomata creating negative pressure tension in xylem",
                        "Pumping action of living muscular cells in the stem cortex",
                        "Gravitational pull pulling water molecules upward",
                        "Complete closing of stomata trapping air inside"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "As water molecules evaporate from stomatal air chambers, cohesive hydrogen bonding between water molecules and adhesive forces to xylem walls form an unbroken water column under tension, pulling water all the way from root soil to treetop leaves.",
                    whyExplanationUr = "جب سٹوماٹا سے پانی کے مالیکیولز بخارات بن کر اڑتے ہیں تو پانی کے مالیکیولز کے باہمی کھچاؤ (کوہیشن) اور زائلم کی دیواروں سے چپکنے سے پانی کا ایک اٹوٹ ستون بنتا ہے جو جڑوں سے بلندی تک پانی کھینچ لیتا ہے۔",
                    whyExplanationPs = "له سټوماټا څخه د اوبو تبخیر په زایلم کې منفي فشار راولي چې د اوبو د مالیکولونو د پیوستون له امله اوبه له ریښو پورته راکاږي.",
                    formulaOrStep = "Transpiration at stomata ➔ Negative tension in xylem ➔ Pulls water up",
                    difficulty = 3
                )
            )
        ),

        // ─── UNIT 2: HUMAN RESPIRATORY & CIRCULATORY SYSTEM (p. 15–28) ───
        Class7ScienceStage(
            id = 2,
            unitNumber = "Unit 2",
            pageRange = "Pages 15–28",
            titleEn = "Human Respiratory & Circulatory System",
            titleUr = "انسانی نظامِ تنفس اور نظامِ دورانِ خون",
            titlePs = "د انسان د تنفس او د وینې د دوران نظام",
            themeColor = Color(0xFFDC2626),
            secondaryColor = Color(0xFF7F1D1D),
            summaryEn = "Cellular respiration breaks down glucose to release energy (aerobic in mitochondria yields large ATP; anaerobic yields lactic acid). The respiratory tract (nose, trachea with cartilage rings, bronchi, alveoli) facilitates gas exchange across thin capillary walls. The human heart has 4 chambers; the thick-walled left ventricle pumps oxygenated blood through the aorta into arteries, capillaries, and veins back to the right atrium.",
            summaryUr = "خلیاتی تنفس گلوکوز کو توڑ کر توانائی خارج کرتا ہے (مائٹوکونڈریا میں آکسیجن کے ساتھ ایروبک تنفس زیادہ توانائی بناتا ہے؛ جبکہ بغیر آکسیجن این ایروبک تنفس سے لیکٹک ایسڈ بنتا ہے)۔ نظام تنفس ناک، ہوا کی نالی، برونکائی اور ہوائی تھیلیوں (ایلویولائی) پر مشتمل ہے جہاں گیسوں کا تبادلہ ہوتا ہے۔ انسانی دل چار خانوں پر مشتمل ہے جس کا بایاں وینٹریکل پورے جسم کو خون پمپ کرتا ہے۔",
            summaryPs = "حجروي تنفس ګلوکوز ماتوي ترڅو انرژي ازاده کړي. تنفسي غونډال پوزه، ټراکیا، برانچونه او الویولي لري چې د ګازونو تبادله کوي. زړه څلور خونې لري او کیڼ وینټریکل ټول بدن ته اکسیجن لرونکې وینه پمپ کوي.",
            equationsAndLaws = listOf(
                "Aerobic Respiration: C6H12O6 + 6O2 ➔ 6CO2 + 6H2O + 36 ATP (High energy)",
                "Anaerobic Respiration (Muscles): Glucose ➔ Lactic Acid + 2 ATP (Fatigue & cramps)",
                "Circulation: Left Ventricle ➔ Aorta ➔ Body Organs ➔ Vena Cava ➔ Right Atrium ➔ Lungs"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Aerobic vs Anaerobic Respiration",
                    conceptOrLaw = "Mitochondria & Lactic Acid",
                    detailEn = "Aerobic respiration requires oxygen and fully oxidizes glucose into CO2 and water, producing 36 ATP energy molecules. Anaerobic respiration occurs without oxygen during heavy sprint exertion, producing lactic acid which causes muscle cramps.",
                    detailUr = "ایروبک تنفس کے لیے آکسیجن درکار ہوتی ہے جو گلوکوز کو مکمل توڑ کر کاربن ڈائی آکسائیڈ، پانی اور 36 اے ٹی پی توانائی پیدا کرتا ہے۔ بغیر آکسیجن این ایروبک تنفس میں لیکٹک ایسڈ بنتا ہے جس سے پٹھوں میں اینٹھن (درد) ہوتی ہے۔",
                    detailPs = "ایروبیک تنفس اکسیجن غواړي او ۳۶ مالیکولونه انرژي جوړوي. انیروبیک تنفس بې له اکسیجنه ترسره کیږي او لکټیک اسید جوړوي چې د عضلاتو د ستړیا او درد لامل ګرځي.",
                    cardColor = Color(0xFFB91C1C)
                ),
                Class7ScienceCard(
                    title = "Alveoli - Gas Exchange",
                    conceptOrLaw = "Diffusion Across 1-Cell Thick Epithelium",
                    detailEn = "Lungs contain 300 million tiny alveoli (air sacs) lined with a moist single cell layer and surrounded by blood capillaries. Oxygen diffuses into blood red blood cells (hemoglobin), while CO2 diffuses from plasma into the alveoli to be exhaled.",
                    detailUr = "پھیپھڑوں میں 30 کروڑ چھوٹی ہوائی تھیلیاں (ایلویولائی) ہوتی ہیں جن کی دیواریں صرف ایک سیل جتنی باریک ہوتی ہیں اور ان کے گرد کیپلریز کا جال ہوتا ہے۔ آکسیجن خون میں نفوذ کرتی ہے اور کاربن ڈائی آکسائیڈ ایلویولائی میں داخل ہو کر خارج ہو جاتی ہے۔",
                    detailPs = "سږو کې شاوخوا ۳۰۰ میلیونه هوايي کڅوړې (الویولي) شتون لري. اکسیجن وینې ته ننوځي او کاربن ډای اکسایډ بېرته سږو ته ځي چې بهر ووځي.",
                    cardColor = Color(0xFFDC2626)
                ),
                Class7ScienceCard(
                    title = "The 4-Chambered Heart",
                    conceptOrLaw = "Double Circulation System",
                    detailEn = "Right Atrium receives deoxygenated blood from body ➔ Right Ventricle pumps it to lungs (pulmonary). Left Atrium receives oxygenated blood from lungs ➔ Left Ventricle (thickest muscle) pumps it to all organs via the aorta (systemic). Valves prevent backflow.",
                    detailUr = "دایاں ایٹریم جسم سے غیر صاف خون حاصل کرتا ہے ➔ دایاں وینٹریکل اسے پھیپھڑوں میں بھیجتا ہے۔ بایاں ایٹریم صاف خون لیتا ہے ➔ بایاں وینٹریکل (سب سے موٹی دیواروں والا) اسے شہ رگ (ایورٹا) کے ذریعے پورے جسم میں بھیجتا ہے۔ والوز خون کو واپس آنے سے روکتے ہیں۔",
                    detailPs = "زړه څلور خونې لري: ښی ایټریم ناپاکه وینه اخلي، ښی وینټریکل یې سږو ته لیږي. کیڼ ایټریم پاکه وینه اخلي او کیڼ وینټریکل یې د اوورټا له لارې ټول بدن ته پمپ کوي.",
                    cardColor = Color(0xFF991B1B)
                ),
                Class7ScienceCard(
                    title = "Blood Vessels Compared",
                    conceptOrLaw = "Arteries, Veins & Capillaries",
                    detailEn = "Arteries have thick elastic muscular walls to withstand high systolic pressure pumping blood away from heart. Veins have wider lumens and one-way valves preventing backflow under low pressure. Capillaries are one-cell thick for nutrient exchange.",
                    detailUr = "شریانوں (آرٹریز) کی دیواریں موٹی اور لچکدار ہوتی ہیں تاکہ دل کے اونچے پریشر کو برداشت کر سکیں۔ وریدوں (وینز) کی دیواریں پتلی ہوتی ہیں اور ان میں یک طرفہ والوز ہوتے ہیں جو خون کو الٹا بہنے سے روکتے ہیں۔ کیپلریز مادوں کے تبادلے کے لیے انتہائی باریک ہوتی ہیں۔",
                    detailPs = "شریانونه د لوړ فشار زغملو لپاره پنډ دیوالونه لري. وریدونه والونه لري چې وینه بېرته شاته رانه شي. کیپلري حجرې یوازې یو مایکرو ضخامت لري چې تبادله اسانه کړي.",
                    cardColor = Color(0xFFEF4444)
                ),
                Class7ScienceCard(
                    title = "Blood Components",
                    conceptOrLaw = "RBCs, WBCs, Platelets & Plasma",
                    detailEn = "Red blood cells (lack nucleus, contain hemoglobin to bind O2); White blood cells (phagocytes engulf bacteria, lymphocytes make antibodies); Platelets (fragments that form blood clots to stop bleeding); Plasma (liquid carrying glucose, urea, CO2, ions).",
                    detailUr = "سرخ ذرات (نیوکلیئس کے بغیر، ہیموگلوبن کے ذریعے آکسیجن لے جاتے ہیں)؛ سفید ذرات (جراثیم کو کھاتے ہیں اور اینٹی باڈیز بناتے ہیں)؛ پلیٹ لیٹس (خون جمانے والے ذرات جو بہاؤ روکتے ہیں)؛ پلازما (مائع جو خوراک، یوریا اور گیسیں منتقل کرتا ہے)۔",
                    detailPs = "سره کرویات (اکسیجن لېږدوي)، سپین کرویات (د ناروغیو دفاع کوي)، پلیټلیټس (وینه جموي او د وینې بهېدل دروي)، پلازما (مایع چې غذايي مواد لېږدوي).",
                    cardColor = Color(0xFF7F1D1D)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Why does the Left Ventricle of the human heart possess significantly thicker muscular walls than the Right Ventricle?",
                    questionUr = "انسانی دل کے بائیں وینٹریکل کی عضلاتی دیواریں دائیں وینٹریکل کے مقابلے میں نمایاں طور پر موٹی کیوں ہوتی ہیں؟",
                    questionPs = "د انسان د زړه د کیڼ وینټریکل دیوالونه ولې د ښي وینټریکل په پرتله ډېر پنډ او غښتلي وي؟",
                    options = listOf(
                        "Because it must pump blood under high pressure across the entire systemic body, not just nearby lungs",
                        "Because it stores all deoxygenated blood returning from legs",
                        "Because it contains valves that filter out white blood cells",
                        "Because it absorbs food directly from the stomach"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The right ventricle only pumps blood a short distance to the lungs (pulmonary circuit). The left ventricle must generate enough contractile force to pump oxygenated blood through the aorta to the brain, limbs, and all distant organs.",
                    whyExplanationUr = "دایاں وینٹریکل خون کو صرف قریبی پھیپھڑوں تک بھیجتا ہے، جبکہ بائیں وینٹریکل کو اتنی طاقت پیدا کرنی ہوتی ہے کہ خون شہ رگ کے ذریعے سر سے پاؤں تک پورے جسم کے اعضاء تک پہنچ سکے۔",
                    whyExplanationPs = "ښی وینټریکل وینه یوازې نږدې سږو ته لیږي، خو کیڼ وینټریکل باید وینه د اوورټا له لارې ټول بدن، مغز او پښو ته پمپ کړي نو ځکه ډېر زورور عضلات لري.",
                    formulaOrStep = "Left Ventricle ➔ Systemic Circulation (High Resistance) ➔ Thickest myocardium",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "During rigorous physical exercise, why does lactic acid accumulate in leg muscles, causing soreness?",
                    questionUr = "سخت ورزش کے دوران ٹانگوں کے پٹھوں میں لیکٹک ایسڈ کیوں جمع ہو جاتا ہے، جس سے درد اور اینٹھن پیدا ہوتی ہے؟",
                    questionPs = "د سخت ورزش پر مهال په عضلاتو کې لکټیک اسید ولې راټولیږي چې د درد لامل ګرځي؟",
                    options = listOf(
                        "Muscles lack adequate oxygen, switching to anaerobic respiration to produce emergency ATP",
                        "Lungs stop inhaling carbon dioxide during exercise",
                        "Heart valves close, preventing blood from flowing into muscles",
                        "Red blood cells convert hemoglobin directly into fat"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "When oxygen delivery cannot keep pace with the huge energy demand of contracting muscles, muscle cells switch to anaerobic respiration: Glucose is incompletely broken down into lactic acid, producing rapid ATP but accumulating acidic waste.",
                    whyExplanationUr = "جب تیز دوڑنے سے پٹھوں کو ضرورت کے مطابق آکسیجن نہ ملے تو وہ این ایروبک تنفس شروع کر دیتے ہیں جس میں گلوکوز لیکٹک ایسڈ میں تبدیل ہو جاتا ہے، اور اس کے جمع ہونے سے پٹھوں میں درد اور تھکاوٹ ہوتی ہے۔",
                    whyExplanationPs = "کله چې عضلاتو ته پوره اکسیجن ونه رسیږي، حجرې انیروبیک تنفس کوي چې ګلوکوز په لکټیک اسید بدلوي او د عضلاتو د ستړیا لامل ګرځي.",
                    formulaOrStep = "Glucose (low O2) ➔ Lactic Acid + 2 ATP",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the structural role of the C-shaped cartilage rings in the human trachea (windpipe)?",
                    questionUr = "انسانی سانس کی نالی (ٹریکیا) میں سی (C) کی شکل کے کُرکری ہڈی (کارٹیلیج) کے چھلوں کا کیا کام ہے؟",
                    questionPs = "د انسان د تنفس په نلۍ (ټراکیا) کې د C ډوله کرپندوکو کړیو دنده څه ده؟",
                    options = listOf(
                        "They prevent the trachea from collapsing when air pressure drops during inhalation",
                        "They pump oxygen into the esophagus",
                        "They filter out carbon dioxide before it reaches lungs",
                        "They produce white blood cells directly in the neck"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Cartilage is firm yet flexible tissue. The C-shaped rings maintain an open patent airway under negative pressure during inhalation and prevent the windpipe from collapsing shut.",
                    whyExplanationUr = "کارٹیلیج مضبوط اور لچکدار بافت ہے۔ یہ سی کی شکل کے چھلے سانس اندر کھینچتے وقت منفی پریشر کے دوران سانس کی نالی کو پچکنے اور بند ہونے سے روکتے ہیں۔",
                    whyExplanationPs = "دا کړۍ د ساه اخیستلو پر مهال د هوا د نلۍ د نښتلو او بندېدو مخه نیسي او لاره تل خلاصه ساتي.",
                    formulaOrStep = "Cartilage rings ➔ Structural rigidity ➔ Prevents collapse during negative pressure",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why do veins have internal valves, while arteries do not need them?",
                    questionUr = "وریدوں (وینز) کے اندر والوز کیوں ہوتے ہیں، جبکہ شریانوں (آرٹریز) کو ان کی ضرورت نہیں ہوتی؟",
                    questionPs = "وریدونه ولې والونه لري، خو شریانونه ورته اړتیا نه لري؟",
                    options = listOf(
                        "Veins carry low-pressure blood against gravity, needing valves to prevent backflow",
                        "Arteries only carry oxygen which does not flow backwards",
                        "Veins pump blood away from heart with higher speed than arteries",
                        "Valves are only present to absorb digestive nutrients"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Blood in veins has already passed through fine capillaries, so pressure is low. As venous blood travels upwards from feet back to the heart against gravity, pocket valves prevent blood from pooling or flowing backwards between heartbeats.",
                    whyExplanationUr = "وریدوں میں خون کا دباؤ بہت کم ہوتا ہے کیونکہ وہ کیپلریز سے گزر چکا ہوتا ہے۔ جب خون پیروں سے اوپر دل کی طرف کشش ثقل کے خلاف جاتا ہے تو والوز اسے نیچے واپس جانے سے روکتے ہیں۔",
                    whyExplanationPs = "په وریدونو کې د وینې فشار کم وي او د ځمکې د جاذبې خلاف پورته ځي، نو والونه وینه بېرته شاته تګ ته نه پریږدي.",
                    formulaOrStep = "Low venous pressure + Gravity ➔ Pocket valves prevent retrograde flow",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "A patient gets a minor cut, and a scab quickly forms to stop bleeding. Which blood component is primarily responsible for clotting?",
                    questionUr = "ایک مریض کو معمولی کٹ لگتا ہے، اور خون بہنا رکنے کے لیے کھرنڈ (خون کا لوتھڑا) بن جاتا ہے۔ خون جمانے کے لیے کون سا جزو ذمہ دار ہے؟",
                    questionPs = "د یوه کس لاس لږ پرې کیږي او وینه ژر بندیږي، د وینې کومه برخه وینه جموي؟",
                    options = listOf(
                        "Platelets (thrombocytes), which release clotting factors to produce fibrin mesh",
                        "Red blood cells containing hemoglobin",
                        "White blood cells that engulf red cells",
                        "Liquid water molecules in blood plasma"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Platelets are tiny cell fragments without nuclei. When a blood vessel is damaged, platelets adhere to the wound site and release clotting enzymes that convert soluble fibrinogen into an insoluble fibrin mesh to trap blood cells and seal the leak.",
                    whyExplanationUr = "پلیٹ لیٹس خلیاتی ذرات ہوتے ہیں۔ زخم لگنے پر یہ فوراً زخم کی جگہ جمع ہو کر کیمیکلز خارج کرتے ہیں جو فائبرن کا جال بنا دیتے ہیں، جس سے خون جم کر بہنا بند ہو جاتا ہے۔",
                    whyExplanationPs = "پلیټلیټس د وینې هغه ټوټې دي چې د زخم پر مهال یو جال جوړوي او د وینې بهېدل دروي.",
                    formulaOrStep = "Platelets + Clotting factors ➔ Fibrin mesh ➔ Blood clot seals wound",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 3: IMMUNITY AND DISEASES (p. 29–40) ───
        Class7ScienceStage(
            id = 3,
            unitNumber = "Unit 3",
            pageRange = "Pages 29–40",
            titleEn = "Immunity & Diseases",
            titleUr = "قوتِ مدافعت اور بیماریاں",
            titlePs = "د بدن مدافعت او ناروغۍ",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            summaryEn = "Pathogens (bacteria, viruses, fungi, protozoa) cause infectious diseases. The body defends itself through three lines of defence: 1st line (physical barriers like skin, mucus, stomach acid); 2nd line (phagocytes engulfing pathogens via phagocytosis and inflammatory response); 3rd line (lymphocytes producing specific antibodies and memory cells). Vaccines introduce weakened/dead antigens to induce active immunity.",
            summaryUr = "بیماری پھیلانے والے جراثیم (بیکٹیریا، وائرس، فنگس، پروٹوزووا) متعدی امراض کا سبب بنتے ہیں۔ انسانی جسم تین دفاعی لکیروں کے ذریعے اپنا دفاع کرتا ہے: پہلی لکیر (جلد، میوکس، معدے کا تیزاب)؛ دوسری لکیر (فیگوسائٹس جو جراثیم کو نگل لیتے ہیں)؛ تیسری لکیر (لمفوسائٹس جو مخصوص اینٹی باڈیز اور میموری سیلز بناتے ہیں)۔ ویکسین کمزور جراثیم داخل کر کے مدافعت پیدا کرتی ہے۔",
            summaryPs = "ناروغۍ راوړونکي مایکروبونه متعدي ناروغۍ رامنځته کوي. د بدن درې دفاعي کرښې دي: لومړۍ (پوټکی، تیزاب)، دویمه (سپین کرویات چې باکتریا خوري)، درېیمه (انټي باډي او حافظې حجرې). واکسین د بدن مدافعت پیاوړی کوي.",
            equationsAndLaws = listOf(
                "First Line: Skin barrier + Lysozyme in tears + Hydrochloric acid (pH 1.5–2.0) in stomach",
                "Second Line: Non-specific Phagocytosis (white blood cells engulf and digest pathogens)",
                "Third Line: Specific Lymphocytes ➔ Antigen Recognition ➔ Antibody Secretion + Memory Cells",
                "Vaccine Action: Weakened Antigen ➔ Lymphocyte Memory ➔ Rapid High-Titer Response on Real Exposure"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Pathogens Overview",
                    conceptOrLaw = "Bacteria, Viruses, Fungi, Protozoa",
                    detailEn = "Bacteria are single-celled prokaryotes (e.g. Cholera, TB); Viruses are genetic material in protein coats requiring host cells to replicate (e.g. Flu, Polio, COVID); Fungi cause Ringworm and Athlete's foot; Protozoa cause Malaria via Anopheles mosquito.",
                    detailUr = "بیکٹیریا یک خلوی جاندار ہیں (جیسے ہیضہ، ٹی بی)؛ وائرس پروٹین کوٹ میں بند جینیاتی مادہ ہیں جو میزبان خلیے میں تقسیم ہوتے ہیں (جیسے پولیو، فلو)؛ فنگس داد اور چنبل کا سبب بنتی ہے؛ پروٹوزووا مچھر کے ذریعے ملیریا پھیلاتے ہیں۔",
                    detailPs = "باکتریا یو حجروي ژوي دي (لکه کولرا، تبه)؛ ویروسونه یوازې کوربه حجره کې تکثیر کوي (لکه پولیو، والګی)؛ فنګس جلدي ناروغۍ جوړوي؛ او پروټوزوا ملاریا رامنځته کوي.",
                    cardColor = Color(0xFF6D28D9)
                ),
                Class7ScienceCard(
                    title = "First Line of Defence",
                    conceptOrLaw = "Physical & Chemical Barriers",
                    detailEn = "Unbroken skin prevents microbe entry; tears contain lysozyme enzyme that destroys bacterial cell walls; respiratory mucus traps dust and pathogens, propelled out by cilia; stomach hydrochloric acid kills ingested microbes.",
                    detailUr = "صحت مند جلد جراثیم کا راستہ روکتی ہے؛ آنسوؤں میں لائسوزائم انزائم بیکٹیریا کو مارتا ہے؛ سانس کی نالی کا بلغم اور بال جراثیم کو پھنساتے ہیں؛ اور معدے کا ہائیڈروکلورک ایسڈ کھانے کے ساتھ جانے والے جراثیم کو ہلاک کر دیتا ہے۔",
                    detailPs = "روغ پوټکی، د سترګو اوښکې (انزایمونه)، د سږو بلغم، او د معدې تیزاب لومړنۍ دفاعي کرښه ده چې جراثیم بدن ته ننوتلو ته نه پریږدي.",
                    cardColor = Color(0xFF7C3AED)
                ),
                Class7ScienceCard(
                    title = "Phagocytosis (2nd Line)",
                    conceptOrLaw = "Engulfing & Intracellular Digestion",
                    detailEn = "When pathogens breach the skin, phagocytic white blood cells detect chemical signals, migrate to infection site, surround the bacterium with pseudopodia, engulf it into a vacuole, and destroy it with digestive enzymes.",
                    detailUr = "جب جراثیم جلد عبور کر لیتے ہیں تو فیگوسائٹ سفید خلیات انفیکشن کی جگہ پہنچ کر جراثیم کو اپنے گھیرے میں لے لیتے ہیں اور انزائمز کے ذریعے ہضم کر کے تباہ کر دیتے ہیں، جسے فیگوسائٹوسس کہتے ہیں۔",
                    detailPs = "کله چې میکروبونه پوټکي نه تېر شي، سپین کرویات هغوی ګیروي او د خپلو هاضمي انزایمونو په مرسته یې خوري او وژني.",
                    cardColor = Color(0xFF5B21B6)
                ),
                Class7ScienceCard(
                    title = "Antibodies & Memory (3rd Line)",
                    conceptOrLaw = "Specific Immune Response",
                    detailEn = "Lymphocytes recognize foreign antigens on pathogen surfaces. They produce millions of Y-shaped antibodies that bind specifically to antigens, neutralizing toxins and clumping pathogens. Memory cells persist for lifelong protection.",
                    detailUr = "لمفوسائٹس جراثیم کی سطح پر موجود اینٹی جنز کو پہچان کر وائی (Y) کی شکل کی مخصوص اینٹی باڈیز بناتے ہیں جو جراثیم کو ناکارہ بنا دیتی ہیں۔ میموری سیلز زندگی بھر کے لیے اس جراثیم کو یاد رکھتے ہیں۔",
                    detailPs = "لمفوسایټونه د انټي باډي په نوم ځانګړي وسایل جوړوي چې له میکروبونو سره نښلي او هغوی شنډوي، او یادښت حجرې یې تل لپاره په ذهن کې ساتي.",
                    cardColor = Color(0xFF8B5CF6)
                ),
                Class7ScienceCard(
                    title = "How Vaccines Work",
                    conceptOrLaw = "Active Immunity Induction",
                    detailEn = "A vaccine contains weakened (attenuated) or killed pathogens, or harmless parts. It cannot cause illness, but stimulates lymphocytes to produce specific antibodies and long-lived memory cells. If the real pathogen enters later, memory cells destroy it instantly.",
                    detailUr = "ویکسین میں کمزور یا مردہ جراثیم ہوتے ہیں۔ یہ بیماری پیدا نہیں کرتے بلکہ جسم کے مدافعتی نظام کو اینٹی باڈیز اور میموری سیلز بنانے پر آمادہ کرتے ہیں۔ آئندہ اصل جراثیم آنے پر جسم اسے فوری طور پر ختم کر دیتا ہے۔",
                    detailPs = "واکسین کمزوري شوي میکروبونه بدن ته داخلوي ترڅو بدن انټي باډي او حافظې حجرې جوړې کړي، ترڅو راتلونکي کې د اصلي ناروغۍ مخه ونیسي.",
                    cardColor = Color(0xFF4C1D95)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Why does receiving a measles vaccine protect a child from getting sick years later when exposed to real measles virus?",
                    questionUr = "خسرہ (میزلز) کی ویکسین لگوانے سے سالوں بعد بھی بچہ اصل خسرہ کے وائرس سے بیمار کیوں نہیں ہوتا؟",
                    questionPs = "د شري (میزلز) واکسین ولې یو ماشوم کلونه وروسته هم له اصلي ناروغۍ څخه ژغوري؟",
                    options = listOf(
                        "The vaccine stimulated lymphocytes to generate long-lived memory cells that rapidly produce specific antibodies upon real infection",
                        "The vaccine kills all bacteria inside the child's stomach permanently",
                        "The vaccine hardens the child's outer skin so viruses cannot pass through",
                        "The vaccine replaces human white blood cells with plant chloroplasts"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Vaccines contain harmless antigen forms that trigger the primary immune response. Memory B-lymphocytes are stored in lymph nodes, enabling immediate secondary antibody production before the actual pathogen can cause illness.",
                    whyExplanationUr = "ویکسین مدافعتی نظام کو خسرہ کے اینٹی جنز سے روشناس کرواتی ہے۔ میموری سیلز سالوں تک محفوظ رہتے ہیں اور جیسے ہی اصل وائرس حملہ کرتا ہے وہ فوراً اینٹی باڈیز کا سیلاب پیدا کر کے اسے بیماری پھیلانے سے پہلے ختم کر دیتے ہیں۔",
                    whyExplanationPs = "واکسین د بدن حافظې حجرې ویښوي. کله چې اصلي ویروس راشي، دا حجرې سمدستي ډېر انټي باډي جوړوي او ویروس له منځه وړي مخکې تر دې چې ماشوم ناروغ شي.",
                    formulaOrStep = "Vaccine ➔ Memory B-cells formed ➔ Secondary exposure ➔ Instant antibody surge",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the primary antibacterial chemical defense found inside human tears and saliva?",
                    questionUr = "انسانی آنسوؤں اور تھوک میں پایا جانے والا بنیادی جراثیم کش کیمیائی دفاع کون سا ہے؟",
                    questionPs = "د انسان په اوښکو او لاړو کې کوم کیمیاوي دفاعي انزایم باکتریاوې وژني؟",
                    options = listOf(
                        "Lysozyme, an enzyme that digests peptidoglycan bacterial cell walls",
                        "Hydrochloric acid of pH 1.0",
                        "Pure sulfur crystals",
                        "Hemoglobin oxygen gas"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Lysozyme is a protective antimicrobial enzyme synthesized in lacrimal tear glands and salivary glands. It chemically hydrolyzes the peptidoglycan bonds in bacterial cell walls, causing bacteria to lyse and burst.",
                    whyExplanationUr = "لائسوزائم ایک جراثیم کش انزائم ہے جو آنسوؤں اور تھوک میں ہوتا ہے۔ یہ بیکٹیریا کی خلیاتی دیوار کو کیمیائی طور پر توڑ دیتا ہے جس سے بیکٹیریا پھٹ کر مر جاتے ہیں۔",
                    whyExplanationPs = "لایسوزایم یو انزایم دی چې په اوښکو کې وي او د باکتریاو دیوالونه ماتوي او له منځه یې وړي.",
                    formulaOrStep = "Tears / Saliva ➔ Lysozyme enzyme ➔ Hydrolyzes bacterial cell wall",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Why do antibiotics cure bacterial diseases like Strep Throat, but are completely ineffective against viral diseases like Influenza?",
                    questionUr = "اینٹی بائیوٹکس اسٹریپ تھروٹ جیسی بیکٹیریل بیماریوں کو تو ٹھیک کر دیتی ہیں لیکن انفلوئنزا جیسی وائرل بیماریوں پر بالکل بے اثر کیوں ہوتی ہیں؟",
                    questionPs = "انټي بیوټیکونه ولې باکتریایي ناروغۍ ښې کوي، خو د فلو په څېر ویروسي ناروغیو باندې هېڅ اغېز نه لري؟",
                    options = listOf(
                        "Antibiotics target bacterial cell structures (walls, ribosomes); viruses lack cellular structures and reproduce inside human host cells",
                        "Viruses are too large to be affected by medicines",
                        "Viruses live only in tap water and never enter blood",
                        "Antibiotics only work when taken in freezing weather"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Bacteria are independent living prokaryotes with distinct cell walls and metabolic machinery that antibiotics target. Viruses have no cell wall or metabolic pathways—they hijack host human cellular machinery, making antibiotics harmless against them.",
                    whyExplanationUr = "اینٹی بائیوٹکس بیکٹیریا کی خلیاتی دیوار اور میٹابولزم کو نشانہ بناتی ہیں۔ وائرسز کا اپنا کوئی خلیاتی نظام نہیں ہوتا بلکہ وہ انسانی خلیے کے اندر مشینری استعمال کرتے ہیں، اس لیے اینٹی بائیوٹکس ان پر اثر نہیں کر سکتیں۔",
                    whyExplanationPs = "انټي بیوټیک یوازې د باکتریا دیوالونه په نښه کوي. ویروسونه حجرې نه لري او د انسان حجرو کې پټ وي نو ځکه انټي بیوټیک ورباندې کار نه کوي.",
                    formulaOrStep = "Antibiotics target bacterial cell walls ➔ Viruses lack cell walls ➔ Ineffective",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following represents an example of 'Passive Immunity' rather than active immunity?",
                    questionUr = "درج ذیل میں سے کون سا عمل ایکٹو امیونٹی کے بجائے 'پیسو امیونٹی' (غیر فعال مدافعت) کی مثال ہے؟",
                    questionPs = "له لاندې مواردو څخه کوم یو د غیر فعال مدافعت (پیسیو امیونټي) بېلګه ده؟",
                    options = listOf(
                        "An infant receiving maternal antibodies through breast milk or snake anti-venom injection",
                        "A child surviving chickenpox and developing memory cells",
                        "Receiving a polio vaccine containing weakened virus",
                        "Catching a common cold and recovering after 5 days"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Passive immunity occurs when a person is given pre-formed ready-made antibodies rather than producing them via their own lymphocytes. It provides immediate but temporary protection because no memory cells are created.",
                    whyExplanationUr = "پیسو امیونٹی میں جسم خود اینٹی باڈیز نہیں بناتا بلکہ تیار شدہ اینٹی باڈیز حاصل کرتا ہے (جیسے ماں کے دودھ سے یا سانپ کے زہر کے تریاق سے)۔ یہ فوری مگر عارضی مدافعت ہوتی ہے کیونکہ اس میں میموری سیلز نہیں بنتے۔",
                    whyExplanationPs = "په غیر فعال مدافعت کې بدن پخپله دفاعي حجرې نه جوړوي، بلکې تیار شوي انټي باډي اخلي (لکه د مور د شیدو له لارې)، چې موقتي وي خو سمدستي کار کوي.",
                    formulaOrStep = "Pre-formed ready antibodies received ➔ Passive Immunity (No memory cells)",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the function of the 'Cilia' lining the epithelial cells of the human respiratory tract?",
                    questionUr = "انسانی سانس کی نالی کے خلیات پر موجود باریک بالوں (سیلیا) کا کیا کام ہوتا ہے؟",
                    questionPs = "د انسان د تنفسي نلۍ د خلیو پر سر د باریکو وېښتانو (سیلیا) دنده څه ده؟",
                    options = listOf(
                        "Rhythmically beating to sweep mucus and trapped microbes upward away from lungs toward the throat",
                        "Absorbing oxygen directly into the neck arteries",
                        "Producing stomach acid to digest inhaled smoke",
                        "Holding vocal cords tightly closed at all times"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Cilia are microscopic hair-like projections that beat synchronously upwards (mucociliary escalator), moving contaminated mucus up to the pharynx where it can be swallowed into stomach acid or coughed out.",
                    whyExplanationUr = "سیلیا باریک بالوں جیسے ریشے ہوتے ہیں جو ایک ساتھ اوپر کی طرف حرکت کرتے ہیں اور بلغم میں پھنسے جراثیم اور مٹی کو پھیپھڑوں سے دور گلے کی طرف دھکیلتے ہیں جہاں سے وہ نگل لیے جاتے ہیں۔",
                    whyExplanationPs = "سیلیا باریک وېښتان دي چې بلغم او میکروبونه له سږو پورته ستوني ته شړي ترڅو سږي پاک وساتي.",
                    formulaOrStep = "Mucus traps pathogens ➔ Cilia sweep upward ➔ Swallowed into stomach acid",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 4: PHYSICAL AND CHEMICAL CHANGES (p. 41–54) ───
        Class7ScienceStage(
            id = 4,
            unitNumber = "Unit 4",
            pageRange = "Pages 41–54",
            titleEn = "Physical & Chemical Changes",
            titleUr = "طبعی اور کیمیائی تبدیلیاں",
            titlePs = "فزیکي او کیمیاوي بدلونونه",
            themeColor = Color(0xFFD97706),
            secondaryColor = Color(0xFF78350F),
            summaryEn = "Matter undergoes physical and chemical transformations. Physical changes alter physical properties (shape, state, size) without forming new substances and are typically reversible (e.g. melting ice, dissolving salt). Chemical changes rearrange atomic bonds to form one or more new substances with unique properties and are generally irreversible (e.g. rusting of iron, burning magnesium, baking a cake).",
            summaryUr = "مادہ طبعی اور کیمیائی تبدیلیوں سے گزرتا ہے۔ طبعی تبدیلیوں میں مادے کی صرف ظاہری حالت، شکل یا جسامت بدلتی ہے اور کوئی نیا مادہ نہیں بنتا (جیسے برف کا پگھلنا، نمک کا پانی میں حل ہونا)۔ کیمیائی تبدیلی میں ایٹموں کے روابط ٹوٹ کر بالکل نئی خصوصیات والے نئے مادے بناتے ہیں (جیسے لوہے کو زنگ لگنا، لکڑی کا جلنا، کیک کا پکنا)۔",
            summaryPs = "فزیکي بدلون یوازې د مادې حالت او بڼه بدلوي او نوې ماده نه جوړوي (لکه د یخ ویلې کېدل). کیمیاوي بدلون د اتومونو د یوځای کېدو له امله نوې ماده له نویو ځانګړنو سره جوړوي (لکه د اوسپنې زنګ وهل، د لرګي سوځېدل).",
            equationsAndLaws = listOf(
                "Rusting of Iron: 4Fe + 3O2 + 2xH2O ➔ 2Fe2O3·xH2O (Hydrated Iron(III) Oxide)",
                "Burning of Magnesium: 2Mg(s) + O2(g) ➔ 2MgO(s) + Bright White Light",
                "Signs of Chemical Change: Color change, Gas evolution (effervescence), Precipitate formation, Temperature change (Exo/Endothermic)"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Physical Changes Defined",
                    conceptOrLaw = "Reversible & No New Substance",
                    detailEn = "In a physical change, only state, size, or appearance changes; chemical composition remains unchanged. Examples: melting ice (H_2O(s) \to H_2O(l)), boiling, dissolving table sugar in water, chopping wood.",
                    detailUr = "طبعی تبدیلی میں صرف مادی حالت یا ظاہری شکل بدلتی ہے، کیمیائی ترکیب وہی رہتی ہے۔ مثالیں: برف کا پگھلنا، پانی کا ابلنا، چینی کا پانی میں گھلنا، لکڑی کے ٹکڑے کرنا۔ یہ تبدیلیاں عام طور پر الٹائی جا سکتی ہیں۔",
                    detailPs = "په فزیکي بدلون کې نوې ماده نه جوړیږي، یوازې بڼه او حالت بدلیږي؛ لکه د اوبو یخ کېدل یا په اوبو کې د بورې حل کېدل.",
                    cardColor = Color(0xFFB45309)
                ),
                Class7ScienceCard(
                    title = "Chemical Changes Defined",
                    conceptOrLaw = "Irreversible & New Chemical Bonds",
                    detailEn = "Chemical changes involve breaking and forming chemical bonds to produce entirely new substances with different chemical properties. Examples: rusting iron, burning firewood, souring milk, digesting food, ripening fruit.",
                    detailUr = "کیمیائی تبدیلی میں ایٹمی بانڈز ٹوٹتے اور نئے بنتے ہیں جن سے بالکل مختلف خواص والے نئے مادے وجود میں آتے ہیں۔ مثالیں: لوہے کو زنگ لگنا، لکڑی کا جلنا، دودھ کا کھٹا ہونا، خوراک کا ہضم ہونا، پھل کا پکنا۔",
                    detailPs = "په کیمیاوي بدلون کې کیمیاوي اړیکې ماتیږي او نوې مادې جوړیږي؛ لکه د اوسپنې زنګ وهل، د لرګیو سوځېدل او د شیدو شړومبې کېدل.",
                    cardColor = Color(0xFFD97706)
                ),
                Class7ScienceCard(
                    title = "Rusting of Iron",
                    conceptOrLaw = "Oxygen + Water Requirement",
                    detailEn = "Iron rusts only when both oxygen (O_2) and moisture (H_2O) are simultaneously present, forming reddish-brown hydrated iron(III) oxide. Prevention includes painting, oiling, galvanizing (coating with zinc), and electroplating.",
                    detailUr = "لوہے کو زنگ صرف اس وقت لگتا ہے جب آکسیجن اور نمی دونوں بیک وقت موجود ہوں، جس سے ہائیڈریٹڈ آئرن آکسائیڈ بنتا ہے۔ زنگ سے بچاؤ کے طریقے: پینٹ کرنا، تیل لگانا، گیلونائزیشن (جست کی تہہ چڑھانا) اور الیکٹروپلیٹنگ۔",
                    detailPs = "اوسپنه یوازې هغه وخت زنګ وهي چې اکسیجن او لنده بل دواړه وي. د زنګ مخنیوي لپاره رنګول او ګالوانایز کول (د زینک پوښل) کارول کیږي.",
                    cardColor = Color(0xFF92400E)
                ),
                Class7ScienceCard(
                    title = "Signs of a Chemical Reaction",
                    conceptOrLaw = "Gas, Precipitate, Heat & Color",
                    detailEn = "Evidence of chemical reactions: 1) Gas bubbles produced without boiling; 2) Precipitate (insoluble solid formed when 2 solutions mix); 3) Color change; 4) Temperature release (exothermic) or absorption (endothermic).",
                    detailUr = "کیمیائی ردعمل کی علامات: 1) گیس کے بلبلے نکلنا؛ 2) رسوب (پریسیپیٹیٹ) بننا (دو مائعات ملانے پر غیر حل پذیر ٹھوس بننا)؛ 3) رنگ کی تبدیلی؛ 4) حرارت خارج ہونا (ایکسوتھرمک) یا جذب ہونا (اینڈوتھرمک)۔",
                    detailPs = "د کیمیاوي تعامل نښې: د ګاز وتل، د رنګ بدلېدل، رسوب (ناحلېدونکې ماده جوړېدل)، او د تودوخې تولید یا جذبېدل دي.",
                    cardColor = Color(0xFFF59E0B)
                ),
                Class7ScienceCard(
                    title = "Combustion of Magnesium",
                    conceptOrLaw = "2Mg + O2 ➔ 2MgO + Energy",
                    detailEn = "When a shiny magnesium ribbon is ignited in air, it burns with a dazzling bright white flame, reacting with oxygen to form a white powdery solid called Magnesium Oxide (MgO). This is an irreversible exothermic chemical change.",
                    detailUr = "جب چمکدار میگنیشیم کی پٹی کو ہوا میں جلایا جاتا ہے تو یہ انتہائی تیز سفید روشنی کے ساتھ جلتی ہے اور آکسیجن سے مل کر میگنیشیم آکسائیڈ کی سفید راکھ بناتی ہے۔ یہ ایک کیمیائی تبدیلی ہے۔",
                    detailPs = "کله چې مګنیزیم وسوځول شي، له اکسیجن سره تعامل کوي او په ډېره ځلېدونکې سپینه رڼا سره سپین پوډر (مګنیزیم اکسایډ) جوړوي.",
                    cardColor = Color(0xFF78350F)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Why is dissolving table salt in water classified as a physical change rather than a chemical change?",
                    questionUr = "کھانے کے نمک کو پانی میں حل کرنے کو کیمیائی تبدیلی کے بجائے طبعی تبدیلی کیوں مانا جاتا ہے؟",
                    questionPs = "په اوبو کې د مالګې حل کول ولې فزیکي بدلون ګڼل کیږي نه کیمیاوي؟",
                    options = listOf(
                        "No new chemical substance is created, and original salt crystals can be fully recovered by evaporating water",
                        "Because salt turns into chlorine gas instantly",
                        "Because salt particles permanently disappear from existence",
                        "Because boiling water creates a radioactive element"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In saltwater solution, sodium and chloride ions are merely dissociated by water molecules. No new chemical bonds or products are synthesized. Evaporating water leaves pure NaCl salt behind unchanged, demonstrating physical reversibility.",
                    whyExplanationUr = "نمک کے پانی میں حل ہونے سے کوئی نیا مادہ نہیں بنتا بلکہ نمک کے ایٹمز صرف پانی کے مالیکیولز میں پھیل جاتے ہیں۔ پانی کو ابال کر اڑانے سے نمک دوبارہ اصلی حالت میں حاصل ہو جاتا ہے۔",
                    whyExplanationPs = "نوې ماده نه ده جوړه شوې، او د اوبو د تبخیر په مرسته اصلي مالګه بېرته ترلاسه کېدای شي.",
                    formulaOrStep = "NaCl(s) + H2O ➔ NaCl(aq) ➔ Evaporate H2O ➔ NaCl(s) recovered",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Under which of the following experimental conditions will an iron nail rust the fastest?",
                    questionUr = "درج ذیل میں سے کس تجرباتی حالت میں لوہے کی کیل کو سب سے تیزی سے زنگ لگے گا؟",
                    questionPs = "په لاندې کوم حالت کې به د اوسپنې مسمار ډېر ژر زنګ ووهي؟",
                    options = listOf(
                        "Submerged in open salty water exposed to air and oxygen",
                        "Submerged in boiled water sealed with an airtight layer of oil",
                        "Placed in a dry test tube with anhydrous calcium chloride drying agent",
                        "Coated with a thick layer of grease in a vacuum chamber"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Rusting requires both water and dissolved oxygen simultaneously. Salt (NaCl) acts as an electrolyte, significantly accelerating the electrochemical transfer of electrons to form hydrated iron oxide much faster.",
                    whyExplanationUr = "زنگ لگنے کے لیے پانی اور آکسیجن دونوں کی ضرورت ہوتی ہے۔ نمکین پانی ایک الیکٹرولائٹ کا کام کرتا ہے جس سے زنگ لگنے کا کیمیائی عمل کئی گنا تیز ہو جاتا ہے۔",
                    whyExplanationPs = "مالګینې اوبه او هوا د الیکټرولایټ په توګه کار کوي او د اوسپنې زنګ وهل ډېر ګړندي کوي.",
                    formulaOrStep = "Fe + O2 + H2O + Electrolyte (Salt) ➔ Rapid catalytic rusting",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What is the process of 'Galvanizing' steel or iron, and why does it prevent corrosion?",
                    questionUr = "لوہے پر 'گیلونائزیشن' کا عمل کیا ہوتا ہے، اور یہ زنگ سے کیسے بچاتا ہے؟",
                    questionPs = "ګالوانایزیشن څه شی دی او څنګه اوسپنه له زنګ څخه ژغوري؟",
                    options = listOf(
                        "Coating iron with a protective layer of metallic Zinc to shield it from air and water",
                        "Soaking iron in boiling vinegar for 10 hours",
                        "Melting iron and mixing it with pure carbon dioxide gas",
                        "Exposing iron to radioactive gamma rays"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Galvanizing coats iron with a layer of zinc. Zinc physically barriers oxygen/moisture, and even if scratched, zinc acts as a sacrificial anode because zinc is more reactive than iron, corroding preferentially.",
                    whyExplanationUr = "گیلونائزیشن لوہے پر جست (زنک) کی حفاظتی تہہ چڑھانے کا عمل ہے۔ زنک لوہے کو ہوا اور پانی سے بچاتا ہے، اور کٹ لگنے کی صورت میں بھی خود قربان ہو کر لوہے کو زنگ سے محفوظ رکھتا ہے۔",
                    whyExplanationPs = "د زینک فلز یوه نرۍ طبقه پر اوسپنه راوستل کیږي چې اوسپنه له هوا او لنده بل څخه وساتي.",
                    formulaOrStep = "Iron + Zinc coating ➔ Physical barrier + Sacrificial anodic protection",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "When vinegar (acetic acid) is added to baking soda (sodium bicarbonate), vigorous bubbling occurs. What gas is evolved?",
                    questionUr = "جب سرکہ (ایسٹک ایسڈ) کو میٹھے سوڈے (سوڈیم بائی کاربونیٹ) میں ملایا جاتا ہے تو تیز بلبلے بنتے ہیں۔ کون سی گیس خارج ہوتی ہے؟",
                    questionPs = "کله چې سرکه د خوړلو له سوډا سره یوځای شي، ځګ او پوکڼۍ جوړیږي، کوم ګاز خارجیږي؟",
                    options = listOf(
                        "Carbon dioxide gas (CO2)",
                        "Pure Hydrogen gas (H2)",
                        "Chlorine gas (Cl2)",
                        "Nitrogen dioxide gas (NO2)"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Acetic acid reacts with sodium bicarbonate: CH3COOH + NaHCO3 ➔ CH3COONa + H2O + CO2(g). The rapid effervescence is due to carbon dioxide gas escaping, proving a chemical reaction took place.",
                    whyExplanationUr = "سرکہ اور بیکنگ سوڈا کیمیائی طور پر مل کر سوڈیم ایسیٹیٹ، پانی اور کاربن ڈائی آکسائیڈ گیس بناتے ہیں۔ تیزی سے بلبلوں کا نکلنا کاربن ڈائی آکسائیڈ گیس کی وجہ سے ہوتا ہے۔",
                    whyExplanationPs = "د سرکې او بیکینګ سوډا له تعامل څخه کاربن ډای اکسایډ ګاز راوځي چې پوکڼۍ جوړوي.",
                    formulaOrStep = "CH3COOH + NaHCO3 ➔ CH3COONa + H2O + CO2↑",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following observations conclusively proves that an endothermic chemical reaction has occurred in a beaker?",
                    questionUr = "درج ذیل میں سے کون سا مشاہدہ حتمی طور پر ثابت کرتا ہے کہ بیکر میں اینڈوتھرمک کیمیائی عمل ہوا ہے؟",
                    questionPs = "کومه نښه په ډاګه کوي چې په یوه لوښي کې اندوترمیک (تودوخه جذبونکی) تعامل شوی؟",
                    options = listOf(
                        "The temperature of the beaker contents drops significantly as heat is absorbed from surroundings",
                        "The beaker explodes with bright orange flames",
                        "The liquid starts glowing red hot without heating",
                        "The mass of the beaker becomes zero"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "An endothermic reaction absorbs thermal energy from its immediate surroundings, causing the temperature of the solution and container to drop (e.g. dissolving ammonium chloride in water).",
                    whyExplanationUr = "اینڈوتھرمک عمل وہ ہوتا ہے جو ارد گرد سے حرارت جذب کرتا ہے، جس کے نتیجے میں محلول اور بیکر کا درجہ حرارت کم ہو جاتا ہے اور وہ ٹھنڈا محسوس ہوتا ہے۔",
                    whyExplanationPs = "اندوترمیک تعامل له چاپېریال څخه تودوخه جذبوي، نو ځکه د لوښي حرارت راټیټیږي او یخ احساس کیږي.",
                    formulaOrStep = "Endothermic: Reactants + Heat Energy ➔ Products (Temp drops)",
                    difficulty = 2
                )
            )
        ),
        // ─── UNIT 5: STRUCTURE OF AN ATOM (p. 55–64) ───
        Class7ScienceStage(
            id = 5,
            unitNumber = "Unit 5",
            pageRange = "Pages 55–64",
            titleEn = "Structure of an Atom",
            titleUr = "ایٹم کی ساخت",
            titlePs = "د اتوم جوړښت",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF0369A1),
            summaryEn = "Atoms consist of a dense central nucleus containing positively charged protons and neutral neutrons, surrounded by negatively charged electrons revolving in specific energy shells (K, L, M). The shell capacity follows 2n² (K=2, L=8, M=18). Atomic number (Z) equals proton count, while mass number (A) equals protons plus neutrons (A = Z + N). Isotopes share the same atomic number but possess different neutron counts.",
            summaryUr = "ایٹم ایک کثیف مرکزی مرکزے (نیوکلیئس) پر مشتمل ہوتا ہے جس میں مثبت پروٹون اور غیر جانبدار نیوٹران ہوتے ہیں، جبکہ منفی الیکٹران بیرونی مداروں (شیلز K, L, M) میں گردش کرتے ہیں۔ مدار میں الیکٹران کی گنجائش 2n² کے فارمولے سے معلوم ہوتی ہے۔ ایٹمی نمبر (Z) پروٹونوں کی تعداد ہے اور ماس نمبر (A) پروٹون اور نیوٹران کا مجموعہ ہے۔ ہم جا (آئسوٹوپس) کا ایٹمی نمبر ایک جیسا مگر ماس نمبر مختلف ہوتا ہے۔",
            summaryPs = "اتوم له یو مرکزي نیوکلیوس څخه جوړ دی چې مثبت پروټونونه او بې چارجه نیوټرونونه لري، او منفي الکترونونه په ځانګړو مدارونو (K, L, M) کې ورڅرخي. د مدارونو ظرفیت د 2n² فارمول پر بنسټ ټاکل کیږي. اتومي نمبر (Z) د پروټونونو شمېر او ماس نمبر (A) د پروټون او نیوټرون مجموعه ده.",
            equationsAndLaws = listOf(
                "Shell Capacity: Maximum electrons = 2n² (K shell n=1 ➔ 2, L shell n=2 ➔ 8, M shell n=3 ➔ 18)",
                "Mass Number Equation: A = Z + N, where Z = protons and N = neutrons",
                "Neutral Atom Condition: Number of Protons = Number of Electrons"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Subatomic Particles",
                    conceptOrLaw = "Protons, Neutrons & Electrons",
                    detailEn = "Protons have +1 charge and relative mass 1 amu (in nucleus); Neutrons have 0 charge and mass 1 amu (in nucleus); Electrons have -1 charge and negligible mass (1/1836 amu) orbiting in shells.",
                    detailUr = "پروٹون پر +1 چارج اور ماس 1 amu ہوتا ہے (مرکزے میں)؛ نیوٹران پر 0 چارج اور ماس 1 amu ہوتا ہے (مرکزے میں)؛ الیکٹران پر -1 چارج ہوتا ہے اور ماس برائے نام (1/1836 amu) ہوتا ہے جو مداروں میں گھومتے ہیں۔",
                    detailPs = "پروټون +1 چارج او 1 amu کتله لري؛ نیوټرون 0 چارج او 1 amu کتله لري؛ الکترون -1 چارج لري او د نیوکلیوس چاپېره مدارونو کې ګرځي.",
                    cardColor = Color(0xFF0369A1)
                ),
                Class7ScienceCard(
                    title = "Electronic Shells (2n² Rule)",
                    conceptOrLaw = "K, L, M Energy Levels",
                    detailEn = "Electrons occupy shells of increasing energy. K-shell (n=1) holds up to 2×1² = 2 electrons; L-shell (n=2) holds up to 2×2² = 8 electrons; M-shell (n=3) holds up to 2×3² = 18 electrons.",
                    detailUr = "الیکٹران بڑھتی توانائی والے شیلز میں رہتے ہیں۔ K شیل (n=1) میں زیادہ سے زیادہ 2×1² = 2 الیکٹران؛ L شیل (n=2) میں 2×2² = 8 الیکٹران؛ اور M شیل (n=3) میں 2×3² = 18 الیکٹران سما سکتے ہیں۔",
                    detailPs = "د الکترونونو مدارونه د 2n² له مخې ډکیږي: K مدار ۲ الکترونه، L مدار ۸ الکترونه، او M مدار تر ۱۸ پورې الکترونونه ځایولی شي.",
                    cardColor = Color(0xFF0284C7)
                ),
                Class7ScienceCard(
                    title = "Atomic vs Mass Number",
                    conceptOrLaw = "Z and A Definitions",
                    detailEn = "Atomic number (Z) is the unique number of protons in an element's nucleus. Mass number (A) is the total count of nucleons (protons + neutrons). Number of neutrons is calculated as N = A - Z.",
                    detailUr = "ایٹمی نمبر (Z) کسی عنصر کے مرکزے میں پروٹونوں کی مخصوص تعداد ہے۔ ماس نمبر (A) پروٹونوں اور نیوٹرانوں کا مجموعہ ہے۔ نیوٹرانوں کی تعداد N = A - Z سے معلوم کی جاتی ہے۔",
                    detailPs = "اتومي نمبر (Z) په هسته کې د پروټونونو شمېر دی. ماس نمبر (A) د پروټون او نیوټرون ټوله شمېره ده. د نیوټرونونو شمېر N = A - Z سره لاسته راځي.",
                    cardColor = Color(0xFF0EA5E9)
                ),
                Class7ScienceCard(
                    title = "Isotopes Explained",
                    conceptOrLaw = "Same Protons, Different Neutrons",
                    detailEn = "Isotopes are atoms of the same chemical element having identical atomic number (Z) but differing mass numbers (A) due to different numbers of neutrons. Examples: Protium (¹H), Deuterium (²H), and Tritium (³H); Carbon-12 and Carbon-14.",
                    detailUr = "ہم جا (آئسوٹوپس) ایک ہی عنصر کے وہ ایٹم ہوتے ہیں جن کا ایٹمی نمبر ایک جیسا لیکن نیوٹرانوں کی مختلف تعداد کی وجہ سے ماس نمبر مختلف ہوتا ہے۔ جیسے ہائیڈروجن کے تین آئسوٹوپس: پروٹیم، ڈیوٹیریم اور ٹریٹیم۔",
                    detailPs = "ایزوټوپونه د یوه عنصر هغه اتومونه دي چې اتومي نمبر یې یو وي خو د نیوټرونونو د توپیر له امله یې ماس نمبر بېل وي؛ لکه پروټیم، ډیوټریم او ټریټیم.",
                    cardColor = Color(0xFF38BDF8)
                ),
                Class7ScienceCard(
                    title = "Electronic Configuration",
                    conceptOrLaw = "Writing Shell Distribution",
                    detailEn = "The arrangement of electrons in shells is written as e.g. Sodium (Z=11): K=2, L=8, M=1. Chlorine (Z=17): K=2, L=8, M=7. Valence electrons are the electrons in the outermost shell, which determine chemical reactivity.",
                    detailUr = "شیلز میں الیکٹرانوں کی تقسیم کو الیکٹرانک کنفیگریشن کہتے ہیں، جیسے سوڈیم (Z=11) کی ترتیب: K=2, L=8, M=1 ہے۔ آخری شیل کے الیکٹران ویلنس الیکٹران کہلاتے ہیں جو کیمیائی ملاپ کا فیصلہ کرتے ہیں۔",
                    detailPs = "په مدارونو کې د الکترونونو وېش الکټرونیکي جوړښت بلل کیږي، لکه سوډیم (Z=11): ۲، ۸، ۱. تر ټولو بهرني الکترونونه ویلنس الکترونونه بلل کیږي.",
                    cardColor = Color(0xFF0369A1)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "An atom of Sodium has atomic number Z = 11 and mass number A = 23. How many neutrons and what is its electronic configuration?",
                    questionUr = "سوڈیم کے ایک ایٹم کا ایٹمی نمبر Z = 11 اور ماس نمبر A = 23 ہے۔ اس میں کتنے نیوٹران ہیں اور اس کی الیکٹرانک کنفیگریشن کیا ہوگی؟",
                    questionPs = "د سوډیم اتومي نمبر ۱۱ او ماس نمبر ۲۳ دی. څو نیوټرونونه لري او الکتروني وېش یې څه دی؟",
                    options = listOf(
                        "12 neutrons, and configuration is K=2, L=8, M=1",
                        "11 neutrons, and configuration is K=2, L=9",
                        "23 neutrons, and configuration is K=8, L=8, M=7",
                        "1 neutron, and configuration is K=11"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Neutrons N = A - Z = 23 - 11 = 12. Using the 2n² rule, the first shell (K) holds 2, the second shell (L) holds 8, leaving 1 electron for the third shell (M), so the configuration is 2, 8, 1.",
                    whyExplanationUr = "نیوٹرانوں کی تعداد N = A - Z = 23 - 11 = 12 ہے۔ 2n² کے قاعدے کے مطابق پہلے شیل K میں 2، دوسرے شیل L میں 8، اور باقی 1 الیکٹران تیسرے شیل M میں آئے گا (2, 8, 1)۔",
                    whyExplanationPs = "د نیوټرونونو شمېر ۲۳ - ۱۱ = ۱۲ دی. لومړی مدار ۲، دویم ۸، او درېیم ۱ الکترون اخلي نو وېش ۲، ۸، ۱ دی.",
                    formulaOrStep = "N = A - Z = 23 - 11 = 12; Configuration = 2, 8, 1",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why is an unbonded, isolated neutral atom electrically neutral overall?",
                    questionUr = "ایک غیر بندھا ہوا، الگ تھلگ نیوٹرل ایٹم مجموعی طور پر برقی لحاظ سے غیر جانبدار کیوں ہوتا ہے؟",
                    questionPs = "یو جلا بې چارجه اتوم ولې په ټولیز ډول برېښنايي خنثی (نیوټرل) وي؟",
                    options = listOf(
                        "Because the number of positively charged protons in the nucleus exactly equals the number of negatively charged orbiting electrons",
                        "Because neutrons absorb all electric charges inside the atom",
                        "Because electrons have zero charge in nature",
                        "Because all protons transform into light waves"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Each proton carries a +1 charge and each electron carries a -1 charge. In an uncharged neutral atom, the number of protons equals the number of electrons, canceling out the total charge to exactly zero.",
                    whyExplanationUr = "ہر پروٹون پر +1 چارج اور ہر الیکٹران پر -1 چارج ہوتا ہے۔ ایک نیوٹرل ایٹم میں پروٹونوں اور الیکٹرانوں کی تعداد بالکل برابر ہوتی ہے، اس لیے وہ ایک دوسرے کو زائل کر کے مجموعی چارج صفر کر دیتے ہیں۔",
                    whyExplanationPs = "ځکه په هسته کې د مثبتو پروټونونو شمېر او بهر د منفي الکترونونو شمېر پوره مساوي وي او یو بل خنثی کوي.",
                    formulaOrStep = "Total Charge = (+1 × Protons) + (-1 × Electrons) = 0",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "According to the 2n² quantum shell formula, what is the theoretical maximum electron capacity of the third shell (M-shell, n = 3)?",
                    questionUr = "2n² شیل فارمولے کے مطابق، تیسرے شیل (M شیل، n = 3) میں الیکٹرانوں کی زیادہ سے زیادہ گنجائش کتنی ہوتی ہے؟",
                    questionPs = "د 2n² فارمول له مخې، درېیم مدار (M مدار، n = 3) په زیاته اندازه څو الکترونونه ځایولی شي؟",
                    options = listOf(
                        "18 electrons (2 × 3² = 2 × 9 = 18)",
                        "8 electrons",
                        "32 electrons",
                        "6 electrons"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Using the formula Max Capacity = 2n² for n = 3: 2 × (3)² = 2 × 9 = 18 electrons. Thus, the M shell can accommodate up to 18 electrons.",
                    whyExplanationUr = "فارمولا 2n² استعمال کرتے ہوئے: جب n = 3 ہو تو 2 × (3)² = 2 × 9 = 18 الیکٹران۔ لہٰذا M شیل میں 18 الیکٹرانوں کی گنجائش ہوتی ہے۔",
                    whyExplanationPs = "د 2n² فارمول له مخې: ۲ × (۳)² = ۲ × ۹ = ۱۸ الکترونونه ځایولی شي.",
                    formulaOrStep = "Max Capacity = 2 × (3)² = 18 electrons",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why do isotopes of the same element (such as Carbon-12 and Carbon-14) exhibit identical chemical reactions?",
                    questionUr = "ایک ہی عنصر کے آئسوٹوپس (جیسے کاربن-12 اور کاربن-14) ایک جیسے کیمیائی ردعمل کیوں ظاہر کرتے ہیں؟",
                    questionPs = "د یوه عنصر ایزوټوپونه (لکه کاربن-۱۲ او کاربن-۱۴) ولې یو شان کیمیاوي تعاملات ښيي؟",
                    options = listOf(
                        "Because chemical properties depend exclusively on the number and arrangement of valence electrons, which is identical in both",
                        "Because their neutrons react violently with oxygen",
                        "Because all isotopes have the same mass number",
                        "Because Carbon-14 turns into pure gold in water"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Chemical reactivity is determined by the outermost valence electrons participating in bonding. Since all isotopes of Carbon have Z = 6 (same 6 electrons arranged as 2, 4), their chemical properties and bonding behaviors are identical.",
                    whyExplanationUr = "کیمیائی خواص کا انحصار الیکٹرانوں کی تعداد اور ان کی ویلنس ترتیب پر ہوتا ہے۔ چونکہ کاربن کے تمام آئسوٹوپس میں پروٹون اور الیکٹران 6 ہی ہوتے ہیں، اس لیے ان کے کیمیائی ردعمل بالکل یکساں ہوتے ہیں۔",
                    whyExplanationPs = "ځکه چې کیمیاوي خواص یوازې د ویلنس الکترونونو پورې اړه لري، او دواړه پوره یو شان الکترونونه لري.",
                    formulaOrStep = "Same Z ➔ Same valence electrons ➔ Identical chemical reactivity",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "A neutral atom of Chlorine has 17 protons and 18 neutrons. What are its atomic number (Z), mass number (A), and valence electrons?",
                    questionUr = "کلورین کے ایک نیوٹرل ایٹم میں 17 پروٹون اور 18 نیوٹران ہیں۔ اس کا ایٹمی نمبر (Z)، ماس نمبر (A) اور ویلنس الیکٹران کتنے ہوں گے؟",
                    questionPs = "د کلورین په اتوم کې ۱۷ پروټونونه او ۱۸ نیوټرونونه دي. د اتومي نمبر (Z)، ماس نمبر (A) او ویلنس الکترونونه څو دي؟",
                    options = listOf(
                        "Z = 17, A = 35, and Valence electrons = 7 (K=2, L=8, M=7)",
                        "Z = 18, A = 35, and Valence electrons = 8",
                        "Z = 35, A = 17, and Valence electrons = 1",
                        "Z = 17, A = 18, and Valence electrons = 2"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Z = protons = 17. Mass number A = protons + neutrons = 17 + 18 = 35. Configuration is 2, 8, 7. The outermost shell (M) contains 7 valence electrons, meaning it needs 1 electron to complete its octet.",
                    whyExplanationUr = "ایٹمی نمبر Z = 17، ماس نمبر A = 17 + 18 = 35۔ الیکٹرانک ترتیب 2, 8, 7 ہے۔ سب سے بیرونی شیل M میں 7 ویلنس الیکٹران ہوتے ہیں۔",
                    whyExplanationPs = "اتومي نمبر ۱۷، ماس نمبر ۱۷ + ۱۸ = ۳۵ دی. الکتروني جوړښت ۲، ۸، ۷ دی، نو ۷ ویلنس الکترونونه لري.",
                    formulaOrStep = "Z = 17, A = 17 + 18 = 35, Configuration: 2, 8, 7 ➔ 7 valence electrons",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 6: CHEMICAL BONDS (p. 65–74) ───
        Class7ScienceStage(
            id = 6,
            unitNumber = "Unit 6",
            pageRange = "Pages 65–74",
            titleEn = "Chemical Bonds",
            titleUr = "کیمیائی بانڈز",
            titlePs = "کیمیاوي اړیکې (بانډونه)",
            themeColor = Color(0xFF4F46E5),
            secondaryColor = Color(0xFF312E81),
            summaryEn = "Atoms interact to achieve stable octet (8 valence electrons) or duplet (2 electrons) electronic configurations resembling inert noble gases. An ionic bond forms through the complete transfer of valence electrons from a metal (forming a cation) to a non-metal (forming an anion), held by strong electrostatic forces (e.g. NaCl, MgO). A covalent bond forms through the mutual sharing of electron pairs between non-metal atoms (e.g. H2, O2, H2O, CH4).",
            summaryUr = "ایٹمز نوبل گیسوں جیسا مستحکم الیکٹرانک نظام یعنی آکٹیٹ (8 الیکٹران) یا ڈوپلٹ (2 الیکٹران) مکمل کرنے کے لیے کیمیائی بانڈ بناتے ہیں۔ آئیونک بانڈ دھات سے غیر دھات میں الیکٹران کے مکمل تبادلے سے بنتا ہے، جس سے مثبت اور منفی آئنز بن کر کشش سے جڑ جاتے ہیں (جیسے نمک NaCl)۔ کوویلنٹ بانڈ غیر دھاتوں کے درمیان الیکٹرانوں کے باہمی اشتراک سے بنتا ہے (جیسے پانی H2O)۔",
            summaryPs = "اتومونه د ثبات لپاره ۸ ویلنس الکترونونه (اکټیټ) پوره کوي. آیونیک بانډ د الکترونونو د بشپړ انتقال له لارې د فلز او غیر فلز ترمنځ جوړیږي (لکه د خوړلو مالګه NaCl). کوولنټ بانډ د غیر فلزاتو ترمنځ د الکترونونو د شریکولو له لارې رامنځته کیږي (لکه اوبه H2O).",
            equationsAndLaws = listOf(
                "Octet Rule: Atoms gain, lose, or share electrons to possess 8 valence electrons",
                "Ionic Bond Formation: Na (2,8,1) ➔ Na⁺ (2,8) + e⁻ ; Cl (2,8,7) + e⁻ ➔ Cl⁻ (2,8,8) ➔ NaCl",
                "Covalent Bond Types: Single (1 shared pair: H-H, H-Cl), Double (2 pairs: O=O), Triple (3 pairs: N≡N)"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Octet & Duplet Rules",
                    conceptOrLaw = "Driving Force of Bonding",
                    detailEn = "Noble gases (He, Ne, Ar) are chemically inert because their valence shells are full. Other atoms react by gaining, losing, or sharing electrons to achieve a stable octet (8 valence electrons) or duplet (2 for He) configuration.",
                    detailUr = "نوبل گیسیں (ہیلیم، نیون، آرگن) غیر متحرک ہوتی ہیں کیونکہ ان کے ویلنس شیل بھرے ہوتے ہیں۔ دیگر ایٹمز 8 الیکٹران (آکٹیٹ) یا 2 الیکٹران (ڈوپلٹ) کی مستحکم حالت حاصل کرنے کے لیے بانڈ بناتے ہیں۔",
                    detailPs = "نجیب ګازونه ډک مدارونه لري نو تعامل نه کوي. نور اتومونه د دې لپاره چې ۸ یا ۲ الکترونونه پوره کړي کیمیاوي اړیکې جوړوي.",
                    cardColor = Color(0xFF4338CA)
                ),
                Class7ScienceCard(
                    title = "Ionic Bonding Mechanism",
                    conceptOrLaw = "Electron Transfer & Electrostatic Force",
                    detailEn = "Metals with 1, 2, or 3 valence electrons readily lose them to become positive cations (e.g. Na⁺, Mg²⁺). Non-metals with 5, 6, or 7 electrons gain them to form negative anions (e.g. Cl⁻, O²⁻). Strong electrostatic attraction binds them into crystal lattices.",
                    detailUr = "دھاتیں الیکٹران خارج کر کے مثبت کیٹائنز بناتی ہیں (جیسے Na⁺)۔ غیر دھاتیں الیکٹران حاصل کر کے منفی اینائنز بناتی ہیں (جیسے Cl⁻)۔ ان کے درمیان طاقتور برقی کشش آئیونک بانڈ کہلاتی ہے۔",
                    detailPs = "فلزات الکترون له لاسه ورکوي او مثبت کیټایون جوړوي. غیر فلزات الکترون اخلي او منفي اینایون جوړوي. د دوی ترمنځ برېښنايي کشش آیونیک بانډ دی.",
                    cardColor = Color(0xFF4F46E5)
                ),
                Class7ScienceCard(
                    title = "Covalent Bonding Mechanism",
                    conceptOrLaw = "Mutual Electron Sharing",
                    detailEn = "Formed between non-metal atoms when neither atom has enough electronegativity to strip electrons away. They share pairs of electrons: Single bond shares 1 pair (H-H, H-Cl); Double bond shares 2 pairs (O=O); Triple bond shares 3 pairs (N ≡ N).",
                    detailUr = "غیر دھاتوں کے درمیان جب الیکٹران کا مکمل تبادلہ ممکن نہ ہو تو وہ الیکٹرانوں کے جوڑے باہم شیئر کرتے ہیں۔ سنگل بانڈ میں 1 جوڑا، ڈبل بانڈ میں 2 جوڑے (O=O)، اور ٹرپل بانڈ میں 3 جوڑے (N≡N) شیئر ہوتے ہیں۔",
                    detailPs = "کله چې غیر فلزات الکترونونه په ګډه شریک کړي، کوولنټ بانډ جوړیږي: یوګړی بانډ ۱ جوړه، غبرګ ۲ جوړې، او درې ګونی ۳ جوړې الکترونونه شریکوي.",
                    cardColor = Color(0xFF6366F1)
                ),
                Class7ScienceCard(
                    title = "Properties of Ionic Compounds",
                    conceptOrLaw = "High Melting Point & Conductivity",
                    detailEn = "Ionic compounds (e.g. table salt NaCl) have high melting and boiling points due to strong electrostatic crystal forces. In solid state they do not conduct electricity, but in molten state or dissolved in water, free ions conduct electric current.",
                    detailUr = "آئیونک مرکبات (جیسے نمک) کے نقطہ پگھلاؤ بہت اونچے ہوتے ہیں۔ ٹھوس حالت میں وہ بجلی نہیں گزارتے، لیکن پگھلی ہوئی حالت میں یا پانی میں حل ہو کر آزاد آئنز کی بدولت بجلی کے اچھے موصل بن جاتے ہیں۔",
                    detailPs = "آیونیک مرکبات لوړ ویلې کېدو ټکی لري. په جامد حالت کې برېښنا نه تېروي خو په اوبو کې حل یا ویلې شوي حالت کې برېښنا تېروي.",
                    cardColor = Color(0xFF3730A3)
                ),
                Class7ScienceCard(
                    title = "Properties of Covalent Compounds",
                    conceptOrLaw = "Lower Melting Points & Non-conductors",
                    detailEn = "Covalent molecules (e.g. water H2O, methane CH4, sugar) have weaker intermolecular forces. They generally have lower melting/boiling points, exist as gases/liquids/soft solids at room temperature, and do not conduct electricity (no free ions).",
                    detailUr = "کوویلنٹ مالیکیولز (جیسے پانی، میتھین گیس، چینی) کے نقطہ پگھلاؤ کم ہوتے ہیں۔ کمرے کے درجہ حرارت پر یہ مائع یا گیس ہوتے ہیں اور آزاد آئنز نہ ہونے کی وجہ سے بجلی نہیں گزارتے۔",
                    detailPs = "کوولنټ مرکبات ټیټ د ویلې کېدو ټکی لري، اکثره ګاز یا مایع وي او ازاد آیونونه نه لري نو برېښنا نه تېروي.",
                    cardColor = Color(0xFF312E81)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "When Sodium (Na, Z=11) reacts with Chlorine (Cl, Z=17) to form table salt (NaCl), what electron transfer occurs?",
                    questionUr = "جب سوڈیم (Z=11) کلورین (Z=17) کے ساتھ مل کر کھانے کا نمک (NaCl) بناتا ہے تو الیکٹرانوں کا کیا تبادلہ ہوتا ہے؟",
                    questionPs = "کله چې سوډیم او کلورین یوځای شي او مالګه جوړه کړي، د الکترونونو انتقال څنګه کیږي؟",
                    options = listOf(
                        "Sodium transfers 1 valence electron to Chlorine, forming Na⁺ and Cl⁻ ions with complete octets",
                        "Chlorine transfers 7 electrons to Sodium",
                        "Sodium and Chlorine share 5 pairs of electrons",
                        "Sodium nucleus merges with Chlorine nucleus"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Sodium has configuration (2, 8, 1). It readily loses 1 electron to achieve the neon configuration (2, 8), becoming Na⁺. Chlorine (2, 8, 7) gains this electron to achieve the argon configuration (2, 8, 8), becoming Cl⁻. Electrostatic attraction binds them.",
                    whyExplanationUr = "سوڈیم کے پاس 1 ویلنس الیکٹران ہوتا ہے (2, 8, 1) جو وہ کلورین (2, 8, 7) کو دے دیتا ہے۔ اس سے سوڈیم پر مثبت اور کلورین پر منفی چارج آ جاتا ہے اور دونوں کا آکٹیٹ مکمل ہو جاتا ہے۔",
                    whyExplanationPs = "سوډیم خپل یو اضافه الکترون کلورین ته ورکوي، سوډیم مثبت او کلورین منفي کیږي او دواړه ۸-۸ الکترونونه پوره کوي.",
                    formulaOrStep = "Na(2,8,1) ➔ Na⁺(2,8) + e⁻ ; Cl(2,8,7) + e⁻ ➔ Cl⁻(2,8,8)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why does an aqueous solution of table salt (NaCl) conduct electricity, whereas a sugar solution (C12H22O11) does not?",
                    questionUr = "نمک کا پانی میں محلول بجلی کا موصل کیوں ہوتا ہے، جبکہ چینی کا محلول بجلی کیوں نہیں گزارتا؟",
                    questionPs = "د مالګې اوبه ولې برېښنا تېروي، خو د بورې اوبه برېښنا نه تېروي؟",
                    options = listOf(
                        "Dissolved NaCl dissociates into mobile free ions (Na⁺ and Cl⁻), whereas covalent sugar dissolves as intact neutral molecules",
                        "Sugar absorbs all electrons and destroys them",
                        "Table salt is radioactive and emits protons",
                        "Water destroys sugar molecules completely"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Electrical conduction in liquids requires mobile charged carriers. Ionic NaCl dissociates into free mobile hydrated ions (Na^+ and Cl^-) that migrate towards electrodes. Covalent sugar consists of neutral molecules with no free ions.",
                    whyExplanationUr = "مائع میں کرنٹ کے بہاؤ کے لیے آزاد آئنز کا ہونا ضروری ہے۔ نمک پانی میں گھل کر آزاد Na⁺ اور Cl⁻ آئنز بناتا ہے جو کرنٹ لے جاتے ہیں، جبکہ چینی کوویلنٹ مالیکیول ہونے کی وجہ سے آئنز نہیں بناتی۔",
                    whyExplanationPs = "مالګه په اوبو کې ازاد آیونونه (Na⁺ او Cl⁻) جوړوي چې برېښنا لېږدوي، خو بوره بې چارجه مالیکولونه لري او آیون نه جوړوي.",
                    formulaOrStep = "NaCl(s) + H2O ➔ Na⁺(aq) + Cl⁻(aq) [Free mobile ions carry current]",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "How many pairs of electrons are mutually shared in a molecule of Nitrogen gas (N2)?",
                    questionUr = "نائٹروجن گیس (N2) کے مالیکیول میں الیکٹرانوں کے کتنے جوڑے باہمی طور پر شیئر ہوتے ہیں؟",
                    questionPs = "د نایټروجن ګاز (N2) په مالیکول کې څو جوړې الکترونونه شریک شوي وي؟",
                    options = listOf(
                        "3 pairs of electrons, forming a triple covalent bond (N≡N)",
                        "1 pair of electrons, forming a single bond",
                        "2 pairs of electrons, forming a double bond",
                        "4 pairs of electrons"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Nitrogen (Z = 7) has 5 valence electrons in its L shell (2, 5). Each nitrogen atom needs 3 electrons to complete its octet of 8. Therefore, two nitrogen atoms share 3 pairs of electrons (6 shared electrons total), forming a triple covalent bond.",
                    whyExplanationUr = "نائٹروجن کے پاس 5 ویلنس الیکٹران ہوتے ہیں اور اسے 8 مکمل کرنے کے لیے 3 الیکٹرانوں کی ضرورت ہوتی ہے۔ اس لیے دو نائٹروجن ایٹمز 3 جوڑے (کل 6 الیکٹران) شیئر کر کے ٹرپل کوویلنٹ بانڈ بناتے ہیں۔",
                    whyExplanationPs = "نایټروجن ۵ ویلنس الکترونونه لري او ۳ نورو ته اړتیا لري، نو دوه اتومونه ۳ جوړې الکترونونه په ګډه شریکوي او درې ګونی بانډ جوړوي.",
                    formulaOrStep = "5 valence e⁻ + 3 shared e⁻ = 8 octet ➔ N≡N (Triple Bond)",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following compounds is bonded purely by ionic attraction?",
                    questionUr = "درج ذیل میں سے کون سا مرکب خالصتاً آئیونک کشش کے ذریعے بندھا ہوا ہے؟",
                    questionPs = "له لاندې مرکباتو څخه کوم یو خالص آیونیک بانډ لري؟",
                    options = listOf(
                        "Magnesium Oxide (MgO), formed between metal Mg and non-metal O",
                        "Water (H2O)",
                        "Methane gas (CH4)",
                        "Carbon dioxide gas (CO2)"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Magnesium is an alkaline earth metal that loses 2 valence electrons (Mg^{2+}) and Oxygen is a non-metal that gains 2 electrons (O^{2-}). The bond is ionic (Mg^{2+}O^{2-}). H2O, CH4, and CO2 are all covalent compounds between non-metals.",
                    whyExplanationUr = "میگنیشیم دھات ہے جو 2 الیکٹران خارج کرتی ہے اور آکسیجن غیر دھات ہے جو 2 الیکٹران حاصل کرتی ہے، اس لیے ان کے درمیان آئیونک بانڈ بنتا ہے۔ باقی تمام کوویلنٹ مرکبات ہیں۔",
                    whyExplanationPs = "مګنیزیم فلز دی او اکسیجن غیر فلز دی، د الکترونونو په انتقال سره آیونیک مرکب (MgO) جوړوي.",
                    formulaOrStep = "Mg ➔ Mg²⁺ + 2e⁻ ; O + 2e⁻ ➔ O²⁻ ➔ Ionic lattice MgO",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why do noble gases like Helium, Neon, and Argon almost never form chemical bonds with other elements?",
                    questionUr = "نوبل گیسیں جیسے ہیلیم، نیون اور آرگن دوسرے عناصر کے ساتھ کیمیائی بانڈ کیوں نہیں بناتیں؟",
                    questionPs = "نجیب ګازونه لکه هیلیم، نیون او ارګون ولې هېڅکله کیمیاوي بانډ نه جوړوي؟",
                    options = listOf(
                        "Their valence electron shells are already completely filled (duplet for He, octet for Ne and Ar), making them inherently stable",
                        "They lack a central nucleus",
                        "They only exist in solid state at 1000°C",
                        "Their protons have zero positive charge"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Chemical bonding is driven by the tendency to achieve full valence shells. Helium already has a full duplet (2 electrons) and Neon/Argon have complete octets (8 valence electrons). Having no need to gain, lose, or share electrons, they are chemically inert.",
                    whyExplanationUr = "ایٹمز اپنے بیرونی شیل کو بھرنے کے لیے بانڈ بناتے ہیں۔ نوبل گیسوں کے بیرونی شیل پہلے ہی مکمل بھرے ہوتے ہیں (ہیلیم میں 2، نیون اور آرگن میں 8)، اس لیے انہیں کسی سے الیکٹران کے لین دین کی ضرورت نہیں ہوتی۔",
                    whyExplanationPs = "ځکه د هغوی بهرني مدارونه له مخکې څخه پوره ډک دي (هیلیم ۲ او نور ۸ الکترونونه لري) او بشپړ ثبات لري.",
                    formulaOrStep = "Full valence shells (Duplet / Octet) ➔ Stable minimum energy ➔ Zero bonding need",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 7: SOLUTIONS (p. 75–92) ───
        Class7ScienceStage(
            id = 7,
            unitNumber = "Unit 7",
            pageRange = "Pages 75–92",
            titleEn = "Solutions",
            titleUr = "محلولات",
            titlePs = "محلولونه (حل شوې مادې)",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF134E4A),
            summaryEn = "A solution is a homogeneous mixture of two or more substances comprising a solute (dissolved substance in smaller quantity) and a solvent (dissolving medium in larger quantity; water is the universal solvent). Solutions are classified as dilute or concentrated, and unsaturated, saturated, or supersaturated. Solubility is the maximum mass of solute dissolved in 100g of solvent at a specific temperature. Suspensions are heterogeneous mixtures with settling particles.",
            summaryUr = "محلول دو یا دو سے زیادہ اشیاء کا یکساں (ہوموجینئس) آمیزہ ہے جس میں حل پذیر شے (سولیوٹ) اور حل کرنے والا مائع (سالوینٹ) ہوتا ہے؛ پانی کائناتی سالوینٹ ہے۔ محلول ہلکے (ڈائلیوٹ) یا گاڑھے (کنسنٹریٹڈ) اور غیر سیر شدہ، سیر شدہ (سیچوریٹڈ) یا سپر سیچوریٹڈ ہو سکتے ہیں۔ سسپنشنز غیر یکساں آمیزے ہوتے ہیں جن کے ذرات نیچے بیٹھ جاتے ہیں۔",
            summaryPs = "محلول د دوو یا ډېرو موادو متجانس مخلوط دی چې حل کېدونکی (سولیوټ) او حل کوونکی (سولوینټ) لري؛ اوبه نړیوال حل کوونکی دی. محلولونه رقیق، غلیظ، غیر مشبوع او مشبوع وي. سسپنشن غیر متجانس وي چې ذرات یې کښیني.",
            equationsAndLaws = listOf(
                "Solution Components: Solution = Solute (minority) + Solvent (majority)",
                "Solubility: Maximum grams of solute dissolved in 100g of solvent at temperature T",
                "Effect of Temperature: Solid solubility in liquid increases with Temp; Gas solubility in liquid decreases with Temp"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Solute, Solvent & Aqueous Solutions",
                    conceptOrLaw = "Water as Universal Solvent",
                    detailEn = "Solute is the substance being dissolved (e.g. salt, sugar); Solvent is the medium dissolving it (e.g. water). Because water's polar molecules dissolve more substances than any other liquid, it is called the universal solvent. Solutions in water are aqueous.",
                    detailUr = "سولیوٹ وہ چیز ہے جو گھلتی ہے (جیسے نمک)؛ سالوینٹ وہ مائع ہے جو حل کرتا ہے (جیسے پانی)۔ چونکہ پانی زیادہ تر اشیاء کو حل کرنے کی صلاحیت رکھتا ہے اس لیے اسے کائناتی سالوینٹ کہتے ہیں۔ پانی والے محلول کو ایکوئس محلول کہتے ہیں۔",
                    detailPs = "سولیوټ حل کېدونکې ماده ده او سولوینټ حل کوونکی دی. اوبه د قطبي خاصیت له امله تر ټولو ډېر مواد حلوي نو نړیوال حل کوونکی بلل کیږي.",
                    cardColor = Color(0xFF0F766E)
                ),
                Class7ScienceCard(
                    title = "Saturated vs Unsaturated",
                    conceptOrLaw = "Saturation Limit at Temperature T",
                    detailEn = "An unsaturated solution can dissolve more solute at that temperature. A saturated solution contains the maximum possible dissolved solute; any extra solute remains undissolved at the bottom. A supersaturated solution holds more solute than normal saturation by cooling a heated solution slowly.",
                    detailUr = "غیر سیر شدہ محلول میں مزید سولیوٹ حل ہو سکتا ہے۔ سیر شدہ (سیچوریٹڈ) محلول وہ ہے جس میں اس درجہ حرارت پر مزید سولیوٹ حل نہ ہو سکے اور اضافی نیچے بیٹھ جائے۔ سپر سیچوریٹڈ میں گرم کر کے معمول سے زیادہ حل کیا جاتا ہے۔",
                    detailPs = "غیر مشبوع محلول نور مواد هم حلولی شي. مشبوع محلول په هغه تودوخه کې نور هېڅ مواد نشي حلولی. فوق مشبوع محلول په لوړه تودوخه کې ډېر مواد حل کړي وي.",
                    cardColor = Color(0xFF0D9488)
                ),
                Class7ScienceCard(
                    title = "Factors Affecting Solubility",
                    conceptOrLaw = "Temperature, Stirring & Particle Size",
                    detailEn = "1) Temperature: Heating increases kinetic energy of solvent molecules, dissolving more solid solute; 2) Stirring: Moves solvent across solute surfaces rapidly; 3) Smaller particle size: Increases total surface area in contact with solvent, speeding dissolution.",
                    detailUr = "حل پذیری پر اثر انداز ہونے والے عوامل: 1) درجہ حرارت (گرم کرنے سے ٹھوس زیادہ حل ہوتا ہے)؛ 2) ہلانا (تیزی سے حل کرتا ہے)؛ 3) ذرات کا باریک ہونا (سطحی رقبہ بڑھنے سے جلدی حل ہوتا ہے)۔",
                    detailPs = "د حلېدو عوامل: تودوخه (د تودوخې په زیاتېدو جامد مواد ډېر حل کیږي)، ښورول، او د ذراتو کوچنۍ اندازه چې سطحه زیاتوي.",
                    cardColor = Color(0xFF14B8A6)
                ),
                Class7ScienceCard(
                    title = "Solutions Across Matter States",
                    conceptOrLaw = "Liquid, Gas & Solid Alloys",
                    detailEn = "Solutions are not just liquids: Gas in gas = Air (oxygen in nitrogen); Gas in liquid = Soda water (CO2 in water); Liquid in liquid = Vinegar (acetic acid in water); Solid in solid = Alloys (Brass = copper + zinc, Bronze, Steel).",
                    detailUr = "محلول صرف مائع نہیں ہوتے: گیس میں گیس = ہوا (نائٹروجن میں آکسیجن)؛ مائع میں گیس = سوڈا واٹر (پانی میں کاربن ڈائی آکسائیڈ)؛ ٹھوس میں ٹھوس = بھرت یعنی الائے (پیتل = تانبا + زنک، سٹیل)۔",
                    detailPs = "محلولونه هر حالت کې وي: ګاز په ګاز کې لکه هوا؛ ګاز په مایع کې لکه سوډا اوبه؛ جامد په جامد کې لکه فلزي الیاژونه (پیتل، فولاد).",
                    cardColor = Color(0xFF2DD4BF)
                ),
                Class7ScienceCard(
                    title = "True Solution vs Suspension",
                    conceptOrLaw = "Homogeneous vs Heterogeneous",
                    detailEn = "A true solution is transparent and homogeneous; solute particles (< 1 nm) never settle. A suspension (e.g. chalk in water, mud) is heterogeneous; large visible particles remain suspended temporarily and settle down upon standing.",
                    detailUr = "حقیقی محلول شفاف اور یکساں ہوتا ہے جس کے ذرات کبھی نیچے نہیں بیٹھتے۔ سسپنشن (جیسے چاک کا پانی میں آمیزہ یا کیچڑ) غیر یکساں ہوتا ہے جس کے بڑے ذرات کچھ دیر بعد پیندے میں بیٹھ جاتے ہیں۔",
                    detailPs = "حقیقي محلول شفاف وي او ذرات یې هېڅکله نه کښیني. سسپنشن نا متجانس وي او غټ ذرات لري چې له لږ وخت وروسته لاندې پاتې کیږي (لکه خټې).",
                    cardColor = Color(0xFF134E4A)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Why does carbon dioxide gas fizz vigorously out of a cold soda bottle when the soda warms up on a hot summer day?",
                    questionUr = "جب گرمیوں کے دن سوڈا واٹر گرم ہوتا ہے تو اس میں سے کاربن ڈائی آکسائیڈ گیس تیزی سے باہر کیوں نکلتی ہے؟",
                    questionPs = "کله چې سوډا اوبه په ګرمۍ کې تودې شي، د کاربن ډای اکسایډ ګاز ولې په تیزۍ سره ترې راوځي؟",
                    options = listOf(
                        "Unlike solids, the solubility of gases in liquids decreases significantly as temperature increases",
                        "Because heat turns carbon dioxide gas into pure liquid ice",
                        "Because high temperature freezes the soda water solid",
                        "Because soda water contains living fish that exhale gas"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "For dissolved gases, higher temperature gives gas molecules higher kinetic energy to break intermolecular attractions with liquid molecules and escape into the atmosphere. Thus, gas solubility drops as temperature rises.",
                    whyExplanationUr = "ٹھوس اشیاء کے برعکس، درجہ حرارت بڑھنے سے گیسوں کی مائعات میں حل پذیری کم ہو جاتی ہے۔ گرم ہونے پر گیس کے مالیکیولز کی حرکی توانائی بڑھ جاتی ہے اور وہ محلول سے بلبلوں کی شکل میں اڑ جاتے ہیں۔",
                    whyExplanationPs = "د جامدو برعکس، د تودوخې په لوړېدو سره په اوبو کې د ګازونو د حلېدو کچه راټیټیږي او ګاز هوا ته تښتي.",
                    formulaOrStep = "Gas Solubility in liquids ∝ 1 / Temperature",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What happens when a hot, saturated sugar solution prepared at 90°C is allowed to cool down to 20°C in a beaker?",
                    questionUr = "جب 90°C پر تیار کردہ گرم سیر شدہ چینی کا محلول بیکر میں ٹھنڈا ہو کر 20°C پر آتا ہے تو کیا ہوتا ہے؟",
                    questionPs = "کله چې په ۹۰ درجو کې مشبوع شوی د بورې محلول بېرته ۲۰ درجو ته یخ شي، څه پیښیږي؟",
                    options = listOf(
                        "The excess dissolved sugar crystallizes out of the solution because solubility decreases with cooling",
                        "The sugar permanently vanishes into air",
                        "The beaker turns into pure salt",
                        "The solution completely boils away"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Sugar has much higher solubility at 90°C than at 20°C. As the solution cools, water can no longer hold the extra solute, and pure sugar crystals precipitate out of the solution (crystallization).",
                    whyExplanationUr = "چینی کی حل پذیری 90°C پر زیادہ اور 20°C پر کم ہوتی ہے۔ محلول ٹھنڈا ہونے پر اضافی چینی اپنے قلمیں (کرسٹلز) بنا کر بیکر کے پیندے میں بیٹھ جاتی ہے۔",
                    whyExplanationPs = "بورې د تودوخې په کمېدو سره خپل اضافي مواد بېرته د کرسټالونو په بڼه راوباسي ځکه د حلېدو توان یې کم شوی.",
                    formulaOrStep = "Cooling saturated solution ➔ Solute exceeds solubility limit ➔ Crystallization",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following is an example of a solid-in-solid solution (an alloy)?",
                    questionUr = "درج ذیل میں سے کون سا ٹھوس میں ٹھوس محلول (الائے یعنی بھرت) کی مثال ہے؟",
                    questionPs = "له لاندې مواردو څخه کوم یو په جامد کې د جامد محلول (فلزي الیاژ) بېلګه ده؟",
                    options = listOf(
                        "Brass, a homogeneous solid solution of copper and zinc",
                        "Muddy river water",
                        "Pure liquid mercury",
                        "Chalk mixed in sand"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Brass is an alloy—a homogeneous solid solution where zinc atoms are uniformly dispersed among copper atoms. Because it is completely homogeneous at the atomic scale, it is classified as a solid solution.",
                    whyExplanationUr = "پیتل (براس) تانبے اور جست کا ایک یکساں ٹھوس محلول (بھرت) ہے۔ اس میں دونوں دھاتیں ایٹمی سطح پر ایک دوسرے میں یکساں طور پر گھلی ہوتی ہیں۔",
                    whyExplanationPs = "پیتل د مسو او زینک یو متجانس جامد محلول دی چې په اټومي کچه سره یوځای شوي دي.",
                    formulaOrStep = "Brass = Copper (Solvent) + Zinc (Solute) [Solid-in-Solid Solution]",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why do powdered sugar granules dissolve much faster in water than a large sugar cube of equal mass?",
                    questionUr = "پسی ہوئی چینی کے باریک دانے اتنے ہی وزن کے چینی کے موٹے کیوب کے مقابلے میں پانی میں زیادہ تیزی سے کیوں گھلتے ہیں؟",
                    questionPs = "میده شوې بوره ولې د ورته وزن د بورې د یوې غټې ټوټې په پرتله په اوبو کې ډېره ژر حل کیږي؟",
                    options = listOf(
                        "Powdered sugar has a vastly larger total surface area exposed to contact with water molecules",
                        "Powdered sugar possesses different chemical atoms than cube sugar",
                        "The cube of sugar has a higher boiling point",
                        "Powdered sugar freezes the water instantly"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Dissolution occurs at the interface between solute and solvent. Breaking sugar into fine powder exposes an enormous total surface area, allowing far more water molecules to collide and dissolve sugar particles simultaneously.",
                    whyExplanationUr = "حل ہونے کا عمل سولیوٹ کی بیرونی سطح پر ہوتا ہے۔ پسی ہوئی چینی کی سطح کا رقبہ (سرفیس ایریا) بہت زیادہ ہوتا ہے جس کی وجہ سے پانی کے مالیکیولز اس پر تیزی سے اثر انداز ہو کر اسے جلدی گھول لیتے ہیں۔",
                    whyExplanationPs = "ځکه چې میده شوې بوره ډېره سطحه لري او د اوبو مالیکولونه په اسانۍ سره له ټولو خواوو پرې لګیږي.",
                    formulaOrStep = "Particle size ↓ ➔ Total Surface Area ↑ ➔ Rate of Dissolution ↑",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "How does a 'Suspension' (such as chalk stirred in water) fundamentally differ from a 'True Solution' (such as salt in water)?",
                    questionUr = "ایک سسپنشن (جیسے پانی میں ملا ہوا چاک) حقیقی محلول (جیسے پانی میں گھلا نمک) سے بنیادی طور پر کیسے مختلف ہے؟",
                    questionPs = "یو سسپنشن (لکه په اوبو کې تباشیر) له یوه حقیقي محلول (لکه په اوبو کې مالګه) سره څه بنسټیز توپیر لري؟",
                    options = listOf(
                        "Suspensions are heterogeneous with visible particles that scatter light and settle down over time; solutions are clear, homogeneous, and permanent",
                        "Suspensions contain only radioactive gases",
                        "True solutions always explode when stirred",
                        "Suspensions can never be filtered through filter paper"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In true solutions, solute particles are microscopic ions/molecules (< 1 nm) that never settle. In suspensions, particles are large (> 1000 nm), make the mixture cloudy, scatter light, can be separated by filter paper, and settle down due to gravity.",
                    whyExplanationUr = "حقیقی محلول میں ذرات مالیکیولی سطح پر یکساں حل ہوتے ہیں اور کبھی نیچے نہیں بیٹھتے۔ سسپنشن غیر یکساں آمیزہ ہوتا ہے جس کے بڑے ذرات روشنی کو منتشر کرتے ہیں، فلٹر پیپر سے روکے جا سکتے ہیں اور کچھ دیر بعد نیچے بیٹھ جاتے ہیں۔",
                    whyExplanationPs = "په سسپنشن کې ذرات غټ وي، رڼا خپروي، په فلټر پاتې کیږي او لاندې کښیني؛ خو محلول شفاف او متجانس وي.",
                    formulaOrStep = "Suspension = Heterogeneous, particles > 1000 nm, settles by gravity",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 8: FORCE AND MOTION (p. 93–108) ───
        Class7ScienceStage(
            id = 8,
            unitNumber = "Unit 8",
            pageRange = "Pages 93–108",
            titleEn = "Force and Motion",
            titleUr = "قوت اور حرکت",
            titlePs = "قوه او حرکت",
            themeColor = Color(0xFFE11D48),
            secondaryColor = Color(0xFF881337),
            summaryEn = "Motion is described through distance (scalar) and displacement (vector with direction), speed (v = d/t) and velocity (rate of displacement), and acceleration (a = (v_f - v_i)/t). Distance-time graph slope reveals speed. Forces are categorized as contact (friction, tension, normal) or non-contact (gravity, magnetism). Balanced forces (net force = 0) maintain rest or uniform velocity, while unbalanced forces cause acceleration.",
            summaryUr = "حرکت کو فاصلے (سکیلر) اور ہٹاؤ یا ڈسپلیسمنٹ (ویکٹر)، رفتار یا سپیڈ (v = d/t) اور ویلوسٹی، اور ایکسلریشن (a = (vf - vi)/t) کے ذریعے بیان کیا جاتا ہے۔ فاصلہ-وقت گراف کی ڈھلوان سپیڈ ظاہر کرتی ہے۔ قوتیں لمسی (رگڑ، تناؤ) یا غیر لمسی (کشش ثقل، مقناطیسیت) ہو سکتی ہیں۔ متوازن قوتیں حرکت برقرار رکھتی ہیں جبکہ غیر متوازن قوتیں اسراع (ایکسلریشن) پیدا کرتی ہیں۔",
            summaryPs = "حرکت د واټن، بې ځایه کېدو، سرعت (v = d/t)، او تېزوالي یا اسراع (a = (vf - vi)/t) په وسیله بیانیږي. متوازن قوې حرکت نه بدلوي، خو نامتوازن قوې په جسم کې اسراع رامنځته کوي.",
            equationsAndLaws = listOf(
                "Speed Formula: v = d / t (Speed = Distance / Time, in meters/second m/s)",
                "Acceleration Formula: a = (vf - vi) / t (Rate of change of velocity, in m/s²)",
                "Newton's First Law: An object remains at rest or constant velocity unless acted upon by an unbalanced net force (F_net = m × a)"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Distance vs Displacement",
                    conceptOrLaw = "Scalar vs Vector Quantities",
                    detailEn = "Distance is the total length of the actual path travelled by a moving object regardless of direction (scalar). Displacement is the shortest straight-line distance measured from the starting point to the finishing point in a specified direction (vector).",
                    detailUr = "فاصلہ (ڈسٹنس) کسی متحرک جسم کا طے کردہ کل راستہ ہے جس کی کوئی سمت نہیں ہوتی (سکیلر)۔ ہٹاؤ (ڈسپلیسمنٹ) ابتدائی اور آخری نقطے کے درمیان سیدھا مختصر ترین فاصلہ ہے جس کی مخصوص سمت ہوتی ہے (ویکٹر)۔",
                    detailPs = "واټن د ټولې وهل شوې لارې اوږدوالی دی (سکالر). بې ځایه کېدل له پیل څخه تر پایه مستقیم تر ټولو لنډ واټن دی چې لوری لري (ویکټور).",
                    cardColor = Color(0xFFBE123C)
                ),
                Class7ScienceCard(
                    title = "Speed vs Velocity",
                    conceptOrLaw = "v = d/t & Direction Importance",
                    detailEn = "Speed is the rate at which an object covers distance (v = d/t, scalar). Velocity is the rate of change of displacement in a given direction (vector). A car driving around a circular track at constant 60 km/h has constant speed but changing velocity.",
                    detailUr = "سپیڈ فاصلہ طے کرنے کی شرح ہے (v = d/t)۔ ویلوسٹی کسی مخصوص سمت میں ہٹاؤ کی شرح ہے۔ گول چکر میں 60 کلومیٹر فی گھنٹہ کی رفتار سے گھومنے والی گاڑی کی سپیڈ مستقل ہوتی ہے مگر سمت بدلنے سے ویلوسٹی بدلتی رہتی ہے۔",
                    detailPs = "سرعت د واټن د وهلو کچه ده. خو ویلوسیټي په یو ټاکلي لوري کې د بې ځایه کېدو کچه ده. په ګرده لار کې موټر یو ثابت سرعت لري خو لوری یې بدلېدونکی دی.",
                    cardColor = Color(0xFFE11D48)
                ),
                Class7ScienceCard(
                    title = "Acceleration Defined",
                    conceptOrLaw = "a = (vf - vi) / t in m/s²",
                    detailEn = "Acceleration is the rate of change of velocity over time: a = (v_f - v_i)/t. If an object speeds up, acceleration is positive; if it slows down, it has negative acceleration (deceleration or retardation).",
                    detailUr = "ایکسلریشن (اسراع) وقت کے ساتھ ویلوسٹی میں تبدیلی کی شرح ہے: a = (vf - vi)/t۔ اگر رفتار بڑھے تو مثبت اسراع، اور اگر رفتار کم ہو تو منفی اسراع (ریٹارڈیشن) کہلاتا ہے۔",
                    detailPs = "تېزوالی (اسراع) په وخت کې د سرعت د بدلون کچه ده: a = (vf - vi)/t. که سرعت زیات شي مثبت او که کم شي منفي تېزوالی بلل کیږي.",
                    cardColor = Color(0xFF9F1239)
                ),
                Class7ScienceCard(
                    title = "Distance-Time Graphs",
                    conceptOrLaw = "Slope = Speed",
                    detailEn = "On a distance-time graph: Horizontal flat line = object at rest (v = 0); Straight sloping line = constant uniform speed; Steeper slope = higher speed; Curved line curving upward = accelerating motion.",
                    detailUr = "فاصلہ-وقت گراف پر: سیدھی افقی لکیر = ساکن جسم؛ سیدھی ترچھی لکیر = یکساں رفتار؛ جتنی زیادہ ڈھلوان ہوگی اتنی زیادہ رفتار ہوگی؛ اوپر مڑتی ہوئی لکیر = تیز ہوتی حرکت (اسراع)۔",
                    detailPs = "د واټن-وخت په ګراف کې: افقي کرښه د درېدلي جسم مانا لري؛ برابره مائله کرښه ثابت سرعت ښيي؛ لوړه مائلتیا لوړ سرعت ښيي.",
                    cardColor = Color(0xFFFB7185)
                ),
                Class7ScienceCard(
                    title = "Balanced vs Unbalanced Forces",
                    conceptOrLaw = "Net Force and Motion",
                    detailEn = "Balanced forces are equal in magnitude and opposite in direction (F_{net} = 0), so an object at rest stays at rest and an object in motion keeps moving at constant velocity. Unbalanced forces (F_{net} > 0) cause the object to accelerate, decelerate, or change direction.",
                    detailUr = "متوازن قوتیں وہ ہوتی ہیں جن کا مجموعہ صفر ہو (F_{net} = 0)، جس سے جسم کی حرکت میں کوئی تبدیلی نہیں آتی۔ غیر متوازن قوتیں وہ ہوتی ہیں جن کا خالص اثر صفر نہ ہو، یہ جسم کو تیز، آہستہ یا اس کی سمت بدل دیتی ہیں۔",
                    detailPs = "متوازن قوې یو بل خنثی کوي او د جسم حالت نه بدلوي. نامتوازن قوې د دې لامل ګرځي چې جسم حرکت وکړي، تېز شي، یا لوری بدل کړي.",
                    cardColor = Color(0xFF881337)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "A car accelerates uniformly from an initial velocity vi = 10 m/s to a final velocity vf = 30 m/s in 4 seconds. What is its acceleration?",
                    questionUr = "ایک کار 4 سیکنڈ میں ابتدائی ویلوسٹی 10 m/s سے آخری ویلوسٹی 30 m/s تک ایکسلریٹ کرتی ہے۔ اس کا ایکسلریشن (اسراع) کتنا ہوگا؟",
                    questionPs = "یو موټر په ۴ ثانیو کې له ۱۰ متره پر ثانیه څخه ۳۰ متره پر ثانیه ته تېزیږي. اسراع (تېزوالی) یې څومره دی؟",
                    options = listOf(
                        "5 m/s² (a = (30 - 10) / 4 = 20 / 4 = 5 m/s²)",
                        "10 m/s²",
                        "20 m/s²",
                        "80 m/s²"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Using the standard acceleration formula a = (v_f - v_i)/t: change in velocity Δ v = 30 - 10 = 20 m/s. Dividing by time t = 4 seconds yields a = 20/4 = 5 m/s².",
                    whyExplanationUr = "ایکسلریشن کا فارمولا a = (vf - vi)/t ہے: ویلوسٹی میں تبدیلی = 30 - 10 = 20 m/s۔ وقت 4 سیکنڈ پر تقسیم کرنے سے a = 20 / 4 = 5 m/s² حاصل ہوتا ہے۔",
                    whyExplanationPs = "د اسراع فارمول له مخې: a = (۳۰ - ۱۰) / ۴ = ۲۰ / ۴ = ۵ متره پر ثانیه مربع.",
                    formulaOrStep = "a = (vf - vi) / t = (30 - 10) / 4 = 20 / 4 = 5 m/s²",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "An athlete runs exactly one full lap around a 400-meter circular track and returns to the exact starting line in 50 seconds. What is their distance and displacement?",
                    questionUr = "ایک ایتھلیٹ 400 میٹر گول ٹریک کا ایک مکمل چکر 50 سیکنڈ میں لگا کر واپس شروعاتی نقطے پر آ جاتا ہے۔ اس کا فاصلہ اور ڈسپلیسمنٹ کتنا ہوگا؟",
                    questionPs = "یو لوبغاړی په یوه ۴۰۰ متري ګرد ټریک کې پوره یو دور وهي او په ۵۰ ثانیو کې بېرته خپل پیل ته راځي. واټن او بې ځایه کېدل یې څومره دي؟",
                    options = listOf(
                        "Distance = 400 meters, but Displacement = 0 meters",
                        "Distance = 0 meters, and Displacement = 400 meters",
                        "Both distance and displacement are 400 meters",
                        "Both distance and displacement are 0 meters"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Distance is the actual path length travelled (400 m). Displacement is the straight-line vector from start to finish. Because the athlete ended at the exact starting point, their net change in position is zero meters.",
                    whyExplanationUr = "فاصلہ طے کردہ راستے کی اصل لمبائی ہے جو کہ 400 میٹر ہے۔ ڈسپلیسمنٹ شروعاتی اور آخری پوزیشن کا سیدھا فاصلہ ہے، چونکہ وہ واپس شروع والی جگہ آ گیا اس لیے ڈسپلیسمنٹ صفر میٹر ہے۔",
                    whyExplanationPs = "وهل شوی واټن ۴۰۰ متره دی، خو څرنګه چې بېرته خپل اصلي ځای ته راغلی، د بې ځایه کېدو کچه صفر ده.",
                    formulaOrStep = "Distance = 400 m; Displacement = Final position - Initial position = 0 m",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "On a distance-time graph, what does a completely horizontal flat line (parallel to time axis) represent?",
                    questionUr = "فاصلہ-وقت گراف پر، وقت کے متوازی ایک بالکل سیدھی افقی لکیر کس چیز کو ظاہر کرتی ہے؟",
                    questionPs = "د واټن-وخت په ګراف کې یوه افقي موازي کرښه څه ښيي؟",
                    options = listOf(
                        "The object is completely stationary and at rest (speed = 0 m/s)",
                        "The object is moving at the speed of light",
                        "The object has infinite acceleration",
                        "The object is falling downward in vacuum"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The slope of a distance-time graph represents speed (v = Δ d / Δ t). A horizontal line has a slope of zero, meaning time is progressing but the object's position is unchanged—it is at rest.",
                    whyExplanationUr = "فاصلہ-وقت گراف کی ڈھلوان رفتار ظاہر کرتی ہے۔ افقی لکیر کی ڈھلوان صفر ہوتی ہے، جس کا مطلب ہے کہ وقت گزر رہا ہے مگر فاصلہ نہیں بدل رہا یعنی جسم ساکن کھڑا ہے۔",
                    whyExplanationPs = "د واټن-وخت د ګراف مائلتیا سرعت ښيي. کله چې کرښه افقي وي مائلتیا صفر ده، یعنې جسم ولاړ دی او حرکت نه کوي.",
                    formulaOrStep = "Slope = Δd / Δt = 0 ➔ Speed = 0 m/s (Object at rest)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "A skydiver with parachute open falls downwards through air at a steady terminal velocity of 15 m/s. What can be concluded about the forces acting on them?",
                    questionUr = "ایک پیرا شوٹر پیراشوٹ کھول کر ہوا میں 15 m/s کی مستقل رفتار سے نیچے گر رہا ہے۔ اس پر عمل کرنے والی قوتوں کے بارے میں کیا نتیجہ نکلتا ہے؟",
                    questionPs = "یو چترباز د ۱۵ متره پر ثانیه په ثابت سرعت سره ښکته راځي. پر هغه د لګېدونکو قوو په اړه څه ویلی شو؟",
                    options = listOf(
                        "The downward gravitational force is perfectly balanced by the upward air resistance force (Net Force = 0)",
                        "Gravity has completely turned off in the upper atmosphere",
                        "Air resistance is ten times larger than gravity",
                        "There are zero forces of any kind acting on the skydiver"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "According to Newton's First Law, when an object moves with constant velocity (zero acceleration), the net force acting on it must be zero. The downward pull of gravity is exactly equal and opposite to the upward air resistance.",
                    whyExplanationUr = "نیوٹن کے پہلے قانون کے مطابق، جب کوئی جسم مستقل رفتار سے حرکت کرے تو اس پر خالص قوت صفر ہوتی ہے۔ نیچے کی کشش ثقل کو اوپر کی ہوا کی رگڑ نے بالکل متوازن کر دیا ہوتا ہے۔",
                    whyExplanationPs = "د نیوټن د لومړي قانون له مخې، کله چې سرعت ثابت وي اسراع صفر وي. د ځمکې جاذبه او د هوا مقاومت مساوي شوي او متوازنې قوې دي.",
                    formulaOrStep = "Constant velocity ➔ a = 0 ➔ F_net = F_gravity - F_drag = 0 (Balanced forces)",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Why does a car driving in a circle at a constant speedometer reading of 50 km/h still have non-zero acceleration?",
                    questionUr = "50 کلومیٹر فی گھنٹہ کی یکساں رفتار سے دائرے میں گھومنے والی کار میں اسراع (ایکسلریشن) پھر بھی موجود کیوں ہوتا ہے؟",
                    questionPs = "یو موټر چې په ګرده لار په ۵۰ کیلومتره ثابت سرعت تاویږي، ولې بیا هم اسراع (تېزوالی) لري؟",
                    options = listOf(
                        "Because velocity is a vector; continuously turning changes the direction of motion, which is a change in velocity over time",
                        "Because the car engine consumes gasoline",
                        "Because the tires melt due to friction",
                        "Because speed and velocity are identical terms"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Acceleration is the rate of change of velocity, which has both magnitude (speed) and direction. Even though the magnitude is constant at 50 km/h, the direction of motion is continually changing towards the center, causing centripetal acceleration.",
                    whyExplanationUr = "ایکسلریشن ویلوسٹی میں تبدیلی کی شرح ہے، اور ویلوسٹی میں سمت شامل ہوتی ہے۔ اگرچہ رفتار 50 ہی رہتی ہے لیکن ہر لمحہ سمت بدلنے کی وجہ سے ویلوسٹی بدلتی ہے جس سے اسراع پیدا ہوتا ہے۔",
                    whyExplanationPs = "ځکه چې ویلوسیټي لوری لري. که څه هم د سرعت اندازه ۵۰ ده خو څرنګه چې لوری یې هر وخت بدلیږي نو په ویلوسیټي کې بدلون اسراع رامنځته کوي.",
                    formulaOrStep = "Velocity = Speed + Direction ➔ Changing direction ➔ Acceleration ≠ 0",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 9: WAVES AND ENERGY (p. 109–128) ───
        Class7ScienceStage(
            id = 9,
            unitNumber = "Unit 9",
            pageRange = "Pages 109–128",
            titleEn = "Waves and Energy",
            titleUr = "لہریں اور توانائی",
            titlePs = "څپې او انرژي",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF075985),
            summaryEn = "Waves transfer energy from one place to another without transporting matter. Mechanical waves require a material medium (sound, water), while electromagnetic waves travel through a vacuum (light, radio). Transverse waves vibrate perpendicular to propagation (crests and troughs); longitudinal waves vibrate parallel (compressions and rarefactions). The wave equation is v = f × λ. Sound travels fastest in solids (5000 m/s), slower in liquids (1500 m/s), and slowest in air (340 m/s). An echo requires a minimum distance of 17 meters due to 0.1-second persistence of hearing.",
            summaryUr = "لہریں مادے کو منتقل کیے بغیر توانائی کو ایک جگہ سے دوسری جگہ منتقل کرتی ہیں۔ مکینیکل لہروں کو واسطے کی ضرورت ہوتی ہے (آواز، پانی)، جبکہ برقی مقناطیسی لہریں خلا میں بھی سفر کرتی ہیں (روشنی)۔ ٹرانسورس لہروں میں ذرات عموداً حرکت کرتے ہیں، لونگیٹیوڈنل میں متوازی۔ لہر کی مساوات v = f × λ ہے۔ آواز کی رفتار ٹھوس میں سب سے تیز اور ہوا میں 340 m/s ہوتی ہے۔ بازگشت (ایکو) سننے کے لیے کم از کم 17 میٹر کا فاصلہ درکار ہوتا ہے۔",
            summaryPs = "څپې انرژي لېږدوي بې له دې چې ماده ولېږدوي. میخانیکي څپې مادي محیط غواړي (غږ)، خو الکترومقناطیسي څپې په تشیال کې هم ځي (رڼا). د څپې مساوات v = f × λ دی. غږ په جامداتو کې تر ټولو ګړندی او په هوا کې ۳۴۰ متره پر ثانیه دی. ازانګې (ایکو) لږ تر لږه ۱۷ متره واټن غواړي.",
            equationsAndLaws = listOf(
                "Wave Equation: v = f × λ (Speed = Frequency × Wavelength)",
                "Speed of Sound: Solids (~5000 m/s) > Liquids (~1500 m/s) > Gases (~340 m/s in air at 20°C); Vacuum = 0 m/s",
                "Echo Minimum Distance: d = (v × t) / 2 = (340 m/s × 0.1 s) / 2 = 17 meters (due to 0.1s persistence of human hearing)"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Mechanical vs Electromagnetic Waves",
                    conceptOrLaw = "Medium Requirement",
                    detailEn = "Mechanical waves (sound, water ripples, seismic waves) require a material medium to propagate because energy transfers through oscillating particles. Electromagnetic waves (visible light, X-rays, microwaves, radio) do not require any medium and travel across vacuum at 300,000 km/s.",
                    detailUr = "مکینیکل لہروں (آواز، پانی کی لہریں) کو سفر کے لیے مادی واسطے کی ضرورت ہوتی ہے۔ برقی مقناطیسی لہروں (روشنی، ریڈیو لہریں، ایکس ریز) کو کسی واسطے کی ضرورت نہیں ہوتی اور وہ خلا میں بھی 300,000 کلومیٹر فی سیکنڈ کی رفتار سے سفر کرتی ہیں۔",
                    detailPs = "میخانیکي څپې (غږ) مادي چاپېریال ته اړتیا لري ترڅو ذره پر ذره انرژي ورسوي. خو الکترومقناطیسي څپې (رڼا) په تشیال کې هم په درې سوه زره کیلومتره پر ثانیه تګ کوي.",
                    cardColor = Color(0xFF0369A1)
                ),
                Class7ScienceCard(
                    title = "Transverse vs Longitudinal",
                    conceptOrLaw = "Oscillation Direction",
                    detailEn = "Transverse waves: particle vibration is perpendicular to wave energy direction (features Crests and Troughs, e.g. light, water surface waves). Longitudinal waves: particle vibration is parallel to wave direction (features Compressions and Rarefactions, e.g. sound waves).",
                    detailUr = "ٹرانسورس لہروں میں ذرات لہر کی سمت کے عموداً لرزتے ہیں اور ان میں کریسٹ اور ٹرف بنتے ہیں (جیسے روشنی)۔ لونگیٹیوڈنل لہروں میں ذرات لہر کی سمت میں آگے پیچھے حرکت کرتے ہیں اور کمپریشن اور ریئر فیکشن بناتے ہیں (جیسے آواز)۔",
                    detailPs = "عرضي څپو کې ذرات عمودي حرکت کوي او څوکې او ژورې جوړوي. طولي څپو کې ذرات موازي خوځیږي او تراکم او انبساط رامنځته کوي لکه غږ.",
                    cardColor = Color(0xFF0284C7)
                ),
                Class7ScienceCard(
                    title = "The Wave Equation (v = f × λ)",
                    conceptOrLaw = "Speed, Frequency & Wavelength",
                    detailEn = "Wave speed (v) equals Frequency (f, waves per second in Hertz Hz) multiplied by Wavelength (λ, distance between two consecutive crests or compressions in meters). If frequency doubles at constant speed, wavelength is halved.",
                    detailUr = "لہر کی رفتار (v) فریکوئنسی (f، فی سیکنڈ لہروں کی تعداد ہرٹز میں) اور ویو لینتھ (λ، دو متصل کریسٹس کے درمیان فاصلہ میٹر میں) کے حاصل ضرب کے برابر ہوتی ہے: v = f × λ۔",
                    detailPs = "د څپې سرعت v = f × λ دی، چې f فریکونسي (هرټز) او λ د څپې اوږدوالی (میتر) دی. که فریکونسي دوه چنده شي د څپې اوږدوالی نیم کیږي.",
                    cardColor = Color(0xFF0EA5E9)
                ),
                Class7ScienceCard(
                    title = "Speed of Sound in Media",
                    conceptOrLaw = "Particle Proximity and Rigidity",
                    detailEn = "Sound travels fastest in solids (~5000 m/s in steel) because tightly packed atoms quickly transfer vibrational energy; slower in liquids (~1500 m/s in water); and slowest in gases (~340 m/s in air). Sound cannot travel in a vacuum.",
                    detailUr = "آواز ٹھوس اشیاء میں سب سے تیز (سٹیل میں 5000 m/s) سفر کرتی ہے کیونکہ ایٹم آپس میں جڑے ہوتے ہیں؛ پانی میں 1500 m/s اور ہوا میں سب سے سست (340 m/s) سفر کرتی ہے۔ خلا میں آواز بالکل سفر نہیں کر سکتی۔",
                    detailPs = "غږ په کلکو شیانو (فولادو) کې تر ټولو تېز دی (۵۰۰۰ متره پر ثانیه)، په اوبو کې ۱۵۰۰ او په هوا کې ۳۴۰ دی. په تشیال کې غږ هېڅ نه خپریږي.",
                    cardColor = Color(0xFF38BDF8)
                ),
                Class7ScienceCard(
                    title = "Echo and Persistence of Hearing",
                    conceptOrLaw = "Reflection of Sound & 17m Minimum",
                    detailEn = "An echo is the repetition of sound produced by reflection off a hard obstacle. The human brain retains sound sensation for 0.1 s. To distinguish an echo from original sound, the reflected sound must take at least 0.1 s, requiring a minimum distance of d = (340 × 0.1) / 2 = 17 meters.",
                    detailUr = "بازگشت (ایکو) سخت سطح سے آواز کے ٹکرا کر واپس آنے کو کہتے ہیں۔ انسانی دماغ آواز کے تاثر کو 0.1 سیکنڈ تک برقرار رکھتا ہے۔ الگ آواز سننے کے لیے رکاوٹ کا کم از کم فاصلہ 17 میٹر ہونا چاہیے: d = (340 × 0.1) / 2 = 17m۔",
                    detailPs = "ازانګه له سخت دیوال څخه د غږ انعکاس دی. د انسان غوږ تر ۰.۱ ثانیې اصلي غږ ساتي، نو د جلا غږ اورېدو لپاره لږ تر لږه ۱۷ متره واټن پکار دی.",
                    cardColor = Color(0xFF075985)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "A sound wave has a frequency f = 680 Hz and travels through air at speed v = 340 m/s. What is its wavelength (λ)?",
                    questionUr = "ایک آواز کی لہر کی فریکوئنسی 680 ہرٹز ہے اور وہ ہوا میں 340 m/s کی رفتار سے سفر کرتی ہے۔ اس کی ویو لینتھ (λ) کتنی ہوگی؟",
                    questionPs = "د یوه غږ د څپې فریکونسي ۶۸۰ هرټز ده او په هوا کې په ۳۴۰ متره پر ثانیه تګ کوي. د څپې اوږدوالی یې څومره دی؟",
                    options = listOf(
                        "0.5 meters (λ = v / f = 340 / 680 = 0.5 m)",
                        "2.0 meters",
                        "231,200 meters",
                        "100 meters"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Using the wave equation v = f \times λ, rearrange for wavelength: λ = v / f = 340 / 680 = 0.5 meters.",
                    whyExplanationUr = "لہر کی مساوات v = f × λ سے: ویو لینتھ λ = v / f = 340 / 680 = 0.5 میٹر بنتی ہے۔",
                    whyExplanationPs = "د فارمول له مخې: λ = v / f = ۳۴۰ / ۶۸۰ = ۰.۵ متره.",
                    formulaOrStep = "λ = v / f = 340 / 680 = 0.5 m",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why can an astronaut standing on the Moon hear no sound from nearby meteorite impacts, even if they see the explosion?",
                    questionUr = "چاند پر موجود خلاباز شہاب ثاقب کے دھماکے کو دیکھنے کے باوجود اس کی آواز کیوں نہیں سن سکتا؟",
                    questionPs = "په سپوږمۍ کې ستورمزلی ولې د کاڼي د لګېدو د چاودنې غږ نشي اورېدلی سره له دې چې ویني یې؟",
                    options = listOf(
                        "Sound is a mechanical wave requiring a material medium; the Moon has no atmosphere (vacuum) through which sound can travel",
                        "Space suits permanently plug astronauts' ears with foam",
                        "Sound waves on the Moon travel backward into space",
                        "Moon dust absorbs all light and sound completely"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Sound waves propagate by vibrating adjacent atoms in a physical medium. Because the Moon has a vacuum with no air molecules to vibrate, sound cannot travel through space.",
                    whyExplanationUr = "آواز ایک مکینیکل لہر ہے جسے سفر کرنے کے لیے ہوا یا کسی مادی واسطے کی ضرورت ہوتی ہے۔ چاند پر ہوا نہیں ہے (خلا ہے)، اس لیے آواز کے ذرات لرز نہیں سکتے اور آواز سفر نہیں کر سکتی۔",
                    whyExplanationPs = "غږ میخانیکي څپه ده او د سفر لپاره هوا غواړي. په سپوږمۍ کې هوا نشته (تشیال دی) نو غږ نشي خپرېدای.",
                    formulaOrStep = "Sound = Mechanical wave ➔ Requires medium ➔ Vacuum speed = 0 m/s",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why is the minimum distance between a person and a reflection cliff required to hear a distinct echo exactly 17 meters in air?",
                    questionUr = "ہوا میں واضح بازگشت (ایکو) سننے کے لیے انسان اور پہاڑی کے درمیان کم از کم فاصلہ ٹھیک 17 میٹر کیوں ہونا چاہیے؟",
                    questionPs = "په هوا کې د روښانه ازانګې (ایکو) د اورېدو لپاره ولې د انسان او غره ترمنځ لږ تر لږه ۱۷ متره واټن پکار دی؟",
                    options = listOf(
                        "Because human persistence of hearing is 0.1 s; sound travelling to the wall and back at 340 m/s requires (340 × 0.1) / 2 = 17 m",
                        "Because sound waves only bend at 17 degrees",
                        "Because mountains are always built 17 meters high",
                        "Because 17 meters is the wavelength of all human speech"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The brain retains a sound sensation for 0.1 s. To hear an echo distinctly, the reflected sound must return after at least 0.1 s. In 0.1 s, sound covers 340 \times 0.1 = 34 meters total round-trip. Dividing by 2 gives the one-way distance: 34 / 2 = 17 meters.",
                    whyExplanationUr = "انسانی دماغ آواز کو 0.1 سیکنڈ تک یاد رکھتا ہے۔ الگ آواز سننے کے لیے آواز کو کم از کم 0.1 سیکنڈ بعد واپس آنا چاہیے۔ 0.1 سیکنڈ میں آواز جانے اور آنے کا کل فاصلہ 34 میٹر طے کرتی ہے، جس کا نصف فاصلہ 17 میٹر بنتا ہے۔",
                    whyExplanationPs = "د انسان مغز تر ۰.۱ ثانیې غږ ساتي. غږ په ۰.۱ ثانیه کې ۳۴ متره تګ او راتګ کوي، نو یو طرفه واټن ۳۴ / ۲ = ۱۷ متره کیږي.",
                    formulaOrStep = "d = (v × t) / 2 = (340 × 0.1) / 2 = 17 meters",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "In which of the following media will sound waves travel with the greatest velocity?",
                    questionUr = "درج ذیل میں سے کس واسطے میں آواز کی لہریں سب سے تیز رفتار سے سفر کریں گی؟",
                    questionPs = "په لاندې کوم چاپیریال کې به غږ په تر ټولو لوړ سرعت سره حرکت وکړي؟",
                    options = listOf(
                        "Solid steel railway track (~5000 m/s)",
                        "Liquid ocean water (~1500 m/s)",
                        "Room air at 20°C (~340 m/s)",
                        "Outer space vacuum (0 m/s)"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In solids like steel, atomic density and elasticity are exceptionally high. Adjacent particles are tightly bonded, transmitting acoustic vibrations far more rapidly than loose liquid molecules or widely spaced gas molecules.",
                    whyExplanationUr = "سٹیل جیسے ٹھوس مادوں میں ایٹم ایک دوسرے سے انتہائی سختی سے جڑے ہوتے ہیں، اس لیے وہ لرزش کو بہت تیزی سے آگے پہنچاتے ہیں (تقریباً 5000 میٹر فی سیکنڈ)۔",
                    whyExplanationPs = "په فولادو کې اتومونه ډېر نږدې او کلک نښتي دي نو د غږ لړزې په خورا لوړ سرعت (۵۰۰۰ متره پر ثانیه) لېږدوي.",
                    formulaOrStep = "Speed of sound: Solids > Liquids > Gases",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "If the amplitude of a guitar string vibration is doubled, what property of the perceived sound changes?",
                    questionUr = "اگر گٹار کی تار کے ارتعاش کا ایمپلی ٹیوڈ (بلندی) دگنا کر دیا جائے تو پیدا ہونے والی آواز میں کیا تبدیلی آئے گی؟",
                    questionPs = "که د ګیتار د تار د خوځښت لمن (امپلیټیوډ) دوه چنده شي، په غږ کې به څه بدلون راشي؟",
                    options = listOf(
                        "The loudness of the sound increases significantly (Loudness ∝ Amplitude²)",
                        "The pitch of the sound becomes much higher",
                        "The speed of sound in air becomes 1000 m/s",
                        "The sound turns into invisible light"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Loudness depends on the amplitude of the vibrating body. A larger amplitude displaces more air molecules with greater energy, resulting in a louder sound. Pitch, on the other hand, depends on frequency.",
                    whyExplanationUr = "آواز کی اونچائی (لاؤڈنس) ایمپلی ٹیوڈ پر منحصر ہوتی ہے۔ بڑا ایمپلی ٹیوڈ ہوا کے ذرات میں زیادہ توانائی پیدا کرتا ہے جس سے آواز زیادہ اونچی سنائی دیتی ہے۔ پچ کا تعلق فریکوئنسی سے ہوتا ہے۔",
                    whyExplanationPs = "د غږ لوړوالی (زوره وری) د امپلیټیوډ سره مستقیمه اړیکه لري. د امپلیټیوډ زیاتوالی غږ زورور کوي، خو پچ په فریکونسۍ پورې اړه لري.",
                    formulaOrStep = "Amplitude ➔ Determines Loudness; Frequency ➔ Determines Pitch",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 10: HEAT AND TEMPERATURE (p. 129–146) ───
        Class7ScienceStage(
            id = 10,
            unitNumber = "Unit 10",
            pageRange = "Pages 129–146",
            titleEn = "Heat and Temperature",
            titleUr = "حرارت اور درجہ حرارت",
            titlePs = "تودوخه او د تودوخې درجه",
            themeColor = Color(0xFFEA580C),
            secondaryColor = Color(0xFF9A3412),
            summaryEn = "Heat is the total thermal energy transferred due to temperature difference (measured in Joules), while temperature is the measure of the average kinetic energy of particles (measured in °C or Kelvin). Heat transfers via three mechanisms: Conduction (solids via vibrating particles and free electrons in metals), Convection (fluids via convection currents driven by density changes), and Radiation (infrared electromagnetic waves traveling across vacuum at the speed of light). Vacuum flasks minimize all three modes.",
            summaryUr = "حرارت تھرمل توانائی ہے جو درجہ حرارت کے فرق کی وجہ سے منتقل ہوتی ہے (جول میں ناپی جاتی ہے)، جبکہ درجہ حرارت ذرات کی اوسط حرکی توانائی کا پیمانہ ہے (°C میں)۔ حرارت کے اخراج کے تین طریقے ہیں: کنڈکشن (ٹھوس اشیاء میں آزاد الیکٹرانوں اور لرزش سے)، کنویکشن (مائعات اور گیسوں میں کثافت کے فرق اور کنویکشن کرنٹ سے)، اور ریڈی ایشن (انفراریڈ لہروں کے ذریعے خلا میں)۔ ویکیوم فلاسک ان تینوں طریقوں کو روکتا ہے۔",
            summaryPs = "تودوخه انرژي ده (په جول ناستل کیږي)، خو د تودوخې درجه د ذراتو اوسط حرکي انرژي ده (په درجو). تودوخه په دریو لارو لېږدول کیږي: کانډکشن (په جامداتو کې)، کنویکشن (په مایعاتو او ګازونو کې د کثافت په بدلون سره)، او وړانګې (ریډییشن) چې تشیال کې هم خپریږي. ترموس د درې واړو مخه نیسي.",
            equationsAndLaws = listOf(
                "Temperature vs Heat: Heat = Total Thermal Energy (Joules J); Temperature = Average Kinetic Energy (°C, K)",
                "Convection Current: Heating fluid ➔ Thermal expansion ➔ Density decreases ➔ Warm fluid rises, cold sinks",
                "Radiation Law: Dull black surfaces = Best absorbers and best emitters of heat; Shiny silver surfaces = Best reflectors"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Heat vs Temperature",
                    conceptOrLaw = "Total Energy vs Average Kinetic Energy",
                    detailEn = "Heat is the flow of thermal energy from higher to lower temperature (Joules). Temperature measures how hot or cold an object is based on the average kinetic energy of its constituent particles (°C). A large cold lake contains more total heat than a hot red needle.",
                    detailUr = "حرارت توانائی ہے جو زیادہ سے کم درجہ حرارت کی طرف بہتی ہے (جول)۔ درجہ حرارت ذرات کی اوسط حرکی توانائی بتاتا ہے (°C)۔ ایک بڑی جھیل میں گرم سوئی کے مقابلے میں زیادہ حرارت ہوتی ہے کیونکہ اس میں پانی کے مالیکیولز بہت زیادہ ہیں۔",
                    detailPs = "تودوخه ټوله حرارتي انرژي ده، خو د تودوخې درجه د ذراتو اوسط چټکتیا ښيي. یو غټ یخ جهيل د یوې سرې شوې ستنې پرتله ډېره ټوله تودوخه لري.",
                    cardColor = Color(0xFFC2410C)
                ),
                Class7ScienceCard(
                    title = "Conduction in Metals",
                    conceptOrLaw = "Role of Free Delocalized Electrons",
                    detailEn = "Solids conduct heat when hot vibrating atoms transfer vibrations to neighbors. Metals conduct heat thousands of times faster than non-metals because they possess seas of free delocalized electrons that rapidly diffuse energy throughout the metal lattice.",
                    detailUr = "ٹھوس اشیاء میں ایٹم اپنی لرزش پڑوسی ایٹموں کو منتقل کرتے ہیں۔ دھاتیں آزاد الیکٹرانوں کی موجودگی کی وجہ سے غیر دھاتوں کے مقابلے میں ہزاروں گنا تیزی سے حرارت منتقل کرتی ہیں، اس لیے وہ بہترین کنڈکٹرز ہیں۔",
                    detailPs = "فلزات ازاد الکترونونه لري چې تودوخه په خورا چټکۍ سره ټول فلز ته لېږدوي نو غوره حرارتي هادي دي.",
                    cardColor = Color(0xFFEA580C)
                ),
                Class7ScienceCard(
                    title = "Convection Currents",
                    conceptOrLaw = "Fluid Density Differences",
                    detailEn = "Liquids and gases expand when heated, increasing volume and lowering density. The buoyant lighter warm fluid rises, while denser cool fluid sinks to take its place. This continuous cycle forms a convection current (driving sea breezes and home heaters).",
                    detailUr = "مائعات اور گیسیں گرم ہونے پر پھیلتی ہیں جس سے ان کی کثافت کم ہو جاتی ہے۔ ہلکا گرم مائع اوپر اٹھتا ہے اور اوپر کا ٹھنڈا وزنی مائع نیچے آتا ہے۔ یہ چکر کنویکشن کرنٹ کہلاتا ہے (جیسے نسیمِ بحری و برّی)۔",
                    detailPs = "کله چې اوبه یا هوا ګرمه شي، حجم یې زیاتیږي، کثافت یې کميږي او پورته ځي؛ یخ مایع ښکته راځي او یو دوره يي جریان (کنویکشن کرینټ) جوړوي.",
                    cardColor = Color(0xFFF97316)
                ),
                Class7ScienceCard(
                    title = "Thermal Radiation",
                    conceptOrLaw = "Infra-red Electromagnetic Waves",
                    detailEn = "Radiation transfers heat via infrared electromagnetic waves without requiring matter. Heat from the Sun travels through empty space vacuum to Earth via radiation. Dull matte black surfaces are the best absorbers and emitters; shiny silver surfaces reflect radiation.",
                    detailUr = "ریڈی ایشن انفراریڈ برقی مقناطیسی لہروں کے ذریعے خلا میں حرارت منتقل کرتی ہے (جیسے سورج کی دھوپ)۔ کالی اور کھردری سطحیں حرارت کو سب سے زیادہ جذب اور خارج کرتی ہیں، جبکہ چمکدار چاندی جیسی سطحیں حرارت کو منعکس کرتی ہیں۔",
                    detailPs = "وړانګې (ریډییشن) انفراریډ څپې دي چې تشیال کې بې له مادي محیط سفر کوي. تور رنګ ډېره تودوخه جذبوي او ځلېدونکی سپین رنګ یې بېرته شړي.",
                    cardColor = Color(0xFFFB923C)
                ),
                Class7ScienceCard(
                    title = "Vacuum Flask Technology",
                    conceptOrLaw = "Minimizing Conduction, Convection & Radiation",
                    detailEn = "A vacuum flask (Thermos) keeps liquids hot/cold: 1) Double glass walls separated by a vacuum stop conduction and convection; 2) Silvered mirror walls reflect radiant heat back; 3) Insulated plastic stopper prevents evaporative convection.",
                    detailUr = "تھرموس (ویکیوم فلاسک) تینوں طریقوں کو روکتا ہے: 1) شیشے کی دوہری دیواروں کے درمیان خلا کنڈکشن اور کنویکشن کو روکتا ہے؛ 2) شیشے پر چاندی کا پالش ریڈی ایشن کو واپس موڑ دیتا ہے؛ 3) پلاسٹک کا ڈھکن بخارات کو باہر جانے سے روکتا ہے۔",
                    detailPs = "ترموس د تودوخې د درې واړو لارو مخه نیسي: تشیال (ویکیوم) کنډکشن او کنویکشن بندوي، او د سپینو زرو پالش وړانګې بېرته شړي ترڅو چای ګرم وساتي.",
                    cardColor = Color(0xFF9A3412)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Why does a metal spoon feel much colder to the touch than a wooden spoon when both have been sitting in the same 20°C room for hours?",
                    questionUr = "کمرے کے ایک ہی 20°C درجہ حرارت میں پڑا ہونے کے باوجود دھات کا چمچ لکڑی کے چمچ کے مقابلے میں ہاتھ لگانے پر زیادہ ٹھنڈا کیوں محسوس ہوتا ہے؟",
                    questionPs = "په یوه خونه کې د لرګي او اوسپنې چمچونه دواړه ۲۰ درجې تودوخه لري، خو د اوسپنې ولې لاس ته ډېر یخ ښکاري؟",
                    options = listOf(
                        "Metal is a vastly better thermal conductor, rapidly drawing heat away from your warm skin (37°C)",
                        "Metal is chemically 20 degrees below zero",
                        "Wood generates its own internal heating flames",
                        "Metal absorbs atmospheric nitrogen gas"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Both spoons are at exactly 20°C. However, your finger is at 37°C. Metal contains free electrons that conduct heat away from your warm finger at a very high rate, triggering cold-sensing receptors in your skin far more rapidly than insulating wood.",
                    whyExplanationUr = "دونوں چمچوں کا درجہ حرارت 20°C ہی ہوتا ہے۔ مگر آپ کے ہاتھ کا درجہ حرارت 37°C ہے۔ دھات اپنے آزاد الیکٹرانوں کی وجہ سے آپ کی انگلی سے حرارت بہت تیزی سے کھینچ لیتی ہے، جس سے وہ ٹھنڈی محسوس ہوتی ہے۔",
                    whyExplanationPs = "دواړه چمچونه شل درجې دي خو د انسان لاس ۳۷ دی. اوسپنه د ښه حرارتي هادي په توګه سمدستي له لاس څخه تودوخه جذبوي نو یخ احساس کیږي.",
                    formulaOrStep = "Rate of heat conduction: Metal >> Wood ➔ Fast heat loss from skin feels colder",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "How does the vacuum space between the double glass walls of a vacuum flask (Thermos) prevent heat loss?",
                    questionUr = "تھرموس (ویکیوم فلاسک) کی دوہری شیشے کی دیواروں کے درمیان موجود خلا حرارت کے نقصان کو کیسے روکتا ہے؟",
                    questionPs = "د ترموس په دوه ډډیزه ښیښه کې خالي تشیال (ویکیوم) څنګه د تودوخې د ضایع کېدو مخه نیسي؟",
                    options = listOf(
                        "Conduction and Convection both require material particles to transfer heat; with no particles in vacuum, neither process can occur",
                        "The vacuum turns heat into cold ice crystals",
                        "The vacuum reflects radio waves away",
                        "The vacuum doubles the gravity inside"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Both conduction (particle-to-particle vibration) and convection (fluid movement) strictly require material particles. Because a vacuum is completely devoid of particles, heat cannot travel across the gap by conduction or convection.",
                    whyExplanationUr = "کنڈکشن اور کنویکشن دونوں کے لیے مادے کے ذرات ضروری ہیں۔ چونکہ خلا میں کوئی ذرات نہیں ہوتے اس لیے نہ تو کنڈکشن ہو سکتی ہے اور نہ ہی کنویکشن، اس لیے حرارت رک جاتی ہے۔",
                    whyExplanationPs = "کانډکشن او کنویکشن دواړه مادي ذرات غواړي ترڅو تودوخه ولېږدوي؛ په تشیال کې ذرات نشته نو دا دواړه پروسې نشي کېدای.",
                    formulaOrStep = "Vacuum = Zero particles ➔ Eliminates Conduction & Convection",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why are the cooling elements (freezer compartments) of refrigerators always installed at the very top rather than the bottom?",
                    questionUr = "ریفریجریٹر کا فریزنگ چیمبر ہمیشہ بالکل اوپر کیوں لگایا جاتا ہے، نیچے کیوں نہیں لگایا جاتا؟",
                    questionPs = "د یخچالو فریزر ولې تل په تر ټولو پورته برخه کې وي، نه په لاندې برخه کې؟",
                    options = listOf(
                        "Cold air contracts and becomes denser, naturally sinking to the bottom and setting up circulating convection currents",
                        "Because cold air is lighter than warm air and floats",
                        "Because gravity only exists in the top half of refrigerators",
                        "To prevent frost from entering the compressor motor"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Cold air has lower kinetic energy, molecules pack closer together, and its density increases. Dense cold air sinks to the bottom, pushing warmer lighter air up to the freezer, creating an efficient continuous convection cooling cycle.",
                    whyExplanationUr = "ٹھنڈی ہوا سکڑ کر وزنی اور کثیف ہو جاتی ہے اور قدرتی طور پر نیچے کی طرف بہتی ہے، جبکہ نیچے کی گرم ہلکی ہوا اوپر جاتی ہے۔ اس کنویکشن کرنٹ سے پورا فریج یکساں ٹھنڈا رہتا ہے۔",
                    whyExplanationPs = "یخه هوا درنه او متراکمه کیږي او لاندې راښکته کیږي، او لاندینۍ ګرمه هوا پورته شړي چې یو کنویکشن جریان جوړ کړي.",
                    formulaOrStep = "Cooled air ➔ Density ↑ ➔ Sinks ➔ Drives convection cooling loop",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Why are solar water heater panels and outdoor car radiators painted dull matte black rather than shiny silver?",
                    questionUr = "سولر واٹر ہیٹر کے پینلز اور گاڑیوں کے ریڈی ایٹرز کو چمکدار چاندی کے بجائے میٹ سیاہ رنگ کیوں کیا جاتا ہے؟",
                    questionPs = "د لمریزې اوبو ګرموونکي پینلونه ولې په تور رنګ رنګیږي نه په سپین ځلېدونکي رنګ؟",
                    options = listOf(
                        "Dull black surfaces are the best absorbers and best emitters of thermal radiation",
                        "Black paint is completely transparent to x-rays",
                        "Black paint turns cold water into steam without heat",
                        "Shiny silver paint rusts within two hours"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Dark, matte surfaces absorb almost 100% of incident infrared thermal radiation without reflecting it away. For radiators, matte black also maximizes the rate at which heat is radiated out to the surroundings.",
                    whyExplanationUr = "سیاہ اور کھردرے پینل سورج کی انفراریڈ شعاعوں کو سب سے زیادہ جذب کرتے ہیں اور ان کو منعکس نہیں ہونے دیتے، جس سے پانی تیزی سے گرم ہوتا ہے۔",
                    whyExplanationPs = "تور رنګ د تودوخې وړانګې په پوره ډول جذبوي او بېرته یې نه منعکس کوي نو اوبه ژر ګرمیږي.",
                    formulaOrStep = "Matte Black = Maximum Absorption Coefficient (α ≈ 1.0)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the primary physical cause of daytime coastal 'Sea Breezes' blowing from the sea towards land?",
                    questionUr = "دن کے وقت ساحل پر سمندر سے خشکی کی طرف چلنے والی ہوا (نسیمِ بحری) کی بنیادی طبعی وجہ کیا ہے؟",
                    questionPs = "د ورځې له خوا د سمندر له لوري وچې ته د باد د لګېدو اصلي فزیکي لامل څه دی؟",
                    options = listOf(
                        "Land has a lower specific heat capacity and heats up faster than water; warm air over land rises, drawing in cooler high-pressure air from the sea",
                        "The moon pulls sea water towards the coast during daytime",
                        "Fish swim rapidly pushing air onto the beaches",
                        "The sun heats water ten times faster than sand"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Land heats up much faster than water due to lower specific heat capacity. The air above land warms, expands, and rises (creating low pressure). Denser cool air over the ocean moves inland to replace it, creating a refreshing sea breeze.",
                    whyExplanationUr = "خشکی پانی کے مقابلے میں سورج سے جلدی گرم ہو جاتی ہے۔ زمین کے اوپر کی ہوا گرم ہو کر اوپر اٹھتی ہے اور سمندر کی طرف سے ٹھنڈی ہوا اس کی جگہ لینے کے لیے ساحل کی طرف چل پڑتی ہے۔",
                    whyExplanationPs = "وچه ځمکه د اوبو په پرتله ژر ګرمیږي. د وچې توده هوا پورته کیږي او د سمندر له مخې یخه هوا د هغې ځای نیسي او باد راوالوځوي.",
                    formulaOrStep = "Day: Land hotter than Sea ➔ Thermal low over land ➔ Sea breeze blows inland",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 11: TECHNOLOGY IN EVERYDAY LIFE (p. 147–158) ───
        Class7ScienceStage(
            id = 11,
            unitNumber = "Unit 11",
            pageRange = "Pages 147–158",
            titleEn = "Technology in Everyday Life",
            titleUr = "روزمرہ زندگی میں ٹیکنالوجی",
            titlePs = "په ورځني ژوند کې ټیکنالوژي",
            themeColor = Color(0xFF059669),
            secondaryColor = Color(0xFF064E3B),
            summaryEn = "Technology applies scientific principles to solve human problems. Simple machines include levers (Class 1: fulcrum in middle like seesaw/scissors; Class 2: load in middle like wheelbarrow; Class 3: effort in middle like tweezers/tongs), pulleys, gears, and hydraulic machines. Pascal's principle (pressure exerted on an enclosed liquid is transmitted equally undiminished in all directions) governs hydraulic car lifts, excavators, and automobile brakes. Sensors and photovoltaic solar cells harness clean power.",
            summaryUr = "ٹیکنالوجی سائنسی اصولوں کو روزمرہ مسائل حل کرنے کے لیے استعمال کرتی ہے۔ سادہ مشینوں میں لیورز (پہلی قسم: فلکرم درمیان میں؛ دوسری قسم: لوڈ درمیان میں؛ تیسری قسم: ایفرٹ درمیان میں)، پلیاں اور ہائیڈرالک سسٹم شامل ہیں۔ پاسکل کا قانون (مائع پر ڈالا گیا دباؤ تمام سمتوں میں یکساں منتقل ہوتا ہے) ہائیڈرالک کار لفٹ اور بریکوں کی بنیاد ہے۔",
            summaryPs = "ساده ماشینونه کارونه اسانوي: لورونه (لومړی، دویم او درېیم ډول)، پلي او هیدرولیک ماشینونه. د پاسکال قانون له مخې په مایع لګېدلی فشار په ټولو لورو یو شان خپریږي او د موټر د پورته کولو او بریکونو کې کارول کیږي.",
            equationsAndLaws = listOf(
                "Mechanical Advantage (MA): MA = Load / Effort = Distance of Effort / Distance of Load",
                "Pascal's Principle: P = F1 / A1 = F2 / A2 (Pressure transmitted equally through incompressible liquid)",
                "Hydraulic Force Multiplication: F2 = F1 × (A2 / A1), where A2 is the large piston area"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Three Classes of Levers",
                    conceptOrLaw = "Fulcrum, Load & Effort Positioning",
                    detailEn = "Class 1: Fulcrum in middle (seesaw, scissors, crowbar); Class 2: Load in middle, giving MA > 1 (wheelbarrow, nutcracker, bottle opener); Class 3: Effort in middle, giving speed/range (tweezers, tongs, human forearm).",
                    detailUr = "پہلی قسم کے لیور میں فلکرم درمیان میں ہوتا ہے (قینچی، سیسا)؛ دوسری قسم میں وزن (لوڈ) درمیان میں ہوتا ہے (وہیل بیرو، سروتہ)؛ تیسری قسم میں کوشش (ایفرٹ) درمیان میں ہوتی ہے (چمٹا، انسانی بازو)۔",
                    detailPs = "لومړی ډول: تکیه ځای په منځ کې وي (قیچي)؛ دویم ډول: بار په منځ کې وي (لاسي ګاډۍ)؛ درېیم ډول: قوه په منځ کې وي (چمتۍ).",
                    cardColor = Color(0xFF047857)
                ),
                Class7ScienceCard(
                    title = "Pascal's Law in Hydraulics",
                    conceptOrLaw = "Pressure Transmission in Liquids",
                    detailEn = "Liquids are virtually incompressible. Pascal's Law states that pressure applied to an enclosed liquid is transmitted equally and undiminished in all directions: P = F_1/A_1 = F_2/A_2. A small effort force on a small piston creates a giant force on a large piston.",
                    detailUr = "پاسکل کا قانون کہتا ہے کہ بند مائع پر ڈالا گیا دباؤ تمام سمتوں میں بلا کمی کے یکساں منتقل ہوتا ہے: P = F1/A1 = F2/A2۔ چھوٹے پسٹن پر تھوڑی سی قوت بڑے پسٹن پر بھاری گاڑی کو اٹھانے والی بڑی قوت پیدا کرتی ہے۔",
                    detailPs = "د پاسکال قانون وايي چې په مایع لګېدلی فشار ټولو لورو ته پوره خپریږي. په کوچني پسټن لږ زور په غټ پسټن غټ موټر پورته کولی شي.",
                    cardColor = Color(0xFF059669)
                ),
                Class7ScienceCard(
                    title = "Hydraulic Brakes & Car Lifts",
                    conceptOrLaw = "Force Multiplication Mechanism",
                    detailEn = "In car brakes, stepping gently on the brake pedal applies force to master cylinder piston with area A1. Hydraulic brake fluid transmits pressure through metal lines to wheel caliper pistons with much larger area A2, clamping brake pads onto spinning discs with immense force.",
                    detailUr = "گاڑی کے بریکوں میں پیڈل دبانے سے ماسٹر سلنڈر پر دباؤ پیدا ہوتا ہے۔ بریک آئل اس دباؤ کو پہیوں کے بڑے سلنڈرز تک پہنچاتا ہے، جس سے کم قوت لگا کر تیز رفتار گاڑی کو فوراً روک دیا جاتا ہے۔",
                    detailPs = "د موټر په بریکونو کې د پښې کم زور د بریک تیلو له لارې څرخونو ته رسیږي او د غټې سطحې له امله لوړه قوه جوړوي چې موټر ودروي.",
                    cardColor = Color(0xFF10B981)
                ),
                Class7ScienceCard(
                    title = "Gears and Pulleys",
                    conceptOrLaw = "Gear Ratios and Direction",
                    detailEn = "Gears transfer rotational motion and torque. Intermeshed gears rotate in opposite directions. A small driver gear rotating a larger driven gear increases torque (force) but decreases speed (used in bicycles climbing hills). Pulleys change the direction of lifting forces.",
                    detailUr = "گراریاں (گیئرز) گھماؤ کی حرکت کو منتقل کرتے ہیں۔ آپس میں جڑے گیئرز مخالف سمتوں میں گھومتے ہیں۔ چھوٹی گراری جب بڑی گراری کو گھماتی ہے تو طاقت بڑھ جاتی ہے (جیسے چڑھائی پر سائیکل کا گیئر)۔",
                    detailPs = "ګیرونه د څرخېدو حرکت لېږدوي او مخالف لوري ته تاویږي. کوچنی ګیر چې غټ ګیر تاو کړي، زور زیاتوي چې په غره د بایسکل ختل اسانوي.",
                    cardColor = Color(0xFF34D399)
                ),
                Class7ScienceCard(
                    title = "Solar Photovoltaic Cells",
                    conceptOrLaw = "Sunlight Directly to Electricity",
                    detailEn = "Photovoltaic (PV) cells are made of semiconductor silicon. When photons of sunlight strike the silicon wafer, they dislodge valence electrons, generating a direct electric current (DC) with zero greenhouse gas emissions.",
                    detailUr = "سولر سیلز سلیکان کے سیمی کنڈکٹرز سے بنے ہوتے ہیں۔ جب سورج کی روشنی کے فوٹانز ان پر پڑتے ہیں تو وہ الیکٹرانوں کو حرکت میں لا کر براہ راست ڈی سی بجلی پیدا کرتے ہیں جس سے کوئی آلودگی پیدا نہیں ہوتی۔",
                    detailPs = "لمریزې هندارې له سیلیکان څخه جوړې دي. د لمر رڼا د الکترونونو د خوځښت لامل ګرځي او مستقیم برېښنا تولیدوي بې له کومې ککړتیا.",
                    cardColor = Color(0xFF064E3B)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "In a hydraulic car lift, small piston area A1 = 2 cm² and large piston area A2 = 100 cm². If a mechanic pushes with force F1 = 50 N on the small piston, what lifting force F2 is generated on the large piston?",
                    questionUr = "ایک ہائیڈرالک کار لفٹ میں چھوٹے پسٹن کا رقبہ 2 cm² اور بڑے پسٹن کا رقبہ 100 cm² ہے۔ اگر مکینک 50 N کی قوت لگائے تو گاڑی اٹھانے والی کتنی قوت پیدا ہوگی؟",
                    questionPs = "په یوه هیدرولیک موټر پورته کوونکي کې د واړه پسټن مساحت ۲ او د غټ ۱۰۰ دی. که ۵۰ نیوټنه زور پر واړه پسټن ووهل شي، غټ پسټن څومره پورته کوونکی زور پیدا کوي؟",
                    options = listOf(
                        "2,500 N (F2 = F1 × (A2 / A1) = 50 × (100 / 2) = 50 × 50 = 2,500 N)",
                        "50 N",
                        "100 N",
                        "5,000 N"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "According to Pascal's Principle, pressure is identical throughout the hydraulic fluid: P = F_1 / A_1 = 50 / 2 = 25 N/cm². The force on the large piston is F_2 = P \times A_2 = 25 \times 100 = 2,500 N. The force has been multiplied 50 times!",
                    whyExplanationUr = "پاسکل کے قانون کے مطابق پریشر یکساں رہتا ہے: P = 50 / 2 = 25 N/cm²۔ بڑے پسٹن پر قوت F2 = P × A2 = 25 × 100 = 2,500 N ہو جائے گی یعنی قوت 50 گنا بڑھ جاتی ہے!",
                    whyExplanationPs = "د پاسکال قانون له مخې فشار ۲۵ کیږي او ۲۵ × ۱۰۰ = ۲۵۰۰ نیوټنه پورته کوونکی زور جوړیږي.",
                    formulaOrStep = "F2 = F1 × (A2 / A1) = 50 × (100 / 2) = 2,500 N",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "A wheelbarrow carries a heavy load of bricks in its center basin, between the front wheel and the person lifting the handles. Which class of lever is it?",
                    questionUr = "ایک ریڑھی (وہیل بیرو) اینٹوں کا وزن اپنے درمیان میں اٹھاتی ہے، جو اگلے پہیے اور ہینڈل کے بیچ ہوتا ہے۔ یہ کس قسم کا لیور ہے؟",
                    questionPs = "لاس ګاډۍ (ویل بیرو) دروند بار په منځ کې وړي چې د مخکني څرخ او لاسونو ترمنځ دی. دا د لیور کوم ډول دی؟",
                    options = listOf(
                        "Class 2 Lever (Load is located in the middle between Fulcrum and Effort)",
                        "Class 1 Lever (Fulcrum in middle)",
                        "Class 3 Lever (Effort in middle)",
                        "It is not a lever, but a pure wedge"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In a Class 2 lever, the load is always positioned between the fulcrum (pivot wheel at front) and the effort (lifted handles). This ensures the effort arm is always longer than the load arm, providing a mechanical advantage greater than 1.",
                    whyExplanationUr = "دوسری قسم کے لیور میں وزن (لوڈ) ہمیشہ فلکرم (اگلا پہیہ) اور ایفرٹ (ہینڈل) کے درمیان ہوتا ہے۔ اس سے کم قوت لگا کر زیادہ وزن اٹھایا جا سکتا ہے (MA > 1)۔",
                    whyExplanationPs = "په دویم ډول لیور کې بار تل د تکيې ځای (څرخ) او قوې (لاسونو) په منځ کې وي او د بار وړل اسانوي.",
                    formulaOrStep = "Fulcrum (Wheel) ➔ Load (Bricks in middle) ➔ Effort (Handles) = Class 2",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why can hydraulic machines amplify force using liquid oil, but cannot operate using air or gas?",
                    questionUr = "ہائیڈرالک مشینیں تیل کے مائع سے قوت کو بڑھا سکتی ہیں لیکن ہوا یا گیس سے کام کیوں نہیں کر سکتیں؟",
                    questionPs = "هیدرولیک ماشینونه ولې په مایع تیلو کار کوي خو په هوا یا ګاز کار نشي کولی؟",
                    options = listOf(
                        "Liquids are virtually incompressible and transmit pressure instantaneously, whereas gases compress under pressure, wasting input force",
                        "Air contains no molecules to push against pistons",
                        "Oil is radioactive and produces nuclear energy",
                        "Gas turns into solid metal under low pressure"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Liquid molecules are already tightly packed and in contact, so liquids cannot be compressed into smaller volume—any applied force instantly creates fluid pressure. Gases have vast empty spaces between molecules; applying force merely compresses the gas without moving the distant piston.",
                    whyExplanationUr = "مائعات نا قابلِ دباؤ (ان کمپریسیبل) ہوتے ہیں، اس لیے ڈالا گیا دباؤ فوراً دوسری طرف پہنچ جاتا ہے۔ اس کے برعکس گیسیں دب جاتی ہیں اور ان کا حجم سکڑ جاتا ہے جس سے قوت ضائع ہو جاتی ہے۔",
                    whyExplanationPs = "مایعات نه متراکم کیږي او فشار سمدستي لېږدوي، خو ګازونه تر فشار لاندې ټول کیږي او قوه ضایع کوي.",
                    formulaOrStep = "Incompressible fluid ➔ Direct pressure transmission without volume loss",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "When a bicyclist shifts gears so that the chain connects a smaller pedal gear to a larger rear wheel gear, what effect does this produce?",
                    questionUr = "جب سائیکل سوار گیئر بدل کر پیڈل کی چھوٹی گراری کو پچھلے پہیے کی بڑی گراری سے جوڑتا ہے تو کیا اثر ہوتا ہے؟",
                    questionPs = "کله چې یو بایسکل ځغلونکی زنځیر د پښې له کوچني ګیر څخه د شاته څرخ غټ ګیر ته واړوي، څه اغېز کوي؟",
                    options = listOf(
                        "It increases torque and mechanical advantage, making it vastly easier to pedal uphill",
                        "It makes the bicycle travel at 200 km/h with zero effort",
                        "It locks the wheels so the bike cannot move",
                        "It reverses the rotation of the front handlebars"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "A smaller driver gear turning a larger driven gear increases torque (turning force) at the rear wheel at the expense of rotational speed. This mechanical advantage allows the rider to climb steep hills with modest pedal force.",
                    whyExplanationUr = "پچھلے پہیے کی بڑی گراری پر ٹارک (گھماؤ کی قوت) بڑھ جاتی ہے جس سے چڑھائی پر سائیکل چلانا بہت آسان ہو جاتا ہے، اگرچہ رفتار قدرے کم ہو جاتی ہے۔",
                    whyExplanationPs = "دا چاره د څرخ تاوېدو قوه (تورک) زیاتوي او په لوړه د بایسکل ختل خورا اسانوي.",
                    formulaOrStep = "Gear Ratio > 1 ➔ Multiplies torque ➔ Easy uphill climbing",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the key functional advantage of a pair of medical tweezers (Class 3 lever) even though its Mechanical Advantage is less than 1?",
                    questionUr = "طبی چمٹی (ٹویزرز - تیسری قسم کا لیور) کا اہم فائدہ کیا ہے حالانکہ اس کا مکینیکل ایڈوانٹیج 1 سے کم ہوتا ہے؟",
                    questionPs = "د درملنې چمتۍ (دریم ډول لیور) څه ګټه لري که څه هم میخانیکي ګټه یې له ۱ څخه کمه ده؟",
                    options = listOf(
                        "It provides precision, speed, and delicate control to grasp microscopic splinters without crushing them",
                        "It multiplies input force by one million times",
                        "It cuts through solid steel bars",
                        "It charges smartphone batteries wirelessly"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In a Class 3 lever, the effort is between fulcrum and load, meaning the load arm is longer than the effort arm (MA < 1). While it doesn't magnify force, it amplifies distance, speed, and exquisite precision for delicate manipulation.",
                    whyExplanationUr = "تیسری قسم کے لیور میں اگرچہ قوت زیادہ نہیں لگتی لیکن یہ انتہائی باریک، نازک اور درست کام کرنے میں مدد دیتی ہے، تاکہ نازک چیزیں ٹوٹے بغیر پکڑی جا سکیں۔",
                    whyExplanationPs = "دا ډول لیور زور نه زیاتوي خو ډېر دقت او کنټرول ورکوي ترڅو باریک شیان بې له ماتېدو ونیسي.",
                    formulaOrStep = "Class 3 Lever (Effort in middle) ➔ Distance & Precision Multiplier",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 12: EARTH AND SPACE (p. 159–172) ───
        Class7ScienceStage(
            id = 12,
            unitNumber = "Unit 12",
            pageRange = "Pages 159–172",
            titleEn = "Earth and Space",
            titleUr = "زمین اور خلا",
            titlePs = "ځمکه او تشیال",
            themeColor = Color(0xFF4338CA),
            secondaryColor = Color(0xFF1E1B4B),
            summaryEn = "Earth possesses four concentric layers: the solid Crust (5–70 km), the semi-molten Mantle (convection currents drive tectonic plate movement), the liquid Outer Core (generates geomagnetic field), and the solid iron-nickel Inner Core (up to 5000°C under immense pressure). Plate boundaries cause earthquakes (measured on Richter scale from focus/epicenter), volcanoes, and fold mountains. Solar eclipses occur when the Moon blocks the Sun; lunar eclipses occur when Earth casts its shadow on the Moon. Space telescopes (Hubble, JWST) and artificial satellites expand our cosmic frontier.",
            summaryUr = "زمین چار بنیادی تہوں پر مشتمل ہے: بیرونی ٹھوس کرسٹ (چھلکا)، مینٹل (جس کے کنویکشن کرنٹ پلیٹوں کو حرکت دیتے ہیں)، مائع بیرونی کور (جو مقناطیسی فیلڈ بناتی ہے)، اور ٹھوس اندرونی کور (لوہا اور نکل، 5000°C درجہ حرارت)۔ ٹیکٹونک پلیٹوں کی حرکت سے زلزلے اور آتش فشاں بنتے ہیں۔ سورج گرہن اس وقت ہوتا ہے جب چاند سورج کے سامنے آ جائے، اور چاند گرہن اس وقت جب زمین کا سایہ چاند پر پڑے۔",
            summaryPs = "ځمکه څلور طبقې لري: بهرنی پوړ (کرسټ)، مینټل، بهرنی مایع کور (چې مقناطیسي ساحه جوړوي)، او داخلي جامد کور (اوسپنه او نکل). د تکتونیکي تختو ټکر زلزلې او غرونه جوړوي. کله چې سپوږمۍ د لمر مخه ونیسي د لمر تندره او کله چې د ځمکې سیوری پر سپوږمۍ ولګیږي د سپوږمۍ تندره کیږي.",
            equationsAndLaws = listOf(
                "Internal Structure of Earth: Crust (Solid, 5–70km) ➔ Mantle (Semi-molten, 2900km) ➔ Outer Core (Liquid Fe/Ni) ➔ Inner Core (Solid Fe/Ni, 5000°C)",
                "Solar Eclipse Alignment: Sun ➔ Moon ➔ Earth (Moon casts shadow on Earth)",
                "Lunar Eclipse Alignment: Sun ➔ Earth ➔ Moon (Earth casts shadow on full Moon)"
            ),
            cards = listOf(
                Class7ScienceCard(
                    title = "Four Concentric Layers of Earth",
                    conceptOrLaw = "Crust, Mantle, Outer Core & Inner Core",
                    detailEn = "Crust: Thin solid outer shell (continental 35–70 km, oceanic 5–10 km); Mantle: Dense semi-molten rock down to 2900 km; Outer Core: Liquid molten iron and nickel generating geomagnetic shield; Inner Core: Solid iron-nickel sphere at 5000°C due to colossal pressure.",
                    detailUr = "کرسٹ: بیرونی ٹھوس پتلی تہہ (5 سے 70 کلومیٹر)؛ مینٹل: پگھلی ہوئی چٹانوں کی تہہ (2900 کلومیٹر تک)؛ بیرونی کور: پگھلے ہوئے لوہے اور نکل کی مائع تہہ جو مقناطیسی فیلڈ بناتی ہے؛ اندرونی کور: شدید دباؤ کی وجہ سے ٹھوس لوہے کا گولہ جس کا درجہ حرارت 5000°C ہے۔",
                    detailPs = "کرسټ: د ځمکې نری جامد پوټکی؛ مینټل: نیم ویلې شوې ډبرې؛ بهرنی کور: ویلې شوې اوسپنه چې مقناطیسي پوښ جوړوي؛ او داخلي کور: تر لوړ فشار لاندې جامده اوسپنه ده.",
                    cardColor = Color(0xFF3730A3)
                ),
                Class7ScienceCard(
                    title = "Plate Tectonics & Earthquakes",
                    conceptOrLaw = "Focus, Epicenter & Richter Scale",
                    detailEn = "The crust is broken into tectonic plates that glide over mantle convection currents. Friction causes stress buildup until rock fractures at the 'Focus' (subterranean origin), radiating seismic waves. The point directly above the focus on Earth's surface is the 'Epicenter'.",
                    detailUr = "زمین کا چھلکا ٹیکٹونک پلیٹوں میں بٹا ہوا ہے جو مینٹل کے اوپر تیرتی ہیں۔ پلیٹوں کے رگڑنے سے زمین کے اندر 'فوکس' کے مقام پر توانائی خارج ہوتی ہے جو زلزلے بناتی ہے۔ فوکس کے بالکل اوپر زمین کی سطح پر موجود نقطہ 'ایپی سینٹر' کہلاتا ہے۔",
                    detailPs = "د ځمکې پوټکی پر تکتونیکي تختو وېشل شوی دی. په ځمکه کې د زلزلې اصلي ځای فوکس او د هغې سر ته پر ځمکه مخامخ ځای ایپی سنټر بلل کیږي.",
                    cardColor = Color(0xFF4338CA)
                ),
                Class7ScienceCard(
                    title = "Solar vs Lunar Eclipses",
                    conceptOrLaw = "Orbital Shadow Alignments",
                    detailEn = "Solar Eclipse: Moon passes directly between Sun and Earth, casting its shadow (umbra and penumbra) on Earth during daytime. Lunar Eclipse: Earth passes directly between Sun and Moon, casting Earth's giant shadow on the full Moon at night, turning it deep coppery red.",
                    detailUr = "سورج گرہن: چاند سورج اور زمین کے درمیان آ جاتا ہے اور دن کے وقت زمین پر سایہ ڈالتا ہے۔ چاند گرہن: زمین سورج اور چاند کے درمیان آ جاتی ہے اور رات کو چاند پر اپنا سایہ ڈالتی ہے جس سے چاند سرخ تانبے جیسا نظر آتا ہے۔",
                    detailPs = "د لمر تندره: سپوږمۍ د لمر او ځمکې منځ ته راځي او پر ځمکه سیوری کوي. د سپوږمۍ تندره: ځمکه د لمر او سپوږمۍ منځ ته راځي او پر سپوږمۍ سیوری غوړوي.",
                    cardColor = Color(0xFF4F46E5)
                ),
                Class7ScienceCard(
                    title = "Earth's Magnetic Shield",
                    conceptOrLaw = "Dynamo Effect in Outer Core",
                    detailEn = "Circulating convection currents of molten iron in the liquid outer core act as a planetary geodynamo, generating Earth's powerful magnetic field. This magnetosphere deflects harmful cosmic rays and solar wind flares, protecting living organisms on Earth.",
                    detailUr = "بیرونی کور میں پگھلے ہوئے لوہے کی گردش زمین کو ایک دیوہیکل مقناطیس بنا دیتی ہے۔ یہ مقناطیسی ڈھال سورج سے آنے والی خطرناک تابکاری اور شمسی ہواؤں کو زمین سے دور موڑ کر زندگی کو محفوظ رکھتی ہے۔",
                    detailPs = "د ځمکې په مایع کور کې د اوسپنې حرکت مقناطیسي ساحه جوړوي چې ځمکه له خطرناکو لمریزو وړانګو او بادونو څخه ژغوري.",
                    cardColor = Color(0xFF6366F1)
                ),
                Class7ScienceCard(
                    title = "Space Telescopes & Satellites",
                    conceptOrLaw = "Hubble, JWST & Geostationary Orbits",
                    detailEn = "Space telescopes (Hubble, James Webb) orbit above Earth's atmospheric distortion and moisture, observing distant galaxies in ultraviolet, visible, and infrared. Geostationary satellites orbit at 35,786 km matching Earth's rotation for TV, GPS, and weather forecasting.",
                    detailUr = "خلائی دوربینیں (ہبل، جیمز ویب) فضا کی آلودگی اور بادلوں سے اوپر خلا میں گردش کر کے اربوں نوری سال دور کی کہکشاؤں کی واضح تصاویر لیتی ہیں۔ مصنوعی سیارے موسم کی پیشن گوئی اور ٹیلی ویژن نشریات کے لیے کام آتے ہیں۔",
                    detailPs = "فضايي دوربینونه لکه جیمز ویب له اتوموسفیر پورته ګرځي او روښانه کهکشانونه ګوري. مصنوعي سپوږمکۍ د هوا اټکل او مواصلاتو لپاره کار کوي.",
                    cardColor = Color(0xFF1E1B4B)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Why is Earth's Inner Core solid iron-nickel, even though its temperature reaches an extraordinary 5000°C (hotter than molten lava)?",
                    questionUr = "زمین کا اندرونی کور ٹھوس حالت میں کیوں ہے حالانکہ اس کا درجہ حرارت 5000°C (لاوے سے بھی زیادہ گرم) ہے؟",
                    questionPs = "د ځمکې داخلي کور ولې جامد دی سره له دې چې تودوخه یې ۵۰۰۰ درجو ته رسیږي؟",
                    options = listOf(
                        "The colossal gravitational pressure of the entire overlying planet forces iron atoms so close together that they cannot melt into liquid",
                        "Because the core is made of frozen water ice",
                        "Because heat cannot exist inside the center of Earth",
                        "Because the inner core has zero gravity"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Melting requires atoms to move apart into liquid disorder. Deep within Earth at 6,370 km depth, the immense gravitational overburden pressure (3.6 million atmospheres) squeezes iron-nickel atoms into a rigid solid crystalline lattice despite the scorching 5000°C heat.",
                    whyExplanationUr = "پگھلنے کے لیے ایٹموں کا پھیلنا ضروری ہے۔ زمین کے مرکز میں اوپر کی تمام تہوں کا اتنا زبردست دباؤ ہوتا ہے کہ ایٹم پھیل نہیں سکتے اور شدید گرمی کے باوجود ٹھوس حالت میں جڑے رہتے ہیں۔",
                    whyExplanationPs = "د ټولې ځمکې د وزن او جاذبې دومره لوړ فشار پر هسته پروت دی چې اتومونه تیتېدو ته نه پریږدي نو له همدې امله جامد پاتې کیږي.",
                    formulaOrStep = "Tremendous pressure (3.6 million atm) raises melting point far above 5000°C ➔ Solid state",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What astronomical alignment of celestial bodies causes a 'Total Solar Eclipse' on Earth?",
                    questionUr = "آسمانی اجرام کی کون سی ترتیب زمین پر مکمل سورج گرہن کا سبب بنتی ہے؟",
                    questionPs = "د کومو اسماني اجسامو برابروالی د لمر د بشپړې تندرې لامل ګرځي؟",
                    options = listOf(
                        "The Moon passes directly between the Sun and Earth, casting its dark shadow (umbra) onto Earth",
                        "The Earth passes directly between the Sun and the Moon",
                        "The Sun passes between the Moon and Mars",
                        "Jupiter covers the entire Sun"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "A solar eclipse occurs when the Moon orbits directly between the Sun and Earth in a straight syzygy line. The Moon blocks sunlight, casting its shadow cone (umbra) onto a narrow path across Earth's surface in broad daylight.",
                    whyExplanationUr = "سورج گرہن اس وقت ہوتا ہے جب چاند بالکل سورج اور زمین کے درمیان آ جاتا ہے۔ چاند سورج کی روشنی کو روک کر دن کے وقت زمین پر اپنا گہرا سایہ ڈالتا ہے۔",
                    whyExplanationPs = "کله چې سپوږمۍ نېغه د لمر او ځمکې منځ ته راشي او د لمر رڼا بنده کړي، پر ځمکه سیوری غوړوي.",
                    formulaOrStep = "Sun ➔ Moon (in middle) ➔ Earth = Solar Eclipse",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "During an earthquake, what is the exact difference between the 'Focus' and the 'Epicenter'?",
                    questionUr = "زلزلے کے دوران 'فوکس' اور 'ایپی سینٹر' کے درمیان کیا فرق ہوتا ہے؟",
                    questionPs = "د زلزلې پر مهال د 'فوکس' او 'ایپی سنټر' ترمنځ څه بنسټیز توپیر دی؟",
                    options = listOf(
                        "The Focus is the deep subterranean rupture point inside the crust; the Epicenter is the point on Earth's surface directly vertically above the focus",
                        "The Epicenter is inside the Moon, and Focus is on Earth",
                        "The Focus is the measurement tool; Epicenter is the name of the fault",
                        "There is no difference; they are identical locations"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The focus (hypocenter) is the underground geological fault origin where mechanical strain energy is released. The epicenter is the geographic location on the surface of the Earth located directly vertically perpendicular above the focus, usually suffering the most severe shaking.",
                    whyExplanationUr = "فوکس زمین کے اندر وہ گہرا مقام ہے جہاں چٹان ٹوٹنے سے زلزلہ جنم لیتا ہے۔ ایپی سینٹر زمین کی سطح پر وہ نقطہ ہے جو فوکس کے بالکل سیدھ میں اوپر واقع ہوتا ہے اور سب سے زیادہ جھٹکے محسوس کرتا ہے۔",
                    whyExplanationPs = "فوکس د ځمکې په تل کې د زلزلې اصلي چاودېدونکی ټکی دی؛ او ایپی سنټر پر ځمکه د هغې مخامخ پورته برخه ده چې تر ټولو ډېر لړزیږي.",
                    formulaOrStep = "Focus = Subterranean origin; Epicenter = Surface point directly above Focus",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why do space telescopes like the James Webb Space Telescope (JWST) produce vastly clearer images than ground-based observatory telescopes on Earth?",
                    questionUr = "جیمز ویب جیسے خلائی دوربینیں زمین پر نصب بڑی دوربینوں کے مقابلے میں کہیں زیادہ شفاف اور واضح تصاویر کیوں لیتی ہیں؟",
                    questionPs = "د جیمز ویب په څېر فضايي دوربینونه ولې پر ځمکه د ولاړو لویو دوربینونو پرتله ډېر روښانه انځورونه اخلي؟",
                    options = listOf(
                        "Space telescopes orbit outside Earth's atmosphere, completely avoiding atmospheric light distortion, air turbulence, and clouds",
                        "Space telescopes are made of pure gold mirrors that reflect sound",
                        "Ground telescopes are only allowed to operate during rain",
                        "Earth's gravity prevents light from reaching ground lenses"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Earth's atmosphere blurs starlight through atmospheric turbulence (twinkling), and atmospheric moisture and greenhouse gases absorb infrared wavelengths. Orbiting in the vacuum of deep space provides distortion-free access to all electromagnetic wavelengths.",
                    whyExplanationUr = "زمین کا ماحول اور ہوائی لہریں ستاروں کی روشنی کو دھندلا کر دیتی ہیں اور بادل و گیسیں انفراریڈ روشنی کو روکتی ہیں۔ خلا میں موجود دوربینیں ماحول کی رکاوٹ اور دھندلاہٹ سے بالکل آزاد ہو کر واضح تصویریں لیتی ہیں۔",
                    whyExplanationPs = "ځکه د ځمکې اتوموسفیر، دوړې او هوايي څپې د ستورو رڼا کږوي. په تشیال کې د هوا او ورېځو نه شتون انځورونه بې حده روښانه کوي.",
                    formulaOrStep = "Vacuum of Space ➔ Zero atmospheric turbulence & absorption ➔ Crystal clear diffraction-limited imaging",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which layer of the Earth is directly responsible for generating Earth's planetary magnetic field (which deflects dangerous solar radiation)?",
                    questionUr = "زمین کی کون سی تہہ براہ راست زمین کے مقناطیسی فیلڈ کو پیدا کرنے کی ذمہ دار ہے (جو خطرناک شمسی تابکاری کو موڑتی ہے)؟",
                    questionPs = "د ځمکې کومه طبقه د ځمکې د مقناطیسي ساحې د جوړولو اصلي لامل ده؟",
                    options = listOf(
                        "The liquid Outer Core, where swirling convection currents of molten iron and nickel act as a planetary dynamo",
                        "The thin brittle continental Crust",
                        "The solid Inner Core made of diamond crystals",
                        "The outer gaseous atmosphere"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Earth's magnetic field is generated by the Geodynamo effect: electrical currents produced by the convective churning of molten conductive iron and nickel in the liquid outer core, coupled with Earth's planetary rotation (Coriolis effect).",
                    whyExplanationUr = "زمین کی مقناطیسی فیلڈ مائع بیرونی کور میں پگھلے ہوئے لوہے اور نکل کی گردش اور کنویکشن کرنٹ سے پیدا ہوتی ہے، جو ایک جنریٹر (جیو ڈائنمو) کی طرح کام کرتی ہے۔",
                    whyExplanationPs = "د ځمکې بهرنی مایع کور چې ویلې شوې اوسپنه لري، د څرخېدو له امله د جنراتور په څېر مقناطیسي ساحه تولیدوي.",
                    formulaOrStep = "Liquid Outer Core + Convection + Coriolis rotation ➔ Planetary Geodynamo ➔ Geomagnetic Shield",
                    difficulty = 2
                )
            )
        )
    )
}
