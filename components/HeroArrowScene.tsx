'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { Bounds, Center, OrbitControls, Sparkles, shaderMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

// Constants
const MODEL_POSITION: [number, number, number] = [0, 0, 0];
const MODEL_ROTATION: [number, number, number] = [0, 0, 0];
const FIT_MARGIN_DESKTOP = 1;
const FIT_MARGIN_MOBILE = 1.2;
const INITIAL_COLOR = '#FF8A59';
const OUTLINE_COLOR = '#ffffff';
const AUTO_SPIN_SPEED = 0.25;
const SCROLL_SPIN_AMOUNT = 0.7;
const SCROLL_RISE_AMOUNT = 0.5;
const MOBILE_BREAKPOINT = 768;
const TRANSFORM_DURATION = 1.1; // seconds for the dissolve wave to sweep the model
const SPARK_LIFETIME_MS = 1400;
const LIGHT_DIR = new THREE.Vector3(1, 2, 2).normalize();
const AMBIENT_FLOOR = 0.75; // brightness floor for unlit faces (0 = black shadow side, 1 = fully flat/no shading)

// A predefined palette of colors to cycle through on click
const COLOR_PALETTE = ['#FF8A59', '#72C2B9', '#32B498', '#f6ebe2', '#D9B591'];

useGLTF.preload('/brand/3D-arrow.glb');

