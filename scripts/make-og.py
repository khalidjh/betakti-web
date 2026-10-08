#!/usr/bin/env python3
"""Draw one Open Graph image per occasion page.

Every page shared the same `og.png`, so a wedding-invitation link and a
Qur'an-backgrounds link unfurled identically in WhatsApp — which is where these
links actually travel. This gives each page its own card, carrying that page's
Arabic headline.

The headlines are read from `src/lib/seo/occasions-content.ts` via
`scripts/og-manifest.json`, so an image cannot drift from the copy it
illustrates. Regenerate the manifest whenever a page is added:

    python3 scripts/make-og.py --refresh

Arabic is set by Chromium over CDP (the automation Chrome on port 9222), never
drawn by an image model and never shaped by a library that cannot join letters.
Output is committed: these are static assets, not something the server renders.
"""

import argparse
import asyncio
import base64
import json
import pathlib
import re
import subprocess
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts/og-manifest.json"
OUT_DIR = ROOT / "static/og"
CDP = "http://127.0.0.1:9222"

# Facebook, WhatsApp and X all read 1200×630.
WIDTH, HEIGHT = 1200, 630

PAGE = """<!doctype html>
<html dir="rtl" lang="ar"><head><meta charset="utf-8">
<link rel="stylesheet" href="file://{fonts_css}">
<style>
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  html, body {{ width:{w}px; height:{h}px; overflow:hidden; }}
  body {{
    background:#030824;
    font-family:'dubai-bold','dubai',sans-serif;
    display:flex; flex-direction:column; justify-content:center;
    padding:0 96px; position:relative;
  }}
  .glow {{
    position:absolute; inset:auto -10% -40% auto; width:70%; height:120%;
    background:radial-gradient(ellipse at center, rgba(45,95,240,.38), transparent 65%);
    filter:blur(30px);
  }}
  .eyebrow {{
    position:relative; z-index:2;
    color:rgba(255,255,255,.55); font-size:30px; font-weight:500;
    letter-spacing:.02em; margin-bottom:22px;
  }}
  h1 {{
    position:relative; z-index:2;
    color:#fff; font-size:{size}px; font-weight:700; line-height:1.22;
    letter-spacing:-0.5px; max-width:900px;
  }}
  .brand {{
    position:absolute; inset:auto 96px 56px auto; z-index:2;
    display:flex; align-items:center; gap:14px;
    color:rgba(255,255,255,.72); font-size:26px; font-weight:600;
  }}
  .mark {{ width:52px; height:52px; }}
</style></head>
<body>
  <div class="glow"></div>
  {eyebrow_html}
  <h1>{h1}</h1>
  <div class="brand"><img class="mark" src="file://{mark}"> بطاقتي · betakti.com</div>
</body></html>
"""


# The site-wide card (static/og.png): the mark large, the name, the promise.
DEFAULT_PAGE = """<!doctype html>
<html dir="rtl" lang="ar"><head><meta charset="utf-8">
<link rel="stylesheet" href="file://{fonts_css}">
<style>
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  html, body {{ width:{w}px; height:{h}px; overflow:hidden; }}
  body {{
    background:#030824; color:#fff; font-family:'dubai-bold','dubai',sans-serif;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    position:relative; text-align:center;
  }}
  .glow {{
    position:absolute; left:50%; top:38%; width:760px; height:520px;
    transform:translate(-50%,-50%);
    background:radial-gradient(ellipse at center, rgba(45,95,240,.32), transparent 65%);
    filter:blur(30px);
  }}
  img {{ position:relative; width:230px; height:230px; margin-bottom:18px; }}
  h1 {{ position:relative; font-size:92px; line-height:1.05; }}
  p {{ position:relative; font-family:'dubai-medium','dubai',sans-serif;
       font-size:34px; color:rgba(255,255,255,.72); margin-top:16px; }}
  .url {{ position:absolute; bottom:40px; font-size:24px; color:rgba(255,255,255,.5);
          font-family:'dubai-medium','dubai',sans-serif; letter-spacing:.04em; }}
</style></head>
<body>
  <div class="glow"></div>
  <img src="file://{mark}">
  <h1>بطاقتي</h1>
  <p>أسهل طريقة لتصميم بطاقات عربية جميلة</p>
  <div class="url">betakti.com</div>
</body></html>
"""


