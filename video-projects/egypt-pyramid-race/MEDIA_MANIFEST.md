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
| File | What | Status |
|---|---|---|
| `shot06_master_v1.png` (job `fe50240a-c60f-403f-b3bb-23a31f20a9e5`, Sunburst max 1k, 5 cr, 1344x752) | Shot 6 tandem drift, 4 cars, GEM roundabout | Strong. All 4 cars accurate (Bentley now has the correct single-oval lamps, P1 teal, Porsche graphics, R8 roof down). Museum and pyramids read as Egypt. Look is a bit glossy/CG compared with Nano Banana Pro |
| `shot07_master_v1.png` (job `e1c9bfbe-0f86-4da8-9ef0-52d119c13672`, Sunburst max 1k, 5 cr, 1344x752) | Shot 7 inside the P1: Omar driving, Karen passenger | Needs redo. Omar close to his sheet; Karen only roughly like hers; a stray second steering wheel in front of Karen; museum through the window drawn as generic pointed triangles |
| `shot05_start_v1.png` (Higgsfield job `403e2456-dee6-4db0-8497-70159dd4d887`, nano_banana_pro 2k 16:9, 2 cr) | Shot 5 start frame: Bentley vs P1 beside GEM | Good test frame. QC: Bentley headlamps look closer to the older twin-lamp GT than the single-oval new one; P1 reads darker green than teal; two construction cranes appeared on the right despite the prompt. Fix all three before final |
| Kling 4.0 test clip (job `2a9645cd-322d-454c-a2e4-eb18fcf0235a`, 1080p 5 s, 10 cr) | Shot 5 animated | DONE (1928x1076, 24 fps, 5.04 s, has audio). Most dramatic: camera pushes in, tyre smoke, cars stay accurate. Background drifts: the pyramids jump position, a concrete wall appears, the museum shrinks. Note: Kling 4.0 image-to-video rejects `kling_element_ids` (start image only; the first attempt was refused before starting, no charge) |
| Cinema Studio 3.0 test clip (job `c950514f-ad4f-405e-9715-3abc2d3f8832`, 720p 5 s, 25 cr) | Shot 5 animated, with car Elements in the prompt | DONE (1280x720, 24 fps, 5.04 s, silent). Calmer tracking move, less smoke; cars AND background (museum, pyramids) stay stable all 5 s. Only 720p |
