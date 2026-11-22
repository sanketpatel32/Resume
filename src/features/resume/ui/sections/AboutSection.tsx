"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowDown, FiArrowUpRight, FiMinus, FiPlus } from "react-icons/fi";
import type { ContactInfo, Profile } from "@/features/resume/model/types";
import { workLenses, type WorkFocus } from "@/features/resume/model/work";
import { afterIntro } from "@/features/resume/experience/intro";
import { useExperience } from "@/features/resume/experience/context";
import { DESKTOP } from "@/features/resume/experience/useMedia";
import SplitText from "@/features/resume/ui/descent/SplitText";
import { scrollToSection } from "@/shared/lib/scroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AboutSectionProps {
  profile: Profile;
  contact: ContactInfo;
  focus: WorkFocus;
  onFocusChange: (focus: WorkFocus) => void;
}

const HEADLINE = ["I build", "the whole", "thing."];

/** Corners of a rotated element, relative to `frame`, as a CSS polygon. */
function polygonFor(element: HTMLElement, frame: HTMLElement) {
  const frameRect = frame.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  const angle = (Number(element.dataset.tilt) * Math.PI) / 180;
  const w = element.offsetWidth / 2;
  const h = element.offsetHeight / 2;
  const cx = rect.left + rect.width / 2 - frameRect.left;
  const cy = rect.top + rect.height / 2 - frameRect.top;
  const corners = [
    [-w, -h],
    [w, -h],
    [w, h],
    [-w, h],
  ].map(([x, y]) => [cx + x * Math.cos(angle) - y * Math.sin(angle), cy + x * Math.sin(angle) + y * Math.cos(angle)]);
  return `polygon(${corners.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(", ")})`;
}

