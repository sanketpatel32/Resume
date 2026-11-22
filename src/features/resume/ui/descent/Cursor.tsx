"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE = "a, button, [role='button'], summary, label, [data-cursor]";

/**
 * Desktop-only cursor: a dot that tracks exactly and a ring that trails,
 * grows over interactive elements and can carry a short label. Elements with
 * `data-magnetic` lean toward the pointer while it is over them.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dotEl = dot.current;
    const ringEl = ring.current;
    const labelEl = label.current;
    if (!dotEl || !ringEl || !labelEl) return;

    document.documentElement.classList.add("has-cursor");
    const dotX = gsap.quickTo(dotEl, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dotEl, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ringEl, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ringEl, "y", { duration: 0.45, ease: "power3" });

    let magnet: HTMLElement | null = null;
    let magnetX: gsap.QuickToFunc | null = null;
    let magnetY: gsap.QuickToFunc | null = null;

    const releaseMagnet = () => {
      if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      magnet = null;
      magnetX = null;
      magnetY = null;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      dotEl.style.opacity = "1";
      ringEl.style.opacity = "1";
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);

      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest<HTMLElement>(INTERACTIVE);
      const field = target?.closest("input, textarea, select");
      ringEl.classList.toggle("is-active", Boolean(interactive) && !field);
      ringEl.classList.toggle("is-hidden", Boolean(field));
      const text = interactive?.dataset.cursor ?? "";
      if (labelEl.textContent !== text) labelEl.textContent = text;
      ringEl.classList.toggle("has-label", text.length > 0);

      const nextMagnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (nextMagnet !== magnet) {
        releaseMagnet();
        if (nextMagnet) {
          magnet = nextMagnet;
          magnetX = gsap.quickTo(nextMagnet, "x", { duration: 0.4, ease: "power3" });
          magnetY = gsap.quickTo(nextMagnet, "y", { duration: 0.4, ease: "power3" });
        }
      }
      if (magnet && magnetX && magnetY) {
        const rect = magnet.getBoundingClientRect();
        const strength = Number(magnet.dataset.magnetic) || 0.35;
        magnetX((event.clientX - (rect.left + rect.width / 2)) * strength);
        magnetY((event.clientY - (rect.top + rect.height / 2)) * strength);
      }
    };

    const onDown = () => ringEl.classList.add("is-pressed");
    const onUp = () => ringEl.classList.remove("is-pressed");
    const onLeave = () => {
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
      releaseMagnet();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      releaseMagnet();
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
