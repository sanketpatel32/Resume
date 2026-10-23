import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

async function loadContent(relativePath) {
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const [{ getFocusedProjects }, { projects }] = await Promise.all([
  loadContent("../src/features/resume/model/work.ts"),
  loadContent("../src/features/resume/content/projects.ts"),
]);

test("The work explorer keeps complete private applications in interface and system views", () => {
  for (const focus of ["all", "interfaces", "systems"]) {
    const results = getFocusedProjects(projects, focus);
    for (const name of ["AI Hiring Platform", "Voice AI Platform"]) {
      const project = results.find((item) => item.name.startsWith(name));
      assert.ok(project, `${name} belongs in ${focus}`);
      assert.deepEqual(project.links, {}, "Private application work must remain unlinked");
    }
  }
});

test("Developer tools is a focused collection, and Everything restores the complete index", () => {
  assert.deepEqual(getFocusedProjects(projects, "tools").map((item) => item.name.split(" - ")[0]), ["Blunt Code", "mdpeek", "AuraFlow"]);
  assert.equal(getFocusedProjects(projects, "all"), projects);
});
