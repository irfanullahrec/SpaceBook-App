/* Guided tracing, counting and tap-to-fill for book figures (every class).
 *  TRACE  — every dashed / dotted line in a figure becomes a guided path. Press on its red start dot (or the green
 *           start marker when the book prints no dot) and drag: the ink follows the dotted line only, in the
 *           printed direction, while a ✍️ hand-and-pencil follows the finger. A finished line turns green with a ⭐;
 *           when every line of the figure is done the child hears "Well done!".
 *  COUNT  — in pictures made of repeated objects, tapping each object numbers it (1, 2, 3 …) and says the number.
 *  FILL   — the 🪣 button in the ✏️ Draw / Colour toolbar fills any tapped shape with the chosen colour.
 * Works on figures rendered by any book reader; the book data is not changed. */
(function () {
  'use strict';
  const AREA = '#subjectTopicArea, .math-topic-area, .drawing-topic-area, .m6-root, .m5-root, .m7-root, .m8-root, .m11-root';
  const GEOM = 'path, line, polyline, polygon, circle, ellipse, rect';
  const css = `
  .sbt-on{touch-action:none}
  .sbt-pen{position:fixed;z-index:10000;pointer-events:none;font-size:40px;line-height:1;transform:translate(-8px,-36px) rotate(-8deg);filter:drop-shadow(0 2px 2px rgba(0,0,0,.25));display:none}
  .sbt-start{cursor:grab;animation:sbtPulse 1.4s ease-in-out infinite}
  @keyframes sbtPulse{0%,100%{opacity:.95}50%{opacity:.35}}
  .sbt-tip{position:fixed;z-index:10001;pointer-events:none;background:#fff;border:3px solid #22c55e;border-radius:16px;padding:.25rem .8rem;font:800 1.15rem system-ui,sans-serif;color:#14532d;box-shadow:0 6px 16px rgba(0,0,0,.18);animation:sbtUp 1.5s ease forwards}
  @keyframes sbtUp{0%{opacity:0;transform:translateY(8px) scale(.8)}15%{opacity:1;transform:none}80%{opacity:1}100%{opacity:0;transform:translateY(-14px)}}
  .sbt-count{pointer-events:none}
  .sbt-badge{position:absolute;top:.45rem;left:50%;transform:translateX(-50%);z-index:5;background:#fff;border:2px solid #f59e0b;color:#92400e;border-radius:999px;padding:.15rem .7rem;font:800 .8rem system-ui,sans-serif;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.12);pointer-events:none}
  .sbt-badge.sbt-done{border-color:#16a34a;color:#14532d;background:#f0fdf4}
  `;
  function addCss() { if (document.getElementById('sbt-css')) return; const s = document.createElement('style'); s.id = 'sbt-css'; s.textContent = css; document.head.appendChild(s); }

  // ---------- small helpers ----------
  let actx = null;
  function pop(f) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain();
      o.frequency.setValueAtTime(f || 660, actx.currentTime); o.frequency.exponentialRampToValueAtTime((f || 660) * 1.5, actx.currentTime + .1);
      g.gain.setValueAtTime(.15, actx.currentTime); g.gain.exponentialRampToValueAtTime(.001, actx.currentTime + .2);
      o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + .22);
    } catch (e) { /* no audio */ }
  }
  function say(text, lang) {
    if (!window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.lang = lang || 'en-GB'; u.rate = .9; u.pitch = 1.2; speechSynthesis.speak(u);
  }
  function tip(text, x, y) {
    const t = document.createElement('div'); t.className = 'sbt-tip'; t.textContent = text;
    t.style.left = Math.max(8, x - 40) + 'px'; t.style.top = Math.max(8, y - 70) + 'px';
    document.body.appendChild(t); setTimeout(() => t.remove(), 1600);
  }
  let pen = null;
  function penAt(x, y, show) {
    if (!pen) { pen = document.createElement('div'); pen.className = 'sbt-pen'; pen.textContent = '✍️'; document.body.appendChild(pen); }
    pen.style.display = show ? 'block' : 'none';
    if (show) { pen.style.left = x + 'px'; pen.style.top = y + 'px'; }
  }
  const NS = 'http://www.w3.org/2000/svg';
  const isRed = c => {
    const m = String(c || '').match(/rgb\((\d+),\s*(\d+),\s*(\d+)/); if (!m) return false;
    return +m[1] > 170 && +m[2] < 100 && +m[3] < 100;
  };
  const dashed = el => { const d = getComputedStyle(el).strokeDasharray; const s = getComputedStyle(el).stroke; return d && d !== 'none' && d !== '0' && s && s !== 'none'; };

  // ---------- segments ----------
  // one dashed element may hold several sub-paths ("M.. h.. M.. h.."); each becomes its own traceable segment
  function segmentsOf(el) {
    if (el.tagName.toLowerCase() === 'path') {
      const d = el.getAttribute('d') || '';
      const parts = /m/.test(d) ? [d] : d.split(/(?=M)/).map(s => s.trim()).filter(Boolean);
      if (parts.length > 1) {
        return parts.map(p => {
          const t = document.createElementNS(NS, 'path');
          t.setAttribute('d', p); if (el.getAttribute('transform')) t.setAttribute('transform', el.getAttribute('transform'));
          t.setAttribute('fill', 'none'); t.setAttribute('stroke', 'none'); t.setAttribute('visibility', 'hidden'); t.dataset.sbtTmp = '1';
          el.after(t); return {geo: t, src: el, closed: /z\s*$/i.test(p)};
        });
      }
    }
    const tag = el.tagName.toLowerCase();
    return [{geo: el, src: el, closed: ['circle', 'ellipse', 'rect', 'polygon'].includes(tag) || /z\s*$/i.test(el.getAttribute('d') || '')}];
  }
  function sample(seg) {
    let len = 0; try { len = seg.geo.getTotalLength(); } catch (e) { return false; }
    if (!(len > 4)) return false;
    const n = Math.max(16, Math.min(420, Math.round(len / 2.5)));
    seg.len = len; seg.local = [];
    for (let i = 0; i <= n; i++) { const p = seg.geo.getPointAtLength(len * i / n); seg.local.push([p.x, p.y]); }
    if (seg.closed) seg.local.pop();
    return true;
  }
  function screenPts(seg) {
    const m = seg.geo.getScreenCTM(); if (!m) return null;
    return seg.order.map(i => { const p = seg.local[i]; return [m.a * p[0] + m.c * p[1] + m.e, m.b * p[0] + m.d * p[1] + m.f]; });
  }
  function order(seg, startIdx, reverse) {
    const n = seg.local.length; const o = [];
    if (seg.closed) { for (let k = 0; k <= n; k++) o.push(((reverse ? startIdx - k : startIdx + k) % n + n) % n); }
    else for (let k = 0; k < n; k++) o.push(reverse ? n - 1 - k : k);
    seg.order = o;
  }

  // ---------- progress + coins (window.SBRewards) ----------
  // Every activity gets a stable key: class | subject | unit | kind | figure signature | n-th figure with that signature.
  function figOf(svg) { return svg.closest('.m6-fig, figure') || svg.parentElement; }
  function captionOf(svg) {
    const fig = figOf(svg); if (!fig) return '';
    return [...fig.childNodes].filter(n => n !== svg && !(n.nodeType === 1 && (n.contains(svg) || n.matches('button, .c1-tools, .c1-canvas, .sbt-badge, .sbt-reset'))))
      .map(n => n.textContent).join(' ').replace(/\s+/g, ' ').trim().slice(0, 160);
  }
  const sigOf = svg => (svg.getAttribute('aria-label') || '') + '|' + (svg.getAttribute('viewBox') || '') + '|' + captionOf(svg);
  function hash(str) { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0; return h.toString(36); }
  function keyOf(svg, kind) {
    let st = {}; try { st = state; } catch (e) { /* no app state */ }
    const sig = sigOf(svg);
    const box = svg.closest('.math-accordion-card, .m5-root, .m6-root, .m7-root, .m8-root, .m11-root, #subjectTopicArea') || document;
    const n = [...box.querySelectorAll('svg')].filter(x => x === svg || sigOf(x) === sig).indexOf(svg);
    return [st.selectedClass || 'x', st.activeSubject || st.selectedSubject || 'x', 'u' + (st.selectedSubjChapter || 0), kind, hash(sig), n]
      .join('|').replace(/[^A-Za-z0-9_.:|-]/g, '').slice(0, 190);
  }
  const tracked = new Set();
  // ui = {markDone(i), resetAll()}; returns {stepDone(i, x, y)}
  function track(svg, kind, total, ui) {
    const key = keyOf(svg, kind);
    const title = (captionOf(svg) || svg.getAttribute('aria-label') || kind).slice(0, 180);
    const run = {repeat: false, done: new Set()};
    const fig = figOf(svg);
    let badge = null, reset = null;
    if (fig) {
      if (getComputedStyle(fig).position === 'static') fig.style.position = 'relative';
      badge = document.createElement('div'); badge.className = 'sbt-badge'; badge.hidden = true; fig.appendChild(badge);
      reset = document.createElement('button'); reset.type = 'button'; reset.className = 'c1-drawbtn sbt-reset'; reset.style.cssText = 'right:auto;left:.4rem';
      reset.addEventListener('click', ev => {
        ev.stopPropagation();
        const rec = window.SBRewards && SBRewards.get(key);
        run.repeat = !!(rec && rec.times > 0); run.done.clear();
        ui.resetAll(); paint();
      });
      fig.appendChild(reset);
    }
    const fmt = d => { if (!d) return ''; const t = new Date(String(d).replace(' ', 'T')); return isNaN(t) ? '' : t.toLocaleDateString(undefined, {day: 'numeric', month: 'short'}); };
    function paint() {
      const rec = window.SBRewards && SBRewards.get(key);
      if (!run.repeat && rec) rec.done.forEach(i => ui.markDone(i));
      if (reset) reset.textContent = rec && rec.times > 0 ? '↺ Do it again' : (kind === 'count' ? '↺ Count again' : '↺ Trace again');
      if (!badge) return;
      if (rec && rec.times > 0) {
        badge.hidden = false; badge.className = 'sbt-badge sbt-done';
        badge.textContent = (run.repeat ? '🔁 Practising · ' : '✅ Completed · ') + (rec.times > 1 ? rec.times + ' times · ' : '') + 'last ' + fmt(rec.last);
      } else if (rec && rec.done.length) {
        badge.hidden = false; badge.className = 'sbt-badge';
        badge.textContent = '⏳ ' + rec.done.length + ' of ' + rec.total + ' steps done';
      } else badge.hidden = true;
    }
    tracked.add({svg, paint});
    if (window.SBRewards) SBRewards.ready.then(paint); else paint();
    return {
      stepDone(i, x, y) {
        run.done.add(i);
        if (!window.SBRewards) return;
        SBRewards.step(key, title, total, i, x, y).then(() => {
          if (run.repeat && run.done.size >= total) SBRewards.again(key, x, y + 30).then(() => { run.repeat = false; paint(); });
          else paint();
        });
      }
    };
  }
  if (window.SBRewards) SBRewards.onChange(() => tracked.forEach(t => { if (!t.svg.isConnected) tracked.delete(t); else t.paint(); }));

  function attach(svg) {
    if (svg.dataset.sbt) return;
    if (svg.closest('button, .math-acc-header, .c1-tools, .ut-root, .sbt-skip')) { svg.dataset.sbt = '1'; return; }
    // small or hidden now: try again later. Nothing is written for such a figure (the open book holds hundreds of small formula
    // glyphs, and marking and unmarking each of them on every scan kept the page busy)
    const r = svg.getBoundingClientRect(); if (r.width < 120) return;
    svg.dataset.sbt = '1';
    const els = [...svg.querySelectorAll(GEOM)].filter(el => !el.closest('defs, clipPath, mask, marker, pattern') && !el.dataset.sbtTmp && dashed(el));
    const segs = [];
    els.forEach(el => segmentsOf(el).forEach(s => { if (sample(s)) segs.push(s); }));
    if (!segs.length) { setupCount(svg); return; }
    // red start dots printed by the book
    const dots = [...svg.querySelectorAll('circle')].filter(c => !c.closest('defs') && +(c.getAttribute('r') || 0) <= 9 && isRed(getComputedStyle(c).fill));
    const dotPts = dots.map(c => [+c.getAttribute('cx'), +c.getAttribute('cy'), c]);
    segs.forEach(s => {
      const n = s.local.length; let best = null;
      dotPts.forEach(([x, y, c]) => {
        // dot and segment must share a coordinate system: compare in screen space
        const m = s.geo.getScreenCTM(), mc = c.getScreenCTM(); if (!m || !mc) return;
        const dx = mc.a * x + mc.c * y + mc.e, dy = mc.b * x + mc.d * y + mc.f;
        const cand = s.closed ? s.local.map((p, i) => i) : [0, n - 1];
        cand.forEach(i => { const p = s.local[i]; const sx = m.a * p[0] + m.c * p[1] + m.e, sy = m.b * p[0] + m.d * p[1] + m.f; const d = Math.hypot(sx - dx, sy - dy); if (d < 18 && (!best || d < best.d)) best = {d, i, dot: c}; });
      });
      if (best) { s.dot = best.dot; order(s, best.i, !s.closed && best.i === n - 1); }
      else order(s, 0, false);
      s.idx = 0; s.done = false;
      // ink overlay
      s.ink = document.createElementNS(NS, 'polyline');
      if (s.geo.getAttribute('transform')) s.ink.setAttribute('transform', s.geo.getAttribute('transform'));
      const sw = parseFloat(getComputedStyle(s.src).strokeWidth) || 2;
      s.ink.setAttribute('fill', 'none'); s.ink.setAttribute('stroke', '#2563eb'); s.ink.setAttribute('stroke-width', Math.max(sw * 2, 3.5));
      s.ink.setAttribute('stroke-linecap', 'round'); s.ink.setAttribute('stroke-linejoin', 'round'); s.ink.style.pointerEvents = 'none';
      s.geo.after(s.ink);
      // a green start marker where the book prints no dot
      if (!s.dot) {
        const p = s.local[s.order[0]], m = document.createElementNS(NS, 'circle');
        if (s.geo.getAttribute('transform')) m.setAttribute('transform', s.geo.getAttribute('transform'));
        m.setAttribute('cx', p[0]); m.setAttribute('cy', p[1]); m.setAttribute('r', Math.max(sw * 1.6, 3.2));
        m.setAttribute('fill', '#22c55e'); m.classList.add('sbt-start'); s.ink.after(m); s.marker = m;
      } else s.dot.classList.add('sbt-start');
    });
    svg.classList.add('sbt-on');
    let active = null, pts = null, suppress = false;
    function markDone(s) {
      s.done = true; s.idx = s.order.length - 1;
      s.ink.setAttribute('points', s.order.map(i => s.local[i].join(',')).join(' '));
      s.ink.setAttribute('stroke', '#16a34a');
      if (s.marker) s.marker.style.display = 'none';
      if (s.dot) s.dot.classList.remove('sbt-start');
    }
    const prog = track(svg, 'trace', segs.length, {
      markDone: i => { if (segs[i] && !segs[i].done) markDone(segs[i]); },
      resetAll: () => segs.forEach(s => { s.idx = 0; s.done = false; s.ink.removeAttribute('points'); s.ink.setAttribute('stroke', '#2563eb'); if (s.marker) s.marker.style.display = ''; if (s.dot) s.dot.classList.add('sbt-start'); })
    });
    const startNear = (x, y) => {
      let best = null;
      segs.forEach(s => {
        if (s.done) return;
        const P = screenPts(s); if (!P) return;
        const p = P[s.idx]; const d = Math.hypot(p[0] - x, p[1] - y);
        if (d < 26 && (!best || d < best.d)) best = {d, s, P};
      });
      return best;
    };
    svg.addEventListener('pointerdown', e => {
      if (svg.closest('.c1-drawing')) return;
      const b = startNear(e.clientX, e.clientY); if (!b) return;
      active = b.s; pts = b.P; suppress = true;
      e.preventDefault(); e.stopPropagation();
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* fine */ }
      penAt(e.clientX, e.clientY, true); pop(520);
    });
    svg.addEventListener('pointermove', e => {
      if (!active) return;
      e.preventDefault();
      penAt(e.clientX, e.clientY, true);
      const s = active; let bestJ = -1;
      const tol = 30, look = Math.max(8, Math.round(pts.length / 6));
      for (let j = s.idx + 1; j < Math.min(pts.length, s.idx + look); j++) {
        if (Math.hypot(pts[j][0] - e.clientX, pts[j][1] - e.clientY) <= tol) bestJ = j;
      }
      if (bestJ > s.idx) {
        s.idx = bestJ;
        s.ink.setAttribute('points', s.order.slice(0, s.idx + 1).map(i => s.local[i].join(',')).join(' '));
        if (s.idx >= pts.length - 2) finish(s, e.clientX, e.clientY);
      }
    });
    const end = () => { if (!active) return; active = null; penAt(0, 0, false); };
    svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);
    svg.addEventListener('click', e => { if (suppress) { suppress = false; e.stopImmediatePropagation(); e.preventDefault(); } }, true);
    function finish(s, x, y) {
      active = null; penAt(0, 0, false);
      markDone(s);
      pop(880); setTimeout(() => pop(1175), 120);
      prog.stepDone(segs.indexOf(s), x, y);
      const left = segs.filter(t => !t.done).length;
      if (!left) { tip('Well done! ⭐⭐⭐', x, y); say('Well done!'); }
      else tip('⭐', x, y);
    }
  }

  // ---------- counting ----------
  function setupCount(svg) {
    const uses = [...svg.querySelectorAll('use')];
    const groups = {};
    uses.forEach(u => { const h = u.getAttribute('href') || u.getAttribute('xlink:href'); (groups[h] = groups[h] || []).push(u); });
    const countable = Object.values(groups).filter(g => g.length >= 2).flat();
    if (!countable.length) return;
    let n = 0;
    function number(u) {
      u.dataset.sbtN = ++n;
      const bb = u.getBBox(), t = u.getAttribute('transform') || '';
      const g = document.createElementNS(NS, 'g'); g.classList.add('sbt-count'); if (t) g.setAttribute('transform', t);
      const cx = bb.x + bb.width / 2, cy = bb.y - 2;
      g.innerHTML = `<circle cx="${cx}" cy="${cy}" r="9" fill="#2563eb" stroke="#fff" stroke-width="2"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">${n}</text>`;
      u.after(g); u.__sbtG = g;
    }
    const prog = track(svg, 'count', countable.length, {
      markDone: i => { const u = countable[i]; if (u && !u.dataset.sbtN) number(u); },
      resetAll: () => { n = 0; countable.forEach(u => { delete u.dataset.sbtN; if (u.__sbtG) { u.__sbtG.remove(); u.__sbtG = null; } }); }
    });
    countable.forEach((u, i) => {
      u.style.cursor = 'pointer';
      u.addEventListener('click', e => {
        if (u.dataset.sbtN) return;
        e.stopPropagation();
        number(u); pop(600 + n * 40); say(String(n));
        prog.stepDone(i, e.clientX, e.clientY);
      }, true);
    });
  }

  // ---------- tap-to-fill tool in the Draw / Colour toolbar ----------
  function addFill(tools) {
    if (tools.querySelector('[data-fill]')) return;
    const b = document.createElement('button'); b.type = 'button'; b.dataset.fill = '1'; b.title = 'fill a shape'; b.textContent = '🪣';
    tools.appendChild(b);
    const fig = tools.closest('.m6-fig, figure') || tools.parentElement;
    const cv = fig.querySelector('.c1-canvas'); const svg = fig.querySelector('svg');
    let on = false;
    b.addEventListener('click', e => {
      e.stopPropagation(); on = !on; b.setAttribute('aria-pressed', String(on));
      if (cv) cv.style.pointerEvents = on ? 'none' : 'auto';
    });
    tools.addEventListener('click', e => { const c = e.target.closest('[data-c],[data-e],[data-s]'); if (c && on) { if (c.dataset.c) b.dataset.col = c.dataset.c; } });
    svg && svg.addEventListener('click', e => {
      if (!on) return;
      const t = e.target.closest(GEOM); if (!t || t.tagName === 'line') return;
      e.stopPropagation(); e.preventDefault();
      const col = b.dataset.col || (tools.querySelector('[data-c][aria-pressed="true"]') || {dataset: {c: '#ef4444'}}).dataset.c;
      t.style.setProperty('fill', col, 'important'); t.style.setProperty('fill-opacity', '1', 'important'); pop(700);
    }, true);
  }

  function scan() {
    addCss();
    document.querySelectorAll(AREA).forEach(a => a.querySelectorAll('svg:not([data-sbt])').forEach(attach));
    document.querySelectorAll('.c1-tools').forEach(addFill);
  }
  const obs = new MutationObserver(() => { clearTimeout(obs.t); obs.t = setTimeout(scan, 80); });
  const start = () => { obs.observe(document.body, {childList: true, subtree: true}); scan(); document.addEventListener('click', () => setTimeout(scan, 120)); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.SBTrace = {attach, scan};
})();
