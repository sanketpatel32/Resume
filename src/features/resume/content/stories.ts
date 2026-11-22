import type { ProjectStory } from "@/features/resume/model/types";

export const stories: ProjectStory[] = [
  {
    project: "AI Hiring Platform",
    slug: "ai-hiring-platform",
    layers: ["interfaces", "systems"],
    problem:
      "Hiring runs across applications, interviews, scoring and reports. When those live in separate tools, candidates wait and employers lose the thread.",
    built: [
      "Candidate, employer and admin experiences in one React and TypeScript codebase",
      "Backend APIs, the MongoDB data model and third-party integrations",
      "Interview workflows with AI-assisted scoring, proctoring and generated reports",
      "Real-time status updates over Socket.IO and transactional email through AWS SES",
    ],
    impact: [
      "Built from scratch and owned end to end, from the first screen to the database",
      "One platform carries a candidate from application to assessment report",
    ],
    visual: {
      kind: "scene",
      scene: "pipeline",
      caption: "Illustration: candidates flowing from application to report. Private product, so no screenshots.",
    },
  },
  {
    project: "Voice AI Platform",
    slug: "voice-ai-platform",
    layers: ["interfaces", "systems"],
    problem:
      "A voice agent is only useful when it can reach real knowledge and trigger real workflows, for every tenant, on every call.",
    built: [
      "The web interface, including a visual workflow builder",
      "The product API in Python and FastAPI on PostgreSQL",
      "Real-time voice services on LiveKit for inbound and outbound calling",
      "Knowledge retrieval with LangGraph and Pinecone, tenant access controls and analytics",
    ],
    impact: [
      "Built from scratch and owned end to end, across interface, API and voice services",
      "Conversations connect directly to the workflows they should start",
    ],
    visual: {
      kind: "scene",
      scene: "voice",
      caption: "Illustration: a live voice signal reacting to your cursor. Private product, so no screenshots.",
    },
  },
  {
    project: "Blunt Code",
    slug: "blunt-code",
    layers: ["tools", "systems"],
    problem:
      "Most code-quality and security scanners want a cloud account, an upload of your source and your telemetry.",
    built: [
      "A Go backend that runs a dozen analyzers and stores findings in local SQLite",
      "A React interface and a headless CLI that share the same engine",
      "Baseline comparisons, source-line suppressions and SARIF exports for CI",
    ],
    impact: [
      "Loopback-only server: findings and reports never leave the machine",
      "Ruff, Biome, Semgrep, SonarQube, Gitleaks and more behind one report",
    ],
    visual: {
      kind: "image",
      src: "/work/blunt-code.webp",
      alt: "The Blunt Code website, showing a terminal scan with graded findings",
      caption: "Live site, captured from sanketpatel32.github.io/Blunt-code",
    },
  },
  {
    project: "mdpeek",
    slug: "mdpeek",
    layers: ["tools", "interfaces"],
    problem:
      "Opening a Markdown file should not mean launching an IDE or a 90 MB Electron app.",
    built: [
      "A native workspace in Tauri 2 and Rust on the system WebView2",
      "Live preview with Mermaid, KaTeX, a PowerShell terminal and peer-to-peer editing",
      "File associations, auto-updates and session restore",
    ],
    impact: [
      "Roughly a 7 MB installer, with no bundled Chromium",
      "Opens documents instantly, without IDE chrome",
    ],
    visual: {
      kind: "image",
      src: "/work/mdpeek.webp",
      alt: "mdpeek editing a Markdown document in its dark theme",
      caption: "Real application screenshot from the mdpeek repository",
    },
  },
  {
    project: "AuraFlow",
    slug: "auraflow",
    layers: ["tools", "interfaces", "systems"],
    problem:
      "Everyday development chores are scattered across a dozen tabs, clients and SaaS tools.",
    built: [
      "Sixteen tools behind one PIN-locked grid: API testing, SQL and NoSQL clients, Kanban, cron triggers, JSON tools and more",
      "One Bun process that serves the React app, the REST API and WebSocket updates",
      "Real-time Kanban sync across tabs and an Electron desktop wrapper",
    ],
    impact: [
      "One process and one port in production",
      "Every tile is code-split, so the first load stays small",
    ],
    visual: {
      kind: "scene",
      scene: "tiles",
      caption: "Illustration: the sixteen-tile grid, built from the README. The live portal is PIN-locked.",
    },
  },
  {
    project: "Small Server",
    slug: "small-server",
    layers: ["systems", "tools"],
    problem:
      "Testing webhooks, agents and frontends needs a backend that exists in seconds, not after a database setup.",
    built: [
      "A single static Go binary with SQLite storage and no CGO",
      "Public and key-gated CRUD routes for any JSON payload",
      "An HTTP lab for echo, status simulation, delays and redirects, plus embedded OpenAPI docs",
      "Optional Cloudflare R2 uploads, with Docker and Fly.io configuration",
    ],
    impact: [
      "No runtime or database server to install",
      "Ships with Postman and Bruno collections that run as-is",
    ],
    visual: {
      kind: "image",
      src: "/work/small-server.webp",
      alt: "The Small Server testing workspace, with a form for saving data",
      caption: "Live app, captured from small-server.fly.dev",
    },
  },
  {
    project: "Miracode",
    slug: "miracode",
    layers: ["systems"],
    problem:
      "Upstream Mira expects paid models and a GitHub App install, which is heavy for one developer reviewing their own repositories.",
    built: [
      "Free OpenRouter models registered by default",
      "Manual repository onboarding by URL, without a GitHub App",
      "Dashboard toasts, empty states and a welcome banner",
      "A uv-based dev loop: uv run dev, uv run doctor",
    ],
    impact: [
      "A self-hosted reviewer that runs without a paid API key",
      "The review engine is upstream Mira; the changes above are mine",
    ],
    note: "Personal fork of Mira",
    visual: {
      kind: "image",
      src: "/work/miracode.webp",
      alt: "The Mira dashboard from the Miracode fork, showing review metrics",
      caption: "Dashboard screenshot from the fork's README",
    },
  },
];

export function getStory(projectName: string): ProjectStory | undefined {
  return stories.find((story) => projectName.startsWith(story.project));
}
