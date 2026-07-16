"use client";

import { useEffect } from "react";

/**
 * Land at the true top of the homepage on load/reload.
 * Empty `#` is treated as no target (same as bare `/`).
 */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    // `#adrian` etc. keep their target; bare `#` or no hash → top.
    if (hash.length > 1) return;

    const toTop = () => window.scrollTo(0, 0);
    toTop();
    // Beat late layout / scrollRestoration races after paint.
    requestAnimationFrame(toTop);
    const t = window.setTimeout(toTop, 0);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
