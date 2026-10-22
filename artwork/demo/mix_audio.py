"""Mixes the soundtrack of a demo video from a timeline json: the narration voice (clear and in front), a cheerful background tune that
ducks under the voice, and sound effects (taps, swishes, pops, success sparkles, the answer fanfare, intro and "coming soon" chimes).
    python mix_audio.py timeline_en.json demo-audio_en.wav voice_en
Output: 44.1 kHz stereo 16-bit wav.
"""
import json
import os
import sys
import wave

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 44100
tl_path, out_path, voice_dir = sys.argv[1], sys.argv[2], sys.argv[3]
tl = json.load(open(tl_path, encoding='utf8'))
total = tl['total']
N = int((total + 1.0) * SR)
rng = np.random.default_rng(7)


class Track:
    def __init__(self):
        self.L = np.zeros(N)
        self.R = np.zeros(N)

    def add(self, sig, at, pan=0.0, gain=1.0):
        i = int(at * SR)
        if i < 0 or i >= N:
            return
        sig = sig[: N - i]
        self.L[i:i + len(sig)] += sig * gain * (1 - max(0, pan))
        self.R[i:i + len(sig)] += sig * gain * (1 + min(0, pan))


def read_wav(path):
    with wave.open(path) as w:
        raw = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').astype(np.float64) / 32768
        if w.getnchannels() == 2:
            raw = raw.reshape(-1, 2).mean(axis=1)
    return raw


def hz(semi_from_c4):
    return 261.63 * 2 ** (semi_from_c4 / 12)


def tone(f, dur, attack=.005, decay=None, harm=((1, 1.0),)):
    n = int(dur * SR)
    x = np.arange(n) / SR
    env = np.minimum(1, x / attack) * np.exp(-x / (decay or dur / 3))
    return sum(a * np.sin(2 * np.pi * f * h * x) for h, a in harm) * env


def bell(f, dur=1.2, gain=1.0):
    return tone(f, dur, .004, dur / 4, ((1, 1.0), (2, .45), (3, .22), (4.2, .12))) * gain


def pluck(f, dur=.5):
    # a soft marimba / kalimba pluck
    return tone(f, dur, .003, dur / 5, ((1, 1.0), (2, .25), (4, .08))) * .8


def lowpass(x, k):
    # a moving average (cumulative sums, so it stays fast on a whole soundtrack)
    c = np.cumsum(np.insert(x, 0, 0.0))
    k = max(1, int(k))
    out = np.empty_like(x)
    h = k // 2
    idx = np.arange(len(x))
    lo = np.clip(idx - h, 0, len(x)); hi = np.clip(idx - h + k, 0, len(x))
    out[:] = (c[hi] - c[lo]) / k
    return out


def noise(dur):
    return rng.standard_normal(int(dur * SR))


def sweep(f0, f1, dur, env_decay=None):
    n = int(dur * SR)
    x = np.arange(n) / SR
    f = f0 * (f1 / f0) ** (x / dur)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-x / (env_decay or dur / 3))


# ------------------------------------------------------------------ sound effects
def fx_tap():
    return tone(1250, .08, .001, .018) * .30 + tone(620, .08, .001, .03) * .22


def fx_swish():
    d = .32
    n = int(d * SR); x = np.arange(n) / SR
    body = lowpass(noise(d), 40) * np.sin(np.pi * x / d) ** 2
    return body * 1.6


def fx_whoosh():
    d = .7
    n = int(d * SR); x = np.arange(n) / SR
    env = np.sin(np.pi * np.clip(x / d, 0, 1)) ** 1.5
    n1 = lowpass(noise(d), 18) * env * 2.2
    return n1 + sweep(300, 1800, d, d * .5) * .10 * env


def fx_pop():
    return sweep(480, 960, .12, .05) * .55


def fx_wrong():
    x, y = sweep(330, 250, .22, .09), .6 * sweep(247, 185, .30, .12)
    out = np.zeros(max(len(x), len(y))); out[:len(x)] += x; out[:len(y)] += y
    return out * .38


def fx_success():
    out = np.zeros(int(.9 * SR))
    for i, s in enumerate((12, 16, 19, 24)):
        b = bell(hz(s), .6, .30); j = int(i * .07 * SR); out[j:j + len(b)] += b[:len(out) - j]
    return out


def fx_fanfare():
    out = np.zeros(int(2.8 * SR))
    for i, s in enumerate((7, 12, 16, 19, 24, 28)):
        b = bell(hz(s), 1.6, .30); j = int(i * .09 * SR); out[j:j + len(b)] += b[:len(out) - j]
    chord = sum(tone(hz(s), 2.4, .05, 1.0, ((1, 1.0), (2, .3))) for s in (12, 16, 19)) * .10
    out[:len(chord)] += chord[:len(out)]
    return out


FX = {'tap': fx_tap, 'swish': fx_swish, 'whoosh': fx_whoosh, 'pop': fx_pop, 'wrong': fx_wrong, 'success': fx_success, 'fanfare': fx_fanfare}
fxcache = {}


