import { NextResponse, type NextRequest } from "next/server";
import {
  appendVaryAccept,
  hasFileExtension,
  isNotAcceptable,
  markdownInternalPath,
  preferredType,
} from "@/shared/lib/negotiation";

/**
 * Content negotiation at the network boundary.
 *
 * - `/page.md` URLs always serve the text/markdown representation.
 * - Clients whose Accept header prefers text/markdown are rewritten to the
 *   markdown route handler (`/api/markdown/**`).
 * - Clients that reject every producible type get a spec-correct 406.
 * - Every HTML response advertises `Vary: Accept` so CDN caches never hand
 *   an HTML variant to an agent asking for markdown (or vice versa).
 *
 * Next.js 16 convention: this file replaces the deprecated middleware.ts
 * (named export `proxy`, Node.js runtime).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept");

  // Explicit .md sibling URL: always markdown regardless of Accept, because
  // crawlers following <link rel="alternate" type="text/markdown"> may not
  // send an Accept header at all. (.md is stripped inside markdownInternalPath.)
  if (!pathname.endsWith(".md") && hasFileExtension(pathname)) {
    // Static assets (/resume.pdf, /mark.svg, /sitemap.xml, /robots.txt)
    // have no markdown variant — pass through untouched.
    const passthrough = NextResponse.next();
    appendVaryAccept(passthrough.headers);
    return passthrough;
  }

  if (pathname.endsWith(".md")) {
    const url = request.nextUrl.clone();
    url.pathname = markdownInternalPath(pathname);
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  const chosen = preferredType(accept);

  if (chosen === "text/markdown") {
    const url = request.nextUrl.clone();
    url.pathname = markdownInternalPath(pathname);
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  if (isNotAcceptable(accept)) {
    return new Response(
      "406 Not Acceptable\n\nAvailable representations: text/html, text/markdown.\n",
      {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          Vary: "Accept",
        },
      },
    );
  }

  const response = NextResponse.next();
  appendVaryAccept(response.headers);
  return response;
}

export const config = {
  // Run on everything except Next internals and API routes
  // (api/markdown is the rewrite target; api/contact is POST traffic).
  matcher: ["/((?!api/|_next/|_vercel/).*)"],
};
