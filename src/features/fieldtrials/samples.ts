export interface DemoSample {
  id: string;
  label: string;
  body: string;
}

/**
 * Documents owned by the browser demo — short specimens that show the
 * core edit → preview behavior in a handful of lines.
 */
export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: "release-note",
    label: "Release note",
    body: `# mdpeek 2.0.0

A smaller editor — your file,
its preview, nothing extra.

- [x] Live preview stays
- [ ] Try ticking this box`,
  },
  {
    id: "decision-log",
    label: "Decision log",
    body: `# Decision log — v2

Keep the app to one job:
open, edit, preview.

- [x] Cut IDE extras
- [ ] Revisit panes later`,
  },
];
