"use client";

import { m } from "framer-motion";
import { FiBookOpen, FiCalendar, FiCheck } from "react-icons/fi";
import type { EducationItem } from "@/features/resume/model/types";
import Section from "@/shared/ui/Section";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

interface EducationSectionProps {
  education: EducationItem[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <Section
      id="education"
      number="05"
      tag="ACADEMIC BACKGROUND"
      title="Education & Credentials"
      description="Higher education, engineering degrees, and specialized full-stack software development programs."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {education.map((edu, index) => (
          <m.div
            key={edu.school}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card group p-6 rounded-2xl relative flex flex-col justify-between overflow-hidden"
          >
            {/* Top highlight border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <FiBookOpen size={20} />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  <FiCalendar size={12} className="text-emerald-400" />
                  {edu.dates}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                {edu.school}
              </h3>

              <p className="text-sm text-emerald-400 font-medium mb-4">
                {edu.degree}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              {edu.details.map((detail) => (
                <div key={detail} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <FiCheck className="text-emerald-400 shrink-0" size={14} />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </m.div>
        ))}
      </div>
    </Section>
  );
}
