"use client";

import type { ProjectItem } from "@/features/resume/model/types";
import ProjectCard from "@/features/resume/ui/cards/ProjectCard";
import Section from "@/shared/ui/Section";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.description}
            tech={project.tech}
            links={project.links}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
