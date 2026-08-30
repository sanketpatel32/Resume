import type { EducationItem } from "@/features/resume/model/types";
import Section from "@/shared/ui/Section";

interface EducationSectionProps { education: EducationItem[]; }

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <Section id="education" number="05" tag="Education" title="Education" description="Engineering foundations and focused full-stack software development study.">
      <div className="education-list">
        {education.map((edu) => (
          <article className="education-row" key={edu.school}>
            <span className="education-dates">{edu.dates}</span>
            <div><h3>{edu.school}</h3><p>{edu.degree}</p>{edu.details.map((detail) => <span className="education-detail" key={detail}>{detail}</span>)}</div>
          </article>
        ))}
      </div>
    </Section>
  );
}
