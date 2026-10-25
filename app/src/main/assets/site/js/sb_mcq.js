/* SpaceBook interactive MCQs — one look and one behaviour for every multiple-choice question.
 *
 *  Every MCQ in the app (textbook exercises, SLO banks, topic checks, drills, Class 1–12 book
 *  readers) is shown the same way:
 *    • the options sit side by side (wrapping on narrow screens) as radio buttons;
 *    • choosing one shows a green "Correct" or red "Wrong" alert (inline + a short pop-up);
 *    • the alert explains the choice: why the right option is right, and for a wrong choice
 *      what was chosen, what the right answer is and why;
 *    • "Try again" clears the choice.
 *
 *  Two ways in:
 *    1. SBMcq.book(block, ctx)   — the book readers (math5/6/7/8/11_reader.js) render questions whose
 *       options are printed inline ("Stem? a. one b. two c. three d. four") straight as widgets.
 *       The answer comes from the book's solution (sol.answer) or the printed answer key.
 *    2. SBMcq.scan(root)         — older renderers in app.js and the Class 9–12 views already draw
 *       clickable options with their own handlers. A MutationObserver finds them, reads the correct
 *       option from the handler call (or data-correct / .correct), and swaps the option list for the
 *       shared radio row. The original option is still clicked behind the scenes, so the existing
 *       scoring, study stats and coins keep working; its feedback text becomes the explanation.
 */
