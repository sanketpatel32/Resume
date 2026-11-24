# Sanket Patel Portfolio

An art-directed portfolio built with Next.js 16, TypeScript and Tailwind CSS. The homepage (Dossier) is a dark "merge ledger": verified upstream open-source work leads, with a git-log hero panel, problem/change/outcome case studies, and a full contribution ledger. The earlier descent/ResumePage composition remains in the tree but is no longer routed.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Motion**: GSAP ScrollTrigger + Lenis (scroll story), Framer Motion (contact form)
- **WebGL**: three.js via @react-three/fiber and drei, custom GLSL shaders, lazy-loaded
- **Icons**: React Icons (Feather)

## Project Structure

```text
src/
  app/
    about/page.tsx             # Standalone About trust anchor page
    contact/page.tsx           # Standalone Contact trust anchor page
    privacy/page.tsx           # Standalone Privacy Policy trust anchor page
    globals.css                # Shared chrome: nav, buttons, forms, footer, developer portal
    dossier.css                # Homepage art direction (merge-ledger dossier theme)
    layout.tsx                 # Root layout with SEO metadata & JSON-LD graph
    page.tsx                   # Thin page entrypoint -> renders Dossier
    robots.ts                  # Robots.txt generator with AI crawler permissions
    sitemap.ts                 # XML sitemap generator
    api/contact/route.ts       # Thin API route orchestrator (POST endpoint)
    api/markdown/[[...slug]]/route.ts # Content negotiation markdown handler

  features/
    resume/
      model/
        types.ts               # Resume domain types
        sectionNav.ts          # Navigation section IDs/labels
        path.ts                # Merges career and education into one timeline
      content/
        index.ts               # Main content entrypoint
        profile.ts
        career.ts
        education.ts
        skills.ts
        projects.ts
        stories.ts             # Case-study copy and visuals for each project
        contributions.ts       # Verified merged upstream PRs (ledger rows)
        upstreamCases.ts       # Featured upstream case studies (problem/change/outcome)
        contact.ts
        seo.ts
        site.ts
        markdown.ts            # Markdown generator for LLMs & agents
      jsonld/
        personJsonLd.ts        # schema.org JSON-LD (Person, Organization, WebSite)
      experience/              # Motion/WebGL gating, intro, scroll & pointer signals
      gl/                      # Lazy WebGL runtime (strata backdrop, per-project scenes, shaders)
      ui/
        Dossier.tsx            # Homepage composition (merge-ledger dossier)
        ResumePage.tsx         # Earlier descent composition (unrouted)
        Navbar.tsx
        Footer.tsx
        descent/               # Intro, custom cursor, depth gauge, split text
        sections/
          AboutSection.tsx     # Hero (surface) and its cinematic exit
          ManifestoSection.tsx
          ProjectsSection.tsx
          CareerSection.tsx    # Horizontal experience path
          SkillsSection.tsx
          CertificationsSection.tsx
          ContactSection.tsx   # The core
        cards/
          CaseStudy.tsx
          ProjectVisual.tsx
          SkillIcon.tsx

  shared/
    ui/
      SpotlightBackground.tsx  # Interactive glowing background
    lib/
      negotiation.ts           # RFC 9110 HTTP content negotiation
      scroll.ts                # Shared smooth-scroll & cross-page navigation
```

## Agent Readiness & Protocols

- **Content Negotiation**: Requesting with `Accept: text/markdown` returns markdown variants for all pages with `Vary: Accept`.
- **Manifests**: `public/llms.txt` and `public/llms-full.txt` provide structured indexing and deep context with dedicated **When to Use** guidance.
- **Trust Anchors**: Standalone `/about`, `/contact`, and `/privacy` routes (>500 chars each) with matching `.md` equivalents.
- **Structured Data**: `personJsonLd.ts` outputs complete schema.org graph including `Person`, `Organization` (with `contactPoint` and `address`), `WebSite`, `ProfilePage`, and `ItemList`.
- **Programmatic Contact Endpoint**: AI agents can submit opportunities via `POST /api/contact` with JSON body `{"name", "email", "subject", "message"}`.

## Build & Test

```bash
npm test        # Unit and E2E agent readiness test suite
npm run build   # Next.js production build
npm start       # Start production server
```
