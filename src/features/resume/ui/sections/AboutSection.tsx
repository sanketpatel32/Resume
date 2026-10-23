"use client";

import Link from "next/link";
import Image from "next/image";
import { FiDownload, FiGithub } from "react-icons/fi";
import type { ContactInfo, Profile } from "@/features/resume/model/types";
import { scrollToSection } from "@/shared/lib/scroll";

interface AboutSectionProps { profile: Profile; contact: ContactInfo; }

export default function AboutSection({ profile, contact }: AboutSectionProps) {
  return (
    <section id="about" className="hero-section product-hero" aria-label={`${profile.name}, ${profile.title}`}>
      <div className="resume-container">
        <h1 className="display-heading">Sanket Patel.</h1>
        <div className="product-hero-grid">
          <div className="product-hero-copy">
            <p className="product-hero-statement">I build complete applications, from product interfaces to real-time AI.</p>
            <div className="hero-actions">
              <button type="button" onClick={() => scrollToSection("projects")} className="button button-primary">Explore my work</button>
              <Link href="/resume.pdf" download="Sanket_Patel_Resume.pdf" className="text-link">Résumé <FiDownload aria-hidden="true" /></Link>
            </div>
          </div>
          <figure className="product-hero-work">
            <a href="https://github.com/sanketpatel32/Mdpeek" target="_blank" rel="noopener noreferrer" aria-label="Explore mdpeek on GitHub">
              <Image src="/projects/mdpeek-editor.png" width={1600} height={950} alt="mdpeek, my native document workspace, with Markdown editing and live preview" sizes="(max-width: 832px) 100vw, 65vw" priority />
            </a>
            <figcaption><span>mdpeek <span>/ Native document workspace</span></span><FiGithub aria-hidden="true" /></figcaption>
          </figure>
        </div>
        <div className="product-hero-footer"><p>{profile.title}</p><p>{contact.location}</p><button type="button" onClick={() => scrollToSection("contact")} className="text-link">Let’s talk</button></div>
      </div>
    </section>
  );
}
