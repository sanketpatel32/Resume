import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// 1. Test Content Negotiation Logic
test("parseAccept correctly parses headers with q-values and specificity", () => {
  function parseAccept(header) {
    return header
      .split(",")
      .map((raw) => {
        const parts = raw.trim().split(";").map((s) => s.trim());
        const type = parts[0].toLowerCase();
        let q = 1;
        for (const param of parts.slice(1)) {
          const [name, value] = param.split("=").map((s) => s.trim());
          if (name === "q") {
            const parsed = Number(value);
            if (!Number.isNaN(parsed)) {
              q = Math.max(0, Math.min(1, parsed));
            }
          }
        }
        const specificity =
          type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
        return { type, q, specificity };
      })
      .filter((entry) => entry.type.length > 0);
  }

  const entries = parseAccept("text/markdown;q=0.9, text/html, */*;q=0.1");
  assert.equal(entries.length, 3);
  assert.deepEqual(entries[0], { type: "text/markdown", q: 0.9, specificity: 2 });
  assert.deepEqual(entries[1], { type: "text/html", q: 1, specificity: 2 });
  assert.deepEqual(entries[2], { type: "*/*", q: 0.1, specificity: 0 });
});

test("preferredType negotiates correctly based on acceptmarkdown spec", () => {
  const PRODUCES = ["text/html", "text/markdown"];

  function parseAccept(header) {
    return header
      .split(",")
      .map((raw) => {
        const parts = raw.trim().split(";").map((s) => s.trim());
        const type = parts[0].toLowerCase();
        let q = 1;
        for (const param of parts.slice(1)) {
          const [name, value] = param.split("=").map((s) => s.trim());
          if (name === "q") {
            const parsed = Number(value);
            if (!Number.isNaN(parsed)) {
              q = Math.max(0, Math.min(1, parsed));
            }
          }
        }
        const specificity =
          type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
        return { type, q, specificity };
      })
      .filter((entry) => entry.type.length > 0);
  }

  function matches(entry, candidate) {
    if (entry.type === "*/*") return true;
    if (entry.type.endsWith("/*")) {
      return candidate.startsWith(entry.type.slice(0, -1));
    }
    return entry.type === candidate;
  }

  function preferredType(header) {
    if (!header || header.trim() === "") return PRODUCES[0];
    const entries = parseAccept(header);
    if (entries.length === 0) return PRODUCES[0];

    let bestType = null;
    let bestQ = -1;
    let bestPosition = Infinity;

    for (const candidate of PRODUCES) {
      let matched = null;
      let matchedPosition = Infinity;

      for (let idx = 0; idx < entries.length; idx++) {
        const e = entries[idx];
        if (!matches(e, candidate)) continue;
        if (
          matched === null ||
          e.specificity > matched.specificity ||
          (e.specificity === matched.specificity && idx < matchedPosition)
        ) {
          matched = e;
          matchedPosition = idx;
        }
      }

      if (matched === null) continue;
      const matchedQ = matched.q;
      if (matchedQ <= 0) continue;

      if (
        matchedQ > bestQ ||
        (matchedQ === bestQ && matchedPosition < bestPosition)
      ) {
        bestQ = matchedQ;
        bestPosition = matchedPosition;
        bestType = candidate;
      }
    }

    return bestType;
  }

  // Basic markdown request
  assert.equal(preferredType("text/markdown"), "text/markdown");

  // Client order tiebreak when q is equal
  assert.equal(preferredType("text/markdown, text/html"), "text/markdown");
  assert.equal(preferredType("text/html, text/markdown"), "text/html");

  // Q-value weighting
  assert.equal(preferredType("text/markdown;q=0.9, text/html;q=0.8"), "text/markdown");
  assert.equal(preferredType("text/html;q=0.9, text/markdown;q=0.8"), "text/html");

  // Rejection with q=0
  assert.equal(preferredType("text/html;q=0, text/markdown;q=0.5"), "text/markdown");
  assert.equal(preferredType("text/html;q=0, text/markdown;q=0"), null);

  // Unsupported format without wildcard -> 406 (returns null)
  assert.equal(preferredType("application/pdf"), null);
  assert.equal(preferredType("image/webp, image/png"), null);

  // Wildcard fallback
  assert.equal(preferredType("*/*"), "text/html");
  assert.equal(preferredType("text/markdown, */*;q=0.5"), "text/markdown");

  // RFC 9110 Specificity override: specific q=0 overrides wildcard q=1
  assert.equal(preferredType("text/html;q=0, */*;q=1"), "text/markdown");
});

