import { drawDotGrid } from "./grid";
import { EditorState } from "./state";

export function render(context: CanvasRenderingContext2D, state: EditorState, devicePixelRatio: number): void {
  const { camera, viewport } = state;

  // Screen space
  context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  context.fillStyle = state.background;
  context.fillRect(0, 0, viewport.width, viewport.height);
  
  drawDotGrid(context, camera, viewport.width, viewport.height, state.grid);

  // World space
  context.setTransform(devicePixelRatio * camera.z, 0, 0, devicePixelRatio * camera.z, devicePixelRatio * camera.x, devicePixelRatio * camera.y);

  // Shapes are thus drawn in world space here:
}