import type { ProjectItem } from "@/features/resume/model/types";

export const projects: ProjectItem[] = [
  {
    name: "LayersRank - Built from scratch",
    description:
      "Built the complete AI hiring and assessment platform from scratch: admin, employer, and candidate portals; job and interview workflows; AI-assisted scoring; proctoring; reports; and real-time updates. Owned the frontend, backend, database, and integrations end to end.",
    tech: ["React", "TypeScript", "Vite", "Redux Toolkit", "Bun", "Express", "MongoDB", "Socket.IO", "AWS SES"],
    links: {},
  },
  {
    name: "Claire - Built from scratch",
    description:
      "Built the complete voice AI and workflow automation platform from scratch, owning the web interface, product API, and real-time voice services. Implemented the visual workflow builder, knowledge retrieval, inbound and outbound calling, tenant access controls, and analytics.",
    tech: ["React", "TypeScript", "Vite", "Python", "FastAPI", "PostgreSQL", "LangGraph", "LiveKit", "Redis", "Pinecone"],
    links: {},
  },
  {
    name: "Blunt Code - Local Code Quality & Security",
    description:
      "A local-first Windows app that brings code-quality and security analyzers into one workflow. A Go backend stores findings in SQLite, with a React interface, headless CLI, baseline comparisons, and SARIF exports. No cloud account or telemetry.",
    tech: ["Go", "React", "TypeScript", "SQLite", "Tailwind CSS", "SonarQube", "Semgrep"],
    links: {
      github: "https://github.com/sanketpatel32/Blunt-code",
      live: "https://sanketpatel32.github.io/Blunt-code/",
    },
  },
  {
    name: "ScanForge - AI-Powered API Testing & Security Scanner",
    description:
      "Production-ready DAST platform for REST APIs that automates OWASP API Top 10 security testing with safe/balanced/aggressive scan modes, evidence-backed findings, and multi-tenant workspace isolation. Built as a TypeScript monorepo with local-first Bun runners, real-time queue monitoring, and enterprise-grade security controls.",
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
      "A native Windows workspace for Markdown, PDFs, code, and notes. Includes live preview, Mermaid and KaTeX, a PowerShell terminal, peer-to-peer editing, file associations, auto-updates, and session restore. Built with Tauri and the system WebView2, without bundling Chromium.",
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
      "Self-hosted developer portal combining 16 tools, including API testing, SQL and NoSQL clients, a real-time Kanban board, cron triggers, JSON utilities, and a password generator. A single Bun service powers the React app, REST API, and WebSocket updates.",
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
