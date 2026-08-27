import { contact } from "./contact";
import { profile } from "./profile";
import { projects } from "./projects";
import { SITE_URL, BRAND_NAME } from "./site";

export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: BRAND_NAME,
        givenName: "Sanket",
        familyName: "Patel",
        jobTitle: `${profile.title} & Backend Specialist`,
        description: profile.summary,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/logo.png`,
        email: `mailto:${contact.email}`,
        telephone: contact.phone,
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
        sameAs: [
          contact.github,
          contact.linkedin,
          contact.instagram,
          contact.youtube,
        ].filter(Boolean),
        knowsAbout: [
          "Full-Stack Web Development",
          "Backend API Architecture",
          "Node.js",
          "Express.js",
          "TypeScript",
          "JavaScript",
          "React.js",
          "Next.js",
          "DAST Security Testing",
          "RESTful APIs",
          "MongoDB",
          "PostgreSQL",
          "Redis",
          "Docker",
          "Socket.io",
          "Distributed Systems",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: `${BRAND_NAME} Portfolio`,
        alternateName: `${BRAND_NAME} - ${profile.title}`,
        description: `Official portfolio of ${BRAND_NAME}, Full-Stack Developer and Backend Specialist.`,
        publisher: {
          "@id": `${SITE_URL}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: `${BRAND_NAME} | ${profile.title} & Backend Specialist`,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#person`,
        },
        mainEntity: {
          "@id": `${SITE_URL}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projects-list`,
        name: "Featured Software Projects",
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
              "@id": `${SITE_URL}/#person`,
            },
            ...(p.links.github && { codeRepository: p.links.github }),
            ...(p.links.live && { url: p.links.live }),
          },
        })),
      },
    ],
  };
}
