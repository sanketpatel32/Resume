"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { FiArrowUpRight, FiDownload, FiGithub } from "react-icons/fi";
import type { ContactInfo, Profile } from "@/features/resume/model/types";
import { scrollToSection } from "@/shared/lib/scroll";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

interface AboutSectionProps {
  profile: Profile;
  contact: ContactInfo;
}

export default function AboutSection({ profile, contact }: AboutSectionProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <section id="about" className="hero-section">
      <div className="resume-container hero-grid">
        <m.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="hero-copy"
        >
          <h1 className="display-heading">Sanket builds systems that hold up.</h1>
        </m.div>

        <aside className="hero-index" aria-label="Profile highlights">
          <p className="hero-index-label">Working across</p>
          <ul>
            {profile.highlights.slice(0, 4).map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
          {contact.github && (
            <a className="text-link hero-github" href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub <FiGithub aria-hidden="true" />
            </a>
          )}
        </aside>
      </div>
      <div className="resume-container hero-details">
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <button type="button" onClick={() => scrollToSection("contact")} className="button button-primary">
            Start a conversation <FiArrowUpRight aria-hidden="true" />
          </button>
          <Link href="/resume.pdf" download="Sanket_Patel_Resume.pdf" className="text-link">
            Download CV <FiDownload aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
