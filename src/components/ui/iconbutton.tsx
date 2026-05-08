import { type LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  id?: string;
}

export default function IconButton({
  icon: Icon,
  onClick,
  className = "",
  id,
}: IconButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`
        group flex items-center justify-center 
        w-12 h-12 rounded-xl
        bg-black text-white
        transition-all duration-300 ease-out
        hover:scale-110 hover:bg-accent hover:rotate-3
        active:scale-95 cursor-pointer
        ${className}
      `}
    >
      <Icon
        size={20}
        strokeWidth={2.5}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </button>
  );
}
