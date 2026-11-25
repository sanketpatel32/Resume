"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import SdqCard from "@/features/fieldtrials/SdqCard";

const subscribe = () => () => {};
const labSource = "https://github.com/sanketpatel32/Small-server/blob/052726757207700e210946e4565d8bbf2a940dcc/lab.go#L104-L116";
const catalogue = "https://sanketpatel32.github.io/ui-vault";
const stations = [
  { id: "trace", name: "Trace a request", project: "Small Server" },
  { id: "find", name: "Find a component", project: "UI Vault" },
  { id: "decide", name: "Make a design call", project: "System Design Quest" },
] as const;
type Station = typeof stations[number]["id"];

const picks = [
  {name:"BlurText", creator:"React Bits", tags:"text reveal animation", slug:"reactbits-blur-text"},
  {name:"Bento Grid", creator:"Aceternity UI", tags:"layout cards", slug:"aceternity-bento-grid"},
  {name:"Floating Dock", creator:"Aceternity UI", tags:"interaction navigation hover", slug:"aceternity-floating-dock"},
  {name:"TextEffect", creator:"Motion Primitives", tags:"text blur fade animation", slug:"motionprimitives-text-effect"},
  {name:"Letter Swap", creator:"FancyComponents", tags:"text interaction hover", slug:"fancy-letter-swap"},
  {name:"Morphing Dialog", creator:"Motion Primitives", tags:"interaction overlay modal", slug:"motionprimitives-morphing-dialog"},
] as const;

function Cache({ interactive }: { interactive: boolean }) {
  const [sent,setSent]=useState(false);
  return <div className="wb-trace">
    <div className="wb-station-title">
      <div><p className="wb-overline">01 / Small Server</p><h2>Can we skip the download?</h2></div>
      <a href={labSource}>Inspect the Go handler <span aria-hidden="true" className="sy-ne"/></a>
    </div>
    <p className="wb-explain">The first request gets a response and an ETag. Send the same request with that tag to see what the server can skip.</p>
    <div className="wb-packets">
      <div className="wb-packet wb-in"><span>01 / INITIAL GET</span><strong>200 <small>OK</small></strong><code>ETag + JSON body</code></div>
      <svg aria-hidden="true" width="29" height="18" viewBox="0 0 29 18" fill="none"><path d="M1 9h24m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2"/></svg>
      <div className={"wb-packet "+(sent?"wb-hit":"wb-pending")}><span>02 / SAME ETAG</span><strong>{sent?"304":"—"} <small>{sent?"NOT MODIFIED":"WAITING"}</small></strong><code>{sent?"No body sent":"If-None-Match"}</code></div>
    </div>
    <div className="wb-actions">
      {interactive?<button type="button" onClick={()=>setSent(!sent)}>{sent?"Reset trace":"Send conditional request"} <span aria-hidden="true">{sent?"↺":"→"}</span></button>:<a href={labSource}>Read the request logic</a>}
      <p role="status">{sent?"The ETag matches. Use the cached copy.":"Local simulation from Small Server’s cache handler."}</p>
    </div>
  </div>;
}

function SearchStation({ id }: { id: string }) {
  const [query,setQuery]=useState("");
  const tokens=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matched=picks.filter(p=>tokens.every(t=>(p.name+" "+p.creator+" "+p.tags).toLowerCase().includes(t)));
  const visible=matched.slice(0,3);
  return <div className="wb-search">
    <div className="wb-station-title">
      <div><p className="wb-overline">02 / UI Vault</p><h2>Find an interface pattern.</h2></div>
      <a href={catalogue+"/"}>Open UI Vault <span aria-hidden="true" className="sy-ne"/></a>
    </div>
    <label htmlFor={id}>Search six real entries</label>
    <input type="search" autoComplete="off" id={id} placeholder="Try “blur”, “dock”, or “layout”" value={query} onChange={e=>setQuery(e.target.value)}/>
    <p role="status" className="wb-search-count">{matched.length? (matched.length>visible.length?`Showing ${visible.length} of ${matched.length} matches`:`${matched.length} ${matched.length===1?"match":"matches"}`):"No matches. Try a pattern or creator name."}</p>
    <ul>{visible.map(p=><li key={p.slug}><a href={catalogue+"/component/"+p.slug}><strong>{p.name}</strong><span>{p.creator} <span aria-hidden="true" className="sy-ne"/></span></a></li>)}</ul>
  </div>;
}

