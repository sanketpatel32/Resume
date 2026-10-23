import { FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  links: { live?: string; github?: string };
  index: number;
  isFeatured?: boolean;
}

export default function ProjectCard({ name, description, tech, links, isFeatured = false }: ProjectCardProps) {
  const [title, subtitle] = name.split(" - ");
  const sentenceEnd = description.indexOf(". ");
  const overview = sentenceEnd < 0 ? description : description.slice(0, sentenceEnd + 1);
  const details = sentenceEnd < 0 ? "" : description.slice(sentenceEnd + 2);
  return (
    <article className={`project-card ${isFeatured ? "project-card-featured" : ""}`}>
      <div className="project-card-head">
        <h3>{title}</h3>
        {(links.github || links.live) && <div className="project-links">
          {links.github && <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label={`${name} on GitHub`}><FiGithub aria-hidden="true" /></a>}
          {links.live && <a href={links.live} target="_blank" rel="noopener noreferrer" aria-label={`${name} live preview`}><FiExternalLink aria-hidden="true" /></a>}
        </div>}
      </div>
      <div className="project-description">
        {subtitle && <p className="project-subtitle">{subtitle}</p>}
        <p>{overview}</p>
        {details && <details className="project-notes"><summary>Implementation</summary><p>{details}</p></details>}
      </div>
      {tech.length > 0 && <ul className="project-tech" aria-label="Technologies">
        {tech.map((item) => <li key={item}>{item}</li>)}
      </ul>}
    </article>
  );
}
