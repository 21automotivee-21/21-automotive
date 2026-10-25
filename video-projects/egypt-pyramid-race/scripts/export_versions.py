"""Export the delivery versions of one cut (house rule: every final ships in every format).

Takes an UNTITLED 16:9 master (assemble.py ... --no-title) and writes, into out_dir:
  <name>_16x9.mp4   landscape 1920x1080 (YouTube, TV, website)
  <name>_9x16.mp4   vertical 1080x1920, centre crop (Reels, TikTok, Shorts, Stories)
  <name>_1x1.mp4    square 1080x1080, centre crop (feed posts)
The title is drawn per format so it is never cut off by the crop.

Usage: python export_versions.py master_untitled.mp4 out_dir name [title]
"""
import os
import subprocess
import sys

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
FORMATS = {
    # suffix: (crop/scale filter, title font size, title y)
    "16x9": ("scale=1920:1080", 96, "h*0.06"),
    "9x16": ("scale=-2:1920,crop=1080:1920", 70, "h*0.12"),
    "1x1": ("scale=-2:1080,crop=1080:1080", 70, "h*0.06"),
}


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         capture_output=True, text=True, check=True).stdout
    return float(out)


def main():
    master, out_dir, name = sys.argv[1], sys.argv[2], sys.argv[3]
    text = sys.argv[4] if len(sys.argv) > 4 else "GIZA GRAND PRIX"
    os.makedirs(out_dir, exist_ok=True)
    total = duration(master)
    for suffix, (frame, size, y) in FORMATS.items():
        title = (f"drawtext=fontfile={FONT}:text='{text}':fontcolor=white:fontsize={size}:"
                 f"shadowcolor=black@0.6:shadowx=3:shadowy=3:x=(w-text_w)/2:y={y}:"
                 f"alpha='if(lt(t,{total-2.5}),0,min(1,(t-{total-2.5})/0.8))'")
        out = os.path.join(out_dir, f"{name}_{suffix}.mp4")
        subprocess.run(["ffmpeg", "-v", "error", "-nostdin", "-y", "-i", master,
                        "-vf", f"{frame},setsar=1,{title}", "-c:v", "libx264", "-crf", "18",
                        "-pix_fmt", "yuv420p", "-c:a", "copy", "-movflags", "+faststart", out], check=True)
        print(out)


if __name__ == "__main__":
    main()
