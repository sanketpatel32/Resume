import type { ResumeContent } from "@/features/resume/model/types";
import { resumeContent } from "@/features/resume/content";

function absolute(url: string, siteUrl: string): string {
  return url.startsWith("http") ? url : `${siteUrl}${url}`;
}

function careerSection(content: ResumeContent): string {
  const lines = ["## Experience", ""];
  for (const item of content.career) {
    lines.push(`### ${item.role} — ${item.company}`);
    lines.push(`${item.dates} · ${item.location}`);
    lines.push("");
    for (const bullet of item.bullets) {
      lines.push(`- ${bullet}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function projectsSection(content: ResumeContent, siteUrl: string): string {
  const lines = ["## Projects", ""];
  for (const project of content.projects) {
    lines.push(`### ${project.name}`);
    lines.push(project.description);
    if (project.tech.length > 0) {
      lines.push(`Technologies: ${project.tech.join(", ")}`);
    }
    const links: string[] = [];
    if (project.links.live) links.push(`[Live](${absolute(project.links.live, siteUrl)})`);
    if (project.links.github) links.push(`[Source](${absolute(project.links.github, siteUrl)})`);
    if (links.length > 0) lines.push(links.join(" · "));
    lines.push("");
  }
  return lines.join("\n");
}

function skillsSection(content: SkillsContentAlias): string {
  const lines = ["## Skills", ""];
  for (const category of content.categories) {
    lines.push(`- **${category.name}:** ${category.items.join(", ")}`);
  }
  return `${lines.join("\n")}\n`;
}

type SkillsContentAlias = ResumeContent["skills"];

function certificationsSection(content: ResumeContent): string {
  const lines = ["## Certifications", ""];
  for (const cert of content.certifications) {
    lines.push(`- [${cert.name}](${cert.credentialUrl}) — ${cert.issuer}`);
  }
  return `${lines.join("\n")}\n`;
}

function educationSection(content: ResumeContent): string {
  const lines = ["## Education", ""];
  for (const item of content.education) {
    lines.push(`### ${item.degree} — ${item.school}`);
    lines.push(item.dates);
    lines.push("");
    for (const detail of item.details) {
      lines.push(`- ${detail}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function contactSection(content: ResumeContent): string {
  const c = content.contact;
  const lines = ["## Contact", ""];
  lines.push(`- Email: [${c.email}](mailto:${c.email})`);
  if (c.phone) lines.push(`- Phone: ${c.phone}`);
  if (c.location) lines.push(`- Location: ${c.location}`);
  if (c.linkedin) lines.push(`- LinkedIn: ${c.linkedin}`);
  if (c.github) lines.push(`- GitHub: ${c.github}`);
  if (c.instagram) lines.push(`- Instagram: ${c.instagram}`);
  if (c.youtube) lines.push(`- YouTube: ${c.youtube}`);
  if (c.website) lines.push(`- Website: ${c.website}`);
  for (const link of c.otherLinks) {
    if (!c.linkedin || link !== c.linkedin) lines.push(`- Link: ${link}`);
  }
  return lines.join("\n");
}

/**
 * Markdown representation of the homepage — the full résumé in
 * agent-friendly prose. Served via Accept: text/markdown negotiation and at
 * /index.md per the llms.txt convention.
 */
export function buildHomeMarkdown(
  content: ResumeContent = resumeContent,
  siteUrl: string,
): string {
  const { profile } = content;
  const sections = [
    `# ${profile.name} — ${profile.title}`,
    "",
    `> ${profile.summary}`,
    "",
    `Markdown index of this site: [${siteUrl}/llms.txt](${siteUrl}/llms.txt).`,
    "",
    "## About",
    "",
    profile.summary,
    "",
    "**Highlights**",
    "",
    ...profile.highlights.map((highlight) => `- ${highlight}`),
    "",
    careerSection(content),
    projectsSection(content, siteUrl),
    skillsSection(content.skills),
    certificationsSection(content),
    educationSection(content),
    contactSection(content),
  ];
  return sections.join("\n");
}
