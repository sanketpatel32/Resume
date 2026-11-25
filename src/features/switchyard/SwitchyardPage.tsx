import Upstream from "./Upstream";
import Workbench from "./Workbench";
import AtlasProjects from "./AtlasProjects";
import contributionData from "@/features/fieldtrials/contributions.json";

const gh = "https://github.com/sanketpatel32";

export default function SwitchyardPage() {
  return (
    <div className="switchyard wb-page atlas-page" id="top">
      <header className="sy-head sy-bound">
        <a className="sy-brand" href="#top" aria-label="Sanket Patel, home"><span className="wb-monogram" aria-hidden="true">SP<span>.</span></span><span>Sanket Patel</span></a>
        <p className="atlas-head-tag wb-overline">Portfolio</p>
        <nav aria-label="Primary"><a href="#work">Projects</a><a href="#open-source">Open source</a><a className="atlas-pdf" href="/resume.pdf">Resume <span aria-hidden="true" className="sy-ne"/></a></nav>
      </header>
      <main id="main-content" tabIndex={-1} className="sy-bound">
        <div className="atlas-cover">
          <section className="atlas-identity" aria-labelledby="sy-title">
            <p className="wb-overline">Software developer <span aria-hidden="true">/</span> Open-source contributor</p>
            <h1 id="sy-title">Sanket<br className="atlas-name-break"/> Patel<span>.</span></h1>
            <p className="atlas-deck">I build tools for developers, from a searchable UI catalogue to a local code review app.</p>
            <div className="atlas-jumps"><a href="#work">See my projects <b aria-hidden="true">↓</b></a><a href="#open-source">Open-source work <b aria-hidden="true">↓</b></a></div>
            <p className="atlas-proofline"><a href="#open-source"><strong>{contributionData.meta.total} merged PRs</strong><span> across {contributionData.meta.repoCount} outside repos</span></a></p>
          </section>
          <Workbench/>
        </div>
        <AtlasProjects/>
        <Upstream/>
        <section className="sy-contact wb-contact" aria-labelledby="sy-contact-title">
          <div><p className="wb-overline">Contact / Sanket Patel</p><h2 id="sy-contact-title">Let’s talk shop.</h2></div>
          <div className="sy-contact-links"><a href="/resume.pdf">Resume (PDF) <span aria-hidden="true" className="sy-ne"/></a><a href="/contact">Contact <span aria-hidden="true" className="sy-ne"/></a></div>
        </section>
      </main>
      <footer className="sy-bound sy-foot"><a href={gh}>GitHub</a><a href="https://www.linkedin.com/in/sanketpatel32/">LinkedIn</a><a href="/about">About</a><a href="/privacy">Privacy</a></footer>
    </div>
  );
}
