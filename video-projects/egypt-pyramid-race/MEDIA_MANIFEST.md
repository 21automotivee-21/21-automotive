# Media manifest - NOT in this repo

This repo is PUBLIC, so photos, renders and music are kept OFF GitHub (see `.gitignore`).
Suggested local folder on the owner's PC: `S:\Movie  Production\Youssef\_Egypt_Race\` with `refs\`, `sheets\`, `frames\`, `renders\`, `FINAL\`.
In a cloud session: ask the user to upload what you need, or find it in their Higgsfield / Kling account history.

## Style reference
| What | Where |
|---|---|
| F1 The Movie - Daytona Scene (IMAX 4K) | https://www.youtube.com/watch?v=ubZFFdgx7qY (do not download or re-use footage, it is reference only) |

## Street / location references (from the user)
| File | Location | Used in shot |
|---|---|---|
| `loc_gem_aerial.jpg` (Higgsfield media `8436c8d7`) | GEM from the air: facade, palm gardens, the flyover interchange in front, wide boulevards each side, 3 pyramids behind | 1, 3, 4, 5, 8 (ignore the construction cranes) |
| `loc_gem_bridge_road.jpg` (Higgsfield media `895e8f9d`) | Curving road under the sandstone-clad bridge between GEM and the plateau, young palms, Khufu + Khafre behind | 6, 7 |
| `loc_gem_golden_lines.jpg` (NOT uploaded: has white dashed lines drawn on it) | GEM golden-hour aerial showing the facade lines pointing at the pyramids | Look reference for shot 1 only (described in the prompt, not used as an image input) |
| _still missing (optional)_ | Sphinx, plateau roads, Panorama point | 9-13. Without refs the model draws them from its own knowledge |

## Car and driver references (from the user)
| File | Car / person | Notes |
|---|---|---|
| `audi_1_front34.jpg` (chat upload 24 Oct) | ROU - Audi R8 | **APPROVED, main reference.** Front 3/4. Red 2nd-gen **R8 V10 Spyder**, roof down, silver 5-spoke wheels, red calipers, black side blade, black honeycomb grille |
| `audi_2_rear34.jpg` (chat upload 24 Oct) | ROU - Audi R8 | Rear 3/4, but a different car: **R8 GT coupe** (facelift) with a big fixed rear wing, black wheels, carbon side blade. **REJECTED by the user (24 Oct): do not use.** |
| `p1_1_front34.jpg` (chat upload 24 Oct) | Omar - McLaren P1 | **APPROVED** (Element `Race-P1-OMR`). Front 3/4. Track-spec **P1 GTR / P1 LM-style**: deep green-teal colour-shift paint, roof air snorkel, huge fixed swan-neck rear wing, big front splitter, louvred front fenders, silver multi-spoke wheels |
| `p1_2_rear34.jpg` (chat upload 24 Oct) | Omar - McLaren P1 | Rear 3/4, but a different car: **road P1**, dark purple paint, active (retracting) rear wing, dark wheels, orange calipers. **REJECTED by the user (24 Oct): do not use.** |
| `bentley_wheel.jpg`, `bentley_front34.jpg`, `bentley_rear34.jpg`, `bentley_headlight.jpg` (chat upload 24 Oct) | Sabeih - Bentley | **APPROVED.** All one car; uploaded to Higgsfield as Element `Race-Bentley-SBH`. Ignore the "New Continental GT" dealer placards (plates stay blank) |
| `porsche_front34.jpg`, `porsche_rear34.jpg`, `porsche_wheel.jpg` (chat upload 24 Oct, phone screenshots of a studio render) | Fahmy - Porsche | **APPROVED.** Cropped to remove the phone status bar, the "Standing on Business" sticker and the player button before upload. Higgsfield Element `Race-Porsche-WIZ` |
| `r8_side_gen1.jpg` (chat upload 24 Oct) | ROU - Audi R8 | **NOT USED**: a 1st-gen (2010) R8 V10 Spyder, different body and lights, and a driver in the shot |
| `r8_rear34.jpg` (chat upload 24 Oct) | ROU - Audi R8 | **APPROVED** rear 3/4 (2nd-gen Spyder, black wheels). In Element `Race-Audi-ROU` with the front 3/4 |
| `fahmy_sheet.webp`, `rou_sheet.webp`, `karen_sheet.webp`, `omar_face/body.webp` (chat upload 24 Oct) | People | **APPROVED** character references (Elements `Race-Fahmy`, `Race-ROU`, `Race-Karen`, `Race-Omar`). Private, never commit |

