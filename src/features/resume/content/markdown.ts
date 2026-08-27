import { profile } from "./profile";
import { career } from "./career";
import { projects } from "./projects";
import { skills } from "./skills";
import { certifications } from "./certifications";
import { education } from "./education";
import { contact } from "./contact";

const SITE_URL = "https://www.sanketpatel.online";

export function getResumeMarkdown(): string {
  const sections: string[] = [];

  // Header & Identity
  sections.push(`# ${profile.name} - ${profile.title} & Backend Specialist

> ${profile.summary}

- **Website**: [${SITE_URL}](${SITE_URL})
- **Email**: [${contact.email}](mailto:${contact.email})
- **GitHub**: [${contact.github}](${contact.github})
- **LinkedIn**: [${contact.linkedin}](${contact.linkedin})
- **Location**: ${contact.location}
`);

  // Core Highlights
  sections.push(`## Core Highlights
${profile.highlights.map((h) => `- ${h}`).join("\n")}
`);

  // Work Experience
  sections.push(`## Work Experience

${career
  .map(
    (item) => `### ${item.role} | ${item.company}
- **Period**: ${item.dates}
- **Location**: ${item.location}
${item.bullets.map((b) => `- ${b}`).join("\n")}`,
  )
  .join("\n\n")}
`);

  // Featured Projects & Architecture
  sections.push(`## Featured Projects & Architecture

${projects
  .map((p) => {
    const links: string[] = [];
    if (p.links.github) links.push(`[GitHub Repository](${p.links.github})`);
    if (p.links.live) links.push(`[Live Deployment](${p.links.live})`);
    return `### ${p.name}
${p.description}

- **Tech Stack**: ${p.tech.join(", ")}
${links.length > 0 ? `- **Links**: ${links.join(" | ")}` : ""}`;
  })
  .join("\n\n")}
`);

  // Technical Proficiency
  sections.push(`## Technical Skills & Ecosystem

${skills.categories
  .map((cat) => `### ${cat.name}\n${cat.items.map((i) => `- ${i}`).join("\n")}`)
  .join("\n\n")}
`);

  // Certifications
  sections.push(`## Verified Certifications

${certifications
  .map(
    (c) => `- **${c.name}** (${c.issuer}) - [Verify Credential](${c.credentialUrl})`,
  )
  .join("\n")}
`);

  // Education
  sections.push(`## Education & Academic Background

${education
  .map(
    (e) => `### ${e.school}
- **Degree / Certification**: ${e.degree}
- **Period**: ${e.dates}
${e.details.map((d) => `- ${d}`).join("\n")}`,
  )
  .join("\n\n")}
`);

  // Contact Details
  sections.push(`## Contact & Connect

- **Email**: [${contact.email}](mailto:${contact.email})
- **Phone**: [${contact.phone}](tel:${contact.phone.replace(/\s/g, "")})
- **Location**: ${contact.location}
- **GitHub**: [github.com/sanketpatel32](${contact.github})
- **LinkedIn**: [linkedin.com/in/sanketpatel32](${contact.linkedin})
- **Instagram**: [instagram.com/sanket_patel32](${contact.instagram})
- **YouTube**: [youtube.com/@camouflage32p](${contact.youtube})
- **LLM Full Context**: [${SITE_URL}/llms-full.txt](${SITE_URL}/llms-full.txt)
- **Sitemap**: [${SITE_URL}/sitemap.xml](${SITE_URL}/sitemap.xml)
`);

  return sections.join("\n---\n\n").trim() + "\n";
}

export function getNotFoundMarkdown(requestedPath?: string): string {
  const pathDisplay = requestedPath ? ` \`${requestedPath}\`` : "";
  return `# 404 Not Found

The requested resource${pathDisplay} was not found on this server.

## Navigation & Recovery
If you are an agent or crawler exploring this domain, here are the canonical entrypoints:

- **Home / Full Profile**: [${SITE_URL}/](${SITE_URL}/) (or request with \`Accept: text/markdown\`)
- **LLM Index Guide**: [${SITE_URL}/llms.txt](${SITE_URL}/llms.txt)
- **Full LLM Context**: [${SITE_URL}/llms-full.txt](${SITE_URL}/llms-full.txt)
- **Sitemap**: [${SITE_URL}/sitemap.xml](${SITE_URL}/sitemap.xml)
- **Projects Section**: [${SITE_URL}/#projects](${SITE_URL}/#projects)
- **Work Experience**: [${SITE_URL}/#career](${SITE_URL}/#career)
- **Technical Skills**: [${SITE_URL}/#skills](${SITE_URL}/#skills)
- **Contact**: [${SITE_URL}/#contact](${SITE_URL}/#contact)
`;
}

