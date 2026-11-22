"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2 } from "three";
import { settleVelocity, signals, type Tone } from "@/features/resume/experience/signals";
import { palette, rawColor } from "./palette";
import { strataFragment, strataVertex } from "./shaders/strata";

const STRATA_TRAVEL = 15;

const intensityByTone: Record<Tone, number> = {
  surface: 0.5,
  work: 0.42,
  core: 0.95,
};

interface Stage {
  scene: Scene;
  camera: OrthographicCamera;
  material: ShaderMaterial;
  geometry: PlaneGeometry;
}

function damp(current: number, target: number, lambda: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

function createStage(lite: boolean): Stage {
  const material = new ShaderMaterial({
    vertexShader: strataVertex,
    fragmentShader: strataFragment,
    defines: { STRATA: lite ? 5 : 7, OCTAVES: lite ? 3 : 4 },
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uRes: { value: new Vector2(1, 1) },
      uDepth: { value: 0.35 },
      uMouse: { value: new Vector2(0, 0) },
      uVel: { value: 0 },
      uIntensity: { value: 0 },
      uCore: { value: 0 },
      uBg: { value: rawColor(palette.graphite) },
      uC0: { value: rawColor(palette.citron) },
      uC1: { value: rawColor(palette.cornflower) },
      uC2: { value: rawColor(palette.coral) },
    },
  });
  const geometry = new PlaneGeometry(2, 2);
  const scene = new Scene();
  scene.add(new Mesh(geometry, material));
  return { scene, camera: new OrthographicCamera(-1, 1, 1, -1, 0, 1), material, geometry };
}

/** The strata the visitor falls through, drawn full screen behind every other view. */
export default function Backdrop({ lite }: { lite: boolean }) {
  const stage = useRef<Stage | null>(null);

  useEffect(() => {
    const created = createStage(lite);
    stage.current = created;
    return () => {
      stage.current = null;
      created.material.dispose();
      created.geometry.dispose();
    };
  }, [lite]);

  useFrame((state, delta) => {
    const current = stage.current;
    if (!current) return;
    const { gl, size } = state;
    const u = current.material.uniforms;
    const dt = Math.min(delta, 0.05);
    const pixelRatio = gl.getPixelRatio();

    u.uTime.value += dt;
    u.uRes.value.set(size.width * pixelRatio, size.height * pixelRatio);
    u.uDepth.value = damp(u.uDepth.value, 0.35 + signals.scroll.progress * STRATA_TRAVEL, 4, dt);
    u.uMouse.value.x = damp(u.uMouse.value.x, signals.pointer.nx, 3, dt);
    u.uMouse.value.y = damp(u.uMouse.value.y, signals.pointer.ny, 3, dt);
    u.uVel.value = damp(u.uVel.value, Math.min(1, Math.abs(signals.scroll.velocity) / 3), 6, dt);
    u.uIntensity.value = damp(u.uIntensity.value, intensityByTone[signals.tone], 2.5, dt);
    u.uCore.value = damp(u.uCore.value, signals.coreGlow, 2, dt);
    settleVelocity();

    gl.setRenderTarget(null);
    gl.setScissorTest(false);
    gl.setViewport(0, 0, size.width, size.height);
    gl.autoClear = false;
    gl.clear(true, true, true);
    gl.render(current.scene, current.camera);
  }, 1);

  return null;
}
