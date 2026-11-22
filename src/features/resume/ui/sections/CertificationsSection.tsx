import { FiArrowUpRight } from "react-icons/fi";
import type { CertificationItem } from "@/features/resume/model/types";

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="chapter proof" data-chapter="Proof" data-tone="work" aria-labelledby="certifications-heading">
      <div className="resume-container">
        <div className="proof-head">
          <p className="chapter-tag"><span>L5</span> Proof</p>
          <h2 id="certifications-heading">Credentials</h2>
          <p>Publicly verifiable certificates. Each one opens its issuer&apos;s record.</p>
        </div>
        <ol className="proof-list">
          {certifications.map((certification, index) => (
            <li key={`${certification.name}-${certification.issuer}`}>
              <a href={certification.credentialUrl} target="_blank" rel="noopener noreferrer" className="proof-row" data-cursor="Verify">
                <span className="proof-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="proof-name">{certification.name}</span>
                <span className="proof-issuer">{certification.issuer}</span>
                <span className="proof-verify">Verify <FiArrowUpRight aria-hidden="true" /></span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
