"use client";

import { m, useReducedMotion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";
import type { CertificationItem } from "@/features/resume/model/types";
import Section from "@/shared/ui/Section";

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

const getCredentialHost = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "External credential";
  }
};

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="certifications" title="Certifications">
      <m.p
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-2xl text-[var(--text-muted)] leading-relaxed mb-10"
      >
        Professional credentials and course certificates with publicly verifiable links.
      </m.p>

      <div className="grid gap-6 md:grid-cols-2">
        {certifications.map((certification, index) => (
          <m.article
            key={`${certification.name}-${certification.issuer}`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 34, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
            className="group relative overflow-hidden p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-[var(--accent)]/40 hover:shadow-[0_0_45px_rgba(110,231,183,0.12)] transition-all duration-300"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top_right,rgba(110,231,183,0.12),transparent_55%)]" />
            <m.div
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 -left-24 h-24 w-56 rotate-12 bg-gradient-to-r from-transparent via-[var(--accent)]/12 to-transparent"
              animate={shouldReduceMotion ? {} : { x: [-30, 34, -30] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", delay: index * 0.4 }}
            />

            <div className="relative flex items-start justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-[var(--accent)] transition-colors text-balance">
                {certification.name}
              </h3>
              <m.span
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-[var(--accent)] shrink-0"
                animate={shouldReduceMotion ? {} : { rotate: [0, 4, 0, -4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 1.2, delay: index * 0.15 }}
              >
                <FiAward size={18} aria-hidden="true" />
              </m.span>
            </div>

            <p className="text-xs tracking-wide uppercase text-[var(--text-muted)] mb-3">{certification.issuer}</p>

            {certification.description && (
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                {certification.description}
              </p>
            )}

            <div className="flex items-center justify-between gap-4 border-t border-white/10 mt-6 pt-4">
              <p className="text-xs text-[var(--text-muted)]">
                {getCredentialHost(certification.credentialUrl)}
                {certification.credentialId ? ` • ID: ${certification.credentialId}` : ""}
              </p>

              <m.a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${certification.name} credential`}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="group/link inline-flex items-center gap-2 rounded-lg border border-[var(--accent)]/40 bg-[var(--accent-dim)] px-4 py-2 text-sm font-medium text-[var(--accent)] hover:border-[var(--accent)] hover:text-white transition-colors"
              >
                View Credential
                <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                  <FiExternalLink size={16} />
                </span>
              </m.a>
            </div>
          </m.article>
        ))}
      </div>
    </Section>
  );
}
