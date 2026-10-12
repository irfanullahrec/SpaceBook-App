/* ======================================================================
 *  data.js - core registry (SHARED FILE - maintainers own it)
 *  Contains: stats, classes, subjects, roadmap chapter map, studyPlan, books
 *
 *  Per-subject curriculum data lives in sibling files so that each
 *  contributor edits exactly one file (see CONTRIBUTING.md):
 *    data_chem.js  data_phys.js  data_eng.js  data_bio.js
 * ====================================================================== */
const DATA = {
  "stats": [
    {
      "label": "Active Units",
      "value": "9 Units",
      "icon": "🧬",
      "color": "#e0f2fe"
    },
    {
      "label": "Textbook MCQs",
      "value": "96 MCQs",
      "icon": "🎯",
      "color": "#f0fdf4"
    },
    {
      "label": "Short Questions",
      "value": "52 SQs",
      "icon": "✏️",
      "color": "#fefce8"
    },
    {
      "label": "Detailed Questions",
      "value": "36 LQs",
      "icon": "📝",
      "color": "#f5f3ff"
    }
  ],
  "classes": [
    {
      "id": "cls-pg",
      "name": "Play Group",
      "emoji": "🎨",
      "subjects": 4
    },
    {
      "id": "cls-nur",
      "name": "Nursery",
      "emoji": "🧸",
      "subjects": 4
    },
    {
      "id": "cls-kg",
      "name": "KG",
      "emoji": "🎈",
      "subjects": 4
    },
    {
      "id": "cls1",
      "name": "Class 1",
      "emoji": "✏️",
      "subjects": 8
    },
    {
      "id": "cls2",
      "name": "Class 2",
      "emoji": "📖",
      "subjects": 8
    },
    {
      "id": "cls3",
      "name": "Class 3",
      "emoji": "📚",
      "subjects": 8
    },
    {
      "id": "cls4",
      "name": "Class 4",
      "emoji": "🎒",
      "subjects": 6
    },
    {
      "id": "cls5",
      "name": "Class 5",
      "emoji": "🔬",
      "subjects": 8
    },
    {
      "id": "cls6",
      "name": "Class 6",
      "emoji": "📐",
      "subjects": 13
    },
    {
      "id": "cls7",
      "name": "Class 7",
      "emoji": "🧪",
      "subjects": 7
    },
    {
      "id": "cls8",
      "name": "Class 8",
      "emoji": "⚛️",
      "subjects": 13
    },
    {
      "id": "cls9",
      "name": "Class 9",
      "emoji": "🏫",
      "subjects": 14
    },
    {
      "id": "cls10",
      "name": "Class 10",
      "emoji": "🏫",
      "subjects": 14
    },
    {
      "id": "cls11",
      "name": "Class 11",
      "emoji": "🏛️",
      "subjects": 5
    },
    {
      "id": "cls12",
      "name": "Class 12",
      "emoji": "🎓",
      "subjects": 15
    }
  ],
  "subjects": {
    "cls-pg": [
      { "id": "cls-pg-eng",  "name": "English Basics", "nameUrdu": "بنیادی انگریزی", "emoji": "🔤", "chapters": 8 },
      { "id": "cls-pg-urdu", "name": "Urdu Haroof",    "nameUrdu": "حروفِ تہجی",     "emoji": "📗", "chapters": 8 },
      { "id": "cls-pg-math", "name": "Basic Math",     "nameUrdu": "بنیادی ریاضی",   "emoji": "🔢", "chapters": 8 },
      { "id": "cls-pg-art",  "name": "Art & Rhymes",   "nameUrdu": "رنگ و نظمیں",    "emoji": "🎨", "chapters": 6 }
    ],
    "cls-nur": [
      { "id": "cls-nur-eng",  "name": "English",           "nameUrdu": "انگریزی",        "emoji": "📖", "chapters": 10 },
      { "id": "cls-nur-urdu", "name": "Urdu",              "nameUrdu": "اردو",           "emoji": "📗", "chapters": 10 },
      { "id": "cls-nur-math", "name": "Mathematics",       "nameUrdu": "ریاضی",          "emoji": "🔢", "chapters": 10 },
      { "id": "cls-nur-gk",   "name": "General Knowledge", "nameUrdu": "واقفیتِ عامہ",   "emoji": "🌍", "chapters": 8 }
    ],
    "cls-kg": [
      { "id": "cls-kg-eng",  "name": "English",           "nameUrdu": "انگریزی",        "emoji": "📖", "chapters": 12 },
      { "id": "cls-kg-urdu", "name": "Urdu",              "nameUrdu": "اردو",           "emoji": "📗", "chapters": 12 },
      { "id": "cls-kg-math", "name": "Mathematics",       "nameUrdu": "ریاضی",          "emoji": "🔢", "chapters": 12 },
      { "id": "cls-kg-gk",   "name": "General Knowledge", "nameUrdu": "واقفیتِ عامہ",   "emoji": "🌱", "chapters": 10 }
    ],
    "cls1": [
      { "id": "cls1-eng",  "name": "English",           "nameUrdu": "انگریزی",        "emoji": "📖", "chapters": 11, "hasEng": true, "hasEng1": true },
      { "id": "cls1-urdu", "name": "Urdu",              "nameUrdu": "اردو لازمی",     "emoji": "📗", "chapters": 12 },
      { "id": "cls1-math", "name": "Mathematics",       "nameUrdu": "ریاضی",          "emoji": "📐", "chapters": 6 },
      { "id": "cls1-gk",   "name": "General Knowledge", "nameUrdu": "واقفیتِ عامہ",   "emoji": "🌍", "chapters": 10 },
      { "id": "cls1-isl",  "name": "Islamyat",          "nameUrdu": "اسلامیات",            "emoji": "🕌", "chapters": 10, "hasIsl": true, "hasIsl1": true },
      { "id": "cls1-nazira", "name": "Nazira Quran",    "nameUrdu": "ناظرہ قرآن",          "emoji": "📖", "chapters": 17, "hasNazira": true, "hasNazira1": true },
      { "id": "cls1-pashto", "name": "Pashto",          "nameUrdu": "پښتو (لازمي)",        "emoji": "📚", "chapters": 23, "hasPashto": true, "hasPashto1": true },
      { "id": "cls1-drawing", "name": "Drawing",         "nameUrdu": "تخلیقی فنون و ڈرائنگ", "emoji": "🎨", "chapters": 32, "hasDrawing": true }
    ],
    "cls2": [
      { "id": "cls2-eng",     "name": "English",           "nameUrdu": "انگریزی",             "emoji": "📖", "chapters": 12, "hasEng": true, "hasEng2": true },
      { "id": "cls2-urdu",    "name": "Urdu",              "nameUrdu": "اردو لازمی",          "emoji": "📗", "chapters": 22, "hasUrdu": true, "hasUrdu2": true },
      { "id": "cls2-math",    "name": "Mathematics",       "nameUrdu": "ریاضی",               "emoji": "📐", "chapters": 6,  "hasMath": true, "hasMath2": true },
      { "id": "cls2-gk",      "name": "General Knowledge", "nameUrdu": "واقفیتِ عامہ",        "emoji": "🌍", "chapters": 16, "hasGk": true, "hasGk2": true },
      { "id": "cls2-isl",     "name": "Islamyat",          "nameUrdu": "اسلامیات",            "emoji": "🕌", "chapters": 11, "hasIsl": true, "hasIsl2": true },
      { "id": "cls2-nazira",  "name": "Nazira Quran",      "nameUrdu": "ناظرہ قرآن",          "emoji": "📖", "chapters": 15, "hasNazira": true, "hasNazira2": true },
      { "id": "cls2-pashto",  "name": "Pashto",            "nameUrdu": "پښتو (لازمي)",        "emoji": "📚", "chapters": 28, "hasPashto": true, "hasPashto2": true },
      { "id": "cls2-drawing", "name": "Drawing",           "nameUrdu": "تخلیقی فنون و ڈرائنگ", "emoji": "🎨", "chapters": 32, "hasDrawing": true }
    ],
    "cls3": [
      { "id": "cls3-eng",     "name": "English",           "nameUrdu": "انگریزی",             "emoji": "📖", "chapters": 11, "hasEng": true, "hasEng3": true },
      { "id": "cls3-urdu",    "name": "Urdu",              "nameUrdu": "اردو لازمی",          "emoji": "📗", "chapters": 14 },
      { "id": "cls3-math",    "name": "Mathematics",       "nameUrdu": "ریاضی",               "emoji": "📐", "chapters": 7, "hasMath": true, "hasMath3": true },
      { "id": "cls3-gk",      "name": "General Knowledge", "nameUrdu": "واقفیتِ عامہ",        "emoji": "🌍", "chapters": 16, "hasGk": true, "hasGk3": true },
      { "id": "cls3-isl",     "name": "Islamyat",          "nameUrdu": "اسلامیات",            "emoji": "🕌", "chapters": 18, "hasIsl": true, "hasIsl3": true },
      { "id": "cls3-nazira",  "name": "Nazira Quran",      "nameUrdu": "ناظرہ قرآن",          "emoji": "📖", "chapters": 16, "hasNazira": true, "hasNazira3": true },
      { "id": "cls3-pashto",  "name": "Pashto",            "nameUrdu": "پښتو (لازمي)",        "emoji": "📚", "chapters": 33, "hasPashto": true, "hasPashto3": true },
      { "id": "cls3-drawing", "name": "Drawing",           "nameUrdu": "تخلیقی فنون و ڈرائنگ", "emoji": "🎨", "chapters": 32, "hasDrawing": true }
    ],
    "cls4": [
      { "id": "cls4-math",   "name": "Mathematics",     "nameUrdu": "ریاضی",          "emoji": "📐", "chapters": 10, "hasMath": true },
      { "id": "cls4-eng",    "name": "English",         "nameUrdu": "انگریزی",        "emoji": "📖", "chapters": 13, "hasEng": true },
      { "id": "cls4-sci",    "name": "General Science", "nameUrdu": "جنرل سائنس",     "emoji": "🔬", "chapters": 10, "hasGenSci": true },
      { "id": "cls4-sst",    "name": "Social Studies",  "nameUrdu": "معاشرتی علوم",   "emoji": "🗺️", "chapters": 6,  "hasSst": true },
      { "id": "cls4-isl",    "name": "Islamyat",        "nameUrdu": "اسلامیات",       "emoji": "🕌", "chapters": 7,  "hasIsl": true },
      { "id": "cls4-pashto", "name": "Pashto",          "nameUrdu": "پښتو لازمي",     "emoji": "📚", "chapters": 18, "hasPashto": true }
    ],
    "cls5": [
      { "id": "cls5-math",   "name": "Mathematics",            "nameUrdu": "ریاضی",                      "emoji": "📐", "chapters": 9,  "hasMath": true },
      { "id": "cls5-sci",    "name": "General Science",        "nameUrdu": "جنرل سائنس",                 "emoji": "🔬", "chapters": 10, "hasGenSci": true },
      { "id": "cls5-eng",    "name": "English",                "nameUrdu": "انگریزی",                    "emoji": "📖", "chapters": 14, "hasEng": true },
      { "id": "cls5-urdu",   "name": "Urdu",                   "nameUrdu": "اردو لازمی",                 "emoji": "📗", "chapters": 21, "hasUrdu": true },
      { "id": "cls5-isl",    "name": "Islamyat",               "nameUrdu": "اسلامیات لازمی",             "emoji": "🕌", "chapters": 7,  "hasIsl": true },
      { "id": "cls5-sst",    "name": "Social Studies (EM)",    "nameUrdu": "سوشل اسٹڈیز (انگلش میڈیم)",   "emoji": "🗺️", "chapters": 6,  "hasSst": true },
      { "id": "cls5-sstum",  "name": "Social Studies (UM)",    "nameUrdu": "معاشرتی علوم (اردو میڈیم)",   "emoji": "🌍", "chapters": 6,  "hasSstum": true },
      { "id": "cls5-pashto", "name": "Pashto",                 "nameUrdu": "پښتو لازمي",                 "emoji": "📚", "chapters": 28, "hasPashto": true }
    ],
    "cls6": [
      { "id": "cls6-math", "name": "Mathematics", "nameUrdu": "ریاضی", "emoji": "📐", "chapters": 11, "hasMath": true },
      { "id": "cls6-sci", "name": "General Science", "nameUrdu": "جنرل سائنس", "emoji": "🔬", "chapters": 11, "hasGenSci": true },
      { "id": "cls6-eng", "name": "English", "nameUrdu": "انگریزی", "emoji": "📖", "chapters": 10, "hasEng": true },
      { "id": "cls6-urdu", "name": "Urdu", "nameUrdu": "اردو لازمی", "emoji": "📗", "chapters": 15, "hasUrdu": true },
      { "id": "cls6-isl", "name": "Islamyat", "nameUrdu": "اسلامیات", "emoji": "🕌", "chapters": 7, "hasIsl": true },
      { "id": "cls6-comp", "name": "Computer Education", "nameUrdu": "کمپیوٹر", "emoji": "💻", "chapters": 6, "hasComp": true },
      { "id": "cls6-geo", "name": "Geography", "nameUrdu": "جغرافیہ", "emoji": "🌍", "chapters": 4, "hasGeo": true },
      { "id": "cls6-hist", "name": "History", "nameUrdu": "تاریخ", "emoji": "🏛️", "chapters": 5, "hasHist": true },
      { "id": "cls6-hpe", "name": "Health & Physical Education", "nameUrdu": "صحت و جسمانی تعلیم", "emoji": "🏃", "chapters": 6, "hasHpe": true },
      { "id": "cls6-drawing", "name": "Drawing / Art", "nameUrdu": "ڈرائنگ / فنونِ لطیفہ", "emoji": "🎨", "chapters": 6, "hasDrawing": true },
      { "id": "cls6-arabic", "name": "Arabic", "nameUrdu": "عربی", "emoji": "📜", "chapters": 8, "hasArabic": true },
      { "id": "cls6-quran", "name": "Mutalia-e-Quran-e-Hakeem", "nameUrdu": "مطالعہ قرآن حکیم", "emoji": "📖", "chapters": 8, "hasQuran": true },
      { "id": "cls6-pashto", "name": "Pashto", "nameUrdu": "پښتو لازمي", "emoji": "📚", "chapters": 12, "hasPashto": true }
    ],
    "cls7": [
      { "id": "cls7-eng",  "name": "English",             "nameUrdu": "انگریزی",        "emoji": "📖", "chapters": 7, "hasEng": true },
      { "id": "cls7-urdu", "name": "Urdu",                "nameUrdu": "اردو لازمی",     "emoji": "📗", "chapters": 26, "hasUrdu": true },
      { "id": "cls7-math", "name": "Mathematics",         "nameUrdu": "ریاضی",          "emoji": "📐", "chapters": 13, "hasMath": true },
      { "id": "cls7-sci",  "name": "General Science",     "nameUrdu": "جنرل سائنس",     "emoji": "🔬", "chapters": 12, "hasGenSci": true },
            { "id": "cls7-geo",  "name": "Geography",           "nameUrdu": "جغرافیہ",        "emoji": "🌍", "chapters": 6, "hasGeo": true },
      { "id": "cls7-hist", "name": "History",             "nameUrdu": "تاریخ",          "emoji": "🏛️", "chapters": 6, "hasHist": true },
      { "id": "cls7-hg",   "name": "History & Geography", "nameUrdu": "تاریخ و جغرافیہ", "emoji": "🌍", "chapters": 12, "hasHg": true },
      { "id": "cls7-comp", "name": "Computer Education",  "nameUrdu": "کمپیوٹر سائنس", "emoji": "💻", "chapters": 6, "hasComp": true },
      { "id": "cls7-isl",  "name": "Islamyat",            "nameUrdu": "اسلامیات",       "emoji": "🕌", "chapters": 7, "hasIsl": true },
      { "id": "cls7-quran", "name": "Mutalia-e-Quran-e-Hakeem", "nameUrdu": "مطالعہ قرآن حکیم", "emoji": "📖", "chapters": 22, "hasQuran": true },
      { "id": "cls7-arabic", "name": "Arabic", "nameUrdu": "عربی", "emoji": "📜", "chapters": 25, "hasArabic": true },
      { "id": "cls7-drawing", "name": "Drawing / Art", "nameUrdu": "ڈرائنگ / فنونِ لطیفہ", "emoji": "🎨", "chapters": 5, "hasDrawing": true },
      { "id": "cls7-hpe", "name": "Health & Physical Education", "nameUrdu": "صحت و جسمانی تعلیم", "emoji": "🏃", "chapters": 12, "hasHpe": true }
    ],
    "cls8": [
      { "id": "cls8-eng",  "name": "English",             "nameUrdu": "انگریزی",        "emoji": "📖", "chapters": 8, "hasEng": true },
      { "id": "cls8-urdu", "name": "Urdu",                "nameUrdu": "اردو لازمی",     "emoji": "📗", "chapters": 25, "hasUrdu": true },
      { "id": "cls8-math", "name": "Mathematics",         "nameUrdu": "ریاضی",          "emoji": "📐", "chapters": 11, "hasMath": true },
      { "id": "cls8-sci",  "name": "General Science",     "nameUrdu": "جنرل سائنس",     "emoji": "🔬", "chapters": 12, "hasGenSci": true },
      { "id": "cls8-geo",  "name": "Geography",           "nameUrdu": "جغرافیہ",        "emoji": "🌍", "chapters": 6, "hasGeo": true },
      { "id": "cls8-hist", "name": "History",             "nameUrdu": "تاریخ",          "emoji": "🏛️", "chapters": 6, "hasHist": true },
      { "id": "cls8-comp", "name": "Computer Education",  "nameUrdu": "کمپیوٹر",        "emoji": "💻", "chapters": 6, "hasComp": true },
      { "id": "cls8-isl",  "name": "Islamyat",            "nameUrdu": "اسلامیات",       "emoji": "🕌", "chapters": 7, "hasIsl": true },
      { "id": "cls8-quran", "name": "Mutalia-e-Quran-e-Hakeem", "nameUrdu": "مطالعہ قرآن حکیم", "emoji": "📖", "chapters": 24, "hasQuran": true },
      { "id": "cls8-pashto", "name": "Pashto",                 "nameUrdu": "پښتو لازمي",     "emoji": "📚", "chapters": 33, "hasPashto": true },
      { "id": "cls8-arabic", "name": "Arabic",                 "nameUrdu": "عربی",          "emoji": "📜", "chapters": 26, "hasArabic": true },
      { "id": "cls8-drawing", "name": "Drawing / Art",         "nameUrdu": "ڈرائنگ / فنونِ لطیفہ", "emoji": "🎨", "chapters": 6, "hasDrawing": true },
      { "id": "cls8-hpe",     "name": "Health & Physical Education", "nameUrdu": "صحت و جسمانی تعلیم", "emoji": "🏃", "chapters": 9, "hasHpe": true }
    ],
    "cls9": [
      {
        "id": "cls9-math",
        "name": "Mathematics",
        "emoji": "📐",
        "chapters": 17,
        "hasMath": true
      },
      {
        "id": "cls9-phy",
        "name": "Physics",
        "emoji": "⚛️",
        "chapters": 9,
        "hasPhys": true
      },
      {
        "id": "cls9-chem",
        "name": "Chemistry",
        "emoji": "🧪",
        "chapters": 8,
        "hasChem": true
      },
      {
        "id": "cls9-bio",
        "name": "Biology",
        "emoji": "🧬",
        "chapters": 9,
        "hasBio": true
      },
      {
        "id": "cls9-eng",
        "name": "English",
        "emoji": "📖",
        "chapters": 15,
        "hasEng": true
      },
      {
        "id": "cls9-urdu",
        "name": "Urdu",
        "emoji": "📗",
        "chapters": 19,
        "hasUrdu": true
      },
      {
        "id": "cls9-isl",
        "name": "Islamyat",
        "emoji": "🕌",
        "chapters": 15,
        "hasIsl": true
      },
      {
        "id": "cls9-comp",
        "name": "Computer Science",
        "emoji": "💻",
        "chapters": 7,
        "hasComp": true
      },
      {
        "id": "cls9-pakstudy",
        "name": "Pakistan Studies",
        "nameUrdu": "مطالعہ پاکستان",
        "emoji": "🇵🇰",
        "chapters": 4,
        "hasPakStudy": true
      },
      {
        "id": "cls9-sci",
        "name": "General Science",
        "nameUrdu": "جنرل سائنس",
        "emoji": "🔬",
        "chapters": 5,
        "hasGenSci": true,
        "hasGenSci9": true
      },
      {
        "id": "cls9-hpe",
        "name": "Health & Physical Education",
        "nameUrdu": "صحت و جسمانی تعلیم",
        "emoji": "🏃",
        "chapters": 8,
        "hasHpe": true,
        "hasHpe9": true
      },
      {
        "id": "cls9-drawing",
        "name": "Art & Model Drawing",
        "nameUrdu": "ڈرائنگ و ماڈل آرٹ",
        "emoji": "🎨",
        "chapters": 4,
        "hasDrawing": true,
        "hasDrawing9": true
      },
      {
        "id": "cls9-islopt",
        "name": "Islamiat Ikhtiari",
        "nameUrdu": "اسلامیات اختیاری",
        "emoji": "🕌",
        "chapters": 7,
        "hasIslopt": true,
        "hasIslopt9": true
      },
      {
        "id": "cls9-quran",
        "name": "Mutalia-e-Quran",
        "nameUrdu": "مطالعہ قرآن حکیم",
        "emoji": "📖",
        "chapters": 6,
        "hasQuran": true,
        "hasQuran9": true
      }
    ],
    "cls10": [
      {
        "id": "cls10-math",
        "name": "Mathematics",
        "emoji": "📐",
        "chapters": 13,
        "hasMath": true
      },
      {
        "id": "cls10-phy",
        "name": "Physics",
        "emoji": "⚡",
        "chapters": 9,
        "hasPhys10": true
      },
      {
        "id": "cls10-chem",
        "name": "Chemistry",
        "emoji": "🧪",
        "chapters": 8,
        "hasChem10": true
      },
      {
        "id": "cls10-bio",
        "name": "Biology",
        "emoji": "🧬",
        "chapters": 9,
        "hasBio10": true
      },
      {
        "id": "cls10-eng",
        "name": "English",
        "emoji": "📖",
        "chapters": 15,
        "hasEng": true,
        "hasEng10": true
      },
      {
        "id": "cls10-pakstudy",
        "name": "Pakistan Studies",
        "nameUrdu": "مطالعہ پاکستان",
        "emoji": "🇵🇰",
        "chapters": 4,
        "hasPakStudy": true,
        "hasPakStudy10": true
      },
      {
        "id": "cls10-isl",
        "name": "Islamyat",
        "emoji": "🕌",
        "chapters": 18,
        "hasIsl": true,
        "hasIsl10": true
      },
      {
        "id": "cls10-urdu",
        "name": "Urdu",
        "nameUrdu": "اردو لازمی",
        "emoji": "📗",
        "chapters": 22,
        "hasUrdu": true,
        "hasUrdu10": true
      },
      {
        "id": "cls10-comp",
        "name": "Computer Science",
        "nameUrdu": "کمپیوٹر سائنس",
        "emoji": "💻",
        "chapters": 7,
        "hasComp": true,
        "hasComp10": true
      },
      {
        "id": "cls10-sci",
        "name": "General Science",
        "nameUrdu": "جنرل سائنس",
        "emoji": "🔬",
        "chapters": 6,
        "hasGenSci": true,
        "hasGenSci10": true
      },
      {
        "id": "cls10-hpe",
        "name": "Health & Physical Education",
        "nameUrdu": "صحت و جسمانی تعلیم",
        "emoji": "🏃",
        "chapters": 8,
        "hasHpe": true,
        "hasHpe10": true
      },
      {
        "id": "cls10-drawing",
        "name": "Art & Model Drawing",
        "nameUrdu": "ڈرائنگ و ماڈل آرٹ",
        "emoji": "🎨",
        "chapters": 4,
        "hasDrawing": true,
        "hasDrawing10": true
      },
      {
        "id": "cls10-islopt",
        "name": "Islamiat Ikhtiari",
        "nameUrdu": "اسلامیات اختیاری",
        "emoji": "🕌",
        "chapters": 4,
        "hasIslopt": true,
        "hasIslopt10": true
      },
      {
        "id": "cls10-quran",
        "name": "Mutalia-e-Quran",
        "nameUrdu": "مطالعہ قرآن حکیم",
        "emoji": "📖",
        "chapters": 8,
        "hasQuran": true,
        "hasQuran10": true
      }
    ],
    "cls11": [
      {
        "id": "cls11-math",
        "name": "Mathematics",
        "emoji": "📐",
        "chapters": 14
      },
      {
        "id": "cls11-phy",
        "name": "Physics",
        "emoji": "⚡",
        "chapters": 10
      },
      {
        "id": "cls11-chem",
        "name": "Chemistry",
        "emoji": "🧪",
        "chapters": 11
      },
      {
        "id": "cls11-bio",
        "name": "Biology",
        "emoji": "🧬",
        "chapters": 10
      },
      {
        "id": "cls11-eng",
        "name": "English",
        "emoji": "📖",
        "chapters": 9
      }
    ],
    "cls12": [
      {
        "id": "cls12-math",
        "name": "Mathematics",
        "emoji": "📐",
        "chapters": 12,
        "hasMath": true
      },
      {
        "id": "cls12-phy",
        "name": "Physics",
        "emoji": "⚡",
        "chapters": 10,
        "hasPhys": true
      },
      {
        "id": "cls12-chem",
        "name": "Chemistry",
        "emoji": "🧪",
        "chapters": 12,
        "hasChem": true
      },
      {
        "id": "cls12-stat",
        "name": "Statistics",
        "emoji": "📊",
        "chapters": 9,
        "hasStat": true
      },
      {
        "id": "cls12-eng",
        "name": "English",
        "nameUrdu": "انگریزی لازمی",
        "emoji": "📖",
        "chapters": 19,
        "hasEng": true,
        "hasEng12": true
      },
      {
        "id": "cls12-urdu",
        "name": "Urdu",
        "nameUrdu": "اردو لازمی",
        "emoji": "📗",
        "chapters": 22,
        "hasUrdu": true,
        "hasUrdu12": true
      },
      {
        "id": "cls12-bio",
        "name": "Biology",
        "nameUrdu": "حیاتیات",
        "emoji": "🧬",
        "chapters": 14,
        "hasBio": true,
        "hasBio12": true
      },
      {
        "id": "cls12-pak",
        "name": "Pakistan Studies",
        "nameUrdu": "مطالعہ پاکستان",
        "emoji": "🇵🇰",
        "chapters": 11,
        "hasPakStudy": true,
        "hasPakStudy12": true
      },
      {
        "id": "cls12-comp",
        "name": "Computer Science",
        "nameUrdu": "کمپیوٹر سائنس",
        "emoji": "💻",
        "chapters": 9,
        "hasComp": true,
        "hasComp12": true
      },
      {
        "id": "cls12-civics",
        "name": "Civics",
        "nameUrdu": "شہریت (سوکس)",
        "emoji": "🏛️",
        "chapters": 8,
        "hasCivics": true
      },
      {
        "id": "cls12-econ",
        "name": "Economics",
        "nameUrdu": "معاشیات",
        "emoji": "📈",
        "chapters": 12,
        "hasEcon": true
      },
      {
        "id": "cls12-hpe",
        "name": "Health & Physical Education",
        "nameUrdu": "صحت و جسمانی تعلیم",
        "emoji": "🏃",
        "chapters": 6,
        "hasHpe": true
      },
      {
        "id": "cls12-islopt",
        "name": "Islamiat Ikhtiari",
        "nameUrdu": "اسلامیات اختیاری",
        "emoji": "🕌",
        "chapters": 6,
        "hasIslopt": true
      },
      {
        "id": "cls12-islhist",
        "name": "Islamic History",
        "nameUrdu": "تاریخِ اسلام",
        "emoji": "📜",
        "chapters": 6,
        "hasIslhist": true
      },
      {
        "id": "cls12-quran",
        "name": "Mutalia-e-Quran",
        "nameUrdu": "ترجمۃ القرآن المجید",
        "emoji": "📖",
        "chapters": 8,
        "hasQuran": true
      }
    ]
  },
  "chapters": {
    "cls9-math": [
      {
        "num": 1,
        "name": "Matrices and Determinants",
        "topics": "4 Topics",
        "status": "done"
      },
      {
        "num": 2,
        "name": "Real and Complex Numbers",
        "topics": "3 Topics",
        "status": "done"
      },
      {
        "num": 3,
        "name": "Logarithms",
        "topics": "5 Topics",
        "status": "done"
      },
      {
        "num": 4,
        "name": "Algebraic Expressions",
        "topics": "4 Topics",
        "status": "progress"
      },
      {
        "num": 5,
        "name": "Factorization",
        "topics": "5 Topics",
        "status": "progress"
      },
      {
        "num": 6,
        "name": "Algebraic Manipulation",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 7,
        "name": "Linear Equations & Inequalities",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 8,
        "name": "Linear Graphs & Equations",
        "topics": "5 Topics",
        "status": "upcoming"
      },
      {
        "num": 9,
        "name": "Coordinate Geometry",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 10,
        "name": "Congruent Triangles",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 11,
        "name": "Parallelograms & Triangles",
        "topics": "3 Topics",
        "status": "upcoming"
      }
    ],
    "cls9-phy": [
      {
        "num": 1,
        "name": "Physical Quantities & Measurement",
        "topics": "5 Topics",
        "status": "done"
      },
      {
        "num": 2,
        "name": "Kinematics",
        "topics": "6 Topics",
        "status": "done"
      },
      {
        "num": 3,
        "name": "Dynamics",
        "topics": "5 Topics",
        "status": "progress"
      },
      {
        "num": 4,
        "name": "Turning Effect of Forces",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 5,
        "name": "Gravitation",
        "topics": "5 Topics",
        "status": "upcoming"
      },
      {
        "num": 6,
        "name": "Work and Energy",
        "topics": "5 Topics",
        "status": "upcoming"
      },
      {
        "num": 7,
        "name": "Properties of Matter",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 8,
        "name": "Thermal Properties of Matter",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 9,
        "name": "Transfer of Heat",
        "topics": "3 Topics",
        "status": "upcoming"
      }
    ],
    "cls9-chem": [
      {
        "num": 1,
        "name": "Fundamentals of Chemistry",
        "topics": "4 Topics",
        "status": "done"
      },
      {
        "num": 2,
        "name": "Structure of Atoms",
        "topics": "5 Topics",
        "status": "done"
      },
      {
        "num": 3,
        "name": "Periodic Table & Periodicity",
        "topics": "4 Topics",
        "status": "progress"
      },
      {
        "num": 4,
        "name": "Structure of Molecules",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 5,
        "name": "Physical States of Matter",
        "topics": "5 Topics",
        "status": "upcoming"
      },
      {
        "num": 6,
        "name": "Solutions",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 7,
        "name": "Electrochemistry",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 8,
        "name": "Chemical Reactivity",
        "topics": "5 Topics",
        "status": "upcoming"
      },
      {
        "num": 9,
        "name": "Biochemistry",
        "topics": "3 Topics",
        "status": "upcoming"
      }
    ],
    "cls12-phy": [
      {
        "num": 1,
        "name": "Electrostatics",
        "topics": "5 Topics",
        "status": "done"
      },
      {
        "num": 2,
        "name": "Current Electricity",
        "topics": "5 Topics",
        "status": "done"
      },
      {
        "num": 3,
        "name": "Electromagnetism",
        "topics": "4 Topics",
        "status": "done"
      },
      {
        "num": 4,
        "name": "Electromagnetic Induction",
        "topics": "5 Topics",
        "status": "progress"
      },
      {
        "num": 5,
        "name": "Alternating Current",
        "topics": "4 Topics",
        "status": "progress"
      },
      {
        "num": 6,
        "name": "Physics of Solids",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 7,
        "name": "Electronics",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 8,
        "name": "Dawn of Modern Physics",
        "topics": "5 Topics",
        "status": "upcoming"
      },
      {
        "num": 9,
        "name": "Atomic Spectra",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 10,
        "name": "Nuclear Physics",
        "topics": "5 Topics",
        "status": "upcoming"
      }
    ],
    "cls12-chem": [
      {
        "num": 1,
        "name": "Periodic Classification & Periodicity",
        "topics": "4 Topics",
        "status": "done"
      },
      {
        "num": 2,
        "name": "s-Block Elements",
        "topics": "3 Topics",
        "status": "done"
      },
      {
        "num": 3,
        "name": "Group IIIA and IVA Elements",
        "topics": "4 Topics",
        "status": "done"
      },
      {
        "num": 4,
        "name": "Group VA and VIA Elements",
        "topics": "4 Topics",
        "status": "progress"
      },
      {
        "num": 5,
        "name": "The Halogens and Noble Gases",
        "topics": "3 Topics",
        "status": "progress"
      },
      {
        "num": 6,
        "name": "Transition Elements",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 7,
        "name": "Fundamental Principles of Organic Chemistry",
        "topics": "5 Topics",
        "status": "upcoming"
      },
      {
        "num": 8,
        "name": "Aliphatic Hydrocarbons",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 9,
        "name": "Aromatic Hydrocarbons",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 10,
        "name": "Alkyl Halides",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 11,
        "name": "Alcohols, Phenols and Ethers",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 12,
        "name": "Aldehydes and Ketones",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 13,
        "name": "Carboxylic Acids",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 14,
        "name": "Macromolecules",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 15,
        "name": "Common Chemical Industries in Pakistan",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 16,
        "name": "Environmental Chemistry",
        "topics": "3 Topics",
        "status": "upcoming"
      }
    ],
    "cls12-bio": [
      {
        "num": 1,
        "name": "Homeostasis",
        "topics": "4 Topics",
        "status": "done"
      },
      {
        "num": 2,
        "name": "Support and Movement",
        "topics": "4 Topics",
        "status": "done"
      },
      {
        "num": 3,
        "name": "Coordination and Control",
        "topics": "5 Topics",
        "status": "done"
      },
      {
        "num": 4,
        "name": "Reproduction",
        "topics": "5 Topics",
        "status": "progress"
      },
      {
        "num": 5,
        "name": "Growth and Development",
        "topics": "3 Topics",
        "status": "progress"
      },
      {
        "num": 6,
        "name": "Chromosomes and DNA",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 7,
        "name": "Cell Cycle",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 8,
        "name": "Variation and Genetics",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 9,
        "name": "Biotechnology",
        "topics": "4 Topics",
        "status": "upcoming"
      },
      {
        "num": 10,
        "name": "Evolution",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 11,
        "name": "Ecosystem",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 12,
        "name": "Some Major Ecosystems",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 13,
        "name": "Man and His Environment",
        "topics": "3 Topics",
        "status": "upcoming"
      }
    ],
    "cls12-math": [
      {
        "num": 1,
        "name": "Functions and Limits",
        "topics": "5 Topics",
        "status": "done"
      },
      {
        "num": 2,
        "name": "Differentiation",
        "topics": "6 Topics",
        "status": "done"
      },
      {
        "num": 3,
        "name": "Integration",
        "topics": "6 Topics",
        "status": "progress"
      },
      {
        "num": 4,
        "name": "Introduction to Analytic Geometry",
        "topics": "5 Topics",
        "status": "progress"
      },
      {
        "num": 5,
        "name": "Linear Inequalities and Linear Programming",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 6,
        "name": "Conic Sections",
        "topics": "5 Topics",
        "status": "upcoming"
      },
      {
        "num": 7,
        "name": "Vectors",
        "topics": "4 Topics",
        "status": "upcoming"
      }
    ],
    "cls12-eng": [
      {
        "num": 1,
        "name": "Twenty Minutes with Mrs. Oakentubb",
        "topics": "3 Topics",
        "status": "done"
      },
      {
        "num": 2,
        "name": "Reflections on the Re-Awakening East",
        "topics": "3 Topics",
        "status": "done"
      },
      {
        "num": 3,
        "name": "The Day the Dam Broke",
        "topics": "3 Topics",
        "status": "progress"
      },
      {
        "num": 4,
        "name": "Pakistan and the Modern World",
        "topics": "3 Topics",
        "status": "progress"
      },
      {
        "num": 5,
        "name": "Act III of the Silver Box",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 6,
        "name": "The World As I See It",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 7,
        "name": "The Devoted Friend",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 8,
        "name": "Grammar & Composition",
        "topics": "4 Topics",
        "status": "upcoming"
      }
    ],
    "cls12-pak": [
      {
        "num": 1,
        "name": "Islam and Pakistan",
        "topics": "3 Topics",
        "status": "done"
      },
      {
        "num": 2,
        "name": "Political & Constitutional Development",
        "topics": "4 Topics",
        "status": "done"
      },
      {
        "num": 3,
        "name": "Administrative Structure of Pakistan",
        "topics": "3 Topics",
        "status": "progress"
      },
      {
        "num": 4,
        "name": "Foreign Policy of Pakistan",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 5,
        "name": "Economic Planning & Development",
        "topics": "3 Topics",
        "status": "upcoming"
      },
      {
        "num": 6,
        "name": "Culture and Society of Pakistan",
        "topics": "3 Topics",
        "status": "upcoming"
      }
    ],
    "cls9-eng": [
      {
        "num": 1,
        "name": "Hazrat Muhammad (SAW) the Model of Tolerance",
        "topics": "7 Words · 0 SQs · 5 MCQs",
        "status": "done"
      },
      {
        "num": 2,
        "name": "Iqbal's Message to Youth",
        "topics": "6 Words · 0 SQs · 5 MCQs",
        "status": "done"
      },
      {
        "num": 3,
        "name": "Quaid — A Great Leader",
        "topics": "5 Words · 0 SQs · 3 MCQs",
        "status": "done"
      },
      {
        "num": 4,
        "name": "The Daffodils",
        "topics": "8 Words · 0 SQs · 3 MCQs",
        "status": "done"
      },
      {
        "num": 5,
        "name": "The Madina Charter",
        "topics": "8 Words · 0 SQs · 3 MCQs",
        "status": "done"
      },
      {
        "num": 6,
        "name": "Nasiruddin",
        "topics": "16 Words · 7 SQs · 0 MCQs",
        "status": "done"
      },
      {
        "num": 7,
        "name": "The Two Bargains",
        "topics": "11 Words · 9 SQs · 5 MCQs",
        "status": "done"
      },
      {
        "num": 8,
        "name": "Hope is the Thing with Feathers",
        "topics": "8 Words · 8 SQs · 5 MCQs",
        "status": "done"
      },
      {
        "num": 9,
        "name": "The Fantastic Shoemaker",
        "topics": "22 Words · 10 SQs · 4 MCQs",
        "status": "done"
      },
      {
        "num": 10,
        "name": "Technology in Everyday Life",
        "topics": "11 Words · 7 SQs · 5 MCQs",
        "status": "done"
      },
      {
        "num": 11,
        "name": "Safety First",
        "topics": "9 Words · 5 SQs · 4 MCQs",
        "status": "done"
      },
      {
        "num": 12,
        "name": "The Old Woman",
        "topics": "4 Words · 7 SQs · 5 MCQs",
        "status": "done"
      },
      {
        "num": 13,
        "name": "Letter to the Newspaper Editor",
        "topics": "10 Words · 6 SQs · 0 MCQs",
        "status": "done"
      },
      {
        "num": 14,
        "name": "Biodiversity in Pakistan",
        "topics": "9 Words · 6 SQs · 0 MCQs",
        "status": "done"
      },
      {
        "num": 15,
        "name": "Abou Ben Adhem",
        "topics": "8 Words · 6 SQs · 5 MCQs",
        "status": "done"
      }
    ],
    "cls10-bio": [
      {
        "num": 10,
        "name": "Gaseous Exchange",
        "topics": "5 Topics · Pages 1 – 15",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 11,
        "name": "Homeostasis",
        "topics": "5 Topics · Pages 16 – 31",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 12,
        "name": "Coordination and Control",
        "topics": "4 Topics · Pages 32 – 55",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 13,
        "name": "Support and Movement",
        "topics": "5 Topics · Pages 56 – 70",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 14,
        "name": "Reproduction",
        "topics": "3 Topics · Pages 71 – 96",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 15,
        "name": "Inheritance",
        "topics": "4 Topics · Pages 97 – 116",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 16,
        "name": "Man and His Environment",
        "topics": "4 Topics · Pages 117 – 149",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 17,
        "name": "Biotechnology",
        "topics": "4 Topics · Pages 150 – 163",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 18,
        "name": "Pharmacology",
        "topics": "4 Topics · Pages 164 – 186",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      }
    ],
    "cls10-phy": [
      {
        "num": 10,
        "name": "Simple Harmonic Motion and Waves",
        "topics": "3 Topics · 7 Numericals · Pages 1 – 26",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 11,
        "name": "Sound",
        "topics": "4 Topics · 8 Numericals · Pages 27 – 51",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 12,
        "name": "Geometrical Optics",
        "topics": "4 Topics · 8 Numericals · Pages 52 – 103",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 13,
        "name": "Electrostatics",
        "topics": "4 Topics · 7 Numericals · Pages 108 – 135",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 14,
        "name": "Current Electricity",
        "topics": "4 Topics · 7 Numericals · Pages 134 – 170",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 15,
        "name": "Electromagnetism",
        "topics": "4 Topics · 7 Numericals · Pages 171 – 197",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 16,
        "name": "Introductory Electronics",
        "topics": "4 Topics · 0 Numericals · Pages 198 – 214",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 17,
        "name": "Information and Communication Technology",
        "topics": "4 Topics · 0 Numericals · Pages 215 – 235",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      },
      {
        "num": 18,
        "name": "Radioactivity and Nuclear Physics",
        "topics": "4 Topics · 6 Numericals · Pages 236 – 266",
        "status": "ready",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 10–18)"
      }
    ],
    "cls10-chem": [
      {
        "num": 9,
        "name": "Chemical Equilibrium",
        "topics": "4 Topics (11 Subtopics) · 4 Numericals · Pages 1 – 20 (Book)",
        "status": "done",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 9–16)",
        "title": "Chemical Equilibrium"
      },
      {
        "num": 10,
        "name": "Acids, Bases and Salts",
        "topics": "3 Topics (11 Subtopics) · 6 Numericals · Pages 21 – 48 (Book)",
        "status": "done",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 9–16)",
        "title": "Acids, Bases and Salts"
      },
      {
        "num": 11,
        "name": "Organic Chemistry",
        "topics": "5 Topics (11 Subtopics) · Pages 49 – 74 (Book)",
        "status": "done",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 9–16)",
        "title": "Organic Chemistry"
      },
      {
        "num": 12,
        "name": "Hydrocarbons",
        "topics": "4 Topics (8 Subtopics) · Pages 75 – 100 (Book)",
        "status": "done",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 9–16)",
        "title": "Hydrocarbons"
      },
      {
        "num": 13,
        "name": "Biochemistry",
        "topics": "5 Topics (10 Subtopics) · Pages 101 – 125 (Book)",
        "status": "done",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 9–16)",
        "title": "Biochemistry"
      },
      {
        "num": 14,
        "name": "Environmental Chemistry I: Atmosphere",
        "topics": "5 Topics (9 Subtopics) · Pages 126 – 156 (Book)",
        "status": "done",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 9–16)",
        "title": "Environmental Chemistry I: Atmosphere"
      },
      {
        "num": 15,
        "name": "Environmental Chemistry II: Water",
        "topics": "5 Topics (11 Subtopics) · Pages 157 – 186 (Book)",
        "status": "done",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 9–16)",
        "title": "Environmental Chemistry II: Water"
      },
      {
        "num": 16,
        "name": "Chemical Industries",
        "topics": "4 Topics (8 Subtopics) · 2 Numericals · Pages 187 – 212 (Book)",
        "status": "done",
        "progress": 100,
        "isVerified": true,
        "verifiedTag": "KPK Textbook Board (Units 9–16)",
        "title": "Chemical Industries"
      }
    ],
    "cls10-eng": [
      {
            "num": 1,
            "unit": 1,
            "name": "Simplicity and Humility of Hazrat Muhammad (PBUH)",
            "title": "Simplicity and Humility of Hazrat Muhammad (PBUH)",
            "topics": "12 Words · 5 SQs · 5 MCQs",
            "status": "done"
      },
      {
            "num": 2,
            "unit": 2,
            "name": "The Champions",
            "title": "The Champions",
            "topics": "7 Words · 5 SQs · 5 MCQs",
            "status": "done"
      },
      {
            "num": 3,
            "unit": 3,
            "name": "Dreams",
            "title": "Dreams",
            "topics": "5 Words · 5 SQs · 5 MCQs",
            "status": "done"
      },
      {
            "num": 4,
            "unit": 4,
            "name": "Population Growth and its Impact on Environment",
            "title": "Population Growth and its Impact on Environment",
            "topics": "7 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 5,
            "unit": 5,
            "name": "The Great Masjid of Cordoba and Iqbal",
            "title": "The Great Masjid of Cordoba and Iqbal",
            "topics": "7 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 6,
            "unit": 6,
            "name": "In Spite of War",
            "title": "In Spite of War",
            "topics": "7 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 7,
            "unit": 7,
            "name": "The Aged Mother",
            "title": "The Aged Mother",
            "topics": "7 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 8,
            "unit": 8,
            "name": "Women's Role in the Pakistan Movement",
            "title": "Women's Role in the Pakistan Movement",
            "topics": "7 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 9,
            "unit": 9,
            "name": "Equipment",
            "title": "Equipment",
            "topics": "5 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 10,
            "unit": 10,
            "name": "Water Scarcity in Pakistan",
            "title": "Water Scarcity in Pakistan",
            "topics": "6 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 11,
            "unit": 11,
            "name": "Genetically Modified Organisms (GMOs)",
            "title": "Genetically Modified Organisms (GMOs)",
            "topics": "6 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 12,
            "unit": 12,
            "name": "They Have Cut Down the Pines",
            "title": "They Have Cut Down the Pines",
            "topics": "5 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 13,
            "unit": 13,
            "name": "Hazrat Umar (R.A)",
            "title": "Hazrat Umar (R.A)",
            "topics": "7 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 14,
            "unit": 14,
            "name": "The Model Millionaire",
            "title": "The Model Millionaire",
            "topics": "7 Words · 4 SQs · 4 MCQs",
            "status": "done"
      },
      {
            "num": 15,
            "unit": 15,
            "name": "Opportunity",
            "title": "Opportunity",
            "topics": "6 Words · 4 SQs · 4 MCQs",
            "status": "done"
      }
]
  },
  "studyPlan": [
    {
      "day": "Day 1 — Concepts & Topics",
      "subject": "Biology — Read Theory & Notes",
      "time": "4:00 PM – 5:30 PM",
      "progress": 90
    },
    {
      "day": "Day 2 — Definitions & Diagrams",
      "subject": "Biology — Draw Diagrams & Tables",
      "time": "4:00 PM – 5:30 PM",
      "progress": 80
    },
    {
      "day": "Day 3 — Textbook Short Questions",
      "subject": "Biology — Write & Memorize SQs",
      "time": "3:30 PM – 5:00 PM",
      "progress": 85
    },
    {
      "day": "Day 4 — Textbook Long Questions",
      "subject": "Biology — Structure Long Question Notes",
      "time": "4:00 PM – 5:30 PM",
      "progress": 70
    },
    {
      "day": "Day 5 — MCQs & Chapter Test",
      "subject": "Biology — Solve MCQs & Self-Assessment",
      "time": "4:00 PM – 5:30 PM",
      "progress": 60
    }
  ],
  "books": [
    {
      "id": "b-cls1-eng",
      "classId": "cls1",
      "class_id": "cls1",
      "className": "Class 1",
      "class_name": "Class 1",
      "subject": "English (Compulsory)",
      "title": "English 1st Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "9.47 MB",
      "pages": "Complete 11 Units & 4 Reviews",
      "pdfPath": "assets/books/Class-1-English-KPK.pdf",
      "pdf_path": "assets/books/Class-1-English-KPK.pdf",
      "color": "#4f46e5",
      "icon": "📖",
      "available": true,
      "action": "cls1-eng",
      "hub_action": "cls1-eng",
      "subject_id": 1
    },
    {
      "id": "b-cls1-isl",
      "classId": "cls1",
      "class_id": "cls1",
      "className": "Class 1",
      "class_name": "Class 1",
      "subject": "Islamyat (Compulsory)",
      "title": "Islamyat 1st Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "15.34 MB",
      "pages": "Complete 10 Units (5 Babs)",
      "pdfPath": "assets/books/Class-1-Islamyat-KPK.pdf",
      "pdf_path": "assets/books/Class-1-Islamyat-KPK.pdf",
      "color": "#0d9488",
      "icon": "🕌",
      "available": true,
      "action": "cls1-isl",
      "hub_action": "cls1-isl",
      "subject_id": 5
    },
    {
      "id": "b-cls1-nazira",
      "classId": "cls1",
      "class_id": "cls1",
      "className": "Class 1",
      "class_name": "Class 1",
      "subject": "Nazira Quran",
      "title": "Nazira Quran 1st Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "12.16 MB",
      "pages": "Complete 17 Lessons (Tajweed & Surahs)",
      "pdfPath": "assets/books/Class-1-Nazira-KPK.pdf",
      "pdf_path": "assets/books/Class-1-Nazira-KPK.pdf",
      "color": "#059669",
      "icon": "📖",
      "available": true,
      "action": "cls1-nazira",
      "hub_action": "cls1-nazira",
      "subject_id": 6
    },
    {
      "id": "b-cls1-pashto",
      "classId": "cls1",
      "class_id": "cls1",
      "className": "Class 1",
      "class_name": "Class 1",
      "subject": "Pashto (Compulsory)",
      "title": "Pashto 1st Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "29.17 MB",
      "pages": "Complete 23 Units (88 Pages)",
      "pdfPath": "assets/books/Class-1-Pashto-KPK.pdf",
      "pdf_path": "assets/books/Class-1-Pashto-KPK.pdf",
      "color": "#0d9488",
      "icon": "📚",
      "available": true,
      "action": "cls1-pashto",
      "hub_action": "cls1-pashto",
      "subject_id": 7
    },
    {
      "id": "b-cls2-math",
      "classId": "cls2",
      "className": "Class 2",
      "subject": "Mathematics",
      "title": "Mathematics 2nd Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "24.5 MB",
      "pages": "Complete 6 Units (167 Pages)",
      "pdfPath": "Books/2nd/2nd Maths/PDF/Math Book for 2 class KPTBB.pdf",
      "color": "#2563eb",
      "icon": "📐",
      "available": true,
      "action": "cls2-math"
    },
    {
      "id": "b-cls2-eng",
      "classId": "cls2",
      "className": "Class 2",
      "subject": "English",
      "title": "English 2nd Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "21.8 MB",
      "pages": "Complete 12 Units (138 Pages)",
      "pdfPath": "Books/2nd/2nd English/PDF/English Book for 2 class KPTBB.pdf",
      "color": "#4f46e5",
      "icon": "📖",
      "available": true,
      "action": "cls2-eng"
    },
    {
      "id": "b-cls2-urdu",
      "classId": "cls2",
      "className": "Class 2",
      "subject": "Urdu",
      "title": "Urdu 2nd Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "19.4 MB",
      "pages": "Complete 22 Lessons (117 Pages)",
      "pdfPath": "Books/2nd/2nd Urdu/PDF/Urdu Book for 2 class KPTBB 1.pdf",
      "color": "#16a34a",
      "icon": "📗",
      "available": true,
      "action": "cls2-urdu"
    },
    {
      "id": "b-cls2-gk",
      "classId": "cls2",
      "className": "Class 2",
      "subject": "General Knowledge",
      "title": "General Knowledge 2nd Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "18.2 MB",
      "pages": "Complete 16 Units (103 Pages)",
      "pdfPath": "Books/2nd/2nd GK/PDF/GK Book for 2 class KPTBB.pdf",
      "color": "#0284c7",
      "icon": "🌍",
      "available": true,
      "action": "cls2-gk"
    },
    {
      "id": "b-cls2-isl",
      "classId": "cls2",
      "className": "Class 2",
      "subject": "Islamyat",
      "title": "Islamyat 2nd Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "11.6 MB",
      "pages": "Complete 11 Units (58 Pages)",
      "pdfPath": "Books/2nd/2nd Islamyat/PDF/Islamiat Book for 2 class KPTBB.pdf",
      "color": "#0d9488",
      "icon": "🕌",
      "available": true,
      "action": "cls2-isl"
    },
    {
      "id": "b-cls2-nazira",
      "classId": "cls2",
      "className": "Class 2",
      "subject": "Nazira Quran",
      "title": "Nazira Quran 2nd Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "15.0 MB",
      "pages": "Complete 15 Lessons (91 Pages)",
      "pdfPath": "Books/2nd/2nd Nazira/PDF/2nd Nazira.pdf",
      "color": "#059669",
      "icon": "📖",
      "available": true,
      "action": "cls2-nazira"
    },
    {
      "id": "b-cls2-pashto",
      "classId": "cls2",
      "className": "Class 2",
      "subject": "Pashto",
      "title": "Pashto 2nd Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "12.7 MB",
      "pages": "Complete 28 Units (64 Pages)",
      "pdfPath": "Books/2nd/2nd Pashto/PDF/pashto 2nd.pdf",
      "color": "#ca8a04",
      "icon": "📚",
      "available": true,
      "action": "cls2-pashto"
    },
    {
      "id": "b-cls2-drawing",
      "classId": "cls2",
      "className": "Class 2",
      "subject": "Drawing",
      "title": "Drawing & Arts 2nd Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "7.8 MB",
      "pages": "Complete 32 Activities (34 Pages)",
      "pdfPath": "Books/2nd/2nd Drawing/PDF/Drawing  Book for 2 class KPTBB.pdf",
      "color": "#ea580c",
      "icon": "🎨",
      "available": true,
      "action": "cls2-drawing"
    },
    {
      "id": "b-cls10-eng",
      "classId": "cls10",
      "class_id": "cls10",
      "className": "Class 10",
      "class_name": "Class 10",
      "subject": "English (Compulsory)",
      "title": "English 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "25.9 MB",
      "pages": "Complete 15 Units (161 Pages)",
      "pdfPath": "assets/books/Class-10-English-KPK.pdf",
      "pdf_path": "assets/books/Class-10-English-KPK.pdf",
      "color": "#0284c7",
      "icon": "📖",
      "available": true,
      "action": "cls10-eng",
      "hub_action": "cls10-eng",
      "subject_id": 21
    },
    {
      "id": "b-cls5-math",
      "classId": "cls5",
      "className": "Class 5",
      "subject": "Mathematics",
      "title": "Mathematics 5th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "36.9 MB",
      "pages": "Complete 9 Units",
      "pdfPath": "Books/5th/5th Maths/PDF/Math Book for 5 class KPTBB.pdf",
      "color": "#2563eb",
      "icon": "📐",
      "available": true,
      "action": "cls5-math"
    },
    {
      "id": "b-cls5-sci",
      "classId": "cls5",
      "className": "Class 5",
      "subject": "General Science",
      "title": "General Science 5th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "38.4 MB",
      "pages": "Complete 10 Chapters",
      "pdfPath": "Books/5th/5th General Science/PDF/General Sceince Book for 5 class KPTBB.pdf",
      "color": "#059669",
      "icon": "🔬",
      "available": true,
      "action": "cls5-sci"
    },
    {
      "id": "b-cls5-eng",
      "classId": "cls5",
      "className": "Class 5",
      "subject": "English",
      "title": "English 5th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "39.7 MB",
      "pages": "Complete 14 Units",
      "pdfPath": "Books/5th/5th English/PDF/English Book for 5 class KPTBB.pdf",
      "color": "#4f46e5",
      "icon": "📖",
      "available": true,
      "action": "cls5-eng"
    },
    {
      "id": "b-cls5-urdu",
      "classId": "cls5",
      "className": "Class 5",
      "subject": "Urdu",
      "title": "Urdu 5th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "34.4 MB",
      "pages": "Complete 21 Lessons",
      "pdfPath": "Books/5th/5th Urdu/PDF/Urdu Book for 5 class KPTBB.pdf",
      "color": "#16a34a",
      "icon": "📗",
      "available": true,
      "action": "cls5-urdu"
    },
    {
      "id": "b-cls5-isl",
      "classId": "cls5",
      "className": "Class 5",
      "subject": "Islamyat",
      "title": "Islamyat 5th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "28.7 MB",
      "pages": "Complete 7 Abwab",
      "pdfPath": "Books/5th/5th Islamiat/PDF/Islamiat Book for 5 class KPTBB.pdf",
      "color": "#0d9488",
      "icon": "🕌",
      "available": true,
      "action": "cls5-isl"
    },
    {
      "id": "b-cls5-sst",
      "classId": "cls5",
      "className": "Class 5",
      "subject": "Social Studies (EM)",
      "title": "Social Studies 5th Class Textbook (EM)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "38.6 MB",
      "pages": "Complete 6 Chapters",
      "pdfPath": "Books/5th/5th Social Study/PDF/Social Study Book 5th EM KPK.pdf",
      "color": "#0d9488",
      "icon": "🗺️",
      "available": true,
      "action": "cls5-sst"
    },
    {
      "id": "b-cls5-sstum",
      "classId": "cls5",
      "className": "Class 5",
      "subject": "Social Studies (UM)",
      "title": "معاشرتی علوم 5th Class Textbook (UM)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "23.5 MB",
      "pages": "Complete 6 Abwab",
      "pdfPath": "Books/5th/5th Social Study UM/PDF/Social Study Book UM for 5 class KPTBB.pdf",
      "color": "#059669",
      "icon": "🌍",
      "available": true,
      "action": "cls5-sstum"
    },
    {
      "id": "b-cls5-pashto",
      "classId": "cls5",
      "className": "Class 5",
      "subject": "Pashto",
      "title": "Pashto 5th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "35.1 MB",
      "pages": "Complete 28 Lessons",
      "pdfPath": "Books/5th/5th Pashto/PDF/Pashto Book for 5 class KPTBB.pdf",
      "color": "#0f766e",
      "icon": "📚",
      "available": true,
      "action": "cls5-pashto"
    },
    {
      "id": "b-cls6-math",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Mathematics",
      "title": "Mathematics 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "27.2 MB",
      "pages": "Complete 11 Units",
      "pdfPath": "Books/6th/Math/pdf/Math Book for 6 class KPTBB.pdf",
      "color": "#2563eb",
      "icon": "📐",
      "available": true,
      "action": "cls6-math"
    },
    {
      "id": "b-cls6-sci",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "General Science",
      "title": "General Science 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "40.9 MB",
      "pages": "Complete 11 Units",
      "pdfPath": "Books/6th/General science/pdf/General Science Book 6th Class KPK.pdf",
      "color": "#059669",
      "icon": "🔬",
      "available": true,
      "action": "cls6-sci"
    },
    {
      "id": "b-cls6-eng",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "English",
      "title": "English 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "24.0 MB",
      "pages": "Complete 10 Units",
      "pdfPath": "Books/6th/English/pdf/English Book for 6 class KPTBB.pdf",
      "color": "#4f46e5",
      "icon": "📖",
      "available": true,
      "action": "cls6-eng"
    },
    {
      "id": "b-cls6-urdu",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Urdu",
      "title": "Urdu 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "14.2 MB",
      "pages": "Complete 15 Lessons",
      "pdfPath": "Books/6th/Urdu/PDF URDU/Urdu Book for 6 class KPTBB.pdf",
      "color": "#16a34a",
      "icon": "📗",
      "available": true,
      "action": "cls6-urdu"
    },
    {
      "id": "b-cls6-isl",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Islamyat",
      "title": "Islamyat 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "23.5 MB",
      "pages": "Complete 7 Abwab",
      "pdfPath": "Books/6th/Islamiat/pdf/Islamiat book 6th KPK.pdf",
      "color": "#0d9488",
      "icon": "🕌",
      "available": true,
      "action": "cls6-isl"
    },
    {
      "id": "b-cls6-comp",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Computer Education",
      "title": "Computer Education 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "20.3 MB",
      "pages": "Complete 6 Units",
      "pdfPath": "Books/6th/Computer/pdf/Computer Science EM 6th class KPK.pdf",
      "color": "#0284c7",
      "icon": "💻",
      "available": true,
      "action": "cls6-comp"
    },
    {
      "id": "b-cls6-geo",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Geography",
      "title": "Geography 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "20.3 MB",
      "pages": "Complete 4 Units",
      "pdfPath": "Books/6th/Geography/pdf/Geography Book EM for 6th KPK.pdf",
      "color": "#d97706",
      "icon": "🌍",
      "available": true,
      "action": "cls6-geo"
    },
    {
      "id": "b-cls6-hist",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "History",
      "title": "History 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "39.6 MB",
      "pages": "Complete 5 Units",
      "pdfPath": "Books/6th/History/pdf/History Book 6th class EM KPK.pdf",
      "color": "#b45309",
      "icon": "🏛️",
      "available": true,
      "action": "cls6-hist"
    },
    {
      "id": "b-cls6-hpe",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Health & Physical Education",
      "title": "HPE 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "11.9 MB",
      "pages": "Complete 6 Abwab",
      "pdfPath": "Books/6th/Hpe/pdf/HPE book UM 6th classs KPK.pdf",
      "color": "#ea580c",
      "icon": "🏃",
      "available": true,
      "action": "cls6-hpe"
    },
    {
      "id": "b-cls6-drawing",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Drawing / Art",
      "title": "Drawing & Art 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "36.2 MB",
      "pages": "Complete 6 Chapters",
      "pdfPath": "Books/6th/Drawing/pdf/Drawing Book EM 6th class KPK.pdf",
      "color": "#ec4899",
      "icon": "🎨",
      "available": true,
      "action": "cls6-drawing"
    },
    {
      "id": "b-cls6-arabic",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Arabic",
      "title": "Arabic 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "10.1 MB",
      "pages": "Complete 8 Lessons",
      "pdfPath": "Books/6th/Arabic/pdf/Arabic Book for 6 class KPTBB.pdf",
      "color": "#047857",
      "icon": "📜",
      "available": true,
      "action": "cls6-arabic"
    },
    {
      "id": "b-cls6-quran",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Mutalia-e-Quran-e-Hakeem",
      "title": "Mutalia-e-Quran-e-Hakeem 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "23.1 MB",
      "pages": "Complete 8 Surahs",
      "pdfPath": "Books/6th/M-Q/PDF/Mutlia_e_Quran_Book_KPK_6th.pdf",
      "color": "#065f46",
      "icon": "📖",
      "available": true,
      "action": "cls6-quran"
    },
    {
      "id": "b-cls6-pashto",
      "classId": "cls6",
      "className": "Class 6",
      "subject": "Pashto",
      "title": "Pashto 6th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "16.4 MB",
      "pages": "Complete 12 Lessons",
      "pdfPath": "Books/6th/Pashto/pdf/Pashto Book for 6 class KPTBB.pdf",
      "color": "#0f766e",
      "icon": "📚",
      "available": true,
      "action": "cls6-pashto"
    },
    {
      "id": "b-cls7-eng",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "English",
      "title": "English 7th Class Textbook (KPTBB)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "47.1 MB",
      "pages": "Complete 7 Units",
      "pdfPath": "Books/7th/7th English/PDF/English Book for 7 class KPTBB.pdf",
      "color": "#4f46e5",
      "icon": "📖",
      "available": true,
      "action": "cls7-eng"
    },
    {
      "id": "b-cls7-math",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "Mathematics",
      "title": "Mathematics 7th Class Textbook (KPTBB)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "25.1 MB",
      "pages": "Complete 13 Units",
      "pdfPath": "Books/7th/7th MAths/PDF/Math Book for 7 class KPTBB.pdf",
      "color": "#2563eb",
      "icon": "📐",
      "available": true,
      "action": "cls7-math"
    },
    {
      "id": "b-cls7-sci",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "General Science",
      "title": "General Science 7th Class Textbook (KPTBB)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "19.1 MB",
      "pages": "Complete 12 Units",
      "pdfPath": "Books/7th/7th General Science/PDF/General Sci  Book for 7 class KPTBB.pdf",
      "color": "#059669",
      "icon": "🔬",
      "available": true,
      "action": "cls7-sci"
    },
    {
      "id": "b-cls7-comp",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "Computer Education",
      "title": "Computer Science 7th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "21.4 MB",
      "pages": "Complete 6 Units",
      "pdfPath": "Books/7th/7th CS/PDF/Computer Science EM 7th class KPK.pdf",
      "color": "#4f46e5",
      "icon": "💻",
      "available": true,
      "action": "cls7-comp"
    },
    {
      "id": "b-cls7-geo",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "Geography",
      "title": "Geography 7th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "18.1 MB",
      "pages": "Complete 6 Units",
      "pdfPath": "Books/7th/7th Geography/PDF/Geography Book 7th E-M KPK.pdf",
      "color": "#d97706",
      "icon": "🌍",
      "available": true,
      "action": "cls7-geo"
    },
    {
      "id": "b-cls7-hist",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "History",
      "title": "History 7th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "53.9 MB",
      "pages": "Complete 6 Units",
      "pdfPath": "Books/7th/7th History/PDF/History book for 7th E-M Kpk.pdf",
      "color": "#78350f",
      "icon": "🏛️",
      "available": true,
      "action": "cls7-hist"
    },
    {
      "id": "b-cls7-urdu",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "Urdu",
      "title": "Urdu 7th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "13.3 MB",
      "pages": "Complete 26 Chapters",
      "pdfPath": "Books/7th/7th Urdu/PDF/Urdu Book for 7 class KPTBB.pdf",
      "color": "#059669",
      "icon": "📗",
      "available": true,
      "action": "cls7-urdu"
    },
    {
      "id": "b-cls7-isl",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "Islamyat",
      "title": "Islamiat 7th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "13.3 MB",
      "pages": "Complete 7 Abwaab",
      "pdfPath": "Books/7th/7th Islamiat/PDF/Islamiat Book for 7 class KPTBB.pdf",
      "color": "#059669",
      "icon": "🕌",
      "available": true,
      "action": "cls7-isl"
    },
    {
      "id": "b-cls7-quran",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "Mutalia-e-Quran-e-Hakeem",
      "title": "Mutalia-e-Quran-e-Hakeem 7th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "35.1 MB",
      "pages": "Complete 22 Lessons (Semester 1 & 2)",
      "pdfPath": "Books/7th/7th M Q/PDF/Mutlia_e_Quran_Book_KPK_7.pdf",
      "color": "#047857",
      "icon": "📖",
      "available": true,
      "action": "cls7-quran"
    },
    {
      "id": "b-cls7-arabic",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "Arabic",
      "title": "Arabic 7th Class Textbook (KPTBB)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "9.9 MB",
      "pages": "Complete 25 Lessons",
      "pdfPath": "Books/7th/7th Arabi/PDF/Arabic Book for 7 class KPTBB.pdf",
      "color": "#059669",
      "icon": "📜",
      "available": true,
      "action": "cls7-arabic"
    },
    {
      "id": "b-cls7-drawing",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "Drawing / Art",
      "title": "Drawing 7th Class Textbook (KPTBB EM)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "25.6 MB",
      "pages": "Complete 5 Chapters",
      "pdfPath": "Books/7th/7th Drawing/PDF/Drawing Book EM 7th class KPK.pdf",
      "color": "#d97706",
      "icon": "🎨",
      "available": true,
      "action": "cls7-drawing"
    },
    {
      "id": "b-cls7-hpe",
      "classId": "cls7",
      "className": "Class 7",
      "subject": "Health & Physical Education",
      "title": "Health & Physical Education 7th Class Textbook (KPTBB)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "18.1 MB",
      "pages": "Complete 12 Units",
      "pdfPath": "Books/7th/7th HPE/PDF/HP Book for 7 class KPTBB.pdf",
      "color": "#0284c7",
      "icon": "🏃",
      "available": true,
      "action": "cls7-hpe"
    },



    {
      "id": "b-cls8-eng",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "English",
      "title": "English 8th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "34.5 MB",
      "pages": "Complete 8 Units",
      "pdfPath": "Books/8th/8th English/PDF/English Book for 8 class KPTBB.pdf",
      "color": "#4f46e5",
      "icon": "📖",
      "available": true,
      "action": "cls8-eng"
    },
    {
      "id": "b-cls8-math",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Mathematics",
      "title": "Mathematics 8th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "32.8 MB",
      "pages": "Complete 11 Units",
      "pdfPath": "Books/8th/8th MAths/PDF/Math Book for 8 class KPTBB.pdf",
      "color": "#2563eb",
      "icon": "📐",
      "available": true,
      "action": "cls8-math"
    },
    {
      "id": "b-cls8-sci",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "General Science",
      "title": "General Science 8th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "44.5 MB",
      "pages": "Complete 12 Units",
      "pdfPath": "Books/8th/8th General Science/PDF/General science book 8th Class kpk.pdf",
      "color": "#059669",
      "icon": "🔬",
      "available": true,
      "action": "cls8-sci"
    },
    {
      "id": "b-cls8-comp",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Computer Education",
      "title": "Computer Science 8th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "18.3 MB",
      "pages": "Complete 6 Units",
      "pdfPath": "Books/8th/8th CS/PDF/Computer Science EM 8th class KPK.pdf",
      "color": "#4f46e5",
      "icon": "💻",
      "available": true,
      "action": "cls8-comp"
    },
    {
      "id": "b-cls8-geo",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Geography",
      "title": "Geography 8th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "21.8 MB",
      "pages": "Complete 6 Units",
      "pdfPath": "Books/8th/8th Geography/PDF/Geography Book EM 8th KPK.pdf",
      "color": "#d97706",
      "icon": "🌍",
      "available": true,
      "action": "cls8-geo"
    },
    {
      "id": "b-cls8-hist",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "History",
      "title": "History 8th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "54.9 MB",
      "pages": "Complete 6 Units",
      "pdfPath": "Books/8th/8th History/PDF/History Book EM 8th class KPK.pdf",
      "color": "#78350f",
      "icon": "🏛️",
      "available": true,
      "action": "cls8-hist"
    },
    {
      "id": "b-cls8-urdu",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Urdu",
      "title": "Urdu 8th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "49.2 MB",
      "pages": "Complete 25 Chapters",
      "pdfPath": "Books/8th/Urdu/PDF/Urdu Book for 8 class KPTBB.pdf",
      "color": "#059669",
      "icon": "📗",
      "available": true,
      "action": "cls8-urdu"
    },
    {
      "id": "b-cls8-isl",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Islamyat",
      "title": "Islamyat 8th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "20.5 MB",
      "pages": "Complete 7 Abwaab",
      "pdfPath": "Books/8th/8th Islamiat/PDF/Islamiat book 8th Class KPK.pdf",
      "color": "#d97706",
      "icon": "🕌",
      "available": true,
      "action": "cls8-isl"
    },
    {
      "id": "b-cls8-quran",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Mutalia-e-Quran",
      "title": "Mutalia-e-Quran-e-Hakeem 8th Class Textbook (SNC 2022)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "42.7 MB",
      "pages": "Complete 24 Surahs",
      "pdfPath": "Books/8th/8th M Q/PDF/Mutlia_e_Quran_Book_KPK_8 (1).pdf",
      "color": "#065f46",
      "icon": "📖",
      "available": true,
      "action": "cls8-quran"
    },
    {
      "id": "b-cls8-pashto",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Pashto",
      "title": "Pashto 8th Class Textbook (KPTBB 2024-25)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "41.3 MB",
      "pages": "Complete 33 Chapters",
      "pdfPath": "Books/8th/8th PAshto/PDF/Pashto Book 8th class KPK.pdf",
      "color": "#0d9488",
      "icon": "📚",
      "available": true,
      "action": "cls8-pashto"
    },
    {
      "id": "b-cls8-arabic",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Arabic",
      "title": "Arabic 8th Class Textbook (KPTBB)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "16.4 MB",
      "pages": "Complete 26 Lessons",
      "pdfPath": "Books/8th/8th Arabi/PDF/Arabic Book for 8 class KPTBB.pdf",
      "color": "#047857",
      "icon": "📜",
      "available": true,
      "action": "cls8-arabic"
    },
    {
      "id": "b-cls8-drawing",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Drawing / Art",
      "title": "Drawing 8th Class Textbook (KPTBB)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "17.5 MB",
      "pages": "Complete 6 Units",
      "pdfPath": "Books/8th/8th Drawing/PDF/Drawing Book 8th Class EM KPK.pdf",
      "color": "#ec4899",
      "icon": "🎨",
      "available": true,
      "action": "cls8-drawing"
    },
    {
      "id": "b-cls8-hpe",
      "classId": "cls8",
      "className": "Class 8",
      "subject": "Health & Physical Education",
      "title": "HPE 8th Class Textbook (KPTBB)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "28.4 MB",
      "pages": "Complete 9 Units",
      "pdfPath": "Books/8th/8th HPE/PDF/HPE Book for 8 class KPTBB.pdf",
      "color": "#10b981",
      "icon": "🏃",
      "available": true,
      "action": "cls8-hpe"
    },
    {
      "id": "b-cls9-bio",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Biology",
      "title": "Biology 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "28.4 MB",
      "pages": "Complete 9 Units",
      "pdfPath": "assets/books/Class-9-Biology-KPK.pdf",
      "color": "#10b981",
      "icon": "🧬",
      "available": true,
      "action": "cls9-bio"
    },
    {
      "id": "b-cls9-chem",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Chemistry",
      "title": "Chemistry 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "58.5 MB",
      "pages": "Complete 8 Units",
      "pdfPath": "assets/books/Class-9-Chemistry-KPK.pdf",
      "color": "#0284c7",
      "icon": "🧪",
      "available": true,
      "action": "cls9-chem"
    },
    {
      "id": "b-cls9-phys",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Physics",
      "title": "Physics 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "32.5 MB",
      "pages": "9 Chapters + 33 Numericals",
      "pdfPath": "assets/books/Class-9-Physics-KPK.pdf",
      "color": "#7c3aed",
      "icon": "⚛️",
      "available": true,
      "action": "cls9-phy"
    },
    {
      "id": "b-cls9-eng",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "English (Compulsory)",
      "title": "English 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "18.4 MB",
      "pages": "Complete 15 Units",
      "pdfPath": "assets/books/Class-9-English-KPK.pdf",
      "color": "#f59e0b",
      "icon": "📖",
      "available": true,
      "action": "cls9-eng"
    },
    {
      "id": "b-cls9-math",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Mathematics",
      "title": "Mathematics 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "11.9 MB",
      "pages": "Complete 11 Units",
      "pdfPath": "assets/books/Class-9-Mathematics-KPK.pdf",
      "color": "#ef4444",
      "icon": "📐",
      "available": true,
      "action": "cls9-math"
    },
    {
      "id": "b-cls9-urdu",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Urdu (Compulsory)",
      "title": "Urdu 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "26.8 MB",
      "pages": "Complete 15 Lessons & Poetry",
      "pdfPath": "assets/books/Class-9-Urdu-KPK.pdf",
      "color": "#16a34a",
      "icon": "📗",
      "available": true,
      "action": "cls9-urdu"
    },
    {
      "id": "b-cls9-isl",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Islamyat (Compulsory)",
      "title": "Islamyat 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "21.8 MB",
      "pages": "Surah Al-Anfal, Ahadith & Thematic Study",
      "pdfPath": "assets/books/Class-9-Islamyat-KPK.pdf",
      "color": "#0d9488",
      "icon": "🕌",
      "available": true,
      "action": "cls9-isl"
    },
    {
      "id": "b-cls9-comp",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Computer Science",
      "title": "Computer Science 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "24.1 MB",
      "pages": "Complete 7 Units",
      "pdfPath": "Books/9th/9th Computer Science/pdf/9th Computer Science.pdf",
      "color": "#0ea5e9",
      "icon": "💻",
      "available": true,
      "action": "cls9-comp"
    },
    {
      "id": "b-cls9-pakstudy",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Pakistan Studies",
      "title": "Pakistan Studies 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "19.5 MB",
      "pages": "Complete 4 Chapters",
      "pdfPath": "Books/9th/9th Pak Study/PDF/pakstudy1.pdf",
      "color": "#16a34a",
      "icon": "🇵🇰",
      "available": true,
      "action": "cls9-pakstudy"
    },
    {
      "id": "b-cls9-sci",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "General Science",
      "title": "General Science 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "58.2 MB",
      "pages": "Complete 5 Units (1–5)",
      "pdfPath": "Books/9th/9th General Science/PDF/General Science 9th book EM.pdf",
      "color": "#14b8a6",
      "icon": "🔬",
      "available": true,
      "action": "cls9-sci"
    },
    {
      "id": "b-cls9-hpe",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Health & Physical Education",
      "title": "Health & Physical Education 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "16.4 MB",
      "pages": "Complete 8 Units",
      "pdfPath": "Books/9th/9th  HPE/PDF/HPE book UM 9th class KPK.pdf",
      "color": "#f97316",
      "icon": "🏃",
      "available": true,
      "action": "cls9-hpe"
    },
    {
      "id": "b-cls9-drawing",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Art & Model Drawing",
      "title": "Art & Model Drawing 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "22.3 MB",
      "pages": "Complete 4 Chapters",
      "pdfPath": "Books/9th/9th Drawing/PDF/Art and Model Drawing 9th class kpk EM.pdf",
      "color": "#ec4899",
      "icon": "🎨",
      "available": true,
      "action": "cls9-drawing"
    },
    {
      "id": "b-cls9-islopt",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Islamiat Ikhtiari",
      "title": "Islamiat Ikhtiari 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "34.7 MB",
      "pages": "Complete 7 Units",
      "pdfPath": "Books/9th/9th Islamiat Ikhtiari/PDF/Islamiat Ikhtiare book 9th kpk.pdf",
      "color": "#10b981",
      "icon": "🕌",
      "available": true,
      "action": "cls9-islopt"
    },
    {
      "id": "b-cls9-quran",
      "classId": "cls9",
      "className": "Class 9",
      "subject": "Mutalia-e-Quran",
      "title": "Mutalia-e-Quran 9th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "41.8 MB",
      "pages": "Complete 6 Surahs",
      "pdfPath": "Books/9th/9th MQ/PDF/Mutlia_e_Quran_Book_KPK_9.pdf",
      "color": "#8b5cf6",
      "icon": "📖",
      "available": true,
      "action": "cls9-quran"
    },
    {
      "id": "b-cls10-isl",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Islamyat (Compulsory) - Part B",
      "title": "Islamyat 10th Class Textbook (Part B)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "21.8 MB",
      "pages": "Surah Al-Ahzab, Surah Al-Mumtahina, Ahadith & Thematic Study",
      "pdfPath": "assets/books/Class-9-Islamyat-KPK.pdf",
      "color": "#0f766e",
      "icon": "🕌",
      "available": true,
      "action": "cls10-isl"
    },
    {
      "id": "b-cls10-phys",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Physics",
      "title": "Physics 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "Syllabus Ready",
      "pages": "10 Chapters (10–19)",
      "pdfPath": "",
      "color": "#0284c7",
      "icon": "⚡",
      "available": false,
      "action": "cls10-phy"
    },
    {
      "id": "b-cls10-chem",
      "class_id": "cls10",
      "class_name": "Class 10",
      "subject": "Chemistry",
      "title": "Chemistry 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "icon": "🧪",
      "color": "#0284c7",
      "size": "48.9 MB",
      "pages": "8 Units (9–16) Complete",
      "pdf_path": "assets/books/Class-10-Chemistry-KPK.pdf",
      "available": true,
      "subject_id": 8,
      "hub_action": "cls10-chem",
      "classId": "cls10",
      "className": "Class 10",
      "action": "cls10-chem",
      "pdfPath": "assets/books/Class-10-Chemistry-KPK.pdf"
    },
    {
      "id": "b-cls10-bio",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Biology",
      "title": "Biology 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "Syllabus Ready",
      "pages": "9 Chapters (10–18)",
      "pdfPath": "",
      "color": "#8b5cf6",
      "icon": "🔬",
      "available": false,
      "action": "cls10-bio"
    },
    {
      "id": "b-cls10-math",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Mathematics",
      "title": "Mathematics 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "19.5 MB",
      "pages": "Complete 13 Units",
      "pdfPath": "assets/books/Class-10-Mathematics-KPK.pdf",
      "color": "#2563eb",
      "icon": "📐",
      "available": true,
      "action": "cls10-math"
    },
    {
      "id": "b-cls10-pakstudy",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Pakistan Studies",
      "title": "Pakistan Studies 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "16.2 MB",
      "pages": "Complete 4 Chapters",
      "pdfPath": "assets/books/Class-10-Pakistan-Studies-KPK.pdf",
      "color": "#0d9488",
      "icon": "🇵🇰",
      "available": true,
      "action": "cls10-pakstudy"
    },
    {
      "id": "b-cls10-urdu",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Urdu (Compulsory)",
      "title": "Urdu 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "24.5 MB",
      "pages": "Complete 22 Lessons & Poetry",
      "pdfPath": "assets/books/Class-10-Urdu-KPK.pdf",
      "color": "#0891b2",
      "icon": "📗",
      "available": true,
      "action": "cls10-urdu"
    },
    {
      "id": "b-cls10-comp",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Computer Science",
      "title": "Computer Science 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "21.4 MB",
      "pages": "Complete 7 Units",
      "pdfPath": "Books/10th/10th CS/PDF/Computer-Science Book for 10 class KPTBB.pdf",
      "color": "#0ea5e9",
      "icon": "💻",
      "available": true,
      "action": "cls10-comp"
    },
    {
      "id": "b-cls10-sci",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "General Science",
      "title": "General Science 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "64.3 MB",
      "pages": "Complete 6 Units (6–11)",
      "pdfPath": "Books/10th/10th General Science/PDF/General Science 10th book EM.pdf",
      "color": "#14b8a6",
      "icon": "🔬",
      "available": true,
      "action": "cls10-sci"
    },
    {
      "id": "b-cls10-hpe",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Health & Physical Education",
      "title": "Health & Physical Education 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "18.9 MB",
      "pages": "Complete 8 Units",
      "pdfPath": "Books/10th/10th HPE/PDF/HPE book UM 10th class KPK.pdf",
      "color": "#f97316",
      "icon": "🏃",
      "available": true,
      "action": "cls10-hpe"
    },
    {
      "id": "b-cls10-drawing",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Art & Model Drawing",
      "title": "Art & Model Drawing 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "24.8 MB",
      "pages": "Complete 4 Chapters",
      "pdfPath": "Books/10th/10th  Drawing/PDF/Drawing book 10th EM KPK_page_part_01_of_03.pdf",
      "color": "#ec4899",
      "icon": "🎨",
      "available": true,
      "action": "cls10-drawing"
    },
    {
      "id": "b-cls10-islopt",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Islamiat Ikhtiari",
      "title": "Islamiat Ikhtiari 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "36.1 MB",
      "pages": "Complete 4 Units",
      "pdfPath": "Books/10th/10th Ismaiat Ikhtiari/PDF/Islamiat Elective book 10th kpk.pdf",
      "color": "#10b981",
      "icon": "🕌",
      "available": true,
      "action": "cls10-islopt"
    },
    {
      "id": "b-cls10-quran",
      "classId": "cls10",
      "className": "Class 10",
      "subject": "Mutalia-e-Quran",
      "title": "Mutalia-e-Quran 10th Class Textbook",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "45.0 MB",
      "pages": "Complete 8 Surahs",
      "pdfPath": "Books/10th/10th M Q/PDF/Mutlia_e_Quran_Book_KPK_10.pdf",
      "color": "#8b5cf6",
      "icon": "📖",
      "available": true,
      "action": "cls10-quran"
    },
    {
      "id": "b-cls11-phys",
      "classId": "cls11",
      "className": "Class 11",
      "subject": "Physics",
      "title": "Physics 11th Class (HSSC-I)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "Syllabus Ready",
      "pages": "10 Chapters",
      "pdfPath": "",
      "color": "#7209b7",
      "icon": "🧭",
      "available": false,
      "action": "cls11-phy"
    },
    {
      "id": "b-cls12-phys",
      "classId": "cls12",
      "className": "Class 12",
      "subject": "Physics",
      "title": "Physics 12th Class (HSSC-II)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "Syllabus Ready",
      "pages": "10 Chapters",
      "pdfPath": "",
      "color": "#059669",
      "icon": "⚛️",
      "available": false,
      "action": "cls12-phy"
    },
    {
      "id": "b-cls12-chem",
      "classId": "cls12",
      "className": "Class 12",
      "subject": "Chemistry",
      "title": "Chemistry 12th Class (HSSC-II)",
      "board": "Khyber Pakhtunkhwa Textbook Board, Peshawar",
      "size": "Syllabus Ready",
      "pages": "16 Chapters",
      "pdfPath": "",
      "color": "#0284c7",
      "icon": "🧪",
      "available": false,
      "action": "cls12-chem"
    }
  ],
};

