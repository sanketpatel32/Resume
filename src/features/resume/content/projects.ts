import type { ProjectItem } from "@/features/resume/model/types";

export const projects: ProjectItem[] = [
  {
    name: "AI Hiring Platform - Hiring, from application to assessment",
    description:
      "Built the complete hiring application from scratch. Owned the candidate, employer, and admin experiences, backend APIs, database, and integrations. Implemented interview workflows, AI-assisted scoring, proctoring, reports, and real-time updates.",
    tech: ["React", "TypeScript", "Vite", "Redux Toolkit", "Bun", "Express", "MongoDB", "Socket.IO", "AWS SES"],
    links: {},
  },
  {
    name: "Voice AI Platform - Conversations connected to workflows",
    description:
      "Built the complete voice AI application from scratch. Owned the web interface, product API, and real-time voice services. Connected a visual workflow builder with knowledge retrieval, inbound and outbound calling, tenant access controls, and analytics.",
    tech: ["React", "TypeScript", "Vite", "Python", "FastAPI", "PostgreSQL", "LangGraph", "LiveKit", "Redis", "Pinecone"],
    links: {},
  },
  {
    name: "Blunt Code - Local Code Quality & Security",
    description:
      "Code-quality and security checks, kept local. A Go backend stores findings in SQLite, with a React interface, headless CLI, baseline comparisons, and SARIF exports. Bundles a dozen analyzers with no cloud account or telemetry.",
    tech: ["Go", "React", "TypeScript", "SQLite", "Tailwind CSS", "SonarQube", "Semgrep"],
    links: {
      github: "https://github.com/sanketpatel32/Blunt-code",
      live: "https://sanketpatel32.github.io/Blunt-code/",
    },
  },
  {
    name: "mdpeek - Native Document Workspace",
    description:
      "A native workspace for documents and code. Includes live preview, Mermaid and KaTeX, a PowerShell terminal, peer-to-peer editing, file associations, auto-updates, and session restore. Built with Tauri and the system WebView2, without bundling Chromium.",
    tech: ["Tauri 2", "Rust", "JavaScript", "WebView2", "Vitest", "NSIS"],
    links: {
      github: "https://github.com/sanketpatel32/Mdpeek",
    },
  },
  {
    name: "Miracode - Personal AI Code Reviewer",
    description:
      "A personal fork of the Miracode/Mira self-hosted AI code reviewer, tuned for solo use. Adds free OpenRouter models by default, manual repo URL onboarding without a GitHub App install, dashboard toasts and empty states, and a uv-based dev loop (`uv run dev`, `uv run doctor`).",
    tech: ["Python", "FastAPI", "uv", "OpenRouter", "GitHub API", "React"],
    links: {
      github: "https://github.com/sanketpatel32/Code-reviewer",
      live: "https://docs.miracode.ai",
    },
  },
  {
    name: "AuraFlow - Developer Utility Portal",
    description:
      "A self-hosted workspace for everyday development. Combines 16 tools, including API testing, SQL and NoSQL clients, a real-time Kanban board, cron triggers, JSON utilities, and a password generator. A single Bun service powers the React app, REST API, and WebSocket updates.",
    tech: ["TypeScript", "Bun", "React 19", "Vite", "WebSockets", "MongoDB", "Electron"],
    links: {
      github: "https://github.com/sanketpatel32/Portal",
      live: "https://portal.sanketpatel.online",
    },
  },
  {
    name: "Small Server - API Playground & Webhook Lab",
    description:
      "A single-binary REST playground for webhooks, agents, and frontend development. Stores and inspects JSON payloads in SQLite, exposes public and key-gated CRUD routes, ships an HTTP testing lab, embedded OpenAPI docs, and optional Cloudflare R2 uploads.",
    tech: ["Go", "SQLite", "OpenAPI", "Docker", "Fly.io", "Cloudflare R2"],
    links: {
      github: "https://github.com/sanketpatel32/Small-server",
      live: "https://small-server.fly.dev",
    },
  },
];