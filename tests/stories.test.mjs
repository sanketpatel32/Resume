import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

async function loadContent(relativePath) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const [{ stories }, { projects }] = await Promise.all([
  loadContent("../src/features/resume/content/stories.ts"),
  loadContent("../src/features/resume/content/projects.ts"),
]);

const PRIVATE = ["AI Hiring Platform", "Voice AI Platform"];

test("Every project has exactly one case study", () => {
  assert.equal(stories.length, projects.length);
  for (const project of projects) {
    const matches = stories.filter((story) => project.name.startsWith(story.project));
    assert.equal(matches.length, 1, `${project.name} needs one story`);
    const [story] = matches;
    assert.ok(story.problem.length > 0, `${story.project} needs a problem statement`);
    assert.ok(story.built.length > 0, `${story.project} needs a build list`);
    assert.ok(story.impact.length > 0, `${story.project} needs an impact list`);
  }
});

test("Private applications use illustrations, never screenshots", () => {
  for (const name of PRIVATE) {
    const story = stories.find((item) => item.project === name);
    assert.equal(story.visual.kind, "scene", `${name} must not ship a screenshot`);
    assert.match(story.visual.caption, /illustration/i, `${name} visual must be labelled as an illustration`);
  }
});

test("Screenshot visuals point at committed files", () => {
  for (const story of stories) {
    if (story.visual.kind !== "image") continue;
    assert.ok(story.visual.alt.length > 0, `${story.project} screenshot needs alt text`);
    assert.ok(existsSync(new URL(`../public${story.visual.src}`, import.meta.url)), `${story.visual.src} must exist`);
  }
});

test("Miracode stays honest about being a fork", () => {
  const story = stories.find((item) => item.project === "Miracode");
  assert.match(story.note ?? "", /fork/i);
  assert.ok(story.impact.some((line) => /upstream/i.test(line)), "Miracode impact must credit upstream Mira");
});
