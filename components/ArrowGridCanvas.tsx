'use client';

import { useEffect, useRef } from 'react';

export default function ArrowGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arrowsRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let animationFrameId: number;

    // Setup Arrow Grid
    const setupGrid = () => {
      arrowsRef.current = [];
      const spacing = 60; // Distance between arrows
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          arrowsRef.current.push({
            x: i * spacing,
            y: j * spacing,
            baseX: i * spacing,
            baseY: j * spacing,
            size: 12,
            // Offset alternating rows to mimic a fabric/tile pattern
            offset: j % 2 === 0 ? 0 : spacing / 2, 
          });
        }
      }
    };

    setupGrid();

    // Track mouse for interactive dispersal
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Draw Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#32b498'; // Brand green
      ctx.lineWidth = 2;

      arrowsRef.current.forEach((arrow) => {
        // Mouse interaction (push arrows away)
        const dx = arrow.x - mouseRef.current.x;
        const dy = arrow.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 40;
          const angle = Math.atan2(dy, dx);
          arrow.x = arrow.baseX + Math.cos(angle) * force;
          arrow.y = arrow.baseY + Math.sin(angle) * force;
        } else {
          // Ease back to original position
          arrow.x += (arrow.baseX - arrow.x) * 0.1;
          arrow.y += (arrow.baseY - arrow.y) * 0.1;
        }

        // Draw the Arrow Shard
        ctx.save();
        ctx.translate(arrow.x + arrow.offset, arrow.y);
        ctx.beginPath();
        ctx.moveTo(0, -arrow.size);
        ctx.lineTo(arrow.size, 0);
        ctx.lineTo(0, arrow.size);
        ctx.lineTo(-arrow.size, 0);
        ctx.closePath();
        
        // Dynamic opacity based on proximity to mouse
        ctx.globalAlpha = dist < maxDist ? 0.1 : 0.4;
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      setupGrid();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      aria-hidden="true"
    />
  );
}