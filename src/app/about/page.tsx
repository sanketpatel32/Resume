import type { Metadata } from "next";
import Link from "next/link";
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiMapPin, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import Navbar from "@/features/resume/ui/Navbar";
import Footer from "@/features/resume/ui/Footer";
import SpotlightBackground from "@/shared/ui/SpotlightBackground";
import { resumeContent } from "@/features/resume/content";
import { SITE_URL, SITE_NAME, BRAND_NAME } from "@/features/resume/content/site";

export const metadata: Metadata = {
  title: "About Sanket Patel | Full-Stack Developer & Backend Specialist",
  description:
    "Learn about Sanket Patel, a Full-Stack Developer and Backend Specialist based in Jamnagar, India. Discover his background, engineering philosophy, production systems, and experience.",
  alternates: {
    canonical: `${SITE_URL}/about`,
    types: {
      "text/markdown": `${SITE_URL}/about.md`,
    },
  },
  openGraph: {
    title: `About ${BRAND_NAME} | ${SITE_NAME}`,
    description:
      "Full-Stack Developer & Backend Specialist with a passion for designing scalable RESTful architectures, DAST security scanners, and real-time systems.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
  },
};

export default function AboutPage() {
  const { profile, contact, career, education } = resumeContent;

  return (
    <div className="bg-[#050507] min-h-screen text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <SpotlightBackground />
      <Navbar />

      <main className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl pt-36 pb-24 relative z-10">
        {/* Breadcrumb & Section Identifier */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400">About</span>
        </nav>

        {/* Hero Profile Header */}
        <header className="space-y-6 pb-12 border-b border-white/10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Full-Stack Developer &amp; Backend Specialist</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            About {profile.name}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
            {profile.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-2 text-sm shadow-[0_0_25px_rgba(16,185,129,0.25)]"
            >
              Get in Touch
              <FiArrowRight size={16} />
            </Link>

            <Link
              href="/resume.pdf"
              download="Sanket_Patel_Resume.pdf"
              className="px-6 py-3 border border-white/15 rounded-xl font-medium text-slate-200 hover:bg-white/5 hover:border-white/30 transition-all flex items-center gap-2 text-sm glass-panel"
            >
              <FiDownload className="text-emerald-400" />
              Download CV (PDF)
            </Link>
          </div>
        </header>

        {/* Core Bio & Background */}
        <section className="py-12 space-y-6 border-b border-white/10" aria-labelledby="bio-heading">
          <h2 id="bio-heading" className="text-2xl sm:text-3xl font-bold text-white">
            Engineering Background &amp; Philosophy
          </h2>
          <div className="space-y-4 text-slate-300 text-base leading-relaxed">
            <p>
              I am a software engineer focused on architecting resilient backend systems, RESTful microservices, and interactive web applications. My foundation blends analytical rigor from an engineering degree at <strong>Birla Institute of Technology (BIT Mesra)</strong> with intensive, hands-on production software development.
            </p>
            <p>
              My approach prioritizes system clarity, performance optimization, and developer ergonomics. Whether designing automated DAST security testing frameworks like <strong>ScanForge</strong>, building lightweight cross-platform desktop editors like <strong>mdpeek</strong>, or managing high-throughput real-time communication at <strong>The Algorithm</strong>, I focus on clean architectural boundaries and reliable code.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">Primary Focus</span>
              <span className="text-white font-semibold text-sm">Backend APIs &amp; Distributed Architecture</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">Alma Mater</span>
              <span className="text-white font-semibold text-sm">BIT Mesra (B.Tech, 8.2 CGPA)</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">Location</span>
              <span className="text-white font-semibold text-sm">Jamnagar, Gujarat, India</span>
            </div>
          </div>
        </section>

        {/* Professional Experience Summary */}
        <section className="py-12 space-y-6 border-b border-white/10" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="text-2xl sm:text-3xl font-bold text-white">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {career.map((job) => (
              <article key={`${job.company}-${job.role}`} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{job.role}</h3>
                    <p className="text-emerald-400 font-medium text-sm">{job.company}</p>
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
                    <span>{job.dates}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FiMapPin size={12} /> {job.location}</span>
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {job.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-slate-300 text-sm leading-relaxed flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Education & Academic Honors */}
        <section className="py-12 space-y-6 border-b border-white/10" aria-labelledby="education-heading">
          <h2 id="education-heading" className="text-2xl sm:text-3xl font-bold text-white">
            Education &amp; Academic Honors
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div key={edu.school} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-emerald-400">{edu.dates}</span>
                <h3 className="text-lg font-bold text-white">{edu.school}</h3>
                <p className="text-sm text-slate-300 font-medium">{edu.degree}</p>
                <ul className="space-y-1.5 pt-2 border-t border-white/10">
                  {edu.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-400 shrink-0" size={14} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Anchor Details & Direct Channels */}
        <section className="py-12 space-y-6" aria-labelledby="verification-heading">
          <h2 id="verification-heading" className="text-2xl sm:text-3xl font-bold text-white">
            Identity &amp; Verified Profiles
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Verify my identity and explore code repositories, professional endorsements, and technical contributions across verified channels:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group flex items-center gap-3"
            >
              <FiGithub className="text-emerald-400 text-lg" />
              <div>
                <span className="text-xs font-mono text-slate-400 block">GitHub</span>
                <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">sanketpatel32</span>
              </div>
            </a>

            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group flex items-center gap-3"
            >
              <FiLinkedin className="text-emerald-400 text-lg" />
              <div>
                <span className="text-xs font-mono text-slate-400 block">LinkedIn</span>
                <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">sanketpatel32</span>
              </div>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group flex items-center gap-3"
            >
              <FiMail className="text-emerald-400 text-lg" />
              <div>
                <span className="text-xs font-mono text-slate-400 block">Direct Email</span>
                <span className="text-xs font-semibold text-white truncate block group-hover:text-emerald-300 transition-colors">{contact.email}</span>
              </div>
            </a>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
              <FiMapPin className="text-emerald-400 text-lg" />
              <div>
                <span className="text-xs font-mono text-slate-400 block">Location</span>
                <span className="text-sm font-semibold text-white">Jamnagar, India</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