def sfx(kind):
    if kind not in fxcache:
        fxcache[kind] = FX[kind]()
    return fxcache[kind]


# ------------------------------------------------------------------ voice (and where it is speaking, for ducking)
V = Track()
act = np.zeros(N)
for item in tl['voice']:
    wav = os.path.join(voice_dir, item['say'] + '.wav')
    if not os.path.exists(wav):
        print('missing', wav)
        continue
    v = read_wav(wav)
    rms = np.sqrt(np.mean(v ** 2)) + 1e-9
    v = v / rms * .07                                    # every line at the same loudness
    v = np.tanh(v * 1.6) / np.tanh(1.6) * 1.0             # soft peak control
    V.add(v, item['at'])
    i0 = int(item['at'] * SR)
    act[i0:i0 + len(v)] = 1.0

# ------------------------------------------------------------------ music: a bright, simple tune (C - G - Am - F), 100 beats a minute
M = Track()
beat = 60 / 100
bar = 4 * beat
progression = [(0, 4, 7), (7, 11, 14), (9, 12, 16), (5, 9, 12)]
scale = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21]                   # C major pentatonic over two octaves
bars = int(total / bar) + 2
for b in range(bars):
    t0 = b * bar
    ch = progression[b % 4]
    # pad
    n = int((bar + .8) * SR); x = np.arange(n) / SR
    env = np.minimum(1, x / .6) * np.minimum(1, (bar + .8 - x) / .8)
    pad = sum(np.sin(2 * np.pi * hz(c - 12) * x) + .4 * np.sin(2 * np.pi * hz(c) * 1.002 * x) for c in ch) / len(ch) * env * .16
    M.add(pad, t0)
    # bass on beats 1 and 3
    for k in (0, 2):
        M.add(tone(hz(ch[0] - 24), beat * 1.6, .01, .35, ((1, 1.0), (2, .3))) * .55, t0 + k * beat)
    # arpeggio, eighth notes (starts after the first bar so the opening chime is heard)
    if b >= 1:
        for k in range(8):
            deg = [0, 1, 2, 1, 3, 2, 1, 2][k] + (b % 2)
            note = ch[[0, 1, 2, 1, 2, 1, 0, 1][k]] + (12 if k % 4 in (2, 3) else 0)
            if (b // 2) % 2:                                 # every other two bars, play a little melody from the scale instead
                note = scale[(b * 3 + k * 2) % len(scale)]
            M.add(pluck(hz(note), .45), t0 + k * beat / 2, pan=(-.3 if k % 2 else .3), gain=.30)
    # a quiet shaker on the off beats
    for k in range(8):
        h = noise(.05) * np.exp(-np.arange(int(.05 * SR)) / (.012 * SR))
        M.add(np.diff(h, prepend=0) * .5, t0 + k * beat / 2 + (beat / 4 if k % 2 else 0), gain=.10 if k % 2 else .16)
t = np.arange(N) / SR
mfade = np.minimum(1, t / 1.0) * np.minimum(1, np.maximum(0, (total - t)) / 1.2)
duck = 1 - .62 * lowpass(act, int(.40 * SR))                  # the tune sits back while the voice speaks
duck = np.clip(duck, .30, 1.0)
MUSIC_GAIN = .62
M.L *= duck * mfade * MUSIC_GAIN
M.R *= duck * mfade * MUSIC_GAIN

# ------------------------------------------------------------------ effects
S = Track()
for fx in tl['sfx']:
    s = sfx(fx['kind'])
    S.add(s, fx['at'], pan=fx.get('pan', 0.0), gain=fx.get('gain', 1.0))
# opening chime and the "coming soon" chimes
S.add(bell(hz(12), 1.6, .30) + bell(hz(19), 1.6, .22), .2)
end = tl['outro_start']
for i, s in enumerate((12, 16, 19, 24)):
    S.add(bell(hz(s), 2.2, .30), end + .15 + i * .09, pan=(i - 1.5) / 3)


def room(x):
    y = x.copy()
    for d, g in ((int(.09 * SR), .16), (int(.19 * SR), .09)):
        y[d:] += x[:-d] * g
    return y


fade = np.minimum(1, np.minimum(t / .4, np.maximum(0, (total - t)) / .8))
L = V.L + room(M.L) + room(S.L)
R = V.R + room(M.R) + room(S.R)
peak = max(np.abs(L).max(), np.abs(R).max(), 1e-6)
print('peak before limiter', round(peak, 2), ' voice rms', round(float(np.sqrt(np.mean(V.L[V.L != 0] ** 2))), 3),
      ' music rms', round(float(np.sqrt(np.mean(M.L ** 2))), 3), ' sfx rms', round(float(np.sqrt(np.mean(S.L ** 2))), 3))
L, R = np.tanh(L * .95) / np.tanh(.95) * .88, np.tanh(R * .95) / np.tanh(.95) * .88
pcm = np.stack([L * fade, R * fade], axis=1)
with wave.open(out_path, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(pcm, -1, 1) * 32767).astype('<i2').tobytes())
print('wrote', out_path, round(N / SR, 1), 's')
