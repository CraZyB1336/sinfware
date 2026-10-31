"use client"

import DiagramCanvas from "@/components/canvas/DiagramCanvas";
import EditorGUI from "@/components/editor/EditorGUI";
import { EditorProvider } from "@/contexts/EditorProvider";

export default function Home() {
  return (
    <EditorProvider>
      <DiagramCanvas />
      <EditorGUI />
    </EditorProvider>
  );
}
