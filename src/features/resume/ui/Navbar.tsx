"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { profile } from "@/features/resume/content/profile";
import { sectionNav } from "@/features/resume/model/sectionNav";
import { scrollToSection, scrollToTop } from "@/shared/lib/scroll";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useHydratedReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = sectionNav.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionNav[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionNavigation = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <m.nav
        initial={shouldReduceMotion ? {} : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              type="button"
              className="flex items-center gap-3 cursor-pointer group bg-transparent border-0 p-0"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 32px, 40px"
                  className="object-contain"
                />
              </div>
              <span className="text-white font-semibold text-lg md:text-xl tracking-tight group-hover:text-[var(--accent)] transition-colors">
                {profile.name}
              </span>
            </button>

            <ul className="hidden md:flex items-center gap-8">
              {sectionNav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSectionNavigation(item.id)}
                    className={`text-sm font-medium transition-colors relative py-2 cursor-pointer ${
                      activeSection === item.id
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-muted)] hover:text-white"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <m.span
                        layoutId="activeSection"
                        className="absolute -bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-white transition-all ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white transition-all ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white transition-all ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </m.nav>

      <m.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {sectionNav.map((item, index) => (
            <m.li
              key={item.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => handleSectionNavigation(item.id)}
                className={`text-2xl font-medium transition-colors cursor-pointer ${
                  activeSection === item.id ? "text-[var(--accent)]" : "text-white hover:text-[var(--accent)]"
                }`}
              >
                {item.label}
              </button>
            </m.li>
          ))}
        </ul>
      </m.div>
    </>
  );
}
