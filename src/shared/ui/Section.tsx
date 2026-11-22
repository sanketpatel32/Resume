"use client";

import { ReactNode } from "react";

interface SectionProps {
  id: string;
  number?: string;
  tag?: string;
  kicker?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  number,
  kicker,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`resume-section crafted-section ${className}`.trim()}>
      <div className="resume-container">
        <header className="section-heading editorial-heading">
          <div className="editorial-heading-copy">
            {number && (
              <p className="section-manuscript" aria-hidden="true">
                <span className="section-manuscript-mark">{number}</span>
              </p>
            )}
            {kicker && <p className="section-kicker">{kicker}</p>}
            {number && <span className="sr-only">Section {number}</span>}
            <h2 className="display-heading">{title}</h2>
          </div>
          {description && <p className="section-lead">{description}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}