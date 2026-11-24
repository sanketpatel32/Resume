import Link from "next/link";
import { FiArrowUpRight, FiGithub, FiLock } from "react-icons/fi";
import { resumeContent } from "@/features/resume/content";
import { getStory } from "@/features/resume/content/stories";
import BluntCodeFigure from "./BluntCodeFigure";
import SdqCard from "./SdqCard";
import OssExplorer from "./OssExplorer";

/**
 * FIELD TRIALS — stage 3: two owned exhibits, the index, and the
 * open-source contribution plot. Opening: editorial text left, the
 * Blunt Code specimen right — one report read two ways. Below: the
 * real decision behind it, then a System Design Quest practice card
 * (lesson 17) on the opposite composition, a small index of the
 * remaining public work, and a snapshot-based explorer of merged PRs
 * to other people's codebases. Private platforms stay unnamed and
 * unlinked throughout.
 */

const PUBLIC_INDEX_SLUGS = new Set(["miracode", "auraflow", "small-server"]);

export default function FieldTrialsPage() {
  const { profile, projects } = resumeContent;
  const indexEntries = projects.flatMap((project, index) => {
    const story = getStory(project.name);
    return story && PUBLIC_INDEX_SLUGS.has(story.slug)
      ? [{ project, story, index }]
      : [];
  });

  return (
    <div className="fieldtrials">
      <div className="ft-wrap">
        <header className="ft-header">
          <Link className="ft-wordmark" href="#top">
            {profile.name}
          </Link>
          <nav className="ft-nav" aria-label="Primary">
            <a href="#work">Work</a>
            <a href="#open-source">Open source</a>
            <a href="/resume.pdf">Résumé</a>
          </nav>
        </header>

        <main id="main-content" className="ft-main" tabIndex={-1}>
          <section className="ft-opening" id="top" aria-labelledby="ft-title">
            <div className="ft-opening-text">
              <p className="ft-byline">Software developer</p>
              <h1 id="ft-title">Developer tools you can work with.</h1>
              <p className="ft-lede">
                I build local developer tools and systems you can try. Start
                with Blunt Code.
              </p>
              <a className="ft-browse" href="#register">
                Browse projects&nbsp;&darr;
              </a>
            </div>

            <figure className="ft-specimen" id="work">
              <div className="ft-specimen-head">
                <h2>Blunt Code</h2>
                <p>A local code review tool. One report, two readers.</p>
              </div>
              <BluntCodeFigure />
              <figcaption className="ft-specimen-caption">
                Synthetic report — no scan is run.{" "}
                <a
                  href="https://github.com/sanketpatel32/Blunt-code"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </figcaption>
            </figure>
          </section>

          <article className="ft-build" aria-labelledby="ft-build-title">
            <h3 id="ft-build-title">Why SQLite?</h3>
            <p className="ft-build-para">
              I kept the data in SQLite and gave the CLI and web UI the same
              local history. Reports can leave the machine when you export
              one.
            </p>
          </article>

          <section className="ft-quest" id="chapter-02" aria-labelledby="ft-quest-title">
            <div className="ft-quest-intro">
              <p className="ft-quest-kicker">Lesson 17</p>
              <h2 id="ft-quest-title">System Design Quest</h2>
              <p className="ft-quest-sub">
                A nightly scan meets the cache — one practice card from the
                game-style system design course, running the real lesson
                content.
              </p>
              <p className="ft-links">
                <a
                  href="https://github.com/sanketpatel32/system-design-quest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub aria-hidden="true" /> Repository
                </a>
              </p>
            </div>

            <figure className="ft-quest-fig">
              <ul className="ft-flow" aria-label="What the lesson shows">
                <li className="ft-flow-step">
                  <span className="ft-flow-label">Popular items</span>
                  <span className="ft-flow-glyph ft-flow-items" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i className="cold" />
                    <i className="cold" />
                    <i className="cold" />
                  </span>
                </li>
                <li className="ft-flow-step">
                  <span className="ft-flow-label">One-off catalog scan</span>
                  <span className="ft-flow-glyph ft-flow-scan" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </li>
                <li className="ft-flow-step">
                  <span className="ft-flow-label">Stays cached</span>
                  <span className="ft-flow-glyph ft-flow-kept" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </li>
              </ul>
              <SdqCard />
              <figcaption className="ft-specimen-caption">
                Predict the answer, read the rationale, try again — nothing is
                scored or stored.
              </figcaption>
            </figure>
          </section>

          <section className="ft-register" id="register" aria-labelledby="ft-register-title">
            <h2 id="ft-register-title">Index</h2>
            <p className="ft-register-note">
              The rest of the verified public work, and the private record
              kept unnamed.
            </p>
            {indexEntries.map(({ project, story }) => {
              const [title, subtitle] = project.name.split(" - ");
              return (
                <article className="ft-idx" id={`work-${story.slug}`} key={story.slug}>
                  <header className="ft-idx-head">
                    <div className="ft-idx-title">
                      <h3>{title}</h3>
                      {subtitle && <p className="ft-idx-sub">{subtitle}</p>}
                      {story.note && <p className="ft-idx-flag">{story.note}</p>}
                      {story.slug === "small-server" && (
                        <p className="ft-idx-evidence">
                          A single static binary — /lab/cache answers
                          200&nbsp;&rarr;&nbsp;304 on a matching ETag.
                        </p>
                      )}
                    </div>
                    <p className="ft-idx-links">
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                          Source
                        </a>
                      )}
                      {project.links.live && (
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                          {story.slug === "miracode" ? "Upstream docs" : "Live"}{" "}
                          <FiArrowUpRight aria-hidden="true" />
                        </a>
                      )}
                    </p>
                  </header>
                </article>
              );
            })}
            <article className="ft-idx is-private">
              <header className="ft-idx-head">
                <div className="ft-idx-title">
                  <h3>Private platforms</h3>
                  <p className="ft-idx-flag">
                    <FiLock aria-hidden="true" /> Two production builds owned
                    end to end
                  </p>
                </div>
                <p className="ft-idx-links">Unnamed, unlinked</p>
              </header>
            </article>
          </section>

          <OssExplorer />
        </main>

        <footer className="ft-footer">
          <p className="ft-footer-id">
            {profile.name} — field trials, stage 03 · © {new Date().getFullYear()}
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
