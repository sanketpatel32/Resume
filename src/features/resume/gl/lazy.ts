"use client";

import dynamic from "next/dynamic";

// One dynamic entry for the whole WebGL runtime, so three.js is downloaded once and never during SSR.
const loadRuntime = () => import("./runtime");

export const LazyGLStage = dynamic(() => loadRuntime().then((runtime) => runtime.GLStage), { ssr: false });
export const LazySceneView = dynamic(() => loadRuntime().then((runtime) => runtime.SceneView), { ssr: false });
