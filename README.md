# Sanket Patel — The Workbench

Sanket Patel’s personal site, résumé and open-source contribution ledger. The homepage uses a server-rendered Next.js page with native expandable sections and an original SVG merge graph. It has no splash screen, custom scroll, or WebGL requirement.

## Develop and verify

```bash
npm ci
npm run dev
npm run lint
npm run build
```

Run `npm test` with the site running at `http://localhost:3000` to include the HTTP integration checks. Without the server those tests are skipped.

- Personal projects and career facts: `src/features/resume/content/`.
- Upstream ledger: `src/features/resume/content/contributions.ts`. Add only merged pull requests to external repositories; the homepage and Markdown homepage share this source.
- Homepage layout: `src/features/resume/ui/Workbench.tsx`; styles: `src/app/workbench.css`.
- The about, contact, privacy and developer routes, résumé PDF, JSON-LD, and Markdown endpoints are part of the site.

## Design references

[Lee Robinson](https://leerob.com/) informed the direct introduction and readable index. [Maggie Appleton](https://maggieappleton.com/) inspired an editorial organization around distinct kinds of work. [Bruno Simon](https://bruno-simon.com/) was a reference for making the site's own graphic a demonstration of craft; the merge graph here is an original, static SVG with no interaction barrier.
