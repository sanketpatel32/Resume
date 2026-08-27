import type { ResumeContent } from "@/features/resume/model/types";
import { resumeContent } from "@/features/resume/content";
import { SITE_URL } from "@/features/resume/content/site";

/**
 * /llms.txt following the llmstxt.org v2 spec:
 * an H1 with the site name (required section), a blockquote summary,
 * free-form prose, then H2 "file list" sections of markdown links.
 */
export function buildLlmsTxt(
  content: ResumeContent = resumeContent,
  siteUrl: string = SITE_URL,
): string {
  const { profile } = content;
  return [
    `# ${profile.name}`,
    "",
    `> ${profile.summary}`,
    "",
    `${siteUrl} is the single-page portfolio of ${profile.name}, ${profile.title}, based in ${content.contact.location}.`,
    "",
    "How to read this site as an agent:",
    "",
    `- Request the home page with \`Accept: text/markdown\` to get the full résumé as markdown instead of HTML.`,
    `- Or fetch the markdown sibling directly at [${siteUrl}/index.md](${siteUrl}/index.md).`,
    `- The homepage embeds schema.org JSON-LD (\`@type: Person\`) describing this identity.`,
    "",
    "## Pages",
    "",
    `- [${profile.name} — full résumé (markdown)](${siteUrl}/index.md): Complete experience, projects, skills, certifications, education, and contact details.`,
    `- [Portfolio home (HTML)](${siteUrl}/): The same content for human readers.`,
    "",
    "## Machine-readable files",
    "",
    `- [llms.txt](${siteUrl}/llms.txt): This agent-facing index.`,
    `- [robots.txt](${siteUrl}/robots.txt): Crawler permissions and sitemap pointer.`,
    `- [sitemap.xml](${siteUrl}/sitemap.xml): XML sitemap listing the canonical URL.`,
    `- [Structured data](${siteUrl}/): schema.org Person JSON-LD embedded in the homepage head.`,
    "",
    "## Optional",
    "",
    `- [Résumé PDF](${siteUrl}/resume.pdf): Printable CV download linked from the homepage.`,
    "",
  ].join("\n");
}
