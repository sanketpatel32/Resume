"use client";

import { useEffect, useState } from "react";
import { profile } from "@/features/resume/content/profile";
import { sectionNav } from "@/features/resume/model/sectionNav";
import { scrollToSection, scrollToTop } from "@/shared/lib/scroll";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let index = sectionNav.length - 1; index >= 0; index -= 1) {
        const section = document.getElementById(sectionNav[index].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionNav[index].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="site-nav">
      <div className="resume-container nav-inner">
        <button type="button" className="wordmark" onClick={scrollToTop} aria-label="Scroll to top">
          <span className="wordmark-mark" aria-hidden="true">SP</span>
          <span>{profile.name}</span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button type="button" onClick={() => navigate("contact")} className="nav-contact">
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
            {sectionNav.map((item) => (
              <button type="button" key={item.id} onClick={() => navigate(item.id)} className={`mobile-nav-link ${activeSection === item.id ? "is-active" : ""}`}>
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
