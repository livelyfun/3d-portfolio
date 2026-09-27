import { ArtFrame, PALETTE } from "./frame";

/** YT Downloader: Electron app with URL input, format choice and live progress. */
export function YtDownloaderArt() {
  return (
    <ArtFrame id="ytdl" title="yt-downloader" accent={PALETTE.up}>
      {/* url input */}
      <rect x="22" y="40" width="220" height="18" rx="4" fill={PALETTE.panel} stroke={PALETTE.line} />
      <text x="32" y="52" fill={PALETTE.textDim} fontSize="7" fontFamily="ui-monospace, monospace">
        https://youtube.com/watch?v=…
      </text>
      <rect x="248" y="40" width="50" height="18" rx="4" fill={PALETTE.cyan} opacity="0.9" />
      <text
        x="273"
        y="52.5"
        fill={PALETTE.surface}
        fontSize="7"
        fontFamily="ui-monospace, monospace"
        textAnchor="middle"
        fontWeight="700"
      >
        Fetch
      </text>

      {/* video info card */}
      <rect x="22" y="66" width="276" height="34" rx="4" fill={PALETTE.panel} stroke={PALETTE.line} />
      <rect x="30" y="72" width="46" height="22" rx="3" fill={PALETTE.line} />
      <path d="M50 78 L50 88 L58 83 Z" fill={PALETTE.textDim} />
      <text x="86" y="80" fill={PALETTE.text} fontSize="7" fontFamily="ui-monospace, monospace">
        how-i-build-a-python-expression-engine
      </text>
      <text x="86" y="91" fill={PALETTE.textDim} fontSize="6.5" fontFamily="ui-monospace, monospace">
        1080p · 14:32 · 1.2M views
      </text>

      {/* format chips */}
      {["video+audio", "video only", "mp3"].map((f, i) => (
        <g key={f}>
          <rect
            x={22 + i * 62}
            y="108"
            width="58"
            height="14"
            rx="3"
            fill={i === 0 ? PALETTE.violet : "transparent"}
            opacity={i === 0 ? 0.2 : 1}
            stroke={i === 0 ? PALETTE.violet : PALETTE.line}
          />
          <text
            x={51 + i * 62}
            y="117.5"
            fill={i === 0 ? PALETTE.violet : PALETTE.textDim}
            fontSize="6"
            fontFamily="ui-monospace, monospace"
            textAnchor="middle"
          >
            {f}
          </text>
        </g>
      ))}

      {/* progress */}
      <text x="22" y="140" fill={PALETTE.textDim} fontSize="6.5" fontFamily="ui-monospace, monospace">
        downloading · 4.2 MB/s
      </text>
      <text
        x="298"
        y="140"
        fill={PALETTE.cyan}
        fontSize="6.5"
        fontFamily="ui-monospace, monospace"
        textAnchor="end"
      >
        62%
      </text>
      <rect x="22" y="146" width="276" height="6" rx="3" fill={PALETTE.line} />
      <rect x="22" y="146" width="171" height="6" rx="3" fill="url(#ytdl-grad)" />
      <defs>
        <linearGradient id="ytdl-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={PALETTE.cyan} />
          <stop offset="100%" stopColor={PALETTE.violet} />
        </linearGradient>
      </defs>
      <text x="22" y="166" fill={PALETTE.textDim} fontSize="6.5" fontFamily="ui-monospace, monospace">
        eta 00:18 · 38.4 / 62.0 MB
      </text>

      {/* dependency check */}
      <g>
        <circle cx="264" cy="170" r="2.5" fill={PALETTE.up} />
        <text
          x="272"
          y="172.5"
          fill={PALETTE.textDim}
          fontSize="6"
          fontFamily="ui-monospace, monospace"
        >
          ffmpeg ok
        </text>
      </g>
      <g>
        <circle cx="228" cy="170" r="2.5" fill={PALETTE.up} />
        <text
          x="236"
          y="172.5"
          fill={PALETTE.textDim}
          fontSize="6"
          fontFamily="ui-monospace, monospace"
        >
          yt-dlp ok
        </text>
      </g>
    </ArtFrame>
  );
}
