import { clamp } from "@/util/math";

export type Camera = {
  x: number;
  y: number;
  z: number; // Zoom
};

export type Point = { x: number; y: number };

export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 10;

export function createCamera(): Camera {
  return { x: 0, y: 0, z: 1};
}

// A linear transform from the screen coordinate system to the world coordinate system.
// Shoutout TDT4230, big fan of that course.
export function screenToWorld(cam: Camera, p: Point): Point {
  return { x: (p.x - cam.x) / cam.z, y: (p.y - cam.y) / cam.z };
}

export function worldToScreen(cam: Camera, p: Point): Point {
  return { x: p.x * cam.z + cam.x, y: p.y * cam.z + cam.y };
}

// Moves the camera by screen space derivatives.
export function panBy(cam: Camera, dx: number, dy: number): void {
  cam.x += dx;
  cam.y += dy;
}

// Sets the zoom level while keeping `screenPoint` fixed on the same world point.
export function zoomTo(cam: Camera, screenPoint: Point, z: number): void {
  const before = screenToWorld(cam, screenPoint);
  cam.z = clamp(z, MIN_ZOOM, MAX_ZOOM);
  cam.x = screenPoint.x - before.x * cam.z;
  cam.y = screenPoint.y - before.y * cam.z;
}

// `delta` is added to the zoom level, so zoom responds linearly to wheel distance.
export function zoomAt(cam: Camera, screenPoint: Point, delta: number): void {
  zoomTo(cam, screenPoint, cam.z + delta);
}
