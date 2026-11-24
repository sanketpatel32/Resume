import Link from "next/link";
import { FiArrowUpRight, FiGithub, FiLock } from "react-icons/fi";
import { resumeContent } from "@/features/resume/content";
import { getStory } from "@/features/resume/content/stories";
import MdpeekDemo from "./MdpeekDemo";

/**
 * FIELD TRIALS — stage 1 art-direction prototype.
 * An instrument-manual page where the experiment on the page actually works:
 * landing header, the first featured project (mdpeek, with a working browser
 * demo of its source → preview loop), and the handoff to the next project.
 */

const CHAPTERS = [
  { no: "01", title: "mdpeek", href: "#work-mdpeek" },
  { no: "02", title: "System Design Quest", href: "#chapter-02" },
  { no: "R", title: "Register", href: "#register" },
];

const MDPEEK_TECH = ["Tauri 2", "Rust", "JavaScript", "WebView2", "Vitest", "NSIS"];

export default function FieldTrialsPage() {
  const { profile, projects } = resumeContent;
  const registerEntries = projects.flatMap((project, index) => {
    const story = getStory(project.name);
    return story ? [{ project, story, index }] : [];
  });

  return (
    <div className="fieldtrials">
      <div className="ft-wrap">
        <header className="ft-header">
          <Link className="ft-wordmark" href="#top">
            {profile.name}
            <span className="ft-wordmark-sub">field trials</span>
          </Link>
          <nav className="ft-nav" aria-label="Primary">
            <a href="#work-mdpeek">Work</a>
            <a href="https://github.com/sanketpatel32" target="_blank" rel="noopener noreferrer">
              Open source
            </a>
            <a href="/resume.pdf">Résumé</a>
          </nav>
        </header>

        <aside className="ft-index" aria-label="Chapter index">
          {CHAPTERS.map((chapter) => (
            <a key={chapter.no} href={chapter.href}>
              <span className="ft-index-no">{chapter.no}</span>
              <span className="ft-index-label">{chapter.title}</span>
            </a>
          ))}
        </aside>

        <main id="main-content" className="ft-main">
          <section className="ft-opening" id="top" aria-labelledby="ft-title">
            <h1 id="ft-title">
              Sanket Patel builds small tools for technical work.
            </h1>
            <p className="ft-lede">
              Desktop editors, local-first scanners and single-binary servers —
              software that opens fast, runs offline, and keeps your files on
              your machine.
            </p>
            <p className="ft-meta">
              Software developer · Jamnagar, India · Available for engineering roles
            </p>
          </section>

          <article className="case-study ft-feature" id="work-mdpeek">
            <header className="ft-feature-head">
              <p className="ft-chapter">Field trial 01</p>
              <h3>mdpeek</h3>
              <p className="ft-subtitle">A featherlight Markdown editor for Windows</p>
            </header>

            <figure className="ft-instrument">
              <MdpeekDemo />
              <figcaption className="sr-only">
                Working browser sketch of mdpeek&apos;s source to preview loop
              </figcaption>
            </figure>

            <div className="ft-feature-text">
              <section className="ft-block">
                <h4>The problem</h4>
                <p>
                  Opening a Markdown file should not mean launching an IDE or a
                  90&nbsp;MB Electron app.
                </p>
              </section>
              <section className="ft-block">
                <h4>What I built</h4>
                <ul>
                  <li>A native editor in Tauri 2 and Rust on the system WebView2</li>
                  <li>
                    Live preview with GFM, KaTeX and Mermaid; tabs, a file
                    explorer, reader mode and exports
                  </li>
                  <li>
                    Version 2 removed ~28,500 lines — the terminal, P2P editing
                    and every IDE-like tool
                  </li>
                </ul>
              </section>
              <section className="ft-block">
                <h4>Impact</h4>
                <ul>
                  <li>A 5.2 MB installer with no bundled Chromium</li>
                  <li>Opens documents instantly, without IDE chrome</li>
                </ul>
              </section>
              <section className="ft-block">
                <h4>Stack</h4>
                <p className="ft-stack">{MDPEEK_TECH.join(" · ")}</p>
                <p className="ft-links">
                  <a href="https://github.com/sanketpatel32/Mdpeek" target="_blank" rel="noopener noreferrer">
                    <FiGithub aria-hidden="true" /> Source
                  </a>
                  <a href="https://github.com/sanketpatel32/Mdpeek/releases/tag/v2.0.0" target="_blank" rel="noopener noreferrer">
                    Release 2.0.0 <FiArrowUpRight aria-hidden="true" />
                  </a>
                </p>
              </section>
            </div>
          </article>

          <section className="ft-next" id="chapter-02" aria-labelledby="ft-next-title">
            <p className="ft-chapter">Field trial 02 · next</p>
            <div className="ft-next-body">
              <h2 id="ft-next-title">System Design Quest</h2>
              <p>
                Game-style system design practice for SDE interviews — 120
                topics, India-market examples, deterministic grading, no
                backend. In development.
              </p>
              <p className="ft-links">
                <a href="https://github.com/sanketpatel32/system-design-quest" target="_blank" rel="noopener noreferrer">
                  <FiGithub aria-hidden="true" /> Repository
                </a>
              </p>
            </div>
          </section>

          <section className="ft-register" id="register" aria-labelledby="ft-register-title">
            <h2 id="ft-register-title">Project register</h2>
            <p className="ft-register-note">
              The full record. № 04 is set out above as the featured instrument;
              the private platforms stay unnamed and unlinked.
            </p>
            {registerEntries.map(({ project, story, index }) => {
              if (story.slug === "mdpeek") return null;
              const [title, subtitle] = project.name.split(" - ");
              const isPrivate = !project.links.github && !project.links.live;
              const no = String(index + 1).padStart(2, "0");
              return (
                <article className="case-study ft-reg" id={`work-${story.slug}`} key={story.slug}>
                  <header className="ft-reg-head">
                    <span className="ft-reg-no" aria-hidden="true">{no}</span>
                    <div className="ft-reg-title">
                      <h3>{title}</h3>
                      {subtitle && <p className="ft-reg-sub">{subtitle}</p>}
                      <p className="ft-reg-flags">
                        {isPrivate && (
                          <span><FiLock aria-hidden="true" /> Private build</span>
                        )}
                        {story.note && <span>{story.note}</span>}
                      </p>
                    </div>
                    <p className="ft-reg-links">
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">Source</a>
                      )}
                      {project.links.live && (
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                          {story.slug === "miracode" ? "Upstream docs" : "Live"} <FiArrowUpRight aria-hidden="true" />
                        </a>
                      )}
                    </p>
                  </header>
                  <div className="ft-reg-body">
                    <section>
                      <h4>The problem</h4>
                      <p>{story.problem}</p>
                    </section>
                    <section>
                      <h4>What I built</h4>
                      <ul>
                        {story.built.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </section>
                    <section>
                      <h4>Impact</h4>
                      <ul>
                        {story.impact.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </section>
                    <section>
                      <h4>Stack</h4>
                      <p className="ft-stack">{project.tech.join(" · ")}</p>
                    </section>
                  </div>
                </article>
              );
            })}
          </section>
        </main>

        <footer className="ft-footer">
          <p className="ft-footer-id">
            {profile.name} — field trials, stage 01 · © {new Date().getFullYear()}
          </p>
          <nav className="ft-footer-nav" aria-label="Site">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/developers">Developers</Link>
            <Link href="/privacy">Privacy</Link>
            <a href="/llms.txt">llms.txt</a>
            <a href="/resume.pdf">Résumé (PDF)</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
