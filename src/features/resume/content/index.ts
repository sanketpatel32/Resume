import { career } from "@/features/resume/content/career";
import { certifications } from "@/features/resume/content/certifications";
import { contact } from "@/features/resume/content/contact";
import { education } from "@/features/resume/content/education";
import { profile } from "@/features/resume/content/profile";
import { projects } from "@/features/resume/content/projects";
import { seo } from "@/features/resume/content/seo";
import { skills } from "@/features/resume/content/skills";
import type { ResumeContent } from "@/features/resume/model/types";

// Primary content composition entrypoint for the resume site.
export const resumeContent: ResumeContent = {
  profile,
  career,
  education,
  certifications,
  skills,
  projects,
  contact,
  seo,
};
