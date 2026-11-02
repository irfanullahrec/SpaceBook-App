/* sb_chapter_tools.js — two small helpers of the reader shell.
 *  1. Header fit: the header's page tabs (Home, Subjects, Tests Preps ...) never hide behind the Back / search buttons at any zoom or
 *     window width. Tabs that do not fit move into a "More" drop-down; resizing or zooming re-measures.
 *  2. Download: a "Download" button beside the chapter's top tabs (Lessons, Exercise ...). It makes a PDF on the device (no server):
 *       - Solved Exercise      : the chapter's exercise questions with their answers;
 *       - SLO-based practice   : MCQs, short and long questions made from each topic/page of the chapter (not from the exercise).
 *     The PDF pages are drawn on a canvas, so English, Urdu, Pashto and Arabic all print correctly. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);

  /* ---------------------------------------------------------------- 1. header fit */
  let moreBtn = null, moreMenu = null;
  function fitHeader() {
    const nav = document.getElementById('headerNavTabs');
    if (!nav) return;
    const tabs = [...nav.querySelectorAll(':scope > .nav-tab:not(.sbh-more), :scope > .nav-tab-back')];
    tabs.forEach(t => t.classList.remove('sbh-hide'));
    if (!moreBtn) {
      moreBtn = document.createElement('button'); moreBtn.type = 'button'; moreBtn.className = 'nav-tab sbh-more'; moreBtn.setAttribute('aria-haspopup', 'true');
      moreBtn.innerHTML = '<span class="nav-icon">⋯</span> <span>More</span>';
      moreMenu = document.createElement('div'); moreMenu.className = 'sbh-menu'; moreMenu.hidden = true; document.body.appendChild(moreMenu);
      moreBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (!moreMenu.hidden) { moreMenu.hidden = true; return; }
        const r = moreBtn.getBoundingClientRect();
        moreMenu.style.top = (r.bottom + 6) + 'px'; moreMenu.style.right = Math.max(8, window.innerWidth - r.right) + 'px';
        moreMenu.hidden = false;
      });
      document.addEventListener('click', () => { if (moreMenu) moreMenu.hidden = true; });
      moreMenu.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (!b) return; moreMenu.hidden = true; const t = tabs[+b.dataset.i]; if (t) t.click(); });
    }
    if (moreBtn.parentNode !== nav) nav.appendChild(moreBtn);
    moreBtn.style.display = 'none';
    nav.style.overflow = 'hidden';
    const shown = () => tabs.filter(t => !t.classList.contains('sbh-hide') && getComputedStyle(t).display !== 'none');
    const over = () => nav.scrollWidth > nav.clientWidth + 1;
    if (!over()) { moreMenu.hidden = true; return; }
    moreBtn.style.display = '';
    // hide from the right end (the Back button stays) until the row fits with the More button
    for (let i = tabs.length - 1; i >= 1 && over(); i--) tabs[i].classList.add('sbh-hide');
    if (over()) tabs[0].classList.add('sbh-hide');
    const hidden = tabs.map((t, i) => [t, i]).filter(([t]) => t.classList.contains('sbh-hide'));
    moreMenu.innerHTML = hidden.map(([t, i]) => `<button type="button" data-i="${i}">${esc((t.textContent || '').replace(/\s+/g, ' ').trim())}</button>`).join('');
    if (!hidden.length) moreBtn.style.display = 'none';
    void shown;
  }
  let fitT = 0;
  const fitSoon = () => { clearTimeout(fitT); fitT = setTimeout(fitHeader, 60); };

  /* ---------------------------------------------------------------- 2. PDF from canvas pages */
  const RTL = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
  const PW = 1240, PH = 1754, MX = 90, MY = 100;
  function paginate(blocks) {
    const pages = []; let cv = null, g = null, y = 0;
    const FONT = '"Noto Naskh Arabic","Jameel Noori Nastaleeq","Segoe UI",Tahoma,Arial,sans-serif';
    const newPage = () => { cv = document.createElement('canvas'); cv.width = PW; cv.height = PH; g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, PW, PH); y = MY; pages.push(cv);
      g.save(); g.translate(PW / 2, PH / 2); g.rotate(-Math.PI / 4); g.font = '700 210px Arial,sans-serif'; g.fillStyle = 'rgba(15,23,42,0.07)'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('SpaceBook', 0, 0); g.restore(); };
    newPage();
    blocks.forEach(b => {
      const size = b.size || 28, lh = Math.round(size * 1.65), weight = b.bold ? '700 ' : '400 ';
      g.font = weight + size + 'px ' + FONT;
      const rtl = RTL.test(b.text), maxW = PW - 2 * MX - (b.indent || 0);
      const words = String(b.text).replace(/\s+/g, ' ').trim().split(' '), lines = []; let cur = '';
      words.forEach(w => { const t = cur ? cur + ' ' + w : w; if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
      if (cur) lines.push(cur);
      if (y + lh * Math.min(lines.length, 2) > PH - MY) newPage();
      lines.forEach(l => {
        if (y + lh > PH - MY) newPage();
        g.font = weight + size + 'px ' + FONT; g.fillStyle = b.color || '#000000';
        g.direction = rtl ? 'rtl' : 'ltr'; g.textAlign = rtl ? 'right' : 'left'; g.textBaseline = 'alphabetic';
        g.fillText(l, rtl ? PW - MX - (b.indent || 0) : MX + (b.indent || 0), y + size);
        y += lh;
      });
      y += b.gap == null ? 10 : b.gap;
    });
    return pages;
  }
  function pdfOf(pages) {
    const enc = new TextEncoder(), parts = [], offs = []; let len = 0;
    const push = d => { const u = typeof d === 'string' ? enc.encode(d) : d; parts.push(u); len += u.length; };
    const obj = (n, body) => { offs[n] = len; push(`${n} 0 obj\n`); push(body); push('\nendobj\n'); };
    push('%PDF-1.4\n');
    const N = pages.length, kids = pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ');
    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    obj(2, `<< /Type /Pages /Kids [${kids}] /Count ${N} >>`);
    pages.forEach((cv, i) => {
      const b64 = cv.toDataURL('image/jpeg', 0.82).split(',')[1], bin = atob(b64), img = new Uint8Array(bin.length);
      for (let k = 0; k < bin.length; k++) img[k] = bin.charCodeAt(k);
      const p = 3 + i * 3, c = p + 1, im = p + 2, content = 'q 595 0 0 842 0 0 cm /Im0 Do Q';
      obj(p, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /Im0 ${im} 0 R >> >> /Contents ${c} 0 R >>`);
      obj(c, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
      offs[im] = len; push(`${im} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${PW} /Height ${PH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.length} >>\nstream\n`); push(img); push('\nendstream\nendobj\n');
    });
    const total = 3 + N * 3, xref = len;
    let x = `xref\n0 ${total}\n0000000000 65535 f \n`;
    for (let i = 1; i < total; i++) x += String(offs[i]).padStart(10, '0') + ' 00000 n \n';
    push(x + `trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
    return new Blob(parts, {type: 'application/pdf'});
  }
  function save(blob, name) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  }

  /* ---------------------------------------------------------------- question lists */
  // book equations are stored as LaTeX; the notes show plain readable text, never the markup
  const SUP = {'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻','+':'⁺','n':'ⁿ'};
  const SUB = {'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉'};
  const map = (str, m) => [...str].every(c => m[c]) ? [...str].map(c => m[c]).join('') : null;
  function plain(t) {
    // '@' stands for a literal backslash and '#' for a regex escape, so this file holds no hand-counted backslashes
    const BS = String.fromCharCode(92), R = (src, f) => new RegExp(src.split('@').join(BS + BS).split('#').join(BS), f);
    let x = String(t == null ? '' : t);
    x = x.replace(R('@(?:text|mathrm|mathbf|textbf|mathit|operatorname)#s*{([^{}]*)}', 'g'), '$1');
    for (let i = 0; i < 4; i++) x = x.replace(R('@d?frac#s*{([^{}]*)}#s*{([^{}]*)}', 'g'), '($1)/($2)').replace(R('@sqrt#s*{([^{}]*)}', 'g'), '√($1)');
    const SY = {times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓', leq: '≤', le: '≤', geq: '≥', ge: '≥', neq: '≠', ne: '≠', approx: '≈', infty: '∞', degree: '°', circ: '°', alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', theta: 'θ', lambda: 'λ', mu: 'μ', pi: 'π', sigma: 'σ', omega: 'ω', Omega: 'Ω', rho: 'ρ', phi: 'φ', epsilon: 'ε', rightarrow: '→', to: '→', propto: '∝', sum: 'Σ', Delta: 'Δ', quad: ' ', qquad: ' ', left: '', right: ''};
    x = x.replace(R('@([A-Za-z]+)', 'g'), (m, n) => (n in SY ? SY[n] : n));
    x = x.replace(R('#^{([^{}]*)}|#^(-?#w)', 'g'), (m, a, b) => { const v = a != null ? a : b; return map(v, SUP) || '^(' + v + ')'; });
    x = x.replace(R('_{([^{}]*)}|_(#w)', 'g'), (m, a, b) => { const v = a != null ? a : b; return map(v, SUB) || '_' + v; });
    return x.split('$').join('').split(BS).join('').replace(/[{}]/g, '').replace(R('#s+', 'g'), ' ').trim();
  }
  const clean = plain;
  function answerOf(it) {
    if (it.kind === 'mcq' && it.opts && it.a >= 0) return 'ABCD'[it.a] + ') ' + it.opts[it.a];
    if (it.kind === 'tf' && typeof it.a === 'boolean') return it.a ? 'True' : 'False';
    return clean(it.ans || it.why || '');
  }
  function chapterInfo() {
    const P = window.SBPageTabs, cur = P && P.chapterNow ? P.chapterNow() : {};
    let med = 'en'; try { med = (window.SBMedium && window.SBMedium.mediumNow()) || 'en'; } catch (e) { /* default */ }
    const btn = document.querySelector('.math-ch-btn.active');
    return {ch: cur.ch, med, name: btn ? clean(btn.textContent) : 'Chapter', subj: cur.subj};
  }
  function blocksFor(kind) {
    const info = chapterInfo(), TP = window.SBTopicPractice, out = [];
    out.push({text: 'SpaceBook — ' + info.name, size: 40, bold: true, gap: 6});
    out.push({text: kind === 'ex' ? 'Solved Exercise (questions and answers)' : 'SLO-based practice: MCQs, Short and Long Questions', size: 28, color: '#000000', gap: 24});
    if (kind === 'ex') {
      const items = info.ch && TP ? TP.collect(info.ch, info.med).filter(x => x.ex) : [];
      let n = 0;
      items.forEach(it => {
        n++; out.push({text: n + '. ' + clean(it.q), size: 28, bold: true, gap: 4});
        if (it.opts) it.opts.forEach((o, i) => out.push({text: 'ABCD'[i] + ') ' + clean(o), size: 26, indent: 40, gap: 0}));
        const a = answerOf(it);
        out.push({text: 'Answer: ' + (a || 'see the book’s answer key'), size: 26, color: '#000000', indent: 20, gap: 18});
      });
      if (!n) out.push({text: 'This chapter has no exercise questions in the book data.', size: 26});
    } else {
      const P = window.SBPageTabs, lp = P && P.lastPlan && P.lastPlan();
      if (!lp) out.push({text: 'Open the Lessons tab of the chapter first.', size: 26});
      else {
        const names = {mcq: 'Multiple Choice Questions', sq: 'Short Questions', lq: 'Long Questions'};
        ['mcq', 'sq', 'lq'].forEach(k => {
          out.push({text: names[k], size: 34, bold: true, color: '#000000', gap: 12});
          const seen = new Set(); let n = 0;
          lp.sets.forEach(st => st.slo[k].forEach(it => {
            if (it.kind === 'slo' || seen.has(it.q)) return; seen.add(it.q);
            n++; out.push({text: n + '. ' + clean(it.q), size: 27, bold: true, gap: 4});
            if (it.opts) it.opts.forEach((o, i) => out.push({text: 'ABCD'[i] + ') ' + clean(o), size: 25, indent: 40, gap: 0}));
            const a = answerOf(it); if (a) out.push({text: 'Answer: ' + a, size: 25, color: '#000000', indent: 20, gap: 14}); else out[out.length - 1].gap = 14;
          }));
          if (!n) out.push({text: '—', size: 25});
        });
      }
    }
    return out;
  }
  function download(kind) {
    try {
      const pages = paginate(blocksFor(kind));
      const nm = chapterInfo().name.replace(/[^\p{L}\p{N}]+/gu, '_').slice(0, 40) || 'chapter';
      save(pdfOf(pages), `SpaceBook_${nm}_${kind === 'ex' ? 'Solved_Exercise' : 'SLO_Practice'}.pdf`);
    } catch (e) { console.error('download', e); alert('The PDF could not be made.'); }
  }

  /* ---------------------------------------------------------------- the button */
  function placeButton() {
    const body = document.getElementById('dashboard-body') || document.body;
    const act = body.querySelector('.math-top-tab.active, .math-tab-btn.active');
    const chOpen = !!document.querySelector('.math-ch-btn.active');
    const old = body.querySelector('.sbct-dl');
    if (!act || !chOpen) { if (old) old.remove(); return; }
    // beside the Full screen button, above the tabs; the tab bar itself is the fallback
    const fs = body.querySelector('.sb-fs-btn:not(#bk-fs-float)') || body.querySelector('.sb-fs-btn');
    const bar = fs ? fs.parentElement : act.parentElement;
    if (old && old.parentElement === bar && (!fs || old.nextElementSibling === fs)) return;
    if (old) old.remove();
    const w = document.createElement('span'); w.className = 'sbct-dl';
    w.innerHTML = '<button type="button" class="sbct-btn" aria-haspopup="true">⬇ Download</button><div class="sbct-menu" hidden><button type="button" data-k="ex">📄 Solved Exercise (PDF)</button><button type="button" data-k="slo">🎯 SLO-based MCQs, SQs, LQs (PDF)</button></div>';
    const menu = w.querySelector('.sbct-menu');
    w.querySelector('.sbct-btn').addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); menu.hidden = !menu.hidden; });
    menu.addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (!b) return; e.stopPropagation(); menu.hidden = true; download(b.dataset.k); });
    document.addEventListener('click', () => { menu.hidden = true; });
    if (fs) fs.insertAdjacentElement('beforebegin', w); else bar.appendChild(w);
  }

  function start() {
    const s = document.createElement('style');
    s.textContent = `
    #headerNavTabs .sbh-hide{display:none!important}
    .sbh-more{cursor:pointer;border:0;background:transparent;font:inherit;flex:0 0 auto}
    .sbh-menu{position:fixed;z-index:9999;background:#fff;border:1px solid #cbd5e1;border-radius:12px;box-shadow:0 10px 30px rgba(15,23,42,.25);padding:.3rem;min-width:180px}
    .sbh-menu[hidden]{display:none}.sbh-menu button{display:block;width:100%;text-align:start;border:0;background:transparent;padding:.5rem .8rem;border-radius:8px;font:600 .9rem system-ui,sans-serif;cursor:pointer}.sbh-menu button:hover{background:#eef2ff}
    #headerNavTabs{flex-wrap:nowrap}
    .sbct-dl{position:relative;display:inline-block;margin-inline:.4rem;flex:0 0 auto;z-index:9001}
    .sbct-btn{border:1px solid #0369a1;background:#0369a1;color:#fff;border-radius:999px;padding:.35rem .9rem;font:700 .85rem system-ui,sans-serif;cursor:pointer;white-space:nowrap}
    .sbct-menu{position:absolute;top:calc(100% + 6px);inset-inline-end:0;z-index:200;background:#fff;border:1px solid #cbd5e1;border-radius:12px;box-shadow:0 10px 30px rgba(15,23,42,.25);padding:.3rem;min-width:260px}
    .sbct-menu[hidden]{display:none}.sbct-menu button{display:block;width:100%;text-align:start;border:0;background:transparent;padding:.55rem .8rem;border-radius:8px;font:600 .88rem system-ui,sans-serif;cursor:pointer;color:#0f172a}.sbct-menu button:hover{background:#eef2ff}`;
    document.head.appendChild(s);
    fitHeader();
    window.addEventListener('resize', fitSoon);
    if (window.ResizeObserver) { const n = document.getElementById('headerNavTabs'); if (n) new ResizeObserver(fitSoon).observe(n); const h = document.getElementById('top-header'); if (h) new ResizeObserver(fitSoon).observe(h); }
    let t = 0;
    new MutationObserver(() => { if (t) return; t = setTimeout(() => { t = 0; try { placeButton(); } catch (e) { /* optional */ } }, 200); }).observe(document.body, {childList: true, subtree: true});
    placeButton();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.SBChapterTools = {fitHeader, download, blocksFor};
})();
