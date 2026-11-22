"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, Group, InstancedMesh, Object3D } from "three";
import { palette } from "../palette";
import { useTracking } from "../tracking";

const SIDE = 4;
const COUNT = SIDE * SIDE;
const GAP = 0.62;
const TILE_COLORS = [palette.citron, palette.cornflower, palette.coral, palette.paper];

/** Abstract illustration of AuraFlow's sixteen-tool grid: tiles rise toward the cursor like a keyboard under a hand. */
export default function TilesScene({ track }: { track: RefObject<HTMLElement | null> }) {
  const tracking = useTracking(track);
  const group = useRef<Group>(null);
  const tiles = useRef<InstancedMesh>(null);
  const edges = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const colorsApplied = useRef(false);

  useFrame((state) => {
    const t = tracking.current;
    const time = state.clock.elapsedTime;
    const mesh = tiles.current;
    const outline = edges.current;
    if (!mesh || !outline) return;

    if (!colorsApplied.current) {
      for (let index = 0; index < COUNT; index += 1) {
        const color = new Color(TILE_COLORS[(index * 5 + Math.floor(index / SIDE)) % TILE_COLORS.length]);
        mesh.setColorAt(index, color);
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      colorsApplied.current = true;
    }

    const px = (t.u - 0.5) * SIDE * GAP * 1.6;
    const pz = -(t.v - 0.5) * SIDE * GAP * 1.6;
    const flipIndex = Math.floor(time / 1.4) % COUNT;
    const flipPhase = (time % 1.4) / 1.4;

    for (let index = 0; index < COUNT; index += 1) {
      const column = index % SIDE;
      const row = Math.floor(index / SIDE);
      const x = (column - (SIDE - 1) / 2) * GAP;
      const z = (row - (SIDE - 1) / 2) * GAP;
      const distance = Math.hypot(x - px, z - pz);
      const lift = t.hover * Math.max(0, 1 - distance / 1.4) * 0.45;
      const wave = Math.sin(time * 1.6 - (column + row) * 0.7) * 0.05;
      dummy.position.set(x, lift + wave, z);
      dummy.rotation.set(index === flipIndex ? Math.sin(flipPhase * Math.PI) * Math.PI : 0, 0, 0);
      dummy.scale.set(0.5, 0.09 + lift * 0.25, 0.5);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      dummy.scale.set(0.54, 0.1 + lift * 0.25, 0.54);
      dummy.updateMatrix();
      outline.setMatrixAt(index, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    outline.instanceMatrix.needsUpdate = true;

    if (group.current) {
      group.current.rotation.x = 0.85 - (t.v - 0.5) * 0.25;
      group.current.rotation.y = -0.62 + (t.u - 0.5) * 0.4;
      const fit = Math.min(1, t.aspect / 1.4);
      group.current.scale.setScalar((0.6 + 0.4 * t.reveal) * fit * 1.05);
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 5, 3]} intensity={2.2} />
      <instancedMesh ref={tiles} args={[undefined, undefined, COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial />
      </instancedMesh>
      <instancedMesh ref={edges} args={[undefined, undefined, COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={palette.graphite} wireframe transparent opacity={0.55} />
      </instancedMesh>
    </group>
  );
}
