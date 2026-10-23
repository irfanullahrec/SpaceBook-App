/* sb_grammar.js — "Grammar Stats": the grammar of the English, Urdu, Pashto and Arabic books, from the first steps to the hardest, and a place to learn it.
 *
 * Project Stats (Home) shows one card per language with its numbers; the Grammar Stats page lists the topics of a language from easy to hard (the class
 * band they start in), each with how many lessons and practice questions the books have for it and in which classes. A topic opens as a lesson page: the
 * books' own teaching text (with the Urdu / Pashto lines under it where the book has them), then practice questions with their answers, class by class.
 * The files (content/grammar/, made by tools/grammar/build_grammar.js) are fetched on first use and kept for offline use. Nothing here is written by
 * hand: a lesson is text of a book, a question is a question of a book; a topic with no lesson says so.
 * Public: window.SBGrammar { renderPanel(el), open(lang, topicId), page() }, window.renderGrammarStats() (the page), window.SBOpenChapter(subjectId, call). */
(function () {
  'use strict';
  const BASE = 'content/grammar/';
  const S = {lang: 'en', topic: null, cls: 0, tab: 'lessons', tr: false};
  let INDEX = null;
  const FILES = {};
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const ARABIC = /[؀-ۿ]/g, LATIN = /[A-Za-z]/g;
  const dirOf = t => { const s = String(t || '').replace(/\$[^$]*\$/g, ' '); return (s.match(ARABIC) || []).length > (s.match(LATIN) || []).length ? 'rtl' : 'ltr'; };
  const fmt = t => { try { return window.MATH6_READER ? window.MATH6_READER.inline(String(t == null ? '' : t), false) : esc(t); } catch (e) { return esc(t); } };
  const getJson = u => fetch(u).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  const loadIndex = () => INDEX ? Promise.resolve(INDEX) : getJson(BASE + 'index.json').then(j => (INDEX = j));
  const loadLang = l => FILES[l] ? Promise.resolve(FILES[l]) : loadIndex().then(ix => getJson(BASE + ix.langs[l].file + '?v=' + ix.langs[l].h)).then(j => (FILES[l] = j));
  const host = () => document.getElementById('dashboard-body');
  const num = n => Number(n || 0).toLocaleString('en-US');

  // open a chapter of a book from the call its own sidebar button makes (the same way the search results do)
  function openChapter(subjectId, call) {
    try {
      const cls = (String(subjectId).match(/^(cls\d+)/) || [])[1];
      if (typeof window.openSubject === 'function') window.openSubject(cls, subjectId);
      const btn = [...document.querySelectorAll('[onclick]')].find(e => e.getAttribute('onclick') === call);
      if (btn) btn.click();
    } catch (e) { /* the subject opens on its own first chapter */ }
  }
  window.SBOpenChapter = window.SBOpenChapter || openChapter;

  const CSS = `
  .sbgr{max-width:1000px;margin:0 auto;padding:.4rem .2rem 3rem;color:#0f172a}
  .sbgr-home{margin-top:1rem}
  .sbgr-hero{background:linear-gradient(135deg,#065f46,#1d4ed8);color:#fff;border-radius:16px;padding:1rem 1.2rem;margin-bottom:1rem}
  .sbgr-hero h2{margin:0 0 .25rem;color:#fff;font-size:1.25rem}.sbgr-hero p{margin:0;font-size:.92rem;opacity:.95}
  .sbgr-tabs{display:flex;flex-wrap:wrap;gap:.4rem;margin:.6rem 0}
  .sbgr-tab{padding:.45rem .9rem;border:1px solid #94a3b8;border-radius:999px;background:#fff;color:#0f172a;font:700 .9rem system-ui,sans-serif;cursor:pointer}
  .sbgr-tab[aria-pressed="true"]{background:#065f46;border-color:#065f46;color:#fff}
  .sbgr-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:.6rem;margin:.6rem 0}
  .sbgr-tile{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:.6rem .8rem}
  .sbgr-tile b{display:block;font-size:1.5rem;color:#065f46}.sbgr-tile span{font-size:.8rem;color:#334155}
  .sbgr-lvl{margin:1.1rem 0 .3rem;padding:.35rem .75rem;border-radius:8px;background:#064e3b;color:#fff;font-size:.95rem}
  .sbgr-lvl small{font-weight:500;opacity:.9}
  .sbgr-topic{display:grid;grid-template-columns:1fr auto;gap:.2rem .8rem;align-items:center;width:100%;text-align:start;padding:.6rem .8rem;margin:.35rem 0;border:1px solid #cbd5e1;border-radius:12px;background:#fff;color:#0f172a;cursor:pointer;font:inherit}
  .sbgr-topic:hover,.sbgr-topic:focus-visible{border-color:#059669;background:#f0fdf4;outline:2px solid #6ee7b7;outline-offset:1px}
  .sbgr-topic .t{font-weight:700}.sbgr-topic .n{font-size:.85rem;color:#475569}.sbgr-topic .go{grid-row:1/3;grid-column:2;font-weight:800;color:#047857;white-space:nowrap}
  .sbgr-chip{display:inline-block;margin:.1rem .25rem .1rem 0;padding:.05rem .5rem;border-radius:999px;background:#e0f2fe;color:#0c4a6e;font-size:.75rem;font-weight:700}
  .sbgr-chip.l{background:#dcfce7;color:#14532d}.sbgr-chip.e{background:#fef3c7;color:#451a03}
  .sbgr-note{padding:.6rem .8rem;border-radius:10px;background:#fef3c7;color:#451a03;margin:.6rem 0;font-size:.9rem}
  .sbgr-back{margin:.3rem 0;padding:.35rem .8rem;border:1px solid #94a3b8;border-radius:999px;background:#fff;color:#0f172a;font:700 .85rem system-ui,sans-serif;cursor:pointer}
  .sbgr-lesson{border:1px solid #cbd5e1;border-radius:12px;background:#fff;margin:.6rem 0;padding:.6rem .9rem}
  .sbgr-src{display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;font-size:.8rem;color:#475569;margin-bottom:.3rem}
  .sbgr-src button{margin-inline-start:auto;padding:.2rem .7rem;border:1px solid #059669;border-radius:999px;background:#ecfdf5;color:#065f46;font:700 .78rem system-ui,sans-serif;cursor:pointer}
  .sbgr-lesson h4{margin:.5rem 0 .2rem;font-size:1rem;color:#064e3b}.sbgr-lesson p{margin:.25rem 0;line-height:1.75}
  .sbgr-lesson ul{margin:.25rem 0;padding-inline-start:1.4rem}.sbgr-box{display:inline-block;padding:.05rem .5rem;border-radius:6px;background:#ede9fe;color:#4c1d95;font-size:.78rem;font-weight:800}
  .sbgr-alt{font-size:.9rem;color:#475569;margin-inline-start:.8rem;border-inline-start:3px solid #bae6fd;padding-inline-start:.6rem}
  .sbgr-lesson table{border-collapse:collapse;margin:.4rem 0;font-size:.9rem}.sbgr-lesson td{border:1px solid #cbd5e1;padding:.2rem .5rem}
  .sbgr-q{border:1px solid #e2e8f0;border-radius:10px;padding:.5rem .7rem;margin:.4rem 0;background:#fff}
  .sbgr-q .h{font-size:.8rem;color:#475569;font-weight:700}.sbgr-q .t{font-size:1rem;line-height:1.7}
  .sbgr-opt{display:flex;gap:.5rem;align-items:flex-start;padding:.3rem .5rem;border:1px solid #cbd5e1;border-radius:8px;margin:.2rem 0;cursor:pointer;background:#fff}
  .sbgr-opt.ok{background:#dcfce7;border-color:#16a34a}.sbgr-opt.bad{background:#fee2e2;border-color:#dc2626}
  .sbgr-ans{margin-top:.35rem;padding:.35rem .6rem;border-inline-start:4px solid #16a34a;background:#f0fdf4;border-radius:6px;font-size:.92rem}
  .sbgr-mini{padding:.2rem .7rem;border:1px solid #94a3b8;border-radius:8px;background:#fff;color:#0f172a;font:600 .8rem system-ui,sans-serif;cursor:pointer}
  .sbgr-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:.7rem;margin:.6rem 0}
  .sbgr-card{border:1px solid #bbf7d0;border-radius:14px;background:#f0fdf4;padding:.7rem .9rem;text-align:start;cursor:pointer;font:inherit;color:#0f172a}
  .sbgr-card:hover,.sbgr-card:focus-visible{outline:2px solid #34d399;outline-offset:1px}
  .sbgr-card .l{font-weight:800;font-size:1.05rem}.sbgr-card .m{font-size:.82rem;color:#334155;margin-top:.2rem}
  .sbgr-bars{display:flex;gap:2px;margin-top:.4rem;height:.5rem}.sbgr-bars i{flex:1;border-radius:2px;background:#d1fae5}.sbgr-bars i.on{background:#059669}`;
  function addCss() { if (document.getElementById('sbgr-css')) return; const s = document.createElement('style'); s.id = 'sbgr-css'; s.textContent = CSS; document.head.appendChild(s); }

  const levelNames = () => (INDEX && INDEX.levels) || {};
  const classesOf = t => Object.keys(t.cls || {}).map(Number).sort((a, b) => a - b);
  const totals = l => INDEX.langs[l].total;

  // ---------- the card on Project Stats ----------
  function renderPanel(el) {
    if (!el) return;
    addCss();
    el.innerHTML = '<section class="ws-panel sbgr-home" aria-label="Grammar Stats"><div class="ws-panel-head"><div class="ws-panel-title"><span aria-hidden="true">🧩</span> Grammar Stats</div><div class="ws-panel-note">Lessons and practice from the English, Urdu, Pashto and Arabic books, from easy to hard · tap a language</div></div><div class="sbgr-note" role="status">Loading…</div></section>';
    loadIndex().then(ix => {
      const cards = Object.keys(ix.langs).map(l => {
        const L = ix.langs[l], t = L.total, lv = [1, 2, 3, 4, 5].map(n => '<i class="' + (L.topics.some(x => x.lvl === n) ? 'on' : '') + '"></i>').join('');
        return '<button type="button" class="sbgr-card" data-lang="' + l + '"><div class="l">' + esc(L.name) + (L.native !== L.name ? ' <span dir="auto">' + esc(L.native) + '</span>' : '') + '</div><div class="m">' + t.topics + ' topics · ' + num(t.lessons) + ' lessons · ' + num(t.exercises) + ' practice questions</div><div class="sbgr-bars" aria-label="Levels covered">' + lv + '</div></button>';
      }).join('');
      el.querySelector('.sbgr-home').innerHTML = '<div class="ws-panel-head"><div class="ws-panel-title"><span aria-hidden="true">🧩</span> Grammar Stats</div><div class="ws-panel-note">Lessons and practice from the English, Urdu, Pashto and Arabic books, from easy to hard · tap a language to learn</div></div><div class="sbgr-cards">' + cards + '</div>';
      el.querySelectorAll('.sbgr-card').forEach(b => b.addEventListener('click', () => { S.lang = b.dataset.lang; S.topic = null; go(); }));
    }).catch(() => { const n = el.querySelector('.sbgr-note'); if (n) n.textContent = 'The grammar files could not be loaded. Check the connection and try again.'; });
  }

  // ---------- the page ----------
  function go() {
    if (typeof window.setActiveNav === 'function') { try { window.setActiveNav('grammar-stats'); } catch (e) { /* no nav */ } }
    render();
  }
  function render() {
    try {
      state.page = 'grammar-stats'; state.activeView = 'grammar-stats';
      setActiveNav('grammar-stats');
      setDashHeader('🧩 Grammar Stats', 'Grammar from the first steps to the hardest, in English, Urdu, Pashto and Arabic');
      setBreadcrumb([{label: 'Home', onclick: () => { setActiveNav('home'); renderHome(); }}, {label: 'Grammar Stats', active: true, onclick: () => { S.topic = null; paint(); }}]);
    } catch (e) { /* app helpers missing: the page still draws */ }
    addCss(); paint(); window.scrollTo(0, 0);
  }
  function paint() {
    const h = host(); if (!h) return;
    h.innerHTML = '<div class="sbgr"><div class="sbgr-note" role="status">Loading the grammar of the books…</div></div>';
    loadIndex().then(() => S.topic ? loadLang(S.lang).then(() => lessonHtml()) : Promise.resolve(listHtml())).then(html => {
      h.innerHTML = '<div class="sbgr">' + html + '</div>';
      const root = h.querySelector('.sbgr'); root.addEventListener('click', onClick);
    }).catch(e => { h.innerHTML = '<div class="sbgr"><div class="sbgr-note" role="alert">The grammar files could not be loaded (' + esc(e.message) + '). Check the connection and try again.</div></div>'; });
  }
  function tabs() {
    return '<div class="sbgr-tabs" role="group" aria-label="Language">' + Object.keys(INDEX.langs).map(l => '<button type="button" class="sbgr-tab" data-act="lang" data-l="' + l + '" aria-pressed="' + (l === S.lang) + '">' + esc(INDEX.langs[l].name) + (INDEX.langs[l].native !== INDEX.langs[l].name ? ' <span dir="auto">' + esc(INDEX.langs[l].native) + '</span>' : '') + '</button>').join('') + '</div>';
  }
  function listHtml() {
    const L = INDEX.langs[S.lang], t = L.total;
    const clsSet = new Set(); L.topics.forEach(x => classesOf(x).forEach(c => clsSet.add(c)));
    let h = '<section class="sbgr-hero"><h2>🧩 Grammar Stats</h2><p>All the grammar in the project\'s books, language by language, from the first steps to the hardest. Tap a topic to learn it.</p></section>' + tabs();
    h += '<div class="sbgr-tiles"><div class="sbgr-tile"><b>' + t.topics + '</b><span>topics</span></div><div class="sbgr-tile"><b>' + num(t.lessons) + '</b><span>lessons from the books</span></div><div class="sbgr-tile"><b>' + num(t.exercises) + '</b><span>practice questions</span></div><div class="sbgr-tile"><b>' + clsSet.size + '</b><span>classes with grammar</span></div></div>';
    if (S.lang === 'ar') h += '<div class="sbgr-note">The Arabic books of this project are reading lessons with translations. They teach very little grammar in words, so only the few lessons that do are listed here.</div>';
    if (S.lang === 'ur' || S.lang === 'ps') h += '<div class="sbgr-note">The ' + esc(L.name) + ' books teach grammar mostly through exercises; the lessons below are the teaching text found in them, the numbers of practice questions are exact.</div>';
    const lv = levelNames();
    [1, 2, 3, 4, 5].forEach(n => {
      const list = L.topics.filter(x => x.lvl === n); if (!list.length) return;
      h += '<h3 class="sbgr-lvl">Level ' + n + ' <small>· ' + esc(lv[n] || '') + '</small></h3>';
      list.forEach(x => {
        h += '<button type="button" class="sbgr-topic" data-act="topic" data-id="' + esc(x.id) + '"><span class="t" dir="auto">' + esc(x.name) + (x.native && x.native !== x.name ? ' <span class="n">· ' + esc(x.native) + '</span>' : '') + '</span><span class="go">Learn →</span><span class="n"><span class="sbgr-chip l">' + x.lessons + ' lessons</span><span class="sbgr-chip e">' + num(x.exercises) + ' practice</span>' + classesOf(x).map(c => '<span class="sbgr-chip">Class ' + c + '</span>').join('') + ' <span class="sbgr-chip" style="background:#f1f5f9;color:#334155">' + esc(x.group) + '</span></span></button>';
      });
    });
    return h;
  }

  function eventHtml(ev, tr) {
    const alt = ev.t && ev.t.slice(1).filter(Boolean);
    const altHtml = tr && alt && alt.length ? alt.map(a => '<div class="sbgr-alt" dir="' + dirOf(a) + '">' + fmt(a) + '</div>').join('') : '';
    if (ev.k === 'h') return '<h4 dir="' + dirOf(ev.t[0]) + '">' + fmt(ev.t[0]) + '</h4>' + altHtml;
    if (ev.k === 'box') return '<span class="sbgr-box">' + esc(ev.t[0] || ev.kind) + '</span>';
    if (ev.k === 'p') return '<p dir="' + dirOf(ev.t[0]) + '">' + fmt(ev.t[0]) + '</p>' + altHtml;
    if (ev.k === 'ul') return '<ul>' + ev.t.map(x => '<li dir="' + dirOf(x) + '">' + fmt(x) + '</li>').join('') + '</ul>';
    if (ev.k === 'tbl') return '<table>' + ev.rows.map(r => '<tr>' + r.map(c => '<td dir="' + dirOf(c) + '">' + fmt(c) + '</td>').join('') + '</tr>').join('') + '</table>';
    return '';
  }
  function lessonHtml() {
    const F = FILES[S.lang], t = F.topics.find(x => x.id === S.topic); if (!t) { S.topic = null; return listHtml(); }
    const cls = [...new Set(t.lessons.map(x => x.c).concat(t.items.map(x => x.c)))].sort((a, b) => a - b);
    if (S.cls && !cls.includes(S.cls)) S.cls = 0;
    const lv = levelNames();
    let h = '<button type="button" class="sbgr-back" data-act="back">← All ' + esc(INDEX.langs[S.lang].name) + ' topics</button><section class="sbgr-hero"><h2 dir="auto">' + esc(t.name) + (t.native && t.native !== t.name ? ' · ' + esc(t.native) : '') + '</h2><p>Level ' + t.lvl + ' · ' + esc(lv[t.lvl] || '') + ' · ' + esc(t.group) + '</p></section>';
    h += '<div class="sbgr-tabs" role="group" aria-label="Class"><button type="button" class="sbgr-tab" data-act="cls" data-c="0" aria-pressed="' + (S.cls === 0) + '">All classes</button>' + cls.map(c => '<button type="button" class="sbgr-tab" data-act="cls" data-c="' + c + '" aria-pressed="' + (S.cls === c) + '">Class ' + c + '</button>').join('') + '</div>';
    h += '<div class="sbgr-tabs" role="group" aria-label="What to see"><button type="button" class="sbgr-tab" data-act="tab" data-t="lessons" aria-pressed="' + (S.tab === 'lessons') + '">📖 Lessons (' + t.lessons.length + ')</button><button type="button" class="sbgr-tab" data-act="tab" data-t="practice" aria-pressed="' + (S.tab === 'practice') + '">✍️ Practice (' + t.items.length + ')</button><label style="font-size:.85rem;display:inline-flex;gap:.3rem;align-items:center"><input type="checkbox" data-act="tr"' + (S.tr ? ' checked' : '') + '> Show the Urdu and Pashto lines</label></div>';
    const want = c => !S.cls || c === S.cls;
    if (S.tab === 'lessons') {
      const list = t.lessons.filter(x => want(x.c));
      if (!list.length) h += '<div class="sbgr-note">The books have no teaching text for this topic' + (S.cls ? ' in Class ' + S.cls : '') + '; they teach it through the practice questions. Open <b>Practice</b>.</div>';
      list.forEach((x, i) => {
        const sj = F.subjects[x.s], ch = sj && sj.chapters[x.u];
        h += '<article class="sbgr-lesson"><div class="sbgr-src"><span class="sbgr-chip">Class ' + x.c + '</span><span>' + esc(sj ? sj.name : x.s) + ' · ' + esc(x.ut) + ' · ' + esc(x.st) + '</span>' + (ch ? '<button type="button" data-act="open" data-s="' + esc(x.s) + '" data-call="' + esc(ch.o) + '">Open in the book</button>' : '') + '</div>' + x.ev.map(ev => eventHtml(ev, S.tr)).join('') + '</article>';
      });
    } else {
      const list = t.items.map((x, i) => ({x, i})).filter(o => want(o.x.c));
      if (!list.length) h += '<div class="sbgr-note">There are no practice questions for this topic' + (S.cls ? ' in Class ' + S.cls : '') + '.</div>';
      let last = 0;
      list.forEach(({x, i}) => {
        if (x.c !== last) { last = x.c; h += '<h3 class="sbgr-lvl">Class ' + x.c + '</h3>'; }
        const sj = F.subjects[x.s];
        h += '<div class="sbgr-q" data-i="' + i + '">' + (x.h ? '<div class="h" dir="' + dirOf(x.h) + '">' + fmt(x.h) + '</div>' : '') + '<div class="t" dir="' + dirOf(x.q[0]) + '">' + fmt(x.q[0]) + '</div>' +
          (S.tr ? x.q.slice(1).filter(Boolean).map(a => '<div class="sbgr-alt" dir="' + dirOf(a) + '">' + fmt(a) + '</div>').join('') : '');
        if (x.o) h += x.o.map((o, k) => '<label class="sbgr-opt" dir="' + dirOf(o) + '"><input type="radio" name="g' + i + '" data-act="pick" data-i="' + i + '" data-v="' + k + '"> <span><b>' + 'ABCDE'[k] + '.</b> ' + fmt(o) + '</span></label>').join('');
        else h += '<div style="margin-top:.3rem"><button type="button" class="sbgr-mini" data-act="show" data-i="' + i + '">Show the answer</button></div><div data-ans="' + i + '"></div>';
        h += '<div class="sbgr-src" style="margin-top:.3rem"><span>' + esc(sj ? sj.name : x.s) + (x.pg ? ' · p. ' + esc(x.pg) : '') + '</span></div></div>';
      });
    }
    return h;
  }
  function onClick(e) {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act;
    if (a === 'lang') { S.lang = b.dataset.l; S.topic = null; S.cls = 0; paint(); }
    else if (a === 'topic') { S.topic = b.dataset.id; S.cls = 0; S.tab = 'lessons'; loadLang(S.lang).then(() => { const t = FILES[S.lang].topics.find(x => x.id === S.topic); if (t && !t.lessons.length && t.items.length) S.tab = 'practice'; paint(); window.scrollTo(0, 0); }).catch(() => paint()); }
    else if (a === 'back') { S.topic = null; paint(); }
    else if (a === 'cls') { S.cls = +b.dataset.c; paint(); }
    else if (a === 'tab') { S.tab = b.dataset.t; paint(); }
    else if (a === 'tr') { S.tr = b.checked; paint(); }
    else if (a === 'open') openChapter(b.dataset.s, b.dataset.call);
    else if (a === 'show') { const t = FILES[S.lang].topics.find(x => x.id === S.topic), x = t.items[+b.dataset.i], box = document.querySelector('[data-ans="' + b.dataset.i + '"]'); if (box) box.innerHTML = '<div class="sbgr-ans" dir="' + dirOf(x.t || x.q[0]) + '">' + (x.t ? '<b>Answer:</b> ' + fmt(x.t) : '<i>The books give no written answer for this one' + (x.pg ? '; see textbook page ' + esc(x.pg) : '') + '.</i>') + '</div>'; }
    else if (a === 'pick') {
      const t = FILES[S.lang].topics.find(x => x.id === S.topic), x = t.items[+b.dataset.i], v = +b.dataset.v, card = b.closest('.sbgr-q');
      card.querySelectorAll('.sbgr-opt').forEach((o, k) => { o.classList.toggle('ok', k === x.a); o.classList.toggle('bad', k === v && v !== x.a); });
    }
  }
  function open(lang, topicId) { S.lang = lang || S.lang; S.topic = topicId || null; S.cls = 0; S.tab = 'lessons'; go(); }
  window.renderGrammarStats = function () { S.topic = null; render(); };
  window.SBGrammar = {renderPanel, open, page: window.renderGrammarStats, state: S};
})();
