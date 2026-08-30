"use client";

import Link from "next/link";
import type { Profile } from "@/features/resume/model/types";
import { scrollToTop } from "@/shared/lib/scroll";

interface FooterProps { profile: Profile; }

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="resume-container footer-grid">
        <div>
          <p className="footer-statement">Good systems make room for good work.</p>
          <p className="footer-meta">{profile.name} · Jamnagar, Gujarat, India</p>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/developers">Developers</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/llms.txt">llms.txt</Link>
          <button type="button" onClick={scrollToTop}>Back to top ↑</button>
        </div>
      </div>
      <div className="resume-container footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Available for software engineering roles</span>
      </div>
    </footer>
  );
}
