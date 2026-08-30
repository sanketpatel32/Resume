import { FiExternalLink } from "react-icons/fi";
import type { CertificationItem } from "@/features/resume/model/types";
import Section from "@/shared/ui/Section";

interface CertificationsSectionProps { certifications: CertificationItem[]; }

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <Section id="certifications" number="04" tag="Verified credentials" title="Credentials" description="Publicly verifiable professional certificates and specialized course completions.">
      <div className="credential-list">
        {certifications.map((certification) => (
          <article className="credential-row" key={`${certification.name}-${certification.issuer}`}>
            <div><h3>{certification.name}</h3><p>{certification.issuer}</p></div>
            <a href={certification.credentialUrl} target="_blank" rel="noopener noreferrer">Verify <FiExternalLink aria-hidden="true" /></a>
          </article>
        ))}
      </div>
    </Section>
  );
}
