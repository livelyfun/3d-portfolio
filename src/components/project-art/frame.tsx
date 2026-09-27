import type { ReactNode } from "react";

export const PALETTE = {
  surface: "#0b0e14",
  panel: "#11151f",
  line: "#1a2030",
  lineBright: "#2a3245",
  text: "#c3cbdb",
  textDim: "#6b7590",
  textBright: "#f2f5fa",
  cyan: "#22d3ee",
  violet: "#a855f7",
  amber: "#fbbf24",
  up: "#34d399",
  down: "#fb7185",
} as const;

/** Deterministic PRNG so every render of a given seed is identical. */
export function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type ArtFrameProps = {
  children: ReactNode;
  /** Label shown in the mock window's title bar. */
  title: string;
  /** Accent used for the glow and the title-bar dot. */
  accent?: string;
  id: string;
};

/**
 * Shared chrome for every project artwork: a mock application window sitting
 * on the portfolio's own surface palette, so the art reads as part of the site
 * rather than as six unrelated illustrations.
 */
export function ArtFrame({ children, title, accent = PALETTE.cyan, id }: ArtFrameProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={PALETTE.violet} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={PALETTE.cyan} />
          <stop offset="100%" stopColor={PALETTE.violet} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect x="8" y="8" width="304" height="184" rx="10" />
        </clipPath>
      </defs>

      <rect x="8" y="8" width="304" height="184" rx="10" fill={`url(#${id}-glow)`} />

      <g clipPath={`url(#${id}-clip)`}>
        {/* window body */}
        <rect x="8" y="8" width="304" height="184" fill={PALETTE.surface} />

        {/* title bar */}
        <rect x="8" y="8" width="304" height="20" fill={PALETTE.panel} />
        <line x1="8" y1="28" x2="312" y2="28" stroke={PALETTE.line} />
        <circle cx="20" cy="18" r="3" fill={PALETTE.down} opacity="0.75" />
        <circle cx="30" cy="18" r="3" fill={PALETTE.amber} opacity="0.75" />
        <circle cx="40" cy="18" r="3" fill={PALETTE.up} opacity="0.75" />
        <text
          x="52"
          y="21.5"
          fill={PALETTE.textDim}
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          {title}
        </text>

        {children}
      </g>

      <rect
        x="8.5"
        y="8.5"
        width="303"
        height="183"
        rx="9.5"
        fill="none"
        stroke={PALETTE.lineBright}
      />
    </svg>
  );
}
