"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiDownload, FiGithub, FiX } from "react-icons/fi";
import type { ContactInfo, Profile } from "@/features/resume/model/types";
import { scrollToSection } from "@/shared/lib/scroll";

interface AboutSectionProps { profile: Profile; contact: ContactInfo; }

const systems = [
  { name: "LayersRank", kind: "AI hiring & assessments", stack: ["React", "Bun", "MongoDB"], note: "Built from scratch. The complete hiring platform, from candidate portals to AI-assisted scoring.", position: "quality" },
  { name: "Claire", kind: "Voice AI & workflows", stack: ["FastAPI", "LangGraph", "LiveKit"], note: "Built from scratch. The full application across the interface, workflow engine, and real-time voice services.", position: "desktop" },
  { name: "mdpeek", repo: "Mdpeek", kind: "Native document workspace", stack: ["Tauri", "Rust", "WebView2"], note: "Markdown, PDFs, code, and notes. A native workspace without bundled Chromium.", position: "realtime" },
];

export default function AboutSection({ profile, contact }: AboutSectionProps) {
  const [selected, setSelected] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const project = systems[selected];

  return (
    <section id="about" className="hero-section systems-atlas" aria-label={`${profile.name}, ${profile.title}`} onKeyDown={(event) => {
      if (event.key === "Escape" && showPreview) {
        setShowPreview(false);
        document.getElementById("atlas-preview-toggle")?.focus();
      }
    }}>
      <div className="resume-container atlas-canvas project-map">
        <svg className="atlas-connections project-map-lines" viewBox="0 0 1200 640" preserveAspectRatio="none" aria-hidden="true">
          <path className={selected === 0 ? "selected-connection" : ""} d="M350 300 H470 Q510 300 510 260 V115 Q510 85 550 85 H720" />
          <path className={selected === 1 ? "selected-connection" : ""} d="M350 300 H800 Q840 300 840 340 V365 H1010" />
          <path className={selected === 2 ? "selected-connection" : ""} d="M350 300 H445 Q480 300 480 340 V505 Q480 540 520 540 H650" />
          <path className="atlas-continuation" d="M210 430 V640" />
        </svg>
        <div className="atlas-identity">
          <h1 className="display-heading"><span>Sanket</span><span>Patel</span></h1>
          <p>I build complete <br />applications from scratch.</p>
          <button type="button" onClick={() => scrollToSection("contact")} className="button button-primary">Start a conversation</button>
        </div>
        <div className="atlas-projects" role="group" aria-label="Explore the projects connected to Sanket">
          {systems.map((system, index) => (
            <button type="button" key={system.name} className={`atlas-node atlas-node-${system.position}`} aria-pressed={selected === index} aria-controls="atlas-inspector" onClick={() => { setSelected(index); setShowPreview(system.repo === "Mdpeek"); }}>
              <span className="atlas-node-title">{system.name}</span>
              <span className="atlas-node-description">{system.kind}</span>
            </button>
          ))}
        </div>
        <aside id="atlas-inspector" className="atlas-inspector" aria-label="Selected project details" aria-live="polite">
          <div className="atlas-stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
          <p>{project.note}</p>
          <div className="atlas-inspector-actions">
            {project.repo ? <a href={`https://github.com/sanketpatel32/${project.repo}`} target="_blank" rel="noopener noreferrer" className="text-link">Inspect {project.name} <FiGithub aria-hidden="true" /></a> : <button type="button" className="atlas-preview-toggle" onClick={() => scrollToSection("projects")}>Read {project.name} notes</button>}
            {project.repo === "Mdpeek" && <button type="button" id="atlas-preview-toggle" className="atlas-preview-toggle" aria-expanded={showPreview} aria-controls="mdpeek-capture" onClick={() => setShowPreview(!showPreview)}>{showPreview ? "Close preview" : "See the application"}</button>}
          </div>
        </aside>
        {showPreview && <div id="mdpeek-capture" className="atlas-preview">
          <button type="button" className="atlas-preview-close" onClick={() => setShowPreview(false)} aria-label="Close mdpeek preview"><FiX aria-hidden="true" /></button>
          <Image src="/projects/mdpeek-editor.png" width={1600} height={950} alt="The real mdpeek application, showing Markdown editing and document preview" sizes="(max-width: 832px) 90vw, 55vw" />
        </div>}
      </div>
      <div className="resume-container atlas-caption">
        <p>{profile.title}<span>{contact.location}</span></p>
        <p>Select a project.<br />Follow the connections.</p>
        <Link href="/resume.pdf" download="Sanket_Patel_Resume.pdf" className="text-link">Download CV <FiDownload aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
