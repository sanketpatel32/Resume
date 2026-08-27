"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useHydratedReducedMotion } from "@/shared/lib/motion";

export default function ScrollProgress() {
  const shouldReduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.32,
  });

  if (shouldReduceMotion) return null;

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-16 z-[60] h-0.5 origin-left bg-[var(--signal)]"
      style={{ scaleX: smoothProgress }}
    />
  );
}
