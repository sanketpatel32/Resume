"use client";

import type { CareerItem } from "@/features/resume/model/types";
import TimelineItem from "@/features/resume/ui/cards/TimelineItem";
import Section from "@/shared/ui/Section";

interface CareerSectionProps {
  career: CareerItem[];
}

export default function CareerSection({ career }: CareerSectionProps) {
  return (
    <Section id="career" title="Career">
      <div className="max-w-3xl">
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
