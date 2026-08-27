"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { FiDownload, FiGithub, FiArrowUpRight, FiCode, FiLayers, FiTerminal } from "react-icons/fi";
import type { ContactInfo, Profile } from "@/features/resume/model/types";
import { scrollToSection } from "@/shared/lib/scroll";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

interface AboutSectionProps {
  profile: Profile;
  contact: ContactInfo;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function AboutSection({ profile, contact }: AboutSectionProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-28 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10">
        <m.div
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate="visible"
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-8">
            <m.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full-Stack Developer &amp; Backend Specialist</span>
            </m.div>

            <m.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              {profile.name}
              <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-300 mt-3 font-sans">
                Building robust systems with <span className="gradient-text-emerald">precision &amp; elegance.</span>
              </span>
            </m.h1>

            <m.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--text-muted)] font-normal leading-relaxed max-w-2xl"
            >
              {profile.summary}
            </m.p>

            {/* Highlights Tags */}
            <m.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
              {profile.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-white/[0.03] border border-white/10 rounded-lg hover:border-emerald-500/40 hover:text-emerald-300 transition-colors cursor-default"
                >
                  {highlight}
                </span>
              ))}
            </m.div>

            {/* CTA Action Buttons */}
            <m.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="px-7 py-3.5 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all cursor-pointer flex items-center gap-2 text-sm group"
              >
                Get in Touch
                <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <Link
                href="/resume.pdf"
                download="Sanket_Patel_Resume.pdf"
                className="px-6 py-3.5 border border-white/15 rounded-xl font-medium text-slate-200 hover:bg-white/5 hover:border-white/30 transition-all flex items-center gap-2 text-sm cursor-pointer glass-panel"
              >
                <FiDownload className="text-emerald-400" />
                Download CV
              </Link>

              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-white/15 rounded-xl text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all glass-panel"
                  aria-label="GitHub"
                >
                  <FiGithub size={18} />
                </a>
              )}
            </m.div>
          </div>

          {/* Quick Metrics & Expertise Card Column */}
          <m.div variants={itemVariants} className="lg:col-span-4 space-y-4">
            <h2 className="sr-only">Core Qualifications &amp; Highlights</h2>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FiCode size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Full-Stack Core</h3>
                  <p className="text-xs text-[var(--text-muted)]">Node.js • React • TypeScript</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl font-bold font-mono text-emerald-400">1+ Yrs</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Software Dev Exp</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl font-bold font-mono text-emerald-400">5+</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Shipped Projects</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl font-bold font-mono text-emerald-400">97.8%ile</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">JEE Mains</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-2xl font-bold font-mono text-emerald-400">BIT Mesra</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">B.Tech Alumni</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <FiTerminal className="text-emerald-400" /> API & Cloud First
                </span>
                <span className="flex items-center gap-1.5">
                  <FiLayers className="text-emerald-400" /> Clean Architecture
                </span>
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
