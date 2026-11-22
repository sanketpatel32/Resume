"use client";

import { useEffect, useState } from "react";
import { profile } from "@/features/resume/content/profile";
import { sectionNav } from "@/features/resume/model/sectionNav";
import { scrollToSection, scrollToTop } from "@/shared/lib/scroll";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsHidden(y > 240 && y > lastY + 2);
      if (y < lastY - 2 || y < 240) setIsHidden(false);
      lastY = y;
      const scrollPosition = y + 180;
      for (let index = sectionNav.length - 1; index >= 0; index -= 1) {
        const section = document.getElementById(sectionNav[index].id);
        if (section && section.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
          setActiveSection(sectionNav[index].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (id: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`site-nav ${isHidden && !isMobileMenuOpen ? "is-hidden" : ""} ${isMobileMenuOpen ? "is-open" : ""}`}>
      <div className="resume-container nav-inner">
        <button type="button" className="wordmark" onClick={scrollToTop} aria-label="Scroll to top" data-magnetic="0.25">
          <span className="wordmark-mark" aria-hidden="true">SP</span>
          <span>{profile.name}</span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button type="button" onClick={() => navigate("projects")} className={`nav-link ${activeSection === "projects" ? "is-active" : ""}`} data-magnetic="0.3">Work</button>
          <button type="button" onClick={() => navigate("career")} className={`nav-link ${activeSection === "career" ? "is-active" : ""}`} data-magnetic="0.3">Experience</button>
          <button type="button" onClick={() => navigate("contact")} className="nav-contact" data-magnetic="0.3">
            Contact
          </button>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
        >
          <span aria-hidden="true">{isMobileMenuOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <div className="resume-container mobile-nav-list">
            {sectionNav.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`mobile-nav-link ${activeSection === item.id ? "is-active" : ""}`}
                style={{ "--i": index } as React.CSSProperties}
              >
                <span className="mobile-nav-index">L{index}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
