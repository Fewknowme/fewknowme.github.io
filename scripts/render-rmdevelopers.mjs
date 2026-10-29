// Renders public/rmdevelopers/index.html from public/rmdevelopers/site.json.
//
// Edit site.json (copy, apps, FAQ...) and run:  npm run rmdevelopers
// It also runs automatically before every `npm run build` (see "prebuild"),
// so CI always deploys HTML that matches the JSON.
//
// Styling lives in public/rmdevelopers/styles.css, motion in main.js.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "rmdevelopers");
const data = JSON.parse(readFileSync(join(root, "site.json"), "utf8"));
const { seo, studio, hero, marquee, stats, apps, principles, faq, cta } = data;

// ---------- helpers ----------

const esc = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const pad = (n) => String(n).padStart(2, "0");
const isExternal = (url) => /^https?:\/\//.test(url);
const linkAttrs = (url) => (isExternal(url) ? ' target="_blank" rel="noopener"' : "");
const absolute = (path) => new URL(path, seo.url).href;

const arrow = `<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;
const playIcon = `<svg class="i i--fill" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.6 2.3c-.3.3-.4.7-.4 1.2v17c0 .5.1.9.4 1.2l9.5-9.7-9.5-9.7Zm10.6 10.8 2.8 2.8-11 6.3 8.2-9.1Zm4.2-4.1 2.7 1.6c.8.5.8 1.3 0 1.8L19.4 14l-3.1-3.1L19.4 9ZM7 1.8l11 6.3-2.8 2.8L7 1.8Z"/></svg>`;

// ---------- sections ----------

const appPanel = (app, index) => {
  const shots = app.screenshots
    .map(
      (src, i) =>
        `<img src="${esc(src)}" alt="${esc(app.name)} screenshot ${i + 1}" width="${app.orientation === "landscape" ? 960 : 520}" height="${app.orientation === "landscape" ? 540 : 924}" loading="lazy" decoding="async"${i === 0 ? ' class="is-active"' : ""}>`
    )
    .join("\n            ");

  const extraLinks = app.links
    .map((l) => `<a class="btn btn--ghost" href="${esc(l.url)}"${linkAttrs(l.url)} data-magnetic>${esc(l.label)} ${arrow}</a>`)
    .join("\n          ");

  return `
      <article class="app" id="${esc(app.id)}" data-app="${esc(app.id)}"
        style="--app-bg:${app.theme.bg};--app-accent:${app.theme.accent};--app-glow:${app.theme.glow}"
        aria-labelledby="${esc(app.id)}-title">
        <div class="app__glow" aria-hidden="true"></div>
        <div class="app__info">
          <p class="app__meta"><span class="app__num">${pad(index + 1)}<i>/${pad(apps.length)}</i></span><span class="chip">${esc(app.type)} · ${esc(app.category)}</span></p>
          <div class="app__title">
            <img class="app__icon" src="${esc(app.icon)}" alt="${esc(app.name)} icon" width="256" height="256" loading="lazy">
            <h3 id="${esc(app.id)}-title" data-split>${esc(app.name)}</h3>
          </div>
          <p class="app__tagline">${esc(app.tagline)}</p>
          <p class="app__summary">${esc(app.summary)}</p>
          <ul class="app__features">
            ${app.features.map((f) => `<li>${esc(f)}</li>`).join("\n            ")}
          </ul>
          <div class="app__actions">
          <a class="btn btn--app" href="${esc(app.playUrl)}" target="_blank" rel="noopener" data-magnetic>${playIcon} Get it on Google Play</a>
          ${extraLinks}
          </div>
        </div>
        <div class="app__device app__device--${esc(app.orientation)}" data-tilt>
          <div class="device">
            ${shots}
          </div>
          <div class="app__dots" aria-hidden="true">${app.screenshots.map((_, i) => `<i${i === 0 ? ' class="is-active"' : ""}></i>`).join("")}</div>
        </div>
      </article>`;
};

const marqueeRow = (reverse) => `
    <div class="marquee__row${reverse ? " marquee__row--rev" : ""}" aria-hidden="true">
      <div class="marquee__track">
        ${[...marquee, ...marquee].map((m) => `<span>${esc(m)}</span><b>✦</b>`).join("")}
      </div>
    </div>`;

const gallery = apps
  .filter((a) => a.orientation === "portrait")
  .flatMap((a) => a.screenshots.map((src) => ({ src, name: a.name })));

