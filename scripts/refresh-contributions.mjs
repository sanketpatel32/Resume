#!/usr/bin/env node
/**
 * Manual refresh of the checked-in open-source contribution snapshot.
 *
 * Runs an anonymous GitHub REST issue search for merged PRs authored by
 * sanketpatel32 outside his own namespace, validates the result hard, and
 * writes src/features/fieldtrials/contributions.json atomically — the prior
 * snapshot is kept untouched if anything fails. No credentials, no CI, no
 * runtime fetch: run it by hand when the snapshot should move forward.
 *
 *   node scripts/refresh-contributions.mjs
 *
 * Kept fields only: repository, PR number, merge date, title, URL.
 * No bodies, diffs, raw responses, names or emails are stored.
 */

import { writeFileSync, renameSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const AUTHOR = "sanketpatel32";
const QUERY = `is:pr is:merged is:public author:${AUTHOR} -user:${AUTHOR}`;
const PER_PAGE = 100;
const MAX_PAGES = 10; // GitHub search caps at 1000 results regardless
const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/features/fieldtrials/contributions.json",
);

const cutoffUTC = new Date().toISOString();

function fail(msg) {
  console.error(`refresh-contributions: ${msg}`);
  console.error("snapshot left unchanged");
  process.exit(1);
}

async function fetchPage(page) {
  const url =
    `https://api.github.com/search/issues?q=${encodeURIComponent(QUERY)}` +
    `&per_page=${PER_PAGE}&page=${page}`;
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) fail(`GitHub API HTTP ${res.status} on page ${page}`);
  return res.json();
}

const items = [];
let total = null;
for (let page = 1; page <= MAX_PAGES; page += 1) {
  const data = await fetchPage(page);
  if (data.incomplete_results) fail(`incomplete_results on page ${page}`);
  if (total === null) total = data.total_count;
  if (data.total_count !== total) fail("total_count moved between pages");
  items.push(...data.items);
  if (items.length >= total) break;
}
if (total === null) fail("no pages fetched");
if (items.length === 0) {
  fail("search returned 0 items — refusing to overwrite the snapshot");
}
if (items.length !== total) {
  fail(`fetched ${items.length} items but total_count is ${total}`);
}

const seen = new Set();
const repos = new Map();
for (const it of items) {
  if (seen.has(it.id)) fail(`duplicate item id ${it.id}`);
  seen.add(it.id);
  if (it.user?.login !== AUTHOR) fail(`unexpected author ${it.user?.login}`);
  const repo = it.repository_url?.split("/repos/")[1];
  if (!repo) fail(`item ${it.id} missing repository_url`);
  if (repo.split("/")[0] === AUTHOR) {
    fail(`${repo} is inside the author's namespace — query failed`);
  }
  const mergedAt = it.pull_request?.merged_at;
  if (!mergedAt) fail(`${it.html_url} has no merged_at`);
  if (mergedAt > cutoffUTC) fail(`${it.html_url} merged after cutoff`);
  const m = /^https:\/\/github\.com\/([^/]+\/[^/]+)\/pull\/(\d+)$/.exec(
    it.html_url,
  );
  if (!m || m[1] !== repo) fail(`non-canonical PR link ${it.html_url}`);
  const entry = repos.get(repo) ?? { repo, merges: new Map() };
  entry.merges.set(Number(m[2]), {
    number: Number(m[2]),
    date: mergedAt.slice(0, 10),
    title: it.title,
    url: it.html_url,
  });
  repos.set(repo, entry);
}

const rows = [...repos.values()]
  .map((r) => ({
    repo: r.repo,
    count: r.merges.size,
    merges: [...r.merges.values()].sort((a, b) =>
      a.date === b.date ? a.number - b.number : a.date < b.date ? -1 : 1,
    ),
  }))
  .sort((a, b) => b.count - a.count || a.repo.localeCompare(b.repo));

const snapshot = {
  meta: {
    description:
      "Merged pull requests by sanketpatel32 to public GitHub repositories outside his own namespace. Checked-in snapshot, not live data.",
    query: QUERY,
    cutoffUTC,
    generatedAtUTC: new Date().toISOString(),
    total: rows.reduce((n, r) => n + r.count, 0),
    repoCount: rows.length,
  },
  repos: rows,
};

if (snapshot.meta.total !== items.length) {
  fail(`row count ${snapshot.meta.total} != fetched ${items.length}`);
}

const tmp = `${OUT}.tmp`;
writeFileSync(tmp, `${JSON.stringify(snapshot, null, 2)}\n`);
renameSync(tmp, OUT); // atomic: readers never see a partial snapshot
console.log(
  `wrote ${snapshot.meta.total} merged PRs across ${snapshot.meta.repoCount} repos (cutoff ${cutoffUTC})`,
);
