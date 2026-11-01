import { ToolContext, ToolType } from "./toolInterface";
import BaseTool from "./baseToolModel";
import PanGesture from "@/models/panGesture";

export default class Pan extends BaseTool {
  readonly type = ToolType.PAN;
  private gesture = new PanGesture();

  override get cursor(): string {
    return this.gesture.active ? 'grabbing' : 'grab';
  }

  override onPointerDown(e: PointerEvent, context: ToolContext): void {
    this.gesture.begin(context.state, context.toCanvas(e));
  }

  override onPointerMove(e: PointerEvent, context: ToolContext): void {
    if (this.gesture.move(context.state, context.toCanvas(e))) context.requestRender();
  }

  override onPointerUp(): void {
    this.gesture.end();
  }

  override onDeactivate(): void {
    this.gesture.end();
  }
}
