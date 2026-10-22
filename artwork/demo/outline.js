// prints the visible text lines of the WebView page with their document offsets (to plan scrolls and taps)
const P = require('./phone');
(async () => {
  P.cdpAttach();
  const from = +(process.argv[2] || 0), to = +(process.argv[3] || 1e9);
  const r = await P.web(`(() => { const out = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) { const t = n.textContent.trim(); if (!t) continue; const p = n.parentElement; if (!p || !p.getClientRects().length) continue;
      const y = Math.round(p.getBoundingClientRect().top + scrollY); out.push(y + ' ' + t.slice(0, 80)); } return JSON.stringify(out); })()`);
  JSON.parse(r.value).filter(l => { const y = parseInt(l); return y >= from && y <= to; }).forEach(l => console.log(l));
})().catch(e => { console.log('ERR', e.message); process.exit(1); });
