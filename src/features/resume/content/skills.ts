import type { SkillsContent } from "@/features/resume/model/types";

export const skills: SkillsContent = {
  categories: [
    {
      name: "Programming Languages",
      items: ["Python", "JavaScript", "TypeScript", "C++", "Java"],
    },
    {
      name: "Frontend",
      items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Vite"],
    },
    {
      name: "Backend",
      items: ["Node.js", "Express.js", "FastAPI", "Socket.io"],
    },
    {
      name: "Databases",
      items: ["MongoDB", "SQL", "PostgreSQL"],
    },
    {
      name: "AI/ML & NLP",
      items: ["PyTorch", "Transformers", "Sentence Transformers", "spaCy", "NLTK"],
    },
    {
      name: "Cloud & DevOps",
      items: ["AWS", "Azure", "Git", "GitHub"],
    },
  ],
};
