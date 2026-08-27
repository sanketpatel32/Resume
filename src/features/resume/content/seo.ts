import type { Metadata } from "next";
import { profile } from "@/features/resume/content/profile";
import { SITE_URL, BRAND_NAME } from "@/features/resume/content/site";

export const seo: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} | ${profile.title} & Backend Specialist`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Official portfolio of Sanket Patel, Full-Stack Developer and Backend Specialist. Expertise in Node.js, Express.js, TypeScript, Next.js, RESTful API architectures, real-time systems, and developer security tools including ScanForge and mdpeek.",
  keywords: [
    "Sanket Patel",
    "Sanket Patel Portfolio",
    "Sanket Patel Developer",
    "Full-Stack Developer",
    "Backend Specialist",
    "Node.js Developer",
    "TypeScript",
    "Next.js",
    "React",
    "ScanForge",
    "mdpeek",
    "AuraFlow",
    "RESTful API Architecture",
    "DAST Security Scanner",
    "BIT Mesra Alumni",
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
    title: `${BRAND_NAME} | ${profile.title} & Backend Specialist`,
    description:
      "Full-Stack Developer & Backend Specialist. Building scalable architectures, RESTful APIs, real-time services, and developer security tools.",
    url: SITE_URL,
    siteName: `${BRAND_NAME} Portfolio`,
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: `${BRAND_NAME} - Full-Stack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${BRAND_NAME} | ${profile.title} & Backend Specialist`,
    description:
      "Full-Stack Developer & Backend Specialist. Building scalable architectures, RESTful APIs, real-time services, and developer security tools.",
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
