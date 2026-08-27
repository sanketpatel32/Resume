import type { MetadataRoute } from "next";
import { SITE_URL } from "@/features/resume/content/site";

export default function robots(): MetadataRoute.Robots {
  const bots = [
    "GPTBot",
    "ClaudeBot",
    "PerplexityBot",
    "Applebot-Extended",
    "CCBot",
    "Google-Extended",
    "cohere-ai",
    "Bytespider",
    "Diffbot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/contact"],
      },
      ...bots.map((bot) => ({
        userAgent: bot,
        allow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
