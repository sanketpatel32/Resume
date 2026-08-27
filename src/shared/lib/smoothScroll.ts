import type Lenis from "lenis";

let smoothScroller: Lenis | null = null;

export function setSmoothScroller(scroller: Lenis | null): void {
  smoothScroller = scroller;
}

export function getSmoothScroller(): Lenis | null {
  return smoothScroller;
}
