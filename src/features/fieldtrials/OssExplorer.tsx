import contributions from "./contributions.json";

/**
 * Open source exhibit — "Other codebases".
 * An editorial repository × merge-date plot of real merged pull requests,
 * rendered entirely on the server from a checked-in, validated snapshot
 * (scripts/refresh-contributions.mjs). Native <details> rows: the summary is
 * name · marks · count, the disclosure lists every PR for that repo with its
 * real GitHub link. No client JavaScript, no live calls.
 */

type Merge = { number: number; date: string; title: string; url: string };
type RepoRow = { repo: string; count: number; merges: Merge[] };

const UPFRONT = 6;
const DAY_MS = 86_400_000;

const repos = contributions.repos as RepoRow[];
const meta = contributions.meta;

const allDates = repos.flatMap((r) => r.merges.map((m) => Date.parse(m.date)));
const minT = Math.min(...allDates);
const maxT = Math.max(...allDates);
const spanMs = Math.max(maxT - minT, DAY_MS);

function positionOf(date: string): number {
  return ((Date.parse(date) - minT) / spanMs) * 100;
}

function fmtDay(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function fmtStamp(iso: string): string {
  const d = new Date(iso);
  return `${fmtDay(iso.slice(0, 10))} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")} UTC`;
}

function RepoDetails({ row }: { row: RepoRow }) {
  const buckets = new Map<string, number>();
  for (const m of row.merges) {
    buckets.set(m.date, (buckets.get(m.date) ?? 0) + 1);
  }
  const marks = [...buckets.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
  const [owner, repoName] = row.repo.split("/");

  return (
    <details className="ft-oss-row">
      <summary
        aria-label={`${row.repo} — ${row.count} merged pull request${row.count === 1 ? "" : "s"}`}
      >
        <span className="ft-oss-name">
          <span className="ft-oss-owner">{owner}/</span>
          {repoName}
        </span>
        <span className="ft-oss-track" aria-hidden="true">
          {marks.map(([date, n]) => (
            <i
              key={date}
              className="ft-oss-mark"
              style={{ insetInlineStart: `${positionOf(date)}%` }}
            >
              {n > 1 && <b>{n}</b>}
            </i>
          ))}
        </span>
        <span className="ft-oss-count">{row.count}</span>
      </summary>
      <ol className="ft-oss-prs">
        {row.merges.map((m) => (
          <li key={m.number}>
            <a href={m.url} target="_blank" rel="noopener noreferrer">
              <span className="ft-oss-date">{fmtDay(m.date)}</span>
              <span className="ft-oss-title">{m.title}</span>
              <span className="ft-oss-num">#{m.number}</span>
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}

export default function OssExplorer() {
  const shown = repos.slice(0, UPFRONT);
  const rest = repos.slice(UPFRONT);

  return (
    <section className="ft-oss" id="open-source" aria-labelledby="ft-oss-title">
      <p className="ft-quest-kicker">Open source</p>
      <h2 id="ft-oss-title">Other codebases</h2>
      <p className="ft-oss-lede">
        Sanket contributes to software he did not start.
      </p>
      <p className="ft-oss-note">
        A checked-in snapshot of {meta.total} merged pull requests across{" "}
        {meta.repoCount} repositories, taken {fmtStamp(meta.cutoffUTC)} — a
        snapshot, not live data. Refreshed by hand with a validating script;
        titles and links are the real GitHub records.{" "}
        <a
          href="https://github.com/sanketpatel32"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub profile
        </a>
      </p>

      <div className="ft-oss-plot">
        <div className="ft-oss-axis" aria-hidden="true">
          <span className="ft-oss-axis-track">
            <span className="ft-oss-axis-date">{fmtDay(new Date(minT).toISOString().slice(0, 10))}</span>
            <span className="ft-oss-axis-label">merged PRs by merge date</span>
            <span className="ft-oss-axis-date">{fmtDay(new Date(maxT).toISOString().slice(0, 10))}</span>
          </span>
        </div>
        {shown.map((r) => (
          <RepoDetails key={r.repo} row={r} />
        ))}
        {rest.length > 0 && (
          <details className="ft-oss-more">
            <summary>
              Show all {repos.length} repositories
            </summary>
            {rest.map((r) => (
              <RepoDetails key={r.repo} row={r} />
            ))}
          </details>
        )}
      </div>
    </section>
  );
}
