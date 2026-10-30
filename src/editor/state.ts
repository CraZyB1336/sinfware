import { THEME } from "@/config/theme";
import { Camera, createCamera } from "./camera"
import { defaultGridOptions, GridOptions } from "./grid";

export type EditorState = {
  camera: Camera;
  grid: GridOptions;
  viewport: { width: number; height: number };
  background: string;
};

export function createEditorState(): EditorState {
  return {
    camera: createCamera(),
    grid: { ...defaultGridOptions },
    viewport: { width: 0, height: 0 },
    background: THEME.viewportBackground,
  }
}