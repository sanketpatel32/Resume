"use client";

import { m } from "framer-motion";
import { FiAward, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import type { CertificationItem } from "@/features/resume/model/types";
import { useHydratedReducedMotion } from "@/shared/lib/motion";
import Section from "@/shared/ui/Section";

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

const getCredentialHost = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "coursera.org";
  }
};

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <Section
      id="certifications"
      number="04"
      tag="VERIFIED CREDENTIALS"
      title="Certifications & Specializations"
      description="Publicly verifiable professional certificates and specialized course completions."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {certifications.map((certification, index) => (
          <m.article
            key={`${certification.name}-${certification.issuer}`}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card group p-6 rounded-2xl relative flex flex-col justify-between overflow-hidden"
          >
            {/* Top ambient highlight line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <FiAward size={22} />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  <FiCheckCircle size={10} /> Verifiable
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2 leading-snug">
                {certification.name}
              </h3>

              <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-4">
                Issuer: {certification.issuer}
              </p>

              {certification.description && (
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {certification.description}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-[var(--text-dim)] truncate">
                {getCredentialHost(certification.credentialUrl)}
              </span>

              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${certification.name} credential`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono font-medium text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all group/link"
              >
                Verify
                <FiExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </m.article>
        ))}
      </div>
    </Section>
  );
}
