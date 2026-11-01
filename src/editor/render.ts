import { drawDotGrid } from "./grid";
import { EditorState } from "./state";
import ShapeModel from "@/models/shapes/shapeInterface";

function drawShape(context: CanvasRenderingContext2D, shape: ShapeModel, z: number): void {
  const { x, y, width, height } = shape;

  context.lineWidth = shape.strokeWidth / z;

  context.fillStyle = shape.fill;
  context.fillRect(x, y, width, height);
  context.strokeStyle = shape.stroke;
  context.strokeRect(x, y, width, height);
}

export function render(context: CanvasRenderingContext2D, state: EditorState, devicePixelRatio: number): void {
  const { camera, viewport, shapes } = state;

  // Screen space
  context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  context.fillStyle = state.background;
  context.fillRect(0, 0, viewport.width, viewport.height);
  
  drawDotGrid(context, camera, viewport.width, viewport.height, state.grid);

  // World space
  context.setTransform(devicePixelRatio * camera.z, 0, 0, devicePixelRatio * camera.z, devicePixelRatio * camera.x, devicePixelRatio * camera.y);

  // Shapes are thus drawn in world space here:
  for (const s of shapes) drawShape(context, s, camera.z);
  if (state.draftShape) drawShape(context, state.draftShape, camera.z);
}