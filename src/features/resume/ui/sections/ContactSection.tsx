"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail, FiPhone, FiYoutube, FiInstagram, FiGlobe } from "react-icons/fi";
import { ContactForm } from "@/features/contact";
import type { ContactInfo } from "@/features/resume/model/types";
import { useExperience } from "@/features/resume/experience/context";
import SplitText from "@/features/resume/ui/descent/SplitText";
import { LazySceneView as SceneView } from "@/features/resume/gl/lazy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ContactSectionProps {
  contact: ContactInfo;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const root = useRef<HTMLElement>(null);
  const { motion, gl } = useExperience();
  const [copied, setCopied] = useState(false);

  const links = [
    { label: "GitHub", href: contact.github, icon: FiGithub },
    { label: "LinkedIn", href: contact.linkedin, icon: FiLinkedin },
    { label: "Website", href: contact.website, icon: FiGlobe },
    { label: "YouTube", href: contact.youtube, icon: FiYoutube },
    { label: "Instagram", href: contact.instagram, icon: FiInstagram },
  ].filter((link): link is { label: string; href: string; icon: typeof FiGithub } => Boolean(link.href));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  useGSAP(
    () => {
      const section = root.current;
      if (!section || !motion) return;
      gsap.fromTo(".core-title [data-split-unit]", { yPercent: 110 }, {
        yPercent: 0,
        duration: 1.2,
        stagger: 0.025,
        ease: "expo.out",
        scrollTrigger: { trigger: ".core-title", start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(".core-orb", { scale: 0.6, opacity: 0 }, {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "top 20%", scrub: 0.6 },
      });
    },
    { scope: root, dependencies: [motion], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="contact" className="chapter core" data-chapter="The core" data-tone="core" aria-labelledby="contact-heading">
      <div className="core-orb" aria-hidden="true">
        <div className="core-orb-fallback" data-gl-fallback />
        {gl && <SceneView className="core-gl" request={{ kind: "core" }} />}
      </div>
      <div className="resume-container core-inner">
        <p className="chapter-tag"><span>L6</span> The core</p>
        <h2 id="contact-heading" className="core-title">
          <span className="core-line"><SplitText text="Let’s build" /></span>{" "}
          <span className="core-line core-line-accent"><SplitText text="the whole thing." /></span>
        </h2>
        <p className="core-lead">
          Hiring, collaborating or just curious? You have reached the bottom of the stack. This is where I
          answer.
        </p>

        <div className="core-email-row">
          <a className="core-email" href={`mailto:${contact.email}`} data-magnetic="0.15" data-cursor="Write">
            <FiMail aria-hidden="true" />
            <span>{contact.email}</span>
          </a>
          <button type="button" className="core-copy" onClick={copyEmail} data-magnetic="0.4" aria-live="polite">
            {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="core-grid">
          <div className="core-direct">
            <a className="core-phone" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
              <FiPhone aria-hidden="true" /> {contact.phone}
            </a>
            <p className="core-location">{contact.location} · IST (UTC+5:30)</p>
            <ul className="core-links">
              {links.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" data-magnetic="0.35">
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="core-form">
            <h3>Send a direct message</h3>
            <p>It goes straight to my inbox.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
