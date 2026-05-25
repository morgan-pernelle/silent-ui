import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Instant jump — used after route changes (not hash navigation). */
function scrollToInstant(top = 0) {
  const root = document.documentElement;
  root.dataset.scrollInstant = "true";
  window.scrollTo({ top, left: 0, behavior: "instant" });
  requestAnimationFrame(() => {
    delete root.dataset.scrollInstant;
  });
}

/**
 * Scroll to top on route changes (instant). Hash links scroll smoothly to their target.
 */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const smooth = !prefersReducedMotion();

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({
            block: "start",
            behavior: smooth ? "smooth" : "auto",
          });
          return;
        }
        scrollToInstant(0);
      });
      return;
    }

    scrollToInstant(0);
  }, [pathname, hash, key]);

  return null;
}
