"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";
import type { Profile } from "@/features/resume/model/types";
import { scrollToTop } from "@/shared/lib/scroll";

interface FooterProps { profile: Profile; }

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
  hour12: false,
});

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(timeFormat.format(new Date()));
    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 15_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);
  return time;
}

export default function Footer({ profile }: FooterProps) {
  const time = useLocalTime();
  const [first, ...rest] = profile.name.split(" ");

  return (
    <footer className="site-footer">
      <div className="resume-container footer-grid">
        <div>
          <p className="footer-statement">Built from scratch. All the way through.</p>
          <p className="footer-meta">
            Jamnagar, Gujarat, India
            <br />
            Local time <span className="footer-time">{time ?? "--:--"}</span> IST
          </p>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/developers">Developers</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/llms.txt">llms.txt</Link>
          <button type="button" className="footer-top" onClick={scrollToTop} data-magnetic="0.4" data-cursor="Surface">
            <FiArrowUp aria-hidden="true" />
            <span>Back to the surface</span>
          </button>
        </div>
      </div>
      <p className="footer-wordmark" aria-hidden="true">
        <span>{first}</span>
        <span>{rest.join(" ")}</span>
      </p>
      <div className="resume-container footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Available for software engineering roles</span>
      </div>
    </footer>
  );
}
