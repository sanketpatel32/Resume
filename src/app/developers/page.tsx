import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/features/resume/ui/Navbar";
import Footer from "@/features/resume/ui/Footer";
import SpotlightBackground from "@/shared/ui/SpotlightBackground";
import { resumeContent } from "@/features/resume/content";
import { AGENT_SCOPES } from "@/features/agent-readiness/content";
import { SITE_URL } from "@/features/resume/content/site";

export const metadata: Metadata = {
  title: "Developer portal",
  description: "Machine-readable APIs and read-only MCP tools for Sanket Patel's portfolio.",
  alternates: { canonical: `${SITE_URL}/developers` },
};

const endpoints = [
  { method: "GET", path: "/openapi.json", note: "OpenAPI 3.1 contract" },
  { method: "GET", path: "/.well-known/mcp.json", note: "MCP manifest" },
  { method: "POST", path: "/mcp", note: "Streamable HTTP JSON-RPC" },
  { method: "GET", path: "/api/markdown", note: "Portfolio content; send Accept: text/markdown" },
];

export default function DevelopersPage() {
  const { profile } = resumeContent;

  return (
    <div className="hallmark-shell developer-portal">
      <SpotlightBackground />
      <Navbar />
      <main className="resume-container developer-main" id="main-content">
        <nav className="developer-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span>Developers</span>
        </nav>
        <header className="developer-hero">
          <p className="developer-kicker">Public interface · v1.0</p>
          <h1>Build with the work.</h1>
          <p>
            A small, honest interface for agents and hiring workflows. Public profile data is read-only; contact submissions are sent to {profile.name} for human review.
          </p>
          <div className="developer-hero-links">
            <a className="button button-primary" href="/openapi.json">OpenAPI JSON</a>
            <a className="text-link" href="/.well-known/mcp.json">MCP manifest <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <section className="developer-section" aria-labelledby="quickstart-heading">
          <div className="developer-section-heading">
            <p className="developer-kicker">01 / Quickstart</p>
            <h2 id="quickstart-heading">Start with a GET.</h2>
          </div>
          <div className="developer-grid developer-grid-two">
            <article className="developer-card">
              <h3>Read the profile</h3>
              <p>Fetch structured Markdown without scraping the visual page.</p>
              <pre><code>{`curl -H "Accept: text/markdown" ${SITE_URL}/api/markdown`}</code></pre>
            </article>
            <article className="developer-card">
              <h3>Call MCP tools</h3>
              <p>Use the Streamable HTTP endpoint after reading its manifest.</p>
              <pre><code>{`curl ${SITE_URL}/mcp
# POST JSON-RPC: tools/list`}</code></pre>
            </article>
          </div>
        </section>

        <section className="developer-section" aria-labelledby="endpoints-heading">
          <div className="developer-section-heading">
            <p className="developer-kicker">02 / Surface map</p>
            <h2 id="endpoints-heading">Small surface. Clear contracts.</h2>
          </div>
          <div className="developer-endpoints">
            {endpoints.map((endpoint) => (
              <div className="developer-endpoint" key={`${endpoint.method}-${endpoint.path}`}>
                <span className={`developer-method developer-method-${endpoint.method.toLowerCase()}`}>{endpoint.method}</span>
                <code>{endpoint.path}</code>
                <span>{endpoint.note}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="developer-section" aria-labelledby="auth-heading">
          <div className="developer-section-heading">
            <p className="developer-kicker">03 / Access</p>
            <h2 id="auth-heading">No key required today.</h2>
          </div>
          <div className="developer-access-copy">
            <p>
              This portfolio is public and read-only by default. There is no API-key issuance or active OAuth token service, so there is nothing to copy into a secret store and no sandbox credential to rotate.
            </p>
            <p>
              OAuth metadata and named scopes are published for clients that need a machine-readable permission vocabulary. The advertised authorization and token routes return <code>501</code> until a real identity service exists.
            </p>
          </div>
          <div className="developer-scopes" aria-label="Published scopes">
            {Object.entries(AGENT_SCOPES).map(([scope, description]) => (
              <div className="developer-scope" key={scope}>
                <code>{scope}</code><span>{description}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="developer-section developer-last-section" aria-labelledby="sandbox-heading">
          <div className="developer-section-heading">
            <p className="developer-kicker">04 / Safe sandbox</p>
            <h2 id="sandbox-heading">Inspect before you act.</h2>
          </div>
          <p className="developer-access-copy">
            Try the GET endpoints above against production. They only expose published portfolio material. The contact endpoint is a real human communication channel, not a test sandbox; use <Link href="/contact">the contact page</Link> for a deliberate inquiry.
          </p>
        </section>
      </main>
      <Footer profile={profile} />
    </div>
  );
}
