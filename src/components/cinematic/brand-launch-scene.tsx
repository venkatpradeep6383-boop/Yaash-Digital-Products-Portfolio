"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import type { Group, Mesh, PerspectiveCamera, PointLight } from "three";

type SceneProps={compact:boolean;onPhase:(phase:number)=>void;onPortal:()=>void;onComplete:()=>void};

function DigitalBloom({compact,onPhase,onPortal,onComplete}:SceneProps){
 const world=useRef<Group>(null),core=useRef<Mesh>(null),ringA=useRef<Mesh>(null),ringB=useRef<Mesh>(null),light=useRef<PointLight>(null);const getThreeState=useThree((state)=>state.get);
 useFrame((state,delta)=>{if(!world.current||!core.current||!ringA.current||!ringB.current)return;core.current.rotation.x+=delta*.13;core.current.rotation.y+=delta*.2;ringA.current.rotation.z+=delta*.09;ringB.current.rotation.x-=delta*.07;if(state.clock.elapsedTime>7.5&&state.clock.elapsedTime<9.5)world.current.rotation.y=Math.sin(state.clock.elapsedTime*.45)*.025});
 useEffect(()=>{if(!world.current||!light.current)return;const camera=getThreeState().camera as PerspectiveCamera;const shot=(p:[number,number,number],t:[number,number,number])=>{camera.position.set(...p);camera.lookAt(...t)};camera.fov=compact?58:40;camera.updateProjectionMatrix();shot([2.1,.8,1.45],[0,.15,0]);
 const tl=gsap.timeline({defaults:{ease:"power3.inOut"}});tl.call(()=>onPhase(1),[],0).to(camera.position,{x:1.15,y:.25,z:2.35,duration:1.15,ease:"sine.inOut"},0)
 .call(()=>{onPhase(2);shot([-2.5,1.6,3.1],[0,0,0])},[],1.2).to(camera.position,{x:-1.15,y:.4,z:3.8,duration:1.15},1.2)
 .call(()=>{onPhase(3);shot([.4,-1.9,3.3],[0,0,0])},[],2.4).to(camera.position,{x:1.4,y:-.65,z:4.5,duration:1.15},2.4)
 .call(()=>{onPhase(4);shot([4.8,2.3,6.4],[0,0,0])},[],3.6).to(camera.position,{x:2.1,y:.8,z:7.5,duration:1.35},3.6)
 .call(()=>{onPhase(5);shot([0,.25,7.8],[0,0,0])},[],5).to(camera.position,{x:0,y:.05,z:compact?10.8:9.2,duration:1.5,ease:"power4.out"},5).to(world.current.rotation,{x:0,y:0,z:0,duration:1.45,ease:"power4.out"},5).to(world.current.scale,{x:1.08,y:1.08,z:1.08,duration:1.4,ease:"power4.out"},5).to(light.current,{intensity:34,duration:1.4},5)
 .call(()=>onPhase(6),[],6.5).call(()=>onPhase(7),[],7.5).call(()=>onPhase(8),[],7.5)
 .call(()=>{onPhase(9);onPortal()},[],9.5).to(camera.position,{z:1.1,duration:.5,ease:"power4.in"},9.5).to(world.current.scale,{x:2.4,y:2.4,z:2.4,duration:.5,ease:"power4.in"},9.5).call(onComplete,[],10);return()=>{tl.kill()}},[compact,getThreeState,onComplete,onPhase,onPortal]);
 return <><color attach="background" args={["#dbeafa"]}/><fog attach="fog" args={["#dbeafa",9,22]}/><ambientLight intensity={.8}/><pointLight ref={light} position={[-4,3,5]} intensity={22} distance={18} color="#b9ddff"/><directionalLight position={[5,6,5]} intensity={4} color="#fff1ca"/><directionalLight position={[-5,-1,4]} intensity={3.5} color="#d7bdff"/>
 <Environment resolution={128}><Lightformer intensity={5} color="#ffffff" position={[0,5,4]} scale={[8,2,1]}/><Lightformer intensity={5} color="#76d9ff" position={[-5,1,2]} rotation={[0,Math.PI/2,0]} scale={[5,2,1]}/><Lightformer intensity={4} color="#ff9fd3" position={[5,0,2]} rotation={[0,-Math.PI/2,0]} scale={[5,2,1]}/><Lightformer intensity={3} color="#d8ff8a" position={[0,-4,2]} scale={[6,2,1]}/></Environment>
 <Sparkles count={compact?28:52} scale={[9,6,5]} size={2.2} speed={.22} opacity={.38} color="#ffffff"/>
 <group ref={world} rotation={[.18,-.22,.12]}>
  <Float speed={1.1} rotationIntensity={.08} floatIntensity={.15}><mesh ref={core} castShadow><torusKnotGeometry args={[1.32,.42,220,32,2,3]}/><MeshTransmissionMaterial transmission={.72} thickness={1.5} roughness={.06} chromaticAberration={.12} anisotropy={.3} distortion={.08} distortionScale={.18} temporalDistortion={.04} color="#d9f3ff" attenuationColor="#ffb4df" attenuationDistance={2.2} metalness={.08}/></mesh></Float>
  <mesh ref={ringA} rotation={[1.12,.18,.35]} castShadow><torusGeometry args={[2.35,.075,24,180]}/><meshPhysicalMaterial color="#f3f6ff" metalness={.95} roughness={.09} clearcoat={1}/></mesh>
  <mesh ref={ringB} rotation={[.35,1.05,-.5]} castShadow><torusGeometry args={[2.72,.045,20,180]}/><meshPhysicalMaterial color="#c4e9ff" metalness={.88} roughness={.12} emissive="#7cbfff" emissiveIntensity={.16}/></mesh>
  <mesh position={[-2.2,.82,-.45]} rotation={[.35,.4,.6]} castShadow><icosahedronGeometry args={[.52,1]}/><meshPhysicalMaterial color="#f5c7e1" metalness={.55} roughness={.12} clearcoat={1}/></mesh>
  <mesh position={[2.18,-.74,.15]} rotation={[.1,.4,.3]} castShadow><octahedronGeometry args={[.48,0]}/><meshPhysicalMaterial color="#d9f49d" metalness={.45} roughness={.15} clearcoat={1}/></mesh>
  <mesh position={[1.72,1.38,-.72]} rotation={[.8,.3,.5]} castShadow><boxGeometry args={[.2,1.05,.2]}/><meshPhysicalMaterial color="#e9d6ff" metalness={.8} roughness={.1}/></mesh>
 </group>
 <mesh position={[0,-3,-1]} rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[24,20]}/><meshPhysicalMaterial color="#d6e4f0" metalness={.35} roughness={.22} clearcoat={1}/></mesh></>;
}
export function BrandLaunchScene(props:SceneProps){return <Canvas shadows dpr={props.compact?[1,1.15]:[1,1.5]} gl={{antialias:true,alpha:false,powerPreference:"high-performance"}} camera={{position:[2.1,.8,1.45],fov:props.compact?58:40}}><DigitalBloom {...props}/></Canvas>}
