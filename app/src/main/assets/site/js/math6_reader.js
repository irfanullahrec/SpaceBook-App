/* Class 6 Mathematics source reader (KPTBB SNC 2022).
 * Renders the page-reviewed MATH_6_DATA blocks: original English text, click-to-open
 * Urdu and Pashto translations, Urdu/Pashto word meanings, KaTeX math and coded SVG figures.
 * Only active when Class 6 is selected; every other class keeps the existing renderers. */
(function () {
  'use strict';
  if (typeof MATH_6_DATA === 'undefined') return;
  const isCls6 = () => typeof state !== 'undefined' && state.selectedClass === 'cls6';
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const MATH_WORDS = typeof MATH_6_WORDS !== 'undefined' ? MATH_6_WORDS : {};
  const MATH_BOOK = typeof MATH_6_BOOK !== 'undefined' ? MATH_6_BOOK : {answers:{}};
  let WORDS = MATH_WORDS, BOOK = MATH_BOOK;
  // Language of each slot in "original || translation || translation"; Urdu-medium books set book.langs = ['ur','en','ps'].
  const LANG_INFO = {en: {label: 'English', dir: 'ltr'}, ur: {label: 'اردو', dir: 'rtl'}, ps: {label: 'پښتو', dir: 'rtl'}};
  let LANGS = ['en', 'ur', 'ps'];
  const RTL_PRIMARY = () => LANG_INFO[LANGS[0]].dir === 'rtl';
  // Other Class 6 books reuse this renderer with their own word list and answer key.
  // cls: the Maths class (5, 7, 8, 11) when the open-book view (js/sb_book_spread.js) draws that class's own book with this renderer. The SpaceBook solution
  // ids of the Maths books ("s814") repeat from class to class, so what is drawn while cls is set carries its class (Ans button, multiple-choice widget) and
  // reads that class's MATH_<cls>_SOLUTIONS, never Class 6's. Class 6 itself and the books with their own inline answers (ids with a dash) pass nothing.
  let SOLCLS = '';
  function withBook(words, book, fn, cls) {
    const w = WORDS, b = BOOK, l = LANGS, c = SOLCLS;
    WORDS = words || {}; BOOK = book || {answers: {}}; LANGS = (book && book.langs) || ['en', 'ur', 'ps']; SOLCLS = cls && String(cls) !== '6' ? String(cls) : '';
    try { return fn(); } finally { WORDS = w; BOOK = b; LANGS = l; SOLCLS = c; }
  }

  const css = `
  .m6-root{color:#1e293b;line-height:1.75;font-size:.98rem}
  .m6-rtl [dir="rtl"]:not(.m6-tr p){text-align:right;font-size:1.12rem;line-height:2.1}
  .m6-rtl .m6-ul{direction:rtl}
  .m6-root .katex{font-size:1.05em}
  .m6-page{display:flex;align-items:center;gap:.5rem;margin:1.1rem 0 .5rem;color:#64748b;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
  .m6-page::after{content:"";flex:1;border-top:1px dashed #cbd5e1}
  .m6-s{cursor:pointer;border-radius:6px;padding:.1rem .25rem;margin:0 -.25rem}
  .m6-s:hover,.m6-s:focus-visible{background:#f0f9ff;outline:none}
  .m6-s[aria-expanded="true"]{background:#e0f2fe}
  .m6-tr{margin:.3rem 0 .7rem;padding:.55rem .8rem;border-inline-start:3px solid #0284c7;background:#f8fafc;border-radius:0 6px 6px 0}
  .m6-tr p{margin:.15rem 0;text-align:right;direction:rtl}
  .m6-tr p[dir="ltr"]{text-align:left;direction:ltr}
  .m6-tr .m6-ur{font-family:'Jameel Noori Nastaleeq','Noto Nastaliq Urdu','Urdu Typesetting',serif;font-size:1.12rem;line-height:2.1}
  .m6-tr .m6-ps{font-family:'Noto Naskh Arabic','Segoe UI',Tahoma,serif;font-size:1.05rem;line-height:1.9}
  .m6-tr .m6-lang{font-size:.7rem;color:#0369a1;font-weight:700;margin-inline-end:.4rem;font-family:system-ui,sans-serif}
  .m6-root.m6-show-all .m6-tr{display:block!important}
  .m6-root[data-sbmode="0"] .m6-hsub{display:none}
  .m6-root[data-sbmode="1"] .m6-tr,.m6-root[data-sbmode="2"] .m6-tr{display:block!important}
  .m6-root[data-sbmode="1"] .m6-tr .m6-ps,.m6-root[data-sbmode="2"] .m6-tr .m6-ur{display:none}
  .m6-root[data-sbmode="1"] .m6-hsub,.m6-root[data-sbmode="2"] .m6-hsub{font-size:0}
  .m6-root[data-sbmode="1"] .m6-hsub>span:first-of-type,.m6-root[data-sbmode="2"] .m6-hsub>span:last-of-type{font-size:.92rem}
  .m6-root[data-sbmode="1"] .m6-hsub>span:last-of-type,.m6-root[data-sbmode="2"] .m6-hsub>span:first-of-type{display:none}
  .m6-root[data-sbmode="1"] .m6-hsub>span,.m6-root[data-sbmode="2"] .m6-hsub>span{display:block}
  .m6-root .m6-hsub>span[lang="en"]{direction:ltr;text-align:left}
  .m6-root .m6-hsub>span[lang="ur"],.m6-root .m6-hsub>span[lang="ps"]{direction:rtl;text-align:right}
  .m6-tools:empty{display:none}
  div.m6-para{margin:.5rem 0}
  .m6-para .m6-tr{margin:.25rem 0 .45rem}
  .m6-root .m6-h3,.m6-root .m6-h4{cursor:pointer}
  .m6-root[data-sbmode="0"] .sb-hopen>.m6-hsub{display:block!important}
  .m6-tabs{display:flex;gap:.45rem;flex-wrap:wrap;margin:0 0 .55rem}
  .m6-tabs button{border:1px solid #bae6fd;background:#fff;color:#0369a1;border-radius:999px;padding:.38rem .95rem;font:inherit;font-size:.9rem;font-weight:700;cursor:pointer}
  .m6-tabs button[aria-pressed="true"]{background:#0369a1;color:#fff;border-color:#0369a1}
  .m6-w{text-decoration:underline dotted #0284c7;text-underline-offset:4px;cursor:help}
  .m6-h3{font-size:1.08rem;font-weight:750;color:#0f172a;margin:1rem 0 .3rem}
  .m6-root,.m6-root *{min-width:0;overflow-wrap:anywhere}
  .m6-root .katex-display,.m6-root table{max-width:100%}
  .mch-titles{flex-wrap:wrap !important;white-space:normal !important;overflow:visible !important}
  .mch-titles,.mch-titles *{white-space:normal !important;min-width:0}
  .mch-titles>*{flex-shrink:1 !important;max-width:100%}
  .m6-root.c1-skin .m6-box-t{white-space:normal;width:max-content;max-width:calc(100% - .6rem);text-align:center}
  .m6-root svg,.m6-root img{max-width:100%;height:auto}
  .m6-h4{font-size:1rem;font-weight:700;color:#075985;margin:.9rem 0 .25rem}
  .m6-hsub{display:block;font-weight:500;font-size:.92rem;color:#475569;direction:rtl;text-align:right}
  .m6-m{margin:.25rem 0 .25rem 1rem;font-variant-numeric:tabular-nums}
  .m6-eq{margin:.6rem 0;text-align:center;overflow-x:auto}
  .m6-ul{margin:.3rem 0 .6rem;padding-inline-start:1.3rem}
  .m6-ul li{margin:.15rem 0;list-style:disc}
  .m6-ul li.lv2{margin-inline-start:1.2rem;list-style:circle}
  .m6-ul li.lv3{margin-inline-start:2.4rem;list-style:square}
  .m6-box{border:1px solid #bae6fd;background:#f0f9ff;border-radius:10px;padding:.6rem .9rem;margin:.8rem 0}
  .m6-box.note{border-color:#99f6e4;background:#f0fdfa}
  .m6-box.check{border-color:#fde68a;background:#fffbeb}
  .m6-box.prior{border-color:#c7d2fe;background:#eef2ff}
  .m6-box.teach{border-color:#fecaca;background:#fef2f2}
  .m6-box.key{border-color:#fda4af;background:#fff1f2;text-align:center;font-weight:600}
  .m6-box-t{font-weight:750;font-size:.85rem;color:#0f172a;margin-bottom:.2rem}
  .m6-example{border:1px solid #e2e8f0;border-inline-start:4px solid #16a34a;border-radius:8px;padding:.6rem .9rem;margin:.9rem 0;background:#fff}
  .m6-example-t{font-weight:750;color:#15803d}
  .m6-exercise{border:1px solid #e2e8f0;border-inline-start:4px solid #7c3aed;border-radius:8px;padding:.6rem .9rem;margin:.9rem 0;background:#fff}
  .m6-exercise-t{font-weight:800;color:#6d28d9;font-size:1.02rem}
  .m6-q{margin:.55rem 0}
  .m6-qno{font-weight:750;color:#6d28d9;margin-inline-end:.35rem}
  .m6-parts{display:flex;flex-wrap:wrap;gap:.2rem 1.6rem;margin:.2rem 0 .2rem 1.6rem}
  .m6-parts.block{display:block}
  .m6-ans{margin:.25rem 0 .2rem 1.6rem;font-size:.9rem;color:#166534;background:#f0fdf4;border-radius:6px;padding:.25rem .55rem}
  .m6-ans.none{color:#64748b;background:#f8fafc}
  .m6-fig{margin:.8rem 0;text-align:center}
  .m6-fig svg{max-width:100%;height:auto}
  .m6-fig figcaption{font-size:.85rem;color:#475569;margin-top:.25rem}
  .m6-table{overflow-x:auto;margin:.7rem 0}
  .m6-table table{border-collapse:collapse;margin:0 auto;min-width:50%}
  .m6-table th,.m6-table td{border:1px solid #94a3b8;padding:.3rem .65rem;text-align:center}
  .m6-table th{background:#e0f2fe}
  .m6-table caption{font-size:.85rem;color:#475569;caption-side:top;margin-bottom:.25rem}
  .m6-tools{display:flex;gap:.5rem;flex-wrap:wrap;margin:.2rem 0 .7rem}
  .m6-tools button{font:inherit;font-size:.8rem;border:1px solid #cbd5e1;background:#fff;border-radius:999px;padding:.2rem .7rem;cursor:pointer}
  .m6-help{font-size:.82rem;color:#64748b;margin:.2rem 0 .6rem}
  #m6-word{max-width:calc(100vw - 2rem);width:340px;border:1px solid #94a3b8;border-radius:12px;padding:1rem}
  #m6-word p{margin:.3rem 0}
  .m6-part{margin:.25rem 0}
  .m6-root{container-type:inline-size}
  @container (max-width: 560px){.m6-exercise,.m6-example,.m6-box{padding:.5rem .55rem}.m6-parts{margin-inline-start:.4rem}.m6-ans{margin-inline-start:.4rem}}
  `;
  if (typeof document !== 'undefined' && !document.getElementById('m6-style')) {
    const style = document.createElement('style');
    style.id = 'm6-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ---- inline text: KaTeX for $...$, word-meaning buttons for known words ----
  function wordify(text) {
    const rtl = RTL_PRIMARY();
    const a = LANG_INFO[LANGS[1]].label, b = LANG_INFO[LANGS[2]].label;
    return text.split(rtl ? /([؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]+)/ : /([A-Za-z]+(?:'[a-z]+)?)/).map(token => {
      const key = rtl ? token : token.toLowerCase();
      const m = (rtl ? /^[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/ : /^[A-Za-z]/).test(token) && WORDS[key];
      return m ? `<span class="m6-w" role="button" tabindex="0" data-w="${esc(key)}" data-ur="${esc(m[0])}" data-ps="${esc(m[1])}" data-l1="${LANGS[1]}" data-l2="${LANGS[2]}" title="${a}: ${esc(m[0])} | ${b}: ${esc(m[1])}" onclick="m6Word(this,event)" onkeydown="if(event.key==='Enter'){m6Word(this,event)}">${esc(token)}</span>` : esc(token);
    }).join('');
  }
  const bold = html => html.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*(?=\S)([^*\n]+?)(?<=\S)\*(?![*\w])/g, '$1<em>$2</em>');
  function inline(text, words) {
    const lm = typeof SpaceBookLessonMath !== 'undefined' ? SpaceBookLessonMath : null;
    if (!lm) return bold(words ? wordify(text) : esc(text));
    return lm.mathParts(text).map(part => part.latex === undefined ? bold(words ? wordify(part.text) : esc(part.text)) : lm.renderMath(part)).join('');
  }
  function translations(rec) {
    if (!rec || !rec.ur) return '';
    const line = (l, text, cls) => `<p class="${cls}" lang="${l}" dir="${LANG_INFO[l].dir}"${LANG_INFO[l].dir === 'ltr' ? ' style="text-align:left"' : ''}><span class="m6-lang">${LANG_INFO[l].label}</span>${inline(text, false)}</p>`;
    // every sentence shows its meaning in all three languages, each on its own line: English, اردو, پښتو (then any other)
    const text = {[LANGS[0]]: rec.en, [LANGS[1]]: rec.ur, [LANGS[2]]: rec.ps};
    const order = ['en', 'ur', 'ps', ...LANGS.filter(l => !['en', 'ur', 'ps'].includes(l))].filter(l => LANGS.includes(l) && text[l]);
    return `<div class="m6-tr" hidden>${order.map(l => line(l, text[l], l === 'en' ? 'm6-en' : l === 'ur' ? 'm6-ur' : 'm6-ps')).join('')}</div>`;
  }
  const primaryAttrs = () => RTL_PRIMARY() ? ` lang="${LANGS[0]}" dir="rtl"` : '';
  // A sentence/paragraph that opens its translation when clicked.
  const SB_SPLIT = /(?<=[.!?؟۔])\s+(?=\S)/;
  // Paragraphs are split into sentences when the original and both translations have the same number of sentences,
  // so each sentence opens its own translation just below it; otherwise the whole paragraph is one unit.
  function sentence(rec, tag, cls) {
    if (rec && rec.ur && rec.ps && typeof rec.en === 'string' && rec.en.indexOf('$') < 0) {
      const a = rec.en.split(SB_SPLIT), b = String(rec.ur).split(SB_SPLIT), c = String(rec.ps).split(SB_SPLIT);
      if (a.length > 1 && a.length === b.length && a.length === c.length) {
        const w = (tag || 'p') === 'span' ? 'span' : 'div';
        return `<${w} class="m6-para ${cls || ''}"${primaryAttrs()}>` + a.map((x, i) => sentenceWhole({en: x, ur: b[i], ps: c[i]}, 'span', 'm6-sent')).join(' ') + `</${w}>`;
      }
    }
    return sentenceWhole(rec, tag, cls);
  }
  function sentenceWhole(rec, tag, cls) {
    tag = tag || 'p';
    if (!rec.ur) return `<${tag} class="${cls || ''}"${primaryAttrs()}>${inline(rec.en, true)}</${tag}>`;
    // A sentence holds word buttons (m6-w) and a Listen button, and a button may not hold controls: so the sentence has no role, like the
    // sentences of the Class 9 renderer (js/core/a11y.js). It stays one Tab stop; Enter or Space opens its translation.
    return `<${tag} class="m6-s ${cls || ''}"${primaryAttrs()} tabindex="0" onclick="m6Toggle(this,event)" onkeydown="if(event.key==='Enter'||event.key===' '){m6Toggle(this,event)}">${inline(rec.en, true)}</${tag}>${translations(rec)}`;
  }

  window.m6Toggle = function (el, event) {
    if (event && event.target && event.target.closest('.m6-w')) return;
    if (event && event.type === 'keydown') event.preventDefault();
    const panel = el.nextElementSibling;
    if (!panel || !panel.classList.contains('m6-tr')) return;
    panel.hidden = !panel.hidden;
  };
  window.m6Word = function (el, event) {
    event.preventDefault(); event.stopPropagation();
    const key = el.dataset.w, m = el.dataset.ur ? [el.dataset.ur, el.dataset.ps] : WORDS[key];
    if (!m) return;
    let panel = document.getElementById('m6-word');
    if (!panel) { panel = document.createElement('dialog'); panel.id = 'm6-word'; document.body.appendChild(panel); }
    const l1 = el.dataset.l1 || 'ur', l2 = el.dataset.l2 || 'ps';
    const row = (l, v) => `<p lang="${l}" dir="${LANG_INFO[l].dir}" style="font-size:1.12rem"><strong>${LANG_INFO[l].label}:</strong> ${esc(v)}</p>`;
    panel.innerHTML = `<button type="button" style="float:right" aria-label="Close" onclick="this.closest('dialog').close()">×</button><h3 style="margin:.1rem 0 .5rem">${esc(el.textContent)}</h3>${row(l1, m[0])}${row(l2, m[1])}`;
    if (panel.showModal) panel.showModal(); else panel.setAttribute('open', '');
  };
  window.m6ShowAll = function (btn) {
    const root = btn.closest('.m6-root');
    const on = !root.classList.contains('m6-show-all');
    root.classList.toggle('m6-show-all', on);
    btn.setAttribute('aria-pressed', String(on));
    const names = btn.dataset.names || 'Urdu / Pashto';
    btn.textContent = (on ? 'Hide all ' : 'Show all ') + names;
  };

  const BOX_LABEL = {note: 'Note it down', check: 'Quick Check', prior: 'Previous Knowledge Check', teach: 'Teaching Point', info: ''};
  function heading(b) {
    const cls = b.l <= 3 ? 'm6-h3' : 'm6-h4';
    const sub = b.ur ? `<span class="m6-hsub"${LANG_INFO[LANGS[1]].dir === 'ltr' ? ' style="direction:ltr;text-align:left"' : ''}><span lang="${LANGS[1]}">${esc(b.ur)}</span> · <span lang="${LANGS[2]}" dir="rtl">${esc(b.ps)}</span></span>` : '';
    return `<div role="heading" aria-level="${b.l}" class="${cls}"${primaryAttrs()}>${inline(b.en, true)}${sub}</div>`;
  }
  function answersFor(exId) {
    const A = BOOK.answers || {};
    // Class 10 Mathematics prints the key of its review exercises as "R1" … "R13"; the exercises are called "Review 1" …
    const list = A[exId] || A[String(exId).replace(/^Review\s+(\d+)$/i, 'R$1')] || [];
    const map = {};
    // a long printed answer is stored as several lines of the same question: join them, do not keep only the last
    list.forEach(a => { const p = map[a.q]; map[a.q] = p ? Object.assign({}, p, {a: String(p.a || '').trim() + ' ' + String(a.a || '').trim()}) : a; });
    return map;
  }
  // ---- SpaceBook answers: the Ans button opens the shared step-by-step panel (js/sb_solve.js) ----
  function solButton(sid) {
    if (!sid) return '';
    return `<button type="button" class="sb-ans" data-langs="${LANGS.join(',')}" aria-expanded="false" title="Answer and step-by-step explanation" onclick="event.stopPropagation();m6SolOpen(this,'${esc(sid)}'${SOLCLS ? `,'${SOLCLS}'` : ''})">Ans</button><div class="sb-solve" hidden></div>`;
  }

  // ---- the printed answer key (and answers written for what the key leaves out) as Ans records ----
  // Books that have the key but no solutions of their own (Class 9 and 10 Mathematics, Class 12 Statistics): every question and every part gets an
  // Ans button, and its panel shows the printed answer. A key line such as "(i) 2 (ii) 3" is split by part; a line that cannot be split (the list of
  // parts that qualify, a graph described in words) is shown whole under each part, never guessed. js/answers_extra.js holds answers written for
  // parts the printed key has no line for: SB_EXTRA_ANSWERS[book title]["exercise|question|part"] = {answer, steps?}.
  const KEYREC = Object.create(null), KEYIDS = new Map();
  // "(i)." "iii)" "a)" "i) AB" → "i" "iii" "a" "i": the label of a part, whatever else its number field holds
  const partKey = no => {
    const s = String(no == null ? '' : no).trim(), m = /^\(?([A-Za-z]{1,5}|\d{1,3})(?:\)\.|\)|\.)?(?:\s|$)/.exec(s);
    return (m ? m[1] : s.replace(/[()\s.]/g, '')).toLowerCase();
  };
  const isRoman = k => !!k && /^x{0,3}(?:ix|iv|v?i{0,3})$/.test(k);
  // A line is split by part only when it starts with a label and every labelled piece is an answer of its own: "(i) 2 (ii) 3", "i) c ii) a".
  // Prose such as "(i) is a polynomial. (ii), (iii) are not.", "(i) and (iii) are in lowest terms" or "Symmetric matrices: (ii)." is not split.
  // A key line that starts with [Derived] or [Check] was worked out and checked by SpaceBook (the printed key has no line, or a wrong one, for it).
  const KEYTAG = /^\[(?:derived|check)\]\s*/i;
  function keyParts(a) {
    const math = [];
    const s = String(a || '').trim().replace(KEYTAG, '').replace(/\$\$[\s\S]*?\$\$|\$[^$]*\$/g, m => '\u0001' + (math.push(m) - 1) + '\u0002');
    const back = t => t.replace(/\u0001(\d+)\u0002/g, (_, i) => math[+i]);
    const re = /(^|[\s,;])\(?([ivx]{1,5}|[a-z])\)(?=[\s,;.]|$)/g;
    const marks = []; let m;
    while ((m = re.exec(s))) marks.push({k: m[2], end: re.lastIndex, at: m.index + m[1].length});
    const out = marks.map((mk, i) => ({k: mk.k, t: back(s.slice(mk.end, i + 1 < marks.length ? marks[i + 1].at : s.length)).replace(/^[\s:.,;-]+|[\s,;]+$/g, '').trim()}));
    const lead = marks.length ? back(s.slice(0, marks[0].at)).trim() : '';
    const clean = marks.length > 0 && (!lead || /:$/.test(lead)) && out.every(p => p.t && !/^(?:and|or|&)\.?$/i.test(p.t) && !/^(?:is|are)\b/i.test(p.t));
    if (!clean) return [];
    return lead ? out.map(p => ({k: p.k, t: lead + ' ' + p.t})) : out;     // "Third side by calculation: (i) 2.0 cm …" keeps its lead
  }
  function partAnswer(a, no) {
    const k = partKey(no);
    const hit = k ? keyParts(a).find(x => x.k === k) : null;
    return hit ? hit.t : '';
  }
  const extraRec = (exId, qNo, partNo) => {
    const E = window.SB_EXTRA_ANSWERS && window.SB_EXTRA_ANSWERS[(BOOK && BOOK.title) || ''];
    return E ? E[exId + '|' + qNo + '|' + partKey(partNo)] || null : null;
  };
  const keyRec = (answer, hit, note) => KEYTAG.test(String(hit.a || ''))
    ? {answer, steps: [{en: 'SpaceBook answer: worked out and checked' + (note || '')}]}                         // not printed in the textbook
    : {answer, steps: [{en: 'Textbook answer key, page ' + hit.printed + (note || '')}], src: 'book'};
  // the record behind one Ans button: the printed line of that part, else an answer written for it, else the printed line of the whole question
  // An answer written and checked for a part comes first: where it differs from the printed key (the key has misprints) it is the one shown.
  function leafRec(exId, q, hit, partNo, optText) {
    const ex = extraRec(exId, q.no, partNo);
    if (ex) return ex;
    const whole = hit ? String(hit.a || '').trim() : '';
    let own = whole && partNo ? partAnswer(whole, partNo) : '';
    if (own && optText) { const k = partKey(own); if (/^[a-e]$/.test(k) && optText[k]) own = k + ') ' + optText[k]; }   // "c" → "c) the text of option c"
    if (own) return keyRec(own, hit);
    return whole ? keyRec(whole.replace(KEYTAG, ''), hit, partNo ? ' (one line for the whole question)' : '') : null;
  }
  function keyButton(rec) {
    const sig = JSON.stringify(rec);
    let id = KEYIDS.get(sig);
    if (!id) { id = 'k' + (KEYIDS.size + 1); KEYIDS.set(sig, id); KEYREC[id] = rec; }
    return `<button type="button" class="sb-ans" data-langs="${LANGS.join(',')}" aria-expanded="false" title="Answer" onclick="event.stopPropagation();m6SolOpen(this,'${id}')">Ans</button><div class="sb-solve" hidden></div>`;
  }
  let solLoad = null;
  function loadSolutions() {
    if (window.MATH_6_SOLUTIONS) return Promise.resolve(window.MATH_6_SOLUTIONS);
    if (!solLoad) {
      solLoad = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        const own = [...document.scripts].find(x => /math6_reader\.js/.test(x.src));
        const v = own && own.src.includes('?') ? own.src.slice(own.src.indexOf('?')) : '';
        s.src = 'js/math_6_solutions.js' + v;
        s.onload = () => resolve(window.MATH_6_SOLUTIONS);
        s.onerror = () => { solLoad = null; reject(new Error('Solutions could not be loaded')); };
        document.head.appendChild(s);
      });
    }
    return solLoad;
  }
  const plain = text => String(text || '').replace(/\$([^$]*)\$/g, (_, m) => m.replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\^\{([^}]*)\}/g, '^$1').replace(/\\text\{([^}]*)\}/g, '$1').replace(/[{}\\]/g, ''));
  // The solutions file of another Maths class (5, 7, 8, 11) for the open-book view; loaded like Class 6's, with the version of that class's reader.
  const solLoads = {};
  function loadSolutionsFor(cls) {
    const key = 'MATH_' + cls + '_SOLUTIONS';
    if (window[key]) return Promise.resolve(window[key]);
    if (!solLoads[cls]) {
      solLoads[cls] = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        const own = [...document.scripts].find(x => new RegExp('math' + cls + '_reader\\.js').test(x.src)) || [...document.scripts].find(x => /math6_reader\.js/.test(x.src));
        const v = own && own.src.includes('?') ? own.src.slice(own.src.indexOf('?')) : '';
        s.src = 'js/math_' + cls + '_solutions.js' + v;
        s.onload = () => resolve(window[key]);
        s.onerror = () => { delete solLoads[cls]; reject(new Error('Solutions could not be loaded')); };
        document.head.appendChild(s);
      });
    }
    return solLoads[cls];
  }
  // the answers the books ship inline: the page books of Class 5 keep theirs in CLS5_SOLUTIONS (js/*_5_*.js), every other book in CLS6_SOLUTIONS
  const otherSols = id => { const a = window.CLS6_SOLUTIONS || {}; if (a[id]) return a; const b = window.CLS5_SOLUTIONS || {}; return b[id] ? b : a; };
  window.m6SolOpen = function (btn, id, cls) {
    if (KEYREC[id]) { SBSolve.toggle(btn, KEYREC[id], {inline, plain}); return; }
    const other = id.includes('-');   // other books ship their answers inline (CLS6_SOLUTIONS, CLS5_SOLUTIONS)
    if (!other && cls && String(cls) !== '6') {   // drawn by the open-book view for another Maths class: that class's own solutions
      const key = 'MATH_' + cls + '_SOLUTIONS';
      if (!window[key]) {
        const panel = SBSolve.loading(btn, 'Loading the solution…');
        loadSolutionsFor(cls).then(() => { panel.hidden = true; m6SolOpen(btn, id, cls); }).catch(() => { panel.innerHTML = '<p class="sbs-help">The solution could not be loaded. Please check your connection and try again.</p>'; });
        return;
      }
      SBSolve.toggle(btn, window[key][id], {inline, plain});
      return;
    }
    if (!other && !window.MATH_6_SOLUTIONS) {
      const panel = SBSolve.loading(btn, 'Loading the solution…');
      loadSolutions().then(() => { panel.hidden = true; m6SolOpen(btn, id); }).catch(() => { panel.innerHTML = '<p class="sbs-help">The solution could not be loaded. Please check your connection and try again.</p>'; });
      return;
    }
    SBSolve.toggle(btn, (other ? otherSols(id) : window.MATH_6_SOLUTIONS)[id], {inline, plain});
  };
  // Inline-option MCQs ("Stem? a. … b. … c. …") become the shared radio widget (js/sb_mcq.js).
  const solMap = id => String(id).includes('-') ? otherSols(String(id)) : window.MATH_6_SOLUTIONS;
  if (window.SBMcq) SBMcq.register('m6', {
    inline,
    sols: id => { const m = solMap(id); return m ? m[id] : undefined; },
    get: id => { const m = solMap(id); return m ? Promise.resolve(m[id]) : loadSolutions().then(x => x && x[id]); }
  });
  // the same widget for the books of the other Maths classes drawn by the open-book view: one source per class ('m6c5', 'm6c7', 'm6c8', 'm6c11')
  if (window.SBMcq) ['5', '7', '8', '11'].forEach(c => SBMcq.register('m6c' + c, {
    inline,
    sols: id => { const m = window['MATH_' + c + '_SOLUTIONS']; return m ? m[id] : undefined; },
    get: id => { const m = window['MATH_' + c + '_SOLUTIONS']; return m ? Promise.resolve(m[id]) : loadSolutionsFor(c).then(x => x && x[id]); }
  }));
  const mcqHtml = (b, key, after, partNo) => window.SBMcq ? SBMcq.book(b, {src: SOLCLS ? 'm6c' + SOLCLS : 'm6', inline, sentence, after, textbook: key && key.a, partNo}) : '';


  // The labels of the parts of one question, with a repeated label read as the next one ("i, ii, ii, iv" is a misprint for "i, ii, iii, iv"), so a part never
  // takes the answer of its neighbour.
  const ROMAN_SEQ = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx'];
  function partLabels(parts) {
    let prev = '';
    return (parts || []).map(p => {
      let k = partKey(p.no);
      if (k && k === prev && ROMAN_SEQ.includes(k)) k = ROMAN_SEQ[ROMAN_SEQ.indexOf(k) + 1] || k;
      prev = k;
      return k;
    });
  }
  // owner: for a "parts" block, the question that came before it (its parts are answered by that question's printed line)
  function question(q, ans, showAns, exId, owner) {
    const own = owner || q;
    const hit = ans[own.no];
    const parts = q.parts || [];
    const labels = partLabels(parts);
    // the a) b) c) d) lines after a roman-numbered part are that part's options, not questions of their own
    const isOpt = parts.map((p, i) => /^[a-e]$/.test(labels[i]) && labels.slice(0, i).some(x => isRoman(x)));
    const optionsOf = i => {
      const o = {}, circles = String(parts[i].en || '').split('○');
      if (circles.length === 4 || circles.length === 5) circles.slice(1).forEach((t, k) => { o['abcd'[k]] = t.trim(); });   // "Stem ○ one ○ two ○ three ○ four"
      for (let j = i + 1; j < parts.length && isOpt[j]; j++) o[labels[j]] = parts[j].en;
      return o;
    };
    let fromKey = false;
    // the Ans button of a question or part: its own solution, else the printed key / an answer written for it
    const button = (node, partNo, optText) => {
      if (!showAns) return '';
      if (node.solId) return solButton(node.solId);
      const rec = leafRec(exId, own, hit, partNo, optText);
      if (!rec) return '';
      if (rec.src === 'book') fromKey = true;
      return keyButton(rec);
    };
    const keyOf = (p, partNo) => { if (p.solId) return null; const ex = extraRec(exId, own.no, partNo); return ex ? {a: ex.answer} : hit || null; };
    const mcq = mcqHtml(q, hit, parts.length ? (showAns ? solButton(q.solId) : '') : button(q, null));
    const pb = parts.map((p, i) => isOpt[i] ? '' : button(p, labels[i], optionsOf(i)));
    const partMcq = parts.map((p, i) => isOpt[i] ? '' : mcqHtml(p, keyOf(p, labels[i]), pb[i], labels[i]));
    const hasSol = pb.some(Boolean);
    const partsHtml = parts.length ? `<div class="m6-parts${partMcq.some(Boolean) || hasSol || parts.some(p => p.ur || (p.en || '').length > 28) ? ' block' : ''}">${parts.map((p, pi) => `<div class="m6-part">${p.no ? `<strong>${esc(p.no)})</strong> ` : ''}${partMcq[pi] || `${p.ur ? sentence(p, 'span') : inline(p.en, true)}${pb[pi]}`}</div>`).join('')}</div>` : '';
    let a = '';
    if (showAns && !fromKey) {
      a = hit ? `<div class="m6-ans"><strong>Textbook answer:</strong> ${inline(hit.a, false)} <span style="color:#64748b">(p. ${esc(hit.printed)})</span></div>` : '';
    }
    if (mcq) a = '';
    const head = mcq || (q.en ? (q.ur ? sentence(q, 'span') : inline(q.en, true)) : '');
    return `<div class="m6-q"><span class="m6-qno">${esc(q.no)}${/^[0-9A-Za-z]+$/.test(q.no) ? "." : ""}</span>${head}${!mcq && showAns ? (parts.length ? solButton(q.solId) : button(q, null)) : ''}${partsHtml}${a}</div>`;
  }
  function cell(c) {
    const parts = String(c).split('||').map(x => x.trim());
    if (parts.length !== 3) return inline(c, false);
    return `${inline(parts[0], true)}<span class="m6-hsub"><span lang="ur">${inline(parts[1], false)}</span> · <span lang="ps">${inline(parts[2], false)}</span></span>`;
  }
  // ---- fills: a table with empty cells or a project box has a button when js/fills_data.js holds its answer (js/sb_fill.js opens it) ----
  // The key is a hash of the book title and the text of the table / box, so a fill never shows up on a table that was edited since it was written.
  function fillHash(str) {
    let a = 0x811c9dc5, b = 0x9747b28c;
    for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); a = Math.imul(a ^ c, 0x01000193); b = Math.imul(b ^ c, 0x85ebca6b) ^ (b >>> 13); }
    return (a >>> 0).toString(16).padStart(8, '0') + (b >>> 0).toString(16).padStart(8, '0');
  }
  const cellText = c => String(typeof c === 'string' ? c : (c && c.en) || '').replace(/\s+/g, ' ').trim();
  function plainOf(list) {
    return (list || []).map(x => {
      if (!x || typeof x !== 'object') return '';
      if (x.t === 'ul') return (x.items || []).map(i => cellText(i)).join(' ');
      if (x.t === 'table') return (x.rows || []).map(r => r.map(cellText).join(' ')).join(' ');
      if (x.t === 'q') return cellText(x.no) + ' ' + cellText(x.en) + ' ' + plainOf(x.parts);
      return cellText(x.en) + ' ' + plainOf(x.blocks);
    }).join(' ').replace(/\s+/g, ' ').trim();
  }
  const fillKeyOfTable = b => fillHash(((BOOK && BOOK.title) || '') + '|T|' + b.rows.map(r => r.map(cellText).join('¦')).join('¶'));
  const fillKeyOfBox = b => fillHash(((BOOK && BOOK.title) || '') + '|B|' + cellText(b.title) + '|' + plainOf(b.blocks));
  const hasFill = k => !!(window.SB_FILLS && window.SB_FILLS[k]);
  const hasEmpty = b => b.rows.slice(b.head || 0).some(r => r.some(c => !cellText(c)));
  // Book figures without an explicit width draw at about their viewBox size instead of stretching to the column.
  function natural(svg) {
    return svg.replace(/<svg(?![^>]*\swidth=)([^>]*\sviewBox="[\d.\-]+ [\d.\-]+ ([\d.]+) [\d.]+")/, (m, attrs, w) => `<svg width="${Math.round(w * 1.3)}"${attrs}`);
  }

  function blocks(list, ctx) {
    ctx = ctx || {};
    let lastQ = null;       // a "parts" block continues the question before it
    return (list || []).map(b => {
      switch (b.t) {
        case 'page': return ctx.noPages ? '' : `<div class="m6-page" aria-label="Source page">${b.printed != null ? `Textbook page ${esc(b.printed)}` : 'Unnumbered page'} · PDF page ${esc(b.pdf)}</div>`;
        case 'h': return heading(b);
        case 'p': return sentence(b, 'p');
        case 'm': return `<p class="m6-m">${inline(b.en, false)}</p>`;
        case 'eq': return b.ur ? `<div class="m6-eq m6-s" tabindex="0" onclick="m6Toggle(this,event)" onkeydown="if(event.key==='Enter'||event.key===' '){m6Toggle(this,event)}">${inline('$$' + b.tex + '$$', false)}</div>${translations(b)}` : `<div class="m6-eq">${inline('$$' + b.tex + '$$', false)}</div>`;
        case 'ul': return `<ul class="m6-ul">${b.items.map(i => `<li class="lv${i.lv || 1}">${sentence(i, 'span')}</li>`).join('')}</ul>`;
        case 'box': {
          const label = b.title ? b.title : (BOX_LABEL[b.kind] ? {en: BOX_LABEL[b.kind]} : null);
          const fk = fillKeyOfBox(b), fb = hasFill(fk) ? `<button type="button" class="sb-fill-btn" aria-expanded="false" onclick="SBFill.work(this)">Show the work</button>` : '';
          return `<div role="note" class="m6-box ${esc(b.kind)}"${fb ? ` data-fkey="${fk}"` : ''}>${label || fb ? `<div class="m6-box-t">${label ? (label.ur ? sentence(label, 'span') : esc(label.en)) : ''}${fb}</div>` : ''}${blocks(b.blocks, ctx)}</div>`;
        }
        case 'example': return `<section class="m6-example"><div class="m6-example-t">${/^\d/.test(b.no) ? 'Example ' + esc(b.no) : esc(b.no)}${b.title ? ': ' : ''}${b.title ? (b.title.ur ? sentence(b.title, 'span') : inline(b.title.en, true)) : ''}</div>${blocks(b.blocks, ctx)}</section>`;
        case 'exercise': {
          const ans = answersFor(b.id);
          return `<section class="m6-exercise"><div class="m6-exercise-t">${/^\d/.test(b.id) ? 'Exercise ' : ''}${esc(b.id)}</div>${blocks(b.blocks, Object.assign({}, ctx, {ans, exId: b.id}))}</section>`;
        }
        case 'q': lastQ = b; return question(b, ctx.ans || {}, !!ctx.showAnswers, ctx.exId);
        case 'parts': return question({no: '', parts: b.parts}, ctx.ans || {}, !!ctx.showAnswers, ctx.exId, lastQ).replace('<span class="m6-qno">.</span>', '');
        case 'svg': return `<figure class="m6-fig">${natural(b.svg)}${b.cap ? `<figcaption>${b.cap.ur ? sentence(b.cap, 'span') : inline(b.cap.en, true)}</figcaption>` : ''}</figure>`;
        case 'table': {
          const head = b.rows.slice(0, b.head), body = b.rows.slice(b.head);
          const tk = hasEmpty(b) ? fillKeyOfTable(b) : '', tf = tk && hasFill(tk);
          return `<div class="m6-table"${tf ? ` data-fkey="${tk}"` : ''}>${tf ? `<div class="sb-fill-bar"><button type="button" class="sb-fill-btn" aria-pressed="false" onclick="SBFill.table(this)">Fill the table</button></div>` : ''}<table>${b.cap ? `<caption>${b.cap.ur ? sentence(b.cap, 'span') : esc(b.cap.en)}</caption>` : ''}${head.length ? `<thead>${head.map(r => `<tr>${r.map(c => `<th scope="col">${cell(c)}</th>`).join('')}</tr>`).join('')}</thead>` : ''}<tbody>${body.map(r => `<tr>${r.map(c => `<td>${cell(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
        }
        default: return '';
      }
    }).join('');
  }

  if (!window.SBLangMode) {
    window.SB_LANG_MODE = window.SB_LANG_MODE || 0;
    window.SBLangMode = function (n) {
      window.SB_LANG_MODE = n;
      document.querySelectorAll('[data-sbmode]').forEach(r => { r.dataset.sbmode = String(n); });
      document.querySelectorAll('.sb-langtab').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.m) === n)));
    };
  }
  const tools = () => `<div class="m6-tools"></div><p class="m6-help">Click any sentence to see its translation just below it. Point at a word for its meaning.</p>`;
  const root = inner => `<div class="m6-root${RTL_PRIMARY() ? ' m6-rtl' : ''}" data-sbmode="${window.SB_LANG_MODE || 0}">${tools()}${inner}</div>`;

  function card(id, badge, title, body, open) {
    return `<div class="math-topic-card math-accordion-card${open ? ' open' : ''}" id="math-topic-${esc(id)}">
      <div class="math-acc-header" onclick="toggleMathAccordion(this)">
        <div style="display:flex;align-items:center;gap:.75rem;min-width:0;"><span class="math-badge" style="background:#e0f2fe;color:#0369a1;">${esc(badge)}</span>
        <h3 style="color:#0f172a;font-size:1.05rem;font-weight:700;margin:0;">${inline(title, false)}</h3></div>
        <span class="math-acc-icon">${open ? '−' : '+'}</span></div>
      <div class="math-accordion-body" style="display:${open ? 'block' : 'none'};margin-top:1rem;border-top:1px solid #e2e8f0;padding-top:1rem;">${body}</div></div>`;
  }
  function pending(ch) {
    return `<div class="math-topic-card" style="padding:1.5rem;text-align:center;color:#475569;">Unit ${esc(ch.number)} (from textbook page ${esc(ch.pageStart)}) is awaiting page-by-page source review. ${esc(BOOK.reviewedPdfPages || 0)} of ${esc(BOOK.totalPdfPages || '')} source pages reviewed so far.</div>`;
  }

  const BOOK_LAST = () => (typeof MATH_6_DATA !== 'undefined' ? MATH_6_DATA[MATH_6_DATA.length - 1] : null);
  function lesson(ch) {
    let html = '';
    if (ch.number === 1 && BOOK.frontMatter && BOOK.frontMatter.length) {
      html += card('m6-front', 'Book', 'Cover, credits and contents', root(blocks(BOOK.frontMatter)), false);
    }
    if (!ch.sections.length) return html + pending(ch);
    html += pageCards(ch.sections, {id: sec => sec.id, badge: (sec, i) => /^\d+\.\d/.test(sec.id) ? `Topic ${sec.id}` : (/summary/i.test(sec.id) ? 'Summary' : (/review/i.test(sec.id) ? 'Review' : 'Unit opening')), title: sec => sec.title + (sec.titleUrdu ? ` · ${sec.titleUrdu}` : ''), root, blocks, card});
    if (BOOK.backMatter && BOOK.backMatter.length && ch === BOOK_LAST()) {
      html += card('m6-back', 'Book', 'Glossary, formulas, web links, index and symbols', root(blocks(BOOK.backMatter)), false);
    }
    return html;
  }
  function examples(ch) {
    if (!ch.workedExamples.length) return pending(ch);
    return ch.workedExamples.map(ex => card(ex.id, /^\d/.test(ex.no) ? `Example ${ex.no}` : ex.no, (ex.title ? ex.title.en : '') + ` (p. ${ex.printed})`, root(blocks([ex], {noPages: true})), false)).join('');
  }
  function exercises(ch) {
    if (!ch.exercises.length) return pending(ch);
    const reviewedAnswers = (BOOK.answerPdfPages || []).length > 0;
    return ch.exercises.map(ex => card('ex-' + ex.id, /^\d/.test(ex.id) ? `Exercise ${ex.id}` : ex.id, `Textbook page ${ex.printed}`,
      root((reviewedAnswers ? '' : '<p class="m6-help">Textbook answers (printed from page 238) are attached as their pages are reviewed.</p>') + blocks([ex], {showAnswers: true, noPages: true})), false)).join('');
  }
  function slos(ch) {
    if (!ch.slos.length) return pending(ch);
    return root(`<div class="m6-h3">Student Learning Outcomes</div><p class="m6-help">From the textbook unit opening page.</p><ul class="m6-ul">${ch.slos.map(i => `<li class="lv${i.lv || 1}">${sentence(i, 'span')}</li>`).join('')}</ul>`);
  }
  function summary(ch) {
    const sec = ch.sections.find(s => /summary/i.test(s.id) || /summary/i.test(s.title));
    const eqs = [];
    ch.sections.forEach(s => (function walk(list) { (list || []).forEach(b => { if (b.t === 'eq') eqs.push(b); if (b.blocks) walk(b.blocks); }); })(s.blocks));
    if (!sec && !eqs.length) return pending(ch);
    return root((sec ? blocks(sec.blocks, {noPages: true}) : '') + (eqs.length ? `<div class="m6-h3">Equations shown in this unit</div>${blocks(eqs)}` : ''));
  }

  const wrap = (name, fn) => {
    if (typeof window[name] !== 'function') return;
    SBHooks.use(name, function (original) { return function (ch) { return isCls6() && ch && MATH_6_DATA.includes(ch) ? fn(ch) : original.apply(this, arguments); }; });
  };
  wrap('renderMathLesson', lesson);
  wrap('renderMathExamples', examples);
  wrap('renderMathExercises', exercises);
  wrap('renderMathSLOs', slos);
  wrap('renderMathFormulaSheet', summary);
  // Class 6 subjects open in the generic subject workspace (openSubjectWorkspace -> switchSubjectTab).
  if (typeof window.switchSubjectTab === 'function') {
    const TAB_RENDER = {lesson, concepts: examples, exercise: exercises, slos, formulas: summary};
    const TAB_LABEL = {lesson: '📖 Lessons', concepts: '💡 Worked Examples', exercise: '✍️ Exercises', slos: '🎯 Learning Outcomes', formulas: '📐 Summary & Formulas'};
    SBHooks.use('switchSubjectTab', function (originalSwitch) { return function (subjKey, tabId, chIdx, classId) {
      const ch = classId === 'cls6' && subjKey === 'math' ? MATH_6_DATA[chIdx] || MATH_6_DATA[0] : null;
      if (!ch || !TAB_RENDER[tabId]) return originalSwitch.apply(this, arguments);
      state.activeSubjTab = tabId;
      document.querySelectorAll('.math-top-tab, .math-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
        if (TAB_LABEL[btn.dataset.tab]) btn.textContent = TAB_LABEL[btn.dataset.tab];
      });
      const container = document.getElementById('subjTabContent');
      const subBar = document.getElementById('subjSubTabsBar');
      if (subBar) { subBar.style.display = 'none'; subBar.innerHTML = ''; }
      if (!container) return;
      container.innerHTML = TAB_RENDER[tabId](ch);
      container.scrollTop = 0;
    }; });
  }
  // The legacy OCR exponent repair must not rewrite reviewed text or KaTeX annotations.
  if (typeof window.typesetChapterMath === 'function') {
    SBHooks.use('typesetChapterMath', function (originalTypeset) { return function (container) {
      if (container && container.querySelector && container.querySelector('.m6-root')) {
        if (window.mathTypesetterObserver) { window.mathTypesetterObserver.disconnect(); window.mathTypesetterObserver = null; }
        return;
      }
      return originalTypeset.apply(this, arguments);
    }; });
  }
  // ---- page-wise lesson: the book's pages in printed order, one sheet per page --------------------------
  // Book data is cut into topics ("sections"), and every section starts with its own page marker, so a printed
  // page that holds the end of one topic and the start of the next used to appear twice, in two cards. The
  // readers now hand their sections to pageCards(): runs of ordinary lesson sections become ONE page flow (the
  // topic title stays as a heading inside the page it starts on; a page marker that repeats the previous
  // section's last page is dropped), while exercise / key-point / SLO sections stay separate cards for
  // sb_structure.js to place in their own tabs. opts.minimal (Classes 1-2, whose read-along and activity
  // widgets are keyed to one card per section) only joins the sections that share a split page.
  const KIND_EX = /^(?:doing\b|(?:review\s+|end[- ]of[- ](?:unit|chapter)\s+)?exercises?\b|unit\s+\d+\s+exercise|(?:multiple[- ]choice|conceptual|comprehensive|numerical|short(?:[- ]answer)?|long(?:[- ]answer)?|review|self[- ]assessment|test\s+yourself)\s+(?:questions?|problems?)|questions?\s+for\s+(?:review|practice)|مشق(?:ی|یں)?(?=\s|$|[·—:\-(])|مشقی\s+سوالات|سوالات(?=\s|$|[·—:\-(])|تمرین|مشغولتیا)/i;
  const KIND_SUM = /^(?:key\s+points?|summary|chapter\s+summary|unit\s+summary|points\s+to\s+remember|اہم\s+نکات|خلاصہ|لنډیز)/i;
  const KIND_SLO = /^(?:slo[- ]based\s+practice|slo\s+پر\s+مبنی)/i;
  const LEAD_WORD = /^(?:(?:lesson|topic|part|paragraph|book|page)\s+(?:\d[\w.\-]*\s*)?)/i;
  function sectionKind(head) {
    const t = String(head || '').replace(/[⛶▸▾+−🔊]/g, ' ').replace(/\s+/g, ' ').trim();
    if (/^doing\b/i.test(t)) return 'exercise';
    const h = t.replace(LEAD_WORD, '');
    return KIND_SLO.test(h) ? 'slos' : KIND_SUM.test(h) ? 'summary' : KIND_EX.test(h) ? 'exercise' : '';
  }
  const flat = s => String(s || '').toLowerCase().replace(/[^a-z0-9؀-ۿ]+/g, '');
  const lastPdfOf = (list, from) => { let p = from; (list || []).forEach(b => { if (b && b.t === 'page') p = b.pdf; }); return p; };
  function flowBlocks(secs) {
    const out = []; let lastPdf = null;
    secs.forEach(sec => {
      const bl = (sec.blocks || []).slice();
      const lead = bl[0] && bl[0].t === 'page' ? bl.shift() : null;
      if (lead && !(lastPdf != null && lead.pdf === lastPdf)) out.push(lead);
      if (lead) lastPdf = lead.pdf;
      const first = bl.find(b => b.t !== 'page');
      const ft = first && first.t === 'h' ? flat(first.en) : '', st = flat(sec.title);
      const same = ft && st && (ft.indexOf(st) >= 0 || st.indexOf(ft) >= 0);
      if (sec.title && !same && !/(^|[-_])(intro|opening)$/i.test(String(sec.id || ''))) {
        out.push({t: 'h', l: 3, en: sec.title, ur: sec.titleUrdu, ps: sec.titlePashto || sec.titleUrdu});
      }
      bl.forEach(b => out.push(b));
      lastPdf = lastPdfOf(bl, lastPdf);
    });
    return out;
  }
  function pageCards(secs, o) {
    secs = secs || [];
    const ctx = o.ctx || {showAnswers: true};
    const own = (sec, k) => o.card(o.id(sec, k), o.badge(sec, k), o.title(sec, k), o.root(o.blocks(sec.blocks, ctx)), o.open ? o.open(k) : k === 0);
    let html = '';
    if (o.minimal) {
      let group = [], lastPdf = null;
      const flush = k0 => {
        if (!group.length) return;
        const g = group[0];
        html += group.length === 1 ? own(g, k0) : o.card(o.id(g, k0), o.badge(g, k0), o.title(g, k0), o.root(o.blocks(flowBlocks(group), ctx)), o.open ? o.open(k0) : k0 === 0);
        group = [];
      };
      let k0 = 0;
      secs.forEach((sec, k) => {
        const first = (sec.blocks || [])[0];
        const dup = group.length && first && first.t === 'page' && lastPdf != null && first.pdf === lastPdf;
        if (!dup) { flush(k0); k0 = k; }
        group.push(sec); lastPdf = lastPdfOf(sec.blocks, lastPdf);
      });
      flush(k0);
      return html;
    }
    let run = [];
    const flushRun = () => {
      if (!run.length) return;
      // one collapsed card per printed page: a "Page N" tab (click to slide it open, ⛶ for full screen) over the page sheet
      const pages = []; let cur = null;
      flowBlocks(run).forEach(b => { if (b.t === 'page' || !cur) { cur = {page: b.t === 'page' ? b : null, blocks: []}; pages.push(cur); } cur.blocks.push(b); });
      const base = o.id(run[0], 0);
      pages.forEach((pg, n) => {
        const h = pg.blocks.find(b => b.t === 'h');
        const title = h ? String(h.en || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
        const badgeText = pg.page ? (pg.page.printed != null ? 'Page ' + pg.page.printed : 'Scan ' + pg.page.pdf) : 'Page';
        html += o.card(`${base}-pg${pg.page ? pg.page.pdf : 'x' + n}`, badgeText, title || badgeText, o.root(o.blocks(pg.blocks, ctx)), false)
          .replace('<div class="math-topic-card math-accordion-card', '<div data-sb-tp="1" class="math-topic-card math-accordion-card sb-pgcard');
      });
      run = [];
    };
    secs.forEach((sec, k) => {
      if (sectionKind(String(o.badge(sec, k)) + ' ' + String(sec.title || ''))) { flushRun(); html += own(sec, k); }
      else run.push(sec);
    });
    flushRun();
    return html;
  }
  if (typeof document !== 'undefined' && !document.getElementById('sb-pageflow-style')) {
    const st = document.createElement('style');
    st.id = 'sb-pageflow-style';
    st.textContent = '.sb-pgcard .math-accordion-body{padding-bottom:1.8rem}.sb-pgcard.open>.math-accordion-body{animation:sbpgslide .28s ease}@keyframes sbpgslide{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}';
    document.head.appendChild(st);
  }
  // what an Ans button of a part would open, for tools/audit/answers_audit.js: {kind: 'part' | 'extra' | 'whole' | 'none', answer}
  function answerOf(exId, q, partNo, optText) {
    const ex = extraRec(exId, q.no, partNo);
    if (ex) return {kind: 'extra', answer: ex.answer};
    const hit = answersFor(exId)[q.no];
    const whole = hit ? String(hit.a || '').trim() : '';
    if (whole && partNo && partAnswer(whole, partNo)) return {kind: 'part', answer: partAnswer(whole, partNo)};
    return whole ? {kind: partNo ? 'whole' : 'part', answer: whole} : {kind: 'none', answer: ''};
  }
  // leafAnswer: the Ans record of one question or part as its button would show it (printed key, written answer), for tools/tests/build_test_bank.js
  const leafAnswer = (exId, q, owner, partNo, optText) => { const own = owner || q; return leafRec(exId, own, answersFor(exId)[own.no], partNo, optText); };
  window.MATH6_READER = {blocks, inline, sentence, card, root, withBook, esc, pageCards, css: true, answerOf, partKey, partLabels, isRoman, keyParts, fillKeyOfTable, fillKeyOfBox, cellText, leafAnswer};
})();