export default function AboutSection({ profile, contact, focus, onFocusChange }: AboutSectionProps) {
  const root = useRef<HTMLElement>(null);
  const { motion, finePointer } = useExperience();

  useGSAP(
    (_, contextSafe) => {
      const section = root.current;
      if (!section || !motion || !contextSafe) return;

      const chars = gsap.utils.toArray<HTMLElement>(".hero-title [data-split-unit]", section);
      const slices = gsap.utils.toArray<HTMLElement>(".stack-slice", section);
      const reveals = gsap.utils.toArray<HTMLElement>(".hero-reveal", section);
      gsap.set(chars, { yPercent: 115 });
      gsap.set(slices, { xPercent: 70, opacity: 0, rotate: 0 });
      gsap.set(reveals, { y: 24, opacity: 0 });

      const removeIntroListener = afterIntro(
        contextSafe(() => {
          gsap
            .timeline({ defaults: { ease: "expo.out" }, onComplete: () => ScrollTrigger.refresh() })
            .to(chars, { yPercent: 0, duration: 1.1, stagger: 0.028 }, 0)
            .to(slices, { xPercent: 0, opacity: 1, rotate: (index) => [-4, 2, -2][index] ?? 0, duration: 1.2, stagger: 0.09 }, 0.15)
            .to(reveals, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 0.45);
        }),
      );

      const cleanups: Array<() => void> = [removeIntroListener];

      if (finePointer) {
        const rig = section.querySelector<HTMLElement>(".stack-rig");
        const rotateX = rig ? gsap.quickTo(rig, "rotationX", { duration: 0.8, ease: "power3" }) : null;
        const rotateY = rig ? gsap.quickTo(rig, "rotationY", { duration: 0.8, ease: "power3" }) : null;
        const lifts = chars.map((char) => gsap.quickTo(char, "y", { duration: 0.5, ease: "power3" }));

        const onMove = (event: PointerEvent) => {
          if (window.scrollY > window.innerHeight * 0.4) return;
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          rotateY?.(nx * 16);
          rotateX?.(-ny * 12);
          chars.forEach((char, index) => {
            const rect = char.getBoundingClientRect();
            const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
            lifts[index](-Math.max(0, 1 - distance / 220) * 26);
          });
        };
        section.addEventListener("pointermove", onMove);
        cleanups.push(() => section.removeEventListener("pointermove", onMove));
      }

      const media = gsap.matchMedia(section);
      media.add(DESKTOP, () => {
        const curtain = section.querySelector<HTMLElement>(".hero-curtain");
        const citron = section.querySelector<HTMLElement>(".stack-slice-interfaces");
        const stage = section.querySelector<HTMLElement>(".hero-pin");
        if (!curtain || !citron || !stage) return;

        const exit = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%",
            pin: stage,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        exit
          .to(".stack-rig", { rotationX: 0, rotationY: 0, duration: 0.1 }, 0)
          .to(".whole-intro", { xPercent: -18, opacity: 0, ease: "power2.in", duration: 0.45 }, 0)
          .to(".whole-baseline", { yPercent: 100, opacity: 0, duration: 0.3 }, 0)
          .to(".stack-slice-systems", { xPercent: 130, rotate: 14, duration: 0.45, ease: "power2.in" }, 0.02)
          .to(".stack-slice-tools", { xPercent: 150, rotate: -12, duration: 0.45, ease: "power2.in" }, 0.06)
          .to(".stack-invitation", { opacity: 0, duration: 0.15 }, 0)
          .fromTo(curtain, { opacity: 0 }, { opacity: 1, duration: 0.01, immediateRender: false }, 0.2)
          .to(citron, { opacity: 0, duration: 0.01 }, 0.21)
          .fromTo(
            curtain,
            { clipPath: () => polygonFor(citron, stage) },
            { clipPath: () => `polygon(0px 0px, ${stage.offsetWidth}px 0px, ${stage.offsetWidth}px ${stage.offsetHeight}px, 0px ${stage.offsetHeight}px)`, ease: "power3.inOut", duration: 0.75 },
            0.2,
          )
          .fromTo(".hero-curtain-copy", { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 0.62);
      });
      cleanups.push(() => media.revert());

      return () => cleanups.forEach((cleanup) => cleanup());
    },
    { scope: root, dependencies: [motion, finePointer], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      id="about"
      className="hero-section whole-hero"
      aria-label={`${profile.name}, ${profile.title}`}
      data-chapter="Surface"
      data-tone="surface"
    >
      <div className="hero-pin">
        <div className="resume-container whole-stage">
          <div className="whole-intro">
            <h1 className="display-heading hero-title">
              {HEADLINE.map((line, index) => (
                <span className={`hero-line ${index === HEADLINE.length - 1 ? "hero-line-accent" : ""}`} key={line}>
                  <SplitText text={line} />
                  {index < HEADLINE.length - 1 ? " " : null}
                </span>
              ))}
            </h1>
            <p className="hero-reveal">From the first interface to the systems behind it.</p>
            <div className="hero-actions hero-reveal">
              <button type="button" onClick={() => scrollToSection("projects")} className="button button-primary" data-magnetic="0.3" data-cursor="Dive">
                Explore the work <FiArrowDown aria-hidden="true" />
              </button>
              <Link href="/resume.pdf" download="Sanket_Patel_Resume.pdf" className="text-link" data-magnetic="0.25">
                Get my résumé <FiArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="stack-explorer" role="group" aria-label="Explore my work by layer">
            <div className="stack-rig">
              {workLenses.filter((lens) => lens.id !== "all").map((lens, index) => {
                const expanded = focus === lens.id;
                return (
                  <div className={`stack-slice stack-slice-${lens.id}`} key={lens.id} data-tilt={[-4, 2, -2][index]}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`layer-${lens.id}`}
                      onClick={() => onFocusChange(expanded ? "all" : lens.id)}
                      data-cursor={expanded ? "Close" : "Open"}
                    >
                      <span>{lens.label}</span>
                      {expanded ? <FiMinus aria-hidden="true" /> : <FiPlus aria-hidden="true" />}
                    </button>
                    <div id={`layer-${lens.id}`} className="stack-slice-detail" hidden={!expanded}>
                      <p>{lens.description}</p>
                      <button type="button" className="slice-work-link" onClick={() => scrollToSection("projects")}>
                        Explore this layer <FiArrowDown aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="stack-invitation hero-reveal">Open a layer. See what’s behind it.</p>
          </div>
        </div>
        <div className="resume-container whole-baseline hero-reveal">
          <p>{profile.name} / {profile.title}</p>
          <p>{contact.location}</p>
          <span aria-hidden="true">Scroll to descend. Built from scratch, all the way through.</span>
        </div>
        <div className="hero-curtain" aria-hidden="true">
          <p className="hero-curtain-copy">Layer 01 — going under the surface</p>
        </div>
      </div>
    </section>
  );
}
