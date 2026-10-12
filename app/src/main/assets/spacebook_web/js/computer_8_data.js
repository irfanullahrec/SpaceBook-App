// Class 8 Computer Science - KPK Textbook Board (KPTBB)
// Digitized & Verified Verbatim Dataset (SNC 2022)
const COMPUTER_8_DATA = [
  {
    "number": 1,
    "id": "unit-1",
    "title": "ICT Fundamentals",
    "titleUrdu": "آئی سی ٹی کے بنیادی اصول",
    "pageRange": "pp. 1–17",
    "source": "KPK Textbook Board (KPTBB) Grade 8 Computer Science (SNC 2022)",
    "englishSummary": "Unit 1 explores cutting-edge emerging technologies in ICT including IoT, Embedded Systems, Edge Computing, 5G, Artificial Intelligence, Machine Learning, Robotics, Computer-Assisted Translation, 3D & Holographic Imaging, and Blockchain. It also details computer networks (PAN, LAN, MAN, WAN, VPN) and physical transmission media (guided cables and unguided wireless waves).",
    "urduSummary": "یونٹ 1 انفارمیشن اینڈ کمیونیکیشن ٹیکنالوجی (آئی سی ٹی) کی جدید ابھرتی ہوئی ٹیکنالوجیز جیسے انٹرنیٹ آف تھنگز (IoT)، ایمبیڈڈ سسٹمز، ایج کمپیوٹنگ، 5G، مصنوعی ذہانت (AI)، روبوٹکس، بلاک چین، اور تھری ڈی ہولوگرافک امیجنگ کا احاطہ کرتا ہے۔ نیز کمپیوٹر نیٹ ورکس (PAN, LAN, MAN, WAN, VPN) اور ٹرانسمیشن میڈیا (تار اور وائرلیس) کی تفصیلی وضاحت کرتا ہے۔",
    "sections": [
      {
        "id": "1.1",
        "title": "Emerging Technologies in ICT",
        "heading": "1.1 Emerging Technologies in ICT",
        "headingUrdu": "1.1 آئی سی ٹی میں جدید ابھرتی ہوئی ٹیکنالوجیز",
        "text": "Emerging technologies represent progressive advancements in ICT that transform everyday life, industry, and education:\n• Internet of Things (IoT): A worldwide network of physical devices (appliances, smart meters, vehicles) embedded with sensors and software that communicate wirelessly over the Internet without human intervention.\n• Embedded Systems: Dedicated computer hardware systems running specialized microprocessors and firmware to control specific machines (appliances, medical devices, automotive control units).\n• Edge Computing: A distributed computing architecture that processes and analyzes data directly at the peripheral source where it is generated rather than in a distant centralized cloud server, reducing latency in smart city traffic and real-time robotics.\n• 5G Technology: Fifth-generation cellular network standard providing ultra-high data bandwidth (up to 10 Gbps), massive device connectivity, and near-zero latency.\n• Artificial Intelligence (AI) & Machine Learning (ML): Algorithms that enable computer systems to simulate human intelligence, learn from data patterns, make predictive decisions, and automate complex tasks.\n• Robotics & Drones: Programmable electromechanical machines performing hazardous, precise, or repetitive tasks in manufacturing, surgery, agriculture, and defense.\n• Blockchain & Distributed Applications (DApps): Decentralized, cryptographically secured distributed ledgers that record transparent, tamper-proof transaction histories across peer-to-peer nodes without central authorities.",
        "paras": [
          "IoT integrates physical objects into internet data ecosystems.",
          "Edge computing minimizes transmission delays by computing near data generators.",
          "Blockchain guarantees immutable digital record verification."
        ]
      },
      {
        "id": "1.2",
        "title": "Computer Networks: PAN, LAN, MAN, WAN & VPN",
        "heading": "1.2 Computer Networks: PAN, LAN, MAN, WAN & VPN",
        "headingUrdu": "1.2 کمپیوٹر نیٹ ورکس کی اقسام",
        "text": "A computer network is an interconnected group of autonomous computers that share digital resources, data, and peripheral hardware:\n• Personal Area Network (PAN): Connects personal devices within a small radius of 10 meters (e.g., Bluetooth pairing of smartphone, smartwatch, and wireless earbuds).\n• Local Area Network (LAN): Connects computers situated within a localized geographical boundary such as an office room, school building, or computer lab.\n• Metropolitan Area Network (MAN): Bridges multiple LAN networks across an entire city or municipal district (e.g., citywide cable television network).\n• Wide Area Network (WAN): Spans vast geographical territories across countries or continents. The Internet is the most prominent global public WAN.\n• Virtual Private Network (VPN): Establishes a secure, encrypted digital tunnel across public networks, allowing remote users to safely access private corporate networks.",
        "paras": [
          "Networks enable hardware resource sharing such as shared printers and high-speed storage.",
          "VPNs utilize point-to-point encryption to secure sensitive enterprise communications over the public Internet."
        ]
      },
      {
        "id": "1.3",
        "title": "Transmission Media: Guided & Unguided",
        "heading": "1.3 Transmission Media: Guided & Unguided",
        "headingUrdu": "1.3 ٹرانسمیشن میڈیا: گائیڈڈ اور ان گائیڈڈ",
        "text": "Transmission media is the physical communication conduit through which data signals travel:\n1. Guided (Bounded / Wired) Media: Physical conductors that guide electromagnetic signals along a specific solid pathway:\n• Twisted Pair Cable: Insulated copper pairs twisted to reduce electromagnetic interference (EMI); widely used in RJ-45 Ethernet connections.\n• Coaxial Cable: Central copper wire enclosed by dielectric insulation, metallic shield, and plastic jacket; used in cable television.\n• Fiber Optic Cable: Hair-thin strands of ultra-pure silica glass that transmit data pulses as light beams via total internal reflection, providing immune interference and immense gigabit bandwidth.\n2. Unguided (Unbounded / Wireless) Media: Transmits electromagnetic waves through open air and space:\n• Radio Waves & Microwaves: Utilized in cellular mobile communication, satellite links, and long-range radar.\n• Wi-Fi (Wireless Fidelity) & Bluetooth: Radio-frequency standards for local wireless device connectivity.\n• Li-Fi (Light Fidelity): Ultra-fast wireless communication utilizing modulating visible light emitted by LED bulbs.",
        "paras": [
          "Fiber optic cables offer the highest transmission rates and immunity to electromagnetic interference.",
          "Wireless networks utilize open electromagnetic frequencies to provide untethered mobility."
        ]
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "The connection of computers in a small localized geographical area (such as a school lab) is called:",
          "options": [
            "LAN",
            "MAN",
            "WAN",
            "PAN"
          ],
          "answer": 0,
          "exp": "A Local Area Network (LAN) covers a small area like an office or school lab."
        },
        {
          "q": "In a communication environment with high electromagnetic noise and distortion, which transmission media is most appropriate?",
          "options": [
            "Coaxial cable",
            "Twisted pair cable",
            "Fiber optic cable",
            "TV cable"
          ],
          "answer": 2,
          "exp": "Fiber optic cables transmit light pulses rather than electrical currents and are 100% immune to electromagnetic interference."
        },
        {
          "q": "Which network type connects personal wearable devices within a range of about 10 meters?",
          "options": [
            "WAN",
            "MAN",
            "LAN",
            "PAN"
          ],
          "answer": 3,
          "exp": "A Personal Area Network (PAN) handles short-range personal device links like Bluetooth."
        },
        {
          "q": "A worldwide network of everyday physical devices connected to the Internet is called:",
          "options": [
            "Edge Computing",
            "Internet of Things (IoT)",
            "Cloud Network",
            "VPN"
          ],
          "answer": 1,
          "exp": "IoT connects everyday devices with sensors and internet connectivity."
        },
        {
          "q": "Which technology allows processing and analyzing data near the source where it is generated?",
          "options": [
            "Edge Computing",
            "Mainframe Computing",
            "Centralized Computing",
            "Grid Computing"
          ],
          "answer": 0,
          "exp": "Edge computing processes data locally at the edge of the network to minimize latency."
        },
        {
          "q": "Which network protocol creates an encrypted secure tunnel over the public Internet?",
          "options": [
            "LAN",
            "VPN",
            "MAN",
            "PAN"
          ],
          "answer": 1,
          "exp": "A Virtual Private Network (VPN) encrypts data traffic across public networks."
        },
        {
          "q": "Which wireless technology uses visible light from LEDs to transmit data at high speeds?",
          "options": [
            "Bluetooth",
            "Wi-Fi",
            "Li-Fi",
            "Infrared"
          ],
          "answer": 2,
          "exp": "Li-Fi (Light Fidelity) uses modulating visible light waves from LED bulbs."
        }
      ],
      "shortQuestions": [
        {
          "q": "1. Differentiate between LAN and WAN.",
          "qUrdu": "لوکل ایریا نیٹ ورک (LAN) اور وائیڈ ایریا نیٹ ورک (WAN) میں فرق واضح کریں۔",
          "answer": "• LAN (Local Area Network): Spans a small localized geographic area (single room, office, or school building), provides high transmission speeds (up to 1 Gbps), is owned by a single private entity, and has low setup costs.\n• WAN (Wide Area Network): Spans large geographic distances across cities, countries, or whole continents (e.g., the Internet), typically operates through leased public telecommunication channels, has higher setup costs, and lower speeds compared to LAN."
        },
        {
          "q": "2. What are the benefits of using computer networks?",
          "qUrdu": "کمپیوٹر نیٹ ورکس استعمال کرنے کے کیا فوائد ہیں؟",
          "answer": "1. Resource Sharing: Centralized sharing of expensive peripherals like high-speed laser printers and scanners.\n2. Data & File Sharing: Instantaneous collaboration and access to shared storage databases.\n3. Cost Reduction: Eliminates the need to buy duplicate hardware and individual software licenses for each PC.\n4. Instant Communication: Enables real-time email, video conferencing, and messaging."
        },
        {
          "q": "3. What is the role of a network switch?",
          "qUrdu": "نیٹ ورک سوئچ کا کیا کردار ہے؟",
          "answer": "A network switch is an intelligent hardware device that connects multiple computers and peripherals on a LAN. Unlike a simple hub that broadcasts data to every port, a switch inspects MAC addresses in incoming data frames and directs packets strictly to the designated target port, preventing network collisions and boosting speed."
        },
        {
          "q": "4. Differentiate between wired and wireless networks.",
          "qUrdu": "تار والے اور وائرلیس نیٹ ورکس میں فرق بیان کریں۔",
          "answer": "• Wired Network: Uses physical cables (Twisted Pair, Coaxial, Fiber Optic) to transmit data. Offers higher speed, greater security, and no radio interference, but requires physical cable routing and restricts mobility.\n• Wireless Network: Uses radio waves, microwaves, or infrared through open air (Wi-Fi, Bluetooth). Offers total mobility and easy setup, but is more vulnerable to interception and signal attenuation."
        },
        {
          "q": "5. List different tasks that can be performed by robots.",
          "qUrdu": "روبوٹس کے ذریعے سرانجام دیے جانے والے مختلف کاموں کی فہرست بنائیں۔",
          "answer": "1. Industrial Manufacturing: Precision automobile welding, painting, and high-speed assembly.\n2. Medicine & Surgery: Performing minimally invasive, high-precision robotic surgical procedures.\n3. Hazardous Exploration: Defusing explosive bombs, inspecting nuclear reactors, and exploring deep-sea or planetary terrain.\n4. Agriculture & Logistics: Automated crop harvesting and autonomous warehouse inventory sorting."
        },
        {
          "q": "6. Why are distributed applications (DApps) used?",
          "qUrdu": "ڈسٹری بیوٹڈ ایپلی کیشنز (DApps) کیوں استعمال کی جاتی ہیں؟",
          "answer": "Distributed applications run across a decentralized peer-to-peer network of computers rather than a single centralized server. They eliminate single points of failure, resist unauthorized government censorship, ensure data privacy, and maintain operational reliability even if some individual nodes go offline."
        },
        {
          "q": "7. What is the purpose of blockchain technology?",
          "qUrdu": "بلاک چین ٹیکنالوجی کا کیا مقصد ہے؟",
          "answer": "Blockchain is an immutable, distributed digital ledger that records transactions across thousands of computers. Its primary purpose is to provide transparent, tamper-proof, and trustless recordkeeping without relying on central financial intermediaries, securing cryptocurrencies, smart contracts, and identity verification."
        },
        {
          "q": "8. Describe 3D holographic imaging.",
          "qUrdu": "تھری ڈی ہولوگرافک امیجنگ کی وضاحت کریں۔",
          "answer": "3D holographic imaging is a laser-based optical projection technique that records the light wave interference pattern scattered from an object. When illuminated properly, it reproduces a realistic, freestanding 3D visual image with depth and parallax that can be viewed from all angles without special 3D glasses."
        }
      ],
      "longQuestions": [
        {
          "q": "1. Explain the classification of computer networks based on geographical coverage (PAN, LAN, MAN, WAN).",
          "qUrdu": "جغرافیائی رقبے کی بنیاد پر کمپیوٹر نیٹ ورکس کی اقسام (PAN, LAN, MAN, WAN) کی تفصیلی وضاحت کریں۔",
          "answer": "1. Personal Area Network (PAN): Radius of under 10 meters. Connects personal devices like phones, tablets, smartwatches, and headphones via Bluetooth or Wi-Fi Direct.\n2. Local Area Network (LAN): Covers a single room, lab, or building. High data speeds (up to 10 Gbps), owned and managed privately by a school or organization using Ethernet cables or Wi-Fi.\n3. Metropolitan Area Network (MAN): Bridges multiple LANs across a town or city (up to 50 km). Typical examples include municipal cable TV networks and university multi-campus networks.\n4. Wide Area Network (WAN): Spans whole countries, continents, or the entire globe. Composed of interconnected routers, satellite relays, and undersea fiber cables. The Internet is the world's largest WAN."
        },
        {
          "q": "2. Compare guided (wired) and unguided (wireless) transmission media with practical examples.",
          "qUrdu": "گائیڈڈ (تار والے) اور ان گائیڈڈ (وائرلیس) ٹرانسمیشن میڈیا کا تقابل عملی مثالوں کے ساتھ کریں۔",
          "answer": "• Guided Media (Wired):\n1. Twisted Pair: Inexpensive copper cables with twisted pairs to cancel cross-talk; used in school computer labs.\n2. Coaxial Cable: High shielding against noise; used for cable TV and broadband modems.\n3. Fiber Optic: Glass core transmitting optical pulses via total internal reflection; provides gigabit speeds across long distances without interference.\n• Unguided Media (Wireless):\n1. Radio Waves: Omnidirectional waves penetrating walls; used in FM radio, Wi-Fi, and cellular communication.\n2. Microwaves: High-frequency directional signals requiring line-of-sight towers; used for mobile base stations and radar.\n3. Infrared: Short-range line-of-sight signals; used in television remote controls.\n4. Satellite Communication: Ground stations send microwave signals to geostationary satellites orbiting 36,000 km in space, facilitating global TV and GPS navigation."
        }
      ],
      "structuredQuestions": [],
      "projectWork": {
        "title": "School Lab Network Topology Design",
        "description": "Design a complete LAN layout for a school computer lab containing 25 client PCs, 1 server, and 1 shared network printer using Star Topology connected via a 32-port Fast Ethernet switch and Cat6 twisted pair cabling.",
        "materials": [
          "Diagramming paper",
          "Ruler",
          "Network design icons"
        ]
      }
    },
    "slos": [
      {
        "code": "CS-08-01",
        "text": "Identify emerging technologies: IoT, AI, ML, 5G, robotics, blockchain, holographic imaging",
        "cognitiveLevel": "Knowledge"
      },
      {
        "code": "CS-08-02",
        "text": "Describe and differentiate between PAN, LAN, MAN, WAN, and VPN",
        "cognitiveLevel": "Understanding"
      },
      {
        "code": "CS-08-03",
        "text": "Compare physical transmission media: twisted pair, coaxial, fiber optics vs unguided wireless",
        "cognitiveLevel": "Analysis"
      }
    ],
    "diagrams": [
      {
        "title": "Network Topologies & Types",
        "description": "Star, Ring, Bus topologies and PAN, LAN, MAN, WAN geographic scales."
      },
      {
        "title": "Fiber Optic Internal Reflection",
        "description": "Core and cladding demonstrating total internal reflection of laser signals."
      }
    ],
    "definitions": [
      {
        "term": "Internet of Things (IoT)",
        "urdu": "انٹرنیٹ آف تھنگز",
        "def": "A network of physical devices with sensors and software communicating wirelessly over the Internet."
      },
      {
        "term": "Local Area Network (LAN)",
        "urdu": "لوکل ایریا نیٹ ورک",
        "def": "A computer network covering a small localized geographical area like a school lab or office."
      },
      {
        "term": "Fiber Optic Cable",
        "urdu": "فائبر آپٹک کیبل",
        "def": "A high-speed communication cable containing glass strands transmitting data as light pulses."
      },
      {
        "term": "Blockchain",
        "urdu": "بلاک چین",
        "def": "A decentralized, distributed digital ledger recording transactions securely across a peer-to-peer network."
      }
    ],
    "glossary": [
      {
        "unit": 1,
        "term": "Adware",
        "word": "Adware",
        "urdu": "ایڈویئر",
        "pashto": "ایډویر",
        "def": "Malware that automatically displays or downloads unwanted advertisements to a device.",
        "meaning": "Malware that automatically displays or downloads unwanted advertisements to a device."
      },
      {
        "unit": 1,
        "term": "Artificial Intelligence (AI)",
        "word": "Artificial Intelligence (AI)",
        "urdu": "مصنوعی ذہانت",
        "pashto": "مصنوعي هوښیارتیا",
        "def": "The simulation of human intelligence processes by computer systems and algorithms.",
        "meaning": "The simulation of human intelligence processes by computer systems and algorithms."
      },
      {
        "unit": 1,
        "term": "Blockchain",
        "word": "Blockchain",
        "urdu": "بلاک چین",
        "pashto": "بلاک چين",
        "def": "A decentralized, distributed digital ledger recording transactions securely across a network.",
        "meaning": "A decentralized, distributed digital ledger recording transactions securely across a network."
      },
      {
        "unit": 1,
        "term": "Edge Computing",
        "word": "Edge Computing",
        "urdu": "ایج کمپیوٹنگ",
        "pashto": "ایج کمپیوټنګ",
        "def": "Distributed computing paradigm that processes data close to the source where it is generated.",
        "meaning": "Distributed computing paradigm that processes data close to the source where it is generated."
      },
      {
        "unit": 1,
        "term": "Embedded System",
        "word": "Embedded System",
        "urdu": "ایمبیڈڈ سسٹم",
        "pashto": "امبیډډ سیسټم",
        "def": "A dedicated computer hardware system designed to perform specific control functions inside a machine.",
        "meaning": "A dedicated computer hardware system designed to perform specific control functions inside a machine."
      },
      {
        "unit": 1,
        "term": "Fiber Optic Cable",
        "word": "Fiber Optic Cable",
        "urdu": "فائبر آپٹک کیبل",
        "pashto": "فایبر اپټیک کیبل",
        "def": "A high-speed transmission cable that conveys data pulses as light through ultra-thin glass fibers.",
        "meaning": "A high-speed transmission cable that conveys data pulses as light through ultra-thin glass fibers."
      },
      {
        "unit": 1,
        "term": "Internet of Things (IoT)",
        "word": "Internet of Things (IoT)",
        "urdu": "انٹرنیٹ آف تھنگز",
        "pashto": "د شیانو انټرنیټ",
        "def": "A global network of physical devices embedded with sensors connecting wirelessly over the Internet.",
        "meaning": "A global network of physical devices embedded with sensors connecting wirelessly over the Internet."
      },
      {
        "unit": 1,
        "term": "Local Area Network (LAN)",
        "word": "Local Area Network (LAN)",
        "urdu": "لوکل ایریا نیٹ ورک",
        "pashto": "سیمه ییزه شبکه",
        "def": "A computer network spanning a small localized geographical area like an office or school lab.",
        "meaning": "A computer network spanning a small localized geographical area like an office or school lab."
      },
      {
        "unit": 1,
        "term": "Virtual Private Network (VPN)",
        "word": "Virtual Private Network (VPN)",
        "urdu": "ورچوئل پرائیویٹ نیٹ ورک",
        "pashto": "مجازي خصوصي شبکه",
        "def": "An encrypted connection over the public Internet providing secure communication to a private network.",
        "meaning": "An encrypted connection over the public Internet providing secure communication to a private network."
      },
      {
        "unit": 1,
        "term": "Wide Area Network (WAN)",
        "word": "Wide Area Network (WAN)",
        "urdu": "وائیڈ ایریا نیٹ ورک",
        "pashto": "پراخه شبکه",
        "def": "A telecommunications network spanning large geographical areas across cities or whole countries.",
        "meaning": "A telecommunications network spanning large geographical areas across cities or whole countries."
      }
    ],
    "topics": [
      {
        "id": "1.1",
        "title": "Emerging Technologies in ICT",
        "heading": "1.1 Emerging Technologies in ICT",
        "headingUrdu": "1.1 آئی سی ٹی میں جدید ابھرتی ہوئی ٹیکنالوجیز",
        "text": "Emerging technologies represent progressive advancements in ICT that transform everyday life, industry, and education:\n• Internet of Things (IoT): A worldwide network of physical devices (appliances, smart meters, vehicles) embedded with sensors and software that communicate wirelessly over the Internet without human intervention.\n• Embedded Systems: Dedicated computer hardware systems running specialized microprocessors and firmware to control specific machines (appliances, medical devices, automotive control units).\n• Edge Computing: A distributed computing architecture that processes and analyzes data directly at the peripheral source where it is generated rather than in a distant centralized cloud server, reducing latency in smart city traffic and real-time robotics.\n• 5G Technology: Fifth-generation cellular network standard providing ultra-high data bandwidth (up to 10 Gbps), massive device connectivity, and near-zero latency.\n• Artificial Intelligence (AI) & Machine Learning (ML): Algorithms that enable computer systems to simulate human intelligence, learn from data patterns, make predictive decisions, and automate complex tasks.\n• Robotics & Drones: Programmable electromechanical machines performing hazardous, precise, or repetitive tasks in manufacturing, surgery, agriculture, and defense.\n• Blockchain & Distributed Applications (DApps): Decentralized, cryptographically secured distributed ledgers that record transparent, tamper-proof transaction histories across peer-to-peer nodes without central authorities.",
        "paras": [
          "IoT integrates physical objects into internet data ecosystems.",
          "Edge computing minimizes transmission delays by computing near data generators.",
          "Blockchain guarantees immutable digital record verification."
        ]
      },
      {
        "id": "1.2",
        "title": "Computer Networks: PAN, LAN, MAN, WAN & VPN",
        "heading": "1.2 Computer Networks: PAN, LAN, MAN, WAN & VPN",
        "headingUrdu": "1.2 کمپیوٹر نیٹ ورکس کی اقسام",
        "text": "A computer network is an interconnected group of autonomous computers that share digital resources, data, and peripheral hardware:\n• Personal Area Network (PAN): Connects personal devices within a small radius of 10 meters (e.g., Bluetooth pairing of smartphone, smartwatch, and wireless earbuds).\n• Local Area Network (LAN): Connects computers situated within a localized geographical boundary such as an office room, school building, or computer lab.\n• Metropolitan Area Network (MAN): Bridges multiple LAN networks across an entire city or municipal district (e.g., citywide cable television network).\n• Wide Area Network (WAN): Spans vast geographical territories across countries or continents. The Internet is the most prominent global public WAN.\n• Virtual Private Network (VPN): Establishes a secure, encrypted digital tunnel across public networks, allowing remote users to safely access private corporate networks.",
        "paras": [
          "Networks enable hardware resource sharing such as shared printers and high-speed storage.",
          "VPNs utilize point-to-point encryption to secure sensitive enterprise communications over the public Internet."
        ]
      },
      {
        "id": "1.3",
        "title": "Transmission Media: Guided & Unguided",
        "heading": "1.3 Transmission Media: Guided & Unguided",
        "headingUrdu": "1.3 ٹرانسمیشن میڈیا: گائیڈڈ اور ان گائیڈڈ",
        "text": "Transmission media is the physical communication conduit through which data signals travel:\n1. Guided (Bounded / Wired) Media: Physical conductors that guide electromagnetic signals along a specific solid pathway:\n• Twisted Pair Cable: Insulated copper pairs twisted to reduce electromagnetic interference (EMI); widely used in RJ-45 Ethernet connections.\n• Coaxial Cable: Central copper wire enclosed by dielectric insulation, metallic shield, and plastic jacket; used in cable television.\n• Fiber Optic Cable: Hair-thin strands of ultra-pure silica glass that transmit data pulses as light beams via total internal reflection, providing immune interference and immense gigabit bandwidth.\n2. Unguided (Unbounded / Wireless) Media: Transmits electromagnetic waves through open air and space:\n• Radio Waves & Microwaves: Utilized in cellular mobile communication, satellite links, and long-range radar.\n• Wi-Fi (Wireless Fidelity) & Bluetooth: Radio-frequency standards for local wireless device connectivity.\n• Li-Fi (Light Fidelity): Ultra-fast wireless communication utilizing modulating visible light emitted by LED bulbs.",
        "paras": [
          "Fiber optic cables offer the highest transmission rates and immunity to electromagnetic interference.",
          "Wireless networks utilize open electromagnetic frequencies to provide untethered mobility."
        ]
      }
    ]
  },
  {
    "number": 2,
    "id": "unit-2",
    "title": "Digital Skills",
    "titleUrdu": "ڈیجیٹل مہارتیں",
    "pageRange": "pp. 18–33",
    "source": "KPK Textbook Board (KPTBB) Grade 8 Computer Science (SNC 2022)",
    "englishSummary": "Unit 2 focuses on spreadsheet applications in Microsoft Excel. It covers workbook navigation, cell referencing (relative and absolute), entering labels and numeric data, arithmetic formulas starting with '=' sign, statistical functions (SUM, AVERAGE, MAX, MIN, COUNT, IF), cell formatting, and creating visual charts.",
    "urduSummary": "یونٹ 2 مائیکروسافٹ ایکسل میں اسپریڈشیٹ ایپلی کیشنز پر مبنی ہے۔ اس میں ورک بک کے عناصر، سیل ایڈریس، ڈیٹا کا اندراج، مساوات کے نشان '=' سے شروع ہونے والے فارمولے، ریاضیاتی اور شماریاتی فنکشنز (SUM, AVERAGE, MAX, MIN, COUNT, IF)، سیل فارمیٹنگ، اور چارٹس کی تیاری سکھائی گئی ہے۔",
    "sections": [
      {
        "id": "2.1",
        "title": "Spreadsheet Concepts & Excel Interface",
        "heading": "2.1 Spreadsheet Concepts & Excel Interface",
        "headingUrdu": "2.1 اسپریڈ شیٹ کے بنیادی تصورات اور ایکسل انٹرفیس",
        "text": "A spreadsheet is an interactive application program for organization, calculation, and analysis of data in tabular format.\n• Structure: An Excel document is called a Workbook, which contains multiple Worksheets. Each worksheet is composed of a grid of horizontal Rows (numbered 1, 2, 3...) and vertical Columns (labeled with letters A, B, C...).\n• Cell: The rectangular intersection of a row and a column. Each cell has a unique Cell Address or Reference (e.g., A1, C15).\n• Active Cell: The currently highlighted cell ready to accept keyboard data entry, indicated by a bold border.",
        "paras": [
          "Rows are identified by numbers while columns are designated by letters.",
          "The active cell's address is prominently displayed in the Name Box."
        ]
      },
      {
        "id": "2.2",
        "title": "Formulas & Built-in Functions in Excel",
        "heading": "2.2 Formulas & Built-in Functions in Excel",
        "headingUrdu": "2.2 ایکسل فارمولے اور بلٹ ان فنکشنز",
        "text": "• Formulas: Mathematical expressions created by the user to perform calculations on cell values. Every formula MUST begin with an equals sign (=), followed by cell references and operators (e.g., =A1+B1, =C5*D5).\n• Built-in Functions: Pre-defined formulas in Excel that simplify complex calculations:\n1. =SUM(range): Computes the arithmetic total of numbers in a range (e.g., =SUM(B2:B10)).\n2. =AVERAGE(range): Calculates the arithmetic mean value.\n3. =MAX(range): Returns the largest numeric value in a specified dataset.\n4. =MIN(range): Returns the lowest numeric value in a specified dataset.\n5. =COUNT(range): Counts the total number of cells containing numerical data.\n6. =IF(condition, value_if_true, value_if_false): Evaluates a logical condition and returns one value if true and another if false (e.g., =IF(D2>=40, \"Pass\", \"Fail\")).",
        "paras": [
          "Formulas must always commence with '=' so Excel evaluates rather than stores text.",
          "Functions accept cell ranges separated by colons (e.g., B2:B20)."
        ]
      },
      {
        "id": "2.3",
        "title": "Data Formatting & Charts",
        "heading": "2.3 Data Formatting & Charts",
        "headingUrdu": "2.3 ڈیٹا فارمیٹنگ اور چارٹس",
        "text": "• Formatting: Enhances visual readability by modifying fonts, cell borders, shading colors, number decimal places, currency symbols, and text alignments.\n• Charts: Visual graphic representations of numerical data that assist in recognizing trends, proportions, and patterns:\n1. Column/Bar Charts: Best for comparing individual categorical items.\n2. Line Charts: Ideal for visualizing continuous trends over time.\n3. Pie Charts: Illustrates proportional percentages of parts to a whole.",
        "paras": [
          "Proper data formatting makes complex financial and academic sheets easy to read.",
          "Charts graphically communicate numeric findings effectively."
        ]
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "The basic unit of a worksheet into which you enter data in Excel is called a:",
          "options": [
            "Cell",
            "Table",
            "Box",
            "Column"
          ],
          "answer": 0,
          "exp": "A cell is the fundamental rectangular unit at the intersection of a column and a row."
        },
        {
          "q": "Which Microsoft Excel function is used to find the highest value in a given range?",
          "options": [
            "SUM()",
            "AVERAGE()",
            "MAX()",
            "MIN()"
          ],
          "answer": 2,
          "exp": "MAX() finds and displays the greatest numeric value in the range."
        },
        {
          "q": "Every formula in Microsoft Excel must start with which symbol?",
          "options": [
            "-",
            "=",
            "+",
            "*"
          ],
          "answer": 1,
          "exp": "Excel formulas strictly require an equals sign (=) as the first character."
        },
        {
          "q": "Which Microsoft Excel function checks a condition and returns different results?",
          "options": [
            "SUM()",
            "COUNT()",
            "IF()",
            "MIN()"
          ],
          "answer": 2,
          "exp": "The logical IF() function tests conditions (true/false) to return corresponding outputs."
        },
        {
          "q": "In Excel, a group of selected contiguous cells (like B2 to B10) is called a:",
          "options": [
            "Block",
            "Range",
            "Cluster",
            "Array"
          ],
          "answer": 1,
          "exp": "A selection of two or more cells is designated as a cell range."
        }
      ],
      "shortQuestions": [
        {
          "q": "1. What is the difference between a workbook and a worksheet in Microsoft Excel?",
          "qUrdu": "مائیکروسافٹ ایکسل میں ورک بک اور ورک شیٹ میں کیا فرق ہے؟",
          "answer": "A workbook is the complete Excel file (saved with .xlsx extension) that serves as a binder containing one or more worksheets. A worksheet is an individual grid page within the workbook composed of rows and columns where data is entered and calculated."
        },
        {
          "q": "2. Why must every formula in Microsoft Excel begin with an equals sign (=)?",
          "qUrdu": "مائیکروسافٹ ایکسل میں ہر فارمولا برابر کے نشان (=) سے کیوں شروع ہونا چاہیے؟",
          "answer": "The equals sign (=) instructs Excel's calculation engine that the entered text is a mathematical or logical expression to be evaluated. Without the '=' prefix, Excel treats the contents as plain static text or a label and will not compute an answer."
        },
        {
          "q": "3. Explain the purpose of the AVERAGE and COUNT functions in Excel.",
          "qUrdu": "ایکسل میں AVERAGE اور COUNT فنکشنز کا مقصد بیان کریں۔",
          "answer": "• AVERAGE(): Adds all numbers in a specified range and divides the sum by the count of numeric items to determine the arithmetic mean.\n• COUNT(): Scans a specified cell range and counts how many cells contain numeric values, ignoring blank cells and plain text."
        },
        {
          "q": "4. What is a cell reference? Differentiate between Relative and Absolute references.",
          "qUrdu": "سیل ریفرنس کیا ہے؟ ریلیٹیو اور ایبسولیوٹ ریفرنس میں فرق واضح کریں۔",
          "answer": "A cell reference identifies a cell's coordinates by its column letter and row number (e.g., B4).\n• Relative Reference (e.g., B4): Changes automatically when a formula is copied to another cell relative to the new position.\n• Absolute Reference (e.g., $B$4): Uses dollar signs ($) to lock the row and column so coordinates never shift when copied."
        }
      ],
      "longQuestions": [
        {
          "q": "1. Describe the key built-in statistical and mathematical functions in Microsoft Excel with syntax and examples.",
          "qUrdu": "مائیکروسافٹ ایکسل کے اہم شماریاتی اور ریاضیاتی فنکشنز کی ساخت اور مثالوں کے ساتھ وضاحت کریں۔",
          "answer": "1. SUM(): Calculates the grand total of numeric values. Syntax: =SUM(B2:B8). Example: =SUM(10, 20, 30) returns 60.\n2. AVERAGE(): Calculates the arithmetic mean. Syntax: =AVERAGE(C2:C8). Example: =AVERAGE(10, 20, 30) returns 20.\n3. MAX(): Returns the maximum value. Syntax: =MAX(D2:D15). Example: =MAX(45, 92, 12) returns 92.\n4. MIN(): Returns the lowest value. Syntax: =MIN(D2:D15). Example: =MIN(45, 92, 12) returns 12.\n5. IF(): Logical decision function. Syntax: =IF(logical_test, value_if_true, value_if_false). Example: =IF(E2>=50, \"Pass\", \"Fail\")."
        }
      ],
      "structuredQuestions": [
        {
          "q": "Activity 1: Pakistan vs. New Zealand Cricket Batsmen Score Sheet",
          "text": "Consider the worksheet containing scores of five Pakistani batsmen:\n- Babar Azam: Matches (57, 34, 105)\n- Fakhar Zaman: Matches (42, 34, 85)\n- Mohammad Hafeez: Matches (85, 65, 45)\n- Sarfaraz Ahmed: Matches (12, 45, 41)\n- Shoaib Malik: Matches (75, 49, 10)\nCalculate:\n1. Total score for Babar Azam\n2. Average score for Babar Azam\n3. Maximum match score in the series\n4. Minimum match score in the series",
          "solution": "Excel Formulas:\n1. Total Score for Babar Azam: =SUM(C3:E3) -> 57 + 34 + 105 = 196\n2. Average Score for Babar Azam: =AVERAGE(C3:E3) -> 196 / 3 = 65.33\n3. Maximum Score in Series: =MAX(C3:E7) -> 105 (Babar Azam match 3)\n4. Minimum Score in Series: =MIN(C3:E7) -> 10 (Shoaib Malik match 3)"
        }
      ],
      "projectWork": {
        "title": "Student Annual Examination Marksheet in Excel",
        "description": "Construct an automated student marksheet for 10 students across 5 academic subjects (English, Urdu, Math, Science, Computer). Use formulas for Total Marks (=SUM), Percentage (=(Total/500)*100), and Grade / Pass-Fail status using nested =IF statements.",
        "materials": [
          "Computer with MS Excel or LibreOffice Calc"
        ]
      }
    },
    "slos": [
      {
        "code": "CS-08-04",
        "text": "Navigate and utilize workbook and worksheet components in MS Excel",
        "cognitiveLevel": "Knowledge"
      },
      {
        "code": "CS-08-05",
        "text": "Construct arithmetic formulas using cell addresses and the equals sign",
        "cognitiveLevel": "Application"
      },
      {
        "code": "CS-08-06",
        "text": "Apply built-in functions: SUM, AVERAGE, MAX, MIN, COUNT, and logical IF",
        "cognitiveLevel": "Application"
      }
    ],
    "diagrams": [
      {
        "title": "Excel Grid Anatomy",
        "description": "Formula Bar, Name Box, Column headers, Row headers, and Active Cell border."
      },
      {
        "title": "Cricket Score Sheet Layout",
        "description": "Tabular sheet showing batsman names, 3 match scores, Total column, and Average column."
      }
    ],
    "definitions": [
      {
        "term": "Cell",
        "urdu": "سیل",
        "def": "The intersection of a row and a column in a worksheet where data is entered."
      },
      {
        "term": "Formula",
        "urdu": "فارمولا",
        "def": "A mathematical equation created in Excel that always begins with an equals sign (=)."
      },
      {
        "term": "Function",
        "urdu": "فنکشن",
        "def": "A pre-written built-in formula in Excel that performs specific calculations (e.g., SUM, AVERAGE)."
      },
      {
        "term": "Cell Range",
        "urdu": "سیل رینج",
        "def": "A collection or block of two or more selected cells in a worksheet."
      }
    ],
    "glossary": [
      {
        "unit": 2,
        "term": "Active Cell",
        "word": "Active Cell",
        "urdu": "ایکٹو سیل",
        "pashto": "فعاله حجره (سیل)",
        "def": "The currently selected cell in a spreadsheet highlighted with a thick border.",
        "meaning": "The currently selected cell in a spreadsheet highlighted with a thick border."
      },
      {
        "unit": 2,
        "term": "Cell Address",
        "word": "Cell Address",
        "urdu": "سیل کا پتہ",
        "pashto": "د سیل پته",
        "def": "The unique coordinate location of a cell formed by its column letter and row number (e.g., B4).",
        "meaning": "The unique coordinate location of a cell formed by its column letter and row number (e.g., B4)."
      },
      {
        "unit": 2,
        "term": "Cell Range",
        "word": "Cell Range",
        "urdu": "سیل رینج",
        "pashto": "د سیلونو سلسله",
        "def": "A rectangular block of two or more contiguous cells selected together.",
        "meaning": "A rectangular block of two or more contiguous cells selected together."
      },
      {
        "unit": 2,
        "term": "Formula",
        "word": "Formula",
        "urdu": "فارمولا",
        "pashto": "فارمولا",
        "def": "A mathematical mathematical expression in Excel starting with an equals sign (=).",
        "meaning": "A mathematical mathematical expression in Excel starting with an equals sign (=)."
      },
      {
        "unit": 2,
        "term": "Function",
        "word": "Function",
        "urdu": "فنکشن",
        "pashto": "فنکشن",
        "def": "A built-in pre-coded mathematical or logical tool in Excel (e.g., SUM, AVERAGE).",
        "meaning": "A built-in pre-coded mathematical or logical tool in Excel (e.g., SUM, AVERAGE)."
      },
      {
        "unit": 2,
        "term": "Workbook",
        "word": "Workbook",
        "urdu": "ورک بک",
        "pashto": "ورک بک",
        "def": "An Excel file containing one or more interactive worksheets.",
        "meaning": "An Excel file containing one or more interactive worksheets."
      },
      {
        "unit": 2,
        "term": "Worksheet",
        "word": "Worksheet",
        "urdu": "ورک شیٹ",
        "pashto": "ورک شیټ",
        "def": "A single page grid of rows and columns in an Excel workbook.",
        "meaning": "A single page grid of rows and columns in an Excel workbook."
      }
    ],
    "topics": [
      {
        "id": "2.1",
        "title": "Spreadsheet Concepts & Excel Interface",
        "heading": "2.1 Spreadsheet Concepts & Excel Interface",
        "headingUrdu": "2.1 اسپریڈ شیٹ کے بنیادی تصورات اور ایکسل انٹرفیس",
        "text": "A spreadsheet is an interactive application program for organization, calculation, and analysis of data in tabular format.\n• Structure: An Excel document is called a Workbook, which contains multiple Worksheets. Each worksheet is composed of a grid of horizontal Rows (numbered 1, 2, 3...) and vertical Columns (labeled with letters A, B, C...).\n• Cell: The rectangular intersection of a row and a column. Each cell has a unique Cell Address or Reference (e.g., A1, C15).\n• Active Cell: The currently highlighted cell ready to accept keyboard data entry, indicated by a bold border.",
        "paras": [
          "Rows are identified by numbers while columns are designated by letters.",
          "The active cell's address is prominently displayed in the Name Box."
        ]
      },
      {
        "id": "2.2",
        "title": "Formulas & Built-in Functions in Excel",
        "heading": "2.2 Formulas & Built-in Functions in Excel",
        "headingUrdu": "2.2 ایکسل فارمولے اور بلٹ ان فنکشنز",
        "text": "• Formulas: Mathematical expressions created by the user to perform calculations on cell values. Every formula MUST begin with an equals sign (=), followed by cell references and operators (e.g., =A1+B1, =C5*D5).\n• Built-in Functions: Pre-defined formulas in Excel that simplify complex calculations:\n1. =SUM(range): Computes the arithmetic total of numbers in a range (e.g., =SUM(B2:B10)).\n2. =AVERAGE(range): Calculates the arithmetic mean value.\n3. =MAX(range): Returns the largest numeric value in a specified dataset.\n4. =MIN(range): Returns the lowest numeric value in a specified dataset.\n5. =COUNT(range): Counts the total number of cells containing numerical data.\n6. =IF(condition, value_if_true, value_if_false): Evaluates a logical condition and returns one value if true and another if false (e.g., =IF(D2>=40, \"Pass\", \"Fail\")).",
        "paras": [
          "Formulas must always commence with '=' so Excel evaluates rather than stores text.",
          "Functions accept cell ranges separated by colons (e.g., B2:B20)."
        ]
      },
      {
        "id": "2.3",
        "title": "Data Formatting & Charts",
        "heading": "2.3 Data Formatting & Charts",
        "headingUrdu": "2.3 ڈیٹا فارمیٹنگ اور چارٹس",
        "text": "• Formatting: Enhances visual readability by modifying fonts, cell borders, shading colors, number decimal places, currency symbols, and text alignments.\n• Charts: Visual graphic representations of numerical data that assist in recognizing trends, proportions, and patterns:\n1. Column/Bar Charts: Best for comparing individual categorical items.\n2. Line Charts: Ideal for visualizing continuous trends over time.\n3. Pie Charts: Illustrates proportional percentages of parts to a whole.",
        "paras": [
          "Proper data formatting makes complex financial and academic sheets easy to read.",
          "Charts graphically communicate numeric findings effectively."
        ]
      }
    ]
  },
  {
    "number": 3,
    "id": "unit-3",
    "title": "Algorithmic Thinking and Problem Solving",
    "titleUrdu": "الگورتھمک سوچ اور مسئلہ حل کرنا",
    "pageRange": "pp. 34–47",
    "source": "KPK Textbook Board (KPTBB) Grade 8 Computer Science (SNC 2022)",
    "englishSummary": "Unit 3 develops computational thinking and problem-solving methodologies: problem definition and decomposition into manageable sub-problems, algorithms, flowcharting with standard ANSI symbols, pseudocode conventions, sequential logic, conditional decision branching (IF-THEN-ELSE), and iteration loops.",
    "urduSummary": "یونٹ 3 مسائل کو حل کرنے کی الگورتھمک تکنیک سکھاتا ہے: مسئلے کی تعریف، مسئلے کو چھوٹے حصوں میں تقسیم کرنا (ڈی کمپوزیشن)، الگورتھم کی تیاری، معیاری علامات کے ساتھ فلو چارٹس، سیوڈو کوڈ، ترتیب وار ہدایات، شرطی فیصلے (IF-THEN-ELSE)، اور تکراری لوپس (Loops)۔",
    "sections": [
      {
        "id": "3.1",
        "title": "Problem Solving & Problem Decomposition",
        "heading": "3.1 Problem Solving & Problem Decomposition",
        "headingUrdu": "3.1 مسئلہ حل کرنا اور مسئلے کی تقسیم",
        "text": "Problem solving is the systematic process of identifying an issue, designing step-by-step solutions, and executing them efficiently.\n• Decomposition: Breaking down a large, complicated problem into smaller, simpler, and more manageable sub-problems (modules). Each sub-problem can then be solved independently.\n• Pattern Recognition: Identifying similarities between problems to apply previously proven solutions.\n• Abstraction: Filtering out irrelevant background details and focusing exclusively on core essential factors.",
        "paras": [
          "Decomposition makes complex programming tasks approachable.",
          "Computational thinking comprises decomposition, pattern recognition, abstraction, and algorithms."
        ]
      },
      {
        "id": "3.2",
        "title": "Algorithms & Flowcharts",
        "heading": "3.2 Algorithms & Flowcharts",
        "headingUrdu": "3.2 الگورتھم اور فلو چارٹس",
        "text": "• Algorithm: A finite sequence of well-defined, step-by-step instructions written in natural language to solve a specific problem or perform a computation.\n• Flowchart: A graphical representation of an algorithm using standard geometrical shapes linked by flow lines:\n1. Oval (Terminal): Start and End points.\n2. Parallelogram: Input and Output operations.\n3. Rectangle: Processing step (calculations, assignments).\n4. Diamond: Decision making (conditional question yielding True/False or Yes/No paths).\n5. Flow lines / Arrows: Indicate directional sequence of execution.\n6. Circle: On-page connector.",
        "paras": [
          "Algorithms must be clear, unambiguous, and guarantee termination in finite steps.",
          "Flowcharts visually illuminate decision branches and iteration cycles."
        ]
      },
      {
        "id": "3.3",
        "title": "Pseudocode & Control Structures",
        "heading": "3.3 Pseudocode & Control Structures",
        "headingUrdu": "3.3 سیوڈو کوڈ اور کنٹرول سٹرکچرز",
        "text": "• Pseudocode: An informal, high-level plain English representation of a computer program's logic, independent of specific programming language syntax.\n• Control Structures:\n1. Sequence: Executing statements strictly one after another in order.\n2. Selection (Decision): Choosing alternate execution paths using IF-THEN-ELSE or SWITCH.\n3. Iteration (Repetition / Loop): Repeating a block of code multiple times while a condition remains True (e.g., WHILE, FOR loops).",
        "paras": [
          "Pseudocode bridges conceptual algorithm design and computer coding.",
          "Control structures dictate the flow of instruction execution."
        ]
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "Computers solve complex problems by performing millions of operations in fractions of a second called:",
          "options": [
            "Nanoseconds",
            "Minutes",
            "Days",
            "Weeks"
          ],
          "answer": 0,
          "exp": "Modern computer microprocessors operate at gigahertz speeds, executing operations in nanoseconds."
        },
        {
          "q": "A graphical representation of an algorithm using standardized geometric shapes is called a:",
          "options": [
            "Pie chart",
            "Bar chart",
            "Flowchart",
            "Graph"
          ],
          "answer": 2,
          "exp": "A flowchart diagrams algorithmic logic using shapes like diamonds, rectangles, and ovals."
        },
        {
          "q": "Algorithms designed in natural language are converted into which form for machine execution?",
          "options": [
            "Flowchart",
            "Program",
            "Pseudocode",
            "English text"
          ],
          "answer": 1,
          "exp": "A computer executes programs written in programming languages compiled into machine instructions."
        },
        {
          "q": "Which flowchart symbol is used for decision making or conditional branching?",
          "options": [
            "Rectangle",
            "Oval",
            "Diamond",
            "Parallelogram"
          ],
          "answer": 2,
          "exp": "A diamond symbol evaluates a conditional test and branches into Yes/No paths."
        },
        {
          "q": "Breaking down a complex problem into smaller manageable parts is known as:",
          "options": [
            "Decomposition",
            "Abstraction",
            "Iteration",
            "Compilation"
          ],
          "answer": 0,
          "exp": "Decomposition divides complex systems into simple sub-problems."
        }
      ],
      "shortQuestions": [
        {
          "q": "1. What is an algorithm? State its essential properties.",
          "qUrdu": "الگورتھم کیا ہے؟ اس کی بنیادی خصوصیات بیان کریں۔",
          "answer": "An algorithm is a finite, ordered sequence of unambiguous instructions designed to solve a specific problem. Essential properties include:\n1. Finiteness: It must always terminate after a finite number of steps.\n2. Definiteness: Every step must be clear and precisely defined.\n3. Input & Output: Takes zero or more inputs and produces at least one output.\n4. Effectiveness: Steps must be feasible and practically executable."
        },
        {
          "q": "2. Draw and describe the functions of standard flowchart symbols.",
          "qUrdu": "فلو چارٹ کی معیاری علامات بنائیں اور ان کے افعال بیان کریں۔",
          "answer": "1. Oval (Terminal): Marks the START or STOP point.\n2. Parallelogram: Represents Input from the user (e.g., Read N) or Output to the screen (e.g., Print Sum).\n3. Rectangle: Represents Processing tasks (e.g., Sum = A + B).\n4. Diamond: Represents Decision making (e.g., Is N > 0?).\n5. Arrow / Flowline: Shows the directional path of data execution."
        },
        {
          "q": "3. What is pseudocode and why is it useful?",
          "qUrdu": "سیوڈو کوڈ کیا ہے اور یہ کیوں مفید ہے؟",
          "answer": "Pseudocode is an informal, language-agnostic description of program logic written in simplified English keywords (e.g., IF, ELSE, PRINT, WHILE). It is useful because it allows programmers to formulate, refine, and debug logic without worrying about the strict punctuation and syntax rules of specific programming languages."
        },
        {
          "q": "4. Differentiate between Selection and Iteration control structures.",
          "qUrdu": "سلیکشن (انتخاب) اور اِٹریشن (تکرار) کنٹرول سٹرکچرز میں فرق واضح کریں۔",
          "answer": "• Selection (Decision): Evaluates a conditional condition once to pick which path to take (e.g., IF age >= 18 THEN Print \"Eligible\" ELSE Print \"Not eligible\").\n• Iteration (Loop): Repeats a block of code multiple times continuously as long as a condition evaluates to True (e.g., WHILE counter <= 10 DO counter = counter + 1)."
        }
      ],
      "longQuestions": [
        {
          "q": "1. Explain the four pillars of Computational Thinking with daily life examples.",
          "qUrdu": "کمپیوٹیشنل سوچ کے چار ستونوں کی روزمرہ زندگی کی مثالوں کے ساتھ وضاحت کریں۔",
          "answer": "1. Decomposition: Breaking a complex challenge into smaller components (e.g., organizing a school annual sports gala into individual tasks: grounds, invitations, trophies, refreshments).\n2. Pattern Recognition: Finding common trends across data (e.g., recognizing that prime numbers share no divisors other than 1 and themselves).\n3. Abstraction: Removing unnecessary clutter and keeping only relevant details (e.g., a metro subway map displaying only transit stations and connections while ignoring surface topography and buildings).\n4. Algorithm Design: Developing a step-by-step recipe to achieve the goal (e.g., an exact recipe for baking a cake with measured ingredients and sequential oven timers)."
        }
      ],
      "structuredQuestions": [
        {
          "q": "Activity 1: Pseudocode for Number Validation (Not 5 or 6)",
          "text": "Write a pseudocode that tells a user if the number entered is not a five or a six.",
          "solution": "START\n  INPUT number\n  IF (number != 5) AND (number != 6) THEN\n    PRINT \"The number entered is neither 5 nor 6\"\n  ELSE\n    PRINT \"The number entered is 5 or 6\"\n  END IF\nEND"
        },
        {
          "q": "Activity 2: Color Band Classification Pseudocode",
          "text": "Write pseudocode that asks the user for a number:\n- If between 0 and 10: print 'Blue'\n- If between 10 and 20: print 'Red'\n- If between 20 and 30: print 'Green'\n- Otherwise: print 'Out of range'",
          "solution": "START\n  INPUT num\n  IF num >= 0 AND num < 10 THEN\n    PRINT \"Blue\"\n  ELSE IF num >= 10 AND num < 20 THEN\n    PRINT \"Red\"\n  ELSE IF num >= 20 AND num < 30 THEN\n    PRINT \"Green\"\n  ELSE\n    PRINT \"Out of range\"\n  END IF\nEND"
        }
      ],
      "projectWork": {
        "title": "ATM Cash Withdrawal Flowchart",
        "description": "Construct a comprehensive flowchart for an automated teller machine (ATM) transaction: PIN verification, checking account balance sufficiency, cash dispensing, receipt generation, and card ejection.",
        "materials": [
          "Chart paper",
          "Flowchart stencil"
        ]
      }
    },
    "slos": [
      {
        "code": "CS-08-07",
        "text": "Define problem decomposition, abstraction, and algorithmic thinking",
        "cognitiveLevel": "Knowledge"
      },
      {
        "code": "CS-08-08",
        "text": "Draw flowcharts for real-world mathematical problems using standard symbols",
        "cognitiveLevel": "Application"
      },
      {
        "code": "CS-08-09",
        "text": "Write pseudocode utilizing sequence, selection (IF-THEN-ELSE), and iteration",
        "cognitiveLevel": "Application"
      }
    ],
    "diagrams": [
      {
        "title": "Standard Flowchart Symbols",
        "description": "Terminal (Oval), Input/Output (Parallelogram), Process (Rectangle), Decision (Diamond)."
      },
      {
        "title": "Even or Odd Flowchart",
        "description": "Flowchart evaluating N % 2 == 0 to branch into Even or Odd."
      }
    ],
    "definitions": [
      {
        "term": "Algorithm",
        "urdu": "الگورتھم",
        "def": "A step-by-step procedure of well-defined instructions for solving a problem."
      },
      {
        "term": "Flowchart",
        "urdu": "فلو چارٹ",
        "def": "A visual diagram showing the flow of steps in an algorithm using geometric shapes."
      },
      {
        "term": "Pseudocode",
        "urdu": "سیوڈو کوڈ",
        "def": "An informal high-level description of programming logic written in plain human language."
      },
      {
        "term": "Decomposition",
        "urdu": "ڈی کمپوزیشن (تقسیم)",
        "def": "Breaking down a complex problem into smaller, simpler, and more manageable sub-problems."
      }
    ],
    "glossary": [
      {
        "unit": 3,
        "term": "Abstraction",
        "word": "Abstraction",
        "urdu": "تجرید (ایبسٹریکشن)",
        "pashto": "انتزاع",
        "def": "Filtering out irrelevant details to focus strictly on essential characteristics.",
        "meaning": "Filtering out irrelevant details to focus strictly on essential characteristics."
      },
      {
        "unit": 3,
        "term": "Algorithm",
        "word": "Algorithm",
        "urdu": "الگورتھم",
        "pashto": "الګوریتم",
        "def": "A finite step-by-step sequence of unambiguous instructions designed to solve a problem.",
        "meaning": "A finite step-by-step sequence of unambiguous instructions designed to solve a problem."
      },
      {
        "unit": 3,
        "term": "Decomposition",
        "word": "Decomposition",
        "urdu": "ڈی کمپوزیشن (مسئلے کی تقسیم)",
        "pashto": "تجزیه کول",
        "def": "Breaking down a complex problem into smaller, simpler, more manageable sub-problems.",
        "meaning": "Breaking down a complex problem into smaller, simpler, more manageable sub-problems."
      },
      {
        "unit": 3,
        "term": "Flowchart",
        "word": "Flowchart",
        "urdu": "فلو چارٹ",
        "pashto": "فلوچارټ",
        "def": "A graphical diagram representing the sequential steps and decisions of an algorithm.",
        "meaning": "A graphical diagram representing the sequential steps and decisions of an algorithm."
      },
      {
        "unit": 3,
        "term": "Pseudocode",
        "word": "Pseudocode",
        "urdu": "سیوڈو کوڈ",
        "pashto": "سیوډوکوډ",
        "def": "An informal high-level plain English description of a computer program's logic.",
        "meaning": "An informal high-level plain English description of a computer program's logic."
      }
    ],
    "topics": [
      {
        "id": "3.1",
        "title": "Problem Solving & Problem Decomposition",
        "heading": "3.1 Problem Solving & Problem Decomposition",
        "headingUrdu": "3.1 مسئلہ حل کرنا اور مسئلے کی تقسیم",
        "text": "Problem solving is the systematic process of identifying an issue, designing step-by-step solutions, and executing them efficiently.\n• Decomposition: Breaking down a large, complicated problem into smaller, simpler, and more manageable sub-problems (modules). Each sub-problem can then be solved independently.\n• Pattern Recognition: Identifying similarities between problems to apply previously proven solutions.\n• Abstraction: Filtering out irrelevant background details and focusing exclusively on core essential factors.",
        "paras": [
          "Decomposition makes complex programming tasks approachable.",
          "Computational thinking comprises decomposition, pattern recognition, abstraction, and algorithms."
        ]
      },
      {
        "id": "3.2",
        "title": "Algorithms & Flowcharts",
        "heading": "3.2 Algorithms & Flowcharts",
        "headingUrdu": "3.2 الگورتھم اور فلو چارٹس",
        "text": "• Algorithm: A finite sequence of well-defined, step-by-step instructions written in natural language to solve a specific problem or perform a computation.\n• Flowchart: A graphical representation of an algorithm using standard geometrical shapes linked by flow lines:\n1. Oval (Terminal): Start and End points.\n2. Parallelogram: Input and Output operations.\n3. Rectangle: Processing step (calculations, assignments).\n4. Diamond: Decision making (conditional question yielding True/False or Yes/No paths).\n5. Flow lines / Arrows: Indicate directional sequence of execution.\n6. Circle: On-page connector.",
        "paras": [
          "Algorithms must be clear, unambiguous, and guarantee termination in finite steps.",
          "Flowcharts visually illuminate decision branches and iteration cycles."
        ]
      },
      {
        "id": "3.3",
        "title": "Pseudocode & Control Structures",
        "heading": "3.3 Pseudocode & Control Structures",
        "headingUrdu": "3.3 سیوڈو کوڈ اور کنٹرول سٹرکچرز",
        "text": "• Pseudocode: An informal, high-level plain English representation of a computer program's logic, independent of specific programming language syntax.\n• Control Structures:\n1. Sequence: Executing statements strictly one after another in order.\n2. Selection (Decision): Choosing alternate execution paths using IF-THEN-ELSE or SWITCH.\n3. Iteration (Repetition / Loop): Repeating a block of code multiple times while a condition remains True (e.g., WHILE, FOR loops).",
        "paras": [
          "Pseudocode bridges conceptual algorithm design and computer coding.",
          "Control structures dictate the flow of instruction execution."
        ]
      }
    ]
  },
  {
    "number": 4,
    "id": "unit-4",
    "title": "Programming",
    "titleUrdu": "پروگرامنگ",
    "pageRange": "pp. 48–68",
    "source": "KPK Textbook Board (KPTBB) Grade 8 Computer Science (SNC 2022)",
    "englishSummary": "Unit 4 introduces programming concepts utilizing visual block programming (Scratch) and transitional text code. Topics include programming constructs (sequence, selection, loops), nested loops, infinite loops, variable declarations, sprite motion geometry (angles and coordinates), math functions like floor(), and event-driven game logic.",
    "urduSummary": "یونٹ 4 بصری بلاک پروگرامنگ (Scratch) اور ٹیکسٹ کوڈ کے ذریعے پروگرامنگ کے تصورات سکھاتا ہے۔ اس میں پروگرامنگ کے بنیادی اصول (سیکوئنس، کنڈیشنز، لوپس)، نیسٹڈ لوپس، لامحدود لوپس، متغیرات (Variables)، سپرائٹ موشن جیومیٹری (زاویے اور کوآرڈینیٹس)، ریاضیاتی فنکشنز (جیسے floor)، اور ایونٹ پر مبنی اینیمیشن شامل ہیں۔",
    "sections": [
      {
        "id": "4.1",
        "title": "Fundamental Programming Constructs",
        "heading": "4.1 Fundamental Programming Constructs",
        "headingUrdu": "4.1 پروگرامنگ کے بنیادی اجزاء",
        "text": "Every computer program is constructed from three fundamental architectural building blocks:\n1. Sequence: Linear execution of commands in the exact top-to-bottom order written.\n2. Selection (Condition): Directing execution flow based on boolean conditions (e.g., if-then, if-else blocks).\n3. Iteration (Loop): Repeating a set of code blocks either for a fixed count (e.g., repeat 10) or until a condition changes (e.g., repeat until, forever).",
        "paras": [
          "Sequence executes linearly from top to bottom.",
          "Selection branches execution based on True or False logical outcomes."
        ]
      },
      {
        "id": "4.2",
        "title": "Loops: Nested & Infinite Loops",
        "heading": "4.2 Loops: Nested & Infinite Loops",
        "headingUrdu": "4.2 لوپس: نیسٹڈ اور لامتناہی لوپس",
        "text": "• Loop within a Loop (Nested Loop): Placing one loop inside another. The inner loop executes all its iterations for every single iteration of the outer loop (e.g., outer loop repeats 3 times, inner loop repeats 4 times → total 12 executions).\n• Infinite Loop: A loop whose exit termination condition is never satisfied (remains perpetually True), causing the program to repeat without stopping (e.g., Scratch 'forever' block). Used intentionally for background game listener loops.",
        "paras": [
          "Nested loops multiply total iteration counts.",
          "Infinite loops in event-driven games continually check user inputs."
        ]
      },
      {
        "id": "4.3",
        "title": "Variables, Math Operators & Sprite Coordinates",
        "heading": "4.3 Variables, Math Operators & Sprite Coordinates",
        "headingUrdu": "4.3 ویری ایبلز، ریاضیاتی آپریٹرز اور سپرائٹ کوآرڈینیٹس",
        "text": "• Variables: Named storage locations in computer memory that hold data values that can change during program execution (e.g., score, health, timer).\n• Mathematical Operators: Addition (+), Subtraction (-), Multiplication (*), Division (/), Modulo (mod).\n• Built-in Math Functions: floor(x) always rounds a floating-point number DOWN to the nearest integer below it (e.g., floor(5.8) = 5; floor(5.2) = 5).\n• Sprite Geometry: In Scratch, the stage is a Cartesian coordinate plane spanning X (-240 to +240) and Y (-180 to +180). Sprite turning angles measure in degrees (a full rotation requires 360 degrees).",
        "paras": [
          "Variables track dynamic game states like score and player lives.",
          "A full circular rotation consists of 360 geometric degrees."
        ]
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "Which of the following is NOT an essential construct of programming languages?",
          "options": [
            "Sequence",
            "Condition",
            "Loop",
            "Business"
          ],
          "answer": 3,
          "exp": "Business is a commercial activity, while sequence, condition, and loop are the fundamental programming constructs."
        },
        {
          "q": "A loop situated inside another loop is known as a:",
          "options": [
            "Nested loop",
            "Next loop",
            "Newest loop",
            "Narrow loop"
          ],
          "answer": 0,
          "exp": "A nested loop is an inner loop executing within an outer loop."
        },
        {
          "q": "A loop becomes an infinite loop if its termination condition never becomes:",
          "options": [
            "TRUE",
            "FALSE",
            "NULL",
            "ZERO"
          ],
          "answer": 1,
          "exp": "Loops exit when their continuation condition evaluates to FALSE; if it never turns FALSE, it loops infinitely."
        },
        {
          "q": "The mathematical floor() function always:",
          "options": [
            "Rounds down to nearest integer",
            "Rounds up",
            "Deletes number",
            "Doubles number"
          ],
          "answer": 0,
          "exp": "floor(x) returns the greatest integer less than or equal to x (rounds down)."
        },
        {
          "q": "In visual sprite programming, a sprite turning 30 degrees requires how many steps/clicks for a complete 360° circle?",
          "options": [
            "6",
            "10",
            "12",
            "30"
          ],
          "answer": 2,
          "exp": "360 degrees / 30 degrees per step = 12 steps/clicks."
        }
      ],
      "shortQuestions": [
        {
          "q": "1. For a code block where a sprite turns 30 degrees when clicked, how many clicks are required for the sprite to complete a full 360° cycle?",
          "qUrdu": "ایک کوڈ بلاک میں کلک کرنے پر سپرائٹ 30 ڈگری گھومتی ہے۔ پورا 360 ڈگری کا چکر مکمل کرنے کے لیے کتنے کلکس درکار ہوں گے؟",
          "answer": "A full geometric circle comprises 360 degrees. With each click turning the sprite by 30 degrees:\nNumber of clicks = 360° / 30° = 12 clicks."
        },
        {
          "q": "2. What is an infinite loop? Give an example.",
          "qUrdu": "لامتناہی (انفینیٹ) لوپ کیا ہے؟ مثال دیں۔",
          "answer": "An infinite loop is an endless repetitive cycle of instructions that never reaches a termination condition. In Scratch, the 'forever' block creates an intentional infinite loop used in video games to continuously poll for keyboard arrow key presses or update character positions until the user clicks the red Stop button."
        },
        {
          "q": "3. What is a variable in programming? Name two examples in video games.",
          "qUrdu": "پروگرامنگ میں ویری ایبل کیا ہے؟ ویڈیو گیمز میں اس کی دو مثالیں دیں۔",
          "answer": "A variable is a labeled memory location used to store, retrieve, and update numeric or textual data during program execution. In video games, common variables include 'playerScore' (increments when collecting coins) and 'playerHealth' (decrements upon taking damage)."
        },
        {
          "q": "4. Explain how nested loops operate.",
          "qUrdu": "نیسٹڈ لوپس کس طرح کام کرتے ہیں؟ وضاحت کریں۔",
          "answer": "In a nested loop, an inner loop is placed within the body of an outer loop. When executed, for every single pass of the outer loop, the inner loop completes all of its designated iterations. For example, if the outer loop runs 3 times and the inner loop runs 4 times, the body of the inner loop executes 3 × 4 = 12 total times."
        }
      ],
      "longQuestions": [
        {
          "q": "1. Discuss the three fundamental control structures in programming: Sequence, Selection, and Iteration with illustrative examples.",
          "qUrdu": "پروگرامنگ کے تین بنیادی کنٹرول سٹرکچرز (سیکوئنس، سلیکشن، اِٹریشن) کی مثالوں کے ساتھ وضاحت کریں۔",
          "answer": "1. Sequence: The sequential execution of commands in exact order. Example: Move 10 steps → Play sound → Say 'Hello'.\n2. Selection: Conditional execution using decision blocks. Example: IF key [Space] pressed THEN Jump ELSE Stay.\n3. Iteration: Controlled repetition using loops. Example: REPEAT 4 times: [Move 100 steps, Turn 90 degrees] to draw a square on the stage."
        }
      ],
      "structuredQuestions": [],
      "projectWork": {
        "title": "Interactive Maze Game in Scratch",
        "description": "Develop a two-dimensional maze game featuring a player sprite steered by arrow keys, touching color walls (IF touching wall THEN reset to start), collecting 3 coin items, and displaying 'You Win!' when reaching the goal.",
        "materials": [
          "Scratch 3.0 desktop or online editor"
        ]
      }
    },
    "slos": [
      {
        "code": "CS-08-10",
        "text": "Identify and explain programming constructs: sequence, conditions, loops",
        "cognitiveLevel": "Knowledge"
      },
      {
        "code": "CS-08-11",
        "text": "Differentiate between nested loops and infinite loops",
        "cognitiveLevel": "Understanding"
      },
      {
        "code": "CS-08-12",
        "text": "Create event-driven programs with variables and coordinate mathematics",
        "cognitiveLevel": "Application"
      }
    ],
    "diagrams": [
      {
        "title": "Scratch Cartesian Stage",
        "description": "X axis (-240 to +240) and Y axis (-180 to +180) with origin at center (0,0)."
      },
      {
        "title": "Nested Loop Execution Flow",
        "description": "Outer loop counter advancing only after inner loop completes all iterations."
      }
    ],
    "definitions": [
      {
        "term": "Variable",
        "urdu": "متغیر (ویری ایبل)",
        "def": "A named container in computer memory holding data that can change during execution."
      },
      {
        "term": "Nested Loop",
        "urdu": "نیسٹڈ لوپ",
        "def": "A loop situated entirely inside the body of another outer loop."
      },
      {
        "term": "Infinite Loop",
        "urdu": "لامتناہی لوپ",
        "def": "A loop whose continuation condition remains permanently true, repeating indefinitely."
      },
      {
        "term": "Sprite",
        "urdu": "سپرائٹ",
        "def": "A graphical visual object or character in Scratch that can be moved, rotated, and scripted."
      }
    ],
    "glossary": [
      {
        "unit": 4,
        "term": "Infinite Loop",
        "word": "Infinite Loop",
        "urdu": "لامتناہی لوپ",
        "pashto": "بې پایه لوپ",
        "def": "A sequence of instructions that continues looping endlessly because its exit condition is never met.",
        "meaning": "A sequence of instructions that continues looping endlessly because its exit condition is never met."
      },
      {
        "unit": 4,
        "term": "Iteration",
        "word": "Iteration",
        "urdu": "تکرار (اِٹریشن)",
        "pashto": "تکرار",
        "def": "The repetition of a computational process in order to generate a sequence of outcomes.",
        "meaning": "The repetition of a computational process in order to generate a sequence of outcomes."
      },
      {
        "unit": 4,
        "term": "Nested Loop",
        "word": "Nested Loop",
        "urdu": "نیسٹڈ لوپ",
        "pashto": "نیسټډ لوپ",
        "def": "A loop enclosed completely within the body of another loop.",
        "meaning": "A loop enclosed completely within the body of another loop."
      },
      {
        "unit": 4,
        "term": "Sprite",
        "word": "Sprite",
        "urdu": "سپرائٹ",
        "pashto": "سپرایټ",
        "def": "A visual computer graphic character on a screen that can be controlled by script blocks.",
        "meaning": "A visual computer graphic character on a screen that can be controlled by script blocks."
      },
      {
        "unit": 4,
        "term": "Variable",
        "word": "Variable",
        "urdu": "متغیر (ویری ایبل)",
        "pashto": "متغیر",
        "def": "A named storage location in memory whose value can change during execution.",
        "meaning": "A named storage location in memory whose value can change during execution."
      }
    ],
    "topics": [
      {
        "id": "4.1",
        "title": "Fundamental Programming Constructs",
        "heading": "4.1 Fundamental Programming Constructs",
        "headingUrdu": "4.1 پروگرامنگ کے بنیادی اجزاء",
        "text": "Every computer program is constructed from three fundamental architectural building blocks:\n1. Sequence: Linear execution of commands in the exact top-to-bottom order written.\n2. Selection (Condition): Directing execution flow based on boolean conditions (e.g., if-then, if-else blocks).\n3. Iteration (Loop): Repeating a set of code blocks either for a fixed count (e.g., repeat 10) or until a condition changes (e.g., repeat until, forever).",
        "paras": [
          "Sequence executes linearly from top to bottom.",
          "Selection branches execution based on True or False logical outcomes."
        ]
      },
      {
        "id": "4.2",
        "title": "Loops: Nested & Infinite Loops",
        "heading": "4.2 Loops: Nested & Infinite Loops",
        "headingUrdu": "4.2 لوپس: نیسٹڈ اور لامتناہی لوپس",
        "text": "• Loop within a Loop (Nested Loop): Placing one loop inside another. The inner loop executes all its iterations for every single iteration of the outer loop (e.g., outer loop repeats 3 times, inner loop repeats 4 times → total 12 executions).\n• Infinite Loop: A loop whose exit termination condition is never satisfied (remains perpetually True), causing the program to repeat without stopping (e.g., Scratch 'forever' block). Used intentionally for background game listener loops.",
        "paras": [
          "Nested loops multiply total iteration counts.",
          "Infinite loops in event-driven games continually check user inputs."
        ]
      },
      {
        "id": "4.3",
        "title": "Variables, Math Operators & Sprite Coordinates",
        "heading": "4.3 Variables, Math Operators & Sprite Coordinates",
        "headingUrdu": "4.3 ویری ایبلز، ریاضیاتی آپریٹرز اور سپرائٹ کوآرڈینیٹس",
        "text": "• Variables: Named storage locations in computer memory that hold data values that can change during program execution (e.g., score, health, timer).\n• Mathematical Operators: Addition (+), Subtraction (-), Multiplication (*), Division (/), Modulo (mod).\n• Built-in Math Functions: floor(x) always rounds a floating-point number DOWN to the nearest integer below it (e.g., floor(5.8) = 5; floor(5.2) = 5).\n• Sprite Geometry: In Scratch, the stage is a Cartesian coordinate plane spanning X (-240 to +240) and Y (-180 to +180). Sprite turning angles measure in degrees (a full rotation requires 360 degrees).",
        "paras": [
          "Variables track dynamic game states like score and player lives.",
          "A full circular rotation consists of 360 geometric degrees."
        ]
      }
    ]
  },
  {
    "number": 5,
    "id": "unit-5",
    "title": "Digital Citizenship",
    "titleUrdu": "ڈیجیٹل شہریت",
    "pageRange": "pp. 69–85",
    "source": "KPK Textbook Board (KPTBB) Grade 8 Computer Science (SNC 2022)",
    "englishSummary": "Unit 5 explores ethical, legal, and security considerations in the digital world: computer ethics, intellectual property, copyright legislation, plagiarism prevention, cyberbullying, malicious software (viruses, worms, Trojan horses, adware, ransomware), phishing attacks, strong password hygiene, two-factor authentication, and firewall defenses.",
    "urduSummary": "یونٹ 5 ڈیجیٹل دنیا میں اخلاقی، قانونی اور سیکیورٹی پہلوؤں کا احاطہ کرتا ہے: کمپیوٹر اخلاقیات، کاپی رائٹ قوانین، سرقہ بازی (پلیجیرزم) کی روک تھام، سائبر دھونس (سائبر بلینگ)، نقصان دہ سافٹ ویئر (وائرس، ورمز، ٹروجن، ایڈویئر، رینسم ویئر)، فشنگ حملے، مضبوط پاس ورڈ، دو فیکٹر کی تصدیق (2FA)، اور فائر وال کا کردار۔",
    "sections": [
      {
        "id": "5.1",
        "title": "Computer Ethics, Copyright & Plagiarism",
        "heading": "5.1 Computer Ethics, Copyright & Plagiarism",
        "headingUrdu": "5.1 کمپیوٹر اخلاقیات، کاپی رائٹ اور سرقہ بازی",
        "text": "• Computer Ethics: Moral guidelines that govern the acceptable, lawful, and respectful use of computers and digital technology.\n• Copyright Law: Legal ownership granted to creators of original literary, musical, visual, or software works. It strictly prohibits unauthorized duplication, piracy, or distribution of protected content without explicit license.\n• Plagiarism: The unethical act of presenting another author's written words, research ideas, or digital designs as one's own without proper quotation attribution or citation.\n• Cyberbullying: The intentional, repeated harassment, humiliation, or intimidation of individuals over social networks, forums, or messaging platforms.",
        "paras": [
          "Copyright protects original creative works from piracy and unauthorized replication.",
          "Proper academic citation eliminates plagiarism."
        ]
      },
      {
        "id": "5.2",
        "title": "Cyber Threats & Malware Types",
        "heading": "5.2 Cyber Threats & Malware Types",
        "headingUrdu": "5.2 سائبر خطرات اور میلویئر کی اقسام",
        "text": "Malware (Malicious Software) refers to programs deliberately designed to harm, disrupt, or gain unauthorized access to computer systems:\n1. Virus: Parasitic code that attaches to legitimate executable host files and replicates when the infected program is launched.\n2. Worm: Self-replicating standalone malware that spreads automatically across network connections without requiring a host file or human intervention.\n3. Trojan Horse: Deceptive malware masquerading as harmless legitimate software (like a game or utility) that secretly installs backdoors to steal confidential credentials.\n4. Adware: Intrusive software that secretly downloads and bombards users with unwanted pop-up advertisements.\n5. Ransomware: Malicious encryption code that locks a victim's files, demanding extortion payments (often in cryptocurrency) to unlock them.",
        "paras": [
          "Worms spread autonomously over network connections without user interaction.",
          "Trojan horses disguise malicious payloads as useful applications."
        ]
      },
      {
        "id": "5.3",
        "title": "Cybersecurity & Digital Protection",
        "heading": "5.3 Cybersecurity & Digital Protection",
        "headingUrdu": "5.3 سائبر سیکیورٹی اور ڈیجیٹل تحفظ",
        "text": "• Strong Passwords: Combining at least 12 characters including uppercase, lowercase, numbers, and symbols while avoiding obvious personal details.\n• Two-Factor Authentication (2FA): Requiring two distinct verification factors (e.g., password + temporary SMS/authenticator code) to access sensitive accounts.\n• Antivirus Software: Programs that scan, quarantine, and eliminate known virus signatures from storage drives.\n• Firewall: A security system (hardware or software) that monitors and filters incoming and outgoing network traffic based on predetermined security rules, blocking unauthorized hackers.",
        "paras": [
          "2FA protects online accounts even if passwords become compromised.",
          "Firewalls prevent unauthorized incoming network connections."
        ]
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "Rules and moral guidelines to be followed while using digital technology are known as:",
          "options": [
            "Computer interaction",
            "Computer application",
            "Computer ethics",
            "Computer safety"
          ],
          "answer": 2,
          "exp": "Computer ethics defines the ethical principles guiding computer and digital use."
        },
        {
          "q": "The legal protection granted to creators of original creative work is called:",
          "options": [
            "Internet privacy",
            "Copyright",
            "Plagiarism",
            "Online safety"
          ],
          "answer": 1,
          "exp": "Copyright legally protects original literary, artistic, and software creations."
        },
        {
          "q": "Malware that transmits itself automatically across computer networks without human assistance is a:",
          "options": [
            "Worm",
            "Trojan horse",
            "Adware",
            "Spam"
          ],
          "answer": 0,
          "exp": "A worm replicates and travels autonomously across network connections."
        },
        {
          "q": "Malware disguised as legitimate useful software that creates a secret backdoor is a:",
          "options": [
            "Virus",
            "Trojan Horse",
            "Worm",
            "Adware"
          ],
          "answer": 1,
          "exp": "Named after the mythological Trojan Horse, it conceals a malicious payload inside a harmless file."
        },
        {
          "q": "A security barrier that monitors and filters network traffic between trusted and untrusted networks is a:",
          "options": [
            "Antivirus",
            "Firewall",
            "Router",
            "Switch"
          ],
          "answer": 1,
          "exp": "A firewall filters incoming and outgoing network data packets according to security policies."
        }
      ],
      "shortQuestions": [
        {
          "q": "1. What is computer ethics? Why is it important?",
          "qUrdu": "کمپیوٹر اخلاقیات کیا ہے؟ یہ کیوں اہم ہے؟",
          "answer": "Computer ethics is a set of moral principles and standards that govern responsible, respectful, and lawful behavior when utilizing computers, networks, and the Internet. It is important because it protects personal privacy, intellectual property rights, prevents cyberbullying, and promotes safe digital communication."
        },
        {
          "q": "2. Differentiate between a computer Virus and a Worm.",
          "qUrdu": "کمپیوٹر وائرس اور ورم میں فرق بیان کریں۔",
          "answer": "• Computer Virus: Requires a host executable file (.exe, doc) to infect. It cannot replicate or spread until an unsuspecting human user runs or opens the infected host program.\n• Computer Worm: A standalone independent program that requires neither a host file nor human execution. It actively scans network vulnerabilities and propagates autonomously across network connections."
        },
        {
          "q": "3. What is plagiarism? How can it be prevented in academic work?",
          "qUrdu": "سرقہ بازی (پلیجیرزم) کیا ہے؟ علمی کام میں اس سے کیسے بچا جا سکتا ہے؟",
          "answer": "Plagiarism is the wrongful appropriation and stealing of another creator's text, ideas, or intellectual research and presenting them as one's own without proper credit. It can be prevented by:\n1. Paraphrasing content into one's own original words.\n2. Enclosing exact quotes in quotation marks.\n3. Citing the original author, book title, and URL in bibliographies."
        },
        {
          "q": "4. What is Two-Factor Authentication (2FA) and how does it safeguard user accounts?",
          "qUrdu": "ٹو فیکٹر آتھینٹیکیشن (2FA) کیا ہے اور یہ صارف کے اکاؤنٹس کو کیسے محفوظ بناتی ہے؟",
          "answer": "Two-Factor Authentication (2FA) is a multi-step security process that requires two separate forms of identification to log in: something you know (your master password) and something you have (a one-time passcode sent to your phone or authenticator app). Even if a malicious hacker steals your password, they cannot breach your account without physical access to your phone."
        }
      ],
      "longQuestions": [
        {
          "q": "1. Explain the major types of malicious software (Malware) and their harmful effects on computer systems.",
          "qUrdu": "نقصان دہ سافٹ ویئر (میلویئر) کی بڑی اقسام اور سسٹمز پر ان کے برے اثرات کی تفصیلی وضاحت کریں۔",
          "answer": "1. Computer Virus: Attaches to executable files, corrupts operating system files, and formats drives.\n2. Computer Worm: Self-replicates across networks, consuming bandwidth and crashing internet servers.\n3. Trojan Horse: Disguises as a harmless utility to open unauthorized backdoor access for identity theft.\n4. Ransomware: Silently encrypts vital documents and databases, demanding extorted ransom payments to restore decryption keys.\n5. Adware: Hijacks browser sessions and injects intrusive, spyware-laden pop-up advertisements."
        }
      ],
      "structuredQuestions": [],
      "projectWork": {
        "title": "Cyber Safety & Anti-Bullying Campaign Poster",
        "description": "Design an informative cyber safety infographic illustrating strong password creation (12+ characters, special symbols), avoiding suspicious phishing email links, protecting personal address info, and reporting online cyberbullying.",
        "materials": [
          "Chart poster",
          "Color markers",
          "Cybersecurity tips icons"
        ]
      }
    },
    "slos": [
      {
        "code": "CS-08-13",
        "text": "Define computer ethics, copyright law, and intellectual property",
        "cognitiveLevel": "Knowledge"
      },
      {
        "code": "CS-08-14",
        "text": "Identify and classify malware: viruses, worms, trojans, adware, ransomware",
        "cognitiveLevel": "Understanding"
      },
      {
        "code": "CS-08-15",
        "text": "Apply cybersecurity hygiene: strong passwords, 2FA, and firewalls",
        "cognitiveLevel": "Application"
      }
    ],
    "diagrams": [
      {
        "title": "Malware Family Tree",
        "description": "Viruses, Worms, Trojans, Adware, and Ransomware classifications."
      },
      {
        "title": "Firewall Security Gate",
        "description": "Firewall inspecting data packets between Untrusted Internet and Trusted Local Network."
      }
    ],
    "definitions": [
      {
        "term": "Computer Ethics",
        "urdu": "کمپیوٹر اخلاقیات",
        "def": "Moral guidelines governing the acceptable and legal use of digital technology."
      },
      {
        "term": "Copyright",
        "urdu": "کاپی رائٹ",
        "def": "Legal protection granting exclusive rights to creators of original intellectual works."
      },
      {
        "term": "Malware",
        "urdu": "میلویئر",
        "def": "Software intentionally programmed to damage, disrupt, or infiltrate computer systems."
      },
      {
        "term": "Firewall",
        "urdu": "فائر وال",
        "def": "A security barrier that monitors and filters network traffic based on predefined security rules."
      }
    ],
    "glossary": [
      {
        "unit": 5,
        "term": "Computer Ethics",
        "word": "Computer Ethics",
        "urdu": "کمپیوٹر اخلاقیات",
        "pashto": "د کمپیوټر اخلاق",
        "def": "A set of moral principles regulating the use of digital technology and internet systems.",
        "meaning": "A set of moral principles regulating the use of digital technology and internet systems."
      },
      {
        "unit": 5,
        "term": "Copyright",
        "word": "Copyright",
        "urdu": "کاپی رائٹ",
        "pashto": "د چاپ حق (کاپی رایټ)",
        "def": "The exclusive legal right granted to an originator to produce, copy, or license original works.",
        "meaning": "The exclusive legal right granted to an originator to produce, copy, or license original works."
      },
      {
        "unit": 5,
        "term": "Cyberbullying",
        "word": "Cyberbullying",
        "urdu": "سائبر بلینگ (سائبر دھونس)",
        "pashto": "انلاین ځورونه",
        "def": "The use of digital electronic communication to bully, threaten, or intimidate a person.",
        "meaning": "The use of digital electronic communication to bully, threaten, or intimidate a person."
      },
      {
        "unit": 5,
        "term": "Firewall",
        "word": "Firewall",
        "urdu": "فائر وال",
        "pashto": "فایروال",
        "def": "A network security system monitoring and controlling incoming and outgoing network traffic.",
        "meaning": "A network security system monitoring and controlling incoming and outgoing network traffic."
      },
      {
        "unit": 5,
        "term": "Malware",
        "word": "Malware",
        "urdu": "میلویئر",
        "pashto": "بدغونی سافټویر",
        "def": "Software intentionally designed to cause disruption, damage, or unauthorized access to a computer.",
        "meaning": "Software intentionally designed to cause disruption, damage, or unauthorized access to a computer."
      },
      {
        "unit": 5,
        "term": "Plagiarism",
        "word": "Plagiarism",
        "urdu": "سرقہ بازی (پلیجیرزم)",
        "pashto": "ادبي غلا",
        "def": "The practice of taking someone else's work or ideas and passing them off as one's own.",
        "meaning": "The practice of taking someone else's work or ideas and passing them off as one's own."
      },
      {
        "unit": 5,
        "term": "Ransomware",
        "word": "Ransomware",
        "urdu": "رینسم ویئر",
        "pashto": "باج اخیستونکی سافټویر",
        "def": "Malware that encrypts an organization's data, demanding ransom payments to release it.",
        "meaning": "Malware that encrypts an organization's data, demanding ransom payments to release it."
      },
      {
        "unit": 5,
        "term": "Trojan Horse",
        "word": "Trojan Horse",
        "urdu": "ٹروجن ہارس",
        "pashto": "ټروجن هارس",
        "def": "Malware disguised as legitimate useful software that creates a backdoor vulnerability.",
        "meaning": "Malware disguised as legitimate useful software that creates a backdoor vulnerability."
      },
      {
        "unit": 5,
        "term": "Worm",
        "word": "Worm",
        "urdu": "کمپیوٹر ورم",
        "pashto": "کمپیوټري چنجی (ورم)",
        "def": "A self-replicating standalone malware program spreading automatically across networks.",
        "meaning": "A self-replicating standalone malware program spreading automatically across networks."
      }
    ],
    "topics": [
      {
        "id": "5.1",
        "title": "Computer Ethics, Copyright & Plagiarism",
        "heading": "5.1 Computer Ethics, Copyright & Plagiarism",
        "headingUrdu": "5.1 کمپیوٹر اخلاقیات، کاپی رائٹ اور سرقہ بازی",
        "text": "• Computer Ethics: Moral guidelines that govern the acceptable, lawful, and respectful use of computers and digital technology.\n• Copyright Law: Legal ownership granted to creators of original literary, musical, visual, or software works. It strictly prohibits unauthorized duplication, piracy, or distribution of protected content without explicit license.\n• Plagiarism: The unethical act of presenting another author's written words, research ideas, or digital designs as one's own without proper quotation attribution or citation.\n• Cyberbullying: The intentional, repeated harassment, humiliation, or intimidation of individuals over social networks, forums, or messaging platforms.",
        "paras": [
          "Copyright protects original creative works from piracy and unauthorized replication.",
          "Proper academic citation eliminates plagiarism."
        ]
      },
      {
        "id": "5.2",
        "title": "Cyber Threats & Malware Types",
        "heading": "5.2 Cyber Threats & Malware Types",
        "headingUrdu": "5.2 سائبر خطرات اور میلویئر کی اقسام",
        "text": "Malware (Malicious Software) refers to programs deliberately designed to harm, disrupt, or gain unauthorized access to computer systems:\n1. Virus: Parasitic code that attaches to legitimate executable host files and replicates when the infected program is launched.\n2. Worm: Self-replicating standalone malware that spreads automatically across network connections without requiring a host file or human intervention.\n3. Trojan Horse: Deceptive malware masquerading as harmless legitimate software (like a game or utility) that secretly installs backdoors to steal confidential credentials.\n4. Adware: Intrusive software that secretly downloads and bombards users with unwanted pop-up advertisements.\n5. Ransomware: Malicious encryption code that locks a victim's files, demanding extortion payments (often in cryptocurrency) to unlock them.",
        "paras": [
          "Worms spread autonomously over network connections without user interaction.",
          "Trojan horses disguise malicious payloads as useful applications."
        ]
      },
      {
        "id": "5.3",
        "title": "Cybersecurity & Digital Protection",
        "heading": "5.3 Cybersecurity & Digital Protection",
        "headingUrdu": "5.3 سائبر سیکیورٹی اور ڈیجیٹل تحفظ",
        "text": "• Strong Passwords: Combining at least 12 characters including uppercase, lowercase, numbers, and symbols while avoiding obvious personal details.\n• Two-Factor Authentication (2FA): Requiring two distinct verification factors (e.g., password + temporary SMS/authenticator code) to access sensitive accounts.\n• Antivirus Software: Programs that scan, quarantine, and eliminate known virus signatures from storage drives.\n• Firewall: A security system (hardware or software) that monitors and filters incoming and outgoing network traffic based on predetermined security rules, blocking unauthorized hackers.",
        "paras": [
          "2FA protects online accounts even if passwords become compromised.",
          "Firewalls prevent unauthorized incoming network connections."
        ]
      }
    ]
  },
  {
    "number": 6,
    "id": "unit-6",
    "title": "Entrepreneurship in Digital Age",
    "titleUrdu": "ڈیجیٹل دور میں انٹرپرینیورشپ (کاروباری صلاحیت)",
    "pageRange": "pp. 86–98",
    "source": "KPK Textbook Board (KPTBB) Grade 8 Computer Science (SNC 2022)",
    "englishSummary": "Unit 6 equips students with digital entrepreneurship concepts: understanding startups, formulating comprehensive business plans (Executive Summary, Market Analysis, Financial Plan, Marketing Strategy), the 4 Ps of Marketing (Product, Price, Place, Promotion), digital marketing vs traditional marketing, Quality Assurance (verification vs validation), digital payment gateways vs financial transactions, and modern e-commerce models.",
    "urduSummary": "یونٹ 6 ڈیجیٹل دور میں کاروباری صلاحیت (انٹرپرینیورشپ) کے تصورات سکھاتا ہے: کاروباری منصوبہ (بزنس پلان) تیار کرنا، مارکیٹنگ کے چار بنیادی عناصر (پروڈکٹ، قیمت، مقام، پروموشن)، ڈیجیٹل مارکیٹنگ کے فوائد و نقصانات، کوالٹی ایشورنس (تصدیق اور جانچ)، ڈیجیٹل ادائیگی اور ٹرانزیکشن میں فرق، اور ای کامرس ماڈلز۔",
    "sections": [
      {
        "id": "6.1",
        "title": "Digital Entrepreneurship & The Business Plan",
        "heading": "6.1 Digital Entrepreneurship & The Business Plan",
        "headingUrdu": "6.1 ڈیجیٹل انٹرپرینیورشپ اور بزنس پلان",
        "text": "An entrepreneur is an innovator who identifies a market opportunity, organizes necessary resources, assumes financial risk, and launches a business enterprise.\n• Business Plan: A formal written roadmap outlining a company's vision, objectives, and operational strategies:\n1. Executive Summary: High-level overview of the proposed business idea.\n2. Company Description: Mission statement, target market, and competitive edge.\n3. Market Analysis: Research on target consumer demographics and rival competitors.\n4. Marketing & Sales Strategy: Methods to acquire and retain paying customers.\n5. Financial Plan: Projected startup expenses, revenue streams, and break-even analysis.",
        "paras": [
          "Entrepreneurs drive economic growth through innovative technological solutions.",
          "A robust business plan attracts venture capital funding and mitigates commercial failure."
        ]
      },
      {
        "id": "6.2",
        "title": "The 4 Ps of Marketing & Digital Marketing",
        "heading": "6.2 The 4 Ps of Marketing & Digital Marketing",
        "headingUrdu": "6.2 مارکیٹنگ کے 4 عناصر اور ڈیجیٹل مارکیٹنگ",
        "text": "• The 4 Ps of the Marketing Mix:\n1. Product: The tangible good or digital service designed to solve a consumer pain point.\n2. Price: The monetary value charged, reflecting product quality, manufacturing cost, and customer willingness to pay.\n3. Place: Distribution channels through which customers access the product (retail store vs. e-commerce website).\n4. Promotion: Communication activities (advertising, social media, discounts) that build brand awareness.\n• Digital Marketing: Promoting brands and selling products using digital channels (search engines, social media, email, mobile apps). Offers precise demographic targeting, global reach, and real-time analytical metrics at lower costs than traditional print/TV media.",
        "paras": [
          "The 4 Ps form the cornerstone of marketing strategies.",
          "Digital marketing enables startups to reach global audiences on modest budgets."
        ]
      },
      {
        "id": "6.3",
        "title": "Quality Assurance & Digital Transactions",
        "heading": "6.3 Quality Assurance & Digital Transactions",
        "headingUrdu": "6.3 کوالٹی ایشورنس اور ڈیجیٹل ٹرانزیکشنز",
        "text": "• Quality Assurance (QA): Systematic activities ensuring products meet specified standards before market launch:\n- Verification: Checking whether product blueprints and specifications are followed correctly ('Are we building the product right?').\n- Validation: Testing the finished product with real end-users to confirm it meets actual customer expectations ('Are we building the right product?').\n• Payment vs. Transaction:\n- Payment: The actual transfer of monetary value from the customer to the merchant (e.g., credit card debit, Raast, mobile wallet).\n- Transaction: The entire recorded business event including order agreement, payment processing, invoice generation, and product fulfillment.",
        "paras": [
          "QA prevents costly defective recalls and builds consumer trust.",
          "Digital payments power instantaneous frictionless global e-commerce."
        ]
      }
    ],
    "exercise": {
      "mcqs": [
        {
          "q": "Which of the following is an essential component of a business plan?",
          "options": [
            "Marketing Strategy",
            "Sales Strategy",
            "Operations & Financials",
            "All of the above"
          ],
          "answer": 3,
          "exp": "A comprehensive business plan encompasses marketing, sales, operational, and financial plans."
        },
        {
          "q": "Evaluating software during development to ensure it satisfies design specifications is an example of:",
          "options": [
            "Verification",
            "Validation",
            "Standardization",
            "Marketing"
          ],
          "answer": 0,
          "exp": "Verification confirms whether the product adheres strictly to design specifications."
        },
        {
          "q": "Digital marketing is often referred to as:",
          "options": [
            "Billboard advertising",
            "Online marketing",
            "Print advertising",
            "Television broadcasting"
          ],
          "answer": 1,
          "exp": "Digital marketing utilizes the Internet and is widely called online marketing."
        },
        {
          "q": "Which of the 4 Ps of marketing refers to the distribution channel where a product is purchased?",
          "options": [
            "Product",
            "Price",
            "Place",
            "Promotion"
          ],
          "answer": 2,
          "exp": "Place denotes distribution channels such as retail storefronts or web portals."
        },
        {
          "q": "The actual transfer of monetary currency from buyer to seller is called a:",
          "options": [
            "Transaction",
            "Payment",
            "Contract",
            "Validation"
          ],
          "answer": 1,
          "exp": "Payment is the specific monetary transfer, which forms a part of the broader transaction."
        }
      ],
      "shortQuestions": [
        {
          "q": "1. Describe the basic components of a business plan.",
          "qUrdu": "کاروباری منصوبے (بزنس پلان) کے بنیادی اجزاء بیان کریں۔",
          "answer": "1. Executive Summary: Synopsis of company vision, mission, and unique value proposition.\n2. Company Description: Detailed business background, structure, and objectives.\n3. Market Analysis: Research on target consumer demand and competitor offerings.\n4. Marketing Strategy: Promotional channels, pricing model, and sales tactics (the 4 Ps).\n5. Financial Plan: Projected cash flows, expenses, and expected return on investment."
        },
        {
          "q": "2. Describe the four elements (4 Ps) of the Marketing Mix.",
          "qUrdu": "مارکیٹنگ مکس کے چار عناصر (4 Ps) کی وضاحت کریں۔",
          "answer": "1. Product: The physical goods or digital services developed to solve consumer needs.\n2. Price: The monetary cost charged to customers that ensures profit while remaining competitive.\n3. Place: The physical stores or e-commerce websites through which products are delivered.\n4. Promotion: Advertising, PR campaigns, discounts, and influencer marketing used to attract buyers."
        },
        {
          "q": "3. What is the difference between a payment and a transaction?",
          "qUrdu": "ادائیگی (پیمنٹ) اور لین دین (ٹرانزیکشن) میں کیا فرق ہے؟",
          "answer": "• Payment: The specific financial act of transferring monetary value from buyer to seller (e.g., cash, bank card charge, Raast payment).\n• Transaction: The entire end-to-end commercial agreement that includes placing the order, billing, processing payment, and issuing a confirmation receipt."
        },
        {
          "q": "4. Write down three advantages and three disadvantages of digital marketing.",
          "qUrdu": "ڈیجیٹل مارکیٹنگ کے تین فوائد اور تین نقصانات لکھیں۔",
          "answer": "• Advantages:\n1. Global Reach: Connects with potential customers worldwide.\n2. Cost-Effective: Much cheaper than purchasing expensive television or print ads.\n3. Measurable Analytics: Instant data tracking of clicks, impressions, and conversions.\n• Disadvantages:\n1. High Competition: The Internet is saturated with global brand advertisements.\n2. Privacy Concerns: Strict consumer regulations on user data tracking.\n3. Technical Dependence: Requires continuous internet access, software tools, and digital skills."
        }
      ],
      "longQuestions": [
        {
          "q": "1. Compare Quality Assurance activities: differentiate between Verification and Validation with examples.",
          "qUrdu": "کوالٹی ایشورنس کی سرگرمیوں کا تقابل کریں: تصدیق (ویریفکیشن) اور توثیق (ویلیڈیشن) میں مثالوں سے فرق بتائیں۔",
          "answer": "• Verification ('Are we building the product right?'):\nEvaluates intermediate work products, blueprints, source code, and design specifications without running the software. Focuses on checking processes, documents, and architectural compliance (e.g., code reviews and specification walkthroughs).\n• Validation ('Are we building the right product?'):\nEvaluates the finished software by executing it in real-world scenarios to confirm that it fulfills the customer's actual operational needs and expectations (e.g., beta testing with real students in a school setting)."
        }
      ],
      "structuredQuestions": [
        {
          "q": "Activity: Customer Incentive Program for an Airline",
          "text": "Pakistan International Airlines (PIA) plans to offer customer incentives through a mobile app.\n(a) Propose 2 digital incentive strategies.\n(b) Explain how digital marketing can promote this service.",
          "solution": "(a) Digital Incentives: 1. Frequent Flyer Loyalty Points redeemable for ticket discounts; 2. Student and senior citizen discount promo codes applied directly at mobile checkout.\n(b) Promotion Strategy: Utilize social media targeted advertising (Facebook, Instagram, LinkedIn), email newsletters to registered frequent travelers, and push notifications within the mobile app."
        }
      ],
      "projectWork": {
        "title": "Student Digital Startup Business Plan",
        "description": "Formulate a digital startup business plan for an online educational tutoring service or eco-friendly craft store. Detail company name, target audience, pricing packages, digital marketing plan, and online payment methods.",
        "materials": [
          "Business plan template",
          "Presentation slides"
        ]
      }
    },
    "slos": [
      {
        "code": "CS-08-16",
        "text": "Formulate basic components of a digital startup business plan",
        "cognitiveLevel": "Application"
      },
      {
        "code": "CS-08-17",
        "text": "Describe the 4 Ps of the Marketing Mix and compare digital vs traditional marketing",
        "cognitiveLevel": "Understanding"
      },
      {
        "code": "CS-08-18",
        "text": "Differentiate between verification and validation in Quality Assurance",
        "cognitiveLevel": "Analysis"
      }
    ],
    "diagrams": [
      {
        "title": "The 4 Ps Marketing Mix",
        "description": "Product, Price, Place, Promotion revolving around Target Customer."
      },
      {
        "title": "Verification vs Validation Lifecycle",
        "description": "Verification (Specification inspection) vs Validation (Product runtime testing)."
      }
    ],
    "definitions": [
      {
        "term": "Entrepreneur",
        "urdu": "انٹرپرینیور (کاروباری شخصیت)",
        "def": "An individual who initiates, organizes, and manages a business enterprise taking on financial risks."
      },
      {
        "term": "Business Plan",
        "urdu": "بزنس پلان",
        "def": "A formal written document detailing an organization's commercial goals and roadmap."
      },
      {
        "term": "Verification",
        "urdu": "تصدیق (ویریفکیشن)",
        "def": "Checking whether a product conforms to its documented design specifications."
      },
      {
        "term": "Validation",
        "urdu": "توثیق (ویلیڈیشن)",
        "def": "Testing a finished product to ensure it satisfies real customer requirements."
      }
    ],
    "glossary": [
      {
        "unit": 6,
        "term": "Business Plan",
        "word": "Business Plan",
        "urdu": "بزنس پلان (کاروباری منصوبہ)",
        "pashto": "سوداګریز پلان",
        "def": "A formal written document describing an organization's goals, strategy, and roadmap.",
        "meaning": "A formal written document describing an organization's goals, strategy, and roadmap."
      },
      {
        "unit": 6,
        "term": "Digital Marketing",
        "word": "Digital Marketing",
        "urdu": "ڈیجیٹل مارکیٹنگ",
        "pashto": "ډیجیټل بازارموندنه",
        "def": "Promotion of brands to connect with prospective customers using the Internet and digital media.",
        "meaning": "Promotion of brands to connect with prospective customers using the Internet and digital media."
      },
      {
        "unit": 6,
        "term": "Entrepreneur",
        "word": "Entrepreneur",
        "urdu": "انٹرپرینیور (کاروباری بانی)",
        "pashto": "متشبث (کاروباري)",
        "def": "An individual who sets up a business venture, taking on financial risks in the hope of profit.",
        "meaning": "An individual who sets up a business venture, taking on financial risks in the hope of profit."
      },
      {
        "unit": 6,
        "term": "Validation",
        "word": "Validation",
        "urdu": "توثیق (ویلیڈیشن)",
        "pashto": "تاییدول",
        "def": "Testing a product to verify it satisfies specified customer needs ('building the right product').",
        "meaning": "Testing a product to verify it satisfies specified customer needs ('building the right product')."
      },
      {
        "unit": 6,
        "term": "Verification",
        "word": "Verification",
        "urdu": "تصدیق (ویریفکیشن)",
        "pashto": "تصدیق کول",
        "def": "Reviewing work to ensure compliance with design specifications ('building the product right').",
        "meaning": "Reviewing work to ensure compliance with design specifications ('building the product right')."
      }
    ],
    "topics": [
      {
        "id": "6.1",
        "title": "Digital Entrepreneurship & The Business Plan",
        "heading": "6.1 Digital Entrepreneurship & The Business Plan",
        "headingUrdu": "6.1 ڈیجیٹل انٹرپرینیورشپ اور بزنس پلان",
        "text": "An entrepreneur is an innovator who identifies a market opportunity, organizes necessary resources, assumes financial risk, and launches a business enterprise.\n• Business Plan: A formal written roadmap outlining a company's vision, objectives, and operational strategies:\n1. Executive Summary: High-level overview of the proposed business idea.\n2. Company Description: Mission statement, target market, and competitive edge.\n3. Market Analysis: Research on target consumer demographics and rival competitors.\n4. Marketing & Sales Strategy: Methods to acquire and retain paying customers.\n5. Financial Plan: Projected startup expenses, revenue streams, and break-even analysis.",
        "paras": [
          "Entrepreneurs drive economic growth through innovative technological solutions.",
          "A robust business plan attracts venture capital funding and mitigates commercial failure."
        ]
      },
      {
        "id": "6.2",
        "title": "The 4 Ps of Marketing & Digital Marketing",
        "heading": "6.2 The 4 Ps of Marketing & Digital Marketing",
        "headingUrdu": "6.2 مارکیٹنگ کے 4 عناصر اور ڈیجیٹل مارکیٹنگ",
        "text": "• The 4 Ps of the Marketing Mix:\n1. Product: The tangible good or digital service designed to solve a consumer pain point.\n2. Price: The monetary value charged, reflecting product quality, manufacturing cost, and customer willingness to pay.\n3. Place: Distribution channels through which customers access the product (retail store vs. e-commerce website).\n4. Promotion: Communication activities (advertising, social media, discounts) that build brand awareness.\n• Digital Marketing: Promoting brands and selling products using digital channels (search engines, social media, email, mobile apps). Offers precise demographic targeting, global reach, and real-time analytical metrics at lower costs than traditional print/TV media.",
        "paras": [
          "The 4 Ps form the cornerstone of marketing strategies.",
          "Digital marketing enables startups to reach global audiences on modest budgets."
        ]
      },
      {
        "id": "6.3",
        "title": "Quality Assurance & Digital Transactions",
        "heading": "6.3 Quality Assurance & Digital Transactions",
        "headingUrdu": "6.3 کوالٹی ایشورنس اور ڈیجیٹل ٹرانزیکشنز",
        "text": "• Quality Assurance (QA): Systematic activities ensuring products meet specified standards before market launch:\n- Verification: Checking whether product blueprints and specifications are followed correctly ('Are we building the product right?').\n- Validation: Testing the finished product with real end-users to confirm it meets actual customer expectations ('Are we building the right product?').\n• Payment vs. Transaction:\n- Payment: The actual transfer of monetary value from the customer to the merchant (e.g., credit card debit, Raast, mobile wallet).\n- Transaction: The entire recorded business event including order agreement, payment processing, invoice generation, and product fulfillment.",
        "paras": [
          "QA prevents costly defective recalls and builds consumer trust.",
          "Digital payments power instantaneous frictionless global e-commerce."
        ]
      }
    ]
  }
];

