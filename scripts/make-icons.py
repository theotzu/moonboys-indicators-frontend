#!/usr/bin/env python3
"""Build the site icons: a moon.

Theo, 2026-09-05: "we need a favicon for moonboyspod.com" — then, after sending
the full logo — "or just a moon."

He is right, and it is not only a preference. The logo is a moon disc with
MOON BOYS set across it in heavy black type; at 16px that type is three grey
smudges and the moon underneath is unreadable through it. Dropping the words
leaves the one shape that survives being 16 pixels wide.

What was there before this: the Vercel triangle. The default, on a live site.

Drawn at 16x and downsampled so the edges are smooth without hinting, and the
craters keep their soft edges at every size.

    python scripts/make-icons.py

Writes src/app/favicon.ico (multi-size), src/app/icon.png and
src/app/apple-icon.png — the three filenames Next's App Router picks up on its
own, no <link> tags needed.
"""
from PIL import Image, ImageDraw

S = 16          # supersample factor
BASE = 512      # final master size
N = BASE * S

INK = (7, 9, 15)            # the page's own near-black
MOON = (243, 246, 252)      # off-white, not pure white — it has to read as lit
CRATER = (206, 214, 228)
AMBER = (255, 176, 46)      # the ring accent from the logo


def draw() -> Image.Image:
    img = Image.new("RGBA", (N, N), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # The ground: a filled disc rather than a square, so the icon reads as a
    # mark at any corner radius a platform decides to apply.
    d.ellipse([0, 0, N - 1, N - 1], fill=INK)

    # A thin amber arc, the one colour the logo carries beyond black and white.
    # Inset far enough that it survives the disc's own antialiased edge.
    #
    # ⚠️ THE MOON HAS TO DOMINATE OR 16px IS A WHITE DOT. The first pass gave the
    # ring and the arc the outer 30% of the canvas, which looks right at 256 and
    # leaves about five pixels of moon in a browser tab — checked by rendering
    # the actual sizes side by side rather than trusting the master. The arc is
    # thinner and closer to the rim now and the moon runs almost to it.
    pad = int(N * 0.022)
    d.arc([pad, pad, N - pad, N - pad], start=25, end=205,
          fill=AMBER, width=int(N * 0.030))

    # The moon itself, inside the arc.
    m = int(N * 0.085)
    d.ellipse([m, m, N - m, N - m], fill=MOON)

    # Craters. Placed by eye on the lit face, largest lower-left, so the disc
    # reads as a moon rather than a plain circle even when it is tiny.
    r = (N - 2 * m) / 2
    cx = cy = N / 2
    for dx, dy, rad in [
        (-0.34, 0.20, 0.20),
        (0.24, -0.30, 0.135),
        (0.30, 0.28, 0.10),
        (-0.10, -0.14, 0.085),
        (0.02, 0.44, 0.07),
    ]:
        x, y, rr = cx + dx * r, cy + dy * r, rad * r
        d.ellipse([x - rr, y - rr, x + rr, y + rr], fill=CRATER)

    return img.resize((BASE, BASE), Image.LANCZOS)


master = draw()

master.save("src/app/icon.png", "PNG", optimize=True)

# Apple wants an opaque square — a transparent corner renders black anyway, and
# this way the disc sits on the brand ground rather than on whatever iOS picks.
apple = Image.new("RGB", (180, 180), INK)
apple.paste(master.resize((180, 180), Image.LANCZOS), (0, 0), master.resize((180, 180), Image.LANCZOS))
apple.save("src/app/apple-icon.png", "PNG", optimize=True)

# Multi-size .ico. 16 and 32 are what a browser tab actually uses; the larger
# entries are for pinned tiles and high-DPI tabs.
master.save(
    "src/app/favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
)

print("wrote src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico")
