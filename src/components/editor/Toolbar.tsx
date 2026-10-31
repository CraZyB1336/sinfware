interface ToolbarProps {
  className?: string;
}

export default function Toolbar({ className = '' }: ToolbarProps) {
  return (
    <div className={`flex flex-row items-center justify-between h-8 w-100 rounded-lg px-4 py-2 border border-border bg-foreground relative ${className}`}>
      
    </div>
  );
}