# Couple city video (Higgsfield Genjutsu Lite)

Personal short video for the repo owner (Sabi) and his girlfriend (Lamis). It is separate
from the 21 Automotive website code in this repo. Nothing here is imported by the Next.js app.

## Goal
Take Higgsfield's Genjutsu preset clip **"Countryside Duo"**: a 14 s locked-off shot of two
people taking turns posing to camera at a crosswalk next to a red motorbike. Remake it with:
- the two people replaced by **Sabi** and **Lamis**
- the motorbike replaced by a **glossy pastel-pink Mercedes G-Class**
- the street replaced by famous cities: **Paris, Tokyo, Seoul, London** (one 14 s video per city)
- a **rap beat synced to the moves**, so every cut lands on a kick drum.

## Status (22 Oct 2026)
| City | Render | Music | Final |
|---|---|---|---|
| Paris | done | trap beat synced | `Paris_FINAL.mp4` (local PC, see MEDIA_MANIFEST.md) |
| Tokyo | done | trap beat synced | `Tokyo_FINAL.mp4` (local PC) |
| Seoul | not started | - | - |
| London | not started | - | - |

**22 Oct 2026, new character sheets:** two new split-screen sheets were made for a second pair of
people (with their consent), from real phone photos used as multiple `image_references`
(`gpt_image_2_5`, flare, high, 2k, 16:9). Outfits: full Amiri (man) and full Prada (woman).
The man's no-cap face drifted on re-generation, so his final sheet keeps the face from an
earlier generation, composited locally. Sheets, photos, links and job IDs are kept off this
repo. New sheets of Sabi and Lamis are still to do.

**Open user feedback, read before rendering anything new:**
1. "We don't look real." The faces come from AI character sheets, so the result has an AI look. The user plans to take
   **real camera photos** of both of them: phone back camera, daylight, no filter or portrait mode,
   face front plus left and right 3/4 views plus full body, plain wall, in the outfits they want.
   New sheets/references should come from those photos. Then redo Paris and Tokyo, and do Seoul and London.
2. The user wants the music to always follow the movement: cuts and moves on the beat.
3. A second reference video (Lamis only, cream outfit, European old town, 9:16) is **ON HOLD**.
   Do not work on it until the user asks.

## Tools and settings decided
- **Genjutsu Lite (FREE)** on the Higgsfield **website only**: `https://higgsfield.ai/ai/video?model=genjutsu-lite`.
  The free tries do NOT work through the Higgsfield MCP. MCP video generation is billed:
  the same job showed **56 credits** without the free toggle.
  - 8 free tries left (started with 10).
  - Settings: Create Video tab, Model "Higgsfield Genjutsu Lite", Quality **1080p**, no cropping in "Edit reference" (Confirm),
    characters uploaded **Sabi first (Image 1), Lamis second (Image 2)**, Prompt toggle ON,
    **"Use free generations" toggle ON**. The Generate button must show the price crossed out plus "Free"; never click it if it shows only a credit number.
  - Each render sat "queued" for about 20-35 min. One free job at a time; a failed free job is refused back.
  - Output: 1920x1080, 24 fps, 13.96 s, **no audio**.
  - Prompts are in `prompts/PROMPTS.md`. For a new city, swap only the location sentence.
- **Character sheets**: Higgsfield `gpt_image_2_5` (GPT Image 2.5), variant flare, quality high, 2k, 16:9,
  split-screen (full body left, close-up right), 2.75 credits each through the MCP.
  The user's "365 unlimited" image plan only works on the website (model "GPT Image", 3:2 max), not through the MCP.
- **Look**: realistic, real-footage, natural skin, lighter makeup on Lamis.
  - Sabi outfit: black oversized jersey with hot-pink/white stripes, silver chain, charcoal cargo pants, white sneakers, black cap.
  - Lamis outfit: cherry-red racing jacket with white stripes, white tee, dark baggy jeans, white sneakers, silver hoops, small black shoulder bag.
  - Car: glossy pastel-pink Mercedes-Benz G-Class, parked where the bike was.
- **Music**: Pixabay "Rap - Rap Type Beat" by vaitsez (free licence). It is beat-synced per city with `scripts/beatsync.py`:
  - Paris: cuts at 2.875 / 5.833 / 8.625 / 11.25 s, song start **78.96 s**.
  - Tokyo: cuts at 2.917 / 5.75 / 8.667 / 11.417 s, song start **76.12 s**.
  - Mix with `scripts/mix_music.py`: 0.05 s fade-in, 0.8 s fade-out, -14 LUFS, AAC 192k.
  - Copyrighted trend songs (Genjutsu trend = "Storm" by GENER8ION & Yung Lean; rising rap sound "DIP ON EM") are **not** baked in.
    The user can add those in-app on TikTok/IG when posting. The original preset has no song.
- **QC rule**: check every render with `scripts/qc_frames.py` and zoom to full size on faces, hands, the car and the signs before calling it done.
  Known small issues: Lamis's lipstick comes out redder in the last close-up, and AI shop signs show fake characters.
- Always quote the credit cost and wait for the user's OK before any paid generation.

## Workflow for one city (repeatable)
1. Higgsfield website, Genjutsu Lite: reference video = Countryside Duo clip, Image 1 = Sabi, Image 2 = Lamis, city prompt, 1080p, free ON, Generate.
2. Wait for the job to finish, then download the MP4.
3. `python scripts/qc_frames.py <city>.mp4 qc/`, then zoom-check.
4. `python scripts/find_cuts.py <city>.mp4`
5. `python scripts/beatsync.py C_type_beat_vaitsez.mp3 <cut times>`. Pick a start where all cuts are under ~60 ms and the section is full-energy.
6. `python scripts/mix_music.py <city>.mp4 C_type_beat_vaitsez.mp3 <start> <City>_FINAL.mp4`

Files: `prompts/PROMPTS.md` (all prompts), `MEDIA_MANIFEST.md` (where every media file is), `scripts/` (Python; needs ffmpeg and numpy).
