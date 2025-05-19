'use client';

import React, { useEffect, useRef } from 'react';

const MoonCanvas = () => {
  const canvasRef = useRef(null);
  const phaseRef = useRef(1.01);
  const directionRef = useRef(-1); // Start going backwards

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const padding = 8;
    const center = Math.floor(canvas.width / 2) + 0.5;
    const diameter = canvas.width - padding * 2;
    const radius = diameter / 2;

    function drawMoon(ctx) {
      ctx.arc(center, center, radius, 0, 150);
    }

    function drawArc(ctx, start, end, offset, rCoef) {
      if (rCoef <= 1.0e-15) {
        ctx.moveTo(center, padding);
        ctx.arc(center, center, radius, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(center, padding);
        return;
      }
      const r = radius / rCoef;
      const c = Math.sqrt(Math.pow(r, 2) - Math.pow(radius, 2));
      const x = center + (offset * c);
      ctx.arc(x, center, r, start, end);
    }

    function drawShadow(ctx) {
      let coef = phaseRef.current;
      coef = Math.min(1.0, Math.max(0.0, coef));
      let rCoef, start, end, offset;

      if (coef > 0.5) {
        start = -Math.PI / 2;
        end = -start;
        rCoef = (coef - 0.5) * 2;
        ctx.moveTo(center, padding);
        drawArc(ctx, start, end, -1, rCoef);
        ctx.arc(center, center, radius, -start, start, true);
      } else {
        start = Math.PI / 2;
        end = 150;
        rCoef = 1 - (coef * 2);
        drawArc(ctx, start, end, 1, rCoef);
      }
    }

    function draw() {
        const phase = phaseRef.current;
      
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        // Draw the red moon full circle
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        drawMoon(ctx);
        ctx.fillStyle = '#ff4b33';
        ctx.fill();
        ctx.closePath();
      
        // Mask the crescent with destination-out
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        drawShadow(ctx);
        ctx.fill();
        ctx.closePath();

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 2;        // slightly wider than the fringe
        ctx.beginPath();
        drawShadow(ctx);          // same path
        ctx.stroke();             // stroke, not fill
        ctx.closePath();
      
      
        ctx.globalCompositeOperation = 'source-over';
      
        // Smooth speed offset (phase in [0,1])
        const phaseOffset = -0.039 * Math.pow(phase - 0.5, 2) + 0.01;
      
        // Update phase with direction
        phaseRef.current += phaseOffset * directionRef.current;
      
        // Reverse direction at bounds 0 and 1 (no overshoot)
        if (phaseRef.current <= 0) {
          phaseRef.current = 0;
          directionRef.current = 1;
        } else if (phaseRef.current >= 1) {
          phaseRef.current = 1;
          directionRef.current = -1;
        }
      }

    const intervalId = setInterval(draw, 2.5);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={150}
      height={150}
      style={{ backgroundColor: 'transparent' }}
    />
  );
};

export default MoonCanvas;
