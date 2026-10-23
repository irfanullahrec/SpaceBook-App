/* sb_arcade_build.js — three arcade games with a longer plan: Block Builder (Minecraft style), Hill Climb Racing and Train Simulator.
 * Same contract as sb_arcade_runners.js; `goal` is how many right answers finish the game. */
(function (root) {
  'use strict';
  const A = root.SBArcade; if (!A) return;
  const TAU = Math.PI * 2;

  /* ---------------------------------------------------------------- Block Builder (Minecraft style) */
  A.register({
    id: 'build', name: 'Block Builder', emoji: '🧱', goal: 6, teach: 'Unlock blocks by solving challenges, then build the house',
    how: 'Tap ⛏ Mine and solve the challenge to win blocks. Then tap the faint squares of the plan to place them: stone first, then wood, glass, the door and the roof. A wrong answer costs a life; finish the house to win.',
    make(E) {
      const PLAN = ['........', '..RRRR..', '.RRRRRR.', '.WGWWGW.', '.WWDDWW.', 'SSSSSSSS'];
      const ORDER = ['S', 'W', 'G', 'D', 'R'];
      const MAT = { S: { n: 'stone', c: '#9ca3af', d: '#4b5563' }, W: { n: 'wood', c: '#b45309', d: '#78350f' }, G: { n: 'glass', c: '#7dd3fc', d: '#0369a1' }, D: { n: 'door', c: '#92400e', d: '#451a03' }, R: { n: 'brick', c: '#ef4444', d: '#7f1d1d' } };
      const cells = []; PLAN.forEach((row, y) => row.split('').forEach((ch, x) => { if (ch !== '.') cells.push({ x, y, m: ch, done: false }); }));
      const need = {}; ORDER.forEach(m => { need[m] = cells.filter(c => c.m === m).length; });
      const inv = { S: 0, W: 0, G: 0, D: 0, R: 0 }, placed = { S: 0, W: 0, G: 0, D: 0, R: 0 };
      const per = Math.ceil(cells.length / E.goal);
      let asking = false, botT = 0, pops = [], hint = 0;
      const geo = () => {
        const cs = Math.floor(Math.min(E.W / 9, (E.H - 110) / 7)), w = cs * 8, x0 = Math.floor((E.W - w) / 2), y0 = 10;
        return { cs, x0, y0, panelY: y0 + cs * 6 + 14 };
      };
      const supply = m => placed[m] + inv[m];
      function mine() {
        if (asking || E.state !== 'play') return;
        asking = true; const q = E.newQuestion(3);
        E.ask(q, ok => {
          asking = false;
          const G = geo();
          if (!ok) { E.wrongAnswer(E.W / 2, G.panelY + 20); return; }
          let give = per, got = {};
          for (const m of ORDER) { const take = Math.min(give, need[m] - supply(m)); if (take > 0) { inv[m] += take; give -= take; got[m] = take; } if (give <= 0) break; }
          const last = E.right + 1 >= E.goal;
          E.rightAnswer(E.W / 2, G.panelY + 20);
          E.float(E.W / 2, G.panelY - 12, '+' + Object.entries(got).map(([m, n]) => n + ' ' + MAT[m].n).join(', '), '#fde68a');
          if (last) cells.forEach(c => { if (!c.done) { c.done = true; placed[c.m]++; inv[c.m] = 0; pops.push({ x: c.x, y: c.y, t: 0 }); } });   // the last answer finishes the house
        });
        if (E.auto) E.later(0.3, () => E.askPick(E.auto !== 'wrong'));
      }
      function place(c) {
        if (c.done) return;
        if (inv[c.m] <= 0) { hint = 1.2; E.toast('⛏ ' + MAT[c.m].n, true); return; }
        inv[c.m]--; placed[c.m]++; c.done = true; pops.push({ x: c.x, y: c.y, t: 0 });
        const G = geo(); E.burst(G.x0 + c.x * G.cs + G.cs / 2, G.y0 + c.y * G.cs + G.cs / 2, MAT[c.m].c, 8);
      }
      return {
        update(dt) {
          pops.forEach(p => { p.t += dt; }); pops = pops.filter(p => p.t < 0.4); hint = Math.max(0, hint - dt);
          if (E.auto && !asking) {
            botT -= dt; if (botT > 0) return; botT = 0.07;
            const c = cells.find(k => !k.done && inv[k.m] > 0);
            if (c) place(c); else mine();
          }
        },
        tap(x, y) {
          if (asking) return; const G = geo();
          if (y >= G.panelY) { if (x > E.W - 130) mine(); return; }
          const cx = Math.floor((x - G.x0) / G.cs), cy = Math.floor((y - G.y0) / G.cs);
          const c = cells.find(k => k.x === cx && k.y === cy); if (c) place(c);
        },
        draw(g) {
          const G = geo(), W = E.W, H = E.H; E.sky('#7dd3fc', '#bae6fd');
          g.fillStyle = '#65a30d'; g.fillRect(0, G.y0 + G.cs * 6, W, H); g.fillStyle = '#854d0e'; g.fillRect(0, G.y0 + G.cs * 6 + 8, W, H);
          g.fillStyle = 'rgba(255,255,255,.7)'; g.beginPath(); g.arc(W * 0.85, 40, 22, 0, TAU); g.fill();
          // the plan: faint squares, filled where a block is already placed
          cells.forEach(c => {
            const px = G.x0 + c.x * G.cs, py = G.y0 + c.y * G.cs, M = MAT[c.m], pop = pops.find(p => p.x === c.x && p.y === c.y), sc = pop ? 1 + Math.sin(pop.t / 0.4 * Math.PI) * 0.18 : 1;
            g.save(); g.translate(px + G.cs / 2, py + G.cs / 2); g.scale(sc, sc);
            if (c.done) {
              g.fillStyle = M.c; g.fillRect(-G.cs / 2, -G.cs / 2, G.cs, G.cs); g.strokeStyle = M.d; g.lineWidth = 2; g.strokeRect(-G.cs / 2 + 1, -G.cs / 2 + 1, G.cs - 2, G.cs - 2);
              g.fillStyle = 'rgba(255,255,255,.22)'; g.fillRect(-G.cs / 2 + 3, -G.cs / 2 + 3, G.cs - 6, G.cs * 0.22);
              if (c.m === 'G') { g.strokeStyle = 'rgba(255,255,255,.8)'; g.beginPath(); g.moveTo(-G.cs / 4, G.cs / 4); g.lineTo(G.cs / 4, -G.cs / 4); g.stroke(); }
              if (c.m === 'D') { g.fillStyle = '#fbbf24'; g.beginPath(); g.arc(G.cs * 0.2, 0, 3, 0, TAU); g.fill(); }
            } else {
              const ready = inv[c.m] > 0;
              g.fillStyle = ready ? M.c + '99' : M.c + '33'; g.fillRect(-G.cs / 2, -G.cs / 2, G.cs, G.cs);
              g.setLineDash([5, 4]); g.strokeStyle = ready ? '#fff' : M.d + '88'; g.lineWidth = ready ? 2.5 : 1.5; g.strokeRect(-G.cs / 2 + 1, -G.cs / 2 + 1, G.cs - 2, G.cs - 2); g.setLineDash([]);
            }
            g.restore();
          });
          // the inventory and the mine button
          g.fillStyle = 'rgba(15,23,42,.88)'; g.fillRect(0, G.panelY, W, H - G.panelY);
          const bw = Math.min(58, (W - 150) / 5 - 4);
          ORDER.forEach((m, i) => {
            const x = 8 + i * (bw + 4), y = G.panelY + 10, M = MAT[m], locked = supply(m) === 0 && !ORDER.slice(0, i).every(k => supply(k) >= need[k]);
            g.fillStyle = locked ? '#334155' : M.c; E.rr(x, y, bw, 40, 8); g.fill(); g.strokeStyle = M.d; g.lineWidth = 2; g.stroke();
            if (locked) E.emoji('🔒', x + bw / 2, y + 20, 20); else { g.fillStyle = '#fff'; g.font = '800 15px ' + E.FONT; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 3; g.strokeStyle = 'rgba(0,0,0,.5)'; g.strokeText(inv[m] + '', x + bw / 2, y + 14); g.fillText(inv[m] + '', x + bw / 2, y + 14); g.font = '700 10px ' + E.FONT; g.strokeText(placed[m] + '/' + need[m], x + bw / 2, y + 30); g.fillText(placed[m] + '/' + need[m], x + bw / 2, y + 30); }
          });
          g.fillStyle = '#22c55e'; E.rr(W - 124, G.panelY + 8, 116, 46, 14); g.fill(); g.fillStyle = '#052e16'; g.font = '900 17px ' + E.FONT; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('⛏ Mine', W - 66, G.panelY + 31);
          if (hint > 0) { g.fillStyle = 'rgba(0,0,0,.6)'; g.font = '700 13px ' + E.FONT; g.fillText('⛏', W / 2, G.panelY + 60); }
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Hill Climb Racing */
  A.register({
    id: 'hill', name: 'Hill Climb Racing', emoji: '🚙', goal: 6, teach: 'Solve the question to get fuel',
    how: 'Hold your finger down to drive. The tank empties as you go; when it runs low a fuel question appears: tap the right answer to refill. A wrong answer costs a life, and an empty tank that stops the car costs one too.',
    make(E) {
      let wx = 0, v = 0, fuel = 100, gas = false, asking = false, cool = 1, ang = 0, hop = 0, tilt = 0;
      const amp = x => Math.min(1, x / 600);
      const th = x => E.H * 0.64 + amp(x) * (40 * Math.sin(x * 0.011) + 26 * Math.sin(x * 0.029 + 1.7) + 12 * Math.sin(x * 0.0063 + 4));
      const carX = () => E.W * 0.3;
      function askFuel() {
        asking = true; const q = E.newQuestion(3);
        E.ask(q, ok => {
          asking = false; cool = ok ? 0.5 : 1.8;
          if (ok) { fuel = Math.min(100, fuel + 62); E.rightAnswer(carX(), th(wx) - 30); } else E.wrongAnswer(carX(), th(wx) - 30);
        });
        if (E.auto) E.later(0.4, () => E.askPick(E.auto !== 'wrong'));
      }
      return {
        update(dt) {
          cool = Math.max(0, cool - dt);
          const g0 = E.auto ? true : gas, slope = (th(wx + 22) - th(wx - 22)) / 44;
          const acc = (g0 && fuel > 0 ? 250 : 0) - 55 + slope * 560;
          v = E.clamp(v + acc * dt, 0, 330); wx += v * dt;
          fuel = Math.max(0, fuel - (g0 ? 6.4 : 2.4) * dt);
          ang += (Math.atan2(th(wx + 30) - th(wx - 30), 60) - ang) * Math.min(1, dt * 10); tilt = Math.sin(E.t * 9) * v * 0.0007;
          if (fuel <= 0 && v < 6 && !asking) { fuel = 28; E.wrongAnswer(carX(), th(wx) - 30); }
          if (fuel < 56 && !asking && cool <= 0 && E.state === 'play') askFuel();
        },
        down() { gas = true; }, up() { gas = false; },
        key(k) { if (k === 'right' || k === 'up' || k === 'action') { gas = true; E.later(0.25, () => { gas = false; }); } },
        draw(g) {
          const W = E.W, H = E.H; E.sky('#fb923c', '#fef3c7');
          g.fillStyle = '#92400e55'; g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W; x += 8) g.lineTo(x, H * 0.5 + Math.sin((x + wx * 0.25) * 0.01) * 40 + Math.sin((x + wx * 0.25) * 0.023) * 18); g.lineTo(W, H); g.closePath(); g.fill();
          g.fillStyle = '#65a30d'; g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W + 6; x += 6) g.lineTo(x, th(wx - carX() + x)); g.lineTo(W + 6, H); g.closePath(); g.fill();
          g.strokeStyle = '#3f6212'; g.lineWidth = 4; g.beginPath(); for (let x = 0; x <= W + 6; x += 6) { const y = th(wx - carX() + x); if (x === 0) g.moveTo(x, y); else g.lineTo(x, y); } g.stroke();
          g.fillStyle = '#854d0e'; g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W + 6; x += 6) g.lineTo(x, th(wx - carX() + x) + 22); g.lineTo(W + 6, H); g.closePath(); g.fill();
          for (let k = Math.floor(wx / 400); k < Math.floor(wx / 400) + 4; k++) { const sx = carX() + k * 400 + 250 - wx; if (sx > -40 && sx < W + 40) E.emoji('🛢️', sx, th(wx - carX() + sx) - 18, 30); }
          g.save(); g.translate(carX(), th(wx) - 20); g.rotate(ang + tilt); g.scale(-1, 1); E.emoji('🚙', 0, 0, 58); g.restore();
          // fuel gauge and distance
          g.fillStyle = 'rgba(0,0,0,.45)'; E.rr(10, 10, 130, 22, 11); g.fill();
          g.fillStyle = fuel > 55 ? '#22c55e' : fuel > 25 ? '#f59e0b' : '#ef4444'; E.rr(12, 12, 126 * fuel / 100, 18, 9); g.fill();
          g.fillStyle = '#fff'; g.font = '800 12px ' + E.FONT; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('⛽ ' + Math.round(fuel) + '%', 18, 21);
          g.textAlign = 'right'; g.fillText(Math.round(wx / 10) + ' m', W - 12, 21);
          if (!E.auto && !asking && v < 3 && E.t < 6) { g.textAlign = 'center'; g.fillText('Hold your finger down to drive', W / 2, H * 0.4); }
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Train Simulator */
  A.register({
    id: 'train', name: 'Train Simulator', emoji: '🚆', goal: 5, teach: 'Stop at the station and complete the mission',
    how: 'Hold the right side of the screen to drive, the left side to brake. Stop the train with its front inside the green marker on the platform, then answer the mission question to open the doors. Overshooting a station or a wrong answer costs a life.',
    make(E) {
      const VMAX = 340, ACC = 170, BRK = 300, FRI = 24, L = 3, CAR = 74, GAP = 1100, HALF = 46;
      let pos = 0, v = 0, idx = 0, state = 'run', hold = 0, throttle = false, brake = false, tk = 0, bk = 0, bell = 0;
      const stationX = k => 1000 + k * GAP, zoneC = k => stationX(k) + 95;
      const sx = wx => E.W * 0.74 - (pos - wx);
      function dock() {
        state = 'ask'; v = 0; E.later(0.4, ask);
      }
      function ask() {
        if (E.state !== 'play') return;
        const q = E.newQuestion(3);
        E.ask(q, ok => {
          if (ok) { state = 'depart'; E.rightAnswer(E.W * 0.74 - 40, E.H * 0.62); idx++; E.later(0.3, () => { state = 'run'; E.setQuestion(null); }); }
          else { E.wrongAnswer(E.W * 0.74 - 40, E.H * 0.62); E.later(0.5, ask); }
        });
        if (E.auto) E.later(0.4, () => E.askPick(E.auto !== 'wrong'));
      }
      return {
        update(dt) {
          tk = Math.max(0, tk - dt); bk = Math.max(0, bk - dt); bell += dt;
          if (state === 'ask') return;
          const c = zoneC(idx), dist = c - pos;
          let th = throttle || tk > 0, br = brake || bk > 0;
          if (E.auto) {
            const want = dist > 0 ? Math.sqrt(2 * BRK * 0.8 * dist) : 0;
            th = v < Math.min(VMAX, want) - 6 || (v < 4 && dist > HALF - 6); br = v > want + 6 && dist < 900;
          }
          if (state === 'depart') { th = true; br = false; }
          v += ((th ? ACC : 0) - (br ? BRK : 0) - FRI) * dt; v = E.clamp(v, 0, VMAX); pos += v * dt;
          if (state === 'run') {
            if (Math.abs(pos - c) < HALF && v < 22) { hold += dt; if (hold > 0.45) { hold = 0; dock(); } } else hold = 0;
            if (pos > c + HALF + 120) { E.wrongAnswer(E.W * 0.74, E.H * 0.6); idx++; hold = 0; }
          }
        },
        down(x) { if (x > E.W / 2) throttle = true; else brake = true; },
        move(x) { throttle = x > E.W / 2; brake = !throttle; },
        up() { throttle = false; brake = false; },
        key(k) { if (k === 'right' || k === 'up' || k === 'action') tk = 0.3; else if (k === 'left' || k === 'down') bk = 0.3; },
        draw(g) {
          const W = E.W, H = E.H, gy = H * 0.66; E.sky('#0ea5e9', '#e0f2fe');
          g.fillStyle = '#94a3b855'; for (let i = 0; i < 9; i++) { const x = ((i * 90 - pos * 0.2) % (W + 120) + W + 120) % (W + 120) - 40; g.fillRect(x, gy - 60 - (i * 37) % 70, 50, 70 + (i * 37) % 70); }
          g.fillStyle = '#a3a3a3'; g.fillRect(0, gy, W, H - gy); g.fillStyle = '#525252'; g.fillRect(0, gy + 30, W, 8); g.fillRect(0, gy + 54, W, 8);
          g.fillStyle = '#78350f'; for (let x = -((pos % 26) + 26); x < W + 26; x += 26) g.fillRect(x, gy + 26, 8, 40);
          // stations in view
          for (let k = Math.max(0, idx - 1); k <= idx + 1; k++) {
            const x0 = sx(stationX(k)) - 150, w = 300; if (x0 > W || x0 + w < 0) continue;
            g.fillStyle = '#e2e8f0'; g.fillRect(x0, gy - 8, w, 38); g.fillStyle = '#475569'; g.fillRect(x0, gy - 12, w, 6);
            g.fillStyle = '#b91c1c'; g.beginPath(); g.moveTo(x0 - 10, gy - 70); g.lineTo(x0 + w + 10, gy - 70); g.lineTo(x0 + w, gy - 48); g.lineTo(x0, gy - 48); g.closePath(); g.fill();
            g.fillStyle = '#94a3b8'; g.fillRect(x0 + 20, gy - 48, 6, 40); g.fillRect(x0 + w - 26, gy - 48, 6, 40);
            g.fillStyle = '#fff'; g.font = '800 14px ' + E.FONT; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('STATION ' + (k + 1), x0 + w / 2, gy - 59);
            if (k === idx) { const zx = sx(zoneC(k)); g.fillStyle = 'rgba(34,197,94,.55)'; g.fillRect(zx - HALF, gy + 6, HALF * 2, 16); g.strokeStyle = '#16a34a'; g.lineWidth = 3; g.strokeRect(zx - HALF, gy + 6, HALF * 2, 16); }
          }
          // the train: its front is at pos
          for (let i = 0; i < L; i++) {
            const x = W * 0.74 - (i + 1) * CAR, col = i === 0 ? '#dc2626' : '#2563eb';
            g.fillStyle = col; E.rr(x + 2, gy - 44, CAR - 4, 66, 8); g.fill(); g.fillStyle = '#e0f2fe'; for (let w = 0; w < 3; w++) g.fillRect(x + 8 + w * 20, gy - 34, 14, 16);
            g.fillStyle = '#111827'; g.beginPath(); g.arc(x + 16, gy + 24, 7, 0, TAU); g.arc(x + CAR - 16, gy + 24, 7, 0, TAU); g.fill();
            if (state === 'ask') { g.fillStyle = '#fde047'; g.fillRect(x + CAR / 2 - 6, gy - 20, 12, 40); }
          }
          // speed and the two pads
          g.fillStyle = 'rgba(15,23,42,.6)'; E.rr(10, 10, 120, 24, 12); g.fill(); g.fillStyle = '#fff'; g.font = '800 12px ' + E.FONT; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText('🚆 ' + Math.round(v / 3.4) + ' km/h', 20, 22);
          if (state !== 'ask') {
            [['■ BRAKE', 0, brake || bk > 0, '#ef4444'], ['GO ▶▶', 1, throttle || tk > 0, '#22c55e']].forEach(([t, side, on, c]) => {
              g.fillStyle = on ? c : 'rgba(15,23,42,.55)'; E.rr(10 + side * (W / 2), H - 74, W / 2 - 20, 58, 16); g.fill(); g.strokeStyle = c; g.lineWidth = 3; g.stroke();
              g.fillStyle = '#fff'; g.font = '900 18px ' + E.FONT; g.textAlign = 'center'; g.fillText(t, 10 + side * (W / 2) + (W / 2 - 20) / 2, H - 45);
            });
          }
        },
      };
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
