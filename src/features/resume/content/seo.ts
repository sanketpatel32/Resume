import type { Metadata } from "next";
import { profile } from "@/features/resume/content/profile";
import { SITE_URL, BRAND_NAME, SITE_NAME } from "@/features/resume/content/site";

export const seo: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${profile.title} & Backend Specialist`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Official portfolio of Sanket Patel, Full-Stack Developer based in Jamnagar, India. Built LayersRank and Claire from scratch, with end-to-end application ownership, backend engineering, and open-source developer tools.",
  keywords: [
    "Sanket Patel",
    "Sanket Patel Portfolio",
    "Sanket Patel Developer",
    "Sanket Patel Software Engineer",
    "Sanket Patel Official",
    "Sanket Patel Jamnagar",
    "Sanket Patel BIT Mesra",
    "sanketpatel.online",
    "sanketpatel32",
    "Full-Stack Developer",
    "Backend Specialist",
    "Node.js Developer",
    "TypeScript",
    "Next.js",
    "React",
    "LayersRank",
    "Claire",
    "ScanForge",
    "mdpeek",
    "AuraFlow",
    "RESTful API Architecture",
    "DAST Security Scanner",
  ],
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
  openGraph: {
    type: "profile",
    title: `${SITE_NAME} | ${profile.title} & Backend Specialist`,
    description:
      "Sanket Patel, Full-Stack Developer. Built LayersRank and Claire from scratch with end-to-end application ownership, alongside open-source developer tools.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: `${BRAND_NAME} - Full-Stack Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} | ${profile.title} & Backend Specialist`,
    description:
      "Sanket Patel, Full-Stack Developer. Built LayersRank and Claire from scratch with end-to-end application ownership, alongside open-source developer tools.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
