import { buildLlmsTxt } from "@/features/resume/markdown";

/** /llms.txt per https://llmstxt.org v2 — the agent-facing site index. */
export function GET() {
  return new Response(buildLlmsTxt(), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
