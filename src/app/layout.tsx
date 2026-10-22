import type { Metadata } from "next";
import { resumeContent } from "@/features/resume/content";
import { personJsonLd } from "@/features/resume/jsonld/personJsonLd";
import "@fontsource-variable/antonio";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "./globals.css";

export const metadata: Metadata = resumeContent.seo;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <link rel="describedby" href="/llms.txt" />
        {children}
      </body>
    </html>
  );
}
