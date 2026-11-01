import Toolbar from "./Toolbar";
import ZoomLevel from "./ZoomLevel";

export default function EditorGUI() {
  return (
    <div className="flex flex-col p-8 absolute w-dvw h-dvh z-20 pointer-events-none">
      <div className="mx-auto flex flex-col gap-4 items-center justify-center relative mt-auto">
        <ZoomLevel className=""/>
        <Toolbar className=""/>
      </div>
    </div>
  );
}