import Upstream from "./Upstream";
import Workbench from "./Workbench";

const gh = "https://github.com/sanketpatel32";
const projects = [
  {id:"decide", n:"01", title:"System Design Quest", kind:"Learning tool", color:"mint", description:"A course where learners make architectural decisions and see the trade-offs, instead of memorizing the answers.", href:gh+"/system-design-quest"},
  {id:"find", n:"02", title:"UI Vault", kind:"Component catalogue", color:"lilac", description:"One place to search 3,157 UI components from 33 sources, with attribution, license information and live previews.", href:gh+"/ui-vault", extra:["Open catalogue","https://sanketpatel32.github.io/ui-vault/"]},
  {id:"review", n:"03", title:"Blunt Code", kind:"Local code review", color:"rose", description:"A local review workbench that tracks findings against a baseline and exports them as SARIF.", href:gh+"/Blunt-code", extra:["Windows release",gh+"/Blunt-code/releases/tag/v0.52.0"]},
  {id:"trace", n:"04", title:"Small Server", kind:"HTTP workbench", color:"sand", description:"A single Go binary for inspecting webhooks and experimenting with HTTP behavior like cache validation.", href:gh+"/Small-server"},
] as const;

export default function SwitchyardPage() {
  return (
    <div className="switchyard wb-page" id="top">
      <header className="sy-head sy-bound">
        <a className="sy-brand" href="#top" aria-label="Sanket Patel, home"><span className="wb-monogram" aria-hidden="true">SP<span>.</span></span><span>Sanket Patel</span></a>
        <nav aria-label="Primary"><a href="#work">Projects</a><a href="#open-source">Open source</a><a href="/resume.pdf">Résumé <span aria-hidden="true" className="sy-ne"/></a></nav>
      </header>
      <main id="main-content" tabIndex={-1} className="sy-bound">
        <section className="wb-intro" aria-labelledby="sy-title">
          <div>
            <p className="wb-overline wb-eyebrow">Software developer <span aria-hidden="true">/</span> Open-source contributor</p>
            <h1 id="sy-title">Try the work<span>.</span></h1>
          </div>
          <div className="wb-about">
            <p>I’m Sanket. I build tools for learning system design, finding UI patterns, and debugging software.</p>
            <a href="#workbench">Pick an experiment <span aria-hidden="true">↓</span></a>
          </div>
        </section>
        <Workbench/>
        <section className="wb-index" id="work" aria-labelledby="wb-index-title">
          <div className="wb-heading"><p className="wb-overline">01 / Owned work</p><h2 id="wb-index-title">What I built.</h2></div>
          <div className="wb-project-grid">{projects.map(p=>
            <article id={"project-"+p.id} className="wb-project" key={p.id} data-color={p.color}>
              <div className="wb-project-index"><b>{p.n}</b><span>{p.kind}</span></div>
              <h3>{p.title}</h3><p>{p.description}</p>
              <div className="wb-project-links"><a href={p.href}>Source <span className="sy-ne" aria-hidden="true"/></a>{"extra" in p&&<a href={p.extra[1]}>{p.extra[0]} <span className="sy-ne" aria-hidden="true"/></a>}</div>
            </article>
          )}</div>
          <p className="wb-also"><strong>Also built:</strong> <a href={gh+"/Portal"}>AuraFlow</a>, a self-hosted workspace for developer tools.</p>
        </section>
        <Upstream/>
        <section className="sy-contact wb-contact" aria-labelledby="sy-contact-title">
          <div><p className="wb-overline">03 / Contact</p><h2 id="sy-contact-title">Let’s talk shop.</h2></div>
          <div className="sy-contact-links"><a href="/resume.pdf">Résumé (PDF) <span aria-hidden="true" className="sy-ne"/></a><a href="/contact">Contact <span aria-hidden="true" className="sy-ne"/></a></div>
        </section>
      </main>
      <footer className="sy-bound sy-foot"><a href={gh}>GitHub</a><a href="https://www.linkedin.com/in/sanketpatel32/">LinkedIn</a><a href="/about">About</a><a href="/privacy">Privacy</a></footer>
    </div>
  );
}
