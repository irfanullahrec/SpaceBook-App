'use strict';
/* Puts back what prep.js changed (Do Not Disturb, show touches, screen timeout, demo status bar). */
const fs = require('fs');
const path = require('path');
const P = require('./phone');
const saved = path.join(__dirname, 'prep_saved.json');
const s = JSON.parse(fs.readFileSync(saved, 'utf8'));
const put = (ns, k, v) => { if (v && v !== 'null') P.sh('settings', 'put', ns, k, v); else P.sh('settings', 'delete', ns, k); };
put('system', 'show_touches', s.show_touches);
put('system', 'screen_off_timeout', s.screen_off_timeout);
put('global', 'zen_mode', s.zen_mode);
try { P.sh('cmd', 'notification', 'set_dnd', s.zen_mode === '0' || s.zen_mode === 'null' ? 'off' : 'priority'); } catch (e) { /* the setting above is enough */ }
P.sh('svc', 'power', 'stayon', s.stay_on && s.stay_on !== '0' && s.stay_on !== 'null' ? 'true' : 'false');
try { P.sh('am', 'broadcast', '-a', 'com.android.systemui.demo', '-e', 'command', 'exit'); P.sh('settings', 'put', 'global', 'sysui_demo_allowed', '0'); } catch (e) { /* none */ }
fs.renameSync(saved, saved + '.restored');
console.log('restored:', JSON.stringify(s));
