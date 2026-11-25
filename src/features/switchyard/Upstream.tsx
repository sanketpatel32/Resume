import data from "@/features/fieldtrials/contributions.json";
import metadata from "./repo-stars.json";

const day = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" });
const numeral = new Intl.NumberFormat("en-US");
const stars = new Map(Object.entries(metadata.stars).map(([name, count]) => [name.toLowerCase(), count]));
const ranked = [...data.repos].sort((a, b) => (stars.get(b.repo.toLowerCase()) ?? -1) - (stars.get(a.repo.toLowerCase()) ?? -1) || b.count - a.count || a.repo.localeCompare(b.repo));
const exhibits: Record<string, { name: string; number: number; caption: string; type: string }> = {
  "CherryHQ/cherry-studio": { name: "Cherry Studio", number: 25286, caption: "Fixed Windows shell startup by stripping stray NUL bytes from captured environment values.", type: "Windows / Bug fix" },
  "backstage/backstage": { name: "Backstage", number: 37127, caption: "Updated two indirect dependencies to patched releases and verified the lockfile with an immutable install.", type: "Dependencies / Maintenance" },
  "jason5ng32/MyIP": { name: "MyIP", number: 579, caption: "Refreshed the India connectivity checks so the tool tests relevant sites.", type: "Networking / Update" },
  "LibrePhotos/librephotos": { name: "LibrePhotos", number: 3106, caption: "Added expiring share links so a photo doesn’t stay shared indefinitely.", type: "Sharing / Feature" },
  "ArcReel/ArcReel": { name: "ArcReel", number: 3995, caption: "Documented the agent protocol and how to connect an external gateway.", type: "Developer docs" },
  "lingdojo/kana-dojo": { name: "Kana Dojo", number: 20972, caption: "Contributed a community note to an open Japanese-learning project.", type: "Community docs" },
  "nextcloud/spreed": { name: "Nextcloud Talk", number: 20467, caption: "Fixed reaction notifications so they reach people subscribed to all updates.", type: "Notifications / Bug fix" },
};

function StarCount({name}: {name: string}) {
  const n = stars.get(name.toLowerCase());
  return n === undefined ? <span className="sy-stars">Stars unavailable</span> :
    <span className="sy-stars" data-repo-stars={n}><span aria-hidden="true">★</span> {numeral.format(n)} <span>stars</span></span>;
}

export default function Upstream() {
  // The complete ranked index stays available when an exhibit has not been curated.
  const featured = ranked.filter(row => row.merges.some(merge => merge.number === exhibits[row.repo]?.number)).slice(0, 6);
  return (
    <section id="open-source" className="sy-oss" aria-labelledby="sy-oss-title">
      <div className="sy-section-label"><p>02 / Open source</p><a href="https://github.com/sanketpatel32">GitHub profile <span aria-hidden="true" className="sy-ne"/></a></div>
      <div className="sy-oss-intro">
        <h2 id="sy-oss-title">Open-source contributions.</h2>
        <div className="sy-oss-proof">
          <dl><div><dt>{data.meta.total}</dt><dd>merged PRs</dd></div><div><dt>{data.meta.repoCount}</dt><dd>outside repos</dd></div></dl>
          <p>One merged change from each featured repo. Stars belong to the repositories, not the PRs.</p>
        </div>
      </div>
      <p className="sy-gallery-caption">Selected merged work <span>By GitHub stars ↓</span></p>
      <div className="sy-exhibit-grid">
      {featured.map((row, i) => {
        const ex = exhibits[row.repo];
        const pr = row.merges.find(merge => merge.number === ex.number);
        if (!pr) return null;
        return (
          <article className="sy-exhibit" key={row.repo} aria-labelledby={`sy-exhibit-${i}`}>
            <div className="sy-exhibit-body">
              <div className="sy-exhibit-meta"><span>{ex.type}</span><StarCount name={row.repo}/></div>
              <h3 id={`sy-exhibit-${i}`}>{ex.name}</h3>
              <p>{ex.caption}</p>
              <a href={pr.url}>Merged PR #{pr.number} <span aria-hidden="true" className="sy-ne"/></a>
            </div>
          </article>
        );
      })}
      </div>
      <details className="sy-all sy-index">
        <summary>Browse all {data.meta.repoCount} repositories and {data.meta.total} merged PRs <span aria-hidden="true" className="ed-chevron"/></summary>
        <div className="ed-repo-list">{ranked.map(row => (
          <details className="sy-repo" key={row.repo}>
            <summary>
              <span className="sy-repo-title">{row.repo}</span>
              <StarCount name={row.repo}/>
              <span className="sy-count">{row.count} merged</span>
              <span aria-hidden="true" className="ed-chevron"/>
            </summary>
            <ul>
              <li><a href={`https://github.com/${row.repo}`}>Open repository <span aria-hidden="true" className="sy-ne"/></a></li>
              {[...row.merges].reverse().map(merge => <li key={merge.number}><a href={merge.url}><span>{merge.title}</span><span><time dateTime={merge.date}>{day.format(new Date(`${merge.date}T00:00:00Z`))}</time> · #{merge.number}</span></a></li>)}
            </ul>
          </details>
        ))}</div>
      </details>
      <p className="sy-snapshot">Public GitHub snapshot · Stars checked <time dateTime={metadata.checkedUTC}>{day.format(new Date(metadata.checkedUTC))}</time> · Latest included merge <time dateTime={data.meta.cutoffUTC}>{day.format(new Date(data.meta.cutoffUTC))}</time> UTC · Not live.</p>
    </section>
  );
}
