# rowandixon.com

Personal portfolio site. Three standalone HTML pages, each a proper self-contained document (doctype, `<head>` with charset/viewport/title, `<body>`) — no build step, no framework, no dependencies beyond the Jura font (Google Fonts). CSS lives in its own file per page; the HTML files are markup only.

```
rootfolder/
├── index.html          home page (scroll-driven particle-mesh mockup)
├── portfolio.html       Tewke featured, plus previous projects
├── interests.html       Mountaineering featured, plus Running, Climbing, Skiing
├── css/
│   ├── home.css
│   ├── portfolio.css
│   └── interests.css
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
    └── interests/        (empty for now — no photos yet)
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

`images/home/` and `images/interests/` exist but are empty right now:
- The home page doesn't use discrete photo files at all — its particle-mesh visuals are generated on a `<canvas>` from coordinate data embedded in the page's own JS, not from images. The folder's there in case that ever changes (e.g. swapping in real photography for one of the five sections).
- The Interests page doesn't have real photos yet — every image slot on it is still a placeholder. Drop files in here (following the portfolio folder as a pattern) whenever real mountaineering/running/climbing/skiing photos are ready, and let me know so I can wire up the `src` attributes.

Both contain a `.gitkeep` so git tracks the empty folder.

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
- **About** and **Media** don't exist as pages yet — their nav links are inert (`#`) placeholders on every page.
- Nothing here needs `node_modules` or a build step. If a future redesign moves to a static site generator (Astro, 11ty, etc. — see the hosting research doc in the Claude project), these files are a solid reference for the content and visual design to port over.
