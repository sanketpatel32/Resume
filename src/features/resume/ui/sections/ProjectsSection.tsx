"use client";

import { useState } from "react";
import type { ProjectItem } from "@/features/resume/model/types";
import ProjectCard from "@/features/resume/ui/cards/ProjectCard";
import Section from "@/shared/ui/Section";
import { m, AnimatePresence } from "framer-motion";

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "featured" | "security" | "fullstack">("all");

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "featured") {
      return project.name.includes("ScanForge") || project.name.includes("mdpeek");
    }
    if (activeTab === "security") {
      return project.name.includes("ScanForge") || project.name.includes("AuraFlow") || project.name.includes("mdpeek");
    }
    if (activeTab === "fullstack") {
      return project.name.includes("Salon") || project.name.includes("AuraFlow");
    }
    return true;
  });

  return (
    <Section
      id="projects"
      number="02"
      tag="Selected work"
      title="Selected systems"
      description="Production-grade tools, security scanners, desktop applications, and real-time backend systems."
    >
      <div className="project-filters" role="group" aria-label="Filter projects">
        {[
          { id: "all", label: "All Work" },
          { id: "featured", label: "Featured" },
          { id: "security", label: "Security" },
          { id: "fullstack", label: "Full-stack" },
        ].map((tab) => (
          <button
            key={tab.id}
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

      <AnimatePresence mode="wait">
        <m.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="projects-grid"
        >
          {filteredProjects.map((project, index) => {
            const isFeatured = project.name.includes("ScanForge");
            return (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                tech={project.tech}
                links={project.links}
                index={index}
                isFeatured={isFeatured && activeTab === "all"}
              />
            );
          })}
        </m.div>
      </AnimatePresence>
    </Section>
  );
}
