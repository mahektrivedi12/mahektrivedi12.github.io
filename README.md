# Mahek Trivedi · Portfolio

A lightweight, accessible personal portfolio built with HTML, CSS and a small amount of JavaScript. No paid service, framework or installed package is required.

**Website:** https://mahektrivedi12.github.io/  
**Repository:** https://github.com/mahektrivedi12/mahektrivedi12.github.io

## Update the page

- Edit `index.html` to change the introduction, project descriptions, education and contact links.
- Edit `styles.css` to adjust colours, typography and layout.
- Edit `script.js` for the mobile menu and other small interactions.
- Replace `assets/Mahek-Trivedi-Resume.pdf` to update the downloadable resume. This file is public.
- Keep the title, description, canonical URL and social metadata in the HTML head consistent with any future name or domain changes.
- Project descriptions come from the supplied resume. Their repositories and live demos were not supplied, so no demo or source links are invented. Add verified project links when available.

The resume is reproduced as supplied, with permission. Review it before replacing it: everything in the PDF, including personal details, is publicly downloadable.

## Check and preview

Requires Node.js 22 or later; the preview command also uses Python.

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4173/ . `npm run check` checks JavaScript syntax, internal destinations, local files, the resume, metadata, heading order and basic accessibility hooks. Browser review is still needed for visual layout, contrast and interactive keyboard behaviour.

`dist/` contains only the public page and assets. The build excludes scripts, documentation, temporary files and the original workspace files.

## Publish with GitHub Pages

Push this folder's contents to the public repository **mahektrivedi12/mahektrivedi12.github.io**, with `index.html` at its root. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**. The included workflow checks and publishes `dist/` when `main` changes. A successful deployment appears in the repository's **Actions** tab and **github-pages** environment.

The workflow uses GitHub's current Pages actions. See [GitHub's workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). The `github.io` site includes HTTPS; no separate SSL purchase is needed.

## Optional custom domain later

No custom domain is required or configured. Before changing DNS, review all existing website and email records and preserve unrelated records, especially MX and email verification records.

1. Verify a domain you own in **your GitHub profile Settings → Pages**, using the TXT record GitHub supplies. Keep that record after verification.
2. Add the domain under **repository Settings → Pages → Custom domain** before pointing DNS at GitHub.
3. For a subdomain such as `www`, use a CNAME to `mahektrivedi12.github.io`. For the root domain, use the A/AAAA or ALIAS/ANAME records in GitHub's current instructions. Avoid wildcard DNS records.
4. Wait for DNS and certificate provisioning, then enable **Enforce HTTPS**. Update canonical and social URLs in `index.html`.

Follow the official [domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages), [DNS setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), and [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https) guides when making changes.

### Namecheap student offer, checked 5 November 2026

The [GitHub student offer page](https://nc.me/landing/github) advertises one year of a `.me` domain and SSL. The [Namecheap education FAQ](https://nc.me/faq) lists select universities in the US, UK, Canada and Australia and a $15/year renewal for its GitHub Pages bundle. Its school list and redemption terms may differ. Eligibility for NMIMS in India and GitHub Student Developer Pack approval have not been verified.

The normal [Namecheap `.me` price page](https://www.namecheap.com/domains/registration/cctld/me/) lists renewal at US$23.98/year, with a US$0 `.me` ICANN fee. The education bundle and normal retail renewal prices differ; confirm the actual renewal, taxes, optional add-ons and auto-renewal terms during redemption. No domain name was requested, so availability was not checked, and nothing was registered or purchased. The free `github.io` address avoids domain renewal fees.
