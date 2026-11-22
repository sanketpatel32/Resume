"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import Backdrop from "./Backdrop";

function markReady() {
  document.documentElement.classList.add("gl-ready");
}

export default function GLStage() {
  const [lite] = useState(() => window.matchMedia("(max-width: 899px), (pointer: coarse)").matches);

  useEffect(() => () => document.documentElement.classList.remove("gl-ready"), []);

  return (
    <div className="gl-stage" aria-hidden="true">
      <Canvas
        flat
        dpr={lite ? [1, 1.25] : [1, 1.75]}
        gl={{ antialias: !lite, alpha: false, powerPreference: "high-performance", stencil: false }}
        camera={{ position: [0, 0, 5], fov: 35 }}
        onCreated={markReady}
        style={{ pointerEvents: "none" }}
      >
        <Backdrop lite={lite} />
        <View.Port />
      </Canvas>
    </div>
  );
}
