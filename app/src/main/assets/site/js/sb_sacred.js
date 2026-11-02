/* Respect for sacred names in games (owner's rule, 2026-11-02).
 * 1. Islamiat, Islamiat Ikhtiari, Islamic History, Arabic, Nazira Quran and Mutalia-e-Quran have no games at all.
 * 2. Every other game (the Games tab, the page arcade, the picture words) never uses a question, a sentence or a word that names
 *    Allah, a Prophet, the Quran, a Companion or a sacred place or act of worship: such a sentence is left out of the game whole,
 *    so a sacred name can never be a target, a wrong choice, a falling word or a shot.
 * Pure: the browser reads window.SBSacred, the Node tests require() it. */
(function (root) {
  'use strict';
  // subject keys (CLS<N>_BOOKS keys, the MCQ bank's subject slugs, the Munawar series keys) that have no games
  const NO_GAMES = /^(?:isl|islc|islopt|iski|islamiat.*|ikhtiari|ishist|islhist|quran|mq|nazira|arabic|mun-isl|mun-waqf|mun-nazira|mun-quran|mun-arabic)$/i;
  const noGames = subj => NO_GAMES.test(String(subj || '').replace(/^cls\d+-/, ''));

  // Arabic-script text is compared without its vowel marks and with one form of each letter
  const fold = s => String(s || '').normalize('NFC')
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[آأإٱ]/g, 'ا').replace(/ى/g, 'ی').replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[ةۃ]/g, 'ہ');
  const EN = new RegExp('\\b(?:' + [
    'allah', 'god', 'gods', 'lord', 'almighty', 'creator', 'divine', 'holy', 'sacred', 'prophets?', 'prophethood', 'messengers?', 'apostles?', 'rasool', 'rasul', 'nabi',
    'muhammad', 'mohammad', 'mohammed', 'muhammed', 'ahmad', 'mustafa', 'pbuh', 'peace be upon',
    'quran', "qur'?an", 'koran', 'surah?', 'ayat', 'ayah', 'hadith', 'hadees', 'ahadith', 'sunnah?', 'seerah', 'sirah', 'shariah?', 'fiqh', 'tafseer', 'tafsir',
    'islam', 'islamic', 'muslims?', 'iman', 'imaan', 'tauheed', 'tawheed', 'tawhid', 'risalat', 'akhirat', 'salah', 'salat', 'namaz', 'prayers?', 'fasting', 'ramadan', 'ramzan', 'zakat', 'zakah', 'hajj', 'umrah', 'eid',
    'kaaba', "ka'?bah", 'makkah', 'mecca', 'madinah', 'medina', 'mosques?', 'masjid', 'harram?', 'haram',
    'angels?', 'jibrael', 'jibreel', 'gabriel', 'caliphs?', 'khalifa', 'companions?', 'sahaba', 'sahabi', 'ahl ?e ?bait', 'imam', 'hazrat', 'syedna', 'sayyidina',
    'abu bakr', 'umar', 'usman', 'uthman', 'ali', 'hassan', 'hasan', 'hussain', 'husain', 'fatima', 'fatimah', 'khadija', 'khadijah', 'ayesha', 'aisha',
    'adam', 'nuh', 'noah', 'ibrahim', 'abraham', 'ismail', 'ishmael', 'ishaq', 'isaac', 'yaqub', 'jacob', 'yusuf', 'joseph', 'musa', 'moses', 'harun', 'aaron', 'dawood', 'dawud', 'david',
    'sulaiman', 'solomon', 'yunus', 'jonah', 'ayub', 'zakariya', 'yahya', 'isa', 'jesus', 'christ', 'mary', 'maryam', 'luqman', 'idris', 'hud', 'saleh', 'shuaib', 'lut',
    'bible', 'torah', 'taurat', 'zabur', 'injeel', 'injil', 'gospel', 'heaven', 'paradise', 'jannah', 'jannat', 'hell', 'jahannam', 'satan', 'shaitan', 'devil', 'iblis', 'worship', 'blessed', 'bismillah', 'inshallah', 'mashallah', 'alhamdulillah', 'subhanallah'
  ].join('|') + ')\\b', 'i');
  // Urdu, Pashto and Arabic (compared after fold())
  const AR = [
    'الله', 'اللہ', 'لله', 'اللھ', 'خدا', 'خدای', 'خدائ', 'رب', 'ربّ', 'رحمان', 'رحمن', 'رحیم', 'سبحان', 'تعالی', 'تعالیٰ', 'جل', 'عزوجل',
    'رسول', 'نبی', 'نبي', 'انبیا', 'انبیاء', 'پیغمبر', 'پېغمبر', 'پیامبر', 'محمد', 'احمد', 'مصطفی', 'مصطفیٰ', 'حضور', 'آنحضرت', 'انحضرت', 'ﷺ', 'صلی', 'صلي', 'علیہ', 'علیه', 'عليه', 'سلام', 'السلام', 'رضی', 'رضي', 'رح', 'رحمہ', 'رحمة',
    'قرآن', 'قران', 'فرقان', 'سورۃ', 'سورة', 'سوره', 'سورت', 'آیت', 'ایت', 'آیات', 'ایات', 'حدیث', 'حديث', 'احادیث', 'سنت', 'سیرت', 'شریعت', 'فقہ', 'تفسیر', 'کتاب اللہ',
    'اسلام', 'اسلامی', 'مسلمان', 'مسلم', 'ایمان', 'توحید', 'رسالت', 'آخرت', 'اخرت', 'نماز', 'صلوۃ', 'صلاة', 'روزہ', 'روژه', 'رمضان', 'زکوۃ', 'زکوٰۃ', 'زکات', 'حج', 'عمرہ', 'عید', 'عبادت', 'دعا', 'ذکر',
    'کعبہ', 'کعبه', 'كعبة', 'مکہ', 'مکه', 'مكة', 'مدینہ', 'مدینه', 'مسجد', 'جومات', 'حرم',
    'فرشتہ', 'فرشتے', 'فرښته', 'ملائکہ', 'جبرائیل', 'جبریل', 'خلیفہ', 'خلفا', 'صحابہ', 'صحابی', 'صحابي', 'اہل بیت', 'امام', 'حضرت', 'سیدنا', 'ولی', 'ولي',
    'ابوبکر', 'ابو بکر', 'عمر', 'عثمان', 'علی', 'علي', 'حسن', 'حسین', 'فاطمہ', 'فاطمه', 'خدیجہ', 'عائشہ', 'عایشه',
    'آدم', 'ادم', 'نوح', 'ابراہیم', 'ابراهیم', 'اسماعیل', 'اسحاق', 'یعقوب', 'یوسف', 'موسی', 'موسیٰ', 'ہارون', 'داؤد', 'داود', 'سلیمان', 'یونس', 'ایوب', 'زکریا', 'یحیی', 'عیسی', 'عیسیٰ', 'مریم', 'لقمان', 'ادریس', 'ہود', 'صالح', 'شعیب', 'لوط',
    'انجیل', 'تورات', 'زبور', 'جنت', 'جہنم', 'دوزخ', 'شیطان', 'ابلیس', 'بسم', 'ان شاء', 'ماشاء', 'الحمد', 'استغفر', 'آمین'
  ].map(fold);
  // a whole Arabic-script word (or two-word name) in the text: letters around it end the match
  const AR_RE = new RegExp('(?:^|[^\\u0621-\\u06FF])(?:' + [...new Set(AR)].sort((a, b) => b.length - a.length).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?=$|[^\\u0621-\\u06FF])');
  const HONORIFIC = /[ﷺﷻﷲؐ-ؔ]|\(\s*(?:pbuh|saw|swt|ra|as)\s*\)/i;

  function isSacred(text) {
    const t = String(text == null ? '' : text);
    if (!t) return false;
    if (HONORIFIC.test(t) || EN.test(t)) return true;
    return /[؀-ۿ]/.test(t) && AR_RE.test(fold(t));
  }
  // the text with every sentence (or line) that names something sacred taken out
  function stripSacred(text) {
    return String(text == null ? '' : text).split('\n').map(line => isSacred(line)
      ? line.split(/(?<=[.!?؟۔।])\s+/).filter(s => !isSacred(s)).join(' ')
      : line).filter(l => l.trim()).join('\n');
  }

  root.SBSacred = {noGames, isSacred, stripSacred, NO_GAMES};
  if (typeof module !== 'undefined' && module.exports) module.exports = root.SBSacred;
})(typeof window !== 'undefined' ? window : globalThis);
