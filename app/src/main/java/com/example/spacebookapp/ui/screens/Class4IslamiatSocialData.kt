package com.example.spacebookapp.ui.screens

import androidx.compose.ui.graphics.Color

object Class4IslamiatSocialData {

    // 4. CLASS 4 ISLAMIAT (All 20 Lessons across Babs 1–7, Pages 1–103)
    val islamiatStages = listOf(
        Class4StageData(
            id = 1,
            unitLabel = "سبق 1 (باب اوّل)",
            pageRange = "Pages 01–10",
            titleEn = "Quran Majeed, Hadith-e-Nabawi ﷺ & Masnoon Duas",
            titleUr = "ناظرہ و حفظِ قرآن مجید، حدیثِ نبوی ﷺ اور مسنون دعائیں",
            titlePs = "ناظره او حفظ قرآن مجید، نبوي حدیث او مسنون دعاګانې",
            summaryEn = "Recite the Holy Quran with Tajweed, memorize short Surahs with translation, learn Hadith on cleanliness and kindness, and recite daily Masnoon Duas.",
            summaryUr = "باب اوّل میں ناظرہ قرآن مجید، سورتوں کا حفظ و ترجمہ، نبی کریم ﷺ کی مبارکہ احادیث اور روزمرہ کی مسنون دعائیں شامل ہیں۔",
            summaryPs = "په لومړي باب کې د قرآن مجید ناظره او حفظ، د نبي کریم ﷺ احادیث او ورځنۍ مسنون دعاګانې شاملې دي.",
            gamePromptEn = "Match the Quran, Hadith & Dua concepts from Bab 1!",
            gamePromptUr = "باب اوّل کے قرآنی، حدیث اور دعائیہ تصورات کو ملائیں!",
            gamePromptPs = "د لومړي باب قرآني، حدیث او دعایي مفهومونه وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("ناظرہ و حفظِ قرآن مجید", "تجوید اور ترتیل کے ساتھ تلاوت", "Reciting the Holy Quran clearly and memorizing Surahs of the 30th Para.", "قرآن مجید کو ٹھہر ٹھہر کر اور درست مخارج کے ساتھ پڑھنا۔", "قرآن کریم په تجوید او ترتیل سره لوستل.", Color(0xFF059669)),
                Class4ConceptCard("حفظ و ترجمہ", "ربِّ زِدْنِي عِلْمًا (اے میرے رب! میرے علم میں اضافہ فرما)", "Supplicating to Allah for beneficial knowledge.", "علم میں اضافے کی قرآنی دعا: رَبِّ زِدْنِي عِلْمًا۔", "د پوهې د زیاتوالي قرآني دعا: رَبِّ زِدْنِي عِلْمًا.", Color(0xFF0284C7)),
                Class4ConceptCard("حدیثِ نبوی ﷺ", "الطُّهُورُ شَطْرُ الْإِيمَانِ (صفائی نصف ایمان ہے)", "Prophet Muhammad ﷺ taught that cleanliness is half of faith.", "حضور اکرم ﷺ کا ارشاد ہے کہ پاکیزگی اور صفائی آدھا ایمان ہے۔", "رسول الله ﷺ فرمایلي دي چې پاکوالی نیم ایمان دی.", Color(0xFF7C3AED)),
                Class4ConceptCard("مسنون دعائیں (زبانی)", "سفر کی دعا، مسجد میں داخل ہونے اور نکلنے کی دعا", "Reciting Masnoon Duas before starting journeys and entering the mosque.", "سفر شروع کرنے اور مسجد میں داخل ہوتے وقت کی مسنون دعائیں۔", "د سفر او جومات ته د ننوتلو او وتلو مسنون دعاګانې.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("What is the meaning of the Quranic Dua 'رَبِّ زِدْنِي عِلْمًا'?", "قرآنی دعا 'رَبِّ زِدْنِي عِلْمًا' کا ترجمہ کیا ہے؟", "د 'رَبِّ زِدْنِي عِلْمًا' قرآني دعا ژباړه څه ده؟", "رَبِّ زِدْنِي عِلْمًا", listOf("O my Lord! Increase me in knowledge (اے میرے رب! میرے علم میں اضافہ فرما)", "Give me wealth", "Make me fast"), 0),
                NazeraQuizQuestion("According to Hadith, what is half of faith (شَطْرُ الْإِيمَانِ)?", "حدیثِ مبارکہ کے مطابق کون سی چیز آدھا ایمان ہے؟", "د حدیث شریف له مخې کوم شی نیم ایمان دی؟", "الطُّهُورُ شَطْرُ الْإِيمَانِ", listOf("Cleanliness / Purity (صفائی / پاکیزگی)", "Sleeping", "Running"), 0)
            )
        ),
        Class4StageData(
            id = 2,
            unitLabel = "سبق 2 (باب دوم)",
            pageRange = "Pages 11–14",
            titleEn = "Faith in Angels (فرشتوں پر ایمان)",
            titleUr = "فرشتوں پر ایمان (ملائکہ اور ان کی ذمہ داریاں)",
            titlePs = "پر پرښتو ایمان (ملایکې او د هغوی دندې)",
            summaryEn = "Angels are Allah's creation made of Noor (light). Learn about the 4 famous Angels: Hazrat Jibrail (AS), Hazrat Mikail (AS), Hazrat Israfil (AS), and Hazrat Izrail (AS).",
            summaryUr = "فرشتے اللہ تعالیٰ کی نوری مخلوق ہیں جو کبھی نافرمانی نہیں کرتے۔ چار مشہور فرشتے حضرت جبرائیلؑ، حضرت میکائیلؑ، حضرت اسرافیلؑ اور حضرت عزرائیلؑ ہیں۔",
            summaryPs = "پرښتې د الله تعالی نوري مخلوق دی. څلور مشهورې پرښتې حضرت جبراییلؑ، حضرت میکاییلؑ، حضرت اسرافیلؑ او حضرت عزراییلؑ دي.",
            gamePromptEn = "Match each famous Angel with his duty assigned by Allah!",
            gamePromptUr = "ہر مشہور فرشتے کو اس کی ذمہ داری سے ملائیں!",
            gamePromptPs = "هره مشهوره پرښته له خپلې دندې سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("حضرت جبرائیل علیہ السلام", "انبیاء کرام علیہم السلام کے پاس وحی لانا", "Brought Allah's revelations (Wahi) and books to the Prophets.", "اللہ تعالیٰ کے احکامات اور وحی انبیاء کرام تک پہنچاتے تھے۔", "پیغمبرانو ته یې د الله تعالی وحې راوړله.", Color(0xFF059669)),
                Class4ConceptCard("حضرت میکائیل علیہ السلام", "بارش برسانا اور مخلوق کو رزق پہنچانا", "In charge of rain, winds, and distributing sustenance (Rizq).", "بارش برسانے اور مخلوق تک روزی پہنچانے کی ذمہ داری۔", "د باران اورولو او مخلوق ته د رزق رسولو دنده لري.", Color(0xFF0284C7)),
                Class4ConceptCard("حضرت اسرافیل علیہ السلام", "قیامت کے دن صور پھونکنا", "Will blow the Trumpet (Soor) on the Day of Judgment.", "قیامت کے دن اللہ کے حکم سے صور پھونکیں گے۔", "د قیامت په ورځ به د الله په امر شپېلۍ (صور) پوکي.", Color(0xFF7C3AED)),
                Class4ConceptCard("حضرت عزرائیل علیہ السلام (ملک الموت)", "روح قبض کرنے کی ذمہ داری", "The Angel of Death who takes souls by Allah's command.", "اللہ تعالیٰ کے حکم سے جانداروں کی روح قبض کرنے والے فرشتے۔", "د الله تعالی په امر د ساه اخیستلو (روح قبض کولو) پرښته.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("From what did Allah create the Angels (فرشتے)?", "اللہ تعالیٰ نے فرشتوں کو کس چیز سے پیدا فرمایا ہے؟", "الله تعالی پرښتې له څه شي څخه پیدا کړې دي؟", "ملائکہ", listOf("From Noor / Light (نور سے)", "From Clay (مٹی سے)", "From Fire (آگ سے)"), 0),
                NazeraQuizQuestion("Which Angel is responsible for rain and sustenance (بارش اور رزق)?", "بارش برسانے اور رزق پہنچانے پر کون سے فرشتے مقرر ہیں؟", "د باران او رزق دنده کومې پرښتې ته سپارل شوې ده؟", "🌧️ بارش و رزق", listOf("Hazrat Mikail AS (حضرت میکائیل علیہ السلام)", "Hazrat Israfil AS", "Hazrat Izrail AS"), 0)
            )
        ),
        Class4StageData(
            id = 3,
            unitLabel = "سبق 3 (باب دوم)",
            pageRange = "Pages 15–18",
            titleEn = "Faith in Divine Books (آسمانی کتابوں پر ایمان)",
            titleUr = "آسمانی کتابوں پر ایمان (صحیفے اور چار مشہور کتابیں)",
            titlePs = "پر اسماني کتابونو ایمان (صحیفې او څلور مشهور کتابونه)",
            summaryEn = "Allah revealed Suhoof (scrolls) and four major Divine Books for human guidance: Taurat (Musa AS), Zaboor (Dawood AS), Injeel (Isa AS), and the Holy Quran (Muhammad ﷺ).",
            summaryUr = "انسانوں کی ہدایت کے لیے اللہ تعالیٰ نے انبیاء کرام پر صحیفے اور چار بڑی آسمانی کتابیں (تورات، زبور، انجیل اور قرآن مجید) نازل فرمائیں۔",
            summaryPs = "د انسانانو د لارښوونې لپاره الله تعالی څلور لوی اسماني کتابونه (تورات، زبور، انجیل او قرآن مجید) نازل کړي دي.",
            gamePromptEn = "Match each Divine Book with the Prophet upon whom it was revealed!",
            gamePromptUr = "ہر آسمانی کتاب کو اس نبی کے نام سے ملائیں جن پر وہ نازل ہوئی!",
            gamePromptPs = "هر اسماني کتاب له هغه پیغمبر سره وصل کړئ چې پرې نازل شوی و!",
            cards = listOf(
                Class4ConceptCard("تورات (Taurat)", "حضرت موسیٰ علیہ السلام پر نازل ہوئی", "Revealed to Prophet Musa (AS).", "تورات حضرت موسیٰ علیہ السلام پر نازل ہوئی۔", "تورات پر حضرت موسیٰ علیه السلام نازل شو.", Color(0xFF059669)),
                Class4ConceptCard("زبور (Zaboor)", "حضرت داؤد علیہ السلام پر نازل ہوئی", "Revealed to Prophet Dawood (AS).", "زبور حضرت داؤد علیہ السلام پر نازل ہوئی۔", "زبور پر حضرت داود علیه السلام نازل شو.", Color(0xFF0284C7)),
                Class4ConceptCard("انجیل (Injeel)", "حضرت عیسیٰ علیہ السلام پر نازل ہوئی", "Revealed to Prophet Isa (AS).", "انجیل حضرت عیسیٰ علیہ السلام پر نازل ہوئی۔", "انجیل پر حضرت عیسیٰ علیه السلام نازل شو.", Color(0xFF7C3AED)),
                Class4ConceptCard("قرآن مجید (Holy Quran)", "خاتم النبیین حضرت محمد ﷺ پر نازل ہوئی", "The final, unchanged book of Allah for all humanity.", "قرآن مجید آخری کتاب ہے جس کی حفاظت کا ذمہ خود اللہ نے لیا ہے۔", "قرآن مجید وروستی اسماني کتاب دی چې پر حضرت محمد ﷺ نازل شو.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Upon which Prophet was the Taurat (تورات) revealed?", "آسمانی کتاب 'تورات' کس نبی پر نازل ہوئی؟", "اسماني کتاب 'تورات' پر کوم پیغمبر نازل شو؟", "تورات", listOf("Hazrat Musa AS (حضرت موسیٰ علیہ السلام)", "Hazrat Dawood AS", "Hazrat Isa AS"), 0),
                NazeraQuizQuestion("Which Divine Book has Allah promised to protect forever from any change?", "کس آسمانی کتاب کی حفاظت کا ذمہ اللہ تعالیٰ نے خود لیا ہے؟", "د کوم اسماني کتاب د ساتنې ذمه واري پخپله الله تعالی اخیستې ده؟", "📖 آخری کتاب", listOf("The Holy Quran (قرآن مجید)", "Taurat", "Zaboor"), 0)
            )
        ),
        Class4StageData(
            id = 4,
            unitLabel = "سبق 4 (باب دوم)",
            pageRange = "Pages 19–22",
            titleEn = "Fasting / Roza (روزہ — صوم)",
            titleUr = "روزہ (صوم) کی فرضیت، فضیلت اور فوائد",
            titlePs = "روژه (صوم) — فرضیت او فضیلت",
            summaryEn = "Fasting (Sawm) is the pillar of Islam observed in the 9th Islamic month Ramadan from dawn (Suhoor) to sunset (Iftar). It teaches Taqwa (piety), patience, and sympathy for the poor.",
            summaryUr = "صوم کے لغوی معنی رک جانے کے ہیں۔ اسلامی سال کے نویں مہینے رمضان المبارک میں روزے رکھنا فرض ہے جس سے تقویٰ، صبر اور غریبوں سے ہمدردی پیدا ہوتی ہے۔",
            summaryPs = "روژه د اسلام مهم رکن دی چې د رمضان په میاشت کې له سباوون څخه تر لمر لوېدو پورې نیول کېږي او تقوی پیدا کوي.",
            gamePromptEn = "Match the Fasting (Roza) terms with their meanings!",
            gamePromptUr = "روزے کے احکام اور اصطلاحات کو درست مفہوم سے ملائیں!",
            gamePromptPs = "د روژې اصطلاحات له سمې معنی سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("صوم کا معنی اور وقت", "صبح صادق سے غروبِ آفتاب تک کھانے پینے سے رکنا", "Abstaining from food and drink from dawn to sunset for Allah.", "اللہ کی رضا کے لیے صبح صادق سے غروبِ آفتاب تک کھانے پینے سے رکنا۔", "د الله د رضا لپاره له سباوون تر لمر لوېدو له خوراک او څښاک ډډه کول.", Color(0xFF059669)),
                Class4ConceptCard("سحری اور افطاری", "سحری کھانا سنت اور برکت ہے", "Eating Suhoor before Fajr and breaking fast at Maghrib (Iftar).", "صبح صادق سے پہلے سحری کھانا اور غروبِ آفتاب پر افطار کرنا۔", "تر سباوون مخکې پېشلمی کول او په ماښام کې روژه ماتول.", Color(0xFF0284C7)),
                Class4ConceptCard("روزے کا مقصد: تقویٰ", "لَعَلَّكُمْ تَتَّقُونَ (تاکہ تم پرہیزگار بن جاؤ)", "Fasting develops Taqwa (God-consciousness and self-control).", "روزے سے انسان میں تقویٰ، صبر اور نفس پر قابو پانے کی صفت پیدا ہوتی ہے۔", "روژه په انسان کې تقوی، صبر او له بېوزلو سره خواخوږي پیدا کوي.", Color(0xFF7C3AED)),
                Class4ConceptCard("رمضان اور عید الفطر", "لیلۃ القدر (ہزار مہینوں سے بہتر رات) اور یکم شوال کو عید", "Laylat-ul-Qadr is in Ramadan; Eid-ul-Fitr is celebrated on 1st Shawwal.", "رمضان کے بعد یکم شوال کو اللہ کی طرف سے انعام کے طور پر عید الفطر منائی جاتی ہے۔", "د رمضان له بشپړېدو وروسته د شوال په لومړۍ نېټه کوچنی اختر لمانځل کېږي.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("In which Islamic month is fasting (Roza) obligatory on Muslims?", "کس اسلامی مہینے میں مسلمانوں پر روزے فرض ہیں؟", "په کومه اسلامي میاشت کې پر مسلمانانو روژه فرض ده؟", "🌙 فرض روزے", listOf("Ramadan-ul-Mubarak (رمضان المبارک)", "Muharram", "Rajab"), 0),
                NazeraQuizQuestion("Which night in Ramadan is better than a thousand months?", "رمضان المبارک کی کون سی رات ہزار مہینوں سے افضل ہے؟", "د رمضان کومه شپه تر زرو میاشتو غوره ده؟", "✨ خیرٌ من ألف شھر", listOf("Laylat-ul-Qadr (لیلۃ القدر / شبِ قدر)", "1st Shaban", "10th Muharram"), 0)
            )
        ),
        Class4StageData(
            id = 5,
            unitLabel = "سبق 5 (باب دوم)",
            pageRange = "Pages 23–26",
            titleEn = "Rights of Allah (حقوق اللہ)",
            titleUr = "حقوق اللہ (بندوں پر اللہ تعالیٰ کے حقوق)",
            titlePs = "حقوق الله (پر بنده ګانو د الله تعالی حقونه)",
            summaryEn = "Learn the rights of Allah over His servants: believing in Tawheed (Oneness of Allah without any partner), offering 5 daily prayers, fasting, paying Zakat, performing Hajj, and thanking Allah.",
            summaryUr = "بندوں پر اللہ تعالیٰ کے حقوق کو حقوق اللہ کہتے ہیں: اللہ کو ایک ماننا (توحید)، شرک نہ کرنا، نماز، روزہ، زکوٰۃ، حج ادا کرنا اور ہر حال میں اللہ کا شکر ادا کرنا۔",
            summaryPs = "پر بنده ګانو د الله حقونو ته حقوق الله وایي: د الله وحدانیت منل، لمونځ، روژه، زکات، حج او د الله شکر ادا کول.",
            gamePromptEn = "Match the Huqooq-ullah concepts!",
            gamePromptUr = "حقوق اللہ کے تصورات کو درست جواب سے ملائیں!",
            gamePromptPs = "د حقوق الله مفهومونه له سم ځواب سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("توحید (سب سے پہلا حق)", "صرف اللہ کی عبادت کرنا اور کسی کو شریک نہ ٹھہرانا", "Worshipping Allah alone and avoiding Shirk.", "اللہ تعالیٰ کا سب سے بڑا حق یہ ہے کہ صرف اسی کی عبادت کی جائے۔", "د الله تر ټولو لوی حق دا دی چې یوازې د هغه عبادت وشي.", Color(0xFF059669)),
                Class4ConceptCard("ارکانِ اسلام کی ادائیگی", "نماز، روزہ، زکوٰۃ اور حج", "Fulfilling the pillars of Islam sincerely for Allah's pleasure.", "پانچ وقت کی نماز، رمضان کے روزے، زکوٰۃ اور حج ادا کرنا۔", "پنځه وخته لمونځ، روژه، زکات او حج ادا کول.", Color(0xFF0284C7)),
                Class4ConceptCard("شکر گزاری اور توکل", "نعمتوں پر الحمد للہ کہنا اور اللہ پر بھروسا رکھنا", "Thanking Allah for His countless blessings and trusting Him.", "اللہ تعالیٰ کی بے شمار نعمتوں پر شکر ادا کرنا اور اسی پر بھروسا رکھنا۔", "د الله پر نعمتونو شکر ایستل او پر هغه توکل کول.", Color(0xFF7C3AED)),
                Class4ConceptCard("اطاعتِ الٰہی و رسول ﷺ", "حلال کو اپنانا اور حرام کاموں سے بچنا", "Obeying the commands of Allah and His Messenger ﷺ.", "اللہ اور اس کے رسول ﷺ کے احکامات ماننا اور گناہوں سے بچنا۔", "د الله او رسول الله ﷺ امرونه منل او له ګناهونو ځان ساتل.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("What is the foremost right of Allah upon His servants (حقوق اللہ)?", "بندوں پر اللہ تعالیٰ کا سب سے پہلا اور بڑا حق کیا ہے؟", "پر بنده ګانو د الله تعالی تر ټولو لومړی حق څه دی؟", "حقوق اللہ", listOf("To worship Allah alone without any partner (صرف اللہ کی عبادت کرنا)", "Playing games", "Sleeping early"), 0)
            )
        ),
        Class4StageData(
            id = 6,
            unitLabel = "سبق 6 (باب دوم)",
            pageRange = "Pages 27–30",
            titleEn = "Recitation of the Holy Quran (تلاوتِ قرآن مجید)",
            titleUr = "تلاوتِ قرآن مجید کی فضیلت اور آداب",
            titlePs = "د قرآن مجید د تلاوت فضیلت او اداب",
            summaryEn = "Reciting one letter of the Holy Quran brings 10 rewards (Hasanat). Learn the etiquette of Tilawat: performing Wudu, sitting towards Qiblah, saying Ta'awwuz & Tasmiyah, and listening silently.",
            summaryUr = "قرآن مجید کا ایک حرف پڑھنے پر دس نیکیاں ملتی ہیں۔ تلاوت کے آداب میں باوضو ہونا، قبلہ رخ بیٹھنا، تعوذ و تسمیہ پڑھنا اور خاموشی سے سننا شامل ہیں۔",
            summaryPs = "د قرآن مجید د یوه توري په لوستلو لس نېکۍ ملاوېږي. د تلاوت اداب اودس کول، مخ پر قبله کېناستل او تعوذ و تسمیه لوستل دي.",
            gamePromptEn = "Match the Etiquette & Virtues of Reciting the Holy Quran!",
            gamePromptUr = "تلاوتِ قرآن مجید کے آداب اور فضائل کو ملائیں!",
            gamePromptPs = "د قرآن مجید د تلاوت اداب او فضیلتونه وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("ایک حرف پر دس نیکیاں", "الم میں الف، لام اور میم تین حروف (30 نیکیاں) ہیں", "Every single letter recited from the Quran earns ten good deeds.", "قرآن مجید کا ایک حرف پڑھنے پر دس نیکیاں لکھی جاتی ہیں۔", "د قرآن کریم د یوه توري په لوستلو لس نېکۍ لیکل کېږي.", Color(0xFF059669)),
                Class4ConceptCard("طہارت اور وضو", "قرآن مجید کو باوضو ہو کر چھونا اور پڑھنا", "Perform Wudu and wear clean clothes before touching the Quran.", "قرآن مجید کی تلاوت سے پہلے وضو کرنا اور پاک جگہ بیٹھنا۔", "له تلاوت مخکې اودس کول او په پاک ځای کې کېناستل.", Color(0xFF0284C7)),
                Class4ConceptCard("تعوذ اور تسمیہ پڑھنا", "أَعُوذُ بِاللّٰهِ اور بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ", "Begin recitation with Ta'awwuz and Tasmiyah.", "تلاوت کے آغاز میں تعوذ اور تسمیہ پڑھنا۔", "د تلاوت په پیل کې اعوذ بالله او بسم الله ویل.", Color(0xFF7C3AED)),
                Class4ConceptCard("بہترین انسان (حدیثِ نبوی ﷺ)", "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", "The best among you is the one who learns the Quran and teaches it.", "تم میں سب سے بہتر وہ ہے جو قرآن سیکھے اور دوسروں کو سکھائے۔", "په تاسو کې غوره هغه څوک دی چې قرآن زده کړي او نورو ته یې وښیي.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("How many rewards (نیکیاں) are given for reciting ONE letter of the Holy Quran?", "قرآن مجید کا ایک حرف پڑھنے پر کتنی نیکیاں ملتی ہیں؟", "د قرآن مجید د یوه توري په لوستلو څو نېکۍ ملاوېږي؟", "📖 تلاوت", listOf("10 Rewards (دس نیکیاں)", "1 Reward", "2 Rewards"), 0)
            )
        ),
        Class4StageData(
            id = 7,
            unitLabel = "سبق 7 (باب سوم)",
            pageRange = "Pages 31–34",
            titleEn = "Incident of the First Revelation (نزولِ وحی کا واقعہ)",
            titleUr = "نزولِ وحی کا واقعہ (غارِ حرا اور سورۃ العلق)",
            titlePs = "د وحې د نزول پېښه (د حرا غار او سورة العلق)",
            summaryEn = "When Prophet Muhammad ﷺ was 40 years old, Hazrat Jibrail (AS) brought the first revelation in Cave Hira (Mount Noor): the first 5 verses of Surah Al-Alaq ('Iqra bismi Rabbik'). Hazrat Khadijah (RA) comforted and supported him.",
            summaryUr = "چالیس سال کی عمر میں جبلِ نور کی غارِ حرا میں حضرت جبرائیلؑ پہلی وحی لے کر آئے اور سورۃ العلق کی پہلی پانچ آیات نازل ہوئیں۔ حضرت خدیجہؓ اور ورقہ بن نوفل نے تصدیق کی۔",
            summaryPs = "په ۴۰ کلنۍ کې د حرا په غار کې حضرت جبراییلؑ لومړۍ وحې راوړه او د سورة العلق لومړني پنځه آیتونه نازل شول.",
            gamePromptEn = "Match the details of the First Revelation (نزولِ وحی)!",
            gamePromptUr = "نزولِ وحی کے واقعے کی تفصیلات کو درست جواب سے ملائیں!",
            gamePromptPs = "د لومړۍ وحې د پېښې معلومات له سم ځواب سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("غارِ حرا (جبلِ نور)", "مکہ مکرمہ سے تقریباً تین میل کے فاصلے پر پہاڑ", "Prophet ﷺ used to meditate and worship Allah in Cave Hira.", "حضور ﷺ عبادت اور غور و فکر کے لیے غارِ حرا تشریف لے جاتے تھے۔", "نبي کریم ﷺ به د عبادت لپاره د حرا غار ته تلو.", Color(0xFF059669)),
                Class4ConceptCard("پہلی وحی: سورۃ العلق (1–5)", "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", "First 5 verses of Surah Al-Alaq command reading and knowledge by the Pen.", "پہلی وحی میں پڑھنے اور قلم کے ذریعے علم سکھانے کا ذکر ہے۔", "په لومړۍ وحې کې د لوستلو او د قلم په وسیله د پوهې یادونه شوې ده.", Color(0xFF0284C7)),
                Class4ConceptCard("ام المؤمنین حضرت خدیجہؓ کی تسلی", "آپ ﷺ صلہ رحمی کرتے ہیں اور غریبوں کا بوجھ اٹھاتے ہیں", "Hazrat Khadijah (RA) reassured the Prophet ﷺ and was the first to accept Islam.", "حضرت خدیجہؓ نے آپ ﷺ کو حوصلہ دیا اور سب سے پہلے ایمان لائیں۔", "حضرت خدیجېؓ نبي کریم ﷺ ته ډاډ ورکړ او لومړۍ مومنه شوه.", Color(0xFF7C3AED)),
                Class4ConceptCard("ورقہ بن نوفل کی گواہی", "یہ وہی ناموس (فرشتے جبرائیلؑ) ہیں جو حضرت موسیٰؑ پر اترے", "Waraqah bin Nawfal confirmed that this was the Angel of Revelation.", "ورقہ بن نوفل نے بتایا کہ یہ وہی فرشتے ہیں جو حضرت موسیٰؑ پر وحی لاتے تھے۔", "ورقه بن نوفل وویل چې دا هماغه پرښته ده چې پر موسیٰؑ نازلېدله.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("The first five verses of which Surah were revealed as the First Wahi?", "پہلی وحی میں کس سورت کی ابتدائی پانچ آیات نازل ہوئیں؟", "په لومړۍ وحې کې د کوم سورت لومړني پنځه آیتونه نازل شول؟", "اقْرَأْ بِاسْمِ رَبِّكَ", listOf("Surah Al-Alaq (سورۃ العلق)", "Surah Al-Falaq", "Surah Al-Kausar"), 0)
            )
        ),
        Class4StageData(
            id = 8,
            unitLabel = "سبق 8 (باب سوم)",
            pageRange = "Pages 35–38",
            titleEn = "Preaching of Islam (دعوت و تبلیغ)",
            titleUr = "دعوت و تبلیغ (خفیہ و اعلانیہ دعوت اور کوہِ صفا کا خطاب)",
            titlePs = "د اسلام دعوت او تبلیغ (پټ او ښکاره دعوت او د صفا غونډۍ وینا)",
            summaryEn = "For the first 3 years, preaching was secret; Hazrat Khadijah, Abu Bakr, Ali, and Zaid bin Harithah (RA) accepted Islam first. Then Allah commanded open preaching on Mount Safa.",
            summaryUr = "تین سال تک خفیہ دعوت رہی جس میں حضرت خدیجہؓ، حضرت ابوبکرؓ، حضرت علیؓ اور حضرت زید بن حارثہؓ ایمان لائے۔ پھر کوہِ صفا پر اعلانیہ دعوت دی گئی۔",
            summaryPs = "درې کاله پټ دعوت وشو او بیا پر صفا غونډۍ باندې ښکاره دعوت پیل شو.",
            gamePromptEn = "Match the pioneers of Islam & stages of Preaching!",
            gamePromptUr = "سابقون الاولون اور دعوت و تبلیغ کے مراحل کو ملائیں!",
            gamePromptPs = "د اسلام لومړني مسلمانان او د دعوت پړاوونه وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("پہلے ایمان لانے والے (السابقون الاولون)", "خواتین میں حضرت خدیجہؓ، مردوں میں ابوبکرؓ، بچوں میں علیؓ", "Hazrat Zaid bin Harithah (RA) was first among freed slaves.", "عورتوں میں حضرت خدیجہؓ، مردوں میں حضرت ابوبکرؓ اور بچوں میں حضرت علیؓ سب سے پہلے ایمان لائے۔", "په مېرمنو کې حضرت خدیجهؓ، په نارینه وو کې حضرت ابوبکرؓ او په ماشومانو کې حضرت عليؓ لومړني مسلمانان شول.", Color(0xFF059669)),
                Class4ConceptCard("تین سال خفیہ تبلیغ", "دارِ ارقم میں مسلمانوں کی تربیت", "Early Muslims gathered secretly at Dar-e-Arqam to learn the Quran.", "ابتدائی تین سال تک قریش کے ظلم سے بچنے کے لیے خاموشی سے دعوت دی گئی۔", "لومړني درې کاله په پټه د اسلام بلنه ورکول کېده.", Color(0xFF0284C7)),
                Class4ConceptCard("کوہِ صفا پر اعلانیہ دعوت", "صادق اور امین کی گواہی", "Prophet ﷺ stood on Mount Safa and invited all tribes of Quraish to Tawheed.", "حضور ﷺ نے کوہِ صفا پر کھڑے ہو کر قریش کے تمام قبائل کو توحید کی دعوت دی۔", "نبي کریم ﷺ د صفا پر غونډۍ ودرېد او قریشو ته یې د توحید بلنه ورکړه.", Color(0xFF7C3AED)),
                Class4ConceptCard("صبر و استقامت", "کفار کی مخالفت کے باوجود حق پر ڈٹے رہنا", "The Prophet ﷺ and Sahaba showed unmatched patience in the face of persecution.", "کفارِ مکہ کی سختیوں کے باوجود مسلمانوں نے صبر کا دامن نہیں چھوڑا۔", "د قریشو له ظلمونو سره سره مسلمانانو صبر او استقامت وکړ.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("On which hill did Prophet Muhammad ﷺ climb to give the open call to Islam?", "حضور اکرم ﷺ نے کس پہاڑی پر کھڑے ہو کر اعلانیہ دعوتِ اسلام دی؟", "نبي کریم ﷺ پر کومه غونډۍ ودرېد او خلکو ته یې ښکاره بلنه ورکړه؟", "⛰️ اعلانیہ دعوت", listOf("Mount Safa (کوہِ صفا)", "Mount Uhud", "Mount Sinai"), 0)
            )
        ),
        Class4StageData(
            id = 9,
            unitLabel = "سبق 9 (باب سوم)",
            pageRange = "Pages 39–43",
            titleEn = "Migration to Abyssinia (ہجرتِ حبشہ — اولیٰ و ثانیہ)",
            titleUr = "ہجرتِ حبشہ (پہلی اور دوسری ہجرت اور دربارِ نجاشی)",
            titlePs = "د حبشې هجرت (لومړی او دوهم هجرت او د نجاشي دربار)",
            summaryEn = "In the 5th year of Prophethood, Muslims migrated to Abyssinia (Habsha), ruled by the just Christian king Najashi (Ashamah). Hazrat Ja'far Tayyar (RA) recited Surah Maryam in his court.",
            summaryUr = "نبوت کے پانچویں سال مسلمانوں نے حبشہ کے عادل بادشاہ نجاشی کے ملک کی طرف ہجرت کی۔ دوسری ہجرت میں حضرت جعفر طیارؓ نے دربار میں سورۃ مریم کی آیات تلاوت کیں۔",
            summaryPs = "د نبوت په پنځم کال مسلمانانو حبشې ته هجرت وکړ او حضرت جعفر طیارؓ د نجاشي په دربار کې د سورة مریم تلاوت وکړ.",
            gamePromptEn = "Match the facts about Hijrat-e-Habsha!",
            gamePromptUr = "ہجرتِ حبشہ کے اہم واقعات کو ملائیں!",
            gamePromptPs = "د حبشې د هجرت پېښې له سم ځواب سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("ہجرتِ حبشہ اولیٰ (5 نبوی)", "11 مرد اور 4 خواتین (حضرت عثمانؓ اور حضرت رقیہؓ سمیت)", "First migration in 5th year of Prophethood included 15 Muslims.", "پہلی ہجرتِ حبشہ میں 11 مرد اور 4 عورتیں شامل تھیں۔", "په لومړي هجرت کې ۱۱ نارینه او ۴ مېرمنې شاملې وې.", Color(0xFF059669)),
                Class4ConceptCard("ہجرتِ حبشہ ثانیہ", "83 مرد اور 18 خواتین کا قافلہ", "Second migration included a larger group led by Hazrat Ja'far bin Abi Talib (RA).", "دوسری ہجرت میں تقریباً 83 مرد اور 18 خواتین حبشہ گئیں۔", "په دوهم هجرت کې ۸۳ نارینه او ۱۸ مېرمنو ګډون وکړ.", Color(0xFF0284C7)),
                Class4ConceptCard("حضرت جعفر طیارؓ کا خطاب", "دربارِ نجاشی میں اسلام کی تعلیمات اور سورۃ مریم کی تلاوت", "Hazrat Ja'far (RA) explained how Islam ended ignorance and taught truth and kindness.", "حضرت جعفر طیارؓ نے نجاشی کے دربار میں اسلام کی خوبیاں بیان کیں اور سورۃ مریم پڑھی۔", "حضرت جعفر طیارؓ په دربار کې د اسلام ښېګڼې بیان کړې او سورة مریم یې تلاوت کړ.", Color(0xFF7C3AED)),
                Class4ConceptCard("نجاشی (اصحمہ) کا انصاف", "مسلمانوں کو امن و امان کے ساتھ رہنے کی اجازت", "King Najashi wept upon hearing the Quran and refused to hand Muslims over to Quraish.", "عادل بادشاہ نجاشی نے قریش کے تحفے واپس کر دیے اور مسلمانوں کو پناہ دی۔", "نجاشي پاچا مسلمانانو ته په خپل هېواد کې د امن پناه ورکړه.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Which Sahabi delivered the famous speech in the court of King Najashi of Abyssinia?", "شاہِ حبشہ نجاشی کے دربار میں مسلمانوں کی طرف سے کس صحابی نے تقریر کی؟", "د حبشې د پاچا نجاشي په دربار کې کوم صحابي وینا وکړه؟", "دربارِ نجاشی", listOf("Hazrat Ja'far Tayyar RA (حضرت جعفر طیارؓ)", "Hazrat Khalid RA", "Hazrat Muawiya RA"), 0)
            )
        ),
        Class4StageData(
            id = 10,
            unitLabel = "سبق 10 (باب سوم)",
            pageRange = "Pages 44–47",
            titleEn = "Boycott of Shi'b Abi Talib (شعبِ ابی طالب)",
            titleUr = "شعبِ ابی طالب کا محاصرہ (7 نبوی تا 10 نبوی)",
            titlePs = "د شعب ابي طالب کلابندي (درې کلنه محاصره)",
            summaryEn = "From the 7th to 10th year of Prophethood, Quraish boycotted Banu Hashim in the valley of Shi'b Abi Talib for 3 years. Termites ate the unjust boycott parchment except the name of Allah.",
            summaryUr = "نبوت کے ساتویں سال سے دسویں سال تک قریش نے بنو ہاشم کو شعبِ ابی طالب کی گھاٹی میں تین سال محصور رکھا۔ آخرکار دیمک نے ظالمانہ عہد نامہ چاٹ لیا۔",
            summaryPs = "قریشو د دریو کلونو لپاره بنو هاشم په شعب ابي طالب دره کې کلابند کړل خو مسلمانانو ستر صبر وښود.",
            gamePromptEn = "Match the events of Shi'b Abi Talib!",
            gamePromptUr = "شعبِ ابی طالب کے محاصرے کے واقعات کو ملائیں!",
            gamePromptPs = "د شعب ابي طالب پېښې له سم ځواب سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("تین سال کا سخت محاصرہ", "7 نبوی سے 10 نبوی تک کھانے پینے اور میل جول کی پابندی", "Quraish cut off food, trade, and social ties with Banu Hashim for 3 years.", "قریش نے بنو ہاشم سے خرید و فروخت اور بات چیت بالکل بند کر دی۔", "قریشو له بنو هاشم سره د دریو کلونو لپاره راشه درشه او سوداګري بنده کړه.", Color(0xFF059669)),
                Class4ConceptCard("صبر اور استقامت کی مثال", "درختوں کے پتے کھا کر بھی ایمان پر قائم رہنا", "Companions endured extreme hunger with patience and never gave up Islam.", "صحابہ کرامؓ نے بھوک اور پیاس برداشت کی مگر دینِ حق نہ چھوڑا۔", "صحابه کرامو لوږه او تنده وزغمله خو له خپل دین څخه وا نه وښتل.", Color(0xFF0284C7)),
                Class4ConceptCard("معجزہ: دیمک کا عہد نامہ کھانا", "صرف 'بِاسْمِكَ اللّٰهُمَّ' باقی رہا", "Prophet ﷺ informed his uncle Abu Talib that termites had eaten the unjust document.", "اللہ کے حکم سے دیمک نے قریش کے عہد نامے کو کھا لیا اور صرف اللہ کا نام باقی رہا۔", "وینو (دیمک) د قریشو ظالمانه تړون وخوړ او یوازې د الله نوم پاتې شو.", Color(0xFF7C3AED)),
                Class4ConceptCard("محاصرے کا خاتمہ (10 نبوی)", "تین سال بعد بنو ہاشم گھاٹی سے باہر تشریف لائے", "The boycott ended in the 10th year of Prophethood.", "دس نبوی میں یہ ظالمانہ معاہدہ ختم ہوا اور مسلمان رہا ہوئے۔", "په لسم نبوي کال کې دا محاصره پای ته ورسېده.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("How many years did the boycott of Shi'b Abi Talib last?", "شعبِ ابی طالب کا محاصرہ کتنے سال تک جاری رہا؟", "د شعب ابي طالب محاصره څو کاله روانه وه؟", "شعبِ ابی طالب", listOf("3 Years (تین سال)", "10 Years", "1 Month"), 0)
            )
        ),
        Class4StageData(
            id = 11,
            unitLabel = "سبق 11 (باب سوم)",
            pageRange = "Pages 48–51",
            titleEn = "The Year of Sorrow (عامُ الحُزن)",
            titleUr = "عامُ الحُزن (غم کا سال — 10 نبوی)",
            titlePs = "عام الحزن (د غم کال — لسم نبوي کال)",
            summaryEn = "In the 10th year of Prophethood, after leaving Shi'b Abi Talib, both Uncle Abu Talib and beloved wife Umm-ul-Momineen Hazrat Khadijah-tul-Kubra (RA) passed away. This year is called Aam-ul-Huzn.",
            summaryUr = "نبوت کے دسویں سال حضور ﷺ کے شفیق چچا حضرت ابوطالب اور وفادار رفیقۂ حیات حضرت خدیجۃ الکبریٰؓ وفات پا گئیں، اس لیے اس سال کو عام الحزن (غم کا سال) کہتے ہیں۔",
            summaryPs = "د نبوت په لسم کال د حضرت ابوطالب او حضرت خدیجېؓ د وفات له امله دا کال د عام الحزن (د غم کال) په نوم یاد شو.",
            gamePromptEn = "Match the facts of Aam-ul-Huzn!",
            gamePromptUr = "عام الحزن کے واقعات کو درست جواب سے ملائیں!",
            gamePromptPs = "د عام الحزن معلومات له سم ځواب سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("عامُ الحُزن کا معنی", "غم اور دکھ کا سال (نبوت کا دسواں سال)", "Literally means 'The Year of Grief/Sorrow' (10th year of Prophethood).", "عام الحزن کے معنی ہیں 'غم کا سال'۔", "عام الحزن یعنې د غم او خپګان کال.", Color(0xFF059669)),
                Class4ConceptCard("حضرت ابوطالب کی وفات", "پچیس سال سے زائد عرصہ حضور ﷺ کی حفاظت اور سرپرستی", "Abu Talib protected Prophet ﷺ against Quraish hostility in Makkah.", "حضرت ابوطالب نے ہمیشہ قریش کے مقابلے میں حضور ﷺ کا ساتھ دیا۔", "حضرت ابوطالب تل په مکه کې د نبي کریم ﷺ ملاتړ او ساتنه کوله.", Color(0xFF0284C7)),
                Class4ConceptCard("ام المؤمنین حضرت خدیجہؓ کی وفات", "پچیس سالہ رفاقت اور مال و جان سے اسلام کی خدمت", "Hazrat Khadijah (RA) supported the Prophet ﷺ for 25 years and was promised a palace in Jannah.", "حضرت خدیجہؓ نے اپنی تمام دولت دینِ اسلام پر قربان کر دی اور جنت کی بشارت پائی۔", "حضرت خدیجېؓ خپله ټوله شتمني د اسلام لپاره قربان کړه.", Color(0xFF7C3AED)),
                Class4ConceptCard("اللہ پر کامل بھروسا", "مشکل ترین حالات میں بھی دین کی تبلیغ جاری رکھنا", "Even after losing his greatest supporters in Makkah, Prophet ﷺ continued his mission.", "اتنے بڑے صدمے کے بعد بھی حضور ﷺ نے صبر کیا اور تبلیغِ دین جاری رکھی۔", "له دې لوی غم وروسته هم رسول الله ﷺ په صبر سره خپل دعوت ته دوام ورکړ.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("What does 'Aam-ul-Huzn' (عامُ الحُزن) mean?", "'عامُ الحُزن' کا کیا مطلب ہے؟", "د 'عام الحزن' معنی څه ده؟", "عامُ الحُزن", listOf("The Year of Sorrow (غم کا سال)", "The Year of Victory", "The Year of Rain"), 0)
            )
        ),
        Class4StageData(
            id = 12,
            unitLabel = "سبق 12 (باب سوم)",
            pageRange = "Pages 52–55",
            titleEn = "The Journey to Taif (سفرِ طائف)",
            titleUr = "سفرِ طائف (عفو و درگزر اور رحمتِ عالم ﷺ کی دعا)",
            titlePs = "د طایف سفر (د رحمت للعالمین ﷺ بښنه او دعا)",
            summaryEn = "In 10 Nabawi, Prophet ﷺ travelled to Taif with Hazrat Zaid bin Harithah (RA). Despite being pelted with stones, he refused to let the Angel of Mountains crush them and instead prayed for their guidance.",
            summaryUr = "دس نبوی میں حضور ﷺ حضرت زید بن حارثہؓ کے ساتھ طائف تشریف لے گئے۔ طائف کے سرداروں کی بدسلوکی کے باوجود آپ ﷺ نے پہاڑوں کے فرشتے کو بدلے سے منع فرمایا اور ان کی ہدایت کے لیے دعا کی۔",
            summaryPs = "نبي کریم ﷺ له حضرت زید بن حارثهؓ سره طایف ته ولاړ او د طایف د خلکو له ناوړه چلند سره سره یې هغوی ته د هدایت دعا وکړه.",
            gamePromptEn = "Match the events of Safar-e-Taif!",
            gamePromptUr = "سفرِ طائف کے واقعات کو درست جواب سے ملائیں!",
            gamePromptPs = "د طایف د سفر پېښې له سم ځواب سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("سفرِ طائف کے ساتھی", "حضرت زید بن حارثہ رضی اللہ عنہ", "Hazrat Zaid bin Harithah (RA) shielded the Prophet ﷺ with his own body.", "حضرت زید بن حارثہؓ نے پتھروں کے آگے ڈھال بن کر حضور ﷺ کی حفاظت کی۔", "حضرت زید بن حارثهؓ د کاڼو پر وړاندې د نبي کریم ﷺ ساتنه وکړه.", Color(0xFF059669)),
                Class4ConceptCard("پہاڑوں کے فرشتے کی پیشکش", "اگر آپ ﷺ حکم دیں تو دونوں پہاڑ ملا دوں", "The Angel of Mountains offered to crush the city, but Prophet ﷺ forgave them.", "پہاڑوں کے فرشتے نے اجازت مانگی مگر رحمتِ عالم ﷺ نے معاف فرما دیا۔", "د غرونو پرښتې اجازه وغوښته خو رحمت للعالمین ﷺ بښنه غوره کړه.", Color(0xFF0284C7)),
                Class4ConceptCard("ہدایت کی دعا", "امید ہے اللہ ان کی نسل سے توحید کے ماننے والے پیدا کرے گا", "Soon the whole tribe of Banu Thaqif in Taif accepted Islam.", "آپ ﷺ کی دعا قبول ہوئی اور بعد میں طائف کے تمام لوگ مسلمان ہو گئے۔", "د نبي کریم ﷺ دعا قبوله شوه او وروسته د طایف ټول خلک مسلمانان شول.", Color(0xFF7C3AED)),
                Class4ConceptCard("عداس کا قبولِ اسلام", "عتبہ اور شیبہ کے باغ میں انگور پیش کرنے والا نینوا کا غلام", "Addas from Nineveh (city of Prophet Yunus AS) kissed the Prophet's hands and accepted Islam.", "باغ کے عیسائی غلام عداس نے حضرت یونسؑ کا ذکر سن کر حضور ﷺ کے ہاتھ چومے۔", "عداس د حضرت یونسؑ د وطن یادونه واورېده او ایمان یې راووړ.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Who accompanied Prophet Muhammad ﷺ on the journey to Taif?", "سفرِ طائف میں حضور اکرم ﷺ کے ساتھ کون سے صحابی تھے؟", "د طایف په سفر کې له نبي کریم ﷺ سره کوم صحابي ملګری و؟", "سفرِ طائف", listOf("Hazrat Zaid bin Harithah RA (حضرت زید بن حارثہؓ)", "Hazrat Bilal RA", "Hazrat Salman RA"), 0)
            )
        ),
        Class4StageData(
            id = 13,
            unitLabel = "سبق 13 (باب چہارم)",
            pageRange = "Pages 56–59",
            titleEn = "Simplicity (سادگی)",
            titleUr = "سادگی (اخلاق و آداب — سادہ طرزِ زندگی)",
            titlePs = "سادګي (اخلاق او اداب — ساده ژوند)",
            summaryEn = "Simplicity is part of faith. Prophet Muhammad ﷺ lived simply, sat on a mat, mended his own shoes, and avoided extravagance (Israf) and pride.",
            summaryUr = "سادگی ایمان کا حصہ ہے۔ حضور اکرم ﷺ خوراک، لباس اور رہن سہن میں سادگی پسند فرماتے تھے، اپنے کام خود کرتے اور اسراف و تکبر سے منع فرماتے تھے۔",
            summaryPs = "سادګي د ایمان برخه ده. نبي کریم ﷺ په خوراک، جامو او ناسته ولاړه کې سادګي خوښوله.",
            gamePromptEn = "Match the Islamic teachings on Simplicity (سادگی)!",
            gamePromptUr = "سادگی کے اسلامی آداب کو درست جواب سے ملائیں!",
            gamePromptPs = "د سادګۍ اسلامي لارښوونې وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("سادگی ایمان کا حصہ ہے", "اَلْبَذَاذَةُ مِنَ الْإِيمَانِ", "Hadith teaches that simplicity in living is a sign of faith.", "حدیثِ مبارکہ میں سادگی اختیار کرنے کو ایمان کی نشانی قرار دیا گیا ہے۔", "په حدیث شریف کې سادګي د ایمان نښه بلل شوې ده.", Color(0xFF059669)),
                Class4ConceptCard("اسراف اور فضول خرچی سے پرہیز", "اعتدال اور میانہ روی بہترین راستہ ہے", "Islam forbids wasting wealth on show-off and luxury.", "دکھاوے اور فضول خرچی سے بچنا انسان کو ذہنی سکون دیتا ہے۔", "له ځان ښودنې او اسراف څخه ځان ساتل سکون راولي.", Color(0xFF0284C7)),
                Class4ConceptCard("حضور ﷺ کا اسوۂ حسنہ", "اپنے جوتے خود گانٹھنا اور گھر کے کاموں میں ہاتھ بٹانا", "Prophet ﷺ did his own chores and sat humbly with the poor.", "حضور ﷺ چٹائی پر تشریف فرما ہوتے اور اپنے کام اپنے ہاتھ سے کرتے۔", "نبي کریم ﷺ به پر پوزي کېناسته او خپل کارونه به یې پخپله کول.", Color(0xFF7C3AED)),
                Class4ConceptCard("سادگی کے معاشرتی فوائد", "امیر اور غریب کا فرق مٹتا ہے اور حسد ختم ہوتا ہے", "Simplicity promotes brotherhood and equality in society.", "سادگی سے معاشرے میں مساوات، محبت اور قناعت پیدا ہوتی ہے۔", "په سادګۍ سره په ټولنه کې ورورولي او قناعت پیدا کېږي.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("According to Hadith, Simplicity (سادگی) is a part of what?", "حدیثِ نبوی ﷺ کے مطابق سادگی کس چیز کا حصہ ہے؟", "د حدیث شریف له مخې سادګي د څه شي برخه ده؟", "سادگی", listOf("Part of Faith / Iman (ایمان کا حصہ)", "Part of Wealth", "Part of Sport"), 0)
            )
        ),
        Class4StageData(
            id = 14,
            unitLabel = "سبق 14 (باب چہارم)",
            pageRange = "Pages 60–63",
            titleEn = "Etiquette of Gatherings (آدابِ مجلس)",
            titleUr = "آدابِ مجلس (مل بیٹھنے اور گفتگو کے آداب)",
            titlePs = "د مجلس اداب (د ناستې او خبرو اترو اداب)",
            summaryEn = "Learn the Islamic manners of sitting in a gathering (Majlis): greeting with Assalamu Alaikum, sitting wherever space is available, making room for newcomers, not whispering between two when a third is present, and speaking politely.",
            summaryUr = "مجلس میں داخل ہوتے وقت سلام کرنا، جہاں جگہ ملے بیٹھ جانا، آنے والے کے لیے کشادگی پیدا کرنا، تین افراد میں سے دو کا الگ کھسر پھسر نہ کرنا اور بڑوں کا احترام کرنا۔",
            summaryPs = "مجلس ته د ننوتلو پر مهال سلام اچول، راتلونکي ته ځای ورکول او د درېیم کس په شتون کې پټې خبرې نه کول.",
            gamePromptEn = "Match the Etiquette of Gatherings (آدابِ مجلس)!",
            gamePromptUr = "آدابِ مجلس کے اصولوں کو درست جواب سے ملائیں!",
            gamePromptPs = "د مجلس اداب له سم ځواب سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("سلام کرنا اور جگہ دینا", "تَفَسَّحُوا فِي الْمَجَالِسِ (مجلسوں میں کشادگی پیدا کرو)", "Greet everyone with Salam and make space for others to sit.", "مجلس میں آتے اور جاتے وقت سلام کریں اور دوسروں کو بیٹھنے کی جگہ دیں۔", "مجلس ته د راتلو پر مهال سلام ووایئ او نورو ته ځای ورکړئ.", Color(0xFF059669)),
                Class4ConceptCard("سرگوشی (کھسر پھسر) سے منع", "جب تین افراد ہوں تو دو آدمی تیسرے کو چھوڑ کر سرگوشی نہ کریں", "Whispering between two people makes the third person feel sad and excluded.", "تین آدمیوں میں سے دو کا الگ چپکے چپکے بات کرنا تیسرے کو رنجیدہ کرتا ہے۔", "که درې کسان ناست وي، دوه دې په خپل منځ کې پټې خبرې نه کوي.", Color(0xFF0284C7)),
                Class4ConceptCard("کسی کو اٹھا کر اس کی جگہ نہ بیٹھنا", "جہاں جگہ خالی ملے وہیں بیٹھ جانا", "Do not make someone stand up to take their seat.", "کسی پہلے سے بیٹھے ہوئے شخص کو اٹھا کر اس کی جگہ نہیں بیٹھنا چاہیے۔", "هیڅوک له خپله ځایه مه پاڅوئ بلکې چیرې چې ځای وي کېنئ.", Color(0xFF7C3AED)),
                Class4ConceptCard("کفارۂ مجلس کی دعا", "سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ...", "Reciting the Dua of Kaffarah-e-Majlis before leaving a gathering.", "مجلس کے اختتام پر کفارۂ مجلس کی مسنون دعا پڑھنا۔", "د مجلس په پای کې د کفاره مجلس دعا لوستل.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("When three people are sitting together, why shouldn't two whisper secretly?", "جب تین افراد بیٹھے ہوں تو دو کو الگ سرگوشی کیوں نہیں کرنی چاہیے؟", "کله چې درې کسان ناست وي، ولې باید دوه کسان پټې خبرې ونه کړي؟", "آدابِ مجلس", listOf("It hurts the feelings of the third person (تیسرے شخص کو دکھ ہوتا ہے)", "It makes noise", "It takes time"), 0)
            )
        ),
        Class4StageData(
            id = 15,
            unitLabel = "سبق 15 (باب چہارم)",
            pageRange = "Pages 64–67",
            titleEn = "Punctuality (وقت کی پابندی)",
            titleUr = "وقت کی پابندی (نظامِ کائنات اور عبادات سے سبق)",
            titlePs = "د وخت پابندي (د لمانځه او کایناتو نظام)",
            summaryEn = "Time is a precious blessing that never returns once gone. The Sun, Moon, seasons, 5 daily prayers, Ramadan fasts, and Hajj all teach strict punctuality.",
            summaryUr = "وقت اللہ کی عظیم نعمت ہے، گزرا ہوا وقت کبھی واپس نہیں آتا۔ سورج، چاند، پانچ وقت کی نماز، روزہ اور حج ہمیں وقت کی پابندی سکھاتے ہیں۔",
            summaryPs = "وخت د الله لوی نعمت دی. لمر، سپوږمۍ، پنځه وخته لمونځ، روژه او حج موږ ته د وخت پابندي راښیي.",
            gamePromptEn = "Match the lessons of Punctuality (وقت کی پابندی)!",
            gamePromptUr = "وقت کی پابندی کے اسباق کو ملائیں!",
            gamePromptPs = "د وخت د پابندۍ درسونه وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("نماز اور وقت کی پابندی", "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا", "Prayer is prescribed for believers at fixed times.", "بے شک نماز مومنوں پر مقررہ وقت پر فرض کی گئی ہے۔", "بې شکه لمونځ پر مومنانو په ټاکلي وخت فرض شوی دی.", Color(0xFF059669)),
                Class4ConceptCard("کائنات کا نظام", "سورج اور چاند اپنے مقررہ وقت پر طلوع اور غروب ہوتے ہیں", "The Sun, Moon, day, and night follow a precise schedule set by Allah.", "سورج، چاند اور موسموں کی باقاعدگی ہمیں وقت کی قدر سکھاتی ہے۔", "د لمر او سپوږمۍ منظم حرکت موږ ته د وخت ارزښت راښیي.", Color(0xFF0284C7)),
                Class4ConceptCard("آج کا کام کل پر نہ چھوڑیں", "صبح سویرے اٹھنا اور اسکول و مطالعے کا وقت مقرر کرنا", "Successful students wake up early and finish their homework on time.", "کامیاب طالب علم اپنا ہر کام وقت پر مکمل کرتا ہے۔", "بریالی زده کوونکی خپل هر کار په خپل وخت سرته رسوي.", Color(0xFF7C3AED)),
                Class4ConceptCard("سورۃ العصر کا پیغام", "انسان خسارے میں ہے سوائے ان کے جو وقت کو نیکی میں گزاریں", "Surah Al-Asr swears by Time to remind us of its value.", "قرآن مجید میں اللہ تعالیٰ نے زمانے (وقت) کی قسم کھا کر اس کی اہمیت بتائی ہے۔", "په سورة العصر کې الله تعالی په وخت قسم کړی دی.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Which daily Islamic worship trains us five times a day in punctuality?", "کون سی اسلامی عبادت ہمیں روزانہ پانچ مرتبہ وقت کی پابندی سکھاتی ہے؟", "کوم اسلامي عبادت موږ ته د ورځې پنځه ځله د وخت پابندي راښیي؟", "⏰ وقت کی پابندی", listOf("Salah / Namaz (نماز)", "Zakat", "Sleep"), 0)
            )
        ),
        Class4StageData(
            id = 16,
            unitLabel = "سبق 16 (باب پنجم)",
            pageRange = "Pages 68–71",
            titleEn = "Honesty & Trustworthiness (دیانت داری)",
            titleUr = "دیانت داری (امانت کی حفاظت اور الصادق الامین ﷺ)",
            titlePs = "امانتداري (د امانت ساتنه او الصادق الامین ﷺ)",
            summaryEn = "Honesty (Diyanat-dari) means fulfilling trusts in wealth, words, weight/measure, and duties. Even before Prophethood, the people of Makkah called Prophet Muhammad ﷺ Al-Sadiq and Al-Amin.",
            summaryUr = "کسی کی امانت، راز، وقت اور ناپ تول میں خیانت نہ کرنا دیانت داری کہلاتا ہے۔ حضور ﷺ کو دشمن بھی 'الصادق' اور 'الامین' کہتے تھے۔",
            summaryPs = "په مال، خبرو، تله او دنده کې خیانت نه کول امانتداري بلل کېږي. قریشو هم نبي کریم ﷺ ته الصادق او الامین ویل.",
            gamePromptEn = "Match the teachings of Honesty (دیانت داری)!",
            gamePromptUr = "دیانت داری کے اسلامی اصولوں کو ملائیں!",
            gamePromptPs = "د امانتدارۍ اسلامي اصول وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("الصادق اور الامین ﷺ", "ہجرت کی رات حضرت علیؓ کو امانتیں لوٹانے کے لیے چھوڑنا", "On the night of Hijrat, Prophet ﷺ instructed Hazrat Ali (RA) to return all trusts.", "ہجرت کی رات بھی حضور ﷺ نے کفار کی امانتیں لوٹانے کا انتظام فرمایا۔", "د هجرت په شپه هم نبي کریم ﷺ حضرت عليؓ د امانتونو د سپارلو لپاره پرېښود.", Color(0xFF059669)),
                Class4ConceptCard("ناپ تول میں دیانت", "لین دین میں پورا ناپنا اور ملاوٹ نہ کرنا", "Giving full measure in trade and never cheating customers.", "کاروبار میں پورا تولنا اور عیب دار چیز چھپا کر نہ بیچنا۔", "په سوداګرۍ کې پوره تله کول او دوکه نه کول.", Color(0xFF0284C7)),
                Class4ConceptCard("بات اور مشورے کی امانت", "کسی کی کہی ہوئی بات اور راز کی حفاظت کرنا", "Keeping someone's secret and giving sincere advice is also a trust.", "مجلس کی بات اور کسی کا راز بھی امانت ہے۔", "د چا پټه خبره ساتل او رښتینې مشوره ورکول هم امانت دی.", Color(0xFF7C3AED)),
                Class4ConceptCard("لاَ إِيمَانَ لِمَنْ لاَ أَمَانَةَ لَهُ", "جس میں امانت داری نہیں اس کا ایمان مکمل نہیں", "Hadith highlights that trustworthiness is essential to faith.", "حدیثِ مبارکہ ہے کہ جس شخص میں امانت نہیں اس کا ایمان کامل نہیں۔", "چا کې چې امانتداري نه وي د هغه ایمان بشپړ نه دی.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("With which titles was Prophet Muhammad ﷺ known in Makkah for his truthfulness and honesty?", "سچائی اور دیانت داری کی وجہ سے مکہ والے حضور ﷺ کو کن القابات سے پکارتے تھے؟", "په مکه کې خلکو د رښتینولۍ او امانتدارۍ له امله نبي کریم ﷺ په کومو نومونو یاداوه؟", "دیانت داری", listOf("Al-Sadiq and Al-Amin (الصادق اور الامین)", "Al-Farooq", "Zul-Qarnain"), 0)
            )
        ),
        Class4StageData(
            id = 17,
            unitLabel = "سبق 17 (باب پنجم)",
            pageRange = "Pages 72–75",
            titleEn = "Rights of Fellow Beings (حقوق العباد — خدمتِ خلق)",
            titleUr = "حقوق العباد (خدمتِ خلق — والدین، اساتذہ، ہمسایوں اور غریبوں کے حقوق)",
            titlePs = "حقوق العباد (د خلکو خدمت او د مور پلار، استاد او ګاونډي حقونه)",
            summaryEn = "Huqooq-ul-Ibad are the rights of people upon one another: obeying parents, respecting teachers, caring for neighbours and orphans, visiting the sick, and helping the needy.",
            summaryUr = "انسانوں کے ایک دوسرے پر حقوق کو حقوق العباد کہتے ہیں، جیسے والدین کی فرمانبرداری، اساتذہ کا ادب، ہمسایوں کا خیال، مریض کی عیادت اور غریبوں کی مدد۔",
            summaryPs = "پر یو بل د انسانانو حقونو ته حقوق العباد وایي لکه د مور پلار اطاعت، د ګاونډي خیال ساتل او د بېوزلو مرسته.",
            gamePromptEn = "Match each group of people with their Islamic right (حقوق العباد)!",
            gamePromptUr = "حقوق العباد کے مختلف پہلوؤں کو درست جواب سے ملائیں!",
            gamePromptPs = "د حقوق العباد برخې له سم ځواب سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("والدین اور اساتذہ کے حقوق", "ادب، احترام اور فرمانبرداری", "Obeying parents and teachers brings blessing in knowledge and life.", "والدین اور اساتذہ کا ادب کرنا اور ان کے لیے دعا کرنا۔", "د مور او پلار او استادانو درناوی او اطاعت کول.", Color(0xFF059669)),
                Class4ConceptCard("ہمسایوں کے حقوق", "وہ مومن نہیں جو خود پیٹ بھر کر کھائے اور اس کا پڑوسی بھوکا رہے", "Sharing food and protecting neighbours from any harm.", "ہمسائے کی خوشی و غمی میں شریک ہونا اور اسے تکلیف نہ دینا۔", "له ګاونډي سره ښه چلند کول او هغه ته تکلیف نه رسول.", Color(0xFF0284C7)),
                Class4ConceptCard("یتیموں، مسکینوں اور مریضوں کا حق", "بیمار کی عیادت کرنا اور محتاج کی مدد کرنا", "Visiting the sick and helping orphans earns Allah's love.", "مریض کی تیمارداری کرنا اور یتیموں و محتاجوں کے کام آنا۔", "د ناروغانو پوښتنه کول او له یتیمانو سره مرسته کول.", Color(0xFF7C3AED)),
                Class4ConceptCard("خَيْرُ النَّاسِ مَنْ يَّنْفَعُ النَّاسَ", "لوگوں میں سب سے بہترین وہ ہے جو لوگوں کو نفع پہنچائے", "The best person is the one who benefits humanity.", "بہترین انسان وہ ہے جس سے دوسرے انسانوں کو فائدہ پہنچے۔", "غوره انسان هغه دی چې نورو خلکو ته یې ګټه ورسېږي.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("According to Hadith, who is the best among people (خَيْرُ النَّاسِ)?", "حدیثِ نبوی ﷺ کے مطابق لوگوں میں سب سے بہترین شخص کون ہے؟", "د حدیث شریف له مخې په خلکو کې تر ټولو غوره څوک دی؟", "خَيْرُ النَّاسِ", listOf("One who benefits others (جو لوگوں کو فائدہ پہنچائے)", "One who sleeps a lot", "One who shouts"), 0)
            )
        ),
        Class4StageData(
            id = 18,
            unitLabel = "سبق 18 (باب پنجم)",
            pageRange = "Pages 76–79",
            titleEn = "Love for Homeland (وطن سے محبت — ذمہ دار شہری)",
            titleUr = "وطن سے محبت (ایک ذمہ دار شہری کے فرائض)",
            titlePs = "له وطن سره مینه (د مسوولیت منونکي وګړي دندې)",
            summaryEn = "Prophet Muhammad ﷺ loved Makkah and prayed for the prosperity of Madinah. A patriotic citizen obeys laws, protects national property, plants trees, works hard, and defends Pakistan.",
            summaryUr = "حضور ﷺ کو مکہ مکرمہ سے گہری محبت تھی اور آپ ﷺ نے مدینہ منورہ کی برکت کے لیے دعا فرمائی۔ اچھا شہری ملکی قوانین مانتا ہے، سرکاری املاک کی حفاظت کرتا ہے اور وطن کی ترقی کے لیے محنت کرتا ہے۔",
            summaryPs = "یو ښه او مسوولیت منونکی وګړی له خپل هېواد سره مینه لري، قوانین مني او د ملي شتمنیو ساتنه کوي.",
            gamePromptEn = "Match the duties of a Patriotic Citizen (وطن سے محبت)!",
            gamePromptUr = "حب الوطنی اور ذمہ دار شہری کے فرائض کو ملائیں!",
            gamePromptPs = "له وطن سره د مینې او ښه وګړي دندې وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("حضور ﷺ کی وطن سے محبت", "ہجرت کے وقت مکہ کو مڑ مڑ کر دیکھنا اور مدینہ کے لیے دعا", "Prophet ﷺ expressed deep love for Makkah and prayed for Madinah's peace.", "ہجرت کے وقت حضور ﷺ نے فرمایا: اے مکہ! تو مجھے دنیا کی ہر بستی سے زیادہ محبوب ہے۔", "د هجرت پر مهال نبي کریم ﷺ له مکې مکرمې سره خپله ژوره مینه څرګنده کړه.", Color(0xFF059669)),
                Class4ConceptCard("قوانین کی پابندی اور امن", "ٹریفک قوانین ماننا اور امن و بھائی چارہ قائم رکھنا", "Obeying laws and maintaining peace across the country.", "ملک کے آئین اور قوانین کا احترام کرنا۔", "د هېواد د قوانینو درناوی او په ټولنه کې سوله ساتل.", Color(0xFF0284C7)),
                Class4ConceptCard("قومی املاک کی حفاظت", "اسکول، پارک، ہسپتال اور سڑکوں کو نقصان نہ پہنچانا", "Schools, parks, and public transport belong to the whole nation.", "سرکاری عمارتوں، درختوں اور بجلی و پانی کی حفاظت کرنا۔", "د ښوونځیو، پارکونو او عامه ځایونو ساتنه کول.", Color(0xFF7C3AED)),
                Class4ConceptCard("علم اور محنت سے وطن کی خدمت", "اعلیٰ تعلیم حاصل کر کے پاکستان کا نام روشن کرنا", "Students serve their homeland best by studying diligently.", "محنت اور ایمانداری سے پڑھ کر وطنِ عزیز پاکستان کی ترقی میں حصہ لینا۔", "په زده کړه او زیار سره د خپل ګران هېواد خدمت کول.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("How can students show true love for their homeland Pakistan?", "طلبہ اپنے پیارے وطن پاکستان سے سچی محبت کا ثبوت کیسے دے سکتے ہیں؟", "زده کوونکي څنګه له خپل هېواد سره رښتینې مینه ښودلی شي؟", "🇵🇰 وطن سے محبت", listOf("By studying hard, obeying laws & keeping it clean (محنت سے پڑھ کر اور قوانین مان کر)", "By breaking park benches", "By wasting water"), 0)
            )
        ),
        Class4StageData(
            id = 19,
            unitLabel = "سبق 19 (باب ششم)",
            pageRange = "Pages 80–87",
            titleEn = "Prophets Hazrat Ibrahim (AS) & Hazrat Musa (AS)",
            titleUr = "حضرت ابراہیم علیہ السلام اور حضرت موسیٰ علیہ السلام",
            titlePs = "حضرت ابراهیم علیه السلام او حضرت موسیٰ علیه السلام",
            summaryEn = "Learn about Hazrat Ibrahim AS (Khalilullah — broke idols, thrown into Nimrod's fire which became cool, rebuilt Ka'bah with Hazrat Ismail AS) and Hazrat Musa AS (Kalimullah — confronted Pharaoh, miracles of Staff & Glowing Hand, crossing the Red Sea).",
            summaryUr = "حضرت ابراہیمؑ (خلیل اللہ) کا نمرود کی آگ میں ڈالا جانا، آبِ زمزم اور تعمیرِ کعبہ؛ اور حضرت موسیٰؑ (کلیم اللہ) کا فرعون کے مقابلے میں عصا اور یدِ بیضا کا معجزہ اور بنی اسرائیل کی نجات۔",
            summaryPs = "د حضرت ابراهیمؑ (خلیل الله) او حضرت موسیٰؑ (کلیم الله) ژوند، معجزې او د توحید دعوت.",
            gamePromptEn = "Match the miracles & titles of Hazrat Ibrahim (AS) & Hazrat Musa (AS)!",
            gamePromptUr = "حضرت ابراہیمؑ اور حضرت موسیٰؑ کے القابات اور معجزات کو ملائیں!",
            gamePromptPs = "د حضرت ابراهیمؑ او حضرت موسیٰؑ لقبونه او معجزې وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("حضرت ابراہیمؑ (خلیل اللہ)", "قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ", "Allah turned Nimrod's blazing fire into a cool garden for Hazrat Ibrahim (AS).", "اللہ تعالیٰ کے حکم سے نمرود کی آگ حضرت ابراہیمؑ کے لیے ٹھنڈی اور سلامتی والی بن گئی۔", "د الله په امر د نمرود اور پر حضرت ابراهیمؑ سوړ او بڼ شو.", Color(0xFF059669)),
                Class4ConceptCard("تعمیرِ کعبہ اور سنتِ ابراہیمی", "حضرت اسماعیلؑ کے ساتھ خانہ کعبہ کی تعمیر اور عظیم قربانی", "Rebuilt the Ka'bah in Makkah and established the tradition of Eid-ul-Adha sacrifice.", "حضرت ابراہیمؑ اور حضرت اسماعیلؑ نے خانہ کعبہ تعمیر کیا اور قربانی کی سنت قائم کی۔", "حضرت ابراهیمؑ او حضرت اسماعیلؑ کعبه شریفه ودانه کړه.", Color(0xFF0284C7)),
                Class4ConceptCard("حضرت موسیٰؑ (کلیم اللہ)", "کوہِ طور پر اللہ سے ہم کلامی اور کتاب 'تورات' کا نزول", "Hazrat Musa (AS) is called Kalimullah because Allah spoke to him directly on Mount Tur.", "کوہِ طور پر اللہ سے ہم کلام ہونے کی وجہ سے آپؑ کا لقب کلیم اللہ ہے۔", "پر طور غره له الله سره د خبرو له امله کلیم الله بلل کېږي.", Color(0xFF7C3AED)),
                Class4ConceptCard("عصا (لاٹھی) اور یدِ بیضا کا معجزہ", "سمندر سے راستہ بننا اور فرعون کا غرق ہونا", "His staff turned into a giant serpent and parted the sea to save Bani Isra'il.", "آپؑ کے عصا سے سمندر میں بارہ راستے بن گئے اور فرعون اپنے لشکر سمیت غرق ہوا۔", "د حضرت موسیٰؑ په امسا سره په سمندر کې لاره جوړه شوه او فرعون ډوب شو.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Which Prophet is known by the title 'Kalimullah' (کلیم اللہ)?", "کس نبی کا لقب 'کلیم اللہ' ہے؟", "د کوم پیغمبر لقب 'کلیم الله' دی؟", "کلیم اللہ", listOf("Hazrat Musa AS (حضرت موسیٰ علیہ السلام)", "Hazrat Ibrahim AS", "Hazrat Nuh AS"), 0),
                NazeraQuizQuestion("What did Allah command the fire of Nimrod to become for Hazrat Ibrahim (AS)?", "اللہ تعالیٰ نے نمرود کی آگ کو حضرت ابراہیمؑ کے لیے کیا بننے کا حکم دیا؟", "الله تعالی د نمرود اور ته د حضرت ابراهیمؑ لپاره د څه کېدو امر وکړ؟", "🔥 كُونِي بَرْدًا وَسَلَامًا", listOf("Cool and peaceful (ٹھنڈی اور سلامتی والی)", "Hotter", "Smoke"), 0)
            )
        ),
        Class4StageData(
            id = 20,
            unitLabel = "سبق 20 (باب ششم و ہفتم)",
            pageRange = "Pages 88–103",
            titleEn = "Hazrat Umar (RA), Hazrat Usman (RA), Cleanliness & Saving Water",
            titleUr = "حضرت عمر فاروقؓ، حضرت عثمان غنیؓ، صفائی اور پانی کی اہمیت",
            titlePs = "حضرت عمر فاروقؓ، حضرت عثمان غنيؓ، پاکوالی او د اوبو اهمیت",
            summaryEn = "Study the lives of the 2nd Caliph Hazrat Umar Farooq RA (Al-Farooq, Hijri calendar, public welfare) and 3rd Caliph Hazrat Usman Ghani RA (Zun-Noorain, Jami-ul-Quran, Bir-e-Rumah well), plus Islamic teachings on Cleanliness and Saving Water.",
            summaryUr = "خلیفۂ دوم حضرت عمر فاروقؓ کا عدل و انصاف، خلیفۂ سوم حضرت عثمان غنیؓ کی سخاوت (بئرِ رومہ)، جسمانی و ماحولیاتی صفائی اور پانی ضائع نہ کرنے کی تعلیمات۔",
            summaryPs = "د حضرت عمر فاروقؓ عدل، د حضرت عثمان غنيؓ سخاوت (د رومې څاه)، پاکوالی او د اوبو نه ضایع کول.",
            gamePromptEn = "Match the Caliphs, Cleanliness & Water Conservation facts!",
            gamePromptUr = "خلفائے راشدین اور صفائی و پانی کی اہمیت کے نکات کو ملائیں!",
            gamePromptPs = "د خلفای راشدینو او د اوبو د ساتنې ټکي وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("حضرت عمر فاروق رضی اللہ عنہ", "لقب: الفاروق • سن ہجری کا آغاز اور راتوں کو رعایا کی خبرگیری", "2nd Caliph of Islam; famous for justice, patrolling at night to help the poor.", "اسلام کے دوسرے خلیفہ جن کے قبولِ اسلام سے مسلمان اعلانیہ نماز پڑھنے لگے۔", "د اسلام دوهم خلیفه چې په عدل او د ولس په خدمت مشهور و.", Color(0xFF059669)),
                Class4ConceptCard("حضرت عثمان غنی رضی اللہ عنہ", "لقب: ذوالنورین اور جامع القرآن • بئرِ رومہ (میٹھے پانی کا کنواں)", "3rd Caliph; bought Bir-e-Rumah well for Muslims and equipped the army of Tabuk.", "مدینہ میں میٹھے پانی کا کنواں (بئرِ رومہ) خرید کر مسلمانوں کے لیے وقف فرمایا۔", "د اسلام درېیم خلیفه چې د رومې خوږو اوبو څاه یې د مسلمانانو لپاره وقف کړه.", Color(0xFF0284C7)),
                Class4ConceptCard("صفائی کی ضرورت و اہمیت", "جسم، لباس، گھر، اسکول اور گلی محلے کو صاف رکھنا", "Allah loves those who keep themselves pure and clean.", "جسم اور کپڑوں کے ساتھ ساتھ اپنے اسکول اور ماحول کو صاف رکھنا۔", "د بدن، جامو، کور او چاپېریال پاک ساتل.", Color(0xFF7C3AED)),
                Class4ConceptCard("پانی کی اہمیت اور بچت", "بہتے دریا کے کنارے بھی وضو میں پانی ضائع نہ کریں", "Water is the source of all life; never leave taps open unnecessarily.", "قرآن کے مطابق ہر جاندار چیز پانی سے بنی ہے، اس لیے پانی کا ایک قطرہ بھی ضائع نہ کریں۔", "اوبه د ژوند سرچینه ده، د اودس پر مهال هم اوبه مه ضایع کوئ.", Color(0xFFD97706))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Which Caliph bought the sweet-water well 'Bir-e-Rumah' (بئرِ رومہ) and dedicated it for Muslims?", "مدینہ منورہ میں میٹھے پانی کا کنواں 'بئرِ رومہ' خرید کر کس خلیفہ نے وقف فرمایا؟", "په مدینه منوره کې د 'بئر رومه' څاه کوم خلیفه واخیسته او وقف یې کړه؟", "💧 بئرِ رومہ", listOf("Hazrat Usman Ghani RA (حضرت عثمان غنیؓ)", "Hazrat Umar RA", "Hazrat Ali RA"), 0),
                NazeraQuizQuestion("What did Prophet Muhammad ﷺ teach about using water during Wudu (وضو)?", "وضو کرتے وقت پانی کے استعمال کے بارے میں حضور ﷺ نے کیا تعلیم دی؟", "د اودس پر مهال د اوبو کارولو په اړه نبي کریم ﷺ څه لارښوونه کړې ده؟", "🚰 پانی کی بچت", listOf("Do not waste water even beside a flowing river (بہتی نہر کے کنارے بھی پانی ضائع نہ کرو)", "Use buckets of water", "Leave the tap open"), 0)
            )
        )
    )

    // 6. CLASS 4 SOCIAL STUDY (All 6 Individual Chapters, Pages 1–124)
    val socialStages = listOf(
        Class4StageData(
            id = 1,
            unitLabel = "Chapter 1",
            pageRange = "Pages 01–13",
            titleEn = "Citizenship & Human Rights",
            titleUr = "شہریت، انسانی حقوق اور امن و ہم آہنگی",
            titlePs = "تابعیت (ښاروندیتوب)، بشري حقونه او سوله",
            summaryEn = "Differentiate between Citizen, Global Citizen, and Digital/Cyber Citizen; understand Fundamental Human Rights & Civic Responsibilities; and practice Peace, Tolerance, and Conflict Resolution.",
            summaryUr = "شہری، عالمی شہری اور ڈیجیٹل/سائبر شہری میں فرق؛ بنیادی انسانی حقوق و شہری فرائض؛ اور بات چیت و رواداری کے ذریعے تنازعات کا حل۔",
            summaryPs = "ښاروند، نړیوال او ډیجیټل ښاروند، اساسي بشري حقونه او د خبرو اترو له لارې د شخړو هوارول.",
            gamePromptEn = "Match the Citizenship & Human Rights concepts from Chapter 1!",
            gamePromptUr = "باب 1 (شہریت اور انسانی حقوق) کے تصورات کو ملائیں!",
            gamePromptPs = "د لومړي څپرکي (تابعیت او بشري حقونه) مفهومونه وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("Citizen (شہری)", "Legal resident of a country with rights & duties", "A person who belongs to a state, enjoys rights, and obeys laws.", "ملک کا قانونی باشندہ جو حقوق رکھتا ہے اور ملکی قوانین کی پابندی کرتا ہے۔", "د یوه هېواد قانوني اوسېدونکی چې حقونه او دندې لري.", Color(0xFFEA580C)),
                Class4ConceptCard("Global & Digital Citizen", "Caring for the world & staying safe/polite online", "Digital citizens use the internet safely, ethically, and respectfully.", "انٹرنیٹ اور کمپیوٹر کو اخلاقی اصولوں اور احتیاط سے استعمال کرنے والا فرد ڈیجیٹل شہری ہے۔", "هغه څوک چې انټرنېټ په خوندي او اخلاقي توګه کاروي ډیجیټل ښاروند دی.", Color(0xFF2563EB)),
                Class4ConceptCard("Fundamental Human Rights", "Right to Life, Education, Health & Equality", "Every human being is born free with equal dignity and rights.", "زندگی، تعلیم، صحت اور مساوات ہر انسان کا پیدائشی بنیادی حق ہے۔", "ژوند، زده کړه، روغتیا او برابري د هر انسان اساسي حق دی.", Color(0xFF059669)),
                Class4ConceptCard("Peace & Conflict Resolution", "Dialogue, Patience, Tolerance & Respect", "Resolving disagreements peacefully by listening to each other.", "اختلافات کو لڑائی کے بجائے بات چیت، صبر اور برداشت سے حل کرنا۔", "ستونزې او اختلافات په خبرو اترو او زغم سره حل کول.", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("What do we call a person who uses the internet safely and responsibly?", "انٹرنیٹ کو محفوظ اور ذمہ دارانہ طریقے سے استعمال کرنے والے کو کیا کہتے ہیں؟", "هغه کس ته څه وایي چې انټرنېټ په خوندي او مسوولانه توګه کاروي؟", "💻 Online Safety", listOf("Digital / Cyber Citizen (ڈیجیٹل شہری)", "Tourist", "Pilot"), 0),
                NazeraQuizQuestion("How should conflicts and disagreements be resolved in a peaceful society?", "پرامن معاشرے میں اختلافات کو کیسے حل کرنا چاہیے؟", "په سوله ییزه ټولنه کې باید اختلافات څنګه حل شي؟", "🤝 Peace", listOf("Through dialogue and tolerance (بات چیت اور برداشت سے)", "By shouting", "By fighting"), 0)
            )
        ),
        Class4StageData(
            id = 2,
            unitLabel = "Chapter 2",
            pageRange = "Pages 14–29",
            titleEn = "Culture of Pakistan & Communication",
            titleUr = "پاکستان کی ثقافت، زبانیں اور ذرائع ابلاغ",
            titlePs = "د پاکستان کلتور، ژبې او د اړیکو وسیلې",
            summaryEn = "Explore the rich cultural diversity of Pakistan (Punjabi, Sindhi, Pashtun, Baloch, Gilgiti, Kashmiri traditions), National Language Urdu, religious & cultural festivals, and means of Communication (Newspaper, Radio, TV, Internet).",
            summaryUr = "پاکستان کے تمام صوبوں اور علاقوں کی ثقافت، لباس، کھانے، علاقائی زبانیں، قومی زبان اردو، تہوار اور ذرائع ابلاغ (اخبار، ریڈیو، ٹی وی، انٹرنیٹ)۔",
            summaryPs = "د پاکستان د ټولو صوبو کلتور، ملي ژبه اردو، سیمه ییزې ژبې او د اړیکو وسیلې (اخبار، راډیو، ټلویزیون، انټرنېټ).",
            gamePromptEn = "Match the Culture & Communication concepts from Chapter 2!",
            gamePromptUr = "باب 2 (پاکستان کی ثقافت اور ذرائع ابلاغ) کو درست جواب سے ملائیں!",
            gamePromptPs = "د دوهم څپرکي (کلتور او رسنۍ) مفهومونه وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("National & Regional Languages", "Urdu (National) • Pashto, Punjabi, Sindhi, Balochi, Saraiki, Hindko, Shina", "Urdu unites all provinces as our national language.", "اردو پاکستان کی قومی زبان ہے جبکہ پشتو، پنجابی، سندھی، بلوچی، ہندکو، سرائیکی اور شینا علاقائی زبانیں ہیں۔", "اردو ملي ژبه ده او پښتو، پنجابي، سندهي، بلوچي، هندکو او شینا سیمه ییزې ژبې دي.", Color(0xFF059669)),
                Class4ConceptCard("Dresses, Crafts & Cuisine", "Shalwar Kameez • Ajrak • Peshawari Chappal • Chapli Kabab & Sajji", "Shalwar Kameez is the national dress of Pakistan.", "شلوار قمیص ہمارا قومی لباس ہے؛ اجرک، پھلکاری اور کڑھائی ہماری ثقافتی پہچان ہیں۔", "شلوار قمیص زموږ ملي لباس دی.", Color(0xFFEA580C)),
                Class4ConceptCard("Festivals in Pakistan", "Eid-ul-Fitr, Eid-ul-Adha, Shandur Festival, Sibi Mela", "Religious and cultural festivals bring people together in joy.", "عید الفطر، عید الاضحیٰ کے علاوہ شندور پولو فیسٹیول اور سبی میلہ مشہور ثقافتی تہوار ہیں۔", "کوچنی اختر، لوی اختر، د شندور مېله او د سبي مېله مشهورې ورځې دي.", Color(0xFF7C3AED)),
                Class4ConceptCard("Means of Communication", "Postal Mail, Newspaper, Radio, Television, Mobile & Internet", "Mass media spreads news, education, and awareness rapidly.", "اخبار، ریڈیو، ٹیلی ویژن اور انٹرنیٹ خبروں اور تعلیم کے اہم ذرائع ابلاغ ہیں۔", "اخبار، راډیو، ټلویزیون او انټرنېټ د خبرونو او پوهې مهمې وسیلې دي.", Color(0xFF2563EB))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("What is the National Dress (قومی لباس) of Pakistan?", "پاکستان کا قومی لباس کون سا ہے؟", "د پاکستان ملي جامې (لباس) کومې دي؟", "🇵🇰 Culture", listOf("Shalwar Kameez (شلوار قمیص)", "Kimono", "Suit & Tie"), 0),
                NazeraQuizQuestion("Which of these is the fastest modern means of communication?", "ان میں سے سب سے تیز رفتار جدید ذریعۂ ابلاغ کون سا ہے؟", "په لاندې وسیلو کې تر ټولو چټکه عصري د اړیکو وسیله کومه ده؟", "🌐 Communication", listOf("Internet & Mobile Phone (انٹرنیٹ اور موبائل فون)", "Pigeon", "Smoke signal"), 0)
            )
        ),
        Class4StageData(
            id = 3,
            unitLabel = "Chapter 3",
            pageRange = "Pages 30–43",
            titleEn = "State and Government",
            titleUr = "ریاست اور حکومت (آئین، مقننہ، انتظامیہ اور عدلیہ)",
            titlePs = "ریاست او حکومت (اساسي قانون او د حکومت درې څانګې)",
            summaryEn = "Learn the 4 elements of a State (Population, Territory, Government, Sovereignty), the 1973 Constitution of Pakistan, the 3 Branches of Government (Legislature, Executive, Judiciary), and Democratic Elections.",
            summaryUr = "ریاست کے چار عناصر (آبادی، علاقہ، حکومت، خودمختاری)، 1973ء کا آئین، حکومت کے تین شعبے (مقننہ، انتظامیہ، عدلیہ)، جمہوریت، انتخابات اور سیاسی جماعتیں۔",
            summaryPs = "د ریاست څلور برخې، د ۱۹۷۳ کال اساسي قانون، د حکومت درې څانګې (مقننه، اجراییه، قضاییه) او ټاکنې.",
            gamePromptEn = "Match the Branches of Government & Constitutional facts!",
            gamePromptUr = "حکومت کے تین شعبوں اور آئین کے تصورات کو ملائیں!",
            gamePromptPs = "د حکومت درې څانګې او اساسي قانون له سم ځواب سره وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("Legislature (مقننہ / پارلیمنٹ)", "Makes laws for the country (National Assembly, Senate, Provincial Assembly)", "The law-making branch of government.", "حکومت کا وہ شعبہ جو ملک اور صوبے کے لیے قوانین بناتا ہے مقننہ کہلاتا ہے۔", "د حکومت هغه څانګه چې قوانین جوړوي مقننه (پارلمان) بلل کېږي.", Color(0xFF2563EB)),
                Class4ConceptCard("Executive (انتظامیہ)", "Implements laws (Prime Minister, Chief Minister, Cabinet & Police)", "Enforces and carries out the laws made by the Legislature.", "مقننہ کے بنائے ہوئے قوانین کو ملک میں نافذ کرنے والا شعبہ انتظامیہ ہے۔", "هغه څانګه چې قوانین عملي کوي اجراییه بلل کېږي.", Color(0xFF059669)),
                Class4ConceptCard("Judiciary (عدلیہ / عدالتیں)", "Provides justice (Supreme Court, High Courts & District Courts)", "Interprets laws and punishes law-breakers fairly.", "قوانین کے مطابق انصاف فراہم کرنے والا شعبہ عدلیہ (عدالتیں) ہے۔", "هغه څانګه چې د قانون له مخې انصاف او پرېکړه کوي قضاییه (محکمې) ده.", Color(0xFF7C3AED)),
                Class4ConceptCard("Constitution of Pakistan (1973)", "Supreme law defining citizens' rights & structure of government", "Pakistan's current Constitution was passed in 1973.", "ملک چلانے کے بنیادی قوانین کے مجموعے کو آئین (دستور) کہتے ہیں؛ پاکستان کا آئین 1973ء میں بنا۔", "اساسي قانون د دولت د چلولو تر ټولو لوړ قانون دی چې په ۱۹۷۳ کال کې تصویب شو.", Color(0xFFEA580C))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Which branch of government provides JUSTICE through courts?", "حکومت کا کون سا شعبہ عدالتوں کے ذریعے انصاف فراہم کرتا ہے؟", "د حکومت کومه څانګه د محکمو له لارې انصاف برابروي؟", "⚖️ Courts", listOf("Judiciary (عدلیہ)", "Legislature (مقننہ)", "Post Office"), 0),
                NazeraQuizQuestion("In which year was the current Constitution of Pakistan enacted?", "پاکستان کا موجودہ آئین کس سال منظور ہوا؟", "د پاکستان اوسنی اساسي قانون په کوم کال کې منظور شو؟", "📜 آئینِ پاکستان", listOf("1973 (1973ء)", "1940", "2010"), 0)
            )
        ),
        Class4StageData(
            id = 4,
            unitLabel = "Chapter 4",
            pageRange = "Pages 44–78",
            titleEn = "History: Ancient Civilizations & Pakistan Movement",
            titleUr = "تاریخ: قدیم تہذیبیں اور تحریکِ پاکستان کے ہیرو",
            titlePs = "تاریخ: لرغوني تمدنونه او د پاکستان غورځنګ اتلان",
            summaryEn = "Explore the Indus Valley Civilization (Mohenjo-daro & Harappa), Gandhara Civilization (Taxila & Takht-i-Bahi), arrival of Islam (Muhammad bin Qasim 712 AD), and the Pakistan Movement led by Sir Syed Ahmad Khan, Allama Iqbal, Quaid-e-Azam, Fatima Jinnah, and KP leaders (Sahibzada Abdul Qayyum & Abdur Rab Nishtar).",
            summaryUr = "وادیٔ سندھ کی تہذیب (موہنجوداڑو، ہڑپہ)، گندھارا تہذیب (ٹیکسلا، تخت بھائی)، محمد بن قاسم، سر سید احمد خان، علامہ اقبال، قائداعظم، فاطمہ جناح اور قیامِ پاکستان میں خیبر پختونخوا کا کردار۔",
            summaryPs = "د سیند درې او ګندهارا تمدنونه، محمد بن قاسم، سر سید احمد خان، علامه اقبال، قائداعظم او د پاکستان په جوړېدو کې د خیبر پښتونخوا ونډه.",
            gamePromptEn = "Order these historical milestones from earliest to Independence (1947)!",
            gamePromptUr = "تاریخی واقعات کو قدیم دور سے قیامِ پاکستان (1947ء) تک ترتیب سے ٹیپ کریں!",
            gamePromptPs = "تاریخي پېښې له لرغوني پېر څخه تر ۱۹۴۷ کال پورې په ترتیب ووهئ!",
            gameMode = Class4MiniGameMode.SEQUENCE_ORDER,
            sequenceItems = listOf(
                "1. Indus Valley & Gandhara Civilizations",
                "2. Arrival of Muhammad bin Qasim (712 AD)",
                "3. Lahore Resolution (23 March 1940)",
                "4. Independence of Pakistan (14 Aug 1947)"
            ),
            cards = listOf(
                Class4ConceptCard("Indus Valley & Gandhara", "Mohenjo-daro, Harappa, Taxila & Takht-i-Bahi (Mardan)", "Famous for planned brick cities, drainage systems, and Gandhara stone art.", "موہنجوداڑو، ہڑپہ اور تخت بھائی (مردان) پاکستان کی قدیم ترین تہذیبوں کے مراکز ہیں۔", "موهنجوداړو، هړپه او تخت باهي (مردان) د لرغونو تمدنونو نښې دي.", Color(0xFFD97706)),
                Class4ConceptCard("Lahore Resolution (23 March 1940)", "Minar-e-Pakistan • Demand for a separate Muslim homeland", "Passed at Minto Park Lahore on 23 March 1940.", "23 مارچ 1940ء کو لاہور میں مسلمانوں کے الگ وطن کی قرارداد منظور ہوئی۔", "د ۱۹۴۰ کال د مارچ په ۲۳مه په لاهور کې د پاکستان پرېکړه لیک منظور شو.", Color(0xFF059669)),
                Class4ConceptCard("Quaid-e-Azam, Iqbal & Fatima Jinnah", "Founders of Pakistan & Madar-e-Millat", "Allama Iqbal gave the idea in 1930; Quaid-e-Azam led the movement to victory on 14 Aug 1947.", "علامہ اقبال نے الگ وطن کا تصور پیش کیا اور قائداعظم و فاطمہ جناح کی جدوجہد سے پاکستان بنا۔", "د علامه اقبال، قائداعظم او فاطمه جناح په هڅو پاکستان ازاد شو.", Color(0xFF2563EB)),
                Class4ConceptCard("KP Role in Pakistan Movement", "Sahibzada Abdul Qayyum Khan, Sardar Abdur Rab Nishtar & 1947 Referendum", "People of KP voted for Pakistan in the historic July 1947 Referendum.", "صاحبزادہ عبدالقیوم خان اور سردار عبدالرب نشتر نے اہم کردار ادا کیا اور کے پی کے نے ریفرنڈم میں پاکستان کا ساتھ دیا۔", "د خیبر پښتونخوا ولس د ۱۹۴۷ کال په ریفرنډم کې د پاکستان ملاتړ وکړ.", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Where are the famous ancient Gandhara ruins of Takht-i-Bahi located?", "گندھارا تہذیب کے مشہور آثار 'تخت بھائی' کس ضلع میں واقع ہیں؟", "د ګندهارا تمدن مشهورې کنډوالې 'تخت باهي' په کومه ولسوالۍ کې دي؟", "🏛️ Takht-i-Bahi", listOf("Mardan, KP (مردان، خیبر پختونخوا)", "Karachi", "Quetta"), 0),
                NazeraQuizQuestion("When was the historic Lahore Resolution (قراردادِ لاہور) passed?", "تاریخی قراردادِ لاہور کب منظور ہوئی؟", "تاریخي د لاهور پرېکړه لیک کله منظور شو؟", "🇵🇰 Minar-e-Pakistan", listOf("23 March 1940 (23 مارچ 1940ء)", "14 August 1947", "6 September 1965"), 0)
            )
        ),
        Class4StageData(
            id = 5,
            unitLabel = "Chapter 5",
            pageRange = "Pages 79–113",
            titleEn = "Geography: Globe, Maps, Landforms, Weather & Population",
            titleUr = "جغرافیہ: گلوب، نقشہ، زمینی خد و خال، آب و ہوا اور آبادی",
            titlePs = "جغرافیه: ګلوب، نقشه، غرونه او هوارې، اقلیم او نفوس",
            summaryEn = "Study the Globe (7 Continents & 5 Oceans), Map elements (BOLTS: Border, Orientation/Compass, Legend, Title, Scale), Physical Regions of Pakistan, Weather vs Climate, Natural Disasters (Earthquakes, Floods), and Population & Census.",
            summaryUr = "گلوب (7 براعظم اور 5 بحر)، نقشے کے اجزاء (BOLTS)، پاکستان کے طبعی خطے (پہاڑ، سطح مرتفع، میدان، صحرا، ساحل)، موسم و آب و ہوا، قدرتی آفات اور مردم شماری۔",
            summaryPs = "ګلوب (۷ لویې وچې او ۵ سمندرونه)، د نقشې برخې (BOLTS)، د پاکستان غرونه او دښتې، طبیعي پېښې او سرشمېرنه.",
            gamePromptEn = "Match the Geography, Map & Landform concepts from Chapter 5!",
            gamePromptUr = "باب 5 (جغرافیہ، نقشے اور طبعی خطے) کو درست جواب سے ملائیں!",
            gamePromptPs = "د پنځم څپرکي (جغرافیه او نقشې) مفهومونه وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("7 Continents & 5 Oceans", "Largest Continent: Asia • Largest Ocean: Pacific Ocean", "Earth's surface is about 71% water and 29% land.", "دنیا میں 7 براعظم (ایشیا سب سے بڑا، آسٹریلیا سب سے چھوٹا) اور 5 بحر ہیں۔", "په نړۍ کې ۷ لویې وچې او ۵ سمندرونه دي.", Color(0xFF0284C7)),
                Class4ConceptCard("Elements of a Map (BOLTS)", "Border • Orientation (Compass) • Legend/Key • Title • Scale", "Cardinal directions are North, South, East, West; Inter-cardinal are NE, NW, SE, SW.", "نقشے کے پانچ اجزاء: بارڈر، سمت نما، علامات کی فہرست (Key)، عنوان اور پیمانہ۔", "د نقشې پنځه اساسي برخې: چوکاټ، قطب نما، نښې، سرلیک او پیمانه.", Color(0xFF0D9488)),
                Class4ConceptCard("Landforms & Weather vs Climate", "Weather = Daily change • Climate = 30+ years average weather", "Rain gauge measures rainfall; Anemometer measures wind speed; Barometer measures air pressure.", "روزمرہ کی تبدیلی کو موسم اور طویل عرصے کی اوسط کیفیت کو آب و ہوا (Climate) کہتے ہیں۔", "ورځني بدلون ته هوا (Weather) او اوږدمهاله حالت ته اقلیم (Climate) وایي.", Color(0xFF059669)),
                Class4ConceptCard("Census (مردم شماری) & Disasters", "Census counts population every 10 years • Flood & Earthquake safety", "Planting trees reduces floods and landslides.", "ملک کی کل آبادی گننے کے عمل کو مردم شماری (Census) کہتے ہیں۔", "د هېواد د ټولو وګړو شمېرلو ته سرشمېرنه (Census) وایي.", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Which is the largest continent in the world where Pakistan is located?", "دنیا کا سب سے بڑا براعظم کون سا ہے جس میں پاکستان واقع ہے؟", "د نړۍ تر ټولو لویه وچه کومه ده چې پاکستان پکې پروت دی؟", "🌏 Largest Continent", listOf("Asia (ایشیا)", "Europe", "Australia"), 0),
                NazeraQuizQuestion("What is the official counting of a country's population called?", "کسی ملک کی کل آبادی گننے کے سرکاری عمل کو کیا کہتے ہیں؟", "د یوه هېواد د نفوسو رسمي شمېرنې ته څه وایي؟", "👨‍👩‍👧‍👦 Population", listOf("Census (مردم شماری / سرشمېرنه)", "picnic", "Traffic"), 0)
            )
        ),
        Class4StageData(
            id = 6,
            unitLabel = "Chapter 6",
            pageRange = "Pages 114–124",
            titleEn = "Economics: Goods, Services, Trade, Banking & Entrepreneurship",
            titleUr = "معاشیات: اشیاء و خدمات، تجارت، بینک اور کاروباری صلاحیت",
            titlePs = "اقتصاد: توکي او چوپړتیاوې، سوداګري، بانک او کاروبار",
            summaryEn = "Understand Economic Choices, Opportunity Cost, Goods vs Services, Producers vs Consumers, Trade (Imports & Exports), Scarcity, Entrepreneurship, and the role of Banks in saving money.",
            summaryUr = "معاشی انتخاب، اشیاء اور خدمات میں فرق، پیدا کار اور صارفین، درآمدات و برآمدات (Imports & Exports)، کاروبار (Entrepreneurship) اور بینکوں کا کردار۔",
            summaryPs = "په اقتصاد کې توکي او خدمات، تولیدوونکي او لګوونکي، صادرات او واردات، کاروبار او د بانکونو رول.",
            gamePromptEn = "Match the Economics terms from Chapter 6!",
            gamePromptUr = "باب 6 (معاشیات، تجارت اور بینک) کے تصورات کو ملائیں!",
            gamePromptPs = "د شپږم څپرکي (اقتصاد، سوداګري او بانک) اصطلاحات وصل کړئ!",
            cards = listOf(
                Class4ConceptCard("Goods vs Services", "Goods = Physical items (Books, Bread) • Services = Work done (Teaching, Doctor)", "Goods can be touched; Services are helpful actions performed by skilled people.", "اشیاء وہ چیزیں ہیں جنہیں ہم چھو سکتے ہیں (کتاب، پھل)؛ خدمات وہ کام ہیں جو دوسرے ہمارے لیے کرتے ہیں (علاج، تعلیم)۔", "توکي لیدل کېږي (لکه کتاب، ډوډۍ) او خدمات د نورو کار دی (لکه تدریس، درملنه).", Color(0xFFEA580C)),
                Class4ConceptCard("Producers & Consumers", "Producer makes/grows goods • Consumer buys and uses them", "Farmers and factories are producers; buyers are consumers.", "اشیاء بنانے یا اگانے والے کو پیدا کار (Producer) اور استعمال کرنے والے کو صارف (Consumer) کہتے ہیں۔", "تولیدوونکی توکي جوړوي او مصرفوونکی (Consumer) یې کاروي.", Color(0xFF059669)),
                Class4ConceptCard("Trade: Exports & Imports", "Exports = Sold to other countries • Imports = Bought from other countries", "Pakistan exports textiles, rice, and sports goods.", "اپنے ملک کا مال دوسرے ملک بیچنا برآمدات (Exports) اور باہر سے منگوانا درآمدات (Imports) کہلاتا ہے۔", "بهر ته مال لېږل صادرات (Exports) او له بهره راوړل واردات (Imports) دي.", Color(0xFF2563EB)),
                Class4ConceptCard("Entrepreneurship & Banks", "Entrepreneur starts a business • Banks keep savings safe & give loans", "Saving money in a bank helps both individuals and the national economy.", "نیا کاروبار شروع کرنے والے کو Entrepreneur کہتے ہیں؛ بینک لوگوں کی بچت محفوظ رکھتے ہیں۔", "بانک د خلکو پیسې خوندي ساتي او د کاروبار لپاره پورونه ورکوي.", Color(0xFF7C3AED))
            ),
            quizzes = listOf(
                NazeraQuizQuestion("Selling Pakistani rice and footballs to other countries is called what?", "پاکستان کے چاول اور فٹ بال دوسرے ممالک کو فروخت کرنا کیا کہلاتا ہے؟", "پر نورو هېوادونو د پاکستان وریجې او فوټبالونه پلورل څه بلل کېږي؟", "🚢 Trade", listOf("Exports (برآمدات / صادرات)", "Imports (درآمدات)", "Barter"), 0),
                NazeraQuizQuestion("Which institution keeps people's money safe and provides loans for business?", "کون سا ادارہ لوگوں کی رقم محفوظ رکھتا ہے اور کاروبار کے لیے قرض دیتا ہے؟", "کومه اداره د خلکو پیسې خوندي ساتي او د کاروبار لپاره پور ورکوي؟", "🏦 Money & Savings", listOf("Bank (بینک)", "Playground", "Museum"), 0)
            )
        )
    )
}
