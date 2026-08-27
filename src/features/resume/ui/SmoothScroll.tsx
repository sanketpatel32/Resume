"use client";

import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, type LenisRef } from "lenis/react";
import type Lenis from "lenis";
import { useHydratedReducedMotion } from "@/shared/lib/motion";
import { setSmoothScroller } from "@/shared/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const shouldReduceMotion = useHydratedReducedMotion();
  const [supportsInertia, setSupportsInertia] = useState(false);

  const bindLenis = useCallback((instance: LenisRef | null) => {
    setLenis((current) => {
      const next = instance?.lenis ?? null;
      return current === next ? current : next;
    });
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const update = () => setSupportsInertia(finePointer.matches);

    update();
    finePointer.addEventListener("change", update);
    return () => finePointer.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!lenis || shouldReduceMotion || !supportsInertia) return;

    const update = (time: number) => lenis.raf(time * 1000);
    const syncScrollTrigger = () => ScrollTrigger.update();

    setSmoothScroller(lenis);
    lenis.on("scroll", syncScrollTrigger);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      setSmoothScroller(null);
      lenis.off("scroll", syncScrollTrigger);
      gsap.ticker.remove(update);
    };
  }, [lenis, shouldReduceMotion, supportsInertia]);

  if (shouldReduceMotion || !supportsInertia) return null;

  return (
    <ReactLenis
      ref={bindLenis}
      root
      options={{
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.92,
      }}
    />
  );
}
