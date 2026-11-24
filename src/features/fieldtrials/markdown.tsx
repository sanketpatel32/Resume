import type { ReactNode } from "react";

/**
 * A small, deterministic Markdown subset for the mdpeek browser demo.
 * Renders to React elements only — no raw HTML is ever injected.
 * Deliberately limited to what the samples use: headings, paragraphs,
 * bold/italic/code/links/strikethrough, lists (incl. task items),
 * blockquotes, fenced code, tables and rules.
 */

const INLINE_RE =
  /(\*\*[^*]+\*\*|\*[^*\n]+\*|~~[^~]+~~|`[^`]+`|\[[^\]\n]+\]\([^)\s]+\))/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const match of text.matchAll(INLINE_RE)) {
    const token = match[0];
    const start = match.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const key = `${keyPrefix}-i${i++}`;
    if (token.startsWith("**")) {
      out.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("~~")) {
      out.push(<del key={key}>{token.slice(2, -2)}</del>);
    } else if (token.startsWith("`")) {
      out.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("[")) {
      const label = token.slice(1, token.indexOf("]"));
      const href = token.slice(token.indexOf("](") + 2, -1);
      const safe = /^(https?:|mailto:|#|\/)/i.test(href);
      out.push(
        safe ? (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ) : (
          <span key={key}>{label}</span>
        ),
      );
    } else {
      out.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    last = start + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const TASK_RE = /^- \[( |x|X)\] (.*)$/;
const UL_RE = /^[-*] (.*)$/;
const OL_RE = /^\d+\. (.*)$/;
const HEADING_RE = /^(#{1,4}) (.*)$/;
const TABLE_SEP_RE = /^\|?[\s:|-]+\|[\s:|-]*$/;

type ListItem = { line: number; task: null | { checked: boolean }; text: string };

export function renderMarkdown(
  source: string,
  onToggleTask?: (line: number) => void,
): ReactNode[] {
  const lines = source.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;
  const key = () => `md-${k++}`;

  const splitRow = (row: string) =>
    row
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    // Fenced code
    if (line.trimStart().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        buf.push(lines[i]);
        i += 1;
      }
      i += 1; // closing fence
      blocks.push(
        <pre key={key()} data-lang={lang || undefined}>
          <code>{buf.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // Table: header row + separator row
    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      TABLE_SEP_RE.test(lines[i + 1].trim())
    ) {
      const head = splitRow(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") {
        rows.push(splitRow(lines[i]));
        i += 1;
      }
      blocks.push(
        <table key={key()}>
          <thead>
            <tr>
              {head.map((cell, c) => (
                <th key={c}>{renderInline(cell, `h${c}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c}>{renderInline(cell, `r${r}c${c}`)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>,
      );
      continue;
    }

    const heading = line.match(HEADING_RE);
    if (heading) {
      const level = heading[1].length;
      const text = renderInline(heading[2], `h${i}`);
      if (level === 1) blocks.push(<h1 key={key()}>{text}</h1>);
      else if (level === 2) blocks.push(<h2 key={key()}>{text}</h2>);
      else if (level === 3) blocks.push(<h3 key={key()}>{text}</h3>);
      else blocks.push(<h4 key={key()}>{text}</h4>);
      i += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push(<hr key={key()} />);
      i += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        buf.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push(
        <blockquote key={key()}>
          <p>{renderInline(buf.join(" "), `q${i}`)}</p>
        </blockquote>,
      );
      continue;
    }

    const task = line.match(TASK_RE);
    const ul = line.match(UL_RE);
    const ol = line.match(OL_RE);
    if (task || ul || ol) {
      const ordered = Boolean(ol) && !task;
      const items: ListItem[] = [];
      while (i < lines.length) {
        const t = lines[i].match(TASK_RE);
        const u = lines[i].match(UL_RE);
        const o = lines[i].match(OL_RE);
        if (t) {
          items.push({ line: i, task: { checked: t[1].toLowerCase() === "x" }, text: t[2] });
        } else if (u) {
          items.push({ line: i, task: null, text: u[1] });
        } else if (o && !t) {
          items.push({ line: i, task: null, text: o[1] });
        } else {
          break;
        }
        i += 1;
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(
        <List key={key()}>
          {items.map((item) => (
            <li key={item.line} className={item.task ? "task" : undefined}>
              {item.task ? (
                <label>
                  <input
                    type="checkbox"
                    checked={item.task.checked}
                    onChange={() => onToggleTask?.(item.line)}
                  />
                  <span>{renderInline(item.text, `t${item.line}`)}</span>
                </label>
              ) : (
                renderInline(item.text, `t${item.line}`)
              )}
            </li>
          ))}
        </List>,
      );
      continue;
    }

    // Paragraph: gather until blank line or a block opener
    const buf: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !HEADING_RE.test(lines[i]) &&
      !lines[i].trimStart().startsWith("```") &&
      !lines[i].startsWith("> ") &&
      !UL_RE.test(lines[i]) &&
      !OL_RE.test(lines[i]) &&
      !/^(-{3,}|\*{3,})$/.test(lines[i].trim()) &&
      !(
        lines[i].includes("|") &&
        i + 1 < lines.length &&
        TABLE_SEP_RE.test(lines[i + 1].trim())
      )
    ) {
      buf.push(lines[i]);
      i += 1;
    }
    blocks.push(<p key={key()}>{renderInline(buf.join(" "), `p${i}`)}</p>);
  }

  return blocks;
}
