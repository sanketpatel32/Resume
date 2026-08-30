import type { SkillsContent } from "@/features/resume/model/types";
import SkillIcon from "@/features/resume/ui/cards/SkillIcon";
import Section from "@/shared/ui/Section";

interface SkillsSectionProps { skills: SkillsContent; }

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section id="skills" number="03" tag="Technical toolkit" title="Tools I use" description="Languages, frameworks, databases, artificial intelligence frameworks, and cloud infrastructure.">
      <div className="skills-list">
        {skills.categories.map((category) => (
          <div className="skill-row" key={category.name}>
            <h3>{category.name}</h3>
            <ul>
              {category.items.map((skill) => <li key={skill}><SkillIcon name={skill} />{skill}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
