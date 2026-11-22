import { FiArrowUpRight, FiGithub, FiLock } from "react-icons/fi";
import type { ProjectItem, ProjectStory, StoryLayer } from "@/features/resume/model/types";
import { palette } from "@/features/resume/experience/palette";
import ProjectVisual from "@/features/resume/ui/cards/ProjectVisual";

const LAYER_LABELS: Record<StoryLayer, string> = {
  interfaces: "Interfaces",
  systems: "Systems",
  tools: "Developer tools",
};

const LAYER_COLORS: Record<StoryLayer, string> = {
  interfaces: palette.citron,
  systems: palette.cornflower,
  tools: palette.coral,
};

interface CaseStudyProps {
  project: ProjectItem;
  story: ProjectStory;
  index: number;
  total: number;
}

export default function CaseStudy({ project, story, index, total }: CaseStudyProps) {
  const [title, subtitle] = project.name.split(" - ");
  const accent = LAYER_COLORS[story.layers[0]];
  const isPrivate = !project.links.github && !project.links.live;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`case-study ${index % 2 === 1 ? "case-study-flip" : ""}`}
      id={`work-${story.slug}`}
      style={{ "--accent": accent } as React.CSSProperties}
      data-case-study
    >
      <span className="cs-number" aria-hidden="true" data-cs-number>{number}</span>

      <header className="cs-head">
        <p className="cs-count">
          <span>{number}</span> / {String(total).padStart(2, "0")}
          {isPrivate ? <span className="cs-private"><FiLock aria-hidden="true" /> Private build</span> : null}
          {story.note ? <span className="cs-private">{story.note}</span> : null}
        </p>
        <h3 className="cs-title" data-cs-title>{title}</h3>
        {subtitle && <p className="cs-subtitle">{subtitle}</p>}
        <ul className="cs-layers" aria-label="Layers of the stack">
          {story.layers.map((layer) => (
            <li key={layer} style={{ "--chip": LAYER_COLORS[layer] } as React.CSSProperties}>{LAYER_LABELS[layer]}</li>
          ))}
        </ul>
      </header>

      <ProjectVisual visual={story.visual} accent={accent} title={title} />

      <div className="cs-body">
        <section className="cs-block cs-problem" data-cs-reveal>
          <h4>The problem</h4>
          <p>{story.problem}</p>
        </section>
        <section className="cs-block" data-cs-reveal>
          <h4>What I built</h4>
          <ul>
            {story.built.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section className="cs-block" data-cs-reveal>
          <h4>Impact</h4>
          <ul>
            {story.impact.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section className="cs-block" data-cs-reveal>
          <h4>Stack</h4>
          <ul className="cs-stack" aria-label="Technologies">
            {project.tech.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="cs-links">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" data-magnetic="0.3" data-cursor="Code">
                <FiGithub aria-hidden="true" /> Source
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" data-magnetic="0.3" data-cursor="Visit">
                {story.slug === "miracode" ? "Upstream docs" : "Live"} <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
            {isPrivate && <p className="cs-private-note">Private product, kept unnamed. No public links or screenshots.</p>}
          </div>
        </section>
      </div>
    </article>
  );
}
