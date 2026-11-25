import Upstream from "./Upstream";
import Workbench from "./Workbench";
import AtlasProjects from "./AtlasProjects";
import SdqCard from "@/features/fieldtrials/SdqCard";

const gh = "https://github.com/sanketpatel32";
const lesson = gh + "/system-design-quest/blob/4d83a6c97a34e11b362b609d0c3f13e06fbf8670/scripts/authored/interactive/r1-r4.json#L374-L397";

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
          <p>I turn tricky developer workflows into tools you can try. Start with a real lesson from a project I built.</p>
        </section>
        <section className="ed-feature" aria-labelledby="ed-feature-title">
          <div className="ed-feature-intro">
            <p className="ed-kicker"><span>01</span> Featured project</p>
            <h2 id="ed-feature-title">System<br className="ed-title-break"/> Design<br className="ed-title-break"/> Quest<span>.</span></h2>
            <p>Learn system design by making the call yourself, then seeing the trade-off.</p>
            <a className="ed-inline" href={gh+"/system-design-quest"}>Explore the project <span className="sy-ne" aria-hidden="true"/></a>
          </div>
          <div className="ed-lesson sy-lesson" id="sample-lesson">
            <div className="ed-lesson-meta"><p className="ed-kicker">Lesson 17 <span aria-hidden="true">/</span> Caching</p><a href={lesson}>Original lesson <span className="sy-ne" aria-hidden="true"/></a></div>
            <h3>Would your cache survive a nightly scan?</h3>
            <SdqCard/>
          </div>
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
