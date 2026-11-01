import CropSquareIcon from '@mui/icons-material/CropSquare';
import ToolButton from './Toolbutton';
import NearMeIcon from '@mui/icons-material/NearMe';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import { useEditor, useEditorValue } from '@/contexts/EditorProvider';
import { ToolType } from '@/models/tools/toolInterface';

interface ToolbarProps {
  className?: string;
}

export default function Toolbar({ className = '' }: ToolbarProps) {
  const editor = useEditor();
  const tool = useEditorValue((state) => state.tool.type, ToolType.SELECT);

  return (
    <div className={`flex flex-row items-center gap-2 justify-between rounded-lg p-2 border border-border bg-foreground relative pointer-events-auto ${className}`}>
      <ToolButton icon={PanToolAltIcon} selected={tool === ToolType.PAN} onSelect={() => editor?.setTool(ToolType.PAN)}/>
      <ToolButton icon={NearMeIcon} selected={tool === ToolType.SELECT} onSelect={() => editor?.setTool(ToolType.SELECT)}/>
      <ToolButton icon={CropSquareIcon} selected={tool === ToolType.SQUARE} onSelect={() => editor?.setTool(ToolType.SQUARE)}/>
    </div>
  );
}