import test from "node:test";
import assert from "node:assert/strict";

const BASE = "http://localhost:3000";

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
  const vary = res.headers.get("vary") || "";
  assert.ok(vary.toLowerCase().includes("accept"), `Vary header must include Accept, got: ${vary}`);

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
  const vary = res.headers.get("vary") || "";
  assert.ok(vary.toLowerCase().includes("accept"), `Vary header must include Accept, got: ${vary}`);

  const md = await res.text();
  assert.ok(md.includes("# Sanket Patel"), "Markdown must include # Sanket Patel");
  assert.ok(md.includes("ScanForge"), "Markdown must include ScanForge");
  assert.ok(md.includes("The Algorithm"), "Markdown must include The Algorithm");
});

test("3. GET /index.md returns 200 and text/markdown", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/index.md`);
  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"), `Content-Type must include text/markdown, got: ${contentType}`);
  const vary = res.headers.get("vary") || "";
  assert.ok(vary.toLowerCase().includes("accept"), `Vary must include Accept, got: ${vary}`);

  const md = await res.text();
  assert.ok(md.includes("Sanket Patel"), "Markdown must include Sanket Patel");
});

test("4. GET /projects.md returns 200 and Markdown with project descriptions", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/projects.md`);
  assert.equal(res.status, 200);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(contentType.includes("text/markdown"), `Content-Type must include text/markdown, got: ${contentType}`);

  const md = await res.text();
  assert.ok(md.includes("ScanForge"), "Must include ScanForge");
  assert.ok(md.includes("mdpeek"), "Must include mdpeek");
  assert.ok(md.includes("AuraFlow"), "Must include AuraFlow");
  assert.ok(md.includes("Salon Management"), "Must include Salon Management");
});

test("5. GET /nonexistent-path with Accept: text/html returns real HTTP 404 with recovery links", { skip: !isServerRunning }, async () => {
  const res = await fetch(`${BASE}/nonexistent-path-that-does-not-exist`, {
    headers: { Accept: "text/html" },
  });

  assert.equal(res.status, 404, "Must return HTTP 404");
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
  const vary = res.headers.get("vary") || "";
  assert.ok(vary.toLowerCase().includes("accept"), `Vary must include Accept, got: ${vary}`);

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
  const vary = res.headers.get("vary") || "";
  assert.ok(vary.toLowerCase().includes("accept"), `Vary must include Accept, got: ${vary}`);
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
