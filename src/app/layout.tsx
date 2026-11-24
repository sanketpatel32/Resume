import type { Metadata } from "next";
import { resumeContent } from "@/features/resume/content";
import { buildPersonJsonLd } from "@/features/resume/jsonld/personJsonLd";
import { SITE_URL } from "@/features/resume/content/site";
import { introSkipScript } from "@/features/resume/experience/intro";
import "@fontsource-variable/antonio";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "./globals.css";
import "./fieldtrials.css";

export const metadata: Metadata = resumeContent.seo;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introSkipScript }} />
      </head>
      <body className="antialiased">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // The featured-projects ItemList is homepage-scoped and emitted
            // by page.tsx; the identity graph stays shared.
            __html: JSON.stringify(
              buildPersonJsonLd(resumeContent, SITE_URL, {
                includeItemList: false,
              }),
            ),
          }}
        />
        <link rel="describedby" href="/llms.txt" />
        {children}
      </body>
    </html>
  );
}
