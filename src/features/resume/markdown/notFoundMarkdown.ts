import { SITE_URL } from "@/features/resume/content/site";

/**
 * Agent-recovery body for HTTP 404 responses. Agents hitting a dead path get
 * a real 404 status plus a short markdown map of where to look next, so a
 * failed fetch becomes a navigable recovery instead of a dead end.
 */
export function buildNotFoundMarkdown(pathname?: string, siteUrl: string = SITE_URL): string {
  return [
    "# 404 — Page not found",
    "",
    pathname ? `\`${pathname}\` does not exist on this site.` : "This path does not exist on this site.",
    "",
    "This is the personal portfolio of **Sanket Patel**, Software Engineer & Product Builder.",
    "The whole site lives on one page; recover with any of the resources below:",
    "",
    `- [Portfolio home (HTML)](${siteUrl}/)`,
    `- [Full résumé as markdown](${siteUrl}/index.md)`,
    `- [Agent site map (llms.txt)](${siteUrl}/llms.txt)`,
    `- [XML sitemap](${siteUrl}/sitemap.xml)`,
    `- [robots.txt](${siteUrl}/robots.txt)`,
    "",
    `If you are looking for résumé facts (experience, projects, skills, education, contact), fetch ${siteUrl}/index.md or request the home page with an \`Accept: text/markdown\` header.`,
    "",
  ].join("\n");
}
