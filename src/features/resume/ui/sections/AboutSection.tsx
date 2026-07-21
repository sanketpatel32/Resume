"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { FiDownload, FiGithub } from "react-icons/fi";
import type { ContactInfo, Profile } from "@/features/resume/model/types";
import { scrollToSection } from "@/shared/lib/scroll";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

interface AboutSectionProps {
  profile: Profile;
  contact: ContactInfo;
}

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const highlightVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "backOut",
    },
  },
  hover: {
    scale: 1.05,
    y: -3,
    boxShadow: "0 10px 30px rgba(110, 231, 183, 0.2)",
    transition: { duration: 0.3 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 0 40px rgba(110, 231, 183, 0.4)",
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

export default function AboutSection({ profile, contact }: AboutSectionProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl"
        />
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10">
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <m.p
            variants={itemVariants}
            className="text-[var(--accent)] font-medium mb-4 flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            Hello, I&apos;m
          </m.p>

          <m.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight gradient-text"
          >
            {profile.name}
          </m.h1>

          <m.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl text-[var(--text-muted)] font-medium mb-8"
          >
            {profile.title}
          </m.h2>

          <m.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-10 max-w-2xl"
          >
            {profile.summary}
          </m.p>

          <m.div
            variants={containerVariants}
            className="flex flex-wrap gap-3 mb-12"
          >
            {profile.highlights.map((highlight, index) => (
              <m.span
                key={highlight}
                custom={index}
                variants={highlightVariants}
                initial="hidden"
                animate="visible"
                whileHover={!shouldReduceMotion ? "hover" : undefined}
                className="px-5 py-2.5 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full hover:border-[var(--accent)]/50 cursor-default backdrop-blur-sm"
                style={{
                  transitionDelay: `${0.7 + index * 0.1}s`,
                }}
              >
                {highlight}
              </m.span>
            ))}
          </m.div>

          <m.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <m.button
              onClick={() => scrollToSection("contact")}
              variants={buttonVariants}
              whileHover={!shouldReduceMotion ? "hover" : undefined}
              whileTap={!shouldReduceMotion ? "tap" : undefined}
              className="px-8 py-4 bg-[var(--accent)] text-black font-semibold rounded-lg cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </m.button>
            
            <m.div
              variants={buttonVariants}
              whileHover={!shouldReduceMotion ? "hover" : undefined}
              whileTap={!shouldReduceMotion ? "tap" : undefined}
            >
              <Link
                href="/resume.pdf"
                download="Sanket_Patel_Resume.pdf"
                className="px-8 py-4 border border-white/10 rounded-lg font-semibold text-white hover:bg-white/5 hover:border-[var(--accent)]/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer backdrop-blur-sm"
              >
                <m.span
                  animate={!shouldReduceMotion ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <FiDownload />
                </m.span>
                Download CV
              </Link>
            </m.div>

            {contact.github && (
              <m.a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                variants={buttonVariants}
                whileHover={!shouldReduceMotion ? "hover" : undefined}
                whileTap={!shouldReduceMotion ? "tap" : undefined}
                className="p-4 border border-white/10 rounded-lg hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all duration-300 cursor-pointer backdrop-blur-sm"
                aria-label="GitHub"
              >
                <FiGithub size={22} />
              </m.a>
            )}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
