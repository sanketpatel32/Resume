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
      number="02"
      kicker="Where the systems meet the job description."
      title="Experience"
      description="Software development and data science roles — APIs, real-time product work, and production constraints."
      className="career-manuscript"
    >
      <div className="career-list career-scroll">
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