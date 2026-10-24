"""Free "real camera" grade for AI masters/frames: lower saturation, film S-curve with
lifted blacks, tamed orange, fine luminance grain, softened AI micro-contrast.
Usage: python film_grade.py in.png out.jpg"""
import sys
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
im = ImageEnhance.Color(Image.open(src).convert("RGB")).enhance(0.78)
a = np.asarray(im).astype(np.float32) / 255
a = 0.03 + 0.94 * (a ** 1.04)
a = a - 0.06 * np.sin(np.pi * a) * (a - 0.5)
a[..., 0] *= 0.97
a[..., 2] *= 1.03
a = np.clip(a + np.random.default_rng(7).normal(0, 0.022, a.shape[:2])[..., None], 0, 1)
out = Image.fromarray((a * 255).astype(np.uint8))
out = out.filter(ImageFilter.GaussianBlur(0.6)).filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=2))
out.save(dst, quality=93)
