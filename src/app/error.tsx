"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error(error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <main className="signal-grid min-h-[100dvh] bg-[var(--paper)] text-[var(--ink)]" role="alert">
      <header className="flex h-16 items-center gap-3 border-b border-[var(--ink)] bg-[var(--paper)] px-5 md:px-10">
        <Image src="/mark.svg" alt="" width={36} height={36} priority />
        <span className="text-sm font-bold tracking-[-0.03em]">Sanket Patel</span>
      </header>

      <section className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-4xl items-center px-5 py-16 md:px-10">
        <div>
          <span className="block h-3 w-3 bg-[var(--signal)]" aria-hidden="true" />
          <p className="mt-6 font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.1em] text-[var(--muted)]">Signal interrupted</p>
          <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.065em] outline-none">
            The page hit an unexpected fault.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-[var(--muted)]">
            Your browser is fine. Retry this page, or return home and continue from there.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={reset} className="min-h-12 bg-[var(--signal)] px-5 py-3 text-sm font-bold transition-colors duration-200 hover:bg-[var(--ink)] hover:text-[var(--paper)]">
              Try again
            </button>
            <Link href="/" className="inline-flex min-h-12 items-center border border-[var(--ink)] px-5 py-3 text-sm font-bold transition-colors duration-200 hover:bg-[var(--ink)] hover:text-[var(--paper)]">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
