/* sb_arcade_puzzle.js — three arcade games played on a grid: Snake, Candy Crush (match the answers) and Treasure Hunt.
 * Same contract as sb_arcade_runners.js. A game may carry `goal` (how many right answers finish it); the default is 8. */
(function (root) {
  'use strict';
  const A = root.SBArcade; if (!A) return;
  const TAU = Math.PI * 2;

  /* ---------------------------------------------------------------- Snake */
  A.register({
    id: 'snake', name: 'Snake', emoji: '🐍', teach: 'Eat the right answer to grow',
    how: 'Swipe (or tap the side you want to turn to) to steer the snake. Eat the food that holds the right answer and the snake grows. A wrong answer, or biting your own tail, costs a life. The snake comes out of the other side of the screen.',
    make(E) {
      let cell = 36, cols = 10, rows = 14, ox = 0, oy = 0;
      let snake = [], dir = { x: 1, y: 0 }, queued = null, acc = 0, foods = [], wave = null, grow = 0, dead = 0, boom = 0;
      const tick = () => Math.max(0.115, 0.23 - 0.012 * E.right);
      const key = (x, y) => x + ',' + y;
      function layout() { cell = Math.max(28, Math.floor(E.W / 10)); cols = Math.floor(E.W / cell); rows = Math.max(8, Math.floor(E.H / cell)); ox = Math.floor((E.W - cols * cell) / 2); oy = Math.floor((E.H - rows * cell) / 2); }
      function reset() {
        const y = Math.floor(rows / 2); snake = []; for (let i = 0; i < 3; i++) snake.push({ x: Math.max(2, Math.floor(cols / 4)) - i, y }); dir = { x: 1, y: 0 }; queued = null; grow = 0;
      }
      const free = () => { const occ = new Set(snake.map(s => key(s.x, s.y))); foods.forEach(f => occ.add(key(f.x, f.y))); const out = []; for (let x = 1; x < cols - 1; x++) for (let y = 1; y < rows - 1; y++) if (!occ.has(key(x, y))) out.push({ x, y }); return out; };
      function spawn() {
        const q = E.newQuestion(3); wave = { q }; foods = [];
        const head = snake[0];
        q.options.forEach(o => {
          const cand = free().filter(c => Math.abs(c.x - head.x) + Math.abs(c.y - head.y) >= 3 && foods.every(f => Math.abs(f.x - c.x) + Math.abs(f.y - c.y) >= 3));
          const c = cand.length ? E.pick(cand) : E.pick(free());
          foods.push({ x: c.x, y: c.y, label: o, correct: o === q.a });
        });
      }
      function turn(d) { const c = queued || dir; if (d.x === -c.x && d.y === -c.y) return; queued = d; }
      const DIRS = { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: 1 } };
      function botDir() {                       // breadth-first search with wrap-around to the wanted food
        const want = foods.find(f => E.auto === 'wrong' ? !f.correct : f.correct); if (!want) return;
        const body = new Set(snake.slice(0, -1).map(s => key(s.x, s.y))), h = snake[0];
        const start = key(h.x, h.y), target = key(want.x, want.y), prev = new Map([[start, null]]), queue = [[h.x, h.y]];
        while (queue.length) {
          const [x, y] = queue.shift(); if (key(x, y) === target) break;
          Object.values(DIRS).forEach(d => {
            const nx = (x + d.x + cols) % cols, ny = (y + d.y + rows) % rows, k = key(nx, ny);
            if (prev.has(k) || body.has(k)) return;
            if (foods.some(f => f !== want && f.x === nx && f.y === ny)) return;
            prev.set(k, key(x, y)); queue.push([nx, ny]);
          });
        }
        if (!prev.has(target)) return;
        let c = target; while (prev.get(c) !== start && prev.get(c) !== null) c = prev.get(c);
        const [cx, cy] = c.split(',').map(Number);
        const d = { x: ((cx - h.x + cols + 1) % cols) - 1, y: ((cy - h.y + rows + 1) % rows) - 1 };
        if (Math.abs(d.x) + Math.abs(d.y) === 1) turn(d);
      }
      function advance() {
        if (queued) { dir = queued; queued = null; }
        const h = snake[0], nx = (h.x + dir.x + cols) % cols, ny = (h.y + dir.y + rows) % rows;
        const body = snake.slice(0, grow > 0 ? snake.length : snake.length - 1);
        if (body.some(s => s.x === nx && s.y === ny)) { E.wrongAnswer(ox + nx * cell + cell / 2, oy + ny * cell + cell / 2); snake = snake.slice(0, Math.max(3, Math.floor(snake.length / 2))); dead = 0.4; return; }
        snake.unshift({ x: nx, y: ny });
        const f = foods.find(o => o.x === nx && o.y === ny);
        if (f) {
          const px = ox + nx * cell + cell / 2, py = oy + ny * cell + cell / 2;
          if (f.correct) { grow += 2; boom = 0.3; E.rightAnswer(px, py); foods = []; wave = null; if (E.state === 'play') spawn(); }
          else { foods.splice(foods.indexOf(f), 1); E.wrongAnswer(px, py); snake.length = Math.max(3, snake.length - 2); const c = E.pick(free()); if (c) foods.push({ x: c.x, y: c.y, label: f.label, correct: false }); }
        }
        if (grow > 0) grow--; else snake.pop();
      }
      layout(); reset(); spawn();
      return {
        resize() { layout(); snake.forEach(s => { s.x = Math.min(s.x, cols - 1); s.y = Math.min(s.y, rows - 1); }); foods.forEach(f => { f.x = Math.min(f.x, cols - 1); f.y = Math.min(f.y, rows - 1); }); },
        update(dt) {
          dead = Math.max(0, dead - dt); boom = Math.max(0, boom - dt); acc += dt;
          while (acc >= tick()) { acc -= tick(); if (E.auto) botDir(); advance(); if (E.state !== 'play') break; }
        },
        swipe(d) { turn(DIRS[d]); },
        tap(x, y) { const h = snake[0], hx = ox + h.x * cell + cell / 2, hy = oy + h.y * cell + cell / 2, dx = x - hx, dy = y - hy; turn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? DIRS.right : DIRS.left) : (dy > 0 ? DIRS.down : DIRS.up)); },
        key(k) { if (DIRS[k]) turn(DIRS[k]); },
        draw(g) {
          const W = E.W, H = E.H;
          g.fillStyle = '#14532d'; g.fillRect(0, 0, W, H);
          for (let x = 0; x < cols; x++) for (let y = 0; y < rows; y++) { g.fillStyle = (x + y) % 2 ? '#166534' : '#15803d'; g.fillRect(ox + x * cell, oy + y * cell, cell, cell); }
          foods.forEach(f => {
            const cx = ox + f.x * cell + cell / 2, cy = oy + f.y * cell + cell / 2, w = Math.min(cell * 3.2, W * 0.34), pulse = 1 + Math.sin(E.t * 6 + f.x) * 0.04;
            g.save(); g.translate(cx, cy); g.scale(pulse, pulse); g.fillStyle = '#fde047'; E.rr(-w / 2, -cell * 0.42, w, cell * 0.84, cell * 0.42); g.fill(); g.lineWidth = 2; g.strokeStyle = '#a16207'; g.stroke();
            E.label(f.label, 0, 0, w - 8, Math.max(12, cell * 0.42), '#422006'); g.restore();
          });
          snake.forEach((s, i) => {
            const x = ox + s.x * cell, y = oy + s.y * cell, k = 1 - i / (snake.length + 6) * 0.35;
            g.fillStyle = dead > 0 && Math.floor(E.t * 20) % 2 ? '#fca5a5' : (i % 2 ? '#34d399' : '#10b981'); E.rr(x + cell * (1 - k) / 2, y + cell * (1 - k) / 2, cell * k, cell * k, cell * 0.3); g.fill();
            if (i === 0) {
              g.fillStyle = '#fff'; const cx = x + cell / 2, cy = y + cell / 2, fx = dir.x * cell * 0.18, fy = dir.y * cell * 0.18, px = -dir.y * cell * 0.16, py = dir.x * cell * 0.16;
              [1, -1].forEach(sg => { g.beginPath(); g.arc(cx + fx + sg * px, cy + fy + sg * py, cell * 0.09, 0, TAU); g.fill(); });
            }
          });
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Candy Crush (match the answers) */
  A.register({
    id: 'candy', name: 'Candy Crush', emoji: '🍬', teach: 'Match every clue with its answer',
    how: 'Each sweet on the left is a clue from the page; each sweet on the right is an answer. Tap a clue, then tap its answer: the pair pops and new sweets drop in. A wrong match costs a life.',
    make(E) {
      const N = 4, COL = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];
      let left = [], right = [], sel = -1, shakeL = -1, shakeR = -1, busy = 0;
      const snippet = q => {
        const i = q.indexOf('_____'); if (i < 0) return q.slice(0, 30);
        const words = q.slice(0, i).trim().split(/\s+/), after = q.slice(i + 5).trim().split(/\s+/);
        const pre = words.slice(-3).join(' '), post = after.slice(0, 2).join(' ');
        return (words.length > 3 ? '… ' : '') + (pre ? pre + ' ' : '') + '＿＿＿' + (post ? ' ' + post : '') + (after.length > 2 ? ' …' : '');
      };
      function fresh(slot) {
        let it, tries = 0;
        do { it = E.feed.next(2); tries++; } while (left.some(l => l && l.id === it.id) && tries < 12);
        return { id: it.id, q: it.q, a: it.a, text: snippet(it.q), c: E.ri(0, COL.length - 1), drop: 1, pop: 0 };
      }
      function deal() {
        left = []; for (let i = 0; i < N; i++) left.push(fresh(i));
        right = E.shuffle(left.map(l => ({ id: l.id, text: l.a, c: (l.c + 2) % COL.length, drop: 1, pop: 0 })));
        sel = -1; E.setQuestion(null);
      }
      const geom = () => { const pad = 10, gap = 10, w = (E.W - pad * 2 - gap) / 2, h = Math.min(92, (E.H - pad * 2 - gap * (N - 1)) / N); const top = pad + (E.H - pad * 2 - (h * N + gap * (N - 1))) / 2; return { pad, gap, w, h, top }; };
      const rect = (col, i) => { const G = geom(); return { x: G.pad + col * (G.w + G.gap), y: G.top + i * (G.h + G.gap), w: G.w, h: G.h }; };
      function pick(col, i) {
        if (busy > 0) return;
        if (col === 0) { sel = i; E.setQuestion({ q: left[i].q, a: left[i].a }); return; }
        if (sel < 0) { E.toast('⬅'); return; }
        const a = left[sel], b = right[i], ra = rect(0, sel), rb = rect(1, i);
        if (a.id === b.id) {
          const x = (ra.x + rb.x + rb.w) / 2, y = (ra.y + rb.y) / 2 + ra.h / 2;
          a.pop = 0.0001; b.pop = 0.0001; busy = 0.45; const s = sel; sel = -1;
          E.rightAnswer(x, y);
          if (E.state === 'play') E.later(0.4, () => { left[s] = fresh(s); const ni = right.findIndex(r => r.id === a.id); right[ni] = { id: left[s].id, text: left[s].a, c: (left[s].c + 2) % COL.length, drop: 1, pop: 0 }; E.shuffle(right); E.setQuestion(null); });
        } else { shakeL = sel; shakeR = i; busy = 0.5; E.wrongAnswer((ra.x + rb.x) / 2 + ra.w / 2, ra.y + ra.h / 2); sel = -1; }
      }
      deal();
      return {
        update(dt) {
          busy = Math.max(0, busy - dt);
          if (busy <= 0) { shakeL = shakeR = -1; }
          [left, right].forEach(col => col.forEach(c => { c.drop = Math.max(0, c.drop - dt * 3); if (c.pop) c.pop += dt; }));
          if (E.auto && busy <= 0 && sel < 0 && left.every(l => !l.pop)) {
            const i = 0, j = E.auto === 'wrong' ? right.findIndex(r => r.id !== left[i].id) : right.findIndex(r => r.id === left[i].id);
            pick(0, i); busy = 0; pick(1, j);
          }
        },
        tap(x, y) {
          for (let col = 0; col < 2; col++) for (let i = 0; i < N; i++) { const r = rect(col, i); if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) { pick(col, i); return; } }
        },
        draw(g) {
          E.sky('#4c1d95', '#be185d');
          [left, right].forEach((arr, col) => arr.forEach((c, i) => {
            const r = rect(col, i); if (c.pop > 0.45) return;
            const ox = (col === 0 ? shakeL === i : shakeR === i) && busy > 0 ? Math.sin(E.t * 60) * 5 : 0, sc = c.pop ? 1 + c.pop * 1.2 : 1, ya = -c.drop * 80;
            g.save(); g.globalAlpha = c.pop ? Math.max(0, 1 - c.pop / 0.4) : 1 - c.drop * 0.6; g.translate(r.x + r.w / 2 + ox, r.y + r.h / 2 + ya); g.scale(sc, sc);
            const gr = g.createLinearGradient(0, -r.h / 2, 0, r.h / 2); gr.addColorStop(0, '#fff'); gr.addColorStop(0.18, COL[c.c]); gr.addColorStop(1, 'rgba(0,0,0,.45)');
            g.fillStyle = gr; E.rr(-r.w / 2, -r.h / 2, r.w, r.h, 20); g.fill(); g.lineWidth = col === 0 && sel === i ? 5 : 2; g.strokeStyle = col === 0 && sel === i ? '#fde047' : 'rgba(255,255,255,.8)'; g.stroke();
            g.fillStyle = 'rgba(255,255,255,.35)'; E.rr(-r.w / 2 + 10, -r.h / 2 + 6, r.w - 20, r.h * 0.22, 8); g.fill();
            E.label(c.text, 0, 3, r.w - 20, col === 0 ? 15 : 19, '#fff', 'rgba(0,0,0,.45)'); g.restore();
          }));
        },
      };
    },
  });

  /* ---------------------------------------------------------------- Treasure Hunt */
  A.register({
    id: 'treasure', name: 'Treasure Hunt', emoji: '🗺️', goal: 3, teach: 'Solve the clues to open the gates to the treasure',
    how: 'Tap a square to walk there. The treasure is behind locked gates: walk into a gate and solve its clue (tap the right answer). A wrong answer costs a life; the gate stays locked until you solve it.',
    make(E) {
      let cell = 40, cols = 7, rows = 10, ox = 0, oy = 0, map = [], gates = [], me = { x: 0, y: 0 }, path = [], stepT = 0, asking = false, chest = { x: 6, y: 0 }, opened = false, face = 1;
      const T = { FLOOR: 0, ROCK: 1, WALL: 2, GATE: 3 };
      function layout() { cell = Math.floor(Math.min(E.W / cols, (E.H - 8) / 10)); rows = Math.max(7, Math.min(11, Math.floor(E.H / cell))); ox = Math.floor((E.W - cols * cell) / 2); oy = Math.floor((E.H - rows * cell) / 2); }
      const at = (x, y) => (x < 0 || y < 0 || x >= cols || y >= rows) ? T.WALL : map[y][x];
      function build() {
        for (let attempt = 0; attempt < 60; attempt++) {
          map = []; for (let y = 0; y < rows; y++) { map.push([]); for (let x = 0; x < cols; x++) map[y].push(E.R() < 0.14 ? T.ROCK : T.FLOOR); }
          gates = []; const bands = [Math.floor(rows * 0.68), Math.floor(rows * 0.38), 1];
          bands.forEach((by, k) => { const gx = E.ri(1, cols - 2); for (let x = 0; x < cols; x++) map[by][x] = x === gx ? T.GATE : T.WALL; gates.push({ x: gx, y: by, open: false }); });
          me = { x: E.ri(0, cols - 1), y: rows - 1 }; chest = { x: E.ri(0, cols - 1), y: 0 };
          map[me.y][me.x] = T.FLOOR; map[chest.y][chest.x] = T.FLOOR;
          // every region must be reachable once the gates are open
          const seen = new Set([me.x + ',' + me.y]), q = [[me.x, me.y]];
          while (q.length) { const [x, y] = q.shift(); [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { const nx = x + dx, ny = y + dy, t = at(nx, ny); if ((t === T.FLOOR || t === T.GATE) && !seen.has(nx + ',' + ny)) { seen.add(nx + ',' + ny); q.push([nx, ny]); } }); }
          if (seen.has(chest.x + ',' + chest.y) && gates.every(gt => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => seen.has((gt.x + dx) + ',' + (gt.y + dy)) && at(gt.x + dx, gt.y + dy) === T.FLOOR))) return;
        }
      }
      const gateAt = (x, y) => gates.find(g2 => g2.x === x && g2.y === y);
      const passable = (x, y) => { const t = at(x, y); return t === T.FLOOR || (t === T.GATE); };
      function route(tx, ty) {
        const prev = new Map(), s = me.x + ',' + me.y; prev.set(s, null); const q = [[me.x, me.y]];
        while (q.length) {
          const [x, y] = q.shift(); if (x === tx && y === ty) break;
          [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { const nx = x + dx, ny = y + dy, k = nx + ',' + ny; if (!prev.has(k) && passable(nx, ny)) { prev.set(k, [x, y]); q.push([nx, ny]); } });
        }
        const out = []; let cur = tx + ',' + ty; if (!prev.has(cur)) return [];
        while (cur !== s) { const [x, y] = cur.split(',').map(Number); out.unshift({ x, y }); const p = prev.get(cur); cur = p[0] + ',' + p[1]; }
        return out;
      }
      function ask(g2) {
        asking = true; path = [];
        const q = E.newQuestion(3);
        E.ask(q, ok => {
          asking = false;
          const px = ox + g2.x * cell + cell / 2, py = oy + g2.y * cell + cell / 2;
          if (ok) { g2.open = true; map[g2.y][g2.x] = T.FLOOR; E.rightAnswer(px, py); me = { x: g2.x, y: g2.y }; if (gates.every(z => z.open)) opened = true; }
          else E.wrongAnswer(px, py);
        });
        if (E.auto) E.later(0.3, () => E.askPick(E.auto !== 'wrong'));
      }
      layout(); build();
      return {
        resize() { layout(); },
        update(dt) {
          if (asking) return;
          if (E.auto && !path.length) {
            const nextGate = gates.find(z => !z.open);
            const tx = nextGate ? nextGate.x : chest.x, ty = nextGate ? nextGate.y : chest.y, p = route(tx, ty); if (p.length) path = p;
          }
          if (!path.length) return;
          stepT += dt; if (stepT < 0.12) return; stepT = 0;
          const n = path.shift(), g2 = gateAt(n.x, n.y);
          if (g2 && !g2.open) { ask(g2); return; }
          if (n.x !== me.x) face = n.x > me.x ? 1 : -1;
          me = { x: n.x, y: n.y };
        },
        tap(x, y) {
          if (asking) return; const cx = Math.floor((x - ox) / cell), cy = Math.floor((y - oy) / cell);
          if (cx < 0 || cy < 0 || cx >= cols || cy >= rows || !passable(cx, cy)) return;
          path = route(cx, cy);
        },
        draw(g) {
          const W = E.W, H = E.H; g.fillStyle = '#1d4ed8'; g.fillRect(0, 0, W, H);
          for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
            const t = map[y][x], px = ox + x * cell, py = oy + y * cell;
            g.fillStyle = (x + y) % 2 ? '#fde68a' : '#fcd34d'; g.fillRect(px, py, cell, cell);
            if (t === T.WALL) { g.fillStyle = '#78350f'; g.fillRect(px, py + cell * 0.1, cell, cell * 0.9); g.fillStyle = '#92400e'; g.fillRect(px + 2, py + cell * 0.1 + 2, cell - 4, cell * 0.35); g.fillRect(px + cell * 0.2, py + cell * 0.55, cell * 0.6, cell * 0.35); }
            else if (t === T.ROCK) E.emoji('🪨', px + cell / 2, py + cell / 2, cell * 0.8);
            else if (t === T.GATE) { g.fillStyle = '#7f1d1d'; g.fillRect(px + 2, py + 2, cell - 4, cell - 4); E.emoji('🔒', px + cell / 2, py + cell / 2, cell * 0.62); }
          }
          gates.forEach(z => { if (z.open) { g.fillStyle = 'rgba(34,197,94,.35)'; g.fillRect(ox + z.x * cell, oy + z.y * cell, cell, cell); } });
          E.emoji(opened ? '🏆' : '🧰', ox + chest.x * cell + cell / 2, oy + chest.y * cell + cell / 2, cell * 0.78);
          g.save(); g.translate(ox + me.x * cell + cell / 2, oy + me.y * cell + cell / 2 - Math.abs(Math.sin(E.t * 10)) * (path.length ? 4 : 0)); g.scale(face, 1); E.emoji('🧭', 0, 0, cell * 0.78); g.restore();
          if (path.length) { g.fillStyle = 'rgba(15,23,42,.45)'; path.forEach(p => { g.beginPath(); g.arc(ox + p.x * cell + cell / 2, oy + p.y * cell + cell / 2, 4, 0, TAU); g.fill(); }); }
        },
      };
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
