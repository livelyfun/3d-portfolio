import { ArtFrame, PALETTE } from "./frame";

/** Kira Calculator: PySide6 app with a display, mode tabs and a keypad. */
export function KiraArt() {
  const keys = [
    "sin", "cos", "tan", "log", "ln",
    "(", ")", "x²", "√", "π",
    "7", "8", "9", "÷", "AC",
    "4", "5", "6", "×", "%",
    "1", "2", "3", "−", "e",
    "0", ".", "±", "+", "=",
  ];

  return (
    <ArtFrame id="kira" title="kira-calculator" accent={PALETTE.cyan}>
      {/* mode bar: calculator / converter / programmer */}
      {["calculator", "converter", "programmer"].map((m, i) => (
        <g key={m}>
          <rect
            x={22 + i * 58}
            y={36}
            width={54}
            height={12}
            rx={3}
            fill={i === 0 ? PALETTE.cyan : "transparent"}
            opacity={i === 0 ? 0.15 : 1}
          />
          <text
            x={28 + i * 58}
            y={45}
            fill={i === 0 ? PALETTE.cyan : PALETTE.textDim}
            fontSize="6.5"
            fontFamily="ui-monospace, monospace"
          >
            {m}
          </text>
        </g>
      ))}

      {/* display */}
      <rect x="22" y="54" width="276" height="30" rx="4" fill={PALETTE.panel} stroke={PALETTE.line} />
      <text
        x="292"
        y="74"
        fill={PALETTE.textBright}
        fontSize="16"
        fontFamily="ui-monospace, monospace"
        textAnchor="end"
        fontWeight="600"
      >
        1024π
      </text>
      <text x="30" y="67" fill={PALETTE.textDim} fontSize="6" fontFamily="ui-monospace, monospace">
        sin(3.14) + 2^10 ÷ √64
      </text>

      {/* keypad */}
      {keys.map((k, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 22 + col * 56;
        const y = 92 + row * 18;
        const isOperator = [3, 4].includes(col) && row > 0;
        const isDigit = /[0-9.]/.test(k);
        return (
          <g key={`${k}-${i}`}>
            <rect
              x={x}
              y={y}
              width={52}
              height={15}
              rx={3}
              fill={k === "=" ? PALETTE.cyan : isDigit ? PALETTE.panel : PALETTE.line}
              opacity={k === "=" ? 0.9 : 1}
            />
            <text
              x={x + 26}
              y={y + 10.5}
              fill={k === "=" ? PALETTE.surface : isOperator ? PALETTE.violet : PALETTE.text}
              fontSize="7.5"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
              fontWeight={k === "=" ? 700 : 400}
            >
              {k}
            </text>
          </g>
        );
      })}

      {/* pytest badge */}
      <rect x="228" y="36" width="70" height="12" rx="3" fill={PALETTE.up} opacity="0.12" />
      <text
        x="263"
        y="45"
        fill={PALETTE.up}
        fontSize="6.5"
        fontFamily="ui-monospace, monospace"
        textAnchor="middle"
      >
        pytest 42 passed
      </text>
    </ArtFrame>
  );
}
