/* SBSearch (Phase 12): search inside the books, offline.
 *
 * What it adds to the header search box: under the title matches, an "In the books" list of chapters whose TEXT contains every word typed
 * (the last word may be unfinished). It works from small index files (content/search/<subject>.json, built from what each chapter shows by
 * tools/build/make_search.js) so no book is loaded to search, and a subject's index is part of its "Download for offline" package.
 *
 *   Scope      the subject being read and the subjects downloaded for offline (js/core/offline.js). "Search all classes" fetches every
 *              index one after the other (a few MB) and keeps only the best results, so memory stays flat.
 *   Words      one normaliser for the index and the query (Latin: case, accents, simple plurals; Arabic script: Urdu / Pashto / Arabic letter
 *              variants, vowel marks, tatweel, digits), so "\u06a9\u062a\u0627\u0628", "\u0643\u062a\u0627\u0628" and "\u06a9\u0650\u062a\u0627\u0628" are the same word.
 *   Privacy    nothing is sent anywhere: the query never leaves the page; only static files of this site are fetched.
 *
 * node: require('./search.js') gives { normalize, tokens, stem, makeShard, searchShard } (used by the index builder and the tests). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(null);
  else root.SBSearch = factory(root);
})(typeof self !== 'undefined' ? self : this, function (win) {
  'use strict';

  // ------------------------------------------------------------------ words
  const MARKS = /[\u0300-\u036f\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0640]/g;   // accents, vowel marks, Quranic signs, tatweel
  const INVISIBLE = /[\u200b\u200d-\u200f\u202a-\u202e\u2066-\u2069\ufeff\u00ad]/g;
  const FOLD = {
    '\u064a': '\u06cc', '\u0649': '\u06cc', '\u06d0': '\u06cc', '\u06cd': '\u06cc', '\u06d2': '\u06cc',     // yeh variants (Arabic, alef maksura, Pashto, Urdu bari ye) -> Farsi/Urdu yeh
    '\u0643': '\u06a9', '\u06aa': '\u06a9',                                                                // kaf variants -> Urdu kaf
    '\u0629': '\u06c1', '\u0647': '\u06c1', '\u06be': '\u06c1', '\u06d5': '\u06c1',                          // heh variants, teh marbuta -> Urdu heh
    '\u06ab': '\u06af',                                                                                     // Pashto gaf -> gaf
    '\u0671': '\u0627',                                                                                     // alef wasla -> alef
  };
  const FOLDRE = /[\u064a\u0649\u06d0\u06cd\u06d2\u0643\u06aa\u0629\u0647\u06be\u06d5\u06ab\u0671]/g;
  const DIGITS = /[\u0660-\u0669\u06f0-\u06f9]/g;

  function normalize(s) {
    s = String(s == null ? '' : s).normalize('NFKD').toLowerCase();                       // NFKD: hamza forms become letter + mark, presentation forms become letters
    s = s.replace(MARKS, '').replace(INVISIBLE, '').replace(/\u200c/g, ' ');
    s = s.replace(FOLDRE, c => FOLD[c]);
    s = s.replace(DIGITS, d => String((d.charCodeAt(0) & 0xf)));                           // both digit blocks end in the digit's value in the low nibble
    return s;
  }
  // Latin plurals: studies -> study, boxes -> box, cells -> cell (leaves -ss, -us, -is alone). Applied to index and query alike.
  function stem(w) {
    if (w.length < 4 || !/^[a-z]+$/.test(w)) return w;
    if (/ies$/.test(w) && w.length > 4) return w.slice(0, -3) + 'y';
    if (/(ches|shes|xes|zes|sses)$/.test(w)) return w.slice(0, -2);
    if (/s$/.test(w) && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);
    return w;
  }
  const SPLIT = /[^\p{L}\p{N}]+/u;
  function tokens(text) {
    const out = [];
    for (const w of normalize(text).split(SPLIT)) {
      if (w.length < 2 || w.length > 40) continue;
      if (/^\d+$/.test(w) && w.length > 6) continue;                                      // long numbers (ids, page tables) are noise
      out.push(stem(w));
    }
    return out;
  }

  // ------------------------------------------------------------------ a subject's index
  // chapters: [{ title, text }] -> { v, n, x: { term: [chapter, count, chapter, count, ...] } }. Title words count three times.
  const MAX_POSTINGS = 24;                                                                 // a word in nearly every chapter keeps its 24 best
  function makeShard(chapters) {
    const per = new Map();                                                                  // term -> Map(chapter -> count)
    chapters.forEach((ch, i) => {
      const add = (list, w) => { for (const t of list) { let m = per.get(t); if (!m) per.set(t, m = new Map()); m.set(i, (m.get(i) || 0) + w); } };
      add(tokens(ch.text), 1);
      add(tokens(ch.title), 3);
    });
    const x = {};
    for (const t of [...per.keys()].sort()) {
      const m = per.get(t);
      let entries = [...m.entries()];
      if (entries.length === 1 && entries[0][1] === 1 && t.length > 24) continue;          // a single long odd token
      if (entries.length > MAX_POSTINGS) entries = entries.sort((a, b) => b[1] - a[1] || a[0] - b[0]).slice(0, MAX_POSTINGS);
      entries.sort((a, b) => a[0] - b[0]);
      x[t] = entries.flat();
    }
    return { v: 1, n: chapters.length, x };
  }

  // sorted term list of a loaded shard (built once)
  function prepare(shard) {
    if (!shard._terms) Object.defineProperty(shard, '_terms', { value: Object.keys(shard.x).sort(), enumerable: false });
    return shard._terms;
  }
  function lowerBound(arr, p) { let lo = 0, hi = arr.length; while (lo < hi) { const mid = (lo + hi) >> 1; if (arr[mid] < p) lo = mid + 1; else hi = mid; } return lo; }
  function expand(shard, token, prefix) {
    const terms = prepare(shard), out = [];
    if (Object.prototype.hasOwnProperty.call(shard.x, token)) out.push([token, 1]);
    if (prefix || !out.length) {
      let i = lowerBound(terms, token), seen = 0;
      for (; i < terms.length && terms[i].startsWith(token) && seen < 40; i++, seen++) if (terms[i] !== token) out.push([terms[i], 0.6]);
    }
    return out;
  }

  // AND over the query words (the last one may be a prefix); -> [{ chapter, score, hits }] best first
  function searchShard(shard, qTokens, limit) {
    if (!shard || !shard.x || !qTokens.length) return [];
    let acc = null;
    qTokens.forEach((tok, qi) => {
      const here = new Map();
      for (const [term, weight] of expand(shard, tok, qi === qTokens.length - 1)) {
        const p = shard.x[term];
        for (let k = 0; k < p.length; k += 2) {
          const cur = here.get(p[k]) || { s: 0, h: 0 };
          cur.s = Math.max(cur.s, Math.log2(1 + p[k + 1]) * weight); cur.h += p[k + 1];     // the best form of this word counts once
          here.set(p[k], cur);
        }
      }
      if (acc === null) acc = here;
      else { const next = new Map(); for (const [ch, v] of here) { const a = acc.get(ch); if (a) next.set(ch, { s: a.s + v.s, h: a.h + v.h }); } acc = next; }
    });
    return [...acc.entries()].map(([chapter, v]) => ({ chapter, score: v.s, hits: v.h })).sort((a, b) => b.score - a.score || a.chapter - b.chapter).slice(0, limit || 5);
  }

  const api = { normalize, tokens, stem, makeShard, searchShard };
  if (!win || !win.document) return api;

  // ------------------------------------------------------------------ in the page
  const doc = win.document;
  const BASE = 'content/search/';
  const MAX_RESULTS = 10, KEEP = 8;
  let index = null, indexPromise = null, current = null, seq = 0, timer = 0, scopeAll = false;
  const shards = new Map();                                                                  // id -> shard (the most recent few)

  function getJson(url) { return win.fetch(url).then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json(); }); }
  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (!indexPromise) indexPromise = getJson(BASE + 'index.json').then(j => { index = j; return j; }, e => { indexPromise = null; throw e; });
    return indexPromise;
  }
  function loadShard(id, keep) {
    if (shards.has(id)) { const s = shards.get(id); shards.delete(id); shards.set(id, s); return Promise.resolve(s); }
    const meta = index && index.subjects[id];
    if (!meta) return Promise.resolve(null);
    return getJson(BASE + id + '.json?v=' + meta.h).then(s => {
      if (keep !== false) { shards.set(id, s); while (shards.size > KEEP) shards.delete(shards.keys().next().value); }
      return s;
    }, () => null);
  }
  function downloaded() {
    try { const d = win.SBOffline && win.SBOffline.downloaded && win.SBOffline.downloaded(); return Promise.resolve(d).then(x => Object.keys(x || {}), () => []); } catch (e) { return Promise.resolve([]); }
  }

  // search the subjects in `ids`; onProgress(done, total) for the long case. -> [{ id, chapter, score, hits }]
  async function searchSubjects(q, ids, onProgress, isStale) {
    const qt = tokens(q);
    if (!qt.length) return [];
    await loadIndex();
    const out = [], keep = ids.length <= KEEP, step = keep ? 1 : 4;                          // the whole library: four files at a time, none kept
    let done = 0;
    for (let i = 0; i < ids.length; i += step) {
      if (isStale && isStale()) return out;
      const group = ids.slice(i, i + step);
      const loaded = await Promise.all(group.map(id => loadShard(id, keep)));
      loaded.forEach((shard, k) => { if (shard) for (const r of searchShard(shard, qt, 5)) out.push({ id: group[k], chapter: r.chapter, score: r.score, hits: r.hits }); });
      done += group.length;
      if (onProgress) onProgress(done, ids.length);
    }
    return out.sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS);
  }

  // ---- header search box
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const dropdown = () => doc.getElementById('searchResultsDropdown');
  let lastResults = [];

  function section(dd) {
    let sec = dd.querySelector(':scope > .sb-ft');
    if (!sec) { sec = doc.createElement('div'); sec.className = 'sb-ft'; sec.setAttribute('role', 'group'); sec.setAttribute('aria-label', 'Matches inside the books'); dd.appendChild(sec); }
    return sec;
  }
  function names(id) {
    const m = index && index.subjects[id] || {};
    const classes = (typeof DATA !== 'undefined' && DATA && DATA.classes) || (win.DATA && win.DATA.classes) || [];       // DATA is a top-level const of data.js: a global name, not a property of window
    const cls = classes.find(c => c.id === m.classId);
    return { cls: cls ? cls.name : (m.classId || ''), subject: m.name || id };
  }
  function render(dd, results, note) {
    const sec = section(dd);
    if (!results.length && !note) { sec.remove(); return; }
    const nores = dd.querySelector(':scope > div:not(.sb-ft)');
    if (results.length && dd.children.length === 2 && nores && /No results found/.test(nores.textContent)) nores.remove();    // the title search found nothing, the books did
    lastResults = results;
    sec.innerHTML = '<div class="sb-ft-head">IN THE BOOKS</div>' +
      results.map((r, i) => {
        const n = names(r.id), ch = index.subjects[r.id].c ? index.subjects[r.id].c[r.chapter] : null;
        return '<button type="button" class="sb-ft-row" data-ft="' + i + '"><span class="sb-ft-t" dir="auto">' + esc(r.title || (ch && ch.t) || n.subject) + '</span>' +
          '<span class="sb-ft-s">' + esc(n.cls + ' · ' + n.subject + ' · ' + r.hits + (r.hits === 1 ? ' match' : ' matches')) + '</span></button>';
      }).join('') + (note ? '<div class="sb-ft-note">' + note + '</div>' : '');
  }

  async function run(q, mine) {
    const dd = dropdown();
    if (!dd || dd.style.display === 'none') return;
    const stale = () => mine !== seq;
    try {
      await loadIndex();
      let ids;
      if (scopeAll) ids = Object.keys(index.subjects);
      else {
        const have = await downloaded();
        ids = [...new Set([current].concat(have).filter(id => id && index.subjects[id]))];
      }
      if (stale()) return;
      if (!ids.length) { render(dd, [], 'Open a book, or download books for offline (the ⬇ button), to search inside them. <button type="button" class="sb-ft-all">Search all classes</button>'); return; }
      const results = await searchSubjects(q, ids, scopeAll ? (d, t) => { if (!stale() && d % 8 === 0 && d < t) section(dd).innerHTML = '<div class="sb-ft-note">Searching ' + d + ' of ' + t + ' books…</div>'; } : null, stale);
      if (stale()) return;
      const withTitle = results.map(r => { const m = index.subjects[r.id]; return Object.assign({}, r, { title: m.c && m.c[r.chapter] ? m.c[r.chapter].t : '' }); });
      const where = scopeAll ? 'all classes' : (ids.length === 1 ? '1 book' : ids.length + ' books');
      render(dd, withTitle, withTitle.length ? (scopeAll ? '' : 'Searched ' + where + '. <button type="button" class="sb-ft-all">Search all classes</button>') : 'Nothing in ' + where + (scopeAll ? '' : '. <button type="button" class="sb-ft-all">Search all classes</button>'));
    } catch (e) {
      if (!stale()) { const sec = section(dd); sec.innerHTML = '<div class="sb-ft-note">Searching inside the books needs the search files (not found).</div>'; }
    }
  }

  function openResult(i) {
    const r = lastResults[i]; if (!r) return;
    const ch = index.subjects[r.id].c && index.subjects[r.id].c[r.chapter];
    const meta = index.subjects[r.id];
    if (typeof win.clearGlobalSearch === 'function') win.clearGlobalSearch();
    win.openSubject(meta.classId, r.id);
    if (ch && ch.o) {                                                                        // the chapter list of the subject is on screen: use its own button
      const btn = [...doc.querySelectorAll('[onclick]')].find(e => e.getAttribute('onclick') === ch.o);
      if (btn) btn.click();
    }
  }

  function init() {
    const dd = dropdown();
    if (win.SBHooks && typeof win.handleGlobalSearch === 'function') {
      win.SBHooks.use('handleGlobalSearch', next => function (q) {
        const r = next.apply(this, arguments);
        const mine = ++seq;
        win.clearTimeout(timer);
        if (tokens(q).length && String(q).trim().length >= 3) timer = win.setTimeout(() => { run(String(q), mine); }, 250);
        else if (dropdown()) { const s = dropdown().querySelector(':scope > .sb-ft'); if (s) s.remove(); }
        return r;
      }, { id: 'search.js' });
    }
    if (win.SBHooks && typeof win.openSubject === 'function') {
      win.SBHooks.use('openSubject', next => function (classId, subjId) { current = subjId; return next.apply(this, arguments); }, { id: 'search.js' });
    }
    if (dd) {
      dd.addEventListener('click', e => {
        const row = e.target.closest && e.target.closest('[data-ft]');
        if (row) { e.preventDefault(); e.stopPropagation(); openResult(+row.getAttribute('data-ft')); return; }
        if (e.target.closest && e.target.closest('.sb-ft-all')) { e.preventDefault(); e.stopPropagation(); scopeAll = true; const inp = doc.getElementById('globalHubSearch'); run(inp ? inp.value : '', ++seq); }
      });
    }
    const inp = doc.getElementById('globalHubSearch');
    if (inp && !inp.hasAttribute('aria-label')) inp.setAttribute('aria-label', 'Search subjects, chapters and the text of the books');
  }
  api.init = init;
  api._state = { get index() { return index; }, shards };
  api.searchSubjects = searchSubjects;
  api.loadIndex = loadIndex;
  api.scope = v => { scopeAll = !!v; };
  if (win === (typeof self !== 'undefined' ? self : null)) init();
  return api;
});