## Generated media
(Approved look: Sunburst max 2k + `scripts/film_grade.py`; fix small errors like an extra pyramid with a 2-cr Nano Banana Pro edit. Graded copies live in `renders/`, git-ignored.)

| File | What | Status |
|---|---|---|
| `renders/shot01_morning_graded.jpg` (job `7444eea5-f6a8-486c-b144-5a9a3f79b28b`, Sunburst max 2k, 9 cr) | **Shot 1 FINAL master**: aerial, 4 cars on the GEM plaza | Most realistic so far; museum very close to the real GEM; 3 pyramids; all cars right |
| `renders/shot04_morning_graded.jpg` (job `98edd8ee-9006-4962-b573-b7b29ed1a087` + NBP edit `e6d45845-1928-4160-89fc-c4cf11d138d9` 2 cr + local skyline patch) | **Shot 4 FINAL master**: low launch cam, sand spray | 4th pyramid removed (the NBP edit missed it; fixed with a free local patch from the neighbouring skyline) |
| `renders/shot05_morning_graded.jpg` (job `c0300718-b54b-4cd9-b902-98f829eb5470`, 9 cr) | **Shot 5 FINAL master**: Bentley vs P1 side-on | Excellent; matte Bentley, teal P1, 3 pyramids |
| `renders/shot06_morning_graded.jpg` (job `7766276c-8365-41fe-908b-238c6abe1a22`, 9 cr) | **Shot 6 FINAL master**: roundabout, tyre marks | Good, 3 pyramids, no smoke; cars only slightly sideways -> push the slide in the video prompt |
| `renders/shot07_morning_graded.jpg` (job `5ddd1e12-798d-448f-ad70-31b0acb48294`, 9 cr) | **Shot 7 FINAL master**: Omar + Karen in the P1, morning | No smoke, 3 pyramids, faces close to the sheets |
| `renders/shot02_morning_graded.jpg` (job `4863bf52-1995-4f68-9fb2-4a7deb4aaf00` + NBP edit `ff0a9e2b-d031-40f8-b71c-849ec69a91a4` 2 cr) | **Shot 2 FINAL**: ROU at the start in the R8 | ROU matches her sheet; 4th pyramid removed. A few spectators far in the background |
| `renders/shot03_morning_graded.jpg` (job `6fdf2e85-050b-400c-96db-9fdd5ed73f62`) | **Shot 3 FINAL**: rev-up, exhaust shimmer, bottle | Good |
| `renders/shot08_morning_graded.jpg` (job `8d9d287f-4c1c-4adb-bb2b-ae91cbd9b2ea`) | **Shot 8 FINAL**: Porsche through cones + water barriers, R8 behind | Excellent |
| `renders/shot09_morning_graded.jpg` (job `848e388f-e81f-478c-804f-8c973cd174fb`) | **Shot 9 FINAL**: Fahmy pushes glasses up, water on the glass | Fahmy matches his sheet very well |
| `renders/shot10_morning_graded.jpg` (job `3a9f216e-6673-4892-b863-c9fc7a9e0355`) | Shot 10 v1 | REJECTED by user: cartoonish, ROU smiling |
| `renders/shot10_v2_graded.jpg` (job `627f1cb0-58a4-4827-aaaa-90fb37ca87b3`, 9 cr) | **Shot 10 FINAL**: R8 smashes weathered wooden crates, ROU jaw clenched | Realistic debris, no fruit, 3 pyramids |
| `renders/shot11_morning_graded.jpg` (job `2eb15011-3054-4128-ab34-2cef5c4e1165`; first try `d07df05b` failed, refunded) | **Shot 11 FINAL**: Bentley sparks on the kerb wall, P1 alongside | Good |
| `renders/shot12_morning_graded.jpg` (job `70ce1e30-5ac6-4e2d-8839-48f5425e26ef`; first try `794288b2` failed, refunded) | **Shot 12 FINAL**: four cars past the Sphinx | Good, Sphinx a bit small |
| `renders/shot14_morning_graded.jpg` (job `a904360e-7134-4d75-9570-b290d00659e6`) | **Shot 14 FINAL**: climax door to door, sparks | Excellent |
| `renders/shot15_morning_graded.jpg` (job `5122e642-5db4-4686-95b2-8fe6f117941b`) | **Shot 15 FINAL**: photo finish on a chalk line | Good |
| `renders/shot16_morning_graded.jpg` (job `5bc8734c-26ed-4294-b425-3a3a78a3b153`) | Shot 16 v1 (Karen only) | Superseded: user wants all five friends |
| `renders/shot16_v2_graded.jpg` (job `4ef843cb-4f91-4d19-8a1a-b3124d3cd353`, 9 cr) | **Shot 16 FINAL**: all five in front of their own cars (ROU-R8, Omar+Karen-P1, Sabeih-Bentley, Fahmy-Porsche) | Good likeness, 3 pyramids |
| `renders/clips/shot05_clip_v1.mp4` (job `eb783d1c-dc0f-403d-a6c3-969cd72a3e50`, Cinema Studio 3.0 720p 5 s, audio on, 25 cr) | Shot 5 clip | Cars stay exact; native engine audio (-13 dB mean). Background pyramids drift a little during the move |
| `renders/clips/shot07_clip_v1.mp4` (job `d5f8893e-7772-450e-b55f-601a74123272`, 25 cr) | Shot 7 clip | REJECTED by user: Omar's face/head frozen, not realistic |
| Seedance 2.5 test (job `ed308c3f-d9f1-4e7b-a63b-0814c8d8cb1e`, omni_reference 720p 5 s audio, 35 cr) | Shot 7 retry on a different model | rendering |
| `renders/clips/shot08_clip_v1.mp4` (job `d8f0f71b-5b2a-44fa-bb10-62ac41d75abb`, 25 cr) | Shot 8 clip | REJECTED by user: the Porsche appears to hop over/through a solid wall of barriers, unrealistic. Fix: new master where the Porsche clips only the END of a short line of cones/barriers with its front corner (glancing hit, car stays planted), then re-animate |
| `renders/clips/TEST_REEL_shots_05_07_08.mp4` | 15 s test reel, ffmpeg film grade (sat 0.8, cool/warm balance, grain) | Sent to the user for approval |
| `renders/ALL_16_MASTERS.jpg` | Contact sheet of the 16 final masters in film order | |
| `renders/shot06_master_v2_graded.jpg` (job `0a48d3f6-6d23-45da-904c-0332f81502f4`, Sunburst max 2k, 9 cr) | Shot 6 tandem drift, no smoke | Realistic, no smoke, tyre marks, all 4 cars correct. Drift angle is mild (cars barely sideways); museum drawn as a glass-pyramid facade, not the exact GEM |
| `renders/shot13_master_v1_graded.jpg` (job `6e2c3deb-cbfc-478e-b506-fd500c13b77f`) | Shot 13 v1 | REJECTED by user: AI-looking face (posed, looking at lens) and Bentley distorted 'like a Beetle' from the outside-window rig angle |
| `renders/shot13_master_v2_graded.jpg` (job `9ffe5808-9d4a-4206-9ec0-f6346956e9aa`, Sunburst max 2k, 9 cr) | Shot 13 v2: camera on the passenger seat, Sabeih candid, eyes on the road | Liked, but user wants MORNING and saw 4 pyramids -> superseded |
| `renders/shot13_master_v3_graded.jpg` (job `b2be4702-08c7-4550-bda0-b564616710e4`, Sunburst max 2k from v2, 9 cr) | Shot 13 v3 morning | Morning OK but still a 4th pyramid through the windscreen |
| `renders/shot13_master_v4_graded.jpg` (job `f9a0cbc5-7cfd-4c25-bd20-e0d7f78d44c8`, Nano Banana Pro edit of v3, 2 cr, 2752x1536) | **Shot 13 FINAL master**: morning, exactly 3 pyramids | APPROVED candidate. Use as the start image for the shot 13 clip |
| `renders/shot07_master_v2_graded.jpg` (= shot07_SB_2k + film grade) | Shot 7 Omar + Karen | APPROVED look (still has tyre smoke outside; regenerate without smoke before animating) |
| `shot06_master_v1.png` (job `fe50240a-c60f-403f-b3bb-23a31f20a9e5`, Sunburst max 1k, 5 cr, 1344x752) | Shot 6 tandem drift, 4 cars, GEM roundabout | Strong. All 4 cars accurate (Bentley now has the correct single-oval lamps, P1 teal, Porsche graphics, R8 roof down). Museum and pyramids read as Egypt. Look is a bit glossy/CG compared with Nano Banana Pro |
| `shot07_NBP_2k.png` (job `2e8ea630-52fe-408f-a9d0-8b5116dadd43`, Nano Banana Pro 2k, 2 cr, 2752x1536) | Shot 7 head-to-head A | Most realistic (looks like real onboard footage). Omar + Karen faces good. Weak: ordinary seatbelts and a generic cabin, not a P1 race cockpit |
| `shot07_SB_2k.png` (job `c8fefbdf-5e45-4ac1-adeb-7749155e56e7`, Sunburst max 2k, 9 cr, 2688x1520) | Shot 7 head-to-head B | Far more realistic than Sunburst 1k thanks to the film-realism prompt. Correct P1 race cockpit with harnesses and rear wing, correct new Bentley lamps, museum closer to the real GEM, faces good. Slightly more 'graded' than A |
| `shot07_FLARE_2k.png` (job `08119bee-cae2-4ff4-a3ef-919f20271344`, GPT Image 2.5 Flare max 2k, 9 cr, 2688x1520) | Shot 7 head-to-head C | Best balance: natural film-like skin and light (close to Nano Banana's realism) at Sunburst-level sharpness; faces closest to the sheets; real P1 cockpit, harnesses, one wheel. Weak: Bentley came out GLOSSY dark red, not matte plum |
| `shot07_SB_then_NBP.png` (job `644ffc3d-d33a-44a9-8cc7-8ca776bda1a0`, Nano Banana Pro edit of the Sunburst 2k frame, 2 cr) | Shot 7 realism pass | Kept composition and faces, slightly more natural skin/hair detail; small gain only |
| `shot07_SB_2k_filmgrade.jpg` (local, free, `scripts/film_grade.py`) | Shot 7 Sunburst + film grade | Lower saturation, tamed orange, grain: noticeably more 'real camera' |
| `shot07_master_v1.png` (job `e1c9bfbe-0f86-4da8-9ef0-52d119c13672`, Sunburst max 1k, 5 cr, 1344x752) | Shot 7 inside the P1: Omar driving, Karen passenger | Needs redo. Omar close to his sheet; Karen only roughly like hers; a stray second steering wheel in front of Karen; museum through the window drawn as generic pointed triangles |
| `shot05_start_v1.png` (Higgsfield job `403e2456-dee6-4db0-8497-70159dd4d887`, nano_banana_pro 2k 16:9, 2 cr) | Shot 5 start frame: Bentley vs P1 beside GEM | Good test frame. QC: Bentley headlamps look closer to the older twin-lamp GT than the single-oval new one; P1 reads darker green than teal; two construction cranes appeared on the right despite the prompt. Fix all three before final |
| Kling 4.0 test clip (job `2a9645cd-322d-454c-a2e4-eb18fcf0235a`, 1080p 5 s, 10 cr) | Shot 5 animated | DONE (1928x1076, 24 fps, 5.04 s, has audio). Most dramatic: camera pushes in, tyre smoke, cars stay accurate. Background drifts: the pyramids jump position, a concrete wall appears, the museum shrinks. Note: Kling 4.0 image-to-video rejects `kling_element_ids` (start image only; the first attempt was refused before starting, no charge) |
| Cinema Studio 3.0 test clip (job `c950514f-ad4f-405e-9715-3abc2d3f8832`, 720p 5 s, 25 cr) | Shot 5 animated, with car Elements in the prompt | DONE (1280x720, 24 fps, 5.04 s, silent). Calmer tracking move, less smoke; cars AND background (museum, pyramids) stay stable all 5 s. Only 720p |
