"use client";

import { useState, useSyncExternalStore } from "react";

/**
 * System Design Quest specimen — lesson 17, "A nightly scan meets the
 * cache", run as one practice card. Content is the real authored lesson;
 * the pick → outcome → rationale → try-again flow mirrors the app's
 * predict block. No score, no XP, nothing persisted.
 * Server render shows the prompt and the three choices as plain text;
 * they become buttons once mounted so no dead control ships without JS.
 */

const PROMPT =
  "A product cache holds a stable set of best-sellers. Each night a batch job reads every product once. Which eviction policy keeps the best-sellers cached?";

const CHOICES = [
  {
    id: "lfu",
    label: "LFU (least frequently used)",
    feedback:
      "Right: one read per product cannot outrank items read thousands of times.",
  },
  {
    id: "lru",
    label: "LRU (least recently used)",
    feedback:
      "The scan makes every product “recently used” and pushes the best-sellers out.",
  },
  {
    id: "ttl",
    label: "TTL only",
    feedback:
      "TTL removes items by age; it does not protect hot items from a scan.",
  },
];

const CORRECT_ID = "lfu";

const REVEAL =
  "One-pass scans pollute LRU. LFU (Redis implements an approximate LFU with decay) keeps a stable hot set. Another fix is to have batch jobs bypass the cache.";

const emptySubscribe = () => () => {};

export default function SdqCard() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [picked, setPicked] = useState<string | null>(null);

  const choice = CHOICES.find((c) => c.id === picked);
  const right = picked === CORRECT_ID;

  return (
    <div className="ft-card">
      <p className="ft-card-prompt">{PROMPT}</p>

      {mounted ? (
        <>
          <div
            className="ft-card-choices"
            role="group"
            aria-label="Make a prediction"
          >
            {CHOICES.map((c) => {
              const state =
                picked === null
                  ? "idle"
                  : c.id === CORRECT_ID
                    ? "right"
                    : c.id === picked
                      ? "wrong"
                      : "idle";
              return (
                <button
                  key={c.id}
                  type="button"
                  disabled={picked !== null}
                  aria-pressed={picked === c.id}
                  data-state={state}
                  onClick={() => setPicked(c.id)}
                >
                  {c.label}
                  {picked !== null && c.id === CORRECT_ID && (
                    <span className="ft-card-tag"> — keeps the cache</span>
                  )}
                  {picked !== null && c.id === picked && !right && (
                    <span className="ft-card-tag"> — your pick</span>
                  )}
                </button>
              );
            })}
          </div>

          {choice && (
            <div className="ft-card-outcome" aria-live="polite">
              <p className="ft-card-verdict">
                {right ? "Yes. " : "Not quite. "}
                {choice.feedback}
              </p>
              <p className="ft-card-why">
                <strong>Why.</strong> {REVEAL}
              </p>
              <button
                type="button"
                className="ft-card-again"
                onClick={() => setPicked(null)}
              >
                Try again
              </button>
            </div>
          )}
        </>
      ) : (
        <ul className="ft-card-static">
          {CHOICES.map((c) => (
            <li key={c.id}>{c.label}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