const COMPUTER_8_GLOSSARY = [
  {
    "unit": 1,
    "term": "Adware",
    "word": "Adware",
    "urdu": "ایڈویئر",
    "pashto": "ایډویر",
    "def": "Malware that automatically displays or downloads unwanted advertisements to a device.",
    "meaning": "Malware that automatically displays or downloads unwanted advertisements to a device."
  },
  {
    "unit": 1,
    "term": "Artificial Intelligence (AI)",
    "word": "Artificial Intelligence (AI)",
    "urdu": "مصنوعی ذہانت",
    "pashto": "مصنوعي هوښیارتیا",
    "def": "The simulation of human intelligence processes by computer systems and algorithms.",
    "meaning": "The simulation of human intelligence processes by computer systems and algorithms."
  },
  {
    "unit": 1,
    "term": "Blockchain",
    "word": "Blockchain",
    "urdu": "بلاک چین",
    "pashto": "بلاک چين",
    "def": "A decentralized, distributed digital ledger recording transactions securely across a network.",
    "meaning": "A decentralized, distributed digital ledger recording transactions securely across a network."
  },
  {
    "unit": 1,
    "term": "Edge Computing",
    "word": "Edge Computing",
    "urdu": "ایج کمپیوٹنگ",
    "pashto": "ایج کمپیوټنګ",
    "def": "Distributed computing paradigm that processes data close to the source where it is generated.",
    "meaning": "Distributed computing paradigm that processes data close to the source where it is generated."
  },
  {
    "unit": 1,
    "term": "Embedded System",
    "word": "Embedded System",
    "urdu": "ایمبیڈڈ سسٹم",
    "pashto": "امبیډډ سیسټم",
    "def": "A dedicated computer hardware system designed to perform specific control functions inside a machine.",
    "meaning": "A dedicated computer hardware system designed to perform specific control functions inside a machine."
  },
  {
    "unit": 1,
    "term": "Fiber Optic Cable",
    "word": "Fiber Optic Cable",
    "urdu": "فائبر آپٹک کیبل",
    "pashto": "فایبر اپټیک کیبل",
    "def": "A high-speed transmission cable that conveys data pulses as light through ultra-thin glass fibers.",
    "meaning": "A high-speed transmission cable that conveys data pulses as light through ultra-thin glass fibers."
  },
  {
    "unit": 1,
    "term": "Internet of Things (IoT)",
    "word": "Internet of Things (IoT)",
    "urdu": "انٹرنیٹ آف تھنگز",
    "pashto": "د شیانو انټرنیټ",
    "def": "A global network of physical devices embedded with sensors connecting wirelessly over the Internet.",
    "meaning": "A global network of physical devices embedded with sensors connecting wirelessly over the Internet."
  },
  {
    "unit": 1,
    "term": "Local Area Network (LAN)",
    "word": "Local Area Network (LAN)",
    "urdu": "لوکل ایریا نیٹ ورک",
    "pashto": "سیمه ییزه شبکه",
    "def": "A computer network spanning a small localized geographical area like an office or school lab.",
    "meaning": "A computer network spanning a small localized geographical area like an office or school lab."
  },
  {
    "unit": 1,
    "term": "Virtual Private Network (VPN)",
    "word": "Virtual Private Network (VPN)",
    "urdu": "ورچوئل پرائیویٹ نیٹ ورک",
    "pashto": "مجازي خصوصي شبکه",
    "def": "An encrypted connection over the public Internet providing secure communication to a private network.",
    "meaning": "An encrypted connection over the public Internet providing secure communication to a private network."
  },
  {
    "unit": 1,
    "term": "Wide Area Network (WAN)",
    "word": "Wide Area Network (WAN)",
    "urdu": "وائیڈ ایریا نیٹ ورک",
    "pashto": "پراخه شبکه",
    "def": "A telecommunications network spanning large geographical areas across cities or whole countries.",
    "meaning": "A telecommunications network spanning large geographical areas across cities or whole countries."
  },
  {
    "unit": 2,
    "term": "Active Cell",
    "word": "Active Cell",
    "urdu": "ایکٹو سیل",
    "pashto": "فعاله حجره (سیل)",
    "def": "The currently selected cell in a spreadsheet highlighted with a thick border.",
    "meaning": "The currently selected cell in a spreadsheet highlighted with a thick border."
  },
  {
    "unit": 2,
    "term": "Cell Address",
    "word": "Cell Address",
    "urdu": "سیل کا پتہ",
    "pashto": "د سیل پته",
    "def": "The unique coordinate location of a cell formed by its column letter and row number (e.g., B4).",
    "meaning": "The unique coordinate location of a cell formed by its column letter and row number (e.g., B4)."
  },
  {
    "unit": 2,
    "term": "Cell Range",
    "word": "Cell Range",
    "urdu": "سیل رینج",
    "pashto": "د سیلونو سلسله",
    "def": "A rectangular block of two or more contiguous cells selected together.",
    "meaning": "A rectangular block of two or more contiguous cells selected together."
  },
  {
    "unit": 2,
    "term": "Formula",
    "word": "Formula",
    "urdu": "فارمولا",
    "pashto": "فارمولا",
    "def": "A mathematical mathematical expression in Excel starting with an equals sign (=).",
    "meaning": "A mathematical mathematical expression in Excel starting with an equals sign (=)."
  },
  {
    "unit": 2,
    "term": "Function",
    "word": "Function",
    "urdu": "فنکشن",
    "pashto": "فنکشن",
    "def": "A built-in pre-coded mathematical or logical tool in Excel (e.g., SUM, AVERAGE).",
    "meaning": "A built-in pre-coded mathematical or logical tool in Excel (e.g., SUM, AVERAGE)."
  },
  {
    "unit": 2,
    "term": "Workbook",
    "word": "Workbook",
    "urdu": "ورک بک",
    "pashto": "ورک بک",
    "def": "An Excel file containing one or more interactive worksheets.",
    "meaning": "An Excel file containing one or more interactive worksheets."
  },
  {
    "unit": 2,
    "term": "Worksheet",
    "word": "Worksheet",
    "urdu": "ورک شیٹ",
    "pashto": "ورک شیټ",
    "def": "A single page grid of rows and columns in an Excel workbook.",
    "meaning": "A single page grid of rows and columns in an Excel workbook."
  },
  {
    "unit": 3,
    "term": "Abstraction",
    "word": "Abstraction",
    "urdu": "تجرید (ایبسٹریکشن)",
    "pashto": "انتزاع",
    "def": "Filtering out irrelevant details to focus strictly on essential characteristics.",
    "meaning": "Filtering out irrelevant details to focus strictly on essential characteristics."
  },
  {
    "unit": 3,
    "term": "Algorithm",
    "word": "Algorithm",
    "urdu": "الگورتھم",
    "pashto": "الګوریتم",
    "def": "A finite step-by-step sequence of unambiguous instructions designed to solve a problem.",
    "meaning": "A finite step-by-step sequence of unambiguous instructions designed to solve a problem."
  },
  {
    "unit": 3,
    "term": "Decomposition",
    "word": "Decomposition",
    "urdu": "ڈی کمپوزیشن (مسئلے کی تقسیم)",
    "pashto": "تجزیه کول",
    "def": "Breaking down a complex problem into smaller, simpler, more manageable sub-problems.",
    "meaning": "Breaking down a complex problem into smaller, simpler, more manageable sub-problems."
  },
  {
    "unit": 3,
    "term": "Flowchart",
    "word": "Flowchart",
    "urdu": "فلو چارٹ",
    "pashto": "فلوچارټ",
    "def": "A graphical diagram representing the sequential steps and decisions of an algorithm.",
    "meaning": "A graphical diagram representing the sequential steps and decisions of an algorithm."
  },
  {
    "unit": 3,
    "term": "Pseudocode",
    "word": "Pseudocode",
    "urdu": "سیوڈو کوڈ",
    "pashto": "سیوډوکوډ",
    "def": "An informal high-level plain English description of a computer program's logic.",
    "meaning": "An informal high-level plain English description of a computer program's logic."
  },
  {
    "unit": 4,
    "term": "Infinite Loop",
    "word": "Infinite Loop",
    "urdu": "لامتناہی لوپ",
    "pashto": "بې پایه لوپ",
    "def": "A sequence of instructions that continues looping endlessly because its exit condition is never met.",
    "meaning": "A sequence of instructions that continues looping endlessly because its exit condition is never met."
  },
  {
    "unit": 4,
    "term": "Iteration",
    "word": "Iteration",
    "urdu": "تکرار (اِٹریشن)",
    "pashto": "تکرار",
    "def": "The repetition of a computational process in order to generate a sequence of outcomes.",
    "meaning": "The repetition of a computational process in order to generate a sequence of outcomes."
  },
  {
    "unit": 4,
    "term": "Nested Loop",
    "word": "Nested Loop",
    "urdu": "نیسٹڈ لوپ",
    "pashto": "نیسټډ لوپ",
    "def": "A loop enclosed completely within the body of another loop.",
    "meaning": "A loop enclosed completely within the body of another loop."
  },
  {
    "unit": 4,
    "term": "Sprite",
    "word": "Sprite",
    "urdu": "سپرائٹ",
    "pashto": "سپرایټ",
    "def": "A visual computer graphic character on a screen that can be controlled by script blocks.",
    "meaning": "A visual computer graphic character on a screen that can be controlled by script blocks."
  },
  {
    "unit": 4,
    "term": "Variable",
    "word": "Variable",
    "urdu": "متغیر (ویری ایبل)",
    "pashto": "متغیر",
    "def": "A named storage location in memory whose value can change during execution.",
    "meaning": "A named storage location in memory whose value can change during execution."
  },
  {
    "unit": 5,
    "term": "Computer Ethics",
    "word": "Computer Ethics",
    "urdu": "کمپیوٹر اخلاقیات",
    "pashto": "د کمپیوټر اخلاق",
    "def": "A set of moral principles regulating the use of digital technology and internet systems.",
    "meaning": "A set of moral principles regulating the use of digital technology and internet systems."
  },
  {
    "unit": 5,
    "term": "Copyright",
    "word": "Copyright",
    "urdu": "کاپی رائٹ",
    "pashto": "د چاپ حق (کاپی رایټ)",
    "def": "The exclusive legal right granted to an originator to produce, copy, or license original works.",
    "meaning": "The exclusive legal right granted to an originator to produce, copy, or license original works."
  },
  {
    "unit": 5,
    "term": "Cyberbullying",
    "word": "Cyberbullying",
    "urdu": "سائبر بلینگ (سائبر دھونس)",
    "pashto": "انلاین ځورونه",
    "def": "The use of digital electronic communication to bully, threaten, or intimidate a person.",
    "meaning": "The use of digital electronic communication to bully, threaten, or intimidate a person."
  },
  {
    "unit": 5,
    "term": "Firewall",
    "word": "Firewall",
    "urdu": "فائر وال",
    "pashto": "فایروال",
    "def": "A network security system monitoring and controlling incoming and outgoing network traffic.",
    "meaning": "A network security system monitoring and controlling incoming and outgoing network traffic."
  },
  {
    "unit": 5,
    "term": "Malware",
    "word": "Malware",
    "urdu": "میلویئر",
    "pashto": "بدغونی سافټویر",
    "def": "Software intentionally designed to cause disruption, damage, or unauthorized access to a computer.",
    "meaning": "Software intentionally designed to cause disruption, damage, or unauthorized access to a computer."
  },
  {
    "unit": 5,
    "term": "Plagiarism",
    "word": "Plagiarism",
    "urdu": "سرقہ بازی (پلیجیرزم)",
    "pashto": "ادبي غلا",
    "def": "The practice of taking someone else's work or ideas and passing them off as one's own.",
    "meaning": "The practice of taking someone else's work or ideas and passing them off as one's own."
  },
  {
    "unit": 5,
    "term": "Ransomware",
    "word": "Ransomware",
    "urdu": "رینسم ویئر",
    "pashto": "باج اخیستونکی سافټویر",
    "def": "Malware that encrypts an organization's data, demanding ransom payments to release it.",
    "meaning": "Malware that encrypts an organization's data, demanding ransom payments to release it."
  },
  {
    "unit": 5,
    "term": "Trojan Horse",
    "word": "Trojan Horse",
    "urdu": "ٹروجن ہارس",
    "pashto": "ټروجن هارس",
    "def": "Malware disguised as legitimate useful software that creates a backdoor vulnerability.",
    "meaning": "Malware disguised as legitimate useful software that creates a backdoor vulnerability."
  },
  {
    "unit": 5,
    "term": "Worm",
    "word": "Worm",
    "urdu": "کمپیوٹر ورم",
    "pashto": "کمپیوټري چنجی (ورم)",
    "def": "A self-replicating standalone malware program spreading automatically across networks.",
    "meaning": "A self-replicating standalone malware program spreading automatically across networks."
  },
  {
    "unit": 6,
    "term": "Business Plan",
    "word": "Business Plan",
    "urdu": "بزنس پلان (کاروباری منصوبہ)",
    "pashto": "سوداګریز پلان",
    "def": "A formal written document describing an organization's goals, strategy, and roadmap.",
    "meaning": "A formal written document describing an organization's goals, strategy, and roadmap."
  },
  {
    "unit": 6,
    "term": "Digital Marketing",
    "word": "Digital Marketing",
    "urdu": "ڈیجیٹل مارکیٹنگ",
    "pashto": "ډیجیټل بازارموندنه",
    "def": "Promotion of brands to connect with prospective customers using the Internet and digital media.",
    "meaning": "Promotion of brands to connect with prospective customers using the Internet and digital media."
  },
  {
    "unit": 6,
    "term": "Entrepreneur",
    "word": "Entrepreneur",
    "urdu": "انٹرپرینیور (کاروباری بانی)",
    "pashto": "متشبث (کاروباري)",
    "def": "An individual who sets up a business venture, taking on financial risks in the hope of profit.",
    "meaning": "An individual who sets up a business venture, taking on financial risks in the hope of profit."
  },
  {
    "unit": 6,
    "term": "Validation",
    "word": "Validation",
    "urdu": "توثیق (ویلیڈیشن)",
    "pashto": "تاییدول",
    "def": "Testing a product to verify it satisfies specified customer needs ('building the right product').",
    "meaning": "Testing a product to verify it satisfies specified customer needs ('building the right product')."
  },
  {
    "unit": 6,
    "term": "Verification",
    "word": "Verification",
    "urdu": "تصدیق (ویریفکیشن)",
    "pashto": "تصدیق کول",
    "def": "Reviewing work to ensure compliance with design specifications ('building the product right').",
    "meaning": "Reviewing work to ensure compliance with design specifications ('building the product right')."
  }
];

if (typeof window !== 'undefined') {
  window.COMPUTER_8_DATA = COMPUTER_8_DATA;
  window.COMPUTER_8_GLOSSARY = COMPUTER_8_GLOSSARY;
}
