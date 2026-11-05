#!/usr/bin/env python3
"""
Builds the logo kit (svg/, pdf/, png/) from the delivered V3 source in source/.

    python3 brand/build-kit.py

Needs Google Chrome (CHROME_PATH or the default macOS path) for PDF and PNG.
Variants: horizontal (mark | name), stacked (mark above name), icon (mark only),
each in color (black + emerald chevron), color-dark, black and white.
"""
import os
import re
import subprocess
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
CHROME = os.environ.get('CHROME_PATH', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')

INK, ACCENT = '#0B0B0C', '#047857'          # light backgrounds
INK_DARK, ACCENT_DARK = '#FFFFFF', '#34D399'  # dark backgrounds
COLORWAYS = {
    'color': (INK, ACCENT),
    'color-dark': (INK_DARK, ACCENT_DARK),
    'black': (INK, INK),
    'white': (INK_DARK, INK_DARK),
}

src = (HERE / 'source/valerij-medvid-v3-logo-black.svg').read_text()
paths = {m.group(1): m.group(0) for m in re.finditer(r'<path id="([^"]+)"[^>]*/>', src)}
d = {k: re.search(r'\bd="([^"]+)"', v).group(1) for k, v in paths.items()}
rule = {k: ('nonzero' if 'nonzero' in v else 'evenodd') for k, v in paths.items()}

CHEVRON, MARK = ['part-1'], ['part-2', 'part-3']
DIVIDER = ['part-4']
TEXT = [f'part-{i}' for i in range(5, 35)]  # name 5–17, subtitle 18–34


def group(ids, fill, transform=''):
    t = f' transform="{transform}"' if transform else ''
    body = ''.join(f'<path fill-rule="{rule[i]}" d="{d[i]}"/>' for i in ids)
    return f'<g fill="{fill}"{t}>{body}</g>'


def svg(w, h, inner, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" '
            f'role="img"><title>{title}</title>{inner}</svg>\n')


def build(variant, ink, accent):
    title = 'Valerij Medvid — Software Developer'
    if variant == 'horizontal':
        w, h = 960, 240
        inner = group(CHEVRON, accent) + group(MARK + DIVIDER + TEXT, ink)
    elif variant == 'stacked':
        # mark bbox x32–200 y22.4–217.7, text bbox x296–928.5 y79–166
        pad, gap, k = 40, 36, 1.3  # mark scaled up so it balances the wide name
        mark_h = 195.3 * k
        w, h = 712.5, pad + mark_h + gap + 87 + pad
        mark_t = f'translate({w / 2 - 116 * k} {pad - 22.4 * k}) scale({k})'
        text_t = f'translate({pad - 296} {pad + mark_h + gap - 79})'
        inner = group(CHEVRON, accent, mark_t) + group(MARK, ink, mark_t) + group(TEXT, ink, text_t)
    else:  # icon: same square framing as the delivered icon (256 × 256)
        w, h = 256, 256
        t = 'translate(12 8)'
        inner = group(CHEVRON, accent, t) + group(MARK, ink, t)
    return w, h, svg(w, h, inner, 'VM — ' + title if variant == 'icon' else title)


def chrome(args):
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', *args],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


for sub in ('svg', 'pdf', 'png'):
    (HERE / sub).mkdir(exist_ok=True)

with tempfile.TemporaryDirectory() as tmp:
    for variant in ('horizontal', 'stacked', 'icon'):
        for colorway, (ink, accent) in COLORWAYS.items():
            name = f'valerij-medvid-{variant}-{colorway}'
            w, h, markup = build(variant, ink, accent)
            (HERE / f'svg/{name}.svg').write_text(markup)

            page = Path(tmp) / f'{name}.html'
            page.write_text(f'<!doctype html><style>@page{{size:{w}px {h}px;margin:0}}'
                            f'html,body{{margin:0;background:transparent}}svg{{display:block}}</style>{markup}')
            chrome(['--no-pdf-header-footer', f'--print-to-pdf={HERE / f"pdf/{name}.pdf"}', page.as_uri()])
            scale = 8 if variant == 'icon' else 4
            chrome(['--default-background-color=00000000', f'--force-device-scale-factor={scale}',
                    f'--window-size={int(w + 0.999)},{int(h + 0.999)}',
                    f'--screenshot={HERE / f"png/{name}.png"}', page.as_uri()])
            print('✓', name)
