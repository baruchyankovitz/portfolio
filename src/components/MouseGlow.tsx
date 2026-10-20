"use client";

import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[5] hidden md:block"
      style={{
        left: pos.x - 250,
        top: pos.y - 250,
        width: 500,
        height: 500,
        background:
          "radial-gradient(circle, rgba(0,212,255,0.03) 0%, rgba(0,212,255,0.015) 40%, transparent 70%)",
        borderRadius: "50%",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    />
  );
}