function DesignStation({id}:{id:string}) {
  return <div id={id} className="wb-decide sy-lesson">
    <div className="wb-station-title"><div><p className="wb-overline">03 / System Design Quest · Lesson 17</p><h2>A nightly scan meets the cache.</h2></div>
    <a href="https://github.com/sanketpatel32/system-design-quest/blob/4d83a6c97a34e11b362b609d0c3f13e06fbf8670/scripts/authored/interactive/r1-r4.json#L374-L397">Original lesson <span aria-hidden="true" className="sy-ne"/></a></div>
    <SdqCard/>
  </div>;
}
export default function Workbench() {
  const mounted=useSyncExternalStore(subscribe,()=>true,()=>false);
  const [station,setStation]=useState<Station>("trace");
  const mobileRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const root=mobileRef.current;
    if (!root) return;
    let anchor:{element:HTMLElement;top:number}|null=null;
    let heights=new Map<HTMLDetailsElement,number>();
    let frame=0;
    const remember=(event:Event)=>{
      const summary=(event.target as Element|null)?.closest("summary");
      if (!(summary instanceof HTMLElement)) return;
      anchor={element:summary,top:summary.getBoundingClientRect().top};
      heights=new Map([...root.querySelectorAll<HTMLDetailsElement>("details[open]")].map(details=>[details,details.getBoundingClientRect().height]));
    };
    const settle=()=>{
      if (frame) return;
      frame=requestAnimationFrame(()=>{
        frame=0;
        const details=anchor?.element.closest("details");
        const closing=[...root.querySelectorAll<HTMLDetailsElement>("details")].find(item=>!item.open&&heights.has(item));
        const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (closing&&!reduce) {
          const start=heights.get(closing)??0;
          const end=closing.querySelector("summary")?.getBoundingClientRect().height??start;
          closing.classList.add("atlas-collapsing");
          closing.style.height=`${start}px`;
          closing.style.overflow="hidden";
          void closing.offsetHeight;
          closing.style.transition="height 220ms ease";
          closing.style.height=`${end}px`;
          let stabilizing=true;
          const stabilize=()=>{
            if (!stabilizing||!anchor) return;
            const delta=anchor.element.getBoundingClientRect().top-anchor.top;
            if (Math.abs(delta)>1) window.scrollBy(0,delta);
            if (closing.classList.contains("atlas-collapsing")) requestAnimationFrame(stabilize);
          };
          const cleanup=()=>{
            stabilizing=false;
            closing.classList.remove("atlas-collapsing");
            closing.style.height="";
            closing.style.overflow="";
            closing.style.transition="";
          };
          requestAnimationFrame(stabilize);
          closing.addEventListener("transitionend",cleanup,{once:true});
          window.setTimeout(cleanup,280);
          anchor=null;
          heights.clear();
          return;
        }
        if (!anchor||!(details instanceof HTMLDetailsElement)||!details.open) return;
        const delta=anchor.element.getBoundingClientRect().top-anchor.top;
        if (Math.abs(delta)>1) window.scrollBy(0,delta);
        anchor=null;
        heights.clear();
      });
    };
    root.addEventListener("click",remember,true);
    root.addEventListener("toggle",settle,true);
    return()=>{
      root.removeEventListener("click",remember,true);
      root.removeEventListener("toggle",settle,true);
      if (frame) cancelAnimationFrame(frame);
    };
  },[]);

  return <section id="workbench" className="atlas-samples" aria-label="Interactive samples">
    <div className="atlas-frame">
      <p className="wb-overline atlas-frame-label"><span aria-hidden="true">✳</span> The workbench</p>
      <p>Three things to try</p>
    </div>
    <div className="wb-shell atlas-desktop">
      <div className="wb-rail">
        <p className="wb-overline"><i/> Select a sample</p>
        {mounted?<div role="group" aria-label="Choose an experiment">{stations.map((item,i)=><button type="button" aria-pressed={item.id===station} key={item.id} onClick={()=>setStation(item.id)}><span aria-hidden="true">0{i+1}</span><span>{item.name}<small>{item.project}</small></span></button>)}</div>:
        <div aria-label="Project links">{stations.map((item,i)=><a key={item.id} href={"#project-"+item.id}><span aria-hidden="true">0{i+1}</span><span>{item.name}<small>{item.project}</small></span></a>)}</div>}
      </div>
      <div className="wb-stage" key={station}>
        {station==="trace"?<Cache interactive={mounted}/>:station==="find"?<SearchStation id="wb-query"/>:<DesignStation id="sample-lesson"/>}
      </div>
    </div>
    <div className="atlas-mobile" ref={mobileRef}>
      {stations.map((item,i)=><details name="field-samples" key={item.id} open={i===0?true:undefined} className="atlas-field" data-field={item.id}>
        <summary><span className="atlas-field-n" aria-hidden="true">0{i+1}</span><span><strong>{item.name}</strong><small>{item.project}</small></span><span className="atlas-field-switch" aria-hidden="true"/></summary>
        <div className="atlas-field-body">
          {item.id==="trace"?<Cache interactive={mounted}/>:item.id==="find"?(mounted?<SearchStation id="mobile-query"/>:<a href={catalogue+"/"}>Open UI Vault</a>):<DesignStation id="mobile-lesson"/>}
        </div>
      </details>)}
    </div>
  </section>;
}
