"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { CareerItem, EducationItem } from "@/features/resume/model/types";
import { buildPath } from "@/features/resume/model/path";
import { useExperience } from "@/features/resume/experience/context";
import { DESKTOP } from "@/features/resume/experience/useMedia";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CareerSectionProps {
  career: CareerItem[];
  education: EducationItem[];
}

export default function CareerSection({ career, education }: CareerSectionProps) {
  const root = useRef<HTMLElement>(null);
  const { motion } = useExperience();
  const milestones = buildPath(career, education);

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !motion) return;
      const media = gsap.matchMedia(section);

      media.add(DESKTOP, () => {
        const track = section.querySelector<HTMLElement>(".path-track");
        if (!track) return;
        section.classList.add("is-horizontal");
        const distance = () => track.scrollWidth - window.innerWidth;

        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: ".path-pin",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(".path-line-fill", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: 0.6, invalidateOnRefresh: true },
        });

        gsap.utils.toArray<HTMLElement>(".milestone", section).forEach((milestone) => {
          gsap.fromTo(milestone.querySelectorAll(".milestone-year, .milestone-copy"), { y: 80, opacity: 0.1 }, {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: milestone, containerAnimation: scroll, start: "left 85%", end: "left 45%", scrub: 0.5 },
          });
          ScrollTrigger.create({
            trigger: milestone,
            containerAnimation: scroll,
            start: "left 60%",
            onToggle: (self) => milestone.classList.toggle("is-lit", self.isActive || self.progress > 0),
          });
        });

        return () => section.classList.remove("is-horizontal");
      });

      media.add(`not ${DESKTOP}`, () => {
        gsap.fromTo(".path-line-fill", { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".path-track", start: "top 70%", end: "bottom 70%", scrub: 0.5 },
        });
        gsap.utils.toArray<HTMLElement>(".milestone", section).forEach((milestone) => {
          gsap.fromTo(milestone, { y: 60, opacity: 0.15 }, {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: milestone, start: "top 90%", end: "top 55%", scrub: 0.5 },
          });
        });
      });

      return () => media.revert();
    },
    { scope: root, dependencies: [motion], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="career" className="chapter chapter-cornflower path" data-chapter="The path" data-tone="work" aria-labelledby="career-heading">
      <div className="path-pin">
        <div className="path-track">
          <header className="path-intro">
            <p className="chapter-tag"><span>L3</span> The path</p>
            <h2 id="career-heading">Experience</h2>
            <p>
              Mechanical engineering, then data science, then full-stack products: the route that led to
              building the whole thing.
            </p>
          </header>
          <div className="path-line" aria-hidden="true"><span className="path-line-fill" /></div>
          <ol className="path-list">
            {milestones.map((milestone) => (
              <li className={`milestone milestone-${milestone.kind}`} key={`${milestone.place}-${milestone.dates}`}>
                <span className="milestone-node" aria-hidden="true" />
                <p className="milestone-year" aria-hidden="true">{milestone.year}</p>
                <div className="milestone-copy">
                  <p className="milestone-dates">
                    {milestone.dates}
                    {milestone.location ? ` · ${milestone.location}` : ""}
                    <span className="milestone-kind">{milestone.kind === "work" ? "Role" : "Study"}</span>
                  </p>
                  <h3>{milestone.place}</h3>
                  <p className="milestone-title">{milestone.title}</p>
                  <ul>
                    {milestone.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <p className="path-now" aria-hidden="true">Now: building the whole thing →</p>
        </div>
      </div>
    </section>
  );
}
