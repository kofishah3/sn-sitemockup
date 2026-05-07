interface PillProps {
  label: string;
  className?: string;
  id?: string;
}

export default function Pill({ label, className = "", id }: PillProps) {
  return (
    <span
      id={id}
      className={`border border-gray-200 rounded-[40px] px-3.5 py-1.5 text-xs text-gray-600 bg-white cursor-default transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent-light ${className}`}
    >
      {label}
    </span>
  );
}
