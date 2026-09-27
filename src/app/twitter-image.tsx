import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} on GitHub`;
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export const dynamic = "force-static";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          padding: "56px 68px",
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(760px 420px at 20% 0%, rgba(34,211,238,0.20), transparent 60%), radial-gradient(700px 400px at 90% 100%, rgba(168,85,247,0.18), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#6b7590", fontSize: 22, letterSpacing: 4 }}>
          BACKEND / FULL-STACK
        </div>
        <div style={{ display: "flex", color: "#f2f5fa", fontSize: 66, fontWeight: 700, letterSpacing: -2 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", color: "#c3cbdb", fontSize: 26 }}>
          {site.location.city}, {site.location.country}
        </div>
        <div style={{ display: "flex", color: "#22d3ee", fontSize: 24 }}>
          github.com/livelyfun
        </div>
      </div>
    ),
    size,
  );
}
