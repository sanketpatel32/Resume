import type { CareerItem, EducationItem } from "./types";

export interface Milestone {
  kind: "work" | "study";
  year: string;
  dates: string;
  title: string;
  place: string;
  location?: string;
  details: string[];
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function sortKey(dates: string) {
  const year = Number(dates.match(/\d{4}/)?.[0] ?? 0);
  const month = MONTHS.findIndex((name) => dates.toLowerCase().startsWith(name));
  return year * 12 + Math.max(0, month);
}

/** Education and roles merged into one chronological path, oldest first. */
export function buildPath(career: CareerItem[], education: EducationItem[]): Milestone[] {
  const studies: Milestone[] = [...education].reverse().map((item) => ({
    kind: "study",
    year: item.dates.match(/\d{4}/)?.[0] ?? item.dates,
    dates: item.dates,
    title: item.degree,
    place: item.school,
    details: item.details,
  }));
  const roles: Milestone[] = [...career].reverse().map((item) => ({
    kind: "work",
    year: item.dates.match(/\d{4}/)?.[0] ?? item.dates,
    dates: item.dates,
    title: item.role,
    place: item.company,
    location: item.location,
    details: item.bullets,
  }));
  return [...studies, ...roles].sort((a, b) => sortKey(a.dates) - sortKey(b.dates));
}
