/* SpaceBook presentation components. All values come from the existing local study stores. */
(function () {
  'use strict';
  const n = v => Math.max(0, Number(v) || 0);
  const fmt = v => n(v).toLocaleString();
  const flag = key => `<svg viewBox="0 0 32 24" aria-hidden="true">${({en:'<path fill="#123a84" d="M0 0h32v24H0z"/><path stroke="#fff" stroke-width="6" d="m0 0 32 24M32 0 0 24"/><path stroke="#d6263e" stroke-width="2" d="m0 0 32 24M32 0 0 24"/><path stroke="#fff" stroke-width="8" d="M16 0v24M0 12h32"/><path stroke="#d6263e" stroke-width="4" d="M16 0v24M0 12h32"/>',ur:'<path fill="#fff" d="M0 0h32v24H0z"/><path fill="#086b42" d="M7 0h25v24H7z"/><path fill="#fff" d="M23 4a8 8 0 1 0 3 13A7 7 0 0 1 23 4"/><path fill="#fff" d="m23 5 1 3 3 .2-2.4 1.8.8 3-2.4-1.8-2.4 1.8.8-3L18.7 8 22 8z"/>',ps:'<path d="M0 0h11v24H0z" fill="#172025"/><path d="M11 0h10v24H11z" fill="#d72d3c"/><path d="M21 0h11v24H21z" fill="#128752"/><circle cx="16" cy="12" r="6" fill="none" stroke="#fff"/><path stroke="#fff" fill="none" d="M13 17V9l3-3 3 3v8M12 18h8M14 11h4"/>',ar:'<path fill="#087540" d="M0 0h32v24H0z"/><text x="16" y="13" text-anchor="middle" fill="#fff" font-size="11">العربية</text><path stroke="#fff" d="M7 18h19"/>'})[key]}</svg>`;
  const languages = [['en','English','#0785ff',flag('en')],['ur','Urdu','#07994c',flag('ur')],['ps','Pashto','#8a22ef',flag('ps')],['ar','Arabic','#ef8300',flag('ar')]];
  const paths={words:'M4 4h16v16H4zM8 8h8M8 12h8M8 16h5',questions:'M8 4h8v3H8zM6 5H4v16h16V5h-2M8 13l3 3 5-6',time:'M12 7v6l4 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18',trend:'M3 20V4M3 20h18M6 15l5-6 4 3 6-8M16 4h5v5',subjects:'M4 3h16v18H4zM8 7h8M8 11h8M8 15h8',award:'m12 3 3 6 6 1-4 5 1 6-6-3-6 3 1-6-4-5 6-1z',next:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10M12 10v4M10 12h4'};
  const icon = (name, color = '#0785ff') => `<span class="sbd-icon" style="--accent:${color}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${paths[name]||paths.words}"/></svg></span>`;
  const card = (name, title, content, extra = '', color) => `<section class="sbd-card ${extra}"><div class="sbd-card-head">${icon(name,color)}<div><h2>${title}</h2></div></div>${content}</section>`;
  function dashboard(tests, plans) {
    let words = {byLang:{},total:0,week:0};
    try { words = SBWordStats.progressSummary(); } catch (_) { /* first load */ }
    const attempted = tests.reduce((s,t) => s+n(t.mcqs),0), correct = tests.reduce((s,t) => s+n(t.correct),0);
    const accuracy = attempted ? Math.round(correct / attempted * 100) : 0;
    const minutes = tests.reduce((s,t) => s+n(t.minutes),0);
    const recent = tests.flatMap(t => t.recent || []).sort((a,b) => a.ts-b.ts);
    const categories = {mcq:{n:attempted,done:correct},sq:{n:0,done:0},lq:{n:0,done:0}};
    plans.forEach(p => { try { const byCat=SBStudyPlan.stats(p).byCat; Object.entries(byCat).forEach(([key,v]) => { const k=/short|sq/i.test(key)?'sq':/long|lq/i.test(key)?'lq':null; if(k){categories[k].n+=n(v.n);categories[k].done+=n(v.done);} }); } catch (_) {} });
    const langCards = languages.map(([key,name,color,label]) => { const m=words.byLang[key] || {}; const known=n(m.learnt)+n(m.knew); return `<button class="sbd-language" style="--accent:${color}" onclick="SBWordStats.openExplorer('project','${key}','all')"><span class="sbd-language-name"><span class="sbd-language-badge">${label}</span>${name}</span><strong>${fmt(known)}</strong><span>Known words</span><div class="sbd-track"><i style="width:${known?Math.max(4,Math.min(100,known/Math.max(1,words.total)*100)):0}%"></i></div><small>${fmt(m.learnt)} learnt · ${fmt(m.knew)} already knew</small></button>`; }).join('');
    const rings = [['mcq','MCQs','#0785ff'],['sq','Short Questions','#07994c'],['lq','Long Questions','#8a22ef']].map(([key,title,color]) => { const v=categories[key], pct=v.n?Math.round(v.done/v.n*100):0; return `<div class="sbd-question" style="--accent:${color}"><b>${title}</b><strong>${fmt(v.n)}</strong><span>${key==='mcq'?'Attempted':'Planned items'}</span><div class="sbd-ring" style="--progress:${pct}%"><div><b>${pct}%</b><small>${key==='mcq'?'Accuracy':'Completed'}</small></div></div></div>`; }).join('');
    const day = 86400000, today = new Date(); today.setHours(0,0,0,0);
    const week=Array.from({length:7},(_,i) => {const start=today.getTime()-(6-i)*day; return {label:new Date(start).toLocaleDateString('en',{weekday:'short'}),value:recent.filter(r=>r.ts>=start&&r.ts<start+day).reduce((s,r)=>s+n(r.n),0)};});
    const peak=Math.max(1,...week.map(d=>d.value));
    const bars=week.map(d=>`<div><div class="sbd-bar-well"><i style="height:${d.value/peak*100}%" title="${d.value} questions"></i></div><small>${d.label}</small></div>`).join('');
    const points=recent.slice(-8).map((r,i,a)=>`${24+i*260/Math.max(1,a.length-1)},${110-(r.n?r.c/r.n:0)*85}`).join(' ');
    const trend=`<div class="sbd-chart-caption"><span class="sbd-dot"></span> MCQ accuracy · recent sessions</div><svg class="sbd-line-chart" viewBox="0 0 310 135" role="img" aria-label="Accuracy of recent practice sessions"><path d="M24 25H300M24 65H300M24 110H300" stroke="#e1eaf7" fill="none"/>${points?`<polyline points="${points}" fill="none" stroke="#0785ff" stroke-width="3" stroke-linejoin="round"/>`:'<text x="155" y="72" text-anchor="middle" fill="#7183a1" font-size="12">Complete a practice session to see your trend</text>'}</svg>`;
    const subjectRows=plans.slice(0,5).map(p=>{const st=SBStudyPlan.stats(p);return `<button class="sbd-progress-row" onclick="SBStudyPlan.open('${String(p.id).replace(/[^a-zA-Z0-9_-]/g,'')}')"><span>${String(p.name).replace(/[<>&]/g,'')}</span><span class="sbd-track"><i style="width:${st.pct}%"></i></span><b>${st.pct}%</b></button>`;}).join('');
    return `<div class="sbd-dashboard">
      ${card('words','Vocabulary Progress',`<p class="sbd-description">Words you know in each language</p><div class="sbd-language-grid">${langCards}</div><button class="sbd-text-link" onclick="SBWordStats.openExplorer('project','all','all')">View Word Bank →</button>`,'sbd-vocabulary')}
      ${card('questions','Questions Practice',`<p class="sbd-description">Practice accuracy and planned learning</p><div class="sbd-question-grid">${rings}</div>`,'sbd-practice','#8a22ef')}
      ${card('time','Study Time',`<div class="sbd-big-value">${Math.floor(minutes/60)}h ${minutes%60}m</div><p class="sbd-description">Recorded test study time</p><div class="sbd-bars">${bars}</div><small class="sbd-muted">Questions practised · last 7 days</small>`,'sbd-time','#8a22ef')}
      ${card('next','Learning Progress',`<div class="sbd-summary-cells"><div><b>${tests.length}</b><small>Test preparations</small></div><div><b>${plans.length}</b><small>Study plans</small></div></div><div class="sbd-plan-dial">${plans.length?Math.round(plans.reduce((s,p)=>s+SBStudyPlan.stats(p).pct,0)/plans.length):0}%</div><p class="sbd-description">Average study-plan completion</p>`,'sbd-speed')}
      ${card('trend','Performance Trend',trend,'sbd-trend','#f58100')}
      ${card('subjects','Subjects Progress',subjectRows || `<p class="sbd-empty-copy">Your subject progress will appear when you start a study plan.</p><button class="sbd-primary" onclick="renderPage('study-plan')">Create a study plan →</button>`,'sbd-subjects')}
      ${card('award','Achievements',`<div class="sbd-achievements"><div><span>♜</span><b>${fmt(attempted)}</b><small>MCQs attempted</small></div><div><span>☆</span><b>${fmt(words.week)}</b><small>Words this week</small></div><div><span>✓</span><b>${accuracy}%</b><small>Accuracy</small></div></div>`,'sbd-awards','#efaf00')}
      ${card('next','What to Study Next?',`<button class="sbd-next" onclick="renderPage('tests-preps')"><span>Practise from your textbooks</span><b>Start →</b></button><button class="sbd-next" onclick="SBWordStats.openExplorer('project','all','new')"><span>Learn new vocabulary</span><b>Start →</b></button><button class="sbd-next" onclick="renderPage('study-plan')"><span>Continue your study plan</span><b>Open →</b></button>`,'sbd-next-card','#8a22ef')}
    </div>`;
  }
  function preparation(tests) {
    const safe = v => String(v == null ? '' : v).replace(/[<>&"']/g, '');
    const ago = ts => { if (!ts) return ''; const m = Math.max(0, Math.round((Date.now() - ts) / 60000)); return m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' hours ago' : Math.round(m / 1440) + ' days ago'; };
    let st = { streak: 0, dailyGoal: 20, todayQuestions: 0 };
    try { st = Object.assign(st, getStudyStats()); } catch (_) { /* default */ }
    const tint = ['#0785ff', '#07994c', '#8a22ef'];
    const cards = tests.map((t, i) => {
      const wrong = Math.max(0, t.mcqs - t.correct);
      return `<article class="sbd-ptrack" style="--accent:${safe(t.color) || tint[i % 3]}"><header><span class="sbd-ptrack-ic">${safe(t.icon) || '📝'}</span><div><h3>${safe(t.title)}</h3><p>${safe(t.full)}</p></div><button type="button" class="sbd-chev" aria-label="Open" onclick="SBTestPrep.open('${safe(t.track)}')">›</button></header>
        <div class="sbd-mastery"><span>Mastery Progress</span><b>${t.acc}%</b></div><div class="sbd-track"><i style="width:${t.acc}%"></i></div>
        <div class="sbd-tiles"><div class="b"><b>${fmt(t.mcqs)}</b><small>Questions Attempted</small></div><div class="g"><b>${fmt(t.correct)}</b><small>Correct</small></div><div class="r"><b>${fmt(wrong)}</b><small>Incorrect</small></div></div>
        <div class="sbd-prow"><button type="button" class="sbd-play" onclick="SBTestPrep.open('${safe(t.track)}')"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M7 4l13 8-13 8z"/></svg>${t.paused ? 'Continue Practice' : 'Practice'}</button><button type="button" class="sbd-detail" onclick="SBTestPrep.open('${safe(t.track)}').then(()=>SBTestPrep.tab('stats'))">View Details</button></div></article>`;
    }).join('');
    const recent = tests.flatMap(t => (t.recent || []).map(r => Object.assign({ title: t.title, color: t.color }, r))).sort((x, y) => y.ts - x.ts).slice(0, 5);
    const rec = recent.map(r => `<li><span class="sbd-dotc" style="background:${safe(r.color)}"></span><span class="sbd-rt">${r.mode === 'mock' ? 'Mock test' : 'Practice'} — ${r.n} MCQs</span><em style="--c:${safe(r.color)}">${safe(r.title)}</em><b>${r.pct}%</b><small>${ago(r.ts)}</small></li>`).join('');
    const goalPct = Math.min(100, Math.round(100 * n(st.todayQuestions) / Math.max(1, n(st.dailyGoal))));
    return `<section class="sbd-preparation">
      <div class="sbd-prep-heading"><span class="sbd-prep-ic"><svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM8 12h8M8 16h6"/></svg></span><div><h1>Tests Preps</h1><p>Practice chapter-wise tests, track your progress and get ready for exams.</p></div>
      <button type="button" class="sbd-create" onclick="document.getElementById('sbdAllTracks').scrollIntoView({behavior:'smooth'})"><span>+</span>Create Preparation Track</button></div>
      <div class="sbd-filters"><label>Exam scale<select id="sbdFScale" onchange="SBDesignUI.filterTracks()"><option value="">All scales</option>${['BPS-12','BPS-14','BPS-15','BPS-16','BPS-17'].map(x => `<option>${x}</option>`).join('')}</select></label><label>Show<select id="sbdFShow" onchange="SBDesignUI.filterTracks()"><option value="all">All Tracks</option><option value="active">Active Tracks</option></select></label><label class="sbd-fsearch">Search<input id="sbdFText" type="search" placeholder="Search tracks…" oninput="SBDesignUI.filterTracks()"></label></div>
      <h2 class="sbd-h2"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#1d6fe8" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="#1d6fe8"/></svg>Your Preparation Tracks</h2>
      <div class="sbd-ptracks">${cards || `<article class="sbd-ptrack sbd-pempty"><h3>Start your first preparation</h3><p>Choose an exam below. Your progress and results will appear here.</p></article>`}</div>
      <div class="sbd-prep-two"><section class="sbd-panel"><h3>Recent Practice Activity</h3>${rec ? `<ul class="sbd-recent">${rec}</ul>` : '<p class="sbd-empty-copy">No practice yet. Pick a track below and answer a few MCQs.</p>'}</section>
      <section class="sbd-panel"><h3>Study Streak &amp; Goals</h3><div class="sbd-streak"><div><b>${n(st.streak)}</b><small>Days<br>Study Streak</small></div><div><b>${n(st.todayQuestions)} / ${n(st.dailyGoal)}</b><small>Daily Goal<br>Today</small></div><div><b>${tests.reduce((x, t) => x + t.sessions, 0)}</b><small>Sessions<br>Completed</small></div></div><div class="sbd-track"><i style="width:${goalPct}%"></i></div></section></div>
      <h2 class="sbd-h2" id="sbdAllTracks">All Preparation Tracks</h2></section>`;
  }
  function filterTracks() {
    const sc = (document.getElementById('sbdFScale') || {}).value || '', show = (document.getElementById('sbdFShow') || {}).value || 'all', q = ((document.getElementById('sbdFText') || {}).value || '').toLowerCase();
    const active = new Set([...document.querySelectorAll('.sbd-ptrack h3')].map(h => h.textContent.trim()));
    document.querySelectorAll('.prep-jewel-card').forEach(c => {
      const t = c.textContent.toLowerCase(), name = (c.querySelector('.pjc-name') || {}).textContent || '';
      const ok = (!sc || t.indexOf(sc.toLowerCase()) >= 0) && (!q || t.indexOf(q) >= 0) && (show === 'all' || active.has(name.trim()));
      c.style.display = ok ? '' : 'none';
    });
  }
  window.SBDesignUI = { dashboard, preparation, filterTracks };
})();
