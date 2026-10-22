"""QC helper: 1-fps contact sheet + full-size stills at given times.

usage: python qc_frames.py <video.mp4> <out_dir> [t1 t2 ...]
House rule: zoom-check every face at FULL size (crop the stills) before calling
a render good - faces, hands, the car, background text.
"""
import os
import subprocess
import sys

video, out = sys.argv[1], sys.argv[2]
times = sys.argv[3:] or ["1.2", "4", "7", "9.5", "12", "13.6"]
os.makedirs(out, exist_ok=True)
name = os.path.splitext(os.path.basename(video))[0]
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", video, "-vf", "fps=1,scale=480:-1,tile=4x4",
                "-frames:v", "1", os.path.join(out, f"{name}_contact.jpg")], check=True)
for t in times:
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", t, "-i", video, "-frames:v", "1", "-q:v", "2",
                    os.path.join(out, f"{name}_{t.replace('.', 'p')}.jpg")], check=True)
print("wrote QC images to", out)
