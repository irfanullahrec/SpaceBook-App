"""Prints the event timing of a recorded scene and writes a contact sheet of frames (one per event, plus the end).
   python sheet.py <scene id> [seconds after each event start to sample, default 2.0]"""
import json, subprocess, sys, os
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
FF = r"C:/Users/Shehroz Khan/AppData/Roaming/Python/Python314/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe"
sid = sys.argv[1]
after = float(sys.argv[2]) if len(sys.argv) > 2 else 2.0
d = json.load(open(f'{HERE}/scenes/{sid}.json'))
dur = json.load(open(f'{HERE}/voice/durations.json', encoding='utf-8-sig'))
print('offset', d['offset'], 'duration', d['duration'], 'overflow', d['overflow'])
prev = None
samples = []
for e in d['events']:
    say = e.get('say')
    gap = '' if prev is None or not prev.get('say') else round(e['t'] - prev['t'] - dur[prev['say']], 2)
    print(say, e['t'], 'dur', dur.get(say), 'gap', gap, 'taps', e['taps'])
    if say:
        samples.append((say, e['t'] + min(after, max(0.3, dur[say] - 0.3))))
    prev = e
samples.append(('end', d['duration'] - 0.4))
os.makedirs('C:/tmp/lf', exist_ok=True)
ims = []
for name, t in samples:
    out = f'C:/tmp/lf/s_{sid}_{name}.png'
    subprocess.run([FF, '-y', '-loglevel', 'error', '-ss', str(d['offset'] + t), '-i', f'{HERE}/scenes/{sid}.mp4', '-frames:v', '1', '-vf', 'scale=300:-1', out])
    if os.path.exists(out):
        ims.append(Image.open(out))
w, h = ims[0].size
cols = min(4, len(ims)); rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (w * cols, h * rows))
for i, im in enumerate(ims):
    sheet.paste(im, ((i % cols) * w, (i // cols) * h))
sheet.save(f'C:/tmp/lf/sheet_{sid}.png')
print('sheet', sheet.size)
