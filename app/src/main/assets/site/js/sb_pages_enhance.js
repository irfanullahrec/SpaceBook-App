/* sb_pages_enhance.js - 2026-10 redesign: presentation of pages whose markup is made by the large legacy renderers.
 * It only adds headings and re-arranges what a renderer already produced; every click still goes through the original handlers. */
(function () {
  'use strict';
  if (typeof window === 'undefined') return;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const palette = ['blue', 'green', 'purple', 'orange'];
  const num = id => { const m = /(\d+)/.exec(String(id || '')); return m ? Number(m[1]) : 0; };

  // ---- Class N Subjects (design 05)
  function enhanceSubjects(classId) {
    const body = document.getElementById('dashboard-body');
    const grid = body && body.querySelector('.subjects-compact-grid');
    if (!grid || body.querySelector('.sbs-head')) return;
    const cls = (DATA.classes || []).find(c => c.id === classId) || { id: classId, name: 'Class ' + num(classId) };
    const subs = (DATA.subjects || {})[classId] || [];
    const n = num(classId);
    const near = (DATA.classes || []).filter(c => num(c.id) >= Math.max(1, Math.min(n - 2, 8)) && num(c.id) <= Math.max(5, Math.min(n + 2, 12))).slice(0, 5);
    const head = document.createElement('div');
    head.className = 'sbs-head';
    head.innerHTML = '<div><nav class="sbs-crumb"><a onclick="renderClasses()">Subjects</a><span>/</span><b>' + esc(cls.name) + '</b></nav><h1>' + esc(cls.name) + ' Subjects</h1><p>Explore your subjects, track your progress and start learning.</p></div>' +
      '<div class="sbs-switch"><svg viewBox="0 0 24 24" width="30" height="30" fill="#1d6fe8"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 12v5c3 2.5 9 2.5 12 0v-5" fill="none" stroke="#1d6fe8" stroke-width="2"/></svg><span>Switch Class</span>' +
      near.map(c => '<button type="button" class="' + (c.id === classId ? 'on' : '') + '" onclick="goToSubjects(\'' + c.id + '\')">' + num(c.id) + '</button>').join('') + '</div>';
    body.insertBefore(head, body.firstChild);
    grid.classList.add('sbs-grid');
    const byId = {}; subs.forEach(s => { byId[s.id] = s; });
    grid.querySelectorAll('.subject-card-wrapper').forEach((w, i) => {
      const m = /openSubject\('([^']+)','([^']+)'\)/.exec(w.getAttribute('onclick') || '');
      const s = m ? byId[m[2]] : null;
      const tone = palette[i % 4];
      w.classList.add('sbs-card', 'sbs-' + tone);
      const name = (w.querySelector('.scc-name') || {}).textContent || (s && s.name) || '';
      const urdu = (w.querySelector('.scc-urdu') || {}).textContent || '';
      let done = 0, total = 0;
      try { const e = m && window.SBContinue && window.SBContinue.entry(m[1], m[2]); if (e) { done = (e.done || []).length; total = e.total || 0; } } catch (e) { /* no saved place */ }
      const pct = total ? Math.round(100 * done / total) : 0;
      const chapters = s && s.chapters ? s.chapters : 0;
      const cover = w.querySelector('.scc-cover-wrap');
      const info = document.createElement('div');
      info.className = 'sbs-info';
      info.innerHTML = '<div class="sbs-name"><b>' + esc(name) + '</b>' + (urdu ? '<em>' + esc(urdu) + '</em>' : '') + '</div>' +
        (chapters ? '<div class="sbs-ch"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#1d6fe8" stroke-width="2"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg>' + chapters + ' Chapters</div>' : '') +
        '<div class="sbs-bar"><i style="width:' + pct + '%"></i><span>' + pct + '%</span></div>' +
        '<span class="sbs-open"><svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M2 5c4-1.5 7-1 10 1v14c-3-2-6-2.5-10-1zM22 5c-4-1.5-7-1-10 1v14c3-2 6-2.5 10-1z"/></svg>Open Book<b>›</b></span>';
      const old = w.querySelector('.scc-title-row'); if (old) old.remove();
      w.appendChild(info);
      if (cover) cover.classList.add('sbs-cover');
    });
    const strip = document.createElement('section');
    strip.className = 'sbs-active';
    strip.innerHTML = '<h2><svg viewBox="0 0 24 24" width="30" height="30" fill="#f2a413"><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z"/></svg>Active Subjects</h2><p>These subjects are part of your current study plan.</p><div>' +
      subs.slice(0, 10).map((s, i) => '<span class="sbs-chip sbs-' + palette[i % 4] + '"><i></i>' + esc(s.name) + '</span>').join('') + '</div>';
    body.appendChild(strip);
  }

  function wrapFn(name, after) {
    const orig = window[name];
    if (typeof orig !== 'function' || orig.__sbEnh) return;
    const w = function () { const r = orig.apply(this, arguments); try { after.apply(null, arguments); } catch (e) { /* the original page stays */ } return r; };
    w.__sbEnh = true;
    window[name] = w;
  }
  // Reader (designs 06, 07): on wide screens the chapter list opens with its titles, like the "Unit Contents" panel; the rail button still folds it.
  function openRail() {
    if (window.innerWidth < 1280) return;
    document.querySelectorAll('.math-unified-view:not([data-sb-rail])').forEach(v => { v.setAttribute('data-sb-rail', '1'); v.classList.add('sb-rail-open'); });
  }
  function init() {
    wrapFn('goToSubjects', enhanceSubjects);
    const host = document.getElementById('dashboard-body');
    if (host && window.MutationObserver) new MutationObserver(openRail).observe(host, { childList: true, subtree: true });
    openRail();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.SBPagesEnhance = { enhanceSubjects };
})();
