"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00d4ff");
    const lightCyan = new THREE.Color("#67e8f9");
    const dimCyan = new THREE.Color("#0e7490");

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      const color = r > 0.7 ? lightCyan : r > 0.3 ? cyan : dimCyan;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count]);

  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.06;

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] = originalPositions[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.15;
      posArray[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * 0.2 + i * 0.15) * 0.15;
      posArray[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * 0.25 + i * 0.05) * 0.08;

      const mx = mouse.current.x * viewport.width * 0.5;
      const my = mouse.current.y * viewport.height * 0.5;
      const dx = posArray[i3] - mx;
      const dy = posArray[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.08;
        posArray[i3] += (dx / dist) * force;
        posArray[i3 + 1] += (dy / dist) * force;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleField() {
  const [particleCount, setParticleCount] = useState(400);

  useEffect(() => {
    const updateCount = () => {
      setParticleCount(window.innerWidth < 768 ? 150 : 400);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles count={particleCount} />
      </Canvas>
    </div>
  );
}
