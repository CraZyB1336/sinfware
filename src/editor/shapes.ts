import ShapeModel from "@/models/shapes/shapeInterface";
import { IDENTITY } from "./camera";

export function drawShape(context: CanvasRenderingContext2D, shape: ShapeModel): void {
  const { x, y, width, height } = shape;

  context.fillStyle = shape.fill;
  context.fillRect(x, y, width / IDENTITY, height / IDENTITY);
  context.strokeStyle = shape.stroke;
  context.strokeRect(x, y, width / IDENTITY, height / IDENTITY);
}