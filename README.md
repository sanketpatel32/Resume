This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Portfolio homepage

The home page puts owned projects first. The **System Design Quest** illustration
shows concepts in the course, not its production topology. The optional practice
card uses the original lesson 17, with no score or tracking. Other featured work
includes UI Vault, Blunt Code, and YumeDock. The contribution gallery ranks
curated exhibits by their repositories' GitHub stars and shows a specific merged
PR for each. The expandable index contains every PR in the snapshot. Navigation,
the index and the evidence links work without client-side JavaScript.

Run `npm run build`, start the production server, then run `npm test` in
a second terminal. Set `RESUME_TEST_URL` to test a server at a different address.

## Contribution snapshot

`src/features/fieldtrials/contributions.json` is a checked-in snapshot of merged PRs to public repositories outside the owner's namespace — only public repo, PR number, date, title and URL; validated and timestamped.
Refresh it by hand with `node scripts/refresh-contributions.mjs` (anonymous GitHub REST search, no credentials); any failed validation leaves the previous snapshot untouched.
Repository star counts are recorded separately in `src/features/switchyard/repo-stars.json` using public GitHub repository metadata. Keep the counts and their observation date together when refreshing. Nothing fetches either snapshot at build time or in the browser.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
