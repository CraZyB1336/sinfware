"use client";

import { createEditor } from "@/editor/editor";
import { useEffect, useRef } from "react";

export default function DiagramCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const editor = createEditor(canvasRef.current);
    return () => editor.destroy();
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-dvw h-dvh touch-none"
    />
  );
}