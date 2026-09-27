"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import * as THREE from "three";

const CYAN = new THREE.Color("#22d3ee");
const VIOLET = new THREE.Color("#a855f7");
const AMBER = new THREE.Color("#fbbf24");

/** Deterministic PRNG so the particle field is identical on server and client. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Glowing faceted core at the centre of the constellation. */
function Core({ progress }: { progress: MotionValue<number> }) {
  const shell = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = progress.get();

    // the core swells slightly as the visitor reaches the projects section
    const scale = 1 + p * 0.45;
    if (shell.current) {
      shell.current.rotation.y += delta * 0.18;
      shell.current.rotation.x += delta * 0.07;
      shell.current.scale.setScalar(scale);
    }
    if (wire.current) {
      // counter-rotating wireframe reads as depth rather than noise
      wire.current.rotation.y -= delta * 0.12;
      wire.current.rotation.z += delta * 0.05;
      wire.current.scale.setScalar(scale * 1.14);
    }
    if (glow.current) {
      glow.current.intensity = 6 + Math.sin(t * 1.6) * 1.6 + p * 4;
    }
  });

  return (
    <group>
      <pointLight ref={glow} color={CYAN} intensity={7} distance={26} />
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#0b0e14"
          emissive={CYAN}
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.18}
          flatShading
        />
      </mesh>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

/** Three tilted rings, spreading apart as the page scrolls. */
function Rings({ progress }: { progress: MotionValue<number> }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);

  const configs = useMemo(
    () => [
      { radius: 2.5, tube: 0.012, tilt: [Math.PI / 2.4, 0, 0] as const, color: CYAN, speed: 0.1 },
      { radius: 3.4, tube: 0.009, tilt: [Math.PI / 2.9, Math.PI / 3, 0] as const, color: VIOLET, speed: -0.07 },
      { radius: 4.3, tube: 0.007, tilt: [Math.PI / 2.1, -Math.PI / 3.4, 0] as const, color: AMBER, speed: 0.05 },
    ],
    [],
  );

  const refs = [a, b, c];

  useFrame((_, delta) => {
    const p = progress.get();
    configs.forEach((cfg, i) => {
      const mesh = refs[i].current;
      if (!mesh) return;
      mesh.rotation.z += delta * cfg.speed;
      // rings drift outward, opening the constellation up
      const spread = 1 + p * 0.5;
      mesh.scale.setScalar(spread);
    });
  });

  return (
    <>
      {configs.map((cfg, i) => (
        <mesh
          key={cfg.radius}
          ref={refs[i]}
          rotation={cfg.tilt as unknown as [number, number, number]}
        >
          <torusGeometry args={[cfg.radius, cfg.tube, 8, 128]} />
          <meshBasicMaterial color={cfg.color} transparent opacity={0.5} />
        </mesh>
      ))}
    </>
  );
}

/** Small markers riding the rings. No text: labels stay in the HTML for SEO. */
function Nodes({ count = 10, progress }: { count?: number; progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const rand = mulberry32(20240917);
    return Array.from({ length: count }, (_, i) => {
      const ring = i % 3;
      const radius = [2.5, 3.4, 4.3][ring];
      return {
        angle: (i / count) * Math.PI * 2 + rand() * 0.4,
        radius,
        y: (rand() - 0.5) * 0.42,
        scale: 0.1 + rand() * 0.07,
        color: [CYAN, VIOLET, AMBER][ring],
      };
    });
  }, [count]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const p = progress.get();
    const spread = 1 + p * 0.5;

    group.current.children.forEach((child, i) => {
      const cfg = positions[i];
      const a = cfg.angle + t * (0.16 + (i % 5) * 0.02);
      child.position.set(
        Math.cos(a) * cfg.radius * spread,
        cfg.y + Math.sin(t * 0.8 + i) * 0.09,
        Math.sin(a) * cfg.radius * spread,
      );
      // gentle bob, out of phase per node
      child.scale.setScalar(cfg.scale * (1 + Math.sin(t * 1.4 + i * 0.7) * 0.16));
    });
  });

  return (
    <group ref={group}>
      {positions.map((cfg, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={cfg.color}
            emissive={cfg.color}
            emissiveIntensity={0.7}
            metalness={0.6}
            roughness={0.3}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

/** Ambient drift so the background is never completely still. */
function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(4242);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [CYAN, VIOLET, new THREE.Color("#5b6b8c")];
    for (let i = 0; i < count; i++) {
      // shell distribution keeps the field around the viewer, not in a cube
      const radius = 9 + rand() * 22;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.cos(phi) * 0.6;
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      const c = palette[Math.floor(rand() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Scroll-driven camera. Reads the MotionValue inside the frame loop so
 * scrolling never triggers a React re-render.
 */
function CameraRig({ progress }: { progress: MotionValue<number> }) {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const p = progress.get();
    // pull back and rise as the page scrolls past the hero
    const targetZ = 7.4 + p * 3.4;
    const targetY = -p * 1.9;

    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3, delta);

    // subtle pointer parallax, damped so it never feels twitchy
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      pointer.x * 0.42,
      2.4,
      delta,
    );
    camera.lookAt(0, camera.position.y * 0.55, 0);
  });

  return null;
}

export type SceneCanvasProps = {
  progress: MotionValue<number>;
  /** Pauses the render loop entirely when the tab is hidden. */
  active: boolean;
};

export default function SceneCanvas({ progress, active }: SceneCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 7.4], fov: 45, near: 0.1, far: 60 }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#05060a", 12, 34]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={0.8} color={VIOLET} />
      <directionalLight position={[-5, -2, 2]} intensity={0.5} color={CYAN} />

      <CameraRig progress={progress} />
      <group position={[0, 0.2, 0]}>
        <Core progress={progress} />
        <Rings progress={progress} />
        <Nodes progress={progress} />
      </group>
      <Particles />
    </Canvas>
  );
}
