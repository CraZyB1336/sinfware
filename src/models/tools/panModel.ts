import { ToolContext, ToolType } from "./toolInterface";
import BaseTool from "./baseToolModel";
import { Point } from "@/editor/camera";

type PanStart = {
  pointer: Point;
  camX: number;
  camY: number;
};

export default class Pan extends BaseTool {
  readonly type = ToolType.PAN;
  private start: PanStart | null = null;

  override get cursor(): string {
    return this.start !== null ? 'grabbing' : 'grab';
  }

  override onPointerDown(e: PointerEvent, context: ToolContext): void {
    this.start = { 
      pointer: context.toCanvas(e),
      camX: context.state.camera.x,
      camY: context.state.camera.y,
    };
  }

  override onPointerMove(e: PointerEvent, context: ToolContext): void {
    if (!this.start) return;
    context.state.camera.x = this.start.camX + (context.toCanvas(e).x - this.start.pointer.x);
    context.state.camera.y = this.start.camY + (context.toCanvas(e).y - this.start.pointer.y);
    context.requestRender();
  }

  override onPointerUp(): void {
    this.start = null;
  }

  override onDeactivate(): void {
    this.start = null;
  }
}
