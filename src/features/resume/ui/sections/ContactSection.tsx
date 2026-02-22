"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  FiGlobe,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiYoutube,
} from "react-icons/fi";
import { ContactForm } from "@/features/contact";
import type { ContactInfo } from "@/features/resume/model/types";
import Section from "@/shared/ui/Section";

interface ContactSectionProps {
  contact: ContactInfo;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="contact" title="Contact Me">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <p className="text-lg text-[var(--text-muted)] leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to
            be part of your vision. Feel free to reach out!
          </p>

          <div className="space-y-6">
            <m.a
              href={`mailto:${contact.email}`}
              whileHover={shouldReduceMotion ? {} : { x: 5 }}
              className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
            >
              <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                <FiMail size={20} />
              </span>
              <span>{contact.email}</span>
            </m.a>

            <m.a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              whileHover={shouldReduceMotion ? {} : { x: 5 }}
              className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
            >
              <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                <FiPhone size={20} />
              </span>
              <span>{contact.phone}</span>
            </m.a>

            <m.div
              whileHover={shouldReduceMotion ? {} : { x: 5 }}
              className="flex items-center gap-4 text-[var(--text-muted)] group"
            >
              <span className="p-3 border border-white/10 rounded-lg">
                <FiMapPin size={20} />
              </span>
              <span>{contact.location}</span>
            </m.div>

            {contact.github && (
              <m.a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { x: 5 }}
                className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
              >
                <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                  <FiGithub size={20} />
                </span>
                <span>github.com/sanketpatel32</span>
              </m.a>
            )}

            {contact.instagram && (
              <m.a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { x: 5 }}
                className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
              >
                <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                  <FiInstagram size={20} />
                </span>
                <span>@sanket_patel32</span>
              </m.a>
            )}

            {contact.linkedin && (
              <m.a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { x: 5 }}
                className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
              >
                <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                  <FiLinkedin size={20} />
                </span>
                <span>linkedin.com/in/sanketpatel32</span>
              </m.a>
            )}

            {contact.youtube && (
              <m.a
                href={contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { x: 5 }}
                className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
              >
                <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                  <FiYoutube size={20} />
                </span>
                <span>@camouflage32p</span>
              </m.a>
            )}

            {contact.website && (
              <m.a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { x: 5 }}
                className="flex items-center gap-4 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
              >
                <span className="p-3 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
                  <FiGlobe size={20} />
                </span>
                <span>sanketpatel.online</span>
              </m.a>
            )}
          </div>
        </div>

        <m.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.02]"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Send me a message</h3>
          <ContactForm />
        </m.div>
      </div>
    </Section>
  );
}