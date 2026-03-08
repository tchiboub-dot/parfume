"use client";

import { useEffect, useRef } from "react";

export function Starfield() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrollY = 0;

    const render = () => {
      const p1 = `translate3d(${pointerX * 0.012}px, ${pointerY * 0.01 + scrollY * 0.016}px, 0)`;
      const p2 = `translate3d(${pointerX * -0.014}px, ${pointerY * -0.01 + scrollY * -0.012}px, 0)`;
      const p3 = `translate3d(${pointerX * 0.007}px, ${pointerY * -0.007 + scrollY * 0.008}px, 0)`;

      if (layer1Ref.current) layer1Ref.current.style.transform = p1;
      if (layer2Ref.current) layer2Ref.current.style.transform = p2;
      if (layer3Ref.current) layer3Ref.current.style.transform = p3;
      rafId = 0;
    };

    const schedule = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      pointerX = event.clientX - cx;
      pointerY = event.clientY - cy;
      schedule();
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      schedule();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    schedule();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Global fixed star layer that stays visible through scroll on every page.
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-10"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      {/* Radial gradient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(214,171,73,0.12),transparent_40%),radial-gradient(circle_at_72%_10%,rgba(139,166,217,0.1),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(227,235,255,0.07),transparent_30%)]" />
      
      {/* Star layers */}
      <div ref={layer1Ref} className="absolute inset-0 stars-layer-1 stars-parallax" />
      <div ref={layer2Ref} className="absolute inset-0 stars-layer-2 stars-parallax" />
      <div ref={layer3Ref} className="absolute inset-0 stars-layer-3 stars-parallax" />
      
      {/* Subtle base glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25 pointer-events-none" />
    </div>
  );
}
