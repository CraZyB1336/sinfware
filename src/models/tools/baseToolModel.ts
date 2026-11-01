import type { EditorState } from "@/editor/state";
import ToolModel, { ToolContext, ToolType } from "./toolInterface";

// Default no-op implementations so each tool only overrides what it cares about.
export default abstract class BaseTool implements ToolModel {
  abstract readonly type: ToolType;

  get cursor(): string {
    return 'default';
  }

  onPointerDown(_e: PointerEvent, _context: ToolContext): void {}
  onPointerMove(_e: PointerEvent, _context: ToolContext): void {}
  onPointerUp(_e: PointerEvent, _context: ToolContext): void {}

  onActivate(_state: EditorState): void {}
  onDeactivate(_state: EditorState): void {}
};
