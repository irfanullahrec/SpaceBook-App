/* SBAccess: what this person may use, and the gates that apply it. One module for the website and the Android app's web pages, so a plan
 * bought once behaves the same everywhere. The SERVER decides (api/lib/billing.php through api/v2/entitlements.php and api/billing.php); this file
 * asks, remembers the last answer, and shows the purchase window when a limit is reached.
 *
 *   Free for everyone:  Chapter 1 of every subject, 50 Test Preparation questions, 50 Study Plan questions, 1 paper.
 *   Paid (PKR 500 a month each):  Student plan (one class + its Study Plan), Teacher plan (up to 10 subjects + papers), Test Preparation module.
 *
 * Public API (window.SBAccess):
 *   state() / access() / free(metric)        the last answer from the server (or the cache while offline)
 *   canRead(cls, subject, chapterIdx)        Chapter 1 (index 0) is always open; later chapters need a plan that covers the class or the subject
 *   unlimited(metric, ctx)                   metric: prep_q | plan_q | paper;   ctx: {cls, subject}
 *   useQuestion(metric, key, ctx)            Promise<{allowed, unlimited, used, limit}>; spends the free allowance ON THE SERVER; offline it counts here and sends later
 *   paywall(why, ctx)                        opens the purchase window (js/sb_billing.js) and tells the dashboard it was shown
 *   ping(module, ctx)                        a usage number for the management dashboard (no personal data)
 *   load()                                   ask the server now (on start, at every sign-in); a failed request keeps the last answer
 *   on(fn)                                   called with the new state after every successful load
 * Tests: tests/access/unit.js (Node), tests/access/browser.js (a real Chrome). The rule cases shared with the app: tests/access/contract.json. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.SBAccess = factory().create({}); root.SBAccess.start(); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const KEY = 'sb_access_v1', KEY_VID = 'sb_vid', KEY_LOCAL = 'sb_free_local';
  const FREE_CHAPTERS = 1;
  const LIMITS = { prep_q: 50, plan_q: 50, paper: 1 };

  function freshState() {
    return { ok: true, signedIn: false, plan: 'free', access: { readClasses: [], readSubjects: [], planClasses: [], paperSubjects: [], prep: false },
      free: { chapters: FREE_CHAPTERS, prep_q: { limit: 50, used: 0 }, plan_q: { limit: 50, used: 0 }, paper: { limit: 1, used: 0 } }, subscriptions: [], pendingPayments: 0 };
  }

  function create(opts) {
    opts = opts || {};
    const g = typeof self !== 'undefined' ? self : {};
    const doFetch = opts.fetch || ((u, o) => g.fetch(u, o));
    const now = opts.now || (() => Date.now());
    let ls = null;
    try { ls = opts.storage !== undefined ? opts.storage : g.localStorage; } catch (e) { ls = null; }
    const rd = k => { try { return ls ? ls.getItem(k) : null; } catch (e) { return null; } };
    const wr = (k, v) => { try { if (ls) ls.setItem(k, v); } catch (e) { /* storage full or blocked: the server still counts */ } };
    const listeners = [];
    let fresh = false;                 // true once the server answered in this page session
    let st = freshState();
    try { const c = JSON.parse(rd(KEY) || 'null'); if (c && c.ok) st = Object.assign(freshState(), c); } catch (e) { /* unreadable: start as the free tier */ }
    let localKeys = {};                // free allowance spent while the server could not be reached: {metric: {key: 1}}
    try { localKeys = JSON.parse(rd(KEY_LOCAL) || '{}') || {}; } catch (e) { localKeys = {}; }

    function visitorId() {
      if (opts.visitorId) return opts.visitorId;
      try { if (g.SBHost && typeof g.SBHost.visitorId === 'function') { const v = String(g.SBHost.visitorId() || ''); if (/^[0-9a-f]{32}$/.test(v)) { wr(KEY_VID, v); return v; } } } catch (e) { /* no bridge */ }
      let v = rd(KEY_VID);
      if (!/^[0-9a-f]{32}$/.test(v || '')) {
        const b = new Uint8Array(16);
        try { (g.crypto || {}).getRandomValues(b); } catch (e) { for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256); }
        v = Array.prototype.map.call(b, x => ('0' + x.toString(16)).slice(-2)).join('');
        wr(KEY_VID, v);
      }
      return v;
    }
    const isApp = () => !!(g.SBHost || (g.document && g.document.documentElement && g.document.documentElement.classList.contains('sbapp')));
    function headers(extra) {
      let h = {};
      try { h = Object.assign(h, opts.headers ? opts.headers() : (g.SBSync && g.SBSync.bearerHeaders ? g.SBSync.bearerHeaders() : {})); } catch (e) { /* no device token */ }
      h['X-SB-Visitor'] = visitorId();
      if (isApp()) h['X-SB-Platform'] = 'app';
      return Object.assign(h, extra || {});
    }
    const base = opts.base || 'api/';

    async function call(path, o, timeoutMs) {
      const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = ctl && timeoutMs ? setTimeout(() => ctl.abort(), timeoutMs) : null;
      try {
        const res = await doFetch(base + path, Object.assign({ credentials: 'same-origin', signal: ctl ? ctl.signal : undefined }, o));
        const j = await res.json();
        return { status: res.status, json: j };
      } finally { if (timer) clearTimeout(timer); }
    }

    // -------- the answer
    async function load() {
      try {
        const r = await call('v2/entitlements.php', { headers: headers() }, 8000);
        if (r.json && r.json.ok) {
          st = Object.assign(freshState(), r.json);
          fresh = true;
          wr(KEY, JSON.stringify(st));
          flushPending();
          listeners.forEach(fn => { try { fn(st); } catch (e) { /* a listener must not break the others */ } });
        }
      } catch (e) { /* offline or not JSON: keep the last answer */ }
      return st;
    }

    // While offline the paid access is worked out again from the saved subscriptions with this device's clock, so a paid answer never outlives its end date.
    function access() {
      if (fresh || !st.subscriptions || !st.subscriptions.length) return st.access;
      const acc = { readClasses: [], readSubjects: [], planClasses: [], paperSubjects: [], prep: false };
      const t = now();
      st.subscriptions.forEach(s => {
        if (s.status !== 'active' || Date.parse(s.expiresAt) <= t) return;
        if (s.planType === 'student' && s.classId) { acc.readClasses.push(s.classId); acc.planClasses.push(s.classId); }
        else if (s.planType === 'teacher') (s.subjects || []).forEach(x => { acc.readSubjects.push(x.id); acc.paperSubjects.push(x.id); });
        else if (s.planType === 'prep') acc.prep = true;
      });
      return acc;
    }

    // The one chapter rule (the server has the same: sb_can_read in api/lib/billing.php; tests/access/contract.json)
    function canRead(cls, subject, idx) {
      const a = access();
      return (idx | 0) < FREE_CHAPTERS || a.readClasses.indexOf(cls) >= 0 || a.readSubjects.indexOf(subject) >= 0;
    }
    function unlimited(metric, ctx) {
      const a = access(); ctx = ctx || {};
      if (metric === 'prep_q') return !!a.prep;
      if (metric === 'plan_q') return !!ctx.cls && a.planClasses.indexOf(ctx.cls) >= 0;
      if (metric === 'paper') return !!ctx.subject && a.paperSubjects.indexOf(ctx.subject) >= 0;
      return false;
    }
    function free(metric) {
      const f = (st.free && st.free[metric]) || { limit: LIMITS[metric] || 0, used: 0 };
      const local = Object.keys(localKeys[metric] || {}).length;
      return { limit: f.limit, used: Math.min(f.limit, Math.max(f.used, f.used + local)) };
    }

    // -------- spending the free allowance
    function pendingList() { return localKeys; }
    function saveLocal() { wr(KEY_LOCAL, JSON.stringify(localKeys)); }
    async function flushPending() {
      const metrics = Object.keys(localKeys);
      for (const m of metrics) {
        const keys = Object.keys(localKeys[m] || {});
        for (const k of keys) {
          try {
            const r = await call('billing.php?action=consume', { method: 'POST', headers: headers({ 'Content-Type': 'application/json' }), body: JSON.stringify({ metric: m, key: k }) }, 6000);
            if (!r.json || !r.json.ok) return;
            delete localKeys[m][k];
            if (st.free && st.free[m] && r.json.used != null) st.free[m].used = r.json.used;
          } catch (e) { return; }
        }
        if (!Object.keys(localKeys[m] || {}).length) delete localKeys[m];
      }
      saveLocal();
    }

    async function useQuestion(metric, key, ctx) {
      ctx = ctx || {};
      if (unlimited(metric, ctx)) { ping(metric === 'prep_q' ? 'testprep' : metric === 'plan_q' ? 'studyplan' : 'papers', ctx); return { allowed: true, unlimited: true }; }
      try {
        const r = await call('billing.php?action=consume', { method: 'POST', headers: headers({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ metric: metric, key: String(key), cls: ctx.cls || '', subject: ctx.subject || '' }) }, 6000);
        const j = r.json;
        if (j && j.ok) {
          if (st.free && st.free[metric]) { st.free[metric].used = j.used; if (j.limit) st.free[metric].limit = j.limit; wr(KEY, JSON.stringify(st)); }
          if (j.unlimited) { load(); return { allowed: true, unlimited: true }; }   // a plan was approved meanwhile: refresh the state
          if (localKeys[metric]) { delete localKeys[metric][String(key)]; saveLocal(); }
          return { allowed: !!j.allowed, unlimited: false, used: j.used, limit: j.limit, reason: j.reason };
        }
      } catch (e) { /* offline: count on this device and tell the server later */ }
      const f = free(metric);
      const had = !!(localKeys[metric] && localKeys[metric][String(key)]);
      if (!had && f.used >= f.limit) return { allowed: false, unlimited: false, used: f.used, limit: f.limit, reason: 'limit' };
      if (!had) { (localKeys[metric] = localKeys[metric] || {})[String(key)] = 1; saveLocal(); }
      return { allowed: true, unlimited: false, used: f.used + (had ? 0 : 1), limit: f.limit, offline: true };
    }

    // -------- usage numbers and the purchase window
    const seen = {};
    function ping(module, ctx) {
      ctx = ctx || {};
      const k = module + '|' + (ctx.cls || '') + '|' + (ctx.subject || '');
      const t = now();
      if (seen[k] && t - seen[k] < 60000) return;
      seen[k] = t;
      try { call('billing.php?action=ping', { method: 'POST', headers: headers({ 'Content-Type': 'application/json' }), body: JSON.stringify({ module: module, cls: ctx.cls || '', subject: ctx.subject || '' }) }, 4000).catch(() => {}); } catch (e) { /* the dashboard number is optional */ }
    }
    function paywall(why, ctx) {
      try { call('billing.php?action=ping', { method: 'POST', headers: headers({ 'Content-Type': 'application/json' }), body: JSON.stringify({ event: 'prompt', metric: why }) }, 4000).catch(() => {}); } catch (e) { /* optional */ }
      const B = g.SBBilling;
      if (B && B.open) B.open(Object.assign({ why: why }, ctx || {}));
      return false;
    }

    function start(env) {
      env = env || {};
      const d = env.document || (typeof document !== 'undefined' ? document : null);
      if (d && d.addEventListener) d.addEventListener('spacebook:auth', () => { load(); });
      if (!opts.noAutoload && typeof g.fetch === 'function') load();
    }
    return { state: () => st, access, canRead, unlimited, free, useQuestion, paywall, ping, load, start, on: fn => { listeners.push(fn); }, visitorId,
      headers, call, pending: pendingList, _setState: (s, isFresh) => { st = Object.assign(freshState(), s); fresh = isFresh !== false; } };
  }

  return { create, FREE_CHAPTERS, LIMITS };
});

