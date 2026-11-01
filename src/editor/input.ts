import { panBy, Point, zoomAt } from "./camera";
import { EditorState } from "./state";
import { ToolContext } from "@/models/tools/toolInterface";

const ZOOM_SPEED = 0.001;

export function attachInput(
  canvas: HTMLCanvasElement,
  state: EditorState,
  requestRender: () => void,
): () => void {
  const toCanvas = (e: PointerEvent | WheelEvent): Point => {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const toWorld = (e: PointerEvent | WheelEvent): Point => {
    const p = toCanvas(e);
    return { x: (p.x - state.camera.x) / state.camera.z, y: (p.y - state.camera.y) / state.camera.z };
  };

  const ctx: ToolContext = { canvas, state, requestRender, toCanvas, toWorld };

  const syncCursor = () => {
    canvas.style.cursor = state.tool.cursor;
  };

  const onPointerDown = (e: PointerEvent) => {
    canvas.setPointerCapture(e.pointerId);
    state.tool.onPointerDown(e, ctx);
    syncCursor();
  };

  const onPointerMove = (e: PointerEvent) => {
    state.tool.onPointerMove(e, ctx);
    syncCursor();
  };

  const onPointerUp = (e: PointerEvent) => {
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    state.tool.onPointerUp(e, ctx);
    syncCursor();
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      zoomAt(state.camera, toCanvas(e), -e.deltaY * ZOOM_SPEED);
    } else {
      panBy(state.camera, -e.deltaX, -e.deltaY);
    }
    requestRender();
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('wheel', onWheel, { passive: false });

  syncCursor();

  return () => {
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerup', onPointerUp);
    canvas.removeEventListener('pointercancel', onPointerUp);
    canvas.removeEventListener('wheel', onWheel);
  }
}
