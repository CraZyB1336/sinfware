import { THEME } from "@/config/theme";
import { Camera, createCamera } from "./camera"
import { defaultGridOptions, GridOptions } from "./grid";
import ShapeModel from "@/models/shapes/shapeInterface";
import type ToolModel from "@/models/tools/toolInterface";
import Square from "@/models/shapes/squareModel";

export type EditorState = {
  camera: Camera;
  grid: GridOptions;
  viewport: { width: number; height: number };
  background: string;
  tool: ToolModel;

  // Shapes
  shapes: ShapeModel[],
  draftShape: ShapeModel | null,
};

export function createEditorState(tool: ToolModel): EditorState {
  return {
    camera: createCamera(),
    grid: { ...defaultGridOptions },
    viewport: { width: 0, height: 0 },
    background: THEME.viewportBackground,
    tool,

    shapes: [
      new Square("super", 50, 50, 100, 200, "blue", "white")
    ],
    draftShape: null,
  };
}
