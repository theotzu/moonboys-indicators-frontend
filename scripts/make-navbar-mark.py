#!/usr/bin/env python3
r"""Cut the MOON BOYS roundel out of the logo file for the navbar.

Theo, 2026-09-05: "it says moonboys podcast in the top left corner. can we just
put the logo up there" — then, on the first attempt (the MBP moon that sits in
Logo/): "ew no i dont like that moonboys logo. how about this one", pointing at
ChatGPT Image Jul 12, 2026, 12_30_16 PM.png.

⚠️ THE SOURCE IS A SQUARE PNG WITH A BLACK STARFIELD AROUND THE ROUNDEL, NOT A
LOGO ON TRANSPARENCY. That black is #000; the navbar is #0a0e1a. Dropped in
square, the corners are a slightly different black from the bar behind them and
the mark reads as a pasted-on tile. So the roundel gets cut out and everything
outside it becomes transparent.

The circle was measured, not guessed. Scanning the centre row and centre column
for anything above L=40 (the starfield is under it) puts the outer amber ring
at x 22-1231 and y 24-1240 of a 1254x1254 frame: centre (626.5, 632), radius
~606. The mask uses that circle, so the amber arc survives and the stars do not.

Output is 256px — comfortably over 4x the largest size the navbar draws it at,
so it stays sharp on any DPR.

    python scripts/make-navbar-mark.py   ->  public/moon-boys-mark.png
"""
from PIL import Image, ImageDraw
import numpy as np

SRC = r"Z:\! Accounts\moonboyspodcast\ChatGPT Image Jul 12, 2026, 12_30_16 PM.png"
CX, CY, R = 626.5, 632.0, 606.0
OUT = 256
SS = 8  # supersample the mask, then downsample — cheap, smooth rim

src = Image.open(SRC).convert("RGB")

# Crop to the roundel's bounding square first so it fills the output frame edge
# to edge; padding here is padding the navbar pays for in height.
box = (round(CX - R), round(CY - R), round(CX + R), round(CY + R))
disc = src.crop(box).resize((OUT, OUT), Image.LANCZOS)

m = Image.new("L", (OUT * SS, OUT * SS), 0)
ImageDraw.Draw(m).ellipse([0, 0, OUT * SS - 1, OUT * SS - 1], fill=255)
mask = m.resize((OUT, OUT), Image.LANCZOS)

out = disc.convert("RGBA")
out.putalpha(mask)
out.save("public/moon-boys-mark.png", "PNG", optimize=True)

a = np.asarray(out)
print("public/moon-boys-mark.png %dx%d  opaque %.1f%%  corner alpha %d"
      % (OUT, OUT, (a[..., 3] > 250).mean() * 100, a[0, 0, 3]))