/* ------------------------------------------------------------------ the gates in the page (browser only)
 * Chapter 2 and later, the first paper, the 51st Test Preparation / Study Plan question. Each gate asks SBAccess, which asks the server. */
(function () {
  'use strict';
  if (typeof window === 'undefined' || !window.SBAccess || typeof SBHooks === 'undefined') return;
  const A = window.SBAccess;
  let cur = null;                                                    // the subject open now: {classId, subjId}

  function lockHtml(info) {
    const cls = info.classId || '', what = info.title ? '“' + info.title + '”' : 'this chapter';
    return '<div class="sbx-lock" role="region" aria-label="Locked chapter"><div class="sbx-lock-icon" aria-hidden="true">🔒</div>' +
      '<h2>Chapter ' + (info.idx + 1) + ' needs a plan</h2>' +
      '<p>Chapter 1 of every subject is free. To read ' + what + ' and the other chapters, choose a plan for ' + (info.className || 'this class') + '.</p>' +
      '<div class="sbx-lock-actions"><button type="button" class="sbx-btn sbx-btn-main" data-sbx="plans">See plans · from PKR 500 / month</button>' +
      '<button type="button" class="sbx-btn" data-sbx="back">Back to Chapter 1</button></div></div>';
  }
  function classNameOf(id) { try { const c = DATA.classes.find(x => x.id === id); return c ? c.name : ''; } catch (e) { return ''; } }
  function showLock(area, info, back) {
    area.innerHTML = lockHtml(info);
    area.querySelector('[data-sbx="plans"]').addEventListener('click', () => { A.paywall('chapter', { cls: info.classId, subject: info.subjId }); });
    area.querySelector('[data-sbx="back"]').addEventListener('click', back);
    A.ping('reading', { cls: info.classId, subject: info.subjId });
  }
  // a small lock on every chapter button after Chapter 1 that is not open to this person
  function decorate(classId, subjId) {
    try {
      document.querySelectorAll('.math-ch-list .math-ch-btn').forEach((b, i) => {
        const locked = i >= 1 && !A.canRead(classId, subjId, i);
        b.classList.toggle('sbx-locked', locked);
        let tag = b.querySelector('.sbx-tag');
        if (locked && !tag) { tag = document.createElement('span'); tag.className = 'sbx-tag'; tag.setAttribute('aria-label', 'needs a plan'); tag.textContent = '🔒'; b.appendChild(tag); }
        else if (!locked && tag) tag.remove();
      });
    } catch (e) { /* decoration only */ }
  }
  const subjFor = (classId, subjKey, subjObj) => {
    if (subjObj && subjObj.id) return subjObj.id;
    if (cur && cur.classId === classId && cur.subjId) return cur.subjId;
    return classId + '-' + subjKey;
  };

  SBHooks.use('openSubject', function (next) { return function (classId, subjId) { cur = { classId: classId, subjId: subjId }; return next.apply(this, arguments); }; }, { id: 'sb_access.js' });

  SBHooks.use('renderSubjectChapterView', function (next) { return function (subjKey, chIdx, classId, subjObj) {
    const subjId = subjFor(classId, subjKey, subjObj);
    A.ping('reading', { cls: classId, subject: subjId });
    if ((chIdx | 0) >= 1 && !A.canRead(classId, subjId, chIdx | 0)) {
      const area = document.getElementById('subjectTopicArea');
      if (area) {
        let title = ''; try { const ch = (getSubjectChapterList(subjKey, classId) || [])[chIdx]; title = ch && (ch.title || ch.name) || ''; } catch (e) { /* no title */ }
        showLock(area, { idx: chIdx | 0, classId: classId, subjId: subjId, className: classNameOf(classId), title: title }, () => { try { selectSubjectChapter(subjKey, 0, classId); } catch (e) { /* page changed */ } });
        decorate(classId, subjId);
        return;
      }
    }
    const out = next.apply(this, arguments);
    decorate(classId, subjId);
    return out;
  }; }, { id: 'sb_access.js' });

  SBHooks.use('renderMathChapter', function (next) { return function (index) {
    const classId = (typeof state !== 'undefined' && state.selectedClass) || '';
    const subjId = (cur && cur.classId === classId && cur.subjId) || (classId + '-math');
    A.ping('reading', { cls: classId, subject: subjId });
    if ((index | 0) >= 1 && !A.canRead(classId, subjId, index | 0)) {
      const area = document.getElementById('mathTopicArea');
      if (area) {
        let title = ''; try { const ch = (getMathChapterList() || [])[index]; title = ch && (ch.title || ch.name) || ''; } catch (e) { /* no title */ }
        showLock(area, { idx: index | 0, classId: classId, subjId: subjId, className: classNameOf(classId), title: title }, () => { try { selectMathChapter(0); } catch (e) { /* page changed */ } });
        decorate(classId, subjId);
        return;
      }
    }
    const out = next.apply(this, arguments);
    decorate(classId, subjId);
    return out;
  }; }, { id: 'sb_access.js' });

  // a plan bought or ended while a subject is open: lock or unlock the chapter buttons and the open chapter
  A.on(() => { if (cur) decorate(cur.classId, cur.subjId); });

  // -------- papers: the first paper is free; a Teacher plan covers its subjects. Counted when the paper reaches the review stage, once per class + subject + type.
  function paperGate(go, self, args) {
    const s = typeof paperCreationState !== 'undefined' ? paperCreationState : null;
    if (!s) return go.apply(self, args);
    const key = [s.classId, s.subjectId, s.paperType].join('|');
    A.useQuestion('paper', key, { cls: s.classId, subject: s.subjectId }).then(r => {
      if (r.allowed) go.apply(self, args);
      else A.paywall('paper', { cls: s.classId, subject: s.subjectId });
    });
  }
  ['jumpToReviewStage', 'printOfficialExamPaper'].forEach(name => {
    if (typeof window[name] !== 'function') return;
    SBHooks.use(name, function (next) { return function () { return paperGate(next, this, arguments); }; }, { id: 'sb_access.js' });
  });
  if (typeof window.saveAndNextCategoryStep === 'function') {
    SBHooks.use('saveAndNextCategoryStep', function (next) { return function () {
      const s = typeof paperCreationState !== 'undefined' ? paperCreationState : null;
      const last = !s || (s.activeCategoryIndex || 0) >= s.categoriesOrder.length - 1;
      return last ? paperGate(next, this, arguments) : next.apply(this, arguments);
    }; }, { id: 'sb_access.js' });
  }
})();
