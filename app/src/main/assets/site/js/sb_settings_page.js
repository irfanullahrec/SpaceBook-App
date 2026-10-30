/* sb_settings_page.js - the sidebar "Settings" page (design 36): reading text size (the reader's own setting), the books kept on this device
 * and the way into the downloads page. It only reads and writes what the reader and SBOffline already keep. */
(function () {
  'use strict';
  if (typeof document === 'undefined') return;
  const SIZES = [0.9, 1, 1.15, 1.3, 1.5], NAMES = ['Smaller', 'Normal', 'Large', 'Extra Large', 'Largest'];
  const get = () => { try { const v = JSON.parse(localStorage.getItem('sbRT:size')); return SIZES.indexOf(v) >= 0 ? v : 1; } catch (e) { return 1; } };
  const put = v => { try { localStorage.setItem('sbRT:size', JSON.stringify(v)); } catch (e) { /* private mode */ } };
  const mb = n => (n / 1e6 >= 10 ? Math.round(n / 1e6) : Math.round(n / 1e5) / 10) + ' MB';
  const ic = (d, c) => '<span class="sbset-ic" style="--c:' + c + '"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg></span>';

  async function open() {
    ['subpage-nav-bar', 'dash-header'].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    const host = document.getElementById('dashboard-body'); if (!host) return;
    let usage = null, have = 0;
    try { if (window.SBOffline) { usage = await window.SBOffline.usage(); have = Object.keys(await window.SBOffline.downloaded()).length; } } catch (e) { /* no storage figures */ }
    const cur = SIZES.indexOf(get());
    host.innerHTML = '<section class="sbset"><header class="sbset-head">' + ic('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>', '#1d6fe8') +
      '<div><h1>Reading &amp; Offline Settings</h1><p>Customize your reading experience and manage the books kept on this device.</p></div></header>' +
      '<div class="sbset-cols"><section class="sbset-card"><h2>' + ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>', '#1d6fe8') + 'Display &amp; Reading</h2><p>Choose the text size used when you read books.</p>' +
      '<div class="sbset-sizes" role="radiogroup" aria-label="Text size">' + SIZES.map((v, i) => '<button type="button" role="radio" aria-checked="' + (i === cur) + '" class="' + (i === cur ? 'on' : '') + '" data-i="' + i + '"><b style="font-size:' + (0.9 + i * 0.18) + 'rem">A</b><small>' + NAMES[i] + '</small></button>').join('') + '</div>' +
      '<div class="sbset-preview" id="sbsetPrev" style="font-size:' + SIZES[cur] + 'rem"><b>Sample Text Preview</b><p>Plants are very important for our life. They give us fresh air, food and shelter. Plants also help to keep our environment clean and healthy.</p></div></section>' +
      '<section class="sbset-card"><h2>' + ic('<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>', '#12a05c') + 'Offline Downloads</h2><p>Books kept on this device open without internet.</p>' +
      '<div class="sbset-row"><span>Subjects on this device</span><b>' + have + '</b></div>' +
      '<div class="sbset-row"><span>Storage used by SpaceBook</span><b>' + (usage && usage.usage != null ? mb(usage.usage) + (usage.quota ? ' of ' + mb(usage.quota) : '') : 'not available') + '</b></div>' +
      '<button type="button" class="sbset-go" id="sbsetOff">Manage downloads</button></section></div></section>';
    host.querySelectorAll('.sbset-sizes button').forEach(b => b.addEventListener('click', () => {
      const i = Number(b.dataset.i); put(SIZES[i]);
      host.querySelectorAll('.sbset-sizes button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', String(x === b)); });
      const pv = host.querySelector('#sbsetPrev'); if (pv) pv.style.fontSize = SIZES[i] + 'rem';
    }));
    const off = host.querySelector('#sbsetOff'); if (off) off.addEventListener('click', () => { if (window.SBOffline && window.SBOffline.openPanel) window.SBOffline.openPanel(); });
  }
  window.SBSettingsPage = { open };
})();
