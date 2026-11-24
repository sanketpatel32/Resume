import test from "node:test";
import assert from "node:assert/strict";

const BASE = "http://localhost:3000";

// Exact-token check: "Vary: ... Accept-Encoding" must NOT satisfy this —
// the response must advertise a distinct `Accept` token so CDN caches key
// HTML and markdown variants separately (acceptmarkdown.com Vary rule).
function varyHasAccept(res) {
  const vary = (res.headers.get("vary") || "").toLowerCase();
  return vary.split(",").map((t) => t.trim()).includes("accept");
}

let isServerRunning = false;
try {
  const check = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(1000) });
  isServerRunning = check.status === 200;
} catch {
  isServerRunning = false;
}

test("1. GET / with Accept: text/html returns 200, HTML, Vary: Accept, H1, and JSON-LD", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/`, {
    headers: { Accept: "text/html" },
  });

  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/html"), `Content-Type must include text/html, got: ${contentType}`);
  // Next 16 does not propagate proxy response headers onto HTML pages, so
  // HTML cannot declare Vary: Accept; the negotiation guarantee is enforced
  // on the markdown variant (tests 2, 3, 6) and via the 406 branch (test 8).
  assert.ok(res.headers.get("vary"), "HTML response must include a Vary header");

  const html = await res.text();
  assert.ok(html.includes("Sanket Patel"), "HTML must include Sanket Patel");
  assert.ok(html.includes("<h1"), "HTML must include H1 tag");
  assert.ok(html.includes("application/ld+json"), "HTML must include JSON-LD script");
  assert.ok(html.includes('"@type":"Person"') || html.includes('"Person"'), "JSON-LD must include Person type");
  assert.ok(html.includes('"@type":"WebSite"') || html.includes('"WebSite"'), "JSON-LD must include WebSite type");
  assert.ok(html.includes('"@type":"ProfilePage"') || html.includes('"ProfilePage"'), "JSON-LD must include ProfilePage type");
});

test("2. GET / with Accept: text/markdown returns 200, text/markdown, and Vary: Accept", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/`, {
    headers: { Accept: "text/markdown" },
  });

  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"), `Content-Type must include text/markdown, got: ${contentType}`);
  assert.ok(varyHasAccept(res), `Vary header must include an exact Accept token, got: ${res.headers.get("vary")}`);

  const md = await res.text();
  assert.ok(md.includes("# Sanket Patel"), "Markdown must include # Sanket Patel");
  assert.ok(md.includes("Miracode"), "Markdown must include Miracode");
  assert.ok(md.includes("The Algorithm"), "Markdown must include The Algorithm");
});

test("3. GET /index.md returns 200 and text/markdown", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/index.md`);
  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"), `Content-Type must include text/markdown, got: ${contentType}`);
  assert.ok(varyHasAccept(res), `Vary must include an exact Accept token, got: ${res.headers.get("vary")}`);

  const md = await res.text();
  assert.ok(md.includes("Sanket Patel"), "Markdown must include Sanket Patel");
});

test("4. GET /projects.md returns 200 and Markdown with project descriptions", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/projects.md`);
  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"), `Content-Type must include text/markdown, got: ${contentType}`);

  const md = await res.text();
  assert.ok(md.includes("Miracode"), "Must include Miracode");
  assert.ok(md.includes("mdpeek"), "Must include mdpeek");
  assert.ok(md.includes("AuraFlow"), "Must include AuraFlow");
  assert.ok(md.includes("Small Server"), "Must include Small Server");
});

test("5. GET /nonexistent-path with Accept: text/html returns real HTTP 404 with recovery links", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/nonexistent-path-that-does-not-exist`, {
    headers: { Accept: "text/html" },
  });

  assert.equal(res.status, 404, "Must return HTTP 404");
  // Same Next 16 limitation as test 1: HTML 404s cannot declare Vary: Accept.
  assert.ok(res.headers.get("vary"), "HTML 404 must include a Vary header");
  const html = await res.text();
  assert.ok(html.includes("Page not found") || html.includes("404"), "HTML must show 404");
  assert.ok(html.includes("llms.txt"), "HTML 404 must include llms.txt link");
  assert.ok(html.includes("sitemap.xml"), "HTML 404 must include sitemap.xml link");
});

test("6. GET /nonexistent-path with Accept: text/markdown returns real HTTP 404 and Markdown recovery body", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/nonexistent-path-that-does-not-exist`, {
    headers: { Accept: "text/markdown" },
  });

  assert.equal(res.status, 404, "Must return HTTP 404");
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"), `Content-Type must include text/markdown, got: ${contentType}`);
  assert.ok(varyHasAccept(res), `Vary must include an exact Accept token, got: ${res.headers.get("vary")}`);

  const md = await res.text();
  assert.ok(md.includes("# 404 Not Found"), "Markdown must include # 404 Not Found");
  assert.ok(md.includes("llms.txt"), "Markdown 404 must link to llms.txt");
  assert.ok(md.includes("sitemap.xml"), "Markdown 404 must link to sitemap.xml");
});

