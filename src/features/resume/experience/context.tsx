"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { FINE_POINTER, REDUCED_MOTION, supportsWebGL, useMedia } from "./useMedia";

export interface Experience {
  /** Scroll choreography, the intro and pinned chapters run. */
  motion: boolean;
  /** The shared WebGL stage is mounted and scenes may render into it. */
  gl: boolean;
  /** A mouse-like pointer exists, so the custom cursor and magnetic hovers run. */
  finePointer: boolean;
}

const ExperienceContext = createContext<Experience>({ motion: false, gl: false, finePointer: false });

const noop = () => () => {};

export function useExperienceState(): Experience {
  const reducedMotion = useMedia(REDUCED_MOTION);
  const finePointer = useMedia(FINE_POINTER);
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const webgl = useSyncExternalStore(noop, supportsWebGL, () => false);
  const motion = hydrated && !reducedMotion;
  return { motion, gl: motion && webgl, finePointer: motion && finePointer };
}

export const ExperienceProvider = ExperienceContext.Provider;

export function useExperience(): Experience {
  return useContext(ExperienceContext);
}
