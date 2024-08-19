import * as React from 'react';
import { useRef, useEffect } from "react";

const SpidyWebs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dots: { x: number; y: number; size: number; color: string }[] = [];
    const arrayColors = ['#FFFFFF', '#CCCCCC', '#888888', '#FFD700', '#FF69B4'];

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      dots = [];
      for (let index = 0; index < 20; index++) {
        dots.push({
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          size: Math.random() * 2 + 1,
          color: arrayColors[Math.floor(Math.random() * 5)]
        });
      }
      drawDots();
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();
      const mouse = {
        x: event.pageX - container.getBoundingClientRect().left,
        y: event.pageY - container.getBoundingClientRect().top
      };
      dots.forEach(dot => {
        const distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 150) {
          ctx.strokeStyle = dot.color;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    };

    resizeCanvas();

    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-40" ref={containerRef}>
      <canvas ref={canvasRef} className="w-full"></canvas>
    </div>
  );
};

export default SpidyWebs;
