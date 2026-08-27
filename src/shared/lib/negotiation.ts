/**
 * HTTP content negotiation for agent-friendly markdown serving.
 *
 * Implements RFC 9110 §12.5.1 semantics for the two representations this
 * site produces: text/html (default) and text/markdown (agent variant).
 *
 * Reference implementation: https://acceptmarkdown.com/recipes/nextjs
 */

export const PRODUCES = ["text/html", "text/markdown"] as const;

export type ProducesType = (typeof PRODUCES)[number];

interface AcceptEntry {
  type: string;
  q: number;
  specificity: number;
}

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw) => {
      const parts = raw.trim().split(";").map((s) => s.trim());
      const type = parts[0].toLowerCase();
      let q = 1;
      for (const param of parts.slice(1)) {
        const [name, value] = param.split("=").map((s) => s.trim());
        if (name === "q") {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
      return { type, q, specificity };
    });
  // Client order is preserved — position is used for tiebreaks below.
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

/**
 * Pick the best producible type for an Accept header.
 * Returns null when the client rejects every representation (q=0),
 * signalling a 406 to the caller.
 */
export function preferredType(header: string | null | undefined): ProducesType | null {
  if (!header || header.trim() === "") return PRODUCES[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return PRODUCES[0];

  let bestType: ProducesType | null = null;
  let bestQ = -1;
  let bestPosition = Number.POSITIVE_INFINITY;

  for (const candidate of PRODUCES) {
    // Find the most specific matching range. Per RFC 9110 §12.5.1 a specific
    // range overrides less specific ones regardless of q — so
    // `text/html;q=0, */*;q=1` correctly rejects text/html.
    let matched: AcceptEntry | null = null;
    let matchedPosition = Number.POSITIVE_INFINITY;
    for (let idx = 0; idx < entries.length; idx += 1) {
      const entry = entries[idx];
      if (!matches(entry, candidate)) continue;
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = entry;
        matchedPosition = idx;
      }
    }
    if (matched === null) continue;
    if (matched.q <= 0) continue; // explicit rejection

    // Highest q wins; tie-break on client order so
    // `text/markdown, text/html, */*` picks text/markdown.
    if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
      bestQ = matched.q;
      bestPosition = matchedPosition;
      bestType = candidate;
    }
  }

  return bestType;
}

/** True when an Accept header exists but matches nothing we produce. */
export function isNotAcceptable(header: string | null | undefined): boolean {
  if (!header || header.trim() === "") return false;
  return preferredType(header) === null;
}

/** Add `Accept` to a Vary header without duplicating tokens (case-insensitive). */
export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (!tokens.includes("accept")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}

/** Paths whose last segment carries a file extension (e.g. /resume.pdf). */
export function hasFileExtension(pathname: string): boolean {
  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  return /\.[^./]+$/.test(lastSegment);
}

/**
 * Build the internal route-handler path for the markdown representation.
 * The trailing `.md` suffix maps to the base page (`/about.md -> /api/markdown/about`),
 * all other paths map verbatim (`/ -> /api/markdown`, `/foo -> /api/markdown/foo`).
 */
export function markdownInternalPath(pathname: string): string {
  if (pathname.endsWith(".md")) {
    return `/api/markdown${pathname.slice(0, -3)}`;
  }
  return `/api/markdown${pathname}`.replace(/\/$/, "");
}
