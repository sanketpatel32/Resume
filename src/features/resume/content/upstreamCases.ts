export interface UpstreamCaseStudy {
  repository: string;
  name: string;
  kind: string;
  pull: number;
  issue?: { number: number; opened: string };
  problem: string;
  change: string;
  outcome: string;
}

/**
 * Three selected case studies, each grounded in a public merged pull request.
 * Kept deliberately small: the full list lives in contributions.ts.
 */
export const upstreamCases: readonly UpstreamCaseStudy[] = [
  {
    repository: "CherryHQ/cherry-studio",
    name: "Cherry Studio",
    kind: "Desktop reliability",
    pull: 25286,
    issue: { number: 23451, opened: "Nov 2026" },
    problem:
      "A Windows registry PATH or corrupted profile entry containing NUL bytes made Node's spawn validation throw, so every spawn-dependent feature — Work conversations, MCP tool launches, bundled binaries — failed before the child process could start.",
    change:
      "Strip NUL bytes from environment keys and values once, inside loadShellEnv/getRawShellEnv — the single funnel all spawn consumers pass through — instead of patching each of the ~40 call sites. A stripped byte logs a warning rather than surfacing a crash.",
    outcome:
      "Merged. Every env consumer downstream of the funnel now receives spawn-safe values, so the reported Windows crash path is gone for good.",
  },
  {
    repository: "LibrePhotos/librephotos",
    name: "LibrePhotos",
    kind: "Product engineering",
    pull: 3106,
    issue: { number: 3012, opened: "Nov 2026" },
    problem:
      "Album share links could carry an expiry date, but single-photo share links could not — a feature gap users asked for directly.",
    change:
      "Added expires_at to PhotoShare (migration 0245) mirroring the album model, enforced it with a 404 across photo, media and metadata routes, threaded the field through the serializer, zod schema and OpenAPI spec, and extracted a shared LinkExpirySetting control with 7/30/90-day and Never presets.",
    outcome:
      "Merged. An expired link 404s everywhere at once, and setting a new date reopens the same URL — covered by a new PhotoShareExpiryTest suite.",
  },
  {
    repository: "nextcloud/spreed",
    name: "Nextcloud Talk",
    kind: "Federation",
    pull: 20467,
    issue: { number: 11857, opened: "Mar 2024" },
    problem:
      "In federated conversations, users never got notified when someone reacted to their message — even with notification level set to \"All messages\" — because the notifier only covered local actors.",
    change:
      "Introduced a dedicated REACTION_ADDED OCM notification: the host informs the message author's home server, which checks the participant's locally stored notification level and creates the same reaction notification a local user would get — with the reactor shown by display name, not cloud id.",
    outcome:
      "Merged, closing an issue open since March 2024. Federated participants now get reaction notifications on the same rules as local users.",
  },
];
