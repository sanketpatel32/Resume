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
      return project.name.includes("Salon") || project.name.includes("Group Chat") || project.name.includes("AuraFlow");
    }
    return true;
  });

  return (
    <Section
      id="projects"
      number="02"
      tag="FEATURED WORK"
      title="Projects & Architecture"
      description="Production-grade tools, security scanners, desktop applications, and real-time backend systems."
    >
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {[
          { id: "all", label: "All Work" },
          { id: "featured", label: "★ Featured Systems" },
          { id: "security", label: "Developer & Security Tools" },
          { id: "fullstack", label: "Full-Stack Web Apps" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-semibold"
                : "bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <m.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {filteredProjects.map((project, index) => {
            const isFeatured = project.name.includes("ScanForge") || project.name.includes("mdpeek");
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
