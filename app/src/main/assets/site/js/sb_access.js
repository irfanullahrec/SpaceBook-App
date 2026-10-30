/* SBAccess: what this person may use, and the gates that apply it. One module for the website and the Android app's web pages, so a plan
 * bought once behaves the same everywhere. The SERVER decides (api/lib/billing.php through api/v2/entitlements.php and api/billing.php); this file
 * asks, remembers the last answer, and shows the purchase window when a limit is reached.
 *
 *   Free for everyone:  Chapters 1 and 2 of every subject, 50 Test Preparation questions, 50 Study Plan questions, 1 paper.
 *   Paid (PKR 500 a month each):  Student plan (one class + its Study Plan), Teacher plan (up to 10 subjects + papers), Test Preparation module.
 *
 * Public API (window.SBAccess):
 *   state() / access() / free(metric)        the last answer from the server (or the cache while offline)
 *   canRead(cls, subject, chapterIdx)        Chapters 1 and 2 (index 0 and 1) are always open; later chapters need a plan that covers the class or the subject
 *   unlimited(metric, ctx)                   metric: prep_q | plan_q | paper;   ctx: {cls, subject}
 *   useQuestion(metric, key, ctx)            Promise<{allowed, unlimited, used, limit}>; spends the free allowance ON THE SERVER; offline it counts here and sends later
 *   paywall(why, ctx)                        opens the purchase window (js/sb_billing.js) and tells the dashboard it was shown
 *   ping(module, ctx)                        a usage number for the management dashboard (no personal data)
 *   load()                                   ask the server now (on start, at every sign-in); a failed request keeps the last answer
 *   on(fn)                                   called with the new state after every successful load
 *   unlockWithKey(key)                       Promise<{ok, wait?, error?}>: the owner's pass (below). ownerPass() / lockOwnerPass(): is it on, switch it off
 *   keyDialog(onDone)                        (browser) the "Enter licence key" window
 *
 * The owner's pass: a key only the owner knows, for showing the app somewhere. Entered on a device it opens every chapter and lifts the free limits THERE. The
 * code holds only a salted, slow hash of the key (OWNER_VERIFIER, PBKDF2-SHA-256); the key itself is written nowhere in the repository. The lock is a screen of
 * the page and the books are files, so this is a courtesy for the owner, not protection against someone who edits the page. docs/BILLING.md.
 * Tests: tests/access/unit.js (Node), tests/access/browser.js (a real Chrome). The rule cases shared with the app: tests/access/contract.json. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.SBAccess = factory().create({}); root.SBAccess.start(); }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const KEY = 'sb_access_v1', KEY_VID = 'sb_vid', KEY_LOCAL = 'sb_free_local';
  const FREE_CHAPTERS = 2;           // Chapters 1 and 2 (index 0 and 1) of every subject; api/lib/billing.php SB_FREE_CHAPTERS and the app's AccessRules.FREE_CHAPTERS say the same
  const LIMITS = { prep_q: 50, plan_q: 50, paper: 1 };
  const OWNER_VERIFIER = { v: 1, iter: 600000, salt: '85bef773e4252291aa86a488b87dc8a0', hash: '0d13fa780c904a2e2c15b659d7b47d4d33fff9b55dc45aa1917200fd0c899d72' };

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

    // -------- the owner's pass (see the header). Kept on this device; inside the Android app the phone remembers it too (SBHost), so the app's own screens agree.
    const verifier = opts.ownerVerifier || OWNER_VERIFIER;
    const KEY_OWNER = 'sb_owner_pass', KEY_TRIES = 'sb_owner_tries';
    const hostCall = (name, arg) => { try { const h = g.SBHost; if (h && typeof h[name] === 'function') return h[name](arg); } catch (e) { /* no bridge */ } return undefined; };
    function ownerPass() { return rd(KEY_OWNER) === '1' || hostCall('ownerPass') === true; }
    function lockOwnerPass() { wr(KEY_OWNER, '0'); hostCall('setOwnerPass', false); listeners.forEach(fn => { try { fn(st); } catch (e) { /* a listener must not break the others */ } }); }
    const hexBytes = h => { const b = new Uint8Array(h.length / 2); for (let i = 0; i < b.length; i++) b[i] = parseInt(h.substr(i * 2, 2), 16); return b; };
    const bytesHex = b => Array.prototype.map.call(b, x => ('0' + x.toString(16)).slice(-2)).join('');
    async function unlockWithKey(key) {
      const t = now();
      let tries = {};
      try { tries = JSON.parse(rd(KEY_TRIES) || '{}') || {}; } catch (e) { tries = {}; }
      if (tries.until && tries.until > t) return { ok: false, wait: Math.ceil((tries.until - t) / 1000) };
      const subtle = (opts.crypto || g.crypto || {}).subtle;
      if (!subtle || typeof TextEncoder === 'undefined') return { ok: false, error: 'unsupported' };
      let ok = false;
      try {
        const k = await subtle.importKey('raw', new TextEncoder().encode(String(key)), 'PBKDF2', false, ['deriveBits']);
        const bits = await subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: hexBytes(verifier.salt), iterations: verifier.iter }, k, 256);
        ok = bytesHex(new Uint8Array(bits)) === verifier.hash;
      } catch (e) { return { ok: false, error: 'failed' }; }
      if (ok) {
        wr(KEY_OWNER, '1'); wr(KEY_TRIES, '{}'); hostCall('setOwnerPass', true);
        listeners.forEach(fn => { try { fn(st); } catch (e) { /* a listener must not break the others */ } });
        return { ok: true };
      }
      tries.n = (tries.n || 0) + 1;                                   // five wrong keys in a row: a minute's wait
      if (tries.n >= 5) { tries.until = t + 60000; tries.n = 0; }
      wr(KEY_TRIES, JSON.stringify(tries));
      return { ok: false };
    }

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
      if (ownerPass()) return true;
      const a = access();
      return (idx | 0) < FREE_CHAPTERS || a.readClasses.indexOf(cls) >= 0 || a.readSubjects.indexOf(subject) >= 0;
    }
    function unlimited(metric, ctx) {
      if (ownerPass() && (metric === 'prep_q' || metric === 'plan_q' || metric === 'paper')) return true;
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
      if (ownerPass()) return { allowed: true, unlimited: true, owner: true };   // showing the app: nothing is spent and the usage numbers stay clean
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
      if (ownerPass()) return;
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
      FREE_CHAPTERS, unlockWithKey, ownerPass, lockOwnerPass,
      headers, call, pending: pendingList, _setState: (s, isFresh) => { st = Object.assign(freshState(), s); fresh = isFresh !== false; } };
  }

  return { create, FREE_CHAPTERS, LIMITS };
});

