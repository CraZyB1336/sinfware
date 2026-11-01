import ToolModel, { ToolType } from "./toolInterface";
import Pan from "./panModel";
import Select from "./selectModel";
import SquareTool from "./squareToolModel";

export const TOOL_REGISTRY: Record<ToolType, ToolModel> = {
  [ToolType.SELECT]: new Select(),
  [ToolType.PAN]: new Pan(),
  [ToolType.SQUARE]: new SquareTool(),
};

export const DEFAULT_TOOL = ToolType.SELECT;
