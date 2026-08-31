# rowandixon.com

Personal portfolio site. Three standalone HTML pages, each a proper self-contained document (doctype, `<head>` with charset/viewport/title, `<body>`) — no build step, no framework, no dependencies beyond the Jura font (Google Fonts). CSS lives in its own file per page; the HTML files are markup only.

```
rootfolder/
├── index.html          home page (scroll-driven particle-mesh mockup)
├── portfolio.html       Tewke featured, plus previous projects
├── interests.html       Mountaineering featured, plus Running, Climbing, Skiing
├── about.html            Bio + photo, pulled from the live Wix About page
├── media.html            Press releases + podcast appearances
├── mountaineering.html   Mountaineering photo gallery
├── running.html          Running photo gallery
├── climbing.html         Climbing photo gallery
├── skiing.html           Skiing photo gallery
├── css/
│   ├── home.css
│   ├── portfolio.css
│   ├── interests.css
│   ├── about.css
│   ├── media.css
│   └── interest-detail.css   shared by the 4 gallery pages above
└── images/
    ├── home/             (empty for now — see note below)
    ├── portfolio/
    │   ├── beat.jpg
    │   ├── efd1.jpg
    │   ├── blink.jpg
    │   ├── roupell-l1.jpg
    │   ├── s3.jpg
    │   ├── dremel-fan.jpg
    │   ├── tewke-tap.mp4
    │   └── tewke-tap.webm
    ├── interests/
    │   ├── mountaineering/   (empty — drop halo1.jpeg … halo4.jpeg in here)
    │   ├── running/          (empty — drop halo1.jpeg … halo4.jpeg in here)
    │   ├── climbing/         (empty — drop halo1.jpeg … halo3.jpeg in here)
    │   └── skiing/           (empty — drop halo1.jpeg … halo3.jpeg in here)
    ├── about/
    │   └── rowan-portrait.jpg
    └── media/
        ├── media-halo.jpg
        └── reddot-logo.png
```

## Why the CSS lives in its own files

Each page used to carry its styling inline in a `<style>` block at the top of the HTML. That's split out now — every page links to its own stylesheet with `<link rel="stylesheet" href="css/home.css">` (etc.) instead. Same two benefits as the image split: the browser can cache each CSS file separately across visits (and across pages, if you later merge shared rules), and tweaking a color or spacing value is now a one-file edit instead of hunting through a wall of markup. `portfolio.css` and `interests.css` currently share almost all of their rules (same layout system, just a different `--accent` color) — worth merging into a shared `base.css` at some point if you want to cut the duplication, but left as-is for now since the pages were built separately.

## Why images live outside the HTML

