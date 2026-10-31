import Toolbar from "./Toolbar";
import ZoomLevel from "./ZoomLevel";

export default function EditorGUI() {
  return (
    <div className="flex flex-col p-8 absolute w-dvw h-dvh z-20 pointer-events-none">
      <div className="mx-auto flex items-center justify-center relative mt-auto">
        <ZoomLevel className="absolute left-full ml-10"/>
        <Toolbar className=""/>
      </div>
    </div>
  );
}