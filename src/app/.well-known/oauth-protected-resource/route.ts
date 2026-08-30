import { NextResponse } from "next/server";
import { AGENT_SCOPES } from "@/features/agent-readiness/content";
import { SITE_URL } from "@/features/resume/content/site";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    resource: `${SITE_URL}/api`,
    authorization_servers: [SITE_URL],
    scopes_supported: Object.keys(AGENT_SCOPES),
    resource_documentation: `${SITE_URL}/developers`,
    bearer_methods_supported: [],
    "x-implementation-status": "public-read-only; bearer authorization is not currently enabled",
  });
}
