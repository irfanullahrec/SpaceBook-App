/* sb_feed.js — Home → "News Feed": what students share with each other (api/feed.php, rules in api/lib/feed.php).
 *
 * The same function and data as the Android app's News Feed (SpaceBook App, ui/feed): posts with a text and, for a My Stats / Today / Study plan
 * post, a card made from the student's OWN records on this browser (nothing is typed in, so nobody posts made-up scores); likes, comments with
 * replies, shares into the feed, reports and deleting your own posts. Only signed-in students can read or write; the server shows another
 * student as "Ali K." and nothing else.
 *
 *   SBFeed.mount()          adds the tab and its panel to the Home page (called after every renderHome)
 *   SBFeed.cards            the card builders: SBFeed.cards.stats() / .progress() / .plan(id) / .question(subject, cls), null when there is nothing to share
 *   SBFeed.timeAgo(ms, now) "Just now", "5m", "3h", "Yesterday" ...
 *
 * Everything the server or a student wrote is put on the page with esc() or textContent. */
(function () {
  'use strict';
  const API = 'api/feed.php';
  const PAGE = 20;
  const POST_MAX = 1500;
  const COMMENT_MAX = 500;
  const KINDS = {
    text: { emoji: '✏️', label: 'Post', hint: "What's on your mind?" },
    question: { emoji: '❓', label: 'Question', hint: 'Ask your question…' },
    stats: { emoji: '📊', label: 'My Stats', hint: 'Say something about your stats (optional)' },
    progress: { emoji: '🎯', label: 'Today', hint: 'Say something about your day (optional)' },
    plan: { emoji: '📅', label: 'Study plan', hint: 'Say something about your plan (optional)' },
  };
  const REASONS = [['unkind', 'Unkind or bullying'], ['personal', "Shares someone's personal details"], ['spam', 'Spam or advertising'], ['wrong', 'Wrong or misleading'], ['other', 'Something else']];

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = v => (Number.isFinite(+v) ? Math.max(0, Math.round(+v)) : 0);

  function shortCount(n) {
    n = num(n);
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1e4) return Math.floor(n / 1000) + 'K';
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }
  const countText = (n, one, many) => shortCount(n) + ' ' + (n === 1 ? one : (many || one + 's'));
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  /** "Just now", "5m", "3h", "Yesterday", "3d", "Oct 24", "Oct 24, 2025": the way the app writes the age of a post */
  function timeAgo(at, now) {
    if (!at) return '';
    now = now || Date.now();
    const diff = now - at;
    if (diff < 60000) return 'Just now';
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return minutes + 'm';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + 'h';
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return days + 'd';
    const d = new Date(at), n = new Date(now);
    return MONTHS[d.getMonth()] + ' ' + d.getDate() + (d.getFullYear() === n.getFullYear() ? '' : ', ' + d.getFullYear());
  }

  // ---------------------------------------------------------------- the student's own numbers (the cards)
  // Reads what js/test_prep.js (sbTP:v1:<user>), js/sb_study_plan.js (sb_study_plans_v1) and js/word_stats.js (sbWS:progress:<user>) keep in this browser:
  // the same numbers the app reads from its copy of the website (assets/prep_summary.js).
  const CAT_MIN = { read: 20, slo: 3, mcq: 1.5, tf: 1, blank: 1, match: 2, sq: 5, lq: 15, num: 8, ex: 4 };
  const DAY = 86400000;
  const pad = n => (n < 10 ? '0' + n : '' + n);
  const ymd = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const readKey = (k, fb) => { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? fb : v; } catch (e) { return fb; } };
  function userId() { let u = null; try { u = window.SpaceBookAuth && window.SpaceBookAuth.user; } catch (e) { u = null; } return u || null; }
  function userKeyPart() { const u = userId(); const id = u && (u.id || u.email || u.name); return id ? String(id).toLowerCase() : 'guest'; }

  function collect(now) {
    const today = new Date(now || Date.now());
    const t = ymd(today);
    const out = { today: t, totals: { questions: 0, correct: 0, minutes: 0, sessions: 0, streak: 0, todayQuestions: 0, todayCorrect: 0, todayMinutes: 0 }, tests: [], plans: [], words: 0 };
    const db = readKey('sbTP:v1:' + userKeyPart(), null);
    if (db) {
      const days = db.days || {};
      const all = days.all || {};
      Object.keys(all).forEach(date => { const r = all[date]; out.totals.minutes += Math.round((r[0] || 0) / 60000); out.totals.questions += r[1] || 0; out.totals.correct += r[2] || 0; });
      out.totals.sessions = Array.isArray(db.sessions) ? db.sessions.length : 0;
      const tr = all[t];
      if (tr) { out.totals.todayMinutes = Math.round((tr[0] || 0) / 60000); out.totals.todayQuestions = tr[1] || 0; out.totals.todayCorrect = tr[2] || 0; }
      let d = new Date(today.getTime());
      if (!(all[ymd(d)] && all[ymd(d)][1] > 0)) d = new Date(d.getTime() - DAY);               // today may not have started yet
      while (all[ymd(d)] && all[ymd(d)][1] > 0) { out.totals.streak++; d = new Date(d.getTime() - DAY); }
      Object.keys(days).forEach(track => {
        if (track === 'all') return;
        let q = 0, c = 0;
        Object.keys(days[track] || {}).forEach(date => { q += days[track][date][1] || 0; c += days[track][date][2] || 0; });
        if (q > 0) out.tests.push({ title: track.toUpperCase(), mcqs: q, acc: q ? Math.round(100 * c / q) : 0 });
      });
      out.tests.sort((a, b) => b.mcqs - a.mcqs);
    }
    let plans = readKey('sb_study_plans_v1', []);
    if (!Array.isArray(plans)) plans = [];
    out.plans = plans.filter(p => p && Array.isArray(p.sessions)).map(p => {
      let all = 0, done = 0, items = 0, itemsDone = 0, todayTasks = 0, todayDone = 0;
      p.sessions.forEach(s => (s.tasks || []).forEach(k => {
        if (k.cat === 'rev') return;
        const m = CAT_MIN[k.cat] || 1, dn = Math.min(k.done || 0, k.n);
        all += m * k.n; done += m * dn; items += k.n; itemsDone += dn;
        if (s.date === t) { todayTasks++; if (dn >= k.n) todayDone++; }
      }));
      const day = x => { const q = String(x).split('-'); return new Date(+q[0], +q[1] - 1, +q[2]).getTime(); };
      return { id: p.id, name: p.name || 'Study plan', classId: p.classId || '', subjects: (p.scope || []).map(sc => ({ id: sc.subj, chapters: (sc.ch || []).length })), pct: all ? Math.round(done * 100 / all) : 0, items, itemsDone, todayTasks, todayDone,
        days: p.start && p.end ? Math.max(0, Math.round((day(p.end) - day(p.start)) / DAY) + 1) : 0, updatedAt: p.updatedAt || 0 };
    }).sort((a, b) => b.updatedAt - a.updatedAt);
    const w = readKey('sbWS:progress:' + userKeyPart(), null);
    out.words = w && w.words ? Object.keys(w.words).filter(k => w.words[k] && (w.words[k].s === 'l' || w.words[k].s === 'k')).length : 0;
    return out;
  }

  const cards = {
    /** the My Stats card, or null when nothing has been done yet */
    stats(now) {
      const d = collect(now), t = d.totals;
      if (!t.questions && !t.minutes && !d.words && !d.plans.length && !d.tests.length) return null;
      return { v: 1, questions: t.questions, accuracy: t.questions ? Math.round(100 * t.correct / t.questions) : 0, minutes: t.minutes, streak: t.streak, sessions: t.sessions, words: d.words, plans: d.plans.length,
        tests: d.tests.slice(0, 6).map(x => ({ title: x.title, mcqs: x.mcqs, acc: x.acc })) };
    },
    /** today's study, or null when nothing was studied today */
    progress(now, coins) {
      const d = collect(now), t = d.totals;
      const tasksTotal = d.plans.reduce((a, p) => a + p.todayTasks, 0), tasksDone = d.plans.reduce((a, p) => a + p.todayDone, 0);
      if (!t.todayQuestions && !t.todayMinutes && !tasksTotal) return null;
      let c = coins; if (c == null) { try { c = window.SBRewards ? window.SBRewards.coins : 0; } catch (e) { c = 0; } }
      return { v: 1, date: d.today, questions: t.todayQuestions, correct: t.todayCorrect, minutes: t.todayMinutes, goal: 20, coins: num(c), streak: t.streak, tasksDone, tasksTotal };
    },
    /** a study plan as a card; id of the plan, the newest plan when omitted */
    plan(id, now) {
      const d = collect(now), p = id ? d.plans.find(x => x.id === id) : d.plans[0];
      if (!p) return null;
      return { v: 1, name: p.name, label: planLabel(p), subjects: subjectNames(p).slice(0, 8), days: p.days, tasks: p.items, done: p.itemsDone };
    },
    question(subject, cls, chapter) {
      subject = String(subject || '').trim(); cls = String(cls || '').trim(); chapter = String(chapter || '').trim();
      return subject || cls || chapter ? { v: 1, subject: subject.slice(0, 60), cls: cls.slice(0, 40), chapter: chapter.slice(0, 80) } : null;
    },
    collect,
  };

  // class and subject names come from the study index (js/study_plan_index.js), the same list the Study Plan page uses
  function classList() { try { const I = window.SB_STUDY_INDEX; return I && I.classes || []; } catch (e) { return []; } }
  const classOf = id => classList().find(c => c.id === id) || null;
  function subjectNames(p) {
    const c = classOf(p.classId), out = [];
    (p.subjects || []).forEach(sc => { const s = c && (c.subjects || []).find(x => x.id === sc.id); if (s && s.name && out.indexOf(s.name) < 0) out.push(s.name); });
    return out;
  }
  /** "Class 6 · all subjects" / "Class 6 · Mathematics · 3 chapters" / "Class 9 · 2 subjects": the label the Study Plan page and the app use */
  function planLabel(p) {
    const c = classOf(p.classId), cn = c ? c.name : String(p.classId || '').replace(/^cls/, 'Class ');
    const sc = p.subjects || [];
    if (!sc.length) return cn;
    if (c && sc.length === (c.subjects || []).length && sc.every(x => { const s = c.subjects.find(y => y.id === x.id); return s && (s.chapters || []).length === x.chapters; })) return cn + ' · all subjects';
    if (sc.length === 1) {
      const s = c && (c.subjects || []).find(y => y.id === sc[0].id), ch = sc[0].chapters;
      return cn + ' · ' + (s ? s.name : sc[0].id) + (s && ch === (s.chapters || []).length ? '' : ' · ' + ch + ' chapter' + (ch === 1 ? '' : 's'));
    }
    return cn + ' · ' + sc.length + ' subjects';
  }

  // ---------------------------------------------------------------- styles
  function css() {
    if (document.getElementById('sbfd-css')) return;
    const s = document.createElement('style'); s.id = 'sbfd-css';
    s.textContent = `
.sbfd{--v:#5b4bff;--vd:#3b2fd1;--bg:#f0f2f5;--card:#fff;--ink:#17143a;--mut:#65676b;--line:#e4e6eb;max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:8px;color:var(--ink)}
.sbfd *{box-sizing:border-box}
.sbfd-card{background:var(--card);border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,.12);overflow:hidden}
.sbfd-comp{padding:12px}
.sbfd-comp-row{display:flex;gap:10px;align-items:center}
.sbfd-pill{flex:1;text-align:left;border:0;background:#f0f2f5;color:var(--mut);border-radius:22px;padding:11px 16px;font:inherit;font-size:1rem;cursor:pointer}
.sbfd-pill:hover{background:#e4e6eb}
.sbfd-quick{display:flex;border-top:1px solid var(--line);margin:12px -12px -12px}
.sbfd-quick button{flex:1;border:0;background:none;padding:10px 4px;font:inherit;font-size:.82rem;color:var(--mut);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px}
.sbfd-quick button b{font-size:1.25rem;line-height:1}
.sbfd-quick button:hover{background:#f5f6f7}
.sbfd-av{flex:none;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:700;width:42px;height:42px;font-size:1.1rem}
.sbfd-av.s{width:32px;height:32px;font-size:.9rem}
.sbfd-filters{display:flex;gap:8px;padding:8px 12px;background:var(--card);border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,.12);flex-wrap:wrap}
.sbfd-chip{border:1px solid var(--line);background:#fff;border-radius:99px;padding:.35rem .9rem;font:inherit;font-size:.9rem;cursor:pointer;color:var(--ink)}
.sbfd-chip[aria-pressed=true]{background:#e7e3ff;border-color:var(--v);color:var(--vd);font-weight:700}
.sbfd-head{display:flex;gap:10px;align-items:center;padding:12px 12px 6px}
.sbfd-who{flex:1;min-width:0}
.sbfd-name{font-weight:700;display:flex;align-items:center;gap:4px}
.sbfd-tick{color:#2f8cff;font-size:.95rem}
.sbfd-sub{font-size:.82rem;color:var(--mut);display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.sbfd-qb{background:linear-gradient(90deg,var(--v),#ff5c8a);color:#fff;border-radius:99px;padding:1px 9px;font-size:.75rem;font-weight:700}
.sbfd-menu{position:relative}
.sbfd-dots{border:0;background:none;font-size:1.4rem;line-height:1;width:36px;height:36px;border-radius:50%;cursor:pointer;color:var(--mut)}
.sbfd-dots:hover{background:#f0f2f5}
.sbfd-pop{position:absolute;right:0;top:36px;z-index:20;background:#fff;border-radius:10px;box-shadow:0 2px 14px rgba(0,0,0,.25);min-width:170px;padding:6px}
.sbfd-pop button{display:block;width:100%;text-align:left;border:0;background:none;font:inherit;padding:.5rem .7rem;border-radius:8px;cursor:pointer}
.sbfd-pop button:hover{background:#f0f2f5}
.sbfd-pop .bad{color:#c0262d}
.sbfd-body{padding:4px 12px 8px;white-space:pre-wrap;overflow-wrap:anywhere;font-size:1.02rem;line-height:1.45}
.sbfd-body.rtl{text-align:right}
.sbfd-more{border:0;background:none;color:var(--mut);font:inherit;font-weight:700;padding:0 12px 8px;cursor:pointer}
.sbfd-big{min-height:190px;display:flex;align-items:center;justify-content:center;text-align:center;color:#fff;font-weight:700;font-size:1.6rem;line-height:1.35;padding:24px;white-space:pre-wrap;overflow-wrap:anywhere}
.sbfd-attach{margin:6px 12px;border-radius:14px;overflow:hidden;background:#f6f5ff;border:1px solid #e7e3ff}
.sbfd-band{padding:12px 14px;color:#fff}.sbfd-band b{display:block;font-size:1.05rem}.sbfd-band span{font-size:.82rem;opacity:.9}
.sbfd-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(78px,1fr));gap:8px;padding:12px}
.sbfd-tile{text-align:center;border-radius:12px;padding:8px 4px;background:color-mix(in srgb,var(--c) 14%,transparent)}
.sbfd-tile b{display:block;font-size:1.3rem;color:var(--c)}.sbfd-tile span{font-size:.75rem;color:var(--mut)}
.sbfd-chips{display:flex;gap:6px;flex-wrap:wrap;padding:0 12px 12px}
.sbfd-chips span{background:#e7e3ff;color:var(--vd);border-radius:99px;padding:2px 10px;font-size:.78rem;font-weight:600}
.sbfd-bar{height:9px;border-radius:99px;background:#dcd8f5;overflow:hidden;margin:0 12px 8px}.sbfd-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#ff5c8a,#ff9a6b)}
.sbfd-trow{display:flex;gap:8px;align-items:center;padding:0 12px 8px;font-size:.82rem}.sbfd-trow b{width:56px}.sbfd-trow .sbfd-bar{flex:1;margin:0}.sbfd-trow .sbfd-bar i{background:#16a34a}
.sbfd-ring{--p:0;width:84px;height:84px;border-radius:50%;background:conic-gradient(#22c7a0 calc(var(--p)*1%),#dcd8f5 0);display:flex;align-items:center;justify-content:center;flex:none}
.sbfd-ring i{font-style:normal;width:64px;height:64px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-weight:800}
.sbfd-prog{display:flex;gap:14px;align-items:center;padding:12px}.sbfd-prog>div:last-child{flex:1}
.sbfd-shared{margin:4px 12px 8px;border:1px solid var(--line);border-radius:12px}
.sbfd-gone{padding:14px;color:var(--mut)}
.sbfd-counts{display:flex;justify-content:space-between;align-items:center;padding:6px 12px;color:var(--mut);font-size:.9rem}
.sbfd-counts button{border:0;background:none;color:inherit;font:inherit;cursor:pointer}
.sbfd-counts .l{display:flex;gap:6px;align-items:center}
.sbfd-counts .l i{font-style:normal;background:var(--v);color:#fff;border-radius:50%;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;font-size:.7rem}
.sbfd-acts{display:flex;border-top:1px solid var(--line);margin:0 12px}
.sbfd-acts button{flex:1;border:0;background:none;padding:10px 4px;font:inherit;font-weight:600;color:var(--mut);cursor:pointer;border-radius:8px}
.sbfd-acts button:hover{background:#f0f2f5}
.sbfd-acts button.on{color:var(--v)}
.sbfd-cm{border-top:1px solid var(--line);padding:8px 12px 12px;display:flex;flex-direction:column;gap:8px}
.sbfd-c{display:flex;gap:8px}.sbfd-c.r{margin-left:40px}
.sbfd-cb{background:#f0f2f5;border-radius:16px;padding:7px 12px;overflow-wrap:anywhere;white-space:pre-wrap}.sbfd-cb b{display:block;font-size:.88rem}
.sbfd-cm small{color:var(--mut);display:flex;gap:12px;padding:2px 12px;align-items:center}
.sbfd-cm small button{border:0;background:none;font:inherit;font-weight:700;color:var(--mut);cursor:pointer;padding:0}
.sbfd-cm small button.on{color:var(--v)}
.sbfd-in{display:flex;gap:8px;align-items:flex-end}.sbfd-in textarea{flex:1;border:0;background:#f0f2f5;border-radius:18px;padding:9px 14px;font:inherit;resize:none;min-height:40px;max-height:120px}
.sbfd-send,.sbfd-btn{border:0;background:var(--v);color:#fff;border-radius:99px;padding:.5rem 1.1rem;font:inherit;font-weight:700;cursor:pointer}
.sbfd-btn.alt{background:#e7e3ff;color:var(--vd)}.sbfd-send:disabled,.sbfd-btn:disabled{opacity:.45;cursor:default}
.sbfd-note{padding:18px;text-align:center;color:var(--mut)}
.sbfd-note h3{margin:.3rem 0;color:var(--ink)}.sbfd-note b.big{font-size:2rem;display:block}
.sbfd-off{background:#e6fbf5;border-radius:12px;padding:8px 14px;font-size:.88rem}
.sbfd-sk{padding:14px;display:flex;flex-direction:column;gap:10px}.sbfd-sk i{display:block;border-radius:8px;background:#e4e6eb;height:12px;animation:sbfdp 1s ease-in-out infinite alternate}
@keyframes sbfdp{from{opacity:.45}to{opacity:1}}
.sbfd-modal{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1200;display:flex;align-items:center;justify-content:center;padding:16px}
.sbfd-dlg{background:#fff;border-radius:16px;max-width:520px;width:100%;max-height:92vh;overflow:auto;padding:0}
.sbfd-dh{display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--line)}.sbfd-dh h3{flex:1;margin:0;text-align:center;font-size:1.1rem}
.sbfd-x{border:0;background:#e4e6eb;border-radius:50%;width:34px;height:34px;font-size:1.1rem;cursor:pointer}
.sbfd-db{padding:12px 16px;display:flex;flex-direction:column;gap:10px}
.sbfd-db textarea{width:100%;border:0;font:inherit;font-size:1.1rem;min-height:110px;resize:vertical;outline:0}
.sbfd-db select{font:inherit;padding:.4rem;border-radius:8px;border:1px solid var(--line)}
.sbfd-err{color:#c0262d;font-size:.9rem}
.sbfd-toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);background:#17143a;color:#fff;border-radius:99px;padding:.6rem 1.2rem;z-index:1300;max-width:90vw}
@media (prefers-color-scheme:dark){html:not([data-theme=light]) .sbfd{--card:#1a1735;--ink:#edebff;--mut:#b9b5e6;--line:#2d2a55}html:not([data-theme=light]) .sbfd-pill,html:not([data-theme=light]) .sbfd-cb,html:not([data-theme=light]) .sbfd-in textarea{background:#252148}html:not([data-theme=light]) .sbfd-attach{background:#201c45;border-color:#2d2a55}html:not([data-theme=light]) .sbfd-dlg,html:not([data-theme=light]) .sbfd-pop,html:not([data-theme=light]) .sbfd-chip{background:#1a1735;color:#edebff}html:not([data-theme=light]) .sbfd-ring i{background:#1a1735}}`;
    document.head.appendChild(s);
  }

  // ---------------------------------------------------------------- server calls
  async function call(action, opts) {
    opts = opts || {};
    const q = new URLSearchParams(Object.assign({ action }, opts.query || {})).toString();
    const init = { credentials: 'same-origin', headers: {} };
    if (opts.body !== undefined) { init.method = 'POST'; init.headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(opts.body); }
    let res;
    try { res = await fetch(API + '?' + q, init); } catch (e) { return { ok: false, offline: true, code: 0, error: 'You are offline. Try again when you are connected.' }; }
    let j = null;
    try { j = await res.json(); } catch (e) { j = null; }
    if (!res.ok || !j) return { ok: false, code: res.status, error: (j && j.error) || (res.status === 401 ? 'Please sign in to use the News Feed.' : 'Something went wrong (' + res.status + ')') };
    return j;
  }

  // ---------------------------------------------------------------- state
  const S = { posts: [], next: 0, filter: 'all', loading: false, more: false, end: false, offline: false, error: '', needSignIn: false, loadedAt: 0, open: {}, host: null, io: null, uid: 0 };
  const cache = {
    key: () => 'sbFeedCache:' + (userId() && userId().id),
    read() { try { return JSON.parse(localStorage.getItem(cache.key()) || '[]'); } catch (e) { return []; } },
    write(posts) { try { localStorage.setItem(cache.key(), JSON.stringify(posts.slice(0, PAGE))); } catch (e) { /* storage full or blocked */ } },
    clearAll() { try { Object.keys(localStorage).filter(k => k.indexOf('sbFeedCache:') === 0).forEach(k => localStorage.removeItem(k)); } catch (e) { /* fine */ } },
  };
  function toast(text) {
    const t = document.createElement('div'); t.className = 'sbfd-toast'; t.setAttribute('role', 'status'); t.textContent = text;
    document.body.appendChild(t); setTimeout(() => t.remove(), 3200);
  }
  const me = () => userId();
  function avatar(a, small) {
    const h = num(a && a.hue) % 360;
    return `<span class="sbfd-av${small ? ' s' : ''}" style="background:linear-gradient(135deg,hsl(${h} 62% 58%),hsl(${(h + 38) % 360} 70% 46%))" aria-hidden="true">${esc((a && a.initial) || '?')}</span>`;
  }
  function selfAuthor() {
    const u = me(); if (!u) return { initial: 'G', hue: 220, name: 'Guest' };
    const parts = String(u.name || '').trim().split(/\s+/).filter(Boolean);
    const name = !parts.length ? 'Student' : u.user_type === 'school' ? parts.join(' ').slice(0, 40) : parts.length === 1 ? parts[0].slice(0, 24) : parts[0].slice(0, 24) + ' ' + parts[parts.length - 1].charAt(0).toUpperCase() + '.';
    return { name, initial: name.charAt(0).toUpperCase(), hue: crc32('sbfeed' + u.id) % 360 };
  }
  function crc32(str) {
    let c, crc = 0xFFFFFFFF;
    const bytes = new TextEncoder().encode(str);
    for (let i = 0; i < bytes.length; i++) { c = (crc ^ bytes[i]) & 0xFF; for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xEDB88320 : c >>> 1; crc = (crc >>> 8) ^ c; }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  // ---------------------------------------------------------------- drawing
  function nameHtml(a) { return `<span class="sbfd-name">${esc(a.name)}${a.type === 'teacher' || a.type === 'school' ? `<span class="sbfd-tick" title="${a.type === 'teacher' ? 'Teacher' : 'School'}">✔</span>` : ''}</span>`; }
  const rtl = s => /[֐-ࣿ]/.test(String(s).slice(0, 40));

  function cardHtml(kind, c) {
    if (!c) return '';
    const tile = (v, l, col) => `<div class="sbfd-tile" style="--c:${col}"><b>${esc(v)}</b><span>${esc(l)}</span></div>`;
    const chips = a => a.length ? `<div class="sbfd-chips">${a.map(x => `<span>${esc(x)}</span>`).join('')}</div>` : '';
    if (kind === 'stats') {
      return `<div class="sbfd-attach" aria-label="My Stats"><div class="sbfd-band" style="background:linear-gradient(135deg,#5b4bff,#8b5cf6)"><b>📊 My Stats</b><span>Questions, time and words so far</span></div>
        <div class="sbfd-tiles">${tile(shortCount(c.questions), 'Questions', '#5b4bff')}${tile(num(c.accuracy) + '%', 'Right', '#16a34a')}${tile(shortCount(c.minutes), 'Minutes', '#2f8cff')}${tile(num(c.streak) + '🔥', 'Day streak', '#f59e0b')}</div>
        ${chips([c.words > 0 ? '🧠 ' + shortCount(c.words) + ' words' : '', c.sessions > 0 ? '🎯 ' + c.sessions + ' sessions' : '', c.plans > 0 ? '📅 ' + c.plans + (c.plans === 1 ? ' plan' : ' plans') : ''].filter(Boolean))}
        ${(c.tests || []).map(t => `<div class="sbfd-trow"><b>${esc(t.title)}</b><div class="sbfd-bar"><i style="width:${Math.min(100, num(t.acc))}%"></i></div><span>${num(t.acc)}% · ${shortCount(t.mcqs)} Qs</span></div>`).join('')}</div>`;
    }
    if (kind === 'progress') {
      const pct = c.goal > 0 ? Math.min(100, Math.floor(num(c.questions) * 100 / c.goal)) : c.tasksTotal > 0 ? Math.floor(num(c.tasksDone) * 100 / c.tasksTotal) : 0;
      return `<div class="sbfd-attach" aria-label="My study today"><div class="sbfd-band" style="background:linear-gradient(135deg,#0ea5a5,#22c7a0)"><b>🎯 My study today</b><span>${esc(c.date)}</span></div>
        <div class="sbfd-prog"><div class="sbfd-ring" style="--p:${pct}"><i>${pct}%</i></div><div><div class="sbfd-tiles" style="padding:0 0 8px">${tile(c.goal > 0 ? c.questions + '/' + c.goal : c.questions, 'Questions', '#5b4bff')}${tile(c.correct, 'Right', '#16a34a')}${tile(c.minutes, 'Minutes', '#2f8cff')}</div>
        ${chips([c.tasksTotal > 0 ? '📋 ' + c.tasksDone + '/' + c.tasksTotal + ' tasks done' : '', c.streak > 0 ? '🔥 ' + c.streak + '-day streak' : '', c.coins > 0 ? '⭐ ' + shortCount(c.coins) + ' coins' : ''].filter(Boolean)).replace('padding:0 12px 12px', '')}</div></div></div>`;
    }
    if (kind === 'plan') {
      return `<div class="sbfd-attach" aria-label="Study plan"><div class="sbfd-band" style="background:linear-gradient(135deg,#ff5c8a,#ff9a6b)"><b>📅 ${esc(c.name)}</b><span>${esc(c.label)}</span></div>
        <div style="padding:12px 0 4px"><div class="sbfd-bar"><i style="width:${Math.min(100, num(c.pct))}%"></i></div></div>
        <div style="padding:0 12px 8px;font-size:.85rem;color:var(--mut)"><b style="color:var(--ink)">${num(c.pct)}%</b> ${[c.tasks > 0 ? c.done + ' of ' + c.tasks + ' tasks done' : '', c.days > 0 ? c.days + ' days' : ''].filter(Boolean).join(' · ')}</div>${chips(c.subjects || [])}</div>`;
    }
    if (kind === 'question') return chips([c.cls, c.subject, c.chapter].filter(Boolean)).replace('padding:0 12px 12px', '');
    return '';
  }

  const BIG = ['linear-gradient(135deg,#6d5cff,#ff5c8a)', 'linear-gradient(135deg,#0ea5a5,#22c7a0)', 'linear-gradient(135deg,#2f8cff,#6d5cff)', 'linear-gradient(135deg,#f59e0b,#ef4444)', 'linear-gradient(135deg,#b249f8,#3fa9ff)'];
  const isBig = p => p.kind === 'text' && !p.card && p.body.length <= 90 && p.body.indexOf('\n') < 0;

  function bodyHtml(p) {
    if (isBig(p)) return `<div class="sbfd-big" style="background:${BIG[p.id % BIG.length]}"${rtl(p.body) ? ' dir="rtl"' : ''}>${esc(p.body)}</div>`;
    const long = p.body.length > 300 || p.body.split('\n').length > 6;
    const t = p.body ? `<div class="sbfd-body${long ? ' clip' : ''}" ${long ? 'style="max-height:9.5em;overflow:hidden"' : ''} ${rtl(p.body) ? 'dir="rtl"' : ''}>${esc(p.body)}</div>${long ? '<button type="button" class="sbfd-more" data-a="more">See more</button>' : ''}` : '';
    return t + cardHtml(p.kind, p.card);
  }

  function postHtml(p, now) {
    const sh = p.kind === 'share' ? (p.shared
      ? `<div class="sbfd-shared"><div class="sbfd-head">${avatar(p.shared.author, true)}<div class="sbfd-who">${nameHtml(p.shared.author)}<div class="sbfd-sub">${esc(timeAgo(p.shared.at, now))}</div></div></div>${p.shared.body ? `<div class="sbfd-body" ${rtl(p.shared.body) ? 'dir="rtl"' : ''}>${esc(p.shared.body)}</div>` : ''}${cardHtml(p.shared.kind, p.shared.card)}</div>`
      : `<div class="sbfd-shared sbfd-gone"><b>This post isn't available</b><br>It may have been deleted by the person who wrote it.</div>`) : '';
    const counts = (p.likes || p.comments || p.shares) ? `<div class="sbfd-counts"><span class="l">${p.likes ? `<i>👍</i>${esc(shortCount(p.likes))}` : ''}</span><span>${p.comments ? `<button type="button" data-a="comments">${esc(countText(p.comments, 'comment'))}</button>` : ''}${p.comments && p.shares ? ' · ' : ''}${p.shares ? esc(countText(p.shares, 'share')) : ''}</span></div>` : '';
    return `<article class="sbfd-card" data-id="${p.id}">
      <div class="sbfd-head">${avatar(p.author)}<div class="sbfd-who">${nameHtml(p.author)}<div class="sbfd-sub"><span>${esc(timeAgo(p.at, now))}${p.kind === 'share' ? ' · shared a post' : ''}</span><span aria-hidden="true">🌐</span>${p.kind === 'question' ? '<span class="sbfd-qb">❓ Question</span>' : ''}</div></div>
        <div class="sbfd-menu"><button type="button" class="sbfd-dots" data-a="menu" aria-label="More options" aria-haspopup="true">⋯</button></div></div>
      ${bodyHtml(p)}${sh}${counts}
      <div class="sbfd-acts"><button type="button" data-a="like" class="${p.liked ? 'on' : ''}" aria-pressed="${p.liked ? 'true' : 'false'}">${p.liked ? '👍 Liked' : '👍 Like'}</button><button type="button" data-a="comments">💬 Comment</button><button type="button" data-a="share">↗ Share</button></div>
      <div class="sbfd-cm-host"></div></article>`;
  }

  function render() {
    const host = S.host; if (!host || !host.isConnected) return;
    css();
    const u = me(), a = selfAuthor(), now = Date.now();
    const filt = [['all', 'All posts'], ['question', '❓ Questions'], ['mine', 'My posts']];
    let list;
    if (!u || S.needSignIn) list = `<div class="sbfd-card sbfd-note"><b class="big">👋</b><h3>Join the News Feed</h3><p>Sign in to read what other students share, ask a question, post your study progress, like and comment.</p><button type="button" class="sbfd-btn" data-a="login">Sign in</button></div>`;
    else if (S.loading && !S.posts.length) list = [1, 2, 3].map(() => '<div class="sbfd-card sbfd-sk" aria-label="Loading posts"><i style="width:40%"></i><i></i><i style="width:80%"></i><i style="height:80px"></i></div>').join('');
    else if (S.error && !S.posts.length) list = `<div class="sbfd-card sbfd-note"><b class="big">📡</b><h3>The News Feed could not be loaded</h3><p>${esc(S.error)}</p><button type="button" class="sbfd-btn alt" data-a="refresh">Try again</button></div>`;
    else if (!S.posts.length) list = `<div class="sbfd-card sbfd-note"><b class="big">${S.filter === 'question' ? '❓' : '📰'}</b><h3>${S.filter === 'question' ? 'No questions yet' : S.filter === 'mine' ? 'You have not posted yet' : 'No posts yet'}</h3><p>Be the first: ask a question, share your study progress or tell others about your plan.</p><button type="button" class="sbfd-btn" data-a="new">Create a post</button></div>`;
    else list = S.posts.map(p => postHtml(p, now)).join('') + `<div class="sbfd-note" data-sentinel>${S.more ? 'Loading more…' : S.end ? "You're all caught up 🎉" : ''}</div>`;
    keepDrafts();
    host.innerHTML = `<div class="sbfd" lang="en">
      ${S.offline ? '<div class="sbfd-off" role="status">You are offline. These are the posts saved on this browser.</div>' : ''}
      <div class="sbfd-card sbfd-comp"><div class="sbfd-comp-row">${avatar(a)}<button type="button" class="sbfd-pill" data-a="new" aria-label="Write a post">${u ? "What's on your mind?" : 'Sign in to post'}</button></div>
        <div class="sbfd-quick">${['question', 'stats', 'progress', 'plan'].map(k => `<button type="button" data-a="new" data-k="${k}"><b>${KINDS[k].emoji}</b>${k === 'progress' ? 'Today' : KINDS[k].label}</button>`).join('')}</div></div>
      ${u ? `<div class="sbfd-filters" role="group" aria-label="Which posts">${filt.map(f => `<button type="button" class="sbfd-chip" data-f="${f[0]}" aria-pressed="${S.filter === f[0]}">${f[1]}</button>`).join('')}<button type="button" class="sbfd-chip" data-a="refresh" style="margin-left:auto" aria-label="Refresh the feed">↻ Refresh</button></div>` : ''}
      ${list}</div>`;
    S.posts.forEach(p => { if (S.open[p.id]) drawComments(p.id); });
    watchEnd();
  }

  // the page is drawn again after every change: what a student was typing in a comment box must survive that
  function keepDrafts() {
    Object.keys(S.open).forEach(id => { const ta = S.host && S.host.querySelector(`article[data-id="${id}"] .sbfd-in textarea`); if (ta) S.open[id].draft = ta.value; });
  }
  function watchEnd() {
    if (S.io) { S.io.disconnect(); S.io = null; }
    const s = S.host && S.host.querySelector('[data-sentinel]');
    if (!s || S.end || !('IntersectionObserver' in window)) return;
    S.io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) loadMore(); }, { rootMargin: '300px' });
    S.io.observe(s);
  }

  // ---------------------------------------------------------------- loading
  const filterQuery = () => (S.filter === 'question' ? { kind: 'question' } : S.filter === 'mine' ? { mine: 1 } : {});
  async function load(refresh) {
    const u = me();
    if (!u) { S.posts = []; S.needSignIn = false; render(); return; }
    if (S.uid !== u.id) { S.uid = u.id; S.posts = S.filter === 'all' ? cache.read() : []; S.open = {}; }
    S.loading = true; S.error = ''; render();
    const j = await call('list', { query: Object.assign({ limit: PAGE }, filterQuery()) });
    S.loading = false;
    if (j.ok) { S.posts = j.posts; S.next = j.next; S.end = !j.next; S.offline = false; S.needSignIn = false; S.loadedAt = Date.now(); if (S.filter === 'all') cache.write(S.posts); }
    else { S.needSignIn = j.code === 401; S.offline = !!j.offline && S.posts.length > 0; S.error = S.posts.length || S.needSignIn ? '' : j.error; if (S.offline) toast('You are offline. These are the posts saved on this browser.'); }
    render();
  }
  async function loadMore() {
    if (S.more || S.end || S.loading || !S.next || S.offline) return;
    S.more = true; render();
    const j = await call('list', { query: Object.assign({ limit: PAGE, before: S.next }, filterQuery()) });
    S.more = false;
    if (j.ok) { const have = new Set(S.posts.map(p => p.id)); S.posts = S.posts.concat(j.posts.filter(p => !have.has(p.id))); S.next = j.next; S.end = !j.next; } else toast(j.error);
    render();
  }

  // ---------------------------------------------------------------- actions on a post
  const find = id => S.posts.find(p => p.id === id);
  function patch(id, f) { S.posts = S.posts.map(p => (p.id === id ? f(p) : p)); }

  async function toggleLike(p) {
    const on = !p.liked;
    patch(p.id, x => Object.assign({}, x, { liked: on, likes: Math.max(0, x.likes + (on ? 1 : -1)) })); render();
    const j = await call('like', { body: { type: 'post', id: p.id, on } });
    if (j.ok) patch(p.id, x => Object.assign({}, x, { liked: j.liked, likes: j.likes }));
    else { patch(p.id, x => Object.assign({}, x, { liked: p.liked, likes: p.likes })); toast(j.error); }
    render();
  }
  async function deletePost(p) {
    if (!confirm('Delete this post? It will be removed for everyone.')) return;
    const j = await call('delete', { body: { id: p.id } });
    if (j.ok) { S.posts = S.posts.filter(x => x.id !== p.id); toast('Post deleted'); render(); } else toast(j.error);
  }

  // ---- comments (inline under the post)
  function commentHtml(c, now, reply) {
    return `<div class="sbfd-c${reply ? ' r' : ''}" data-cid="${c.id}">${avatar(c.author, true)}<div style="flex:1;min-width:0"><div class="sbfd-cb">${nameHtml(c.author)}<span ${rtl(c.body) ? 'dir="rtl"' : ''}>${esc(c.body)}</span></div>
      <small><span>${esc(timeAgo(c.at, now))}</span><button type="button" data-a="clike" class="${c.liked ? 'on' : ''}">${c.liked ? 'Liked' : 'Like'}</button><button type="button" data-a="creply">Reply</button>${c.mine ? '<button type="button" data-a="cdel">Delete</button>' : '<button type="button" data-a="crep">Report</button>'}${c.likes ? `<span>👍 ${c.likes}</span>` : ''}</small></div></div>`;
  }
  async function openComments(id) {
    S.open[id] = { loading: true, list: [], next: 0, reply: 0, error: '' };
    drawComments(id);
    const j = await call('comments', { query: { post: id } });
    const st = S.open[id]; if (!st) return;
    st.loading = false;
    if (j.ok) { st.list = j.comments; st.next = j.next; } else st.error = j.error;
    drawComments(id);
  }
  function drawComments(id) {
    const st = S.open[id], art = S.host && S.host.querySelector(`article[data-id="${id}"] .sbfd-cm-host`);
    if (!st || !art) return;
    const ta0 = art.querySelector('.sbfd-in textarea');
    if (ta0) st.draft = ta0.value;
    const now = Date.now();
    const rows = st.list.map(c => commentHtml(c, now, false) + (c.replies || []).map(r => commentHtml(r, now, true)).join('')).join('');
    const target = st.reply ? (st.list.find(c => c.id === st.reply) || {}).author : null;
    art.innerHTML = `<div class="sbfd-cm">${st.loading ? '<div class="sbfd-note">Loading comments…</div>' : st.error ? `<div class="sbfd-err">${esc(st.error)}</div>` : rows || '<div class="sbfd-note">No comments yet. Be the first to comment.</div>'}
      ${st.next ? '<button type="button" class="sbfd-chip" data-a="cmore">View more comments</button>' : ''}
      ${target ? `<small>Replying to ${esc(target.name)} <button type="button" data-a="cancelreply">Cancel</button></small>` : ''}
      <div class="sbfd-in">${avatar(selfAuthor(), true)}<textarea rows="1" maxlength="${COMMENT_MAX}" placeholder="${st.reply ? 'Write a reply…' : 'Write a comment…'}" aria-label="Write a comment"></textarea><button type="button" class="sbfd-send" data-a="csend">Send</button></div></div>`;
    const ta1 = art.querySelector('.sbfd-in textarea');
    if (ta1 && st.draft) ta1.value = st.draft;
  }
  async function sendComment(id, ta) {
    const st = S.open[id], text = ta.value.trim(); if (!text || !st) return;
    ta.disabled = true;
    const j = await call('comment', { body: { post: id, body: text, parent: st.reply || 0 } });
    if (!j.ok) { ta.disabled = false; toast(j.error); return; }
    if (j.comment.parent) st.list = st.list.map(c => (c.id === j.comment.parent ? Object.assign({}, c, { replies: (c.replies || []).concat([j.comment]) }) : c)); else st.list = [j.comment].concat(st.list);
    st.reply = 0; st.draft = ''; ta.value = '';
    patch(id, x => Object.assign({}, x, { comments: j.count }));
    render();
  }
  const mapC = (st, cid, f) => { st.list = st.list.map(c => (c.id === cid ? f(c) : Object.assign({}, c, { replies: (c.replies || []).map(r => (r.id === cid ? f(r) : r)) }))); };
  async function likeComment(id, cid) {
    const st = S.open[id]; if (!st) return;
    let was = null; st.list.forEach(c => [c].concat(c.replies || []).forEach(x => { if (x.id === cid) was = x; }));
    if (!was) return;
    const on = !was.liked; mapC(st, cid, x => Object.assign({}, x, { liked: on, likes: Math.max(0, x.likes + (on ? 1 : -1)) })); drawComments(id);
    const j = await call('like', { body: { type: 'comment', id: cid, on } });
    if (j.ok) mapC(st, cid, x => Object.assign({}, x, { liked: j.liked, likes: j.likes })); else { mapC(st, cid, () => was); toast(j.error); }
    drawComments(id);
  }
  async function deleteComment(id, cid) {
    if (!confirm('Delete this comment?')) return;
    const j = await call('comment_delete', { body: { id: cid } });
    if (!j.ok) return toast(j.error);
    const st = S.open[id];
    st.list = st.list.filter(c => c.id !== cid).map(c => Object.assign({}, c, { replies: (c.replies || []).filter(r => r.id !== cid) }));
    patch(id, x => Object.assign({}, x, { comments: j.count })); render();
  }

  // ---- share, report, composer (small dialogs)
  function dialog(title, bodyHtml, onReady) {
    const m = document.createElement('div'); m.className = 'sbfd-modal';
    m.innerHTML = `<div class="sbfd-dlg" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sbfd-dh"><h3>${esc(title)}</h3><button type="button" class="sbfd-x" aria-label="Close">✕</button></div><div class="sbfd-db">${bodyHtml}</div></div>`;
    const close = () => { m.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.sbfd-x')) close(); });
    document.body.appendChild(m);
    onReady(m.querySelector('.sbfd-db'), close);
    return close;
  }
  function shareDialog(p) {
    const src = p.kind === 'share' && p.shared ? p.shared : p;
    dialog('Share', `<div style="display:flex;gap:10px;align-items:center">${avatar(selfAuthor())}<b>${esc(selfAuthor().name)}</b></div><textarea maxlength="500" placeholder="Say something about this…" aria-label="Say something about this"></textarea>
      <div style="color:var(--mut);font-size:.9rem;overflow:hidden;max-height:3em">${esc(src.body || '')}</div><div class="sbfd-err" role="alert"></div>
      <button type="button" class="sbfd-btn" data-go>Share now</button><button type="button" class="sbfd-btn alt" data-out>Send in another app…</button>`, (b, close) => {
      b.querySelector('[data-go]').onclick = async ev => {
        ev.target.disabled = true;
        const j = await call('share', { body: { id: p.id, body: b.querySelector('textarea').value.trim() } });
        if (!j.ok) { ev.target.disabled = false; b.querySelector('.sbfd-err').textContent = j.error; return; }
        S.posts = [j.post].concat(S.posts.map(x => (x.id === (p.shared ? p.shared.id : p.id) ? Object.assign({}, x, { shares: j.shares }) : x)));
        close(); toast('Shared to your feed'); render();
      };
      b.querySelector('[data-out]').onclick = () => {
        const text = (src.author ? src.author.name + ' on SpaceBook: ' : '') + (src.body || '').slice(0, 240) + '\n' + location.origin + location.pathname.replace(/[^/]*$/, '');
        if (navigator.share) navigator.share({ text }).catch(() => {});
        else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast('Copied. Paste it in another app.'), () => toast(text));
        close();
      };
    });
  }
  function reportDialog(what, type, id, after) {
    dialog('Report this ' + what, `<p style="margin:0;font-size:.9rem;color:var(--mut)">Choose what is wrong. After a few reports a ${esc(what)} is hidden until a person from SpaceBook has looked at it.</p>
      ${REASONS.map((r, i) => `<label><input type="radio" name="sbfd-reason" value="${r[0]}"${i === 0 ? '' : ''}> ${esc(r[1])}</label>`).join('')}<div class="sbfd-err" role="alert"></div><button type="button" class="sbfd-btn" data-go disabled>Report</button>`, (b, close) => {
      const go = b.querySelector('[data-go]');
      b.addEventListener('change', () => { go.disabled = !b.querySelector('input:checked'); });
      go.onclick = async () => {
        go.disabled = true;
        const j = await call('report', { body: { type, id, reason: b.querySelector('input:checked').value } });
        if (!j.ok) { go.disabled = false; b.querySelector('.sbfd-err').textContent = j.error; return; }
        close(); toast('Thank you. We will look at this ' + what + '.'); if (after) after(j);
      };
    });
  }

  function composer(startKind) {
    if (!me()) { try { SpaceBookAuth.open('login'); } catch (e) { /* auth not loaded */ } return; }
    let kind = KINDS[startKind] ? startKind : 'text', planId = '';
    const a = selfAuthor();
    dialog('Create post', `<div style="display:flex;gap:10px;align-items:center">${avatar(a)}<div><b>${esc(a.name)}</b><div class="sbfd-sub">🌐 Everyone on SpaceBook</div></div></div>
      <textarea maxlength="${POST_MAX}" aria-label="Your post"></textarea><div class="sbfd-err" data-c style="text-align:right;color:var(--mut)"></div>
      <div class="sbfd-filters" style="box-shadow:none;padding:0" role="group" aria-label="Add to your post">${Object.keys(KINDS).map(k => `<button type="button" class="sbfd-chip" data-k="${k}" aria-pressed="false">${KINDS[k].emoji} ${KINDS[k].label}</button>`).join('')}</div>
      <div data-extra></div><div class="sbfd-err" role="alert" data-e></div><button type="button" class="sbfd-btn" data-go>Post</button>`, (b, close) => {
      const ta = b.querySelector('textarea'), extra = b.querySelector('[data-extra]'), go = b.querySelector('[data-go]'), err = b.querySelector('[data-e]');
      const cardNow = () => (kind === 'stats' ? cards.stats() : kind === 'progress' ? cards.progress() : kind === 'plan' ? cards.plan(planId || undefined) : kind === 'question' ? cards.question(b.querySelector('[data-subj]') && b.querySelector('[data-subj]').value, b.querySelector('[data-cls]') && b.querySelector('[data-cls]').value) : null);
      const draw = () => {
        b.querySelectorAll('[data-k]').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.k === kind)));
        ta.placeholder = KINDS[kind].hint;
        if (kind === 'question') {
          const cl = classList();
          extra.innerHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap"><label>Class <select data-cls><option value="">Any</option>${cl.map(c => `<option>${esc(c.name)}</option>`).join('')}</select></label><label>Subject <input data-subj maxlength="60" placeholder="e.g. Chemistry" style="font:inherit;padding:.35rem;border-radius:8px;border:1px solid var(--line)"></label></div>`;
        } else if (kind === 'plan') {
          const ps = collect().plans;
          extra.innerHTML = ps.length ? `<label>Which plan <select data-plan>${ps.map(p => `<option value="${esc(p.id)}"${p.id === planId ? ' selected' : ''}>${esc(p.name)}</option>`).join('')}</select></label>${cardHtml('plan', cards.plan(planId || ps[0].id))}` : '<p class="sbfd-err">You have no study plan yet. Make one in the Plan tab, then share it here.</p>';
          if (ps.length && !planId) planId = ps[0].id;
        } else if (kind === 'stats' || kind === 'progress') {
          const c = cardNow();
          extra.innerHTML = c ? cardHtml(kind, c) : `<p class="sbfd-err">${kind === 'stats' ? 'There is nothing to show yet. Practise a test or study a plan first, then share your stats.' : 'You have not studied today yet. Answer some questions or finish a task of your plan, then share your day.'}</p>`;
        } else extra.innerHTML = '<p style="color:var(--mut);font-size:.88rem;margin:0">Share something you learnt or a tip for exam day. Please do not put phone numbers, e-mail addresses or links in a post.</p>';
        const needsCard = kind === 'stats' || kind === 'progress' || kind === 'plan';
        go.disabled = needsCard ? !cardNow() : ta.value.trim().length < 2;
      };
      b.addEventListener('click', e => { const k = e.target.closest('[data-k]'); if (k) { kind = k.dataset.k; err.textContent = ''; draw(); } });
      b.addEventListener('change', e => { if (e.target.matches('[data-plan]')) { planId = e.target.value; draw(); } });
      ta.addEventListener('input', () => { draw(); b.querySelector('[data-c]').textContent = ta.value.length > POST_MAX - 300 ? ta.value.length + ' / ' + POST_MAX : ''; });
      go.onclick = async () => {
        go.disabled = true; err.textContent = '';
        const j = await call('create', { body: { kind, body: ta.value.trim(), card: cardNow() } });
        if (!j.ok) { err.textContent = j.error; draw(); return; }
        const fits = S.filter === 'all' || S.filter === 'mine' || (S.filter === 'question' && j.post.kind === 'question');
        if (fits) S.posts = [j.post].concat(S.posts.filter(x => x.id !== j.post.id));
        close(); toast('Posted'); render();
      };
      draw(); setTimeout(() => ta.focus(), 30);
    });
  }

  // ---------------------------------------------------------------- the page
  function onClick(e) {
    const t = e.target;
    document.querySelectorAll('.sbfd-pop').forEach(x => { if (!x.contains(t)) x.remove(); });
    const f = t.closest('[data-f]');
    if (f) { S.filter = f.dataset.f; S.posts = S.filter === 'all' && userId() ? cache.read() : []; S.end = false; S.next = 0; load(); return; }
    const b = t.closest('[data-a]'); if (!b) return;
    const a = b.dataset.a, art = b.closest('article[data-id]'), id = art ? +art.dataset.id : 0, p = id ? find(id) : null;
    if (a === 'new') return composer(b.dataset.k || 'text');
    if (a === 'login') { try { SpaceBookAuth.open('login'); } catch (er) { /* auth not loaded */ } return; }
    if (a === 'refresh') return load(true);
    if (!p && !b.closest('.sbfd-c')) return;
    if (a === 'like') return toggleLike(p);
    if (a === 'comments') { if (S.open[id]) { delete S.open[id]; const h = art.querySelector('.sbfd-cm-host'); if (h) h.innerHTML = ''; } else openComments(id); return; }
    if (a === 'share') return shareDialog(p);
    if (a === 'more') { const bd = art.querySelector('.sbfd-body'); bd.style.maxHeight = 'none'; b.remove(); return; }
    if (a === 'menu') {
      const m = b.parentNode; if (m.querySelector('.sbfd-pop')) return;
      const pop = document.createElement('div'); pop.className = 'sbfd-pop'; pop.setAttribute('role', 'menu');
      pop.innerHTML = (p.body ? '<button type="button" role="menuitem" data-m="copy">Copy text</button>' : '') + (p.mine ? '<button type="button" role="menuitem" class="bad" data-m="del">Delete post</button>' : '<button type="button" role="menuitem" data-m="rep">Report post</button><button type="button" role="menuitem" data-m="hide">Hide post</button>');
      pop.onclick = ev => {
        const m2 = ev.target.closest('[data-m]'); if (!m2) return; pop.remove();
        if (m2.dataset.m === 'copy') navigator.clipboard && navigator.clipboard.writeText(p.body).then(() => toast('Copied'), () => {});
        if (m2.dataset.m === 'del') deletePost(p);
        if (m2.dataset.m === 'hide') { S.posts = S.posts.filter(x => x.id !== p.id); render(); }
        if (m2.dataset.m === 'rep') reportDialog('post', 'post', p.id, j => { if (j.hidden) { S.posts = S.posts.filter(x => x.id !== p.id); render(); } });
      };
      m.appendChild(pop); return;
    }
    // comment controls
    const c = b.closest('.sbfd-c'), cid = c ? +c.dataset.cid : 0, pid = c ? +b.closest('article[data-id]').dataset.id : id, st = S.open[pid];
    if (a === 'cmore' && st) { const last = st.list[st.list.length - 1]; call('comments', { query: { post: pid, before: last ? last.id : 0 } }).then(j => { if (j.ok) { st.list = st.list.concat(j.comments); st.next = j.next; } else toast(j.error); drawComments(pid); }); return; }
    if (a === 'csend' && st) return sendComment(pid, b.parentNode.querySelector('textarea'));
    if (a === 'cancelreply' && st) { st.reply = 0; return drawComments(pid); }
    if (a === 'creply' && st) { const top = st.list.find(x => x.id === cid || (x.replies || []).some(r => r.id === cid)); st.reply = top ? top.id : 0; return drawComments(pid); }
    if (a === 'clike') return likeComment(pid, cid);
    if (a === 'cdel') return deleteComment(pid, cid);
    if (a === 'crep') return reportDialog('comment', 'comment', cid, j => { if (j.hidden && st) { st.list = st.list.filter(x => x.id !== cid).map(x => Object.assign({}, x, { replies: (x.replies || []).filter(r => r.id !== cid) })); drawComments(pid); } });
  }

  function panel() { return document.getElementById('homeFeed'); }

  /** Adds the News Feed tab (first, and open unless the student chose another) and its panel to the Home page. */
  function mount() {
    const tabs = document.querySelector('.hcb-tabs'), account = document.getElementById('homeAccount') || document.getElementById('homeProjectStats');
    if (!tabs || !account || document.getElementById('homeFeed')) return false;
    css();
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'hcb-tab'; btn.setAttribute('role', 'tab'); btn.setAttribute('aria-selected', 'false'); btn.dataset.homeTab = 'feed';
    btn.setAttribute('onclick', "switchHomeStatsTab('feed')"); btn.textContent = '📰 News Feed';
    tabs.insertBefore(btn, tabs.firstChild);
    const div = document.createElement('div'); div.id = 'homeFeed'; div.className = 'home-project-stats'; div.hidden = true;
    account.parentNode.insertBefore(div, account.nextSibling);
    div.addEventListener('click', onClick);
    if (!document.__sbfdMenus) { document.__sbfdMenus = true; document.addEventListener('click', e => { if (!(e.target.closest && e.target.closest('.sbfd-menu'))) document.querySelectorAll('.sbfd-pop').forEach(x => x.remove()); }); }
    S.host = div;
    let saved = null; try { saved = localStorage.getItem('sbHomeStatsTab'); } catch (e) { saved = null; }
    if (!saved || saved === 'feed') window.switchHomeStatsTab('feed');
    return true;
  }
  function onTab(tab) {
    const div = panel(); if (!div) return;
    div.hidden = tab !== 'feed';
    const pill = document.getElementById('hcbPill');
    if (tab === 'feed') {
      if (pill) pill.textContent = '📰 What students share';
      S.host = div;
      if (!S.posts.length || Date.now() - S.loadedAt > 60000) load(); else render();
    }
  }

  window.SBFeed = { mount, cards, timeAgo, shortCount, collect, load, loadMore, _state: S, _html: { post: postHtml, card: cardHtml } };
  if (window.SBHooks && typeof window.renderHome === 'function' && typeof window.switchHomeStatsTab === 'function') {
    window.SBHooks.use('renderHome', next => function () { const r = next.apply(this, arguments); try { mount(); } catch (e) { console.error('SBFeed', e); } return r; }, { id: 'sb_feed.js' });
    window.SBHooks.use('switchHomeStatsTab', next => function (tab) { const r = next.apply(this, arguments); try { onTab(tab); } catch (e) { console.error('SBFeed', e); } return r; }, { id: 'sb_feed.js' });
  }
  // signing in or out changes what the feed may show; the saved posts of the other account are not kept
  document.addEventListener('spacebook:auth', e => {
    if (!(e.detail && e.detail.user)) { cache.clearAll(); S.posts = []; S.uid = 0; S.open = {}; S.end = false; S.next = 0; }
    if (panel() && !panel().hidden) load();
  });
})();
