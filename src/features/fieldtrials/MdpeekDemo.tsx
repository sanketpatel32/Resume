"use client";

import { useState } from "react";
import { renderMarkdown } from "./markdown";
import { DEMO_SAMPLES } from "./samples";

/**
 * A small working specimen of mdpeek's edit → preview loop.
 * Desktop shows Write and See the result side by side; phones show one
 * side at a time, starting on the result, with an "Edit Markdown" action.
 * Deterministic — no network, no embeds, documents owned by this page.
 */
export default function MdpeekDemo() {
  const [sampleId, setSampleId] = useState(DEMO_SAMPLES[0].id);
  const [side, setSide] = useState<"write" | "result">("result");
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
  const sampleLabel = DEMO_SAMPLES.find((s) => s.id === sampleId)?.label;

  return (
    <div className="ft-demo" data-side={side}>
      <div className="ft-demo-workspace">
        <div className="ft-pane ft-write">
          <p className="ft-pane-label" id="ft-write-label">
            Write
          </p>
          <textarea
            className="ft-source"
            value={source}
            onChange={(event) =>
              setDocs((current) => ({ ...current, [sampleId]: event.target.value }))
            }
            aria-labelledby="ft-write-label"
            aria-label={`Markdown source — ${sampleLabel}`}
            spellCheck={false}
            rows={8}
          />
        </div>
        <div className="ft-pane ft-result">
          <p className="ft-pane-label" id="ft-result-label">
            See the result
          </p>
          <div className="ft-preview" aria-live="polite">
            {preview}
          </div>
        </div>
      </div>

      <div className="ft-demo-below">
        <fieldset className="ft-samples">
          <legend>Example</legend>
          {DEMO_SAMPLES.map((sample) => (
            <label key={sample.id} className={sampleId === sample.id ? "is-active" : ""}>
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

        <button
          type="button"
          className="ft-edit-toggle"
          aria-pressed={side === "write"}
          onClick={() => setSide((s) => (s === "write" ? "result" : "write"))}
        >
          {side === "write" ? "See the result" : "Edit Markdown"}
        </button>
      </div>
    </div>
  );
}
