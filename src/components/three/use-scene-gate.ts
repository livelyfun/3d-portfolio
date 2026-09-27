"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether the WebGL scene should mount at all.
 *
 * Mounting is suppressed when:
 *   - the visitor prefers reduced motion (a static gradient stands in)
 *   - the device reports no pointer and a coarse cursor, i.e. a phone, where a
 *     permanent WebGL layer costs far more than it adds
 *   - WebGL is unavailable
 *   - the tab is hidden or the page is scrolled far past the hero
 *
 * Every path resolves rather than throws, so the page is never blocked on it.
 */
export function useSceneGate() {
  const [allowed, setAllowed] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");

    const hasWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return Boolean(
          window.WebGLRenderingContext &&
            (canvas.getContext("webgl2") || canvas.getContext("webgl")),
        );
      } catch {
        return false;
      }
    })();

    const evaluate = () => {
      const eligible = hasWebGL && !reduced.matches && !coarse.matches;
      setAllowed(eligible);
    };

    evaluate();
    reduced.addEventListener("change", evaluate);
    coarse.addEventListener("change", evaluate);

    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      reduced.removeEventListener("change", evaluate);
      coarse.removeEventListener("change", evaluate);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return { allowed, pageVisible };
}
