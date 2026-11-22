import { Fragment } from "react";

interface SplitTextProps {
  text: string;
  /** Split into characters (default) or keep whole words as the animated unit. */
  by?: "chars" | "words";
  className?: string;
}

/**
 * Wraps each word (and optionally each character) in spans for kinetic
 * typography. The visible text content stays identical to `text`, so the
 * heading still reads naturally for search engines and screen readers.
 */
export default function SplitText({ text, by = "chars", className = "" }: SplitTextProps) {
  const words = text.split(" ");
  return (
    <span className={`split ${className}`.trim()}>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span className="split-word">
            {by === "words" ? (
              <span className="split-unit" data-split-unit>
                {word}
              </span>
            ) : (
              Array.from(word).map((char, charIndex) => (
                <span className="split-unit" data-split-unit key={charIndex}>
                  {char}
                </span>
              ))
            )}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
