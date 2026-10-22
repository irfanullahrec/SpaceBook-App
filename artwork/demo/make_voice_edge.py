"""Makes the narration voices for one language with Microsoft Edge's neural text-to-speech (edge-tts; it needs internet, and the
narration sentences are sent to that service). Output: voice_<lang>/<id>.wav (44.1 kHz mono, 16 bit) and voice_<lang>/durations.json.
    python make_voice_edge.py en|ur [id ...]
"""
import asyncio
import json
import os
import subprocess
import sys
import wave

import edge_tts

HERE = os.path.dirname(os.path.abspath(__file__))
lang = sys.argv[1]
only = set(sys.argv[2:])
cfg = json.load(open(os.path.join(HERE, f'narration_{lang}.json'), encoding='utf-8'))
out_dir = os.path.join(HERE, f'voice_{lang}')
os.makedirs(out_dir, exist_ok=True)
FF = subprocess.run([sys.executable, '-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'], capture_output=True, text=True).stdout.strip()
dur_path = os.path.join(out_dir, 'durations.json')
durations = json.load(open(dur_path)) if os.path.exists(dur_path) else {}


async def one(line_id, text):
    mp3 = os.path.join(out_dir, line_id + '.mp3')
    for attempt in range(4):
        try:
            await edge_tts.Communicate(text, cfg['voice'], rate=cfg.get('rate', '+0%')).save(mp3)
            break
        except Exception as e:                      # the service is online only; try again a few times
            if attempt == 3:
                raise
            print('  retry', line_id, e)
            await asyncio.sleep(2)
    wav = os.path.join(out_dir, line_id + '.wav')
    # a short lead-in silence is cut away so the line starts when the screen changes
    subprocess.run([FF, '-y', '-loglevel', 'error', '-i', mp3, '-af', 'silenceremove=start_periods=1:start_threshold=-48dB:start_silence=0.05',
                    '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le', wav], check=True)
    os.remove(mp3)
    with wave.open(wav) as w:
        durations[line_id] = round(w.getnframes() / w.getframerate(), 3)
    print(f'{line_id:12s} {durations[line_id]:5.2f} s')


async def main():
    for line_id, text in cfg['lines'].items():
        if only and line_id not in only:
            continue
        await one(line_id, text)
    json.dump(durations, open(dur_path, 'w'), indent=1)
    print('total', round(sum(durations.values()), 1), 's ->', dur_path)

asyncio.run(main())
