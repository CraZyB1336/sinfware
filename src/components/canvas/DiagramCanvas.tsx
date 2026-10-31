"use client";

import { useEditorStore } from "@/contexts/EditorProvider";
import { useEffect, useRef } from "react";

export default function DiagramCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { attach } = useEditorStore();

  useEffect(() => {
    if (!canvasRef.current) return;
    return attach(canvasRef.current);
  }, [attach])

  return (
    <canvas
      ref={canvasRef}
      className="w-dvw h-dvh touch-none absolute z-10"
    />
  );
}
