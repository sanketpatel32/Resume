import data from "@/features/fieldtrials/contributions.json";
import metadata from "./repo-stars.json";

const day = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" });
const numeral = new Intl.NumberFormat("en-US");
const stars = new Map(Object.entries(metadata.stars).map(([name, count]) => [name.toLowerCase(), count]));
const ranked = [...data.repos].sort((a, b) => (stars.get(b.repo.toLowerCase()) ?? -1) - (stars.get(a.repo.toLowerCase()) ?? -1) || b.count - a.count || a.repo.localeCompare(b.repo));
const exhibits: Record<string, { name: string; number: number; caption: string; labels: [string, string, string]; kind: string }> = {
  "CherryHQ/cherry-studio": { name: "Cherry Studio", number: 25286, caption: "Fixed Windows shell startup by stripping stray NUL bytes from captured environment values.", labels: ["SHELL ENV", "NUL BYTES", "CLEAN OUTPUT"], kind: "signal" },
  "jason5ng32/MyIP": { name: "MyIP", number: 579, caption: "Refreshed the India connectivity checks so the tool tests relevant sites.", labels: ["CONNECTIVITY", "INDIA", "SITE LIST"], kind: "matrix" },
  "LibrePhotos/librephotos": { name: "LibrePhotos", number: 3106, caption: "Added expiring share links so a photo doesn’t stay shared indefinitely.", labels: ["SHARE LINK", "TIME LIMIT", "EXPIRES"], kind: "shutter" },
  "ArcReel/ArcReel": { name: "ArcReel", number: 3995, caption: "Documented the agent protocol and how to connect an external gateway.", labels: ["AGENT", "PROTOCOL", "GATEWAY"], kind: "relay" },
  "lingdojo/kana-dojo": { name: "Kana Dojo", number: 20972, caption: "Contributed a community note to an open Japanese-learning project.", labels: ["COMMUNITY", "NOTE", "DOCUMENTATION"], kind: "type" },
  "nextcloud/spreed": { name: "Nextcloud Talk", number: 20467, caption: "Fixed reaction notifications so they reach people subscribed to all updates.", labels: ["REACTION", "SUBSCRIPTION", "NOTIFIED"], kind: "orbit" },
};

function StarCount({name}: {name: string}) {
  const n = stars.get(name.toLowerCase());
  return n === undefined ? <span className="sy-stars">Stars unavailable</span> :
    <span className="sy-stars" data-repo-stars={n}><span aria-hidden="true">★</span> {numeral.format(n)} <span>stars</span></span>;
}

function Artwork({kind, labels}: {kind: string; labels: [string, string, string]}) {
  return (
    <div className={`sy-exhibit-art sy-art-${kind}`} aria-hidden="true">
      <span>{labels[0]}</span>
      <svg viewBox="0 0 264 100" fill="none">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {kind === "signal" && <><path opacity=".35" d="M9 50h246M9 24h246M9 76h246"/><path d="M9 50h29l12-20 13 39 14-46 12 48 16-36 15 15h135"/><circle cx="173" cy="50" r="12" fill="var(--art-bg)"/><path d="m169 50 3 3 6-7"/></>}
        {kind === "matrix" && <><path d="M27 50h210M132 12v76" opacity=".45"/><path d="M33 38c37-30 155-30 193 0s-29 50-96 50S2 65 33 38Z"/><path d="M132 14c-60 21-64 52 0 74 65-24 63-53 0-74Z"/><circle cx="174" cy="59" r="6" fill="currentColor"/></>}
        {kind === "shutter" && <><rect x="25" y="16" width="142" height="68" rx="5"/><path d="m40 68 40-31 24 20 16-13 26 24Z"/><circle cx="122" cy="34" r="5"/><circle cx="199" cy="58" r="28" fill="var(--art-bg)"/><path d="M199 41v17l12 7"/></>}
        {kind === "relay" && <><path d="M30 50h71m62 0h71M132 50v29h74" opacity=".7"/><rect x="15" y="39" width="28" height="22" rx="3"/><rect x="100" y="31" width="64" height="38" rx="4" fill="var(--art-bg)"/><circle cx="132" cy="50" r="8"/><rect x="221" y="39" width="28" height="22" rx="3"/><circle cx="210" cy="79" r="4" fill="currentColor"/></>}
        {kind === "type" && <><path opacity=".35" d="M34 20h196v60H34zM100 20v60m64-60v60"/><path d="M51 36h30M61 66l10-36m-17 22c15-10 29-4 28 5-1 6-9 10-16 11m54-27 10-10 11 31m-27 0h35m35-28h23m-23 13h17m-17 13h23"/></>}
        {kind === "orbit" && <><path d="M35 50h194M132 17v66" opacity=".4"/><ellipse cx="132" cy="50" rx="76" ry="34"/><ellipse cx="132" cy="50" rx="43" ry="34"/><circle cx="132" cy="50" r="10" fill="var(--art-bg)"/><circle cx="193" cy="30" r="6" fill="currentColor"/><circle cx="81" cy="75" r="4" fill="currentColor"/></>}
        </g>
      </svg>
      <span>{labels[1]} <b>→</b> {labels[2]}</span>
    </div>
  );
}

