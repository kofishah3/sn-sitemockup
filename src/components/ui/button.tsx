import type { ReactNode } from "react";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  id?: string;
}

export default function Button({
  label,
  variant = "primary",
  onClick,
  className = "",
  icon,
  id,
}: ButtonProps) {
  const baseStyles =
    "flex items-center gap-2 rounded-[40px] px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:scale-[0.97] tracking-[0.02em] cursor-pointer";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-600",
    secondary:
      "bg-transparent text-black border border-gray-200 hover:border-gray-400 hover:bg-gray-100",
  };

  return (
    <button
      id={id}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {label}
      {icon && <span id={`${id}-icon`}>{icon}</span>}
    </button>
  );
}
