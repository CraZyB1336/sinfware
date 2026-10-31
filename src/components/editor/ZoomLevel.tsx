"use client";

import { MAX_ZOOM, MIN_ZOOM } from "@/editor/camera";
import { useEditor, useEditorValue } from "@/contexts/EditorProvider";

export default function ZoomLevel() {
  const editor = useEditor();
  const zoom = useEditorValue((state) => state.camera.z, 1);

  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={MIN_ZOOM * 100}
        max={MAX_ZOOM * 100}
        value={zoom * 100}
        onChange={(e) => editor?.setZoom(Number(e.target.value) / 100)}
      />
      <span className="text-sm tabular-nums">{Math.round(zoom * 100)}%</span>
    </div>
  );
}
