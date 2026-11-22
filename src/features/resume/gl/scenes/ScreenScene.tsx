"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { BufferGeometry, Group, Mesh, ShaderMaterial, Vector2 } from "three";
import { noiseGLSL } from "../shaders/noise";
import { rawColor } from "../palette";
import { CAMERA_DISTANCE, CAMERA_FOV, useTracking, viewSize } from "../tracking";

const vertex = /* glsl */ `
uniform float uVel;
uniform float uHover;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 p = position;
  float bend = sin(uv.x * 3.14159265) * uVel * 0.12;
  p.z += bend + sin(uv.y * 3.14159265) * uHover * 0.05;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;
uniform sampler2D uMap;
uniform vec2 uImage;
uniform vec2 uPlane;
uniform vec2 uMouse;
uniform float uHover;
uniform float uReveal;
uniform float uVel;
uniform float uTime;
uniform vec3 uAccent;
uniform vec3 uBg;
varying vec2 vUv;

${noiseGLSL}

vec2 cover(vec2 uv, vec2 plane, vec2 image) {
  float rp = plane.x / plane.y;
  float ri = image.x / image.y;
  vec2 scale = rp > ri ? vec2(1.0, ri / rp) : vec2(rp / ri, 1.0);
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv = cover(vUv, uPlane, uImage);
  uv.y = uv.y * 0.98 + 0.02;

  vec2 delta = (vUv - uMouse) * vec2(uPlane.x / uPlane.y, 1.0);
  float dist = length(delta);
  float wave = sin(dist * 34.0 - uTime * 4.0) * exp(-dist * 6.0) * 0.006 * uHover;
  uv += normalize(delta + 1e-5) * wave;
  uv = (uv - 0.5) * (1.0 - 0.035 * uHover) + 0.5;

  float split = clamp(abs(uVel), 0.0, 3.0) * 0.004 + uHover * 0.0015;
  vec3 tex = vec3(
    texture2D(uMap, uv + vec2(split, 0.0)).r,
    texture2D(uMap, uv).g,
    texture2D(uMap, uv - vec2(split, 0.0)).b
  );

  float torch = exp(-dist * 3.5) * uHover * 0.08;
  tex += torch;

  float n = noise2(vUv * vec2(7.0, 4.5)) * 0.55 + (1.0 - vUv.y) * 0.45;
  float edge = uReveal * 1.35 - n;
  if (edge < 0.0) discard;
  float px = max(fwidth(edge), 1e-4);
  float shown = smoothstep(px, px * 4.0, edge);
  float band = 1.0 - smoothstep(px * 1.5, px * 3.5, edge);
  vec3 col = mix(uBg, tex, shown);
  col = mix(col, uAccent, clamp(band, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

interface ScreenSceneProps {
  src: string;
  accent: string;
  background: string;
  track: RefObject<HTMLElement | null>;
}

export default function ScreenScene({ src, accent, background, track }: ScreenSceneProps) {
  const texture = useTexture(src);
  const tracking = useTracking(track);
  const group = useRef<Group>(null);
  const plane = useRef<Mesh<BufferGeometry, ShaderMaterial>>(null);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          uMap: { value: texture },
          uImage: { value: new Vector2(1600, 1000) },
          uPlane: { value: new Vector2(1.6, 1) },
          uMouse: { value: new Vector2(0.5, 0.5) },
          uHover: { value: 0 },
          uReveal: { value: 0 },
          uVel: { value: 0 },
          uTime: { value: 0 },
          uAccent: { value: rawColor(accent) },
          uBg: { value: rawColor(background) },
        },
      }),
    [texture, accent, background],
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame((_, delta) => {
    const t = tracking.current;
    if (!plane.current) return;
    const u = plane.current.material.uniforms;
    const image = texture.image as { width?: number; height?: number } | undefined;
    if (image?.width && image.height) u.uImage.value.set(image.width, image.height);
    const { width, height } = viewSize(CAMERA_FOV, CAMERA_DISTANCE, t.aspect);
    const scale = 0.9;
    u.uPlane.value.set(width, height);
    u.uMouse.value.set(t.u, t.v);
    u.uHover.value = t.hover;
    u.uReveal.value = t.reveal;
    u.uVel.value = t.velocity;
    u.uTime.value += Math.min(delta, 0.05);
    if (group.current) {
      group.current.scale.set(width * scale, height * scale, 1);
      group.current.rotation.y = (t.u - 0.5) * 0.22 * t.hover;
      group.current.rotation.x = -(t.v - 0.5) * 0.16 * t.hover;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={plane} material={material}>
        <planeGeometry args={[1, 1, 32, 32]} />
      </mesh>
    </group>
  );
}
