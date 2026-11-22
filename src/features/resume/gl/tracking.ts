"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { signals } from "@/features/resume/experience/signals";

export const CAMERA_FOV = 32;
export const CAMERA_DISTANCE = 5;

export interface Tracking {
  /** Pointer position inside the element, 0..1 with v pointing up. */
  u: number;
  v: number;
  /** Eased 0..1 while the pointer is over the element. */
  hover: number;
  /** 0 when the element's top meets the viewport bottom, 1 once it is well in view. */
  reveal: number;
  /** Signed scroll velocity, eased. */
  velocity: number;
  aspect: number;
}

function damp(current: number, target: number, lambda: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

export function useTracking(track: RefObject<HTMLElement | null>) {
  const state = useRef<Tracking>({ u: 0.5, v: 0.5, hover: 0, reveal: 0, velocity: 0, aspect: 1.6 });

  useFrame((_, delta) => {
    const element = track.current;
    if (!element) return;
    const dt = Math.min(delta, 0.05);
    const rect = element.getBoundingClientRect();
    const { x, y } = signals.pointer;
    const inside = signals.pointer.moved && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    const s = state.current;
    const u = inside ? (x - rect.left) / rect.width : 0.5;
    const v = inside ? 1 - (y - rect.top) / rect.height : 0.5;
    s.u = damp(s.u, u, 8, dt);
    s.v = damp(s.v, v, 8, dt);
    s.hover = damp(s.hover, inside ? 1 : 0, 5, dt);
    const viewport = window.innerHeight;
    const reveal = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport * 0.7)));
    s.reveal = damp(s.reveal, reveal, 6, dt);
    s.velocity = damp(s.velocity, signals.scroll.velocity, 6, dt);
    s.aspect = rect.width / Math.max(1, rect.height);
  });

  return state;
}

/** World-space size of the plane at z = 0 for a perspective camera at distance `distance`. */
export function viewSize(fov: number, distance: number, aspect: number) {
  const height = 2 * distance * Math.tan((fov * Math.PI) / 360);
  return { width: height * aspect, height };
}
