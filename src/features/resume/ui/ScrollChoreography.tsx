"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollChoreography() {
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useHydratedReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      const chapters = gsap.utils.toArray<HTMLElement>("[data-scroll-section]");

      chapters.forEach((chapter) => {
        const heading = chapter.querySelector<HTMLElement>("[data-scroll-heading]");
        const body = chapter.querySelector<HTMLElement>("[data-scroll-body]");
        const marker = chapter.querySelector<HTMLElement>("[data-scroll-marker]");

        if (!heading || !body) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top 88%",
            end: "top 42%",
            scrub: 0.7,
          },
        });

        if (marker) {
          timeline.fromTo(marker, { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, ease: "none" }, 0);
        }

        timeline
          .fromTo(
            heading,
            { y: 70, opacity: 0.12, clipPath: "inset(0 0 100% 0)" },
            { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", ease: "none" },
            0,
          )
          .fromTo(body, { y: 54, opacity: 0.28 }, { y: 0, opacity: 1, ease: "none" }, 0.12);
      });

      const hero = document.querySelector<HTMLElement>("[data-scroll-hero]");
      const heroCopy = hero?.querySelector<HTMLElement>("[data-hero-copy]");
      const heroArt = hero?.querySelector<HTMLElement>("[data-hero-art]");

      if (hero && heroCopy && heroArt) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          })
          .to(heroCopy, { yPercent: -9, scale: 0.965, opacity: 0.42, ease: "none" }, 0)
          .to(heroArt, { yPercent: 10, scale: 0.92, opacity: 0.72, ease: "none" }, 0);
      }

      const projectShell = document.querySelector<HTMLElement>("[data-project-shell]");
      if (projectShell) {
        gsap.fromTo(
          projectShell,
          { scale: 0.94, clipPath: "inset(4% 3% 4% 3%)" },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: projectShell,
              start: "top 92%",
              end: "top 38%",
              scrub: 0.8,
            },
          },
        );
      }

      const timelineItems = gsap.utils.toArray<HTMLElement>("[data-timeline-item]");
      timelineItems.forEach((item) => {
        gsap.fromTo(
          item,
          { x: 46, opacity: 0.22 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "top 48%",
              scrub: 0.65,
            },
          },
        );
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        const career = document.querySelector<HTMLElement>("[data-career-section]");
        const intro = career?.querySelector<HTMLElement>("[data-career-intro]");
        const list = career?.querySelector<HTMLElement>("[data-career-list]");

        if (!career || !intro || !list) return;

        ScrollTrigger.create({
          trigger: career,
          endTrigger: list,
          start: "top 96px",
          end: "bottom bottom",
          pin: intro,
          pinSpacing: false,
        });
      });

      let settle: gsap.core.Tween | undefined;
      const velocityTrigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const skew = gsap.utils.clamp(-1.5, 1.5, self.getVelocity() / -1100);
          document.documentElement.style.setProperty("--scroll-skew", `${skew}deg`);
          settle?.kill();
          settle = gsap.to(document.documentElement, {
            "--scroll-skew": "0deg",
            duration: 0.45,
            delay: 0.08,
            ease: "power3.out",
          });
        },
      });

      return () => {
        media.revert();
        velocityTrigger.kill();
        settle?.kill();
        document.documentElement.style.removeProperty("--scroll-skew");
      };
    },
    { scope: rootRef, dependencies: [shouldReduceMotion], revertOnUpdate: true },
  );

  return <div ref={rootRef} aria-hidden="true" />;
}
