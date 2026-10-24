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
| 1 | **Sabeih** | Bentley Continental GT (new 4th gen), **customized** | `SBH` | **LOCKED** as Element `Race-Bentley-SBH` (`da353314-38ef-4c6c-ade4-1e60ea1b8366`): satin/matte burgundy-plum wrap, gloss black twisted multi-spoke wheels, red calipers, black grille/intakes, single oval LED headlamps |
| 2 | **Omar** + passenger **Karen** | McLaren P1, track spec (GTR / LM style) | `OMR` | **LOCKED** as Element `Race-P1-OMR` (`e3560804-cbcd-4139-8370-9a9548ca2546`): deep green-teal colour-shift paint, roof snorkel, huge fixed wing, silver wheels. NOT the purple road P1 |
| 3 | **Fahmy** | Porsche 992 911 GT3 RS | `WIZ` | **LOCKED** as Element `Race-Porsche-WIZ` (`1d34bece-4f83-4493-9301-3007b7f63821`): GLOSSY deep magenta-burgundy, white GT3 RS side script, white front bumper accents, swan-neck wing with white PORSCHE/RS, dark multi-spoke wheels |
| 4 | **ROU** (4th friend) | Audi R8 V10 Spyder (2nd gen), red | `ROU` | **LOCKED** as Element `Race-Audi-ROU` (`d42aeb08-ea5e-4dc1-aa5f-e3df1938b30a`): front 3/4 + rear 3/4. Bright red, roof down, red calipers, black side blade, no wing. Wheels: **black** (user, 24 Oct) |

## Character references (one locked reference per friend; check this table before EVERY generation)
Checked in the Higgsfield account on 24 Oct 2026. Only use what is listed here. Never reuse another project's
character (Love Rally "Selim"/"Rami", Zeina, Zara, Lames are NOT in this film) and never guess who an unlabeled upload is.

