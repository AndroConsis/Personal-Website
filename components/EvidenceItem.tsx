'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface EvidenceItemProps {
  position: [number, number, number];
  title: string;
  id: string;
  onClick: (id: string) => void;
  color?: string;
  type?: 'box' | 'sphere' | 'torus';
}

export default function EvidenceItem({ position, title, id, onClick, color = '#00ff41', type = 'box' }: EvidenceItemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh
          ref={meshRef}
          onClick={() => onClick(id)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {type === 'box' && <boxGeometry args={[1, 1, 1]} />}
          {type === 'sphere' && <sphereGeometry args={[0.7, 32, 32]} />}
          {type === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 100]} />}
          
          <MeshDistortMaterial
            color={hovered ? '#ffffff' : color}
            speed={2}
            distort={hovered ? 0.4 : 0.2}
            radius={1}
            wireframe
          />
        </mesh>
      </Float>

      <Text
        position={[0, -1.5, 0]}
        fontSize={0.25}
        color={hovered ? '#ffffff' : color}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
      >
        {title}
      </Text>

      {hovered && (
        <pointLight position={[0, 0, 0]} color={color} intensity={2} distance={5} />
      )}
    </group>
  );
}
