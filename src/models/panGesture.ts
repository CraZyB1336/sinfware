import { Point } from "../editor/camera";
import type { EditorState } from "../editor/state";

type PanStart = {
  pointer: Point;
  camX: number;
  camY: number;
};

export default class PanGesture {
  private start: PanStart | null = null;

  get active(): boolean {
    return this.start !== null;
  }

  begin(state: EditorState, pointer: Point): void {
    this.start = { pointer, camX: state.camera.x, camY: state.camera.y };
  }

  // Returns whether the camera actually moved, so callers can skip a render.
  move(state: EditorState, pointer: Point): boolean {
    if (!this.start) return false;
    state.camera.x = this.start.camX + (pointer.x - this.start.pointer.x);
    state.camera.y = this.start.camY + (pointer.y - this.start.pointer.y);
    return true;
  }

  end(): void {
    this.start = null;
  }
}
