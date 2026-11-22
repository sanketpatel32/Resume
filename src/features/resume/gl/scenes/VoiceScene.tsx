"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, Group, InstancedMesh, Mesh, Object3D, ShaderMaterial } from "three";
import { noiseGLSL } from "../shaders/noise";
import { palette, rawColor } from "../palette";
import { useTracking } from "../tracking";

const BARS = 96;

const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
${noiseGLSL}
void main() {
  vec3 n = normalize(position);
  float bands = sin(n.y * 9.0 + uTime * 3.2) * 0.35 + sin(n.x * 7.0 - uTime * 2.1) * 0.25;
  float d = snoise(n * 1.7 + vec3(0.0, uTime * 0.45, 0.0)) * 0.6 + bands * 0.4;
  d *= uAmp;
  vDisp = d;
  vec3 p = position + n * d * 0.32;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vView = -mv.xyz;
  vNormal = normalize(normalMatrix * n);
  gl_Position = projectionMatrix * mv;
}
`;

const orbFragment = /* glsl */ `
precision highp float;
uniform vec3 uCore;
uniform vec3 uRim;
uniform vec3 uHot;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
void main() {
  float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.2);
  vec3 col = mix(uCore, uRim, fres);
  col = mix(col, uHot, smoothstep(0.2, 0.6, vDisp));
  float lines = smoothstep(0.92, 1.0, abs(sin(vDisp * 40.0)));
  col += uRim * lines * 0.25;
  gl_FragColor = vec4(col, 1.0);
}
`;

/** Abstract illustration of a live voice call: the signal swells when the cursor speaks to it. */
export default function VoiceScene({ track }: { track: RefObject<HTMLElement | null> }) {
  const tracking = useTracking(track);
  const group = useRef<Group>(null);
  const bars = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const amplitude = useRef(0.4);
  const orb = useRef<Mesh<BufferGeometry, ShaderMaterial>>(null);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: orbVertex,
        fragmentShader: orbFragment,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 0.4 },
          uCore: { value: rawColor(palette.graphite) },
          uRim: { value: rawColor(palette.cornflower) },
          uHot: { value: rawColor(palette.citron) },
        },
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const t = tracking.current;
    const time = state.clock.elapsedTime;
    const proximity = t.hover * (1 - Math.min(1, Math.hypot(t.u - 0.5, (t.v - 0.5) / t.aspect) * 1.6));
    amplitude.current += (0.35 + proximity * 0.9 + t.hover * 0.25 - amplitude.current) * Math.min(1, delta * 4);
    if (orb.current) {
      orb.current.material.uniforms.uTime.value = time;
      orb.current.material.uniforms.uAmp.value = amplitude.current;
    }

    if (group.current) {
      group.current.rotation.y = (t.u - 0.5) * 0.6;
      group.current.rotation.x = -(t.v - 0.5) * 0.4;
      const fit = Math.min(1, t.aspect / 1.3);
      group.current.scale.setScalar((0.55 + 0.45 * t.reveal) * fit);
    }

    const mesh = bars.current;
    if (mesh) {
      for (let index = 0; index < BARS; index += 1) {
        const angle = (index / BARS) * Math.PI * 2;
        const level =
          0.15 +
          Math.abs(Math.sin(time * 3.1 + index * 0.45)) * 0.35 +
          Math.abs(Math.sin(time * 1.7 + index * 0.13)) * 0.3;
        const height = 0.06 + level * amplitude.current * 0.9;
        dummy.position.set(Math.cos(angle) * (1.62 + height / 2), Math.sin(angle) * (1.62 + height / 2), 0);
        dummy.rotation.set(0, 0, angle - Math.PI / 2);
        dummy.scale.set(0.022, height, 0.022);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={orb} material={material}>
        <icosahedronGeometry args={[1, 48]} />
      </mesh>
      <instancedMesh ref={bars} args={[undefined, undefined, BARS]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={palette.cornflower} />
      </instancedMesh>
      <mesh>
        <torusGeometry args={[1.58, 0.004, 6, 160]} />
        <meshBasicMaterial color={palette.coral} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
