"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  CatmullRomCurve3,
  Color,
  Group,
  InstancedMesh,
  Object3D,
  Quaternion,
  TubeGeometry,
  Vector3,
} from "three";
import { palette } from "../palette";
import { useTracking } from "../tracking";

const CANDIDATES = 140;
const STAGES = [0.08, 0.36, 0.64, 0.92];
const STAGE_COLORS = [palette.paper, palette.citron, palette.cornflower, palette.coral];

/**
 * Abstract illustration of a hiring pipeline: candidates stream along a path
 * through four gates (apply, interview, score, report) and take on the gate's
 * colour as they pass it.
 */
export default function PipelineScene({ track }: { track: RefObject<HTMLElement | null> }) {
  const tracking = useTracking(track);
  const group = useRef<Group>(null);
  const instances = useRef<InstancedMesh>(null);
  const rings = useRef<Group>(null);

  const { curve, tube, seeds, gatePoints } = useMemo(() => {
    const path = new CatmullRomCurve3([
      new Vector3(-2.6, -0.9, -0.6),
      new Vector3(-1.4, 0.5, 0.2),
      new Vector3(-0.2, -0.4, 0.4),
      new Vector3(1.0, 0.6, -0.1),
      new Vector3(2.2, -0.3, 0.3),
      new Vector3(2.9, 0.4, -0.4),
    ]);
    return {
      curve: path,
      tube: new TubeGeometry(path, 160, 0.012, 6, false),
      seeds: Array.from({ length: CANDIDATES }, (_, index) => ({
        offset: index / CANDIDATES,
        speed: 0.035 + ((index * 37) % 11) * 0.003,
        radius: 0.05 + ((index * 13) % 7) * 0.025,
        phase: (index * 2.399) % (Math.PI * 2),
        size: 0.022 + ((index * 7) % 5) * 0.006,
      })),
      gatePoints: STAGES.map((t) => ({
        point: path.getPointAt(t),
        orientation: new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), path.getTangentAt(t)),
      })),
    };
  }, []);

  const dummy = useMemo(() => new Object3D(), []);
  const colors = useMemo(() => STAGE_COLORS.map((hex) => new Color(hex)), []);
  const scratch = useMemo(() => new Color(), []);
  const position = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    const t = tracking.current;
    const time = state.clock.elapsedTime;
    const boost = 1 + t.hover * 1.6 + Math.min(2, Math.abs(t.velocity)) * 0.5;

    if (group.current) {
      group.current.rotation.y += ((t.u - 0.5) * 0.9 - group.current.rotation.y) * 0.06;
      group.current.rotation.x += (-(t.v - 0.5) * 0.5 + 0.18 - group.current.rotation.x) * 0.06;
      const s = Math.min(1, t.aspect / 1.5);
      group.current.scale.setScalar((0.6 + 0.4 * t.reveal) * s);
    }

    const mesh = instances.current;
    if (mesh) {
      seeds.forEach((seed, index) => {
        seed.offset = (seed.offset + seed.speed * Math.min(delta, 0.05) * boost) % 1;
        curve.getPointAt(seed.offset, position);
        const swirl = seed.phase + time * 1.4;
        position.y += Math.sin(swirl) * seed.radius;
        position.z += Math.cos(swirl) * seed.radius;
        dummy.position.copy(position);
        dummy.scale.setScalar(seed.size * (0.8 + t.reveal * 0.4));
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
        const stage = STAGES.reduce((current, gate, gateIndex) => (seed.offset >= gate ? gateIndex : current), 0);
        scratch.copy(colors[stage]);
        mesh.setColorAt(index, scratch);
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    rings.current?.children.forEach((ring, index) => {
      const pulse = 1 + Math.sin(time * 2 + index) * 0.06 + t.hover * 0.12;
      ring.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={group}>
      <mesh geometry={tube}>
        <meshBasicMaterial color={palette.paper} transparent opacity={0.25} />
      </mesh>
      <group ref={rings}>
        {gatePoints.map(({ point, orientation }, index) => (
          <group key={index} position={point} quaternion={orientation}>
            <mesh>
              <torusGeometry args={[0.36, 0.012, 8, 72]} />
              <meshBasicMaterial color={STAGE_COLORS[index]} transparent opacity={0.9} />
            </mesh>
            <mesh>
              <torusGeometry args={[0.46, 0.004, 6, 72]} />
              <meshBasicMaterial color={STAGE_COLORS[index]} transparent opacity={0.4} />
            </mesh>
          </group>
        ))}
      </group>
      <instancedMesh ref={instances} args={[undefined, undefined, CANDIDATES]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial transparent opacity={0.95} blending={AdditiveBlending} depthWrite={false} />
      </instancedMesh>
    </group>
  );
}
