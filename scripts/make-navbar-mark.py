#!/usr/bin/env python3
r"""Resize the pre-cut MOON BOYS roundel for the navbar.

Theo, 2026-09-05, third pick: "lets try this instead" — the "copy" of the
Jul 12 file. Two before it: the MBP moon in Logo/ ("ew no i dont like that
moonboys logo") and the uncut Jul 12 square.

WHY THERE IS NO CIRCLE MASK IN HERE ANY MORE. The two earlier sources were
flattened squares — one on a grey gradient, one on a black starfield — and both
needed the disc measured and cut out or they would have read as a tile pasted
onto the bar. This file arrives already cut: mode RGBA, corners at alpha 0,
67% of the frame opaque. Measuring and re-cutting it could only clip the soft
outline fragments the artwork carries outside the ring, so the alpha that is
already in the file is used exactly as it is.

⚠️ PREMULTIPLIED RESAMPLE, NOT A PLAIN ONE. The transparent pixels in this file
are WHITE with alpha 0. LANCZOS ignores alpha and averages RGB, so a plain
resize drags that white into every edge pixel and hangs a pale halo around the
ring — visible against #0a0e1a, and exactly the artifact the whole exercise is
meant to avoid. Multiplying RGB by alpha before resampling and dividing it back
out afterwards makes the transparent pixels contribute nothing.

    python scripts/make-navbar-mark.py   ->  public/moon-boys-mark.png
"""
from PIL import Image
import numpy as np

SRC = r"Z:\! Accounts\moonboyspodcast\ChatGPT Image Jul 12, 2026, 12_30_16 PM copy.png"
OUT = 256

src = Image.open(SRC).convert("RGBA")
a = np.asarray(src, dtype=np.float64)
rgb, alpha = a[..., :3], a[..., 3:] / 255.0

pre = Image.fromarray(np.concatenate([rgb * alpha, alpha * 255], axis=2).astype(np.uint8), "RGBA")
small = np.asarray(pre.resize((OUT, OUT), Image.LANCZOS), dtype=np.float64)

al = small[..., 3:] / 255.0
# Where nothing is left, keep the colour channels at zero rather than dividing
# by it — the pixel is invisible either way, and NaNs are not.
un = np.divide(small[..., :3], al, out=np.zeros_like(small[..., :3]), where=al > 0)
out = Image.fromarray(
    np.concatenate([np.clip(un, 0, 255), al * 255], axis=2).astype(np.uint8), "RGBA"
)
out.save("public/moon-boys-mark.png", "PNG", optimize=True)

o = np.asarray(out)
print("public/moon-boys-mark.png %dx%d  opaque %.1f%%  corner alpha %d"
      % (OUT, OUT, (o[..., 3] > 250).mean() * 100, o[0, 0, 3]))
