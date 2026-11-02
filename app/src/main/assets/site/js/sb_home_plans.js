/* sb_home_plans.js — Home → "My Stats": only what the student has started.
 *   • every test preparation (PST, CT, SST, ...) with its practice and mock-test statistics   (SBTestPrep.summary)
 *   • every study plan with its progress                                                      (SBStudyPlan.plans / stats)
 * A student can have several of each. Each card opens its page and has a reset button. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ago = ts => {
    if (!ts) return 'not yet';
    const m = Math.round((Date.now() - ts) / 60000);
    if (m < 2) return 'just now'; if (m < 60) return m + ' min ago'; if (m < 1440) return Math.round(m / 60) + ' h ago';
    const d = Math.round(m / 1440); return d === 1 ? 'yesterday' : d + ' days ago';
  };
  const go = (page, then) => {
    const t = document.querySelector('.nav-tab[data-page="' + page + '"]') || document.querySelector('.nav-link[data-page="' + page + '"]');
    if (t) t.click();
    if (then) setTimeout(then, 150);
  };
  let host = null;

  function css() {
    if (document.getElementById('sbhp-css')) return;
    const s = document.createElement('style'); s.id = 'sbhp-css';
    s.textContent = `
.sbhp{display:flex;flex-direction:column;gap:1.1rem}
.sbhp-sum{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:.7rem}
.sbhp-k{background:var(--card-bg,#fff);border:1px solid #e2e8f0;border-radius:14px;padding:.75rem 1rem}
.sbhp-k b{display:block;font-size:1.6rem;line-height:1.1}.sbhp-k span{font-size:.8rem;color:#64748b}
.sbhp-h{display:flex;align-items:center;justify-content:space-between;gap:.6rem;margin:.2rem 0 -.3rem}.sbhp-h h3{margin:0;font-size:1.1rem}
.sbhp-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.1rem 1.4rem;align-items:start}
.sbhp-col{display:flex;flex-direction:column;gap:1.1rem;min-width:0}
@media (max-width:900px){.sbhp-two{grid-template-columns:minmax(0,1fr)}}
.sbhp-grid{display:flex;flex-wrap:nowrap;gap:.9rem;overflow-x:auto;padding:.15rem .1rem .7rem;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch}
.sbhp-grid>.sbhp-card{flex:0 0 min(330px,86vw);scroll-snap-align:start}
.sbhp-card{--c:#027cba;background:var(--card-bg,#fff);border:1px solid #e2e8f0;border-top:4px solid var(--c);border-radius:14px;padding:.9rem 1rem;display:flex;flex-direction:column;gap:.55rem;box-shadow:0 1px 3px rgba(15,23,42,.06)}
.sbhp-top{display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem}.sbhp-top h4{margin:0;font-size:1.05rem}.sbhp-top small{color:#64748b;display:block;font-size:.78rem}
.sbhp-pct{font-size:1.5rem;font-weight:800;color:var(--c)}
.sbhp-bar{height:8px;background:#e2e8f0;border-radius:99px;overflow:hidden}.sbhp-bar i{display:block;height:100%;background:var(--c);border-radius:99px}
.sbhp-nums{display:grid;grid-template-columns:repeat(3,1fr);gap:.4rem;text-align:center}
.sbhp-nums div{background:rgba(148,163,184,.12);border-radius:10px;padding:.35rem .2rem}.sbhp-nums b{display:block;font-size:1.05rem}.sbhp-nums span{font-size:.7rem;color:#64748b}
.sbhp-chips{display:flex;flex-wrap:wrap;gap:.35rem;font-size:.78rem}.sbhp-chips span{background:rgba(148,163,184,.15);border-radius:99px;padding:.1rem .55rem}
.sbhp-rec{font-size:.8rem;color:#475569;display:flex;flex-direction:column;gap:.15rem}.sbhp-rec div{display:flex;justify-content:space-between}
.sbhp-warn{color:#b45309;font-size:.8rem;margin:0}
.sbhp-act{display:flex;gap:.4rem;flex-wrap:wrap;margin-top:auto}
.sbhp-btn{font:inherit;font-size:.82rem;border:1px solid #cbd5e1;background:#fff;color:#0f172a;border-radius:99px;padding:.3rem .8rem;cursor:pointer}
.sbhp-btn.pri{background:var(--c);border-color:var(--c);color:#fff;font-weight:700}
.sbhp-empty{border:2px dashed #cbd5e1;border-radius:14px;padding:1.1rem;text-align:center;color:#475569;display:flex;flex-direction:column;gap:.5rem;align-items:center}
.sbhp-empty p{margin:0}`;
    document.head.appendChild(s);
  }

  function testCard(t) {
    const recent = t.recent.length ? `<div class="sbhp-rec">${t.recent.map(r => `<div><span>${r.mode === 'mock' ? '⏱️ Mock' : '🎯 Practice'} · ${esc(ago(r.ts))}</span><b>${r.c}/${r.n} · ${r.pct}%</b></div>`).join('')}</div>` : '';
    return `<article class="sbhp-card" style="--c:${esc(t.color)}" data-test="${esc(t.track)}">
      <div class="sbhp-top"><div><h4>${esc(t.icon)} ${esc(t.title)}</h4><small>${esc(t.full)}</small></div><span class="sbhp-pct" title="Accuracy">${t.mcqs ? t.acc + '%' : '—'}</span></div>
      <div class="sbhp-bar"><i style="width:${t.acc}%"></i></div>
      <div class="sbhp-nums"><div><b>${t.mcqs}</b><span>MCQs answered</span></div><div><b>${t.sessions}</b><span>sessions (${t.mocks} mock)</span></div><div><b>${t.minutes}</b><span>minutes studied</span></div></div>
      <div class="sbhp-chips"><span>📍 Today: ${t.todayMcqs} MCQs</span><span>🕒 Last: ${esc(ago(t.last))}</span>${t.bestMock ? `<span>🏆 Best mock ${t.bestMock}%</span>` : ''}${t.paused ? '<span>⏸ Unfinished test</span>' : ''}</div>
      ${recent}
      <div class="sbhp-act"><button type="button" class="sbhp-btn pri" data-a="open">${t.paused ? '▶ Continue' : '🎯 Practise'}</button><button type="button" class="sbhp-btn" data-a="stats">📊 Statistics</button><button type="button" class="sbhp-btn" data-a="reset" title="Set the statistics of this test back to zero">↺ Reset</button></div>
    </article>`;
  }

  function planCard(p) {
    const SP = window.SBStudyPlan, st = SP.stats(p), pend = SP.pending(p).length, rows = Object.entries(st.byCat);
    const today = new Date(), ymd = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    const todays = (p.sessions || []).filter(s => s.date === ymd).flatMap(s => s.tasks);
    const td = todays.filter(k => k.done >= k.n).length;
    return `<article class="sbhp-card" style="--c:#7c3aed" data-plan="${esc(p.id)}">
      <div class="sbhp-top"><div><h4>📅 ${esc(p.name)}</h4><small>${esc(SP.scope(p))}</small></div><span class="sbhp-pct" title="Done">${st.pct}%</span></div>
      <div class="sbhp-bar"><i style="width:${st.pct}%"></i></div>
      <div class="sbhp-nums"><div><b>${(p.sessions || []).length}</b><span>study sessions</span></div><div><b>${todays.length ? td + '/' + todays.length : '—'}</b><span>tasks today</span></div><div><b>${Math.round(st.done)}</b><span>minutes studied</span></div></div>
      <div class="sbhp-chips">${rows.map(([c, v]) => `<span>${esc(c)} ${v.done}/${v.n}</span>`).join('')}</div>
      ${pend ? `<p class="sbhp-warn">⚠️ ${pend} unfinished from earlier</p>` : ''}
      <div class="sbhp-act"><button type="button" class="sbhp-btn pri" data-a="open">Open plan</button><button type="button" class="sbhp-btn" data-a="reset" title="Set the statistics of this plan back to 0%">↺ Reset</button><button type="button" class="sbhp-btn" data-a="delete" title="Delete this plan" style="color:#b91c1c;border-color:#fca5a5">🗑 Delete</button></div>
    </article>`;
  }

  function render(el) {
    css();
    if (el) host = el;
    if (!host || !host.isConnected) return;
    let tests = [], plans = [];
    try { tests = window.SBTestPrep && SBTestPrep.summary ? SBTestPrep.summary() : []; } catch (e) { tests = []; }
    try { plans = window.SBStudyPlan ? SBStudyPlan.plans().slice() : []; } catch (e) { plans = []; }
    const mcqs = tests.reduce((a, t) => a + t.mcqs, 0), ok = tests.reduce((a, t) => a + t.correct, 0);
    const avg = plans.length ? Math.round(plans.reduce((a, p) => a + SBStudyPlan.stats(p).pct, 0) / plans.length) : 0;
    host.innerHTML = `${window.SBDesignUI ? SBDesignUI.dashboard(tests, plans) : ''}<details class="sbd-study-details"><summary>My preparations, plans &amp; vocabulary tools</summary><div class="sbhp">
      <div class="sbhp-sum">
        <div class="sbhp-k"><b>${tests.length}</b><span>test preparations started</span></div>
        <div class="sbhp-k"><b>${mcqs ? Math.round(100 * ok / mcqs) + '%' : '—'}</b><span>accuracy over ${mcqs} test MCQs</span></div>
        <div class="sbhp-k"><b>${plans.length}</b><span>study plans created</span></div>
        <div class="sbhp-k"><b>${plans.length ? avg + '%' : '—'}</b><span>average plan progress</span></div>
      </div>
      <div class="sbhp-two">
        <section class="sbhp-col" aria-label="Test preparations">
          <div class="sbhp-h"><h3>🎯 Test preparations</h3><button type="button" class="sbhp-btn" data-a="newtest">＋ Start a test</button></div>
          ${tests.length ? `<div class="sbhp-grid">${tests.map(testCard).join('')}</div>`
            : `<div class="sbhp-empty"><p>You have not started any test preparation yet (PST, CT, SST and more).</p><button type="button" class="sbhp-btn pri" data-a="newtest" style="--c:#027cba">Choose a test</button></div>`}
        </section>
        <section class="sbhp-col" aria-label="Study plans">
          <div class="sbhp-h"><h3>📅 Study plans</h3><button type="button" class="sbhp-btn" data-a="newplan">＋ New plan</button></div>
          ${plans.length ? `<div class="sbhp-grid">${plans.map(planCard).join('')}</div>`
            : `<div class="sbhp-empty"><p>You have not created a study plan yet.</p><button type="button" class="sbhp-btn pri" data-a="newplan" style="--c:#7c3aed">Create a study plan</button></div>`}
        </section>
      </div>
      <div class="sbhp-h"><h3>📖 Words from Subjects &amp; Units</h3></div>
      <div id="homeMyWords"></div>
    </div></details>`;
    try { if (window.SBWordStats) SBWordStats.renderMyWords(host.querySelector('#homeMyWords')); } catch (e) { /* word lists not loaded */ }
    host.onclick = async e => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      const card = b.closest('[data-test],[data-plan]'), a = b.dataset.a;
      if (a === 'newtest') return go('tests-preps');
      if (a === 'newplan') return go('study-plan');
      if (card && card.dataset.test) {
        const t = card.dataset.test;
        if (a === 'open') return go('tests-preps', () => SBTestPrep.open(t));
        if (a === 'stats') return go('tests-preps', async () => { await SBTestPrep.open(t); SBTestPrep.tab('stats'); });
        if (a === 'reset') { if (await SBTestPrep.resetTrack(t)) render(); }
      } else if (card && card.dataset.plan) {
        const id = card.dataset.plan, p = SBStudyPlan.plans().find(x => x.id === id);
        if (a === 'open') return go('study-plan', () => SBStudyPlan.open(id));
        if (a === 'reset' && p && SBStudyPlan.reset(p)) render();
        if (a === 'delete' && p && confirm('Delete the plan "' + p.name + '"? Its progress will be lost.')) { SBStudyPlan.removePlan(p); render(); }
      }
    };
  }

  // ---------- My Account: profile, subscription, plans, usage ----------
  // Owner: set window.SB_PLANS = [{id,name,price,period,features:[...],current?:true}] (and window.SB_SUBSCRIPTION = {plan, renews, status}) to show real pricing.
  // Until then the page shows the Free plan and a "coming soon" paid plan, never an invented price.
  function bytes(n) { return n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }
  function usage() {
    let tests = [], plans = [], w = null, st = {}, used = 0, keys = 0;
    try { tests = SBTestPrep.summary(); } catch (e) { /* not loaded */ }
    try { plans = SBStudyPlan.plans(); } catch (e) { /* not loaded */ }
    try { w = SBWordStats.progressSummary(); } catch (e) { /* not loaded */ }
    try { st = JSON.parse(localStorage.getItem('tuition_hub_study_stats') || '{}'); } catch (e) { st = {}; }
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); used += (k.length + (localStorage.getItem(k) || '').length) * 2; keys++; } } catch (e) { /* storage blocked */ }
    return { tests, plans, w, st, used, keys, mcqs: tests.reduce((a, t) => a + t.mcqs, 0), mins: tests.reduce((a, t) => a + t.minutes, 0) };
  }
  function renderAccount(el) {
    css();
    if (!el) return;
    const U = usage();
    let user = null; try { user = window.SpaceBookAuth && SpaceBookAuth.user; } catch (e) { user = null; }
    const coins = (() => { try { return SBRewards.coins; } catch (e) { return 0; } })();
    const sub = window.SB_SUBSCRIPTION || null;
    const plans = Array.isArray(window.SB_PLANS) && window.SB_PLANS.length ? window.SB_PLANS : [
      { id: 'free', name: 'Free', price: '0', period: 'forever', current: true, features: ['Every textbook, Class 1 to 12', 'Word meanings and sentence meanings (offline)', 'Animated solutions', 'Test preparation MCQ bank', 'Study plans and reminders', 'Progress saved on this device'] },
      { id: 'premium', name: 'Premium', price: null, period: '', soon: true, features: ['Progress saved in your account on every device', 'More study plans and test papers', 'Priority support'] }
    ];
    const curId = (sub && sub.plan) || (plans.find(p => p.current) || plans[0]).id;
    const stat = (v, l) => `<div class="sbhp-k"><b>${esc(v)}</b><span>${esc(l)}</span></div>`;
    el.innerHTML = `<div class="sbhp">
      <div class="sbhp-h"><h3>👤 My account</h3>${user ? '<button type="button" class="sbhp-btn" data-a="profile">✏️ Profile, password &amp; data</button>' : '<button type="button" class="sbhp-btn pri" data-a="login" style="--c:#027cba">Log in</button>'}</div>
      <div class="sbhp-sum">
        ${stat(user ? (user.name || user.email || 'Signed in') : 'Guest', user ? (user.email || 'signed-in account') : 'not logged in: progress stays on this device')}
        ${stat(plans.find(p => p.id === curId).name, 'current plan' + (sub && sub.status ? ' · ' + sub.status : ''))}
        ${stat(sub && sub.renews ? sub.renews : '—', 'renews / valid until')}
        ${stat(user ? 'On' : 'Off', 'saving progress to your account')}
      </div>
      <div class="sbhp-h"><h3>💳 Plans &amp; pricing</h3></div>
      <div class="sbhp-grid">${plans.map(p => `<article class="sbhp-card" style="--c:${p.id === curId ? '#16a34a' : '#64748b'}">
        <div class="sbhp-top"><div><h4>${esc(p.name)}</h4><small>${p.id === curId ? '✅ Your current plan' : p.soon ? 'Coming soon' : 'Available'}</small></div>
        <span class="sbhp-pct" style="font-size:1.2rem">${p.price == null ? 'Price to be announced' : (p.price === '0' ? 'Free' : esc(p.price) + (p.period ? ' / ' + esc(p.period) : ''))}</span></div>
        <div class="sbhp-rec">${(p.features || []).map(f => `<div><span>✔ ${esc(f)}</span></div>`).join('')}</div></article>`).join('')}</div>
      <div class="sbhp-h"><h3>📈 Usage</h3></div>
      <div class="sbhp-sum">
        ${stat(U.mcqs, 'test MCQs answered')}${stat(U.st.studiedQuestions || 0, 'questions practised (all drills)')}${stat(U.mins, 'minutes of test study')}
        ${stat(U.tests.length, 'tests started')}${stat(U.plans.length, 'study plans')}${stat(U.w ? U.w.total : 0, 'words marked learnt / known')}
        ${stat(coins, 'reward coins')}${stat(bytes(U.used), 'saved on this device (' + U.keys + ' items)')}
      </div>
      <p style="font-size:.8rem;color:#64748b;margin:0">Usage is counted from what this browser has saved${user ? ' and your account' : ''}. Nothing here is billed: every feature is currently free.</p>
    </div>`;
    el.onclick = e => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      if (b.dataset.a === 'login') { try { SpaceBookAuth.open('login'); } catch (er) { /* auth not loaded */ } }
      if (b.dataset.a === 'profile') { try { SpaceBookAuth.openAccount(); } catch (er) { /* auth not loaded */ } }
    };
  }

  window.SBHomePlans = { render, renderAccount };
  // numbers change while the student works elsewhere and the sign-in pulls the account copy: refresh when the home page is on screen
  window.addEventListener('load', () => setTimeout(() => render(), 300));   // plans and tests finish loading after the first home render
  document.addEventListener('spacebook:auth', () => setTimeout(() => render(), 800));
})();
