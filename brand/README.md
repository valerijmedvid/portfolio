# Logo — Valerij Medvid

V3 monogram „VM“ (kostka) + nápis. Hlavní verze: **černá se zelenou stříškou**.

## Kterou variantu použít

| Varianta | Kdy | Soubor (`svg/`, `pdf/`, `png/`) |
|---|---|---|
| Vodorovná | faktury, hlavičky dokumentů, e-mailový podpis | `valerij-medvid-horizontal-*` |
| Svislá | čtvercová místa, titulní strany | `valerij-medvid-stacked-*` |
| Ikona | avatar, favicon, velmi malá místa | `valerij-medvid-icon-*` |

| Barevnost | Pozadí |
|---|---|
| `color` | světlé (hlavní) |
| `color-dark` | tmavé |
| `black` | světlé, černobílý tisk |
| `white` | tmavé, jednobarevně |

## Formáty

- **PDF** — vektor; nejlepší pro fakturační systémy, Word, Pages a tisk
- **SVG** — vektor pro web a grafické programy
- **PNG** — průhledné pozadí, vodorovná 3840 × 960, svislá 2852 × 1828, ikona 2048 × 2048

## Barvy

| | HEX | RGB | CMYK (přibližně) |
|---|---|---|---|
| Černá (text, značka) | `#0B0B0C` | 11 11 12 | 0 0 0 95 |
| Zelená (stříška, světlé pozadí) | `#047857` | 4 120 87 | 97 0 28 53 |
| Zelená (stříška, tmavé pozadí) | `#34D399` | 52 211 153 | 75 0 27 17 |
| Bílá | `#FFFFFF` | 255 255 255 | 0 0 0 0 |

Zelená je stejná jako akcent webu valerijmedvid.cz. CMYK je přepočet z RGB; pro profesionální tisk
ověř nátiskem.

## Pravidla

- Neměň poměr stran, nedeformuj, neotáčej.
- Kolem loga nech volný prostor aspoň na výšku stříšky.
- Vodorovnou verzi nepoužívej užší než ~120 px / 30 mm — podtitul by byl nečitelný; pak použij ikonu.

## Zdroj a úpravy

`source/` obsahuje dodané originály (V3). Sadu vygeneruješ znovu příkazem `python3 brand/build-kit.py`
(potřebuje Google Chrome).
