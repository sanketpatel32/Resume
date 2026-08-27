"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

interface SectionProps {
  id: string;
  number?: string;
  tag?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Section({
  id,
  number,
  tag,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <section
      id={id}
      className={`min-h-screen py-24 md:py-36 relative ${className}`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10">
        <m.div
          variants={sectionVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Section Category Header */}
          <div className="flex items-center gap-3 mb-3">
            {number && (
              <span className="font-mono text-xs font-semibold text-[var(--accent)] tracking-widest uppercase px-2.5 py-1 rounded bg-[var(--accent-dim)] border border-[var(--accent-border)]">
                {number}
              </span>
            )}
            {tag && (
              <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider uppercase">
                {`// ${tag}`}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white gradient-heading">
                {title}
              </h2>
              {description && (
                <p className="mt-3 text-base md:text-lg text-[var(--text-muted)] max-w-2xl font-normal leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* Subtle line accent */}
            <div className="hidden md:block h-px bg-gradient-to-r from-emerald-500/30 via-white/10 to-transparent flex-1 max-w-xs mb-3" />
          </div>

          {children}
        </m.div>
      </div>
    </section>
  );
}
