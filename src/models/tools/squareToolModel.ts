import { ToolType } from "./toolInterface";
import BaseTool from "./baseToolModel";

export default class SquareTool extends BaseTool {
  readonly type = ToolType.SQUARE;

  override get cursor(): string {
    return 'crosshair';
  }

  // Drag-to-create goes here: write `state.draftShape` on down/move from
  // `ctx.toWorld(e)`, then commit it into `state.shapes` on up.
  // `onDeactivate` must clear `draftShape` so a half-finished drag is dropped.
}