// ---------------------------------------------------------------------------
// Nanite dissolve material — toon-shaded, with an outward energy wave that
// sweeps from a click origin and reveals the new color underneath the old
// one as it passes. The edge is jittered with noise so it reads as jagged
// "nanoparticle" disassembly rather than a clean geometric wipe.
// ---------------------------------------------------------------------------
const NanoDissolveMaterial = shaderMaterial(
  {
    uColorFrom: new THREE.Color(INITIAL_COLOR),
    uColorTo: new THREE.Color(INITIAL_COLOR),
    uEdgeColor: new THREE.Color('#ffffff'),
    uOrigin: new THREE.Vector3(0, 0, 0),
    uProgress: 0, // 0 = fully old color, 1 = fully new color
    uRadius: 1, // local-space bounding radius of this mesh, for normalizing distance
    uEdgeWidth: 0.18,
    uNoiseScale: 6.0,
    uLightDir: LIGHT_DIR,
    uAmbient: AMBIENT_FLOOR,
  },
  // vertex shader
  /* glsl */ `
    varying vec3 vPosition;
    varying vec3 vNormal;
    void main() {
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /* glsl */ `
    uniform vec3 uColorFrom;
    uniform vec3 uColorTo;
    uniform vec3 uEdgeColor;
    uniform vec3 uOrigin;
    uniform float uProgress;
    uniform float uRadius;
    uniform float uEdgeWidth;
    uniform float uNoiseScale;
    uniform vec3 uLightDir;
    uniform float uAmbient;

    varying vec3 vPosition;
    varying vec3 vNormal;

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
        f.z
      );
    }

    void main() {
      float dist = length(vPosition - uOrigin) / max(uRadius, 0.0001);
      float jitter = (noise(vPosition * uNoiseScale) - 0.5) * 0.35;
      float d = dist + jitter;

      float wave = uProgress * 1.5; // overshoot so the wave fully clears the model
      float edge = smoothstep(wave - uEdgeWidth, wave, d) - smoothstep(wave, wave + uEdgeWidth, d);
      float revealed = step(d, wave);

      vec3 base = mix(uColorFrom, uColorTo, revealed);

      // Toon-banded shading with an ambient floor so faces facing away
      // from the light don't crush toward black.
      float ndl = max(dot(vNormal, uLightDir), 0.0);
      float band = uAmbient + (1.0 - uAmbient) * smoothstep(0.0, 1.0, ndl);
      vec3 shaded = base * band;

      // Glowing energy band right at the wavefront
      vec3 finalColor = mix(shaded, uEdgeColor, clamp(edge * 1.2, 0.0, 1.0));

      gl_FragColor = vec4(finalColor, 1.0);

      // Convert from the internal linear working color space back to the
      // renderer's output color space (sRGB). Built-in materials like
      // MeshToonMaterial do this automatically; a raw ShaderMaterial does
      // not, which is why colors were reading darker/duller than the hex
      // values passed in, regardless of any lighting/ambient tuning.
      #include <colorspace_fragment>
    }
  `
);

type TransformState = {
  active: boolean;
  start: number;
};

function ArrowModel({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const boundsRef = useRef<any>(null);
  const { scene } = useGLTF('/brand/3D-arrow.glb');

  const { size, clock } = useThree();
  const isMobile = size.width < MOBILE_BREAKPOINT;
  const currentMargin = isMobile ? FIT_MARGIN_MOBILE : FIT_MARGIN_DESKTOP;

  const [currentColor, setCurrentColor] = useState<string>(INITIAL_COLOR);
  const [sparkOrigin, setSparkOrigin] = useState<[number, number, number] | null>(null);
  const [sparkKey, setSparkKey] = useState(0);
  const sparkTimeout = useRef<ReturnType<typeof setTimeout>>();

  const transformRef = useRef<TransformState>({ active: false, start: 0 });

  // Build (once) the styled scene: nanite material + outline per mesh
  const styledScene = useMemo(() => {
    if (!scene.userData.initialized) {
      scene.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;

        mesh.userData.brandStyled = true;
        mesh.geometry.deleteAttribute('color');
        mesh.geometry.computeBoundingSphere();
        const radius = mesh.geometry.boundingSphere?.radius ?? 1;

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat: THREE.Material) => mat.dispose());
        } else if (mesh.material) {
          mesh.material.dispose();
        }

        const material: any = new (NanoDissolveMaterial as any)();
        material.uColorFrom = new THREE.Color(INITIAL_COLOR);
        material.uColorTo = new THREE.Color(INITIAL_COLOR);
        material.uRadius = radius;
        material.uAmbient = AMBIENT_FLOOR;
        // Explicit, in case any upstream code path defaults this to true
        material.transparent = false;
        // Skip the renderer's tone-mapping curve for this material so the
        // brand hex colors render exactly as specified, not remapped
        material.toneMapped = false;
        mesh.material = material;
        mesh.userData.nanoMaterial = material;

        const edges = new THREE.EdgesGeometry(mesh.geometry, 30);
        const outline = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: OUTLINE_COLOR, linewidth: 2 })
        );
        mesh.add(outline);
      });
      scene.userData.initialized = true;
    }
    return scene;
  }, [scene]);

  useEffect(() => {
    if (boundsRef.current) {
      boundsRef.current.fit();
    }
  }, [isMobile, currentMargin]);

  useEffect(() => () => sparkTimeout.current && clearTimeout(sparkTimeout.current), []);

  useFrame((_, delta) => {
    if (!group.current) return;

    const p = scrollProgress.get();
    group.current.rotation.y += delta * AUTO_SPIN_SPEED;
    group.current.rotation.z = MODEL_ROTATION[2] + p * SCROLL_SPIN_AMOUNT;
    group.current.position.y = MODEL_POSITION[1] + p * SCROLL_RISE_AMOUNT;

    const t = transformRef.current;
    if (t.active) {
      const elapsed = clock.getElapsedTime() - t.start;
      const progress = Math.min(elapsed / TRANSFORM_DURATION, 1);

      styledScene.traverse((child) => {
        const mat = (child as THREE.Mesh).userData?.nanoMaterial as any;
        if (mat) mat.uProgress = progress;
      });

      if (progress >= 1) t.active = false;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();

    const nextColor = COLOR_PALETTE[(COLOR_PALETTE.indexOf(currentColor) + 1) % COLOR_PALETTE.length];

    // Fire the wave from the exact clicked point, converted into each
    // mesh's own local space (meshes can sit at different local transforms).
    styledScene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.userData?.nanoMaterial as any;
      if (!mat) return;

      mat.uOrigin = mesh.worldToLocal(e.point.clone());
      mat.uColorFrom = new THREE.Color(currentColor);
      mat.uColorTo = new THREE.Color(nextColor);
      mat.uProgress = 0;
    });

    transformRef.current = { active: true, start: clock.getElapsedTime() };

    if (sparkTimeout.current) clearTimeout(sparkTimeout.current);
    setSparkOrigin([e.point.x, e.point.y, e.point.z]);
    setSparkKey((k) => k + 1);
    sparkTimeout.current = setTimeout(() => setSparkOrigin(null), SPARK_LIFETIME_MS);

    setCurrentColor(nextColor);
  };

  return (
    <group
      ref={group}
      position={MODEL_POSITION}
      rotation={MODEL_ROTATION}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <Bounds ref={boundsRef} fit clip observe={false} margin={currentMargin}>
        <Center>
          <primitive object={styledScene} />
        </Center>
      </Bounds>
      {sparkOrigin && (
        <Sparkles
          key={sparkKey}
          position={sparkOrigin}
          count={40}
          scale={1.2}
          size={3}
          speed={1.5}
          color={currentColor}
          noise={1}
        />
      )}
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