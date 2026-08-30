"use client";

import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiSocketdotio,
  SiMongodb,
  SiPostgresql,
  SiPytorch,
  SiAmazonwebservices,
  SiGit,
  SiGithub,
  SiDocker,
  SiBun,
  SiRust,
  SiRedis,
} from "react-icons/si";
import { FiCode, FiDatabase, FiCpu, FiCloud, FiTerminal, FiLayers } from "react-icons/fi";

const skillIconMap: Record<string, React.ElementType> = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "C++": SiCplusplus,
  Java: FiCode,
  React: SiReact,
  "Next.js": SiNextdotjs,
  HTML: SiHtml5,
  CSS: SiCss3,
  "Tailwind CSS": SiTailwindcss,
  Vite: SiVite,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  FastAPI: SiFastapi,
  "Socket.io": SiSocketdotio,
  MongoDB: SiMongodb,
  SQL: FiDatabase,
  PostgreSQL: SiPostgresql,
  PyTorch: SiPytorch,
  Transformers: FiCpu,
  "Sentence Transformers": FiCpu,
  spaCy: FiCpu,
  NLTK: FiCpu,
  AWS: SiAmazonwebservices,
  Azure: FiCloud,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Bun: SiBun,
  Rust: SiRust,
  Redis: SiRedis,
};

export default function SkillIcon({ name }: { name: string }) {
  const Icon = skillIconMap[name] || FiCode;
  return <Icon className="w-4 h-4 shrink-0" />;
}

const categoryIconMap: Record<string, React.ElementType> = {
  "Programming Languages": FiTerminal,
  Frontend: FiCode,
  Backend: FiLayers,
  Databases: FiDatabase,
  "AI/ML & NLP": FiCpu,
  "Cloud & DevOps": FiCloud,
};

export function CategoryIcon({ category }: { category: string }) {
  const Icon = categoryIconMap[category] || FiLayers;
  return <Icon className="w-5 h-5" />;
}
