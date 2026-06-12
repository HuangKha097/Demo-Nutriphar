"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float, Sparkles, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/components/Nuoc-yen-sao-co-duong_textureGeneration.glb");
  const modelRef = useRef<THREE.Group>(null);

  // Apply material requirements: metalness 0-0.15 and roughness 0.55-0.75
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.metalness = 0.1;
          mat.roughness = 0.65;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  // Entrance animation: start slightly below and rise up
  useFrame((state) => {
    if (modelRef.current) {
      // Lerp position from -1 to 0 smoothly
      modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, 0, 0.03);
    }
  });

  return (
    <group ref={modelRef} position={[0, -1, 0]}>
      <Float
        speed={1.5}
        rotationIntensity={0.08} // ~3-5 degrees
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <primitive object={scene} scale={2.5} rotation={[0, -Math.PI / 8, 0]} />
      </Float>
    </group>
  );
}

export function ProductModel() {
  return (
    <div className="w-full h-[600px] pointer-events-none relative">
      {/* Radial glow to make product pop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent opacity-60 z-0"></div>
      
      <Canvas
        className="z-10 relative"
        shadows
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        {/* Very dim ambient light so the front faces stay mysterious/dark */}
        <ambientLight intensity={0.15} />

        {/* Soft key light from top-left */}
        <directionalLight position={[-3, 8, 4]} intensity={1.5} color="#ffffff" />

        {/* Champagne yellow rim light from behind-right */}
        <spotLight 
          position={[4, 3, -5]} 
          angle={0.8} 
          penumbra={1} 
          intensity={5} 
          color="#D4AF37" 
          distance={20}
        />

        {/* Floating mist particles */}
        <Sparkles count={40} scale={4} size={2} speed={0.4} opacity={0.3} color="#D4AF37" />

        {/* Controls to lock camera tilt and interaction */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
          minPolarAngle={Math.PI / 2 - 0.35} // ~20 degrees down
          maxPolarAngle={Math.PI / 2 - 0.35} 
          minAzimuthAngle={Math.PI / 6} // 30 degrees right
          maxAzimuthAngle={Math.PI / 6}
        />

        {/* Soft champagne glow below product */}
        <ContactShadows 
          position={[0, -1.8, 0]} 
          opacity={0.8} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#D4AF37" 
        />

        <Model />
      </Canvas>
    </div>
  );
}

// Preload the model so it displays faster
useGLTF.preload("/components/Nuoc-yen-sao-co-duong_textureGeneration.glb");
