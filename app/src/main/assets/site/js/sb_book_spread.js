/* Open-book view for the reviewed books (and Class 6 Mathematics exercises).
 * Wide screens and full screen show two facing pages; a NARROW screen and the Android app show the SAME printed pages, one at a time
 * (bk-single), so a phone reads exactly what the website reads: the same text, the same exercises, the same Ans buttons. 
 * In full screen the Exercises tab shows each exercise as the printed book does: two facing pages
 * (odd page on the left, even page on the right), question numbers in green squares, answer options in a row,
 * a green "Exercise" banner and the yellow page-number circle on a green footer bar.
 * The pages are rebuilt from the same reviewed book data (MATH_6_DATA) the Lessons tab uses, so the page that
 * holds the end of the lesson and the start of the exercise appear together. Outside full screen nothing changes. */
(function () {
  'use strict';
  const realFs = () => !!(document.fullscreenElement || document.webkitFullscreenElement || document.querySelector('.sb-fs-fallback'));
  // The website's wide screens show the reader the way full screen does (thin chapter rail, tight header and tabs, the open book);
  // the Android app (html.sbapp, set after the page loads, so asked each time) and narrow screens keep their own layout.
  const wide = window.matchMedia ? window.matchMedia('(min-width:761px)') : null;
  const look = () => !document.documentElement.classList.contains('sbapp') && !!wide && wide.matches;
  const fsOn = () => realFs() || look();
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

  // One rule for the compact reader look: in full screen (every width) and, inside the page, on the website's wide screens.
  // thin = only while the chapter rail is closed; lookBody = what the in-page version says when it differs.
  const FS_HOST = ['.math-unified-view.sb-fs-host:fullscreen', '.math-unified-view.sb-fs-fallback'];
  const LOOK_HOST = 'html:not(.sbapp) .math-unified-view.sb-fs-host';
  function compact(sub, body, thin, lookBody) {
    const not = thin ? ':not(.sb-rail-open)' : '', tail = sub ? ' ' + sub : '';
    return `@media(min-width:761px){${LOOK_HOST}${not}${tail}{${lookBody || body}}}${FS_HOST.map(h => h + not + tail).join(',')}{${body}}`;
  }

  const css = `
  .bk-wrap{margin:0 0 2.2rem;content-visibility:auto;contain-intrinsic-size:auto 1250px}
  .bk-wrap.bk-one{margin:0 0 1.1rem;contain-intrinsic-size:auto 900px}
  .bk-single{display:block;max-width:760px;box-shadow:0 2px 10px rgba(15,23,42,.18),0 0 0 1px #cbd5e1}
  .bk-single::before{display:none}
  .bk-single .bk-page,.bk-page.bk-solo{border-radius:6px;background:#fff;min-height:0;padding:1rem .85rem 3.4rem}
  .bk-one .bk-head{font-size:.85rem;margin-bottom:.35rem}
  .bk-single .bk-page table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}
  .bk-single .bk-page td,.bk-single .bk-page th{overflow-wrap:normal;word-break:normal;min-width:3.2em}
  @media print{.bk-wrap{content-visibility:visible}}
  .bk-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:.6rem 1.2rem;max-width:1500px;margin:0 auto .55rem;font:700 .92rem system-ui,sans-serif;color:#334155}
  .bk-head b{color:#15803d}
  .bk-head label{display:inline-flex;align-items:center;gap:.4rem;font-weight:600;cursor:pointer}
  .bk-spread{position:relative;display:grid;grid-template-columns:1fr 1fr;max-width:1500px;margin:0 auto;background:#fff;border-radius:6px;box-shadow:0 12px 34px rgba(15,23,42,.28),0 0 0 1px #cbd5e1}
  .bk-page{position:relative;min-width:0;padding:1.6rem 2.1rem 4.4rem;min-height:min(56vw,1250px);font-family:Arial,'Segoe UI',system-ui,sans-serif;color:#111827}
  .bk-left{border-radius:6px 0 0 6px;background:linear-gradient(90deg,#fff 90%,#e5e7eb 100%)}
  .bk-right{border-radius:0 6px 6px 0;background:linear-gradient(270deg,#fff 90%,#e5e7eb 100%)}
  .bk-spread::before{content:"";position:absolute;z-index:2;top:0;bottom:0;left:50%;width:2px;transform:translateX(-50%);background:linear-gradient(180deg,#cbd5e1,#94a3b8 50%,#cbd5e1);pointer-events:none}
  .bk-page .m6-tools,.bk-page .m6-help{display:none}
  .bk-page .m6-root{font-size:1.02rem;line-height:1.62;color:#111827}
  .bk-page .m6-root::after{content:"";display:block;clear:both}
  .bk-page .m6-m{margin:.2rem 0}
  .bk-page .m6-h3{display:block;width:max-content;max-width:100%;background:linear-gradient(180deg,#34b36b,#17894b);color:#fff;font-size:1.3rem;font-weight:800;padding:.25rem 1.1rem;margin:.9rem 0 .5rem;border-radius:7px;box-shadow:0 2px 0 rgba(0,0,0,.18)}
  .bk-page .m6-h3 .m6-hsub{color:#dcfce7}
  .bk-page .m6-h4{color:#1e3a8a;font-weight:800;font-size:1.1rem;margin:.8rem 0 .25rem}
  .bk-spread .bk-page .m6-exercise{border:0!important;border-radius:0;padding:0;margin:.3rem 0 .4rem;background:none;box-shadow:none}
  .bk-page .m6-exercise-t:empty{display:none}
  .bk-page .m6-exercise-t{display:block;width:max-content;margin:.1rem auto .7rem;padding:.4rem 2.2rem;background:linear-gradient(180deg,#34b36b,#17894b);color:#fff;font-size:1.2rem;font-weight:800;border-radius:0;clip-path:polygon(7% 0,100% 0,93% 100%,0 100%)}
  .bk-page .m6-q{margin:.7rem 0;font-weight:700}
  .bk-page .m6-qno{display:inline-flex;align-items:center;justify-content:center;min-width:1.55rem;height:1.55rem;padding:0 .2rem;margin-inline-end:.55rem;background:#16a34a;color:#fff;border-radius:3px;font-weight:800;font-size:.95rem;vertical-align:.05em;box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)}
  .bk-page .m6-parts{display:flex;flex-wrap:wrap;gap:.25rem 1.9rem;margin:.35rem 0 .2rem 2.2rem;font-weight:400}
  .bk-page .m6-parts.block{display:block}
  .bk-page .m6-part{margin:.25rem 0}
  .bk-page .m6-part strong{font-weight:400}
  .bk-page .m6-box{background:#fff;border:1px solid #475569;border-radius:3px;position:relative;margin:1.5rem 0 .9rem;padding:.9rem .8rem .5rem}
  .bk-page .m6-box-t{position:absolute;top:-.95rem;left:-.35rem;margin:0;padding:.12rem 1rem;background:#15803d;color:#fff;font-size:.85rem;font-weight:800;font-style:italic;clip-path:polygon(6% 0,100% 0,94% 100%,0 100%)}
  .bk-page .m6-box.prior{float:right;width:40%;margin:2.6rem 0 1rem 1.2rem}
  .bk-spread .bk-page .c1-instr{background:none;padding:0;border-radius:0;font-weight:400;margin:.3rem 0}
  .bk-page .m6-box.prior .m6-ul{font-size:.9rem;margin:0;padding-left:1.1rem}
  .bk-page .m6-eq{text-align:left}
  .bk-spread .bk-page .m6-fig{margin:.6rem auto;padding:.4rem;box-shadow:none;background:none;text-align:center}
  .bk-spread .bk-page .m6-fig svg{min-width:0!important;max-width:min(100%,440px)!important;height:auto}
  .bk-spread .bk-page .m6-fig figcaption{font-size:.9rem}
  .bk-dom .bk-page>*:not(.bk-foot){margin-top:0!important}
  .bk-dom .bk-page .math-accordion-body{display:block!important;border-top:0!important;margin-top:.3rem!important;padding-top:0!important}
  .bk-dom .bk-page .math-acc-icon,.bk-dom .bk-page .sb-card-fs,.bk-dom .bk-page .sb-fs-btn{display:none!important}
  .bk-dom .bk-page .math-acc-header{pointer-events:none;cursor:default}
  .bk-dom .bk-page .math-topic-card,.bk-dom .bk-page .para-card{border:0!important;box-shadow:none!important;background:none!important;padding:0!important}
  .bk-blank{background:#f8fafc}
  .bk-foot{position:absolute;left:1.6rem;right:1.6rem;bottom:1.1rem;height:15px;border-radius:8px;background:linear-gradient(180deg,#22c55e,#15803d)}
  .bk-no{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#facc15;border:2px solid #fff;box-shadow:0 0 0 2px #ca8a04;font:800 1rem system-ui,sans-serif;color:#111827}
  .bk-spread .bk-page .m6-h4.c1-banner{display:block;width:auto;background:none;box-shadow:none;border-radius:0;padding:0;margin:.8rem 0 .25rem;color:#1e3a8a!important;font-size:1.12rem;font-weight:800}
  .bk-spread .bk-page .m6-h4.c1-banner .m6-hsub{color:#475569!important}
  .bk-spread .bk-page .m6-h3.c1-banner{display:block;width:max-content;max-width:100%;background:linear-gradient(180deg,#34b36b,#17894b);color:#fff;font-size:1.3rem;font-weight:800;padding:.25rem 1.1rem;margin:.9rem 0 .5rem;border-radius:7px}
  .bk-page .katex-display>.katex{text-align:left}
  .bk-spread:not(.bk-ans) .sb-ans,.bk-spread:not(.bk-ans) .sb-solve,.bk-spread:not(.bk-ans) .m6-ans{display:none!important}
  ${compact('', 'grid-template-columns:76px minmax(0,1fr)!important')}
  @media(min-width:761px){html:not(.sbapp) .math-unified-view.sb-fs-host.sb-rail-open,.math-unified-view.sb-fs-host.sb-rail-open:is(:fullscreen,.sb-fs-fallback){grid-template-columns:292px minmax(0,1fr)!important}}
  ${compact('.math-ch-sidebar :is(.mcb-info,.math-sidebar-title-wrap,.rt-filter,.mcb-check)', 'display:none!important', 1)}
  ${compact('.math-ch-sidebar .math-ch-btn', 'justify-content:center;padding:.55rem 0;gap:0', 1)}
  ${compact('.math-ch-sidebar-header', 'justify-content:center;padding:.8rem .3rem', 1)}
  ${compact('.math-ch-sidebar .rt-done::before', 'content:none!important;display:none!important', 1)}
  ${compact('.math-ch-sidebar .rt-done::after', 'content:none!important;display:none!important', 1)}
  .bk-nav{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9100;display:flex;align-items:center;gap:.4rem;padding:.3rem;background:rgba(15,23,42,.92);color:#fff;border-radius:999px;box-shadow:0 6px 20px rgba(15,23,42,.4);font:700 .9rem system-ui,sans-serif}
  .bk-nav[hidden]{display:none}
  .bk-nav button{border:0;border-radius:999px;background:#16a34a;color:#fff;font:700 .9rem system-ui,sans-serif;padding:.45rem 1rem;cursor:pointer}
  .bk-nav button:hover:not(:disabled){background:#15803d}
  .bk-nav button:disabled{background:#475569;cursor:default;opacity:.6}
  .bk-nav span{min-width:7.5rem;text-align:center}
  ${compact('', 'padding:0!important;gap:.4rem!important')}
  ${compact('.math-ch-sidebar', 'max-height:100vh!important;border-radius:0!important', 0, 'border-radius:0!important')}
  ${compact('.math-topic-area', 'max-height:100vh!important;border-radius:0!important', 0, 'border-radius:0!important')}
  ${compact('.math-compact-header-bar', 'padding:.2rem .8rem!important;min-height:0!important;margin:0!important;border-radius:0!important')}
  ${compact('.math-compact-header-bar *', 'line-height:1.2!important')}
  ${compact('.math-nav-tabs', 'padding:.1rem .6rem!important;margin:0!important;min-height:0!important;gap:.2rem!important')}
  ${compact('.math-nav-tabs button', 'padding:.3rem .8rem!important;font-size:.85rem!important')}
  ${compact('.math-ch-sidebar-header', 'padding:.35rem .3rem!important;min-height:0!important')}
  ${compact('.sb-fs-btn', 'top:.2rem!important;padding:.2rem .55rem!important')}
  ${compact('.topic-sub-tabs-bar-fixed:empty', 'display:none!important')}
  ${compact('.topic-sub-tabs-bar-fixed', 'margin-bottom:.3rem!important')}
  ${compact('.math-tab-content-scroll', 'padding-top:.3rem!important')}
  @media(min-width:761px){html:not(.sbapp) .math-unified-view.sb-fs-host:not(.sb-fs-fallback){margin:-14px -22px 0!important}}
  .bk-page{min-height:0!important;padding:.55rem 1.6rem 3.4rem!important}
  .bk-page .m6-root{font-size:.96rem;line-height:1.5}
  .bk-wrap{margin:0 0 .6rem}
  .bk-head{margin-bottom:.25rem}
  .bk-modal{position:fixed;inset:0;z-index:9300;background:rgba(15,23,42,.62);display:flex;align-items:center;justify-content:center;padding:2.5vh 3vw}
  .bk-modal-card{position:relative;width:fit-content;min-width:min(440px,100%);max-width:min(1280px,100%);height:auto;max-height:100%;background:#fff;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.5);display:flex;flex-direction:column;overflow:hidden}
  .bk-modal-bar{display:flex;justify-content:space-between;align-items:center;padding:.5rem .9rem;background:#0f172a;color:#fff;font:700 .95rem system-ui,sans-serif}
  .bk-modal-x{border:0;border-radius:999px;background:#ef4444;color:#fff;font:700 .9rem system-ui,sans-serif;padding:.35rem 1rem;cursor:pointer}
  .bk-modal-body{flex:1 1 auto;min-height:0;overflow:auto;padding:1rem 1.4rem 1.6rem}
  .bk-modal-body .sb-solve{display:block!important;max-width:none;margin:0}
  @media (max-width:900px){.bk-spread{grid-template-columns:1fr}.bk-spread::before{display:none}.bk-page{min-height:0}}
  `;
  function addCss() { if (document.getElementById('sb-book-spread-css')) return; const s = document.createElement('style'); s.id = 'sb-book-spread-css'; s.textContent = css; document.head.appendChild(s); }

  const tabBox = () => document.getElementById('subjTabContent') || document.getElementById('mathTabContent');
  const R = () => window.MATH6_READER;
  const LIB_N = id => window['CLS' + String(id).replace('cls', '') + '_BOOKS'] || {};
  const MATHD = {
    cls5: () => typeof MATH_5_DATA !== 'undefined' ? MATH_5_DATA : null,
    cls6: () => typeof MATH_6_DATA !== 'undefined' ? MATH_6_DATA : null,
    cls7: () => typeof MATH_7_DATA !== 'undefined' ? MATH_7_DATA : null,
    cls8: () => typeof MATH_8_DATA !== 'undefined' ? MATH_8_DATA : null,
    cls11: () => typeof MATH_11_DATA !== 'undefined' ? MATH_11_DATA : null
  };

  // the book of one Maths class: its own word list and printed key, and its class number, so that the Class 6 renderer that draws the pages reads that class's
  // answers (the SpaceBook solution ids repeat from class to class: "s814" is a different answer in Class 5, 6, 7 and 8)
  function mathRes(classId, arr, ch) {
    const n = String(classId).replace('cls', '');
    return {key: classId + ':math', units: arr, ch, wrap: n !== '6', cls: n, words: window['MATH_' + n + '_WORDS'], book: window['MATH_' + n + '_BOOK'], rtl: false};
  }

  // which reviewed book (units of sections of blocks) a workspace is showing
  function resolve(subjKey, classId, chIdx) {
    if (classId === 'cls11v') classId = 'cls11';
    const lib = classId === 'cls10' && subjKey === 'isl' ? LIB_N('cls9') : classId === 'cls9' && subjKey === 'islopt' ? LIB_N('cls10') : LIB_N(classId);
    const B = lib[subjKey];
    if (B && B.units && B.units.length) {
      let ch;
      if (B.book && B.book.byNumber) {
        const list = typeof getSubjectChapterList === 'function' ? getSubjectChapterList(subjKey, classId) : [];
        const cur = list[chIdx], no = cur ? String(cur.num || cur.number) : null;
        ch = no && B.units.find(u => String(u.number) === no && (u.sections || []).length);
      } else ch = B.units[chIdx] || B.units[0];
      if (!ch) return null;
      const langs = (B.book && B.book.langs) || ['en'];
      return {key: classId + ':' + subjKey, units: B.units, ch, front: B.book && B.book.frontMatter, back: B.book && B.book.backMatter, words: B.words, book: B.book, wrap: true, rtl: langs[0] !== 'en'};
    }
    if (subjKey === 'math' && MATHD[classId]) {
      const arr = MATHD[classId]();
      const ch = arr && (arr[chIdx] || arr[0]);
      if (!ch || ch.legacy) return null;
      return mathRes(classId, arr, ch);
    }
    return null;
  }

  // every printed page of the book in order: {key, printed, pdf, blocks, units:Set}
  const cache = new Map();
  function pagesOf(res) {
    if (cache.has(res.key) && cache.get(res.key).units === res.units) return cache.get(res.key).pages;
    const pages = [], byKey = new Map();
    let cur = null, anon = 0;
    const enter = (m, u) => {
      const key = m.pdf != null ? 'p' + m.pdf : 'n' + (anon++);
      if (!byKey.has(key)) { const pg = {key, printed: m.printed != null ? m.printed : null, pdf: m.pdf, blocks: [], units: new Set()}; byKey.set(key, pg); pages.push(pg); }
      cur = byKey.get(key);
      if (u != null) cur.units.add(u);
    };
    const put = (b, u) => {
      if (!cur) { cur = {key: 'x0', printed: null, pdf: null, blocks: [], units: new Set()}; byKey.set('x0', cur); pages.push(cur); }
      if (u != null) cur.units.add(u);
      cur.blocks.push(b);
    };
    const feed = (list, u) => (list || []).forEach(b => {
      if (b.t === 'page') { enter(b, u); return; }
      // an exercise / box that runs over a page break is cut at its page markers, one piece per page
      if (b.blocks && b.blocks.some(x => x.t === 'page')) {
        let chunk = [], first = true;
        const flush = () => { if (chunk.length) put(Object.assign({}, b, {blocks: chunk, id: first || b.t !== 'exercise' ? b.id : ''}), u); first = false; chunk = []; };
        b.blocks.forEach(x => { if (x.t === 'page') { flush(); enter(x, u); } else chunk.push(x); });
        flush();
        return;
      }
      put(b, u);
    });
    feed(res.front, null);
    res.units.forEach((u, i) => (u.sections || []).forEach(sec => feed(sec.blocks, i)));
    feed(res.back, null);
    cache.set(res.key, {units: res.units, pages});
    return pages;
  }

  // odd printed page on the first side, even on the second; gaps and unnumbered pages stand alone
  function spreadsOf(pages) {
    const out = [];
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i], n = pages[i + 1];
      if (p.printed != null && p.printed % 2 === 1 && n && n.printed === p.printed + 1) { out.push([p, n]); i++; }
      else if (p.printed != null && p.printed % 2 === 0) out.push([null, p]);
      else out.push([p, null]);
    }
    return out;
  }

  // short answer lists sit in one row like the book; long equations stay one per line; the dot after the question number goes
  function tidy(html) {
    const t = document.createElement('template');
    t.innerHTML = html;
    t.content.querySelectorAll('.m6-qno').forEach(n => { n.textContent = n.textContent.replace(/\.$/, ''); });
    t.content.querySelectorAll('.m6-parts.block').forEach(p => {
      const short = [...p.querySelectorAll('.m6-part')].every(part => ownText(part, 2000).replace(/\s+/g, ' ').trim().length <= 30);
      if (short) p.classList.remove('block');
    });
    return t.innerHTML;
  }
  // the text of a part without its Ans button, answer box, hidden MathML copy and translation line, read straight from the nodes and cut off at `max`
  // characters (a part is "short" or it is not: there is no need to read all of a long one). The old way cloned every part, which cost 0.5 s a chapter.
  const SKIP_TEXT = '.sb-ans,.sb-solve,.katex-mathml,.m6-tr';
  function ownText(el, max) {
    let s = '';
    const walk = node => {
      for (let c = node.firstChild; c && s.length <= max; c = c.nextSibling) {
        if (c.nodeType === 3) s += c.data;
        else if (c.nodeType === 1 && !c.matches(SKIP_TEXT)) walk(c);
      }
    };
    walk(el);
    return s;
  }

  const label = pg => pg ? (pg.printed != null ? String(pg.printed) : pg.pdf != null ? 'Scan ' + pg.pdf : '') : '';
  function pageHtml(pg, extra) {
    const r = R();
    if (!pg) return `<article class="bk-page bk-blank ${extra}" aria-hidden="true"></article>`;
    const body = pg.blocks.length ? r.blocks(pg.blocks, {noPages: true, showAnswers: true}) : '';
    return `<article class="bk-page ${extra}" aria-label="Textbook page ${esc(label(pg))}">${r.root(body)}<div class="bk-foot"><span class="bk-no">${esc(label(pg))}</span></div></article>`;
  }

  // the whole unit as facing pages in printed order; mode 'ex' also scrolls to the first exercise spread
  function book(res, mode) {
    // older cached readers still call book(chapter, mode): turn the chapter into the book it belongs to
    if (res && !res.units && res.sections) {
      const k = Object.keys(MATHD).find(c => { const a = MATHD[c](); return a && a.indexOf(res) >= 0; });
      res = k ? mathRes(k, MATHD[k](), res) : null;
    }
    if (!res || !R()) return null;
    addCss();
    const pages = pagesOf(res);
    const ui = res.units.indexOf(res.ch);
    const one = !fsOn();             // a narrow screen or the app: one printed page at a time, no facing pair
    const all = one ? pages.map(p => [p, null]) : spreadsOf(pages);
    let first = -1, last = -1;
    all.forEach((s, k) => { if (s.some(p => p && p.units.has(ui))) { if (first < 0) first = k; last = k; } });
    if (first < 0) return null;
    const exIds = pg => { const ids = []; (pg ? pg.blocks : []).forEach(b => { if (b.t === 'exercise') ids.push(/^\d/.test(String(b.id)) ? 'Exercise ' + b.id : String(b.id)); }); return ids; };
    const render = () => {
      const html = [];
      all.slice(first, last + 1).forEach(s => {
        const ids = [].concat(exIds(s[0]), exIds(s[1]));
        const nums = s.map(label).filter(Boolean);
        const title = nums.length > 1 ? 'Textbook pages ' + nums[0] + '–' + nums[1] : 'Textbook page ' + (nums[0] || '');
        const key = (s[0] || s[1]).key;
        if (one) {
          html.push(`<section class="bk-wrap bk-one" id="bk-spread-${esc(key)}" data-label="${esc(nums.join('–'))}"${ids.length ? ' data-ex="1"' : ''}><div class="bk-head"><span>${ids.length ? `<b>${esc(ids.join(' · '))}</b> · ` : ''}${esc(title)}</span></div><div class="bk-spread bk-single bk-ans${res.rtl ? ' bk-rtl' : ''}" dir="${res.rtl ? 'rtl' : 'ltr'}">${pageHtml(s[0], 'bk-solo')}</div></section>`);
          return;
        }
        html.push(`<section class="bk-wrap" id="bk-spread-${esc(key)}" data-label="${esc(nums.join('–'))}"${ids.length ? ' data-ex="1"' : ''}><div class="bk-head"><span>${ids.length ? `<b>${esc(ids.join(' · '))}</b> · ` : ''}${esc(title)}</span><label><input type="checkbox" checked onchange="this.closest('.bk-wrap').querySelector('.bk-spread').classList.toggle('bk-ans',this.checked)"> Show answers &amp; solutions</label></div><div class="bk-spread bk-ans${res.rtl ? ' bk-rtl' : ''}" dir="${res.rtl ? 'rtl' : 'ltr'}">${pageHtml(s[0], 'bk-left')}${pageHtml(s[1], 'bk-right')}</div></section>`);
      });
      return html.join('');
    };
    const out = res.wrap && R().withBook ? R().withBook(res.words, res.book, render, res.cls) : render();
    if (mode === 'ex') setTimeout(() => {
      // sb_structure draws every tab once to plan a chapter; only scroll when the Exercises tab is the one on screen
      const on = document.querySelector('.math-top-tab.active, .math-tab-btn.active');
      if (on && on.dataset.tab && !/^exercises?$/.test(on.dataset.tab)) return;
      const f = document.querySelector('#subjTabContent .bk-wrap[data-ex], #mathTabContent .bk-wrap[data-ex]');
      const b = tabBox();
      if (f && b) b.scrollTop += f.getBoundingClientRect().top - b.getBoundingClientRect().top - 8;
    }, 60);
    setTimeout(mountNav, 100);
    return tidy(out);
  }

  // Previous / Next spread buttons (and the arrow keys) while the open book is on screen
  let navTimer = 0;
  const box = () => tabBox();
  const wraps = () => [...document.querySelectorAll('#subjTabContent .bk-wrap, #mathTabContent .bk-wrap')];
  function current() {
    const b = box(), ws = wraps();
    if (!b || !ws.length) return -1;
    const top = b.getBoundingClientRect().top + 90;
    let i = 0;
    ws.forEach((w, k) => { if (w.getBoundingClientRect().top <= top) i = k; });
    return i;
  }
  function go(d) {
    const b = box(), ws = wraps(), i = current();
    if (i < 0) return;
    const t = ws[Math.max(0, Math.min(ws.length - 1, i + d))];
    b.scrollTo({top: b.scrollTop + t.getBoundingClientRect().top - b.getBoundingClientRect().top - 8, behavior: 'auto'});
  }
  function refreshNav() {
    const nav = document.querySelector('.bk-nav');
    if (!nav) return;
    const ws = wraps(), i = current();
    if (!fsOn() || i < 0) { nav.hidden = true; return; }
    nav.hidden = false;
    const lb = ws[i].dataset.label || '';
    const text = lb ? (lb.indexOf('–') > 0 ? 'Pages ' : 'Page ') + lb : '', span = nav.querySelector('span');
    if (span.textContent !== text) span.textContent = text;       // every 300 ms: an unchanged write would still wake every observer of the page
    nav.querySelector('.bk-prev').disabled = i === 0;
    nav.querySelector('.bk-next').disabled = i === ws.length - 1;
  }
  function mountNav() {
    const host = document.querySelector('.sb-fs-host');
    let nav = document.querySelector('.bk-nav');
    if (!fsOn() || !host) { if (nav) nav.remove(); clearInterval(navTimer); navTimer = 0; return; }
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'bk-nav';
      nav.innerHTML = '<button type="button" class="bk-prev" title="Previous pages (←)">◀ Previous</button><span></span><button type="button" class="bk-next" title="Next pages (→)">Next ▶</button>';
      nav.querySelector('.bk-prev').addEventListener('click', () => go(-1));
      nav.querySelector('.bk-next').addEventListener('click', () => go(1));
    }
    if (nav.parentElement !== host) host.appendChild(nav);
    if (!navTimer) navTimer = setInterval(refreshNav, 300);
    refreshNav();
  }
  document.addEventListener('keydown', e => {
    if (!fsOn() || !wraps().length || /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '')) return;
    // the arrows belong to a tab strip, a text box or a dialog that has the focus
    if (e.ctrlKey || e.metaKey || (e.target && e.target.closest && e.target.closest('[role="tablist"],[role="tab"],[contenteditable="true"],[role="dialog"],.bk-modal,.ut-root'))) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' && e.altKey) { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  // Answer / explanation panels of the open book appear in a large window over the full screen
  let modal = null;
  function closeModal() {
    if (!modal) return;
    const {el, panel, ph, btn} = modal;
    modal = null;
    panel.hidden = true;
    try { ph.replaceWith(panel); } catch (e) { /* page was redrawn meanwhile */ }
    if (btn) btn.setAttribute('aria-expanded', 'false');
    el.remove();
  }
  function openModal(panel) {
    if (modal || panel.closest('.bk-modal')) return;
    const host = document.querySelector('.sb-fs-host') || document.body;
    const btn = panel._btn || (panel.previousElementSibling && panel.previousElementSibling.matches('.sb-ans') ? panel.previousElementSibling : null);
    const q = panel.closest('.m6-q');
    const label = (q && q.querySelector('.m6-qno') ? 'Question ' + q.querySelector('.m6-qno').textContent.trim() : 'Solution');
    const ph = document.createComment('sb-solve');
    const el = document.createElement('div');
    el.className = 'bk-modal';
    el.innerHTML = `<div class="bk-modal-card" role="dialog" aria-modal="true"><div class="bk-modal-bar"><span>${esc(label)} · Answer and solution</span><button type="button" class="bk-modal-x">✕ Close</button></div><div class="bk-modal-body"></div></div>`;
    panel.replaceWith(ph);
    el.querySelector('.bk-modal-body').appendChild(panel);
    el.querySelector('.bk-modal-x').addEventListener('click', closeModal);
    el.addEventListener('click', e => { if (e.target === el) closeModal(); });
    host.appendChild(el);
    modal = {el, panel, ph, btn};
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal) { e.stopPropagation(); closeModal(); } }, true);
  new MutationObserver(muts => muts.forEach(m => {
    const t = m.target;
    // a maths solution opens the answer window wherever it is (the wide book view, a narrow window, the app); any other answer shows
    // in place (sb_solve.js: .sbs-inline)
    if (t.nodeType === 1 && t.classList.contains('sb-solve') && !t.classList.contains('sbs-inline') && !t.hidden) openModal(t);
  })).observe(document.documentElement, {attributes: true, attributeFilter: ['hidden'], subtree: true});
  document.addEventListener('sb-fs-change', closeModal);


  // safety net: a subject workspace without the usual Full screen button gets a floating one
  function ensureFsButton() {
    if (document.querySelector('.sb-fs-btn') || document.getElementById('bk-fs-float')) return;
    const content = tabBox();
    const host = content && content.closest('.math-unified-view, .bio-view, .drawing-workspace, #dashboard-body');
    if (!host) return;
    host.classList.add('sb-fs-host');
    const b = document.createElement('button');
    b.type = 'button'; b.id = 'bk-fs-float'; b.className = 'sb-fs-btn'; b.style.cssText = 'position:fixed;top:70px;right:16px;z-index:9000';
    b.textContent = '⛶ Full screen';
    b.addEventListener('click', e => {
      e.stopPropagation();
      if (window.SBFullscreen) window.SBFullscreen.toggle(host);     // sb_global_ui.js: the whole page goes full screen, the workspace is laid over it
      setTimeout(() => { b.textContent = realFs() ? '🗗 Exit full screen' : '⛶ Full screen'; }, 150);
    });
    document.body.appendChild(b);
  }
  setInterval(() => { try { if (!realFs() || document.fullscreenElement) ensureFsButton(); const f = document.getElementById('bk-fs-float'); if (f && (!tabBox() || document.querySelector('.sb-fs-btn:not(#bk-fs-float)'))) f.remove(); } catch (e) { /* ignore */ } }, 1500);

  addCss();
  window.SBSpread6 = {on: fsOn, look, resolve, book, exercises: ch => book(ch, 'ex')};
  // crossing the width where the compact look starts redraws the open tab, as entering full screen does
  if (wide && wide.addEventListener) wide.addEventListener('change', () => document.dispatchEvent(new CustomEvent('sb-fs-change')));


  // Books whose data is not in the shared page format (Classes 9-12 science, maths, Class 11-12 subjects): the cards the
  // reader already drew become the pages of the open book, one card per page, in the book's own order.
  function domBook(container, mode) {
    addCss();
    // the parent that holds the most page-like cards (a section per scan, a card per topic, ...) is the book
    const CARD = 'section, .para-card, .math-topic-card, .math-accordion-card, details, [data-source-page]';
    let items = [], best = 1;
    [container, ...container.querySelectorAll('*')].forEach(el => {
      const kids = [...el.children].filter(k => k.matches(CARD) && (k.textContent || '').trim().length > 12);
      if (kids.length > best) { best = kids.length; items = kids; }
    });
    if (!items.length) [...container.children].forEach(k => {
      if (k.matches('.math-cards-grid-target')) [...k.children].forEach(c => items.push(c));
      else if (!k.matches('.sh-bar, .sh-gbar, .bk-wrap, script, style') && !k.matches('p.cs11-source-note')) items.push(k);
    });
    const real = items.filter(el => (el.textContent || '').trim().length > 12 || el.querySelector('svg,img,canvas'));
    if (real.length < 1) return false;
    const rtl = getComputedStyle(container).direction === 'rtl';
    const labelOf = (el, i) => {
      if (el.dataset && el.dataset.sourcePage) return el.dataset.sourcePage;
      const t = (el.textContent || '').slice(0, 260);
      const m = /(?:Scan|PDF page|PDF|Page|Pages|صفحہ|پاڼه)\s*(\d+)/i.exec(t);
      return m ? m[1] : String(i + 1);
    };
    // topic-sized cards carry no page boundaries: leave those books in their normal view rather than invent pages
    const lens = real.map(el => (el.textContent || '').length).sort((x, y) => x - y);
    if (real.length < 2 || lens[Math.floor(lens.length / 2)] > 5000) return false;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < real.length; i += 2) {
      const pair = [real[i], real[i + 1] || null];
      const sec = document.createElement('section');
      sec.className = 'bk-wrap bk-dom';
      const labs = pair.map((e, k) => e ? labelOf(e, i + k) : '').filter(Boolean);
      sec.dataset.label = labs.length > 1 && labs[0] !== labs[1] ? labs[0] + '–' + labs[1] : labs[0];
      if (pair.some(e => e && /exercise|مشق|تمرین|questions?/i.test((e.textContent || '').slice(0, 120)))) sec.dataset.ex = '1';
      sec.innerHTML = '<div class="bk-head"><span>Page ' + esc(sec.dataset.label) + '</span><label><input type="checkbox" checked onchange="this.closest(\'.bk-wrap\').querySelector(\'.bk-spread\').classList.toggle(\'bk-ans\',this.checked)"> Show answers &amp; solutions</label></div><div class="bk-spread bk-ans' + (rtl ? ' bk-rtl' : '') + '" dir="' + (rtl ? 'rtl' : 'ltr') + '"></div>';
      const sp = sec.querySelector('.bk-spread');
      pair.forEach((el, k) => {
        const art = document.createElement('article');
        art.className = 'bk-page ' + (k ? 'bk-right' : 'bk-left') + (el ? '' : ' bk-blank');
        if (el) {
          el.classList.add('open');
          // the page number is shown once, in the footer circle: a "Page 57" / "Scan 12" chip on the card would repeat it
          el.querySelectorAll('.math-badge').forEach(b => { if (/^\s*(Scan|PDF|Pages?|p\.)\s*[\d–-]+\s*$/i.test(b.textContent)) b.style.display = 'none'; });
          art.appendChild(el);
          const foot = document.createElement('div');
          foot.className = 'bk-foot';
          foot.innerHTML = '<span class="bk-no">' + esc(labelOf(el, i + k)) + '</span>';
          art.appendChild(foot);
        }
        sp.appendChild(art);
      });
      frag.appendChild(sec);
    }
    container.innerHTML = '';
    container.appendChild(frag);
    container.scrollTop = 0;
    if (mode === 'ex') { const f = container.querySelector('.bk-wrap[data-ex]'); if (f) container.scrollTop = f.offsetTop - 8; }
    setTimeout(mountNav, 100);
    return true;
  }

  // other scripts (structure harmonizer, translations) rewrite a reader's output a moment after it is drawn;
  // wait until the tab has stopped changing, then turn its cards into pages
  function settled(container, mode) {
    let last = -1, same = 0, n = 0;
    const tick = () => {
      if (!fsOn() || tabBox() !== container || container.querySelector('.bk-wrap')) return;
      const len = container.innerHTML.length;
      same = len === last ? same + 1 : 0;
      last = len;
      if ((same >= 2 && n >= 3) || n++ > 14) { try { domBook(container, mode); } catch (e) { console.error('book view', e); } return; }
      setTimeout(tick, 120);
    };
    setTimeout(tick, 120);
  }

  // the Lessons and Exercises tabs of every reviewed book open as the printed book: facing pages in full screen and on wide screens, one printed page at a
  // time on a narrow screen and in the app (book() decides), so the phone and the website show the same book
  function apply(subjKey, tabId, chIdx, classId) {
    if (tabId !== 'lesson' && tabId !== 'exercise') return;
    const res = resolve(subjKey, classId, chIdx);
    if (res && !fsOn() && /:math$/.test(res.key)) return;          // Mathematics keeps its own reader on a narrow screen and in the app (they have their own Ans handlers)
    const container = tabBox();
    if (!container) return;
    const html = res ? book(res, tabId === 'exercise' ? 'ex' : '') : null;
    if (html) { container.innerHTML = html; container.scrollTop = 0; }
    else if (fsOn()) settled(container, tabId === 'exercise' ? 'ex' : '');     // books not in the page format: their cards become pages only in the open-book view
  }
  if (window.SBHooks && typeof window.switchSubjectTab === 'function') {
    SBHooks.use('switchSubjectTab', function (original) { return function (subjKey, tabId, chIdx, classId) {
      const r = original.apply(this, arguments);
      try { apply(subjKey, tabId, chIdx, classId); } catch (e) { console.error('book view', e); }
      return r;
    }; });
  }

  if (window.SBHooks && typeof window.switchMathTab === 'function') {
    SBHooks.use('switchMathTab', function (original) { return function (tab) {
      const r = original.apply(this, arguments);
      try {
        if (fsOn() && (tab === 'lesson' || tab === 'exercises' || tab === 'exercise') && tabBox()) {
          const res = resolve(state.activeSubject || 'math', state.selectedClass, state.selectedMathChapter || 0);
          const html = res ? book(res, tab === 'lesson' ? '' : 'ex') : null;
          if (html) { tabBox().innerHTML = html; tabBox().scrollTop = 0; }
          else settled(tabBox(), tab === 'lesson' ? '' : 'ex');
        }
      } catch (e) { console.error('book view', e); }
      return r;
    }; });
  }

  // entering or leaving full screen redraws the open tab
  document.addEventListener('sb-fs-change', () => {
    document.querySelectorAll('.math-ch-btn').forEach(b => { const n = b.querySelector('.mcb-name'); if (n) b.title = n.textContent; });
    setTimeout(mountNav, 150);
    const btn = document.querySelector('.math-top-tab.active, .math-tab-btn.active');
    const m = btn && /switchSubjectTab\('([^']*)',\s*'([^']*)',\s*(\d+),\s*'([^']*)'\)/.exec(btn.getAttribute('onclick') || '');
    if (m && (m[2] === 'lesson' || m[2] === 'exercise') && typeof window.switchSubjectTab === 'function') window.switchSubjectTab(m[1], m[2], +m[3], m[4]);
    const mm = btn && /switchMathTab\('([^']*)'\)/.exec(btn.getAttribute('onclick') || '');
    if (mm && typeof window.switchMathTab === 'function') window.switchMathTab(mm[1]);
  });
})();
