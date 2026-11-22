"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Group, Mesh, Points, ShaderMaterial } from "three";
import { noiseGLSL } from "../shaders/noise";
import { palette, rawColor } from "../palette";
import { useTracking } from "../tracking";

const PARTICLES = 900;

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uPush;
varying vec3 vNormal;
varying vec3 vView;
varying float vHeat;
${noiseGLSL}
void main() {
  vec3 n = normalize(position);
  float d = snoise(n * 2.2 + vec3(uTime * 0.35)) * 0.5 + snoise(n * 5.0 - vec3(uTime * 0.2)) * 0.18;
  d *= 0.55 + uPush;
  vHeat = d;
  vec3 p = position + n * d * 0.14;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vView = -mv.xyz;
  vNormal = normalize(normalMatrix * n);
  gl_Position = projectionMatrix * mv;
}
`;

const coreFragment = /* glsl */ `
precision highp float;
uniform vec3 uHot;
uniform vec3 uWarm;
uniform vec3 uDeep;
varying vec3 vNormal;
varying vec3 vView;
varying float vHeat;
void main() {
  float facing = max(dot(normalize(vNormal), normalize(vView)), 0.0);
  float fres = pow(1.0 - facing, 2.0);
  vec3 col = mix(uWarm, uHot, smoothstep(-0.35, 0.3, vHeat));
  col = mix(col, vec3(1.0, 0.98, 0.86), pow(facing, 6.0) * 0.45);
  col = mix(col, uWarm, fres * 0.85);
  float contour = 1.0 - smoothstep(0.0, 0.035, abs(fract(vHeat * 5.0 + 0.5) - 0.5));
  col = mix(col, uDeep, contour * 0.55 * facing);
  gl_FragColor = vec4(col, 1.0);
}
`;

const dustVertex = /* glsl */ `
uniform float uTime;
attribute float aSeed;
varying float vAlpha;
void main() {
  float r = 1.55 + fract(aSeed * 13.7) * 1.4;
  float speed = 0.08 + fract(aSeed * 7.3) * 0.25;
  float a = aSeed * 6.2831853 * 31.0 + uTime * speed;
  float tilt = (fract(aSeed * 3.1) - 0.5) * 1.2;
  vec3 p = vec3(cos(a) * r, sin(a) * r * 0.32 + tilt * 0.6, sin(a) * r);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (2.0 + fract(aSeed * 91.0) * 3.0) * (6.0 / -mv.z);
  vAlpha = 0.35 + fract(aSeed * 57.0) * 0.65;
  gl_Position = projectionMatrix * mv;
}
`;

const dustFragment = /* glsl */ `
precision highp float;
uniform vec3 uColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vAlpha;
  gl_FragColor = vec4(uColor * a, a);
}
`;

/** The bottom of the descent: a molten core that leans toward the cursor. */
export default function CoreScene({ track }: { track: RefObject<HTMLElement | null> }) {
  const tracking = useTracking(track);
  const group = useRef<Group>(null);
  const core = useRef<Mesh<BufferGeometry, ShaderMaterial>>(null);
  const particles = useRef<Points<BufferGeometry, ShaderMaterial>>(null);

  const coreMaterial = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: coreVertex,
        fragmentShader: coreFragment,
        uniforms: {
          uTime: { value: 0 },
          uPush: { value: 0 },
          uHot: { value: rawColor(palette.citron) },
          uWarm: { value: rawColor(palette.coral) },
          uDeep: { value: rawColor("#2a2610") },
        },
      }),
    [],
  );

  const { dust, dustMaterial } = useMemo(() => {
    const geometry = new BufferGeometry();
    const seeds = new Float32Array(PARTICLES);
    for (let index = 0; index < PARTICLES; index += 1) seeds[index] = (index * 0.6180339887) % 1;
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(PARTICLES * 3), 3));
    geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    const material = new ShaderMaterial({
      vertexShader: dustVertex,
      fragmentShader: dustFragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uColor: { value: rawColor(palette.citron) } },
    });
    return { dust: geometry, dustMaterial: material };
  }, []);

  useEffect(
    () => () => {
      coreMaterial.dispose();
      dustMaterial.dispose();
      dust.dispose();
    },
    [coreMaterial, dustMaterial, dust],
  );

  useFrame((state) => {
    const t = tracking.current;
    const time = state.clock.elapsedTime;
    if (core.current) {
      core.current.material.uniforms.uTime.value = time;
      core.current.material.uniforms.uPush.value = t.hover * 0.35;
    }
    if (particles.current) particles.current.material.uniforms.uTime.value = time;
    if (group.current) {
      group.current.rotation.y += ((t.u - 0.5) * 0.8 + time * 0.05 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-(t.v - 0.5) * 0.5 - group.current.rotation.x) * 0.05;
      const fit = Math.min(1, t.aspect / 1.1);
      group.current.scale.setScalar((0.5 + 0.5 * t.reveal) * fit);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core} material={coreMaterial}>
        <icosahedronGeometry args={[1, 64]} />
      </mesh>
      <points ref={particles} geometry={dust} material={dustMaterial} frustumCulled={false} />
    </group>
  );
}