Earlier drafts embedded every photo/video as a base64 `data:` URI directly in the HTML (that was a constraint of previewing them as Claude Artifacts, which can't load external images). That's gone now: every page references its images with a normal relative `<img src="images/portfolio/beat.jpg">` / `<source src="images/portfolio/tewke-tap.webm">`. Two concrete benefits:

- **Faster loads.** `portfolio.html` went from ~2.2MB (everything inlined, all downloaded before the page can even start rendering) to ~21KB of actual markup — the browser now fetches images/video as separate, cacheable, parallel requests instead of one giant blocking HTML payload.
- **Easy to swap.** Replacing a photo is now "drop a new file in `images/portfolio/`, keep the same filename (or update one `src` attribute)" instead of re-generating a base64 blob.

The Tewke hero video ships as two files (`tewke-tap.webm` first, `tewke-tap.mp4` as the fallback `<source>`) for browser compatibility — WebM/VP9 is smaller and works in Chrome/Firefox, MP4/H.264 is the universal fallback (notably for Safari).

The image files here are the same already-optimized versions that were live on the published pages (resized to a ~1100px longest edge, compressed) — not the original multi-megabyte camera/render files. That keeps the repo lean and the site fast; if you ever want higher-resolution versions for a specific photo, just replace that one file.

## Empty image folders

`images/home/` and the four folders under `images/interests/` exist but are empty right now:
- The home page doesn't use discrete photo files at all — its particle-mesh visuals are generated on a `<canvas>` from coordinate data embedded in the page's own JS, not from images. The folder's there in case that ever changes (e.g. swapping in real photography for one of the five sections).
- `images/interests/mountaineering/`, `running/`, `climbing/` and `skiing/` are each wired up to auto-load photos by filename — see "Mountaineering, Running, Climbing, Skiing pages" below.

Each empty folder contains a `.gitkeep` so git tracks it.

## About page

`about.html` reuses the exact same design system as `portfolio.html`/`interests.html` (same topbar, intro header, "featured" hero layout, footer, reveal-on-scroll script) via its own `css/about.css` — a copy of `portfolio.css` with a distinct `--accent` (indigo, `#4a5fc1`) and a taller `.featured .render-stage` aspect ratio to suit a portrait photo instead of a landscape product shot.

The photo and bio text were pulled from the live `rowandixon.com/about` page on Wix: `images/about/rowan-portrait.jpg` is the same "Rowan with Tap" portrait, and the three body paragraphs plus the "DESIGNER · ENGINEER · DIY'ER" tagline are copied as-is. If you replace the Wix site later, this page won't need to change.

Every other page's **About** nav link now points here instead of being an inert placeholder, and on the home page the "About" title, its dot in the left-hand rail, and clicking the particle mesh itself all open this page too — the same pattern already used for Portfolio and Interests.

## Media page

`media.html` lists press coverage and podcast appearances as a simple two-section link list (`css/media.css`, same copy-of-portfolio.css pattern, this time with a purple `--accent`) rather than the card-grid used elsewhere — a better fit for "outlet, headline, date, link out" content than square photo cards.

Each row shows a small favicon next to the outlet name, loaded live from Google's public favicon service (`https://www.google.com/s2/favicons?domain=...`) rather than downloaded/hosted copies of anyone's logo — avoids reproducing trademarked logo files while still giving each row a recognizable mark. If an icon ever fails to load, it falls back to showing the outlet's first initial instead of a broken image.

Wired into the rest of the site the same way About was: every page's Media nav link is real now, and on the home page the "Media" title, its dot, and the particle mesh itself all open this page too.

A "halo" banner photo sits at the top of the page too — `images/media/media-halo.jpg` — using the same `object-fit:cover` treatment as the rest of the site's photo panels.

## Mountaineering, Running, Climbing, Skiing pages

`interests.html` still has its own hero (Mountaineering) and 3-card grid (Running/Climbing/Skiing), but each of those four now also links out to its own dedicated page — `mountaineering.html`, `running.html`, `climbing.html`, `skiing.html` — built from a shared stylesheet, `css/interest-detail.css`, with the accent color set per page.

Each page opens with `halo1` as a full-bleed photo right at the top — edge to edge, no side padding, with the page title overlaid in the bottom-left corner over a dark gradient scrim so it stays readable whatever the photo looks like. Below that: a short intro (breadcrumb, one-line lede, a facts box and/or tag chips), then the rest of the photos, each one paired with its own bit of real text about that photo or trip rather than a generic caption — alternating photo-left/photo-right down the page so it doesn't feel like a repeating template. A "More from Interests" link row at the bottom hops to the other three.

**This is designed so you can just drop photos into the folder and they show up — no code changes needed.** Each slot looks for a specific filename inside that activity's folder:

- `images/interests/mountaineering/halo1.jpeg` through `halo4.jpeg` (hero + 3 story photos)
- `images/interests/running/halo1.jpeg` through `halo4.jpeg` (hero + 3 story photos)
- `images/interests/climbing/halo1.jpeg` through `halo3.jpeg` (hero + 2 story photos)
- `images/interests/skiing/halo1.jpeg` through `halo3.jpeg` (hero + 2 story photos)

`halo1` is always the full-bleed hero; `halo2` onward fill the photo-and-text rows underneath, in order. Until a file exists at that path, the slot shows a placeholder panel (a line-art glyph plus a small "Add halo1.jpeg" label so it's obvious what to name the file); the moment a matching image is dropped in, it silently replaces the placeholder — no HTML edits required. Each slot also tries `.jpg`, `.png`, and a couple of capitalized-extension variants automatically, so it doesn't have to be exactly `.jpeg` — whatever extension the file actually has, as long as the name before the dot matches (`halo3.jpg` works just as well as `halo3.jpeg`).

The body text next to each photo is pulled from the real `/mountaineering`, `/running`, `/climbing` and `/skiing` pages on the live Wix site (not just the Interests category names) — race results, trip write-ups, competition history, lightly condensed to fit alongside a photo.

If you want to add or remove a photo slot for an activity, just say so and I'll adjust that page — the pattern is easy to repeat or trim.

## Hosting on GitHub Pages

1. Push this repo to GitHub (you've already got it cloned locally, ready to go).
2. Repo Settings → Pages → Deploy from a branch → pick `main` (or whichever branch) and `/ (root)`.
3. GitHub serves `index.html` at the repo root automatically.
4. For the custom domain (rowandixon.com, currently on Wix):
   - Add a file named `CNAME` (no extension) at the repo root containing just `rowandixon.com`, or set the custom domain in the Pages settings UI (which creates that file for you).
   - At whoever manages the domain's DNS (Wix, if the domain is also registered there): point the apex domain at GitHub's IPs (or use an ALIAS/ANAME record if supported), and/or add a CNAME record for `www` pointing at `<your-github-username>.github.io`. GitHub's docs have the exact records.
   - HTTPS cert issues automatically once DNS resolves, usually within minutes.

## Structure notes

- Pages link to each other with plain relative paths (`portfolio.html`, `interests.html`, `index.html`).
- Flat structure at the root on purpose — smallest number of moving parts at this size. If the site grows (e.g. individual project case-study pages), a natural next step is a `projects/` subfolder with its own `images/` inside it; just remember relative links from inside a subfolder need an extra `../` to reach the root pages.
- Every page in the nav now has a real destination — **About** and **Media** were the last two placeholders (see their sections above/below). The four Interests sub-pages (**Mountaineering**, **Running**, **Climbing**, **Skiing**) aren't in the top nav themselves — they're reached from `interests.html` and cross-link to each other.
- Nothing here needs `node_modules` or a build step. If a future redesign moves to a static site generator (Astro, 11ty, etc. — see the hosting research doc in the Claude project), these files are a solid reference for the content and visual design to port over.
