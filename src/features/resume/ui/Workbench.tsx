import Image from "next/image";
import { ArrowDownRight, ArrowDownToLine, ArrowRight, ArrowUpRight, GitMerge, Github, Linkedin, Mail } from "lucide-react";
import { resumeContent } from "@/features/resume/content";
import {
  upstreamContributions, upstreamPullUrl,
  type UpstreamContribution,
} from "@/features/resume/content/contributions";
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
const allFeatured = featuredProjects.flatMap((name) => projects.filter((item) => projectName(item) === name));
const otherProjects = projects.filter((item) => !featuredProjects.includes(projectName(item)));

function MergePlot() {
  return (
    <figure className="wb-plot">
      <figcaption><span>FIG. 01</span><span>WORKING IN THE OPEN</span></figcaption>
      <svg viewBox="0 0 390 256" className="wb-graph" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="workbench-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="white" opacity=".14" />
          </pattern>
        </defs>
        <path d="M0 0h390v256H0z" fill="url(#workbench-grid)" />
        <path d="M22 136h332m-17-8 17 8-17 8" fill="none" stroke="white" strokeWidth="2" />
        <path d="M62 136c40 0 46-61 88-61h30c38 0 41 61 77 61" fill="none" stroke="#e4ee94" strokeWidth="2.4" />
        <path d="M118 136c38 0 42 62 89 62h16c31 0 50-62 83-62" fill="none" stroke="#f4a587" strokeWidth="2.4" />
        <g fill="#242e81" strokeWidth="2">
          <circle cx="62" cy="136" r="6" stroke="white" />
          <circle cx="118" cy="136" r="6" stroke="white" />
          <circle cx="165" cy="75" r="6" stroke="#e4ee94" />
          <circle cx="216" cy="198" r="6" stroke="#f4a587" />
          <circle cx="257" cy="136" r="6" stroke="#e4ee94" />
          <circle cx="306" cy="136" r="6" stroke="#f4a587" />
        </g>
        <g fill="white" className="wb-graph-label">
          <text x="32" y="163">MAIN</text>
          <text x="140" y="57" fill="#e4ee94">LOCAL TOOLS</text>
          <text x="155" y="225" fill="#f4a587">UPSTREAM FIXES</text>
          <text x="284" y="113">MERGED</text>
        </g>
      </svg>
      <div className="wb-plot-note"><GitMerge aria-hidden="true" size={18} /><span>Build independently.<br />Make the upstream better.</span></div>
    </figure>
  );
}

function ProjectLinks({ project }: { project: ProjectItem }) {
  if (!project.links.github && !project.links.live) return <span className="wb-private">Private product work</span>;
  return (
    <div className="wb-project-links">
      {project.links.github && <a href={project.links.github} aria-label={`${projectName(project)} source code`}>Source <ArrowUpRight aria-hidden="true" size={15} /></a>}
      {project.links.live && <a href={project.links.live} aria-label={`Visit ${projectName(project)}`}>Visit <ArrowUpRight aria-hidden="true" size={15} /></a>}
    </div>
  );
}

function CaseNotes({ project }: { project: ProjectItem }) {
  const name = projectName(project);
  const story = stories.find((item) => item.project === name);
  if (!story) return null;

  return (
    <details className="wb-case-notes">
      <summary aria-label={`Case study: ${name}`}>Case study <span className="wb-plus" aria-hidden="true" /></summary>
      <div>
        <h4>The problem</h4><p>{story.problem}</p>
        <h4>What I built</h4><ul>{story.built.map((line) => <li key={line}>{line}</li>)}</ul>
        <h4>Impact</h4><ul>{story.impact.map((line) => <li key={line}>{line}</li>)}</ul>
        <h4>Stack</h4><p>{project.tech.join(" · ")}</p>
      </div>
    </details>
  );
}

