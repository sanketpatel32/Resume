import { getSmoothScroller } from "./smoothScroll";

export function scrollToTop(): void {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/") {
    window.location.href = "/";
    return;
  }
  const lenis = getSmoothScroller();
  if (lenis) lenis.scrollTo(0, { duration: 2.2 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToSection(id: string): void {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (!element) {
    window.location.href = `/#${id}`;
    return;
  }
  const lenis = getSmoothScroller();
  if (lenis) lenis.scrollTo(element, { duration: 1.6, offset: id === "about" ? 0 : -40 });
  else element.scrollIntoView({ behavior: "smooth" });
}
