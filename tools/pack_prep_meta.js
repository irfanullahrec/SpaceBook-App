#!/usr/bin/env node
/* Writes app/src/main/assets/prep_tests.json: the competitive tests a student can prepare for (PST, CT, SST ...), taken from
 * COMPETITIVE_TESTS_DATA in the website's js/app.js:  [{id, title, fullName, scale, emoji, color}, ...]
 *   node tools/pack_prep_meta.js [path to SpaceBook Web/js/app.js] */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SRC = process.argv[2] || 'D:/SpaceBook/SpaceBook Web/js/app.js';
const OUT = path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'prep_tests.json');
const text = fs.readFileSync(SRC, 'utf8');
const start = text.indexOf('const COMPETITIVE_TESTS_DATA = [');
if (start < 0) throw new Error('COMPETITIVE_TESTS_DATA not found in ' + SRC);
const end = text.indexOf('\n];', start);
const data = vm.runInNewContext('(' + text.slice(start + 'const COMPETITIVE_TESTS_DATA ='.length, end + 2) + ')', {});
const tests = data.map(t => ({ id: t.id, title: t.title, fullName: t.fullName || '', scale: t.scale || '', emoji: t.emoji || '📝', color: t.color || '#5b4bff' }));
fs.writeFileSync(OUT, JSON.stringify(tests));
console.log(`${tests.length} tests -> ${OUT}`);
tests.forEach(t => console.log('  ', t.id.padEnd(20), t.title.padEnd(12), t.fullName));
