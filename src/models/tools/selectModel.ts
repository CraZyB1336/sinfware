import { ToolType } from "./toolInterface";
import BaseTool from "./baseToolModel";

export default class Select extends BaseTool {
  readonly type = ToolType.SELECT;

  override get cursor(): string {
    return 'default';
  }

  // Hit-testing and marquee selection go here, once shapes are rendered.
}
