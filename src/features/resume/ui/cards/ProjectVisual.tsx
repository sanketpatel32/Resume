"use client";

import Image from "next/image";
import type { StoryVisual } from "@/features/resume/model/types";
import { useExperience } from "@/features/resume/experience/context";
import { LazySceneView as SceneView } from "@/features/resume/gl/lazy";

interface ProjectVisualProps {
  visual: StoryVisual;
  accent: string;
  title: string;
}

export default function ProjectVisual({ visual, accent, title }: ProjectVisualProps) {
  const { gl } = useExperience();

  return (
    <figure className="cs-visual" data-cursor={visual.kind === "scene" ? "Play" : "Look"}>
      <div className="cs-visual-frame">
        {visual.kind === "image" ? (
          <Image
            className="cs-fallback"
            data-gl-fallback
            src={visual.src}
            alt={visual.alt}
            width={1600}
            height={1000}
            sizes="(min-width: 900px) 60vw, 100vw"
          />
        ) : (
          <div className={`cs-fallback cs-art cs-art-${visual.scene}`} data-gl-fallback role="img" aria-label={`Illustration for ${title}`}>
            <span />
            <span />
            <span />
          </div>
        )}
        {gl && (
          <SceneView
            className="cs-gl"
            request={visual.kind === "image" ? { kind: "image", src: visual.src, accent } : { kind: "scene", scene: visual.scene }}
          />
        )}
        <span className="cs-visual-corner" aria-hidden="true" />
      </div>
      <figcaption>{visual.caption}</figcaption>
    </figure>
  );
}
