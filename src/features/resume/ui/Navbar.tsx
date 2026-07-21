"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
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
      setIsScrolled(window.scrollY > 40);

      const sections = sectionNav.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 220;

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
      <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 pointer-events-none">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <m.nav
            initial={shouldReduceMotion ? {} : { y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-500 ${
              isScrolled
                ? "bg-[#0a0a0f]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                : "bg-black/30 backdrop-blur-md border border-white/5"
            }`}
          >
            {/* Logo Brand */}
            <button
              type="button"
              className="flex items-center gap-3 cursor-pointer group bg-transparent border-0 p-0 text-left"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 group-hover:border-[var(--accent)] transition-colors">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  loading="eager"
                  sizes="32px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm tracking-tight group-hover:text-[var(--accent-light)] transition-colors">
                  {profile.name}
                </span>
                <span className="text-[10px] text-[var(--text-dim)] font-mono tracking-wider">
                  FULL-STACK DEV
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
              {sectionNav.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSectionNavigation(item.id)}
                      className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                        isActive
                          ? "text-white"
                          : "text-[var(--text-muted)] hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <m.span
                          layoutId="activePill"
                          className="absolute inset-0 bg-[var(--accent-dim)] border border-[var(--accent-border)] rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Status Indicator / Contact CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for roles
              </span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-white rounded transition-all ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white rounded transition-all ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-white rounded transition-all ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </m.nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#050507]/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center px-6"
          >
            <ul className="flex flex-col items-center gap-6 text-center">
              {sectionNav.map((item, index) => (
                <m.li
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleSectionNavigation(item.id)}
                    className={`text-xl font-medium tracking-wide transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? "text-[var(--accent-light)] font-semibold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                </m.li>
              ))}
            </ul>

            <div className="mt-12 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for software engineer roles
              </span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