function ContributionRow({ item, rank }: { item: UpstreamContribution; rank: number }) {
  return (
    <li className="wb-ledger-row">
      <span aria-hidden="true" className="wb-ledger-number">{String(rank).padStart(2, "0")}</span>
      <div className="wb-ledger-name">
        <h3>{item.name}</h3>
        <span>{item.kind}</span>
      </div>
      <p>{item.summary}</p>
      <a href={upstreamPullUrl(item)} aria-label={`${item.name} merged PR #${item.pull}`}>
        <GitMerge size={16} aria-hidden="true" /> #{item.pull} <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </li>
  );
}

export default function Workbench() {
  const featured = upstreamContributions.filter((item) => item.featured);
  const index = upstreamContributions.filter((item) => !item.featured);

  return (
    <div className="wb">
      <header className="wb-frame wb-header">
        <a href="#about" className="wb-brand" aria-label="Sanket Patel, home">
          <span className="wb-monogram" aria-hidden="true">SP</span><span>THE WORKBENCH<small>PERSONAL SITE</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#projects">Work</a><a href="#open-source">Open source</a><a href="#career">Experience</a>
        </nav>
        <a className="wb-header-contact" href="#contact">Contact <ArrowUpRight size={15} aria-hidden="true" /></a>
      </header>

      <main id="main-content" className="wb-frame" tabIndex={-1}>
        <section className="wb-hero" id="about" aria-labelledby="wb-hero-title">
          <div className="wb-hero-copy">
            <div className="wb-kicker"><span className="wb-dot" /> SOFTWARE DEVELOPER <span aria-hidden="true">/</span> OPEN-SOURCE CONTRIBUTOR</div>
            <h1 id="wb-hero-title">{profile.name}<span>.</span></h1>
            <p>I build developer tools and full-stack products. When I find something broken in software I use, I send the fix upstream.</p>
            <div className="wb-actions">
              <a className="wb-button" href="#open-source">See merged work <ArrowDownRight size={19} aria-hidden="true" /></a>
              <a className="wb-text-button" href="/resume.pdf">Résumé <ArrowDownToLine size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <MergePlot />
        </section>
        <div className="wb-index-strip" aria-hidden="true">
          <span>01 / BUILT HERE</span><span>02 / MERGED UPSTREAM</span><span>03 / BACKGROUND &amp; CONTACT</span>
        </div>

        <section className="wb-section" id="projects" aria-labelledby="wb-project-title">
          <div className="wb-section-head">
            <div><p className="wb-kicker">01 / BUILT HERE</p><h2 id="wb-project-title">Made at my desk.</h2></div>
            <p>Tools I wanted to use, and products I helped take from interface to backend.</p>
          </div>
          <div className="wb-project-grid">
            {allFeatured.map((project) => {
              const name = projectName(project);
              const preview = previews[name];
              return (
                <article className="case-study wb-project" key={project.name}>
                  <figure className={`wb-project-image wb-${preview.tone}`}>
                    <figcaption>{preview.detail}</figcaption>
                    <Image src={preview.src} alt={`${name} application interface`} width={1000} height={590} sizes="(max-width: 740px) 94vw, (max-width: 960px) 45vw, 30vw" />
                  </figure>
                  <h3>{name}</h3><p className="wb-project-role">{projectTitle(project)}</p>
                  <p>{project.description}</p>
                  <ProjectLinks project={project} />
                  <CaseNotes project={project} />
                </article>
              );
            })}
          </div>
          <div className="wb-more-projects">
            <h3 className="wb-background-label">Product work &amp; smaller tools</h3>
            <div className="wb-more-grid">
              {otherProjects.map((project) => (
                <article className="case-study wb-project-compact" key={project.name}>
                  <h3>{projectName(project)}</h3>
                  <p className="wb-project-role">{projectName(project) === "Miracode" ? "Personal fork of Mira" : projectTitle(project)}</p>
                  <p>{project.description}</p>
                  <ProjectLinks project={project} />
                  <CaseNotes project={project} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wb-section wb-upstream" id="open-source" aria-labelledby="wb-upstream-title">
          <div className="wb-section-head">
            <div><p className="wb-kicker">02 / MERGED UPSTREAM</p><h2 id="wb-upstream-title">Beyond my repos.</h2></div>
            <p>A selected record across {upstreamContributions.length} external repositories. Every entry links to a merged pull request.</p>
          </div>
          <div className="wb-ledger-head"><span><GitMerge size={17} aria-hidden="true" /> SELECTED CONTRIBUTIONS</span><span>PR RECORD ↗</span></div>
          <ol className="wb-ledger" role="list">
            {featured.map((item, i) => <ContributionRow key={item.repository} item={item} rank={i + 1} />)}
          </ol>
          <details className="wb-more">
            <summary>More upstream projects <span className="wb-plus" aria-hidden="true" /></summary>
            <ol className="wb-ledger" role="list" start={featured.length + 1}>
              {index.map((item, i) => <ContributionRow key={item.repository} item={item} rank={featured.length + i + 1} />)}
            </ol>
          </details>
          <a className="wb-text-button wb-github-history" href="https://github.com/search?q=is%3Apr+is%3Amerged+author%3Asanketpatel32&type=issues">Browse all merged PRs on GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
        </section>

        <section className="wb-section" id="career" aria-labelledby="wb-career-title">
          <div className="wb-section-head">
            <div><p className="wb-kicker">03 / BACKGROUND</p><h2 id="wb-career-title">The long view.</h2></div>
            <p>Professional work, the tools I reach for, and the path I took into software.</p>
          </div>
          <div className="wb-background">
            <div>
              <h3 className="wb-background-label">Experience</h3>
              {career.map((item) => <article className="wb-job" key={item.company}><p className="wb-kicker">{item.dates}</p><h3>{item.company}</h3><p className="wb-project-role">{item.role} · {item.location}</p><p>{item.bullets[0]}</p></article>)}
            </div>
            <div className="wb-background-side">
              <h3 className="wb-background-label" id="skills">Toolkit</h3>
              <dl className="wb-skills">{skills.categories.map((category) => <div key={category.name}><dt>{category.name}</dt><dd>{category.items.join(" · ")}</dd></div>)}</dl>
              <details className="wb-more" id="certifications">
                <summary>Education &amp; credentials <span className="wb-plus" aria-hidden="true" /></summary>
                <ul className="wb-credentials">
                  {education.map((item) => <li key={item.school}><b>{item.school}</b><span>{item.degree} · {item.dates}</span></li>)}
                  {certifications.map((item) => <li key={item.name}><a href={item.credentialUrl}>{item.name} <ArrowUpRight aria-hidden="true" size={13} /></a><span>{item.issuer}</span></li>)}
                </ul>
              </details>
            </div>
          </div>
        </section>

        <section className="wb-contact" id="contact" aria-labelledby="wb-contact-title">
          <p className="wb-kicker">04 / CONTACT</p>
          <h2 id="wb-contact-title">Let’s talk.</h2>
          <p>Hiring for a software role, building a developer tool, or want to compare notes on a project?</p>
          <div className="wb-actions">
            <a className="wb-button" href="/contact">Get in touch <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="wb-text-button" href={`mailto:${contact.email}`}><Mail size={17} aria-hidden="true" /> Email me</a>
          </div>
        </section>
      </main>

      <footer className="wb-frame wb-footer">
        <span>{profile.name} <span aria-hidden="true">/</span> {contact.location}</span>
        <nav aria-label="More links">
          <a href={contact.github}><Github size={16} aria-hidden="true" /> GitHub</a>
          <a href={contact.linkedin}><Linkedin size={16} aria-hidden="true" /> LinkedIn</a>
          <a href="/about">About</a><a href="/privacy">Privacy</a><a href="/developers">For developers</a>
        </nav>
      </footer>
    </div>
  );
}
