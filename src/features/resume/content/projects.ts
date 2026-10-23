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
      "Code-quality and security checks, kept local. A Go backend stores findings in SQLite, with a React interface, headless CLI, baseline comparisons, and SARIF exports. No cloud account or telemetry.",
    tech: ["Go", "React", "TypeScript", "SQLite", "Tailwind CSS", "SonarQube", "Semgrep"],
    links: {
      github: "https://github.com/sanketpatel32/Blunt-code",
      live: "https://sanketpatel32.github.io/Blunt-code/",
    },
  },
  {
    name: "ScanForge - AI-Powered API Testing & Security Scanner",
    description:
      "A security testing workspace for REST APIs. Automates OWASP API Top 10 checks with configurable scan modes and evidence-backed findings. Built as a TypeScript monorepo with Bun runners, queue monitoring, and isolated workspaces.",
    tech: [
      "TypeScript",
      "Bun",
      "Turborepo",
      "Next.js 16",
      "React 19",
      "Express 5",
      "oRPC",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Drizzle ORM",
      "Better Auth",
      "Docker",
    ],
    links: {
      github: "https://github.com/sanketpatel32/ScanForge",
    },
  },
  {
    name: "mdpeek - Native Document Workspace",
    description:
      "A native workspace for documents and code. Includes live preview, Mermaid and KaTeX, a PowerShell terminal, peer-to-peer editing, file associations, auto-updates, and session restore. Built with Tauri and the system WebView2, without bundling Chromium.",
    tech: [
      "Tauri 2",
      "Rust",
      "JavaScript",
      "WebView2",
      "Vitest",
      "NSIS",
    ],
    links: {
      github: "https://github.com/sanketpatel32/Mdpeek",
    },
  },
  {
    name: "AuraFlow - Developer Utility Portal",
    description:
      "A self-hosted workspace for everyday development. Combines 16 tools, including API testing, SQL and NoSQL clients, a real-time Kanban board, cron triggers, JSON utilities, and a password generator. A single Bun service powers the React app, REST API, and WebSocket updates.",
    tech: [
      "TypeScript",
      "Bun",
      "React 19",
      "Vite",
      "WebSockets",
      "MongoDB",
      "Electron",
    ],
    links: {
      github: "https://github.com/sanketpatel32/Portal",
      live: "https://portal.sanketpatel.online",
    },
  },
  {
    name: "Salon Management Web App",
    description:
      "Full-stack salon appointment platform with secure JWT-based authentication, service and staff management, real-time booking, and payment integration (CashFree). Features automated email/SMS reminders, rescheduling, customer reviews, and admin dashboard.",
    tech: ["Node.js", "Express.js", "SQL", "React.js", "Socket.io", "Cron"],
    links: {
      github: "https://github.com/sanketpatel32/fresha-salon-app",
    },
  },
];
