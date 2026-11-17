# swym

Static site for **Mr Best Cars**, served by the Cloudflare Worker `swym` (Git-connected; pushes to `main` deploy automatically).

- Live: https://mrbestcars.ca/ (main address)
- `mrbestcars.com`, `www.mrbestcars.com` and `www.mrbestcars.ca` 301-redirect to it, keeping the path (see `src/worker.js`)
- `site/`: the page (`index.html`), `assets/`, `_headers`, `robots.txt`, `sitemap.xml`
- `deliverables/`: screenshots, loader recording, notes and research

The old `jayantarora.in/swym` route was retired. The earlier `/protiviti` page is archived on branch `archive/protiviti-branch-vision`.

## Demo redesign (Phase 0, branch `claude/mbc-demo-redesign`)

A separate Next.js app in `demo/` with the new site design and a mock admin portal. It is not deployed and does not affect the live site. Run it with `cd demo && npm install && npm run dev`; see `demo/README.md`. Project documents are in `docs/`.
