#!/usr/bin/env node
/* Makes a new unlock code for the expiry lock of the app and writes only its salted hash to app/unlock.properties.
 *   node tools/make_unlock.js            -> prints the code ONCE; keep it somewhere safe, it is not stored anywhere else
 *   node tools/make_unlock.js --check SB-XXXX-XXXX-XXXX-XXXX   -> says whether a code matches the current hash
 * The code is 16 letters and digits (80 bits); the app keeps PBKDF2-HMAC-SHA256 of it with a random salt, so the code cannot be
 * read back from the app or this repository. A new build with a new hash no longer accepts the old code. */
'use strict';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'app', 'unlock.properties');
const ITERATIONS = 60000;
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';        // no 0/O/1/I, easy to read out over the phone
const normalize = c => c.toUpperCase().replace(/[^A-Z0-9]/g, '');
const derive = (code, salt, iterations) => crypto.pbkdf2Sync(Buffer.from(normalize(code), 'utf8'), salt, iterations, 32, 'sha256');

if (process.argv[2] === '--check') {
  const props = Object.fromEntries(fs.readFileSync(FILE, 'utf8').split(/\r?\n/).filter(l => l && !l.startsWith('#')).map(l => l.split('=')));
  const ok = derive(process.argv[3] || '', Buffer.from(props.salt, 'hex'), +props.iterations).toString('hex') === props.hash;
  console.log(ok ? 'matches' : 'does not match');
  process.exit(ok ? 0 : 1);
}

let raw = '';
for (const b of crypto.randomBytes(16)) raw += ALPHABET[b % ALPHABET.length];
const code = 'SB-' + raw.match(/.{4}/g).join('-');
const salt = crypto.randomBytes(16);
const hash = derive(code, salt, ITERATIONS);
fs.writeFileSync(FILE, `# Written by tools/make_unlock.js. Only a salted hash: the code itself is not here.\nsalt=${salt.toString('hex')}\niterations=${ITERATIONS}\nhash=${hash.toString('hex')}\n`);
console.log('New unlock code (shown once):  ' + code);
console.log('Wrote ' + FILE);
