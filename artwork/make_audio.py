"""Makes the soundtrack of the opening video (artwork/opening-audio.wav): a soft pad, chimes as the letters appear, a snip and a
fanfare when the ribbon is cut, sparkles, and a rocket whoosh. Pure numpy, no sample files; timings match T in opening-video.html.
    python artwork/make_audio.py
"""
import os
import wave

import numpy as np

SR = 44100
DUR = 12.0
N = int(SR * DUR)
rng = np.random.default_rng(20261023)
t = np.arange(N) / SR
L = np.zeros(N)
R = np.zeros(N)


def hz(note, octave=4):
    names = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
    n = names[note[0]] + (1 if '#' in note else 0)
    return 440.0 * 2 ** ((n - 9 + 12 * (octave - 4)) / 12)


def add(sig, at, pan=0.0, gain=1.0):
    i = int(at * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    L[i:i + len(sig)] += sig * gain * (1 - max(0, pan))
    R[i:i + len(sig)] += sig * gain * (1 + min(0, pan))


def tone(freq, dur, attack=.01, decay=None, harmonics=((1, 1.0),), vib=0.0):
    n = int(dur * SR)
    x = np.arange(n) / SR
    env = np.minimum(1, x / attack) * np.exp(-x / (decay if decay else dur / 3))
    ph = 2 * np.pi * freq * x + (vib * np.sin(2 * np.pi * 5 * x) if vib else 0)
    return sum(a * np.sin(h * ph) for h, a in harmonics) * env


def bell(freq, dur=1.0, gain=1.0):
    return tone(freq, dur, .004, dur / 4, ((1, 1.0), (2, .45), (3, .22), (4.2, .12))) * gain


def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.zeros_like(x)
    prev = 0.0
    for i in range(len(x)):
        prev = a * prev + (1 - a) * x[i]
        y[i] = prev
    return y


def noise(dur):
    return rng.standard_normal(int(dur * SR))


# ---- pad: three slow chords under everything
def pad(freqs, start, dur, gain):
    n = int(dur * SR)
    x = np.arange(n) / SR
    env = np.minimum(1, x / 1.2) * np.minimum(1, (dur - x) / 1.2)
    s = sum(np.sin(2 * np.pi * f * x) + .5 * np.sin(2 * np.pi * f * 2.003 * x) + .25 * np.sin(2 * np.pi * f * .997 * x) for f in freqs)
    add(s * env * gain / len(freqs), start, 0, 1)


pad([hz('C', 3), hz('G', 3), hz('E', 4)], 0.0, 4.6, .16)
pad([hz('F', 3), hz('C', 4), hz('A', 4)], 3.6, 4.6, .16)
pad([hz('G', 3), hz('D', 4), hz('B', 4)], 7.0, 1.6, .16)
pad([hz('C', 3), hz('G', 3), hz('E', 4), hz('C', 5)], 7.9, 4.1, .20)

# ---- SpaceBook: a bell for each letter, climbing the pentatonic scale
scale = [('C', 5), ('D', 5), ('E', 5), ('G', 5), ('A', 5), ('C', 6), ('D', 6), ('E', 6), ('G', 6)]
for i, (n, o) in enumerate(scale):
    add(bell(hz(n, o), 1.1, .30), 1.6 + i * .11, pan=(i - 4) / 6)

# ---- the grand opening badge drops in
add(bell(hz('G', 5), 1.4, .25) + bell(hz('C', 6), 1.4, .2), .85)

# ---- LIBRARY: a shimmer that rises
sw = np.linspace(600, 2600, int(1.0 * SR))
ph = 2 * np.pi * np.cumsum(sw) / SR
add(np.sin(ph) * np.hanning(len(ph)) * .16, 3.55)
for k, f in enumerate([hz('E', 6), hz('G', 6), hz('C', 7)]):
    add(bell(f, 1.2, .12), 4.1 + k * .12, pan=-.3 + k * .3)

# ---- the tagline: four soft plucks
for k, (n, o) in enumerate([('E', 5), ('G', 5), ('A', 5), ('C', 6)]):
    add(tone(hz(n, o), .6, .005, .18, ((1, 1), (2, .3))) * .22, 4.8 + k * .28)

# ---- ribbon and scissors: a low swell as they come in, then a heartbeat of anticipation
n = int(1.1 * SR)
x = np.arange(n) / SR
add(lowpass(noise(1.1), 900) * np.sin(np.pi * x / 1.1) * 3.0, 6.6)
for k in range(6):
    add(tone(hz('C', 2) * (1 + .02 * k), .3, .004, .09, ((1, 1), (2, .5))) * (.30 + .04 * k), 7.0 + k * .13 + k * k * .012)

# ---- the cut: a metallic snip, then fanfare, crash and sparkles
sn = noise(.09)
snip = np.diff(np.concatenate([[0], sn])) * np.exp(-np.arange(len(sn)) / (SR * .018))
add(snip * .5, 7.93)
add(snip * .7, 8.0)
for f, gain in ((hz('C', 5), .34), (hz('E', 5), .30), (hz('G', 5), .30), (hz('C', 6), .26), (hz('E', 4), .22), (hz('C', 4), .3)):
    n = int(2.2 * SR)
    x = np.arange(n) / SR
    saw = 2 * ((f * x) % 1) - 1
    add(lowpass(saw, 2600) * np.exp(-x / .9) * np.minimum(1, x / .01) * gain * .55, 8.0)
crash = noise(2.4)
add(lowpass(crash, 9000) * np.exp(-np.arange(len(crash)) / (SR * .55)) * .45, 8.0)
for k in range(26):
    n_, o_ = scale[int(rng.integers(0, len(scale)))]
    add(bell(hz(n_, o_) * 2 if k % 2 else hz(n_, o_), .9, .16), 8.05 + k * .07 + rng.random() * .05, pan=float(rng.uniform(-.8, .8)))

# ---- the rocket: a rising whoosh
n = int(2.2 * SR)
x = np.arange(n) / SR
w = lowpass(noise(2.2), 700) * 2.8 + lowpass(noise(2.2), 3500) * .9 * (x / 2.2)
add(w * np.sin(np.pi * np.minimum(1, x / 2.2) ** .8) * .7, 8.45, pan=.5)
add(tone(hz('G', 2), 2.0, .2, 1.2, ((1, 1), (2, .4), (3, .2))) * .18, 8.5)

# ---- last chord rings out and fades
for f in (hz('C', 5), hz('E', 5), hz('G', 5), hz('C', 6)):
    add(bell(f, 3.5, .2), 10.3)

# ---- mix: a little room (two soft echoes), gentle limiter, fade out
def room(x):
    y = x.copy()
    for d, g in ((int(.11 * SR), .28), (int(.23 * SR), .16)):
        y[d:] += x[:-d] * g
    return y


L, R = room(L), room(R)
peak = max(np.abs(L).max(), np.abs(R).max())
L, R = np.tanh(L / peak * 1.6) * .8, np.tanh(R / peak * 1.6) * .8
fade = np.minimum(1, np.minimum(t / .5, (DUR - t) / 0.8))
pcm = np.stack([L * fade, R * fade], axis=1)
out = os.path.join(os.path.dirname(__file__), 'opening-audio.wav')
with wave.open(out, 'wb') as f:
    f.setnchannels(2); f.setsampwidth(2); f.setframerate(SR)
    f.writeframes((np.clip(pcm, -1, 1) * 32767).astype('<i2').tobytes())
print('wrote', out, round(os.path.getsize(out) / 1e6, 1), 'MB')
