/* SBTTS (Phase 4): read-aloud with the voices installed on the device, nothing else. No audio is requested from any website, so it
 * works offline and the text never leaves the device.
 *
 *   SBTTS.hasVoice('ur')            is there at least one voice for the language (primary tag: en, ur, ps, ar)
 *   SBTTS.pickVoice('ur', 'female') the best voice for the language; the gender is a hint taken from the voice name, never a requirement
 *   SBTTS.toast(message)            a short status message (role=status)
 *
 * When the device has no voice for a language the buttons that would read it are hidden: <html> gets the class sb-no-voice-<lang>
 * (css/tts.css hides them). Voices load asynchronously, so nothing is hidden until the first list has arrived or 2.5 s have passed. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  else root.SBTTS = factory(root);
})(typeof self !== 'undefined' ? self : this, function (win) {
  'use strict';
  const LANGS = ['en', 'ur', 'ps', 'ar'];
  const doc = win.document;
  const synth = win.speechSynthesis;
  let settled = false, toastEl = null;

  const primary = tag => String(tag || '').toLowerCase().split(/[-_]/)[0];
  const voices = () => { try { return synth && synth.getVoices ? (synth.getVoices() || []) : []; } catch (e) { return []; } };
  const forLang = lang => voices().filter(v => primary(v.lang) === primary(lang));
  const hasVoice = lang => forLang(lang).length > 0;

  const MALE = /\b(male|david|mark|george|james|daniel|ravi|asad|guy|ryan|alex|fred)\b/i;
  const FEMALE = /\b(female|zira|heera|hazel|susan|samantha|salma|uzma|sara|aria|jenny|karen|tessa|victoria)\b/i;
  function pickVoice(lang, gender) {
    const list = forLang(lang);
    if (!list.length) return null;
    const hint = gender === 'male' ? MALE : gender === 'female' ? FEMALE : null;
    const byName = hint ? list.filter(v => hint.test(v.name || '')) : [];
    const pool = byName.length ? byName : list;
    return pool.find(v => v.localService) || pool[0];        // a local voice works offline; a network voice may not
  }

  function refresh() {
    if (!doc) return;
    const html = doc.documentElement, list = voices();
    LANGS.forEach(l => html.classList.toggle('sb-no-voice-' + l, (settled || list.length > 0 || !synth) && !list.some(v => primary(v.lang) === l)));
  }

  function toast(message) {
    if (!doc) return;
    if (!toastEl) {
      toastEl = doc.createElement('div'); toastEl.className = 'sb-tts-toast'; toastEl.setAttribute('role', 'status');
      doc.body.appendChild(toastEl);
    }
    toastEl.textContent = message; toastEl.hidden = false;
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => { if (toastEl) toastEl.hidden = true; }, 3500);
  }

  function init() {
    if (!doc) return;
    if (synth && synth.addEventListener) synth.addEventListener('voiceschanged', refresh);
    refresh();
    setTimeout(() => { settled = true; refresh(); }, 2500);
  }

  const api = { hasVoice, pickVoice, toast, refresh, init, voices };
  if (win === (typeof self !== 'undefined' ? self : null) && doc) init();
  return api;
});
