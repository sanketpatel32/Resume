"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiDownload, FiGithub } from "react-icons/fi";
import type { ContactInfo, Profile } from "@/features/resume/model/types";
import { scrollToSection } from "@/shared/lib/scroll";

interface AboutSectionProps {
  profile: Profile;
  contact: ContactInfo;
}

export default function AboutSection({ profile, contact }: AboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--accent)] font-medium mb-4"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            {profile.name}
          </motion.h1>

          <motion.h2
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl text-[var(--text-muted)] font-medium mb-8"
          >
            {profile.title}
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-[var(--text-muted)] leading-relaxed mb-10 max-w-2xl"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3"
          >
            {profile.highlights.map((highlight, index) => (
              <motion.span
                key={highlight}
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                className="px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full hover:border-[var(--accent)]/50 hover:shadow-[0_0_20px_rgba(110,231,183,0.1)] transition-all duration-300 cursor-default"
              >
                {highlight}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex items-center gap-6"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(110,231,183,0.3)] transition-all duration-300 cursor-pointer"
            >
              Get in Touch
            </button>
            <a
              href="/resume.pdf"
              download="Sanket_Patel_Resume.pdf"
              className="px-6 py-3 border border-white/10 rounded-lg font-semibold text-white hover:bg-white/5 hover:border-[var(--accent)]/50 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <FiDownload className="group-hover:text-[var(--accent)] transition-colors" />
              Download CV
            </a>
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-white/10 rounded-lg hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all duration-300 cursor-pointer"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
