import Link from "next/link";
import { FiHome, FiCompass, FiFileText, FiMail } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050507] text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs group-hover:border-emerald-500/40 transition-colors">
            SP
          </div>
          <span className="font-semibold text-sm tracking-tight text-white group-hover:text-emerald-300 transition-colors">
            Sanket Patel
          </span>
        </Link>
        <span className="text-xs font-mono text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
          HTTP 404
        </span>
      </header>

      {/* Main Content */}
      <section className="relative z-10 max-w-3xl my-auto py-12">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md mb-6">
          {"// Resource Not Found"}
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Page not found.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
          The path you requested does not exist on this server. If you are an AI
          agent, crawler, or human visitor, use the recovery links below to
          navigate to canonical resources.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-semibold text-sm rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_25px_rgba(16,185,129,0.25)]"
          >
            <FiHome size={16} /> Return to Portfolio
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-slate-200 text-sm font-medium rounded-xl hover:bg-white/5 hover:border-white/30 transition-all glass-panel"
          >
            <FiCompass size={16} /> Explore Projects
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-slate-200 text-sm font-medium rounded-xl hover:bg-white/5 hover:border-white/30 transition-all glass-panel"
          >
            <FiMail size={16} /> Contact Sanket
          </Link>
        </div>

        {/* Machine-Readable / Agent Discovery Section */}
        <nav
          aria-label="Agent recovery endpoints"
          className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md"
        >
          <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FiFileText size={14} /> Agent &amp; Machine-Readable Endpoints
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
            <li>
              <Link
                href="/llms.txt"
                className="hover:text-emerald-300 underline underline-offset-4 decoration-white/20 hover:decoration-emerald-400 transition-colors"
              >
                /llms.txt (LLM Summary Index)
              </Link>
            </li>
            <li>
              <Link
                href="/llms-full.txt"
                className="hover:text-emerald-300 underline underline-offset-4 decoration-white/20 hover:decoration-emerald-400 transition-colors"
              >
                /llms-full.txt (Complete Context)
              </Link>
            </li>
            <li>
              <Link
                href="/index.md"
                className="hover:text-emerald-300 underline underline-offset-4 decoration-white/20 hover:decoration-emerald-400 transition-colors"
              >
                /index.md (Markdown Portfolio)
              </Link>
            </li>
            <li>
              <Link
                href="/sitemap.xml"
                className="hover:text-emerald-300 underline underline-offset-4 decoration-white/20 hover:decoration-emerald-400 transition-colors"
              >
                /sitemap.xml (XML Sitemap)
              </Link>
            </li>
          </ul>
        </nav>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 pt-6 text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Sanket Patel</span>
        <span>https://www.sanketpatel.online/</span>
      </footer>
    </main>
  );
}
