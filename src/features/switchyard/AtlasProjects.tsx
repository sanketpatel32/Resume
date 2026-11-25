"use client";

import { useState, useSyncExternalStore } from "react";

const gh = "https://github.com/sanketpatel32";
const subscribe = () => () => {};
const projects = [
  {id:"decide", n:"01", title:"System Design Quest", kind:"Learning tool", color:"mint", description:"An interactive course where you make architecture decisions and see the trade-offs.", href:gh+"/system-design-quest", art:"PREDICT / COMPARE / LEARN"},
  {id:"find", n:"02", title:"UI Vault", kind:"Component catalogue", color:"lilac", description:"Search 3,157 components from 33 sources, with attribution, licenses and live previews.", href:gh+"/ui-vault", extra:["Open catalogue","https://sanketpatel32.github.io/ui-vault/"], art:"QUERY / MATCH / PREVIEW"},
  {id:"review", n:"03", title:"Blunt Code", kind:"Local code review", color:"rose", description:"Track findings against a baseline and export them as SARIF, without a hosted account.", href:gh+"/Blunt-code", extra:["Windows release",gh+"/Blunt-code/releases/tag/v0.52.0"], art:"REVIEW / TRIAGE / EXPORT"},
  {id:"trace", n:"04", title:"Small Server", kind:"HTTP workbench", color:"sand", description:"A single Go binary for testing webhooks and experimenting with HTTP behavior.", href:gh+"/Small-server", art:"REQUEST / COMPARE / CACHE"},
] as const;

function Diagram({id}:{id:string}) {
  return <svg viewBox="0 0 300 85" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {id==="decide"&&<><path d="M33 42h69l38-27h128M102 42l38 27h128"/><circle cx="102" cy="42" r="8" fill="var(--paper)"/><circle cx="213" cy="15" r="7" fill="var(--paper)"/><circle cx="243" cy="69" r="7" fill="var(--paper)"/><path d="m220 15 7 0m23 54h8M102 34v-9"/></>}
    {id==="find"&&<><rect x="34" y="13" width="232" height="58" rx="6"/><path d="M34 34h232M115 34v37m76-37v37m-137-18h43m31-7h45m-45 11h40m38-8h37m-37 10h30"/><circle cx="49" cy="24" r="4"/><path d="m52 27 4 4m9-7h61"/></>}
    {id==="review"&&<><path d="M35 12h83v51H35zM176 21h90v51h-90zM125 42h41m-9-8 8 8-8 8M45 25h48M45 35h31M45 46h46m106-7h52m-52 13h52"/><path d="m183 38 3 3 6-7m-9 17 3 3 6-7"/></>}
    {id==="trace"&&<><rect x="31" y="12" width="76" height="61" rx="5"/><rect x="195" y="12" width="76" height="61" rx="5"/><path d="M108 33h78m-8-7 8 7-8 7m11 16h-76m8-7-8 7 8 7M49 30h40m-40 12h25m-25 12h38m123-24h44m-44 12h39m-39 12h21"/></>}
  </g></svg>;
}

export default function AtlasProjects() {
  const ready=useSyncExternalStore(subscribe,()=>true,()=>false);
  const [view,setView]=useState<"plates"|"list">("plates");
  return <section className="atlas-projects wb-index" id="work" aria-labelledby="wb-index-title">
    <div className="atlas-catalogue-head">
      <div className="atlas-catalogue-title"><p className="wb-overline">02 / Project catalogue</p><h2 id="wb-index-title">What I built.</h2></div>
      {ready&&<div className="atlas-views" role="group" aria-label="Project view"><button type="button" onClick={()=>setView("plates")} aria-pressed={view==="plates"}>Gallery</button><button type="button" onClick={()=>setView("list")} aria-pressed={view==="list"}>Index</button></div>}
    </div>
    <div className="atlas-catalogue" data-view={view}>{projects.map(p=>
      <article id={"project-"+p.id} className="atlas-project" key={p.id} data-color={p.color}>
        <div className="atlas-project-head"><b>{p.n}</b><span>{p.kind}</span></div>
        <div className="atlas-plate" aria-hidden="true"><Diagram id={p.id}/><span>{p.art}</span></div>
        <h3>{p.title}</h3><p>{p.description}</p>
        <div className="wb-project-links"><a href={p.href}>Source <span className="sy-ne" aria-hidden="true"/></a>{"extra" in p&&<a href={p.extra[1]}>{p.extra[0]} <span className="sy-ne" aria-hidden="true"/></a>}</div>
      </article>
    )}</div>
    <p className="wb-also"><strong>Also built:</strong> <a href={gh+"/Portal"}>AuraFlow</a>, a self-hosted workspace for developer tools.</p>
  </section>;
}
