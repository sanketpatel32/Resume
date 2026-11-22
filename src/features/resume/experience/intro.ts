const INTRO_EVENT = "descent:intro-done";
const SESSION_KEY = "sp-descent-intro";

let introDone = false;

export function finishIntro() {
  if (introDone) return;
  introDone = true;
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Private browsing can block storage; the intro simply plays again next time.
  }
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export function isIntroDone() {
  return introDone;
}

/** Runs `callback` once the intro has finished, immediately if it already has. */
export function afterIntro(callback: () => void): () => void {
  if (introDone) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(INTRO_EVENT, handler, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, handler);
}

/**
 * Inline, pre-hydration script: skip the intro for returning visitors in the
 * same session and for anyone who prefers reduced motion.
 */
export const introSkipScript = `try{if(sessionStorage.getItem("${SESSION_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.intro="skip"}}catch(e){}`;
