/* Class 1 Creative Arts & Drawing — play layer (toolkit: window.C1P / window.C1A).
 * Each "join the dots and colour" page becomes a two-step game right under the printed figure:
 *   1. Trace: press the blinking dot and drag along the dotted outline, shape by shape — the line is drawn as you go
 *   2. Colour: tap a colour (the palette is taken from the coloured model on the page) and tap a part of the picture
 * The step-by-step pages (bear, house, cat) get a "draw each step, then press the star" card.
 * The printed figure stays available behind the "Book picture" button (with its own pencil tool). */
(function () {
  'use strict';
  const P = window.C1P, C = window.C1A; if (!P || !C) return;
  const NS = 'http://www.w3.org/2000/svg';
  const {h, el, sndOk, sndPop, sndNo, confetti} = C;

  function shapeD(e) {
    const t = e.tagName.toLowerCase(), n = a => parseFloat(e.getAttribute(a)) || 0;
    if (t === 'path') return e.getAttribute('d');
    if (t === 'circle') { const cx = n('cx'), cy = n('cy'), r = n('r'); return `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`; }
    if (t === 'ellipse') { const cx = n('cx'), cy = n('cy'), rx = n('rx'), ry = n('ry'); return `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0`; }
    if (t === 'polygon' || t === 'polyline') { const pts = (e.getAttribute('points') || '').trim().split(/[\s,]+/).map(Number); let d = ''; for (let i = 0; i + 1 < pts.length; i += 2) d += (i ? 'L' : 'M') + pts[i] + ' ' + pts[i + 1]; return d + (t === 'polygon' ? 'Z' : ''); }
    if (t === 'rect') { const x = n('x'), y = n('y'), w = n('width'), hh = n('height'); return `M${x} ${y}h${w}v${hh}h${-w}Z`; }
    if (t === 'line') return `M${n('x1')} ${n('y1')}L${n('x2')} ${n('y2')}`;
    return null;
  }
  function paletteOf(src) {
    const out = [];
    src.querySelectorAll('[fill]').forEach(x => {
      if (x.closest('.c1dt') || x.closest('text') || x.tagName === 'text') return;
      const f = (x.getAttribute('fill') || '').toLowerCase();
      if (!/^#[0-9a-f]{3,8}$/.test(f) || /^#(fff|ffffff|fffdf7|fefce8|fff7ed)$/.test(f)) return;
      if (x.tagName === 'rect' && x.getAttribute('rx') === '18') return;
      if (out.indexOf(f) < 0) out.push(f);
    });
    return out.slice(0, 12);
  }

  function buildTrace(fig, src) {
    const card = P.mini('🎨 Trace and colour', 'Press the blinking dot and drag along the dots to trace each shape. The line gets drawn as you go!');
    const svg = src.cloneNode(true);
    svg.removeAttribute('width'); svg.removeAttribute('height'); svg.setAttribute('class', 'c1a-svg'); svg.dataset.c1 = '1'; svg.dataset.sbt = '1'; svg.style.maxWidth = '560px';
    card.appendChild(svg);
    const items = [];
    const SH = 'path,circle,ellipse,polygon,polyline,rect,line';
    const dashed = !svg.querySelector('.c1dt');            // Class 2 pages: model on the left, dotted copy on the right (same shapes, same order)
    let shapes;
    if (!dashed) { shapes = []; svg.querySelectorAll('.c1dt').forEach(g => g.querySelectorAll(SH).forEach(x => shapes.push(x))); }
    else shapes = [...svg.querySelectorAll(SH)].filter(x => x.getAttribute('stroke-dasharray') && (x.getAttribute('fill') || 'none') === 'none');
    let targets = null;
    if (dashed) {
      const model = [...svg.querySelectorAll('g')].find(g => !g.querySelector('[stroke-dasharray]'));
      const ms = model ? [...model.querySelectorAll(SH)] : [];
      if (ms.length === shapes.length) targets = ms.map(x => (x.getAttribute('fill') || 'none').toLowerCase());
    }
    shapes.forEach((sh, si) => {
      const d = shapeD(sh); if (!d) return;
      const wrap = document.createElementNS(NS, 'g');
      if (sh.getAttribute('transform')) wrap.setAttribute('transform', sh.getAttribute('transform'));
      sh.parentNode.insertBefore(wrap, sh.nextSibling);
      const guide = el('path', {d, fill: 'none', stroke: 'none'}, wrap);
      const ink = el('path', {d, class: 'c1a-ink', stroke: '#7c3aed'}, wrap);
      ink.style.strokeWidth = dashed ? '3' : '6'; ink.style.strokeDasharray = '0 100000';
      items.push({g: wrap, mg: wrap, strokes: [{guide, ink}], ink, target: targets ? targets[si] : null});
    });
    if (!items.length) return null;
    const colours = targets ? [...new Set(targets.filter(c => /^#/.test(c)))] : paletteOf(src);
    const msg = h('div', 'c1a-msg c1a-center', '', card);
    const pal = h('div', 'c1a-wopts', '', card); pal.style.display = 'none';
    const tools = h('div', 'c1a-tools', '', card);
    let cur = null, colouring = false, painted = 0;
    const tr = new C.Tracer(svg, items, {
      step: dashed ? 14 : 16, hit: dashed ? 22 : 26, start: dashed ? 30 : 36, markR: dashed ? 6 : 9,
      onMiss: () => P.say(msg, '👉 Press on the blinking dot first, then drag along the dots.', 'no'),
      onPress: () => P.say(msg, 'Good! Keep holding and follow the dots. 🟠'),
      onLift: () => P.say(msg, 'Oops, you let go. Press the blinking dot and try this part again. 🙂', 'no'),
      onItem: (it, last) => { if (!last) { sndPop(); } },
      onAll: () => {
        sndOk(); P.say(msg, 'Great! Now colour it. Tap a colour, then tap a part of the picture. Use the colours of the model!', 'ok'); P.speak('Great!'); confetti(card);
        colouring = true; pal.style.display = ''; items.forEach(it => { it.ink.style.pointerEvents = 'all'; it.ink.style.cursor = 'pointer'; });
        if (!targets) fin.style.display = '';
      }
    });
    colours.concat(['#ffffff']).forEach(c => {
      const b = h('button', 'c1a-wopt', '', pal); b.type = 'button'; b.style.cssText = `width:2.6rem;height:2.6rem;border-radius:50%;padding:0;background:${c};border:3px solid #94a3b8`;
      b.setAttribute('aria-label', c);
      b.addEventListener('click', () => { cur = c; pal.querySelectorAll('.c1a-wopt').forEach(x => { x.style.borderColor = '#94a3b8'; x.style.transform = ''; }); b.style.borderColor = '#0ea5e9'; b.style.transform = 'scale(1.18)'; sndPop(); });
    });
    const need = items.filter(it => it.target && /^#/.test(it.target)).length; let right = 0;
    items.forEach(it => it.ink.addEventListener('click', () => {
      if (!colouring) return;
      if (!cur) { P.say(msg, '🎨 Tap a colour first, then tap the picture.', 'no'); return; }
      if (it.target) {                                           // colour like the model
        if (!/^#/.test(it.target)) { P.say(msg, 'This part is just a line. No colour needed. 🙂', 'ok'); return; }
        if (cur.toLowerCase() !== it.target) { sndNo(); it.ink.classList.add('c1a-wrongfill'); setTimeout(() => it.ink.classList.remove('c1a-wrongfill'), 500); P.say(msg, 'Look at the model. Which colour is this part? 🔍', 'no'); return; }
        if (!it.ok) { it.ok = true; right++; }
        it.ink.style.fill = cur; it.ink.style.fillOpacity = '1'; sndOk();
        if (right >= need) { confetti(card); P.say(msg, '🏆 Beautiful picture! You traced and coloured it.', 'ok'); P.speak('Beautiful picture!'); }
        else P.say(msg, P.praise(), 'ok');
        return;
      }
      it.ink.style.fill = cur; it.ink.style.fillOpacity = '1'; sndPop(); painted++;
    }));
    const fin = h('button', 'c1a-btn', '✔ I finished colouring', tools); fin.type = 'button'; fin.style.display = 'none'; if (targets) fin.style.display = 'none';
    fin.addEventListener('click', () => { sndOk(); confetti(card); P.say(msg, '🏆 Beautiful picture! You traced and coloured it.', 'ok'); P.speak('Beautiful picture!'); });
    const again = h('button', 'c1a-btn', '🔄 Start again', tools); again.type = 'button';
    again.addEventListener('click', () => { colouring = false; painted = 0; right = 0; items.forEach(it => { it.ok = false; }); pal.style.display = 'none'; fin.style.display = 'none'; items.forEach(it => { it.ink.style.fill = ''; it.ink.style.pointerEvents = ''; }); tr.reset(); P.say(msg, 'Start at the blinking dot.'); });
    P.say(msg, 'Press the blinking dot and hold.');
    const iv = setInterval(() => { if (!svg.isConnected) { clearInterval(iv); return; } if (svg.getBoundingClientRect().width > 0) { clearInterval(iv); try { tr.showMarker(); } catch (e) { /* first press retries */ } } }, 250);
    return card;
  }
  function buildSteps() {
    const card = P.mini('🖍️ Step by step', 'Look at the steps. Draw each step in your notebook, one after the other. Press the star when your drawing is ready!');
    const tools = h('div', 'c1a-tools', '', card); const msg = h('div', 'c1a-msg', '', card);
    P.wStar(tools, msg, card);
    return card;
  }

  function scan() {
    document.querySelectorAll('.m6-root.c1-drawing figure.m6-fig:not([data-c1d])').forEach(fig => {
      const src = fig.querySelector('svg'); if (!src) return;
      const c1 = src.classList.contains('c1dw');
      const hasDots = c1 ? !!src.querySelector('.c1dt') : !!src.querySelector('[stroke-dasharray]');
      const label = (src.getAttribute('aria-label') || '') + ' ' + (fig.textContent || '');
      if (!c1 && !hasDots && !/steps?/i.test(label)) return;       // plain pictures (colour pencils…) stay as printed
      fig.dataset.c1d = '1';
      let card;
      try { card = hasDots ? buildTrace(fig, src) : buildSteps(); } catch (e) { if (window.console) console.warn('c1 drawing build', e); return; }
      if (!card) return;
      card.dataset.c1p = 'drawing';
      P.loc(card, P.LANGS.ur);
      if (hasDots) {
        fig.style.display = 'none';
        const b = h('button', 'c1a-btn', '📖 Book picture', null); b.type = 'button';
        b.addEventListener('click', () => { const hid = fig.style.display === 'none'; fig.style.display = hid ? '' : 'none'; b.textContent = P.tx(hid ? '🙈 Hide book picture' : '📖 Book picture', P.LANGS.ur); });
        b.textContent = P.tx('📖 Book picture', P.LANGS.ur);
        const tools = card.querySelector('.c1a-tools'); if (tools) tools.appendChild(b);
      }
      fig.after(card);
    });
  }
  const obs = new MutationObserver(() => { clearTimeout(scan.t); scan.t = setTimeout(scan, 100); });
  const start = () => { obs.observe(document.body, {childList: true, subtree: true}); scan(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
