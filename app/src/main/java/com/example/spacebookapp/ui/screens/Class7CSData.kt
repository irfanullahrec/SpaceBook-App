package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

data class Class7CSCard(
    val title: String,
    val conceptOrCommand: String,
    val detailEn: String,
    val detailUr: String,
    val detailPs: String,
    val cardColor: Color
)

data class Class7CSStage(
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
    val keyTechConcepts: List<String>,
    val cards: List<Class7CSCard>,
    val quizzes: List<Class7QuizQuestion>
)

object Class7CSRepository {
    val stages: List<Class7CSStage> = listOf(
        // ─── UNIT 1: ICT FUNDAMENTALS (p. 1–18) ───
        Class7CSStage(
            id = 1,
            unitNumber = "Unit 1",
            pageRange = "Pages 1–18",
            titleEn = "ICT Fundamentals & Emerging Technologies",
            titleUr = "آئی سی ٹی کے بنیادی اصول اور ابھرتی ہوئی ٹیکنالوجیز",
            titlePs = "د ICT بنسټیز اصول او نوې راټوکېدونکې ټکنالوژي",
            themeColor = Color(0xFF0284C7),
            secondaryColor = Color(0xFF0C4A6E),
            summaryEn = "Explores emerging technologies (Artificial Intelligence, Biometrics, Robotics, Computer-Assisted Translation, 3D & Holographic Imaging, Virtual Reality, Augmented Reality, Self-Driving Cars, 3D Printing, Cloud Storage, and Open-Source Software), system unit architecture (Motherboard, CPU with ALU and Control Unit, volatile RAM vs permanent ROM, memory units TB > GB > MB > KB), and computer networking components (Servers, Clients, NIC, Routers, Transmission Media).",
            summaryUr = "یہ یونٹ جدید ٹیکنالوجیز (مصنوعی ذہانت، بائیو میٹرکس، روبوٹکس، 3D اور ہولوگرافک امیجنگ، ورچوئل ریئلٹی، خودکار کاریں، کلاؤڈ اسٹوریج اور اوپن سورس سافٹ ویئر)، سسٹم یونٹ کے اجزاء (مدر بورڈ، سی پی یو معہ کنٹرول یونٹ اور اے ایل یو، غیر مستقل ریم اور مستقل روم، میموری پیمائش TB > GB > MB > KB) اور کمپیوٹر نیٹ ورک کے بنیادی اجزاء کا احاطہ کرتا ہے۔",
            summaryPs = "دا څپرکی د نوې راټوکېدونکې ټکنالوژۍ (مصنوعي ذکاوت، بایومیټریکس، روبوټکس، ۳D انځورونه، مجازي حقیقت VR، کلاوډ سټوریج)، د کمپیوټر د سیسټم یونټ برخې (مدر بورډ، CPU چې ALU او CU لري، موقتي RAM او دایمي ROM)، او د کمپیوټر شبکې اساسي وسایل تشریح کوي.",
            keyTechConcepts = listOf(
                "System Unit Components: Motherboard, CPU (Control Unit + ALU), Power Supply, RAM (Volatile), ROM (Non-volatile BIOS)",
                "Memory Measurement Order: 1 TB = 1024 GB, 1 GB = 1024 MB, 1 MB = 1024 KB, 1 KB = 1024 Bytes (Order: TB > GB > MB > KB)",
                "Emerging Tech: AI simulates human intelligence; VR immerses user in 3D simulated world; 3D Printing creates physical objects layer-by-layer; Cloud Storage stores data remotely via Internet",
                "Computer Network: Server (central resource provider), Client (requesting computer), NIC (Network Interface Card), Router (routes data packets)"
            ),
            cards = listOf(
                Class7CSCard(
                    title = "System Unit & Central Processor (CPU)",
                    conceptOrCommand = "CPU = Control Unit (CU) + Arithmetic Logic Unit (ALU)",
                    detailEn = "The System Unit houses motherboard, power supply, RAM, ROM, and CPU. The CPU executes instructions measured in Hertz (Hz). Control Unit (CU) directs data flow and coordinates hardware activities, while Arithmetic Logic Unit (ALU) carries out all arithmetic operations (+, -, *, /) and logical comparisons.",
                    detailUr = "سسٹم یونٹ مدر بورڈ، پاور سپلائی، ریم، روم اور سی پی یو پر مشتمل ہوتا ہے۔ سی پی یو کی رفتار ہرٹز (Hz) میں ماپی جاتی ہے۔ کنٹرول یونٹ (CU) ڈیٹا کے بہاؤ اور تمام سرگرمیوں کو منظم کرتا ہے جبکہ ارتھمیٹک لاجک یونٹ (ALU) حسابی اور منطقی موازنہ کرتا ہے۔",
                    detailPs = "سیسټم یونټ مدر بورډ، برېښنا رسوونکی، RAM، ROM او CPU لري. د CPU رفتار په هرټز (Hz) اندازه کېږي. کنټرول یونټ (CU) د معلوماتو جریان اداره کوي او ALU ټول ریاضیکي او منطقي عملیات ترسره کوي.",
                    cardColor = Color(0xFF0284C7)
                ),
                Class7CSCard(
                    title = "Memory Architecture: RAM vs ROM",
                    conceptOrCommand = "RAM is Volatile (Read/Write) | ROM is Non-Volatile (Read-Only)",
                    detailEn = "Random Access Memory (RAM) is high-speed temporary/volatile memory where the operating system and running programs reside; contents are erased when power is lost. Read-Only Memory (ROM) is permanent and holds startup firmware (BIOS) which cannot be modified during normal operation.",
                    detailUr = "ریم (RAM) ایک عارضی (Volatile) میموری ہے جس میں چلنے والے پروگرام لوڈ ہوتے ہیں؛ بجلی بند ہونے پر اس کا تمام مواد ختم ہو جاتا ہے۔ روم (ROM) ایک مستقل میموری ہے جس میں کمپیوٹر سٹارٹ اپ بائیوس محفوظ ہوتا ہے اور یہ تبدیل نہیں ہوتی۔",
                    detailPs = "ریم (RAM) یوه لنډمهالې یا موقتي حافظه ده چې کله کمپیوټر بند شي مواد یې له منځه ځي. روم (ROM) یوه تلپاتې حافظه ده چې د کمپیوټر د پیل لارښوونې پکې ثبت وي او نه پاکېږي.",
                    cardColor = Color(0xFF0369A1)
                ),
                Class7CSCard(
                    title = "Memory Measurement Hierarchy",
                    conceptOrCommand = "TB > GB > MB > KB > Byte > Bit",
                    detailEn = "A bit is a single binary digit (0 or 1). 8 bits form 1 Byte. 1024 Bytes = 1 Kilobyte (KB); 1024 KB = 1 Megabyte (MB); 1024 MB = 1 Gigabyte (GB); 1024 GB = 1 Terabyte (TB). Therefore, the correct descending capacity hierarchy is TB > GB > MB > KB.",
                    detailUr = "کمپیوٹر میموری کا بنیادی یونٹ بٹ (0 یا 1) ہے۔ 8 بٹس مل کر 1 بائٹ بناتے ہیں۔ 1024 بائٹس = 1 کلو بائٹ (KB)؛ 1024 کے بی = 1 میگا بائٹ (MB)؛ 1024 ایم بی = 1 گیگا بائٹ (GB)؛ 1024 جی بی = 1 ٹیرا بائٹ (TB)۔ نزولی ترتیب TB > GB > MB > KB ہے۔",
                    detailPs = "یو بټ (۰ یا ۱) دی او ۸ بټه ۱ بایټ جوړوي. ۱۰۲۴ بایټه = ۱ کیلو بایټ؛ ۱۰۲۴ KB = ۱ میګا بایټ؛ ۱۰۲۴ MB = ۱ ګیګا بایټ؛ او ۱۰۲۴ GB = ۱ ټیرا بایټ. سمه نزولي ترتیب TB > GB > MB > KB دی.",
                    cardColor = Color(0xFF0EA5E9)
                ),
                Class7CSCard(
                    title = "Emerging Tech & Computer Networks",
                    conceptOrCommand = "Cloud, AI, VR & Network Topology",
                    detailEn = "Emerging technologies reshape society: Cloud Storage delivers remote data access via servers; Virtual Reality (VR) immerses users in sensory 3D environments; 3D printing manufactures solid objects from digital blueprints. A computer network links devices via transmission media, routers, and Network Interface Cards (NIC).",
                    detailUr = "کلاؤڈ اسٹوریج انٹرنیٹ کے ذریعے ریموٹ سرورز پر ڈیٹا محفوظ کرتا ہے۔ ورچوئل ریئلٹی (VR) صارف کو مکمل طور پر تین جہتی ماحول میں لے جاتی ہے۔ کمپیوٹر نیٹ ورک میں سرور مرکزی کمپیوٹر ہوتا ہے اور راؤٹر و این آئی سی کارڈ کے ذریعے معلومات کی منتقلی ہوتی ہے۔",
                    detailPs = "کلاوډ سټوریج د انټرنیټ له لارې په لیرې پرتو سرورونو کې ډاټا ساتي. مجازي حقیقت کاروونکی په یوه درې بعدي چاپیریال کې داخلوي. کمپیوټر شبکه وسایل د روټر، کیبلونو او NIC کارت له لارې سره نښلوي.",
                    cardColor = Color(0xFF0284C7)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Which of the following sets accurately lists the primary electronic components located inside a computer's System Unit?",
                    questionUr = "درج ذیل میں سے کون سا مجموعہ درست طور پر کمپیوٹر کے سسٹم یونٹ کے اندرونی برقی اجزاء کو ظاہر کرتا ہے؟",
                    questionPs = "په لاندې کې کومه ډله د کمپیوټر د سیسټم یونټ دننه اصلي برېښنایي برخې ښيي؟",
                    options = listOf(
                        "Motherboard, Power Supply, RAM, ROM, CPU",
                        "Keyboard, Monitor, Touchpad, CD",
                        "Printer, Scanner, Joystick, HDD",
                        "Display Screen, External Speaker, Multimedia Projector"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "According to KPK Textbook Chapter 1, the System Unit is the casing that houses internal components: Motherboard, Power Supply, RAM, ROM, and the Central Processing Unit (CPU). Keyboard, monitor, and printer are external peripherals.",
                    whyExplanationUr = "خیبر پختونخوا ٹیکسٹ بک کے مطابق سسٹم یونٹ وہ کیسنگ ہے جس میں مدر بورڈ، پاور سپلائی، ریم، روم اور سی پی یو محفوظ ہوتے ہیں۔ کی بورڈ، مانیٹر اور پرنٹر بیرونی آلات ہیں۔",
                    whyExplanationPs = "د درسي کتاب له مخې سیسټم یونټ هغه کیس دی چې مدر بورډ، پاور سپلائی، RAM، ROM او CPU پکې دننه نصب شوي وي.",
                    formulaOrStep = "System Unit = Motherboard + CPU + RAM + ROM + Power Supply",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why is Random Access Memory (RAM) classified as volatile memory?",
                    questionUr = "ریم (RAM) کو عارضی یا غیر مستقل (Volatile) میموری کیوں کہا جاتا ہے؟",
                    questionPs = "ولې ریم (RAM) ته موقتي یا بې ثباته (Volatile) حافظه ویل کېږي؟",
                    options = listOf(
                        "Because all data stored in RAM is immediately lost whenever electrical power is switched off",
                        "Because it cannot be read by the microprocessor",
                        "Because it stores permanent operating system startup BIOS routines",
                        "Because its physical size changes when heated"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "RAM requires electrical power to maintain its stored bits. When power is lost or turned off, all temporary contents in RAM vanish completely, making it volatile memory.",
                    whyExplanationUr = "ریم کو ڈیٹا برقرار رکھنے کے لیے بجلی کی ضرورت ہوتی ہے۔ جیسے ہی کمپیوٹر بند ہوتا ہے، ریم کا تمام مواد ضائع ہو جاتا ہے، اس لیے اسے وو لاٹائل (عارضی) کہا جاتا ہے۔",
                    whyExplanationPs = "ځکه چې کله د کمپیوټر برېښنا بنده شي، د RAM ټول معلومات سمدستي پاکېږي او له منځه ځي.",
                    formulaOrStep = "Volatile Memory: Power OFF ➔ Data Erased",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the correct descending order of computer memory measurement units from largest to smallest capacity?",
                    questionUr = "کمپیوٹر میموری پیمائش کی بڑی سے چھوٹی صلاحیت کی درست نزولی ترتیب کون سی ہے؟",
                    questionPs = "د کمپیوټر د حافظې د اندازه کولو واحدونو سمه نزولي ترتیب له ستر څخه تر ټولو کوچني کومه ده؟",
                    options = listOf(
                        "TB > GB > MB > KB",
                        "TB > MB > GB > KB",
                        "MB > GB > TB > KB",
                        "GB > MB > KB > TB"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "1 Terabyte (TB) = 1024 Gigabytes (GB); 1 GB = 1024 Megabytes (MB); 1 MB = 1024 Kilobytes (KB). Hence, the correct order of capacities is TB > GB > MB > KB.",
                    whyExplanationUr = "1 ٹیرا بائٹ (TB) = 1024 گیگا بائٹس؛ 1 گیگا بائٹ = 1024 میگا بائٹس؛ 1 میگا بائٹ = 1024 کلو بائٹس۔ اس لیے درست ترتیب TB > GB > MB > KB ہے۔",
                    whyExplanationPs = "۱ ټیرا بایټ ۱۰۲۴ ګیګا بایټه وي، ۱ ګیګا بایټ ۱۰۲۴ میګا بایټه وي، نو سمه ترتیب TB > GB > MB > KB ده.",
                    formulaOrStep = "Hierarchy: 1 TB (1024 GB) > 1 GB (1024 MB) > 1 MB (1024 KB) > 1 KB (1024 Bytes)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the specific architectural role of the Control Unit (CU) inside the Central Processing Unit?",
                    questionUr = "سی پی یو کے اندر کنٹرول یونٹ (CU) کا بنیادی اور مخصوص کام کیا ہے؟",
                    questionPs = "د مرکزي پروسیسر (CPU) دننه د کنټرول یونټ (CU) ځانګړې دنده څه ده؟",
                    options = listOf(
                        "It controls the electronic flow of data and coordinates all operations across computer units",
                        "It performs high-speed mathematical additions and multiplication operations",
                        "It provides backup electricity during power supply outages",
                        "It cools down the physical microprocessor chip using fan blades"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The Control Unit acts as the computer's central coordinator: it fetches and decodes instructions from memory and directs signals to all other hardware units, whereas mathematical calculations are handled by the ALU.",
                    whyExplanationUr = "کنٹرول یونٹ کمپیوٹر کا نگران ہے جو ڈیٹا کے الیکٹرانک بہاؤ کو کنٹرول کرتا ہے اور تمام حصوں کے مابین رابطہ قائم کرتا ہے؛ ریاضی کا کام اے ایل یو کرتا ہے۔",
                    whyExplanationPs = "کنټرول یونټ د ټول سیسټم لارښوونې کنټرولوي او برېښنایي معلوماتو جریان تنظیموي، پداسې حال کې چې ریاضي د ALU کار دی.",
                    formulaOrStep = "CPU = CU (Flow & Coordination) + ALU (Math & Logic)",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "Which network component is responsible for directing and forwarding data packets between distinct computer networks over the Internet?",
                    questionUr = "انٹرنیٹ پر مختلف کمپیوٹر نیٹ ورکس کے درمیان ڈیٹا پیکٹس کو درست منزل تک پہنچانے کا ذمہ دار کون سا آلہ ہے؟",
                    questionPs = "په انټرنیټ کې د بېلابېلو کمپیوټري شبکو ترمنځ د ډاټا پاکټونو د سم لوري ته لېږلو مسؤل کومه وسیله ده؟",
                    options = listOf(
                        "Router",
                        "Sound Card",
                        "Barcode Scanner",
                        "Dot Matrix Printer"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "A Router is a specialized networking hardware device that inspects destination IP addresses on data packets and routes them efficiently across networks until reaching their target.",
                    whyExplanationUr = "راؤٹر ایک نیٹ ورکنگ ڈیوائس ہے جو انٹرنیٹ پر مختلف نیٹ ورکس کے مابین ڈیٹا پیکٹس کا راستہ طے کر کے ان کی درست ترسیل ممکن بناتا ہے۔",
                    whyExplanationPs = "روټر (Router) د شبکې هغه هوښیاره وسیله ده چې د معلوماتو پاکټونه د بېلابېلو شبکو ترمنځ تر خپل اصلي منزل پورې رسوي.",
                    formulaOrStep = "Router: Inter-network packet routing and IP forwarding",
                    difficulty = 2
                )
            )
        ),

        // ─── UNIT 2: DIGITAL SKILLS (p. 19–58) ───
        Class7CSStage(
            id = 2,
            unitNumber = "Unit 2",
            pageRange = "Pages 19–58",
            titleEn = "Digital Skills: Word Processing & Presentations",
            titleUr = "ڈیجیٹل مہارتیں: ورڈ پروسیسنگ اور پریزنٹیشن",
            titlePs = "ډیجیټل مهارتونه: ورډ او پریزنټیشن",
            themeColor = Color(0xFF2563EB),
            secondaryColor = Color(0xFF1E3A8A),
            summaryEn = "Covers professional word processing with Microsoft Word (Ribbon interface, File, Home, Insert, Page Layout, References, Urdu typing, text formatting, tables, headers/footers, and shortcut keys) and multimedia presentations with Microsoft PowerPoint (Slide templates, formatting text, inserting multimedia graphics, transitions, custom animations, slide shows, and the Esc key).",
            summaryUr = "یہ یونٹ مائیکروسافٹ ورڈ کے ذریعے پیشہ ورانہ دستاویزات کی تیاری (ربن، فائل مینو، ہوم، انسرٹ، لے آؤٹ، اردو ٹائپنگ، شارٹ کٹ کیز) اور مائیکروسافٹ پاورپوائنٹ کے ذریعے ملٹی میڈیا پریزنٹیشنز بنانے (سلائیڈز، فارمیٹنگ، تصاویر کراپ کرنا، اینیمیشنز اور سلائیڈ شو کنٹرول) کا احاطہ کرتا ہے۔",
            summaryPs = "په دې څپرکي کې په Microsoft Word کې د لیکنو جوړول (ربن بار، فایل، فارمیټ، اردو ټایپینګ، شارټ کټ بټنې) او په Microsoft PowerPoint کې د سلایډونو جوړول، ډیزاین، انیمیشن او د سلایډ شو چلول په عملي توګه زده کېږي.",
            keyTechConcepts = listOf(
                "MS Word Ribbon: Organized into tabs (File, Home, Insert, Design, Layout, References, Review, View) containing functional groups and commands",
                "Status Bar: Positioned at bottom; displays current page, total pages, word count, proofing status, and zoom level",
                "Essential Shortcuts: Ctrl+S (Save), Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+A (Select All), Ctrl+Z (Undo), Ctrl+P (Print)",
                "PowerPoint Features: Saved as .pptx; Esc key exits slide show; Cropping removes unwanted outer parts of an image; Apply Design Template updates entire theme"
            ),
            cards = listOf(
                Class7CSCard(
                    title = "The Microsoft Word Ribbon & Status Bar",
                    conceptOrCommand = "Ribbon at Top | Status Bar at Bottom",
                    detailEn = "The Ribbon sits horizontally at the top of MS Word, grouping tools into contextual tabs: Home (clipboard, fonts, paragraphs), Insert (tables, shapes, pictures, headers), and Layout (margins, orientation). The bottom Status Bar shows real-time stats: word count, page number, and language.",
                    detailUr = "ربن ورڈ ونڈو کے اوپر واقع ہے جس میں ہوم (فونٹ، پیراگراف)، انسرٹ (تصاویر، ٹیبل)، اور لے آؤٹ کے ٹیبز ہوتے ہیں۔ نیچے سٹیٹس بار موجودہ صفحہ، کل صفحات اور الفاظ کی تعداد ظاہر کرتا ہے۔",
                    detailPs = "ربن بار د پاڼې په پورتنۍ برخه کې وي چې اوزارونه په ټبونو (Home, Insert, Layout) ویشي. لاندې سټیټس بار د کلمو شمېر او د پاڼې نمبر ښيي.",
                    cardColor = Color(0xFF2563EB)
                ),
                Class7CSCard(
                    title = "Essential Keyboard Shortcuts",
                    conceptOrCommand = "Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+S, Ctrl+Z",
                    detailEn = "Keyboard shortcuts drastically enhance typing productivity: Ctrl+A selects the entire document; Ctrl+C copies selected text to the clipboard; Ctrl+V pastes it; Ctrl+S saves the document immediately; Ctrl+Z undoes the last action; Ctrl+B bolds text.",
                    detailUr = "شارٹ کٹ کیز کام کی رفتار بڑھاتی ہیں: Ctrl+A تمام متن منتخب کرتا ہے؛ Ctrl+C کاپی کرتا ہے؛ Ctrl+V پیسٹ کرتا ہے؛ Ctrl+S فائل محفوظ کرتا ہے؛ اور Ctrl+Z آخری عمل کو واپس (Undo) کرتا ہے۔",
                    detailPs = "شارټ کټ بټنې کار اسانه کوي: Ctrl+A ټول متن انتخابوي؛ Ctrl+C کاپي کوي؛ Ctrl+V پیسټ کوي؛ Ctrl+S فایل خوندي کوي؛ او Ctrl+Z وروستی عمل بېرته راګرځوي.",
                    cardColor = Color(0xFF1D4ED8)
                ),
                Class7CSCard(
                    title = "PowerPoint Presentations (.pptx)",
                    conceptOrCommand = "Slides, Themes, Cropping & Slide Show",
                    detailEn = "MS PowerPoint saves files as .pptx presentations. Applying a Design Template standardizes fonts, color palettes, and backgrounds across every slide. The Cropping tool eliminates unwanted borders or outer regions of inserted graphics. Pressing the Esc key immediately aborts a live slide show.",
                    detailUr = "پاورپوائنٹ فائل .pptx فارمیٹ میں محفوظ ہوتی ہے۔ ڈیزائن ٹیمپلیٹ تمام سلائیڈز کا پس منظر اور فونٹ یکساں کر دیتا ہے۔ تصویر کا غیر ضروری حصہ کاٹنے کے عمل کو کراپنگ (Cropping) کہتے ہیں۔ سلائیڈ شو بند کرنے کے لیے Esc دبایا جاتا ہے۔",
                    detailPs = "پاورپوائنټ فایل په .pptx بڼه خوندي کېږي. د ډیزاین ټیمپلیټ د ټولو سلایډونو رنګ او بڼه برابروي. د انځور د اضافي برخې پرې کولو ته Cropping ویل کېږي، او د Esc په وهلو سلایډ شو بندېږي.",
                    cardColor = Color(0xFF3B82F6)
                ),
                Class7CSCard(
                    title = "Urdu & Regional Language Typing",
                    conceptOrCommand = "Phonetic Keyboard Layout & Jameel Noori Nastaleeq",
                    detailEn = "MS Word supports Urdu typing by installing Urdu language packs and phonetic keyboard layouts (e.g., A for Alif, B for Bay) paired with Nastaleeq fonts, enabling students to compose bilingual and trilingual reports seamlessly.",
                    detailUr = "مائیکروسافٹ ورڈ میں فونیٹک کی بورڈ لے آؤٹ اور جمیل نوری نستعلیق فونٹ کے ذریعے اردو ٹائپنگ کی جا سکتی ہے، جس سے اردو اور علاقائی زبانوں میں مضامین تیار ہوتے ہیں۔",
                    detailPs = "په ورډ کې د غږیز کیبورډ (Phonetic Keyboard) او فونټونو له لارې پښتو او اردو لیکنې په ډېر ښکلي انداز ترسره کېدای شي.",
                    cardColor = Color(0xFF2563EB)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "Which application program is specifically designed for composing, editing, formatting, and printing text documents?",
                    questionUr = "کون سا ایپلی کیشن پروگرام خاص طور پر دستاویزات کی تحریر، ترمیم، فارمیٹنگ اور پرنٹنگ کے لیے استعمال ہوتا ہے؟",
                    questionPs = "کوم اپلیکیشن پروګرام په ځانګړي ډول د متن لیکنې، ایډیټ کولو او چاپولو لپاره کارول کېږي؟",
                    options = listOf(
                        "Microsoft Word",
                        "Microsoft Outlook",
                        "Microsoft Access",
                        "Microsoft Excel"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Microsoft Word is the premier word processor used to write, format, edit, and layout text documents. Excel is for spreadsheets, Access for databases, and Outlook for email.",
                    whyExplanationUr = "مائیکروسافٹ ورڈ ایک ورڈ پروسیسر ہے جو دستاویزات لکھنے، سنوارنے اور پرنٹ کرنے کے لیے بنایا گیا ہے۔ ایکسل سپریڈ شیٹس کے لیے اور ایکسس ڈیٹا بیس کے لیے ہے۔",
                    whyExplanationPs = "مایکروسافټ ورډ (MS Word) د متن لیکنې، ډیزاین او ایډیټ کولو لپاره تر ټولو مشهور ورډ پروسیسر دی.",
                    formulaOrStep = "Word Processing Application = Microsoft Word",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Where is the Ribbon located in the Microsoft Word interface?",
                    questionUr = "مائیکروسافٹ ورڈ کے انٹرفیس میں 'ربن' کہاں واقع ہوتا ہے؟",
                    questionPs = "په Microsoft Word انټرفیس کې د 'ربن' بار چېرته موقعیت لري؟",
                    options = listOf(
                        "At the top of the document window below the title bar",
                        "Along the bottom edge next to the taskbar",
                        "Hidden inside the right scrollbar",
                        "Pinned strictly on the left vertical margin"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In MS Word, the Ribbon is the primary command toolbar situated horizontally across the top of the document window, containing tabbed command buttons.",
                    whyExplanationUr = "ربن مائیکروسافٹ ورڈ کی ونڈو میں سب سے اوپر ٹائٹل بار کے نیچے واقع ہوتا ہے جہاں تمام اہم کمانڈز موجود ہوتی ہیں۔",
                    whyExplanationPs = "د ورډ په انټرفیس کې ربن بار د کړکۍ په پورتنۍ برخه کې موقعیت لري چې ټولې کمانډونه پکې پراته دي.",
                    formulaOrStep = "Ribbon Location: Top of document window",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What information is continuously displayed on the bottom Status Bar of Microsoft Word?",
                    questionUr = "مائیکروسافٹ ورڈ کے نچلے سٹیٹس بار پر کون سی معلومات مسلسل ظاہر ہوتی ہیں؟",
                    questionPs = "د Microsoft Word لاندې سټیټس بار باندې کوم معلومات په دوامداره توګه ښودل کېږي؟",
                    options = listOf(
                        "Word count, total pages, current page number, and language",
                        "Current file size in gigabytes and computer CPU temperature",
                        "The user's internet speed and Wi-Fi password",
                        "The total number of open windows on the operating system"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The Status Bar along the bottom of the MS Word window displays vital document metrics: current page, total pages, word count, proofing status, and zoom slider.",
                    whyExplanationUr = "سٹیٹس بار دستاویز کے اہم اعداد و شمار دکھاتا ہے جیسے موجودہ صفحہ، کل صفحات، الفاظ کی گنتی اور استعمال شدہ زبان۔",
                    whyExplanationPs = "سټیټس بار د متن اوسنی مخ، د مخونو ټولټال شمېر او د لیکل شوو کلمو شمېر ښيي.",
                    formulaOrStep = "Status Bar = Page Number + Total Pages + Word Count + Zoom Level",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the precise term for the process of removing unwanted outer portions or borders of an inserted graphic or photo?",
                    questionUr = "کسی تصویر کے غیر ضروری بیرونی کناروں یا حصوں کو کاٹ کر الگ کرنے کے عمل کو کیا کہا جاتا ہے؟",
                    questionPs = "د یو انځور د اضافي او ناغوښتل شوو څنډو پرې کولو ته په کمپیوټر کې څه ویل کېږي؟",
                    options = listOf(
                        "Cropping",
                        "Hiding",
                        "Bordering",
                        "Underlining"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Cropping is the standard graphic and presentation term for trimming or trimming away unwanted outer edges of an image while preserving the desired focal subject.",
                    whyExplanationUr = "کسی بھی تصویر کے فالتو بیرونی حصے کو کاٹنے کے عمل کو کراپنگ (Cropping) کہتے ہیں تاکہ صرف مطلوبہ حصہ باقی رہے۔",
                    whyExplanationPs = "د انځور د بې کاره او اضافي څنډو پرې کولو ته کراپینګ (Cropping) ویل کېږي.",
                    formulaOrStep = "Trimming unwanted image edges = Cropping",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What happens when a presenter presses the 'Esc' key on the keyboard during an ongoing Microsoft PowerPoint slide show?",
                    questionUr = "مائیکروسافٹ پاورپوائنٹ میں سلائیڈ شو کے دوران کی بورڈ سے 'Esc' کی دبانے سے کیا ہوتا ہے؟",
                    questionPs = "په Microsoft PowerPoint کې د سلایډ شو د چلېدو پر مهال د کیبورډ 'Esc' بټنې په وهلو سره څه پېښېږي؟",
                    options = listOf(
                        "It immediately ends the slide show and returns to the normal editing view",
                        "It jumps directly to the last slide in the presentation",
                        "It reverses the color of all slides to black and white",
                        "It shuts down the computer without saving"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "During a PowerPoint slide show, pressing the Escape (Esc) key immediately exits presentation mode and brings the user back to the PowerPoint edit workspace.",
                    whyExplanationUr = "سلائیڈ شو کے دوران Esc کی دبانے سے پریزنٹیشن ختم ہو جاتی ہے اور صارف واپس عام ایڈیٹنگ ونڈو میں آ جاتا ہے۔",
                    whyExplanationPs = "د سلایډ شو په وخت کې د Esc بټنې په کېکاږلو سره ننداره سمدستي پای ته رسېږي او بېرته اصلي ایډیټ پاڼې ته ګرځي.",
                    formulaOrStep = "Esc Key in Slide Show = End Slide Show (Exit Presentation Mode)",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 3: ALGORITHMIC THINKING AND PROBLEM SOLVING (p. 59–73) ───
        Class7CSStage(
            id = 3,
            unitNumber = "Unit 3",
            pageRange = "Pages 59–73",
            titleEn = "Algorithmic Thinking & Flowcharts",
            titleUr = "الگورتھمک سوچ اور فلو چارٹس",
            titlePs = "الګوریتمي فکر او فلوچارټونه",
            themeColor = Color(0xFF0D9488),
            secondaryColor = Color(0xFF115E59),
            summaryEn = "Introduces the systematic problem-solving methodology (Problem identification, problem understanding, problem decomposition into manageable sub-problems, designing solutions, and verifying via feedback). Details properties of algorithms (finiteness, precision, unambiguous steps, input, output), conditional structures (IF-THEN, IF-THEN-ELSE), and standard flowchart symbols (Oval for Start/End, Parallelogram for Input/Output, Rectangle for Processing, Diamond for Decision).",
            summaryUr = "یہ یونٹ مسئلہ حل کرنے کی منظم حکمت عملی (مسئلے کی شناخت، تجزیہ، بڑے مسئلے کو چھوٹے حصوں میں تقسیم کرنا اور فیڈ بیک کے ذریعے تصدیق)، الگورتھم کی خصوصیات (محدود مراحل، وضاحت، ان پٹ، آؤٹ پٹ)، شرطی بیانات (IF-THEN, IF-THEN-ELSE) اور فلو چارٹ کی روایتی اشکال (بیضوی اوول = شروع/اختتام، متوازی الاضلاع = ان پٹ/آؤٹ پٹ، مستطیل = پروسیسنگ، ہیرا ڈائمنڈ = فیصلہ) سکھاتا ہے۔",
            summaryPs = "دا څپرکی د ستونزو د حل منظم ګامونه (د ستونزې پېژندل، تجزیه کول، پر وړو برخو وېشل، او تصدیق)، د الګوریتم ځانګړتیاوې (محدودیت، روښانه ګامونه، ان پټ او آؤټ پټ)، شرطي جملې (که-نو)، او د فلوچارټ رسمي نښې (اوول = پیل/پای، متوازي الاضلاع = ان پټ/آؤټ پټ، مستطیل = پروسس، ډایمنډ = پرېکړه) ښيي.",
            keyTechConcepts = listOf(
                "Problem Solving Process: 1. Identify problem ➔ 2. Understand problem ➔ 3. Decompose problem ➔ 4. Design algorithm ➔ 5. Implement & test with feedback",
                "Algorithm: Step-by-step ordered list of instructions to solve a problem in finite time",
                "Flowchart Symbols: Oval = Start/End; Parallelogram = Input/Output; Rectangle = Process (Calculation); Diamond = Decision (Condition with Yes/No branches); Flowlines = Direction",
                "Conditional Logic: IF condition is true THEN action 1 ELSE action 2 (e.g., IF marks >= 50% THEN Pass ELSE Fail)"
            ),
            cards = listOf(
                Class7CSCard(
                    title = "Problem Decomposition & Solving Methodology",
                    conceptOrCommand = "Decomposition: Break Big Problem ➔ Small Sub-problems",
                    detailEn = "If a problem is too big or complex to solve at once, problem decomposition divides it into smaller, independently solvable components. Proper analysis ensures the root need is addressed; once implemented, user feedback confirms if the solution is correct.",
                    detailUr = "اگر کوئی مسئلہ بہت پیچیدہ ہو تو اسے 'پرابلم ڈی کمپوزیشن' کے ذریعے چھوٹے اور آسان حصوں میں تقسیم کیا جاتا ہے۔ عمل درآمد کے بعد فیڈ بیک (Feedback) سے معلوم ہوتا ہے کہ کیا حل درست ہے یا نہیں۔",
                    detailPs = "که یوه ستونزه ډېره لویه وي، د تجزيې (Decomposition) له لارې پر کوچنیو او اسانه برخو وېشل کېږي، او وروسته د فیډبیک له لارې د حل سمه والی کتل کېږي.",
                    cardColor = Color(0xFF0D9488)
                ),
                Class7CSCard(
                    title = "Algorithm Characteristics",
                    conceptOrCommand = "Finite, Ordered, Unambiguous Instructions",
                    detailEn = "An algorithm is a finite sequence of clear, unambiguous steps that accepts zero or more inputs, processes them, and produces a definitive output. Each step must be executable in a realistic amount of time.",
                    detailUr = "الگورتھم کسی مسئلے کو حل کرنے کے لیے ترتیب وار، واضح اور محدود ہدایات کا مجموعہ ہوتا ہے۔ یہ ان پٹ حاصل کر کے مطلوبہ آؤٹ پٹ پیدا کرتا ہے۔",
                    detailPs = "الګوریتم د ستونزې د حل لپاره د محدودو، منظمو او روښانه ګامونو یوه لړۍ ده چې ان پټ اخلي او کره آؤټ پټ ورکوي.",
                    cardColor = Color(0xFF0F766E)
                ),
                Class7CSCard(
                    title = "Standard Flowchart Symbols",
                    conceptOrCommand = "Oval (Terminal), Parallelogram (I/O), Rectangle (Process), Diamond (Decision)",
                    detailEn = "Flowcharts visually represent algorithms: Oval marks Start and Stop (terminal); Parallelogram indicates Input and Output; Rectangle performs processing or arithmetic calculations; Diamond represents a Decision question with multiple departing branching lines.",
                    detailUr = "فلو چارٹ الگورتھم کی تصویری شکل ہے: اوول (Oval) شروع اور ختم کے لیے؛ متوازی الاضلاع (Parallelogram) ان پٹ اور آؤٹ پٹ کے لیے؛ مستطیل (Rectangle) پروسیسنگ اور حساب کے لیے؛ اور ہیرا (Diamond) فیصلے کے لیے استعمال ہوتا ہے۔",
                    detailPs = "فلوچارټ د الګوریتم انځوریز جوړښت دی: اوول (پیل او پای)، متوازي الاضلاع (ان پټ او آؤټ پټ)، مستطیل (پروسس یا حساب)، او ډایمنډ (پرېکړه او شرط) لپاره دي.",
                    cardColor = Color(0xFF14B8A6)
                ),
                Class7CSCard(
                    title = "Conditional Decision Branching",
                    conceptOrCommand = "IF - THEN - ELSE Constructs",
                    detailEn = "Conditional statements direct the flow of execution depending on whether a criteria evaluates to True or False. For instance: IF Marks >= 50 THEN Result = 'Pass' ELSE Result = 'Fail'. In flowcharts, the diamond symbol splits into Yes and No branches.",
                    detailUr = "شرطیہ بیانات فیصلے کے مطابق راستہ طے کرتے ہیں، جیسے: اگر نمبر 50 یا زیادہ ہوں تو 'پاس' ورنہ 'فیل'۔ فلو چارٹ میں ڈائمنڈ کی شکل ہاں (Yes) اور نہیں (No) کی شاخوں میں بٹ جاتی ہے۔",
                    detailPs = "شرطي جوړښتونه لارښوونه کوي: که نمرو اندازه ۵۰٪ یا زیاته وي نو 'کامیاب' کنه نو 'ناکامه'. په فلوچارټ کې دا د ډایمنډ له لارې بېلېږي.",
                    cardColor = Color(0xFF0D9488)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "If a problem identified is too big or complex to be fixed all at once, what mechanism enables computer scientists to better solve it?",
                    questionUr = "اگر کوئی مسئلہ اتنا بڑا یا پیچیدہ ہو کہ اسے ایک ساتھ حل نہ کیا جا سکے، تو کون سا طریقہ کار اسے بہتر طور پر حل کرنے میں مدد دیتا ہے؟",
                    questionPs = "که یوه ستونزه دومره لویه وي چې په یو ځل حل نشي، نو کوم میکانیزم د هغې په اسانه حل کې مرسته کوي؟",
                    options = listOf(
                        "Problem decomposition (breaking the big problem into smaller, manageable sub-problems)",
                        "Formatting the entire hard drive and deleting files",
                        "Ignoring the requirements and writing random code",
                        "Buying a larger display monitor"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Problem decomposition is the computational thinking strategy of deconstructing a complicated problem into smaller, self-contained sub-problems that are easier to analyze and solve individually.",
                    whyExplanationUr = "پرابلم ڈی کمپوزیشن وہ طریقہ کار ہے جس میں بڑے مسئلے کو چھوٹے اور آسان حصوں میں تقسیم کر کے ہر حصے کو الگ الگ حل کیا جاتا ہے۔",
                    whyExplanationPs = "د ستونزې تجزیه (Decomposition) هغه لاره ده چې لویه ستونزه پر کوچنیو او حل کېدونکو برخو وېشي.",
                    formulaOrStep = "Complex Problem ➔ Problem Decomposition ➔ Smaller Sub-problems",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Once a solution to a problem is implemented in the real world, how do engineers verify that it is actually the correct and effective solution?",
                    questionUr = "جب کسی مسئلے کا حل تیار کر کے نافذ کر دیا جائے، تو انجینئرز کیسے تصدیق کرتے ہیں کہ یہ واقعی درست اور مؤثر حل ہے؟",
                    questionPs = "کله چې د ستونزې یو حل عملي شي، انجینران څنګه ډاډ ترلاسه کوي چې دا واقعیا سم او اغېزمن حل دی؟",
                    options = listOf(
                        "Through user feedback and iterative testing against expected outcomes",
                        "By never running or evaluating the program again",
                        "By assuming every first attempt is always 100% bug-free",
                        "By measuring the physical weight of the computer casing"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "According to KPK Grade 7 textbook, once a solution is deployed, teams gather feedback and evaluate performance against user needs to ensure it meets requirements and refine it if needed.",
                    whyExplanationUr = "نصاب کے مطابق حل نافذ کرنے کے بعد صارفین کے فیڈ بیک اور نتائج کا جائزہ لے کر تصدیق کی جاتی ہے کہ کیا حل درست ثابت ہوا ہے۔",
                    whyExplanationPs = "د کتاب له مخې د حل له عملي کولو وروسته د کاروونکو د فیډبیک (Feedback) له لارې معلومېږي چې حل سم دی که نه.",
                    formulaOrStep = "Verification of Solution = User Feedback & Empirical Testing",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "In standard flowchart diagramming, which geometric symbol is strictly reserved for Input and Output operations?",
                    questionUr = "معیاری فلو چارٹ میں ان پٹ اور آؤٹ پٹ کے لیے خاص طور پر کون سی جیومیٹری کی شکل استعمال ہوتی ہے؟",
                    questionPs = "په معیاري فلوچارټ کې د ان پټ او آؤټ پټ لپاره کومه ځانګړې جیومیټریکي بڼه کارول کېږي؟",
                    options = listOf(
                        "Parallelogram",
                        "Oval",
                        "Rectangle",
                        "Diamond"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "A Parallelogram is the internationally standardized flowchart symbol for input (e.g., Read A, B) and output (e.g., Print Sum). Oval is for Start/Stop, Rectangle for Processing, and Diamond for Decisions.",
                    whyExplanationUr = "فلو چارٹ میں ان پٹ اور آؤٹ پٹ کے لیے متوازی الاضلاع (Parallelogram) کی شکل استعمال ہوتی ہے۔ مستطیل پروسیسنگ کے لیے اور ڈائمنڈ فیصلے کے لیے ہوتا ہے۔",
                    whyExplanationPs = "په فلوچارټ کې د ان پټ او آؤټ پټ لپاره متوازي الاضلاع (Parallelogram) نښه کارول کېږي.",
                    formulaOrStep = "Flowchart I/O Symbol = Parallelogram",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which flowchart symbol is used when a condition must be evaluated to decide between multiple departing flow paths (e.g., Yes or No)?",
                    questionUr = "فلو چارٹ میں اس وقت کون سی شکل استعمال ہوتی ہے جب کسی شرط کی جانچ کر کے دو یا زیادہ راستوں (جیسے ہاں یا نہیں) میں سے انتخاب کرنا ہو؟",
                    questionPs = "په فلوچارټ کې کومه نښه کارول کېږي کله چې یو شرط وسنجول شي او د هو (Yes) یا نه (No) پر لور لارې بېلې شي؟",
                    options = listOf(
                        "Diamond",
                        "Rectangle",
                        "Circle",
                        "Parallelogram"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "The Diamond symbol denotes a decision point in a flowchart. It poses a conditional question (e.g., 'Is Marks >= 50?'), with branching lines labeled 'Yes' and 'No' departing from its points.",
                    whyExplanationUr = "ہیرا (Diamond) کی شکل فلو چارٹ میں فیصلے کے لیے استعمال ہوتی ہے جہاں سے شرط کے مطابق دو شاخیں (ہاں اور نہیں) نکلتی ہیں۔",
                    whyExplanationPs = "ډایمنډ (Diamond) یا د الماس نښه د پرېکړې او شرط لپاره وي چې د هو او نه دوه جلا لارې راباسي.",
                    formulaOrStep = "Decision Symbol = Diamond (with branching condition paths)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What does a Rectangle represent in a flowchart?",
                    questionUr = "فلو چارٹ کے اندر مستطیل (Rectangle) کس عمل کو ظاہر کرتا ہے؟",
                    questionPs = "په فلوچارټ کې مستطیل (Rectangle) کوم عمل ښيي؟",
                    options = listOf(
                        "A Processing step, such as an arithmetic calculation or variable assignment",
                        "Starting or terminating the whole flowchart diagram",
                        "Taking user keyboard input from outside",
                        "Connecting two separate physical pages together"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "A Rectangle represents an internal action or processing step, such as adding numbers (Sum = A + B) or modifying an internal variable.",
                    whyExplanationUr = "مستطیل فلو چارٹ میں پروسیسنگ اور حسابی عمل (جیسے Sum = A + B) کو ظاہر کرتا ہے۔",
                    whyExplanationPs = "مستطیل په فلوچارټ کې د پروسس او ریاضیکي عمل (لکه Sum = A + B) لپاره کارول کېږي.",
                    formulaOrStep = "Process / Calculation Symbol = Rectangle",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 4: PROGRAMMING (p. 74–89) ───
        Class7CSStage(
            id = 4,
            unitNumber = "Unit 4",
            pageRange = "Pages 74–89",
            titleEn = "Visual Programming & Binary Data Encoding",
            titleUr = "بصری پروگرامنگ اور بائنری ڈیٹا انکوڈنگ",
            titlePs = "بصري پروګرامینګ او بائنري کوډ کول",
            themeColor = Color(0xFF7C3AED),
            secondaryColor = Color(0xFF4C1D95),
            summaryEn = "Explains how digital computers represent and encode information (text, numbers, images, and audio) using binary digits ('0's and '1's), decimal to binary conversion (repeated division by 2) and binary to decimal conversion (powers of 2). Teaches interactive visual block programming in Scratch (Stage coordinate system 480x360 with origin at center 0,0, Sprites, Costumes for walking animation, Backdrops, Variables for score/timer, Event blocks, Loops, and Collision detection).",
            summaryUr = "یہ یونٹ کمپیوٹر میں بائنری ڈیٹا (0 اور 1) کے ذریعے متن، تصاویر، آواز اور اعداد کی انکوڈنگ، اعشاری سے بائنری میں تبدیلی (2 پر مسلسل تقسیم) اور بائنری سے اعشاری میں تبدیلی (2 کی طاقتیں) سکھاتا ہے۔ ساتھ ہی سکریچ (Scratch) میں ویژول بلاک پروگرامنگ (480x360 اسٹیج، کوآرڈینیٹس 0,0، اسپرائٹس، کاسٹیوم اینیمیشن، متغیرات، ایونٹس، لوپس اور تصادم کی جانچ) سکھاتا ہے۔",
            summaryPs = "دا څپرکی ښيي چې ډیجیټل کمپیوټر څنګه معلومات په بائنري بڼه (۰ او ۱) ساتي، د ډیسیمل او بائنري بدلول (پر ۲ وېشل او د ۲ طاقتونه)، او په Scratch کې د بلاکونو له لارې پروګرامینګ (د ۴۸۰x۳۶۰ سټیج، اسپرایټ، انیمیشن، ویریبل، لوپ او ککرنګ) په عملي توګه تدریس کوي.",
            keyTechConcepts = listOf(
                "Binary System: Base-2 system using only two binary digits (0 and 1); digital hardware operates via binary electrical states (Off = 0, On = 1)",
                "Decimal to Binary Conversion: Divide decimal number repeatedly by 2, recording remainders from bottom to top (e.g., 13 in decimal = 1101 in binary)",
                "Binary to Decimal Conversion: Multiply each binary digit by its corresponding power of 2 starting from right at 2^0 (e.g., 1101_2 = 1*8 + 1*4 + 0*2 + 1*1 = 13)",
                "Scratch Environment: Stage dimensions = 480 pixels wide x 360 pixels high; Center origin = (x: 0, y: 0); Costumes change appearance/animation; Variables store game score/timer"
            ),
            cards = listOf(
                Class7CSCard(
                    title = "Binary Number System & Conversions",
                    conceptOrCommand = "Base-2 (0 and 1) | Powers of 2 (1, 2, 4, 8, 16...)",
                    detailEn = "Digital computers process all data in binary format using bits 0 and 1. To convert decimal to binary, repeatedly divide by 2 and collect remainders. To convert binary to decimal, sum each bit multiplied by 2 raised to its positional power from right to left (2^0, 2^1, 2^2, 2^3...).",
                    detailUr = "کمپیوٹر تمام ڈیٹا بائنری شکل (0 اور 1) میں پروسیس کرتا ہے۔ اعشاری سے بائنری میں تبدیل کرنے کے لیے 2 پر بار بار تقسیم کر کے باقیات لکھی جاتی ہیں، اور بائنری سے اعشاری میں 2 کی طاقتوں سے ضرب دی جاتی ہے۔",
                    detailPs = "کمپیوټر ټول معلومات په بائنري (۰ او ۱) بڼه لولي. له ډیسیمل څخه بائنري ته د اړولو لپاره عدد پر ۲ وېشل کېږي او پاتې شوني راټولېږي، او بېرته د ۲ په طاقتونو سره جمع کېږي.",
                    cardColor = Color(0xFF7C3AED)
                ),
                Class7CSCard(
                    title = "Scratch Stage & Coordinates",
                    conceptOrCommand = "Stage: Width = 480px, Height = 360px | Center = (0, 0)",
                    detailEn = "The Scratch Stage is 480 pixels wide (X spans from -240 to +240) and 360 pixels high (Y spans from -180 to +180). The center point is exactly (X: 0, Y: 0). Sprites move across this Cartesian plane using coordinates and directional angles.",
                    detailUr = "سکریچ کا اسٹیج 480 پکسل چوڑا اور 360 پکسل اونچا ہوتا ہے۔ اس کا درمیانی نقطہ (0, 0) کہلاتا ہے۔ اسپرائٹ اس کوآرڈینیٹ سسٹم پر حرکت کرتے ہیں۔",
                    detailPs = "د سکریچ (Scratch) سټیج ۴۸۰ پکسله پلن او ۳۶۰ پکسله لوړ دی. د سټیج بالکل منځنی مرکز (0, 0) دی چې کرکټرونه پرې حرکت کوي.",
                    cardColor = Color(0xFF6D28D9)
                ),
                Class7CSCard(
                    title = "Sprites, Costumes & Animation",
                    conceptOrCommand = "Costumes = Visual Frames | Repeat Loops",
                    detailEn = "A Sprite is a graphic character in a Scratch project (default is Sprite1 Cat). Switching between Costume1 and Costume2 inside a loop with a small delay (e.g., 'wait 0.25 seconds') creates fluid walking animation as the sprite moves across the screen.",
                    detailUr = "اسپرائٹ سکریچ کا کردار ہوتا ہے۔ جب ہم لوپ کے اندر کاسٹیوم 1 اور کاسٹیوم 2 کو تھوڑے وقفے سے تبدیل کرتے ہیں تو اسپرائٹ چلتا ہوا اینیمیٹڈ دکھائی دیتا ہے۔",
                    detailPs = "اسپرایټ په سکریچ کې کرکټر ته ویل کېږي. په لوپ کې د بېلابېلو جامو (Costumes) بدلول کرکټر داسې ښيي لکه حرکت چې کوي.",
                    cardColor = Color(0xFF8B5CF6)
                ),
                Class7CSCard(
                    title = "Variables, Events & Collision Detection",
                    conceptOrCommand = "'when green flag clicked' | 'touching [sprite]?'",
                    detailEn = "Variables store changing quantities such as Score or Countdown Timer. 'When green flag clicked' triggers scripts on start. Sensing blocks like 'touching Sprite2?' detect collisions, triggering conditional statements to increase score or end the game.",
                    detailUr = "متغیرات (Variables) کھیل میں اسکور یا ٹائمر محفوظ کرتے ہیں۔ جھنڈے کا بلاک گیم شروع کرتا ہے اور سنسنگ بلاکس اسپرائٹس کے ٹکرانے (Collision) کو محسوس کر کے اسکور بڑھاتے ہیں۔",
                    detailPs = "ویریبلونه د نمرو او وخت اندازه ساتي. د شنه بیرغ بلاک پروګرام پیلوي او سنسنګ بلاکونه د کرکټرونو ټکر کېدل معلوموي.",
                    cardColor = Color(0xFF7C3AED)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "What is the equivalent binary representation of the decimal number 13?",
                    questionUr = "اعشاری عدد 13 کی مساوی بائنری شکل کیا ہوگی؟",
                    questionPs = "د ډیسیمل عدد ۱۳ معادل بائنري بڼه څه ده؟",
                    options = listOf(
                        "1101",
                        "1011",
                        "1110",
                        "1001"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Convert 13 to binary: 13/2 = 6 rem 1; 6/2 = 3 rem 0; 3/2 = 1 rem 1; 1/2 = 0 rem 1. Reading remainders from bottom to top yields 1101_2 (8 + 4 + 0 + 1 = 13).",
                    whyExplanationUr = "13 کو 2 پر تقسیم کرنے سے: 13 = 8 + 4 + 0 + 1 بنتا ہے جس کی بائنری قیمت 1101 ہے۔",
                    whyExplanationPs = "د ۱۳ وېشل پر ۲: ۱۳ = ۸ + ۴ + ۰ + ۱، نو بائنري بڼه یې ۱۱۰۱ کېږي.",
                    formulaOrStep = "13_10 = (1*2^3) + (1*2^2) + (0*2^1) + (1*2^0) = 8 + 4 + 0 + 1 = 1101_2",
                    difficulty = 2
                ),
                Class7QuizQuestion(
                    questionEn = "What are the exact pixel dimensions and the coordinate value of the center point of the Stage window in Scratch?",
                    questionUr = "سکریچ میں اسٹیج کی ونڈو کی پکسل پیمائش اور اس کے درمیانی نقطے کے کوآرڈینیٹس کیا ہوتے ہیں؟",
                    questionPs = "په Scratch کې د سټیج دقیق پکسل اندازه او د منځني مرکز کوارډینټ څو دی؟",
                    options = listOf(
                        "480 pixels wide by 360 pixels tall; center is (0, 0)",
                        "800 pixels wide by 600 pixels tall; center is (100, 100)",
                        "1920 pixels wide by 1080 pixels tall; center is (-1, -1)",
                        "200 pixels wide by 200 pixels tall; center is (50, 50)"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "As stated in the KPK Textbook Unit 4, the Scratch display Stage is 480 pixels wide and 360 pixels tall, with the origin coordinate (0, 0) located at the exact center.",
                    whyExplanationUr = "خیبر پختونخوا کے نصاب کے مطابق سکریچ کا اسٹیج 480 پکسل چوڑا اور 360 پکسل اونچا ہوتا ہے اور اس کا مرکز (0, 0) پر واقع ہوتا ہے۔",
                    whyExplanationPs = "د درسي کتاب له مخې د Scratch سټیج ۴۸۰ پکسله پلن او ۳۶۰ پکسله لوړ دی او مرکز یې (0, 0) دی.",
                    formulaOrStep = "Scratch Stage: Width = 480px, Height = 360px, Origin = (0, 0)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "In Scratch programming, how does a coder make a sprite appear to be realistically walking across the Stage?",
                    questionUr = "سکریچ پروگرامنگ میں کوڈر اسپرائٹ کو اسٹیج پر حقیقت پسندانہ طور پر چلتا ہوا کیسے دکھاتا ہے؟",
                    questionPs = "په Scratch پروګرامینګ کې څنګه یو کرکټر (Sprite) داسې ښودل کېږي لکه روان چې وي؟",
                    options = listOf(
                        "By switching between different costumes in a loop while moving forward with brief wait delays",
                        "By permanently deleting the background backdrop",
                        "By turning the computer volume to maximum",
                        "By converting the project into an Excel spreadsheet"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Alternating between different costume postures of the sprite (e.g. Costume1 and Costume2) in a repeating loop along with small pauses creates the illusion of smooth physical walking animation.",
                    whyExplanationUr = "اسپرائٹ کے مختلف کاسٹیومز کو لوپ کے اندر وقفے کے ساتھ تبدیل کرنے اور آگے بڑھانے سے چلنے کی اینیمیشن بنتی ہے۔",
                    whyExplanationPs = "په لوپ کې د بېلابېلو جامو (Costumes) په بدلولو او یو څه انتظار سره کرکټر داسې ښکاري لکه روان چې وي.",
                    formulaOrStep = "Walk Animation = Repeat [Switch Costume ➔ Wait 0.25s ➔ Move 10 Steps]",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the primary role of a 'Variable' in an interactive Scratch computer game?",
                    questionUr = "سکریچ کے کمپیوٹر گیم میں متغیر (Variable) کا بنیادی مقصد کیا ہوتا ہے؟",
                    questionPs = "په یوه ویډیویي لوبې کې د 'Variable' اصلي دنده څه ده؟",
                    options = listOf(
                        "To store, update, and track changing numerical values like player score or countdown time",
                        "To change the language of the computer's keyboard",
                        "To wipe the hard disk clean after game over",
                        "To paint customized color gradients on the wall"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "A variable is a named storage container in memory used by programmers to store dynamic data values that change during runtime, such as the player's score or remaining game seconds.",
                    whyExplanationUr = "ویریبل ایک ایسا نامزد خانہ ہوتا ہے جو گیم کے دوران تبدیل ہونے والی معلومات جیسے اسکور یا ٹائمر کو محفوظ اور اپ ڈیٹ کرتا ہے۔",
                    whyExplanationPs = "ویریبل په حافظه کې هغه ځای دی چې بدلېدونکي معلومات لکه نمرې او وخت پکې ثبتېږي.",
                    formulaOrStep = "Variable: Stores dynamic mutable state (Score, Timer, Health)",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which programming block event in Scratch is universally used to initiate and trigger game execution scripts when clicked?",
                    questionUr = "سکریچ میں کھیل یا اینیمیشن کو شروع کرنے کے لیے عام طور پر کون سا ایونٹ بلاک استعمال ہوتا ہے؟",
                    questionPs = "په Scratch کې د لوبې یا پروګرام د پیل کولو لپاره کوم مشهور بلاک کارول کېږي؟",
                    options = listOf(
                        "when green flag clicked",
                        "when computer power unplugged",
                        "when screen cracked",
                        "when file deleted"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "'when green flag clicked' is the standard startup event hat block in Scratch; clicking the green flag button triggers all scripts tethered below it.",
                    whyExplanationUr = "'when green flag clicked' سکریچ کا وہ بنیادی بلاک ہے جس پر کلک کرنے سے پروگرام اور کھیل شروع ہو جاتا ہے۔",
                    whyExplanationPs = "'when green flag clicked' هغه اصلي بلاک دی چې د شنه بیرغ په کلیک کولو سره لوبه یا پروګرام پیلوي.",
                    formulaOrStep = "Game Startup Trigger = 'when green flag clicked' event block",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 5: DIGITAL CITIZENSHIP (p. 90–107) ───
        Class7CSStage(
            id = 5,
            unitNumber = "Unit 5",
            pageRange = "Pages 90–107",
            titleEn = "Digital Citizenship & Cyber Safety",
            titleUr = "ڈیجیٹل شہریت اور سائبر سیکیورٹی",
            titlePs = "ډیجیټل تابعیت او سایبري خوندیتوب",
            themeColor = Color(0xFFDC2626),
            secondaryColor = Color(0xFF7F1D1D),
            summaryEn = "Educates students on responsible digital citizenship, computer ethics, intellectual property rights, copyright, preventing digital piracy and plagiarism, recognizing online media bias, guarding against cybercrimes (Financial fraud, Identity theft, Cyberstalking, Money laundering, Electronic terrorism, Cyber vandalism, and Ransomware extortion), cyber scouts awareness, and adhering to legal frameworks (Prevention of Electronic Crimes Act / PECA 2016).",
            summaryUr = "یہ یونٹ ذمہ دار ڈیجیٹل شہریت، اخلاقیات، دانشورانہ ملکیت (کاپی رائٹ)، چوری اور سرقہ (Plagiarism) کی روک تھام، میڈیا کی جانبداری کی پہچان، سائبر جرائم (مالیاتی فراڈ، شناخت کی چوری، سائبر سٹاکنگ، منی لانڈرنگ، سائبر دہشت گردی، توڑ پھوڑ اور بھتہ خوری)، سائبر اسکاؤٹس اور پاکستان کے سائبر کرائم ایکٹ (PECA 2016) سے آگاہی فراہم کرتا ہے۔",
            summaryPs = "دا څپرکی مسؤل ډیجیټل تابعیت، د کمپیوټر اخلاق، د کاپي حق (Copyright)، د غلا او ادبي غلا (Plagiarism) مخنیوی، د سایبري جرمونو (مالي درغلي، د هویت غلا، سایبر ځورول، سایبري ترهګري)، او د پاکستان د بریښنایی جرمونو قانون (PECA 2016) زده کوي.",
            keyTechConcepts = listOf(
                "Computer Ethics & Digital Citizenship: Moral principles governing acceptable, responsible, and legal behavior online",
                "Intellectual Property & Plagiarism: Presenting another creator's work or ideas as your own without authorization or attribution is plagiarism and illegal piracy",
                "Cyber Crimes: Financial fraud (phishing bank details), Cyberstalking (online harassment/defamation), Cyber extortion (holding data hostage for ransom)",
                "PECA 2016 Awareness: Pakistan's legal act prescribing heavy fines and prison terms for cyber terrorism, identity theft, and infrastructure tampering"
            ),
            cards = listOf(
                Class7CSCard(
                    title = "Intellectual Property, Piracy & Plagiarism",
                    conceptOrCommand = "Ethics: Respect Copyright & Attribute Authors",
                    detailEn = "Intellectual property grants creators legal ownership of digital assets (software, books, music). Plagiarism is presenting another creator's work as your own without consent or citation. Digital piracy is unauthorized copying, downloading, or distributing copyrighted digital media.",
                    detailUr = "دانشورانہ ملکیت (Intellectual Property) تخلیق کار کو قانونی تحفظ فراہم کرتی ہے۔ کسی دوسرے کے کام کو اپنا ظاہر کرنا سرقہ (Plagiarism) اور بغیر اجازت کاپی کرنا ڈیجیٹل پائریسی (چوری) کہلاتا ہے۔",
                    detailPs = "فکري ملکیت د خپلو ډیجیټلي تخلیقاتو قانوني حق دی. د بل چا کار د خپل په نوم وړاندې کول ادبي غلا (Plagiarism) او پټ کاپي کول پائریسي ګڼل کېږي.",
                    cardColor = Color(0xFFDC2626)
                ),
                Class7CSCard(
                    title = "Cyber Crimes: Fraud, Stalking & Extortion",
                    conceptOrCommand = "Cyberstalking | Financial Fraud | Cyber Extortion",
                    detailEn = "Cyberstalking uses Internet platforms to systematically harass, threaten, or defame individuals. Financial fraud tricks victims into surrendering banking credentials. Cyber extortion involves hackers holding sensitive databases hostage until an extortion ransom is paid.",
                    detailUr = "سائبر سٹاکنگ انٹرنیٹ کے ذریعے کسی کو ہراساں یا بدنام کرنے کا جرم ہے۔ مالیاتی فراڈ میں دھوکے سے بینک معلومات حاصل کی جاتی ہیں جبکہ سائبر ایکسٹورشن میں ڈیٹا یرغمال بنا کر تاوان مانگا جاتا ہے۔",
                    detailPs = "سایبر سټاکینګ د انټرنیټ له لارې د خلکو ځورول او بدنامول دي. مالي درغلي د خلکو بانکي حسابونه لوټي او ایکستورشن د ډاټا په یرغمل کولو سره باج غواړي.",
                    cardColor = Color(0xFFB91C1C)
                ),
                Class7CSCard(
                    title = "Cyber Safety Rules & Cyber Scouts",
                    conceptOrCommand = "Strong Passwords, Antivirus & Safe Browsing",
                    detailEn = "Safe digital citizens never share passwords, verify email attachments before downloading to avoid malware, use updated antivirus software, and download only from trusted websites. Cyber Scouts promote online safety awareness in schools.",
                    detailUr = "محفوظ انٹرنیٹ کے اصول: کبھی پاس ورڈ شیئر نہ کریں، نامعلوم ای میل فائلز نہ کھولیں، اینٹی وائرس اپ ڈیٹ رکھیں اور صرف معتبر ویب سائٹس استعمال کریں۔ سائبر اسکاؤٹس اسکولوں میں شعور اجاگر کرتے ہیں۔",
                    detailPs = "د خوندیتوب اصول: خپل پټنوم چا ته مه ورکوئ، بې باوره فایلونه مه ښکته کوئ او انټي وایرس ولګوئ. سایبر سکاوټس په ښوونځیو کې دا پوهاوی خپروي.",
                    cardColor = Color(0xFFEF4444)
                ),
                Class7CSCard(
                    title = "Legal Awareness: Cyber Crime Act 2016",
                    conceptOrCommand = "Prevention of Electronic Crimes Act (PECA)",
                    detailEn = "Pakistan's Prevention of Electronic Crimes Act (PECA 2016) imposes severe penalties: up to 14 years imprisonment and 50 million PKR fine for electronic terrorism, up to 3 years for unauthorized identity theft, and up to 5 years for critical infrastructure tampering.",
                    detailUr = "پاکستان کے سائبر کرائم ایکٹ 2016 کے تحت سائبر دہشت گردی پر 14 سال تک قید اور 5 کروڑ جرمانہ، اور شناختی معلومات چوری کرنے پر 3 سال تک قید ہو سکتی ہے۔",
                    detailPs = "د پاکستان د ۲۰۱۶ کال د بریښنایی جرمونو قانون له مخې سایبري ترهګري تر ۱۴ کلونو بند او ۵۰ میلیونه روپۍ جریمه لري، او د هویت غلا تر ۳ کلونو بند لري.",
                    cardColor = Color(0xFFDC2626)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "What is the specific legal and academic term for presenting someone else's work, writing, or ideas as your own without authorization or credit?",
                    questionUr = "کسی دوسرے شخص کے کام، تحریر یا خیالات کو بغیر اجازت یا حوالہ دیے اپنا ظاہر کرنے کو کیا کہا جاتا ہے؟",
                    questionPs = "د بل چا لیکنه، کار یا نظریات پرته له حوالې او اجازې د خپل په نوم وړاندې کولو ته څه ویل کېږي؟",
                    options = listOf(
                        "Plagiarism",
                        "Data mining",
                        "Cloud computing",
                        "Algorithm compilation"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Plagiarism is the unethical and unlawful act of appropriating someone else's intellectual creation and claiming it as one's own without giving proper attribution.",
                    whyExplanationUr = "سرقہ (Plagiarism) ایک غیر اخلاقی اور غیر قانونی عمل ہے جس میں دوسرے کے کام یا خیالات کو اپنا بنا کر پیش کیا جاتا ہے۔",
                    whyExplanationPs = "ادبي غلا (Plagiarism) هغه غیراخلاقي عمل دی چې د بل چا لیکنه یا کار پټ کړي او خپل یې وبولي.",
                    formulaOrStep = "Unattributed copying of work = Plagiarism",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which cybercrime is defined as the persistent use of the Internet, social media, or email to stalk, harass, defame, or intimidate a person?",
                    questionUr = "کون سا سائبر جرم انٹرنیٹ یا سوشل میڈیا کے ذریعے کسی فرد کو مسلسل ہراساں، خوفزدہ یا بدنام کرنے سے متعلق ہے؟",
                    questionPs = "کوم سایبري جرم د انټرنیټ او ټولنیزو شبکو له لارې د خلکو په دوامداره توګه ځورولو، بدنامولو او ډارولو پورې اړه لري؟",
                    options = listOf(
                        "Cyberstalking",
                        "Hardware defragmentation",
                        "Software beta testing",
                        "Data compression"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Cyberstalking refers to online harassment, false accusations, and threatening behaviors directed at a person using electronic telecommunication channels.",
                    whyExplanationUr = "سائبر سٹاکنگ (Cyberstalking) انٹرنیٹ اور الیکٹرانک ذرائع سے کسی کو مسلسل ہراساں کرنے اور دھمکانے کا سنگین جرم ہے۔",
                    whyExplanationPs = "سایبر سټاکینګ (Cyberstalking) پر انټرنیټ د چا پرله پسې ځورول، وېرول او بدنامول دي.",
                    formulaOrStep = "Online Harassment & Threats = Cyberstalking",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is cyber extortion in digital forensics?",
                    questionUr = "ڈیجیٹل سیکیورٹی میں سائبر ایکسٹورشن (Cyber Extortion) سے کیا مراد ہے؟",
                    questionPs = "په سایبري امنیت کې سایبر ایکستورشن (Cyber Extortion) څه مانا لري؟",
                    options = listOf(
                        "When hackers lock down a user's sensitive data or website and hold it hostage until a ransom is paid",
                        "When an old computer display screen burns out due to age",
                        "When a classroom printer runs out of colored ink",
                        "When an antivirus program scans files for malware"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Cyber extortion occurs when malicious attackers compromise a computer system or encrypt data files (like ransomware) and demand ransom payments before restoring access.",
                    whyExplanationUr = "سائبر ایکسٹورشن میں ہیکرز کسی کا کمپیوٹر یا حساس ڈیٹا یرغمال بنا لیتے ہیں اور تاوان وصول کیے بغیر اسے بحال نہیں کرتے۔",
                    whyExplanationPs = "په سایبر ایکستورشن کې بریدګر د قرباني مهم معلومات قلف کوي او تر هغې پیسې باج نه وي اخیستي، بېرته یې نه خلاصوي.",
                    formulaOrStep = "Holding data hostage for ransom = Cyber Extortion",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Which of the following is considered the safest and most effective habit for protecting oneself against online phishing and malware?",
                    questionUr = "آن لائن فشنگ اور میلویئر سے بچاؤ کے لیے درج ذیل میں سے کون سی سب سے محفوظ عادت ہے؟",
                    questionPs = "د انټرنیټي درغلیو او ویروسونو څخه د ځان ساتلو لپاره تر ټولو غوره او خوندي لاره کومه ده؟",
                    options = listOf(
                        "Never download suspicious email attachments or disclose banking passwords, and keep antivirus software active",
                        "Clicking on every pop-up banner claiming you have won a lottery",
                        "Sharing passwords with strangers in public internet cafes",
                        "Turning off all firewall security settings permanently"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Safe browsing mandates exercising caution with unsolicited email attachments, never entering banking credentials on unknown portals, and using updated antivirus defenses.",
                    whyExplanationUr = "مشکوک ای میل اٹیچمنٹس کو نہ کھولنا، پاس ورڈ اور بینک معلومات راز میں رکھنا اور اینٹی وائرس کا استعمال محفوظ طریقہ ہے۔",
                    whyExplanationPs = "هیڅکله بې باوره فایلونه مه خلاصوئ، پټنوم پټ وساتئ او تل انټي وایرس فعال وساتئ.",
                    formulaOrStep = "Cyber Safety = Skeptical downloading + Strong passwords + Antivirus protection",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Under the Prevention of Electronic Crimes Act (PECA 2016), severe legal penalties are prescribed for which category of unlawful cyber conduct?",
                    questionUr = "سائبر کرائم ایکٹ (PECA 2016) کے تحت کس غیر قانونی فعل پر انتہائی سخت قید اور بھاری جرمانے کی سزائیں مقرر ہیں؟",
                    questionPs = "د پاکستان د ۲۰۱۶ بریښنایی جرمونو قانون له مخې د کوم ناوړه عمل لپاره خورا درنې سزاګانې ټاکل شوې دي؟",
                    options = listOf(
                        "Cyber terrorism, unauthorized identity theft, and tampering with critical infrastructure",
                        "Writing a computer program in Scratch for school homework",
                        "Typing an essay in Urdu in Microsoft Word",
                        "Connecting a laser printer to a laptop with a USB cable"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "PECA 2016 penalizes illicit actions including cyber terrorism, infrastructure disruption, unauthorized transmission of private data, and electronic fraud.",
                    whyExplanationUr = "ایکٹ 2016 کے تحت سائبر دہشت گردی، شناختی چوری، اور اہم انفراسٹرکچر میں مداخلت جیسے سنگین جرائم پر سخت سزائیں دی جاتی ہیں۔",
                    whyExplanationPs = "د قانون له مخې سایبري ترهګري، د هویت پټول او د هېواد پر مهمو شبکو بریدونه درنې سزاګانې لري.",
                    formulaOrStep = "PECA 2016: Imprisons and fines cyber terrorism, fraud, and critical infrastructure attacks",
                    difficulty = 1
                )
            )
        ),

        // ─── UNIT 6: ENTREPRENEURSHIP IN THE DIGITAL AGE (p. 108–116) ───
        Class7CSStage(
            id = 6,
            unitNumber = "Unit 6",
            pageRange = "Pages 108–116",
            titleEn = "Entrepreneurship & Design Thinking",
            titleUr = "کاروباری سوچ اور ڈیزائن تھنکنگ",
            titlePs = "متشبثیت او ډیزاین فکر (Design Thinking)",
            themeColor = Color(0xFFD97706),
            secondaryColor = Color(0xFF78350F),
            summaryEn = "Introduces digital entrepreneurship, innovation, and the 5 iterative stages of the human-centric Design Thinking process: 1. Empathize (understand user needs, conduct surveys), 2. Define (formulate clear problem statements), 3. Ideate (brainstorm diverse creative solutions), 4. Prototype (build low-cost experimental models, e.g. paper mockups), and 5. Test (evaluate prototypes with real users to gather feedback). Connects design thinking to sustainable development goals.",
            summaryUr = "یہ یونٹ ڈیجیٹل انٹرپرینیورشپ، جدت اور انسان دوست ڈیزائن تھنکنگ کے 5 تکراری مراحل سکھاتا ہے: 1۔ ہمدردی / ایمپیتھائز (صارفین کے مسائل سمجھنا)، 2۔ ڈیفائن (مسئلے کی واضح تعریف)، 3۔ آئیڈی ایٹ (نئے اور اچھوتے حل سوچنا)، 4۔ پروٹو ٹائپ (ابتدائی سستے ماڈلز بنانا)، اور 5۔ ٹیسٹ (صارفین کے ساتھ جانچ کر کے فیڈ بیک حاصل کرنا)۔",
            summaryPs = "دا څپرکی د نوښتګر متشبثیت او د ډیزاین فکر (Design Thinking) پنځه مهم پړاوونه ښيي: ۱. همدردي (د کاروونکي اړتیا درک کول)، ۲. تعریف (د اصلي ستونزې روښانه بیان)، ۳. نظريه جوړول (د نوو لارو لټول)، ۴. لومړنۍ بېلګه/پروټوټایپ (ساده ماډل جوړول)، او ۵. ازمویل (له کاروونکو سره ټیسټ کول).",
            keyTechConcepts = listOf(
                "Entrepreneurship: The act of identifying opportunities, taking calculated risks, and launching innovative business ventures to solve societal problems",
                "Design Thinking 5-Stage Process: Empathize ➔ Define ➔ Ideate ➔ Prototype ➔ Test (Iterative, non-linear human-centric framework)",
                "Stage 1: Empathize - Put yourself in the shoes of users through observation and interviews",
                "Stage 2: Define - Synthesize observations to construct a concise user-centered Problem Statement",
                "Stage 3: Ideate - Brainstorm wide variety of innovative out-of-the-box solution ideas",
                "Stage 4: Prototype - Construct inexpensive, scaled-down trial versions (e.g., paper prototypes)",
                "Stage 5: Test - Evaluate the prototype with actual end-users and iterate based on results"
            ),
            cards = listOf(
                Class7CSCard(
                    title = "What is Design Thinking?",
                    conceptOrCommand = "Human-Centric Problem-Solving Mindset",
                    detailEn = "Design Thinking is an iterative, creative problem-solving framework that begins with deep empathy for human needs. It reframes vague challenges in human-centered terms, fosters rapid brainstorming, hands-on prototyping, and continuous testing.",
                    detailUr = "ڈیزائن تھنکنگ ایک تخلیقی اور انسانی ضروریات پر مبنی طریقہ کار ہے جو مسائل کو گہرائی سے سمجھنے، اچھوتے خیالات پیدا کرنے اور عملی ماڈلز کے ذریعے حل نکالنے میں مدد دیتا ہے۔",
                    detailPs = "ډیزاین فکر د انسان پر اړتیاوو ولاړ د ستونزو د حل یو تخلیقي چوکاټ دی چې د کاروونکي له ژورې درک سره پیلېږي او غوره نوښتونه رامنځته کوي.",
                    cardColor = Color(0xFFD97706)
                ),
                Class7CSCard(
                    title = "Stage 1: Empathize & Stage 2: Define",
                    conceptOrCommand = "Empathize (Research User Needs) ➔ Define (Problem Statement)",
                    detailEn = "In Empathize, designers observe and consult users to understand their lived experiences and frustrations. In Define, this raw information is synthesized into an explicit, human-centered Problem Statement that guides the entire project.",
                    detailUr = "ایمپیتھائز میں صارفین کا مشاہدہ کر کے ان کی حقیقی مشکلات سمجھی جاتی ہیں۔ ڈیفائن میں اس معلومات کو یکجا کر کے مسئلے کی واضح تعریف (Problem Statement) لکھی جاتی ہے۔",
                    detailPs = "په لومړي پړاو کې له کاروونکي سره خبرې کېږي ترڅو د هغوی ستونزې وپېژندل شي. په دویم پړاو کې دا ستونزې په یوه روښانه تعریف (Problem Statement) کې راټولېږي.",
                    cardColor = Color(0xFFB45309)
                ),
                Class7CSCard(
                    title = "Stage 3: Ideate & Stage 4: Prototype",
                    conceptOrCommand = "Ideate (Brainstorm Ideas) ➔ Prototype (Build Scaled Models)",
                    detailEn = "In Ideate, teams generate numerous radical ideas without initial judgment. In Prototype, designers build quick, inexpensive, scaled-down tangible artifacts (e.g., paper sketches, clickable wireframes, craft models) to make ideas concrete.",
                    detailUr = "آئیڈی ایٹ میں بغیر کسی تنقید کے ڈھیروں نئے خیالات سوچے جاتے ہیں۔ پروٹو ٹائپ میں سستے اور آسان ماڈلز (جیسے کاغذ کے خاکے) بنائے جاتے ہیں تاکہ آئیڈیا کو عملی شکل دی جا سکے۔",
                    detailPs = "په درېیم پړاو کې نوي او بېلابېل فکرونه وړاندې کېږي. په څلورم پړاو کې د هغو فکرونو پر بنسټ ارزانه او ساده لومړنۍ نمونې (Prototypes) جوړېږي.",
                    cardColor = Color(0xFFF59E0B)
                ),
                Class7CSCard(
                    title = "Stage 5: Test & Sustainable Innovation",
                    conceptOrCommand = "Test (User Evaluation) ➔ Iterate Towards Sustainability",
                    detailEn = "In Test, real users interact with the prototypes. Their feedback uncovers hidden flaws, prompting the team to loop back to refine ideas. Digital entrepreneurs leverage this process to build sustainable green tech and social enterprises.",
                    detailUr = "ٹیسٹ کے مرحلے میں اصل صارفین سے ماڈل کی جانچ کروائی جاتی ہے۔ ان کی آراء سے خامیاں دور کی جاتی ہیں اور پائیدار حل سامنے آتا ہے۔",
                    detailPs = "په پنځم پړاو کې اصلي خلک جوړه شوې بېلګه ازمويي او د هغوی د غبرګون پر بنسټ ستونزې حل کېږي او کار پای ته رسېږي.",
                    cardColor = Color(0xFFD97706)
                )
            ),
            quizzes = listOf(
                Class7QuizQuestion(
                    questionEn = "What is the very first foundational stage of the human-centered Design Thinking process?",
                    questionUr = "انسان دوست ڈیزائن تھنکنگ کے طریقہ کار کا سب سے پہلا اور بنیادی مرحلہ کون سا ہے؟",
                    questionPs = "د انسان پر محور ولاړ د ډیزاین فکر (Design Thinking) لومړنی بنسټیز پړاو کوم دی؟",
                    options = listOf(
                        "Empathize (understanding human needs, experiences, and emotions)",
                        "Sketching complex blueprints on CAD software",
                        "Building expensive factory prototypes",
                        "Calculating final tax returns for sales"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Design Thinking begins with empathy. Designers observe, listen to, and interact with real users to deeply understand their struggles before attempting to formulate any solutions.",
                    whyExplanationUr = "ڈیزائن تھنکنگ کا آغاز ہمیشہ ایمپیتھائز (ہمدردی اور فہم) سے ہوتا ہے جہاں صارفین کے احساسات اور ضروریات کو سمجھا جاتا ہے۔",
                    whyExplanationPs = "د ډیزاین فکر پیل تل له همدردۍ (Empathize) څخه کېږي ترڅو د خلکو اصلي ستونزې او احساسات له نږدې وپېژندل شي.",
                    formulaOrStep = "Design Thinking Sequence: Stage 1 = Empathize",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Where does the crucial information needed to craft the Problem Statement during the 'Define' stage originate?",
                    questionUr = "'ڈیفائن' مرحلے میں مسئلے کی واضح تعریف (Problem Statement) کے لیے درکار معلومات کہاں سے حاصل ہوتی ہیں؟",
                    questionPs = "د 'تعریف' (Define) په پړاو کې د ستونزې د روښانه بیان لپاره معلومات له کوم ځای څخه راټولېږي؟",
                    options = listOf(
                        "From the findings and user observations gathered during the Empathize stage",
                        "From guessing without ever speaking to the customer",
                        "From the final Testing stage after the product is already sold",
                        "From the computer's recycling bin"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "In the Define phase, designers synthesize the qualitative research, surveys, and behavioral insights gathered during the Empathize stage to pinpoint the core problem.",
                    whyExplanationUr = "ڈیفائن مرحلے کا تمام ڈیٹا ایمپیتھائز مرحلے میں حاصل کیے گئے مشاہدات اور انٹرویوز سے آتا ہے۔",
                    whyExplanationPs = "د ستونزې د تعریف لپاره ټول معلومات د همدردۍ (Empathize) په لومړي پړاو کې د کاروونکو له کتنې ترلاسه کېږي.",
                    formulaOrStep = "Define inputs = Empathize user research insights",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "What is the primary objective of creating a 'Prototype' in the fourth stage of Design Thinking?",
                    questionUr = "ڈیزائن تھنکنگ کے چوتھے مرحلے میں 'پروٹو ٹائپ' بنانے کا بنیادی مقصد کیا ہوتا ہے؟",
                    questionPs = "د ډیزاین فکر په څلورم پړاو کې د 'پروټوټایپ' (Prototype) جوړولو اصلي هدف څه دی؟",
                    options = listOf(
                        "To produce inexpensive, scaled-down physical or visual versions of the solution to tangibly test ideas",
                        "To sell finished merchandise directly to consumers for maximum profit",
                        "To discard all ideas generated in the ideate stage",
                        "To write a 500-page theoretical legal contract"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Prototyping is an experimental phase where designers create quick, cheap, scaled-down models (e.g. paper mockups) to explore ideas and uncover design flaws before committing heavy resources.",
                    whyExplanationUr = "پروٹو ٹائپ کا مقصد سستے اور سادہ ماڈلز بنا کر خیالات کو عملی شکل دینا ہے تاکہ کم خرچ پر ان کی جانچ کی جا سکے۔",
                    whyExplanationPs = "د پروټوټایپ موخه د ارزانه او ساده لومړنیو ماډلونو جوړول دي ترڅو نظرونه په عملي توګه وکتل شي مخکې له دې چې ډېر لګښت پرې وشي.",
                    formulaOrStep = "Prototype = Inexpensive, scaled-down experimental model for testing",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "Why is the Design Thinking process described as 'iterative' rather than strictly linear?",
                    questionUr = "ڈیزائن تھنکنگ کے عمل کو سیدھی لکیر کے بجائے 'تکراری' (Iterative) کیوں کہا جاتا ہے؟",
                    questionPs = "ولې د ډیزاین فکر پروسه په بشپړه توګه مستقیمه نه بلکې تکراري (Iterative) ګڼل کېږي؟",
                    options = listOf(
                        "Because test results frequently reveal new problems, sending teams back to redefine, re-ideate, and refine earlier stages",
                        "Because teams must never move past the first stage",
                        "Because it can only be performed by computer robots",
                        "Because it strictly requires one single unbroken attempt"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Design Thinking is non-linear and iterative: results from testing prototypes frequently highlight unanticipated user hurdles, prompting teams to loop back to Empathize or Ideate to improve the design.",
                    whyExplanationUr = "ٹیسٹ کے نتائج سے نئی معلومات سامنے آتی ہیں جس کی وجہ سے ٹیمیں واپس پچھلے مراحل میں جا کر اپنے ڈیزائن کو مزید بہتر بناتی ہیں۔",
                    whyExplanationPs = "ځکه چې په ازموینه کې نوې نیمګړتیاوې څرګندېږي او ټیمونه بېرته پخوانیو پړاوونو ته ګرځي ترڅو طرحه لا ښه کړي.",
                    formulaOrStep = "Iterative Design: Test Feedback ➔ Loop back to Ideate / Prototype ➔ Refined Solution",
                    difficulty = 1
                ),
                Class7QuizQuestion(
                    questionEn = "In what domain does Design Thinking provide the most transformative value to modern young entrepreneurs?",
                    questionUr = "جدید نوجوان کاروباری افراد کے لیے ڈیزائن تھنکنگ کس شعبے میں سب سے زیادہ انقلابی فائدہ پہنچاتی ہے؟",
                    questionPs = "د نن ورځې د نوو متشبثینو لپاره ډیزاین فکر په کوم ډګر کې تر ټولو لوی او مثبت بدلون راولي؟",
                    options = listOf(
                        "Innovation and creative human-centered problem solving for sustainable solutions",
                        "Printing paper counterfeit currency notes",
                        "Bypassing internet firewall security controls illegally",
                        "Memorizing computer hardware serial numbers"
                    ),
                    correctIndex = 0,
                    whyExplanationEn = "Design Thinking fosters innovation, creative confidence, resilience to failure, and empathetic problem-solving, enabling entrepreneurs to build solutions people truly love and need.",
                    whyExplanationUr = "ڈیزائن تھنکنگ نوجوانوں میں تخلیقی خود اعتمادی اور انسانی مسائل کو جدت کے ساتھ حل کرنے کا جذبہ پیدا کرتی ہے۔",
                    whyExplanationPs = "ډیزاین فکر په ځوانانو کې نوښت، خلاقیت او د انساني ستونزو لپاره د رښتینو حل لارو موندلو باور پیاوړی کوي.",
                    formulaOrStep = "Design Thinking Benefit = Human-centered Innovation & Sustainable Problem Solving",
                    difficulty = 1
                )
            )
        )
    )
}
