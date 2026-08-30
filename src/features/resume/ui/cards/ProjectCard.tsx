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
  return (
    <article className={`project-card ${isFeatured ? "project-card-featured" : ""}`}>
      <div className="project-card-head">
        <span className="project-type">{isFeatured ? "Featured system" : "Selected work"}</span>
        <div className="project-links">
          {links.github && <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label={`${name} on GitHub`}><FiGithub aria-hidden="true" /></a>}
          {links.live && <a href={links.live} target="_blank" rel="noopener noreferrer" aria-label={`${name} live preview`}><FiExternalLink aria-hidden="true" /></a>}
        </div>
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <ul className="project-tech" aria-label="Technologies">
        {tech.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}
