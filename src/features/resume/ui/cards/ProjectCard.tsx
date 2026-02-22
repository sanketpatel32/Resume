"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

interface ProjectCardProps {
    name: string;
    description: string;
    tech: string[];
    links: {
        live?: string;
        github?: string;
    };
    index: number;
}

export default function ProjectCard({
    name,
    description,
    tech,
    links,
    index,
}: ProjectCardProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
            className="group p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[var(--accent)]/30 hover:shadow-[0_0_40px_rgba(110,231,183,0.08)] transition-all duration-300"
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-[var(--accent)] transition-colors">
                    {name}
                </h3>
                <div className="flex items-center gap-3 shrink-0">
                    {links.github && (
                        <a
                            href={links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="View GitHub repository"
                        >
                            <FiGithub size={20} />
                        </a>
                    )}
                    {links.live && (
                        <a
                            href={links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                            aria-label="View live project"
                        >
                            <FiExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>

            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                {description}
            </p>

            <div className="flex flex-wrap gap-2">
                {tech.map((item) => (
                    <span
                        key={item}
                        className="px-3 py-1 text-xs font-medium text-[var(--accent)] bg-[var(--accent-dim)] rounded-full"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
