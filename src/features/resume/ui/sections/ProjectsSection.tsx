"use client";

import { useState } from "react";
import type { ProjectItem } from "@/features/resume/model/types";
import ProjectCard from "@/features/resume/ui/cards/ProjectCard";
import Section from "@/shared/ui/Section";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "featured" | "security" | "fullstack">("featured");

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "featured") {
      return project.name.startsWith("LayersRank") || project.name.startsWith("Claire") || project.name.includes("Blunt Code") || project.name.includes("mdpeek") || project.name.includes("AuraFlow");
    }
    if (activeTab === "security") {
      return project.name.includes("ScanForge") || project.name.includes("Blunt Code");
    }
    if (activeTab === "fullstack") {
      return project.name.startsWith("LayersRank") || project.name.startsWith("Claire") || project.name.includes("Salon") || project.name.includes("AuraFlow");
    }
    return true;
  });

  return (
    <Section
      id="projects"
      number="02"
      tag="Selected work"
      title="Inside the systems"
      description="Complete applications built from scratch, alongside open-source developer tools."
    >
      <div className="project-filters" role="group" aria-label="Filter projects">
        {[
          { id: "featured", label: "Selected projects" },
          { id: "all", label: "All projects" },
          { id: "security", label: "Security" },
          { id: "fullstack", label: "Full-stack" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`filter-button ${
              activeTab === tab.id
                ? "is-active"
                : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

        <div className="projects-grid" aria-live="polite" aria-atomic="false">
          {filteredProjects.map((project, index) => {
            const isFeatured = project.name.includes("Blunt Code");
            return (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                tech={project.tech}
                links={project.links}
                index={index}
                isFeatured={isFeatured}
              />
            );
          })}
        </div>
    </Section>
  );
}
