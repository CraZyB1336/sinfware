import { panBy, Point, zoomAt } from "./camera";
import { EditorState } from "./state";

const ZOOM_SPEED = 0.001;

export type Pan = {
  pointer: Point;
  camX: number;
  camY: number;
};

export function attachInput(
  canvas: HTMLCanvasElement,
  state: EditorState,
  requestRender: () => void,
): () => void {
  let panStart: Pan | null = null;
  const toCanvasPoint = (e: PointerEvent | WheelEvent): Point => {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: PointerEvent) => {
    canvas.setPointerCapture(e.pointerId);
    panStart = { pointer: toCanvasPoint(e), camX: state.camera.x, camY: state.camera.y };
    canvas.style.cursor = 'grabbing';
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!panStart) return;
    const p = toCanvasPoint(e);
    state.camera.x = panStart.camX + (p.x - panStart.pointer.x);
    state.camera.y = panStart.camY + (p.y - panStart.pointer.y);
    requestRender();
  };

  const onPointerUp = (e: PointerEvent) => {
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    panStart = null;
    canvas.style.cursor = '';
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      zoomAt(state.camera, toCanvasPoint(e), -e.deltaY * ZOOM_SPEED);
    } else {
      panBy(state.camera, -e.deltaX, -e.deltaY);
    }
    requestRender();
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('wheel', onWheel, { passive: false});

  return () => {
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerup', onPointerUp);
    canvas.removeEventListener('pointercancel', onPointerUp);
    canvas.removeEventListener('wheel', onWheel);
  }
}