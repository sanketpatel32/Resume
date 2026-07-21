"use client";

import type { CareerItem } from "@/features/resume/model/types";
import TimelineItem from "@/features/resume/ui/cards/TimelineItem";
import Section from "@/shared/ui/Section";

interface CareerSectionProps {
  career: CareerItem[];
}

export default function CareerSection({ career }: CareerSectionProps) {
  return (
    <Section
      id="career"
      number="01"
      tag="CAREER HISTORY"
      title="Work Experience"
      description="Professional software engineering and data science roles focused on building scalable backend architectures and data systems."
    >
      <div className="max-w-4xl mx-auto">
        {career.map((job, index) => (
          <TimelineItem
            key={`${job.company}-${job.role}`}
            company={job.company}
            role={job.role}
            dates={job.dates}
            location={job.location}
            bullets={job.bullets}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