/* ------------------------------------------------------------------ the gates in the page (browser only)
 * Chapter 3 and later, the first paper, the 51st Test Preparation / Study Plan question. Each gate asks SBAccess, which asks the server. */
(function () {
  'use strict';
  if (typeof window === 'undefined' || !window.SBAccess || typeof SBHooks === 'undefined') return;
  const A = window.SBAccess;
  let cur = null;                                                    // the subject open now: {classId, subjId}

  function lockHtml(info) {
    const cls = info.classId || '', what = info.title ? '“' + info.title + '”' : 'this chapter';
    return '<div class="sbx-lock" role="region" aria-label="Locked chapter"><div class="sbx-lock-icon" aria-hidden="true">🔒</div>' +
      '<h2>Chapter ' + (info.idx + 1) + ' needs a plan</h2>' +
      '<p>Chapters 1 and 2 of every subject are free. To read ' + what + ' and the other chapters, choose a plan for ' + (info.className || 'this class') + '.</p>' +
      '<div class="sbx-lock-actions"><button type="button" class="sbx-btn sbx-btn-main" data-sbx="plans">See plans · from PKR 500 / month</button>' +
      '<button type="button" class="sbx-btn" data-sbx="key">Enter licence key</button>' +
      '<button type="button" class="sbx-btn" data-sbx="back">Back to Chapter 1</button></div></div>';
  }
  function classNameOf(id) { try { const c = DATA.classes.find(x => x.id === id); return c ? c.name : ''; } catch (e) { return ''; } }
  let lockRetry = null;                                              // opens the locked chapter again once the owner's pass is on
  function showLock(area, info, back, retry) {
    area.innerHTML = lockHtml(info);
    lockRetry = retry || null;
    area.querySelector('[data-sbx="plans"]').addEventListener('click', () => { A.paywall('chapter', { cls: info.classId, subject: info.subjId }); });
    area.querySelector('[data-sbx="key"]').addEventListener('click', () => { keyDialog(); });
    area.querySelector('[data-sbx="back"]').addEventListener('click', back);
    A.ping('reading', { cls: info.classId, subject: info.subjId });
  }

  // -------- the "Enter licence key" window: the owner's pass (header of this file). The chapter lock and the plans window both open it.
  function keyDialog(onDone) {
    if (document.querySelector('.sbx-key-overlay')) return;
    const prev = document.activeElement;
    const ov = document.createElement('div');
    ov.className = 'sbx-key-overlay';
    ov.innerHTML = '<div class="sbx-key-box" role="dialog" aria-modal="true" aria-labelledby="sbxKeyT">' +
      '<h2 id="sbxKeyT">Enter licence key</h2>' +
      '<label for="sbxKeyIn">Licence key</label>' +
      '<input id="sbxKeyIn" type="password" autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<p class="sbx-key-msg" role="status" aria-live="polite"></p>' +
      '<div class="sbx-key-actions"><button type="button" class="sbx-btn sbx-btn-main" data-k="ok">Unlock</button><button type="button" class="sbx-btn" data-k="no">Cancel</button></div></div>';
    document.body.appendChild(ov);
    const behind = [].filter.call(document.body.children, e => e !== ov && !e.hasAttribute('inert') && !/^(SCRIPT|STYLE|LINK|NOSCRIPT)$/.test(e.tagName));
    behind.forEach(e => e.setAttribute('inert', ''));
    const input = ov.querySelector('input'), msg = ov.querySelector('.sbx-key-msg'), ok = ov.querySelector('[data-k="ok"]'), no = ov.querySelector('[data-k="no"]');
    let busy = false;
    function close(done) {
      document.removeEventListener('keydown', onKey, true);
      behind.forEach(e => e.removeAttribute('inert'));
      ov.remove();
      try { if (prev && prev.focus) prev.focus(); } catch (e) { /* the page changed */ }
      if (done) {
        if (document.querySelector('.sbx-lock') && lockRetry) { try { lockRetry(); } catch (e) { /* the page changed */ } }
        if (onDone) onDone(true);
      }
    }
    function onKey(ev) {
      if (ev.key === 'Escape' && !busy) { ev.preventDefault(); close(false); }
      else if (ev.key === 'Tab') {
        const items = [input, ok, no].filter(x => !x.disabled), first = items[0], last = items[items.length - 1];
        if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
        else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
      }
    }
    async function submit() {
      if (busy || !input.value) { if (!input.value) { msg.textContent = 'Type the key first.'; input.focus(); } return; }
      busy = true; ok.disabled = true; msg.textContent = 'Checking…';
      const r = await A.unlockWithKey(input.value);
      busy = false; ok.disabled = false;
      if (r.ok) { msg.textContent = 'Owner access is on for this device.'; setTimeout(() => close(true), 500); return; }
      input.value = ''; input.focus();
      msg.textContent = r.wait ? 'Too many tries. Try again in ' + r.wait + ' seconds.' : r.error ? 'This browser cannot check the key here.' : 'That key is not right.';
    }
    ok.addEventListener('click', submit);
    no.addEventListener('click', () => { if (!busy) close(false); });
    input.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); submit(); } });
    document.addEventListener('keydown', onKey, true);
    input.focus();
  }
  A.keyDialog = keyDialog;

  // a small lock on every chapter button after the free chapters that is not open to this person
  function decorate(classId, subjId) {
    try {
      document.querySelectorAll('.math-ch-list .math-ch-btn').forEach((b, i) => {
        const locked = i >= A.FREE_CHAPTERS && !A.canRead(classId, subjId, i);
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
    if ((chIdx | 0) >= A.FREE_CHAPTERS && !A.canRead(classId, subjId, chIdx | 0)) {
      const area = document.getElementById('subjectTopicArea');
      if (area) {
        let title = ''; try { const ch = (getSubjectChapterList(subjKey, classId) || [])[chIdx]; title = ch && (ch.title || ch.name) || ''; } catch (e) { /* no title */ }
        showLock(area, { idx: chIdx | 0, classId: classId, subjId: subjId, className: classNameOf(classId), title: title },
          () => { try { selectSubjectChapter(subjKey, 0, classId); } catch (e) { /* page changed */ } },
          () => { try { selectSubjectChapter(subjKey, chIdx | 0, classId); } catch (e) { /* page changed */ } });
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
    if ((index | 0) >= A.FREE_CHAPTERS && !A.canRead(classId, subjId, index | 0)) {
      const area = document.getElementById('mathTopicArea');
      if (area) {
        let title = ''; try { const ch = (getMathChapterList() || [])[index]; title = ch && (ch.title || ch.name) || ''; } catch (e) { /* no title */ }
        showLock(area, { idx: index | 0, classId: classId, subjId: subjId, className: classNameOf(classId), title: title },
          () => { try { selectMathChapter(0); } catch (e) { /* page changed */ } },
          () => { try { selectMathChapter(index | 0); } catch (e) { /* page changed */ } });
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
