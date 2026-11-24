---
name: impeccable
description: "Manual trigger only. Sanket's curated Impeccable guidance profile for the FIELD TRIALS portfolio redesign: craft-floor checks, material honesty, and a critique lens. Invoke only when Sanket explicitly asks (e.g. 'impeccable', 'impeccable critique'). Never auto-applies."
user-invocable: true
---

# Impeccable — curated field profile (inert)

This is a manually curated, read-only distillation of the public **Impeccable**
skill by Paul Bakaus. It contains no installer, no scripts, no hooks, no live
mode, no shell interpolation, and no remote configuration. It exists as
static Markdown guidance for this repository only.

- **Source:** `github.com/pbakaus/impeccable`, tag `skill-v4.10.0`,
  commit `b49177d32788f2dc585c42831d845dacf1ebed2c` (verified `refs/tags/skill-v4.10.0^{}`).
- **License:** Apache-2.0 (see the upstream repository). Adapted extracts below.
- **Scope:** craft-floor, brand/material-honesty and critique guidance only.
  All engine commands, hooks, agents, live mode and detection tooling were
  deliberately excluded.
- **Authority:** Sanket's written art direction (the active brief) wins over
  everything here, including lines marked as defaults below. When this file
  and the brief disagree, follow the brief and say where they differed.

## How to design (adapted)

- Finish the job. No hedging, no shortcuts: the deliverable is complete,
  except assets the user must provide.
- The brief wins. Honor pinned aesthetics, materials, fonts and palettes even
  when they conflict with a saturated-pattern warning.
- Commit, then clarify. Half-measures read as noise. Make the one decisive
  move completely, then quiet everything around it so the move is legible.
- Keep content true. Claims and configuration come from supplied truth; label
  illustrative values honestly. Never invent outcomes, features or metrics.
- Verify by looking at the rendered result at the sizes it ships at, and
  batch the checks: fix what one look shows before looking again.
- A portfolio is an *experience* surface: let the artifact lead from the
  first viewport; the interface recedes.

## Craft floor — verify on the built result

- **Contrast:** body text ≥ 4.5:1, large text ≥ 3:1.
- **Spacing:** tight groups, generous separation, more space above a heading
  than below it.
- **Type:** body measure ~65–75ch, balanced headings, obvious scale and
  weight steps. Run the real copy at every breakpoint; fix what overflows.
- **States:** hover, disabled, loading, error, empty; real content, working
  controls, responsive composition, keyboard focus.
- **Browser surfaces:** selection, caret, focus rings and underline offset
  ship browser defaults — theme them from the palette.
- **Copy:** controls name their action; errors name the problem and the
  recovery.
- **Coverage:** every brief requirement present and findable within seconds.

## Refuse — the category defaults (the brief's own words can earn them back)

- Same-size cards of icon + heading + text as page structure; nested cards.
- The hero-metric template; kickers/eyebrows above every heading; section
  numbers that carry no information.
- Gradient text; glass/blur as decoration; one-sided "accent bar" borders;
  hard offset shadows outside an actually-neobrutalist world.
- Sparklines, progress rings and soft-shadowed rounded rectangles standing
  in for content; monospace as a costume for "technical" rather than for
  code, data or measurement.
- Unicode glyphs or emoji standing in for an icon system; geometric masks
  approximating organic contours; sketch-style SVG imitating pictures.
- Grid overlays and repeating stripes as background texture; light/dark
  picked by category habit rather than by the use scene.

## Critique lens (when Sanket asks for a review)

Score with Nielsen's heuristics, in plain language, harshest first: system
status visibility, match with the real world, user control, consistency,
error prevention, recognition over recall, efficiency, minimalist aesthetic,
error recovery, help. Check extraneous cognitive load: walls of options,
memory bridges, hidden navigation, jargon, visual noise, inconsistent
patterns, context switches. File each finding with severity P0–P3, the
evidence, and the smallest fix — then stop and let Sanket rule on it.

## Explicitly not installed

The upstream engine binary, `impeccable` CLI verbs, hooks, sub-agents, live
browser mode, font fetcher, detector and all npm/npx entry points. Nothing
here executes; this file is guidance only.