// 2. Test llms.txt and llms-full.txt presence and content
test("llms.txt and llms-full.txt are present and formatted correctly", () => {
  const llmsPath = path.join(process.cwd(), "public", "llms.txt");
  const llmsFullPath = path.join(process.cwd(), "public", "llms-full.txt");

  assert.ok(fs.existsSync(llmsPath), "public/llms.txt must exist");
  assert.ok(fs.existsSync(llmsFullPath), "public/llms-full.txt must exist");

  const llmsContent = fs.readFileSync(llmsPath, "utf-8");
  const llmsFullContent = fs.readFileSync(llmsFullPath, "utf-8");

  assert.ok(llmsContent.includes("Sanket Patel"), "llms.txt contains brand name");
  assert.ok(llmsContent.includes("ScanForge"), "llms.txt contains ScanForge project");
  assert.ok(llmsContent.includes("mdpeek"), "llms.txt contains mdpeek project");
  assert.ok(llmsContent.includes("https://www.sanketpatel.online/"), "llms.txt contains canonical URL");

  assert.ok(llmsFullContent.includes("Sanket Patel"), "llms-full.txt contains brand name");
  assert.ok(llmsFullContent.length > 1000, "llms-full.txt contains comprehensive text");
});

test("llms.txt has a single serving strategy (static file, no shadowed app route)", () => {
  const shadowRoute = path.join(process.cwd(), "src", "app", "llms.txt");
  assert.ok(
    !fs.existsSync(shadowRoute),
    "src/app/llms.txt must not exist: public/llms.txt is the canonical source and any app route at the same path would be silently shadowed",
  );
});

// 3. Test Structured Data JSON-LD Schema
test("Structured data includes Person, WebSite, ProfilePage, and ItemList", () => {
  const schemaFile = path.join(process.cwd(), "src", "features", "resume", "jsonld", "personJsonLd.ts");
  assert.ok(fs.existsSync(schemaFile), "personJsonLd.ts must exist");
  const content = fs.readFileSync(schemaFile, "utf-8");

  assert.ok(content.includes("@context"), "contains @context");
  assert.ok(content.includes("https://schema.org"), "context is https://schema.org");
  assert.ok(content.includes('"Person"'), "contains Person type");
  assert.ok(content.includes('"WebSite"'), "contains WebSite type");
  assert.ok(content.includes('"ProfilePage"'), "contains ProfilePage type");
  assert.ok(content.includes('"ItemList"'), "contains ItemList type");
  assert.ok(content.includes("Birla Institute of Technology, Mesra"), "contains alma mater");
});

// 4. Test SEO Metadata and Alternates
test("SEO metadata configures canonical domain and markdown alternates", () => {
  const seoFile = path.join(process.cwd(), "src", "features", "resume", "content", "seo.ts");
  const siteFile = path.join(process.cwd(), "src", "features", "resume", "content", "site.ts");
  const content = fs.readFileSync(seoFile, "utf-8");
  const siteContent = fs.readFileSync(siteFile, "utf-8");

  assert.ok(siteContent.includes("https://www.sanketpatel.online"), "SITE_URL points to canonical domain");
  assert.ok(content.includes("SITE_URL"), "metadataBase references SITE_URL");
  assert.ok(content.includes("text/markdown"), "alternates contains text/markdown");
  assert.ok(content.includes("/index.md"), "alternates links to /index.md");
  assert.ok(content.includes("BRAND_NAME"), "title contains BRAND_NAME");
  assert.ok(content.includes("robots"), "robots configuration present");
});

// 5. Test 404 and Markdown recovery
test("Markdown generator provides 404 recovery with discovery links", () => {
  const mdFile = path.join(process.cwd(), "src", "features", "resume", "content", "markdown.ts");
  const content = fs.readFileSync(mdFile, "utf-8");

  assert.ok(content.includes("getNotFoundMarkdown"), "getNotFoundMarkdown defined");
  assert.ok(content.includes("getMarkdownForSlug"), "getMarkdownForSlug defined");
  assert.ok(content.includes("llms.txt"), "404 recovery includes llms.txt link");
  assert.ok(content.includes("sitemap.xml"), "404 recovery includes sitemap.xml link");
  assert.ok(content.includes("404 Not Found"), "404 recovery contains header");
});

// 6. Test Proxy (Next 16 Middleware) and Next Config
test("Proxy and next.config.ts configure Vary: Accept", () => {
  const proxyFile = path.join(process.cwd(), "src", "proxy.ts");
  const nextConfigFile = path.join(process.cwd(), "next.config.ts");

  const proxyContent = fs.readFileSync(proxyFile, "utf-8");
  const ncContent = fs.readFileSync(nextConfigFile, "utf-8");

  assert.ok(proxyContent.includes("Vary") || proxyContent.includes("appendVaryAccept"), "proxy attaches Vary: Accept");
  assert.ok(proxyContent.includes("406"), "proxy handles 406 Not Acceptable");
  assert.ok(ncContent.includes("Vary") && ncContent.includes("Accept"), "next.config.ts configures Vary: Accept headers");
});

