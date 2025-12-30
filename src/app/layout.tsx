import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sanket Patel | Full-Stack Developer",
  description:
    "Full-Stack Developer with expertise in React, Node.js, and AI/ML technologies. Building scalable web applications and intelligent systems.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Node.js",
    "AI",
    "Machine Learning",
    "Web Development",
  ],
  authors: [{ name: "Sanket Patel" }],
  openGraph: {
    title: "Sanket Patel | Full-Stack Developer",
    description:
      "Full-Stack Developer with expertise in React, Node.js, and AI/ML technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
