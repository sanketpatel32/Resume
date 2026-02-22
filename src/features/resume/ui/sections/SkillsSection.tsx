"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillsContent } from "@/features/resume/model/types";
import SkillIcon, { CategoryIcon } from "@/features/resume/ui/cards/SkillIcon";
import Section from "@/shared/ui/Section";

interface SkillsSectionProps {
  skills: SkillsContent;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
            className="group p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-[var(--accent)]/40 hover:shadow-[0_0_40px_rgba(110,231,183,0.08)] transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-white">
                <CategoryIcon category={category.name} />
              </span>
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {category.items.map((skill) => (
                <motion.div
                  key={skill}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default"
                >
                  <span className="text-white/70 shrink-0">
                    <SkillIcon name={skill} />
                  </span>
                  <span className="text-sm text-white truncate">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
