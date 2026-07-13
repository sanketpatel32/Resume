import type { ProjectItem } from "@/features/resume/model/types";

export const projects: ProjectItem[] = [
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
    name: "mdpeek - Markdown Viewer & Editor",
    description:
      "Lightweight Windows desktop app for viewing and editing Markdown with live preview, multi-file tabs, syntax highlighting, Mermaid and KaTeX support, file associations, auto-updates, and session restore. Built as a ~5.5 MB installer without bundling Chromium.",
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
  {
    name: "Group Chat Web App",
    description:
      "Real-time web-based chat application with secure user authentication, scalable one-to-one and group messaging, SQL-based relational data modeling, and cron jobs for automated message cleanup to optimize database performance.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "Socket.io", "SQL"],
    links: {
      github: "https://github.com/sanketpatel32/Group-Chat-App",
    },
  },
];
