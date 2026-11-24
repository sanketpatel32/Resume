"use client";

import { useState } from "react";
import { renderMarkdown } from "./markdown";
import { DEMO_SAMPLES } from "./samples";

/**
 * Fig. 01 — a small working sketch of mdpeek's input → live-preview loop.
 * Deliberately labeled "browser demo": the real app is a Tauri desktop build
 * and renders far more of Markdown than the subset here. Deterministic —
 * no network, no embeds, documents owned by this page.
 */
export default function MdpeekDemo() {
  const [sampleId, setSampleId] = useState(DEMO_SAMPLES[0].id);
  const [view, setView] = useState<"source" | "preview">("source");
  const [docs, setDocs] = useState<Record<string, string>>(() =>
    Object.fromEntries(DEMO_SAMPLES.map((s) => [s.id, s.body])),
  );

  const source = docs[sampleId];

  const toggleTask = (lineIndex: number) => {
    setDocs((current) => {
      const lines = current[sampleId].split("\n");
      const line = lines[lineIndex];
      if (!line) return current;
      lines[lineIndex] = line.includes("- [ ]")
        ? line.replace("- [ ]", "- [x]")
        : line.replace("- [x]", "- [ ]").replace("- [X]", "- [ ]");
      return { ...current, [sampleId]: lines.join("\n") };
    });
  };

  const preview = renderMarkdown(source, toggleTask);

  return (
    <div className="ft-inst">
      <div className="ft-inst-head">
        <span className="ft-fig">Fig. 01</span>
        <span className="ft-inst-name">source → live preview</span>
        <span className="ft-demo-tag">browser demo</span>
      </div>

      <div className="ft-inst-controls">
        <fieldset className="ft-samples">
          <legend>Sample</legend>
          {DEMO_SAMPLES.map((sample) => (
            <label
              key={sample.id}
              className={sampleId === sample.id ? "is-active" : ""}
            >
              <input
                type="radio"
                name="mdpeek-sample"
                value={sample.id}
                checked={sampleId === sample.id}
                onChange={() => setSampleId(sample.id)}
              />
              <span>{sample.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="ft-view" role="group" aria-label="Document view">
          <button
            type="button"
            aria-pressed={view === "source"}
            className={view === "source" ? "is-active" : ""}
            onClick={() => setView("source")}
          >
            Source
          </button>
          <button
            type="button"
            aria-pressed={view === "preview"}
            className={view === "preview" ? "is-active" : ""}
            onClick={() => setView("preview")}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="ft-inst-pane">
        {view === "source" ? (
          <textarea
            className="ft-source"
            value={source}
            onChange={(event) =>
              setDocs((current) => ({ ...current, [sampleId]: event.target.value }))
            }
            aria-label={`Markdown source — ${DEMO_SAMPLES.find((s) => s.id === sampleId)?.label}`}
            spellCheck={false}
          />
        ) : (
          <div className="ft-preview" aria-live="polite">
            {preview}
          </div>
        )}
      </div>

      <p className="ft-inst-note">
        Editable source, deterministic render. A small Markdown subset runs
        here — the desktop build renders GFM, KaTeX and Mermaid.{" "}
        <a href="https://github.com/sanketpatel32/Mdpeek" target="_blank" rel="noopener noreferrer">
          Repository
        </a>{" "}
        ·{" "}
        <a href="https://github.com/sanketpatel32/Mdpeek/releases/tag/v2.0.0" target="_blank" rel="noopener noreferrer">
          Release 2.0.0
        </a>
      </p>
    </div>
  );
}
