/* sb_medium.js — every subject speaks the language it is taught in.
 *
 *  KPK books come in English, Urdu, Pashto and Arabic medium. The subject workspace used to label every
 *  book in English ("Lessons", "MCQ 1", "Short Questions", "Show answer and explanation"), even an Urdu
 *  Mutalia-e-Quran. Here the medium of the open subject is read from its own text (Qur'anic ayat, word
 *  drawers and buttons left out) and the workspace chrome follows it:
 *    • tab names, sub-tabs, section headings, question badges and answer buttons are shown in that language;
 *    • the content is laid out right-to-left for Urdu, Pashto and Arabic;
 *    • text sizes are even: one size for book text, one for Qur'anic ayat (nested ayat no longer grow to 36px);
 *    • "Question in English / Pashto" pop-outs that only repeat the question are removed.
 *    • two-language card titles ("Cell · خلیہ") keep only the subject's own language.
 *  English-medium subjects otherwise stay exactly as they are.
 */
(function () {
  'use strict';
  if (window.SBMedium) return;

  // ---------------------------------------------------------------- the words
  // [English (regex source, matched as a whole phrase), Urdu, Pashto, Arabic]
  const PHRASES = [
    ['Board SLO Based & MCQs, SQs, LQs', 'بورڈ ایس ایل او: کثیر الانتخابی، مختصر اور تفصیلی سوالات', 'بورډ SLO: څو ځوابه، لنډې او اوږدې پوښتنې', 'أسئلة المجلس: اختيار من متعدد، قصيرة وطويلة'],
    ['Cover, credits and contents', 'سرورق، اعترافات اور فہرست', 'پوښ، منښتې او فهرست', 'الغلاف والشكر والفهرس'],
    ['Front matter and contents', 'ابتدائی صفحات اور فہرست', 'لومړنۍ پاڼې او فهرست', 'الصفحات الأولى والفهرس'],
    ['Summary & Key Points', 'خلاصہ اور اہم نکات', 'لنډیز او مهم ټکي', 'الملخص والنقاط المهمة'],
    ['Important Concepts', 'اہم تصورات', 'مهم مفاهیم', 'المفاهيم المهمة'],
    ['Solved Textbook Exercises', 'درسی کتاب کی حل شدہ مشقیں', 'د درسي کتاب حل شوي تمرینونه', 'تمارين الكتاب المحلولة'],
    ['Solved Exercises', 'حل شدہ مشقیں', 'حل شوي تمرینونه', 'التمارين المحلولة'],
    ['Textbook Exercises', 'درسی کتاب کی مشقیں', 'د درسي کتاب تمرینونه', 'تمارين الكتاب'],
    ['Word Stats', 'الفاظ کا شمار', 'د لغاتو شمېر', 'إحصاء الكلمات'],
    ['Lessons', 'اسباق', 'لوستونه', 'الدروس'],
    ['Lesson text', 'سبق', 'لوست', 'نص الدرس'],
    ['Concepts & Examples', 'تصورات اور مثالیں', 'مفاهیم او بېلګې', 'المفاهيم والأمثلة'],
    ['Summary & Formulas', 'خلاصہ اور فارمولے', 'لنډیز او فورمولونه', 'الملخص والقوانين'],
    ['Fill in, True/False & Matching', 'خالی جگہ، درست/غلط اور ملاپ', 'تش ځایونه، سم/ناسم او جوړه', 'املأ الفراغ، صح/خطأ والمطابقة'],
    ['Multiple Choice Questions', 'کثیر الانتخابی سوالات', 'څو ځوابه پوښتنې', 'أسئلة الاختيار من متعدد'],
    ['Short Questions', 'مختصر سوالات', 'لنډې پوښتنې', 'أسئلة قصيرة'],
    ['Long Questions', 'تفصیلی سوالات', 'اوږدې پوښتنې', 'أسئلة طويلة'],
    ['Numericals', 'عددی سوالات', 'عددي پوښتنې', 'المسائل العددية'],
    ['Activities', 'سرگرمیاں', 'فعالیتونه', 'الأنشطة'],
    ['Activity', 'سرگرمی', 'فعالیت', 'نشاط'],
    ['MCQs', 'کثیر الانتخابی سوالات', 'څو ځوابه پوښتنې', 'اختيار من متعدد'],
    ['Show answer and explanation', 'جواب اور وضاحت دیکھیں', 'ځواب او تشریح وګورئ', 'عرض الإجابة والشرح'],
    ['Show answer', 'جواب دیکھیں', 'ځواب وګورئ', 'عرض الإجابة'],
    ['Show Solution', 'حل دیکھیں', 'حل وګورئ', 'عرض الحل'],
    ['Correct answer', 'درست جواب', 'سم ځواب', 'الإجابة الصحيحة'],
    ['Textbook answer', 'درسی کتاب کا جواب', 'د درسي کتاب ځواب', 'إجابة الكتاب'],
    ['SpaceBook worked answer \\(checked against the printed question\\)', 'اسپیس بک کا حل (چھپے ہوئے سوال کے مطابق)', 'د سپیس بک حل (د چاپ شوې پوښتنې سره سم)', 'حل سبيس بوك (وفق السؤال المطبوع)'],
    ['SpaceBook-authored learning answer', 'اسپیس بک کا تیار کردہ جواب', 'د سپیس بک چمتو شوی ځواب', 'إجابة من إعداد سبيس بوك'],
    ['From the textbook', 'درسی کتاب سے', 'له درسي کتاب څخه', 'من الكتاب المدرسي'],
    ['Key points from the textbook', 'درسی کتاب کے اہم نکات', 'د درسي کتاب مهم ټکي', 'النقاط المهمة من الكتاب'],
    ['Practice from the textbook', 'درسی کتاب سے مشق', 'له درسي کتاب څخه تمرین', 'تدريب من الكتاب'],
    ['Click any sentence to see its translation just below it\\. Point at a word for its meaning\\.', 'کسی جملے پر کلک کریں تو اس کا ترجمہ اس کے نیچے آ جائے گا۔ کسی لفظ پر ماؤس رکھیں تو اس کے معنی نظر آئیں گے۔', 'په هره جمله کلیک وکړئ، ژباړه به یې لاندې ښکاره شي. د کلمې د مانا لپاره پرې موږک کېږدئ.', 'انقر على أي جملة لترى ترجمتها تحتها مباشرة. أشر إلى كلمة لمعرفة معناها.'],
    ['Full screen', 'پوری اسکرین', 'بشپړه پرده', 'ملء الشاشة'],
    ['SLOs', 'حاصلاتِ تعلّم', 'د زده کړې پایلې', 'نواتج التعلم'],
    ['Grammar', 'قواعد', 'ګرامر', 'القواعد'],
    ['Vocabulary', 'ذخیرۂ الفاظ', 'لغتونه', 'المفردات'],
    ['Doing', 'عملی کام', 'عملي کار', 'نشاط عملي']
  ];
  // numbered badges: "MCQ 3", "SQ 2", "LQ 1", "Q4", "Question 5", "Topic 2"
  const BADGES = [
    [/^MCQ\s*(\d+)$/i, ['سوال', 'پوښتنه', 'سؤال']],
    [/^SQ\s*(\d+)$/i, ['مختصر سوال', 'لنډه پوښتنه', 'سؤال قصير']],
    [/^LQ\s*(\d+)$/i, ['تفصیلی سوال', 'اوږده پوښتنه', 'سؤال طويل']],
    [/^(?:Q|Question)\s*(\d+)$/i, ['سوال', 'پوښتنه', 'سؤال']],
    [/^Topic\s*(\d+(?:\.\d+)*)$/i, ['موضوع', 'موضوع', 'الموضوع']],
    [/^Activity\s*(\d+)$/i, ['سرگرمی', 'فعالیت', 'نشاط']],
    [/^Exercise\s*([\d.]+)$/i, ['مشق', 'تمرین', 'تمرين']]
  ];
  // single-word card badges
  const WORDS = {
    Lesson: ['سبق', 'لوست', 'الدرس'], Exercise: ['مشق', 'تمرین', 'التمرين'], Summary: ['خلاصہ', 'لنډیز', 'الملخص'],
    Example: ['مثال', 'بېلګه', 'مثال'], Glossary: ['فرہنگ', 'لغتنامه', 'المعجم'], Book: ['کتاب', 'کتاب', 'الكتاب'],
    Part: ['حصہ', 'برخه', 'الجزء'], Activity: ['سرگرمی', 'فعالیت', 'نشاط']
  };
  const COL = {ur: 1, ps: 2, ar: 3};
  const compiled = PHRASES.map(p => [new RegExp('(^|[^A-Za-z])' + p[0] + '(?![A-Za-z])', 'g'), p]);

  // ---------------------------------------------------------------- which medium
  const ARABIC_LETTER = /[ء-يٱ-ۓۺ-ۿ]/g;
  const LATIN_LETTER = /[A-Za-z]/g;
  const URDU_ONLY = /[ٹڈڑںھہےۓ]/g;
  const PASHTO_ONLY = /[ټځڅډړږښګڼېۍ]/g;
  // never book text: Qur'anic ayat, translation drawers, word pop-ups, buttons, badges
  const SKIP = '.sb-ayat, .lesson-sentence[lang="ar"], .sb-tri-drawer, .sh-sdrawer, .m5-tr, .m6-tr, .m7-tr, .m8-tr, .m11-tr, [id^="sent-trans-"], button, script, style, template, .sbq-alert, .sh-help, .math-badge, summary, .m5-hsub, .m6-hsub, .m7-hsub, .m8-hsub, .m11-hsub, .sbq-tag';
  // panels that hold a translation of the book text (an English lesson's Urdu / Pashto copy)
  const LANG_PANEL = /(?:^|[\s_-])(?:lang|translation|trans|urdu|pashto|ur|ps)(?:[\s_-]|$)|para-lang|lang-panel|tr-panel/i;
  function collect(root, keep) {
    const out = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const seen = new Map();
    let total = 0;
    while (walker.nextNode() && total < 60000) {
      const n = walker.currentNode, p = n.parentElement;
      if (!p || !n.nodeValue.trim()) continue;
      let ok = seen.get(p);
      if (ok === undefined) { ok = !p.closest(SKIP) && keep(p); seen.set(p, ok); }
      if (ok) { out.push(n.nodeValue); total += n.nodeValue.length; }
    }
    return out.join(' ').replace(/\s+/g, ' ');
  }
  // what a reader sees; when most of it sits in collapsed cards, every part that is not a translation panel
  function bookText(root) {
    const seen = collect(root, el => typeof el.checkVisibility !== 'function' || el.checkVisibility());
    if ((seen.match(/[A-Za-z\u0621-\u06FF]/g) || []).length >= 400) return seen;
    return collect(root, el => {
      for (let e = el; e && e !== root; e = e.parentElement) {
        if ((e.hidden || e.style.display === 'none') && LANG_PANEL.test(e.className + ' ' + (e.id || ''))) return false;
      }
      return true;
    });
  }
  function detect(text, min) {
    const a = (text.match(ARABIC_LETTER) || []).length, l = (text.match(LATIN_LETTER) || []).length;
    if (a + l < (min || 120)) return null;          // too little text to decide
    if (a < 1.5 * l) return 'en';
    const ps = (text.match(PASHTO_ONLY) || []).length;
    const ur = (text.match(URDU_LETTERS) || []).length;
    if (ps >= 2 && ps > ur * 0.15) return 'ps';
    if (!ur) return 'ar';                            // Arabic script with no ی ک ہ ے ں ٹ ڈ ڑ ھ: Arabic
    return 'ur';
  }
  const URDU_LETTERS = /[ٹڈڑںھہےۓیک]/g;
  // the open subject: its key and class come from the main tab buttons (switchSubjectTab('chem', …, 'cls9'))
  function subjectRef() {
    const b = document.querySelector('.math-nav-tabs .math-tab-btn[onclick*="switchSubjectTab"]');
    const m = b && (b.getAttribute('onclick') || '').match(/switchSubjectTab\('([^']+)'\s*,\s*'[^']*'\s*,\s*\d+\s*,\s*'([^']+)'/);
    if (m) return {key: m[1], cls: m[2]};
    // the Mathematics workspace has its own tabs (switchMathTab('lesson'))
    const math = document.querySelector('.math-nav-tabs .math-tab-btn[onclick*="switchMathTab"]');
    const cls = typeof state !== 'undefined' && state && state.selectedClass;
    return math && cls ? {key: 'math', cls} : null;
  }
  // a book is named in its own medium: chapter titles decide (an English lesson may show Urdu and Pashto
  // translations beside its text, so letter counts of the page alone cannot)
  function fromTitles(ref) {
    let list = [];
    try { list = (typeof getSubjectChapterList === 'function' && getSubjectChapterList(ref.key, ref.cls)) || []; } catch (e) { list = []; }
    const titles = list.map(ch => ch && (ch.title || ch.name || ch.titleEn || '')).join(' ').replace(/\$[^$]*\$/g, ' ');
    return detect(titles, 20);
  }
  const workspace = () => document.querySelector('.math-unified-view') || document.getElementById('subjTabContent');
  const cache = new Map();
  // language books are taught in their own language whatever their chapter titles say
  const FIXED = {urdu: 'ur', pashto: 'ps'};
  function mediumNow() {
    const ref = subjectRef();
    if (ref && FIXED[ref.key]) return FIXED[ref.key];
    const key = ref ? ref.cls + '|' + ref.key : null;
    if (key && cache.has(key)) return cache.get(key);
    const content = document.getElementById('subjTabContent') || document.getElementById('mathTabContent');
    let m = ref ? fromTitles(ref) : null;
    let sure = m && m !== 'en';
    // Mathematics with English chapter titles is English medium: its Urdu / Pashto lines are translations
    if (m === 'en' && ref.key === 'math') sure = true;
    else if (content && m !== 'ur' && m !== 'ps' && m !== 'ar') {
      // English titles over a right-to-left book (the reader says so) or text that is almost all Urdu
      const text = bookText(content);
      const a = (text.match(ARABIC_LETTER) || []).length, l = (text.match(LATIN_LETTER) || []).length;
      const rtlReader = !!content.querySelector('.m5-rtl, .m6-rtl, .m7-rtl, .m8-rtl, .m11-rtl');
      if (a + l >= 400) {
        if (rtlReader || a > 4 * l) { const d = detect(text, 400); m = d && d !== 'en' ? d : 'ur'; }
        else if (!m) m = detect(text, 400);
        sure = true;
      }
    }
    // an English guess from titles alone waits until the chapter text is there to confirm it
    if (key && m && sure) cache.set(key, m);
    return m;
  }

  // ---------------------------------------------------------------- relabelling
  const CHROME = [
    '.math-nav-tabs .math-tab-btn', '#subjSubTabsBar button', '.category-sub-tab-btn', '.topic-sub-tab-btn',
    '.math-badge', '.sb-moved-title', '.sh-help', '#subjTabContent h3', '#subjTabContent h4', '#subjTabContent summary',
    '.class12-study-note', '.c2-btn-ans', '.sb-topic-fs', '.bio-part-tab', '.slo-btn', '.slo-q-badge', '.tb-badge',
    '.para-card-header .math-badge', '.sb-topic-head .math-badge', '.m5-help', '.m6-help', '.m7-help', '.m8-help', '.m11-help',
    '.m5-page', '.m6-page', '.m7-page', '.m8-page', '.m11-page', '.m5-exercise-t', '.m6-exercise-t', '.m7-exercise-t', '.m8-exercise-t', '.m11-exercise-t'
  ].join(',');
  // whole-text interface strings that can sit anywhere in the workspace
  const EXACT = [
    [/^Concepts$/, ['تصورات', 'مفاهیم', 'المفاهيم']],
    [/^Textbook page (\S+) · PDF page (\S+)$/, ['درسی کتاب صفحہ $1 · پی ڈی ایف صفحہ $2', 'د درسي کتاب مخ $1 · PDF مخ $2', 'صفحة الكتاب $1 · صفحة PDF $2']],
    [/^Unnumbered page · PDF page (\S+)$/, ['بغیر نمبر صفحہ · پی ڈی ایف صفحہ $1', 'بې شمېرې مخ · PDF مخ $1', 'صفحة بلا رقم · صفحة PDF $1']],
    [/^Exercise (\S+)$/, ['مشق $1', 'تمرین $1', 'تمرين $1']]
  ];
  function relabelText(s, lang) {
    const col = COL[lang];
    const t = s.trim();
    for (const [rx, words] of BADGES) { const m = t.match(rx); if (m) return s.replace(t, words[col - 1] + ' ' + m[1]); }
    if (WORDS[t]) return s.replace(t, WORDS[t][col - 1]);
    const part = t.match(/^(Part|Lesson|Example)\s+(\d[\w.]*)$/);
    if (part) return s.replace(t, WORDS[part[1]][col - 1] + ' ' + part[2]);
    // "لوست (Lesson)": the English word in brackets only repeats the label
    let out = s.replace(/\s*\((?:Lesson|Exercise|SLOs|Grammar|Vocabulary)\)/g, '');
    for (const [rx, p] of compiled) { rx.lastIndex = 0; out = out.replace(rx, (all, pre) => pre + p[col]); }
    return out;
  }
  function relabelExact(root, lang) {
    const col = COL[lang];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) { const v = walker.currentNode.nodeValue.trim(); if (v && v.length < 60 && /^[A-Z]/.test(v)) nodes.push(walker.currentNode); }
    nodes.forEach(n => {
      if (n.parentElement.closest('.lesson-sentence, .sb-ayat, .sb-tri-drawer, .m5-tr, .m6-tr, .m7-tr, .m8-tr, .m11-tr, .sbq-opts')) return;
      const v = n.nodeValue.trim();
      for (const [rx, words] of EXACT) if (rx.test(v)) { n.nodeValue = n.nodeValue.replace(v, v.replace(rx, words[col - 1])); return; }
      const w = relabelText(v, lang);
      // only a phrase that translates as a whole (never half an English sentence)
      if (w !== v && !/[A-Za-z]{3}/.test(w.replace(/(?:PDF|SLO)/g, ''))) n.nodeValue = n.nodeValue.replace(v, w);
    });
  }
  function relabel(root, lang) {
    relabelExact(root, lang);
    root.querySelectorAll(CHROME).forEach(el => {
      if (el.closest('.sb-ayat, .sbq-opts, .lesson-sentence') || el.dataset.sbmDone === lang) return;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(n => {
        // book text and English sentences stay as they are (the <html lang="en"> root does not count)
        const en = n.parentElement.closest('[lang="en"]');
        if (!/[A-Za-z]/.test(n.nodeValue) || n.parentElement.closest('.sb-ayat, .lesson-sentence') || en && en !== document.documentElement) return;
        const v = relabelText(n.nodeValue, lang);
        if (v !== n.nodeValue) n.nodeValue = v;
      });
      if (el.title) el.title = relabelText(el.title, lang);
      el.dataset.sbmDone = lang;
    });
  }
  // "Question in English / Pashto" pop-outs that only say the question again
  function dropRepeats(root) {
    root.querySelectorAll('details').forEach(d => {
      const sum = d.querySelector(':scope > summary');
      if (!sum || !/question in|سوال|پوښتنه/i.test(sum.textContent) || d.classList.contains('class12-answer')) return;
      const owner = d.parentElement;
      const shown = owner ? [...owner.childNodes].filter(n => n !== d).map(n => n.textContent || '').join(' ') : '';
      const norm = x => x.replace(/[ً-ٰٟۖ-ۭـ\s«»"'.،۔:]/g, '');
      const inner = [...d.children].filter(k => k !== sum).map(k => norm(k.textContent || ''));
      if (inner.length && inner.every(x => !x || norm(shown).includes(x))) d.remove();
    });
  }

  // card titles printed in two languages ("Cell · خلیہ", "1.1 مسئلے کو سمجھنا · 1.1 Understanding a problem")
  // keep only the subject's own language; the full title stays as the hover text
  const TITLE = ':is(.math-acc-header, .sb-topic-head, .para-card-header) :is(h3, h4, h5, .sb-topic-title)';
  const SEP = /\s+·\s+/;
  // words only: maths (KaTeX) and the ﷺ sign do not decide a part's language
  function words(nodes) {
    return nodes.map(n => {
      if (n.nodeType === 3) return n.nodeValue;
      if (n.nodeType !== 1 || n.matches('.katex, .katex-display, svg')) return '';
      const w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT);
      let s = '';
      while (w.nextNode()) if (!w.currentNode.parentElement.closest('.katex, .katex-display, svg')) s += w.currentNode.nodeValue;
      return s;
    }).join('').replace(/ﷺ/g, '').trim();
  }
  const inRtlScript = s => (s.match(ARABIC_LETTER) || []).length > (s.match(LATIN_LETTER) || []).length;
  function oneLanguage(root, lang) {
    const rtl = lang !== 'en';
    root.querySelectorAll(TITLE).forEach(el => {
      if (!/\s·\s/.test(el.textContent)) return;
      const full = el.textContent.replace(/\s+/g, ' ').trim();
      // the separator becomes a text node of its own, so a title split by maths markup still divides cleanly
      [...el.childNodes].forEach(n => {
        let t = n;
        while (t && t.nodeType === 3) {
          const m = SEP.exec(t.nodeValue);
          if (!m) break;
          const sep = t.splitText(m.index);
          t = sep.splitText(m[0].length);
          sep.sbmSep = true;
        }
      });
      const segs = [[]];
      [...el.childNodes].forEach(n => { if (n.sbmSep) segs.push([]); else segs[segs.length - 1].push(n); });
      if (segs.length < 2) return;
      const texts = segs.map(words);
      let keep = texts.map(t => !!t && inRtlScript(t) === rtl);
      // "حمد · حمد": the same words twice
      if (texts.every(t => t === texts[0])) keep = texts.map((t, i) => i === 0);
      if (!keep.some(Boolean) || keep.every(Boolean)) return;
      let i = 0;
      [...el.childNodes].forEach(n => {
        if (n.sbmSep) { i++; if (!(keep[i - 1] && keep[i])) n.remove(); return; }
        if (!keep[i]) n.remove();
      });
      if (!el.title && !el.querySelector('.katex')) el.title = full;
    });
  }

  // ---------------------------------------------------------------- apply
  function apply() {
    const ws = workspace();
    if (!ws) return;
    const content = document.getElementById('subjTabContent') || document.getElementById('mathTabContent');
    if (content) dropRepeats(content);
    const lang = mediumNow();
    const view = ws.closest('.math-unified-view') || ws;
    ['sbm-ur', 'sbm-ps', 'sbm-ar', 'sbm-rtl', 'sbm-en'].forEach(c => view.classList.remove(c));
    // the content box is shared by every subject: an Urdu book's dir="rtl" must not stay on the next English one
    if (content && content.dataset.sbmDir && (!lang || lang === 'en')) {
      content.removeAttribute('dir'); content.removeAttribute('lang'); delete content.dataset.sbmDir;
    }
    if (!lang) return;
    view.classList.add('sbm-' + lang);
    oneLanguage(view, lang);
    if (lang === 'en') return;
    view.classList.add('sbm-rtl');
    if (content) { content.setAttribute('dir', 'rtl'); content.setAttribute('lang', lang); content.dataset.sbmDir = '1'; }
    relabel(view, lang);
  }
  // throttled, not debounced: some views mutate continuously (Class 12 Physics)
  let timer = 0;
  new MutationObserver(() => { if (!timer) timer = setTimeout(() => { timer = 0; try { apply(); } catch (e) { console.warn('SBMedium', e); } }, 60); })
    .observe(document.documentElement, {childList: true, subtree: true});

  const css = document.createElement('style');
  css.textContent = `
  .sb-ayat .sb-ayat{font-size:1em}
  .sbm-rtl #subjTabContent .sb-ayat{font-size:1.45rem;line-height:2.2}
  .sbm-rtl #subjTabContent{text-align:right}
  .sbm-ur #subjTabContent .lesson-sentence:not(.sb-ayat),.sbm-ur #subjTabContent .sbq-t,.sbm-ur #subjTabContent .class12-question-text,
  .sbm-ps #subjTabContent .lesson-sentence:not(.sb-ayat),.sbm-ps #subjTabContent .sbq-t{font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu","Noto Naskh Arabic","Segoe UI",serif;font-size:1.08rem;line-height:2.05}
  .sbm-rtl #subjTabContent h3,.sbm-rtl #subjTabContent h4,.sbm-rtl #subjTabContent h5{font-size:1.05rem;line-height:1.9}
  .sbm-rtl .math-nav-tabs .math-tab-btn,.sbm-rtl .category-sub-tab-btn{font-family:"Noto Naskh Arabic","Segoe UI",sans-serif}`;
  document.head.appendChild(css);

  window.SBMedium = {detect, mediumNow, relabelText, oneLanguage, apply, cache};
})();
