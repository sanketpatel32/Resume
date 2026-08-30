# Sanket Patel Portfolio

A modern, responsive portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion.

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
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather)

## Project Structure

```text
src/
  app/
    about/page.tsx             # Standalone About trust anchor page
    contact/page.tsx           # Standalone Contact trust anchor page
    privacy/page.tsx           # Standalone Privacy Policy trust anchor page
    globals.css                # Theme variables and global styles
    layout.tsx                 # Root layout with SEO metadata & JSON-LD graph
    page.tsx                   # Thin page entrypoint -> renders ResumePage
    robots.ts                  # Robots.txt generator with AI crawler permissions
    sitemap.ts                 # XML sitemap generator
    api/contact/route.ts       # Thin API route orchestrator (POST endpoint)
    api/markdown/[[...slug]]/route.ts # Content negotiation markdown handler

  features/
    resume/
      model/
        types.ts               # Resume domain types
        sectionNav.ts          # Navigation section IDs/labels
      content/
        index.ts               # Main content entrypoint
        profile.ts
        career.ts
        education.ts
        skills.ts
        projects.ts
        contact.ts
        seo.ts
        site.ts
        markdown.ts            # Markdown generator for LLMs & agents
      jsonld/
        personJsonLd.ts        # schema.org JSON-LD (Person, Organization, WebSite)
      ui/
        ResumePage.tsx         # Feature page composition
        Navbar.tsx
        Footer.tsx
        sections/
          AboutSection.tsx
          CareerSection.tsx
          EducationSection.tsx
          SkillsSection.tsx
          ProjectsSection.tsx
          ContactSection.tsx
        cards/
          TimelineItem.tsx
          ProjectCard.tsx
          SkillIcon.tsx

  shared/
    ui/
      Section.tsx              # Generic section wrapper
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