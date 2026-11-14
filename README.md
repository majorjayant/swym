# swym

Static site for **Mr Best Cars**, served by the Cloudflare Worker `swym` (Git-connected; pushes to `main` deploy automatically).

- Live: https://mrbestcars.ca/ (main address)
- `mrbestcars.com`, `www.mrbestcars.com` and `www.mrbestcars.ca` 301-redirect to it, keeping the path (see `src/worker.js`)
- `site/`: the page (`index.html`), `assets/`, `_headers`, `robots.txt`, `sitemap.xml`
- `deliverables/`: screenshots, loader recording, notes and research

The old `jayantarora.in/swym` route was retired. The earlier `/protiviti` page is archived on branch `archive/protiviti-branch-vision`.
