'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

/**
 * ---- Manual tuning knobs ----
 * Adjust these directly to reposition/reorient/restyle the model.
 * Sizing is NOT a manual number here on purpose — <Bounds> below measures
 * the model's actual bounding box and frames it automatically, so this
 * keeps working no matter what scale the source file is authored at.
 */
const MODEL_POSITION: [number, number, number] = [0, 0, 0]; // [x, y, z] — small nudges only, big moves go via the CSS wrapper in Hero.tsx
const MODEL_ROTATION: [number, number, number] = [0, 0, 0]; // [x, y, z] radians — starting angle
const FIT_MARGIN = 1; // higher = more empty space around the model in frame
const ARROW_COLOR = '#FF8A59'; // brand light-turquoise
const OUTLINE_COLOR = '#ffffff';
const AUTO_SPIN_SPEED = 0.25; // idle rotation, radians/sec (~one full turn every 14s)
const SCROLL_SPIN_AMOUNT = 0.7; // extra rotation added as you scroll through the hero
const SCROLL_RISE_AMOUNT = 0.5; // upward drift added as you scroll through the hero
/** ------------------------------ */

useGLTF.preload('/brand/3D-arrow.glb');

function ArrowModel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/brand/3D-arrow.glb');

  // The exported model carries a broken all-black vertex-colour layer, which
  // (per the glTF spec) gets multiplied into the material and renders the
  // whole mesh solid black — strip it and apply a toon material + white
  // edge outline instead, matching the confirmed-working reference build.
  // Guarded with userData so this stays safe if the effect ever re-runs on
  // the same cached scene (React StrictMode, fast refresh, Suspense retry).
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
      {/* Bounds measures the model's real-world bounding box and frames the
          camera to fit it — no hardcoded scale number to get wrong. */}
      <Bounds fit clip observe={false} margin={FIT_MARGIN}>
        <Center>
          <primitive object={scene} />
        </Center>
      </Bounds>
    </group>
  );
}

type Props = {
  scrollProgress: MotionValue<number>;
  /** Temporarily enable mouse-drag orbit controls to find the right angle by hand. */
  debug?: boolean;
};

/** The hero's 3D cursor-arrow, rendered on a fully transparent canvas. */
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
