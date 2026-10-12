package com.example.spacebookapp.data

import androidx.compose.ui.graphics.Color

object Class6SocialIslamiatData {

    // =========================================================================
    // 5. GEOGRAPHY CLASS 6 (All 6 Units — Pages 1–96)
    // =========================================================================
    val geographyStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Unit 1: Structure of Earth & Types of Rocks",
            titleUr = "یونٹ 1: زمین کی ساخت اور چٹانوں کی اقسام",
            titlePs = "یونټ 1: د ځمکې جوړښت او د تیږو ډولونه",
            subtitleEn = "Pages 1–18 • Crust, Mantle, Core, Tectonic Plates & Igneous, Sedimentary, Metamorphic Rocks",
            badgeEmoji = "🌍",
            color = Color(0xFF26A69A),
            lessons = listOf(
                Class4LessonItem("🌍", "Internal Layers of the Earth", "زمین کی اندرونی تہیں", "د ځمکې داخلي طبقې", "Earth has three main layers: Crust (outermost thin layer), Mantle (thick hot middle layer), and Core (outer liquid & inner solid iron-nickel core).", "زمین کی تین بڑی تہیں ہیں: قشرِ ارض (Crust)، مینٹل (Mantle) اور مرکزہ (Core)۔", "ځمکه درې طبقې لري: قشر (Crust)، مینټل (Mantle) او هسته (Core)."),
                Class4LessonItem("🌋", "Igneous & Sedimentary Rocks", "آتشی اور تہہ دار چٹانیں", "اورینې او رسوبي تیږې", "Igneous rocks (Granite, Basalt) form from cooled magma/lava. Sedimentary rocks (Limestone, Sandstone, Coal) form in layers of sediments.", "میگما یا لاوا کے ٹھنڈا ہونے سے آتشی چٹانیں (گرینائٹ) اور تہوں کے جمنے سے تہہ دار چٹانیں (چونے کا پتھر) بنتی ہیں۔", "له مګما څخه اورینې تیږې او له طبقو څخه رسوبي تیږې جوړیږي."),
                Class4LessonItem("💎", "Metamorphic Rocks & Rock Cycle", "متغیرہ چٹانیں اور چٹانی چکر", "متحوله تیږې او د تیږو څرخ", "Extreme heat and pressure change limestone into Marble and shale into Slate.", "شدید گرمی اور دباؤ سے چونے کا پتھر سنگِ مرمر (Marble) میں تبدیل ہو جاتا ہے۔", "لوړه تودوخه او فشار د چونې ډبره په مرمر (Marble) بدلوي.")
            ),
            exercises = listOf(
                Class4Exercise("Which is the outermost and thinnest layer of the Earth?", "زمین کی سب سے بیرونی اور پتلی تہہ کون سی ہے؟", "د ځمکې ترټولو بهرنۍ او نرۍ طبقه کومه ده؟", listOf("Crust", "Inner Core", "Outer Core", "Mantle"), 0, "The Crust is the outermost layer of the Earth.", "قشرِ ارض (Crust) زمین کی سب سے بیرونی تہہ ہے۔"),
                Class4Exercise("Granite and Basalt are examples of which type of rocks?", "گرینائٹ اور بسالٹ کس قسم کی چٹانوں کی مثالیں ہیں؟", "ګرانایټ او باسالټ د کوم ډول تیږو بیلګې دي؟", listOf("Igneous rocks", "Sedimentary rocks", "Metamorphic rocks", "Fossils"), 0, "Granite and Basalt form from cooled magma/lava (Igneous rocks).", "گرینائٹ اور بسالٹ آتشی چٹانیں (Igneous rocks) ہیں۔"),
                Class4Exercise("Marble is a metamorphic rock formed from:", "سنگِ مرمر (Marble) کس چٹان کے تغیر سے بنتا ہے؟", "د مرمر ډبره له کومې تیږې څخه جوړیږي؟", listOf("Limestone", "Coal", "Granite", "Sand"), 0, "Heat and pressure transform Limestone into Marble.", "چونے کا پتھر (Limestone) شدید دباؤ اور حرارت سے سنگِ مرمر بن جاتا ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Unit 2: Mountains, Plateaus and Valleys",
            titleUr = "یونٹ 2: پہاڑ، سطح مرتفع اور وادیاں",
            titlePs = "یونټ 2: غرونه، لوړې سطحې او درې",
            subtitleEn = "Pages 19–34 • Fold, Block & Volcanic Mountains, Potwar/Balochistan Plateaus & Valleys",
            badgeEmoji = "🏔️",
            color = Color(0xFF00897B),
            lessons = listOf(
                Class4LessonItem("🏔️", "Types of Mountains", "پہاڑوں کی اقسام", "د غرونو ډولونه", "Fold mountains (Himalayas, Karakoram), Block mountains (Salt Range), and Volcanic mountains (Mount Fuji, Chaghi).", "ملفوف پہاڑ (ہمالیہ، قراقرم)، بلاک پہاڑ (کوہِ نمک) اور آتش فشانی پہاڑ۔", "قات شوي غرونه (همالیه، قراقرم)، بلاک غرونه او اورغورځوونکي غرونه."),
                Class4LessonItem("🏜️", "Plateaus of Pakistan", "پاکستان کی سطح مرتفع", "د پاکستان لوړې سطحې", "A plateau is an elevated flat-topped tableland. Pakistan has the Potwar Plateau and the Balochistan Plateau.", "سطح مرتفع بلندی پر واقع ہموار زمین کو کہتے ہیں جیسے سطح مرتفع پوٹھوہار اور بلوچستان۔", "لوړې هوارې ځمکې ته سطح مرتفع وایي لکه پوټوهار او بلوچستان."),
                Class4LessonItem("🏞️", "V-Shaped, U-Shaped & Rift Valleys", "وادیاں اور ان کی اقسام", "درې او د هغوی ډولونه", "Rivers carve V-shaped valleys (Swat, Kaghan), glaciers carve U-shaped valleys (Hunza), and faulting creates Rift valleys.", "دریا V شکل کی وادیاں (سوات، کاغان) اور گلیشیئر U شکل کی وادیاں بناتے ہیں۔", "سیندونه V بڼه درې او کنګلونه U بڼه درې جوړوي.")
            ),
            exercises = listOf(
                Class4Exercise("The Himalayas and Karakoram mountains are examples of:", "ہمالیہ اور قراقرم کے پہاڑی سلسلے کس قسم کے پہاڑ ہیں؟", "د همالیې او قراقرم غرونه د کوم ډول غرونو بیلګې دي؟", listOf("Young Fold Mountains", "Volcanic Mountains", "Plains", "Deserts"), 0, "The Himalayas and Karakoram are young fold mountains.", "ہمالیہ اور قراقرم ملفوف پہاڑ (Fold Mountains) ہیں۔"),
                Class4Exercise("Which two major plateaus are located in Pakistan?", "پاکستان میں کون سی دو بڑی سطح مرتفع واقع ہیں؟", "په پاکستان کې کومې دوه لویې لوړې سطحې (Plateaus) شتون لري؟", listOf("Potwar and Balochistan Plateaus", "Deccan and Tibetan", "Anatolian and Iranian", "Colorado and Kimberley"), 0, "Potwar Plateau and Balochistan Plateau are the two main plateaus of Pakistan.", "پاکستان میں سطح مرتفع پوٹھوہار اور سطح مرتفع بلوچستان واقع ہیں۔"),
                Class4Exercise("U-shaped valleys are carved mainly by:", "U شکل کی وادیاں کس کے کٹاؤ سے وجود میں آتی ہیں؟", "د U بڼې درې د څه شي له امله جوړیږي؟", listOf("Glaciers", "Wind", "Sandstorms", "Volcanoes"), 0, "Slow-moving glaciers carve wide U-shaped valleys.", "گلیشیئر کے کھسکنے سے U شکل کی وادیاں بنتی ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Unit 3: Climatic Regions of the World",
            titleUr = "یونٹ 3: دنیا کے آب و ہوا کے خطے",
            titlePs = "یونټ 3: د نړۍ اقلیمي سیمې",
            subtitleEn = "Pages 35–52 • Weather vs Climate, Tropical, Temperate, Polar & Monsoon Climates",
            badgeEmoji = "🌦️",
            color = Color(0xFF00B0FF),
            lessons = listOf(
                Class4LessonItem("🌡️", "Weather vs Climate & Latitude Zones", "موسم اور آب و ہوا میں فرق", "د هوا او اقلیم توپیر", "Weather is short-term atmospheric condition; Climate is the average weather over 30+ years.", "روزمرہ کی تبدیلی کو موسم اور ۳۰ سال سے زائد کی اوسط کیفیت کو آب و ہوا (Climate) کہتے ہیں۔", "ورځني حالت ته هوا او د ۳۰ کلونو منځني حالت ته اقلیم وایي."),
                Class4LessonItem("☀️", "Tropical, Arid & Monsoon Regions", "حاری، صحرائی اور مونسون خطے", "حاري، صحرایي او مونسون سیمې", "Equatorial regions are hot and wet all year; Deserts are hot and dry; Pakistan experiences a Sub-Tropical Monsoon climate.", "پاکستان کی آب و ہوا نیم حاری مونسونی ہے جہاں گرمیوں میں مونسون بارشیں ہوتی ہیں۔", "د پاکستان اقلیم نیم حاري مونسوني دی."),
                Class4LessonItem("❄️", "Temperate & Polar Regions", "معتدل اور قطبی خطے", "معتدلې او قطبي سیمې", "Polar regions (Arctic & Antarctica) lie beyond 66.5° latitude and remain freezing cold throughout the year.", "قطبی خطے سال بھر برف سے ڈھکے اور انتہائی سرد رہتے ہیں۔", "قطبي سیمې ټول کال یخې او په واورو پټې وي.")
            ),
            exercises = listOf(
                Class4Exercise("The average weather conditions of a place recorded over 30 years or more is called:", "کسی جگہ کے ۳۰ سال یا اس سے زیادہ عرصے کے اوسط موسمی حالات کو کیا کہتے ہیں؟", "د یو ځای د ۳۰ کلونو منځني موسمي حالت ته څه ویل کیږي؟", listOf("Climate", "Daily Weather", "Breeze", "Tide"), 0, "Climate is the long-term (30+ years) average weather pattern.", "طویل عرصے کے اوسط موسم کو آب و ہوا (Climate) کہتے ہیں۔"),
                Class4Exercise("Which climatic zone receives direct rays of the Sun throughout the year?", "کون سا خطہ سال بھر سورج کی سیدھی شعاعیں حاصل کرتا ہے؟", "کومه سیمه ټول کال د لمر مستقیم وړانګې اخلي؟", listOf("Tropical / Equatorial Zone", "Polar Zone", "Tundra Zone", "Arctic Circle"), 0, "The Tropical/Equatorial zone near the Equator receives direct sunlight.", "خطِ استوا کے قریب حاری خطے پر سورج کی کرنیں سیدھی پڑتی ہیں۔"),
                Class4Exercise("In which season does Pakistan receive most of its rainfall?", "پاکستان میں سب سے زیادہ بارش کس موسم میں ہوتی ہے؟", "په پاکستان کې ترټولو زیات باران په کوم موسم کې اوري؟", listOf("Summer Monsoon season (July–September)", "Autumn", "Dry May", "October"), 0, "Pakistan receives its heaviest rainfall during the Summer Monsoon season.", "پاکستان میں سب سے زیادہ بارش موسمِ گرما کی مونسون ہواؤں سے ہوتی ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Unit 4: Forests of the World",
            titleUr = "یونٹ 4: دنیا کے جنگلات",
            titlePs = "یونټ 4: د نړۍ ځنګلونه",
            subtitleEn = "Pages 53–66 • Rainforests, Coniferous, Deciduous, Mangrove Forests & Reforestation",
            badgeEmoji = "🌲",
            color = Color(0xFF00C853),
            lessons = listOf(
                Class4LessonItem("🌴", "Tropical Rainforests (Amazon)", "حاری بارانی جنگلات (ایمازون)", "حاري باراني ځنګلونه", "Equatorial rainforests like the Amazon are called the 'Lungs of the Earth' because they produce vast amounts of oxygen.", "ایمازون کے بارانی جنگلات کو آکسیجن پیدا کرنے کی وجہ سے 'زمین کے پھیپھڑے' کہا جاتا ہے۔", "د امازون ځنګلونو ته د ځمکې سږي ویل کیږي."),
                Class4LessonItem("🌲", "Coniferous, Alpine & Mangrove Forests in Pakistan", "پاکستان کے مخروطی اور تمر (Mangrove) کے جنگلات", "په پاکستان کې مخروطي او منګروو ځنګلونه", "Coniferous forests (Deodar, Pine) grow in KP & northern mountains, while Mangrove forests grow in the Indus Delta coast of Sindh/Balochistan.", "خیبر پختونخوا کے پہاڑوں میں دیودار و چیڑ کے مخروطی جنگلات اور ساحلِ سمندر پر مینگروو کے جنگلات پائے جاتے ہیں۔", "په شمالي غرونو کې د نښتر او دیودار ځنګلونه او په ساحل کې منګروو ځنګلونه دي."),
                Class4LessonItem("🌱", "Importance of Forests & Afforestation", "جنگلات کی اہمیت اور شجرکاری", "د ځنګلونو اهمیت او نیالګي کېنول", "Forests prevent floods and soil erosion, provide timber and oxygen, and combat climate change.", "جنگلات سیلاب اور زمینی کٹاؤ کو روکتے ہیں اور ماحول کو صاف رکھتے ہیں۔", "ځنګلونه د سیلاب او خاورې تخریب مخه نیسي.")
            ),
            exercises = listOf(
                Class4Exercise("Which national tree of Pakistan grows in the Coniferous forests of the northern mountains?", "پاکستان کا قومی درخت کون سا ہے جو شمالی پہاڑی جنگلات میں پایا جاتا ہے؟", "د پاکستان ملي ونه کومه ده چې په شمالي غرونو کې شنه کیږي؟", listOf("Deodar (Cedrus deodara)", "Cactus", "Palm", "Bamboo"), 0, "Deodar is the national tree of Pakistan found in northern coniferous forests.", "دیودار پاکستان کا قومی درخت ہے۔"),
                Class4Exercise("Where are Mangrove (Tamar) forests found in Pakistan?", "پاکستان میں تمر (Mangrove) کے جنگلات کہاں پائے جاتے ہیں؟", "په پاکستان کې د منګروو (تمر) ځنګلونه چیرته موندل کیږي؟", listOf("Coastal areas of Indus Delta (Sindh & Balochistan)", "Karakoram peaks", "Potwar Plateau", "Peshawar Valley"), 0, "Mangroves grow in salty coastal waters of the Indus Delta and Balochistan coast.", "تمر کے جنگلات دریائے سندھ کے ڈیلٹا اور ساحلی علاقوں میں پائے جاتے ہیں۔"),
                Class4Exercise("Cutting down forests on a large scale is called:", "بڑے پیمانے پر جنگلات کی کٹائی کو کیا کہتے ہیں؟", "په لویه کچه د ځنګلونو وهلو ته څه ویل کیږي؟", listOf("Deforestation", "Afforestation", "Reforestation", "Irrigation"), 0, "Clearing forests is called Deforestation.", "جنگلات کے بے دریغ کٹاؤ کو Deforestation کہتے ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Unit 5: Natural Disasters",
            titleUr = "یونٹ 5: قدرتی آفات",
            titlePs = "یونټ 5: طبیعي پیښې او آفتونه",
            subtitleEn = "Pages 67–80 • Earthquakes, Floods, Volcanoes, Cyclones, Droughts & Disaster Management",
            badgeEmoji = "🌋",
            color = Color(0xFFFF5252),
            lessons = listOf(
                Class4LessonItem("📉", "Earthquakes: Focus, Epicentre & Seismograph", "زلزلہ، مرکز اور ریکٹر اسکیل", "زلزله، مرکز او سیسموګراف", "Sudden shaking of Earth's crust due to tectonic plate movement is measured by a Seismograph on the Richter Scale.", "زیرِ زمین پلیٹوں کی حرکت سے زلزلہ آتا ہے جس کی پیمائش سیسموگراف اور ریکٹر اسکیل سے کی جاتی ہے۔", "د زلزلې شدت په سیسموګراف او ریکټر سکیل اندازه کیږي."),
                Class4LessonItem("🌊", "Floods, Cyclones, Tsunamis & Droughts", "سیلاب، طوفان، سونامی اور خشک سالی", "سیلابونه، توپانونه، سونامي او وچکالي", "Heavy monsoon rains and glacier melting cause floods; underwater earthquakes trigger giant Tsunami waves.", "شدید بارشوں اور گلیشیئر پگھلنے سے سیلاب آتا ہے جبکہ سمندری زلزلے سے سونامی پیدا ہوتا ہے۔", "په سمندر کې زلزله سونامي رامنځته کوي."),
                Class4LessonItem("🛟", "Disaster Management (NDMA / PDMA)", "آفات سے نمٹنے کی تدابیر", "د طبیعي پیښو مدیریت", "During an earthquake: Drop, Cover, and Hold On! Early warning systems and planting trees reduce flood damage.", "زلزلے کے دوران میز کے نیچے پناہ لیں اور کھلی جگہ پر نکل جائیں۔", "د زلزلې پر مهال خوندي ځای کې پناه واخلئ.")
            ),
            exercises = listOf(
                Class4Exercise("Which instrument is used to record earthquake waves?", "زلزلے کی لہروں کو ریکارڈ کرنے والا آلہ کون سا ہے؟", "د زلزلې څپې په کومه اله ثبتیږي؟", listOf("Seismograph", "Thermometer", "Barometer", "Anemometer"), 0, "A Seismograph records seismic waves during an earthquake.", "زلزلہ پیما آلے کو سیسموگراف (Seismograph) کہتے ہیں۔"),
                Class4Exercise("Giant sea waves caused by an underwater earthquake or volcanic eruption are called:", "سمندر کی تہہ میں زلزلے سے پیدا ہونے والی دیوہیکل لہروں کو کیا کہتے ہیں؟", "په سمندر کې د زلزلې له امله راپورته کیدونکې لویې څپې څه بلل کیږي؟", listOf("Tsunami", "Breeze", "Drizzle", "Dew"), 0, "Underwater earthquakes generate Tsunami waves.", "سمندری زلزلے سے اٹھنے والی بڑی لہروں کو سونامی (Tsunami) کہتے ہیں۔"),
                Class4Exercise("What is the point on the Earth's surface directly above the earthquake focus called?", "زلزلے کے زیرِ زمین مرکز (Focus) کے عین اوپر سطحِ زمین کے مقام کو کیا کہتے ہیں؟", "د زلزلې د داخلي مرکز (Focus) په سر د ځمکې پر مخ نقطې ته څه ویل کیږي؟", listOf("Epicentre", "Crater", "Delta", "Plateau"), 0, "The point directly above the focus on the surface is the Epicentre.", "اس مقام کو ایپی سینٹر (Epicentre) کہتے ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 6,
            titleEn = "Unit 6: Changing Earth & Human Activities",
            titleUr = "یونٹ 6: بدلتی زمین اور انسانی سرگرمیاں",
            titlePs = "یونټ 6: بدلیدونکې ځمکه او انساني فعالیتونه",
            subtitleEn = "Pages 81–96 • Weathering, Erosion, Greenhouse Effect, Global Warming & 3Rs",
            badgeEmoji = "♻️",
            color = Color(0xFF00E676),
            lessons = listOf(
                Class4LessonItem("🪨", "Weathering and Erosion", "فرسودگی (Weathering) اور کٹاؤ (Erosion)", "تخریب او سولیدنه", "Weathering breaks down rocks in place; Erosion transports rock and soil particles by water, wind, or ice.", "چٹانوں کا اپنی جگہ ٹوٹ پھوٹ کا شکار ہونا فرسودگی اور پانی یا ہوا سے بہہ جانا کٹاؤ کہلاتا ہے۔", "د تیږو ماتیدل فرسودګي او د اوبو یا باد په وسیله لیږدول تخریب بلل کیږي."),
                Class4LessonItem("🌡️", "Greenhouse Effect & Global Warming", "گرین ہاؤس اثر اور گلوبل وارمنگ", "ګرین هاوس اغیزه او نړیواله تودوخه", "Burning fossil fuels releases CO₂ which traps heat in the atmosphere, melting glaciers and raising sea levels.", "ایندھن جلانے سے کاربن ڈائی آکسائیڈ بڑھتی ہے جس سے زمین کا درجہ حرارت بڑھ رہا ہے (گلوبل وارمنگ)۔", "د کاربن ډای اکسایډ زیاتوالی د ځمکې تودوخه لوړوي."),
                Class4LessonItem("♻️", "3Rs: Reduce, Reuse, Recycle", "ماحول کا تحفظ: کم استعمال، دوبارہ استعمال اور ری سائیکلنگ", "د چاپیریال ساتنه: 3Rs", "Reduce waste, Reuse items, and Recycle paper, plastic, glass, and metal to protect our planet.", "کچرا کم کرنا (Reduce)، چیزیں دوبارہ برتنا (Reuse) اور ری سائیکل کرنا زمین کو آلودگی سے بچاتا ہے۔", "د کثافاتو کمول او بیا کارول چاپیریال ساتي.")
            ),
            exercises = listOf(
                Class4Exercise("The wearing away and transport of soil and rock particles by wind, water, or ice is called:", "ہوا، پانی یا برف کے ذریعے مٹی اور چٹانی ذرات کا بہہ کر دوسری جگہ منتقل ہونا کیا کہلاتا ہے؟", "د باد یا اوبو په وسیله د خاورې او تیږو لیږدولو ته څه ویل کیږي؟", listOf("Erosion", "Condensation", "Photosynthesis", "Sublimation"), 0, "Erosion is the removal and transport of weathered material.", "اس عمل کو کٹاؤ (Erosion) کہتے ہیں۔"),
                Class4Exercise("Which gas is the main contributor to the Greenhouse Effect and Global Warming?", "گرین ہاؤس اثر اور گلوبل وارمنگ کا باعث بننے والی سب سے اہم گیس کون سی ہے؟", "کوم ګاز د نړیوالې تودوخې (Global Warming) اصلي لامل دی؟", listOf("Carbon dioxide (CO₂)", "Oxygen", "Nitrogen", "Helium"), 0, "Excess Carbon dioxide (CO₂) from burning fossil fuels traps heat.", "کاربن ڈائی آکسائیڈ (CO₂) حرارت کو قید کر کے گلوبل وارمنگ پیدا کرتی ہے۔"),
                Class4Exercise("What do the '3Rs' of environmental protection stand for?", "ماحولیاتی تحفظ میں '3Rs' سے کیا مراد ہے؟", "په چاپیریال ساتنه کې له '3Rs' څخه څه مراد دی؟", listOf("Reduce, Reuse, Recycle", "Read, Run, Rest", "Rain, River, Rock", "Red, Rose, Ring"), 0, "Reduce, Reuse, and Recycle help conserve resources and reduce pollution.", "Reduce, Reuse اور Recycle۔")
            )
        )
    )

    // =========================================================================
    // 6. HISTORY CLASS 6 (All 5 Units — Pages 1–90)
    // =========================================================================
    val historyStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Unit 1: Mesopotamia & Egyptian Civilizations",
            titleUr = "یونٹ 1: قدیم تہذیبیں — میسوپوٹیمیا اور مصر",
            titlePs = "یونټ 1: لرغوني تمدنونه — بین النهرین او مصر",
            subtitleEn = "Pages 1–22 • Sumerians, Cuneiform, Hammurabi's Code, Nile River, Pyramids & Hieroglyphics",
            badgeEmoji = "🏺",
            color = Color(0xFFD4AC0D),
            lessons = listOf(
                Class4LessonItem("🏺", "Mesopotamian Civilization (Tigris & Euphrates)", "وادیِ دجلہ و فرات (میسوپوٹیمیا) کی تہذیب", "د دجلې او فرات (بین النهرین) تمدن", "Mesopotamia ('land between two rivers' Tigris & Euphrates in modern Iraq) invented the wheel, Cuneiform script, Ziggurats, and Hammurabi's Code of Law.", "دریائے دجلہ و فرات کے درمیان آباد تہذیب نے پہیہ، میخی رسم الخط (Cuneiform) اور حمورابی کے قوانین دیے۔", "د دجلې او فرات ترمنځ تمدن څرخ، میخي لیک او د حمورابي قوانین رامنځته کړل."),
                Class4LessonItem("🔺", "Ancient Egypt: Gift of the Nile", "قدیم مصر کی تہذیب (دریائے نیل کا تحفہ)", "د لرغوني مصر تمدن", "Egyptian civilization flourished along the River Nile. Kings were called Pharaohs, who built giant Pyramids and the Sphinx.", "مصری تہذیب دریائے نیل کے کنارے پروان چڑھی۔ یہاں کے بادشاہ فرعون کہلاتے تھے جنہوں نے اہرامِ مصر بنائے۔", "مصري تمدن د نیل سیند پر غاړه وده وکړه او اهرامونه یې جوړ کړل."),
                Class4LessonItem("📜", "Hieroglyphics, Papyrus & Mummification", "ہیروگلیفکس رسم الخط اور کاغذ (پپائرس)", "هیروګلیفیک لیک او پپایرس", "Egyptians wrote in Hieroglyphics on Papyrus reeds, developed a 365-day solar calendar, and preserved bodies as Mummies.", "مصریوں نے پپائرس کے پتوں سے کاغذ بنایا، تصویری رسم الخط (Hieroglyphics) ایجاد کیا اور ۳۶۵ دن کا کیلنڈر بنایا۔", "مصریانو پر پپایرس تصویري لیک لیکه او د ۳۶۵ ورځو کلیزه یې جوړه کړه.")
            ),
            exercises = listOf(
                Class4Exercise("Mesopotamian civilization developed between which two rivers?", "میسوپوٹیمیا کی تہذیب کن دو دریاؤں کے درمیان پروان چڑھی؟", "د بین النهرین تمدن د کومو دوو سیندونو ترمنځ وده وکړه؟", listOf("Tigris and Euphrates (دجلہ و فرات)", "Nile and Amazon", "Indus and Ganges", "Yellow and Yangtze"), 0, "Mesopotamia means the land between the Tigris and Euphrates rivers.", "میسوپوٹیمیا دریائے دجلہ اور دریائے فرات کے درمیان آباد تھی۔"),
                Class4Exercise("Who compiled one of the world's oldest written codes of law in Babylon?", "بابل میں دنیا کا قدیم ترین تحریری مجموعہ قوانین کس بادشاہ نے مرتب کیا؟", "په بابل کې د نړۍ ترټولو لرغونی لیکل شوی قانون چا ترتیب کړ؟", listOf("King Hammurabi", "Tutankhamun", "Julius Caesar", "Ashoka"), 0, "King Hammurabi of Babylon created Hammurabi's Code.", "بابل کے بادشاہ حمورابی نے قوانین کا مجموعہ مرتب کیا۔"),
                Class4Exercise("Which civilization is famous for Pharaohs, Pyramids, and the River Nile?", "فراعنہ، اہرامِ مصر اور دریائے نیل کس قدیم تہذیب کی پہچان ہیں؟", "فرعونان، اهرامونه او د نیل سیند د کوم تمدن نښې دي؟", listOf("Egyptian Civilization", "Chinese Civilization", "Roman Civilization", "Greek Civilization"), 0, "Ancient Egypt flourished along the River Nile and built the Pyramids.", "یہ قدیم مصری تہذیب کی پہچان ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Unit 2: Indus Valley & Chinese Civilizations",
            titleUr = "یونٹ 2: وادیِ سندھ اور چینی تہذیب",
            titlePs = "یونټ 2: د اباسین درې او چینایي تمدن",
            subtitleEn = "Pages 23–36 • Mehrgarh, Mohenjo-Daro, Harappa, Yellow River, Silk, Paper & Great Wall",
            badgeEmoji = "🧱",
            color = Color(0xFFB7950B),
            lessons = listOf(
                Class4LessonItem("🧱", "Indus Valley: Mehrgarh, Harappa & Mohenjo-Daro", "وادیِ سندھ کی تہذیب: مہرگڑھ، ہڑپہ اور موہنجوداڑو", "د اباسین درې تمدن: موهنجوداړو او هړپه", "The Indus Valley Civilization had planned grid cities, covered drainage systems, the Great Bath, granaries, and trade seals.", "وادیِ سندھ کے شہر موہنجوداڑو اور ہڑپہ بہترین شہری منصوبہ بندی اور ڈھکی ہوئی نالیوں کے نظام کے لیے مشہور تھے۔", "موهنجوداړو او هړپه د ښاري پلان او پټو ویالو د سیستم لپاره مشهور وو."),
                Class4LessonItem("🐉", "Ancient Chinese Civilization (Hwang Ho / Yellow River)", "قدیم چینی تہذیب (دریائے زرد)", "لرغونی چینایي تمدن", "Chinese civilization started in the Yellow River (Hwang Ho) valley under the Shang, Zhou, Qin, and Han dynasties.", "چینی تہذیب دریائے ہوانگ ہو (دریائے زرد) کی وادی میں پروان چڑھی۔", "چینایي تمدن د ژیړ سیند (Hwang Ho) په دره کې وده وکړه."),
                Class4LessonItem("🧭", "Chinese Inventions & The Great Wall", "دیوارِ چین اور چینی ایجادات", "د چین لوی دیوال او اختراعات", "Ancient China gave the world paper, printing, silk, the magnetic compass, seismograph, and the Great Wall of China.", "قدیم چین نے کاغذ، ریشم، چھپائی، قطب نما ایجاد کیا اور عظیم دیوارِ چین تعمیر کی۔", "لرغوني چین کاغذ، ورېښم، قطب نما او د چین لوی دیوال جوړ کړ.")
            ),
            exercises = listOf(
                Class4Exercise("Which Neolithic site in Balochistan (c. 7000 BCE) is a precursor to the Indus Valley Civilization?", "بلوچستان میں واقع کون سا قدیم مقام (7000 قبل مسیح) وادیِ سندھ کی تہذیب کا پیش خیمہ تھا؟", "په بلوچستان کې کوم لرغونی ځای د اباسین تمدن پیل ګڼل کیږي؟", listOf("Mehrgarh", "Taxila", "Lahore", "Thatta"), 0, "Mehrgarh in Balochistan is one of the earliest farming settlements in South Asia.", "بلوچستان میں مہرگڑھ قدیم ترین زرعی بستی تھی۔"),
                Class4Exercise("What was the most remarkable feature of Mohenjo-Daro and Harappa?", "موہنجوداڑو اور ہڑپہ کے شہروں کی سب سے نمایاں خصوصیت کیا تھی؟", "د موهنجوداړو او هړپې ترټولو ځانګړې نښه څه وه؟", listOf("Planned grid streets and covered underground drainage system", "Pyramids", "Colosseum", "Great Wall"), 0, "Indus cities had advanced town planning and covered brick drains.", "شہری منصوبہ بندی، پختہ اینٹیں اور ڈھکی ہوئی نالیوں کا نظام۔"),
                Class4Exercise("Which ancient civilization invented paper, silk, and the magnetic compass?", "کاغذ، ریشم اور قطب نما کس قدیم تہذیب کی ایجادات ہیں؟", "کاغذ، ورېښم او قطب نما کوم لرغوني تمدن اختراع کړل؟", listOf("Chinese Civilization", "Greek Civilization", "Roman Civilization", "Persian Civilization"), 0, "Ancient China invented paper, silk, printing, and the compass.", "یہ تمام ایجادات قدیم چینی تہذیب کی ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Unit 3: Persians, Greeks and Romans",
            titleUr = "یونٹ 3: فارسی، یونانی اور رومی تہذیبیں",
            titlePs = "یونټ 3: فارسي، یوناني او رومي تمدنونه",
            subtitleEn = "Pages 37–52 • Cyrus the Great, Royal Road, Athens Democracy, Alexander & Roman Republic",
            badgeEmoji = "🏛️",
            color = Color(0xFF00E5FF),
            lessons = listOf(
                Class4LessonItem("🦁", "Persian Empire (Cyrus & Darius)", "فارسی سلطنت (سائرس اعظم اور دارا)", "د فارس امپراتوري", "Founded by Cyrus the Great (Achaemenid Empire). Darius I built the famous Royal Road and postal system, and conquered Gandhara.", "سائرس اعظم نے فارسی سلطنت کی بنیاد رکھی اور دارا اول نے شاہی سڑک اور ڈاک کا نظام قائم کیا۔", "سائرس اعظم د فارس امپراتوري جوړه کړه او شاهي لاره یې وغځوله."),
                Class4LessonItem("🏛️", "Ancient Greece: Athens, Sparta & Alexander", "قدیم یونان: ایتھنز، فلسفہ اور سکندرِ اعظم", "لرغونی یونان، فلسفه او سکندر اعظم", "Athens introduced Democracy and hosted the first Olympic Games (776 BCE). Socrates, Plato, and Aristotle were great Greek philosophers; Alexander the Great reached the Indus in 326 BCE.", "ایتھنز میں جمہوریت اور اولمپک کھیل شروع ہوئے۔ سقراط، افلاطون اور ارسطو مشہور یونانی فلاسفر تھے۔", "په اتن کې ډیموکراسي او اولمپیک لوبې پیل شوې؛ سقراط، افلاطون او ارسطو لوی فیلسوفان وو."),
                Class4LessonItem("🛡️", "Roman Civilization", "رومی تہذیب", "رومي تمدن", "Rome evolved from a Republic with a Senate and Twelve Tables of Law into a vast Empire famous for roads, aqueducts, and the Colosseum.", "رومی تہذیب اپنے قوانین، سینیٹ، پختہ سڑکوں، آبی گزرگاہوں (Aqueducts) اور کولوزیم کے لیے مشہور ہے۔", "رومي تمدن د قوانینو، سړکونو او کولوزیم لپاره مشهور دی.")
            ),
            exercises = listOf(
                Class4Exercise("Which Greek city-state is known as the birthplace of Democracy?", "یونان کی کون سی شہری ریاست جمہوریت (Democracy) کی جائے پیدائش کہلاتی ہے؟", "د یونان کوم ښار د ډیموکراسۍ زانګو بلل کیږي؟", listOf("Athens", "Sparta", "Rome", "Babylon"), 0, "Athens introduced the earliest system of direct democracy.", "ایتھنز (Athens) کو جمہوریت کا گہوارہ کہا جاتا ہے۔"),
                Class4Exercise("Who were Socrates, Plato, and Aristotle?", "سقراط، افلاطون اور ارسطو کون تھے؟", "سقراط، افلاطون او ارسطو څوک وو؟", listOf("Great Greek Philosophers", "Egyptian Pharaohs", "Roman Emperors", "Chinese Kings"), 0, "Socrates, Plato, and Aristotle were renowned philosophers of Ancient Greece.", "یہ تینوں قدیم یونان کے عظیم فلسفی تھے۔"),
                Class4Exercise("In which year did Alexander the Great invade the Indus region (Taxila/Jhelum)?", "سکندرِ اعظم نے کس سن میں وادیِ سندھ (ٹیکسلا اور جہلم) پر حملہ کیا جہاں راجہ پورس سے جنگ ہوئی؟", "سکندر اعظم په کوم کال د اباسین او جهلم سیمې ته راغی؟", listOf("326 BCE", "712 CE", "1526 CE", "100 CE"), 0, "Alexander crossed into Taxila and fought Raja Porus at the Battle of Hydaspes (Jhelum) in 326 BCE.", "سکندرِ اعظم 326 قبل مسیح میں ٹیکسلا اور جہلم آیا۔")
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Unit 4: Aryans, Kushans and Guptas",
            titleUr = "یونٹ 4: آریہ، کشان اور گپتا دور",
            titlePs = "یونټ 4: آریایان، کوشانیان او ګوپتا دوره",
            subtitleEn = "Pages 53–67 • Caste System, Buddhism & Jainism, Mauryans (Ashoka), Gandhara Art (Kanishka) & Guptas",
            badgeEmoji = "☸️",
            color = Color(0xFFAA00FF),
            lessons = listOf(
                Class4LessonItem("📜", "Aryans, Caste System, Buddhism & Jainism", "آریہ، ذات پات کا نظام اور بدھ مت", "آریایان او بودایي دین", "The Aryans introduced the four-caste system (Brahmins, Kshatriyas, Vaishyas, Shudras). Gautama Buddha preached equality, peace, and non-violence.", "آریہ قوم نے چار ذاتوں کا نظام رائج کیا جبکہ گوتم بدھ نے امن، مساوات اور عدم تشدد کی تعلیم دی۔", "آریایانو د ذاتونو سیستم رامنځته کړ او ګوتم بودا د سولې او مساواتو تعلیم ورکړ."),
                Class4LessonItem("🦁", "Mauryan Empire (Chandragupta & Ashoka) & Taxila", "موریہ سلطنت (چندر گپت اور اشوک) اور ٹیکسلا", "موریا واکمني او ټیکسلا", "Chandragupta Maurya founded the Mauryan Empire. After the Kalinga War, Emperor Ashoka embraced Buddhism and built stupas across Taxila and KP.", "جنگِ کلنگا کے بعد راجہ اشوک نے بدھ مت قبول کیا اور ٹیکسلا و خیبر پختونخوا میں اسٹوپے بنوائے۔", "اشوک بودایي دین ومانه او په ټیکسلا او پښتونخوا کې یې سټوپې جوړې کړې."),
                Class4LessonItem("🗿", "Kushan Empire (Kanishka) & Gupta Golden Age", "کشان سلطنت (کنشک)، گندھارا آرٹ اور گپتا دور", "کوشاني دوره (کنشک) او ګندهارا هنر", "Peshawar (Purushapura) was the capital of Emperor Kanishka, under whom Gandhara Art flourished. The Gupta era made advances in mathematics (concept of zero) and astronomy.", "راجہ کنشک کا دارالحکومت پشاور تھا اور اس دور میں گندھارا آرٹ اپنے عروج پر پہنچا۔", "د کنشک پلازمینه پیښور وه او په دې دوره کې د ګندهارا هنر ډیره وده وکړه.")
            ),
            exercises = listOf(
                Class4Exercise("Which city served as the winter capital of the great Kushan ruler Emperor Kanishka?", "عظیم کشان حکمران کنشک کا سرمائی دارالحکومت کون سا شہر تھا؟", "د کوشاني واکمن کنشک ژمنۍ پلازمینه کوم ښار و؟", listOf("Peshawar (Purushapura)", "Multan", "Karachi", "Quetta"), 0, "Peshawar (then called Purushapura) was the capital of Kanishka's Kushan Empire.", "پشاور (پروش پور) راجہ کنشک کا دارالحکومت تھا۔"),
                Class4Exercise("Which Mauryan emperor renounced war after the bloody Kalinga War and spread Buddhism?", "کس موریہ شہنشاہ نے جنگِ کلنگا کے بعد جنگ سے توبہ کی اور بدھ مت کی ترویج کی؟", "کوم موریا ټولواک د کلینګا له جګړې وروسته جګړه پریښوده او بودایي دین یې خپور کړ؟", listOf("Emperor Ashoka", "Chandragupta", "Harsha", "Skandagupta"), 0, "Emperor Ashoka embraced Buddhism and peace after the Kalinga War.", "راجہ اشوک نے کلنگا کی جنگ کے بعد امن اور بدھ مت اختیار کیا۔"),
                Class4Exercise("Gandhara Civilization (Peshawar, Mardan, Swat, Taxila) is world-famous for:", "گندھارا کی تہذیب (پشاور، مردان، سوات، ٹیکسلا) دنیا بھر میں کس چیز کے لیے مشہور ہے؟", "د ګندهارا تمدن (پیښور، مردان، سوات، ټیکسلا) د څه لپاره مشهور دی؟", listOf("Gandhara Buddhist Art, Stupas, and ancient Taxila University", "Pyramids", "Hanging Gardens", "Roman Colosseum"), 0, "Gandhara is renowned for its Greco-Buddhist sculptures, monasteries (Takht-i-Bahi), and Taxila University.", "گندھارا آرٹ، تخت بائی کے کھنڈرات اور قدیم ٹیکسلا یونیورسٹی۔")
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Unit 5: Rise of Islamic Civilization",
            titleUr = "یونٹ 5: اسلامی تہذیب کا عروج",
            titlePs = "یونټ 5: د اسلامي تمدن وده",
            subtitleEn = "Pages 68–90 • Dawn of Islam, Charter of Madinah, Khulafa-e-Rashideen, Umayyads & Abbasids",
            badgeEmoji = "🕌",
            color = Color(0xFF00C853),
            lessons = listOf(
                Class4LessonItem("🕋", "Life of Rasoolullah ﷺ, Hijrah & Charter of Madinah", "سیرت النبی ﷺ، ہجرت اور میثاقِ مدینہ", "نبوي سیرت، هجرت او د مدینې تړون", "After Hijrah (622 CE), Hazrat Muhammad ﷺ established the Islamic State of Madinah, signed the Charter of Madinah (first written constitution), and conquered Makkah peacefully in 8 AH.", "ہجرت کے بعد نبی کریم ﷺ نے ریاستِ مدینہ اور میثاقِ مدینہ قائم فرمایا اور ۸ ہجری میں مکہ فتح ہوا۔", "له هجرت وروسته رسول الله ﷺ د مدینې اسلامي دولت او د مدینې میثاق جوړ کړ."),
                Class4LessonItem("⚖️", "Pious Caliphate (Khulafa-e-Rashideen 11–40 AH)", "خلافتِ راشدہ (۱۱ تا ۴۰ ہجری)", "راشده خلافت", "Hazrat Abu Bakr (RA), Hazrat Umar (RA), Hazrat Usman (RA), and Hazrat Ali (RA) established exemplary justice, welfare, and expanded Islam to Persia, Syria, and Egypt.", "حضرت ابوبکرؓ، حضرت عمرؓ، حضرت عثمانؓ اور حضرت علیؓ کے دور میں مثالی عدل و انصاف اور فلاحی نظام قائم ہوا۔", "د خلفای راشدینو په دوره کې مثالي عدل او اسلامي فتوحات ترسره شول."),
                Class4LessonItem("📚", "Umayyad & Abbasid Eras (Muhammad bin Qasim & Bait-ul-Hikmah)", "بنو امیہ اور بنو عباس (محمد بن قاسم اور بیت الحکمہ)", "اموي او عباسي دورې", "Under the Umayyads, Muhammad bin Qasim conquered Sindh in 712 CE. Under the Abbasids, Baghdad's Bait-ul-Hikmah (House of Wisdom) led the world in science, medicine, and algebra.", "۷۱۲ء میں محمد بن قاسم نے سندھ فتح کیا اور عباسی دور میں بغداد کا بیت الحکمہ علوم و فنون کا عالمی مرکز بنا۔", "په ۷۱۲ ز کال کې محمد بن قاسم سند فتحه کړ او په بغداد کې بیت الحکمه د پوهې مرکز شو.")
            ),
            exercises = listOf(
                Class4Exercise("Which document signed by Hazrat Muhammad ﷺ in Madinah is recognized as the world's first written constitution?", "مدینہ منورہ میں نبی کریم ﷺ کا تیار کردہ کون سا معاہدہ دنیا کا پہلا تحریری دستور مانا جاتا ہے؟", "په مدینه منوره کې د رسول الله ﷺ کوم تړون د نړۍ لومړی لیکل شوی اساسي قانون ګڼل کیږي؟", listOf("Charter of Madinah (میثاقِ مدینہ)", "Magna Carta", "Twelve Tables", "Treaty of Versailles"), 0, "The Charter of Madinah (Mithaq-e-Madinah) guaranteed rights and religious freedom.", "میثاقِ مدینہ دنیا کا پہلا تحریری دستور ہے۔"),
                Class4Exercise("How many years did the era of the four Rightly Guided Caliphs (Khulafa-e-Rashideen) last?", "خلفائے راشدین رضوان اللہ علیہم اجمعین کا دورِ خلافت تقریباً کتنے سال رہا؟", "د څلورو راشده خلیفه ګانو دوره شاوخوا څو کاله وه؟", listOf("About 30 years (632–661 CE)", "100 years", "5 years", "200 years"), 0, "The Pious Caliphate lasted nearly 30 years from 11 AH to 40 AH.", "خلافتِ راشدہ کا دور تقریباً ۳۰ سال (۱۱ تا ۴۰ ہجری) رہا۔"),
                Class4Exercise("In 712 CE, which young Muslim general conquered Sindh and Multan, earning Sindh the title 'Bab-ul-Islam'?", "۷۱۲ عیسوی میں کس نوجوان مسلم سپہ سالار نے سندھ اور ملتان فتح کیا جس سے سندھ 'باب الاسلام' کہلایا؟", "په ۷۱۲ ز کال کې کوم ځوان مسلمان سپه سالار سند او ملتان فتحه کړل؟", listOf("Muhammad bin Qasim", "Tariq bin Ziyad", "Salahuddin Ayyubi", "Qutbuddin Aibak"), 0, "Muhammad bin Qasim defeated Raja Dahir in 712 CE and introduced Islam in Sindh.", "محمد بن قاسم نے ۷۱۲ء میں راجہ داہر کو شکست دے کر سندھ فتح کیا۔")
            )
        )
    )

    // =========================================================================
    // 7. DRAWING CLASS 6 (All 6 Chapters — Pages 1–80)
    // =========================================================================
    val drawingStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Ch 1: Essentials of Drawing",
            titleUr = "باب 1: ڈرائنگ کے بنیادی اصول اور آلات",
            titlePs = "لومړی څپرکی: د انځورګرۍ اساسات او وسایل",
            subtitleEn = "Pages 1–25 • Drawing Instruments, Basic Strokes, Freehand Drawing, Lines, Shapes & 3D Solids",
            badgeEmoji = "✏️",
            color = Color(0xFFFFAB00),
            lessons = listOf(
                Class4LessonItem("✏️", "Drawing & Geometrical Instruments", "ڈرائنگ اور جیومیٹری کے آلات", "د انځورګرۍ او هندسې وسایل", "HB pencils are medium; H pencils (2H, 4H) are hard/light; B pencils (2B, 4B, 6B) are soft/dark for shading.", "H پنسلیں سخت اور ہلکی لکیر لگاتی ہیں جبکہ B پنسلیں (2B, 4B, 6B) نرم اور گہری شیڈنگ کے لیے استعمال ہوتی ہیں۔", "H پنسلونه کلک او B پنسلونه (2B, 4B, 6B) نرم او د سیوري لپاره کارول کیږي."),
                Class4LessonItem("〰️", "Lines, 2D Shapes & 3D Solids", "لکیریں، دو رخی اشکال اور سہ رخی ٹھوس اجسام", "کرښې، 2D شکلونه او 3D جسمونه", "2D shapes (Square, Circle, Triangle) have length and width. 3D solids (Cube, Sphere, Cone, Cylinder, Pyramid) also have depth/volume.", "مربع اور دائرہ 2D اشکال ہیں جبکہ مکعب، کرہ، مخروط اور اسطوانہ 3D ٹھوس اشکال ہیں۔", "مربع او دایره 2D دي او مکعب، کره او مخروط 3D شکلونه دي."),
                Class4LessonItem("🖐️", "Freehand Sketching & Basic Strokes", "فری ہینڈ اسکیچنگ", "پرته له خط کش څخه رسمول", "Freehand drawing is done with smooth hand movement without rulers or compasses to build proportion and observation.", "فری ہینڈ ڈرائنگ بغیر فٹے اور پرکار کے صرف ہاتھ کی مہارت سے بنائی جاتی ہے۔", "فري هینډ انځورګري پرته له خط کش او پرکار څخه په لاس رسمول دي.")
            ),
            exercises = listOf(
                Class4Exercise("Which grade of pencil is softest and best suited for dark shading?", "گہری شیڈنگ (Shading) کے لیے کون سی پنسل سب سے نرم اور بہترین ہوتی ہے؟", "د تیاره سیوري (Shading) لپاره کوم پنسل ترټولو نرم او غوره دی؟", listOf("6B", "4H", "2H", "6H"), 0, "'B' stands for Blackness/softness; 6B is very soft and dark.", "6B پنسل نرم اور گہری سیاہ ہوتی ہے جو شیڈنگ کے لیے بہترین ہے۔"),
                Class4Exercise("What is the 3D solid equivalent of a 2D Circle?", "دو رخی دائرے (Circle) کی سہ رخی (3D) ٹھوس شکل کیا کہلاتی ہے؟", "د دوه اړخیزې دایرې درې اړخیز (3D) شکل څه بلل کیږي؟", listOf("Sphere (کرہ / گیند)", "Cube", "Pyramid", "Square"), 0, "A Sphere (like a ball) is a 3D form of a circle.", "دائرے کی سہ رخی ٹھوس شکل کرہ (Sphere / گیند) ہے۔"),
                Class4Exercise("Drawing made purely by hand without using a ruler or compass is called:", "فٹے اور پرکار کے بغیر صرف ہاتھ سے بنائی گئی ڈرائنگ کو کیا کہتے ہیں؟", "پرته له خط کش او پرکار څخه په لاس رسمولو ته څه ویل کیږي؟", listOf("Freehand Drawing", "Mechanical Engineering", "Tracing", "Block Printing"), 0, "Drawing without mechanical instruments is Freehand Drawing.", "اسے فری ہینڈ ڈرائنگ (Freehand Drawing) کہتے ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Ch 2: Supplement to Drawing (Colour & Shading)",
            titleUr = "باب 2: بصری فن کے عناصر، رنگ، روشنی اور سایہ",
            titlePs = "دویم څپرکی: رنګونه، رڼا، سیوری او د رسم تخنیکونه",
            subtitleEn = "Pages 26–41 • Elements of Art, Colour Wheel, Light, Shade, Shadow & Rendering Techniques",
            badgeEmoji = "🎨",
            color = Color(0xFFFF6D00),
            lessons = listOf(
                Class4LessonItem("🎨", "Primary, Secondary & Tertiary Colours", "بنیادی، ثانوی اور ثالثی رنگ", "لومړني، ثانوي او دریمه درجه رنګونه", "Primary: Red, Yellow, Blue. Secondary: Orange (R+Y), Green (Y+B), Violet (B+R). Warm colours (Red, Orange, Yellow) vs Cool colours (Blue, Green).", "سرخ، پیلا اور نیلا بنیادی رنگ ہیں؛ ان کے ملانے سے نارنجی، سبز اور جامنی (ثانوی رنگ) بنتے ہیں۔", "سور، ژیړ او شین (ابي) لومړني رنګونه دي."),
                Class4LessonItem("🌓", "Light, Shade and Cast Shadow", "روشنی، شیڈ اور عکس دار سایہ", "رڼا او سیوری", "The side facing the light source has a bright Highlight; the opposite side has Shade and casts a Shadow on the ground.", "روشنی کے سامنے والا حصہ روشن (Highlight) اور مخالف حصہ تاریک ہوتا ہے اور زمین پر سایہ ڈالتا ہے۔", "د رڼا مخامخ برخه روښانه او شاته برخه یې سیوری لري."),
                Class4LessonItem("🖊️", "Rendering Techniques", "شیڈنگ کی تکنیکیں (ہچنگ، کراس ہچنگ، اسٹیپلنگ)", "د سیوري ورکولو طریقې", "Hatching (parallel lines), Cross-hatching (criss-cross lines), Stippling (dots), and Blending (smooth smudging).", "متوازی لکیروں سے ہچنگ، جالی دار لکیروں سے کراس ہچنگ اور نقطوں سے شیڈ دینے کو اسٹیپلنگ کہتے ہیں۔", "په موازي کرښو سیوری ورکول Hatching او په ټکو سیوری ورکول Stippling بلل کیږي.")
            ),
            exercises = listOf(
                Class4Exercise("Which three colours are Primary Colours that cannot be made by mixing other colours?", "وہ تین بنیادی رنگ (Primary Colours) کون سے ہیں جو دوسرے رنگ ملانے سے نہیں بنتے؟", "درې لومړني رنګونه (Primary Colours) کوم دي؟", listOf("Red, Yellow, Blue", "Green, Orange, Purple", "Black, White, Grey", "Pink, Brown, Cyan"), 0, "Red, Yellow, and Blue are the three primary pigment colours.", "سرخ، پیلا اور نیلا تین بنیادی رنگ ہیں۔"),
                Class4Exercise("Shading an object using tiny dots is called:", "باریک نقطوں (Dots) کی مدد سے شیڈنگ کرنے کی تکنیک کو کیا کہتے ہیں؟", "د وړو ټکو په مرسته سیوري ورکولو ته څه ویل کیږي؟", listOf("Stippling", "Cross-hatching", "Tracing", "Origami"), 0, "Stippling creates tone and texture using patterns of small dots.", "نقطوں سے شیڈنگ کرنے کو اسٹیپلنگ (Stippling) کہتے ہیں۔"),
                Class4Exercise("Where does the cast shadow of an object always fall?", "کسی جسم کا سایہ (Shadow) ہمیشہ کس سمت گرتا ہے؟", "د یو شي سیوری تل کومې خوا ته لویږي؟", listOf("On the side opposite to the light source", "Directly towards the light", "Inside the light bulb", "Nowhere"), 0, "Shadows always form on the side opposite to the source of light.", "سایہ ہمیشہ روشنی کے منبع کی مخالف سمت میں بنتا ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Ch 3: Application of Drawing",
            titleUr = "باب 3: ڈرائنگ کا اطلاق (خوشخطی، ٹریسنگ، کرافٹس اور بلاک پرنٹنگ)",
            titlePs = "دریم څپرکی: لیکوالي، ټریسنګ، لاسي صنایع او بلاک پرنټینګ",
            subtitleEn = "Pages 42–58 • Lettering, Stenciling, Tracing, Paper Crafts & Potato/Wood Block Printing",
            badgeEmoji = "🖨️",
            color = Color(0xFF00E5FF),
            lessons = listOf(
                Class4LessonItem("🔤", "Lettering & Stenciling", "لیٹرنگ اور اسٹینسلنگ", "توري لیکل او سټینسل", "Grid lettering helps draw uniform block letters for posters and banners.", "مربع جالی (Grid) کی مدد سے پوسٹر کے لیے یکساں اور خوبصورت حروف لکھے جاتے ہیں۔", "د جدول په مرسته مساوي او ښکلي توري لیکل کیږي."),
                Class4LessonItem("📄", "Tracing & Paper Crafts", "ٹریسنگ اور کاغذ کے ہنر", "ټریسنګ او کاغذي هنرونه", "Butter paper (tracing paper) transfers outlines onto drawing sheets. Paper folding and recycling create decorative crafts.", "بٹر پیپر (ٹریسنگ پیپر) کے ذریعے نقشہ ایک کاغذ سے دوسرے کاغذ پر منتقل کیا جاتا ہے۔", "د ټریسنګ کاغذ په مرسته انځور بل کاغذ ته لیږدول کیږي."),
                Class4LessonItem("🥔", "Block Printing", "بلاک پرنٹنگ (ٹھپہ چھپائی)", "بلاک پرنټینګ (چاپ)", "Carving a relief design on a potato half or wooden block, dipping it in paint, and stamping patterns on cloth or paper.", "آلو یا لکڑی کے بلاک پر نقش کندہ کر کے رنگ لگا کر کپڑے یا کاغذ پر چھاپہ لگانا بلاک پرنٹنگ کہلاتا ہے۔", "پر کچالو یا لرګي نقش ایستل او پر کاغذ یا ټوکر چاپول بلاک پرنټینګ بلل کیږي.")
            ),
            exercises = listOf(
                Class4Exercise("Which semi-transparent paper is used to copy an outline from one sheet to another?", "ایک کاغذ سے دوسرے کاغذ پر خاکہ منتقل کرنے کے لیے کون سا نیم شفاف کاغذ استعمال ہوتا ہے؟", "له یو کاغذ څخه بل ته د انځور لیږدولو لپاره کوم نیمه شفاف کاغذ کارول کیږي؟", listOf("Tracing Paper (Butter Paper)", "Cardboard", "Sandpaper", "Newspaper"), 0, "Tracing paper (butter paper) is translucent and used for tracing.", "اسے ٹریسنگ پیپر یا بٹر پیپر کہتے ہیں۔"),
                Class4Exercise("Carving a pattern onto a potato or wooden block and stamping it with colour is called:", "آلو یا لکڑی کے ٹکڑے پر ڈیزائن تراش کر رنگ سے چھاپہ لگانے کے ہنر کو کیا کہتے ہیں؟", "پر کچالو یا لرګي ډیزاین جوړول او په رنګ چاپولو ته څه ویل کیږي؟", listOf("Block Printing", "Oil Painting", "Sculpture", "Calligraphy"), 0, "Stamping inked relief blocks is called Block Printing.", "اس ہنر کو بلاک پرنٹنگ (ٹھپہ چھپائی) کہتے ہیں۔"),
                Class4Exercise("Why do artists use a square grid when doing Block Lettering?", "بلاک لیٹرنگ (حروف نویسی) میں مربع جالی (Grid) کیوں استعمال کی جاتی ہے؟", "په بلاک لیکنه کې ولې د مربعاتو جال (Grid) کارول کیږي؟", listOf("To keep the height, width, and spacing of letters uniform", "To tear the paper", "To hide the letters", "To erase colours"), 0, "Grids ensure every letter has uniform size and spacing.", "تاکہ تمام حروف کی لمبائی، چوڑائی اور فاصلہ یکساں رہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Ch 4: Observation & Actualization",
            titleUr = "باب 4: مشاہدہ اور حقیقی ڈرائنگ (اسٹل لائف شیڈنگ)",
            titlePs = "څلورم څپرکی: مشاهده او سټیل لایف انځورګري",
            subtitleEn = "Pages 59–68 • Drawing from Life, Proportion, Eye Level & Still Life Pencil Shading",
            badgeEmoji = "🏺",
            color = Color(0xFF00E676),
            lessons = listOf(
                Class4LessonItem("👁️", "Observation & Eye Level", "مشاہدہ اور نظر کی سطح (Eye Level)", "مشاهده او د سترګو سطحه", "How an object looks depends on whether it is placed below, at, or above your eye level.", "کسی چیز کی شکل اس بات پر منحصر ہے کہ وہ ہماری نظر کی سطح سے نیچے ہے، برابر ہے یا اوپر۔", "د شیانو بڼه د لیدونکي د سترګو له سطحې سره تړاو لري."),
                Class4LessonItem("🍎", "Still Life Drawing", "اسٹل لائف (بے جان اشیاء کی ڈرائنگ)", "د بې ساه شیانو انځورګري (Still Life)", "Arranging inanimate objects like a jug, bowl, cup, and fruits on a table and drawing them with accurate proportion.", "میز پر رکھے برتن، پھل، کتاب یا گلدان کو دیکھ کر تناسب کے ساتھ بنانا اسٹل لائف ڈرائنگ کہلاتا ہے۔", "په میز د ایښودل شویو لوښو او میوو رسمولو ته Still Life وایي."),
                Class4LessonItem("✏️", "Graduated Pencil Shading", "پنسل سے درجہ وار شیڈنگ", "په پنسل تدریجي سیوری ورکول", "Using light pressure for highlights, medium tones for mid-areas, and 4B/6B for deep shadows gives a 3D realistic look.", "ہلکے اور گہرے پنسل شیڈز سے تصویر میں سہ رخی (3D) گہرائی پیدا ہوتی ہے۔", "د روښانه او تیاره سیوري په مرسته انځور ژوندی او 3D ښکاري.")
            ),
            exercises = listOf(
                Class4Exercise("A drawing of an arrangement of non-living objects such as fruits, vases, and bowls is called:", "پھلوں، گلدان اور برتنوں جیسی بے جان اشیاء کو سامنے رکھ کر تصویر بنانے کو کیا کہتے ہیں؟", "د میوو، ګلدان او لوښو په څیر د بې ساه شیانو رسمولو ته څه ویل کیږي؟", listOf("Still Life Drawing", "Portrait", "Caricature", "Map"), 0, "Still Life depicts arranged inanimate objects.", "اسے اسٹل لائف ڈرائنگ (Still Life) کہتے ہیں۔"),
                Class4Exercise("What makes a flat 2D pencil drawing of an apple look round and three-dimensional?", "کاغذ پر بنے سیب کے چپٹے خاکے کو گول اور حقیقی (3D) دکھانے کے لیے کیا کیا جاتا ہے؟", "په کاغذ د مڼې رسم څنګه ګرد او درې اړخیز (3D) ښکاري؟", listOf("Proper tonal shading showing highlight, mid-tone, and shadow", "Erasing the outline", "Cutting the paper", "Folding the page"), 0, "Graduated light-to-dark shading creates the illusion of 3D volume.", "روشنی اور سائے کے مطابق پنسل شیڈنگ کرنے سے گولائی اور گہرائی نظر آتی ہے۔"),
                Class4Exercise("In drawing, 'Proportion' means:", "ڈرائنگ میں 'تناسب' (Proportion) سے کیا مراد ہے؟", "په انځورګرۍ کې له 'تناسب' (Proportion) څخه څه مراد دی؟", listOf("The correct relative size of different parts of an object", "Using only red paint", "Drawing without paper", "Framing a picture"), 0, "Proportion is the size relationship between parts of an object or composition.", "کسی شے کے مختلف حصوں کے سائز کا آپس میں درست تعلق تناسب کہلاتا ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Ch 5: Communication & Exhibition",
            titleUr = "باب 5: ابلاغ اور نمائش (آرٹ تنقید، پورٹ فولیو، فریم اور نمائش)",
            titlePs = "پنځم څپرکی: پورټ فولیو، چوکاټ او د هنر نندارتون",
            subtitleEn = "Pages 69–74 • Art Criticism, Making a Portfolio, Framing & Mounting, Purpose of Exhibition",
            badgeEmoji = "🖼️",
            color = Color(0xFFAA00FF),
            lessons = listOf(
                Class4LessonItem("📂", "Making an Art Portfolio", "آرٹ پورٹ فولیو تیار کرنا", "د هنر پورټ فولیو جوړول", "A portfolio is a neat folder that safely stores and showcases a student's best drawings and artworks.", "پورٹ فولیو وہ فولڈر ہے جس میں طالب علم اپنی بہترین پینٹنگز اور ڈرائنگز محفوظ رکھتا ہے۔", "پورټ فولیو هغه فولډر دی چې زده کوونکی پکې خپل غوره انځورونه ساتي."),
                Class4LessonItem("🖼️", "Mounting and Framing", "ماؤنٹنگ اور فریمنگ", "ماونټینګ او چوکاټ لګول", "Mounting places a clean border card around an artwork; Framing protects it under glass/wood for wall display.", "تصویر کے گرد خوبصورت بارڈر لگانا ماؤنٹنگ اور فریم میں جڑنا فریمنگ کہلاتا ہے۔", "له انځور څخه چارچاپیره بارډر لګول ماونټینګ او چوکاټ نیول فریمنګ بلل کیږي."),
                Class4LessonItem("🏛️", "Art Exhibition & Constructive Criticism", "فنی نمائش اور مثبت تنقید", "هنري نندارتون او مثبت نقد", "Exhibitions share art with the community, build confidence, and allow viewers to appreciate and learn from each other.", "نمائش سے طلبہ میں خود اعتمادی پیدا ہوتی ہے اور فن پاروں کی قدر افزائی ہوتی ہے۔", "نندارتون د زده کوونکو باور لوړوي او هنر نورو ته ورپیژني.")
            ),
            exercises = listOf(
                Class4Exercise("A folder used by an artist or student to keep and present their collection of artworks is called a:", "وہ فولڈر جس میں فنکار یا طالب علم اپنے بنائے ہوئے فن پارے محفوظ رکھتا ہے کیا کہلاتا ہے؟", "هغه فولډر چې هنرمند پکې خپل انځورونه ساتي څه بلل کیږي؟", listOf("Portfolio", "Palette", "Easel", "Canvas"), 0, "An art portfolio holds and organizes an artist's work.", "اسے آرٹ پورٹ فولیو (Portfolio) کہتے ہیں۔"),
                Class4Exercise("Fixing a cardboard border around a drawing to enhance its appearance before framing is called:", "فریم کرنے سے پہلے تصویر کے گرد خوبصورت گتے کا حاشیہ (Border) لگانا کیا کہلاتا ہے؟", "تر چوکاټ مخکې د انځور شاوخوا ته د کاغذي بارډر لګولو ته څه ویل کیږي؟", listOf("Mounting", "Stippling", "Hatching", "Carving"), 0, "Mounting attaches a mat/border card around the artwork.", "اس عمل کو ماؤنٹنگ (Mounting) کہتے ہیں۔"),
                Class4Exercise("What is the main purpose of holding a School Art Exhibition?", "اسکول میں آرٹ کی نمائش منعقد کرنے کا بنیادی مقصد کیا ہے؟", "په ښوونځي کې د هنري نندارتون جوړولو اصلي موخه څه ده؟", listOf("To encourage creativity, build confidence, and share artworks with viewers", "To burn old paper", "To close the school", "To hide drawings"), 0, "Art exhibitions celebrate creativity and inspire students.", "طلبہ کی تخلیقی صلاحیتوں کی حوصلہ افزائی اور خود اعتمادی بڑھانا۔")
            )
        ),
        Class4StageData(
            stageNumber = 6,
            titleEn = "Ch 6: Time Management Skills",
            titleUr = "باب 6: وقت کی تنظیم کی مہارتیں",
            titlePs = "شپږم څپرکی: د وخت مدیریت مهارتونه",
            subtitleEn = "Pages 75–80 • Planning Art Tasks, Setting Priorities & Completing Projects on Time",
            badgeEmoji = "⏰",
            color = Color(0xFF536DFE),
            lessons = listOf(
                Class4LessonItem("⏰", "Importance of Time Management in Art", "فن اور تعلیم میں وقت کی پابندی", "په هنر او زده کړه کې د وخت مدیریت", "Dividing an art project into steps—sketching, outlining, colouring/shading, and finishing—helps complete work neatly on time.", "کسی بھی ڈرائنگ کو وقت پر مکمل کرنے کے لیے خاکہ، آؤٹ لائن اور شیڈنگ کے اوقات تقسیم کرنا ضروری ہے۔", "د کار په وخت بشپړولو لپاره د وخت ویش او پلان اړین دی."),
                Class4LessonItem("📋", "Setting Priorities & Avoiding Delay", "ترجیحات کا تعین اور ٹال مٹول سے بچاؤ", "لومړیتوبونه ټاکل", "Prepare your drawing tools beforehand and focus on main shapes first before tiny details.", "کام شروع کرنے سے پہلے اپنے آلات تیار رکھیں اور پہلے بنیادی خاکہ مکمل کریں۔", "تر کار مخکې خپل وسایل چمتو کړئ او لومړی اصلي خاکه بشپړه کړئ.")
            ),
            exercises = listOf(
                Class4Exercise("What is the best way to finish a two-hour drawing exam neatly on time?", "دو گھنٹے کے ڈرائنگ امتحان کو وقت پر اور صفائی سے مکمل کرنے کا بہترین طریقہ کیا ہے؟", "په ټاکلي وخت کې د انځورګرۍ ازموینې بشپړولو غوره لاره کومه ده؟", listOf("Divide time wisely between sketching, outlining, and shading/colouring", "Spend 1 hour 55 minutes only sharpening pencils", "Start colouring without sketching", "Leave the sheet blank"), 0, "Allocating time to each stage ensures timely completion.", "خاکہ بنانے، آؤٹ لائن اور رنگ/شیڈنگ کے لیے وقت کو مناسب طریقے سے تقسیم کرنا۔"),
                Class4Exercise("When drawing a complex scene, what should you sketch first?", "کوئی منظر یا تصویر بناتے وقت سب سے پہلے کیا بنانا چاہیے؟", "د یوې صحنې د رسمولو پر مهال لومړی باید څه رسم شي؟", listOf("Light basic outlines and proportions of the main objects", "Tiny leaf veins only", "Dark background ink", "Signature frame"), 0, "Always start with light basic shapes and proportions before adding details.", "سب سے پہلے ہلکی پنسل سے بنیادی اشکال اور تناسب کا خاکہ بنانا چاہیے۔")
            )
        )
    )

    // =========================================================================
    // 8. HPE (HEALTH & PHYSICAL EDUCATION) CLASS 6 (All 9 Chapters — Pages 1–75)
    // =========================================================================
    val hpeStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Ch 1: Communicable & Non-Communicable Diseases",
            titleUr = "باب 1: متعدی اور غیر متعدی امراض (یرقان/ہیپاٹائٹس)",
            titlePs = "لومړی څپرکی: ساري او غیر ساري ناروغۍ (زیړی/هیپاټایټس)",
            subtitleEn = "Pages 1–9 • Germ Transmission, Jaundice/Hepatitis Symptoms & Prevention",
            badgeEmoji = "🩺",
            color = Color(0xFFFF5252),
            lessons = listOf(
                Class4LessonItem("🦠", "Communicable vs Non-Communicable Diseases", "متعدی اور غیر متعدی امراض میں فرق", "ساري او غیر ساري ناروغۍ", "Communicable diseases (Flu, TB, Measles, Typhoid) spread from one person to another via air, water, food, or contact.", "متعدی امراض (نزلہ، زکام، تپ دق، خسرہ، ٹائیفائیڈ) ایک مریض سے دوسرے تندرست انسان کو ہوا، پانی یا میل جول سے لگتے ہیں۔", "ساري ناروغۍ له یو ناروغ څخه روغ انسان ته د هوا، اوبو یا تماس له لارې خپریږي."),
                Class4LessonItem("🏥", "Jaundice / Hepatitis (یرقان)", "یرقان کی علامات اور بچاؤ", "د زیړي نښې او مخنیوی", "Jaundice affects the liver; eyes and skin turn yellowish. Prevent it by drinking boiled/clean water, washing hands, and avoiding contaminated syringes/blades.", "یرقان جگر کی بیماری ہے جس میں آنکھیں اور جلد زرد ہو جاتی ہیں۔ ابلا ہوا صاف پانی پینے اور صفائی سے اس سے بچا جا سکتا ہے۔", "زیړی د ځیګر ناروغي ده؛ د پاکو اوبو څښلو او پاکوالي سره یې مخنیوی کیږي.")
            ),
            exercises = listOf(
                Class4Exercise("Diseases that spread from an infected person to a healthy person through air, water, or contact are called:", "وہ بیماریاں جو ایک مریض سے تندرست انسان کو ہوا، پانی یا میل جول سے لگ جائیں کیا کہلاتی ہیں؟", "هغه ناروغۍ چې له ناروغ څخه روغ کس ته خپریږي څه بلل کیږي؟", listOf("Communicable Diseases (متعدی امراض)", "Genetic traits", "Bone fractures", "Sprains"), 0, "Communicable diseases are infectious and spread between people.", "ایسی بیماریوں کو متعدی امراض (Communicable diseases) کہتے ہیں۔"),
                Class4Exercise("Which organ of the body is directly affected by Jaundice / Hepatitis (یرقان)?", "یرقان (Jaundice / Hepatitis) جسم کے کس عضو کو براہِ راست متاثر کرتا ہے؟", "زیړی (Jaundice) د بدن کوم غړی اغیزمنوي؟", listOf("Liver (جگر)", "Teeth", "Ears", "Knees"), 0, "Jaundice/Hepatitis causes inflammation of the liver.", "یرقان جگر (Liver) کو متاثر کرتا ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Ch 2: Skeletal and Muscular System",
            titleUr = "باب 2: نظامِ استخوان اور عضلات (ہڈیاں اور پٹھے)",
            titlePs = "دویم څپرکی: د هډوکو او عضلاتو سیستم",
            subtitleEn = "Pages 10–19 • Human Skeleton, Types of Bones & Joints, Muscles & Posture",
            badgeEmoji = "🦴",
            color = Color(0xFFFFAB00),
            lessons = listOf(
                Class4LessonItem("🦴", "Human Skeleton & Joints", "انسانی ڈھانچہ اور جوڑ", "د انسان اسکلیټ او بندونه", "An adult human skeleton has 206 bones. It gives shape to the body, protects vital organs (skull protects brain, ribs protect heart/lungs), and helps movement.", "بالغ انسان کے ڈھانچے میں 206 ہڈیاں ہوتی ہیں جو جسم کو شکل دیتی ہیں اور نازک اعضا کی حفاظت کرتی ہیں۔", "د بالغ انسان په بدن کې 206 هډوکي دي چې بدن ته بڼه ورکوي."),
                Class4LessonItem("💪", "Voluntary & Involuntary Muscles", "ارادی اور غیر ارادی عضلات (پٹھے)", "ارادي او غیر ارادی عضلات", "Skeletal muscles work under our control (voluntary), while cardiac (heart) and smooth stomach muscles work automatically (involuntary).", "ہاتھ پاؤں کے عضلات ہمارے ارادے سے حرکت کرتے ہیں جبکہ دل کے عضلات خودکار طور پر کام کرتے ہیں۔", "د لاس او پښو عضلات ارادي دي خو د زړه عضلات په خپله کار کوي.")
            ),
            exercises = listOf(
                Class4Exercise("How many bones are there in an adult human skeleton?", "ایک بالغ انسان کے جسم (ڈھانچے) میں کل کتنی ہڈیاں ہوتی ہیں؟", "د یو بالغ انسان په اسکلیټ کې ټول څو هډوکي دي؟", listOf("206", "100", "500", "50"), 0, "An adult human has 206 bones.", "بالغ انسانی ڈھانچے میں 206 ہڈیاں ہوتی ہیں۔"),
                Class4Exercise("Which bony structure protects our heart and lungs?", "ہمارے دل اور پھیپھڑوں کی حفاظت کون سی ہڈیاں کرتی ہیں؟", "زموږ د زړه او سږو ساتنه کوم هډوکي کوي؟", listOf("Rib cage (پسلیاں)", "Knee cap", "Finger bones", "Toe bones"), 0, "The rib cage encloses and protects the heart and lungs.", "پسلیاں (Rib cage) دل اور پھیپھڑوں کی حفاظت کرتی ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Ch 3: Balanced Diet & Physical Growth",
            titleUr = "باب 3: متوازن غذا اور جسمانی نشوونما میں اس کی اہمیت",
            titlePs = "دریم څپرکی: متوازن خواړه او فزیکي وده",
            subtitleEn = "Pages 20–24 • Diet for Growing Children, Calories, Hydration & Healthy Eating",
            badgeEmoji = "🥛",
            color = Color(0xFF00E676),
            lessons = listOf(
                Class4LessonItem("🥗", "Balanced Diet for Active Youth", "متوازن غذا اور جسمانی نشوونما", "متوازن خواړه او د بدن وده", "A balanced diet contains carbohydrates, proteins, fats, vitamins, minerals, and water in the right proportions for age and activity.", "وہ غذا جس میں تمام ضروری اجزا (پروٹین، کاربوہائیڈریٹ، حیاتین، نمکیات اور پانی) مناسب مقدار میں ہوں متوازن غذا کہلاتی ہے۔", "هغه خواړه چې ټول اړین غذايي مواد ولري متوازن خواړه بلل کیږي."),
                Class4LessonItem("🥛", "Milk: A Complete Food", "دودھ: ایک مکمل غذا", "شیدې: بشپړ خواړه", "Milk provides calcium, protein, and vitamins essential for strong bones and teeth in growing students.", "دودھ میں کیلشیم، پروٹین اور وٹامنز ہوتے ہیں جو بڑھتے ہوئے بچوں کی ہڈیوں اور قد کے لیے بے حد ضروری ہیں۔", "شیدې کلسیم او پروټین لري چې د هډوکو او غاښونو لپاره اړین دي.")
            ),
            exercises = listOf(
                Class4Exercise("Why is milk considered a nearly complete food for growing children?", "بڑھتے ہوئے بچوں کے لیے دودھ کو بہترین اور مکمل غذا کیوں مانا جاتا ہے؟", "ولې شیدې د ماشومانو د ودې لپاره بشپړ خواړه ګڼل کیږي؟", listOf("It is rich in Calcium, Proteins, Fats, and Vitamins needed for bone growth", "It contains only salt", "It has no nutrients", "It is artificial"), 0, "Milk contains calcium and protein vital for bone and muscle development.", "دودھ میں کیلشیم، پروٹین اور وٹامنز وافر مقدار میں موجود ہوتے ہیں۔"),
                Class4Exercise("What happens if a child's diet lacks essential nutrients for a long time?", "اگر بچے کی خوراک میں طویل عرصے تک ضروری غذائی اجزا کی کمی رہے تو کیا ہوتا ہے؟", "که د ماشوم په خوړو کې اړین مواد کم وي څه پیښیږي؟", listOf("Malnutrition and stunted physical/mental growth", "Extra strength", "Faster running", "Better eyesight"), 0, "Lack of balanced nutrition leads to malnutrition and weak growth.", "غذائی قلت (Malnutrition) سے جسمانی اور ذہنی نشوونما رک جاتی ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Ch 4: Medicines and Narcotics",
            titleUr = "باب 4: ادویات اور منشیات",
            titlePs = "څلورم څپرکی: درمل او نشه یي توکي",
            subtitleEn = "Pages 25–29 • Proper Use of Medicine vs Dangers of Smoking & Narcotics",
            badgeEmoji = "🚭",
            color = Color(0xFFD50000),
            lessons = listOf(
                Class4LessonItem("💊", "Safe Use of Medicines", "ادویات کا محفوظ استعمال", "د درملو خوندي کارول", "Medicines cure illnesses only when taken according to a qualified doctor's prescription and dosage. Self-medication is dangerous.", "ادویات ہمیشہ مستند ڈاکٹر کے مشورے اور تجویز کردہ مقدار کے مطابق استعمال کرنی چاہئیں۔", "درمل باید تل د ډاکټر له لارښوونې سره سم وخوړل شي."),
                Class4LessonItem("🚭", "Harmful Effects of Narcotics & Smoking", "منشیات اور تمباکو نوشی کے نقصانات", "د نشه یي توکو زیانونه", "Tobacco, gutka, naswar, and narcotics destroy the lungs, heart, brain, and ruin family and social life.", "سگریٹ، نسوار، گٹکا اور دیگر منشیات پھیپھڑوں، دل اور دماغ کو تباہ کر کے انسان کو موت کے منہ میں دھکیل دیتی ہیں۔", "سګرټ او نشه یي توکي سږي، زړه او دماغ له منځه وړي.")
            ),
            exercises = listOf(
                Class4Exercise("How should medicines always be used?", "ادویات کا استعمال ہمیشہ کس طرح کرنا چاہیے؟", "درمل باید تل څنګه وکارول شي؟", listOf("Strictly according to a qualified doctor's prescription", "Without reading the expiry date", "By guessing", "Taking someone else's pills"), 0, "Always follow a doctor's prescription and check the expiry date.", "ہمیشہ مستند ڈاکٹر کے نسخے کے مطابق اور تاریخِ تنسیخ دیکھ کر۔"),
                Class4Exercise("Which organs are severely damaged by smoking cigarettes?", "سگریٹ نوشی سے جسم کے کون سے اعضا سب سے زیادہ تباہ ہوتے ہیں؟", "د سګرټ څکولو له امله د بدن کوم غړي زیانمن کیږي؟", listOf("Lungs and Heart", "Hair and Nails", "Fingertips", "Earlobes"), 0, "Smoking causes lung cancer, breathing diseases, and heart attacks.", "تمباکو نوشی پھیپھڑوں کے کینسر اور دل کی بیماریوں کا سبب بنتی ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Ch 5: Disasters and Hazards",
            titleUr = "باب 5: آفات و خطرات اور ابتدائی طبی امداد",
            titlePs = "پنځم څپرکی: آفتونه، خطرونه او لومړنۍ مرسته",
            subtitleEn = "Pages 30–38 • School & Home Safety, Fire/Flood/Earthquake Safety & First Aid Box",
            badgeEmoji = "🚒",
            color = Color(0xFFFF6D00),
            lessons = listOf(
                Class4LessonItem("🚒", "Emergency Safety Drills", "ہنگامی حالات اور حفاظتی تدابیر", "اضطراري حالت او خوندیتوب", "Know emergency exits at school, never touch bare electric wires with wet hands, and stay calm during evacuation.", "اسکول اور گھر میں ہنگامی راستوں کا علم رکھیں اور گیلے ہاتھوں سے بجلی کے تاروں کو ہرگز نہ چھوئیں۔", "په لندو لاسونو برقي تارونو ته لاس مه ورکوئ او اضطراري لارې وپیژنئ."),
                Class4LessonItem("🧰", "First Aid Box Essentials", "فرسٹ ایڈ باکس کا سامان", "د لومړنۍ طبي مرستې بکس", "A First Aid kit includes sterile bandages, cotton, antiseptic lotion (Pyodine/Dettol), scissors, medical tape, and ORS.", "فرسٹ ایڈ باکس میں پٹیاں، روئی، جراثیم کش محلول (پائیوڈین/ڈیٹول)، قینچی اور او آر ایس ہونا ضروری ہے۔", "په فرسټ ایډ بکس کې پټۍ، مالوچ، انټي سیپټیک او قینچي وي.")
            ),
            exercises = listOf(
                Class4Exercise("Which item is essential in a school First Aid Box to clean a fresh cut or wound?", "زخم کو جراثیم سے صاف کرنے کے لیے فرسٹ ایڈ باکس میں کون سی چیز ضروری ہے؟", "د ټپ د پاکولو لپاره په فرسټ ایډ بکس کې کوم شی اړین دی؟", listOf("Antiseptic solution (Dettol / Pyodine) and sterile cotton", "Mud", "Ink", "Chalk dust"), 0, "Antiseptic cleans wounds and prevents infection.", "جراثیم کش محلول (ڈیٹول/پائیوڈین) اور صاف روئی۔"),
                Class4Exercise("What is the emergency Rescue helpline number in Pakistan?", "پاکستان میں ہنگامی ریسکیو سروس کا نمبر کیا ہے؟", "په پاکستان کې د ژغورنې (Rescue) اضطراري شمیره څو ده؟", listOf("1122", "9999", "0000", "5555"), 0, "Rescue 1122 provides emergency ambulance and fire services.", "ریسکیو 1122 ہنگامی ایمبولینس اور فائر بریگیڈ سروس فراہم کرتا ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 6,
            titleEn = "Ch 6: Conflicts and Resolution",
            titleUr = "باب 6: تنازعات اور ان کا پرامن حل",
            titlePs = "شپږم څپرکی: شخړې او د هغوی سوله ییز حل",
            subtitleEn = "Pages 39–42 • Causes of Conflict, Patience, Dialogue, Tolerance & Sportsmanship",
            badgeEmoji = "🤝",
            color = Color(0xFF00B8D4),
            lessons = listOf(
                Class4LessonItem("🤝", "Resolving Conflicts Peacefully", "تنازعات کا پرامن حل", "د شخړو سوله ییز حل", "Misunderstandings and anger cause conflicts. Listening patiently, apologizing for mistakes, and forgiving others restores peace.", "غصے کے بجائے صبر، بات چیت، درگزر اور معذرت کرنے سے جھگڑے ختم ہو جاتے ہیں اور دوستی مضبوط ہوتی ہے۔", "په صبر، خبرو اترو او بښنې سره شخړې حل کیږي."),
                Class4LessonItem("🏅", "Sportsmanship on the Field", "کھیل کے میدان میں اسپورٹس مین اسپرٹ", "په لوبغالي کې د لوبې روحیه", "Respecting the referee's decision, congratulating the winning team, and encouraging teammates builds true character.", "ریفری کا فیصلہ تسلیم کرنا اور جیتنے والی ٹیم کو مبارکباد دینا اچھے کھلاڑی کی نشانی ہے۔", "د ریفري پریکړه منل او ګټونکې لوبډلې ته مبارکي ورکول د ښه لوبغاړي نښه ده.")
            ),
            exercises = listOf(
                Class4Exercise("What is the best way to resolve a disagreement with a classmate or teammate?", "ہم جماعت یا ساتھی کھلاڑی کے ساتھ اختلاف ختم کرنے کا بہترین طریقہ کیا ہے؟", "له ټولګیوال سره د اختلاف د حل کولو غوره لاره کومه ده؟", listOf("Calm dialogue, mutual respect, and forgiveness", "Shouting and fighting", "Breaking rules", "Refusing to talk forever"), 0, "Peaceful dialogue and patience resolve conflicts constructively.", "نرمی سے بات چیت، باہمی احترام اور درگزر کرنا۔"),
                Class4Exercise("How should a good player react if the referee gives a decision against their team?", "اگر ریفری آپ کی ٹیم کے خلاف فیصلہ دے تو ایک اچھے کھلاڑی کو کیا کرنا چاہیے؟", "که ریفري ستاسو د لوبډلې خلاف پریکړه وکړي، یو ښه لوبغاړی باید څه وکړي؟", listOf("Accept the decision respectfully with sportsmanship", "Argue and fight", "Walk off the field", "Throw equipment"), 0, "True sportsmanship means respecting the rules and the referee.", "کھیل کے جذبے کے تحت احترام کے ساتھ فیصلہ تسلیم کرنا چاہیے۔")
            )
        ),
        Class4StageData(
            stageNumber = 7,
            titleEn = "Ch 7: Biomechanics in Sports",
            titleUr = "باب 7: بائیو مکینکس کا کھیلوں میں استعمال",
            titlePs = "اووم څپرکی: په لوبو کې بایو میخانیک",
            subtitleEn = "Pages 43–62 • Force, Balance, Centre of Gravity, Correct Posture in Walking, Running & Jumping",
            badgeEmoji = "🏃",
            color = Color(0xFF536DFE),
            lessons = listOf(
                Class4LessonItem("⚙️", "What is Biomechanics?", "بائیو مکینکس کیا ہے؟", "بایو میخانیک څه ته وایي؟", "Biomechanics studies the laws of mechanics and movement in living bodies to improve athletic performance and prevent injury.", "انسانی جسم کی حرکات پر طبیعیات کے اصولوں کے اطلاق کو بائیو مکینکس کہتے ہیں جس سے کھیل کی مہارت بہتر ہوتی ہے۔", "په انساني حرکتونو د فزیک د قوانینو پلي کولو ته بایو میخانیک وایي."),
                Class4LessonItem("🧍", "Correct Posture & Deformities", "درست جسمانی زاویہ (قامتی انداز) اور نقائص", "سمه فزیکي بڼه", "Sitting, standing, and walking straight prevents spinal curvature (Kyphosis/Կوبڑا پن, Lordosis, Scoliosis) and Flat Foot.", "سیدھا بیٹھنے اور چلنے سے ریڑھ کی ہڈی کے نقائص (کبڑا پن، کمر کا خم) اور چپٹے پاؤں سے بچاؤ ہوتا ہے۔", "سم ناسته او تګ د ملا د هډوکي له کوږوالي څخه ساتي.")
            ),
            exercises = listOf(
                Class4Exercise("How does studying Biomechanics help an athlete?", "بائیو مکینکس کا علم کھلاڑی کو کس طرح فائدہ پہنچاتا ہے؟", "بایو میخانیک له لوبغاړي سره څنګه مرسته کوي؟", listOf("Improves technique, efficiency, and prevents sports injuries", "Makes shoes heavier", "Stops breathing", "Reduces eyesight"), 0, "Biomechanics optimizes movement and reduces injury risk.", "اس سے کھلاڑی کی تکنیک بہتر ہوتی ہے اور چوٹ لگنے کا خطرہ کم ہوتا ہے۔"),
                Class4Exercise("Rounding of the upper back (hunchback) caused by habitually sitting hunched over is called:", "مسلسل جھک کر بیٹھنے سے کمر کے اوپری حصے میں خم آ جانے (کبڑا پن) کو کیا کہتے ہیں؟", "د ملا د پورتنۍ برخې کوږوالی (کبړه توب) څه بلل کیږي؟", listOf("Kyphosis (کبڑا پن)", "Good posture", "Flexibility", "Agility"), 0, "Kyphosis is an excessive outward curvature of the upper spine.", "اسے کبڑا پن (Kyphosis) کہتے ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 8,
            titleEn = "Ch 8: Physical Fitness",
            titleUr = "باب 8: جسمانی موزونیت (Physical Fitness)",
            titlePs = "اتم څپرکی: فزیکي چمتووالی (Physical Fitness)",
            subtitleEn = "Pages 63–68 • Speed, Strength, Endurance, Agility, Flexibility & Warm-Up",
            badgeEmoji = "🏋️",
            color = Color(0xFF1DE9B6),
            lessons = listOf(
                Class4LessonItem("🏋️", "Components of Physical Fitness", "جسمانی موزونیت کے اجزا", "د فزیکي فټنس برخې", "Five key components: Strength (طاقت), Endurance (قوتِ برداشت), Speed (رفتار), Flexibility (لچک), and Agility (چستی/پھرتی).", "طاقت، قوتِ برداشت، رفتار، لچک اور پھرتی جسمانی موزونیت کے پانچ بنیادی ستون ہیں۔", "ځواک، زغم، سرعت، انعطاف او چټکتیا د فزیکي فټنس برخې دي."),
                Class4LessonItem("🔥", "Warm-Up and Cool-Down", "وارم اپ (جسم گرمانا) اور کول ڈاؤن", "وارم اپ او کول ډاون", "Warming up before games increases blood flow to muscles and prevents cramps or muscle tears.", "کھیل شروع کرنے سے پہلے ہلکی دوڑ اور سٹریچنگ (Warm-up) پٹھوں کو کھچاؤ سے بچاتی ہے۔", "تر لوبې مخکې بدن تودول (Warm-up) عضلات له ټپي کیدو ساتي.")
            ),
            exercises = listOf(
                Class4Exercise("The ability of a player to change direction quickly and accurately while moving is called:", "تیر رفتاری سے حرکت کرتے ہوئے فوراً اور توازن کے ساتھ اپنی سمت بدلنے کی صلاحیت کو کیا کہتے ہیں؟", "د حرکت پر مهال په چټکۍ سره د لوري بدلولو وړتیا ته څه ویل کیږي؟", listOf("Agility (پھرتی / چستی)", "Sleepiness", "Dehydration", "Fatigue"), 0, "Agility is the ability to change body position/direction rapidly.", "اس صلاحیت کو پھرتی یا چستی (Agility) کہتے ہیں۔"),
                Class4Exercise("Why is it important to do Warm-up exercises before playing a sport?", "کھیل شروع کرنے سے پہلے وارم اپ (Warm-up) کرنا کیوں ضروری ہے؟", "تر لوبې مخکې وارم اپ کول ولې اړین دي؟", listOf("To prepare muscles and joints and prevent muscle injury", "To get tired before the match", "To break the rules", "To avoid drinking water"), 0, "Warm-up increases muscle temperature and elasticity, preventing injuries.", "پٹھوں اور جوڑوں کو حرکت کے لیے تیار کرنے اور کھچاؤ سے بچانے کے لیے۔")
            )
        ),
        Class4StageData(
            stageNumber = 9,
            titleEn = "Ch 9: Sports Skills",
            titleUr = "باب 9: کھیلوں کی مہارتیں (کرکٹ، فٹ بال، ہاکی، ایتھلیٹکس)",
            titlePs = "نهم څپرکی: د لوبو مهارتونه (کرکټ، فوټبال، هاکي، اتلټیکس)",
            subtitleEn = "Pages 69–75 • Cricket, Football, Hockey, Badminton & Athletics (Sprints & Long Jump)",
            badgeEmoji = "🏏",
            color = Color(0xFF00C853),
            lessons = listOf(
                Class4LessonItem("🏑", "Hockey & Football Fundamentals", "ہاکی اور فٹ بال کی بنیادی مہارتیں", "د هاکي او فوټبال مهارتونه", "Hockey is Pakistan's national game (11 players per team; skills: dribbling, push, hit,flick). Football also has 11 players (kicking, passing, heading, trapping).", "ہاکی پاکستان کا قومی کھیل ہے؛ ہاکی اور فٹ بال دونوں میں ایک ٹیم کے 11 کھلاڑی میدان میں ہوتے ہیں۔", "هاکي د پاکستان ملي لوبه ده؛ په هاکي او فوټبال دواړو کې ۱۱ لوبغاړي وي."),
                Class4LessonItem("🏏", "Cricket, Badminton & Athletics", "کرکٹ، بیڈمنٹن اور ایتھلیٹکس", "کرکټ، بېډمنټن او اتلټیکس", "Cricket skills include batting, bowling, fielding, and wicket-keeping. Athletics includes track events (100m, 4×100m relay) and field events (Long Jump, High Jump).", "کرکٹ میں بیٹنگ، باؤلنگ اور فیلڈنگ جبکہ ایتھلیٹکس میں دوڑیں اور لمبی/اونچی چھلانگ شامل ہیں۔", "په کرکټ کې توپ وهنه او توپ اچونه او په اتلټیکس کې ځغاسته او ټوپ وهل شامل دي.")
            ),
            exercises = listOf(
                Class4Exercise("Which is the National Game of Pakistan, and how many players play on the field per team?", "پاکستان کا قومی کھیل کون سا ہے اور اس کی ایک ٹیم میں کتنے کھلاڑی میدان میں کھیلتے ہیں؟", "د پاکستان ملي لوبه کومه ده او په یوه لوبډله کې څو لوبغاړي لوبیږي؟", listOf("Field Hockey — 11 players", "Table Tennis — 2 players", "Golf — 1 player", "Chess — 2 players"), 0, "Field Hockey is Pakistan's national sport with 11 players per team.", "پاکستان کا قومی کھیل ہاکی ہے جس میں 11 کھلاڑی ہوتے ہیں۔"),
                Class4Exercise("In Athletics, what are the 4 phases of the Long Jump?", "ایتھلیٹکس میں لمبی چھلانگ (Long Jump) کے چار مراحل کون سے ہیں؟", "په اتلټیکس کې د اوږده ټوپ (Long Jump) څلور پړاوونه کوم دي؟", listOf("Approach run, Take-off, Flight, and Landing", "Batting, Bowling, Fielding, Catching", "Serving, Smashing, Drop, Net", "Swimming, Diving, Floating, Rowing"), 0, "Long Jump consists of Approach run, Take-off, Flight in air, and Landing in the pit.", "دوڑ کر آنا (Approach)، ٹیک آف، ہوا میں پرواز اور اترنا (Landing)۔")
            )
        )
    )

    // =========================================================================
    // 9. ISLAMIAT CLASS 6 (All 29 Lessons across 7 Babs — Pages 1–147)
    // =========================================================================
    val islamiatStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Bab 1 (Lesson 1–5): Quran & Hadith",
            titleUr = "باب اول: قرآنِ مجید، حفظ و ترجمہ، حدیثِ نبوی ﷺ اور مسنون دعائیں",
            titlePs = "لومړی باب: قرآن مجید، نبوي حدیث او مسنونې دعاګانې",
            subtitleEn = "Pages 1–9 • Quranic Translation, Memorization, 10 Ahadith & Daily Duas",
            badgeEmoji = "📖",
            color = Color(0xFF00C853),
            lessons = listOf(
                Class4LessonItem("📖", "Quranic Verses & Supplications", "قرآنی آیات کا ترجمہ اور دعائیں", "د قرآني آیاتونو ژباړه او دعاګانې", "Reciting the Holy Quran with Tajweed and understanding its translation guides our daily lives.", "قرآن مجید کی تجوید کے ساتھ تلاوت اور ترجمہ سمجھ کر عمل کرنا دنیا و آخرت کی کامیابی ہے۔", "د قرآن کریم تلاوت او په ژباړه پوهیدل د دنیا او آخرت بریالیتوب دی."),
                Class4LessonItem("✨", "Hadith Nabawi ﷺ", "احادیثِ مبارکہ", "نبوي احادیث", "Rasoolullah ﷺ said: 'The best among you are those who have the best manners and character' and 'Cleanliness is half of faith'.", "نبی کریم ﷺ نے فرمایا: تم میں سے بہترین وہ ہے جس کے اخلاق سب سے اچھے ہیں۔", "رسول الله ﷺ فرمایلي: په تاسو کې غوره هغه دی چې اخلاق یې ښه وي.")
            ),
            exercises = listOf(
                Class4Exercise("According to Hadith, what is 'Half of Faith' (شطر الإيمان)?", "حدیثِ مبارکہ کے مطابق کون سی چیز 'نصف ایمان' ہے؟", "د حدیث شریف له مخې کوم شی نیم ایمان دی؟", listOf("Cleanliness and Purity (الطهور شطر الإيمان)", "Wealth", "Sleep", "Anger"), 0, "The Prophet ﷺ said: 'Purity/Cleanliness is half of faith.'", "پاکیزگی اور صفائی نصف ایمان ہے۔"),
                Class4Exercise("Which Surah is the opening chapter of the Holy Quran?", "قرآن مجید کی سب سے پہلی سورت کون سی ہے؟", "د قرآن کریم لومړی سورت کوم دی؟", listOf("Surah Al-Fatihah", "Surah Al-Ikhlas", "Surah An-Nas", "Surah Al-Fil"), 0, "Surah Al-Fatihah is the opening chapter of the Quran.", "سورۃ الفاتحہ قرآن مجید کی پہلی سورت ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Bab 2.1: Importance & Effects of Tawheed",
            titleUr = "باب دوم (1): توحید کی اہمیت اور اثرات",
            titlePs = "دویم باب (1): د توحید اهمیت او اغیزې",
            subtitleEn = "Pages 10–14 • Oneness of Allah, Bravery, Self-Respect & Freedom from Shirk",
            badgeEmoji = "☝️",
            color = Color(0xFF1DE9B6),
            lessons = listOf(
                Class4LessonItem("☝️", "Concept of Tawheed", "عقیدہ توحید کا مفہوم", "د توحید عقیده", "Tawheed means believing that Allah Almighty is One in His Essence, Attributes, and Rights of Worship, with no partner.", "توحید کا مطلب ہے کہ اللہ تعالیٰ اپنی ذات، صفات اور عبادت میں یکتا ہے اور اس کا کوئی شریک نہیں۔", "توحید دا دی چې الله تعالی په خپل ذات او صفاتو کې یو دی."),
                Class4LessonItem("🦁", "Effects of Tawheed on Human Life", "انسانی زندگی پر توحید کے اثرات", "پر انساني ژوند د توحید اغیزې", "Belief in Tawheed creates self-respect, bravery, humility, trust in Allah (Tawakkul), and peace of heart.", "عقیدہ توحید انسان میں خودداری، بہادری، عاجزی اور اللہ پر توکل پیدا کرتا ہے۔", "د توحید عقیده په انسان کې زړورتیا، عزت نفس او پر الله توکل پیدا کوي.")
            ),
            exercises = listOf(
                Class4Exercise("What is the opposite of Tawheed that Allah never forgives without repentance?", "توحید کی ضد کیا ہے جسے اللہ تعالیٰ توبہ کے بغیر معاف نہیں فرماتا؟", "د توحید ضد څه شی دی؟", listOf("Shirk (شرک)", "Sabr", "Shukr", "hijrah"), 0, "Shirk (associating partners with Allah) is the greatest sin and opposite of Tawheed.", "شرک توحید کی ضد اور سب سے بڑا گناہ ہے۔"),
                Class4Exercise("How does firm belief in Tawheed affect a believer's character?", "پختہ عقیدہ توحید مومن کی شخصیت پر کیا اثر ڈالتا ہے؟", "په توحید کلک ایمان پر مومن څه اغیزه کوي؟", listOf("Makes him brave, fearless of anyone except Allah, and humble", "Makes him proud and cruel", "Makes him lazy", "Makes him hopeless"), 0, "A believer in Tawheed bows only before Allah and becomes brave and humble.", "توحید مومن کو غیر اللہ کے خوف سے آزاد، بہادر اور عاجز بناتی ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Bab 2.2: Prophethood & Khatm-e-Nabuwwat",
            titleUr = "باب دوم (2): نبوت و رسالت اور ختمِ نبوت",
            titlePs = "دویم باب (2): نبوت او رسالت",
            subtitleEn = "Pages 15–19 • Role of Prophets, Miracles & Finality of Prophethood",
            badgeEmoji = "🕌",
            color = Color(0xFF00E5FF),
            lessons = listOf(
                Class4LessonItem("🌟", "Need for Prophets (Anbiya)", "انبیائے کرام علیہم السلام کی بعثت کا مقصد", "د پیغمبرانو د رالیږلو موخه", "Allah sent about 124,000 Prophets from Hazrat Adam (AS) to Hazrat Muhammad ﷺ to guide humanity to the straight path.", "اللہ تعالیٰ نے انسانوں کی ہدایت کے لیے حضرت آدمؑ سے لے کر حضرت محمد ﷺ تک کم و بیش ایک لاکھ چوبیس ہزار انبیا مبعوث فرمائے۔", "الله تعالی د انسانانو د لارښوونې لپاره پیغمبران رالیږلي دي."),
                Class4LessonItem("🕋", "Khatam-un-Nabiyyin ﷺ", "عقیدہ ختمِ نبوت", "د ختم نبوت عقیده", "Hazrat Muhammad ﷺ is the last and final Prophet of Allah (Khatam-un-Nabiyyin). No prophet will come after him.", "حضرت محمد رسول اللہ ﷺ اللہ کے آخری نبی اور رسول ہیں، آپ ﷺ کے بعد کوئی نبی نہیں آئے گا۔", "حضرت محمد ﷺ د الله تعالی وروستی نبی او رسول دی.")
            ),
            exercises = listOf(
                Class4Exercise("Who was the first Prophet of Allah Almighty?", "اللہ تعالیٰ کے سب سے پہلے نبی کون تھے؟", "د الله تعالی لومړی پیغمبر څوک و؟", listOf("Hazrat Adam (AS)", "Hazrat Nuh (AS)", "Hazrat Ibrahim (AS)", "Hazrat Musa (AS)"), 0, "Hazrat Adam (AS) was the first human and first Prophet of Allah.", "حضرت آدم علیہ السلام اللہ کے پہلے نبی تھے۔"),
                Class4Exercise("What does 'Khatam-un-Nabiyyin' (خاتم النبیین) mean?", "'خاتم النبیین' کا کیا معنی ہے؟", "د 'خاتم النبیین' مانا څه ده؟", listOf("The Seal / Last of the Prophets (Hazrat Muhammad ﷺ)", "The first king", "Traveller", "Historian"), 0, "Khatam-un-Nabiyyin means Hazrat Muhammad ﷺ is the final Prophet of Allah.", "خاتم النبیین کا مطلب ہے کہ حضرت محمد ﷺ آخری نبی ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Bab 2.3–2.5: Ibadah, Taharat & Salah",
            titleUr = "باب دوم (3 تا 5): عبادات کا جامع تصور، طہارت و پاکیزگی اور نماز کی فرضیت",
            titlePs = "دویم باب (3–5): عبادت، طهارت او د لمانځه فرضیت",
            subtitleEn = "Pages 20–34 • Comprehensive Concept of Worship, Wudu, Ghusl, Tayammum & Five Daily Prayers",
            badgeEmoji = "🧎",
            color = Color(0xFF2979FF),
            lessons = listOf(
                Class4LessonItem("💧", "Taharat: Wudu, Ghusl & Tayammum", "طہارت و پاکیزگی (وضو، غسل اور تیمم)", "طهارت: اودس، غسل او تیمم", "There are 4 Faraiz in Wudu and 3 Faraiz in Ghusl. When water is unavailable or harmful in illness, Tayammum with clean earth is permitted.", "وضو میں ۴ فرض اور غسل میں ۳ فرض ہیں۔ پانی نہ ملنے یا بیماری میں پاک مٹی سے تیمم کیا جاتا ہے۔", "په اودس کې ۴ فرضه او په غسل کې ۳ فرضه دي."),
                Class4LessonItem("🧎", "Salah: Pillar of Islam", "نماز کی فرضیت اور اہمیت", "د لمانځه فرضیت او اهمیت", "Salah was made obligatory on the Night of Mi'raj. It is the first deed questioned on the Day of Judgment and prevents indecency.", "نماز شبِ معراج کو فرض ہوئی، یہ دین کا ستون ہے اور قیامت کے دن سب سے پہلے نماز کا حساب ہوگا۔", "لمونځ د دین ستنه ده او د قیامت په ورځ به لومړی د لمانځه پوښتنه کیږي.")
            ),
            exercises = listOf(
                Class4Exercise("How many Faraiz (obligatory acts) are there in Wudu and Ghusl respectively?", "وضو اور غسل میں بالترتیب کتنے فرض ہیں؟", "په اودس او غسل کې په ترتیب سره څو فرضونه دي؟", listOf("4 in Wudu and 3 in Ghusl", "2 in Wudu and 5 in Ghusl", "1 in each", "10 in each"), 0, "Wudu has 4 Faraiz (washing face, arms, masah of head, washing feet) and Ghusl has 3 Faraiz.", "وضو میں ۴ اور غسل میں ۳ فرض ہیں۔"),
                Class4Exercise("Which act of worship will be questioned first on the Day of Judgment?", "قیامت کے دن بندے سے سب سے پہلے کس عمل کا حساب لیا جائے گا؟", "د قیامت په ورځ به له بنده څخه لومړی د کوم عمل پوښتنه کیږي؟", listOf("Salah (نماز)", "Trade", "Travel", "Poetry"), 0, "Salah (Prayer) is the first act of worship to be accounted for on Judgment Day.", "قیامت کے دن سب سے پہلے نماز کا حساب لیا جائے گا۔")
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Bab 3.1–3.2: Madani Society & State of Madinah",
            titleUr = "باب سوم (1–2): مدنی معاشرے اور ریاستِ مدینہ کا قیام",
            titlePs = "دریم باب (1–2): د مدینې ټولنې او اسلامي دولت جوړول",
            subtitleEn = "Pages 35–43 • Construction of Masjid-e-Nabawi, Muwakhat-e-Madinah & Charter of Madinah",
            badgeEmoji = "🕌",
            color = Color(0xFF00E676),
            lessons = listOf(
                Class4LessonItem("🕌", "Masjid-e-Nabawi & Suffah", "تعمیرِ مسجد نبوی ﷺ اور صفہ", "جومات نبوي او صفه", "Upon arriving in Madinah, Rasoolullah ﷺ built Masjid-e-Nabawi, which served as a place of worship, school (Suffah), and community centre.", "مدینہ منورہ پہنچ کر نبی کریم ﷺ نے مسجدِ نبوی تعمیر فرمائی اور اصحابِ صفہ کے لیے پہلی درسگاہ قائم کی۔", "رسول الله ﷺ په مدینه کې جومات نبوي او د صفې مدرسه جوړه کړه."),
                Class4LessonItem("🤝", "Muwakhat (Brotherhood) & Mithaq-e-Madinah", "مواخاتِ مدینہ اور میثاقِ مدینہ", "د مدینې ورورولي او تړون", "Rasoolullah ﷺ established brotherhood between the Muhajireen and Ansar, and signed the Charter of Madinah for peaceful coexistence.", "آپ ﷺ نے مہاجرین اور انصار کے درمیان رشتہ اخوت (مواخات) قائم فرمایا اور میثاقِ مدینہ تحریر فرمایا۔", "رسول الله ﷺ د مهاجرینو او انصارو ترمنځ ورورولي (مواخات) ټینګه کړه.")
            ),
            exercises = listOf(
                Class4Exercise("Between which two groups did Rasoolullah ﷺ establish the bond of Brotherhood (مواخاتِ مدینہ)?", "نبی کریم ﷺ نے مدینہ منورہ میں کن دو گروہوں کے درمیان مواخات (بھائی چارہ) قائم فرمایا؟", "رسول الله ﷺ په مدینه کې د کومو دوو ډلو ترمنځ ورورولي ټینګه کړه؟", listOf("Muhajireen and Ansar (مہاجرین اور انصار)", "Romans and Persians", "Rich and Kings", "Traders only"), 0, "The Ansar of Madinah shared their homes and wealth with their Muhajireen brothers from Makkah.", "مہاجرینِ مکہ اور انصارِ مدینہ کے درمیان مواخات قائم ہوئی۔"),
                Class4Exercise("What was the name of the residential platform in Masjid-e-Nabawi that served as the first Islamic university?", "مسجدِ نبوی ﷺ میں واقع اس چبوترے کا کیا نام تھا جو اسلام کی پہلی اقامتی درسگاہ تھا؟", "په جومات نبوي کې د هغې چبوترې نوم څه و چې د اسلام لومړی درسځای و؟", listOf("Suffah (صفہ)", "Mina", "Arafat", "Badr"), 0, "Suffah was the platform where Companions (Ashab-us-Suffah) studied Quran and Hadith.", "اس چبوترے کو 'صفہ' اور وہاں پڑھنے والے صحابہ کو اصحابِ صفہ کہتے تھے۔")
            )
        ),
        Class4StageData(
            stageNumber = 6,
            titleEn = "Bab 3.3–3.4: Jihad, Battle of Badr & Battle of Uhud",
            titleUr = "باب سوم (3–4): جہاد، غزوہ بدر اور غزوہ اُحد",
            titlePs = "دریم باب (3–4): جهاد، د بدر غزا او د احد غزا",
            subtitleEn = "Pages 44–57 • Defence of Madinah, Battle of Badr (2 AH) & Battle of Uhud (3 AH)",
            badgeEmoji = "⚔️",
            color = Color(0xFFFF6D00),
            lessons = listOf(
                Class4LessonItem("⚔️", "Battle of Badr (17 Ramadan, 2 AH)", "غزوہ بدر (۱۷ رمضان ۲ ہجری)", "د بدر غزا (۲ هجري)", "In the Battle of Badr (Yawm-ul-Furqan), 313 poorly equipped Muslims defeated 1,000 Quraish soldiers with Allah's help.", "غزوہ بدر میں ۳۱۳ نہتے مسلمانوں نے اللہ کی مدد سے قریش کے ۱۰۰۰ کے لشکر کو شکست دی۔", "په بدر غزا کې ۳۱۳ مسلمانانو د قریشو ۱۰۰۰ کسیز لښکر ته ماتې ورکړه."),
                Class4LessonItem("⛰️", "Battle of Uhud (Shawwal, 3 AH)", "غزوہ اُحد (۳ ہجری)", "د احد غزا (۳ هجري)", "Fought near Mount Uhud in 3 AH (700 Muslims vs 3,000 Quraish). It taught the vital lesson of strictly obeying the Prophet's ﷺ command.", "غزوہ احد ۳ ہجری میں پیش آیا جس سے ہمیں ہر حال میں رسول اللہ ﷺ کے حکم کی پابندی کا عظیم سبق ملتا ہے۔", "د احد غزا په ۳ هجري کال کې وشوه او د رسول الله ﷺ د امر د منلو درس راکوي.")
            ),
            exercises = listOf(
                Class4Exercise("When did the Battle of Badr take place, and how many Muslim companions participated?", "غزوہ بدر کب پیش آیا اور اس میں مسلمانوں کی تعداد کتنی تھی؟", "د بدر غزا کله وشوه او د مسلمانانو شمیر پکې څو و؟", listOf("17 Ramadan, 2 AH — 313 Muslims", "10 Muharram, 5 AH — 5000 Muslims", "1 Shawwal, 8 AH — 100 Muslims", "12 Rabi-ul-Awwal, 1 AH"), 0, "The Battle of Badr was fought on 17th Ramadan, 2 AH with 313 Muslim companions.", "۱۷ رمضان ۲ ہجری کو ۳۱۳ صحابہ کرامؓ نے غزوہ بدر میں حصہ لیا۔"),
                Class4Exercise("Which martyred uncle of Rasoolullah ﷺ was given the title 'Sayyid-ush-Shuhada' in the Battle of Uhud?", "غزوہ احد میں نبی کریم ﷺ کے کس چچا نے جامِ شہادت نوش کیا جنہیں 'سید الشہداء' کا لقب ملا؟", "د احد په غزا کې د رسول الله ﷺ کوم تره شهید شو چې د 'سید الشهداء' لقب یې وموند؟", listOf("Hazrat Hamza bin Abdul Muttalib (RA)", "Abu Lahab", "Abu Jahl", "Waleed"), 0, "Hazrat Hamza (RA) was martyred in the Battle of Uhud and is titled Sayyid-ush-Shuhada.", "حضرت حمزہ بن عبدالمطلب رضی اللہ عنہ۔")
            )
        ),
        Class4StageData(
            stageNumber = 7,
            titleEn = "Bab 3.5–3.7: Love for Rasoolullah ﷺ, Kindness to Children & Keeping Promises",
            titleUr = "باب سوم (5–7): نبی اکرم ﷺ سے محبت و اطاعت، بچوں سے حسنِ سلوک اور ایفائے عہد",
            titlePs = "دریم باب (5–7): له رسول الله ﷺ سره مینه، له ماشومانو سره شفقت او پر ژمنه وفا",
            subtitleEn = "Pages 58–70 • Obedience to Sunnah, Affection for Children & Fulfilling Covenants",
            badgeEmoji = "❤️",
            color = Color(0xFFFF4081),
            lessons = listOf(
                Class4LessonItem("❤️", "Love & Obedience to Rasoolullah ﷺ", "نبی اکرم ﷺ سے محبت اور اطاعت", "له رسول الله ﷺ سره مینه او اطاعت", "True faith requires loving Rasoolullah ﷺ more than everything else and following his Sunnah.", "کامل ایمان کے لیے ضروری ہے کہ ہمیں نبی کریم ﷺ سے دنیا کی ہر چیز سے بڑھ کر محبت ہو اور ہم آپ ﷺ کی سنت پر عمل کریں۔", "د کامل ایمان لپاره له رسول الله ﷺ سره تر هر څه زیاته مینه او د سنتو پیروي اړینه ده."),
                Class4LessonItem("👶", "Kindness to Children & Keeping Promises", "بچوں سے شفقت اور ایفائے عہد", "له ماشومانو سره شفقت او د ژمنې پوره کول", "Rasoolullah ﷺ greeted children first, loved Hazrat Hasan (RA) & Hazrat Husain (RA), and always fulfilled every promise (e.g., Treaty of Hudaybiyyah).", "آپ ﷺ بچوں کو سلام میں پہل کرتے، ان سے پیار فرماتے اور دشمنوں کے ساتھ بھی ہمیشہ وعدہ پورا فرماتے تھے۔", "رسول الله ﷺ به پر ماشومانو سلام اچاوه او تل به یې خپله ژمنه پوره کوله.")
            ),
            exercises = listOf(
                Class4Exercise("According to the Holy Quran (Surah Al-Imran: 31), what is the true proof of loving Allah?", "قرآن مجید کے مطابق اللہ تعالیٰ سے محبت کا سچا ثبوت کیا ہے؟", "د قرآن کریم له مخې له الله تعالی سره د مینې ریښتینې نښه څه ده؟", listOf("Following and obeying Rasoolullah ﷺ", "Accumulating gold", "Building palaces", "Arguing with people"), 0, "'Say (O Prophet): If you love Allah, then follow me; Allah will love you.'", "رسول اللہ ﷺ کی اتباع اور اطاعت کرنا۔"),
                Class4Exercise("What does 'Ifa-e-Ahd' (ایفائے عہد) mean?", "'ایفائے عہد' کا کیا مطلب ہے؟", "د 'ایفای عهد' مانا څه ده؟", listOf("Fulfilling promises and agreements faithfully", "Breaking promises", "Forgetting duties", "Speaking harshly"), 0, "Ifa-e-Ahd means keeping and fulfilling one's promises.", "وعدہ اور عہد کو پورا کرنا۔")
            )
        ),
        Class4StageData(
            stageNumber = 8,
            titleEn = "Bab 4: Akhlaq & Adab (Good Habits & Avoiding Evil)",
            titleUr = "باب چہارم: اخلاق و آداب (مشاورت، صبر و تحمل، آدابِ سفر اور بُری عادات سے اجتناب)",
            titlePs = "څلورم باب: اخلاق او آداب (مشوره، صبر، د سفر آداب او له بدو عادتونو ځان ساتل)",
            subtitleEn = "Pages 71–89 • Mutual Consultation (Shura), Patience, Etiquettes of Roads/Travel & Avoiding Theft/Fraud",
            badgeEmoji = "🤝",
            color = Color(0xFFAA00FF),
            lessons = listOf(
                Class4LessonItem("🗣️", "Importance of Consultation (مشاورت) & Patience (صبر)", "مشاورت کی اہمیت اور صبر و تحمل", "د مشورې اهمیت او صبر", "Islam commands mutual consultation (وأمرهم شورى بينهم). Rasoolullah ﷺ consulted companions at Badr, Uhud, and Khandaq.", "مشورہ کرنے سے برکت ہوتی ہے؛ نبی کریم ﷺ نے غزوہ خندق میں حضرت سلمان فارسیؓ کے مشورے سے خندق کھدوائی۔", "رسول الله ﷺ به په مهمو چارو کې له صحابه کرامو سره مشوره کوله."),
                Class4LessonItem("🛣️", "Etiquettes of Roads/Travel & Avoiding Theft/Deceit", "راستے اور سفر کے آداب اور چوری و دھوکہ دہی سے اجتناب", "د لارې آداب او له غلا او دوکې ځان ساتل", "Remove harmful things from the road, lower your gaze, return greetings, and strictly avoid theft, usurpation (غصب), and cheating.", "راستے سے تکلیف دہ چیز ہٹانا صدقہ ہے، جبکہ چوری، غصب اور دھوکہ دہی حرام ہیں۔", "له لارې څخه د مضر شي لرې کول صدقه ده او غلا او دوکه حرام دي.")
            ),
            exercises = listOf(
                Class4Exercise("In the Battle of Trench (غزوہ احزاب/خندق), whose advice did Rasoolullah ﷺ accept to dig a trench?", "غزوہ احزاب میں کس صحابی کے مشورے پر مدینہ کے گرد خندق کھودی گئی؟", "د خندق په غزا کې د کوم صحابي په مشوره خندق وکیندل شو؟", listOf("Hazrat Salman Farsi (RA)", "Abu Sufyan", "Waleed", "Marhab"), 0, "Hazrat Salman Farsi (RA) suggested digging a defensive trench around Madinah.", "حضرت سلمان فارسی رضی اللہ عنہ کے مشورے پر خندق کھودی گئی۔"),
                Class4Exercise("Rasoolullah ﷺ said: 'He who cheats/deceives us is ___.'", "نبی کریم ﷺ نے فرمایا: 'جس نے ہمیں دھوکہ دیا وہ ___۔'", "رسول الله ﷺ فرمایلي: 'چا چې موږ ته دوکه راکړه هغه ___.'", listOf("Not one of us (مَنْ غَشَّنَا فَلَيْسَ مِنَّا)", "A rich trader", "Very clever", "Forgiven without repentance"), 0, "Deceit and cheating are strictly forbidden in Islam.", "فرمایا: مَنْ غَشَّنَا فَلَيْسَ مِنَّا (جو ہمیں دھوکہ دے وہ ہم میں سے نہیں)۔")
            )
        ),
        Class4StageData(
            stageNumber = 9,
            titleEn = "Bab 5: Social Dealings (Huqooq-ul-Ibad, Justice & Welfare)",
            titleUr = "باب پنجم: حسنِ معاملات و معاشرت (حقوق العباد، عدل و احسان اور رفاہِ عامہ)",
            titlePs = "پنځم باب: د بندګانو حقوق، عدل او احسان او عامه خیر ښېګڼه",
            subtitleEn = "Pages 90–103 • Rights of Parents, Siblings & Relatives, Adl-o-Ihsan & Public Welfare",
            badgeEmoji = "⚖️",
            color = Color(0xFFFFAB00),
            lessons = listOf(
                Class4LessonItem("👨‍👩‍👧‍👦", "Huqooq-ul-Ibad: Parents, Siblings & Relatives", "والدین، بہن بھائیوں اور رشتہ داروں کے حقوق", "د مور او پلار او خپلوانو حقوق", "Serving parents with humility, caring for brothers and sisters, and maintaining ties of kinship (صلہ رحمی) bring barakah in life.", "والدین کی خدمت، بہن بھائیوں سے محبت اور رشتہ داروں سے صلہ رحمی سے رزق اور عمر میں برکت ہوتی ہے۔", "د مور او پلار خدمت او له خپلوانو سره ښه چلند په رزق او عمر کې برکت اچوي."),
                Class4LessonItem("⚖️", "Justice (عدل), Benevolence (احسان) & Public Welfare", "عدل و احسان اور رفاہِ عامہ", "عدل، احسان او عامه خدمت", "'Indeed, Allah commands justice and benevolence' (An-Nahl: 90). Digging wells (like Bir-e-Rumah by Hazrat Usman RA), planting trees, and building schools/hospitals are Sadaqah Jariyah.", "اللہ تعالیٰ عدل اور احسان کا حکم دیتا ہے۔ کنواں کھدوانا، درخت لگانا اور شفاخانے بنانا صدقہ جاریہ ہے۔", "الله تعالی د عدل او احسان امر کوي؛ کوهی کیندل او ونه کرل صدقه جاریه ده.")
            ),
            exercises = listOf(
                Class4Exercise("Giving someone their exact due right is called 'Adl' (عدل). What is giving MORE than their right and forgiving their shortcoming called?", "کسی کو اس کا پورا حق دینا 'عدل' کہلاتا ہے؛ حق سے زیادہ دینا اور اپنا حق معاف کر دینا کیا کہلاتا ہے؟", "چاته له خپل حق څخه زیات ورکول او بښنه کول څه بلل کیږي؟", listOf("Ihsan (احسان)", "Zulm", "Bukhl", "Israf"), 0, "Ihsan means going above and beyond justice in kindness and generosity.", "حق سے بڑھ کر بھلائی کرنے اور درگزر کرنے کو 'احسان' کہتے ہیں۔"),
                Class4Exercise("Which companion bought the well of 'Bir-e-Rumah' in Madinah and dedicated it free for public welfare?", "مدینہ منورہ میں پانی کا کنواں 'بئرِ رومہ' کس صحابی نے خرید کر رفاہِ عامہ کے لیے وقف کیا؟", "په مدینه منوره کې د 'بیر رومه' کوهی کوم صحابي واخیست او د عامو خلکو لپاره یې وقف کړ؟", listOf("Hazrat Usman Ghani (RA)", "Abu Jahl", "Qarun", "Fir'aun"), 0, "Hazrat Usman (RA) purchased Bir-e-Rumah and made its water free for everyone.", "حضرت عثمان غنی رضی اللہ عنہ نے بئرِ رومہ خرید کر وقف فرمایا۔")
            )
        ),
        Class4StageData(
            stageNumber = 10,
            titleEn = "Bab 6: Luminaries of Islam (Ahl-e-Bait, Sahaba, Saints & Heroes)",
            titleUr = "باب ششم: ہدایت کے سرچشمے اور مشاہیرِ اسلام",
            titlePs = "شپږم باب: د اسلام مشهور شخصیتونه او اتلان",
            subtitleEn = "Pages 104–139 • Ummahat-ul-Momineen, Aulad-e-Nabawi, Hazrat Fatima (RA), Sahaba, Sufis, Scholars & Hazrat Khalid bin Waleed (RA)",
            badgeEmoji = "🌟",
            color = Color(0xFF536DFE),
            lessons = listOf(
                Class4LessonItem("👑", "Ummahat-ul-Momineen & Hazrat Fatima-tuz-Zahra (RA)", "امہات المومنین، اولادِ نبوی ﷺ اور حضرت فاطمۃ الزہراؓ", "امهات المؤمنین او حضرت فاطمه (رض)", "Hazrat Khadijah (RA), Hazrat Sawdah (RA), and Hazrat Aisha (RA) are Mothers of the Believers. Hazrat Fatima (RA) is Sayyidat-un-Nisa ahl-il-Jannah.", "حضرت خدیجہؓ، حضرت سودہؓ اور حضرت عائشہؓ امہات المومنین ہیں، اور حضرت فاطمہؓ جنت کی عورتوں کی سردار ہیں۔", "حضرت خدیجه، حضرت سوده او حضرت عائشه (رض) د مومنانو میندې دي او حضرت فاطمه (رض) د جنت د ښځو سرداره ده."),
                Class4LessonItem("⚔️", "Sahaba, Sufis, Scholars & Saifullah Hazrat Khalid bin Waleed (RA)", "صحابہ کرامؓ، صوفیا، علما اور حضرت خالد بن ولیدؓ", "صحابه کرام، پوهان او حضرت خالد بن ولید (رض)", "Hazrat Khalid bin Waleed (RA) received the title 'Saifullah' (Sword of Allah) in the Battle of Mu'tah and never lost a single battle.", "غزوہ موتہ میں بہادری پر حضرت خالد بن ولیدؓ کو 'سیف اللہ' (اللہ کی تلوار) کا لقب ملا۔", "حضرت خالد بن ولید (رض) ته د 'سیف الله' (د الله توره) لقب ورکړل شو.")
            ),
            exercises = listOf(
                Class4Exercise("Which daughter of Rasoolullah ﷺ holds the title 'Sayyidat-un-Nisa Ahl-il-Jannah' (Leader of the Women of Paradise)?", "نبی کریم ﷺ کی کس صاحبزادی کو 'سیدۃ نساء اہل الجنۃ' (جنت کی عورتوں کی سردار) کا لقب حاصل ہے؟", "د رسول الله ﷺ کومې لور ته د جنت د ښځو د سردارې لقب ورکړل شوی دی؟", listOf("Hazrat Fatima-tuz-Zahra (RA)", "Halima", "Hind", "Asma"), 0, "Hazrat Fatima (RA) is the leader of the women of Paradise.", "حضرت فاطمۃ الزہرا رضی اللہ عنہا۔"),
                Class4Exercise("Which great Muslim commander was given the title 'Saifullah' (Sword of Allah) by Rasoolullah ﷺ?", "رسول اللہ ﷺ نے کس عظیم اسلامی سپہ سالار کو 'سیف اللہ' (اللہ کی تلوار) کا لقب عطا فرمایا؟", "رسول الله ﷺ کوم ستر اسلامي سپه سالار ته د 'سیف الله' لقب ورکړ؟", listOf("Hazrat Khalid bin Waleed (RA)", "Rustam", "Heraclius", "Chosroes"), 0, "Hazrat Khalid bin Waleed (RA) was titled Saifullah at the Battle of Mu'tah.", "حضرت خالد بن ولید رضی اللہ عنہ کو سیف اللہ کا لقب ملا۔")
            )
        ),
        Class4StageData(
            stageNumber = 11,
            titleEn = "Bab 7: Environment & Rights of Animals in Islam",
            titleUr = "باب ہفتم: انسانی زندگی میں ماحول کی اہمیت اور جانوروں کے حقوق",
            titlePs = "اووم باب: په اسلام کې د چاپیریال ساتنه او د حیواناتو حقوق",
            subtitleEn = "Pages 140–147 • Protecting Trees/Water, Planting as Sadaqah & Mercy to Animals",
            badgeEmoji = "🌿",
            color = Color(0xFF26A69A),
            lessons = listOf(
                Class4LessonItem("🌳", "Protecting the Environment in Islam", "اسلام میں ماحول اور شجرکاری کی اہمیت", "په اسلام کې د چاپیریال او ونو اهمیت", "Islam forbids wasting water even at a flowing river, encourages planting trees as Sadaqah, and prohibits polluting roads and water sources.", "اسلام بہتے دریا پر بھی پانی ضائع کرنے سے منع فرماتا ہے اور درخت لگانے کو صدقہ قرار دیتا ہے۔", "اسلام د اوبو له ضایع کولو منع کوي او د ونو کرل صدقه بولي."),
                Class4LessonItem("🕊️", "Mercy and Rights of Animals", "جانوروں کی اہمیت اور ان کے حقوق", "د حیواناتو حقوق او پر هغوی رحم", "Islam commands feeding animals, not overloading them, and treating them mercifully. A person was forgiven by Allah for giving water to a thirsty dog.", "اسلام جانوروں کو بھوکا پیاسا رکھنے، ان پر طاقت سے زیادہ بوجھ لادنے اور انہیں اذیت دینے سے سختی سے منع کرتا ہے۔", "اسلام پر حیواناتو د رحم کولو او له ظلم څخه د ډډه کولو امر کوي.")
            ),
            exercises = listOf(
                Class4Exercise("According to Hadith, if a Muslim plants a tree and a human, bird, or animal eats from it, what is it counted as?", "حدیثِ نبوی ﷺ کے مطابق اگر کوئی مسلمان درخت لگائے اور اس سے انسان، پرندہ یا جانور کھائے تو یہ کیا شمار ہوتا ہے؟", "د حدیث شریف له مخې که یو مسلمان ونه وکري او مرغه یا انسان ترې وخوري، دا څه حسابیږي؟", listOf("Sadaqah (صدقہ / Charity)", "Tax", "Loss", "Debt"), 0, "Planting trees is counted as continuous charity (Sadaqah).", "یہ اس مسلمان کے لیے صدقہ شمار ہوتا ہے۔"),
                Class4Exercise("What does Islam teach us about treating animals?", "جانوروں کے ساتھ سلوک کے بارے میں اسلام ہمیں کیا تعلیم دیتا ہے؟", "اسلام موږ ته له حیواناتو سره د چلند په اړه څه امر کوي؟", listOf("Give them food/water on time, do not overload them, and treat them with mercy", "Overload them", "Cage wild birds for fun", "Keep them thirsty"), 0, "Islam strictly commands kindness and mercy towards all animals and birds.", "جانوروں کے کھانے پینے کا خیال رکھنا اور ان پر رحم کرنا۔")
            )
        )
    )

    // =========================================================================
    // 10. MUTALA-E-QURAN CLASS 6 (M-Q) (All 20 Lessons — Pages 6–118)
    // =========================================================================
    val mqStages = listOf(
        Class4StageData(
            stageNumber = 1,
            titleEn = "Lesson 1–2: Etiquettes of Tilawat & Surah Al-Fatihah",
            titleUr = "سبق 1 تا 2: تلاوت و ترجمہ قرآن کے آداب اور سُوْرَةُ الْفَاتِحَةِ",
            titlePs = "۱–۲ لوست: د تلاوت آداب او سورة الفاتحه",
            subtitleEn = "Pages 6–10 • Adab of Recitation, Ta'awwuz, Tasmiyah & Surah Al-Fatihah Translation",
            badgeEmoji = "🕋",
            color = Color(0xFF00C853),
            lessons = listOf(
                Class4LessonItem("🧼", "Etiquettes of Quran Recitation", "تلاوتِ قرآن حکیم کے آداب", "د قرآن کریم د تلاوت آداب", "Perform Wudu, sit respectfully facing Qiblah, recite Ta'awwuz & Tasmiyah, read slowly with Tajweed, and ponder over the meanings.", "باوضو ہو کر قبلہ رخ بیٹھنا، تعوذ و تسمیہ پڑھنا اور ٹھہر ٹھہر کر خشوع و خضوع سے تلاوت کرنا۔", "په اودس سره قبلې ته مخامخ ناسته او په تجوید تلاوت کول."),
                Class4LessonItem("🕋", "Surah Al-Fatihah (Umm-ul-Kitab)", "سورۃ الفاتحہ کا تعارف اور ترجمہ", "د سورة الفاتحې ژباړه", "Surah Al-Fatihah is a Makki Surah with 7 verses. It teaches praise of Allah, Tawheed, belief in the Day of Judgment (يوم الدين), and the prayer for the Straight Path (الصراط المستقيم).", "سورۃ الفاتحہ مکی سورت ہے جس کی ۷ آیات ہیں؛ اس میں اللہ کی حمد اور سیدھے راستے کی دعا سکھائی گئی ہے۔", "سورة الفاتحه ۷ آیتونه لري او د مستقیمې لارې دعا پکې ده.")
            ),
            exercises = listOf(
                Class4Exercise("What is the meaning of 'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ' in Surah Al-Fatihah?", "سورۃ الفاتحہ کی آیت 'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ' کا کیا ترجمہ ہے؟", "په سورة الفاتحه کې د 'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَ' ژباړه څه ده؟", listOf("Guide us to the Straight Path (ہمیں سیدھے راستے پر چلا)", "Create the heavens", "Send the rain", "Divide the sea"), 0, "It means 'Guide us to the Straight Path'.", "اس کا ترجمہ ہے: 'ہمیں سیدھے راستے کی ہدایت عطا فرما'۔"),
                Class4Exercise("How many verses (Ayat) are there in Surah Al-Fatihah?", "سورۃ الفاتحہ میں کل کتنی آیات ہیں؟", "سورة الفاتحه ټول څو آیتونه لري؟", listOf("7 verses", "3 verses", "10 verses", "15 verses"), 0, "Surah Al-Fatihah consists of 7 verses.", "سورۃ الفاتحہ میں ۷ آیات ہیں۔")
            )
        ),
        Class4StageData(
            stageNumber = 2,
            titleEn = "Lesson 3–4: Surah Al-A'raf (Verses 1–99)",
            titleUr = "سبق 3 تا 4: سُوْرَةُ الْاَعْرَافِ (آیات 1 تا 99)",
            titlePs = "۳–۴ لوست: سورة الاعراف (آیتونه ۱ تر ۹۹)",
            subtitleEn = "Pages 11–30 • Story of Hazrat Adam (AS), Iblis's Arrogance & Prophets Nuh, Hud, Salih, Lut & Shu'aib (AS)",
            badgeEmoji = "📜",
            color = Color(0xFF009624),
            lessons = listOf(
                Class4LessonItem("🌿", "Creation of Hazrat Adam (AS) & Prayer of Repentance", "قصہ حضرت آدم علیہ السلام اور دعائے استغفار", "د حضرت آدم (ع) کیسه او د توبې دعا", "Iblis refused to bow out of pride, whereas Hazrat Adam (AS) and Hazrat Hawwa (AS) repented with: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا...'", "ابلیس نے تکبر کیا جبکہ حضرت آدمؑ اور حضرت حواؑ نے رب کے حضور توبہ کی دعا مانگی۔", "ابلیس تکبر وکړ او حضرت آدم (ع) له الله تعالی څخه بښنه وغوښته."),
                Class4LessonItem("🐪", "Stories of Prophets Nuh, Hud, Salih, Lut & Shu'aib (AS)", "حضرت نوحؑ، ہودؑ، صالحؑ، لوطؑ اور شعیبؑ کا تذکرہ", "د حضرت نوح، هود، صالح، لوط او شعیب (ع) کیسې", "Each Prophet invited his nation (Aad, Thamud, Madyan) to worship Allah alone and give full measure in trade.", "انبیائے کرامؑ نے اپنی قوموں کو توحید اور ناپ تول میں انصاف کی دعوت دی۔", "پیغمبرانو خپل قومونه توحید او په راکړه ورکړه کې انصاف ته راوبلل.")
            ),
            exercises = listOf(
                Class4Exercise("Which nation was Hazrat Salih (AS) sent to, with the miracle of the She-Camel (ناقۃ اللہ)?", "حضرت صالح علیہ السلام کو معجزاتی اونٹنی (ناقۃ اللہ) کے ساتھ کس قوم کی طرف بھیجا گیا؟", "حضرت صالح (ع) کوم قوم ته د اوښې له معجزې سره واستول شو؟", listOf("Nation of Thamud (قومِ ثمود)", "Pharaoh of Egypt", "People of Babylon", "Romans"), 0, "Hazrat Salih (AS) was sent to the tribe of Thamud.", "حضرت صالحؑ قومِ ثمود کی طرف مبعوث ہوئے۔"),
                Class4Exercise("Which Prophet's nation (People of Madyan) was warned against cheating in weights and measures?", "کس نبی کی قوم (اہلِ مدین) کو ناپ تول میں کمی کرنے سے منع کیا گیا؟", "د کوم پیغمبر قوم (اهل مدین) په تله او پیمانه کې له کمي کولو منع شو؟", listOf("Hazrat Shu'aib (AS)", "Hazrat Yunus (AS)", "Hazrat Isa (AS)", "Hazrat Yahya (AS)"), 0, "Hazrat Shu'aib (AS) preached honesty in weights and measures to the people of Madyan.", "حضرت شعیب علیہ السلام نے قومِ مدین کو ناپ تول پورا کرنے کی تلقین فرمائی۔")
            )
        ),
        Class4StageData(
            stageNumber = 3,
            titleEn = "Lesson 5–6: Surah Al-A'raf (Verses 100–206)",
            titleUr = "سبق 5 تا 6: سُوْرَةُ الْاَعْرَافِ (آیات 100 تا 206)",
            titlePs = "۵–۶ لوست: سورة الاعراف (آیتونه ۱۰۰ تر ۲۰۶)",
            subtitleEn = "Pages 31–52 • Hazrat Musa (AS) & Pharaoh, Mount Tur, Covenant of Alast & Asma-ul-Husna",
            badgeEmoji = "🌊",
            color = Color(0xFF00BFA5),
            lessons = listOf(
                Class4LessonItem("🪄", "Hazrat Musa (AS) vs Pharaoh & the Magicians", "حضرت موسیٰ علیہ السلام اور فرعون کے جادوگر", "حضرت موسی (ع) او د فرعون کوډګر", "Allah gave Hazrat Musa (AS) the miracles of the Staff (عصا) and the Shining Hand (یدِ بیضا). Seeing the truth, the magicians fell in prostration and accepted faith.", "عصائے موسیٰؑ کا معجزہ دیکھ کر فرعون کے جادوگر سجدے میں گر گئے اور ایمان لے آئے۔", "د حضرت موسی (ع) معجزه چې کوډګرو ولیده نو سجدې ته پریوتل او ایمان یې راوړ."),
                Class4LessonItem("✨", "Covenant of Alast & Asma-ul-Husna", "عہدِ الست اور اسمائے حسنیٰ", "د الست تړون او اسمای حسنی", "'And to Allah belong the Most Beautiful Names (الأسماء الحسنى), so call upon Him by them' (7:180). Listen attentively when the Quran is recited (7:204).", "اللہ کے اچھے اچھے نام ہیں پس اسے انہی ناموں سے پکارو، اور جب قرآن پڑھا جائے تو غور سے سنو اور خاموش رہو۔", "کله چې قرآن لوستل کیږي نو غوږ ورته نیسئ او چوپ اوسئ.")
            ),
            exercises = listOf(
                Class4Exercise("What command does Surah Al-A'raf (Verse 204) give when the Holy Quran is being recited?", "سورۃ الاعراف آیت ۲۰۴ میں قرآن کی تلاوت کے وقت کیا حکم دیا گیا ہے؟", "د سورة الاعراف په ۲۰۴ آیت کې د قرآن د تلاوت پر مهال څه امر شوی دی؟", listOf("Listen to it attentively and remain silent so you may receive mercy", "Talk loudly", "Walk away", "Make noise"), 0, "'When the Quran is recited, listen to it attentively and be silent, so you may be shown mercy.'", "جب قرآن پڑھا جائے تو اسے غور سے سنو اور خاموش رہو تاکہ تم پر رحم کیا جائے۔"),
                Class4Exercise("What were the two main miracles given to Hazrat Musa (AS) in Pharaoh's court?", "فرعون کے دربار میں حضرت موسیٰ علیہ السلام کو کون سے دو بڑے معجزات عطا ہوئے؟", "په فرعون دربار کې حضرت موسی (ع) ته کومې دوه لویې معجزې ورکړل شوې؟", listOf("The Staff (عصا) and the Shining White Hand (یدِ بیضا)", "The She-Camel", "The Ark", "Iron melting"), 0, "The Staff turning into a serpent and the Shining Hand.", "عصائے موسیٰ اور یدِ بیضا (چمکتا ہوا ہاتھ)۔")
            )
        ),
        Class4StageData(
            stageNumber = 4,
            titleEn = "Lesson 7–9: Surah Ash-Shu'ara (Verses 1–227)",
            titleUr = "سبق 7 تا 9: سُوْرَةُ الشُّعَرَاءِ (آیات 1 تا 227)",
            titlePs = "۷–۹ لوست: سورة الشعراء (آیتونه ۱ تر ۲۲۷)",
            subtitleEn = "Pages 53–72 • Parting of the Red Sea, Duas of Hazrat Ibrahim (AS) & Truthfulness of the Quran",
            badgeEmoji = "🌊",
            color = Color(0xFF00E5FF),
            lessons = listOf(
                Class4LessonItem("🌊", "Hazrat Musa (AS) & Parting of the Sea (Verses 1–68)", "حضرت موسیٰؑ اور سمندر کا پھٹنا (آیات ۱ تا ۶۸)", "د سمندر څیرې کیدل", "When trapped before the sea, Hazrat Musa (AS) said: 'إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ' (Indeed, my Lord is with me; He will guide me). Allah parted the sea and saved Bani Isra'il.", "حضرت موسیٰؑ نے فرمایا: بے شک میرا رب میرے ساتھ ہے، وہ ضرور مجھے راستہ دکھائے گا۔", "حضرت موسی (ع) وفرمایل: بې شکه زما رب زما سره دی."),
                Class4LessonItem("🤲", "Duas of Hazrat Ibrahim (AS) & Revelation via Jibreel (AS)", "حضرت ابراہیمؑ کی دعائیں اور نزولِ قرآن (آیات ۶۹ تا ۲۲۷)", "د حضرت ابراهیم (ع) دعاګانې او د قرآن نزول", "Hazrat Ibrahim (AS) praised Allah: 'الَّذِي خَلَقَنِي فَهُوَ يَهْدِينِ... وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ' (And when I am ill, it is He Who cures me). The Quran was brought down by Ruh-ul-Ameen (Hazrat Jibreel AS).", "حضرت ابراہیمؑ نے فرمایا: وہی رب مجھے کھلاتا پلاتا ہے اور جب میں بیمار ہوتا ہوں تو وہی مجھے شفا دیتا ہے۔", "او کله چې زه ناروغه شم نو همغه الله ماته شفا راکوي.")
            ),
            exercises = listOf(
                Class4Exercise("In Surah Ash-Shu'ara, what is the meaning of Hazrat Ibrahim's (AS) words: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ'?", "سورۃ الشعراء میں حضرت ابراہیمؑ کے قول 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ' کا کیا ترجمہ ہے؟", "د 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ' ژباړه څه ده؟", listOf("And when I am ill, it is He (Allah) Who cures me", "When I travel", "When I sleep", "When I build"), 0, "It means: 'And when I am ill, it is He Who cures me.'", "اور جب میں بیمار ہوتا ہوں تو وہی (اللہ) مجھے شفا دیتا ہے۔"),
                Class4Exercise("In Surah Ash-Shu'ara (Verse 193), who is referred to as 'Ar-Ruh-ul-Ameen' (الرُّوحُ الْأَمِينُ) who brought down the Quran?", "سورۃ الشعراء میں 'الرُّوحُ الْأَمِينُ' (امانت دار روح) کس فرشتے کا لقب ہے جو وحی لے کر آئے؟", "په سورة الشعراء کې 'الروح الامین' د کومې پرښتې لقب دی؟", listOf("Hazrat Jibreel (AS)", "Hazrat Israfeel (AS)", "Hazrat Izraeel (AS)", "Hazrat Maalik (AS)"), 0, "Hazrat Jibreel (AS) is titled Ar-Ruh-ul-Ameen.", "حضرت جبرائیل علیہ السلام کو الروح الامین کہا گیا ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 5,
            titleEn = "Lesson 10–11: Surah As-Saffat (Verses 1–182)",
            titleUr = "سبق 10 تا 11: سُوْرَةُ الصّٰفّٰتِ (آیات 1 تا 182)",
            titlePs = "۱۰–۱۱ لوست: سورة الصافات (آیتونه ۱ تر ۱۸۲)",
            subtitleEn = "Pages 73–85 • Angels in Ranks, Great Sacrifice of Hazrat Ibrahim & Ismail (AS) & Hazrat Yunus (AS)",
            badgeEmoji = "🐑",
            color = Color(0xFFFFAB00),
            lessons = listOf(
                Class4LessonItem("🐑", "The Great Sacrifice of Hazrat Ibrahim & Hazrat Ismail (AS)", "حضرت ابراہیمؑ اور حضرت اسماعیلؑ کی عظیم قربانی", "د حضرت ابراهیم او اسماعیل (ع) لویه قرباني", "When Hazrat Ibrahim (AS) told his son about the dream, Hazrat Ismail (AS) replied: 'يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ' (O my father, do as you are commanded). Allah ransomed him with a great sacrifice.", "حضرت اسماعیلؑ نے فرمایا: ابا جان! آپ کو جو حکم ملا ہے کر گزریے، آپ مجھے ان شاء اللہ صبر کرنے والوں میں پائیں گے۔", "حضرت اسماعیل (ع) وویل: ای پلاره! هغه څه وکړه چې امر درته شوی دی."),
                Class4LessonItem("🐋", "Story of Hazrat Yunus (AS)", "قصہ حضرت یونس علیہ السلام", "د حضرت یونس (ع) کیسه", "Inside the belly of the fish, Hazrat Yunus (AS) glorified Allah (Tasbih), and Allah rescued him and grew a gourd plant (یقطین) over him.", "مچھلی کے پیٹ میں حضرت یونسؑ نے تسبیح پڑھی تو اللہ تعالیٰ نے انہیں نجات عطا فرمائی۔", "حضرت یونس (ع) د کب په خیټه کې د الله تسبیح وویله او الله تعالی وژغوره.")
            ),
            exercises = listOf(
                Class4Exercise("In memory of the great sacrifice of Hazrat Ibrahim (AS) and Hazrat Ismail (AS) mentioned in Surah As-Saffat, which festival do Muslims celebrate?", "سورۃ الصافات میں مذکور حضرت ابراہیمؑ اور حضرت اسماعیلؑ کی عظیم قربانی کی یاد میں مسلمان کون سی عید مناتے ہیں؟", "د حضرت ابراهیم او اسماعیل (ع) د قربانۍ په یاد مسلمانان کوم اختر لمانځي؟", listOf("Eid-ul-Adha (عید الاضحیٰ)", "Shab-e-Barat", "Ashura", "New Year"), 0, "Eid-ul-Adha commemorates the devotion and sacrifice of Hazrat Ibrahim and Ismail (AS).", "مسلمان ہر سال ذوالحج میں سنتِ ابراہیمی کے طور پر عید الاضحیٰ مناتے ہیں۔"),
                Class4Exercise("Which Prophet was swallowed by a giant fish and rescued by Allah because of his constant Tasbih (Glorification of Allah)?", "کون سے نبی کو مچھلی نے نگل لیا تھا اور کثرتِ تسبیح کی بدولت اللہ نے انہیں نجات دی؟", "کوم پیغمبر کب تیر کړی و او د تسبیح له برکته الله تعالی وژغوره؟", listOf("Hazrat Yunus (AS)", "Hazrat Dawood (AS)", "Hazrat Sulaiman (AS)", "Hazrat Zakariyya (AS)"), 0, "Hazrat Yunus (AS) was rescued from the belly of the whale.", "حضرت یونس علیہ السلام۔")
            )
        ),
        Class4StageData(
            stageNumber = 6,
            titleEn = "Lesson 12–15: Surahs Al-Fil, Quraish, Al-Ma'un & Al-Kawthar",
            titleUr = "سبق 12 تا 15: سورۃ الفیل، سورۃ قریش، سورۃ الماعون اور سورۃ الکوثر",
            titlePs = "۱۲–۱۵ لوست: سورة الفیل، قریش، الماعون او الکوثر",
            subtitleEn = "Pages 86–101 • Protection of Ka'bah from Abraha, Favours on Quraish, Helping Orphans & Pond of Kawthar",
            badgeEmoji = "🕋",
            color = Color(0xFF2979FF),
            lessons = listOf(
                Class4LessonItem("🐘", "Surah Al-Fil & Surah Quraish", "سورۃ الفیل اور سورۃ قریش", "سورة الفیل او سورة قریش", "In Surah Al-Fil, Allah destroyed Abraha's army of elephants with flocks of birds (أَبَابِيلَ) pelting stones of baked clay. Surah Quraish reminds Quraish of safe winter/summer trade journeys.", "سورۃ الفیل میں ابرہہ کے ہاتھیوں کے لشکر کو ابابیل پرندوں کے ذریعے تباہ کرنے کا بیان ہے۔", "په سورة الفیل کې د ابرهه د فیلانو لښکر د ابابیل مرغیو په وسیله هلاک شو."),
                Class4LessonItem("⛲", "Surah Al-Ma'un & Surah Al-Kawthar", "سورۃ الماعون اور سورۃ الکوثر", "سورة الماعون او سورة الکوثر", "Surah Al-Ma'un warns those who push away orphans, neglect prayers, and withhold small kindnesses. Surah Al-Kawthar (shortest Surah, 3 verses) grants Rasoolullah ﷺ abundant good and Pond of Kawthar.", "سورۃ الماعون میں یتیموں اور مسکینوں کا حق دبانے اور نماز میں غفلت کی مذمت ہے، جبکہ سورۃ الکوثر قرآن کی سب سے چھوٹی سورت ہے۔", "سورة الکوثر د قرآن کریم ترټولو لنډ سورت دی چې ۳ آیتونه لري.")
            ),
            exercises = listOf(
                Class4Exercise("Which Surah describes how Allah protected the Holy Ka'bah from Abraha's army of elephants?", "کس سورت میں اللہ تعالیٰ کے ابرہہ کے ہاتھیوں کے لشکر سے خانہ کعبہ کی حفاظت کرنے کا واقعہ بیان ہوا ہے؟", "په کوم سورت کې د ابرهه له لښکر څخه د کعبې شریفې د ساتنې کیسه راغلې ده؟", listOf("Surah Al-Fil (سورۃ الفیل)", "Surah Al-Lahab", "Surah Al-Falaq", "Surah Al-Ikhlas"), 0, "Surah Al-Fil ('The Elephant') narrates the destruction of Abraha's army.", "سورۃ الفیل میں اصحاب الفیل کا واقعہ بیان ہوا ہے۔"),
                Class4Exercise("Which is the shortest Surah of the Holy Quran, consisting of 3 verses?", "قرآن مجید کی سب سے چھوٹی سورت کون سی ہے جس میں ۳ آیات ہیں؟", "د قرآن کریم ترټولو لنډ سورت کوم دی؟", listOf("Surah Al-Kawthar (سورۃ الکوثر)", "Surah Al-A'raf", "Surah Ash-Shu'ara", "Surah As-Saffat"), 0, "Surah Al-Kawthar is the shortest Surah of the Holy Quran.", "سورۃ الکوثر قرآن مجید کی سب سے چھوٹی سورت ہے۔")
            )
        ),
        Class4StageData(
            stageNumber = 7,
            titleEn = "Lesson 16–20: Surahs Al-Kafirun, An-Nasr, Al-Lahab, Al-Ikhlas, Al-Falaq & An-Nas",
            titleUr = "سبق 16 تا 20: سورۃ الکافرون، النصر، اللہب، الاخلاص، الفلق اور الناس",
            titlePs = "۱۶–۲۰ لوست: سورة الکافرون، النصر، اللهب، الاخلاص، الفلق او الناس",
            subtitleEn = "Pages 102–118 • Pure Tawheed, Victory of Makkah, Fate of Abu Lahab & Mu'awwidhatayn",
            badgeEmoji = "🌙",
            color = Color(0xFFAA00FF),
            lessons = listOf(
                Class4LessonItem("🏳️", "Surah Al-Kafirun, Surah An-Nasr & Surah Al-Lahab", "سورۃ الکافرون، سورۃ النصر اور سورۃ اللہب", "سورة الکافرون، النصر او اللهب", "Surah Al-Kafirun declares complete rejection of Shirk ('لَكُمْ دِينُكُمْ وَلِيَ دِينِ'). Surah An-Nasr announces Allah's help and the Conquest of Makkah. Surah Al-Lahab condemns Abu Lahab's hostility.", "سورۃ الکافرون شرک سے براءت کا اعلان ہے اور سورۃ النصر فتحِ مکہ کی خوشخبری دیتی ہے۔", "سورة الکافرون له شرک څخه د بېزارۍ اعلان دی او سورة النصر د مکې د فتحې زیری دی."),
                Class4LessonItem("🛡️", "Surah Al-Ikhlas, Surah Al-Falaq & Surah An-Nas", "سورۃ الاخلاص اور معوذتین (الفلق و الناس)", "سورة الاخلاص، الفلق او الناس", "Surah Al-Ikhlas equals one-third of the Quran in reward and defines pure Tawheed. Surah Al-Falaq and Surah An-Nas (Mu'awwidhatayn) seek Allah's refuge from all external and internal evils.", "سورۃ الاخلاص ثواب میں تہائی قرآن کے برابر ہے اور سورۃ الفلق و الناس (معوذتین) ہر شر اور حسد سے اللہ کی پناہ مانگنے کی سورتیں ہیں۔", "سورة الاخلاص د دریمې برخې قرآن ثواب لري او الفلق او الناس ته معوذتین وایي.")
            ),
            exercises = listOf(
                Class4Exercise("Reciting which Surah carries the reward of reciting one-third (1/3) of the Holy Quran?", "کس سورت کی تلاوت کا ثواب ایک تہائی (1/3) قرآن مجید پڑھنے کے برابر ہے؟", "د کوم سورت تلاوت د دریمې برخې (1/3) قرآن کریم ثواب لري؟", listOf("Surah Al-Ikhlas (سورۃ الاخلاص)", "Surah Al-Lahab", "Surah Al-Fil", "Surah Al-Ma'un"), 0, "Surah Al-Ikhlas is equal to one-third of the Quran because it summarizes pure Tawheed.", "سورۃ الاخلاص کا ثواب تہائی قرآن کے برابر ہے۔"),
                Class4Exercise("Which two Surahs at the end of the Holy Quran are collectively called 'Al-Mu'awwidhatayn' (المعوذتين)?", "قرآن مجید کی آخری دو سورتوں کو مجموعی طور پر کیا کہا جاتا ہے جن میں اللہ کی پناہ مانگی گئی ہے؟", "د قرآن کریم وروستیو دوو سورتونو (الفلق او الناس) ته یوځای څه ویل کیږي؟", listOf("Surah Al-Falaq and Surah An-Nas", "Surah Al-Fil and Quraish", "Surah Al-A'raf and Shu'ara", "Surah Al-Kawthar and Nasr"), 0, "Surah Al-Falaq and Surah An-Nas are the Mu'awwidhatayn (Two Surahs of seeking refuge).", "سورۃ الفلق اور سورۃ الناس کو 'معوذتین' کہتے ہیں۔")
            )
        )
    )
}
