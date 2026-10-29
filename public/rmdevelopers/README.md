# RMDevelopers landing page

Live at https://fewknowme.github.io/rmdevelopers/

| File | What it is |
| --- | --- |
| `site.json` | **All content**: SEO tags, hero copy, marquee words, stats, apps, principles, FAQ, CTA. |
| `index.html` | Generated from `site.json`. Don't edit by hand. |
| `styles.css` | Look and layout. |
| `main.js` | Animations (GSAP + ScrollTrigger + Lenis from CDN). The page works without it. |
| `assets/` | App icons, screenshots, favicon, `og.jpg` social card. |

## Edit content

1. Change `site.json`.
2. Run `npm run rmdevelopers` from the repo root (also runs automatically before `npm run build`).
3. Commit `site.json` and `index.html`, push `v2`.

## Add an app

Copy one object in `apps`, then set:

- `id` – unique slug, used as the `#anchor`.
- `name`, `type` (`App`/`Game`), `category`, `tagline`, `summary`, `features` (4 short lines work best).
- `schemaCategory` – schema.org type for search engines, e.g. `GameApplication`, `FinanceApplication`, `UtilitiesApplication`.
- `playUrl`, `packageId`.
- `icon` and `screenshots` – put files in `assets/` (webp, ~520px wide for portrait).
- `orientation` – `portrait` or `landscape` (changes the device frame).
- `theme` – `bg` (page colour while the app is on screen), `accent` (buttons, highlights), `glow`.
- `links` – optional extra buttons, e.g. `{ "label": "Game site", "url": "/lanezing/" }`.

Update the `stats` and `hero` copy if the app count changes.

To remove an app, delete its object and its files in `assets/`.
