import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

interface FilterButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  color: string;
  onClick: () => void;
}

export default function FilterButton({
  label,
  count,
  isActive,
  color,
  onClick,
}: FilterButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-colors relative",
        "group flex items-center gap-1",
        !isActive && [
          `text-${color}-600 hover:bg-${color}-50`,
          `dark:text-${color}-400 dark:hover:bg-${color}-900/30`
        ],
        isActive && [
          `bg-${color}-100 text-${color}-700 font-semibold`,
          `dark:bg-${color}-900/50 dark:text-blue`,
          // Chin indicator always black in light and white in dark
          `after:content-[''] after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-1`,
          `after:bg-black dark:after:bg-blue`,
          "after:rounded-full"
        ]
      )}
    >
      {label}
      <span className={cn(
        "ml-1 text-xs px-1.5 py-0.5 rounded-full",
        isActive ? "bg-white/80 text-current dark:bg-white/10" : `bg-${color}-100/50 text-${color}-700 dark:bg-${color}-900/30 dark:text-${color}-300`
      )}>
        {count}
      </span>
    </Button>
  );
}
