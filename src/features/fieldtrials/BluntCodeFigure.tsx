"use client";

import { useState, useSyncExternalStore } from "react";

/**
 * Blunt Code specimen — one report, two readers.
 * A typeset map of the tool's shape (local SQLite → a human report and a
 * tool-readable export) above one working control that shows the same
 * synthetic one-item report as a reader sees it and as tools ingest it.
 * Read-only: the fixture is owned by this page; nothing is scanned.
 * Server render shows the human report; the view control is added once
 * mounted so no dead control ships without JavaScript.
 */

const SARIF_EXCERPT = `{
  "$schema": "https://json.schemastore.org/sarif-2.1.0.json",
  "version": "2.1.0",
  "runs": [
    {
      "tool": { "driver": { "name": "Blunt Code" } },
      "results": [
        {
          "level": "note",
          "message": { "text": "Illustrative entry" }
        }
      ]
    }
  ]
}`;

const emptySubscribe = () => () => {};

export default function BluntCodeFigure() {
  const [view, setView] = useState<"report" | "export">("report");
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <div className="ft-figure" data-view={view}>
      {mounted && (
        <p className="ft-viewbar" role="group" aria-label="Switch report view">
          <button
            type="button"
            aria-pressed={view === "report"}
            onClick={() => setView("report")}
          >
            Read report
          </button>
          <button
            type="button"
            aria-pressed={view === "export"}
            onClick={() => setView("export")}
          >
            Inspect export
          </button>
        </p>
      )}

      <div className="ft-map">
        <p className="ft-map-src">Local SQLite</p>
        <span className="ft-map-trunk" aria-hidden="true" />
        <ul className="ft-map-out">
          <li className="ft-map-branch" data-branch="report">
            <span className="ft-map-reader">Human</span>
            <span className="ft-map-fmt">Markdown</span>
          </li>
          <li className="ft-map-branch" data-branch="export">
            <span className="ft-map-reader">Tools</span>
            <span className="ft-map-fmt">SARIF</span>
          </li>
        </ul>
      </div>

      <div className="ft-readers">
        <div className="ft-proof" hidden={view !== "report"}>
          <div className="ft-proof-head">
            <h3>Report</h3>
            <p>Blunt Code · 1 finding</p>
          </div>
          <p className="ft-legend">
            <span>Legend</span> critical · high · medium · low · note
          </p>
          <div className="ft-proof-item">
            <p className="ft-proof-item-head">
              <span className="ft-sev">note</span>
              <strong>Illustrative entry</strong>
            </p>
            <p className="ft-proof-item-note">
              A placeholder item in the shape of a finding — no code was
              scanned.
            </p>
          </div>
        </div>

        <div className="ft-sarif" hidden={view !== "export"}>
          <pre>
            <code>{SARIF_EXCERPT}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
