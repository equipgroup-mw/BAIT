'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber'; // <-- Added useThree
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

const MODEL_POSITION: [number, number, number] = [0, 0, 0];
const MODEL_ROTATION: [number, number, number] = [0, 0, 0];
const FIT_MARGIN_DESKTOP = 1; // Original desktop margin
const FIT_MARGIN_MOBILE = 1.2; // Larger margin for mobile so it doesn't crop
const ARROW_COLOR = '#FF7045';
const OUTLINE_COLOR = '#ffffff';
const AUTO_SPIN_SPEED = 0.25;
const SCROLL_SPIN_AMOUNT = 0.7;
const SCROLL_RISE_AMOUNT = 0.5;

useGLTF.preload('/brand/3D-arrow.glb');

function ArrowModel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/brand/3D-arrow.glb');
  
  // Check the actual pixel width of the canvas
  const { size } = useThree();
  const isMobile = size.width < 768; // 768px is Tailwind's md: breakpoint
  const currentMargin = isMobile ? FIT_MARGIN_MOBILE : FIT_MARGIN_DESKTOP;

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh || mesh.userData.brandStyled) return;
      mesh.userData.brandStyled = true;

      mesh.geometry.deleteAttribute('color');
      mesh.material = new THREE.MeshToonMaterial({ color: ARROW_COLOR });

      const edges = new THREE.EdgesGeometry(mesh.geometry, 30);
      const outline = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: OUTLINE_COLOR, linewidth: 2 })
      );
      mesh.add(outline);
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const p = scrollProgress.get();
    group.current.rotation.y += delta * AUTO_SPIN_SPEED;
    group.current.rotation.z = MODEL_ROTATION[2] + p * SCROLL_SPIN_AMOUNT;
    group.current.position.y = MODEL_POSITION[1] + p * SCROLL_RISE_AMOUNT;
  });

  return (
    <group ref={group} position={MODEL_POSITION} rotation={MODEL_ROTATION}>
      {/* Pass the dynamic margin here */}
      <Bounds fit clip observe={false} margin={currentMargin}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Bounds>
    </group>
  );
}

type Props = {
  scrollProgress: MotionValue<number>;
  debug?: boolean;
};

export default function HeroArrowScene({ scrollProgress, debug = false }: Props) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 2, 2]} intensity={2.5} />
      <Suspense fallback={null}>
        <ArrowModel scrollProgress={scrollProgress} />
      </Suspense>
      {debug && <OrbitControls />}
    </Canvas>
  );
}