// ---------- structured data ----------

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${seo.url}#org`,
      name: studio.name,
      url: seo.url,
      logo: absolute(apps[0].icon),
      founder: { "@type": "Person", name: studio.founder, url: studio.portfolioUrl },
      address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
      sameAs: studio.links.map((l) => l.url).filter(isExternal),
    },
    {
      "@type": "WebSite",
      "@id": `${seo.url}#website`,
      url: seo.url,
      name: studio.name,
      publisher: { "@id": `${seo.url}#org` },
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      name: `Apps by ${studio.name}`,
      itemListElement: apps.map((app, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "MobileApplication",
          name: app.name,
          description: app.summary,
          applicationCategory: app.schemaCategory,
          operatingSystem: "ANDROID",
          url: app.playUrl,
          installUrl: app.playUrl,
          image: absolute(app.icon),
          screenshot: app.screenshots.map(absolute),
          author: { "@id": `${seo.url}#org` },
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// ---------- page ----------

const html = `<!doctype html>
<!-- GENERATED FILE: edit site.json and run \`npm run rmdevelopers\`. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(seo.title)}</title>
  <meta name="description" content="${esc(seo.description)}">
  <meta name="keywords" content="${esc(seo.keywords)}">
  <meta name="author" content="${esc(studio.founder)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="${esc(seo.themeColor)}">
  <meta name="color-scheme" content="dark">
  <link rel="canonical" href="${esc(seo.url)}">
  <link rel="icon" type="image/png" href="assets/favicon.png">
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(studio.name)}">
  <meta property="og:locale" content="${esc(seo.locale)}">
  <meta property="og:url" content="${esc(seo.url)}">
  <meta property="og:title" content="${esc(seo.title)}">
  <meta property="og:description" content="${esc(seo.description)}">
  <meta property="og:image" content="${esc(seo.ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(studio.name)} apps: ${esc(apps.map((a) => a.name).join(", "))}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(seo.title)}">
  <meta name="twitter:description" content="${esc(seo.description)}">
  <meta name="twitter:image" content="${esc(seo.ogImage)}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Geist:wght@300..700&family=JetBrains+Mono:wght@400;600&display=swap">
  <link rel="stylesheet" href="styles.css">
  <script>document.documentElement.classList.add("js")</script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
  <a class="skip" href="#apps">Skip to apps</a>

  <div class="loader" aria-hidden="true">
    <div class="loader__icons">
      ${apps.map((a) => `<img src="${esc(a.icon)}" alt="" width="64" height="64">`).join("\n      ")}
    </div>
    <p class="loader__count"><span>0</span>%</p>
    <p class="loader__name">${esc(studio.name)}</p>
  </div>

  <div class="cursor" aria-hidden="true"><span class="cursor__dot"></span><span class="cursor__ring"><em></em></span></div>
  <div class="progress" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>

  <header class="nav">
    <a class="nav__logo" href="#top" aria-label="${esc(studio.name)} home"><b>RM</b><span>Developers</span></a>
    <nav class="nav__links" aria-label="Primary">
      <a href="#apps">Apps</a>
      <a href="#principles">Principles</a>
      <a href="#faq">FAQ</a>
      <a href="${esc(studio.portfolioUrl)}">Portfolio</a>
    </nav>
    <a class="btn btn--small" href="${esc(studio.playStoreUrl)}" target="_blank" rel="noopener" data-magnetic>${playIcon}<span>Google Play</span></a>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <canvas class="hero__canvas" aria-hidden="true"></canvas>
      <div class="hero__blob hero__blob--a" aria-hidden="true"></div>
      <div class="hero__blob hero__blob--b" aria-hidden="true"></div>
      <p class="hero__eyebrow" data-fade><i></i>${esc(hero.eyebrow)}</p>
      <h1 id="hero-title" class="hero__title">
        <span class="sr-only">${esc(studio.name)}: </span>
        ${hero.lines.map((l, i) => `<span class="hero__line${i === hero.lines.length - 1 ? " hero__line--accent" : ""}" data-split="${i === hero.lines.length - 1 ? "line" : "chars"}">${esc(l)}</span>`).join("\n        ")}
      </h1>
      <p class="hero__sub" data-fade>${esc(hero.sub)}</p>
      <div class="hero__ctas" data-fade>
        <a class="btn" href="${esc(hero.primaryCta.url)}"${linkAttrs(hero.primaryCta.url)} data-magnetic>${esc(hero.primaryCta.label)} <svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></a>
        <a class="btn btn--ghost" href="${esc(hero.secondaryCta.url)}"${linkAttrs(hero.secondaryCta.url)} data-magnetic>${esc(hero.secondaryCta.label)} ${arrow}</a>
      </div>
      <div class="hero__orbit" aria-hidden="true">
        ${apps.map((a, i) => `<a class="orbit-icon orbit-icon--${i + 1}" href="#${esc(a.id)}" tabindex="-1" style="--c:${a.theme.accent}"><img src="${esc(a.icon)}" alt="" width="256" height="256"></a>`).join("\n        ")}
      </div>
      <a class="hero__scroll" href="#apps" aria-label="Scroll to apps"><span></span></a>
    </section>

    <section class="marquee" aria-label="What we stand for">
      ${marqueeRow(false)}
      ${marqueeRow(true)}
    </section>

    <section class="stats" aria-label="Studio in numbers">
      ${stats.map((s) => `<div class="stat" data-fade><strong><span data-count="${s.value}">${s.value}</span>${esc(s.suffix)}</strong><p>${esc(s.label)}</p></div>`).join("\n      ")}
    </section>

    <section class="apps" id="apps" aria-labelledby="apps-title">
      <div class="apps__intro">
        <p class="kicker">The lineup</p>
        <h2 id="apps-title" data-split>Four apps. One promise.</h2>
        <p>Every RMDevelopers app is free on Google Play and built to work beautifully on everyday Android phones.</p>
      </div>
      <div class="apps__track">${apps.map(appPanel).join("\n")}
      </div>
    </section>

    <section class="gallery" aria-label="Screenshots">
      <div class="gallery__track">
        ${[...gallery, ...gallery].map((g, i) => `<figure${i >= gallery.length ? ' aria-hidden="true"' : ""}><img src="${esc(g.src)}" alt="${i >= gallery.length ? "" : `${esc(g.name)} screenshot`}" width="520" height="924" loading="lazy" decoding="async"></figure>`).join("\n        ")}
      </div>
    </section>

    <section class="principles" id="principles" aria-labelledby="principles-title">
      <p class="kicker">How we build</p>
      <h2 id="principles-title" data-split>Made with intent.</h2>
      <div class="principles__grid">
        ${principles.map((p, i) => `<article class="card" data-tilt data-fade><span class="card__num">${pad(i + 1)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></article>`).join("\n        ")}
      </div>
    </section>

    <section class="faq" id="faq" aria-labelledby="faq-title">
      <div class="faq__head">
        <p class="kicker">Questions</p>
        <h2 id="faq-title" data-split>Good to know.</h2>
      </div>
      <div class="faq__list">
        ${faq.map((f) => `<details data-fade><summary>${esc(f.q)}<i aria-hidden="true"></i></summary><div class="faq__answer"><p>${esc(f.a)}</p></div></details>`).join("\n        ")}
      </div>
    </section>

    <section class="cta" aria-labelledby="cta-title">
      <h2 id="cta-title">${cta.title.map((t) => `<span class="cta__line" data-fill="${esc(t)}">${esc(t)}</span>`).join("")}</h2>
      <a class="btn btn--big" href="${esc(cta.button.url)}" target="_blank" rel="noopener" data-magnetic>${playIcon} ${esc(cta.button.label)}</a>
    </section>
  </main>

  <footer class="footer">
    <div class="footer__top">
      <p>${esc(studio.name)} — independent Android studio by <a href="${esc(studio.portfolioUrl)}">${esc(studio.founder)}</a>, ${esc(studio.location)}.</p>
      <nav aria-label="Elsewhere">
        ${studio.links.map((l) => `<a href="${esc(l.url)}"${linkAttrs(l.url)}>${esc(l.label)} ${arrow}</a>`).join("\n        ")}
      </nav>
    </div>
    <p class="footer__word" aria-hidden="true">${[...studio.name].map((c, i, all) => `<span style="--i:${i / (all.length - 1)}">${esc(c)}</span>`).join("")}</p>
    <p class="footer__legal">© <span data-year>2026</span> ${esc(studio.name)}. Google Play and the Google Play logo are trademarks of Google LLC.</p>
  </footer>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js" defer></script>
  <script src="main.js" defer></script>
</body>
</html>
`;

writeFileSync(join(root, "index.html"), html);
console.log(`rmdevelopers: rendered index.html with ${apps.length} apps`);
