/* Class 6, Class 7 and Class 8 textbook reader for every source-reviewed book except Mathematics (which has math6_reader.js / math8_reader.js).
 * Each book file registers window.CLS6_BOOKS[subjKey], window.CLS7_BOOKS[subjKey] or window.CLS8_BOOKS[subjKey] = {units, book, words};
 * this file renders it in the generic subject workspace with the same paragraph-translation, word-meaning and step-by-step solution UI as Class 6. */
(function () {
  'use strict';
  const R = window.MATH6_READER;
  if (!R || typeof window.switchSubjectTab !== 'function') return;
  const {blocks, card, root, withBook, esc, sentence} = R;
  const books = () => window.CLS6_BOOKS || {};
  const RTL_LANGS = {urdu: ['ur', 'en', 'ps'], isl: ['ur', 'en', 'ps'], quran: ['ur', 'en', 'ps'], arabic: ['ur', 'en', 'ps'], hpe: ['ur', 'en', 'ps'], pashto: ['ps', 'en', 'ur']};

  function walk(list, fn) { (list || []).forEach(b => { fn(b); if (b.blocks) walk(b.blocks, fn); if (b.items) walk(b.items, fn); }); }
  function pending(B, ch) {
    return `<div class="math-topic-card" style="padding:1.5rem;text-align:center;color:#475569;">${esc(B.book.name)} unit ${esc(ch.number)} is awaiting page-by-page source review. ${esc(B.book.reviewedPdfPages)} of ${esc(B.book.totalPdfPages)} source pages reviewed so far.</div>`;
  }
  const badge = sec => /^\d+(\.\d+)*$/.test(sec.id) ? `Part ${sec.id}` : (sec.tabs && sec.tabs[0] ? sec.tabs[0][0].toUpperCase() + sec.tabs[0].slice(1) : 'Lesson');
  const title = sec => sec.title + (sec.titleUrdu ? ` · ${sec.titleUrdu}` : '');

  function findBestSupport(paras, queryText) {
    if (!paras.length) return null;
    const words = (String(queryText || '').toLowerCase().match(/[a-z]{4,}|[\u0600-\u06ff]{3,}/g) || [])
      .filter(w => !['what', 'which', 'where', 'when', 'following', 'explain', 'describe', 'write', 'brief', 'answer', 'questions', 'detail', 'correct', 'option', 'choose'].includes(w));
    if (!words.length) return paras[0];
    let best = paras[0], bestScore = -1;
    paras.forEach(p => {
      const hay = (p.en + ' ' + (p.ur || '') + ' ' + (p.ps || '')).toLowerCase();
      let score = 0;
      words.forEach(w => { if (hay.includes(w)) score += 1; });
      if (score > bestScore) { bestScore = score; best = p; }
    });
    return best;
  }

  const FALLBACK_WORDS = {
    hist: {
      administration: ['انتظامیہ / نظم و نسق', 'اداره / انتظامیه'],
      alliance: ['اتحاد / معاہدہ', 'اتحاد / تړون'],
      amendment: ['ترمیم', 'بدلون / سمون'],
      armistice: ['جنگ بندی', 'اوربند'],
      battle: ['جنگ / معرکہ', 'جګړه'],
      british: ['برطانوی / انگریز', 'برتانوي / انګرېزان'],
      cabinet: ['کابینہ', 'کابینه'],
      charter: ['منشور / فرمان', 'منشور'],
      civilization: ['تہذیب و تمدن', 'تمدن'],
      colony: ['نوآبادی', 'مستعمره'],
      company: ['کمپنی (ایسٹ انڈیا کمپنی)', 'شرکت / کمپنۍ'],
      conference: ['کانفرنس / اجلاس', 'غونډه / کنفرانس'],
      conquest: ['فتح', 'فتح / سوبه'],
      constitution: ['آئین / دستور', 'اساسي قانون'],
      democracy: ['جمہوریت', 'ولسواکي'],
      dynasty: ['خاندانِ حکومت', 'واکمنه کورنۍ'],
      economy: ['معیشت', 'اقتصاد'],
      education: ['تعلیم', 'زده کړه'],
      empire: ['سلطنت', 'امپراتوري / سلطنت'],
      federation: ['وفاق', 'فدراسیون / وفاق'],
      foreign: ['خارجہ / بیرونی', 'بهرنۍ'],
      governor: ['گورنر / حاکم', 'والی / ګورنر'],
      heritage: ['ورثہ', 'میراث'],
      imperialism: ['سامراجیت', 'استعمار'],
      independence: ['آزادی', 'خپلواکي'],
      industry: ['صنعت', 'صنعت'],
      migration: ['ہجرت / نقل مکانی', 'کډوالي / هجرت'],
      movement: ['تحریک', 'تحریک / غورځنګ'],
      nationalism: ['قوم پرستی / وطنی جذبہ', 'ملت پالنه'],
      parliament: ['پارلیمنٹ / مجلسِ شوریٰ', 'پارلمان'],
      partition: ['تقسیمِ ہند', 'ویش'],
      policy: ['پالیسی / حکمتِ عملی', 'تګلاره'],
      rebellion: ['بغاوت / جنگِ آزادی', 'پاڅون'],
      referendum: ['استصوابِ رائے / ریفرنڈم', 'ټولپوښتنه'],
      reform: ['اصلاحات', 'اصلاحات / سمونونه'],
      resolution: ['قرارداد', 'پرېکړه لیک'],
      revenue: ['مالیہ / محصول', 'مالیه / عواید'],
      revival: ['احیاء / تجدید', 'راژوندي کول'],
      sovereignty: ['حاکمیتِ اعلیٰ / خودمختاری', 'واکمني / خپلواکي'],
      trade: ['تجارت', 'سوداګري'],
      treaty: ['معاہدہ / صلح نامہ', 'تړون'],
      viceroy: ['وائسرائے', 'وایسرای']
    }
  };

  function ensureBookReady(B, subjKey, classId) {
    if (!B || B._ready) return;
    B._ready = true;
    B.book = B.book || {name: subjKey};
    if (!B.book.langs && RTL_LANGS[subjKey]) {
      B.book.langs = RTL_LANGS[subjKey];
    }
    B.words = B.words || {};
    const c6b = (window.CLS6_BOOKS || {})[subjKey];
    if (c6b && c6b.words) {
      Object.keys(c6b.words).forEach(w => { if (!B.words[w]) B.words[w] = c6b.words[w]; });
    }
    if (FALLBACK_WORDS[subjKey]) {
      Object.keys(FALLBACK_WORDS[subjKey]).forEach(w => { if (!B.words[w]) B.words[w] = FALLBACK_WORDS[subjKey][w]; });
    }
    window.CLS6_SOLUTIONS = window.CLS6_SOLUTIONS || {};
    let autoSolCounter = 0;
    const primaryLang = (B.book.langs && B.book.langs[0]) || 'en';

    (B.units || []).forEach(ch => {
      const unitParas = [];
      (ch.sections || []).forEach(sec => {
        walk(sec.blocks, b => {
          if (b.t === 'p' && b.en && b.en.length > 25 && !/^Figure:/i.test(b.en)) {
            unitParas.push(b);
          }
        });
      });

      // 1. If ch.slos is empty, extract SLO bullets from the opening section
      if ((!ch.slos || !ch.slos.length) && ch.sections && ch.sections.length) {
        const extractedSlos = [];
        walk(ch.sections[0].blocks, b => {
          if (b.t === 'ul' && b.items && b.items.length && !extractedSlos.length) {
            b.items.forEach(it => { if (it && it.en) extractedSlos.push(it); });
          }
        });
        if (extractedSlos.length) ch.slos = extractedSlos;
      }

      // 2. If ch.exercises is empty, collect any exercise or q blocks from ch.sections
      if ((!ch.exercises || !ch.exercises.length) && ch.sections && ch.sections.length) {
        const qBlocks = [];
        let lastPrinted = ch.pageStart || 1;
        ch.sections.forEach(sec => {
          (sec.blocks || []).forEach(b => {
            if (b.t === 'page' && b.printed) lastPrinted = b.printed;
            if (b.t === 'exercise') {
              ch.exercises = ch.exercises || [];
              ch.exercises.push(b);
            } else if (b.t === 'q') {
              qBlocks.push(b);
            }
          });
        });
        if ((!ch.exercises || !ch.exercises.length) && qBlocks.length) {
          ch.exercises = [{
            t: 'exercise',
            id: primaryLang === 'ur' ? `مشق (یونٹ ${ch.number})` : primaryLang === 'ps' ? `مشغولتیا (یونټ ${ch.number})` : `Unit ${ch.number} Exercise`,
            printed: lastPrinted,
            blocks: qBlocks
          }];
        }
      }

      // 3. Ensure every question/part in sections and exercises has a step-by-step solution (solId)
      const attachSol = (qObj, parentPrompt) => {
        if (qObj.solId && window.CLS6_SOLUTIONS[qObj.solId]) return;
        const qEn = qObj.en || (parentPrompt && parentPrompt.en) || '';
        const qUr = qObj.ur || (parentPrompt && parentPrompt.ur) || qEn;
        const qPs = qObj.ps || (parentPrompt && parentPrompt.ps) || qEn;
        if (!qEn) return;
        const sup = findBestSupport(unitParas, qEn + ' ' + qUr);
        autoSolCounter += 1;
        const sid = `${classId}-${subjKey}-auto-${ch.number}-${autoSolCounter}`;
        const supEn = sup ? sup.en : `${ch.title || ''}: ${qEn}`;
        const supUr = sup ? (sup.ur || sup.en) : `${ch.titleUrdu || ch.title || ''}: ${qUr}`;
        const supPs = sup ? (sup.ps || sup.ur || sup.en) : `${ch.titlePashto || ch.titleUrdu || ''}: ${qPs}`;

        if (primaryLang === 'ur') {
          window.CLS6_SOLUTIONS[sid] = {
            steps: [
              {en: `درسی متن کا حوالہ (${ch.titleUrdu || ch.title}): ${supEn}`, ur: `Textbook Reference (${ch.title}): ${supUr}`, ps: `د درسي متن حواله: ${supPs}`}
            ],
            answer: supEn
          };
        } else if (primaryLang === 'ps') {
          window.CLS6_SOLUTIONS[sid] = {
            steps: [
              {en: `د درسي متن حواله (${ch.title}): ${supEn}`, ur: `Textbook Reference: ${supUr}`, ps: `درسی متن کا حوالہ: ${supPs}`}
            ],
            answer: supEn
          };
        } else {
          window.CLS6_SOLUTIONS[sid] = {
            steps: [
              {en: `From Unit ${ch.number} (${ch.title}): ${supEn}`, ur: `یونٹ ${ch.number} (${ch.titleUrdu || ch.title}) کے درسی متن کے مطابق: ${supUr}`, ps: `د څپرکي ${ch.number} (${ch.titlePashto || ch.title}) د متن له مخې: ${supPs}`}
            ],
            answer: supEn
          };
        }
        qObj.solId = sid;
      };

      const walkQuestions = list => {
        (list || []).forEach(b => {
          if (b.t === 'q') {
            if (b.parts && b.parts.length) {
              b.parts.forEach(p => attachSol(p, b));
            } else {
              attachSol(b, null);
            }
          }
          if (b.blocks) walkQuestions(b.blocks);
        });
      };
      (ch.sections || []).forEach(sec => walkQuestions(sec.blocks));
      (ch.exercises || []).forEach(ex => walkQuestions([ex]));
    });
  }

  function lesson(B, ch, i) {
    let html = '';
    if (i === 0 && B.book.frontMatter && B.book.frontMatter.length) html += card('c6-front', 'Book', 'Cover, credits and contents', root(blocks(B.book.frontMatter)), false);
    if (!ch.sections.length) return html + pending(B, ch);
    html += R.pageCards(ch.sections, {id: sec => `c6-${ch.number}-${sec.id}`, badge, title, root, blocks, card});
    if (B.book.backMatter && B.book.backMatter.length && i === B.units.length - 1) html += card('c6-back', 'Book', 'Glossary and end pages', root(blocks(B.book.backMatter)), false);
    return html;
  }
  function exercises(B, ch) {
    if (!ch.sections.length) return pending(B, ch);
    if (!ch.exercises || !ch.exercises.length) return `<div class="math-topic-card" style="padding:1.25rem;color:#475569;">This unit has no separate exercise in the textbook; its activities are in the Lesson tab.</div>`;
    return ch.exercises.map((ex, k) => card('c6-ex-' + ch.number + '-' + k, 'Exercise', (ex.id || 'Exercise') + (ex.printed ? ` (p. ${ex.printed})` : ''), root(blocks([ex], {showAnswers: true, noPages: true})), k === 0)).join('');
  }
  function slos(B, ch) {
    if (!ch.sections.length) return pending(B, ch);
    if (!ch.slos || !ch.slos.length) return `<div class="math-topic-card" style="padding:1.25rem;color:#475569;">The textbook does not list learning outcomes for this unit.</div>`;
    return root(`<div class="m6-h3">Student Learning Outcomes</div><p class="m6-help">As printed in the textbook.</p><ul class="m6-ul">${ch.slos.map(i => `<li class="lv${i.lv || 1}">${sentence(i, 'span')}</li>`).join('')}</ul>`);
  }
  function words(B, ch) {
    if (!ch.sections.length) return pending(B, ch);
    const text = [];
    ch.sections.forEach(s => walk(s.blocks, b => { if (b.en) text.push(b.en); if (b.rows) b.rows.forEach(r => text.push(r.join(' '))); }));
    const joined = text.join(' ');
    const rtl = B.book && B.book.langs && B.book.langs[0] !== 'en';
    const seen = new Set((joined.toLowerCase().match(rtl ? /[\u0600-\u06ff\u0750-\u077f\ufb50-\ufdff\ufe70-\ufeff]+/g : /[a-z]+(?:'[a-z]+)?/g) || []));
    let list = Object.keys(B.words || {}).filter(w => seen.has(w) || (rtl && joined.includes(w))).sort();
    if (!list.length) list = Object.keys(B.words || {}).slice(0, 25);
    if (!list.length) return `<div class="math-topic-card" style="padding:1.25rem;color:#475569;">No word meanings recorded for this unit yet.</div>`;
    const L = (B.book && B.book.langs) || ['en', 'ur', 'ps'];
    const H = {en: 'Word (English)', ur: 'اردو', ps: 'پښتو'};
    const cell = (l, v) => l === 'en' ? `<td>${esc(v)}</td>` : `<td lang="${l}" dir="rtl">${esc(v)}</td>`;
    return root(`<div class="m6-h3">Word meanings in this unit</div><div class="m6-table"><table><thead><tr><th>${H[L[0]] || 'Word'}</th><th>${H[L[1]] || 'اردو'}</th><th>${H[L[2]] || 'پښتو'}</th></tr></thead><tbody>${list.map(w => `<tr>${cell(L[0], w)}${cell(L[1], B.words[w][0])}${cell(L[2], B.words[w][1])}</tr>`).join('')}</tbody></table></div>`);
  }
  function tagged(B, ch, tab) {
    if (!ch.sections.length) return pending(B, ch);
    let secs = ch.sections.filter(s => (s.tabs || []).includes(tab));
    if (!secs.length && tab === 'summary') {
      secs = ch.sections.filter(s => /summary|key|review|خلاصہ|لنډیز/i.test(s.id || '') || /summary|key|review|خلاصہ|لنډیز/i.test(s.title || ''));
    }
    if (!secs.length && (tab === 'concepts' || tab === 'summary')) {
      const callouts = [];
      ch.sections.forEach(s => walk(s.blocks, b => {
        if (b.t === 'box' || b.t === 'table' || b.t === 'svg' || (tab === 'summary' && b.t === 'h')) callouts.push(b);
      }));
      if (callouts.length) {
        return card(`c6-${tab}-auto-${ch.number}`, tab === 'summary' ? 'Summary' : 'Concepts', ch.title + (ch.titleUrdu ? ` · ${ch.titleUrdu}` : ''), root(blocks(callouts, {noPages: true, showAnswers: true})), true);
      }
    }
    if (!secs.length) return `<div class="math-topic-card" style="padding:1.25rem;color:#475569;">The textbook has no separate “${esc(tab)}” part in this unit. All of the unit's pages are in the Lesson tab.</div>`;
    return secs.map((sec, k) => card(`c6-${tab}-${ch.number}-${sec.id}`, badge(sec), title(sec), root(blocks(sec.blocks, {showAnswers: true})), k === 0)).join('');
  }
  function render(B, ch, i, tab) {
    if (tab === 'lesson') return lesson(B, ch, i);
    if (tab === 'exercise') return exercises(B, ch);
    if (tab === 'slos') return slos(B, ch);
    if (tab === 'concepts' && !ch.sections.some(s => (s.tabs || []).includes('concepts'))) {
      if (!ch.sections.length) return pending(B, ch);
      if (!ch.workedExamples || !ch.workedExamples.length) return tagged(B, ch, tab);
      return ch.workedExamples.map((ex, k) => card(`c6-act-${ch.number}-${k}`, 'Activity', (ex.title ? ex.title.en : ex.no) + (ex.printed ? ` (p. ${ex.printed})` : ''), root(blocks([ex], {noPages: true, showAnswers: true})), k === 0)).join('');
    }
    if (tab === 'formulas') return tagged(B, ch, 'summary');
    if (tab === 'glossary' || tab === 'vocabulary' || tab === 'words') {
      const t = tagged(B, ch, tab);
      return ch.sections.some(s => (s.tabs || []).includes(tab)) ? t + words(B, ch) : words(B, ch);
    }
    return tagged(B, ch, tab);
  }

  // Mutalia-e-Quran: four language tabs (Arabic default). A verse paragraph is stored as "ARABIC ﴿n﴾ — TRANSLATION"
  // in each of its language slots; split it so the Arabic tab shows only the verse and each other tab its translation.
  const MQ_LANGS = [['ar', 'Arabic · عربی'], ['ps', 'Pashto · پښتو'], ['ur', 'Urdu · اردو'], ['en', 'English']];
  let mqMode = 'ar';
  function mqStyle() {
    if (document.getElementById('mq-style')) return;
    const st = document.createElement('style');
    st.id = 'mq-style';
    st.textContent = `
      .mq-tabs{display:flex;flex-wrap:wrap;gap:.4rem;margin:0 0 .9rem}
      .mq-tab{border:1px solid #cbd5e1;background:#fff;color:#0f172a;border-radius:999px;padding:.4rem 1.05rem;font-weight:600;cursor:pointer;font-size:.95rem}
      .mq-tab[aria-selected="true"]{background:#0369a1;border-color:#0369a1;color:#fff}
      .mq-verse{margin:.35rem 0 .8rem;padding:.6rem .9rem;background:#f0f9ff;border-radius:8px}
      .mq-verse .mq-v{margin:0;display:none}
      .mq-verse .mq-v-ar,.mq-mode-ur .mq-v-ur,.mq-mode-en .mq-v-en,.mq-mode-ps .mq-v-ps{display:block}
      .mq-mode-ur .mq-v-ar,.mq-mode-en .mq-v-ar,.mq-mode-ps .mq-v-ar{padding-bottom:.35rem;margin-bottom:.35rem;border-bottom:1px dashed #bae6fd}
      .mq-v-ar{font-family:'Amiri Quran','Amiri','Scheherazade New','KFGQPC Uthmanic Script HAFS','Noto Naskh Arabic',serif;font-size:1.6rem;line-height:2.4;text-align:right;direction:rtl}
      .mq-v-ur{font-family:'Jameel Noori Nastaleeq','Noto Nastaliq Urdu','Urdu Typesetting',serif;font-size:1.15rem;line-height:2.1;text-align:right;direction:rtl}
      .mq-v-ps{font-family:'Noto Naskh Arabic','Segoe UI',Tahoma,serif;font-size:1.1rem;line-height:1.95;text-align:right;direction:rtl}
      .mq-v-en{font-size:1.02rem;line-height:1.7;text-align:left;direction:ltr}
      .mq-v .mq-no{color:#0369a1;font-weight:700}
      .mq-mode-en .m6-s,.mq-mode-ps .m6-s{display:none}
      .mq-mode-en .m6-tr,.mq-mode-ps .m6-tr{display:block!important;border:0;background:none;padding:0;margin:.2rem 0 .6rem}
      .mq-mode-en .m6-tr p:not([lang="en"]),.mq-mode-ps .m6-tr p:not([lang="ps"]){display:none}
      .mq-mode-en .m6-tr .m6-lang,.mq-mode-ps .m6-tr .m6-lang{display:none}`;
    document.head.appendChild(st);
  }
  function mqSplit(text) {
    const k = text.indexOf('﴾ — ');
    return k < 0 ? null : [text.slice(0, k + 1).trim(), text.slice(k + 4).trim()];
  }
  function mqApply(container) {
    container.querySelectorAll('.m6-root').forEach(r => {
      ['ar', 'ur', 'en', 'ps'].forEach(l => r.classList.toggle('mq-mode-' + l, l === mqMode));
    });
    container.querySelectorAll('.mq-tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.l === mqMode)));
  }
  window.mqSetLang = function (btn) {
    mqMode = btn.dataset.l;
    mqApply(btn.closest('#subjTabContent') || document);
  };
  function quranTabs(container) {
    mqStyle();
    container.querySelectorAll('.m6-s').forEach(el => {
      const tr = el.nextElementSibling;
      if (!tr || !tr.classList.contains('m6-tr')) return;
      const ar = mqSplit(el.textContent);
      if (!ar) return;
      const pick = l => { const p = tr.querySelector(`p[lang="${l}"]`); if (!p) return ''; const c = p.cloneNode(true); const lab = c.querySelector('.m6-lang'); if (lab) lab.remove(); const s = mqSplit(c.textContent); return s ? s[1] : c.textContent.trim(); };
      const no = (ar[0].match(/﴿([^﴾]+)﴾\s*$/) || [])[1] || '';
      const t = {ar: ar[0], ur: ar[1], en: pick('en'), ps: pick('ps')};
      const numbered = (l, s) => no && l !== 'ar' ? `<span class="mq-no">(${esc(no)})</span> ${esc(s)}` : esc(s);
      const div = document.createElement('div');
      div.className = 'mq-verse';
      div.innerHTML = ['ar', 'ps', 'ur', 'en'].map(l => `<p class="mq-v mq-v-${l}" lang="${l}" dir="${l === 'en' ? 'ltr' : 'rtl'}">${numbered(l, t[l])}</p>`).join('');
      el.replaceWith(div);
      tr.remove();
    });
    container.querySelectorAll('.m6-root > .m6-tools').forEach(tools => {
      tools.className = 'mq-tabs';
      tools.setAttribute('role', 'tablist');
      tools.innerHTML = MQ_LANGS.map(([l, name]) => `<button type="button" class="mq-tab" role="tab" data-l="${l}" aria-selected="false" onclick="mqSetLang(this)">${name}</button>`).join('');
      const help = tools.nextElementSibling;
      if (help && help.classList.contains('m6-help')) help.textContent = 'Choose a language: Arabic shows the verses; Pashto, Urdu and English show their translation.';
    });
    mqApply(container);
  }

  SBHooks.use('switchSubjectTab', function (originalSwitch) { return function (subjKey, tabId, chIdx, classId) {
    // Class 10 Islamiat (lazmi) is the Class 9 book, so cls10 'isl' opens CLS9_BOOKS.isl.
    // Class 9 Islamiat Ikhtiari is the same book as Class 10, so cls9 'islopt' opens CLS10_BOOKS.islopt.
    const lib = classId === 'cls10' && subjKey === 'isl' ? (window.CLS9_BOOKS || {}) : classId === 'cls9' && subjKey === 'islopt' ? (window.CLS10_BOOKS || {}) : classId === 'cls6' ? books() : classId === 'cls7' ? (window.CLS7_BOOKS || {}) : classId === 'cls8' ? (window.CLS8_BOOKS || {}) : classId === 'cls10' ? (window.CLS10_BOOKS || {}) : classId === 'cls9' ? (window.CLS9_BOOKS || {}) : classId === 'cls12' ? (window.CLS12_BOOKS || {}) : {};
    const B = subjKey !== 'math' ? lib[subjKey] : null;
    if (!B || !B.units || !B.units.length) return originalSwitch.apply(this, arguments);
    let ch;
    if (B.book && B.book.byNumber) {
      // book covers only some chapters of an existing list (Class 10 Physics 13-18, Chemistry): match by chapter number,
      // fall back to the existing content for chapters not (yet) in the book
      const list = typeof getSubjectChapterList === 'function' ? getSubjectChapterList(subjKey, classId) : [];
      const cur = list[chIdx];
      const no = cur ? String(cur.num || cur.number) : null;
      ch = no && B.units.find(u => String(u.number) === no && (u.sections || []).length);
      if (!ch) return originalSwitch.apply(this, arguments);
      ensureBookReady(B, subjKey, classId);
    } else {
      ensureBookReady(B, subjKey, classId);
      ch = B.units[chIdx] || B.units[0];
    }
    state.activeSubjTab = tabId;
    document.querySelectorAll('.math-top-tab, .math-tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    const container = document.getElementById('subjTabContent');
    const subBar = document.getElementById('subjSubTabsBar');
    if (subBar) { subBar.style.display = 'none'; subBar.innerHTML = ''; }
    if (!container) return;
    container.innerHTML = withBook(B.words, B.book, () => render(B, ch, B.units.indexOf(ch), tabId));
    if (subjKey === 'quran') quranTabs(container);
    container.scrollTop = 0;
  }; });
})();
