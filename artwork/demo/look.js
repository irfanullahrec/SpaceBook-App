const P = require('./phone');
(async () => {
  const args = process.argv.slice(2);
  for (const a of args) { if (a.startsWith('key:')) { P.requireApp('key'); P.key(a.slice(4)); await P.sleep(1200); } if (a.startsWith('tap:')) { const [x,y]=a.slice(4).split(','); P.tap(+x,+y); await P.sleep(1500);} }
  const n = P.dump();
  for (const x of n) if (x.text || x.desc) console.log(`${x.clickable?'*':' '} [${x.l},${x.t},${x.r},${x.b}] ${x.text}${x.desc?' | '+x.desc:''}`);
})().catch(e => { console.error(e.message); process.exit(1); });
