"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { finishIntro } from "@/features/resume/experience/intro";

gsap.registerPlugin(useGSAP);

/**
 * Loader moment: the three layers from the hero drop into a stack while a
 * counter runs, then the stack is pulled away like a curtain.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;
      const skip =
        document.documentElement.dataset.intro === "skip" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (skip) {
        element.style.display = "none";
        finishIntro();
        return;
      }

      document.documentElement.classList.add("is-intro");
      const counter = element.querySelector<HTMLElement>("[data-intro-count]");
      const progress = { value: 0 };
      const bars = gsap.utils.toArray<HTMLElement>("[data-intro-bar]", element);

      const timeline = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          element.style.display = "none";
          document.documentElement.classList.remove("is-intro");
        },
      });

      timeline
        .from(bars, { yPercent: -260, rotate: (index) => [-14, 10, -8][index] ?? 0, opacity: 0, duration: 0.9, stagger: 0.14, ease: "back.out(1.5)" }, 0.1)
        .from("[data-intro-label]", { yPercent: 120, opacity: 0, duration: 0.6 }, 0.2)
        .to(progress, {
          value: 100,
          duration: 1.35,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
          },
        }, 0)
        .to(bars, { scaleX: 1.08, rotate: 0, duration: 0.35, ease: "power3.inOut", stagger: 0.04 }, 1.25)
        .to(bars, { yPercent: (index) => [-900, -700, -500][index] ?? -600, duration: 0.7, ease: "expo.in", stagger: 0.05 }, 1.55)
        .to("[data-intro-label], [data-intro-meta]", { opacity: 0, duration: 0.25 }, 1.55)
        .add(() => finishIntro(), 1.95)
        .to(element, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85, ease: "expo.inOut" }, 1.85);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div className="intro-stack">
        <span className="intro-bar intro-bar-interfaces" data-intro-bar>Interfaces</span>
        <span className="intro-bar intro-bar-systems" data-intro-bar>Systems</span>
        <span className="intro-bar intro-bar-tools" data-intro-bar>Developer tools</span>
      </div>
      <p className="intro-label" data-intro-label>Assembling the whole thing</p>
      <p className="intro-meta" data-intro-meta>
        <span data-intro-count>000</span>
        <span>Sanket Patel / Software Developer</span>
      </p>
    </div>
  );
}
