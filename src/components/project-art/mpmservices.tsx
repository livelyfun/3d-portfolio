import { ArtFrame, PALETTE } from "./frame";

/** MPM Services: a marketing site layout, no framework, custom tokens. */
export function MpmServicesArt() {
  return (
    <ArtFrame id="mpm" title="mpmservices.com.au" accent={PALETTE.amber}>
      {/* site header */}
      <rect x="22" y="36" width="276" height="16" fill={PALETTE.panel} />
      <rect x="30" y="41" width="20" height="6" rx="1" fill={PALETTE.textBright} opacity="0.85" />
      {["Services", "Areas", "About", "Contact"].map((n, i) => (
        <text
          key={n}
          x={168 + i * 32}
          y="46.5"
          fill={PALETTE.textDim}
          fontSize="6"
          fontFamily="ui-monospace, monospace"
        >
          {n}
        </text>
      ))}

      {/* hero split: copy left, image block right */}
      <rect x="22" y="56" width="150" height="44" fill={PALETTE.panel} opacity="0.6" />
      <rect x="30" y="64" width="86" height="6" rx="2" fill={PALETTE.textBright} opacity="0.9" />
      <rect x="30" y="76" width="120" height="4" rx="2" fill={PALETTE.textDim} opacity="0.7" />
      <rect x="30" y="84" width="104" height="4" rx="2" fill={PALETTE.textDim} opacity="0.5" />
      <rect x="30" y="94" width="34" height="0" fill="none" />

      <rect x="178" y="56" width="120" height="44" fill="url(#mpm-img)" />
      <defs>
        <linearGradient id="mpm-img" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PALETTE.cyan} stopOpacity="0.3" />
          <stop offset="100%" stopColor={PALETTE.violet} stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* service cards */}
      {["Steam clean", "Strip & polish", "Maintenance"].map((s, i) => (
        <g key={s}>
          <rect x={22 + i * 93} y="110" width="85" height="42" rx="3" fill={PALETTE.panel} stroke={PALETTE.line} />
          <rect
            x={30 + i * 93}
            y="118"
            width="10"
            height="10"
            rx="2"
            fill={[PALETTE.cyan, PALETTE.violet, PALETTE.amber][i]}
            opacity="0.85"
          />
          <rect
            x={30 + i * 93}
            y="134"
            width="60"
            height="4"
            rx="2"
            fill={PALETTE.text}
            opacity="0.8"
          />
          <rect
            x={30 + i * 93}
            y="142"
            width="46"
            height="3"
            rx="1.5"
            fill={PALETTE.textDim}
            opacity="0.5"
          />
        </g>
      ))}

      {/* footer strip */}
      <rect x="22" y="160" width="276" height="18" fill={PALETTE.panel} opacity="0.7" />
      <text
        x="32"
        y="172"
        fill={PALETTE.textDim}
        fontSize="6"
        fontFamily="ui-monospace, monospace"
      >
        +61 451 460 307
      </text>
      <text
        x="288"
        y="172"
        fill={PALETTE.amber}
        fontSize="6"
        fontFamily="ui-monospace, monospace"
        textAnchor="end"
      >
        Melbourne, VIC
      </text>
    </ArtFrame>
  );
}
