"use client";

import dynamic from "next/dynamic";
import { useScroll, useSpring } from "motion/react";
import { useSceneGate } from "./use-scene-gate";

/**
 * Fixed background layer that hosts the WebGL scene.
 *
 * Loaded with ssr:false so three.js never blocks or pollutes the prerendered
 * HTML. Purely decorative: hidden from assistive tech and from pointer events,
 * so every interactive element on the page stays reachable.
 */
const SceneCanvas = dynamic(() => import("./scene-canvas"), { ssr: false });

export function BackgroundScene() {
  const { allowed, pageVisible } = useSceneGate();
  const { scrollYProgress } = useScroll();
  // spring-smoothed so flicks and trackpad jumps do not jolt the camera
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      /* the static gradient is always painted, so the fallback costs nothing */
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(34,211,238,0.13),transparent_60%),radial-gradient(ellipse_60%_45%_at_85%_10%,rgba(168,85,247,0.12),transparent_60%),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(251,191,36,0.06),transparent_60%)]" />
      <div className="grid-bg absolute inset-0 opacity-60" />
      {allowed ? (
        <div className="absolute inset-0">
          <SceneCanvas progress={progress} active={pageVisible} />
        </div>
      ) : null}
      {/* keeps text legible over the scene without dimming the whole page */}
      <div className="absolute inset-0 bg-ink-950/45" />
    </div>
  );
}