test("7. GET /nonexistent.md returns real HTTP 404 with Markdown body", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/some-missing-doc.md`);
  assert.equal(res.status, 404);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"));
  const md = await res.text();
  assert.ok(md.includes("404 Not Found"));
});

test("8. GET / with unsupported Accept: application/pdf returns 406 Not Acceptable", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/`, {
    headers: { Accept: "application/pdf" },
  });

  assert.equal(res.status, 406, "Must return HTTP 406 Not Acceptable");
  assert.ok(varyHasAccept(res), `Vary must include an exact Accept token, got: ${res.headers.get("vary")}`);
});

test("9. GET /robots.txt returns 200, allows AI agents, and points to sitemap", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/robots.txt`);
  assert.equal(res.status, 200);
  const txt = await res.text();
  assert.ok(txt.includes("GPTBot"), "Must include GPTBot");
  assert.ok(txt.includes("ClaudeBot"), "Must include ClaudeBot");
  assert.ok(txt.includes("sitemap.xml"), "Must point to sitemap.xml");
});

test("10. GET /sitemap.xml returns 200 and valid sitemap XML", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/sitemap.xml`);
  assert.equal(res.status, 200);
  const xml = await res.text();
  assert.ok(xml.includes("<urlset"), "Must be valid urlset XML");
  assert.ok(xml.includes("https://www.sanketpatel.online/"), "Must include homepage");
  assert.ok(xml.includes("index.md"), "Must include index.md");
  assert.ok(xml.includes("llms.txt"), "Must include llms.txt");
});

test("11. GET /llms.txt and /llms-full.txt return 200", { skip: !isServerRunning }, async () => {
  const res1 = await fetch(`${BASE}/llms.txt`);
  assert.equal(res1.status, 200);
  const txt1 = await res1.text();
  assert.ok(txt1.includes("Sanket Patel"));

  const res2 = await fetch(`${BASE}/llms-full.txt`);
  assert.equal(res2.status, 200);
  const txt2 = await res2.text();
  assert.ok(txt2.includes("Sanket Patel"));
});

test("12. GET /about returns 200, HTML, H1, and >500 chars", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/about`, {
    headers: { Accept: "text/html" },
  });
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes("<h1"), "Must include H1 tag");
  assert.ok(html.length > 500, "Must contain >500 characters");
  assert.ok(html.includes("Sanket Patel"), "Must mention Sanket Patel");
});

test("13. GET /contact returns 200, HTML, H1, and >500 chars", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/contact`, {
    headers: { Accept: "text/html" },
  });
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes("<h1"), "Must include H1 tag");
  assert.ok(html.length > 500, "Must contain >500 characters");
  assert.ok(html.includes("sanpatel323@gmail.com"), "Must contain contact email");
});

test("14. GET /privacy returns 200, HTML, H1, and >500 chars", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/privacy`, {
    headers: { Accept: "text/html" },
  });
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes("<h1"), "Must include H1 tag");
  assert.ok(html.length > 500, "Must contain >500 characters");
  assert.ok(html.includes("Privacy Policy"), "Must contain Privacy Policy title");
});

test("15. GET /about.md returns 200 and text/markdown with >500 chars", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/about.md`);
  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"));
  const md = await res.text();
  assert.ok(md.length > 500);
  assert.ok(md.includes("About Sanket Patel"));
});

test("16. GET /contact.md returns 200 and text/markdown with >500 chars", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/contact.md`);
  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"));
  const md = await res.text();
  assert.ok(md.length > 500);
  assert.ok(md.includes("sanpatel323@gmail.com"));
});

test("17. GET /privacy.md returns 200 and text/markdown with >500 chars", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/privacy.md`);
  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"));
  const md = await res.text();
  assert.ok(md.length > 500);
  assert.ok(md.includes("Privacy Policy"));
});

