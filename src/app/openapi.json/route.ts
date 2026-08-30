import { NextResponse } from "next/server";
import { getOpenApiDocument } from "@/features/agent-readiness/content";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getOpenApiDocument(), {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
