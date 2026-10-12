# Trust A Fro Moving Co. website

Static site built with Eleventy and hosted on GitHub Pages:
https://techytembo.github.io/trust-a-fro-moving/

Content lives in `src/_data/*.json`. Every push to `main` rebuilds and republishes the site
(see `.github/workflows/pages.yml`); it goes live in about a minute.

## Preview and edit on your computer

```
npm install
npm start            # site at http://localhost:8080
npx decap-server     # optional, in a second terminal: visual editor at http://localhost:8080/admin/
```

The visual editor only works on your computer (GitHub Pages has no login server for it).
It saves straight into the files below; commit and push to publish.

## Where content lives

| What | File |
|---|---|
| Hero, partner, reviews heading, why-us, about, service areas, gallery, quote section | `src/_data/home.json` |
| Service boxes | `src/_data/services.json` |
| Customer reviews | `src/_data/reviews.json` |
| Gallery photos | `src/_data/gallery.json` |
| Phone, email, logo, Google link, social links, colors, font | `src/_data/settings.json` |
| Uploaded images | `src/images/uploads/` |

## Quote form

GitHub Pages cannot receive form submissions. The quote form opens the visitor's own email app
with their answers filled in, addressed to the `email` in `settings.json`.

## One-time GitHub Pages setup

Repo Settings > Pages > Build and deployment > Source: **GitHub Actions**.

To use your own domain later (for example TrustAFro.com): Settings > Pages > Custom domain, then
remove `PATH_PREFIX` from the workflow so the site builds at the domain root.
