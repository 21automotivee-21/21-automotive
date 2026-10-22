"""Lay a music track under a silent video, starting at a chosen point in the song.

usage: python mix_music.py <video.mp4> <music.mp3> <start_seconds> <out.mp4>

Settings used for the finished Paris/Tokyo cuts:
  0.05 s fade-in (we start mid-song), 0.8 s fade-out at the end,
  loudnorm to -14 LUFS / -1.5 dBTP (TikTok/IG/YouTube level), AAC 192k 48 kHz,
  video stream copied untouched.
"""
import subprocess
import sys

video, music, start, out = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
dur = float(subprocess.run(
    ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video],
    capture_output=True, text=True, check=True).stdout)
fade_out = dur - 0.8
subprocess.run([
    "ffmpeg", "-v", "error", "-y", "-i", video, "-ss", str(start), "-t", str(dur), "-i", music,
    "-filter_complex",
    f"[1:a]afade=t=in:st=0:d=0.05,afade=t=out:st={fade_out}:d=0.8,loudnorm=I=-14:TP=-1.5:LRA=11[a]",
    "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    "-shortest", out], check=True)
print("wrote", out)