def refresh_manifest() -> None:
    src = (ROOT / "src/lib/seo/occasions-content.ts").read_text()
    pages = []
    for m in re.finditer(r"slug: '([^']+)'", src):
        tail = src[m.end() : m.end() + 4000]
        h1 = re.search(r"ar: \{.*?h1: '([^']+)'", tail, re.S)
        eyebrow = re.search(r"ar: \{.*?eyebrow: '([^']+)'", tail, re.S)
        if h1:
            pages.append(
                {
                    "slug": m.group(1),
                    "h1": h1.group(1),
                    "eyebrow": eyebrow.group(1) if eyebrow else "",
                }
            )
    MANIFEST.write_text(json.dumps(pages, ensure_ascii=False, indent=1))
    print(f"manifest: {len(pages)} pages")


async def render(entries) -> None:
    import websockets

    fonts_css = ROOT / "static/fonts/fonts.css"
    tab = json.loads(
        urllib.request.urlopen(
            urllib.request.Request(f"{CDP}/json/new?about:blank", method="PUT")
        ).read()
    )
    try:
        async with websockets.connect(tab["webSocketDebuggerUrl"], max_size=None) as ws:
            msg_id = 0

            async def send(method, params=None):
                nonlocal msg_id
                msg_id += 1
                await ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
                while True:
                    m = json.loads(await ws.recv())
                    if m.get("id") == msg_id:
                        return m.get("result", {})

            await send("Page.enable")
            await send(
                "Emulation.setDeviceMetricsOverride",
                {"width": WIDTH, "height": HEIGHT, "deviceScaleFactor": 1, "mobile": False},
            )

            OUT_DIR.mkdir(parents=True, exist_ok=True)
            for e in entries:
                h1 = e["h1"]
                # Long Arabic headlines need a smaller face or they wrap to
                # three lines and collide with the brand line.
                size = 84 if len(h1) <= 22 else (72 if len(h1) <= 32 else 62)
                eyebrow = e.get("eyebrow", "")
                html = PAGE.format(
                    w=WIDTH,
                    h=HEIGHT,
                    fonts_css=fonts_css,
                    size=size,
                    h1=h1,
                    eyebrow_html=f'<div class="eyebrow">{eyebrow}</div>' if eyebrow else "",
                    mark=ROOT / "static/brand/mark.png",
                ) if e["slug"] != "_default" else DEFAULT_PAGE.format(
                    w=WIDTH, h=HEIGHT, fonts_css=fonts_css, mark=ROOT / "static/brand/mark.png"
                )
                tmp = pathlib.Path("/tmp/betakti-og.html")
                tmp.write_text(html, encoding="utf-8")
                await send("Page.navigate", {"url": f"file://{tmp}"})
                await asyncio.sleep(1.2)
                res = await send("Page.captureScreenshot", {"format": "png"})
                out = ROOT / "static/og.png" if e["slug"] == "_default" else OUT_DIR / f"{e['slug']}.png"
                out.write_bytes(base64.b64decode(res["data"]))
                print(f"  {out.relative_to(ROOT)}")
    finally:
        urllib.request.urlopen(f"{CDP}/json/close/{tab['id']}").read()


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--refresh", action="store_true", help="re-read headlines from the page data first")
    ap.add_argument("--only", help="one slug, for a quick look")
    a = ap.parse_args()

    if a.refresh or not MANIFEST.exists():
        refresh_manifest()

    entries = [{"slug": "_default", "h1": ""}] + json.loads(MANIFEST.read_text())
    if a.only:
        entries = [e for e in entries if e["slug"] == a.only]
        if not entries:
            sys.exit(f"no such slug: {a.only}")

    print(f"rendering {len(entries)} images at {WIDTH}x{HEIGHT}")
    asyncio.run(render(entries))

    total = sum(f.stat().st_size for f in OUT_DIR.glob("*.png"))
    print(f"done — {total // 1024}KB total")


if __name__ == "__main__":
    main()
