import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { resumeContent } from "@/features/resume/content";
import { personJsonLd } from "@/features/resume/jsonld/personJsonLd";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = resumeContent.seo;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistMono.variable} antialiased`}>
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
