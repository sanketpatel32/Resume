import type { Metadata } from "next";
import SwitchyardPage from "@/features/switchyard/SwitchyardPage";
import { resumeContent } from "@/features/resume/content";
import { getStory } from "@/features/resume/content/stories";
import { buildFeaturedItemList } from "@/features/resume/jsonld/personJsonLd";

export const metadata: Metadata = {
  description: "Sanket Patel builds developer tools and contributes to open source. Explore System Design Quest, Small Server, AuraFlow, and merged work in other repositories.",
  keywords: (resumeContent.seo.keywords as string[]).filter(
    (k) => k.toLowerCase() !== "mdpeek",
  ),
};

const projects = ["small-server", "auraflow", "blunt-code"].flatMap((slug) =>
  resumeContent.projects.filter((p) => getStory(p.name)?.slug === slug),
);
const featuredItemList = buildFeaturedItemList([
  {
    name: "System Design Quest",
    description: "An interactive course for learning system design through practice.",
    tech: ["TypeScript", "React"],
    links: { github: "https://github.com/sanketpatel32/system-design-quest" },
  },
  ...projects,
]);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...featuredItemList,
          }),
        }}
      />
      <SwitchyardPage />
    </>
  );
}
