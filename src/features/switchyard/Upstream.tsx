import data from "@/features/fieldtrials/contributions.json";

const date = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC", day: "numeric", month: "short", year: "numeric",
});
const shown = data.repos.slice(0, 5);
const max = Math.max(1, ...data.repos.map((row) => row.count));

function Row({ row }: { row: (typeof data.repos)[number] }) {
  return (
    <details className="sy-repo">
      <summary aria-label={`${row.repo}: ${row.count} merged pull request${row.count === 1 ? "" : "s"}`}>
        <span className="sy-repo-title">{row.repo}</span>
        <span className="sy-bar" aria-hidden="true"><i style={{width: `${row.count / max * 100}%`}}/></span>
        <span className="sy-count">{row.count}</span>
        <span aria-hidden="true" className="sy-plus"/>
      </summary>
      <ul>
        {[...row.merges].reverse().map(merge => (
          <li key={merge.number}><a href={merge.url}><span>{merge.title}</span><span><time dateTime={merge.date}>{date.format(new Date(`${merge.date}T00:00:00Z`))}</time> · #{merge.number}</span></a></li>
        ))}
      </ul>
    </details>
  );
}

export default function Upstream() {
  return (
    <section id="open-source" className="sy-oss" aria-labelledby="sy-oss-title">
      <div className="sy-section-label"><p>Open-source contributions</p><a href="https://github.com/sanketpatel32">GitHub profile <span aria-hidden="true" className="sy-ne"/></a></div>
      <div className="sy-oss-intro">
        <h2 id="sy-oss-title">Beyond<br/>my own repos.</h2>
        <div><p><strong>{data.meta.total}</strong> public pull requests merged across <strong>{data.meta.repoCount}</strong> external repositories.</p>
        <p>Select a repository to see what changed and read the merged PRs.</p></div>
      </div>
      {shown.map(row => <Row key={row.repo} row={row}/>)}
      {data.repos.length > shown.length && <details className="sy-all">
        <summary>Show the other {data.repos.length - shown.length} repositories</summary>
        {data.repos.slice(shown.length).map(row => <Row key={row.repo} row={row}/>)}
      </details>}
      <p className="sy-snapshot">Public GitHub snapshot · <time dateTime={data.meta.cutoffUTC}>{date.format(new Date(data.meta.cutoffUTC))}</time> UTC · excludes my own repositories. Bars show merged PR totals, not stars.</p>
    </section>
  );
}
