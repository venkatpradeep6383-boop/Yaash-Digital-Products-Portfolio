"use client";

import { Canvas, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import { Group, Path, PointLight, Shape } from "three";

type SceneProps = { compact: boolean; onPhase: (phase: number) => void; onPortal: () => void; onComplete: () => void };

function letterShape(letter: "Y" | "D") {
  const shape = new Shape();
  if (letter === "Y") {
    shape.moveTo(-1.08, 1.45); shape.lineTo(-.47, 1.45); shape.lineTo(0, .55); shape.lineTo(.47, 1.45); shape.lineTo(1.08, 1.45); shape.lineTo(.3, .05); shape.lineTo(.3, -1.45); shape.lineTo(-.3, -1.45); shape.lineTo(-.3, .05); shape.closePath();
  } else {
    shape.moveTo(-.95, -1.45); shape.lineTo(-.95, 1.45); shape.lineTo(.05, 1.45); shape.bezierCurveTo(1.35, 1.45, 1.35, -1.45, .05, -1.45); shape.closePath();
    const hole = new Path(); hole.moveTo(-.38, -.83); hole.lineTo(-.38, .83); hole.lineTo(-.02, .83); hole.bezierCurveTo(.62, .83, .62, -.83, -.02, -.83); hole.closePath(); shape.holes.push(hole);
  }
  return shape;
}

const material = { color: "#303949", metalness: .9, roughness: .14, clearcoat: 1, clearcoatRoughness: .08, transmission: .02, thickness: .3 } as const;
const extrude = { depth: .5, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: .065, bevelThickness: .065 } as const;

function LaunchGeometry({ compact, onPhase, onPortal, onComplete }: SceneProps) {
  const v = useRef<Group>(null);
  const d = useRef<Group>(null);
  const p = useRef<Group>(null);
  const stem = useRef<Group>(null);
  const top = useRef<Group>(null);
  const side = useRef<Group>(null);
  const base = useRef<Group>(null);
  const sweep = useRef<PointLight>(null);
  const { camera } = useThree();
  const vShape = useMemo(() => letterShape("Y"), []);
  const dShape = useMemo(() => letterShape("D"), []);

  useEffect(() => {
    if (!v.current || !d.current || !p.current || !stem.current || !top.current || !side.current || !base.current || !sweep.current) return;
    const speed = compact ? .68 : 1;
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete });
    gsap.set(v.current.position, { x: 0, y: 0, z: -12 });
    gsap.set(v.current.rotation, { x: -.28, y: -.72, z: .12 });
    gsap.set(d.current.position, { x: 5.5, y: 0, z: -3.5 });
    gsap.set(d.current.rotation, { x: .14, y: .78, z: -.08 });
    gsap.set(p.current.position, { x: 2.75, y: -.18, z: -.5 });
    gsap.set(p.current.rotation, { x: -.18, y: -.42, z: .08 });
    gsap.set([stem.current.position, top.current.position, side.current.position, base.current.position], { z: 0 });
    gsap.set(stem.current.position, { x: -3.2, y: -2.4 });
    gsap.set(top.current.position, { x: .4, y: 3.2 });
    gsap.set(side.current.position, { x: 3.2, y: .7 });
    gsap.set(base.current.position, { x: 2.4, y: -2.4 });
    camera.position.set(0, 0, 8);

    timeline
      .to(v.current.position, { z: 0, duration: 1.15 * speed }, .15 * speed)
      .to(v.current.rotation, { x: 0, y: 0, z: 0, duration: 1.15 * speed }, .15 * speed)
      .call(() => onPhase(1), [], 1.05 * speed)
      .to(d.current.position, { x: 0, z: -1.15, duration: 1.05 * speed }, 1.45 * speed)
      .to(d.current.position, { z: 0, duration: .45 * speed }, 2.25 * speed)
      .to(d.current.rotation, { x: 0, y: 0, z: 0, duration: 1.05 * speed }, 1.45 * speed)
      .call(() => onPhase(2), [], 2.35 * speed)
      .to(stem.current.position, { x: 0, y: 0, duration: .85 * speed }, 2.75 * speed)
      .to(top.current.position, { x: 0, y: 0, duration: .85 * speed }, 2.9 * speed)
      .to(side.current.position, { x: 0, y: 0, duration: .85 * speed }, 3.05 * speed)
      .to(base.current.position, { x: 0, y: 0, duration: .85 * speed }, 3.2 * speed)
      .call(() => onPhase(3), [], 3.25 * speed)
      .call(() => onPhase(0), [], 3.82 * speed)
      .to(v.current.position, { x: -2.05, duration: .82 * speed, ease: "expo.inOut" }, 3.85 * speed)
      .to(d.current.position, { x: 0, duration: .82 * speed, ease: "expo.inOut" }, 3.85 * speed)
      .to(p.current.position, { x: 2.05, y: 0, z: 0, duration: .82 * speed, ease: "expo.inOut" }, 3.85 * speed)
      .to(p.current.rotation, { x: 0, y: 0, z: 0, duration: .82 * speed, ease: "expo.inOut" }, 3.85 * speed)
      .to(sweep.current, { intensity: 55, duration: .22 * speed, yoyo: true, repeat: 1 }, 4.5 * speed)
      .call(() => onPhase(4), [], 4.72 * speed)
      .call(onPortal, [], 7.72 * speed)
      .to(v.current.position, { x: -3.2, z: -1.6, duration: .8 * speed }, 7.72 * speed)
      .to(d.current.position, { x: -.8, z: -1.2, duration: .8 * speed }, 7.72 * speed)
      .to(camera.position, { x: 2.05, y: .45, z: 1.75, duration: 1.12 * speed, ease: "power2.in" }, 7.72 * speed)
      .to(p.current.scale, { x: 5.8, y: 5.8, z: 5.8, duration: 1.12 * speed, ease: "power2.in" }, 7.72 * speed)
      .to(camera.position, { z: -1.4, duration: .3 * speed, ease: "power4.in" }, 8.72 * speed);
    return () => { timeline.kill(); };
  }, [camera, compact, onComplete, onPhase, onPortal]);

  return <>
    <ambientLight intensity={.42}/><directionalLight position={[-4, 5, 7]} intensity={3.5} color="#bdd1ff"/><directionalLight position={[5, -1, 5]} intensity={2.5} color="#805fff"/><pointLight ref={sweep} position={[0, 2, 4]} intensity={8} distance={11} color="#42baff"/>
    <group position={[0, 0, 0]}>
      <group ref={v}><mesh><extrudeGeometry args={[vShape, extrude]}/><meshPhysicalMaterial {...material}/></mesh></group>
      <group ref={d}><mesh><extrudeGeometry args={[dShape, extrude]}/><meshPhysicalMaterial {...material}/></mesh></group>
      <group ref={p}>
        <group ref={stem}><mesh position={[-.67, 0, .2]}><boxGeometry args={[.58, 2.9, .42, compact ? 1 : 2, compact ? 1 : 2, 1]}/><meshPhysicalMaterial {...material}/></mesh></group>
        <group ref={top}><mesh position={[0, 1.16, .2]}><boxGeometry args={[1.5, .58, .42]}/><meshPhysicalMaterial {...material}/></mesh></group>
        <group ref={side}><mesh position={[.48, .55, .2]}><boxGeometry args={[.56, .92, .42]}/><meshPhysicalMaterial {...material}/></mesh></group>
        <group ref={base}><mesh position={[0, .03, .2]}><boxGeometry args={[1.5, .55, .42]}/><meshPhysicalMaterial {...material}/></mesh></group>
      </group>
    </group>
  </>;
}

export function BrandLaunchScene(props: SceneProps) {
  return <Canvas dpr={props.compact ? [1, 1.15] : [1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} camera={{ position: [0, 0, 8], fov: 38 }}><LaunchGeometry {...props}/></Canvas>;
}
