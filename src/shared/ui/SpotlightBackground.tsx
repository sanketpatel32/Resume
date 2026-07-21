"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";

export default function SpotlightBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isHovered) setIsHovered(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Dynamic Cursor Spotlight */}
      {isHovered && (
        <div
          className="absolute w-[600px] h-[600px] rounded-full transition-opacity duration-500 opacity-60"
          style={{
            left: `${mousePosition.x - 300}px`,
            top: `${mousePosition.y - 300}px`,
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(56, 189, 248, 0.03) 45%, transparent 70%)",
          }}
        />
      )}

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Ambient Glow */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl rounded-full"
      />
    </div>
  );
}