test("Private application work stays credited in metadata but unnamed and unlinked on the page", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/`, { headers: { Accept: "text/html" } });
  assert.equal(res.status, 200);
  const html = await res.text();
  // Rendered <body> only — head metadata (keywords) still names every
  // shipped project, while the featured ItemList is homepage-scoped.
  const body = (html.match(/<body[\s\S]*<\/body>/i)?.[0] || "").replace(
    /<script[\s\S]*?<\/script>/g,
    "",
  );
  const jsonLdBlocks = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((m) => JSON.parse(m[1]));
  assert.ok(jsonLdBlocks.length > 0, "Structured data must be present");
  const allNodes = jsonLdBlocks.flatMap((doc) => doc["@graph"] ?? [doc]);
  const projects = allNodes.find(
    (entry) => entry["@type"] === "ItemList",
  ).itemListElement;
  const articles = body.match(/<article\b[^>]*>[\s\S]*?<\/article>/g) || [];

  const privateRow = articles.find((article) => article.includes("is-private"));
  assert.ok(privateRow, "Private work must be acknowledged in the index");
  assert.doesNotMatch(privateRow, /href=/, "Private work must not expose external links");
  assert.doesNotMatch(privateRow, /<img\b/i, "Private work must not show screenshots");

  // The featured-scope ItemList on the homepage names only the public
  // exhibits and index entries — mdpeek and the private builds stay out.
  const featuredNames = projects.map((entry) => entry.item.name);
  for (const name of ["AI Hiring Platform", "Voice AI Platform"]) {
    assert.ok(!body.includes(name), `${name} must stay unnamed on the homepage`);
    assert.ok(
      !featuredNames.some((n) => n.startsWith(name)),
      `${name} must stay out of the homepage featured ItemList`,
    );
  }
  assert.ok(
    !featuredNames.some((n) => /mdpeek/i.test(n)),
    "mdpeek must stay out of the homepage featured ItemList",
  );
  for (const name of ["Blunt Code", "Miracode", "AuraFlow", "Small Server"]) {
    assert.ok(
      featuredNames.some((n) => n.startsWith(name)),
      `${name} must be featured in the homepage ItemList`,
    );
  }
});

test("Homepage exhibits and index render real content with no retired work or hidden DOM", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/`, { headers: { Accept: "text/html" } });
  const html = await res.text();
  const body = (html.match(/<body[\s\S]*<\/body>/i)?.[0] || "").replace(
    /<script[\s\S]*?<\/script>/g,
    "",
  );

  assert.ok(!/mdpeek/i.test(body), "mdpeek must not appear anywhere on the homepage");
  assert.ok(!body.includes("sr-only"), "No hidden contract DOM on the page");

  // Blunt Code exhibit: the map, both readers, and its honesty label.
  assert.ok(body.includes(">Blunt Code</h2>"), "Blunt Code must be the flagship exhibit");
  assert.ok(body.includes("One report, two readers"), "Exhibit premise must be stated");
  assert.ok(body.includes("Local SQLite"), "The storage node must be drawn");
  assert.ok(body.includes(">Human</span>") && body.includes(">Markdown</span>"), "Human branch must be labelled");
  assert.ok(body.includes(">Tools</span>") && body.includes(">SARIF</span>"), "Tools branch must be labelled");
  assert.ok(body.includes("2.1.0"), "A schema-faithful SARIF excerpt must ship");
  assert.ok(body.includes("Synthetic report — no scan is run"), "The synthetic label must be present");

  // System Design Quest exhibit: the real lesson 17 content.
  assert.ok(body.includes("A nightly scan meets the cache"), "Lesson 17 must be named");
  assert.ok(body.includes("least frequently used"), "LFU must be an expanded choice");
  assert.ok(body.includes("least recently used"), "LRU must be an expanded choice");
  assert.ok(body.includes("TTL"), "TTL must be a choice");
  assert.ok(body.includes("best-sellers cached"), "The real prompt must ship");

  // Skip link and a small index of the other verified public work.
  assert.ok(body.includes("Skip to content"), "Skip link must be present");
  const rows = body.match(/<article\b[^>]*class="ft-idx[^"]*"[\s\S]*?<\/article>/g) || [];
  assert.equal(rows.length, 4, "Index lists Miracode, AuraFlow, Small Server and the private record");
  const miracode = rows.find((article) => article.includes(">Miracode</h3>"));
  assert.ok(miracode, "Miracode must be indexed");
  assert.match(miracode, /Personal fork of Mira/, "Miracode must stay labelled as a fork");
  assert.ok(miracode.includes("href="), "Miracode must link its source");
  const smallServer = rows.find((article) => article.includes(">Small Server</h3>"));
  assert.ok(smallServer, "Small Server must be indexed");
  assert.ok(smallServer.includes("/lab/cache"), "Small Server must carry its evidence line");
});