export default function Upstream() {
  // The complete ranked index stays available when an exhibit has not been curated.
  const featured = ranked.slice(0, 6).filter(row => exhibits[row.repo]);
  return (
    <section id="open-source" className="sy-oss" aria-labelledby="sy-oss-title">
      <div className="sy-section-label"><p>Open-source contributions / Gallery</p><a href="https://github.com/sanketpatel32">GitHub profile <span aria-hidden="true" className="sy-ne"/></a></div>
      <div className="sy-oss-intro">
        <h2 id="sy-oss-title">Beyond<br/>my own repos.</h2>
        <div><p><strong>{data.meta.total}</strong> public pull requests merged across <strong>{data.meta.repoCount}</strong> external repositories in this snapshot.</p>
        <p>Explore one real contribution per project. Stars belong to the repositories, not to my PRs.</p></div>
      </div>
      <p className="sy-gallery-caption">Selected contributions <span>Sorted by GitHub stars ↓</span></p>
      <div className="sy-exhibit-grid">
      {featured.map((row, i) => {
        const ex = exhibits[row.repo];
        const pr = row.merges.find(merge => merge.number === ex.number);
        if (!pr) return null;
        return (
          <article className="sy-exhibit" key={row.repo} aria-labelledby={`sy-exhibit-${i}`}>
            <Artwork kind={ex.kind} labels={ex.labels}/>
            <div className="sy-exhibit-body">
              <div className="sy-exhibit-meta"><span>EXHIBIT {String(i + 1).padStart(2, "0")}</span><StarCount name={row.repo}/></div>
              <h3 id={`sy-exhibit-${i}`}>{ex.name}</h3>
              <p>{ex.caption}</p>
              <a href={pr.url}>Merged PR #{pr.number} <span aria-hidden="true" className="sy-ne"/></a>
            </div>
          </article>
        );
      })}
      </div>
      <details className="sy-all sy-index">
        <summary>Browse all {data.meta.repoCount} repositories and {data.meta.total} merged PRs</summary>
        {ranked.map(row => (
          <details className="sy-repo" key={row.repo}>
            <summary>
              <span className="sy-repo-title">{row.repo}</span>
              <StarCount name={row.repo}/>
              <span className="sy-count">{row.count} merged</span>
              <span aria-hidden="true" className="sy-plus"/>
            </summary>
            <ul>
              <li><a href={`https://github.com/${row.repo}`}>Open repository <span aria-hidden="true" className="sy-ne"/></a></li>
              {[...row.merges].reverse().map(merge => <li key={merge.number}><a href={merge.url}><span>{merge.title}</span><span><time dateTime={merge.date}>{day.format(new Date(`${merge.date}T00:00:00Z`))}</time> · #{merge.number}</span></a></li>)}
            </ul>
          </details>
        ))}
      </details>
      <p className="sy-snapshot">Public GitHub snapshot · Stars checked <time dateTime={metadata.checkedUTC}>{day.format(new Date(metadata.checkedUTC))}</time> · Latest included merge <time dateTime={data.meta.cutoffUTC}>{day.format(new Date(data.meta.cutoffUTC))}</time> UTC · Not live.</p>
    </section>
  );
}
