/* SpaceBook Visual Reasoning engine (shared). A worked solution is a SPEC (see vr_specs_*.js):
 *   { q, given, rows:[{id,first,tex:{k:tex},pre?,view?,hideAt?,arcsFrom?,final?,note}], steps:[{dot,title,html,ops:[...]}] }
 * Rows are written one by one like on a board; ops move, mark and connect tagged parts (\htmlClass{k-..}{..}) of those rows.
 * The verified solution text stays authoritative: a spec only presents it. One authoritative step index (Tutor.i); every change
 * goes through go(). Mounted on <div data-sbt-host data-vr="spec-id"> when it first scrolls into view.
 * Ops: wait{t} write{r} cls{at,c} arrow{id,from,to,color,opt} fly{path,label,color} move{label,from,to,color,opt}
 *      par{ops} clear tex{r,t|{k}} hide{at} show{at}.  `at` = "row.k-tag". */
(function (root) {
  'use strict';
  const CANCEL = { cancelled: true };
  const SPEEDS = { slow: 2500, normal: 1500, fast: 700, turbo: 350 };
  const SPEED_LABELS = { slow: '0.5×', normal: '1×', fast: '2×', turbo: '4×' };
  const COLORS = { blue: '#2563eb', orange: '#ea580c', purple: '#7c3aed', green: '#16a34a' };
  const reduced = () => !!(root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const tex = s => root.katex.renderToString(s, { trust: true, throwOnError: false, output: 'html', strict: 'ignore' });
  const C = (cls, t) => `\\htmlClass{${cls}}{${t}}`;
  let uid = 0;
  const esc = x => String(x).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const css = `
.sbt{position:relative;margin:.35rem 0 .7rem;border:1px solid #cbd5e1;border-radius:12px;background:#fff;color:#0f172a;white-space:normal;overflow-wrap:normal;line-height:1.4;font-size:.95rem;overflow:clip}
.sbt *{box-sizing:border-box}
.sbt-head{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem .75rem;padding:.5rem .8rem;background:#f8fafc;border-bottom:1px solid #e2e8f0}
.sbt-q{background:#027cba;color:#fff;font-weight:700;border-radius:6px;padding:.1rem .5rem;font-size:.8rem}
.sbt-given{font-size:.92rem;flex:1 1 auto}
.sbt-dots{display:flex;flex-wrap:wrap;align-items:center;gap:.3rem}
.sbt-dot{width:22px;height:22px;border-radius:50%;border:1.5px solid #94a3b8;background:#fff;color:#475569;font-size:.7rem;font-weight:700;cursor:pointer;padding:0}
.sbt-dot.on{background:#027cba;border-color:#027cba;color:#fff}
.sbt-dot.seen{background:#dcfce7;border-color:#16a34a;color:#166534}
.sbt-x{border:0;background:transparent;font-size:1.1rem;cursor:pointer;color:#64748b;padding:0 .25rem}
.sbt-area{position:relative;padding:46px 1rem 10px;min-height:240px;font-size:1.3rem;overflow-x:auto}
.sbt-fsb{margin-left:auto;border:1px solid #94a3b8;background:transparent;color:inherit;border-radius:8px;font-size:1rem;line-height:1;cursor:pointer;padding:.2rem .5rem}
.sbt-fsb:hover{background:rgba(148,163,184,.25)}
.sbt-lines{column-width:30rem;column-gap:2.8rem;column-fill:auto;max-height:520px}
.sbt-lines>*{break-inside:avoid}
.sbt-colline{stroke:#64748b;stroke-width:2.5;stroke-dasharray:7 6;stroke-linecap:round;opacity:.8}
.sbt.sbt-fs{position:fixed;inset:0;z-index:2147483000;margin:0;border-radius:0;border:0;display:flex;flex-direction:column;width:100vw;height:100vh;max-height:none}
.sbt.sbt-fs .sbt-area{flex:1 1 auto;min-height:0;overflow:auto;font-size:1.45rem}
.sbt.sbt-fs .sbt-lines{column-width:31rem}
.sbt .sbt-lines.acc{column-width:auto;column-count:var(--cols,1);column-gap:2.4rem;column-fill:auto;max-height:none;font-size:calc(var(--sc,1) * 1em);line-height:1.3}
.sbt-grp{break-inside:avoid;margin:0 0 .35rem;padding:.25rem 0 .1rem;border-top:1px dashed rgba(148,163,184,.4);transition:opacity .4s}
.sbt-grp:first-child{border-top:0;padding-top:0}
.sbt-grp.past{opacity:.72}
.sbt-grp.past:hover{opacity:1}
.sbt-lines.acc .sbt-row{display:block;padding:.14rem .35rem;margin:.05rem 0;border-radius:0 6px 6px 0;scroll-margin:.5rem 0 8rem}
.sbt-lines.acc .sbt-note{display:none}
.sbt-lines.acc .sbt-row.work{margin-left:.7rem;padding-left:.6rem;border-left:3px solid rgba(148,163,184,.7)}
.sbt-lines.acc .sbt-row.state{padding-left:.6rem;border-left:3px solid #38bdf8}
.sbt-book{display:inline-block;margin-top:.2rem;font-size:.84rem;opacity:.85;border-left:3px solid #94a3b8;padding-left:.5rem}
html.sbt-lock,html.sbt-lock body{overflow:hidden!important}
.sbt-line{display:block;padding:.18rem .4rem;margin:.08rem 0;border-radius:6px;transition:opacity .35s,transform .35s,background .4s}
.sbt-row{display:grid;grid-template-columns:minmax(19rem,max-content) minmax(0,1fr);column-gap:1.4rem;align-items:center}
.sbt-row.arcs{margin-top:.9rem}
.sbt-note{font-size:.82rem;color:#64748b;white-space:normal}
.sbt-lines.compact .sbt-row{font-size:.78em}
.sbt-line.hid{opacity:0;transform:translateY(8px)}
.sbt-line.muted{opacity:.55;font-size:.85em}
.sbt-cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem 1.2rem}
.sbt-col h4{margin:0 0 .2rem;font-size:.78rem;font-weight:700;color:#475569;letter-spacing:.02em}
.sbt-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.sbt-chip{position:absolute;left:0;top:0;z-index:3;padding:.05rem .45rem;border-radius:7px;font-weight:700;font-size:1.05rem;color:#fff;box-shadow:0 3px 10px rgba(0,0,0,.25);pointer-events:none;white-space:nowrap}
.sbt-bubble{position:absolute;z-index:3;transform:translate(-50%,-100%);padding:.1rem .5rem;border-radius:7px;color:#fff;font-size:.85rem;font-weight:700;white-space:nowrap;animation:sbtPop .35s ease-out}
.sbt .katex .hl-blue,.sbt .katex .hl-orange,.sbt .katex .hl-purple,.sbt .katex .hl-green{display:inline-block;border-radius:5px;padding:0 .08em;margin:0 -.04em}
.sbt .katex .hl-blue{background:#dbeafe;box-shadow:0 0 0 2px #60a5fa;color:#1d4ed8}
.sbt .katex .hl-orange{background:#ffedd5;box-shadow:0 0 0 2px #fb923c;color:#c2410c}
.sbt .katex .hl-purple{background:#ede9fe;box-shadow:0 0 0 2px #a78bfa;color:#6d28d9}
.sbt .katex .hl-red{background:#fee2e2;box-shadow:0 0 0 2px #f87171;color:#b91c1c;display:inline-block;border-radius:5px;padding:0 .08em}
.sbt .katex .strike{display:inline-block;background:linear-gradient(to top right,transparent calc(50% - 1.6px),#dc2626 calc(50% - 1.6px),#dc2626 calc(50% + 1.6px),transparent calc(50% + 1.6px));opacity:.75}
.sbt .katex .hl-green{background:#dcfce7;box-shadow:0 0 0 2px #4ade80;color:#15803d}
.sbt .katex .pulse{animation:sbtPulse .8s ease-in-out 2}
.sbt .katex .gone{opacity:.15}
.sbt .katex [class^="k-"],.sbt .katex [class*=" k-"]{display:inline-block}
.sbt .katex [class*="k-slot"]{min-width:2.6em;height:1.05em;border-bottom:2px dashed #94a3b8;vertical-align:-.1em}
.sbt .katex .ul-blue{border-bottom:3px solid #2563eb}.sbt .katex .ul-orange{border-bottom:3px solid #ea580c}
.sbt .katex .zoom{animation:sbtZoom 1s ease-in-out 2;position:relative;z-index:2}
.sbt .katex .zoom-s{animation:sbtZoomS 1s ease-in-out 2;position:relative;z-index:2}
.sbt-line.final{background:#dcfce7;box-shadow:inset 3px 0 0 #16a34a}
.sbt-explain{padding:.55rem .9rem;border-top:1px solid #e2e8f0;background:#fcfdff;min-height:76px}
.sbt-explain h5{margin:0 0 .15rem;font-size:.92rem;color:#0f172a}
.sbt-explain p{margin:0;font-size:.88rem;color:#334155}
.sbt-explain b.b{color:#1d4ed8}.sbt-explain b.o{color:#c2410c}.sbt-explain b.p{color:#6d28d9}.sbt-explain b.g{color:#15803d}.sbt-explain b.r{color:#b91c1c}
.sbt-nav{position:sticky;bottom:env(safe-area-inset-bottom,0);z-index:5;display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;padding:.5rem .7rem;background:rgba(255,255,255,.97);border-top:1px solid #cbd5e1;box-shadow:0 -4px 10px rgba(15,23,42,.06)}
.sbt-nav button,.sbt-nav select{font:inherit;font-size:.85rem;border:1px solid #cbd5e1;background:#fff;border-radius:999px;padding:.32rem .85rem;cursor:pointer;color:#0f172a}
.sbt-nav button.primary{background:#027cba;border-color:#027cba;color:#fff;font-weight:700}
.sbt-nav button:disabled{opacity:.45;cursor:default}
.sbt-nav .sp{flex:1 1 auto}
.sbt-nav label{font-size:.78rem;color:inherit;opacity:.8;display:flex;align-items:center;gap:.3rem}
.sbt-practice{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;padding:.45rem .8rem;background:#fffbeb;border-top:1px solid #fde68a}
.sbt-practice[hidden]{display:none}
.sbt-pq{font-weight:700;font-size:.85rem;color:#92400e}
.sbt-pin{flex:1 1 12rem;min-width:8rem;font:inherit;font-size:.95rem;border:1px solid #cbd5e1;border-radius:8px;padding:.3rem .6rem}
.sbt-practice button{font:inherit;font-size:.82rem;border:1px solid #cbd5e1;background:#fff;border-radius:999px;padding:.28rem .8rem;cursor:pointer}
.sbt-pmsg{flex-basis:100%;font-size:.82rem;color:inherit;opacity:.85}
.sbt button:focus-visible,.sbt select:focus-visible,.sbt input:focus-visible{outline:3px solid #f59e0b;outline-offset:2px}
@media (prefers-color-scheme:dark){
:root:not([data-theme="light"]) .sbt{background:#0f172a;color:#e2e8f0;border-color:#334155}
:root:not([data-theme="light"]) .sbt .sbt-head{background:#111c33;border-color:#334155}
:root:not([data-theme="light"]) .sbt .sbt-explain{background:#0f172a;border-color:#334155}
:root:not([data-theme="light"]) .sbt .sbt-explain h5{color:#f1f5f9}
:root:not([data-theme="light"]) .sbt .sbt-explain p{color:#cbd5e1}
:root:not([data-theme="light"]) .sbt .sbt-nav{background:rgba(15,23,42,.97);border-color:#334155}
:root:not([data-theme="light"]) .sbt .sbt-nav button,:root:not([data-theme="light"]) .sbt .sbt-nav select,:root:not([data-theme="light"]) .sbt .sbt-practice input{background:#1e293b;color:#e2e8f0;border-color:#475569}
:root:not([data-theme="light"]) .sbt .sbt-nav button.primary{background:#0284c7;border-color:#0284c7;color:#fff}
:root:not([data-theme="light"]) .sbt .sbt-note{color:#94a3b8}
:root:not([data-theme="light"]) .sbt .sbt-dot{background:#1e293b;color:#cbd5e1;border-color:#64748b}
:root:not([data-theme="light"]) .sbt .sbt-line.final{background:rgba(22,163,74,.22)}
:root:not([data-theme="light"]) .sbt .sbt-practice{background:#1e293b;border-color:#334155}
:root:not([data-theme="light"]) .sbt .sbt-practice button{background:#1e293b;color:#e2e8f0;border-color:#475569}
:root:not([data-theme="light"]) .sbt .sbt-pq{color:#fcd34d}
:root:not([data-theme="light"]) .sbt .katex .hl-blue{background:#1e3a8a;color:#bfdbfe}
:root:not([data-theme="light"]) .sbt .katex .hl-orange{background:#7c2d12;color:#fed7aa}
:root:not([data-theme="light"]) .sbt .katex .hl-purple{background:#4c1d95;color:#ddd6fe}
:root:not([data-theme="light"]) .sbt .katex .hl-green{background:#14532d;color:#bbf7d0}
:root:not([data-theme="light"]) .sbt .katex .hl-red{background:#7f1d1d;color:#fecaca}
}
:root[data-theme="dark"] .sbt{background:#0f172a;color:#e2e8f0;border-color:#334155}
:root[data-theme="dark"] .sbt .sbt-head{background:#111c33;border-color:#334155}
:root[data-theme="dark"] .sbt .sbt-explain{background:#0f172a;border-color:#334155}
:root[data-theme="dark"] .sbt .sbt-explain h5{color:#f1f5f9}
:root[data-theme="dark"] .sbt .sbt-explain p{color:#cbd5e1}
:root[data-theme="dark"] .sbt .sbt-nav{background:rgba(15,23,42,.97);border-color:#334155}
:root[data-theme="dark"] .sbt .sbt-nav button,:root[data-theme="dark"] .sbt .sbt-nav select,:root[data-theme="dark"] .sbt .sbt-practice input{background:#1e293b;color:#e2e8f0;border-color:#475569}
:root[data-theme="dark"] .sbt .sbt-nav button.primary{background:#0284c7;border-color:#0284c7;color:#fff}
:root[data-theme="dark"] .sbt .sbt-note{color:#94a3b8}
:root[data-theme="dark"] .sbt .sbt-dot{background:#1e293b;color:#cbd5e1;border-color:#64748b}
:root[data-theme="dark"] .sbt .sbt-line.final{background:rgba(22,163,74,.22)}
:root[data-theme="dark"] .sbt .sbt-practice{background:#1e293b;border-color:#334155}
:root[data-theme="dark"] .sbt .sbt-practice button{background:#1e293b;color:#e2e8f0;border-color:#475569}
:root[data-theme="dark"] .sbt .sbt-pq{color:#fcd34d}
:root[data-theme="dark"] .sbt .katex .hl-blue{background:#1e3a8a;color:#bfdbfe}
:root[data-theme="dark"] .sbt .katex .hl-orange{background:#7c2d12;color:#fed7aa}
:root[data-theme="dark"] .sbt .katex .hl-purple{background:#4c1d95;color:#ddd6fe}
:root[data-theme="dark"] .sbt .katex .hl-green{background:#14532d;color:#bbf7d0}
:root[data-theme="dark"] .sbt .katex .hl-red{background:#7f1d1d;color:#fecaca}
@keyframes sbtZoom{0%,100%{transform:scale(1)}50%{transform:scale(1.7)}}
@keyframes sbtZoomS{0%,100%{transform:scale(1)}50%{transform:scale(1.22)}}
@keyframes sbtPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
@keyframes sbtPop{from{opacity:0;transform:translate(-50%,-70%) scale(.8)}to{opacity:1;transform:translate(-50%,-100%) scale(1)}}
@media (max-width:640px){.sbt-row{grid-template-columns:1fr;row-gap:0}.sbt-note{display:none}.sbt-area{font-size:1.05rem;padding:30px .5rem 8px}.sbt-cols{grid-template-columns:1fr}.sbt-nav .sp{display:none}.sbt-lines{columns:1;max-height:none!important}.sbt-colline{display:none}}
@media (prefers-reduced-motion:reduce){.sbt .katex .pulse,.sbt-bubble{animation:none}.sbt-line{transition:none}}`;

  const SPECS = {};
  const NS = root.SBVR = root.SBVR || {};
  NS.specs = SPECS; NS.C = C; NS.BLANK = n => C('k-slot' + (n || ''), '\\ \\ \\ \\ \\ \\ ');
  NS.register = spec => { SPECS[spec.id] = spec; };

  /* screen-reader wording for an equation (the KaTeX markup itself is hidden from assistive technology) */
  function speak(t) {
    let s = String(t).replace(/\\htmlClass\{[^{}]*\}/g, '');
    for (let i = 0; i < 6; i++) s = s.replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, ' ($1) over ($2) ').replace(/\\sqrt\{([^{}]*)\}/g, ' square root of ($1) ');
    s = s.replace(/\^\{?2\}?/g, ' squared ').replace(/\^\{?3\}?/g, ' cubed ').replace(/\^\{([^{}]*)\}/g, ' to the power $1 ').replace(/\^(\w)/g, ' to the power $1 ').replace(/_\{?([^{}\s]*)\}?/g, ' sub $1 ')
      .replace(/\\times|\\cdot/g, ' times ').replace(/\\div/g, ' divided by ').replace(/\\neq/g, ' is not equal to ').replace(/\\approx/g, ' is approximately ').replace(/\\le(?![a-z])/g, ' is at most ').replace(/\\ge(?![a-z])/g, ' is at least ')
      .replace(/\\checkmark/g, ' check ').replace(/\\pm/g, ' plus or minus ').replace(/\\mathbb\{R\}/g, ' the real numbers ').replace(/\\infty/g, ' infinity ').replace(/\\(sin|cos|tan|log|ln)/g, ' $1 ')
      .replace(/\\overline\{([^{}]*)\}/g, ' bar over ($1) ').replace(/\\setminus/g, ' without ').replace(/\\(rightarrow|to)(?![a-z])/g, ' gives ').replace(/\\circ/g, ' degrees ').replace(/\\pi/g, ' pi ').replace(/\\theta/g, ' theta ').replace(/\\text\{([^{}]*)\}/g, ' $1 ')
      .replace(/\\(left|right|quad|qquad|ldots|,|;|!)/g, ' ').replace(/=/g, ' equals ').replace(/\+/g, ' plus ').replace(/-/g, ' minus ').replace(/\*/g, ' times ').replace(/\//g, ' over ').replace(/[{}\\]/g, ' ').replace(/\s+/g, ' ').trim();
    return s;
  }
  /* canonical plain form of a TeX row or of what a learner typed (for Practice Mode comparisons only) */
  function canon(x) {
    let t = String(x || '').replace(/\\htmlClass\{[^{}]*\}/g, '');
    for (let i = 0; i < 6; i++) t = t.replace(/\\htmlClass\{[^{}]*\}\{([^{}]*)\}/g, '$1').replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)').replace(/\\sqrt\{([^{}]*)\}/g, 'sqrt($1)').replace(/\\text\{([^{}]*)\}/g, '$1');
    t = t.replace(/\\(left|right|,|;|!|quad|qquad)/g, '').replace(/\\ /g, '').replace(/\\(times|cdot)\s*/g, '*').replace(/\\(sin|cos|tan|log|ln)\s*/g, '$1').replace(/\\mathbb\{R\}/g, 'R').replace(/\\neq/g, '!=').replace(/\\pi/g, 'pi')
      .replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/√/g, 'sqrt').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, c => '^' + '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).replace(/\*\*/g, '^')
      .replace(/[{}\s]/g, '').replace(/^=/, '').replace(/[.;,]+$/, '').toLowerCase();
    return t;
  }
  /* explanation text may contain $tex$ (the books' own notation): typeset it, never show the dollar signs */
  const unesc = x => x.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  const rich = h => String(h).replace(/\$\$([^$]+)\$\$|\$([^$]+)\$|\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]/g, (all, a, b, c, d) => {
    try { return root.katex.renderToString(unesc(a || b || c || d), { throwOnError: false, output: 'html', strict: 'ignore' }); } catch (e) { return all; }
  });
  const strip = t =>t.replace(/^\((.*)\)$/, '$1').replace(/\*/g, '');
  class Tutor {
    constructor(host, spec) {
      this.host = host; this.spec = spec; this.self = this; this.i = 0; this.run = 0; this.my = 0; this.seen = new Set(); this.speed = 'normal';
      this.id = 'sbt' + (++uid); this.build(); this.go(0);
    }
    build() {
      if (!document.getElementById('sbt-style')) { const s = document.createElement('style'); s.id = 'sbt-style'; s.textContent = css + (NS.vizCss || '') + '.sbt-row.vizrow{grid-template-columns:minmax(0,28rem) minmax(0,1fr)}'; document.head.appendChild(s); }
      this.host.innerHTML =
        `<div class="sbt" id="${this.id}"><div class="sbt-head"><span class="sbt-q">${this.spec.q}</span>
        <span class="sbt-given">${this.spec.givenText ? esc(this.spec.givenText) : tex(this.spec.given || '')}</span>
        <span class="sbt-dots">${this.spec.steps.map((s, k) => `<button type="button" class="sbt-dot" data-k="${k}" title="${s.dot}" aria-label="${s.title}">${k + 1}</button>`).join('')}</span>
        <button type="button" class="sbt-fsb" data-act="fs" aria-pressed="false" title="Full screen board" aria-label="Full screen board">⛶</button>
        </div>
        <div class="sbt-area"><svg class="sbt-svg"><defs></defs></svg><div class="sbt-lines"></div></div>
        <div class="sbt-practice" hidden><span class="sbt-pq"></span><input type="text" class="sbt-pin" autocomplete="off" spellcheck="false" aria-label="Your next line"><button type="button" data-act="pcheck">Check</button><button type="button" data-act="phint">Hint</button><button type="button" data-act="pshow">Show me</button><span class="sbt-pmsg" role="status"></span></div>
        <div class="sbt-explain" aria-live="polite"><h5></h5><p></p></div>
        <div class="sbt-nav"><button type="button" class="primary" data-act="play" aria-pressed="false" title="Play all steps automatically">▶ Play</button><button type="button" data-act="prev">◀ Previous</button><button type="button" data-act="replay">↻ Replay Animation</button>
        <button type="button" class="primary" data-act="next">Next Step ▶</button><button type="button" data-act="full" aria-pressed="false">☰ All steps</button><button type="button" data-act="voice" aria-pressed="false" title="Start / stop the voice that explains each step">🔊 Voice</button><select data-act="vlang" aria-label="Voice language" title="Voice language"><option value="en">English</option><option value="ur">اردو</option></select><span class="sbt-vnote" hidden style="flex:1 1 100%;font-size:.8rem;color:#b45309">No Urdu voice is installed on this device, so Urdu text may be read in English. On Windows add one in Settings → Time &amp; language → Speech → Add voices → Urdu; on Android install Urdu in Google text-to-speech.</span><span class="sp"></span>
        <label>Mode <select data-act="mode"><option value="guided">Guided</option><option value="quick">Quick</option><option value="practice">Practice</option></select></label>
        <button type="button" data-act="spd" title="Speed: click to make the animation faster or slower" aria-label="Animation speed">⏩ <span class="sbt-spv">1×</span></button></div></div>`;
      this.el = this.host.firstElementChild;
      this.area = this.el.querySelector('.sbt-area'); this.svg = this.el.querySelector('.sbt-svg'); this.box = this.el.querySelector('.sbt-lines');
      if (this.spec.acc) this.box.classList.add('acc');   // accumulating board: every line stays, groups wrap into columns (see planAcc)
      this.el.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.k != null) return this.go(+b.dataset.k);
        const a = b.dataset.act;
        if (a === 'pcheck' || a === 'phint' || a === 'pshow') return this.practiceAct(a);
        if (a === 'fs') return this.toggleFs();
        if (a === 'play') return this.togglePlay();
        if (a === 'voice') return this.toggleVoice();
        if (a === 'prev') this.go(this.i - 1);
        else if (a === 'next') this.go(this.i === this.spec.steps.length - 1 ? 0 : this.i + 1);
        else if (a === 'replay') this.go(this.i);
        else if (a === 'full') { const f = this.host.parentElement.querySelector('[data-sbt-full]'); if (f) { const on = f.style.display === 'none'; f.style.display = on ? (f.dataset.disp || 'block') : 'none'; if (on) this.host.dispatchEvent(new CustomEvent('sbvr-last', { bubbles: true })); b.setAttribute('aria-pressed', String(on)); } }
      });
      this.base = 'normal'; this.mode = 'guided';
      this.el.querySelector('[data-act="spd"]').addEventListener('click', e => {
        const order = Object.keys(SPEED_LABELS); this.base = order[(order.indexOf(this.base) + 1) % order.length];
        if (this.mode !== 'quick') this.speed = this.base;
        e.currentTarget.querySelector('.sbt-spv').textContent = SPEED_LABELS[this.base]; this.go(this.i);
      });
      this.el.querySelector('[data-act="mode"]').addEventListener('change', e => { this.mode = e.target.value; this.speed = this.mode === 'quick' ? 'quick' : this.base; this.go(this.i); });
      this.el.querySelector('[data-act="vlang"]').addEventListener('change', e => { this.vlang = e.target.value; this.voiceNote(); if (this.voice) this.narrate(this.spec.steps[this.i]); });
      this.el.querySelector('.sbt-pin').addEventListener('keydown', e => { if (e.key === 'Enter') this.practiceAct('pcheck'); });
    }
    togglePlay(force) {
      const on = force != null ? force : !this.playing, b = this.el.querySelector('[data-act="play"]');
      this.playing = on; clearInterval(this.pt);
      if (b) { b.textContent = on ? '⏸ Pause' : '▶ Play'; b.setAttribute('aria-pressed', String(on)); }
      if (!on) return;
      const last = this.spec.steps.length - 1;
      if (this.i >= last) this.go(0);
      this.idle = 0;
      this.pt = setInterval(() => {
        if (!this.playing || !this.el.isConnected) { clearInterval(this.pt); return; }
        if (this.busy || this.speaking) { this.idle = 0; return; }
        this.idle += 200;
        if (this.idle < Math.max(500, (SPEEDS[this.speed] || 700) * 0.8)) return;
        this.idle = 0;
        if (this.i >= last) return this.togglePlay(false);
        this.go(this.i + 1);
      }, 200);
    }
    /* voice: explains each step while it is being solved, in English or Urdu (device voices only; Urdu text from the offline translator) */
    toggleVoice() {
      this.voice = !this.voice; this.vlang = this.vlang || 'en'; this.voiceNote();
      const b = this.el.querySelector('[data-act="voice"]'); b.setAttribute('aria-pressed', String(this.voice)); b.textContent = this.voice ? '🔇 Stop voice' : '🔊 Voice';
      if (this.voice) this.narrate(this.spec.steps[this.i]); else this.hush();
    }
    hush() { this.speaking = false; this.say = (this.say || 0) + 1; try { root.speechSynthesis && root.speechSynthesis.cancel(); } catch (e) { /* no speech on this device */ } }
    speakable(st) {
      const plain = x => String(x || '').replace(/<[^>]+>/g, ' ').replace(/\\htmlClass\{[^}]*\}/g, '').replace(/\\(?:times|cdot)/g, ' times ').replace(/\\div/g, ' divided by ').replace(/\\(?:left|right)/g, '').replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, ' $1 over $2 ').replace(/\\sqrt\{([^}]*)\}/g, ' square root of $1 ').replace(/[$\\{}]/g, ' ').replace(/×/g, ' times ').replace(/÷/g, ' divided by ').replace(/[−–]/g, ' minus ').replace(/=/g, ' equals ').replace(/\+/g, ' plus ').replace(/\s+/g, ' ').trim();
      return [plain(st.title), plain(st.html)].filter(Boolean).join('. ').replace(/Textbook:.*$/i, '').trim();
    }
    /* Urdu for the sentences the board itself generates (see tools/qa/vr_phrases.js for how often each is spoken); maths words in Urdu */
    urWords(s) {
      return String(s).replace(/ times /g, ' ضرب ').replace(/ divided by /g, ' تقسیم ').replace(/ minus /g, ' منفی ').replace(/ plus /g, ' جمع ').replace(/ equals /g, ' برابر ').replace(/ over /g, ' بٹا ').replace(/square root of/g, 'جذر').replace(/\s+/g, ' ').trim();
    }
    urPhrase(sent) {
      const s = sent.replace(/[.:]+$/, '').trim(), w = x => this.urWords(x);
      const fixed = {
        'Look at the line above': 'اوپر والی لائن دیکھیں', 'the next line comes from it': 'اگلی لائن اسی سے بنتی ہے',
        'Look at the line above: the next line comes from it': 'اوپر والی لائن دیکھیں: اگلی لائن اسی سے بنتی ہے',
        'Write the next line': 'اگلی لائن لکھیں', 'The next equation': 'اگلی مساوات', 'Look at the part that changes': 'وہ حصہ دیکھیں جو بدلتا ہے',
        'Calculate': 'حساب لگائیں', 'Differentiate': 'تفرق نکالیں', 'Differentiate again': 'دوبارہ تفرق نکالیں', 'Integrate': 'تکمل نکالیں',
        'Integrate term by term': 'ہر رکن کا تکمل نکالیں', 'Substitute': 'قیمت رکھیں', 'Expand': 'پھیلائیں', 'Multiply': 'ضرب دیں', 'Add': 'جمع کریں',
        'Check': 'جانچ کریں', 'Check directly': 'براہِ راست جانچ کریں', 'Result': 'نتیجہ', 'Sum': 'مجموعہ', 'Difference': 'فرق', 'Factor': 'جزو نکالیں',
        'Collect': 'اکٹھا کریں', 'Combine': 'ملائیں', 'Rearrange': 'ترتیب بدلیں', 'Domain': 'ڈومین', 'Complete the square': 'مربع مکمل کریں',
        'Complete squares': 'مربع مکمل کریں', 'Set it to zero': 'اسے صفر کے برابر رکھیں', 'First derivative': 'پہلا تفرق', 'Solution': 'حل', 'Answer': 'جواب'
      };
      if (fixed[s]) return fixed[s];
      let m;
      if ((m = /^Step (\d+) of (\d+)$/i.exec(s))) return 'مرحلہ ' + m[1] + ' از ' + m[2];
      if ((m = /^Replace (.+?) with (.+?) and write the new line$/i.exec(s))) return w(m[1]) + ' کو ' + w(m[2]) + ' سے بدل کر نئی لائن لکھیں';
      if ((m = /^Write the result (.+?) back where the operation was$/i.exec(s))) return 'نتیجہ ' + w(m[1]) + ' وہیں لکھیں جہاں عمل تھا';
      if ((m = /^(Multiply|Divide) by (.+)$/i.exec(s))) return w(m[2]) + (m[1][0] === 'M' ? ' سے ضرب دیں' : ' سے تقسیم کریں');
      if ((m = /^Check (.+)$/i.exec(s))) return w(m[1]) + ' کی جانچ کریں';
      if ((m = /^Substitute (.+)$/i.exec(s))) return w(m[1]) + ' رکھیں';
      if (/^[#\d\s.,()+\-−×÷=/^√a-z²³]+$/i.test(s) && /\d/.test(s)) return w(s);   // a bare calculation: read it with Urdu maths words
      return null;
    }
    hasUrduVoice() { try { return root.speechSynthesis.getVoices().some(x => x.lang && /^ur/i.test(x.lang)); } catch (e) { return false; } }
    voiceNote() {
      const n = this.el.querySelector('.sbt-vnote'); if (!n) return;
      const miss = this.voice && (this.vlang || 'en') === 'ur' && !this.hasUrduVoice();
      n.hidden = !miss;
    }
    async narrate(st) {
      if (!st || !root.speechSynthesis) return;
      this.hush(); const my = this.say;
      const text = this.speakable(st), ur = (this.vlang || 'en') === 'ur';
      if (!text) return;
      this.speaking = true;
      // one segment per sentence; in Urdu a sentence is spoken in Urdu when the offline translator has a real translation
      // (curated, machine or dictionary), otherwise it stays English (a word-by-word gloss is not worth reading aloud)
      const segs = [];
      for (const sent of text.split(/(?<=[.!?])\s+/).filter(Boolean)) {
        const own = ur && this.urPhrase(sent);
        if (own) { segs.push({ t: own, l: 'ur' }); continue; }
        if (ur && root.SBTranslate) {
          try { const r = await root.SBTranslate.translate(sent, 'en', 'ur'); if (my !== this.say) return; if (r && r.text && r.source !== 'gloss' && r.source !== 'none') { segs.push({ t: r.text, l: 'ur' }); continue; } } catch (e) { /* English */ }
        }
        segs.push({ t: sent, l: 'en' });
      }
      const voices = root.speechSynthesis.getVoices();
      const next = k => {
        if (my !== this.say) return;
        if (k >= segs.length) { this.speaking = false; return; }
        const g = segs[k], v = voices.find(x => x.lang && x.lang.toLowerCase().startsWith(g.l));
        const u = new SpeechSynthesisUtterance(g.t); u.lang = g.l === 'ur' ? 'ur-PK' : 'en-US'; if (v) { u.voice = v; u.lang = v.lang; } u.rate = 0.92;
        u.onend = () => next(k + 1); u.onerror = () => next(k + 1);
        root.speechSynthesis.speak(u);
      };
      next(0);
    }
    close() { this.hush(); this.playing = false; clearInterval(this.pt); this.run++; this.host.innerHTML = ''; this.host.hidden = true; if (this.btn) this.btn.setAttribute('aria-expanded', 'false'); }
    go(i) {
      this.t0 = performance.now();
      const STEPS = this.spec.steps; this.i = Math.max(0, Math.min(i, STEPS.length - 1));
      const my = ++this.run;
      this.box.innerHTML = ''; this.box._g = {}; this.R = {}; this.clearOverlay();
      const acc = !!this.spec.acc, started = new Set(), gone = L => L.hideAt != null && this.i >= L.hideAt;
      if (acc) this.spec.rows.forEach(L => { if (L.grp && L.first <= this.i && !gone(L)) started.add(L.grp); });
      // an accumulating board reserves the room of a whole group when its first line is written, so nothing jumps between columns mid-group
      this.spec.rows.forEach(L => { if (gone(L) || (L.first > this.i && !(acc && L.grp && started.has(L.grp)))) return; this.R[L.id] = this.row(L, this.texAt(L, this.i), L.first >= this.i); }); this.area.querySelectorAll('.sbt-chip,.sbt-bubble').forEach(n => n.remove());
      if (acc) this.markPast(STEPS[this.i]);
      this.fit(); this.columnLines();
      const st = STEPS[this.i];
      this.el.querySelector('.sbt-explain h5').textContent = st.title;
      this.el.querySelector('.sbt-explain p').innerHTML = rich(st.html);
      this.el.querySelectorAll('.sbt-dot').forEach((d, k) => { d.classList.toggle('on', k === this.i); d.classList.toggle('seen', k !== this.i && this.seen.has(k)); });
      const last = this.i === STEPS.length - 1, nx = this.el.querySelector('[data-act="next"]');
      nx.textContent = last ? '↻ Replay Solution' : 'Next Step ▶';
      this.el.querySelector('[data-act="prev"]').disabled = this.i === 0;
      this.seen.add(this.i);
      const w = Object.create(this); w.my = my;
      w.paths = {};
      this.busy = true; this.paused = false; this.hidePractice();
      if (this.voice) this.narrate(st);
      if (this.i === STEPS.length - 1) this.host.dispatchEvent(new CustomEvent('sbvr-last', { bubbles: true }));
      const t0 = performance.now(); (NS.perf = NS.perf || { go: [] }).go.push(Math.round(performance.now() - this.t0 || 0)); if (NS.perf.go.length > 200) NS.perf.go.shift();
      (async () => { try { await w.runOps(st.ops, st); } catch (e) { if (e !== CANCEL) console.error('sbt', e); } if (this.run === my) this.busy = false; })();
    }

    /* ---- full screen board (only the dark board), and the multi-column board: when a column is full a line is drawn and writing continues on the right ---- */
    toggleFs() {
      const el = this.el, on = !el.classList.contains('sbt-fs');
      this.plan = null;
      const exit = () => { this.plan = null; el.classList.remove('sbt-fs'); document.documentElement.classList.remove('sbt-lock'); const b = el.querySelector('[data-act="fs"]'); if (b) { b.setAttribute('aria-pressed', 'false'); b.textContent = '⛶'; } this.fsKeys && document.removeEventListener('keydown', this.fsKeys); setTimeout(() => this.go(this.i), 150); };
      if (!on) { if (document.fullscreenElement === el && document.exitFullscreen) { document.exitFullscreen().catch(() => {}); } return exit(); }
      el.classList.add('sbt-fs'); document.documentElement.classList.add('sbt-lock');
      const b = el.querySelector('[data-act="fs"]'); b.setAttribute('aria-pressed', 'true'); b.textContent = '✕';
      try { if (el.requestFullscreen) el.requestFullscreen().catch(() => {}); } catch (e) { /* the fixed overlay is the fallback */ }
      this.fsKeys = e => { if (e.key === 'Escape') { if (!document.fullscreenElement) exit(); } else if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); this.go(this.i === this.spec.steps.length - 1 ? 0 : this.i + 1); } else if (e.key === 'ArrowLeft') { this.go(this.i - 1); } };
      document.addEventListener('keydown', this.fsKeys);
      const onFs = () => { if (!document.fullscreenElement && el.classList.contains('sbt-fs')) { exit(); document.removeEventListener('fullscreenchange', onFs); } };
      document.addEventListener('fullscreenchange', onFs);
      setTimeout(() => this.go(this.i), 200);
    }
    /* column height = the visible board height; if rows would run into columns that do not fit sideways, fall back to one tall column */
    /* accumulating board (spec.acc): the largest text size and fewest columns (1 to 3) in which EVERY line of the solution fits the board.
       Measured once on a hidden copy holding all the lines, so the scale and the columns stay the same from the first step to the last. */
    planAcc() {
      const b = this.box, a = this.area, fs = this.el.classList.contains('sbt-fs'), W = b.clientWidth;
      if (W < 120) return;                                            // the host is not on screen yet: plan when it is
      const narrow = (root.innerWidth || 1000) <= 640;
      const H = fs ? Math.max(260, a.clientHeight - 62) : Math.max(300, Math.min(720, Math.round((root.innerHeight || 800) - 300)));   // leaves room for the header, the explanation and the buttons: the whole board shows on one screen
      const key = W + 'x' + H + (narrow ? 'n' : '');
      if (!this.plan || this.plan.key !== key) {
        const m = document.createElement('div'); m.className = 'sbt-lines acc'; m.setAttribute('aria-hidden', 'true'); m._g = {};
        m.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;pointer-events:none;width:' + W + 'px;';
        this.spec.rows.forEach(L => { if (L.hideAt == null) this.row(L, this.texAt(L, 1e9), true, m); });
        a.appendChild(m);
        const fits = () => m.scrollWidth <= m.clientWidth + 2 && !Array.from(m.querySelectorAll('.sbt-eq')).some(e => e.scrollWidth > e.clientWidth + 1);
        let best = null;
        for (const sc of [1, .92, .85, .78, .72, .66, .62]) {
          for (let n = 1; n <= (narrow ? 1 : 3) && !best; n++) {
            m.style.setProperty('--sc', sc); m.style.setProperty('--cols', n); m.style.height = narrow ? 'auto' : H + 'px';
            if (fits()) best = { sc, n, h: narrow ? 0 : H };
          }
          if (best) break;
        }
        if (best && best.n === 1 && best.h) { m.style.height = 'auto'; best.h = Math.min(best.h, m.scrollHeight + 8); }   // a short solution gets a short board
        m.remove();
        this.plan = Object.assign({ key, sc: .62, n: 1, h: 0 }, best || {});    // nothing fits: smallest text, one tall column (the board scrolls)
      }
      const p = this.plan;
      b.style.setProperty('--sc', p.sc); b.style.setProperty('--cols', p.n); b.style.height = p.h ? p.h + 'px' : '';
    }
    markPast(st) {
      const cur = new Set();
      this.spec.rows.forEach(L => { if (L.grp && L.first === this.i) cur.add(L.grp); });
      ((st && st.ops) || []).forEach(o => { if (o.r) { const L = this.spec.rows.find(x => x.id === o.r); if (L && L.grp) cur.add(L.grp); } });
      Object.keys(this.box._g || {}).forEach(g => this.box._g[g].classList.toggle('past', !cur.has(g)));
    }
    fit() {
      if (this.spec.acc) return this.planAcc();
      const fs = this.el.classList.contains('sbt-fs'); const h = fs ? Math.max(260, this.area.clientHeight - 62) : Math.min(520, Math.max(300, Math.round((root.innerHeight || 800) * 0.62)));
      this.box.style.maxHeight = h + 'px';
      if (this.box.scrollWidth > this.box.clientWidth + 6) this.box.style.maxHeight = 'none';
    }
    columnLines() {
      this.svg.querySelectorAll('.sbt-colline').forEach(n => n.remove());
      if (this.spec.acc) {
        const kids = Array.from(this.box.children).filter(n => n.classList && n.classList.contains('sbt-grp')); if (kids.length < 2) return;
        const br = this.box.getBoundingClientRect(), ar = this.area.getBoundingClientRect(), gap = parseFloat(getComputedStyle(this.box).columnGap) || 38;
        const lefts = Array.from(new Set(kids.map(n => Math.round(n.getBoundingClientRect().left - br.left)))).sort((x, y) => x - y);
        for (let k = 1; k < lefts.length; k++) {
          const first = kids.find(n => Math.round(n.getBoundingClientRect().left - br.left) === lefts[k]), x = br.left - ar.left + this.area.scrollLeft + lefts[k] - gap / 2, y0 = br.top - ar.top, y1 = y0 + this.box.clientHeight;
          const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line'); ln.setAttribute('class', 'sbt-colline'); ln.setAttribute('x1', x); ln.setAttribute('x2', x); ln.setAttribute('y1', y0); ln.setAttribute('y2', y1); this.svg.appendChild(ln);
          const fl = first && first.querySelector('.sbt-line');
          if (fl && fl.classList.contains('hid') && !this.red() && ln.animate) { ln.animate([{ opacity: 0, strokeDashoffset: 60 }, { opacity: .8, strokeDashoffset: 0 }], { duration: 700, easing: 'ease-out' }); }
        }
        return;
      }
      const kids = Array.from(this.box.children).filter(n => n.classList && n.classList.contains('sbt-line')); if (kids.length < 2) return;
      const lefts = Array.from(new Set(kids.map(n => Math.round(n.offsetLeft)))).sort((a, b) => a - b); if (lefts.length < 2) return;
      const br = this.box.getBoundingClientRect(), ar = this.area.getBoundingClientRect(), gap = 22;
      for (let k = 1; k < lefts.length; k++) {
        const first = kids.find(n => Math.round(n.offsetLeft) === lefts[k]), x = br.left - ar.left + this.area.scrollLeft + lefts[k] - gap, y0 = br.top - ar.top, y1 = y0 + this.box.clientHeight;
        const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line'); ln.setAttribute('class', 'sbt-colline'); ln.setAttribute('x1', x); ln.setAttribute('x2', x); ln.setAttribute('y1', y0); ln.setAttribute('y2', y1); this.svg.appendChild(ln);
        if (first && first.classList.contains('hid') && !this.red() && ln.animate) { ln.animate([{ opacity: 0, strokeDashoffset: 60 }, { opacity: .8, strokeDashoffset: 0 }], { duration: 700, easing: 'ease-out' }); }
      }
    }
    // ---- helpers (called on the per-run context w) ----
    red() { return reduced() || this.speed === 'quick'; }
    chk() { if (this.run !== this.my) throw CANCEL; }
    async t(f) { this.chk(); if (!this.red()) await new Promise(r => setTimeout(r, SPEEDS[this.speed] * f)); this.chk(); }
    at(ref) {
      if (Array.isArray(ref)) return ref.map(r => this.at(r));
      const [r, c] = ref.split('.'); const row = this.R[r];
      const el = row && this.q(row, c);
      if (!el) throw new Error('vr: no target ' + ref);
      return el;
    }
    opTouches(o, r) {
      const row = x => typeof x === 'string' && x.split('.')[0] === r;
      return o.r === r || [].concat(o.at || []).some(row) || row(o.from) || row(o.to);
    }
    async runOps(ops, st) {
      let pr = null;
      // Practice: the learner writes the last line of a step that writes several; a step marked ask (one new line that follows from the line above) asks for that line
      if (this.mode === 'practice') { const ws = ops.filter(o => o.o === 'write'); if (ws.length >= 2 || (st && st.ask && ws.length === 1)) { const rs = this.spec.rows.find(x => x.id === ws[ws.length - 1].r); if (rs && !rs.viz) pr = rs.id; } }
      for (const o of ops) {
        if (pr && this.opTouches(o, pr)) { await this.ask(pr); pr = null; }
        try { await this.exec(o); } catch (e) {
          if (e === CANCEL || !this.spec.auto) throw e;   // generated specs degrade gracefully: skip a decoration that cannot be placed
          NS.skipped = (NS.skipped || 0) + 1; (NS.skipLog = NS.skipLog || []).length < 40 && NS.skipLog.push(String(e && e.message || e).slice(0, 90) + ' @' + o.o);
        }
      }
    }
    /* ---- Practice Mode: the learner writes the next line; a wrong try is never penalised ---- */
    expected(rowId) {
      const r = this.spec.rows.find(x => x.id === rowId); const keys = Object.keys(r.tex).map(Number).sort((a, b) => a - b);
      const k = keys.filter(x => x <= this.i).pop(); return r.tex[k === undefined ? keys[0] : k];
    }
    ask(rowId) {
      return new Promise(resolve => {
        this.self.pending = { rowId, resolve, tries: 0, my: this.my };
        const bar = this.el.querySelector('.sbt-practice'); bar.hidden = false;
        this.el.querySelector('.sbt-pq').textContent = 'Your turn: write the next line.';
        const inp = this.el.querySelector('.sbt-pin'); inp.value = ''; this.el.querySelector('.sbt-pmsg').textContent = '';
        try { inp.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
      });
    }
    hidePractice() { const b = this.el.querySelector('.sbt-practice'); if (b) b.hidden = true; if (this.pending) { const p = this.pending; this.pending = null; p.resolve(); } }
    practiceAct(act) {
      const p = this.pending; if (!p) return;
      const msg = this.el.querySelector('.sbt-pmsg'), inp = this.el.querySelector('.sbt-pin');
      const exp = this.expected(p.rowId), want = canon(exp);
      const done = txt => { msg.textContent = txt; this.pending = null; this.el.querySelector('.sbt-practice').hidden = true; p.resolve(); };
      if (act === 'pshow') return done('Here it is: ' + want.replace(/\*/g, '×'));
      if (act === 'phint') { const n = Math.max(2, Math.ceil(want.length * 0.4)); msg.textContent = 'Hint: it starts with ' + want.slice(0, n) + '…'; return; }
      const got = canon(inp.value);
      if (!got) { msg.textContent = 'Type your line first (for example 4x^2+1), or press Hint.'; return; }
      if (got === want || strip(got) === strip(want) || (NS.equiv && NS.equiv(inp.value, exp))) return done('✓ Correct. Watch how it is written.');
      p.tries++; msg.textContent = p.tries < 2 ? 'Not quite. Check signs, brackets and powers, then try again.' : 'Not quite yet. Press Hint or Show me when you want to see it.';
    }
    async exec(o) {
      switch (o.o) {
        case 'wait': return this.t(o.t);
        case 'write': return this.write(this.R[o.r]);
        case 'cls': { [].concat(this.at(o.at)).forEach(el => this.cls(el, o.c)); return; }
        case 'arrow': this.paths[o.id || '_'] = this.arrow(this.at(o.from), this.at(o.to), COLORS[o.color], o.opt || {}); return;
        case 'fly': return this.fly(o.label, this.paths[o.path], COLORS[o.color], 1);
        case 'move': { const p = this.arrow(this.at(o.from), this.at(o.to), COLORS[o.color], o.opt || {}); await this.t(0.5); return this.fly(o.label, p, COLORS[o.color], 1); }
        case 'par': return Promise.all(o.ops.map(x => this.exec(x)));
        case 'clear': return this.clearOverlay();
        case 'layer': { const row = this.R[o.r]; if (!row || !row._viz) return; return row._viz.animate(o.i, { dur: (SPEEDS[this.speed] || 1000) * (o.f || 1), red: this.red(), alive: () => this.run === this.my, cancel: CANCEL }); }
        case 'tex': { const row = this.R[o.r]; const t = typeof o.t === 'object' ? this.spec.rows.find(r => r.id === o.r).tex[o.t.k] : o.t; return this.setTex(row, t); }
        case 'hide': return [].concat(this.at(o.at)).forEach(el => { el.style.opacity = '0'; });
        case 'show': return [].concat(this.at(o.at)).forEach(el => { el.style.opacity = ''; });
        default: throw new Error('vr: unknown op ' + o.o);
      }
    }
    texAt(L, i) {
      if (L.view && L.view[i] !== undefined) return L.view[i];
      let best = null;
      Object.keys(L.tex).map(Number).forEach(k => { if (k < i && (best === null || k > best)) best = k; });
      if (best !== null) return L.tex[best];
      return L.pre || L.tex[i] || L.tex[Math.min.apply(null, Object.keys(L.tex).map(Number))];
    }
    /* an accumulating board puts the lines of one piece of work in a group that never splits across columns */
    place(d, L, into) {
      if (!this.spec.acc || !L.grp) { into.appendChild(d); return; }
      const G = into._g || (into._g = {}); let g = G[L.grp];
      if (!g) { g = document.createElement('div'); g.className = 'sbt-grp'; g.dataset.g = L.grp; into.appendChild(g); G[L.grp] = g; }
      g.appendChild(d);
    }
    row(L, t, hid, into) {
      into = into || this.box;
      const d = document.createElement('div');
      d.className = 'sbt-row sbt-line' + (hid ? ' hid' : '') + (L.final && !hid ? ' final' : '') + (L.arcsFrom != null && this.i >= L.arcsFrom ? ' arcs' : '') + (this.spec.acc && L.grp ? (L.work ? ' work' : ' state') : '');
      d.dataset.final = L.final ? '1' : ''; d.dataset.plain = t;
      if (L.viz && NS.viz && NS.viz[L.viz.kind]) {
        d.classList.add('vizrow'); d.innerHTML = `<div class="sbt-eq sbt-viz"></div><div class="sbt-note">${L.note || ''}</div>`;
        const holder = d.firstChild; d._viz = NS.viz[L.viz.kind](holder, L.viz, { step: this.i });
        holder.setAttribute('role', 'img'); holder.setAttribute('aria-label', L.viz.alt || 'Diagram');
        this.place(d, L, into); return d;
      }
      d.innerHTML = `<div class="sbt-eq" role="img" aria-label="${esc(speak(t))}">${tex(t)}</div><div class="sbt-note">${L.note || ''}</div>`;
      d.querySelectorAll('.katex').forEach(k => k.setAttribute('aria-hidden', 'true'));
      this.place(d, L, into); return d;
    }
    setTex(row, t) {
      const eq = row.querySelector('.sbt-eq'); eq.innerHTML = tex(t); eq.setAttribute('aria-label', speak(t)); eq.querySelectorAll('.katex').forEach(k => k.setAttribute('aria-hidden', 'true'));
      if (eq.querySelector('.katex-error') && row.dataset.plain) eq.innerHTML = tex(row.dataset.plain);   // a tagged variant that KaTeX rejects falls back to the plain row
    }
    write(row) {
      this.chk(); row.classList.remove('hid'); if (row.dataset.final) row.classList.add('final');
      // a board too tall for its columns (a phone, or nothing fitted) scrolls to the line just written
      if (this.spec.acc && this.plan && !this.plan.h && row.scrollIntoView) { try { row.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: this.red() ? 'auto' : 'smooth' }); } catch (e) { /* the line stays where it is */ } }
      if (!this.red() && row.animate) row.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: SPEEDS[this.speed] * 0.4, easing: 'steps(16,end)' });
    }
    lines(spec) {
      return spec.map(s => {
        const d = document.createElement('div');
        d.className = 'sbt-line' + (s.hide ? ' hid' : '') + (s.muted ? ' muted' : '') + (s.final && !s.hide ? ' final' : '');
        d.dataset.final = s.final ? '1' : '';
        d.innerHTML = tex(s.t); this.box.appendChild(d); return d;
      });
    }
    cols(spec) {
      const g = document.createElement('div'); g.className = 'sbt-cols'; this.box.appendChild(g);
      return spec.map(([h, rows]) => {
        const c = document.createElement('div'); c.className = 'sbt-col'; c.innerHTML = `<h4>${h}</h4>`; g.appendChild(c);
        return rows.map(t => { const d = document.createElement('div'); d.className = 'sbt-line hid'; d.innerHTML = tex(t); c.appendChild(d); return d; });
      });
    }
    show(l) { l.classList.remove('hid'); if (l.dataset.final) l.classList.add('final'); }
    q(line, cls) { return line.querySelector('.' + cls); }
    cls(el, c) {
      if (!el) return;
      const tall = el.offsetHeight > 1.75 * (parseFloat(getComputedStyle(el).fontSize) || 25);   // tall parts (fractions) zoom less so they never cover the rows around them
      c.split(' ').forEach(k => { if (k === 'zoom' && tall) k = 'zoom-s'; el.classList.remove(k); void el.offsetWidth; el.classList.add(k); });
    }
    mark(el, c) { this.cls(el, c); }
    rel(el) {
      const r = el.getBoundingClientRect(), a = this.area.getBoundingClientRect();
      return { x: r.left - a.left + this.area.scrollLeft, y: r.top - a.top, w: r.width, h: r.height };
    }
    pt(el, where) { const r = this.rel(el); return { x: r.x + r.w / 2, y: where === 'top' ? r.y : where === 'bottom' ? r.y + r.h : r.y + r.h / 2 }; }
    clearOverlay() { this.svg.querySelectorAll('path,marker').forEach(n => n.remove()); }
    arrow(a, b, color, o = {}) {
      const s = this.pt(a, o.from), d = this.pt(b, o.to);
      const bend = o.bend == null ? 60 : o.bend;
      const c = { x: 0, y: 0 };
      if (o.from === 'top' && !o.side) { c.x = (s.x + d.x) / 2; c.y = Math.min(s.y, d.y) + bend; }
      else { c.x = (s.x + d.x) / 2 + Math.abs(bend); c.y = (s.y + d.y) / 2; }
      const P = t => ({ x: (1 - t) * (1 - t) * s.x + 2 * (1 - t) * t * c.x + t * t * d.x, y: (1 - t) * (1 - t) * s.y + 2 * (1 - t) * t * c.y + t * t * d.y });
      const ns = 'http://www.w3.org/2000/svg', mid = `${this.id}-${color.slice(1)}`;
      if (!this.svg.querySelector('#' + mid)) {
        const m = document.createElementNS(ns, 'marker');
        m.setAttribute('id', mid); m.setAttribute('viewBox', '0 0 10 10'); m.setAttribute('refX', '8'); m.setAttribute('refY', '5');
        m.setAttribute('markerWidth', '7'); m.setAttribute('markerHeight', '7'); m.setAttribute('orient', 'auto-start-reverse');
        m.innerHTML = `<path d="M0 0L10 5L0 10z" fill="${color}"/>`; this.svg.querySelector('defs').appendChild(m);
      }
      const p = document.createElementNS(ns, 'path');
      p.setAttribute('d', `M${s.x} ${s.y} Q${c.x} ${c.y} ${d.x} ${d.y}`); p.setAttribute('fill', 'none');
      p.setAttribute('stroke', color); p.setAttribute('stroke-width', '2.5'); p.setAttribute('stroke-linecap', 'round');
      p.setAttribute('pathLength', '1'); this.svg.appendChild(p);
      const done = () => p.setAttribute('marker-end', `url(#${mid})`);
      if (this.red()) done();
      else {
        p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1';
        const an = p.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: SPEEDS[this.speed] * 0.5, fill: 'forwards', easing: 'ease-in-out' });
        an.onfinish = done;
      }
      return { P };
    }
    async fly(label, path, color, f) {
      this.chk();
      if (this.red()) return;
      const chip = document.createElement('div'); chip.className = 'sbt-chip'; chip.style.background = color; chip.textContent = label;
      this.area.appendChild(chip);
      const w = chip.offsetWidth, h = chip.offsetHeight, dur = SPEEDS[this.speed] * f;
      await new Promise((res, rej) => {
        const t0 = performance.now();
        const frame = now => {
          if (this.run !== this.my) { chip.remove(); return rej(CANCEL); }
          const u = Math.min(1, (now - t0) / dur), e = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2, p = path.P(e);
          chip.style.transform = `translate(${p.x - w / 2}px,${p.y - h / 2}px) scale(${1 + .15 * Math.sin(Math.PI * e)})`;
          if (u < 1) setTimeout(() => frame(performance.now()), 16); else res();
        };
        frame(t0);
      });
      chip.remove();
    }
    tip(el, text, color, side) {
      if (!el) return;
      const r = this.rel(el), b = document.createElement('div');
      b.className = 'sbt-bubble'; b.style.background = color; b.textContent = text;
      if (side === 'right') { b.style.transform = 'translate(0,-50%)'; b.style.animation = 'none'; b.style.left = (r.x + r.w + 12) + 'px'; b.style.top = (r.y + r.h / 2) + 'px'; }
      else { b.style.left = (r.x + r.w / 2) + 'px'; b.style.top = (r.y - 4) + 'px'; }
      this.area.appendChild(b);
    }
    underline(line, color) {
      const k = line.querySelector('.katex'); if (!k || this.red()) return;
      const r = this.rel(k), u = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      u.setAttribute('d', `M${r.x} ${r.y + r.h + 2} Q${r.x + r.w / 2} ${r.y + r.h + 7} ${r.x + r.w} ${r.y + r.h + 2}`);
      u.setAttribute('fill', 'none'); u.setAttribute('stroke', color); u.setAttribute('stroke-width', '2.5'); u.setAttribute('stroke-linecap', 'round');
      u.setAttribute('pathLength', '1'); u.style.strokeDasharray = '1'; this.svg.appendChild(u);
      u.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: SPEEDS[this.speed] * 0.4, fill: 'forwards' });
    }
  }

  // Mounted automatically when the host (rendered inside the question's worked answer) first becomes visible.
  function mount(host) {
    if (host._t) return true;
    if (!root.katex) return false;
    const spec = SPECS[host.dataset.vr]; if (!spec) return false;   // spec not registered yet: stay pending
    const t0 = performance.now(); host._t = new Tutor(host, spec); live.add(host._t);
    (NS.perf = NS.perf || { go: [] }).mount = (NS.perf.mount || []).concat(Math.round(performance.now() - t0)).slice(-100);
    return true;
  }
  // Hosts wait in `pending` until they are on screen (checked on scroll, click and after render); no polling timers.
  const pending = new Set(); const live = new Set();
  let q = 0;
  function check() {
    pending.forEach(h => {
      if (!h.isConnected) return pending.delete(h);
      const r = h.getBoundingClientRect();
      if (r.width > 0 && r.bottom > 0 && r.top < (root.innerHeight || 800)) { if (mount(h)) pending.delete(h); }
    });
  }
  function watch() {
    live.forEach(t => {
      if (!t.el.isConnected) return live.delete(t);
      const r = t.el.getBoundingClientRect(), off = r.bottom < 0 || r.top > (root.innerHeight || 800);
      if (off && t.busy && !t.paused) { t.paused = true; t.run++; t.busy = false; }          // off screen: stop animating (no hidden work)
      else if (!off && t.paused) { t.paused = false; t.go(t.i); }                              // back in view: replay the step
    });
  }
  document.addEventListener('sbvr-last', e => {
    let n = e.target, a = null;
    for (let i = 0; i < 8 && n && !a; i++, n = n.parentElement) a = n.querySelector && n.querySelector('[data-example-answer]');
    if (a) a.style.display = '';
  });
  let q2 = 0;
  const later = () => { watch(); if (!pending.size) return; clearTimeout(q); clearTimeout(q2); q = setTimeout(check, 120); q2 = setTimeout(check, 700); };   // 2nd pass: accordions open after the click
  const io = 'IntersectionObserver' in root ? new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) later(); }, { threshold: 0 }) : null;
  root.addEventListener('scroll', later, { capture: true, passive: true });
  root.addEventListener('click', later, true);
  root.addEventListener('resize', later);
  function scan(n) {
    if (!n || n.nodeType !== 1) return;
    const hosts = n.matches && n.matches('[data-sbt-host]') ? [n] : (n.querySelectorAll ? n.querySelectorAll('[data-sbt-host]') : []);
    hosts.forEach(h => { if (!h._t && !h._w) { h._w = 1; pending.add(h); if (io) io.observe(h); } });
    later();
  }
  scan(document.body);
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(scan))).observe(document.documentElement, { childList: true, subtree: true });
})(window);
