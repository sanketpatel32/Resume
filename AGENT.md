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

```
src/
├── app/
│   ├── globals.css      # Theme variables & global styles
│   ├── layout.tsx       # Root layout with SEO metadata
│   └── page.tsx         # Main page with all sections
├── components/
│   ├── Navbar.tsx       # Sticky navigation with scroll tracking
│   ├── Section.tsx      # Animated section wrapper
│   ├── TimelineItem.tsx # Career timeline cards
│   ├── ProjectCard.tsx  # Project showcase cards
│   └── ContactForm.tsx  # Contact form with validation
└── data/
    └── resume.ts        # All resume content (edit this to update)
```

## Updating Content

Edit `src/data/resume.ts` to update:
- Name, title, summary
- Career history
- Education
- Skills (grouped by category)
- Projects
- Contact info (email, phone, GitHub, Instagram, etc.)

## Design Features

- Pure black (#000) background
- Emerald accent color (#6EE7B7)
- Smooth scroll animations
- Reduced motion support
- Mobile-responsive with hamburger menu
- Accessible form with validation

## Build for Production

```bash
npm run build
npm start
```
