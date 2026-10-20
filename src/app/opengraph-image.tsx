import { ImageResponse } from "next/og";

// Route segment config
export const alt = "Baruch Yankovitz — Full Stack Developer & AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamically-generated social share image (used for OpenGraph + Twitter).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#05060a",
          backgroundImage:
            "linear-gradient(120deg, rgba(0,212,255,0.16), rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(168,85,247,0.16))",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#00d4ff",
            fontWeight: 600,
          }}
        >
          Tel Aviv · Available for hire
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 28,
          }}
        >
          Baruch Yankovitz
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#a0a0a0",
            marginTop: 20,
          }}
        >
          Full Stack Developer · AI Builder
        </div>

        {/* Accent underline */}
        <div
          style={{
            display: "flex",
            width: 280,
            height: 8,
            borderRadius: 4,
            marginTop: 40,
            backgroundImage: "linear-gradient(90deg, #00d4ff, #a855f7)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#666666",
            marginTop: 40,
          }}
        >
          React · Next.js · Node.js · TypeScript · Python · Multi-Agent AI
        </div>
      </div>
    ),
    { ...size }
  );
}
