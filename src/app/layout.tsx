import type { Metadata } from "next";
import { resumeContent } from "@/features/resume/content";
import { personJsonLd } from "@/features/resume/jsonld/personJsonLd";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/fraunces";
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
