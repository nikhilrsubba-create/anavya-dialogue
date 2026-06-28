"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import FloatingLogo from "@/components/three/floating-logo";

export default function Hero3D() {
  const pointer = useRef({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);

    const handleMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className="w-full h-full" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        frameloop={reduceMotion ? "demand" : "always"}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 3, 4]} intensity={1.1} color="#FFF6E8" />
        <pointLight position={[-3, -2, 2]} intensity={0.4} color="#A35C37" />
        <Suspense fallback={null}>
          <FloatingLogo pointer={pointer.current} />
        </Suspense>
      </Canvas>
    </div>
  );
}
