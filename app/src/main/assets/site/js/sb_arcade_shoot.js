/* sb_arcade_shoot.js — five arcade games where you hit the right answer: Fruit Ninja, Balloon Pop, Bubble Shooter, Angry Birds, Football Penalty.
 * Same contract as sb_arcade_runners.js: {id, name, emoji, teach, how, make(env)}; env.auto = 'right' | 'wrong' makes a game play itself for the tests. */
(function (root) {
  'use strict';
  const A = root.SBArcade; if (!A) return;
  const TAU = Math.PI * 2;
  const PAL = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];
  const wrongOne = (q, k) => q.options.filter(o => o !== q.a)[k % Math.max(1, q.options.length - 1)];

  /* ---------------------------------------------------------------- Fruit Ninja */
  A.register({
    id: 'ninja', name: 'Fruit Ninja', emoji: '🍉', teach: 'Slice the fruit that carries the right answer',
    how: 'Fruits fly up, each wearing an answer. Swipe your finger through the fruit with the right answer to slice it. Slicing a wrong one, or letting the right one fall, costs a life.',
    make(E) {
      const EM = ['🍉', '🍊', '🍎', '🍋', '🍇', '🥝', '🍓', '🍑'], G = 880;
      let fruits = [], halves = [], trail = [], wave = null, gap = 0.5;
      function spawn() {
        const q = E.newQuestion(4), n = q.options.length, opts = q.options.slice();
        wave = { q, resolved: false };
        opts.forEach((o, i) => {
          const x = E.W * (0.14 + 0.72 * (i + 0.5 * E.R()) / n), apex = E.H * E.rand(0.5, 0.74), vy = -Math.sqrt(2 * G * apex);
          fruits.push({ x, y: E.H + 40, vx: (E.W / 2 - x) * E.rand(0.05, 0.22), vy, r: 36, label: o, correct: o === q.a, em: EM[(i + E.ri(0, 7)) % EM.length], rot: 0, vr: E.rand(-3, 3), delay: i * 0.18 + E.rand(0, 0.15), sliced: false, wave });
        });
      }
      function resolve(w) { if (w && !w.resolved) { w.resolved = true; gap = 0.6; } }
      function cut(f) {
        if (f.sliced || f.delay > 0) return;
        f.sliced = true;
        halves.push({ x: f.x, y: f.y, vx: -90 - E.rand(0, 40), vy: f.vy * 0.2 - 60, em: f.em, side: 0, rot: 0, vr: -4, t: 0 }, { x: f.x, y: f.y, vx: 90 + E.rand(0, 40), vy: f.vy * 0.2 - 60, em: f.em, side: 1, rot: 0, vr: 4, t: 0 });
        E.burst(f.x, f.y, f.correct ? '#86efac' : '#fca5a5', 12);
        if (f.correct) { E.rightAnswer(f.x, f.y); resolve(f.wave); fruits.forEach(o => { if (o.wave === f.wave && !o.sliced) o.fade = true; }); }
        else E.wrongAnswer(f.x, f.y);
      }
      const hitSeg = (x0, y0, x1, y1, f) => {
        const dx = x1 - x0, dy = y1 - y0, l2 = dx * dx + dy * dy || 1;
        let t = ((f.x - x0) * dx + (f.y - y0) * dy) / l2; t = Math.max(0, Math.min(1, t));
        return Math.hypot(f.x - (x0 + t * dx), f.y - (y0 + t * dy)) < f.r;
      };
      return {
        update(dt) {
          if (!wave) { gap -= dt; if (gap <= 0) spawn(); }
          fruits.forEach(f => {
            if (f.delay > 0) { f.delay -= dt; return; }
            f.vy += G * dt; f.x += f.vx * dt; f.y += f.vy * dt; f.rot += f.vr * dt;
            if (E.auto && !f.sliced && f.vy > -300 && f.y < E.H * 0.7 && f.y > E.H * 0.2 && wave && !wave.resolved) {
              if ((E.auto === 'wrong') !== f.correct && !(E.auto === 'wrong' && wave.hitOnce)) { if (E.auto === 'wrong') wave.hitOnce = true; cut(f); }
            }
          });
          halves.forEach(h => { h.t += dt; h.vy += G * dt; h.x += h.vx * dt; h.y += h.vy * dt; h.rot += h.vr * dt; });
          // a right fruit that falls out of the screen is a miss
          fruits.forEach(f => {
            if (f.delay <= 0 && f.vy > 0 && f.y > E.H + 50) {
              if (f.correct && !f.sliced && !f.wave.resolved && E.state === 'play') { f.wave.resolved = true; gap = 0.6; E.wrongAnswer(f.x, E.H - 30); }
              f.gone = true;
            }
          });
          fruits = fruits.filter(f => !f.gone && !(f.fade && f.y > E.H + 20)); halves = halves.filter(h => h.t < 1.4);
          if (wave && wave.resolved && !fruits.some(f => f.wave === wave && !f.sliced && !f.fade)) wave = null;
          trail = trail.filter(p => performance.now() - p.t < 160);
        },
        down(x, y) { trail = [{ x, y, t: performance.now() }]; },
        move(x, y) {
          const last = trail[trail.length - 1];
          trail.push({ x, y, t: performance.now() });
          if (last) fruits.forEach(f => { if (!f.sliced && f.delay <= 0 && hitSeg(last.x, last.y, x, y, f)) cut(f); });
        },
        tap(x, y) { fruits.forEach(f => { if (!f.sliced && f.delay <= 0 && Math.hypot(f.x - x, f.y - y) < f.r + 12) cut(f); }); },
        draw(g) {
          const W = E.W, H = E.H; E.sky('#1f2937', '#7c2d12');
          g.fillStyle = 'rgba(255,255,255,.05)'; for (let i = 0; i < 8; i++) { g.beginPath(); g.arc(W * (i / 7), H * 0.9, W * 0.2, 0, TAU); g.fill(); }
          halves.forEach(h => { g.save(); g.globalAlpha = Math.max(0, 1 - h.t / 1.4); g.translate(h.x, h.y); g.rotate(h.rot); g.beginPath(); g.rect(h.side ? 0 : -40, -40, 40, 80); g.clip(); E.emoji(h.em, 0, 0, 62); g.restore(); });
          fruits.forEach(f => {
            if (f.delay > 0 || f.sliced) return;
            g.save(); g.globalAlpha = f.fade ? 0.35 : 1; E.emoji(f.em, f.x, f.y, 66, f.rot);
            g.fillStyle = 'rgba(255,255,255,.95)'; const w = Math.min(E.W * 0.34, 118); E.rr(f.x - w / 2, f.y + 26, w, 24, 12); g.fill(); E.label(f.label, f.x, f.y + 38, w - 8, 15, '#111827'); g.restore();
          });
          if (trail.length > 1) { g.lineCap = 'round'; g.lineJoin = 'round'; for (let i = 1; i < trail.length; i++) { const a = 1 - (performance.now() - trail[i].t) / 160; g.strokeStyle = 'rgba(255,255,255,' + Math.max(0, a) + ')'; g.lineWidth = 3 + 7 * Math.max(0, a); g.beginPath(); g.moveTo(trail[i - 1].x, trail[i - 1].y); g.lineTo(trail[i].x, trail[i].y); g.stroke(); } }
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Balloon Pop */
  A.register({
    id: 'balloon', name: 'Balloon Pop', emoji: '🎈', teach: 'Pop the balloon with the right answer',
    how: 'Balloons float up with answers inside. Tap the balloon that holds the right answer before it floats away. Popping a wrong balloon, or losing the right one, costs a life.',
    make(E) {
      let balloons = [], wave = null, gap = 0.4, pops = [];
      function spawn() {
        const q = E.newQuestion(4), n = q.options.length, order = E.shuffle(q.options.slice());
        wave = { q, resolved: false };
        order.forEach((o, i) => balloons.push({ x: E.W * (0.16 + 0.68 * i / Math.max(1, n - 1)), y: E.H + 70 + E.rand(0, 80), vy: -E.rand(62, 84) - E.right * 2.5, ph: E.rand(0, 6), label: o, correct: o === q.a, col: PAL[(i + E.ri(0, 5)) % PAL.length], wave, w: Math.min(86, E.W * 0.22), alive: true }));
      }
      function pop(b) {
        if (!b.alive) return; b.alive = false;
        E.burst(b.x, b.y, b.col, 16); pops.push({ x: b.x, y: b.y, t: 0 });
        if (b.correct) { E.rightAnswer(b.x, b.y); b.wave.resolved = true; balloons.forEach(o => { if (o.wave === b.wave && o.alive) o.fly = true; }); gap = 0.5; }
        else E.wrongAnswer(b.x, b.y);
      }
      return {
        update(dt) {
          if (!wave) { gap -= dt; if (gap <= 0) spawn(); }
          balloons.forEach(b => {
            b.ph += dt * 1.6; b.y += (b.fly ? -260 : b.vy) * dt; b.x += Math.sin(b.ph) * 18 * dt;
            if (E.auto && b.alive && !b.fly && b.y < E.H * 0.78 && wave && !wave.resolved && (E.auto === 'wrong' ? !b.correct : b.correct)) pop(b);
            if (b.y < -b.w * 1.4 && b.alive && !b.fly) { b.alive = false; if (b.correct && !b.wave.resolved) { b.wave.resolved = true; gap = 0.5; E.wrongAnswer(b.x, 30); } }
          });
          pops.forEach(p => { p.t += dt; }); pops = pops.filter(p => p.t < 0.4);
          balloons = balloons.filter(b => (b.alive || b.fly) && b.y > -b.w * 1.5);
          if (wave && wave.resolved && !balloons.some(b => b.wave === wave && b.alive && !b.fly)) wave = null;
        },
        down(x, y) {
          for (let i = balloons.length - 1; i >= 0; i--) { const b = balloons[i]; if (b.alive && !b.fly && Math.abs(x - b.x) < b.w * 0.6 && Math.abs(y - b.y) < b.w * 0.78) { pop(b); return; } }
        },
        draw(g) {
          E.sky('#38bdf8', '#e0f2fe');
          g.fillStyle = 'rgba(255,255,255,.85)'; [[0.25, 0.2], [0.7, 0.38], [0.45, 0.62]].forEach(([a, b]) => { const x = ((a * E.W + E.t * 10) % (E.W + 100)) - 30; g.beginPath(); g.arc(x, E.H * b, 24, 0, TAU); g.arc(x + 26, E.H * b + 4, 20, 0, TAU); g.fill(); });
          balloons.forEach(b => {
            if (!b.alive && !b.fly) return;
            g.save(); g.globalAlpha = b.fly ? 0.45 : 1;
            g.strokeStyle = 'rgba(30,41,59,.5)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(b.x, b.y + b.w * 0.74); g.quadraticCurveTo(b.x + Math.sin(b.ph) * 10, b.y + b.w * 1.1, b.x, b.y + b.w * 1.5); g.stroke();
            g.fillStyle = b.col; g.beginPath(); g.ellipse(b.x, b.y, b.w * 0.55, b.w * 0.72, 0, 0, TAU); g.fill();
            g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(b.x - b.w * 0.2, b.y - b.w * 0.25, b.w * 0.1, b.w * 0.2, -0.5, 0, TAU); g.fill();
            g.fillStyle = b.col; g.beginPath(); g.moveTo(b.x, b.y + b.w * 0.72); g.lineTo(b.x - 5, b.y + b.w * 0.82); g.lineTo(b.x + 5, b.y + b.w * 0.82); g.fill();
            E.label(b.label, b.x, b.y - 2, b.w * 0.95, 17, '#fff', 'rgba(0,0,0,.35)'); g.restore();
          });
          pops.forEach(p => { g.strokeStyle = 'rgba(255,255,255,' + (1 - p.t / 0.4) + ')'; g.lineWidth = 3; g.beginPath(); g.arc(p.x, p.y, 20 + p.t * 140, 0, TAU); g.stroke(); });
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Bubble Shooter */
  A.register({
    id: 'bubble', name: 'Bubble Shooter', emoji: '🫧', teach: 'Shoot the bubble with the right answer',
    how: 'Drag to aim and let go to shoot (or just tap where you want to shoot). The shot flies straight and bounces off the walls. Hit the bubble that holds the right answer; hitting a wrong one costs a life.',
    make(E) {
      let bubs = [], shot = null, aim = null, wave = null, gap = 0.3, cool = 0;
      const R = () => Math.min(40, E.W * 0.105), SX = () => E.W / 2, SY = () => E.H - 52;
      function spawn() {
        const q = E.newQuestion(4), n = q.options.length, order = E.shuffle(q.options.slice()), r = R();
        wave = { q, resolved: false }; bubs = [];
        const pos = [[0.18, 0.14], [0.42, 0.25], [0.68, 0.14], [0.87, 0.27]];
        order.forEach((o, i) => { const p = pos[i % pos.length]; bubs.push({ x: E.W * p[0], y: -r * 2, ty: Math.max(r + 8, E.H * p[1] + r * 0.5), label: o, correct: o === q.a, col: PAL[(i + 1) % PAL.length], wob: 0, alive: true, r: r * 1.12 }); });
      }
      function fire(tx, ty) {
        if (shot || !wave || cool > 0) return;
        const dx = tx - SX(), dy = ty - SY(); let a = Math.atan2(dy, dx); a = E.clamp(a, -Math.PI + 0.22, -0.22);
        shot = { x: SX(), y: SY(), vx: Math.cos(a) * 900, vy: Math.sin(a) * 900, bounces: 0 };
      }
      function hit(b) {
        shot = null; cool = 0.25;
        if (b.correct) { b.alive = false; E.burst(b.x, b.y, b.col, 22); E.rightAnswer(b.x, b.y); wave.resolved = true; bubs.forEach(o => { if (o !== b) o.drift = true; }); gap = 0.5; }
        else { b.wob = 0.5; E.wrongAnswer(b.x, b.y); }
      }
      return {
        update(dt) {
          cool = Math.max(0, cool - dt);
          if (!wave) { gap -= dt; if (gap <= 0) spawn(); }
          bubs.forEach(b => { if (b.drift) b.y -= 320 * dt; else if (b.y < b.ty) b.y = Math.min(b.ty, b.y + 420 * dt); b.wob = Math.max(0, b.wob - dt); });
          if (wave && wave.resolved && bubs.every(b => !b.alive || b.y < -80)) { bubs = []; wave = null; }
          if (E.auto && !shot && wave && !wave.resolved && cool <= 0 && bubs.every(b => b.y >= b.ty - 1)) {
            const target = E.auto === 'wrong' ? bubs.find(b => !b.correct) : bubs.find(b => b.correct);
            if (target) fire(target.x, target.y);
          }
          if (shot) {
            shot.x += shot.vx * dt; shot.y += shot.vy * dt;
            const r = R() * 0.55;
            if (shot.x < r) { shot.x = r; shot.vx = Math.abs(shot.vx); shot.bounces++; }
            if (shot.x > E.W - r) { shot.x = E.W - r; shot.vx = -Math.abs(shot.vx); shot.bounces++; }
            if (shot.y < r) { shot.y = r; shot.vy = Math.abs(shot.vy); shot.bounces++; }
            const b = bubs.find(o => o.alive && !o.drift && Math.hypot(o.x - shot.x, o.y - shot.y) < o.r + r);
            if (b) hit(b); else if (shot && (shot.bounces > 3 || shot.y > SY() + 30)) { shot = null; cool = 0.15; }
          }
        },
        down(x, y) { aim = { x, y }; },
        move(x, y) { aim = { x, y }; },
        up(x, y) { if (aim) { fire(x, y); } aim = null; },
        draw(g) {
          const W = E.W, H = E.H; E.sky('#0f172a', '#312e81');
          for (let i = 0; i < 40; i++) { g.fillStyle = 'rgba(255,255,255,' + (0.25 + 0.35 * Math.abs(Math.sin(E.t + i))) + ')'; g.fillRect((i * 97) % W, (i * 53) % (H * 0.8), 2, 2); }
          bubs.forEach(b => {
            if (!b.alive) return;
            const ox = b.wob > 0 ? Math.sin(E.t * 50) * 4 : 0;
            const gr = g.createRadialGradient(b.x - b.r * 0.3 + ox, b.y - b.r * 0.3, b.r * 0.1, b.x + ox, b.y, b.r); gr.addColorStop(0, '#fff'); gr.addColorStop(0.25, b.col); gr.addColorStop(1, 'rgba(0,0,0,.35)');
            g.fillStyle = gr; g.beginPath(); g.arc(b.x + ox, b.y, b.r, 0, TAU); g.fill();
            g.strokeStyle = b.wob > 0 ? '#fecaca' : 'rgba(255,255,255,.6)'; g.lineWidth = 2; g.stroke();
            E.label(b.label, b.x + ox, b.y, b.r * 1.7, 16, '#fff', 'rgba(0,0,0,.55)');
          });
          // aim line
          const tx = aim ? aim.x : null;
          if (tx != null && !shot) {
            let a = Math.atan2(aim.y - SY(), aim.x - SX()); a = E.clamp(a, -Math.PI + 0.22, -0.22);
            g.setLineDash([6, 8]); g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = 2; g.beginPath(); g.moveTo(SX(), SY()); g.lineTo(SX() + Math.cos(a) * H, SY() + Math.sin(a) * H); g.stroke(); g.setLineDash([]);
          }
          g.fillStyle = '#475569'; E.rr(SX() - 30, SY() + 12, 60, 30, 10); g.fill();
          const sr = R() * 0.55;
          g.fillStyle = '#fde047'; g.beginPath(); g.arc(shot ? shot.x : SX(), shot ? shot.y : SY(), sr, 0, TAU); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 2; g.stroke();
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Angry Birds */
  A.register({
    id: 'birds', name: 'Angry Birds', emoji: '🐦', teach: 'Hit the crate with the right answer',
    how: 'Drag the bird back from the slingshot, aim, and let go. Smash the crate that holds the right answer. Hitting a wrong crate, or missing everything, uses up a bird.',
    make(E) {
      const GR = 900, SX = () => E.W * 0.17, SY = () => E.H * 0.7, GY = () => E.H * 0.88;
      let crates = [], bird = null, pull = null, wave = null, gap = 0.3, cool = 0, trail = [], bw = 0;
      function spawn() {
        // three towers of rising height (1, 2, 3 crates), the answer on top of each: every answer can be hit from above or from the left
        const q = E.newQuestion(3), order = E.shuffle(q.options.slice()), w = Math.min(84, E.W * 0.215), h = 44, gx = 4;
        const x0 = E.W - 3 * w - 2 * gx - 6 + w / 2;
        wave = { q, resolved: false }; crates = [];
        for (let col = 0; col < 3; col++) {
          const cx = x0 + col * (w + gx);
          for (let lvl = 0; lvl < col; lvl++) crates.push({ x: cx, y: GY() - h / 2 - lvl * h, w, h, support: true, alive: true, shake: 0 });
          const o = order[col];
          crates.push({ x: cx, y: GY() - h / 2 - col * h, w, h, label: o, correct: o === q.a, alive: true, shake: 0 });
        }
      }
      function launch(dx, dy) {          // the pull vector (bird back from the sling)
        if (bird) return;
        const d = Math.min(95, Math.hypot(dx, dy)); if (d < 12) return;
        const k = 7.4 * d / Math.hypot(dx, dy);
        bird = { x: SX() - dx * (d / Math.hypot(dx, dy)), y: SY() - dy * (d / Math.hypot(dx, dy)), vx: dx * k, vy: dy * k, t: 0 };
        trail = [];
      }
      const simulate = (dx, dy, hitTest) => {     // where the bird would be: used by the aiming dots and by the test player
        const d = Math.min(95, Math.hypot(dx, dy)), f = d / Math.hypot(dx, dy), k = 7.4 * f;
        let x = SX() - dx * f, y = SY() - dy * f, vx = dx * k, vy = dy * k;
        for (let i = 0; i < 900; i++) { x += vx / 180; y += vy / 180; vy += GR / 180; if (hitTest(x, y, i)) return i; if (y > GY()) break; }   // the same step as the flight itself
        return -1;
      };
      function aimAt(c) {              // the test player: the pull that lands on crate c first, found by trying them all
        let best = null;
        for (let ang = 0.15; ang < 1.45; ang += 0.01) for (let p = 30; p <= 95; p += 2) {
          const dx = Math.cos(ang) * p, dy = -Math.sin(ang) * p;
          let first = null;
          simulate(dx, dy, (x, y) => { const o = crates.find(k => k.alive && !k.fall && Math.abs(x - k.x) < k.w / 2 + 10 && Math.abs(y - k.y) < k.h / 2 + 10); if (o) { first = o; return true; } return false; });
          if (first === c) { const score = Math.abs(ang - 0.9) + p / 400; if (!best || score < best.score) best = { dx, dy, score }; }
        }
        return best;
      }
      function crash(c) {
        bird = null; cool = 0.5;
        if (c.support) { c.shake = 0.3; return; }               // plain wood: the bird just drops, nothing is lost
        if (c.correct) { c.alive = false; E.burst(c.x, c.y, '#fde68a', 24); E.rightAnswer(c.x, c.y); wave.resolved = true; crates.forEach(o => { if (o !== c) o.fall = true; }); gap = 0.6; }
        else { c.shake = 0.5; E.wrongAnswer(c.x, c.y); }
      }
      return {
        update(dt) {
          cool = Math.max(0, cool - dt); bw += dt;
          if (!wave) { gap -= dt; if (gap <= 0) spawn(); }
          crates.forEach(c => { c.shake = Math.max(0, c.shake - dt); if (c.fall) c.y += 500 * dt; });
          if (wave && wave.resolved && crates.every(c => !c.alive || c.y > E.H + 60)) { crates = []; wave = null; }
          if (E.auto && !bird && wave && !wave.resolved && cool <= 0 && !pull) {
            const target = E.auto === 'wrong' ? crates.find(c => !c.correct && !c.support && c.alive) : crates.find(c => c.correct);
            if (target && wave.aimFor !== target) { wave.aimFor = target; wave.aim = aimAt(target) || { dx: 40, dy: -40 }; }
            if (target && wave.aim) launch(wave.aim.dx, wave.aim.dy);
          }
          if (bird) {
            bird.t += dt; trail.push([bird.x, bird.y]); if (trail.length > 26) trail.shift();
            const steps = 3; for (let s = 0; s < steps && bird; s++) {
              bird.x += bird.vx * dt / steps; bird.y += bird.vy * dt / steps; bird.vy += GR * dt / steps;
              const c = crates.find(o => o.alive && !o.fall && Math.abs(bird.x - o.x) < o.w / 2 + 10 && Math.abs(bird.y - o.y) < o.h / 2 + 10);
              if (c) { crash(c); break; }
              if (bird.y > GY() - 8 || bird.x > E.W + 30 || bird.x < -30) { E.wrongAnswer(bird.x, GY() - 20); bird = null; cool = 0.6; break; }
            }
          }
        },
        down(x, y) { if (!bird && Math.hypot(x - SX(), y - SY()) < 70) pull = { x, y }; },
        move(x, y) { if (pull) pull = { x, y }; },
        up(x, y) { if (pull) { launch(SX() - x, SY() - y); pull = null; } },
        draw(g) {
          const W = E.W, H = E.H; E.sky('#7dd3fc', '#fef9c3');
          g.fillStyle = '#86efac'; g.beginPath(); g.ellipse(W * 0.3, GY() + 40, W * 0.8, 90, 0, 0, TAU); g.fill();
          g.fillStyle = '#65a30d'; g.fillRect(0, GY(), W, H - GY());
          g.fillStyle = '#854d0e'; g.fillRect(SX() - 5, SY(), 10, GY() - SY()); g.fillRect(SX() - 18, SY() - 8, 8, 24); g.fillRect(SX() + 10, SY() - 8, 8, 24);
          crates.forEach(c => {
            if (!c.alive) return; const ox = c.shake > 0 ? Math.sin(E.t * 60) * 4 : 0;
            g.fillStyle = '#d97706'; E.rr(c.x - c.w / 2 + ox, c.y - c.h / 2, c.w, c.h, 6); g.fill(); g.lineWidth = 3; g.strokeStyle = '#78350f'; g.stroke();
            g.strokeStyle = 'rgba(120,53,15,.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(c.x - c.w / 2 + 6 + ox, c.y - c.h / 2 + 4); g.lineTo(c.x + c.w / 2 - 6 + ox, c.y + c.h / 2 - 4); g.stroke();
            if (!c.support) { g.fillStyle = 'rgba(255,255,255,.92)'; E.rr(c.x - c.w / 2 + 5 + ox, c.y - 12, c.w - 10, 24, 8); g.fill(); E.label(c.label, c.x + ox, c.y, c.w - 18, 14, '#7c2d12'); }
          });
          if (pull && !bird) {
            const dx = SX() - pull.x, dy = SY() - pull.y;
            if (Math.hypot(dx, dy) > 8) { const f = Math.min(95, Math.hypot(dx, dy)) / Math.hypot(dx, dy); const px = SX() - dx * f, py = SY() - dy * f;
              g.strokeStyle = '#3f2c14'; g.lineWidth = 4; g.beginPath(); g.moveTo(SX() - 14, SY() - 2); g.lineTo(px, py); g.lineTo(SX() + 14, SY() - 2); g.stroke();
              g.fillStyle = 'rgba(15,23,42,.6)'; let i = 0; simulate(dx, dy, (x, y) => { if (i++ % 6 === 0 && i < 90) { g.beginPath(); g.arc(x, y, 3, 0, TAU); g.fill(); } return false; });
              E.emoji('🐦', px, py, 34); }
          } else if (!bird) E.emoji('🐦', SX(), SY() - 8, 34);
          if (bird) { g.fillStyle = 'rgba(15,23,42,.3)'; trail.forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 3, 0, TAU); g.fill(); }); E.emoji('🐦', bird.x, bird.y, 34, bird.t * 8); }
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Football Penalty */
  A.register({
    id: 'penalty', name: 'Football Penalty', emoji: '⚽', teach: 'Score goals with the right answers',
    how: 'The goal has three corners and each shows an answer. Tap the corner you want to shoot at (or swipe up to the left, middle or right). Pick the right answer and the ball is in the net; a wrong answer is saved by the keeper.',
    make(E) {
      let kick = null, q = null, keeper = 1, kx = 1, pause = 0.5, state = 'wait', labels = [], correct = 0, result = null;
      const GX = () => E.W * 0.06, GW = () => E.W * 0.88, GYt = () => E.H * 0.13, GH = () => E.H * 0.3;
      const zx = i => GX() + GW() * (i + 0.5) / 3, zy = () => GYt() + GH() * 0.62;
      function ask() {
        q = E.newQuestion(3); correct = E.ri(0, 2); const wr = q.options.filter(o => o !== q.a); let w = 0; labels = [];
        for (let i = 0; i < 3; i++) labels.push(i === correct ? q.a : wr[w++ % wr.length]);
        state = 'aim'; result = null; kick = null;
      }
      function shoot(i) {
        if (state !== 'aim') return; state = 'fly';
        const ok = i === correct, other = [0, 1, 2].filter(z => z !== i && z !== correct);
        kick = { t: 0, i, ok, dive: ok ? E.pick([0, 1, 2].filter(z => z !== correct)) : i };
        keeper = kick.dive;
      }
      return {
        update(dt) {
          kx += (keeper - kx) * Math.min(1, dt * (state === 'fly' ? 9 : 3));
          if (state === 'wait') { pause -= dt; if (pause <= 0) ask(); return; }
          if (state === 'aim') {
            if (E.auto) shoot(E.auto === 'wrong' ? (correct + 1) % 3 : correct);
            else keeper = 1 + Math.sin(E.t * 2.2) * 0.7;
            return;
          }
          if (state === 'fly') {
            kick.t += dt;
            if (kick.t >= 0.55) { state = 'res'; pause = 1.1; if (kick.ok) E.rightAnswer(zx(kick.i), zy()); else E.wrongAnswer(zx(kick.i), zy()); result = kick.ok ? 'goal' : 'saved'; }
          } else if (state === 'res') { pause -= dt; if (pause <= 0) { state = 'wait'; pause = 0.15; } }
        },
        tap(x, y) { if (state === 'aim') shoot(E.clamp(Math.floor((x - GX()) / (GW() / 3)), 0, 2)); },
        swipe(dir, dx) { if (state === 'aim') { if (dir === 'left') shoot(0); else if (dir === 'right') shoot(2); else if (dir === 'up') shoot(Math.abs(dx) < 30 ? 1 : dx < 0 ? 0 : 2); } },
        key(k) { if (state === 'aim') { if (k === 'left') shoot(0); else if (k === 'right') shoot(2); else if (k === 'up' || k === 'action') shoot(1); } },
        draw(g) {
          const W = E.W, H = E.H; E.sky('#065f46', '#16a34a');
          for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.05)'; g.fillRect(0, GYt() + GH() + (H - GYt() - GH()) * i / 8, W, (H - GYt() - GH()) / 8); }
          g.fillStyle = '#0b3d2e'; g.fillRect(0, 0, W, GYt()); g.fillStyle = 'rgba(255,255,255,.15)'; for (let i = 0; i < 30; i++) g.fillRect((i * 37) % W, (i * 11) % (GYt() - 4), 3, 3);
          // the goal with its net
          g.strokeStyle = 'rgba(255,255,255,.28)'; g.lineWidth = 1; for (let i = 0; i <= 12; i++) { g.beginPath(); g.moveTo(GX() + GW() * i / 12, GYt()); g.lineTo(GX() + GW() * i / 12, GYt() + GH()); g.stroke(); } for (let i = 0; i <= 6; i++) { g.beginPath(); g.moveTo(GX(), GYt() + GH() * i / 6); g.lineTo(GX() + GW(), GYt() + GH() * i / 6); g.stroke(); }
          for (let i = 0; i < 3; i++) {
            const hot = state !== 'aim' && kick && kick.i === i;
            g.fillStyle = hot ? (kick.ok ? 'rgba(34,197,94,.55)' : 'rgba(239,68,68,.5)') : 'rgba(255,255,255,.08)'; g.fillRect(GX() + GW() * i / 3 + 2, GYt() + 2, GW() / 3 - 4, GH() - 2);
            if (labels[i] != null) { g.fillStyle = 'rgba(15,23,42,.78)'; E.rr(zx(i) - GW() / 6 + 6, zy() - 17, GW() / 3 - 12, 34, 10); g.fill(); E.label(labels[i], zx(i), zy(), GW() / 3 - 24, 17, '#fff'); }
          }
          g.strokeStyle = '#fff'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(GX(), GYt() + GH()); g.lineTo(GX(), GYt()); g.lineTo(GX() + GW(), GYt()); g.lineTo(GX() + GW(), GYt() + GH()); g.stroke();
          // the keeper
          const kpx = GX() + GW() * (kx + 0.5) / 3, dive = state === 'fly' || state === 'res' ? Math.min(1, (kick ? kick.t : 0) / 0.4) : 0;
          E.emoji('🧤', kpx, GYt() + GH() * 0.68 - dive * 14, 46, (kx - 1) * 0.5 * dive);
          // the ball
          const t = state === 'fly' ? Math.min(1, kick.t / 0.55) : state === 'res' ? 1 : 0, bx0 = W / 2, by0 = H * 0.84;
          const tx = kick ? zx(kick.i) : bx0, ty = kick ? zy() : by0, ease = 1 - Math.pow(1 - t, 2);
          g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(bx0, by0 + 22, 20, 6, 0, 0, TAU); g.fill();
          E.emoji('⚽', bx0 + (tx - bx0) * ease, by0 + (ty - by0) * ease, 44 - 18 * ease, t * 14);
          if (result) { g.font = '900 ' + Math.round(W * 0.14) + 'px ' + E.FONT; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineWidth = 6; g.strokeStyle = 'rgba(0,0,0,.5)'; g.strokeText(result === 'goal' ? 'GOAL!' : 'SAVED!', W / 2, H * 0.56); g.fillStyle = result === 'goal' ? '#fde047' : '#fca5a5'; g.fillText(result === 'goal' ? 'GOAL!' : 'SAVED!', W / 2, H * 0.56); }
        },
      };
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
