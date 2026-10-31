"use client";

import { MAX_ZOOM, MIN_ZOOM } from "@/editor/camera";
import { useEditor, useEditorValue } from "@/contexts/EditorProvider";

interface ZoomLevelProps {
  className?: string;
}

export default function ZoomLevel({ className = '' }: ZoomLevelProps) {
  const editor = useEditor();
  const zoom = useEditorValue((state) => state.camera.z, 1);

  return (
    <div className={`flex items-center ${className}`}>
      <input
        className="
          appearance-none w-40 h-2 pointer-events-auto

          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:size-2
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-interactable

          [&::-moz-range-track]:w-full
          [&::-moz-range-track]:h-full
          [&::-moz-range-track]:p-1
          [&::-moz-range-track]:border
          [&::-moz-range-track]:border-border
          [&::-moz-range-track]:rounded-full
          [&::-moz-range-track]:bg-foreground

          [&::-moz-range-thumb]:size-2
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-interactable
          [&::-moz-range-thumb]:border-0
        "
        type="range"
        min={MIN_ZOOM * 10}
        max={MAX_ZOOM * 10}
        value={zoom * 10}
        onChange={(e) => editor?.setZoom(Number(e.target.value) / 10)}
      />
      {/* <span className="text-sm tabular-nums pointer-events-none">{Math.round(zoom * 100)}%</span> */}
    </div>
  );
}
