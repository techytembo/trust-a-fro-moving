# Trust A Fro Moving Co. website

Static site built with Eleventy. Content lives in `src/_data/*.json` and is edited through the Decap CMS editor at `/admin`.

## Preview on your computer

```
npm install
npm start            # site at http://localhost:8080
npx decap-server     # in a second terminal, then open http://localhost:8080/admin/
```

## Where content lives

| What | File |
|---|---|
| Hero, partner, why-us, about, service areas, gallery heading | `src/_data/home.json` |
| Service boxes | `src/_data/services.json` |
| Customer reviews | `src/_data/reviews.json` |
| Gallery photos | `src/_data/gallery.json` |
| Phone, logo, Google link, colors, font | `src/_data/settings.json` |
| Uploaded images | `src/images/uploads/` |

## Go live (one-time setup)

1. Create a GitHub repo (for example `trust-a-fro-moving`) and push this `site` folder to it.
2. In `src/admin/config.yml`, set `repo:` to `your-github-username/trust-a-fro-moving` and set `site_url`/`display_url` to your domain.
3. In Netlify, choose "Add new site" > "Import from GitHub" and pick the repo. Build settings come from `netlify.toml`.
4. Editor login: create a GitHub OAuth app (callback URL `https://api.netlify.com/auth/done`), then add its client ID and secret in Netlify under Site configuration > Access & security > OAuth > GitHub.
5. Quote form: in Netlify > Forms, enable form detection and add an email notification for the `quote` form.
6. Connect your domain in Netlify > Domain management.

After setup, open `https://your-domain/admin/`, log in with GitHub, edit, and click Publish. Netlify rebuilds the site in about a minute.
