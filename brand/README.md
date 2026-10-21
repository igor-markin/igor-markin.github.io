# Brand layer

Shared parts of every site on `igor-markin.github.io`. The main site is the master brand; each product keeps its own name, icon, palette and page design, and Igor Markin stands behind all of them as the author.

## What is shared and what is not

| Shared on every site | Own on every product site |
| --- | --- |
| Author block: structure, photo, copy in EN/HE/RU, buttons | Accent colour and palette of both themes |
| "More of my projects" list | Icon and heading typeface |
| Language switch EN/HE/RU, English by default; `site-lang` in `localStorage` and `?lang=` | Header and first screen |
| Theme switch, system theme by default; `site-theme` in `localStorage` | Page sections and their design |
| System font stack | |

## Files

- `v1/brand.css` styles of the author block. Colours come from `--im-*` variables; a site that sets none gets the main site palette.
- `v1/brand.js` copy in three languages, the project list, rendering. It follows `<html lang>`, so it works with any site i18n script.
- `v1/icons/` product icons for the project list.
- `v1/starter/index.html` a new site: header with language and theme switches, hero, author block, footer.

A breaking change goes to `v2/`. Sites keep loading `v1/` until they move.

## Use on a product site

```html
<link rel="stylesheet" href="/brand/v1/brand.css">
<script src="/brand/v1/brand.js" defer></script>
```

Paste the `<aside class="im-author">` block from `v1/starter/index.html` above the footer and set `data-im-product` to the product id. The static English copy inside stays for visitors without JavaScript.

Map the site tokens on `:root` or on the block wrapper:

| Variable | Meaning |
| --- | --- |
| `--im-card` | card background, a colour or a gradient |
| `--im-card-ink`, `--im-card-muted`, `--im-card-line` | text, secondary text, borders |
| `--im-chip` | background of the secondary button and project chips |
| `--im-accent`, `--im-accent-ink` | primary button background (colour or gradient) and its text |
| `--im-accent-color` | accent as a plain colour when `--im-accent` is a gradient |
| `--im-accent-shadow`, `--im-ring`, `--im-kicker` | button shadow, photo ring, label colour |
| `--im-font-display`, `--im-title-weight` | heading typeface and weight |
| `--im-radius`, `--im-btn-radius` | card and button corner radius |

Define them with the site tokens, so the dark theme comes for free: `--im-accent: var(--accent)`.

## Checklist for a new site

1. Copy `v1/starter/index.html`, change the palette tokens, the name and the copy in all three languages.
2. Add the product to `PROJECTS` in `v1/brand.js` and its icon to `v1/icons/`. It then shows on every other site.
3. Add a project card to the main site (`index.html`, section "Own products").
4. Make a 1200×630 `og.png` and set the `og:` tags; remove `noindex`.
5. Check EN, HE (RTL) and RU in light and dark, on a phone and a desktop.
