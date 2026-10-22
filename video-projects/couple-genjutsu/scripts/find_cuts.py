"""Print the cut times (seconds) in a video using ffmpeg scene detection.

usage: python find_cuts.py <video.mp4> [threshold=0.12]
Genjutsu renders of the crosswalk clip have 4 cuts (~2.9, 5.8, 8.6, 11.3 s).
"""
import re
import subprocess
import sys

video = sys.argv[1]
thr = sys.argv[2] if len(sys.argv) > 2 else "0.12"
log = subprocess.run(
    ["ffmpeg", "-hide_banner", "-i", video, "-vf", f"select='gt(scene,{thr})',showinfo", "-f", "null", "-"],
    capture_output=True, text=True).stderr
print(" ".join(f"{float(t):.3f}" for t in re.findall(r"pts_time:([\d.]+)", log)))
