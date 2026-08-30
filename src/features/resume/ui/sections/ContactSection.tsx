"use client";

import { FiArrowUpRight, FiGithub, FiGlobe, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone, FiYoutube } from "react-icons/fi";
import { ContactForm } from "@/features/contact";
import type { ContactInfo } from "@/features/resume/model/types";
import Section from "@/shared/ui/Section";

interface ContactSectionProps { contact: ContactInfo; }

export default function ContactSection({ contact }: ContactSectionProps) {
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
    <Section id="contact" number="06" tag="Get in touch" title="Let’s talk" description="Have a question, collaboration idea, or open engineering role? Reach out directly or drop a message below.">
      <div className="contact-grid">
        <div className="contact-links">
          <h3>Direct contact</h3>
          {socialLinks.map(({ label, value, href, icon: Icon }) => {
            const row = <span className="contact-row"><Icon aria-hidden="true" /><span><b>{label}</b><small>{value}</small></span>{href && <FiArrowUpRight aria-hidden="true" />}</span>;
            return href ? <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{row}</a> : <span key={label}>{row}</span>;
          })}
        </div>
        <div className="contact-form-panel">
          <h3>Send a direct message</h3>
          <p>Fill in the details below and I will respond to your inbox as soon as possible.</p>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
