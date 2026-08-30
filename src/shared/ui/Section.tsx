"use client";

import { ReactNode } from "react";

interface SectionProps {
  id: string;
  number?: string;
  tag?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  number,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`resume-section ${className}`}>
      <div className="resume-container">
        <header className="section-heading">
          <div>
            {number && <span className="sr-only">Section {number}</span>}
            <h2 className="display-heading">{title}</h2>
          </div>
          {description && <p>{description}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
