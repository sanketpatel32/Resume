"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TimelineItemProps {
    company: string;
    role: string;
    dates: string;
    location: string;
    bullets: string[];
    index: number;
}

export default function TimelineItem({
    company,
    role,
    dates,
    location,
    bullets,
    index,
}: TimelineItemProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 pb-12 last:pb-0 border-l border-white/10 group"
        >
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1.5 rounded-full bg-[var(--accent)] group-hover:shadow-[0_0_20px_var(--accent)] transition-shadow duration-300" />

            <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[var(--accent)]/30 hover:shadow-[0_0_30px_rgba(110,231,183,0.05)] transition-all duration-300"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-white">{company}</h3>
                        <p className="text-[var(--accent)] font-medium">{role}</p>
                    </div>
                    <div className="text-sm text-[var(--text-muted)] md:text-right">
                        <p>{dates}</p>
                        <p>{location}</p>
                    </div>
                </div>
                <ul className="space-y-3">
                    {bullets.map((bullet, i) => (
                        <li
                            key={i}
                            className="text-[var(--text-muted)] text-sm leading-relaxed flex gap-3"
                        >
                            <span className="text-[var(--accent)] mt-1.5 shrink-0">•</span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
}
