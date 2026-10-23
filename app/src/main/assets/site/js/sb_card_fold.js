/* sb_card_fold.js — every activity card of the books ("⌨️ Type the answer", "🎯 Choose the right word", "🔗 Match them", "🌟 Let's do it!" …) starts folded.
 * The card is hidden and a small pill with the card's own title sits next to the question's Ans button; pressing the pill opens the card, pressing it again
 * folds it. The cards come from js/cls1_eng_play.js (every Class 1 and 2 subject) and js/cls1_eng_activities.js (the writing cards); this file does not
 * build or change them, it only hides and reveals. A card that is part of a group (.c1a-group) is folded with its group. Works in the app's page too. */
(function () {
  'use strict';
  const CSS = `
  .sb-fold-pill{display:inline-flex;align-items:center;gap:.3em;max-width:100%;margin:.2em .35em;padding:.18em .75em;border:1px solid #d97706;border-radius:999px;background:#fbbf24;color:#451a03;font:800 .78em/1.25 system-ui,sans-serif;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.18);vertical-align:middle;text-align:start}
  .sb-fold-pill:hover,.sb-fold-pill:focus-visible{background:#f59e0b;outline:2px solid #92400e;outline-offset:1px}
  .sb-fold-pill[aria-expanded="true"]{background:#fef3c7}
  .sb-fold-pill::after{content:"▾";font-size:.9em}
  .sb-fold-pill[aria-expanded="true"]::after{content:"▴"}
  .sb-fold-row{display:block;margin:.15rem 0}`;
  let uid = 0;
  function addCss() { if (document.getElementById('sb-fold-css')) return; const s = document.createElement('style'); s.id = 'sb-fold-css'; s.textContent = CSS; document.head.appendChild(s); }

  function titleOf(el) {
    const own = el.matches('.c1a-card') ? el.querySelector(':scope > .c1a-h') : null;
    const first = own || el.querySelector('.c1a-card > .c1a-h');
    const t = first ? first.textContent.replace(/\s+/g, ' ').trim() : '';
    return el.matches('.c1a-group') ? "🌟 Let's do it!" : (t || "🌟 Let's do it!");
  }
  function fold(card) {
    card.dataset.sbfold = '1';
    const id = card.id || (card.id = 'sbfold' + (++uid));
    const pill = document.createElement('button');
    pill.type = 'button'; pill.className = 'sb-fold-pill'; pill.textContent = titleOf(card);
    pill.setAttribute('aria-expanded', 'false'); pill.setAttribute('aria-controls', id);
    card.style.display = 'none';
    pill.addEventListener('click', e => {
      e.stopPropagation(); e.preventDefault();
      const open = card.style.display === 'none';
      card.style.display = open ? '' : 'none';
      pill.setAttribute('aria-expanded', String(open));
      if (open && card.scrollIntoView) { try { card.scrollIntoView({block: 'nearest', behavior: 'smooth'}); } catch (err) { /* old webview */ } }
    });
    // next to the Ans button of the question or part the card belongs to; else in a row of its own just before the card
    const item = card.previousElementSibling;
    if (item && item.matches('.m6-q, .m6-part, .m6-s')) {
      const ans = item.querySelector(':scope > .sb-ans, :scope > .m6-s .sb-ans');
      if (ans) ans.after(pill); else item.appendChild(pill);
    } else {
      const row = document.createElement('div'); row.className = 'sb-fold-row'; row.appendChild(pill);
      card.before(row);
    }
  }
  function scan() {
    document.querySelectorAll('.c1a-card:not([data-sbfold]), .c1a-group:not([data-sbfold])').forEach(el => {
      if (el.closest('[data-sbfold]') && !el.matches('[data-sbfold]')) { el.dataset.sbfold = 'in'; return; }   // inside a card or group that is already folded
      if (el.matches('.c1a-card') && el.closest('.c1a-group')) { el.dataset.sbfold = 'in'; return; }           // the group is folded as one
      addCss();
      fold(el);
    });
  }
  window.SBCardFold = {scan};
  let timer = 0;
  const obs = new MutationObserver(() => { if (!timer) timer = setTimeout(() => { timer = 0; scan(); }, 60); });
  const start = () => { addCss(); scan(); obs.observe(document.body, {childList: true, subtree: true}); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
