import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamic = "force-static";

/**
 * Rendered at build time with Satori. Kept to ASCII plus basic latin-1 so the
 * bundled default font never has to fall back or fetch at build.
 */
export default async function OpengraphImage() {
  const top = projects.slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#05060a",
          backgroundImage:
            "radial-gradient(900px 480px at 12% -10%, rgba(34,211,238,0.22), transparent 60%), radial-gradient(800px 460px at 92% 8%, rgba(168,85,247,0.20), transparent 60%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 14,
              border: "1px solid rgba(34,211,238,0.4)",
              backgroundColor: "rgba(34,211,238,0.12)",
              color: "#22d3ee",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            MK
          </div>
          <div style={{ display: "flex", color: "#c3cbdb", fontSize: 22 }}>
            mithlesh.dev
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#6b7590",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            BIRATNAGAR, NEPAL
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              color: "#f2f5fa",
              fontSize: 74,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Mithlesh Kumar Das
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              color: "#22d3ee",
              fontSize: 30,
              letterSpacing: 1,
            }}
          >
            Backend and Full-Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              color: "#c3cbdb",
              fontSize: 24,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Python, React, Next.js, REST and GraphQL APIs, Firebase, Docker and CI/CD.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {top.map((project) => (
            <div
              key={project.repo}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid #1a2030",
                backgroundColor: "#0b0e14",
                color: "#c3cbdb",
                fontSize: 20,
              }}
            >
              {project.name}
            </div>
          ))}
          <div style={{ display: "flex", color: "#6b7590", fontSize: 20 }}>
            github.com/livelyfun
          </div>
        </div>
      </div>
    ),
    size,
  );
}
