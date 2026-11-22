"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { SkillsContent } from "@/features/resume/model/types";
import { useExperience } from "@/features/resume/experience/context";
import SkillIcon from "@/features/resume/ui/cards/SkillIcon";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SkillsSectionProps {
  skills: SkillsContent;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const root = useRef<HTMLElement>(null);
  const { motion } = useExperience();

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !motion) return;
      gsap.utils.toArray<HTMLElement>(".toolkit-track", section).forEach((track, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        gsap.fromTo(track, { xPercent: direction < 0 ? 0 : -30 }, {
          xPercent: direction < 0 ? -30 : 0,
          ease: "none",
          scrollTrigger: { trigger: track, start: "top bottom", end: "bottom top", scrub: 0.5 },
        });
      });
      gsap.fromTo(".toolkit-heading", { yPercent: 40, opacity: 0 }, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
      });
    },
    { scope: root, dependencies: [motion], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="skills" className="chapter chapter-coral toolkit" data-chapter="The toolkit" data-tone="work" aria-labelledby="skills-heading">
      <div className="resume-container toolkit-intro">
        <p className="chapter-tag"><span>L4</span> The toolkit</p>
        <h2 id="skills-heading" className="toolkit-heading">Tools I reach for</h2>
        <p>Languages, frameworks, data stores, AI tooling and cloud: the parts every layer is made of.</p>
      </div>
      <div className="toolkit-rows">
        {skills.categories.map((category) => (
          <div className="toolkit-row" key={category.name}>
            <h3 className="toolkit-category">{category.name}</h3>
            <div className="toolkit-viewport">
              <ul className="toolkit-track">
                {[...category.items, ...category.items].map((skill, index) => (
                  <li key={`${skill}-${index}`} aria-hidden={index >= category.items.length ? true : undefined}>
                    <SkillIcon name={skill} />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
