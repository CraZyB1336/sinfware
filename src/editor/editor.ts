import { ToolType } from "@/models/tools/toolInterface";
import { DEFAULT_TOOL, TOOL_REGISTRY } from "@/models/tools/toolRegistry";
import { zoomTo } from "./camera";
import { attachInput } from "./input";
import { render } from "./render";
import { createEditorState, EditorState } from "./state"

export type Editor = {
  state: EditorState;
  requestRender: () => void;
  subscribe: (listener: () => void) => () => void;
  setTool: (tool: ToolType) => void;
  setZoom: (z: number) => void;
  destroy: () => void;
};

export function createEditor(canvas: HTMLCanvasElement): Editor {
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas 2D context not available');
  context.imageSmoothingEnabled = false;

  const state = createEditorState(TOOL_REGISTRY[DEFAULT_TOOL]);
  let dirty = true;
  let animationFrame = 0;

  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());

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
      notify();
    }
    animationFrame = requestAnimationFrame(frame);
  };
  animationFrame = requestAnimationFrame(frame);

  const detachInput = attachInput(canvas, state, requestRender);

  return {
    state,
    requestRender,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    setTool: (t) => {
      const next = TOOL_REGISTRY[t];
      if (state.tool === next) return;
      state.tool.onDeactivate(state);
      state.tool = next;
      state.tool.onActivate(state);
      notify();
      requestRender();
    },
    setZoom: (z) => {
      const center = { x: state.viewport.width / 2, y: state.viewport.height / 2 };
      zoomTo(state.camera, center, z);
      requestRender();
    },
    destroy: () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      detachInput();
      listeners.clear();
    },
  };
}
