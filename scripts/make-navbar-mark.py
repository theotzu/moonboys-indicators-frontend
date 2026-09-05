#!/usr/bin/env python3
r"""Cut the MBP moon out of the logo file for the navbar.

Theo, 2026-09-05: "it says moonboys podcast in the top left corner. can we just
put the logo up there" — then, with the path: Z:\! Accounts\moonboyspodcast.

⚠️ THE SOURCE IS A JPEG ON A GREY GRADIENT, NOT A LOGO ON TRANSPARENCY. Pasted
into the navbar as-is it is a grey square sitting on the bar's near-black, which
reads as a broken image rather than a mark. So the disc gets cut out and
everything outside it becomes transparent.

The moon was measured, not guessed: thresholding the source at L>110 puts the
disc at x 32-475, y 26-471 of a 502x502 frame — centre (253.5, 248.5), radius
~222. The mask uses that circle with a one-pixel feather so the rim is not
stair-stepped at 36px, which is the size the navbar actually draws it at.

Output is 256px — 3.5x the largest rendered size, enough for any DPR, and small
enough that it is not worth a second file.

    python scripts/make-navbar-mark.py   ->  public/moon-boys-mark.png
"""
from PIL import Image, ImageDraw
import numpy as np

SRC = r"Z:\! Accounts\moonboyspodcast\Logo\eb0f5d8b-bc6a-4ff1-8695-ba86215ee6d5 copy.jpg"
CX, CY, R = 253.5, 248.5, 222.0
OUT = 256
SS = 8  # supersample the mask, then downsample — cheap, smooth rim

src = Image.open(SRC).convert("RGB")

# Crop to the disc's bounding square first so the moon fills the output frame
# edge to edge; any padding here is padding the navbar has to pay for in height.
box = (round(CX - R), round(CY - R), round(CX + R), round(CY + R))
disc = src.crop(box).resize((OUT, OUT), Image.LANCZOS)

m = Image.new("L", (OUT * SS, OUT * SS), 0)
# One output pixel of inset. The source's own rim carries a little of the grey
# background in its antialiasing; without the inset that grey survives as a
# faint ring, which is exactly the artifact this whole script exists to avoid.
inset = SS
ImageDraw.Draw(m).ellipse([inset, inset, OUT * SS - 1 - inset, OUT * SS - 1 - inset], fill=255)
mask = m.resize((OUT, OUT), Image.LANCZOS)

out = disc.convert("RGBA")
out.putalpha(mask)
out.save("public/moon-boys-mark.png", "PNG", optimize=True)

a = np.asarray(out)
print("public/moon-boys-mark.png %dx%d  opaque px %.1f%%  corner alpha %d"
      % (OUT, OUT, (a[..., 3] > 250).mean() * 100, a[0, 0, 3]))
