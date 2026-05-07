import { isValidElement } from "react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PillProps {
  label: string;
  icon?: LucideIcon | ReactNode;
  className?: string;
  id?: string;
  variant?: "light" | "dark";
}

export default function Pill({
  label,
  icon: Icon,
  className = "",
  id,
  variant = "light",
}: PillProps) {
  const isDark = variant === "dark";

  const variantClasses = isDark
    ? "border-white/10 text-white/90 bg-white/5 hover:border-accent hover:text-white hover:bg-accent/10"
    : "border-gray-200 text-gray-600 bg-white hover:border-accent hover:text-accent hover:bg-accent-light";

  const renderIcon = () => {
    if (!Icon) return null;

    // If it's a valid React element (like an <img /> or <svg /> tag)
    if (isValidElement(Icon)) {
      return (
        <div className="flex items-center justify-center w-3 h-3">{Icon}</div>
      );
    }

    // Otherwise, treat it as a component (like a Lucide icon)
    const IconComponent = Icon as any;
    return <IconComponent size={12} strokeWidth={2} />;
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 border rounded-full 
        px-3.5 py-1.5 text-xs cursor-default transition-all duration-300 
        ${variantClasses} ${className}`}
    >
      {renderIcon()}
      {label}
    </span>
  );
}

export function IconPill({ icon, label, variant, ...props }: PillProps) {
  return <Pill icon={icon} label={label} variant={variant} {...props} />;
}
