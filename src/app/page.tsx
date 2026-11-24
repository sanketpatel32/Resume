import type { Metadata } from "next";
import FieldTrialsPage from "@/features/fieldtrials/FieldTrialsPage";
import { resumeContent } from "@/features/resume/content";
import { getStory } from "@/features/resume/content/stories";
import { buildFeaturedItemList } from "@/features/resume/jsonld/personJsonLd";

// Homepage-specific keyword override: same set as the shared metadata,
// minus mdpeek — its deeper route and record stay, but it is no longer
// promoted on the front page.
export const metadata: Metadata = {
  keywords: (resumeContent.seo.keywords as string[]).filter(
    (k) => k.toLowerCase() !== "mdpeek",
  ),
};

// The homepage's featured scope: the two exhibits plus the indexed public
// work. mdpeek and the unnamed private builds stay out of this page's
// structured data; the shared identity graph is unchanged site-wide.
const FEATURED_SLUGS = new Set([
  "blunt-code",
  "miracode",
  "auraflow",
  "small-server",
]);

const featuredItemList = buildFeaturedItemList(
  resumeContent.projects.filter((p) =>
    FEATURED_SLUGS.has(getStory(p.name)?.slug ?? ""),
  ),
);

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
      <FieldTrialsPage />
    </>
  );
}
