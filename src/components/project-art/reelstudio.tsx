import { ArtFrame, PALETTE } from "./frame";

/** AI Reel Studio: prompt in, vertical reel out, with a generation timeline. */
export function ReelStudioArt() {
  return (
    <ArtFrame id="reel" title="ai-reel-studio" accent={PALETTE.violet}>
      {/* left: prompt panel */}
      <text x="24" y="46" fill={PALETTE.textDim} fontSize="6.5" fontFamily="ui-monospace, monospace">
        PROMPT
      </text>
      <rect x="22" y="52" width="150" height="52" rx="4" fill={PALETTE.panel} stroke={PALETTE.line} />
      <text x="30" y="66" fill={PALETTE.text} fontSize="7" fontFamily="ui-monospace, monospace">
        A neon-lit Tokyo alley at
      </text>
      <text x="30" y="78" fill={PALETTE.text} fontSize="7" fontFamily="ui-monospace, monospace">
        night, slow dolly in,
      </text>
      <text x="30" y="90" fill={PALETTE.textDim} fontSize="7" fontFamily="ui-monospace, monospace">
        lo-fi beat, captions on.
      </text>

      {/* generate button */}
      <rect x="22" y="112" width="150" height="16" rx="4" fill={PALETTE.violet} opacity="0.9" />
      <text
        x="97"
        y="123.5"
        fill={PALETTE.surface}
        fontSize="7.5"
        fontFamily="ui-monospace, monospace"
        textAnchor="middle"
        fontWeight="700"
      >
        Generate reel
      </text>

      {/* generation stages */}
      {["storyboard", "visuals", "voiceover", "captions"].map((s, i) => (
        <g key={s}>
          <circle
            cx="27"
            cy={141 + i * 11}
            r="2.5"
            fill={i < 3 ? PALETTE.up : PALETTE.lineBright}
            opacity={i < 3 ? 0.95 : 1}
          />
          <text
            x="35"
            y={143.5 + i * 11}
            fill={i < 3 ? PALETTE.text : PALETTE.textDim}
            fontSize="6.5"
            fontFamily="ui-monospace, monospace"
          >
            {s}
          </text>
          {i < 3 ? (
            <line
              x1="27"
              y1={144 + i * 11}
              x2="27"
              y2={149 + i * 11}
              stroke={PALETTE.lineBright}
            />
          ) : null}
        </g>
      ))}

      {/* right: 9:16 reel preview */}
      <rect
        x="196"
        y="38"
        width="52"
        height="93"
        rx="4"
        fill="#0d111b"
        stroke={PALETTE.lineBright}
      />
      <rect x="199" y="41" width="46" height="60" fill="url(#reel-scene)" />
      <defs>
        <linearGradient id="reel-scene" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PALETTE.violet} stopOpacity="0.55" />
          <stop offset="60%" stopColor={PALETTE.cyan} stopOpacity="0.28" />
          <stop offset="100%" stopColor={PALETTE.surface} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* play glyph */}
      <path d="M218 66 L218 80 L230 73 Z" fill={PALETTE.textBright} opacity="0.92" />
      {/* caption bars */}
      <rect x="205" y="85" width="34" height="4" rx="2" fill={PALETTE.textBright} opacity="0.85" />
      <rect x="211" y="92" width="22" height="4" rx="2" fill={PALETTE.textBright} opacity="0.5" />
      {/* scrubber */}
      <rect x="199" y="107" width="46" height="2" rx="1" fill={PALETTE.line} />
      <rect x="199" y="107" width="28" height="2" rx="1" fill={PALETTE.cyan} />
      <circle cx="227" cy="108" r="2.5" fill={PALETTE.cyan} />
      <text
        x="222"
        y="121"
        fill={PALETTE.textDim}
        fontSize="6"
        fontFamily="ui-monospace, monospace"
        textAnchor="middle"
      >
        0:15
      </text>

      {/* export format chips */}
      {["Reels", "Shorts", "TikTok"].map((f, i) => (
        <g key={f}>
          <rect
            x={196 + i * 38}
            y={140}
            width="34"
            height="13"
            rx="3"
            fill="none"
            stroke={i === 0 ? PALETTE.cyan : PALETTE.line}
          />
          <text
            x={213 + i * 38}
            y="149"
            fill={i === 0 ? PALETTE.cyan : PALETTE.textDim}
            fontSize="6.5"
            fontFamily="ui-monospace, monospace"
            textAnchor="middle"
          >
            {f}
          </text>
        </g>
      ))}
      <text
        x="222"
        y="168"
        fill={PALETTE.textDim}
        fontSize="6.5"
        fontFamily="ui-monospace, monospace"
        textAnchor="middle"
      >
        Gemini · metadata ready
      </text>
    </ArtFrame>
  );
}
