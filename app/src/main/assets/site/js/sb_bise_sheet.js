/* sb_bise_sheet.js — "Open ▸" on a chapter of the BISE Board centre's weightage table (owner, 2026-11-02).
 *
 * Opens the chapter in the same sheet as the Study Plan (js/sb_study_sheet.js): the lesson parts of the book one at a time, and as the last part
 * "Board questions": as many MCQs, short and long questions as the Board's table of specification gives that chapter, and SLOs of the chapter.
 * Questions come from the books' question bank (content/testbank, js/sb_mastery.js) first; a kind the bank holds too few of for the chapter is
 * filled from the chapter's own text (js/sb_page_tabs.js genFor, the same generator as the page bar). "New questions" draws another random set,
 * 3 times per chapter on this device.
 *   SBBiseSheet.open({sid, classId, ch: {no, t, app, m, r, e, slos}, onBook()})
 * Public: window.SBBiseSheet. Used by js/sb_bise.js. */
(function () {
  'use strict';
  const MAX_NEW = 3, SLO_SHOW = 5;
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const fmt = t => { try { return window.MATH6_READER ? window.MATH6_READER.inline(String(t == null ? '' : t), false) : esc(t); } catch (e) { return esc(t); } };
  const shuffle = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const rng = seed => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const store = {
    get(k) { try { return +(localStorage.getItem(k) || 0); } catch (e) { return 0; } },
    set(k, v) { try { localStorage.setItem(k, String(v)); } catch (e) { /* private window: the count lasts this visit */ } }
  };

  const CSS = `
.sbb-set h4{margin:1rem 0 .4rem;font-size:1rem;color:#0c4a6e}
.sbb-q{margin:.5rem 0;padding:.65rem .8rem;border:1px solid #e2e8f0;border-radius:12px;background:#fff;line-height:1.6}
.sbb-q b.no{color:#0369a1;margin-inline-end:.35rem}
.sbb-opts{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.4rem}
.sbb-opt{font:inherit;padding:.35rem .7rem;border:2px solid #cbd5e1;border-radius:10px;background:#f8fafc;cursor:pointer}
.sbb-opt.right{border-color:#15803d;background:#dcfce7}.sbb-opt.wrong{border-color:#b91c1c;background:#fee2e2}
.sbb-q details{margin-top:.35rem}.sbb-q summary{cursor:pointer;color:#0369a1;font-weight:700}
.sbb-slo{margin:.3rem 0;padding:.45rem .7rem;border-inline-start:3px solid #7c3aed;background:#faf5ff;border-radius:0 8px 8px 0}
.sbb-bar{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem;margin:.4rem 0 .8rem}
.sbb-new{font:inherit;font-weight:800;padding:.5rem 1rem;border-radius:12px;border:2px solid #0284c7;background:#0284c7;color:#fff;cursor:pointer}
.sbb-new[disabled]{background:#94a3b8;border-color:#94a3b8;cursor:default}
.sbb-note{font-size:.85rem;color:#64748b}
.sbb-counts{display:flex;flex-wrap:wrap;gap:.4rem}.sbb-counts span{padding:.2rem .6rem;border-radius:99px;background:#e0f2fe;color:#075985;font-weight:700;font-size:.85rem}`;
  function addCss() { if (document.getElementById('sbb-css')) return; const s = document.createElement('style'); s.id = 'sbb-css'; s.textContent = CSS; document.head.appendChild(s); }

  // the book's unit index for the chapter number the Board's table links to
  function unitIndex(classId, sid, app) {
    const SS = window.SBStudySheet, bk = SS && SS.bookOf ? SS.bookOf(classId, sid) : null;
    if (!bk || !bk.units) return -1;
    const i = bk.units.findIndex(u => String(u.number != null ? u.number : u.num) === String(app));
    return i >= 0 ? i : Math.max(-1, Math.min(bk.units.length - 1, (+app || 1) - 1));
  }
  // questions of the chapter in the books' question bank: {mcq, sq, lq}
  function bankFor(classNum, sid, app) {
    const M = window.SBMastery;
    if (!M || !M.loadShard) return Promise.resolve({mcq: [], sq: [], lq: []});
    return M.loadShard(classNum).then(sh => {
      const chs = (sh.subjects[sid] && sh.subjects[sid].chapters) || [];
      const u = chs.findIndex(c => String(c).split(' ')[0] === String(app));
      const all = sh.items.filter(it => it.s === sid && it.u === u && u >= 0);
      const q = it => it.q2 && /[A-Za-z]/.test(it.q2) && !/[A-Za-z]{3}/.test(it.q) ? it.q2 : it.q;
      return {
        mcq: all.filter(it => it.y === 'mcq' && it.o && it.a != null).map(it => ({q: q(it), opts: it.o, a: it.a})),
        sq: all.filter(it => it.y === 'short').map(it => ({q: q(it), ans: it.a || it.e || ''})),
        lq: all.filter(it => it.y === 'long').map(it => ({q: q(it), ans: it.a || it.e || ''}))
      };
    }).catch(() => ({mcq: [], sq: [], lq: []}));
  }
  // questions made from the chapter's own text (the page bar's generator), for a kind the bank has too few of
  function fromText(parts) {
    const PT = window.SBPageTabs;
    if (!PT || !PT.genFor || !parts) return {mcq: [], sq: [], lq: []};
    const out = {mcq: [], sq: [], lq: []};
    parts.forEach(p => {
      try {
        const d = document.createElement('div'); d.innerHTML = p.html();
        const g = PT.genFor(d, 'en');
        out.mcq.push(...g.mcq.map(x => ({q: x.q, opts: x.opts, a: x.a}))); out.sq.push(...g.sq.map(x => ({q: x.q, ans: x.ans}))); out.lq.push(...g.lq.map(x => ({q: x.q, ans: x.ans})));
      } catch (e) { /* a part that cannot be read gives no questions */ }
    });
    return out;
  }

  function setHtml(o, pools, seed, left) {
    const r = rng(seed), ch = o.ch;
    // only MCQs are made from the chapter text (a sentence of the book with its key word as the answer); a made-up short or long question
    // reads badly, so those come from the books' bank only
    const real = x => String(x.q || '').replace(/\$[^$]*\$/g, 'x').replace(/[^A-Za-z؀-ۿ]+/g, ' ').trim().split(' ').length >= 4;
    const take = (kind, n) => {
      const bank = shuffle(pools.bank[kind].filter(real), r), gen = kind === 'mcq' && pools.gen ? shuffle(pools.gen.mcq, r) : [];
      return bank.concat(gen).slice(0, n);
    };
    const want = {mcq: +ch.m || 0, sq: +ch.r || 0, lq: +ch.e || 0};
    const set = {mcq: take('mcq', want.mcq), sq: take('sq', want.sq), lq: take('lq', want.lq)};
    const slos = shuffle((ch.slos || []).map(s => typeof s === 'string' ? s : (s && (s.t || s.text || s.en)) || '').filter(Boolean), r).slice(0, SLO_SHOW);
    let n = 0;
    const mcq = set.mcq.map(x => `<div class="sbb-q"><b class="no">${++n}.</b>${fmt(x.q)}<div class="sbb-opts">${x.opts.map((op, i) => `<button type="button" class="sbb-opt" data-ok="${i === x.a ? 1 : 0}">${String.fromCharCode(65 + i)}) ${fmt(op)}</button>`).join('')}</div></div>`).join('');
    const written = list => list.map(x => `<div class="sbb-q"><b class="no">${++n}.</b>${fmt(x.q)}${x.ans ? `<details><summary>Answer</summary><div>${fmt(x.ans)}</div></details>` : ''}</div>`).join('');
    const short = written(set.sq), long = written(set.lq);
    const missing = ['mcq', 'sq', 'lq'].filter(k => set[k].length < want[k]);
    return `<div class="sbb-set">
      <div class="sbb-counts"><span>MCQ ${want.mcq}</span><span>Short ${want.sq}</span><span>Long ${want.lq}</span><span>SLOs ${(ch.slos || []).length}</span>${ch.w != null ? `<span>Weightage ${esc(ch.w)}%</span>` : ''}</div>
      <div class="sbb-bar"><button type="button" class="sbb-new" data-sbb="new"${left > 0 ? '' : ' disabled'}>🔀 New questions${left > 0 ? ` (${left} left)` : ''}</button><span class="sbb-note">The Board's numbers for this chapter; ${left > 0 ? 'press for another random set.' : 'no more new sets for this chapter.'}</span></div>
      ${set.mcq.length ? `<h4>MCQs</h4>${mcq}` : ''}${set.sq.length ? `<h4>Short questions</h4>${short}` : ''}${set.lq.length ? `<h4>Long questions</h4>${long}` : ''}
      ${slos.length ? `<h4>SLOs of this chapter</h4>${slos.map(s => `<div class="sbb-slo">${fmt(s)}</div>`).join('')}` : ''}
      ${missing.length ? `<p class="sbb-note">The books hold fewer ${missing.map(k => ({mcq: 'MCQs', sq: 'short questions', lq: 'long questions'})[k]).join(' and ')} for this chapter than the Board asks; all there are are shown.</p>` : ''}
    </div>`;
  }

  function open(o) {
    addCss();
    const SS = window.SBStudySheet;
    if (!SS || !SS.open || !o || !o.ch) return false;
    const classNum = +String(o.classId).replace(/\D/g, '');
    const ui = unitIndex(o.classId, o.sid, o.ch.app);
    let parts = null;
    if (ui >= 0 && SS.lessonCount) { const L = SS.lessonCount(o.classId, o.sid, ui); if (L) { try { parts = SS.partsFor(o.classId, o.sid, ui, 1, L, L); } catch (e) { parts = null; } } }
    const key = 'sbBiseNew:' + o.sid + ':' + o.ch.app;
    const pools = {bank: {mcq: [], sq: [], lq: []}, gen: null};
    let seed = (Date.now() & 0x7fffffff) || 1, box = null;
    const paint = () => { if (box && box.isConnected) box.innerHTML = setHtml(o, pools, seed, MAX_NEW - store.get(key)); };
    const board = {no: (parts ? parts.length : 0) + 1, title: 'Board questions', titleUr: '', html: () => {
      if (!pools.gen) pools.gen = fromText(parts);
      return '<div class="sbb-host"><p class="sbb-note">Loading the questions…</p></div>';
    }};
    const all = (parts || []).concat([board]);
    const ok = SS.open({
      title: 'Class ' + classNum + ' · ' + (o.subject || '') + ' · Ch ' + o.ch.no + ' ' + (o.ch.t || ''),
      sub: 'BISE Swat: ' + (o.ch.m || 0) + ' MCQ · ' + (o.ch.r || 0) + ' short · ' + (o.ch.e || 0) + ' long · ' + ((o.ch.slos || []).length) + ' SLOs',
      parts: all, start: 0,
      onRead: () => {}, onFinish: () => SS.close(),
      onOpenBook: o.onBook || null
    });
    if (!ok) return false;
    // the board part is drawn by the sheet; fill it when it is on screen, and answer its buttons
    const fill = () => {
      const host = document.querySelector('#sbss .sbb-host');
      if (!host || host === box) return;
      box = host;
      bankFor(classNum, o.sid, o.ch.app).then(b => { pools.bank = b; paint(); });
    };
    const mo = new MutationObserver(fill);
    const sheet = document.getElementById('sbss');
    if (sheet) mo.observe(sheet, {childList: true, subtree: true});
    fill();
    const onClick = e => {
      const t = e.target.closest && e.target.closest('.sbb-new, .sbb-opt');
      if (!t || !t.closest('#sbss')) return;
      if (t.matches('.sbb-new')) {
        if (store.get(key) >= MAX_NEW) return;
        store.set(key, store.get(key) + 1); seed = (seed * 31 + 7) >>> 0 || 1; paint();
      } else if (!t.parentNode.dataset.done) {
        t.parentNode.dataset.done = '1';
        t.classList.add(t.dataset.ok === '1' ? 'right' : 'wrong');
        if (t.dataset.ok !== '1') { const right = t.parentNode.querySelector('[data-ok="1"]'); if (right) right.classList.add('right'); }
      }
    };
    document.addEventListener('click', onClick);
    const stop = setInterval(() => { if (!document.getElementById('sbss')) { mo.disconnect(); document.removeEventListener('click', onClick); clearInterval(stop); } }, 1000);
    return true;
  }

  window.SBBiseSheet = {open};
})();
