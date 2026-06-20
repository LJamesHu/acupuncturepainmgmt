# Acupuncture & Pain Management Center

Website for the Acupuncture & Pain Management Center of Palm Coast, FL
([acupuncturepainmgmt.com](https://acupuncturepainmgmt.com)).

A fast, fully static, responsive single-page site — no build step, no framework.
It works as-is on GitHub Pages or any static host.

## Structure

```
index.html     Markup and content (semantic HTML5 + JSON-LD SEO)
styles.css     Design system and responsive layout
main.js        Mobile nav, scroll reveals, and the Leaflet map
images/        Photos, bamboo hero background, and the yin-yang logo
```

The only external resources are loaded over HTTPS at runtime:
Google Fonts (Fraunces + Inter) and [Leaflet](https://leafletjs.com/) with
OpenStreetMap tiles for the location map (no API key required).

## Preview locally

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   choose the `main` branch and the `/ (root)` folder, then **Save**.
4. The site publishes at `https://<username>.github.io/<repo>/` within a minute.

To use the custom domain `acupuncturepainmgmt.com`, add it under
**Settings → Pages → Custom domain** (GitHub will create a `CNAME` file) and
point the domain's DNS at GitHub Pages.

## Editing content

- **Text, hours, address, reviews** — edit directly in `index.html`.
- **Colors and fonts** — change the CSS variables in the `:root` block of `styles.css`.
- **Map location** — update the coordinates in `main.js` and the `geo` block in `index.html`.
