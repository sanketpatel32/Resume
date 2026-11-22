"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { signals, type Tone } from "@/features/resume/experience/signals";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TICKS = 41;
const MAX_DEPTH = 1024;

function isTone(value: string | undefined): value is Tone {
  return value === "surface" || value === "work" || value === "core";
}

/**
 * The descent's instrument: a depth reading and the current chapter, pinned
 * to the right edge. It also tells the WebGL stage which chapter it is in.
 */
export default function DepthGauge() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;
      const depth = element.querySelector<HTMLElement>("[data-depth]");
      const chapter = element.querySelector<HTMLElement>("[data-chapter-name]");
      const index = element.querySelector<HTMLElement>("[data-chapter-index]");
      const marker = element.querySelector<HTMLElement>("[data-marker]");
      const chapters = Array.from(document.querySelectorAll<HTMLElement>("main [data-chapter]"));

      const progress = ScrollTrigger.create({
        refreshPriority: -1,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (depth) depth.textContent = String(Math.round(self.progress * MAX_DEPTH)).padStart(4, "0");
          if (marker) marker.style.top = `${self.progress * 100}%`;
        },
      });

      const triggers = chapters.map((section, position) =>
        ScrollTrigger.create({
          trigger: section,
          refreshPriority: -1,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (!self.isActive) return;
            if (chapter) chapter.textContent = section.dataset.chapter ?? "";
            if (index) index.textContent = `L${position}`;
            const tone = section.dataset.tone;
            signals.tone = isTone(tone) ? tone : "work";
            signals.coreGlow = tone === "core" ? 1 : 0;
            document.documentElement.dataset.chapter = section.id;
          },
        }),
      );

      return () => {
        progress.kill();
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="depth-gauge" aria-hidden="true">
      <p className="depth-reading">
        <span className="depth-label">Depth</span>
        <span data-depth>0000</span>
        <span className="depth-unit">m</span>
      </p>
      <div className="depth-scale">
        {Array.from({ length: TICKS }, (_, tick) => (
          <span key={tick} className={tick % 5 === 0 ? "is-major" : undefined} />
        ))}
        <span className="depth-marker" data-marker />
      </div>
      <p className="depth-chapter">
        <span data-chapter-index>L0</span>
        <span data-chapter-name>Surface</span>
      </p>
    </div>
  );
}
