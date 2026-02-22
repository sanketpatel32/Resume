import type { ResumeMetadata } from "@/features/resume/model/types";
import { profile } from "@/features/resume/content/profile";

export const seo: ResumeMetadata = {
  title: `${profile.name} | ${profile.title}`,
  description:
    "Full-Stack Developer with expertise in React, Node.js, and AI/ML technologies. Building scalable web applications and intelligent systems.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Node.js",
    "AI",
    "Machine Learning",
    "Web Development",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: "Full-Stack Developer with expertise in React, Node.js, and AI/ML technologies.",
    type: "website",
  },
};
