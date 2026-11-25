import Upstream from "./Upstream";
import Workbench from "./Workbench";
import AtlasProjects from "./AtlasProjects";

const gh = "https://github.com/sanketpatel32";

export default function SwitchyardPage() {
  return (
    <div className="switchyard wb-page atlas-page editorial" id="top">
      <header className="sy-head sy-bound">
        <a className="ed-home" href="#top" aria-label="Sanket Patel, home">SP<span>.</span></a>
        <nav aria-label="Primary"><a href="#work">Projects</a><a href="#open-source">Open source</a><a className="atlas-pdf" href="/resume.pdf">Resume <span aria-hidden="true" className="sy-ne"/></a></nav>
      </header>
      <main id="main-content" tabIndex={-1} className="sy-bound">
        <section className="ed-intro" aria-labelledby="sy-title">
          <div><p className="ed-kicker">Software developer &amp; open-source contributor</p><h1 id="sy-title">Sanket Patel<span>.</span></h1></div>
          <p>I build developer tools for learning system design, reviewing code, and testing how software behaves.</p>
        </section>
        <AtlasProjects/>
        <Workbench/>
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
