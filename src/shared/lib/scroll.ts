export function scrollToTop(): void {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function scrollToSection(id: string): void {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = `/#${id}`;
  }
}

