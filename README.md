# ASTREA SSP website

Static bilingual German/English website for ASTREA Solo Space Program, deployed to [astreassp.de](https://astreassp.de/) using GitHub Pages and Cloudflare.

## Structure

- `index.html`: home and development overview
- `about.html`: program, methodology and professional technical contact
- `projects.html`, `projects/icarus.html`, `projects/joanus.html`: development projects
- `n/karton-test.html`: ICARUS M1 cardboard/fit testing article
- `support/index.html`, `support/hardware.html`, `support/member.html`: Patreon support navigation
- `privacy.html` and `impressum.html`: **draft legal pages with blocking placeholders**
- `assets/site.js`, `assets/support.js`, CSS files: shared static UI and DE/EN translations
- `scripts/check_site.py`, `tests/browser-smoke.mjs`: static and Chromium QA
- `tools/ticket-retention/`: tested Python **reference utility** for a separate home-hosted Discord bot

No site build step or production Node packages. JavaScript language selection uses localStorage for only `de` / `en`. It defaults to German in German-language browsers.

## Local inspection

```bash
python3 -m http.server 8765
# Visit http://localhost:8765/index.html
```

When using Python's simple server, open physical `.html` files explicitly. Pretty URLs such as `/projects` are resolved by GitHub Pages on the live host, not by this development server.

## Quality checks

```bash
python3 scripts/check_site.py
python3 -m unittest discover -s tools/ticket-retention/tests -v
npm install --no-save --package-lock=false playwright@1.56.1
npx playwright install chromium
python3 -m http.server 8765 &
node tests/browser-smoke.mjs
```

The CI jobs run these checks automatically on pull requests and attach Chromium screenshots. Browser QA verifies the two languages, six screen widths, legal navigation and baseline accessibility. It does not replace manual screen reader/security/legal review.

## Critical release constraints

**The current legal pages are working drafts. Do not treat placeholders as a lawful substitute for a valid service address.**

See `docs/privacy-release-checklist.md` for binding address/contract/minor-business questions, live Cloudflare checks, ticket-bot integration and manual QA. The 90-day transcript retention utility is **not** deployed to the home server through this repository.

Pull requests require a descriptive title and description. Do not automatically merge into `main`.
