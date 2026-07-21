"use client";

import { m } from "framer-motion";
import {
  FiGlobe,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiYoutube,
  FiArrowUpRight,
} from "react-icons/fi";
import { ContactForm } from "@/features/contact";
import type { ContactInfo } from "@/features/resume/model/types";
import { useHydratedReducedMotion } from "@/shared/lib/motion";
import Section from "@/shared/ui/Section";

interface ContactSectionProps {
  contact: ContactInfo;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  const socialLinks = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: FiMail },
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}`, icon: FiPhone },
    { label: "Location", value: contact.location, href: null, icon: FiMapPin },
    { label: "GitHub", value: "github.com/sanketpatel32", href: contact.github, icon: FiGithub },
    { label: "LinkedIn", value: "linkedin.com/in/sanketpatel32", href: contact.linkedin, icon: FiLinkedin },
    { label: "Instagram", value: "@sanket_patel32", href: contact.instagram, icon: FiInstagram },
    { label: "YouTube", value: "@camouflage32p", href: contact.youtube, icon: FiYoutube },
    { label: "Website", value: "sanketpatel.online", href: contact.website, icon: FiGlobe },
  ];

  return (
    <Section
      id="contact"
      number="06"
      tag="GET IN TOUCH"
      title="Let's Connect"
      description="Have a question, collaboration idea, or open engineering role? Reach out directly or drop a message below."
    >
      <div className="grid gap-12 lg:grid-cols-12 items-start">
        {/* Left Column: Direct Links */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="glass-card group p-4 rounded-xl flex items-center gap-3.5 relative overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className="text-xs font-medium text-slate-200 truncate group-hover:text-emerald-300 transition-colors">
                      {item.value}
                    </div>
                  </div>
                  {item.href && (
                    <FiArrowUpRight size={14} className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </div>
              );

              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    {content}
                  </a>
                );
              }

              return <div key={item.label}>{content}</div>;
            })}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <m.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 glass-panel p-7 sm:p-8 rounded-2xl relative"
        >
          <h3 className="text-xl font-bold text-white mb-2">Send a Direct Message</h3>
          <p className="text-xs text-[var(--text-muted)] mb-6">
            Fill in the details below and I will respond to your inbox as soon as possible.
          </p>
          <ContactForm />
        </m.div>
      </div>
    </Section>
  );
}