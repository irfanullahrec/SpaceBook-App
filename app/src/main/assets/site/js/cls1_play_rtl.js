/* Class 1 Islamyat, Pashto and Nazira Quran — play layer (toolkit: window.C1P from js/cls1_eng_play.js).
 * The same kind of games as the English and Maths books, in the book's own language:
 *   Islamyat  fill-in-the-blank with the right word, "created by Allah or made by people?", In sha Allah / Masha Allah,
 *             short answers (type or speak, hear the model answer)
 *   Pashto    choose (الف) (ب) (ج) (د), fill the gap, true ✓ / false ✗, build a word from its letters, match
 *             number words with digits, synonyms, writing tasks
 *   Nazira    tap every letter / word of the page to hear it (Arabic voice when the browser has one)
 * Praise, hints and buttons are shown in Urdu or Pashto; the voices are picked by language. */
(function () {
  'use strict';
  const P = window.C1P; if (!P) return;
  const C = window.C1A;
  const {norm, stripParen, hasBlank, solAnswer, qText, nextOf, sameGroup, shuffle} = P;

  const gloss = a => a.replace(/\s*\([A-Za-z][^()]*\)\s*$/, '').trim();     // 'ایک (One)' -> 'ایک'
  const clean = s => gloss(String(s || '')).replace(/[۔.]\s*$/, '').trim();
  const GEN_UR = ['اللہ تعالیٰ', 'نماز', 'قرآنِ مجید', 'سچ', 'ایمان', 'مسجد', 'نیکی', 'پانچ'];
  const GEN_PS = ['الله پاک', 'مونځ', 'قرآن', 'رښتیا', 'ایمان', 'جومات', 'نیکي', 'پینځۀ'];

  function pool(q, filter) {
    const out = [];
    sameGroup(q).forEach(x => { const s = solAnswer(x); if (s && (!filter || filter(s))) out.push(clean(s)); });
    return out;
  }
  function opts3(correct, others, generic) {
    const bad = new Set([norm(correct)]); const out = [correct];
    shuffle(others.slice()).concat(shuffle(generic.slice())).forEach(w => { const k = norm(w); if (k && !bad.has(k) && out.length < 4) { bad.add(k); out.push(w); } });
    return shuffle(out);
  }

  /* ------------------------------------------------------------------ Islamyat */
  function classifyIsl(q) {
    const t = qText(q); if (!t) return null;
    const a = solAnswer(q); if (a == null) return null;
    const ans = clean(a);
    const g = (a.match(/\(([A-Za-z][^()]*)\)\s*$/) || [])[1] || '';

    /* tawheed: created by Allah / made by people */
    if (/✓/.test(a) && /(پیدا کیا|بنا[ئیںے]+)/.test(a)) {
      const word = t.replace(/[:؟].*$/, '').trim();
      return {kind: 'choice', prompt: '«' + word + '» — کس نے بنایا؟', opts: ['اللہ تعالیٰ نے پیدا کیا', 'انسانوں نے بنایا'], correct: /انسانوں/.test(a) ? 'انسانوں نے بنایا' : 'اللہ تعالیٰ نے پیدا کیا', title: '🎯 درست جواب چنیں'};
    }
    /* In sha Allah / Masha Allah */
    if (/شَآءَ|شاء/.test(a) && /Allah/.test(a)) {
      const cor = /^اِنْ|^ان/.test(a.trim()) ? 'اِنْ شَآءَ اللّٰهُ' : 'مَا شَآءَ اللّٰهُ';
      return {kind: 'choice', prompt: t, opts: ['اِنْ شَآءَ اللّٰهُ', 'مَا شَآءَ اللّٰهُ'], correct: cor, title: '🎯 کون سا کہیں گے؟', help: 'جملے کے آخر میں کون سا کلمہ آئے گا؟ ٹیپ کریں۔'};
    }
    /* reward of salam: 10 / 20 / 30 good deeds */
    if (/^\d+\s*نیکیاں/.test(a)) return {kind: 'choice', prompt: t + ' — کہنے سے کتنی نیکیاں ملتی ہیں؟', opts: ['10 نیکیاں', '20 نیکیاں', '30 نیکیاں'], correct: a.match(/\d+/)[0] + ' نیکیاں', title: '🎯 درست جواب چنیں'};
    /* fill in the blank */
    if (hasBlank(t) && ans.split(/\s+/).length <= 3) {
      const others = pool(q, s => !/✓/.test(s) && clean(s).split(/\s+/).length <= 3 && clean(s) !== ans);
      return {kind: 'choice', stem: t, opts: opts3(ans, others, GEN_UR), correct: ans, title: '🎯 درست لفظ چنیں'};
    }
    /* questions */
    if (/[؟?]\s*$/.test(t) || /(لکھیں|لکھیے|بتائیں|بتائیے|نام)/.test(t)) {
      if (!/جال/.test(t)) return {kind: 'open', t, a, mode: /(لکھیں|لکھیے|چارٹ|فائدے|آداب)/.test(t) ? 'write' : 'say'};
    }
    if (q.classList && q.classList.contains('m6-part') && a && a.length > 6) return {kind: 'open', t, a, mode: 'write'};
    return {kind: 'done', t};
  }

  /* ------------------------------------------------------------------ Pashto */
  const PS_L = ['الف', 'ب', 'ج', 'د'];
  function psBank(q) {
    let n = q.previousElementSibling, steps = 0;
    while (n && steps < 14) {
      steps++;
      if (n.matches('[role=heading],.m6-h3,.m6-h4')) break;
      if (!n.classList.contains('m6-q') && /—/.test(n.textContent) && /(لفظونه|لکه)/.test(n.textContent)) {
        const txt = C.clean(n).replace(/^[^:]*:\s*/, '');
        const w = txt.split(/\s*—\s*/).map(x => x.trim()).filter(x => x && x.split(/\s+/).length <= 3 && !/^[ا]$/.test(x));
        if (w.length >= 2) return w;
      }
      n = n.previousElementSibling;
    }
    return null;
  }
  function classifyPs(q) {
    const t = qText(q); if (!t) return null;
    const a = solAnswer(q); if (a == null) return null;
    const ans = clean(a);

    /* (الف) (ب) (ج) (د) */
    const re = /\((الف|ب|ج|د)\)\s*([^()]+?)(?=\s*\((?:الف|ب|ج|د)\)|\s*$)/g; const opts = []; let m;
    while ((m = re.exec(t))) opts.push({l: m[1], t: m[2].trim()});
    if (opts.length >= 2) {
      const cl = /^\((الف|ب|ج|د)\)/.exec(a.trim()); const cor = cl && opts.find(o => o.l === cl[1]);
      if (cor) return {kind: 'choice', stem: t.slice(0, t.indexOf('(' + opts[0].l + ')')).trim(), opts: opts.map(o => o.t), correct: cor.t, title: '🎯 سمه کلمه وټاکئ', help: 'سم ځواب ته ټیپ کړئ.'};
    }
    /* true / false */
    if (/^[✓✗]/.test(a.trim()) && !/^[A-Za-z]/.test(t)) return {kind: 'choice', prompt: t, opts: ['✓ سم', '✗ غلط'], correct: a.trim().startsWith('✓') ? '✓ سم' : '✗ غلط', title: '🤔 سم دی که غلط؟'};
    /* build the word from its letters */
    m = /^((?:\S\s*\+\s*)+\S)\s*=\s*_+$/.exec(t);
    if (m) { const letters = t.split('=')[0].split('+').map(x => x.trim()); return {kind: 'order', chips: letters, target: ans, sequence: letters, exact: true, title: '🧩 توري سره جوړ کړئ', help: 'توري په ترتیب ټیپ کړئ چې کلمه جوړه شي.'}; }
    m = /^(\S+)$/.exec(t);
    if (m && /^(\S\s*\+\s*)+\S$/.test(a.trim())) { const letters = a.split('+').map(x => x.trim()); return {kind: 'order', chips: letters, target: t, sequence: letters, exact: true, title: '🧩 د کلمې توري', help: '«' + t + '» په توروکې ټوټې کړئ؛ توري په ترتیب ټیپ کړئ.'}; }
    /* number words ↔ digits */
    const nums = [...a.matchAll(/(?:^|[،,]\s*)([^\s،,۰-۹]+(?:\s+[^\s،,۰-۹]+)?)\s+([۰-۹0-9]+)(?=\s*[،,(]|\s*$)/g)];
    if (nums.length >= 5) return {kind: 'pairs', pairs: nums.slice(0, 10).map(x => [x[1].trim(), x[2]]), help: 'کیڼ اړخ نه شمېره وټاکئ، بیا ښي اړخ نه د هغې هندسه.'};
    /* blank with options in brackets: (سر، غوږ، مخ) */
    const pl = /\(([^()]+)\)\s*[.۔]?\s*$/.exec(t);
    if (hasBlank(t) && pl) {
      const its = pl[1].split(/\s*[،,]\s*/).map(x => x.trim()).filter(Boolean);
      if (its.length >= 2) return {kind: 'choice', stem: t.replace(/\s*\([^()]+\)\s*$/, ''), opts: its, correct: ans, title: '🎯 سمه کلمه وټاکئ'};
    }
    /* blank */
    if (hasBlank(t) && ans.split(/\s+/).length <= 3) {
      const bank = psBank(q); const others = (bank || []).concat(pool(q, s => !/^\(/.test(s.trim()) && clean(s).split(/\s+/).length <= 3));
      return {kind: 'choice', stem: t, opts: opts3(ans, others, GEN_PS), correct: ans, title: '🎯 سمه کلمه وټاکئ'};
    }
    /* word meaning / synonym */
    if (t.split(/\s+/).length <= 3 && !/[؟?:]/.test(t) && ans.split(/\s+/).length <= 3 && !/\+/.test(a)) {
      const others = pool(q, s => clean(s).split(/\s+/).length <= 3 && !/\+/.test(s) && !/[✓✗]/.test(s));
      if (others.length >= 2) return {kind: 'choice', prompt: '«' + t + '» — د دې معنی؟', opts: opts3(ans, others, GEN_PS), correct: ans, title: '📖 د کلمې معنی'};
    }
    /* writing and speaking */
    if (/(ولیکئ|ولیکئ\.|جملې|لفظونه)/.test(t) || /[؟?]\s*$/.test(t)) return {kind: 'open', t, a, mode: /(ولیکئ)/.test(t) ? 'write' : 'say'};
    if (q.classList && q.classList.contains('m6-part') && a && a.length > 6) return {kind: 'open', t, a, mode: 'write'};
    return {kind: 'done', t};
  }

  /* ------------------------------------------------------------------ Nazira */
  const AR = /[؀-ۿ]/;
  function arabicChips(nodes) {
    const out = [];
    nodes.forEach(n => { n.querySelectorAll('svg text').forEach(tx => {
      const s = tx.textContent.trim();
      if (!s || !AR.test(s) || /^\+\d+$/.test(s)) return;
      if (/\s/.test(s) && /ـ/.test(s)) return;               // the spelled-out pieces of a word
      if (out.indexOf(s) < 0) out.push(s);
    }); });
    return out;
  }
  function classifyNazira(q) {
    const t = qText(q); if (!t) return null;
    const nxt = []; for (let n = q.nextElementSibling; n && !n.classList.contains('m6-q') && nxt.length < 8; n = n.nextElementSibling) if (!n.classList.contains('c1a-card')) nxt.push(n);
    const chips = arabicChips(nxt);
    const figs = nxt.filter(n => n.matches('figure.m6-fig') && n.querySelector('svg text'));
    const a = solAnswer(q);
    if (chips.length >= 2) return {kind: 'arabic', chips: chips.slice(0, 80), t, a, after: figs.length ? figs[figs.length - 1] : q};
    if (q.classList && q.classList.contains('m6-part') && a && a.length > 6) return {kind: 'open', t, a, mode: 'write'};
    return {kind: 'done', t};
  }
  P.BUILD.arabic = spec => {
    const card = P.mini('🔊 ٹیپ کریں اور سنیں', 'ہر حرف یا لفظ پر ٹیپ کریں اور سنیں، پھر خود پڑھیں۔ سب پڑھ لیں تو ستارہ دبائیں!');
    const h = C.h; const row = h('div', 'c1a-wopts', '', card); row.style.direction = 'rtl';
    const note = h('div', 'c1a-msg c1a-center', '', card);
    const tools = h('div', 'c1a-tools', '', card);
    const arSpeak = text => {
      try {
        if (!('speechSynthesis' in window)) return;
        speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text.replace(/ـ/g, '')); const vs = speechSynthesis.getVoices() || []; const v = vs.find(x => (x.lang || '').toLowerCase().startsWith('ar'));
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'ar-SA'; u.rate = 0.6; speechSynthesis.speak(u);
      } catch (e) { /* optional */ }
    };
    const els = spec.chips.map(s => { const b = h('button', 'c1a-chipw', s, row); b.type = 'button'; b.style.fontSize = '1.7rem'; b.style.fontFamily = '"Noto Naskh Arabic","Traditional Arabic",serif'; b.addEventListener('click', () => { els.forEach(x => x.classList.remove('hot')); b.classList.add('hot'); C.sndPop(); arSpeak(s); }); return b; });
    let token = 0;
    const all = h('button', 'c1a-btn', '🔊 Read all to me', tools); all.type = 'button';
    all.addEventListener('click', async () => { const my = ++token; for (let i = 0; i < els.length && my === token; i++) { els.forEach(x => x.classList.remove('hot')); els[i].classList.add('hot'); arSpeak(spec.chips[i]); await new Promise(r => setTimeout(r, 1300 + spec.chips[i].length * 90)); } els.forEach(x => x.classList.remove('hot')); });
    if (spec.a) { const sh = h('button', 'c1a-btn', '👀 Show answer', tools); sh.type = 'button'; sh.addEventListener('click', () => { note.textContent = spec.a; }); }
    P.wStar(tools, note, card);
    return card;
  };

  P.register('isl', classifyIsl);
  P.register('pashto', classifyPs);
  P.register('nazira', classifyNazira);
  if (P.scan) P.scan();
})();
