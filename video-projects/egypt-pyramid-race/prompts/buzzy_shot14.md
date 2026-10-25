# Shot 14 redo for Buzzy (two steps)

User direction (25 Oct): WIDE angle, not close; every person at true size for their car.
Video model: Seedance 2.5 only (never Kling unless cheaper and confirmed by the user).

## Step 1: new wide start image
Model: gpt-image-2.5-sunburst, 2k, 16:9.
Reference images, in this order:
1. `renders/shot14_close_graded.jpg` (cars + faces)
2. `renders/shot13_master_v4_graded.jpg` (Sabeih)
3. `renders/shot07_master_v2_graded.jpg` (Omar + Karen)

```
Real motion-picture film frame from a big-budget street-racing movie, shot on a real cinema camera with a WIDE-ANGLE lens from a low camera car on the roadside, natural true-to-life colours, fine film grain, documentary realism, not CGI. Clear bright MORNING on the Giza plateau road, Egypt. A WIDE shot, not close: both cars are fully in frame, side-on, with plenty of road in front and behind them and a lot of desert and sky around them. The satin MATTE burgundy-plum Bentley Continental GT (as in Image 1) in the near lane and the green-teal McLaren P1 GTR with its huge rear wing (as in Image 1) in the far lane, side by side at full speed with a clear gap between them, moving left to right. The people inside are at TRUE HUMAN SCALE for the size of the cars: small in this wide frame, sitting low, head and shoulders visible in the side windows, never oversized. Bentley driver: the man from Image 2 (curly hair, beard, leather jacket), window down. McLaren: the man from Image 3 driving and the woman from Image 3 beside him. Candid, nobody looks at the camera. Behind them across the desert EXACTLY THREE Giza pyramids, never four. Road, wheels and background with strong motion blur showing high speed. No tyre smoke, no sparks, no contact, no other traffic, no text, blank license plates, no watermark.
```

## Step 2: video
Model: Seedance 2.5, 16:9, 5 s, 1080p, sound ON. Start image = the Step 1 result.

```
Use the reference image as the exact first frame. Real footage of a street race on the Giza plateau road in clear morning light, played at REAL-TIME speed, no slow motion. WIDE shot: the camera car stays wide and low at the roadside and is noticeably SLOWER than the race cars, so the matte burgundy Bentley in the near lane and the green-teal McLaren P1 beside it, flat out at around 200 km/h, steadily pull away and leave the frame on the right within about four seconds. Keep the framing wide the whole time, never zoom in. Wheels are a blur, road and desert streak past with strong motion blur, the bodies shake slightly at speed, a little sand blows off the road edge. Clean, real driving: a clear gap between the cars, no contact, no scraping, no sparks, no tyre smoke. The people inside stay at TRUE HUMAN SCALE, small in the wide frame, simply driving; faces, hair and clothes exactly as in the reference image. Behind them EXACTLY THREE Giza pyramids, never more, never duplicated, sliding slowly in parallax. Keep both cars' design and colours exactly as in the reference. Photorealistic, natural colours, real camera vibration, no extra cars, no text, no music. Sound: two engines at full throttle screaming past, wind roar, tyres humming on asphalt.
```
