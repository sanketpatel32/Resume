import type { SkillsContent } from "@/features/resume/model/types";

export const skills: SkillsContent = {
  categories: [
    {
      name: "Programming Languages",
      items: ["Python", "JavaScript", "TypeScript", "C++", "Java"],
    },
    {
      name: "Frontend",
      items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Vite", "Redux Toolkit", "TanStack Query"],
    },
    {
      name: "Backend",
      items: ["Node.js", "Express.js", "Bun", "FastAPI", "Socket.io", "LiveKit"],
    },
    {
      name: "Databases",
      items: ["MongoDB", "SQL", "PostgreSQL", "Redis", "Pinecone"],
    },
    {
      name: "AI/ML & NLP",
      items: ["PyTorch", "Transformers", "Sentence Transformers", "spaCy", "NLTK", "LangGraph", "RAG"],
    },
    {
      name: "Cloud & DevOps",
      items: ["AWS", "Azure", "Git", "GitHub"],
    },
  ],
};
