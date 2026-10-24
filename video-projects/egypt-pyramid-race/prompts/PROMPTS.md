# Prompts (drafts, not generated yet)

Fill the `[TBC]` parts after the open questions in `README.md` are answered.
Plates are left **blank** on purpose; `SBH` / `OMR` / `WIZ` / `ROU` are composited in post.

## Shared style suffix (append to every shot prompt)
```
Shot on IMAX 65mm, anamorphic lens, cinematic motorsport film look like a big-budget racing movie, deep blacks, warm golden sunlight against cool shadows, subtle anamorphic lens flares, natural motion blur, realistic physics, real-footage look, photorealistic cars with accurate proportions and badges, no text, no watermark, no logos added, license plates blank.
```

## 1. Car reference sheets (one per car)
Format: 16:9, 2k. Same template, swap the car line.
```
Automotive reference sheet on a plain light-grey studio background, three views of the SAME car in one image: front three-quarter view on the left, side profile in the middle, rear three-quarter view on the right. [CAR LINE]. Accurate real-world proportions, correct wheels and lights, soft studio lighting, sharp focus, photorealistic, blank white license plates, no text, no watermark, no people.
```
Car lines:
- Sabeih (SBH): `A new fourth-generation Bentley Continental GT coupe in a satin matte burgundy-plum wrap, single oval LED headlamps with a light blade, black mesh grille and black lower intakes, gloss black twisted multi-spoke wheels with red brake calipers, dark exterior trim`
- Omar (OMR): `A McLaren P1 hypercar in [colour TBC] with its active rear wing`
- Fahmy (WIZ): `A Porsche 992 911 GT3 RS in glossy deep magenta-burgundy, white GT3 RS script along the lower doors, white front bumper accents, huge swan-neck rear wing with white PORSCHE lettering, vented bonnet and louvred front fenders, dark burgundy-black multi-spoke wheels`
- ROU (ROU): `A bright red second-generation Audi R8 V10 Spyder convertible with the roof down, black fabric roof stowed, black side blades, black honeycomb grille, silver 5-spoke wheels with red brake calipers, no rear wing`

## 2. Shot start frames (image model; inputs = car sheets + location reference photo)
Shot 1, establishing:
```
Aerial drone view at golden hour of four supercars lined up side by side on the wide stone plaza in front of the Grand Egyptian Museum in Giza, the museum's huge triangular translucent alabaster facade and the hanging obelisk of Ramesses II behind them, the three Giza pyramids on the horizon, long shadows, heat haze. From left to right: the Bentley from @Image 1, the McLaren P1 from @Image 2, the burgundy Porsche from @Image 3, the red Audi R8 Spyder from @Image 4.
```
Shot 4, launch:
```
Ultra-low ground-level camera on the asphalt as four supercars launch hard off the line toward the lens, tyre smoke, front splitters inches from the camera, the Grand Egyptian Museum facade behind, golden hour.
```
Shot 9, Sphinx:
```
Low wide-angle shot with the Great Sphinx of Giza in frame, a burgundy Porsche 911 and an orange McLaren P1 blasting past side by side in a blur, dust kicked up, Khafre pyramid behind, late golden hour.
```
Shot 11, climax:
```
Long-lens tracking shot from a chase car at blue hour: a customized Bentley Continental GT and a McLaren P1 door to door at high speed on a desert road, the three Giza pyramids lit up behind them against a deep blue sky, headlights on, motion-blurred road.
```
(Remaining shots are written once the route and street references are locked.)

## 3. Image-to-video motion prompts (per shot)
Template:
```
[camera move] while [car action]. Keep the cars' design, colours and proportions exactly as in the start frame. Realistic speed, realistic suspension and tyre behaviour, no morphing, no extra cars, no people walking in the road.
```
Example (shot 7):
```
Fast whip-pan from left to right following the burgundy Porsche as it dives up the inside of the red Audi R8 into the corner, slight body roll, dust off the kerb, pyramids in the background.
```

## 4. Music prompt (only if the user picks a generated score)
```
45-second cinematic racing score in the style of a big-budget motorsport film: pulsing synth bass and ticking clock percussion building tension for 6 seconds, huge hybrid orchestral and electronic drop on the launch at 6.5 s, driving 140 BPM drums with subtle Middle-Eastern string and percussion colour, a breakdown at 17.5 s, a rising climax from 30 s, hard stop to silence at 36 s, short low drone outro. No vocals.
```
