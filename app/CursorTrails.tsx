"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

const trailConfig = [
  { color: "116, 88, 255", speed: 0.18, width: 2.4, offset: -18 },
  { color: "64, 224, 184", speed: 0.14, width: 2, offset: 12 },
  { color: "116, 177, 255", speed: 0.11, width: 1.6, offset: 34 },
];

export function CursorTrails() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target: Point = { x: window.innerWidth * 0.68, y: window.innerHeight * 0.32 };
    let pointerActive = false;
    let frame = 0;
    let animationId = 0;
    let width = 1;
    let height = 1;
    let ratio = 1;

    const trails = trailConfig.map(() =>
      Array.from({ length: 48 }, () => ({ x: target.x, y: target.y })),
    );

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerActive = true;
      target.x = event.clientX;
      target.y = event.clientY;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const drawCurve = (points: Point[], color: string, lineWidth: number) => {
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let index = 1; index < points.length - 1; index += 1) {
        const midpointX = (points[index].x + points[index + 1].x) * 0.5;
        const midpointY = (points[index].y + points[index + 1].y) * 0.5;
        context.quadraticCurveTo(points[index].x, points[index].y, midpointX, midpointY);
      }
      context.strokeStyle = `rgba(${color}, 0.72)`;
      context.lineWidth = lineWidth;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowBlur = 24;
      context.shadowColor = `rgba(${color}, 0.8)`;
      context.stroke();

      context.strokeStyle = `rgba(${color}, 0.16)`;
      context.lineWidth = lineWidth * 5;
      context.shadowBlur = 36;
      context.stroke();
      context.shadowBlur = 0;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const time = frame * 0.012;

      if (!pointerActive) {
        target.x = width * 0.68 + Math.cos(time * 0.52) * Math.min(210, width * 0.16);
        target.y = height * 0.32 + Math.sin(time * 0.7) * Math.min(130, height * 0.14);
      }

      context.globalCompositeOperation = "lighter";
      trails.forEach((points, trailIndex) => {
        const config = trailConfig[trailIndex];
        const headX = target.x + Math.cos(time * 1.2 + trailIndex * 2.1) * config.offset;
        const headY = target.y + Math.sin(time * 1.4 + trailIndex * 1.7) * config.offset;
        points[0].x += (headX - points[0].x) * config.speed;
        points[0].y += (headY - points[0].y) * config.speed;

        for (let index = 1; index < points.length; index += 1) {
          const follow = 0.22 - Math.min(index * 0.0017, 0.07);
          points[index].x += (points[index - 1].x - points[index].x) * follow;
          points[index].y += (points[index - 1].y - points[index].y) * follow;
        }

        drawCurve(points, config.color, config.width);
        context.beginPath();
        context.arc(points[0].x, points[0].y, 3.5, 0, Math.PI * 2);
        context.fillStyle = `rgba(${config.color}, 0.95)`;
        context.shadowBlur = 24;
        context.shadowColor = `rgba(${config.color}, 1)`;
        context.fill();
        context.shadowBlur = 0;
      });
      context.globalCompositeOperation = "source-over";

      frame += 1;
      if (!reducedMotion && !document.hidden) animationId = requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      if (document.hidden) cancelAnimationFrame(animationId);
      else if (!reducedMotion) animationId = requestAnimationFrame(draw);
    };

    resize();
    if (reducedMotion) {
      trails.forEach((points, trailIndex) => {
        points.forEach((point, index) => {
          point.x = width * 0.28 + index * 16;
          point.y = height * (0.24 + trailIndex * 0.08) + Math.sin(index * 0.22) * 30;
        });
      });
    }
    draw();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trails" aria-hidden="true" />;
}
