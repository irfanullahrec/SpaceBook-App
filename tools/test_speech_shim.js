#!/usr/bin/env node
/* Checks the speechSynthesis stand-in of assets/reader_bridge.js without a phone: the shim is cut out of the file and run against
 * a fake window whose SBHost records what the app would be asked to say.  node tools/test_speech_shim.js */
'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const src = fs.readFileSync(path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'reader_bridge.js'), 'utf8');
const a = src.indexOf('(function speechShim() {');
const b = src.indexOf('})();', a) + '})();'.length;
assert(a > 0 && b > a, 'shim not found');

const spoken = [], stopped = [];
const window = { SBHost: { speak: (id, text, lang, rate) => spoken.push({ id, text, lang, rate }), stopSpeech: x => stopped.push(x) } };
new Function('window', src.slice(a, b))(window);

const synth = window.speechSynthesis;
assert(synth && synth.__sb, 'speechSynthesis replaced');
assert.deepStrictEqual(synth.getVoices().map(v => v.lang), ['en-US', 'ur-PK']);

// the page's own steps: pick a voice by language, make an utterance, speak
const voice = synth.getVoices().find(v => v.lang.toLowerCase().startsWith('ur'));
const u = new window.SpeechSynthesisUtterance('پہلا قدم');
u.voice = voice; u.lang = voice.lang; u.rate = 0.92;
let ended = 0, failed = 0;
u.onend = () => ended++; u.onerror = () => failed++;
synth.speak(u);
assert.strictEqual(spoken.length, 1);
assert.deepStrictEqual({ lang: spoken[0].lang, rate: spoken[0].rate, text: spoken[0].text }, { lang: 'ur', rate: 0.92, text: 'پہلا قدم' });
assert.strictEqual(synth.speaking, true);
window.SBSpeechDone(spoken[0].id, true);
assert.deepStrictEqual([ended, failed, synth.speaking], [1, 0, false]);

// an English line, then cancelled: no end event arrives for it and the app is told to stop
const e = new window.SpeechSynthesisUtterance('First, subtract'); e.onend = () => ended++;
synth.speak(e);
assert.strictEqual(spoken[1].lang, 'en');
synth.cancel();
window.SBSpeechDone(spoken[1].id, true);
assert.deepStrictEqual([ended, stopped.length, synth.speaking], [1, 1, false]);

// a failure (no voice on the phone) reaches onerror
const f = new window.SpeechSynthesisUtterance('x'); f.onerror = () => failed++;
synth.speak(f);
window.SBSpeechDone(spoken[2].id, false);
assert.strictEqual(failed, 1);

// not in the app (no SBHost.speak): nothing is replaced
const plain = { SBHost: {}, speechSynthesis: { native: true } };
new Function('window', src.slice(a, b))(plain);
assert.strictEqual(plain.speechSynthesis.native, true);
console.log('speech shim ok');
