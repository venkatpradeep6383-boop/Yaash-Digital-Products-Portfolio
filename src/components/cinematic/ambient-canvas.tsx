"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Object() {
  const mesh = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.05;
    mesh.current.rotation.y = state.pointer.x * 0.12 + state.clock.elapsedTime * 0.035;
  });
  return <Float speed={0.7} rotationIntensity={0.25} floatIntensity={0.35}><mesh ref={mesh}><torusKnotGeometry args={[1.2, 0.018, 180, 12]} /><meshBasicMaterial color="#8b8fa3" transparent opacity={0.28} /></mesh></Float>;
}

export function AmbientCanvas() {
  return <div className="ambient-canvas" aria-hidden="true"><Canvas dpr={[1, 1.4]} camera={{ position: [0, 0, 5], fov: 42 }}><Object /></Canvas></div>;
}