export function getMarkdownForSlug(slugList: string[] = []): { content: string; status: number } {
  const normalized = slugList.map((s) => s.replace(/\.md$/, "").toLowerCase()).join("/");

  if (normalized === "" || normalized === "index" || normalized === "home" || normalized === "resume" || normalized === "about") {
    return { content: getResumeMarkdown(), status: 200 };
  }

  if (normalized === "projects" || normalized === "work") {
    return {
      content: `# Projects & Architecture - ${profile.name}

${projects
  .map((p) => {
    const links: string[] = [];
    if (p.links.github) links.push(`[GitHub Repository](${p.links.github})`);
    if (p.links.live) links.push(`[Live Deployment](${p.links.live})`);
    return `## ${p.name}
${p.description}

- **Tech Stack**: ${p.tech.join(", ")}
${links.length > 0 ? `- **Links**: ${links.join(" | ")}` : ""}`;
  })
  .join("\n\n")}

---
[Return to Full Portfolio](${SITE_URL}) | [LLM Context](${SITE_URL}/llms.txt)
`,
      status: 200,
    };
  }

  if (normalized === "career" || normalized === "experience") {
    return {
      content: `# Work Experience - ${profile.name}

${career
  .map(
    (item) => `## ${item.role} | ${item.company}
- **Period**: ${item.dates}
- **Location**: ${item.location}
${item.bullets.map((b) => `- ${b}`).join("\n")}`,
  )
  .join("\n\n")}

---
[Return to Full Portfolio](${SITE_URL}) | [LLM Context](${SITE_URL}/llms.txt)
`,
      status: 200,
    };
  }

  if (normalized === "skills") {
    return {
      content: `# Technical Skills & Ecosystem - ${profile.name}

${skills.categories
  .map((cat) => `## ${cat.name}\n${cat.items.map((i) => `- ${i}`).join("\n")}`)
  .join("\n\n")}

---
[Return to Full Portfolio](${SITE_URL}) | [LLM Context](${SITE_URL}/llms.txt)
`,
      status: 200,
    };
  }

  if (normalized === "certifications") {
    return {
      content: `# Verified Certifications - ${profile.name}

${certifications
  .map(
    (c) => `- **${c.name}** (${c.issuer}) - [Verify Credential](${c.credentialUrl})`,
  )
  .join("\n")}

---
[Return to Full Portfolio](${SITE_URL}) | [LLM Context](${SITE_URL}/llms.txt)
`,
      status: 200,
    };
  }

  if (normalized === "education") {
    return {
      content: `# Education & Credentials - ${profile.name}

${education
  .map(
    (e) => `## ${e.school}
- **Degree / Program**: ${e.degree}
- **Period**: ${e.dates}
${e.details.map((d) => `- ${d}`).join("\n")}`,
  )
  .join("\n\n")}

---
[Return to Full Portfolio](${SITE_URL}) | [LLM Context](${SITE_URL}/llms.txt)
`,
      status: 200,
    };
  }

  if (normalized === "contact") {
    return {
      content: `# Contact ${profile.name}

- **Email**: [${contact.email}](mailto:${contact.email})
- **Phone**: [${contact.phone}](tel:${contact.phone.replace(/\s/g, "")})
- **Location**: ${contact.location}
- **GitHub**: [${contact.github}](${contact.github})
- **LinkedIn**: [${contact.linkedin}](${contact.linkedin})
- **Instagram**: [${contact.instagram}](${contact.instagram})
- **YouTube**: [${contact.youtube}](${contact.youtube})
- **Website**: [${SITE_URL}](${SITE_URL})

---
[Return to Full Portfolio](${SITE_URL}) | [LLM Context](${SITE_URL}/llms.txt)
`,
      status: 200,
    };
  }

  return { content: getNotFoundMarkdown(`/${slugList.join("/")}`), status: 404 };
}