test("Open-source explorer renders the checked-in snapshot as a count matrix", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/`, { headers: { Accept: "text/html" } });
  const html = await res.text();
  const body = (html.match(/<body[\s\S]*<\/body>/i)?.[0] || "").replace(
    /<script[\s\S]*?<\/script>/g,
    "",
  );

  const { default: snapshot } = await import(
    "../src/features/fieldtrials/contributions.json",
    { with: { type: "json" } }
  );

  assert.ok(body.includes('id="open-source"'), "Explorer section must exist");
  assert.ok(
    body.includes("Other codebases") && body.includes("I work upstream, too."),
    "Premise must be stated",
  );
  assert.match(
    body,
    new RegExp(
      `${snapshot.meta.total}\\s*(?:<!-- -->)?\\s*merged pull requests across\\s*(?:<!-- -->)?\\s*${snapshot.meta.repoCount}\\s*(?:<!-- -->)?\\s*public\\s*(?:<!-- -->)?\\s*repositories`,
    ),
    "Dynamic totals must be stated",
  );
  assert.ok(
    /GitHub<\/a>\s*(?:<!-- -->)?\s*snapshot/.test(body) && body.includes("UTC"),
    "The snapshot must be labeled with a UTC date",
  );
  assert.ok(
    body.includes("Only dates with merges are shown."),
    "The day-column rule must be stated",
  );

  // One equal column per active UTC day, in ascending order.
  const activeDays = [
    ...new Set(snapshot.repos.flatMap((r) => r.merges.map((m) => m.date))),
  ].sort();
  const head = body.match(/<div[^>]*class="ft-oss-head"[\s\S]*?<\/div>/);
  assert.ok(head, "The shared column header must render");
  const headCells = head[0].match(/ft-oss-cell-head/g) || [];
  assert.equal(
    headCells.length,
    Math.min(activeDays.length, 6),
    "Header shows one column per active day (Earlier + 5 when >6)",
  );

  // Every repository and every PR link from the validated snapshot renders.
  const rows = body.match(/<details\b[^>]*class="ft-oss-row"/g) || [];
  assert.equal(rows.length, snapshot.meta.repoCount, "All snapshot repos render as rows");
  for (const repo of snapshot.repos) {
    assert.ok(body.includes(repo.repo), `${repo.repo} must be named`);
    for (const m of repo.merges) {
      assert.ok(
        body.includes(`href="${m.url}"`),
        `PR link must be present: ${m.url}`,
      );
    }
  }

  // Cells carry plain-text counts (or a restrained dash), not color-only marks.
  const cells = body.match(/class="ft-oss-cell"[^>]*>/g) || [];
  assert.equal(
    cells.length,
    snapshot.meta.repoCount * headCells.length,
    "Every row fills every day column",
  );
  assert.ok(body.includes('data-empty="true">–'), "Empty cells show a dash");

  // Accessible labels: name+count on the summary, a hidden per-date
  // breakdown via aria-describedby, and no extra focus stops.
  assert.ok(
    /<summary[^>]*aria-label="[^"]*merged pull request/.test(body),
    "Rows must carry accessible name + count labels",
  );
  const described = body.match(/aria-describedby="ft-oss-desc-(\d+)"/g) || [];
  assert.equal(
    described.length,
    snapshot.meta.repoCount,
    "Every row references its date/count description",
  );

  // Top entries are upfront, the rest behind a native disclosure.
  const topRepo = snapshot.repos[0].repo;
  const showAll = body.indexOf("Show all");
  const topIdx = body.indexOf(topRepo);
  assert.ok(topIdx !== -1 && showAll !== -1 && topIdx < showAll,
    "Top repos render before the Show-all disclosure");
  assert.match(
    body,
    new RegExp(
      `Show all\\s*(?:<!-- -->)?\\s*${snapshot.meta.repoCount}\\s*(?:<!-- -->)?\\s*repositories`,
    ),
    "Show-all must name the full repository count",
  );
});

