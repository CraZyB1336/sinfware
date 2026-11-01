import SvgIcon from '@mui/material/SvgIcon';

interface ToolButtonProps {
  icon?: typeof SvgIcon;
  selected: boolean;
  onSelect: () => void;
}

export default function ToolButton({ icon: Icon, selected, onSelect }: ToolButtonProps) {
  return (
    <button className={`text-interactable p-1 outline-none hover:text-hover transition-colors pointer-events-auto border rounded-lg focus:border-interactable ${selected ? "border-border" : "border-transparent"}`} onClick={onSelect}>
      {Icon && <Icon />}
    </button>
  );
}