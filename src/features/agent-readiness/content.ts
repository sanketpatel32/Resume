import { contact } from "@/features/resume/content/contact";
import { profile } from "@/features/resume/content/profile";
import { projects } from "@/features/resume/content/projects";
import { SITE_URL } from "@/features/resume/content/site";

export const AGENT_API_VERSION = "1.0.0";

export const AGENT_SCOPES = {
  "profile:read": "Read the public professional profile and experience.",
  "projects:read": "Read public project summaries and technology details.",
  "contact:submit": "Submit a contact inquiry for human review.",
} as const;

export const MCP_TOOLS = [
  {
    name: "get_profile",
    description: "Read Sanket Patel's public professional profile.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_projects",
    description: "List the public projects shown in Sanket Patel's portfolio.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
] as const;

export function getMcpManifest() {
  return {
    name: "sanketpatel-portfolio",
    title: "Sanket Patel Portfolio",
    description: "Read-only MCP access to Sanket Patel's public portfolio.",
    version: AGENT_API_VERSION,
    transport: "streamable-http",
    url: `${SITE_URL}/mcp`,
    endpoint: `${SITE_URL}/mcp`,
    authentication: { required: false, schemes: [] },
    tools: MCP_TOOLS,
    documentation: `${SITE_URL}/developers`,
  };
}

export function getOpenApiDocument() {
  return {
    openapi: "3.1.0",
    info: {
      title: "Sanket Patel Portfolio API",
      version: AGENT_API_VERSION,
      description:
        "Public, human-reviewed portfolio data and contact surface. GET resources are public. OAuth scope names are published for least-privilege clients, but this site does not currently issue access tokens.",
      contact: { name: profile.name, email: contact.email, url: SITE_URL },
    },
    servers: [{ url: SITE_URL, description: "Production site" }],
    externalDocs: { description: "Developer portal", url: `${SITE_URL}/developers` },
    paths: {
      "/api/markdown": {
        get: {
          operationId: "getPortfolioMarkdown",
          summary: "Read the portfolio as Markdown",
          description: "Request with Accept: text/markdown for the complete portfolio.",
          responses: {
            "200": {
              description: "Markdown portfolio",
              content: { "text/markdown": { schema: { type: "string" } } },
            },
          },
          security: [],
        },
      },
      "/api/contact": {
        post: {
          operationId: "submitContactInquiry",
          summary: "Submit a contact inquiry",
          description: "Sends a message for human review. Do not use for unsolicited bulk messages.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "subject", "message"],
                  properties: {
                    name: { type: "string", minLength: 2 },
                    email: { type: "string", format: "email" },
                    subject: { type: "string", minLength: 2 },
                    message: { type: "string", minLength: 10 },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Inquiry accepted for delivery" },
            "400": { description: "Invalid request" },
            "429": { description: "Rate limited" },
            "500": { description: "Delivery failed" },
          },
          // This route is currently public and does not enforce OAuth. The scope is
          // published in components for clients planning least-privilege access.
          security: [],
        },
      },
      "/mcp": {
        post: {
          operationId: "mcpStreamableHttp",
          summary: "MCP Streamable HTTP endpoint",
          description: "JSON-RPC 2.0 endpoint exposing read-only portfolio tools.",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object" } } },
          },
          responses: { "200": { description: "JSON-RPC response" } },
          security: [],
        },
      },
    },
    components: {
      securitySchemes: {
        oauth2: {
          type: "oauth2",
          description:
            "Reserved OAuth 2.0 scope vocabulary. Authorization and token endpoints are published as non-functional 501 responses; portfolio reads remain public.",
          flows: {
            authorizationCode: {
              authorizationUrl: `${SITE_URL}/oauth/authorize`,
              tokenUrl: `${SITE_URL}/oauth/token`,
              scopes: AGENT_SCOPES,
            },
          },
        },
      },
    },
  };
}

export function getProfileToolResult() {
  return {
    name: profile.name,
    title: profile.title,
    summary: profile.summary,
    highlights: profile.highlights,
    contact: { email: contact.email, location: contact.location, github: contact.github },
  };
}

export function getProjectsToolResult() {
  return projects.map((project) => ({
    name: project.name,
    description: project.description,
    tech: project.tech,
    links: project.links,
  }));
}
