"use client";

import { useState, useSyncExternalStore } from "react";
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

function SearchStation() {
  const [query,setQuery]=useState("");
  const tokens=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matched=picks.filter(p=>tokens.every(t=>(p.name+" "+p.creator+" "+p.tags).toLowerCase().includes(t)));
  const visible=matched.slice(0,3);
  return <div className="wb-search">
    <div className="wb-station-title">
      <div><p className="wb-overline">02 / UI Vault</p><h2>Find an interface pattern.</h2></div>
      <a href={catalogue+"/"}>Open UI Vault <span aria-hidden="true" className="sy-ne"/></a>
    </div>
    <label htmlFor="wb-query">Search six real entries</label>
    <input type="search" autoComplete="off" id="wb-query" placeholder="Try “blur”, “dock”, or “layout”" value={query} onChange={e=>setQuery(e.target.value)}/>
    <p role="status" className="wb-search-count">{matched.length? (matched.length>visible.length?`Showing ${visible.length} of ${matched.length} matches`:`${matched.length} ${matched.length===1?"match":"matches"}`):"No matches. Try a pattern or creator name."}</p>
    <ul>{visible.map(p=><li key={p.slug}><a href={catalogue+"/component/"+p.slug}><strong>{p.name}</strong><span>{p.creator} <span aria-hidden="true" className="sy-ne"/></span></a></li>)}</ul>
  </div>;
}

export default function Workbench() {
  const mounted=useSyncExternalStore(subscribe,()=>true,()=>false);
  const [station,setStation]=useState<Station>("trace");
  return <section id="workbench" className="wb-shell" aria-label="Try the work">
    <div className="wb-rail">
      <p className="wb-overline"><i/> Interactive samples</p>
      {mounted?<div role="group" aria-label="Choose an experiment">{stations.map((item,i)=><button type="button" aria-pressed={item.id===station} key={item.id} onClick={()=>setStation(item.id)}><span aria-hidden="true">0{i+1}</span><span>{item.name}<small>{item.project}</small></span></button>)}</div>:
      <div aria-label="Project links">{stations.map((item,i)=><a key={item.id} href={"#project-"+item.id}><span aria-hidden="true">0{i+1}</span><span>{item.name}<small>{item.project}</small></span></a>)}</div>}
    </div>
    <div className="wb-stage" key={station}>
      {station==="trace"?<Cache interactive={mounted}/>:station==="find"?<SearchStation/>:<div id="sample-lesson" className="wb-decide sy-lesson">
        <div className="wb-station-title"><div><p className="wb-overline">03 / System Design Quest · Lesson 17</p><h2>A nightly scan meets the cache.</h2></div>
        <a href="https://github.com/sanketpatel32/system-design-quest/blob/4d83a6c97a34e11b362b609d0c3f13e06fbf8670/scripts/authored/interactive/r1-r4.json#L374-L397">Original lesson <span aria-hidden="true" className="sy-ne"/></a></div>
        <SdqCard/>
      </div>}
    </div>
  </section>;
}
