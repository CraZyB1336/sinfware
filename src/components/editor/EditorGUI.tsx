import ZoomLevel from "./ZoomLevel";

export default function EditorGUI() {
  return (
    <div className="flex items-center p-8 absolute w-dvw h-dvh z-20 pointer-events-none *:pointer-events-auto">
      <ZoomLevel />
    </div>
  );
}