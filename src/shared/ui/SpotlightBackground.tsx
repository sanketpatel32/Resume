"use client";

export default function SpotlightBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--accent)] opacity-20" />
    </div>
  );
}
