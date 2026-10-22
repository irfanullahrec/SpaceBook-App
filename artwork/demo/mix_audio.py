"""Mixes the soundtrack of the demo video from timeline.json: the voice lines, a soft music pad, tap clicks, and a chime at the start
and at the "coming soon" end. Output: demo-audio.wav (44.1 kHz stereo).
    python artwork/demo/mix_audio.py [timeline.json]
"""
import json
import os
import sys
import wave

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 44100
tl_path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'timeline.json')
tl = json.load(open(tl_path, encoding='utf8'))
total = tl['total']
N = int((total + 1.0) * SR)
L = np.zeros(N)
R = np.zeros(N)
rng = np.random.default_rng(7)


def read_wav(path):
    with wave.open(path) as w:
        raw = np.frombuffer(w.readframes(w.getnframes()), dtype='<i2').astype(np.float64) / 32768
        if w.getnchannels() == 2:
            raw = raw.reshape(-1, 2).mean(axis=1)
    return raw


def add(sig, at, pan=0.0, gain=1.0):
    i = int(at * SR)
    if i < 0 or i >= N:
        return
    sig = sig[: N - i]
    L[i:i + len(sig)] += sig * gain * (1 - max(0, pan))
    R[i:i + len(sig)] += sig * gain * (1 + min(0, pan))


def tone(f, dur, attack=.005, decay=None, harm=((1, 1.0),)):
    n = int(dur * SR)
    x = np.arange(n) / SR
    env = np.minimum(1, x / attack) * np.exp(-x / (decay or dur / 3))
    return sum(a * np.sin(2 * np.pi * f * h * x) for h, a in harm) * env


def bell(f, dur=1.2, gain=1.0):
    return tone(f, dur, .004, dur / 4, ((1, 1.0), (2, .45), (3, .22), (4.2, .12))) * gain


def hz(semi_from_c4):
    return 261.63 * 2 ** (semi_from_c4 / 12)


# ---- music: a slow pad that moves through four chords, quiet under the voice
def pad(freqs, start, dur, gain):
    n = int(dur * SR)
    x = np.arange(n) / SR
    env = np.minimum(1, x / 1.5) * np.minimum(1, (dur - x) / 1.5)
    s = sum(np.sin(2 * np.pi * f * x) + .5 * np.sin(2 * np.pi * f * 2.003 * x) + .25 * np.sin(2 * np.pi * f * .997 * x) for f in freqs)
    add(s * env * gain / len(freqs), start)


chords = [(0, 4, 7), (5, 9, 12), (7, 11, 14), (0, 4, 7)]
t0, k = 0.0, 0
while t0 < total:
    ch = chords[k % 4]
    pad([hz(c - 12) for c in ch] + [hz(ch[2])], t0, 12.0, .55)
    t0 += 10.0
    k += 1

# ---- voice
seg_start = 0.0
voice_gain = 1.0
for item in tl['audio']:
    wav = os.path.join(HERE, 'voice', (item.get('say') or '-') + '.wav')
    if item.get('say') and os.path.exists(wav):
        v = read_wav(wav)
        v = v / max(.2, np.abs(v).max()) * .85 * voice_gain
        add(v, item['at'])
    for t in item.get('taps', []):
        add(tone(1250, .08, .001, .018) * .35 + tone(620, .08, .001, .03) * .25, t)

# ---- chimes: opening and the "coming soon" ending
add(bell(hz(12), 1.6, .30) + bell(hz(19), 1.6, .22), .2)
end = tl['outro_start']
for i, s in enumerate((12, 16, 19, 24)):
    add(bell(hz(s), 2.2, .26), end + .15 + i * .09, pan=(i - 1.5) / 3)

# ---- mix: a gentle limiter and fades
def room(x):
    y = x.copy()
    for d, g in ((int(.09 * SR), .18), (int(.19 * SR), .1)):
        y[d:] += x[:-d] * g
    return y


L, R = room(L), room(R)
peak = max(np.abs(L).max(), np.abs(R).max(), 1e-6)
L, R = np.tanh(L / peak * 1.5) * .85, np.tanh(R / peak * 1.5) * .85
t = np.arange(N) / SR
fade = np.minimum(1, np.minimum(t / .4, np.maximum(0, (total - t)) / .8))
pcm = np.stack([L * fade, R * fade], axis=1)
out = os.path.join(HERE, 'demo-audio.wav')
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(pcm, -1, 1) * 32767).astype('<i2').tobytes())
print('wrote', out, round(N / SR, 1), 's')
