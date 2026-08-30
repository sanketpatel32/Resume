import { NextResponse } from "next/server";
import {
  getMcpManifest,
  getProfileToolResult,
  getProjectsToolResult,
  MCP_TOOLS,
} from "@/features/agent-readiness/content";

export const dynamic = "force-dynamic";

function jsonRpc(id: unknown, result: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

export async function GET() {
  return NextResponse.json(getMcpManifest(), {
    headers: { Allow: "GET, POST", "Cache-Control": "public, max-age=3600" },
  });
}

export async function POST(request: Request) {
  let body: { id?: unknown; method?: string; params?: { name?: string } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ jsonrpc: "2.0", error: { code: -32700, message: "Invalid JSON" } }, { status: 400 });
  }

  if (body.method === "initialize") {
    return jsonRpc(body.id, {
      protocolVersion: "2025-06-18",
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "sanketpatel-portfolio", version: "1.0.0" },
    });
  }

  if (body.method === "notifications/initialized") {
    return new Response(null, { status: 202, headers: { Allow: "GET, POST" } });
  }

  if (body.method === "tools/list") {
    return jsonRpc(body.id, { tools: MCP_TOOLS });
  }

  if (body.method === "tools/call") {
    const toolName = body.params?.name;
    const result = toolName === "get_profile"
      ? getProfileToolResult()
      : toolName === "list_projects"
        ? getProjectsToolResult()
        : null;

    if (!result) {
      return NextResponse.json({ jsonrpc: "2.0", id: body.id, error: { code: -32602, message: "Unknown tool" } }, { status: 400 });
    }

    return jsonRpc(body.id, {
      content: [{ type: "text", text: JSON.stringify(result) }],
      isError: false,
    });
  }

  return NextResponse.json({ jsonrpc: "2.0", id: body.id, error: { code: -32601, message: "Method not found" } }, { status: 404 });
}
