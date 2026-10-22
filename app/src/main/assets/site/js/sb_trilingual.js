/* sb_trilingual.js — one reading pattern in every class and subject.
 *  1. The old "اردو / پښتو" and "English / اردو / پښتو" drop-downs are removed. Their book translations move
 *     onto the sentence, heading, cell or equation they belong to.
 *  2. Clicking a sentence opens a drawer just below it with its meaning in English, اردو and پښتو, each on
 *     its own line (book translation first; a missing language comes from SBTranslate).
 *  3. Topic cards inside a lesson start collapsed (click the header to open).
 * Loaded after app.js, structure_harmonizer.js and universal_translate.js; it only post-processes rendered HTML. */
(function () {
  'use strict';
  const SUM = /^(?:English\s*\/\s*)?اردو\s*\/\s*پښتو(?:\s*\/\s*All)?$/;
  const ORDER = ['en', 'ur', 'ps', 'ar'];
  const NAME = {en: 'English', ur: 'اردو', ps: 'پښتو', ar: 'العربية'};
  const SPEAK = {en: 'en-US', ur: 'ur-PK', ps: 'ps-AF', ar: 'ar-SA'};
  // Qur'anic text is kept exactly as printed: it is never given a translation drawer
  const quranic = t => !!(window.SBTranslate && window.SBTranslate.isQuranic && window.SBTranslate.isQuranic(t));
  const PLACEHOLDER = /^(اردو ترجمہ دستیاب ہے۔|د پښتو ژباړه شتون لري\.)$/;
  const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
  const arabic = s => (String(s).match(/[؀-ۿ]/g) || []).length;
  const latin = s => (String(s).match(/[A-Za-z]/g) || []).length;
  const srcOf = s => arabic(s) > latin(s) ? (window.SBTranslate && window.SBTranslate.detectLang ? window.SBTranslate.detectLang(s).lang : 'ur') : 'en';
  const usable = v => v && (v.html || (norm(v) && !PLACEHOLDER.test(norm(v))));

  // ---------- the three-line drawer ----------
  function fill(box, map, src) {
    box.innerHTML = '';
    box.classList.add('sb-tri-drawer');
    let from = src;
    if (src === 'ar' && quranic(map.ar)) from = ['ur', 'en', 'ps'].find(l => typeof map[l] === 'string' && usable(map[l])) || 'ar';   // never machine-translate the ayat itself
    const source = typeof map[from] === 'string' ? norm(map[from]) : '';
    ORDER.forEach(l => {
      const row = document.createElement('div');
      row.className = 'sb-tri-line'; row.setAttribute('lang', l); row.setAttribute('dir', l === 'en' ? 'ltr' : 'rtl');
      const b = document.createElement('b'); b.className = 'sb-tri-lang'; b.textContent = NAME[l]; row.appendChild(b);
      const t = document.createElement('span'); t.className = 'sb-tri-text'; row.appendChild(t);
      const v = map[l];
      if (v && v.html) t.innerHTML = v.html;
      else if (usable(v)) t.textContent = norm(v);
      else if (source && window.SBTranslate) {
        t.textContent = '…';
        window.SBTranslate.translate(source, from, l, true).then(r => {
          const approx = r && (r.source === 'gloss' || r.source === 'machine');
          t.textContent = r && r.text ? (r.source === 'gloss' ? '≈ ' + r.text + ' (word by word)' : r.source === 'machine' ? '≈ ' + r.text : r.text) : 'No stored translation for this sentence yet.';
          if (approx && !box.querySelector('.sb-tri-note')) {              // say once, under the lines, what ≈ means
            const n = document.createElement('div'); n.className = 'sb-tri-note';
            n.textContent = '≈ = computer translation or word-by-word meaning. Check it with your teacher.';
            box.appendChild(n);
          }
        }, () => { t.textContent = 'No stored translation for this sentence yet.'; });
      } else t.textContent = 'Translation not available';
      const say = document.createElement('button');
      say.type = 'button'; say.className = 'sb-tri-say'; say.title = 'Listen'; say.textContent = '🔊';
      say.addEventListener('click', e => {
        e.stopPropagation(); e.preventDefault();
        const text = t.textContent.trim(); if (!text || text === '…') return;
        if (window.SBTranslate && window.SBTranslate.speak) window.SBTranslate.speak(text, l);
        else if (window.speechSynthesis) { const u = new SpeechSynthesisUtterance(text); u.lang = SPEAK[l]; speechSynthesis.cancel(); speechSynthesis.speak(u); }
      });
      row.appendChild(say);
      box.appendChild(row);
    });
  }
  window.SBTri = {fill};

  // sentence spans of the shared Class 9 renderer (app.js renderInteractiveParagraphHtml)
  SBHooks.replace('toggleSentenceTranslation', function (el, event) {
    if (event) event.stopPropagation();
    if (typeof window.hideWordHoverTooltip === 'function') window.hideWordHoverTooltip();
    if (!el) return;
    const drawer = document.getElementById(`sent-trans-${el.dataset.para}-${el.dataset.sent}`);
    if (!drawer) return;
    if (drawer.style.display === 'block') { drawer.style.display = 'none'; return; }
    const own = norm(el.textContent);
    const src0 = el.dataset.sourceLanguage || srcOf(own);
    const src = ['en', 'ur', 'ps', 'ar'].includes(src0) ? src0 : 'en';
    const map = {en: el.dataset.en, ur: el.dataset.ur, ps: el.dataset.ps, ar: el.dataset.ar};
    map[src] = own;
    fill(drawer, map, src);
    drawer.style.display = 'block';
  });

  // ---------- remove the drop-downs ----------
  const INLINE = /^(SPAN|SUP|SUB|STRONG|EM|B|I|A|SMALL|CODE|BR)$/;
  const direct = (d, l) => [...d.children].find(c => c.tagName !== 'SUMMARY' && c.getAttribute('lang') === l);
  function ownText(el) {
    const c = el.cloneNode(true);
    c.querySelectorAll('details, .sb-tri-drawer, [id^="sent-trans-"], .sb-topic-tools, button, script, style').forEach(x => x.remove());
    return c;
  }
  function convert(d) {
    const s = d.querySelector(':scope > summary');
    if (!s || !SUM.test(norm(s.textContent))) return;
    const urEl = direct(d, 'ur'), psEl = direct(d, 'ps'), enEl = direct(d, 'en');
    const ur = urEl ? urEl.textContent : '', ps = psEl ? psEl.textContent : '';
    const inner = [...d.querySelectorAll(':scope > .lesson-sentence')];
    const extras = [...d.children].filter(c => c !== s && c !== urEl && c !== psEl && c !== enEl && !c.matches('.lesson-sentence, [id^="sent-trans-"]'));
    const prev = d.previousElementSibling;

    // the sentence before already has its own click drawer: give it the book translation and drop the box
    if (prev && prev.matches('[id^="sent-trans-"]')) {
      const before = [];
      for (let p = prev; p && !p.matches('details, .sb-tri-drawer'); p = p.previousElementSibling) if (p.matches('.lesson-sentence')) before.push(p);
      if (before.length === 1) {
        if (ur && !usable(before[0].dataset.ur)) before[0].dataset.ur = ur;
        if (ps && !usable(before[0].dataset.ps)) before[0].dataset.ps = ps;
      }
      extras.forEach(x => d.before(x));
      d.remove();
      return;
    }

    const target = prev && !INLINE.test(prev.tagName) ? prev : d.parentElement;
    if (!target) { d.remove(); return; }
    const box = document.createElement('div');
    box.className = 'sb-tri-drawer'; box.hidden = true;
    d.replaceWith(box);
    // anything else the box held (labels, notes) opens with the translations
    const more = document.createElement('div'); more.className = 'sb-tri-more';
    extras.forEach(x => more.appendChild(x));

    const own = ownText(target);
    const text = norm(own.textContent);
    let en = enEl ? norm(enEl.textContent) : inner.length ? inner.map(x => x.dataset.en || x.textContent).join(' ') : '';
    const map = {ur, ps};
    let src = 'en';
    if (own.querySelector('.katex, svg, math')) map.en = {html: own.innerHTML};
    else if (srcOf(text) === 'ur' && !enEl) { src = 'ur'; map.ur = text; map.en = en; if (!ur) map.ur = text; }
    else map.en = en || text;
    if (src === 'en' && typeof map.en !== 'string') src = ur ? 'ur' : 'en';
    box._sbTri = {map, src, more: extras.length ? more : null};

    // the old per-book toggles opened the drop-down; the target now opens the drawer instead
    ['onclick', 'onkeydown'].forEach(a => { const v = target.getAttribute(a); if (v && /Translation\(|details/.test(v)) target.removeAttribute(a); });
    target.classList.add('sb-tri-target');
    (target._sbTriBoxes = target._sbTriBoxes || []).push(box);
  }
  // a paragraph whose three versions have the same number of sentences opens only the clicked sentence
  const SPLIT = /(?<=[.!?؟۔])\s+(?=\S)/;
  const sents = t => norm(t).split(SPLIT).filter(Boolean);
  function clickedSentence(target, list, e) {
    if (!e || list.length < 2) return 0;
    let node, off;
    if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(e.clientX, e.clientY); if (!r) return 0; node = r.startContainer; off = r.startOffset; }
    else if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(e.clientX, e.clientY); if (!p) return 0; node = p.offsetNode; off = p.offset; }
    else return 0;
    if (!target.contains(node)) return 0;
    const r = document.createRange(); r.setStart(target, 0); r.setEnd(node, off);
    const at = norm(r.toString()).length;
    let acc = 0;
    for (let i = 0; i < list.length; i++) { acc += list[i].length + 1; if (at < acc) return i; }
    return list.length - 1;
  }
  function toggleTarget(target, e) {
    const boxes = (target._sbTriBoxes || []).filter(b => b.isConnected);
    if (!boxes.length) return false;
    const info0 = boxes[0]._sbTri, m = info0.map;
    let idx = -1, map = m;
    if (boxes.length === 1 && typeof m[info0.src] === 'string') {
      const parts = ORDER.map(l => typeof m[l] === 'string' ? sents(m[l]) : null);
      const n = parts[ORDER.indexOf(info0.src)].length;
      if (n > 1 && parts.every(p => !p || !p.length || p.length === n)) {
        idx = clickedSentence(target, parts[ORDER.indexOf(info0.src)], e);
        map = {}; ORDER.forEach((l, k) => { map[l] = parts[k] && parts[k].length ? parts[k][idx] : m[l]; });
      }
    }
    const open = boxes.some(b => !b.hidden);
    const same = open && String(boxes[0].dataset.idx) === String(idx);
    boxes.forEach(b => {
      if (open && (same || idx < 0)) { b.hidden = true; return; }
      const info = b._sbTri;
      fill(b, boxes.length === 1 ? map : info.map, info.src);
      if (info.more) b.appendChild(info.more);
      b.dataset.idx = idx;
      b.hidden = false;
    });
    target.setAttribute('aria-expanded', String(boxes.some(b => !b.hidden)));
    return true;
  }
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button) return;
    const t = e.target;
    if (!t.closest || t.closest('a, button, input, select, textarea, summary, .sb-tri-drawer, .lesson-sentence, .ut-root')) return;
    const target = t.closest('.sb-tri-target'); if (!target) return;
    const sel = window.getSelection && window.getSelection(); if (sel && !sel.isCollapsed) return;
    if (toggleTarget(target, e)) e.preventDefault();       // structure_harmonizer skips prevented clicks
  }, true);
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('sb-tri-target')) { e.preventDefault(); toggleTarget(e.target); }
  });

  // ---------- topic cards: collapsed; fullscreen belongs to the Unit header ----------
  const openedTopics = new Set();
  const topicKey = c => norm((c.firstElementChild || c).textContent).slice(0, 160);
  function fsToggle(card) {
    if (document.fullscreenElement === card) { document.exitFullscreen(); return; }
    if (card.classList.contains('sb-topic-fsfb')) { card.classList.remove('sb-topic-fsfb'); return; }
    if (card.dataset.sbTopic === 'own') {
      const body = card.querySelector('.math-accordion-body, .slo-accordion-body');
      const h = card.querySelector('.math-acc-header, .slo-accordion-header');
      if (body && body.style.display === 'none' && h) h.click();
    } else setTopic(card, true);
    const req = card.requestFullscreen || card.webkitRequestFullscreen;
    if (req) Promise.resolve(req.call(card)).catch(() => card.classList.add('sb-topic-fsfb')); else card.classList.add('sb-topic-fsfb');
  }
  function setTopic(card, open) {
    card.classList.toggle('sb-topic-closed', !open);
    const chev = card.querySelector(':scope > .sb-topic-head .sb-topic-chev'); if (chev) chev.textContent = open ? '▾' : '▸';
    const head = card.querySelector(':scope > .sb-topic-head'); if (head && window.SBA11y) window.SBA11y.enhance(head.parentElement);   // aria-expanded sits on the title that acts as the button (js/core/a11y.js)
  }
  function setupTopic(card) {
    if (card.dataset.sbTopic) return;
    const head = card.firstElementChild;
    if (!head || !card.children[1] || !(head.matches('.para-card-header') || head.querySelector('.math-badge, h3, h4'))) return;
    if (card.parentElement && card.parentElement.closest('[data-sb-topic]')) return;   // only the outer topic card
    card.dataset.sbTopic = '1';
    // Accordion cards already open/close themselves; keep their existing controls.
    const ownToggle = card.matches('.math-accordion-card, .slo-accordion-card, .slo-question-accordion') || head.hasAttribute('onclick');
    const tools = document.createElement('span'); tools.className = 'sb-topic-tools';
    tools.innerHTML = ownToggle ? '' : '<span class="sb-topic-chev">▸</span>';
    const icon = head.querySelector(':scope > .math-acc-icon, :scope > .slo-acc-icon');
    if (icon) head.insertBefore(tools, icon); else head.appendChild(tools);
    if (ownToggle) { card.dataset.sbTopic = 'own'; return; }
    head.classList.add('sb-topic-head');       // keyboard and screen reader: js/core/a11y.js makes the title the button (the header holds the full-screen control, and controls may not nest in a button)
    setTopic(card, openedTopics.has(topicKey(card)));
  }
  document.addEventListener('click', e => {
    const head = e.target.closest && e.target.closest('.sb-topic-head');
    if (!head || e.target.closest('button, a, input, .lesson-sentence')) return;
    const card = head.parentElement; const open = card.classList.contains('sb-topic-closed');
    setTopic(card, open);
    if (open) openedTopics.add(topicKey(card)); else openedTopics.delete(topicKey(card));
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('sb-topic-head')) { e.preventDefault(); e.target.click(); }
    if (e.key === 'Escape') document.querySelectorAll('.sb-topic-fsfb').forEach(c => c.classList.remove('sb-topic-fsfb'));
  });
  document.addEventListener('fullscreenchange', () => document.querySelectorAll('.sb-topic-fs').forEach(b => {
    const on = document.fullscreenElement && document.fullscreenElement.contains(b); b.textContent = on ? '🗗' : '⛶'; b.title = on ? 'Exit full screen' : 'Full screen';
  }));


  // ---------- Qur'anic ayat: shown alone; a click opens the translations just below ----------
  const AYAT_L = /[ء-يٱ-ەٲ-ۓ]/, AYAT_T = /[ً-ْٰۖ-ۭ]/, AYAT_MARK = /^[﴿﴾۝۞(\[]*[\d٠-٩۰-۹]*[﴿﴾۝)\]]*$/;
  const ayatWord = w => (AYAT_L.test(w) && AYAT_T.test(w)) || /[﴿﴾۞۝]/.test(w) || (/^[ۖ-ۭ]+$/.test(w));
  // every ayat in a block with the translation that follows it: [{ayat, rest}, ...]
  function splitAyat(text) {
    const words = norm(text).split(' ');
    const out = []; let i = 0, lead = [];
    while (i < words.length) {
      if (!ayatWord(words[i])) { (out.length ? out[out.length - 1].restWords : lead).push(words[i]); i++; continue; }
      let b = i, gap = 0;
      for (let k = i + 1; k < words.length; k++) {
        if (ayatWord(words[k])) { b = k; gap = 0; }
        else if (AYAT_L.test(words[k]) && !/[A-Za-z]/.test(words[k]) && gap < 2 && words.slice(k + 1, k + 4).some(ayatWord)) gap++;
        else if (AYAT_MARK.test(words[k]) && k === b + 1 && /[﴿﴾]/.test(words[b])) b = k;
        else break;
      }
      const seg = words.slice(i, b + 1);
      if (seg.filter(ayatWord).length >= 3 && quranic(seg.join(' '))) out.push({ayat: seg.join(' '), restWords: []});
      else (out.length ? out[out.length - 1].restWords : lead).push(...seg);
      i = b + 1;
    }
    if (!out.length) return null;
    out[0].restWords.unshift(...lead);
    return out.map(o => ({ayat: o.ayat, rest: o.restWords.join(' ').replace(/^[\s)\]]+|[\s(\[]+$/g, '').trim()}));
  }
  function ayatTarget(sp) {
    const ur = srcOf(sp.rest) === 'ur' ? sp.rest : '';
    const en = !arabic(sp.rest) && latin(sp.rest) ? sp.rest : '';
    const map = {ar: sp.ayat, en, ur, ps: ''};
    if (sp.rest && !ur && !en && window.SBTranslate) { const d = window.SBTranslate.detectLang(sp.rest).lang; map[d === 'ar' ? 'ur' : d] = sp.rest; }
    const box = document.createElement('div');
    box.className = 'sb-tri-drawer'; box.hidden = true; box._sbTri = {map, src: 'ar', more: null};
    const target = document.createElement('span');
    target.className = 'sb-ayat sb-tri-target'; target.setAttribute('lang', 'ar'); target.setAttribute('dir', 'rtl'); target.setAttribute('role', 'button'); target.tabIndex = 0;
    target.title = 'Click to see the translations'; target.textContent = sp.ayat;
    (target._sbTriBoxes = target._sbTriBoxes || []).push(box);
    return [target, box];
  }
  const OKCHILD = /^(BR|SPAN|B|I|STRONG|EM|SMALL|SUP|SUB|#text)$/;
  function ayatBlock(el) {
    if (el.dataset.sbAyat || el.closest('.sb-tri-drawer, .sb-ayat, [data-sb-ayat], .ut-root, button, summary, textarea, input')) return;
    if (!AYAT_T.test(el.textContent) || el.querySelector('.lesson-sentence, .sb-tri-target, [id^="sent-trans-"], div, p, details')) return;
    if ([...el.childNodes].some(n => !OKCHILD.test(n.nodeType === 3 ? '#text' : n.tagName))) return;
    const list = splitAyat(el.textContent.replace(/ /g, ' '));
    if (!list) return;
    el.dataset.sbAyat = '1';
    el.textContent = '';
    list.forEach(sp => el.append(...ayatTarget(sp)));
  }
  // an ayat that sits alone in its own block, followed by blocks that only hold its translation
  function ayatAlone(el) {
    if (el.dataset.sbAyat || !AYAT_T.test(el.textContent) || el.children.length > 3 || el.closest('.sb-tri-drawer, .sb-ayat, .ut-root')) return;
    const own = norm(el.textContent);
    if (!quranic(own) || own.length > 900) return;
    const trans = [];
    for (let n = el.nextElementSibling; n && trans.length < 3; n = n.nextElementSibling) {
      const t = norm(n.textContent);
      if (!t || quranic(t) || AYAT_T.test(t) || n.matches('h1,h2,h3,h4,h5,h6,button,details') || n.querySelector('.sb-tri-target, button')) break;
      if (t.length > 700) break;
      trans.push(n);
    }
    if (!trans.length) return;
    const map = {ar: own, en: '', ur: '', ps: ''};
    trans.forEach(n => { const t = norm(n.textContent); const l = window.SBTranslate ? window.SBTranslate.detectLang(t).lang : srcOf(t); const k = l === 'ar' ? 'ur' : l; map[k] = map[k] ? map[k] + ' ' + t : t; });
    el.dataset.sbAyat = '1';
    const box = document.createElement('div');
    box.className = 'sb-tri-drawer'; box.hidden = true; box._sbTri = {map, src: 'ar', more: null};
    el.classList.add('sb-ayat', 'sb-tri-target'); el.setAttribute('role', 'button'); el.tabIndex = 0; el.title = 'Click to see the translations';
    (el._sbTriBoxes = el._sbTriBoxes || []).push(box);
    el.after(box);
    trans.forEach(n => { n.hidden = true; n.dataset.sbAyatTr = '1'; });
  }
  let ayatT = 0;
  function scheduleAyat() { if (!ayatT) ayatT = setTimeout(() => { ayatT = 0; ayatPass(); }, 250); }
  function ayatPass(root) {
    (root || document).querySelectorAll('p, li, td, span.para-line, div').forEach(el => {
      if (el.dataset.sbAyat) return;
      if (el.tagName === 'DIV' && el.querySelector('div, p, ul, ol, table, section, button, details')) {
        // a container: its leaf children are visited on their own, but an ayat followed by sibling blocks is handled here
        return;
      }
      if (!AYAT_T.test(el.textContent)) return;
      ayatBlock(el);
      if (!el.dataset.sbAyat) ayatAlone(el);
    });
  }


  // renderInteractiveParagraphHtml (app.js) asks for this first: a paragraph that holds Qur'anic ayat is drawn as the ayat
  // alone; each ayat is a clickable sentence whose book translations (English / اردو / پښتو) open just below it.
  const esc = v => String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  window.SBAyat = {
    split: splitAyat,
    render(text, urdu, pashto, idx) {
      if (!text || !AYAT_T.test(text) || !window.SBTranslate) return '';
      const main = splitAyat(text);
      if (!main) return '';
      const others = [urdu, pashto].map(t => (t && AYAT_T.test(t) ? splitAyat(t) : null));
      const lang = t => { const d = window.SBTranslate.detectLang(t).lang; return d === 'ar' ? 'ur' : d; };
      return main.map((a, k) => {
        const rests = [a.rest, ...others.map(o => o ? (o[k] ? o[k].rest : o.map(x => x.rest).join(' ')) : '')].filter(Boolean);
        const m = {en: '', ur: '', ps: ''};
        rests.forEach(r => { const l = lang(r); if (!m[l]) m[l] = r; });
        if (!m.ur && urdu && !AYAT_T.test(urdu) && lang(urdu) === 'ur') m.ur = urdu;
        if (!m.ps && pashto && !AYAT_T.test(pashto) && lang(pashto) === 'ps') m.ps = pashto;
        return `<span class="lesson-sentence sb-ayat" lang="ar" dir="rtl" role="button" tabindex="0" title="Click to see the translations" data-para="${esc(idx)}" data-sent="${k}" data-source-language="ar" data-en="${esc(m.en)}" data-ur="${esc(m.ur)}" data-ps="${esc(m.ps)}" onclick="toggleSentenceTranslation(this, event)">${esc(a.ayat)}</span><span id="sent-trans-${esc(idx)}-${k}" style="display:none;"></span>`;
      }).join('');
    }
  };

  // ---------- run ----------
  const css = `
  .sb-ayat{direction:rtl;text-align:right;font-family:"Amiri","Noto Naskh Arabic","Scheherazade New",serif;font-size:1.5em;line-height:2.3;cursor:pointer;color:#0f172a;padding:.15rem .3rem;border-radius:6px;display:inline}
  .sb-ayat:hover{background:#f0fdf4}
  .sb-tri-target{cursor:pointer}
  .sb-tri-drawer{display:block;margin:.35rem 0 .7rem;padding:.5rem .8rem;background:#f0fdf4;border-inline-start:3px solid #16a34a;border-radius:0 8px 8px 0;font-size:.95rem;cursor:default;text-align:start;white-space:normal}
  .sb-tri-drawer[hidden]{display:none}
  .sb-tri-line{display:flex;align-items:baseline;gap:.5rem;line-height:1.9;padding:.1rem 0}
  .sb-tri-line+.sb-tri-line{border-top:1px dashed #bbf7d0}
  .sb-tri-note{margin-top:.3rem;font-size:.78rem;color:#64748b}
  .sb-tri-line[dir="rtl"] .sb-tri-text{font-family:"Jameel Noori Nastaleeq","Noto Nastaliq Urdu","Noto Naskh Arabic",serif;font-size:1.12em}
  .sb-tri-lang{flex:0 0 auto;font:700 .7rem system-ui,sans-serif;color:#166534;background:#dcfce7;border-radius:4px;padding:.05rem .4rem}
  .sb-tri-text{flex:1 1 auto}
  .sb-tri-say{flex:0 0 auto;border:1px solid #cbd5e1;background:#fff;border-radius:6px;font-size:.75rem;padding:0 .3rem;cursor:pointer}
  .sb-tri-more{margin-top:.35rem}
  .sb-topic-head{cursor:pointer;user-select:none}
  .sb-topic-tools{margin-inline-start:auto;margin-inline-end:.4rem;display:inline-flex;align-items:center;gap:.5rem}
  .sb-topic-fs{border:1px solid #cbd5e1;background:#fff;color:#0f172a;border-radius:8px;padding:.2rem .5rem;font:600 .75rem system-ui,sans-serif;cursor:pointer}
  .sb-topic-fs:hover{background:#0369a1;color:#fff;border-color:#0369a1}
  .sb-topic-chev{font-size:1.1rem;color:#0369a1;width:1rem;text-align:center}
  .sb-topic-closed>:not(.sb-topic-head){display:none!important}
  .sb-topic-closed>.sb-topic-head{margin-bottom:0!important;border-bottom:0!important;padding-bottom:0!important}
  .math-topic-card:fullscreen,.para-card:fullscreen{overflow:auto;padding:1.5rem!important;background:#fff}
  .sb-topic-fsfb{position:fixed!important;inset:0;z-index:9000;overflow:auto;margin:0!important;border-radius:0!important}
  `;
  function run(root) {
    (root || document).querySelectorAll('details').forEach(convert);
    (root || document).querySelectorAll('.math-topic-card, .para-card').forEach(setupTopic);
    scheduleAyat();
  }
  let timer = 0;
  function start() {
    const s = document.createElement('style'); s.id = 'sb-trilingual-css'; s.textContent = css; document.head.appendChild(s);
    run();
    new MutationObserver(() => { if (!timer) timer = setTimeout(() => { timer = 0; run(); }, 40); }).observe(document.body, {childList: true, subtree: true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
