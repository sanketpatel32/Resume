import contributions from "./contributions.json";

/**
 * Open source exhibit — "Other codebases".
 * A count matrix: one column per UTC day that has any merges, one row per
 * repository. Rendered entirely on the server from a checked-in, validated
 * snapshot (scripts/refresh-contributions.mjs). Native <details> rows: the
 * summary is name · per-day counts · total, the disclosure lists every PR
 * for that repo with its real GitHub link. No client JavaScript, no live
 * calls — and when the snapshot is empty, a plain profile link stands in.
 */

type Merge = { number: number; date: string; title: string; url: string };
type RepoRow = { repo: string; count: number; merges: Merge[] };

const UPFRONT = 6;
const MAX_COLUMNS = 6; // beyond this: one "Earlier" bucket + five recent days

const repos = contributions.repos as RepoRow[];
const meta = contributions.meta;

const allDays = [
  ...new Set(repos.flatMap((r) => r.merges.map((m) => m.date))),
].sort();
const EARLIER = "__earlier__";
const columns: { key: string; short: string }[] =
  allDays.length > MAX_COLUMNS
    ? [
        { key: EARLIER, short: "Earlier" },
        ...allDays.slice(1 - MAX_COLUMNS).map((d) => ({ key: d, short: fmtShort(d) })),
      ]
    : allDays.map((d) => ({ key: d, short: fmtShort(d) }));
const recentDays = new Set(columns.map((c) => c.key));

/** "17 Jun" — the visible column label. */
function fmtShort(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

/** "17 June 2026" — full spoken date. */
function fmtDay(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function fmtStamp(iso: string): string {
  const d = new Date(iso);
  return `${fmtDay(iso.slice(0, 10))} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")} UTC`;
}

/** "3 on 22 November 2026, 12 on 23 November 2026" — exact dates, no buckets. */
function describe(row: RepoRow): string {
  const byDay = new Map<string, number>();
  for (const m of row.merges) byDay.set(m.date, (byDay.get(m.date) ?? 0) + 1);
  const parts = [...byDay.keys()]
    .sort()
    .map((d) => `${byDay.get(d)} on ${fmtDay(d)}`);
  return `${row.count} merged pull request${row.count === 1 ? "" : "s"}: ${parts.join(", ")}`;
}

function RepoDetails({ row, index }: { row: RepoRow; index: number }) {
  const counts = new Map<string, number>();
  for (const m of row.merges) {
    const key = recentDays.has(m.date) ? m.date : EARLIER;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const [owner, repoName] = row.repo.split("/");
  const descId = `ft-oss-desc-${index}`;

  return (
    <details className="ft-oss-row">
      <summary
        aria-label={`${row.repo} — ${row.count} merged pull request${row.count === 1 ? "" : "s"}`}
        aria-describedby={descId}
      >
        <span className="ft-oss-name">
          <span className="ft-oss-owner">{owner}/</span>
          {repoName}
        </span>
        <span className="ft-oss-days" aria-hidden="true">
          {columns.map((c) => {
            const n = counts.get(c.key) ?? 0;
            return (
              <span key={c.key} className="ft-oss-cell" data-empty={n === 0 || undefined}>
                {n === 0 ? "–" : n}
              </span>
            );
          })}
        </span>
        <span className="ft-oss-count">{row.count}</span>
        <span className="ft-vh" id={descId}>
          {describe(row)}
        </span>
      </summary>
      <ol className="ft-oss-prs">
        {row.merges.map((m) => (
          <li key={m.number}>
            <a href={m.url} target="_blank" rel="noopener noreferrer">
              <span className="ft-oss-date">{fmtShort(m.date)}</span>
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
      <p className="ft-oss-lede">I work upstream, too.</p>
      <p className="ft-oss-line">
        {meta.total} merged pull requests across {meta.repoCount} public
        repositories. Open a repository to see what changed.
      </p>
      <p className="ft-oss-snapshot">
        <a
          href="https://github.com/sanketpatel32"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        snapshot ·{" "}
        <time dateTime={meta.cutoffUTC} title={fmtStamp(meta.cutoffUTC)}>
          {fmtDay(meta.cutoffUTC.slice(0, 10))}
        </time>{" "}
        UTC
      </p>

      {repos.length === 0 ? (
        <p className="ft-oss-empty">
          The current snapshot holds no merged pull requests — the public
          record lives on{" "}
          <a
            href="https://github.com/sanketpatel32"
            target="_blank"
            rel="noopener noreferrer"
          >
            the GitHub profile
          </a>
          .
        </p>
      ) : (
        <>
          <p className="ft-oss-only">
            Only dates with merges are shown.
            {columns[0]?.key === EARLIER &&
              ` “Earlier” groups every date before ${fmtDay(columns[1].key)}.`}
          </p>
          <div
            className="ft-oss-matrix"
            style={{ ["--ft-oss-cols" as string]: `repeat(${columns.length}, 3.4rem)` }}
          >
            <div className="ft-oss-head" aria-hidden="true">
              <span className="ft-oss-head-name">Repository</span>
              <span className="ft-oss-days">
                {columns.map((c) => (
                  <span key={c.key} className="ft-oss-cell ft-oss-cell-head">
                    {c.short}
                  </span>
                ))}
              </span>
              <span className="ft-oss-count">Total</span>
              <span />
            </div>
            {shown.map((r, i) => (
              <RepoDetails key={r.repo} row={r} index={i} />
            ))}
            {rest.length > 0 && (
              <details className="ft-oss-more">
                <summary>Show all {repos.length} repositories</summary>
                {rest.map((r, i) => (
                  <RepoDetails key={r.repo} row={r} index={UPFRONT + i} />
                ))}
              </details>
            )}
          </div>
        </>
      )}
    </section>
  );
}
