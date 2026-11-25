import Upstream from "./Upstream";
import Workbench from "./Workbench";
import AtlasProjects from "./AtlasProjects";
import contributionData from "@/features/fieldtrials/contributions.json";

const gh = "https://github.com/sanketpatel32";

const dispatches = [
  ["C4rohan/Lampline",121,"Lampline","A pre-commit hook that fails on lint findings by default."],
  ["LibrePhotos/librephotos",3106,"LibrePhotos","Share links that stop working when they expire."],
  ["nextcloud/spreed",20467,"Nextcloud Talk","Reaction notifications that respect subscriptions."],
] as const;

function Ledger() {
  return <aside className="atlas-ledger" aria-labelledby="atlas-ledger-title">
    <div className="atlas-frame"><p className="wb-overline">03 / Upstream</p><span>GitHub snapshot</span></div>
    <h2 id="atlas-ledger-title">Merged<br/>upstream.</h2>
    <dl><div><dt>{contributionData.meta.total}</dt><dd>merged PRs</dd></div><div><dt>{contributionData.meta.repoCount}</dt><dd>outside repos</dd></div></dl>
    <ul>{dispatches.map(([repo,number,name,what])=>{
      const merge=contributionData.repos.find(p=>p.repo===repo)?.merges.find(p=>p.number===number);
      return merge?<li key={repo}><a href={merge.url}><strong>{name}</strong><span>#{number} <i className="sy-ne" aria-hidden="true"/></span></a><p>{what}</p></li>:null;
    })}</ul>
    <a href="#open-source" className="atlas-all">See the contribution gallery <span aria-hidden="true">↓</span></a>
  </aside>;
}

export default function SwitchyardPage() {
  return (
    <div className="switchyard wb-page atlas-page" id="top">
      <header className="sy-head sy-bound">
        <a className="sy-brand" href="#top" aria-label="Sanket Patel, home"><span className="wb-monogram" aria-hidden="true">SP<span>.</span></span><span>Sanket Patel</span></a>
        <p className="atlas-head-tag wb-overline">Build atlas / personal portfolio</p>
        <nav aria-label="Primary"><a href="#work">Projects</a><a href="#open-source">Open source</a><a className="atlas-pdf" href="/resume.pdf">Résumé <span aria-hidden="true" className="sy-ne"/></a></nav>
      </header>
      <main id="main-content" tabIndex={-1} className="sy-bound">
        <div className="atlas-cover">
          <section className="atlas-identity" aria-labelledby="sy-title">
            <p className="wb-overline">01 / Software developer</p>
            <h1 id="sy-title">Sanket<br/> Patel<span>.</span></h1>
            <p className="atlas-deck">I build developer tools and contribute to open source. Try the work, then read what went into it.</p>
            <div className="atlas-jumps"><a href="#workbench"><span>01</span> Try it <b aria-hidden="true">↓</b></a><a href="#work"><span>02</span> Projects <b aria-hidden="true">↓</b></a><a href="#open-source"><span>03</span> Open source <b aria-hidden="true">↓</b></a></div>
            <svg className="atlas-signature" viewBox="0 0 240 64" fill="none" aria-hidden="true"><path d="M2 32h74l21-22h140M2 32h235M2 32h74l21 22h140" stroke="currentColor"/><circle cx="76" cy="32" r="4" fill="currentColor"/><circle cx="196" cy="10" r="4" fill="currentColor"/><circle cx="158" cy="32" r="4" fill="currentColor"/><circle cx="217" cy="54" r="4" fill="currentColor"/></svg>
          </section>
          <Workbench/>
          <Ledger/>
        </div>
        <AtlasProjects/>
        <Upstream/>
        <section className="sy-contact wb-contact" aria-labelledby="sy-contact-title">
          <div><p className="wb-overline">Contact / Sanket Patel</p><h2 id="sy-contact-title">Let’s talk shop.</h2></div>
          <div className="sy-contact-links"><a href="/resume.pdf">Résumé (PDF) <span aria-hidden="true" className="sy-ne"/></a><a href="/contact">Contact <span aria-hidden="true" className="sy-ne"/></a></div>
        </section>
      </main>
      <footer className="sy-bound sy-foot"><a href={gh}>GitHub</a><a href="https://www.linkedin.com/in/sanketpatel32/">LinkedIn</a><a href="/about">About</a><a href="/privacy">Privacy</a></footer>
    </div>
  );
}
