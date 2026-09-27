import { ArtFrame, PALETTE } from "./frame";

/** Smart File Organizer: a shell session filing Downloads into categories. */
export function OrganizerArt() {
  const files = [
    { name: "invoice.pdf", kind: "pdf" },
    { name: "clip.mp4", kind: "vid" },
    { name: "avatar.png", kind: "img" },
    { name: "main.py", kind: "code" },
    { name: "bundle.zip", kind: "zip" },
  ];

  const folders = [
    { label: "Documents", color: PALETTE.cyan },
    { label: "Videos", color: PALETTE.violet },
    { label: "Images", color: PALETTE.amber },
    { label: "Code", color: PALETTE.up },
    { label: "Archives", color: PALETTE.textDim },
  ];

  return (
    <ArtFrame id="org" title="~/Downloads — smart-organizer" accent={PALETTE.amber}>
      {/* terminal prompt lines */}
      <text x="22" y="48" fill={PALETTE.up} fontSize="7.5" fontFamily="ui-monospace, monospace">
        $
      </text>
      <text x="31" y="48" fill={PALETTE.text} fontSize="7.5" fontFamily="ui-monospace, monospace">
        smart-organizer --watch ~/Downloads
      </text>
      <text x="22" y="61" fill={PALETTE.textDim} fontSize="7" fontFamily="ui-monospace, monospace">
        watching for completed files…
      </text>

      {/* inbox of loose files */}
      <text x="22" y="79" fill={PALETTE.textDim} fontSize="6" fontFamily="ui-monospace, monospace">
        INBOX ({files.length})
      </text>
      {files.map((f, i) => (
        <g key={f.name}>
          <rect x="22" y={84 + i * 13} width="104" height="11" rx="2" fill={PALETTE.panel} />
          <rect
            x="25"
            y={87 + i * 13}
            width="3"
            height="5"
            fill={folders[i].color}
            opacity="0.9"
          />
          <text
            x="33"
            y={92.5 + i * 13}
            fill={PALETTE.text}
            fontSize="6"
            fontFamily="ui-monospace, monospace"
          >
            {f.name}
          </text>
        </g>
      ))}

      {/* routing arrows */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M130 89.5 C 148 89.5, 148 ${73 + i * 16}, 166 ${73 + i * 16}`}
          fill="none"
          stroke={folders[i].color}
          strokeWidth="1"
          opacity="0.45"
          strokeDasharray="2 2"
        />
      ))}

      {/* destination folders */}
      <text x="170" y="79" fill={PALETTE.textDim} fontSize="6" fontFamily="ui-monospace, monospace">
        ORGANISED
      </text>
      {folders.map((f, i) => (
        <g key={f.label}>
          <path
            d={`M170 ${72 + i * 16} l4 4 h12 l3 3 v7 a1.5 1.5 0 0 1 -1.5 1.5 h-16 a1.5 1.5 0 0 1 -1.5 -1.5 z`}
            fill={PALETTE.panel}
            stroke={PALETTE.lineBright}
          />
          <rect
            x="172"
            y={75.5 + i * 16}
            width="2"
            height="9"
            fill={f.color}
            opacity="0.85"
          />
          <text
            x="192"
            y={81 + i * 16}
            fill={PALETTE.text}
            fontSize="6.5"
            fontFamily="ui-monospace, monospace"
          >
            {f.label}
          </text>
        </g>
      ))}

      {/* install / verification footer */}
      <line x1="22" y1="163" x2="298" y2="163" stroke={PALETTE.line} />
      <circle cx="27" cy="173" r="2.5" fill={PALETTE.up} />
      <text
        x="35"
        y="175.5"
        fill={PALETTE.textDim}
        fontSize="6.5"
        fontFamily="ui-monospace, monospace"
      >
        sha256 verified · linux / macos / windows
      </text>
    </ArtFrame>
  );
}
