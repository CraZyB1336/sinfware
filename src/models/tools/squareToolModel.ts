import { ToolContext, ToolType } from "./toolInterface";
import BaseTool from "./baseToolModel";
import { EditorState } from "@/editor/state";
import Square from "../shapes/squareModel";

export default class SquareTool extends BaseTool {
  readonly type = ToolType.SQUARE;
  private shape: Square | null = null;

  override get cursor(): string {
    return 'crosshair';
  }

  // Drag-to-create goes here: write `state.draftShape` on down/move from
  // `ctx.toWorld(e)`, then commit it into `state.shapes` on up.
  // `onDeactivate` must clear `draftShape` so a half-finished drag is dropped.

  onPointerDown(e: PointerEvent, context: ToolContext): void {
    const start = context.toWorld(e);

    this.shape = new Square(
      "tempID",
      start.x, start.y,
      0, 0,
      "transparent", "white", 5
    );

    context.state.draftShape = this.shape;
    context.requestRender();
  }

  onPointerMove(e: PointerEvent, context: ToolContext): void {
    if (!this.shape) return;
    
    const move = context.toWorld(e);
    this.shape.width = move.x - this.shape.x;
    this.shape.height = move.y - this.shape.y;
    context.requestRender();
  }

  onPointerUp(_e: PointerEvent, context: ToolContext): void {
    context.state.draftShape = null;

    if (!this.shape) return;
    context.state.shapes.push(this.shape);
    this.shape = null;
  }

  override onDeactivate(state: EditorState): void {
    state.draftShape = null;
    this.shape = null;
  }
}
