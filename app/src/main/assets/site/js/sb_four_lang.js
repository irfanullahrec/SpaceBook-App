/* sb_four_lang.js — every sentence translation shows FOUR languages, each on its own line:
 * English, اردو, پښتو and العربية (the sentence's own language is one of them).
 * The class-5..8 and Class 11 Maths readers build their translation panels with English/Urdu/Pashto only; this adds
 * the Arabic line the first time a panel is opened. Arabic comes from the book's own lexicon where possible, from
 * the saved translation cache otherwise, from the internet when connected (then saved for offline use), and as a
 * word-by-word meaning when neither exists. Qur'anic text is never translated. Loaded after sb_trilingual.js. */
(function () {
  'use strict';
  const PANELS = '.m5-tr, .m6-tr, .m7-tr, .m8-tr, .m11-tr';
  const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
  const quranic = t => !!(window.SBTranslate && window.SBTranslate.isQuranic && window.SBTranslate.isQuranic(t));

  function addArabic(panel) {
    if (panel.dataset.sbAr) return;
    const en = panel.querySelector('[lang="en"]'), ur = panel.querySelector('[lang="ur"]'), ps = panel.querySelector('[lang="ps"]');
    if (!en && !ur) return;
    panel.dataset.sbAr = '1';
    const p = document.createElement('p');
    p.className = (en ? en.className.replace(/\b(m\d+)-en\b/, '$1-ar') : '') + ' sb-ar-line';
    p.setAttribute('lang', 'ar'); p.setAttribute('dir', 'rtl');
    const tag = document.createElement('span'); tag.className = (ur && ur.querySelector('[class$="-lang"]') || {}).className || 'sb-ar-tag'; tag.textContent = 'العربية';
    const body = document.createElement('span'); body.className = 'sb-ar-text'; body.textContent = '…';
    p.append(tag, document.createTextNode(' '), body);
    (ps || ur || en).after(p);
    const clone = el => { const c = el.cloneNode(true); c.querySelectorAll('.katex-html, .m5-lang, .m6-lang, .m7-lang, .m8-lang, .m11-lang').forEach(x => x.remove()); return norm(c.textContent); };
    const enText = en ? clone(en) : '', urText = ur ? clone(ur) : '';
    const from = enText && /[A-Za-z]{2}/.test(enText) ? 'en' : 'ur';
    const text = from === 'en' ? enText : urText;
    if (!text || quranic(text) || !window.SBTranslate) { body.textContent = text || ''; return; }
    window.SBTranslate.translate(text, from, 'ar', true).then(r => {
      body.textContent = r && r.text ? (r.source === 'gloss' ? '≈ ' + r.text + ' (word by word)' : r.source === 'machine' ? '≈ ' + r.text : r.text)
        : 'No stored translation for this sentence yet.';
    }, () => { body.textContent = 'No stored translation for this sentence yet.'; });
  }
  function scan() {
    document.querySelectorAll(PANELS).forEach(p => { if (!p.hidden) addArabic(p); });
  }
  let timer = 0;
  const later = () => { if (!timer) timer = setTimeout(() => { timer = 0; scan(); }, 30); };
  function start() {
    const s = document.createElement('style');
    s.textContent = '.sb-ar-line{direction:rtl;text-align:right;font-family:"Noto Naskh Arabic","Jameel Noori Nastaleeq",serif;font-size:1.08em}.sb-ar-line .sb-ar-tag{font:700 .7rem system-ui,sans-serif;color:#166534;background:#dcfce7;border-radius:4px;padding:.05rem .4rem}';
    document.head.appendChild(s);
    new MutationObserver(later).observe(document.body, {attributes: true, attributeFilter: ['hidden'], subtree: true, childList: true});
    scan();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
