import type { Metadata } from "next";
import FieldTrialsPage from "@/features/fieldtrials/FieldTrialsPage";
import { resumeContent } from "@/features/resume/content";

// Homepage-specific keyword override: same set as the shared metadata,
// minus mdpeek — its deeper route and record stay, but it is no longer
// promoted on the front page.
export const metadata: Metadata = {
  keywords: (resumeContent.seo.keywords as string[]).filter(
    (k) => k.toLowerCase() !== "mdpeek",
  ),
};

export default function HomePage() {
  return <FieldTrialsPage />;
}
