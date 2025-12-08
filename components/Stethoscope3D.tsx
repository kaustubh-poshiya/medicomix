import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Environment } from '@react-three/drei';

const WavyTube = ({
  curve,
  color,
  thickness,
  waveAmplitude = 0.05,
  waveFrequency = 2,
  waveSpeed = 1
}: {
  curve: THREE.Curve<THREE.Vector3>;
  color: string;
  thickness: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveSpeed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.TubeGeometry(curve, 128, thickness, 16, false);
    // Store original positions for wave animation
    originalPositions.current = geo.attributes.position.array.slice() as Float32Array;
    return geo;
  }, [curve, thickness]);

  useFrame((state) => {
    if (meshRef.current && originalPositions.current) {
      const positions = meshRef.current.geometry.attributes.position;
      const original = originalPositions.current;
      const time = state.clock.getElapsedTime() * waveSpeed;

      for (let i = 0; i < positions.count; i++) {
        const i3 = i * 3;
        const x = original[i3];
        const y = original[i3 + 1];
        const z = original[i3 + 2];

        // Create wave effect along the tube
        const wave = Math.sin(y * waveFrequency + time) * waveAmplitude;

        positions.array[i3] = x + wave * Math.cos(time * 0.5);
        positions.array[i3 + 2] = z + wave * Math.sin(time * 0.5);
      }

      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhysicalMaterial
        color={color}
        roughness={0.3}
        metalness={0.1}
        clearcoat={0.5}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
};

export const StethoscopeModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Create Main Tubing Curve with S-shape flow
  const mainTubeCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2, 0),        // Start at chest piece
      new THREE.Vector3(-0.8, -1, 0.3),   // First loop out (Left/Forward)
      new THREE.Vector3(0.5, 0.5, -0.2),  // Second loop in (Right/Back)
      new THREE.Vector3(0, 2, 0),         // Connect to ear tubes
    ], false, 'catmullrom', 0.8);
  }, []);

  // Left Ear Tube with smooth curve
  const leftEarCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(-0.5, 2.5, 0.1),
    new THREE.Vector3(-0.8, 3, 0.15),
    new THREE.Vector3(-1, 3.5, 0.25),
  ], false, 'catmullrom', 0.5), []);

  // Right Ear Tube with smooth curve
  const rightEarCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(0.5, 2.5, 0.1),
    new THREE.Vector3(0.8, 3, 0.15),
    new THREE.Vector3(1, 3.5, 0.25),
  ], false, 'catmullrom', 0.5), []);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]} scale={0.7}>
      {/* Chest Piece Assembly - Dual Head Design */}
      <group position={[0, -2.2, 0]} rotation={[0, 0, 0]}>

        {/* -- Diaphragm Side (Large) -- */}
        <group position={[0, 0.1, 0]}>
          {/* Main Metal casing */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.15, 64]} />
            <meshStandardMaterial color="#8b9dc3" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Diaphragm Surface */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.02, 64]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.2} roughness={0.3} />
          </mesh>
          {/* Rubber Rim (Chill Ring) */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.6, 0.04, 16, 64]} />
            <meshStandardMaterial color="#1a202c" roughness={0.9} />
          </mesh>
        </group>

        {/* -- Connection Stem -- */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3, 32]} />
          <meshStandardMaterial color="#8b9dc3" metalness={1} roughness={0.2} />
        </mesh>

        {/* -- Bell Side (Small) -- */}
        <group position={[0, -0.15, 0]}>
          {/* Bell Curve */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.15, 0.25, 64]} />
            <meshStandardMaterial color="#8b9dc3" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Bell Hollow rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.13, 0]}>
            <torusGeometry args={[0.4, 0.03, 16, 64]} />
            <meshStandardMaterial color="#1a202c" roughness={0.9} />
          </mesh>
        </group>

        {/* Angled Stem Connector to Tube */}
        <group position={[0, 0, 0]} rotation={[0, 0, 0.5]}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.6, 32]} />
            <meshStandardMaterial color="#7a8a9f" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Main Tubing with Wave Effect */}
      <WavyTube
        curve={mainTubeCurve}
        color="#2563eb"
        thickness={0.09}
        waveAmplitude={0.03}
        waveFrequency={3}
        waveSpeed={0.8}
      />

      {/* Y-Split Junction */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhysicalMaterial
          color="#7a8a9f"
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Metal Ear Tubes with subtle waves */}
      <WavyTube
        curve={leftEarCurve}
        color="#9ca3af"
        thickness={0.065}
        waveAmplitude={0.02}
        waveFrequency={4}
        waveSpeed={0.6}
      />
      <WavyTube
        curve={rightEarCurve}
        color="#9ca3af"
        thickness={0.065}
        waveAmplitude={0.02}
        waveFrequency={4}
        waveSpeed={0.6}
      />

      {/* Ear Tips with better detail */}
      <group position={[-1, 3.5, 0.25]}>
        <mesh rotation={[0.5, 0, -0.5]}>
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshPhysicalMaterial
            color="#2a2a3e"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        <mesh rotation={[0.5, 0, -0.5]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color="#4a4a5e"
            roughness={0.8}
          />
        </mesh>
      </group>

      <group position={[1, 3.5, 0.25]}>
        <mesh rotation={[0.5, 0, 0.5]}>
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshPhysicalMaterial
            color="#2a2a3e"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        <mesh rotation={[0.5, 0, 0.5]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color="#4a4a5e"
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* Ambient occlusion helpers - small shadow spheres */}
      <mesh position={[0, -2.2, 0]}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0f172a' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />

        <StethoscopeModel />

        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#94a3b8',
        fontSize: '14px',
        fontFamily: 'system-ui, sans-serif'
      }}>
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
