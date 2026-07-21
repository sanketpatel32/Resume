"use client";

import { m } from "framer-motion";
import type { SkillsContent } from "@/features/resume/model/types";
import SkillIcon, { CategoryIcon } from "@/features/resume/ui/cards/SkillIcon";
import Section from "@/shared/ui/Section";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

interface SkillsSectionProps {
  skills: SkillsContent;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <Section
      id="skills"
      number="03"
      tag="TECHNICAL PROFICIENCY"
      title="Skills & Ecosystem"
      description="Languages, frameworks, databases, artificial intelligence frameworks, and cloud infrastructure."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.categories.map((category, index) => (
          <m.div
            key={category.name}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="glass-card group p-6 rounded-2xl relative overflow-hidden"
          >
            {/* Ambient card top border glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <CategoryIcon category={category.name} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {category.name}
                </h3>
                <span className="text-[11px] font-mono text-[var(--text-dim)]">
                  {category.items.length} Technologies
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all cursor-default group/skill"
                >
                  <SkillIcon name={skill} />
                  <span className="text-xs font-medium text-slate-200 group-hover/skill:text-emerald-200 transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </m.div>
        ))}
      </div>
    </Section>
  );
}
