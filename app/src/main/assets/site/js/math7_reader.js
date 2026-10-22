/* Class 7 Mathematics source reader (KPTBB SNC 2022).
 * Renders the page-reviewed MATH_7_DATA blocks: original English text, click-to-open
 * Urdu and Pashto translations, Urdu/Pashto word meanings, KaTeX math and coded SVG figures.
 * Only active when Class 7 is selected; every other class keeps the existing renderers. */
(function () {
  'use strict';
  if (typeof MATH_7_DATA === 'undefined') return;
  const isCls7 = () => typeof state !== 'undefined' && state.selectedClass === 'cls7';
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const WORDS = typeof MATH_7_WORDS !== 'undefined' ? MATH_7_WORDS : {};
  const BOOK = typeof MATH_7_BOOK !== 'undefined' ? MATH_7_BOOK : {answers:{}};

  const css = `
  .m7-root{color:#1e293b;line-height:1.75;font-size:.98rem}
  .m7-root .katex{font-size:1.05em}
  .m7-page{display:flex;align-items:center;gap:.5rem;margin:1.1rem 0 .5rem;color:#64748b;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
  .m7-page::after{content:"";flex:1;border-top:1px dashed #cbd5e1}
  .m7-s{cursor:pointer;border-radius:6px;padding:.1rem .25rem;margin:0 -.25rem}
  .m7-s:hover,.m7-s:focus-visible{background:#f0f9ff;outline:none}
  .m7-s[aria-expanded="true"]{background:#e0f2fe}
  .m7-tr{margin:.3rem 0 .7rem;padding:.55rem .8rem;border-inline-start:3px solid #0284c7;background:#f8fafc;border-radius:0 6px 6px 0}
  .m7-tr p{margin:.15rem 0;text-align:right;direction:rtl}
  .m7-tr .m7-ur{font-family:'Jameel Noori Nastaleeq','Noto Nastaliq Urdu','Urdu Typesetting',serif;font-size:1.12rem;line-height:2.1}
  .m7-tr .m7-ps{font-family:'Noto Naskh Arabic','Segoe UI',Tahoma,serif;font-size:1.05rem;line-height:1.9}
  .m7-tr .m7-lang{font-size:.7rem;color:#0369a1;font-weight:700;margin-inline-end:.4rem;font-family:system-ui,sans-serif}
  .m7-root.m7-show-all .m7-tr{display:block!important}
  .m7-root[data-sbmode="0"] .m7-hsub{display:none}
  .m7-root[data-sbmode="1"] .m7-tr,.m7-root[data-sbmode="2"] .m7-tr{display:block!important}
  .m7-root[data-sbmode="1"] .m7-tr .m7-ps,.m7-root[data-sbmode="2"] .m7-tr .m7-ur{display:none}
  .m7-root[data-sbmode="1"] .m7-hsub,.m7-root[data-sbmode="2"] .m7-hsub{font-size:0}
  .m7-root[data-sbmode="1"] .m7-hsub>span:first-of-type,.m7-root[data-sbmode="2"] .m7-hsub>span:last-of-type{font-size:.92rem}
  .m7-root[data-sbmode="1"] .m7-hsub>span:last-of-type,.m7-root[data-sbmode="2"] .m7-hsub>span:first-of-type{display:none}
  .m7-root[data-sbmode="1"] .m7-hsub>span,.m7-root[data-sbmode="2"] .m7-hsub>span{display:block}
  .m7-root .m7-hsub>span[lang="en"]{direction:ltr;text-align:left}
  .m7-root .m7-hsub>span[lang="ur"],.m7-root .m7-hsub>span[lang="ps"]{direction:rtl;text-align:right}
  .m7-tools:empty{display:none}
  div.m7-para{margin:.5rem 0}
  .m7-para .m7-tr{margin:.25rem 0 .45rem}
  .m7-root .m7-h3,.m7-root .m7-h4{cursor:pointer}
  .m7-root[data-sbmode="0"] .sb-hopen>.m7-hsub{display:block!important}
  .m7-tabs{display:flex;gap:.45rem;flex-wrap:wrap;margin:0 0 .55rem}
  .m7-tabs button{border:1px solid #bae6fd;background:#fff;color:#0369a1;border-radius:999px;padding:.38rem .95rem;font:inherit;font-size:.9rem;font-weight:700;cursor:pointer}
  .m7-tabs button[aria-pressed="true"]{background:#0369a1;color:#fff;border-color:#0369a1}
  .m7-w{text-decoration:underline dotted #0284c7;text-underline-offset:4px;cursor:help}
  .m7-h3{font-size:1.08rem;font-weight:750;color:#0f172a;margin:1rem 0 .3rem}
  .m7-h4{font-size:1rem;font-weight:700;color:#075985;margin:.9rem 0 .25rem}
  .m7-hsub{display:block;font-weight:500;font-size:.92rem;color:#475569;direction:rtl;text-align:right}
  .m7-m{margin:.25rem 0 .25rem 1rem;font-variant-numeric:tabular-nums}
  .m7-eq{margin:.6rem 0;text-align:center;overflow-x:auto}
  .m7-ul{margin:.3rem 0 .6rem;padding-inline-start:1.3rem}
  .m7-ul li{margin:.15rem 0;list-style:disc}
  .m7-ul li.lv2{margin-inline-start:1.2rem;list-style:circle}
  .m7-ul li.lv3{margin-inline-start:2.4rem;list-style:square}
  .m7-box{border:1px solid #bae6fd;background:#f0f9ff;border-radius:10px;padding:.6rem .9rem;margin:.8rem 0}
  .m7-box.note{border-color:#99f6e4;background:#f0fdfa}
  .m7-box.check{border-color:#fde68a;background:#fffbeb}
  .m7-box.prior{border-color:#c7d2fe;background:#eef2ff}
  .m7-box.teach{border-color:#fecaca;background:#fef2f2}
  .m7-box-t{font-weight:750;font-size:.85rem;color:#0f172a;margin-bottom:.2rem}
  .m7-example{border:1px solid #e2e8f0;border-inline-start:4px solid #16a34a;border-radius:8px;padding:.6rem .9rem;margin:.9rem 0;background:#fff}
  .m7-example-t{font-weight:750;color:#15803d}
  .m7-exercise{border:1px solid #e2e8f0;border-inline-start:4px solid #7c3aed;border-radius:8px;padding:.6rem .9rem;margin:.9rem 0;background:#fff}
  .m7-exercise-t{font-weight:800;color:#6d28d9;font-size:1.02rem}
  .m7-q{margin:.55rem 0}
  .m7-qno{font-weight:750;color:#6d28d9;margin-inline-end:.35rem}
  .m7-parts{display:flex;flex-wrap:wrap;gap:.2rem 1.6rem;margin:.2rem 0 .2rem 1.6rem}
  .m7-parts.block{display:block}
  .m7-ans{margin:.25rem 0 .2rem 1.6rem;font-size:.9rem;color:#166534;background:#f0fdf4;border-radius:6px;padding:.25rem .55rem}
  .m7-ans.none{color:#64748b;background:#f8fafc}
  .m7-fig{margin:.8rem 0;text-align:center}
  .m7-fig svg{max-width:100%;height:auto}
  .m7-fig figcaption{font-size:.85rem;color:#475569;margin-top:.25rem}
  .m7-table{overflow-x:auto;margin:.7rem 0}
  .m7-table table{border-collapse:collapse;margin:0 auto;min-width:50%}
  .m7-table th,.m7-table td{border:1px solid #94a3b8;padding:.3rem .65rem;text-align:center}
  .m7-table th{background:#e0f2fe}
  .m7-table caption{font-size:.85rem;color:#475569;caption-side:top;margin-bottom:.25rem}
  .m7-tools{display:flex;gap:.5rem;flex-wrap:wrap;margin:.2rem 0 .7rem}
  .m7-tools button{font:inherit;font-size:.8rem;border:1px solid #cbd5e1;background:#fff;border-radius:999px;padding:.2rem .7rem;cursor:pointer}
  .m7-help{font-size:.82rem;color:#64748b;margin:.2rem 0 .6rem}
  #m7-word{max-width:calc(100vw - 2rem);width:340px;border:1px solid #94a3b8;border-radius:12px;padding:1rem}
  #m7-word p{margin:.3rem 0}
  .m7-part{margin:.25rem 0}
  .m7-root{container-type:inline-size}
  @container (max-width: 560px){.m7-exercise,.m7-example,.m7-box{padding:.5rem .55rem}.m7-parts{margin-inline-start:.4rem}.m7-ans{margin-inline-start:.4rem}}
  `;
  if (typeof document !== 'undefined' && !document.getElementById('m7-style')) {
    const style = document.createElement('style');
    style.id = 'm7-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ---- inline text: KaTeX for $...$, word-meaning buttons for known words ----
  function wordify(text) {
    return text.split(/([A-Za-z]+(?:'[a-z]+)?)/).map(token => {
      const key = token.toLowerCase();
      const m = /^[A-Za-z]/.test(token) && WORDS[key];
      return m ? `<span class="m7-w" role="button" tabindex="0" data-w="${esc(key)}" title="اردو: ${esc(m[0])} | پښتو: ${esc(m[1])}" onclick="m7Word(this,event)" onkeydown="if(event.key==='Enter'){m7Word(this,event)}">${esc(token)}</span>` : esc(token);
    }).join('');
  }
  const bold = html => html.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
  function inline(text, words) {
    const lm = typeof SpaceBookLessonMath !== 'undefined' ? SpaceBookLessonMath : null;
    if (!lm) return bold(words ? wordify(text) : esc(text));
    return lm.mathParts(text).map(part => part.latex === undefined ? bold(words ? wordify(part.text) : esc(part.text)) : lm.renderMath(part)).join('');
  }
  function translations(rec) {
    if (!rec || !rec.ur) return '';
    return `<div class="m7-tr" hidden><p class="m7-en" lang="en" dir="ltr" style="text-align:left;direction:ltr"><span class="m7-lang">English</span>${inline(rec.en, false)}</p><p class="m7-ur" lang="ur" dir="rtl"><span class="m7-lang">اردو</span>${inline(rec.ur, false)}</p><p class="m7-ps" lang="ps" dir="rtl"><span class="m7-lang">پښتو</span>${inline(rec.ps, false)}</p></div>`;
  }
  // A sentence/paragraph that opens its translation when clicked.
  const SB_SPLIT = /(?<=[.!?؟۔])\s+(?=\S)/;
  // Paragraphs are split into sentences when the original and both translations have the same number of sentences,
  // so each sentence opens its own translation just below it; otherwise the whole paragraph is one unit.
  function sentence(rec, tag, cls) {
    if (rec && rec.ur && rec.ps && typeof rec.en === 'string' && rec.en.indexOf('$') < 0) {
      const a = rec.en.split(SB_SPLIT), b = String(rec.ur).split(SB_SPLIT), c = String(rec.ps).split(SB_SPLIT);
      if (a.length > 1 && a.length === b.length && a.length === c.length) {
        const w = (tag || 'p') === 'span' ? 'span' : 'div';
        return `<${w} class="m7-para ${cls || ''}"${''}>` + a.map((x, i) => sentenceWhole({en: x, ur: b[i], ps: c[i]}, 'span', 'm7-sent')).join(' ') + `</${w}>`;
      }
    }
    return sentenceWhole(rec, tag, cls);
  }
  function sentenceWhole(rec, tag, cls) {
    tag = tag || 'p';
    if (!rec.ur) return `<${tag} class="${cls || ''}">${inline(rec.en, true)}</${tag}>`;
    return `<${tag} class="m7-s ${cls || ''}" role="button" tabindex="0" aria-expanded="false" onclick="m7Toggle(this,event)" onkeydown="if(event.key==='Enter'||event.key===' '){m7Toggle(this,event)}">${inline(rec.en, true)}</${tag}>${translations(rec)}`;
  }

  window.m7Toggle = function (el, event) {
    if (event && event.target && event.target.closest('.m7-w')) return;
    if (event && event.type === 'keydown') event.preventDefault();
    const panel = el.nextElementSibling;
    if (!panel || !panel.classList.contains('m7-tr')) return;
    const open = panel.hidden;
    panel.hidden = !open;
    el.setAttribute('aria-expanded', String(open));
  };
  window.m7Word = function (el, event) {
    event.preventDefault(); event.stopPropagation();
    const key = el.dataset.w, m = WORDS[key];
    if (!m) return;
    let panel = document.getElementById('m7-word');
    if (!panel) { panel = document.createElement('dialog'); panel.id = 'm7-word'; document.body.appendChild(panel); }
    panel.innerHTML = `<button type="button" style="float:right" aria-label="Close" onclick="this.closest('dialog').close()">×</button><h3 style="margin:.1rem 0 .5rem">${esc(el.textContent)}</h3><p lang="ur" dir="rtl" style="font-size:1.15rem"><strong>اردو:</strong> ${esc(m[0])}</p><p lang="ps" dir="rtl" style="font-size:1.1rem"><strong>پښتو:</strong> ${esc(m[1])}</p>`;
    if (panel.showModal) panel.showModal(); else panel.setAttribute('open', '');
  };
  window.m7ShowAll = function (btn) {
    const root = btn.closest('.m7-root');
    const on = !root.classList.contains('m7-show-all');
    root.classList.toggle('m7-show-all', on);
    btn.setAttribute('aria-pressed', String(on));
    btn.textContent = on ? 'Hide all Urdu / Pashto' : 'Show all Urdu / Pashto';
  };

  const BOX_LABEL = {note: 'Note it down', check: 'Quick Check', prior: 'Previous Knowledge Check', teach: 'Teaching Point', info: ''};
  function heading(b) {
    const cls = b.l <= 3 ? 'm7-h3' : 'm7-h4';
    const sub = b.ur ? `<span class="m7-hsub"><span lang="ur">${esc(b.ur)}</span> · <span lang="ps">${esc(b.ps)}</span></span>` : '';
    return `<div role="heading" aria-level="${b.l}" class="${cls}">${inline(b.en, true)}${sub}</div>`;
  }
  function answersFor(exId) {
    const list = (BOOK.answers || {})[exId] || [];
    const map = {};
    list.forEach(a => { map[a.q] = a; });
    return map;
  }
  // ---- SpaceBook answers: the Ans button opens the shared step-by-step panel (js/sb_solve.js) ----
  function solButton(sid) {
    if (!sid) return '';
    return `<button type="button" class="sb-ans" aria-expanded="false" title="Answer and step-by-step explanation" onclick="event.stopPropagation();m7SolOpen(this,'${esc(sid)}')">Ans</button><div class="sb-solve" hidden></div>`;
  }
  let solLoad = null;
  function loadSolutions() {
    if (window.MATH_7_SOLUTIONS) return Promise.resolve(window.MATH_7_SOLUTIONS);
    if (!solLoad) {
      solLoad = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        const own = [...document.scripts].find(x => /math7_reader\.js/.test(x.src));
        const v = own && own.src.includes('?') ? own.src.slice(own.src.indexOf('?')) : '';
        s.src = 'js/math_7_solutions.js' + v;
        s.onload = () => resolve(window.MATH_7_SOLUTIONS);
        s.onerror = () => { solLoad = null; reject(new Error('Solutions could not be loaded')); };
        document.head.appendChild(s);
      });
    }
    return solLoad;
  }
  const plain = text => String(text || '').replace(/\*\*/g, '').replace(/\$([^$]*)\$/g, (_, m) => m.replace(/(\d)\s*\\([dt]?frac)/g, '$1 \\$2').replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2').replace(/\\(?:le|leq)\b/g, '≤').replace(/\\(?:ge|geq)\b/g, '≥').replace(/\\ne\b/g, '≠').replace(/\\approx/g, '≈').replace(/\\(?:,|;|quad|qquad)/g, ' ').replace(/(\d)\{,\}(\d)/g, '$1,$2').replace(/-/g, '−').replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\^\{([^}]*)\}/g, '^$1').replace(/\\text\{([^}]*)\}/g, '$1').replace(/[{}\\]/g, ''));
  window.m7SolOpen = function (btn, id) {
    if (!window.MATH_7_SOLUTIONS) {
      const panel = SBSolve.loading(btn, 'Loading the solution…');
      loadSolutions().then(() => { panel.hidden = true; m7SolOpen(btn, id); }).catch(() => { panel.innerHTML = '<p class="sbs-help">The solution could not be loaded. Please check your connection and try again.</p>'; });
      return;
    }
    SBSolve.toggle(btn, window.MATH_7_SOLUTIONS[id], {inline, plain});
  };
  // Inline-option MCQs ("Stem? a. … b. … c. …") become the shared radio widget (js/sb_mcq.js).
  const solMap = id => String(id).includes('-') ? (window.CLS6_SOLUTIONS || {}) : window.MATH_7_SOLUTIONS;
  if (window.SBMcq) SBMcq.register('m7', {
    inline,
    sols: id => { const m = solMap(id); return m ? m[id] : undefined; },
    get: id => { const m = solMap(id); return m ? Promise.resolve(m[id]) : loadSolutions().then(x => x && x[id]); }
  });
  const mcqHtml = (b, key, after, partNo) => window.SBMcq ? SBMcq.book(b, {src: 'm7', inline, sentence, after, textbook: key && key.a, partNo}) : '';


  function question(q, ans, showAns) {
    const mcq = mcqHtml(q, ans[q.no], showAns ? solButton(q.solId) : '');
    const partMcq = (q.parts || []).map(p => mcqHtml(p, null, showAns ? solButton(p.solId) : '', p.no));
    const hasSol = q.parts && q.parts.some(p => p.solId);
    const parts = q.parts && q.parts.length ? `<div class="m7-parts${partMcq.some(Boolean) || hasSol || q.parts.some(p => p.ur || (p.en || '').length > 28) ? ' block' : ''}">${q.parts.map((p, pi) => `<div class="m7-part">${p.no ? `<strong>${esc(p.no)})</strong> ` : ''}${partMcq[pi] || `${p.ur ? sentence(p, 'span') : inline(p.en, true)}${showAns ? solButton(p.solId) : ''}`}</div>`).join('')}</div>` : '';
    let a = '';
    if (showAns) {
      const hit = ans[q.no];
      a = hit ? `<div class="m7-ans"><strong>Textbook answer:</strong> ${inline(hit.a, false)} <span style="color:#64748b">(p. ${esc(hit.printed)})</span></div>` : '';
    }
    if (mcq) a = '';
    const head = mcq || (q.en ? (q.ur ? sentence(q, 'span') : inline(q.en, true)) : '');
    return `<div class="m7-q"><span class="m7-qno">${esc(q.no)}${/^[0-9A-Za-z]+$/.test(q.no) ? "." : ""}</span>${head}${!mcq && showAns ? solButton(q.solId) : ''}${parts}${a}</div>`;
  }
  function blocks(list, ctx) {
    ctx = ctx || {};
    return (list || []).map(b => {
      switch (b.t) {
        case 'page': return ctx.noPages ? '' : `<div class="m7-page" aria-label="Source page">${b.printed != null ? `Textbook page ${esc(b.printed)}` : 'Unnumbered page'} · PDF page ${esc(b.pdf)}</div>`;
        case 'h': return heading(b);
        case 'p': return sentence(b, 'p');
        case 'm': return `<p class="m7-m">${inline(b.en, false)}</p>`;
        case 'eq': return b.ur ? `<div class="m7-eq m7-s" role="button" tabindex="0" aria-expanded="false" onclick="m7Toggle(this,event)">${inline('$$' + b.tex + '$$', false)}</div>${translations(b)}` : `<div class="m7-eq">${inline('$$' + b.tex + '$$', false)}</div>`;
        case 'ul': return `<ul class="m7-ul">${b.items.map(i => `<li class="lv${i.lv || 1}">${sentence(i, 'span')}</li>`).join('')}</ul>`;
        case 'box': {
          const label = b.title ? b.title : (BOX_LABEL[b.kind] ? {en: BOX_LABEL[b.kind]} : null);
          return `<aside class="m7-box ${esc(b.kind)}">${label ? `<div class="m7-box-t">${label.ur ? sentence(label, 'span') : esc(label.en)}</div>` : ''}${blocks(b.blocks, ctx)}</aside>`;
        }
        case 'example': return `<section class="m7-example"><div class="m7-example-t">Example ${esc(b.no)}${b.title ? ': ' : ''}${b.title ? (b.title.ur ? sentence(b.title, 'span') : inline(b.title.en, true)) : ''}</div>${blocks(b.blocks, ctx)}</section>`;
        case 'exercise': {
          const ans = answersFor(b.ansKey || b.id);
          return `<section class="m7-exercise"><div class="m7-exercise-t">${/^\d/.test(b.id) ? 'Exercise ' : ''}${esc(b.id)}</div>${blocks(b.blocks, Object.assign({}, ctx, {ans}))}</section>`;
        }
        case 'q': return question(b, ctx.ans || {}, !!ctx.showAnswers);
        case 'parts': return question({no: '', parts: b.parts}, {}, false).replace('<span class="m7-qno">.</span>', '');
        case 'svg': return `<figure class="m7-fig">${b.svg}${b.cap ? `<figcaption>${b.cap.ur ? sentence(b.cap, 'span') : inline(b.cap.en, true)}</figcaption>` : ''}</figure>`;
        case 'table': {
          const head = b.rows.slice(0, b.head), body = b.rows.slice(b.head);
          return `<div class="m7-table"><table>${b.cap ? `<caption>${b.cap.ur ? sentence(b.cap, 'span') : esc(b.cap.en)}</caption>` : ''}${head.length ? `<thead>${head.map(r => `<tr>${r.map(c => `<th scope="col">${inline(c, false)}</th>`).join('')}</tr>`).join('')}</thead>` : ''}<tbody>${body.map(r => `<tr>${r.map(c => `<td>${inline(c, false)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
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
  const tools = () => `<div class="m7-tools"></div><p class="m7-help">Click any sentence to see its translation just below it. Point at a word for its meaning.</p>`;
  const root = inner => `<div class="m7-root" data-sbmode="${window.SB_LANG_MODE || 0}">${tools()}${inner}</div>`;

  function card(id, badge, title, body, open) {
    return `<div class="math-topic-card math-accordion-card${open ? ' open' : ''}" id="math-topic-${esc(id)}">
      <div class="math-acc-header" onclick="toggleMathAccordion(this)">
        <div style="display:flex;align-items:center;gap:.75rem;min-width:0;"><span class="math-badge" style="background:#e0f2fe;color:#0369a1;">${esc(badge)}</span>
        <h3 style="color:#0f172a;font-size:1.05rem;font-weight:700;margin:0;">${esc(title)}</h3></div>
        <span class="math-acc-icon">${open ? '−' : '+'}</span></div>
      <div class="math-accordion-body" style="display:${open ? 'block' : 'none'};margin-top:1rem;border-top:1px solid #e2e8f0;padding-top:1rem;">${body}</div></div>`;
  }
  function pending(ch) {
    return `<div class="math-topic-card" style="padding:1.5rem;text-align:center;color:#475569;">Unit ${esc(ch.number)} (from textbook page ${esc(ch.pageStart)}) is awaiting page-by-page source review. ${esc(BOOK.reviewedPdfPages || 0)} of ${esc(BOOK.totalPdfPages || '')} source pages reviewed so far.</div>`;
  }

  function lesson(ch) {
    let html = '';
    if (ch.number === 1 && BOOK.frontMatter && BOOK.frontMatter.length) {
      html += card('m7-front', 'Book', 'Cover, credits and contents', root(blocks(BOOK.frontMatter)), false);
    }
    if (!ch.sections.length) return html + pending(ch);
    html += window.MATH6_READER.pageCards(ch.sections, {id: sec => sec.id, badge: (sec, i) => /^\d+\.\d/.test(sec.id) ? `Topic ${sec.id}` : (/summary/i.test(sec.id) ? 'Summary' : (/review/i.test(sec.id) ? 'Review' : (/intro/i.test(sec.id) ? 'Introduction' : 'Unit opening'))), title: sec => sec.title + (sec.titleUrdu ? ` · ${sec.titleUrdu}` : ''), root, blocks, card});
    return html;
  }
  function examples(ch) {
    if (!ch.workedExamples.length) return pending(ch);
    return ch.workedExamples.map(ex => card(ex.id, `Example ${ex.no}`.trim(), (ex.title ? plain(ex.title.en) : '') + ` (p. ${ex.printed})`, root(blocks([ex], {noPages: true})), false)).join('');
  }
  function exercises(ch) {
    if (!ch.exercises.length) return pending(ch);
    const reviewedAnswers = (BOOK.answerPdfPages || []).length > 0;
    return ch.exercises.map(ex => card('ex-' + ex.id, /^\d/.test(ex.id) ? `Exercise ${ex.id}` : ex.id, `Textbook page ${ex.printed}`,
      root((reviewedAnswers ? '' : '<p class="m7-help">Textbook answers (printed from page 270) are attached as their pages are reviewed.</p>') + blocks([ex], {showAnswers: true, noPages: true})), false)).join('');
  }
  function slos(ch) {
    if (!ch.slos.length) return pending(ch);
    return root(`<div class="m7-h3">Student Learning Outcomes</div><p class="m7-help">From the textbook unit opening page.</p><ul class="m7-ul">${ch.slos.map(i => `<li class="lv${i.lv || 1}">${sentence(i, 'span')}</li>`).join('')}</ul>`);
  }
  function summary(ch) {
    const sec = ch.sections.find(s => /summary/i.test(s.id) || /summary/i.test(s.title));
    const eqs = [];
    ch.sections.forEach(s => (function walk(list) { (list || []).forEach(b => { if (b.t === 'eq') eqs.push(b); if (b.blocks) walk(b.blocks); }); })(s.blocks));
    if (!sec && !eqs.length) return pending(ch);
    return root((sec ? blocks(sec.blocks, {noPages: true}) : '') + (eqs.length ? `<div class="m7-h3">Equations shown in this unit</div>${blocks(eqs)}` : ''));
  }

  const wrap = (name, fn) => {
    if (typeof window[name] !== 'function') return;
    SBHooks.use(name, function (original) { return function (ch) { return isCls7() && ch && MATH_7_DATA.includes(ch) ? fn(ch) : original.apply(this, arguments); }; });
  };
  wrap('renderMathLesson', lesson);
  wrap('renderMathExamples', examples);
  wrap('renderMathExercises', exercises);
  wrap('renderMathSLOs', slos);
  wrap('renderMathFormulaSheet', summary);
  // Class 7 subjects open in the generic subject workspace (openSubjectWorkspace -> switchSubjectTab).
  if (typeof window.switchSubjectTab === 'function') {
    const TAB_RENDER = {lesson, concepts: examples, exercise: exercises, slos, formulas: summary};
    const TAB_LABEL = {lesson: '📖 Lessons', concepts: '💡 Worked Examples', exercise: '✍️ Exercises', slos: '🎯 Learning Outcomes', formulas: '📐 Summary & Formulas'};
    SBHooks.use('switchSubjectTab', function (originalSwitch) { return function (subjKey, tabId, chIdx, classId) {
      const ch = classId === 'cls7' && subjKey === 'math' ? MATH_7_DATA[chIdx] || MATH_7_DATA[0] : null;
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
      if (container && container.querySelector && container.querySelector('.m7-root')) {
        if (window.mathTypesetterObserver) { window.mathTypesetterObserver.disconnect(); window.mathTypesetterObserver = null; }
        return;
      }
      return originalTypeset.apply(this, arguments);
    }; });
  }
  window.MATH7_READER = {blocks, inline};
})();
