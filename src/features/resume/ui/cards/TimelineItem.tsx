"use client";

import { m } from "framer-motion";
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
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    x: 5,
    scale: 1.01,
    boxShadow: "0 0 50px rgba(110, 231, 183, 0.1)",
    transition: { duration: 0.3 },
  },
};

const dotVariants = {
  hover: {
    scale: 1.5,
    boxShadow: "0 0 30px var(--accent)",
    transition: { duration: 0.3 },
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px", amount: 0.3 }}
      whileHover={!shouldReduceMotion ? "hover" : undefined}
      transition={{ delay: index * 0.15 }}
      className="relative pl-10 pb-14 last:pb-0 border-l-2 border-white/10 group cursor-default"
    >
      {/* Animated timeline dot */}
      <m.div
        variants={dotVariants}
        className="absolute left-0 top-2 w-4 h-4 -translate-x-[9px] rounded-full bg-gradient-to-br from-[var(--accent)] to-emerald-600 group-hover:shadow-[0_0_25px_var(--accent)] transition-all duration-300 flex items-center justify-center"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
      </m.div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <m.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        />
      </div>

      <m.div
        className="relative p-7 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-[var(--accent)]/40 hover:shadow-[0_0_40px_rgba(110,231,183,0.08)] transition-all duration-300 backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors duration-300">{company}</h3>
            <p className="text-[var(--accent)] font-medium text-base md:text-lg mt-1">{role}</p>
          </div>
          <div className="text-sm text-[var(--text-muted)] md:text-right space-y-1">
            <p className="font-medium">{dates}</p>
            {location && <p>{location}</p>}
          </div>
        </div>
        <ul className="space-y-3">
          {bullets.map((bullet, bulletIndex) => (
            <m.li
              key={`${company}-${bulletIndex}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + bulletIndex * 0.1, duration: 0.4 }}
              className="text-[var(--text-muted)] text-sm leading-relaxed flex gap-3 group/bullet"
            >
              <span className="text-[var(--accent)] mt-1.5 shrink-0 group-hover/bullet:scale-125 transition-transform duration-200">{"\u2022"}</span>
              <span className="group-hover/bullet:text-white transition-colors duration-200">{bullet}</span>
            </m.li>
          ))}
        </ul>
      </m.div>
    </m.div>
  );
}
