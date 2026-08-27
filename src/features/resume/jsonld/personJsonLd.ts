import type { ResumeContent } from "@/features/resume/model/types";
import { resumeContent } from "@/features/resume/content";
import { SITE_URL } from "@/features/resume/content/site";

/**
 * schema.org JSON-LD so AI systems can parse the site identity
 * programmatically. Uses @graph with a Person (primary identity), WebSite,
 * ProfilePage, and ItemList (projects), cross-referenced by @id.
 */
export function buildPersonJsonLd(
  content: ResumeContent = resumeContent,
  siteUrl: string = SITE_URL,
) {
  const { profile, contact, skills, projects } = content;

  const sameAs = [contact.linkedin, contact.github, contact.instagram, contact.youtube]
    .filter((url): url is string => Boolean(url));

  const knowsAbout = [
    ...profile.highlights,
    ...skills.categories.flatMap((category) => category.items),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        description: profile.summary,
        url: `${siteUrl}/`,
        image: `${siteUrl}/logo.png`,
        email: `mailto:${contact.email}`,
        telephone: contact.phone || undefined,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jamnagar",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Birla Institute of Technology, Mesra",
          url: "https://www.bitmesra.ac.in/",
        },
        worksFor: {
          "@type": "Organization",
          name: "The Algorithm",
        },
        sameAs,
        knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: `${profile.name} — Portfolio`,
        description: content.seo.description ?? undefined,
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: `${profile.name} | ${profile.title} & Backend Specialist`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        mainEntity: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#projects-list`,
        name: "Featured Software Applications",
        itemListElement: projects.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "SoftwareApplication",
            name: p.name,
            description: p.description,
            applicationCategory: p.name.includes("Scanner") || p.name.includes("Security")
              ? "SecurityApplication"
              : "DeveloperApplication",
            operatingSystem: "Cross-platform",
            author: {
              "@id": `${siteUrl}/#person`,
            },
            ...(p.links.github && { codeRepository: p.links.github }),
            ...(p.links.live && { url: p.links.live }),
          },
        })),
      },
    ],
  };
}

export const personJsonLd = buildPersonJsonLd();
