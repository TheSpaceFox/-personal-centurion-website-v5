"use client";

import { useEffect } from "react";

/**
 * Always land at the true top of the homepage on load/reload.
 * Browsers otherwise restore prior scroll and clip the fixed header.
 */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Only force top when there is no in-page hash target.
    if (window.location.hash) return;

    window.scrollTo(0, 0);
  }, []);

  return null;
}
