import type { Metadata } from "next";
import "./switchyard.css";
import SwitchyardPage from "@/features/switchyard/SwitchyardPage";
import { resumeContent } from "@/features/resume/content";
import { buildFeaturedItemList } from "@/features/resume/jsonld/personJsonLd";

export const metadata: Metadata = {
  description: "Sanket Patel builds developer tools and contributes to open source. Explore System Design Quest, UI Vault, Blunt Code, Small Server, and merged work in other repositories.",
  keywords: (resumeContent.seo.keywords as string[]).filter(
    (k) => k.toLowerCase() !== "mdpeek",
  ),
};

const featuredItemList = buildFeaturedItemList([
  { name: "System Design Quest", description: "An interactive course for learning system design through practice.", tech: ["TypeScript", "React"], links: { github: "https://github.com/sanketpatel32/system-design-quest" } },
  { name: "UI Vault", description: "A searchable catalogue of interface components with live previews.", tech: ["JavaScript"], links: { github: "https://github.com/sanketpatel32/ui-vault", live: "https://sanketpatel32.github.io/ui-vault/" } },
  { name: "Blunt Code", description: "A local code-review workbench with SARIF export.", tech: ["Go", "React", "SQLite"], links: { github: "https://github.com/sanketpatel32/Blunt-code" } },
  { name: "Small Server", description: "A one-binary Go playground for webhooks and HTTP.", tech: ["Go", "SQLite", "OpenAPI"], links: { github: "https://github.com/sanketpatel32/Small-server" } },
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
