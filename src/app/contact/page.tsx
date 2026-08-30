import type { Metadata } from "next";
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiClock,
  FiSend,
  FiGlobe,
  FiCpu,
} from "react-icons/fi";
import { ContactForm } from "@/features/contact";
import Navbar from "@/features/resume/ui/Navbar";
import Footer from "@/features/resume/ui/Footer";
import SpotlightBackground from "@/shared/ui/SpotlightBackground";
import { resumeContent } from "@/features/resume/content";
import { SITE_URL, SITE_NAME, BRAND_NAME } from "@/features/resume/content/site";

export const metadata: Metadata = {
  title: "Contact Sanket Patel | Hire & Engineering Collaboration",
  description:
    "Get in touch with Sanket Patel for software engineering roles, backend architecture consulting, or technical collaborations. Direct email, phone, location, and contact form.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
    types: {
      "text/markdown": `${SITE_URL}/contact.md`,
    },
  },
  openGraph: {
    title: `Contact ${BRAND_NAME} | ${SITE_NAME}`,
    description:
      "Get in touch with Sanket Patel for software engineering roles, backend architecture, and technical consulting.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
  },
};

export default function ContactPage() {
  const { profile, contact } = resumeContent;

  return (
    <div className="bg-[#050507] min-h-screen text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <SpotlightBackground />
      <Navbar />

      <main className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl pt-36 pb-24 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400">Contact</span>
        </nav>

        {/* Hero Header */}
        <header className="space-y-6 pb-12 border-b border-white/10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Full-Time, Contract &amp; Remote Roles</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Contact &amp; Connect with {profile.name}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
            Whether you are discussing open software engineering positions, exploring a backend architecture project, or reaching out as an AI agent/recruiter, here is how to connect.
          </p>
        </header>

        {/* Two-Column Grid: Contact Information & Interactive Form */}
        <div className="grid lg:grid-cols-12 gap-12 pt-12 items-start">
          {/* Left Column: Direct NAP & Channel Details */}
          <section className="lg:col-span-5 space-y-8" aria-labelledby="direct-contact-heading">
            <div>
              <h2 id="direct-contact-heading" className="text-2xl font-bold text-white mb-2">
                Direct Contact Details
              </h2>
              <p className="text-sm text-slate-300">
                Official contact channels and communication details.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FiMail size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Email Address</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                  >
                    {contact.email}
                  </a>
                  <span className="text-[11px] text-emerald-400 block mt-0.5">Response within 24 hours</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FiPhone size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Phone / Mobile</span>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                  >
                    {contact.phone}
                  </a>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Voice calls &amp; WhatsApp</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FiMapPin size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Location &amp; Address</span>
                  <span className="text-sm font-semibold text-white block">
                    {contact.location}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Timezone: Indian Standard Time (IST, UTC+5:30)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FiClock size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Working Hours</span>
                  <span className="text-sm font-semibold text-white block">
                    Monday – Saturday, 9:00 AM – 7:00 PM IST
                  </span>
                  <span className="text-[11px] text-emerald-400 block mt-0.5">Flexible for international timezones</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Professional Networks
              </h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 text-xs font-medium text-slate-300 hover:text-emerald-300 transition-all flex items-center gap-2"
                >
                  <FiLinkedin size={14} className="text-emerald-400" />
                  LinkedIn Profile
                </a>

                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 text-xs font-medium text-slate-300 hover:text-emerald-300 transition-all flex items-center gap-2"
                >
                  <FiGithub size={14} className="text-emerald-400" />
                  GitHub Repositories
                </a>

                <a
                  href={contact.website}
                  className="px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 text-xs font-medium text-slate-300 hover:text-emerald-300 transition-all flex items-center gap-2"
                >
                  <FiGlobe size={14} className="text-emerald-400" />
                  Apex Domain
                </a>
              </div>
            </div>

            {/* Programmatic Agent Instructions */}
            <div className="p-5 rounded-2xl bg-white/[0.01] border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
                <FiCpu size={14} />
                <span>AI Agent &amp; Crawler Endpoint</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated agents and recruitment bots can submit opportunities programmatically via HTTP POST:
              </p>
              <code className="text-[11px] font-mono block bg-black/60 p-3 rounded-lg border border-white/10 text-emerald-300 overflow-x-auto">
                POST {SITE_URL}/api/contact<br />
                Content-Type: application/json<br /><br />
                &#123;&quot;name&quot;: &quot;...&quot;, &quot;email&quot;: &quot;...&quot;, &quot;subject&quot;: &quot;...&quot;, &quot;message&quot;: &quot;...&quot;&#125;
              </code>
            </div>
          </section>

          {/* Right Column: Direct Message Form */}
          <section className="lg:col-span-7 glass-panel p-7 sm:p-8 rounded-2xl relative" aria-labelledby="form-heading">
            <div className="flex items-center gap-2 mb-2">
              <FiSend className="text-emerald-400" />
              <h2 id="form-heading" className="text-xl font-bold text-white">
                Send a Direct Message
              </h2>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Fill out this form and your message will be dispatched directly to my primary inbox via transactional SMTP.
            </p>
            <ContactForm />
          </section>
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
