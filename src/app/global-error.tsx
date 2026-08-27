"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error(error);
    headingRef.current?.focus();
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-[100dvh] items-center bg-[#efede4] px-5 py-16 text-[#11120f]" role="alert">
          <section className="mx-auto w-full max-w-3xl border border-[#11120f] bg-[#efede4] p-6 md:p-10">
            <span className="block h-3 w-3 bg-[#ff4f1f]" aria-hidden="true" />
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.1em] text-[#64665e]">System recovery</p>
            <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.06em] outline-none">
              The portfolio could not start.
            </h1>
            <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-[#64665e]">
              Retry the application. If the problem continues, return to the home route.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={reset} className="min-h-12 bg-[#ff4f1f] px-5 py-3 text-sm font-bold transition-colors duration-200 hover:bg-[#11120f] hover:text-[#efede4]">
                Retry application
              </button>
              <Link href="/" className="inline-flex min-h-12 items-center border border-[#11120f] px-5 py-3 text-sm font-bold transition-colors duration-200 hover:bg-[#11120f] hover:text-[#efede4]">
                Return home
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
