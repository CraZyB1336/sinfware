import type { EditorState } from "@/editor/state";
import type { Point } from "@/editor/camera";

export enum ToolType {
  SELECT,
  PAN,
  SQUARE,
};

export type ToolContext = {
  canvas: HTMLCanvasElement;
  state: EditorState;
  requestRender: () => void;
  toCanvas: (e: PointerEvent | WheelEvent) => Point;
  toWorld: (e: PointerEvent | WheelEvent) => Point;
};

export default interface ToolModel {
  readonly type: ToolType;
  readonly cursor: string;

  onPointerDown(e: PointerEvent, context: ToolContext): void;
  onPointerMove(e: PointerEvent, context: ToolContext): void;
  onPointerUp(e: PointerEvent, context: ToolContext): void;

  onActivate(state: EditorState): void;
  onDeactivate(state: EditorState): void;
};
