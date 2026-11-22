import { FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  links: { live?: string; github?: string };
  index: number;
  isFeatured?: boolean;
}

const POSTER_TONES = ["poster-citron", "poster-cornflower", "poster-coral", "poster-ink"] as const;

export default function ProjectCard({ name, description, tech, links, index, isFeatured = false }: ProjectCardProps) {
  const [title, subtitle] = name.split(" - ");
  const sentenceEnd = description.indexOf(". ");
  const overview = sentenceEnd < 0 ? description : description.slice(0, sentenceEnd + 1);
  const details = sentenceEnd < 0 ? "" : description.slice(sentenceEnd + 2);
  const tone = POSTER_TONES[index % POSTER_TONES.length];

  return (
    <article className={`project-poster ${tone} ${isFeatured ? "project-poster-featured" : ""}`}>
      <div className="project-poster-rail" aria-hidden="true" />

      <div className="project-poster-head">
        <span className="project-position" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        {(links.github || links.live) && (
          <div className="project-links">
            {links.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label={`${name} on GitHub`}>
                <FiGithub aria-hidden="true" />
              </a>
            )}
            {links.live && (
              <a href={links.live} target="_blank" rel="noopener noreferrer" aria-label={`${name} live preview`}>
                <FiExternalLink aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>

      <div className="project-poster-body">
        <h3 className="project-poster-title">{title}</h3>
        <div className="project-description">
          {subtitle && <p className="project-subtitle">{subtitle}</p>}
          <p>{overview}</p>
          {details && (
            <details className="project-notes">
              <summary>Implementation</summary>
              <p>{details}</p>
            </details>
          )}
        </div>
      </div>

      {tech.length > 0 && (
        <ul className="project-tech project-poster-tech" aria-label="Technologies">
          {tech.map((item) => (
            <li key={item}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}