import { THEME } from "@/config/theme";
import { Camera } from "./camera";
import { mod } from "@/util/math";
import { start } from "repl";

export type GridOptions = {
  baseSpacing: number;
  minSpacingPx: number;
  step: number;
  dotRadius: number;
  color: string;
  fade: boolean;
};

export type GridLevelLerp = {
  spacingPx: number;
  worldSpacing: number;
  t: number;
};

export const defaultGridOptions: GridOptions = {
  baseSpacing: 120,
  minSpacingPx: 60,
  step: 2,
  dotRadius: 1,
  color: THEME.dotColor,
  fade: true,
};
export function gridLevel(cam: Camera, opts: GridOptions): GridLevelLerp {
  const raw = opts.baseSpacing * cam.z;
  const levels = Math.log(raw / opts.minSpacingPx) / Math.log(opts.step);
  const level = Math.floor(levels);
  const spacingPx = raw / Math.pow(opts.step, level);
  const t = levels - level;
  return { spacingPx, worldSpacing: spacingPx / cam.z, t };
}

export function drawDotGrid(
  context: CanvasRenderingContext2D,
  cam: Camera,
  width: number,
  height: number,
  opts: GridOptions = defaultGridOptions,
): void {
  const { spacingPx, t } = gridLevel(cam, opts);
  context.fillStyle = opts.color;
  if (opts.fade) {
    const fineAlpha = t;
    if (fineAlpha > 0.02) {
      context.globalAlpha = fineAlpha;
      drawDots(context, cam, width, height, spacingPx / opts.step, opts.dotRadius);
    }
  }

  context.globalAlpha = 1;
  drawDots(context, cam, width, height, spacingPx, opts.dotRadius);
}

function drawDots(
  context: CanvasRenderingContext2D,
  cam: Camera,
  width: number,
  height: number,
  spacing: number,
  radius: number,
): void {
  const startX = mod(cam.x, spacing) - spacing;
  const starty = mod(cam.y, spacing) - spacing;

  context.beginPath();
  for (let x = startX; x < width + spacing; x += spacing) {
    for(let y = starty; y < height + spacing; y += spacing) {
      context.moveTo(x + radius, y);
      context.arc(x, y, radius, 0, Math.PI * 2);
    }
  }
  context.fill();
}