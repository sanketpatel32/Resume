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
    globals.css                # Theme variables and global styles
    layout.tsx                 # Root layout with SEO metadata from resume content
    page.tsx                   # Thin page entrypoint -> renders ResumePage
    api/contact/route.ts       # Thin API route orchestrator

  features/
    resume/
      model/
        types.ts               # Resume domain types
        sectionNav.ts          # Navigation section IDs/labels
      content/
        index.ts               # Main content entrypoint (start editing here)
        profile.ts
        career.ts
        education.ts
        skills.ts
        projects.ts
        contact.ts
        seo.ts
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

    contact/
      model/
        types.ts               # Contact request/validation types
        validation.ts          # validateContactInput(payload)
      server/
        brevoClient.ts         # Brevo transport wrapper
        emailTemplate.ts       # Contact email HTML builder
        sendContactEmail.ts    # Contact email application service
      ui/
        ContactForm.tsx
      index.ts                 # Feature barrel exports

  shared/
    ui/
      Section.tsx              # Generic section wrapper
    lib/
      scroll.ts                # Shared smooth-scroll utilities
```

## Where to Edit What

- Start in `src/features/resume/content/index.ts` for the full composed content object.
- Edit `src/features/resume/content/profile.ts` for name/title/summary/highlights and branding identity.
- Edit `src/features/resume/content/career.ts`, `education.ts`, `skills.ts`, and `projects.ts` for section-specific updates.
- Edit `src/features/resume/content/contact.ts` for contact links and basic details.
- Edit `src/features/resume/content/seo.ts` for page metadata/SEO values.

## Design Features

- Pure black (`#000`) background
- Emerald accent color (`#6EE7B7`)
- Smooth scroll animations
- Reduced motion support
- Mobile responsive with hamburger menu
- Accessible contact form with validation

## Build for Production

```bash
npm run build
npm start
```