| Friend | Reference to use | Status |
|---|---|---|
| Sabeih | Higgsfield Element **`Sabih-Main`** (`bd818291-5d37-4a49-aadb-685155266c07`): long curly hair, full beard, black leather biker jacket, white tee, grey cargos | **LOCKED**: the user sent this exact sheet as Sabeih's reference (24 Oct) |
| Omar | Higgsfield Element **`Race-Omar`** (`5a16c501-05d2-4054-92d7-665304169902`): face close-up + full body; short tight curls, short beard, black bomber, black jeans, white sneakers | **LOCKED** (user-supplied, 24 Oct) |
| Karen (passenger in Omar's P1) | Higgsfield Element **`Race-Karen`** (`b9a08365-d269-4ab2-ae8c-b81ce3896dc4`): user's character sheet; long straight black hair, black cropped bomber, white tank, grey pleated mini skirt | **LOCKED** (user-supplied, 24 Oct) |
| Fahmy | Higgsfield Element **`Race-Fahmy`** (`ef4c61da-757b-4483-b9da-b9e3aeddd9b3`): short dark hair, full beard, silver rectangular tinted glasses, cream knit zip cardigan, white tee, light jeans | **LOCKED** (user-supplied, 24 Oct) |
| ROU | Higgsfield Element **`Race-ROU`** (`9c2bad4f-f3dc-4330-9cde-498351247cf3`): long straight dark hair, nose + septum rings, silver choker, black cropped leather jacket, black top, black wide trousers, chunky boots | **LOCKED** (user-supplied, 24 Oct). The 3 unlabeled face photos uploaded earlier on 24 Oct match ROU |

Resolved: the unlabeled upload of a man with short curls (media `ee9bdf69-...`) is Omar.
Karen's outfit has visible brand logos; AI tends to garble logos, so QC them or plain them out in prompts.
Photos needed per friend: phone back camera, daylight, no filter or portrait mode, face front + left 3/4 + right 3/4 + full body.
All five people are locked. Car elements: `Race-Bentley-SBH`, `Race-P1-OMR`, `Race-Porsche-WIZ`, `Race-Audi-ROU`.

## Locations (street references to come from the user)
- **Grand Egyptian Museum**: triangular translucent-alabaster facade, the hanging obelisk of Ramesses II on the entrance plaza, the big front plaza and access roads.
- **Giza Pyramids**: Khufu, Khafre, Menkaure, the Sphinx, the desert plateau roads and the Panorama point.
- Connecting roads: Cairo-Alexandria Desert Road / Al Remaya square side of GEM, Pyramids Road. Final route = whatever the user's street references show.
- Light: golden-hour start, ending at blue hour with the pyramids lit (night racing lights like Daytona).

## Status (24 Oct 2026)
- All 5 people and all 4 cars are locked as Higgsfield Elements (free). **Nothing generated yet. No credits spent.**
- Location refs received (GEM aerial, GEM-to-pyramids bridge road, GEM golden-hour aerial).
- Waiting on the user for: OK on the test pass (see Production plan), plus optional refs for the Sphinx / plateau / Panorama point.

## Decided by the user (24 Oct 2026)
- **Faces visible, NO helmets at all.** It's a street race through Egypt, not a track race: everyone in street clothes, faces from their character sheets.
- Each friend's face comes ONLY from their approved character sheet (table above).
- Car photo angles requested from the user: front 3/4 (main), side profile, rear 3/4, straight front, straight rear, wheel close-up,
  plus any custom detail. Shot at eye/headlight height, from 3-5 m, daylight in open shade, the whole car in frame, no other cars touching it.

- **Karen** rides as Omar's passenger in the P1. No 5th car.
- **Main battle = Sabeih (Bentley) vs Omar (P1), door to door.**
- Reference budget: Genjutsu takes max 5 reference images per generation (people + cars count together). So every shot holds only who is in it:
  wide/exterior battle shots = 2 cars only (faces too small to need sheets); in-cabin close-ups = 1 driver sheet (+ Karen in the P1) + that car.

## Open questions for the user
0c. Colour clash handled: Bentley = MATTE burgundy-plum; Porsche = GLOSSY magenta-burgundy with white GT3 RS graphics and a big wing. Always state 'matte' vs 'glossy' in prompts.
0. ~~ROU's Audi~~: R8 V10 Spyder. Rejected: the R8 GT coupe photo and the 1st-gen (2010) Spyder side photo. Wheels: **black** (decided).
0b. ~~Omar's P1~~: green-teal track car (photo 1). Purple road P1 NOT used.
1. ~~Car 4 driver~~: answered, ROU is the 4th friend.
2. ~~Sabeih's Bentley~~: answered with 4 photos (24 Oct), all the same car.
3. ~~Fahmy's car~~: answered, modern 992 GT3 RS (photos 24 Oct).
4. Omar's P1 colour.
5. Faces: the user wants each friend's correct character reference used (see table above). Still open: should faces appear (helmet off / in-cabin close-ups like the movie)? If yes we need real photos
   (same rule as the couple project: phone back camera, daylight, no filter, front + 3/4 views).
6. ~~Who wins~~: **Sabeih wins** (Bentley beats Omar's P1 at the photo finish).
7. ~~Length/format~~: **45 s, 16:9** (decided).
8. ~~Sound~~: **like the F1 Daytona scene**: engine sounds, car sound design and a cinematic racing score. Do NOT rip audio from the YouTube clip (copyrighted); build our own: per-shot engine SFX + an original Zimmer-style pulse score (generated), mixed so engines lead and the score swells on launch/climax.

## Production plan (decided 24 Oct)
- **Not Genjutsu, not Katana as the engine.** Genjutsu needs a real driving/source video to transform (we have none of cars in Giza). Katana recreates a reference video shot-for-shot; the only reference is the copyrighted F1 Daytona clip (night, oval track, can't be used as source), and Katana runs end-to-end without per-step price approval.
- Instead, per shot: **start frame** (image model + Elements: people, car, location photo) -> **image-to-video** clip -> edit, plates, sound in post.
- Prices checked 24 Oct (balance 748.88 credits): start frame `nano_banana_pro` 2k 16:9 = **2 cr**; video 5 s: `kling3_0` = **10 cr**, `cinematic_studio_3_0` 720p = **25 cr** / 1080p = **65 cr**, `seedance_2_5` 1080p = **80 cr**.
- Full film is ~16 clips. Kling 3.0 ~= 160 cr + retakes; Cinema Studio 720p ~= 400 cr + retakes; 1080p options exceed the balance.
- **Kling 4.0 is on Higgsfield** (`kling4_0`, image-to-video with start image + up to 7 reference images/element IDs): 5 s = **7.5 cr at 720p / 10 cr at 1080p**. Full film at 1080p ~= 160 cr + retakes.
- **Next: test pass = 1 start frame (shot 5, Bentley vs P1, 2 cr) + animate it in Kling 4.0 1080p (10 cr) and Cinema Studio 3.0 720p (25 cr) = 37 credits**, compare, then pick the model for the rest. **Test DONE 24 Oct (37 cr spent, ~711.88 left)**; results in MEDIA_MANIFEST. Waiting for the user's pick.

## RULE: video model + sound (set by the user, 24 Oct)
- User picked **Cinema Studio Video 3.0** over Kling 4.0 after the test. Use `cinematic_studio_3_0`, **720p, genre `action`, `generate_audio: true` ALWAYS** (the test clip was silent only because audio defaults to off; audio costs nothing extra: 25 cr per 5 s either way).
- Style brief: real Hollywood, "$1-billion" street-race scene: drifting around each other, drifting through the streets, hitting objects (cones, barriers, crates) and carrying on. See SHOTLIST v2.
- Budget at 711.88 cr: 16 masters x 5 = 80 + 16 clips x 25 = 400 -> ~480, leaving ~230 for redos.

## PROMPT RULES learned from user feedback (24 Oct)
- People: candid, unposed, NOT looking at the camera; side / three-quarter views; real skin with imperfections. Posed lens-facing portraits read as AI.
- Cars: avoid camera rigs that put the car's own door/mirror big in the foreground (distorted the Bentley 'like a Beetle'). Prefer inside-cabin or clean exterior angles.
- No tyre smoke. Museum = the real facade from the location photo.
- Sabeih's `Sabih-Main` sheet is itself AI-generated (from the couple project); real photos of Sabeih would improve face realism further.

## RULE: master image model (set by the user, 24 Oct)
- Every scene's master/start image = **GPT Image 2.5, variant `sunburst`, quality `max`** (`gpt_image_2_5`). Not Nano Banana, not other image models.
- Resolution: **1k (5 cr) by default, aiming for 1080p video**; go to 2k (9 cr) or 4k (15 cr) only when a shot needs it (e.g. close-ups, the hero frames). Quote before each.
- If a Sunburst generation fails or comes out wrong, **redo it with Sunburst** (same model), never switch models silently.
- The shot 5 test frame (Nano Banana Pro) is test-only; shot 5 gets a new Sunburst master.

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
