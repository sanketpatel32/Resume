"use client";

import { useEffect, useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

const nodes = [
  { x: 96, y: 110, label: "API" },
  { x: 388, y: 104, label: "UI" },
  { x: 194, y: 286, label: "QUEUE" },
  { x: 424, y: 362, label: "DATA" },
  { x: 110, y: 500, label: "SHIP" },
];

export default function SignalField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: fieldRef,
    offset: ["start end", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        field.dataset.visible = String(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "120px" },
    );

    observer.observe(field);
    return () => observer.disconnect();
  }, []);

  const updateCrosshair = (clientX: number, clientY: number) => {
    const field = fieldRef.current;
    if (!field) return;

    const bounds = field.getBoundingClientRect();
    field.style.setProperty("--signal-x", `${clientX - bounds.left}px`);
    field.style.setProperty("--signal-y", `${clientY - bounds.top}px`);
  };

  const resetCrosshair = () => {
    const field = fieldRef.current;
    if (!field) return;

    field.classList.remove("is-tracking");
    const bounds = field.getBoundingClientRect();
    field.style.setProperty("--signal-x", `${bounds.width / 2}px`);
    field.style.setProperty("--signal-y", `${bounds.height / 2}px`);
  };

  return (
    <m.div
      ref={fieldRef}
      onPointerEnter={() => fieldRef.current?.classList.add("is-tracking")}
      onPointerMove={(event) => updateCrosshair(event.clientX, event.clientY)}
      onPointerLeave={resetCrosshair}
      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.36, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="signal-field signal-grid relative aspect-[4/5] min-h-[27rem] overflow-hidden border-x border-[var(--ink)] md:aspect-[3/2] lg:aspect-[4/5] lg:min-h-[36rem]"
      data-visible="true"
      aria-hidden="true"
    >
      <m.svg
        viewBox="0 0 520 650"
        className="absolute inset-0 h-full w-full"
        fill="none"
        style={shouldReduceMotion ? undefined : { y: artY, scale: 1.035 }}
      >
        <path d="M0 88H520M0 324H520M0 562H520" stroke="var(--ink)" strokeOpacity="0.2" />
        <path d="M74 0V650M260 0V650M446 0V650" stroke="var(--ink)" strokeOpacity="0.2" />

        <m.circle
          cx="260"
          cy="320"
          r="168"
          stroke="var(--ink)"
          strokeWidth="1"
          strokeDasharray="3 9"
          initial={shouldReduceMotion ? {} : { rotate: -12, opacity: 0 }}
          animate={{ rotate: 0, opacity: 0.45 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "260px 320px" }}
        />
        <circle cx="260" cy="320" r="116" fill="var(--signal)" />
        <circle cx="260" cy="320" r="72" stroke="var(--ink)" strokeWidth="14" />
        <path d="M226 290H282C301 290 310 300 310 314C310 328 301 338 282 338H250C231 338 220 348 220 365" stroke="var(--paper)" strokeWidth="9" strokeLinecap="square" />
        <path d="M262 290V365H306" stroke="var(--paper)" strokeWidth="9" strokeLinecap="square" strokeLinejoin="round" />

        <path className="signal-path" d="M96 110H250V204" stroke="var(--signal)" strokeWidth="3" />
        <path className="signal-path" d="M388 104V212H316" stroke="var(--signal)" strokeWidth="3" />
        <path className="signal-path" d="M194 286H108V500" stroke="var(--signal)" strokeWidth="3" />
        <path className="signal-path" d="M424 362H352V500H110" stroke="var(--signal)" strokeWidth="3" />

        {nodes.map((node, index) => (
          <m.g
            key={node.label}
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, delay: 0.12 + index * 0.04 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <rect x={node.x - 8} y={node.y - 8} width="16" height="16" fill="var(--ink)" />
            <text x={node.x + 15} y={node.y + 4} fill="var(--ink)" fontFamily="var(--font-geist-mono)" fontSize="11">
              {node.label}
            </text>
          </m.g>
        ))}

        <path d="M18 18H58M18 18V58M502 18H462M502 18V58M18 632H58M18 632V592M502 632H462M502 632V592" stroke="var(--ink)" strokeWidth="3" />
      </m.svg>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-[var(--ink)] bg-[var(--paper)] px-4 py-3 font-[family-name:var(--font-geist-mono)] text-[0.66rem] tracking-[0.12em]">
        <span>INPUT / THINK / BUILD</span>
        <span className="signal-status h-2 w-2 bg-[var(--signal)]" />
      </div>

      <span className="signal-crosshair pointer-events-none absolute left-0 top-0 h-8 w-8 border border-[var(--ink)] mix-blend-multiply" aria-hidden="true">
        <span className="absolute left-1/2 top-[-0.5rem] h-12 w-px -translate-x-1/2 bg-[var(--ink)]/35" />
        <span className="absolute left-[-0.5rem] top-1/2 h-px w-12 -translate-y-1/2 bg-[var(--ink)]/35" />
      </span>
    </m.div>
  );
}
