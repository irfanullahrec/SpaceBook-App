/* sb_sentkey.js — the key under which a sentence's stored translation is filed (js/sent_data_N.js).
 * The same text must give the same key in the build (tools/offline_meanings/build_sentences.js) and in the page, so this one file is used by both.
 *   SBSentKey.key('Air is a mixture of gases.')  -> '1j3k8x0q2f7'   (base 36, 53-bit hash of the letters and digits only, lower case)
 *   SBSentKey.shard(key)                          -> 0..15          (which file holds it)
 *   SBSentKey.split(text)                         -> the sentences of a longer text
 * Punctuation, quote shapes, capital letters and spacing do not matter: "Don't  STOP." and "don’t stop" are one sentence. */
(function (root) {
  'use strict';
  const norm = s => String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]/g, '');
  function hash53(str) {                      // cyrb53
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }
  const SHARDS = 16;
  const api = {
    SHARDS,
    norm,
    key: text => { const n = norm(text); return n ? hash53(n).toString(36) : ''; },
    shard: key => parseInt(key.slice(-2), 36) % SHARDS,
    split: text => String(text || '').replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+(?=[A-Z"'(\[])/).filter(Boolean)
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SBSentKey = api;
})(typeof window !== 'undefined' ? window : this);
