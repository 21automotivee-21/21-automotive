"""Cut the 16 clips into the 45 s film.

Each line of the EDL (edit decision list) is: shot, clip file, in-point (s), length (s).
Every clip is scaled to 1920x1080 / 24 fps, film-graded (same look as film_grade.py),
loudness-matched, then joined with hard cuts. An optional music track is mixed under the
clips' own engine/impact sound, and the title card fades in over the last shot.

Usage: python assemble.py edl.txt out.mp4 [music.mp3 music_start_s]
"""
import subprocess
import sys

GRADE = ("eq=saturation=0.80:contrast=0.97:brightness=0.005,"
         "colorbalance=rs=-0.02:bs=0.02:rh=-0.02:bh=0.02,"
         "noise=alls=7:allf=t,unsharp=3:3:0.25")
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
TITLE = "GIZA GRAND PRIX"


def run(cmd):
    subprocess.run(cmd, check=True)


def main():
    edl, out = sys.argv[1], sys.argv[2]
    music = sys.argv[3] if len(sys.argv) > 3 else None
    music_start = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0

    rows = [l.split() for l in open(edl) if l.strip() and not l.startswith("#")]
    parts = []
    for shot, path, start, length in rows:
        part = f"part_{shot}.mp4"
        run(["ffmpeg", "-v", "error", "-y", "-ss", start, "-t", length, "-i", path,
             "-f", "lavfi", "-t", length, "-i", "anullsrc=r=48000:cl=stereo",
             "-filter_complex",
             f"[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,"
             f"fps=24,setsar=1,{GRADE}[v];"
             # clips without an audio track fall back to silence via amix duration=first
             f"[0:a]loudnorm=I=-18:TP=-2,aresample=48000[a0];[a0][1:a]amix=inputs=2:duration=longest[a]",
             "-map", "[v]", "-map", "[a]", "-t", length,
             "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "192k", part])
        parts.append(part)

    with open("concat.txt", "w") as f:
        f.writelines(f"file '{p}'\n" for p in parts)
    run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", "concat.txt",
         "-c", "copy", "joined.mp4"])

    total = sum(float(r[3]) for r in rows)
    title = (f"drawtext=fontfile={FONT}:text='{TITLE}':fontcolor=white:fontsize=96:"
             # sits in the sky above the pyramids so it never covers the friends in shot 16
             f"shadowcolor=black@0.6:shadowx=3:shadowy=3:"
             f"x=(w-text_w)/2:y=h*0.06:alpha='if(lt(t,{total-2.5}),0,min(1,(t-{total-2.5})/0.8))'")
    if music:
        run(["ffmpeg", "-v", "error", "-y", "-i", "joined.mp4", "-ss", str(music_start), "-i", music,
             "-filter_complex",
             f"[0:v]{title}[v];[1:a]atrim=0:{total},afade=t=in:d=0.3,afade=t=out:st={total-1.2}:d=1.2,volume=0.55[m];"
             "[0:a][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1[a]",
             "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "192k", out])
    else:
        run(["ffmpeg", "-v", "error", "-y", "-i", "joined.mp4", "-vf", title,
             "-af", "loudnorm=I=-14:TP=-1", "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "192k", out])


if __name__ == "__main__":
    main()
