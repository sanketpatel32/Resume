export interface DemoSample {
  id: string;
  label: string;
  body: string;
}

/**
 * Documents owned by the browser demo. Both are real working artifacts of
 * the mdpeek v2 story — the shipped release note and a decision record —
 * reduced to the Markdown features this page actually renders.
 */
export const DEMO_SAMPLES: DemoSample[] = [
  {
    id: "release-note",
    label: "Release note",
    body: `# mdpeek 2.0.0 — the simplification release

mdpeek is a **Markdown viewer/editor** again. Everything that made it an IDE, notebook, or knowledge base is gone — ~28,500 lines removed and a **5.2 MB** installer (was ~7.3 MB).

## Removed
- Workspace hub: Kanban, calendar, tasks, flashcards
- Live collaboration: P2P co-editing and \`mdpeek://\` invites
- Integrated terminal, presentation mode, PDF viewer
- Backlinks, tag pane, snapshots, gamification

## Kept and polished
- Markdown editor + live preview (GFM, KaTeX, Mermaid)
- Tabs, file explorer, project-wide find & replace
- Code / CSV / image / plain-text viewers, reader mode
- Export HTML / PDF, wiki-links, daily notes

| Build | Installer | Focus |
| --- | --- | --- |
| v1.x | ~7.3 MB | workspace |
| v2.0.0 | 5.2 MB | documents |

> The desktop app does the real work. This page only sketches its input → preview loop.

## Ship list
- [x] Faster cold boot
- [x] Calmer topbar
- [ ] Try it: tick this box in Preview`,
  },
  {
    id: "decision-log",
    label: "Decision log",
    body: `# Decision log — mdpeek v2

## Status
Accepted. Shipped in 2.0.0.

## Context
v1 carried a terminal, P2P editing, a Kanban hub, notebooks and media panes. Each feature was small; together they made a ~7 MB app that took seconds to open a text file.

## Decision
Drop every feature that is not *open → read → edit → export*. The editor keeps live preview, tabs, the file explorer and exports — nothing else.

## Consequences
- ~28,500 lines removed; installer down to **5.2 MB**
- P2P, terminal and IDE tooling are gone for good
- Markdown rendering (GFM, KaTeX, Mermaid) stays

## Checklist
- [x] Remove collaboration stack
- [x] Re-wire edit / preview toggle
- [ ] Archive v1 feature flags`,
  },
];
