# igor-markin.github.io

Personal site of Igor Markin, served by GitHub Pages from `main`.

Plain HTML and CSS, no build step. Edit `index.html` and push.

English is in the markup. Hebrew (RTL) and Russian live in `assets/i18n.js`, keyed by `data-i18n` attributes; the same script runs the light/dark switch. Language and theme choices are stored in `localStorage` (`site-lang`, `site-theme`) and shared with the project pages on this domain.

- `assets/` images in WebP; `assets/og.png` is the social preview (1200×630)
- `torhair/` project page of Torhair; screens use demo data, no client data
- `privacy.html` privacy policy of the private `assistant` OAuth app, kept at its old URL
