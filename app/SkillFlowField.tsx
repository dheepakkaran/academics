"use client";

import { useEffect, useRef } from "react";

type SkillNode = {
  label: string;
  fullName: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

const skills = [
  ["Py", "Python"],
  ["J", "Java"],
  ["C++", "C++"],
  ["SQL", "SQL"],
  ["ML", "Machine learning"],
  ["API", "REST APIs"],
  ["PT", "PyTorch"],
  ["CV", "Computer vision"],
  ["DK", "Docker"],
  ["Git", "Git/GitHub"],
  ["K", "Kafka"],
  ["AWS", "AWS"],
  ["PLC", "PLC programming"],
  ["Li", "Linux"],
] as const;

function seeded(index: number, offset: number) {
  const value = Math.sin(index * 891.17 + offset * 173.31) * 43758.5453;
  return value - Math.floor(value);
}

export function SkillFlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0, active: false };
    let width = window.innerWidth;
    let height = window.innerHeight;
    let ratio = Math.min(window.devicePixelRatio || 1, 2);
    let frame = 0;
    let animationId = 0;

    const nodes: SkillNode[] = skills.map(([label, fullName], index) => ({
      label,
      fullName,
      x: width * (0.52 + seeded(index, 1) * 0.42),
      y: height * (0.09 + seeded(index, 2) * 0.82),
      vx: (seeded(index, 3) - 0.5) * 0.35,
      vy: (seeded(index, 4) - 0.5) * 0.35,
      radius: label.length > 2 ? 25 : 22,
      phase: seeded(index, 5) * Math.PI * 2,
    }));

    const resize = () => {
      const previousWidth = width || window.innerWidth;
      const previousHeight = height || window.innerHeight;
      width = window.innerWidth;
      height = window.innerHeight;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      nodes.forEach((node) => {
        node.x = (node.x / previousWidth) * width;
        node.y = (node.y / previousHeight) * height;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      const nextX = event.clientX;
      const nextY = event.clientY;
      if (!pointer.active) {
        pointer.lastX = nextX;
        pointer.lastY = nextY;
      }
      pointer.vx = nextX - pointer.lastX;
      pointer.vy = nextY - pointer.lastY;
      pointer.x = nextX;
      pointer.y = nextY;
      pointer.lastX = nextX;
      pointer.lastY = nextY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.vx = 0;
      pointer.vy = 0;
    };

    const roundedRect = (x: number, y: number, size: number) => {
      const radius = 8;
      context.beginPath();
      context.roundRect(x - size, y - size, size * 2, size * 2, radius);
    };

    const drawNode = (node: SkillNode, index: number) => {
      const size = node.radius;
      context.save();
      roundedRect(node.x, node.y, size);
      context.fillStyle = index % 4 === 0 ? "#111111" : "rgba(255, 255, 255, 0.94)";
      context.strokeStyle = "rgba(0, 0, 0, 0.72)";
      context.lineWidth = 1;
      context.fill();
      context.stroke();

      context.fillStyle = index % 4 === 0 ? "#ffffff" : "#111111";
      context.font = `600 ${node.label.length > 2 ? 9 : 11}px Arial, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(node.label, node.x, node.y + 0.5);
      context.restore();
    };

    const update = () => {
      const time = frame * 0.012;
      pointer.vx *= 0.84;
      pointer.vy *= 0.84;

      nodes.forEach((node, index) => {
        node.vx += Math.cos(time * 0.72 + node.phase) * 0.009;
        node.vy += Math.sin(time * 0.61 + node.phase) * 0.009;

        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.max(Math.hypot(dx, dy), 1);
          const normalX = dx / distance;
          const normalY = dy / distance;
          const influence = Math.max(0, 1 - distance / 430);

          if (influence > 0) {
            const compressionRadius = 72 + (index % 3) * 11;
            const compression = (distance - compressionRadius) * 0.0018 * influence;
            const pointerSpeed = Math.min(Math.hypot(pointer.vx, pointer.vy), 34);
            const flow = pointerSpeed * 0.0026 * influence;

            node.vx += normalX * compression + pointer.vx * 0.018 * influence - normalY * flow;
            node.vy += normalY * compression + pointer.vy * 0.018 * influence + normalX * flow;

            if (distance < 48) {
              node.vx -= normalX * 0.9;
              node.vy -= normalY * 0.9;
            }
          }
        }

        const margin = node.radius + 6;
        if (node.x < margin) node.vx += 0.08;
        if (node.x > width - margin) node.vx -= 0.08;
        if (node.y < margin) node.vy += 0.08;
        if (node.y > height - margin) node.vy -= 0.08;

        node.vx *= 0.965;
        node.vy *= 0.965;
        const velocity = Math.hypot(node.vx, node.vy);
        if (velocity > 5.8) {
          node.vx = (node.vx / velocity) * 5.8;
          node.vy = (node.vy / velocity) * 5.8;
        }
        node.x += node.vx;
        node.y += node.vy;
      });
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const a = nodes[first];
          const b = nodes[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 145) {
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(0, 0, 0, ${Math.max(0.03, (1 - distance / 145) * 0.16)})`;
            context.lineWidth = 0.7;
            context.stroke();
          }
        }
      }

      nodes.forEach(drawNode);

      if (pointer.active) {
        context.beginPath();
        context.arc(pointer.x, pointer.y, 72, 0, Math.PI * 2);
        context.setLineDash([3, 7]);
        context.strokeStyle = "rgba(0, 0, 0, 0.22)";
        context.lineWidth = 0.8;
        context.stroke();
        context.setLineDash([]);

        context.beginPath();
        context.moveTo(pointer.x - 7, pointer.y);
        context.lineTo(pointer.x + 7, pointer.y);
        context.moveTo(pointer.x, pointer.y - 7);
        context.lineTo(pointer.x, pointer.y + 7);
        context.strokeStyle = "rgba(0, 0, 0, 0.62)";
        context.stroke();
      }
    };

    const animate = () => {
      update();
      draw();
      frame += 1;
      if (!reducedMotion && !document.hidden) animationId = requestAnimationFrame(animate);
    };

    const onVisibilityChange = () => {
      cancelAnimationFrame(animationId);
      if (!document.hidden && !reducedMotion) animationId = requestAnimationFrame(animate);
    };

    resize();
    if (reducedMotion) draw();
    else animationId = requestAnimationFrame(animate);

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

  return <canvas ref={canvasRef} className="skill-flow-field" aria-hidden="true" />;
}
