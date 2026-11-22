export type Tone = "surface" | "work" | "core";

interface Signals {
  pointer: { x: number; y: number; nx: number; ny: number; moved: boolean };
  scroll: { y: number; progress: number; velocity: number };
  tone: Tone;
  coreGlow: number;
}

/**
 * Mutable, render-loop friendly state shared by the DOM choreography and the
 * WebGL stage. Values are written by passive listeners and read every frame,
 * so nothing here triggers React renders.
 */
export const signals: Signals = {
  pointer: { x: 0, y: 0, nx: 0, ny: 0, moved: false },
  scroll: { y: 0, progress: 0, velocity: 0 },
  tone: "surface",
  coreGlow: 0,
};

let listening = 0;
let lastY = 0;
let lastTime = 0;

function onPointerMove(event: PointerEvent) {
  const { pointer } = signals;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.nx = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.ny = -((event.clientY / window.innerHeight) * 2 - 1);
  pointer.moved = true;
}

function onScroll() {
  const now = performance.now();
  const y = window.scrollY;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const dt = Math.max(1, now - lastTime);
  const instant = (y - lastY) / dt;
  signals.scroll.velocity += (instant - signals.scroll.velocity) * 0.35;
  signals.scroll.y = y;
  signals.scroll.progress = Math.min(1, Math.max(0, y / max));
  lastY = y;
  lastTime = now;
}

export function startSignals(): () => void {
  listening += 1;
  if (listening === 1) {
    lastY = window.scrollY;
    lastTime = performance.now();
    signals.pointer.x = window.innerWidth / 2;
    signals.pointer.y = window.innerHeight / 2;
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  return () => {
    listening -= 1;
    if (listening === 0) {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    }
  };
}

/** Velocity decays toward zero between scroll events; call once per frame. */
export function settleVelocity() {
  signals.scroll.velocity *= 0.92;
}