// Class 12 books: activate the four supplied KPK textbooks and keep the original
// class roadmap in sync with the chapter counts found in their source books.
(() => {
  const cls = DATA.classes.find(c => c.id === 'cls12');
  const subjects = DATA.subjects.cls12 || (DATA.subjects.cls12 = []);
  const maps = [
    ['cls12-math', 'Mathematics', '📐', 12, 'file:///D:/SpaceBook/Books/12th/12th%20Maths/PDF/Math%20Book%20for%2012%20class%20KPTBB.pdf', { hasMath: true }],
    ['cls12-phy', 'Physics', '⚡', 10, 'file:///D:/SpaceBook/Books/12th/12th%20Physics/PDF/Physics%20Book%20for%2012%20class%20KPTBB.pdf', { hasPhys: true }],
    ['cls12-chem', 'Chemistry', '🧪', 12, 'file:///D:/SpaceBook/Books/12th/12th%20Chemistry/PDF/Chemistry%20Book%20for%2012%20class%20KPTBB.pdf', { hasChem: true }],
    ['cls12-stat', 'Statistics', '📊', 9, 'file:///D:/SpaceBook/Books/12th/12th%20Statistics/PDF/Statistics%20Book%20for%2012%20class%20KPTBB.pdf', { hasStat: true }],
    ['cls12-eng', 'English', '📖', 19, 'file:///D:/SpaceBook/Books/12th/12th%20English/PDF/English%20Book%20for%2012%20class%20KPTBB.pdf', { hasEng: true, hasEng12: true, nameUrdu: 'انگریزی لازمی' }],
    ['cls12-urdu', 'Urdu', '📗', 22, 'file:///D:/SpaceBook/Books/12th/12th%20Urdu/PDF/Urdu%20Book%20for%2012%20class%20KPTBB.pdf', { hasUrdu: true, hasUrdu12: true, nameUrdu: 'اردو لازمی' }],
    ['cls12-bio', 'Biology', '🧬', 14, 'file:///D:/SpaceBook/Books/12th/12th%20Biology/PDF/Biology%20Book%20for%2012%20class%20KPTBB.pdf', { hasBio: true, hasBio12: true, nameUrdu: 'حیاتیات' }],
    ['cls12-pak', 'Pakistan Studies', '🇵🇰', 11, 'file:///D:/SpaceBook/Books/12th/12th%20Pak%20Studies/PDF/Pak-study%20Book%20for%2012%20class%20KPTBB.pdf', { hasPakStudy: true, hasPakStudy12: true, nameUrdu: 'مطالعہ پاکستان' }],
    ['cls12-comp', 'Computer Science', '💻', 9, 'file:///D:/SpaceBook/Books/12th/12th%20Computer%20Science/PDF/Computer-Sc%20%20Book%20for%2012%20class%20KPTBB.pdf', { hasComp: true, hasComp12: true, nameUrdu: 'کمپیوٹر سائنس' }],
    ['cls12-civics', 'Civics', '🏛️', 8, 'file:///D:/SpaceBook/Books/12th/12th%20Civics/PDF/Civics%20Book%20for%2012%20class%20KPTBB.pdf', { hasCivics: true, nameUrdu: 'شہریت (سوکس)' }],
    ['cls12-econ', 'Economics', '📈', 12, 'file:///D:/SpaceBook/Books/12th/12th%20Economics/PDF/Economic%20Book%20for%2012%20class%20KPTBB.pdf', { hasEcon: true, nameUrdu: 'معاشیات' }],
    ['cls12-hpe', 'Health & Physical Education', '🏃', 6, 'file:///D:/SpaceBook/Books/12th/12th%20HPE/PDF/HPE%20book%20UM%2012th%20class%20KPK.pdf', { hasHpe: true, nameUrdu: 'صحت و جسمانی تعلیم' }],
    ['cls12-islopt', 'Islamiat Ikhtiari', '🕌', 6, 'file:///D:/SpaceBook/Books/12th/12th%20Islamiat%20Ikhtiari/PDF/Islamiat-Ikhtiari%20Book%20for%2012%20class%20KPTBB.pdf', { hasIslopt: true, nameUrdu: 'اسلامیات اختیاری' }],
    ['cls12-islhist', 'Islamic History', '📜', 6, 'file:///D:/SpaceBook/Books/12th/12th%20Islamic%20History/PDF/Islamic%20History%20book%2012th%20class%20KPK.pdf', { hasIslhist: true, nameUrdu: 'تاریخِ اسلام' }],
    ['cls12-quran', 'Mutalia-e-Quran', '📖', 8, 'file:///D:/SpaceBook/Books/12th/12th%20Mutalia%20e%20Quran/PDF/Mutlia_e_Quran_Book_KPK_12.pdf', { hasQuran: true, nameUrdu: 'ترجمۃ القرآن المجید' }]
  ];

  maps.forEach(([id, name, emoji, count, pdf, extra]) => {
    let subject = subjects.find(item => item.id === id);
    if (!subject) {
      subject = { id, name, emoji, chapters: count };
      subjects.push(subject);
    }
    subject.name = name;
    subject.emoji = emoji;
    subject.chapters = count;
    subject.pdf = pdf;
    if (extra) Object.assign(subject, extra);
  });
  if (cls) cls.subjects = subjects.length;

  const folderMap = {
    'cls12-math': '12th%20Maths',
    'cls12-phy': '12th%20Physics',
    'cls12-chem': '12th%20Chemistry',
    'cls12-stat': '12th%20Statistics',
    'cls12-eng': '12th%20English',
    'cls12-urdu': '12th%20Urdu',
    'cls12-bio': '12th%20Biology',
    'cls12-pak': '12th%20Pak%20Studies',
    'cls12-comp': '12th%20Computer%20Science',
    'cls12-civics': '12th%20Civics',
    'cls12-econ': '12th%20Economics',
    'cls12-hpe': '12th%20HPE',
    'cls12-islopt': '12th%20Islamiat%20Ikhtiari',
    'cls12-islhist': '12th%20Islamic%20History',
    'cls12-quran': '12th%20Mutalia%20e%20Quran'
  };

  const bookDetails = [
    ['cls12-math', 'Mathematics', 'b-cls12-math', 'Math Book for 12 class KPTBB.pdf', '12 Units', '#2563eb', '📐'],
    ['cls12-phy', 'Physics', 'b-cls12-phys', 'Physics Book for 12 class KPTBB.pdf', '10 Units', '#059669', '⚛️'],
    ['cls12-chem', 'Chemistry', 'b-cls12-chem', 'Chemistry Book for 12 class KPTBB.pdf', '12 Units', '#0284c7', '🧪'],
    ['cls12-stat', 'Statistics', 'b-cls12-stat', 'Statistics Book for 12 class KPTBB.pdf', '9 Units', '#7c3aed', '📊'],
    ['cls12-eng', 'English', 'b-cls12-eng', 'English Book for 12 class KPTBB.pdf', '19 Units', '#2563eb', '📖'],
    ['cls12-urdu', 'Urdu', 'b-cls12-urdu', 'Urdu Book for 12 class KPTBB.pdf', '22 Lessons', '#059669', '📗'],
    ['cls12-bio', 'Biology', 'b-cls12-bio', 'Biology Book for 12 class KPTBB.pdf', '14 Units', '#16a34a', '🧬'],
    ['cls12-pak', 'Pakistan Studies', 'b-cls12-pak', 'Pak-study Book for 12 class KPTBB.pdf', '11 Chapters', '#059669', '🇵🇰'],
    ['cls12-comp', 'Computer Science', 'b-cls12-comp', 'Computer-Sc  Book for 12 class KPTBB.pdf', '9 Units', '#4f46e5', '💻'],
    ['cls12-civics', 'Civics', 'b-cls12-civics', 'Civics Book for 12 class KPTBB.pdf', '8 Chapters', '#475569', '🏛️'],
    ['cls12-econ', 'Economics', 'b-cls12-econ', 'Economic Book for 12 class KPTBB.pdf', '12 Chapters', '#059669', '📈'],
    ['cls12-hpe', 'Health & Physical Education', 'b-cls12-hpe', 'HPE book UM 12th class KPK.pdf', '6 Chapters', '#ea580c', '🏃'],
    ['cls12-islopt', 'Islamiat Ikhtiari', 'b-cls12-islopt', 'Islamiat-Ikhtiari Book for 12 class KPTBB.pdf', '6 Chapters', '#15803d', '🕌'],
    ['cls12-islhist', 'Islamic History', 'b-cls12-islhist', 'Islamic History book 12th class KPK.pdf', '6 Chapters', '#b45309', '📜'],
    ['cls12-quran', 'Mutalia-e-Quran', 'b-cls12-quran', 'Mutlia_e_Quran_Book_KPK_12.pdf', '8 Chapters', '#059669', '📖']
  ];

  bookDetails.forEach(([action, subjectName, id, filename, pages, color, icon]) => {
    const folder = folderMap[action] || '12th%20Maths';
    const pdfPath = `file:///D:/SpaceBook/Books/12th/${folder}/PDF/${filename.replace(/ /g, '%20')}`;
    let book = DATA.books.find(item => item.id === id);
    if (!book) {
      book = { id, classId: 'cls12', className: 'Class 12', subject: subjectName, title: `${subjectName} 12th Class (HSSC-II)`, board: 'Khyber Pakhtunkhwa Textbook Board, Peshawar', color, icon, action };
      DATA.books.push(book);
    }
    Object.assign(book, { subject: subjectName, title: `${subjectName} 12th Class (HSSC-II)`, size: 'Complete textbook transcription', pages, pdfPath, color, icon, available: true, action });
  });

  const chapterTitles = {
    'cls12-math': ['Introduction to Symbolic Package, Maple','Functions and Limits','Differentiation','Higher Order Derivatives and Applications','Differentiation of Vector Functions','Integration','Plane Analytic Geometry: Straight Line','Conics I','Conics II','Differential Equations','Partial Differentiation','Introduction to Numerical Methods'],
    'cls12-phy': ['Electrostatics','Current Electricity','Electromagnetism','Electromagnetic Induction','Alternating Current','Physics of Solids','Electronics','Dawn of Modern Physics','Atomic Spectra','Nuclear Physics'],
    'cls12-chem': ['s and p-Block Elements','d and f-Block Elements: Transition Elements','Organic Compounds','Hydrocarbons','Alkyl Halides and Amines','Alcohols, Phenols and Ethers','Carbonyl Compounds I: Aldehydes and Ketones','Carbonyl Compounds II: Carboxylic Acids and Functional Derivatives','Biochemistry','Industrial Chemistry','Environmental Chemistry','Analytical Chemistry'],
    'cls12-stat': ['Probability','Random Variables and Probability Distributions','Special Discrete Probability Distributions','Special Continuous Probability Distributions','Sampling and Sampling Distributions','Estimation','Hypothesis Testing','Association of Attributes','Experimental Design'],
    'cls12-eng': ['Seerat-e-Tayyiba and the Muslim Youth','I Have a Dream','The Glory of the Himalayas','A Visit to the Doctor','The Last Lesson','The Model Millionaire','The World as I See It','The Daffodils','The Road Not Taken','Incident of the French Camp','Ozymandias','The Echoing Green','Say Not the Struggle Naught Availeth','A Dialogue on Social Evils','Technology and Human Values','The Importance of Media','National Pride and Civic Sense','A Review of Great Expectations','The Renaissance of Pakistan'],
    'cls12-urdu': ['مسلمانوں کا قدیم طرز تعلیم','محنت پسند دیوانہ','مرزا غالب کے عادات و خصائل','نواب محسن الملک','قومی ہمدردی','اکبری کی حماقتیں','سیرت فاطمۃ الزہرا رضی اللہ عنہا','خطوط غالب','علامہ اقبال کے خطوط','چغل خور','قرطبہ کا قاضی','مولوی نذیر احمد دہلوی','دستورِ حیات','سفرنامہ حجاز','قائداعظم کا خطاب','نعت رسول مقبول ﷺ','مردِ مسلمان','خضرِ راہ','پیغامِ اقبال','غزل ۱ (میر تقی میر)','غزل ۲ (مرزا اسد اللہ خاں غالب)','غزل ۳ (حسرت موہانی)'],
    'cls12-bio': ['Respiration','Homeostasis','Support and Movement','Nervous Coordination','Chemical Coordination','Behaviour','Reproduction','Development and Aging','Inheritance','Chromosomes and DNA','Evolution','Man and His Environment','Biotechnology','Biology and Human Welfare'],
    'cls12-pak': ['اسلامی جمہوریہ پاکستان کا قیام','پاکستان کی ابتدائی مشکلات','پاکستان کا جغرافیہ اور قدرتی وسائل','پاکستان کا آئینی ارتقاء','پاکستان کا انتظامی ڈھانچہ اور حکومت','پاکستان کی معاشی ترقی اور منصوبہ بندی','پاکستان کا معاشرہ اور ثقافت','پاکستان کی تعلیمی اور سماجی صورتحال','پاکستان کی خارجہ پالیسی','پاکستان اور عالم اسلام','پاکستان کا دفاع اور سیکیورٹی چیلنجز'],
    'cls12-comp': ['Operating System','System Development Life Cycle (SDLC)','Control Structures in C','Functions in C','Arrays and Strings','Pointers','File Handling in C','Information Technology and Database Management','Web Development and Cyber Security'],
    'cls12-civics': ['پاکستان کا نظام حکومت اور آئینی ڈھانچہ','وفاقی مقننہ (پارلیمنٹ) اور اس کے اختیارات','وفاقی انتظامیہ: صدر، وزیر اعظم اور کابینہ','پاکستان کا عدالتی نظام: سپریم کورٹ اور ہائی کورٹس','صوبائی حکومتیں اور مقامی انتظامیہ','پاکستان کا انتخابی نظام اور سیاسی جماعتیں','شہریوں کے بنیادی حقوق اور فرائض','عوامی رائے اور ذرائع ابلاغ'],
    'cls12-econ': ['قومی آمدنی کے بنیادی تصورات','زر (Money) کا مفہوم اور افعال','بینکاری نظام اور مرکزی بینک','سرکاری مالیات (Public Finance)','بین الاقوامی تجارت (International Trade)','پاکستان کی معیشت کا تعارف','زرعی شعبہ اور اس کے مسائل','صنعتی شعبہ اور معاشی ترقی','پاکستان کی تجارت خارجہ','معاشی منصوبہ بندی اور ترقیاتی حکمت عملی','افرادی قوت، روزگار اور بے روزگاری','پاکستان کے مالیاتی ادارے اور معاشی چیلنجز'],
    'cls12-hpe': ['غیر متعدی امراض اور انسداد','متعدی بیماریاں اور صحت عامہ','کھیل اور بین الاقوامی قواعد','جسمانی فٹنس اور ورزش کے سائنسی اصول','ابتدائی طبی امداد (First Aid) اور ہنگامی تدابیر','نشہ آور اشیاء اور ان کے ہلاکت خیز اثرات'],
    'cls12-islopt': ['قرآن مجید اور اصول تفسیر','منتخب قرآنی آیات کا تفسیری مطالعہ','حدیث نبوی ﷺ اور اصول حدیث','منتخب احادیث نبویہ کا تشریحی مطالعہ','فقہ اسلامی اور اجتہاد','اسلامی تہذیب و تمدن کے بنیادی خدوخال'],
    'cls12-islhist': ['خلافت بنو عباس کا قیام اور ابتدائی خلفاء','عہد عباسی کی علمی، ثقافتی اور سائنسی ترقیاں','بنو عباس کا زوال اور سقوط بغداد','اندلس (اسپین) میں اسلامی حکومت کا قیام','اندلس کا تمدنی عروج اور علمی کارنامے','سلطنت عثمانیہ کا قیام، فتوحات اور تاریخی اثرات'],
    'cls12-quran': ['سورة النساء: مطالعہ، ترجمہ اور بنیادی احکام','سورة المائدة: مطالعہ، ترجمہ اور احکام حلال و حرام','سورة الأنعام: توحید، نبوت اور عقائد اسلامی','سورة الأعراف: تاریخی اقوام کے عبرتناک اسباق','سورة الأنفال: جہاد فی سبیل اللہ، تقویٰ اور مال غنیمت','سورة التوبة: نفاق، براءت اور اسلامی جہاد کے تقاضے','سورة يونس: سنت الٰہیہ، صبر اور ایمان بالرسالت','سورة هود: استقامت فی الدین اور انبیاء کرام کے واقعات']
  };

  Object.entries(chapterTitles).forEach(([id, names]) => {
    const unitOffset = id === 'cls12-phy' ? 11 : id === 'cls12-bio' ? 14 : 1;
    DATA.chapters[id] = names.map((name, i) => ({ num: unitOffset + i, name, topics: 'Textbook lesson, concepts, exercises and exam questions', status: 'done' }));
  });
})();
