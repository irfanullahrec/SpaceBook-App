/* sb_arcade_runners.js — four arcade games where you steer through the right answer: Subway Surfers, Temple Run, Car Racing, Flappy Bird.
 * Each game is {id, name, emoji, teach, how, make(env)}; env comes from sb_arcade.js (question stream, lives, score, drawing helpers).
 * With env.auto = 'right' | 'wrong' a game plays itself (the tests use it to prove that a perfect player can finish every game and a careless one cannot). */
(function (root) {
  'use strict';
  const A = root.SBArcade; if (!A) return;
  const TAU = Math.PI * 2;
  const COL = ['#38bdf8', '#a78bfa', '#fb923c'];
  // the three labels of a wave: the right answer in a random lane
  function three(E, q) {
    const correct = E.ri(0, 2), wrong = q.options.filter(o => o !== q.a), labels = []; let w = 0;
    for (let i = 0; i < 3; i++) labels.push(i === correct ? q.a : wrong[w++ % wrong.length]);
    return { labels, correct };
  }

  /* ---------------------------------------------------------------- Subway Surfers */
  A.register({
    id: 'subway', name: 'Subway Surfers', emoji: '🏃', teach: 'Run through the right answer',
    how: 'Swipe left or right (or tap the sides of the screen) to change lane. Run through the lane that holds the right answer; a wrong one costs a life. The faster you collect, the faster the train station flies by.',
    make(E) {
      let lane = 1, lx = 1, scroll = 0, wave = null, gap = 0.5, stumble = 0;
      const proj = d => { const p = Math.pow(d, 1.7); return { p, y: E.H * 0.2 + E.H * 0.62 * p, s: 0.1 + 0.9 * p }; };
      const laneX = (l, s) => E.W / 2 + (l - 1) * E.W * 0.3 * s;
      const travel = () => Math.max(1.9, 3.4 - 0.16 * E.right);
      const spawn = () => { const q = E.newQuestion(3), t = three(E, q); wave = { q, d: 0, labels: t.labels, correct: t.correct, done: false, hit: -1 }; };
      const move = dir => { lane = E.clamp(lane + dir, 0, 2); };
      return {
        update(dt) {
          scroll = (scroll + dt * (0.8 + E.right * 0.06)) % 1; stumble = Math.max(0, stumble - dt);
          lx += (lane - lx) * Math.min(1, dt * 14);
          if (!wave) { gap -= dt; if (gap <= 0) spawn(); return; }
          if (E.auto && wave.d > 0.18 && !wave.done) lane = E.auto === 'wrong' ? (wave.correct + 1) % 3 : wave.correct;
          wave.d += dt / travel();
          if (!wave.done && wave.d >= 0.93) {
            wave.done = true; wave.hit = lane;
            const x = laneX(lane, 1), y = proj(0.93).y;
            if (lane === wave.correct) E.rightAnswer(x, y); else { stumble = 0.5; E.wrongAnswer(x, y); }
          }
          if (wave.d >= 1.12) { wave = null; gap = 0.35; }
        },
        swipe(dir) { if (dir === 'left') move(-1); else if (dir === 'right') move(1); },
        tap(x) { move(x < E.W / 2 ? -1 : 1); },
        key(k) { if (k === 'left') move(-1); else if (k === 'right') move(1); },
        draw(g) {
          const W = E.W, H = E.H, hy = H * 0.2;
          E.sky('#1e1b4b', '#6d28d9');
          g.fillStyle = '#fde68a'; g.beginPath(); g.arc(W * 0.78, hy * 0.7, 26, 0, TAU); g.fill();
          // buildings on both sides, scrolling toward the player
          for (let k = 0; k < 9; k++) {
            const d = ((k / 9) + scroll / 9) % 1, q = proj(d), half = W * 0.45 * q.s, bw = W * 0.22 * q.s, bh = H * 0.5 * q.s;
            [[W / 2 - half - bw, -1], [W / 2 + half, 1]].forEach(([bx]) => {
              g.fillStyle = k % 2 ? '#312e81' : '#3730a3'; g.fillRect(bx, q.y - bh, bw, bh);
              g.fillStyle = 'rgba(253,230,138,.55)'; for (let r = 0; r < 3; r++) g.fillRect(bx + bw * 0.2, q.y - bh + bh * (0.15 + r * 0.26), bw * 0.25, bh * 0.1);
            });
          }
          // the road
          g.fillStyle = '#334155'; g.beginPath(); g.moveTo(W / 2 - W * 0.045, hy); g.lineTo(W / 2 + W * 0.045, hy); g.lineTo(W / 2 + W * 0.57, H); g.lineTo(W / 2 - W * 0.57, H); g.closePath(); g.fill();
          g.strokeStyle = '#fde047'; g.lineWidth = 3;
          g.beginPath(); g.moveTo(W / 2 - W * 0.045, hy); g.lineTo(W / 2 - W * 0.57, H); g.moveTo(W / 2 + W * 0.045, hy); g.lineTo(W / 2 + W * 0.57, H); g.stroke();
          g.fillStyle = 'rgba(255,255,255,.7)';
          for (let k = 0; k < 10; k++) {
            const d0 = ((k + scroll * 10) % 10) / 10, a = proj(d0), b = proj(Math.min(1.3, d0 + 0.04));
            [-0.5, 0.5].forEach(o => { const x0 = W / 2 + o * W * 0.3 * a.s, x1 = W / 2 + o * W * 0.3 * b.s, w0 = 1 + 3 * a.s, w1 = 1 + 3 * b.s; g.beginPath(); g.moveTo(x0 - w0, a.y); g.lineTo(x0 + w0, a.y); g.lineTo(x1 + w1, b.y); g.lineTo(x1 - w1, b.y); g.closePath(); g.fill(); });
          }
          // the answers
          if (wave) {
            const q = proj(Math.min(wave.d, 1.2));
            for (let i = 0; i < 3; i++) {
              if (wave.done && wave.hit === wave.correct && i !== wave.correct) continue;
              const x = laneX(i, q.s), w = W * 0.27 * q.s, h = w * 0.58, ok = wave.done && i === wave.correct;
              g.fillStyle = ok ? '#22c55e' : COL[i]; E.rr(x - w / 2, q.y - h, w, h, 8 * q.s + 2); g.fill();
              g.lineWidth = 2; g.strokeStyle = 'rgba(255,255,255,.8)'; g.stroke();
              E.label(wave.labels[i], x, q.y - h / 2, w - 6, Math.max(9, 22 * q.s + 4), '#fff', 'rgba(0,0,0,.35)');
            }
          }
          // the runner
          const px = W / 2 + (lx - 1) * W * 0.3, py = H * 0.84, bob = Math.sin(E.t * 14) * 3;
          g.fillStyle = 'rgba(0,0,0,.3)'; g.beginPath(); g.ellipse(px, py + 26, 26, 8, 0, 0, TAU); g.fill();
          E.emoji(stumble > 0 ? '😵' : '🏃', px, py + bob, Math.min(60, W * 0.15), (lane - lx) * 0.3);
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Temple Run */
  A.register({
    id: 'temple', name: 'Temple Run', emoji: '🏛️', teach: 'Pick the right door of the temple',
    how: 'The temple wall rushes toward you. Swipe left or right to move to a door, swipe up to run through it (or just tap a door). Choose the door with the right answer before the floor crumbles.',
    make(E) {
      let wall = null, gap = 0.4, sel = 1;
      const time = () => Math.max(4.2, 7 - 0.3 * E.right);
      const spawn = () => { const q = E.newQuestion(3), t = three(E, q); wall = { q, labels: t.labels, correct: t.correct, t: 0, done: false, open: -1, after: 0, ok: false }; sel = 1; };
      function choose(i) {
        if (!wall || wall.done) return;
        wall.done = true; wall.open = i; wall.ok = i === wall.correct; if (i >= 0) sel = i;
        const x = E.W / 2 + (i - 1) * E.W * 0.28, y = E.H * 0.5;
        if (wall.ok) E.rightAnswer(x, y); else E.wrongAnswer(x, y);
      }
      return {
        update(dt) {
          if (!wall) { gap -= dt; if (gap <= 0) spawn(); return; }
          if (!wall.done) {
            wall.t += dt;
            if (E.auto && wall.t > 0.7) choose(E.auto === 'wrong' ? (wall.correct + 1) % 3 : wall.correct);
            else if (wall.t >= time()) choose(-1);
          } else { wall.after += dt; if (wall.after > 1) { wall = null; gap = 0.3; } }
        },
        swipe(dir) { if (dir === 'left') sel = Math.max(0, sel - 1); else if (dir === 'right') sel = Math.min(2, sel + 1); else if (dir === 'up') choose(sel); },
        tap(x) { choose(E.clamp(Math.floor(x / (E.W / 3)), 0, 2)); },
        key(k) { if (k === 'left') sel = Math.max(0, sel - 1); else if (k === 'right') sel = Math.min(2, sel + 1); else if (k === 'up' || k === 'action') choose(sel); },
        draw(g) {
          const W = E.W, H = E.H;
          E.sky('#3b2a1a', '#7c4a1d');
          // corridor
          g.fillStyle = '#4b3420'; g.beginPath(); g.moveTo(W * 0.3, H * 0.28); g.lineTo(W * 0.7, H * 0.28); g.lineTo(W, H); g.lineTo(0, H); g.closePath(); g.fill();
          g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 2;
          for (let k = 1; k < 8; k++) { const y = H * 0.28 + (H * 0.72) * Math.pow(k / 8, 1.6); g.beginPath(); g.moveTo(W * 0.3 - (W * 0.3) * ((y - H * 0.28) / (H * 0.72)), y); g.lineTo(W * 0.7 + (W * 0.3) * ((y - H * 0.28) / (H * 0.72)), y); g.stroke(); }
          for (let side = 0; side < 2; side++) { const tx = side ? W * 0.9 : W * 0.1; E.emoji('🔥', tx, H * 0.2 + Math.sin(E.t * 6 + side) * 2, 26); }
          if (wall) {
            const T = time(), k = wall.done ? 1 : Math.pow(wall.t / T, 1.5), s = 0.5 + 0.5 * k + (wall.done ? wall.after * 0.25 : 0);
            const ww = W * 0.94 * Math.min(1.4, s), wh = H * 0.62 * Math.min(1.4, s), cx = W / 2, cy = H * 0.52 - (s - 0.5) * 20, dw = ww / 3;
            g.fillStyle = '#92704a'; E.rr(cx - ww / 2, cy - wh / 2, ww, wh, 10); g.fill(); g.strokeStyle = '#3f2c14'; g.lineWidth = 3; g.stroke();
            for (let i = 0; i < 3; i++) {
              const dx = cx + (i - 1) * dw, dwid = dw * 0.78, dh = wh * 0.74, top = cy - dh / 2 + wh * 0.08;
              const open = wall.done && wall.open === i;
              g.fillStyle = open ? (wall.ok ? '#bbf7d0' : '#fecaca') : (sel === i ? '#7c2d12' : '#451a03');
              g.beginPath(); g.moveTo(dx - dwid / 2, top + dh); g.lineTo(dx - dwid / 2, top + dwid / 2); g.arc(dx, top + dwid / 2, dwid / 2, Math.PI, 0); g.lineTo(dx + dwid / 2, top + dh); g.closePath(); g.fill();
              g.lineWidth = sel === i ? 4 : 2; g.strokeStyle = sel === i ? '#fde047' : '#fbbf24'; g.stroke();
              E.label(wall.labels[i], dx, top + dh * 0.52, dwid - 8, Math.max(11, 22 * s), '#fff', 'rgba(0,0,0,.6)');
            }
            // the crumbling floor: time left
            if (!wall.done) { const left = 1 - wall.t / T; g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(W * 0.1, H - 22, W * 0.8, 8); g.fillStyle = left > 0.3 ? '#fbbf24' : '#ef4444'; g.fillRect(W * 0.1, H - 22, W * 0.8 * left, 8); }
          }
          const px = W / 2 + (sel - 1) * W * 0.28;
          g.fillStyle = 'rgba(0,0,0,.3)'; g.beginPath(); g.ellipse(px, H * 0.9 + 22, 24, 7, 0, 0, TAU); g.fill();
          E.emoji('🧗', px, H * 0.9 + Math.sin(E.t * 12) * 3, Math.min(56, W * 0.14));
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Car Racing */
  A.register({
    id: 'race', name: 'Car Racing', emoji: '🏎️', teach: 'Right answers make your car faster',
    how: 'Steer into the lane of the gate that holds the right answer: your car speeds up and pulls away from the rival cars. A wrong gate spins you out and slows you down. Swipe or tap the sides to change lane.',
    make(E) {
      let lane = 1, lx = 1, scroll = 0, speed = 240, gate = null, gap = 0.4, spin = 0, dist = 0;
      const rivals = [{ d: 0, v: 0.55, col: '#f87171', lane: 0 }, { d: 0, v: 0.62, col: '#facc15', lane: 2 }];
      const roadL = () => E.W * 0.12, roadW = () => E.W * 0.76, laneW = () => roadW() / 3;
      const cx = l => roadL() + laneW() * (l + 0.5);
      const spawn = () => { const q = E.newQuestion(3), t = three(E, q); gate = { q, labels: t.labels, correct: t.correct, y: -60, done: false, hit: -1 }; };
      const move = dir => { lane = E.clamp(lane + dir, 0, 2); };
      return {
        update(dt) {
          spin = Math.max(0, spin - dt); lx += (lane - lx) * Math.min(1, dt * 12);
          scroll = (scroll + speed * dt) % 80; dist += speed * dt / 60 / E.goal / 4;
          rivals.forEach(r => { r.d += dt * r.v / (E.goal * 2.6); });
          speed += ((240 + E.right * 55) * (spin > 0 ? 0.45 : 1) - speed) * Math.min(1, dt * 2);
          if (!gate) { gap -= dt; if (gap <= 0) spawn(); return; }
          if (E.auto && gate.y > 40 && !gate.done) lane = E.auto === 'wrong' ? (gate.correct + 1) % 3 : gate.correct;
          gate.y += (speed * 0.9 + 80) * dt;
          const carY = E.H * 0.8;
          if (!gate.done && gate.y >= carY - 20) {
            gate.done = true; gate.hit = lane;
            if (lane === gate.correct) { E.rightAnswer(cx(lane), carY); speed += 60; } else { spin = 0.9; E.wrongAnswer(cx(lane), carY); }
          }
          if (gate.y > E.H + 80) { gate = null; gap = 0.3; }
        },
        swipe(dir) { if (dir === 'left') move(-1); else if (dir === 'right') move(1); },
        tap(x) { move(x < E.W / 2 ? -1 : 1); },
        key(k) { if (k === 'left') move(-1); else if (k === 'right') move(1); },
        draw(g) {
          const W = E.W, H = E.H;
          g.fillStyle = '#16a34a'; g.fillRect(0, 0, W, H);
          g.fillStyle = '#374151'; g.fillRect(roadL(), 0, roadW(), H);
          g.fillStyle = '#f8fafc'; g.fillRect(roadL() - 4, 0, 4, H); g.fillRect(roadL() + roadW(), 0, 4, H);
          g.fillStyle = 'rgba(255,255,255,.75)';
          for (let l = 1; l < 3; l++) for (let y = -80 + scroll; y < H; y += 80) g.fillRect(roadL() + laneW() * l - 2, y, 4, 38);
          for (let y = -80 + scroll; y < H; y += 80) { g.fillStyle = (Math.floor(y / 80) % 2) ? '#dc2626' : '#f8fafc'; g.fillRect(0, y, roadL() - 4, 40); g.fillRect(roadL() + roadW() + 4, y, W, 40); }
          // the gate
          if (gate) {
            for (let i = 0; i < 3; i++) {
              if (gate.done && gate.hit === gate.correct && i !== gate.correct) continue;
              const ok = gate.done && i === gate.correct;
              g.fillStyle = ok ? '#16a34a' : COL[i]; E.rr(roadL() + laneW() * i + 5, gate.y - 24, laneW() - 10, 48, 10); g.fill(); g.lineWidth = 2; g.strokeStyle = '#fff'; g.stroke();
              E.label(gate.labels[i], cx(i), gate.y, laneW() - 18, 19, '#fff', 'rgba(0,0,0,.4)');
            }
          }
          // rivals, drawn beside the player at the distance they have covered
          rivals.forEach((r, k) => { const ry = E.H * 0.8 - (r.d - dist) * H * 0.9 - 60 * (k + 1); if (ry > -50 && ry < H + 50) E.emoji('🚗', cx(r.lane), ry, 38, Math.PI); });
          // the player
          const px = roadL() + laneW() * (lx + 0.5), py = H * 0.8;
          E.emoji('🏎️', px, py, Math.min(58, laneW() * 0.8), spin > 0 ? spin * 14 : 0);
          // race strip: how far each car is
          g.fillStyle = 'rgba(0,0,0,.4)'; g.fillRect(W - 14, 8, 8, H * 0.35);
          [[dist, '#60a5fa'], [rivals[0].d, rivals[0].col], [rivals[1].d, rivals[1].col]].forEach(([d, c]) => { g.fillStyle = c; g.beginPath(); g.arc(W - 10, 8 + H * 0.35 * (1 - Math.min(1, d)), 5, 0, TAU); g.fill(); });
          g.fillStyle = '#fff'; g.font = '800 12px ' + E.FONT; g.textAlign = 'left'; g.textBaseline = 'top'; g.fillText(Math.round(speed / 2) + ' km/h', 8, 8);
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Flappy Bird */
  A.register({
    id: 'flappy', name: 'Flappy Bird', emoji: '🐤', teach: 'Fly through the gate with the right answer',
    how: 'Tap to flap. Every wall has three gaps and each gap shows an answer: fly through the right one. Hitting the wall or flying through a wrong gap costs a life.',
    make(E) {
      const BX = () => E.W * 0.26, R = 14;
      let y = E.H / 2, vy = 0, wall = null, gap = 0.5, inv = 0, wallAt = 0;
      const gh = () => Math.min(62, E.H * 0.105), cy = i => E.H * (0.22 + 0.28 * i);
      const spawn = () => {
        const q = E.newQuestion(3), t = three(E, q);
        wall = { x: E.W + 40, q, labels: t.labels, correct: t.correct, through: -2, hit: false, scored: false, w: 66, speed: 150 + E.right * 7 };
      };
      const flap = () => { vy = -400; };
      const inGap = (wl, yy) => { for (let i = 0; i < 3; i++) if (yy - R * 0.85 >= cy(i) - gh() && yy + R * 0.85 <= cy(i) + gh()) return i; return -1; };
      return {
        resize() { if (!wall) y = E.H / 2; },
        update(dt) {
          vy += 1250 * dt; y += vy * dt; inv = Math.max(0, inv - dt);
          if (y < R) { y = R; vy = 0; }
          if (y > E.H - R) { y = E.H - R; vy = -250; if (!inv) { inv = 1.2; E.wrongAnswer(BX(), y); } }
          if (!wall) { gap -= dt; if (gap <= 0) spawn(); }
          if (E.auto) {                                          // the test player: aim for the middle of the right gap (the screen's middle between walls)
            const t = wall && !wall.scored ? cy(E.auto === 'wrong' ? (wall.correct + 1) % 3 : wall.correct) : E.H / 2;
            if (y > t + 90) { if (vy > -150) flap(); }            // far below: climb
            else if (vy >= 0 && y + vy * 0.05 > t + 34) flap();     // near it: hover
          }
          if (wall) {
            wall.x -= wall.speed * dt;
            const left = wall.x - wall.w / 2, right = wall.x + wall.w / 2;
            if (BX() + R > left && BX() - R < right) {
              const gi = inGap(wall, y);
              if (gi < 0 && !wall.hit && !inv) { wall.hit = true; inv = 1.2; E.wrongAnswer(BX(), y); y = cy(1); vy = 0; }
              if (gi >= 0 && BX() >= wall.x - 2 && wall.through === -2) wall.through = gi;
            }
            if (!wall.scored && BX() - R > right) {
              wall.scored = true;
              if (!wall.hit) { if (wall.through === wall.correct) E.rightAnswer(BX(), y); else if (wall.through >= 0) { inv = 1; E.wrongAnswer(BX(), y); } }
            }
            if (wall.x < -60) { wall = null; gap = 0.45; }
          }
          if (!E.auto) wallAt = 0;
        },
        down() { flap(); },
        key(k) { if (k === 'up' || k === 'action') flap(); },
        draw(g) {
          const W = E.W, H = E.H;
          E.sky('#7dd3fc', '#e0f2fe');
          g.fillStyle = 'rgba(255,255,255,.8)'; [[0.2, 0.15], [0.62, 0.3], [0.85, 0.12]].forEach(([a, b]) => { const x = ((a * W - E.t * 14) % (W + 80) + W + 80) % (W + 80) - 40; g.beginPath(); g.arc(x, H * b, 22, 0, TAU); g.arc(x + 22, H * b + 4, 18, 0, TAU); g.arc(x - 20, H * b + 6, 16, 0, TAU); g.fill(); });
          g.fillStyle = '#65a30d'; g.fillRect(0, H - 8, W, 8);
          if (wall) {
            const l = wall.x - wall.w / 2;
            g.fillStyle = '#16a34a'; g.strokeStyle = '#14532d'; g.lineWidth = 3;
            let top = -4;
            for (let i = 0; i < 3; i++) { const a = cy(i) - gh(), b = cy(i) + gh(); g.fillRect(l, top, wall.w, a - top); g.strokeRect(l, top, wall.w, a - top); top = b; }
            g.fillRect(l, top, wall.w, H - top); g.strokeRect(l, top, wall.w, H - top);
            for (let i = 0; i < 3; i++) { g.fillStyle = 'rgba(255,255,255,.92)'; E.rr(l - 20, cy(i) - 15, wall.w + 40, 30, 15); g.fill(); g.strokeStyle = '#14532d'; g.lineWidth = 2; g.stroke(); E.label(wall.labels[i], wall.x, cy(i), wall.w + 30, 17, '#14532d'); }
          }
          if (!inv || Math.floor(E.t * 14) % 2) E.emoji('🐤', BX(), y, 34, Math.max(-0.5, Math.min(0.9, vy / 700)));
        },
      };
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
