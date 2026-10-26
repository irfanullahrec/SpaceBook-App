/* ======================================================================
 *  sb_study_plan.js — Study Plan page (replaces the old demo plan)
 *
 *  A student makes any number of plans: a whole class, chosen subjects or
 *  chosen chapters, between two dates, on chosen weekdays, at one or more
 *  study times. The planner takes every chapter's lesson parts, SLOs, MCQs,
 *  short / long questions, true-false, blanks, matching, numericals and
 *  exercise questions (js/study_plan_index.js) and spreads them over the
 *  study sessions by the time each kind of item takes.
 *
 *  Tracking: each task is ticked (or partly done); unfinished work from
 *  past sessions is shown again as "From earlier" until it is done, and
 *  "Re-plan the rest" spreads what is left over the remaining days.
 *  Reminders: a browser notification + an in-page banner when a session
 *  starts; clicking either opens that chapter at the right tab.
 *  Plans are kept in this browser and, when logged in, in the account
 *  (api/study_plans.php). Finishing tasks earns coins (sb_rewards.js).
 * ====================================================================== */
(function () {
  'use strict';
  const INDEX = () => window.SB_STUDY_INDEX || {classes: []};
  const LS_PLANS = 'sb_study_plans_v1';
  const LS_NOTIFIED = 'sb_study_notified_v1';
  const API = 'api/study_plans.php';

  // kinds of work, in the order they are studied inside a chapter; m = minutes per item
  const CATS = [
    ['read', 'Lesson parts', 'سبق کے حصے', 20, '📖'],
    ['slo', 'SLOs', 'حاصلاتِ تعلم', 3, '🎯'],
    ['mcq', 'MCQs', 'کثیر الانتخابی', 1.5, '🔘'],
    ['tf', 'True / False', 'درست / غلط', 1, '✔️'],
    ['blank', 'Fill in the blanks', 'خالی جگہ', 1, '✏️'],
    ['match', 'Matching', 'ملاپ', 2, '🔗'],
    ['sq', 'Short questions', 'مختصر سوالات', 5, '📝'],
    ['lq', 'Long questions', 'تفصیلی سوالات', 15, '📄'],
    ['num', 'Numericals / problems', 'عددی سوالات', 8, '🧮'],
    ['ex', 'Other exercise questions', 'دیگر مشقی سوالات', 4, '🧩'],
  ];
  const CAT = Object.fromEntries(CATS.map(([k, en, ur, m, ic]) => [k, {k, en, ur, m, ic}]));
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];
  const pad = n => String(n).padStart(2, '0');
  const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const parseYmd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const mins = t => { const [h, m] = String(t).split(':').map(Number); return h * 60 + m; };
  const hm = t => { const m = mins(t); const h = Math.floor(m / 60), mm = m % 60; return ((h + 11) % 12 + 1) + ':' + pad(mm) + (h < 12 ? ' AM' : ' PM'); };
  const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
  const today = () => ymd(new Date());
  const fmtDate = s => parseYmd(s).toLocaleDateString(undefined, {weekday: 'short', day: 'numeric', month: 'short'});
  const dur = m => (m >= 60 ? Math.floor(m / 60) + ' h ' : '') + (m % 60 ? Math.round(m % 60) + ' min' : (m >= 60 ? '' : '0 min'));
  const uid = () => 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  // ---------- index helpers ----------
  const classOf = id => INDEX().classes.find(c => c.id === id);
  const subjOf = (cid, sid) => ((classOf(cid) || {}).subjects || []).find(s => s.id === sid);
  const chTitle = t => String(t || '').replace(/\s+/g, ' ').trim();
  const shortCh = t => { const s = chTitle(t); const m = s.match(/^(\S{1,6})\s+(.*)$/); return m ? {no: m[1], name: m[2]} : {no: '', name: s}; };

  // ---------- storage ----------
  let plans = [];
  function loadLocal() { try { const v = JSON.parse(localStorage.getItem(LS_PLANS) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  function saveLocal() { try { localStorage.setItem(LS_PLANS, JSON.stringify(plans)); } catch (e) { /* storage full or blocked */ } }
  let signedIn = false;
  async function api(action, body) {
    const o = {credentials: 'same-origin', headers: {}};
    if (body !== undefined) { o.method = 'POST'; o.headers['Content-Type'] = 'application/json'; o.body = JSON.stringify(body); }
    // a plan saved or deleted without a connection waits in the offline queue (js/core/offline_queue.js); the newest change to a plan replaces older ones
    if (body !== undefined && signedIn && window.SBOfflineQueue) return window.SBOfflineQueue.send(API + '?action=' + action, body, {dedupe: 'plan:' + ((body.plan && body.plan.id) || body.id || action)});
    try { const r = await fetch(API + '?action=' + action, o); return await r.json(); } catch (e) { return {ok: false}; }
  }
  // ---- v2: offline-safe sync (js/core/sync.js, behind the sb_sync_v2 flag) ----
  // Every change is written to the outbox first (plan.save with the revision it was based on, plan.delete). The server
  // numbers the revisions and merges concurrent edits from two devices (api/lib/plans.php); the page shows the local
  // plans and folds in what a pull brings, never overwriting an edit that is still waiting to be sent and never
  // bringing back a plan whose deletion is waiting to be sent.
  const v2 = () => { try { return !!(window.SBSync && window.SBSync.isEnabled && window.SBSync.isEnabled()); } catch (e) { return false; } };
  const stripRev = p => { const c = Object.assign({}, p); delete c.rev; return c; };
  let hooked = false;
  function hookV2() {
    if (hooked || !window.SBSync) return;
    hooked = true;
    window.SBSync.on('pulled', () => { if (signedIn && v2()) mergeSnapshot(); });
  }
  async function mergeSnapshot() {
    const snap = await window.SBSync.snapshot(), pend = await window.SBSync.pendingEvents();
    const saving = new Set(pend.filter(e => e.type === 'plan.save' && e.payload && e.payload.plan).map(e => e.payload.plan.id));
    const deleting = new Set(pend.filter(e => e.type === 'plan.delete' && e.payload).map(e => e.payload.id));
    const byId = new Map(plans.map(p => [p.id, p]));
    Object.keys(snap.plansDeleted || {}).forEach(id => byId.delete(id));                 // a deletion made anywhere wins
    Object.values(snap.plans || {}).forEach(sp => {
      if (deleting.has(sp.id)) return;                                                   // we deleted it; the event is on its way
      const lp = byId.get(sp.id);
      if (!lp) byId.set(sp.id, sp);
      else if (saving.has(sp.id)) lp.rev = Math.max(lp.rev || 0, sp.rev || 0);           // keep our newer edit; later edits are based on this revision
      else if ((sp.rev || 0) > (lp.rev || 0)) byId.set(sp.id, sp);
    });
    plans = [...byId.values()];
    saveLocal();
    if (onPage()) render();
  }
  let syncingV2 = null;
  function syncV2(user) {      // single-flight, see loadV2 in sb_rewards.js
    if (!syncingV2) syncingV2 = syncV2Once(user).finally(() => { syncingV2 = null; });
    return syncingV2;
  }
  async function syncV2Once(user) {
    signedIn = true;
    hookV2();
    await window.SBSync.setUser(user);
    const pend = await window.SBSync.pendingEvents();
    const queued = new Set(pend.filter(e => e.type === 'plan.save' && e.payload && e.payload.plan).map(e => e.payload.plan.id));
    // plans made on this device before they were ever synced go to the account, if the student agrees (shared computers)
    const unsynced = plans.filter(p => !p.rev && !queued.has(p.id));
    if (unsynced.length && (!window.SBConsent || await window.SBConsent.guestData(user.id))) {
      for (const p of unsynced) await window.SBSync.emit('plan.save', {plan: stripRev(p), baseRev: 0});
    }
    try { await window.SBSync.sync(); } catch (e) { /* offline: the outbox keeps everything */ }
    await mergeSnapshot();
  }
  function persist(p) {
    p.updatedAt = Date.now();
    saveLocal();
    if (v2()) { if (signedIn) window.SBSync.emit('plan.save', {plan: stripRev(p), baseRev: p.rev || 0}).catch(() => {}); return; }
    if (signedIn) api('save', {plan: p});
  }
  function removePlan(p) {
    plans = plans.filter(x => x !== p);
    saveLocal();
    if (v2()) { if (signedIn) window.SBSync.emit('plan.delete', {id: p.id}).catch(() => {}); }
    else if (signedIn) api('delete', {id: p.id});
  }
  async function syncWithAccount() {
    const r = await api('list');
    if (!r.ok) { signedIn = false; return; }
    signedIn = true;
    const byId = new Map(plans.map(p => [p.id, p]));
    (r.deleted || []).forEach(id => byId.delete(id));
    for (const sp of r.plans || []) { const lp = byId.get(sp.id); if (!lp || (sp.updatedAt || 0) > (lp.updatedAt || 0)) byId.set(sp.id, sp); }
    plans = [...byId.values()];
    saveLocal();
    const serverIds = new Set((r.plans || []).map(p => p.id));
    plans.filter(p => !serverIds.has(p.id)).forEach(p => api('save', {plan: p}));
    if (onPage()) render();
  }
  document.addEventListener('spacebook:auth', e => {
    if (e.detail && e.detail.user) { if (v2()) syncV2(e.detail.user); else syncWithAccount(); }
    else signedIn = false;
  });

  // ---------- planner ----------
  // work units in study order: subjects take turns chapter by chapter
  function buildWork(classId, scope, cats) {
    const queues = scope.map(sc => {
      const S = subjOf(classId, sc.subj); if (!S) return [];
      return sc.ch.map(i => ({s: sc.subj, i, c: (S.chapters[i] || {}).c || {read: 1}}));
    }).filter(q => q.length);
    const order = [];
    for (let r = 0; queues.some(q => q.length); r++) queues.forEach(q => { if (q.length) order.push(q.shift()); });
    const work = [];
    order.forEach(ch => CATS.forEach(([k]) => { const n = cats.includes(k) ? (ch.c[k] || 0) : 0; if (n) work.push({s: ch.s, ch: ch.i, cat: k, n, w: CAT[k].m}); }));
    return work;
  }
  // Which days are study days. A rule is {weekdays:[0-6], skip:[ymd], extra:[ymd], alt:bool}:
  // weekdays = the usual study days, skip = dates off (holidays, exams, travel),
  // extra = additional dates even on a day off, alt = only every other study day.
  // (Plans made before this keep working: a plain weekdays array is accepted.)
  function ruleOf(x) {
    const r = Array.isArray(x) ? {weekdays: x} : (x || {});
    return {weekdays: r.weekdays || [0, 1, 2, 3, 4, 5, 6], skip: r.skip || [], extra: r.extra || [], alt: !!r.alt};
  }
  function dayKind(d, rule) {   // 'study' | 'off' | 'skip' | 'extra' (before every-other-day thinning)
    const key = ymd(d);
    if (rule.skip.includes(key)) return 'skip';
    if (rule.extra.includes(key)) return 'extra';
    return rule.weekdays.includes(d.getDay()) ? 'study' : 'off';
  }
  function studyDates(start, end, ruleIn, altFrom) {
    const rule = ruleOf(ruleIn);
    const out = [];
    let n = 0;
    // every-other-day counts from the plan's first day so re-planning keeps the same rhythm
    const from = rule.alt && altFrom && altFrom < start ? altFrom : start;
    for (let d = parseYmd(from), e = parseYmd(end); d <= e && out.length < 1000; d.setDate(d.getDate() + 1)) {
      const k = dayKind(d, rule);
      if (k === 'extra') { if (ymd(d) >= start) out.push(ymd(d)); continue; }
      if (k !== 'study') continue;
      const keep = !rule.alt || n % 2 === 0;
      n++;
      if (keep && ymd(d) >= start) out.push(ymd(d));
    }
    return out;
  }
  const planRule = p => ruleOf({weekdays: p.weekdays, skip: p.skip, extra: p.extra, alt: p.alt});
  function ruleLabel(rule) {
    const r = ruleOf(rule);
    const w = r.weekdays.slice().sort();
    let t = w.length === 7 ? 'every day' : w.join() === '1,2,3,4,5,6' ? 'Mon–Sat' : w.join() === '1,2,3,4,5' ? 'Mon–Fri' : w.map(d => DAYS[d]).join(', ');
    if (r.alt) t += ' · every other day';
    if (r.skip.length) t += ' · ' + r.skip.length + ' date' + (r.skip.length > 1 ? 's' : '') + ' off';
    if (r.extra.length) t += ' · ' + r.extra.length + ' extra date' + (r.extra.length > 1 ? 's' : '');
    return t;
  }

  // ---------- days & dates editor (wizard and existing plans) ----------
  const PRESETS = [['all', 'Every day', [0, 1, 2, 3, 4, 5, 6]], ['monsat', 'Mon–Sat (Sunday off)', [1, 2, 3, 4, 5, 6]],
    ['monfri', 'Mon–Fri (weekend off)', [1, 2, 3, 4, 5]], ['nofri', 'Friday off', [0, 1, 2, 3, 4, 6]], ['wkend', 'Weekends only', [0, 6]]];
  // group sorted dates into ranges for display
  function ranges(list) {
    const out = [];
    list.slice().sort().forEach(d => {
      const last = out[out.length - 1];
      if (last) { const nx = parseYmd(last.to); nx.setDate(nx.getDate() + 1); if (ymd(nx) === d) { last.to = d; return; } }
      out.push({from: d, to: d});
    });
    return out;
  }
  const rangeLabel = r => r.from === r.to ? fmtDate(r.from) : fmtDate(r.from) + ' – ' + fmtDate(r.to);
  function daysEditorHtml(rule, start, end, lockBefore) {
    const r = ruleOf(rule);
    const w = r.weekdays.slice().sort().join();
    const cal = calendarHtml(r, start, end, lockBefore);
    return `<div class="spx-rules">
      <div class="spx-rl"><span class="spx-rl-h">Quick choice</span><div class="spx-presets">${PRESETS.map(([id, label, wd]) => `<button type="button" class="spx-chipb ${wd.join() === w && !r.alt ? 'on' : ''}" data-rule="preset" data-v="${id}">${label}</button>`).join('')}</div></div>
      <div class="spx-rl"><span class="spx-rl-h">Study on</span><div class="spx-days-pick">${DAYS.map((d, i) => `<label class="spx-pill"><input type="checkbox" value="${i}" ${r.weekdays.includes(i) ? 'checked' : ''} data-rule="wd"><span>${d}</span></label>`).join('')}</div></div>
      <label class="spx-check"><input type="checkbox" data-rule="alt" ${r.alt ? 'checked' : ''}> Every other day only (study one day, rest the next)</label>
      <div class="spx-rl"><span class="spx-rl-h">Skip dates</span>
        <div class="spx-row spx-skiprow"><label>From <input type="date" data-rule="skipFrom" min="${start}" max="${end}"></label><label>To <input type="date" data-rule="skipTo" min="${start}" max="${end}"></label>
          <button type="button" class="spx-btn spx-sm" data-rule="skipAdd">➖ Skip these dates</button></div>
        <p class="spx-muted">Holidays, exams, a wedding or travel. Leave "To" empty to skip one date. You can also click days in the calendar.</p>
        ${r.skip.length ? `<div class="spx-datechips">${ranges(r.skip).map(x => `<span class="spx-dchip spx-dchip-skip">🚫 ${esc(rangeLabel(x))}<button type="button" data-rule="unskip" data-from="${x.from}" data-to="${x.to}" aria-label="Study on these dates again">×</button></span>`).join('')}</div>` : ''}
        ${r.extra.length ? `<div class="spx-datechips">${ranges(r.extra).map(x => `<span class="spx-dchip spx-dchip-extra">➕ ${esc(rangeLabel(x))}<button type="button" data-rule="unextra" data-from="${x.from}" data-to="${x.to}" aria-label="Remove extra dates">×</button></span>`).join('')}</div>` : ''}
      </div>
      ${cal}
    </div>`;
  }
  function calendarHtml(r, start, end, lockBefore) {
    if (!start || !end || end < start) return '';
    const s = parseYmd(start), e = parseYmd(end);
    const study = new Set(studyDates(start, end, r, r.altFrom));
    const months = [];
    for (let m = new Date(s.getFullYear(), s.getMonth(), 1); m <= e && months.length < 14; m.setMonth(m.getMonth() + 1)) months.push(new Date(m));
    const head = DAYS.map(d => `<i>${d.slice(0, 2)}</i>`).join('');
    return `<div class="spx-cal-legend"><span class="spx-lg spx-c-study">Study</span><span class="spx-lg spx-c-extra">Extra day</span><span class="spx-lg spx-c-skip">Skipped</span><span class="spx-lg spx-c-off">Day off</span><span class="spx-muted">Click a day to switch it on or off.</span></div>
      <div class="spx-cal">${months.map(m => {
        const first = new Date(m.getFullYear(), m.getMonth(), 1).getDay();
        const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
        let cells = '';
        for (let k = 0; k < first; k++) cells += '<span></span>';
        for (let dn = 1; dn <= days; dn++) {
          const d = new Date(m.getFullYear(), m.getMonth(), dn), key = ymd(d);
          if (key < start || key > end) { cells += `<span class="spx-c-out">${dn}</span>`; continue; }
          const k = dayKind(d, r);
          const cls = k === 'skip' ? 'skip' : k === 'extra' ? 'extra' : study.has(key) ? 'study' : 'off';
          const locked = lockBefore && key < lockBefore;
          cells += `<button type="button" class="spx-c-${cls}${key === today() ? ' spx-c-today' : ''}" data-rule="day" data-d="${key}" ${locked ? 'disabled' : ''} title="${esc(fmtDate(key))}: ${{study: 'study day', extra: 'extra study day', skip: 'skipped', off: 'day off'}[cls]}">${dn}</button>`;
        }
        return `<div class="spx-month"><div class="spx-month-h">${m.toLocaleDateString(undefined, {month: 'long', year: 'numeric'})}</div><div class="spx-month-g">${head}${cells}</div></div>`;
      }).join('')}</div>`;
  }
  // apply one editor event to a rule; returns true when the rule changed
  function applyRuleEvent(t, rule, box, start, end) {
    const a = t.dataset.rule;
    if (!a) return false;
    const r = rule;
    const span = (from, to) => { const out = []; for (let d = parseYmd(from), e = parseYmd(to || from); d <= e && out.length < 400; d.setDate(d.getDate() + 1)) out.push(ymd(d)); return out; };
    if (a === 'preset') { r.weekdays = PRESETS.find(x => x[0] === t.dataset.v)[2].slice(); r.alt = false; return true; }
    if (a === 'wd') { r.weekdays = $$('[data-rule="wd"]:checked', box).map(x => +x.value); return true; }
    if (a === 'alt') { r.alt = t.checked; return true; }
    if (a === 'skipAdd') {
      const from = (box.querySelector('[data-rule="skipFrom"]') || {}).value, to = (box.querySelector('[data-rule="skipTo"]') || {}).value || from;
      if (!from) { alert('Choose the first date to skip.'); return false; }
      const [x, y] = from <= to ? [from, to] : [to, from];
      const add = span(x, y).filter(d => d >= start && d <= end);
      r.skip = [...new Set(r.skip.concat(add))].sort();
      r.extra = r.extra.filter(d => !add.includes(d));
      return true;
    }
    if (a === 'unskip') { const rm = span(t.dataset.from, t.dataset.to); r.skip = r.skip.filter(d => !rm.includes(d)); return true; }
    if (a === 'unextra') { const rm = span(t.dataset.from, t.dataset.to); r.extra = r.extra.filter(d => !rm.includes(d)); return true; }
    if (a === 'day') {
      const key = t.dataset.d, d = parseYmd(key), k = dayKind(d, r);
      if (k === 'skip') r.skip = r.skip.filter(x => x !== key);
      else if (k === 'extra') r.extra = r.extra.filter(x => x !== key);
      else if (k === 'off' || t.classList.contains('spx-c-off')) r.extra = r.extra.concat(key).sort();
      else r.skip = r.skip.concat(key).sort();
      return true;
    }
    return false;
  }
  function slotMin(s) { const m = mins(s.to) - mins(s.from); return Number.isFinite(m) ? Math.max(5, m) : 5; }
  // spread work over sessions in proportion to each session's length; items of one kind may be split
  function schedule(work, sessions) {
    const total = work.reduce((a, x) => a + x.n * x.w, 0);
    const cap = sessions.reduce((a, s) => a + s.len, 0);
    if (!sessions.length) return;
    const ratio = cap > 0 && Number.isFinite(total) ? total / cap : 1;
    let wi = 0, used = 0; // used = items of work[wi] already placed
    sessions.forEach((s, si) => {
      s.tasks = s.tasks || [];
      let room = s.len * ratio;
      const last = si === sessions.length - 1;
      while (wi < work.length) {
        const x = work[wi], left = x.n - used;
        let take = last ? left : Math.min(left, Math.floor((room + 1e-6) / x.w));
        if (!Number.isFinite(take)) take = left;
        if (take <= 0) {
          // an item that does not fit: place it here only if this session is still mostly empty
          if (room >= x.w / 2 || !s.tasks.length) take = 1; else break;
        }
        const base = (x.a || 1) - 1;   // re-planned work keeps its real item numbers
        const prev = s.tasks[s.tasks.length - 1];
        if (prev && prev.s === x.s && prev.ch === x.ch && prev.cat === x.cat && prev.b === base + used) { prev.b += take; prev.n += take; }
        else s.tasks.push({id: uid(), s: x.s, ch: x.ch, cat: x.cat, a: base + used + 1, b: base + used + take, n: take, done: 0});
        used += take; room -= take * x.w;
        if (used >= x.n) { wi++; used = 0; }
        if (room <= 0 && !last) break;
      }
    });
  }
  function makeSessions(dates, slots, fromNowOn) {
    const out = [];
    const t = today(), nm = nowMin();
    dates.forEach(d => slots.forEach((sl, k) => {
      if (fromNowOn && d === t && mins(sl.to) <= nm) return;
      out.push({id: uid(), date: d, slot: k, from: sl.from, to: sl.to, len: slotMin(sl), tasks: []});
    }));
    return out;
  }
  function createPlan(o) {
    const dates = studyDates(o.start, o.end, {weekdays: o.weekdays, skip: o.skip, extra: o.extra, alt: o.alt});
    let revDate = null;
    if (o.revision && dates.length >= 3) revDate = dates.pop();
    const sessions = makeSessions(dates, o.slots, false);
    schedule(buildWork(o.classId, o.scope, o.cats), sessions);
    if (revDate) o.slots.forEach((sl, k) => sessions.push({id: uid(), date: revDate, slot: k, from: sl.from, to: sl.to, len: slotMin(sl), revision: true,
      tasks: [{id: uid(), cat: 'rev', n: 1, done: 0, a: 1, b: 1}]}));
    return {id: uid(), name: o.name, classId: o.classId, scope: o.scope, cats: o.cats, start: o.start, end: o.end, weekdays: o.weekdays,
      skip: o.skip || [], extra: o.extra || [], alt: !!o.alt, slots: o.slots, revision: !!revDate, sessions, createdAt: Date.now(), updatedAt: Date.now()};
  }
  // re-plan: everything not done yet goes onto the sessions from now on
  function replan(p, skippedDay) {
    const t = today(), nm = nowMin();
    const isFuture = s => s.date > t || (s.date === t && mins(s.to) > nm);
    const leftover = [];
    p.sessions.forEach(s => s.tasks.forEach(k => { if (k.cat !== 'rev' && k.done < k.n) leftover.push(k); }));
    // past sessions (and a day being skipped) keep only the work already done on them
    const keep = p.sessions.filter(s => !isFuture(s) || s.date === skippedDay)
      .map(s => ({...s, tasks: s.tasks.filter(k => k.done > 0 || (k.cat === 'rev' && s.date !== skippedDay))}))
      .map(s => { s.tasks = s.tasks.map(k => k.done < k.n && k.cat !== 'rev' ? {...k, n: k.done, b: k.a + k.done - 1} : k); return s; })
      .filter(s => s.tasks.length);
    const work = [];
    leftover.forEach(k => { const rest = k.n - k.done; const prev = work[work.length - 1];
      const a = k.a + k.done;
      if (prev && prev.s === k.s && prev.ch === k.ch && prev.cat === k.cat && prev.a + prev.n === a) prev.n += rest;
      else work.push({s: k.s, ch: k.ch, cat: k.cat, n: rest, w: CAT[k.cat].m, a}); });
    const dates = studyDates(t, p.end, planRule(p), p.start);
    let revDate = null;
    if (p.revision && dates.length >= 2) revDate = dates.pop();
    const fresh = makeSessions(dates, p.slots, true);
    schedule(work, fresh);
    if (revDate) p.slots.forEach((sl, k) => fresh.push({id: uid(), date: revDate, slot: k, from: sl.from, to: sl.to, len: slotMin(sl), revision: true,
      tasks: [{id: uid(), cat: 'rev', n: 1, done: 0, a: 1, b: 1}]}));
    p.sessions = keep.concat(fresh.filter(s => s.tasks.length)).sort((x, y) => (x.date + x.from).localeCompare(y.date + y.from));
    persist(p);
  }

  // ---------- plan queries ----------
  const taskMin = k => (k.cat === 'rev' ? 0 : CAT[k.cat].m * k.n);
  function planStats(p) {
    let all = 0, done = 0, tasks = 0, checked = 0, selfMarked = 0;     // checked = tasks learnt by passing the check, selfMarked = ticked by the student
    const byCat = {};
    p.sessions.forEach(s => s.tasks.forEach(k => {
      if (k.cat === 'rev') return;
      tasks++; if (k.done >= k.n && k.learn) { if (k.learn.mode === 'check') checked++; else selfMarked++; }
      all += taskMin(k); done += CAT[k.cat].m * Math.min(k.done, k.n);
      byCat[k.cat] = byCat[k.cat] || {n: 0, done: 0}; byCat[k.cat].n += k.n; byCat[k.cat].done += Math.min(k.done, k.n);
    }));
    return {all, done, pct: all ? Math.round(done * 100 / all) : 0, byCat, tasks, checked, selfMarked};
  }
  const sessionEnded = s => s.date < today() || (s.date === today() && mins(s.to) <= nowMin());
  function pendingFromEarlier(p) {
    const out = [];
    p.sessions.forEach(s => { if (sessionEnded(s) && !s.revision) s.tasks.forEach(k => { if (k.done < k.n) out.push({s, k}); }); });
    return out;
  }
  function currentSession(p) {
    const t = today(), nm = nowMin();
    return p.sessions.find(s => s.date === t && mins(s.from) <= nm && nm < mins(s.to)) || null;
  }
  function nextSession(p) {
    const t = today(), nm = nowMin();
    return p.sessions.find(s => s.date > t || (s.date === t && mins(s.from) > nm)) || null;
  }
  function scopeLabel(p) {
    const C = classOf(p.classId); const cn = C ? C.name : p.classId;
    if (p.scope.length === (C ? C.subjects.length : -1) && p.scope.every(sc => { const S = subjOf(p.classId, sc.subj); return S && sc.ch.length === S.chapters.length; })) return cn + ' · all subjects';
    if (p.scope.length === 1) { const S = subjOf(p.classId, p.scope[0].subj) || {name: p.scope[0].subj, chapters: []};
      return cn + ' · ' + S.name + (p.scope[0].ch.length === S.chapters.length ? '' : ' · ' + p.scope[0].ch.length + ' chapter' + (p.scope[0].ch.length > 1 ? 's' : '')); }
    return cn + ' · ' + p.scope.length + ' subjects';
  }
  function taskText(p, k) {
    if (k.cat === 'rev') return {subj: 'Revision', ch: 'Whole plan', work: 'Revise everything in this plan and re-try what you got wrong'};
    const S = subjOf(p.classId, k.s) || {name: k.s, chapters: []};
    const ch = shortCh((S.chapters[k.ch] || {}).t);
    const c = CAT[k.cat];
    const range = k.n > 1 ? ` ${k.a}–${k.b}` : (k.cat === 'read' ? ` ${k.a}` : ` ${k.a}`);
    return {subj: S.name, emoji: S.emoji, chNo: ch.no, ch: ch.name,
      work: (k.cat === 'read' ? (k.n > 1 ? `Read lesson parts${range}` : `Read lesson part${range}`) : `${c.en}${range}`) + ` (${k.n})`};
  }

  // ---------- going to the work ----------
  const TAB_RX = {
    read: /lesson|paragraph|textbook|text|سبق|متن/i, slo: /slo|outcome|حاصلات/i, mcq: /mcq|slo|objective|کثیر|معروضی/i,
    sq: /short|question|exercise|slo|سوال|مشق/i, lq: /long|question|exercise|slo|سوال|مشق/i, tf: /exercise|question|practice|مشق/i,
    blank: /exercise|question|practice|مشق/i, match: /exercise|question|practice|مشق/i, num: /numerical|exercise|problem|solved|مشق/i, ex: /exercise|question|practice|مشق/i
  };
  // second-level tabs inside an exercise / SLO tab
  const SUB_RX = {mcq: /mcq|multiple|کثیر/i, sq: /short|comprehension|مختصر/i, lq: /long|detail|تفصیلی/i, num: /numerical|problem|عددی/i,
    tf: /true|false|درست/i, blank: /blank|fill|خالی/i, match: /match|ملاپ/i, slo: /slo|outcome/i};
  const tabButtons = area => $$('button', area.closest('.math-unified-view') || area)
    .filter(b => b.offsetParent !== null && !b.closest('.math-ch-list, .math-acc-header, .sb-fs-btn, .spx-task') && b.textContent.trim().length < 60);
  // "Go" on lesson parts: the lessons themselves, one part at a time, in a sheet over the plan (js/sb_study_sheet.js): "Read & next" counts a part as read
  // (done 1 / 4) and shows the next; the last one offers "I've finished — test me". Where the book has no such parts the student is taken to the chapter page.
  function studySheet(p, k) {
    const SS = window.SBStudySheet; if (!SS || !SS.partsFor) return false;
    let parts = null;
    const S = subjOf(p.classId, k.s), counted = S && S.chapters[k.ch] && S.chapters[k.ch].c ? S.chapters[k.ch].c.read : 0;
    try { parts = SS.partsFor(p.classId, k.s, k.ch, k.a, k.b, counted); } catch (e) { parts = null; }
    if (!parts || parts.length !== k.n) return false;
    const t = taskText(p, k);
    return SS.open({
      title: t.subj + (t.chNo ? ' · ' + t.chNo : '') + (t.ch ? ' ' + t.ch : ''), sub: t.work, parts,
      start: k.done >= k.n ? 0 : Math.min(k.done, k.n - 1),
      onRead: n => { if (k.done < n && n < k.n) setDone(p, k, n); },
      onFinish: () => { gate(p, k).then(() => { if (k.done >= k.n) SS.close(); }); },
      onOpenBook: () => goBook(p, k)
    });
  }
  function go(p, k) {
    if (!k || k.cat === 'rev') { openPlan(p.id); return; }
    if (k.cat === 'read' && studySheet(p, k)) return;
    goBook(p, k);
  }
  function goBook(p, k) {
    try { if (typeof setActiveNav === 'function') setActiveNav('subjects'); openSubject(p.classId, k.s); } catch (e) { return; }
    setTimeout(() => {
      const list = $$('.math-ch-list [onclick*="Chapter("], .math-ch-list button, .drawing-page-list button').filter(e => e.offsetParent !== null);
      if (list[k.ch]) list[k.ch].click();
      setTimeout(() => {
        const area = document.getElementById('subjectTopicArea') || $('.math-topic-area');
        const rx = TAB_RX[k.cat];
        if (area && rx && k.cat !== 'read') {
          const t = tabButtons(area).find(b => rx.test(b.textContent));
          if (t) t.click();
          const sub = SUB_RX[k.cat];
          if (sub) setTimeout(() => { const a2 = document.getElementById('subjectTopicArea') || $('.math-topic-area'); const b2 = a2 && tabButtons(a2).find(b => b !== t && sub.test(b.textContent)); if (b2) b2.click(); }, 300);
        }
        if (area) area.scrollIntoView({block: 'start', behavior: 'smooth'});
        showStudyBar(p, k);
      }, 450);
    }, 350);
  }
  // a slim bar on the subject page: what to do now, tick it off, back to the plan
  function showStudyBar(p, k) {
    let bar = document.getElementById('spx-studybar');
    if (!bar) { bar = document.createElement('div'); bar.id = 'spx-studybar'; document.body.appendChild(bar); }
    const t = taskText(p, k);
    bar.innerHTML = `<span class="spx-sb-lab">📅 Study plan</span><span class="spx-sb-txt"><b>${esc(t.subj)}</b> · ${esc(t.chNo)} ${esc(t.ch)} — ${esc(t.work)}</span>
      <button type="button" class="spx-btn spx-sm spx-ok" data-act="check" data-no-translate title="Answer questions from the book to show you have learnt this">🧠 I've finished — test me</button><button type="button" class="spx-btn spx-sm" data-act="plan">Open plan</button><button type="button" class="spx-x" data-act="x" aria-label="Close">×</button>`;
    bar.onclick = e => {
      const a = e.target.closest('[data-act]'); if (!a) return;
      if (a.dataset.act === 'check') gate(p, k, e.clientX, e.clientY);
      else if (a.dataset.act === 'plan') { bar.remove(); openPlan(p.id); }
      else bar.remove();
    };
  }

  // reset the statistics of a plan: every task goes back to "not done"; the days, subjects and work stay as planned
  function resetPlan(p) {
    if (!p || !confirm('Reset the statistics of "' + p.name + '"? Every ticked or partly done task goes back to not done (0%). The plan itself stays.')) return false;
    p.sessions.forEach(s => s.tasks.forEach(k => { k.done = 0; delete k.learn; }));
    try { const n = loadNotified(); Object.keys(n).forEach(key => { if (key.indexOf(p.id) >= 0) delete n[key]; }); localStorage.setItem(LS_NOTIFIED, JSON.stringify(n)); } catch (e) { /* fine */ }
    persist(p);
    return true;
  }

  // ---------- progress + coins ----------
  function setDone(p, k, n, x, y) {
    const before = k.done;
    k.done = Math.max(0, Math.min(k.n, n));
    persist(p);
    if (k.done >= k.n && before < k.n && window.SBRewards) {
      const s = p.sessions.find(ss => ss.tasks.includes(k));
      if (s) SBRewards.step(('plan|' + p.id + '|' + s.id).slice(0, 190), p.name + ' · ' + fmtDate(s.date), s.tasks.length, s.tasks.indexOf(k), x, y);
    }
    if (onPage()) render();
  }

  // ---------- learn it, then prove it (js/sb_mastery.js) ----------
  // A task is not marked done on the student's word: ticking it, or "I've finished — test me" on the study bar, opens a check of questions from the
  // book about that very part. What is missed comes back, and only that, until every answer is right. Passing marks the task done and keeps the
  // record on the task (k.learn: when, rounds, questions, mistakes put right). Where the books hold no question to ask the student marks the task
  // themselves and the record says so ({mode: 'self'}). Revision days need no check.
  function markLearnt(p, k, rec, x, y) {
    k.learn = rec;
    const bar = document.getElementById('spx-studybar'); if (bar) bar.remove();
    setDone(p, k, k.n, x, y);
  }
  function gate(p, k, x, y) {
    if (!k) return Promise.resolve(null);
    if (k.cat === 'rev') { setDone(p, k, k.n, x, y); return Promise.resolve(null); }
    if (!window.SBMastery || !window.SBMastery.checkTask) { markLearnt(p, k, {at: Date.now(), mode: 'self'}, x, y); return Promise.resolve(null); }
    const t = taskText(p, k), S = subjOf(p.classId, k.s) || {chapters: []}, chap = S.chapters[k.ch] || {};
    return window.SBMastery.checkTask({
      classNum: parseInt(String(p.classId).replace(/\D/g, ''), 10) || 0, task: k, counts: chap.c || {},
      title: t.subj + (t.chNo ? ' · ' + t.chNo : ''), sub: (t.ch ? t.ch + ' — ' : '') + t.work,
      planLabel: onPage() ? '' : 'Open my plan',
      onPass: rec => markLearnt(p, k, rec, x, y),
      onSelf: () => markLearnt(p, k, {at: Date.now(), mode: 'self'}, x, y)
    }).then(r => { if (r && r.goPlan) openPlan(p.id); return r; });
  }
  function learntBadge(k) {
    const L = k.done >= k.n ? k.learn : null; if (!L) return '';
    if (L.mode === 'check') return `<span class="spx-learnt" title="Passed the check: ${L.asked} question${L.asked === 1 ? '' : 's'}, ${L.rounds} round${L.rounds === 1 ? '' : 's'}, ${L.fixed} mistake${L.fixed === 1 ? '' : 's'} put right">🧠 learnt${L.rounds > 1 ? ' · ' + L.rounds + ' rounds' : ''}</span>`;
    return '<span class="spx-learnt spx-self" title="Marked as learnt by you, without a check">✋ marked by you</span>';
  }
  // what the student has proved, task by task
  function recordHtml(p) {
    const rows = [];
    p.sessions.forEach(s => s.tasks.forEach(k => { if (k.cat !== 'rev' && k.learn && k.done >= k.n) rows.push(k); }));
    if (!rows.length) return '';
    rows.sort((a, b) => (b.learn.at || 0) - (a.learn.at || 0));
    return `<details class="spx-record"><summary>🧠 Learning record (${rows.length})</summary>${rows.map(k => {
      const L = k.learn, t = taskText(p, k);
      return `<div class="spx-rec"><div><b>${esc(t.subj)}</b> · ${esc(t.chNo)} ${esc(t.ch)}<br><span class="spx-muted">${esc(t.work)}</span></div><div class="spx-rec-r">${L.mode === 'check'
        ? `<span class="spx-learnt">🧠 checked</span><span>${L.asked} question${L.asked === 1 ? '' : 's'} · ${L.rounds} round${L.rounds === 1 ? '' : 's'} · ${L.fixed} mistake${L.fixed === 1 ? '' : 's'} put right</span>`
        : '<span class="spx-learnt spx-self">✋ marked by you</span>'}<span class="spx-muted">${esc(L.at ? new Date(L.at).toLocaleDateString(undefined, {day: 'numeric', month: 'short'}) : '')}</span></div></div>`;
    }).join('')}</details>`;
  }

  // ---------- reminders ----------
  function loadNotified() { try { return JSON.parse(localStorage.getItem(LS_NOTIFIED) || '{}'); } catch (e) { return {}; } }
  function markNotified(key) { const n = loadNotified(); n[key] = Date.now(); Object.keys(n).forEach(k => { if (Date.now() - n[k] > 7 * 864e5) delete n[k]; }); try { localStorage.setItem(LS_NOTIFIED, JSON.stringify(n)); } catch (e) { /* fine */ } }
  const remindersOn = () => { try { return localStorage.getItem('sb_study_reminders') !== 'off'; } catch (e) { return true; } };
  // The words of a reminder, one place for the browser (tick below: banner and notification) and for the Android app's own reminders
  // (reminders() below, read by the app and scheduled as phone notifications). soon = five minutes before the session starts.
  function reminderText(p, s, soon) {
    const lines = s.tasks.filter(k => k.done < k.n).slice(0, 3).map(k => { const t = taskText(p, k); return t.subj + ': ' + t.work; });
    const pend = pendingFromEarlier(p).length;
    return {
      title: (soon ? 'Study time in 5 minutes' : 'Study time now') + ' · ' + hm(s.from) + '–' + hm(s.to),
      body: (lines.join('\n') || 'Open your plan') + (pend ? `\n+ ${pend} unfinished task${pend > 1 ? 's' : ''} from earlier` : '')
    };
  }
  // Every reminder the plans will want in the next `days` days (default 7), earliest first: [{key, at (ms), title, body, planId, sessionId}].
  // A session whose tasks are all done has none; one that already started or passed has none.
  function reminders(days) {
    const out = [], now = Date.now(), end = now + (days || 7) * 864e5;
    plans.forEach(p => p.sessions.forEach(s => {
      if (s.tasks.length && s.tasks.every(k => k.done >= k.n)) return;
      const start = parseYmd(s.date); start.setHours(0, mins(s.from), 0, 0);
      [[true, start.getTime() - 5 * 60000], [false, start.getTime()]].forEach(([soon, at]) => {
        if (at <= now || at > end) return;
        const t = reminderText(p, s, soon);
        out.push({key: p.id + '|' + s.id + (soon ? '|soon' : ''), at, title: t.title, body: t.body, planId: p.id, sessionId: s.id});
      });
    }));
    return out.sort((a, b) => a.at - b.at);
  }
  function tick() {
    if (window.SB_BACKGROUND_READ || !remindersOn()) return;      // the app reads the plans in a page nobody looks at (see reminders()): that page shows and marks nothing
    const done = loadNotified();
    plans.forEach(p => {
      const s = currentSession(p) || (() => { const n = nextSession(p); return n && n.date === today() && mins(n.from) - nowMin() <= 5 ? n : null; })();
      if (!s) return;
      const soon = mins(s.from) > nowMin();
      const key = p.id + '|' + s.id + (soon ? '|soon' : '');
      if (done[key]) return;
      markNotified(key);
      const first = s.tasks.find(k => k.done < k.n) || s.tasks[0];
      const {title, body} = reminderText(p, s, soon);
      if ('Notification' in window && Notification.permission === 'granted') {
        try {
          const n = new Notification(title, {body, tag: key, requireInteraction: !soon});
          n.onclick = () => { window.focus(); n.close(); go(p, first); };
        } catch (e) { /* some browsers only allow notifications from a service worker */ }
      }
      banner(p, s, first, title, body);
    });
  }
  function banner(p, s, first, title, body) {
    const old = document.getElementById('spx-banner'); if (old) old.remove();
    const b = document.createElement('div'); b.id = 'spx-banner'; b.setAttribute('role', 'alert');
    b.innerHTML = `<div class="spx-bn-ic">⏰</div><div class="spx-bn-tx"><b>${esc(title)}</b><span>${esc(body).replace(/\n/g, '<br>')}</span></div>
      <div class="spx-bn-act"><button type="button" class="spx-btn spx-pri" data-act="go">▶ Start now</button><button type="button" class="spx-btn" data-act="plan">See plan</button></div><button type="button" class="spx-x" data-act="x" aria-label="Close">×</button>`;
    b.onclick = e => {
      const a = e.target.closest('[data-act]'); if (!a) return;
      b.remove();
      if (a.dataset.act === 'go') go(p, first); else if (a.dataset.act === 'plan') openPlan(p.id);
    };
    document.body.appendChild(b);
    try { navigator.vibrate && navigator.vibrate([120, 60, 120]); } catch (e) { /* fine */ }
  }
  function toast(text) {
    const t = document.createElement('div'); t.className = 'spx-toast'; t.textContent = text; document.body.appendChild(t);
    setTimeout(() => t.remove(), 6000);
  }
  async function askPermission() {
    if (!('Notification' in window)) { toast('This browser cannot show notifications. Reminders will still appear inside SpaceBook while it is open.'); return; }
    let r = 'denied';
    try { r = await Notification.requestPermission(); } catch (e) { /* old browsers */ }
    if (r !== 'granted') toast('Notifications are blocked for this site, so reminders will appear inside SpaceBook while it is open. To get them outside too, allow notifications from the icon next to the web address.');
    if (onPage()) render();
  }

  // ---------- printing ----------
  function printPlan(p) {
    const st = planStats(p);
    const byDate = {};
    p.sessions.forEach(s => { (byDate[s.date] = byDate[s.date] || []).push(s); });
    const rows = Object.keys(byDate).sort().map(d => byDate[d].map((s, i) => s.tasks.map((k, j) => {
      const t = taskText(p, k);
      return `<tr>${i === 0 && j === 0 ? `<td rowspan="${byDate[d].reduce((a, x) => a + x.tasks.length, 0)}" class="d">${esc(fmtDate(d))}</td>` : ''}${j === 0 ? `<td rowspan="${s.tasks.length}" class="t">${hm(s.from)}–${hm(s.to)}</td>` : ''}
        <td>${esc(t.subj)}</td><td>${esc(t.chNo)} ${esc(t.ch)}</td><td>${esc(t.work)}</td><td class="c">${k.done >= k.n ? '✔' : '☐'}</td></tr>`;
    }).join('')).join('')).join('');
    const totals = Object.entries(st.byCat).map(([c, v]) => `${CAT[c].en}: ${v.n}`).join(' · ');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(p.name)}</title><style>
      body{font:12px/1.45 "Segoe UI",Arial,sans-serif;color:#0f172a;margin:18px}h1{font-size:20px;margin:0 0 4px}p{margin:2px 0;color:#475569}
      table{border-collapse:collapse;width:100%;margin-top:12px}th,td{border:1px solid #cbd5e1;padding:4px 6px;vertical-align:top;text-align:left}
      th{background:#e0f2fe}td.d{font-weight:700;white-space:nowrap;background:#f8fafc}td.t{white-space:nowrap}td.c{text-align:center;width:28px;font-size:14px}
      tr{page-break-inside:avoid}@page{margin:12mm}</style></head><body>
      <h1>📅 ${esc(p.name)}</h1><p>${esc(scopeLabel(p))} · ${esc(fmtDate(p.start))} – ${esc(fmtDate(p.end))} · ${p.slots.map(s => hm(s.from) + '–' + hm(s.to)).join(', ')}</p>
      <p>${esc(totals)} · about ${dur(Math.round(st.all))} of study · ${st.pct}% done</p>
      <table><thead><tr><th>Date</th><th>Time</th><th>Subject</th><th>Chapter</th><th>Work</th><th>✓</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
    const f = document.createElement('iframe');
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
    document.body.appendChild(f);
    f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();
    setTimeout(() => { f.contentWindow.focus(); f.contentWindow.print(); setTimeout(() => f.remove(), 1500); }, 250);
  }

  // ---------- page ----------
  let view = {mode: 'list', planId: null};
  const onPage = () => { try { return state.page === 'study-plan'; } catch (e) { return false; } };
  function shell(title, sub) {
    try {
      state.page = 'study-plan'; state.activeView = 'study-plan';
      setActiveNav('study-plan');
      setDashHeader('📅 Study Plan', sub || 'Plan your study, get reminded on time, and keep track of what you have learnt');
      setBreadcrumb([{label: 'Home', onclick: () => { setActiveNav('home'); renderHome(); }}, {label: 'Study Plan', active: view.mode === 'list', onclick: () => { view = {mode: 'list'}; render(); }}]
        .concat(view.mode === 'list' ? [] : [{label: title, active: true}]));
    } catch (e) { /* app helpers missing */ }
    addCss();
    return document.getElementById('dashboard-body');
  }
  function render() {
    if (view.mode === 'new') return renderWizard();
    if (view.mode === 'plan') { const p = plans.find(x => x.id === view.planId); if (p) return renderPlan(p); view = {mode: 'list'}; }
    renderList();
  }
  function openPlan(id) { view = {mode: 'plan', planId: id}; render(); window.scrollTo(0, 0); }

  function taskRow(p, s, k, showDate) {
    const t = taskText(p, k);
    const full = k.done >= k.n;
    const partial = k.n > 1 && k.cat !== 'rev';
    return `<div class="spx-task${full ? ' spx-done' : ''}" data-plan="${p.id}" data-sess="${s.id}" data-task="${k.id}">
      <label class="spx-chk"><input type="checkbox" ${full ? 'checked' : ''} data-act="tick" aria-label="Mark done"><span></span></label>
      <div class="spx-tk-main">
        <div class="spx-tk-top">${showDate ? `<span class="spx-when">${esc(fmtDate(s.date))} · ${hm(s.from)}</span>` : ''}<span class="spx-subj">${esc(t.emoji || '📘')} ${esc(t.subj)}</span>${t.chNo ? `<span class="spx-chno">${esc(t.chNo)}</span>` : ''}<span class="spx-chname">${esc(t.ch)}</span></div>
        <div class="spx-work">${k.cat === 'rev' ? '🔁' : CAT[k.cat].ic} ${esc(t.work)}${k.cat !== 'rev' ? ` <span class="spx-min">~${dur(Math.round(taskMin(k)))}</span>` : ''}${learntBadge(k)}</div>
      </div>
      ${partial ? `<label class="spx-part" title="How many done">done <input type="number" min="0" max="${k.n}" value="${k.done}" data-act="part"> / ${k.n}</label>` : ''}
      ${k.cat !== 'rev' && !full ? '<button type="button" class="spx-btn spx-sm spx-test" data-act="check" data-no-translate title="Answer questions from the book to show you have learnt this">🧠 Test me</button>' : ''}
      <button type="button" class="spx-btn spx-sm spx-go" data-act="go">${k.cat === 'rev' ? 'Open' : 'Go ▶'}</button>
    </div>`;
  }
  function bindTasks(root) {
    root.addEventListener('click', e => {
      const a = e.target.closest('[data-act]'); const row = e.target.closest('.spx-task'); if (!a || !row) return;
      const p = plans.find(x => x.id === row.dataset.plan); if (!p) return;
      const s = p.sessions.find(x => x.id === row.dataset.sess); const k = s && s.tasks.find(x => x.id === row.dataset.task); if (!k) return;
      if (a.dataset.act === 'tick') {
        if (a.checked) { a.checked = false; gate(p, k, e.clientX, e.clientY); }         // done only after the check (or the student's own word where no question exists)
        else { delete k.learn; setDone(p, k, 0, e.clientX, e.clientY); }
      }
      else if (a.dataset.act === 'check') gate(p, k, e.clientX, e.clientY);
      else if (a.dataset.act === 'go') go(p, k);
    });
    root.addEventListener('change', e => {
      const a = e.target.closest('[data-act="part"]'); const row = e.target.closest('.spx-task'); if (!a || !row) return;
      const p = plans.find(x => x.id === row.dataset.plan); const s = p && p.sessions.find(x => x.id === row.dataset.sess); const k = s && s.tasks.find(x => x.id === row.dataset.task);
      if (!k) return;
      const n = Number(a.value) || 0;
      if (n >= k.n) { a.value = k.done; gate(p, k); }                                     // all of it: the check decides; part of it is the student's own count
      else { if (k.done >= k.n) delete k.learn; setDone(p, k, n); }
    });
  }

  function renderList() {
    const root = shell('');
    if (!root) return;
    const notif = 'Notification' in window ? Notification.permission : 'unsupported';
    const active = plans.filter(p => p.end >= today()).sort((a, b) => a.start.localeCompare(b.start));
    const old = plans.filter(p => p.end < today());
    // what to study now
    let nowHtml = '';
    const nowItems = active.map(p => ({p, s: currentSession(p)})).filter(x => x.s);
    const pend = active.flatMap(p => pendingFromEarlier(p).map(x => ({p, ...x})));
    if (nowItems.length) {
      nowHtml = nowItems.map(({p, s}) => `<section class="spx-now"><div class="spx-now-h"><span class="spx-live">● Now</span><b>${esc(p.name)}</b><span>${hm(s.from)} – ${hm(s.to)}</span></div>
        <div class="spx-tasks">${s.tasks.map(k => taskRow(p, s, k)).join('')}</div></section>`).join('');
    } else {
      const nx = active.map(p => ({p, s: nextSession(p)})).filter(x => x.s).sort((a, b) => (a.s.date + a.s.from).localeCompare(b.s.date + b.s.from))[0];
      if (nx) nowHtml = `<section class="spx-now spx-next"><div class="spx-now-h"><span class="spx-live spx-off">Next</span><b>${esc(nx.p.name)}</b><span>${nx.s.date === today() ? 'Today' : esc(fmtDate(nx.s.date))} · ${hm(nx.s.from)} – ${hm(nx.s.to)}</span></div>
        <div class="spx-tasks">${nx.s.tasks.map(k => taskRow(nx.p, nx.s, k)).join('')}</div></section>`;
    }
    const pendHtml = pend.length ? `<section class="spx-pend"><div class="spx-sec-h"><h3>⚠️ From earlier — still to learn (${pend.length})</h3><span class="spx-muted">Finish these first, or re-plan to spread them over the coming days.</span></div>
      <div class="spx-tasks">${pend.slice(0, 12).map(x => taskRow(x.p, x.s, x.k, true)).join('')}</div>${pend.length > 12 ? `<p class="spx-muted">+ ${pend.length - 12} more in your plans</p>` : ''}</section>` : '';
    const card = p => {
      const st = planStats(p);
      const pe = pendingFromEarlier(p).length;
      return `<article class="spx-card" data-id="${p.id}">
        <div class="spx-card-top"><h3>${esc(p.name)}</h3><span class="spx-pct">${st.pct}%</span></div>
        <p class="spx-muted">${esc(scopeLabel(p))}</p>
        <p class="spx-meta">🗓 ${esc(fmtDate(p.start))} – ${esc(fmtDate(p.end))}<br>⏰ ${p.slots.map(s => hm(s.from) + '–' + hm(s.to)).join(', ')}</p>
        <div class="spx-bar"><i style="width:${st.pct}%"></i></div>
        <div class="spx-chips">${Object.entries(st.byCat).map(([c, v]) => `<span title="${esc(CAT[c].en)}">${CAT[c].ic} ${v.done}/${v.n}</span>`).join('')}${st.checked ? `<span title="Tasks learnt by passing the check">🧠 ${st.checked}</span>` : ''}</div>
        ${pe ? `<p class="spx-warn">⚠️ ${pe} unfinished from earlier</p>` : ''}
        <div class="spx-card-act"><button type="button" class="spx-btn spx-pri" data-act="open">Open</button><button type="button" class="spx-btn" data-act="print">🖨 Print</button><button type="button" class="spx-btn" data-act="reset" title="Set the statistics of this plan back to 0%">↺ Reset</button><button type="button" class="spx-btn spx-del" data-act="del">Delete</button></div>
      </article>`;
    };
    root.innerHTML = `<div class="spx">
      <div class="spx-head"><div><h2>My study plans</h2><p class="spx-muted">Make a plan for a whole class, some subjects or a few chapters. SpaceBook counts every lesson, SLO, MCQ and question and tells you what to study each day.</p></div>
        <div class="spx-head-act">
          <button type="button" class="spx-btn" data-act="notify">${notif === 'granted' && remindersOn() ? '🔔 Reminders on' : notif === 'granted' ? '🔕 Reminders off' : '🔔 Turn on reminders'}</button>
          <button type="button" class="spx-btn spx-pri spx-big" data-act="new">＋ New plan</button></div></div>
      ${!signedIn ? `<p class="spx-note">💾 Plans are saved on this device. <a href="#" data-act="login">Log in</a> to keep them in your account and see them on every device.</p>` : ''}
      ${nowHtml}${pendHtml}
      ${active.length ? `<div class="spx-sec-h"><h3>Plans</h3></div><div class="spx-grid">${active.map(card).join('')}</div>` : !plans.length ? `<div class="spx-empty"><div>📅</div><h3>No study plan yet</h3><p>Pick what to study, the dates and your study times — SpaceBook does the rest.</p><button type="button" class="spx-btn spx-pri spx-big" data-act="new">＋ Make my first plan</button></div>` : ''}
      ${old.length ? `<details class="spx-old"><summary>Finished plans (${old.length})</summary><div class="spx-grid">${old.map(card).join('')}</div></details>` : ''}
    </div>`;
    const box = root.querySelector('.spx');
    bindTasks(box);
    box.addEventListener('click', e => {
      const a = e.target.closest('[data-act]'); if (!a || a.closest('.spx-task')) return;
      const cardEl = a.closest('.spx-card'), id = cardEl ? cardEl.dataset.id : null;
      const p = plans.find(x => x.id === id);
      switch (a.dataset.act) {
        case 'new': view = {mode: 'new'}; render(); break;
        case 'open': openPlan(id); break;
        case 'print': printPlan(p); break;
        case 'reset': if (resetPlan(p)) render(); break;
        case 'del': if (p && confirm('Delete the plan "' + p.name + '"? Its progress will be lost.')) { removePlan(p); render(); } break;
        case 'notify':
          if (!('Notification' in window) || Notification.permission !== 'granted') askPermission();
          else { try { localStorage.setItem('sb_study_reminders', remindersOn() ? 'off' : 'on'); } catch (er) { /* fine */ } render(); }
          break;
        case 'login': e.preventDefault(); window.SpaceBookAuth && SpaceBookAuth.open('login'); break;
      }
    });
  }

  // The days of a plan are cards, six in a row. A closed card says how far the day is (a percentage; a tick when every task is done); a click opens the
  // day under its row of cards, a second click closes it. Which days are open is kept for the plan while the page is drawn again.
  const openDays = {};
  function dayStats(ss) {
    let all = 0, done = 0, tasks = 0, full = 0;
    ss.forEach(s => s.tasks.forEach(k => {
      const w = k.cat === 'rev' ? 1 : CAT[k.cat].m * k.n, got = k.cat === 'rev' ? (k.done >= k.n ? 1 : 0) : CAT[k.cat].m * Math.min(k.done, k.n);
      all += w; done += got; tasks++; if (k.done >= k.n) full++;
    }));
    const complete = tasks > 0 && full === tasks;
    return {tasks, full, complete, pct: complete ? 100 : all ? Math.min(99, Math.round(done * 100 / all)) : 0, min: ss.reduce((a, s) => a + s.tasks.reduce((b, k) => b + taskMin(k), 0), 0)};
  }
  function renderPlan(p) {
    const root = shell(p.name);
    if (!root) return;
    const st = planStats(p);
    const byDate = {};
    p.sessions.forEach(s => { (byDate[s.date] = byDate[s.date] || []).push(s); });
    const t = today();
    const dates = Object.keys(byDate).sort();
    const open = openDays[p.id] = new Set([...(openDays[p.id] || [])].filter(d => byDate[d]));
    const dayStatus = ss => { const all = ss.flatMap(s => s.tasks); const done = all.filter(k => k.done >= k.n).length; return done === all.length ? 'ok' : done || all.some(k => k.done) ? 'part' : 'none'; };
    const dayDetail = d => {
      const ss = byDate[d], status = dayStatus(ss), past = d < t, m = dayStats(ss).min;
      const badge = d === t ? '<span class="spx-tag spx-today">Today</span>' : past ? (status === 'ok' ? '<span class="spx-tag spx-good">✅ Done</span>' : status === 'part' ? '<span class="spx-tag spx-mid">◐ Partly done</span>' : '<span class="spx-tag spx-bad">✖ Missed</span>') : '';
      return `<section class="spx-day${d === t ? ' spx-isToday' : ''}${past ? ' spx-past' : ''}" id="spx-d-${d}" data-day="${d}">
        <div class="spx-day-h"><h4>${esc(fmtDate(d))}</h4>${badge}<span class="spx-muted">${m ? '~' + dur(Math.round(m)) : ''}</span>${!past ? `<button type="button" class="spx-btn spx-sm spx-skipday" data-act="skipday" data-d="${d}" title="Take this day off; its work moves to the next study days">🚫 Skip this day</button>` : ''}<button type="button" class="spx-btn spx-sm spx-closeday" data-act="toggleday" data-d="${d}" title="Close this day">✕ Close</button></div>
        ${ss.map(s => `<div class="spx-sess"><div class="spx-sess-t">⏰ ${hm(s.from)} – ${hm(s.to)}${s.revision ? ' · Revision' : ''}</div><div class="spx-tasks">${s.tasks.map(k => taskRow(p, s, k)).join('')}</div></div>`).join('')}
      </section>`;
    };
    const dayCard = d => {
      const x = dayStats(byDate[d]), past = d < t, dt = parseYmd(d);
      const cls = x.complete ? 'ok' : past ? (x.pct ? 'part' : 'miss') : x.pct ? 'part' : 'next';
      const sub = past && !x.pct && !x.complete ? 'Missed' : x.tasks + (x.tasks === 1 ? ' task' : ' tasks') + (x.full && !x.complete ? ' · ' + x.full + ' done' : '') + (x.min ? ' · ~' + dur(Math.round(x.min)) : '');
      const label = fmtDate(d) + (d === t ? ' (today)' : '') + ': ' + (x.complete ? 'all done' : x.pct + '% done') + ', ' + x.full + ' of ' + x.tasks + ' tasks';
      return `<button type="button" class="spx-dc spx-dc-${cls}${d === t ? ' spx-dc-today' : ''}${open.has(d) ? ' spx-dc-open' : ''}" data-act="toggleday" data-d="${d}" aria-expanded="${open.has(d)}" aria-controls="spx-d-${d}" aria-label="${esc(label)}" title="${esc(label)}">
        <span class="spx-dc-d">${esc(DAYS[dt.getDay()])} <b>${dt.getDate()}</b> <small>${esc(dt.toLocaleDateString(undefined, {month: 'short'}))}</small></span>
        <span class="spx-dc-t" aria-hidden="true">${x.complete ? '✓' : ''}</span>
        <span class="spx-dc-p">${x.pct}<small>%</small></span>
        <span class="spx-dc-bar" aria-hidden="true"><i style="width:${x.pct}%"></i></span>
        <span class="spx-dc-s">${esc(d === t ? 'Today · ' + sub : sub)}</span>
      </button>`;
    };
    const days = dates.length ? dates.reduce((rows, d, i) => { if (i % 6 === 0) rows.push([]); rows[rows.length - 1].push(d); return rows; }, []).map(r =>
      `<div class="spx-dayrow">${r.map(dayCard).join('')}</div><div class="spx-daydetails" data-days="${r.join(',')}">${r.filter(d => open.has(d)).map(dayDetail).join('')}</div>`).join('') : '';
    const keepY = view.shown ? window.scrollY : null;
    const pend = pendingFromEarlier(p);
    root.innerHTML = `<div class="spx">
      <div class="spx-head"><div><button type="button" class="spx-btn spx-sm" data-act="back">← All plans</button><h2>${esc(p.name)}</h2>
        <p class="spx-muted">${esc(scopeLabel(p))} · ${esc(fmtDate(p.start))} – ${esc(fmtDate(p.end))} · ${p.slots.map(s => hm(s.from) + '–' + hm(s.to)).join(', ')} · ${esc(ruleLabel(planRule(p)))}</p></div>
        <div class="spx-head-act"><button type="button" class="spx-btn" data-act="today">Jump to today</button><button type="button" class="spx-btn" data-act="days" title="Choose study days, skip dates or add extra days">📅 Days &amp; dates</button><button type="button" class="spx-btn" data-act="replan" title="Spread everything not done yet over the remaining days">↻ Re-plan the rest</button><button type="button" class="spx-btn" data-act="reset" title="Set the statistics of this plan back to 0%">↺ Reset statistics</button><button type="button" class="spx-btn" data-act="print">🖨 Print</button></div></div>
      <div class="spx-stats">
        <div class="spx-stat"><b>${st.pct}%</b><span>done</span><div class="spx-bar"><i style="width:${st.pct}%"></i></div></div>
        <div class="spx-stat"><b>${dur(Math.round(st.done))}</b><span>of ${dur(Math.round(st.all))} studied</span></div>
        <div class="spx-stat"><b>${p.sessions.length}</b><span>study sessions</span></div>
        <div class="spx-stat"><b class="${pend.length ? 'spx-red' : ''}">${pend.length}</b><span>unfinished from earlier</span></div>
      </div>
      <div class="spx-chips spx-chips-lg">${Object.entries(st.byCat).map(([c, v]) => `<span>${CAT[c].ic} ${esc(CAT[c].en)} <b>${v.done}/${v.n}</b></span>`).join('')}${st.tasks ? `<span title="Tasks learnt by passing the check of questions from the book">🧠 Learnt and checked <b>${st.checked}/${st.tasks}</b> tasks</span>` : ''}</div>
      ${recordHtml(p)}
      <section class="spx-dayedit" data-el="dayedit" hidden></section>
      ${pend.length ? `<section class="spx-pend"><div class="spx-sec-h"><h3>⚠️ From earlier — still to learn</h3><span class="spx-muted">These were planned for days that have passed.</span></div><div class="spx-tasks">${pend.map(x => taskRow(p, x.s, x.k, true)).join('')}</div></section>` : ''}
      <div class="spx-days">${days || '<p class="spx-muted">No sessions in this plan.</p>'}</div>
    </div>`;
    const box = root.querySelector('.spx');
    bindTasks(box);
    function toggleDay(d, scroll) {
      const card = box.querySelector('.spx-dc[data-d="' + d + '"]'); if (!card) return;
      if (open.has(d)) open.delete(d); else open.add(d);
      const host = card.closest('.spx-dayrow').nextElementSibling, inRow = host.dataset.days.split(',');
      host.innerHTML = inRow.filter(x => open.has(x)).map(dayDetail).join('');
      inRow.forEach(x => { const c = box.querySelector('.spx-dc[data-d="' + x + '"]'); c.classList.toggle('spx-dc-open', open.has(x)); c.setAttribute('aria-expanded', String(open.has(x))); });
      if (scroll !== false && open.has(d)) { const el = document.getElementById('spx-d-' + d); if (el) el.scrollIntoView({block: 'nearest', behavior: 'smooth'}); }
    }
    box.addEventListener('click', e => {
      const a = e.target.closest('[data-act]'); if (!a || a.closest('.spx-task')) return;
      if (a.dataset.act === 'back') { view = {mode: 'list'}; render(); }
      else if (a.dataset.act === 'print') printPlan(p);
      else if (a.dataset.act === 'reset') { if (resetPlan(p)) render(); }
      else if (a.dataset.act === 'replan') { if (confirm('Spread everything not done yet over the days left in this plan?')) { replan(p); render(); } }
      else if (a.dataset.act === 'today') jumpToday(true);
      else if (a.dataset.act === 'toggleday') toggleDay(a.dataset.d);
      else if (a.dataset.act === 'skipday') {
        const d = a.dataset.d;
        const busy = p.sessions.some(s => s.date === d && s.tasks.some(k => k.done > 0));
        if (!confirm(`Take ${fmtDate(d)} off?${busy ? ' Work you already ticked on that day stays done.' : ''} Its unfinished work moves to your next study days.`)) return;
        p.skip = [...new Set((p.skip || []).concat(d))].sort();
        p.extra = (p.extra || []).filter(x => x !== d);
        // keep finished work of that day; everything else is re-planned
        replan(p, d);
        render();
      }
      else if (a.dataset.act === 'days') openDayEditor();
    });
    function openDayEditor() {
      const ed = box.querySelector('[data-el="dayedit"]');
      if (!ed.hidden) { ed.hidden = true; return; }
      const from = t > p.start ? t : p.start;
      const rule = Object.assign(planRule(p), {altFrom: p.start});
      let end = p.end;
      const draw = () => {
        ed.innerHTML = `<div class="spx-sec-h"><h3>📅 Days &amp; dates</h3><span class="spx-muted">Changes apply from today; finished work stays where it is.</span></div>
          <div class="spx-row"><label>Last day of the plan <input type="date" data-rule-end value="${end}" min="${from}"></label></div>
          ${daysEditorHtml(rule, p.start, end, from)}
          <div class="spx-row spx-mt"><button type="button" class="spx-btn spx-pri" data-dsave>Save &amp; re-plan</button><button type="button" class="spx-btn" data-dcancel>Cancel</button>
          <span class="spx-muted">${studyDates(from, end, rule, p.start).length} study days left</span></div>`;
      };
      draw();
      ed.hidden = false;
      ed.scrollIntoView({block: 'start', behavior: 'smooth'});
      ed.onclick = e => {
        if (e.target.closest('[data-dcancel]')) { ed.hidden = true; return; }
        if (e.target.closest('[data-dsave]')) {
          if (!studyDates(from, end, rule, p.start).length) { alert('Choose at least one study day from today onwards.'); return; }
          p.weekdays = rule.weekdays.slice().sort(); p.skip = rule.skip; p.extra = rule.extra; p.alt = rule.alt; p.end = end;
          replan(p); render(); return;
        }
        const b = e.target.closest('button[data-rule]');
        if (b && applyRuleEvent(b, rule, ed, p.start, end)) draw();
      };
      ed.onchange = e => {
        if (e.target.hasAttribute('data-rule-end')) { if (e.target.value && e.target.value >= from) { end = e.target.value; draw(); } return; }
        if (e.target.matches('input[type="checkbox"][data-rule]') && applyRuleEvent(e.target, rule, ed, p.start, end)) draw();
      };
    }
    // the first time the plan is shown the page goes to today's card; when it is drawn again (a task was ticked) it stays where it was
    if (keepY != null) window.scrollTo(0, keepY); else setTimeout(jumpToday, 50);
    view.shown = true;
    function jumpToday(openIt) {
      const d = byDate[t] ? t : dates.find(x => x >= t); if (!d) return;
      const card = box.querySelector('.spx-dc[data-d="' + d + '"]'); if (!card) return;
      if (openIt && !open.has(d)) toggleDay(d, false);
      const el = openIt ? document.getElementById('spx-d-' + d) : card; if (el) el.scrollIntoView({block: 'start', behavior: 'smooth'});
    }
  }

  // ---------- new plan wizard ----------
  function renderWizard() {
    const root = shell('New plan', 'Choose what to study, when, and for how long');
    if (!root) return;
    const idx = INDEX();
    if (!idx.classes.length) { root.innerHTML = '<div class="spx"><p>The book index is missing (js/study_plan_index.js).</p></div>'; return; }
    let cur = 'cls9'; try { cur = state.selectedClass || cur; } catch (e) { /* fine */ }
    if (!classOf(cur)) cur = idx.classes[0].id;
    const start = new Date(); const end = new Date(); end.setDate(end.getDate() + 30);
    const f = {classId: cur, sel: {}, cats: CATS.map(c => c[0]), start: ymd(start), end: ymd(end), rule: ruleOf(null), slots: [{from: '16:00', to: '17:30'}], revision: true, name: ''};
    const selectAll = () => { f.sel = {}; (classOf(f.classId).subjects || []).forEach(s => { f.sel[s.id] = new Set(s.chapters.map((_, i) => i)); }); };
    selectAll();
    root.innerHTML = `<div class="spx spx-wiz">
      <div class="spx-head"><div><button type="button" class="spx-btn spx-sm" data-act="back">← All plans</button><h2>New study plan</h2></div></div>
      <div class="spx-wiz-grid">
        <div class="spx-wiz-main">
          <section class="spx-step"><h3><i>1</i> What do you want to study?</h3>
            <div class="spx-row"><label>Class <select data-f="class">${idx.classes.map(c => `<option value="${c.id}" ${c.id === f.classId ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>
              <button type="button" class="spx-btn spx-sm" data-act="all">Whole class</button><button type="button" class="spx-btn spx-sm" data-act="none">Clear</button></div>
            <p class="spx-muted">Tick whole subjects, or open a subject to choose single chapters.</p>
            <div class="spx-tree" data-el="tree"></div></section>
          <section class="spx-step"><h3><i>2</i> Which kinds of work?</h3><div class="spx-cats" data-el="cats"></div></section>
          <section class="spx-step"><h3><i>3</i> From when to when?</h3>
            <div class="spx-row"><label>Start <input type="date" data-f="start" value="${f.start}"></label><label>End <input type="date" data-f="end" value="${f.end}"></label></div>
            <div data-el="rules"></div></section>
          <section class="spx-step"><h3><i>4</i> Study times each day</h3><div data-el="slots"></div>
            <button type="button" class="spx-btn spx-sm" data-act="addslot">＋ Add another time</button>
            <p class="spx-muted">Add as many times as you like, e.g. 30 minutes after Fajr and 1½ hours after school.</p></section>
          <section class="spx-step"><h3><i>5</i> Name and options</h3>
            <div class="spx-row"><label class="spx-grow">Plan name <input type="text" data-f="name" maxlength="80" placeholder="e.g. Annual exam preparation"></label></div>
            <label class="spx-check"><input type="checkbox" data-f="rev" checked> Keep the last study day for revision</label></section>
        </div>
        <aside class="spx-wiz-side"><div class="spx-preview" data-el="preview"></div></aside>
      </div></div>`;
    const box = root.querySelector('.spx');
    const el = n => box.querySelector('[data-el="' + n + '"]');
    function totals() {
      const t = {};
      (classOf(f.classId).subjects || []).forEach(s => (f.sel[s.id] ? [...f.sel[s.id]] : []).forEach(i => Object.entries((s.chapters[i] || {}).c || {}).forEach(([k, v]) => { t[k] = (t[k] || 0) + v; })));
      return t;
    }
    function drawTree() {
      el('tree').innerHTML = (classOf(f.classId).subjects || []).map(s => {
        const set = f.sel[s.id] || new Set();
        const all = set.size === s.chapters.length && s.chapters.length, some = set.size > 0 && !all;
        return `<details class="spx-subj" data-s="${s.id}"><summary><label class="spx-chk" onclick="event.stopPropagation()"><input type="checkbox" data-sub="${s.id}" ${all ? 'checked' : ''} ${some ? 'data-some="1"' : ''}><span></span></label>
          <span class="spx-s-name">${esc(s.emoji)} ${esc(s.name)} <small>${esc(s.ur)}</small></span><span class="spx-s-count">${set.size}/${s.chapters.length} chapters</span></summary>
          <div class="spx-chs">${s.chapters.map((c, i) => { const cc = Object.entries(c.c).filter(([k]) => k !== 'read').map(([k, v]) => CAT[k].ic + v).join(' ');
            const ch = shortCh(c.t);
            return `<label class="spx-ch"><input type="checkbox" data-ch="${i}" data-sub="${s.id}" ${set.has(i) ? 'checked' : ''}><span class="spx-chno">${esc(ch.no)}</span><span class="spx-chname">${esc(ch.name)}</span><span class="spx-chc">${cc}</span></label>`; }).join('')}</div></details>`;
      }).join('');
      $$('input[data-some]', el('tree')).forEach(i => { i.indeterminate = true; });
    }
    function drawCats() {
      const t = totals();
      el('cats').innerHTML = CATS.filter(([k]) => t[k]).map(([k, en, ur, m, ic]) => `<label class="spx-cat"><input type="checkbox" value="${k}" data-f="cat" ${f.cats.includes(k) ? 'checked' : ''}><span>${ic} ${en}<small>${ur}</small><b>${t[k]}</b></span></label>`).join('') || '<p class="spx-muted">Choose at least one chapter.</p>';
    }
    function drawSlots() {
      el('slots').innerHTML = f.slots.map((s, i) => `<div class="spx-slot" data-i="${i}"><input type="time" value="${s.from}" data-f="from"> to <input type="time" value="${s.to}" data-f="to"><span class="spx-muted">${dur(slotMin(s))}</span>${f.slots.length > 1 ? `<button type="button" class="spx-x" data-act="delslot" aria-label="Remove">×</button>` : ''}</div>`).join('');
    }
    function scopeNow() { return (classOf(f.classId).subjects || []).filter(s => f.sel[s.id] && f.sel[s.id].size).map(s => ({subj: s.id, ch: [...f.sel[s.id]].sort((a, b) => a - b)})); }
    function drawPreview() {
      const t = totals();
      const cats = f.cats.filter(k => t[k]);
      const scope = scopeNow();
      const dates = f.start && f.end && f.end >= f.start ? studyDates(f.start, f.end, f.rule) : [];
      const studyDays = f.revision && dates.length >= 3 ? dates.length - 1 : dates.length;
      const perDay = f.slots.reduce((a, s) => a + slotMin(s), 0);
      const need = cats.reduce((a, k) => a + t[k] * CAT[k].m, 0);
      const have = studyDays * perDay;
      const fit = have ? need / have : 0;
      const autoName = (() => { const C = classOf(f.classId); if (scope.length === 1) { const S = subjOf(f.classId, scope[0].subj); return C.name + ' ' + S.name; } return C.name + (scope.length === C.subjects.length ? ' — all subjects' : ' — ' + scope.length + ' subjects'); })();
      const nameIn = box.querySelector('[data-f="name"]'); if (nameIn) nameIn.placeholder = autoName || 'Plan name';
      const errors = [];
      if (!scope.length) errors.push('Choose at least one subject or chapter.');
      if (!cats.length) errors.push('Choose at least one kind of work.');
      if (!dates.length) errors.push('Choose dates (end after start) and at least one study day.');
      if (f.slots.some(s => mins(s.to) <= mins(s.from))) errors.push('Each study time must end after it starts.');
      el('preview').innerHTML = `<h3>Your plan</h3>
        <div class="spx-pv-big"><b>${scope.reduce((a, s) => a + s.ch.length, 0)}</b> chapters · <b>${scope.length}</b> subject${scope.length === 1 ? '' : 's'}</div>
        <ul class="spx-pv-list">${cats.map(k => `<li><span>${CAT[k].ic} ${CAT[k].en}</span><b>${t[k]}</b><em>${studyDays ? '≈ ' + Math.ceil(t[k] / studyDays) + '/day' : ''}</em></li>`).join('')}</ul>
        <div class="spx-pv-row"><span>Study days</span><b>${studyDays}${f.revision && dates.length >= 3 ? ' + 1 revision' : ''}</b></div>
        <div class="spx-pv-row"><span>Time per day</span><b>${dur(perDay)}</b></div>
        <div class="spx-pv-row"><span>Work needed</span><b>~${dur(Math.round(need))}</b></div>
        <div class="spx-pv-row"><span>Time you have</span><b>${dur(have)}</b></div>
        ${have ? `<div class="spx-fit ${fit > 1.15 ? 'spx-tight' : fit < 0.5 ? 'spx-easy' : 'spx-okfit'}">${fit > 1.15 ? `⚠️ Tight: you need about ${Math.round(fit * 100)}% of your time. Add days or time, or choose fewer kinds of work.` : fit < 0.5 ? `🙂 Relaxed: about ${dur(Math.round(need / Math.max(1, studyDays)))} of work per day.` : `👍 Good fit: about ${dur(Math.round(need / Math.max(1, studyDays)))} of work per day.`}</div>` : ''}
        ${errors.length ? `<ul class="spx-err">${errors.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        <button type="button" class="spx-btn spx-pri spx-big spx-wide" data-act="create" ${errors.length ? 'disabled' : ''}>Create plan</button>`;
      return {scope, cats, autoName, ok: !errors.length};
    }
    function drawRules() {
      // drop skipped / extra dates that fall outside the chosen period
      f.rule.skip = f.rule.skip.filter(d => d >= f.start && d <= f.end);
      f.rule.extra = f.rule.extra.filter(d => d >= f.start && d <= f.end);
      el('rules').innerHTML = daysEditorHtml(f.rule, f.start, f.end);
    }
    const redraw = () => { drawCats(); drawPreview(); };
    drawTree(); drawSlots(); drawRules(); redraw();
    box.addEventListener('change', e => {
      const i = e.target;
      if (i.dataset.f === 'class') { f.classId = i.value; selectAll(); drawTree(); return redraw(); }
      if (i.dataset.sub && i.dataset.ch === undefined) {
        const S = subjOf(f.classId, i.dataset.sub); f.sel[S.id] = i.checked ? new Set(S.chapters.map((_, n) => n)) : new Set();
        const det = i.closest('.spx-subj'); const open = det.open; drawTree(); box.querySelector(`.spx-subj[data-s="${S.id}"]`).open = open; return redraw();
      }
      if (i.dataset.ch !== undefined) {
        const set = f.sel[i.dataset.sub] = f.sel[i.dataset.sub] || new Set();
        if (i.checked) set.add(+i.dataset.ch); else set.delete(+i.dataset.ch);
        const det = i.closest('.spx-subj'); const sid = det.dataset.s; drawTree(); box.querySelector(`.spx-subj[data-s="${sid}"]`).open = true; return redraw();
      }
      if (i.dataset.f === 'cat') { f.cats = $$('[data-f="cat"]:checked', box).map(x => x.value).concat(f.cats.filter(k => !box.querySelector(`[data-f="cat"][value="${k}"]`))); return drawPreview(); }
      if (i.dataset.f === 'start' || i.dataset.f === 'end') { f[i.dataset.f] = i.value; drawRules(); return drawPreview(); }
      if (i.matches('input[type="checkbox"][data-rule]')) { if (applyRuleEvent(i, f.rule, el('rules'), f.start, f.end)) { drawRules(); drawPreview(); } return; }
      if (i.dataset.f === 'from' || i.dataset.f === 'to') { if (!/^\d\d:\d\d/.test(i.value)) return; const k = +i.closest('.spx-slot').dataset.i; f.slots[k][i.dataset.f] = i.value.slice(0, 5); drawSlots(); return drawPreview(); }
      if (i.dataset.f === 'rev') { f.revision = i.checked; return drawPreview(); }
    });
    box.addEventListener('input', e => { if (e.target.dataset.f === 'name') f.name = e.target.value; });
    box.addEventListener('click', e => {
      const rb = e.target.closest('button[data-rule]');
      if (rb) { if (applyRuleEvent(rb, f.rule, el('rules'), f.start, f.end)) { drawRules(); drawPreview(); } return; }
      const a = e.target.closest('[data-act]'); if (!a) return;
      if (a.dataset.act === 'back') { view = {mode: 'list'}; render(); }
      else if (a.dataset.act === 'all') { selectAll(); drawTree(); redraw(); }
      else if (a.dataset.act === 'none') { f.sel = {}; drawTree(); redraw(); }
      else if (a.dataset.act === 'addslot') { const last = f.slots[f.slots.length - 1]; const st = Math.min(23 * 60, mins(last.to) + 60); f.slots.push({from: pad(Math.floor(st / 60)) + ':' + pad(st % 60), to: pad(Math.floor(Math.min(1439, st + 60) / 60)) + ':' + pad(Math.min(1439, st + 60) % 60)}); drawSlots(); drawPreview(); }
      else if (a.dataset.act === 'delslot') { f.slots.splice(+a.closest('.spx-slot').dataset.i, 1); drawSlots(); drawPreview(); }
      else if (a.dataset.act === 'create') {
        const pv = drawPreview(); if (!pv.ok) return;
        const p = createPlan({name: (f.name || '').trim() || pv.autoName, classId: f.classId, scope: pv.scope, cats: pv.cats, start: f.start, end: f.end,
          weekdays: f.rule.weekdays.slice().sort(), skip: f.rule.skip.slice(), extra: f.rule.extra.slice(), alt: f.rule.alt, slots: f.slots.map(s => ({...s})).sort((x, y) => x.from.localeCompare(y.from)), revision: f.revision});
        plans.push(p); persist(p);
        if ('Notification' in window && Notification.permission === 'default') askPermission();
        openPlan(p.id);
      }
    });
  }

  // ---------- styles ----------
  const CSS = `
  .spx,#spx-banner,#spx-studybar{--spx-acc:var(--blue,#0284c7);--spx-acc2:var(--blue-dark,#0369a1);--spx-soft:var(--blue-light,#e0f2fe)}
  .spx{color:var(--text,#0f172a);max-width:1200px}
  .spx h2{margin:.3rem 0 .2rem;font-size:1.5rem}.spx h3{margin:0;font-size:1.05rem}.spx-muted{color:var(--text-muted,#64748b);font-size:.88rem;margin:.15rem 0}
  .spx-head{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;flex-wrap:wrap;margin-bottom:1rem}.spx-head-act{display:flex;gap:.5rem;flex-wrap:wrap}
  .spx-btn{display:inline-flex;align-items:center;gap:.35rem;border:1px solid var(--border,#e2e8f0);background:#fff;color:var(--text,#0f172a);border-radius:10px;padding:.5rem .9rem;font:600 .9rem inherit;font-family:inherit;cursor:pointer;transition:background .15s,border-color .15s}
  .spx-btn:hover{border-color:var(--spx-acc);background:var(--spx-soft)}.spx-btn:disabled{opacity:.5;cursor:not-allowed}
  .spx-pri{background:var(--spx-acc);border-color:var(--spx-acc);color:#fff}.spx-pri:hover{background:var(--spx-acc2);border-color:var(--spx-acc2)}
  .spx-big{padding:.7rem 1.2rem;font-size:1rem}.spx-sm{padding:.3rem .65rem;font-size:.82rem}.spx-wide{width:100%;justify-content:center;margin-top:.8rem}
  .spx-del:hover{border-color:#e11d48;background:#ffe4e6;color:#be123c}.spx-ok{background:#059669;border-color:#059669;color:#fff}
  .spx-x{border:0;background:none;font-size:1.3rem;line-height:1;cursor:pointer;color:#64748b;padding:0 .3rem}
  .spx-note{background:#fef3c7;border:1px solid #fcd34d;border-radius:10px;padding:.55rem .8rem;font-size:.9rem;margin:0 0 1rem}
  .spx-sec-h{display:flex;align-items:baseline;gap:.8rem;flex-wrap:wrap;margin:1.3rem 0 .6rem}
  .spx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(290px,100%),1fr));gap:1rem}
  .spx-card{background:var(--card-bg,#fff);border:1px solid var(--border,#e2e8f0);border-radius:var(--radius,14px);padding:1.1rem;box-shadow:var(--shadow,0 4px 14px rgba(0,0,0,.06));display:flex;flex-direction:column;gap:.35rem}
  .spx-card-top{display:flex;justify-content:space-between;gap:.5rem;align-items:flex-start}.spx-pct{font-weight:800;color:var(--spx-acc2);font-size:1.1rem}
  .spx-meta{font-size:.86rem;margin:.2rem 0}.spx-card-act{display:flex;gap:.4rem;margin-top:.5rem;flex-wrap:wrap}
  .spx-bar{height:8px;border-radius:99px;background:#e2e8f0;overflow:hidden}.spx-bar i{display:block;height:100%;background:linear-gradient(90deg,#0284c7,#059669);border-radius:99px}
  .spx-chips{display:flex;flex-wrap:wrap;gap:.3rem}.spx-chips span{font-size:.78rem;background:#f1f5f9;border-radius:99px;padding:.15rem .5rem}
  .spx-chips-lg{margin:.6rem 0 1rem}.spx-chips-lg span{font-size:.86rem;padding:.3rem .7rem;background:#fff;border:1px solid var(--border,#e2e8f0)}
  .spx-warn{color:#b45309;font-size:.85rem;font-weight:600;margin:.2rem 0}.spx-red{color:#e11d48}
  .spx-empty{text-align:center;padding:3rem 1rem;border:2px dashed var(--border,#e2e8f0);border-radius:16px}.spx-empty>div{font-size:3rem}.spx-empty h3{font-size:1.3rem;margin:.4rem 0}
  .spx-now{border:2px solid #059669;background:#f0fdf4;border-radius:16px;padding:1rem;margin-bottom:1rem}.spx-now.spx-next{border-color:#bae6fd;background:#f0f9ff}
  .spx-now-h{display:flex;gap:.7rem;align-items:center;flex-wrap:wrap;margin-bottom:.6rem}.spx-live{background:#059669;color:#fff;border-radius:99px;padding:.1rem .6rem;font-weight:800;font-size:.8rem;animation:spxBlink 2s infinite}
  .spx-live.spx-off{background:#0284c7;animation:none}@keyframes spxBlink{50%{opacity:.55}}
  .spx-pend{border:1px solid #fcd34d;background:#fffbeb;border-radius:16px;padding:.4rem 1rem 1rem;margin-bottom:1rem}.spx-pend .spx-sec-h{margin-top:.6rem}
  .spx-tasks{display:flex;flex-direction:column;gap:.45rem}
  .spx-task{display:flex;align-items:center;gap:.7rem;background:#fff;border:1px solid var(--border,#e2e8f0);border-radius:12px;padding:.55rem .7rem}
  .spx-task.spx-done{opacity:.6}.spx-task.spx-done .spx-work{text-decoration:line-through}
  .spx-tk-main{flex:1;min-width:0}.spx-tk-top{display:flex;gap:.45rem;align-items:baseline;flex-wrap:wrap;font-size:.84rem;color:#475569}
  .spx-subj{font-weight:700;color:var(--text,#0f172a)}.spx-chno{background:var(--spx-soft);color:var(--spx-acc2);border-radius:6px;padding:0 .35rem;font-weight:700;font-size:.78rem}
  .spx-chname{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}.spx-when{color:#b45309;font-weight:700}
  .spx-work{font-weight:600;margin-top:.1rem}.spx-min{color:#94a3b8;font-weight:500;font-size:.8rem}
  .spx-part{font-size:.78rem;color:#64748b;white-space:nowrap}.spx-part input{width:3.6rem;padding:.15rem .3rem;border:1px solid var(--border,#e2e8f0);border-radius:6px;font:inherit}
  .spx-chk{position:relative;display:inline-flex;cursor:pointer}.spx-chk input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}
  .spx-chk span{width:22px;height:22px;border:2px solid #94a3b8;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;background:#fff;transition:all .15s}
  .spx-chk input:checked+span{background:#059669;border-color:#059669}.spx-chk input:checked+span::after{content:'✓';color:#fff;font-weight:900;font-size:14px}
  .spx-chk input:indeterminate+span{background:#bae6fd;border-color:#0284c7}.spx-chk input:focus-visible+span{outline:2px solid var(--spx-acc);outline-offset:2px}
  .spx-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:.8rem}
  .spx-stat{background:#fff;border:1px solid var(--border,#e2e8f0);border-radius:14px;padding:.8rem 1rem}.spx-stat b{font-size:1.5rem;display:block}.spx-stat span{color:#64748b;font-size:.85rem}.spx-stat .spx-bar{margin-top:.4rem}
  .spx-days{display:flex;flex-direction:column;gap:.6rem}
  .spx-dayrow{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:.6rem}
  .spx-daydetails{display:flex;flex-direction:column;gap:.8rem}.spx-daydetails:empty{display:none}
  .spx-dc{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"d t" "p p" "b b" "s s";align-items:center;gap:.2rem .4rem;min-width:0;text-align:left;font:inherit;color:var(--text,#0f172a);background:#fff;border:1px solid var(--border,#e2e8f0);border-radius:14px;padding:.55rem .7rem .5rem;cursor:pointer;scroll-margin-top:90px;transition:border-color .15s,box-shadow .15s}
  .spx-dc:hover{border-color:var(--spx-acc)}.spx-dc:focus-visible{outline:3px solid var(--spx-acc);outline-offset:2px}
  .spx-dc-d{grid-area:d;display:flex;align-items:baseline;gap:.3rem;font-size:.82rem;font-weight:700;color:#475569;white-space:nowrap;overflow:hidden}.spx-dc-d b{font-size:1.2rem;color:var(--text,#0f172a)}.spx-dc-d small{font-weight:600;font-size:.74rem}
  .spx-dc-t{grid-area:t;font-size:1.15rem;font-weight:800;color:#15803d;line-height:1}
  .spx-dc-p{grid-area:p;font-size:1.55rem;font-weight:800;line-height:1.1;font-variant-numeric:tabular-nums}.spx-dc-p small{font-size:.8rem;font-weight:700;margin-left:.1rem;color:#64748b}
  .spx-dc-bar{grid-area:b;height:6px;border-radius:99px;background:#e2e8f0;overflow:hidden}.spx-dc-bar i{display:block;height:100%;border-radius:99px;background:var(--spx-acc)}
  .spx-dc-s{grid-area:s;font-size:.72rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .spx-dc-ok{background:#f0fdf4;border-color:#86efac}.spx-dc-ok .spx-dc-bar i{background:#16a34a}.spx-dc-ok .spx-dc-p{color:#166534}
  .spx-dc-part .spx-dc-bar i{background:#f59e0b}
  .spx-dc-miss{background:#fef2f2;border-color:#fecaca}.spx-dc-miss .spx-dc-p{color:#b91c1c}.spx-dc-miss .spx-dc-s{color:#b91c1c;font-weight:700}
  .spx-dc-today{border:2px solid var(--spx-acc);box-shadow:0 0 0 3px var(--spx-soft);padding:calc(.55rem - 1px) calc(.7rem - 1px) calc(.5rem - 1px)}
  .spx-dc-open{border-color:var(--spx-acc2);box-shadow:0 0 0 3px var(--spx-soft)}
  .spx-closeday{margin-left:auto}
  @media (max-width:640px){
    .spx-dayrow{gap:.35rem}
    .spx-dc{grid-template-columns:1fr;grid-template-areas:"d" "p" "b";justify-items:stretch;gap:.15rem;padding:.4rem .3rem .4rem;border-radius:10px;text-align:center}
    .spx-dc-d{justify-content:center;font-size:.62rem;gap:.15rem;flex-wrap:wrap;line-height:1.1}.spx-dc-d b{font-size:.95rem}.spx-dc-d small{display:none}
    .spx-dc-p{font-size:.95rem}.spx-dc-p small{font-size:.58rem;margin:0}.spx-dc-bar{height:4px}.spx-dc-s{display:none}
    .spx-dc-t{display:none}.spx-dc-ok .spx-dc-p::before{content:'✓';margin-right:.15rem;color:#15803d;font-size:.8rem}.spx-dc-today{padding:calc(.4rem - 1px) calc(.3rem - 1px)}
  }
  .spx-day{border:1px solid var(--border,#e2e8f0);border-radius:16px;padding:.8rem 1rem;background:#fff;scroll-margin-top:90px}
  .spx-day.spx-isToday{border:2px solid var(--spx-acc);box-shadow:0 0 0 4px var(--spx-soft)}.spx-day.spx-past{background:#f8fafc}
  .spx-day-h{display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;margin-bottom:.4rem}.spx-day-h h4{margin:0;font-size:1rem}
  .spx-tag{border-radius:99px;padding:.1rem .55rem;font-size:.75rem;font-weight:700}.spx-today{background:var(--spx-acc);color:#fff}.spx-good{background:#d1fae5;color:#065f46}.spx-mid{background:#fef3c7;color:#92400e}.spx-bad{background:#ffe4e6;color:#be123c}
  .spx-sess{margin-top:.4rem}.spx-sess-t{font-size:.82rem;font-weight:700;color:#475569;margin-bottom:.3rem}
  .spx-old{margin-top:1.4rem}.spx-old summary{cursor:pointer;font-weight:700;margin-bottom:.7rem}
  .spx-wiz-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:1.2rem;align-items:start}
  .spx-step{background:#fff;border:1px solid var(--border,#e2e8f0);border-radius:16px;padding:1rem 1.1rem;margin-bottom:1rem}
  .spx-step h3{display:flex;align-items:center;gap:.5rem;margin-bottom:.7rem}.spx-step h3 i{font-style:normal;background:var(--spx-acc);color:#fff;border-radius:99px;width:1.6rem;height:1.6rem;display:inline-flex;align-items:center;justify-content:center;font-size:.85rem}
  .spx-row{display:flex;gap:.8rem;flex-wrap:wrap;align-items:flex-end;margin-bottom:.5rem}.spx-row label{display:flex;flex-direction:column;gap:.2rem;font-size:.82rem;font-weight:600;color:#475569}
  .spx-grow{flex:1;min-width:220px}
  .spx select,.spx input[type=date],.spx input[type=time],.spx input[type=text]{font:inherit;font-size:.95rem;padding:.45rem .6rem;border:1px solid #cbd5e1;border-radius:9px;background:#fff;color:inherit}
  .spx-tree{display:flex;flex-direction:column;gap:.35rem;max-height:460px;overflow:auto;padding-right:.2rem}
  .spx-subj{border:1px solid var(--border,#e2e8f0);border-radius:12px;background:#fff}.spx-subj summary{display:flex;align-items:center;gap:.6rem;padding:.5rem .7rem;cursor:pointer;list-style:none}
  .spx-subj summary::-webkit-details-marker{display:none}.spx-subj summary::after{content:'▾';color:#94a3b8;margin-left:.2rem}.spx-subj[open] summary::after{content:'▴'}
  .spx-s-name{flex:1;font-weight:700}.spx-s-name small{color:#94a3b8;font-weight:500;margin-left:.3rem}.spx-s-count{font-size:.8rem;color:#64748b;white-space:nowrap}
  .spx-chs{border-top:1px solid var(--border-subtle,#f1f5f9);padding:.35rem .7rem .6rem 2.6rem;display:flex;flex-direction:column;gap:.15rem}
  .spx-ch{display:flex;align-items:center;gap:.5rem;font-size:.88rem;padding:.2rem 0;cursor:pointer}.spx-ch .spx-chname{flex:1}.spx-chc{font-size:.72rem;color:#64748b;white-space:nowrap}
  .spx-cats{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:.5rem}
  .spx-cat input,.spx-pill input{position:absolute;opacity:0}.spx-cat,.spx-pill{position:relative;cursor:pointer}
  .spx-cat span{display:grid;grid-template-columns:1fr auto;gap:0 .5rem;border:2px solid var(--border,#e2e8f0);border-radius:12px;padding:.5rem .7rem;font-weight:600;font-size:.9rem}
  .spx-cat small{grid-column:1;color:#94a3b8;font-weight:500}.spx-cat b{grid-row:1/span 2;grid-column:2;align-self:center;color:var(--spx-acc2)}
  .spx-cat input:checked+span{border-color:var(--spx-acc);background:var(--spx-soft)}.spx-cat input:focus-visible+span,.spx-pill input:focus-visible+span{outline:2px solid var(--spx-acc)}
  .spx-days-pick{display:flex;gap:.4rem;flex-wrap:wrap}.spx-pill span{display:inline-block;border:2px solid var(--border,#e2e8f0);border-radius:99px;padding:.3rem .8rem;font-weight:700;font-size:.85rem}
  .spx-pill input:checked+span{background:var(--spx-acc);border-color:var(--spx-acc);color:#fff}
  .spx-pill input{position:absolute;opacity:0;width:1px;height:1px}.spx-pill{position:relative;cursor:pointer}
  .spx-rules{display:flex;flex-direction:column;gap:.7rem;margin-top:.6rem}.spx-rl{display:flex;flex-direction:column;gap:.35rem}
  .spx-rl-h{font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted,#64748b)}
  .spx-presets,.spx-datechips{display:flex;gap:.4rem;flex-wrap:wrap}
  .spx-chipb{border:1px solid var(--border,#e2e8f0);background:#fff;border-radius:99px;padding:.3rem .8rem;font:600 .82rem inherit;font-family:inherit;cursor:pointer;color:var(--text,#0f172a)}
  .spx-chipb:hover{border-color:var(--spx-acc)}.spx-chipb.on{background:var(--spx-soft);border-color:var(--spx-acc);color:var(--spx-acc2)}
  .spx-skiprow{align-items:flex-end}
  .spx-dchip{display:inline-flex;align-items:center;gap:.3rem;border-radius:8px;padding:.2rem .3rem .2rem .55rem;font-size:.82rem;font-weight:600}
  .spx-dchip button{border:0;background:transparent;cursor:pointer;font-size:1rem;line-height:1;padding:0 .25rem;color:inherit;opacity:.7}.spx-dchip button:hover{opacity:1}
  .spx-dchip-skip{background:#ffe4e6;color:#9f1239}.spx-dchip-extra{background:#dcfce7;color:#166534}
  .spx-cal-legend{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;font-size:.78rem}
  .spx-lg{display:inline-flex;align-items:center;gap:.3rem;font-weight:700}.spx-lg::before{content:"";width:14px;height:14px;border-radius:4px;display:inline-block}
  .spx-lg.spx-c-study::before{background:var(--spx-acc)}.spx-lg.spx-c-extra::before{background:#16a34a}.spx-lg.spx-c-skip::before{background:#fecdd3;border:1px solid #e11d48}.spx-lg.spx-c-off::before{background:#f1f5f9;border:1px solid #cbd5e1}
  .spx-cal{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:.8rem}
  .spx-month{border:1px solid var(--border,#e2e8f0);border-radius:12px;padding:.5rem .6rem;background:#fff}
  .spx-month-h{font-weight:800;font-size:.88rem;margin-bottom:.35rem}
  .spx-month-g{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center}
  .spx-month-g i{font-style:normal;font-size:.68rem;font-weight:800;color:var(--text-muted,#64748b)}
  .spx-month-g span,.spx-month-g button{font:600 .78rem inherit;font-family:inherit;height:28px;display:grid;place-items:center;border-radius:7px;border:1px solid transparent}
  .spx-month-g button{cursor:pointer}.spx-month-g button:disabled{cursor:default;opacity:.45}
  .spx-c-out{color:#cbd5e1}
  .spx-month-g .spx-c-study{background:var(--spx-acc);color:#fff}
  .spx-month-g .spx-c-extra{background:#16a34a;color:#fff}
  .spx-month-g .spx-c-skip{background:#ffe4e6;border-color:#e11d48;color:#9f1239;text-decoration:line-through}
  .spx-month-g .spx-c-off{background:#f1f5f9;color:#64748b}
  .spx-month-g .spx-c-today{outline:2px solid #f59e0b;outline-offset:1px}
  .spx-month-g button:not(:disabled):hover{filter:brightness(.92)}
  .spx-dayedit{border:2px solid var(--spx-acc);border-radius:14px;padding:1rem;margin:0 0 1rem;background:#fff}
  .spx-mt{margin-top:.8rem;align-items:center}
  .spx-skipday{margin-left:auto}
  .spx-slot{display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem;flex-wrap:wrap}
  .spx-check{display:flex;gap:.5rem;align-items:center;font-size:.92rem}
  .spx-wiz-side{position:sticky;top:90px}
  .spx-preview{background:#fff;border:2px solid var(--spx-acc);border-radius:16px;padding:1rem 1.1rem;box-shadow:var(--shadow-lg,0 10px 25px rgba(0,0,0,.08))}
  .spx-pv-big{font-size:.95rem;margin:.4rem 0 .6rem}.spx-pv-big b{font-size:1.3rem;color:var(--spx-acc2)}
  .spx-pv-list{list-style:none;margin:0 0 .6rem;padding:0;display:flex;flex-direction:column;gap:.25rem}
  .spx-pv-list li{display:grid;grid-template-columns:1fr auto 4.8rem;gap:.4rem;font-size:.88rem}.spx-pv-list em{color:#64748b;font-style:normal;text-align:right;font-size:.8rem}
  .spx-pv-row{display:flex;justify-content:space-between;font-size:.9rem;border-top:1px dashed #e2e8f0;padding:.3rem 0}
  .spx-fit{margin-top:.6rem;border-radius:10px;padding:.5rem .7rem;font-size:.86rem;font-weight:600}.spx-tight{background:#ffe4e6;color:#9f1239}.spx-easy{background:#e0f2fe;color:#075985}.spx-okfit{background:#d1fae5;color:#065f46}
  .spx-err{color:#be123c;font-size:.85rem;padding-left:1.1rem;margin:.6rem 0 0}
  #spx-banner{position:fixed;right:16px;bottom:16px;z-index:10050;max-width:420px;display:grid;grid-template-columns:auto 1fr;gap:.3rem .8rem;background:#fff;border:2px solid #059669;border-radius:16px;padding:.9rem 2.2rem .9rem 1rem;box-shadow:0 18px 40px rgba(15,23,42,.25);animation:spxIn .35s ease}
  #spx-banner .spx-bn-ic{font-size:2rem;grid-row:1/span 2}#spx-banner .spx-bn-tx{display:flex;flex-direction:column;gap:.2rem;font-size:.88rem}#spx-banner .spx-bn-tx b{font-size:1rem}
  #spx-banner .spx-bn-act{grid-column:2;display:flex;gap:.4rem;margin-top:.4rem}#spx-banner .spx-x{position:absolute;top:.4rem;right:.5rem}
  @keyframes spxIn{from{transform:translateY(20px);opacity:0}}
  #spx-studybar{position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:10040;display:flex;align-items:center;gap:.6rem;max-width:min(920px,calc(100vw - 32px));background:#0f172a;color:#fff;border-radius:14px;padding:.5rem .6rem .5rem .9rem;box-shadow:0 12px 30px rgba(0,0,0,.3);font-size:.9rem}
  #spx-studybar .spx-sb-lab{background:#0284c7;border-radius:8px;padding:.1rem .5rem;font-weight:700;white-space:nowrap;font-size:.8rem}#spx-studybar .spx-sb-txt{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  #spx-studybar .spx-btn{background:#1e293b;color:#fff;border-color:#334155}#spx-studybar .spx-ok{background:#059669;border-color:#059669}#spx-studybar .spx-x{color:#cbd5e1}
  @media (max-width:900px){.spx-wiz-grid{grid-template-columns:1fr}.spx-wiz-side{position:static}}
  @media (max-width:600px){.spx-stats{grid-template-columns:1fr 1fr}.spx-stat{padding:.6rem .7rem}.spx-stat b{font-size:1.2rem}.spx-grid{grid-template-columns:1fr}.spx-head-act{width:100%}
    .spx-task{flex-wrap:wrap}.spx-tk-main{flex-basis:calc(100% - 40px)}.spx-part{margin-left:32px}.spx-go{margin-left:auto}
    #spx-banner{left:12px;right:12px;max-width:none}#spx-studybar{flex-wrap:wrap}#spx-studybar .spx-sb-txt{white-space:normal;flex-basis:100%}}
  .spx-toast{position:fixed;left:50%;top:84px;transform:translateX(-50%);z-index:10060;max-width:min(560px,calc(100vw - 32px));background:#0f172a;color:#fff;border-radius:12px;padding:.7rem 1rem;font-size:.9rem;box-shadow:0 10px 26px rgba(0,0,0,.25)}
  .spx-learnt{display:inline-block;margin-left:.45rem;padding:.05rem .55rem;border-radius:99px;background:#dcfce7;color:#14532d;font-size:.74rem;font-weight:700;white-space:nowrap;vertical-align:middle}.spx-learnt.spx-self{background:#fef3c7;color:#78350f}
  .spx-test{border-color:#059669;color:#065f46;font-weight:700}.spx-test:hover{background:#ecfdf5}
  .spx-record{margin:.7rem 0;border:1px solid #e2e8f0;border-radius:14px;padding:.3rem .9rem;background:#fff}.spx-record summary{cursor:pointer;font-weight:700;padding:.5rem 0}
  .spx-rec{display:flex;justify-content:space-between;gap:.8rem;padding:.55rem 0;border-top:1px solid #f1f5f9;font-size:.88rem}.spx-rec-r{display:flex;flex-direction:column;align-items:flex-end;gap:.2rem;text-align:right}
  @media print{#spx-banner,#spx-studybar,.spx-toast,.spx-test{display:none}}
  `;
  function addCss() { if (document.getElementById('spx-css')) return; const s = document.createElement('style'); s.id = 'spx-css'; s.textContent = CSS; document.head.appendChild(s); }

  // ---------- start ----------
  plans = loadLocal();
  SBHooks.replace('renderStudyPlan', function () { view = {mode: 'list'}; render(); });
  function start() {
    addCss();
    setInterval(tick, 30000);
    setTimeout(tick, 2500);
    // missed work reminder once a day
    try {
      const k = 'sb_study_pending_' + today();
      const pend = plans.filter(p => p.end >= today()).reduce((a, p) => a + pendingFromEarlier(p).length, 0);
      if (pend && !window.SB_BACKGROUND_READ && !localStorage.getItem(k)) {
        localStorage.setItem(k, '1');
        setTimeout(() => { const p = plans.find(x => pendingFromEarlier(x).length); if (p) { const x = pendingFromEarlier(p)[0];
          banner(p, x.s, x.k, `You have ${pend} unfinished task${pend > 1 ? 's' : ''} from earlier`, 'Start with: ' + (taskText(p, x.k).subj + ' — ' + taskText(p, x.k).work)); } }, 4000);
      }
    } catch (e) { /* storage blocked */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  window.SBStudyPlan = {stats: planStats, pending: pendingFromEarlier, reset: resetPlan, scope: scopeLabel, plans: () => plans, reminders, createPlan, replan, render, open: openPlan, go, print: printPlan, tick, persist, removePlan, add: p => { plans.push(p); persist(p); }};
})();
