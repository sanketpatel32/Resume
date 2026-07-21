"use client";

import { m } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar, FiFolder } from "react-icons/fi";
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
  isFeatured?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function ProjectCard({
  name,
  description,
  tech,
  links,
  index,
  isFeatured = false,
}: ProjectCardProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <m.article
      variants={cardVariants}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08 }}
      className={`glass-card group relative p-7 rounded-2xl flex flex-col justify-between overflow-hidden ${
        isFeatured ? "md:col-span-2 border-emerald-500/30 bg-emerald-500/[0.02]" : ""
      }`}
    >
      {/* Top ambient line highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Card Header & Links */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">
              <FiFolder size={20} />
            </div>
            <div>
              {isFeatured && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full mb-1">
                  <FiStar size={10} className="fill-emerald-400" /> Featured System
                </span>
              )}
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
                aria-label="GitHub repository"
              >
                <FiGithub size={18} />
              </a>
            )}
            {links.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer"
                aria-label="Live preview"
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Project Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
        {tech.map((item) => (
          <span
            key={item}
            className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-white/[0.03] border border-white/10 rounded-md hover:border-emerald-500/40 hover:text-emerald-300 transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </m.article>
  );
}
