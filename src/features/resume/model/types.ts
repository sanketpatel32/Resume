import type { Metadata } from "next";

export interface Profile {
  name: string;
  title: string;
  summary: string;
  highlights: string[];
}

export interface CareerItem {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  dates: string;
  details: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  credentialUrl: string;
  credentialId?: string;
  description?: string;
}

interface SkillCategory {
  name: string;
  items: string[];
}

export interface SkillsContent {
  categories: SkillCategory[];
}

interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  tech: string[];
  links: ProjectLinks;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
  otherLinks: string[];
}

export type ResumeMetadata = Metadata;

export interface ResumeContent {
  profile: Profile;
  career: CareerItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skills: SkillsContent;
  projects: ProjectItem[];
  contact: ContactInfo;
  seo: ResumeMetadata;
}
