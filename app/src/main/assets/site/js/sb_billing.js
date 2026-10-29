/* SBBilling: the plans window, the Easypaisa payment window and "My plans" (js/sb_access.js decides when to open it; api/billing.php is the server).
 * The same file runs on the website and inside the Android app's web pages, so both show the same prices, the same words and the same account.
 *
 *   SBBilling.open({why, cls, subject})   choose a plan   (why: prep_q | plan_q | paper | chapter, only to say what was reached)
 *   SBBilling.checkout({plan, cls, subjects})   straight to the payment window (asks for sign-in first and comes back)
 *   SBBilling.openAccount()               my plans, payments and notices
 * The chosen plan, class and subjects are kept in localStorage 'sb_checkout' through registration and sign-in. A submitted payment is only
 * "Pending Verification": nothing is unlocked until an administrator approves it. */
(function () {
  'use strict';
  if (typeof document === 'undefined') return;
  const A = window.SBAccess;
  const KEY_PLANS = 'sb_plans_v1', KEY_INTENT = 'sb_checkout';
  let plans = null, modal = null, release = null, sel = { plan: '', cls: '', subjects: [] }, idem = '', busy = false, view = 'plans', whyInfo = null;
  let resumeAfterAuth = false;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rd = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const wr = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) { /* private mode */ } };
  const money = n => 'PKR ' + Number(n).toLocaleString('en-US');
  // who is signed in: the page's own account module, or what the Android app told the page (its sign-in is native; the page learns of it by this event)
  let authUser = null;
  document.addEventListener('spacebook:auth', e => { authUser = (e.detail && e.detail.user) || null; });
  const user = () => (window.SpaceBookAuth && window.SpaceBookAuth.user) || authUser;
  // the sign-in screen: the website's dialog, or the app's own screen when this page runs inside the Android app
  const inApp = () => !!(window.SBHost && typeof window.SBHost.onAction === 'function');
  function askAuth(tab) {
    if (inApp()) { try { window.SBHost.onAction('auth', ''); } catch (e) { /* the app screen did not open */ } return; }
    if (window.SpaceBookAuth) window.SpaceBookAuth.open(tab);
  }
  const fmtDate = iso => { if (!iso) return '—'; const d = new Date(iso); return isNaN(d) ? '—' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };
  const fmtTime = iso => { if (!iso) return '—'; const d = new Date(iso); return isNaN(d) ? '—' : d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); };
  const newKey = () => { const b = new Uint8Array(12); try { crypto.getRandomValues(b); } catch (e) { for (let i = 0; i < 12; i++) b[i] = Math.floor(Math.random() * 256); } return Array.prototype.map.call(b, x => ('0' + x.toString(16)).slice(-2)).join(''); };

  // -------- plans from the server (kept for offline)
  async function loadPlans() {
    if (plans) return plans;
    try {
      const r = await A.call('billing.php?action=plans', { headers: A.headers() }, 8000);
      if (r.json && r.json.ok) { plans = r.json; wr(KEY_PLANS, JSON.stringify(plans)); return plans; }
    } catch (e) { /* offline */ }
    try { plans = JSON.parse(rd(KEY_PLANS) || 'null'); } catch (e) { plans = null; }
    return plans;
  }
  const planById = id => (plans && plans.plans.find(p => p.id === id)) || null;
  const clsName = id => { const c = plans && plans.classes.find(x => x.id === id); return c ? c.name : id; };
  const subjName = id => { const s = plans && plans.subjects.find(x => x.id === id); return s ? clsName(s.class) + ' ' + s.name : id; };

  // -------- the window
  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'sbbModal'; modal.className = 'sbb-backdrop';
    modal.innerHTML = '<div class="sbb-card" role="dialog" aria-modal="true" aria-labelledby="sbbTitle" tabindex="-1"><button type="button" class="sbb-x" aria-label="Close">✕</button><div class="sbb-body"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    modal.querySelector('.sbb-x').addEventListener('click', () => close());
    modal.addEventListener('click', onClick);
    modal.addEventListener('input', onInput);
    modal.addEventListener('submit', onSubmit);
    return modal;
  }
  function show() {
    ensureModal(); modal.hidden = false; modal.classList.add('sbb-show');
    document.body.classList.add('sbb-lock');
    if (release) release();
    release = window.SBA11y && window.SBA11y.trap ? window.SBA11y.trap(modal, { onClose: () => close() }) : null;
  }
  // close(true): the window goes away for the sign-in screen and comes back (no "closed" event). Otherwise the person closed it: the app goes back a screen.
  function close(silent) {
    if (!modal) return;
    modal.classList.remove('sbb-show'); modal.hidden = true; document.body.classList.remove('sbb-lock');
    if (release) { release(); release = null; }
    busy = false;
    if (silent !== true) document.dispatchEvent(new CustomEvent('sbbilling:close'));
  }
  const body = () => modal.querySelector('.sbb-body');
  function paint(html) { body().innerHTML = html; const c = modal.querySelector('.sbb-card'); c.scrollTop = 0; const h = body().querySelector('h2'); if (h) h.id = 'sbbTitle'; }

  // -------- the three plans
  function whyText() {
    const w = whyInfo && whyInfo.why;
    const m = { prep_q: 'You have used your ' + 50 + ' free Test Preparation questions.', plan_q: 'You have used your 50 free Study Plan questions.', paper: 'Your free paper is used. Paper creation needs a plan.', chapter: 'Chapter 1 is free. The other chapters need a plan.' };
    return m[w] || '';
  }
  function planCard(p) {
    return '<article class="sbb-plan" data-plan="' + esc(p.id) + '"><h3>' + esc(p.title) + '</h3><p class="sbb-tag">' + esc(p.tagline) + '</p>' +
      '<p class="sbb-price"><b>' + money(p.price) + '</b> <span>for ' + esc(p.duration) + '</span></p>' +
      '<ul class="sbb-in">' + p.includes.map(x => '<li>✅ ' + esc(x) + '</li>').join('') + '</ul>' +
      '<ul class="sbb-out">' + p.excludes.map(x => '<li>➖ ' + esc(x) + '</li>').join('') + '</ul>' +
      '<button type="button" class="sbb-btn sbb-main" data-act="choose" data-plan="' + esc(p.id) + '">Choose ' + esc(p.title) + '</button></article>';
  }
  function viewPlans() {
    view = 'plans';
    const w = whyText();
    const u = user();
    paint('<h2>Choose a plan</h2>' + (w ? '<p class="sbb-why" role="status">' + esc(w) + '</p>' : '') +
      '<div class="sbb-plans">' + plans.plans.map(planCard).join('') + '</div>' +
      '<div class="sbb-free"><h3>🎁 ' + esc(plans.free.title) + '</h3><ul>' + plans.free.items.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></div>' +
      '<p class="sbb-note">💳 Pay with Easypaisa. We check every payment by hand, usually within 1 hour. Your plan starts only after we approve it.</p>' +
      (u ? '<p><button type="button" class="sbb-link" data-act="account">My plans and payments</button></p>' : '<p class="sbb-note">Already paid? <button type="button" class="sbb-link" data-act="signin">Sign in</button></p>'));
  }

  // -------- class / subjects
  function viewPick() {
    view = 'pick';
    const p = planById(sel.plan);
    let pick = '';
    if (p.pick === 'class') {
      pick = '<fieldset class="sbb-pick"><legend>Which class?</legend><div class="sbb-classes">' + plans.classes.map(c =>
        '<label class="sbb-chip"><input type="radio" name="cls" value="' + esc(c.id) + '"' + (sel.cls === c.id ? ' checked' : '') + '><span>' + esc(c.name) + '</span></label>').join('') + '</div></fieldset>';
    } else if (p.pick === 'subjects') {
      const byClass = {};
      plans.subjects.forEach(s => { (byClass[s.class] = byClass[s.class] || []).push(s); });
      pick = '<fieldset class="sbb-pick"><legend>Choose up to ' + p.maxSubjects + ' subjects, from any classes</legend>' +
        '<p class="sbb-count" aria-live="polite"></p><input type="search" class="sbb-find" placeholder="Search a subject" aria-label="Search a subject">' +
        plans.classes.map(c => '<details class="sbb-cls"' + (sel.subjects.some(id => (plans.subjects.find(s => s.id === id) || {}).class === c.id) || c.id === sel.cls ? ' open' : '') + '><summary>' + esc(c.name) + '</summary><div>' +
          (byClass[c.id] || []).map(s => '<label class="sbb-sub"><input type="checkbox" name="subjects" value="' + esc(s.id) + '"' + (sel.subjects.indexOf(s.id) >= 0 ? ' checked' : '') + '> <span>' + esc(s.name) + '</span></label>').join('') + '</div></details>').join('') + '</fieldset>';
    }
    paint('<h2>' + esc(p.title) + '</h2><p class="sbb-sub-line">' + money(p.price) + ' for ' + esc(p.duration) + '</p>' + pick +
      '<div class="sbb-summary" aria-live="polite"></div><div class="sbb-actions"><button type="button" class="sbb-btn" data-act="plans">← Back</button>' +
      '<button type="button" class="sbb-btn sbb-main" data-act="continue">Continue to payment →</button></div>');
    refreshPick();
  }
  function selectionOk() {
    const p = planById(sel.plan); if (!p) return false;
    if (p.pick === 'class') return !!plans.classes.find(c => c.id === sel.cls);
    if (p.pick === 'subjects') return sel.subjects.length >= 1 && sel.subjects.length <= p.maxSubjects;
    return true;
  }
  function selectionText() {
    const p = planById(sel.plan);
    if (p.pick === 'class') return sel.cls ? p.title + ' · ' + clsName(sel.cls) : 'Choose your class';
    if (p.pick === 'subjects') return sel.subjects.length ? sel.subjects.length + ' of ' + p.maxSubjects + ' subjects chosen' : 'Choose at least one subject';
    return p.title;
  }
  function refreshPick() {
    const p = planById(sel.plan); if (!p || !modal) return;
    const sum = body().querySelector('.sbb-summary'); if (sum) sum.textContent = selectionText();
    const cnt = body().querySelector('.sbb-count'); if (cnt) cnt.textContent = sel.subjects.length + ' of ' + p.maxSubjects + ' chosen';
    if (p.pick === 'subjects') body().querySelectorAll('input[name="subjects"]').forEach(i => { i.disabled = !i.checked && sel.subjects.length >= p.maxSubjects; });
    const go = body().querySelector('[data-act="continue"]'); if (go) go.disabled = !selectionOk();
  }

  // -------- payment
  function saveIntent() { wr(KEY_INTENT, JSON.stringify({ plan: sel.plan, cls: sel.cls, subjects: sel.subjects, at: Date.now() })); }
  function readIntent() { try { const v = JSON.parse(rd(KEY_INTENT) || 'null'); return v && v.plan && Date.now() - v.at < 7 * 864e5 ? v : null; } catch (e) { return null; } }
  function toPayment() {
    if (!selectionOk()) return;
    saveIntent();
    if (!user()) {                                   // the account comes first; the choice is kept and the payment window opens after sign-in
      resumeAfterAuth = true; close(true);
      askAuth('register');
      return;
    }
    viewPay();
  }
  function copyBtn(text, label) { return '<button type="button" class="sbb-copy" data-act="copy" data-text="' + esc(text) + '" aria-label="Copy ' + esc(label) + '">Copy</button>'; }
  function viewPay(err) {
    view = 'pay';
    const p = planById(sel.plan); const pay = plans.payment;
    if (!idem) idem = newKey();
    const where = p.pick === 'class' ? '<tr><th>Class</th><td>' + esc(clsName(sel.cls)) + '</td></tr>'
      : p.pick === 'subjects' ? '<tr><th>Subjects</th><td>' + sel.subjects.map(id => esc(subjName(id))).join('<br>') + '</td></tr>' : '<tr><th>Covers</th><td>All classes and subjects</td></tr>';
    const today = new Date().toISOString().slice(0, 10);
    paint('<h2>Pay with Easypaisa</h2>' +
      '<table class="sbb-table"><tr><th>Plan</th><td>' + esc(p.title) + '</td></tr>' + where + '<tr><th>Amount payable</th><td><b>' + money(p.price) + '</b></td></tr><tr><th>Duration</th><td>' + esc(p.duration) + '</td></tr></table>' +
      '<div class="sbb-ep"><div class="sbb-ep-row"><span>Payment method</span><b>' + esc(pay.method) + '</b></div>' +
      '<div class="sbb-ep-row"><span>Account number</span><b class="sbb-num">' + esc(pay.number) + '</b>' + copyBtn(pay.number, 'account number') + '</div>' +
      '<div class="sbb-ep-row"><span>Account title</span><b>' + esc(pay.title) + '</b>' + copyBtn(pay.title, 'account title') + '</div></div>' +
      '<ol class="sbb-steps"><li>Open Easypaisa and send <b>' + money(p.price) + '</b> to the account above.</li><li>Find the <b>Transaction ID</b> (TID) on your Easypaisa receipt and paste it below.</li><li>Press <b>Submit Payment for Verification</b>. We will check it and start your plan.</li></ol>' +
      '<form class="sbb-form" novalidate><label>Trx ID (Transaction ID)<input name="trx" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="30" required placeholder="Paste or type your Transaction ID"></label>' +
      '<label>Payment date <small>(optional)</small><input name="paid_on" type="date" max="' + today + '" value="' + today + '"></label>' +
      '<p class="sbb-err" role="alert" aria-live="assertive">' + esc(err || '') + '</p>' +
      '<div class="sbb-actions"><button type="button" class="sbb-btn" data-act="pick">← Back</button><button type="submit" class="sbb-btn sbb-main sbb-submit">Submit Payment for Verification</button></div></form>' +
      '<p class="sbb-note">Your plan does not start when you submit. It starts when we approve the payment.</p>');
    const t = body().querySelector('input[name="trx"]'); if (t) t.focus();
  }
  async function submitPayment(form) {
    if (busy) return; // a double tap sends once
    const trx = (form.elements.trx.value || '').trim();
    const err = form.querySelector('.sbb-err');
    if (!trx) { err.textContent = 'Please enter your Transaction ID (Trx ID).'; form.elements.trx.focus(); return; }
    if (!/^[A-Za-z0-9]{6,30}$/.test(trx)) { err.textContent = 'The Transaction ID has 6 to 30 letters and numbers. Copy it exactly from your Easypaisa receipt.'; form.elements.trx.focus(); return; }
    busy = true; err.textContent = '';
    const btn = form.querySelector('.sbb-submit'); btn.disabled = true; btn.textContent = 'Sending…';
    let r;
    try {
      r = await A.call('billing.php?action=submit_payment', { method: 'POST', headers: A.headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ plan: sel.plan, cls: sel.cls || null, subjects: sel.subjects, trx: trx, paid_on: form.elements.paid_on.value || '', idem: idem }) }, 15000);
    } catch (e) { r = null; }
    busy = false;
    if (!r || !r.json) { btn.disabled = false; btn.textContent = 'Submit Payment for Verification'; err.textContent = 'We could not reach SpaceBook. Check your internet and press the button again — it will not be sent twice.'; return; }
    if (!r.json.ok) {
      btn.disabled = false; btn.textContent = 'Submit Payment for Verification';
      if (r.json.needSignIn) { err.textContent = 'Please sign in again.'; saveIntent(); resumeAfterAuth = true; close(true); askAuth('login'); return; }
      err.textContent = r.json.error || 'Something went wrong.'; return;
    }
    wr(KEY_INTENT, null); idem = '';
    A.load();
    viewDone(r.json);
  }
  function viewDone(j) {
    view = 'done';
    paint('<div class="sbb-done"><div class="sbb-done-icon" aria-hidden="true">🎉</div><h2>Payment submitted</h2><p class="sbb-thanks" role="status">' + esc(j.message) + '</p>' +
      '<p><span class="sbb-badge sbb-b-pending">Pending Verification</span> <small>Reference ' + esc(j.payment.ref) + '</small></p></div>' +
      '<div class="sbb-actions"><button type="button" class="sbb-btn sbb-main" data-act="account">See my payments</button><button type="button" class="sbb-btn" data-act="close">Close</button></div>');
  }

  // -------- my plans
  const statusText = { active: 'Active', expired: 'Expired', suspended: 'Suspended' };
  function subCard(s) {
    const what = s.planType === 'student' ? esc(clsName(s.classId)) + ' · all subjects · Study Plan' : s.planType === 'teacher' ? s.subjects.map(x => esc(x.name)).join(', ') : 'Test Preparation · all classes';
    return '<article class="sbb-sub-card sbb-s-' + esc(s.status) + '"><div class="sbb-row"><h3>' + esc(s.label) + '</h3><span class="sbb-badge sbb-b-' + esc(s.status) + '">' + statusText[s.status] + '</span></div>' +
      '<p class="sbb-what">' + what + '</p><dl class="sbb-dates"><div><dt>Started</dt><dd>' + fmtDate(s.startsAt) + '</dd></div><div><dt>Ends</dt><dd>' + fmtDate(s.expiresAt) + '</dd></div>' +
      (s.status === 'active' ? '<div><dt>Days left</dt><dd>' + s.daysLeft + '</dd></div>' : '') + '</dl>' +
      (s.status === 'suspended' ? '<p class="sbb-err">Suspended' + (s.suspendReason ? ': ' + esc(s.suspendReason) : '') + '. Contact us on WhatsApp if this is a mistake.</p>' : '') +
      (s.status !== 'suspended' ? '<button type="button" class="sbb-btn" data-act="renew" data-id="' + s.id + '">' + (s.status === 'active' ? 'Renew early · ' : 'Renew · ') + 'PKR 500</button>' : '') + '</article>';
  }
  function payRow(p) {
    const cls = p.status === 'pending' ? 'pending' : p.status === 'approved' ? 'active' : 'suspended';
    return '<article class="sbb-pay"><div class="sbb-row"><b>' + esc(p.label) + '</b><span class="sbb-badge sbb-b-' + cls + '">' + esc(p.statusText) + '</span></div>' +
      '<p class="sbb-small">' + money(p.amount) + ' · TID ' + esc(p.trxId) + ' · sent ' + fmtTime(p.submittedAt) + ' · ' + esc(p.ref) + '</p>' +
      (p.status === 'approved' ? '<p class="sbb-small">Plan period: ' + fmtDate(p.activatedAt) + ' → ' + fmtDate(p.expiresAt) + '</p>' : '') +
      (p.status === 'pending' ? '<p class="sbb-small">We are checking this payment. Please allow up to 1 hour.</p>' : '') +
      (p.status === 'rejected' ? '<p class="sbb-err">Not approved' + (p.reviewNote ? ': ' + esc(p.reviewNote) : '') + '</p>' : '') + '</article>';
  }
  async function viewAccount() {
    view = 'account';
    if (!user()) { paint('<h2>My plans</h2><p>Sign in to see your plans and payments.</p><div class="sbb-actions"><button type="button" class="sbb-btn sbb-main" data-act="signin">Sign in</button><button type="button" class="sbb-btn" data-act="plans">See plans</button></div>'); return; }
    paint('<h2>My plans</h2><p class="sbb-note">Loading…</p>');
    let r = null;
    try { r = await A.call('billing.php?action=account', { headers: A.headers() }, 10000); } catch (e) { r = null; }
    if (view !== 'account') return;
    if (!r || !r.json || !r.json.ok) { paint('<h2>My plans</h2><p class="sbb-err">' + (r && r.json && r.json.needSignIn ? 'Please sign in again.' : 'We could not load your plans. Check your internet.') + '</p><div class="sbb-actions"><button type="button" class="sbb-btn" data-act="plans">See plans</button></div>'); return; }
    const j = r.json;
    window.__sbbAccount = j;
    paint('<h2>My plans</h2>' +
      (j.reminders.length ? '<div class="sbb-remind">' + j.reminders.map(x => '<p>⏰ ' + esc(x.text) + '</p>').join('') + '</div>' : '') +
      '<section><h3 class="sbb-h">Current plans</h3>' + (j.subscriptions.length ? j.subscriptions.map(subCard).join('') : '<p class="sbb-note">You do not have a plan yet. Chapter 1 of every subject is free.</p>') + '</section>' +
      '<section><h3 class="sbb-h">Payments</h3>' + (j.payments.length ? j.payments.map(payRow).join('') : '<p class="sbb-note">No payments yet.</p>') + '</section>' +
      '<section><h3 class="sbb-h">Messages ' + (j.unread ? '<span class="sbb-badge sbb-b-pending">' + j.unread + ' new</span>' : '') + '</h3>' +
      (j.notifications.length ? j.notifications.map(n => '<article class="sbb-note-row' + (n.read ? '' : ' sbb-unread') + '"><b>' + esc(n.title) + '</b><p>' + esc(n.body) + '</p><small>' + fmtTime(n.at) + '</small></article>').join('') : '<p class="sbb-note">Nothing yet.</p>') + '</section>' +
      '<div class="sbb-actions"><button type="button" class="sbb-btn sbb-main" data-act="plans">Buy a plan</button><button type="button" class="sbb-btn" data-act="close">Close</button></div>');
    if (j.unread) A.call('billing.php?action=read_notes', { method: 'POST', headers: A.headers({ 'Content-Type': 'application/json' }), body: '{}' }, 5000).catch(() => {});
  }

  // -------- events
  function onClick(e) {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act;
    if (a === 'choose') { sel = { plan: b.dataset.plan, cls: sel.cls && planById(b.dataset.plan).pick === 'class' ? sel.cls : (whyInfo && whyInfo.cls) || '', subjects: whyInfo && whyInfo.subject && planById(b.dataset.plan).pick === 'subjects' ? [whyInfo.subject] : [] }; idem = ''; planById(sel.plan).pick === 'none' ? toPayment() : viewPick(); }
    else if (a === 'plans') viewPlans();
    else if (a === 'pick') planById(sel.plan).pick === 'none' ? viewPlans() : viewPick();
    else if (a === 'continue') toPayment();
    else if (a === 'account') viewAccount();
    else if (a === 'close') close();
    else if (a === 'signin') { resumeAfterAuth = false; close(true); askAuth('login'); }
    else if (a === 'renew') {
      const s = ((window.__sbbAccount || {}).subscriptions || []).find(x => String(x.id) === b.dataset.id); if (!s) return;
      sel = { plan: s.planType, cls: s.classId || '', subjects: s.subjects.map(x => x.id) }; idem = ''; saveIntent(); viewPay();
    }
    else if (a === 'copy') {
      const t = b.dataset.text;
      const done = () => { b.textContent = 'Copied ✓'; setTimeout(() => { b.textContent = 'Copy'; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, () => fallbackCopy(t, done));
      else fallbackCopy(t, done);
    }
  }
  function fallbackCopy(t, done) {
    const ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* the number is on screen to copy by hand */ }
    ta.remove();
  }
  function onInput(e) {
    const t = e.target;
    if (t.name === 'cls') { sel.cls = t.value; refreshPick(); }
    else if (t.name === 'subjects') {
      const p = planById(sel.plan);
      if (t.checked && sel.subjects.length >= p.maxSubjects) { t.checked = false; return; }
      sel.subjects = Array.from(body().querySelectorAll('input[name="subjects"]:checked')).map(i => i.value);
      refreshPick();
    } else if (t.classList.contains('sbb-find')) {
      const q = t.value.trim().toLowerCase();
      body().querySelectorAll('.sbb-cls').forEach(d => {
        let any = false;
        d.querySelectorAll('.sbb-sub').forEach(l => { const hit = !q || l.textContent.toLowerCase().indexOf(q) >= 0 || d.querySelector('summary').textContent.toLowerCase().indexOf(q) >= 0; l.hidden = !hit; if (hit) any = true; });
        d.hidden = !any; if (q && any) d.open = true;
      });
    }
  }
  function onSubmit(e) { if (e.target.classList.contains('sbb-form')) { e.preventDefault(); submitPayment(e.target); } }

  // -------- public
  async function open(o) {
    whyInfo = o || null;
    show(); paint('<h2>Plans</h2><p class="sbb-note">Loading…</p>');
    if (!(await loadPlans())) { paint('<h2>Plans</h2><p class="sbb-err">We could not load the plans. Check your internet and try again.</p><div class="sbb-actions"><button type="button" class="sbb-btn" data-act="close">Close</button></div>'); return; }
    viewPlans();
  }
  async function checkout(c) {
    whyInfo = null; show(); paint('<h2>Payment</h2><p class="sbb-note">Loading…</p>');
    if (!(await loadPlans())) { close(); return; }
    sel = { plan: c.plan, cls: c.cls || '', subjects: c.subjects || [] };
    if (!planById(sel.plan) || !selectionOk()) { viewPlans(); return; }
    idem = ''; saveIntent();
    if (!user()) { resumeAfterAuth = true; close(true); askAuth('register'); return; }
    viewPay();
  }
  async function openAccount() { whyInfo = null; show(); await loadPlans(); viewAccount(); }

  // back from sign-in or registration with the choice kept: straight to the payment window
  document.addEventListener('spacebook:auth', async ev => {
    const u = ev.detail && ev.detail.user;
    if (!u || !resumeAfterAuth) return;
    resumeAfterAuth = false;
    const it = readIntent(); if (!it) return;
    if (!(await loadPlans())) return;
    sel = { plan: it.plan, cls: it.cls || '', subjects: it.subjects || [] };
    if (!planById(sel.plan) || !selectionOk()) return;
    idem = ''; show(); viewPay();
  });

  window.SBBilling = { open, checkout, openAccount, close };
})();
