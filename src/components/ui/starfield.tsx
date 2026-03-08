"use client";

import { useEffect, useRef } from "react";

type LayerId = "far" | "mid" | "near";

type Star = {
  layer: LayerId;
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  driftAmplitude: number;
  driftSpeed: number;
  driftPhase: number;
  twinkleSpeed: number;
  twinklePhase: number;
  alphaBase: number;
  alphaRange: number;
  pulseStrength: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: [number, number, number];
};

type LayerConfig = {
  id: LayerId;
  ratio: number;
  radiusMin: number;
  radiusMax: number;
  speedYMin: number;
  speedYMax: number;
  speedXMin: number;
  speedXMax: number;
  twinkleMin: number;
  twinkleMax: number;
  alphaMin: number;
  alphaMax: number;
  pulseChance: number;
  parallax: number;
  glowScale: number;
};

const LAYERS: LayerConfig[] = [
  {
    id: "far",
    ratio: 0.56,
    radiusMin: 0.45,
    radiusMax: 1.15,
    speedYMin: 0.004,
    speedYMax: 0.02,
    speedXMin: -0.01,
    speedXMax: 0.01,
    twinkleMin: 0.09,
    twinkleMax: 0.2,
    alphaMin: 0.2,
    alphaMax: 0.55,
    pulseChance: 0.04,
    parallax: 0.008,
    glowScale: 2.2,
  },
  {
    id: "mid",
    ratio: 0.32,
    radiusMin: 0.75,
    radiusMax: 1.6,
    speedYMin: 0.01,
    speedYMax: 0.034,
    speedXMin: -0.018,
    speedXMax: 0.018,
    twinkleMin: 0.12,
    twinkleMax: 0.32,
    alphaMin: 0.3,
    alphaMax: 0.72,
    pulseChance: 0.08,
    parallax: 0.014,
    glowScale: 2.8,
  },
  {
    id: "near",
    ratio: 0.12,
    radiusMin: 1.15,
    radiusMax: 2.05,
    speedYMin: 0.016,
    speedYMax: 0.046,
    speedXMin: -0.028,
    speedXMax: 0.028,
    twinkleMin: 0.18,
    twinkleMax: 0.46,
    alphaMin: 0.38,
    alphaMax: 0.88,
    pulseChance: 0.16,
    parallax: 0.022,
    glowScale: 3.4,
  },
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createStar(width: number, height: number, palette: [number, number, number][], layer: LayerConfig): Star {
  const color = palette[Math.floor(Math.random() * palette.length)];
  const hasPulse = Math.random() < layer.pulseChance;

  return {
    layer: layer.id,
    x: Math.random() * width,
    y: Math.random() * height,
    radius: randomBetween(layer.radiusMin, layer.radiusMax),
    speedX: randomBetween(layer.speedXMin, layer.speedXMax),
    speedY: randomBetween(layer.speedYMin, layer.speedYMax),
    driftAmplitude: randomBetween(0.55, 2.6),
    driftSpeed: randomBetween(0.045, 0.16),
    driftPhase: Math.random() * Math.PI * 2,
    twinkleSpeed: randomBetween(layer.twinkleMin, layer.twinkleMax),
    twinklePhase: Math.random() * Math.PI * 2,
    alphaBase: randomBetween(layer.alphaMin, layer.alphaMax),
    alphaRange: randomBetween(0.08, 0.26),
    pulseStrength: hasPulse ? randomBetween(0.05, 0.2) : 0,
    pulseSpeed: hasPulse ? randomBetween(0.04, 0.12) : 0,
    pulsePhase: Math.random() * Math.PI * 2,
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
    let scrollY = window.scrollY;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const computeStarCount = (width: number, height: number) => {
      const area = width * height;
      return Math.max(130, Math.min(320, Math.floor(area / 10500)));
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
      stars = [];

      for (const layer of LAYERS) {
        const layerCount = Math.floor(count * layer.ratio);
        for (let index = 0; index < layerCount; index += 1) {
          stars.push(createStar(width, height, palette, layer));
        }
      }
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

      const layerMap: Record<LayerId, LayerConfig> = {
        far: LAYERS[0],
        mid: LAYERS[1],
        near: LAYERS[2],
      };

      for (const star of stars) {
        const speedFactor = prefersReducedMotion ? 0.45 : 1;
        star.x += star.speedX * delta * speedFactor;
        star.y += star.speedY * delta * speedFactor;
        star.twinklePhase += star.twinkleSpeed * 0.012 * delta * speedFactor;
        star.driftPhase += star.driftSpeed * 0.015 * delta * speedFactor;
        star.pulsePhase += star.pulseSpeed * 0.01 * delta * speedFactor;

        if (star.x < -2) star.x = width + 2;
        if (star.x > width + 2) star.x = -2;
        if (star.y > height + 2) {
          star.y = -2;
          star.x = Math.random() * width;
        }

        const layer = layerMap[star.layer];
        const driftX = Math.sin(star.driftPhase) * star.driftAmplitude;
        const driftY = Math.cos(star.driftPhase * 0.9) * star.driftAmplitude * 0.45;
        const scrollOffset = scrollY * layer.parallax;
        const drawX = star.x + driftX;
        const drawY = star.y + driftY + scrollOffset;

        const twinkle = Math.sin(star.twinklePhase);
        const pulse = star.pulseStrength > 0 ? Math.max(0, Math.sin(star.pulsePhase)) * star.pulseStrength : 0;
        const alpha = Math.max(0.08, star.alphaBase + twinkle * star.alphaRange + pulse);
        const glowRadius = star.radius * (layer.glowScale + Math.max(0, twinkle) * 2.0 + pulse * 5.2);

        const gradient = context.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowRadius);
        gradient.addColorStop(0, `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${alpha * 0.34})`);
        gradient.addColorStop(1, `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, 0)`);

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(drawX, drawY, glowRadius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${Math.min(1, alpha + 0.15)})`;
        context.beginPath();
        context.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        context.fill();
      }

      rafId = window.requestAnimationFrame(render);
    };

    const onResize = () => resize();
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    resize();
    rafId = window.requestAnimationFrame(render);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
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
