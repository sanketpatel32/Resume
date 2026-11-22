"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useExperience } from "@/features/resume/experience/context";
import { DESKTOP } from "@/features/resume/experience/useMedia";
import SplitText from "@/features/resume/ui/descent/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATEMENT =
  "I take products from the first pixel to the last packet. Candidate portals, voice agents, local scanners and native apps, plus the APIs, data and real-time services underneath. Built from scratch. All the way through.";

const BAND = ["Interfaces", "Systems", "Developer tools"];

export default function ManifestoSection() {
  const root = useRef<HTMLElement>(null);
  const { motion } = useExperience();

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !motion) return;
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-text [data-split-unit]", section);
      const media = gsap.matchMedia(section);

      media.add(DESKTOP, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: section, start: "top top", end: "+=140%", pin: ".manifesto-pin", scrub: 0.5 },
          })
          .fromTo(words, { opacity: 0.12 }, { opacity: 1, stagger: 0.04, ease: "none", duration: 0.3 }, 0)
          .fromTo(".manifesto-band-track", { xPercent: 0 }, { xPercent: -35, ease: "none", duration: words.length * 0.04 + 0.3 }, 0);
      });

      media.add(`not ${DESKTOP}`, () => {
        gsap.fromTo(words, { opacity: 0.15 }, {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".manifesto-text", start: "top 85%", end: "bottom 45%", scrub: 0.5 },
        });
        gsap.fromTo(".manifesto-band-track", { xPercent: 0 }, {
          xPercent: -45,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.5 },
        });
      });

      return () => media.revert();
    },
    { scope: root, dependencies: [motion], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="statement" className="chapter chapter-citron manifesto" data-chapter="Into the stack" data-tone="surface" aria-labelledby="statement-title">
      <div className="manifesto-pin">
        <div className="resume-container manifesto-inner">
          <p className="chapter-tag"><span>L1</span> Into the stack</p>
          <h2 id="statement-title" className="visually-hidden">What I do</h2>
          <p className="manifesto-text">
            <SplitText text={STATEMENT} by="words" />
          </p>
        </div>
        <div className="manifesto-band" aria-hidden="true">
          <div className="manifesto-band-track">
            {[0, 1, 2].flatMap((round) =>
              BAND.map((word) => (
                <span key={`${round}-${word}`}>
                  {word}
                  <i>✦</i>
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
