"use client";

import { m } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

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

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    hover: {
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 60px rgba(110, 231, 183, 0.15)",
        transition: { duration: 0.3 },
    },
};

const iconVariants = {
    hover: {
        rotate: [0, -10, 10, 0],
        scale: 1.2,
        transition: { duration: 0.4 },
    },
};

export default function ProjectCard({
    name,
    description,
    tech,
    links,
    index,
}: ProjectCardProps) {
    const shouldReduceMotion = useHydratedReducedMotion();

    return (
        <m.article
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px", amount: 0.3 }}
            whileHover={!shouldReduceMotion ? "hover" : undefined}
            transition={{ delay: index * 0.15 }}
            className="group relative p-7 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-[var(--accent)]/40 hover:shadow-[0_0_50px_rgba(110,231,183,0.12)] transition-all duration-300 overflow-hidden backdrop-blur-sm"
        >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[var(--accent)]/5 to-transparent rounded-full blur-3xl" />
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <m.div
                    initial={{ x: "-100%", y: "-100%" }}
                    whileHover={{ x: "100%", y: "100%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"
                />
            </div>

            <div className="relative flex items-start justify-between gap-4 mb-5">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors duration-300">
                    {name}
                </h3>
                <div className="flex items-center gap-3 shrink-0">
                    {links.github && (
                        <m.a
                            href={links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={iconVariants}
                            whileHover={!shouldReduceMotion ? "hover" : undefined}
                            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-2 rounded-lg hover:bg-white/5"
                            aria-label="View GitHub repository"
                        >
                            <FiGithub size={22} />
                        </m.a>
                    )}
                    {links.live && (
                        <m.a
                            href={links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={iconVariants}
                            whileHover={!shouldReduceMotion ? "hover" : undefined}
                            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-2 rounded-lg hover:bg-white/5"
                            aria-label="View live project"
                        >
                            <FiExternalLink size={22} />
                        </m.a>
                    )}
                </div>
            </div>

            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 line-clamp-3">
                {description}
            </p>

            <div className="flex flex-wrap gap-2">
                {tech.map((item, techIndex) => (
                    <m.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + techIndex * 0.05, duration: 0.3 }}
                        whileHover={!shouldReduceMotion ? { scale: 1.05, y: -2 } : {}}
                        className="px-3 py-1.5 text-xs font-medium text-[var(--accent)] bg-[var(--accent-dim)] rounded-full cursor-default border border-[var(--accent)]/20 hover:border-[var(--accent)]/40 transition-colors"
                    >
                        {item}
                    </m.span>
                ))}
            </div>
        </m.article>
    );
}
