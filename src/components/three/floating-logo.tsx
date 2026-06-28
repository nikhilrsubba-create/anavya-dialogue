"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * The brand mark, rendered as a real lit plane in 3D space.
 * It bobs, wobbles, and tilts toward the cursor -- a believable "floating
 * medallion" rather than a flat sticker, with a slowly spinning gold ring
 * (echoing the logo's own circular motif) and warm ambient sparkles.
 */
export default function FloatingLogo({ pointer }: { pointer: { x: number; y: number } }) {
  const texture = useTexture("/logo.jpeg");
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Keep the plane's aspect ratio true to the source image instead of stretching it
  const aspect = useMemo(() => {
    const img = texture.image as HTMLImageElement | undefined;
    return img && img.width && img.height ? img.width / img.height : 1;
  }, [texture]);

  const baseSize = Math.min(viewport.width, viewport.height) * 0.62;
  const planeWidth = aspect >= 1 ? baseSize : baseSize * aspect;
  const planeHeight = aspect >= 1 ? baseSize / aspect : baseSize;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle idle bob + wobble
    group.current.position.y = Math.sin(t * 0.6) * 0.12;
    const idleRotY = Math.sin(t * 0.4) * 0.18;
    const idleRotX = Math.sin(t * 0.5) * 0.05;

    // Smoothly ease toward cursor-driven parallax tilt
    const targetRotY = idleRotY + pointer.x * 0.35;
    const targetRotX = idleRotX - pointer.y * 0.25;
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.06;

    if (ring.current) ring.current.rotation.z = t * 0.18;
    if (ring2.current) ring2.current.rotation.z = -t * 0.13;
  });

  return (
    <group ref={group}>
      {/* The actual logo, lit as a real surface in the scene */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshStandardMaterial
          map={texture}
          transparent
          roughness={0.35}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* A slim halo behind it, in brand gold, for depth + a sense of thickness */}
      <mesh position={[0, 0, -0.08]}>
        <circleGeometry args={[planeWidth * 0.62, 64]} />
        <meshStandardMaterial color="#C5A880" roughness={0.5} metalness={0.2} transparent opacity={0.5} />
      </mesh>

      {/* Two slowly counter-rotating rings echoing the logo's own circular motif */}
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[planeWidth * 0.66, 0.012, 16, 100]} />
        <meshStandardMaterial color="#A35C37" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2.2, 0.3, 0]}>
        <torusGeometry args={[planeWidth * 0.78, 0.008, 16, 100]} />
        <meshStandardMaterial color="#C5A880" roughness={0.3} metalness={0.4} transparent opacity={0.6} />
      </mesh>

      <Sparkles count={28} scale={[planeWidth * 1.8, planeHeight * 1.8, 1.2]} size={2.4} speed={0.25} color="#C5A880" opacity={0.6} />
    </group>
  );
}
