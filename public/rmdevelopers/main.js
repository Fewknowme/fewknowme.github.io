// RMDevelopers landing — motion & interactions.
// Content is static HTML generated from site.json; this file only adds behaviour.
// Everything degrades gracefully: no JS, a blocked CDN or reduced-motion users
// still get the full page, just without the animation.

(() => {
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const { gsap, ScrollTrigger, Lenis } = window;

  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  setupSlideshows();

  if (reduceMotion || !gsap || !ScrollTrigger) {
    $(".loader")?.remove();
    root.classList.add("no-motion");
    return;
  }

  root.classList.add("motion");
  gsap.registerPlugin(ScrollTrigger);

  // ---------- smooth scroll ----------

  const lenis = Lenis ? new Lenis({ lerp: 0.1, wheelMultiplier: 1 }) : null;
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  splitText();
  const horizontal = setupApps();
  setupAnchors(horizontal);
  setupIntro();
  setupHero();
  setupMarquee();
  setupReveals();
  setupFaq();
  setupChrome();
  if (finePointer) {
    setupCursor();
    setupMagnetic();
    setupTilt();
  }

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener("load", () => ScrollTrigger.refresh());

  // ---------- split text into words/chars ----------

  function splitText() {
    $$("[data-split]").forEach((el) => {
      const text = el.textContent.trim();
      const mode = el.dataset.split; // "line" keeps the whole line as one piece
      const visual = document.createElement("span");
      visual.setAttribute("aria-hidden", "true");

      if (mode === "line") {
        visual.innerHTML = `<span class="word"><span class="char">${text}</span></span>`;
      } else {
        visual.innerHTML = text
          .split(" ")
          .map((word) => `<span class="word">${[...word].map((c) => `<span class="char">${c}</span>`).join("")}</span>`)
          .join(" ");
      }

      const sr = document.createElement("span");
      sr.className = "sr-only";
      sr.textContent = text;
      el.replaceChildren(sr, visual);
      el.classList.add("is-split");
    });
  }

  // ---------- loader + hero intro ----------

  function setupIntro() {
    const loader = $(".loader");
    const heroChars = $$(".hero__title .char");
    gsap.set(heroChars, { yPercent: 115 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    let seen = false;
    try { seen = sessionStorage.getItem("rmd-intro") === "1"; sessionStorage.setItem("rmd-intro", "1"); } catch (e) {}

    if (loader && !seen) {
      const counter = { v: 0 };
      tl.to($$(".loader__icons img"), { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: "back.out(2)" }, 0)
        .to(counter, {
          v: 100, duration: 1.5, ease: "power2.inOut",
          onUpdate: () => ($(".loader__count span").textContent = Math.round(counter.v)),
        }, 0)
        .to(".loader__icons img", { y: -30, opacity: 0, stagger: 0.05, duration: 0.4, ease: "power2.in" }, 1.5)
        .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, 1.7)
        .add(() => loader.remove());
    } else {
      loader?.remove();
    }

    tl.to(heroChars, { yPercent: 0, duration: 1.3, stagger: 0.035 }, seen ? 0.1 : 2.1)
      .to(".hero [data-fade]", { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 }, "<0.25")
      .from(".orbit-icon", { scale: 0, rotate: -40, opacity: 0, duration: 1.4, stagger: 0.1, ease: "elastic.out(1, 0.6)" }, "<")
      .add(() => $(".nav").classList.add("is-in"), "<");
  }

  // ---------- hero: particles, parallax, scroll-out ----------

  function setupHero() {
    const hero = $(".hero");
    const canvas = $(".hero__canvas");
    const ctx = canvas.getContext("2d");
    const colors = ["#7fd8a9", "#ffd45a", "#ff6a2b", "#b06bff", "#3dc8ff"];
    const mouse = { x: -9999, y: -9999 };
    let dots = [];
    let w = 0, h = 0, running = true;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 16000));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        c: colors[(Math.random() * colors.length) | 0],
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) { d.vx += (dx / dist) * 0.06; d.vy += (dy / dist) * 0.06; }
        d.vx *= 0.985; d.vy *= 0.985;
        d.x += d.vx + Math.sign(d.vx) * 0.05; d.y += d.vy + Math.sign(d.vy) * 0.05;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;

        for (let j = i + 1; j < dots.length; j++) {
          const o = dots[j];
          const l = Math.hypot(d.x - o.x, d.y - o.y);
          if (l < 110) {
            ctx.strokeStyle = `rgba(243,240,234,${(1 - l / 110) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(o.x, o.y); ctx.stroke();
          }
        }
        ctx.fillStyle = d.c;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    };

    resize();
    draw();
    addEventListener("resize", resize);
    new IntersectionObserver(([entry]) => {
      const was = running;
      running = entry.isIntersecting;
      if (running && !was) draw();
    }).observe(hero);

    // orbit icons drift towards the pointer at different depths
    const icons = $$(".orbit-icon").map((el, i) => ({
      x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
      depth: [30, 55, 40, 70][i] || 40,
    }));

    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
      const nx = mouse.x / rect.width - 0.5, ny = mouse.y / rect.height - 0.5;
      icons.forEach((icon) => { icon.x(nx * icon.depth); icon.y(ny * icon.depth); });
    });
    hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });

    const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hero__title", { yPercent: -25, scale: 0.92, opacity: 0.15, transformOrigin: "left center", ease: "none", scrollTrigger: scrub });
    gsap.to(".hero__orbit", { rotate: 25, yPercent: -30, ease: "none", scrollTrigger: scrub });
    gsap.to(".hero__blob--a", { yPercent: 40, ease: "none", scrollTrigger: scrub });
  }

  // ---------- marquee speeds up & flips with scroll velocity ----------

  function setupMarquee() {
    const tweens = $$(".marquee__track").map((track, i) => {
      track.style.animation = "none";
      const dir = i % 2 ? 1 : -1;
      gsap.set(track, { xPercent: dir === 1 ? -50 : 0 });
      return gsap.to(track, { xPercent: dir === 1 ? 0 : -50, duration: 28, ease: "none", repeat: -1 });
    });

    let boost = 1;
    ScrollTrigger.create({
      trigger: ".marquee",
      start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        boost = Math.max(boost, 1 + Math.min(Math.abs(v) / 250, 6));
        gsap.to(".marquee__track", { skewX: gsap.utils.clamp(-12, 12, v / -120), duration: 0.3, overwrite: "auto" });
      },
    });
    gsap.ticker.add(() => {
      if (boost > 1.01) {
        boost += (1 - boost) * 0.05;
        tweens.forEach((t) => t.timeScale(boost));
      }
    });
    ScrollTrigger.addEventListener("scrollEnd", () => gsap.to(".marquee__track", { skewX: 0, duration: 0.6 }));
  }

  // ---------- apps: pinned horizontal scroll on desktop, stacked on mobile ----------

  function setupApps() {
    const track = $(".apps__track");
    const panels = $$(".app");
    const setPageBg = (color) => document.body.style.setProperty("--page-bg", color || "var(--bg)");
    const mm = gsap.matchMedia();
    const state = { tween: null, trigger: null };

    mm.add("(min-width: 1024px) and (min-height: 620px)", () => {
      root.classList.add("h-scroll");
      const distance = () => track.scrollWidth - innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onLeave: () => setPageBg(),
          onLeaveBack: () => setPageBg(),
          onEnter: () => setPageBg(panels[0].style.getPropertyValue("--app-bg")),
          onEnterBack: () => setPageBg(panels.at(-1).style.getPropertyValue("--app-bg")),
        },
      });
      state.tween = tween;
      state.trigger = tween.scrollTrigger;

      panels.forEach((panel, i) => {
        const bg = panel.style.getPropertyValue("--app-bg");
        const ct = { containerAnimation: tween, trigger: panel };

        ScrollTrigger.create({ ...ct, start: "left center", end: "right center", onToggle: (s) => s.isActive && tween.scrollTrigger.isActive && setPageBg(bg) });

        if (i > 0) {
          gsap.from($$(".app__meta, .app__tagline, .app__summary, .app__features li, .app__actions > *", panel), {
            x: 160, opacity: 0, stagger: 0.04, ease: "power2.out",
            scrollTrigger: { ...ct, start: "left 85%", end: "left 25%", scrub: 1 },
          });
          gsap.from($$(".app__title .char, .app__icon", panel), {
            yPercent: 120, rotate: 8, stagger: 0.03, ease: "power3.out",
            scrollTrigger: { ...ct, start: "left 75%", end: "left 30%", scrub: 1 },
          });
        }
        gsap.fromTo($(".app__device", panel), { rotateY: -28, rotateZ: 6, xPercent: 30, transformPerspective: 1200 }, {
          rotateY: 18, rotateZ: -4, xPercent: -30, ease: "none",
          scrollTrigger: { ...ct, start: "left right", end: "right left", scrub: true },
        });
        gsap.fromTo($(".app__glow", panel), { xPercent: 40 }, {
          xPercent: -60, ease: "none",
          scrollTrigger: { ...ct, start: "left right", end: "right left", scrub: true },
        });
      });

      return () => {
        root.classList.remove("h-scroll");
        state.tween = state.trigger = null;
        setPageBg();
      };
    });

    mm.add("(max-width: 1023px), (max-height: 619px)", () => {
      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel, start: "top 55%", end: "bottom 45%",
          onToggle: (s) => setPageBg(s.isActive ? panel.style.getPropertyValue("--app-bg") : undefined),
        });
        gsap.from(panel, { y: 80, opacity: 0, scale: 0.96, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: panel, start: "top 85%" } });
        gsap.from($$(".app__title .char", panel), { yPercent: 120, stagger: 0.03, duration: 1, ease: "expo.out", scrollTrigger: { trigger: panel, start: "top 60%" } });
      });
    });

    return state;
  }

  // ---------- in-page links go through Lenis (and understand the horizontal track) ----------

  function setupAnchors(horizontal) {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href").slice(1);
        const target = id ? document.getElementById(id) : document.body;
        if (!target) return;
        e.preventDefault();
        let y = target;
        const panels = $$(".app");
        const idx = panels.indexOf(target);
        if (idx > -1 && horizontal.trigger) {
          y = horizontal.trigger.start + idx * innerWidth;
        }
        if (lenis) lenis.scrollTo(y, { offset: typeof y === "number" ? 0 : -20, duration: 1.6 });
        else (typeof y === "number" ? scrollTo({ top: y, behavior: "smooth" }) : target.scrollIntoView({ behavior: "smooth" }));
        history.replaceState(null, "", `#${id}`);
      });
    });
  }

  // ---------- scroll reveals ----------

  function setupReveals() {
    $$("[data-split]").forEach((el) => {
      if (el.closest(".hero") || el.closest(".app")) return;
      gsap.from($$(".char", el), {
        yPercent: 120, rotate: 6, stagger: 0.025, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    ScrollTrigger.batch($$("main [data-fade]").filter((el) => !el.closest(".hero")), {
      start: "top 88%",
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: "expo.out", overwrite: true }),
    });

    $$("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count);
      const obj = { v: 0 };
      el.textContent = "0";
      ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: () => gsap.to(obj, { v: end, duration: 2, ease: "power3.out", onUpdate: () => (el.textContent = Math.round(obj.v)) }),
      });
    });

    $$(".cta__line").forEach((line) => {
      gsap.fromTo(line, { "--fill": "100%" }, { "--fill": "0%", ease: "none", scrollTrigger: { trigger: line, start: "top 85%", end: "top 35%", scrub: true } });
    });
    gsap.from(".cta .btn", { scale: 0.6, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)", scrollTrigger: { trigger: ".cta .btn", start: "top 92%" } });

    // whole word (not letters): the letters keep a CSS hover transition that would fight GSAP
    gsap.from(".footer__word", {
      yPercent: 40, opacity: 0, scale: 0.9, duration: 1.4, ease: "expo.out",
      scrollTrigger: { trigger: ".footer", start: "top 90%" },
    });
  }

  // ---------- FAQ: animated open/close on top of native <details> ----------

  function setupFaq() {
    $$(".faq details").forEach((d) => {
      const summary = $("summary", d);
      const answer = $(".faq__answer", d);
      summary.addEventListener("click", (e) => {
        e.preventDefault();
        if (d.open) {
          gsap.to(answer, { height: 0, opacity: 0, duration: 0.45, ease: "power3.inOut", onComplete: () => { d.open = false; gsap.set(answer, { clearProps: "all" }); } });
        } else {
          d.open = true;
          gsap.fromTo(answer, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.6, ease: "expo.out", onComplete: () => ScrollTrigger.refresh() });
        }
      });
    });
  }

  // ---------- nav hide/show + progress bar ----------

  function setupChrome() {
    const nav = $(".nav");
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => {
        gsap.set(".progress", { scaleX: self.progress });
        nav.classList.toggle("is-hidden", self.direction === 1 && self.scroll() > 400);
      },
    });
  }

  // ---------- custom cursor ----------

  function setupCursor() {
    const cursor = $(".cursor");
    const dot = $(".cursor__dot"), ring = $(".cursor__ring"), label = $(".cursor__ring em");
    const dx = gsap.quickTo(dot, "x", { duration: 0.1 }), dy = gsap.quickTo(dot, "y", { duration: 0.1 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" }), ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    addEventListener("pointermove", (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
    document.addEventListener("pointerover", (e) => {
      const device = e.target.closest(".app__device");
      const link = e.target.closest("a, button, summary");
      cursor.classList.toggle("is-label", Boolean(device));
      cursor.classList.toggle("is-link", Boolean(link) && !device);
      label.textContent = device ? "Next" : "";
    });
    root.addEventListener("mouseleave", () => gsap.to([dot, ring], { opacity: 0 }));
    root.addEventListener("mouseenter", () => gsap.to([dot, ring], { opacity: 1 }));
  }

  // ---------- magnetic buttons ----------

  function setupMagnetic() {
    $$("[data-magnetic]").forEach((el) => {
      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - r.left - r.width / 2) * 0.3);
        y((e.clientY - r.top - r.height / 2) * 0.4);
      });
      el.addEventListener("pointerleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" }));
    });
  }

  // ---------- 3D tilt for cards and phones ----------

  function setupTilt() {
    $$("[data-tilt]").forEach((el) => {
      const target = el.classList.contains("app__device") ? $(".device", el) : el;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        gsap.to(target, { rotationY: (px - 0.5) * 16, rotationX: (0.5 - py) * 16, transformPerspective: 900, duration: 0.6, ease: "power2.out" });
      });
      el.addEventListener("pointerleave", () => gsap.to(target, { rotationY: 0, rotationX: 0, duration: 1, ease: "elastic.out(1, 0.5)" }));
    });
  }

  // ---------- screenshot slideshows (works without GSAP too) ----------

  function setupSlideshows() {
    $$(".app__device").forEach((wrap) => {
      const shots = $$(".device img", wrap);
      const dots = $$(".app__dots i", wrap);
      let index = 0, timer = null;

      const show = (n) => {
        index = (n + shots.length) % shots.length;
        shots.forEach((s, i) => s.classList.toggle("is-active", i === index));
        dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
      };
      const start = () => { if (!reduceMotion && !timer) timer = setInterval(() => show(index + 1), 2800); };
      const stop = () => { clearInterval(timer); timer = null; };

      wrap.addEventListener("click", () => { show(index + 1); stop(); start(); });
      new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.3 }).observe(wrap);
    });
  }
})();
