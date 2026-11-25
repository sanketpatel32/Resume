"use client";

import { useState, useSyncExternalStore } from "react";

const gh = "https://github.com/sanketpatel32";
const subscribe = () => () => {};
const projects = [
  {id:"learn", n:"01", title:"System Design Quest", kind:"Interactive course", color:"mint", description:"Practice system design by making architectural decisions and seeing the trade-offs.", href:gh+"/system-design-quest", proofTitle:"Hands-on scenarios", proof:"The project turns concepts like scaling, storage, and caching into design decisions you can practice.", evidence:"Read project overview", evidenceHref:gh+"/system-design-quest#readme"},
  {id:"find", n:"02", title:"UI Vault", kind:"Component catalogue", color:"lilac", description:"A searchable collection of UI patterns with original sources, usage licenses and live previews.", href:gh+"/ui-vault", proofTitle:"3,157 entries", proof:"33 sources and 766 live previews in the catalogue snapshot.", evidence:"Open catalogue", evidenceHref:"https://sanketpatel32.github.io/ui-vault/"},
  {id:"review", n:"03", title:"Blunt Code", kind:"Local code review", color:"rose", description:"Track findings against a baseline and export them as SARIF, without a hosted account.", href:gh+"/Blunt-code", proofTitle:"Windows release", proof:"Try the desktop build locally or inspect the implementation on GitHub.", evidence:"See release", evidenceHref:gh+"/Blunt-code/releases/tag/v0.52.0"},
  {id:"trace", n:"04", title:"Small Server", kind:"HTTP workbench", color:"sand", description:"A single Go binary for testing webhooks and experimenting with HTTP behavior.", href:gh+"/Small-server", proofTitle:"200 → 304", proof:"A matching ETag avoids sending the response body again. See how the Go handler makes that decision.", evidence:"Read cache handler", evidenceHref:gh+"/Small-server/blob/052726757207700e210946e4565d8bbf2a940dcc/lab.go#L104-L116"},
] as const;

export default function AtlasProjects() {
  const ready=useSyncExternalStore(subscribe,()=>true,()=>false);
  const [view,setView]=useState<"plates"|"list">("plates");
  const [changed,setChanged]=useState(false);
  function changeView(next: typeof view) {
    if (view !== next) { setChanged(true); setView(next); }
  }
  return <section className="atlas-projects wb-index" id="work" aria-labelledby="wb-index-title">
    <div className="atlas-catalogue-head">
      <div className="atlas-catalogue-title"><p className="wb-overline">01 / Selected work</p><h2 id="wb-index-title">Selected projects.</h2></div>
      <div className="atlas-views" data-ready={ready} data-view={view} role="group" aria-label="Project view"><button type="button" onClick={()=>changeView("plates")} aria-pressed={view==="plates"}>Cards</button><button type="button" onClick={()=>changeView("list")} aria-pressed={view==="list"}>List</button></div>
    </div>
    <div className="atlas-catalogue" data-view={view} data-changed={changed}>{projects.map(p=>
      <article id={"project-"+p.id} className="atlas-project" key={p.id} data-color={p.color}>
        <div className="atlas-project-head"><b>{p.n}</b><span>{p.kind}</span></div>
        <h3>{p.title}</h3><p>{p.description}</p>
        <details className="atlas-evidence">
          <summary>What to look at <span aria-hidden="true" className="ed-chevron"/></summary>
          <div className="atlas-evidence-body"><strong>{p.proofTitle}</strong><p>{p.proof}</p><a href={p.evidenceHref}>{p.evidence} <span aria-hidden="true">↗</span></a></div>
        </details>
        <div className="wb-project-links"><a href={p.href}>Source <span className="sy-ne" aria-hidden="true"/></a></div>
      </article>
    )}</div>
    <p className="wb-also"><strong>Also built:</strong> <a href={gh+"/Portal"}>AuraFlow</a>, a self-hosted workspace for developer tools.</p>
  </section>;
}
