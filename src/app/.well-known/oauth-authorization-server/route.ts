import { NextResponse } from "next/server";
import { AGENT_API_VERSION, AGENT_SCOPES } from "@/features/agent-readiness/content";
import { SITE_URL } from "@/features/resume/content/site";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    issuer: SITE_URL,
    authorization_endpoint: `${SITE_URL}/oauth/authorize`,
    token_endpoint: `${SITE_URL}/oauth/token`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code"],
    token_endpoint_auth_methods_supported: ["none"],
    scopes_supported: Object.keys(AGENT_SCOPES),
    service_documentation: `${SITE_URL}/developers`,
    // The endpoint routes intentionally return 501. No tokens or credentials are issued.
    "x-implementation-status": "metadata-only; authorization is not currently enabled",
    "x-api-version": AGENT_API_VERSION,
  });
}
