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
      tag="Career history"
      title="Experience"
      description="Professional software engineering and data science roles focused on scalable backend architectures and data systems."
    >
      <div className="career-list">
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
