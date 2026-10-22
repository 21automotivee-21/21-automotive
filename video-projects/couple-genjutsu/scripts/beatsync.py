"""Find the music start offset that puts a video's cuts on kick-drum hits.

usage:
  python beatsync.py <music.mp3> <cut1> <cut2> ... [--dur 14]

Prints the 5 best start offsets (seconds into the song) and how far each cut
lands from the nearest kick, in ms. Under ~60 ms reads as "on the beat".
Needs ffmpeg on PATH and numpy.
"""
import argparse
import subprocess

import numpy as np

SR = 11025
HOP = 0.01  # 10 ms envelope


def load_lowband(path):
    """Mono, 11 kHz, low-passed at 150 Hz so mostly kick + bass remain."""
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR),
         "-af", "lowpass=f=150,lowpass=f=150", "-f", "f32le", "-"],
        capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def onset_env(x):
    hop = int(SR * HOP)
    n = len(x) // hop
    rms = np.sqrt((x[: n * hop].reshape(n, hop) ** 2).mean(axis=1) + 1e-12)
    db = 20 * np.log10(rms)
    flux = np.maximum(np.diff(db, prepend=db[0]), 0)  # rising energy = hit
    return flux, db


def kicks(flux, db):
    """Peak-pick the strongest 3% of energy rises in the louder part of the song."""
    thr = np.percentile(flux, 97)
    loud = db > np.percentile(db, 40)
    idx = [i for i in range(1, len(flux) - 1)
           if flux[i] >= thr and flux[i] >= flux[i - 1] and flux[i] >= flux[i + 1] and loud[i]]
    out = []
    for i in idx:  # 120 ms refractory
        if not out or i - out[-1] > 12:
            out.append(i)
    return np.array(out) * HOP


def tempo(k):
    d = np.diff(k)
    d = d[(d > 0.25) & (d < 1.5)]
    if len(d) == 0:
        return float("nan")
    hist, edges = np.histogram(d, bins=np.arange(0.25, 1.5, 0.01))
    return 60 / (edges[hist.argmax()] + 0.005)


def best_offsets(k, cuts, dur, total, top=5):
    best = []
    for off in np.arange(0, total - dur, 0.01):
        win = k[(k >= off) & (k < off + dur)] - off
        if len(win) < 8:
            continue
        err = [float(np.min(np.abs(win - c))) for c in cuts]
        score = sum(e < 0.04 for e in err) * 10 - sum(err)
        best.append((score, off, err))
    best.sort(key=lambda t: -t[0])
    return best[:top]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("music")
    ap.add_argument("cuts", nargs="+", type=float)
    ap.add_argument("--dur", type=float, default=14.0, help="video length in seconds")
    a = ap.parse_args()
    x = load_lowband(a.music)
    flux, db = onset_env(x)
    k = kicks(flux, db)
    total = len(x) / SR
    print(f"{a.music}: {len(k)} hits, tempo~{tempo(k):.1f} BPM, length {total:.1f}s")
    for score, off, err in best_offsets(k, a.cuts, a.dur, total):
        print(f"  start {off:6.2f}s  score {score:6.2f}  cut errors ms {[int(e * 1000) for e in err]}")
    print("Also check the chosen window is a full-energy part of the song, not a quiet break.")


if __name__ == "__main__":
    main()
