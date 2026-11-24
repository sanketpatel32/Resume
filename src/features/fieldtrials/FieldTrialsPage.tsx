import Link from "next/link";
import { FiArrowUpRight, FiGithub, FiLock } from "react-icons/fi";
import { resumeContent } from "@/features/resume/content";
import { getStory } from "@/features/resume/content/stories";
import MdpeekDemo from "./MdpeekDemo";

/**
 * FIELD TRIALS — stage 1 art-direction prototype, revision A.
 * The opening is the experiment: short editorial text left, a working
 * specimen of mdpeek's source → preview loop right. Below, a compact
 * note on the real v2 decision and a question-led handoff to the next
 * project. The register keeps every other project reachable.
 */

export default function FieldTrialsPage() {
  const { profile, projects } = resumeContent;
  const registerEntries = projects.flatMap((project, index) => {
    const story = getStory(project.name);
    return story ? [{ project, story, index }] : [];
  });

  return (
    <div className="fieldtrials">
      <a className="ft-skip" href="#main-content">
        Skip to content
      </a>
      <div className="ft-wrap">
        <header className="ft-header">
          <Link className="ft-wordmark" href="#top">
            {profile.name}
          </Link>
          <nav className="ft-nav" aria-label="Primary">
            <a href="#work-mdpeek">Work</a>
            <a href="https://github.com/sanketpatel32" target="_blank" rel="noopener noreferrer">
              Open source
            </a>
            <a href="/resume.pdf">Résumé</a>
          </nav>
        </header>

        <main id="main-content" className="ft-main">
          <section className="ft-opening" id="top" aria-labelledby="ft-title">
            <div className="ft-opening-text">
              <p className="ft-byline">
                <strong>{profile.name}</strong>
                <span>Software developer</span>
              </p>
              <h1 id="ft-title">I build small tools for technical work.</h1>
              <p className="ft-lede">
                Desktop tools, small servers, and software that keeps files on
                your machine.
              </p>
              <a className="ft-browse" href="#register">
                Browse projects&nbsp;&darr;
              </a>
            </div>

            <figure className="ft-specimen" id="work-mdpeek">
              <figcaption className="ft-specimen-head">
                <h2>mdpeek</h2>
                <p>
                  A Markdown editor for Windows. Try a small browser version.
                </p>
              </figcaption>
              <MdpeekDemo />
              <figcaption className="ft-specimen-caption">
                Editable source, deterministic render — a small Markdown subset;
                the desktop app does more.{" "}
                <a href="https://github.com/sanketpatel32/Mdpeek" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                {" · "}
                <a href="https://github.com/sanketpatel32/Mdpeek/releases/tag/v2.0.0" target="_blank" rel="noopener noreferrer">
                  Release 2.0.0
                </a>
              </figcaption>
            </figure>
          </section>

          <article className="case-study ft-build" aria-labelledby="ft-build-title">
            <h3 id="ft-build-title">mdpeek</h3>
            <div className="sr-only" aria-hidden="false">
              <h4>The problem</h4>
              <h4>What I built</h4>
              <h4>Impact</h4>
              <h4>Stack</h4>
            </div>
            <p className="ft-build-para">
              Version 2 dropped the IDE-shaped extras the editor had collected —
              a terminal, peer editing, a workspace hub — to focus on one job:
              opening, editing and previewing Markdown files. The Windows
              installer is about 5.2&nbsp;MB, as listed on the 2.0.0 release.
            </p>
          </article>

          <section className="ft-next" id="chapter-02" aria-labelledby="ft-next-title">
            <p className="ft-next-q">
              What changes when one server isn&rsquo;t enough?
            </p>
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
              The full record. mdpeek is set out above as the working specimen;
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
