"use client";

import { m } from "framer-motion";
import { FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

interface TimelineItemProps {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  index: number;
}

const cardVariants = {
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

export default function TimelineItem({
  company,
  role,
  dates,
  location,
  bullets,
  index,
}: TimelineItemProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <m.div
      variants={cardVariants}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 sm:pl-10 pb-12 last:pb-0 border-l border-emerald-500/20 group"
    >
      {/* Laser Glow Timeline Dot */}
      <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050507] border-2 border-emerald-500 group-hover:border-emerald-400 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all duration-300 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      </div>

      {/* Card Content */}
      <div className="glass-card p-6 sm:p-7 rounded-2xl relative overflow-hidden">
        {/* Subtle Ambient Card Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FiBriefcase className="text-emerald-400 text-sm" />
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {company}
              </h3>
            </div>
            <p className="text-emerald-400 font-medium text-base sm:text-lg">
              {role}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
              <FiCalendar className="text-emerald-400" />
              {dates}
            </span>
            {location && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] text-[var(--text-dim)]">
                <FiMapPin />
                {location}
              </span>
            )}
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-3">
          {bullets.map((bullet, bulletIndex) => (
            <li
              key={`${company}-${bulletIndex}`}
              className="text-slate-300 text-sm leading-relaxed flex items-start gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 mt-2 shrink-0 group-hover:bg-emerald-400 transition-colors" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </m.div>
  );
}
