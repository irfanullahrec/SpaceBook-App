'use strict';
/* Gets the phone ready for the recording and writes the settings it changes to prep_saved.json, so restore.js can put them back.
 *   node artwork/demo/prep.js        node artwork/demo/restore.js */
const fs = require('fs');
const path = require('path');
const P = require('./phone');
const saved = path.join(__dirname, 'prep_saved.json');

(async () => {
  const get = (ns, k) => P.sh('settings', 'get', ns, k).trim();
  if (!fs.existsSync(saved)) {
    fs.writeFileSync(saved, JSON.stringify({
      zen_mode: get('global', 'zen_mode'), show_touches: get('system', 'show_touches'), screen_off_timeout: get('system', 'screen_off_timeout'),
      stay_on: get('global', 'stay_on_while_plugged_in'), pointer_location: get('system', 'pointer_location'),
    }, null, 1));
  }
  console.log('saved:', fs.readFileSync(saved, 'utf8').replace(/\s+/g, ' '));
  P.sh('settings', 'put', 'system', 'show_touches', '1');
  P.sh('settings', 'put', 'system', 'screen_off_timeout', '1800000');
  P.sh('svc', 'power', 'stayon', 'true');
  try { P.sh('cmd', 'notification', 'set_dnd', 'alarms'); } catch (e) { P.sh('settings', 'put', 'global', 'zen_mode', '3'); }
  console.log('zen_mode now', get('global', 'zen_mode'));
  // the status bar: a clean clock and battery, no notification icons (works on many phones; if not, the video crops the bar)
  try {
    P.sh('settings', 'put', 'global', 'sysui_demo_allowed', '1');
    const demo = (...a) => P.sh('am', 'broadcast', '-a', 'com.android.systemui.demo', ...a);
    demo('-e', 'command', 'enter');
    demo('-e', 'command', 'clock', '-e', 'hhmm', '1000');
    demo('-e', 'command', 'battery', '-e', 'level', '100', '-e', 'plugged', 'false');
    demo('-e', 'command', 'notifications', '-e', 'visible', 'false');
    console.log('demo status bar sent');
  } catch (e) { console.log('demo mode not available:', e.message.slice(0, 80)); }
  P.sh('am', 'start', '-n', P.PKG + '/.MainActivity');
  await P.sleep(2500);
  console.log('focus:', P.focus().slice(0, 100));
})().catch(e => { console.error(e.message); process.exit(1); });
