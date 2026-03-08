"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  twinkleSpeed: number;
  twinklePhase: number;
  alphaBase: number;
  alphaRange: number;
  color: [number, number, number];
};

function createStar(width: number, height: number, palette: [number, number, number][]): Star {
  const color = palette[Math.floor(Math.random() * palette.length)];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.7 + Math.random() * 1.8,
    speedX: (Math.random() - 0.5) * 0.03,
    speedY: 0.01 + Math.random() * 0.05,
    twinkleSpeed: 0.15 + Math.random() * 0.4,
    twinklePhase: Math.random() * Math.PI * 2,
    alphaBase: 0.35 + Math.random() * 0.35,
    alphaRange: 0.2 + Math.random() * 0.22,
    color,
  };
}

function getPalette(isLight: boolean): [number, number, number][] {
  if (isLight) {
    return [
      [206, 214, 230], // soft silver
      [176, 197, 236], // pale blue-white
      [232, 227, 210], // champagne-white
    ];
  }

  return [
    [235, 207, 142], // soft gold
    [229, 236, 255], // silver-white
    [166, 188, 245], // faint blue
  ];
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let rafId = 0;
    let lastTimestamp = performance.now();
    let stars: Star[] = [];
    let isLight = document.documentElement.classList.contains("light");

    const computeStarCount = (width: number, height: number) => {
      const area = width * height;
      return Math.max(110, Math.min(260, Math.floor(area / 12000)));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const palette = getPalette(isLight);
      const count = computeStarCount(width, height);
      stars = Array.from({ length: count }, () => createStar(width, height, palette));
    };

    const mutationObserver = new MutationObserver(() => {
      const nextIsLight = document.documentElement.classList.contains("light");
      if (nextIsLight !== isLight) {
        isLight = nextIsLight;
        resize();
      }
    });

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const render = (timestamp: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const delta = Math.min((timestamp - lastTimestamp) / 16.6667, 2.2);
      lastTimestamp = timestamp;

      context.clearRect(0, 0, width, height);

      // Dim cinematic haze for premium depth.
      const haze = context.createRadialGradient(width * 0.58, height * 0.22, 0, width * 0.58, height * 0.22, Math.max(width, height) * 0.85);
      if (isLight) {
        haze.addColorStop(0, "rgba(160, 176, 214, 0.08)");
        haze.addColorStop(1, "rgba(255, 255, 255, 0)");
      } else {
        haze.addColorStop(0, "rgba(214, 171, 73, 0.08)");
        haze.addColorStop(1, "rgba(0, 0, 0, 0)");
      }
      context.fillStyle = haze;
      context.fillRect(0, 0, width, height);

      for (const star of stars) {
        star.x += star.speedX * delta;
        star.y += star.speedY * delta;
        star.twinklePhase += star.twinkleSpeed * 0.012 * delta;

        if (star.x < -2) star.x = width + 2;
        if (star.x > width + 2) star.x = -2;
        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }

        const twinkle = Math.sin(star.twinklePhase);
        const alpha = Math.max(0.1, star.alphaBase + twinkle * star.alphaRange);
        const glowRadius = star.radius * (3.4 + Math.max(0, twinkle) * 2.4);

        const gradient = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius);
        gradient.addColorStop(0, `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha})`);
        gradient.addColorStop(0.45, `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha * 0.35})`);
        gradient.addColorStop(1, `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, 0)`);

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${Math.min(1, alpha + 0.15)})`;
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      }

      rafId = window.requestAnimationFrame(render);
    };

    const onResize = () => resize();

    resize();
    rafId = window.requestAnimationFrame(render);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      mutationObserver.disconnect();
      window.cancelAnimationFrame(rafId);
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
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      {/* Soft premium gradients to blend the starfield with the fragrance atmosphere. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(214,171,73,0.09),transparent_42%),radial-gradient(circle_at_72%_10%,rgba(139,166,217,0.09),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(227,235,255,0.06),transparent_30%)]" />
      
      {/* Subtle base glow overlay */}
      <div className="starfield-vignette absolute inset-0 pointer-events-none" />
    </div>
  );
}
