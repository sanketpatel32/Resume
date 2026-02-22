"use client";

import type { EducationItem } from "@/features/resume/model/types";
import TimelineItem from "@/features/resume/ui/cards/TimelineItem";
import Section from "@/shared/ui/Section";

interface EducationSectionProps {
  education: EducationItem[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <Section id="education" title="Education">
      <div className="max-w-3xl">
        {education.map((edu, index) => (
          <TimelineItem
            key={edu.school}
            company={edu.school}
            role={edu.degree}
            dates={edu.dates}
            location=""
            bullets={edu.details}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
