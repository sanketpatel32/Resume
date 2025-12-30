"use client";

import {
    Code2,
    Globe,
    Server,
    Database,
    Brain,
    Cloud,
    type LucideIcon,
} from "lucide-react";
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
    SiNodedotjs,
    SiExpress,
    SiFastapi,
    SiSocketdotio,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiPytorch,
    SiAmazonwebservices,
    SiGit,
    SiGithub,
    SiVite,
} from "react-icons/si";
import { FaJava, FaCloud } from "react-icons/fa";
import { TbBrain, TbTransform } from "react-icons/tb";
import { IconType } from "react-icons";

// Skill icons mapping
const iconMap: Record<string, IconType> = {
    // Programming Languages
    Python: SiPython,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    "C++": SiCplusplus,
    Java: FaJava,

    // Frontend
    React: SiReact,
    "Next.js": SiNextdotjs,
    HTML: SiHtml5,
    CSS: SiCss3,
    "Tailwind CSS": SiTailwindcss,
    Vite: SiVite,

    // Backend
    "Node.js": SiNodedotjs,
    "Express.js": SiExpress,
    FastAPI: SiFastapi,
    "Socket.io": SiSocketdotio,

    // Databases
    MongoDB: SiMongodb,
    SQL: SiMysql,
    PostgreSQL: SiPostgresql,

    // AI/ML
    PyTorch: SiPytorch,
    Transformers: TbTransform,
    "Sentence Transformers": TbTransform,
    spaCy: TbBrain,
    NLTK: TbBrain,

    // Cloud
    AWS: SiAmazonwebservices,
    Azure: FaCloud,
    Algo: TbBrain,
    Git: SiGit,
    GitHub: SiGithub,
};

// Category icons - premium Lucide icons
const categoryIconMap: Record<string, LucideIcon> = {
    "Programming Languages": Code2,
    Frontend: Globe,
    Backend: Server,
    Databases: Database,
    "AI/ML & NLP": Brain,
    "Cloud & DevOps": Cloud,
};

interface SkillIconProps {
    name: string;
}

interface CategoryIconProps {
    category: string;
}

export default function SkillIcon({ name }: SkillIconProps) {
    const Icon = iconMap[name];

    if (Icon) {
        return <Icon className="w-4 h-4" />;
    }

    return null;
}

export function CategoryIcon({ category }: CategoryIconProps) {
    const Icon = categoryIconMap[category];

    if (Icon) {
        return <Icon className="w-5 h-5" strokeWidth={1.5} />;
    }

    return <Code2 className="w-5 h-5" strokeWidth={1.5} />;
}
