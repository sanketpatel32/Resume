import type { Metadata } from "next";
import Link from "next/link";
import { FiShield, FiMail, FiMapPin, FiPhone, FiLock, FiCheckCircle } from "react-icons/fi";
import Navbar from "@/features/resume/ui/Navbar";
import Footer from "@/features/resume/ui/Footer";
import SpotlightBackground from "@/shared/ui/SpotlightBackground";
import { resumeContent } from "@/features/resume/content";
import { SITE_URL, SITE_NAME, BRAND_NAME } from "@/features/resume/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Sanket Patel Portfolio",
  description:
    "Official Privacy Policy for Sanket Patel's portfolio website (sanketpatel.online). Learn about data protection, contact form submissions, server logging, and privacy rights.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
    types: {
      "text/markdown": `${SITE_URL}/privacy.md`,
    },
  },
  openGraph: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "Privacy policy and data protection transparency for Sanket Patel's official portfolio website.",
    url: `${SITE_URL}/privacy`,
    siteName: SITE_NAME,
  },
};

export default function PrivacyPage() {
  const { profile, contact } = resumeContent;

  return (
    <div className="bg-[#050507] min-h-screen text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <SpotlightBackground />
      <Navbar />

      <main className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl pt-36 pb-24 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400">Privacy Policy</span>
        </nav>

        {/* Header Section */}
        <header className="space-y-6 pb-12 border-b border-white/10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <FiShield size={14} />
            <span>Transparency &amp; Data Protection</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Privacy Policy
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            This Privacy Policy explains how <strong>{profile.name}</strong> (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) collects, uses, and safeguards information submitted through the personal portfolio website located at <strong>https://www.sanketpatel.online</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span>Last Updated: August 2026</span>
            <span>•</span>
            <span>Effective Date: August 2025</span>
          </div>
        </header>

        {/* Policy Content Sections */}
        <div className="space-y-12 py-12 text-slate-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1: Overview & Scope */}
          <section className="space-y-4" aria-labelledby="section-overview">
            <h2 id="section-overview" className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-lg">01.</span> Scope &amp; Operator Identity
            </h2>
            <p>
              This website is operated by <strong>{profile.name}</strong>, Full-Stack Developer and Backend Specialist, residing in Jamnagar, Gujarat, India. This website serves as a technical portfolio, showcasing software projects, architecture case studies, and engineering qualifications, as well as providing direct contact channels for employment and consulting opportunities.
            </p>
            <p>
              I respect your privacy and am committed to maintaining transparency regarding any data collected through your visits to this website or through direct communications.
            </p>
          </section>

          {/* Section 2: Information Collected */}
          <section className="space-y-4" aria-labelledby="section-collection">
            <h2 id="section-collection" className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-lg">02.</span> Information Collected
            </h2>
            <p>
              I collect only the minimum amount of information necessary to respond to your inquiries and maintain secure site operations:
            </p>
            <div className="space-y-3 pl-4 border-l-2 border-emerald-500/30">
              <div>
                <h3 className="text-white font-semibold text-base">A. Contact Form &amp; API Submissions</h3>
                <p className="text-sm text-slate-300 mt-1">
                  When you voluntarily submit a message through the contact form or programmatic endpoint (<code>/api/contact</code>), you provide your <strong>name</strong>, <strong>email address</strong>, <strong>subject line</strong>, and <strong>message body</strong>. This information is provided voluntarily for the purpose of communicating with me.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">B. Automated Technical Server Logs</h3>
                <p className="text-sm text-slate-300 mt-1">
                  Like standard web servers, hosting infrastructure automatically records technical log entries when you request a resource. These logs may contain your IP address, browser user-agent, requested URL, referral URL, and timestamp. These logs are used solely for site reliability, security monitoring, and rate-limiting enforcement.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">C. No Third-Party Tracking Cookies</h3>
                <p className="text-sm text-slate-300 mt-1">
                  This website does <strong>not</strong> employ cross-site tracking cookies, behavioral tracking pixels, or third-party marketing beacons.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Purpose of Processing */}
          <section className="space-y-4" aria-labelledby="section-purpose">
            <h2 id="section-purpose" className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-lg">03.</span> Purpose of Data Processing
            </h2>
            <p>Your information is processed strictly for the following legitimate purposes:</p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2.5">
                <FiCheckCircle className="text-emerald-400 shrink-0 mt-1" size={16} />
                <span>To respond to your inquiries, job proposals, engineering collaborations, or technical questions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FiCheckCircle className="text-emerald-400 shrink-0 mt-1" size={16} />
                <span>To prevent automated abuse, spam, and denial-of-service attempts via rate-limiting mechanisms.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FiCheckCircle className="text-emerald-400 shrink-0 mt-1" size={16} />
                <span>To deliver machine-readable representations (such as Markdown or JSON-LD) to AI agents requesting content negotiation.</span>
              </li>
            </ul>
          </section>

          {/* Section 4: Third-Party Service Providers */}
          <section className="space-y-4" aria-labelledby="section-processors">
            <h2 id="section-processors" className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-lg">04.</span> Third-Party Service Providers
            </h2>
            <p>
              I rely on trusted third-party infrastructure providers that comply with global data protection standards:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <h3 className="text-white font-semibold text-sm mb-1">Brevo (Sendinblue)</h3>
                <p className="text-xs text-slate-400">
                  Transactional SMTP service used exclusively to forward contact form submissions directly to my personal inbox. Data is encrypted in transit using TLS.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <h3 className="text-white font-semibold text-sm mb-1">Vercel Edge Network</h3>
                <p className="text-xs text-slate-400">
                  Cloud hosting, edge routing, and content delivery network providing HTTPS encryption, caching, and infrastructure resilience.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Data Security & Retention */}
          <section className="space-y-4" aria-labelledby="section-security">
            <h2 id="section-security" className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-lg">05.</span> Data Security &amp; Retention
            </h2>
            <p>
              All traffic between your browser and this website is encrypted using Transport Layer Security (TLS/HTTPS). Contact form communications are retained in my private email account only for as long as necessary to conduct professional correspondence or fulfill contractual obligations. I do not sell, rent, or trade your contact information to any third party.
            </p>
          </section>

          {/* Section 6: User Rights */}
          <section className="space-y-4" aria-labelledby="section-rights">
            <h2 id="section-rights" className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-lg">06.</span> Your Data Rights &amp; Requests
            </h2>
            <p>
              Regardless of your location, you have the right to request access to the information you have submitted, request corrections, or request the permanent deletion of your contact records.
            </p>
            <p>
              To exercise any of these rights, please send an email directly to <a href={`mailto:${contact.email}`} className="text-emerald-400 hover:underline">{contact.email}</a> with the subject line <em>&quot;Data Privacy Request&quot;</em>. Requests are fulfilled within 30 days without charge.
            </p>
          </section>

          {/* Section 7: Contact for Privacy Inquiries */}
          <section className="space-y-4 pt-6 border-t border-white/10" aria-labelledby="section-contact">
            <h2 id="section-contact" className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-lg">07.</span> Privacy Contact Information
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact:
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold">
                <FiLock className="text-emerald-400" />
                <span>{profile.name} — Data Controller</span>
              </div>
              <div className="text-sm text-slate-300 space-y-1">
                <p className="flex items-center gap-2">
                  <FiMapPin className="text-emerald-400 shrink-0" />
                  <span>{contact.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FiMail className="text-emerald-400 shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-emerald-400 transition-colors">
                    {contact.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone className="text-emerald-400 shrink-0" />
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-emerald-400 transition-colors">
                    {contact.phone}
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
