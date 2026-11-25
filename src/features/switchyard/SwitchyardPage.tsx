import SdqCard from "@/features/fieldtrials/SdqCard";
import Upstream from "./Upstream";
import ProjectCases from "./ProjectCases";

const gh = "https://github.com/sanketpatel32";

function Mark() {
  return (
    <svg viewBox="0 0 48 48" width="36" height="36" fill="none" aria-hidden="true">
      <path d="M7 11h11l10 13h13M7 24h34M7 37h11l10-13" stroke="currentColor" strokeWidth="3"/>
      <path d="m35 18 6 6-6 6" stroke="currentColor" strokeWidth="3"/>
    </svg>
  );
}

function Track() {
  return (
    <svg viewBox="0 0 536 304" fill="none" aria-hidden="true" className="sy-tracks">
      <defs>
        <pattern id="sy-dot" width="17" height="17" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#d6ccf3" />
        </pattern>
      </defs>
      <path fill="url(#sy-dot)" d="M24 18h487v248H24z"/>
      <g strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M39 146h147q20 0 32-14l58-60q12-14 32-14h177" stroke="#75edb6"/>
        <path d="M39 165h446" stroke="#fbc276"/>
        <path d="M39 184h151q20 0 32 14l58 58q12 14 32 14h173" stroke="#f4a0e2"/>
      </g>
      <g fill="#272044" strokeWidth="6">
        <circle cx="75" cy="146" r="12" stroke="#75edb6"/>
        <circle cx="159" cy="165" r="12" stroke="#fbc276"/>
        <circle cx="112" cy="184" r="12" stroke="#f4a0e2"/>
        <circle cx="364" cy="58" r="12" stroke="#75edb6"/>
        <circle cx="403" cy="165" r="12" stroke="#fbc276"/>
        <circle cx="444" cy="270" r="12" stroke="#f4a0e2"/>
      </g>
      <g fill="#f9f3ff" fontFamily="monospace" fontSize="15" letterSpacing="1">
        <text x="39" y="122">REQUEST</text>
        <text x="427" y="42">CACHE</text>
        <text x="431" y="149">QUEUE</text>
        <text x="397" y="250">DATABASE</text>
      </g>
    </svg>
  );
}

export default function SwitchyardPage() {
  return (
    <div className="switchyard" id="top">
      <header className="sy-head sy-bound">
        <a className="sy-brand" href="#top" aria-label="Sanket Patel, home"><Mark/><span>Sanket Patel</span></a>
        <nav aria-label="Primary">
          <a href="#work">Projects</a><a href="#open-source">Open source</a><a href="/resume.pdf">Résumé&nbsp;<span aria-hidden="true" className="sy-ne"/></a>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1} className="sy-bound">
        <section className="sy-hero" aria-labelledby="sy-title">
          <p className="sy-kicker"><i aria-hidden="true"/> Software developer <span aria-hidden="true">/</span> Open-source contributor</p>
          <h1 id="sy-title">Tools you can<br className="sy-hero-break"/> <em>look inside.</em></h1>
          <div className="sy-hero-aside">
            <p>I’m Sanket, a software developer building tools for how people learn, build, and debug software.</p>
            <div className="sy-hero-links">
              <a href="#work">See what I build <span aria-hidden="true">↓</span></a>
              <a href="#open-source">See where I contribute <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>
        <section className="sy-work" id="work" aria-labelledby="sy-work-title">
          <div className="sy-section-label"><h2 id="sy-work-title">Projects I built</h2><span>01 / 04</span></div>
          <article className="sy-feature" aria-labelledby="sy-quest">
            <div className="sy-feature-copy">
              <p className="sy-label"><span>01</span> Interactive learning</p>
              <h3 id="sy-quest">System<br/>Design Quest</h3>
              <p>Learn system design by making the calls yourself: what to cache, when to queue, and what breaks under load.</p>
              <div className="sy-actions"><a className="sy-trylink" href="#sample-lesson">Try a lesson <span aria-hidden="true">↓</span></a><a className="sy-darklink" href={`${gh}/system-design-quest`}>Source <span aria-hidden="true" className="sy-ne"/></a></div>
            </div>
            <div className="sy-art">
              <Track/>
              <p aria-hidden="true">THREE CONCEPTS FROM THE COURSE</p>
            </div>
          </article>
          <details className="sy-experiment">
            <summary><span>Lesson 17: A nightly scan meets the cache</span><span aria-hidden="true">+</span></summary>
            <div id="sample-lesson" className="sy-lesson">
              
              <SdqCard/>
              <a href={`${gh}/system-design-quest/blob/4d83a6c97a34e11b362b609d0c3f13e06fbf8670/scripts/authored/interactive/r1-r4.json#L374-L397`}>See the original lesson</a>
            </div>
          </details>
          <ProjectCases/>
        </section>
        <Upstream/>
        <section className="sy-contact" aria-labelledby="sy-contact-title">
          <div><p className="sy-label">Sanket Patel</p><h2 id="sy-contact-title">Let’s talk shop.</h2></div>
          <div className="sy-contact-links"><a href="/resume.pdf">Résumé (PDF) <span aria-hidden="true" className="sy-ne"/></a><a href="/contact">Contact <span aria-hidden="true" className="sy-ne"/></a></div>
        </section>
      </main>
      <footer className="sy-bound sy-foot"><a href={gh}>GitHub</a><a href="https://www.linkedin.com/in/sanketpatel32/">LinkedIn</a><a href="/about">About</a><a href="/privacy">Privacy</a></footer>
    </div>
  );
}
