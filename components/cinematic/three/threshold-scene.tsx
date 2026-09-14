"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function ThresholdObject() {
  return <Float speed={0.45} rotationIntensity={0.1} floatIntensity={0.25}><mesh><torusGeometry args={[1, 0.08, 24, 64]} /><meshStandardMaterial color="#d9a49b" metalness={0.8} roughness={0.25} /></mesh></Float>;
}

export function ThresholdScene() {
  return <Canvas camera={{ position: [0, 0, 3.2], fov: 40 }} dpr={[1, 1.5]}><ambientLight intensity={0.4} /><pointLight position={[2, 2, 3]} color="#e9c99d" intensity={8} /><ThresholdObject /><OrbitControls enableZoom={false} enablePan={false} /></Canvas>;
}