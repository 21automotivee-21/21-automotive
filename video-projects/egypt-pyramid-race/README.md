# Egypt Pyramid Race (cinematic AI car video)

Short cinematic film for the repo owner (Sabeih) and his three friends, **4 friends, 4 cars**: four supercars race through Giza,
past the **Grand Egyptian Museum (GEM)** and around the **Pyramids**. It is separate from the
21 Automotive website code in this repo. Nothing here is imported by the Next.js app.

## Style reference
**"F1 The Movie - Daytona Scene | IMAX 4K"**: https://www.youtube.com/watch?v=ubZFFdgx7qY
What to borrow from it (also see `SHOTLIST.md`):
- IMAX look: wide 2.39:1 framing feel, deep blacks, anamorphic flares, warm vs cool contrast.
- Build tension first (quiet close-ups: eyes in the mirror, hands on the wheel, rev needles), then release into speed.
- Cameras the movie uses: ultra-low bumper cams, side-skirt cams, onboard over-the-shoulder POV,
  long-lens tracking from a chase car, top-down drone, whip-pans on overtakes.
- Fast cutting on the beat during battles, one long held shot at the climax, then silence plus a hard cut at the finish.

## Cast and cars
| # | Driver | Car | Plate | Colour / look |
|---|---|---|---|---|
| 1 | **Sabeih** | Bentley Continental GT, **customized** | `SBH` | TBC: colour, wheels, body kit, wrap |
| 2 | **Omar** | McLaren P1 | `OMR` | TBC colour (P1 classic: Volcano Orange / Papaya) |
| 3 | **Fahmy** | Porsche 911 GT3 RS, **Singer-design**, burgundy | `WIZ` | Burgundy, Singer-style details (see open question 3) |
| 4 | **ROU** (4th friend) | Audi R8 Spyder, red | `ROU` | Red, roof down? |

## Character references (one locked reference per friend; check this table before EVERY generation)
Checked in the Higgsfield account on 24 Oct 2026. Only use what is listed here. Never reuse another project's
character (Love Rally "Selim"/"Rami", Zeina, Zara, Lames are NOT in this film) and never guess who an unlabeled upload is.

| Friend | Reference to use | Status |
|---|---|---|
| Sabeih | Higgsfield Element **`Sabih-Main`** (`bd818291-5d37-4a49-aadb-685155266c07`), character sheet set 23 Oct 2026: long curly hair, short full beard, black leather biker jacket | Exists. Waiting for the user to confirm it's the one for this film |
| Omar | none | **Missing**: need photos |
| Fahmy | none | **Missing**: need photos |
| ROU | none | **Missing**: need photos |

Unlabeled upload seen in the account (24 Oct): a man with short curly hair and a beard (media `ee9bdf69-...`). The user must say who it is before it gets used.
Photos needed per friend: phone back camera, daylight, no filter or portrait mode, face front + left 3/4 + right 3/4 + full body.
Each one then becomes a named Element (`Race-Omar`, `Race-Fahmy`, `Race-ROU`) and the user approves it before any shot is generated.

## Locations (street references to come from the user)
- **Grand Egyptian Museum**: triangular translucent-alabaster facade, the hanging obelisk of Ramesses II on the entrance plaza, the big front plaza and access roads.
- **Giza Pyramids**: Khufu, Khafre, Menkaure, the Sphinx, the desert plateau roads and the Panorama point.
- Connecting roads: Cairo-Alexandria Desert Road / Al Remaya square side of GEM, Pyramids Road. Final route = whatever the user's street references show.
- Light: golden-hour start, ending at blue hour with the pyramids lit (night racing lights like Daytona).

## Status (24 Oct 2026)
- Project brief, shot list and prompts drafted. **Nothing generated yet. No credits spent.**
- Waiting on the user for: street references, the answers to the open questions below, and car/driver photos.

## Decided by the user (24 Oct 2026)
- **Faces visible, NO helmets at all.** It's a street race through Egypt, not a track race: everyone in street clothes, faces from their character sheets.
- Each friend's face comes ONLY from their approved character sheet (table above).
- Car photo angles requested from the user: front 3/4 (main), side profile, rear 3/4, straight front, straight rear, wheel close-up,
  plus any custom detail. Shot at eye/headlight height, from 3-5 m, daylight in open shade, the whole car in frame, no other cars touching it.

## Open questions for the user
1. ~~Car 4 driver~~: answered, ROU is the 4th friend.
2. Sabeih's Bentley: what is customized (colour, wrap, wheels, body kit, exhaust)? A photo is best.
3. Fahmy's car: a modern **992 GT3 RS** in burgundy with Singer-style touches, or a classic **Singer-reimagined 964-shape 911**? These look very different.
4. Omar's P1 colour.
5. Faces: the user wants each friend's correct character reference used (see table above). Still open: should faces appear (helmet off / in-cabin close-ups like the movie)? If yes we need real photos
   (same rule as the couple project: phone back camera, daylight, no filter, front + 3/4 views).
6. Who wins? (Decides the last shots.)
7. Length and format: ~45 s 16:9 master plus a 9:16 cut for Reels/TikTok?
8. Music: free licensed track (like the couple project) or an original generated score?

## Rules carried over from the couple project
- Always quote the credit cost and wait for the user's OK before any paid generation.
- Personal photos, renders and music stay OFF GitHub (public repo, see `.gitignore` and `MEDIA_MANIFEST.md`).
- **Plates:** AI models garble text. Generate the cars with blank plates and composite `SBH` / `OMR` / `WIZ` / `ROU` in post
  (or use the plate as an image reference), then QC every plate frame.
- QC every shot at full size (car badges, wheels, plates, the pyramids' shape, the GEM facade) before calling it done.
- Music cut-sync: reuse `../couple-genjutsu/scripts/` (`find_cuts.py`, `beatsync.py`, `mix_music.py`, `qc_frames.py`).

## Planned workflow
1. Lock the open questions plus street references.
2. Make a **reference sheet per car** (front 3/4, rear 3/4, side; correct colour; blank plate). Prompts in `prompts/PROMPTS.md`.
3. Make a **start frame per shot** (image model, car sheet + location reference as inputs).
4. Animate each start frame into a 3-5 s clip (image-to-video). Pick the model after a quoted price check (Higgsfield or Kling, both connected).
5. Plate composite, colour-match, edit to the shot list, beat-sync music, sound design (engines, whooshes), export 16:9 plus 9:16.
