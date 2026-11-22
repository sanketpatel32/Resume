"use client";

import type { ProjectItem } from "@/features/resume/model/types";
import { getFocusedProjects, workLenses, type WorkFocus } from "@/features/resume/model/work";
import ProjectCard from "@/features/resume/ui/cards/ProjectCard";
import Section from "@/shared/ui/Section";

interface ProjectsSectionProps {
  projects: ProjectItem[];
  focus: WorkFocus;
  onFocusChange: (focus: WorkFocus) => void;
}

export default function ProjectsSection({ projects, focus, onFocusChange }: ProjectsSectionProps) {
  const filteredProjects = getFocusedProjects(projects, focus);

  return (
    <Section
      id="projects"
      number="01"
      kicker="Full-stack & AI systems — shipped end to end."
      title="Selected work"
      description="Private product builds and open repositories. Each row is a complete slice of the stack, not a slide."
    >
      <div className="work-index-bar editorial-index-bar">
        <div className="project-filters" role="group" aria-label="Filter projects">
          {workLenses.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={focus === item.id}
              onClick={() => onFocusChange(item.id)}
              className={`filter-button ${focus === item.id ? "is-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="work-count" aria-live="polite">
          {String(filteredProjects.length).padStart(2, "0")} projects
        </p>
      </div>
      <div className="projects-editorial" aria-live="polite" aria-atomic="false">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.name}
            {...project}
            index={index}
            isFeatured={!project.links.github && !project.links.live}
          />
        ))}
      </div>
    </Section>
  );
}