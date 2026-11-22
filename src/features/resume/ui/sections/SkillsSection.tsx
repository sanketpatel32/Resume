import type { SkillsContent } from "@/features/resume/model/types";
import SkillIcon from "@/features/resume/ui/cards/SkillIcon";
import Section from "@/shared/ui/Section";

interface SkillsSectionProps {
  skills: SkillsContent;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section
      id="skills"
      number="03"
      kicker="The toolkit behind the whole thing."
      title="Tools I use"
      description="Languages, frameworks, data stores, AI tooling, and cloud — the parts I reach for repeatedly."
      className="skills-specimen"
    >
      <div className="skills-list skills-specimen-grid">
        {skills.categories.map((category) => (
          <div className="skill-row" key={category.name}>
            <h3>{category.name}</h3>
            <ul>
              {category.items.map((skill) => (
                <li key={skill}>
                  <SkillIcon name={skill} />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}