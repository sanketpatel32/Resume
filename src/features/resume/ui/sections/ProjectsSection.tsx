"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ProjectItem } from "@/features/resume/model/types";
import { getFocusedProjects, workLenses, type WorkFocus } from "@/features/resume/model/work";
import { getStory } from "@/features/resume/content/stories";
import { useExperience } from "@/features/resume/experience/context";
import CaseStudy from "@/features/resume/ui/cards/CaseStudy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProjectsSectionProps {
  projects: ProjectItem[];
  focus: WorkFocus;
  onFocusChange: (focus: WorkFocus) => void;
}

export default function ProjectsSection({ projects, focus, onFocusChange }: ProjectsSectionProps) {
  const root = useRef<HTMLElement>(null);
  const { motion, gl } = useExperience();
  const filteredProjects = getFocusedProjects(projects, focus);
  const entries = filteredProjects.flatMap((project) => {
    const story = getStory(project.name);
    return story ? [{ project, story }] : [];
  });

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !motion) return;

      gsap.fromTo(".work-title-track", { xPercent: 4 }, {
        xPercent: -38,
        ease: "none",
        scrollTrigger: { trigger: ".work-title", start: "top bottom", end: "bottom top", scrub: 0.4 },
      });

      gsap.utils.toArray<HTMLElement>("[data-case-study]", section).forEach((study) => {
        const title = study.querySelector("[data-cs-title]");
        const frame = study.querySelector(".cs-visual-frame");
        const number = study.querySelector("[data-cs-number]");
        const blocks = study.querySelectorAll("[data-cs-reveal]");

        if (title) {
          gsap.fromTo(title, { yPercent: 105, clipPath: "inset(0% 0% 100% 0%)" }, {
            yPercent: 0,
            clipPath: "inset(0% 0% -10% 0%)",
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: study, start: "top 78%", toggleActions: "play none none reverse" },
          });
        }
        if (frame && !gl) {
          gsap.fromTo(frame, { clipPath: "inset(14% 10% 14% 10%)", scale: 1.08 }, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top 95%", end: "top 35%", scrub: 0.6 },
          });
        }
        if (number) {
          gsap.fromTo(number, { yPercent: 30 }, {
            yPercent: -40,
            ease: "none",
            scrollTrigger: { trigger: study, start: "top bottom", end: "bottom top", scrub: 0.4 },
          });
        }
        if (blocks.length) {
          gsap.fromTo(blocks, { y: 48, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: blocks[0], start: "top 88%", toggleActions: "play none none reverse" },
          });
        }
      });
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [motion, gl, focus], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="projects" className="chapter work" data-chapter="The work" data-tone="work" aria-labelledby="work-heading">
      <div className="work-title" aria-hidden="true">
        <div className="work-title-track">
          <span>Selected work</span>
          <span className="is-outline">Selected work</span>
        </div>
      </div>

      <div className="resume-container work-intro">
        <p className="chapter-tag"><span>L2</span> The work</p>
        <h2 id="work-heading" className="work-heading">Seven builds. Every layer.</h2>
        <p className="work-lead">
          Two private products I built end to end, and open tools I ship for developers. Each one below is a
          complete slice of the stack: the problem, what I built, the stack and what it changed.
        </p>
        <div className="work-index-bar">
          <div className="project-filters" role="group" aria-label="Filter projects">
            {workLenses.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={focus === item.id}
                onClick={() => onFocusChange(item.id)}
                className={`filter-button filter-${item.id} ${focus === item.id ? "is-active" : ""}`}
                data-magnetic="0.2"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="work-count" aria-live="polite">
            {String(entries.length).padStart(2, "0")} projects
          </p>
        </div>
      </div>

      <div className="resume-container case-studies">
        {entries.map(({ project, story }, index) => (
          <CaseStudy key={project.name} project={project} story={story} index={index} total={entries.length} />
        ))}
      </div>
    </section>
  );
}
