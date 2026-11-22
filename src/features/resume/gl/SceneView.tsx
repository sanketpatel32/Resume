"use client";

import { Suspense, useRef } from "react";
import { PerspectiveCamera, View } from "@react-three/drei";
import type { StoryScene } from "@/features/resume/model/types";
import { CAMERA_DISTANCE, CAMERA_FOV } from "./tracking";
import CoreScene from "./scenes/CoreScene";
import PipelineScene from "./scenes/PipelineScene";
import ScreenScene from "./scenes/ScreenScene";
import TilesScene from "./scenes/TilesScene";
import VoiceScene from "./scenes/VoiceScene";
import { palette } from "./palette";

export type SceneRequest =
  | { kind: "scene"; scene: StoryScene }
  | { kind: "image"; src: string; accent: string }
  | { kind: "core" };

function SceneContent({ request, track }: { request: SceneRequest; track: React.RefObject<HTMLElement | null> }) {
  switch (request.kind) {
    case "image":
      return <ScreenScene src={request.src} accent={request.accent} background={palette.graphite} track={track} />;
    case "core":
      return <CoreScene track={track} />;
    case "scene":
      switch (request.scene) {
        case "pipeline":
          return <PipelineScene track={track} />;
        case "voice":
          return <VoiceScene track={track} />;
        case "tiles":
          return <TilesScene track={track} />;
        default: {
          const unreachable: never = request.scene;
          return unreachable;
        }
      }
    default: {
      const unreachable: never = request;
      return unreachable;
    }
  }
}

/** A DOM-tracked viewport into the shared WebGL canvas. */
export default function SceneView({ request, className }: { request: SceneRequest; className?: string }) {
  const track = useRef<HTMLElement>(null);
  return (
    <View ref={track} className={className} index={2}>
      <PerspectiveCamera makeDefault fov={CAMERA_FOV} position={[0, 0, CAMERA_DISTANCE]} />
      <Suspense fallback={null}>
        <SceneContent request={request} track={track} />
      </Suspense>
    </View>
  );
}
