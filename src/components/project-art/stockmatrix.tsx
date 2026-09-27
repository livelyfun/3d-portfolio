import { ArtFrame, PALETTE, seeded } from "./frame";

/**
 * StockMatrix: candlestick chart with a live price line and volume bars.
 * The candles are generated from a fixed seed so the chart is stable across
 * server and client renders.
 */
export function StockMatrixArt() {
  const rand = seeded(7311);
  const candles = Array.from({ length: 16 }, () => {
    const up = rand() > 0.42;
    const body = 8 + rand() * 26;
    return { up, body, wick: 4 + rand() * 8, volume: 6 + rand() * 16 };
  });

  let cursor = 96;
  const bars = candles.map((c) => {
    const x = 30 + candles.indexOf(c) * 16;
    const top = c.up ? cursor - c.body : cursor;
    cursor = c.up ? cursor - c.body - 2 : cursor + c.body + 2;
    return { ...c, x, top };
  });

  return (
    <ArtFrame id="sm" title="stockmatrix — live" accent={PALETTE.up}>
      {/* exchange tabs */}
      {["NASDAQ", "NYSE", "NSE", "LSE"].map((label, i) => (
        <g key={label}>
          <rect
            x={22 + i * 46}
            y={36}
            width={40}
            height={13}
            rx={3}
            fill={i === 0 ? PALETTE.cyan : "transparent"}
            opacity={i === 0 ? 0.16 : 1}
            stroke={i === 0 ? PALETTE.cyan : PALETTE.line}
          />
          <text
            x={30 + i * 46}
            y={45.5}
            fill={i === 0 ? PALETTE.cyan : PALETTE.textDim}
            fontSize="6.5"
            fontFamily="ui-monospace, monospace"
          >
            {label}
          </text>
        </g>
      ))}

      {/* price readout */}
      <text
        x="234"
        y="46"
        fill={PALETTE.textBright}
        fontSize="11"
        fontFamily="ui-monospace, monospace"
        fontWeight="600"
      >
        184.26
      </text>
      <text x="234" y="56" fill={PALETTE.up} fontSize="7" fontFamily="ui-monospace, monospace">
        ▲ 2.41%
      </text>

      {/* gridlines */}
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1="20"
          y1={64 + i * 24}
          x2="300"
          y2={64 + i * 24}
          stroke={PALETTE.line}
          strokeDasharray="2 3"
        />
      ))}

      {/* candles */}
      {bars.map((b, i) => {
        const color = b.up ? PALETTE.up : PALETTE.down;
        const mid = b.top + b.body / 2;
        return (
          <g key={i}>
            <line
              x1={b.x + 4}
              y1={mid - b.body / 2 - b.wick}
              x2={b.x + 4}
              y2={mid + b.body / 2 + b.wick}
              stroke={color}
              strokeWidth="1"
              opacity="0.6"
            />
            <rect x={b.x} y={b.top} width="8" height={b.body} rx="1" fill={color} opacity="0.85" />
            <rect
              x={b.x}
              y={172 - b.volume}
              width="8"
              height={b.volume}
              rx="1"
              fill={color}
              opacity="0.3"
            />
          </g>
        );
      })}

      {/* timeframe pills */}
      {["1D", "5D", "1M", "1Y"].map((t, i) => (
        <text
          key={t}
          x={30 + i * 20}
          y="188"
          fill={i === 2 ? PALETTE.cyan : PALETTE.textDim}
          fontSize="7"
          fontFamily="ui-monospace, monospace"
        >
          {t}
        </text>
      ))}

      {/* websocket status dot */}
      <circle cx="296" cy="184" r="3" fill={PALETTE.up} opacity="0.9" />
    </ArtFrame>
  );
}
