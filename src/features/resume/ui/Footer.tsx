"use client";

import { FiArrowUp } from "react-icons/fi";
import type { Profile } from "@/features/resume/model/types";
import { scrollToTop } from "@/shared/lib/scroll";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="bg-[#050507] border-t border-white/10 py-10 relative z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <span className="text-white font-bold text-base tracking-tight">
              {profile.name}
            </span>
            <span className="hidden md:inline text-white/20">•</span>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              © {new Date().getFullYear()} {profile.name}. Designed & Built with Next.js & Tailwind CSS.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-emerald-400 transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <span className="p-2 border border-white/10 rounded-lg group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors">
              <FiArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
