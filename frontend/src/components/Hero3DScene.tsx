'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D像素艺术方块
function PixelBlock({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// 像素艺术角色（简化版）
function PixelCharacter() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const bodyColor = '#a855f7';
  const headColor = '#ec4899';
  const eyeColor = '#ffffff';

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* 身体 */}
        <PixelBlock position={[0, 0, 0]} color={bodyColor} scale={1.2} />
        {/* 头 */}
        <PixelBlock position={[0, 1.5, 0]} color={headColor} scale={0.8} />
        {/* 眼睛 */}
        <PixelBlock position={[-0.25, 1.6, 0.4]} color={eyeColor} scale={0.15} />
        <PixelBlock position={[0.25, 1.6, 0.4]} color={eyeColor} scale={0.15} />
        {/* 手臂 */}
        <PixelBlock position={[-0.8, 0, 0]} color={bodyColor} scale={0.4} />
        <PixelBlock position={[0.8, 0, 0]} color={bodyColor} scale={0.4} />
        {/* 腿 */}
        <PixelBlock position={[-0.3, -1, 0]} color={bodyColor} scale={0.4} />
        <PixelBlock position={[0.3, -1, 0]} color={bodyColor} scale={0.4} />
      </group>
    </Float>
  );
}

// 粒子效果
function Particles({ count = 100 }) {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#a855f7" transparent opacity={0.6} />
    </points>
  );
}

// 主3D场景
export function Hero3DScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />

        <PixelCharacter />
        <Particles count={150} />

        {/* 装饰性像素块 */}
        <PixelBlock position={[-4, 2, -2]} color="#22d3ee" scale={0.5} />
        <PixelBlock position={[4, -1, -3]} color="#4ade80" scale={0.3} />
        <PixelBlock position={[-3, -2, -1]} color="#facc15" scale={0.4} />
        <PixelBlock position={[3, 3, -2]} color="#a855f7" scale={0.6} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
