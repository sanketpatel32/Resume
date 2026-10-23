"use client";

import Link from "next/link";
import { FiArrowDown, FiArrowUpRight, FiPlus, FiMinus } from "react-icons/fi";
import type { ContactInfo, Profile } from "@/features/resume/model/types";
import { workLenses, type WorkFocus } from "@/features/resume/model/work";
import { scrollToSection } from "@/shared/lib/scroll";

interface AboutSectionProps {
  profile: Profile;
  contact: ContactInfo;
  focus: WorkFocus;
  onFocusChange: (focus: WorkFocus) => void;
}

export default function AboutSection({ profile, contact, focus, onFocusChange }: AboutSectionProps) {
  return (
    <section id="about" className="hero-section whole-hero" aria-label={`${profile.name}, ${profile.title}`}>
      <div className="resume-container whole-stage">
        <div className="whole-intro">
          <h1 className="display-heading">I build<br />the whole<br /><span>thing.</span></h1>
          <p>From the first interface to the systems behind it.</p>
          <div className="hero-actions">
            <button type="button" onClick={() => scrollToSection("projects")} className="button button-primary">Explore the work <FiArrowDown aria-hidden="true" /></button>
            <Link href="/resume.pdf" download="Sanket_Patel_Resume.pdf" className="text-link">Get my résumé <FiArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="stack-explorer" role="group" aria-label="Explore my work by layer">
          {workLenses.filter((lens) => lens.id !== "all").map((lens) => {
            const expanded = focus === lens.id;
            return (
              <div className={`stack-slice stack-slice-${lens.id}`} key={lens.id}>
                <button type="button" aria-expanded={expanded} aria-controls={`layer-${lens.id}`} onClick={() => onFocusChange(expanded ? "all" : lens.id)}>
                  <span>{lens.label}</span>{expanded ? <FiMinus aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                </button>
                <div id={`layer-${lens.id}`} className="stack-slice-detail" hidden={!expanded}>
                  <p>{lens.description}</p>
                  <button type="button" className="slice-work-link" onClick={() => scrollToSection("projects")}>Explore this layer <FiArrowDown aria-hidden="true" /></button>
                </div>
              </div>
            );
          })}
          <p className="stack-invitation">Open a layer. See what’s behind it.</p>
        </div>
      </div>
      <div className="resume-container whole-baseline"><p>{profile.name} / {profile.title}</p><p>{contact.location}</p><span aria-hidden="true">Built from scratch. All the way through.</span></div>
    </section>
  );
}
