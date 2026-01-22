'use client';

import { useEffect, useRef } from 'react';

interface RainbowGridProps {
  className?: string;
}

export function RainbowGrid({ className = '' }: RainbowGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let animationId: number | null = null;

    const gridSize = 60;

    const colors = [
      { r: 255, g: 140, b: 160 },
      { r: 255, g: 180, b: 120 },
      { r: 255, g: 220, b: 140 },
      { r: 160, g: 255, b: 180 },
      { r: 140, g: 200, b: 255 },
      { r: 180, g: 160, b: 255 },
      { r: 255, g: 160, b: 200 },
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function getColorAtPosition(x: number, y: number, time: number) {
      const waveX = Math.sin(x * 0.008 + time * 2) * 0.5 + 0.5;
      const waveY = Math.sin(y * 0.006 + time * 1.5 + 1) * 0.5 + 0.5;
      const wave = (waveX + waveY) * 0.5;

      const colorIndex = (wave * colors.length + time * 3) % colors.length;
      const colorA = colors[Math.floor(colorIndex) % colors.length];
      const colorB = colors[Math.ceil(colorIndex) % colors.length];
      const t = colorIndex % 1;

      return {
        r: colorA.r + (colorB.r - colorA.r) * t,
        g: colorA.g + (colorB.g - colorA.g) * t,
        b: colorA.b + (colorB.b - colorA.b) * t,
      };
    }

    function getIntensityAtPosition(x: number, y: number, time: number) {
      const pulse1 = Math.sin(x * 0.01 + time * 3) * 0.5 + 0.5;
      const pulse2 = Math.sin(y * 0.012 - time * 2) * 0.5 + 0.5;
      const pulse3 = Math.sin((x + y) * 0.005 + time * 1.5) * 0.5 + 0.5;

      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
      const radialFade = 1 - Math.pow(dist / maxDist, 1.5);

      return (pulse1 * 0.3 + pulse2 * 0.3 + pulse3 * 0.4) * radialFade;
    }

    function draw() {
      if (!ctx) return;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const time = scrollProgress;

      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y < height; y += 4) {
          const intensity = getIntensityAtPosition(x, y, time);
          if (intensity < 0.1) continue;

          const color = getColorAtPosition(x, y, time);
          const alpha = intensity * 0.12;

          ctx.strokeStyle = `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, Math.min(y + 4, height));
          ctx.stroke();
        }
      }

      for (let y = 0; y <= height; y += gridSize) {
        for (let x = 0; x < width; x += 4) {
          const intensity = getIntensityAtPosition(x, y, time);
          if (intensity < 0.1) continue;

          const color = getColorAtPosition(x, y, time);
          const alpha = intensity * 0.12;

          ctx.strokeStyle = `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(Math.min(x + 4, width), y);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function handleScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = window.scrollY / docHeight;
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    draw();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`rainbow-grid-canvas fixed inset-0 z-2 pointer-events-none opacity-80 mix-blend-screen ${className}`}
    />
  );
}
