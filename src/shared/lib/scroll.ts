export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
