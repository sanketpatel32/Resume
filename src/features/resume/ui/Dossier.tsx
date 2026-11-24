import Image from "next/image";
import {
  ArrowDownRight,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  GitCommitHorizontal,
  GitMerge,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { resumeContent } from "@/features/resume/content";
import {
  upstreamContributions,
  upstreamPullUrl,
  type UpstreamContribution,
} from "@/features/resume/content/contributions";
import { upstreamCases, type UpstreamCaseStudy } from "@/features/resume/content/upstreamCases";
import { stories } from "@/features/resume/content/stories";
import type { ProjectItem } from "@/features/resume/model/types";

const { profile, career, education, certifications, skills, contact, projects } = resumeContent;

const featuredProjects = ["Blunt Code", "mdpeek", "Small Server"];
const previews: Record<string, { src: string; tone: string; detail: string }> = {
  "Blunt Code": { src: "/work/blunt-code.webp", tone: "lilac", detail: "Tool 01 / Quality & security" },
  mdpeek: { src: "/work/mdpeek.webp", tone: "mint", detail: "Tool 02 / Documents & code" },
  "Small Server": { src: "/work/small-server.webp", tone: "sand", detail: "Tool 03 / Webhooks & APIs" },
};
const projectName = (project: ProjectItem) => project.name.split(" - ")[0];
const projectTitle = (project: ProjectItem) => project.name.split(" - ")[1] ?? "";
const allFeatured = featuredProjects.flatMap((name) =>
  projects.filter((item) => projectName(item) === name),
);
const otherProjects = projects.filter((item) => !featuredProjects.includes(projectName(item)));

/** Public, checkable counts — verified 2026-11-24 via the GitHub search linked below. */
const mergedSearchUrl =
  "https://github.com/search?q=is%3Apr+is%3Amerged+author%3Asanketpatel32+-user%3Asanketpatel32&type=pullrequests";

function MergeLog() {
  return (
    <figure className="doss-log" aria-label="Recent merged pull requests">
      <figcaption>
        <span className="doss-log-dot" aria-hidden="true" />
        <span className="doss-log-dot" aria-hidden="true" />
        <span className="doss-log-dot" aria-hidden="true" />
        <span className="doss-log-title">merged.log</span>
      </figcaption>
      <ol>
        {upstreamCases.map((item) => (
          <li key={item.repository}>
            <GitMerge size={14} aria-hidden="true" className="doss-log-merge" />
            <span className="doss-log-pull">pull/{item.pull}</span>
            <span className="doss-log-repo">{item.repository}</span>
            <span className="doss-log-what">{item.kind.toLowerCase()}</span>
          </li>
        ))}
      </ol>
      <p className="doss-log-tail">
        <a href={mergedSearchUrl}>80 merged pull requests · 17 upstream repositories</a>
      </p>
    </figure>
  );
}

function ProjectLinks({ project }: { project: ProjectItem }) {
  if (!project.links.github && !project.links.live)
    return <span className="doss-private">Private product work</span>;
  return (
    <div className="doss-project-links">
      {project.links.github && (
        <a href={project.links.github} aria-label={`${projectName(project)} source code`}>
          Source <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      )}
      {project.links.live && (
        <a href={project.links.live} aria-label={`Visit ${projectName(project)}`}>
          Visit <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      )}
    </div>
  );
}

function CaseNotes({ project }: { project: ProjectItem }) {
  const name = projectName(project);
  const story = stories.find((item) => item.project === name);
  if (!story) return null;

  return (
    <details className="doss-case-notes">
      <summary aria-label={`Case study: ${name}`}>
        Case study <span className="doss-plus" aria-hidden="true" />
      </summary>
      <div>
        <h4>The problem</h4>
        <p>{story.problem}</p>
        <h4>What I built</h4>
        <ul>
          {story.built.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <h4>Impact</h4>
        <ul>
          {story.impact.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <h4>Stack</h4>
        <p>{project.tech.join(" · ")}</p>
      </div>
    </details>
  );
}

function CaseEntry({ item, rank }: { item: UpstreamCaseStudy; rank: number }) {
  return (
    <article className="doss-entry">
      <div className="doss-entry-head">
        <span className="doss-entry-num" aria-hidden="true">
          {String(rank).padStart(2, "0")}
        </span>
        <div className="doss-entry-title">
          <p className="doss-repo">
            <GitCommitHorizontal size={15} aria-hidden="true" /> {item.repository}
          </p>
          <h3>{item.name}</h3>
          <p className="doss-entry-kind">{item.kind}</p>
        </div>
        <a className="doss-merged" href={`https://github.com/${item.repository}/pull/${item.pull}`} aria-label={`${item.name}, merged pull request ${item.pull}`}>
          <GitMerge size={15} aria-hidden="true" /> Merged · #{item.pull}
        </a>
      </div>
      <dl className="doss-entry-body">
        <div>
          <dt>Problem</dt>
          <dd>{item.problem}</dd>
        </div>
        <div>
          <dt>Change</dt>
          <dd>{item.change}</dd>
        </div>
        <div>
          <dt>Outcome</dt>
          <dd>
            {item.outcome}
            {item.issue && (
              <span className="doss-issue">
                Reported as issue #{item.issue.number} · opened {item.issue.opened}
              </span>
            )}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function ContributionRow({ item, rank }: { item: UpstreamContribution; rank: number }) {
  return (
    <li className="wb-ledger-row">
      <span aria-hidden="true" className="doss-ledger-number">
        {String(rank).padStart(2, "0")}
      </span>
      <div className="doss-ledger-name">
        <h3>{item.name}</h3>
        <span>{item.kind}</span>
      </div>
      <p>{item.summary}</p>
      <a href={upstreamPullUrl(item)} aria-label={`${item.name} merged PR #${item.pull}`}>
        <GitMerge size={16} aria-hidden="true" /> #{item.pull}
        <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </li>
  );
}

export default function Dossier() {
  const featured = upstreamContributions.filter((item) => item.featured);
  const index = upstreamContributions.filter((item) => !item.featured);

  return (
    <div className="doss">
      <header className="doss-frame doss-header">
        <a href="#about" className="doss-brand" aria-label="Sanket Patel, home">
          <span className="doss-monogram" aria-hidden="true">
            SP
          </span>
          <span>
            sanketpatel32<small>PERSONAL SITE</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#open-source">Open source</a>
          <a href="#projects">Work</a>
          <a href="#experience">Experience</a>
        </nav>
        <a className="doss-header-contact" href="#contact">
          Contact <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </header>

      <main id="main-content" className="doss-frame" tabIndex={-1}>
        <section className="doss-hero" id="about" aria-labelledby="doss-hero-title">
          <div className="doss-hero-copy">
            <div className="doss-kicker">
              <span className="doss-dot" /> SOFTWARE DEVELOPER <span aria-hidden="true">/</span>{" "}
              OPEN-SOURCE CONTRIBUTOR
            </div>
            <h1 id="doss-hero-title">
              {profile.name}
              <span>.</span>
            </h1>
            <p>
              I build developer tools and full-stack products — and I work in the open. When
              something breaks in software I rely on, I send the fix upstream.
            </p>
            <dl className="doss-stats" aria-label="Public open-source record">
              <div>
                <dt>
                  <a href={mergedSearchUrl}>80</a>
                </dt>
                <dd>merged pull requests</dd>
              </div>
              <div>
                <dt>
                  <a href={mergedSearchUrl}>17</a>
                </dt>
                <dd>upstream repositories</dd>
              </div>
              <div>
                <dt>
                  <a href="#case-studies">03</a>
                </dt>
                <dd>case studies below</dd>
              </div>
            </dl>
            <div className="doss-actions">
              <a className="doss-button" href="#open-source">
                Read the merged record <ArrowDownRight size={19} aria-hidden="true" />
              </a>
              <a className="doss-text-button" href="/resume.pdf">
                Résumé <ArrowDownToLine size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <MergeLog />
        </section>

        <section className="doss-section doss-upstream" id="open-source" aria-labelledby="doss-upstream-title">
          <div className="doss-section-head">
            <div>
              <p className="doss-kicker">01 / MERGED UPSTREAM</p>
              <h2 id="doss-upstream-title">Work that lives in other people’s code.</h2>
            </div>
            <p>
              Selected contributions across {upstreamContributions.length} external repositories.
              Every entry links to the merged pull request — nothing here is self-reported.
            </p>
          </div>

          <div className="doss-cases" id="case-studies">
            {upstreamCases.map((item, i) => (
              <CaseEntry key={item.repository} item={item} rank={i + 1} />
            ))}
          </div>

          <div className="doss-ledger-head">
            <span>
              <GitMerge size={17} aria-hidden="true" /> THE FULL LEDGER
            </span>
            <span>PR RECORD ↗</span>
          </div>
          <ol className="doss-ledger" role="list">
            {featured.map((item, i) => (
              <ContributionRow key={item.repository} item={item} rank={i + 1} />
            ))}
          </ol>
          <details className="doss-more">
            <summary>
              More upstream projects <span className="doss-plus" aria-hidden="true" />
            </summary>
            <ol className="doss-ledger" role="list" start={featured.length + 1}>
              {index.map((item, i) => (
                <ContributionRow
                  key={item.repository}
                  item={item}
                  rank={featured.length + i + 1}
                />
              ))}
            </ol>
          </details>
          <a className="doss-text-button doss-github-history" href={mergedSearchUrl}>
            Browse all merged PRs on GitHub <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </section>

        <section className="doss-section" id="projects" aria-labelledby="doss-project-title">
          <div className="doss-section-head">
            <div>
              <p className="doss-kicker">02 / BUILT HERE</p>
              <h2 id="doss-project-title">Made at my desk.</h2>
            </div>
            <p>Tools I wanted to use, and products I helped take from interface to backend.</p>
          </div>
          <div className="doss-project-grid">
            {allFeatured.map((project) => {
              const name = projectName(project);
              const preview = previews[name];
              return (
                <article className="case-study doss-project" key={project.name}>
                  <figure className={`doss-project-image doss-${preview.tone}`}>
                    <figcaption>{preview.detail}</figcaption>
                    <Image
                      src={preview.src}
                      alt={`${name} application interface`}
                      width={1000}
                      height={590}
                      sizes="(max-width: 740px) 94vw, (max-width: 960px) 45vw, 30vw"
                    />
                  </figure>
                  <h3>{name}</h3>
                  <p className="doss-project-role">{projectTitle(project)}</p>
                  <p>{project.description}</p>
                  <ProjectLinks project={project} />
                  <CaseNotes project={project} />
                </article>
              );
            })}
          </div>
          <div className="doss-more-projects">
            <h3 className="doss-background-label">Product work &amp; smaller tools</h3>
            <div className="doss-more-grid">
              {otherProjects.map((project) => (
                <article className="case-study doss-project-compact" key={project.name}>
                  <h3>{projectName(project)}</h3>
                  <p className="doss-project-role">
                    {projectName(project) === "Miracode"
                      ? "Personal fork of Mira"
                      : projectTitle(project)}
                  </p>
                  <p>{project.description}</p>
                  <ProjectLinks project={project} />
                  <CaseNotes project={project} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="doss-section" id="experience" aria-labelledby="doss-career-title">
          <div className="doss-section-head">
            <div>
              <p className="doss-kicker">03 / BACKGROUND</p>
              <h2 id="doss-career-title">The long view.</h2>
            </div>
            <p>Professional work, the tools I reach for, and the path I took into software.</p>
          </div>
          <div className="doss-background">
            <div>
              <h3 className="doss-background-label">Experience</h3>
              {career.map((item) => (
                <article className="doss-job" key={item.company}>
                  <p className="doss-kicker">{item.dates}</p>
                  <h3>{item.company}</h3>
                  <p className="doss-project-role">
                    {item.role} · {item.location}
                  </p>
                  <p>{item.bullets[0]}</p>
                </article>
              ))}
            </div>
            <div className="doss-background-side">
              <h3 className="doss-background-label" id="skills">
                Toolkit
              </h3>
              <dl className="doss-skills">
                {skills.categories.map((category) => (
                  <div key={category.name}>
                    <dt>{category.name}</dt>
                    <dd>{category.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
              <details className="doss-more" id="certifications">
                <summary>
                  Education &amp; credentials <span className="doss-plus" aria-hidden="true" />
                </summary>
                <ul className="doss-credentials">
                  {education.map((item) => (
                    <li key={item.school}>
                      <b>{item.school}</b>
                      <span>
                        {item.degree} · {item.dates}
                      </span>
                    </li>
                  ))}
                  {certifications.map((item) => (
                    <li key={item.name}>
                      <a href={item.credentialUrl}>
                        {item.name} <ArrowUpRight aria-hidden="true" size={13} />
                      </a>
                      <span>{item.issuer}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
        </section>

        <section className="doss-contact" id="contact" aria-labelledby="doss-contact-title">
          <p className="doss-kicker">04 / CONTACT</p>
          <h2 id="doss-contact-title">Let’s talk.</h2>
          <p>
            Hiring for a software role, building a developer tool, or want to compare notes on a
            project?
          </p>
          <div className="doss-actions">
            <a className="doss-button" href="/contact">
              Get in touch <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="doss-text-button" href={`mailto:${contact.email}`}>
              <Mail size={17} aria-hidden="true" /> Email me
            </a>
          </div>
        </section>
      </main>

      <footer className="doss-frame doss-footer">
        <span>
          {profile.name} <span aria-hidden="true">/</span> {contact.location}
        </span>
        <nav aria-label="More links">
          <a href={contact.github}>
            <Github size={16} aria-hidden="true" /> GitHub
          </a>
          <a href={contact.linkedin}>
            <Linkedin size={16} aria-hidden="true" /> LinkedIn
          </a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/developers">For developers</a>
        </nav>
      </footer>
    </div>
  );
}
