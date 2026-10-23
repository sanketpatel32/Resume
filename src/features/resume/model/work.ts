import type { ProjectItem } from "./types";

export type WorkFocus = "all" | "interfaces" | "systems" | "tools";

export const workLenses: { id: WorkFocus; label: string; description: string; projects: string[] }[] = [
  { id: "all", label: "Everything", description: "Complete applications and independent experiments. Every layer, connected.", projects: [] },
  { id: "interfaces", label: "Interfaces", description: "The part people touch. Candidate portals, workflow builders, and everyday product experiences.", projects: ["AI Hiring Platform", "Voice AI Platform", "Salon"] },
  { id: "systems", label: "Systems", description: "The work beneath the surface. APIs, data, voice services, and real-time coordination.", projects: ["AI Hiring Platform", "Voice AI Platform", "ScanForge", "AuraFlow"] },
  { id: "tools", label: "Developer tools", description: "Software for making software. Local analysis, native documents, and a developer workspace.", projects: ["Blunt Code", "mdpeek", "AuraFlow"] },
];

export function getFocusedProjects(projects: ProjectItem[], focus: WorkFocus) {
  if (focus === "all") return projects;
  const lens = workLenses.find((item) => item.id === focus)!;
  return projects.filter((project) => lens.projects.some((name) => project.name.startsWith(name)));
}
