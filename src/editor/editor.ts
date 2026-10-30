import { attachInput } from "./input";
import { render } from "./render";
import { createEditorState, EditorState } from "./state"

export type Editor = {
  state: EditorState;
  requestRender: () => void;
  destroy: () => void;
};

export function createEditor(canvas: HTMLCanvasElement): Editor {
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D context not available');

  const state = createEditorState();
  let dirty = true;
  let animationFrame = 0;
  
  const requestRender = () => {
    dirty = true;
  };

  const resize = () => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    state.viewport.width = rect.width;
    state.viewport.height = rect.height
    canvas.width = Math.round(rect.width * devicePixelRatio);
    canvas.height = Math.round(rect.height * devicePixelRatio);
    requestRender();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  const frame = () => {
    if (dirty) {
      dirty = false;
      render(context, state, window.devicePixelRatio || 1);
    }
    animationFrame = requestAnimationFrame(frame);
  };
  animationFrame = requestAnimationFrame(frame);

  const detachInput = attachInput(canvas, state, requestRender);

  return {
    state,
    requestRender,
    destroy: () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      detachInput();
    },
  };
}