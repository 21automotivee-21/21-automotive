"""Cut the clips into the 45 s film.

Each line of the EDL (edit decision list) is: shot, clip file, in-point (s), length (s), and an
optional speed factor (default 1.0). The length is the time the shot lasts in the film, so a shot
with speed 1.5 reads length * 1.5 seconds of the source. Every clip is scaled to 1920x1080 / 24 fps
and film-graded (same look as film_grade.py).

Continuity: the pictures hard-cut, but the sound does not. Each shot's audio runs a little past its
cut and crossfades into the next shot, and a quiet continuous road/wind bed runs under the whole
film, so the engines never drop out at an edit. An optional music track is mixed on top, and the
title card fades in over the last shot.

Usage: python assemble.py edl.txt out.mp4 [music.mp3 music_start_s] [--no-title]
--no-title leaves the title off so export_versions.py can place it per format (16:9 / 9:16).
"""
import subprocess
import sys

GRADE = ("eq=saturation=0.80:contrast=0.97:brightness=0.005,"
         "colorbalance=rs=-0.02:bs=0.02:rh=-0.02:bh=0.02,"
         "noise=alls=7:allf=t,unsharp=3:3:0.25")
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
TITLE = "GIZA GRAND PRIX"
XFADE = 0.3  # seconds each shot's sound overlaps the next one


def run(cmd):
    subprocess.run(cmd, check=True)


def atempo(speed):
    # atempo accepts 0.5-2.0 per instance; chain it for anything outside that
    chain = []
    while speed > 2.0:
        chain.append("atempo=2.0")
        speed /= 2.0
    chain.append(f"atempo={speed:.4f}")
    return ",".join(chain)


def main():
    no_title = "--no-title" in sys.argv
    args = [a for a in sys.argv[1:] if a != "--no-title"]
    edl, out = args[0], args[1]
    music = args[2] if len(args) > 2 else None
    music_start = float(args[3]) if len(args) > 3 else 0.0

    rows = [l.split() for l in open(edl) if l.strip() and not l.startswith("#")]
    vparts, aparts = [], []
    for i, row in enumerate(rows):
        shot, path, start, length = row[:4]
        speed = float(row[4]) if len(row) > 4 else 1.0
        length = float(length)
        tail = XFADE if i < len(rows) - 1 else 0.0
        src = (length + tail) * speed

        vpart, apart = f"part_{shot}.mp4", f"part_{shot}.wav"
        run(["ffmpeg", "-v", "error", "-nostdin", "-y", "-ss", start, "-t", f"{src:.3f}", "-i", path,
             "-filter_complex",
             f"[0:v]setpts=PTS/{speed},scale=1920:1080:force_original_aspect_ratio=increase,"
             f"crop=1920:1080,fps=24,setsar=1,{GRADE}[v]",
             "-map", "[v]", "-t", f"{length:.3f}", "-an",
             "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", vpart])
        # sound keeps running XFADE past the cut; clips without audio fall back to silence
        run(["ffmpeg", "-v", "error", "-nostdin", "-y", "-ss", start, "-t", f"{src:.3f}", "-i", path,
             "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
             "-filter_complex",
             f"[0:a]aresample=48000,{atempo(speed)},loudnorm=I=-20:TP=-2[a0];"
             f"[a0][1:a]amix=inputs=2:duration=first,apad[a]",
             "-map", "[a]", "-t", f"{length + tail:.3f}", "-ac", "2", apart])
        vparts.append(vpart)
        aparts.append(apart)

    with open("concat.txt", "w") as f:
        f.writelines(f"file '{p}'\n" for p in vparts)
    run(["ffmpeg", "-v", "error", "-nostdin", "-y", "-f", "concat", "-safe", "0", "-i", "concat.txt",
         "-c", "copy", "joined_video.mp4"])

    total = sum(float(r[3]) for r in rows)
    inputs = sum((["-i", a] for a in aparts), [])
    chain, prev = [], "[0:a]"
    for i in range(1, len(aparts)):
        nxt = f"[x{i}]"
        chain.append(f"{prev}[{i}:a]acrossfade=d={XFADE}:c1=tri:c2=tri{nxt}")
        prev = nxt
    # brown noise, low-passed: a constant road/wind rumble that glues the cuts together
    bed = (f"anoisesrc=d={total}:c=brown:r=48000:a=0.05,lowpass=f=300,"
           f"afade=t=in:d=1,afade=t=out:st={total - 1.5}:d=1.5,aformat=channel_layouts=stereo[bed]")
    run(["ffmpeg", "-v", "error", "-nostdin", "-y", *inputs,
         "-filter_complex", ";".join(chain + [bed, f"{prev}[bed]amix=inputs=2:duration=first:normalize=0[a]"]),
         "-map", "[a]", "-t", f"{total:.3f}", "joined_audio.wav"])

    title = (f"drawtext=fontfile={FONT}:text='{TITLE}':fontcolor=white:fontsize=96:"
             # sits in the sky above the pyramids so it never covers the friends in shot 16
             f"shadowcolor=black@0.6:shadowx=3:shadowy=3:"
             f"x=(w-text_w)/2:y=h*0.06:alpha='if(lt(t,{total-2.5}),0,min(1,(t-{total-2.5})/0.8))'")
    if no_title:
        title = "null"
    if music:
        run(["ffmpeg", "-v", "error", "-nostdin", "-y", "-i", "joined_video.mp4", "-i", "joined_audio.wav",
             "-ss", str(music_start), "-i", music,
             "-filter_complex",
             f"[0:v]{title}[v];[2:a]atrim=0:{total},afade=t=in:d=0.3,afade=t=out:st={total-1.2}:d=1.2,volume=0.55[m];"
             "[1:a][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1[a]",
             "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "192k", "-t", f"{total:.3f}", out])
    else:
        run(["ffmpeg", "-v", "error", "-nostdin", "-y", "-i", "joined_video.mp4", "-i", "joined_audio.wav",
             "-vf", title, "-af", "acompressor=threshold=-18dB:ratio=3:attack=10:release=200,loudnorm=I=-14:TP=-1",
             "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "192k", "-t", f"{total:.3f}", out])


if __name__ == "__main__":
    main()
