import { getMarkdownForSlug } from "@/features/resume/content/markdown";

export const dynamic = "force-dynamic";

/**
 * Markdown representations served behind content negotiation.
 *
 * - GET /api/markdown          -> homepage full resume as markdown (rewritten target of `/`)
 * - GET /api/markdown/index    -> same, rewrite target of `/index.md`
 * - GET /api/markdown/projects -> projects markdown (rewrite target of `/projects.md`)
 * - GET /api/markdown/career   -> career markdown (rewrite target of `/career.md`)
 * - GET /api/markdown/skills   -> skills markdown (rewrite target of `/skills.md`)
 * - anything unknown           -> real HTTP 404 whose body is a markdown
 *   recovery map pointing agents at /index.md, /llms.txt, /sitemap.xml.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params;
  const result = getMarkdownForSlug(slug);

  return new Response(result.content, {
    status: result.status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control":
        result.status === 200
          ? "public, s-maxage=3600, stale-while-revalidate=86400"
          : "public, max-age=0, must-revalidate",
      Link: '</llms.txt>; rel="describedby"',
    },
  });
}
