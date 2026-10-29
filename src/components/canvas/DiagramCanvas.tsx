"use client";

import { useEffect, useRef } from "react";

export default function DiagramCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialization of the canvas element.
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    const render = () => {
      // const devicePixelRatio = window.devicePixelRatio || 1;
      context.setTransform(1, 0, 0, 1, 0 ,0); // Set to identity matrix
      context.fillStyle = '#ff0000';
      context.fillRect(0, 0, canvas.width/2, canvas.height/2);
    };

    // When user resizes screen
    const resize = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * devicePixelRatio);
      canvas.height = Math.round(rect.height * devicePixelRatio);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let animationFrame = 0;

    // Animation Loop
    const frame = () => {
      render();
      animationFrame = requestAnimationFrame(frame);
    };

    animationFrame = requestAnimationFrame(frame); // Initial call
    return () => {
      cancelAnimationFrame(animationFrame);
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-dvw h-dvh touch-none"
    />
  );
}