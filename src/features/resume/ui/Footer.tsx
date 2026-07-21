"use client";

import { FiArrowUp } from "react-icons/fi";
import type { Profile } from "@/features/resume/model/types";
import { scrollToTop } from "@/shared/lib/scroll";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="bg-black border-t border-white/10 py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            {"\u00A9"} {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
          >
            Back to top
            <span className="p-1.5 border border-white/10 rounded-lg group-hover:border-[var(--accent)]/50 transition-colors">
              <FiArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
