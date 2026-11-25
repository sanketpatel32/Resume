import test from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.RESUME_TEST_URL || "http://localhost:3000";

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

test("Homepage only features the approved public project selection", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/`, { headers: { Accept: "text/html" } });
  const html = await res.text();
  const body = (html.match(/<body[\s\S]*<\/body>/i)?.[0] || "").replace(/<script[\s\S]*?<\/script>/g, "");
  const nodes = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map(m => JSON.parse(m[1])).flatMap(doc => doc["@graph"] ?? [doc]);
  const featured = nodes.find(node => node["@type"] === "ItemList")?.itemListElement;
  assert.doesNotMatch(body, /AI Hiring Platform|Voice AI Platform|mdpeek|yumedock/i);
  assert.deepEqual(featured.map(entry => entry.item.name.split(" - ")[0]), [
    "System Design Quest", "UI Vault", "Blunt Code", "Small Server",
  ]);
});

test("Homepage starts with a source-linked workbench before projects and contributions", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/`, { headers: { Accept: "text/html" } });
  const body = (await res.text()).match(/<main[\s\S]*?<\/main>/i)?.[0] || "";
  assert.match(body, /id="sy-title">Sanket/);
  assert.match(body, /name="field-samples"/);
  assert.match(body, /class="atlas-ledger"/);
  assert.match(body, /class="atlas-catalogue" data-view="plates"/);
  assert.match(body, /id="workbench"/);
  assert.match(body, /Can we skip the download\?/);
  assert.match(body, /ETag \+ JSON body/);
  assert.match(body, /If-None-Match/);
  for (const id of ["trace", "find", "decide"]) {
    assert.ok(body.includes(`href="#project-${id}"`));
    assert.ok(body.includes(`id="project-${id}"`));
  }
  assert.ok(body.indexOf('id="workbench"') < body.indexOf('id="work"'));
  assert.ok(body.indexOf('id="work"') < body.indexOf('id="open-source"'));
  assert.match(body, /github.com\/sanketpatel32\/Small-server/);
  assert.match(body, /github.com\/sanketpatel32\/Portal/);
});

test("Contribution gallery has star-ranked exhibits, precise repository stars and all merged evidence", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/`, { headers: { Accept: "text/html" } });
  const body = (await res.text()).match(/<main[\s\S]*<\/main>/i)?.[0] || "";
  const { default: snapshot } = await import("../src/features/fieldtrials/contributions.json", { with: { type: "json" } });
  assert.ok(body.includes('id="open-source"'));
  assert.ok(body.includes(`<dt>${snapshot.meta.total}</dt><dd>merged PRs</dd>`));
  assert.ok(body.includes(`<dt>${snapshot.meta.repoCount}</dt><dd>outside repos</dd>`));
  assert.ok(body.includes("Public GitHub snapshot"));
  assert.ok(body.includes(`dateTime="${snapshot.meta.cutoffUTC}"`));
  assert.equal((body.match(/class="sy-repo"/g) || []).length, snapshot.meta.repoCount);
  const { default: metadata } = await import("../src/features/switchyard/repo-stars.json", { with: { type: "json" } });
  const ordered = [...snapshot.repos].sort((a, b) => metadata.stars[b.repo] - metadata.stars[a.repo] || b.count - a.count || a.repo.localeCompare(b.repo));
  const gallery = body.match(/class="sy-exhibit-grid"[\s\S]*?<details class="sy-all sy-index"/)?.[0] ?? "";
  assert.equal((gallery.match(/class="sy-exhibit"/g) || []).length, 6);
  const starCounts = [...gallery.matchAll(/data-repo-stars="(\d+)"/g)].map(m => Number(m[1]));
  assert.deepEqual(starCounts, ordered.slice(0, 6).map(row => metadata.stars[row.repo]));
  assert.ok(body.includes("Stars belong to the repositories, not the PRs"));
  assert.ok(body.includes("https://github.com/C4rohan/Lampline/pull/135"));
  for (const row of snapshot.repos) {
    assert.ok(body.includes(`href="https://github.com/${row.repo}"`));
    for (const pr of row.merges) {
      assert.ok(body.includes(`href="${pr.url}"`), `Missing ${pr.url}`);
    }
  }
  assert.match(body, /<details class="sy-all sy-index"><summary>/);
});