(function () {
  'use strict';
  if (window.SBMcq) return;

  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const strip = html => String(html == null ? '' : html).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  const ARABIC = /[؀-ۿ]/;
  const PASHTO = /[ټځڅډړږښګڼېۍ]/;
  // the first letter decides: an English question with Urdu/Pashto lines under it stays English
  const langOf = text => { const t = strip(text).replace(/\$[^$]*\$/g, ' ').replace(/(English|اردو|پښتو)/g, ' '); const m = t.match(/[A-Za-z؀-ۿ]/); if (!m || /[A-Za-z]/.test(m[0])) return 'en'; return PASHTO.test(t) && !/[ٹڈڑںھہے]/.test(t) ? 'ps' : 'ur'; };
  const LETTERS = {
    en: ['A', 'B', 'C', 'D', 'E', 'F'],
    ur: ['الف', 'ب', 'ج', 'د', 'ہ', 'و'],
    ps: ['الف', 'ب', 'ج', 'د', 'ه', 'و']
  };
  const T = {
    en: {right: 'Correct!', wrong: 'Wrong answer', isRight: x => `${x} is the right answer.`, chose: x => `You chose ${x} — this is not correct.`,
      correctIs: x => `The correct answer is ${x}.`, why: 'Why', whyNot: 'Why not your choice', others: list => `The other options (${list}) do not answer this question.`,
      notChosen: x => `${x} does not fit what the question asks, so it cannot be the answer.`,
      noExp: 'This is the answer given in the textbook answer key.', retry: '↺ Try again', noKey: 'Answer key not available',
      noKeyText: 'The textbook does not print an answer for this question, so your choice cannot be checked yet.', loading: 'Checking…'},
    ur: {right: 'درست جواب!', wrong: 'غلط جواب', isRight: x => `${x} درست جواب ہے۔`, chose: x => `آپ نے ${x} چنا — یہ درست نہیں۔`,
      correctIs: x => `درست جواب ${x} ہے۔`, why: 'وجہ', whyNot: 'آپ کا انتخاب کیوں غلط ہے', others: list => `باقی اختیارات (${list}) اس سوال کا جواب نہیں ہیں۔`,
      notChosen: x => `${x} سوال کے مطابق نہیں، اس لیے یہ جواب نہیں ہو سکتا۔`,
      noExp: 'یہی جواب درسی کتاب کی جوابی کلید میں دیا گیا ہے۔', retry: '↺ دوبارہ کوشش کریں', noKey: 'جوابی کلید دستیاب نہیں',
      noKeyText: 'درسی کتاب میں اس سوال کا جواب نہیں دیا گیا، اس لیے آپ کا انتخاب ابھی جانچا نہیں جا سکتا۔', loading: 'جانچ ہو رہی ہے…'},
    ps: {right: 'سم ځواب!', wrong: 'ناسم ځواب', isRight: x => `${x} سم ځواب دی.`, chose: x => `تاسو ${x} وټاکه — دا سم نه دی.`,
      correctIs: x => `سم ځواب ${x} دی.`, why: 'ولې', whyNot: 'ستاسو انتخاب ولې ناسم دی', others: list => `نور انتخابونه (${list}) د دې پوښتنې ځواب نه دي.`,
      notChosen: x => `${x} د پوښتنې سره سمون نه لري، نو ځواب کېدای نه شي.`,
      noExp: 'همدا ځواب د درسي کتاب د ځوابونو په کیلي کې راغلی دی.', retry: '↺ بیا هڅه وکړئ', noKey: 'د ځوابونو کیلي نشته',
      noKeyText: 'درسي کتاب د دې پوښتنې ځواب نه دی ورکړی، نو ستاسو انتخاب لا نه شي ازمویل کېدای.', loading: 'ازموینه…'}
  };

  // ---------------------------------------------------------------- answer parsing
  // "Stem? a. one b. two c. three d. four" · "(a) … (b) …" · "a) … b) …" · Urdu/Pashto "(الف) … (ب) …" / "الف۔ … ب۔ …"
  const UR_SEQ = ['الف', 'ب', 'ج', 'د'];
  function splitInline(text) {
    const t = String(text == null ? '' : text).replace(/\s+/g, ' ').trim();
    if (!t) return null;
    // Class 9 / 10 review questions print the options after small circles: "Stem ○ one ○ two ○ three ○ four"
    if (t.includes('○')) {
      const seg = t.split('○').map(s => s.trim()), opts = seg.slice(1);
      if (opts.length >= 3 && opts.length <= 4 && seg[0].length >= 2 && opts.every(o => o && o.length <= 220)) return {stem: seg[0], opts, circles: true};
    }
    const rx = /(?:^|\s|—)(?:\(([a-d])\)|([a-d])[.)]|\((الف|ا|ب|ج|د)\)|(الف|ب|ج|د)[.۔)])(?=\s)/g;
    const marks = [];
    let m;
    while ((m = rx.exec(t))) {
      const letter = m[1] || m[2] || 'abcd'[(m[3] || m[4]) === 'ا' ? 0 : UR_SEQ.indexOf(m[3] || m[4])];
      const lead = m[0].length - m[0].replace(/^[\s—]+/, '').length;
      marks.push({letter, at: m.index + lead, end: rx.lastIndex});
      rx.lastIndex = Math.max(rx.lastIndex - 1, m.index + 1);
    }
    for (let i = 0; i < marks.length; i++) {
      if (marks[i].letter !== 'a') continue;
      const run = [marks[i]];
      for (let j = i + 1; j < marks.length && run.length < 4; j++) if (marks[j].letter === 'abcd'[run.length]) run.push(marks[j]);
      if (run.length < 3) continue;
      const stem = t.slice(0, run[0].at).replace(/[\s—–-]+$/, '').trim();
      const opts = run.map((r, k) => t.slice(r.end, k + 1 < run.length ? run[k + 1].at : t.length).replace(/[\s—–]+$/, '').trim());
      if (stem.length < 4 || opts.some(o => !o || o.length > 220)) continue;
      return {stem, opts};
    }
    // Urdu questions that print their choices in brackets at the end: "… کس سال میں کیا؟ (1863ء، 1869ء، 1875ء، 1886ء)" · "… تھے۔ (ا، ب، ج)"
    const br = t.match(/^(.{6,}?)\s*[(（]([^()（）]*،[^()（）]*)[)）]\s*[.۔]?$/);
    if (br) {
      const opts = br[2].split(/\s*،\s*/).map(s => s.trim()).filter(Boolean);
      if (opts.length >= 3 && opts.length <= 5 && opts.every(o => o.length <= 90)) return {stem: br[1], opts, bracket: true};
    }
    return null;
  }
  const OPT_PREFIX = /^\s*(\(?[a-dA-D]\)|[a-dA-D][.)]|\((الف|ا|ب|ج|د)\)|(الف|ب|ج|د)[.)۔-])\s*/;
  const norm = s => strip(s).replace(OPT_PREFIX, '').toLowerCase().replace(/\$/g, '').replace(/[^\p{L}\p{N}]+/gu, '');
  const UR_IDX = {'الف': 0, 'ا': 0, 'ب': 1, 'ج': 2, 'د': 3};
  const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi', 'xvii', 'xviii', 'xix', 'xx'];
  const UR_DIGIT = s => String(s).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  function letterIndex(s) {
    s = String(s).trim();
    let m = s.match(/^\(?([a-dA-D])\)?(?:[.)\s:،۔]|$)/);
    if (m) return 'abcd'.indexOf(m[1].toLowerCase());
    m = s.match(/^\(?(الف|ا|ب|ج|د)\)?(?:[.)\s۔:،]|$)/);
    if (m) return UR_IDX[m[1]];
    return -1;
  }
  // index of the correct option, or -1. partNo lets "i: d; ii: a; …" style keys answer one part.
  // textFirst: the key is the text of the option itself (choices printed in brackets), so "70" names the option 70, not the 71st
  function resolve(raw, opts, partNo, textFirst) {
    if (raw == null || raw === '') return -1;
    if (textFirst) { const n0 = norm(strip(raw)); const h0 = n0 ? opts.findIndex(o => norm(o) === n0) : -1; if (h0 >= 0) return h0; }
    if (typeof raw === 'number' && Number.isInteger(raw)) return raw >= 0 && raw < opts.length ? raw : -1;
    const s = strip(raw);
    if (/^\d+$/.test(s)) { const n = +s; return n < opts.length ? n : -1; }
    let li = letterIndex(s);
    if (li >= 0 && li < opts.length) return li;
    const n = norm(s);
    if (n) {
      const hit = opts.findIndex(o => norm(o) === n);
      if (hit >= 0) return hit;
    }
    if (partNo != null && partNo !== '') {
      // keyed list: "i: d; ii: a" · "(۱) (ب) لقب؛ (۲) (ج) عرف" · "xiv: (ا) …"
      const key = UR_DIGIT(String(partNo)).replace(/[()\s.]/g, '').toLowerCase();
      const keys = new Set([key]);
      if (/^\d+$/.test(key) && ROMAN[+key - 1]) keys.add(ROMAN[+key - 1]);
      if (ROMAN.includes(key)) keys.add(String(ROMAN.indexOf(key) + 1));
      const body = UR_DIGIT(s);
      const rx = /(?:^|[;؛،,\s])\(?([ivx]+|\d+)\)?\s*[:.)\-–]?\s*(\(?(?:[a-dA-D]|الف|ا|ب|ج|د)\)?)(?=[\s.)۔:،;؛]|$)/gi;
      let m;
      while ((m = rx.exec(body))) if (keys.has(m[1].toLowerCase())) { li = letterIndex(m[2].replace(/[()]/g, '') + ' '); if (li >= 0 && li < opts.length) return li; }
    }
    if (n && n.length >= 3) {
      const part = opts.map((o, i) => [norm(o), i]).filter(([o]) => o && o.length >= 2 && (n === o || n.startsWith(o) || o.startsWith(n)));
      if (part.length === 1) return part[0][1];
    }
    return -1;
  }

  // ---------------------------------------------------------------- widget markup
  const TAG = {en: '🎯 MCQ', ur: '🎯 کثیر الانتخابی سوال', ps: '🎯 څو ځوابه پوښتنه'};
  let uid = 0;
  const nextId = () => 'sbq' + (++uid) + '_' + Math.random().toString(36).slice(2, 6);
  function optionsHtml(id, options, lang, dir) {
    const L = LETTERS[lang] || LETTERS.en;
    return `<div class="sbq-opts" role="radiogroup"${dir ? ` dir="${dir}"` : ''}>${options.map((o, i) =>
      `<label class="sbq-opt"><input type="radio" name="${id}" value="${i}"><span class="sbq-l">${L[i] || i + 1}</span><span class="sbq-t">${o}</span></label>`).join('')}</div>`;
  }
  /* SBMcq.html({stem, options:[html], correct, explain, lang, dir, src, sol, part})
   * correct: option index, or null when it is resolved later from (src, sol) on the first click. */
  function html(spec) {
    const id = nextId();
    const lang = spec.lang || langOf((spec.optionsText || spec.options || []).join(' ') + ' ' + (spec.stemText || strip(spec.stem)));
    const dir = spec.dir || (lang === 'en' ? '' : 'rtl');
    const data = [
      `data-sbq="${id}"`, `data-lang="${lang}"`,
      Number.isInteger(spec.correct) ? `data-correct="${spec.correct}"` : '',
      spec.src ? `data-src="${esc(spec.src)}"` : '', spec.sol ? `data-sol="${esc(spec.sol)}"` : '',
      spec.part != null && spec.part !== '' ? `data-part="${esc(spec.part)}"` : '',
      spec.textbook ? `data-key="${esc(spec.textbook)}"` : '', spec.track === false ? 'data-notrack="1"' : ''
    ].filter(Boolean).join(' ');
    const plain = (spec.optionsText || spec.options.map(strip)).map(esc).join('␞');
    return `<div class="sbq" ${data}${dir ? ` dir="${dir}"` : ''}>` +
      (spec.tag ? `<span class="sbq-tag">${TAG[lang] || TAG.en}</span>` : '') +
      (spec.stem ? `<div class="sbq-stem">${spec.stem}</div>` : '') +
      optionsHtml(id, spec.options, lang, dir) +
      `<div class="sbq-alert" role="status" aria-live="polite" hidden></div>` +
      `<template class="sbq-plain">${plain}</template>` +
      (spec.explain ? `<template class="sbq-exp">${spec.explain}</template>` : '') +
      `</div>`;
  }

  // ---------------------------------------------------------------- book readers
  const resolvers = {};
  /* register('m6', {inline(text, words), get(id) → Promise<solution>, sols(id) → solution|undefined}) */
  function register(src, api) { resolvers[src] = api; }
  const isAuto = id => /-auto-/.test(String(id || ''));
  // the solution's steps in the question's own language (an English question never gets an Urdu-only step)
  function stepsHtml(sol, api, lang) {
    if (!sol) return '';
    const fmt = t => api && api.inline ? api.inline(t, false) : esc(t);
    const pickStep = s => !s ? '' : lang === 'en' ? s.en : (s.en && langOf(s.en) !== 'en' ? s.en : s[lang] || s.ur || s.en);
    const steps = (sol.steps || []).map(pickStep).filter(t => t && !/^(agent answer|نمونے کا جواب|p\. ?\d+)\.?$/i.test(String(t).trim()));
    return steps.map(t => `<p>${fmt(t)}</p>`).join('');
  }
  const NOT_MCQ = /\b(discuss|explain|analy[sz]e|interpret|describe|develop|retell|write|draw|identify the position|find the|match|in groups|in pairs|label)\b/i;
  /* A book-reader question block → widget HTML, or '' when it is not an inline-option MCQ.
   * ctx: {src, inline, sentence, after (html after the stem, e.g. the Ans button), textbook, partNo, text} */
  function book(b, ctx) {
    if (!b || !ctx) return '';
    const text = typeof b.en === 'string' ? b.en : '';
    const sp = splitInline(text);
    if (!sp) return '';
    const api = resolvers[ctx.src] || {};
    const solId = b.solId && !isAuto(b.solId) ? b.solId : '';
    const keyText = ctx.textbook || '';
    if (!solId && !keyText && !sp.circles) {
      // no answer anywhere: only clear-cut MCQs (short options, a question-like stem) become widgets
      if (NOT_MCQ.test(sp.stem) || sp.opts.some(o => o.length > 90) || !/[?:]\s*$|_{2,}|\.{3}|…|—\s*$|\b(is|are|was|were|of|by|the|called|known as)\s*$/i.test(sp.stem)) return '';
    }
    let correct = null, explain = '';
    const known = solId && api.sols ? api.sols(solId) : undefined;
    if (known) {
      const c = resolve(known.answer, sp.opts, ctx.partNo, sp.bracket);
      if (c >= 0) { correct = c; explain = stepsHtml(known, api, langOf(text)); }
    }
    if (correct === null && keyText) { const c = resolve(keyText, sp.opts, ctx.partNo); if (c >= 0) correct = c; }
    if (correct === null && solId && known) return '';   // the solution exists but names no option: leave the printed question as it is
    const fmt = (t, w) => ctx.inline ? ctx.inline(t, w) : esc(t);
    const stemRec = Object.assign({}, b, {en: sp.stem});
    const stem = (b.ur && ctx.sentence ? ctx.sentence(stemRec, 'span') : fmt(sp.stem, true)) + (ctx.after || '');
    return html({
      stem, stemText: sp.stem, options: sp.opts.map(o => fmt(o, false)), optionsText: sp.opts,
      correct, explain, src: correct === null && solId ? ctx.src : '', sol: correct === null ? solId : '',
      part: ctx.partNo, textbook: correct === null ? keyText : '', lang: langOf(text), tag: true
    });
  }

  // ---------------------------------------------------------------- answering
  const card = el => el.closest('.sbq');
  function optionTexts(w) {
    const t = w.querySelector('template.sbq-plain');
    return t ? t.innerHTML.split('␞').map(s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")) : [];
  }
  function correctOf(w) {
    if (w.dataset.correct != null && w.dataset.correct !== '') return Promise.resolve(+w.dataset.correct);
    const opts = optionTexts(w);
    const fromKey = () => { const c = w.dataset.key ? resolve(w.dataset.key, opts, w.dataset.part) : -1; return c >= 0 ? c : null; };
    const api = resolvers[w.dataset.src];
    if (!api || !api.get || !w.dataset.sol) return Promise.resolve(fromKey());
    return api.get(w.dataset.sol).then(sol => {
      const c = sol ? resolve(sol.answer, opts, w.dataset.part) : -1;
      if (c >= 0) {
        if (!w.querySelector('template.sbq-exp')) { const t = document.createElement('template'); t.className = 'sbq-exp'; t.innerHTML = stepsHtml(sol, api, w.dataset.lang || 'en'); w.appendChild(t); }
        return c;
      }
      return fromKey();
    }, fromKey);
  }
  function label(w, i) {
    const lang = w.dataset.lang || 'en';
    const opt = w.querySelectorAll('.sbq-opt')[i];
    // a trilingual option (English line + Urdu + Pashto) is quoted by its line in the question's language
    const t = opt ? opt.querySelector('.sbq-t') : null;
    const line = t && (t.querySelector(`:scope [lang="${lang}"]`) || (lang === 'en' ? null : t.querySelector(':scope [lang="ur"]')));
    let text = t ? t.innerHTML : '';
    if (line && t.querySelector('[lang="en"]') && t.querySelector('[lang="ur"]')) { const c = line.cloneNode(true); c.querySelectorAll('b,.m6-lang').forEach(x => x.remove()); text = c.innerHTML.trim(); }
    return `<b>${(LETTERS[lang] || LETTERS.en)[i] || i + 1}. ${text}</b>`;
  }
  function explainHtml(w) {
    const t = w.querySelector('template.sbq-exp');
    const h = t ? t.innerHTML.trim() : '';
    return strip(h) ? h : '';
  }
  function feedback(w, chosen, correct) {
    const lang = w.dataset.lang || 'en', tx = T[lang] || T.en;
    const n = w.querySelectorAll('.sbq-opt').length;
    const L = LETTERS[lang] || LETTERS.en;
    const exp = explainHtml(w) || `<p>${tx.noExp}</p>`;
    const others = [...Array(n).keys()].filter(i => i !== correct && i !== chosen).map(i => L[i]).join(lang === 'en' ? ', ' : '، ');
    if (chosen === correct) {
      return `<div class="sbq-alert-h">✅ ${tx.right}</div>
        <p>${tx.isRight(label(w, correct))}</p>
        <div class="sbq-why"><span class="sbq-why-h">${tx.why}:</span>${exp}</div>
        ${others ? `<p class="sbq-others">${tx.others(others)}</p>` : ''}`;
    }
    return `<div class="sbq-alert-h">❌ ${tx.wrong}</div>
      <p>${tx.chose(label(w, chosen))}</p>
      <p class="sbq-whynot"><span class="sbq-why-h">${tx.whyNot}:</span> ${tx.notChosen(label(w, chosen))}</p>
      <p class="sbq-right">✔ ${tx.correctIs(label(w, correct))}</p>
      <div class="sbq-why"><span class="sbq-why-h">${tx.why}:</span>${exp}</div>`;
  }
  let toastTimer = 0;
  function toast(ok, lang) {
    const tx = T[lang] || T.en;
    let el = document.getElementById('sbqToast');
    if (!el) { el = document.createElement('div'); el.id = 'sbqToast'; el.setAttribute('aria-hidden', 'true'); document.body.appendChild(el); }
    el.className = ok === null ? 'sbq-toast is-info' : ok ? 'sbq-toast is-right' : 'sbq-toast is-wrong';
    el.textContent = ok === null ? 'ℹ️ ' + tx.noKey : ok ? '✅ ' + tx.right : '❌ ' + tx.wrong;
    el.dir = lang === 'en' ? 'ltr' : 'rtl';
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1600);
  }
  function lock(w, on) {
    w.querySelectorAll('.sbq-opt input').forEach(i => { i.disabled = on; });
  }
  function choose(w, chosen) {
    if (w.classList.contains('is-answered') || w.classList.contains('is-busy')) return;
    const lang = w.dataset.lang || 'en', tx = T[lang] || T.en;
    const alert = w.querySelector(':scope > .sbq-alert');
    w.classList.add('is-busy');
    lock(w, true);
    const pending = setTimeout(() => { alert.hidden = false; alert.className = 'sbq-alert is-info'; alert.textContent = tx.loading; }, 150);
    const first = !w.dataset.done;
    Promise.resolve(w._sbqPass ? w._sbqPass(chosen) : null).then(() => correctOf(w)).then(correct => {
      clearTimeout(pending);
      w.classList.remove('is-busy');
      w.classList.add('is-answered');
      const opts = w.querySelectorAll('.sbq-opt');
      if (correct === null || correct === undefined || correct < 0 || correct >= opts.length) {
        opts[chosen] && opts[chosen].classList.add('is-picked');
        alert.className = 'sbq-alert is-info';
        alert.innerHTML = `<div class="sbq-alert-h">ℹ️ ${tx.noKey}</div><p>${tx.noKeyText}</p>${retryBtn(tx)}`;
        alert.hidden = false;
        toast(null, lang);
        return;
      }
      const ok = chosen === correct;
      opts.forEach((o, i) => {
        o.classList.toggle('is-correct', i === correct);
        o.classList.toggle('is-wrong', i === chosen && !ok);
        o.classList.toggle('is-dim', i !== correct && i !== chosen);
      });
      alert.className = 'sbq-alert ' + (ok ? 'is-right' : 'is-wrong');
      alert.innerHTML = feedback(w, chosen, correct) + retryBtn(tx);
      alert.hidden = false;
      toast(ok, lang);
      if (window.renderMathInElement) { try { window.renderMathInElement(alert, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false}); } catch (e) { /* plain text stays */ } }
      // study stats once per question (the older renderers count it in their own handler)
      if (first && !w._sbqPass && !w.dataset.notrack && typeof window.recordQuestionAnswer === 'function') { try { window.recordQuestionAnswer(ok); } catch (e) { /* stats are optional */ } }
      w.dataset.done = '1';
    });
  }
  const retryBtn = tx => `<button type="button" class="sbq-retry">${tx.retry}</button>`;
  function reset(w) {
    w.classList.remove('is-answered', 'is-busy');
    w.querySelectorAll('.sbq-opt').forEach(o => { o.classList.remove('is-correct', 'is-wrong', 'is-dim', 'is-picked'); const i = o.querySelector('input'); i.checked = false; });
    lock(w, false);
    const a = w.querySelector(':scope > .sbq-alert');
    a.hidden = true; a.innerHTML = '';
  }
  document.addEventListener('change', e => {
    const input = e.target;
    if (!input || input.type !== 'radio' || !input.closest('.sbq-opt')) return;
    const w = card(input);
    if (w) choose(w, +input.value);
  }, true);
  document.addEventListener('click', e => {
    const r = e.target.closest && e.target.closest('.sbq-retry');
    if (r) { e.preventDefault(); e.stopPropagation(); const w = card(r); if (w) reset(w); return; }
    // keep clicks inside an option from also toggling the parent card / accordion / sentence translation
    const opt = e.target.closest && e.target.closest('.sbq-opt');
    if (opt) e.stopPropagation();
  }, false);

  // ---------------------------------------------------------------- older renderers
  // handler name → where its arguments keep the correct option index and the explanation
  const dec = s => { try { return decodeURIComponent(String(s)); } catch (e) { return String(s || ''); } };
  const HANDLERS = {
    checkDrillMcq: a => ({c: a[2], e: dec(a[3])}), checkReviewMcq: a => ({c: a[2], e: dec(a[3])}),
    checkTbMcq: a => ({c: a[2], e: dec(a[3])}), checkSloMcq: a => ({c: a[2], e: dec(a[3])}),
    checkBioExMcq: a => ({c: a[2]}), checkBioSloMcq: a => ({c: a[2]}), checkEngSloMcq: a => ({c: a[2]}),
    checkTopicModalMcq: a => ({c: a[2]}), checkSubtopicMcq: a => ({c: a[3]}),
    checkUrduSloMcq: a => ({c: a[2], e: dec(a[3])}), checkIslSloMcq: a => ({c: a[2], e: dec(a[3])}),
    checkPakStudySloMcq: a => ({c: a[2], e: dec(a[3])}), checkInteractiveUniversalMcq: a => ({c: a[2], e: dec(a[3])}),
    checkTestPrepMcq: a => ({c: a[3], e: dec(a[4])}), selectMathMcqOption: a => ({c: a[4], e: a[3]}),
    class12CheckAnswer: (a, el) => ({c: el.dataset.correct}), math12CheckStudyAnswer: (a, el) => ({c: el.dataset.correct}),
    answerDrawingMcq: a => {
      const cls = window.state && window.state.selectedClass;
      const exam = cls === 'cls3' ? window.DRAWING_3_EXAM : cls === 'cls2' ? window.DRAWING_2_EXAM : window.DRAWING_1_EXAM;
      const item = exam && exam.mcqs && exam.mcqs[a[0]];
      return {c: item ? item.answer : null, pass: false};
    }
  };
  const HANDLER_RX = new RegExp('^\\s*(?:event\\.stopPropagation\\(\\);\\s*)?(' + Object.keys(HANDLERS).join('|') + ')\\(([\\s\\S]*)\\)\\s*;?\\s*$');
  // Some renderers put text with an unescaped apostrophe into the call ('Sina's book'), which is not valid
  // JavaScript (the original button cannot run). Read numbers and quoted strings by hand instead: a quote
  // ends a string only when the next thing is another argument or the end of the call.
  function lenientArgs(src) {
    const out = [];
    let s = src.trim();
    while (s) {
      let m = s.match(/^(-?\d+(?:\.\d+)?|true|false|null)\s*(?:,\s*|$)/);
      if (m) { out.push(JSON.parse(m[1])); s = s.slice(m[0].length); continue; }
      if (s[0] !== "'" && s[0] !== '"') return null;
      const q = s[0];
      const end = q === "'" ? /'\s*(?:,\s*(?=-?\d|true|false|null|['"])|$)/g : /"\s*(?:,\s*(?=-?\d|true|false|null|['"])|$)/g;
      end.lastIndex = 1;
      m = end.exec(s);
      if (!m) return null;
      out.push(s.slice(1, m.index).replace(/\\(['"\\])/g, '$1'));
      s = s.slice(m.index + m[0].length);
    }
    return out;
  }
  function parseCall(el) {
    const src = el.getAttribute('onclick') || '';
    const m = src.match(HANDLER_RX);
    if (!m) return null;
    let args = [], broken = false;
    if (m[2].trim() && m[2].trim() !== 'this') {
      try { args = Function('"use strict";return [' + m[2] + '];').call(el); } catch (e) { args = lenientArgs(m[2]); broken = true; if (!args) return null; }
    }
    const info = HANDLERS[m[1]](args, el) || {};
    const c = info.c === true || info.c === false ? null : Number(info.c);
    // a call that does not compile cannot be clicked through: the shared widget answers on its own
    return {name: m[1], c: Number.isInteger(c) ? c : null, e: info.e && typeof info.e === 'string' ? info.e : '', pass: info.pass !== false && !broken};
  }
  // feedback boxes the older renderers fill in; their text becomes the explanation
  const FEEDBACK = '.tb-feedback,.sub-mcq-fb,.universal-mcq-exp-box,.mcq-explanation-box,.drawing-feedback,[id$="-feedback"],[id^="math-mcq-status-"],[id^="math-mcq-exp-"],[role="status"],.class12-answer,.math12-answer';
  const STATUS_WORDS = /^\s*(✅|❌|✔️?|✖️?|🎯|💡)?\s*(correct( answer)?|incorrect|wrong|not quite|well done|excellent|great|right|درست( جواب)?|غلط|صحیح|سم ځواب|ناسم)[!.:،۔\s-]*/i;
  function cleanFeedback(html) {
    const box = document.createElement('div');
    box.innerHTML = html;
    box.querySelectorAll('button,summary,script,style,.sbq').forEach(x => x.remove());
    let h = box.innerHTML.trim();
    for (let k = 0; k < 2; k++) h = h.replace(/^(\s*<(b|strong|span|div|p)[^>]*>)?\s*(✅|❌)[^<]{0,60}(<\/(b|strong|span|div|p)>)?/i, '').trim();
    const txt = strip(h).replace(STATUS_WORDS, '').trim();
    return txt.length > 2 ? h : '';
  }
  function hostOf(group) {
    return group.closest('.tb-mcq-card,.interactive-mcq-card,.slo-accordion-card,.drawing-mcq-card,.mcq-item,.subtopic-mcq,.class12-question,.math12-study-question,.c2-mcq-box,.math-topic-card,[id^="eng-tb-mcq-"],[id^="math-mcq-"],[id*="-mcq-"]') || group.parentElement;
  }
  function optionInner(el) {
    const c = el.cloneNode(true);
    c.querySelectorAll('input[type="radio"]').forEach(x => x.remove());
    // drop the printed letter badge ("A", "A.", "(A)", "✓")
    const first = c.firstElementChild;
    if (first && /^\s*\(?([A-Fa-f]|الف|ب|ج|د|✓|✕)\)?\s*[.)]?\s*$/.test(first.textContent) && strip(c.innerHTML).length > strip(first.innerHTML).length) first.remove();
    // the letter is shown in the badge: drop a printed one in the text too ("(A) …", "الف: …", "ب۔ …")
    let h = c.innerHTML.trim().replace(/^\s*\(?[A-F]\)?[.)]?\s+(?=\S)/, '')
      .replace(/^(\s*(?:<[^>]+>\s*)*)\(?(?:الف|ب|ج|د|ه|ہ)\)?\s*[.):۔\-–]\s*/, '$1');
    return h;
  }
  function textOf(el) { return strip(optionInner(el)); }
  function convert(group, opts, info) {
    if (group.dataset.sbqDone) return;
    group.dataset.sbqDone = '1';
    const host = hostOf(group);
    const texts = opts.map(textOf);
    const lang = langOf(texts.join(' '));
    const box = document.createElement('div');
    box.innerHTML = html({options: opts.map(optionInner), optionsText: texts, correct: info.c, explain: info.e ? esc(info.e).replace(/\n/g, '<br>') : '', lang});
    const w = box.firstElementChild;
    w.classList.add('sbq-adapted');
    group.classList.add('sbq-orig');
    group.setAttribute('aria-hidden', 'true');
    group.after(w);
    // a renderer that re-draws on every click (Drawing) shows its saved choice: carry it over
    const picked = opts.findIndex(o => o.classList.contains('is-wrong') || o.classList.contains('selected') || o.classList.contains('picked'));
    if (info.pass) {
      w._sbqPass = chosen => {
        const fb = host ? [...host.querySelectorAll(FEEDBACK)].filter(x => !w.contains(x) && !group.contains(x)) : [];
        const before = fb.map(x => x.innerHTML);
        try { opts[chosen].click(); } catch (e) { /* the shared widget still answers */ }
        return new Promise(r => setTimeout(r, 30)).then(() => {
          const found = [];
          fb.forEach((x, i) => {
            if (!x.isConnected) return;
            const changed = x.innerHTML !== before[i] || x.open || getComputedStyle(x).display !== 'none';
            if (!changed) return;
            const clean = cleanFeedback(x.tagName === 'DETAILS' ? [...x.children].filter(k => k.tagName !== 'SUMMARY').map(k => k.outerHTML).join('') : x.innerHTML);
            if (clean) found.push(clean);
            x.classList.add('sbq-orig-fb');
          });
          if (found.length && !w.querySelector('template.sbq-exp')) { const t = document.createElement('template'); t.className = 'sbq-exp'; t.innerHTML = found.join(''); w.appendChild(t); }
          else if (found.length) { const t = w.querySelector('template.sbq-exp'); if (!strip(t.innerHTML)) t.innerHTML = found.join(''); }
        });
      };
    } else if (info.name === 'answerDrawingMcq') {
      // Drawing re-renders the whole page on a click: keep it as is and remember the choice locally
      w.dataset.notrack = '';
    }
    if (host) host.querySelectorAll('.drawing-feedback').forEach(x => x.classList.add('sbq-orig-fb'));
    if (picked >= 0 && info.c != null) {
      const input = w.querySelectorAll('.sbq-opt input')[picked];
      if (input) { input.checked = true; choose(w, picked); }
    } else if (info.c != null && info.name === 'answerDrawingMcq' && opts.some(o => o.classList.contains('is-correct'))) {
      const input = w.querySelectorAll('.sbq-opt input')[info.c];
      if (input) { input.checked = true; choose(w, info.c); }
    }
  }
  // option groups: siblings that call the same handler
  function scanHandlers(root) {
    const els = root.querySelectorAll('[onclick]');
    const groups = new Map();
    els.forEach(el => {
      const p = el.parentElement;
      if (!p || p.dataset.sbqDone || p.closest('.sbq') || el.closest('.tp-root')) return;
      const on = el.getAttribute('onclick');
      if (!on || !HANDLER_RX.test(on)) return;
      if (!groups.has(p)) groups.set(p, []);
      groups.get(p).push(el);
    });
    groups.forEach((opts, group) => {
      if (opts.length < 2) return;
      const infos = opts.map(parseCall);
      if (infos.some(x => !x)) return;
      let c = infos[0].c;
      // selectMathMcqOption passes "isCorrect" per option as well: trust the shared index
      if (c === null) { const k = infos.findIndex(x => x.c != null); c = k >= 0 ? infos[k].c : null; }
      if (c === null || c < 0 || c >= opts.length) return;
      const e = infos.map(x => x.e).find(Boolean) || '';
      convert(group, opts, {c, e, pass: infos.every(x => x.pass), name: infos[0].name});
    });
  }
  // Class 2 book reader prints MCQs with the answer already highlighted (.c2-opt-btn.correct)
  function scanStatic(root) {
    root.querySelectorAll('.c2-opt-grid').forEach(g => {
      if (g.dataset.sbqDone || g.closest('.sbq')) return;
      const opts = [...g.querySelectorAll(':scope > .c2-opt-btn')];
      if (opts.length < 2) return;
      const c = opts.findIndex(o => o.classList.contains('correct'));
      if (c < 0) return;
      const exp = g.nextElementSibling && /Explanation/.test(g.nextElementSibling.textContent) ? g.nextElementSibling : null;
      const e = exp ? strip(exp.innerHTML).replace(/^Explanation:\s*/, '') : '';
      if (exp) exp.classList.add('sbq-orig-fb');
      convert(g, opts, {c, e, pass: false, name: 'static'});
    });
  }
  function scan(root) {
    root = root && root.querySelectorAll ? root : document;
    try { scanHandlers(root); } catch (e) { console.warn('SBMcq scan', e); }
    try { scanStatic(root); } catch (e) { console.warn('SBMcq static', e); }
  }
  let queued = false;
  const observer = new MutationObserver(muts => {
    if (queued) return;
    if (!muts.some(m => [...m.addedNodes].some(n => n.nodeType === 1 && !(n.classList && (n.classList.contains('sbq') || n.id === 'sbqToast'))))) return;
    queued = true;
    setTimeout(() => { queued = false; scan(document); }, 30);
  });
  function start() {
    scan(document);
    observer.observe(document.body, {childList: true, subtree: true});
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);

  window.SBMcq = {html, book, register, scan, splitInline, resolve, langOf, toast};
})();
