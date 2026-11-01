import ShapeModel from "./shapeInterface";

export default class Square implements ShapeModel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  
  constructor(id: string, x: number, y:number, width: number, height: number, fill: string, stroke: string) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;
  }
}